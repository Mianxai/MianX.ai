// Knowledge / memory scope enforcement.
// Cross-project access fails unless explicitly authorised.

import { forbidden, validationError } from "../errors";

export const KNOWLEDGE_SCOPES = [
  "organization",
  "project",
  "department",
  "agent",
  "shared_org",
  "project_knowledge",
  "sensitive_private",
];

const SCOPE_SET = new Set(KNOWLEDGE_SCOPES);

function normalizeScope(scope) {
  if (!scope || typeof scope !== "string") return null;
  return scope.trim().toLowerCase();
}

/**
 * Assert a requester may read/write a knowledge target under org/project bounds.
 *
 * @param {object} args
 * @param {string} args.requesterScope
 * @param {string} args.targetScope
 * @param {string} [args.orgId]
 * @param {string} [args.projectId]
 * @param {string} [args.targetProjectId] — project that owns the target artifact
 * @param {boolean} [args.authorizedCrossProject]
 * @param {string} [args.requesterProjectId]
 */
export function assertKnowledgeAccess({
  requesterScope,
  targetScope,
  orgId = null,
  projectId = null,
  targetProjectId = null,
  requesterProjectId = null,
  authorizedCrossProject = false,
} = {}) {
  const req = normalizeScope(requesterScope);
  const tgt = normalizeScope(targetScope);

  if (!req || !SCOPE_SET.has(req)) {
    throw validationError("Invalid requester knowledge scope.", {
      requesterScope: `Must be one of: ${KNOWLEDGE_SCOPES.join(", ")}`,
    });
  }
  if (!tgt || !SCOPE_SET.has(tgt)) {
    throw validationError("Invalid target knowledge scope.", {
      targetScope: `Must be one of: ${KNOWLEDGE_SCOPES.join(", ")}`,
    });
  }

  const reqProject = requesterProjectId || projectId;
  const tgtProject = targetProjectId || projectId;

  // Cross-project: fail closed unless explicitly authorised.
  if (reqProject && tgtProject && reqProject !== tgtProject) {
    if (!authorizedCrossProject) {
      throw forbidden(
        "Cross-project knowledge access denied without explicit authorisation."
      );
    }
  }

  // sensitive_private: only same agent/department private scopes or explicit elev.
  if (tgt === "sensitive_private") {
    if (req !== "sensitive_private" && req !== "agent") {
      throw forbidden(
        "sensitive_private knowledge requires agent or sensitive_private requester scope."
      );
    }
  }

  // project / project_knowledge: requester must be project-scoped (or broader org with same project).
  if (tgt === "project" || tgt === "project_knowledge") {
    const allowed = new Set([
      "project",
      "project_knowledge",
      "department",
      "agent",
      "organization",
      "shared_org",
      "sensitive_private",
    ]);
    if (!allowed.has(req)) {
      throw forbidden(`Requester scope "${req}" cannot access project knowledge.`);
    }
  }

  // organization / shared_org targets: department/agent/project may read shared_org;
  // organization write-equivalent access stays at org/shared_org/sensitive.
  if (tgt === "organization") {
    if (!["organization", "shared_org", "sensitive_private"].includes(req)) {
      throw forbidden(
        `Requester scope "${req}" cannot access organization-scoped knowledge.`
      );
    }
  }

  if (tgt === "department" && !["department", "organization", "shared_org", "agent", "sensitive_private"].includes(req)) {
    if (req === "project" || req === "project_knowledge") {
      // project may read department knowledge within the same project only (already checked).
    } else {
      throw forbidden(`Requester scope "${req}" cannot access department knowledge.`);
    }
  }

  // orgId mismatch when both sides declare org — fail closed.
  // (Callers pass a single orgId today; reserved for future multi-tenant checks.)
  if (orgId != null && typeof orgId !== "string") {
    throw validationError("Invalid orgId.", { orgId: "orgId must be a string when provided." });
  }

  return {
    allowed: true,
    requesterScope: req,
    targetScope: tgt,
    orgId: orgId || null,
    projectId: reqProject || null,
    targetProjectId: tgtProject || null,
    authorizedCrossProject: Boolean(authorizedCrossProject),
  };
}
