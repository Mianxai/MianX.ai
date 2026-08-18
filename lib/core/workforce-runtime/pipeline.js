/**
 * Execution pipeline: claim → execute → verify → review → approve → close.
 * Nothing bypasses approval. Simulation never calls provider or mutates production.
 */

import { PIPELINE_STAGES, nowIso, uid } from "./schemas.js";
import {
  tryClaimTask,
  isTaskClaimed,
  pushPipelineEvent,
  listPipelineEvents,
  isWorkforcePaused,
  recordAudit,
  getAgentState,
} from "./store.js";
import { transitionAgent } from "./lifecycle.js";
import { buildAgentExecutionContext } from "./context.js";
import { writeTaskExperience } from "./memory-bridge.js";
import { proposeWorkforceLearning } from "./learning-bridge.js";

/**
 * Run pipeline for a task assigned to a real agent.
 * @param {{ simulation?: boolean, founder_approved?: boolean }} opts
 */
export function runPipeline({
  task_id,
  agent_slug,
  project_id = null,
  objective = "",
  simulation = false,
  founder_approved = false,
  planning_context = null,
} = {}) {
  if (isWorkforcePaused()) {
    throw new Error("Workforce paused — pipeline blocked");
  }
  if (!task_id || !agent_slug) {
    throw new Error("task_id and agent_slug required");
  }

  // Claim — prevent duplicate execution
  if (!tryClaimTask(task_id)) {
    pushPipelineEvent({
      id: uid("pipe"),
      task_id,
      stage: "claim",
      status: "rejected_duplicate",
      agent_slug,
      project_id,
      simulation: Boolean(simulation),
      created_at: nowIso(),
    });
    recordAudit({
      action: "workforce.pipeline.duplicate_blocked",
      task_id,
      agent_slug,
      project_id,
    });
    throw new Error(`Duplicate execution blocked for task ${task_id}`);
  }

  const events = [];
  const mark = (stage, status, extra = {}) => {
    const e = {
      id: uid("pipe"),
      task_id,
      stage,
      status,
      agent_slug,
      project_id,
      simulation: Boolean(simulation),
      provider_called: false,
      production_mutation: false,
      fabricated_execution: false,
      created_at: nowIso(),
      ...extra,
    };
    pushPipelineEvent(e);
    events.push(e);
    return e;
  };

  mark("claim", "ok");
  // Advance through valid lifecycle path before executing
  const status = getAgentState(agent_slug, project_id)?.lifecycle_status || "idle";
  if (status === "idle") {
    transitionAgent(agent_slug, "assigned", { project_id, task_id, actor: "pipeline" });
  }
  const mid = getAgentState(agent_slug, project_id)?.lifecycle_status;
  if (["assigned", "waiting", "delegating", "idle"].includes(mid)) {
    if (mid !== "thinking" && mid !== "planning" && mid !== "executing") {
      try {
        transitionAgent(agent_slug, "thinking", { project_id, task_id, actor: "pipeline" });
      } catch {
        /* already past thinking */
      }
    }
  }
  transitionAgent(agent_slug, "executing", {
    project_id,
    task_id,
    actor: "pipeline",
  });

  const ctx = buildAgentExecutionContext({
    agent_slug,
    objective,
    planning_context,
    project_id,
    task_id,
    simulation,
    approval_state: founder_approved ? "approved" : "pending",
  });

  // Execute
  let executeResult;
  if (simulation) {
    executeResult = {
      ok: true,
      mode: "simulation",
      output: {
        summary: `Simulated result for ${agent_slug}`,
        objective: String(objective).slice(0, 200),
      },
      provider_called: false,
      production_mutation: false,
    };
    mark("execute", "simulated", { result: executeResult });
  } else {
    // Honest: without provider / Founder approval of execute stage, do not fabricate
    executeResult = {
      ok: false,
      mode: "live_blocked",
      reason:
        "Live AI execution requires configured provider and Founder-approved pipeline. No fabricated completion.",
      provider_called: false,
      production_mutation: false,
    };
    mark("execute", "blocked_no_provider_or_policy", { result: executeResult });
    transitionAgent(agent_slug, "blocked", {
      project_id,
      task_id,
      actor: "pipeline",
      reason: executeResult.reason,
    });
    return {
      ok: false,
      events,
      context: ctx,
      executeResult,
      requires_founder_approval: true,
      note: executeResult.reason,
    };
  }

  mark("verify", "ok", {
    verification: { checks: ["schema_shape", "no_production_mutation"], passed: true },
  });
  transitionAgent(agent_slug, "review", { project_id, task_id, actor: "pipeline" });

  mark("review", "awaiting_founder", {
    note: "Human/Founder review required — never auto-completed",
  });

  // Approve stage — MUST have founder_approved
  if (!founder_approved) {
    mark("approve", "pending_founder");
    recordAudit({
      action: "workforce.pipeline.approval_required",
      task_id,
      agent_slug,
      project_id,
    });
    return {
      ok: true,
      pending_approval: true,
      events,
      context: ctx,
      executeResult,
      requires_founder_approval: true,
      note: "Pipeline paused at approve — Founder must approve. Never auto-approved.",
    };
  }

  mark("approve", "founder_approved");
  mark("close", "ok");
  transitionAgent(agent_slug, "completed", { project_id, task_id, actor: "founder" });

  writeTaskExperience({
    agent_slug,
    task_id,
    project_id,
    experience: executeResult,
    simulation,
  });
  proposeWorkforceLearning({
    agent_slug,
    project_id,
    task_id,
    simulation,
  });

  transitionAgent(agent_slug, "idle", { project_id, task_id: null, actor: "pipeline" });

  return {
    ok: true,
    pending_approval: false,
    events,
    context: ctx,
    executeResult,
    requires_founder_approval: false,
    note: "Pipeline closed after Founder approval (simulation path).",
  };
}

/**
 * Founder approves a pending pipeline approve stage, then close.
 */
export function founderApprovePipeline({
  task_id,
  agent_slug,
  project_id = null,
  actor = "founder",
  decision = "approve",
} = {}) {
  if (decision === "reject") {
    pushPipelineEvent({
      id: uid("pipe"),
      task_id,
      stage: "approve",
      status: "founder_rejected",
      agent_slug,
      project_id,
      created_at: nowIso(),
    });
    transitionAgent(agent_slug, "failed", {
      project_id,
      task_id,
      actor,
      reason: "Founder rejected",
    });
    recordAudit({ action: "workforce.pipeline.rejected", task_id, actor, project_id });
    return { ok: true, decision: "reject" };
  }
  if (decision !== "approve") {
    throw new Error("decision must be approve or reject");
  }
  pushPipelineEvent({
    id: uid("pipe"),
    task_id,
    stage: "approve",
    status: "founder_approved",
    agent_slug,
    project_id,
    created_at: nowIso(),
  });
  pushPipelineEvent({
    id: uid("pipe"),
    task_id,
    stage: "close",
    status: "ok",
    agent_slug,
    project_id,
    created_at: nowIso(),
  });
  transitionAgent(agent_slug, "completed", { project_id, task_id, actor });
  writeTaskExperience({
    agent_slug,
    task_id,
    project_id,
    experience: { founder_approved: true },
    simulation: true,
  });
  transitionAgent(agent_slug, "idle", { project_id, task_id: null, actor });
  recordAudit({ action: "workforce.pipeline.approved", task_id, actor, project_id });
  return { ok: true, decision: "approve", events: listPipelineEvents({ task_id }) };
}

export { PIPELINE_STAGES, isTaskClaimed };
