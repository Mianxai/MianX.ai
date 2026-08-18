#!/usr/bin/env node
/**
 * Capture Agent Network / Command Center layout screenshots across viewports.
 * Writes PNGs under /tmp/mianx-go-live-screenshots/ (not committed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runVerifier } from "./lib/browser-harness.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "app/admin/admin.css"), "utf8");
const globals = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
const outDir = "/tmp/mianx-go-live-screenshots";

const VIEWPORTS = [
  [1440, 900],
  [1280, 800],
  [1126, 800],
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
body{margin:0;background:var(--bg-dark);color:var(--text-primary);font-family:system-ui,sans-serif}
</style></head><body>
<main class="admin-main" style="margin-left:0;padding:1rem;max-width:100vw;overflow-x:hidden">
  <div class="cc-page">
    <section class="cc-founder-authority" aria-labelledby="fa">
      <p id="fa" class="cc-founder-authority-title">Founder / human authority</p>
      <p class="cc-founder-authority-body">You retain final authority for protected actions.</p>
    </section>
    <section class="cc-ceo-card" aria-labelledby="ceo">
      <div class="cc-ceo-card-top">
        <div>
          <p class="cc-eyebrow">Command layer · reports to Founder</p>
          <h2 id="ceo">Executive CEO / Orchestrator</h2>
          <p class="cc-muted">Coordinates departments without inventing metrics.</p>
        </div>
        <span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span>
      </div>
    </section>
    <div class="cc-layout">
      <nav class="cc-dept-rail" aria-label="Departments">
        <p class="cc-rail-heading">Departments</p>
        <button type="button" class="active">Company overview</button>
        <ul class="cc-dept-list"><li><button type="button">Engineering <span class="cc-dept-count">4</span></button></li></ul>
      </nav>
      <div class="cc-main-col">
        <div class="cc-network-desktop">
          <section class="cc-card cc-network">
            <h2>Agent network</h2>
            <div class="cc-hierarchy">
              <div class="cc-founder-node"><span class="cc-founder-badge">Founder</span><span class="cc-founder-sub">Human authority</span></div>
              <div class="cc-hierarchy-link"><span class="cc-hierarchy-line"></span></div>
              <button type="button" class="cc-ceo-node">
                <span class="cc-eyebrow">Command layer</span>
                <span class="cc-ceo-node-title">Executive Orchestrator / CEO</span>
                <span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span>
              </button>
              <div class="cc-hierarchy-link"><span class="cc-hierarchy-line"></span></div>
              <h3 class="cc-hierarchy-label">C-Suite / department leads</h3>
              <ul class="cc-spec-grid cc-spec-grid-csuite">
                <li><button type="button" class="cc-spec-card"><span class="cc-spec-card-top"><strong class="cc-spec-name">CTO</strong><span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span></span><span class="cc-spec-role">Department lead</span><span class="cc-spec-meta"><span class="cc-spec-dept">leadership</span></span></button></li>
                <li><button type="button" class="cc-spec-card"><span class="cc-spec-card-top"><strong class="cc-spec-name">CPO</strong><span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span></span><span class="cc-spec-role">Department lead</span><span class="cc-spec-meta"><span class="cc-spec-dept">leadership</span></span></button></li>
                <li><button type="button" class="cc-spec-card"><span class="cc-spec-card-top"><strong class="cc-spec-name">CISO</strong><span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span></span><span class="cc-spec-role">Department lead</span><span class="cc-spec-meta"><span class="cc-spec-dept">security</span></span></button></li>
              </ul>
              <div class="cc-hierarchy-link"><span class="cc-hierarchy-line"></span></div>
              <h3 class="cc-hierarchy-label">Specialist agents</h3>
              <ul class="cc-spec-grid">
                <li><button type="button" class="cc-spec-card is-working"><span class="cc-spec-card-top"><strong class="cc-spec-name">Delivery Engineer</strong><span class="mx-status-chip mx-status-working"><span class="mx-status-dot"></span><span class="mx-status-label">Working</span></span></span><span class="cc-spec-role">Implements delivery work</span><span class="cc-spec-meta"><span class="cc-spec-dept">engineering</span> · software-delivery</span></button></li>
                <li><button type="button" class="cc-spec-card"><span class="cc-spec-card-top"><strong class="cc-spec-name">QA Review</strong><span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span></span><span class="cc-spec-role">Independent QA</span><span class="cc-spec-meta"><span class="cc-spec-dept">qa</span> · No activity yet</span></button></li>
                <li><button type="button" class="cc-spec-card"><span class="cc-spec-card-top"><strong class="cc-spec-name">Research</strong><span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span></span><span class="cc-spec-role">Evidence synthesis</span><span class="cc-spec-meta"><span class="cc-spec-dept">research</span> · No activity yet</span></button></li>
              </ul>
            </div>
          </section>
        </div>
        <div class="cc-network-mobile">
          <section class="cc-card"><h2>Agents</h2>
            <ul class="cc-agent-list"><li><button type="button" class="cc-agent-card"><span class="cc-agent-card-top"><strong>CEO</strong><span class="mx-status-chip mx-status-idle"><span class="mx-status-dot"></span><span class="mx-status-label">Idle</span></span></span></button></li></ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</main>
</body></html>`;
}

await runVerifier("go-live-agent-network-screenshots", async (harness) => {
  fs.mkdirSync(outDir, { recursive: true });
  const { url } = await harness.serveFixture(fixtureHtml());
  const { client, port } = await harness.launchChrome();
  console.log(`[go-live-screenshots] cdp=${port} out=${outDir}`);
  const page = await client.newPage("about:blank");
  const manifest = [];

  for (const [w, h] of VIEWPORTS) {
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w <= 768,
    });
    await page.navigate(url);
    await new Promise((r) => setTimeout(r, 120));
    const geo = await page.evaluate(`(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      ceo: !!document.querySelector('.cc-ceo-node'),
      cards: document.querySelectorAll('.cc-spec-card').length,
    }))()`);
    const overflowOk = geo.scrollWidth <= geo.clientWidth + 1;
    const shot = await page.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
    });
    const file = path.join(outDir, `agents-${w}x${h}.png`);
    fs.writeFileSync(file, Buffer.from(shot.data, "base64"));
    manifest.push({ w, h, file, overflowOk, ceo: geo.ceo, cards: geo.cards });
    console.log(
      `${w}x${h}: ${overflowOk ? "PASS" : "FAIL"} ceo=${geo.ceo} cards=${geo.cards} → ${file}`
    );
  }

  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  const failed = manifest.filter((m) => !m.overflowOk || !m.ceo);
  if (failed.length) {
    console.error(`FAIL: ${failed.length} viewport(s)`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${manifest.length} screenshots in ${outDir}`);
  }
});
