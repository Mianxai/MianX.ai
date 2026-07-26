import { describe, it, expect, beforeEach, vi } from "vitest";

const repoMock = vi.hoisted(() => ({
  createJob: vi.fn(),
  findJobByIdempotency: vi.fn(),
  getJob: vi.fn(),
  updateJobIfStatus: vi.fn(),
}));
vi.mock("@/lib/core/repo", () => repoMock);
vi.mock("@/lib/core/audit", () => ({
  recordAudit: vi.fn(async () => true),
  buildAuditEntry: (x) => x,
  AUDIT_ACTIONS: new Proxy({}, { get: (_, p) => String(p) }),
}));
vi.mock("@/lib/supabase", () => ({ getSupabaseAdmin: () => null }));

import {
  canTransitionJob,
  assertJobTransition,
  computeBackoffMs,
  sanitizeJobError,
  isTransientJobError,
  validateJobEnqueue,
  enqueueJob,
  cancelJob,
  retryJob,
} from "./jobs";
import { JOB_LIMITS } from "./constants";

function job(overrides = {}) {
  return {
    id: "j1",
    project_id: "p1",
    status: "queued",
    attempt: 0,
    max_attempts: 3,
    error: null,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("job state machine", () => {
  it("allows the documented lifecycle", () => {
    expect(canTransitionJob("queued", "leased")).toBe(true);
    expect(canTransitionJob("leased", "running")).toBe(true);
    expect(canTransitionJob("running", "succeeded")).toBe(true);
    expect(canTransitionJob("running", "queued")).toBe(true); // retry requeue
    expect(canTransitionJob("failed", "queued")).toBe(true); // human retry
    expect(canTransitionJob("dead_letter", "queued")).toBe(true);
  });

  it("rejects illegal transitions", () => {
    expect(canTransitionJob("succeeded", "running")).toBe(false);
    expect(canTransitionJob("cancelled", "queued")).toBe(false);
    expect(canTransitionJob("queued", "succeeded")).toBe(false);
    expect(() => assertJobTransition("succeeded", "queued")).toThrow();
  });
});

describe("computeBackoffMs", () => {
  it("grows exponentially with bounded jitter and a hard cap", () => {
    const random = () => 0; // deterministic
    expect(computeBackoffMs(1, { random })).toBe(JOB_LIMITS.backoffBaseMs);
    expect(computeBackoffMs(2, { random })).toBe(JOB_LIMITS.backoffBaseMs * 2);
    expect(computeBackoffMs(3, { random })).toBe(JOB_LIMITS.backoffBaseMs * 4);
    expect(computeBackoffMs(50, { random })).toBe(JOB_LIMITS.backoffCapMs);
  });

  it("adds at most the configured jitter", () => {
    const random = () => 0.999999;
    const val = computeBackoffMs(1, { random });
    expect(val).toBeLessThan(JOB_LIMITS.backoffBaseMs + JOB_LIMITS.backoffJitterMs);
  });
});

describe("sanitizeJobError", () => {
  it("keeps only a stable code and clipped message", () => {
    const err = new Error("x".repeat(2000));
    err.code = "PROVIDER_ERROR";
    err.stack = "SECRET STACK";
    err.headers = { "x-api-key": "sk-secret" };
    const out = sanitizeJobError(err);
    expect(out.code).toBe("PROVIDER_ERROR");
    expect(out.message.length).toBeLessThanOrEqual(500);
    expect(JSON.stringify(out)).not.toContain("SECRET STACK");
    expect(JSON.stringify(out)).not.toContain("sk-secret");
  });

  it("collapses unknown errors to INTERNAL_ERROR", () => {
    expect(sanitizeJobError(null).code).toBe("INTERNAL_ERROR");
    expect(sanitizeJobError({}).message).toBe("Unexpected error.");
  });
});

describe("isTransientJobError", () => {
  it("treats 429 and 5xx as transient", () => {
    expect(isTransientJobError({ status: 429 })).toBe(true);
    expect(isTransientJobError({ status: 500 })).toBe(true);
    expect(isTransientJobError({ status: 503 })).toBe(true);
  });
  it("treats permanent 4xx / validation / configuration as non-transient", () => {
    expect(isTransientJobError({ status: 400 })).toBe(false);
    expect(isTransientJobError({ status: 403 })).toBe(false);
    expect(isTransientJobError({ code: "VALIDATION_FAILED" })).toBe(false);
    expect(isTransientJobError({ code: "NOT_CONFIGURED" })).toBe(false);
    expect(isTransientJobError({ code: "OUTPUT_VALIDATION_FAILED" })).toBe(false);
  });
  it("honors an explicit transient flag over everything else", () => {
    expect(isTransientJobError({ status: 400, transient: true })).toBe(true);
    expect(isTransientJobError({ status: 500, transient: false })).toBe(false);
  });
  it("defaults unknown/network errors to transient", () => {
    expect(isTransientJobError(new Error("socket hang up"))).toBe(true);
  });
});

describe("validateJobEnqueue", () => {
  it("rejects a missing or unknown agent slug", () => {
    expect(() => validateJobEnqueue({})).toThrow();
    expect(() => validateJobEnqueue({ agent_slug: "nope" })).toThrow();
  });
  it("rejects a draft (disabled-by-default) agent slug", () => {
    expect(() => validateJobEnqueue({ agent_slug: "release-readiness" })).toThrow(
      /fix the highlighted fields/i
    );
  });
  it("rejects out-of-range priority and max_attempts", () => {
    expect(() =>
      validateJobEnqueue({ agent_slug: "research", priority: 999 })
    ).toThrow();
    expect(() =>
      validateJobEnqueue({ agent_slug: "research", max_attempts: 0 })
    ).toThrow();
    expect(() =>
      validateJobEnqueue({ agent_slug: "research", max_attempts: 99 })
    ).toThrow();
  });
  it("returns a safe allowlisted row and drops unknown keys", () => {
    const out = validateJobEnqueue({
      agent_slug: "research",
      priority: 5,
      input: { question: "q" },
      idempotency_key: "k1",
      status: "succeeded", // mass-assignment attempt
      lease_owner: "attacker",
    });
    expect(out.agent_slug).toBe("research");
    expect(out.priority).toBe(5);
    expect(out.provider).toBe("anthropic");
    expect(out).not.toHaveProperty("status");
    expect(out).not.toHaveProperty("lease_owner");
  });
});

describe("enqueueJob", () => {
  it("creates a queued job and audits it", async () => {
    repoMock.createJob.mockResolvedValue({ row: job(), created: true });
    const { created } = await enqueueJob({
      projectId: "p1",
      agentSlug: "research",
      input: { question: "q" },
      idempotencyKey: "k1",
    });
    expect(created).toBe(true);
    const row = repoMock.createJob.mock.calls[0][0];
    expect(row.status).toBe("queued");
    expect(row.idempotency_key).toBe("k1");
  });

  it("replays an existing job on a duplicate idempotency key", async () => {
    repoMock.createJob.mockResolvedValue({ row: job(), created: false });
    const { created } = await enqueueJob({
      projectId: "p1",
      agentSlug: "research",
      idempotencyKey: "k1",
    });
    expect(created).toBe(false);
  });

  it("rejects an unknown agent", async () => {
    await expect(
      enqueueJob({ projectId: "p1", agentSlug: "ghost" })
    ).rejects.toMatchObject({ status: 400 });
  });
});

describe("cancelJob", () => {
  it("cancels a queued job immediately", async () => {
    repoMock.getJob.mockResolvedValue(job({ status: "queued" }));
    repoMock.updateJobIfStatus.mockResolvedValue(job({ status: "cancelled" }));
    const out = await cancelJob({ jobId: "j1", actor: "admin" });
    expect(out.status).toBe("cancelled");
    const [, from, patch] = repoMock.updateJobIfStatus.mock.calls[0];
    expect(from).toEqual(["queued"]);
    expect(patch.status).toBe("cancelled");
  });

  it("requests cooperative cancellation for a running job", async () => {
    repoMock.getJob.mockResolvedValue(job({ status: "running" }));
    repoMock.updateJobIfStatus.mockResolvedValue(
      job({ status: "running", cancel_requested_at: "now" })
    );
    const out = await cancelJob({ jobId: "j1", actor: "admin" });
    expect(out.cancel_requested_at).toBeTruthy();
    const [, , patch] = repoMock.updateJobIfStatus.mock.calls[0];
    expect(patch.status).toBeUndefined(); // status untouched; worker decides
  });

  it("rejects cancelling a terminal job", async () => {
    repoMock.getJob.mockResolvedValue(job({ status: "succeeded" }));
    await expect(cancelJob({ jobId: "j1", actor: "a" })).rejects.toMatchObject({
      status: 400,
    });
  });

  it("surfaces a lost compare-and-set race as a 400", async () => {
    repoMock.getJob.mockResolvedValue(job({ status: "queued" }));
    repoMock.updateJobIfStatus.mockResolvedValue(null);
    await expect(cancelJob({ jobId: "j1", actor: "a" })).rejects.toMatchObject({
      status: 400,
    });
  });
});

describe("retryJob", () => {
  it("returns a failed job to the queue with a fresh attempt budget", async () => {
    repoMock.getJob.mockResolvedValue(job({ status: "failed", attempt: 3 }));
    repoMock.updateJobIfStatus.mockResolvedValue(job({ status: "queued", attempt: 0 }));
    const out = await retryJob({ jobId: "j1", actor: "admin" });
    expect(out.status).toBe("queued");
    const [, from, patch] = repoMock.updateJobIfStatus.mock.calls[0];
    expect(from).toEqual(["failed", "dead_letter"]);
    expect(patch.attempt).toBe(0);
    expect(patch.cancel_requested_at).toBeNull();
  });

  it("retries a dead_letter job", async () => {
    repoMock.getJob.mockResolvedValue(job({ status: "dead_letter", attempt: 3 }));
    repoMock.updateJobIfStatus.mockResolvedValue(job({ status: "queued" }));
    const out = await retryJob({ jobId: "j1", actor: "admin" });
    expect(out.status).toBe("queued");
  });

  it("rejects retrying a non-failed job", async () => {
    repoMock.getJob.mockResolvedValue(job({ status: "running" }));
    await expect(retryJob({ jobId: "j1", actor: "a" })).rejects.toMatchObject({
      status: 400,
    });
  });
});
