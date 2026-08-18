// Company Builder workflow — parse → template intelligence → plan → backlog → approval.
// Blueprints are cached in-process and durably snapshotted onto the linked task.input.

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
import {
  runTemplateIntelligencePlan,
  attachTemplateIntelligenceToBlueprint,
} from "../template-intelligence/planning";
import { stampExecutionLineage } from "../template-intelligence/lineage";
import {
  runPlanningIntelligence,
  attachPlanningToBlueprint,
} from "../planning-intelligence/planning";

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

function cacheBlueprint(blueprint) {
  if (blueprint?.id) blueprints.set(blueprint.id, blueprint);
  return blueprint;
}

/**
 * Persist blueprint body onto the linked task so cold starts / other instances
 * can hydrate. Does not require a new migration.
 */
async function persistBlueprintToTask(blueprint) {
  if (!blueprint?.task_id) return;
  try {
    const task = await repo.getTask(blueprint.task_id);
    const prevInput = task?.input && typeof task.input === "object" ? task.input : {};
    await repo.updateTask(blueprint.task_id, {
      input: {
        ...prevInput,
        workflow: "company-builder",
        blueprint_id: blueprint.id,
        blueprint,
        source: "company-builder",
      },
    });
  } catch {
    /* best-effort */
  }
}

/**
 * Hydrate in-memory cache from durable task snapshots.
 */
export async function hydrateBlueprintsFromTasks({ projectId = null } = {}) {
  if (!isSupabaseConfigured()) return;
  try {
    const tasks = await repo.listTasks({ projectId: projectId || undefined });
    for (const task of tasks || []) {
      const bp = task?.input?.blueprint;
      if (!bp?.id) continue;
      if (projectId && bp.project_id && bp.project_id !== projectId) continue;
      // Prefer fresher cache if already present with later updated_at
      const existing = blueprints.get(bp.id);
      if (
        existing?.updated_at &&
        bp.updated_at &&
        String(existing.updated_at) >= String(bp.updated_at)
      ) {
        continue;
      }
      cacheBlueprint({
        ...bp,
        task_id: bp.task_id || task.id,
      });
      // Restore execution program hot-cache when snapshotted
      if (task.input?.execution_program_snapshot) {
        try {
          const { importProgramSnapshot } = await import(
            "../execution-engine/persist"
          );
          importProgramSnapshot(task.input.execution_program_snapshot);
        } catch {
          /* ignore */
        }
      }
    }
  } catch {
    /* degrade to in-memory only */
  }
}

/**
 * Run the full Company Builder planning pipeline (deterministic).
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

  // Phase E — Template Intelligence (deterministic; works without provider)
  const templatePlan = runTemplateIntelligencePlan(
    {
      objective: structured.raw_text || objective,
      industry: structured.industry || null,
      business_model: structured.business_model || structured.model || null,
      product_type: structured.product_hint || null,
      compliance_sensitivity:
        structured.risk_class === "high" || /regulat|complian|legal/i.test(String(objective))
          ? "high"
          : "normal",
    },
    { actor }
  );

  const ceoPlan = buildCeoStrategicPlan(structured);
  const departmentPlans = buildDepartmentPlans(structured, ceoPlan);
  let backlog = buildEnterpriseBacklog(structured, ceoPlan, departmentPlans);
  // Stamp lineage onto backlog features/stories/tasks when present
  if (templatePlan?.ok && templatePlan.lineage && Array.isArray(backlog?.features)) {
    backlog = {
      ...backlog,
      features: backlog.features.map((f, i) =>
        stampExecutionLineage(f, templatePlan.lineage, {
          feature_id: f.id || `feature_${i}`,
          module_slug: f.module || templatePlan.modules?.[0]?.slug,
          capability_slug: templatePlan.capabilities?.[0]?.slug,
        })
      ),
    };
  }
  const dependencyGraph = buildDependencyGraph(ceoPlan, backlog);
  const roadmap = buildExecutionRoadmap(
    structured,
    ceoPlan,
    backlog,
    dependencyGraph
  );

  const blueprintId = uid("cb");
  let blueprint = {
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

  blueprint = attachTemplateIntelligenceToBlueprint(blueprint, templatePlan);
  if (templatePlan?.clarification_required) {
    blueprint.status = "needs_clarification";
    blueprint.clarification_required = true;
  }

  // Phase F — Planning Intelligence (structure + preview only; never executes)
  const planningPackage = runPlanningIntelligence({
    objective: structured.raw_text || objective,
    industry: structured.industry || null,
    business_model: structured.business_model || structured.model || null,
    horizon: "90_day",
    project_id: projectId,
    organization_id: organizationId,
    company_name: structured.product_hint || "Planned company",
    compliance_sensitivity:
      structured.risk_class === "high" || /regulat|complian|legal/i.test(String(objective))
        ? "high"
        : "normal",
    actor,
    persist: true,
  });
  blueprint = attachPlanningToBlueprint(blueprint, planningPackage);
  if (planningPackage?.clarification_required) {
    blueprint.status = "needs_clarification";
    blueprint.clarification_required = true;
  }

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
          blueprint,
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

      // Re-persist with approval_id on blueprint body
      await persistBlueprintToTask(blueprint);

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

  return cacheBlueprint(blueprint);
}

export function getBlueprint(id) {
  return blueprints.get(id) || null;
}

export async function getBlueprintAsync(id) {
  const hit = blueprints.get(id);
  if (hit) return hit;
  await hydrateBlueprintsFromTasks();
  return blueprints.get(id) || null;
}

export function listBlueprints({ projectId = null } = {}) {
  return [...blueprints.values()].filter((b) =>
    projectId ? b.project_id === projectId : true
  );
}

export async function listBlueprintsAsync({ projectId = null } = {}) {
  await hydrateBlueprintsFromTasks({ projectId });
  return listBlueprints({ projectId });
}

/**
 * Apply Founder decision. Syncs approval + task + optional execution materialise.
 */
export async function decideCompanyBlueprint({
  blueprintId,
  decision,
  actor = "founder",
  syncApproval = true,
} = {}) {
  let blueprint = blueprints.get(blueprintId);
  if (!blueprint) {
    await hydrateBlueprintsFromTasks();
    blueprint = blueprints.get(blueprintId);
  }
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
  if (["approved", "rejected"].includes(blueprint.status)) {
    return blueprint;
  }

  blueprint.status = decision;
  blueprint.updated_at = new Date().toISOString();
  blueprint.decided_by = actor;
  blueprint.execution = {
    agent_runs_started: 0,
    protected_actions: [],
    industry_os_executed: false,
    executed: false,
    industry_os_built: false,
    message:
      decision === "approved"
        ? "Blueprint approved. Execution program may materialise; industry OS is not auto-built."
        : "Blueprint rejected. No execution occurred.",
  };

  if (decision === "approved") {
    try {
      const { materializeExecutionProgram } = await import(
        "../execution-engine/materialize"
      );
      const { exportProgramSnapshot } = await import("../execution-engine/persist");
      const materialised = materializeExecutionProgram(blueprint, { actor });
      blueprint.execution_program_id = materialised.program.id;
      blueprint.execution = {
        ...blueprint.execution,
        program_id: materialised.program.id,
        item_count: materialised.item_count,
        dependency_count: materialised.dependency_count,
        message:
          "Execution program materialised from frozen blueprint. No industry OS build. Agent runs require orchestrator + provider.",
      };
      // Phase H — attach E2E integration pipeline (simulation ≠ real company)
      try {
        const { attachIntegrationPipelineFromBlueprint } = await import(
          "./integration-bridge"
        );
        blueprint.integration_pipeline = attachIntegrationPipelineFromBlueprint(
          blueprint,
          { actor }
        );
      } catch (bridgeErr) {
        blueprint.integration_pipeline = {
          ok: false,
          reason: bridgeErr?.message || "integration_bridge_failed",
          simulation_equals_real_company: false,
        };
      }
      // Durable snapshot on task
      if (blueprint.task_id) {
        try {
          const task = await repo.getTask(blueprint.task_id);
          const prevInput =
            task?.input && typeof task.input === "object" ? task.input : {};
          await repo.updateTask(blueprint.task_id, {
            input: {
              ...prevInput,
              blueprint,
              execution_program_id: materialised.program.id,
              execution_program_snapshot: exportProgramSnapshot(
                materialised.program.id
              ),
            },
          });
        } catch {
          /* ignore */
        }
      }
    } catch (err) {
      blueprint.execution = {
        ...blueprint.execution,
        materialize_error: String(err.message || err).slice(0, 240),
      };
    }
  }

  if (syncApproval && blueprint.approval_id) {
    try {
      const existing = await repo.getApproval(blueprint.approval_id);
      if (existing && existing.status === "pending") {
        await repo.updateApproval(blueprint.approval_id, {
          status: decision,
          decided_by: actor,
          decided_at: new Date().toISOString(),
          decision_note: "Decided via Company Builder",
        });
      }
    } catch {
      /* ignore */
    }
  }

  if (blueprint.task_id) {
    try {
      await repo.updateTask(blueprint.task_id, {
        status: decision === "approved" ? "completed" : "cancelled",
      });
      await persistBlueprintToTask(blueprint);
    } catch {
      /* ignore */
    }
  }

  return cacheBlueprint(blueprint);
}

/** Test helper */
export function __resetCompanyBuilderStore() {
  blueprints.clear();
}
