# Project Agent Instance Runtime

Instances are durable worker records (migration `project_agent_instances` + in-memory store for tests).

Lifecycle includes: requested → validating → allocating → idle → assigned → preparing_context → reasoning → awaiting_tool → tool_executing → waiting_* → completed/failed/dead_lettered → releasing → released → archived.

Atomic allocate/release via `allocateSeatToProject` / `releaseInstance` with project isolation checks.

Seats return to `available` when instances release. Continuously running ≠ capacity.
