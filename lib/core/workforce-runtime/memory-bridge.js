/**
 * Memory activation — completed tasks write experience (candidates / in-process).
 */

import { nowIso, uid } from "./schemas.js";
import { pushMemoryWrite, listMemoryWrites, recordAudit } from "./store.js";

export function writeTaskExperience({
  agent_slug,
  task_id,
  project_id = null,
  experience = {},
  simulation = false,
  mistakes = [],
  lessons = [],
  recommendations = [],
} = {}) {
  const writes = [
    {
      id: uid("wmem"),
      type: "experience",
      agent_slug,
      task_id,
      project_id,
      payload: { experience, simulation: Boolean(simulation) },
      created_at: nowIso(),
    },
    {
      id: uid("wmem"),
      type: "decision",
      agent_slug,
      task_id,
      project_id,
      payload: { decision: experience?.mode || experience?.summary || "recorded" },
      created_at: nowIso(),
    },
    {
      id: uid("wmem"),
      type: "evidence",
      agent_slug,
      task_id,
      project_id,
      payload: { evidence: experience },
      created_at: nowIso(),
    },
    {
      id: uid("wmem"),
      type: "mistakes",
      agent_slug,
      task_id,
      project_id,
      payload: { mistakes },
      created_at: nowIso(),
    },
    {
      id: uid("wmem"),
      type: "lessons",
      agent_slug,
      task_id,
      project_id,
      payload: { lessons },
      created_at: nowIso(),
    },
    {
      id: uid("wmem"),
      type: "future_recommendations",
      agent_slug,
      task_id,
      project_id,
      payload: { recommendations },
      created_at: nowIso(),
    },
  ];
  for (const w of writes) pushMemoryWrite(w);
  recordAudit({
    action: "workforce.memory.write",
    agent_slug,
    task_id,
    project_id,
    count: writes.length,
  });
  return writes;
}

export { listMemoryWrites };
