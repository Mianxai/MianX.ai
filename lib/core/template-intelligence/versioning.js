/**
 * Immutable template versioning lifecycle.
 * active versions cannot be edited in place — updates create a new version.
 */

import { TEMPLATE_STATUSES, nowIso, assertBaseFields } from "./schemas";
import { recordTemplateAudit } from "./audit";

const ALLOWED_TRANSITIONS = Object.freeze({
  draft: ["under_review", "archived"],
  under_review: ["approved", "draft", "archived"],
  approved: ["active", "deprecated", "archived"],
  active: ["deprecated", "archived"],
  deprecated: ["archived", "active"], // active only via explicit allow for rare revive
  archived: [],
});

/** In-memory version history + mutable working copies keyed by kind:slug:version */
const versionHistory = [];
const workingCopies = new Map();

function key(kind, slug, version) {
  return `${kind}:${slug}:v${version}`;
}

export function __resetVersionStore() {
  versionHistory.length = 0;
  workingCopies.clear();
}

export function getAllowedTransitions(status) {
  return ALLOWED_TRANSITIONS[status] || [];
}

export function canSelectForNewExecution(template, { allowDeprecated = false } = {}) {
  if (!template) return false;
  if (template.status === "active") return true;
  if (template.status === "approved") return false;
  if (template.status === "deprecated") return Boolean(allowDeprecated);
  return false;
}

export function registerTemplateVersion(template, { actor = "system" } = {}) {
  assertBaseFields(template, template.kind || "template");
  const snap = structuredClone(template);
  versionHistory.push({
    id: `tv_${template.kind}_${template.slug}_v${template.version}_${Date.now().toString(36)}`,
    template_kind: template.kind,
    template_slug: template.slug,
    version: template.version,
    status: template.status,
    snapshot: snap,
    previous_version: template.version > 1 ? template.version - 1 : null,
    created_by: actor,
    created_at: nowIso(),
    audit_metadata: { immutable: true },
  });
  workingCopies.set(key(template.kind, template.slug, template.version), snap);
  return snap;
}

export function getTemplateVersion(kind, slug, version) {
  const k = key(kind, slug, version);
  if (workingCopies.has(k)) return structuredClone(workingCopies.get(k));
  const hist = versionHistory.find(
    (h) => h.template_kind === kind && h.template_slug === slug && h.version === version
  );
  return hist ? structuredClone(hist.snapshot) : null;
}

export function listTemplateVersions(kind, slug) {
  return versionHistory
    .filter((h) => h.template_kind === kind && h.template_slug === slug)
    .sort((a, b) => a.version - b.version)
    .map((h) => ({
      version: h.version,
      status: h.status,
      created_at: h.created_at,
      created_by: h.created_by,
    }));
}

export function transitionTemplateStatus(template, nextStatus, { actor = "system", reason = "" } = {}) {
  assertBaseFields(template, template.kind);
  const allowed = getAllowedTransitions(template.status);
  if (!allowed.includes(nextStatus)) {
    throw new Error(
      `Invalid status transition ${template.status} → ${nextStatus} for ${template.slug}`
    );
  }
  if (!TEMPLATE_STATUSES.includes(nextStatus)) {
    throw new Error(`Unknown status ${nextStatus}`);
  }
  // Active cannot be edited in place for content — status transition is allowed,
  // but payload mutation must go through createNewVersion.
  const updated = {
    ...structuredClone(template),
    status: nextStatus,
    updated_at: nowIso(),
    audit_metadata: {
      ...(template.audit_metadata || {}),
      last_transition: { from: template.status, to: nextStatus, actor, reason, at: nowIso() },
    },
  };
  workingCopies.set(key(updated.kind, updated.slug, updated.version), updated);
  versionHistory.push({
    id: `tv_trans_${updated.slug}_v${updated.version}_${Date.now().toString(36)}`,
    template_kind: updated.kind,
    template_slug: updated.slug,
    version: updated.version,
    status: updated.status,
    snapshot: structuredClone(updated),
    previous_version: updated.version,
    created_by: actor,
    created_at: nowIso(),
    audit_metadata: { transition: true, reason },
  });
  recordTemplateAudit({
    action: "template.status_transition",
    actor,
    template_kind: updated.kind,
    template_slug: updated.slug,
    version: updated.version,
    from: template.status,
    to: nextStatus,
    reason,
  });
  return updated;
}

/**
 * Create a new immutable version from an existing template.
 * Active templates must not be mutated in place.
 */
export function createNewVersion(template, patch = {}, { actor = "system" } = {}) {
  assertBaseFields(template, template.kind);
  if (template.status === "active") {
    // Clone to draft new version; leave prior active until transition.
  }
  const nextVersion = Number(template.version) + 1;
  const next = {
    ...structuredClone(template),
    ...patch,
    id: `${template.id.replace(/_v\d+$/, "")}_v${nextVersion}`,
    version: nextVersion,
    status: "draft",
    updated_at: nowIso(),
    created_at: nowIso(),
    audit_metadata: {
      ...(template.audit_metadata || {}),
      derived_from_version: template.version,
      created_by: actor,
    },
  };
  // Preserve slug/kind
  next.slug = template.slug;
  next.kind = template.kind;
  assertBaseFields(next, next.kind);
  return registerTemplateVersion(next, { actor });
}

export function assertNotMutatingActive(template) {
  if (template?.status === "active") {
    throw new Error(
      `Active template ${template.slug}@v${template.version} cannot be edited in place; create a new version`
    );
  }
}
