// Runtime orchestration: the executable vertical slice.
//
//   validate task -> (approval gate if required) -> create run ->
//   call provider only when configured -> persist result/status -> audit.
//
// All persistence goes through repo.js; the only network side effect is the
// provider call, which is pre-checked so a missing key returns a controlled
// 503 without creating a run or corrupting task state.

import * as repo from "./repo";
import { getAgentDefinition, isAgentExecutable, validateAgentInput } from "./agents";
import { requiresApproval } from "./approvals";
import { isProviderConfigured } from "./config";
import { runAgentPrompt } from "./provider";
import { assertTaskTransition } from "./tasks";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "./audit";
import { validationError, badRequest, notConfigured, ERROR_CODES } from "./errors";
import { getSupabaseAdmin } from "@/lib/supabase";

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

// Registers a registry agent definition into a project as an active instance.
// Idempotent: the definition upserts on (slug, version); a fresh instance is
// created for the project. Draft definitions are catalog-only and are refused
// here so a non-executable agent can never reach a run.
export async function registerAgent({ projectId, slug, displayName, actor }) {
  const def = getAgentDefinition(slug);
  if (!def) {
    throw validationError("Unknown agent.", { slug: `No agent registered for "${slug}".` });
  }
  if (!isAgentExecutable(def)) {
    throw validationError("This agent cannot be registered.", {
      slug:
        `Agent "${slug}" is a draft definition and is disabled by default ` +
        `(lifecycle status: ${def.lifecycleStatus}). Only active agents can be registered.`,
    });
  }
  await repo.getProject(projectId); // scope + existence check

  const { toAgentDefinitionRow } = await import("./agents");
  const defRow = await repo.upsertAgentDefinition(toAgentDefinitionRow(def));

  const instance = await repo.createAgentInstance({
    project_id: projectId,
    agent_definition_id: defRow.id,
    display_name: displayName || def.name,
    status: "active",
  });

  await audit({
    projectId,
    actor,
    action: AUDIT_ACTIONS.AGENT_REGISTERED,
    resourceType: "agent_instance",
    resourceId: instance.id,
    metadata: { slug, agent_definition_id: defRow.id },
  });

  return instance;
}

// Resolves the agent instance + registry definition for a task run.
async function resolveAgent({ task, agentInstanceId }) {
  let instance;
  if (agentInstanceId) {
    instance = await repo.getAgentInstance(agentInstanceId, task.project_id);
  } else {
    const assignment = await repo.findAssignment(task.id);
    if (!assignment) {
      throw badRequest(
        "This task has no assigned agent. Provide agent_instance_id to run it."
      );
    }
    instance = await repo.getAgentInstance(assignment.agent_instance_id, task.project_id);
  }
  if (instance.status !== "active") {
    throw badRequest(`Agent instance is ${instance.status}, not active.`);
  }
  const defRow = instance.agent_definitions;
  const registry = getAgentDefinition(defRow?.slug);
  if (!registry) {
    throw badRequest("The agent definition is not available in the registry.");
  }
  return { instance, defRow, registry };
}

// Executes (or gates) a task run. Returns one of:
//   { approvalRequired: true, task, approval }
//   { run, task }                              (completed or failed persisted)
export async function executeTaskRun({ taskId, agentInstanceId, idempotencyKey, actor }) {
  const task = await repo.getTask(taskId);
  if (task.archived_at) throw badRequest("Task is archived.");
  if (["completed", "cancelled"].includes(task.status)) {
    throw badRequest(`Task is ${task.status} and cannot be run again.`);
  }

  // Idempotent run replay.
  if (idempotencyKey) {
    const existing = await repo.findRunByIdempotency(taskId, idempotencyKey);
    if (existing) return { run: existing, task, replayed: true };
  }

  const { instance, defRow, registry } = await resolveAgent({ task, agentInstanceId });

  // Ensure a persisted assignment exists.
  if (agentInstanceId) {
    const existing = await repo.findAssignment(task.id);
    if (!existing) {
      await repo.createAssignment({ task_id: task.id, agent_instance_id: instance.id });
    }
  }

  // Validate the agent input (task.input) against the registry schema.
  const { valid, errors } = validateAgentInput(registry, task.input);
  if (!valid) throw validationError("Task input failed agent validation.", errors);

  // Step 1: validate the task (pending -> validated).
  let current = task;
  if (current.status === "pending") {
    assertTaskTransition(current.status, "validated");
    current = await repo.updateTask(current.id, { status: "validated" });
    await audit({
      projectId: current.project_id,
      actor,
      action: AUDIT_ACTIONS.TASK_VALIDATED,
      resourceType: "task",
      resourceId: current.id,
    });
  }

  // Step 2: approval gate.
  const needsApproval = requiresApproval({
    task: current,
    agentDefinition: defRow,
    requestedCapabilities: registry.allowedCapabilities,
  });
  if (needsApproval) {
    const approved = await repo.findApprovedApprovalForTask(current.id);
    if (!approved) {
      if (current.status === "validated") {
        assertTaskTransition(current.status, "awaiting_approval");
        current = await repo.updateTask(current.id, { status: "awaiting_approval" });
      }
      let approval = await repo.findPendingApprovalForTask(current.id);
      if (!approval) {
        approval = await repo.createApproval({
          project_id: current.project_id,
          task_id: current.id,
          requested_capability: "run_task",
          reason: "Task requires human approval before execution.",
          status: "pending",
        });
        await audit({
          projectId: current.project_id,
          actor,
          action: AUDIT_ACTIONS.APPROVAL_REQUESTED,
          resourceType: "approval_request",
          resourceId: approval.id,
        });
      }
      return { approvalRequired: true, task: current, approval };
    }
  }

  // Step 3: provider precheck — controlled 503, no run created, state preserved.
  if (registry.defaultProvider === "anthropic" && !isProviderConfigured("anthropic")) {
    throw notConfigured(
      "AI analysis is not available: ANTHROPIC_API_KEY is not configured on this deployment.",
      ERROR_CODES.PROVIDER_UNAVAILABLE
    );
  }

  // Step 4: create the run.
  let run = await repo.createRun({
    project_id: current.project_id,
    task_id: current.id,
    agent_instance_id: instance.id,
    status: "created",
    provider: registry.defaultProvider,
    model: registry.defaultModel,
    input: task.input,
    idempotency_key: idempotencyKey || null,
  });
  await audit({
    projectId: current.project_id,
    actor,
    action: AUDIT_ACTIONS.RUN_CREATED,
    resourceType: "agent_run",
    resourceId: run.id,
  });

  // Step 5: start the run and move the task to running.
  run = await repo.updateRun(run.id, {
    status: "running",
    started_at: new Date().toISOString(),
  });
  if (current.status !== "running") {
    assertTaskTransition(current.status, "running");
    current = await repo.updateTask(current.id, { status: "running" });
  }
  await audit({
    projectId: current.project_id,
    actor,
    action: AUDIT_ACTIONS.RUN_STARTED,
    resourceType: "agent_run",
    resourceId: run.id,
  });

  // Step 6: call the provider and persist the outcome.
  try {
    const { output, provider, model } = await runAgentPrompt({
      slug: registry.slug,
      model: registry.defaultModel,
      input: task.input,
    });
    run = await repo.updateRun(run.id, {
      status: "succeeded",
      output,
      provider,
      model,
      finished_at: new Date().toISOString(),
    });
    current = await repo.updateTask(current.id, { status: "completed" });
    await audit({
      projectId: current.project_id,
      actor,
      action: AUDIT_ACTIONS.RUN_SUCCEEDED,
      resourceType: "agent_run",
      resourceId: run.id,
    });
    return { run, task: current };
  } catch (err) {
    run = await repo.updateRun(run.id, {
      status: "failed",
      error: { code: err.code || "PROVIDER_ERROR", message: err.message },
      finished_at: new Date().toISOString(),
    });
    current = await repo.updateTask(current.id, { status: "failed" });
    await audit({
      projectId: current.project_id,
      actor,
      action: AUDIT_ACTIONS.RUN_FAILED,
      resourceType: "agent_run",
      resourceId: run.id,
      metadata: { code: err.code || "PROVIDER_ERROR" },
    });
    throw err;
  }
}

// Records an approval decision and transitions the linked approval.
export async function decideApproval({ approvalId, decision, decidedBy, note, actorType = "admin" }) {
  const { validateApprovalDecision, assertApprovalTransition } = await import("./approvals");
  const approval = await repo.getApproval(approvalId);
  validateApprovalDecision({
    decision,
    decidedBy,
    actorType,
    capability: approval.requested_capability,
  });
  assertApprovalTransition(approval.status, decision);

  const updated = await repo.updateApproval(approvalId, {
    status: decision,
    decided_by: decidedBy,
    decided_at: new Date().toISOString(),
    decision_note: note || null,
  });

  // A rejection cancels the task; an approval completes it (protected side
  // effects such as send_email remain human-executed outside the platform).
  if (approval.task_id) {
    const task = await repo.getTask(approval.task_id);
    if (task.status === "awaiting_approval") {
      if (decision === "rejected") {
        await repo.updateTask(task.id, { status: "cancelled" });
      } else if (decision === "approved") {
        await repo.updateTask(task.id, { status: "completed" });
      }
    }
  }

  await audit({
    projectId: approval.project_id,
    actor: decidedBy,
    actorType,
    action: AUDIT_ACTIONS.APPROVAL_DECIDED,
    resourceType: "approval_request",
    resourceId: approvalId,
    metadata: { decision },
  });

  return updated;
}
