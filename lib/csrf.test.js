import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  assertMutationOrigin,
  firstForwardedValue,
  forwardedPublicOrigin,
  parseHttpOrigin,
  trustedOriginsFor,
} from "./csrf";

function req({
  method = "POST",
  origin,
  referer,
  site,
  url = "https://mian-x-ai-abc123-mianxais-projects.vercel.app/api/admin/session",
  forwardedHost,
  forwardedProto,
  host,
} = {}) {
  const headers = new Map();
  if (origin !== undefined) headers.set("origin", origin);
  if (referer !== undefined) headers.set("referer", referer);
  if (site !== undefined) headers.set("sec-fetch-site", site);
  if (forwardedHost !== undefined) headers.set("x-forwarded-host", forwardedHost);
  if (forwardedProto !== undefined) headers.set("x-forwarded-proto", forwardedProto);
  if (host !== undefined) headers.set("host", host);
  let nextOrigin;
  try {
    nextOrigin = new URL(url).origin;
  } catch {
    nextOrigin = undefined;
  }
  return {
    method,
    url,
    nextUrl: nextOrigin ? { origin: nextOrigin, href: url } : undefined,
    headers: { get: (k) => headers.get(String(k).toLowerCase()) ?? null },
  };
}

const ENV_KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "VERCEL_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
];
const saved = {};

beforeEach(() => {
  for (const key of ENV_KEYS) {
    saved[key] = process.env[key];
    delete process.env[key];
  }
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

describe("parseHttpOrigin / forwarded helpers", () => {
  it("normalizes exact http(s) origins and rejects bad values", () => {
    expect(parseHttpOrigin("https://mian-x-ai.vercel.app")).toBe(
      "https://mian-x-ai.vercel.app"
    );
    expect(parseHttpOrigin("https://mian-x-ai.vercel.app/admin")).toBe(
      "https://mian-x-ai.vercel.app"
    );
    expect(parseHttpOrigin("null")).toBeNull();
    expect(parseHttpOrigin("ftp://files.example")).toBeNull();
    expect(parseHttpOrigin("not a url")).toBeNull();
    expect(parseHttpOrigin("https://user:pass@evil.example")).toBeNull();
  });

  it("uses only the first forwarded value", () => {
    expect(firstForwardedValue(" mian-x-ai.vercel.app , evil.example")).toBe(
      "mian-x-ai.vercel.app"
    );
    expect(firstForwardedValue("")).toBeNull();
  });

  it("builds forwarded public origin only when proto+host are both valid", () => {
    expect(
      forwardedPublicOrigin(
        req({
          forwardedProto: "https",
          forwardedHost: "mian-x-ai.vercel.app",
        })
      )
    ).toBe("https://mian-x-ai.vercel.app");
    expect(
      forwardedPublicOrigin(req({ forwardedProto: "https" }))
    ).toBeNull();
    expect(
      forwardedPublicOrigin(
        req({ forwardedProto: "ftp", forwardedHost: "mian-x-ai.vercel.app" })
      )
    ).toBeNull();
    expect(
      forwardedPublicOrigin(
        req({
          forwardedProto: "https",
          forwardedHost: "https://mian-x-ai.vercel.app",
        })
      )
    ).toBeNull();
  });
});

describe("assertMutationOrigin — Vercel alias CSRF matrix", () => {
  it("1. accepts public alias Origin when request.url uses the internal deployment host", () => {
    process.env.VERCEL_URL = "mian-x-ai-abc123-mianxais-projects.vercel.app";
    expect(
      assertMutationOrigin(
        req({
          origin: "https://mian-x-ai.vercel.app",
          site: "same-origin",
          forwardedHost: "mian-x-ai.vercel.app",
          forwardedProto: "https",
          url: "https://mian-x-ai-abc123-mianxais-projects.vercel.app/api/admin/session",
        })
      )
    ).toBe("https://mian-x-ai.vercel.app");
  });

  it("2. accepts a standard request-url same-origin mutation", () => {
    expect(
      assertMutationOrigin(
        req({
          origin: "https://mian-x-ai.vercel.app",
          site: "same-origin",
          url: "https://mian-x-ai.vercel.app/api/admin/session",
        })
      )
    ).toBe("https://mian-x-ai.vercel.app");
  });

  it("3. accepts an exact preview forwarded origin", () => {
    const preview = "mian-x-ai-git-feature-team.vercel.app";
    process.env.VERCEL_URL = preview;
    expect(
      assertMutationOrigin(
        req({
          origin: `https://${preview}`,
          site: "same-origin",
          forwardedHost: preview,
          forwardedProto: "https",
          url: `https://${preview}/api/admin/session`,
        })
      )
    ).toBe(`https://${preview}`);
  });

  it("4. rejects a different origin", () => {
    expect(() =>
      assertMutationOrigin(
        req({
          origin: "https://evil.example",
          site: "same-origin",
          forwardedHost: "mian-x-ai.vercel.app",
          forwardedProto: "https",
        })
      )
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("5. rejects a suffix attack origin", () => {
    expect(() =>
      assertMutationOrigin(
        req({
          origin: "https://mian-x-ai.vercel.app.attacker.com",
          site: "same-origin",
          forwardedHost: "mian-x-ai.vercel.app",
          forwardedProto: "https",
        })
      )
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("6. rejects a prefix/lookalike origin", () => {
    expect(() =>
      assertMutationOrigin(
        req({
          origin: "https://attacker-mian-x-ai.vercel.app",
          site: "same-origin",
          forwardedHost: "mian-x-ai.vercel.app",
          forwardedProto: "https",
        })
      )
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("7. rejects Sec-Fetch-Site: cross-site even when Origin matches a trusted host", () => {
    expect(() =>
      assertMutationOrigin(
        req({
          origin: "https://mian-x-ai.vercel.app",
          site: "cross-site",
          forwardedHost: "mian-x-ai.vercel.app",
          forwardedProto: "https",
          url: "https://mian-x-ai.vercel.app/api/admin/session",
        })
      )
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("8. rejects a malformed Origin", () => {
    expect(() =>
      assertMutationOrigin(req({ origin: "://bad", site: "same-origin" }))
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("9. rejects null Origin for cookie-authenticated browser mutation", () => {
    expect(() =>
      assertMutationOrigin(req({ origin: "null", site: "same-origin" }))
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("10. malformed forwarded proto/host cannot widen trust", () => {
    // Without a valid forwarded pair, and with VERCEL_URL pointing at the
    // deployment host only, the public alias must still be accepted via
    // DEFAULT_SITE_URL — but a crafted forwarded header must not invent trust
    // for an attacker origin.
    process.env.VERCEL_URL = "mian-x-ai-abc123-mianxais-projects.vercel.app";
    expect(() =>
      assertMutationOrigin(
        req({
          origin: "https://evil.example",
          site: "same-origin",
          forwardedProto: "javascript",
          forwardedHost: "evil.example",
        })
      )
    ).toThrow(/Cross-origin mutation rejected/);

    // Path-like forwarded host is ignored; evil Origin still rejected.
    expect(() =>
      assertMutationOrigin(
        req({
          origin: "https://evil.example",
          forwardedProto: "https",
          forwardedHost: "evil.example/admin",
        })
      )
    ).toThrow(/Cross-origin mutation rejected/);

    // Host header alone must not grant trust for a foreign Origin.
    const trusted = trustedOriginsFor(
      req({
        host: "evil.example",
        url: "https://mian-x-ai-abc123-mianxais-projects.vercel.app/api/x",
      })
    );
    expect(trusted.has("https://evil.example")).toBe(false);
  });

  it("allows safe methods unconditionally", () => {
    expect(
      assertMutationOrigin(req({ method: "GET", origin: "https://evil.test" }))
    ).toBeNull();
  });

  it("allows same-origin Sec-Fetch-Site when Origin is omitted", () => {
    expect(assertMutationOrigin(req({ site: "same-origin" }))).toBeNull();
  });

  it("does not silently bypass when Origin and Sec-Fetch-Site are both missing", () => {
    expect(() => assertMutationOrigin(req({}))).toThrow(
      /Cross-origin mutation rejected/
    );
  });

  it("never trusts a wildcard *.vercel.app suffix", () => {
    process.env.VERCEL_URL = "mian-x-ai.vercel.app";
    const trusted = trustedOriginsFor(req({}));
    expect([...trusted].some((o) => o.includes("*.vercel.app"))).toBe(false);
    expect(() =>
      assertMutationOrigin(
        req({ origin: "https://random-app.vercel.app", site: "same-origin" })
      )
    ).toThrow(/Cross-origin mutation rejected/);
  });

  it("error message does not expose trusted host lists or secrets", () => {
    try {
      assertMutationOrigin(req({ origin: "https://evil.example" }));
      throw new Error("expected throw");
    } catch (err) {
      expect(err.message).toBe("Cross-origin mutation rejected.");
      expect(err.message).not.toMatch(/VERCEL|SITE_URL|allowlist|cookie|token/i);
      expect(JSON.stringify(err)).not.toMatch(/sk-|service_role|password/i);
    }
  });
});
