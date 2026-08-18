import { describe, it, expect } from "vitest";
import {
  isProtectedCapability,
  requiresApproval,
  canTransitionApproval,
  assertApprovalTransition,
  validateApprovalDecision,
} from "./approvals";

describe("approval policy", () => {
  it("flags protected capabilities", () => {
    expect(isProtectedCapability("send_email")).toBe(true);
    expect(isProtectedCapability("approve_production_action")).toBe(true);
    expect(isProtectedCapability("summarize")).toBe(false);
  });

  it("requires approval when the task opts in", () => {
    expect(requiresApproval({ task: { requires_approval: true } })).toBe(true);
  });
  it("requires approval when the agent definition demands it", () => {
    expect(
      requiresApproval({ task: {}, agentDefinition: { requires_human_approval: true } })
    ).toBe(true);
  });
  it("requires approval when a requested capability is protected", () => {
    expect(
      requiresApproval({ task: {}, requestedCapabilities: ["summarize", "send_email"] })
    ).toBe(true);
  });
  it("does not require approval for a plain analysis task", () => {
    expect(
      requiresApproval({
        task: { requires_approval: false },
        agentDefinition: { requires_human_approval: false },
        requestedCapabilities: ["summarize"],
      })
    ).toBe(false);
  });
});

describe("approval transitions", () => {
  it("allows pending -> approved/rejected", () => {
    expect(canTransitionApproval("pending", "approved")).toBe(true);
    expect(canTransitionApproval("pending", "rejected")).toBe(true);
  });
  it("rejects deciding an already-decided approval", () => {
    expect(canTransitionApproval("approved", "rejected")).toBe(false);
    try {
      assertApprovalTransition("approved", "rejected");
    } catch (e) {
      expect(e.status).toBe(409);
    }
  });
});

describe("validateApprovalDecision", () => {
  it("accepts a valid admin decision", () => {
    expect(
      validateApprovalDecision({ decision: "approved", decidedBy: "admin@mianx.ai" })
    ).toBe("approved");
  });
  it("rejects an invalid decision value", () => {
    expect(() =>
      validateApprovalDecision({ decision: "maybe", decidedBy: "admin@mianx.ai" })
    ).toThrowError(/Invalid decision/);
  });
  it("requires a deciding identity", () => {
    expect(() =>
      validateApprovalDecision({ decision: "approved", decidedBy: "" })
    ).toThrowError(/Invalid decision/);
  });
  it("forbids an agent approving a production action (separation of duties)", () => {
    try {
      validateApprovalDecision({
        decision: "approved",
        decidedBy: "qa-review",
        actorType: "agent",
        capability: "approve_production_action",
      });
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });
});
