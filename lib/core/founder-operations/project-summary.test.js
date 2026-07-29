import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  __resetIntegrationRuntime,
  createIntegrationRun,
  saveRun,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
} from "../integration/index.js";
import { buildProjectOperationalSummary } from "./project-summary.js";

vi.mock("../repo.js", () => ({
  listTasks: vi.fn(async () => []),
  listJobs: vi.fn(async () => ({ rows: [] })),
  listRuns: vi.fn(async () => []),
  listApprovals: vi.fn(async () => []),
  getProject: vi.fn(async () => ({
    id: "61d3b1fd-c260-479b-9289-0c75f977e892",
    name: "MianX Internal Production Proof",
    status: "active",
  })),
}));

vi.mock("../integration/persist.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    listPersistedIntegrationRuns: vi.fn(async () => []),
  };
});

describe("project operational summary", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
  });

  it("includes integration proof objective when run exists", async () => {
    const { run } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: "61d3b1fd-c260-479b-9289-0c75f977e892",
        unresolved_questions: ["q?"],
      },
      { actor: "founder" }
    );
    run.proof = { is_production_proof: true };
    saveRun(run);

    const summary = await buildProjectOperationalSummary({
      projectId: "61d3b1fd-c260-479b-9289-0c75f977e892",
    });

    expect(summary.ok).toBe(true);
    expect(summary.project_name).toBe("MianX Internal Production Proof");
    expect(summary.objectives.some((o) => o.source_type === "integration_proof")).toBe(
      true
    );
    expect(summary.canonical_integration_run?.id).toBe(run.id);
  });
});
