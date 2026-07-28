import { describe, it, expect } from "vitest";
import {
  canDelegate,
  buildDelegationRequest,
  detectDelegationCycles,
} from "./protocol";

describe("delegation protocol", () => {
  it("allows CEO → L2 and blocks self / founder targets", () => {
    expect(canDelegate("executive-ceo", "executive-cto")).toBe(true);
    expect(canDelegate("executive-cto", "executive-cto")).toBe(false);
    expect(canDelegate("executive-ceo", "founder")).toBe(false);
  });

  it("builds a validated delegation request", () => {
    const req = buildDelegationRequest({
      delegating_agent: "executive-ceo",
      target_agent_definition: "executive-cpo",
      project_id: "p1",
      task_intent: "Assess product readiness",
      reason: "Need CPO view",
    });
    expect(req.status).toBe("validated");
    expect(req.target_agent_definition).toBe("executive-cpo");
  });

  it("detects cycles", () => {
    const cycles = detectDelegationCycles({
      a: ["b"],
      b: ["c"],
      c: ["a"],
    });
    expect(cycles.length).toBeGreaterThan(0);
  });
});
