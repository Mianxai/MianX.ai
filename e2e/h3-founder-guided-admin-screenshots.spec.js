import { test, expect } from "@playwright/test";
import { installAdminMocks } from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/h3-founder-guided-admin");

async function shot(page, name) {
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: true });
}

test.describe("H.3 Founder guided admin screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await installAdminMocks(page, { projectId: "proj-proof-1" });
    await page.addInitScript(() => {
      try {
        window.localStorage.setItem("mianx.founder.tour.v1.anon", "dismissed");
      } catch {
        /* ignore */
      }
    });
  });

  test("capture Founder Mode surfaces @ 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await shot(page, "01-founder-home");

    await page.goto("/admin/integration?project_id=proj-proof-1&tab=plan");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "02-founder-proof-plan");

    await page.goto("/admin/inbox?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "03-founder-inbox");

    await page.goto("/admin/agents?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "04-workforce");

    await page.goto("/admin/outputs?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "05-results");

    await page.goto("/admin/settings");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "06-readiness-centre");

    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await page.getByRole("button", { name: /^Help$/i }).click();
    await expect(page.getByTestId("founder-help-drawer")).toBeVisible();
    await shot(page, "07-help-drawer");
    await page.keyboard.press("Escape");

    await shot(page, "08-advanced-ops-collapsed");
  });

  test("no-active and recovery states via mock @ 1280", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.route("**/api/admin/operations/summary**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          project_id: "proj-proof-1",
          project_name: "MianX Internal Production Proof",
          project: {
            id: "proj-proof-1",
            name: "MianX Internal Production Proof",
            status: "active",
          },
          canonical_integration_run: null,
          integration: {
            runs: [],
            duplicate_runs: [],
            active_founder_proof_run_count: 0,
            duplicate_count: 0,
            duplicate_warning: false,
          },
          founder_proof_ui: {
            state: "no_proof",
            title: "No active Founder Proof",
            explanation: "This project has no Founder Proof run yet.",
            severity: "action_required",
            caseId: "empty",
            primaryCta: {
              id: "start_new_proof",
              label: "Start Founder Proof",
              href: "/admin/integration?project_id=proj-proof-1&tab=objective",
              requiresConfirmation: true,
            },
            willHappen: ["Creates a new Founder Proof after confirmation."],
            willNotHappen: ["Does not approve anything", "Does not start simulation"],
          },
          proof_persistence: { ok: true, error: null, source: "persisted_integration_runs" },
          next_founder_action: {
            id: "start_proof",
            label: "Start Founder Proof",
            href: "/admin/integration",
            severity: "action_required",
          },
          objectives: [],
          approvals_pending: 0,
        }),
      });
    });

    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "09-no-active-proof");

    await page.unroute("**/api/admin/operations/summary**");
    await page.route("**/api/admin/operations/summary**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          project_id: "proj-proof-1",
          project_name: "MianX Internal Production Proof",
          founder_proof_ui: {
            state: "awaiting_plan_approval",
            title: "Resume Founder Proof",
            explanation: "A non-terminal proof exists.",
            severity: "action_required",
            caseId: "resumable_historical",
            primaryCta: {
              id: "resume_proof",
              label: "Resume Founder Proof",
              href: "/admin/integration?project_id=proj-proof-1&tab=plan",
            },
            willNotHappen: ["Does not create a new objective or run"],
          },
          proof_persistence: { ok: true, error: null },
          next_founder_action: {
            id: "review_plan",
            label: "Review Plan",
            href: "/admin/integration?tab=plan",
          },
          objectives: [],
          approvals_pending: 0,
        }),
      });
    });
    await page.goto("/admin?project_id=proj-proof-1");
    await page.waitForLoadState("domcontentloaded");
    await shot(page, "10-resumable-proof");
  });

  test("responsive matrix", async ({ page }) => {
    const viewports = [
      { w: 390, h: 844, name: "390x844" },
      { w: 768, h: 1024, name: "768x1024" },
      { w: 1024, h: 768, name: "1024x768" },
      { w: 1280, h: 800, name: "1280x800" },
      { w: 1440, h: 900, name: "1440x900" },
    ];
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.w, height: vp.h });
      await page.goto("/admin?project_id=proj-proof-1");
      await page.waitForLoadState("domcontentloaded");
      await shot(page, `responsive-${vp.name}-home`);
      if (vp.w <= 768) {
        await shot(page, `responsive-${vp.name}-mobile-nav`);
      }
    }
  });
});
