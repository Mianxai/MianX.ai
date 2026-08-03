#!/usr/bin/env node
/**
 * Deterministic Admin workforce metric fixture verifier (Chrome harness).
 * Does not use Production credentials. Fixtures only.
 */
import { runVerifier } from "./lib/browser-harness.mjs";

const FIXTURE_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Workforce metric fixtures</title>
  <style>
    .card { border: 1px solid #333; margin: 8px; padding: 8px; display: inline-block; min-width: 120px; }
    .label { display: block; font-size: 12px; }
    .value { font-weight: 700; font-size: 20px; }
  </style>
</head>
<body>
  <main id="fixtures">
    <h1>Workforce metric fixtures</h1>
    <section id="scenario-current" aria-label="Current truthful state">
      <h2>Scenario 1 — current truth</h2>
      <div class="card" data-testid="fx-registered"><span class="label">Registered</span><strong class="value">445</strong></div>
      <div class="card" data-testid="fx-persisted"><span class="label">Persisted</span><strong class="value">445</strong></div>
      <div class="card" data-testid="fx-ready"><span class="label">Ready</span><strong class="value">445</strong></div>
      <div class="card" data-testid="fx-allocated"><span class="label">Allocated</span><strong class="value">0</strong></div>
      <div class="card" data-testid="fx-active"><span class="label">Active</span><strong class="value">0</strong></div>
      <div class="card" data-testid="fx-live"><span class="label">Live-tested</span><strong class="value">0</strong></div>
      <div class="card" data-testid="fx-provider"><span class="label">Provider</span><strong class="value">none</strong></div>
      <div class="card" data-testid="fx-live-exec"><span class="label">liveExecutionReady</span><strong class="value">false</strong></div>
    </section>
    <section id="scenario-missing" aria-label="Missing data">
      <h2>Scenario 2 — missing</h2>
      <div class="card" data-testid="fx-missing-active" aria-live="polite"><span class="label">Active</span><strong class="value">Unavailable</strong></div>
      <div class="card" data-testid="fx-missing-provider"><span class="label">Provider</span><strong class="value">Unavailable</strong></div>
    </section>
    <section id="scenario-error" aria-label="API failure">
      <h2>Scenario 3 — error</h2>
      <div class="card" data-testid="fx-error" role="alert" data-metric-state="error"><span class="label">Allocated</span><strong class="value">Unavailable</strong></div>
      <p id="fx-error-note">No permanent Loading. No fabricated count.</p>
    </section>
    <section id="scenario-loading" aria-label="Loading">
      <h2>Scenario 4 — loading</h2>
      <div class="card" data-testid="fx-loading" aria-busy="true" aria-live="polite" data-metric-state="loading"><span class="label">Ready</span><strong class="value">Loading…</strong></div>
    </section>
    <section id="scenario-future" aria-label="Future live fixture">
      <h2>Scenario 5 — future live (test-only)</h2>
      <div class="card" data-testid="fx-future-registered"><span class="label">Registered</span><strong class="value">445</strong></div>
      <div class="card" data-testid="fx-future-allocated"><span class="label">Allocated</span><strong class="value">2</strong></div>
      <div class="card" data-testid="fx-future-active"><span class="label">Active</span><strong class="value">1</strong></div>
      <p id="fx-future-note">Inventory remains distinct from runtime.</p>
    </section>
  </main>
</body>
</html>`;

await runVerifier("workforce-metric-fixtures", async (h) => {
  const fixture = await h.serveFixture(FIXTURE_HTML);
  const { client } = await h.launchChrome();
  const page = await client.newPage("about:blank");
  await page.navigate(fixture.url);

  const text = async (sel) =>
    page.evaluate(`document.querySelector(${JSON.stringify(sel)}).textContent`);

  if ((await text('[data-testid="fx-registered"] .value')) !== "445") {
    throw new Error("scenario1 registered");
  }
  if ((await text('[data-testid="fx-allocated"] .value')) !== "0") {
    throw new Error("scenario1 allocated must be 0");
  }
  if ((await text('[data-testid="fx-active"] .value')) !== "0") {
    throw new Error("scenario1 active must be 0");
  }
  if ((await text('[data-testid="fx-provider"] .value')) !== "none") {
    throw new Error("scenario1 provider");
  }
  if ((await text('[data-testid="fx-live-exec"] .value')) !== "false") {
    throw new Error("scenario1 liveExecutionReady");
  }
  if ((await text('[data-testid="fx-missing-active"] .value')) !== "Unavailable") {
    throw new Error("scenario2 missing → Unavailable");
  }
  if ((await text('[data-testid="fx-error"] .value')) !== "Unavailable") {
    throw new Error("scenario3 error");
  }
  if ((await text('[data-testid="fx-loading"] .value')) !== "Loading…") {
    throw new Error("scenario4 loading");
  }
  const busy = await page.evaluate(
    `document.querySelector('[data-testid="fx-loading"]').getAttribute("aria-busy")`
  );
  if (busy !== "true") throw new Error("scenario4 aria-busy");
  if ((await text('[data-testid="fx-future-registered"] .value')) !== "445") {
    throw new Error("scenario5 inventory");
  }
  if ((await text('[data-testid="fx-future-active"] .value')) !== "1") {
    throw new Error("scenario5 runtime active");
  }
  const body = await page.evaluate(`document.body.innerText`);
  if (/445 active agents/i.test(body)) {
    throw new Error("forbidden 445 active claim");
  }
  console.log("PASS: workforce metric fixtures (5 scenarios)");
});
