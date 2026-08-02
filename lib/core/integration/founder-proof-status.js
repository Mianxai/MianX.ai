/**
 * Shared Founder Proof status classification for Admin surfaces.
 * Do not treat awaiting_final_review / founder_final_review as inactive.
 */

/** @typedef {'pending'|'running'|'awaiting_final_review'|'completed'|'rejected'|'failed'|'cancelled'|'none'|'unknown'} FounderProofStatusClass */

export const FOUNDER_PROOF_STATUS_CLASS = Object.freeze({
  PENDING: "pending",
  RUNNING: "running",
  AWAITING_FINAL_REVIEW: "awaiting_final_review",
  COMPLETED: "completed",
  REJECTED: "rejected",
  FAILED: "failed",
  CANCELLED: "cancelled",
  NONE: "none",
  UNKNOWN: "unknown",
});

/** Terminal classifications only — awaiting_final_review is intentionally absent. */
export const FOUNDER_PROOF_TERMINAL_CLASSES = Object.freeze([
  FOUNDER_PROOF_STATUS_CLASS.COMPLETED,
  FOUNDER_PROOF_STATUS_CLASS.REJECTED,
  FOUNDER_PROOF_STATUS_CLASS.FAILED,
  FOUNDER_PROOF_STATUS_CLASS.CANCELLED,
]);

const TERMINAL = new Set(FOUNDER_PROOF_TERMINAL_CLASSES);

/**
 * UI states that mean there is no actionable active proof.
 * awaiting_final_review / founder_final_review are intentionally absent.
 */
export const FOUNDER_PROOF_INACTIVE_UI_STATES = Object.freeze([
  "loading",
  "no_project",
  "no_proof",
  "completed",
  "cancelled",
  "archived",
  "resolver_error",
  "persistence_error",
]);

const INACTIVE_UI_STATES = new Set(FOUNDER_PROOF_INACTIVE_UI_STATES);

export const FOUNDER_PROOF_REVIEW_PENDING_LABEL = "Waiting for final Founder review";

/**
 * Classify a Founder Proof from status / stage / proof_status / UI state.
 * @param {{
 *   status?: string|null,
 *   stage?: string|null,
 *   proofStatus?: string|null,
 *   uiState?: string|null,
 * }} [input]
 * @returns {FounderProofStatusClass}
 */
export function classifyFounderProofStatus(input = {}) {
  const uiState = norm(input.uiState);
  const proofStatus = norm(input.proofStatus);
  const status = norm(input.status);
  const stage = norm(input.stage);

  const tokens = [uiState, proofStatus, status, stage].filter(Boolean);
  if (tokens.length === 0) return FOUNDER_PROOF_STATUS_CLASS.NONE;

  if (tokens.some((t) => t === "awaiting_final_review" || t === "founder_final_review")) {
    return FOUNDER_PROOF_STATUS_CLASS.AWAITING_FINAL_REVIEW;
  }
  if (tokens.some((t) => t === "completed")) return FOUNDER_PROOF_STATUS_CLASS.COMPLETED;
  if (tokens.some((t) => t === "rejected")) return FOUNDER_PROOF_STATUS_CLASS.REJECTED;
  if (tokens.some((t) => t === "failed")) return FOUNDER_PROOF_STATUS_CLASS.FAILED;
  if (
    tokens.some(
      (t) =>
        t === "cancelled" ||
        t === "cancelled_duplicate" ||
        t === "archived" ||
        t === "archived_duplicate"
    )
  ) {
    return FOUNDER_PROOF_STATUS_CLASS.CANCELLED;
  }
  if (
    tokens.some(
      (t) =>
        t === "no_proof" ||
        t === "no_project" ||
        t === "empty" ||
        t === "not_started"
    )
  ) {
    return FOUNDER_PROOF_STATUS_CLASS.NONE;
  }
  if (
    tokens.some(
      (t) =>
        t.includes("simulation_running") ||
        t === "verification_running" ||
        t === "collaboration_running" ||
        t === "workforce_allocated" ||
        t === "tasks_claimed"
    )
  ) {
    return FOUNDER_PROOF_STATUS_CLASS.RUNNING;
  }
  if (
    tokens.some(
      (t) =>
        t.includes("awaiting") ||
        t.includes("approval") ||
        t.includes("clarification") ||
        t === "pending" ||
        t === "ready_to_start_simulation" ||
        t === "approved_for_simulation"
    )
  ) {
    return FOUNDER_PROOF_STATUS_CLASS.PENDING;
  }
  if (tokens.some((t) => t === "active" || t === "paused")) {
    return FOUNDER_PROOF_STATUS_CLASS.RUNNING;
  }
  return FOUNDER_PROOF_STATUS_CLASS.UNKNOWN;
}

/**
 * Active (non-terminal) Founder Proof — includes awaiting_final_review.
 * @param {FounderProofStatusClass|string} classification
 */
export function isActiveFounderProofClassification(classification) {
  if (!classification || classification === FOUNDER_PROOF_STATUS_CLASS.NONE) {
    return false;
  }
  if (classification === FOUNDER_PROOF_STATUS_CLASS.UNKNOWN) return false;
  return !TERMINAL.has(classification);
}

/**
 * @param {FounderProofStatusClass|string} classification
 */
export function isTerminalFounderProofClassification(classification) {
  return TERMINAL.has(classification);
}

/**
 * @param {FounderProofStatusClass|string} classification
 */
export function isReviewPendingFounderProof(classification) {
  return classification === FOUNDER_PROOF_STATUS_CLASS.AWAITING_FINAL_REVIEW;
}

/**
 * Compact truth row for tests and audits.
 * @param {{ status?: string|null, stage?: string|null, proofStatus?: string|null, uiState?: string|null }} [input]
 */
export function describeFounderProofClassification(input = {}) {
  const classification = classifyFounderProofStatus(input);
  const active = isActiveFounderProofClassification(classification);
  const terminal = isTerminalFounderProofClassification(classification);
  const reviewPending = isReviewPendingFounderProof(classification);
  return {
    classification,
    active,
    terminal,
    reviewPending,
    inactive: !active,
  };
}

/**
 * Whether a founder_proof_ui view represents an active (non-terminal) proof.
 * @param {{ state?: string, caseId?: string|null }|null|undefined} ui
 */
export function isActiveFounderProofUiState(ui) {
  if (!ui?.state) return false;
  if (INACTIVE_UI_STATES.has(ui.state)) return false;
  if (ui.caseId === "terminal_only" || ui.caseId === "empty") return false;
  return true;
}

/**
 * Projects card / shared label from operational summary + load lifecycle.
 * @param {{
 *   loadState: 'loading'|'ready'|'error'|'idle',
 *   summary?: object|null,
 * }} input
 * @returns {{
 *   kind: 'loading'|'error'|'active'|'empty',
 *   label: string,
 *   classification: FounderProofStatusClass,
 *   reviewPending: boolean,
 *   showNoActiveProof: boolean,
 * }}
 */
export function resolveProjectsFounderProofDisplay({ loadState, summary = null } = {}) {
  if (loadState === "loading" || loadState === "idle") {
    return {
      kind: "loading",
      label: "Loading…",
      classification: FOUNDER_PROOF_STATUS_CLASS.UNKNOWN,
      reviewPending: false,
      showNoActiveProof: false,
    };
  }
  if (loadState === "error" || summary?.ok === false) {
    return {
      kind: "error",
      label: "Unavailable",
      classification: FOUNDER_PROOF_STATUS_CLASS.UNKNOWN,
      reviewPending: false,
      showNoActiveProof: false,
    };
  }

  const ui = summary?.founder_proof_ui || null;
  const run = summary?.canonical_integration_run || null;
  const classification = classifyFounderProofStatus({
    uiState: ui?.state,
    proofStatus: run?.proof_status || ui?.machineStatus,
    status: run?.status,
    stage: run?.stage || run?.current_stage || ui?.machineStage,
  });

  if (classification === FOUNDER_PROOF_STATUS_CLASS.UNKNOWN && !isActiveFounderProofUiState(ui)) {
    return {
      kind: "error",
      label: "Unavailable",
      classification: FOUNDER_PROOF_STATUS_CLASS.UNKNOWN,
      reviewPending: false,
      showNoActiveProof: false,
    };
  }

  if (isActiveFounderProofUiState(ui) || isActiveFounderProofClassification(classification)) {
    const reviewPending = isReviewPendingFounderProof(classification);
    return {
      kind: "active",
      label:
        ui?.title ||
        (reviewPending
          ? FOUNDER_PROOF_REVIEW_PENDING_LABEL
          : run?.stage_label || run?.proof_status || "Founder Proof active"),
      classification,
      reviewPending,
      showNoActiveProof: false,
    };
  }

  if (ui?.state === "no_proof" || ui?.caseId === "empty" || classification === "none") {
    return {
      kind: "empty",
      label: ui?.title || "No active Founder Proof",
      classification: FOUNDER_PROOF_STATUS_CLASS.NONE,
      reviewPending: false,
      showNoActiveProof: true,
    };
  }

  if (ui?.title) {
    return {
      kind: TERMINAL.has(classification) ? "empty" : "active",
      label: ui.title,
      classification,
      reviewPending: false,
      showNoActiveProof: ui.caseId === "terminal_only" || TERMINAL.has(classification),
    };
  }

  return {
    kind: "empty",
    label: "No active Founder Proof",
    classification: FOUNDER_PROOF_STATUS_CLASS.NONE,
    reviewPending: false,
    showNoActiveProof: true,
  };
}

/**
 * Projects card proof selection from an operational summary.
 * Canonical selection is server-side (`canonical_integration_run` /
 * `founder_proof_ui`); this helper never invents runs and never prefers
 * historical terminal rows over the summary's active canonical.
 *
 * @param {{ loadState: string, summary?: object|null }} input
 */
export function selectProjectsFounderProofDisplay(input) {
  return resolveProjectsFounderProofDisplay(input);
}

/**
 * Metric cell display: never leave indefinite "..." after load settles.
 * @param {{ loadState: string, value: unknown }} input
 */
export function resolveProjectsMetricDisplay({ loadState, value } = {}) {
  if (loadState === "loading" || loadState === "idle") {
    return { kind: "loading", label: "Loading…", value: null };
  }
  if (loadState === "error") {
    return { kind: "error", label: "Unavailable", value: null };
  }
  if (value === null || value === undefined || value === "") {
    return { kind: "empty", label: "—", value: null };
  }
  return { kind: "ready", label: String(value), value };
}

function norm(v) {
  if (v == null || v === "") return "";
  return String(v).trim().toLowerCase();
}
