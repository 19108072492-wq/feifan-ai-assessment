const RUBRIC_KEYS = ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"];
const EXPECTED_SECRET_HASH = "5832dcc17d863ca534c36e6942d33aa7e3ffb6b6d47c04274d28b4ba15130aee";

const SYSTEM_PROMPT = `你是“AI能力与风格测评”的开放题评分员。你只评估学员写出的提示词，不评估学员身份，也不能直接给出能力等级。

按七项固定量表分别给0到3分，并从学员原文中给出简短证据：
audience对象；purpose目的；inputs输入资料；process执行方式；output输出格式；constraints限制边界；acceptance验收标准。
评分标准：0=完全缺失；1=笼统提及；2=清楚但不完整；3=具体且可直接执行。不得因为提示词长而自动给高分，不得补写学员没有表达的内容。

只输出严格 JSON：
{"rubric":{"audience":{"score":0,"evidence":""},"purpose":{"score":0,"evidence":""},"inputs":{"score":0,"evidence":""},"process":{"score":0,"evidence":""},"output":{"score":0,"evidence":""},"constraints":{"score":0,"evidence":""},"acceptance":{"score":0,"evidence":""}},"summary":"80字以内总体点评","strengths":["优势1","优势2"],"risks":["改进点1","改进点2"],"upgradedPrompt":"保持原意但更完整可执行的升级版提示词","nextActions":["建议1","建议2","建议3"]}`;

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

async function sha256(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function parseAnalysis(text: string) {
  if (!text) throw new Error("模型返回空内容");
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("模型返回无效JSON");
    parsed = JSON.parse(match[0]);
  }
  const scores: Record<string, number> = {};
  const rubric: Record<string, { score: number; evidence: string }> = {};
  for (const key of RUBRIC_KEYS) {
    const item = parsed?.rubric?.[key];
    const score = Number(item?.score);
    if (!Number.isInteger(score) || score < 0 || score > 3) throw new Error(`量表分数无效: ${key}`);
    scores[key] = score;
    rubric[key] = { score, evidence: String(item?.evidence || "未在原文中找到明确证据").slice(0, 160) };
  }
  const list = (value: unknown) => Array.isArray(value) ? value.map(String).slice(0, 3) : [];
  if (!String(parsed?.upgradedPrompt || "").trim()) throw new Error("缺少升级版提示词");
  return {
    rubric,
    scores,
    summary: String(parsed.summary || "已完成提示词结构分析").slice(0, 240),
    strengths: list(parsed.strengths),
    risks: list(parsed.risks),
    upgradedPrompt: String(parsed.upgradedPrompt).slice(0, 4000),
    nextActions: list(parsed.nextActions),
  };
}

async function callModel(promptText: string) {
  const apiKey = Deno.env.get("AI_API_KEY");
  const baseUrl = (Deno.env.get("AI_BASE_URL") || "https://api.deepseek.com").replace(/\/$/, "");
  const model = Deno.env.get("AI_MODEL") || "deepseek-v4-flash";
  if (!apiKey) throw new Error("分析服务未配置密钥");

  let lastError = "分析失败";
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 35_000);
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          model,
          temperature: 0.1,
          thinking: { type: "disabled" },
          response_format: { type: "json_object" },
          max_tokens: 1800,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `请按量表分析以下提示词，只返回JSON。\n\n学员提示词：\n${promptText}` },
          ],
        }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeout));
      if (!response.ok) throw new Error(`DeepSeek ${response.status}: ${(await response.text()).slice(0, 160)}`);
      const payload = await response.json();
      return parseAnalysis(payload?.choices?.[0]?.message?.content || "");
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }
  throw new Error(lastError);
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const provided = request.headers.get("x-assessment-secret") || "";
  if (!provided || await sha256(provided) !== EXPECTED_SECRET_HASH) return json({ error: "Unauthorized" }, 401);
  try {
    const body = await request.json();
    const promptText = String(body?.promptText || "").trim();
    if (promptText.length < 30 || promptText.length > 2000) return json({ error: "提示词长度无效" }, 400);
    return json({ ok: true, analysis: await callModel(promptText) });
  } catch (error) {
    console.error("assessment analysis failed", error);
    return json({ error: error instanceof Error ? error.message : "分析失败" }, 503);
  }
});

