/**
 * Capability map engine — Founder objective → required capabilities.
 */

import { listCapabilityTemplates } from "./catalog/capabilities";

const KEYWORD_MAP = [
  { re: /customer|crm|lead|client/i, slugs: ["customer-management"] },
  { re: /operat|workflow|task|delivery/i, slugs: ["operations"] },
  { re: /report|dashboard|kpi/i, slugs: ["reporting"] },
  { re: /finance|billing|payment|invoice/i, slugs: ["finance-controls"] },
  { re: /secur|auth|access/i, slugs: ["security", "identity-access"] },
  { re: /support|inbox|ticket/i, slugs: ["support"] },
  { re: /analytic|metric|insight/i, slugs: ["analytics"] },
  { re: /integrat|api|webhook/i, slugs: ["integrations"] },
  { re: /\bai\b|agent|automat/i, slugs: ["ai-assistance"] },
  { re: /complian|regulat|legal|privacy|gdpr|hipaa/i, slugs: ["compliance-controls"] },
  { re: /org|tenant|workspace|company/i, slugs: ["organisation-management"] },
  { re: /platform|marketplace|saas/i, slugs: ["identity-access", "organisation-management"] },
];

const ALWAYS = ["identity-access", "organisation-management", "security"];

export function selectCapabilitiesFromObjective(objectiveText = "", opts = {}) {
  const text = String(objectiveText || "");
  const catalog = listCapabilityTemplates();
  const bySlug = new Map(catalog.map((c) => [c.slug, c]));
  const selected = new Map();

  for (const slug of ALWAYS) {
    if (bySlug.has(slug)) selected.set(slug, { reason: "baseline_platform", required: true });
  }

  for (const { re, slugs } of KEYWORD_MAP) {
    if (re.test(text)) {
      for (const slug of slugs) {
        if (!bySlug.has(slug)) continue;
        const prev = selected.get(slug);
        selected.set(slug, {
          reason: prev?.reason || `matched:${re}`,
          required: !bySlug.get(slug).payload.optional,
        });
      }
    }
  }

  if (opts.complianceSensitive) {
    if (bySlug.has("compliance-controls")) {
      selected.set("compliance-controls", {
        reason: "compliance_sensitive_objective",
        required: true,
      });
    }
  }

  const capabilities = [...selected.entries()].map(([slug, meta]) => {
    const tpl = bySlug.get(slug);
    return {
      slug,
      name: tpl.name,
      version: tpl.version,
      template_id: tpl.id,
      status: tpl.status,
      required: meta.required || tpl.payload.required,
      optional: tpl.payload.optional,
      priority: tpl.payload.priority,
      maturity_target: tpl.payload.maturity_target,
      dependencies: tpl.payload.dependencies,
      owning_department: tpl.payload.owning_department,
      required_modules: tpl.payload.required_modules,
      acceptance_criteria: tpl.payload.acceptance_criteria,
      evidence: tpl.payload.evidence,
      selection_reason: String(meta.reason),
    };
  });

  capabilities.sort((a, b) => String(a.priority).localeCompare(String(b.priority)));
  return {
    capabilities,
    assumptions: [
      "Capability selection is deterministic keyword/rule based until a configured provider is available.",
    ],
    missing_information: text.trim() ? [] : ["objective_text"],
  };
}
