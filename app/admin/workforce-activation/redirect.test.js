/**
 * Redirect tests for legacy workforce routes.
 * Verifies that old URLs redirect to the correct consolidated tab.
 */
import { describe, it, expect, beforeAll } from "vitest";

// Test the redirect behavior by checking the page module exports.
// Next.js `redirect()` in server components issues a 307/308 response.
// We verify the redirect pages exist and export correctly.

describe("Legacy route redirects", () => {
  const redirectCases = [
    {
      name: "workforce-activation",
      from: "/admin/workforce-activation",
      to: "/admin/workforce?tab=setup",
      page: "app/admin/workforce-activation/page.jsx",
    },
    {
      name: "workforce-readiness",
      from: "/admin/workforce-readiness",
      to: "/admin/workforce?tab=readiness",
      page: "app/admin/workforce-readiness/page.jsx",
    },
    {
      name: "agents",
      from: "/admin/agents",
      to: "/admin/workforce?tab=agents",
      page: "app/admin/agents/page.jsx",
    },
    {
      name: "command-center",
      from: "/admin/command-center",
      to: "/admin",
      page: "app/admin/command-center/page.jsx",
    },
  ];

  for (const { name, from, to, page } of redirectCases) {
    describe(`${name} (${from} → ${to})`, () => {
      it(`page module exists at ${page}`, async () => {
        // In Next.js App Router, redirect() throws NEXT_REDIRECT error
        // We verify the file exists and can be imported
        const fs = await import("node:fs");
        const path = await import("node:path");
        const filePath = path.join(process.cwd(), page);
        expect(fs.existsSync(filePath)).toBe(true);
      });

      it("redirects to correct destination", async () => {
        const fs = await import("node:fs");
        const path = await import("node:path");
        const filePath = path.join(process.cwd(), page);
        const content = fs.readFileSync(filePath, "utf-8");
        // Verify the redirect target is present in the file
        expect(content).toContain(`redirect("${to}")`);
      });
    });
  }

  it("all redirect targets are unique", () => {
    const targets = redirectCases.map((c) => c.to);
    const unique = new Set(targets);
    expect(unique.size).toBe(targets.length);
  });

  it("no redirect points to another redirect", () => {
    const froms = new Set(redirectCases.map((c) => c.from));
    for (const { to } of redirectCases) {
      // Strip query params for comparison
      const toPath = to.split("?")[0];
      expect(froms.has(toPath)).toBe(false);
    }
  });
});

describe("Nav structure after consolidation", () => {
    let nav;

    beforeAll(async () => {
      const mod = await import("@/components/admin/nav");
      nav = mod;
    });

    it("workforce group has exactly one entry for /admin/workforce", () => {
    const workforceGroup = nav.ADMIN_NAV_GROUPS.find(
      (g) => g.id === "workforce"
    );
    expect(workforceGroup).toBeDefined();
    const workforceItems = workforceGroup.items.filter(
      (i) =>
        i.href === "/admin/workforce" ||
        i.href.startsWith("/admin/workforce-") ||
        i.href === "/admin/agents"
      );
    expect(workforceItems.length).toBe(1);
    expect(workforceItems[0].href).toBe("/admin/workforce");
    expect(workforceItems[0].label).toBe("Workforce");
  });

    it("operations group does not contain Command Center", () => {
    const opsGroup = nav.ADMIN_NAV_GROUPS.find(
      (g) => g.id === "operations"
    );
    expect(opsGroup).toBeDefined();
    const ccEntry = opsGroup.items.find(
      (i) => i.href === "/admin/command-center"
    );
    expect(ccEntry).toBeUndefined();
  });

    it("legacy /admin/agents href is highlighted under Workforce nav", () => {
    const workforceItem = nav.ADMIN_NAV.find(
      (i) => i.href === "/admin/workforce"
    );
    expect(
      nav.isNavItemCurrent("/admin/agents", workforceItem)
    ).toBe(true);
  });

    it("legacy /admin/workforce-activation href is highlighted under Workforce nav", () => {
    const workforceItem = nav.ADMIN_NAV.find(
      (i) => i.href === "/admin/workforce"
    );
    expect(
      nav.isNavItemCurrent("/admin/workforce-activation", workforceItem)
    ).toBe(true);
  });

  it("legacy /admin/command-center does NOT highlight Workforce", () => {
    const workforceItem = nav.ADMIN_NAV.find(
      (i) => i.href === "/admin/workforce"
    );
    expect(
      nav.isNavItemCurrent("/admin/command-center", workforceItem)
    ).toBe(false);
  });
});
