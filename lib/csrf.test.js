import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { assertMutationOrigin } from "./csrf";

function req({ method = "POST", origin, referer, site } = {}) {
  const headers = new Map();
  if (origin) headers.set("origin", origin);
  if (referer) headers.set("referer", referer);
  if (site) headers.set("sec-fetch-site", site);
  return {
    method,
    headers: { get: (k) => headers.get(k.toLowerCase()) || null },
  };
}

const ORIGINAL = process.env.NEXT_PUBLIC_SITE_URL;

beforeEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://mian-x-ai.vercel.app";
});
afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL;
});

describe("assertMutationOrigin", () => {
  it("allows safe methods unconditionally", () => {
    expect(assertMutationOrigin(req({ method: "GET", origin: "https://evil.test" }))).toBeNull();
  });

  it("allows the configured site origin", () => {
    expect(
      assertMutationOrigin(req({ origin: "https://mian-x-ai.vercel.app" }))
    ).toBe("https://mian-x-ai.vercel.app");
  });

  it("rejects a foreign origin", () => {
    expect(() =>
      assertMutationOrigin(req({ origin: "https://evil.example" }))
    ).toThrow(/Cross-origin/);
  });

  it("allows same-origin Sec-Fetch-Site when Origin is omitted", () => {
    expect(assertMutationOrigin(req({ site: "same-origin" }))).toBeNull();
  });

  it("rejects cross-site Sec-Fetch-Site when Origin is omitted", () => {
    expect(() => assertMutationOrigin(req({ site: "cross-site" }))).toThrow(
      /Cross-origin/
    );
  });
});
