# Phase I.9 — Durable Supabase scheduler closeout (gapless cutover)

**Branch:** `cursor/phase-i9-durable-production-scheduler`  
**Base `origin/main`:** `ef409485dd9449d81109332e03258ae055932807`  
**Production:** https://mian-x-ai.vercel.app  
**Migration applied in this PR:** **No** (Draft only)

---

## Critical cutover gap (corrected)

Earlier PR tip removed the GitHub Actions `*/5` schedule before Production Vault,
migration, verified `supabase_cron` tick, and `RUNTIME_SCHEDULER_ACTIVE=1`.
**Merging that shape would open a scheduler availability gap.**

**Fix:** restore `schedule: "*/5 * * * *"` as a **conditional gapless fallback**.
Scheduled runs query public `/api/core/health` → `schedulerContract` and **skip**
the tick only when `githubFallbackShouldSkip` is true (`supabase_primary_active`
+ healthy recent `supabase_cron`). `workflow_dispatch` always invokes.

---

## A. Current application acceptance — Verified

- Workforce: 445 capacity/compiled/persisted/ready · allocated/active/liveTested 0 · durables true · `providerName: none` · `liveExecutionReady: false`
- Founder Proof: `awaiting_final_review` / Final Review waiting · auto-approval forbidden
- Shared durable view model + transition states across Schedule / CC / health / Runtime
- GHA `*/5` + `workflow_dispatch` retained with health-gated skip
- Quality gates on this branch (see PR / final report)

## B. Durable scheduler implementation — Pending Production cutover

- Migration shipped (not applied): `supabase/migrations/20260731180000_phase_i9_supabase_cron_scheduler.sql`
- Canonical job: `mianx-runtime-tick-5m` · `*/5 * * * *`
- Vault names only: `mianx_runtime_tick_url`, `mianx_runtime_tick_secret`
- Until cutover completes, UI truthfully shows **GitHub fallback active** / cutover pending — Preview must not claim Production Vault/job/Healthy Supabase

## C. Live AI execution — Blocked

Provider none; no Founder Proof approval; no bootstrap in this phase.

---

## Transition states

| State | Meaning |
|-------|---------|
| `github_fallback_active` | Default / Preview / Vault-or-job missing — GHA schedule invokes |
| `supabase_configured_unverified` | Vault + job present; no durable `supabase_cron` success yet |
| `supabase_verified` | Durable `supabase_cron` success; ACTIVE not yet primary |
| `supabase_primary_active` | ACTIVE + platform + vault + job + recent healthy `supabase_cron` |
| `supabase_degraded` | Declared active but stale/failing/delayed — GHA **invokes** protected fallback |
| `rollback_to_github` | Paused or platform `github_actions` — GHA path |

**Degraded policy:** invoke GitHub fallback tick (not skip). Job leases + CAS prevent duplicate claims if Supabase still fires.

---

## Architecture

Supabase Cron (`pg_cron`) → `pg_net` POST → `/api/internal/runtime/tick` → durable queue/leases.

GitHub Actions: gapless `*/5` until `supabase_primary_active`; then scheduled skip; dispatch remains diagnostic.

---

## Gapless Founder cutover order

1. Merge and deploy PR **while GitHub scheduled fallback remains active**.
2. Create Production Vault secrets `mianx_runtime_tick_url` + `mianx_runtime_tick_secret` (values never in repo).
3. Apply approved additive migration after dry-run.
4. Confirm exactly one `cron.job` with name `mianx-runtime-tick-5m`.
5. Wait for a genuine scheduled Supabase Cron execution.
6. Verify `cron.job_run_details` success.
7. Verify durable tick evidence `source=supabase_cron`.
8. Verify HTTP success and truthful 0/0/0 no-op or real work.
9. Set `RUNTIME_SCHEDULER_PLATFORM=supabase_cron`.
10. Set `RUNTIME_SCHEDULER_ACTIVE=1`.
11. Redeploy Production if required for env changes.
12. Verify GitHub scheduled workflow **skips** (`Supabase Cron is active and healthy; fallback tick skipped.`).
13. Verify two consecutive Supabase Cron runs ~5 minutes apart.
14. Only then mark durable scheduler acceptance complete.

**No scheduler gap is permitted** — GHA schedule stays until step 12 succeeds.

---

## Rollback order

1. Set `RUNTIME_SCHEDULER_ACTIVE=0` (and redeploy if needed).
2. Confirm GitHub fallback resumes protected ticks (`githubFallbackShouldSkip=false`).
3. Unschedule **only** `mianx-runtime-tick-5m`.
4. Preserve `cron.job_run_details` evidence.
5. Do not delete unrelated cron jobs.
6. Keep Vault entries unless Founder explicitly removes them.
7. Verify GitHub source + truthful scheduler health / transition.
8. Do not invoke a provider.

---

## Health contract (public `/api/core/health` → `schedulerContract`)

Machine-readable, no secrets:

`primaryScheduler`, `schedulerActive`, `schedulerTransitionState`, `schedulerHealth`,
`latestSource`, `lastAttemptAt`, `lastSuccessAt`, `schedulerDelayMs`,
`configuredCadenceMs`, `canonicalJobName`, `githubFallbackShouldSkip`,
`liveExecutionReady`, `providerName`.

---

## Migration safety

- Alters only `mianx-runtime-tick-5m`
- Both Vault entries required before schedule; otherwise canonical job left unscheduled
- Repeat apply → exactly one canonical job
- No business/workforce/Founder Proof mutation; no secret literals

---

## Observability / security

Healthy primary only after recent `supabase_cron`. GHA alone ≠ Healthy.
Empty claim = successful no-op. Vault never returned via API/logs/tests.
Auth rejects missing/invalid Bearer. Concurrent dual-source ticks cannot double-claim.

---

## Remaining provider blocker

Live AI execution blocked until separate Founder authorization configures a provider.
