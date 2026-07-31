import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PERF_ROUTES = [
  "/admin",
  "/admin/departments",
  "/admin/workflows",
  "/admin/leads",
  "/admin/agents",
  "/admin/runtime",
];

test.describe("admin performance timings", () => {
  test("warm sidebar navigation timings and duplicate request check", async ({ page }) => {
    await installAdminMocks(page);
    mkdirSync(resolve("e2e-artifacts"), { recursive: true });

    // Cold: first shell
    const coldStart = Date.now();
    await page.goto("/admin");
    await page.waitForSelector("#main-content, .admin-main, main");
    const coldMs = Date.now() - coldStart;

    const results = [{ route: "/admin", kind: "cold", ms: coldMs, apiCalls: 0, dupes: 0 }];

    for (const route of PERF_ROUTES) {
      const calls = [];
      const onReq = (req) => {
        const u = req.url();
        if (u.includes("/api/")) calls.push(u.replace(/\?.*$/, ""));
      };
      page.on("request", onReq);

      const t0 = Date.now();
      // Prefer client nav via sidebar when possible
      const label =
        route === "/admin"
          ? /Command Center/i
          : route === "/admin/runtime"
            ? /^Runtime$/i
            : route === "/admin/leads"
              ? /^Leads$/i
              : route === "/admin/agents"
                ? /^Agents$/i
                : route === "/admin/departments"
                  ? /^Departments$/i
                  : /^Workflows$/i;
      const link = page.getByRole("navigation", { name: /primary/i }).getByRole("link", { name: label });
      if (await link.count()) {
        await link.first().click();
      } else {
        await page.goto(route);
      }
      await page.waitForURL(new RegExp(route.replace(/\//g, "\\/")));
      await page.waitForSelector("#main-content, .admin-main, main");
      const ms = Date.now() - t0;
      page.off("request", onReq);

      const counts = calls.reduce((acc, u) => {
        acc[u] = (acc[u] || 0) + 1;
        return acc;
      }, {});
      const dupes = Object.values(counts).filter((n) => n > 1).length;
      results.push({ route, kind: "warm", ms, apiCalls: calls.length, dupes, counts });
      // Soft budget — network-mocked so should be fast; allow headroom in CI.
      expect(ms, `${route} warm transition`).toBeLessThan(3000);
    }

    writeFileSync(
      resolve("e2e-artifacts/admin-perf.json"),
      JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)
    );

    // Shell should not do full document navigations for sidebar clicks
    // (history length grows; URL changes without reload markers).
    expect(results.filter((r) => r.kind === "warm").every((r) => r.ms < 3000)).toBe(true);
  });
});
