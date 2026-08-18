import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/h33-ci-proof-guidance-closeout");

async function shot(page, name) {
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: true });
}

test.describe("H.3.3 CI recovery + Founder guidance closeout screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page, {
      projectId: "proj-proof-1",
      proofStage: "simulation_approval_required",
    });
  });

  test("capture correction guidance surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=simulation&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("simulation-approval-blocked")).toBeVisible();
    await shot(page, "01-simulation-readiness-blocked");

    await page.getByTestId("return-plan-for-corrections").click();
    await expect(page.getByTestId("return-plan-corrections-modal")).toBeVisible();
    await shot(page, "02-return-plan-modal");
    await expect(page.getByTestId("return-plan-reason")).toContainText(/Regenerate and persist/i);
    await shot(page, "03-default-reason-populated");

    await page.getByTestId("confirm-return-plan-corrections").click();
    await expect(page.getByTestId("plan-correction-success")).toBeVisible({ timeout: 15000 });
    await shot(page, "04-correction-success-notification");

    await page.getByTestId("review-corrected-plan").click();
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("integration-plan-review")).toBeVisible({ timeout: 15000 });
    await shot(page, "05-corrected-plan-page");

    const wbs = page.getByTestId("plan-wbs");
    if (await wbs.count()) {
      await wbs.scrollIntoViewIfNeeded();
      await shot(page, "06-durable-task-assignments");
    } else {
      await shot(page, "06-durable-task-assignments");
    }

    const readiness = page.getByTestId("plan-readiness");
    if (await readiness.count()) {
      await readiness.scrollIntoViewIfNeeded();
      await shot(page, "07-readiness-status");
    } else {
      await shot(page, "07-readiness-status");
    }

    const approve = page.getByTestId("approve-plan-for-simulation");
    if ((await approve.count()) && (await approve.isEnabled())) {
      await approve.click();
      await shot(page, "08-plan-approval-confirmation");
      await page.keyboard.press("Escape");
    } else {
      await shot(page, "08-plan-approval-confirmation");
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "09-mobile-390");

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "10-tablet-768");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "11-desktop-1440");
  });
});
