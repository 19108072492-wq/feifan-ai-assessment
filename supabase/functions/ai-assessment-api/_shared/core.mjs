const encoder = new TextEncoder();

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function base64UrlToBytes(value) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
  return difference === 0;
}

export async function createAdminToken(secret, nowSeconds = Math.floor(Date.now() / 1000), ttlSeconds = 28800) {
  const payload = bytesToBase64Url(encoder.encode(JSON.stringify({ role: "teacher", iat: nowSeconds, exp: nowSeconds + ttlSeconds })));
  const signature = bytesToBase64Url(await hmac(payload, secret));
  return `${payload}.${signature}`;
}

export async function verifyAdminToken(token, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  try {
    const [payload, signature, extra] = String(token || "").split(".");
    if (!payload || !signature || extra) return null;
    const expected = await hmac(payload, secret);
    if (!constantTimeEqual(expected, base64UrlToBytes(signature))) return null;
    const parsed = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload)));
    if (parsed.role !== "teacher" || parsed.exp <= nowSeconds || parsed.iat > nowSeconds + 60) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function assertSubmission(value) {
  const payload = value && typeof value === "object" ? value : {};
  if (!Array.isArray(payload.answers) || payload.answers.length === 0 || payload.answers.some((answer) => {
    if (Array.isArray(answer)) return answer.length === 0 || answer.some((id) => typeof id !== "string" || !id);
    return typeof answer !== "string" || !answer;
  })) {
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
  const participantRoleKey = String(payload.participantRoleKey || "general").trim();
  if (!["consultant", "coach", "teacher", "general"].includes(participantRoleKey)) {
    throw new Error("岗位类型无效");
  }
  return { sessionCode, participantName, participantRole, participantRoleKey, answers: payload.answers, openPrompt, idempotencyKey };
}

function countBy(rows, codeKey, nameKey) {
  const counts = new Map();
  for (const row of rows) {
    const code = String(row[codeKey] || "");
    if (!code) continue;
    const key = `${code} ${String(row[nameKey] || "")}`.trim();
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Object.fromEntries(counts);
}

function dominant(distribution) {
  return Object.entries(distribution).reduce((winner, entry) => entry[1] > (winner?.[1] || 0) ? entry : winner, null)?.[0] || "";
}

export function summarizeDashboard(rows) {
  const total = rows.length;
  const scoredRows = rows.filter((row) => row.total_score !== null && row.total_score !== undefined);
  const scoredTotal = scoredRows.length;
  const dimensionIds = ["scene", "task", "data", "collaboration", "verification", "agent"];
  const levelDistribution = countBy(scoredRows, "level_code", "level_name");
  const styleDistribution = countBy(rows, "style_code", "style_name");
  const dimensionAverages = Object.fromEntries(dimensionIds.map((id) => [id, scoredTotal ? Math.round(scoredRows.reduce((sum, row) => sum + Number(row.dimension_scores?.[id] || 0), 0) / scoredTotal) : 0]));
  return {
    total,
    scoredTotal,
    averageScore: scoredTotal ? Math.round(scoredRows.reduce((sum, row) => sum + Number(row.total_score), 0) / scoredTotal) : 0,
    dominantLevel: dominant(levelDistribution),
    dominantStyle: dominant(styleDistribution),
    dimensionAverages,
    levelDistribution,
    styleDistribution,
  };
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function buildCsv(rows) {
  const headers = ["姓名", "岗位", "综合分", "成长等级", "风格代码", "风格名称", "AI点评状态", "开放题原文", "提交时间"];
  const lines = rows.map((row) => [row.participant_name, row.participant_role, row.total_score, row.level_name, row.style_code, row.style_name, row.ai_status, row.open_prompt, row.submitted_at].map(csvCell).join(","));
  return `\ufeff${[headers.join(","), ...lines].join("\r\n")}`;
}

export function publicReport(row, session) {
  return {
    assessmentVersion: session.assessment_version,
    participant: { name: row.participant_name, role: row.participant_role },
    session: { title: session.title, cohort: session.cohort },
    aiStatus: row.ai_status,
    aiEngine: row.ai_engine || "deepseek",
    analysis: row.ai_analysis,
    scores: {
      choiceScore: row.choice_score,
      openScore: row.open_score,
      rawTotalScore: row.raw_total_score,
      projectBonus: row.project_bonus || 0,
      projectUpgrade: row.project_upgrade || { applied: false, eligible: false, levels: 0 },
      sectionScores: row.section_scores || {},
      totalScore: row.total_score,
      dimensions: row.dimension_scores,
      level: { code: row.level_code, name: row.level_name },
      style: row.style_data,
    },
  };
}
