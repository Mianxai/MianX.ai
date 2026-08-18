/**
 * Human-readable audit event labels and filter helpers for Admin Audit.
 * Raw event_type values remain available under Technical Details.
 */

export const AUDIT_FILTERS = Object.freeze([
  "All",
  "Founder Proof",
  "Runtime",
  "Scheduler",
  "Security",
  "System",
]);

/** @type {Readonly<Record<string, string>>} */
export const AUDIT_EVENT_LABELS = Object.freeze({
  "scheduler.status_snapshot": "Scheduler status recorded",
  "integration.run.snapshot": "Founder Proof state recorded",
  "integration_run.snapshot": "Founder Proof state recorded",
  "integration.stage.plan_generated": "Deterministic plan generated",
  "integration.stage.founder_approval_required": "Founder plan approval requested",
  founder_approval_required: "Founder plan approval requested",
  "integration.stage.cancelled": "Duplicate proof run cancelled",
  cancelled: "Duplicate proof run cancelled",
});

/**
 * @param {string|null|undefined} eventType
 * @returns {string}
 */
export function humanAuditEventLabel(eventType) {
  const raw = String(eventType || "").trim();
  if (!raw) return "Audit event";
  if (AUDIT_EVENT_LABELS[raw]) return AUDIT_EVENT_LABELS[raw];

  // Stage transitions: integration.stage.<stage>
  const stageMatch = /^integration\.stage\.(.+)$/i.exec(raw);
  if (stageMatch) {
    const stage = stageMatch[1];
    if (AUDIT_EVENT_LABELS[stage]) return AUDIT_EVENT_LABELS[stage];
    if (AUDIT_EVENT_LABELS[`integration.stage.${stage}`]) {
      return AUDIT_EVENT_LABELS[`integration.stage.${stage}`];
    }
    return `Founder Proof stage: ${humanizeToken(stage)}`;
  }

  // approval.pending / approval.approved …
  if (/^approval\./i.test(raw)) {
    const status = raw.slice("approval.".length);
    return `Approval ${humanizeToken(status)}`;
  }

  if (/^memory\./i.test(raw)) {
    return `Memory ${humanizeToken(raw.slice("memory.".length))}`;
  }
  if (/^learning\./i.test(raw)) {
    return `Learning ${humanizeToken(raw.slice("learning.".length))}`;
  }

  return humanizeToken(raw);
}

/**
 * @param {string} value
 * @returns {string}
 */
export function humanizeToken(value) {
  return String(value || "")
    .replace(/[._]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Unknown";
}

/**
 * Classify an audit event into a Founder-facing filter bucket.
 * @param {object} event
 * @returns {"Founder Proof"|"Runtime"|"Scheduler"|"Security"|"System"}
 */
export function classifyAuditEvent(event) {
  if (!event || typeof event !== "object") return "System";
  const source = String(event.source || "").toLowerCase();
  const type = String(event.event_type || event.action || event.type || "").toLowerCase();
  const outcome = String(event.outcome || event.status || "").toLowerCase();

  if (event.protected_action === true || /security|auth|membership|forbidden/i.test(type + source)) {
    return "Security";
  }
  if (
    source === "scheduler" ||
    type.startsWith("scheduler.") ||
    type.includes("scheduler")
  ) {
    return "Scheduler";
  }
  if (
    source === "integration" ||
    type.startsWith("integration.") ||
    type.startsWith("integration_") ||
    /founder.?proof|plan_generated|founder_approval/i.test(type)
  ) {
    return "Founder Proof";
  }
  if (
    source === "project_runtime_audit" ||
    source === "approvals" ||
    source === "runtime" ||
    /^(task|job|agent|run|approval)\b/i.test(type)
  ) {
    return "Runtime";
  }
  if (source === "memory" || source === "learning" || source === "system") {
    return "System";
  }
  if (outcome === "automatic" || outcome === "manual_or_external") {
    return "Scheduler";
  }
  return "System";
}

/**
 * @param {object[]} events
 * @param {string} filter - one of AUDIT_FILTERS
 * @returns {object[]}
 */
export function filterAuditEvents(events, filter) {
  const list = Array.isArray(events) ? events : [];
  if (!filter || filter === "All") return list;
  return list.filter((e) => classifyAuditEvent(e) === filter);
}

/**
 * Badge fields for an audit row (never secrets).
 * @param {object} event
 * @returns {{ source: string, actor: string, outcome: string|null, canonical: string|null }}
 */
export function auditEventBadges(event) {
  const source = String(event?.source || event?.resource_type || "runtime");
  const actor = String(event?.actor || event?.actor_id || "system");
  const outcome = event?.outcome ?? event?.status ?? event?.result ?? null;
  const technical = event?.technical || {};
  let canonical = null;
  if (event?.canonical === true || technical?.canonical === true) {
    canonical = "canonical";
  } else if (
    String(event?.outcome || "").toLowerCase() === "cancelled" ||
    String(technical?.status || "").toLowerCase() === "cancelled" ||
    /cancelled/i.test(String(event?.event_type || ""))
  ) {
    canonical = "cancelled";
  } else if (technical?.proof?.canonical === true) {
    canonical = "canonical";
  }
  return {
    source: humanizeToken(source),
    actor: actor === "system" ? "System" : String(actor).slice(0, 48),
    outcome: outcome != null ? humanizeToken(String(outcome)) : null,
    canonical,
  };
}
