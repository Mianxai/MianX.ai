#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE_URL = process.argv[2] || "http://127.0.0.1:3000";
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = Number(process.env.CHROME_DEBUG_PORT || 9333);
const OUTPUT_DIR = process.env.NAVBAR_ARTIFACT_DIR || "/tmp/mianx-navbar-geometry";
const VIEWPORTS = [1440, 1280, 1126, 1024, 768, 390];
const DESKTOP_MIN_WIDTH = 901;
const SECTIONS = ["services", "industries", "partners", "testimonials", "contact"];
const TOLERANCE = 0.5;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

function geometryExpression() {
  return `(() => {
    const rect = (node) => {
      const r = node.getBoundingClientRect();
      return {
        left: r.left,
        right: r.right,
        top: r.top,
        bottom: r.bottom,
        width: r.width,
        height: r.height,
        centerX: r.left + r.width / 2,
      };
    };
    const trackNode = document.querySelector(".nav-tabs");
    const containerNode = document.querySelector(".nav-container");
    const logoNode = document.querySelector(".navbar .logo");
    const ctaNode = document.querySelector(".navbar .nav-cta");
    const pillNode = document.querySelector(".nav-tabs-indicator");
    const activeNode = document.querySelector(".nav-tabs a.active");
    const linkNodes = Array.from(document.querySelectorAll(".nav-tabs a"));
    const mobileButton = document.querySelector(".mobile-menu-btn");
    const style = trackNode ? getComputedStyle(trackNode) : null;
    return {
      navbarClass: document.querySelector(".navbar")?.className || "",
      active: activeNode?.getAttribute("href")?.slice(1) || "",
      trackDisplay: style?.display || "",
      track: trackNode ? rect(trackNode) : null,
      container: containerNode ? rect(containerNode) : null,
      logo: logoNode ? rect(logoNode) : null,
      cta: ctaNode ? rect(ctaNode) : null,
      pill: pillNode && getComputedStyle(pillNode).opacity !== "0" ? rect(pillNode) : null,
      activeLink: activeNode ? rect(activeNode) : null,
      links: linkNodes.map((node) => ({ href: node.getAttribute("href"), ...rect(node) })),
      pillPosition: pillNode ? getComputedStyle(pillNode).position : "",
      mobileButtonDisplay: mobileButton ? getComputedStyle(mobileButton).display : "",
      scrollY: window.scrollY,
      // Regression probe for the live root cause (in-flow indicator).
      pillInFlow: pillNode
        ? getComputedStyle(pillNode).position !== "absolute"
        : true,
    };
  })()`;
}

function assertDesktopGeometry(width, baseline, state) {
  const failures = [];
  const delta = (a, b) => Math.abs(a - b);
  if (state.trackDisplay === "none") failures.push("desktop track is hidden");
  if (delta(state.track.width, baseline.track.width) > TOLERANCE) {
    failures.push(`width delta ${delta(state.track.width, baseline.track.width).toFixed(3)}px`);
  }
  if (delta(state.track.centerX, baseline.track.centerX) > TOLERANCE) {
    failures.push(`center delta ${delta(state.track.centerX, baseline.track.centerX).toFixed(3)}px`);
  }
  if (delta(state.track.height, baseline.track.height) > TOLERANCE) {
    failures.push(`height delta ${delta(state.track.height, baseline.track.height).toFixed(3)}px`);
  }
  if (delta(state.logo.left, baseline.logo.left) > TOLERANCE) failures.push("logo moved");
  if (delta(state.cta.right, baseline.cta.right) > TOLERANCE) failures.push("CTA moved");
  state.links.forEach((link, index) => {
    const initial = baseline.links[index];
    if (
      !initial ||
      delta(link.left, initial.left) > TOLERANCE ||
      delta(link.width, initial.width) > TOLERANCE
    ) {
      failures.push(`${link.href} link geometry changed`);
    }
  });
  if (state.track.left < state.container.left - TOLERANCE) failures.push("track exits container left");
  if (state.track.right > state.container.right + TOLERANCE) failures.push("track exits container right");
  if (state.track.left < state.logo.right - TOLERANCE) failures.push("track overlaps logo");
  if (state.track.right > state.cta.left + TOLERANCE) failures.push("track overlaps CTA");
  if (state.pillPosition !== "absolute") failures.push(`pill position is ${state.pillPosition}`);
  if (state.pillInFlow) failures.push("pill participates in layout (root-cause regression)");
  if (state.pill) {
    if (state.pill.left < state.track.left - TOLERANCE) failures.push("pill exits track left");
    if (state.pill.right > state.track.right + TOLERANCE) failures.push("pill exits track right");
    if (state.pill.top < state.track.top - TOLERANCE) failures.push("pill exits track top");
    if (state.pill.bottom > state.track.bottom + TOLERANCE) failures.push("pill exits track bottom");
    if (
      !state.activeLink ||
      delta(state.pill.left, state.activeLink.left) > TOLERANCE ||
      delta(state.pill.width, state.activeLink.width) > TOLERANCE
    ) {
      failures.push("pill does not match the active link rectangle");
    }
  }
  if (failures.length) {
    throw new Error(`${width}px ${state.active || "top"}: ${failures.join("; ")}`);
  }
}

async function screenshot(cdp, filename) {
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });
  await writeFile(join(OUTPUT_DIR, filename), Buffer.from(result.data, "base64"));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const profile = await mkdtemp(join(tmpdir(), "mianx-navbar-chrome-"));
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-background-networking",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let cdp;
  try {
    await waitForJson(`http://127.0.0.1:${PORT}/json/version`);
    const targetResponse = await fetch(
      `http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(BASE_URL)}`,
      { method: "PUT" }
    );
    const target = await targetResponse.json();
    cdp = new Cdp(target.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    const report = { baseUrl: BASE_URL, tolerance: TOLERANCE, viewports: {} };

    for (const width of VIEWPORTS) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await cdp.send("Page.navigate", { url: `${BASE_URL}/` });
      await sleep(1000);
      await cdp.evaluate("document.fonts.ready.then(() => true)");
      await sleep(100);

      const top = await cdp.evaluate(geometryExpression());
      const states = [{ name: "top", ...top }];

      if (width >= DESKTOP_MIN_WIDTH) {
        if (top.active) {
          throw new Error(`${width}px expected no active tab at page top, got ${top.active}`);
        }
        if (width === 1440) await screenshot(cdp, "navbar-1440-top.png");
        if (width === 1126) await screenshot(cdp, "navbar-1126-top.png");

        for (const section of SECTIONS) {
          await cdp.evaluate(`(() => {
            document.getElementById(${JSON.stringify(section)}).scrollIntoView({
              block: "center",
              behavior: "instant"
            });
          })()`);
          await sleep(650);
          const measured = await cdp.evaluate(geometryExpression());
          if (measured.active !== section) {
            throw new Error(`${width}px expected ${section} active, got ${measured.active || "none"}`);
          }
          assertDesktopGeometry(width, top, measured);
          states.push({ name: section, ...measured });
          if (width === 1440 && section === "services") {
            await screenshot(cdp, "navbar-1440-scrolled.png");
          }
          if (width === 1126 && section === "services") {
            await screenshot(cdp, "navbar-1126-scrolled.png");
          }
        }

        await cdp.send("Page.navigate", { url: `${BASE_URL}/#contact` });
        await sleep(1000);
        await cdp.evaluate("document.fonts.ready.then(() => true)");
        const deepAnchor = await cdp.evaluate(geometryExpression());
        if (deepAnchor.active !== "contact") {
          throw new Error(`${width}px deep anchor expected contact active, got ${deepAnchor.active || "none"}`);
        }
        assertDesktopGeometry(width, top, deepAnchor);
        states.push({ name: "deep-contact", ...deepAnchor });

        await cdp.evaluate(`(() => {
          document.getElementById("contact").scrollIntoView({ block: "center", behavior: "instant" });
          document.getElementById("services").scrollIntoView({ block: "center", behavior: "instant" });
        })()`);
        await sleep(650);
        const quickScroll = await cdp.evaluate(geometryExpression());
        if (quickScroll.active !== "services") {
          throw new Error(`${width}px quick scroll expected services active, got ${quickScroll.active || "none"}`);
        }
        assertDesktopGeometry(width, top, quickScroll);
        states.push({ name: "quick-services", ...quickScroll });

        await cdp.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
        await sleep(650);
        const returned = await cdp.evaluate(geometryExpression());
        assertDesktopGeometry(width, top, returned);
        states.push({ name: "returned-top", ...returned });
      } else {
        if (top.trackDisplay !== "none") throw new Error(`${width}px desktop track should be hidden`);
        if (top.mobileButtonDisplay === "none") throw new Error(`${width}px mobile menu button is hidden`);
      }

      report.viewports[width] = states;
      const summary = states.map((state) => ({
        state: state.name,
        active: state.active,
        left: state.track?.left,
        right: state.track?.right,
        width: state.track?.width,
        height: state.track?.height,
        centerX: state.track?.centerX,
      }));
      console.log(`\n${width}px`);
      console.table(summary);
    }

    await writeFile(join(OUTPUT_DIR, "geometry-report.json"), JSON.stringify(report, null, 2));
    console.log(`\nNavbar geometry verified. Artifacts: ${OUTPUT_DIR}`);
  } finally {
    cdp?.close();
    chrome.kill("SIGTERM");
    await rm(profile, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
