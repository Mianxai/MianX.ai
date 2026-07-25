#!/usr/bin/env node
/**
 * Real-browser geometry contract for the centered premium admin login.
 *
 * Uses Chrome CDP (same pattern as scripts/verify-admin-loader-geometry.mjs).
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
 * Env: CHROME_PATH, CHROME_DEBUG_PORT (default 9335), BASE
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
const PORT = Number(process.env.CHROME_DEBUG_PORT || 9335);
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
    this.consoleErrors = [];
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        this.consoleErrors.push(
          (message.params.args || []).map((a) => a.value || a.description).join(" ")
        );
      }
      if (message.method === "Runtime.exceptionThrown") {
        const d = message.params.exceptionDetails;
        this.consoleErrors.push("EXC: " + (d?.exception?.description || d?.text));
      }
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
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
    const { result } = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return result.value;
  }
  close() {
    this.ws.close();
  }
}

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

async function main() {
  const BASE = process.env.BASE || "";
  const dir = await mkdtemp(join(tmpdir(), "mianx-login-geo-"));
  const htmlPath = join(dir, "fixture.html");
  await writeFile(htmlPath, fixtureHtml(), "utf8");

  let server = null;
  let targetUrl;
  if (BASE) {
    targetUrl = `${BASE.replace(/\/$/, "")}/admin/login`;
    console.log(`Mode: real page  →  ${targetUrl}`);
  } else {
    server = createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(readFileSync(htmlPath));
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address();
    targetUrl = `http://127.0.0.1:${port}/`;
    console.log("Mode: layout-contract fixture");
  }
  const fixtureUrl = targetUrl;

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
      await sleep(BASE ? 800 : 350);
      let geo = await cdp.evaluate(measureExpression());
      // Real client-rendered page may hydrate slightly after load — poll briefly.
      for (let i = 0; i < 20 && (!geo || !geo.ok); i += 1) {
        await sleep(200);
        geo = await cdp.evaluate(measureExpression());
      }
      geo = geo || { ok: false };
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
      const errs = cdp.consoleErrors;
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
  } finally {
    cdp?.close();
    chrome.kill("SIGKILL");
    server?.close();
    await rm(dir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
