import assert from "node:assert/strict";
import test from "node:test";

import {
  ALLOWED_ORIGINS,
  buildDeepSeekRequest,
  createRateLimiter,
  isAllowedOrigin,
  parseAnalysis,
  validateAnalysisRequest,
} from "../supabase/functions/ai-assessment-analyze/core.mjs";

const validAnalysis = {
  rubric: {
    audience: { score: 3, evidence: "第一次接触艺考的高二家长" },
    purpose: { score: 3, evidence: "理解备考阶段和家长配合重点" },
    inputs: { score: 3, evidence: "课程安排、政策文件和常见问题" },
    process: { score: 2, evidence: "先输出结构，再逐页制作" },
    output: { score: 3, evidence: "40分钟PPT和逐页讲解重点" },
    constraints: { score: 2, evidence: "不得编造政策" },
    acceptance: { score: 2, evidence: "核对政策出处与总时长" },
  },
  summary: "任务对象、资料和交付物清楚。",
  strengths: ["对象明确", "资料完整"],
  risks: ["验收标准还可量化"],
  upgradedPrompt: "请先核对资料，再制作40分钟家长讲座PPT。",
  nextActions: ["补充时长", "标明引用", "增加检查清单"],
};

test("allows only the GitHub Pages and local preview origins", () => {
  assert.ok(ALLOWED_ORIGINS.includes("https://19108072492-wq.github.io"));
  assert.equal(isAllowedOrigin("https://19108072492-wq.github.io"), true);
  assert.equal(isAllowedOrigin("http://127.0.0.1:4567"), true);
  assert.equal(isAllowedOrigin("https://evil.example"), false);
  assert.equal(isAllowedOrigin(""), false);
});

test("accepts a prompt-only payload and rejects identity fields", () => {
  assert.deepEqual(
    validateAnalysisRequest({ promptText: "  这是一个足够长的家长讲座提示词，用来测试服务端是否只接收开放题提示词正文。  " }),
    { promptText: "这是一个足够长的家长讲座提示词，用来测试服务端是否只接收开放题提示词正文。" },
  );
  assert.throws(
    () => validateAnalysisRequest({ promptText: "这是一个足够长的家长讲座提示词，用来测试服务端是否只接收开放题提示词正文。", participantName: "不应发送" }),
    /unexpected field/i,
  );
  assert.throws(() => validateAnalysisRequest({ promptText: "太短" }), /length/i);
});

test("builds a V4 Flash non-thinking JSON request", () => {
  const request = buildDeepSeekRequest("这是一个足够长的提示词，用来测试模型请求参数。");
  assert.equal(request.model, "deepseek-v4-flash");
  assert.deepEqual(request.thinking, { type: "disabled" });
  assert.deepEqual(request.response_format, { type: "json_object" });
  assert.equal(request.temperature, 0.1);
  assert.match(JSON.stringify(request), /这是一个足够长的提示词/);
});

test("normalizes a complete seven-item analysis", () => {
  const parsed = parseAnalysis(JSON.stringify(validAnalysis));
  assert.equal(Object.keys(parsed.rubric).length, 7);
  assert.deepEqual(parsed.scores, {
    audience: 3,
    purpose: 3,
    inputs: 3,
    process: 2,
    output: 3,
    constraints: 2,
    acceptance: 2,
  });
  assert.equal(parsed.upgradedPrompt, validAnalysis.upgradedPrompt);
});

test("rate limiter blocks a third request in the same window", () => {
  const limiter = createRateLimiter({ limit: 2, windowMs: 1_000 });
  assert.equal(limiter.consume("client-a", 10_000).allowed, true);
  assert.equal(limiter.consume("client-a", 10_001).allowed, true);
  const blocked = limiter.consume("client-a", 10_002);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds > 0);
  assert.equal(limiter.consume("client-a", 11_100).allowed, true);
});
