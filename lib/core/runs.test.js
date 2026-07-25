import { describe, it, expect } from "vitest";
import { canTransitionRun, assertRunTransition, isTerminalRun } from "./runs";

describe("run transitions", () => {
  it("allows legal transitions", () => {
    expect(canTransitionRun("created", "running")).toBe(true);
    expect(canTransitionRun("running", "succeeded")).toBe(true);
    expect(canTransitionRun("running", "failed")).toBe(true);
  });
  it("rejects illegal transitions", () => {
    expect(canTransitionRun("created", "succeeded")).toBe(false);
    expect(canTransitionRun("succeeded", "running")).toBe(false);
    expect(canTransitionRun("failed", "running")).toBe(false);
  });
  it("assertRunTransition throws a 409 on illegal moves", () => {
    try {
      assertRunTransition("succeeded", "running");
    } catch (e) {
      expect(e.status).toBe(409);
    }
  });
  it("identifies terminal states", () => {
    expect(isTerminalRun("succeeded")).toBe(true);
    expect(isTerminalRun("failed")).toBe(true);
    expect(isTerminalRun("running")).toBe(false);
  });
});
