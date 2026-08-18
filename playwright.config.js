import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.MIANX_E2E_PORT || 3100);
const BASE_URL = process.env.MIANX_E2E_BASE_URL || `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never", outputFolder: "e2e-report" }]],
  outputDir: "e2e-results",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
    ...devices["Desktop Chrome"],
  },
  webServer: process.env.MIANX_E2E_BASE_URL
    ? undefined
    : {
        // Avoid Next.js network interface discovery failures in sandboxed
        // environments by binding explicitly to loopback.
        command: `npx next start -H 127.0.0.1 -p ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
  projects: [
    {
      name: "admin-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
