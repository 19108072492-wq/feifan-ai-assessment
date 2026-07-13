export const RUBRIC_KEYS = [
  "audience",
  "purpose",
  "inputs",
  "process",
  "output",
  "constraints",
  "acceptance",
];

export const ALLOWED_ORIGINS = [
  "https://19108072492-wq.github.io",
  "http://127.0.0.1:4567",
  "http://localhost:4567",
];

const SYSTEM_PROMPT = `你是“AI能力与风格测评”的开放题评分员。你只评估学员写出的提示词，不评估学员身份，也不能直接给出能力等级。

按七项固定量表分别给0到3分，并从学员原文中给出简短证据：
audience对象；purpose目的；inputs输入资料；process执行方式；output输出格式；constraints限制边界；acceptance验收标准。
评分标准：0=完全缺失；1=笼统提及；2=清楚但不完整；3=具体且可直接执行。不得因为提示词长而自动给高分，不得补写学员没有表达的内容。

只输出严格 JSON：
{"rubric":{"audience":{"score":0,"evidence":""},"purpose":{"score":0,"evidence":""},"inputs":{"score":0,"evidence":""},"process":{"score":0,"evidence":""},"output":{"score":0,"evidence":""},"constraints":{"score":0,"evidence":""},"acceptance":{"score":0,"evidence":""}},"summary":"80字以内总体点评","strengths":["优势1","优势2"],"risks":["改进点1","改进点2"],"upgradedPrompt":"保持原意但更完整可执行的升级版提示词","nextActions":["建议1","建议2","建议3"]}`;

export function isAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.includes(String(origin || ""));
}

export function validateAnalysisRequest(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("invalid request body");
  }
  const unexpected = Object.keys(value).filter((key) => key !== "promptText");
  if (unexpected.length) throw new Error(`unexpected field: ${unexpected[0]}`);
  const promptText = String(value.promptText || "").trim();
  if (promptText.length < 30 || promptText.length > 2_000) {
    throw new Error("prompt length must be between 30 and 2000 characters");
  }
  return { promptText };
}

export function buildDeepSeekRequest(promptText) {
  return {
    model: "deepseek-v4-flash",
    temperature: 0.1,
    thinking: { type: "disabled" },
    response_format: { type: "json_object" },
    max_tokens: 1_800,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `请按量表分析以下提示词，只返回JSON。\n\n学员提示词：\n${String(promptText).slice(0, 2_000)}`,
      },
    ],
  };
}

function extractJson(text) {
  if (!text) throw new Error("empty model output");
  try {
    return JSON.parse(text);
  } catch {
    const match = String(text).match(/\{[\s\S]*\}/);
    if (!match) throw new Error("invalid JSON output");
    return JSON.parse(match[0]);
  }
}

export function parseAnalysis(text) {
  const parsed = extractJson(text);
  const rubric = {};
  const scores = {};
  for (const key of RUBRIC_KEYS) {
    const item = parsed?.rubric?.[key];
    const score = Number(item?.score);
    if (!Number.isInteger(score) || score < 0 || score > 3) {
      throw new Error(`invalid rubric: ${key}`);
    }
    rubric[key] = {
      score,
      evidence: String(item?.evidence || "未在原文中找到明确证据").slice(0, 160),
    };
    scores[key] = score;
  }
  if (!String(parsed?.upgradedPrompt || "").trim()) {
    throw new Error("invalid upgraded prompt");
  }
  const list = (value) => Array.isArray(value) ? value.map(String).slice(0, 3) : [];
  return {
    rubric,
    scores,
    summary: String(parsed.summary || "已完成提示词结构分析").slice(0, 240),
    strengths: list(parsed.strengths),
    risks: list(parsed.risks),
    upgradedPrompt: String(parsed.upgradedPrompt).slice(0, 4_000),
    nextActions: list(parsed.nextActions),
  };
}

export function createRateLimiter({ limit = 5, windowMs = 60 * 60 * 1_000 } = {}) {
  const buckets = new Map();
  return {
    consume(key, now = Date.now()) {
      const current = buckets.get(key);
      if (!current || now - current.startedAt >= windowMs) {
        buckets.set(key, { startedAt: now, count: 1 });
        return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
      }
      if (current.count >= limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.max(1, Math.ceil((current.startedAt + windowMs - now) / 1_000)),
        };
      }
      current.count += 1;
      return { allowed: true, remaining: limit - current.count, retryAfterSeconds: 0 };
    },
  };
}

