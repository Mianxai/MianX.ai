/**
 * Execution lineage: Task → Story → Feature → Module → Capability → Template → Objective
 */

import { ENGINE_VERSION, nowIso } from "./schemas";

export function buildTemplateLineage({
  objective,
  match,
  capabilities = [],
  departments = [],
  modules = [],
  workflows = [],
  risks = [],
  compliance = [],
} = {}) {
  const industry = (match?.selected_templates || []).find((s) => s.kind === "industry");
  const businessModel = (match?.selected_templates || []).find(
    (s) => s.kind === "business_model"
  );

  return {
    engine_version: ENGINE_VERSION,
    created_at: nowIso(),
    objective: objective || null,
    industry_template: industry
      ? { slug: industry.slug, version: industry.version, template_id: industry.template_id }
      : null,
    business_model_template: businessModel
      ? {
          slug: businessModel.slug,
          version: businessModel.version,
          template_id: businessModel.template_id,
        }
      : null,
    capabilities: capabilities.map((c) => ({
      slug: c.slug,
      version: c.version,
      template_id: c.template_id,
    })),
    departments: departments.map((d) => ({
      slug: d.slug,
      version: d.version,
      template_id: d.template_id,
    })),
    modules: modules.map((m) => ({
      slug: m.slug || m,
      version: m.version || null,
      template_id: m.template_id || null,
    })),
    workflows: workflows.map((w) => ({
      slug: w.slug || w,
      version: w.version || null,
      template_id: w.template_id || null,
    })),
    compliance: compliance.map((c) => ({
      slug: c.slug,
      version: c.version,
      template_id: c.template_id,
    })),
    risks: risks.map((r) => ({
      slug: r.slug,
      version: r.version,
      template_id: r.id || r.template_id,
    })),
  };
}

/**
 * Attach lineage onto an execution item / backlog node.
 */
export function stampExecutionLineage(item, lineage, extras = {}) {
  if (!item || typeof item !== "object") return item;
  return {
    ...item,
    lineage: {
      ...(item.lineage || {}),
      ...lineage,
      ...extras,
      stamped_at: nowIso(),
      chain: [
        extras.task_id && `task:${extras.task_id}`,
        extras.story_id && `story:${extras.story_id}`,
        extras.feature_id && `feature:${extras.feature_id}`,
        extras.module_slug && `module:${extras.module_slug}`,
        extras.capability_slug && `capability:${extras.capability_slug}`,
        lineage?.industry_template &&
          `template:industry:${lineage.industry_template.slug}@v${lineage.industry_template.version}`,
        lineage?.objective && `objective`,
      ].filter(Boolean),
    },
  };
}

export function explainLineage(lineage) {
  if (!lineage) return [];
  const steps = [];
  if (lineage.objective) steps.push({ layer: "objective", value: lineage.objective });
  if (lineage.industry_template) {
    steps.push({
      layer: "industry_template",
      value: `${lineage.industry_template.slug}@v${lineage.industry_template.version}`,
    });
  }
  if (lineage.business_model_template) {
    steps.push({
      layer: "business_model_template",
      value: `${lineage.business_model_template.slug}@v${lineage.business_model_template.version}`,
    });
  }
  for (const c of lineage.capabilities || []) {
    steps.push({ layer: "capability", value: `${c.slug}@v${c.version}` });
  }
  for (const m of lineage.modules || []) {
    steps.push({ layer: "module", value: `${m.slug}@v${m.version || "?"}` });
  }
  return steps;
}
