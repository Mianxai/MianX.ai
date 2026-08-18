// Delegation safety for Wave-1 executive control plane.

import { getAgentDefinition } from "../agents";
import { validationError, forbidden, badRequest } from "../errors";
import { L2_SLUGS, WAVE1_SLUGS } from "./agents";

export const FOUNDER = "founder";

/**
 * Returns true if `childSlug` is an allowed delegate of `parentSlug`.
 * L1 → L2 only. L2 does not re-delegate in Wave-1. Nobody delegates to Founder.
 */
export function canDelegate(parentSlug, childSlug) {
  if (!parentSlug || !childSlug) return false;
  if (parentSlug === childSlug) return false;
  if (childSlug === FOUNDER || parentSlug === FOUNDER) return false;
  if (parentSlug === "executive-ceo") {
    return L2_SLUGS.includes(childSlug);
  }
  // Wave-1 L2 agents produce assessments; they do not delegate further.
  return false;
}

export function assertCanDelegate(parentSlug, childSlug) {
  if (parentSlug === childSlug) {
    throw forbidden("Self-delegation is not allowed.");
  }
  if (childSlug === FOUNDER) {
    throw forbidden("Agents cannot delegate authority to the Founder.");
  }
  if (parentSlug === FOUNDER) {
    // Founder starts objectives via API; not an agent delegation edge.
    throw badRequest("Founder objectives are started via the workflow API, not agent delegation.");
  }
  if (!WAVE1_SLUGS.includes(parentSlug)) {
    throw validationError("Unknown parent agent.", {
      parent: `Unknown or non-Wave-1 agent "${parentSlug}".`,
    });
  }
  if (!WAVE1_SLUGS.includes(childSlug)) {
    throw validationError("Unknown C-Suite agent.", {
      child: `Unknown or non-Wave-1 agent "${childSlug}".`,
    });
  }
  if (!canDelegate(parentSlug, childSlug)) {
    throw forbidden(
      `Delegation from "${parentSlug}" to "${childSlug}" is not permitted by hierarchy policy.`
    );
  }
  return true;
}

/**
 * Ensures child allowedCapabilities ⊆ parent allowedCapabilities ∪ assessment caps
 * that the parent is explicitly allowed to request via DELEGATE/ORCHESTRATE.
 * Wave-1 rule: child must not gain PROTECTED capabilities, and parent must have
 * DELEGATE (L1) to spawn children.
 */
export function assertCapabilityInheritance(parentSlug, childSlug) {
  const parent = getAgentDefinition(parentSlug);
  const child = getAgentDefinition(childSlug);
  if (!parent || !child) {
    throw validationError("Unknown agent for capability inheritance.", {
      parent: parent ? undefined : "missing",
      child: child ? undefined : "missing",
    });
  }
  if (parentSlug === "executive-ceo") {
    const parentCaps = new Set(parent.allowedCapabilities || []);
    if (!parentCaps.has("delegate") && !parentCaps.has("orchestrate")) {
      throw forbidden("Parent cannot delegate without orchestrate/delegate capability.");
    }
  }
  for (const cap of child.allowedCapabilities || []) {
    if (cap === "send_email" || cap === "approve_production_action") {
      throw forbidden(`Child "${childSlug}" cannot receive protected capability "${cap}".`);
    }
  }
  // Child must not list a capability that is prohibited on the parent.
  const parentProhibited = new Set(parent.prohibitedCapabilities || []);
  for (const cap of child.allowedCapabilities || []) {
    if (parentProhibited.has(cap)) {
      throw forbidden(
        `Capability escalation blocked: "${cap}" is prohibited on parent "${parentSlug}".`
      );
    }
  }
  return true;
}

/**
 * Detects cycles in a directed delegation graph { from: [to, ...] }.
 */
export function detectDelegationCycles(edges) {
  const graph = new Map();
  for (const [from, tos] of Object.entries(edges || {})) {
    graph.set(from, [...(tos || [])]);
  }
  const visiting = new Set();
  const visited = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (visiting.has(node)) {
      cycles.push([...path, node]);
      return;
    }
    if (visited.has(node)) return;
    visiting.add(node);
    for (const next of graph.get(node) || []) {
      dfs(next, [...path, node]);
    }
    visiting.delete(node);
    visited.add(node);
  }

  for (const node of graph.keys()) dfs(node, []);
  return cycles;
}

export function assertNoDelegationCycles(edges) {
  const cycles = detectDelegationCycles(edges);
  if (cycles.length) {
    throw forbidden(`Circular delegation is not allowed: ${JSON.stringify(cycles[0])}`);
  }
  return true;
}

/**
 * Validate a full set of planned workstream owners from an L1 plan.
 */
export function assertPlanDelegations(parentSlug, ownerAgents) {
  const edges = { [parentSlug]: [] };
  for (const owner of ownerAgents) {
    assertCanDelegate(parentSlug, owner);
    assertCapabilityInheritance(parentSlug, owner);
    edges[parentSlug].push(owner);
  }
  assertNoDelegationCycles(edges);
  return true;
}
