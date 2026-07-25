import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { requireInternalWorker, getInternalSecrets } from "./internal-auth";

const SECRET = "a-long-internal-secret-value-123";
const ORIGINALS = {
  INTERNAL_RUNTIME_SECRET: process.env.INTERNAL_RUNTIME_SECRET,
  CRON_SECRET: process.env.CRON_SECRET,
};

function fakeReq(headers = {}) {
  const map = new Map(
    Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
  );
  return { headers: { get: (k) => map.get(k.toLowerCase()) || null } };
}

beforeEach(() => {
  delete process.env.INTERNAL_RUNTIME_SECRET;
  delete process.env.CRON_SECRET;
});

afterEach(() => {
  for (const [k, v] of Object.entries(ORIGINALS)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
});

describe("requireInternalWorker", () => {
  it("returns a controlled 503 when no secret is configured", () => {
    try {
      requireInternalWorker(fakeReq({ authorization: `Bearer ${SECRET}` }));
      throw new Error("should have thrown");
    } catch (e) {
      expect(e.status).toBe(503);
      expect(e.code).toBe("WORKER_NOT_CONFIGURED");
    }
  });

  it("ignores secrets shorter than 16 characters (misconfiguration guard)", () => {
    process.env.INTERNAL_RUNTIME_SECRET = "short";
    expect(getInternalSecrets()).toEqual([]);
  });

  it("rejects a missing credential with 401", () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    try {
      requireInternalWorker(fakeReq({}));
      throw new Error("should have thrown");
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  it("rejects a wrong credential with 401 and never echoes the secret", () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    try {
      requireInternalWorker(fakeReq({ authorization: "Bearer wrong-value-000000" }));
      throw new Error("should have thrown");
    } catch (e) {
      expect(e.status).toBe(401);
      expect(e.message).not.toContain(SECRET);
    }
  });

  it("accepts a valid Bearer token", () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    const out = requireInternalWorker(
      fakeReq({ authorization: `Bearer ${SECRET}` })
    );
    expect(out.workerId).toBeTruthy();
  });

  it("accepts the x-internal-secret header", () => {
    process.env.INTERNAL_RUNTIME_SECRET = SECRET;
    const out = requireInternalWorker(fakeReq({ "x-internal-secret": SECRET }));
    expect(out.workerId).toBeTruthy();
  });

  it("accepts CRON_SECRET as a fallback (Vercel Cron)", () => {
    process.env.CRON_SECRET = SECRET;
    const out = requireInternalWorker(
      fakeReq({ authorization: `Bearer ${SECRET}` })
    );
    expect(out.workerId).toBeTruthy();
  });
});
