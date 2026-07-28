# Phase H — Production Proof Runbook

**Audience:** Founder  
**Environment:** Production (`https://mian-x-ai.vercel.app`) after this closeout is merged and deployed  
**Proof level:** LEVEL 1 — deterministic simulation only

## What is already deployed

Phase H (PR #47, main `314bdb9`) is merged, migrated, and deployed:

- Integration orchestrator coordinating Template / Planning / Workforce
- Five integration tables (`integration_runs`, `integration_stage_events`, `integration_checkpoints`, `integration_evidence_manifests`, `integration_failure_events`)
- Admin surface at `/admin/integration`
- Routable workforce: 36 agents
- Provider remains **unconfigured** — live AI execution stays blocked

This closeout branch makes health/readiness **truthful** and prepares the Founder to run the first real production deterministic simulation from the UI.

## How the Founder starts the proof

1. Sign in at `/admin/login` (returnTo `/admin/integration` is safe).
2. Open `/admin/integration` and select the correct project.
3. On **Control Room**, open the **Production Founder Proof** panel.
4. Review the proof objective template (Secure Internal Employee Onboarding Workflow).
5. Click **Start Founder Proof**.
6. Confirm in the explicit confirmation dialog.

The proof does **not** start without that confirmation. Nothing auto-submits on deploy or CI.

## What simulation proves

- Clarification gating where questions remain open
- Deterministic planning without dependency cycles
- Subset agent allocation (`activated_all_36: false`) with selection reasons
- Founder plan / simulation approval gates (idempotent)
- Pause / resume / deterministic recovery against persisted run state
- Evidence, memory, and learning proposal creation
- Protected `production_deployment` remains blocked
- Final completion requires explicit Founder review

## What it does **not** prove

- Live provider / paid model execution
- Real company completion
- Production deployment of any product
- Durable rate limiting (still in-memory until configured)
- Scheduler health if last tick is stale (warning remains honest)

## How health status changes

`GET /api/core/health` → `integration`:

| Field | Before first proof | After durable proof run |
| --- | --- | --- |
| `integrationProofStatus` | `not_started` | lifecycle status from persisted run |
| `lastProofStartedAt` | `null` | set only from persisted production proof run |
| `lastSuccessfulSimulationAt` | `null` | set only when a persisted run completes |
| `simulationReady` | true only if durable schema present | same rule — never true without persistence |
| `migrationReadiness.pending` | empty when tables queryable | never lists an already-applied Phase H file |

Timestamps are **not** generated at build, startup, or health-check time.

## Inspect evidence / memory / learning

Use Integration tabs: Evidence, Memory, Learning, Proof Pack. After refresh/re-login, durable runs hydrate from Supabase when persistence is available.

## Pause / resume

Simulation tab → Pause / Resume. Pause stops new claims; refresh retains paused state when durable; resume continues eligible work without repeating completed tasks.

## Deterministic recovery test

Simulation tab → **Deterministic recovery test**. This is labeled testing — not a live outage. It checkpoints/restores context, increments `recovery_count`, retains evidence, and writes an audit event.

## Final review

When stage is `founder_final_review`, Founder must explicitly Approve or Reject. Auto-approve is rejected.

## Verify no protected action executed

Proof Pack / Simulation protected-actions section must show `production_deployment` blocked / not executed. Live provider flags remain false.

## Safety confirmations

- No automatic Founder approval
- No automatic production proof from CI/preview
- No provider secrets required for this proof
- No Phase I work in this runbook
