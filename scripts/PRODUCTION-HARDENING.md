# Production hardening — full functional Core (draft)

Branch: `cursor/production-hardening-full-functional`

## What was completed

- Company Builder blueprints snapshotted onto linked tasks and hydrated after cold start
- Approvals path and Company Builder path share one decision → materialise flow
- `/admin/execution` page: list, detail, pause/resume/cancel, orchestrator tick
- Runtime tick also advances Phase D orchestrator (truthful provider failures)
- Founder Inbox: approve/reject + resume/cancel wired
- Memory: validate/activate/reject + project filter
- Learning / Company Builder / Execution: project pickers
- Execution program snapshots on task.input when Phase D tables not applied

## Still Founder-gated (cannot complete in-code alone)

- Apply Phase B/D migrations for first-class tables
- Configure `ANTHROPIC_API_KEY` for live agent output
- Scheduler secrets for automatic queue drain
- Merge / production deploy

## Honest limitations

- Without Phase D migration, execution durability is task-snapshot fallback (documented), not native `execution_*` tables.
- Orchestrator ticks without a provider mark runs failed/retry-safe — never fake success.
