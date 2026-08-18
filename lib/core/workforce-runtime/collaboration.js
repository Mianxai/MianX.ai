/**
 * Collaboration engine — shared memory/context/outputs, conflict detection, merge.
 */

import { nowIso, uid } from "./schemas.js";
import { getAgentDefinition, isAgentExecutable } from "../agents.js";
import {
  saveCollaboration,
  getCollaboration,
  listCollaborations,
  recordAudit,
} from "./store.js";

export function startCollaboration({
  participants = [],
  project_id = null,
  objective = "",
  shared_context = {},
  simulation = false,
} = {}) {
  const slugs = [...new Set(participants)];
  for (const s of slugs) {
    const def = getAgentDefinition(s);
    if (!def || !isAgentExecutable(def)) {
      throw new Error(`Collaboration participant must be executable: ${s}`);
    }
  }
  if (slugs.length < 2) {
    throw new Error("Collaboration requires at least two executable agents");
  }
  const collab = {
    id: uid("collab"),
    project_id,
    participant_slugs: slugs,
    objective,
    shared_context: { ...shared_context },
    shared_memory: [],
    shared_outputs: [],
    conflicts: [],
    merge_decisions: [],
    status: "active",
    simulation: Boolean(simulation),
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  saveCollaboration(collab);
  recordAudit({
    action: "workforce.collaboration.start",
    collaboration_id: collab.id,
    participants: slugs,
    project_id,
  });
  return collab;
}

export function shareMemory(collaborationId, entry) {
  const c = getCollaboration(collaborationId);
  if (!c) throw new Error("Collaboration not found");
  c.shared_memory.push({
    id: uid("smem"),
    ...entry,
    at: nowIso(),
  });
  c.updated_at = nowIso();
  saveCollaboration(c);
  return c;
}

export function shareOutput(collaborationId, output) {
  const c = getCollaboration(collaborationId);
  if (!c) throw new Error("Collaboration not found");
  c.shared_outputs.push({
    id: uid("sout"),
    ...output,
    at: nowIso(),
  });
  // Conflict: two outputs with same key and different values
  const key = output?.key;
  if (key) {
    const rivals = c.shared_outputs.filter((o) => o.key === key);
    if (rivals.length > 1) {
      const values = [...new Set(rivals.map((r) => JSON.stringify(r.value)))];
      if (values.length > 1) {
        c.conflicts.push({
          id: uid("cf"),
          key,
          outputs: rivals.map((r) => r.id),
          detected_at: nowIso(),
          resolved: false,
        });
      }
    }
  }
  c.updated_at = nowIso();
  saveCollaboration(c);
  return c;
}

/**
 * Merge decision — does NOT auto-approve Founder gates.
 */
export function mergeDecision(collaborationId, { key, chosen_output_id, actor = "system", note = "" } = {}) {
  const c = getCollaboration(collaborationId);
  if (!c) throw new Error("Collaboration not found");
  const decision = {
    id: uid("merge"),
    key,
    chosen_output_id,
    actor,
    note,
    founder_approval_required: true,
    auto_approved: false,
    at: nowIso(),
  };
  c.merge_decisions.push(decision);
  for (const cf of c.conflicts) {
    if (cf.key === key) {
      cf.resolved = true;
      cf.resolution = decision.id;
    }
  }
  c.updated_at = nowIso();
  saveCollaboration(c);
  recordAudit({
    action: "workforce.collaboration.merge",
    collaboration_id: collaborationId,
    decision,
  });
  return decision;
}

export { listCollaborations, getCollaboration };
