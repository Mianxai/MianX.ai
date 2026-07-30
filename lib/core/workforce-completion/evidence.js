/**
 * Canonical evidence / output contract + Founder Proof human summary.
 */

import { validationError } from "../errors";

export const EVIDENCE_REQUIRED_FIELDS = Object.freeze([
  "taskId",
  "agentInstance",
  "workflow",
  "stage",
  "inputHash",
  "output",
  "evidence",
  "validationResult",
  "qaReview",
  "timestamp",
  "correlationId",
  "projectScope",
  "simulationOrProviderMode",
  "protectedActionResult",
  "memoryCandidates",
  "learningCandidates",
]);

export function validateEvidenceRecord(record) {
  const errors = {};
  const r = record && typeof record === "object" ? record : {};
  for (const f of EVIDENCE_REQUIRED_FIELDS) {
    if (!(f in r)) errors[f] = "Required evidence field missing.";
  }
  if (!r.taskId) errors.taskId = errors.taskId || "taskId required";
  if (!r.projectScope?.projectId && !r.projectScope) {
    errors.projectScope = "projectScope required for isolation";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function buildCanonicalEvidenceRecord(partial = {}) {
  const record = {
    taskId: partial.taskId || null,
    agentInstance: partial.agentInstance || null,
    workflow: partial.workflow || null,
    stage: partial.stage || null,
    inputHash: partial.inputHash || null,
    output: partial.output ?? null,
    evidence: partial.evidence ?? [],
    validationResult: partial.validationResult ?? { valid: false },
    qaReview: partial.qaReview ?? null,
    timestamp: partial.timestamp || new Date().toISOString(),
    correlationId: partial.correlationId || null,
    projectScope: partial.projectScope || { projectId: null, organizationId: null },
    simulationOrProviderMode: partial.simulationOrProviderMode || "deterministic",
    protectedActionResult: partial.protectedActionResult ?? null,
    memoryCandidates: partial.memoryCandidates ?? [],
    learningCandidates: partial.learningCandidates ?? [],
  };
  const check = validateEvidenceRecord(record);
  if (!check.valid) {
    throw validationError("Evidence record incomplete.", check.errors);
  }
  return record;
}

/**
 * Short human summary first for Founder Proof Pack.
 */
export function buildFounderProofHumanSummary(run = {}) {
  const tasks = run.payload?.tasks || run.task_graph || [];
  const completed = tasks.filter((t) => t.status === "completed" || t.state === "completed");
  const failed = tasks.filter((t) => t.status === "failed" || t.state === "failed");
  const agents =
    run.allocation?.selected?.map((a) => a.slug || a) ||
    run.allocation?.agents?.map((a) => a.slug || a) ||
    [];
  return {
    objective: run.objective?.title || run.objective?.statement || run.objective || null,
    plan: run.planning_plan?.summary || run.planning_plan?.title || "See plan details",
    agentsUsed: agents,
    tasksCompleted: completed.length,
    failedTasks: failed.length,
    evidence: Array.isArray(run.evidence) ? run.evidence.length : run.evidence ? 1 : 0,
    protectedActions: run.approval_package?.protected_actions || [],
    providerCalls: run.provider_gate?.calls ?? 0,
    memory: Array.isArray(run.memory) ? run.memory.length : 0,
    learning: Array.isArray(run.learning) ? run.learning.length : 0,
    risks: run.planning_plan?.risks || [],
    founderDecision: run.final_decision || run.status || null,
    note:
      "Deterministic Level-1 summary. Raw JSON remains under Technical Details. " +
      "No fabricated live execution.",
  };
}
