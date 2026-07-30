/**
 * Durable hierarchical delegation helpers for real-agent tools.
 * Creates project-scoped child tasks + optional queue jobs when repo is available.
 * Never crosses projects. Never self-approves. Bounded depth.
 */

import { assertDelegation, MAX_DELEGATION_DEPTH } from "../workforce-completion/hierarchy";
import { validationError, forbidden } from "../errors";
import { getAgentDefinition, isAgentExecutable } from "../agents";

/**
 * Create a durable child task (and optional enqueue) for delegation.
 * deps are injectable for unit tests.
 */
export async function createDelegatedChildTask({
  parentSlug,
  childAgentSlug,
  title,
  acceptanceCriteria = null,
  evidenceRequirements = ["structured_output"],
  projectId,
  organizationId = null,
  parentTaskId = null,
  objectiveId = null,
  workflowId = null,
  depth = 0,
  chain = [],
  enqueue = false,
  deps = {},
} = {}) {
  if (!projectId) {
    throw validationError("Delegation requires project scope.", {
      project_id: "required",
    });
  }
  if (!childAgentSlug || !title) {
    throw validationError("Delegation requires childAgentSlug and title.", {
      childAgentSlug: !childAgentSlug ? "required" : undefined,
      title: !title ? "required" : undefined,
    });
  }

  assertDelegation(parentSlug, childAgentSlug, { depth, chain });

  const child = getAgentDefinition(childAgentSlug);
  if (!child || !isAgentExecutable(child)) {
    throw forbidden(`Cannot delegate to non-executable agent "${childAgentSlug}".`);
  }

  const createTask =
    deps.createTask ||
    (async (row) => {
      try {
        const repo = await import("../repo");
        return repo.createTask(row);
      } catch {
        return {
          row: {
            id: `local_task_${Date.now().toString(36)}`,
            ...row,
            durable: false,
          },
          created: true,
          durable: false,
        };
      }
    });

  const idempotencyKey = [
    "delegate",
    projectId,
    parentTaskId || "root",
    childAgentSlug,
    String(title).slice(0, 80),
  ]
    .join(":")
    .slice(0, 200);

  const taskRow = {
    project_id: projectId,
    title: String(title).slice(0, 200),
    description: `Delegated from ${parentSlug} → ${childAgentSlug}`,
    status: "pending",
    acceptance_criteria: acceptanceCriteria
      ? String(acceptanceCriteria).slice(0, 4000)
      : null,
    input: {
      delegated_from: parentSlug,
      child_agent_slug: childAgentSlug,
      parent_task_id: parentTaskId || null,
      objective_id: objectiveId || null,
      workflow: workflowId || null,
      organization_id: organizationId || null,
      evidence_requirements: evidenceRequirements,
      delegation_depth: depth + 1,
      max_delegation_depth: MAX_DELEGATION_DEPTH,
    },
    idempotency_key: idempotencyKey,
    created_by: parentSlug,
  };

  let created;
  try {
    created = await createTask(taskRow);
  } catch (err) {
    // Soft-fail to local stub when DB unavailable (CI without Supabase)
    created = {
      row: {
        id: `local_task_${Date.now().toString(36)}`,
        ...taskRow,
        durable: false,
      },
      created: true,
      durable: false,
      persistenceError: err?.message || "createTask failed",
    };
  }

  let job = null;
  if (enqueue && deps.enqueueJob) {
    job = await deps.enqueueJob({
      projectId,
      agentSlug: childAgentSlug,
      taskId: created.row?.id,
      input: {
        objective: title,
        acceptance_criteria: acceptanceCriteria,
        parent_task_id: parentTaskId,
      },
      provider: "openrouter",
      allowDraft: false,
    });
  }

  return {
    delegated: true,
    durable: created.durable !== false && !created.persistenceError,
    childAgentSlug,
    title,
    acceptanceCriteria,
    evidenceRequirements,
    projectId,
    parentTaskId,
    task: created.row,
    job: job?.job || job || null,
    created: created.created !== false,
    depth: depth + 1,
  };
}
