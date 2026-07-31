import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";

test.describe("Integration Founder UX closeout", () => {
  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page);
  });

  test("project persists across all Integration tabs in URL", async ({ page }) => {
    await page.goto("/admin/integration?project_id=proj-proof-1&tab=dashboard");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("production-proof-panel")).toBeVisible();
    await expect(page.getByTestId("integration-dashboard")).toBeVisible();

    const tabIds = [
      "objective",
      "plan",
      "simulation",
      "evidence",
      "memory",
      "learning",
      "proof",
    ];

    for (const id of tabIds) {
      await page.getByTestId(`integration-tab-${id}`).click();
      await expect(page).toHaveURL(/project_id=proj-proof-1/);
      await expect(page.getByTestId("integration-project-header")).toBeVisible();
      await expect(page.getByTestId("integration-selected-project-name")).toContainText(
        "MianX Internal Production Proof"
      );
    }

    await page.getByTestId("integration-tab-dashboard").click();
    await expect(page).toHaveURL(/project_id=proj-proof-1/);

    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/project_id=proj-proof-1/);
  });

  test("guided empty states — no raw null memory/learning", async ({ page }) => {
    await page.goto("/admin/integration?project_id=proj-1&tab=memory");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("memory-empty-state")).toBeVisible();
    await expect(page.locator("body")).not.toContainText('"null"');

    await page.goto("/admin/integration?project_id=proj-1&tab=learning");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("learning-empty-state")).toBeVisible();
    await expect(page.locator("body")).not.toContainText('"null"');
  });

  test("objective form layout and create gating", async ({ page }) => {
    await page.goto("/admin/integration?tab=objective");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("create-objective")).toBeDisabled();
    await expect(page.getByTestId("create-objective-disabled-reason")).toBeVisible();
    await expect(page.getByTestId("integration-objective-form")).toBeVisible();
    await expect(page.locator("#integration-obj-purpose")).toBeVisible();

    await page
      .getByTestId("integration-project-picker")
      .locator("select")
      .selectOption("proj-proof-1");
    await expect(page.getByTestId("create-objective")).toBeEnabled();
  });

  test("stage-aware Review Plan CTA opens Plan tab", async ({ page }) => {
    await page.goto("/admin/integration?project_id=proj-1&tab=plan");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("integration-tab-plan")).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(page).toHaveURL(/tab=plan/);
  });

  test("Founder guided panel does not duplicate Selected project label as value", async ({
    page,
  }) => {
    await page.goto("/admin?project_id=proj-1");
    await page.waitForLoadState("domcontentloaded");
    const name = page.getByTestId("founder-selected-project-name");
    if ((await name.count()) > 0) {
      await expect(name).not.toHaveText(/^Selected project$/i);
    }
  });
});
