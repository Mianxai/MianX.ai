/**
 * Phase H — End-to-End Autonomous Company Integration contracts.
 * Coordinates existing engines (Template, Planning, Execution, Workforce).
 * Does not rebuild those engines. Simulation ≠ live provider execution.
 */

export const ENGINE_VERSION = "phase-h-integration/1.0.0";

export const EXECUTION_MODES = Object.freeze([
  "deterministic_simulation",
  "live_provider",
]);

export const INTEGRATION_STAGES = Object.freeze([
  "objective_received",
  "objective_validated",
  "clarification_required",
  "templates_matched",
  "capabilities_mapped",
  "plan_generated",
  "dependencies_validated",
  "execution_preview_generated",
  "founder_approval_required",
  "simulation_approval_required",
  "approved_for_simulation",
  "workforce_allocated",
  "tasks_claimed",
  "collaboration_running",
  "verification_running",
  "memory_writing",
  "learning_proposals_created",
  "founder_final_review",
  "completed",
  "rejected",
  "failed",
  "paused",
  "cancelled",
]);

/** Allowed forward transitions (plus self for idempotent checkpoints). */
export const STAGE_TRANSITIONS = Object.freeze({
  objective_received: ["objective_validated", "clarification_required", "failed", "cancelled"],
  objective_validated: [
    "templates_matched",
    "clarification_required",
    "failed",
    "cancelled",
  ],
  clarification_required: [
    "objective_validated",
    "templates_matched",
    "rejected",
    "cancelled",
    "failed",
  ],
  templates_matched: ["capabilities_mapped", "clarification_required", "failed", "cancelled"],
  capabilities_mapped: ["plan_generated", "failed", "cancelled"],
  plan_generated: ["dependencies_validated", "failed", "cancelled"],
  dependencies_validated: [
    "execution_preview_generated",
    "failed",
    "cancelled",
    "founder_approval_required",
  ],
  execution_preview_generated: ["founder_approval_required", "failed", "cancelled"],
  founder_approval_required: [
    "simulation_approval_required",
    // Legacy path for older clients / resumed runs.
    "approved_for_simulation",
    "rejected",
    "clarification_required",
    "paused",
    "cancelled",
    "failed",
  ],
  simulation_approval_required: [
    "approved_for_simulation",
    "founder_approval_required",
    "rejected",
    "clarification_required",
    "paused",
    "cancelled",
    "failed",
  ],
  approved_for_simulation: ["workforce_allocated", "paused", "cancelled", "failed"],
  workforce_allocated: ["tasks_claimed", "paused", "cancelled", "failed"],
  tasks_claimed: ["collaboration_running", "paused", "cancelled", "failed"],
  collaboration_running: ["verification_running", "paused", "cancelled", "failed"],
  verification_running: [
    "memory_writing",
    "founder_final_review",
    "failed",
    "paused",
    "cancelled",
  ],
  memory_writing: ["learning_proposals_created", "failed", "paused", "cancelled"],
  learning_proposals_created: ["founder_final_review", "failed", "paused", "cancelled"],
  founder_final_review: [
    "completed",
    "rejected",
    "paused",
    "cancelled",
    "failed",
    "verification_running",
  ],
  completed: [],
  rejected: [],
  failed: ["objective_received", "paused", "cancelled"],
  paused: [
    "founder_approval_required",
    "simulation_approval_required",
    "approved_for_simulation",
    "workforce_allocated",
    "tasks_claimed",
    "collaboration_running",
    "verification_running",
    "memory_writing",
    "learning_proposals_created",
    "founder_final_review",
    "cancelled",
    "failed",
  ],
  cancelled: [],
});

export const RUN_STATUSES = Object.freeze([
  "active",
  "awaiting_clarification",
  "awaiting_approval",
  "awaiting_simulation_approval",
  "awaiting_simulation_start",
  "simulating",
  "awaiting_final_review",
  "completed",
  "rejected",
  "failed",
  "paused",
  "cancelled",
]);

export const PROTECTED_ACTIONS = Object.freeze([
  "production_deployment",
  "database_migration_application",
  "external_message_send",
  "payment_or_spending",
  "secret_modification",
  "destructive_database_action",
  "external_account_access",
  "legal_or_compliance_approval",
]);

export function nowIso() {
  return new Date().toISOString();
}

export function uid(prefix = "int") {
  // Prefer UUID so durable integration_runs.id (uuid) can store the same key.
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function assertStage(stage) {
  if (!INTEGRATION_STAGES.includes(stage)) {
    throw new Error(`Invalid integration stage: ${stage}`);
  }
}

export function canTransitionStage(from, to) {
  if (from === to) return true;
  const allowed = STAGE_TRANSITIONS[from] || [];
  return allowed.includes(to);
}

export function assertStageTransition(from, to) {
  assertStage(from);
  assertStage(to);
  if (!canTransitionStage(from, to)) {
    throw new Error(`Illegal stage transition: ${from} → ${to}`);
  }
}
