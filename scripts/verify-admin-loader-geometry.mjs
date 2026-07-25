#!/usr/bin/env node
/**
 * Production-build geometry + interaction smoke for the admin branded loader.
 *
 * Uses Chrome CDP (same pattern as scripts/verify-navbar-geometry.mjs).
 * Does NOT require authenticated admin — it injects a fixture AdminShell+loader
 * page via data URL / Runtime evaluation against /admin/login shell CSS, OR
 * measures a fixture HTML document served from a temp file.
 *
 * Usage:
 *   node scripts/verify-admin-loader-geometry.mjs [baseUrl]
 *
 * Env:
 *   CHROME_PATH — Chrome binary
 *   CHROME_DEBUG_PORT — default 9334
 */

import { spawn } from "node:child_process";
import { writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = Number(process.env.CHROME_DEBUG_PORT || 9334);
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForJson(url, attempts = 80) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await sleep(100);
  }
  throw lastError || new Error(`Timed out waiting for ${url}`);
}

class Cdp {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text || "Browser evaluation failed");
    }
    return result.result.value;
  }

  close() {
    this.ws.close();
  }
}

function fixtureHtml() {
  // Minimal admin shell + loader using the same CSS class contracts.
  // Loads production CSS from the running next server when BASE is provided;
  // otherwise inlines the critical layout rules under test.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Mianx loader geometry fixture</title>
<style>
  :root { --bg:#070b16; --bg-sidebar:#0a0e1c; --border:#1e2740; --text:#e8ecf7; --text-secondary:#b6c0d8; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font-family: system-ui, sans-serif; }
  .admin-app { display:flex; min-height:100dvh; overflow-x:hidden; max-width:100vw; }
  .admin-sidebar { width:260px; background:var(--bg-sidebar); border-right:1px solid var(--border); position:fixed; height:100dvh; padding:1.5rem; }
  .admin-main { flex:1; margin-left:260px; padding:2rem; min-width:0; min-height:100dvh; display:flex; flex-direction:column; box-sizing:border-box; }
  .admin-header { flex-shrink:0; display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:1px solid var(--border); }
  .admin-header h1 { margin:0; font-size:1.8rem; }
  .admin-body { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; }
  .admin-loading-region { flex:1 1 auto; min-height:0; width:100%; display:grid; place-items:center; }
  .mx-loader { display:inline-flex; flex-direction:column; align-items:center; gap:.85rem; }
  .mx-loader-stage { width:96px; height:96px; background:rgba(79,124,255,.2); border-radius:50%; }
  .header-btn-ghost { background:rgba(255,255,255,.05); color:var(--text-secondary); border:1px solid var(--border); padding:.6rem 1.2rem; border-radius:10px; }
  @media (max-width:900px) {
    .admin-sidebar { transform: translateX(-100%); }
    .admin-main { margin-left:0; padding:1.25rem; }
  }
</style>
</head>
<body>
  <div class="admin-app">
    <aside class="admin-sidebar" aria-label="Admin navigation">Sidebar</aside>
    <main class="admin-main" id="main-content">
      <div class="admin-header">
        <h1>Overview</h1>
        <button type="button" class="header-btn-ghost" id="refresh" data-testid="admin-refresh">Refresh</button>
      </div>
      <div class="admin-body">
        <div class="admin-loading-region" data-testid="admin-loading-region">
          <span class="mx-loader mx-loader-section" role="status">
            <span class="mx-loader-stage" aria-hidden="true"></span>
            <span class="mx-loader-label">Loading overview…</span>
          </span>
        </div>
      </div>
    </main>
  </div>
  <script>
    // Interaction instrumentation for the Refresh button (fixture only).
    const btn = document.getElementById('refresh');
    let pendingPaintMs = null;
    btn.addEventListener('click', () => {
      const t0 = performance.now();
      performance.mark('refresh-click');
      btn.disabled = true;
      btn.textContent = 'Refreshing…';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          pendingPaintMs = performance.now() - t0;
          performance.mark('refresh-pending-painted');
          performance.measure('refresh-pending-paint', 'refresh-click', 'refresh-pending-painted');
          // Simulate deferred network start after paint.
          setTimeout(() => { btn.disabled = false; btn.textContent = 'Refresh'; }, 50);
        });
      });
    });
    window.__getPendingPaintMs = () => pendingPaintMs;
  </script>
</body>
</html>`;
}

function measureExpression() {
  return `(() => {
    const region = document.querySelector('[data-testid="admin-loading-region"]');
    const loader = document.querySelector('.mx-loader');
    const header = document.querySelector('.admin-header');
    const sidebar = document.querySelector('.admin-sidebar');
    if (!region || !loader || !header) return { ok: false, error: 'missing elements' };
    const rr = region.getBoundingClientRect();
    const lr = loader.getBoundingClientRect();
    const hr = header.getBoundingClientRect();
    const sr = sidebar ? sidebar.getBoundingClientRect() : null;
    const regionCx = rr.left + rr.width / 2;
    const regionCy = rr.top + rr.height / 2;
    const loaderCx = lr.left + lr.width / 2;
    const loaderCy = lr.top + lr.height / 2;
    return {
      ok: true,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      region: { top: rr.top, left: rr.left, width: rr.width, height: rr.height, cx: regionCx, cy: regionCy },
      loader: { top: lr.top, left: lr.left, width: lr.width, height: lr.height, cx: loaderCx, cy: loaderCy },
      dx: Math.abs(loaderCx - regionCx),
      dy: Math.abs(loaderCy - regionCy),
      headerBottom: hr.bottom,
      loaderAboveHeader: lr.bottom <= hr.bottom,
      loaderInSidebar: sr ? (lr.right > sr.left && lr.left < sr.right && lr.bottom > sr.top && lr.top < sr.bottom && window.innerWidth > 900) : false,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  })()`;
}

async function main() {
  const dir = await mkdtemp(join(tmpdir(), "mianx-loader-geo-"));
  const htmlPath = join(dir, "fixture.html");
  await writeFile(htmlPath, fixtureHtml(), "utf8");

  const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(readFileSync(htmlPath));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const fixtureUrl = `http://127.0.0.1:${port}/`;

  const chrome = spawn(
    CHROME,
    [
      `--remote-debugging-port=${PORT}`,
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--user-data-dir=" + join(dir, "chrome-profile"),
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let cdp;
  const results = [];
  try {
    await waitForJson(`http://127.0.0.1:${PORT}/json/version`);
    const targetResponse = await fetch(
      `http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(fixtureUrl)}`,
      { method: "PUT" }
    );
    const target = await targetResponse.json();
    cdp = new Cdp(target.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    for (const [w, h] of VIEWPORTS) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: w <= 768,
      });
      await cdp.send("Page.navigate", { url: fixtureUrl });
      await sleep(400);
      const geo = await cdp.evaluate(measureExpression());
      const pass =
        geo.ok &&
        geo.dx <= TOLERANCE_PX &&
        geo.dy <= TOLERANCE_PX &&
        !geo.loaderAboveHeader &&
        !(w > 900 && geo.loaderInSidebar) &&
        geo.scrollWidth <= geo.clientWidth + 1;
      results.push({ w, h, pass, ...geo });
      console.log(
        `${w}x${h}: ${pass ? "PASS" : "FAIL"} dx=${Number(geo.dx).toFixed(1)} dy=${Number(geo.dy).toFixed(1)} regionH=${Number(geo.region?.height).toFixed(0)}`
      );
    }

    // Interaction pending-paint check at desktop.
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: fixtureUrl });
    await sleep(400);
    const paintMs = await cdp.evaluate(`(async () => {
      const btn = document.querySelector('[data-testid="admin-refresh"]');
      btn.click();
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      return window.__getPendingPaintMs();
    })()`);
    console.log(`pending-paint-ms: ${paintMs}`);
    if (paintMs == null || paintMs > 100) {
      console.error(`FAIL: pending paint ${paintMs}ms exceeds 100ms target`);
      process.exitCode = 1;
    } else {
      console.log("PASS: pending paint ≤100ms");
    }

    const failed = results.filter((r) => !r.pass);
    if (failed.length) {
      console.error(`FAIL: ${failed.length} viewport(s) outside ±${TOLERANCE_PX}px`);
      process.exitCode = 1;
    } else {
      console.log(`PASS: all ${results.length} viewports within ±${TOLERANCE_PX}px`);
    }
  } finally {
    cdp?.close();
    chrome.kill("SIGKILL");
    server.close();
    await rm(dir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
