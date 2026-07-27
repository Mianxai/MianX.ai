// Human-readable Founder approval explanations — never weakens enforcement.

import { isProtectedAction, ACTION_TO_APPROVAL_CAPABILITY } from "../executive/policy";

export const HIGH_RISK_LABELS = {
  production_deploy: "PRODUCTION DEPLOY",
  production_destructive_mutation: "DESTRUCTIVE MUTATION",
  financial_transfer: "PAYMENT",
  legal_commitment: "LEGAL COMMITMENT",
  billing_change: "PAYMENT",
  secret_change: "SECRET CHANGE",
  permission_ownership_change: "PERMISSION CHANGE",
  send_protected_communication: "EXTERNAL SEND",
  send_email: "EXTERNAL SEND",
  approve_production_action: "PRODUCTION ACTION",
  irreversible_production_action: "DESTRUCTIVE MUTATION",
  launch_industry_os: "PRODUCTION DEPLOY",
  disable_security_control: "PERMISSION CHANGE",
};

const CAPABILITY_COPY = {
  send_email: {
    label: "EXTERNAL SEND",
    whatIfApproved: "A human-approved outbound message may be sent by a gated path.",
    whatIfRejected: "No message is sent. Drafts remain for review only.",
  },
  approve_production_action: {
    label: "PRODUCTION ACTION",
    whatIfApproved: "The requested production-side action may proceed under policy.",
    whatIfRejected: "The production action remains blocked. Work may stay awaiting approval.",
  },
};

/**
 * Build a Founder-facing explanation for an approval_requests row.
 * Uses only stored fields — never invents metrics.
 */
export function explainApproval(approval = {}) {
  const capability = approval.requested_capability || null;
  const reason = approval.reason || null;
  const meta = approval.metadata && typeof approval.metadata === "object" ? approval.metadata : {};
  const proposed =
    meta.proposed_action || meta.action || approval.proposed_action || null;

  const riskKey =
    (proposed && isProtectedAction(proposed) && proposed) ||
    (capability && HIGH_RISK_LABELS[capability] ? capability : null) ||
    null;

  const riskLabel = riskKey
    ? HIGH_RISK_LABELS[riskKey] || HIGH_RISK_LABELS[capability] || "PROTECTED ACTION"
    : capability
      ? CAPABILITY_COPY[capability]?.label || capability
      : "Protected action";

  const copy = CAPABILITY_COPY[capability] || {
    label: riskLabel,
    whatIfApproved: "The gated action may proceed subject to remaining policy checks.",
    whatIfRejected: "The action stays blocked. No side effect is executed.",
  };

  return {
    requestedAction: proposed || capability || "Unknown protected action",
    requestingAgent: meta.agent_slug || approval.agent_slug || null,
    projectId: approval.project_id || null,
    reason: reason || "No reason recorded",
    riskLabel,
    riskClass: meta.risk_class || null,
    affectedResource:
      meta.resource_type && meta.resource_id
        ? `${meta.resource_type}:${meta.resource_id}`
        : meta.resource_type || approval.resource_type || null,
    whatIfApproved: copy.whatIfApproved,
    whatIfRejected: copy.whatIfRejected,
    capability,
    status: approval.status || null,
    highRisk: Boolean(riskKey || HIGH_RISK_LABELS[capability]),
  };
}

export function listHighRiskLabels() {
  return [...new Set(Object.values(HIGH_RISK_LABELS))];
}

export { ACTION_TO_APPROVAL_CAPABILITY };
