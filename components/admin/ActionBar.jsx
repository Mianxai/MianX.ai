"use client";

/** Compact action row for page headers / tables. */
export default function ActionBar({ children, align = "end" }) {
  return (
    <div
      className={`admin-action-bar admin-action-bar--${align}`}
      role="toolbar"
    >
      {children}
    </div>
  );
}
