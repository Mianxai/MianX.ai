import { describe, it, expect } from "vitest";
import {
  mapSchedulerStatus,
  formatExpectedCadence,
} from "./scheduler-status";

describe("mapSchedulerStatus interval + labels", () => {
  it("prefers expectedIntervalMs over defaults", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        automaticProcessing: true,
        platform: "github_actions",
        expectedIntervalMs: 5 * 60 * 1000,
      },
      lastTickAt: new Date(Date.now() - 60 * 1000).toISOString(),
    });
    expect(mapped.expectedIntervalSec).toBe(300);
    expect(mapped.expectedCadenceLabel).toBe("Every 5 minutes");
    expect(mapped.health).toBe("healthy");
    expect(mapped.label).toBe("Healthy");
  });

  it("falls back to 300s for github_actions without interval fields", () => {
    const mapped = mapSchedulerStatus({
      scheduler: { automaticProcessing: true, platform: "github_actions" },
      lastTickAt: new Date(Date.now() - 60 * 1000).toISOString(),
    });
    expect(mapped.expectedIntervalSec).toBe(300);
    expect(mapped.detail).not.toMatch(/~60s/);
  });

  it("maps age > 1.5x interval to Delayed", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        automaticProcessing: true,
        platform: "github_actions",
        expectedIntervalMs: 300000,
      },
      lastTickAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    });
    expect(mapped.health).toBe("delayed");
    expect(mapped.label).toBe("Delayed");
  });

  it("reports Configuration Required when platform is not active", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        mode: "external_scheduler_required",
        automaticProcessing: false,
        platform: "github_actions",
        expectedIntervalMs: 300000,
      },
    });
    expect(mapped.health).toBe("configuration_required");
    expect(mapped.label).toBe("Configuration Required");
  });
});

describe("formatExpectedCadence", () => {
  it("formats multi-minute cadence for Founders", () => {
    expect(formatExpectedCadence(300)).toBe("Every 5 minutes");
    expect(formatExpectedCadence(60)).toBe("Every minute");
    expect(formatExpectedCadence(30)).toBe("Every ~30s");
  });
});
