import { describe, it, expect } from "vitest";
import {
  classifyFounderProofStatus,
  describeFounderProofClassification,
  isActiveFounderProofClassification,
  isTerminalFounderProofClassification,
  isReviewPendingFounderProof,
  isActiveFounderProofUiState,
  resolveProjectsFounderProofDisplay,
  resolveProjectsMetricDisplay,
  selectProjectsFounderProofDisplay,
  FOUNDER_PROOF_STATUS_CLASS,
  FOUNDER_PROOF_TERMINAL_CLASSES,
  FOUNDER_PROOF_INACTIVE_UI_STATES,
  FOUNDER_PROOF_REVIEW_PENDING_LABEL,
} from "./founder-proof-status.js";
import {
  resolveCanonicalFounderProofRuns,
} from "./founder-proof-canonical.js";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "./proof.js";

describe("terminal / inactive set contents (semantic)", () => {
  it("TERMINAL contains only completed/rejected/failed/cancelled", () => {
    expect([...FOUNDER_PROOF_TERMINAL_CLASSES].sort()).toEqual(
      ["cancelled", "completed", "failed", "rejected"].sort()
    );
  });

  it("awaiting_final_review and founder_final_review are absent from terminal/inactive sets", () => {
    expect(FOUNDER_PROOF_TERMINAL_CLASSES).not.toContain("awaiting_final_review");
    expect(FOUNDER_PROOF_TERMINAL_CLASSES).not.toContain("founder_final_review");
    expect(FOUNDER_PROOF_INACTIVE_UI_STATES).not.toContain("awaiting_final_review");
    expect(FOUNDER_PROOF_INACTIVE_UI_STATES).not.toContain("founder_final_review");
  });

  it("reusable helper source has no hard-coded canonical Production IDs", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const src = readFileSync(
      resolve(import.meta.dirname, "founder-proof-status.js"),
      "utf8"
    );
    expect(src).not.toContain("61d3b1fd-c260-479b-9289-0c75f977e892");
    expect(src).not.toContain("e8848aeb-388f-49b3-9b44-7ffbfa715110");
  });
});

describe("classifier truth table (executed)", () => {
  const rows = [
    {
      name: "pending",
      input: { status: "pending" },
      expect: { classification: "pending", active: true, terminal: false, reviewPending: false },
    },
    {
      name: "running",
      input: { status: "active", stage: "verification_running" },
      expect: { classification: "running", active: true, terminal: false, reviewPending: false },
    },
    {
      name: "awaiting_final_review",
      input: { status: "awaiting_final_review" },
      expect: {
        classification: "awaiting_final_review",
        active: true,
        terminal: false,
        reviewPending: true,
        inactive: false,
      },
    },
    {
      name: "founder_final_review",
      input: { stage: "founder_final_review" },
      expect: {
        classification: "awaiting_final_review",
        active: true,
        terminal: false,
        reviewPending: true,
        inactive: false,
      },
    },
    {
      name: "completed",
      input: { status: "completed" },
      expect: { classification: "completed", active: false, terminal: true, reviewPending: false },
    },
    {
      name: "rejected",
      input: { status: "rejected" },
      expect: { classification: "rejected", active: false, terminal: true, reviewPending: false },
    },
    {
      name: "failed",
      input: { status: "failed" },
      expect: { classification: "failed", active: false, terminal: true, reviewPending: false },
    },
    {
      name: "cancelled",
      input: { status: "cancelled" },
      expect: { classification: "cancelled", active: false, terminal: true, reviewPending: false },
    },
    {
      name: "missing/null",
      input: {},
      expect: { classification: "none", active: false, terminal: false, reviewPending: false },
    },
    {
      name: "unknown",
      input: { status: "weird_future_state_xyz" },
      expect: { classification: "unknown", active: false, terminal: false, reviewPending: false },
    },
  ];

  for (const row of rows) {
    it(`classifies ${row.name}`, () => {
      const truth = describeFounderProofClassification(row.input);
      expect(truth.classification).toBe(row.expect.classification);
      expect(truth.active).toBe(row.expect.active);
      expect(truth.terminal).toBe(row.expect.terminal);
      expect(truth.reviewPending).toBe(row.expect.reviewPending);
      if (row.expect.inactive != null) {
        expect(truth.inactive).toBe(row.expect.inactive);
      }
      expect(isTerminalFounderProofClassification(truth.classification)).toBe(
        row.expect.terminal
      );
      expect(isActiveFounderProofClassification(truth.classification)).toBe(row.expect.active);
      expect(isReviewPendingFounderProof(truth.classification)).toBe(row.expect.reviewPending);
    });
  }

  it("awaiting_final_review UI label is Waiting for final Founder review", () => {
    const display = resolveProjectsFounderProofDisplay({
      loadState: "ready",
      summary: {
        ok: true,
        canonical_integration_run: {
          id: "run-fixture",
          stage: "founder_final_review",
          status: "awaiting_final_review",
          proof_status: "awaiting_final_review",
        },
        founder_proof_ui: {
          state: "awaiting_final_review",
          title: FOUNDER_PROOF_REVIEW_PENDING_LABEL,
          caseId: "active",
        },
      },
    });
    expect(display.label).toBe("Waiting for final Founder review");
    expect(display.reviewPending).toBe(true);
    expect(display.showNoActiveProof).toBe(false);
    expect(display.kind).toBe("active");
  });

  it("unknown classification surfaces Unavailable, not completed/no-proof", () => {
    const display = resolveProjectsFounderProofDisplay({
      loadState: "ready",
      summary: {
        ok: true,
        canonical_integration_run: {
          id: "run-x",
          status: "weird_future_state_xyz",
          stage: "weird_future_state_xyz",
        },
        founder_proof_ui: null,
      },
    });
    expect(display.kind).toBe("error");
    expect(display.label).toBe("Unavailable");
    expect(display.showNoActiveProof).toBe(false);
    expect(display.classification).toBe(FOUNDER_PROOF_STATUS_CLASS.UNKNOWN);
  });
});

describe("active-run precedence (canonical selection + card display)", () => {
  function proofRun(overrides = {}) {
    return {
      id: overrides.id || "run-a",
      project_id: "proj-test",
      current_stage: overrides.current_stage || "founder_final_review",
      status: overrides.status || "awaiting_final_review",
      started_at: overrides.started_at || "2026-08-01T10:00:00.000Z",
      updated_at: overrides.updated_at || "2026-08-01T12:00:00.000Z",
      objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
      proof: { is_production_proof: true },
      evidence: { count: overrides.evidenceCount || 0 },
      memory: { count: 0 },
      learning: { count: 0 },
      ...overrides,
    };
  }

  it("one awaiting_final_review run is selected as active review-pending", () => {
    const run = proofRun({ id: "run-active" });
    const resolved = resolveCanonicalFounderProofRuns([run]);
    expect(resolved.canonical_run?.id).toBe("run-active");
    const display = selectProjectsFounderProofDisplay({
      loadState: "ready",
      summary: {
        ok: true,
        canonical_integration_run: {
          id: resolved.canonical_run.id,
          stage: resolved.canonical_run.current_stage,
          status: resolved.canonical_run.status,
          proof_status: "awaiting_final_review",
        },
        founder_proof_ui: {
          state: "awaiting_final_review",
          title: FOUNDER_PROOF_REVIEW_PENDING_LABEL,
          caseId: "active",
        },
      },
    });
    expect(display.kind).toBe("active");
    expect(display.reviewPending).toBe(true);
  });

  it("older failed history does not hide newer awaiting_final_review", () => {
    const failed = proofRun({
      id: "run-old-failed",
      current_stage: "failed",
      status: "failed",
      started_at: "2026-07-01T00:00:00.000Z",
      updated_at: "2026-07-01T01:00:00.000Z",
    });
    const active = proofRun({
      id: "run-new-review",
      current_stage: "founder_final_review",
      status: "awaiting_final_review",
      started_at: "2026-08-02T00:00:00.000Z",
      updated_at: "2026-08-02T01:00:00.000Z",
    });
    // Out-of-order array: failed first
    const resolved = resolveCanonicalFounderProofRuns([failed, active]);
    expect(resolved.canonical_run?.id).toBe("run-new-review");
    expect(resolved.active_founder_proof_run_count).toBe(1);
    const display = resolveProjectsFounderProofDisplay({
      loadState: "ready",
      summary: {
        ok: true,
        canonical_integration_run: {
          id: resolved.canonical_run.id,
          stage: "founder_final_review",
          status: "awaiting_final_review",
          proof_status: "awaiting_final_review",
        },
        founder_proof_ui: {
          state: "awaiting_final_review",
          title: FOUNDER_PROOF_REVIEW_PENDING_LABEL,
          caseId: "active",
        },
        integration: {
          runs: [
            { id: failed.id, status: "failed", proof_status: "failed" },
            {
              id: active.id,
              status: "awaiting_final_review",
              proof_status: "awaiting_final_review",
            },
          ],
        },
      },
    });
    expect(display.showNoActiveProof).toBe(false);
    expect(display.label).toBe(FOUNDER_PROOF_REVIEW_PENDING_LABEL);
  });

  it("older completed does not hide newer running", () => {
    const completed = proofRun({
      id: "run-completed",
      current_stage: "completed",
      status: "completed",
      started_at: "2026-07-01T00:00:00.000Z",
    });
    const running = proofRun({
      id: "run-running",
      current_stage: "verification_running",
      status: "active",
      started_at: "2026-08-02T00:00:00.000Z",
    });
    const resolved = resolveCanonicalFounderProofRuns([completed, running]);
    expect(resolved.canonical_run?.id).toBe("run-running");
    expect(classifyFounderProofStatus({ stage: resolved.canonical_run.current_stage })).toBe(
      "running"
    );
  });

  it("multiple active runs prefer earliest started_at deterministically", () => {
    const later = proofRun({
      id: "run-later",
      started_at: "2026-08-03T00:00:00.000Z",
      current_stage: "founder_final_review",
      status: "awaiting_final_review",
    });
    const earlier = proofRun({
      id: "run-earlier",
      started_at: "2026-08-01T00:00:00.000Z",
      current_stage: "founder_final_review",
      status: "awaiting_final_review",
    });
    const resolved = resolveCanonicalFounderProofRuns([later, earlier]);
    expect(resolved.canonical_run?.id).toBe("run-earlier");
    expect(resolved.duplicate_count).toBe(1);
  });

  it("genuine absence shows No active Founder Proof", () => {
    const resolved = resolveCanonicalFounderProofRuns([]);
    expect(resolved.canonical_run).toBeNull();
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
    expect(display.showNoActiveProof).toBe(true);
    expect(display.label).toBe("No active Founder Proof");
  });

  it("malformed payload / load error shows Unavailable, never fabricates a run", () => {
    expect(
      resolveProjectsFounderProofDisplay({ loadState: "error", summary: null }).label
    ).toBe("Unavailable");
    expect(
      resolveProjectsFounderProofDisplay({
        loadState: "ready",
        summary: { ok: false },
      }).kind
    ).toBe("error");
  });
});

describe("resolveProjectsMetricDisplay", () => {
  it("loading / ready / zero / unavailable", () => {
    expect(resolveProjectsMetricDisplay({ loadState: "loading" }).label).toBe("Loading…");
    expect(resolveProjectsMetricDisplay({ loadState: "ready", value: 3 }).label).toBe("3");
    expect(resolveProjectsMetricDisplay({ loadState: "ready", value: 0 })).toEqual({
      kind: "ready",
      label: "0",
      value: 0,
    });
    expect(resolveProjectsMetricDisplay({ loadState: "error" }).label).toBe("Unavailable");
    expect(resolveProjectsMetricDisplay({ loadState: "ready", value: 0 }).label).not.toBe(
      "Unavailable"
    );
    expect(resolveProjectsMetricDisplay({ loadState: "ready", value: 1 }).label).not.toMatch(
      /^\.\.\.?$/
    );
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
