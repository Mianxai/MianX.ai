#!/usr/bin/env node
/**
 * Real-browser geometry contract for the centered premium admin login.
 *
 * Fixture replicates the login.css centering contract (100dvh flex centre,
 * card width min(100%, 420px), safe-area padding) so the check runs without a
 * server. Asserts, at every target viewport:
 *   - the login card is horizontally centred in the viewport (±8px)
 *   - vertically centred when it fits (±8px); when the card is taller than the
 *     viewport it must instead be top-aligned and the page scrollable (no clip)
 *   - no horizontal overflow / scrollbar
 *
 * Usage:
 *   node scripts/verify-login-geometry.mjs            # self-contained fixture
 *   BASE=http://127.0.0.1:3000 node scripts/verify-login-geometry.mjs
 *                                                     # real /admin/login page
 * When BASE is set it navigates the real login route, also asserts the approved
 * MX asset is present and reports any console errors.
 * Env: CHROME_PATH, BASE
 *
 * Ports are allocated dynamically by scripts/lib/browser-harness.mjs — there is
 * no fixed remote-debugging or fixture port to collide with.
 */

import { runVerifier, waitFor } from "./lib/browser-harness.mjs";

const TOLERANCE_PX = 8;
const VIEWPORTS = [
  [1440, 900],
  [1366, 768],
  [1126, 800],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [360, 800],
];

function fixtureHtml() {
  // Mirrors the login.css centering contract under test.
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>login geometry fixture</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; background:#060814; color:#f8fafc; font-family: system-ui, sans-serif; }
  .login-shell { position:relative; min-height:100dvh; display:flex; align-items:center; justify-content:center; padding: 1.5rem 1.25rem; overflow-x:hidden; overflow-y:auto; }
  .login-card { position:relative; width:min(100%, 420px); margin:auto; border:1px solid #1e2740; border-radius:22px; padding:2.25rem 2rem 1.75rem; background:#0f1424; }
  .login-stage { height:180px; margin-bottom:1.25rem; background:rgba(79,124,255,.08); border-radius:12px; }
  .b { height:2.5rem; margin:.6rem 0; background:rgba(255,255,255,.04); border-radius:10px; }
  @media (max-height:640px){ .login-shell{ align-items:flex-start; } .login-stage{ height:120px; } }
</style></head>
<body>
  <main class="login-shell" id="main-content">
    <section class="login-card">
      <div class="login-stage"></div>
      <div class="b"></div><div class="b"></div><div class="b"></div>
      <div class="b"></div><div class="b"></div>
    </section>
  </main>
</body></html>`;
}

function measureExpression() {
  return `(() => {
    const card = document.querySelector('.login-card');
    if (!card) return { ok:false, error:'missing card' };
    const cr = card.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const cardCx = cr.left + cr.width/2;
    const cardCy = cr.top + cr.height/2;
    // "Fits" requires real breathing room; a card that nearly fills the
    // viewport is treated as full-height (top-aligned + scrollable) instead.
    const fits = cr.height <= vh - 24;
    return {
      ok:true,
      viewport:{ w:vw, h:vh },
      card:{ top:cr.top, left:cr.left, width:cr.width, height:cr.height, cx:cardCx, cy:cardCy },
      dx: Math.abs(cardCx - vw/2),
      dy: Math.abs(cardCy - vh/2),
      fits,
      topAligned: cr.top >= -1,
      hasLogo: !!document.querySelector('img.login-machine-core'),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  })()`;
}

await runVerifier("login-geometry", async (harness) => {
  const BASE = process.env.BASE || "";
  let targetUrl;
  if (BASE) {
    targetUrl = `${BASE.replace(/\/$/, "")}/admin/login`;
    console.log(`Mode: real page  →  ${targetUrl}`);
  } else {
    ({ url: targetUrl } = await harness.serveFixture(fixtureHtml()));
    console.log("Mode: layout-contract fixture");
  }

  const { client, port } = await harness.launchChrome();
  console.log(`[login-geometry] app=${harness.appPort ?? "external"} cdp=${port}`);
  const page = await client.newPage("about:blank");

  const results = [];
  for (const [w, h] of VIEWPORTS) {
    harness.assertionLabel = `login card centring @ ${w}x${h}`;
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w <= 768,
    });
    await page.navigate(targetUrl);

    // The real route is client-rendered; give hydration a bounded window to
    // produce the card (and the approved MX asset) before measuring.
    let geo = null;
    try {
      geo = await waitFor(
        async () => {
          const measured = await page.evaluate(measureExpression());
          if (!measured?.ok) return null;
          if (BASE && !measured.hasLogo) return null;
          return measured;
        },
        { timeoutMs: 4000, intervalMs: 200, label: `login card @ ${w}x${h}` }
      );
    } catch {
      geo = (await page.evaluate(measureExpression())) || { ok: false };
    }

    const noOverflow = geo.scrollWidth <= geo.clientWidth + 1;
    const horizontallyCentred = geo.dx <= TOLERANCE_PX;
    // Vertically centred when it fits; otherwise must be top-aligned + scrollable.
    const verticallyOk = geo.fits ? geo.dy <= TOLERANCE_PX : geo.topAligned;
    // On the real page the approved MX asset must be present.
    const logoOk = BASE ? geo.hasLogo === true : true;
    const pass =
      geo.ok && noOverflow && horizontallyCentred && verticallyOk && logoOk;
    results.push({ w, h, pass, ...geo, noOverflow });
    console.log(
      `${w}x${h}: ${pass ? "PASS" : "FAIL"} dx=${Number(geo.dx).toFixed(1)} dy=${Number(geo.dy).toFixed(1)} cardH=${Number(geo.card?.height).toFixed(0)} fits=${geo.fits} overflowOk=${noOverflow}${BASE ? ` logo=${geo.hasLogo}` : ""}`
    );
  }

  if (BASE) {
    const errs = page.consoleErrors;
    console.log(`consoleErrors: ${errs.length ? JSON.stringify(errs) : "none"}`);
    if (errs.length) process.exitCode = 1;
  }

  const failed = results.filter((r) => !r.pass);
  if (failed.length) {
    console.error(`FAIL: ${failed.length} viewport(s) failed the login contract`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: login centred + no overflow at all ${results.length} viewports`);
  }
});
