/**
 * Phase I.8 — final current-build production closeout contracts.
 * No provider calls. No Founder Proof auto-approval. No Production tick dispatch.
 */
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  ADMIN_NAV,
  ADMIN_NAV_GROUPS,
  primaryNavHrefs,
  withProjectQuery,
  isNavItemCurrent,
} from "@/components/admin/nav";
import {
  buildFounderProofViewModel,
  deriveFounderWorkflowGuideSteps,
  FOUNDER_PROOF_PROGRESS_STEPS,
} from "@/lib/core/integration/founder-proof-view-model";
import { mapSchedulerStatus } from "@/lib/core/scheduler-status";
import { SCHEDULER_EXPECTED_INTERVAL_MS } from "@/lib/core/scheduler-cadence";
import {
  buildFoundationMetrics,
  buildExecutableCatalogueMetrics,
  createMemoryPersistenceAdapter,
  resetWorkforceI2Stores,
  BOOTSTRAP_CONFIRMATION,
  runProductionBootstrapApply,
} from "@/lib/core/workforce-i2";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const PROJECT_A = "61d3b1fd-c260-479b-9289-0c75f977e892";
const PROJECT_B = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const RUN_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

describe("Phase I.8 Home vs Command Center navigation", () => {
  it("Home is /admin (exact) and Command Center is Advanced Ops", () => {
    const founder = ADMIN_NAV_GROUPS.find((g) => g.id === "founder");
    const home = founder.items.find((i) => i.label === "Home");
    expect(home.href).toBe("/admin");
    expect(home.match).toBe("exact");
    expect(isNavItemCurrent("/admin", home)).toBe(true);
    expect(isNavItemCurrent("/admin/projects", home)).toBe(false);

    const ops = ADMIN_NAV_GROUPS.find((g) => g.id === "operations");
    const cc = ops.items.find((i) => i.href === "/admin/command-center");
    expect(cc.label).toBe("Command Center");
    expect(isNavItemCurrent("/admin/command-center", cc)).toBe(true);
    expect(isNavItemCurrent("/admin", cc)).toBe(false);
    expect(primaryNavHrefs().filter((h) => h === "/admin").length).toBe(1);
    expect(primaryNavHrefs().filter((h) => h === "/admin/command-center").length).toBe(1);
  });

  it("preserves project_id on Home and Command Center", () => {
    expect(withProjectQuery("/admin", PROJECT_A)).toBe(`/admin?project_id=${PROJECT_A}`);
    expect(withProjectQuery("/admin/command-center", PROJECT_B)).toBe(
      `/admin/command-center?project_id=${PROJECT_B}`
    );
  });
});

describe("Phase I.8 Founder Proof stage invariants", () => {
  const stages = [
    ["clarification_required", "clarification"],
    ["founder_approval_required", "plan_approval"],
    ["simulation_approval_required", "simulation_approval"],
    ["approved_for_simulation", "simulation"],
    ["collaboration_running", "simulation"],
    ["founder_final_review", "final_review"],
  ];

  for (const [machineStage, expectedCurrent] of stages) {
    it(`stage ${machineStage} → current chip ${expectedCurrent}`, () => {
      const vm = buildFounderProofViewModel({
        hasProject: true,
        projectId: PROJECT_A,
        run: {
          id: RUN_ID,
          current_stage: machineStage,
          status: "active",
          evidence: { count: machineStage === "founder_final_review" ? 24 : 0 },
          memory: { count: machineStage === "founder_final_review" ? 11 : 0 },
          learning: { count: machineStage === "founder_final_review" ? 8 : 0 },
        },
        evidenceCount: machineStage === "founder_final_review" ? 24 : 0,
        memoryCount: machineStage === "founder_final_review" ? 11 : 0,
        learningCount: machineStage === "founder_final_review" ? 8 : 0,
      });
      const current = vm.progressSteps.find(
        (s) => s.state === "current" || s.state === "waiting_for_founder"
      );
      expect(current?.id).toBe(expectedCurrent);
    });
  }

  it("awaiting Final Review never shows Memory & Learning as Upcoming", () => {
    const guide = deriveFounderWorkflowGuideSteps({
      hasProject: true,
      run: {
        id: RUN_ID,
        current_stage: "founder_final_review",
        status: "awaiting_final_review",
      },
      evidenceCount: 0,
      memoryCount: 0,
      learningCount: 0,
    });
    const mem = guide.find((s) => s.id === "memory_learning");
    const final = guide.find((s) => s.id === "final_review");
    expect(mem.state).toBe("completed");
    expect(final.state).toBe("waiting_for_founder");
    expect(mem.state).not.toBe("upcoming");
  });

  it("progress step catalogue is stable", () => {
    expect(FOUNDER_PROOF_PROGRESS_STEPS.map((s) => s.id)).toContain("memory_learning");
    expect(FOUNDER_PROOF_PROGRESS_STEPS.map((s) => s.id)).toContain("final_review");
  });

  it("does not auto-approve Final Review", () => {
    const vm = buildFounderProofViewModel({
      hasProject: true,
      run: {
        id: RUN_ID,
        current_stage: "founder_final_review",
        status: "awaiting_final_review",
      },
      evidenceCount: 24,
      memoryCount: 11,
      learningCount: 8,
    });
    expect(vm.machineStatus).toMatch(/awaiting_final_review/i);
    expect(vm.machineStage).toBe("founder_final_review");
    expect(vm.progressSteps.find((s) => s.id === "final_review")?.state).not.toBe(
      "completed"
    );
  });
});

describe("Phase I.8 scheduler honesty", () => {
  afterEach(() => vi.useRealTimers());

  const base = {
    automaticProcessing: true,
    platform: "github_actions",
    expectedIntervalMs: 300_000,
  };

  it("healthy / delayed / stale / never-run / successful no-op counters", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T16:00:00Z"));

    expect(
      mapSchedulerStatus({
        scheduler: { ...base, lastTickAt: "2026-07-31T15:55:00Z", lastClaimed: 0, lastSucceeded: 0, lastFailed: 0 },
      }).health
    ).toBe("healthy");

    expect(
      mapSchedulerStatus({
        scheduler: { ...base, lastTickAt: "2026-07-31T15:40:00Z" },
      }).health
    ).toBe("delayed");

    const stale = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: "2026-07-31T08:19:00Z",
        lastClaimed: 0,
        lastSucceeded: 0,
        lastFailed: 0,
      },
    });
    expect(stale.health).toBe("stale");
    expect(stale.detail).toMatch(/no-op|GitHub Actions/i);
    expect(stale.lastClaimed).toBe(0);

    const never = mapSchedulerStatus({ scheduler: { ...base, lastTickAt: null } });
    expect(never.health).toBe("delayed");
  });

  it("invalid / missing record surfaces stale or configuration", () => {
    expect(
      mapSchedulerStatus({
        scheduler: { ...base, lastTickAt: "not-a-date" },
      }).health
    ).toBe("stale");
    expect(
      mapSchedulerStatus({
        scheduler: {
          automaticProcessing: false,
          workerSecretConfigured: false,
          lastTickAt: null,
        },
      }).health
    ).toBe("configuration_required");
  });

  it("canonical cadence remains 300000 ms", () => {
    expect(SCHEDULER_EXPECTED_INTERVAL_MS).toBe(300_000);
  });

  it("GitHub workflow retains */5 schedule as gapless fallback plus workflow_dispatch", () => {
    const yml = readFileSync(
      join(process.cwd(), ".github/workflows/runtime-tick.yml"),
      "utf8"
    );
    expect(yml).toMatch(/workflow_dispatch/);
    expect(yml).toMatch(/\*\/5 \* \* \* \*/);
    expect(yml).toMatch(/\/api\/internal\/runtime\/tick/);
    expect(yml).toMatch(/INTERNAL_RUNTIME_SECRET/);
    expect(yml).toMatch(/github_actions/);
    expect(yml).toMatch(/githubFallbackShouldSkip|fallback tick skipped/i);
    expect(yml).toMatch(/api\/core\/health/);
    expect(yml).toMatch(/gapless fallback/i);
  });
});

describe("Phase I.8 foundation truth preserved", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("cross-surface capacity and provider invariants", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    await runProductionBootstrapApply({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    const m = await buildFoundationMetrics({ adapter, productionMode: true });
    const ex = buildExecutableCatalogueMetrics();
    expect(m.capacitySeats).toBe(445);
    expect(m.persistedSeats).toBe(445);
    expect(m.readyToAllocateSeats).toBe(445);
    expect(m.allocatedSeats).toBe(0);
    expect(m.activeInstances).toBe(0);
    expect(m.liveTestedSeats).toBe(0);
    expect(m.liveExecutionReady).toBe(false);
    expect(m.providerName).toBe("none");
    expect(ex.catalogueEntries).toBe(43);
    expect(ex.executableDefinitions).toBe(38);
    expect(ex.intentionallyNonExecutable).toBe(5);
    expect(ex.namedRoleRegistryEntries).toBe(92);
    expect(ex.capacityReserveGaps).toBe(291);
  });
});

describe("Phase I.8 nav uniqueness after Home/CC split", () => {
  it("primary hrefs remain unique", () => {
    const hrefs = primaryNavHrefs();
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(ADMIN_NAV.some((i) => i.label === "Home")).toBe(true);
    expect(ADMIN_NAV.some((i) => i.label === "Command Center")).toBe(true);
  });
});
