"use client";

/**
 * Collapsed Advanced / Technical details wrapper for Founder Proof.
 */
export default function TechnicalDetails({
  title = "Advanced / Technical details",
  children,
  testId = "technical-details",
  defaultOpen = false,
}) {
  return (
    <details
      className="founder-technical-details"
      data-testid={testId}
      open={defaultOpen || undefined}
    >
      <summary aria-expanded={undefined}>{title}</summary>
      <div className="founder-technical-details-body">{children}</div>
    </details>
  );
}
