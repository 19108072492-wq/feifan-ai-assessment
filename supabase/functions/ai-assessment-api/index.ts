import { createClient } from "npm:@supabase/supabase-js@2.57.4";

import {
  ASSESSMENT_VERSION,
  dimensions,
  getQuestionsForRole,
  scoreAssessment,
  scoreStyle,
} from "../../../lib/assessment-v3.mjs";
import {
  assertSubmission,
  buildCsv,
  createAdminToken,
  publicReport,
  summarizeDashboard,
  verifyAdminToken,
} from "./_shared/core.mjs";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const TEACHER_CODE_HASH = Deno.env.get("TEACHER_ACCESS_CODE_HASH") || "";
const TEACHER_SECRET = Deno.env.get("TEACHER_SESSION_SECRET") || "";
const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const defaultOrigins = [
  "https://19108072492-wq.github.io",
  "http://127.0.0.1:4567",
  "http://localhost:4567",
];
const allowedOrigins = new Set([
  ...defaultOrigins,
  ...(Deno.env.get("APP_ORIGINS") || "").split(",").map((item) => item.trim()).filter(Boolean),
]);

function requestOrigin(request: Request) {
  return request.headers.get("origin") || "";
}

function cors(origin: string) {
  return {
    "access-control-allow-origin": origin || defaultOrigins[0],
    "access-control-allow-methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "access-control-allow-headers": "authorization, content-type",
    "access-control-max-age": "86400",
    "cache-control": "no-store",
    vary: "origin",
  };
}

function json(body: unknown, status: number, origin: string) {
  return new Response(status === 204 ? null : JSON.stringify(body), {
    status,
    headers: { ...cors(origin), "content-type": "application/json; charset=utf-8" },
  });
}

function routePath(url: URL) {
  const marker = "/ai-assessment-api";
  const index = url.pathname.indexOf(marker);
  const path = index >= 0 ? url.pathname.slice(index + marker.length) : url.pathname;
  return path || "/";
}

function sessionJson(row: Record<string, any>) {
  const relation = row.assessment_submissions;
  const submissionCount = Array.isArray(relation) ? Number(relation[0]?.count || 0) : Number(row.submission_count || 0);
  return {
    id: row.id,
    code: row.code,
    title: row.title,
    cohort: row.cohort,
    status: row.status,
    assessmentVersion: row.assessment_version,
    createdAt: row.created_at,
    submissionCount,
  };
}

function randomToken(bytes = 32) {
  const buffer = crypto.getRandomValues(new Uint8Array(bytes));
  let binary = "";
  for (const value of buffer) binary += String.fromCharCode(value);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function randomSessionCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), (byte) => alphabet[byte % alphabet.length]).join("");
}

async function sha256(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeTextEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

function validateAnswerValues(answerValues: unknown[], questionList: any[]) {
  if (!Array.isArray(answerValues) || answerValues.length !== questionList.length) {
    throw new Error(`请完成全部 ${questionList.length} 道选择题`);
  }
  for (let index = 0; index < questionList.length; index += 1) {
    const question = questionList[index];
    const value = answerValues[index];
    const ids = Array.isArray(value) ? value : [value];
    const invalid = ids.length === 0 ||
      (question.kind !== "multi" && ids.length !== 1) ||
      ids.some((id) => typeof id !== "string" || !question.options.some((option: any) => option.id === id));
    if (invalid) throw new Error("答卷选项无效，请刷新后重新填写");
  }
}

async function requireAdmin(request: Request) {
  const token = String(request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return Boolean(await verifyAdminToken(token, TEACHER_SECRET));
}

async function analyzeSubmission(id: string) {
  const { data: current, error: readError } = await db.from("assessment_submissions").select("*").eq("id", id).maybeSingle();
  if (readError) throw readError;
  if (!current) throw Object.assign(new Error("答卷不存在"), { status: 404 });
  if (current.ai_status === "complete") return current;

  const { data: claimed, error: claimError } = await db.from("assessment_submissions")
    .update({ ai_status: "processing", ai_error: null, ai_attempts: Number(current.ai_attempts || 0) + 1 })
    .eq("id", id).select("*").single();
  if (claimError) throw claimError;

  try {
    const analysisUrl = `${SUPABASE_URL}/functions/v1/ai-assessment-analyze`;
    const response = await fetch(analysisUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: defaultOrigins[0],
        "x-assessment-client": String(claimed.id).replaceAll("-", ""),
      },
      body: JSON.stringify({ promptText: claimed.open_prompt }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.analysis) throw new Error(payload.error || `AI分析服务返回 ${response.status}`);

    const questionList = getQuestionsForRole(claimed.role_key || "general");
    const scores = scoreAssessment(claimed.answers, payload.analysis.scores, questionList);
    const { data: updated, error: updateError } = await db.from("assessment_submissions").update({
      choice_score: scores.choiceScore,
      open_score: scores.openScore,
      raw_total_score: scores.rawTotalScore,
      project_bonus: scores.projectBonus,
      project_upgrade: scores.projectUpgrade,
      section_scores: scores.sectionScores,
      total_score: scores.totalScore,
      level_code: scores.level.code,
      level_name: scores.level.name,
      style_code: scores.style.code,
      style_name: scores.style.name,
      dimension_scores: scores.dimensions,
      style_data: scores.style,
      ai_status: "complete",
      ai_engine: "deepseek",
      ai_analysis: payload.analysis,
      ai_error: null,
      ai_attempts: Number(payload.attempts || claimed.ai_attempts || 1),
    }).eq("id", id).select("*").single();
    if (updateError) throw updateError;
    return updated;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await db.from("assessment_submissions").update({ ai_status: "failed", ai_error: message.slice(0, 500) }).eq("id", id);
    throw Object.assign(new Error("答卷已保存，AI点评暂时失败，教师可以稍后重试"), { status: 503 });
  }
}

Deno.serve(async (request: Request) => {
  const origin = requestOrigin(request);
  if (origin && !allowedOrigins.has(origin)) return json({ error: "Origin not allowed" }, 403, "");
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ error: "服务配置不完整" }, 503, origin);

  const path = routePath(new URL(request.url));
  const method = request.method.toUpperCase();
  let body: Record<string, any> = {};
  if (!["GET", "HEAD"].includes(method)) body = await request.json().catch(() => ({}));

  try {
    if (method === "GET" && path === "/health") {
      const { error } = await db.from("assessment_sessions").select("id", { head: true, count: "exact" }).limit(1);
      if (error) throw error;
      return json({ ok: true, version: ASSESSMENT_VERSION }, 200, origin);
    }

    if (method === "GET" && path.startsWith("/session/")) {
      const code = decodeURIComponent(path.slice("/session/".length)).trim().toUpperCase();
      const { data, error } = await db.from("assessment_sessions").select("*").eq("code", code).maybeSingle();
      if (error) throw error;
      if (!data) return json({ error: "没有找到这个测评场次" }, 404, origin);
      if (data.status !== "open") return json({ error: "本场测评已经关闭" }, 409, origin);
      return json({ session: sessionJson(data) }, 200, origin);
    }

    if (method === "POST" && path === "/submit") {
      let payload;
      try {
        payload = assertSubmission(body);
        validateAnswerValues(payload.answers, getQuestionsForRole(payload.participantRoleKey));
      } catch (error) {
        return json({ error: error instanceof Error ? error.message : "答卷无效" }, 400, origin);
      }
      const { data: session, error: sessionError } = await db.from("assessment_sessions").select("*").eq("code", payload.sessionCode).maybeSingle();
      if (sessionError) throw sessionError;
      if (!session) return json({ error: "没有找到这个测评场次" }, 404, origin);
      if (session.status !== "open") return json({ error: "本场测评已经关闭，不能继续提交" }, 409, origin);

      const existingQuery = await db.from("assessment_submissions").select("report_token, ai_status")
        .eq("session_id", session.id).eq("idempotency_key", payload.idempotencyKey).maybeSingle();
      if (existingQuery.error) throw existingQuery.error;
      if (existingQuery.data) return json({ reportToken: existingQuery.data.report_token, aiStatus: existingQuery.data.ai_status }, 200, origin);

      const questionList = getQuestionsForRole(payload.participantRoleKey);
      const style = scoreStyle(payload.answers, questionList);
      const { data: inserted, error: insertError } = await db.from("assessment_submissions").insert({
        session_id: session.id,
        report_token: randomToken(),
        participant_name: payload.participantName,
        participant_role: payload.participantRole,
        role_key: payload.participantRoleKey,
        answers: payload.answers,
        open_prompt: payload.openPrompt,
        idempotency_key: payload.idempotencyKey,
        style_code: style.code,
        style_name: style.name,
        style_data: style,
      }).select("*").single();
      if (insertError) throw insertError;
      return json({ reportToken: inserted.report_token, aiStatus: inserted.ai_status }, 201, origin);
    }

    const reportAnalyze = path.match(/^\/report\/([^/]+)\/analyze$/);
    if (method === "POST" && reportAnalyze) {
      const token = decodeURIComponent(reportAnalyze[1]);
      const { data, error } = await db.from("assessment_submissions").select("id").eq("report_token", token).maybeSingle();
      if (error) throw error;
      if (!data) return json({ error: "报告链接无效或已被删除" }, 404, origin);
      const result = await analyzeSubmission(data.id);
      return json({ aiStatus: result.ai_status }, 200, origin);
    }

    const reportMatch = path.match(/^\/report\/([^/]+)$/);
    if (method === "GET" && reportMatch) {
      const token = decodeURIComponent(reportMatch[1]);
      const { data, error } = await db.from("assessment_submissions").select("*, assessment_sessions(*)").eq("report_token", token).maybeSingle();
      if (error) throw error;
      if (!data) return json({ error: "报告链接无效或已被删除" }, 404, origin);
      return json({ report: publicReport(data, data.assessment_sessions) }, 200, origin);
    }

    if (method === "POST" && path === "/admin/login") {
      const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("cf-connecting-ip") || "unknown";
      const ipHash = await sha256(`${TEACHER_SECRET}:${forwarded}`);
      const { data: attempt, error: attemptError } = await db.from("assessment_login_attempts").select("*").eq("ip_hash", ipHash).maybeSingle();
      if (attemptError) throw attemptError;
      if (attempt?.blocked_until && new Date(attempt.blocked_until) > new Date()) return json({ error: "尝试次数过多，请稍后再试" }, 429, origin);
      const valid = safeTextEqual(await sha256(String(body.accessCode || "")), TEACHER_CODE_HASH);
      if (!valid) {
        const now = Date.now();
        const withinWindow = attempt && now - new Date(attempt.window_started_at).getTime() < 15 * 60_000;
        const attempts = withinWindow ? Number(attempt.attempts || 0) + 1 : 1;
        const blockedUntil = attempts >= 5 ? new Date(now + 15 * 60_000).toISOString() : null;
        const { error } = await db.from("assessment_login_attempts").upsert({
          ip_hash: ipHash,
          window_started_at: withinWindow ? attempt.window_started_at : new Date(now).toISOString(),
          attempts,
          blocked_until: blockedUntil,
        });
        if (error) throw error;
        return json({ error: blockedUntil ? "尝试次数过多，请15分钟后再试" : "教师口令不正确" }, blockedUntil ? 429 : 401, origin);
      }
      await db.from("assessment_login_attempts").delete().eq("ip_hash", ipHash);
      return json({ token: await createAdminToken(TEACHER_SECRET) }, 200, origin);
    }

    if (path.startsWith("/admin") && !(await requireAdmin(request))) {
      return json({ error: "教师登录已失效，请重新登录" }, 401, origin);
    }

    if (method === "GET" && path === "/admin/sessions") {
      const { data, error } = await db.from("assessment_sessions").select("*, assessment_submissions(count)").order("created_at", { ascending: false });
      if (error) throw error;
      return json({ sessions: (data || []).map(sessionJson) }, 200, origin);
    }

    if (method === "POST" && path === "/admin/sessions") {
      const title = String(body.title || "").trim().slice(0, 60);
      const cohort = String(body.cohort || "").trim().slice(0, 60);
      if (!title) return json({ error: "请填写场次名称" }, 400, origin);
      let created = null;
      for (let attempt = 0; attempt < 5 && !created; attempt += 1) {
        const result = await db.from("assessment_sessions").insert({ code: randomSessionCode(), title, cohort, assessment_version: ASSESSMENT_VERSION }).select("*").single();
        if (!result.error) created = result.data;
        else if (result.error.code !== "23505") throw result.error;
      }
      if (!created) throw new Error("场次码生成失败，请重试");
      return json({ session: sessionJson(created) }, 201, origin);
    }

    const dashboardMatch = path.match(/^\/admin\/sessions\/([^/]+)\/dashboard$/);
    if (method === "GET" && dashboardMatch) {
      const id = decodeURIComponent(dashboardMatch[1]);
      const sessionResult = await db.from("assessment_sessions").select("*").eq("id", id).maybeSingle();
      if (sessionResult.error) throw sessionResult.error;
      if (!sessionResult.data) return json({ error: "场次不存在" }, 404, origin);
      const result = await db.from("assessment_submissions").select("*").eq("session_id", id).order("submitted_at", { ascending: true });
      if (result.error) throw result.error;
      const rows = result.data || [];
      const summary = summarizeDashboard(rows);
      const ordered = dimensions.map((item) => ({ label: item.label, score: summary.dimensionAverages[item.id] || 0 })).sort((a, b) => b.score - a.score);
      summary.commonStrengths = ordered.slice(0, 2);
      summary.commonGaps = [...ordered].reverse().slice(0, 2);
      return json({ dashboard: {
        session: sessionJson(sessionResult.data),
        summary,
        submissions: rows.map((row) => ({
          id: row.id, participantName: row.participant_name, participantRole: row.participant_role,
          roleKey: row.role_key, levelCode: row.level_code, levelName: row.level_name,
          styleCode: row.style_code, styleName: row.style_name, aiStatus: row.ai_status,
          aiEngine: row.ai_engine, submittedAt: row.submitted_at, reportToken: row.report_token,
        })),
      } }, 200, origin);
    }

    const exportMatch = path.match(/^\/admin\/sessions\/([^/]+)\/export$/);
    if (method === "GET" && exportMatch) {
      const id = decodeURIComponent(exportMatch[1]);
      const result = await db.from("assessment_submissions").select("*").eq("session_id", id).order("submitted_at", { ascending: true });
      if (result.error) throw result.error;
      return new Response(buildCsv(result.data || []), { status: 200, headers: { ...cors(origin), "content-type": "text/csv; charset=utf-8" } });
    }

    const retryMatch = path.match(/^\/admin\/submissions\/([^/]+)\/retry$/);
    if (method === "POST" && retryMatch) {
      const result = await analyzeSubmission(decodeURIComponent(retryMatch[1]));
      return json({ aiStatus: result.ai_status }, 200, origin);
    }

    const sessionMatch = path.match(/^\/admin\/sessions\/([^/]+)$/);
    if (sessionMatch && method === "PATCH") {
      const status = body.status;
      if (!["open", "closed"].includes(status)) return json({ error: "场次状态无效" }, 400, origin);
      const result = await db.from("assessment_sessions").update({ status, closed_at: status === "closed" ? new Date().toISOString() : null }).eq("id", decodeURIComponent(sessionMatch[1])).select("*").maybeSingle();
      if (result.error) throw result.error;
      if (!result.data) return json({ error: "场次不存在" }, 404, origin);
      return json({ session: sessionJson(result.data) }, 200, origin);
    }
    if (sessionMatch && method === "DELETE") {
      const result = await db.from("assessment_sessions").delete().eq("id", decodeURIComponent(sessionMatch[1])).select("id").maybeSingle();
      if (result.error) throw result.error;
      if (!result.data) return json({ error: "场次不存在" }, 404, origin);
      return json({}, 204, origin);
    }

    return json({ error: "接口不存在" }, 404, origin);
  } catch (error) {
    console.error("assessment API error", error);
    const status = Number((error as any)?.status) || 500;
    return json({ error: status >= 500 ? "服务暂时不可用，请稍后再试" : (error as Error).message }, status, origin);
  }
});
