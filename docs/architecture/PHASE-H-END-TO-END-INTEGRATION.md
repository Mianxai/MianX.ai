# Phase H — End-to-End Autonomous Company Integration

## Mission

Prove existing MianX engines work as one operating system:

Founder Objective → Template Intelligence → Planning Intelligence → Capability Mapping → WBS → Execution Preview → Founder Approval → Execution Engine → 36-agent workforce simulation → Delegation/Collaboration → Verification → Evidence → Memory → Learning → Founder Final Review.

## Truth model

| Level | Name | Meaning |
|-------|------|---------|
| 1 | DETERMINISTIC SIMULATION | Orchestration, routing, claims, gates, persistence, recovery — no provider |
| 2 | LIVE PROVIDER EXECUTION | Blocked unless provider configured + Founder live enable + approvals + budget |

Never label Level 1 as live AI execution.

## Canonical contract

Every run carries: `integration_run_id`, org/project/objective IDs, template/plan/preview/execution/approval IDs, `current_stage`, `execution_mode`, `status`, timestamps, `correlation_id`, `trace_id`.

Stages: see `lib/core/integration/schemas.js` (`INTEGRATION_STAGES`).

## Entry points

- Library: `lib/core/integration/`
- Admin: `/admin/integration`
- API: `/api/admin/integration`
- Health: `/api/core/health` → `integration` fields
- Company Builder bridge: `lib/core/company-builder/integration-bridge.js`

## Migration

Additive only: `supabase/migrations/20260728210000_phase_h_integration_runtime.sql`

**Do not apply without Founder approval.**

## What is proven (simulation)

- Full chain to Founder final review
- Lineage across objective/templates/plan/tasks/agents/evidence/memory/learning
- No execution before Founder approval
- Duplicate claim prevention
- Restart recovery
- Three-project isolation
- Protected actions gated
- Live execution blocked without provider
- 36 routable executable agents audited

## What is not proven without a provider

- Real model reasoning
- Real code generation / external research
- Paid provider calls
- Live protected action completion
