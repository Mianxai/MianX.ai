import { describe, it, expect } from "vitest";
import {
  filterRunsForProject,
  deriveStepStates,
  getPlanGuidance,
  getSimulationGuidance,
  getMemoryGuidance,
  getLearningGuidance,
  getCreateObjectiveDisabledReason,
} from "./founder-flow.js";

describe("founder-flow", () => {
  it("filters runs to project scope", () => {
    const runs = [
      { id: "a", project_id: "p1" },
      { id: "b", project_id: "p2" },
      { id: "a", project_id: "p1" },
    ];
    expect(filterRunsForProject(runs, "p1").map((r) => r.id)).toEqual(["a"]);
  });

  it("All projects cannot create objective", () => {
    const reason = getCreateObjectiveDisabledReason({
      projectsLoading: false,
      projectsLoaded: true,
      projectId: "",
      selectedProject: null,
      persistenceReady: true,
      title: "t",
      purpose: "p",
      deliverables: "d",
      criteria: "c",
      executionMode: "deterministic_simulation",
      busy: false,
    });
    expect(reason).toMatch(/All projects|Select a specific project/i);
  });

  it("valid project enables objective when fields present", () => {
    const reason = getCreateObjectiveDisabledReason({
      projectsLoading: false,
      projectsLoaded: true,
      projectId: "p1",
      selectedProject: { id: "p1", status: "active" },
      persistenceReady: true,
      title: "Title",
      purpose: "Purpose",
      deliverables: "Deliverables",
      criteria: "Criteria",
      executionMode: "deterministic_simulation",
      busy: false,
    });
    expect(reason).toBeNull();
  });

  it("plan guidance when no run", () => {
    const g = getPlanGuidance({ hasProject: true, hasRun: false });
    expect(g?.title).toMatch(/No objective/i);
  });

  it("simulation guidance when approval required", () => {
    const g = getSimulationGuidance({
      hasProject: true,
      hasRun: true,
      runStage: "founder_approval_required",
    });
    expect(g?.title).toMatch(/approval required/i);
  });

  it("memory empty guidance", () => {
    const g = getMemoryGuidance({ hasProject: true, hasRun: true, memoryCount: 0 });
    expect(g?.reason).toMatch(/No persisted memory/i);
  });

  it("learning empty guidance", () => {
    const g = getLearningGuidance({ hasProject: true, hasRun: true, learningCount: 0 });
    expect(g?.reason).toMatch(/No learning proposals/i);
  });

  it("stepper marks project current when none selected", () => {
    const { current } = deriveStepStates({
      hasProject: false,
      hasRun: false,
      proofStatus: "not_started",
    });
    expect(current.has("project")).toBe(true);
  });
});
