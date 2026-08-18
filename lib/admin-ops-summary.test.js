import { describe, it, expect } from "vitest";
import { hasActiveFounderProof } from "./admin-ops-summary.js";

describe("hasActiveFounderProof", () => {
  it("treats awaiting_final_review canonical run as active", () => {
    expect(
      hasActiveFounderProof({
        ok: true,
        canonical_integration_run: {
          id: "e8848aeb-388f-49b3-9b44-7ffbfa715110",
          status: "awaiting_final_review",
          stage: "founder_final_review",
          proof_status: "awaiting_final_review",
        },
        founder_proof_ui: {
          state: "awaiting_final_review",
          caseId: "active",
        },
      })
    ).toBe(true);
  });

  it("is false for genuine no_proof", () => {
    expect(
      hasActiveFounderProof({
        ok: true,
        canonical_integration_run: null,
        founder_proof_ui: { state: "no_proof", caseId: "empty" },
      })
    ).toBe(false);
  });
});
