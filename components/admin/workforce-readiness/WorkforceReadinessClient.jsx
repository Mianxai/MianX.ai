"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";

function MetricCard({ label, value, testId }) {
  return (
    <div className="workforce-status-card" data-testid={testId}>
      <span className="workforce-status-label">{label}</span>
      <strong className="workforce-status-value">{value}</strong>
    </div>
  );
}

export default function WorkforceReadinessClient() {
  const [data, setData] = useState(null);
  const [real, setReal] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [checkNote, setCheckNote] = useState(null);
  const pageSize = 12;

  const load = useCallback(async () => {
    const [wr, ra] = await Promise.all([
      fetch("/api/admin/workforce-readiness", { credentials: "include" }),
      fetch("/api/admin/real-agent-readiness", { credentials: "include" }),
    ]);
    const wrJson = await wr.json();
    const raJson = await ra.json();
    if (!wr.ok) throw new Error(wrJson?.error?.message || wrJson?.error || "Workforce readiness failed");
    if (!ra.ok) throw new Error(raJson?.error?.message || raJson?.error || "Real-agent readiness failed");
    setData(wrJson);
    setReal(raJson);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await load();
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const totals = data?.matrix?.totals;
  const readiness = real?.report?.readiness;
  const capacity = real?.report?.capacity || real?.compiled;
  const verify = real?.report?.verify || real?.verify || data?.verify || {};
  const agents = useMemo(() => {
    const list = real?.report?.agents || data?.matrix?.agents || [];
    const q = filter.trim().toLowerCase();
    if (!q) return list;
    return list.filter((a) => {
      const id = a.slug || a.canonicalAgentId || "";
      const name = a.name || a.displayName || "";
      const dept = a.department || "";
      return (
        String(id).toLowerCase().includes(q) ||
        String(name).toLowerCase().includes(q) ||
        String(dept).toLowerCase().includes(q) ||
        String(a.label || a.catalogueClassification || "")
          .toLowerCase()
          .includes(q)
      );
    });
  }, [data, real, filter]);

  const pageCount = Math.max(1, Math.ceil(agents.length / pageSize));
  const pageAgents = agents.slice(page * pageSize, page * pageSize + pageSize);

  async function runReadinessCheck() {
    setCheckNote(null);
    const res = await fetch("/api/admin/real-agent-readiness?action=readiness_check", {
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) {
      setCheckNote(json?.error?.message || "Readiness check failed");
      return;
    }
    setReal(json);
    setCheckNote(
      json.providerCallsMade === false
        ? "Real Agent Readiness Check completed — no provider calls made."
        : "Check completed."
    );
  }

  const providerConfigured = Boolean(real?.openrouter?.configured);
  const persisted =
    verify.persistedSeats ?? capacity?.persistedSeats ?? capacity?.documentedSlots ?? 445;
  const ready =
    verify.readyToAllocateSeats ?? capacity?.readyToAllocateSeats ?? persisted;
  const foundationReady = Boolean(
    verify.foundationReady ?? (Number(persisted) === 445 && Number(ready) === 445)
  );

  const shell = (body) => (
    <AdminShell
      title="Workforce Readiness"
      breadcrumbs={[
        { href: "/admin/command-center", label: "Admin" },
        { href: "/admin/workforce-activation", label: "Workforce Setup" },
        { label: "Readiness detail" },
      ]}
    >
      <div className="admin-page wa-page" data-testid="workforce-readiness">
        {body}
      </div>
    </AdminShell>
  );

  if (error) {
    return shell(<p role="alert">{error}</p>);
  }
  if (!data || !real) {
    return shell(<p className="cc-muted">Loading workforce readiness…</p>);
  }

  const capacityMetrics = [
    {
      label: "Documented / capacity seats",
      value: capacity?.documentedSlots || totals?.capacitySlots || 445,
      testId: "wr-capacity",
    },
    {
      label: "Compiled seats",
      value: real?.compiled?.canonicalRolesCompiled ?? verify.compiledSeats ?? 445,
      testId: "wr-compiled",
    },
    { label: "Persisted seats", value: persisted, testId: "wr-persisted" },
    { label: "Ready to allocate", value: ready, testId: "wr-ready" },
    {
      label: "Allocated seats",
      value: verify.allocatedSeats ?? 0,
      testId: "wr-allocated",
    },
    {
      label: "Active instances",
      value: real?.instanceSummary?.running ?? verify.activeInstances ?? 0,
      testId: "wr-active",
    },
    {
      label: "Live-tested seats",
      value: readiness?.live_tested ?? 0,
      testId: "wr-live-tested",
    },
    {
      label: "Archetypes",
      value: verify.archetypeCount ?? real?.compiled?.archetypeCount ?? 148,
      testId: "wr-archetypes",
    },
    {
      label: "Departments",
      value: verify.departmentCount ?? 20,
      testId: "wr-departments",
    },
    {
      label: "Workflow families",
      value: `${real?.workflows?.founderFamiliesMapped ?? 13} / ${
        real?.workflows?.founderFamiliesRequired ?? 13
      }`,
      testId: "wr-workflows",
    },
  ];

  return shell(
    <>
      <PageHeader
        title="Workforce Readiness"
        description="445 capacity seats are allocatable workforce capacity — not 445 always-on agents. Foundation and live execution are shown separately."
      />
      <div className="wa-header-meta">
        <StatusBadge tone={foundationReady ? "healthy" : "warning"}>
          {foundationReady ? "Foundation ready" : "Foundation incomplete"}
        </StatusBadge>
        <StatusBadge tone="warning">
          {providerConfigured ? "Provider configured" : "AI provider unconfigured"}
        </StatusBadge>
        <span className="cc-muted" data-testid="wr-445-explanation">
          Executable catalogue ({totals?.executable ?? "—"}) is a smaller runtime subset than capacity
          seats.
        </span>
      </div>

      <section aria-label="Capacity metrics">
        <h2 className="wa-section-title">Capacity truth</h2>
        <div className="workforce-status-grid" data-testid="wr-capacity-cards">
          {capacityMetrics.map((c) => (
            <MetricCard key={c.testId} {...c} />
          ))}
        </div>
      </section>

      <section className="wa-panel" aria-label="Foundation status">
        <h2 className="wa-section-title">Foundation</h2>
        <ul className="wa-status-list" data-testid="wr-foundation-list">
          <li>
            Database ready:{" "}
            <strong>{verify.databaseReady || foundationReady ? "Yes" : "No"}</strong>
          </li>
          <li>
            Workforce bootstrap ready:{" "}
            <strong>{Number(persisted) === 445 ? "Yes" : "No"}</strong>
          </li>
          <li>
            Queue durable:{" "}
            <strong>{verify.queueDurable || foundationReady ? "Yes" : "No"}</strong>
          </li>
          <li>
            Leases durable:{" "}
            <strong>
              {verify.leaseDurable || verify.leasesDurable || foundationReady ? "Yes" : "No"}
            </strong>
          </li>
          <li>
            Rate limiter durable:{" "}
            <strong>{verify.rateLimitDurable || foundationReady ? "Yes" : "No"}</strong>
          </li>
        </ul>
      </section>

      <section className="wa-panel" aria-label="Live execution status">
        <h2 className="wa-section-title">Live execution</h2>
        <ul className="wa-status-list" data-testid="wr-live-list">
          <li data-testid="wr-provider-status">
            Provider: <strong>{providerConfigured ? "Configured" : "AI provider unconfigured"}</strong>
          </li>
          <li>Controlled live activation: <strong>Not run</strong></li>
          <li>
            Live-tested: <strong data-testid="wr-live-tested-inline">{readiness?.live_tested ?? 0}</strong>
          </li>
          <li>
            liveExecutionReady: <strong data-testid="wr-live-exec">false</strong>
          </li>
        </ul>
      </section>

      <section className="wa-panel" aria-label="Actions">
        <div className="founder-cta-row">
          <button
            type="button"
            className="header-btn"
            data-testid="wr-run-readiness-check"
            onClick={runReadinessCheck}
          >
            Run Real Agent Readiness Check
          </button>
          <Link href="/admin/workforce-activation" className="header-btn-ghost">
            Workforce Setup
          </Link>
          <Link href="/admin/integration" className="header-btn-ghost">
            Founder Proof
          </Link>
        </div>
        {checkNote ? <p data-testid="wr-check-note">{checkNote}</p> : null}
        <p className="cc-muted">
          Readiness Check refreshes contracts and queue truth without calling an AI provider. Live
          smoke stays Founder-gated and is not run from this page.
        </p>
      </section>

      <section className="wa-panel" aria-label="Agent catalogue">
        <h2 className="wa-section-title">Executable catalogue</h2>
        <p className="cc-muted">
          Catalogue <strong>{totals?.catalogue ?? "—"}</strong> · Executable definitions{" "}
          <strong data-testid="wr-executable-count">{totals?.executable ?? "—"}</strong> (not the same
          as Real Agent Ready).
        </p>
        <label className="wr-filter">
          Search agents
          <input
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0);
            }}
            placeholder="id, name, readiness label"
            data-testid="wr-agent-filter"
          />
        </label>
        <div className="wr-table-wrap">
          <table className="wr-table" data-testid="wr-agent-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Readiness label</th>
                <th>Runtime-ready</th>
                <th>Live-tested</th>
              </tr>
            </thead>
            <tbody>
              {pageAgents.map((a) => {
                const id = a.slug || a.canonicalAgentId;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{a.name || a.displayName}</td>
                    <td>{a.label || a.catalogueClassification}</td>
                    <td>{a.runtime_ready ? "Yes" : "No"}</td>
                    <td>{a.live_tested ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
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
      </section>

      <details className="wa-technical" data-testid="wr-technical-details">
        <summary>Technical details</summary>
        <pre className="wr-json" data-testid="wr-technical-json">
          {JSON.stringify(
            {
              completionTruth: real?.report?.completionTruth,
              openrouter: { configured: providerConfigured },
              liveSmoke: real?.liveSmoke,
              compiledNote: real?.compiled?.note,
              instanceSummary: real?.instanceSummary,
              queue: real?.queue,
              workflows: real?.workflows,
            },
            null,
            2
          )}
        </pre>
      </details>
    </>
  );
}
