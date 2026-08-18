// Bounded memory retrieval — project isolation by default.

import { assertKnowledgeAccess } from "./scope";
import { forbidden } from "../errors";

const ACTIVE_STATUSES = new Set(["validated", "active"]);

/**
 * Filter memory rows for a requester under policy + budget.
 */
export function selectMemoryContext({
  entries = [],
  requesterScope = "project",
  orgId = null,
  projectId = null,
  agentSlug = null,
  maxItems = 12,
  includeTypes = null,
} = {}) {
  const out = [];
  for (const entry of entries) {
    if (!entry || entry.archived_at) continue;
    if (!ACTIVE_STATUSES.has(entry.verification_status)) continue;
    if (entry.verification_status === "superseded" || entry.verification_status === "rejected") {
      continue;
    }
    if (Array.isArray(includeTypes) && includeTypes.length) {
      if (!includeTypes.includes(entry.memory_type)) continue;
    }

    try {
      assertKnowledgeAccess({
        requesterScope,
        targetScope:
          entry.scope_type === "organization" ? "organization" : "project",
        orgId,
        projectId,
        targetProjectId: entry.project_id || projectId,
        authorizedCrossProject: false,
      });
    } catch {
      continue;
    }

    // Cross-project hard deny even if scopes look broad.
    if (
      projectId &&
      entry.project_id &&
      entry.project_id !== projectId &&
      entry.scope_type !== "organization"
    ) {
      continue;
    }

    if (entry.sensitivity === "restricted" && requesterScope !== "sensitive_private") {
      continue;
    }

    out.push({
      memory_id: entry.id,
      scope_type: entry.scope_type,
      memory_type: entry.memory_type,
      content: entry.content,
      confidence: entry.confidence,
      verification_status: entry.verification_status,
      sensitivity: entry.sensitivity,
      source_references: entry.source_references || [],
      low_confidence: Number(entry.confidence) < 0.6,
      agent_slug: agentSlug || null,
    });
    if (out.length >= maxItems) break;
  }
  return out;
}

export function assertNoCrossProjectLeak(entries, projectId) {
  for (const e of entries || []) {
    if (e.project_id && projectId && e.project_id !== projectId && e.scope_type !== "organization") {
      throw forbidden("Cross-project memory leak detected in retrieval set.");
    }
  }
  return true;
}
