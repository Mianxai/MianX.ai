// Protected-action proposals — never execute deployment.

import { forbidden, validationError } from "../errors";
import { appendEvent, saveItem } from "./store";
import { baseRecord } from "./model";

const PROTECTED = new Set([
  "production_deploy",
  "secret_change",
  "domain_change",
  "merge_to_main",
  "industry_os_build",
]);

/**
 * Propose a protected action. Always requires Founder approval.
 * Never executes the action.
 */
export function proposeProtectedAction({
  program,
  action,
  item = null,
  actor = "system",
} = {}) {
  if (!program) throw validationError("program required");
  if (!PROTECTED.has(action)) {
    throw validationError(`Unknown protected action: ${action}`);
  }

  const proposal = baseRecord({
    level: "task",
    parent_id: item?.id || null,
    company_id: program.company_id,
    project_id: program.project_id,
    objective_id: program.objective_id,
    program_id: program.id,
    status: "awaiting_approval",
    priority: "P0",
    risk_level: "R4",
    title: `Protected action proposal: ${action}`,
    audit_metadata: {
      protected_action: action,
      executed: false,
      requires_founder_approval: true,
    },
    extra: {
      proposal: {
        action,
        proposed_by: actor,
        executed: false,
        deployment_executed: false,
      },
    },
  });
  saveItem(proposal);
  appendEvent({
    program_id: program.id,
    project_id: program.project_id,
    item_id: proposal.id,
    event_type: "protected_action_proposed",
    actor,
    payload: {
      action,
      executed: false,
      requires_founder_approval: true,
    },
  });

  return {
    proposal,
    executed: false,
    deployment_executed: false,
    requires_founder_approval: true,
    message: "Protected action held for Founder approval — not executed.",
  };
}

export function assertProtectedActionNotExecuted(proposal) {
  if (proposal?.proposal?.executed || proposal?.audit_metadata?.executed) {
    throw forbidden("Protected action must not execute without Founder gate.");
  }
  return true;
}
