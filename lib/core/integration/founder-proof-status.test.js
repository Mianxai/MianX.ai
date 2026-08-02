import { describe, it, expect } from "vitest";
import {
  classifyFounderProofStatus,
  isActiveFounderProofClassification,
  isReviewPendingFounderProof,
  isActiveFounderProofUiState,
  resolveProjectsFounderProofDisplay,
  resolveProjectsMetricDisplay,
  FOUNDER_PROOF_STATUS_CLASS,
} from "./founder-proof-status.js";

describe("classifyFounderProofStatus", () => {
  it("classifies awaiting_final_review as review-pending, not inactive", () => {
    const c = classifyFounderProofStatus({
      status: "awaiting_final_review",
      stage: "founder_final_review",
    });
    expect(c).toBe(FOUNDER_PROOF_STATUS_CLASS.AWAITING_FINAL_REVIEW);
    expect(isActiveFounderProofClassification(c)).toBe(true);
    expect(isReviewPendingFounderProof(c)).toBe(true);
  });

  it("classifies uiState awaiting_final_review as active", () => {
    const c = classifyFounderProofStatus({ uiState: "awaiting_final_review" });
    expect(isActiveFounderProofClassification(c)).toBe(true);
  });

  it("classifies completed/rejected/failed as inactive terminal", () => {
    expect(isActiveFounderProofClassification(classifyFounderProofStatus({ status: "completed" }))).toBe(
      false
    );
    expect(isActiveFounderProofClassification(classifyFounderProofStatus({ status: "rejected" }))).toBe(
      false
    );
    expect(isActiveFounderProofClassification(classifyFounderProofStatus({ status: "failed" }))).toBe(
      false
    );
  });
});

describe("resolveProjectsFounderProofDisplay", () => {
  it("shows active review-pending for awaiting_final_review summary", () => {
    const display = resolveProjectsFounderProofDisplay({
      loadState: "ready",
      summary: {
        ok: true,
        canonical_integration_run: {
          id: "e8848aeb-388f-49b3-9b44-7ffbfa715110",
          stage: "founder_final_review",
          stage_label: "Final review",
          status: "awaiting_final_review",
          proof_status: "awaiting_final_review",
        },
        founder_proof_ui: {
          state: "awaiting_final_review",
          title: "Waiting for final Founder review",
          caseId: "active",
          machineStatus: "awaiting_final_review",
          machineStage: "founder_final_review",
        },
      },
    });
    expect(display.kind).toBe("active");
    expect(display.reviewPending).toBe(true);
    expect(display.showNoActiveProof).toBe(false);
    expect(display.label).toMatch(/Waiting for final Founder review/i);
    expect(display.label).not.toMatch(/No active Founder Proof/i);
  });

  it("shows truthful empty when there is genuinely no proof", () => {
    const display = resolveProjectsFounderProofDisplay({
      loadState: "ready",
      summary: {
        ok: true,
        canonical_integration_run: null,
        founder_proof_ui: {
          state: "no_proof",
          title: "No active Founder Proof",
          caseId: "empty",
        },
      },
    });
    expect(display.kind).toBe("empty");
    expect(display.showNoActiveProof).toBe(true);
    expect(display.label).toBe("No active Founder Proof");
  });

  it("does not claim no-proof while loading", () => {
    const display = resolveProjectsFounderProofDisplay({ loadState: "loading" });
    expect(display.kind).toBe("loading");
    expect(display.showNoActiveProof).toBe(false);
    expect(display.label).toBe("Loading…");
  });

  it("shows unavailable on failed metric/proof load", () => {
    const display = resolveProjectsFounderProofDisplay({ loadState: "error" });
    expect(display.kind).toBe("error");
    expect(display.label).toBe("Unavailable");
    expect(display.showNoActiveProof).toBe(false);
  });
});

describe("resolveProjectsMetricDisplay", () => {
  it("does not remain ... after successful response", () => {
    const d = resolveProjectsMetricDisplay({ loadState: "ready", value: 2 });
    expect(d.label).toBe("2");
    expect(d.label).not.toBe("…");
    expect(d.label).not.toBe("...");
  });

  it("shows explicit unavailable on failure", () => {
    const d = resolveProjectsMetricDisplay({ loadState: "error", value: null });
    expect(d.kind).toBe("error");
    expect(d.label).toBe("Unavailable");
  });

  it("shows loading label while in flight", () => {
    const d = resolveProjectsMetricDisplay({ loadState: "loading", value: null });
    expect(d.kind).toBe("loading");
    expect(d.label).toBe("Loading…");
  });
});

describe("isActiveFounderProofUiState", () => {
  it("treats awaiting_final_review ui as active", () => {
    expect(
      isActiveFounderProofUiState({ state: "awaiting_final_review", caseId: "active" })
    ).toBe(true);
  });

  it("treats no_proof as inactive", () => {
    expect(isActiveFounderProofUiState({ state: "no_proof", caseId: "empty" })).toBe(false);
  });
});
