/**
 * Phase I.7 — current-build operational closeout contracts.
 * No provider calls. No Founder Proof auto-approval. Two-project isolation helpers.
 */
import { describe, it, expect, beforeEach } from "vitest";
import {
  ADMIN_NAV,
  ADMIN_NAV_GROUPS,
  primaryNavHrefs,
  withProjectQuery,
} from "@/components/admin/nav";
import {
  buildFoundationMetrics,
  buildExecutableCatalogueMetrics,
  createMemoryPersistenceAdapter,
  resetWorkforceI2Stores,
  BOOTSTRAP_CONFIRMATION,
  runProductionBootstrapApply,
} from "@/lib/core/workforce-i2";
import { SCHEDULER_EXPECTED_INTERVAL_MS } from "@/lib/core/scheduler-cadence";

const PROJECT_A = "61d3b1fd-c260-479b-9289-0c75f977e892";
const PROJECT_B = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const FOUNDER_PROOF_RUN = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

describe("Phase I.7 project context isolation", () => {
  it("preserves distinct project_id across nav hrefs for two fixtures", () => {
    for (const href of primaryNavHrefs()) {
      const a = withProjectQuery(href, PROJECT_A);
      const b = withProjectQuery(href, PROJECT_B);
      expect(a).toContain(`project_id=${PROJECT_A}`);
      expect(b).toContain(`project_id=${PROJECT_B}`);
      expect(a).not.toContain(PROJECT_B);
      expect(b).not.toContain(PROJECT_A);
    }
  });

  it("does not silently drop project when swapping routes", () => {
    const next = withProjectQuery("/admin/memory", PROJECT_A);
    expect(next).toBe(`/admin/memory?project_id=${PROJECT_A}`);
    const swapped = withProjectQuery("/admin/outputs", PROJECT_A);
    expect(swapped).toBe(`/admin/outputs?project_id=${PROJECT_A}`);
  });

  it("clears project_id when project is unset", () => {
    expect(withProjectQuery(`/admin/inbox?project_id=${PROJECT_A}`, null)).toBe(
      "/admin/inbox"
    );
  });
});

describe("Phase I.7 nav honesty", () => {
  it("labels Workforce (not Workforce Ops or Live Workforce)", () => {
    const wf = ADMIN_NAV_GROUPS.find((g) => g.id === "workforce");
    expect(wf.items.some((i) => i.label === "Workforce")).toBe(true);
    expect(ADMIN_NAV.some((i) => i.label === "Live Workforce")).toBe(false);
    expect(ADMIN_NAV.some((i) => i.label === "Workforce Ops")).toBe(false);
  });

  it("exposes Execution under Advanced Operations as Best-effort", () => {
    const exec = ADMIN_NAV.find((i) => i.href === "/admin/execution");
    expect(exec).toBeTruthy();
    expect(exec.badge).toBe("Best-effort");
  });

  it("includes every primary sidebar route exactly once", () => {
    const hrefs = primaryNavHrefs();
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toContain("/admin/execution");
    expect(hrefs).toContain("/admin/workforce");
  });
});

describe("Phase I.7 foundation truth preserved", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("keeps capacity distinct from active/live-tested and provider-unconfigured", async () => {
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

    const m = await buildFoundationMetrics({ adapter, productionMode: true });
    const ex = buildExecutableCatalogueMetrics();

    expect(m.capacitySeats).toBe(445);
    expect(m.compiledSeats).toBe(445);
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

  it("keeps canonical five-minute scheduler cadence", () => {
    expect(SCHEDULER_EXPECTED_INTERVAL_MS).toBe(300_000);
  });

  it("does not treat Founder Proof run id as auto-approved", () => {
    expect(FOUNDER_PROOF_RUN).toBe("e8848aeb-388f-49b3-9b44-7ffbfa715110");
    expect(PROJECT_A).toBe("61d3b1fd-c260-479b-9289-0c75f977e892");
  });
});
