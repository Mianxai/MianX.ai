// Standard autonomous-workforce execution envelopes.
// Server-side validation is authoritative; providers only fill structured_output.

import { validationError, forbidden } from "../errors";
import { clip } from "../validate";
import { getAgentDefinition, isAgentExecutable } from "../agents";

export const ENVELOPE_VERSION = 1;

export const EXECUTION_RESULT_STATUSES = [
  "succeeded",
  "failed",
  "blocked",
  "awaiting_approval",
  "cancelled",
  "provider_unavailable",
];

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function asStringArray(v, { max = 40, itemMax = 120 } = {}) {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x) => typeof x === "string")
    .map((x) => clip(x, itemMax))
    .filter(Boolean)
    .slice(0, max);
}

function asObjectArray(v, max = 40) {
  if (!Array.isArray(v)) return [];
  return v.filter((x) => x && typeof x === "object" && !Array.isArray(x)).slice(0, max);
}

/**
 * Build + validate an execution input envelope.
 * Rejects unknown agents, capability escalation, missing project scope.
 */
export function buildExecutionInput(raw = {}) {
  const agentSlug = typeof raw.agent_slug === "string" ? raw.agent_slug.trim() : "";
  const projectId = typeof raw.project_id === "string" ? raw.project_id.trim() : "";
  if (!projectId) {
    throw validationError("Execution requires project scope.", {
      project_id: "project_id is required.",
    });
  }
  if (!agentSlug) {
    throw validationError("Execution requires an agent.", {
      agent_slug: "agent_slug is required.",
    });
  }
  const def = getAgentDefinition(agentSlug);
  if (!def || !isAgentExecutable(def)) {
    throw validationError("Unknown or non-executable agent.", {
      agent_slug: `Agent "${agentSlug}" is not executable.`,
    });
  }

  const allowed = new Set(def.allowedCapabilities || []);
  const prohibited = new Set(def.prohibitedCapabilities || []);
  const requested = asStringArray(raw.requested_capabilities);
  const granted = asStringArray(raw.granted_capabilities).length
    ? asStringArray(raw.granted_capabilities)
    : requested.filter((c) => allowed.has(c) && !prohibited.has(c));

  for (const cap of requested) {
    if (prohibited.has(cap) || !allowed.has(cap)) {
      throw forbidden(
        `Capability escalation blocked: "${cap}" is not permitted for "${agentSlug}".`
      );
    }
  }
  for (const cap of granted) {
    if (prohibited.has(cap) || !allowed.has(cap)) {
      throw forbidden(
        `Granted capability "${cap}" exceeds agent policy for "${agentSlug}".`
      );
    }
  }

  // Reject direct secret / shell injection keys in freeform input bags.
  const input = raw.input && typeof raw.input === "object" ? raw.input : {};
  const banned = ["system_prompt", "shell", "service_role", "api_key", "password", "cookie"];
  for (const key of Object.keys(input)) {
    if (banned.includes(String(key).toLowerCase())) {
      throw forbidden(`Input field "${key}" is not allowed in execution envelopes.`);
    }
  }

  return {
    envelope_version: ENVELOPE_VERSION,
    execution_id: raw.execution_id || null,
    organization_id: raw.organization_id || null,
    project_id: projectId,
    objective_id: raw.objective_id || raw.task_id || null,
    workflow_id: raw.workflow_id || raw.workflow || null,
    task_id: raw.task_id || null,
    agent_definition_id: raw.agent_definition_id || null,
    agent_instance_id: raw.agent_instance_id || null,
    agent_slug: agentSlug,
    parent_task_id: raw.parent_task_id || null,
    requested_capabilities: requested,
    granted_capabilities: granted,
    input_artifacts: asObjectArray(raw.input_artifacts, 20),
    memory_context: asObjectArray(raw.memory_context, 30),
    constraints: asStringArray(raw.constraints, { max: 30, itemMax: 240 }),
    success_criteria: asStringArray(raw.success_criteria, { max: 20, itemMax: 240 }),
    risk_class: clip(raw.risk_class || "R2", 8),
    approval_policy: clip(raw.approval_policy || "default", 40),
    attempt: Number.isFinite(Number(raw.attempt)) ? Number(raw.attempt) : 1,
    deadline: raw.deadline || null,
    budget: raw.budget || null,
    input,
  };
}

/**
 * Normalize a provider/agent result into the standard result envelope.
 */
export function buildExecutionResult(raw = {}, { failed = false } = {}) {
  let status = typeof raw.status === "string" ? raw.status.toLowerCase() : null;
  if (!status) status = failed ? "failed" : "succeeded";
  if (!EXECUTION_RESULT_STATUSES.includes(status)) {
    throw validationError("Invalid execution result status.", {
      status: `Must be one of: ${EXECUTION_RESULT_STATUSES.join(", ")}`,
    });
  }

  const structured =
    raw.structured_output && typeof raw.structured_output === "object"
      ? raw.structured_output
      : raw.output && typeof raw.output === "object"
        ? raw.output
        : {};

  return {
    envelope_version: ENVELOPE_VERSION,
    status,
    structured_output: structured,
    artifact_references: asObjectArray(raw.artifact_references, 40),
    evidence: asObjectArray(raw.evidence, 40),
    decisions: asStringArray(raw.decisions, { max: 30, itemMax: 400 }),
    assumptions: asStringArray(raw.assumptions, { max: 30, itemMax: 400 }),
    uncertainties: asStringArray(raw.uncertainties, { max: 30, itemMax: 400 }),
    risks: asStringArray(raw.risks, { max: 30, itemMax: 400 }),
    recommended_actions: asStringArray(raw.recommended_actions, {
      max: 30,
      itemMax: 400,
    }),
    delegation_requests: asObjectArray(raw.delegation_requests, 20),
    memory_candidates: asObjectArray(raw.memory_candidates, 20),
    learning_candidates: asObjectArray(raw.learning_candidates, 20),
    usage: {
      input_tokens: raw.usage?.input_tokens ?? raw.input_tokens ?? null,
      output_tokens: raw.usage?.output_tokens ?? raw.output_tokens ?? null,
      latency_ms: raw.usage?.latency_ms ?? raw.latency_ms ?? raw.latencyMs ?? null,
      estimated_cost: raw.usage?.estimated_cost ?? raw.estimated_cost ?? raw.estimatedCost ?? null,
    },
    safe_error:
      status === "failed" || status === "provider_unavailable"
        ? clip(raw.safe_error || raw.error || "Execution failed.", 400)
        : null,
  };
}

export function assertUuidLike(id, field) {
  if (id == null || id === "") return null;
  if (typeof id !== "string" || (!UUID_RE.test(id) && id.length > 80)) {
    throw validationError(`Invalid ${field}.`, { [field]: "Must be a UUID or short opaque id." });
  }
  return id;
}

export { asStringArray, asObjectArray };
