/**
 * Memory bridge — verified template usage / assumptions / gaps.
 * Does not auto-modify active templates.
 */

import { ENGINE_VERSION, nowIso } from "./schemas";

export function buildTemplateMemoryCandidates(templatePlan, { projectId = null } = {}) {
  if (!templatePlan?.ok) return [];
  const rows = [];

  for (const sel of templatePlan.selected_template_versions || []) {
    rows.push({
      memory_type: "procedure",
      content: `Template selected: ${sel.kind}:${sel.slug}@v${sel.version}`,
      structured: {
        engine: ENGINE_VERSION,
        kind: sel.kind,
        slug: sel.slug,
        version: sel.version,
        why: sel.why,
      },
      verification_status: "candidate",
      project_id: projectId,
      source_references: [{ type: "template_intelligence", ref: sel.template_id }],
      evidence: [{ type: "plan", at: nowIso() }],
      confidence: templatePlan.match?.confidence ?? 0.5,
      created_by: "template-intelligence",
    });
  }

  for (const a of templatePlan.match?.assumptions || []) {
    rows.push({
      memory_type: "decision",
      content: `Accepted planning assumption: ${a}`,
      structured: { assumption: a, engine: ENGINE_VERSION },
      verification_status: "candidate",
      project_id: projectId,
      confidence: 0.5,
      created_by: "template-intelligence",
      evidence: [],
      source_references: [],
    });
  }

  for (const gap of templatePlan.workforce_gaps || []) {
    rows.push({
      memory_type: "open_question",
      content: `Workforce gap: ${gap.department} — ${gap.message}`,
      structured: { gap, engine: ENGINE_VERSION },
      verification_status: "candidate",
      project_id: projectId,
      confidence: 0.7,
      created_by: "template-intelligence",
      evidence: [],
      source_references: [],
    });
  }

  return rows;
}
