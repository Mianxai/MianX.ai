/**
 * Phase H.3.3 — CI recovery + return-for-corrections concurrency / post-state.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  __resetIntegrationRuntime,
  returnPlanForCorrections,
  decideFounderApproval,
  saveRun,
  getRun,
  listRuns,
  mapProofStatusFromRun,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
} from "@/lib/core/integration";
import { buildFounderProofViewModel } from "./founder-proof-view-model.js";
import { productionSnapshotRun } from "./h32-founder-proof-truth.test.js";
import { DEFAULT_CORRECTION_REASON } from "./durable-plan-assignments.js";

const PROJECT_ID = "61d3b1fd-c260-479b-9289-0c75f977e892";
const RUN_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

describe("Phase H.3.3 — return plan concurrency and post-return truth", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
  });

  it("post-return state is awaiting_plan_approval / founder_approval_required", () => {
    const snap = productionSnapshotRun();
    saveRun(snap);
    const corrected = returnPlanForCorrections(snap.id, {
      actor: "founder",
      note: DEFAULT_CORRECTION_REASON,
      project_id: PROJECT_ID,
    });
    expect(corrected.id).toBe(RUN_ID);
    expect(corrected.project_id).toBe(PROJECT_ID);
    expect(corrected.current_stage).toBe("founder_approval_required");
    expect(corrected.status).toBe("awaiting_approval");
    expect(mapProofStatusFromRun(corrected)).toBe("awaiting_plan_approval");
    expect(corrected.execution_mode).toBe("deterministic_simulation");
    expect(corrected.provider_called).not.toBe(true);
    expect(corrected.simulation_approval).toBeNull();

    const vm = buildFounderProofViewModel({
      hasProject: true,
      projectId: PROJECT_ID,
      run: corrected,
      evidenceCount: 0,
      memoryCount: 0,
      learningCount: 0,
    });
    expect(vm.currentStep).toBe("plan_approval");
    expect(vm.completedSteps).toContain("plan");
    expect(vm.completedSteps).not.toContain("simulation_approval");
    expect(vm.completedSteps).not.toContain("simulation");
    expect(vm.completedSteps).not.toContain("evidence");
  });

  it("durable assignments match onboarding departments after correction", () => {
    saveRun(productionSnapshotRun());
    const corrected = returnPlanForCorrections(RUN_ID, { actor: "founder" });
    const tasks = corrected.planning_plan.wbs.tasks;
    expect(tasks[0].department).toBe("security");
    expect(tasks[0].proposed_agent).toBe("platform-security");
    expect(tasks[1].department).toBe("hr");
    expect(tasks[1].proposed_agent).toBe("hr-workforce-planner");
    expect(tasks[2].department).toBe("security");
    expect(tasks[2].proposed_agent).toBe("platform-security");
    expect(tasks[3].department).toBe("operations");
    expect(tasks[3].proposed_agent).toBe("ops-coordinator");
    expect(tasks[3].quality_reviewer?.slug).toBe("qa-review");
    const slugs = (corrected.allocation?.selected_agents || []).map((a) => a.slug);
    for (const s of [
      "executive-ceo",
      "hr-workforce-planner",
      "platform-security",
      "ops-coordinator",
      "qa-review",
    ]) {
      expect(slugs).toContain(s);
    }
    expect(slugs).not.toContain("lead-intelligence");
  });

  it("double-click / repeated idempotency key does not duplicate", () => {
    saveRun(productionSnapshotRun({ version: 3 }));
    const a = returnPlanForCorrections(RUN_ID, {
      actor: "founder",
      idempotency_key: "h33-double",
      expected_version: 3,
    });
    const b = returnPlanForCorrections(RUN_ID, {
      actor: "founder",
      idempotency_key: "h33-double",
      expected_version: 3,
    });
    expect(a.id).toBe(b.id);
    expect(listRuns({ project_id: PROJECT_ID }).length).toBe(1);
  });

  it("stale version fails closed with CONFLICT", () => {
    saveRun(productionSnapshotRun({ version: 5 }));
    expect(() =>
      returnPlanForCorrections(RUN_ID, {
        actor: "founder",
        expected_version: 4,
        idempotency_key: "stale-v",
      })
    ).toThrow(/version conflict/i);
    expect(getRun(RUN_ID).current_stage).toBe("simulation_approval_required");
    expect(listRuns({ project_id: PROJECT_ID }).length).toBe(1);
  });

  it("wrong expected stage fails closed", () => {
    saveRun(productionSnapshotRun());
    expect(() =>
      returnPlanForCorrections(RUN_ID, {
        actor: "founder",
        expected_stage: "founder_approval_required",
        idempotency_key: "wrong-stage",
      })
    ).toThrow(/stage conflict/i);
    expect(getRun(RUN_ID).current_stage).toBe("simulation_approval_required");
  });

  it("missing run fails closed", () => {
    expect(() =>
      returnPlanForCorrections("missing-run", { actor: "founder", idempotency_key: "missing" })
    ).toThrow(/not found/i);
  });

  it("cross-project request fails closed", () => {
    saveRun(productionSnapshotRun());
    expect(() =>
      returnPlanForCorrections(RUN_ID, {
        actor: "founder",
        project_id: "other-project-id",
        idempotency_key: "cross-proj",
      })
    ).toThrow(/project scope/i);
    expect(getRun(RUN_ID).current_stage).toBe("simulation_approval_required");
    expect(listRuns({ project_id: PROJECT_ID }).length).toBe(1);
  });

  it("canonical run changing mid-request (second tab) uses version conflict", () => {
    saveRun(productionSnapshotRun({ version: 2 }));
    // Simulate other tab advancing version without completing correction
    const run = getRun(RUN_ID);
    run.version = 9;
    saveRun(run);
    expect(() =>
      returnPlanForCorrections(RUN_ID, {
        actor: "founder",
        expected_version: 2,
        idempotency_key: "two-tabs",
      })
    ).toThrow(/version conflict/i);
    expect(listRuns({ project_id: PROJECT_ID }).length).toBe(1);
  });

  it("query-error empty model does not fabricate completions", () => {
    const vm = buildFounderProofViewModel({
      hasProject: true,
      run: null,
      resolverError: "network failure",
    });
    expect(vm.resolverError).toBe("network failure");
    expect(vm.completedSteps).not.toContain("simulation");
    expect(vm.completedSteps).not.toContain("evidence");
  });

  it("after correction, re-approve plan moves to simulation_approval only", () => {
    saveRun(productionSnapshotRun());
    let run = returnPlanForCorrections(RUN_ID, { actor: "founder" });
    run = decideFounderApproval(run.id, "approve_simulation", { actor: "founder" });
    expect(run.current_stage).toBe("simulation_approval_required");
    expect(run.status).toBe("awaiting_simulation_approval");
    expect(run.provider_called).not.toBe(true);
    const vm = buildFounderProofViewModel({ hasProject: true, run });
    expect(vm.currentStep).toBe("simulation_approval");
    expect(vm.completedSteps).not.toContain("simulation");
  });

  it("objective title preserved through correction", () => {
    saveRun(
      productionSnapshotRun({
        objective: {
          ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
          title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title,
          is_production_proof: true,
        },
      })
    );
    const corrected = returnPlanForCorrections(RUN_ID, { actor: "founder" });
    expect(corrected.objective.title).toBe(FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title);
  });
});
