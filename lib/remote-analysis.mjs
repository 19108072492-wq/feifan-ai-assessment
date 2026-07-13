import { parseDeepSeekAnalysis } from "./deepseek.mjs";

export const ANALYSIS_ENDPOINT =
  "https://eyzcleghbczxxptdwlkq.supabase.co/functions/v1/ai-assessment-analyze";

const CLIENT_ID_KEY = "ai-assessment:analysis-client-id";

function randomClientId() {
  return globalThis.crypto.randomUUID().replaceAll("-", "");
}

export function getOrCreateAnalysisClientId(storage, createId = randomClientId) {
  const current = String(storage?.getItem?.(CLIENT_ID_KEY) || "");
  if (/^[a-z0-9_-]{16,80}$/i.test(current)) return current;
  const created = String(createId());
  if (!/^[a-z0-9_-]{16,80}$/i.test(created)) {
    throw new Error("invalid analysis client identifier");
  }
  storage?.setItem?.(CLIENT_ID_KEY, created);
  return created;
}

export async function analyzePromptRemotely({
  promptText,
  clientId,
  endpoint = ANALYSIS_ENDPOINT,
  fetcher = fetch,
}) {
  try {
    const normalizedPrompt = String(promptText || "").trim();
    if (normalizedPrompt.length < 30 || normalizedPrompt.length > 2_000) {
      throw new Error("invalid prompt length");
    }
    if (!/^[a-z0-9_-]{16,80}$/i.test(String(clientId || ""))) {
      throw new Error("invalid client identifier");
    }

    const response = await fetcher(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-assessment-client": clientId,
      },
      body: JSON.stringify({ promptText: normalizedPrompt }),
    });
    if (!response.ok) throw new Error(`analysis endpoint ${response.status}`);
    const payload = await response.json();
    if (!payload?.ok || !payload?.analysis) throw new Error("invalid analysis response");
    return {
      status: "complete",
      attempts: Number(payload.attempts) || 1,
      analysis: parseDeepSeekAnalysis(JSON.stringify(payload.analysis)),
    };
  } catch {
    return {
      status: "failed",
      attempts: 1,
      error: "AI analysis is temporarily unavailable",
    };
  }
}

