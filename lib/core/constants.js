// Mianx Core runtime constants: status sets, transition maps and bounded
// limits. These are the single source of truth shared by validation, state
// machines, API routes and the admin UI so behaviour can't drift.

export const TASK_STATUSES = [
  "pending",
  "validated",
  "awaiting_approval",
  "running",
  "completed",
  "failed",
  "cancelled",
];

export const TASK_PRIORITIES = ["low", "normal", "high", "urgent"];

// Legal task status transitions. Any transition not listed is rejected.
export const TASK_TRANSITIONS = {
  pending: ["validated", "cancelled"],
  validated: ["awaiting_approval", "running", "cancelled"],
  awaiting_approval: ["running", "cancelled", "failed"],
  running: ["completed", "failed"],
  completed: [],
  failed: ["running", "cancelled"], // retry or give up
  cancelled: [],
};

export const RUN_STATUSES = [
  "created",
  "running",
  "succeeded",
  "failed",
  "cancelled",
];

export const RUN_TRANSITIONS = {
  created: ["running", "cancelled"],
  running: ["succeeded", "failed", "cancelled"],
  succeeded: [],
  failed: [],
  cancelled: [],
};

export const APPROVAL_STATUSES = ["pending", "approved", "rejected", "cancelled"];

export const APPROVAL_TRANSITIONS = {
  pending: ["approved", "rejected", "cancelled"],
  approved: [],
  rejected: [],
  cancelled: [],
};

export const AGENT_LIFECYCLE_STATUSES = ["draft", "active", "deprecated"];
export const AGENT_INSTANCE_STATUSES = ["active", "paused", "retired"];

export const PROVIDERS = ["anthropic", "none"];

// Bounded input limits — protect the database and the AI provider from
// oversized or abusive payloads.
export const CORE_LIMITS = {
  title: 200,
  description: 4000,
  acceptanceCriteria: 4000,
  idempotencyKey: 200,
  reason: 2000,
  decisionNote: 2000,
  displayName: 200,
  // Maximum serialized size of a task/run JSON input object, in bytes.
  jsonInputBytes: 32 * 1024,
  // Maximum number of top-level keys in a structured input object.
  jsonInputKeys: 100,
};

// Terminal task/run states never transition further.
export const TERMINAL_TASK_STATUSES = ["completed", "cancelled"];
export const TERMINAL_RUN_STATUSES = ["succeeded", "failed", "cancelled"];
