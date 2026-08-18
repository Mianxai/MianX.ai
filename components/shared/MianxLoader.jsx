"use client";

import "./MianxLoader.css";

// Number of nodes in the ring. Kept modest for performance-safe shadows.
export const MIANX_LOADER_NODE_COUNT = 12;

const VARIANTS = new Set(["page", "section", "inline", "overlay"]);

/**
 * Reusable Mianx.ai branded loader.
 *
 * Variants:
 *  - `page`     centered route/page loading state
 *  - `section`  inside a panel/data region
 *  - `inline`   compact (button / small operation) — ring only, no logo
 *  - `overlay`  covers a positioned container (modal/form) while work runs
 *
 * Accessibility: exactly one status text is exposed to assistive tech via a
 * single `role="status"` + `aria-live="polite"` region, so there is no double
 * announcement. The animated visuals are `aria-hidden`. The loader never steals
 * focus.
 */
export default function MianxLoader({
  variant = "section",
  label = "Loading…",
  showLabel,
  size,
  overlay,
  className = "",
}) {
  const v = VARIANTS.has(variant) ? variant : "section";
  const isOverlay = overlay ?? v === "overlay";
  const shouldShowLabel = showLabel ?? (v === "page" || v === "overlay");

  const stageStyle =
    size != null
      ? { "--mx-size": typeof size === "number" ? `${size}px` : String(size) }
      : undefined;

  const nodes = [];
  for (let i = 0; i < MIANX_LOADER_NODE_COUNT; i += 1) {
    nodes.push(
      <span
        key={i}
        className="mx-loader-node"
        style={{ "--i": i, "--n": MIANX_LOADER_NODE_COUNT }}
      >
        <span className="mx-loader-dot" />
      </span>
    );
  }

  const stage = (
    <span className="mx-loader-stage" style={stageStyle} aria-hidden="true">
      <span className="mx-loader-platform" />
      <span className="mx-loader-ring">{nodes}</span>
      {v !== "inline" && (
        // Approved transparent MX logo asset — never redrawn or replaced.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/mianx-logo.png"
          alt=""
          aria-hidden="true"
          className="mx-loader-logo"
          draggable="false"
        />
      )}
    </span>
  );

  const loader = (
    <span
      className={`mx-loader mx-loader-${v} ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      {stage}
      {shouldShowLabel ? (
        <span className="mx-loader-label">{label}</span>
      ) : (
        <span className="mx-sr-only">{label}</span>
      )}
    </span>
  );

  if (isOverlay) {
    return <span className="mx-loader-overlay-wrap">{loader}</span>;
  }
  return loader;
}
