# Phase H — Consolidation Audit

## Goal

Integrate Phases B–G without building a disconnected subsystem.

## Ownership map

| Concern | Canonical | Adapter / consumer | Deprecated / avoid |
|---------|-----------|--------------------|--------------------|
| Objective intake | `lib/core/objectives` + Phase H `objective.js` | Company Builder parser | Duplicate free-form parsers in UI |
| Template matching | `lib/core/template-intelligence` | Planning + Integration orchestrator | Re-implementing catalogs |
| Planning / WBS | `lib/core/planning-intelligence` | Integration orchestrator | Parallel plan stores in Admin-only code |
| Execution programs | `lib/core/execution-engine` | Company Builder materialize | New task engines |
| Workforce lifecycle | `lib/core/workforce-runtime` | Integration simulation | Fabricated agent catalogs |
| Memory candidates | `lib/core/memory` + engine bridges | Integration `memory-bridge.js` | Cross-project global memory |
| Learning proposals | `lib/core/learning` + engine bridges | Integration `learning-bridge.js` | Auto-apply to templates/security |
| Integration run lineage | `lib/core/integration` | Admin + health + CB bridge | Parallel “workflow OS” modules |
| Admin auth | `requireAdmin` / `lib/core/auth` | All `/api/admin/*` | Ad-hoc cookie checks |
| Audit | `lib/core/audit` + engine audits | Integration store audit | Silent side effects |

## Overlaps resolved in Phase H

1. **Orchestration** — New thin orchestrator coordinates existing engines; does not fork Template/Planning/Workforce.
2. **Task claiming** — Integration idempotency store + Workforce claim store remain separate scopes; both reject duplicates.
3. **Simulation** — Workforce `startSimulation` reused inside integration runs.
4. **Nav** — Single `/admin/integration` Control Room view; no duplicate “second Command Center”.

## Safe future removal

- In-process Maps for integration runs once migration applied and durable repo wired.
- Temporary CB `integration_pipeline` payload fields after durable FK columns exist.

Do not destructively remove production-compatible structures in this phase.
