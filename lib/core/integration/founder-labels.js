/**
 * Founder-facing human labels for integration stages and statuses.
 * Machine enums stay available in technical details.
 */

import { formatIntegrationStageLabel } from "./founder-proof-canonical.js";

export const FOUNDER_QUICK_START_STEPS = Object.freeze([
  {
    id: "project",
    label: "Select project",
    description: "Choose the active project for this Founder Proof.",
  },
  {
    id: "objective",
    label: "Issue or review objective",
    description: "Confirm the business objective and constraints.",
  },
  {
    id: "clarification",
    label: "Answer clarification",
    description: "Resolve open questions before planning.",
  },
  {
    id: "plan",
    label: "Review and approve plan",
    description: "Approve the deterministic plan — does not start simulation.",
  },
  {
    id: "sim_approval",
    label: "Approve deterministic simulation",
    description: "Explicitly approve running the simulation boundary.",
  },
  {
    id: "simulation",
    label: "Run simulation",
    description: "Start the deterministic workforce simulation.",
  },
  {
    id: "evidence",
    label: "Review evidence",
    description: "Inspect evidence produced by the simulation.",
  },
  {
    id: "memory_learning",
    label: "Review memory and learning",
    description: "Review candidates and proposals — nothing auto-promotes.",
  },
  {
    id: "final",
    label: "Final Founder review",
    description: "Approve, return, or reject the completed proof pack.",
  },
]);

export const FOUNDER_GLOSSARY = Object.freeze([
  {
    term: "Objective",
    definition:
      "The business goal for this proof — purpose, deliverables, constraints, and success criteria.",
  },
  {
    term: "Clarification",
    definition:
      "Founder answers that resolve open questions before a plan can be generated.",
  },
  {
    term: "Plan",
    definition:
      "A deterministic work breakdown: tasks, departments, proposed roles, risks, and gates.",
  },
  {
    term: "Approval",
    definition:
      "An explicit Founder decision. Approvals never start simulation or call a provider automatically.",
  },
  {
    term: "Simulation",
    definition:
      "A deterministic dry-run of workforce coordination. Not live AI execution and not a real company.",
  },
  {
    term: "Evidence",
    definition:
      "Structured artefacts proving simulation steps completed — titles, sources, and verification status.",
  },
  {
    term: "Memory",
    definition:
      "Candidate knowledge items from the run. Promotion requires Founder decision — nothing auto-trusts.",
  },
  {
    term: "Learning",
    definition:
      "Proposed improvements from outcomes. Never applied to agent prompts without Founder approval.",
  },
  {
    term: "Final Review",
    definition:
      "The last Founder gate before proof completion. Completion is never automatic.",
  },
  {
    term: "Protected Action",
    definition:
      "High-risk capabilities (for example production deployment) that stay blocked unless Founder explicitly allows them.",
  },
]);

const STATUS_LABELS = Object.freeze({
  awaiting_clarification: "Waiting for Founder clarification",
  awaiting_approval: "Waiting for Founder review",
  awaiting_plan_approval: "Waiting for Founder plan approval",
  awaiting_simulation_approval: "Waiting for simulation approval",
  awaiting_simulation_start: "Ready to start simulation",
  awaiting_final_review: "Waiting for final Founder review",
  clarification_required: "Clarification required",
  simulation_approved: "Simulation approved — not started",
  simulation_running: "Deterministic simulation running",
  simulating: "Deterministic simulation running",
  active: "Active",
  completed: "Completed",
  rejected: "Rejected",
  failed: "Failed",
  paused: "Paused",
  cancelled: "Cancelled",
  not_started: "Not started",
  objective_created: "Objective created",
  recovering: "Recovering from checkpoint",
});

const STAGE_EXTRA = Object.freeze({
  simulation_approval_required: "Founder simulation approval",
  approved_for_simulation: "Ready to start simulation",
  founder_approval_required: "Founder plan approval",
});

export function humanStageLabel(stage) {
  if (!stage) return "Not available";
  if (STAGE_EXTRA[stage]) return STAGE_EXTRA[stage];
  return formatIntegrationStageLabel(stage);
}

export function humanStatusLabel(status, stage = null) {
  if (status && STATUS_LABELS[status]) return STATUS_LABELS[status];
  if (stage === "founder_approval_required") return "Waiting for Founder review";
  if (stage === "simulation_approval_required") {
    return "Waiting for simulation approval";
  }
  if (stage === "approved_for_simulation") return "Ready to start simulation";
  if (stage === "clarification_required") return "Waiting for Founder clarification";
  if (stage === "founder_final_review") return "Waiting for final Founder review";
  if (!status) return "Not available";
  return String(status).replace(/_/g, " ");
}

export function humanExecutionModeLabel(mode) {
  if (mode === "deterministic_simulation") return "Deterministic simulation";
  if (mode === "live_provider") return "Live provider (blocked unless configured)";
  if (!mode) return "Not available";
  return String(mode).replace(/_/g, " ");
}

export function statusTone(statusOrStage) {
  const s = String(statusOrStage || "");
  if (["completed", "healthy", "ready"].includes(s)) return "healthy";
  if (["rejected", "failed", "cancelled", "danger"].includes(s)) return "degraded";
  if (
    s.includes("awaiting") ||
    s.includes("required") ||
    s.includes("approval") ||
    s === "paused" ||
    s === "warning"
  ) {
    return "warning";
  }
  if (s.includes("simulation") || s === "active" || s === "simulating") return "healthy";
  return "unconfigured";
}

/**
 * Map run stage → Founder Quick Start step id.
 */
export function quickStartStepIdForRun(run, { hasProject = false } = {}) {
  if (!hasProject) return "project";
  if (!run) return "objective";
  const stage = run.current_stage || run.stage || "";
  if (stage === "clarification_required") return "clarification";
  if (
    [
      "objective_received",
      "objective_validated",
      "templates_matched",
      "capabilities_mapped",
      "plan_generated",
      "dependencies_validated",
      "execution_preview_generated",
    ].includes(stage)
  ) {
    return stage === "objective_received" || stage === "objective_validated"
      ? "objective"
      : "plan";
  }
  if (stage === "founder_approval_required") return "plan";
  if (stage === "simulation_approval_required") return "sim_approval";
  if (stage === "approved_for_simulation") return "simulation";
  if (
    [
      "workforce_allocated",
      "tasks_claimed",
      "collaboration_running",
      "verification_running",
    ].includes(stage)
  ) {
    return "simulation";
  }
  if (stage === "memory_writing" || stage === "learning_proposals_created") {
    return "memory_learning";
  }
  if (stage === "founder_final_review") return "final";
  if (stage === "completed") return "final";
  if (["verification_running"].includes(stage)) return "evidence";
  return "objective";
}

export function deriveQuickStartStates(run, { hasProject = false } = {}) {
  const currentId = quickStartStepIdForRun(run, { hasProject });
  const order = FOUNDER_QUICK_START_STEPS.map((s) => s.id);
  const currentIdx = order.indexOf(currentId);
  return FOUNDER_QUICK_START_STEPS.map((step, idx) => {
    let state = "upcoming";
    if ((run?.current_stage || run?.stage) === "completed" && step.id === "final") state = "completed";
    else if (idx < currentIdx) state = "completed";
    else if (idx === currentIdx) state = "current";
    return { ...step, state };
  });
}

/**
 * Extract WBS tasks from a run for Founder-readable display.
 */
export function extractPlanTasks(run) {
  const tasks =
    run?.planning_plan?.wbs?.tasks ||
    run?.planning_plan?.payload?.wbs?.tasks ||
    [];
  return (tasks || []).map((t, i) => ({
    id: t.id || t.task_id || `task-${i + 1}`,
    title: t.title || t.name || t.label || `Task ${i + 1}`,
    purpose: t.purpose || t.description || t.summary || "Deterministic simulation work item.",
    department:
      t.department || t.owning_department || t.owner_department || "Unassigned",
    agent_role:
      t.agent_role || t.proposed_agent || t.role || t.owner_role || null,
    dependency: t.depends_on || t.dependency || t.after || "None",
    expected_output: t.expected_output || t.output || t.deliverable || "Simulation artefact",
    evidence_required: t.evidence_required !== false,
    risk_level: t.risk_level || t.risk || "low",
    protected_action: Boolean(t.protected_action || t.is_protected),
    execution_eligibility:
      t.execution_eligibility ||
      (t.protected_action ? "Blocked until Founder unlock" : "Eligible in deterministic simulation"),
  }));
}

export function extractProposedAgents(run) {
  const fromPackage =
    run?.approval_package?.proposed_agents ||
    run?.approval_package?.agents ||
    [];
  if (Array.isArray(fromPackage) && fromPackage.length) {
    return fromPackage.map((a) =>
      typeof a === "string"
        ? { role: a, status: "proposed" }
        : {
            role: a.role || a.slug || a.name || a.id || "Agent role",
            department: a.department || a.departmentSlug || null,
            status: a.status || "proposed",
          }
    );
  }
  const fromTasks = extractPlanTasks(run)
    .map((t) => t.agent_role)
    .filter(Boolean);
  const unique = [...new Set(fromTasks)];
  if (unique.length) {
    return unique.map((role) => ({ role, status: "proposed" }));
  }
  return [];
}
