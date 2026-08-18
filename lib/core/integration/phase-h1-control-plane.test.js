import { describe, it, expect } from "vitest";
import {
  resolveProjectDisplayName,
  isInvalidProjectDisplayName,
} from "@/lib/admin/resolve-project-label";
import {
  tabForFounderProofStage,
  resolveIntegrationTab,
} from "@/lib/core/integration/stage-tab";
import { mapSchedulerStatus } from "@/lib/core/scheduler-status";
import { humanStageLabel, humanStatusLabel } from "@/lib/core/integration/founder-labels";

describe("Phase H.1 — project display name", () => {
  it("never returns Selected project as the value", () => {
    expect(
      resolveProjectDisplayName({
        projectName: null,
        projectId: "abc",
        projects: [{ id: "abc", name: "MianX Internal Production Proof" }],
      })
    ).toBe("MianX Internal Production Proof");

    expect(
      resolveProjectDisplayName({
        summary: { project_name: "MianX Internal Production Proof" },
        projectId: "abc",
      })
    ).toBe("MianX Internal Production Proof");

    const fallback = resolveProjectDisplayName({ projectId: "abcdefgh-ijkl" });
    expect(isInvalidProjectDisplayName(fallback)).toBe(false);
    expect(fallback).not.toMatch(/Selected project/i);
  });
});

describe("Phase H.1 — stage-aware Founder Proof tabs", () => {
  it("maps plan approval stage to Plan tab", () => {
    expect(tabForFounderProofStage("founder_approval_required", "awaiting_plan_approval")).toBe(
      "plan"
    );
  });

  it("respects explicit tab over stage", () => {
    expect(
      resolveIntegrationTab({
        explicitTab: "dashboard",
        stage: "founder_approval_required",
        proofStatus: "awaiting_plan_approval",
      })
    ).toBe("dashboard");
  });

  it("defaults simulation stages to Simulation tab", () => {
    expect(tabForFounderProofStage("simulation_approval_required")).toBe("simulation");
    expect(tabForFounderProofStage("approved_for_simulation")).toBe("simulation");
  });
});

describe("Phase H.1 — human labels", () => {
  it("uses Founder-readable plan labels", () => {
    expect(humanStageLabel("founder_approval_required")).toMatch(/Review and approve plan/i);
    expect(humanStatusLabel("awaiting_plan_approval", "founder_approval_required")).toMatch(
      /Waiting for Founder Plan Approval/i
    );
  });
});

describe("Phase H.1 — scheduler consistency", () => {
  it("marks stale ticks as Delayed not Data unavailable", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        automaticProcessing: true,
        platform: "github_actions",
        expectedIntervalMs: 5 * 60 * 1000,
      },
      lastTickAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    });
    expect(mapped.health).toBe("delayed");
    expect(mapped.label).toBe("Delayed");
    expect(mapped.expectedIntervalSec).toBe(300);
    expect(mapped.detail).not.toMatch(/~60s/);
    expect(mapped.label).not.toMatch(/unavailable/i);
  });

  it("defaults github_actions interval to 300s when only platform is set", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        automaticProcessing: true,
        platform: "github_actions",
      },
      lastTickAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    });
    expect(mapped.expectedIntervalSec).toBe(300);
    expect(mapped.health).toBe("healthy");
    expect(mapped.label).toBe("Healthy");
  });

  it("marks missing telemetry as Unavailable", () => {
    const mapped = mapSchedulerStatus({ scheduler: {} });
    expect(mapped.health).toBe("unavailable");
  });
});
