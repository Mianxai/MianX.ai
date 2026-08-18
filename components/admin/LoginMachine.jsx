"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MianX mechanical login micro-scene — an original, lightweight composition
 * (semantic-free decorative SVG + the approved metallic MX asset as the core).
 *
 * It is purely presentational and `aria-hidden`. The `stage` prop drives which
 * circuits/gears are energised:
 *   - "idle"        resting, dim
 *   - "email"       first circuit rail energises
 *   - "password"    second mechanism energises
 *   - "ready"       both circuits connected to the core
 *   - "submitting"  short controlled mechanical sequence
 *   - "success"     circuit completes (brief, never delays navigation)
 *   - "error"       mechanism resets
 *
 * Animation never blocks auth: the parent triggers navigation immediately; the
 * success visual simply plays out. Animation pauses when the tab is hidden and
 * collapses to a calm static composition under prefers-reduced-motion.
 */
export default function LoginMachine({ stage = "idle" }) {
  const [paused, setPaused] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onVisibility() {
      setPaused(document.visibilityState === "hidden");
    }
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      ref={rootRef}
      className="login-machine"
      data-stage={stage}
      data-paused={paused ? "true" : "false"}
      aria-hidden="true"
    >
      <svg
        className="login-machine-svg"
        viewBox="0 0 320 240"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id="mx-rail-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4f7cff" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#4f7cff" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="mx-rail-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#7c5cff" />
          </linearGradient>
          <radialGradient id="mx-core-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#4f7cff" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="#22d3ee" stopOpacity="0.14" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Circuit rails */}
        <path
          className="rail rail-a"
          d="M18 60 H92 a14 14 0 0 1 14 14 V104 a14 14 0 0 0 14 14 H150"
          fill="none"
          stroke="url(#mx-rail-a)"
        />
        <path
          className="rail rail-b"
          d="M302 186 H228 a14 14 0 0 0 -14 -14 V140 a14 14 0 0 1 -14 -14 H170"
          fill="none"
          stroke="url(#mx-rail-b)"
        />

        {/* Rail solder pads */}
        <circle className="pad pad-a" cx="18" cy="60" r="4" />
        <circle className="pad pad-b" cx="302" cy="186" r="4" />

        {/* Travelling pulses (positioned via CSS offset-path along the rails) */}
        <circle className="pulse pulse-a" r="3.4" cx="0" cy="0" />
        <circle className="pulse pulse-b" r="3.4" cx="0" cy="0" />

        {/* Gears */}
        <g className="gear gear-1" transform="translate(96 176)">
          <Gear teeth={9} r={20} />
        </g>
        <g className="gear gear-2" transform="translate(232 66)">
          <Gear teeth={7} r={14} />
        </g>

        {/* Core socket */}
        <circle className="core-glow" cx="160" cy="120" r="58" fill="url(#mx-core-glow)" />
        <circle className="core-ring" cx="160" cy="120" r="42" fill="none" />
        <circle className="core-ring core-ring-2" cx="160" cy="120" r="52" fill="none" />
      </svg>

      {/* Approved metallic MX asset as the machine core. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="login-machine-core"
        src="/mianx-logo.png"
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    </div>
  );
}

function Gear({ teeth = 8, r = 18 }) {
  const spokes = [];
  const toothLen = r * 0.28;
  for (let i = 0; i < teeth; i += 1) {
    const angle = (i / teeth) * Math.PI * 2;
    const x1 = Math.cos(angle) * r;
    const y1 = Math.sin(angle) * r;
    const x2 = Math.cos(angle) * (r + toothLen);
    const y2 = Math.sin(angle) * (r + toothLen);
    spokes.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="gear-tooth" />
    );
  }
  return (
    <>
      {spokes}
      <circle className="gear-body" cx="0" cy="0" r={r} fill="none" />
      <circle className="gear-hub" cx="0" cy="0" r={r * 0.32} fill="none" />
    </>
  );
}
