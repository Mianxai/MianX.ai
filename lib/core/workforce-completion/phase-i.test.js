import { describe, it, expect } from "vitest";
import {
  listActiveAgentDefinitions,
  listAgentDefinitions,
  EXPECTED_EXECUTABLE_AGENT_COUNT,
  EXPECTED_CATALOGUE_AGENT_COUNT,
} from "../agents";
import {
  buildWorkforceCompletionMatrix,
  classifyCatalogueGaps,
  validateAgentExecutionContract,
  buildMinimalValidContract,
  assertDelegation,
  detectCircularDelegation,
  assertCannotSelfApprove,
  assertWorkflowRoutingCoverage,
  auditCanonicalWorkflows,
  buildCanonicalEvidenceRecord,
  buildFounderProofHumanSummary,
  assertProjectIsolation,
  canTransitionInstance,
  INSTANCE_LIFECYCLE,
  assertSimulationNotTrustedMemory,
  assertNoCrossProjectMemory,
  assertSafeCapabilityPromotion,
  buildMemoryLearningPipelineFromTask,
  auditQueueReliabilityPath,
  buildPhaseIProductionReadiness,
  MAX_DELEGATION_DEPTH,
} from "./index";

describe("Phase I workforce completion", () => {
  it("locks catalogue 43 and executable 38 after gap classification", () => {
    expect(listAgentDefinitions()).toHaveLength(EXPECTED_CATALOGUE_AGENT_COUNT);
    expect(listActiveAgentDefinitions()).toHaveLength(EXPECTED_EXECUTABLE_AGENT_COUNT);
    expect(EXPECTED_EXECUTABLE_AGENT_COUNT).toBe(38);
    expect(listActiveAgentDefinitions().length).toBeLessThanOrEqual(50);
  });

  it("builds completion matrix with verified totals", () => {
    const m = buildWorkforceCompletionMatrix();
    expect(m.totals.catalogue).toBe(43);
    expect(m.totals.executable).toBe(38);
    expect(m.totals.nonExecutable).toBe(5);
    expect(m.totals.duplicateDefinitions).toBe(0);
    expect(m.matchesExpected).toBe(true);
    expect(m.totals.departments).toBe(20);
    expect(m.totals.capacitySlots).toBe(445);
    expect(m.agents).toHaveLength(43);
  });

  it("reports before/after gap classification", () => {
    const gaps = classifyCatalogueGaps();
    expect(gaps.before.executable).toBe(36);
    expect(gaps.after.executable).toBe(38);
    expect(gaps.after.promoted).toEqual(["follow-up-draft", "release-readiness"]);
    expect(gaps.after.superseded).toHaveLength(5);
  });

  it("fails closed on incomplete execution contract", () => {
    expect(validateAgentExecutionContract({}).valid).toBe(false);
    expect(validateAgentExecutionContract(buildMinimalValidContract()).valid).toBe(true);
    expect(
      validateAgentExecutionContract(buildMinimalValidContract({ projectId: null })).valid
    ).toBe(false);
  });

  it("enforces hierarchical delegation bounds", () => {
    expect(() => assertDelegation("executive-ceo", "executive-cto")).not.toThrow();
    expect(() => assertDelegation("executive-ceo", "executive-ceo")).toThrow();
    expect(() => assertDelegation("qa-review", "executive-ceo")).toThrow();
    expect(detectCircularDelegation({ a: ["b"], b: ["a"] }).length).toBeGreaterThan(0);
    expect(() =>
      assertCannotSelfApprove({
        actorSlug: "delivery-engineer",
        authorSlug: "delivery-engineer",
      })
    ).toThrow();
    expect(() =>
      assertCannotSelfApprove({
        actorSlug: "ops-coordinator",
        authorSlug: "delivery-engineer",
        protectedAction: true,
      })
    ).toThrow();
    expect(MAX_DELEGATION_DEPTH).toBe(5);
  });

  it("covers all canonical workflows with executable routing paths", () => {
    const routing = assertWorkflowRoutingCoverage();
    expect(routing.allCovered).toBe(true);
    const audit = auditCanonicalWorkflows();
    expect(audit.allOperational).toBe(true);
    expect(audit.workflows.some((w) => w.id === "employee-onboarding-founder-proof")).toBe(
      true
    );
  });

  it("validates evidence contract and human proof summary", () => {
    const rec = buildCanonicalEvidenceRecord({
      taskId: "t1",
      agentInstance: "ai1",
      workflow: "software-delivery",
      stage: "qa",
      inputHash: "abc",
      output: { ok: true },
      evidence: ["e1"],
      validationResult: { valid: true },
      qaReview: { verdict: "pass" },
      correlationId: "c1",
      projectScope: { projectId: "p1", organizationId: null },
      simulationOrProviderMode: "deterministic",
      protectedActionResult: null,
      memoryCandidates: [],
      learningCandidates: [],
    });
    expect(rec.taskId).toBe("t1");
    const summary = buildFounderProofHumanSummary({
      objective: { title: "Onboarding" },
      status: "awaiting_final_review",
      allocation: { selected: [{ slug: "executive-ceo" }] },
      payload: { tasks: [{ status: "completed" }] },
      evidence: [{}],
      memory: [],
      learning: [],
    });
    expect(summary.objective).toBe("Onboarding");
    expect(summary.agentsUsed).toContain("executive-ceo");
  });

  it("supports instance lifecycle + project isolation", () => {
    expect(INSTANCE_LIFECYCLE).toContain("proposed");
    expect(INSTANCE_LIFECYCLE).toContain("released");
    expect(canTransitionInstance("idle", "assigned")).toBe(true);
    expect(canTransitionInstance("archived", "idle")).toBe(false);
    expect(() =>
      assertProjectIsolation({ project_id: "p1" }, "p2")
    ).toThrow();
    expect(() => assertProjectIsolation({ project_id: "p1" }, "p1")).not.toThrow();
  });

  it("enforces memory and learning safety rules", () => {
    expect(() =>
      assertSimulationNotTrustedMemory({
        sourceMode: "simulation",
        targetStatus: "active",
      })
    ).toThrow();
    expect(() =>
      assertNoCrossProjectMemory({
        memoryProjectId: "a",
        requestProjectId: "b",
      })
    ).toThrow();
    expect(() =>
      assertSafeCapabilityPromotion({
        fromCapabilities: [],
        toCapabilities: ["production_deployment"],
      })
    ).toThrow();
    const pipe = buildMemoryLearningPipelineFromTask({
      taskId: "t1",
      projectId: "p1",
      output: { note: "x" },
    });
    expect(pipe.memoryCandidate.status).toBe("candidate");
    expect(pipe.learningProposal.status).toBe("proposed");
  });

  it("reports honest queue and rate-limit status", () => {
    const q = auditQueueReliabilityPath();
    expect(q.features.fabricatedRunningJobs).toBe(false);
    expect(q.rateLimit.durable).toBe(false);
    expect(q.rateLimit.modes.unconfiguredDurable).toBe(true);
    const readiness = buildPhaseIProductionReadiness();
    expect(readiness.uiCategories.map((c) => c.id)).toEqual([
      "core",
      "workforce",
      "automation",
      "intelligence",
      "governance",
    ]);
    expect(readiness.routingCovered).toBe(true);
  });
});
