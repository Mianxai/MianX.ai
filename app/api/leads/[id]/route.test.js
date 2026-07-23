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

function fakeRequest(body) {
  return {
    json: async () => body,
    cookies: { get: () => ({ value: "fake-token" }) },
  };
}

function mockAuthed() {
  vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "admin-1" })) }));
}

function mockSupabaseUpdate(returnRow, returnError = null) {
  const single = vi.fn().mockResolvedValue({ data: returnRow, error: returnError });
  const select = vi.fn(() => ({ single }));
  const eq = vi.fn(() => ({ select }));
  const update = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ update }));
  vi.doMock("@/lib/supabase", async () => {
    const actual = await vi.importActual("@/lib/supabase");
    return { ...actual, getSupabaseAdmin: () => ({ from }) };
  });
  return { update, from };
}

describe("PATCH /api/leads/[id]", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    clearSupabaseEnv();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/supabase");
  });

  it("returns 503 when Supabase is not configured", async () => {
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeRequest({ status: "contacted" }), { params: { id: "1" } });
    expect(res.status).toBe(503);
  });

  it("requires authentication", async () => {
    setSupabaseEnv();
    vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => null) }));
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeRequest({ status: "contacted" }), { params: { id: "1" } });
    expect(res.status).toBe(401);
  });

  it("accepts a valid status transition", async () => {
    setSupabaseEnv();
    mockAuthed();
    const { update } = mockSupabaseUpdate({ id: "1", status: "contacted" });
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeRequest({ status: "contacted" }), { params: { id: "1" } });
    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith({ status: "contacted" });
  });

  it("rejects a status value outside the locked enum", async () => {
    setSupabaseEnv();
    mockAuthed();
    mockSupabaseUpdate({ id: "1" });
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeRequest({ status: "qualified" }), { params: { id: "1" } });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.fieldErrors.status).toBeTruthy();
  });

  it("ignores unknown/mass-assignment fields and only applies the allowlisted ones", async () => {
    setSupabaseEnv();
    mockAuthed();
    const { update } = mockSupabaseUpdate({ id: "1", status: "contacted" });
    const { PATCH } = await import("./route.js");
    const res = await PATCH(
      fakeRequest({ status: "contacted", id: "attacker-id", created_at: "2000-01-01", email: "hijack@example.com" }),
      { params: { id: "1" } }
    );
    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith({ status: "contacted" });
    expect(update).not.toHaveBeenCalledWith(expect.objectContaining({ email: expect.anything() }));
  });

  it("archives (soft-deletes) instead of destroying the row", async () => {
    setSupabaseEnv();
    mockAuthed();
    const { update } = mockSupabaseUpdate({ id: "1", archived_at: "2026-01-01T00:00:00.000Z" });
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeRequest({ archived: true }), { params: { id: "1" } });
    expect(res.status).toBe(200);
    const call = update.mock.calls[0][0];
    expect(typeof call.archived_at).toBe("string");
  });

  it("rejects a malformed analysis payload", async () => {
    setSupabaseEnv();
    mockAuthed();
    mockSupabaseUpdate({ id: "1" });
    const { PATCH } = await import("./route.js");
    const res = await PATCH(
      fakeRequest({ analysis: { score: "not-a-number" } }),
      { params: { id: "1" } }
    );
    expect(res.status).toBe(400);
  });

  it("rejects a body with no valid fields", async () => {
    setSupabaseEnv();
    mockAuthed();
    mockSupabaseUpdate({ id: "1" });
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeRequest({ foo: "bar" }), { params: { id: "1" } });
    expect(res.status).toBe(400);
  });
});
