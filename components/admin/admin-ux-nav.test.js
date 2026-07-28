import { describe, it, expect, afterEach } from "vitest";
import {
  ADMIN_NAV,
  ADMIN_NAV_GROUPS,
  primaryNavHrefs,
  isNavItemCurrent,
  withProjectQuery,
} from "@/components/admin/nav";
import {
  sanitizeAdminReturnTo,
  buildLoginRedirectUrl,
  adminLoginHref,
} from "@/lib/admin-return-to";
import { schedulerStatus } from "@/lib/core/config";

describe("admin navigation uniqueness", () => {
  it("has unique primary sidebar hrefs", () => {
    const hrefs = primaryNavHrefs();
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("does not duplicate Approvals or Audit under Runtime children", () => {
    const runtime = ADMIN_NAV.find((i) => i.href === "/admin/runtime");
    const childHrefs = (runtime?.children || []).map((c) => c.href);
    expect(childHrefs).not.toContain("/admin/runtime/approvals");
    expect(childHrefs).not.toContain("/admin/runtime/audit");
    expect(ADMIN_NAV.some((i) => i.href === "/admin/runtime/approvals")).toBe(true);
    expect(ADMIN_NAV.some((i) => i.href === "/admin/runtime/audit")).toBe(true);
  });

  it("uses grouped IA with Control / Workforce / Business / Intelligence / Operations", () => {
    expect(ADMIN_NAV_GROUPS.map((g) => g.id)).toEqual([
      "control",
      "workforce",
      "business",
      "intelligence",
      "operations",
    ]);
  });

  it("uses Control IA without Overview or Execution in the primary sidebar", () => {
    const control = ADMIN_NAV_GROUPS.find((g) => g.id === "control");
    expect(control.items.map((i) => i.label)).toEqual([
      "Command Center",
      "CEO Brief",
      "Objectives",
      "Company Builder",
      "Founder Inbox",
    ]);
    expect(ADMIN_NAV.some((i) => i.href === "/admin")).toBe(false);
    expect(ADMIN_NAV.some((i) => i.href === "/admin/execution")).toBe(false);
  });

  it("marks Leads active for legacy submissions/lead-pipeline paths", () => {
    const leads = ADMIN_NAV.find((i) => i.href === "/admin/leads");
    expect(isNavItemCurrent("/admin/leads", leads)).toBe(true);
    expect(isNavItemCurrent("/admin/submissions", leads)).toBe(true);
    expect(isNavItemCurrent("/admin/lead-pipeline", leads)).toBe(true);
  });

  it("marks Approvals/Audit active for short-path aliases", () => {
    const approvals = ADMIN_NAV.find((i) => i.href === "/admin/runtime/approvals");
    const audit = ADMIN_NAV.find((i) => i.href === "/admin/runtime/audit");
    expect(isNavItemCurrent("/admin/runtime/approvals", approvals)).toBe(true);
    expect(isNavItemCurrent("/admin/approvals", approvals)).toBe(true);
    expect(isNavItemCurrent("/admin/runtime/audit", audit)).toBe(true);
    expect(isNavItemCurrent("/admin/audit", audit)).toBe(true);
    const runtime = ADMIN_NAV.find((i) => i.href === "/admin/runtime");
    expect(isNavItemCurrent("/admin/approvals", runtime)).toBe(false);
    expect(isNavItemCurrent("/admin/audit", runtime)).toBe(false);
  });

  it("preserves project_id on navigation helpers", () => {
    expect(withProjectQuery("/admin/memory", "abc")).toBe(
      "/admin/memory?project_id=abc"
    );
    expect(withProjectQuery("/admin/memory?x=1", null)).toBe("/admin/memory?x=1");
  });
});

describe("admin returnTo safety", () => {
  it("accepts relative admin paths only", () => {
    expect(sanitizeAdminReturnTo("/admin/departments")).toBe("/admin/departments");
    expect(
      sanitizeAdminReturnTo("/admin/workflows?project_id=1")
    ).toBe("/admin/workflows?project_id=1");
    expect(sanitizeAdminReturnTo("https://evil.com")).toBeNull();
    expect(sanitizeAdminReturnTo("//evil.com")).toBeNull();
    expect(sanitizeAdminReturnTo("/login")).toBeNull();
    expect(sanitizeAdminReturnTo("/admin/login")).toBeNull();
  });

  it("builds login redirect with returnTo", () => {
    const url = buildLoginRedirectUrl(
      "https://example.com",
      "/admin/memory",
      "?project_id=x"
    );
    expect(url.pathname).toBe("/admin/login");
    expect(url.searchParams.get("returnTo")).toBe("/admin/memory?project_id=x");
  });

  it("builds client login href with encoded returnTo", () => {
    expect(adminLoginHref("/admin/ceo-brief")).toBe(
      "/admin/login?returnTo=%2Fadmin%2Fceo-brief"
    );
    expect(adminLoginHref("https://evil.com")).toBe("/admin/login");
  });
});

describe("scheduler status truth", () => {
  const keys = [
    "INTERNAL_RUNTIME_SECRET",
    "RUNTIME_SCHEDULER_ACTIVE",
    "RUNTIME_SCHEDULER_PLATFORM",
    "RUNTIME_SCHEDULER_PAUSED",
  ];
  const saved = {};

  function stash() {
    for (const k of keys) saved[k] = process.env[k];
  }
  function restore() {
    for (const k of keys) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  }

  afterEach(() => restore());

  it("maps healthy/warning/unconfigured without false degraded", () => {
    stash();
    delete process.env.INTERNAL_RUNTIME_SECRET;
    delete process.env.CRON_SECRET;
    delete process.env.RUNTIME_SCHEDULER_ACTIVE;
    expect(["manual", "unconfigured"]).toContain(schedulerStatus().mode);

    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "github_actions";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    expect(schedulerStatus().mode).toBe("automatic");
    expect(schedulerStatus().automaticProcessing).toBe(true);

    const stale = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString();
    expect(schedulerStatus({ lastTickAt: stale }).mode).toBe("warning");
  });
});
