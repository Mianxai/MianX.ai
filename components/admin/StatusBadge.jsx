"use client";

import {
  humanStageLabel,
  humanStatusLabel,
  statusTone,
} from "@/lib/core/integration/founder-labels";

/** Compact truthful status badge with human labels. */
export default function StatusBadge({
  tone,
  status,
  stage,
  children,
}) {
  const label =
    children ||
    (stage ? humanStageLabel(stage) : null) ||
    (status ? humanStatusLabel(status, stage) : null) ||
    "Not available";
  const resolvedTone = tone || statusTone(status || stage || label);
  return <span className={`admin-status-badge ${resolvedTone}`}>{label}</span>;
}

export function schedulerTone(mode, automaticProcessing) {
  if (mode === "degraded") return "degraded";
  if (mode === "warning") return "warning";
  if (automaticProcessing && mode === "automatic") return "healthy";
  if (mode === "unconfigured" || mode === "manual") return "unconfigured";
  return "warning";
}
