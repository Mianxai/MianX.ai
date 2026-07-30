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
    expect(t.persistedDisplay).toBe("n/a");
    expect(t.readyToAllocate).toBe(0);
    expect(t.liveTested).toBe(0);
    expect(t.foundationReady).toBe(false);
  });

  it("A: missing capacityTruth defaults do not invent ready/persisted", () => {
    const t = normalizeCapacityTruth({});
    expect(t.compiledSeats).toBe(445);
    expect(t.persistedSeats).toBeNull();
    expect(t.readyToAllocate).toBe(0);
    expect(t.liveTested).toBe(0);
  });

  it("B: persisted bootstrap-ready mocked state", () => {
    const t = normalizeCapacityTruth({
      compiledSeats: 445,
      persistedSeats: 445,
      readyToAllocate: 445,
      liveTested: 0,
      foundationReady: true,
      databaseReady: true,
      providerReady: false,
    });
    expect(t.compiledSeats).toBe(445);
    expect(t.persistedSeats).toBe(445);
    expect(t.persistedDisplay).toBe(445);
    expect(t.readyToAllocate).toBe(445);
    expect(t.liveTested).toBe(0);
    expect(t.foundationReady).toBe(true);
  });

  it("never treats 445 capacity as active-agent or 38-executable contract", () => {
    const copy = "445 capacity seats are allocatable — not 445 always-on agents.";
    for (const re of FORBIDDEN_CAPACITY_LABELS) {
      expect(copy).not.toMatch(re);
    }
    expect("38 executable").toMatch(FORBIDDEN_CAPACITY_LABELS[2]);
  });
});
