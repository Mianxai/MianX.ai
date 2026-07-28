// Truthful execution snapshot for Control Room / health.

import {
  listPrograms,
  listItems,
  listAllocations,
  listEvents,
} from "./store";
import { utilizationSnapshot } from "./fairness";
import { getExecutionProviderStatus } from "./provider-adapter";
import { runtimeConfigStatus } from "../config";

export function buildExecutionSnapshot({ projectId = null } = {}) {
  const programs = listPrograms({ projectId });
  const items = listItems({ projectId });
  const alloc = listAllocations({ projectId });
  const util = utilizationSnapshot();
  const provider = getExecutionProviderStatus();
  const scheduler = runtimeConfigStatus().scheduler;

  const count = (status) => items.filter((i) => i.status === status).length;

  return {
    generatedAt: new Date().toISOString(),
    projectId,
    activeCompanies: new Set(programs.map((p) => p.company_id).filter(Boolean)).size,
    activePrograms: programs.filter(
      (p) => !["cancelled", "succeeded"].includes(p.status)
    ).length,
    queuedTasks: count("queued") + count("ready"),
    blockedTasks: count("blocked"),
    runningAgentRuns: items.filter(
      (i) => i.level === "agent_run" && i.status === "running"
    ).length,
    succeeded: count("succeeded"),
    failed: count("failed"),
    deadLetter: count("dead_lettered"),
    reviewQueue: count("review"),
    workforce: {
      utilisation: util,
      availableVersusAssigned: {
        assigned: util.assigned_agents,
        active_allocations: util.active_allocations,
        reserve_remaining: util.reserve_remaining,
      },
    },
    scheduler: {
      mode: scheduler?.mode,
      automaticProcessing: scheduler?.automaticProcessing,
      lastTickHint: "See Control Room schedule.lastTick",
    },
    provider,
    projectIsolation: Boolean(projectId),
    recentEvents: listEvents({ projectId }).slice(-10),
    note: "Counts are from the execution-engine store for this process. Fabricated live AI progress is never shown.",
  };
}
