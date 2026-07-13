import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getQuestionsForRole } from "../lib/assessment.mjs";
import * as localApi from "../lib/local-api.mjs";

const appPath = new URL("../app/AssessmentApp.tsx", import.meta.url);

function completeAnswers(bank) {
  return bank.map((question) => question.kind === "multi" ? [question.options[0].id] : question.options[0].id);
}

test("exports V3 answer validation", () => {
  assert.equal(typeof localApi.validateAnswerValues, "function");
});

test("accepts one or more valid IDs for multi questions", () => {
  const bank = getQuestionsForRole("general");
  const answers = completeAnswers(bank);
  const toolIndex = bank.findIndex((question) => question.id === "f-q2");
  answers[toolIndex] = ["f-q2-deepseek", "f-q2-dify"];

  assert.doesNotThrow(() => localApi.validateAnswerValues(answers, bank));
});

test("rejects empty, unknown and multi-valued single selections", () => {
  const bank = getQuestionsForRole("general");
  const toolIndex = bank.findIndex((question) => question.id === "f-q2");
  const singleIndex = bank.findIndex((question) => question.id === "a-q1");

  const empty = completeAnswers(bank);
  empty[toolIndex] = [];
  assert.throws(() => localApi.validateAnswerValues(empty, bank), /答卷选项无效/);

  const unknown = completeAnswers(bank);
  unknown[toolIndex] = ["not-an-option"];
  assert.throws(() => localApi.validateAnswerValues(unknown, bank), /答卷选项无效/);

  const multipleSingle = completeAnswers(bank);
  multipleSingle[singleIndex] = bank[singleIndex].options.slice(0, 2).map((option) => option.id);
  assert.throws(() => localApi.validateAnswerValues(multipleSingle, bank), /答卷选项无效/);
});

test("student UI renders and toggles multi-select questions", async () => {
  const source = await readFile(appPath, "utf8");
  assert.match(source, /question\.kind === "multi"/);
  assert.match(source, /可多选，请按真实使用情况选择/);
  assert.match(source, /toggleMultiOption/);
});
