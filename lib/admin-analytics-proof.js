/**
 * Derive Founder Proof / historical integration analytics from known runs.
 * Never invents counts — only classifies what is present.
 */

import {
  isFounderProductionProofRun,
  isTerminalFounderProofRun,
  resolveCanonicalFounderProofRuns,
} from "@/lib/core/integration/founder-proof-canonical";
import { mapProofStatusFromRun } from "@/lib/core/integration/persist";

const WAITING_STAGES = new Set([
  "founder_approval_required",
  "simulation_approval_required",
  "clarification_required",
  "founder_final_review",
]);

const WAITING_PROOF_STATUSES = new Set([
  "awaiting_plan_approval",
  "awaiting_simulation_approval",
  "clarification_required",
  "awaiting_final_review",
  "awaiting_clarification",
  "awaiting_approval",
]);

/**
 * @param {Array<object>} runs
 * @returns {{
 *   active_founder_proofs: number,
 *   waiting_for_founder_action: number,
 *   completed_proofs: number,
 *   cancelled_proofs: number,
 *   historical_integration_runs: number,
 *   duplicate_active_runs: number,
 * }}
 */
export function deriveFounderProofAnalytics(runs = []) {
  const proofRuns = (runs || []).filter(isFounderProductionProofRun);
  const resolution = resolveCanonicalFounderProofRuns(runs);

  let completed = 0;
  let cancelled = 0;
  let waiting = 0;

  for (const r of proofRuns) {
    const ps = mapProofStatusFromRun(r);
    if (ps === "completed") {
      completed += 1;
      continue;
    }
    if (ps === "cancelled") {
      cancelled += 1;
      continue;
    }
    if (isTerminalFounderProofRun(r)) continue;
    const stage = r.current_stage || "";
    if (WAITING_STAGES.has(stage) || WAITING_PROOF_STATUSES.has(ps)) {
      waiting += 1;
    }
  }

  return {
    active_founder_proofs: resolution.active_founder_proof_run_count,
    waiting_for_founder_action: waiting,
    completed_proofs: completed,
    cancelled_proofs: cancelled,
    historical_integration_runs: proofRuns.length,
    duplicate_active_runs: resolution.duplicate_count,
  };
}
