import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getOpenPromptForRole, getQuestionsForRole, roles } from "../lib/assessment.mjs";

const appPath = new URL("../app/AssessmentApp.tsx", import.meta.url);
const pagePath = new URL("../app/page.tsx", import.meta.url);

test("uses the four approved role labels and responsibilities", () => {
  assert.deepEqual(roles.map((role) => role.label), ["顾问", "教练", "教师", "通用测评"]);
  assert.match(roles.find((role) => role.id === "consultant").description, /销售、招生、咨询/);
  assert.match(roles.find((role) => role.id === "coach").description, /跟盯、学习督查、作业跟进/);
  assert.match(roles.find((role) => role.id === "teacher").description, /授课、教学、教研、课程设计/);
});

test("each role has three distinct business questions and one substantial open task", () => {
  const prompts = new Set();
  for (const role of roles) {
    assert.equal(getQuestionsForRole(role.id).filter((question) => question.section === "business").length, 3);
    const prompt = getOpenPromptForRole(role.id);
    assert.ok(prompt.length >= 60);
    prompts.add(prompt);
  }
  assert.equal(prompts.size, 4);
});

test("student UI explains the 18+1 structure and current section", async () => {
  const source = await readFile(appPath, "utf8");
  assert.match(source, /四类岗位 · 18道选择题 · 1道真实提示词任务/);
  assert.match(source, /基础AI能力探究/);
  assert.match(source, /AI实际应用/);
  assert.match(source, /AI使用风格/);
  assert.match(source, /岗位业务场景/);
  assert.match(source, /r\.description/);
  assert.match(source, /约8–10分钟/);
});

test("page metadata describes assessment v3", async () => {
  const source = await readFile(pagePath, "utf8");
  assert.match(source, /18道选择题和1道真实提示词任务/);
});
