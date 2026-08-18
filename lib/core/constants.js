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
  awaiting_approval: ["running", "cancelled", "failed", "completed"],
  running: ["completed", "failed", "awaiting_approval"],
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

export const PROVIDERS = ["anthropic", "openrouter", "openai", "none"];

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

// ---------------------------------------------------------------------------
// Asynchronous job queue (runtime_jobs)
// ---------------------------------------------------------------------------

export const JOB_STATUSES = [
  "queued",
  "leased",
  "running",
  "succeeded",
  "failed",
  "cancelled",
  "dead_letter",
];

// Legal job status transitions. "failed → queued" is a retry/backoff requeue;
// "dead_letter → queued" is an explicit human retry.
export const JOB_TRANSITIONS = {
  queued: ["leased", "cancelled"],
  leased: ["running", "queued", "cancelled", "dead_letter"],
  running: ["succeeded", "failed", "queued", "cancelled", "dead_letter"],
  succeeded: [],
  failed: ["queued"],
  cancelled: [],
  dead_letter: ["queued"],
};

export const TERMINAL_JOB_STATUSES = ["succeeded", "cancelled", "dead_letter"];

// Bounded queue/worker limits. These are hard server-side ceilings — client
// input can lower but never raise them.
export const JOB_LIMITS = {
  // Maximum jobs a single worker tick may claim/process.
  maxJobsPerTick: 5,
  // Maximum wall-clock budget for one tick, in ms.
  maxTickMs: 55_000,
  // Lease duration granted per claim, in seconds.
  leaseSeconds: 120,
  // Default/maximum delivery attempts before dead_letter.
  defaultMaxAttempts: 3,
  maxMaxAttempts: 10,
  // Retry backoff: base * 2^(attempt-1), capped, plus bounded jitter.
  backoffBaseMs: 5_000,
  backoffCapMs: 300_000,
  backoffJitterMs: 1_000,
  // List pagination ceiling.
  listPageSize: 25,
  maxListPageSize: 100,
};

// Provider guardrails: only these Anthropic models may ever be requested.
export const PROVIDER_MODEL_ALLOWLIST = [
  "claude-sonnet-4-6",
  "claude-haiku-4-5",
  "openrouter/free",
];

// Rough USD cost per 1M tokens, for truthful *estimated* cost display only.
export const PROVIDER_PRICING_PER_MTOK = {
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5": { input: 1, output: 5 },
  "openrouter/free": { input: 0, output: 0 },
};

export const PROVIDER_LIMITS = {
  timeoutMs: 30_000,
  maxRetries: 2,
  retryBaseMs: 500,
  retryCapMs: 4_000,
  retryJitterMs: 250,
  // Maximum serialized user-content bytes sent to the provider.
  maxInputBytes: 32 * 1024,
  // Maximum provider response body bytes accepted.
  maxOutputBytes: 256 * 1024,
  maxTokens: 1024,
};
