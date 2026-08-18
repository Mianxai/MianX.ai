import { describe, it, expect } from "vitest";
import {
  assertSeatRegistryInvariants,
  compileCapacitySeats,
  compileRoleArchetypes,
  reconcileDepartmentBaseline,
  buildWorkforceActivationChecklist,
  oneKeyActivationStatus,
  auditWorkforceSources,
  compileRoleVariant,
  compileAgentPrompt,
  allocateSeatToProject,
  releaseInstance,
  resetWorkforceI2Stores,
  bootstrapWorkforceRegistryInMemory,
  runSoftwareHouseTestDoubleE2E,
  durableRateLimitStatus,
  DEPARTMENT_BASELINE,
  AUTHORITATIVE_CAPACITY,
} from "./index";
import { auditRealAgentWorkflowCoverage } from "../real-agent/workflow-coverage";

describe("Phase I.2 workforce completion", () => {
  it("audits sources with explicit conflict resolution", () => {
    const audit = auditWorkforceSources();
    expect(audit.entryCount).toBeGreaterThan(10);
    expect(audit.precedenceOrder[0]).toBe("governance_constitution");
    const conflict = audit.conflicts.find((c) => c.id === "capacity_445_vs_258");
    if (conflict) expect(conflict.winningValue).toBe(445);
  });

  it("compiles archetypes without fabrications", () => {
    const a = compileRoleArchetypes();
    expect(a.fabrications).toBe(0);
    expect(a.count).toBeGreaterThan(50);
    expect(a.poolArchetypes).toBeGreaterThan(0);
  });

  it("compiles exactly 445 mapped seats across 20 departments", () => {
    const seats = compileCapacitySeats();
    expect(seats.capacitySeats).toBe(AUTHORITATIVE_CAPACITY);
    expect(seats.mappedSeats).toBe(445);
    expect(seats.orphanSeats).toBe(0);
    expect(seats.invalidSeats).toBe(0);
    expect(seats.fabrications).toBe(0);
    const inv = assertSeatRegistryInvariants(seats);
    expect(inv.ok).toBe(true);
    for (const [slug, n] of Object.entries(DEPARTMENT_BASELINE)) {
      expect(seats.seatsByDepartment[slug]).toBe(n);
    }
    const recon = reconcileDepartmentBaseline();
    expect(recon.documentedDepartmentTotal).toBe(445);
    expect(recon.finalApprovedRegistryTotal).toBe(445);
  });

  it("compiles role variants with governance bounds", () => {
    const seats = compileCapacitySeats();
    const eng = seats.seats.find((s) => s.department === "engineering");
    const ok = compileRoleVariant({
      archetypeId: eng.roleArchetypeId,
      specialization: "backend",
      seniorityLevel: "L5",
    });
    expect(ok.ok).toBe(true);
    expect(ok.variant.contractHash).toBeTruthy();
    const fake = compileRoleVariant({
      archetypeId: eng.roleArchetypeId,
      specialization: "backend",
      seniorityLevel: "L1",
    });
    expect(fake.ok).toBe(false);
    const badSpec = compileRoleVariant({
      archetypeId: eng.roleArchetypeId,
      specialization: "totally_fake_capability_xyz",
    });
    expect(badSpec.ok).toBe(false);
  });

  it("compiles Prompt OS layers without secrets", () => {
    const seats = compileCapacitySeats();
    const s = seats.seats[0];
    const prompt = compileAgentPrompt({
      archetypeId: s.roleArchetypeId,
      seatId: s.seatId,
      projectId: "p1",
      objectiveTitle: "Test with api_key=sk-secret-should-redact",
    });
    expect(prompt.secretsScrubbed).toBe(true);
    expect(prompt.system).not.toMatch(/sk-secret/);
    expect(prompt.tokenEstimate).toBeGreaterThan(50);
  });

  it("allocates and releases seats with project isolation", () => {
    resetWorkforceI2Stores();
    bootstrapWorkforceRegistryInMemory();
    const a = allocateSeatToProject({ department: "product", projectId: "proj-a" });
    expect(a.ok).toBe(true);
    const b = allocateSeatToProject({ department: "product", projectId: "proj-b" });
    expect(b.ok).toBe(true);
    expect(a.instance.project_id).not.toBe(b.instance.project_id);
    const rel = releaseInstance(a.instance.id, { projectId: "proj-a" });
    expect(rel.ok).toBe(true);
    expect(releaseInstance(b.instance.id, { projectId: "wrong" }).ok).toBe(false);
  });

  it("covers 13/13 workflows and reports one-key OpenRouter status", () => {
    const w = auditRealAgentWorkflowCoverage();
    expect(w.founderFamiliesMapped).toBe(13);
    const one = oneKeyActivationStatus();
    expect(one.requiredKey).toBe("OPENROUTER_API_KEY");
    expect(one.paidFallbackEnabled).toBe(false);
    expect(one.rolesNeedManualProviderRewrite).toBe(false);
    const checklist = buildWorkforceActivationChecklist();
    expect(checklist.items).toHaveLength(10);
    expect(checklist.completionTruth.liveTested).toBe(0);
    expect(checklist.capacity.capacitySeats).toBe(445);
  });

  it("reports durable rate limiter without requiring Redis", () => {
    const status = durableRateLimitStatus();
    expect(status.externalRedisRequired).toBe(false);
    expect(status.label).toMatch(/Durable rate limiter/);
  });

  it("runs software-house test-double E2E without network", async () => {
    const e2e = await runSoftwareHouseTestDoubleE2E();
    expect(e2e.liveProviderCalled).toBe(false);
    expect(e2e.ok).toBe(true);
    expect(e2e.assertions.projectIsolation).toBe(true);
    expect(e2e.assertions.independentQa).toBe(true);
  });
});
