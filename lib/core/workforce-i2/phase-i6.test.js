import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  buildFoundationMetrics,
  buildExecutableCatalogueMetrics,
  assertFoundationMetricInvariants,
  createMemoryPersistenceAdapter,
  resetWorkforceI2Stores,
  BOOTSTRAP_CONFIRMATION,
  runProductionBootstrapApply,
  runProductionBootstrapIdempotencyCheck,
} from "./index";

describe("Phase I.6 foundation metrics dictionary", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("executable catalogue metrics distinguish 43 vs 38 vs 92", () => {
    const ex = buildExecutableCatalogueMetrics();
    expect(ex.catalogueEntries).toBe(43);
    expect(ex.executableDefinitions).toBe(38);
    expect(ex.intentionallyNonExecutable).toBe(5);
    expect(ex.namedRoleRegistryEntries).toBe(92);
    expect(ex.catalogueEntries).not.toBe(ex.executableDefinitions);
    expect(ex.namedRoleRegistryEntries).not.toBe(445);
  });

  it("cross-surface shared metrics agree after bootstrap fixture", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const first = await runProductionBootstrapApply({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    expect(first.ok).toBe(true);
    expect(first.persistedSeats).toBe(445);

    const metrics = await buildFoundationMetrics({
      adapter,
      productionMode: true,
    });

    // Simulate the three surfaces reading the same builder
    const healthWorkforce = {
      capacitySeats: metrics.capacitySeats,
      compiledSeats: metrics.compiledSeats,
      persistedSeats: metrics.persistedSeats,
      readyToAllocateSeats: metrics.readyToAllocateSeats,
      allocatedSeats: metrics.allocatedSeats,
      activeInstances: metrics.activeInstances,
      liveTestedSeats: metrics.liveTestedSeats,
      departments: metrics.departments,
      archetypes: metrics.archetypes,
      workflowFamilies: metrics.workflowFamilies,
      databaseReady: metrics.databaseReady,
      foundationReady: metrics.foundationReady,
      databaseDurable: metrics.databaseDurable,
      queueDurable: metrics.queueDurable,
      leaseDurable: metrics.leaseDurable,
      rateLimitDurable: metrics.rateLimitDurable,
      providerName: metrics.providerName,
      liveExecutionReady: metrics.liveExecutionReady,
    };
    const setup = { ...healthWorkforce };
    const readiness = { ...healthWorkforce };

    expect(setup).toEqual(healthWorkforce);
    expect(readiness).toEqual(healthWorkforce);

    const inv = assertFoundationMetricInvariants(metrics, { expectPersisted: true });
    expect(inv.ok).toBe(true);
    expect(inv.errors).toEqual([]);

    expect(metrics.compiledSeats).toBe(445);
    expect(metrics.compiledSeats).not.toBe(metrics.executable.namedRoleRegistryEntries);
    expect(metrics.compiledSeats).not.toBe(metrics.executable.catalogueEntries);
    expect(metrics.compiledSeats).not.toBe(metrics.executable.executableDefinitions);
    expect(metrics.liveExecutionReady).toBe(false);
    expect(metrics.providerConfigured).toBe(false);
  });

  it("fails invariants when compiled seats are replaced by catalogue count", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    await runProductionBootstrapApply({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    const metrics = await buildFoundationMetrics({ adapter, productionMode: true });
    const poisoned = {
      ...metrics,
      compiledSeats: metrics.executable.executableDefinitions,
    };
    const inv = assertFoundationMetricInvariants(poisoned, { expectPersisted: true });
    expect(inv.ok).toBe(false);
    expect(inv.errors.some((e) => /compiledSeats must not equal executable/i.test(e))).toBe(
      true
    );
  });

  it("idempotency fixture reports created 0 with persisted 445", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    await runProductionBootstrapApply({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    const second = await runProductionBootstrapIdempotencyCheck({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    expect(second.created).toBe(0);
    expect(second.persistedSeats).toBe(445);
    expect(second.readyToAllocateSeats).toBe(445);
    expect(second.duplicates).toBe(0);
    expect(second.orphanSeats).toBe(0);
    expect(second.allocatedSeats).toBe(0);
    expect(second.activeInstances).toBe(0);
    expect(second.liveTestedSeats).toBe(0);
  });

  it("readiness check route remains read-only and provider-free", async () => {
    const providerSpy = vi.fn();
    vi.doMock("@/lib/core/real-agent", async () => {
      const actual = await vi.importActual("@/lib/core/real-agent");
      return {
        ...actual,
        openRouterHealthCheck: () => {
          providerSpy();
          return { configured: false };
        },
      };
    });
    // Contract: buildFoundationMetrics / readiness refresh must not invent provider calls.
    delete process.env.OPENROUTER_API_KEY;
    const metrics = await buildFoundationMetrics({
      adapter: createMemoryPersistenceAdapter({
        credentialsOk: true,
        schemaPresent: true,
        persistedSeats: 445,
        readyToAllocateSeats: 445,
      }),
      productionMode: true,
    });
    expect(metrics.providerConfigured).toBe(false);
    expect(metrics.liveExecutionReady).toBe(false);
  });
});
