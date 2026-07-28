import { makeTemplateBase } from "../schemas";

/** Template workflows ≠ live runtime workflow instances. */
export const WORKFLOW_TEMPLATES = [
  wf("onboarding", "User / org onboarding", {
    trigger: "signup_or_invite",
    actors: ["user", "admin", "system"],
    stages: ["collect_profile", "verify", "provision", "activate"],
    decisions: ["auto_approve_vs_review"],
    approvals: ["admin_optional"],
    inputs: ["identity", "org_context"],
    outputs: ["active_membership"],
    exceptions: ["verification_failed"],
    retries: { max: 3, backoff: "exponential" },
    slas: { activation_hours: 24 },
    audit_events: ["onboarding_started", "onboarding_completed"],
    metrics: ["activation_rate"],
    compliance_controls: ["identity_assurance"],
  }),
  wf("approval-gate", "Human approval gate", {
    trigger: "protected_action_requested",
    actors: ["requester", "approver", "system"],
    stages: ["request", "review", "decide", "apply_or_reject"],
    decisions: ["approve", "reject", "needs_changes"],
    approvals: ["required"],
    inputs: ["action_payload", "risk_level"],
    outputs: ["decision_record"],
    exceptions: ["stale_request"],
    retries: { max: 0 },
    slas: { review_hours: 48 },
    audit_events: ["approval_requested", "approval_decided"],
    metrics: ["approval_latency"],
    compliance_controls: ["dual_control"],
  }),
  wf("incident-response", "Incident response", {
    trigger: "incident_declared",
    actors: ["oncall", "security", "founder"],
    stages: ["triage", "contain", "eradicate", "recover", "review"],
    decisions: ["severity_vs_continue"],
    approvals: ["founder_for_public_comms"],
    inputs: ["signals", "impact"],
    outputs: ["postmortem_stub"],
    exceptions: ["cascading_failure"],
    retries: { max: 1 },
    slas: { ack_minutes: 15 },
    audit_events: ["incident_opened", "incident_closed"],
    metrics: ["mttr_contract"],
    compliance_controls: ["evidence_retention"],
  }),
];

function wf(slug, name, payload) {
  const base = makeTemplateBase({
    id: `tpl_wf_${slug}_v1`,
    slug,
    name,
    description: `Workflow template: ${name}. Not a live workflow instance.`,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return {
    ...base,
    kind: "workflow",
    payload: {
      ...payload,
      distinction: "template_workflow_not_runtime_instance",
    },
  };
}

export function listWorkflowTemplates({ includeDeprecated = false } = {}) {
  return WORKFLOW_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getWorkflowTemplate(slug, version = null) {
  const matches = WORKFLOW_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
