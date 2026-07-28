# Phase H — Simulation Runbook

1. Ensure you are on a branch with Phase H code; production migration apply is Founder-gated.
2. Open `/admin/integration`.
3. Select a project.
4. Create a Founder objective with purpose, deliverables, and success criteria.
5. Resolve clarification if requested (do not invent missing critical fields).
6. Generate deterministic plan.
7. Review approval package → **Approve Simulation** (never auto-approved).
8. Start simulation → inspect allocation, delegation, evidence, memory, learning.
9. Pause/resume as needed.
10. Complete **Founder Final Review**.

## Labels

UI must show: **DETERMINISTIC SIMULATION** — not live AI execution.

## Reproduce in tests

```bash
npx vitest run lib/core/integration/phase-h-scenarios.test.js
```
