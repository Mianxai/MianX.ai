import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/h1-truth-reconciliation");

async function shot(page, name) {
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: true });
}

test.describe("H.1 truth reconciliation Preview screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page, { projectId: "proj-proof-1" });
  });

  test("capture truth-reconciliation surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "01-command-center");

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "02-founder-proof");

    await page.goto("/admin/departments?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("founder-action-banner")).toBeVisible();
    await expect(page.getByTestId("founder-quick-start")).toHaveCount(0);
    await shot(page, "03-departments-top");
    await shot(page, "04-departments-table");

    await page.goto("/admin/workflows?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "05-workflows-top");
    await shot(page, "06-workflows-list");

    await page.goto("/admin/schedule?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "07-schedule");

    await page.goto("/admin/projects");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "08-projects");

    await page.goto("/admin/runtime/approvals?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("body")).not.toContainText("No approval is currently due");
    await expect(page.locator("body")).not.toContainText("Open Integration");
    await shot(page, "09-approvals-founder-proof");
    await shot(page, "10-approvals-runtime-empty");

    await page.goto("/admin/knowledge?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("body")).not.toContainText(
      "No Global template catalogue yet"
    );
    await shot(page, "11-knowledge-catalogue");

    await page.goto("/admin/templates?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "12-templates");

    await page.goto("/admin/planning?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "13-planning");

    await page.goto("/admin/memory?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "14-memory");

    await page.goto("/admin/learning?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "15-learning");

    await page.goto("/admin/outputs?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "16-outputs");

    await page.goto("/admin/analytics?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "17-analytics");

    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    const adv = page.getByTestId("advanced-ops-toggle").first();
    await expect(adv).toHaveAttribute("aria-expanded", /false|true/);
    if ((await adv.getAttribute("aria-expanded")) === "true") {
      await adv.click();
    }
    await expect(adv).toHaveAttribute("aria-expanded", "false");
    await shot(page, "18-advanced-ops-collapsed");
    await adv.click();
    await expect(adv).toHaveAttribute("aria-expanded", "true");
    await shot(page, "19-advanced-ops-expanded");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/admin/departments?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "20-mobile-action-strip");
    await shot(page, "21-mobile-departments");

    await page.goto("/admin/projects");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "22-mobile-projects");

    const overflowX = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflowX).toBeLessThanOrEqual(8);
  });
});
