"use client";

import {
  formatWorkforceMetric,
} from "@/lib/core/workforce-i2/terminology.js";

/**
 * Shared Founder-facing workforce metric card.
 * Supports loading / numeric (incl. trusted 0) / Unavailable / error.
 */
export default function WorkforceMetricCard({
  label,
  value = null,
  state = "ready",
  note = null,
  proves = null,
  testId = null,
  literal = false,
}) {
  let display;
  let statusKind = "ready";

  if (state === "loading") {
    display = "Loading…";
    statusKind = "loading";
  } else if (state === "error") {
    display =
      typeof value === "string" && value.trim()
        ? value
        : "Unavailable";
    statusKind = "error";
  } else if (state === "unavailable") {
    display = "Unavailable";
    statusKind = "unavailable";
  } else if (literal) {
    display = value == null || value === "" ? "Unavailable" : String(value);
    statusKind = "ready";
  } else if (typeof value === "string" && /loading/i.test(value)) {
    display = value;
    statusKind = "loading";
  } else {
    const formatted = formatWorkforceMetric(value);
    display = formatted.label;
    statusKind = formatted.kind === "unavailable" ? "unavailable" : "ready";
  }

  const live =
    statusKind === "loading" || statusKind === "error" ? "polite" : undefined;
  const busy = statusKind === "loading" ? true : undefined;

  return (
    <div
      className="workforce-status-card"
      data-testid={testId}
      data-metric-state={statusKind}
      aria-busy={busy}
      aria-live={live}
    >
      <span className="workforce-status-label">{label}</span>
      <strong className="workforce-status-value">{display}</strong>
      {proves ? (
        <span className="wa-metric-hint" data-testid={testId ? `${testId}-proves` : undefined}>
          {proves}
        </span>
      ) : null}
      {note ? <span className="wa-metric-hint">{note}</span> : null}
    </div>
  );
}
