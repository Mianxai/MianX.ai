"use client";

import Link from "next/link";
import { withProjectAndRun } from "@/components/admin/FounderGuidedPanel";
import {
  humanStageLabel,
  humanStatusLabel,
} from "@/lib/core/integration/founder-labels";

/**
 * Premium compact strip for secondary admin pages.
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

  const statusLabel =
    humanStatusLabel(canonical?.proof_status || canonical?.status, canonical?.stage) ||
    canonical?.stage_label ||
    humanStageLabel(canonical?.stage) ||
    "Founder Proof";

  const explanation =
    next?.id === "review_plan" ||
    canonical?.proof_status === "awaiting_plan_approval" ||
    canonical?.stage === "founder_approval_required"
      ? "Review the deterministic plan. Simulation will not start automatically."
      : next?.reason ||
        "Continue the Founder Proof from the current gate.";

  const href =
    next?.href
      ? withProjectAndRun(next.href, projectId, canonical?.id)
      : projectId
        ? `/admin/integration?project_id=${encodeURIComponent(projectId)}${
            canonical?.id ? `&run_id=${encodeURIComponent(canonical.id)}` : ""
          }`
        : null;

  const ctaLabel =
    next?.label === "Review Plan" ||
    next?.id === "review_plan" ||
    canonical?.proof_status === "awaiting_plan_approval"
      ? "Review Plan"
      : next?.label || "Open Founder Proof";

  return (
    <aside
      className={`founder-action-banner ${className}`.trim()}
      data-testid="founder-action-banner"
      aria-label="Current Founder action"
    >
      <span className="founder-action-banner-badge" data-testid="founder-action-banner-badge">
        FOUNDER PROOF
      </span>
      <div className="founder-action-banner-text">
        <strong data-testid="founder-action-banner-status">{statusLabel}</strong>
        <p className="founder-action-banner-explain" data-testid="founder-action-banner-explain">
          {explanation}
        </p>
      </div>
      {href ? (
        <Link
          href={href}
          className="header-btn founder-action-banner-cta"
          data-testid="founder-action-banner-cta"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </aside>
  );
}
