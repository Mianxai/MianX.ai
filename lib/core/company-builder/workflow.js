// Company Builder workflow — parse → plan → backlog → graph → roadmap → approval.

import * as repo from "../repo";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { clip } from "../validate";
import { parseFounderObjective } from "./parser";
import { buildCeoStrategicPlan } from "./ceo-plan";
import { buildDepartmentPlans } from "./departments";
import { buildEnterpriseBacklog } from "./backlog";
import { buildDependencyGraph } from "./dependencies";
import { buildExecutionRoadmap } from "./roadmap";
import {
  assertNoProtectedExecution,
  COMPANY_BUILDER_APPROVAL_CAPABILITY,
} from "./policy";
import { ENGINE_VERSION } from "./schemas";

const blueprints = new Map();

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

async function audit(entry) {
  try {
    await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
  } catch {
    /* best-effort */
  }
}

/**
 * Run the full Company Builder planning pipeline (deterministic).
 * Creates a Founder approval request when Supabase/repo is available.
 * Never starts agent runs or builds industry products.
 */
export async function runCompanyBuilder({
  objective,
  projectId = null,
  organizationId = null,
  actor = "founder",
  persist = true,
} = {}) {
  const structured = parseFounderObjective({
    objective,
    project_id: projectId,
    organization_id: organizationId,
  });
  const ceoPlan = buildCeoStrategicPlan(structured);
  const departmentPlans = buildDepartmentPlans(structured, ceoPlan);
  const backlog = buildEnterpriseBacklog(structured, ceoPlan, departmentPlans);
  const dependencyGraph = buildDependencyGraph(ceoPlan, backlog);
  const roadmap = buildExecutionRoadmap(
    structured,
    ceoPlan,
    backlog,
    dependencyGraph
  );

  const blueprintId = uid("cb");
  const blueprint = {
    id: blueprintId,
    engine_version: ENGINE_VERSION,
    status: "awaiting_founder_approval",
    project_id: projectId,
    organization_id: organizationId,
    objective: structured,
    ceo_plan: ceoPlan,
    department_plans: departmentPlans,
    backlog,
    dependency_graph: dependencyGraph,
    roadmap,
    approval_id: null,
    task_id: null,
    created_by: actor,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    execution: {
      agent_runs_started: 0,
      protected_actions: [],
      industry_os_executed: false,
    },
  };

  assertNoProtectedExecution(blueprint);

  if (persist && projectId && isSupabaseConfigured()) {
    try {
      const rootKey = `wf:company-builder:${projectId}:${clip(structured.raw_text, 40)
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
      const { row: task } = await repo.createTask({
        project_id: projectId,
        title: `Company Builder: ${clip(structured.product_hint, 80)}`,
        description:
          "Self-building company engine blueprint. Planning only until Founder approval. Does not build industry OS products.",
        status: "awaiting_approval",
        priority: "high",
        input: {
          workflow: "company-builder",
          blueprint_id: blueprintId,
          objective: structured,
          ceo_plan: ceoPlan,
          backlog_counts: backlog.counts,
          source: "company-builder",
        },
        idempotency_key: rootKey,
        requires_approval: true,
        created_by: actor,
      });
      blueprint.task_id = task.id;

      const approval = await repo.createApproval({
        project_id: projectId,
        task_id: task.id,
        requested_capability: COMPANY_BUILDER_APPROVAL_CAPABILITY,
        reason: `Approve Company Builder blueprint for ${structured.product_hint} (planning programme — does not deploy or build industry OS).`,
        status: "pending",
        metadata: {
          workflow: "company-builder",
          blueprint_id: blueprintId,
          proposed_action: "company_builder_blueprint_approve",
          product_hint: structured.product_hint,
          industry: structured.industry,
          risk_class: structured.risk_class,
          agent_slug: "executive-ceo",
        },
      });
      blueprint.approval_id = approval.id;

      await audit({
        projectId,
        actor,
        actorType: "admin",
        action: AUDIT_ACTIONS.TASK_CREATED,
        resourceType: "task",
        resourceId: task.id,
        metadata: { workflow: "company-builder", blueprint_id: blueprintId },
      });
    } catch {
      // Persist is best-effort; in-memory blueprint still returned for UI/tests.
    }
  }

  blueprints.set(blueprintId, blueprint);
  return blueprint;
}

export function getBlueprint(id) {
  return blueprints.get(id) || null;
}

export function listBlueprints({ projectId = null } = {}) {
  return [...blueprints.values()].filter((b) =>
    projectId ? b.project_id === projectId : true
  );
}

/**
 * Apply Founder decision to an in-memory blueprint (and optionally sync task).
 */
export async function decideCompanyBlueprint({
  blueprintId,
  decision,
  actor = "founder",
} = {}) {
  const blueprint = blueprints.get(blueprintId);
  if (!blueprint) {
    const err = new Error("Blueprint not found");
    err.status = 404;
    throw err;
  }
  if (!["approved", "rejected"].includes(decision)) {
    const err = new Error("decision must be approved or rejected");
    err.status = 400;
    throw err;
  }

  blueprint.status = decision;
  blueprint.updated_at = new Date().toISOString();
  blueprint.decided_by = actor;
  // Approval records intent only — never auto-executes industry builds.
  blueprint.execution = {
    agent_runs_started: 0,
    protected_actions: [],
    industry_os_executed: false,
    executed: false,
    industry_os_built: false,
    message:
      decision === "approved"
        ? "Blueprint approved for record. Company Builder does not auto-build industry products."
        : "Blueprint rejected. No execution occurred.",
  };

  if (blueprint.task_id) {
    try {
      await repo.updateTask(blueprint.task_id, {
        status: decision === "approved" ? "completed" : "cancelled",
      });
    } catch {
      /* ignore */
    }
  }

  blueprints.set(blueprintId, blueprint);
  return blueprint;
}

/** Test helper */
export function __resetCompanyBuilderStore() {
  blueprints.clear();
}
