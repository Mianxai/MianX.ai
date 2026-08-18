/**
 * Phase II.1 — Controlled one-agent live pilot foundation.
 * Implementation only. No provider calls. Switches default OFF.
 */

export const PILOT_AGENT_SLUG = "mianx-internal-architecture-reviewer";
export const PILOT_AGENT_NAME = "MianX Internal Architecture Reviewer";
export const PILOT_PROJECT_ID = "61d3b1fd-c260-479b-9289-0c75f977e892";
export const PILOT_PROJECT_NAME = "MianX Internal Production Proof";
/** Second project / tenant must never receive pilot access. */
export const PILOT_FORBIDDEN_PROJECT_HINT = "Mianxai";

export const ENV_LIVE_AGENT_EXECUTION_ENABLED = "LIVE_AGENT_EXECUTION_ENABLED";
export const ENV_LIVE_AGENT_PILOT_ENABLED = "LIVE_AGENT_PILOT_ENABLED";

/** Env var NAMES only — values must never be committed. */
export const PROVIDER_ENV_NAMES = Object.freeze({
  anthropic: "ANTHROPIC_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
  openai: "OPENAI_API_KEY",
});

export const ENV_LIVE_AGENT_OPENAI_MODEL = "LIVE_AGENT_OPENAI_MODEL";

export const PILOT_POLICY = Object.freeze({
  maxLiveAgents: 1,
  maxConcurrentRequests: 1,
  maxQueuedPilotTasks: 1,
  maxAttempts: 1,
  automaticRetry: false,
  maxInputTokens: 4000,
  maxOutputTokens: 1200,
  maxTotalTokens: 5200,
  maxEstimatedCostUsd: 0.1,
  maxWallClockMs: 90_000,
  maxProviderTimeoutMs: 60_000,
  streamingRequired: false,
  externalTools: false,
  mutations: false,
  childRuns: false,
  scheduleAutoPilot: false,
  paidFallback: false,
  /** Phase II.2 canonical OpenAI pilot model + official snapshot — no silent substitution. */
  allowlistedModels: Object.freeze([
    "gpt-5.4-mini",
    "gpt-5.4-mini-2026-03-17",
  ]),
});

export const PILOT_TOOL_PERMISSIONS = Object.freeze({
  write: false,
  shell: false,
  githubWrite: false,
  email: false,
  deploy: false,
  databaseMutation: false,
  payment: false,
  internetBrowse: false,
  childAgentSpawn: false,
  autonomousTaskCreate: false,
  recursiveExecution: false,
});

export const PILOT_RUN_STATUSES = Object.freeze([
  "pending_approval",
  "approved",
  "queued",
  "leased",
  "running",
  "succeeded",
  "failed",
  "blocked",
  "killed",
  "cancelled",
]);

export const PILOT_BLOCK_REASONS = Object.freeze({
  GLOBAL_SWITCH_OFF: "global_live_execution_disabled",
  PILOT_SWITCH_OFF: "pilot_execution_disabled",
  PROVIDER_NONE: "provider_not_configured",
  MODEL_NOT_ALLOWLISTED: "model_not_allowlisted",
  MODEL_NOT_VERIFIED: "model_availability_not_verified",
  MODEL_CATALOG_NOT_VERIFIED: "official_catalog_not_verified",
  ACCOUNT_ACCESS_NOT_VERIFIED: "account_model_access_not_verified",
  PRICING_NOT_VERIFIED: "model_pricing_not_verified",
  BILLING_PATH_UNKNOWN: "billing_path_not_verified",
  MISSING_APPROVAL: "founder_approval_missing",
  MISSING_FOUNDER_LIVE_AUTH: "founder_live_run_authorization_missing",
  WRONG_PROJECT: "project_isolation_failed",
  WRONG_AGENT: "agent_not_canonical_pilot",
  WRONG_TASK: "task_not_approved_for_pilot",
  LEASE_ACTIVE: "active_lease_conflict",
  QUEUE_FULL: "queue_capacity_exhausted",
  CONCURRENCY_EXCEEDED: "concurrency_limit_exceeded",
  RATE_LIMITED: "rate_limited",
  BUDGET_EXCEEDED: "cost_or_token_budget_exceeded",
  POLICY_LIMIT_MISMATCH: "pilot_policy_limit_mismatch",
  SCHEDULER_UNHEALTHY: "runtime_scheduler_unhealthy",
  EVIDENCE_STORE_UNAVAILABLE: "evidence_store_unavailable",
  DURABLE_QUEUE_UNAVAILABLE: "durable_queue_unavailable",
  KILL_SWITCH: "kill_switch_active",
  UNAUTHENTICATED: "unauthenticated",
  UNAUTHORIZED: "unauthorized",
  IDEMPOTENCY_CONFLICT: "idempotency_conflict",
  SCHEMA_INVALID: "structured_output_invalid",
  TIMEOUT: "provider_or_wall_clock_timeout",
});
