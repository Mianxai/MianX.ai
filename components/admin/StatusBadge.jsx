"use client";

/** Compact truthful status badge. */
export default function StatusBadge({ tone = "unconfigured", children }) {
  return <span className={`admin-status-badge ${tone}`}>{children}</span>;
}

export function schedulerTone(mode, automaticProcessing) {
  if (mode === "degraded") return "degraded";
  if (mode === "warning") return "warning";
  if (automaticProcessing && mode === "automatic") return "healthy";
  if (mode === "unconfigured" || mode === "manual") return "unconfigured";
  return "warning";
}
