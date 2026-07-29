"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { runIdSuffix } from "@/lib/core/integration/founder-flow";

export default function IntegrationRunSelector({
  runs,
  value,
  onChange,
  disabled,
}) {
  if (!runs?.length) return null;

  return (
    <div className="integration-run-selector" data-testid="integration-run-selector">
      <label htmlFor="integration-run-select">
        <span className="integration-field-label">Integration run</span>
        <select
          id="integration-run-select"
          value={value || ""}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Integration run"
        >
          <option value="">Select run…</option>
          {runs.map((r) => (
            <option key={r.id} value={r.id}>
              {(r.objective_title || r.objective?.title || "Untitled objective") +
                ` · …${runIdSuffix(r.id)} · ${r.stage || r.current_stage || "—"} · ${r.status || "—"}`}
            </option>
          ))}
        </select>
      </label>
      {value ? (
        <p className="admin-muted" role="status">
          Stage: <StatusBadge status={runs.find((x) => x.id === value)?.stage || runs.find((x) => x.id === value)?.current_stage} />
          {runs.find((x) => x.id === value)?.created_at
            ? ` · Created ${runs.find((x) => x.id === value)?.created_at}`
            : ""}
        </p>
      ) : null}
    </div>
  );
}
