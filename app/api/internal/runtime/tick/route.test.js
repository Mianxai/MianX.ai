import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const SECRET = "a-long-internal-secret-value-123";
const ORIGINALS = {
  INTERNAL_RUNTIME_SECRET: process.env.INTERNAL_RUNTIME_SECRET,
  CRON_SECRET: process.env.CRON_SECRET,
};

function fakeReq({ headers = {}, body = {} } = {}) {
  const map = new Map(
    Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
  );
  return {
    headers: { get: (k) => map.get(k.toLowerCase()) || null },
    text: async () => JSON.stringify(body),
  };
}

const workerMock = vi.hoisted(() => ({
  runTick: vi.fn(async () => ({
    worker: "internal-worker",
    recovered: 0,
    claimed: 1,
    succeeded: 1,
    failed: 0,
    requeued: 0,
    dead_lettered: 0,
    cancelled: 0,
    released: 0,
    duration_ms: 5,
  })),
}));
vi.mock("@/lib/core/worker", () => workerMock);

import { POST, GET } from "./route.js";

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.INTERNAL_RUNTIME_SECRET;
  delete process.env.CRON_SECRET;
});

afterEach(() => {
  for (const [k, v] of Object.entries(ORIGINALS)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
});

describe("POST /api/internal/runtime/tick", () => {
  it("returns 503 when no worker secret is configured", async () => {
    const res = await POST(fakeReq({ headers: { authorization: `Bearer ${SECRET}` } }));
    expect(res.status).toBe(503);
    expect(workerMock.runTick).not.toHaveBeenCalled();
  });

  it("returns 401 for a missing credential", async () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    const res = await POST(fakeReq());
    expect(res.status).toBe(401);
    expect(workerMock.runTick).not.toHaveBeenCalled();
  });

  it("returns 401 for an invalid credential and never echoes the secret", async () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    const res = await POST(
      fakeReq({ headers: { authorization: "Bearer wrong-wrong-wrong-wrong" } })
    );
    expect(res.status).toBe(401);
    const text = JSON.stringify(await res.json());
    expect(text).not.toContain(SECRET);
  });

  it("runs a bounded tick with a valid secret", async () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    const res = await POST(
      fakeReq({ headers: { authorization: `Bearer ${SECRET}` }, body: {} })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.tick.claimed).toBe(1);
  });

  it("clamps max_jobs to the server-side ceiling", async () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    await POST(
      fakeReq({
        headers: { authorization: `Bearer ${SECRET}` },
        body: { max_jobs: 500 },
      })
    );
    const arg = workerMock.runTick.mock.calls[0][0];
    expect(arg.maxJobs).toBeLessThanOrEqual(5);
  });
});

describe("GET /api/internal/runtime/tick (Vercel Cron)", () => {
  it("authenticates and runs a tick", async () => {
    process.env.CRON_SECRET = SECRET;
    const res = await GET(fakeReq({ headers: { authorization: `Bearer ${SECRET}` } }));
    expect(res.status).toBe(200);
  });

  it("rejects unauthenticated cron calls", async () => {
    process.env.CRON_SECRET = SECRET;
    const res = await GET(fakeReq());
    expect(res.status).toBe(401);
  });
});
