/**
 * Memory + learning operational lifecycle rules (Phase I).
 */

import { forbidden, validationError } from "../errors";

export const MEMORY_STATES = Object.freeze([
  "candidate",
  "validated",
  "active",
  "superseded",
  "rejected",
  "archived",
]);

export const LEARNING_STATES = Object.freeze([
  "proposed",
  "reviewed",
  "approved",
  "promoted",
  "rejected",
]);

export function assertSimulationNotTrustedMemory({ sourceMode, targetStatus } = {}) {
  if (
    (sourceMode === "simulation" || sourceMode === "deterministic") &&
    targetStatus === "active"
  ) {
    throw forbidden(
      "Simulation results never become trusted (active) memory automatically."
    );
  }
  return true;
}

export function assertNoCrossProjectMemory({ memoryProjectId, requestProjectId } = {}) {
  if (!memoryProjectId || !requestProjectId) {
    throw validationError("Memory retrieval requires project scope.", {
      project_id: "required",
    });
  }
  if (memoryProjectId !== requestProjectId) {
    throw forbidden("Cross-project memory is denied by default.");
  }
  return true;
}

export function assertNoAutoPromptRewrite({ action } = {}) {
  if (action === "rewrite_system_prompt" || action === "auto_promote_prompt") {
    throw forbidden("Learning never rewrites system prompts automatically.");
  }
  return true;
}

export function assertSafeCapabilityPromotion({
  fromCapabilities = [],
  toCapabilities = [],
  protectedCapabilities = ["send_email", "approve_production_action", "production_deployment"],
} = {}) {
  const from = new Set(fromCapabilities);
  for (const cap of toCapabilities) {
    if (protectedCapabilities.includes(cap) && !from.has(cap)) {
      throw forbidden(`Unsafe capability escalation rejected: ${cap}`);
    }
  }
  return true;
}

export function assertLearningPromotionAuthorized({ actor = null, approved = false } = {}) {
  if (!approved || actor !== "founder") {
    throw forbidden("Founder or authorized reviewer must approve learning promotion.");
  }
  return true;
}

/**
 * Deterministic path: task output → memory candidate → reviewed → learning proposed.
 */
export function buildMemoryLearningPipelineFromTask({
  taskId,
  projectId,
  output,
  sourceMode = "deterministic",
} = {}) {
  const memoryCandidate = {
    status: "candidate",
    taskId,
    projectId,
    sourceMode,
    confidence: 0.5,
    source: "task_output",
    content: output,
  };
  const learningProposal = {
    status: "proposed",
    taskId,
    projectId,
    sourceMemoryStatus: "candidate",
    autoPromoted: false,
  };
  return { memoryCandidate, learningProposal };
}
