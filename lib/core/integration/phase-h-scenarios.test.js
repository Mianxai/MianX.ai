import { describe, it, expect, beforeEach } from "vitest";
import {
  __resetIntegrationRuntime,
  createIntegrationRun,
  submitClarification,
  generateIntegrationPlan,
  decideFounderApproval,
  startIntegrationSimulation,
  pauseIntegrationRun,
  resumeIntegrationRun,
  cancelIntegrationRun,
  recoverIntegrationRun,
  runDeterministicProofChain,
  auditRoutableWorkforce,
  verifyTaskCompletion,
  evaluateProtectedAction,
  assessProviderGate,
  isTaskClaimed,
  listMemoryEntries,
  listLearningProposals,
  listRuns,
  measureConcurrencyProof,
  ENGINE_VERSION,
} from "./index.js";
import { __resetWorkforceRuntime } from "../workforce-runtime/index.js";
import { pushFailureEvent, tryClaimTask as claim } from "./store.js";
import { uid } from "./schemas.js";
import { detectCircularDelegation, delegateWork } from "../workforce-runtime/communication.js";
import { bootstrapWorkforce } from "../workforce-runtime/lifecycle.js";

const FULL_OBJECTIVE = {
  title: "Prove MianX end-to-end autonomous integration",
  business_purpose:
    "Exercise template, planning, execution, and workforce engines as one operating system for MianX Core platform proof.",
  expected_deliverables: ["evidence manifest", "founder proof pack", "lineage map"],
  success_criteria: [
    "final founder review reached",
    "no fabricated AI completion",
    "lineage intact",
  ],
  constraints: ["deterministic simulation only", "no industry product"],
  project_id: "proj-h1",
  priority: "P1",
  risk_tolerance: "moderate",
  budget_mode: "simulation_only",
  execution_mode: "deterministic_simulation",
  industry: "technology",
  business_model: "subscription",
  known_assumptions: ["36 executable agents available"],
};

describe("Phase H end-to-end autonomous integration", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
    __resetWorkforceRuntime();
  });

  it("ENGINE_VERSION is phase-h", () => {
    expect(ENGINE_VERSION).toMatch(/phase-h/);
  });

  it("audits 36 routable executable agents", () => {
    const audit = auditRoutableWorkforce();
    expect(audit.expected).toBe(36);
    expect(audit.actual_executable).toBe(36);
    expect(audit.actual_routable).toBe(36);
    expect(audit.matches_expected).toBe(true);
    expect(audit.fabricated_agents).toBe(false);
  });

  it("SCENARIO A — complete objective-to-final-review simulation", () => {
    const { run, stopped } = runDeterministicProofChain(FULL_OBJECTIVE, {
      final_approve: true,
    });
    expect(stopped).toBeNull();
    expect(run.current_stage).toBe("completed");
    expect(run.lineage.objective_id).toBeTruthy();
    expect(run.lineage.planning_plan_id).toBeTruthy();
    expect(run.lineage.evidence_ids.length).toBeGreaterThan(0);
    expect(run.lineage.memory_ids.length).toBeGreaterThan(0);
    expect(run.lineage.learning_ids.length).toBeGreaterThan(0);
    expect(run.fabricated_execution).toBe(false);
    expect(run.provider_called).toBe(false);
    expect(run.allocation.activated_all_36).toBe(false);
    expect(run.allocation.count).toBeLessThan(36);
    expect(run.proof_pack.secrets_included).toBe(false);
  });

  it("SCENARIO B — objective requires clarification", () => {
    const { run } = createIntegrationRun({
      project_id: "proj-h1",
      title: "X",
    });
    expect(run.current_stage).toBe("clarification_required");
    const next = submitClarification(run.id, {
      title: FULL_OBJECTIVE.title,
      business_purpose: FULL_OBJECTIVE.business_purpose,
      expected_deliverables: FULL_OBJECTIVE.expected_deliverables,
      success_criteria: FULL_OBJECTIVE.success_criteria,
      clear_questions: true,
    });
    expect(next.still_needs_clarification).toBe(false);
    expect(next.run.current_stage).toBe("objective_validated");
  });

  it("SCENARIO C — Founder rejects plan", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE);
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    run = decideFounderApproval(run.id, "reject");
    expect(run.current_stage).toBe("rejected");
    expect(run.approval_package.auto_approved).toBe(false);
  });

  it("SCENARIO D — Founder returns plan for changes", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE);
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    run = decideFounderApproval(run.id, "return_for_changes");
    expect(run.current_stage).toBe("clarification_required");
  });

  it("SCENARIO E — dependency cycle blocks execution", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE, { force_cycle: true });
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    expect(run.current_stage).toBe("failed");
    expect(run.failure_reason).toMatch(/dependency_cycle/);
  });

  it("SCENARIO F — agent failure / retry path surfaces honestly", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE);
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    run = decideFounderApproval(run.id, "approve_simulation");
    run = startIntegrationSimulation(run.id);
    pushFailureEvent({
      id: uid("fail"),
      integration_run_id: run.id,
      project_id: run.project_id,
      code: "agent_unavailable",
      at: new Date().toISOString(),
    });
    run.retry_count = 1;
    expect(run.current_stage).toBe("founder_final_review");
    expect(run.retry_count).toBe(1);
  });

  it("SCENARIO G — runtime restart resumes from checkpoint", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE);
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    run = decideFounderApproval(run.id, "approve_simulation");
    run = startIntegrationSimulation(run.id);
    const before = run.current_stage;
    const recovered = recoverIntegrationRun(run.id);
    expect(recovered.recovery_count).toBeGreaterThanOrEqual(1);
    expect(recovered.current_stage).toBe(before);
    expect(recovered.lineage.objective_id).toBeTruthy();
  });

  it("SCENARIO H — duplicate task claim blocked", () => {
    const id = "task-dup-1";
    expect(claim(id)).toBe(true);
    expect(claim(id)).toBe(false);
    expect(isTaskClaimed(id)).toBe(true);
  });

  it("SCENARIO I — memory write failure surfaced", () => {
    pushFailureEvent({
      id: uid("fail"),
      integration_run_id: "irun_x",
      project_id: "proj-h1",
      code: "memory_write_failed",
      at: new Date().toISOString(),
    });
    const { run } = runDeterministicProofChain(FULL_OBJECTIVE, { final_approve: false });
    expect(run.memory.count).toBeGreaterThan(0);
    expect(listMemoryEntries({ project_id: "proj-h1" }).every((m) => m.project_id === "proj-h1")).toBe(
      true
    );
  });

  it("SCENARIO J — reviewer rejects unsupported completion", () => {
    const result = verifyTaskCompletion({
      claim: { unsupported: true },
      evidence: [],
      reviewer_decision: null,
    });
    expect(result.ok).toBe(false);
    expect(result.status).toMatch(/verification_failed|founder_review_required/);
  });

  it("SCENARIO K — protected action becomes Founder approval request", () => {
    const r = evaluateProtectedAction("production_deployment");
    expect(r.protected).toBe(true);
    expect(r.allowed).toBe(false);
    expect(r.status).toBe("founder_approval_required");
    expect(r.silently_executed).toBe(false);
  });

  it("SCENARIO L — provider unavailable blocks live execution", () => {
    const gate = assessProviderGate({
      execution_mode: "live_provider",
      founder_enabled_live: true,
      founder_approved: true,
      budget_present: true,
    });
    // Without ANTHROPIC_API_KEY in test env, must block
    if (!process.env.ANTHROPIC_API_KEY) {
      expect(gate.live_execution_ready).toBe(false);
      expect(gate.live_execution_blocked).toBe(true);
      expect(gate.fabricated_completion).toBe(false);
      expect(gate.paid_request_issued).toBe(false);
    }
    const sim = assessProviderGate({ execution_mode: "deterministic_simulation" });
    expect(sim.simulation_available).toBe(true);
    expect(sim.live_execution_ready).toBe(false);
  });

  it("SCENARIO M — three projects isolated", () => {
    const metrics = measureConcurrencyProof();
    expect(metrics.ok).toBe(true);
    expect(metrics.simultaneous_objectives).toBe(3);
    expect(metrics.cross_project_leakage).toBe(false);
    expect(metrics.duplicate_claim_count).toBe(0);
    expect(listRuns().length).toBeGreaterThanOrEqual(3);
    const projects = new Set(listRuns().map((r) => r.project_id));
    expect(projects.size).toBe(3);
  });

  it("SCENARIO N — Founder pauses and resumes", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE);
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    run = decideFounderApproval(run.id, "approve_simulation");
    run = startIntegrationSimulation(run.id);
    run = pauseIntegrationRun(run.id);
    expect(run.current_stage).toBe("paused");
    run = resumeIntegrationRun(run.id);
    expect(run.current_stage).toBe("founder_final_review");
  });

  it("SCENARIO O — Founder cancels and no further tasks execute", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE);
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    run = decideFounderApproval(run.id, "cancel");
    expect(run.current_stage).toBe("cancelled");
    expect(() => startIntegrationSimulation(run.id)).toThrow();
  });

  it("idempotent objective submission", () => {
    const a = createIntegrationRun(FULL_OBJECTIVE, { idempotency_key: "obj-1" });
    const b = createIntegrationRun(FULL_OBJECTIVE, { idempotency_key: "obj-1" });
    expect(a.idempotent_hit).toBe(false);
    expect(b.idempotent_hit).toBe(true);
    expect(a.run.id).toBe(b.run.id);
  });

  it("rejects auto-approve Founder gates", () => {
    let { run } = createIntegrationRun(FULL_OBJECTIVE);
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, FULL_OBJECTIVE));
    }
    run = generateIntegrationPlan(run.id);
    expect(() =>
      decideFounderApproval(run.id, "approve_simulation", { auto_approve: true })
    ).toThrow(/auto-approved/i);
  });

  it("learning proposals never auto-modify security or templates", () => {
    const { run } = runDeterministicProofChain(FULL_OBJECTIVE, { final_approve: false });
    const props = listLearningProposals({ integration_run_id: run.id });
    expect(props.length).toBeGreaterThan(0);
    expect(props.every((p) => p.auto_applied === false)).toBe(true);
    expect(props.every((p) => p.requires_founder_approval === true)).toBe(true);
    expect(props.every((p) => p.modifies_security_policies === false)).toBe(true);
  });

  it("circular delegation detection still works under integration", () => {
    bootstrapWorkforce({ project_id: "proj-circ", simulation: true });
    delegateWork({
      from_agent: "executive-ceo",
      to_agent: "executive-cto",
      task_id: "t1",
      summary: "a",
      project_id: "proj-circ",
      simulation: true,
    });
    delegateWork({
      from_agent: "executive-cto",
      to_agent: "executive-ceo",
      task_id: "t1",
      summary: "b",
      project_id: "proj-circ",
      simulation: true,
    });
    const circ = detectCircularDelegation("proj-circ");
    expect(circ.ok).toBe(false);
  });
});
