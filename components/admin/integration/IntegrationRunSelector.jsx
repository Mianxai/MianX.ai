"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { runIdSuffix } from "@/lib/core/integration/founder-flow";

function sortRunsForSelector(runs = []) {
  return [...runs].sort((a, b) => {
    const ac = a.is_canonical_active ? 0 : a.is_duplicate_active ? 1 : 2;
    const bc = b.is_canonical_active ? 0 : b.is_duplicate_active ? 1 : 2;
    if (ac !== bc) return ac - bc;
    const at = String(a.started_at || a.updated_at || "");
    const bt = String(b.started_at || b.updated_at || "");
    return at.localeCompare(bt);
  });
}

function optionLabel(r) {
  const title = r.objective_title || r.objective?.title || "Untitled objective";
  const marks = [];
  if (r.is_canonical_active) marks.push("canonical");
  if (r.is_duplicate_active) marks.push("DUPLICATE");
  const stage = r.stage_label || r.stage || r.current_stage || "—";
  const status = r.status || "—";
  const cancelled =
    stage === "cancelled" ||
    status === "cancelled" ||
    r.proof_status === "cancelled" ||
    r.cancelled_as_duplicate;
  if (cancelled && !r.is_duplicate_active) marks.push("cancelled (terminal)");
  return (
    title +
    (marks.length ? ` · ${marks.join(" · ")}` : "") +
    ` · …${runIdSuffix(r.id)} · ${stage} · ${status}` +
    (r.live_provider_blocked ? " · live blocked" : "")
  );
}

export default function IntegrationRunSelector({
  runs,
  value,
  onChange,
  disabled,
}) {
  if (!runs?.length) return null;

  const ordered = sortRunsForSelector(runs);
  const selected = ordered.find((x) => x.id === value);

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
          {ordered.map((r) => (
            <option key={r.id} value={r.id}>
              {optionLabel(r)}
            </option>
          ))}
        </select>
      </label>
      {value ? (
        <p className="admin-muted" role="status">
          Stage:{" "}
          <StatusBadge status={selected?.stage || selected?.current_stage} />
          {selected?.is_duplicate_active ? (
            <span data-testid="selected-run-duplicate-mark"> · duplicate (do not clarify on this)</span>
          ) : null}
          {selected?.is_canonical_active ? (
            <span data-testid="selected-run-canonical-mark"> · canonical</span>
          ) : null}
          {selected?.created_at || selected?.started_at
            ? ` · Started ${selected?.started_at || selected?.created_at}`
            : ""}
        </p>
      ) : null}
    </div>
  );
}
