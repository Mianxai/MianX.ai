import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const ENV_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

function clearSupabaseEnv() {
  for (const key of ENV_KEYS) delete process.env[key];
}

function setSupabaseEnv() {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
}

function fakeRequest(body, headers = {}) {
  const payload = body === undefined ? "" : JSON.stringify(body);
  const merged = {
    "content-type": "application/json",
    "content-length": String(Buffer.byteLength(payload)),
    ...Object.fromEntries(
      Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
    ),
  };
  return {
    json: async () => body,
    text: async () => payload,
    cookies: { get: () => undefined },
    headers: { get: (k) => merged[k.toLowerCase()] },
    nextUrl: { searchParams: new URLSearchParams() },
  };
}

describe("POST /api/leads", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    clearSupabaseEnv();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns a controlled 503 configuration error instead of crashing when Supabase is not configured", async () => {
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({ name: "Jane", email: "jane@example.com", message: "Help" })
    );
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toMatch(/Configuration error/i);
  });

  it("rejects a submission missing required fields once Supabase is configured", async () => {
    setSupabaseEnv();
    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest({ name: "Jane" })); // missing email/message
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.fieldErrors.email).toBeTruthy();
    expect(data.fieldErrors.message).toBeTruthy();
  });

  it("rejects an invalid email address", async () => {
    setSupabaseEnv();
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({ name: "Jane", email: "not-an-email", message: "Help" })
    );
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.fieldErrors.email).toBeTruthy();
  });

  it("silently accepts (without writing to the DB) a honeypot-tripped submission", async () => {
    setSupabaseEnv();
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        getSupabaseAdmin: () => {
          throw new Error("should never be called for a honeypot submission");
        },
      };
    });
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({ name: "Bot", email: "bot@example.com", message: "spam", website: "http://spam.example" })
    );
    expect(res.status).toBe(200);
    vi.doUnmock("@/lib/supabase");
  });

  it("accepts a valid submission and persists it via the Supabase admin client", async () => {
    setSupabaseEnv();
    const insertedRow = { id: "1", name: "Jane", email: "jane@example.com", need: "Help", status: "new" };
    const single = vi.fn().mockResolvedValue({ data: insertedRow, error: null });
    const select = vi.fn(() => ({ single }));
    const insert = vi.fn(() => ({ select }));
    const from = vi.fn(() => ({ insert }));

    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return { ...actual, getSupabaseAdmin: () => ({ from }) };
    });

    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({
        name: "Jane",
        email: "jane@example.com",
        company: "Acme",
        phone: "+1 555 0100",
        industry: "restaurant",
        message: "Help",
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ ok: true, id: "1" });
    expect(from).toHaveBeenCalledWith("leads");
    vi.doUnmock("@/lib/supabase");
  });

  it("does not report success when the database write fails", async () => {
    setSupabaseEnv();
    const single = vi.fn().mockResolvedValue({ data: null, error: { message: "db down" } });
    const select = vi.fn(() => ({ single }));
    const insert = vi.fn(() => ({ select }));
    const from = vi.fn(() => ({ insert }));

    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return { ...actual, getSupabaseAdmin: () => ({ from }) };
    });

    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({
        name: "Jane",
        email: "jane@example.com",
        industry: "restaurant",
        message: "Help",
      })
    );
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/Unable to save your request/i);
    expect(data.error).not.toMatch(/db down/i);
    vi.doUnmock("@/lib/supabase");
  });

  it("returns a controlled 503 (not a crash) if the Supabase client fails to construct even though env vars look present", async () => {
    setSupabaseEnv();
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return { ...actual, getSupabaseAdmin: () => null };
    });

    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({
        name: "Jane",
        email: "jane@example.com",
        industry: "restaurant",
        message: "Help",
      })
    );
    expect(res.status).toBe(503);
    vi.doUnmock("@/lib/supabase");
  });

  it("rejects non-JSON content types", async () => {
    setSupabaseEnv();
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest(
        { name: "Jane", email: "jane@example.com", industry: "restaurant", message: "Help" },
        { "content-type": "text/plain" }
      )
    );
    expect(res.status).toBe(415);
  });

  it("rejects oversized request bodies", async () => {
    setSupabaseEnv();
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest(
        { name: "Jane", email: "jane@example.com", industry: "restaurant", message: "Help" },
        { "content-length": "999999" }
      )
    );
    expect(res.status).toBe(413);
  });

  it("rate-limits rapid repeated submissions from the same client", async () => {
    setSupabaseEnv();
    const single = vi.fn().mockResolvedValue({ data: { id: "1" }, error: null });
    const select = vi.fn(() => ({ single }));
    const insert = vi.fn(() => ({ select }));
    const from = vi.fn(() => ({ insert }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return { ...actual, getSupabaseAdmin: () => ({ from }) };
    });

    const { POST } = await import("./route.js");
    const req = () =>
      fakeRequest(
        {
          name: "Jane",
          email: "jane@example.com",
          industry: "restaurant",
          message: "Help",
        },
        { "x-forwarded-for": "203.0.113.5" }
      );
    let lastStatus;
    for (let i = 0; i < 7; i++) {
      lastStatus = (await POST(req())).status;
    }
    expect(lastStatus).toBe(429);
    vi.doUnmock("@/lib/supabase");
  });
});

describe("GET /api/leads", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    clearSupabaseEnv();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns a controlled 503 configuration error before checking auth when Supabase is not configured", async () => {
    const { GET } = await import("./route.js");
    const res = await GET(fakeRequest());
    expect(res.status).toBe(503);
  });

  it("requires authentication", async () => {
    setSupabaseEnv();
    vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => null) }));
    const { GET } = await import("./route.js");
    const res = await GET(fakeRequest());
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("returns non-archived leads for an authenticated admin", async () => {
    setSupabaseEnv();
    vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "admin-1" })) }));
    const leads = [{ id: "1", name: "Jane" }];
    const order = vi.fn().mockResolvedValue({ data: leads, error: null });
    const is = vi.fn(() => ({ order }));
    const select = vi.fn(() => ({ is }));
    const from = vi.fn(() => ({ select }));
    // chain used by the route: from("leads").select("*").is(...).order(...)
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return { ...actual, getSupabaseAdmin: () => ({ from }) };
    });

    const { GET } = await import("./route.js");
    const res = await GET(fakeRequest());
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(leads);
    expect(is).toHaveBeenCalledWith("archived_at", null);
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/supabase");
  });
});
