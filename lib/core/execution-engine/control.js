// Pause / resume / cancel controls.

import { forbidden, validationError } from "../errors";
import {
  getProgram,
  saveProgram,
  listItems,
  saveItem,
  appendEvent,
  getItem,
} from "./store";
import { transitionState, canTransition } from "./state-machine";

function assertActor(actor) {
  if (!actor) throw forbidden("Authorised Founder/Admin actor required.");
}

export function pauseProgram(programId, { actor, scope = "program" } = {}) {
  assertActor(actor);
  const program = getProgram(programId);
  if (!program) throw validationError("Program not found.");
  if (program.status === "cancelled") throw forbidden("Cancelled program cannot pause.");

  let next = program;
  if (canTransition(program.status, "paused")) {
    next = transitionState(program, "paused", { reason: `pause_${scope}`, actor });
  }
  next = {
    ...next,
    paused_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  saveProgram(next);

  for (const item of listItems({ programId })) {
    if (["queued", "ready", "assigned", "blocked", "retry_wait"].includes(item.status)) {
      if (canTransition(item.status, "paused")) {
        saveItem(transitionState(item, "paused", { reason: "program_paused", actor }));
      }
    }
    // running protected path: mark cancel-requested style — do not silently interrupt
    if (item.status === "running") {
      saveItem({
        ...item,
        audit_metadata: {
          ...(item.audit_metadata || {}),
          pause_requested: true,
          note: "Running work finishes or fails safely; no silent interrupt of protected actions.",
        },
        updated_at: new Date().toISOString(),
      });
    }
  }

  appendEvent({
    program_id: programId,
    project_id: program.project_id,
    event_type: "program_paused",
    actor,
    payload: { scope },
  });
  return next;
}

export function resumeProgram(programId, { actor } = {}) {
  assertActor(actor);
  const program = getProgram(programId);
  if (!program) throw validationError("Program not found.");
  if (program.status !== "paused" && !program.paused_at) {
    throw forbidden("Program is not paused.");
  }

  let next = program;
  if (program.status === "paused" && canTransition("paused", "queued")) {
    next = transitionState(program, "queued", { reason: "resume", actor });
  }
  next = { ...next, paused_at: null, updated_at: new Date().toISOString() };
  saveProgram(next);

  // Resume paused items to queued — do not duplicate running/succeeded
  for (const item of listItems({ programId })) {
    if (item.status === "paused" && canTransition("paused", "queued")) {
      saveItem(transitionState(item, "queued", { reason: "resume", actor }));
    }
  }

  appendEvent({
    program_id: programId,
    project_id: program.project_id,
    event_type: "program_resumed",
    actor,
    payload: {},
  });
  return next;
}

export function cancelProgram(programId, { actor } = {}) {
  assertActor(actor);
  const program = getProgram(programId);
  if (!program) throw validationError("Program not found.");

  let next = program;
  if (canTransition(program.status, "cancelled")) {
    next = transitionState(program, "cancelled", { reason: "founder_cancel", actor });
  } else {
    next = { ...program, status: "cancelled" };
  }
  next = {
    ...next,
    cancelled_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  saveProgram(next);

  for (const item of listItems({ programId })) {
    if (!["succeeded", "cancelled", "dead_lettered"].includes(item.status)) {
      if (canTransition(item.status, "cancelled")) {
        saveItem(transitionState(item, "cancelled", { reason: "program_cancelled", actor }));
      } else {
        saveItem({ ...item, status: "cancelled", updated_at: new Date().toISOString() });
      }
    }
  }

  appendEvent({
    program_id: programId,
    project_id: program.project_id,
    event_type: "program_cancelled",
    actor,
    payload: { history_preserved: true },
  });
  return next;
}

export function pauseItem(itemId, { actor } = {}) {
  assertActor(actor);
  const item = getItem(itemId);
  if (!item) throw validationError("Item not found.");
  if (item.status === "running") {
    return saveItem({
      ...item,
      audit_metadata: { ...(item.audit_metadata || {}), pause_requested: true },
    });
  }
  if (canTransition(item.status, "paused")) {
    return saveItem(transitionState(item, "paused", { reason: "item_pause", actor }));
  }
  throw forbidden(`Cannot pause from ${item.status}`);
}
