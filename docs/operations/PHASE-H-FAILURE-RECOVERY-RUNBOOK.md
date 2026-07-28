# Phase H — Failure & Recovery Runbook

## Failure classes

| Code | Behaviour |
|------|-----------|
| `plan_validation_failed` / `dependency_cycle` | Run → `failed`; no simulation |
| `duplicate_task_claim` | Second claim rejected; first retained |
| `agent_unavailable` | Failure event recorded; retry_count may increment |
| `memory_write_failed` | Surfaced as failure event; run remains recoverable |
| Provider missing (live mode) | Live blocked; simulation still available |

## Recovery

```js
recoverIntegrationRun(runId)
```

Restores latest checkpoint, rehydrates lineage, increments `recovery_count`, recovers workforce state for the project. Does not re-claim completed tasks.

## Cancel

`cancelIntegrationRun` → stage `cancelled`. Further `startIntegrationSimulation` throws.
