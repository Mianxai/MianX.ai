# Phase I.9 — Durable Supabase scheduler closeout

**Branch:** `cursor/phase-i9-durable-production-scheduler`  
**Base `origin/main`:** `ef409485dd9449d81109332e03258ae055932807`  
**Production:** https://mian-x-ai.vercel.app  
**Migration applied in this PR:** **No** (Draft only)

---

## A. Current application acceptance — Verified

- Workforce foundation truth unchanged: 445 capacity/compiled/persisted/ready · allocated/active/liveTested 0 · durables true · `providerName: none` · `liveExecutionReady: false`
- Founder Proof: `awaiting_final_review` / `founder_final_review` · Memory & Learning completed · Final Review waiting · auto-approval forbidden
- Schedule / Command Center / Runtime Overview / `/api/core/health` share `buildDurableSchedulerViewModel` via `buildSchedulerSurfaceSnapshot`
- GitHub Actions refactored to **diagnostic fallback** (`workflow_dispatch` only) — not claimed as reliable primary
- Quality gates run on this branch (see PR / final report)

## B. Durable scheduler implementation — Pending Production cutover

- Migration shipped (not applied): `supabase/migrations/20260731180000_phase_i9_supabase_cron_scheduler.sql`
- Canonical job: `mianx-runtime-tick-5m` · expression `*/5 * * * *`
- Vault names (values Founder-only): `mianx_runtime_tick_url`, `mianx_runtime_tick_secret`
- Until Vault + migration are live on Production, UI may show **Setup required** / **Stale** / legacy sources honestly

## C. Live AI execution — Blocked

- No provider configured; do not configure Anthropic/OpenRouter in this phase
- Do not approve Founder Proof Final Review
- Do not bootstrap/allocate workforce seats

---

## Current GitHub schedule-gap evidence

| Field | Value |
|-------|-------|
| Last scheduled GHA run | `2026-07-31T08:19:12Z` |
| Conclusion | success |
| Tick counters | claimed/succeeded/failed `0/0/0` (successful no-op) |
| Problem | Multi-hour private-repo schedule delivery gaps |
| UI | Truthfully **Stale** under legacy primary-as-GHA model |

Root cause: relying on GitHub Actions `*/5` as sole Production tick delivery is unreliable for private repos. Empty-queue ticks were succeeding when the workflow ran; gaps were in **schedule delivery**, not in queue/lease logic.

---

## Architecture decision

**Primary:** Supabase Cron (`pg_cron`) → `pg_net` HTTP POST → existing protected `/api/internal/runtime/tick` → durable queue + leases + rate limits + tick evidence.

**Fallback:** GitHub Actions `workflow_dispatch` only (Option A — disable scheduled trigger after Supabase Cron is configured). Avoids two independent five-minute Production tickers.

Does **not** duplicate `runTick` / claim logic.

---

## Vault / secret model

| Name | Purpose |
|------|---------|
| `mianx_runtime_tick_url` | Full Production tick URL |
| `mianx_runtime_tick_secret` | Same Bearer token as host `INTERNAL_RUNTIME_SECRET` (≥16 chars) |
| Host `INTERNAL_RUNTIME_SECRET` / `CRON_SECRET` | Endpoint auth (unchanged) |
| GitHub `INTERNAL_RUNTIME_SECRET`, `RUNTIME_TICK_BASE_URL` | Diagnostic fallback only |

No secret literals in migrations, logs, API responses, or tests.

---

## Transition plan (post-merge — ordered, no gap)

1. **Keep** current Production behavior until step 4: existing GHA schedule may still be on `main` until this PR merges; after merge, GHA schedule is removed — so **complete Vault + migration first on a coordinated window**, or briefly accept Founder `workflow_dispatch` only.
2. **Create Vault secrets** in Production Supabase (Dashboard or SQL) — values never committed.
3. **Dry-run** then **apply** migration `20260731180000_phase_i9_supabase_cron_scheduler.sql` (Founder). If Vault ready, job schedules; if not, NOTICE and inactive.
4. **Confirm** one `supabase_cron` tick (source header + durable tick record; counters may be 0/0/0).
5. **Confirm** GHA has **no** `schedule:` (this PR) — only `workflow_dispatch`.
6. Set host env `RUNTIME_SCHEDULER_PLATFORM=supabase_cron` and only after a verified tick `RUNTIME_SCHEDULER_ACTIVE=1`.
7. Do **not** re-enable a second 5-minute GHA schedule.

During a brief dual-fire window, **job leases** prevent duplicate claims.

---

## Rollback

1. `select cron.unschedule(jobid) from cron.job where jobname = 'mianx-runtime-tick-5m';` (or Dashboard).
2. Optionally clear Vault entries (Founder).
3. Re-enable a temporary GHA `schedule: "*/5 * * * *"` **only** if needed (Founder PR) — or use `workflow_dispatch` until restored.
4. Unset `RUNTIME_SCHEDULER_ACTIVE` / revert platform env if desired.
5. Functions `mianx_invoke_runtime_tick` / `mianx_scheduler_status` are safe to leave; they do not mutate business data.

---

## Observability

Canonical fields: `schedulerSource`, `schedulerJobName`, `configuredCadenceMs`, attempt/success/failure times, `latestHttpStatus`, claimed/succeeded/failed, `noOp`, `consecutiveFailures`, `schedulerHealth`, `schedulerDelayMs`.

Sources: `supabase_cron` | `github_actions` | `manual_diagnostic` | `never_run` | `legacy_or_unknown`.

Healthy **only** after recent successful **supabase_cron** tick. GHA success alone ≠ primary Healthy. Empty claim is successful no-op.

Safe RPC: `mianx_scheduler_status()` — no Vault plaintext, no Authorization headers.

---

## Security

- Vault-only DB-side secret source for cron HTTP
- Endpoint rejects missing/invalid Bearer
- Rate limit on admin tick; leases + CAS on claims
- Project isolation unchanged; no provider invocation from scheduler path itself (worker still fails closed without provider)

---

## Exact Founder setup steps

1. Create Vault secrets (names above) with Production URL + existing tick Bearer.
2. `npx supabase db push --dry-run` then apply migration (Founder).
3. Verify `select * from cron.job where jobname = 'mianx-runtime-tick-5m';`
4. Watch Schedule UI / health for `supabase_cron` + Healthy/Delayed (not Setup required).
5. Set `RUNTIME_SCHEDULER_PLATFORM=supabase_cron` + `RUNTIME_SCHEDULER_ACTIVE=1` after verified tick.
6. Keep GHA secrets for rare diagnostics only.

## Exact Production acceptance steps

1. Schedule shows Primary = Supabase Cron, job `mianx-runtime-tick-5m`, cadence 5 minutes.
2. Latest source `supabase_cron` within healthy window (or Delayed/Stale honestly).
3. No-op 0/0/0 still success.
4. `/api/core/health` `schedulerHealth` / `primaryScheduler` agree with Schedule.
5. Provider still `none`; `liveExecutionReady` false; Founder Proof not auto-approved.

## Remaining provider blocker

Live AI execution remains blocked until Founder configures a provider under a separate authorization. Phase I.9 does not configure or call any provider.
