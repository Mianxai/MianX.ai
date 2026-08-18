# Phase I.6 — Foundation truth metric dictionary

## Canonical definitions

| Metric | Meaning | Current value |
|--------|---------|---------------|
| Capacity seats | Complete allocatable workforce capacity registry (slots, not always-on agents) | **445** |
| Compiled seats | Seats in the compiled workforce seat registry used for bootstrap/persistence (`compileCapacitySeats`) | **445** |
| Persisted seats | Canonical seats durably stored in Production DB | **445** |
| Ready-to-allocate seats | Persisted valid seats available for safe project allocation | **445** |
| Allocated seats | Seats assigned to active project work | **0** |
| Active instances | Currently running agent instances | **0** |
| Live-tested seats | Seats with controlled real provider evidence | **0** |
| Departments | Department baseline coverage | **20** |
| Archetypes | Compiled role archetype contracts | **148** |
| Workflow families | Founder workflow families mapped | **13 / 13** |
| Catalogue entries | Total runtime agent catalogue definitions (includes superseded non-executable) | **43** |
| Executable definitions | Catalogue definitions the runtime may allocate/run (`isAgentExecutable`) | **38** |
| Named/runtime role registry entries | Org-registry named roles + unlinked executable runtime catalogue agents from `compileCanonicalRoleRegistry` | **92** |
| Capacity-reserve gaps | Documented reserve slots without a separate named persona inventory entry | **291** |

## Forbidden conflations

- Never label catalogue **43**, executable **38**, or named-role registry **92** as **Compiled seats**.
- Never describe **445** as active / live / provider-tested agents.
- Provider absence must not fail database foundation readiness.

## Shared source

`lib/core/workforce-i2/foundation-metrics.js` → `buildFoundationMetrics()`

Consumed by:

- `/api/core/health`
- `/api/admin/workforce-activation`
- `/api/admin/workforce-readiness`
- `/api/admin/real-agent-readiness`
