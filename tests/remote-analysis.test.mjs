import assert from "node:assert/strict";
import test from "node:test";

import {
  ANALYSIS_ENDPOINT,
  analyzePromptRemotely,
  getOrCreateAnalysisClientId,
} from "../lib/remote-analysis.mjs";

const validAnalysis = {
  rubric: {
    audience: { score: 3, evidence: "高二家长" },
    purpose: { score: 3, evidence: "理解备考阶段" },
    inputs: { score: 3, evidence: "课程安排和政策文件" },
    process: { score: 2, evidence: "先结构后逐页" },
    output: { score: 3, evidence: "40分钟PPT" },
    constraints: { score: 2, evidence: "不编造政策" },
    acceptance: { score: 2, evidence: "核对出处" },
  },
  summary: "结构完整。",
  strengths: ["对象明确"],
  risks: ["验收可量化"],
  upgradedPrompt: "请根据资料制作40分钟家长讲座PPT。",
  nextActions: ["补充检查清单"],
};

test("targets the deployed Supabase analysis function", () => {
  assert.equal(
    ANALYSIS_ENDPOINT,
    "https://eyzcleghbczxxptdwlkq.supabase.co/functions/v1/ai-assessment-analyze",
  );
});

test("sends only promptText and a non-personal client identifier", async () => {
  let captured;
  const result = await analyzePromptRemotely({
    promptText: "这是一个足够长的讲座提示词，用来验证浏览器只向后端发送开放题正文。",
    participantName: "不应发送",
    participantRole: "不应发送",
    apiKey: "不应发送",
    clientId: "client_identifier_123456",
    fetcher: async (url, options) => {
      captured = { url, options };
      return new Response(JSON.stringify({ ok: true, attempts: 1, analysis: validAnalysis }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });

  assert.equal(result.status, "complete");
  assert.equal(captured.url, ANALYSIS_ENDPOINT);
  assert.deepEqual(JSON.parse(captured.options.body), {
    promptText: "这是一个足够长的讲座提示词，用来验证浏览器只向后端发送开放题正文。",
  });
  assert.equal(captured.options.headers["x-assessment-client"], "client_identifier_123456");
  assert.equal(captured.options.headers.authorization, undefined);
  assert.equal(captured.options.headers.apikey, undefined);
  assert.doesNotMatch(JSON.stringify(captured), /不应发送/);
});

test("returns a failure result for backend errors without exposing details", async () => {
  const result = await analyzePromptRemotely({
    promptText: "这是一个足够长的讲座提示词，用来验证服务端失败时能够安全回退。",
    clientId: "client_identifier_123456",
    fetcher: async () => new Response(JSON.stringify({ error: "internal provider detail" }), { status: 503 }),
  });

  assert.equal(result.status, "failed");
  assert.equal(result.attempts, 1);
  assert.equal(result.error, "AI analysis is temporarily unavailable");
  assert.doesNotMatch(result.error, /provider detail/);
});

test("persists one random client identifier without personal data", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  };
  const first = getOrCreateAnalysisClientId(storage, () => "random_identifier_1234567890");
  const second = getOrCreateAnalysisClientId(storage, () => "different_identifier_1234");
  assert.equal(first, "random_identifier_1234567890");
  assert.equal(second, first);
});

