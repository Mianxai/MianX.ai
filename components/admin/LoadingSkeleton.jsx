"use client";

/**
 * Lightweight loading skeleton placeholders for admin shells.
 * Prefer AdminLoadingRegion + MianxLoader for primary loading UX.
 */
export default function LoadingSkeleton({ rows = 3, label = "Loading…" }) {
  return (
    <div className="admin-loading-skeleton" aria-busy="true" aria-label={label}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="admin-skeleton-row" />
      ))}
    </div>
  );
}
