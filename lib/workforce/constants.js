// Mianx AI Workforce — shared constants for the canonical organizational registry.
//
// This registry describes planned organizational structure. It does NOT activate
// runtime agents. Executable agents remain in lib/core/agents.js.

/** Prompt OS / constitution hierarchy levels. L0 is human Founder only. */
export const HIERARCHY_LEVELS = ["L0", "L1", "L2", "L3", "L4", "L5"];

/** L0 is never an AI agent definition. */
export const AI_HIERARCHY_LEVELS = ["L1", "L2", "L3", "L4", "L5"];

export const ROLE_TYPES = [
  "executive",
  "director",
  "manager",
  "specialist",
  "capacity_reserve", // honest unallocated slots — not an inventable agent persona
];

export const LIFECYCLE_STATUSES = [
  "proposed", // in the org registry only
  "planned_capacity", // slot budget without named inventory
  "draft", // may later map to lib/core/agents.js draft
  "active", // maps to an executable runtime agent
  "deprecated",
];

export const ACTIVATION_CLASSES = [
  "shared", // enterprise-wide, project-assigned when needed
  "project_dedicated",
  "ephemeral",
  "persistent_operational",
  "approval_only",
];

export const RISK_CLASSES = ["R0", "R1", "R2", "R3", "R4"];

export const DATA_ACCESS_CLASSES = [
  "none",
  "project_scoped",
  "department_scoped",
  "enterprise_read",
  "enterprise_sensitive",
  "secrets_forbidden",
];

export const AUTONOMY_LEVELS = [
  "observe",
  "recommend",
  "draft",
  "execute_with_approval",
  "execute_bounded",
];

/** Declared department role-slot total from AGENT-CAPACITY-BASELINE.md §6. */
export const PLANNED_ROLE_SLOT_TOTAL = 445;

/** Historical Master Blueprint minimum planning claim — not active agents. */
export const HISTORICAL_MINIMUM_CLAIM = "258+";

/**
 * Capability identifiers allowed in workforce definitions.
 * Extends runtime capabilities with org-planning vocabulary. Protected
 * production actions still require human gates when mapped to runtime.
 */
export const WORKFORCE_CAPABILITIES = [
  // Existing runtime capabilities (lib/core/agents.js)
  "read_lead",
  "score_lead",
  "draft_text",
  "summarize",
  "research_summary",
  "qa_review",
  "plan",
  "requirements",
  "engineering_plan",
  "test_review",
  "security_review",
  "release_recommend",
  "follow_up_draft",
  "send_email",
  "approve_production_action",
  // Org-planning / future (not executable until promoted to agents.js)
  "orchestrate",
  "delegate",
  "review_work",
  "set_policy_recommend",
  "budget_recommend",
  "hire_recommend",
  "incident_coordinate",
  "observe_metrics",
  // Wave-6 high-risk prohibitions (never grant as allowed)
  "transfer_funds",
  "execute_payment",
  "modify_billing",
  "hire_decide",
  "fire_decide",
  "change_compensation",
  "sign_agreement",
  "file_regulatory",
  "accept_legal_terms",
];

export const PROTECTED_WORKFORCE_CAPABILITIES = [
  "send_email",
  "approve_production_action",
  "set_policy_recommend",
  "budget_recommend",
  "transfer_funds",
  "execute_payment",
  "modify_billing",
  "hire_decide",
  "fire_decide",
  "change_compensation",
  "sign_agreement",
  "file_regulatory",
  "accept_legal_terms",
];
