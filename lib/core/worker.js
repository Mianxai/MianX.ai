// Bounded asynchronous execution worker.
//
// One tick: recover expired leases → atomically claim a bounded batch →
// process each job inside a wall-clock budget. Every lifecycle transition is
// compare-and-set guarded (updateJobIfStatus) and audited. The provider is
// called only when configured; errors are sanitized before persistence.
//
// `providerImpl`, `now`, and `random` are injectable for deterministic tests.
// Production uses runAgentPrompt (Anthropic) and real clocks.

import * as repo from "./repo";
import { runAgentPrompt } from "./provider";
import { getAgentDefinition, validateAgentOutput } from "./agents";
import { isProviderConfigured } from "./config";
import {
  sanitizeJobError,
  isTransientJobError,
  computeBackoffMs,
} from "./jobs";
import { advanceWorkflow } from "./workflow";
import { canTransitionTask } from "./tasks";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "./audit";
import { JOB_LIMITS } from "./constants";
import { getSupabaseAdmin } from "@/lib/supabase";
import { ApiError, ERROR_CODES } from "./errors";

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

// Best-effort task status sync — a job must never fail because the linked
// task is in an unexpected state (e.g. manually edited).
async function syncTaskStatus(taskId, targetStatus) {
  if (!taskId) return;
  try {
    let task = await repo.getTask(taskId);
    if (task.status === targetStatus) return;
    if (targetStatus === "running") {
      if (task.status === "pending" && canTransitionTask("pending", "validated")) {
        task = await repo.updateTask(task.id, { status: "validated" });
      }
      if (canTransitionTask(task.status, "running")) {
        await repo.updateTask(task.id, { status: "running" });
      }
      return;
    }
    if (canTransitionTask(task.status, targetStatus)) {
      await repo.updateTask(task.id, { status: targetStatus });
    }
  } catch {
    // Task sync is advisory; the job record remains the source of truth.
  }
}

// Marks a claimed job cancelled (cancel requested before execution started).
async function finalizeCancelled(job, workerId) {
  const updated = await repo.updateJobIfStatus(job.id, ["leased", "running"], {
    status: "cancelled",
    finished_at: new Date().toISOString(),
    lease_owner: null,
    lease_expires_at: null,
  });
  if (updated) {
    await audit({
      projectId: job.project_id,
      actor: workerId,
      actorType: "system",
      action: AUDIT_ACTIONS.JOB_CANCELLED,
      resourceType: "runtime_job",
      resourceId: job.id,
      metadata: { phase: job.status },
    });
    await syncTaskStatus(job.task_id, "cancelled");
  }
  return updated;
}

// Releases a claimed-but-unprocessed job back to the queue without burning
// the attempt (used when the tick budget runs out).
async function releaseUnprocessed(job) {
  await repo.updateJobIfStatus(job.id, ["leased"], {
    status: "queued",
    attempt: Math.max(0, (job.attempt || 1) - 1),
    lease_owner: null,
    lease_expires_at: null,
    heartbeat_at: null,
  });
}

// Processes one claimed job to a terminal-or-requeued state. Returns a result
// tag for the tick summary.
export async function processJob(job, { workerId, providerImpl, random = Math.random }) {
  // 1. Cooperative cancellation before starting.
  if (job.cancel_requested_at) {
    await finalizeCancelled(job, workerId);
    return "cancelled";
  }

  const registry = getAgentDefinition(job.agent_slug);
  const nowIso = () => new Date().toISOString();

  // 2. Move leased → running and heartbeat.
  const running = await repo.updateJobIfStatus(job.id, ["leased"], {
    status: "running",
    started_at: job.started_at || nowIso(),
    heartbeat_at: nowIso(),
  });
  if (!running) return "lost_lease"; // another actor changed it — never double-run.

  await audit({
    projectId: job.project_id,
    actor: workerId,
    actorType: "system",
    action: AUDIT_ACTIONS.JOB_STARTED,
    resourceType: "runtime_job",
    resourceId: job.id,
    metadata: { attempt: running.attempt, agent_slug: job.agent_slug },
  });
  await syncTaskStatus(job.task_id, "running");

  // 3. Create the linked agent_run for history/API compatibility.
  let run = null;
  try {
    run = await repo.createRun({
      project_id: job.project_id,
      task_id: job.task_id,
      agent_instance_id: job.agent_instance_id || null,
      status: "running",
      provider: job.provider,
      model: job.model,
      input: job.input,
      started_at: nowIso(),
      idempotency_key: job.idempotency_key ? `job:${job.id}` : null,
    });
    if (run) {
      await repo.updateJob(job.id, { agent_run_id: run.id });
    }
  } catch {
    run = null; // run history is best-effort; the job row is authoritative.
  }

  const failWith = async (err) => {
    const sanitized = sanitizeJobError(err);
    const transient = isTransientJobError(err);
    const attempt = running.attempt || 1;
    const exhausted = attempt >= (job.max_attempts || JOB_LIMITS.defaultMaxAttempts);

    if (run) {
      try {
        await repo.updateRun(run.id, {
          status: "failed",
          error: sanitized,
          finished_at: nowIso(),
        });
      } catch {}
    }

    if (transient && !exhausted) {
      const delay = computeBackoffMs(attempt, { random });
      await repo.updateJobIfStatus(job.id, ["running"], {
        status: "queued",
        error: sanitized,
        available_at: new Date(Date.now() + delay).toISOString(),
        lease_owner: null,
        lease_expires_at: null,
        heartbeat_at: null,
      });
      await audit({
        projectId: job.project_id,
        actor: workerId,
        actorType: "system",
        action: AUDIT_ACTIONS.JOB_REQUEUED,
        resourceType: "runtime_job",
        resourceId: job.id,
        metadata: { attempt, backoff_ms: delay, code: sanitized.code },
      });
      return "requeued";
    }

    const finalStatus = transient && exhausted ? "dead_letter" : "failed";
    await repo.updateJobIfStatus(job.id, ["running"], {
      status: finalStatus,
      error: sanitized,
      finished_at: nowIso(),
      lease_owner: null,
      lease_expires_at: null,
    });
    await audit({
      projectId: job.project_id,
      actor: workerId,
      actorType: "system",
      action:
        finalStatus === "dead_letter"
          ? AUDIT_ACTIONS.JOB_DEAD_LETTERED
          : AUDIT_ACTIONS.JOB_FAILED,
      resourceType: "runtime_job",
      resourceId: job.id,
      metadata: { attempt, code: sanitized.code },
    });
    await syncTaskStatus(job.task_id, "failed");
    return finalStatus;
  };

  // 4. Provider precheck — unconfigured provider is a controlled permanent
  // failure, never a crash and never a real network call.
  if (job.provider === "anthropic" && !isProviderConfigured("anthropic")) {
    const err = new ApiError(
      503,
      ERROR_CODES.NOT_CONFIGURED,
      "AI provider is not configured on this deployment (ANTHROPIC_API_KEY missing)."
    );
    err.transient = false;
    return failWith(err);
  }

  // 5. Execute the provider call (heartbeat while the call is in flight).
  let result;
  const heartbeatEveryMs = Math.min((JOB_LIMITS.leaseSeconds * 1000) / 3, 15_000);
  const heartbeatTimer = setInterval(() => {
    repo
      .updateJobIfStatus(job.id, ["running"], {
        heartbeat_at: nowIso(),
        lease_expires_at: new Date(
          Date.now() + JOB_LIMITS.leaseSeconds * 1000
        ).toISOString(),
      })
      .catch(() => {});
  }, heartbeatEveryMs);
  try {
    const impl = providerImpl || runAgentPrompt;
    result = await impl({
      slug: job.agent_slug,
      model: job.model,
      input: job.input,
    });
  } catch (err) {
    return failWith(err);
  } finally {
    clearInterval(heartbeatTimer);
  }

  // 6. Validate structured output before persisting success.
  if (registry) {
    const { valid, errors } = validateAgentOutput(registry, result.output);
    if (!valid) {
      const err = new ApiError(
        502,
        "OUTPUT_VALIDATION_FAILED",
        `Agent output failed schema validation: ${Object.keys(errors).join(", ")}.`
      );
      err.transient = false;
      return failWith(err);
    }
  }

  // 7. Cooperative cancellation during execution: if a cancel arrived while
  // the provider was running, honor it and do not advance the workflow.
  try {
    const fresh = await repo.getJob(job.id);
    if (fresh.cancel_requested_at) {
      await finalizeCancelled({ ...fresh, status: "running" }, workerId);
      return "cancelled";
    }
  } catch {}

  // 8. Persist success (+ usage metrics).
  const succeeded = await repo.updateJobIfStatus(job.id, ["running"], {
    status: "succeeded",
    output: result.output,
    finished_at: nowIso(),
    lease_owner: null,
    lease_expires_at: null,
    input_tokens: result.usage?.input_tokens ?? null,
    output_tokens: result.usage?.output_tokens ?? null,
    estimated_cost: result.estimatedCost ?? null,
    latency_ms: typeof result.latencyMs === "number" ? result.latencyMs : null,
  });
  if (!succeeded) return "lost_lease";

  if (run) {
    try {
      await repo.updateRun(run.id, {
        status: "succeeded",
        output: result.output,
        provider: result.provider || job.provider,
        model: result.model || job.model,
        finished_at: nowIso(),
      });
    } catch {}
  }

  await audit({
    projectId: job.project_id,
    actor: workerId,
    actorType: "system",
    action: AUDIT_ACTIONS.JOB_SUCCEEDED,
    resourceType: "runtime_job",
    resourceId: job.id,
    metadata: {
      attempt: running.attempt,
      agent_slug: job.agent_slug,
      latency_ms: succeeded.latency_ms,
    },
  });

  // 9. Advance the workflow (enqueue next step / create pending approval).
  let workflowDone = true;
  if (job.workflow) {
    try {
      const advanced = await advanceWorkflow({
        job: succeeded,
        output: result.output,
        actor: workerId,
      });
      workflowDone = advanced.done;
      if (advanced.halted) {
        await syncTaskStatus(job.task_id, "failed");
        return "succeeded";
      }
      if (advanced.awaitingApproval) {
        await syncTaskStatus(job.task_id, "awaiting_approval");
        return "succeeded";
      }
    } catch {
      // Workflow advancement failure never invalidates the finished job.
    }
  }
  if (workflowDone) {
    await syncTaskStatus(job.task_id, "completed");
  }
  return "succeeded";
}

// One bounded worker tick. Returns a sanitized summary safe to return to the
// authenticated internal caller.
export async function runTick({
  workerId = "worker",
  maxJobs = JOB_LIMITS.maxJobsPerTick,
  maxMs = JOB_LIMITS.maxTickMs,
  providerImpl,
  random = Math.random,
  now = () => Date.now(),
} = {}) {
  const startedAt = now();
  const summary = {
    worker: workerId,
    recovered: 0,
    claimed: 0,
    succeeded: 0,
    failed: 0,
    requeued: 0,
    dead_lettered: 0,
    cancelled: 0,
    released: 0,
    duration_ms: 0,
  };

  // 1. Recover expired leases from crashed workers.
  try {
    summary.recovered = await repo.recoverExpiredJobs();
    if (summary.recovered > 0) {
      await audit({
        actor: workerId,
        actorType: "system",
        action: AUDIT_ACTIONS.JOB_LEASES_RECOVERED,
        resourceType: "runtime_job",
        metadata: { count: summary.recovered },
      });
    }
  } catch {
    // Recovery failure must not block claiming fresh work.
  }

  // 2. Atomic claim (FOR UPDATE SKIP LOCKED in the database).
  const limit = Math.min(Math.max(1, maxJobs), JOB_LIMITS.maxJobsPerTick);
  const jobs = await repo.claimJobs({
    worker: workerId,
    limit,
    leaseSeconds: JOB_LIMITS.leaseSeconds,
  });
  summary.claimed = jobs.length;
  for (const job of jobs) {
    await audit({
      projectId: job.project_id,
      actor: workerId,
      actorType: "system",
      action: AUDIT_ACTIONS.JOB_CLAIMED,
      resourceType: "runtime_job",
      resourceId: job.id,
      metadata: { attempt: job.attempt, agent_slug: job.agent_slug },
    });
  }

  // 3. Process sequentially inside the wall-clock budget.
  for (const job of jobs) {
    if (now() - startedAt > maxMs) {
      await releaseUnprocessed(job);
      summary.released += 1;
      continue;
    }
    let outcome;
    try {
      outcome = await processJob(job, { workerId, providerImpl, random });
    } catch (err) {
      // Absolute backstop: a processing crash must not strand the lease.
      try {
        await repo.updateJobIfStatus(job.id, ["leased", "running"], {
          status: "failed",
          error: sanitizeJobError(err),
          finished_at: new Date().toISOString(),
          lease_owner: null,
          lease_expires_at: null,
        });
      } catch {}
      outcome = "failed";
    }
    if (outcome === "succeeded") summary.succeeded += 1;
    else if (outcome === "failed") summary.failed += 1;
    else if (outcome === "requeued") summary.requeued += 1;
    else if (outcome === "dead_letter") summary.dead_lettered += 1;
    else if (outcome === "cancelled") summary.cancelled += 1;
  }

  summary.duration_ms = now() - startedAt;
  return summary;
}
