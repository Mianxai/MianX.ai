import { WAVE6_SLUGS, getWave6Definition } from "./agents";
import { forbidden, validationError } from "../errors";
import { clip } from "../validate";

export const VERDICT_STATUSES = ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"];
export function statusPreventsSuccess(status) {
  return status === "FAIL" || status === "BLOCKED";
}
export function assertWave6Agent(slug) {
  if (!WAVE6_SLUGS.includes(slug)) throw forbidden(`Not a Wave-6 agent: ${slug}`);
  return getWave6Definition(slug);
}
export function assertProjectScope({ jobProjectId, requestedProjectId }) {
  const a = clip(jobProjectId, 64);
  const b = clip(requestedProjectId, 64);
  if (!a || !b || a !== b) throw forbidden("Project scope mismatch for advisory workflow.");
}
export function deriveAdvisoryApproval(proposedAction) {
  const action = clip(proposedAction, 100);
  if (!action) return { required: false, capability: null };
  const gated = [
    "transfer_funds",
    "execute_payment",
    "modify_billing",
    "sign_agreement",
    "file_regulatory",
    "accept_legal_terms",
    "hire_decide",
    "fire_decide",
    "change_compensation",
    "approve_production_action",
    "production_deploy",
    "financial_transfer",
    "legal_commitment",
    "billing_change",
  ];
  if (gated.includes(action)) {
    return { required: true, capability: "approve_production_action", action };
  }
  return { required: false, capability: null, action };
}

export function assertNoCapabilityEscalation(agent, requestedCapabilities = []) {
  const def = typeof agent === "string" ? getWave6Definition(agent) : agent;
  if (!def) throw validationError("Unknown Wave-6 agent.");
  for (const cap of requestedCapabilities) {
    if (def.prohibitedCapabilities?.includes(cap)) {
      throw forbidden(`Capability "${cap}" is prohibited for ${def.slug}.`);
    }
  }
}
