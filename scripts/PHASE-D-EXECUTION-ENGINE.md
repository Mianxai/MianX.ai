# Phase D — Autonomous Execution Engine Foundation

Status: implemented in code (draft PR). Migration not applied. Provider may be unconfigured.

## Architecture

```text
Founder Objective
  → Company Builder Plan (Phase C)
  → Founder Approval
  → Execution Program (frozen blueprint)
  → Dependency-aware tasks / agent runs
  → Bounded workforce allocation (≤36 catalog; hard per-tick caps)
  → Agent runs (provider adapter)
  → Review gates
  → Recovery / dead-letter
  → Checkpoints + completion brief
```

Code: `lib/core/execution-engine/`  
Admin API: `GET|POST /api/admin/execution`  
UI: Command Center `ExecutionPanel`, Founder Inbox extensions  
Migration (additive, not applied): `supabase/migrations/20260728150000_phase_d_execution_engine.sql`

## Execution hierarchy

Company → Product → Program → Epic → Feature → Story → Task → Agent Run

Each item carries stable id, parent, company, project, objective, status, priority, risk, assigned agent, dependency ids, timestamps, audit metadata.

## Lifecycle states

`draft` → `awaiting_approval` → `approved` → `queued` → `ready` → `assigned` → `running` → `review` → `succeeded`

Also: `blocked`, `failed`, `retry_wait`, `dead_lettered`, `paused`, `cancelled`.

Invalid transitions throw structured `INVALID_TRANSITION` errors and are auditable via `execution_events`.

## Approval → execution

On Company Builder **approve**, `materializeExecutionProgram`:

- freezes blueprint
- creates one program
- materialises backlog items + safe dependency edges
- writes immutable `approval_immutable` event + checkpoints
- does **not** execute protected actions or industry OS builds

Rejection leaves the blueprint non-executable.

## Orchestrator

Per-tick bounds (`ALLOCATION_BOUNDS`): max agents per program tick, per project, global concurrency. Never schedules the whole workforce.

Dependency readiness, cycle rejection (`assertNoDependencyCycles`), wave-aware ordering, parent task → agent_run edges.

## Workforce allocation

Uses the real executable agent catalog only. No capability escalation, no self-approval, no filler agents, reserve capacity preserved.

## Agent run contract

Input envelope, output schema, allowed tools, forbidden actions, timeout, retry policy, quality/evidence requirements, memory scope, learning eligibility, approval requirements. Malformed output ≠ success.

## Provider adapter

States: configured / unconfigured / available / unavailable / circuit_open.

When unconfigured: `PROVIDER_UNAVAILABLE`, retry-safe failed state, never fake completion. Deterministic fake provider is **tests only**.

## Handoffs & reviews

Structured handoffs; peer/QA/security/architecture/Founder review kinds. No self-approval. Failures create rework tasks.

## Recovery

Transient → exponential backoff `retry_wait` → max attempts → `dead_lettered` + escalation. Provider unavailable → failed + retry-safe, not silent success.

## Pause / resume / cancel

Founder/Admin via API. Running work is not silently interrupted. Resume does not duplicate runs. History preserved on cancel.

## Multi-project fairness

Round-robin project selection, per-project concurrency caps, project/company isolation assertions.

## Checkpoints

`blueprint_approved`, `program_created`, `wave_started`, `deliverable_completed`, `review_passed`, `recovery_performed`, `program_completed`.

## Memory & learning

Writes scoped by company/project/objective/task with evidence and confidence. Learning only from verified outcomes / review / failure patterns — unsafe candidates rejected.

## Founder operating guide

1. Run Company Builder for an objective (planning only).
2. Approve in Company Builder / approvals — creates execution program.
3. With a configured provider (or test fake), run orchestrator ticks (scheduler / admin).
4. Use Founder Inbox for protected actions, DLQ, failed reviews, pause controls.
5. Control Room shows truthful execution snapshot (no fabricated AI progress).

## Migration application (Founder only)

```bash
supabase db push --dry-run   # confirm 20260728150000_phase_d_execution_engine.sql
# Founder approval required before apply
supabase db push
```

Rollback guidance is in the SQL file header (drop empty tables in reverse order only if Founder-approved).

## Production activation checklist

- [ ] Draft PR reviewed
- [ ] Migration dry-run reviewed; apply only with Founder approval
- [ ] AI provider configured only when Founder authorises spend
- [ ] Scheduler/worker secrets already as Phase B
- [ ] Confirm no RestaurantOS/PoultryOS product build from this engine
- [ ] Confirm Control Room provider status truthful
- [ ] Do not merge to main / deploy without Founder approval

## Honest limitations

- Runtime persistence is in-process until migration is applied and a persist layer is wired.
- Live Anthropic invocation is not enabled in the Phase D foundation adapter (returns provider unavailable even if configured — Founder must explicitly enable later).
- Deterministic fake provider is for automated tests only.
