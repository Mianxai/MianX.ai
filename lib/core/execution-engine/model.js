// Durable execution domain record builders.

import { clip } from "../validate";
import { EXECUTION_LEVELS, PRIORITIES, RISK_LEVELS } from "./states";

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function baseRecord(partial = {}) {
  const now = new Date().toISOString();
  const level = partial.level;
  if (!EXECUTION_LEVELS.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }
  const priority = PRIORITIES.includes(partial.priority) ? partial.priority : "P2";
  const risk = RISK_LEVELS.includes(partial.risk_level) ? partial.risk_level : "R2";
  return {
    id: partial.id || uid(level),
    level,
    parent_id: partial.parent_id || null,
    company_id: partial.company_id || null,
    project_id: partial.project_id || null,
    objective_id: partial.objective_id || null,
    program_id: partial.program_id || null,
    blueprint_id: partial.blueprint_id || null,
    status: partial.status || "draft",
    priority,
    risk_level: risk,
    assigned_agent: partial.assigned_agent || null,
    dependency_ids: Array.isArray(partial.dependency_ids)
      ? partial.dependency_ids.slice(0, 40)
      : [],
    title: clip(partial.title || "", 240),
    department: partial.department || null,
    wave: partial.wave ?? null,
    attempt: Number.isFinite(Number(partial.attempt)) ? Number(partial.attempt) : 0,
    max_attempts: Number.isFinite(Number(partial.max_attempts))
      ? Number(partial.max_attempts)
      : 3,
    created_at: partial.created_at || now,
    updated_at: partial.updated_at || now,
    audit_metadata: partial.audit_metadata || {},
    ...partial.extra,
  };
}
