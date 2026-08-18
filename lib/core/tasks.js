// Task validation and state transitions.

import {
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_TRANSITIONS,
  CORE_LIMITS,
} from "./constants";
import { clip, validateJsonInput, pickAllowed } from "./validate";
import { validationError, invalidTransition, badRequest } from "./errors";

export function canTransitionTask(from, to) {
  if (!TASK_STATUSES.includes(from) || !TASK_STATUSES.includes(to)) return false;
  return (TASK_TRANSITIONS[from] || []).includes(to);
}

export function assertTaskTransition(from, to) {
  if (!canTransitionTask(from, to)) {
    throw invalidTransition(
      `Cannot move task from "${from}" to "${to}".`,
      { from, to, allowed: TASK_TRANSITIONS[from] || [] }
    );
  }
  return to;
}

// Validates and normalizes a task-creation payload into a safe row. Never
// trusts arbitrary keys — only known fields survive.
export function validateTaskCreate(body) {
  const errors = {};
  const raw = body && typeof body === "object" ? body : {};

  const project_id = clip(raw.project_id, 64);
  if (!project_id) errors.project_id = "project_id is required.";

  const title = clip(raw.title, CORE_LIMITS.title);
  if (!title) errors.title = "Title is required.";

  const description = clip(raw.description, CORE_LIMITS.description);
  const acceptance_criteria = clip(
    raw.acceptance_criteria,
    CORE_LIMITS.acceptanceCriteria
  );
  const idempotency_key = clip(raw.idempotency_key, CORE_LIMITS.idempotencyKey) || null;

  let priority = clip(raw.priority, 20) || "normal";
  if (!TASK_PRIORITIES.includes(priority)) {
    errors.priority = `priority must be one of: ${TASK_PRIORITIES.join(", ")}`;
  }

  let input = {};
  try {
    input = validateJsonInput(raw.input, "input");
  } catch (err) {
    errors.input = err.details?.input || "Invalid input object.";
  }

  const requires_approval =
    typeof raw.requires_approval === "boolean" ? raw.requires_approval : false;

  if (Object.keys(errors).length > 0) {
    throw validationError("Please fix the highlighted fields.", errors);
  }

  return {
    project_id,
    title,
    description: description || null,
    acceptance_criteria: acceptance_criteria || null,
    priority,
    input,
    idempotency_key,
    requires_approval,
    status: "pending",
  };
}

const PATCH_ALLOWED = ["status", "priority", "description", "acceptance_criteria"];

// Builds a safe PATCH payload. Only allowlisted fields; status changes must be
// legal transitions relative to the current status.
export function buildTaskPatch(currentStatus, body) {
  const picked = pickAllowed(body, PATCH_ALLOWED);
  const patch = {};
  const errors = {};

  if ("status" in picked) {
    const next = picked.status;
    if (!TASK_STATUSES.includes(next)) {
      errors.status = `status must be one of: ${TASK_STATUSES.join(", ")}`;
    } else if (next !== currentStatus) {
      assertTaskTransition(currentStatus, next); // throws on illegal
      patch.status = next;
    }
  }
  if ("priority" in picked) {
    if (TASK_PRIORITIES.includes(picked.priority)) {
      patch.priority = picked.priority;
    } else {
      errors.priority = `priority must be one of: ${TASK_PRIORITIES.join(", ")}`;
    }
  }
  if ("description" in picked) {
    patch.description = clip(picked.description, CORE_LIMITS.description) || null;
  }
  if ("acceptance_criteria" in picked) {
    patch.acceptance_criteria =
      clip(picked.acceptance_criteria, CORE_LIMITS.acceptanceCriteria) || null;
  }

  if (Object.keys(errors).length > 0) {
    throw validationError("Invalid update.", errors);
  }
  if (Object.keys(patch).length === 0) {
    throw badRequest("No valid fields to update.");
  }
  return patch;
}
