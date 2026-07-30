"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FounderPageLayout from "@/components/admin/FounderPageLayout";

export default function WorkforceReadinessClient() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/workforce-readiness", { credentials: "include" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load readiness");
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totals = data?.matrix?.totals;
  const agents = useMemo(() => {
    const list = data?.matrix?.agents || [];
    const q = filter.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (a) =>
        a.canonicalAgentId.includes(q) ||
        String(a.displayName).toLowerCase().includes(q) ||
        String(a.department).toLowerCase().includes(q)
    );
  }, [data, filter]);

  const pageCount = Math.max(1, Math.ceil(agents.length / pageSize));
  const pageAgents = agents.slice(page * pageSize, page * pageSize + pageSize);

  if (error) {
    return (
      <div className="admin-page" data-testid="workforce-readiness">
        <p role="alert">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-page" data-testid="workforce-readiness">
        <p className="cc-muted">Loading workforce readiness…</p>
      </div>
    );
  }

  return (
    <div className="admin-page" data-testid="workforce-readiness">
      <FounderPageLayout
        title="Workforce Readiness"
        happening={
          <p>
            Catalogue <strong>{totals.catalogue}</strong> · Executable{" "}
            <strong data-testid="wr-executable-count">{totals.executable}</strong> · Intentionally
            non-executable <strong>{totals.nonExecutable}</strong> · Capacity slots{" "}
            <strong>{totals.capacitySlots}</strong> (planning inventory, not live agents).
          </p>
        }
        attention={
          <ul>
            <li>
              Definitions are contracts. Live instances are project-scoped and only allocated when
              work requires them.
            </li>
            <li>
              {totals.departmentsWithExecutableCoverage}/{totals.departments} departments have
              executable coverage. Workflows covered: {totals.workflowsCovered}/
              {totals.workflows}.
            </li>
            <li>
              Anthropic is optional for Level-1. Deterministic paths stay usable without a provider.
            </li>
          </ul>
        }
        willHappen={
          <p>
            Opening Agents or Live Workforce shows definitions and project instances separately.
            Starting Founder Proof still never auto-deploys or auto-approves protected actions.
          </p>
        }
        willNotHappen={
          <p>
            This page does not create filler agents, call Anthropic, mutate production Founder Proof,
            or activate all {totals.capacitySlots} capacity slots.
          </p>
        }
        primaryAction={
          <div className="founder-cta-row">
            <Link href="/admin/integration" className="header-btn">
              Continue Founder Proof
            </Link>
            <Link href="/admin/agents" className="header-btn-ghost">
              Browse agent definitions
            </Link>
          </div>
        }
        progress={
          <dl className="wr-totals" data-testid="wr-totals">
            <div>
              <dt>Catalogue</dt>
              <dd>{totals.catalogue}</dd>
            </div>
            <div>
              <dt>Executable</dt>
              <dd>{totals.executable}</dd>
            </div>
            <div>
              <dt>Non-executable</dt>
              <dd>{totals.nonExecutable}</dd>
            </div>
            <div>
              <dt>Departments covered</dt>
              <dd>
                {totals.departmentsWithExecutableCoverage}/{totals.departments}
              </dd>
            </div>
            <div>
              <dt>Workflows covered</dt>
              <dd>
                {totals.workflowsCovered}/{totals.workflows}
              </dd>
            </div>
            <div>
              <dt>Routing</dt>
              <dd>{data.routing?.allCovered ? "All paths valid" : "Gaps remain"}</dd>
            </div>
          </dl>
        }
        results={
          <>
            <label className="wr-filter">
              Search agents
              <input
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(0);
                }}
                placeholder="id, name, department"
                data-testid="wr-agent-filter"
              />
            </label>
            <div className="wr-table-wrap">
              <table className="wr-table" data-testid="wr-agent-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Executable</th>
                    <th>Classification</th>
                  </tr>
                </thead>
                <tbody>
                  {pageAgents.map((a) => (
                    <tr key={a.canonicalAgentId}>
                      <td>{a.canonicalAgentId}</td>
                      <td>{a.displayName}</td>
                      <td>{a.department}</td>
                      <td>{a.executable ? "Yes" : "No"}</td>
                      <td>{a.catalogueClassification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="wr-pagination">
              <button
                type="button"
                className="header-btn-ghost"
                disabled={page <= 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Previous
              </button>
              <span>
                Page {page + 1} / {pageCount}
              </span>
              <button
                type="button"
                className="header-btn-ghost"
                disabled={page >= pageCount - 1}
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              >
                Next
              </button>
            </div>
          </>
        }
        advanced={
          <pre className="wr-json" data-testid="wr-technical-json">
            {JSON.stringify(
              {
                classification: data.classification,
                rateLimit: data.queue?.rateLimit,
                productionReadiness: data.productionReadiness?.categories,
              },
              null,
              2
            )}
          </pre>
        }
      />
    </div>
  );
}
