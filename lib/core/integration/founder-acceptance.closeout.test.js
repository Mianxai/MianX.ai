/**
 * Phase H Founder Acceptance Closeout — deterministic end-to-end proof.
 * Exercises the real orchestrator APIs (not UI mocks). No provider calls.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  __resetIntegrationRuntime,
  createIntegrationRun,
  submitClarification,
  generateIntegrationPlan,
  decideFounderApproval,
  decideSimulationApproval,
  startIntegrationSimulation,
  decideFinalReview,
  pauseIntegrationRun,
  resumeIntegrationRun,
  cancelIntegrationRun,
  recoverIntegrationRun,
  auditRoutableWorkforce,
  verifyTaskCompletion,
  assessProviderGate,
  evaluateProtectedAction,
  listMemoryEntries,
  listLearningProposals,
  listClaimedTasks,
  listAudit,
  listCheckpoints,
  listFailureEvents,
  getRun,
  measureConcurrencyProof,
  buildIntegrationReadiness,
  buildProofPack,
} from "./index.js";
import { __resetWorkforceRuntime, listAgentStates } from "../workforce-runtime/index.js";
import { delegateWork } from "../workforce-runtime/communication.js";
import { tryClaimTask } from "./store.js";

const PRIMARY_OBJECTIVE = {
  title: "Secure internal employee onboarding workflow",
  business_purpose:
    "Design a secure internal employee onboarding workflow for a generic digital company, covering identity, access provisioning, and Founder-visible evidence.",
  expected_deliverables: [
    "onboarding workflow blueprint",
    "access provisioning checklist",
    "evidence pack for Founder review",
  ],
  success_criteria: [
    "clarification answered before planning",
    "simulation reaches founder final review",
    "no fabricated live AI completion",
  ],
  constraints: [
    "deterministic simulation only",
    "no industry product",
    "no production deployment",
  ],
  project_id: "proj-founder-primary",
  priority: "P1",
  risk_tolerance: "moderate",
  budget_mode: "simulation_only",
  execution_mode: "deterministic_simulation",
  industry: "technology",
  business_model: "subscription",
  required_approvals: ["founder_simulation", "founder_final_review"],
  protected_actions: ["production_deployment"],
  unresolved_questions: [
    "Which identity provider pattern should the onboarding workflow assume?",
  ],
  known_assumptions: ["Generic digital company — not a vertical OS product"],
};

describe("Phase H Founder acceptance closeout", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
    __resetWorkforceRuntime();
  });

  it("completes authenticated Founder journey with full proof chain", () => {
    const metrics = {
      objective_create_ms: 0,
      plan_generate_ms: 0,
      simulation_start_ms: 0,
      proof_pack_ms: 0,
    };

    // --- Clarification required (do not invent) ---
    let t0 = Date.now();
    let { run } = createIntegrationRun(PRIMARY_OBJECTIVE, {
      actor: "founder",
      idempotency_key: "founder-closeout-primary",
    });
    metrics.objective_create_ms = Date.now() - t0;
    expect(run.current_stage).toBe("clarification_required");
    expect(run.payload.intake.missing_fields || run.objective.unresolved_questions.length).toBeTruthy();
    const objectiveId = run.objective.id;
    const integrationRunId = run.id;

    // Idempotent create
    const dup = createIntegrationRun(PRIMARY_OBJECTIVE, {
      actor: "founder",
      idempotency_key: "founder-closeout-primary",
    });
    expect(dup.idempotent_hit).toBe(true);
    expect(dup.run.id).toBe(integrationRunId);

    // Simulation cannot start; tasks not claimed yet
    expect(() => startIntegrationSimulation(run.id)).toThrow();
    expect(listClaimedTasks().length).toBe(0);

    // --- Clarification ---
    const clarified = submitClarification(
      run.id,
      {
        title: PRIMARY_OBJECTIVE.title,
        business_purpose: PRIMARY_OBJECTIVE.business_purpose,
        expected_deliverables: PRIMARY_OBJECTIVE.expected_deliverables,
        success_criteria: PRIMARY_OBJECTIVE.success_criteria,
        unresolved_questions: [],
        clear_questions: true,
        known_assumptions: [
          ...PRIMARY_OBJECTIVE.known_assumptions,
          "Identity provider: generic SSO pattern",
        ],
      },
      { actor: "founder" }
    );
    expect(clarified.still_needs_clarification).toBe(false);
    run = clarified.run;
    expect(run.current_stage).toBe("objective_validated");
    expect(run.objective.id).toBe(objectiveId);
    expect(run.clarifications.length).toBeGreaterThan(0);
    expect(listAudit({ integration_run_id: run.id }).length).toBeGreaterThan(0);

    // --- Disposable: Return for Changes ---
    t0 = Date.now();
    run = generateIntegrationPlan(run.id, { actor: "founder" });
    metrics.plan_generate_ms = Date.now() - t0;
    expect(run.current_stage).toBe("founder_approval_required");
    expect(run.template_plan).toBeTruthy();
    expect(run.planning_plan).toBeTruthy();
    expect(run.approval_package).toBeTruthy();
    expect(run.approval_package.auto_approved).toBe(false);

    // Inspect template/plan surfaces
    const selected =
      run.template_plan.match?.selected_templates ||
      run.template_plan.selected_templates ||
      [];
    expect(selected.length).toBeGreaterThan(0);
    expect(run.planning_plan.id).toBeTruthy();
    expect(run.execution_preview || run.planning_plan.execution_preview).toBeTruthy();

    // Before approval: still cannot simulate
    expect(() => startIntegrationSimulation(run.id)).toThrow();

    run = decideFounderApproval(run.id, "return_for_changes", { actor: "founder" });
    expect(run.current_stage).toBe("clarification_required");
    ({ run } = submitClarification(
      run.id,
      {
        title: PRIMARY_OBJECTIVE.title,
        business_purpose: PRIMARY_OBJECTIVE.business_purpose,
        expected_deliverables: PRIMARY_OBJECTIVE.expected_deliverables,
        success_criteria: PRIMARY_OBJECTIVE.success_criteria,
        clear_questions: true,
      },
      { actor: "founder" }
    ));
    run = generateIntegrationPlan(run.id, { actor: "founder" });
    expect(run.current_stage).toBe("founder_approval_required");

    // --- Disposable reject scenario ---
    let { run: rejectRun } = createIntegrationRun(
      {
        ...PRIMARY_OBJECTIVE,
        project_id: "proj-founder-reject",
        unresolved_questions: [],
        title: "Disposable reject scenario",
      },
      { actor: "founder", idempotency_key: "founder-closeout-reject" }
    );
    if (rejectRun.current_stage === "clarification_required") {
      ({ run: rejectRun } = submitClarification(rejectRun.id, {
        ...PRIMARY_OBJECTIVE,
        title: "Disposable reject scenario",
        clear_questions: true,
      }));
    }
    rejectRun = generateIntegrationPlan(rejectRun.id);
    rejectRun = decideFounderApproval(rejectRun.id, "reject", { actor: "founder" });
    expect(rejectRun.current_stage).toBe("rejected");
    expect(() =>
      decideFounderApproval(rejectRun.id, "approve_simulation", { auto_approve: true })
    ).toThrow();

    // --- Approve primary plan (does not start simulation) ---
    const approveAgain = decideFounderApproval(run.id, "approve_simulation", {
      actor: "founder",
      note: "Founder acceptance closeout",
    });
    run = approveAgain;
    expect(run.current_stage).toBe("simulation_approval_required");
    expect(run.approval_package.auto_approved).toBe(false);

    run = decideSimulationApproval(run.id, "approve", { actor: "founder" });
    expect(run.current_stage).toBe("approved_for_simulation");

    // Protected action never silent
    const prot = evaluateProtectedAction("production_deployment", {
      integration_run_id: run.id,
      project_id: run.project_id,
    });
    expect(prot.allowed).toBe(false);
    expect(prot.silently_executed).toBe(false);

    // Provider live gating
    const liveGate = assessProviderGate({
      execution_mode: "live_provider",
      founder_enabled_live: true,
      founder_approved: true,
      budget_present: true,
    });
    if (!process.env.ANTHROPIC_API_KEY) {
      expect(liveGate.live_execution_ready).toBe(false);
      expect(liveGate.fabricated_completion).toBe(false);
      expect(liveGate.paid_request_issued).toBe(false);
    }

    // --- Simulation ---
    t0 = Date.now();
    run = startIntegrationSimulation(run.id, { actor: "founder" });
    metrics.simulation_start_ms = Date.now() - t0;
    expect(run.current_stage).toBe("founder_final_review");
    expect(run.allocation.activated_all_36).toBe(false);
    expect(run.allocation.count).toBeGreaterThan(0);
    expect(run.allocation.count).toBeLessThan(38);
    expect(run.fabricated_execution).toBe(false);
    expect(run.provider_called).toBe(false);

    const audit = auditRoutableWorkforce();
    expect(audit.actual_routable).toBe(38);
    expect(audit.actual_executable).toBe(38);

    const agentNames = run.allocation.selected_agents.map((a) => a.slug);
    expect(agentNames.length).toBe(run.allocation.count);
    expect(run.delegation.chain.length).toBeGreaterThanOrEqual(2);

    // Circular rejection
    const a = agentNames[0];
    const b = agentNames.find((s) => s !== a) || "executive-cto";
    expect(() =>
      delegateWork({
        from_agent: a,
        to_agent: b,
        task_id: "circ-attempt",
        summary: "x",
        project_id: run.project_id,
        simulation: true,
      })
    ).not.toThrow();
    expect(() =>
      delegateWork({
        from_agent: b,
        to_agent: a,
        task_id: "circ-attempt",
        summary: "y",
        project_id: run.project_id,
        simulation: true,
      })
    ).toThrow(/Circular delegation rejected/i);

    // Unsupported completion
    const bad = verifyTaskCompletion({
      claim: { unsupported: true, fabricated: true },
      evidence: [],
      reviewer_decision: null,
    });
    expect(bad.ok).toBe(false);
    expect(bad.status).toMatch(/verification_failed|founder_review_required/);

    // Pause / resume
    run = pauseIntegrationRun(run.id, { actor: "founder" });
    expect(run.current_stage).toBe("paused");
    const claimsBefore = listClaimedTasks().length;
    run = resumeIntegrationRun(run.id, { actor: "founder" });
    expect(run.current_stage).toBe("founder_final_review");
    expect(listClaimedTasks().length).toBe(claimsBefore);

    // Recovery
    const beforeRecovery = run.recovery_count || 0;
    run = recoverIntegrationRun(run.id, { actor: "system" });
    expect(run.recovery_count).toBe(beforeRecovery + 1);
    expect(listCheckpoints({ integration_run_id: run.id }).length).toBeGreaterThan(0);
    expect(run.lineage.objective_id).toBe(objectiveId);
    expect(run.evidence).toBeTruthy();

    // Duplicate claim
    const taskId = run.payload.tasks?.[0]?.id;
    if (taskId) {
      expect(tryClaimTask(taskId)).toBe(false);
    }
    const claimed = listClaimedTasks();
    const unique = new Set(claimed);
    expect(claimed.length - unique.size).toBe(0);

    // Memory / learning
    const memory = listMemoryEntries({ integration_run_id: run.id });
    const learning = listLearningProposals({ integration_run_id: run.id });
    expect(memory.length).toBeGreaterThan(0);
    expect(learning.length).toBeGreaterThan(0);
    expect(learning.every((p) => p.auto_applied === false)).toBe(true);
    const cats = new Set(memory.map((m) => m.category));
    expect(cats.has("objective")).toBe(true);
    expect(cats.has("final_lesson") || cats.has("final_lessons")).toBe(true);

    // Proof pack
    t0 = Date.now();
    const pack = run.proof_pack || buildProofPack(run);
    metrics.proof_pack_ms = Date.now() - t0;
    expect(pack.secrets_included).toBe(false);
    expect(pack.correlation_id || run.correlation_id).toBeTruthy();
    expect(pack.trace_id || run.trace_id).toBeTruthy();
    expect(pack.integration_run_id || run.id).toBe(run.id);

    // Health readiness (sync — without durable probes simulation is not ready)
    const health = buildIntegrationReadiness({});
    expect(health.routableAgentCount).toBe(38);
    expect(health.simulationReady).toBe(false);
    expect(health.integrationPersistenceReady).toBe(false);
    expect(health.liveExecutionReady).toBe(false);
    expect(health.integrationOrchestratorReady).toBe(true);
    expect(health.migrationReadiness.pending).toEqual([]);
    expect(JSON.stringify(health)).not.toMatch(/20260728210000_phase_h/);

    // Final review — approve primary
    expect(() =>
      decideFinalReview(run.id, "approve", { auto_approve: true })
    ).toThrow(/auto-approved/i);
    run = decideFinalReview(run.id, "approve", { actor: "founder" });
    expect(run.current_stage).toBe("completed");

    // Disposable final reject
    let { run: finalReject } = createIntegrationRun(
      {
        ...PRIMARY_OBJECTIVE,
        project_id: "proj-founder-final-reject",
        unresolved_questions: [],
        title: "Disposable final reject",
      },
      { actor: "founder", idempotency_key: "founder-closeout-final-reject" }
    );
    if (finalReject.current_stage === "clarification_required") {
      ({ run: finalReject } = submitClarification(finalReject.id, {
        ...PRIMARY_OBJECTIVE,
        title: "Disposable final reject",
        clear_questions: true,
      }));
    }
    finalReject = generateIntegrationPlan(finalReject.id);
    finalReject = decideFounderApproval(finalReject.id, "approve_simulation");
    finalReject = decideSimulationApproval(finalReject.id, "approve");
    finalReject = startIntegrationSimulation(finalReject.id);
    finalReject = decideFinalReview(finalReject.id, "reject", { actor: "founder" });
    expect(finalReject.current_stage).toBe("rejected");

    // Capture primary evidence before isolation reset
    const completedPrimary = getRun(integrationRunId);
    const primary = {
      objective_id: objectiveId,
      integration_run_id: integrationRunId,
      participating_agents: agentNames,
      participating_count: agentNames.length,
      stages_completed: (completedPrimary?.stage_history || []).map((s) => s.stage),
      evidence_count: completedPrimary?.evidence?.count || pack.evidence_manifest?.count || 0,
      memory_count: memory.length,
      learning_count: learning.length,
      duplicate_claim_count: 0,
      recovery_count: completedPrimary?.recovery_count || 0,
      correlation_id: completedPrimary?.correlation_id,
      trace_id: completedPrimary?.trace_id,
      metrics,
      health,
    };
    expect(primary.participating_count).toBeGreaterThan(0);
    expect(primary.metrics.objective_create_ms).toBeGreaterThanOrEqual(0);
    // eslint-disable-next-line no-console
    console.log("FOUNDER_ACCEPTANCE_EVIDENCE", JSON.stringify(primary, null, 2));

    // Three-project isolation (fresh store)
    __resetIntegrationRuntime();
    __resetWorkforceRuntime();
    const iso = measureConcurrencyProof();
    expect(iso.ok).toBe(true);
    expect(iso.cross_project_leakage).toBe(false);
    expect(iso.duplicate_claim_count).toBe(0);
    expect(iso.simultaneous_objectives).toBe(3);
  });
});
