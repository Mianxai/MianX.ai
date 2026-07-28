import { describe, it, expect } from "vitest";
import {
  listActiveAgentDefinitions,
  listAgentDefinitions,
  getAgentDefinition,
  isAgentExecutable,
} from "../agents";
import { buildExecutionInput } from "../execution/envelope";
import { assertRoutedAssignment, routeWorkforceObjective } from "./route";
import { BASE_AGENT_REPORTS_TO } from "../command-center/hierarchy";

/**
 * Distinguishes catalog facts from live work:
 * EXECUTABLE — active definition the runtime may enqueue
 * ROUTABLE — can receive a valid execution envelope / assignment
 * ACTIVE INSTANCE — project-scoped instance (not asserted here; requires DB)
 * CURRENTLY WORKING — leased/running job (not asserted here; idle by default)
 */

describe("all executable agents routability", () => {
  const active = listActiveAgentDefinitions();
  const executable = active.filter(isAgentExecutable);

  it("locks the executable catalog size used in production health", () => {
    expect(executable.length).toBe(36);
    expect(listAgentDefinitions().length).toBeGreaterThanOrEqual(36);
  });

  it("every executable agent is registered, scoped, and envelope-valid", () => {
    for (const def of executable) {
      expect(def.slug).toBeTruthy();
      expect(getAgentDefinition(def.slug)?.slug).toBe(def.slug);
      expect(isAgentExecutable(def)).toBe(true);
      expect(def.department || def.reportsTo || BASE_AGENT_REPORTS_TO[def.slug]).toBeTruthy();
      expect(Array.isArray(def.allowedCapabilities)).toBe(true);
      expect(def.canSelfApprove === true).toBe(false);

      const input = buildExecutionInput({
        project_id: "00000000-0000-4000-8000-000000000001",
        agent_slug: def.slug,
        requested_capabilities: [],
        constraints: ["advisory only", "project-scoped"],
      });
      expect(input.agent_slug).toBe(def.slug);
      expect(input.project_id).toBeTruthy();

      expect(() =>
        assertRoutedAssignment({
          projectId: "00000000-0000-4000-8000-000000000001",
          agentSlug: def.slug,
        })
      ).not.toThrow();

      // Capability escalation blocked.
      expect(() =>
        buildExecutionInput({
          project_id: "p1",
          agent_slug: def.slug,
          requested_capabilities: ["approve_production_action"],
        })
      ).toThrow(/escalation|permitted|forbidden|not permitted/i);

      // Missing project scope blocked.
      expect(() =>
        buildExecutionInput({ agent_slug: def.slug })
      ).toThrow(/project/i);
    }
  });

  it("does not treat idle executable definitions as currently working", () => {
    // Catalog presence ≠ live work. This suite asserts ROUTABLE only.
    const workingClaim = executable.map((d) => ({
      slug: d.slug,
      state: "EXECUTABLE_ROUTABLE_IDLE",
    }));
    expect(workingClaim.every((c) => c.state !== "CURRENTLY_WORKING")).toBe(true);
  });

  it("router can activate a bounded subset including CEO without whole-workforce", () => {
    const plan = routeWorkforceObjective({
      objective:
        "Analyse current MianX Core production readiness and provide three prioritised improvements. Do not deploy or mutate production.",
      projectId: "00000000-0000-4000-8000-000000000099",
      departmentsNeeded: ["research", "analytics", "security", "operations"],
      riskClass: "R2",
    });
    expect(plan.selectedAgents.some((a) => a.slug === "executive-ceo")).toBe(true);
    expect(plan.selectedAgents.length).toBeGreaterThan(1);
    expect(plan.selectedAgents.length).toBeLessThan(executable.length);
    expect(plan.bounds.forbiddenFullWorkforce).toBe(true);
    for (const a of plan.selectedAgents) {
      expect(isAgentExecutable(getAgentDefinition(a.slug))).toBe(true);
    }
  });
});
