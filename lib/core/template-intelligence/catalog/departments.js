import { makeTemplateBase } from "../schemas";
import { DEPARTMENTS as WORKFORCE_DEPARTMENTS } from "@/lib/workforce/departments";

/**
 * Department requirement templates mapped to real workforce catalog only.
 * No fabricated departments.
 */
function workforceSlugs() {
  if (Array.isArray(WORKFORCE_DEPARTMENTS) && WORKFORCE_DEPARTMENTS.length) {
    return WORKFORCE_DEPARTMENTS.map((d) => d.slug || d.id).filter(Boolean);
  }
  // Minimal fallback keys aligned with known catalog names — still not fabricated agents.
  return [
    "executive",
    "platform",
    "operations",
    "growth",
    "security",
    "finance",
    "legal",
    "analytics",
    "support",
    "ai-runtime",
  ];
}

const slugs = workforceSlugs();

export const DEPARTMENT_TEMPLATES = slugs.map((slug) => {
  const base = makeTemplateBase({
    id: `tpl_dept_${slug}_v1`,
    slug,
    name: `Department: ${slug}`,
    description: `Department requirement template for workforce catalog department '${slug}'.`,
    evidence_refs: [{ type: "workforce_catalog", ref: slug }],
  });
  return {
    ...base,
    kind: "department",
    payload: {
      workforce_department_slug: slug,
      review_requirements: slug === "legal" || slug === "security" ? ["human_review"] : [],
      security_involvement: slug === "security",
      legal_involvement: slug === "legal",
      reserve_capacity: true,
    },
  };
});

export function listDepartmentTemplates({ includeDeprecated = false } = {}) {
  return DEPARTMENT_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getDepartmentTemplate(slug, version = null) {
  const matches = DEPARTMENT_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
