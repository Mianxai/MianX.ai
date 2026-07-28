"use client";

/**
 * Shared project picker for admin pages.
 */
export default function ProjectPicker({
  projects = [],
  value = "",
  onChange,
  allowAll = true,
  required = false,
  id = "admin-project-picker",
  label = "Project",
}) {
  return (
    <label className="cc-project-select" htmlFor={id}>
      <span className="sr-only">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label={label}
        required={required}
      >
        {allowAll ? (
          <option value="">{required ? "Select project…" : "All projects"}</option>
        ) : (
          <option value="">Select project…</option>
        )}
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name || p.id}
          </option>
        ))}
      </select>
    </label>
  );
}
