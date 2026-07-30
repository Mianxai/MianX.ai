/**
 * Founder-facing human labels for integration stages and statuses.
 * Machine enums stay available in technical details.
 */

import { formatIntegrationStageLabel } from "./founder-proof-canonical.js";
import {
  countTaskDependencies,
  normalizePlanRisks,
  proposeDepartmentForTask,
  displayDepartment,
} from "./plan-metrics.js";
import { resolveTaskDepartment } from "./intent-department.js";
import { allocateAgentsForPlan } from "./allocation.js";

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
    term: "Deterministic simulation",
    definition:
      "A controlled dry-run of workforce coordination with fixed outcomes. Does not call Anthropic and is not live AI execution.",
  },
  {
    term: "Simulation",
    definition:
      "A deterministic dry-run of workforce coordination. Not live AI execution and not a real company.",
  },
  {
    term: "Live provider execution",
    definition:
      "Optional Anthropic-backed agent runs. Not required for Founder Proof. Stays blocked until provider config and Founder live gates are set.",
  },
  {
    term: "Agent definition",
    definition:
      "A catalog role (capabilities, department, hierarchy). Planning capacity — not proof that an instance is running.",
  },
  {
    term: "Catalogue agent",
    definition:
      "Any registered agent definition (43 today), including intentionally non-executable superseded contracts.",
  },
  {
    term: "Executable agent",
    definition:
      "A catalogue definition with lifecycleStatus active that the runtime may allocate and run (38 today).",
  },
  {
    term: "Capacity slots (445)",
    definition:
      "Future workforce planning inventory across 20 departments. Not a requirement to create 445 live agents.",
  },
  {
    term: "Definition vs live instance",
    definition:
      "Definitions are contracts. Live instances belong to one project, are allocated when work needs them, and must never look busy without durable execution state.",
  },
  {
    term: "Agent instance",
    definition:
      "A runtime binding of a definition to a project/workflow. Exists only after allocation or explicit runtime work.",
  },
  {
    term: "Workflow definition",
    definition:
      "A reusable orchestration template (stages, agents, gates). Distinct from a live workflow instance.",
  },
  {
    term: "Workflow instance",
    definition:
      "A concrete run of a workflow for a project objective. Has status, tasks, and audit trail.",
  },
  {
    term: "Queue",
    definition:
      "Pending runtime jobs waiting for a tick. Processing requires Run tick or an external scheduler — not automatic on Vercel Hobby alone.",
  },
  {
    term: "Runtime run",
    definition:
      "A recorded execution attempt for a job or agent step, with status and timestamps. Separate from Founder Proof stage labels.",
  },
  {
    term: "Evidence",
    definition:
      "Structured artefacts proving simulation steps completed — titles, sources, and verification status.",
  },
  {
    term: "Memory candidate",
    definition:
      "A proposed knowledge item from a proof run. Never auto-promoted; Founder must accept or reject.",
  },
  {
    term: "Memory",
    definition:
      "Candidate knowledge items from the run. Promotion requires Founder decision — nothing auto-trusts.",
  },
  {
    term: "Learning candidate",
    definition:
      "A proposed improvement from outcomes. Never applied to agent prompts without Founder approval.",
  },
  {
    term: "Learning",
    definition:
      "Proposed improvements from outcomes. Never applied to agent prompts without Founder approval.",
  },
  {
    term: "Protected action",
    definition:
      "High-risk capabilities (for example production deployment) that stay blocked unless Founder explicitly allows them.",
  },
  {
    term: "Final Founder approval",
    definition:
      "The last explicit gate before proof completion. Completion is never automatic; approve, return, or reject.",
  },
  {
    term: "Final Review",
    definition:
      "The last Founder gate before proof completion. Completion is never automatic.",
  },
]);

const STATUS_LABELS = Object.freeze({
  awaiting_clarification: "Waiting for Founder clarification",
  awaiting_approval: "Waiting for Founder approval",
  awaiting_plan_approval: "Waiting for Founder Plan Approval",
  awaiting_simulation_approval: "Waiting for Simulation Approval",
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
  simulation_approval_required: "Waiting for Simulation Approval",
  approved_for_simulation: "Ready to start simulation",
  founder_approval_required: "Review and approve plan",
});

export function humanStageLabel(stage) {
  if (!stage) return "Not available";
  if (STAGE_EXTRA[stage]) return STAGE_EXTRA[stage];
  return formatIntegrationStageLabel(stage);
}

export function humanStatusLabel(status, stage = null) {
  if (status && STATUS_LABELS[status]) return STATUS_LABELS[status];
  if (stage === "founder_approval_required") return "Waiting for Founder approval";
  if (stage === "simulation_approval_required") {
    return "Waiting for Simulation Approval";
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
  const objectiveText = [
    run?.objective?.title,
    run?.objective?.business_purpose,
    run?.objective_title,
  ]
    .filter(Boolean)
    .join(" ");

  // Static imports used above — no lazy require.
  return (tasks || []).map((t, i) => {
    const resolved = resolveTaskDepartment(t, i, { objectiveText });
    const dept = resolved.department;
    const deptReason = resolved.reason;
    const supporting = resolved.supporting;
    return {
      id: t.id || t.task_id || `task-${i + 1}`,
      title: t.title || t.name || t.label || `Task ${i + 1}`,
      purpose:
        t.purpose || t.description || t.summary || "Deterministic simulation work item.",
      department: dept || proposeDepartmentForTask(t, i) || "Unassigned",
      department_reason: deptReason,
      supporting_department: supporting,
      department_proposed: true,
      agent_role:
        t.agent_role || t.proposed_agent || t.role || t.owner_role || t.payload?.agent_slug || null,
      dependency: t.depends_on || t.dependency || t.after || null,
      expected_output:
        t.expected_output || t.output || t.deliverable || "Simulation artefact",
      evidence_required: t.evidence_required !== false,
      risk_level: t.risk_level || t.risk || "low",
      protected_action: Boolean(t.protected_action || t.is_protected),
      execution_eligibility:
        t.execution_eligibility ||
        (t.protected_action
          ? "Blocked until Founder unlock"
          : "Eligible in deterministic simulation"),
    };
  });
}

export function extractProposedAgents(run) {
  const DISCOURAGED = new Set(["lead-intelligence", "research", "follow-up-draft"]);
  const isProof =
    Boolean(run?.proof?.is_production_proof || run?.payload?.is_production_proof) ||
    /onboard|employee|identity/i.test(run?.objective?.title || "");

  // Read-time recompute for Founder Proof so stored packages with filler agents
  // do not mislead approval — does not mutate durable rows.
  if (isProof) {
    try {
      const alloc = allocateAgentsForPlan({
        planning_plan: run.planning_plan,
        template_plan: run.template_plan,
        project_id: run.project_id,
        integration_run_id: run.id,
        objective_title: run.objective?.title,
        business_purpose: run.objective?.business_purpose,
        is_production_proof: true,
      });
      if (alloc?.selected_agents?.length) {
        return alloc.selected_agents.map((a) => ({
          role: a.role || a.slug,
          slug: a.slug,
          department: a.department,
          status: "proposed",
          reason: a.reason,
        }));
      }
    } catch {
      /* fall through to stored package */
    }
  }

  const fromPackage =
    run?.approval_package?.proposed_agents ||
    run?.approval_package?.agents ||
    run?.allocation?.selected_agents ||
    [];
  if (Array.isArray(fromPackage) && fromPackage.length) {
    return fromPackage
      .map((a) =>
        typeof a === "string"
          ? { role: a, slug: a, status: "proposed", reason: "Proposed for simulation" }
          : {
              role: a.role || a.name || a.slug || a.id || "Agent role",
              slug: a.slug || a.id || null,
              department: a.department || a.departmentSlug || null,
              status: a.status || "proposed",
              reason:
                a.reason ||
                run?.allocation?.selection_reasons?.find((r) => r.slug === a.slug)?.reason ||
                "Selected for deterministic simulation coverage.",
            }
      )
      .filter((a) => !(isProof && DISCOURAGED.has(String(a.slug || "").toLowerCase())));
  }
  const fromTasks = extractPlanTasks(run)
    .map((t) => t.agent_role)
    .filter(Boolean);
  const unique = [...new Set(fromTasks)];
  if (unique.length) {
    return unique
      .filter((role) => !(isProof && DISCOURAGED.has(String(role).toLowerCase())))
      .map((role) => ({
        role,
        status: "proposed",
        reason: "Derived from proposed task ownership",
      }));
  }
  return [];
}

export function extractPlanDependencySummary(run) {
  const tasks =
    run?.planning_plan?.wbs?.tasks ||
    run?.planning_plan?.payload?.wbs?.tasks ||
    [];
  const edges =
    run?.approval_package?.dependencies ||
    run?.planning_plan?.wbs?.edges ||
    [];
  return countTaskDependencies(edges, tasks);
}

export function extractPlanRiskCards(run) {
  const risks = run?.approval_package?.risks || run?.planning_plan?.risks || [];
  return normalizePlanRisks(risks);
}
