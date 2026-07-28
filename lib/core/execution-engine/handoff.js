// Structured inter-agent handoff protocol.

import { clip } from "../validate";
import { validationError } from "../errors";

function uid() {
  return `handoff_${Math.random().toString(36).slice(2, 10)}`;
}

export function createHandoff(raw = {}) {
  if (!raw.producing_agent || !raw.task_id || !raw.summary) {
    throw validationError("Handoff requires producing_agent, task_id, and summary.");
  }
  return {
    id: uid(),
    producing_agent: clip(raw.producing_agent, 80),
    receiving_agent: raw.receiving_agent ? clip(raw.receiving_agent, 80) : null,
    receiving_department: raw.receiving_department
      ? clip(raw.receiving_department, 40)
      : null,
    task_id: raw.task_id,
    deliverable_type: clip(raw.deliverable_type || "artifact", 80),
    summary: clip(raw.summary, 2000),
    evidence_references: Array.isArray(raw.evidence_references)
      ? raw.evidence_references.slice(0, 20)
      : [],
    unresolved_issues: Array.isArray(raw.unresolved_issues)
      ? raw.unresolved_issues.slice(0, 20)
      : [],
    risks: Array.isArray(raw.risks) ? raw.risks.slice(0, 20) : [],
    acceptance_criteria: Array.isArray(raw.acceptance_criteria)
      ? raw.acceptance_criteria.slice(0, 20)
      : [],
    timestamp: new Date().toISOString(),
    validated: true,
  };
}
