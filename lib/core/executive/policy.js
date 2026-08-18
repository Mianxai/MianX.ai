// Action/capability-based approval policy for Wave-1 executives.
//
// Human Founder approval is required only when a protected ACTION or
// CAPABILITY is proposed — never merely because an executive persona ran.

import { PROTECTED_CAPABILITIES } from "../agents";
import { L2_SLUGS, getWave1Definition } from "./agents";
import { forbidden, validationError } from "../errors";
import { clip } from "../validate";

/**
 * Protected production actions (and aliases) that always require Founder
 * (or other human) approval. These are NOT granted as agent-executable
 * capabilities — executives may only *propose* them.
 */
export const PROTECTED_EXECUTIVE_ACTIONS = [
  "production_deploy",
  "production_destructive_mutation",
  "financial_transfer",
  "legal_commitment",
  "billing_change",
  "secret_change",
  "permission_ownership_change",
  "irreversible_production_action",
  "send_protected_communication",
  "launch_industry_os",
  "disable_security_control",
  // Capability aliases (existing runtime protected set)
  ...PROTECTED_CAPABILITIES,
];

/** Map a protected action to the approval capability recorded on the request. */
export const ACTION_TO_APPROVAL_CAPABILITY = {
  production_deploy: "approve_production_action",
  production_destructive_mutation: "approve_production_action",
  irreversible_production_action: "approve_production_action",
  launch_industry_os: "approve_production_action",
  disable_security_control: "approve_production_action",
  permission_ownership_change: "approve_production_action",
  secret_change: "approve_production_action",
  billing_change: "approve_production_action",
  financial_transfer: "approve_production_action",
  legal_commitment: "approve_production_action",
  send_protected_communication: "send_email",
  send_email: "send_email",
  approve_production_action: "approve_production_action",
};

export function isProtectedAction(action) {
  if (!action || typeof action !== "string") return false;
  return PROTECTED_EXECUTIVE_ACTIONS.includes(action);
}

export function approvalCapabilityForAction(action) {
  if (!isProtectedAction(action)) return null;
  return ACTION_TO_APPROVAL_CAPABILITY[action] || "approve_production_action";
}

/**
 * Derives whether Founder approval is required from proposed actions /
 * requested capabilities — not from agent identity or risk_class alone.
 */
export function deriveApprovalRequirement({
  proposedAction = null,
  requestedCapabilities = [],
  plan = null,
  assessments = {},
} = {}) {
  const proposed = [];

  if (proposedAction) proposed.push(clip(proposedAction, 100));
  if (plan?.proposed_action) proposed.push(clip(plan.proposed_action, 100));

  for (const cap of requestedCapabilities || []) {
    proposed.push(clip(cap, 100));
  }

  for (const ws of plan?.workstreams || []) {
    if (ws.proposed_action) proposed.push(clip(ws.proposed_action, 100));
  }

  for (const out of Object.values(assessments || {})) {
    if (out?.proposed_action) proposed.push(clip(out.proposed_action, 100));
    // Legacy field: only honor if it names a protected action, not a bare boolean.
    if (typeof out?.proposed_protected_action === "string") {
      proposed.push(clip(out.proposed_protected_action, 100));
    }
  }

  const protectedProposed = [...new Set(proposed.filter(isProtectedAction))];
  if (protectedProposed.length === 0) {
    return {
      approval_required: false,
      protected_actions: [],
      approval_capability: null,
    };
  }

  // Prefer the strongest / first mapped capability for the approval record.
  const primary = protectedProposed[0];
  return {
    approval_required: true,
    protected_actions: protectedProposed,
    approval_capability: approvalCapabilityForAction(primary),
    primary_action: primary,
  };
}

/** Canonical domain owned by each L2 slug. */
export const L2_DOMAIN_BY_SLUG = Object.fromEntries(
  L2_SLUGS.map((slug) => {
    const def = getWave1Definition(slug);
    return [slug, def?.domain];
  })
);

/**
 * Executive Orchestrator may only assign a workstream to an L2 that owns
 * the declared domain (or omit domain and rely on owner_agent alone).
 */
export function assertWorkstreamDomainAllowed(ownerAgent, domain) {
  if (!L2_SLUGS.includes(ownerAgent)) {
    throw validationError("Unknown C-Suite agent.", {
      owner_agent: `Unknown or non-Wave-1 L2 agent "${ownerAgent}".`,
    });
  }
  if (!domain) return true;
  const owned = L2_DOMAIN_BY_SLUG[ownerAgent];
  if (owned !== domain) {
    throw forbidden(
      `Domain "${domain}" is not owned by "${ownerAgent}" (owns "${owned}").`
    );
  }
  return true;
}

export function assertAgentCannotSelfApprove(def) {
  if (def?.canSelfApprove === true) {
    throw forbidden(`Agent "${def.slug}" cannot self-approve.`);
  }
  return true;
}
