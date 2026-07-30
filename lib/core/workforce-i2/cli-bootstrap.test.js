/**
 * CLI bootstrap unit paths — application runner, not Vitest-as-CLI.
 */
import { describe, it, expect, beforeEach } from "vitest";
import {
  runWorkforceBootstrap,
  runWorkforceVerify,
  createMemoryPersistenceAdapter,
  resetWorkforceI2Stores,
} from "./index";

describe("workforce:bootstrap runner", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  it("runs bootstrap / dry-run / verify-only with truthful persistence", async () => {
    const dry = await runWorkforceBootstrap({ dryRun: true });
    expect(dry.ok).toBe(true);
    expect(dry.mode).toBe("dry-run");
    expect(dry.persistedSeats).toBeNull();

    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const boot = await runWorkforceBootstrap({ adapter });
    expect(boot.ok).toBe(true);
    expect(boot.persistedSeats).toBe(445);
    expect(boot.secondRun.created).toBe(0);

    const vo = await runWorkforceBootstrap({ verifyOnly: true, adapter });
    expect(vo.ok).toBe(true);
    expect(vo.persistedSeats).toBe(445);
  });
});

describe("workforce:verify runner", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  it("prints Founder-readable verify report without false OK", async () => {
    const report = await runWorkforceVerify({ productionMode: true });
    expect(report.compiledSeats).toBe(445);
    expect(report.persistedSeats).toBeNull();
    expect(report.liveTestedSeats).toBe(0);
    expect(report.ok).toBe(false);
    expect(report.compilationReady).toBe(true);
    expect(report.databaseReady).toBe(false);
  });
});
