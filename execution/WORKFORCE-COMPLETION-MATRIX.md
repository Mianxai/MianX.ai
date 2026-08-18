# Workforce Completion Matrix (Phase I)

Generated as part of Phase I operational workforce completion.

## Totals (verified in code)

| Metric | Count |
| --- | ---: |
| Catalogue definitions | 43 |
| Executable | 38 |
| Intentionally non-executable | 5 |
| Duplicate definitions | 0 |
| Departments | 20 |
| Capacity slots (planning inventory) | 445 |
| Canonical workflows in WORKFLOWS | 11 |
| Plus employee-onboarding Founder Proof | 1 |

## Catalogue vs executable vs capacity

- **43 catalogue** — registered agent definitions (contracts).
- **38 executable** — `lifecycleStatus: active` (runtime may allocate/run).
- **5 intentionally non-executable** — superseded Wave-0 drafts kept for history.
- **445 capacity slots** — org planning inventory across 20 departments. **Not** a requirement to create 445 agents.

## Gap classification (before → after)

| Slug | Before | After | Classification |
| --- | --- | --- | --- |
| follow-up-draft | draft | **active** | Real operational drafting role |
| release-readiness | draft | **active** | Real release-recommendation role (never deploys) |
| workflow-orchestrator | draft | draft (superseded) | Superseded by executive-ceo |
| requirements-analyst | draft | draft (superseded) | Superseded by delivery-product |
| engineering-planning | draft | draft (superseded) | Superseded by delivery-architect / delivery-engineer |
| test-qa | draft | draft (superseded) | Superseded by delivery-qa / qa-review |
| security-review | draft | draft (superseded) | Superseded by platform-security |

## Definition vs live instance

Definitions are contracts. Live instances belong to one organization and one project, are allocated only when work requires them, and must never appear busy without durable execution state.

Machine-readable builder: `lib/core/workforce-completion/matrix.js` → `buildWorkforceCompletionMatrix()`.
Admin surface: `/admin/workforce-readiness`.
