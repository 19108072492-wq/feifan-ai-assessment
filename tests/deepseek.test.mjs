import assert from "node:assert/strict";
import test from "node:test";

import {
  analyzePromptWithRetry,
  buildDeepSeekRequest,
  parseDeepSeekAnalysis,
} from "../lib/deepseek.mjs";

const validAnalysis = {
  rubric: {
    audience: { score: 3, evidence: "面向第一次接触艺考的高二家长" },
    purpose: { score: 3, evidence: "理解备考阶段、双线平衡与家长配合" },
    inputs: { score: 3, evidence: "使用课程安排、政策文件和常见问题" },
    process: { score: 2, evidence: "先给结构再制作页面" },
    output: { score: 3, evidence: "40分钟PPT与逐页讲解重点" },
    constraints: { score: 2, evidence: "不得编造政策" },
    acceptance: { score: 2, evidence: "核对政策出处与时长" },
  },
  summary: "任务表达完整，资料和输出都比较清楚。",
  strengths: ["受众明确", "资料边界清楚"],
  risks: ["验收标准还可量化"],
  upgradedPrompt: "请先核对三类资料，再为高二家长制作40分钟讲座PPT。",
  nextActions: ["补充逐页时长", "给出引用位置", "增加交付检查清单"],
};

test("builds an anonymized non-thinking JSON request", () => {
  const request = buildDeepSeekRequest({
    promptText: "请帮我制作讲座PPT",
    participantName: "不应发送",
    participantRole: "不应发送",
  });
  const serialized = JSON.stringify(request);

  assert.equal(request.model, "deepseek-v4-flash");
  assert.deepEqual(request.thinking, { type: "disabled" });
  assert.deepEqual(request.response_format, { type: "json_object" });
  assert.match(serialized, /请帮我制作讲座PPT/);
  assert.doesNotMatch(serialized, /不应发送/);
});

test("accepts a complete rubric and flattens scores", () => {
  const parsed = parseDeepSeekAnalysis(JSON.stringify(validAnalysis));

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

test("rejects incomplete or out-of-range rubric output", () => {
  assert.throws(
    () => parseDeepSeekAnalysis(JSON.stringify({ ...validAnalysis, rubric: { audience: { score: 9 } } })),
    /invalid rubric/i,
  );
});

test("retries once after invalid JSON and returns the valid analysis", async () => {
  let calls = 0;
  const fetcher = async () => {
    calls += 1;
    return new Response(
      JSON.stringify({
        choices: [{ message: { content: calls === 1 ? "" : JSON.stringify(validAnalysis) } }],
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };

  const result = await analyzePromptWithRetry({
    promptText: "完整提示词",
    apiKey: "test-key",
    fetcher,
  });

  assert.equal(calls, 2);
  assert.equal(result.status, "complete");
  assert.equal(result.analysis.summary, validAnalysis.summary);
});

test("returns a retryable failure without losing the submission", async () => {
  const result = await analyzePromptWithRetry({
    promptText: "提示词",
    apiKey: "test-key",
    fetcher: async () => new Response("rate limited", { status: 429 }),
  });

  assert.equal(result.status, "failed");
  assert.equal(result.attempts, 2);
  assert.match(result.error, /429/);
});

