// Phase D execution lifecycle states — explicit enum, no loose strings.

export const EXECUTION_STATES = Object.freeze([
  "draft",
  "awaiting_approval",
  "approved",
  "queued",
  "ready",
  "blocked",
  "assigned",
  "running",
  "review",
  "succeeded",
  "failed",
  "retry_wait",
  "dead_lettered",
  "paused",
  "cancelled",
]);

export const EXECUTION_LEVELS = Object.freeze([
  "company",
  "product",
  "program",
  "epic",
  "feature",
  "story",
  "task",
  "agent_run",
]);

export const PRIORITIES = Object.freeze(["P0", "P1", "P2", "P3"]);
export const RISK_LEVELS = Object.freeze(["R1", "R2", "R3", "R4"]);

/** Valid directed transitions: from → allowed next states */
export const STATE_TRANSITIONS = Object.freeze({
  draft: ["awaiting_approval", "cancelled"],
  awaiting_approval: ["approved", "rejected", "cancelled"],
  // "rejected" is terminal for blueprints; items use cancelled
  approved: ["queued", "paused", "cancelled"],
  queued: ["ready", "blocked", "paused", "cancelled"],
  ready: ["assigned", "blocked", "paused", "cancelled"],
  blocked: ["ready", "queued", "paused", "cancelled", "failed"],
  assigned: ["running", "paused", "cancelled", "ready"],
  running: ["review", "succeeded", "failed", "retry_wait", "paused", "cancelled"],
  review: ["succeeded", "failed", "queued", "cancelled"],
  succeeded: [],
  failed: ["retry_wait", "dead_lettered", "cancelled"],
  retry_wait: ["queued", "ready", "dead_lettered", "cancelled"],
  dead_lettered: ["cancelled"],
  paused: ["queued", "ready", "cancelled"],
  cancelled: [],
  rejected: [],
});

export const ENGINE_VERSION = 1;

export const ALLOCATION_BOUNDS = Object.freeze({
  maxAgentsPerProgramTick: 6,
  maxAgentsPerProject: 8,
  maxConcurrentRunsGlobal: 12,
  maxAttempts: 3,
});

export const CHECKPOINT_KINDS = Object.freeze([
  "blueprint_approved",
  "program_created",
  "wave_started",
  "deliverable_completed",
  "review_passed",
  "recovery_performed",
  "program_completed",
]);
