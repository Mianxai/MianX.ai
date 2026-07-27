// Machine-validated executive planning structures.

import { clip } from "../validate";
import { validationError } from "../errors";
import { L2_SLUGS } from "./agents";
import { assertPlanDelegations } from "./delegation";
import {
  deriveApprovalRequirement,
  assertWorkstreamDomainAllowed,
  isProtectedAction,
} from "./policy";

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
  "retrying",
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
        const domain = clip(w.domain, 80) || null;
        if (domain) {
          try {
            assertWorkstreamDomainAllowed(owner_agent, domain);
          } catch (err) {
            errors[`workstreams[${i}].domain`] = err.message;
          }
        }
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

      const proposed_action = clip(w.proposed_action, 100) || null;

      workstreams.push({
        id,
        owner_agent,
        domain: clip(w.domain, 80) || null,
        title: clip(w.title, 200) || id,
        priority,
        dependencies,
        success_criteria,
        risk_class,
        proposed_action,
        // Deprecated advisory flag — kept for compatibility; does NOT gate Founder.
        approval_required: Boolean(w.approval_required) && isProtectedAction(proposed_action),
        status: WORKSTREAM_STATUSES.includes(w.status) ? w.status : "planned",
      });
    });
  }

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

  const proposed_action = clip(plan.proposed_action, 100) || null;
  const approvalGate = deriveApprovalRequirement({
    proposedAction: proposed_action,
    plan: { workstreams, proposed_action },
  });

  return {
    objective_summary,
    workstreams,
    status: clip(plan.status, 40) || "planned",
    executive_result: clip(plan.executive_result, 8000) || "",
    blockers: Array.isArray(plan.blockers)
      ? plan.blockers.map((b) => clip(b, 500)).filter(Boolean).slice(0, 50)
      : [],
    proposed_action,
    approval_required: approvalGate.approval_required,
    protected_actions: approvalGate.protected_actions,
  };
}

/**
 * Aggregates child assessment outputs into an executive result.
 *
 * CASE A: all children ok, no protected action → aggregated (complete)
 * CASE B: children ok + protected action → awaiting_founder
 * CASE C: child blocked/missing → blocked (never claim success)
 */
export function aggregateExecutiveResult({
  objective,
  plan,
  assessments,
  proposedAction = null,
}) {
  const blockers = [];
  let worst = "ready";

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
  }

  const approvalGate = deriveApprovalRequirement({
    proposedAction: proposedAction || plan?.proposed_action || null,
    plan,
    assessments,
  });

  // Child failure never escalates to a production-approval mask.
  const approval_required = worst === "blocked" ? false : approvalGate.approval_required;

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
        : approval_required
          ? `Executive assessment complete. Protected action "${approvalGate.primary_action}" requires Founder approval.`
          : "Executive advisory assessment complete. No protected action proposed — Founder approval not required.",
    blockers,
    approval_required,
    protected_actions: approval_required ? approvalGate.protected_actions : [],
    approval_capability: approval_required ? approvalGate.approval_capability : null,
    primary_action: approval_required ? approvalGate.primary_action : null,
    recommendation:
      worst === "blocked" ? "no_go" : worst === "hold" ? "hold" : approval_required ? "hold" : "ready",
  };
}

export function validateExecutiveObjectiveStart(body) {
  const errors = {};
  const raw = body && typeof body === "object" ? body : {};
  const project_id = clip(raw.project_id, 64);
  const objective = clip(raw.objective, 8000);
  const proposed_action = clip(raw.proposed_action, 100) || null;
  if (!project_id) errors.project_id = "project_id is required.";
  if (!objective) errors.objective = "objective is required.";
  if (Object.keys(errors).length > 0) {
    throw validationError("Please fix the highlighted fields.", errors);
  }
  return {
    workflow: "executive-readiness",
    project_id,
    objective,
    proposed_action,
  };
}
