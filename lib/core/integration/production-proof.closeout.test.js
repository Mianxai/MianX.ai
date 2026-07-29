/**
 * Phase H production proof closeout — health truth, persistence, gates.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  __resetIntegrationRuntime,
  buildIntegrationReadiness,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
  buildProductionProofObjective,
  assertExplicitFounderConfirmation,
  mapProofStatusFromRun,
  PROOF_STATUSES,
  createIntegrationRun,
  submitClarification,
  generateIntegrationPlan,
  decideFounderApproval,
  decideSimulationApproval,
  startIntegrationSimulation,
  pauseIntegrationRun,
  resumeIntegrationRun,
  recoverIntegrationRun,
  decideFinalReview,
  evaluateProtectedAction,
  getRun,
  deriveMigrationReadiness,
  isProductionLike,
} from "./index.js";

describe("Phase H production proof closeout", () => {
  const prevRequire = process.env.MIANX_REQUIRE_DURABLE_INTEGRATION;

  beforeEach(() => {
    __resetIntegrationRuntime();
    delete process.env.MIANX_REQUIRE_DURABLE_INTEGRATION;
  });

  afterEach(() => {
    if (prevRequire === undefined) delete process.env.MIANX_REQUIRE_DURABLE_INTEGRATION;
    else process.env.MIANX_REQUIRE_DURABLE_INTEGRATION = prevRequire;
  });

  it("sync readiness does not hardcode Phase H migration as pending", () => {
    const health = buildIntegrationReadiness({});
    expect(health.migrationReadiness.pending).toEqual([]);
    expect(JSON.stringify(health)).not.toMatch(/20260728210000_phase_h/);
    expect(health.pendingMigrationsKnown).toBeUndefined();
    expect(health.integrationProofStatus).toBe("not_started");
    expect(health.lastSuccessfulSimulationAt).toBeNull();
    expect(health.lastProofStartedAt).toBeNull();
    expect(health.lastProofCompletedAt).toBeNull();
    expect(health.fabricated_live_execution).toBe(false);
    expect(health.simulationReady).toBe(false);
    expect(health.integrationPersistenceReady).toBe(false);
  });

  it("applied schema capabilities are not reported as pending migrations", () => {
    const ready = deriveMigrationReadiness({
      supabaseConfigured: true,
      tables: {
        integration_runs: true,
        integration_stage_events: true,
        integration_checkpoints: true,
        integration_evidence_manifests: true,
        integration_failure_events: true,
      },
      allPresent: true,
      anyUnknown: false,
    });
    expect(ready.status).toBe("applied_or_equivalent");
    expect(ready.pending).toEqual([]);
    expect(JSON.stringify(ready)).not.toMatch(/20260728210000_phase_h/);
  });

  it("missing integration schema fails readiness (no false green)", () => {
    const missing = deriveMigrationReadiness({
      supabaseConfigured: true,
      tables: {
        integration_runs: false,
        integration_stage_events: true,
        integration_checkpoints: true,
        integration_evidence_manifests: true,
        integration_failure_events: true,
      },
      allPresent: false,
      anyUnknown: false,
    });
    expect(missing.status).toBe("schema_missing");
    expect(missing.pending.some((p) => p.includes("integration_runs"))).toBe(true);
  });

  it("unknown probe status refuses to invent a pending migration list", () => {
    const unknown = deriveMigrationReadiness({
      supabaseConfigured: true,
      tables: {
        integration_runs: false,
        integration_stage_events: false,
        integration_checkpoints: false,
        integration_evidence_manifests: false,
        integration_failure_events: false,
      },
      allPresent: false,
      anyUnknown: true,
    });
    expect(unknown.status).toBe("unknown");
    expect(unknown.pending).toEqual([]);
  });

  it("production-like flag enables fail-closed persistence requirement", () => {
    process.env.MIANX_REQUIRE_DURABLE_INTEGRATION = "1";
    expect(isProductionLike()).toBe(true);
  });

  it("proof remains not_started before Founder action and timestamps stay null from in-process runs", () => {
    const health = buildIntegrationReadiness({});
    expect(health.integrationProofStatus).toBe("not_started");
    expect(PROOF_STATUSES).toContain("not_started");

    createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: "proj-unit-proof",
        unresolved_questions: [],
      },
      { actor: "test" }
    );
    const after = buildIntegrationReadiness({});
    expect(after.lastProofStartedAt).toBeNull();
    expect(after.lastProofCompletedAt).toBeNull();
    expect(after.lastSuccessfulSimulationAt).toBeNull();
  });

  it("explicit Founder confirmation required for production proof start", () => {
    expect(() => assertExplicitFounderConfirmation(false)).toThrow(/confirmation/i);
    expect(() => assertExplicitFounderConfirmation(undefined)).toThrow(/confirmation/i);
    expect(() => assertExplicitFounderConfirmation(true)).not.toThrow();
    expect(() => assertExplicitFounderConfirmation("CONFIRM_PRODUCTION_PROOF")).not.toThrow();
    expect(buildProductionProofObjective({ project_id: "proj-1" }).title).toMatch(
      /Employee Onboarding/i
    );
    expect(buildProductionProofObjective({ project_id: "proj-1" }).protected_actions).toContain(
      "production_deployment"
    );
  });

  it("pause/resume and recovery persist on the run object", () => {
    let { run } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: "proj-pause",
        unresolved_questions: [],
      },
      { actor: "founder" }
    );
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        clear_questions: true,
      }));
    }
    run = generateIntegrationPlan(run.id, { actor: "founder" });
    run = decideFounderApproval(run.id, "approve_simulation", { actor: "founder" });
    run = decideSimulationApproval(run.id, "approve", { actor: "founder" });
    run = startIntegrationSimulation(run.id, { actor: "founder" });

    run = pauseIntegrationRun(run.id, { actor: "founder" });
    expect(run.current_stage === "paused" || run.status === "paused").toBe(true);
    const pausedId = run.id;

    run = resumeIntegrationRun(pausedId, { actor: "founder" });
    expect(run.status).not.toBe("paused");

    const beforeRecovery = run.recovery_count || 0;
    run = recoverIntegrationRun(run.id, { actor: "founder" });
    expect(run.recovery_count).toBe(beforeRecovery + 1);
    expect(getRun(run.id).recovery_count).toBe(run.recovery_count);
  });

  it("duplicate approval is idempotent", () => {
    let { run } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: "proj-idem",
        unresolved_questions: [],
      },
      { actor: "founder", idempotency_key: "idem-approve-1" }
    );
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        clear_questions: true,
      }));
    }
    run = generateIntegrationPlan(run.id, { actor: "founder" });
    const first = decideFounderApproval(run.id, "approve_simulation", { actor: "founder" });
    const second = decideFounderApproval(run.id, "approve_simulation", { actor: "founder" });
    expect(second.id).toBe(first.id);
    expect(second.current_stage).toBe(first.current_stage);
  });

  it("protected production_deployment stays blocked in simulation", () => {
    const r = evaluateProtectedAction("production_deployment", {
      execution_mode: "deterministic_simulation",
      founder_approved: false,
      live_execution_ready: false,
    });
    expect(r.allowed).toBe(false);
    expect(r.blocked || r.status === "blocked" || r.executed === false).toBeTruthy();
  });

  it("provider gating keeps live execution false without provider", () => {
    const health = buildIntegrationReadiness({});
    expect(health.liveExecutionReady).toBe(false);
  });

  it("final review requires explicit Founder action (no auto-approve)", () => {
    let { run } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: "proj-final",
        unresolved_questions: [],
      },
      { actor: "founder" }
    );
    if (run.current_stage === "clarification_required") {
      ({ run } = submitClarification(run.id, {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        clear_questions: true,
      }));
    }
    run = generateIntegrationPlan(run.id, { actor: "founder" });
    run = decideFounderApproval(run.id, "approve_simulation", { actor: "founder" });
    run = decideSimulationApproval(run.id, "approve", { actor: "founder" });
    run = startIntegrationSimulation(run.id, { actor: "founder" });
    expect(() =>
      decideFinalReview(run.id, "approve", { auto_approve: true })
    ).toThrow(/auto-approved/i);
    run = decideFinalReview(run.id, "approve", { actor: "founder" });
    expect(run.current_stage).toBe("completed");
  });

  it("cross-project run isolation is enforced at create boundaries", () => {
    const { run: a } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: "proj-a",
        unresolved_questions: [],
      },
      { actor: "founder" }
    );
    const { run: b } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: "proj-b",
        unresolved_questions: [],
      },
      { actor: "founder" }
    );
    expect(a.project_id).toBe("proj-a");
    expect(b.project_id).toBe("proj-b");
    expect(a.id).not.toBe(b.id);
  });

  it("health truth fields are present on sync contract", () => {
    const health = buildIntegrationReadiness({});
    for (const key of [
      "templateEngineReady",
      "planningEngineReady",
      "executionEngineReady",
      "workforceReady",
      "memoryReady",
      "learningReady",
      "integrationOrchestratorReady",
      "integrationPersistenceReady",
      "routableAgentCount",
      "providerStatus",
      "simulationReady",
      "liveExecutionReady",
      "schedulerStatus",
      "durableRateLimiterStatus",
      "migrationReadiness",
      "integrationProofStatus",
      "lastSuccessfulSimulationAt",
      "lastFailedSimulationAt",
      "lastProofStartedAt",
      "lastProofCompletedAt",
      "fabricated_live_execution",
    ]) {
      expect(health).toHaveProperty(key);
    }
    expect(health.durableRateLimiterStatus.durable).toBe(false);
  });

  it("mapProofStatusFromRun covers lifecycle states", () => {
    expect(mapProofStatusFromRun({ current_stage: "completed", status: "completed" })).toBe(
      "completed"
    );
    expect(mapProofStatusFromRun({ current_stage: "rejected", status: "rejected" })).toBe(
      "rejected"
    );
    expect(mapProofStatusFromRun({ current_stage: "paused", status: "paused" })).toBe("paused");
    expect(mapProofStatusFromRun({ current_stage: "founder_final_review" })).toBe(
      "awaiting_final_review"
    );
    expect(mapProofStatusFromRun({ current_stage: "founder_approval_required" })).toBe(
      "awaiting_plan_approval"
    );
    expect(mapProofStatusFromRun({ current_stage: "tasks_claimed", status: "active" })).toBe(
      "simulation_running"
    );
  });
});
