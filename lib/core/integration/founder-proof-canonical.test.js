import { describe, it, expect, beforeEach } from "vitest";
import {
  __resetIntegrationRuntime,
  createIntegrationRun,
  saveRun,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
} from "../integration/index.js";
import {
  resolveCanonicalFounderProofRuns,
  formatIntegrationStageLabel,
} from "../integration/founder-proof-canonical.js";

describe("founder-proof-canonical", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
  });

  it("selects earliest active run as canonical", () => {
    const a = {
      id: "run-a",
      started_at: "2026-01-01T00:00:00.000Z",
      proof: { is_production_proof: true },
      objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
      current_stage: "clarification_required",
      status: "awaiting_clarification",
    };
    const b = {
      id: "run-b",
      started_at: "2026-01-02T00:00:00.000Z",
      proof: { is_production_proof: true },
      objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
      current_stage: "clarification_required",
      status: "awaiting_clarification",
    };
    const res = resolveCanonicalFounderProofRuns([a, b]);
    expect(res.canonical_run.id).toBe("run-a");
    expect(res.duplicate_count).toBe(1);
    expect(res.duplicate_warning).toBe(true);
  });

  it("formats clarification stage label", () => {
    expect(formatIntegrationStageLabel("clarification_required")).toBe(
      "Clarification required"
    );
    expect(formatIntegrationStageLabel("")).toBe("Unknown");
  });

  it("createIntegrationRun blocks live_provider without provider", () => {
    expect(() =>
      createIntegrationRun(
        {
          ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
          project_id: "proj-live",
          execution_mode: "live_provider",
          unresolved_questions: [],
        },
        { actor: "founder" }
      )
    ).toThrow(/live_provider/i);
  });
});
