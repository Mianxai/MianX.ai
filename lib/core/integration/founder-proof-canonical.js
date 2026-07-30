/**
 * Canonical active Founder production proof run resolution (server-side).
 */

import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "./proof.js";
import { mapProofStatusFromRun } from "./persist.js";
import { assessProviderGate } from "./provider-gate.js";

export function isFounderProductionProofRun(run) {
  const flagged = Boolean(
    run?.proof?.is_production_proof || run?.payload?.is_production_proof
  );
  if (!flagged) return false;
  const title = String(run?.objective?.title || run?.objective_title || "").trim();
  // Flag is the durable identity. Title match is preferred but case-insensitive;
  // empty title still counts so payload drift cannot hide a non-terminal proof.
  if (!title) return true;
  return (
    title.toLowerCase() === FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title.toLowerCase()
  );
}

export function isTerminalFounderProofRun(run) {
  const stage = run?.current_stage || "";
  const status = run?.status || "";
  const ps = mapProofStatusFromRun(run);
  return (
    ["completed", "rejected", "failed", "cancelled"].includes(ps) ||
    ["completed", "rejected", "failed", "cancelled", "cancelled_duplicate", "archived_duplicate"].includes(
      stage
    ) ||
    ["completed", "rejected", "failed", "cancelled"].includes(status) ||
    Boolean(run?.proof?.cancelled_as_duplicate)
  );
}

function proofProgressScore(run) {
  return (
    (run?.evidence?.count || 0) +
    (run?.memory?.count || 0) +
    (run?.learning?.count || 0)
  );
}

/**
 * @param {Array<object>} runs — integration run objects (memory or persisted payload.run)
 * @returns {{
 *   canonical_run: object|null,
 *   duplicate_runs: object[],
 *   canonical_reason: string|null,
 *   duplicate_count: number,
 *   duplicate_warning: boolean,
 *   active_founder_proof_run_count: number,
 * }}
 */
export function resolveCanonicalFounderProofRuns(runs = []) {
  const proofCandidates = (runs || []).filter(isFounderProductionProofRun);
  const active = proofCandidates.filter((r) => !isTerminalFounderProofRun(r));

  if (!active.length) {
    return {
      canonical_run: null,
      duplicate_runs: [],
      canonical_reason: null,
      duplicate_count: 0,
      duplicate_warning: false,
      active_founder_proof_run_count: 0,
    };
  }

  const sorted = [...active].sort((a, b) => {
    const at = String(a.started_at || a.updated_at || "");
    const bt = String(b.started_at || b.updated_at || "");
    const t = at.localeCompare(bt);
    if (t !== 0) return t;
    return proofProgressScore(b) - proofProgressScore(a);
  });

  const canonical = sorted[0];
  const duplicates = sorted.slice(1);

  let canonical_reason = "earliest_active_non_terminal";
  if (duplicates.length > 0) {
    const bestDupScore = proofProgressScore(duplicates[0]);
    const canonScore = proofProgressScore(canonical);
    if (bestDupScore > canonScore) {
      canonical_reason = "earliest_active_preferred_over_later_empty_duplicates";
    }
  }

  return {
    canonical_run: canonical,
    duplicate_runs: duplicates,
    canonical_reason,
    duplicate_count: duplicates.length,
    duplicate_warning: duplicates.length > 0,
    active_founder_proof_run_count: active.length,
  };
}

export function formatIntegrationStageLabel(stage) {
  if (!stage) return "Unknown";
  const map = {
    objective_received: "Objective received",
    objective_validated: "Objective validated",
    clarification_required: "Clarification required",
    templates_matched: "Templates matched",
    capabilities_mapped: "Capabilities mapped",
    plan_generated: "Plan generated",
    dependencies_validated: "Dependencies validated",
    execution_preview_generated: "Execution preview",
    founder_approval_required: "Review and approve plan",
    simulation_approval_required: "Waiting for Simulation Approval",
    approved_for_simulation: "Ready to start simulation",
    workforce_allocated: "Workforce allocated",
    tasks_claimed: "Tasks claimed",
    collaboration_running: "Collaboration",
    verification_running: "Verification",
    memory_writing: "Memory writing",
    learning_proposals_created: "Learning proposals",
    founder_final_review: "Final review",
    completed: "Completed",
    rejected: "Rejected",
    failed: "Failed",
    paused: "Paused",
    cancelled: "Cancelled",
  };
  return map[stage] || String(stage).replace(/_/g, " ");
}

export function isLiveProviderRunBlocked(run) {
  if (!run || run.execution_mode !== "live_provider") return false;
  const gate = assessProviderGate({ execution_mode: "live_provider" });
  return !gate.live_execution_ready;
}

export function deriveNextFounderProofAction(ctx = {}) {
  const {
    duplicate_warning,
    canonical_run,
    proof_status,
    run_stage,
  } = ctx;

  if (duplicate_warning) {
    const projectId = canonical_run?.project_id;
    const runId = canonical_run?.id;
    const qs = new URLSearchParams({ tab: "dashboard" });
    if (projectId) qs.set("project_id", projectId);
    if (runId) qs.set("run_id", runId);
    return {
      id: "resolve_duplicates",
      label: "Resolve duplicate proof runs",
      href: `/admin/integration?${qs.toString()}#duplicates`,
      reason:
        "Multiple active production Founder proof runs detected. Cancel non-canonical duplicates before clarification.",
      severity: "action_required",
    };
  }

  const stage = run_stage || canonical_run?.current_stage;
  const status = proof_status || mapProofStatusFromRun(canonical_run);

  if (!canonical_run && status === "not_started") {
    return {
      id: "start_proof",
      label: "Start Founder Proof",
      href: "/admin/integration",
      reason: "No production Founder proof run exists for this project yet.",
      severity: "action_required",
    };
  }

  if (stage === "clarification_required" || status === "clarification_required") {
    const runId = canonical_run?.id;
    const projectId = canonical_run?.project_id;
    const qs = new URLSearchParams({ tab: "objective" });
    if (projectId) qs.set("project_id", projectId);
    if (runId) qs.set("run_id", runId);
    return {
      id: "answer_clarification",
      label: "Answer clarification",
      href: `/admin/integration?${qs.toString()}#clarification`,
      reason: "Founder clarification is required before planning can continue.",
      severity: "action_required",
    };
  }

  if (stage === "founder_approval_required" || status === "awaiting_plan_approval") {
    return {
      id: "review_plan",
      label: "Review Plan",
      href: "/admin/integration?tab=plan",
      reason: "Review the deterministic plan.",
      severity: "action_required",
      will_happen: "The proof moves to simulation approval.",
      will_not_happen:
        "Simulation will not start. Provider will not be called. Production deployment remains blocked.",
    };
  }

  if (
    stage === "simulation_approval_required" ||
    status === "awaiting_simulation_approval"
  ) {
    return {
      id: "approve_simulation",
      label: "Approve deterministic simulation",
      href: "/admin/integration?tab=simulation",
      reason: "Plan is approved. Explicitly approve the deterministic simulation boundary next.",
      severity: "action_required",
      will_happen: "Simulation becomes eligible to start.",
      will_not_happen: "Simulation does not start automatically. Provider is not called.",
    };
  }

  if (status === "simulation_approved" && stage === "approved_for_simulation") {
    return {
      id: "start_simulation",
      label: "Start deterministic simulation",
      href: "/admin/integration?tab=simulation",
      reason: "Simulation is approved but not started.",
      severity: "action_required",
      will_happen: "Deterministic workforce simulation runs and produces evidence.",
      will_not_happen: "No provider call. No production deployment. No automatic final completion.",
    };
  }

  if (stage === "founder_final_review" || status === "awaiting_final_review") {
    return {
      id: "final_review",
      label: "Open Final Review",
      href: "/admin/integration?tab=proof",
      reason: "Simulation complete — explicit Founder final review required.",
      severity: "action_required",
    };
  }

  if (canonical_run && isLiveProviderRunBlocked(canonical_run)) {
    return {
      id: "live_blocked",
      label: "Live execution blocked",
      href: "/admin/integration",
      reason: "Run is live_provider but provider is not configured — execution is blocked.",
      severity: "warning",
    };
  }

  return {
    id: "continue",
    label: "Continue Founder Proof",
    href: "/admin/integration",
    reason: "Continue from the current integration stage.",
    severity: "informational",
  };
}
