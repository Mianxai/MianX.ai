/**
 * Phase I.2 — constants for 445-seat durable workforce.
 */

export const AUTHORITATIVE_CAPACITY = 445;

export const DEPARTMENT_BASELINE = Object.freeze({
  leadership: 11,
  engineering: 78,
  devops: 24,
  security: 25,
  infrastructure: 34,
  "data-ai": 31,
  product: 11,
  design: 15,
  marketing: 19,
  seo: 14,
  sales: 20,
  finance: 23,
  hr: 21,
  legal: 25,
  operations: 16,
  support: 18,
  "customer-success": 14,
  research: 12,
  qa: 18,
  analytics: 16,
});

export const SEAT_LIFECYCLE = Object.freeze([
  "defined",
  "validated",
  "available",
  "reserved",
  "allocating",
  "allocated",
  "active",
  "waiting",
  "reviewing",
  "paused",
  "releasing",
  "released",
  "blocked",
  "suspended",
  "deprecated",
]);

export const INSTANCE_LIFECYCLE = Object.freeze([
  "requested",
  "validating",
  "allocating",
  "idle",
  "assigned",
  "preparing_context",
  "reasoning",
  "awaiting_tool",
  "tool_executing",
  "waiting_for_dependency",
  "waiting_for_review",
  "waiting_for_founder",
  "retry_scheduled",
  "completed",
  "failed",
  "dead_lettered",
  "paused",
  "releasing",
  "released",
  "archived",
]);

export const READINESS_DIMENSIONS = Object.freeze([
  "documented",
  "source_verified",
  "contract_valid",
  "hierarchy_valid",
  "department_mapped",
  "capacity_mapped",
  "provider_compatible",
  "tools_valid",
  "prompt_compilable",
  "queue_ready",
  "instance_ready",
  "memory_ready",
  "evidence_ready",
  "QA_ready",
  "project_isolation_verified",
  "deterministic_tested",
  "live_tested",
]);

export const READINESS_CATEGORIES = Object.freeze([
  "READY_TO_ACTIVATE",
  "BLOCKED_BY_PROVIDER_KEY",
  "BLOCKED_BY_CONFIGURATION",
  "BLOCKED_BY_CONTRACT",
  "LIVE_TESTED",
  "SUSPENDED",
]);

export const SOURCE_PRECEDENCE = Object.freeze([
  "governance_constitution",
  "approved_workforce_registries",
  "operating_system_specs",
  "department_contracts",
  "workflow_mappings",
  "historical_documentation",
]);

export const DEFAULT_OPENROUTER = Object.freeze({
  defaultModel: "openrouter/free",
  freeOnly: true,
  paidFallbackEnabled: false,
  appName: "MianX.ai",
  maxRequestsPerRun: 3,
  maxTokensPerRun: 8000,
});
