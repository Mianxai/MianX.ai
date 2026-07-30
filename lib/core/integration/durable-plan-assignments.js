/**
 * Persist durable per-task department + primary agent assignments for
 * Founder Proof onboarding plans. Read-time enrichment alone is insufficient
 * for simulation approval readiness.
 */

import { resolveTaskDepartment } from "./intent-department.js";
import { allocateAgentsForPlan } from "./allocation.js";
import { validateFounderPlanReadiness } from "./plan-readiness.js";

/** Canonical onboarding primary agent by department (durable). */
export const DEPARTMENT_PRIMARY_AGENT = Object.freeze({
  security: {
    slug: "platform-security",
    role: "Platform Security Reviewer",
  },
  hr: {
    slug: "hr-workforce-planner",
    role: "HR Workforce Planner",
  },
  operations: {
    slug: "ops-coordinator",
    role: "Ops Coordinator",
  },
  qa: {
    slug: "qa-review",
    role: "QA Review Agent",
  },
  infrastructure: {
    slug: "ops-coordinator",
    role: "Ops Coordinator",
  },
});

export const REQUIRED_ONBOARDING_WORKFORCE = Object.freeze([
  "executive-ceo",
  "hr-workforce-planner",
  "platform-security",
  "ops-coordinator",
  "qa-review",
]);

const EXECUTIVE_OVERSIGHT = Object.freeze({
  slug: "executive-ceo",
  role: "Executive Orchestrator",
});

/**
 * Durable simulation readiness — missing per-task primary agent is BLOCKING.
 */
export function validateSimulationDurableReadiness(run) {
  const plan = validateFounderPlanReadiness(run);
  const reasons = [...(plan.reasons || [])];
  const recommended_corrections = [...(plan.recommended_corrections || [])];
  const warnings = [...(plan.warnings || [])];

  const durableTasks =
    run?.planning_plan?.wbs?.tasks ||
    run?.planning_plan?.payload?.wbs?.tasks ||
    run?.approval_package?.tasks ||
    [];

  let missingAgent = 0;
  for (const raw of durableTasks) {
    const role =
      raw.agent_role ||
      raw.proposed_agent ||
      raw.primary_agent ||
      raw.owner_role ||
      raw.payload?.agent_slug ||
      raw.payload?.primary_agent_slug ||
      null;
    if (!role) missingAgent += 1;
  }
  if (durableTasks.length > 0 && missingAgent > 0) {
    reasons.push(
      `${missingAgent} durable task(s) lack a primary executable agent assignment.`
    );
    recommended_corrections.push(
      "Return the plan for corrections so department ownership and executable agent roles are regenerated and persisted."
    );
  } else if (!durableTasks.length) {
    reasons.push("No durable plan tasks are available for simulation.");
    recommended_corrections.push(
      "Return the plan for corrections to regenerate a durable plan."
    );
  }

  if (run?.execution_mode === "live_provider") {
    reasons.push(
      "Live provider execution mode is not allowed for deterministic Founder Proof simulation."
    );
  }

  const status = reasons.length ? "blocked" : warnings.length ? "warning" : "ready";
  return {
    ...plan,
    ready: status !== "blocked",
    approve_enabled: status !== "blocked",
    status,
    reasons,
    warnings,
    recommended_corrections,
    durable_task_count: durableTasks.length,
    missing_primary_agent_count: missingAgent,
    simulation_approval_allowed: status !== "blocked",
    primary_cta:
      status === "blocked"
        ? {
            id: "return_plan_for_corrections",
            label: "Return plan for corrections",
          }
        : {
            id: "approve_simulation_boundary",
            label: "Approve deterministic simulation boundary",
          },
  };
}

/**
 * Map a task to durable department + primary agent using intent rules + index
 * fallbacks for the four onboarding WBS slots.
 */
export function resolveDurableTaskAssignment(task, index, { objectiveText = "" } = {}) {
  const resolved = resolveTaskDepartment(task, index, { objectiveText });
  const deptRaw = String(resolved.department || "").toLowerCase();

  let department = "operations";
  if (/security/.test(deptRaw)) department = "security";
  else if (/human resources|\bhr\b/.test(deptRaw)) department = "hr";
  else if (/operations|\bops\b/.test(deptRaw)) department = "operations";
  else if (/quality|\bqa\b/.test(deptRaw)) department = "qa";
  else if (/infra/.test(deptRaw)) department = "infrastructure";

  let supporting = null;
  const supportingRaw = String(resolved.supporting || "").toLowerCase();
  if (/infra/.test(supportingRaw)) supporting = "infrastructure";
  else if (/security/.test(supportingRaw)) supporting = "security";

  // Canonical onboarding index fallbacks when source is weak fallback
  if (resolved.source === "fallback") {
    if (index === 0) {
      department = "security";
      supporting = "infrastructure";
    } else if (index === 1) {
      department = "hr";
      supporting = null;
    } else if (index === 2) {
      department = "security";
      supporting = null;
    } else if (index === 3) {
      department = "operations";
      supporting = null;
    }
  }

  const primary =
    DEPARTMENT_PRIMARY_AGENT[department] || DEPARTMENT_PRIMARY_AGENT.operations;
  const qualityReviewer =
    department === "operations"
      ? { slug: "qa-review", role: "QA Review Agent" }
      : null;

  return {
    department,
    supporting_department: supporting,
    primary_agent_slug: primary.slug,
    primary_agent_role: primary.role,
    agent_role: primary.role,
    proposed_agent: primary.slug,
    owner_role: primary.role,
    quality_reviewer: qualityReviewer,
    executive_oversight: EXECUTIVE_OVERSIGHT,
    department_reason: resolved.reason,
  };
}

/**
 * Clone planning_plan WBS tasks with durable assignments.
 */
export function persistDurablePlanAssignments(run) {
  const planning = run?.planning_plan ? structuredClone(run.planning_plan) : null;
  if (!planning) {
    throw new Error("planning_plan is required to persist durable assignments");
  }

  const objectiveText = [
    run?.objective?.title,
    run?.objective?.business_purpose,
    run?.objective_title,
    planning?.objective?.title,
  ]
    .filter(Boolean)
    .join(" ");

  const wbs = planning.wbs || planning.payload?.wbs;
  if (!wbs || !Array.isArray(wbs.tasks)) {
    throw new Error("durable WBS tasks are required");
  }

  wbs.tasks = wbs.tasks.map((task, index) => {
    const a = resolveDurableTaskAssignment(task, index, { objectiveText });
    const payload = {
      ...(task.payload || {}),
      department: a.department,
      supporting_department: a.supporting_department,
      agent_slug: a.primary_agent_slug,
      primary_agent_slug: a.primary_agent_slug,
      primary_agent_role: a.primary_agent_role,
      executive_oversight_slug: a.executive_oversight.slug,
      quality_reviewer_slug: a.quality_reviewer?.slug || null,
    };
    return {
      ...task,
      department: a.department,
      supporting_department: a.supporting_department,
      agent_role: a.agent_role,
      proposed_agent: a.proposed_agent,
      primary_agent: a.primary_agent_slug,
      owner_role: a.owner_role,
      quality_reviewer: a.quality_reviewer,
      executive_oversight: a.executive_oversight,
      department_reason: a.department_reason,
      payload,
    };
  });

  if (Array.isArray(wbs.agent_runs)) {
    wbs.agent_runs = wbs.agent_runs.map((ar, index) => {
      const task = wbs.tasks[index] || wbs.tasks[0];
      return {
        ...ar,
        payload: {
          ...(ar.payload || {}),
          department: task.department,
          agent_slug: task.primary_agent || task.proposed_agent,
          status: ar.payload?.status || "not_scheduled",
        },
      };
    });
  }

  if (planning.wbs) planning.wbs = wbs;
  if (planning.payload?.wbs) planning.payload.wbs = wbs;

  const allocation = allocateAgentsForPlan({
    planning_plan: planning,
    template_plan: run.template_plan,
    project_id: run.project_id,
    integration_run_id: run.id,
    objective_title: run.objective?.title,
    business_purpose: run.objective?.business_purpose,
    is_production_proof: Boolean(
      run.proof?.is_production_proof || run.objective?.is_production_proof
    ),
  });

  const have = new Set((allocation.selected_agents || []).map((a) => a.slug));
  for (const slug of REQUIRED_ONBOARDING_WORKFORCE) {
    if (!have.has(slug)) {
      allocation.selected_agents = allocation.selected_agents || [];
      allocation.selected_agents.push({
        slug,
        role: slug,
        reason: "Required onboarding Founder Proof workforce role",
        department: null,
      });
      have.add(slug);
    }
  }

  allocation.selected_agents = (allocation.selected_agents || []).filter(
    (a) => !["lead-intelligence", "research", "follow-up-draft"].includes(a.slug)
  );

  return { planning_plan: planning, allocation, task_count: wbs.tasks.length };
}

export const DEFAULT_CORRECTION_REASON = `Regenerate and persist the canonical deterministic Founder Proof plan with durable per-task department ownership, executable primary agent assignments, supporting roles, corrected dependency references, and protected-action boundaries. Preserve the canonical project, run ID, objective, audit history, deterministic mode, Founder gates, and production_deployment block. Do not create a new proof, approve simulation, start simulation, call a provider, deploy production, or complete the proof.`;
