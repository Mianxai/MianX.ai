import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("@/lib/csrf", () => ({
  assertMutationOrigin: vi.fn(),
}));

vi.mock("@/lib/core/ratelimit", () => ({
  rateLimit: vi.fn(),
}));

const getUser = vi.fn();
vi.mock("@/lib/supabase", () => ({
  getSupabase: () => ({
    auth: { getUser },
  }),
}));

function makeRequest(method, body) {
  const payload = JSON.stringify(body ?? {});
  return new Request("http://localhost:3000/api/admin/session", {
    method,
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
    },
    body: method === "GET" || method === "HEAD" ? undefined : payload,
  });
}

function cookieHeader(res) {
  if (typeof res.headers.getSetCookie === "function") {
    return (res.headers.getSetCookie() || []).join("; ").toLowerCase();
  }
  return (res.headers.get("set-cookie") || "").toLowerCase();
}

describe("POST/DELETE /api/admin/session", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    getUser.mockReset();
    process.env = { ...originalEnv };
    delete process.env.VERCEL;
    process.env.NODE_ENV = "test";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("sets an HttpOnly SameSite=Lax cookie and never echoes the token", async () => {
    getUser.mockResolvedValue({
      data: { user: { id: "u1", email: "owner@mianx.ai" } },
      error: null,
    });
    const { POST } = await import("./route.js");
    const res = await POST(
      makeRequest("POST", { access_token: "tok-secret-value", expires_in: 3600 })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(JSON.stringify(body)).not.toContain("tok-secret-value");

    const setCookie = cookieHeader(res);
    expect(setCookie).toMatch(/sb-access-token=/);
    expect(setCookie).toMatch(/httponly/);
    expect(setCookie).toMatch(/samesite=lax/);
    expect(setCookie).not.toMatch(/secure/); // not prod
  });

  it("marks Secure when VERCEL=1 (production-like)", async () => {
    process.env.VERCEL = "1";
    getUser.mockResolvedValue({
      data: { user: { id: "u1", email: "owner@mianx.ai" } },
      error: null,
    });
    const { POST } = await import("./route.js");
    const res = await POST(makeRequest("POST", { access_token: "tok" }));
    expect(res.status).toBe(200);
    expect(cookieHeader(res)).toMatch(/secure/);
  });

  it("rejects invalid tokens with 401", async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: { message: "bad" } });
    const { POST } = await import("./route.js");
    const res = await POST(makeRequest("POST", { access_token: "bad" }));
    expect(res.status).toBe(401);
  });

  it("clears the session cookie on DELETE", async () => {
    const { DELETE } = await import("./route.js");
    const res = await DELETE(makeRequest("DELETE", {}));
    expect(res.status).toBe(200);
    const setCookie = cookieHeader(res);
    expect(setCookie).toMatch(/sb-access-token=/);
    expect(setCookie).toMatch(/max-age=0/);
  });
});
