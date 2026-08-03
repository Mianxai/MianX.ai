import { describe, it, expect } from "vitest";
import {
  normalizeCapacityTruth,
  FORBIDDEN_CAPACITY_LABELS,
} from "./ui-truth";

describe("workforce UI capacity truth", () => {
  it("A: database-unconfigured CI state", () => {
    const t = normalizeCapacityTruth({
      compiledSeats: 445,
      persistedSeats: null,
      readyToAllocate: 0,
      liveTested: 0,
      foundationReady: false,
      databaseReady: false,
      providerReady: false,
    });
    expect(t.compiledSeats).toBe(445);
    expect(t.persistedSeats).toBeNull();
    expect(t.persistedDisplay).toBe("Unavailable");
    expect(t.readyToAllocate).toBe(0);
    expect(t.readyToAllocateDisplay).toBe("0");
    expect(t.liveTested).toBe(0);
    expect(t.liveTestedDisplay).toBe("0");
    expect(t.foundationReady).toBe(false);
  });

  it("A: missing capacityTruth defaults do not invent ready/persisted/zeros", () => {
    const t = normalizeCapacityTruth({});
    expect(t.compiledSeats).toBe(445);
    expect(t.persistedSeats).toBeNull();
    expect(t.persistedDisplay).toBe("Unavailable");
    expect(t.readyToAllocate).toBeNull();
    expect(t.readyToAllocateDisplay).toBe("Unavailable");
    expect(t.allocated).toBeNull();
    expect(t.allocatedDisplay).toBe("Unavailable");
    expect(t.active).toBeNull();
    expect(t.activeDisplay).toBe("Unavailable");
    expect(t.liveTested).toBeNull();
    expect(t.liveTestedDisplay).toBe("Unavailable");
  });

  it("B: persisted bootstrap-ready mocked state", () => {
    const t = normalizeCapacityTruth({
      compiledSeats: 445,
      persistedSeats: 445,
      readyToAllocate: 445,
      allocated: 0,
      active: 0,
      liveTested: 0,
      foundationReady: true,
      databaseReady: true,
      providerReady: false,
    });
    expect(t.compiledSeats).toBe(445);
    expect(t.persistedSeats).toBe(445);
    expect(t.persistedDisplay).toBe("445");
    expect(t.readyToAllocate).toBe(445);
    expect(t.allocated).toBe(0);
    expect(t.allocatedDisplay).toBe("0");
    expect(t.activeDisplay).toBe("0");
    expect(t.liveTested).toBe(0);
    expect(t.liveTestedDisplay).toBe("0");
    expect(t.foundationReady).toBe(true);
  });

  it("never treats 445 capacity as active-agent or 38-executable contract", () => {
    const copy = "445 capacity seats are allocatable planning capacity.";
    for (const re of FORBIDDEN_CAPACITY_LABELS) {
      expect(copy).not.toMatch(re);
    }
    expect(FORBIDDEN_CAPACITY_LABELS.some((re) => re.test("445 active agents"))).toBe(
      true
    );
    expect(FORBIDDEN_CAPACITY_LABELS.some((re) => re.test("38 executable"))).toBe(
      true
    );
  });
});
