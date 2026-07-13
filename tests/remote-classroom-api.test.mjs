import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("browser API uses the shared Supabase classroom backend", async () => {
  const source = await readFile(new URL("lib/api.mjs", root), "utf8");
  assert.match(source, /functions\/v1\/ai-assessment-api/);
  assert.doesNotMatch(source, /handleLocalApi|local-api\.mjs/);
});

test("classroom Edge Function persists sessions and submissions with service role", async () => {
  const source = await readFile(
    new URL("supabase/functions/ai-assessment-api/index.ts", root),
    "utf8",
  );
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /assessment_sessions/);
  assert.match(source, /assessment_submissions/);
  assert.match(source, /\/session\//);
  assert.match(source, /\/admin\/sessions/);
  assert.match(source, /getQuestionsForRole/);
});

test("frontend bundle never contains the Supabase service-role secret", async () => {
  const source = await readFile(new URL("lib/api.mjs", root), "utf8");
  assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY|service_role/);
});
