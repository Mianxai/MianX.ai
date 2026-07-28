/**
 * Phase E — Template Intelligence domain model contracts.
 * Typed, versioned, evidence-backed. No industry product builds.
 */

export const ENGINE_VERSION = "phase-e-template-intelligence/1.0.0";

export const TEMPLATE_STATUSES = Object.freeze([
  "draft",
  "under_review",
  "approved",
  "active",
  "deprecated",
  "archived",
]);

export const TEMPLATE_KINDS = Object.freeze([
  "industry",
  "business_model",
  "capability",
  "department",
  "module",
  "workflow",
  "compliance",
  "architecture",
  "risk",
  "kpi",
]);

export const TEMPLATE_SCOPES = Object.freeze(["platform", "organization", "project"]);

export const RELATION_TYPES = Object.freeze([
  "contains_capability",
  "requires_department",
  "uses_module",
  "uses_workflow",
  "has_compliance",
  "architecture_supports",
  "risk_affects",
  "kpi_measures",
  "depends_on",
]);

/** Relation types that must be acyclic. */
export const ACYCLIC_RELATION_TYPES = Object.freeze([
  "depends_on",
  "uses_module",
  "uses_workflow",
  "contains_capability",
]);

export const REVIEW_STATUSES = Object.freeze([
  "pending",
  "approved",
  "rejected",
  "needs_changes",
]);

/**
 * Base metadata required on every template object.
 * @typedef {object} TemplateBase
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 * @property {string} status
 * @property {number} version
 * @property {string} scope
 * @property {string} source
 * @property {number} confidence
 * @property {Array<object>} evidence_refs
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string|null} owner
 * @property {object} audit_metadata
 */

export function assertBaseFields(obj, kind) {
  const required = [
    "id",
    "slug",
    "name",
    "description",
    "status",
    "version",
    "scope",
    "source",
    "confidence",
    "evidence_refs",
    "created_at",
    "updated_at",
  ];
  for (const key of required) {
    if (obj == null || obj[key] === undefined || obj[key] === null) {
      throw new Error(`Template ${kind || "object"} missing required field: ${key}`);
    }
  }
  if (!TEMPLATE_STATUSES.includes(obj.status)) {
    throw new Error(`Invalid template status: ${obj.status}`);
  }
  if (!TEMPLATE_SCOPES.includes(obj.scope)) {
    throw new Error(`Invalid template scope: ${obj.scope}`);
  }
  if (typeof obj.confidence !== "number" || obj.confidence < 0 || obj.confidence > 1) {
    throw new Error(`Invalid confidence: ${obj.confidence}`);
  }
  if (!Array.isArray(obj.evidence_refs)) {
    throw new Error("evidence_refs must be an array");
  }
  return obj;
}

export function nowIso() {
  return new Date().toISOString();
}

export function makeTemplateBase({
  id,
  slug,
  name,
  description = "",
  status = "active",
  version = 1,
  scope = "platform",
  source = "catalog",
  confidence = 0.85,
  evidence_refs = [],
  owner = "mianx-catalog",
  audit_metadata = {},
  created_at = null,
  updated_at = null,
} = {}) {
  const ts = nowIso();
  return assertBaseFields(
    {
      id,
      slug,
      name,
      description,
      status,
      version,
      scope,
      source,
      confidence,
      evidence_refs,
      owner,
      audit_metadata: { engine: ENGINE_VERSION, ...audit_metadata },
      created_at: created_at || ts,
      updated_at: updated_at || ts,
    },
    "base"
  );
}

export function nodeKey(kind, idOrSlug) {
  return `${kind}:${idOrSlug}`;
}
