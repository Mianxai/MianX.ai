/**
 * Phase H.1 truth reconciliation — source + unit regressions.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { schedulerExpectedIntervalMs } from "../config.js";
import { mapSchedulerStatus } from "../scheduler-status.js";
import { overviewCounts } from "../template-intelligence/catalog/index.js";

const root = process.cwd();
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

describe("H.1 truth reconciliation — Founder-facing naming", () => {
  const surfaces = [
    "components/admin/runtime/RuntimeWorkspace.jsx",
    "components/admin/outputs/OutputsClient.jsx",
    "components/admin/knowledge/KnowledgeClient.jsx",
    "components/admin/memory/MemoryClient.jsx",
    "components/admin/learning/LearningClient.jsx",
    "components/admin/departments/DepartmentsClient.jsx",
    "components/admin/workflows/WorkflowsClient.jsx",
    "components/admin/templates/TemplatesClient.jsx",
    "components/admin/planning/PlanningClient.jsx",
  ];

  it("removes Open Integration / E2E Integration / Future Capacity Slots from Founder UI", () => {
    for (const file of surfaces) {
      const src = read(file);
      expect(src).not.toMatch(/Open Integration\b/);
      expect(src).not.toMatch(/E2E Integration/);
      expect(src).not.toMatch(/Future Capacity Slots/);
    }
  });

  it("Approvals does not claim no approval while proof plan may be pending", () => {
    const src = read("components/admin/runtime/RuntimeWorkspace.jsx");
    expect(src).not.toMatch(/No approval is currently due/);
    expect(src).toMatch(/No agent runtime approvals are currently due/);
    expect(src).toMatch(/Founder Proof Approval|Waiting for Founder Plan Approval/);
    expect(src).toMatch(/Open Founder Proof/);
  });

  it("secondary pages use FounderActionBanner not full Quick Start", () => {
    const secondary = [
      "components/admin/departments/DepartmentsClient.jsx",
      "components/admin/workflows/WorkflowsClient.jsx",
      "components/admin/knowledge/KnowledgeClient.jsx",
      "components/admin/planning/PlanningClient.jsx",
      "components/admin/memory/MemoryClient.jsx",
      "components/admin/learning/LearningClient.jsx",
      "components/admin/outputs/OutputsClient.jsx",
    ];
    for (const file of secondary) {
      const src = read(file);
      expect(src).toMatch(/FounderActionBanner/);
      expect(src).not.toMatch(/FounderQuickStart/);
      expect(src).not.toMatch(/FounderGuidedPanel/);
    }
  });

  it("Capacity Inventory terminology on Departments", () => {
    const src = read("components/admin/departments/DepartmentsClient.jsx");
    expect(src).toMatch(/Capacity Inventory/);
    expect(src).toMatch(/Planning capacity only|not created or running/i);
  });

  it("Advanced Operations accordion semantics present", () => {
    const src = read("components/admin/AdminShell.jsx");
    expect(src).toMatch(/data-testid="advanced-ops-toggle"/);
    expect(src).toMatch(/aria-expanded=\{advancedOpsOpen\}/);
    expect(src).toMatch(/▸|▾/);
  });
});

describe("H.1 scheduler canonical cadence", () => {
  it("github_actions expected interval matches runtime-tick.yml (5 minutes)", () => {
    expect(schedulerExpectedIntervalMs("github_actions")).toBe(5 * 60 * 1000);
    const yml = read(".github/workflows/runtime-tick.yml");
    expect(yml).toMatch(/\*\/5 \* \* \* \*/);
  });

  it("delayed threshold uses canonical interval — not false 60s", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        automaticProcessing: true,
        platform: "github_actions",
        expectedIntervalMs: 300000,
        lastTickAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
    });
    expect(mapped.expectedIntervalSec).toBe(300);
    expect(mapped.label).toMatch(/Delayed|Healthy/i);
    expect(mapped.detail || "").not.toMatch(/~60s/);
  });

  it("very old tick is Stale/Delayed (not Unavailable)", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        automaticProcessing: true,
        platform: "github_actions",
        expectedIntervalMs: 300000,
        lastTickAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
    });
    expect(mapped.label).toMatch(/Stale|Delayed/i);
    expect(mapped.health).not.toBe("unavailable");
  });
});

describe("H.1 catalogue consistency", () => {
  it("overviewCounts is non-empty and Knowledge uses that source", () => {
    const counts = overviewCounts();
    expect(counts.industries).toBeGreaterThan(0);
    expect(counts.business_models).toBeGreaterThan(0);
    const knowledge = read("lib/core/knowledge/build.js");
    expect(knowledge).toMatch(/overviewCounts/);
    expect(knowledge).toMatch(/catalogue_counts/);
  });
});

describe("H.1 Planning metrics separation", () => {
  it("planning API overview separates Founder Proof plans", () => {
    const src = read("app/api/admin/planning/route.js");
    expect(src).toMatch(/founder_proof|Founder Proof/i);
    expect(src).toMatch(/pending_approval|awaiting/i);
  });
});
