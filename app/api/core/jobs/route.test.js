import { describe, it, expect, beforeEach, vi } from "vitest";

const UUID = "11111111-1111-4111-8111-111111111111";
const TASK_UUID = "22222222-2222-4222-8222-222222222222";

function fakeReq(body = {}, qs = "") {
  return {
    text: async () => JSON.stringify(body),
    nextUrl: { searchParams: new URLSearchParams(qs) },
    cookies: { get: () => undefined },
  };
}

async function withAuth(user) {
  vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => user) }));
}

describe("GET /api/core/jobs", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requires authentication", async () => {
    await withAuth(null);
    const { GET } = await import("./route.js");
    const res = await GET(fakeReq({}, ""));
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("rejects an unknown status filter", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const { GET } = await import("./route.js");
    const res = await GET(fakeReq({}, `project_id=${UUID}&status=exploded`));
    expect(res.status).toBe(400);
    vi.doUnmock("@/lib/auth");
  });

  it("lists jobs with counts and pagination metadata", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const jobs = [{ id: "j1", status: "queued" }];
    vi.doMock("@/lib/core/repo", () => ({
      listJobs: vi.fn(async ({ limit, offset }) => ({ rows: jobs, total: 1, limit, offset })),
      countJobsByStatus: vi.fn(async () => ({ queued: 1 })),
    }));
    const { GET } = await import("./route.js");
    const res = await GET(fakeReq({}, `project_id=${UUID}&status=queued&limit=10`));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.jobs).toEqual(jobs);
    expect(data.counts).toEqual({ queued: 1 });
    expect(data.total).toBe(1);
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });

  it("clamps the limit to the server ceiling", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const listJobs = vi.fn(async () => ({ rows: [], total: 0 }));
    vi.doMock("@/lib/core/repo", () => ({
      listJobs,
      countJobsByStatus: vi.fn(async () => ({})),
    }));
    const { GET } = await import("./route.js");
    await GET(fakeReq({}, `limit=99999`));
    expect(listJobs.mock.calls[0][0].limit).toBeLessThanOrEqual(100);
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });
});

describe("POST /api/core/jobs", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requires authentication", async () => {
    await withAuth(null);
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ project_id: UUID, agent_slug: "research" }));
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("rejects an unknown agent slug with a standardized 400", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID })),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ project_id: UUID, agent_slug: "ghost" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error.code).toBe("VALIDATION_FAILED");
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });

  it("scopes task_id to the project (404 when the task is elsewhere)", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID })),
      getTask: vi.fn(async () => {
        const { notFound } = await import("@/lib/core/errors");
        throw notFound("Task not found.");
      }),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeReq({ project_id: UUID, task_id: TASK_UUID, agent_slug: "research" })
    );
    expect(res.status).toBe(404);
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });

  it("enqueues a job (201) and replays idempotent duplicates (200)", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    let calls = 0;
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID })),
      createJob: vi.fn(async (row) => {
        calls += 1;
        return { row: { id: "j1", ...row }, created: calls === 1 };
      }),
      findJobByIdempotency: vi.fn(async () => null),
    }));
    const { POST } = await import("./route.js");
    const body = {
      project_id: UUID,
      agent_slug: "research",
      input: { question: "q" },
      idempotency_key: "k1",
    };
    const first = await POST(fakeReq(body));
    expect(first.status).toBe(201);
    const second = await POST(fakeReq(body));
    expect(second.status).toBe(200);
    const data = await second.json();
    expect(data.created).toBe(false);
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });

  it("never mass-assigns queue-internal fields from the body", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const createJob = vi.fn(async (row) => ({ row: { id: "j1", ...row }, created: true }));
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID })),
      createJob,
      findJobByIdempotency: vi.fn(async () => null),
    }));
    const { POST } = await import("./route.js");
    await POST(
      fakeReq({
        project_id: UUID,
        agent_slug: "research",
        status: "succeeded",
        attempt: 99,
        lease_owner: "attacker",
        organization_id: "other-org",
      })
    );
    const row = createJob.mock.calls[0][0];
    expect(row.status).toBe("queued");
    expect(row.lease_owner).toBeUndefined();
    expect(row.attempt).toBeUndefined();
    expect(row.organization_id).toBeNull();
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });
});

describe("POST /api/core/jobs/[id]/cancel and /retry", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("cancel requires authentication", async () => {
    await withAuth(null);
    const { POST } = await import("./[id]/cancel/route.js");
    const res = await POST(fakeReq({}), { params: Promise.resolve({ id: UUID }) });
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("cancel rejects a malformed job id", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const { POST } = await import("./[id]/cancel/route.js");
    const res = await POST(fakeReq({}), { params: Promise.resolve({ id: "nope" }) });
    expect(res.status).toBe(400);
    vi.doUnmock("@/lib/auth");
  });

  it("retry returns the requeued job for an admin", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    vi.doMock("@/lib/core/repo", () => ({
      getJob: vi.fn(async () => ({
        id: UUID,
        project_id: "p1",
        status: "dead_letter",
        error: { code: "PROVIDER_ERROR" },
      })),
      updateJobIfStatus: vi.fn(async () => ({ id: UUID, status: "queued" })),
    }));
    const { POST } = await import("./[id]/retry/route.js");
    const res = await POST(fakeReq({}), { params: Promise.resolve({ id: UUID }) });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.job.status).toBe("queued");
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });
});
