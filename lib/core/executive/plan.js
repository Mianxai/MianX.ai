// Machine-validated executive planning structures.

import { clip } from "../validate";
import { validationError } from "../errors";
import { L2_SLUGS } from "./agents";
import { assertPlanDelegations } from "./delegation";

const PRIORITIES = ["low", "normal", "high", "urgent"];
const RISK_CLASSES = ["R0", "R1", "R2", "R3", "R4"];
const WORKSTREAM_STATUSES = [
  "planned",
  "queued",
  "running",
  "succeeded",
  "failed",
  "cancelled",
  "dead_letter",
  "awaiting_approval",
];

/**
 * Validates and normalizes an executive plan object (CEO output).
 */
export function validateExecutivePlan(raw, { parentSlug = "executive-ceo" } = {}) {
  const errors = {};
  const plan = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};

  const objective_summary = clip(plan.objective_summary, 4000);
  if (!objective_summary) errors.objective_summary = "objective_summary is required.";

  if (!Array.isArray(plan.workstreams) || plan.workstreams.length === 0) {
    errors.workstreams = "workstreams must be a non-empty array.";
  }

  const workstreams = [];
  const owners = [];
  const ids = new Set();

  if (Array.isArray(plan.workstreams)) {
    plan.workstreams.forEach((ws, i) => {
      const w = ws && typeof ws === "object" ? ws : {};
      const id = clip(w.id, 80) || `ws-${i + 1}`;
      if (ids.has(id)) {
        errors[`workstreams[${i}].id`] = "Duplicate workstream id.";
      }
      ids.add(id);

      const owner_agent = clip(w.owner_agent, 100);
      if (!owner_agent) {
        errors[`workstreams[${i}].owner_agent`] = "owner_agent is required.";
      } else if (!L2_SLUGS.includes(owner_agent)) {
        errors[`workstreams[${i}].owner_agent`] =
          `owner_agent must be a Wave-1 L2 slug (got "${owner_agent}").`;
      } else {
        owners.push(owner_agent);
      }

      const priority = clip(w.priority, 20) || "normal";
      if (!PRIORITIES.includes(priority)) {
        errors[`workstreams[${i}].priority`] = `priority must be one of: ${PRIORITIES.join(", ")}`;
      }

      const risk_class = clip(w.risk_class, 10) || "R2";
      if (!RISK_CLASSES.includes(risk_class)) {
        errors[`workstreams[${i}].risk_class`] = `risk_class must be one of: ${RISK_CLASSES.join(", ")}`;
      }

      const dependencies = Array.isArray(w.dependencies)
        ? w.dependencies.map((d) => clip(d, 80)).filter(Boolean)
        : [];
      const success_criteria = Array.isArray(w.success_criteria)
        ? w.success_criteria.map((d) => clip(d, 500)).filter(Boolean).slice(0, 20)
        : [];
      if (success_criteria.length === 0) {
        errors[`workstreams[${i}].success_criteria`] = "At least one success criterion is required.";
      }

      workstreams.push({
        id,
        owner_agent,
        title: clip(w.title, 200) || id,
        priority,
        dependencies,
        success_criteria,
        risk_class,
        approval_required: Boolean(w.approval_required),
        status: WORKSTREAM_STATUSES.includes(w.status) ? w.status : "planned",
      });
    });
  }

  // Dependency references must point at known workstream ids (no cycles checked lightly).
  for (const ws of workstreams) {
    for (const dep of ws.dependencies) {
      if (!ids.has(dep)) {
        errors[`workstream.${ws.id}.dependencies`] = `Unknown dependency "${dep}".`;
      }
      if (dep === ws.id) {
        errors[`workstream.${ws.id}.dependencies`] = "Workstream cannot depend on itself.";
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    throw validationError("Invalid executive plan.", errors);
  }

  assertPlanDelegations(parentSlug, owners);

  return {
    objective_summary,
    workstreams,
    status: clip(plan.status, 40) || "planned",
    executive_result: clip(plan.executive_result, 8000) || "",
    blockers: Array.isArray(plan.blockers)
      ? plan.blockers.map((b) => clip(b, 500)).filter(Boolean).slice(0, 50)
      : [],
    approval_required: Boolean(plan.approval_required),
  };
}

/**
 * Aggregates child assessment outputs into an executive result.
 * Never claims success if any required child failed or is awaiting approval.
 */
export function aggregateExecutiveResult({ objective, plan, assessments }) {
  const blockers = [];
  let worst = "ready";
  let approval_required = Boolean(plan?.approval_required);

  for (const ws of plan?.workstreams || []) {
    const out = assessments[ws.owner_agent];
    if (!out) {
      blockers.push(`Missing assessment from ${ws.owner_agent} (${ws.id}).`);
      worst = "blocked";
      continue;
    }
    if (out.recommendation === "blocked") {
      blockers.push(`${ws.owner_agent}: ${out.summary || "blocked"}`);
      worst = "blocked";
    } else if (out.recommendation === "hold" && worst !== "blocked") {
      worst = "hold";
      blockers.push(`${ws.owner_agent}: hold — ${(out.risks || [])[0] || "needs review"}`);
    }
    if (out.approval_required || ws.approval_required || ws.risk_class === "R4") {
      approval_required = true;
    }
  }

  // Launch-readiness always requires Founder for protected production decision.
  approval_required = true;

  const status =
    worst === "blocked"
      ? "blocked"
      : approval_required
        ? "awaiting_founder"
        : "aggregated";

  return {
    objective_summary: plan?.objective_summary || clip(objective, 4000),
    workstreams: (plan?.workstreams || []).map((ws) => ({
      ...ws,
      status:
        assessments[ws.owner_agent]?.recommendation === "blocked"
          ? "failed"
          : assessments[ws.owner_agent]
            ? "succeeded"
            : "failed",
      assessment: assessments[ws.owner_agent] || null,
    })),
    status,
    executive_result:
      worst === "blocked"
        ? "Executive assessment blocked: one or more C-Suite workstreams failed."
        : "Executive assessment complete. Protected launch decision requires Founder approval.",
    blockers,
    approval_required,
    recommendation: worst === "blocked" ? "no_go" : worst === "hold" ? "hold" : "hold",
  };
}

export function validateExecutiveObjectiveStart(body) {
  const errors = {};
  const raw = body && typeof body === "object" ? body : {};
  const project_id = clip(raw.project_id, 64);
  const objective = clip(raw.objective, 8000);
  if (!project_id) errors.project_id = "project_id is required.";
  if (!objective) errors.objective = "objective is required.";
  if (Object.keys(errors).length > 0) {
    throw validationError("Please fix the highlighted fields.", errors);
  }
  return {
    workflow: "executive-readiness",
    project_id,
    objective,
  };
}
