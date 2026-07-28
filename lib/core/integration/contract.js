/**
 * Canonical Phase H integration contract helpers.
 */

import {
  ENGINE_VERSION,
  EXECUTION_MODES,
  INTEGRATION_STAGES,
  RUN_STATUSES,
  assertStageTransition,
  nowIso,
  uid,
} from "./schemas.js";
import {
  saveRun,
  getRun,
  pushStageEvent,
  pushCheckpoint,
  recordAudit,
} from "./store.js";

export function createIntegrationContract({
  organization_id = null,
  project_id,
  objective_id = null,
  execution_mode = "deterministic_simulation",
  correlation_id = null,
  trace_id = null,
  actor = "founder",
} = {}) {
  if (!project_id) throw new Error("project_id is required");
  if (!EXECUTION_MODES.includes(execution_mode)) {
    throw new Error(`Invalid execution_mode: ${execution_mode}`);
  }

  const id = uid("irun");
  const corr = correlation_id || uid("corr");
  const trace = trace_id || uid("trace");
  const now = nowIso();

  const run = {
    id,
    integration_run_id: id,
    organization_id,
    project_id,
    objective_id,
    template_selection_id: null,
    planning_plan_id: null,
    execution_preview_id: null,
    execution_run_id: null,
    approval_gate_id: null,
    simulation_id: null,
    current_stage: "objective_received",
    execution_mode,
    status: "active",
    started_at: now,
    updated_at: now,
    completed_at: null,
    failure_reason: null,
    retry_count: 0,
    recovery_count: 0,
    correlation_id: corr,
    trace_id: trace,
    engine_version: ENGINE_VERSION,
    fabricated_execution: false,
    provider_called: false,
    paid_provider: false,
    live_execution: false,
    lineage: {
      objective_id: null,
      template_selection_id: null,
      planning_plan_id: null,
      execution_preview_id: null,
      execution_run_id: null,
      approval_gate_id: null,
      simulation_id: null,
      task_ids: [],
      agent_slugs: [],
      evidence_ids: [],
      memory_ids: [],
      learning_ids: [],
    },
    objective: null,
    template_plan: null,
    planning_plan: null,
    validation: null,
    approval_package: null,
    allocation: null,
    delegation: null,
    collaboration: null,
    verification: null,
    evidence: null,
    memory: null,
    learning: null,
    proof_pack: null,
    protected_action_requests: [],
    provider_gate: null,
    clarifications: [],
    stage_history: [
      {
        stage: "objective_received",
        at: now,
        actor,
      },
    ],
    payload: {},
    created_by: actor,
  };

  saveRun(run);
  pushStageEvent({
    id: uid("sev"),
    integration_run_id: id,
    project_id,
    organization_id,
    from_stage: null,
    to_stage: "objective_received",
    actor,
    correlation_id: corr,
    trace_id: trace,
    at: now,
  });
  recordAudit({
    action: "integration.run.created",
    integration_run_id: id,
    project_id,
    organization_id,
    actor,
    correlation_id: corr,
    trace_id: trace,
    stage: "objective_received",
  });
  return run;
}

export function transitionRun(runId, nextStage, {
  actor = "system",
  status = null,
  patch = {},
  failure_reason = null,
} = {}) {
  const run = getRun(runId);
  if (!run) throw new Error(`Integration run not found: ${runId}`);
  if (run.status === "cancelled" && nextStage !== "cancelled") {
    throw new Error("Cancelled run cannot advance");
  }

  const from = run.current_stage;
  assertStageTransition(from, nextStage);

  const now = nowIso();
  run.current_stage = nextStage;
  run.updated_at = now;
  if (status && RUN_STATUSES.includes(status)) run.status = status;
  if (failure_reason) run.failure_reason = failure_reason;
  if (["completed", "rejected", "cancelled", "failed"].includes(nextStage)) {
    run.completed_at = now;
    if (!status) {
      run.status =
        nextStage === "completed"
          ? "completed"
          : nextStage === "rejected"
            ? "rejected"
            : nextStage === "cancelled"
              ? "cancelled"
              : "failed";
    }
  }

  Object.assign(run, patch);
  run.stage_history.push({ stage: nextStage, at: now, actor });

  pushStageEvent({
    id: uid("sev"),
    integration_run_id: run.id,
    project_id: run.project_id,
    organization_id: run.organization_id,
    from_stage: from,
    to_stage: nextStage,
    actor,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
    at: now,
  });

  pushCheckpoint({
    id: uid("cp"),
    integration_run_id: run.id,
    project_id: run.project_id,
    organization_id: run.organization_id,
    stage: nextStage,
    status: run.status,
    lineage: { ...run.lineage },
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
    at: now,
    payload: {
      retry_count: run.retry_count,
      recovery_count: run.recovery_count,
    },
  });

  recordAudit({
    action: "integration.stage.transition",
    integration_run_id: run.id,
    project_id: run.project_id,
    organization_id: run.organization_id,
    actor,
    from_stage: from,
    to_stage: nextStage,
    stage: nextStage,
    status: run.status,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
  });

  saveRun(run);
  return run;
}

export function linkLineage(runId, links = {}) {
  const run = getRun(runId);
  if (!run) throw new Error(`Integration run not found: ${runId}`);
  for (const [k, v] of Object.entries(links)) {
    if (v == null) continue;
    if (Array.isArray(run.lineage[k])) {
      const set = new Set([...(run.lineage[k] || []), ...(Array.isArray(v) ? v : [v])]);
      run.lineage[k] = [...set];
    } else {
      run.lineage[k] = v;
      if (k in run) run[k] = v;
    }
  }
  run.updated_at = nowIso();
  saveRun(run);
  return run;
}

export function assertContractIds(run) {
  const required = [
    "integration_run_id",
    "project_id",
    "current_stage",
    "execution_mode",
    "status",
    "correlation_id",
    "trace_id",
  ];
  for (const key of required) {
    if (!run?.[key] && run?.[key] !== 0) {
      throw new Error(`Integration contract missing ${key}`);
    }
  }
  if (!INTEGRATION_STAGES.includes(run.current_stage)) {
    throw new Error("current_stage not in INTEGRATION_STAGES");
  }
  return true;
}
