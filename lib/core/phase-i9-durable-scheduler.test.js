/**
 * Phase I.9 — durable Supabase scheduler contracts.
 * No Production secrets. No live tick. No Founder Proof mutation.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildDurableSchedulerViewModel,
  normalizeSchedulerSource,
  fetchSupabaseCronMeta,
  CANONICAL_CRON_JOB_NAME,
  CANONICAL_CRON_EXPRESSION,
  VAULT_TICK_URL_NAME,
  VAULT_TICK_SECRET_NAME,
} from "./scheduler-view-model";
import { SCHEDULER_EXPECTED_INTERVAL_MS } from "./scheduler-cadence";
import {
  buildFoundationMetrics,
  createMemoryPersistenceAdapter,
  resetWorkforceI2Stores,
  BOOTSTRAP_CONFIRMATION,
  runProductionBootstrapApply,
} from "./workforce-i2";
import { buildFounderProofViewModel } from "./integration/founder-proof-view-model";

const PROJECT = "61d3b1fd-c260-479b-9289-0c75f977e892";
const RUN = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

describe("Phase I.9 migration structure", () => {
  const sql = readFileSync(
    join(
      process.cwd(),
      "supabase/migrations/20260731180000_phase_i9_supabase_cron_scheduler.sql"
    ),
    "utf8"
  );

  it("enables pg_cron and pg_net without literal secrets", () => {
    expect(sql).toMatch(/create extension if not exists pg_cron/i);
    expect(sql).toMatch(/create extension if not exists pg_net/i);
    expect(sql).toContain(CANONICAL_CRON_JOB_NAME);
    expect(sql).toContain(CANONICAL_CRON_EXPRESSION);
    expect(sql).toContain(VAULT_TICK_URL_NAME);
    expect(sql).toContain(VAULT_TICK_SECRET_NAME);
    expect(sql).toMatch(/vault\.decrypted_secrets/);
    expect(sql).toMatch(/net\.http_post/);
    expect(sql).toMatch(/mianx_invoke_runtime_tick/);
    expect(sql).toMatch(/mianx_scheduler_status/);
    expect(sql).not.toMatch(/Bearer [A-Za-z0-9_-]{20,}/);
    expect(sql).not.toMatch(/sk-[a-zA-Z0-9]/);
  });

  it("idempotently unschedules duplicate canonical jobs and skips when Vault missing", () => {
    expect(sql).toMatch(/cron\.unschedule/);
    expect(sql).toMatch(/NOT scheduled/i);
    expect(sql).toMatch(/mianx_runtime_tick_url/);
  });
});

describe("Phase I.9 durable scheduler view model", () => {
  afterEach(() => vi.useRealTimers());

  const cronReady = {
    vaultConfigured: true,
    vaultUrlPresent: true,
    vaultSecretPresent: true,
    jobScheduled: true,
    jobActive: true,
    configuredCadenceMs: 300_000,
  };

  it("setup_required when Vault missing", () => {
    const vm = buildDurableSchedulerViewModel({
      cronMeta: {
        vaultConfigured: false,
        vaultUrlPresent: false,
        vaultSecretPresent: false,
        jobScheduled: false,
      },
      lastTick: null,
    });
    expect(vm.schedulerHealth).toBe("setup_required");
    expect(vm.label).toBe("Setup required");
  });

  it("never_run when configured but no tick", () => {
    const vm = buildDurableSchedulerViewModel({
      cronMeta: cronReady,
      lastTick: null,
    });
    expect(vm.schedulerHealth).toBe("never_run");
  });

  it("healthy supabase_cron recent success including no-op", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T16:00:00Z"));
    const vm = buildDurableSchedulerViewModel({
      cronMeta: cronReady,
      lastTick: {
        at: "2026-07-31T15:55:00Z",
        lastSuccessAt: "2026-07-31T15:55:00Z",
        source: "supabase_cron",
        claimed: 0,
        succeeded: 0,
        failed: 0,
        latestHttpStatus: 200,
      },
    });
    expect(vm.schedulerHealth).toBe("healthy");
    expect(vm.noOp).toBe(true);
    expect(vm.primaryScheduler).toBe("supabase_cron");
  });

  it("delayed and stale for primary supabase_cron ages", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T16:00:00Z"));
    expect(
      buildDurableSchedulerViewModel({
        cronMeta: cronReady,
        lastTick: {
          at: "2026-07-31T15:40:00Z",
          lastSuccessAt: "2026-07-31T15:40:00Z",
          source: "supabase_cron",
        },
      }).schedulerHealth
    ).toBe("delayed");
    expect(
      buildDurableSchedulerViewModel({
        cronMeta: cronReady,
        lastTick: {
          at: "2026-07-31T08:19:00Z",
          lastSuccessAt: "2026-07-31T08:19:00Z",
          source: "supabase_cron",
        },
      }).schedulerHealth
    ).toBe("stale");
  });

  it("GitHub Actions success alone is not primary Healthy", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T16:00:00Z"));
    const vm = buildDurableSchedulerViewModel({
      cronMeta: cronReady,
      lastTick: {
        at: "2026-07-31T15:55:00Z",
        lastSuccessAt: "2026-07-31T15:55:00Z",
        source: "github_actions",
        claimed: 0,
        succeeded: 0,
        failed: 0,
      },
    });
    expect(vm.schedulerHealth).not.toBe("healthy");
    expect(vm.schedulerSource).toBe("github_actions");
  });

  it("failing on recent HTTP error", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T16:00:00Z"));
    const vm = buildDurableSchedulerViewModel({
      cronMeta: cronReady,
      lastTick: {
        at: "2026-07-31T15:58:00Z",
        lastFailureAt: "2026-07-31T15:58:00Z",
        lastSuccessAt: "2026-07-31T08:00:00Z",
        source: "supabase_cron",
        latestHttpStatus: 401,
        consecutiveFailures: 3,
      },
    });
    expect(vm.schedulerHealth).toBe("failing");
  });

  it("legacy_or_unknown source normalization", () => {
    expect(normalizeSchedulerSource(null)).toBe("legacy_or_unknown");
    expect(normalizeSchedulerSource("supabase_cron")).toBe("supabase_cron");
    expect(normalizeSchedulerSource("weird")).toBe("legacy_or_unknown");
  });

  it("fetchSupabaseCronMeta refuses secretsExposed payloads", async () => {
    const meta = await fetchSupabaseCronMeta(async () => ({
      vaultConfigured: true,
      secretsExposed: true,
    }));
    expect(meta).toBeNull();
  });

  it("cadence remains 300000 ms", () => {
    expect(SCHEDULER_EXPECTED_INTERVAL_MS).toBe(300_000);
    expect(CANONICAL_CRON_EXPRESSION).toBe("*/5 * * * *");
  });
});

describe("Phase I.9 cross-surface truth + safety", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("workforce and provider truth unchanged", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    await runProductionBootstrapApply({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    const m = await buildFoundationMetrics({ adapter, productionMode: true });
    expect(m.capacitySeats).toBe(445);
    expect(m.persistedSeats).toBe(445);
    expect(m.allocatedSeats).toBe(0);
    expect(m.liveExecutionReady).toBe(false);
    expect(m.providerName).toBe("none");
  });

  it("Founder Proof remains awaiting_final_review (no auto-approve)", () => {
    const vm = buildFounderProofViewModel({
      hasProject: true,
      projectId: PROJECT,
      run: {
        id: RUN,
        current_stage: "founder_final_review",
        status: "awaiting_final_review",
      },
      evidenceCount: 24,
      memoryCount: 11,
      learningCount: 8,
    });
    expect(vm.machineStage).toBe("founder_final_review");
    expect(vm.machineStatus).toBe("awaiting_final_review");
    expect(vm.progressSteps.find((s) => s.id === "final_review")?.state).not.toBe(
      "completed"
    );
    expect(vm.progressSteps.find((s) => s.id === "memory_learning")?.state).toBe(
      "completed"
    );
  });

  it("Home/CC/Schedule/Health share primary supabase_cron identity", () => {
    const a = buildDurableSchedulerViewModel({
      cronMeta: {
        vaultConfigured: true,
        jobScheduled: true,
        vaultUrlPresent: true,
        vaultSecretPresent: true,
      },
      lastTick: {
        at: "2026-07-31T15:55:00Z",
        lastSuccessAt: "2026-07-31T15:55:00Z",
        source: "supabase_cron",
      },
      now: Date.parse("2026-07-31T16:00:00Z"),
    });
    const b = buildDurableSchedulerViewModel({
      cronMeta: {
        vaultConfigured: true,
        jobScheduled: true,
        vaultUrlPresent: true,
        vaultSecretPresent: true,
      },
      lastTick: {
        at: "2026-07-31T15:55:00Z",
        lastSuccessAt: "2026-07-31T15:55:00Z",
        source: "supabase_cron",
      },
      now: Date.parse("2026-07-31T16:00:00Z"),
    });
    expect(a.schedulerHealth).toBe(b.schedulerHealth);
    expect(a.primaryScheduler).toBe("supabase_cron");
    expect(a.configuredCadenceMs).toBe(300_000);
  });
});

describe("Phase I.9 security contract (no Production secrets)", () => {
  it("tick route tests cover missing and invalid auth (see route.test.js)", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const tickTest = readFileSync(
      join(process.cwd(), "app/api/internal/runtime/tick/route.test.js"),
      "utf8"
    );
    expect(tickTest).toMatch(/returns 401 for a missing credential/);
    expect(tickTest).toMatch(/returns 401 for an invalid credential/);
    expect(tickTest).toMatch(/supabase_cron source header/);
    expect(tickTest).not.toMatch(/mian-x-ai\.vercel\.app\/.*Bearer [A-Za-z0-9]{20,}/);
  });

  it("worker lease + claim path documents duplicate-tick protection", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const worker = readFileSync(join(process.cwd(), "lib/core/worker.js"), "utf8");
    expect(worker).toMatch(/claimJobs/);
    expect(worker).toMatch(/lost_lease/);
    expect(worker).toMatch(/updateJobIfStatus/);
  });
});
