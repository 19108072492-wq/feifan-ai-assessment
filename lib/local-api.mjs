/**
 * Local API router — handles all API endpoints locally.
 *
 * AI 分析优先调用 Supabase Edge Function；浏览器只发送开放题提示词。
 * DeepSeek 密钥仅存在服务端，远程失败时自动回退到本地启发式分析。
 */

import {
  ASSESSMENT_VERSION,
  dimensions,
  getQuestionsForRole,
  scoreAssessment,
  scoreStyle,
} from "./assessment.mjs";
import { analyzePrompt as heuristicAnalyze } from "./heuristic-analysis.mjs";
import {
  analyzePromptRemotely,
  getOrCreateAnalysisClientId,
} from "./remote-analysis.mjs";
import {
  DEFAULT_ADMIN_CODE,
  clearLoginAttempt,
  deleteSessionById,
  findSubmissionByIdempotency,
  generateId,
  generateReportToken,
  generateSessionCode,
  getAdminCode,
  getLoginAttempt,
  getSessionByCode,
  getSessionById,
  getSessions,
  getSubmissionById,
  getSubmissionByToken,
  getSubmissionsBySession,
  saveLoginAttempt,
  saveSession,
  saveSubmission,
} from "./local-store.mjs";
import { buildCsv, summarizeDashboard } from "../supabase/functions/ai-assessment-api/_shared/core.mjs";

/* --------------------------- Helpers ---------------------------------- */

function sessionJson(session) {
  const submissions = getSubmissionsBySession(session.id);
  return {
    id: session.id,
    code: session.code,
    title: session.title,
    cohort: session.cohort,
    status: session.status,
    assessmentVersion: session.assessmentVersion || ASSESSMENT_VERSION,
    createdAt: session.createdAt,
    submissionCount: submissions.length,
  };
}

function publicReport(submission, session) {
  return {
    assessmentVersion: session.assessmentVersion || ASSESSMENT_VERSION,
    participant: { name: submission.participantName, role: submission.participantRole },
    session: { title: session.title, cohort: session.cohort },
    aiStatus: submission.aiStatus,
    aiEngine: submission.aiEngine || "heuristic",
    analysis: submission.analysis,
    scores: {
      choiceScore: submission.choiceScore,
      openScore: submission.openScore,
      rawTotalScore: submission.rawTotalScore,
      projectBonus: submission.projectBonus || 0,
      projectUpgrade: submission.projectUpgrade || { applied: false, eligible: false, levels: 0 },
      sectionScores: submission.sectionScores || {},
      totalScore: submission.totalScore,
      dimensions: submission.dimensionScores,
      level: { code: submission.levelCode, name: submission.levelName },
      style: submission.styleData,
    },
  };
}

export function validateAnswerValues(answerValues, questionList) {
  const items = questionList || getQuestionsForRole("teacher");
  if (!Array.isArray(answerValues) || answerValues.length !== items.length) {
    throw new Error(`请完成全部 ${items.length} 道选择题`);
  }
  for (let i = 0; i < items.length; i++) {
    const question = items[i];
    const value = answerValues[i];
    const ids = Array.isArray(value) ? value : [value];
    const invalid = ids.length === 0 ||
      (question.kind !== "multi" && ids.length !== 1) ||
      ids.some((id) => typeof id !== "string" || !question.options.some((option) => option.id === id));
    if (invalid) {
      throw new Error("答卷选项无效，请刷新后重新填写");
    }
  }
}

function assertSubmission(body) {
  const payload = body && typeof body === "object" ? body : {};
  if (
    !Array.isArray(payload.answers) ||
    payload.answers.length === 0 ||
    payload.answers.some((answer) => {
      if (Array.isArray(answer)) return answer.length === 0 || answer.some((id) => typeof id !== "string" || !id);
      return typeof answer !== "string" || !answer;
    })
  ) {
    throw new Error("请完成全部选择题");
  }
  const openPrompt = String(payload.openPrompt || "").trim();
  if (openPrompt.length < 30) throw new Error("开放题提示词至少30字");
  if (openPrompt.length > 2000) throw new Error("开放题提示词不能超过2000字");
  const participantName = String(payload.participantName || "").trim().slice(0, 30);
  const participantRole = String(payload.participantRole || "").trim().slice(0, 30);
  if (!participantName) throw new Error("请填写姓名");
  if (!participantRole) throw new Error("请选择岗位");
  const idempotencyKey = String(payload.idempotencyKey || "").trim();
  if (idempotencyKey.length < 3 || idempotencyKey.length > 100) throw new Error("提交标识无效");
  const sessionCode = String(payload.sessionCode || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(sessionCode)) throw new Error("场次码无效");
  return { sessionCode, participantName, participantRole, answers: payload.answers, openPrompt, idempotencyKey };
}

/* --------------------------- Token management ------------------------- */

const TOKEN_KEY = "ai-assessment:admin-tokens";

function getTokens() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(TOKEN_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTokens(tokens) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

function createToken() {
  const token = generateId() + generateId();
  const tokens = getTokens();
  tokens.push({ token, createdAt: Date.now(), expiresAt: Date.now() + 8 * 3600 * 1000 });
  saveTokens(tokens);
  return token;
}

function verifyToken(token) {
  if (!token) return false;
  const tokens = getTokens();
  const found = tokens.find((t) => t.token === token);
  if (!found) return false;
  if (Date.now() > found.expiresAt) {
    saveTokens(tokens.filter((t) => t.token !== token));
    return false;
  }
  return true;
}

/* --------------------------- AI Engine -------------------------------- */

/**
 * 先通过 Supabase 服务端调用 DeepSeek；失败时自动回退到本地启发式分析。
 * 浏览器只发送开放题文本，不持有任何供应商凭据。
 */
async function runAnalysis(submission) {
  const questionList = getQuestionsForRole(submission.roleKey || "teacher");
  let analysisResult = null;
  let engine = "heuristic";

  // 1) 通过服务端尝试 DeepSeek，浏览器不持有或发送 API key。
  if (typeof window !== "undefined") {
    try {
      const ds = await analyzePromptRemotely({
        promptText: submission.openPrompt,
        clientId: getOrCreateAnalysisClientId(window.localStorage),
      });
      if (ds.status === "complete") {
        analysisResult = ds.analysis;
        engine = "deepseek";
        submission.aiAttempts = ds.attempts;
      } else {
        submission.aiError = ds.error;
      }
    } catch (error) {
      submission.aiError = error instanceof Error ? error.message : String(error);
    }
  }

  // 2) 回退到启发式
  if (!analysisResult) {
    try {
      analysisResult = heuristicAnalyze(submission.openPrompt, submission.roleKey || "teacher");
      engine = "heuristic";
    } catch (error) {
      submission.aiStatus = "failed";
      submission.aiError = error instanceof Error ? error.message : String(error);
      saveSubmission(submission);
      throw new Error("答卷已保存，AI 点评暂时失败，教师可以稍后重试");
    }
  }

  // 3) 算总分
  const scores = scoreAssessment(submission.answers, analysisResult.scores, questionList);

  submission.aiStatus = "complete";
  submission.aiEngine = engine;
  submission.analysis = analysisResult;
  submission.choiceScore = scores.choiceScore;
  submission.openScore = scores.openScore;
  submission.rawTotalScore = scores.rawTotalScore;
  submission.projectBonus = scores.projectBonus;
  submission.projectUpgrade = scores.projectUpgrade;
  submission.sectionScores = scores.sectionScores;
  submission.totalScore = scores.totalScore;
  submission.levelCode = scores.level.code;
  submission.levelName = scores.level.name;
  submission.dimensionScores = scores.dimensions;
  saveSubmission(submission);
  return submission;
}

/* --------------------------- Route handlers --------------------------- */

function ok(body, status = 200) {
  return { ok: true, status, body };
}

function error(message, status = 400) {
  return { ok: false, status, body: { error: message } };
}

/* --------------------------- Main router ------------------------------ */

export async function handleLocalApi(method, path, body = {}, headers = {}) {
  // GET /health
  if (method === "GET" && path === "/health") {
    return ok({
      ok: true,
      version: ASSESSMENT_VERSION,
      aiEngine: "deepseek",
      aiConfigured: true,
      fallbackEngine: "heuristic",
    });
  }

  // GET /session/:code
  if (method === "GET" && path.startsWith("/session/")) {
    const code = decodeURIComponent(path.slice("/session/".length)).toUpperCase();
    const session = getSessionByCode(code);
    if (!session) return error("没有找到这个测评场次", 404);
    if (session.status !== "open") return error("本场测评已经关闭", 409);
    return ok({ session: sessionJson(session) });
  }

  // POST /submit
  if (method === "POST" && path === "/submit") {
    let payload;
    try {
      payload = assertSubmission(body);
      const role = String(body?.participantRoleKey || "teacher");
      const questionList = getQuestionsForRole(role);
      validateAnswerValues(payload.answers, questionList);
    } catch (err) {
      return error(err instanceof Error ? err.message : "答卷无效", 400);
    }

    const session = getSessionByCode(payload.sessionCode);
    if (!session) return error("没有找到这个测评场次", 404);
    if (session.status !== "open") return error("本场测评已经关闭，不能继续提交", 409);

    const existing = findSubmissionByIdempotency(session.id, payload.idempotencyKey);
    if (existing) {
      return ok({ reportToken: existing.reportToken, aiStatus: existing.aiStatus }, 200);
    }

    const roleKey = String(body?.participantRoleKey || "teacher");
    const questionList = getQuestionsForRole(roleKey);
    const style = scoreStyle(payload.answers, questionList);
    const submission = {
      id: generateId(),
      sessionId: session.id,
      reportToken: generateReportToken(),
      participantName: payload.participantName,
      participantRole: payload.participantRole,
      roleKey,
      answers: payload.answers,
      openPrompt: payload.openPrompt,
      idempotencyKey: payload.idempotencyKey,
      styleCode: style.code,
      styleName: style.name,
      styleData: style,
      aiStatus: "pending",
      aiEngine: "pending",
      aiAttempts: 0,
      submittedAt: new Date().toISOString(),
    };
    saveSubmission(submission);

    return ok({ reportToken: submission.reportToken, aiStatus: "pending" }, 201);
  }

  // GET /report/:token
  if (method === "GET" && path.startsWith("/report/") && !path.endsWith("/analyze")) {
    const token = decodeURIComponent(path.slice("/report/".length));
    const submission = getSubmissionByToken(token);
    if (!submission) return error("报告链接无效或已被删除", 404);
    const session = getSessionById(submission.sessionId);
    if (!session) return error("场次不存在", 404);
    return ok({ report: publicReport(submission, session) });
  }

  // POST /report/:token/analyze
  if (method === "POST" && path.startsWith("/report/") && path.endsWith("/analyze")) {
    const token = decodeURIComponent(path.slice("/report/".length, -"/analyze".length));
    const submission = getSubmissionByToken(token);
    if (!submission) return error("报告链接无效或已被删除", 404);

    if (submission.aiStatus === "complete") {
      return ok({ aiStatus: "complete" });
    }

    try {
      await runAnalysis(submission);
      return ok({ aiStatus: "complete" });
    } catch (err) {
      return ok({ aiStatus: "failed" }, 200);
    }
  }

  // POST /admin/login
  if (method === "POST" && path === "/admin/login") {
    const ipHash = "local-" + (typeof window !== "undefined" ? window.location.hostname : "local");
    const attempt = getLoginAttempt(ipHash);
    if (attempt?.blockedUntil && new Date(attempt.blockedUntil) > new Date()) {
      return error("尝试次数过多，请稍后再试", 429);
    }

    const accessCode = String(body?.accessCode || "");
    const expectedCode = getAdminCode();

    if (accessCode !== expectedCode) {
      const currentAttempts = (attempt?.attempts || 0) + 1;
      const shouldBlock = currentAttempts >= 5;
      saveLoginAttempt({
        ipHash,
        windowStartedAt: attempt?.windowStartedAt || new Date().toISOString(),
        attempts: currentAttempts,
        blockedUntil: shouldBlock ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null,
      });
      return error(
        shouldBlock ? "尝试次数过多，请15分钟后再试" : "教师口令不正确",
        shouldBlock ? 429 : 401,
      );
    }

    clearLoginAttempt(ipHash);
    const token = createToken();
    return ok({ token });
  }

  // --- Admin routes (require auth) ---
  const authHeader = String(headers?.authorization || "").replace(/^Bearer\s+/i, "");
  const isAdmin = verifyToken(authHeader);

  if (path.startsWith("/admin") && !isAdmin) {
    return error("教师登录已失效，请重新登录", 401);
  }

  // GET /admin/sessions
  if (method === "GET" && path === "/admin/sessions") {
    const sessions = getSessions().map(sessionJson);
    return ok({ sessions });
  }

  // POST /admin/sessions
  if (method === "POST" && path === "/admin/sessions") {
    const title = String(body?.title || "").trim().slice(0, 60);
    const cohort = String(body?.cohort || "").trim().slice(0, 60);
    if (!title) return error("请填写场次名称", 400);

    const session = {
      id: generateId(),
      code: generateSessionCode(),
      title,
      cohort,
      status: "open",
      assessmentVersion: ASSESSMENT_VERSION,
      createdAt: new Date().toISOString(),
      closedAt: null,
    };
    saveSession(session);
    return ok({ session: sessionJson(session) }, 201);
  }

  // PATCH /admin/sessions/:id
  if (method === "PATCH" && path.startsWith("/admin/sessions/") && !path.includes("/dashboard") && !path.includes("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length));
    const status = body?.status;
    if (!["open", "closed"].includes(status)) return error("场次状态无效", 400);
    const session = getSessionById(id);
    if (!session) return error("场次不存在", 404);
    session.status = status;
    session.closedAt = status === "closed" ? new Date().toISOString() : null;
    saveSession(session);
    return ok({ session: sessionJson(session) });
  }

  // DELETE /admin/sessions/:id
  if (method === "DELETE" && path.startsWith("/admin/sessions/") && !path.includes("/dashboard") && !path.includes("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length));
    const session = getSessionById(id);
    if (!session) return error("场次不存在", 404);
    deleteSessionById(id);
    return ok({}, 204);
  }

  // GET /admin/sessions/:id/dashboard
  if (method === "GET" && path.startsWith("/admin/sessions/") && path.endsWith("/dashboard")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length, -"/dashboard".length));
    const session = getSessionById(id);
    if (!session) return error("场次不存在", 404);

    const rows = getSubmissionsBySession(id);
    const mappedRows = rows.map((r) => ({
      participant_name: r.participantName,
      participant_role: r.participantRole,
      total_score: r.totalScore,
      level_code: r.levelCode,
      level_name: r.levelName,
      style_code: r.styleCode,
      style_name: r.styleName,
      ai_status: r.aiStatus,
      submitted_at: r.submittedAt,
      report_token: r.reportToken,
      id: r.id,
      dimension_scores: r.dimensionScores,
      open_prompt: r.openPrompt,
    }));

    const summary = summarizeDashboard(mappedRows);
    const ordered = dimensions
      .map((item) => ({ label: item.label, score: summary.dimensionAverages[item.id] || 0 }))
      .sort((a, b) => b.score - a.score);
    summary.commonStrengths = ordered.slice(0, 2);
    summary.commonGaps = [...ordered].reverse().slice(0, 2);

    return ok({
      dashboard: {
        session: sessionJson(session),
        summary,
        submissions: rows.map((r) => ({
          id: r.id,
          participantName: r.participantName,
          participantRole: r.participantRole,
          roleKey: r.roleKey,
          levelCode: r.levelCode,
          levelName: r.levelName,
          styleCode: r.styleCode,
          styleName: r.styleName,
          aiStatus: r.aiStatus,
          aiEngine: r.aiEngine,
          submittedAt: r.submittedAt,
          reportToken: r.reportToken,
        })),
      },
    });
  }

  // POST /admin/submissions/:id/retry
  if (method === "POST" && path.startsWith("/admin/submissions/") && path.endsWith("/retry")) {
    const id = decodeURIComponent(path.slice("/admin/submissions/".length, -"/retry".length));
    const submission = getSubmissionById(id);
    if (!submission) return error("答卷不存在", 404);

    submission.aiStatus = "pending";
    saveSubmission(submission);
    try {
      await runAnalysis(submission);
      return ok({ aiStatus: "complete" });
    } catch (err) {
      return ok({ aiStatus: "failed" });
    }
  }

  // GET /admin/sessions/:id/export
  if (method === "GET" && path.startsWith("/admin/sessions/") && path.endsWith("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length, -"/export".length));
    const rows = getSubmissionsBySession(id);
    const mappedRows = rows.map((r) => ({
      participant_name: r.participantName,
      participant_role: r.participantRole,
      total_score: r.totalScore,
      level_name: r.levelName,
      style_code: r.styleCode,
      style_name: r.styleName,
      ai_status: r.aiStatus,
      ai_engine: r.aiEngine,
      open_prompt: r.openPrompt,
      submitted_at: r.submittedAt,
    }));
    return ok({ csv: buildCsv(mappedRows), isCsv: true });
  }

  return error("接口不存在", 404);
}
