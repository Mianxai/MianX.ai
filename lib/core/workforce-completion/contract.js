/**
 * Canonical agent execution contract — fail closed.
 */

import { validationError } from "../errors";

export const REQUIRED_CONTRACT_FIELDS = Object.freeze([
  "agentId",
  "version",
  "projectId",
  "organizationId",
  "department",
  "hierarchy",
  "objective",
  "task",
  "structuredInputs",
  "expectedOutputs",
  "dependencies",
  "capabilityRequirements",
  "evidenceRequirements",
  "memoryRetrievalScope",
  "memoryWritePolicy",
  "learningCandidatePolicy",
  "riskClass",
  "protectedActions",
  "timeoutMs",
  "retryPolicy",
  "idempotencyKey",
  "correlationId",
  "traceId",
  "executionMode",
  "providerMode",
  "costTokenLimits",
  "completionStatus",
  "failureReason",
]);

/**
 * @param {Record<string, unknown>} contract
 * @returns {{ valid: boolean, errors: Record<string, string>, contract: object }}
 */
export function validateAgentExecutionContract(contract) {
  const errors = {};
  const c = contract && typeof contract === "object" ? contract : {};

  for (const field of REQUIRED_CONTRACT_FIELDS) {
    if (!(field in c)) {
      errors[field] = "Required contract field is missing.";
      continue;
    }
  }

  if (!c.agentId) errors.agentId = errors.agentId || "agentId is required.";
  if (!c.projectId) errors.projectId = errors.projectId || "projectId is required (project isolation).";
  if (c.organizationId === undefined) {
    errors.organizationId = "organizationId field is required (may be null).";
  }
  if (!c.idempotencyKey) {
    errors.idempotencyKey = errors.idempotencyKey || "idempotencyKey is required.";
  }
  if (!c.correlationId) {
    errors.correlationId = errors.correlationId || "correlationId is required.";
  }
  if (!c.traceId) errors.traceId = errors.traceId || "traceId is required.";
  if (!Array.isArray(c.protectedActions)) {
    errors.protectedActions = "protectedActions must be an array.";
  }
  if (!Array.isArray(c.capabilityRequirements)) {
    errors.capabilityRequirements = "capabilityRequirements must be an array.";
  }
  if (c.timeoutMs != null && !(Number.isFinite(c.timeoutMs) && c.timeoutMs > 0)) {
    errors.timeoutMs = "timeoutMs must be a positive number.";
  }

  const modes = new Set(["deterministic", "provider", "simulation", "live"]);
  if (c.executionMode && !modes.has(String(c.executionMode))) {
    errors.executionMode = "Invalid executionMode.";
  }
  if (c.providerMode && !["none", "optional", "required", "fake"].includes(String(c.providerMode))) {
    errors.providerMode = "Invalid providerMode.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    contract: c,
  };
}

export function assertAgentExecutionContract(contract) {
  const result = validateAgentExecutionContract(contract);
  if (!result.valid) {
    throw validationError("Agent execution contract failed closed.", result.errors);
  }
  return result.contract;
}

export function buildMinimalValidContract(overrides = {}) {
  return {
    agentId: "lead-intelligence",
    version: 1,
    projectId: "00000000-0000-4000-8000-000000000001",
    organizationId: null,
    department: "sales",
    hierarchy: "L5",
    objective: "Qualify inbound lead",
    task: { id: "task-1", title: "Score lead" },
    structuredInputs: {},
    expectedOutputs: {},
    dependencies: [],
    capabilityRequirements: ["score_lead"],
    evidenceRequirements: ["structured_output"],
    memoryRetrievalScope: "project",
    memoryWritePolicy: "candidate_only",
    learningCandidatePolicy: "propose_only",
    riskClass: "R2",
    protectedActions: [],
    timeoutMs: 30000,
    retryPolicy: { maxAttempts: 3, backoff: "exponential" },
    idempotencyKey: "idem-1",
    correlationId: "corr-1",
    traceId: "trace-1",
    executionMode: "deterministic",
    providerMode: "optional",
    costTokenLimits: { maxTokens: 4000 },
    completionStatus: "pending",
    failureReason: null,
    ...overrides,
  };
}
