# AI能力与风格测评 V3 内容重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将测评升级为四岗位、18道选择题加1道提示词题的 `assessment-v3`，加入 Agent/真实项目计分、符合条件的小程序等级提升、8型风格图鉴和个人风格分析。

**Architecture:** 新建聚焦内容与计分的 `lib/assessment-v3.mjs`，由现有 `lib/assessment.mjs` 统一转出，避免继续扩张旧版大文件。选择题答案允许单选字符串或多选字符串数组；计分核心先归一化答案，再分别计算基础、应用、业务、项目加成和风格。UI、Local API 与报告只消费稳定的题库和评分接口。

**Tech Stack:** React/TypeScript、JavaScript ES modules、Node test runner、esbuild standalone bundle、GitHub Pages、Supabase Edge Function（保持不变）。

## Global Constraints

- 新版本固定为 `assessment-v3`，历史V2报告不重算。
- 岗位固定为 `consultant` 顾问、`coach` 教练、`teacher` 教师、`general` 通用测评。
- 每个岗位固定18道选择题：5道基础、4道应用、6道风格、3道业务；另有1道开放题。
- 12道计分选择题占60%，开放题占40%；风格题不计能力分。
- 项目加分最高8分；小程序同时满足核心开发和成功运行或上线时，最终等级提升一级且不超过L4。
- 同题选项长度和专业度保持接近，最高分位置不固定，前端展示继续乱序。
- DeepSeek只接收开放题文本，前端和GitHub中不得出现供应商密钥。

---

### Task 1: V3题库与评分核心

**Files:**
- Create: `lib/assessment-v3.mjs`
- Modify: `lib/assessment.mjs`
- Modify: `tests/scoring.test.mjs`
- Create: `tests/assessment-v3.test.mjs`

**Interfaces:**
- Produces: `ASSESSMENT_VERSION`, `roles`, `dimensions`, `styleProfiles`, `getQuestionsForRole(role)`, `getOpenPromptForRole(role)`, `normalizeAnswerIds(answers)`, `scoreStyle(answers, questionList)`, `scoreAssessment(answers, rubric, questionList)`, `shuffledOptions(question, seed)`.
- `scoreAssessment` returns `{ choiceScore, openScore, rawTotalScore, projectBonus, totalScore, projectUpgrade, dimensions, level, style, sectionScores }`.

- [ ] **Step 1: Write failing V3 structure and scoring tests**

```js
const zeroRubric = Object.fromEntries(
  ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"].map((key) => [key, 0]),
);

function baselineAnswers(bank) {
  return bank.map((question) => question.kind === "multi" ? [question.options[0].id] : question.options[0].id);
}

function replaceAnswer(bank, answers, questionId, value) {
  const index = bank.findIndex((question) => question.id === questionId);
  const copy = [...answers];
  copy[index] = value;
  return copy;
}

function modelOnlyAnswers(bank) {
  return replaceAnswer(bank, baselineAnswers(bank), "f-q2", ["f-q2-deepseek"]);
}

function agentAnswers(bank) {
  return replaceAnswer(bank, baselineAnswers(bank), "f-q2", ["f-q2-deepseek", "f-q2-dify"]);
}

function miniProgramAnswers(bank) {
  return replaceAnswer(bank, baselineAnswers(bank), "f-q5", ["f-q5-mini-core", "f-q5-mini-live"]);
}

test("ships four assessment-v3 role banks with a 5+4+6+3 structure", () => {
  assert.equal(ASSESSMENT_VERSION, "assessment-v3");
  assert.deepEqual(roles.map(({ id }) => id), ["consultant", "coach", "teacher", "general"]);
  for (const { id } of roles) {
    const bank = getQuestionsForRole(id);
    assert.equal(bank.length, 18);
    assert.equal(bank.filter((q) => q.section === "foundation").length, 5);
    assert.equal(bank.filter((q) => q.section === "application").length, 4);
    assert.equal(bank.filter((q) => q.section === "style").length, 6);
    assert.equal(bank.filter((q) => q.section === "business").length, 3);
  }
});

test("agent use outranks model-only use", () => {
  const bank = getQuestionsForRole("general");
  assert.ok(scoreAssessment(modelOnlyAnswers(bank), zeroRubric, bank).choiceScore <
    scoreAssessment(agentAnswers(bank), zeroRubric, bank).choiceScore);
});

test("project bonus is capped and mini program evidence raises exactly one level", () => {
  const bank = getQuestionsForRole("general");
  const result = scoreAssessment(miniProgramAnswers(bank), zeroRubric, bank);
  assert.ok(result.projectBonus <= 8);
  assert.equal(result.projectUpgrade.applied, true);
  assert.equal(result.projectUpgrade.levels, 1);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/assessment-v3.test.mjs tests/scoring.test.mjs`

Expected: FAIL because `assessment-v3` and the four role banks do not exist.

- [ ] **Step 3: Implement common questions, role business questions, open prompts and scoring**

Create common question IDs `f-q1`–`f-q5`, `a-q1`–`a-q4`, `s-q1`–`s-q6`; create role IDs `c-q1`–`c-q3`, `o-q1`–`o-q3`, `t-q1`–`t-q3`, `g-q1`–`g-q3`. Multi-select questions use `kind: "multi"`; style questions use `kind: "style"`; other questions use `kind: "ability"`.

Implement exact project rules:

```js
const PROJECT_BONUSES = {
  "f-q5-website-live": 3,
  "f-q5-knowledge-active": 3,
  "f-q5-automation-live": 4,
};

function projectResult(selectedIds) {
  const projectBonus = Math.min(8, Object.entries(PROJECT_BONUSES)
    .filter(([id]) => selectedIds.includes(id))
    .reduce((sum, [, bonus]) => sum + bonus, 0));
  const miniCore = selectedIds.includes("f-q5-mini-core");
  const miniLive = selectedIds.includes("f-q5-mini-live");
  return { projectBonus, miniCore, miniLive, eligible: miniCore && miniLive };
}
```

Implement exact aggregation:

```js
const choiceScore = Math.round(
  sectionScores.foundation * 0.30 +
  sectionScores.application * 0.45 +
  sectionScores.business * 0.25
);
const rawTotalScore = Math.round(choiceScore * 0.60 + openScore * 0.40);
const totalScore = Math.min(100, rawTotalScore + projectBonus);
const baseLevel = levelForScore(totalScore);
const level = project.eligible ? nextLevel(baseLevel) : baseLevel;
```

`styleProfiles` must include `tagline`, `startMode`, `divisionMode`, `speedQuality`, `strengths` (3), `risks` (2), `bestTasks`, `collaborationMode`, `recommendedWorkflow`, `nextProjects`, and `upgrade` for all eight codes.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/assessment-v3.test.mjs tests/scoring.test.mjs`

Expected: all V3 structure, project, level boundary, style and shuffle tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/assessment-v3.mjs lib/assessment.mjs tests/assessment-v3.test.mjs tests/scoring.test.mjs
git commit -m "feat: add assessment v3 question and scoring core"
```

### Task 2: 多选答题与V3提交数据

**Files:**
- Modify: `app/AssessmentApp.tsx`
- Modify: `lib/local-api.mjs`
- Create: `tests/assessment-v3-submission.test.mjs`

**Interfaces:**
- Consumes: `question.kind`, `question.options`, `scoreAssessment`, `scoreStyle` from Task 1.
- Produces: answer values shaped as `string | string[]`; saved submissions include `rawTotalScore`, `projectBonus`, `projectUpgrade`, `sectionScores`, and detailed `styleData`.

- [ ] **Step 1: Write failing answer validation and submission tests**

```js
test("accepts one or more valid IDs for multi questions", () => {
  const bank = getQuestionsForRole("general");
  assert.doesNotThrow(() => validateV3Answers(completeAnswers(bank), bank));
});

test("rejects empty and unknown multi selections", () => {
  const bank = getQuestionsForRole("general");
  assert.throws(() => validateV3Answers(withEmptyToolAnswer(bank), bank));
  assert.throws(() => validateV3Answers(withUnknownToolAnswer(bank), bank));
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/assessment-v3-submission.test.mjs`

Expected: FAIL because current validation accepts strings only.

- [ ] **Step 3: Implement multi-select UI and validation**

In `AssessmentApp.tsx`, change `answers` to `Record<string, string | string[]>`. For `kind === "multi"`, toggle option IDs in an array and render checkbox-style option cards with the label `可多选，请按真实使用情况选择`; for other kinds preserve single-select behavior. `nextQuestion` requires a non-empty string or non-empty array.

In `local-api.mjs`, validate each answer against its question:

```js
export function validateAnswerValues(answerValues, questionList) {
  if (!Array.isArray(answerValues) || answerValues.length !== questionList.length) {
    throw new Error(`请完成全部 ${questionList.length} 道选择题`);
  }
  questionList.forEach((question, index) => {
    const value = answerValues[index];
    const ids = Array.isArray(value) ? value : [value];
    if ((question.kind === "multi" && ids.length === 0) ||
        (question.kind !== "multi" && ids.length !== 1) ||
        ids.some((id) => !question.options.some((option) => option.id === id))) {
      throw new Error("答卷选项无效，请刷新后重新填写");
    }
  });
}
```

Persist Task 1 scoring metadata and expose it from `publicReport` without changing the DeepSeek payload.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/assessment-v3-submission.test.mjs tests/api-core.test.mjs`

Expected: all answer validation and API tests PASS.

- [ ] **Step 5: Commit**

```bash
git add app/AssessmentApp.tsx lib/local-api.mjs tests/assessment-v3-submission.test.mjs
git commit -m "feat: support assessment v3 multi-select submissions"
```

### Task 3: 四岗位内容与测评文案

**Files:**
- Modify: `app/AssessmentApp.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`
- Create: `tests/assessment-v3-content.test.mjs`

**Interfaces:**
- Consumes: `roles`, `getQuestionsForRole`, `getOpenPromptForRole` from Task 1.
- Produces: landing and profile copy matching four roles and 18+1 structure.

- [ ] **Step 1: Write failing content tests**

```js
test("uses the four approved role labels and responsibilities", () => {
  assert.deepEqual(roles.map((r) => r.label), ["顾问", "教练", "教师", "通用测评"]);
  assert.match(roles.find((r) => r.id === "coach").description, /跟盯.*学习督查.*作业跟进/);
});

test("each role has a distinct business prompt and open task", () => {
  for (const role of roles) {
    assert.equal(getQuestionsForRole(role.id).filter((q) => q.section === "business").length, 3);
    assert.ok(getOpenPromptForRole(role.id).length >= 60);
  }
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/assessment-v3-content.test.mjs tests/rendered-html.test.mjs`

Expected: FAIL on old five-role and 22-question copy.

- [ ] **Step 3: Update role selector, landing copy and task headings**

Use exact landing copy: `四类岗位 · 18道选择题 · 1道真实提示词任务` and `约8–10分钟`。岗位下拉选项显示 `角色名称｜职责说明`，进入答题页后按 `基础AI能力探究`、`AI实际应用`、`AI使用风格`、`岗位业务场景` 标注当前题目部分。

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm run build && node --test tests/assessment-v3-content.test.mjs tests/rendered-html.test.mjs`

Expected: build succeeds and both tests PASS.

- [ ] **Step 5: Commit**

```bash
git add app/AssessmentApp.tsx app/page.tsx tests/assessment-v3-content.test.mjs tests/rendered-html.test.mjs
git commit -m "feat: update assessment v3 roles and content"
```

### Task 4: 8型风格图鉴与个人风格报告

**Files:**
- Create: `app/components/StyleAtlas.tsx`
- Modify: `app/components/ReportView.tsx`
- Modify: `app/components/TeacherDashboard.tsx`
- Modify: `app/AssessmentApp.tsx`
- Modify: `app/globals.css`
- Create: `tests/style-atlas.test.mjs`

**Interfaces:**
- Consumes: detailed `styleProfiles` and `styleData` from Tasks 1–2.
- Produces: `StyleAtlas({ onClose })` and expanded report sections.

- [ ] **Step 1: Write failing source and profile completeness tests**

```js
test("all eight profiles contain report and atlas fields", () => {
  assert.deepEqual(Object.keys(styleProfiles).sort(), ["DAF","DAV","DCF","DCV","EAF","EAV","ECF","ECV"]);
  for (const profile of Object.values(styleProfiles)) {
    assert.equal(profile.strengths.length, 3);
    assert.equal(profile.risks.length, 2);
    assert.ok(profile.recommendedWorkflow.length >= 3);
    assert.ok(profile.nextProjects.length >= 2);
  }
});

test("atlas renders every style and report renders personal behavior analysis", async () => {
  assert.match(await readFile(styleAtlasPath, "utf8"), /AI使用风格图鉴/);
  assert.match(await readFile(reportPath, "utf8"), /你如何启动任务/);
  assert.match(await readFile(reportPath, "utf8"), /推荐的AI工作流程/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/style-atlas.test.mjs`

Expected: FAIL because `StyleAtlas.tsx` and detailed profile fields do not exist.

- [ ] **Step 3: Implement atlas and expanded report**

`StyleAtlas` renders eight cards with code, name, tagline, strengths, risks, best tasks, collaboration mode and upgrade advice. Add entry buttons on landing, report and teacher style distribution. Use a modal overlay that preserves the current GitHub Pages pathname and closes without navigation.

Expand `ReportView` with axis labels and the exact sections `你如何启动任务`、`你如何与AI分工`、`你如何处理速度与质量`、`你的三项优势`、`需要留意的两项风险`、`推荐的AI工作流程`、`下一步适合尝试`。当 `projectUpgrade.applied` 为 true 时，显示 `真实项目加速项：小程序核心开发并成功运行，成长等级提升一级`，同时保留原始数字分数。

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/style-atlas.test.mjs tests/scoring.test.mjs`

Expected: all style profile, atlas and report tests PASS.

- [ ] **Step 5: Commit**

```bash
git add app/components/StyleAtlas.tsx app/components/ReportView.tsx app/components/TeacherDashboard.tsx app/AssessmentApp.tsx app/globals.css tests/style-atlas.test.mjs
git commit -m "feat: add AI style atlas and personal analysis"
```

### Task 5: 完整验证、独立包与GitHub Pages

**Files:**
- Modify: `app-bundle.js` (generated)
- Modify: `standalone.html` (generated CSS when changed)
- Test: `tests/*.test.mjs`

**Interfaces:**
- Consumes all previous tasks.
- Produces the deployable standalone GitHub Pages artifact.

- [ ] **Step 1: Run complete build and test suite**

Run: `npm run build && node --test tests/*.test.mjs`

Expected: build succeeds and every test passes with zero failures.

- [ ] **Step 2: Generate standalone assets**

Run: `node scripts/build-bundle.mjs`

Expected: `app-bundle.js` and the CSS inside `standalone.html` are updated.

- [ ] **Step 3: Scan generated frontend for credential regressions**

Run:

```bash
rg -n --hidden -g '!node_modules/**' -g '!.git/**' \
  'sk-[A-Za-z0-9]{16,}|apiKeyDraft|apiKeyMasked|ai-assessment:ai-config|/admin/ai-config|deepseek-chat' \
  app lib standalone.html app-bundle.js
```

Expected: no matches.

- [ ] **Step 4: Verify local preview content**

Run:

```bash
curl -sS http://127.0.0.1:4567/app-bundle.js | rg 'assessment-v3|AI使用风格图鉴|ai-assessment-analyze'
```

Expected: all three markers are present.

- [ ] **Step 5: Commit and push**

```bash
git add app-bundle.js standalone.html
git commit -m "build: publish assessment v3 standalone bundle"
git push origin main
```

- [ ] **Step 6: Verify GitHub Pages**

Download the public HTML and bundle with a cache-busting query. Confirm HTTP 200, `assessment-v3`, the Supabase endpoint, the style atlas marker, current-path classroom links, and no credential pattern.

Expected public URL: `https://19108072492-wq.github.io/feifan-ai-assessment/standalone.html`
