// Wave-3 verdict / readiness helpers.

import { forbidden, validationError } from "../errors";
import { WAVE3_SLUGS, getWave3Definition } from "./agents";
import { isProtectedAction, approvalCapabilityForAction } from "../executive/policy";
import { PROTECTED_CAPABILITIES } from "../agents";

export const VERDICT_STATUSES = ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"];

export function statusPreventsSuccess(status) {
  return status === "FAIL" || status === "BLOCKED";
}

export function assertWave3Agent(slug) {
  if (!WAVE3_SLUGS.includes(slug)) {
    throw validationError("Unknown Wave-3 platform agent.", {
      agent: `Unknown or non-Wave-3 agent "${slug}".`,
    });
  }
  return true;
}

export function assertNoCapabilityEscalation(slug, requestedCapabilities = []) {
  const def = getWave3Definition(slug);
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

export function assertProjectScope({ jobProjectId, requestedProjectId }) {
  if (requestedProjectId && jobProjectId && requestedProjectId !== jobProjectId) {
    throw forbidden("Cross-project access denied for Wave-3 platform jobs.");
  }
  return true;
}

export function derivePlatformApproval({ proposedAction, readiness } = {}) {
  const action = proposedAction || readiness?.proposed_action || null;
  if (!isProtectedAction(action)) {
    return { approval_required: false, approval_capability: null, primary_action: null };
  }
  return {
    approval_required: true,
    approval_capability: approvalCapabilityForAction(action),
    primary_action: action,
  };
}

export function aggregatePlatformReadiness({
  candidate,
  security,
  devops,
  infra,
  dataAi,
  proposedAction = null,
}) {
  const blockers = [];
  const known_risks = [];

  for (const [name, status] of [
    ["security", security?.security_status],
    ["infra", infra?.infra_status],
    ["data_ai", dataAi?.data_ai_status],
    ["devops", devops?.devops_status],
  ]) {
    if (statusPreventsSuccess(status)) {
      blockers.push(`${name}: ${status}`);
    } else if (status === "PASS_WITH_RISKS") {
      known_risks.push(`${name}: residual risks`);
    }
  }

  if (candidate?.validation_passed === false) {
    blockers.push("coding: validation_failed");
  }
  if (candidate?.pushed || candidate?.merged || candidate?.deployed) {
    blockers.push("coding: illegal_side_effect_claimed");
  }

  const failed = blockers.length > 0;
  const approval = derivePlatformApproval({
    proposedAction,
    readiness: { proposed_action: proposedAction },
  });

  return {
    coding_status: candidate?.validation_passed === false ? "FAIL" : "PASS",
    security_status: security?.security_status || "unknown",
    devops_status: devops?.devops_status || devops?.test_status || "unknown",
    infra_status: infra?.infra_status || "unknown",
    data_ai_status: dataAi?.data_ai_status || "unknown",
    known_risks,
    blockers,
    approval_required: failed ? false : approval.approval_required,
    approval_capability: failed ? null : approval.approval_capability,
    primary_action: failed ? null : approval.primary_action,
    proposed_action: proposedAction,
    recommended_next_action: failed
      ? "Repair failing platform stage and re-run"
      : approval.approval_required
        ? "Await Founder approval for protected production action"
        : "Candidate is advisory-ready; human may review patch — no production action",
    release_ready: !failed && !approval.approval_required,
  };
}
