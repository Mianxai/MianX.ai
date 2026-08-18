/**
 * Workload analytics — task counts, success/failure/retry %, duration, delegations.
 */

import { listPipelineEvents, listDelegations, listAgentStates } from "./store.js";

export function computeWorkloadAnalytics({ project_id = null, agent_slug = null } = {}) {
  let events = listPipelineEvents({ project_id });
  if (agent_slug) events = events.filter((e) => e.agent_slug === agent_slug);

  const byTask = new Map();
  for (const e of events) {
    if (!byTask.has(e.task_id)) byTask.set(e.task_id, []);
    byTask.get(e.task_id).push(e);
  }

  let success = 0;
  let failure = 0;
  let pending = 0;
  const durations = [];

  for (const [, evs] of byTask) {
    const closed = evs.find((e) => e.stage === "close" && e.status === "ok");
    const failed = evs.find(
      (e) =>
        e.status === "founder_rejected" ||
        e.status === "blocked_no_provider_or_policy"
    );
    if (closed) {
      success += 1;
      const start = evs.find((e) => e.stage === "claim");
      if (start?.created_at && closed.created_at) {
        durations.push(
          new Date(closed.created_at).getTime() - new Date(start.created_at).getTime()
        );
      }
    } else if (failed) failure += 1;
    else pending += 1;
  }

  const retries = listAgentStates({ project_id }).reduce(
    (n, s) => n + (s.attempt_count || 0),
    0
  );
  const delegations = listDelegations({ project_id });
  const taskCount = byTask.size || 0;

  return {
    task_count: taskCount,
    success_count: success,
    failure_count: failure,
    pending_count: pending,
    success_pct: taskCount ? Math.round((success / taskCount) * 1000) / 10 : 0,
    failure_pct: taskCount ? Math.round((failure / taskCount) * 1000) / 10 : 0,
    retry_pct:
      taskCount || retries
        ? Math.round((retries / Math.max(taskCount, 1)) * 1000) / 10
        : 0,
    average_duration_ms:
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : null,
    delegation_count: delegations.length,
    agent_slug: agent_slug || null,
    project_id,
    note: "Analytics from in-process pipeline events — not a production SLA claim.",
  };
}
