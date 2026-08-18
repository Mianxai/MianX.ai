import { describe, it, expect, beforeEach, vi } from "vitest";
import { assertMutationOrigin } from "@/lib/csrf";

function req({ method = "POST", origin, referer, site } = {}) {
  const headers = new Map();
  if (origin !== undefined) headers.set("origin", origin);
  if (referer !== undefined) headers.set("referer", referer);
  if (site !== undefined) headers.set("sec-fetch-site", site);
  headers.set("host", "mian-x-ai.vercel.app");
  return {
    method,
    headers: {
      get: (name) => headers.get(String(name).toLowerCase()) || null,
    },
    nextUrl: { origin: "https://mian-x-ai.vercel.app" },
  };
}

describe("CSRF guard for cookie-authenticated mutations", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mian-x-ai.vercel.app");
  });

  it("allows same-origin Origin on POST", () => {
    expect(() =>
      assertMutationOrigin(
        req({ origin: "https://mian-x-ai.vercel.app", site: "same-origin" })
      )
    ).not.toThrow();
  });

  it("rejects cross-site Origin on POST", () => {
    expect(() =>
      assertMutationOrigin(
        req({ origin: "https://evil.example", site: "cross-site" })
      )
    ).toThrow(/origin|csrf|forbidden/i);
  });

  it("rejects cross-site Sec-Fetch-Site without a trusted Origin", () => {
    expect(() =>
      assertMutationOrigin(req({ site: "cross-site" }))
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("rejects untrusted Origin even when Sec-Fetch-Site is same-origin", () => {
    expect(() =>
      assertMutationOrigin(
        req({ origin: "https://evil.example", site: "same-origin" })
      )
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("does not apply to GET", () => {
    expect(() => assertMutationOrigin(req({ method: "GET" }))).not.toThrow();
  });
});
