# Phase I.5 — Production-safe workforce bootstrap and foundation closeout

**Branch:** `cursor/phase-i5-production-foundation-closeout`
**Base main:** `33e2180adaf221ab6f8b3fbb3c4e128d07623363`

## Pre-bootstrap Production truth (verified)

- Production URL: https://mian-x-ai.vercel.app
- compiledSeats: 445
- persistedSeats: 0
- readyToAllocateSeats: 0
- allocatedSeats: 0
- activeInstances: 0
- liveTestedSeats: 0
- bootstrapStatus: bootstrap_required
- databaseReady: false
- foundationReady: false
- providerName: none
- liveExecutionReady: false
- OPENROUTER_API_KEY: intentionally absent
- Migrations applied; pending: 0

## Why local Vercel env-run bootstrap is invalid

Production Supabase/service-role secrets are **Sensitive/Encrypted** in Vercel.
`vercel env pull` / `vercel env run` expose non-readable placeholders locally.
Bootstrap must run inside an authenticated deployed Admin API where Production
env is available at runtime — never via Terminal secret paste or `.env.local`.

## Secure design

`POST /api/admin/workforce/bootstrap`

- `requireCapability(MANAGE_AGENTS)` → CSRF/same-origin via `requireAdmin*` / `assertMutationOrigin`
- Rate limit `admin-workforce-bootstrap:<userId>` 10/min
- Modes: `preflight` | `apply` | `idempotency`
- Apply requires confirmation exactly `BOOTSTRAP 445`
- Never accepts DB credentials from client
- Never returns secrets
- Audit events for preflight/apply attempts (requestId + actorId)
- Canonical service: `lib/core/workforce-i2/production-bootstrap.js`
- Additive upsert only; no deletes/truncates/allocations/provider calls

## No Production bootstrap in this PR

This Draft PR ships code only. Founder applies bootstrap after merge via Admin UI.

## Quality gates (local)

| Gate | Result |
|------|--------|
| lint | PASS (0 warnings) |
| typecheck | PASS |
| Vitest | 1213 passed \| 2 skipped (168 files) |
| build | PASS · themeColor warning count 0 |
| verify:browser | PASS (5/5) |
| Playwright | 136 passed |
| npm audit --omit=dev | 0 vulnerabilities |
| npm audit (full) | report honestly (high severity in transitive deps; no --force) |

## Manual Founder steps after merge

1. Merge this Draft PR (Founder only).
2. Wait for Production deploy.
3. Open `https://mian-x-ai.vercel.app/admin/workforce-activation`
4. Sign in as Founder/admin.
5. Click **Run Bootstrap Preflight** — confirm compiled 445 / schema ready.
6. Click **Bootstrap 445 Seats** → type `BOOTSTRAP 445` → Apply.
7. Confirm persisted 445 / ready 445 / allocated 0 / live tested 0.
8. Click **Run Idempotency Verification** — created must be 0.
9. Confirm `/api/core/health` shows foundationReady true, provider none, liveExecutionReady false.
10. Do **not** configure OpenRouter in this step.

## Expected after bootstrap (Founder applies)

- persisted: 445
- readyToAllocate: 445
- allocated / active / liveTested: 0
- liveExecutionReady: false until provider key
- foundationReady: true (provider-independent)

## Remaining blockers (Founder-only)

- Production bootstrap apply (this PR does not execute it)
- Optional OpenRouter key for live execution (not foundation)
- Scheduler ACTIVE flag only after verified tick
- Founder Proof final review approval (out of scope)
