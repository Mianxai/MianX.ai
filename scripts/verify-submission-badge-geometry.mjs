#!/usr/bin/env node
/**
 * Real-browser badge layout contract (fixture).
 * Asserts the submissions badge does not shift sidebar width and has no overflow
 * at the Founder viewports. Does not require authenticated admin.
 *
 * Usage: node scripts/verify-submission-badge-geometry.mjs
 *
 * Ports are allocated dynamically by scripts/lib/browser-harness.mjs — there is
 * no fixed remote-debugging or fixture port to collide with.
 */
import { runVerifier } from "./lib/browser-harness.mjs";

const VIEWPORTS = [
  [1440, 900],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [360, 800],
];

function fixtureHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  *{box-sizing:border-box} body{margin:0;background:#060814;color:#f8fafc;font-family:system-ui}
  .admin-app{display:flex;min-height:100dvh;overflow-x:hidden;max-width:100vw}
  .admin-sidebar{width:260px;background:#0a0e1c;border-right:1px solid #1e2740;padding:1.5rem;position:fixed;height:100dvh}
  .sidebar-nav{list-style:none;padding:0;margin:0}
  .sidebar-nav a{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;color:#9fb0cc;text-decoration:none;border-radius:10px}
  .sidebar-badge{margin-left:auto;flex-shrink:0;box-sizing:border-box;min-width:22px;height:22px;padding:0 .4rem;display:inline-flex;align-items:center;justify-content:center;background:#ef4444;color:#fff;font-size:.7rem;font-weight:700;border-radius:999px}
  .admin-main{flex:1;margin-left:260px;padding:2rem}
  @media (max-width:900px){.admin-sidebar{transform:translateX(0);position:relative;width:100%;height:auto}.admin-main{margin-left:0}}
</style></head><body>
<div class="admin-app">
  <aside class="admin-sidebar" aria-label="Admin navigation">
    <ul class="sidebar-nav">
      <li><a href="/admin">Overview</a></li>
      <li><a href="/admin/submissions">Submissions <span class="sidebar-badge" data-testid="submissions-badge" aria-label="6 new submissions">6</span></a></li>
      <li><a href="/admin/projects">Projects</a></li>
    </ul>
  </aside>
  <main class="admin-main"><h1>Overview</h1></main>
</div>
</body></html>`;
}

function measureExpression() {
  return `(() => {
    const badge = document.querySelector('[data-testid="submissions-badge"]');
    const sidebar = document.querySelector('.admin-sidebar');
    if (!badge || !sidebar) return { ok:false };
    const br = badge.getBoundingClientRect();
    const sr = sidebar.getBoundingClientRect();
    return {
      ok: true,
      badgeW: br.width, badgeH: br.height,
      sidebarW: sr.width,
      aria: badge.getAttribute('aria-label'),
      text: badge.textContent,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  })()`;
}

await runVerifier("submission-badge-geometry", async (harness) => {
  const { url } = await harness.serveFixture(fixtureHtml());
  const { client, port } = await harness.launchChrome();
  console.log(`[submission-badge-geometry] app=${harness.appPort} cdp=${port}`);
  const page = await client.newPage("about:blank");

  let failed = 0;
  for (const [w, h] of VIEWPORTS) {
    harness.assertionLabel = `submissions badge @ ${w}x${h}`;
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w <= 768,
    });
    await page.navigate(url);
    const geo = await page.evaluate(measureExpression());
    const pass =
      geo.ok &&
      geo.badgeH >= 20 &&
      geo.badgeW >= 20 &&
      geo.overflow <= 1 &&
      geo.aria?.includes("new submission") &&
      geo.text === "6";
    console.log(
      `${w}x${h}: ${pass ? "PASS" : "FAIL"} badge=${Number(geo.badgeW).toFixed(0)}x${Number(geo.badgeH).toFixed(0)} overflow=${geo.overflow} aria=${geo.aria}`
    );
    if (!pass) failed += 1;
  }
  if (failed) {
    console.error(`FAIL: ${failed} viewport(s)`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: badge layout OK at all ${VIEWPORTS.length} viewports`);
  }
});
