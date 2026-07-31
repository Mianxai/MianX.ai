# Phase I.9 — Scheduler contract (pre-cutover)

**Branch:** `cursor/phase-i9-durable-production-scheduler`  
**Base main:** `ef409485dd9449d81109332e03258ae055932807`  
**Secrets:** documented by **name only** — values never printed.

---

## Runtime tick endpoint

| Field | Value |
|-------|-------|
| Path | `/api/internal/runtime/tick` |
| Methods | `POST` (preferred), `GET` (Vercel Cron compatible) |
| Auth header | `Authorization: Bearer <secret>` (also accepts `x-internal-secret`) |
| Host env names | `INTERNAL_RUNTIME_SECRET` (preferred), `CRON_SECRET` (fallback) — each ≥16 chars |
| GitHub secret names | `INTERNAL_RUNTIME_SECRET`, `CRON_SECRET` (optional), `RUNTIME_TICK_BASE_URL` |
| Request body (POST) | JSON ≤2048 bytes; optional `{ "max_jobs": <1..JOB_LIMITS.maxJobsPerTick>, "source"?: string }` |
| Scheduler source | Header `x-mianx-scheduler-source` preferred; body `source` fallback; normalize to `supabase_cron` \| `github_actions` \| `manual_diagnostic` \| `legacy_or_unknown` |
| Default payload (GHA diagnostic) | `{"max_jobs":5,"source":"github_actions"}` |
| Default payload (Supabase pg_net) | `{"max_jobs":5}` + header `x-mianx-scheduler-source: supabase_cron` |
| Success | HTTP 200/204 · `{ ok: true, tick: { recovered, claimed, succeeded, failed, dead_lettered, cancelled, duration_ms, worker, ... } }` |
| No-work / no-op | Same success shape with `claimed: 0`, `succeeded: 0`, `failed: 0` — **not** a failure |
| Auth missing/invalid | HTTP 401 · `{ error: { code: "UNAUTHORIZED", message: "Unauthorized." } }` — secret never echoed |
| Worker unconfigured | HTTP 503 · `WORKER_NOT_CONFIGURED` |
| Rate limit | Admin/API rate limit stack; internal tick uses worker secret path (not cookie) |
| Lease behaviour | `runTick` recovers expired leases; atomic claim; overlapping ticks cannot double-run the same job |
| Queue claim | Bounded `maxJobs` / `JOB_LIMITS.maxJobsPerTick` / `maxTickMs` |
| Idempotency | Job CAS status transitions; lease owner; concurrency group on GHA historically |
| Tick persistence | `organizations.metadata.last_runtime_tick` via `recordRuntimeTickSummary` (Phase I.9 extends with `source`, attempt/success/failure stamps) |
| Schedule UI source | `/api/admin/command-center` → `schedule` (+ Phase I.9 durable view model) |
| Health fields | `/api/core/health` → `runtime.lastTickAt`, counters, `schedulerStatus` / durable view |

## Phase I.9 target

| Primary | Supabase Cron job `mianx-runtime-tick-5m` → `pg_net` → same endpoint |
| Fallback | GitHub Actions `workflow_dispatch` only (no dual 5-minute Production ticks after cutover) |
| Vault names | `mianx_runtime_tick_url`, `mianx_runtime_tick_secret` |

## Observed GHA gap evidence (I.8)

Last scheduled success `2026-07-31T08:19:12Z` HTTP 200 · 0/0/0; multi-hour delivery gaps on private repo; UI correctly Stale.
