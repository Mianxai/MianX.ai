#!/usr/bin/env node
/**
 * Real-browser badge layout contract (fixture).
 * Asserts the submissions badge does not shift sidebar width and has no overflow
 * at the Founder viewports. Does not require authenticated admin.
 *
 * Usage: node scripts/verify-submission-badge-geometry.mjs
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
const PORT = Number(process.env.CHROME_DEBUG_PORT || 9336);
const VIEWPORTS = [
  [1440, 900],
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

async function main() {
  const dir = await mkdtemp(join(tmpdir(), "mianx-badge-geo-"));
  const htmlPath = join(dir, "fixture.html");
  await writeFile(htmlPath, fixtureHtml(), "utf8");
  const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(readFileSync(htmlPath));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;

  const chrome = spawn(
    CHROME,
    [
      `--remote-debugging-port=${PORT}`,
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${join(dir, "chrome")}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let cdp;
  try {
    await waitForJson(`http://127.0.0.1:${PORT}/json/version`);
    const target = await (
      await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, {
        method: "PUT",
      })
    ).json();
    cdp = new Cdp(target.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    let failed = 0;
    for (const [w, h] of VIEWPORTS) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: w <= 768,
      });
      await cdp.send("Page.navigate", { url });
      await sleep(300);
      const geo = await cdp.evaluate(`(() => {
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
      })()`);
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
