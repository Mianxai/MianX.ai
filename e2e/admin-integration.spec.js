import { test, expect } from "@playwright/test";
import {
  installAdminMocks,
  collectPageDiagnostics,
  isExpectedAuthNoise,
  isIgnorableConsoleError,
  VIEWPORTS,
} from "./helpers/admin.js";

test.describe("Phase H Founder integration journey", () => {
  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page);
  });

  test("desktop journey: login shell → integration control room → tabs", async ({
    page,
  }) => {
    const diag = await collectPageDiagnostics(page);
    await page.goto("/admin/integration");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).not.toHaveURL(/\/admin\/login/);
    await expect(page.getByTestId("integration-truth-banner")).toBeVisible();
    await expect(page.getByTestId("integration-dashboard")).toBeVisible();
    await expect(page.getByText(/DETERMINISTIC SIMULATION/i).first()).toBeVisible();

    // No duplicate sidebar links for E2E Integration
    const links = page.locator('nav a[href^="/admin/integration"]');
    expect(await links.count()).toBeLessThanOrEqual(2);

    await page.getByRole("tab", { name: "Objective" }).click();
    await expect(page.getByTestId("integration-objective")).toBeVisible();

    await page.getByRole("tab", { name: "Plan" }).click();
    await expect(page.getByTestId("integration-plan")).toBeVisible();

    await page.getByRole("tab", { name: "Simulation" }).click();
    await expect(page.getByTestId("integration-simulation")).toBeVisible();
    await expect(
      page.getByText(/does not equal a completed real company/i)
    ).toBeVisible();

    await page.getByRole("tab", { name: "Proof Pack" }).click();
    await expect(page.getByTestId("integration-proof")).toBeVisible();

    // Refresh persistence of route
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/\/admin\/integration/);

    const snap = diag.snapshot();
    const bad = snap.consoleErrors.filter(
      (e) => !isIgnorableConsoleError(e) && !isExpectedAuthNoise(e)
    );
    expect(bad).toEqual([]);
  });

  for (const vp of VIEWPORTS) {
    test(`responsive ${vp.name} opens integration`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/admin/integration");
      await page.waitForLoadState("domcontentloaded");
      await expect(page.locator("#main-content, main, .admin-main").first()).toBeVisible();
      await expect(page.getByTestId("integration-truth-banner")).toBeVisible();
    });
  }
});
