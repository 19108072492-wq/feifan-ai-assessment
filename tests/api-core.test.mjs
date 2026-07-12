import assert from "node:assert/strict";
import test from "node:test";

import {
  assertSubmission,
  buildCsv,
  createAdminToken,
  summarizeDashboard,
  verifyAdminToken,
} from "../supabase/functions/ai-assessment-api/_shared/core.mjs";

test("rejects incomplete submissions before any database write", () => {
  assert.throws(() => assertSubmission({ sessionCode: "ABC123" }), /16道选择题/);
  assert.throws(
    () => assertSubmission({ sessionCode: "ABC123", participantName: "张三", participantRole: "教师", answers: Array(16).fill("x"), openPrompt: "太短", idempotencyKey: "abc" }),
    /至少30字/,
  );
});

test("accepts a complete anonymous-safe submission payload", () => {
  const payload = assertSubmission({
    sessionCode: "abc123",
    participantName: " 张三 ",
    participantRole: "教师",
    answers: Array.from({ length: 16 }, (_, index) => `q${index + 1}-0`),
    openPrompt: "请根据三类指定资料，为高二艺考家长制作一份四十分钟讲座PPT，并逐页给出重点。",
    idempotencyKey: "submission-1",
  });
  assert.equal(payload.sessionCode, "ABC123");
  assert.equal(payload.participantName, "张三");
});

test("creates an expiring HMAC teacher token and rejects tampering", async () => {
  const token = await createAdminToken("secret", 1_000, 28_800);
  assert.equal((await verifyAdminToken(token, "secret", 1_100)).role, "teacher");
  assert.equal(await verifyAdminToken(`${token}x`, "secret", 1_100), null);
  assert.equal(await verifyAdminToken(token, "secret", 40_000), null);
});

test("summarizes anonymized class distributions without participant identity", () => {
  const summary = summarizeDashboard([
    { total_score: 80, level_code: "L4", level_name: "Agent推动者", style_code: "DAV", style_name: "标准交付者", dimension_scores: { scene: 70, task: 80, data: 90, collaboration: 80, verification: 75, agent: 85 } },
    { total_score: 60, level_code: "L3", level_name: "协同交付者", style_code: "DAV", style_name: "标准交付者", dimension_scores: { scene: 50, task: 60, data: 70, collaboration: 60, verification: 55, agent: 65 } },
  ]);
  assert.equal(summary.total, 2);
  assert.equal(summary.averageScore, 70);
  assert.equal(summary.dominantLevel, "L4 Agent推动者");
  assert.equal(summary.dominantStyle, "DAV 标准交付者");
  assert.equal(summary.dimensionAverages.data, 80);
  assert.doesNotMatch(JSON.stringify(summary), /participant|name/i);
});

test("exports Chinese-compatible UTF-8 CSV with a BOM", () => {
  const csv = buildCsv([{ participant_name: "张三", participant_role: "教师", total_score: 80, level_name: "Agent推动者", style_code: "DAV", style_name: "标准交付者", ai_status: "complete", open_prompt: "包含,逗号", submitted_at: "2026-07-11T08:00:00Z" }]);
  assert.equal(csv.codePointAt(0), 0xfeff);
  assert.match(csv, /姓名,岗位,综合分/);
  assert.match(csv, /"包含,逗号"/);
});

