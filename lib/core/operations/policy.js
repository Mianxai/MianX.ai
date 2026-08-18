import { WAVE4_SLUGS, getWave4Definition } from "./agents";
import { forbidden, validationError } from "../errors";
import { clip } from "../validate";

export const VERDICT_STATUSES = ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"];

export function statusPreventsSuccess(status) {
  return status === "FAIL" || status === "BLOCKED";
}

export function assertWave4Agent(slug) {
  if (!WAVE4_SLUGS.includes(slug)) {
    throw forbidden(`Agent "${slug}" is not a Wave-4 operations agent.`);
  }
  return getWave4Definition(slug);
}

export function assertProjectScope({ jobProjectId, requestedProjectId }) {
  const a = clip(jobProjectId, 64);
  const b = clip(requestedProjectId, 64);
  if (!a || !b || a !== b) {
    throw forbidden("Project scope mismatch for operations workflow.");
  }
}

export function assertNoCapabilityEscalation(agent, requestedCapabilities = []) {
  const def = typeof agent === "string" ? getWave4Definition(agent) : agent;
  if (!def) throw validationError("Unknown Wave-4 agent.");
  for (const cap of requestedCapabilities) {
    if (def.prohibitedCapabilities?.includes(cap)) {
      throw forbidden(`Capability "${cap}" is prohibited for ${def.slug}.`);
    }
    if (def.allowedCapabilities && !def.allowedCapabilities.includes(cap)) {
      throw forbidden(`Capability "${cap}" is not allowed for ${def.slug}.`);
    }
  }
}

export function deriveOpsApproval(proposedAction) {
  const action = clip(proposedAction, 100);
  if (!action) return { required: false, capability: null };
  const protectedActions = [
    "production_remediation",
    "approve_production_action",
    "deploy_production",
    "rotate_secrets",
    "maintenance_window",
  ];
  if (protectedActions.includes(action)) {
    return { required: true, capability: "approve_production_action", action };
  }
  return { required: false, capability: null, action };
}
