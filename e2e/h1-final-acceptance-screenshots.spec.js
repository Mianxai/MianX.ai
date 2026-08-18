import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/h1-final-acceptance");

async function shot(page, name) {
  await page.screenshot({
    path: resolve(OUT, `${name}.png`),
    fullPage: true,
  });
}

test.describe("H.1 final acceptance Preview screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page, { projectId: "proj-proof-1" });
  });

  test("capture Founder Control Plane surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Command Center top
    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("founder-quick-start")).toBeVisible();
    await shot(page, "01-command-center-top");

    // 2. Compact Quick Start collapsed (default)
    await shot(page, "02-quick-start-collapsed");

    // 3. Compact Quick Start expanded
    await page.getByTestId("quick-start-toggle-all").click();
    await expect(page.getByTestId("quick-start-final")).toBeVisible();
    await shot(page, "03-quick-start-expanded");

    // 4–7 Plan review
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("integration-plan-review")).toBeVisible({
      timeout: 15000,
    });
    await shot(page, "04-plan-review-overview");
    await shot(page, "05-wbs-compact-task-list");
    await expect(page.getByTestId("plan-risk-cards")).toBeVisible();
    await shot(page, "06-risk-governance-human");
    await expect(page.getByTestId("sticky-plan-approval-bar")).toBeVisible();
    await shot(page, "07-sticky-approval-bar");

    // 8–9 Objectives
    await page.goto("/admin/objectives?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "08-objectives-default");
    const archivedToggle = page.getByTestId("obj-show-cancelled").first();
    if (await archivedToggle.count()) {
      await archivedToggle.evaluate((el) => {
        if (el instanceof HTMLInputElement && !el.checked) {
          el.click();
        }
      });
    }
    await shot(page, "09-objectives-archived-toggle");

    // 10 Inbox
    await page.goto("/admin/inbox?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("inbox-attention-count")).toContainText("1");
    await shot(page, "10-founder-inbox");

    // 11–12 Agents
    await page.goto("/admin/agents?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("founder-action-banner")).toBeVisible();
    await expect(page.getByTestId("founder-quick-start")).toHaveCount(0);
    await shot(page, "11-agents-summary-filters");
    await shot(page, "12-agents-paginated-list");

    // 13 Workforce ops
    await page.goto("/admin/workforce?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByTestId("founder-quick-start")).toHaveCount(0);
    await shot(page, "13-live-workforce");

    // 14 Company Builder
    await page.goto("/admin/company-builder?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "14-company-builder");

    // 15–16 Advanced Operations
    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    const adv = page.getByTestId("advanced-ops-toggle").first();
    await expect(adv).toHaveAttribute("aria-expanded", "false");
    await shot(page, "15-advanced-ops-collapsed");
    await adv.click();
    await expect(adv).toHaveAttribute("aria-expanded", "true");
    await shot(page, "16-advanced-ops-expanded");

    // 17 Mobile Founder Proof
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      "/admin/integration?project_id=proj-proof-1&tab=plan&run_id=irun-e2e-1"
    );
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "17-mobile-founder-proof");

    // 18 Mobile Agents
    await page.goto("/admin/agents?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "18-mobile-agents");

    const overflowX = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflowX).toBeLessThanOrEqual(8);
  });
});
