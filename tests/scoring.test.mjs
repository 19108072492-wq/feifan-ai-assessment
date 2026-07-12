import assert from "node:assert/strict";
import test from "node:test";

import {
  ASSESSMENT_VERSION,
  questions,
  scoreAssessment,
  scoreStyle,
  levelForScore,
  shuffledOptions,
} from "../lib/assessment.mjs";

test("ships the locked assessment-v1 question bank", () => {
  assert.equal(ASSESSMENT_VERSION, "assessment-v1");
  assert.equal(questions.length, 16);
  assert.equal(questions.filter((question) => question.kind === "ability").length, 10);
  assert.equal(questions.filter((question) => question.kind === "style").length, 6);
  assert.ok(questions.every((question) => question.options.length >= 2));
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
  const cases = [
    ["EAF", ["q11-e", "q12-e", "q13-a", "q14-a", "q15-f", "q16-f"]],
    ["EAV", ["q11-e", "q12-e", "q13-a", "q14-a", "q15-v", "q16-v"]],
    ["ECF", ["q11-e", "q12-e", "q13-c", "q14-c", "q15-f", "q16-f"]],
    ["ECV", ["q11-e", "q12-e", "q13-c", "q14-c", "q15-v", "q16-v"]],
    ["DAF", ["q11-d", "q12-d", "q13-a", "q14-a", "q15-f", "q16-f"]],
    ["DAV", ["q11-d", "q12-d", "q13-a", "q14-a", "q15-v", "q16-v"]],
    ["DCF", ["q11-d", "q12-d", "q13-c", "q14-c", "q15-f", "q16-f"]],
    ["DCV", ["q11-d", "q12-d", "q13-c", "q14-c", "q15-v", "q16-v"]],
  ];

  for (const [expected, selected] of cases) {
    assert.equal(scoreStyle(selected).code, expected);
  }
});

test("uses 2:1 style weights to resolve split preferences", () => {
  const result = scoreStyle([
    "q11-e",
    "q12-d",
    "q13-a",
    "q14-c",
    "q15-f",
    "q16-v",
  ]);

  assert.equal(result.code, "EAF");
  assert.deepEqual(result.confidence, {
    explorationExecution: "轻微",
    assignCocreate: "轻微",
    fastVerify: "轻微",
  });
});

test("keeps scoring stable when displayed options are shuffled", () => {
  const question = questions.find((item) => item.id === "q1");
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
