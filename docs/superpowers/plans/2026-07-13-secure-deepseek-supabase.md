# Secure DeepSeek Supabase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Route post-assessment AI analysis through Supabase so the DeepSeek key remains server-only.

**Architecture:** GitHub Pages sends only the learner's open prompt to a public, origin-restricted Supabase Edge Function. The function calls `deepseek-v4-flash`; frontend failures fall back to the local heuristic analyzer without losing the submission.

**Tech Stack:** React/Vinext standalone bundle, Node test runner, Supabase Edge Functions (Deno), DeepSeek Chat Completions.

## Global Constraints

- Never write or print the user-provided DeepSeek key in source, tests, bundles, commits, or final responses.
- Do not modify or delete Aliyun resources.
- Do not read or modify existing whitepaper tables or functions.
- Browser requests must contain only `promptText` plus a random non-personal client identifier header.
- Use `deepseek-v4-flash` with `thinking.type=disabled` and JSON output.

---

### Task 1: Edge Function contract

**Files:**
- Create: `supabase/functions/ai-assessment-analyze/core.mjs`
- Modify: `supabase/functions/ai-assessment-analyze/index.ts`
- Test: `tests/edge-analysis-core.test.mjs`

**Interfaces:**
- Produces: `validateAnalysisRequest(value)`, `buildDeepSeekRequest(promptText)`, `parseAnalysis(text)`, and `isAllowedOrigin(origin)`.

- [ ] Write tests for allowed origins, prompt-only validation, V4 Flash non-thinking JSON requests, and seven-item result validation.
- [ ] Run `node --test tests/edge-analysis-core.test.mjs` and verify failure because the core module is missing.
- [ ] Implement the pure core module and Edge Function handler with CORS, prompt validation, a best-effort request bucket, timeout, and one retry.
- [ ] Run the focused test and verify it passes.

### Task 2: Frontend remote analysis client

**Files:**
- Create: `lib/remote-analysis.mjs`
- Modify: `lib/local-api.mjs`
- Test: `tests/remote-analysis.test.mjs`

**Interfaces:**
- Produces: `analyzePromptRemotely({ promptText, fetcher, endpoint })` returning `{status, attempts, analysis? , error?}`.

- [ ] Write tests proving the request contains no API key, name, role, or session data and that backend errors produce a retryable failure result.
- [ ] Run `node --test tests/remote-analysis.test.mjs` and verify failure because the client module is missing.
- [ ] Implement the remote client and switch `runAnalysis` to remote-first with heuristic fallback.
- [ ] Run both focused tests and verify they pass.

### Task 3: Remove browser key configuration

**Files:**
- Modify: `app/components/TeacherDashboard.tsx`
- Modify: `lib/local-api.mjs`
- Test: `tests/frontend-secret-safety.test.mjs`

**Interfaces:**
- Teacher dashboard displays backend-managed status only; no key/model form or localStorage key configuration remains.

- [ ] Write a source-scan test that fails while API key inputs and localStorage AI configuration remain.
- [ ] Remove the configuration routes and UI, replacing them with a fixed backend-managed status card.
- [ ] Run the focused source-scan test and verify it passes.

### Task 4: Build and deploy

**Files:**
- Modify generated: `app-bundle.js`

**Interfaces:**
- Supabase function URL: `https://eyzcleghbczxxptdwlkq.supabase.co/functions/v1/ai-assessment-analyze`.

- [ ] Run the focused tests, then `npm run build` and the complete test suite; report unrelated legacy failures separately.
- [ ] Store `AI_API_KEY` only in Supabase Edge Function Secrets.
- [ ] Deploy `ai-assessment-analyze` with `verify_jwt=false`.
- [ ] Invoke the live function from an allowed origin and verify a valid seven-item rubric.
- [ ] Scan tracked files and the built bundle for the provided secret pattern and browser API-key fields.
- [ ] Commit and push the code to GitHub.
- [ ] Wait for GitHub Pages to succeed and verify the public preview URL returns HTTP 200.

