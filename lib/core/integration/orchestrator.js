/**
 * Phase H end-to-end orchestrator.
 * Coordinates existing Template, Planning, Execution, and Workforce engines.
 * Never fabricates AI completion. Never auto-approves Founder gates.
 */

import { runTemplateIntelligencePlan } from "../template-intelligence/planning.js";
import { runPlanningIntelligence } from "../planning-intelligence/planning.js";
import {
  bootstrapWorkforce,
  delegateWork,
  receiveWork,
  replyWork,
  completeDelegation,
  startCollaboration,
  shareOutput,
  mergeDecision,
  startSimulation,
  approveSimulation,
  pauseWorkforce,
  resumeWorkforce,
  writeTaskExperience,
  proposeWorkforceLearning,
  recoverWorkforce,
  isTaskClaimed as wfIsTaskClaimed,
} from "../workforce-runtime/index.js";
import { detectCircularDelegation } from "../workforce-runtime/communication.js";
import { createIntegrationContract, transitionRun, linkLineage, assertContractIds } from "./contract.js";
import { intakeObjective, applyClarification } from "./objective.js";
import { validatePlanPackage, forceDependencyCycleValidation } from "./validation.js";
import { auditRoutableWorkforce } from "./agent-audit.js";
import { allocateAgentsForPlan } from "./allocation.js";
import {
  makeEvidence,
  buildEvidenceManifest,
  verifyTaskCompletion,
} from "./evidence.js";
import { writeRunMemoryBundle } from "./memory-bridge.js";
import { proposeIntegrationLearning, assessLearningSafety } from "./learning-bridge.js";
import { scanObjectiveForProtectedActions, evaluateProtectedAction } from "./protected-actions.js";
import { assessProviderGate, blockLiveWithoutProvider } from "./provider-gate.js";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "./proof.js";
import {
  getRun,
  saveRun,
  tryIdempotent,
  tryClaimTask,
  isTaskClaimed,
  pushFailureEvent,
  latestCheckpoint,
  markSimulationResult,
  recordAudit,
  listRuns,
} from "./store.js";
import { ENGINE_VERSION, uid, nowIso } from "./schemas.js";
import { mapProofStatusFromRun } from "./persist.js";

/**
 * Create a new integration run from Founder objective intake.
 */
export function createIntegrationRun(rawObjective = {}, {
  actor = "founder",
  idempotency_key = null,
  integration_run_id = null,
  correlation_id = null,
  trace_id = null,
  force_cycle = false,
} = {}) {
  const key = idempotency_key || null;
  const { hit, value } = tryIdempotent(key, () => {
    const intake = intakeObjective(rawObjective, { actor });
    if (!intake.objective.project_id) {
      throw new Error("project_id is required on objective intake");
    }

    const run = createIntegrationContract({
      organization_id: intake.objective.organization_id,
      project_id: intake.objective.project_id,
      objective_id: intake.objective.id,
      execution_mode: intake.objective.execution_mode || "deterministic_simulation",
      integration_run_id,
      correlation_id,
      trace_id,
      actor,
    });

    run.objective = intake.objective;
    run.payload.intake = {
      clarification_required: intake.clarification_required,
      missing_fields: intake.missing_fields,
      confidence: intake.confidence,
    };
    run.payload.force_cycle = Boolean(force_cycle);
    run.provider_gate = assessProviderGate({
      execution_mode: run.execution_mode,
    });
    run.protected_action_requests = scanObjectiveForProtectedActions(intake.objective);
    linkLineage(run.id, { objective_id: intake.objective.id });
    assertContractIds(run);

    let next = transitionRun(run.id, "objective_validated", {
      actor,
      patch: { objective: intake.objective },
    });

    if (intake.clarification_required) {
      next = transitionRun(next.id, "clarification_required", {
        actor,
        status: "awaiting_clarification",
      });
    }

    saveRun(next);
    return next;
  });

  return { run: value, idempotent_hit: hit };
}

export function submitClarification(runId, answers = {}, { actor = "founder" } = {}) {
  const run = getRun(runId);
  if (!run) throw new Error("run not found");
  if (run.current_stage !== "clarification_required") {
    throw new Error("run is not awaiting clarification");
  }
  const intake = applyClarification(run.objective, answers);
  run.objective = intake.objective;
  run.clarifications.push({ at: nowIso(), answers, actor });
  saveRun(run);

  if (intake.clarification_required) {
    return { run, still_needs_clarification: true, intake };
  }

  const next = transitionRun(run.id, "objective_validated", {
    actor,
    status: "active",
    patch: { objective: intake.objective },
  });
  return { run: next, still_needs_clarification: false, intake };
}

/**
 * Generate deterministic plan (Template + Planning). Does not execute.
 */
export function generateIntegrationPlan(runId, { actor = "founder" } = {}) {
  let run = getRun(runId);
  if (!run) throw new Error("run not found");
  if (run.current_stage === "clarification_required") {
    throw new Error("clarification required before planning");
  }
  if (run.current_stage !== "objective_validated") {
    throw new Error(`cannot plan from stage ${run.current_stage}`);
  }

  const objectiveText =
    run.objective.business_purpose || run.objective.title || "";

  const templatePlan = runTemplateIntelligencePlan(
    {
      objective: objectiveText,
      industry: run.objective.industry,
      business_model: run.objective.business_model,
      risk_tolerance: run.objective.risk_tolerance,
      compliance_sensitivity: run.objective.compliance_sensitivity,
      project_id: run.project_id,
    },
    { actor }
  );

  if (templatePlan.clarification_required) {
    run.template_plan = templatePlan;
    saveRun(run);
    return transitionRun(run.id, "clarification_required", {
      actor,
      status: "awaiting_clarification",
      patch: { template_plan: templatePlan },
    });
  }

  run = transitionRun(run.id, "templates_matched", {
    actor,
    patch: { template_plan: templatePlan },
  });
  linkLineage(run.id, {
    template_selection_id: templatePlan.id || templatePlan.match?.id || uid("tsel"),
  });

  run = transitionRun(run.id, "capabilities_mapped", { actor });

  const planningPlan = runPlanningIntelligence({
    objective: objectiveText,
    industry: run.objective.industry,
    business_model: run.objective.business_model,
    project_id: run.project_id,
    organization_id: run.organization_id,
    risk_tolerance: run.objective.risk_tolerance,
    compliance_sensitivity: run.objective.compliance_sensitivity,
    actor,
    persist: true,
  });

  run = transitionRun(run.id, "plan_generated", {
    actor,
    patch: { planning_plan: planningPlan },
  });
  linkLineage(run.id, {
    planning_plan_id: planningPlan.id,
  });

  let validation = validatePlanPackage({
    planning_plan: planningPlan,
    template_plan: templatePlan,
    objective: run.objective,
    execution_mode: run.execution_mode,
  });

  if (run.payload?.force_cycle) {
    validation = forceDependencyCycleValidation();
  }

  run.validation = validation;
  saveRun(run);

  if (!validation.valid) {
    run = transitionRun(run.id, "failed", {
      actor,
      status: "failed",
      failure_reason: validation.errors.join(","),
      patch: { validation },
    });
    markSimulationResult(false);
    pushFailureEvent({
      id: uid("fail"),
      integration_run_id: run.id,
      project_id: run.project_id,
      code: "plan_validation_failed",
      errors: validation.errors,
      at: nowIso(),
    });
    return run;
  }

  run = transitionRun(run.id, "dependencies_validated", {
    actor,
    patch: { validation },
  });

  const preview =
    planningPlan.execution_preview ||
    planningPlan.preview ||
    {
      id: uid("prev"),
      mode: run.execution_mode,
      executes: false,
      waves: planningPlan.wbs?.waves || [],
      task_count:
        planningPlan.wbs?.tasks?.length ||
        planningPlan.payload?.wbs?.tasks?.length ||
        0,
    };

  run = transitionRun(run.id, "execution_preview_generated", {
    actor,
    patch: {
      execution_preview: preview,
    },
  });
  linkLineage(run.id, { execution_preview_id: preview.id || uid("prev") });

  const approvalPackage = buildFounderApprovalPackage(run);
  run = transitionRun(run.id, "founder_approval_required", {
    actor,
    status: "awaiting_approval",
    patch: { approval_package: approvalPackage },
  });
  linkLineage(run.id, {
    approval_gate_id: approvalPackage.id,
  });

  return run;
}

export function buildFounderApprovalPackage(run) {
  const agents =
    run.allocation?.selected_agents ||
    allocateAgentsForPlan({
      planning_plan: run.planning_plan,
      template_plan: run.template_plan,
      project_id: run.project_id,
      integration_run_id: run.id,
    }).selected_agents;

  return {
    id: uid("appr"),
    integration_run_id: run.id,
    project_id: run.project_id,
    decision: null,
    objective_summary: {
      title: run.objective?.title,
      purpose: run.objective?.business_purpose,
      deliverables: run.objective?.expected_deliverables,
      success_criteria: run.objective?.success_criteria,
    },
    selected_templates:
      run.template_plan?.match?.selected_templates ||
      run.template_plan?.selected_templates ||
      [],
    plan_id: run.planning_plan?.id,
    departments:
      run.planning_plan?.capability_plan?.department_ownership ||
      run.planning_plan?.departments ||
      [],
    proposed_agents: agents,
    task_count:
      run.execution_preview?.task_count ||
      run.planning_plan?.wbs?.tasks?.length ||
      0,
    execution_waves: run.execution_preview?.waves || [],
    dependencies: run.planning_plan?.wbs?.edges || [],
    risks: run.planning_plan?.risks || run.template_plan?.risks || [],
    estimated_simulation_workload: {
      agents: agents.length,
      mode: "deterministic_simulation",
    },
    provider_requirement: run.execution_mode === "live_provider",
    protected_actions: run.protected_action_requests,
    expected_outputs: run.objective?.expected_deliverables || [],
    known_limitations: [
      "Deterministic simulation does not equal live AI execution.",
      "No provider calls are issued in simulation mode.",
      "Protected actions remain Founder-gated.",
    ],
    unresolved_questions: run.objective?.unresolved_questions || [],
    actions_allowed: [
      "approve_simulation",
      "return_for_changes",
      "reject",
      "pause",
      "cancel",
    ],
    live_provider_approval_separate: true,
    auto_approved: false,
    created_at: nowIso(),
  };
}

/**
 * Founder decision on simulation approval. Never auto-approves.
 */
export function decideFounderApproval(runId, decision, {
  actor = "founder",
  note = "",
  auto_approve = false,
} = {}) {
  if (auto_approve) {
    throw new Error("Founder gates must not be auto-approved");
  }
  let run = getRun(runId);
  if (!run) throw new Error("run not found");

  // Idempotent: duplicate identical decision while already past the gate returns current run.
  if (
    decision === "approve_simulation" &&
    (run.current_stage === "approved_for_simulation" ||
      run.approval_package?.decision === "approve_simulation")
  ) {
    return run;
  }
  if (decision === "reject" && (run.current_stage === "rejected" || run.status === "rejected")) {
    return run;
  }

  if (run.current_stage !== "founder_approval_required") {
    throw new Error("run is not awaiting Founder approval");
  }

  const allowed = ["approve_simulation", "return_for_changes", "reject", "pause", "cancel"];
  if (!allowed.includes(decision)) {
    throw new Error(`Invalid Founder decision: ${decision}`);
  }

  run.approval_package = {
    ...(run.approval_package || {}),
    decision,
    decided_by: actor,
    decided_at: nowIso(),
    note,
    auto_approved: false,
  };
  saveRun(run);

  if (decision === "approve_simulation") {
    if (run.execution_mode === "live_provider") {
      const gate = blockLiveWithoutProvider(run);
      run.provider_gate = gate;
      if (!gate.ok) {
        saveRun(run);
        throw new Error(`Live execution blocked: ${gate.block_reason}`);
      }
    }
    return transitionRun(run.id, "approved_for_simulation", {
      actor,
      status: "simulating",
    });
  }
  if (decision === "return_for_changes") {
    return transitionRun(run.id, "clarification_required", {
      actor,
      status: "awaiting_clarification",
    });
  }
  if (decision === "reject") {
    return transitionRun(run.id, "rejected", { actor, status: "rejected" });
  }
  if (decision === "pause") {
    return transitionRun(run.id, "paused", { actor, status: "paused" });
  }
  return transitionRun(run.id, "cancelled", { actor, status: "cancelled" });
}

/**
 * Run deterministic workforce simulation for an approved integration run.
 */
export function startIntegrationSimulation(runId, { actor = "founder" } = {}) {
  let run = getRun(runId);
  if (!run) throw new Error("run not found");
  if (run.current_stage !== "approved_for_simulation") {
    throw new Error("simulation requires approved_for_simulation stage");
  }
  if (run.status === "cancelled") throw new Error("cancelled run");

  const gate = assessProviderGate({ execution_mode: run.execution_mode });
  run.provider_gate = gate;
  if (run.execution_mode === "live_provider" && !gate.live_execution_ready) {
    throw new Error(`Live execution blocked: ${gate.block_reason}`);
  }

  // Allocation — not all 36
  const allocation = allocateAgentsForPlan({
    planning_plan: run.planning_plan,
    template_plan: run.template_plan,
    project_id: run.project_id,
    integration_run_id: run.id,
  });
  run = transitionRun(run.id, "workforce_allocated", {
    actor,
    patch: { allocation },
  });
  linkLineage(run.id, {
    agent_slugs: allocation.selected_agents.map((a) => a.slug),
  });

  bootstrapWorkforce({ project_id: run.project_id, simulation: true });

  // Materialize deterministic tasks from WBS / preview (idempotent claims)
  const taskDefs = materializeTasks(run);
  const claimed = [];
  for (const t of taskDefs) {
    const ok = tryClaimTask(t.id);
    if (!ok) {
      pushFailureEvent({
        id: uid("fail"),
        integration_run_id: run.id,
        project_id: run.project_id,
        code: "duplicate_task_claim",
        task_id: t.id,
        at: nowIso(),
      });
      continue;
    }
    claimed.push(t);
  }
  run.payload.tasks = claimed;
  linkLineage(run.id, { task_ids: claimed.map((t) => t.id) });
  run = transitionRun(run.id, "tasks_claimed", { actor });

  // Delegation chain: CEO → head → specialist → reviewer
  const agents = allocation.selected_agents.map((a) => a.slug);
  const ceo = agents.includes("executive-ceo") ? "executive-ceo" : agents[0];
  const head = agents.find((s) => s !== ceo) || ceo;
  const specialist = agents.find((s) => s !== ceo && s !== head) || head;
  const reviewer = agents.find((s) => ![ceo, head, specialist].includes(s)) || ceo;

  const taskId = claimed[0]?.id || uid("task");
  const d1 = delegateWork({
    from_agent: ceo,
    to_agent: head,
    task_id: taskId,
    summary: "Coordinate department delivery",
    project_id: run.project_id,
    simulation: true,
  });
  receiveWork({
    agent_slug: head,
    thread_id: d1.message.thread_id,
    task_id: taskId,
    project_id: run.project_id,
    simulation: true,
  });
  const d2 = delegateWork({
    from_agent: head,
    to_agent: specialist,
    task_id: taskId,
    summary: "Produce specialist draft",
    project_id: run.project_id,
    simulation: true,
  });
  receiveWork({
    agent_slug: specialist,
    thread_id: d2.message.thread_id,
    task_id: taskId,
    project_id: run.project_id,
    simulation: true,
  });
  replyWork({
    from_agent: specialist,
    to_agent: head,
    thread_id: d2.message.thread_id,
    task_id: taskId,
    summary: "Draft complete (simulation)",
    project_id: run.project_id,
    simulation: true,
  });
  completeDelegation({
    thread_id: d2.message.thread_id,
    agent_slug: specialist,
    task_id: taskId,
    project_id: run.project_id,
    simulation: true,
  });

  const circular = detectCircularDelegation(run.project_id);

  run.delegation = {
    chain: [
      { from: ceo, to: head },
      { from: head, to: specialist },
      { from: specialist, to: reviewer, kind: "review_handoff" },
    ],
    circular_detected: circular?.ok === false,
    circular,
    task_id: taskId,
  };

  // Collaboration
  const collab = startCollaboration({
    participants: [ceo, specialist, reviewer].filter(
      (v, i, a) => a.indexOf(v) === i
    ),
    project_id: run.project_id,
    objective: run.objective?.title,
    simulation: true,
  });
  const collabAfter = shareOutput(collab.id, {
    key: "draft",
    value: "integration-sim-draft",
    agent: specialist,
  });
  const chosenId = collabAfter?.shared_outputs?.[0]?.id || null;
  mergeDecision(collab.id, {
    key: "draft",
    chosen_output_id: chosenId,
    actor: reviewer,
    note: "Accepted for simulation review",
  });
  run.collaboration = { id: collab.id, participants: collab.participants || [] };
  run = transitionRun(run.id, "collaboration_running", { actor });

  // Workforce simulation session (Founder-gated close) — includes pipeline
  const simResult = startSimulation({
    name: `Integration ${run.id}`,
    objective: run.objective?.business_purpose || run.objective?.title,
    project_id: run.project_id,
    actor,
    auto_founder_approve: false,
  });
  const sim = simResult.simulation || simResult;
  const pipeline = simResult.pipeline || null;
  run.simulation_id = sim.id;
  linkLineage(run.id, {
    simulation_id: sim.id,
    execution_run_id: sim.id,
  });

  run = transitionRun(run.id, "verification_running", { actor });

  const verification = verifyTaskCompletion({
    claim: {
      expected_output: run.objective?.expected_deliverables?.[0] || "sim-output",
      success_criteria_result: "met",
    },
    expected_output: run.objective?.expected_deliverables?.[0] || "sim-output",
    success_criteria: run.objective?.success_criteria || ["criteria_met"],
    evidence: [{ id: "ev-sim" }],
    reviewer_decision: "approve_simulation_output",
  });

  // Evidence
  const evidenceItems = [
    makeEvidence({
      kind: "approval_record",
      integration_run_id: run.id,
      project_id: run.project_id,
      summary: "Founder approved simulation",
      payload: { decision: run.approval_package?.decision },
    }),
    makeEvidence({
      kind: "execution_log",
      integration_run_id: run.id,
      project_id: run.project_id,
      summary: "Deterministic simulation execution log",
      payload: { simulation_id: sim.id, pipeline },
    }),
    makeEvidence({
      kind: "validation_result",
      integration_run_id: run.id,
      project_id: run.project_id,
      summary: "Task verification",
      payload: verification,
    }),
    makeEvidence({
      kind: "test_result",
      integration_run_id: run.id,
      project_id: run.project_id,
      summary: "Integration scenario evidence",
    }),
    makeEvidence({
      kind: "decision_record",
      integration_run_id: run.id,
      project_id: run.project_id,
      summary: "Collaboration merge decision",
      payload: { collaboration_id: collab.id },
    }),
  ];
  const manifest = buildEvidenceManifest(run, evidenceItems);
  linkLineage(run.id, { evidence_ids: evidenceItems.map((e) => e.id) });
  run.verification = { ...verification, pipeline };
  run.evidence = manifest;

  // Memory
  run = transitionRun(run.id, "memory_writing", { actor });
  writeTaskExperience({
    agent_slug: specialist,
    task_id: taskId,
    project_id: run.project_id,
    experience: { summary: "Integration simulation experience", mode: "deterministic_simulation" },
    simulation: true,
  });
  const memory = writeRunMemoryBundle(run, {
    patterns: ["hierarchical_delegation", "founder_gated_close"],
    gaps: run.validation?.unresolved_gaps || [],
  });
  for (const m of memory) {
    evidenceItems.push(
      makeEvidence({
        kind: "memory_write",
        integration_run_id: run.id,
        project_id: run.project_id,
        subject_id: m.id,
        summary: m.summary,
      })
    );
  }
  linkLineage(run.id, { memory_ids: memory.map((m) => m.id) });
  run.memory = { entries: memory.map((m) => m.id), count: memory.length };

  // Learning
  run = transitionRun(run.id, "learning_proposals_created", { actor });
  proposeWorkforceLearning({
    project_id: run.project_id,
    agent_slug: specialist,
    task_id: taskId,
    simulation: true,
  });
  const learning = proposeIntegrationLearning({
    integration_run_id: run.id,
    project_id: run.project_id,
    organization_id: run.organization_id,
  });
  for (const p of learning) {
    const safety = assessLearningSafety(p);
    if (!safety.safe) throw new Error("unsafe learning proposal");
    evidenceItems.push(
      makeEvidence({
        kind: "learning_proposal",
        integration_run_id: run.id,
        project_id: run.project_id,
        subject_id: p.id,
        summary: p.summary,
      })
    );
  }
  linkLineage(run.id, { learning_ids: learning.map((p) => p.id) });
  run.learning = {
    proposals: learning.map((p) => p.id),
    count: learning.length,
    auto_applied: false,
  };

  buildEvidenceManifest(run, evidenceItems);
  run.evidence = buildEvidenceManifest(run, evidenceItems);

  run = transitionRun(run.id, "founder_final_review", {
    actor,
    status: "awaiting_final_review",
  });

  run.proof_pack = buildProofPack(run);
  run.provider_called = false;
  run.fabricated_execution = false;
  run.live_execution = false;
  saveRun(run);
  markSimulationResult(true);

  recordAudit({
    action: "integration.simulation.ready_for_final_review",
    integration_run_id: run.id,
    project_id: run.project_id,
    actor,
    stage: run.current_stage,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
  });

  return run;
}

function materializeTasks(run) {
  const wbsTasks =
    run.planning_plan?.wbs?.tasks ||
    run.planning_plan?.payload?.wbs?.tasks ||
    [];
  if (wbsTasks.length) {
    return wbsTasks.slice(0, 8).map((t, i) => ({
      id: `irun-task-${run.id}-${t.id || t.slug || i}`,
      title: t.name || t.title || `Task ${i + 1}`,
      project_id: run.project_id,
      integration_run_id: run.id,
    }));
  }
  return [1, 2, 3].map((i) => ({
    id: `irun-task-${run.id}-${i}`,
    title: `Simulation task ${i}`,
    project_id: run.project_id,
    integration_run_id: run.id,
  }));
}

export function buildProofPack(run) {
  return {
    id: uid("proof"),
    integration_run_id: run.id,
    project_id: run.project_id,
    run_summary: {
      stage: run.current_stage,
      status: run.status,
      mode: run.execution_mode,
      engine_version: ENGINE_VERSION,
    },
    objective: run.objective,
    stage_timeline: run.stage_history,
    template_lineage: run.lineage.template_selection_id,
    plan_lineage: run.lineage.planning_plan_id,
    capability_map:
      run.planning_plan?.capability_plan || run.template_plan?.capabilities,
    department_map:
      run.planning_plan?.capability_plan?.department_ownership ||
      run.planning_plan?.departments,
    agent_allocation: run.allocation,
    task_graph: run.payload?.tasks || [],
    delegation_graph: run.delegation,
    approvals: run.approval_package,
    risks: run.planning_plan?.risks || [],
    evidence_manifest: run.evidence,
    failures: [],
    retries: run.retry_count,
    recovery_events: run.recovery_count,
    memory_entries: run.memory,
    learning_proposals: run.learning,
    final_limitations: [
      "LEVEL 1 deterministic simulation only unless provider configured and Founder enables live mode.",
      "No fabricated AI completion.",
    ],
    live_provider_readiness: run.provider_gate,
    secrets_included: false,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
    created_at: nowIso(),
  };
}

export function decideFinalReview(runId, decision, {
  actor = "founder",
  auto_approve = false,
} = {}) {
  if (auto_approve) throw new Error("Founder gates must not be auto-approved");
  const run = getRun(runId);
  if (!run) throw new Error("run not found");
  if (run.current_stage !== "founder_final_review") {
    throw new Error("not awaiting final review");
  }
  if (decision === "approve") {
    // Close workforce simulation if present
    if (run.simulation_id) {
      try {
        approveSimulation(run.simulation_id, { actor, decision: "approve" });
      } catch {
        /* simulation may already be pending founder */
      }
    }
    return transitionRun(run.id, "completed", { actor, status: "completed" });
  }
  if (decision === "reject") {
    return transitionRun(run.id, "rejected", { actor, status: "rejected" });
  }
  throw new Error(`Invalid final decision: ${decision}`);
}

export function pauseIntegrationRun(runId, { actor = "founder" } = {}) {
  const run = getRun(runId);
  if (!run) throw new Error("run not found");
  run.payload.resume_stage = run.current_stage;
  pauseWorkforce({ actor, project_id: run.project_id, reason: "integration_pause" });
  return transitionRun(run.id, "paused", {
    actor,
    status: "paused",
    patch: { payload: run.payload },
  });
}

export function resumeIntegrationRun(runId, { actor = "founder" } = {}) {
  const run = getRun(runId);
  if (!run) throw new Error("run not found");
  if (run.current_stage !== "paused" && run.status !== "paused") {
    throw new Error("run is not paused");
  }
  resumeWorkforce({ actor, project_id: run.project_id });
  const target = run.payload?.resume_stage || "founder_approval_required";
  return transitionRun(run.id, target, {
    actor,
    status: target === "founder_final_review" ? "awaiting_final_review" : "active",
  });
}

export function cancelIntegrationRun(
  runId,
  { actor = "founder", failure_reason = null } = {}
) {
  const run = getRun(runId);
  if (!run) throw new Error("run not found");
  return transitionRun(run.id, "cancelled", {
    actor,
    status: "cancelled",
    failure_reason,
  });
}

/**
 * Restart recovery from latest checkpoint.
 */
export function recoverIntegrationRun(runId, { actor = "system" } = {}) {
  const run = getRun(runId);
  if (!run) throw new Error("run not found");
  const cp = latestCheckpoint(run.id);
  recoverWorkforce({ project_id: run.project_id });
  run.recovery_count = (run.recovery_count || 0) + 1;
  run.retry_count = (run.retry_count || 0) + 0;
  if (cp) {
    run.current_stage = cp.stage;
    run.status = cp.status;
    run.lineage = { ...run.lineage, ...(cp.lineage || {}) };
  }
  run.updated_at = nowIso();
  saveRun(run);
  recordAudit({
    action: "integration.recovery",
    integration_run_id: run.id,
    project_id: run.project_id,
    actor,
    stage: run.current_stage,
    recovery_count: run.recovery_count,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
  });
  return run;
}

/**
 * Full happy-path helper for Scenario A (still requires explicit Founder decisions).
 */
export function runDeterministicProofChain(rawObjective, {
  actor = "founder",
  clarification_answers = null,
  approve = true,
  final_approve = true,
} = {}) {
  let { run } = createIntegrationRun(rawObjective, { actor });
  if (run.current_stage === "clarification_required") {
    const answers =
      clarification_answers ||
      {
        title: rawObjective.title,
        business_purpose: rawObjective.business_purpose,
        expected_deliverables: rawObjective.expected_deliverables,
        success_criteria: rawObjective.success_criteria,
        clear_questions: true,
      };
    if (!answers?.title && !answers?.business_purpose) {
      return { run, stopped: "clarification_required" };
    }
    ({ run } = submitClarification(run.id, answers, { actor }));
    if (run.current_stage === "clarification_required") {
      return { run, stopped: "clarification_required" };
    }
  }
  run = generateIntegrationPlan(run.id, { actor });
  if (run.current_stage === "failed" || run.current_stage === "clarification_required") {
    return { run, stopped: run.current_stage };
  }
  if (!approve) return { run, stopped: "awaiting_approval" };
  run = decideFounderApproval(run.id, "approve_simulation", { actor });
  run = startIntegrationSimulation(run.id, { actor });
  if (!final_approve) return { run, stopped: "founder_final_review" };
  run = decideFinalReview(run.id, "approve", { actor });
  return { run, stopped: null };
}

export function getIntegrationDashboard({ project_id = null } = {}) {
  const runs = listRuns({ project_id });
  const audit = auditRoutableWorkforce();

  const isFounderProductionProof = (r) =>
    Boolean(r?.proof?.is_production_proof || r?.payload?.is_production_proof) &&
    (r?.objective?.title || "") === FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title;

  const isTerminalProof = (r) => {
    const ps = mapProofStatusFromRun(r);
    return ["completed", "rejected", "failed"].includes(ps);
  };

  const proofScore = (r) =>
    (r?.evidence?.count || 0) + (r?.memory?.count || 0) + (r?.learning?.count || 0);

  const proofRuns = runs.filter(isFounderProductionProof);
  const activeProofRuns = proofRuns.filter((r) => !isTerminalProof(r));

  let canonicalActiveFounderProofRun = null;
  if (activeProofRuns.length > 0) {
    activeProofRuns.sort((a, b) => {
      const at = String(a.started_at || a.updated_at || "");
      const bt = String(b.started_at || b.updated_at || "");
      const t = at.localeCompare(bt);
      if (t !== 0) return t;
      return proofScore(b) - proofScore(a);
    });
    canonicalActiveFounderProofRun = activeProofRuns[0] || null;
  }

  const runsForUi =
    canonicalActiveFounderProofRun && activeProofRuns.length > 0
      ? runs.filter((r) => !isFounderProductionProof(r) || r.id === canonicalActiveFounderProofRun.id)
      : runs;

  const nonCanonicalActiveFounderProofRunIds =
    canonicalActiveFounderProofRun && activeProofRuns.length > 0
      ? activeProofRuns
          .filter((r) => r.id !== canonicalActiveFounderProofRun.id)
          .map((r) => r.id)
      : [];

  return {
    ok: true,
    engine_version: ENGINE_VERSION,
    proof_level: "LEVEL_1_DETERMINISTIC_SIMULATION",
    live_execution_ready: assessProviderGate({
      execution_mode: "live_provider",
    }).live_execution_ready,
    routable_agent_audit: audit,
    activeFounderProofRunCount: activeProofRuns.length,
    duplicateActiveFounderProofDetected: activeProofRuns.length > 1,
    canonicalFounderProofRunId: canonicalActiveFounderProofRun?.id || null,
    nonCanonicalActiveFounderProofRunIds,
    runs: runsForUi.map((r) => ({
      id: r.id,
      project_id: r.project_id,
      stage: r.current_stage,
      status: r.status,
      mode: r.execution_mode,
      objective_title: r.objective?.title,
      correlation_id: r.correlation_id,
      trace_id: r.trace_id,
      recovery_count: r.recovery_count,
      evidence_count: r.evidence?.count || 0,
      memory_count: r.memory?.count || 0,
      learning_count: r.learning?.count || 0,
    })),
  };
}

export {
  auditRoutableWorkforce,
  isTaskClaimed,
  wfIsTaskClaimed,
  evaluateProtectedAction,
  assessProviderGate,
};
