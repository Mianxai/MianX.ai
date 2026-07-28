import { test, expect } from "@playwright/test";
import {
  installAdminMocks,
  collectPageDiagnostics,
  isExpectedAuthNoise,
  isIgnorableConsoleError,
  VIEWPORTS,
} from "./helpers/admin.js";

test.describe("Phase H Founder acceptance journey", () => {
  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page);
  });

  test("full Control Room walk: objective → plan inspect → simulation labels", async ({
    page,
  }) => {
    const diag = await collectPageDiagnostics(page);

    await page.goto("/admin/login?returnTo=/admin/integration");
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();

    await page.goto("/admin/integration?project_id=proj-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).not.toHaveURL(/\/admin\/login/);
    await expect(page.getByTestId("integration-truth-banner")).toBeVisible();
    await expect(page.getByText(/DETERMINISTIC SIMULATION/i).first()).toBeVisible();

    const integrationLinks = page.locator('nav a[href^="/admin/integration"]');
    expect(await integrationLinks.count()).toBeLessThanOrEqual(2);

    await page.getByRole("tab", { name: "Objective" }).click();
    await expect(page.getByTestId("integration-objective")).toBeVisible();
    await expect(page.getByLabel(/Unresolved clarification/i)).toBeVisible();
    await expect(page.getByLabel(/Execution mode/i)).toBeVisible();

    await page.getByRole("tab", { name: "Plan" }).click();
    await expect(page.getByTestId("integration-plan")).toBeVisible();

    await page.getByRole("tab", { name: "Simulation" }).click();
    await expect(page.getByTestId("integration-simulation")).toBeVisible();
    await expect(
      page.getByText(/does not equal a completed real company/i)
    ).toBeVisible();

    await page.getByRole("tab", { name: "Proof Pack" }).click();
    await expect(page.getByTestId("integration-proof")).toBeVisible();

    // Refresh persistence
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/\/admin\/integration/);

    // Direct deep link
    await page.goto("/admin/integration?tab=objective&project_id=proj-1&run_id=irun-e2e-1");
    await expect(page.getByTestId("integration-objective")).toBeVisible();

    // Company Builder still reachable
    await page.goto("/admin/company-builder?project_id=proj-1");
    await expect(page).toHaveURL(/\/admin\/company-builder/);
    await expect(page.locator("#main-content, main, .admin-main").first()).toBeVisible();

    const snap = diag.snapshot();
    const bad = snap.consoleErrors.filter(
      (e) => !isIgnorableConsoleError(e) && !isExpectedAuthNoise(e)
    );
    expect(bad).toEqual([]);
  });

  test("production proof panel: preview, confirm dialog, allocation, recovery labels", async ({
    page,
  }) => {
    await page.goto("/admin/integration?project_id=proj-1");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByTestId("production-proof-panel")).toBeVisible();
    await expect(page.getByTestId("proof-status-text")).toBeVisible();
    await expect(page.getByTestId("proof-objective-template")).toBeVisible();
    await expect(page.getByTestId("start-founder-proof")).toBeVisible();

    await page.getByTestId("start-founder-proof").click();
    const dialog = page.getByTestId("proof-confirm-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: /Confirm production proof/i })).toBeVisible();
    await expect(page.getByTestId("proof-confirm-yes")).toBeFocused();

    await page.getByTestId("proof-confirm-yes").click();
    await expect(page.getByTestId("integration-dashboard")).toBeVisible();

    await page.getByRole("tab", { name: "Simulation" }).click();
    await expect(page.getByTestId("agent-allocation")).toBeVisible();
    await expect(page.getByText(/activated_all_36/i)).toBeVisible();
    await expect(page.getByTestId("deterministic-recovery-test")).toBeVisible();
    await expect(page.getByText(/Deterministic recovery test/i).first()).toBeVisible();
    await expect(page.getByTestId("simulation-progress")).toBeVisible();

    await page.getByRole("tab", { name: "Evidence" }).click();
    await page.getByRole("tab", { name: "Memory" }).click();
    await page.getByRole("tab", { name: "Learning" }).click();
    await page.getByRole("tab", { name: "Proof Pack" }).click();
    await expect(page.getByTestId("integration-proof")).toBeVisible();
    await expect(page.getByText(/Lineage/i)).toBeVisible();

    // Persisted refresh (mocked API) — Control Room hosts the proof panel
    await page.goto("/admin/integration?project_id=proj-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("production-proof-panel")).toBeVisible();
  });

  for (const vp of VIEWPORTS) {
    test(`responsive ${vp.name} Founder integration shell`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/admin/integration?project_id=proj-1");
      await page.waitForLoadState("domcontentloaded");
      await expect(page.locator("#main-content, main, .admin-main").first()).toBeVisible();
      await expect(page.getByTestId("integration-truth-banner")).toBeVisible();
      await expect(page.getByTestId("production-proof-panel")).toBeVisible();
    });
  }
});
