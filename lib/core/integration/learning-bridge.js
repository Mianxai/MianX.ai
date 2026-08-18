/**
 * Learning proposals — never auto-modify templates/plans/security/rules.
 */

import { uid, nowIso } from "./schemas.js";
import { pushLearningProposal, listLearningProposals } from "./store.js";

export function proposeIntegrationLearning({
  integration_run_id,
  project_id,
  organization_id = null,
  proposals = [],
} = {}) {
  const created = [];
  const defaults = proposals.length
    ? proposals
    : [
        "better_template_matching",
        "better_capability_mapping",
        "better_planning",
        "better_delegation",
        "better_retry_strategy",
        "improved_workflow",
        "agent_skill_improvement",
        "risk_control_improvement",
      ];

  for (const kind of defaults) {
    const p = {
      id: uid("learn"),
      integration_run_id,
      project_id,
      organization_id,
      kind: typeof kind === "string" ? kind : kind.kind,
      summary:
        typeof kind === "string"
          ? `Proposal: ${kind.replace(/_/g, " ")}`
          : kind.summary,
      status: "proposed",
      auto_applied: false,
      modifies_active_templates: false,
      modifies_approved_plans: false,
      modifies_agent_definitions: false,
      modifies_security_policies: false,
      modifies_execution_rules: false,
      requires_founder_approval: true,
      created_at: nowIso(),
      payload: typeof kind === "object" ? kind.payload || {} : {},
    };
    pushLearningProposal(p);
    created.push(p);
  }
  return created;
}

export function assessLearningSafety(proposal) {
  const unsafe =
    proposal.auto_applied ||
    proposal.modifies_active_templates ||
    proposal.modifies_approved_plans ||
    proposal.modifies_agent_definitions ||
    proposal.modifies_security_policies ||
    proposal.modifies_execution_rules;

  return {
    safe: !unsafe,
    requires_founder_approval: true,
    auto_apply_blocked: true,
  };
}

export { listLearningProposals };
