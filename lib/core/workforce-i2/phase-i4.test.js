import { describe, it, expect, beforeEach } from "vitest";
import {
  runWorkforceBootstrap,
  runWorkforceVerify,
  buildActivationPreflight,
  createMemoryPersistenceAdapter,
  WORKFORCE_ERRORS,
  resetWorkforceI2Stores,
} from "./index";
import { isUuid } from "../../../scripts/lib/workforce-cli-env.mjs";

describe("Phase I.4 durable bootstrap truth", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.OPENROUTER_API_KEY;
  });

  it("does not report compiled seats as persisted when database is missing", async () => {
    const verify = await runWorkforceVerify({ productionMode: true });
    expect(verify.compiledSeats).toBe(445);
    expect(verify.persistedSeats).toBeNull();
    expect(verify.readyToAllocateSeats).toBe(0);
    expect(verify.databaseDurable).toBe(false);
    expect(verify.queueDurable).toBe(false);
    expect(verify.leasesDurable).toBe(false);
    expect(verify.rateLimitDurable).toBe(false);
    expect(verify.productionReady).toBe(false);
    expect(verify.ok).toBe(false);
    expect(verify.compilationReady).toBe(true);
  });

  it("dry-run reports wouldPersist false and null persisted without DB", async () => {
    const dry = await runWorkforceBootstrap({ dryRun: true });
    expect(dry.ok).toBe(true);
    expect(dry.wouldPersist).toBe(false);
    expect(dry.persistedSeats).toBeNull();
    expect(dry.compiledSeats).toBe(445);
    expect(dry.created).toBe(0);
  });

  it("verify-only fails when credentials missing", async () => {
    const vo = await runWorkforceBootstrap({ verifyOnly: true });
    expect(vo.ok).toBe(false);
    expect(vo.code).toBe(WORKFORCE_ERRORS.SUPABASE_URL_MISSING);
    expect(vo.persistedSeats).toBeNull();
  });

  it("schema missing fails with WORKFORCE_SCHEMA_MISSING", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: false,
    });
    const vo = await runWorkforceBootstrap({ verifyOnly: true, adapter });
    expect(vo.ok).toBe(false);
    expect(vo.code).toBe(WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING);
    expect(vo.bootstrapStatus).toBe("migration_required");
  });

  it("empty database reports bootstrap_required and 0 persisted", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const v = await runWorkforceVerify({ adapter, productionMode: true });
    expect(v.persistedSeats).toBe(0);
    expect(v.bootstrapStatus).toBe("bootstrap_required");
    expect(v.ok).toBe(false);
    expect(v.foundationReady).toBe(false);
  });

  it("first bootstrap persists 445; second creates 0", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    // Pre-seed nothing — upsert from compile
    const first = await runWorkforceBootstrap({ adapter, requireProductionDb: true });
    expect(first.ok).toBe(true);
    expect(first.persistedSeats).toBe(445);
    expect(first.firstRun.created).toBeGreaterThan(0);
    expect(first.secondRun.created).toBe(0);
    expect(first.secondRun.duplicates).toBe(0);
    expect(first.orphanSeats).toBe(0);

    const ids = [...adapter.state.seats.keys()];
    expect(new Set(ids).size).toBe(445);

    const verify = await runWorkforceVerify({ adapter, productionMode: true });
    expect(verify.ok).toBe(true);
    expect(verify.persistedSeats).toBe(445);
    expect(verify.foundationReady).toBe(true);
    expect(verify.providerReady).toBe(false);
    expect(verify.liveReady).toBe(false);
  });

  it("preserves active instance seat linkage on upsert", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    await runWorkforceBootstrap({ adapter });
    const seatId = [...adapter.state.seats.keys()][0];
    adapter.state.seats.set(seatId, {
      ...adapter.state.seats.get(seatId),
      lifecycle_state: "active",
      current_project_instance_id: "11111111-1111-4111-8111-111111111111",
    });
    await runWorkforceBootstrap({ adapter });
    expect(adapter.state.seats.get(seatId).lifecycle_state).toBe("active");
    expect(adapter.state.seats.get(seatId).current_project_instance_id).toBe(
      "11111111-1111-4111-8111-111111111111"
    );
  });

  it("rolls back meaning on upsert failure", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    adapter.state.failNextUpsert = true;
    const result = await runWorkforceBootstrap({ adapter });
    expect(result.ok).toBe(false);
    expect(result.code).toBe(WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED);
  });

  it("query failure returns null persisted", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    adapter.state.failQuery = true;
    const v = await runWorkforceVerify({ adapter, productionMode: true });
    expect(v.persistedSeats).toBeNull();
    expect(v.ok).toBe(false);
  });

  it("preflight CTA prefers foundation before provider key", async () => {
    const pre = await buildActivationPreflight();
    expect(pre.founderPrimaryAction).toMatch(/foundation|database/i);
    expect(pre.checks.seatRegistryCompiled445).toBe(true);
    expect(pre.checks.seatRegistryPersisted445).toBe(false);
  });

  it("UUID validation rejects angle-bracket placeholders", () => {
    expect(isUuid("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
    expect(isUuid("<DISPOSABLE_PROJECT_UUID>")).toBe(false);
    expect(isUuid("not-a-uuid")).toBe(false);
  });
});
