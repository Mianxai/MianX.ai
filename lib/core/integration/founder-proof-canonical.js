/**
 * Canonical active Founder production proof run resolution (server-side).
 */

import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "./proof.js";
import { mapProofStatusFromRun } from "./persist.js";
import { assessProviderGate } from "./provider-gate.js";

export function isFounderProductionProofRun(run) {
  return Boolean(
    run?.proof?.is_production_proof || run?.payload?.is_production_proof
  ) &&
    (run?.objective?.title || run?.objective_title || "") ===
      FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title;
}

export function isTerminalFounderProofRun(run) {
  const ps = mapProofStatusFromRun(run);
  return ["completed", "rejected", "failed"].includes(ps);
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
    founder_approval_required: "Founder plan approval",
    approved_for_simulation: "Simulation approved",
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
    return {
      id: "resolve_duplicates",
      label: "Resolve duplicate proof runs",
      href: "/admin/integration?tab=dashboard",
      reason: "Multiple active production Founder proof runs detected for this project.",
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
    return {
      id: "answer_clarification",
      label: "Answer Clarification",
      href: "/admin/integration?tab=objective",
      reason: "Objective intake requires Founder clarification before planning.",
      severity: "action_required",
    };
  }

  if (stage === "founder_approval_required" || status === "awaiting_plan_approval") {
    return {
      id: "review_plan",
      label: "Review Plan",
      href: "/admin/integration?tab=plan",
      reason: "Deterministic plan awaits Founder approval.",
      severity: "action_required",
    };
  }

  if (status === "simulation_approved" && stage === "approved_for_simulation") {
    return {
      id: "start_simulation",
      label: "Review Simulation Approval",
      href: "/admin/integration?tab=simulation",
      reason: "Simulation is approved but not started.",
      severity: "action_required",
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
