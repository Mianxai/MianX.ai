import { describe, it, expect, afterEach } from "vitest";
import {
  schedulerStatus,
  providerOperationalStatus,
  isProviderConfigured,
} from "./config";

describe("schedulerStatus honesty", () => {
  const keys = [
    "INTERNAL_RUNTIME_SECRET",
    "CRON_SECRET",
    "RUNTIME_SCHEDULER_ACTIVE",
    "RUNTIME_SCHEDULER_PLATFORM",
    "RUNTIME_SCHEDULER_PAUSED",
  ];
  const saved = {};

  afterEach(() => {
    for (const k of keys) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
      delete saved[k];
    }
  });

  function stash() {
    for (const k of keys) saved[k] = process.env[k];
  }

  it("stays external_scheduler_required until ACTIVE is explicitly set", () => {
    stash();
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    delete process.env.RUNTIME_SCHEDULER_ACTIVE;
    process.env.RUNTIME_SCHEDULER_PLATFORM = "github_actions";
    const s = schedulerStatus();
    expect(s.platformCronConfigured).toBe(true);
    expect(s.automaticProcessing).toBe(false);
    expect(s.mode).toBe("external_scheduler_required");
  });

  it("reports automatic only when platform + ACTIVE + secrets are set", () => {
    stash();
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "github_actions";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    const s = schedulerStatus();
    expect(s.automaticProcessing).toBe(true);
    expect(s.mode).toBe("automatic");
    expect(s.expectedIntervalMs).toBe(5 * 60 * 1000);
  });

  it("reports paused when RUNTIME_SCHEDULER_PAUSED=1", () => {
    stash();
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "github_actions";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    process.env.RUNTIME_SCHEDULER_PAUSED = "1";
    expect(schedulerStatus().mode).toBe("paused");
    expect(schedulerStatus().automaticProcessing).toBe(false);
  });

  it("reports warning when automatic but last tick is stale for platform interval", () => {
    stash();
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "github_actions";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    const stale = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(schedulerStatus({ lastTickAt: stale }).mode).toBe("warning");
  });

  it("keeps automatic when last tick is within expected interval", () => {
    stash();
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "github_actions";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    // GHA cadence is 5 minutes — 2 minutes ago must stay automatic (not warning).
    const fresh = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    expect(schedulerStatus({ lastTickAt: fresh }).mode).toBe("automatic");
  });
});

describe("providerOperationalStatus", () => {
  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("returns unconfigured without a key", () => {
    delete process.env.ANTHROPIC_API_KEY;
    expect(isProviderConfigured("anthropic")).toBe(false);
    expect(providerOperationalStatus()).toBe("unconfigured");
  });
});
