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

  it("includes Templates under Results without duplicates", () => {
    const results = ADMIN_NAV_GROUPS.find((g) => g.id === "results");
    const labels = results.items.map((i) => i.label);
    expect(labels).toContain("Templates");
    expect(labels.filter((l) => l === "Templates")).toHaveLength(1);
    expect(primaryNavHrefs().filter((h) => h === "/admin/templates")).toHaveLength(1);
  });

  it("includes Planning under Results without duplicates", () => {
    const results = ADMIN_NAV_GROUPS.find((g) => g.id === "results");
    const labels = results.items.map((i) => i.label);
    expect(labels).toContain("Planning");
    expect(labels.filter((l) => l === "Planning")).toHaveLength(1);
    expect(primaryNavHrefs().filter((h) => h === "/admin/planning")).toHaveLength(1);
  });

  it("includes Workforce ops under Workforce without duplicates", () => {
    const wf = ADMIN_NAV_GROUPS.find((g) => g.id === "workforce");
    const labels = wf.items.map((i) => i.label);
    expect(labels).toContain("Workforce ops");
    expect(labels.filter((l) => l === "Workforce ops")).toHaveLength(1);
    expect(primaryNavHrefs().filter((h) => h === "/admin/workforce")).toHaveLength(1);
    expect(labels).not.toContain("Live Workforce");
  });

  it("uses Founder Mode IA with Home primary and Advanced Operations collapsed", () => {
    const founder = ADMIN_NAV_GROUPS.find((g) => g.id === "founder");
    expect(founder.label).toBe("Founder Mode");
    expect(founder.items.map((i) => i.label)).toEqual([
      "Home",
      "Projects",
      "Objectives",
      "Founder Proof",
      "Founder Inbox",
    ]);
    expect(founder.items[0].href).toBe("/admin/command-center");
    expect(primaryNavHrefs().filter((h) => h === "/admin/integration")).toHaveLength(1);
    expect(ADMIN_NAV.some((i) => i.href === "/admin")).toBe(false);
    expect(ADMIN_NAV.some((i) => i.href === "/admin/execution")).toBe(true);
    const ops = ADMIN_NAV_GROUPS.find((g) => g.id === "operations");
    expect(ops.label).toBe("Advanced Operations");
    expect(ops.collapsedByDefault).toBe(true);
    expect(ops.items.map((i) => i.label)).toEqual(
      expect.arrayContaining([
        "Runtime Overview",
        "Runtime Approvals",
        "Full Audit",
        "Execution",
        "Technical Settings",
        "Company Builder",
      ])
    );
    const runtime = ops.items.find((i) => i.href === "/admin/runtime");
    expect(runtime.badge).toBe("Advanced");
    const exec = ops.items.find((i) => i.href === "/admin/execution");
    expect(exec.badge).toBe("Best-effort");
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
