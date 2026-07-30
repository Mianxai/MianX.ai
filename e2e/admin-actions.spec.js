import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";

/**
 * Primary action smoke — mocked APIs, no paid provider calls.
 */
test.describe("admin primary actions", () => {
  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page);
  });

  test("objectives page renders actionable empty or create UI", async ({ page }) => {
    await page.goto("/admin/objectives?project_id=proj-1");
    await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
    const btn = page.getByRole("button", { name: /new objective|create objective|add objective/i });
    const empty = page.getByRole("status").or(page.getByText(/objective/i));
    expect((await btn.count()) + (await empty.count())).toBeGreaterThan(0);
    if (await btn.count()) {
      await expect(btn.first()).toBeEnabled();
      await btn.first().click();
      await page.waitForTimeout(200);
    }
  });

  test("company builder page renders generate control or setup empty state", async ({ page }) => {
    await page.goto("/admin/company-builder?project_id=proj-1");
    await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
    const btn = page.getByRole("button", { name: /generate blueprint|generate|create blueprint/i });
    if (await btn.count()) {
      await btn.first().click();
      await page.waitForTimeout(200);
    }
    await expect(page.locator("body")).not.toContainText("Unhandled Runtime");
  });

  test("leads page opens with Leads heading", async ({ page }) => {
    await page.goto("/admin/leads");
    await expect(page.getByRole("heading", { name: /leads/i }).first()).toBeVisible();
    const refresh = page.getByRole("button", { name: /refresh/i });
    if (await refresh.count()) await refresh.first().click();
  });

  test("projects page renders", async ({ page }) => {
    await page.goto("/admin/projects");
    await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
    const btn = page.getByRole("button", { name: /new project|create project|add project/i });
    if (await btn.count()) {
      await expect(btn.first()).toBeEnabled();
    }
  });

  test("runtime page renders controls", async ({ page }) => {
    await page.goto("/admin/runtime");
    await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
    const refresh = page.getByRole("button", { name: /refresh/i });
    if (await refresh.count()) await refresh.first().click();
  });

  test("mobile nav opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/admin/command-center");
    await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
    await page.getByRole("button", { name: /open navigation/i }).click();
    const aside = page.locator("aside.admin-sidebar").first();
    await expect(aside).toHaveClass(/open/);
    // Founder Mode primary link (Leads lives under collapsed Advanced Operations).
    const projects = aside.getByRole("link", { name: /^projects$/i }).first();
    await projects.evaluate((el) => {
      el.scrollIntoView({ block: "center", inline: "nearest" });
      el.click();
    });
    await expect(page).toHaveURL(/\/admin\/projects/, { timeout: 15_000 });
  });

  test("logout control navigates to login when present", async ({ page }) => {
    await page.goto("/admin/settings");
    const logout = page.getByRole("button", { name: /log out|sign out|logout/i });
    if (await logout.count()) {
      await logout.first().click();
      await expect(page).toHaveURL(/\/admin\/login/);
    } else {
      await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
    }
  });

  test("memory keeps project query", async ({ page }) => {
    await page.goto("/admin/memory?project_id=proj-1");
    await expect(page).toHaveURL(/project_id=proj-1/);
    await expect(page.locator("#main-content, .admin-main, main").first()).toBeVisible();
  });
});
