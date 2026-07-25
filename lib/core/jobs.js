// Asynchronous job queue domain logic: state machine, enqueue validation,
// cancel/retry rules, retry backoff and error sanitization.
//
// Persistence lives in repo.js; execution lives in worker.js. Everything here
// is pure or repo-delegating so it stays deterministic under test.

import {
  JOB_STATUSES,
  JOB_TRANSITIONS,
  TERMINAL_JOB_STATUSES,
  JOB_LIMITS,
  PROVIDERS,
  CORE_LIMITS,
} from "./constants";
import { clip, validateJsonInput } from "./validate";
import { validationError, invalidTransition, badRequest } from "./errors";
import { getAgentDefinition } from "./agents";
import * as repo from "./repo";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "./audit";
import { getSupabaseAdmin } from "@/lib/supabase";

export function canTransitionJob(from, to) {
  if (!JOB_STATUSES.includes(from) || !JOB_STATUSES.includes(to)) return false;
  return (JOB_TRANSITIONS[from] || []).includes(to);
}

export function assertJobTransition(from, to) {
  if (!canTransitionJob(from, to)) {
    throw invalidTransition(`Cannot move job from "${from}" to "${to}".`, {
      from,
      to,
      allowed: JOB_TRANSITIONS[from] || [],
    });
  }
  return to;
}

export function isTerminalJobStatus(status) {
  return TERMINAL_JOB_STATUSES.includes(status);
}

// Exponential backoff with bounded deterministic-friendly jitter.
// attempt is the attempt that just failed (1-based).
export function computeBackoffMs(attempt, { random = Math.random } = {}) {
  const exp = Math.max(0, (attempt || 1) - 1);
  const base = Math.min(
    JOB_LIMITS.backoffBaseMs * 2 ** exp,
    JOB_LIMITS.backoffCapMs
  );
  const jitter = Math.floor(random() * JOB_LIMITS.backoffJitterMs);
  return base + jitter;
}

// Sanitizes an arbitrary error into a small, secret-free JSONB payload. Only a
// stable code and a clipped human message survive — never stacks, headers,
// keys or raw provider bodies.
export function sanitizeJobError(err) {
  const code =
    typeof err?.code === "string" && err.code.length <= 60
      ? err.code
      : "INTERNAL_ERROR";
  const message = clip(
    typeof err?.message === "string" ? err.message : "Unexpected error.",
    500
  );
  const out = { code, message: message || "Unexpected error." };
  if (typeof err?.status === "number") out.status = err.status;
  return out;
}

// Whether a failure may be retried automatically (transient) or must fail
// permanently. Validation/auth/permanent 4xx never retry.
export function isTransientJobError(err) {
  if (err?.transient === true) return true;
  if (err?.transient === false) return false;
  const status = typeof err?.status === "number" ? err.status : null;
  if (status === 429) return true;
  if (status && status >= 500) return true;
  if (status && status >= 400) return false;
  const code = err?.code;
  if (
    code === "VALIDATION_FAILED" ||
    code === "INVALID_TRANSITION" ||
    code === "FORBIDDEN" ||
    code === "UNAUTHORIZED" ||
    code === "NOT_CONFIGURED" ||
    code === "OUTPUT_VALIDATION_FAILED"
  ) {
    return false;
  }
  // Unknown/network errors default to transient so a blip is retried.
  return true;
}

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

// Validates an enqueue payload into a safe runtime_jobs row. Explicit
// allowlist only — arbitrary keys never survive.
export function validateJobEnqueue(raw) {
  const errors = {};
  const body = raw && typeof raw === "object" ? raw : {};

  const agent_slug = clip(body.agent_slug, 100);
  const def = agent_slug ? getAgentDefinition(agent_slug) : null;
  if (!agent_slug) errors.agent_slug = "agent_slug is required.";
  else if (!def) errors.agent_slug = `No agent registered for "${agent_slug}".`;

  let priority = 0;
  if (body.priority !== undefined) {
    const p = Number(body.priority);
    if (!Number.isInteger(p) || p < -100 || p > 100) {
      errors.priority = "priority must be an integer between -100 and 100.";
    } else {
      priority = p;
    }
  }

  let max_attempts = JOB_LIMITS.defaultMaxAttempts;
  if (body.max_attempts !== undefined) {
    const m = Number(body.max_attempts);
    if (!Number.isInteger(m) || m < 1 || m > JOB_LIMITS.maxMaxAttempts) {
      errors.max_attempts = `max_attempts must be an integer between 1 and ${JOB_LIMITS.maxMaxAttempts}.`;
    } else {
      max_attempts = m;
    }
  }

  let input = {};
  try {
    input = validateJsonInput(body.input, "input");
  } catch (err) {
    errors.input = err.details?.input || "Invalid input object.";
  }

  const idempotency_key = clip(body.idempotency_key, CORE_LIMITS.idempotencyKey) || null;
  const workflow = clip(body.workflow, 100) || null;

  if (Object.keys(errors).length > 0) {
    throw validationError("Please fix the highlighted fields.", errors);
  }

  return {
    agent_slug,
    priority,
    max_attempts,
    input,
    idempotency_key,
    workflow,
    provider: def.defaultProvider,
    model: def.defaultModel,
  };
}

// Enqueues a job for a task. Idempotent via (project_id, idempotency_key).
export async function enqueueJob({
  projectId,
  organizationId = null,
  taskId = null,
  agentInstanceId = null,
  agentSlug,
  workflow = null,
  workflowStep = 0,
  priority = 0,
  maxAttempts = JOB_LIMITS.defaultMaxAttempts,
  input = {},
  idempotencyKey = null,
  provider,
  model,
  actor = "system",
  actorType = "system",
}) {
  const def = getAgentDefinition(agentSlug);
  if (!def) {
    throw validationError("Unknown agent.", {
      agent_slug: `No agent registered for "${agentSlug}".`,
    });
  }
  const useProvider = PROVIDERS.includes(provider) ? provider : def.defaultProvider;

  const { row, created } = await repo.createJob({
    organization_id: organizationId,
    project_id: projectId,
    task_id: taskId,
    agent_instance_id: agentInstanceId,
    agent_slug: agentSlug,
    workflow,
    workflow_step: workflowStep,
    status: "queued",
    priority,
    max_attempts: maxAttempts,
    input,
    idempotency_key: idempotencyKey,
    provider: useProvider,
    model: model || def.defaultModel,
  });

  if (created) {
    await audit({
      projectId,
      actor,
      actorType,
      action: AUDIT_ACTIONS.JOB_ENQUEUED,
      resourceType: "runtime_job",
      resourceId: row.id,
      metadata: { agent_slug: agentSlug, workflow, workflow_step: workflowStep },
    });
  }
  return { job: row, created };
}

// Requests cancellation. Queued jobs cancel immediately; leased/running jobs
// get cancel_requested_at stamped and the worker honors it at the next
// checkpoint. Terminal jobs reject.
export async function cancelJob({ jobId, projectId, actor }) {
  const job = await repo.getJob(jobId, projectId);
  if (isTerminalJobStatus(job.status) || job.status === "failed") {
    throw badRequest(`Job is ${job.status} and cannot be cancelled.`);
  }

  if (job.status === "queued") {
    const updated = await repo.updateJobIfStatus(job.id, ["queued"], {
      status: "cancelled",
      cancel_requested_at: new Date().toISOString(),
      finished_at: new Date().toISOString(),
      lease_owner: null,
      lease_expires_at: null,
    });
    if (!updated) {
      throw badRequest("Job state changed; refresh and try again.");
    }
    await audit({
      projectId: job.project_id,
      actor,
      action: AUDIT_ACTIONS.JOB_CANCELLED,
      resourceType: "runtime_job",
      resourceId: job.id,
      metadata: { phase: "queued" },
    });
    return updated;
  }

  // leased/running: cooperative cancellation.
  const updated = await repo.updateJobIfStatus(job.id, ["leased", "running"], {
    cancel_requested_at: new Date().toISOString(),
  });
  if (!updated) {
    throw badRequest("Job state changed; refresh and try again.");
  }
  await audit({
    projectId: job.project_id,
    actor,
    action: AUDIT_ACTIONS.JOB_CANCEL_REQUESTED,
    resourceType: "runtime_job",
    resourceId: job.id,
    metadata: { phase: job.status },
  });
  return updated;
}

// Human retry of a failed/dead_letter job: back to the queue with a fresh
// attempt budget. Only failed and dead_letter jobs may be retried.
export async function retryJob({ jobId, projectId, actor }) {
  const job = await repo.getJob(jobId, projectId);
  if (!["failed", "dead_letter"].includes(job.status)) {
    throw badRequest(`Only failed or dead-letter jobs can be retried (job is ${job.status}).`);
  }
  assertJobTransition(job.status, "queued");

  const updated = await repo.updateJobIfStatus(job.id, ["failed", "dead_letter"], {
    status: "queued",
    attempt: 0,
    available_at: new Date().toISOString(),
    lease_owner: null,
    lease_expires_at: null,
    heartbeat_at: null,
    cancel_requested_at: null,
    started_at: null,
    finished_at: null,
  });
  if (!updated) {
    throw badRequest("Job state changed; refresh and try again.");
  }
  await audit({
    projectId: job.project_id,
    actor,
    action: AUDIT_ACTIONS.JOB_RETRIED,
    resourceType: "runtime_job",
    resourceId: job.id,
    metadata: { previous_status: job.status, previous_error: job.error?.code || null },
  });
  return updated;
}
