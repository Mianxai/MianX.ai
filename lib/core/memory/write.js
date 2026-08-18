// Memory write policy + candidate construction (no secrets, no unverified facts).

import { validationError, forbidden } from "../errors";
import { clip } from "../validate";
import { assertKnowledgeAccess } from "./scope";

export const MEMORY_TYPES = [
  "fact",
  "decision",
  "constraint",
  "preference",
  "procedure",
  "lesson",
  "failure_pattern",
  "success_pattern",
  "artifact_reference",
  "open_question",
];

export const MEMORY_VERIFICATION = [
  "candidate",
  "validated",
  "active",
  "superseded",
  "rejected",
  "expired",
];

export const MEMORY_SCOPE_TYPES = [
  "organization",
  "project",
  "department",
  "workflow",
  "agent_instance",
  "task",
  "run",
];

const SECRET_PATTERNS = [
  /service[_-]?role/i,
  /api[_-]?key/i,
  /password/i,
  /bearer\s+[a-z0-9._-]+/i,
  /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/i,
  /supabase.*key/i,
];

export function containsSecretLikeContent(text) {
  const s = String(text || "");
  return SECRET_PATTERNS.some((re) => re.test(s));
}

/**
 * Build a memory candidate. Never auto-activates.
 */
export function buildMemoryCandidate(raw = {}) {
  const scopeType = String(raw.scope_type || "project").toLowerCase();
  const memoryType = String(raw.memory_type || raw.type || "fact").toLowerCase();
  const content = clip(raw.content || "", 4000);

  if (!MEMORY_SCOPE_TYPES.includes(scopeType)) {
    throw validationError("Invalid memory scope_type.", {
      scope_type: `Must be one of: ${MEMORY_SCOPE_TYPES.join(", ")}`,
    });
  }
  if (!MEMORY_TYPES.includes(memoryType)) {
    throw validationError("Invalid memory type.", {
      memory_type: `Must be one of: ${MEMORY_TYPES.join(", ")}`,
    });
  }
  if (!content) {
    throw validationError("Memory content required.", { content: "required" });
  }
  if (containsSecretLikeContent(content) || containsSecretLikeContent(JSON.stringify(raw.structured || {}))) {
    throw forbidden("Memory content appears to contain secrets and was rejected.");
  }

  if (scopeType !== "organization" && !raw.project_id) {
    throw validationError("Project-scoped memory requires project_id.", {
      project_id: "required",
    });
  }

  // Isolation gate for project memory.
  if (scopeType === "project" || scopeType === "workflow" || scopeType === "task") {
    assertKnowledgeAccess({
      requesterScope: "project",
      targetScope: "project",
      projectId: raw.project_id,
      targetProjectId: raw.project_id,
      orgId: raw.organization_id || null,
    });
  }

  const confidence = Number(raw.confidence);
  return {
    organization_id: raw.organization_id || null,
    project_id: scopeType === "organization" ? null : raw.project_id || null,
    scope_type: scopeType,
    scope_id: raw.scope_id ? clip(String(raw.scope_id), 120) : null,
    memory_type: memoryType,
    content,
    structured:
      raw.structured && typeof raw.structured === "object" ? raw.structured : {},
    source_references: Array.isArray(raw.source_references)
      ? raw.source_references.slice(0, 20)
      : [],
    evidence: Array.isArray(raw.evidence) ? raw.evidence.slice(0, 20) : [],
    confidence:
      Number.isFinite(confidence) && confidence >= 0 && confidence <= 1
        ? confidence
        : 0.5,
    created_by: clip(raw.created_by || "system", 120),
    verification_status: "candidate",
    sensitivity: ["normal", "sensitive", "restricted"].includes(raw.sensitivity)
      ? raw.sensitivity
      : "normal",
    retention_policy: clip(raw.retention_policy || "standard", 40),
    version: 1,
  };
}

/**
 * Promotion rules: sensitive/high-impact need human; others may validate via QA actor.
 */
export function canPromoteMemory(entry, { actorType = "system", highImpact = false } = {}) {
  if (!entry) return false;
  // Candidate → validate, or validated → activate, both require authorized actors.
  if (!["candidate", "validated"].includes(entry.verification_status)) return false;
  if (entry.sensitivity === "restricted" || entry.sensitivity === "sensitive" || highImpact) {
    return actorType === "admin" || actorType === "founder";
  }
  return actorType === "admin" || actorType === "founder" || actorType === "qa";
}

export function nextMemoryStatus(current, decision) {
  const map = {
    validate: "validated",
    activate: "active",
    reject: "rejected",
    supersede: "superseded",
    expire: "expired",
  };
  if (!MEMORY_VERIFICATION.includes(current)) {
    throw validationError("Unknown current memory status.");
  }
  const next = map[decision];
  if (!next) throw validationError("Unknown memory decision.");
  return next;
}
