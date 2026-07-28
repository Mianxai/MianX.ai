import { describe, it, expect, beforeEach } from "vitest";
import {
  runPlanningIntelligence,
  requestPlanApproval,
  decidePlanApproval,
  __resetPlanningStore,
  __resetPlanningAudit,
  __resetPlanningMemory,
  __resetPlanningLearning,
  __resetPlanningGraphAudit,
  assertAcyclic,
  makeEdge,
  topologicalOrder,
  criticalPath,
  generateRoadmap,
  planCapabilities,
  buildWorkBreakdown,
  buildExecutionPreview,
  assessPlanningLearningProposal,
  listPlanningMemory,
  listPlanningGraphAudit,
} from "./index.js";
import { runCompanyBuilder, __resetCompanyBuilderStore } from "../company-builder/workflow.js";

describe("Phase F planning intelligence scenarios", () => {
  beforeEach(() => {
    __resetPlanningStore();
    __resetPlanningAudit();
    __resetPlanningMemory();
    __resetPlanningLearning();
    __resetPlanningGraphAudit();
    __resetCompanyBuilderStore();
  });

  it("A: objective → plan package with roadmap/WBS/preview, no execution", () => {
    const plan = runPlanningIntelligence({
      objective: "Plan a generic industry platform for Founder review",
      industry: "general",
      horizon: "90_day",
      project_id: "proj-a",
    });
    expect(plan.clarification_required).toBeFalsy();
    expect(plan.executes).toBe(false);
    expect(plan.fabricated_execution).toBe(false);
    expect(plan.roadmap?.kind).toBe("roadmap");
    expect(plan.wbs?.epics?.length).toBeGreaterThan(0);
    expect(plan.execution_preview?.executes).toBe(false);
    expect(plan.execution_preview?.fabricated_execution).toBe(false);
    expect(plan.approval_gate?.status).toBe("pending");
  });

  it("B: dependency graph topo + critical path", () => {
    const nodes = [
      { id: "a", effort: 1 },
      { id: "b", effort: 2 },
      { id: "c", effort: 1 },
    ];
    const edges = [makeEdge("a", "b", "requires"), makeEdge("b", "c", "requires")];
    const topo = topologicalOrder(nodes, edges);
    expect(topo.order).toEqual(["a", "b", "c"]);
    const cp = criticalPath(nodes, edges);
    expect(cp.path[0]).toBe("a");
    expect(cp.path.at(-1)).toBe("c");
  });

  it("C: cycle detection rejects and audits", () => {
    const edges = [makeEdge("x", "y", "requires"), makeEdge("y", "x", "requires")];
    expect(() => assertAcyclic(edges, { actor: "test" })).toThrow(/cycle/i);
    expect(listPlanningGraphAudit().some((a) => a.action === "planning.graph.cycle_rejected")).toBe(
      true
    );
  });

  it("D: roadmap horizons generate milestones without executing", () => {
    for (const horizon of ["30_day", "90_day", "180_day", "1_year", "multi_year"]) {
      const rm = generateRoadmap({
        objective: "platform plan",
        horizon,
        capabilities: ["customer-management"],
        departments: ["engineering"],
      });
      expect(rm.payload.execution_frozen).toBe(true);
      expect(rm.payload.milestone_objects.length).toBeGreaterThan(0);
    }
  });

  it("E: capability planner maps ownership without fabricating agents", () => {
    const caps = planCapabilities({
      objective: "customer management operations reporting finance security support analytics",
    });
    expect(caps.required_capabilities.length).toBeGreaterThan(0);
    expect(caps.note).toMatch(/No agents activated/i);
  });

  it("F: WBS hierarchy program→…→agent_run preview slots not scheduled", () => {
    const wbs = buildWorkBreakdown({
      objective: "Build planning structure only",
      capabilities: [{ slug: "ops", name: "Ops", owning_department: "operations" }],
    });
    expect(wbs.company.kind).toBe("company");
    expect(wbs.agent_runs[0].payload.status).toBe("not_scheduled");
    expect(wbs.execution_frozen).toBe(true);
  });

  it("G: approval lifecycle pending→approved and never executes", () => {
    const plan = runPlanningIntelligence({
      objective: "Plan a MianX Core platform programme",
      industry: "platform",
    });
    const pending = requestPlanApproval(plan.id);
    expect(pending.status).toBe("pending_approval");
    const approved = decidePlanApproval(plan.id, "approved", { actor: "founder" });
    expect(approved.status).toBe("approved");
    expect(approved.executes).toBe(false);
    expect(approved.approval_gate.status).toBe("approved");
  });

  it("H: execution preview has waves and explicit non-execution", () => {
    const plan = runPlanningIntelligence({
      objective: "Plan a generic industry platform with analytics and reporting",
      industry: "general",
    });
    expect(plan.clarification_required).toBeFalsy();
    const preview = buildExecutionPreview({
      wbs: plan.wbs,
      risks: plan.risks,
      departments: plan.capability_plan?.department_ownership || [],
      agents: plan.capability_plan?.executable_agents || [],
      roadmap: plan.roadmap,
    });
    expect(preview.execution_waves.length).toBeGreaterThan(0);
    expect(preview.executes).toBe(false);
    expect(preview.approval_required).toBe(true);
  });

  it("I: memory candidates persist in-process", () => {
    const plan = runPlanningIntelligence({
      objective: "Plan a generic industry platform programme",
      industry: "general",
    });
    expect(plan.clarification_required).toBeFalsy();
    const mem = listPlanningMemory();
    expect(mem.length).toBeGreaterThan(0);
    expect(mem.some((m) => m.type === "planning_decision")).toBe(true);
  });

  it("J: unsafe learning proposal rejected; approved plans not auto-modified", () => {
    const bad = assessPlanningLearningProposal({
      auto_apply: true,
      modifies_approved_plan: true,
      fabricates_execution: true,
      evidence: [],
      confidence: 0.1,
    });
    expect(bad.safe).toBe(false);
    expect(bad.reasons).toContain("auto_apply_forbidden");
    expect(bad.reasons).toContain("cannot_modify_approved_plan");
    expect(bad.reasons).toContain("fabricated_execution_forbidden");
  });

  it("K: Company Builder attaches planning package without fabricating execution", async () => {
    const blueprint = await runCompanyBuilder({
      objective: "Plan a generic platform capability programme",
      projectId: null,
      persist: false,
    });
    expect(blueprint.planning_intelligence?.plan_id).toBeTruthy();
    expect(blueprint.planning_package?.executes).toBe(false);
    expect(blueprint.execution?.industry_os_executed).toBe(false);
  });
});
