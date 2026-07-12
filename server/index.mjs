import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import express from "express";
import helmet from "helmet";
import pg from "pg";

import { ASSESSMENT_VERSION, dimensions, questions, scoreAssessment, scoreStyle } from "../lib/assessment.mjs";
import {
  assertSubmission,
  buildCsv,
  createAdminToken,
  publicReport,
  summarizeDashboard,
  verifyAdminToken,
} from "../supabase/functions/ai-assessment-api/_shared/core.mjs";

const { Pool } = pg;
const requiredEnvironment = [
  "DATABASE_URL",
  "TEACHER_ACCESS_CODE_HASH",
  "TEACHER_SESSION_SECRET",
  "ANALYSIS_URL",
  "ANALYSIS_SHARED_SECRET",
];
for (const key of requiredEnvironment) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });
const app = express();
app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(express.json({ limit: "64kb" }));

const sha256 = (value) => createHash("sha256").update(String(value)).digest("hex");
const safeHexEqual = (left, right) => {
  try {
    const a = Buffer.from(String(left), "hex");
    const b = Buffer.from(String(right), "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
};
const reportToken = () => randomBytes(32).toString("base64url");
const sessionCode = () => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(randomBytes(6), (byte) => alphabet[byte % alphabet.length]).join("");
};
const sessionJson = (row) => ({
  id: row.id,
  code: row.code,
  title: row.title,
  cohort: row.cohort,
  status: row.status,
  assessmentVersion: row.assessment_version,
  createdAt: row.created_at,
  submissionCount: Number(row.submission_count || 0),
});

function validateAnswerIds(answerIds) {
  if (questions.some((question, index) => !question.options.some((option) => option.id === answerIds[index]))) {
    throw new Error("答卷选项无效，请刷新后重新填写");
  }
}

function asyncRoute(handler) {
  return (request, response, next) => Promise.resolve(handler(request, response, next)).catch(next);
}

async function adminOnly(request, response, next) {
  const token = String(request.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const payload = await verifyAdminToken(token, process.env.TEACHER_SESSION_SECRET);
  if (!payload) return response.status(401).json({ error: "教师登录已失效，请重新登录" });
  next();
}

async function analyzeSubmission(id) {
  const claimed = await pool.query(
    `update assessment_submissions
       set ai_status = 'processing', ai_error = null, ai_attempts = ai_attempts + 1
     where id = $1 and ai_status in ('pending', 'failed')
     returning *`,
    [id],
  );
  if (!claimed.rowCount) {
    const current = await pool.query("select * from assessment_submissions where id = $1", [id]);
    if (!current.rowCount) throw Object.assign(new Error("答卷不存在"), { status: 404 });
    return current.rows[0];
  }

  const row = claimed.rows[0];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    const modelResponse = await fetch(process.env.ANALYSIS_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "x-assessment-secret": process.env.ANALYSIS_SHARED_SECRET },
      body: JSON.stringify({ promptText: row.open_prompt }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
    const payload = await modelResponse.json().catch(() => ({}));
    if (!modelResponse.ok || !payload.analysis) throw new Error(payload.error || `AI分析服务返回 ${modelResponse.status}`);

    const scores = scoreAssessment(row.answers, payload.analysis.scores);
    const updated = await pool.query(
      `update assessment_submissions set
        choice_score = $2, open_score = $3, total_score = $4,
        level_code = $5, level_name = $6, style_code = $7, style_name = $8,
        dimension_scores = $9, style_data = $10, ai_status = 'complete',
        ai_analysis = $11, ai_error = null
       where id = $1 returning *`,
      [
        id,
        scores.choiceScore,
        scores.openScore,
        scores.totalScore,
        scores.level.code,
        scores.level.name,
        scores.style.code,
        scores.style.name,
        scores.dimensions,
        scores.style,
        payload.analysis,
      ],
    );
    return updated.rows[0];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await pool.query(
      "update assessment_submissions set ai_status = 'failed', ai_error = $2 where id = $1",
      [id, message.slice(0, 500)],
    );
    throw Object.assign(new Error("答卷已保存，AI点评暂时失败，教师可以稍后重试"), { status: 503 });
  }
}

app.get("/health", asyncRoute(async (_request, response) => {
  await pool.query("select 1");
  response.json({ ok: true, version: ASSESSMENT_VERSION });
}));

app.get("/session/:code", asyncRoute(async (request, response) => {
  const result = await pool.query(
    "select * from assessment_sessions where code = $1",
    [String(request.params.code).trim().toUpperCase()],
  );
  if (!result.rowCount) return response.status(404).json({ error: "没有找到这个测评场次" });
  if (result.rows[0].status !== "open") return response.status(409).json({ error: "本场测评已经关闭" });
  response.json({ session: sessionJson(result.rows[0]) });
}));

app.post("/submit", asyncRoute(async (request, response) => {
  let payload;
  try {
    payload = assertSubmission(request.body);
    validateAnswerIds(payload.answers);
  } catch (error) {
    return response.status(400).json({ error: error instanceof Error ? error.message : "答卷无效" });
  }
  const sessionResult = await pool.query("select * from assessment_sessions where code = $1", [payload.sessionCode]);
  if (!sessionResult.rowCount) return response.status(404).json({ error: "没有找到这个测评场次" });
  const session = sessionResult.rows[0];
  if (session.status !== "open") return response.status(409).json({ error: "本场测评已经关闭，不能继续提交" });

  const style = scoreStyle(payload.answers);
  const inserted = await pool.query(
    `insert into assessment_submissions
      (session_id, report_token, participant_name, participant_role, answers, open_prompt, idempotency_key,
       style_code, style_name, style_data)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     on conflict (session_id, idempotency_key) do nothing
     returning *`,
    [session.id, reportToken(), payload.participantName, payload.participantRole, JSON.stringify(payload.answers), payload.openPrompt,
      payload.idempotencyKey, style.code, style.name, style],
  );
  const row = inserted.rowCount
    ? inserted.rows[0]
    : (await pool.query(
      "select * from assessment_submissions where session_id = $1 and idempotency_key = $2",
      [session.id, payload.idempotencyKey],
    )).rows[0];
  response.status(inserted.rowCount ? 201 : 200).json({ reportToken: row.report_token, aiStatus: row.ai_status });
}));

app.get("/report/:token", asyncRoute(async (request, response) => {
  const result = await pool.query(
    `select s.*, row_to_json(a.*) as session
       from assessment_submissions s join assessment_sessions a on a.id = s.session_id
      where s.report_token = $1`,
    [request.params.token],
  );
  if (!result.rowCount) return response.status(404).json({ error: "报告链接无效或已被删除" });
  const row = result.rows[0];
  response.json({ report: publicReport(row, row.session) });
}));

app.post("/report/:token/analyze", asyncRoute(async (request, response) => {
  const result = await pool.query("select id from assessment_submissions where report_token = $1", [request.params.token]);
  if (!result.rowCount) return response.status(404).json({ error: "报告链接无效或已被删除" });
  const row = await analyzeSubmission(result.rows[0].id);
  response.json({ aiStatus: row.ai_status });
}));

app.post("/admin/login", asyncRoute(async (request, response) => {
  const ipHash = sha256(`${process.env.IP_HASH_SALT || process.env.TEACHER_SESSION_SECRET}:${request.ip}`);
  const attemptResult = await pool.query("select * from assessment_login_attempts where ip_hash = $1", [ipHash]);
  const attempt = attemptResult.rows[0];
  if (attempt?.blocked_until && new Date(attempt.blocked_until) > new Date()) {
    return response.status(429).json({ error: "尝试次数过多，请稍后再试" });
  }

  const valid = safeHexEqual(sha256(request.body?.accessCode || ""), process.env.TEACHER_ACCESS_CODE_HASH);
  if (!valid) {
    const record = await pool.query(
      `insert into assessment_login_attempts (ip_hash, window_started_at, attempts, blocked_until)
       values ($1, now(), 1, null)
       on conflict (ip_hash) do update set
         attempts = case when assessment_login_attempts.window_started_at < now() - interval '15 minutes' then 1 else assessment_login_attempts.attempts + 1 end,
         window_started_at = case when assessment_login_attempts.window_started_at < now() - interval '15 minutes' then now() else assessment_login_attempts.window_started_at end,
         blocked_until = case when assessment_login_attempts.window_started_at >= now() - interval '15 minutes' and assessment_login_attempts.attempts + 1 >= 5 then now() + interval '15 minutes' else null end
       returning attempts, blocked_until`,
      [ipHash],
    );
    const error = record.rows[0].blocked_until ? "尝试次数过多，请15分钟后再试" : "教师口令不正确";
    return response.status(record.rows[0].blocked_until ? 429 : 401).json({ error });
  }

  await pool.query("delete from assessment_login_attempts where ip_hash = $1", [ipHash]);
  response.json({ token: await createAdminToken(process.env.TEACHER_SESSION_SECRET) });
}));

app.use("/admin", adminOnly);

app.get("/admin/sessions", asyncRoute(async (_request, response) => {
  const result = await pool.query(
    `select a.*, count(s.id)::integer as submission_count
       from assessment_sessions a left join assessment_submissions s on s.session_id = a.id
      group by a.id order by a.created_at desc`,
  );
  response.json({ sessions: result.rows.map(sessionJson) });
}));

app.post("/admin/sessions", asyncRoute(async (request, response) => {
  const title = String(request.body?.title || "").trim().slice(0, 60);
  const cohort = String(request.body?.cohort || "").trim().slice(0, 60);
  if (!title) return response.status(400).json({ error: "请填写场次名称" });
  let created;
  for (let attempt = 0; attempt < 5 && !created; attempt += 1) {
    try {
      const result = await pool.query(
        "insert into assessment_sessions (code, title, cohort, assessment_version) values ($1,$2,$3,$4) returning *",
        [sessionCode(), title, cohort, ASSESSMENT_VERSION],
      );
      created = result.rows[0];
    } catch (error) {
      if (error?.code !== "23505") throw error;
    }
  }
  if (!created) throw new Error("场次码生成失败，请重试");
  response.status(201).json({ session: sessionJson(created) });
}));

app.patch("/admin/sessions/:id", asyncRoute(async (request, response) => {
  const status = request.body?.status;
  if (!['open', 'closed'].includes(status)) return response.status(400).json({ error: "场次状态无效" });
  const result = await pool.query(
    "update assessment_sessions set status = $2, closed_at = case when $2 = 'closed' then now() else null end where id = $1 returning *",
    [request.params.id, status],
  );
  if (!result.rowCount) return response.status(404).json({ error: "场次不存在" });
  response.json({ session: sessionJson(result.rows[0]) });
}));

app.delete("/admin/sessions/:id", asyncRoute(async (request, response) => {
  const result = await pool.query("delete from assessment_sessions where id = $1 returning id", [request.params.id]);
  if (!result.rowCount) return response.status(404).json({ error: "场次不存在" });
  response.status(204).end();
}));

app.get("/admin/sessions/:id/dashboard", asyncRoute(async (request, response) => {
  const sessionResult = await pool.query("select * from assessment_sessions where id = $1", [request.params.id]);
  if (!sessionResult.rowCount) return response.status(404).json({ error: "场次不存在" });
  const result = await pool.query(
    "select * from assessment_submissions where session_id = $1 order by submitted_at asc",
    [request.params.id],
  );
  const summary = summarizeDashboard(result.rows);
  const ordered = dimensions
    .map((item) => ({ label: item.label, score: summary.dimensionAverages[item.id] || 0 }))
    .sort((a, b) => b.score - a.score);
  summary.commonStrengths = ordered.slice(0, 2);
  summary.commonGaps = [...ordered].reverse().slice(0, 2);
  response.json({
    dashboard: {
      session: sessionJson(sessionResult.rows[0]),
      summary,
      submissions: result.rows.map((row) => ({
        id: row.id,
        participantName: row.participant_name,
        participantRole: row.participant_role,
        levelCode: row.level_code,
        levelName: row.level_name,
        styleCode: row.style_code,
        styleName: row.style_name,
        aiStatus: row.ai_status,
        submittedAt: row.submitted_at,
        reportToken: row.report_token,
      })),
    },
  });
}));

app.post("/admin/submissions/:id/retry", asyncRoute(async (request, response) => {
  const row = await analyzeSubmission(request.params.id);
  response.json({ aiStatus: row.ai_status });
}));

app.get("/admin/sessions/:id/export", asyncRoute(async (request, response) => {
  const result = await pool.query(
    "select * from assessment_submissions where session_id = $1 order by submitted_at asc",
    [request.params.id],
  );
  response.setHeader("content-type", "text/csv; charset=utf-8");
  response.setHeader("content-disposition", "attachment; filename=assessment.csv");
  response.send(buildCsv(result.rows));
}));

app.use((error, _request, response, _next) => {
  const status = Number(error?.status) || (error?.type === "entity.parse.failed" ? 400 : 500);
  if (status >= 500) console.error(error);
  response.status(status).json({ error: status >= 500 ? "服务暂时不可用，请稍后再试" : error.message });
});

const port = Number(process.env.PORT || 3001);
const server = app.listen(port, "0.0.0.0", () => console.log(`assessment API listening on ${port}`));

async function shutdown() {
  server.close();
  await pool.end();
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
