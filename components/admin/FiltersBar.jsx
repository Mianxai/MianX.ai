"use client";

import { LEAD_STATUSES } from "@/lib/leads";

const FILTERS = ["all", ...LEAD_STATUSES];

export default function FiltersBar({ active, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter submissions by status">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          className={`filter-btn ${active === f ? "active" : ""}`}
          aria-pressed={active === f}
          onClick={() => onChange(f)}
        >
          {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
