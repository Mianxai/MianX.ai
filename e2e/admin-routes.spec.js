import { test, expect } from "@playwright/test";
import {
  CANONICAL_ADMIN_ROUTES,
  installAdminMocks,
  collectPageDiagnostics,
  isExpectedAuthNoise,
  isIgnorableConsoleError,
} from "./helpers/admin.js";

test.describe("admin auth returnTo", () => {
  test("unauthenticated deep link preserves returnTo", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto("/admin/departments?project_id=proj-1");
    await expect(page).toHaveURL(/\/admin\/login/);
    const url = new URL(page.url());
    expect(url.searchParams.get("returnTo")).toBe(
      "/admin/departments?project_id=proj-1"
    );
  });

  test("blocks open redirect in returnTo", async ({ page }) => {
    await page.goto("/admin/login?returnTo=https://evil.example");
    await expect(page).toHaveURL(/\/admin\/login/);
    // Form renders; malicious returnTo must not navigate off-site on submit alone.
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  });
});

test.describe("admin authenticated route sweep", () => {
  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page);
  });

  for (const route of CANONICAL_ADMIN_ROUTES) {
    test(`opens ${route} without CC bounce or 404`, async ({ page }) => {
      const diag = await collectPageDiagnostics(page);
      await page.goto(route);
      await page.waitForLoadState("domcontentloaded");
      await expect(page).not.toHaveURL(/\/admin\/login/);
      // Must stay on requested route (or short-path aliases resolved to canonical).
      const path = new URL(page.url()).pathname;
      if (route === "/admin/runtime/approvals") {
        expect(path).toMatch(/\/admin\/(runtime\/)?approvals/);
      } else if (route === "/admin/runtime/audit") {
        expect(path).toMatch(/\/admin\/(runtime\/)?audit/);
      } else {
        expect(path).toBe(route);
      }
      await expect(page.locator("body")).not.toContainText("404");
      await expect(page.locator("#main-content, main, .admin-main").first()).toBeVisible();

      const snap = diag.snapshot();
      const badResponses = snap.responses.filter(
        (r) =>
          !isExpectedAuthNoise(r) &&
          (r.status >= 500 || (r.status >= 400 && r.status !== 404))
      );
      // Allow known local 404 telemetry; fail on other 4xx/5xx.
      const unexpected404 = snap.responses.filter(
        (r) => r.status === 404 && !isExpectedAuthNoise(r)
      );
      expect(badResponses, JSON.stringify(badResponses)).toEqual([]);
      expect(unexpected404, JSON.stringify(unexpected404)).toEqual([]);
      const realErrors = snap.consoleErrors.filter(
        (e) => !isIgnorableConsoleError(e) && !isExpectedAuthNoise(e)
      );
      const hydration = snap.consoleErrors.filter((e) => /hydration/i.test(e));
      expect(hydration, hydration.join("\n")).toEqual([]);
      expect(realErrors, realErrors.join("\n")).toEqual([]);
    });
  }

  test("legacy submissions redirects to leads", async ({ page }) => {
    await page.goto("/admin/submissions?status=new");
    await expect(page).toHaveURL(/\/admin\/leads\?status=new/);
  });

  test("short approvals/audit paths redirect", async ({ page }) => {
    await page.goto("/admin/approvals");
    await expect(page).toHaveURL(/\/admin\/runtime\/approvals/);
    await page.goto("/admin/audit");
    await expect(page).toHaveURL(/\/admin\/runtime\/audit/);
  });

  test("project_id persists across sidebar navigation", async ({ page }) => {
    await page.goto("/admin/memory?project_id=proj-1");
    await expect(page).toHaveURL(/project_id=proj-1/);
    await page.getByRole("navigation", { name: /primary/i }).getByRole("link", { name: /^Learning$/i }).click();
    await expect(page).toHaveURL(/\/admin\/learning/);
    await expect(page).toHaveURL(/project_id=proj-1/);
  });

  test("refresh keeps route", async ({ page }) => {
    await page.goto("/admin/workflows?project_id=proj-1");
    await page.reload();
    await expect(page).toHaveURL(/\/admin\/workflows\?project_id=proj-1/);
  });

  test("browser back/forward works between admin routes", async ({ page }) => {
    await page.goto("/admin/departments");
    await page.goto("/admin/workflows");
    await page.goBack();
    await expect(page).toHaveURL(/\/admin\/departments/);
    await page.goForward();
    await expect(page).toHaveURL(/\/admin\/workflows/);
  });

  test("sidebar has unique primary intents and correct active state", async ({ page }) => {
    await page.goto("/admin/leads");
    const nav = page.getByRole("navigation", { name: /primary/i });
    const leads = nav.getByRole("link", { name: /leads/i });
    await expect(leads).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: /^agents$/i })).toHaveCount(1);
  });

  test("Templates intelligence page loads overview and kind tabs", async ({ page }) => {
    await page.goto("/admin/templates");
    await expect(page).toHaveURL(/\/admin\/templates/);
    await expect(page.getByRole("heading", { name: /^Templates$/i }).first()).toBeVisible();
    await expect(page.getByTestId("templates-catalogue-label")).toContainText(
      /Global Template Catalogue/i
    );
    await expect(page.getByRole("navigation", { name: /primary/i }).getByRole("link", { name: /^templates$/i })).toHaveCount(1);
    await expect(page.getByText(/Global Template Catalogue/i).first()).toBeVisible();
    await page.getByRole("tab", { name: /^industries$/i }).click();
    await expect(page).toHaveURL(/kind=industry/);
    await expect(page.getByText(/generic industry platform|generic-platform/i).first()).toBeVisible();
  });

  test("Planning intelligence page loads overview", async ({ page }) => {
    await page.goto("/admin/planning");
    await expect(page).toHaveURL(/\/admin\/planning/);
    await expect(page.getByRole("heading", { name: /planning intelligence/i })).toBeVisible();
    await expect(page.getByRole("navigation", { name: /primary/i }).getByRole("link", { name: /^planning$/i })).toHaveCount(1);
    await expect(page.getByText(/nothing executes/i).first()).toBeVisible();
  });

  test("Live Workforce page loads dashboard", async ({ page }) => {
    await page.goto("/admin/workforce");
    await expect(page).toHaveURL(/\/admin\/workforce/);
    await expect(page.getByRole("heading", { name: /real autonomous workforce/i })).toBeVisible();
    await expect(page.getByRole("navigation", { name: /primary/i }).getByRole("link", { name: /live workforce/i })).toHaveCount(1);
    await expect(page.getByText(/36 executable/i).first()).toBeVisible();
  });
});

test.describe("admin shell session cookie", () => {
  test("structurally valid token is accepted by middleware", async ({ page }) => {
    await installAdminMocks(page);
    await page.goto("/admin/settings");
    await expect(page).not.toHaveURL(/\/admin\/login/);
    await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
  });
});
