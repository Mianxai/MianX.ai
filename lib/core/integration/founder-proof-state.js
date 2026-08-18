/**
 * Canonical Founder Proof state model for all Founder-facing Admin surfaces.
 * One enum + one mapping layer — no per-page conflicting stage maps.
 */

import { mapProofStatusFromRun } from "./persist.js";
import {
  isTerminalFounderProofRun,
  resolveCanonicalFounderProofRuns,
  formatIntegrationStageLabel,
  deriveNextFounderProofAction,
} from "./founder-proof-canonical.js";

/** @typedef {typeof FOUNDER_PROOF_STATES[number]} FounderProofState */

export const FOUNDER_PROOF_STATES = Object.freeze([
  "loading",
  "no_project",
  "no_proof",
  "active",
  "clarification_required",
  "awaiting_plan_approval",
  "awaiting_simulation_approval",
  "ready_to_start_simulation",
  "simulation_running",
  "evidence_review",
  "memory_learning_review",
  "awaiting_final_review",
  "completed",
  "cancelled",
  "archived",
  "resolver_error",
  "persistence_error",
]);

const SEVERITY = Object.freeze({
  info: "info",
  action_required: "action_required",
  warning: "warning",
  error: "error",
  success: "success",
});

/**
 * Map internal stage/status to a Founder Proof UI state.
 * @param {{
 *   projectId?: string|null,
 *   loading?: boolean,
 *   queryError?: boolean|string|null,
 *   persistenceError?: boolean|string|null,
 *   canonicalRun?: object|null,
 *   activeProofCount?: number|null,
 *   historicalRuns?: object[],
 *   proofStatus?: string|null,
 *   stage?: string|null,
 * }} input
 */
export function resolveFounderProofUiState(input = {}) {
  if (input.loading) {
    return buildStateView("loading", {
      title: "Loading Founder Proof status",
      explanation: "Checking the current project and proof records.",
      severity: SEVERITY.info,
    });
  }

  if (input.persistenceError) {
    return buildStateView("persistence_error", {
      title: "Founder Proof status could not be verified",
      explanation:
        typeof input.persistenceError === "string"
          ? input.persistenceError
          : "Durable storage returned an error. This is not the same as having no proof.",
      severity: SEVERITY.error,
      primaryCta: { id: "retry", label: "Retry", href: null },
      secondaryCta: { id: "diagnostics", label: "Open diagnostics", href: null },
      willNotHappen: ["Do not start a new proof while status is uncertain."],
      recoveryOptions: ["Retry", "Open diagnostics", "Copy diagnostic reference"],
    });
  }

  if (input.queryError || input.resolverError) {
    return buildStateView("resolver_error", {
      title: "Founder Proof status could not be verified",
      explanation:
        typeof input.queryError === "string"
          ? input.queryError
          : typeof input.resolverError === "string"
            ? input.resolverError
            : "The proof resolver could not complete safely.",
      severity: SEVERITY.error,
      primaryCta: { id: "retry", label: "Retry", href: null },
      secondaryCta: { id: "diagnostics", label: "Open diagnostics", href: null },
      willNotHappen: ["Do not start a new proof while status is uncertain."],
      recoveryOptions: ["Retry", "Open diagnostics", "Copy diagnostic reference"],
    });
  }

  const projectId = input.projectId || null;
  if (!projectId || projectId === "all") {
    return buildStateView("no_project", {
      title: "Select a project to continue",
      explanation: "Founder Proof is always scoped to one active project.",
      severity: SEVERITY.action_required,
      primaryCta: {
        id: "select_project",
        label: "Select project",
        href: "/admin/projects",
      },
    });
  }

  const run = input.canonicalRun || null;
  const historical = Array.isArray(input.historicalRuns) ? input.historicalRuns : [];
  const activeCount =
    input.activeProofCount != null
      ? Number(input.activeProofCount)
      : run
        ? 1
        : 0;

  if (!run && activeCount === 0) {
    const resumable = historical.find((r) => r && !isTerminalFounderProofRun(r));
    if (resumable) {
      const next = deriveNextFounderProofAction({
        canonical_run: resumable,
        proof_status: mapProofStatusFromRun(resumable),
        run_stage: resumable.current_stage,
      });
      return buildStateView(mapRunToState(resumable), {
        title: "Resume Founder Proof",
        explanation: `A non-terminal proof exists (last stage: ${formatIntegrationStageLabel(resumable.current_stage)}). Resume realigns selection only — it does not create a new objective or approve anything.`,
        severity: SEVERITY.action_required,
        run: resumable,
        primaryCta: {
          id: "resume_proof",
          label: "Resume Founder Proof",
          href: proofHref(projectId, resumable.id, next),
        },
        willHappen: ["Opens the existing proof at the next required step."],
        willNotHappen: [
          "Does not create a new objective or run",
          "Does not approve the plan or simulation",
          "Does not call a provider",
        ],
        recoveryOptions: ["Resume Founder Proof", "Open diagnostics"],
        caseId: "resumable_historical",
      });
    }

    const terminal = historical.filter((r) => r && isTerminalFounderProofRun(r));
    if (terminal.length > 0) {
      const latest = [...terminal].sort((a, b) =>
        String(b.updated_at || b.completed_at || "").localeCompare(
          String(a.updated_at || a.completed_at || "")
        )
      )[0];
      const termState = mapTerminalState(latest);
      return buildStateView(termState, {
        title:
          termState === "completed"
            ? "Previous Founder Proof completed"
            : termState === "archived"
              ? "Previous Founder Proof archived"
              : "Previous Founder Proof cancelled",
        explanation:
          "There is no active Founder Proof. You can view history or start a new proof with explicit confirmation.",
        severity: SEVERITY.info,
        run: latest,
        primaryCta: {
          id: "view_history",
          label: "View proof history",
          href: `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=dashboard`,
        },
        secondaryCta: {
          id: "start_new_proof",
          label: "Start a new Founder Proof",
          href: `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=objective`,
          requiresConfirmation: true,
        },
        willNotHappen: [
          "Starting a new proof is never automatic",
          "History view does not mutate records",
        ],
        caseId: "terminal_only",
      });
    }

    return buildStateView("no_proof", {
      title: "No active Founder Proof",
      explanation:
        "This project has no Founder Proof run yet. Start only when you are ready — it creates a new objective and run.",
      severity: SEVERITY.action_required,
      primaryCta: {
        id: "start_new_proof",
        label: "Start Founder Proof",
        href: `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=objective`,
        requiresConfirmation: true,
      },
      willHappen: ["Creates a new Founder Proof objective and run after confirmation."],
      willNotHappen: [
        "Does not approve anything",
        "Does not start simulation",
        "Does not call Anthropic",
      ],
      caseId: "empty",
    });
  }

  const state = mapRunToState(run);
  const proofStatus = input.proofStatus || mapProofStatusFromRun(run);
  const stage = input.stage || run?.current_stage || null;
  const next = deriveNextFounderProofAction({
    canonical_run: run,
    proof_status: proofStatus,
    run_stage: stage,
    duplicate_warning: Number(input.duplicateActiveProofCount || 0) > 0,
  });

  return buildStateView(state, {
    title: humanTitleForState(state, stage),
    explanation: humanExplanationForState(state),
    severity:
      next?.severity === "action_required" ? SEVERITY.action_required : SEVERITY.info,
    run,
    primaryCta: next
      ? {
          id: next.id,
          label: next.label,
          href: withProject(next.href, projectId, run?.id),
        }
      : null,
    willHappen: next?.will_happen ? [next.will_happen] : [],
    willNotHappen: next?.will_not_happen
      ? [next.will_not_happen]
      : [
          "Simulation does not start automatically",
          "Provider is not called for deterministic proof",
          "Production deployment remains Founder-gated",
        ],
    machineStatus: proofStatus,
    machineStage: stage,
    caseId: "active",
  });
}

/**
 * Build resolver-driven view from a list of project runs + optional errors.
 */
export function buildFounderProofStateFromRuns({
  projectId,
  runs = [],
  queryError = null,
  persistenceError = null,
  loading = false,
} = {}) {
  if (loading) return resolveFounderProofUiState({ loading: true });
  if (persistenceError) {
    return resolveFounderProofUiState({ projectId, persistenceError });
  }
  if (queryError) {
    return resolveFounderProofUiState({ projectId, queryError });
  }

  const resolved = resolveCanonicalFounderProofRuns(runs);
  return resolveFounderProofUiState({
    projectId,
    canonicalRun: resolved.canonical_run,
    activeProofCount: resolved.active_founder_proof_run_count,
    duplicateActiveProofCount: resolved.duplicate_count,
    historicalRuns: runs,
    proofStatus: mapProofStatusFromRun(resolved.canonical_run),
    stage: resolved.canonical_run?.current_stage || null,
  });
}

function mapRunToState(run) {
  if (!run) return "no_proof";
  if (isTerminalFounderProofRun(run)) return mapTerminalState(run);
  const status = mapProofStatusFromRun(run);
  const stage = run.current_stage || "";

  if (status === "clarification_required" || stage === "clarification_required") {
    return "clarification_required";
  }
  if (status === "awaiting_plan_approval" || stage === "founder_approval_required") {
    return "awaiting_plan_approval";
  }
  if (
    status === "awaiting_simulation_approval" ||
    stage === "simulation_approval_required"
  ) {
    return "awaiting_simulation_approval";
  }
  if (status === "simulation_approved" || stage === "approved_for_simulation") {
    return "ready_to_start_simulation";
  }
  if (status === "simulation_running") return "simulation_running";
  if (stage === "verification_running") return "evidence_review";
  if (stage === "memory_writing" || stage === "learning_proposals_created") {
    return "memory_learning_review";
  }
  if (status === "awaiting_final_review" || stage === "founder_final_review") {
    return "awaiting_final_review";
  }
  return "active";
}

function mapTerminalState(run) {
  const status = mapProofStatusFromRun(run);
  const stage = run?.current_stage || "";
  if (status === "completed" || stage === "completed") return "completed";
  if (stage === "archived_duplicate") return "archived";
  return "cancelled";
}

function humanTitleForState(state, stage) {
  const map = {
    clarification_required: "Clarification required",
    awaiting_plan_approval: "Waiting for Founder Plan Approval",
    awaiting_simulation_approval: "Waiting for Simulation Approval",
    ready_to_start_simulation: "Ready to start simulation",
    simulation_running: "Deterministic simulation running",
    evidence_review: "Review evidence",
    memory_learning_review: "Review memory and learning",
    awaiting_final_review: "Waiting for final Founder review",
    completed: "Founder Proof completed",
    cancelled: "Founder Proof cancelled",
    archived: "Founder Proof archived",
    active: stage ? formatIntegrationStageLabel(stage) : "Founder Proof active",
  };
  return map[state] || "Founder Proof";
}

function humanExplanationForState(state) {
  const map = {
    clarification_required: "Answer open questions before planning can continue.",
    awaiting_plan_approval:
      "Review the deterministic plan. Approving moves only to Simulation Approval.",
    awaiting_simulation_approval:
      "Approve the simulation boundary separately. This does not start simulation.",
    ready_to_start_simulation:
      "Start Simulation is a separate explicit action. Agents allocate only then.",
    simulation_running: "Deterministic tasks execute without provider calls.",
    evidence_review: "Inspect evidence produced by the simulation.",
    memory_learning_review:
      "Memory and learning candidates never auto-promote.",
    awaiting_final_review: "Final completion requires an explicit Founder decision.",
    completed: "This proof is terminal. Start a new proof only with confirmation.",
    cancelled: "This proof is terminal. History remains available.",
    archived: "This proof is archived as a duplicate or historical record.",
    active: "Continue the Founder Proof from the next required step.",
  };
  return map[state] || "Continue the Founder Proof safely.";
}

function buildStateView(state, extra = {}) {
  return {
    state,
    title: extra.title || humanTitleForState(state),
    explanation: extra.explanation || humanExplanationForState(state),
    severity: extra.severity || SEVERITY.info,
    primaryCta: extra.primaryCta || null,
    secondaryCta: extra.secondaryCta || null,
    willHappen: extra.willHappen || [],
    willNotHappen: extra.willNotHappen || [],
    recoveryOptions: extra.recoveryOptions || [],
    run: extra.run || null,
    machineStatus: extra.machineStatus || null,
    machineStage: extra.machineStage || null,
    caseId: extra.caseId || null,
  };
}

function proofHref(projectId, runId, next) {
  if (next?.href) return withProject(next.href, projectId, runId);
  const qs = new URLSearchParams({ project_id: projectId });
  if (runId) qs.set("run_id", runId);
  return `/admin/integration?${qs.toString()}`;
}

function withProject(href, projectId, runId) {
  if (!href) return href;
  try {
    const url = new URL(href, "http://local.invalid");
    if (projectId && !url.searchParams.get("project_id")) {
      url.searchParams.set("project_id", projectId);
    }
    if (runId && !url.searchParams.get("run_id")) {
      url.searchParams.set("run_id", runId);
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}
