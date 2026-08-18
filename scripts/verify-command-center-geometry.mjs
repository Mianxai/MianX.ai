#!/usr/bin/env node
/**
 * Command Center layout contracts across Founder viewports (fixture).
 * Asserts: no horizontal overflow; desktop network on wide; list on ≤900px.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runVerifier } from "./lib/browser-harness.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "app/admin/admin.css"), "utf8");
const globals = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");

const VIEWPORTS = [
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [360, 800],
];

function fixtureHtml() {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>${globals}\n${css}
body{margin:0;background:var(--bg-dark);color:var(--text-primary)}
</style></head><body>
<main class="admin-main" style="margin-left:0;padding:1rem;max-width:100vw;overflow-x:hidden">
  <div class="cc-page">
    <section class="cc-metrics" aria-label="metrics">
      <div class="cc-metric"><div class="cc-metric-label">Active</div><div class="cc-metric-value">1</div></div>
      <div class="cc-metric"><div class="cc-metric-label">Idle</div><div class="cc-metric-value"><span class="cc-unavailable">Data unavailable</span></div></div>
    </section>
    <div class="cc-layout">
      <nav class="cc-dept-rail" aria-label="Departments">
        <button type="button" class="active">All departments</button>
        <ul><li><button type="button">Leadership <span class="cc-dept-count">11</span></button></li></ul>
      </nav>
      <div class="cc-main-col">
        <div class="cc-network-desktop">
          <section class="cc-card cc-network" aria-labelledby="cc-network-h">
            <h2 id="cc-network-h">Agent network</h2>
            <div class="cc-hierarchy">
              <div class="cc-founder-node"><span class="cc-founder-badge">Founder</span></div>
              <div class="cc-hierarchy-link"><span class="cc-hierarchy-line"></span></div>
              <button type="button" class="cc-ceo-node"><span class="cc-ceo-node-title">CEO</span></button>
              <div class="cc-hierarchy-link"><span class="cc-hierarchy-line"></span></div>
              <ul class="cc-spec-grid">
                <li><button type="button" class="cc-spec-card"><strong class="cc-spec-name">CTO</strong></button></li>
                <li><button type="button" class="cc-spec-card"><strong class="cc-spec-name">CPO</strong></button></li>
              </ul>
            </div>
          </section>
        </div>
        <div class="cc-network-mobile">
          <section class="cc-card" aria-labelledby="cc-list-h">
            <h2 id="cc-list-h">Agents</h2>
            <ul class="cc-agent-list"><li><button type="button" class="cc-agent-card"><strong>CEO</strong><span class="cc-status-pill">Idle</span></button></li></ul>
          </section>
        </div>
      </div>
      <aside class="cc-side-col"><section class="cc-card"><h2>Agent detail</h2></section></aside>
    </div>
  </div>
</main>
</body></html>`;
}

function measureExpression() {
  return `(() => {
    const desktop = getComputedStyle(document.querySelector('.cc-network-desktop')).display;
    const mobile = getComputedStyle(document.querySelector('.cc-network-mobile')).display;
    return {
      ok: true,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      desktopVisible: desktop !== 'none',
      mobileVisible: mobile !== 'none',
      narrow: window.innerWidth <= 900,
    };
  })()`;
}

await runVerifier("command-center-geometry", async (harness) => {
  const { url } = await harness.serveFixture(fixtureHtml());
  const { client, port } = await harness.launchChrome();
  console.log(`[command-center-geometry] fixture cdp=${port}`);
  const page = await client.newPage("about:blank");
  const results = [];

  for (const [w, h] of VIEWPORTS) {
    harness.assertionLabel = `command-center @ ${w}x${h}`;
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w <= 768,
    });
    await page.navigate(url);
    const geo = (await page.evaluate(measureExpression())) || { ok: false };
    const noOverflow = geo.scrollWidth <= geo.clientWidth + 1;
    const layoutOk = geo.narrow
      ? geo.mobileVisible && !geo.desktopVisible
      : geo.desktopVisible;
    const pass = geo.ok && noOverflow && layoutOk;
    results.push({ w, h, pass, ...geo, noOverflow });
    console.log(
      `${w}x${h}: ${pass ? "PASS" : "FAIL"} overflowOk=${noOverflow} desktop=${geo.desktopVisible} mobile=${geo.mobileVisible}`
    );
  }

  const failed = results.filter((r) => !r.pass);
  if (failed.length) {
    console.error(`FAIL: ${failed.length} viewport(s)`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: command-center layout at all ${results.length} viewports`);
  }
});
