import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dashboardPath = new URL("../app/components/TeacherDashboard.tsx", import.meta.url);
const assessmentAppPath = new URL("../app/AssessmentApp.tsx", import.meta.url);
const localApiPath = new URL("../lib/local-api.mjs", import.meta.url);

test("teacher dashboard exposes backend status but no API key controls", async () => {
  const source = await readFile(dashboardPath, "utf8");
  for (const forbidden of [
    "apiKeyDraft",
    "apiKeyMasked",
    "API Key",
    "sk-...",
    "deepseek-chat",
    "/admin/ai-config",
  ]) {
    assert.doesNotMatch(source, new RegExp(forbidden.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(source, /服务端托管/);
  assert.match(source, /自动回退/);
  assert.match(source, /window\.location\.pathname/);
  assert.doesNotMatch(source, /origin\}\/\?s=/);
  assert.doesNotMatch(source, /href=\{`\/\?report=/);
});

test("browser API layer never stores or accepts a model credential", async () => {
  const source = await readFile(localApiPath, "utf8");
  for (const forbidden of [
    "ai-assessment:ai-config",
    "getEngineConfig",
    "apiKeyConfigured",
    "apiKeyMasked",
    "/admin/ai-config",
    "body?.apiKey",
  ]) {
    assert.doesNotMatch(source, new RegExp(forbidden.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("student app never reads legacy browser AI credentials", async () => {
  const source = await readFile(assessmentAppPath, "utf8");
  assert.doesNotMatch(source, /ai-assessment:ai-config/);
  assert.doesNotMatch(source, /cfg\.apiKey/);
  assert.match(source, /服务异常时自动回退/);
});
