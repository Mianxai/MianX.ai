import { describe, it, expect } from "vitest";
import {
  formatWorkforceMetric,
  assertCurrentWorkforceTruthContract,
  FORBIDDEN_WORKFORCE_CLAIMS,
  containsForbiddenWorkforceClaim,
  WORKFORCE_SURFACE_PURPOSE,
  WORKFORCE_SURFACE_IDS,
  WORKFORCE_COUNTER_TERMS,
} from "./terminology.js";
import { FORBIDDEN_CAPACITY_LABELS } from "./ui-truth.js";

describe("formatWorkforceMetric", () => {
  it("keeps zero as 0, not Unavailable", () => {
    expect(formatWorkforceMetric(0)).toEqual({
      kind: "ready",
      label: "0",
      value: 0,
    });
  });

  it("maps missing / n/a to Unavailable", () => {
    expect(formatWorkforceMetric(null).label).toBe("Unavailable");
    expect(formatWorkforceMetric(undefined).label).toBe("Unavailable");
    expect(formatWorkforceMetric("n/a").label).toBe("Unavailable");
  });

  it("formats finite counts", () => {
    expect(formatWorkforceMetric(445).label).toBe("445");
  });
});

describe("current workforce truth contract", () => {
  it("accepts 445/445/445 and 0/0/0 with provider none", () => {
    const r = assertCurrentWorkforceTruthContract({
      capacitySeats: 445,
      persistedSeats: 445,
      readyToAllocateSeats: 445,
      allocatedSeats: 0,
      activeInstances: 0,
      liveTestedSeats: 0,
      providerName: "none",
      liveExecutionReady: false,
    });
    expect(r.ok).toBe(true);
  });

  it("rejects implying 445 active", () => {
    const r = assertCurrentWorkforceTruthContract({
      capacitySeats: 445,
      persistedSeats: 445,
      readyToAllocateSeats: 445,
      allocatedSeats: 0,
      activeInstances: 445,
      liveTestedSeats: 0,
      providerName: "none",
      liveExecutionReady: false,
    });
    expect(r.ok).toBe(false);
  });
});

describe("forbidden claims", () => {
  it("blocks 445 active / live-tested / always-on affirmative claims", () => {
    const samples = [
      "445 active agents",
      "445 running now",
      "445 live-tested agents",
      "445 always-on agents",
      "Mianx is an operational autonomous workforce",
    ];
    for (const s of samples) {
      expect(containsForbiddenWorkforceClaim(s)).toBe(true);
    }
    expect(
      containsForbiddenWorkforceClaim(
        "445 capacity seats are allocatable — not 445 always-on agents."
      )
    ).toBe(false);
    expect(FORBIDDEN_CAPACITY_LABELS.some((re) => re.test("445 active agents"))).toBe(
      true
    );
    expect(FORBIDDEN_WORKFORCE_CLAIMS.length).toBeGreaterThan(3);
  });
});

describe("surface purpose registry", () => {
  it("defines purpose for setup, readiness, ops, agents", () => {
    for (const id of [
      WORKFORCE_SURFACE_IDS.SETUP,
      WORKFORCE_SURFACE_IDS.READINESS,
      WORKFORCE_SURFACE_IDS.OPS,
      WORKFORCE_SURFACE_IDS.AGENTS,
    ]) {
      expect(WORKFORCE_SURFACE_PURPOSE[id].owns.length).toBeGreaterThan(10);
      expect(WORKFORCE_SURFACE_PURPOSE[id].doesNotProve.length).toBeGreaterThan(10);
    }
  });

  it("documents counter terminology without equating ready to active", () => {
    expect(WORKFORCE_COUNTER_TERMS.ready.doesNotMean).toMatch(/active/i);
    expect(WORKFORCE_COUNTER_TERMS.active.doesNotMean).toMatch(/445/i);
  });
});
