// Governed inter-agent delegation protocol (extends Wave-1 executive rules).

import { getAgentDefinition, isAgentExecutable } from "../agents";
import { validationError, forbidden } from "../errors";
import { clip } from "../validate";
import {
  canDelegate as canDelegateExecutive,
  assertCanDelegate as assertCanDelegateExecutive,
  assertCapabilityInheritance,
  detectDelegationCycles,
  assertNoDelegationCycles,
} from "../executive/delegation";
import { BASE_AGENT_REPORTS_TO } from "../command-center/hierarchy";

/**
 * Resolve hierarchical parent for a runtime agent slug.
 */
export function reportsToOf(slug) {
  const def = getAgentDefinition(slug);
  if (def?.reportsTo) return def.reportsTo;
  return BASE_AGENT_REPORTS_TO[slug] || null;
}

/**
 * Allowed when executive Wave-1 rule permits, or when target reports to delegator.
 */
export function canDelegate(delegatorSlug, targetSlug) {
  if (!delegatorSlug || !targetSlug) return false;
  if (delegatorSlug === targetSlug) return false;
  if (targetSlug === "founder" || delegatorSlug === "founder") return false;
  if (canDelegateExecutive(delegatorSlug, targetSlug)) return true;
  const parent = reportsToOf(targetSlug);
  return parent === delegatorSlug;
}

export function assertCanDelegate(delegatorSlug, targetSlug) {
  if (delegatorSlug === targetSlug) {
    throw forbidden("Self-delegation is not allowed.");
  }
  if (targetSlug === "founder") {
    throw forbidden("Agents cannot delegate authority to the Founder.");
  }
  // Prefer executive assert when both are Wave-1; otherwise hierarchy check.
  try {
    assertCanDelegateExecutive(delegatorSlug, targetSlug);
    return true;
  } catch (err) {
    if (canDelegate(delegatorSlug, targetSlug)) return true;
    throw err;
  }
}

/**
 * Validate and normalize a delegation request into an auditable record shape.
 */
export function buildDelegationRequest(raw = {}) {
  const delegating = clip(raw.delegating_agent || raw.from || "", 80);
  const target = clip(raw.target_agent_definition || raw.to || "", 80);
  const projectId = clip(raw.project_id || "", 80);
  if (!delegating || !target || !projectId) {
    throw validationError("Delegation requires delegator, target, and project.", {
      delegating_agent: !delegating ? "required" : undefined,
      target_agent_definition: !target ? "required" : undefined,
      project_id: !projectId ? "required" : undefined,
    });
  }

  assertCanDelegate(delegating, target);
  const parent = getAgentDefinition(delegating);
  const child = getAgentDefinition(target);
  if (!parent || !isAgentExecutable(parent)) {
    throw validationError("Unknown delegating agent.", { delegating_agent: delegating });
  }
  if (!child || !isAgentExecutable(child)) {
    throw validationError("Unknown target agent.", { target_agent_definition: target });
  }

  // Prefer Wave-1 capability inheritance when applicable; otherwise subset check.
  try {
    assertCapabilityInheritance(delegating, target);
  } catch {
    const parentProhibited = new Set(parent.prohibitedCapabilities || []);
    const childAllowed = child.allowedCapabilities || [];
    for (const cap of childAllowed) {
      if (parentProhibited.has(cap)) {
        throw forbidden(
          `Capability escalation blocked: "${cap}" prohibited on "${delegating}".`
        );
      }
    }
  }

  const requested = Array.isArray(raw.requested_capabilities)
    ? raw.requested_capabilities.filter((c) => typeof c === "string").map((c) => clip(c, 80))
    : [];
  const childAllowed = new Set(child.allowedCapabilities || []);
  const childProhibited = new Set(child.prohibitedCapabilities || []);
  for (const cap of requested) {
    if (!childAllowed.has(cap) || childProhibited.has(cap)) {
      throw forbidden(`Requested capability "${cap}" not permitted on target "${target}".`);
    }
  }

  return {
    delegating_agent: delegating,
    target_agent_definition: target,
    project_id: projectId,
    task_intent: clip(raw.task_intent || raw.intent || "", 500),
    required_output: clip(raw.required_output || "", 500),
    input_references: Array.isArray(raw.input_references)
      ? raw.input_references.slice(0, 20)
      : [],
    dependencies: Array.isArray(raw.dependencies) ? raw.dependencies.slice(0, 20) : [],
    requested_capabilities: requested,
    risk: clip(raw.risk || raw.risk_class || "R2", 8),
    deadline: raw.deadline || null,
    budget: raw.budget || null,
    reason: clip(raw.reason || "", 400),
    status: "validated",
  };
}

export {
  assertCapabilityInheritance,
  detectDelegationCycles,
  assertNoDelegationCycles,
};
