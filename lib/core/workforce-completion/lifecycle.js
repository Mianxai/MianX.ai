/**
 * Project-scoped agent instance lifecycle (definitions ≠ live processes).
 */

import { forbidden, validationError } from "../errors";

export const INSTANCE_LIFECYCLE = Object.freeze([
  "proposed",
  "registered",
  "allocated",
  "idle",
  "assigned",
  "executing",
  "waiting",
  "blocked",
  "review",
  "completed",
  "failed",
  "paused",
  "released",
  "archived",
]);

export const INSTANCE_TRANSITIONS = Object.freeze({
  proposed: ["registered", "archived"],
  registered: ["allocated", "idle", "archived"],
  allocated: ["idle", "assigned", "released", "archived"],
  idle: ["assigned", "paused", "released", "archived"],
  assigned: ["executing", "waiting", "blocked", "idle", "paused", "failed"],
  executing: ["waiting", "blocked", "review", "completed", "failed", "paused"],
  waiting: ["assigned", "executing", "blocked", "idle", "paused"],
  blocked: ["waiting", "assigned", "failed", "paused", "released"],
  review: ["completed", "failed", "assigned", "idle"],
  completed: ["idle", "released", "archived"],
  failed: ["idle", "released", "archived", "assigned"],
  paused: ["idle", "assigned", "released", "archived"],
  released: ["archived", "proposed"],
  archived: [],
});

export function canTransitionInstance(from, to) {
  const allowed = INSTANCE_TRANSITIONS[from] || [];
  return allowed.includes(to);
}

export function assertInstanceTransition(from, to) {
  if (!canTransitionInstance(from, to)) {
    throw validationError(`Invalid instance lifecycle transition ${from} → ${to}.`, {
      from,
      to,
    });
  }
  return true;
}

export function assertProjectIsolation(instance, projectId) {
  if (!projectId) {
    throw validationError("projectId required for isolation check.", {
      project_id: "required",
    });
  }
  if (!instance?.project_id && !instance?.projectId) {
    throw validationError("Instance missing project scope.", {
      project_id: "required",
    });
  }
  const id = instance.project_id || instance.projectId;
  if (id !== projectId) {
    throw forbidden("Cross-project instance access denied.");
  }
  return true;
}

/** Busy only when durable execution state says so. */
export function isInstanceBusy(instance) {
  const s = instance?.status || instance?.lifecycle;
  return ["assigned", "executing", "waiting", "blocked", "review"].includes(s);
}
