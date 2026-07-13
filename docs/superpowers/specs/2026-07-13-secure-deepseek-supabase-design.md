# Secure DeepSeek Supabase Design

## Goal

After a learner submits the open prompt, the browser sends only that prompt to a Supabase Edge Function. The function calls DeepSeek and returns the seven-item rubric, feedback, upgraded prompt, and training actions. The DeepSeek API key must never appear in browser storage, frontend forms, bundles, GitHub commits, or network requests from the browser to DeepSeek.

## Approved architecture

- Frontend hosting remains GitHub Pages.
- Backend uses the existing Supabase project `zhejiang-art-whitepaper-agent` only for the isolated `ai-assessment-analyze` Edge Function.
- The DeepSeek credential is stored as the project secret `AI_API_KEY`.
- The function uses `deepseek-v4-flash`, non-thinking mode, JSON output, low temperature, a 35-second timeout, and one retry.
- The browser calls the function with `{ promptText }` only. It never sends name, role, class, scores, session data, or any secret.
- The function accepts only the GitHub Pages origin and local preview origins, validates prompt length, limits repeated calls per browser/IP bucket, and handles CORS preflight.
- If the remote analysis fails, the existing heuristic analyzer still generates a report and marks the engine as heuristic.

## Frontend changes

- Replace direct DeepSeek calls with a small remote-analysis client.
- Generate a random per-browser client identifier for abuse throttling; it is not personal data.
- Remove the teacher API-key input, model input, masked-key display, and localStorage AI configuration.
- Show a fixed status card: `DeepSeek · 服务端托管`, with automatic local fallback.
- Rebuild `app-bundle.js` and keep the standalone page deployment path unchanged.

## Backend changes

- Split pure validation/request/response helpers into `supabase/functions/ai-assessment-analyze/core.mjs` for Node tests.
- Keep `index.ts` responsible for CORS, throttling, environment lookup, DeepSeek fetch, retry, and JSON responses.
- Deploy with `verify_jwt=false` because this is a public classroom endpoint; enforce origin, input, and throttling inside the function.

## Verification

- Unit tests prove that the browser request contains only `promptText`, never an API key or identity fields.
- Unit tests prove invalid origins and invalid prompt lengths are rejected.
- Source and built-bundle scans confirm no DeepSeek key or API-key UI remains.
- A live Edge Function call with a harmless sample prompt must return a valid seven-item rubric.
- GitHub Pages must build successfully and serve the refreshed bundle.

