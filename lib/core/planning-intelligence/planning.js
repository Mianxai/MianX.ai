/**
 * Planning Intelligence orchestrator.
 * Template Intelligence → Planning → (preview only) → Founder approval.
 * Never executes. Never fabricates agent work.
 */

import { runTemplateIntelligencePlan } from "../template-intelligence/planning.js";
import { planCapabilities } from "./capability-planner.js";
import { generateRoadmap } from "./roadmap-engine.js";
import { buildWorkBreakdown } from "./wbs-engine.js";
import { buildExecutionPreview } from "./execution-preview.js";
import {
  createApprovalGate,
  transitionApproval,
} from "./approval-engine.js";
import {
  assertAcyclic,
  validateReferences,
  impactAnalysis,
  rollbackDependencies,
} from "./graph.js";
import {
  buildPlanningMemoryCandidates,
  persistPlanningMemoryCandidates,
} from "./memory-bridge.js";
import { proposePlanningImprovements } from "./learning-bridge.js";
import { savePlan, getPlan, listPlans } from "./store.js";
import { recordPlanningAudit } from "./audit.js";
import {
  ENGINE_VERSION,
  makePlanningBase,
  nowIso,
  uid,
} from "./schemas.js";

/**
 * Run full planning pipeline (deterministic, non-executing).
 */
export function runPlanningIntelligence({
  objective = "",
  industry = null,
  business_model = null,
  horizon = "90_day",
  project_id = null,
  organization_id = null,
  company_name = null,
  risk_tolerance = null,
  compliance_sensitivity = null,
  actor = "founder",
  persist = true,
} = {}) {
  const templatePlan = runTemplateIntelligencePlan(
    {
      objective,
      industry,
      business_model,
      risk_tolerance,
      compliance_sensitivity,
      project_id,
    },
    { actor }
  );

  if (templatePlan.clarification_required) {
    const stub = makePlanningBase({
      kind: "program",
      slug: `clarify-${uid("c").slice(-5)}`,
      name: "Clarification required",
      description: "Planning paused — Template Intelligence needs clarification.",
      status: "draft",
      project_id,
      organization_id,
      confidence: templatePlan.match?.confidence ?? 0.2,
      payload: {
        clarification_required: true,
        template_plan: templatePlan,
        executes: false,
      },
    });
    const plan = {
      id: stub.id,
      kind: "plan_package",
      status: "draft",
      project_id,
      organization_id,
      objective,
      clarification_required: true,
      template_plan: templatePlan,
      engine_version: ENGINE_VERSION,
      created_at: nowIso(),
      updated_at: nowIso(),
      executes: false,
      fabricated_execution: false,
    };
    if (persist) savePlan(plan);
    recordPlanningAudit({
      action: "planning.clarification_required",
      actor,
      plan_id: plan.id,
    });
    return plan;
  }

  const complianceSensitive = Boolean(
    compliance_sensitivity ||
      templatePlan.match?.compliance_sensitive ||
      /compliance|gdpr|hipaa|pci/i.test(objective)
  );

  const capabilityPlan = planCapabilities({
    objective,
    complianceSensitive,
    templatePlan,
    project_id,
    organization_id,
  });

  const departments = capabilityPlan.department_ownership || [];
  const roadmap = generateRoadmap({
    objective,
    horizon,
    capabilities: capabilityPlan.capability_objects,
    departments,
    project_id,
    organization_id,
  });

  const wbs = buildWorkBreakdown({
    objective,
    capabilities: capabilityPlan.capability_objects,
    departments,
    modules: templatePlan.modules || [],
    project_id,
    organization_id,
    company_name: company_name || "Planned company",
  });

  assertAcyclic(wbs.edges);
  validateReferences(
    [
      wbs.company,
      wbs.program,
      wbs.portfolio,
      ...wbs.epics,
      ...wbs.features,
      ...wbs.stories,
      ...wbs.tasks,
      ...wbs.agent_runs,
    ],
    wbs.edges
  );

  const risks = [
    ...(templatePlan.risks || []),
    makePlanningBase({
      kind: "risk",
      slug: "planning-without-execution",
      name: "Planning must not be mistaken for execution",
      description: "Risk that stakeholders treat plans as live work.",
      project_id,
      payload: {
        likelihood: "medium",
        impact: "medium",
        severity: "medium",
        mitigation: "Explicit executes:false flags and Founder approval gates",
      },
    }),
  ];

  const evidence = [
    makePlanningBase({
      kind: "evidence",
      slug: "template-match",
      name: "Template Intelligence match",
      description: "Deterministic template match evidence",
      project_id,
      payload: {
        selected: templatePlan.match?.selected_templates || [],
        confidence: templatePlan.match?.confidence,
      },
    }),
  ];

  const execution_preview = buildExecutionPreview({
    wbs,
    risks,
    departments,
    agents: capabilityPlan.executable_agents || [],
    roadmap,
  });

  const approval_gate = createApprovalGate({
    name: "Founder approve planning package",
    stage: "planning_package",
    project_id,
    organization_id,
  });

  const plan = {
    id: uid("plan"),
    kind: "plan_package",
    status: "draft",
    project_id,
    organization_id,
    objective,
    assumptions: templatePlan.match?.assumptions || [],
    clarifications: [],
    founder_decisions: [],
    rejected_ideas: [],
    template_plan: templatePlan,
    capability_plan: capabilityPlan,
    roadmap,
    wbs,
    risks,
    evidence,
    dependencies: wbs.edges,
    deliverables: wbs.deliverables,
    success_criteria: wbs.success_criteria,
    execution_preview,
    approval_gate,
    learning_proposals: [],
    memory_candidates: [],
    engine_version: ENGINE_VERSION,
    created_at: nowIso(),
    updated_at: nowIso(),
    executes: false,
    fabricated_execution: false,
    note: "Planning Intelligence package — Founder approval required. Nothing executes.",
  };

  plan.approval_gate = {
    ...approval_gate,
    payload: { ...approval_gate.payload, plan_id: plan.id },
  };

  const memory = buildPlanningMemoryCandidates(plan, { actor });
  plan.memory_candidates = memory;
  persistPlanningMemoryCandidates(memory);
  plan.learning_proposals = proposePlanningImprovements(plan, { actor });

  if (persist) savePlan(plan);

  recordPlanningAudit({
    action: "planning.package.created",
    actor,
    plan_id: plan.id,
    executes: false,
  });

  return plan;
}

/**
 * Attach planning package onto a Company Builder blueprint (non-destructive enrich).
 */
export function attachPlanningToBlueprint(blueprint, plan) {
  if (!blueprint || !plan) return blueprint;
  return {
    ...blueprint,
    planning_intelligence: {
      plan_id: plan.id,
      engine_version: plan.engine_version,
      status: plan.status,
      horizon: plan.roadmap?.payload?.horizon,
      clarification_required: Boolean(plan.clarification_required),
      capability_count: plan.capability_plan?.capability_objects?.length || 0,
      epic_count: plan.wbs?.epics?.length || 0,
      execution_preview_summary: plan.execution_preview
        ? {
            waves: plan.execution_preview.execution_waves?.length || 0,
            tasks: plan.execution_preview.estimated_workload?.tasks || 0,
            executes: false,
          }
        : null,
      approval_status: plan.approval_gate?.status || "pending",
    },
    planning_package: plan,
    updated_at: nowIso(),
  };
}

export function requestPlanApproval(planId, { actor = "founder" } = {}) {
  const plan = getPlan(planId);
  if (!plan) throw new Error("Plan not found");
  if (plan.clarification_required) {
    throw new Error("Cannot request approval while clarification is required");
  }
  const next = {
    ...plan,
    status: "pending_approval",
    updated_at: nowIso(),
    approval_gate: plan.approval_gate,
  };
  savePlan(next);
  recordPlanningAudit({
    action: "planning.approval.requested",
    actor,
    plan_id: planId,
  });
  return next;
}

export function decidePlanApproval(
  planId,
  decision,
  { actor = "founder", reason = "" } = {}
) {
  const plan = getPlan(planId);
  if (!plan) throw new Error("Plan not found");
  const gate = transitionApproval(plan.approval_gate, decision, { actor, reason });
  const statusMap = {
    approved: "approved",
    rejected: "rejected",
    returned: "returned",
    archived: "archived",
    pending: "pending_approval",
  };
  const next = {
    ...plan,
    status: statusMap[decision] || plan.status,
    approval_gate: gate,
    founder_decisions: [
      ...(plan.founder_decisions || []),
      { decision, actor, reason, at: nowIso() },
    ],
    updated_at: nowIso(),
    executes: false,
  };
  savePlan(next);
  recordPlanningAudit({
    action: "planning.approval.decided",
    actor,
    plan_id: planId,
    decision,
    executes: false,
  });
  return next;
}

export function getPlanImpact(planId, nodeId) {
  const plan = getPlan(planId);
  if (!plan) throw new Error("Plan not found");
  return {
    impact: impactAnalysis(nodeId, plan.dependencies || []),
    rollback: rollbackDependencies(nodeId, plan.dependencies || []),
  };
}

export { getPlan, listPlans, ENGINE_VERSION };
