# AI能力数据实验室全站重设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变测评业务、接口和数据的前提下，把学员入口、答题、个人报告和教师后台统一升级为深色“AI能力数据实验室”。

**Architecture:** 保留现有 React/Vinext 组件边界和状态流，只调整语义结构、展示组件与全局视觉系统。`AssessmentApp` 继续控制学员流程，`ReportView` 和 `TeacherDashboard` 保持现有数据接口；所有主题变量、纹理、响应式和动效集中在 `app/globals.css`，避免引入新UI框架。

**Tech Stack:** React 19、TypeScript、Vinext/Vite、Tailwind CSS v4入口、原生CSS、Recharts、QRCode、Node test runner、阿里云ECS/Nginx/systemd。

## Global Constraints

- 主背景使用石墨黑与冷灰，非凡黄是唯一高饱和强调色，不使用蓝紫AI渐变。
- 不修改题库、计分、DeepSeek分析、API、数据库、报告字段、教师权限和URL参数。
- 375像素宽手机为学员端主要验收尺寸，1440像素桌面为教师投屏主要验收尺寸。
- 所有触控目标至少44像素；键盘焦点清晰；`prefers-reduced-motion` 下停用装饰动效。
- 长图导出区域维持1080像素宽，不包含报告工具栏。
- 不新增主题切换、声音、3D、视频背景、外部图片和新运行时依赖。

---

## File Map

- Modify: `app/globals.css` — 全站设计令牌、纹理、布局、组件状态、响应式和动效。
- Modify: `app/AssessmentApp.tsx` — 入口、身份校准、生成状态、答题控制台的语义结构。
- Modify: `app/components/ReportView.tsx` — 深色个人能力报告结构，不改变数据和导出逻辑。
- Modify: `app/components/TeacherDashboard.tsx` — 课堂指挥中心结构，不改变场次与看板操作。
- Modify: `app/layout.tsx` — 主题色、描述和浏览器外观元数据。
- Create: `tests/ui-redesign.test.mjs` — 结构、主题令牌、可访问性和业务边界回归测试。
- Build output: `dist/` — 由 `npm run build` 生成，不手工编辑。

### Task 1: 锁定视觉结构和业务边界

**Files:**
- Create: `tests/ui-redesign.test.mjs`
- Read: `app/AssessmentApp.tsx`
- Read: `app/components/ReportView.tsx`
- Read: `app/components/TeacherDashboard.tsx`
- Read: `app/globals.css`

**Interfaces:**
- Consumes: 现有组件源码和CSS类名。
- Produces: 后续任务共同遵守的结构测试，不输出运行时代码。

- [ ] **Step 1: 写结构与主题失败测试**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("ships the graphite and Feifan yellow data-lab theme", async () => {
  const css = await read("app/globals.css");
  assert.match(css, /--lab-bg:/);
  assert.match(css, /--signal-yellow:/);
  assert.match(css, /\.data-grid/);
  assert.doesNotMatch(css, /linear-gradient\([^)]*(blue|purple|#7c3aed|#2563eb)/i);
});

test("marks the four redesigned product surfaces", async () => {
  const [app, report, admin] = await Promise.all([
    read("app/AssessmentApp.tsx"),
    read("app/components/ReportView.tsx"),
    read("app/components/TeacherDashboard.tsx"),
  ]);
  assert.match(app, /capability-lab/);
  assert.match(app, /assessment-console/);
  assert.match(report, /report-command-center/);
  assert.match(admin, /classroom-command-center/);
});

test("preserves critical assessment and teacher behaviors", async () => {
  const [app, admin] = await Promise.all([
    read("app/AssessmentApp.tsx"),
    read("app/components/TeacherDashboard.tsx"),
  ]);
  for (const marker of ["ai-assessment-draft:", "idempotencyKey", "/submit", "/analyze"]) {
    assert.match(app, new RegExp(marker.replaceAll("/", "\\/")));
  }
  for (const marker of ["/admin/sessions", "downloadCsv", "deleteSession", "retryAnalysis"]) {
    assert.match(admin, new RegExp(marker.replaceAll("/", "\\/")));
  }
});
```

- [ ] **Step 2: 运行测试并确认因新视觉标记缺失而失败**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: FAIL on `--lab-bg`, `capability-lab`, `report-command-center` and `classroom-command-center`.

- [ ] **Step 3: 提交测试基线**

```bash
git add tests/ui-redesign.test.mjs
git commit -m "test: define data lab redesign contract"
```

### Task 2: 建立深色数据实验室视觉基础

**Files:**
- Modify: `app/globals.css:1-20`
- Modify: `app/layout.tsx`
- Test: `tests/ui-redesign.test.mjs`

**Interfaces:**
- Consumes: Task 1 的CSS令牌断言。
- Produces: `--lab-bg`、`--lab-panel`、`--lab-panel-raised`、`--lab-line`、`--lab-text`、`--lab-muted`、`--signal-yellow`、`--danger`；通用类 `.data-grid`、`.lab-panel`、`.system-status`、`.mono-data`。

- [ ] **Step 1: 写元数据失败测试**

在 `tests/ui-redesign.test.mjs` 追加：

```js
test("publishes dark browser chrome metadata", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /themeColor.*#0b0d0f/s);
  assert.match(layout, /AI能力数据实验室/);
});
```

- [ ] **Step 2: 运行单测确认元数据断言失败**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: FAIL with missing `themeColor` or title copy.

- [ ] **Step 3: 替换全局设计令牌和页面底色**

在 `app/globals.css` 中建立以下核心变量，并将 `html`、`body`、按钮、输入、焦点环和减少动态效果规则接入这些变量：

```css
:root {
  --lab-bg: #0b0d0f;
  --lab-bg-soft: #101317;
  --lab-panel: #15191e;
  --lab-panel-raised: #1a1f25;
  --lab-line: rgba(228, 235, 241, .14);
  --lab-line-strong: rgba(242, 201, 76, .52);
  --lab-text: #f1f3f2;
  --lab-muted: #929aa3;
  --signal-yellow: #f2c94c;
  --signal-yellow-deep: #cfa622;
  --danger: #d66d5c;
  --focus-ring: 0 0 0 3px rgba(242, 201, 76, .22);
}

.data-grid {
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 36px 36px;
}
```

- [ ] **Step 4: 更新页面元数据**

在 `app/layout.tsx` 中把标题与描述更新为“AI能力数据实验室”，并导出：

```ts
export const viewport = {
  themeColor: "#0b0d0f",
  colorScheme: "dark",
};
```

- [ ] **Step 5: 运行UI测试**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: 元数据测试通过；页面结构标记测试仍失败。

- [ ] **Step 6: 提交视觉基础**

```bash
git add app/globals.css app/layout.tsx tests/ui-redesign.test.mjs
git commit -m "feat: establish graphite data lab theme"
```

### Task 3: 重设计入口、身份校准和生成状态

**Files:**
- Modify: `app/AssessmentApp.tsx:1-150`
- Modify: `app/globals.css`
- Test: `tests/ui-redesign.test.mjs`

**Interfaces:**
- Consumes: Task 2 的视觉令牌与通用状态类。
- Produces: `.capability-lab`、`.lab-nav`、`.lab-hero`、`.capability-orbit`、`.access-terminal`、`.identity-calibration`、`.analysis-pipeline`。

- [ ] **Step 1: 扩展入口结构失败测试**

```js
test("landing exposes access terminal and six capability dimensions", async () => {
  const app = await read("app/AssessmentApp.tsx");
  assert.match(app, /access-terminal/);
  assert.match(app, /capability-orbit/);
  for (const label of ["场景应用", "任务定义", "资料组织", "人机协作", "结果验证", "Agent认知"]) {
    assert.match(app, new RegExp(label));
  }
});
```

- [ ] **Step 2: 运行测试确认入口结构失败**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: FAIL with missing `access-terminal`.

- [ ] **Step 3: 调整入口语义结构**

保留 `enterSession`、`sessionCode`、`message` 和教师入口事件，使用以下层次替换原 landing markup：

```tsx
<main className="capability-lab data-grid">
  <nav className="lab-nav">
    <div className="lab-brand"><span className="brand-mark">VAN</span><strong>AI CAPABILITY LAB</strong></div>
    <button className="text-button" onClick={() => setMode("teacher")}>教师后台</button>
  </nav>
  <section className="lab-hero">
    <div className="lab-hero-copy">
      <p className="eyebrow">ASSESSMENT V1 / SYSTEM ONLINE</p>
      <h1>定位你的<br /><em>AI 工作坐标</em></h1>
      <p className="hero-description">16道选择题和1段真实提示词任务，生成六维能力、成长等级与AI使用风格。</p>
    </div>
    <aside className="access-terminal lab-panel">
      <p className="terminal-index">ACCESS / 01</p>
      <h2>接入课堂测评</h2>
      <form onSubmit={enterSession}>
        <label htmlFor="session-code">六位场次码</label>
        <input id="session-code" value={sessionCode} onChange={(event) => setSessionCode(event.target.value)} maxLength={6} />
        <button className="primary-button" disabled={loading}>接入测评</button>
      </form>
      {message && <p className="error-text">{message}</p>}
    </aside>
  </section>
</main>
```

六维视觉只展示标签，不添加虚假分数。场次码输入继续使用同一 `value`、`onChange` 和表单提交。

- [ ] **Step 4: 重构身份与生成状态结构**

身份页容器使用 `.identity-calibration`，生成页使用 `.analysis-pipeline` 并展示四个固定阶段标签；保留 `profile`、`beginAssessment`、`loadReport` 和错误信息逻辑。

- [ ] **Step 5: 添加入口和校准页响应式样式**

桌面入口使用 `minmax(0, 1.15fr) minmax(320px, .72fr)` 双栏；560像素以下改为单列并把接入舱放在能力标签之前。所有输入和按钮最小高度设为48像素。

- [ ] **Step 6: 运行UI测试与服务端渲染测试**

Run: `node --test tests/ui-redesign.test.mjs tests/frontend.test.mjs`

Expected: PASS.

- [ ] **Step 7: 提交入口重设计**

```bash
git add app/AssessmentApp.tsx app/globals.css tests/ui-redesign.test.mjs
git commit -m "feat: redesign learner access terminal"
```

### Task 4: 重设计逐题测评控制台

**Files:**
- Modify: `app/AssessmentApp.tsx:150-260`
- Modify: `app/globals.css`
- Test: `tests/ui-redesign.test.mjs`

**Interfaces:**
- Consumes: `question`、`displayedOptions`、`answers`、`current`、`chooseAnswer`、`submitAssessment`。
- Produces: `.assessment-console`、`.console-header`、`.console-progress`、`.question-module`、`.answer-module`、`.prompt-editor`。

- [ ] **Step 1: 写答题控制台失败测试**

```js
test("assessment renders stable console navigation and prompt editor", async () => {
  const app = await read("app/AssessmentApp.tsx");
  for (const marker of ["assessment-console", "console-progress", "question-module", "answer-module", "prompt-editor"]) {
    assert.match(app, new RegExp(marker));
  }
  assert.match(app, /aria-current/);
});
```

- [ ] **Step 2: 运行测试确认缺少控制台标记**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: FAIL with missing `assessment-console`.

- [ ] **Step 3: 调整题目和选项结构**

保留题目随机顺序和全部事件处理，把页面外层替换为：

```tsx
<main className="assessment-console data-grid">
  <header className="console-header">
    <div><span className="brand-mark">VAN</span><strong>{session?.title}</strong></div>
    <div className="mono-data">{String(current + 1).padStart(2, "0")} / {questions.length + 1}</div>
  </header>
  <div className="console-progress" aria-label={`测评进度 ${current + 1} / ${questions.length + 1}`}>
    <span style={{ width: `${((current + 1) / (questions.length + 1)) * 100}%` }} />
  </div>
  <section className="question-module">
    <p className="eyebrow">ABILITY SIGNAL / {question.dimension?.toUpperCase()}</p>
    <h1>{question.prompt}</h1>
    <div className="option-list">
      {displayedOptions.map((option, index) => (
        <button key={option.id} className={`answer-module ${answers[question.id] === option.id ? "selected" : ""}`} aria-current={answers[question.id] === option.id ? "true" : undefined} onClick={() => chooseAnswer(option.id)}>
          <span>{String.fromCharCode(65 + index)}</span><strong>{option.text}</strong>
        </button>
      ))}
    </div>
  </section>
</main>
```

每个选项继续使用原 `option.id`，选中项增加 `aria-current="true"`，未选中项不设置该属性。

- [ ] **Step 4: 调整开放题编辑器**

使用 `.prompt-editor` 包裹场景说明、资料提示、文本域和字数信息；保留30字校验、2000字上限和提交逻辑。

- [ ] **Step 5: 添加交互、焦点和移动样式**

选项选中只改变边框、角标、背景和内发光，不改变尺寸；按钮按下使用 `transform: translateY(1px)`；375像素下选项保持单列、正文不小于14像素。

- [ ] **Step 6: 运行UI、评分和草稿相关测试**

Run: `node --test tests/ui-redesign.test.mjs tests/scoring.test.mjs tests/api-core.test.mjs`

Expected: PASS.

- [ ] **Step 7: 提交答题控制台**

```bash
git add app/AssessmentApp.tsx app/globals.css tests/ui-redesign.test.mjs
git commit -m "feat: redesign assessment console"
```

### Task 5: 重设计个人能力报告

**Files:**
- Modify: `app/components/ReportView.tsx`
- Modify: `app/globals.css`
- Test: `tests/ui-redesign.test.mjs`

**Interfaces:**
- Consumes: 现有 `report`、`analysis`、`dimensions`、Recharts 雷达图和 `downloadLongImage`。
- Produces: `.report-command-center`、`.report-score-core`、`.report-signal-grid`、`.rubric-meter`、`.prompt-terminal`。

- [ ] **Step 1: 写报告结构与导出边界失败测试**

```js
test("report uses command-center sections and preserves export target", async () => {
  const report = await read("app/components/ReportView.tsx");
  for (const marker of ["report-command-center", "report-score-core", "report-signal-grid", "rubric-meter", "prompt-terminal"]) {
    assert.match(report, new RegExp(marker));
  }
  assert.match(report, /id="report-sheet"/);
  assert.match(report, /toPng\(reportRef\.current, \{[\s\S]*width: 1080,[\s\S]*pixelRatio: 1/);
});
```

- [ ] **Step 2: 运行测试确认新报告结构缺失**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: FAIL with missing `report-command-center`.

- [ ] **Step 3: 重组报告首屏和六维区**

保留所有字段访问方式，把报告首屏组织为身份信息、综合分核心、等级和风格信号区；雷达图数据与 `RadarChart` props 不变，只更新颜色为 `--signal-yellow` 对应值。

- [ ] **Step 4: 重组量表、洞察和提示词区**

七项量表每项增加基于 `score / 3` 的视觉刻度，原文证据仍完整显示；优势、盲区、训练建议顺序不变；优化版提示词使用 `.prompt-terminal`。

- [ ] **Step 5: 添加长图与移动端样式**

`#report-sheet` 固定使用深色背景并避免半透明导出；工具栏保持在导出节点外；560像素以下分数核心、雷达图、量表和双栏内容全部单列。

- [ ] **Step 6: 运行报告结构和完整测试**

Run: `node --test tests/ui-redesign.test.mjs && npm test`

Expected: PASS，现有全部测试0失败。

- [ ] **Step 7: 提交个人报告重设计**

```bash
git add app/components/ReportView.tsx app/globals.css tests/ui-redesign.test.mjs
git commit -m "feat: redesign capability report"
```

### Task 6: 重设计教师课堂指挥中心

**Files:**
- Modify: `app/components/TeacherDashboard.tsx`
- Modify: `app/globals.css`
- Test: `tests/ui-redesign.test.mjs`

**Interfaces:**
- Consumes: 现有教师登录、场次CRUD、5秒刷新、筛选、重试、CSV和二维码逻辑。
- Produces: `.classroom-command-center`、`.command-sidebar`、`.command-metrics`、`.class-signal-map`、`.projection-qr`、`.submission-stream`。

- [ ] **Step 1: 写教师后台结构与无排名失败测试**

```js
test("teacher dashboard exposes command-center states without rankings", async () => {
  const admin = await read("app/components/TeacherDashboard.tsx");
  for (const marker of ["classroom-command-center", "command-metrics", "projection-qr", "submission-stream"]) {
    assert.match(admin, new RegExp(marker));
  }
  assert.doesNotMatch(admin, /排行榜|名次|按总分排序/);
  assert.match(admin, /setInterval\(.*5000/s);
});
```

- [ ] **Step 2: 运行测试确认指挥中心结构缺失**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: FAIL with missing `classroom-command-center`.

- [ ] **Step 3: 调整登录、场次导航和顶栏结构**

保留所有异步函数与状态，只替换展示层；删除按钮仍使用 `.danger` 并与复制、导出、关闭操作分组分离。

- [ ] **Step 4: 调整统计、二维码和分布结构**

四个关键数字使用 `.command-metrics`；六维均值使用 `.class-signal-map`；二维码使用 `.projection-qr`；共同优势、短板、等级和风格采用不同网格密度。

- [ ] **Step 5: 调整学员流和空状态**

列表容器使用 `.submission-stream`，保留提交时间顺序和三个筛选器；空场次显示二维码、场次码和“等待第一份答卷”，不得显示模拟数据。

- [ ] **Step 6: 添加桌面投屏与移动管理样式**

1440像素下首屏同时展示关键数字、六维均值和二维码；900像素以下侧栏变为顶部场次区，统计改为两列，表格横向滚动。

- [ ] **Step 7: 运行后台与API测试**

Run: `node --test tests/ui-redesign.test.mjs tests/api-core.test.mjs`

Expected: PASS.

- [ ] **Step 8: 提交教师后台重设计**

```bash
git add app/components/TeacherDashboard.tsx app/globals.css tests/ui-redesign.test.mjs
git commit -m "feat: redesign classroom command center"
```

### Task 7: 可访问性、响应式和视觉验收

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/ui-redesign.test.mjs`

**Interfaces:**
- Consumes: Tasks 2-6 的全部页面结构。
- Produces: 最终响应式、焦点、减少动态效果和空错误状态保障。

- [ ] **Step 1: 写可访问性CSS失败测试**

```js
test("supports keyboard focus and reduced motion", async () => {
  const css = await read("app/globals.css");
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /@media \(max-width: 560px\)/);
});
```

- [ ] **Step 2: 运行测试确认缺失的触控或焦点规则**

Run: `node --test tests/ui-redesign.test.mjs`

Expected: 若已有规则全部满足则临时收紧断言到 `.answer-module:focus-visible`，确保新组件覆盖后先失败。

- [ ] **Step 3: 完成焦点、触控和减少动态效果样式**

为按钮、链接、输入、选择器、文本域和答案模块定义统一焦点环；在减少动态效果媒体查询中停用扫描线、呼吸和进入动画。

- [ ] **Step 4: 完成375与1440布局检查**

Run: `npm run build`

然后在浏览器中检查：

```text
375×812：场次输入首屏可见；选项无横向溢出；报告单列；教师操作可横向滚动。
1440×900：首页双栏；教师首屏显示四指标、六维和二维码；表格不挤压统计区。
```

- [ ] **Step 5: 运行完整自动测试**

Run: `npm test`

Expected: build成功；24项或更多测试全部通过；0失败。

- [ ] **Step 6: 提交响应式与可访问性收尾**

```bash
git add app/globals.css tests/ui-redesign.test.mjs
git commit -m "fix: polish responsive and accessible states"
```

### Task 8: 线上部署与端到端验收

**Files:**
- Build: `dist/`
- Package: `/tmp/feifan-ai-assessment-ui.tar.gz`
- Deploy target: `/opt/feifan-ai-assessment`
- Test: `scripts/e2e-production.mjs`

**Interfaces:**
- Consumes: 完成构建的前端、现有API与阿里云CLI OAuth配置。
- Produces: 公网学员端和教师后台新UI；不改变服务地址和场次码。

- [ ] **Step 1: 运行部署前完整验证**

Run: `npm test`

Expected: 0 failures.

- [ ] **Step 2: 打包前端运行文件**

```bash
tar -czf /tmp/feifan-ai-assessment-ui.tar.gz dist server/web-server.mjs app public package.json
```

- [ ] **Step 3: 上传并用阿里云Cloud Assistant原子替换前端文件**

上传压缩包到服务器后，通过 Cloud Assistant 执行：

```bash
set -e
mkdir -p /opt/feifan-ai-assessment-ui-next
tar -xzf /root/feifan-ai-assessment-ui.tar.gz -C /opt/feifan-ai-assessment-ui-next
cp -a /opt/feifan-ai-assessment-ui-next/dist/. /opt/feifan-ai-assessment/dist/
cp /opt/feifan-ai-assessment-ui-next/server/web-server.mjs /opt/feifan-ai-assessment/server/web-server.mjs
systemctl restart ai-assessment-web
systemctl is-active ai-assessment-web
curl -fsS http://127.0.0.1:3000/
```

Expected: service is `active`, local page returns HTML containing `AI能力数据实验室`.

- [ ] **Step 4: 验证公网页面与预览场次**

Run:

```bash
curl -fsS http://116.62.188.106/api/health
curl -fsS http://116.62.188.106/api/session/3A3B53
curl -fsS http://116.62.188.106/ | rg "AI能力数据实验室"
```

Expected: API version remains `assessment-v1`; session `3A3B53` remains `open`; homepage contains new title.

- [ ] **Step 5: 运行真实端到端验收**

Run:

```bash
read -rs "TEACHER_ACCESS_CODE?教师口令: "
TEACHER_ACCESS_CODE="$TEACHER_ACCESS_CODE" node scripts/e2e-production.mjs
unset TEACHER_ACCESS_CODE
```

Expected:

```json
{
  "ok": true,
  "rubricCount": 7,
  "dashboardCount": 1,
  "csvBom": true,
  "idempotent": true,
  "closedSessionRejected": true
}
```

- [ ] **Step 6: 浏览器视觉验收**

检查学员链接 `http://116.62.188.106/?s=3A3B53` 和教师链接 `http://116.62.188.106/?teacher=1`，确认桌面与手机截图无溢出、不可读文字或旧暖白样式残留。

- [ ] **Step 7: 提交部署记录**

```bash
git add docs/superpowers/plans/2026-07-12-tech-data-lab-redesign.md
git commit -m "docs: record data lab redesign rollout"
```
