"use client";

import Link from "next/link";
import { withProjectAndRun } from "@/components/admin/FounderGuidedPanel";
import {
  humanStageLabel,
  humanStatusLabel,
} from "@/lib/core/integration/founder-labels";

/**
 * Compact one-line Current Founder Action for secondary admin pages.
 * Full Quick Start + Next Action card stay on Command Center / Founder Proof only.
 */
export default function FounderActionBanner({
  summary = null,
  projectId = null,
  className = "",
}) {
  if (!projectId || !summary?.ok) return null;
  const next = summary.next_founder_action;
  const canonical = summary.canonical_integration_run;
  if (!next && !canonical) return null;

  const stageLabel =
    canonical?.stage_label ||
    humanStageLabel(canonical?.stage) ||
    humanStatusLabel(canonical?.proof_status, canonical?.stage);
  const statusLabel = humanStatusLabel(
    canonical?.proof_status || canonical?.status,
    canonical?.stage
  );
  const href =
    next?.href && next.severity === "action_required"
      ? withProjectAndRun(next.href, projectId, canonical?.id)
      : null;

  return (
    <aside
      className={`founder-action-banner ${className}`.trim()}
      data-testid="founder-action-banner"
      aria-label="Current Founder action"
    >
      <div className="founder-action-banner-text">
        <strong data-testid="founder-action-banner-status">
          {statusLabel || stageLabel || "Founder Proof"}
        </strong>
        {next?.label ? (
          <span className="cc-muted"> · {next.reason || next.label}</span>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="header-btn"
          data-testid="founder-action-banner-cta"
        >
          {next.label || "Continue"}
        </Link>
      ) : null}
    </aside>
  );
}
