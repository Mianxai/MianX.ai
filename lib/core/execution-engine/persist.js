// Durable snapshot helpers for execution programs (task.input JSONB).
// Used when Phase D tables are not yet applied — honest fallback, not fake AI.

import {
  getProgram,
  listItems,
  listDependencies,
  listEvents,
  listCheckpoints,
  listAllocations,
  saveProgram,
  saveItem,
  saveDependency,
  appendEvent,
  saveCheckpoint,
  saveAllocation,
  getItem,
} from "./store";

/**
 * Export a program graph for durable storage on a task row.
 */
export function exportProgramSnapshot(programId) {
  const program = getProgram(programId);
  if (!program) return null;
  return {
    version: 1,
    exported_at: new Date().toISOString(),
    program,
    items: listItems({ programId }),
    dependencies: listDependencies({ programId }),
    events: listEvents({ programId }),
    checkpoints: listCheckpoints({ programId }),
    allocations: listAllocations({ programId }),
  };
}

/**
 * Import a snapshot into the in-process store (idempotent by id).
 */
export function importProgramSnapshot(snapshot) {
  if (!snapshot?.program?.id) return null;
  const existing = getProgram(snapshot.program.id);
  if (existing) return existing;

  saveProgram(snapshot.program);
  for (const item of snapshot.items || []) {
    if (!getItem(item.id)) saveItem(item);
  }
  for (const d of snapshot.dependencies || []) {
    saveDependency(d);
  }
  for (const e of snapshot.events || []) {
    appendEvent(e);
  }
  for (const c of snapshot.checkpoints || []) {
    saveCheckpoint(c);
  }
  for (const a of snapshot.allocations || []) {
    saveAllocation(a);
  }
  return snapshot.program;
}

export function executionPersistenceNote() {
  return {
    durable_backend: "task_input_snapshot_fallback",
    phase_d_tables: "optional — apply migration for first-class tables",
    note: "Programs are snapshotted onto Company Builder tasks when available. Process Map is a hot cache.",
  };
}
