/**
 * Agent execution context — structured inputs every agent receives.
 */

import { nowIso, uid } from "./schemas.js";
import { getAgentDefinition, isAgentExecutable } from "../agents.js";
import { getAgentState } from "./store.js";

/**
 * Build a complete execution context for a real executable agent.
 */
export function buildAgentExecutionContext({
  agent_slug,
  objective = "",
  planning_context = null,
  memory = [],
  learning = [],
  project_id = null,
  department = null,
  dependencies = [],
  execution_budget = { max_attempts: 3, timeout_ms: 30000 },
  previous_attempts = [],
  approval_state = "pending",
  risk_summary = [],
  template_references = [],
  simulation = false,
  task_id = null,
} = {}) {
  const def = getAgentDefinition(agent_slug);
  if (!def || !isAgentExecutable(def)) {
    throw new Error(`Cannot build context for non-executable agent: ${agent_slug}`);
  }
  const state = getAgentState(agent_slug, project_id);
  return {
    id: uid("ctx"),
    agent_slug,
    agent_name: def.name,
    department: department || def.department || null,
    objective,
    planning_context: planning_context || null,
    memory: Array.isArray(memory) ? memory.slice(0, 50) : [],
    learning: Array.isArray(learning) ? learning.slice(0, 20) : [],
    project_id,
    dependencies: Array.isArray(dependencies) ? dependencies : [],
    execution_budget,
    previous_attempts: Array.isArray(previous_attempts) ? previous_attempts : [],
    approval_state,
    risk_summary: Array.isArray(risk_summary) ? risk_summary : [],
    template_references: Array.isArray(template_references) ? template_references : [],
    task_id,
    lifecycle_status: state?.lifecycle_status || "idle",
    simulation: Boolean(simulation),
    provider_required: !simulation,
    provider_called: false,
    production_mutation: false,
    fabricated_execution: false,
    created_at: nowIso(),
    note: simulation
      ? "Simulation context — no provider calls, no production mutation."
      : "Live context — Founder approval still required for protected stages; provider must be configured for real AI work.",
  };
}
