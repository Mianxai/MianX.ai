/**
 * Proof diagnostics builder — read-only, no mutation.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../repo.js", () => ({
  getProject: vi.fn(),
}));

vi.mock("./persist.js", () => ({
  listPersistedIntegrationRunsResult: vi.fn(),
  mapProofStatusFromRun: vi.fn((run) => {
    if (!run) return "not_started";
    if (run.current_stage === "completed") return "completed";
    if (run.current_stage === "founder_approval_required") return "awaiting_plan_approval";
    if (run.status === "cancelled") return "cancelled";
    return "objective_created";
  }),
  loadIntegrationRun: vi.fn(),
}));

vi.mock("./store.js", () => ({
  listStageEvents: vi.fn(() => []),
}));

import * as repo from "../repo.js";
import {
  listPersistedIntegrationRunsResult,
  loadIntegrationRun,
} from "./persist.js";
import { buildProofDiagnostics } from "./proof-diagnostics.js";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "./proof.js";

const PROJECT = "61d3b1fd-c260-479b-9289-0c75f977e892";
const RUN_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

function proofRun(overrides = {}) {
  return {
    id: RUN_ID,
    project_id: PROJECT,
    current_stage: "founder_approval_required",
    status: "active",
    execution_mode: "deterministic_simulation",
    started_at: "2026-07-28T10:00:00.000Z",
    updated_at: "2026-07-28T12:00:00.000Z",
    objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
    proof: { is_production_proof: true },
    ...overrides,
  };
}

describe("buildProofDiagnostics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    repo.getProject.mockResolvedValue({
      id: PROJECT,
      name: "MianX Internal Production Proof",
      status: "active",
    });
  });

  it("returns query error distinctly from empty proof", async () => {
    listPersistedIntegrationRunsResult.mockResolvedValue({
      ok: false,
      runs: [],
      error: "permission denied",
      source: "query_failed",
    });
    loadIntegrationRun.mockResolvedValue(null);

    const d = await buildProofDiagnostics({ projectId: PROJECT });
    expect(d.ok).toBe(false);
    expect(d.active_proof_count).toBeNull();
    expect(d.ui_state.state).toBe("resolver_error");
    expect(d.mutation).toBe(false);
  });

  it("reports resumable non-terminal run", async () => {
    const run = proofRun();
    listPersistedIntegrationRunsResult.mockResolvedValue({
      ok: true,
      runs: [run],
      error: null,
      source: "persisted_integration_runs",
    });
    loadIntegrationRun.mockResolvedValue(run);

    const d = await buildProofDiagnostics({ projectId: PROJECT });
    expect(d.ok).toBe(true);
    expect(d.active_proof_count).toBe(1);
    expect(d.looked_up_run_found).toBe(true);
    expect(d.looked_up_run.terminal).toBe(false);
    expect(d.looked_up_run.current_stage).toBe("founder_approval_required");
  });

  it("rejects cross-project looked-up run", async () => {
    listPersistedIntegrationRunsResult.mockResolvedValue({
      ok: true,
      runs: [],
      error: null,
      source: "persisted_integration_runs",
    });
    loadIntegrationRun.mockResolvedValue(
      proofRun({ project_id: "00000000-0000-4000-8000-000000000099" })
    );

    const d = await buildProofDiagnostics({ projectId: PROJECT });
    expect(d.looked_up_run).toBeNull();
    expect(d.looked_up_run_error).toBe("cross_project_run");
  });

  it("never includes secrets in payload", async () => {
    listPersistedIntegrationRunsResult.mockResolvedValue({
      ok: true,
      runs: [proofRun()],
      error: null,
      source: "persisted_integration_runs",
    });
    loadIntegrationRun.mockResolvedValue(proofRun());
    const d = await buildProofDiagnostics({ projectId: PROJECT });
    const json = JSON.stringify(d);
    expect(json).not.toMatch(/sk-ant|service_role|Bearer /i);
  });
});
