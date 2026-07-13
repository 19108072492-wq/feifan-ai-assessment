import {
  buildDeepSeekRequest,
  createRateLimiter,
  isAllowedOrigin,
  parseAnalysis,
  validateAnalysisRequest,
} from "./core.mjs";

const limiter = createRateLimiter({ limit: 5, windowMs: 60 * 60 * 1_000 });

function corsHeaders(origin: string) {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type, x-assessment-client",
    "access-control-max-age": "86400",
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "vary": "origin",
  };
}

function json(body: unknown, status: number, origin: string, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), ...extraHeaders },
  });
}

async function callDeepSeek(promptText: string, apiKey: string) {
  const baseUrl = (Deno.env.get("AI_BASE_URL") || "https://api.deepseek.com").replace(/\/$/, "");
  let lastError = "analysis unavailable";

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35_000);
    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(buildDeepSeekRequest(promptText)),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`DeepSeek request failed with status ${response.status}`);
      }
      const payload = await response.json();
      const content = payload?.choices?.[0]?.message?.content || "";
      return { analysis: parseAnalysis(content), attempts: attempt };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      console.error(`assessment analysis attempt ${attempt} failed: ${lastError}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(lastError);
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin") || "";
  if (!isAllowedOrigin(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, origin);
  }

  const clientId = request.headers.get("x-assessment-client") || "";
  if (!/^[a-z0-9_-]{16,80}$/i.test(clientId)) {
    return json({ error: "Invalid client identifier" }, 400, origin);
  }
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = request.headers.get("cf-connecting-ip") || forwardedFor || "unknown";
  const quota = limiter.consume(`${clientIp}:${clientId}`);
  if (!quota.allowed) {
    return json(
      { error: "AI analysis rate limit reached" },
      429,
      origin,
      { "retry-after": String(quota.retryAfterSeconds) },
    );
  }

  let promptText: string;
  try {
    ({ promptText } = validateAnalysisRequest(await request.json()));
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Invalid request" }, 400, origin);
  }

  const apiKey = Deno.env.get("AI_API_KEY");
  if (!apiKey) {
    console.error("AI_API_KEY is not configured");
    return json({ error: "AI analysis is not configured" }, 503, origin);
  }

  try {
    const result = await callDeepSeek(promptText, apiKey);
    return json({ ok: true, ...result }, 200, origin);
  } catch (error) {
    console.error("assessment analysis failed after retry", error);
    return json({ error: "AI analysis is temporarily unavailable" }, 503, origin);
  }
});

