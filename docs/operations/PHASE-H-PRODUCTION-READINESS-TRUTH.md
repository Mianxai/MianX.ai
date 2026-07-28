# Phase H — Production Readiness Truth

## Purpose

Document how production health tells the truth about Phase H integration readiness after the production-proof closeout.

## What was wrong

Production health previously returned:

```text
pendingMigrationsKnown: [
  "20260728210000_phase_h_integration_runtime.sql (additive — apply only with Founder approval)"
]
```

even though the Phase H migration was already applied. That list was a **static hardcoded** readiness note, not a query of migration history.

## Fix (safe approach)

Health no longer invents a pending migration filename.

Instead:

1. Probe whether required integration tables are queryable (capability booleans only).
2. Derive `migrationReadiness`:
   - `applied_or_equivalent` when all five tables are present
   - `schema_missing` when one or more tables are missing (pending lists **capabilities**, not secrets)
   - `unknown` when probes are inconclusive (empty pending — no false green)
   - `unconfigured` when Supabase is absent
3. Never expose privileged database metadata or service-role secrets.

Required capability tables:

- `integration_runs`
- `integration_stage_events`
- `integration_checkpoints`
- `integration_evidence_manifests`
- `integration_failure_events`

## Persistence truth

Production (and any environment with `MIANX_REQUIRE_DURABLE_INTEGRATION=1`) is **fail-closed** if durable Supabase persistence is unavailable. The in-process store may exist only for tests, isolated local development, and deterministic fixtures.

`simulationReady` is **false** when durable persistence is unavailable.

## Proof status lifecycle

```text
not_started → objective_created → clarification_required → awaiting_plan_approval
→ simulation_approved → simulation_running → paused | recovering
→ awaiting_final_review → completed | rejected | failed
```

Only a **persisted production** integration run may update production proof status and proof timestamps.

## Health contract fields

`/api/core/health` → `integration` includes:

- Engine readiness booleans
- `integrationPersistenceReady`
- `routableAgentCount`
- `providerStatus`
- `simulationReady` / `liveExecutionReady`
- `schedulerStatus`
- `durableRateLimiterStatus` (honest in-memory when not durable)
- `migrationReadiness`
- `integrationSchema` (booleans)
- `integrationProofStatus`
- `lastSuccessfulSimulationAt` / `lastFailedSimulationAt`
- `lastProofStartedAt` / `lastProofCompletedAt`
- `fabricated_live_execution: false`

## Scheduler

Workflow: `.github/workflows/runtime-tick.yml`  
Auth: Bearer `INTERNAL_RUNTIME_SECRET` or `CRON_SECRET` (never logged).  
Unauthenticated ticks are rejected.  
If last tick is older than the expected interval, status remains **warning** — do not claim healthy without a verified recent tick.

## Rate limiter

If backend is in-memory, report `durable: false` / `configured: false`. Live provider execution remains false while required production controls are absent.

## Test integrity

See `docs/operations/PHASE-H-TEST-INTEGRITY.md` for the 933 → 920 reconciliation
and the optional Chrome harness command. Canonical `npm test` must include
harness pure-logic cases; real Chrome launches are opt-in via
`MIANX_RUN_CHROME_HARNESS=1`.
