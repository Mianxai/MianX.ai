// Wave-2 delivery safety: QA independence, scope, capability, project isolation.

import { forbidden, validationError } from "../errors";
import { WAVE2_SLUGS, getWave2Definition } from "./agents";
import { isProtectedAction, approvalCapabilityForAction } from "../executive/policy";
import { PROTECTED_CAPABILITIES } from "../agents";

export const IMPLEMENTER_SLUG = "delivery-engineer";
export const INDEPENDENT_QA_SLUG = "delivery-qa";

/** Final independent quality owner — never engineering-embedded QA. */
export const FINAL_QA_OWNER = {
  runtimeSlug: INDEPENDENT_QA_SLUG,
  workforceSlug: "qa.release-verifier",
  department: "qa",
  note:
    "Engineering-embedded QA (engineering.qa / engineering.senior-qa) may support " +
    "test engineering but cannot certify final release readiness. dept.qa owns the gate.",
};

/**
 * The agent that produced implementation_result cannot certify final QA.
 */
export function assertQaIndependence({ implementerSlug, qaSlug = INDEPENDENT_QA_SLUG }) {
  if (!implementerSlug) {
    throw validationError("QA independence check failed.", {
      implementer_slug: "implementer_slug is required.",
    });
  }
  if (implementerSlug === qaSlug) {
    throw forbidden(
      `QA independence violation: "${qaSlug}" cannot self-certify its own implementation.`
    );
  }
  if (implementerSlug === INDEPENDENT_QA_SLUG) {
    throw forbidden("Independent QA agent cannot also be the implementer.");
  }
  if (qaSlug !== INDEPENDENT_QA_SLUG) {
    throw forbidden(
      `Final release QA must be "${INDEPENDENT_QA_SLUG}" (dept.qa), got "${qaSlug}".`
    );
  }
  return true;
}

export function assertWave2Agent(slug) {
  if (!WAVE2_SLUGS.includes(slug)) {
    throw validationError("Unknown Wave-2 delivery agent.", {
      agent: `Unknown or non-Wave-2 agent "${slug}".`,
    });
  }
  return true;
}

export function assertNoCapabilityEscalation(slug, requestedCapabilities = []) {
  const def = getWave2Definition(slug);
  if (!def) throw validationError("Unknown agent.", { agent: slug });
  const allowed = new Set(def.allowedCapabilities || []);
  const prohibited = new Set(def.prohibitedCapabilities || []);
  for (const cap of requestedCapabilities) {
    if (PROTECTED_CAPABILITIES.includes(cap) || prohibited.has(cap)) {
      throw forbidden(`Capability escalation blocked: "${cap}" on "${slug}".`);
    }
    if (!allowed.has(cap)) {
      throw forbidden(`Capability "${cap}" is not allowed for "${slug}".`);
    }
  }
  return true;
}

export function assertProjectScope({ jobProjectId, taskProjectId, requestedProjectId }) {
  if (requestedProjectId && jobProjectId && requestedProjectId !== jobProjectId) {
    throw forbidden("Cross-project access denied for Wave-2 delivery jobs.");
  }
  if (taskProjectId && jobProjectId && taskProjectId !== jobProjectId) {
    throw forbidden("Task/job project scope mismatch.");
  }
  return true;
}

export function deriveDeliveryApproval({ proposedAction, deliveryReadiness } = {}) {
  const action =
    proposedAction ||
    deliveryReadiness?.proposed_action ||
    null;
  if (!isProtectedAction(action)) {
    return {
      approval_required: false,
      approval_capability: null,
      primary_action: null,
    };
  }
  return {
    approval_required: true,
    approval_capability: approvalCapabilityForAction(action),
    primary_action: action,
  };
}

export function qaPreventsSuccess(qaStatus) {
  return qaStatus === "FAIL" || qaStatus === "BLOCKED";
}

export function reviewPreventsProgress(verdict) {
  return verdict === "reject";
}
