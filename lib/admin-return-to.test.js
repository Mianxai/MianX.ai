import { describe, it, expect } from "vitest";
import {
  sanitizeAdminReturnTo,
  buildLoginRedirectUrl,
  adminLoginHref,
  currentAdminLoginHref,
} from "@/lib/admin-return-to";

describe("middleware returnTo contract", () => {
  const cases = [
    "/admin/departments",
    "/admin/workflows",
    "/admin/memory",
    "/admin/runtime/tasks",
    "/admin/leads",
  ];

  for (const path of cases) {
    it(`preserves ${path} through login redirect`, () => {
      const url = buildLoginRedirectUrl("https://app.example", path, "");
      expect(url.pathname).toBe("/admin/login");
      expect(url.searchParams.get("returnTo")).toBe(path);
      expect(sanitizeAdminReturnTo(url.searchParams.get("returnTo"))).toBe(path);
    });
  }

  it("preserves query string on returnTo", () => {
    const url = buildLoginRedirectUrl(
      "https://app.example",
      "/admin/memory",
      "?project_id=abc"
    );
    expect(url.searchParams.get("returnTo")).toBe("/admin/memory?project_id=abc");
  });

  it("blocks open redirects", () => {
    expect(sanitizeAdminReturnTo("https://evil.test/admin")).toBeNull();
    expect(adminLoginHref("//evil.test")).toBe("/admin/login");
  });

  it("falls back when window path is not admin", () => {
    expect(currentAdminLoginHref("/admin/leads")).toMatch(/returnTo=/);
  });
});
