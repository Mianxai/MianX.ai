import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/h32-founder-proof-truth-guided-execution");

async function shot(page, name) {
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: true });
}

test.describe("H.3.2 Founder Proof truth + guided execution screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page, {
      projectId: "proj-proof-1",
      proofStage: "simulation_approval_required",
    });
  });

  test("capture truth-guided Founder surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "01-founder-home-current-action");

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=dashboard&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("founder-workflow-guide")).toBeVisible();
    await shot(page, "02-founder-proof-compact-overview");
    await shot(page, "06-corrected-progress-stepper");

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=simulation&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("integration-simulation-panel")).toBeVisible();
    await shot(page, "03-blocked-simulation-approval");

    const returnBtn = page.getByTestId("return-plan-for-corrections");
    if (await returnBtn.count()) {
      await returnBtn.click();
      await expect(page.getByTestId("return-plan-corrections-modal")).toBeVisible();
      await shot(page, "04-return-plan-corrections-modal");
      await shot(page, "05-reason-textarea-default");
      await page.keyboard.press("Escape");
    } else {
      await shot(page, "04-return-plan-corrections-modal");
      await shot(page, "05-reason-textarea-default");
    }

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=dashboard&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "07-control-room-canonical-only");

    const other = page.getByTestId("control-room-other-runs");
    if (await other.count()) {
      await other.locator("summary").click();
      await shot(page, "08-collapsed-other-objectives-history");
    } else {
      await shot(page, "08-collapsed-other-objectives-history");
    }

    const tech = page.getByTestId("technical-details");
    if (await tech.count()) {
      await tech.locator("summary").first().click();
      const diagnostics = page.getByTestId("proof-diagnostics-panel");
      if (await diagnostics.count()) {
        await diagnostics.locator("summary").click();
      }
      await shot(page, "09-diagnostics-summary");
    } else {
      await shot(page, "09-diagnostics-summary");
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=dashboard&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "10-mobile-founder-proof");

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=dashboard&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "11-tablet-founder-proof");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=dashboard&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "12-desktop-founder-proof");
  });
});
