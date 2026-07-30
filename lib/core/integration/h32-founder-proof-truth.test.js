/**
 * Phase H.3.2 — Founder Proof truth, safe plan correction, guided execution.
 * Fixture matches current production snapshot (do not mutate production).
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  __resetIntegrationRuntime,
  createIntegrationRun,
  generateIntegrationPlan,
  decideFounderApproval,
  decideSimulationApproval,
  returnPlanForCorrections,
  saveRun,
  getRun,
  listRuns,
  listAudit,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
  mapProofStatusFromRun,
} from "@/lib/core/integration";
import {
  buildFounderProofViewModel,
  deriveStepStatesFromViewModel,
  deriveFounderWorkflowGuideSteps,
} from "./founder-proof-view-model.js";
import { deriveStepStates } from "./founder-flow.js";
import { deriveQuickStartStates } from "./founder-labels.js";
import {
  validateSimulationDurableReadiness,
  persistDurablePlanAssignments,
  DEFAULT_CORRECTION_REASON,
} from "./durable-plan-assignments.js";
import { deriveNextFounderProofAction } from "./founder-proof-canonical.js";

const PROJECT_ID = "61d3b1fd-c260-479b-9289-0c75f977e892";
const RUN_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

/** Exact production snapshot — incomplete durable agents (pre-correction). */
export function productionSnapshotRun(overrides = {}) {
  return {
    id: RUN_ID,
    project_id: PROJECT_ID,
    current_stage: "simulation_approval_required",
    status: "awaiting_simulation_approval",
    execution_mode: "deterministic_simulation",
    version: 3,
    proof: { is_production_proof: true },
    payload: { is_production_proof: true },
    objective: {
      ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
      title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title,
      is_production_proof: true,
    },
    approval_package: {
      decision: "approve_plan",
      simulation_started: false,
      provider_called: false,
    },
    simulation_approval: null,
    planning_plan: {
      id: "plan_prod_snap",
      wbs: {
        tasks: [
          { id: "t1", title: "Identity and Access", payload: { department: "security" } },
          {
            id: "t2",
            title: "Organisation and Employee Lifecycle Management",
            payload: { department: "hr" },
          },
          {
            id: "t3",
            title: "Security Controls and Access Governance",
            payload: { department: "security" },
          },
          {
            id: "t4",
            title: "Operational Onboarding Coordination",
            payload: { department: "operations" },
          },
        ],
        edges: [],
      },
    },
    allocation: { count: 0, selected_agents: [], proposed_only: true },
    evidence: { count: 0 },
    memory: { count: 0 },
    learning: { count: 0 },
    recovery_count: 0,
    provider_called: false,
    stage_history: [
      { stage: "objective_validated", at: "2026-07-01T00:00:00.000Z", actor: "system" },
      { stage: "founder_approval_required", at: "2026-07-01T00:01:00.000Z", actor: "system" },
      { stage: "simulation_approval_required", at: "2026-07-01T00:02:00.000Z", actor: "founder" },
    ],
    correlation_id: "corr_prod_snap",
    trace_id: "trace_prod_snap",
    ...overrides,
  };
}

describe("Phase H.3.2 — production snapshot truth", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
  });

  it("all Founder surfaces agree on simulation_approval current", () => {
    const run = productionSnapshotRun();
    const vm = buildFounderProofViewModel({
      projectId: PROJECT_ID,
      projectName: "MianX Internal Production Proof",
      hasProject: true,
      run,
      evidenceCount: 0,
      memoryCount: 0,
      learningCount: 0,
      selectedAgentCount: 0,
      duplicateCount: 0,
      providerConfigured: false,
      liveExecutionReady: false,
    });

    expect(vm.machineStage).toBe("simulation_approval_required");
    expect(vm.machineStatus).toBe("awaiting_simulation_approval");
    expect(vm.currentStep).toBe("simulation_approval");
    expect(vm.completedSteps).toContain("plan_approval");
    expect(vm.completedSteps).not.toContain("simulation_approval");
    expect(vm.completedSteps).not.toContain("simulation");
    expect(vm.completedSteps).not.toContain("evidence");
    expect(vm.completedSteps).not.toContain("memory_learning");
    expect(vm.completedSteps).not.toContain("final_review");
    expect(vm.evidenceCount).toBe(0);
    expect(vm.selectedAgentCount).toBe(0);
    expect(vm.liveExecutionReady).toBe(false);
    expect(vm.planCorrectionRequired).toBe(true);
    expect(vm.nextFounderAction.id).toBe("return_plan_for_corrections");

    const sets = deriveStepStatesFromViewModel(vm);
    expect(sets.current.has("simulation_approval")).toBe(true);
    expect(sets.completed.has("simulation")).toBe(false);
    expect(sets.completed.has("evidence")).toBe(false);

    const flow = deriveStepStates({
      hasProject: true,
      hasRun: true,
      runStage: run.current_stage,
      runStatus: run.status,
      proofStatus: mapProofStatusFromRun(run),
      evidenceCount: 0,
      memoryCount: 0,
      learningCount: 0,
      run,
    });
    expect(flow.current.has("simulation_approval")).toBe(true);
    expect(flow.completed.has("simulation_approval")).toBe(false);
    expect(flow.completed.has("simulation")).toBe(false);

    const qs = deriveQuickStartStates(run, { hasProject: true });
    expect(qs.find((s) => s.id === "sim_approval")?.state).toBe("current");
    expect(qs.find((s) => s.id === "plan")?.state).toBe("completed");
    expect(qs.find((s) => s.id === "simulation")?.state).toBe("upcoming");

    const guide = deriveFounderWorkflowGuideSteps({
      hasProject: true,
      run,
      evidenceCount: 0,
      memoryCount: 0,
      learningCount: 0,
    });
    const current = guide.find((s) => s.isCurrent);
    expect(current?.id).toBe("simulation_approval");
    expect(guide.find((s) => s.id === "objective")?.state).toBe("completed");
  });

  it("negative: cannot mark simulation/evidence/memory completed with zero durable counts", () => {
    const run = productionSnapshotRun();
    const vm = buildFounderProofViewModel({ hasProject: true, run });
    expect(vm.progressSteps.find((s) => s.id === "simulation")?.state).not.toBe("completed");
    expect(vm.progressSteps.find((s) => s.id === "evidence")?.state).not.toBe("completed");
    expect(vm.progressSteps.find((s) => s.id === "memory_learning")?.state).not.toBe(
      "completed"
    );
    expect(vm.progressSteps.find((s) => s.id === "final_review")?.state).not.toBe("completed");
  });

  it("missing per-task agents block simulation approval", () => {
    const run = productionSnapshotRun();
    saveRun(run);
    const readiness = validateSimulationDurableReadiness(run);
    expect(readiness.status).toBe("blocked");
    expect(readiness.missing_primary_agent_count).toBeGreaterThan(0);
    expect(() =>
      decideSimulationApproval(run.id, "approve", { actor: "founder" })
    ).toThrow(/durable task/i);
  });

  it("return plan for corrections preserves run id and regenerates durable agents", () => {
    const run = productionSnapshotRun();
    saveRun(run);
    const corrected = returnPlanForCorrections(run.id, {
      actor: "founder",
      note: DEFAULT_CORRECTION_REASON,
    });
    expect(corrected.id).toBe(RUN_ID);
    expect(corrected.project_id).toBe(PROJECT_ID);
    expect(corrected.current_stage).toBe("founder_approval_required");
    expect(listRuns({ project_id: PROJECT_ID }).filter((r) => !r.status?.includes("cancel")).length).toBe(1);

    const tasks = corrected.planning_plan.wbs.tasks;
    expect(tasks.every((t) => t.proposed_agent || t.payload?.agent_slug)).toBe(true);
    expect(tasks[0].department).toBe("security");
    expect(tasks[0].proposed_agent).toBe("platform-security");
    expect(tasks[1].department).toBe("hr");
    expect(tasks[1].proposed_agent).toBe("hr-workforce-planner");
    expect(tasks[2].department).toBe("security");
    expect(tasks[3].department).toBe("operations");
    expect(tasks[3].proposed_agent).toBe("ops-coordinator");
    expect(tasks[3].quality_reviewer?.slug).toBe("qa-review");

    const slugs = (corrected.allocation?.selected_agents || []).map((a) => a.slug);
    for (const required of [
      "executive-ceo",
      "hr-workforce-planner",
      "platform-security",
      "ops-coordinator",
      "qa-review",
    ]) {
      expect(slugs).toContain(required);
    }
    expect(slugs).not.toContain("lead-intelligence");
    expect(corrected.provider_called).not.toBe(true);

    const audit = listAudit({ integration_run_id: RUN_ID });
    expect(audit.some((a) => a.action === "integration.plan.returned_for_corrections")).toBe(
      true
    );
    expect(audit.some((a) => a.action === "integration.plan.regenerated")).toBe(true);

    // After re-approve plan, simulation approval allowed
    let next = decideFounderApproval(corrected.id, "approve_simulation", {
      actor: "founder",
    });
    expect(next.current_stage).toBe("simulation_approval_required");
    const ready = validateSimulationDurableReadiness(next);
    expect(ready.simulation_approval_allowed).toBe(true);
    next = decideSimulationApproval(next.id, "approve", { actor: "founder" });
    expect(next.current_stage).toBe("approved_for_simulation");
    expect(next.provider_called).not.toBe(true);
  });

  it("unrelated live-provider and cancelled runs do not alter proof progress", () => {
    const canonical = productionSnapshotRun();
    saveRun(canonical);
    saveRun({
      id: "live-unrelated",
      project_id: PROJECT_ID,
      current_stage: "workforce_allocated",
      status: "simulating",
      execution_mode: "live_provider",
      proof: { is_production_proof: false },
      objective: { title: "Unrelated live objective" },
      evidence: { count: 99 },
      memory: { count: 99 },
      learning: { count: 99 },
    });
    saveRun({
      id: "cancelled-history",
      project_id: PROJECT_ID,
      current_stage: "cancelled",
      status: "cancelled",
      execution_mode: "deterministic_simulation",
      proof: { is_production_proof: true },
      objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
      evidence: { count: 5 },
    });

    const vm = buildFounderProofViewModel({
      hasProject: true,
      run: getRun(RUN_ID),
      evidenceCount: 0,
      memoryCount: 0,
      learningCount: 0,
    });
    expect(vm.currentStep).toBe("simulation_approval");
    expect(vm.evidenceCount).toBe(0);
    expect(vm.completedSteps).not.toContain("evidence");
  });

  it("query-error style empty run does not become fabricated completions", () => {
    const vm = buildFounderProofViewModel({
      hasProject: true,
      run: null,
      resolverError: "query failed",
    });
    expect(vm.currentStep).toBe("objective");
    expect(vm.completedSteps).not.toContain("simulation");
    expect(vm.resolverError).toBe("query failed");
  });

  it("idempotent double return does not create duplicate proof", () => {
    const run = productionSnapshotRun();
    saveRun(run);
    const a = returnPlanForCorrections(run.id, {
      actor: "founder",
      idempotency_key: "same-key",
    });
    const b = returnPlanForCorrections(run.id, {
      actor: "founder",
      idempotency_key: "same-key",
    });
    expect(a.id).toBe(b.id);
    expect(a.id).toBe(RUN_ID);
    expect(listRuns({ project_id: PROJECT_ID }).length).toBe(1);
  });

  it("fresh generated plan persists durable agents so simulation can be approved", () => {
    const { run } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: PROJECT_ID,
        unresolved_questions: [],
      },
      { actor: "founder" }
    );
    run.proof = { is_production_proof: true };
    run.current_stage = "objective_validated";
    run.status = "active";
    run.objective = { ...run.objective, unresolved_questions: [] };
    saveRun(run);
    let next = generateIntegrationPlan(run.id, { actor: "founder" });
    expect(next.planning_plan.wbs.tasks.every((t) => t.proposed_agent)).toBe(true);
    next = decideFounderApproval(next.id, "approve_simulation", { actor: "founder" });
    next = decideSimulationApproval(next.id, "approve", { actor: "founder" });
    expect(next.current_stage).toBe("approved_for_simulation");
  });

  it("deriveNextFounderProofAction prefers return when blocked", () => {
    const run = productionSnapshotRun();
    const action = deriveNextFounderProofAction({
      has_project: true,
      project_id: PROJECT_ID,
      canonical_run: run,
    });
    expect(action.id).toBe("return_plan_for_corrections");
  });

  it("persistDurablePlanAssignments is pure relative to run id", () => {
    const run = productionSnapshotRun();
    const { planning_plan, task_count } = persistDurablePlanAssignments(run);
    expect(task_count).toBe(4);
    expect(planning_plan.wbs.tasks[0].proposed_agent).toBe("platform-security");
    expect(run.id).toBe(RUN_ID);
  });
});
