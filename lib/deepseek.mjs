export const RUBRIC_KEYS = [
  "audience",
  "purpose",
  "inputs",
  "process",
  "output",
  "constraints",
  "acceptance",
];

const SYSTEM_PROMPT = `你是“AI能力与风格测评”的开放题评分员。你只评估学员写出的提示词，不评估学员身份，也不能直接给出能力等级。

请按以下七项固定量表分别给0到3分，并从学员原文中给出简短证据：
1. audience：对象是否具体；
2. purpose：场景、任务和目标是否清楚；
3. inputs：输入资料、来源和使用顺序是否清楚；
4. process：是否说明执行步骤、检查点或协作方式；
5. output：交付格式、结构和细节是否明确；
6. constraints：事实边界、语言风格、时长或禁止事项是否明确；
7. acceptance：是否给出核对、验收或成功标准。

评分标准：0=完全缺失；1=笼统提及；2=清楚但不完整；3=具体且可直接执行。不得因为提示词长而自动给高分。不得补写学员没有表达的内容。

只输出严格 JSON：
{
  "rubric": {
    "audience": {"score": 0, "evidence": ""},
    "purpose": {"score": 0, "evidence": ""},
    "inputs": {"score": 0, "evidence": ""},
    "process": {"score": 0, "evidence": ""},
    "output": {"score": 0, "evidence": ""},
    "constraints": {"score": 0, "evidence": ""},
    "acceptance": {"score": 0, "evidence": ""}
  },
  "summary": "80字以内的总体点评",
  "strengths": ["优势1", "优势2"],
  "risks": ["改进点1", "改进点2"],
  "upgradedPrompt": "保持学员原意、但更完整可执行的升级版提示词",
  "nextActions": ["训练建议1", "训练建议2", "训练建议3"]
}`;

export function buildDeepSeekRequest({ promptText, model = "deepseek-v4-flash" }) {
  return {
    model,
    temperature: 0.1,
    thinking: { type: "disabled" },
    response_format: { type: "json_object" },
    max_tokens: 1800,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `请按上述量表分析以下提示词，并输出 JSON。\n\n学员提示词：\n${String(promptText || "").slice(0, 4000)}`,
      },
    ],
  };
}

function extractJson(text) {
  if (!text) throw new Error("empty model output");
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("invalid JSON output");
    return JSON.parse(match[0]);
  }
}

export function parseDeepSeekAnalysis(text) {
  const parsed = extractJson(text);
  const rubric = parsed?.rubric;
  if (!rubric || typeof rubric !== "object") throw new Error("invalid rubric");

  const scores = {};
  const normalizedRubric = {};
  for (const key of RUBRIC_KEYS) {
    const item = rubric[key];
    const score = Number(item?.score);
    if (!item || !Number.isInteger(score) || score < 0 || score > 3) {
      throw new Error(`invalid rubric: ${key}`);
    }
    scores[key] = score;
    normalizedRubric[key] = {
      score,
      evidence: String(item.evidence || "未在原文中找到明确证据").slice(0, 160),
    };
  }

  const strengths = Array.isArray(parsed.strengths) ? parsed.strengths.map(String).slice(0, 3) : [];
  const risks = Array.isArray(parsed.risks) ? parsed.risks.map(String).slice(0, 3) : [];
  const nextActions = Array.isArray(parsed.nextActions) ? parsed.nextActions.map(String).slice(0, 3) : [];
  if (!String(parsed.upgradedPrompt || "").trim()) throw new Error("invalid upgraded prompt");

  return {
    rubric: normalizedRubric,
    scores,
    summary: String(parsed.summary || "已完成提示词结构分析").slice(0, 240),
    strengths,
    risks,
    upgradedPrompt: String(parsed.upgradedPrompt).slice(0, 4000),
    nextActions,
  };
}

export async function analyzePromptWithRetry({
  promptText,
  apiKey,
  model = "deepseek-v4-flash",
  baseUrl = "https://api.deepseek.com",
  fetcher = fetch,
}) {
  let lastError = "unknown error";
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetcher(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(buildDeepSeekRequest({ promptText, model })),
      });
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`DeepSeek ${response.status}: ${detail.slice(0, 160)}`);
      }
      const payload = await response.json();
      const content = payload?.choices?.[0]?.message?.content || "";
      return {
        status: "complete",
        attempts: attempt,
        analysis: parseDeepSeekAnalysis(content),
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  return { status: "failed", attempts: 2, error: lastError };
}

