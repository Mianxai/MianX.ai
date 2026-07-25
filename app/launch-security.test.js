import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("public security headers config", () => {
  it("declares safe production headers without an untested CSP", () => {
    const source = readFileSync(join(process.cwd(), "next.config.js"), "utf8");
    expect(source).toMatch(/X-Content-Type-Options/);
    expect(source).toMatch(/Referrer-Policy/);
    expect(source).toMatch(/Permissions-Policy/);
    expect(source).toMatch(/X-Frame-Options/);
    expect(source).toMatch(/Strict-Transport-Security/);
    expect(source).toMatch(/poweredByHeader:\s*false/);
    // A live CSP header must not be shipped untested; a deferred-CSP comment is fine.
    expect(source).not.toMatch(/key:\s*["']Content-Security-Policy["']/);
  });
});

describe("analytics privacy posture", () => {
  it("loads official Vercel analytics without custom form-field tracking", () => {
    const layout = readFileSync(join(process.cwd(), "app/layout.jsx"), "utf8");
    expect(layout).toMatch(/@vercel\/analytics/);
    expect(layout).toMatch(/@vercel\/speed-insights/);
    expect(layout).not.toMatch(/form\.email|form\.phone|form\.name/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    expect(pkg.dependencies["@vercel/analytics"]).toBeTruthy();
    expect(pkg.dependencies["@vercel/speed-insights"]).toBeTruthy();
  });
});
