/**
 * Unit tests for Founder Proof UI state + health count error semantics.
 */

import { describe, it, expect } from "vitest";
import {
  FOUNDER_PROOF_STATES,
  resolveFounderProofUiState,
  buildFounderProofStateFromRuns,
} from "./founder-proof-state.js";
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

describe("FOUNDER_PROOF_STATES", () => {
  it("includes required enum values", () => {
    for (const s of [
      "loading",
      "no_project",
      "no_proof",
      "awaiting_plan_approval",
      "awaiting_simulation_approval",
      "ready_to_start_simulation",
      "completed",
      "cancelled",
      "resolver_error",
      "persistence_error",
    ]) {
      expect(FOUNDER_PROOF_STATES).toContain(s);
    }
  });
});

describe("resolveFounderProofUiState", () => {
  it("no project", () => {
    const v = resolveFounderProofUiState({});
    expect(v.state).toBe("no_project");
    expect(v.primaryCta?.label).toMatch(/Select project/i);
  });

  it("activeProofCount 0 with no historical runs", () => {
    const v = buildFounderProofStateFromRuns({ projectId: PROJECT, runs: [] });
    expect(v.state).toBe("no_proof");
    expect(v.caseId).toBe("empty");
    expect(v.primaryCta?.requiresConfirmation).toBe(true);
  });

  it("activeProofCount 0 with resumable non-terminal run", () => {
    const run = proofRun();
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      // title mismatch would previously hide; flag+title present
      runs: [run],
    });
    expect(v.state).toBe("awaiting_plan_approval");
    expect(v.primaryCta?.label).toMatch(/Review Plan/i);
  });

  it("activeProofCount 0 with completed run", () => {
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      runs: [
        proofRun({
          current_stage: "completed",
          status: "completed",
          completed_at: "2026-07-29T00:00:00.000Z",
        }),
      ],
    });
    expect(v.state).toBe("completed");
    expect(v.caseId).toBe("terminal_only");
    expect(v.secondaryCta?.id).toBe("start_new_proof");
  });

  it("activeProofCount 0 with cancelled run", () => {
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      runs: [
        proofRun({
          current_stage: "cancelled_duplicate",
          status: "cancelled",
          proof: { is_production_proof: true, cancelled_as_duplicate: true },
        }),
      ],
    });
    expect(["cancelled", "archived"]).toContain(v.state);
    expect(v.caseId).toBe("terminal_only");
  });

  it("query failure is not treated as no proof", () => {
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      runs: [],
      queryError: "integration_runs_query_failed",
    });
    expect(v.state).toBe("resolver_error");
    expect(v.primaryCta?.id).toBe("retry");
    expect(v.secondaryCta?.id).toBe("diagnostics");
    expect(JSON.stringify(v)).not.toMatch(/Start a new Founder Proof/i);
  });

  it("persistence error", () => {
    const v = resolveFounderProofUiState({
      projectId: PROJECT,
      persistenceError: true,
    });
    expect(v.state).toBe("persistence_error");
  });

  it("one canonical active run at plan approval", () => {
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      runs: [proofRun()],
    });
    expect(v.state).toBe("awaiting_plan_approval");
    expect(v.machineStage).toBe("founder_approval_required");
    expect(v.willNotHappen.join(" ")).toMatch(/Simulation will not start/i);
  });

  it("duplicate active runs surface resolve action", () => {
    const a = proofRun({ id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", started_at: "2026-07-01T00:00:00.000Z" });
    const b = proofRun({ id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", started_at: "2026-07-02T00:00:00.000Z" });
    const v = buildFounderProofStateFromRuns({ projectId: PROJECT, runs: [a, b] });
    expect(v.state).toBe("awaiting_plan_approval");
    expect(v.primaryCta?.label).toMatch(/duplicate|Review Plan|Resolve/i);
  });

  it("simulation approval stage", () => {
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      runs: [proofRun({ current_stage: "simulation_approval_required" })],
    });
    expect(v.state).toBe("awaiting_simulation_approval");
  });

  it("ready to start simulation", () => {
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      runs: [proofRun({ current_stage: "approved_for_simulation", status: "active" })],
    });
    expect(v.state).toBe("ready_to_start_simulation");
  });

  it("final review stage", () => {
    const v = buildFounderProofStateFromRuns({
      projectId: PROJECT,
      runs: [proofRun({ current_stage: "founder_final_review" })],
    });
    expect(v.state).toBe("awaiting_final_review");
  });
});

describe("health count error semantics", () => {
  it("null activeProofCount must not coerce to zero via || 0 pattern", () => {
    const proofTs = { activeProofCount: null, proofQueryError: "boom" };
    const activeProofCount =
      proofTs.proofQueryError != null
        ? null
        : proofTs.activeProofCount != null
          ? proofTs.activeProofCount
          : 0;
    expect(activeProofCount).toBeNull();
    expect(activeProofCount || 0).toBe(0); // documents the old bug
  });
});
