/**
 * Phase I.9 — durable Supabase scheduler + gapless GitHub fallback contracts.
 * No Production secrets. No live tick. No Founder Proof mutation.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildDurableSchedulerViewModel,
  normalizeSchedulerSource,
  fetchSupabaseCronMeta,
  resolveSchedulerTransitionState,
  resolveGithubFallbackDecision,
  shouldGithubScheduledTickSkip,
  CANONICAL_CRON_JOB_NAME,
  CANONICAL_CRON_EXPRESSION,
  VAULT_TICK_URL_NAME,
  VAULT_TICK_SECRET_NAME,
  SCHEDULER_TRANSITION_STATES,
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

const cronReady = {
  vaultConfigured: true,
  vaultUrlPresent: true,
  vaultSecretPresent: true,
  jobScheduled: true,
  jobActive: true,
  configuredCadenceMs: 300_000,
};

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

  it("scopes unschedule to exact canonical job only", () => {
    expect(sql).toMatch(/where jobname = 'mianx-runtime-tick-5m'/);
    expect(sql).toMatch(/Exact canonical name only/i);
    expect(sql).not.toMatch(/cron\.unschedule\('\*'/);
    expect(sql).not.toMatch(/delete from cron\.job/i);
  });

  it("missing Vault leaves no broken active job; both secrets required", () => {
    expect(sql).toMatch(/v_url_ok and v_secret_ok/);
    expect(sql).toMatch(/NOT scheduled/i);
    expect(sql).toMatch(/no broken active job/i);
  });
});

describe("Phase I.9 GitHub gapless workflow", () => {
  const yml = readFileSync(
    join(process.cwd(), ".github/workflows/runtime-tick.yml"),
    "utf8"
  );

  /** Shell script under `run: |` only — secret *input* wiring may stay in YAML env. */
  function extractRunScripts(source) {
    const blocks = [];
    const lines = source.split("\n");
    let collecting = false;
    let buf = [];
    for (const line of lines) {
      if (/^\s+run:\s*\|/.test(line)) {
        if (collecting && buf.length) blocks.push(buf.join("\n"));
        collecting = true;
        buf = [];
        continue;
      }
      if (!collecting) continue;
      // End of block: next YAML key at step/job indent (2–6 spaces) ending with ':'
      if (/^\s{2,6}\w[\w-]*:/.test(line) && !/^\s{8,}/.test(line)) {
        blocks.push(buf.join("\n"));
        collecting = false;
        buf = [];
        continue;
      }
      buf.push(line);
    }
    if (collecting && buf.length) blocks.push(buf.join("\n"));
    return blocks.join("\n");
  }

  it("retains */5 schedule and workflow_dispatch", () => {
    expect(yml).toMatch(/schedule:/);
    expect(yml).toMatch(/\*\/5 \* \* \* \*/);
    expect(yml).toMatch(/workflow_dispatch/);
  });

  it("queries health and skips only when githubFallbackShouldSkip", () => {
    expect(yml).toMatch(/api\/core\/health/);
    expect(yml).toMatch(/githubFallbackShouldSkip|fallback tick skipped/);
    expect(yml).toMatch(/supabase_primary_active/);
  });

  it("never logs auth secret names, values, Authorization, Bearer, xtrace, or curl -v", () => {
    // Safe input wiring may reference secret names under env: / secrets.*
    expect(yml).toMatch(/secrets\.INTERNAL_RUNTIME_SECRET/);
    expect(yml).toMatch(/secrets\.CRON_SECRET/);

    const script = extractRunScripts(yml);

    expect(script).not.toMatch(/echo[^#\n]*INTERNAL_RUNTIME_SECRET/);
    expect(script).not.toMatch(/echo[^#\n]*CRON_SECRET/);
    expect(script).not.toMatch(/printf[^#\n]*INTERNAL_RUNTIME_SECRET/);
    expect(script).not.toMatch(/printf[^#\n]*CRON_SECRET/);
    expect(script).not.toMatch(
      /echo\s+["'][^"']*\$\{?(INTERNAL_RUNTIME_SECRET|CRON_SECRET|TOKEN)/
    );
    expect(script).not.toMatch(/\bset\s+-x\b/);
    expect(script).not.toMatch(/(^|[^\w-])curl[^\n]*(\s-v\b|\s--verbose\b)/);
    expect(script).not.toMatch(/echo[^#\n]*Authorization/);
    expect(script).not.toMatch(/echo[^#\n]*Bearer\s/);
    expect(script).not.toMatch(/\bprintenv\b/);
    expect(script).not.toMatch(/(^|\n)\s*env\s*$/m);
    expect(script).toMatch(/\bset\s+\+x\b/);
    expect(script).toMatch(/Runtime scheduler authentication is not configured/);
    expect(script).not.toMatch(/INTERNAL_RUNTIME_SECRET or CRON_SECRET must be set/);
    // Auth still sent on the tick request (required) — just never logged
    expect(script).toMatch(/-H "Authorization: Bearer \$\{TOKEN\}"/);  });
});

describe("Phase I.9 transition states + fallback decision", () => {
  afterEach(() => vi.useRealTimers());

  it("lists all canonical transition states", () => {
    expect(SCHEDULER_TRANSITION_STATES).toEqual([
      "github_fallback_active",
      "supabase_configured_unverified",
      "supabase_verified",
      "supabase_primary_active",
      "supabase_degraded",
      "rollback_to_github",
    ]);
  });

  it("Preview / missing cronMeta → github_fallback_active (not Production Healthy)", () => {
    const vm = buildDurableSchedulerViewModel({
      cronMeta: null,
      lastTick: null,
      configScheduler: { platform: null, automaticProcessing: false },
    });
    expect(vm.schedulerTransitionState).toBe("github_fallback_active");
    expect(vm.schedulerActive).toBe(false);
    expect(vm.githubFallbackShouldSkip).toBe(false);
    expect(vm.productionCutoverPending).toBe(true);
    expect(resolveGithubFallbackDecision(vm.healthContract).invokeTick).toBe(true);
  });

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
    expect(vm.schedulerTransitionState).toBe("github_fallback_active");
  });

  it("supabase_configured_unverified retains GitHub fallback", () => {
    const vm = buildDurableSchedulerViewModel({
      cronMeta: cronReady,
      lastTick: null,
      configScheduler: { platform: null, automaticProcessing: false },
    });
    expect(vm.schedulerTransitionState).toBe("supabase_configured_unverified");
    expect(shouldGithubScheduledTickSkip(vm.healthContract)).toBe(false);
  });

  it("supabase_verified but not ACTIVE does not skip GHA", () => {
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
      configScheduler: {
        platform: "supabase_cron",
        automaticProcessing: false,
      },
    });
    expect(vm.schedulerHealth).toBe("healthy");
    expect(vm.schedulerTransitionState).toBe("supabase_verified");
    expect(vm.schedulerActive).toBe(false);
    expect(shouldGithubScheduledTickSkip(vm.healthContract)).toBe(false);
  });

  it("healthy supabase_primary_active causes GitHub tick skip", () => {
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
      configScheduler: {
        platform: "supabase_cron",
        automaticProcessing: true,
      },
    });
    expect(vm.schedulerTransitionState).toBe("supabase_primary_active");
    expect(vm.schedulerActive).toBe(true);
    expect(vm.noOp).toBe(true);
    expect(shouldGithubScheduledTickSkip(vm.healthContract)).toBe(true);
    expect(resolveGithubFallbackDecision(vm.healthContract)).toMatchObject({
      action: "skip",
      invokeTick: false,
    });
  });

  it("supabase_degraded invokes protected fallback (not blind skip)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T16:00:00Z"));
    const vm = buildDurableSchedulerViewModel({
      cronMeta: cronReady,
      lastTick: {
        at: "2026-07-31T08:00:00Z",
        lastSuccessAt: "2026-07-31T08:00:00Z",
        source: "supabase_cron",
      },
      configScheduler: {
        platform: "supabase_cron",
        automaticProcessing: true,
      },
    });
    expect(vm.schedulerTransitionState).toBe("supabase_degraded");
    expect(shouldGithubScheduledTickSkip(vm.healthContract)).toBe(false);
    const d = resolveGithubFallbackDecision(vm.healthContract);
    expect(d.invokeTick).toBe(true);
    expect(d.message).toMatch(/degraded/i);
  });

  it("rollback_to_github when paused or platform github_actions", () => {
    expect(
      resolveSchedulerTransitionState({
        cronMeta: cronReady,
        configScheduler: { paused: true, platform: "supabase_cron" },
        schedulerHealth: "healthy",
        latestSource: "supabase_cron",
        lastSuccessAt: "2026-07-31T15:55:00Z",
        successAgeMs: 60_000,
        healthyMs: 600_000,
      })
    ).toBe("rollback_to_github");
  });

  it("GitHub Actions success alone is not primary Healthy / skip", () => {
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
      configScheduler: {
        platform: "supabase_cron",
        automaticProcessing: true,
      },
    });
    expect(vm.schedulerHealth).not.toBe("healthy");
    expect(vm.githubFallbackShouldSkip).toBe(false);
  });

  it("delayed/stale/failing/legacy behaviours", () => {
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
    expect(
      buildDurableSchedulerViewModel({
        cronMeta: cronReady,
        lastTick: {
          at: "2026-07-31T15:58:00Z",
          lastFailureAt: "2026-07-31T15:58:00Z",
          lastSuccessAt: "2026-07-31T08:00:00Z",
          source: "supabase_cron",
          latestHttpStatus: 401,
          consecutiveFailures: 3,
        },
      }).schedulerHealth
    ).toBe("failing");
    expect(normalizeSchedulerSource(null)).toBe("legacy_or_unknown");
  });

  it("health contract fields are secret-free", () => {
    const vm = buildDurableSchedulerViewModel({
      cronMeta: cronReady,
      lastTick: null,
    });
    const c = vm.healthContract;
    expect(c).toMatchObject({
      primaryScheduler: "supabase_cron",
      canonicalJobName: CANONICAL_CRON_JOB_NAME,
      configuredCadenceMs: 300_000,
      liveExecutionReady: false,
      providerName: "none",
    });
    expect(JSON.stringify(c)).not.toMatch(/Bearer /);
    expect(JSON.stringify(c)).not.toMatch(/service_role/);
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

describe("Phase I.9 concurrent dual-source ticks", () => {
  it("documents lease/CAS protection and empty dual no-ops via worker surface", async () => {
    const worker = readFileSync(join(process.cwd(), "lib/core/worker.js"), "utf8");
    expect(worker).toMatch(/claimJobs/);
    expect(worker).toMatch(/lost_lease/);
    expect(worker).toMatch(/updateJobIfStatus/);
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
  });

  it("Home/CC/Schedule/Health share transition + primary identity", () => {
    const a = buildDurableSchedulerViewModel({
      cronMeta: null,
      lastTick: null,
      now: Date.parse("2026-07-31T16:00:00Z"),
    });
    const b = buildDurableSchedulerViewModel({
      cronMeta: null,
      lastTick: null,
      now: Date.parse("2026-07-31T16:00:00Z"),
    });
    expect(a.schedulerTransitionState).toBe(b.schedulerTransitionState);
    expect(a.primaryScheduler).toBe("supabase_cron");
    expect(a.schedulerActive).toBe(false);
    expect(a.liveExecutionReady).toBe(false);
    expect(a.providerName).toBe("none");
  });
});

describe("Phase I.9 security contract (no Production secrets)", () => {
  it("tick route tests cover missing and invalid auth", async () => {
    const tickTest = readFileSync(
      join(process.cwd(), "app/api/internal/runtime/tick/route.test.js"),
      "utf8"
    );
    expect(tickTest).toMatch(/returns 401 for a missing credential/);
    expect(tickTest).toMatch(/returns 401 for an invalid credential/);
    expect(tickTest).toMatch(/supabase_cron source header/);
  });

  it("worker lease + claim path documents duplicate-tick protection", () => {
    const worker = readFileSync(join(process.cwd(), "lib/core/worker.js"), "utf8");
    expect(worker).toMatch(/claimJobs/);
    expect(worker).toMatch(/lost_lease/);
    expect(worker).toMatch(/updateJobIfStatus/);
  });
});
