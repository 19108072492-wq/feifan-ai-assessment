import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { styleProfiles } from "../lib/assessment.mjs";

test("all eight AI styles include complete personal analysis fields", () => {
  assert.deepEqual(Object.keys(styleProfiles).sort(), ["DAF", "DAV", "DCF", "DCV", "EAF", "EAV", "ECF", "ECV"]);
  for (const [code, profile] of Object.entries(styleProfiles)) {
    assert.ok(profile.name, `${code} should have a name`);
    assert.ok(profile.startMode, `${code} should explain task start mode`);
    assert.ok(profile.divisionMode, `${code} should explain AI division mode`);
    assert.ok(profile.speedQuality, `${code} should explain speed and quality preference`);
    assert.equal(profile.strengths.length, 3);
    assert.equal(profile.risks.length, 2);
    assert.ok(profile.recommendedWorkflow.length >= 3);
    assert.ok(profile.nextProjects.length >= 2);
  }
});

test("style atlas renders all profiles and keeps the psychometric disclaimer", async () => {
  const source = await readFile(new URL("../app/components/StyleAtlas.tsx", import.meta.url), "utf8");
  assert.match(source, /AI使用风格画像大全/);
  assert.match(source, /Object\.entries\(styleProfiles\)/);
  assert.match(source, /课程起点画像，不是标准化心理测验/);
  assert.match(source, /探索 E \/ 执行 D/);
  assert.match(source, /委派 A \/ 共创 C/);
  assert.match(source, /敏捷 F \/ 审慎 V/);
});

test("personal report explains the style in seven practical sections", async () => {
  const source = await readFile(new URL("../app/components/ReportView.tsx", import.meta.url), "utf8");
  for (const heading of [
    "你如何启动任务",
    "你如何与AI分工",
    "你如何处理速度与质量",
    "你的三项优势",
    "需要留意的两项风险",
    "推荐的AI工作流程",
    "下一步适合尝试",
  ]) assert.match(source, new RegExp(heading));
  assert.match(source, /项目实践加分/);
  assert.match(source, /小程序实战升级/);
});

