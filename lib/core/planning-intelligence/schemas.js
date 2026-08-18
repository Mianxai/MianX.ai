/**
 * Phase F — Planning Intelligence domain contracts.
 * Planning decides HOW to build; never executes. Founder-gated.
 */

export const ENGINE_VERSION = "phase-f-planning-intelligence/1.0.0";

export const PLANNING_OBJECT_KINDS = Object.freeze([
  "company",
  "program",
  "portfolio",
  "capability",
  "roadmap",
  "milestone",
  "epic",
  "feature",
  "story",
  "task",
  "agent_run",
  "approval_gate",
  "success_criteria",
  "risk",
  "dependency",
  "deliverable",
  "evidence",
]);

export const APPROVAL_STATUSES = Object.freeze([
  "pending",
  "approved",
  "rejected",
  "returned",
  "archived",
]);

export const ROADMAP_HORIZONS = Object.freeze([
  "30_day",
  "90_day",
  "180_day",
  "1_year",
  "multi_year",
]);

export const PLAN_STATUSES = Object.freeze([
  "draft",
  "pending_approval",
  "approved",
  "rejected",
  "returned",
  "archived",
]);

export const DEPENDENCY_KINDS = Object.freeze([
  "blocks",
  "requires",
  "related",
  "rollback_of",
  "wave_after",
]);

/** Edge kinds that must remain acyclic. */
export const ACYCLIC_DEPENDENCY_KINDS = Object.freeze([
  "blocks",
  "requires",
  "wave_after",
  "rollback_of",
]);

export function nowIso() {
  return new Date().toISOString();
}

export function uid(prefix = "plan") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

/**
 * Base metadata on every planning object.
 * @typedef {object} PlanningBase
 */
export function makePlanningBase({
  kind,
  slug,
  name,
  description = "",
  status = "draft",
  version = 1,
  scope = "project",
  source = "planning-intelligence",
  confidence = 0.7,
  evidence_refs = [],
  owner = null,
  organization_id = null,
  project_id = null,
  parent_id = null,
  payload = {},
  audit_metadata = {},
} = {}) {
  const ts = nowIso();
  return {
    id: uid(kind || "obj"),
    kind,
    slug,
    name,
    description,
    status,
    version,
    scope,
    source,
    confidence,
    evidence_refs: Array.isArray(evidence_refs) ? evidence_refs : [],
    created_at: ts,
    updated_at: ts,
    owner,
    organization_id,
    project_id,
    parent_id,
    payload,
    audit_metadata,
  };
}

export function assertPlanningBase(obj, kind) {
  const required = [
    "id",
    "kind",
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
      throw new Error(`Planning ${kind || obj?.kind || "object"} missing: ${key}`);
    }
  }
  if (kind && obj.kind !== kind) {
    throw new Error(`Expected kind ${kind}, got ${obj.kind}`);
  }
}
