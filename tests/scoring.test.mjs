import assert from "node:assert/strict";
import test from "node:test";

import {
  ASSESSMENT_VERSION,
  questions,
  scoreAssessment,
  scoreStyle,
  levelForScore,
  shuffledOptions,
  getQuestionsForRole,
  roles,
} from "../lib/assessment.mjs";

test("ships the locked assessment-v2 role question banks", () => {
  assert.equal(ASSESSMENT_VERSION, "assessment-v2");
  for (const role of roles) {
    const roleQuestions = getQuestionsForRole(role.id);
    assert.equal(roleQuestions.length, 22);
    assert.equal(roleQuestions.filter((question) => question.kind === "ability").length, 16);
    assert.equal(roleQuestions.filter((question) => question.kind === "style").length, 6);
    assert.ok(roleQuestions.every((question) => question.options.length >= 2));
  }
});

test("maps exact score boundaries to the four growth levels", () => {
  assert.equal(levelForScore(0).code, "L1");
  assert.equal(levelForScore(39).code, "L1");
  assert.equal(levelForScore(40).code, "L2");
  assert.equal(levelForScore(59).code, "L2");
  assert.equal(levelForScore(60).code, "L3");
  assert.equal(levelForScore(79).code, "L3");
  assert.equal(levelForScore(80).code, "L4");
  assert.equal(levelForScore(100).code, "L4");
});

test("computes the eight deterministic style codes without ties", () => {
  const styleQuestions = questions.filter((question) => question.kind === "style");
  for (const expected of ["EAF", "EAV", "ECF", "ECV", "DAF", "DAV", "DCF", "DCV"]) {
    const selected = styleQuestions.map((question) => {
      const pole = expected[{ explorationExecution: 0, assignCocreate: 1, fastVerify: 2 }[question.axis]];
      return question.options.find((option) => option.pole === pole).id;
    });
    assert.equal(scoreStyle(selected, questions).code, expected);
  }
});

test("uses 2:1 style weights to resolve split preferences", () => {
  const preferred = { explorationExecution: "E", assignCocreate: "A", fastVerify: "F" };
  const selected = questions.filter((question) => question.kind === "style").map((question) => {
    const pole = question.weight === 2
      ? preferred[question.axis]
      : question.options.find((option) => option.pole !== preferred[question.axis]).pole;
    return question.options.find((option) => option.pole === pole).id;
  });
  const result = scoreStyle(selected, questions);

  assert.equal(result.code, "EAF");
  assert.deepEqual(result.confidence, {
    explorationExecution: "轻微",
    assignCocreate: "轻微",
    fastVerify: "轻微",
  });
});

test("keeps scoring stable when displayed options are shuffled", () => {
  const question = questions.find((item) => item.id === "t-q1");
  const first = shuffledOptions(question, 17);
  const second = shuffledOptions(question, 82);

  assert.notDeepEqual(first.map((option) => option.id), second.map((option) => option.id));
  assert.deepEqual(
    [...first].sort((a, b) => a.id.localeCompare(b.id)),
    [...second].sort((a, b) => a.id.localeCompare(b.id)),
  );
});

test("combines fixed dimension weights into a 60/40 final score", () => {
  const strongestAnswers = questions.map((question) => {
    if (question.kind === "ability") {
      return question.options.find((option) => option.score === 3).id;
    }
    return question.options[0].id;
  });
  const rubric = Object.fromEntries(
    ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"].map(
      (key) => [key, 3],
    ),
  );

  const result = scoreAssessment(strongestAnswers, rubric);

  assert.equal(result.choiceScore, 100);
  assert.equal(result.openScore, 100);
  assert.equal(result.totalScore, 100);
  assert.equal(result.level.code, "L4");
  assert.deepEqual(Object.values(result.dimensions), [100, 100, 100, 100, 100, 100]);
});

test("applies the fixed 60/40 weighting when the two parts differ", () => {
  const strongestAnswers = questions.map((question) => question.options.at(-1).id);
  const rubric = Object.fromEntries(
    ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"].map(
      (key) => [key, 0],
    ),
  );

  const result = scoreAssessment(strongestAnswers, rubric);
  assert.equal(result.choiceScore, 100);
  assert.equal(result.openScore, 0);
  assert.equal(result.totalScore, 60);
});
