/**
 * Canonical Founder Proof progress + action view model.
 * All Founder surfaces must consume this — do not invent per-component completion.
 */

import { mapProofStatusFromRun } from "./persist.js";
import { isTerminalFounderProofRun, isFounderProductionProofRun } from "./founder-proof-canonical.js";
import { validateFounderPlanReadiness } from "./plan-readiness.js";
import {
  validateSimulationDurableReadiness,
} from "./durable-plan-assignments.js";

export { validateSimulationDurableReadiness };

export const FOUNDER_PROOF_PROGRESS_STEPS = Object.freeze([
  { id: "project", label: "Project" },
  { id: "objective", label: "Objective" },
  { id: "clarification", label: "Clarification" },
  { id: "plan", label: "Plan" },
  { id: "plan_approval", label: "Plan Approval" },
  { id: "simulation_approval", label: "Simulation Approval" },
  { id: "simulation", label: "Simulation" },
  { id: "evidence", label: "Evidence" },
  { id: "memory_learning", label: "Memory & Learning" },
  { id: "final_review", label: "Final Review" },
  { id: "completed", label: "Completed" },
]);

const SIM_RUNNING = new Set([
  "workforce_allocated",
  "tasks_claimed",
  "collaboration_running",
  "verification_running",
  "memory_writing",
  "learning_proposals_created",
  "paused",
]);

/**
 * Build one authoritative view model for Founder Proof surfaces.
 *
 * @param {{
 *   projectId?: string|null,
 *   projectName?: string|null,
 *   run?: object|null,
 *   hasProject?: boolean,
 *   evidenceCount?: number,
 *   memoryCount?: number,
 *   learningCount?: number,
 *   recoveryCount?: number,
 *   selectedAgentCount?: number,
 *   taskCount?: number,
 *   providerConfigured?: boolean,
 *   liveExecutionReady?: boolean,
 *   duplicateCount?: number,
 *   resolverError?: string|null,
 * }} input
 */
export function buildFounderProofViewModel(input = {}) {
  const run = input.run || null;
  const hasProject = Boolean(input.hasProject ?? input.projectId);
  const hasRun = Boolean(run?.id);
  const stage = run?.current_stage || "";
  const status = mapProofStatusFromRun(run);
  const evidenceCount = Number(input.evidenceCount ?? run?.evidence?.count ?? 0) || 0;
  const memoryCount = Number(input.memoryCount ?? run?.memory?.count ?? 0) || 0;
  const learningCount = Number(input.learningCount ?? run?.learning?.count ?? 0) || 0;
  const recoveryCount = Number(input.recoveryCount ?? run?.recovery_count ?? 0) || 0;
  const selectedAgentCount =
    Number(
      input.selectedAgentCount ??
        run?.allocation?.count ??
        run?.allocation?.selected_agents?.length ??
        0
    ) || 0;
  const taskCount =
    Number(
      input.taskCount ??
        run?.payload?.tasks?.length ??
        run?.planning_plan?.wbs?.tasks?.length ??
        run?.task_count ??
        0
    ) || 0;

  const terminal = run ? isTerminalFounderProofRun(run) : false;
  const canonical = run ? isFounderProductionProofRun(run) : false;
  const planReadiness = hasRun ? validateFounderPlanReadiness(run) : null;
  const simReadiness =
    hasRun &&
    (stage === "simulation_approval_required" ||
      status === "awaiting_simulation_approval" ||
      stage === "approved_for_simulation")
      ? validateSimulationDurableReadiness(run)
      : planReadiness
        ? validateSimulationDurableReadiness(run)
        : null;

  const progress = deriveProgressSteps({
    hasProject,
    hasRun,
    stage,
    status,
    runStatus: run?.status,
    evidenceCount,
    memoryCount,
    learningCount,
    terminal,
  });

  const currentStep = progress.find((s) => s.state === "current" || s.state === "waiting_for_founder");
  const completedSteps = progress.filter((s) => s.state === "completed").map((s) => s.id);
  const pendingSteps = progress.filter((s) => s.state === "upcoming" || s.state === "pending").map((s) => s.id);

  const next = deriveNextAction({
    hasProject,
    projectId: input.projectId,
    run,
    stage,
    status,
    simReadiness,
    planReadiness,
    terminal,
  });

  // Fail-closed invariant checks
  const invariantViolations = assertProgressInvariants(progress, {
    evidenceCount,
    memoryCount,
    learningCount,
    stage,
    status,
  });

  return {
    projectId: input.projectId || run?.project_id || null,
    projectName: input.projectName || null,
    runId: run?.id || null,
    canonical,
    terminal,
    resumable: Boolean(run && !terminal),
    executionMode: run?.execution_mode || null,
    machineStage: stage || null,
    machineStatus: status || null,
    founderStageLabel: humanStage(stage, status),
    founderStatusLabel: humanStatus(status, stage),
    currentStep: currentStep?.id || null,
    currentStepLabel: currentStep?.label || null,
    completedSteps,
    pendingSteps,
    progressSteps: progress,
    nextFounderAction: next,
    nextActionHref: next?.href || null,
    taskCount,
    selectedAgentCount,
    evidenceCount,
    memoryCount,
    learningCount,
    recoveryCount,
    providerConfigured: Boolean(input.providerConfigured),
    liveExecutionReady: Boolean(input.liveExecutionReady),
    simulationReady: Boolean(simReadiness?.simulation_approval_allowed),
    planReadiness,
    simulationReadiness: simReadiness,
    planCorrectionRequired: Boolean(
      simReadiness && simReadiness.status === "blocked" && stage === "simulation_approval_required"
    ),
    duplicateCount: Number(input.duplicateCount || 0) || 0,
    resolverError: input.resolverError || null,
    warnings: [
      ...(planReadiness?.warnings || []),
      ...(simReadiness?.warnings || []),
      ...invariantViolations,
    ],
    // Compatibility for IntegrationFlowStepper
    stepSets: toStepSets(progress),
  };
}

/**
 * Rewrite deriveStepStates-compatible sets from the view model.
 */
export function deriveStepStatesFromViewModel(vm) {
  return vm?.stepSets || { completed: new Set(), current: new Set(), blocked: new Set(), pending: new Set() };
}

/**
 * Compact workflow steps for the Founder Proof header (excludes project/completed).
 */
export function deriveFounderWorkflowGuideSteps(input = {}) {
  const vm = buildFounderProofViewModel(input);
  return (vm.progressSteps || [])
    .filter((s) => s.id !== "project" && s.id !== "completed")
    .map((step) => ({
      ...step,
      isCurrent: step.state === "current" || step.state === "waiting_for_founder",
    }));
}

function deriveProgressSteps({
  hasProject,
  hasRun,
  stage,
  status,
  runStatus,
  evidenceCount,
  memoryCount,
  learningCount,
  terminal,
}) {
  const steps = FOUNDER_PROOF_PROGRESS_STEPS.map((s) => ({
    ...s,
    state: "upcoming",
  }));
  const byId = Object.fromEntries(steps.map((s) => [s.id, s]));

  function markCompleted(...ids) {
    for (const id of ids) {
      if (byId[id]) byId[id].state = "completed";
    }
  }
  function markCurrent(id, waiting = false) {
    if (byId[id]) byId[id].state = waiting ? "waiting_for_founder" : "current";
  }
  function markPendingFrom(id) {
    const order = FOUNDER_PROOF_PROGRESS_STEPS.map((s) => s.id);
    const idx = order.indexOf(id);
    for (let i = idx + 1; i < order.length; i += 1) {
      if (byId[order[i]]?.state === "upcoming") {
        byId[order[i]].state = "upcoming";
      }
    }
  }

  if (!hasProject) {
    markCurrent("project");
    return steps;
  }
  markCompleted("project");

  if (!hasRun) {
    markCurrent("objective");
    return steps;
  }
  markCompleted("objective");

  if (stage === "clarification_required" || status === "clarification_required") {
    markCurrent("clarification", true);
    return steps;
  }
  markCompleted("clarification");

  if (
    ["objective_validated", "templates_matched", "capabilities_mapped", "plan_generated", "dependencies_validated", "execution_preview_generated"].includes(
      stage
    ) ||
    status === "objective_created"
  ) {
    markCurrent("plan");
    return steps;
  }
  markCompleted("plan");

  if (stage === "founder_approval_required" || status === "awaiting_plan_approval") {
    markCurrent("plan_approval", true);
    return steps;
  }
  markCompleted("plan_approval");

  // CRITICAL: simulation_approval_required is CURRENT — never completed.
  if (stage === "simulation_approval_required" || status === "awaiting_simulation_approval") {
    markCurrent("simulation_approval", true);
    return steps;
  }

  if (stage === "approved_for_simulation" || status === "simulation_approved" || status === "awaiting_simulation_start") {
    markCompleted("simulation_approval");
    markCurrent("simulation");
    return steps;
  }

  if (SIM_RUNNING.has(stage) || status === "simulation_running") {
    markCompleted("simulation_approval");
    // Simulation is current until evidence exists (or verification done with evidence)
    if (evidenceCount > 0 && (stage === "verification_running" || stage === "memory_writing" || stage === "learning_proposals_created")) {
      markCompleted("simulation");
      if (memoryCount > 0 || learningCount > 0 || stage === "memory_writing" || stage === "learning_proposals_created") {
        if (evidenceCount > 0) markCompleted("evidence");
        markCurrent("memory_learning");
      } else {
        markCurrent("evidence");
      }
    } else {
      markCurrent("simulation");
    }
    return steps;
  }

  markCompleted("simulation_approval");

  // When already awaiting Final Founder Review, stage progression wins over
  // missing count props (Production may omit nested count fields in some payloads).
  if (stage === "founder_final_review" || status === "awaiting_final_review") {
    markCompleted("simulation");
    markCompleted("evidence");
    markCompleted("memory_learning");
    markCurrent("final_review", true);
    return steps;
  }

  // Artifact gates for pre-final stages — never mark completed with zero durable counts
  if (evidenceCount > 0) markCompleted("simulation");
  else {
    if (stage === "completed") {
      if (evidenceCount === 0) {
        markCurrent("simulation");
        return steps;
      }
    }
  }

  if (evidenceCount > 0) markCompleted("evidence");
  if (memoryCount > 0 && learningCount > 0) markCompleted("memory_learning");
  else if (memoryCount > 0 || learningCount > 0 || stage === "memory_writing" || stage === "learning_proposals_created") {
    if (evidenceCount > 0) markCurrent("memory_learning");
  }

  if (stage === "completed" || status === "completed" || runStatus === "completed") {
    markCompleted("simulation_approval", "simulation", "evidence", "memory_learning", "final_review", "completed");
    // Still enforce artifact truth: if counts are zero, demote fabricated completions
    if (evidenceCount === 0) {
      byId.evidence.state = "upcoming";
      byId.simulation.state = byId.simulation.state === "completed" ? "upcoming" : byId.simulation.state;
    }
    if (memoryCount === 0 || learningCount === 0) {
      byId.memory_learning.state = "upcoming";
    }
    return steps;
  }

  if (terminal || ["rejected", "failed", "cancelled"].includes(status) || ["rejected", "failed", "cancelled"].includes(stage)) {
    byId.completed.state = "blocked";
    markCurrent("final_review");
    return steps;
  }

  // Fallback: after plan approval, default to simulation approval current
  markCurrent("simulation_approval", true);
  markPendingFrom("simulation_approval");
  return steps;
}

function deriveNextAction({
  hasProject,
  projectId,
  run,
  stage,
  status,
  simReadiness,
  planReadiness,
  terminal,
}) {
  if (!hasProject) {
    return {
      id: "select_project",
      label: "Select a project",
      href: "/admin/projects",
      willHappen: ["Scopes Founder Proof to one active project."],
      willNotHappen: ["Does not create a proof."],
    };
  }
  if (terminal) {
    return {
      id: "view_history",
      label: "View proof history",
      href: projectId
        ? `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=dashboard`
        : "/admin/integration",
      willHappen: [],
      willNotHappen: ["Does not mutate records."],
    };
  }
  if (!run) {
    return {
      id: "start_proof",
      label: "Start Founder Proof",
      href: projectId
        ? `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=objective`
        : "/admin/integration",
      requiresConfirmation: true,
      willHappen: ["Creates a new Founder Proof objective and run after confirmation."],
      willNotHappen: ["Does not approve simulation", "Does not call a provider"],
    };
  }

  const qs = new URLSearchParams();
  if (projectId) qs.set("project_id", projectId);
  if (run.id) qs.set("run_id", run.id);

  if (stage === "simulation_approval_required" || status === "awaiting_simulation_approval") {
    if (simReadiness?.status === "blocked") {
      qs.set("tab", "simulation");
      return {
        id: "return_plan_for_corrections",
        label: "Return plan for corrections",
        href: `/admin/integration?${qs.toString()}`,
        severity: "action_required",
        explanation:
          "The durable plan is missing required task assignments. Return it for corrections before approving simulation.",
        willHappen: [
          "Preserves the canonical run and project",
          "Records an audit event",
          "Moves the proof back to plan review after regeneration",
        ],
        willNotHappen: [
          "Does not create a second Founder Proof",
          "Does not start simulation",
          "Does not call a provider",
          "Does not deploy production",
        ],
      };
    }
    qs.set("tab", "simulation");
    return {
      id: "approve_simulation_boundary",
      label: "Review and approve deterministic simulation boundary",
      href: `/admin/integration?${qs.toString()}`,
      severity: "action_required",
      explanation:
        "Approve the deterministic simulation boundary only. Simulation will not start automatically.",
      willHappen: [
        "Authorizes deterministic simulation eligibility",
        "Approves the bounded simulation workforce",
      ],
      willNotHappen: [
        "Simulation does not start",
        "Provider is not called",
        "Production deployment remains blocked",
        "Final proof is not completed",
      ],
    };
  }

  if (stage === "approved_for_simulation") {
    qs.set("tab", "simulation");
    return {
      id: "start_simulation",
      label: "Start deterministic simulation",
      href: `/admin/integration?${qs.toString()}`,
      explanation: "Explicit Start is required. Approval alone does not run simulation.",
      willHappen: ["Allocates proposed agents and runs deterministic tasks."],
      willNotHappen: ["Does not call a live provider", "Does not deploy production"],
    };
  }

  if (stage === "founder_approval_required" || status === "awaiting_plan_approval") {
    qs.set("tab", "plan");
    return {
      id: "review_plan",
      label: "Review Plan",
      href: `/admin/integration?${qs.toString()}`,
      willHappen: ["Moves proof to Simulation Approval when approved."],
      willNotHappen: ["Simulation will not start", "Provider will not be called"],
    };
  }

  qs.set("tab", "dashboard");
  return {
    id: "open_proof",
    label: "Open Founder Proof",
    href: `/admin/integration?${qs.toString()}`,
    willHappen: [],
    willNotHappen: [],
  };
}

function assertProgressInvariants(progress, { evidenceCount, memoryCount, learningCount, stage, status }) {
  const violations = [];
  const byId = Object.fromEntries(progress.map((s) => [s.id, s]));
  const atFinalReview =
    stage === "founder_final_review" || status === "awaiting_final_review";
  if (byId.simulation?.state === "completed" && evidenceCount === 0 && !SIM_RUNNING.has(stage) && stage !== "completed" && status !== "completed") {
    // Allow completed simulation only with evidence OR completed/final-review stage progression
    if (stage !== "founder_final_review" && stage !== "completed" && !atFinalReview) {
      violations.push("invariant: simulation marked completed without durable evidence");
      byId.simulation.state = "upcoming";
    }
  }
  if (byId.evidence?.state === "completed" && evidenceCount === 0 && !atFinalReview) {
    violations.push("invariant: evidence marked completed with zero evidence records");
    byId.evidence.state = "upcoming";
  }
  if (
    byId.memory_learning?.state === "completed" &&
    (memoryCount === 0 || learningCount === 0) &&
    !atFinalReview
  ) {
    violations.push("invariant: memory/learning marked completed without durable records");
    byId.memory_learning.state = "upcoming";
  }
  if (
    (stage === "simulation_approval_required" || status === "awaiting_simulation_approval") &&
    byId.simulation_approval?.state === "completed"
  ) {
    violations.push("invariant: simulation approval cannot be completed while awaiting Founder");
    byId.simulation_approval.state = "waiting_for_founder";
  }
  if (
    (stage === "simulation_approval_required" || status === "awaiting_simulation_approval") &&
    ["simulation", "evidence", "memory_learning", "final_review", "completed"].some(
      (id) => byId[id]?.state === "completed"
    )
  ) {
    violations.push("invariant: later steps cannot be completed before simulation approval");
    for (const id of ["simulation", "evidence", "memory_learning", "final_review", "completed"]) {
      if (byId[id]) byId[id].state = "upcoming";
    }
  }
  return violations;
}

function toStepSets(progress) {
  const completed = new Set();
  const current = new Set();
  const blocked = new Set();
  const pending = new Set();
  for (const s of progress) {
    if (s.state === "completed") completed.add(s.id);
    else if (s.state === "current" || s.state === "waiting_for_founder") current.add(s.id);
    else if (s.state === "blocked") blocked.add(s.id);
    else pending.add(s.id);
  }
  return { completed, current, blocked, pending };
}

function humanStage(stage, status) {
  if (stage === "simulation_approval_required" || status === "awaiting_simulation_approval") {
    return "Waiting for Simulation Approval";
  }
  if (stage === "founder_approval_required") return "Waiting for Founder Plan Approval";
  if (stage === "approved_for_simulation") return "Ready to start simulation";
  if (stage === "founder_final_review") return "Waiting for final Founder review";
  if (!stage) return "Not started";
  return String(stage).replace(/_/g, " ");
}

function humanStatus(status, stage) {
  if (status === "awaiting_simulation_approval") {
    return "Waiting for Founder to approve the deterministic simulation boundary";
  }
  if (status === "awaiting_plan_approval") return "Waiting for Founder Plan Approval";
  if (status === "simulation_approved") return "Simulation approved — not started";
  return humanStage(stage, status);
}
