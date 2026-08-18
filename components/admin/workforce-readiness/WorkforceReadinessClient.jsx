"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  coalesceWorkforceCount,
} from "@/lib/core/workforce-i2/terminology.js";
import { normalizeWorkforceSummary } from "@/lib/core/workforce-i2/summary-normalize.js";
import WorkforceMetricCard from "@/components/admin/workforce/WorkforceMetricCard";

export default function WorkforceReadinessClient({ embedded = false } = {}) {
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

  const foundation = data?.foundation || real?.foundation || data?.verify || real?.verify || {};
  const executable = foundation.executable || {};
  const totals = data?.matrix?.totals;
  const readiness = real?.report?.readiness;
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
      "Foundation readiness refresh completed — no AI provider call, no database mutation, no live smoke."
    );
  }

  const providerConfigured = Boolean(
    foundation.providerConfigured || real?.openrouter?.configured
  );
  const foundationReady = Boolean(foundation.foundationReady);

  const shell = (body) => {
    const inner = <div className="admin-page wa-page" data-testid="workforce-readiness">{body}</div>;
    if (embedded) return inner;
    return (
      <AdminShell
        title="Workforce Readiness"
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
        ]}
      >
        {inner}
      </AdminShell>
    );
  };

  if (error) {
    return shell(
      <div className="admin-error-state" role="alert">
        <h2>Readiness unavailable</h2>
        <p>{error}</p>
        <button type="button" className="btn btn-secondary" onClick={() => load()}>
          Retry
        </button>
      </div>
    );
  }
  if (!data || !real) {
    return shell(
      <p className="cc-muted" aria-busy="true" aria-live="polite">
        Loading workforce readiness…
      </p>
    );
  }

  const inventorySummary = normalizeWorkforceSummary({
    registered: foundation.capacitySeats,
    persisted: foundation.persistedSeats,
    ready: foundation.readyToAllocateSeats,
    allocated: foundation.allocatedSeats,
    active: foundation.activeInstances,
    liveTested: coalesceWorkforceCount(
      foundation.liveTestedSeats,
      readiness?.live_tested
    ),
    providerName: foundation.providerName ?? (providerConfigured ? "configured" : "none"),
    liveExecutionReady:
      typeof foundation.liveExecutionReady === "boolean"
        ? foundation.liveExecutionReady
        : false,
  });

  const capacityMetrics = [
    {
      label: "Documented / capacity seats",
      value: inventorySummary.registered,
      testId: "wr-capacity",
      proves: "Registered capacity — not active agents",
    },
    {
      label: "Compiled seats",
      value: coalesceWorkforceCount(foundation.compiledSeats),
      testId: "wr-compiled",
    },
    {
      label: "Persisted seats",
      value: inventorySummary.persisted,
      testId: "wr-persisted",
    },
    {
      label: "Ready to allocate",
      value: inventorySummary.ready,
      testId: "wr-ready",
      proves: "Ready ≠ allocated or active",
    },
    {
      label: "Allocated seats",
      value: inventorySummary.allocated,
      testId: "wr-allocated",
    },
    {
      label: "Active instances",
      value: inventorySummary.active,
      testId: "wr-active",
    },
    {
      label: "Live-tested seats",
      value: inventorySummary.liveTested,
      testId: "wr-live-tested",
    },
    {
      label: "Archetypes",
      value: coalesceWorkforceCount(
        foundation.archetypes,
        foundation.archetypeCount
      ),
      testId: "wr-archetypes",
    },
    {
      label: "Departments",
      value: coalesceWorkforceCount(
        foundation.departments,
        foundation.departmentCount
      ),
      testId: "wr-departments",
    },
    {
      label: "Workflow families",
      value:
        foundation.workflowFamilies != null || foundation.workflowFamilyCount != null
          ? `${foundation.workflowFamilies ?? foundation.workflowFamilyCount} / ${
              foundation.workflowFamiliesRequired ?? "Unavailable"
            }`
          : null,
      testId: "wr-workflows",
      literal: foundation.workflowFamilies != null || foundation.workflowFamilyCount != null,
    },
  ];

  const executableMetrics = [
    {
      label: "Catalogue entries",
      value: coalesceWorkforceCount(
        executable.catalogueEntries,
        totals?.catalogue
      ),
      testId: "wr-catalogue-entries",
      hint: "Includes intentionally non-executable superseded definitions",
    },
    {
      label: "Executable definitions",
      value: coalesceWorkforceCount(
        executable.executableDefinitions,
        totals?.executable
      ),
      testId: "wr-executable-count",
      hint: "Runtime-capable catalogue subset — not capacity seats",
    },
    {
      label: "Intentionally non-executable",
      value:
        coalesceWorkforceCount(executable.intentionallyNonExecutable) ??
        (executable.catalogueEntries != null &&
        executable.executableDefinitions != null
          ? Math.max(
              0,
              Number(executable.catalogueEntries) -
                Number(executable.executableDefinitions)
            )
          : null),
      testId: "wr-non-executable",
    },
    {
      label: "Named/runtime role registry entries",
      value: coalesceWorkforceCount(executable.namedRoleRegistryEntries),
      testId: "wr-named-role-registry",
      hint: "Org + runtime inventory count — not compiled seats",
    },
    {
      label: "Capacity-reserve gaps (named inventory)",
      value: coalesceWorkforceCount(executable.capacityReserveGaps),
      testId: "wr-capacity-gaps",
      hint: "Documented reserves without separate named personas — valid mapped seats still count in 445",
    },
  ];

  return shell(
    <>
      <PageHeader
        description="445 capacity seats are allocatable workforce capacity — not 445 always-on agents. Foundation metrics come from the shared seat registry; executable catalogue metrics are a smaller runtime subset."
        howThisWorks="Owns: readiness gates, allocation eligibility, provider/safety prerequisites. Does not prove: activation, live execution, or that readiness equals an operational autonomous workforce. Provider unconfigured remains visible when true."
      />
      <div className="wa-header-meta">
        <StatusBadge tone={foundationReady ? "healthy" : "warning"}>
          {foundationReady ? "Foundation ready" : "Foundation incomplete"}
        </StatusBadge>
        <StatusBadge tone="warning">
          {providerConfigured ? "Provider configured" : "AI provider unconfigured"}
        </StatusBadge>
        <span className="cc-muted" data-testid="wr-445-explanation">
          Executable definitions (
          {executable.executableDefinitions ?? totals?.executable ?? "—"}) are not capacity seats.
          Catalogue entries (
          {executable.catalogueEntries ?? totals?.catalogue ?? "—"}) include superseded non-executable
          definitions.
        </span>
      </div>

      <section aria-label="Capacity metrics">
        <h2 className="wa-section-title">Capacity truth</h2>
        <div className="workforce-status-grid" data-testid="wr-capacity-cards">
          {capacityMetrics.map((c) => (
              <WorkforceMetricCard
                key={c.testId}
                label={c.label}
                value={c.value}
                testId={c.testId}
                note={c.hint}
                proves={c.proves}
                literal={c.literal === true}
              />
            ))}
          </div>
      </section>

      <section aria-label="Executable runtime metrics">
        <h2 className="wa-section-title">Executable / runtime catalogue</h2>
        <div className="workforce-status-grid" data-testid="wr-executable-cards">
          {executableMetrics.map((c) => (
              <WorkforceMetricCard
                key={c.testId}
                label={c.label}
                value={c.value}
                testId={c.testId}
                note={c.hint}
                literal={c.literal === true}
              />
            ))}
          </div>
        <p className="cc-muted" data-testid="wr-executable-note">
          Catalogue entries and executable definitions are different concepts. Never read either as
          compiled seats.
        </p>
      </section>

      <section className="wa-panel" aria-label="Foundation status">
        <h2 className="wa-section-title">Foundation</h2>
        <ul className="wa-status-list" data-testid="wr-foundation-list">
          <li>
            Database ready:{" "}
            <strong>{foundation.databaseReady ? "Yes" : "No"}</strong>
          </li>
          <li>
            Workforce bootstrap ready:{" "}
            <strong>{Number(foundation.persistedSeats) === 445 ? "Yes" : "No"}</strong>
          </li>
          <li>
            Queue durable: <strong>{foundation.queueDurable ? "Yes" : "No"}</strong>
          </li>
          <li>
            Leases durable:{" "}
            <strong>
              {foundation.leaseDurable || foundation.leasesDurable ? "Yes" : "No"}
            </strong>
          </li>
          <li>
            Rate limiter durable:{" "}
            <strong>{foundation.rateLimitDurable ? "Yes" : "No"}</strong>
          </li>
        </ul>
      </section>

      <section className="wa-panel" aria-label="Live execution status">
        <h2 className="wa-section-title">Live execution</h2>
        <ul className="wa-status-list" data-testid="wr-live-list">
          <li data-testid="wr-provider-status">
            Provider:{" "}
            <strong>
              {providerConfigured ? "Configured" : "AI provider unconfigured"}
            </strong>
          </li>
          <li>
            Controlled live activation: <strong>Not run</strong>
          </li>
          <li>
            Live-tested:{" "}
            <strong data-testid="wr-live-tested-inline">
              {foundation.liveTestedSeats ?? 0}
            </strong>
          </li>
          <li>
            liveExecutionReady:{" "}
            <strong data-testid="wr-live-exec">false</strong>
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
            Refresh Foundation Readiness
          </button>
          <Link href={embedded ? "/admin/workforce?tab=setup" : "/admin/workforce-activation"} className="header-btn-ghost">
            Workforce Setup
          </Link>
          <Link href="/admin/integration" className="header-btn-ghost">
            Founder Proof
          </Link>
        </div>
        {checkNote ? <p data-testid="wr-check-note">{checkNote}</p> : null}
        <p className="cc-muted" data-testid="wr-action-disclaimer">
          Refresh Foundation Readiness validates runtime contracts and queue truth only. It does not
          call an AI provider, run live smoke, activate agents, or allocate Production seats.
        </p>
      </section>

      <section className="wa-panel" aria-label="Agent catalogue table">
        <h2 className="wa-section-title">Executable catalogue browser</h2>
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
              foundation,
              executable,
              openrouter: { configured: providerConfigured },
              liveSmoke: real?.liveSmoke,
              instanceSummary: real?.instanceSummary,
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
