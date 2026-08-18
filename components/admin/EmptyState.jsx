"use client";

/**
 * Consistent empty-state for admin surfaces.
 */
export default function EmptyState({
  title = "No data yet",
  reason = null,
  configuration = null,
  nextAction = null,
  cta = null,
  projectLabel = null,
  compact = false,
  children = null,
}) {
  return (
    <div
      className={`admin-empty-state${compact ? " admin-empty-state--compact" : ""}`}
      role="status"
    >
      <h2 className="admin-empty-title">{title}</h2>
      {reason ? <p className="cc-muted">{reason}</p> : null}
      {configuration ? <p className="cc-muted">{configuration}</p> : null}
      {projectLabel ? (
        <p className="cc-muted">
          Project context: <code>{projectLabel}</code>
        </p>
      ) : null}
      {nextAction ? <p className="admin-empty-next">{nextAction}</p> : null}
      {cta ? <div className="admin-empty-cta">{cta}</div> : null}
      {children}
    </div>
  );
}
