import { describe, it, expect } from "vitest";
import { routeWorkforceObjective, assertRoutedAssignment } from "./route";

describe("workforce router", () => {
  it("routes a bounded plan with CEO and no whole-workforce activation", () => {
    const plan = routeWorkforceObjective({
      objective: "Assess operational readiness of MianX Core",
      projectId: "p1",
      departmentsNeeded: ["research", "analytics", "security"],
      riskClass: "R2",
    });
    expect(plan.selectedAgents.some((a) => a.slug === "executive-ceo")).toBe(true);
    expect(plan.selectedAgents.length).toBeLessThanOrEqual(12);
    expect(plan.bounds.forbiddenFullWorkforce).toBe(true);
    expect(plan.approvalBoundaries.requiresFounderApproval).toBe(false);
  });

  it("rejects missing project and self-assignment", () => {
    expect(() =>
      routeWorkforceObjective({ objective: "x", projectId: "" })
    ).toThrow(/project/i);
    expect(() =>
      assertRoutedAssignment({
        projectId: "p1",
        agentSlug: "research",
        parentAgentSlug: "research",
      })
    ).toThrow(/self-delegation/i);
  });

  it("marks protected proposed actions in approval boundaries", () => {
    const plan = routeWorkforceObjective({
      objective: "Prepare deploy",
      projectId: "p1",
      proposedAction: "production_deploy",
      departmentsNeeded: ["engineering"],
    });
    expect(plan.approvalBoundaries.requiresFounderApproval).toBe(true);
  });
});
