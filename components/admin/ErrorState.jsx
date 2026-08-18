"use client";

/** Shared error state for admin surfaces. */
export default function ErrorState({
  title = "Something went wrong",
  message = null,
  onRetry = null,
  children = null,
}) {
  return (
    <div className="admin-error-state" role="alert">
      <h2 className="admin-empty-title">{title}</h2>
      {message ? <p className="cc-muted">{message}</p> : null}
      {onRetry ? (
        <div className="admin-empty-cta">
          <button type="button" className="btn btn-secondary" onClick={onRetry}>
            Retry
          </button>
        </div>
      ) : null}
      {children}
    </div>
  );
}
