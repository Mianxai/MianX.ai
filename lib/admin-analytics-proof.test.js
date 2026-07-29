import { describe, it, expect } from "vitest";
import { deriveFounderProofAnalytics } from "@/lib/admin-analytics-proof";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "@/lib/core/integration/proof";

function proofRun(overrides = {}) {
  return {
    id: overrides.id || "run-1",
    status: "active",
    current_stage: "founder_approval_required",
    proof: { is_production_proof: true },
    objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
    started_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("deriveFounderProofAnalytics", () => {
  it("separates active, waiting, completed, and cancelled without inventing counts", () => {
    const metrics = deriveFounderProofAnalytics([
      proofRun({ id: "a", current_stage: "founder_approval_required" }),
      proofRun({
        id: "b",
        current_stage: "completed",
        status: "completed",
        started_at: "2026-01-02T00:00:00.000Z",
      }),
      proofRun({
        id: "c",
        current_stage: "cancelled",
        status: "cancelled",
        started_at: "2026-01-03T00:00:00.000Z",
      }),
      { id: "noise", status: "active", current_stage: "plan_generated" },
    ]);

    expect(metrics.active_founder_proofs).toBe(1);
    expect(metrics.waiting_for_founder_action).toBe(1);
    expect(metrics.completed_proofs).toBe(1);
    expect(metrics.cancelled_proofs).toBe(1);
    expect(metrics.historical_integration_runs).toBe(3);
    expect(metrics.duplicate_active_runs).toBe(0);
  });

  it("counts duplicate active runs", () => {
    const metrics = deriveFounderProofAnalytics([
      proofRun({ id: "a", started_at: "2026-01-01T00:00:00.000Z" }),
      proofRun({
        id: "b",
        current_stage: "clarification_required",
        started_at: "2026-01-02T00:00:00.000Z",
      }),
    ]);
    expect(metrics.active_founder_proofs).toBe(2);
    expect(metrics.duplicate_active_runs).toBe(1);
    expect(metrics.waiting_for_founder_action).toBe(2);
  });
});
