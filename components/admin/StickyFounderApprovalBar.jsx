"use client";

/**
 * Sticky Founder approval / decision bar for Plan, Simulation, Final Review.
 */
export default function StickyFounderApprovalBar({
  primaryLabel,
  onPrimary,
  secondaryLabel = "Return for changes",
  onSecondary = null,
  dangerLabel = "Reject",
  onDanger = null,
  busy = false,
  confirmOpen = false,
  confirmTitle = "Confirm Founder decision",
  confirmBody = null,
  confirmReason = "",
  onConfirmReasonChange = null,
  onConfirmYes = null,
  onConfirmNo = null,
  requireReason = false,
  note = null,
  testId = "sticky-founder-approval-bar",
  primaryTestId = "sticky-approve-primary",
  secondaryTestId = "sticky-return",
  dangerTestId = "sticky-reject",
}) {
  return (
    <div className="sticky-founder-bar" data-testid={testId} role="region" aria-label="Founder actions">
      {note ? <p className="sticky-founder-bar-note cc-muted">{note}</p> : null}
      <div className="sticky-founder-bar-actions">
        {onPrimary ? (
          <button
            type="button"
            className="header-btn"
            data-testid={primaryTestId}
            disabled={busy}
            onClick={onPrimary}
          >
            {primaryLabel}
          </button>
        ) : null}
        {onSecondary ? (
          <button
            type="button"
            className="header-btn-ghost"
            data-testid={secondaryTestId}
            disabled={busy}
            onClick={onSecondary}
          >
            {secondaryLabel}
          </button>
        ) : null}
        {onDanger ? (
          <button
            type="button"
            className="header-btn-ghost sticky-danger"
            data-testid={dangerTestId}
            disabled={busy}
            onClick={onDanger}
          >
            {dangerLabel}
          </button>
        ) : null}
      </div>

      {confirmOpen ? (
        <div
          className="sticky-founder-confirm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sticky-confirm-title"
          data-testid="sticky-confirm-dialog"
        >
          <h3 id="sticky-confirm-title">{confirmTitle}</h3>
          {confirmBody}
          {requireReason ? (
            <label className="sticky-reason-label">
              Reason
              <textarea
                data-testid="plan-destructive-reason"
                value={confirmReason}
                onChange={(e) => onConfirmReasonChange?.(e.target.value)}
                rows={3}
              />
            </label>
          ) : null}
          <div className="admin-actions">
            <button
              type="button"
              className="header-btn"
              data-testid="sticky-confirm-yes"
              disabled={busy || (requireReason && !String(confirmReason || "").trim())}
              onClick={onConfirmYes}
            >
              Confirm
            </button>
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="sticky-confirm-no"
              disabled={busy}
              onClick={onConfirmNo}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
