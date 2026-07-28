import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { adminFetch, clearAdminFetchCache } from "./admin-fetch";

describe("adminFetch dedupe", () => {
  beforeEach(() => {
    clearAdminFetchCache();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        await new Promise((r) => setTimeout(r, 20));
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      })
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    clearAdminFetchCache();
  });

  it("coalesces parallel identical GETs into one network call", async () => {
    const [a, b, c] = await Promise.all([
      adminFetch("/api/core/health"),
      adminFetch("/api/core/health"),
      adminFetch("/api/core/health"),
    ]);
    expect(a.ok && b.ok && c.ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("does not dedupe mutations", async () => {
    await Promise.all([
      adminFetch("/api/admin/session", { method: "DELETE" }),
      adminFetch("/api/admin/session", { method: "DELETE" }),
    ]);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
