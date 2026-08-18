#!/usr/bin/env node
/**
 * Real-browser navbar geometry contract for the public landing page.
 *
 * Usage:
 *   node scripts/verify-navbar-geometry.mjs                 # starts its own
 *                                                           # `next start` on a
 *                                                           # free port
 *   node scripts/verify-navbar-geometry.mjs http://host:port  # existing server
 *
 * Ports are allocated dynamically by scripts/lib/browser-harness.mjs — there is
 * no fixed remote-debugging port, and the application server never shares a
 * port with the CDP endpoint.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { runVerifier, waitFor } from "./lib/browser-harness.mjs";

const EXPLICIT_BASE_URL = process.argv[2] || process.env.BASE_URL || "";
const OUTPUT_DIR = process.env.NAVBAR_ARTIFACT_DIR || "/tmp/mianx-navbar-geometry";
const VIEWPORTS = [1440, 1280, 1126, 1024, 768, 390];
const DESKTOP_MIN_WIDTH = 901;
const SECTIONS = ["services", "industries", "partners", "testimonials", "contact"];
const TOLERANCE = 0.5;

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

/**
 * Scroll-spy is IntersectionObserver-driven, so instead of sleeping we poll
 * until two consecutive samples agree (and, when given, until the expected tab
 * is active). Bounded — a state that never settles still fails.
 */
async function readSettledGeometry(page, { expectActive, label, timeoutMs = 5000 } = {}) {
  let previous = null;
  const signature = (state) =>
    JSON.stringify([
      state.active,
      state.track?.left,
      state.track?.width,
      state.pill?.left,
      state.pill?.width,
      state.scrollY,
    ]);
  return waitFor(
    async () => {
      const current = await page.evaluate(geometryExpression());
      const stable = previous && signature(previous) === signature(current);
      previous = current;
      if (!stable) return null;
      if (expectActive !== undefined && current.active !== expectActive) return null;
      return current;
    },
    { timeoutMs, intervalMs: 100, label: label || "settled navbar geometry" }
  );
}

/** Last-resort read used to build the original error message on timeout. */
async function readGeometry(page) {
  return page.evaluate(geometryExpression());
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

async function screenshot(page, filename) {
  const result = await page.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });
  await writeFile(join(OUTPUT_DIR, filename), Buffer.from(result.data, "base64"));
}

await runVerifier("navbar-geometry", async (harness) => {
  await mkdir(OUTPUT_DIR, { recursive: true });
  harness.artifactDir = OUTPUT_DIR;

  let baseUrl = EXPLICIT_BASE_URL.replace(/\/$/, "");
  if (baseUrl) {
    console.log(`Mode: existing server → ${baseUrl}`);
  } else {
    harness.failedCommand = "next start (dynamic port)";
    ({ baseUrl } = await harness.startNextServer());
    console.log(`Mode: own production server → ${baseUrl}`);
  }
  harness.failedCommand = null;

  const { client, port } = await harness.launchChrome();
  console.log(`[navbar-geometry] app=${harness.appPort ?? "external"} cdp=${port}`);
  const page = await client.newPage("about:blank");

  const report = { baseUrl, tolerance: TOLERANCE, viewports: {} };

  for (const width of VIEWPORTS) {
    harness.assertionLabel = `navbar @ ${width}px top`;
    await page.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await page.navigate(`${baseUrl}/`);

    const top = await readSettledGeometry(page, { label: `navbar @ ${width}px top` });
    const states = [{ name: "top", ...top }];

    if (width >= DESKTOP_MIN_WIDTH) {
      if (top.active) {
        throw new Error(`${width}px expected no active tab at page top, got ${top.active}`);
      }
      if (width === 1440) await screenshot(page, "navbar-1440-top.png");
      if (width === 1126) await screenshot(page, "navbar-1126-top.png");

      for (const section of SECTIONS) {
        harness.assertionLabel = `navbar @ ${width}px section ${section}`;
        await page.evaluate(`(() => {
          document.getElementById(${JSON.stringify(section)}).scrollIntoView({
            block: "center",
            behavior: "instant"
          });
        })()`);
        let measured;
        try {
          measured = await readSettledGeometry(page, {
            expectActive: section,
            label: `navbar @ ${width}px section ${section}`,
          });
        } catch {
          const actual = await readGeometry(page);
          throw new Error(
            `${width}px expected ${section} active, got ${actual.active || "none"}`
          );
        }
        assertDesktopGeometry(width, top, measured);
        states.push({ name: section, ...measured });
        if (width === 1440 && section === "services") {
          await screenshot(page, "navbar-1440-scrolled.png");
        }
        if (width === 1126 && section === "services") {
          await screenshot(page, "navbar-1126-scrolled.png");
        }
      }

      harness.assertionLabel = `navbar @ ${width}px deep anchor #contact`;
      await page.navigate(`${baseUrl}/#contact`);
      let deepAnchor;
      try {
        deepAnchor = await readSettledGeometry(page, {
          expectActive: "contact",
          label: `navbar @ ${width}px deep anchor`,
        });
      } catch {
        const actual = await readGeometry(page);
        throw new Error(
          `${width}px deep anchor expected contact active, got ${actual.active || "none"}`
        );
      }
      assertDesktopGeometry(width, top, deepAnchor);
      states.push({ name: "deep-contact", ...deepAnchor });

      harness.assertionLabel = `navbar @ ${width}px quick scroll`;
      await page.evaluate(`(() => {
        document.getElementById("contact").scrollIntoView({ block: "center", behavior: "instant" });
        document.getElementById("services").scrollIntoView({ block: "center", behavior: "instant" });
      })()`);
      let quickScroll;
      try {
        quickScroll = await readSettledGeometry(page, {
          expectActive: "services",
          label: `navbar @ ${width}px quick scroll`,
        });
      } catch {
        const actual = await readGeometry(page);
        throw new Error(
          `${width}px quick scroll expected services active, got ${actual.active || "none"}`
        );
      }
      assertDesktopGeometry(width, top, quickScroll);
      states.push({ name: "quick-services", ...quickScroll });

      harness.assertionLabel = `navbar @ ${width}px returned to top`;
      await page.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
      const returned = await readSettledGeometry(page, {
        label: `navbar @ ${width}px returned to top`,
      });
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
});
