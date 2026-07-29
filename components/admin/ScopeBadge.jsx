"use client";

const TONE = {
  organisation: "scope-badge--org",
  project: "scope-badge--project",
  proof: "scope-badge--proof",
  advanced: "scope-badge--advanced",
  simulation: "scope-badge--sim",
  blocked: "scope-badge--blocked",
};

/**
 * Visible scope chip — organisation / project / Founder Proof / advanced.
 */
export default function ScopeBadge({
  scope = "project",
  label = null,
  className = "",
}) {
  const defaults = {
    organisation: "Organisation-wide",
    project: "Selected project",
    proof: "Founder Proof",
    advanced: "Advanced operation",
    simulation: "Deterministic simulation",
    blocked: "Live execution blocked",
  };
  const text = label || defaults[scope] || scope;
  return (
    <span
      className={`scope-badge ${TONE[scope] || ""} ${className}`.trim()}
      data-testid="scope-badge"
      data-scope={scope}
    >
      {text}
    </span>
  );
}
