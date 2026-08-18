// Multi-project fairness — no starvation, no monopoly.

import { listPrograms, listAllocations, listItems } from "./store";
import { ALLOCATION_BOUNDS } from "./states";

/**
 * Select programs for a tick with round-robin / priority fairness.
 */
export function selectProgramsFairly({
  maxPrograms = 3,
  perProjectConcurrency = ALLOCATION_BOUNDS.maxAgentsPerProject,
  cursor = 0,
} = {}) {
  const active = listPrograms().filter(
    (p) =>
      !p.paused_at &&
      !["cancelled", "succeeded", "dead_lettered"].includes(p.status)
  );

  // Group by project
  const byProject = new Map();
  for (const p of active) {
    if (!byProject.has(p.project_id)) byProject.set(p.project_id, []);
    byProject.get(p.project_id).push(p);
  }

  const projectIds = [...byProject.keys()].sort();
  if (!projectIds.length) return { programs: [], nextCursor: cursor };

  const selected = [];
  let i = 0;
  let idx = cursor % projectIds.length;
  while (selected.length < maxPrograms && i < projectIds.length * 2) {
    const projectId = projectIds[idx % projectIds.length];
    const running = listAllocations({ projectId }).filter((a) =>
      ["assigned", "running"].includes(a.status)
    ).length;
    if (running < perProjectConcurrency) {
      const candidates = byProject.get(projectId) || [];
      candidates.sort((a, b) => a.priority.localeCompare(b.priority));
      const pick = candidates.find((p) => !selected.includes(p));
      if (pick) selected.push(pick);
    }
    idx += 1;
    i += 1;
  }

  return {
    programs: selected,
    nextCursor: idx,
    project_count: projectIds.length,
    note: "One project cannot consume all agents; reserve capacity preserved via global bounds.",
  };
}

export function assertProjectIsolation(item, program) {
  if (item.project_id !== program.project_id) {
    throw new Error("Cross-project execution item rejected.");
  }
  if (item.company_id && program.company_id && item.company_id !== program.company_id) {
    throw new Error("Cross-company execution item rejected.");
  }
  return true;
}

export function utilizationSnapshot() {
  const alloc = listAllocations().filter((a) =>
    ["assigned", "running"].includes(a.status)
  );
  const byProject = {};
  for (const a of alloc) {
    byProject[a.project_id] = (byProject[a.project_id] || 0) + 1;
  }
  return {
    assigned_agents: new Set(alloc.map((a) => a.agent_slug)).size,
    active_allocations: alloc.length,
    by_project: byProject,
    max_global: ALLOCATION_BOUNDS.maxConcurrentRunsGlobal,
    reserve_remaining: Math.max(
      0,
      ALLOCATION_BOUNDS.maxConcurrentRunsGlobal - alloc.length
    ),
    runnable_items: listItems().filter((i) => i.status === "ready").length,
  };
}
