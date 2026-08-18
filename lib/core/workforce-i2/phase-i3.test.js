import { describe, it, expect, beforeEach } from "vitest";
import {
  verifyPhaseI2Claims,
  runWorkforceBootstrap,
  runWorkforceVerify,
  buildActivationPreflight,
  allocateSeatToProject,
  releaseInstance,
  transitionInstance,
  resetWorkforceI2Stores,
  bootstrapWorkforceRegistryInMemory,
  compileRoleArchetypes,
  assertSeatRegistryInvariants,
  compileCapacitySeats,
} from "./index";

describe("Phase I.3 activation closeout", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ALLOW_LIVE_PROVIDER_TEST;
  });

  it("verifies Phase I.2 claims without FAIL on capacity/archetypes", () => {
    const report = verifyPhaseI2Claims();
    expect(report.summary.fail).toBe(0);
    expect(report.correctedTruth.capacitySeatsCompiled).toBe(445);
    expect(report.correctedTruth.liveTested).toBe(0);
    expect(report.correctedTruth.archetypeCount).toBe(148);
  });

  it("bootstrap dry-run and verify-only do not claim persistence", async () => {
    const dry = await runWorkforceBootstrap({ dryRun: true });
    expect(dry.ok).toBe(true);
    expect(dry.mode).toBe("dry-run");
    expect(dry.created).toBe(0);
    expect(dry.persistedSeats).toBeNull();
    const vo = await runWorkforceBootstrap({ verifyOnly: true });
    expect(vo.mode).toBe("verify-only");
    expect(vo.ok).toBe(false);
    expect(vo.compiledSeats).toBe(445);
  });

  it("bootstrap second run reports zero creates/duplicates against adapter", async () => {
    const { createMemoryPersistenceAdapter } = await import("./index");
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const boot = await runWorkforceBootstrap({ adapter });
    expect(boot.ok).toBe(true);
    expect(boot.secondRun.created).toBe(0);
    expect(boot.secondRun.duplicates).toBe(0);
    expect(boot.seatCountAfterSecondRun).toBe(445);
  });

  it("live smoke refuses CI and paid-fallback env", async () => {
    const prevCi = process.env.CI;
    const prevPaid = process.env.OPENROUTER_PAID_FALLBACK_ENABLED;
    const prevLive = process.env.ALLOW_LIVE_PROVIDER_TEST;
    process.env.CI = "true";
    process.env.ALLOW_LIVE_PROVIDER_TEST = "true";
    process.env.OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "sk-or-test-not-real";
    const { runLiveOpenRouterSmoke } = await import("../real-agent/harness.js");
    const blockedCi = await runLiveOpenRouterSmoke({
      projectId: "00000000-0000-4000-8000-000000000201",
      confirm: true,
    });
    expect(blockedCi.ran).toBe(false);
    expect(blockedCi.gates.notCi).toBe(false);
    process.env.CI = "false";
    process.env.OPENROUTER_PAID_FALLBACK_ENABLED = "true";
    const blockedPaid = await runLiveOpenRouterSmoke({
      projectId: "00000000-0000-4000-8000-000000000201",
      confirm: true,
    });
    expect(blockedPaid.ran).toBe(false);
    expect(blockedPaid.gates.paidFallbackDisabled).toBe(false);
    process.env.CI = prevCi;
    process.env.OPENROUTER_PAID_FALLBACK_ENABLED = prevPaid;
    process.env.ALLOW_LIVE_PROVIDER_TEST = prevLive;
  });

  it("verify reports compilation ready but production not ok without DB", async () => {
    const v = await runWorkforceVerify({ productionMode: true });
    expect(v.compilationReady).toBe(true);
    expect(v.compiledSeats).toBe(445);
    expect(v.persistedSeats).toBeNull();
    expect(v.liveTestedSeats).toBe(0);
    expect(v.ok).toBe(false);
    expect(v.departmentCoverage).toBe("20/20");
  });

  it("preflight never probes provider and reports free-only", async () => {
    const p = await buildActivationPreflight();
    expect(p.checks.openRouterReachable).toBe("not_probed");
    expect(p.checks.freeOnlyMode).toBe(true);
    expect(p.checks.paidFallbackDisabled).toBe(true);
    expect(p.secretsExposed).toBe(false);
  });

  it("enforces organization isolation on release/transition", () => {
    bootstrapWorkforceRegistryInMemory();
    const a = allocateSeatToProject({
      department: "product",
      projectId: "p1",
      organizationId: "org-a",
    });
    expect(a.ok).toBe(true);
    expect(
      releaseInstance(a.instance.id, { projectId: "p1", organizationId: "org-b" }).ok
    ).toBe(false);
    expect(() =>
      transitionInstance(a.instance.id, "assigned", {
        projectId: "p1",
        organizationId: "org-b",
      })
    ).toThrow(/Cross-organization/);
    expect(releaseInstance(a.instance.id, { projectId: "p1", organizationId: "org-a" }).ok).toBe(
      true
    );
  });

  it("rejects archetypes without provenance and keeps 148 source-backed", () => {
    const a = compileRoleArchetypes();
    expect(a.count).toBe(148);
    expect(a.fabrications).toBe(0);
    for (const arch of a.archetypes) {
      expect(arch.sourceDocumentReferences?.length).toBeGreaterThan(0);
      expect(String(arch.title).toLowerCase()).not.toMatch(/miscellaneous agent|fake worker/);
    }
    const inv = assertSeatRegistryInvariants(compileCapacitySeats());
    expect(inv.uniqueSeatIds).toBe(445);
  });
});
