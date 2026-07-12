import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL("../supabase/migrations/20260711085605_create_assessment_schema.sql", import.meta.url);
const nativeSchemaUrl = new URL("../server/schema.sql", import.meta.url);

test("schema creates the three versioned assessment tables", async () => {
  const sql = await readFile(migrationUrl, "utf8");
  assert.match(sql, /create table public\.assessment_sessions/i);
  assert.match(sql, /create table public\.assessment_submissions/i);
  assert.match(sql, /create table public\.assessment_login_attempts/i);
  assert.match(sql, /assessment_version text not null default 'assessment-v1'/i);
});

test("schema enables RLS and grants no browser table access", async () => {
  const sql = await readFile(migrationUrl, "utf8");
  for (const table of ["assessment_sessions", "assessment_submissions", "assessment_login_attempts"]) {
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, "i"));
    assert.match(sql, new RegExp(`revoke all on table public\\.${table} from anon, authenticated`, "i"));
  }
  assert.doesNotMatch(sql, /create\s+policy/i);
});

test("deleting a session cascades to every personal answer and report", async () => {
  const sql = await readFile(migrationUrl, "utf8");
  assert.match(sql, /references public\.assessment_sessions\(id\) on delete cascade/i);
});

test("native schema grants the API role access to all assessment tables", async () => {
  const sql = await readFile(nativeSchemaUrl, "utf8");
  assert.match(
    sql,
    /grant select, insert, update, delete on\s+assessment_sessions,\s+assessment_submissions,\s+assessment_login_attempts\s+to assessment/i,
  );
});
