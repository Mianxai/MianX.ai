import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/h31-plan-correctness");

async function shot(page, name) {
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: true });
}

test.describe("H.3.1 Founder plan correctness screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page, { projectId: "proj-proof-1" });
  });

  test("capture plan review surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "01-founder-home");

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=dashboard&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "02-founder-proof-overview");

    const diagnostics = page.getByTestId("proof-diagnostics-panel");
    if (await diagnostics.count()) {
      // H.3.2 nests diagnostics under collapsed Advanced / Technical details —
      // expand parent before clicking the nested summary (otherwise not visible).
      const tech = page.getByTestId("technical-details");
      if (await tech.count()) {
        const techSummary = tech.locator(":scope > summary");
        if (await techSummary.count()) {
          await techSummary.click();
        }
      }
      const diagSummary = diagnostics.locator(":scope > summary");
      await diagSummary.scrollIntoViewIfNeeded();
      await diagSummary.click({ force: false });
      await shot(page, "03-founder-proof-diagnostics");
    }

    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("body")).toBeVisible();
    await shot(page, "04-plan-review-top");

    const metrics = page.getByTestId("plan-metrics");
    if (await metrics.count()) {
      await metrics.scrollIntoViewIfNeeded();
      await shot(page, "05-plan-metrics-deps");
    }

    const agents = page.getByTestId("plan-agents");
    if (await agents.count()) {
      await agents.scrollIntoViewIfNeeded();
      await shot(page, "06-proposed-agents");
    }

    const wbs = page.getByTestId("plan-wbs");
    if (await wbs.count()) {
      await wbs.scrollIntoViewIfNeeded();
      await shot(page, "07-work-breakdown");
    }

    const risks = page.getByTestId("plan-risks");
    if (await risks.count()) {
      await risks.scrollIntoViewIfNeeded();
      await shot(page, "08-risks-protected");
    }

    const pack = page.getByTestId("plan-approval-package");
    if (await pack.count()) {
      await pack.scrollIntoViewIfNeeded();
      await shot(page, "09-approval-package");
    }

    const approve = page.getByTestId("approve-plan-for-simulation");
    if ((await approve.count()) && (await approve.isEnabled())) {
      await approve.click();
      await shot(page, "10-confirmation-modal");
      await page.keyboard.press("Escape");
    } else {
      await shot(page, "10-confirmation-modal");
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "11-mobile-390");

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "12-tablet-768");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "13-desktop-1440");
  });
});
