/**
 * Protected actions remain Founder-gated or blocked.
 */

import { PROTECTED_ACTIONS, uid, nowIso } from "./schemas.js";

export function evaluateProtectedAction(action, {
  founder_approved = false,
  integration_run_id = null,
  project_id = null,
} = {}) {
  const normalized = String(action || "").trim();
  const isProtected = PROTECTED_ACTIONS.includes(normalized);

  if (!isProtected) {
    return {
      action: normalized,
      protected: false,
      allowed: true,
      status: "not_protected",
    };
  }

  if (founder_approved) {
    return {
      id: uid("prot"),
      action: normalized,
      protected: true,
      allowed: false,
      status: "founder_approved_pending_separate_live_gate",
      note: "Founder acknowledgement recorded; live protected execution still requires separate Phase controls.",
      integration_run_id,
      project_id,
      at: nowIso(),
    };
  }

  return {
    id: uid("prot"),
    action: normalized,
    protected: true,
    allowed: false,
    status: "founder_approval_required",
    blocked: true,
    silently_executed: false,
    integration_run_id,
    project_id,
    at: nowIso(),
  };
}

export function scanObjectiveForProtectedActions(objective = {}) {
  const requested = [...(objective.protected_actions || [])];
  const text = `${objective.title || ""} ${objective.business_purpose || ""}`.toLowerCase();

  const hints = [
    ["production_deployment", /deploy|production/],
    ["database_migration_application", /migrat/],
    ["external_message_send", /email|sms|slack|notify external/],
    ["payment_or_spending", /payment|spend|invoice|charge/],
    ["secret_modification", /secret|api key|credential/],
    ["destructive_database_action", /drop table|truncate|delete all/],
    ["external_account_access", /oauth|external account/],
    ["legal_or_compliance_approval", /legal|compliance approval|gdpr sign/],
  ];

  for (const [action, re] of hints) {
    if (re.test(text) && !requested.includes(action)) requested.push(action);
  }

  return requested.map((action) =>
    evaluateProtectedAction(action, {
      project_id: objective.project_id,
    })
  );
}
