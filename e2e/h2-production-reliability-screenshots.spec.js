import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/h2-production-reliability");

async function shot(page, name) {
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: true });
}

test.describe("H.2 production reliability Preview screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page, { projectId: "proj-proof-1" });
  });

  test("capture H.2 Founder Control Plane surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/admin/command-center?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "01-command-center");

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "02-founder-proof-plan");

    await page.goto("/admin/runtime/approvals?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("body")).not.toContainText("No approval is currently due");
    await shot(page, "03-approvals");

    await page.goto("/admin/knowledge?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "04-knowledge");

    await page.goto("/admin/planning?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "05-planning");

    await page.goto("/admin/departments?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("founder-quick-start")).toHaveCount(0);
    await shot(page, "06-departments");

    await page.goto("/admin/workflows?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "07-workflows");

    await page.goto("/admin/schedule?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("scheduler-status")).toBeVisible();
    await shot(page, "08-schedule");

    await page.goto("/admin/runtime?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("body")).not.toContainText("New Project");
    await shot(page, "09-runtime-overview");

    await page.goto("/admin/runtime/agents?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "10-runtime-agents");

    await page.goto("/admin/runtime/tasks?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "11-runtime-tasks");

    await page.goto("/admin/runtime/queue?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "12-runtime-queue");

    await page.goto("/admin/runtime/runs?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "13-runtime-runs");

    await page.goto("/admin/runtime/audit?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "14-runtime-audit");

    await page.goto("/admin/settings");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "15-settings");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "16-mobile-founder-proof");

    await page.goto("/admin/runtime?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "17-mobile-runtime");

    const overflowX = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflowX).toBeLessThanOrEqual(8);
  });
});
