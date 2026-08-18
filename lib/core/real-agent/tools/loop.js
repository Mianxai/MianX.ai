/**
 * In-memory / injectable tool executors for Phase I.1.
 * Protected tools never execute — they escalate to Founder approval.
 */

import { getToolDefinition, isProtectedTool, TOOL_RISK } from "./registry";
import { forbidden, validationError } from "../../errors";
import { searchKnowledgeIndex, readKnowledgeDocument } from "../knowledge";
import { assertCannotSelfApprove } from "../../workforce-completion/hierarchy";
import { createDelegatedChildTask } from "../delegation";

const MAX_TOOL_ROUNDS = 6;
const callFingerprints = new Map();

function fingerprint(name, args) {
  return `${name}:${JSON.stringify(args || {})}`;
}

export function resetToolCallDedup(scopeKey = "default") {
  callFingerprints.delete(scopeKey);
}

/**
 * Execute one tool call with permission + project scope checks.
 */
export async function executeToolCall({
  name,
  args = {},
  context = {},
  allowedTools = null,
  scopeKey = "default",
} = {}) {
  const def = getToolDefinition(name);
  if (!def) {
    throw validationError("Unknown tool.", { tool: `Unknown tool "${name}".` });
  }
  if (allowedTools && !allowedTools.includes(name) && def.risk !== TOOL_RISK.PROTECTED) {
    throw forbidden(`Tool "${name}" is not permitted for this agent.`);
  }
  if (!context.projectId) {
    throw validationError("Tool requires project scope.", {
      project_id: "project_id is required.",
    });
  }

  if (isProtectedTool(name) || def.requiresFounderApproval) {
    return {
      ok: false,
      status: "founder_approval_required",
      protected: true,
      tool: name,
      approvalRequest: {
        capability: name,
        projectId: context.projectId,
        organizationId: context.organizationId || null,
        rationale: args.rationale || "Protected tool proposed by agent.",
        autoExecuted: false,
      },
      result: null,
    };
  }

  const fp = fingerprint(name, args);
  const seen = callFingerprints.get(scopeKey) || new Set();
  if (seen.has(fp)) {
    return {
      ok: false,
      status: "duplicate_tool_call",
      tool: name,
      result: { note: "Duplicate tool call suppressed." },
    };
  }
  seen.add(fp);
  callFingerprints.set(scopeKey, seen);

  // Required schema fields
  for (const req of def.inputSchema?.required || []) {
    if (args[req] === undefined || args[req] === null || args[req] === "") {
      throw validationError("Tool input invalid.", {
        [req]: "This field is required.",
      });
    }
  }

  const result = await dispatchTool(name, args, context);
  return {
    ok: true,
    status: "succeeded",
    tool: name,
    risk: def.risk,
    result: sanitizeResult(result),
  };
}

function sanitizeResult(result) {
  if (result == null) return null;
  const json = JSON.stringify(result);
  if (json.length > 16000) {
    return { truncated: true, preview: json.slice(0, 4000) };
  }
  // Strip accidental secret-like keys
  if (typeof result === "object" && !Array.isArray(result)) {
    const copy = { ...result };
    for (const k of Object.keys(copy)) {
      if (/secret|api[_-]?key|token|password/i.test(k)) delete copy[k];
    }
    return copy;
  }
  return result;
}

async function dispatchTool(name, args, context) {
  switch (name) {
    case "knowledge.search":
      return searchKnowledgeIndex({
        query: args.query,
        limit: args.limit || 5,
        projectId: context.projectId,
      });
    case "knowledge.read":
      return readKnowledgeDocument({ path: args.path, projectId: context.projectId });
    case "memory.search": {
      try {
        const { retrieveMemoryForTask } = await import("../../memory/store");
        const hits = await retrieveMemoryForTask({
          projectId: context.projectId,
          organizationId: context.organizationId || null,
          agentSlug: context.agentSlug,
          maxItems: args.limit || 5,
        });
        return {
          hits: hits || [],
          projectId: context.projectId,
          verifiedOnly: true,
          query: String(args.query || "").slice(0, 200),
        };
      } catch {
        return {
          hits: [],
          projectId: context.projectId,
          verifiedOnly: true,
          note: "Memory search scoped to project; empty when no verified entries.",
          query: String(args.query || "").slice(0, 200),
        };
      }
    }
    case "memory.propose": {
      const content = String(args.content || "").slice(0, 4000);
      let candidate = {
        status: "candidate",
        content,
        projectId: context.projectId,
        autoPromoted: false,
      };
      try {
        const { proposeMemory } = await import("../../memory");
        const row = await proposeMemory({
          organization_id: context.organizationId || null,
          project_id: context.projectId,
          content,
          memory_type: args.memoryType || "fact",
          created_by: context.agentSlug || "real-agent",
          evidence: args.evidence || [],
          confidence: 0.5,
        });
        candidate = {
          ...candidate,
          id: row?.id || null,
          status: row?.status || "candidate",
          autoPromoted: false,
          durable: Boolean(row?.id),
        };
      } catch {
        /* candidate-only when store unavailable */
      }
      return candidate;
    }
    case "project.read_context":
      return {
        projectId: context.projectId,
        organizationId: context.organizationId || null,
        objectiveId: context.objectiveId || null,
      };
    case "objective.read":
      return {
        objectiveId: args.objectiveId || context.objectiveId || null,
        title: context.objectiveTitle || null,
      };
    case "task.read":
      return { taskId: args.taskId, projectId: context.projectId };
    case "task.create_child": {
      // Child task under current scope — optional reassignment via childAgentSlug
      if (args.childAgentSlug) {
        return createDelegatedChildTask({
          parentSlug: context.agentSlug || "executive-ceo",
          childAgentSlug: args.childAgentSlug,
          title: args.title,
          acceptanceCriteria: args.acceptanceCriteria || null,
          projectId: context.projectId,
          organizationId: context.organizationId || null,
          parentTaskId: context.taskId || null,
          objectiveId: context.objectiveId || null,
          workflowId: context.workflowId || null,
          depth: context.delegationDepth || 0,
          chain: context.delegationChain || [],
          enqueue: false,
          deps: context.deps || {},
        });
      }
      return {
        created: true,
        title: args.title,
        parentTaskId: context.taskId || null,
        acceptanceCriteria: args.acceptanceCriteria || null,
        projectId: context.projectId,
        agentSlug: context.agentSlug || null,
        durable: false,
        note: "Local child-task stub; pass childAgentSlug for hierarchical durable delegation.",
      };
    }
    case "task.update_progress":
      return { updated: true, note: String(args.note).slice(0, 2000) };
    case "workflow.read":
      return { workflowId: args.workflowId || context.workflowId || null };
    case "workflow.propose_transition":
      return { proposed: true, toStage: args.toStage, applied: false };
    case "artifact.create":
      return {
        artifactId: `art_${Date.now()}`,
        title: args.title,
        bodyPreview: String(args.body).slice(0, 200),
      };
    case "artifact.read":
      return { artifactId: args.artifactId, found: false };
    case "evidence.record":
      return {
        evidenceId: `ev_${Date.now()}`,
        summary: String(args.summary).slice(0, 4000),
        projectId: context.projectId,
      };
    case "audit.record":
      return { recorded: true, action: args.action };
    case "agent.delegate": {
      return createDelegatedChildTask({
        parentSlug: context.agentSlug || "executive-ceo",
        childAgentSlug: args.childAgentSlug,
        title: args.title,
        acceptanceCriteria: args.acceptanceCriteria || null,
        evidenceRequirements: args.evidenceRequirements || ["structured_output"],
        projectId: context.projectId,
        organizationId: context.organizationId || null,
        parentTaskId: context.taskId || null,
        objectiveId: context.objectiveId || null,
        workflowId: context.workflowId || null,
        depth: context.delegationDepth || 0,
        chain: context.delegationChain || [context.agentSlug],
        enqueue: Boolean(args.enqueue),
        deps: context.deps || {},
      });
    }
    case "agent.request_review": {
      assertCannotSelfApprove({
        actorSlug: args.reviewerSlug,
        authorSlug: context.agentSlug,
      });
      return { reviewRequested: true, reviewerSlug: args.reviewerSlug };
    }
    case "analytics.record_metric":
      return { recorded: true, name: args.name, value: args.value };
    case "workspace.list_files":
      return { sandbox: true, files: [], prefix: args.prefix || "" };
    case "workspace.read_file":
      return {
        sandbox: true,
        path: args.path,
        content: null,
        note: "Sandbox read — no production filesystem access.",
      };
    case "workspace.search_code":
      return { sandbox: true, query: args.query, hits: [] };
    case "workspace.create_patch_candidate":
      return {
        sandbox: true,
        patchCandidate: true,
        summary: args.summary,
        pushed: false,
        deployed: false,
      };
    case "workspace.run_allowed_test":
      return {
        sandbox: true,
        suite: args.suite,
        status: "skipped_in_unit_harness",
      };
    default:
      throw validationError("Unhandled tool.", { tool: name });
  }
}

/**
 * Bounded tool loop driver (model proposes → execute → return results).
 */
export async function runToolLoop({
  toolCalls = [],
  context,
  allowedTools = null,
  maxRounds = MAX_TOOL_ROUNDS,
  onAudit = null,
} = {}) {
  const results = [];
  const approvals = [];
  const scopeKey = `${context.projectId}:${context.taskId || "t"}:${context.correlationId || "c"}`;
  resetToolCallDedup(scopeKey);

  const calls = Array.isArray(toolCalls) ? toolCalls.slice(0, maxRounds) : [];
  for (const call of calls) {
    const name = call.function?.name || call.name;
    let args = call.function?.arguments || call.arguments || {};
    if (typeof args === "string") {
      try {
        args = JSON.parse(args);
      } catch {
        args = {};
      }
    }
    const executed = await executeToolCall({
      name,
      args,
      context,
      allowedTools,
      scopeKey,
    });
    if (onAudit) {
      await onAudit({
        type: "tool_call",
        tool: name,
        status: executed.status,
        protected: Boolean(executed.protected),
      });
    }
    if (executed.approvalRequest) approvals.push(executed.approvalRequest);
    results.push(executed);
  }

  return { results, approvals, rounds: calls.length };
}

export { MAX_TOOL_ROUNDS };
