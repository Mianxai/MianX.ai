import { test, expect } from "@playwright/test";
import {
  SCREENSHOT_ROUTES,
  VIEWPORTS,
  installAdminMocks,
} from "./helpers/admin.js";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("e2e-artifacts/responsive");

test.describe("admin responsive screenshot matrix", () => {
  test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
  });

  for (const vp of VIEWPORTS) {
    for (const route of SCREENSHOT_ROUTES) {
      const slug = route.replace(/\//g, "_").replace(/^_/, "");
      test(`${vp.name} ${route}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await installAdminMocks(page);
        await page.goto(route);
        await page.waitForLoadState("networkidle").catch(() => {});
        // No unexpected horizontal document scroll beyond 8px tolerance.
        const overflowX = await page.evaluate(() => {
          const doc = document.documentElement;
          return doc.scrollWidth - doc.clientWidth;
        });
        expect(overflowX, `horizontal overflow on ${route} @ ${vp.name}`).toBeLessThanOrEqual(8);

        const file = resolve(OUT, `${vp.name}${slug}.png`);
        await page.screenshot({ path: file, fullPage: true });
        // Visible main landmark
        await expect(page.locator("#main-content, main, .admin-main").first()).toBeVisible();
      });
    }
  }
});
