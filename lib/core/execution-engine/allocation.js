// Bounded workforce allocation across executable agents.

import {
  listActiveAgentDefinitions,
  isAgentExecutable,
  getAgentDefinition,
} from "../agents";
import { forbidden } from "../errors";
import { ALLOCATION_BOUNDS } from "./states";
import { saveAllocation, listAllocations } from "./store";

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Pick one agent for an item under hard bounds.
 */
export function allocateAgent({
  item,
  program,
  existing = null,
  maxPerProject = ALLOCATION_BOUNDS.maxAgentsPerProject,
  maxGlobal = ALLOCATION_BOUNDS.maxConcurrentRunsGlobal,
} = {}) {
  const live = existing || listAllocations({ projectId: program.project_id });
  const active = live.filter((a) =>
    ["assigned", "running"].includes(a.status)
  );
  if (active.length >= maxPerProject) {
    return { ok: false, reason: "project_concurrency_limit" };
  }
  const globalActive = listAllocations().filter((a) =>
    ["assigned", "running"].includes(a.status)
  );
  if (globalActive.length >= maxGlobal) {
    return { ok: false, reason: "global_concurrency_limit" };
  }

  const catalog = listActiveAgentDefinitions().filter(isAgentExecutable);
  if (catalog.length > 38) {
    /* still bound selection */
  }

  const dept = item.department;
  let candidates = catalog.filter((a) => {
    if (dept && a.department && a.department !== dept) {
      // allow executive/orchestrator fallbacks
      if (!String(a.slug).startsWith("executive") && a.slug !== "executive-ceo") {
        return false;
      }
    }
    return true;
  });
  if (!candidates.length) {
    candidates = catalog.filter((a) => a.slug === "executive-ceo" || a.slug === "research");
  }
  if (!candidates.length) {
    return { ok: false, reason: "no_eligible_agent" };
  }

  // Prefer least loaded
  const load = new Map();
  for (const a of globalActive) {
    load.set(a.agent_slug, (load.get(a.agent_slug) || 0) + 1);
  }
  candidates.sort(
    (a, b) => (load.get(a.slug) || 0) - (load.get(b.slug) || 0) || a.slug.localeCompare(b.slug)
  );

  const chosen = candidates[0];
  // Never assign all 38
  const uniqueAssigned = new Set(globalActive.map((a) => a.agent_slug));
  if (uniqueAssigned.size >= ALLOCATION_BOUNDS.maxConcurrentRunsGlobal) {
    return { ok: false, reason: "workforce_bound" };
  }

  const def = getAgentDefinition(chosen.slug);
  if (!def || !isAgentExecutable(def)) {
    return { ok: false, reason: "not_executable" };
  }
  if (def.canSelfApprove === true) {
    throw forbidden("Self-approving agents cannot be allocated.");
  }

  const row = {
    id: uid("alloc"),
    program_id: program.id,
    project_id: program.project_id,
    item_id: item.id,
    agent_slug: chosen.slug,
    department: chosen.department || dept || null,
    status: "assigned",
    load_score: load.get(chosen.slug) || 0,
    metadata: { capability_check: "envelope" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  saveAllocation(row);
  return { ok: true, agent_slug: chosen.slug, allocation: row };
}

export function assertNoCapabilityEscalation(agentSlug, requested = []) {
  const def = getAgentDefinition(agentSlug);
  if (!def) throw forbidden("Unknown agent.");
  const allowed = new Set(def.allowedCapabilities || []);
  const prohibited = new Set(def.prohibitedCapabilities || []);
  for (const cap of requested) {
    if (prohibited.has(cap) || !allowed.has(cap)) {
      throw forbidden(`Capability escalation blocked: ${cap}`);
    }
  }
  return true;
}
