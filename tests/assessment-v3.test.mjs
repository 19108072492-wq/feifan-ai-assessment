import assert from "node:assert/strict";
import test from "node:test";

import {
  ASSESSMENT_VERSION,
  getQuestionsForRole,
  roles,
  scoreAssessment,
  styleProfiles,
} from "../lib/assessment.mjs";

const rubric = Object.fromEntries(
  ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"]
    .map((key) => [key, 1]),
);

function baselineAnswers(bank) {
  return bank.map((question) => question.kind === "multi" ? [question.options[0].id] : question.options[0].id);
}

function replaceAnswer(bank, answers, questionId, value) {
  const index = bank.findIndex((question) => question.id === questionId);
  assert.notEqual(index, -1, `missing question ${questionId}`);
  const copy = [...answers];
  copy[index] = value;
  return copy;
}

test("ships four assessment-v3 role banks with a 5+4+6+3 structure", () => {
  assert.equal(ASSESSMENT_VERSION, "assessment-v3");
  assert.deepEqual(roles.map(({ id }) => id), ["consultant", "coach", "teacher", "general"]);
  assert.deepEqual(roles.map(({ label }) => label), ["顾问", "教练", "教师", "通用测评"]);

  for (const { id } of roles) {
    const bank = getQuestionsForRole(id);
    assert.equal(bank.length, 18);
    assert.equal(bank.filter((question) => question.section === "foundation").length, 5);
    assert.equal(bank.filter((question) => question.section === "application").length, 4);
    assert.equal(bank.filter((question) => question.section === "style").length, 6);
    assert.equal(bank.filter((question) => question.section === "business").length, 3);
  }
});

test("agent use scores higher than model-only use", () => {
  const bank = getQuestionsForRole("general");
  const baseline = baselineAnswers(bank);
  const modelOnly = replaceAnswer(bank, baseline, "f-q2", ["f-q2-deepseek"]);
  const agentUse = replaceAnswer(bank, baseline, "f-q2", ["f-q2-deepseek", "f-q2-dify"]);

  assert.ok(
    scoreAssessment(agentUse, rubric, bank).choiceScore >
      scoreAssessment(modelOnly, rubric, bank).choiceScore,
  );
});

test("real projects add at most eight points", () => {
  const bank = getQuestionsForRole("general");
  const answers = replaceAnswer(bank, baselineAnswers(bank), "f-q5", [
    "f-q5-website-live",
    "f-q5-knowledge-active",
    "f-q5-automation-live",
  ]);
  const result = scoreAssessment(answers, rubric, bank);

  assert.equal(result.projectBonus, 8);
  assert.equal(result.totalScore, Math.min(100, result.rawTotalScore + 8));
});

test("mini program requires core development and live operation to raise one level", () => {
  const bank = getQuestionsForRole("general");
  const baseline = baselineAnswers(bank);
  const coreOnly = scoreAssessment(
    replaceAnswer(bank, baseline, "f-q5", ["f-q5-mini-core"]),
    rubric,
    bank,
  );
  const complete = scoreAssessment(
    replaceAnswer(bank, baseline, "f-q5", ["f-q5-mini-core", "f-q5-mini-live"]),
    rubric,
    bank,
  );

  assert.equal(coreOnly.projectUpgrade.applied, false);
  assert.equal(complete.projectUpgrade.applied, true);
  assert.equal(complete.projectUpgrade.levels, 1);
  assert.ok(["L2", "L3", "L4"].includes(complete.level.code));
});

test("behavior options do not reveal the best answer by position or extreme length", () => {
  const bank = getQuestionsForRole("general");
  const scored = bank.filter((question) => question.kind === "ability" && question.options.length === 4);
  const bestPositions = new Set(
    scored.map((question) => question.options.findIndex((option) => option.score === 3)),
  );
  assert.ok(bestPositions.size >= 3);

  for (const question of scored) {
    const lengths = question.options.map((option) => option.text.length);
    assert.ok(Math.max(...lengths) - Math.min(...lengths) <= 18, question.id);
  }
});

test("all eight style profiles include personal-report fields", () => {
  assert.equal(Object.keys(styleProfiles).length, 8);
  for (const profile of Object.values(styleProfiles)) {
    assert.equal(profile.strengths.length, 3);
    assert.equal(profile.risks.length, 2);
    assert.ok(profile.startMode);
    assert.ok(profile.divisionMode);
    assert.ok(profile.speedQuality);
    assert.ok(profile.recommendedWorkflow.length >= 3);
    assert.ok(profile.nextProjects.length >= 2);
  }
});
