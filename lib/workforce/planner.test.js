import { describe, it, expect } from "vitest";
import {
  planWorkforceActivation,
  isInstantiable,
  getDefinition,
  PLANNED_ROLE_SLOT_TOTAL,
  listDefinitions,
} from "./index";

describe("planWorkforceActivation", () => {
  it("returns a minimal pod and never approaches 445 instances", () => {
    const plan = planWorkforceActivation({
      objective: "Ship a controlled software delivery for MianX Core",
      departmentsNeeded: ["engineering", "product", "qa"],
      riskClass: "R2",
      projectProfile: "mianx-core",
    });

    expect(plan.requiredDepartments).toEqual(
      expect.arrayContaining(["engineering", "product", "qa"])
    );
    expect(plan.requiredCanonicalDefinitions.length).toBeGreaterThan(0);
    expect(plan.requiredCanonicalDefinitions.length).toBeLessThan(40);
    expect(plan.requiredCanonicalDefinitions.length).toBeLessThan(
      PLANNED_ROLE_SLOT_TOTAL / 10
    );
    expect(plan.forbiddenFullWorkforce).toBe(true);
    expect(plan.note).toMatch(/must NOT instantiate the full 445/i);
    expect(plan.activationClasses).toBeTypeOf("object");
    expect(Object.keys(plan.activationClasses).length).toBe(
      plan.requiredCanonicalDefinitions.length
    );
    expect(plan.riskClass).toMatch(/^R[1-4]$/);
    expect(Array.isArray(plan.approvalBoundaries)).toBe(true);
    expect(Array.isArray(plan.dependencies)).toBe(true);
  });

  it("never activates capacity_reserve definitions", () => {
    const plan = planWorkforceActivation({
      objective: "Grow inbound pipeline",
      departmentsNeeded: ["sales", "marketing", "support", "analytics"],
      projectProfile: "client-generic",
    });

    for (const slug of plan.requiredCanonicalDefinitions) {
      const def = getDefinition(slug);
      expect(def).toBeTruthy();
      expect(def.roleType).not.toBe("capacity_reserve");
      expect(isInstantiable(def)).toBe(true);
    }

    const reserves = listDefinitions({ includeCapacityReserves: true }).filter(
      (d) => d.roleType === "capacity_reserve"
    );
    expect(reserves.length).toBeGreaterThan(0);
    for (const r of reserves) {
      expect(plan.requiredCanonicalDefinitions).not.toContain(r.slug);
    }
  });

  it("maps growth objectives into sales/marketing without inventing a growth dept", () => {
    const plan = planWorkforceActivation({
      objective: "Business growth campaign for inbound leads",
      departmentsNeeded: ["growth"],
      projectProfile: "mianx-core",
    });
    expect(plan.requiredDepartments).toEqual(
      expect.arrayContaining(["sales", "marketing"])
    );
    expect(plan.requiredDepartments).not.toContain("growth");
    expect(plan.requiredRuntimeAgents.length).toBeGreaterThan(0);
  });

  it("routes incident-style objectives toward operations", () => {
    const plan = planWorkforceActivation({
      objective: "SEV-1 production incident response",
      departmentsNeeded: [],
      riskClass: "R4",
      proposedAction: "production_deploy",
      projectProfile: "mianx-core",
    });
    expect(plan.requiredDepartments).toEqual(
      expect.arrayContaining(["operations"])
    );
    expect(plan.riskClass).toBe("R4");
    expect(plan.approvalBoundaries.length).toBeGreaterThan(0);
  });

  it("assigns activationClasses per instance slug", () => {
    const plan = planWorkforceActivation({
      objective: "Platform candidate",
      departmentsNeeded: ["engineering", "security"],
      projectProfile: "mianx-core",
    });
    for (const slug of plan.requiredCanonicalDefinitions) {
      expect(plan.activationClasses[slug]).toBeTruthy();
      expect([
        "shared",
        "project_dedicated",
        "ephemeral",
        "persistent_operational",
        "approval_only",
      ]).toContain(plan.activationClasses[slug]);
    }
  });
});
