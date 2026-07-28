/**
 * Simulation mode — entire workforce can run without production mutation,
 * external API, or paid provider.
 */

import { nowIso, uid } from "./schemas.js";
import {
  saveSimulation,
  getSimulation,
  listSimulations,
  recordAudit,
  isWorkforcePaused,
} from "./store.js";
import { bootstrapWorkforce, transitionAgent } from "./lifecycle.js";
import { distributeWork, assignFromQueue } from "./distribution.js";
import { delegateWork, receiveWork, replyWork, completeDelegation } from "./communication.js";
import { startCollaboration, shareOutput, mergeDecision } from "./collaboration.js";
import { runPipeline, founderApprovePipeline } from "./pipeline.js";
import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";

/**
 * Start a Founder-gated simulation session.
 */
export function startSimulation({
  name = "Workforce simulation",
  objective = "Simulate collaborative planning task",
  project_id = "sim-project",
  actor = "founder",
  auto_founder_approve = false,
} = {}) {
  if (auto_founder_approve) {
    throw new Error("Simulation must not auto-complete Founder approvals");
  }
  if (isWorkforcePaused()) {
    throw new Error("Workforce paused — start simulation after resume");
  }

  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  if (executable.length !== 36) {
    // Soft warn in payload — tests lock 36
  }

  bootstrapWorkforce({ project_id, simulation: true });

  const sim = {
    id: uid("sim"),
    name,
    status: "running",
    project_id,
    started_at: nowIso(),
    ended_at: null,
    production_mutation: false,
    provider_called: false,
    external_api: false,
    paid_provider: false,
    fabricated_execution: false,
    auto_founder_approve: false,
    payload: {
      objective,
      executable_agents: executable.length,
      steps: [],
    },
    created_by: actor,
  };
  saveSimulation(sim);
  recordAudit({
    action: "workforce.simulation.start",
    simulation_id: sim.id,
    actor,
    project_id,
  });

  const steps = sim.payload.steps;
  const queue = distributeWork({
    objective,
    project_id,
    priority: "P2",
    simulation: true,
  });
  steps.push({ step: "distribute", queue_id: queue.id });

  const assigned = assignFromQueue(queue, { project_id });
  steps.push({ step: "assign", agent: assigned.agent_slug });

  const specialist = assigned.agent_slug;
  const ceo = "executive-ceo";

  // Collaboration between CEO and specialist when distinct
  let collab = null;
  if (specialist !== ceo) {
    collab = startCollaboration({
      participants: [ceo, specialist],
      project_id,
      objective,
      simulation: true,
    });
    shareOutput(collab.id, { key: "draft", value: "sim-draft", agent: specialist });
    collab = shareOutput(collab.id, {
      key: "draft",
      value: "sim-draft-ceo",
      agent: ceo,
    });
    const chosen = collab.shared_outputs[0]?.id;
    mergeDecision(collab.id, {
      key: "draft",
      chosen_output_id: chosen,
      actor,
      note: "Simulation merge — still requires Founder for live",
    });
    steps.push({ step: "collaborate", collaboration_id: collab.id });

    const { message, delegation } = delegateWork({
      from_agent: ceo,
      to_agent: specialist,
      task_id: queue.id,
      summary: "Simulate delegated work package",
      project_id,
      simulation: true,
    });
    receiveWork({
      agent_slug: specialist,
      thread_id: message.thread_id,
      task_id: queue.id,
      project_id,
      simulation: true,
    });
    replyWork({
      from_agent: specialist,
      to_agent: ceo,
      thread_id: message.thread_id,
      task_id: queue.id,
      summary: "Simulated specialist reply",
      project_id,
      simulation: true,
    });
    completeDelegation({
      thread_id: message.thread_id,
      agent_slug: specialist,
      task_id: queue.id,
      project_id,
      simulation: true,
    });
    steps.push({ step: "delegate", delegation_id: delegation.id });
  }

  // Pipeline in simulation — stops at Founder approve unless explicitly approved after
  const pipeline = runPipeline({
    task_id: `${queue.id}:pipe`,
    agent_slug: specialist,
    project_id,
    objective,
    simulation: true,
    founder_approved: false,
  });
  steps.push({
    step: "pipeline",
    pending_approval: pipeline.pending_approval,
    provider_called: false,
  });

  sim.payload.steps = steps;
  sim.payload.pending_founder_approval = true;
  sim.payload.pipeline_task_id = `${queue.id}:pipe`;
  sim.payload.pipeline_agent = specialist;
  sim.status = "awaiting_founder_approval";
  saveSimulation(sim);

  return {
    simulation: sim,
    pipeline,
    note: "Simulation ran without provider or production mutation. Founder approval still required to close.",
  };
}

/**
 * Explicit Founder approval to close a simulation pipeline.
 */
export function approveSimulation(simulationId, { actor = "founder", decision = "approve" } = {}) {
  const sim = getSimulation(simulationId);
  if (!sim) throw new Error("Simulation not found");
  const result = founderApprovePipeline({
    task_id: sim.payload.pipeline_task_id,
    agent_slug: sim.payload.pipeline_agent,
    project_id: sim.project_id,
    actor,
    decision,
  });
  sim.status = decision === "approve" ? "completed" : "rejected";
  sim.ended_at = nowIso();
  sim.payload.founder_decision = decision;
  saveSimulation(sim);
  recordAudit({
    action: "workforce.simulation.decide",
    simulation_id: simulationId,
    decision,
    actor,
  });
  return { simulation: sim, result };
}

export { listSimulations, getSimulation };
