import { describe, it, expect, vi, afterEach } from "vitest";
import {
  mapSchedulerStatus,
  schedulerThresholdMs,
  formatExpectedCadence,
} from "./scheduler-status.js";

describe("schedulerThresholdMs", () => {
  it("uses 2× healthy and 6× delayed multiples of interval", () => {
    const t = schedulerThresholdMs(300);
    expect(t.healthyMs).toBe(600_000);
    expect(t.delayedMs).toBe(1_800_000);
  });
});

describe("mapSchedulerStatus Phase H.2 thresholds", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const base = {
    automaticProcessing: true,
    platform: "github_actions",
    expectedIntervalMs: 300_000,
  };

  it("healthy tick within grace (≤2 intervals)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-29T16:00:00Z"));
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: "2026-07-29T15:55:00Z", // 5 min ago
      },
    });
    expect(mapped.health).toBe("healthy");
    expect(mapped.label).toBe("Healthy");
    expect(mapped.expectedIntervalSec).toBe(300);
  });

  it("delayed tick after several intervals", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-29T16:00:00Z"));
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: "2026-07-29T15:40:00Z", // 20 min ago (>10, <30)
      },
    });
    expect(mapped.health).toBe("delayed");
    expect(mapped.label).toBe("Delayed");
  });

  it("stale/critical when materially overdue", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-29T16:00:00Z"));
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: "2026-07-29T15:00:00Z", // 60 min ago
      },
    });
    expect(mapped.health).toBe("stale");
    expect(mapped.label).toBe("Stale");
    expect(mapped.recommendation).toMatch(/GitHub Actions/i);
  });

  it("missing tick with automatic configured is Delayed (cron ≠ healthy)", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: null,
      },
    });
    expect(mapped.health).toBe("delayed");
    expect(mapped.detail).toMatch(/no successful tick/i);
  });

  it("configured cron but not active is Configuration Required", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        automaticProcessing: false,
        platform: "github_actions",
        platformCronConfigured: true,
        workerSecretConfigured: true,
        mode: "external_scheduler_required",
        expectedIntervalMs: 300_000,
      },
    });
    expect(mapped.health).toBe("configuration_required");
    expect(mapped.label).toBe("Configuration Required");
  });

  it("paused state", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        paused: true,
        lastTickAt: "2026-07-29T15:55:00Z",
      },
    });
    expect(mapped.health).toBe("paused");
    expect(mapped.label).toBe("Paused");
  });

  it("invalid timestamp", () => {
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: "not-a-date",
      },
    });
    expect(mapped.health).toBe("stale");
    expect(mapped.detail).toMatch(/invalid/i);
  });

  it("future timestamp", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-29T16:00:00Z"));
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: "2026-07-29T17:00:00Z",
      },
    });
    expect(mapped.health).toBe("delayed");
    expect(mapped.detail).toMatch(/future|clock skew/i);
  });

  it("mentions last failed tick when newer than success", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-29T16:00:00Z"));
    const mapped = mapSchedulerStatus({
      scheduler: {
        ...base,
        lastTickAt: "2026-07-29T15:50:00Z",
        lastFailedAt: "2026-07-29T15:58:00Z",
      },
    });
    expect(mapped.detail).toMatch(/failed tick/i);
  });

  it("formatExpectedCadence for five minutes", () => {
    expect(formatExpectedCadence(300)).toBe("Every 5 minutes");
  });
});
