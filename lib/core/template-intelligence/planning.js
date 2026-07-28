/**
 * Planning orchestrator — Template Intelligence → Company Builder enrichment.
 */

import { matchTemplates } from "./matcher";
import { selectCapabilitiesFromObjective } from "./capability-engine";
import {
  mapCapabilitiesToDepartments,
  mapDepartmentsToExecutableAgents,
} from "./department-engine";
import { listModuleTemplates } from "./catalog/modules";
import { listWorkflowTemplates } from "./catalog/workflows";
import { listKpiTemplates } from "./catalog/kpis";
import { listRiskTemplates, getRiskTemplate } from "./catalog/risks";
import { assertAcyclic } from "./graph";
import { listCatalogRelations } from "./catalog/relations";
import { buildTemplateLineage } from "./lineage";
import { ENGINE_VERSION, nowIso } from "./schemas";
import { recordTemplateAudit } from "./audit";

export function runTemplateIntelligencePlan(input = {}, { actor = "system" } = {}) {
  assertAcyclic(listCatalogRelations(), { actor });

  const match = matchTemplates(input);
  if (match.clarification_required) {
    recordTemplateAudit({
      action: "template.clarification_required",
      actor,
      confidence: match.confidence,
      missing: match.missing_information,
    });
    return {
      ok: false,
      clarification_required: true,
      match,
      engine_version: ENGINE_VERSION,
      created_at: nowIso(),
    };
  }

  const complianceSensitive = Boolean(match.compliance_sensitive);
  const caps = selectCapabilitiesFromObjective(input.objective || "", {
    complianceSensitive,
  });
  const deptMap = mapCapabilitiesToDepartments(caps.capabilities);
  const agentMap = mapDepartmentsToExecutableAgents(deptMap.departments);

  const moduleSlugs = new Set();
  for (const c of caps.capabilities) {
    for (const m of c.required_modules || []) moduleSlugs.add(m);
  }
  const modules = listModuleTemplates().filter((m) => moduleSlugs.has(m.slug));

  const workflows = listWorkflowTemplates().filter((w) =>
    ["onboarding", "approval-gate"].includes(w.slug)
  );

  const risks = match.selected_templates
    .filter((s) => s.kind === "risk")
    .map((s) => getRiskTemplate(s.slug, s.version))
    .filter(Boolean);

  // Always include provider-unconfigured risk when present
  const providerRisk = getRiskTemplate("provider-unconfigured");
  if (providerRisk && !risks.find((r) => r.slug === providerRisk.slug)) {
    risks.push(providerRisk);
  }

  const kpis = listKpiTemplates().filter((k) =>
    caps.capabilities.some((c) => c.slug === k.payload.applicable_capability)
  );

  const unresolved = [
    ...match.missing_information.map((m) => `missing:${m}`),
    ...deptMap.missing_department_coverage.map((g) => `dept_gap:${g.requested}`),
    ...agentMap.workforce_gaps.map((g) => `workforce_gap:${g.department}`),
  ];

  const capabilityGaps = [
    ...deptMap.missing_department_coverage,
    ...agentMap.workforce_gaps,
  ];

  const lineage = buildTemplateLineage({
    objective: input.objective,
    match,
    capabilities: caps.capabilities,
    departments: deptMap.departments,
    modules,
    workflows,
    risks,
    compliance: match.selected_templates.filter((s) => s.kind === "compliance"),
  });

  const plan = {
    ok: true,
    clarification_required: false,
    engine_version: ENGINE_VERSION,
    created_at: nowIso(),
    match,
    capabilities: caps.capabilities,
    capability_assumptions: caps.assumptions,
    departments: deptMap.departments,
    department_review_requirements: deptMap.review_requirements,
    workforce: agentMap,
    modules: modules.map((m) => ({
      slug: m.slug,
      version: m.version,
      template_id: m.id,
      name: m.name,
    })),
    workflows: workflows.map((w) => ({
      slug: w.slug,
      version: w.version,
      template_id: w.id,
      name: w.name,
      distinction: "template_workflow_not_runtime_instance",
    })),
    risks: risks.map((r) => ({
      slug: r.slug,
      version: r.version,
      template_id: r.id,
      severity: r.payload.severity,
      mitigation: r.payload.mitigation,
    })),
    kpis: kpis.map((k) => ({
      slug: k.slug,
      version: k.version,
      template_id: k.id,
      name: k.name,
      formula: k.payload.formula,
      quality_caveat: k.payload.quality_caveat,
    })),
    compliance_warnings: match.human_review_requirements,
    unresolved_questions: unresolved,
    capability_gaps: capabilityGaps,
    workforce_gaps: agentMap.workforce_gaps,
    lineage,
    selected_template_versions: match.selected_templates.map((s) => ({
      kind: s.kind,
      slug: s.slug,
      version: s.version,
      template_id: s.template_id,
      why: s.reasons,
    })),
    provider_note:
      "Deterministic template logic works without a configured AI provider. Do not claim AI completion.",
  };

  recordTemplateAudit({
    action: "template.plan_built",
    actor,
    confidence: match.confidence,
    selected_count: match.selected_templates.length,
  });

  return plan;
}

/**
 * Enrich a Company Builder blueprint object with template intelligence section.
 */
export function attachTemplateIntelligenceToBlueprint(blueprint, templatePlan) {
  if (!blueprint || typeof blueprint !== "object") return blueprint;
  return {
    ...blueprint,
    template_intelligence: {
      attached_at: nowIso(),
      engine_version: ENGINE_VERSION,
      plan: templatePlan,
    },
    selected_template_versions: templatePlan?.selected_template_versions || [],
    template_assumptions: templatePlan?.match?.assumptions || [],
    template_unresolved_questions: templatePlan?.unresolved_questions || [],
    template_risks: templatePlan?.risks || [],
    template_compliance_warnings: templatePlan?.compliance_warnings || [],
    template_capability_gaps: templatePlan?.capability_gaps || [],
    template_workforce_gaps: templatePlan?.workforce_gaps || [],
  };
}
