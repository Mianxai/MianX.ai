// Intelligent Workforce Router — policy-governed before any provider suggestion.
// Wraps planWorkforceActivation with hard bounds and activation plan shape.

import { planWorkforceActivation } from "@/lib/workforce/planner";
import { getAgentDefinition, isAgentExecutable, listActiveAgentDefinitions } from "../agents";
import { validationError, forbidden } from "../errors";
import { clip } from "../validate";
import { buildExecutionInput } from "../execution/envelope";
import {
  isProtectedAction,
  approvalCapabilityForAction,
} from "../executive/policy";

export const ROUTER_BOUNDS = {
  maxAgentsPerObjective: 12,
  maxDepartments: 8,
  maxWorkstreams: 16,
};

/**
 * Route a Founder/CEO objective to a bounded activation plan.
 * Deterministic; provider suggestions must pass through this validation.
 */
export function routeWorkforceObjective({
  objective,
  projectId,
  departmentsNeeded = [],
  riskClass = "R2",
  proposedAction = null,
  projectProfile = "mianx-core",
  existingInstanceSlugs = [],
  maxAgents = ROUTER_BOUNDS.maxAgentsPerObjective,
} = {}) {
  if (!projectId) {
    throw validationError("Router requires project scope.", {
      project_id: "project_id is required.",
    });
  }
  const text = clip(objective || "", 2000);
  if (!text) {
    throw validationError("Router requires an objective.", {
      objective: "objective is required.",
    });
  }

  const plan = planWorkforceActivation({
    objective: text,
    departmentsNeeded,
    riskClass,
    proposedAction,
    projectProfile,
  });

  const runtimeSlugs = [
    ...new Set(
      [
        ...(plan.requiredRuntimeAgents || []),
        ...(plan.requiredCanonicalDefinitions || [])
          .map((d) => {
            if (typeof d === "string") return null;
            return d?.runtimeSlug || d?.runtime_slug || null;
          })
          .filter(Boolean),
      ].filter(Boolean)
    ),
  ];

  // Always include CEO for enterprise objectives.
  if (!runtimeSlugs.includes("executive-ceo")) {
    runtimeSlugs.unshift("executive-ceo");
  }

  if (runtimeSlugs.length > maxAgents) {
    throw forbidden(
      `Workforce activation exceeds bound (${runtimeSlugs.length} > ${maxAgents}).`
    );
  }

  const selected = [];
  const seen = new Set();
  for (const slug of runtimeSlugs) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    const def = getAgentDefinition(slug);
    if (!def || !isAgentExecutable(def)) {
      throw validationError("Router selected unknown agent.", {
        agent_slug: `Unknown or non-executable "${slug}".`,
      });
    }
    selected.push({
      slug,
      name: def.name,
      department: def.department || null,
      capabilities: [...(def.allowedCapabilities || [])],
      alreadyInstanced: existingInstanceSlugs.includes(slug),
    });
  }

  // No whole-workforce activation.
  const activeCatalog = listActiveAgentDefinitions().length;
  if (selected.length >= activeCatalog) {
    throw forbidden("Router refused whole-workforce activation.");
  }

  const workstreams = (plan.workstreams || plan.dependencyGraph?.nodes || []).slice(
    0,
    ROUTER_BOUNDS.maxWorkstreams
  );

  return {
    projectId,
    objective: text,
    riskClass: plan.riskClass || riskClass,
    departments: (plan.departments || []).slice(0, ROUTER_BOUNDS.maxDepartments),
    selectedAgents: selected,
    instanceActivationPlan: selected.map((a) => ({
      agent_slug: a.slug,
      action: a.alreadyInstanced ? "reuse" : "provision",
      project_id: projectId,
      target_status: "ready",
    })),
    workstreams,
    parallelisable: Boolean(plan.parallelBatches?.length > 1 || plan.parallel_groups),
    approvalBoundaries: {
      requiresFounderApproval: Boolean(
        plan.requiresFounderApproval || isProtectedAction(proposedAction)
      ),
      proposedAction: proposedAction || null,
      approvalCapability:
        plan.approvalCapability ||
        (proposedAction ? approvalCapabilityForAction(proposedAction) : null),
    },
    fallbackEscalation: {
      onRequiredFailure: "halt_and_alert_founder",
      onTransientFailure: "retry_then_dead_letter",
      maxRetries: 3,
    },
    bounds: {
      maxAgents,
      selectedCount: selected.length,
      catalogExecutable: activeCatalog,
      forbiddenFullWorkforce: true,
    },
    plannerNote: plan.note || null,
  };
}

/**
 * Validate a single task assignment produced by routing/delegation.
 */
export function assertRoutedAssignment({
  projectId,
  agentSlug,
  requestedCapabilities = [],
  parentAgentSlug = null,
}) {
  buildExecutionInput({
    project_id: projectId,
    agent_slug: agentSlug,
    requested_capabilities: requestedCapabilities,
  });
  if (parentAgentSlug && parentAgentSlug === agentSlug) {
    throw forbidden("Self-delegation is not allowed.");
  }
  return true;
}
