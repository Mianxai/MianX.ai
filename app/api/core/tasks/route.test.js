import { describe, it, expect, beforeEach, vi } from "vitest";

const UUID = "11111111-1111-4111-8111-111111111111";

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

describe("POST /api/core/tasks", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requires authentication", async () => {
    await withAuth(null);
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ project_id: UUID, title: "x" }));
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("rejects an invalid payload with a standardized 400", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ title: "" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error.code).toBe("VALIDATION_FAILED");
    vi.doUnmock("@/lib/auth");
  });

  it("creates a task for an authenticated admin", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const task = { id: "t1", project_id: UUID, title: "Score", status: "pending" };
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID })),
      createTask: vi.fn(async () => ({ row: task, created: true })),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ project_id: UUID, title: "Score", input: {} }));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.task).toEqual(task);
    expect(data.idempotentReplay).toBe(false);
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });

  it("returns 200 + idempotentReplay when the idempotency key already exists", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const task = { id: "t1", project_id: UUID, title: "Score", status: "pending" };
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID })),
      createTask: vi.fn(async () => ({ row: task, created: false })),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeReq({ project_id: UUID, title: "Score", idempotency_key: "k1" })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.idempotentReplay).toBe(true);
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });

  it("rejects a malformed project_id UUID", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ project_id: "not-a-uuid", title: "x" }));
    expect(res.status).toBe(400);
    vi.doUnmock("@/lib/auth");
  });
});

describe("GET /api/core/tasks", () => {
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

  it("lists tasks for an authenticated admin", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    const tasks = [{ id: "t1" }];
    vi.doMock("@/lib/core/repo", () => ({ listTasks: vi.fn(async () => tasks) }));
    const { GET } = await import("./route.js");
    const res = await GET(fakeReq({}, `project_id=${UUID}`));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.tasks).toEqual(tasks);
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/auth");
  });
});
