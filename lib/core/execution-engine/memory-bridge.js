// Memory / learning bridge for execution outcomes.

import { proposeMemory, proposeLearning } from "../memory";

export async function proposeExecutionMemory({
  program,
  item,
  content,
  agent,
} = {}) {
  if (!content || !program?.project_id) return null;
  try {
    return await proposeMemory({
      organization_id: null,
      project_id: program.project_id,
      scope_type: "task",
      scope_id: item.id,
      memory_type: "fact",
      content: String(content).slice(0, 2000),
      created_by: agent || item.assigned_agent || "system",
      evidence: [{ program_id: program.id, item_id: item.id }],
      confidence: 0.55,
      structured: {
        company_id: program.company_id,
        objective_id: program.objective_id,
        retention_class: "standard",
      },
    });
  } catch {
    return null;
  }
}

export async function proposeExecutionLearning({ program, item, outcome } = {}) {
  if (!program?.project_id) return null;
  if (outcome !== "success" && outcome !== "failure_pattern") return null;
  try {
    if (outcome === "success" && (item.attempt || 1) <= 1) {
      // Only create learning when evidence of recovery or review pattern exists
      return null;
    }
    return await proposeLearning({
      project_id: program.project_id,
      problem:
        outcome === "failure_pattern"
          ? `Repeated failure on ${item.title}`
          : `Recovered after retry on ${item.title}`,
      proposed_lesson:
        outcome === "failure_pattern"
          ? "Escalate to dead-letter after bounded retries"
          : "Retry transient failures before escalating",
      agent_slug: item.assigned_agent,
      source_task_id: item.id,
      source_workflow: "execution-engine",
      confidence: 0.6,
      risk_class: "R2",
      observed_evidence: [{ item_id: item.id, attempt: item.attempt }],
    });
  } catch {
    return null;
  }
}
