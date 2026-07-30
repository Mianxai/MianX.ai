"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FounderPageLayout from "@/components/admin/FounderPageLayout";

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

  if (error) {
    return (
      <div className="admin-page" data-testid="workforce-readiness">
        <p role="alert">{error}</p>
      </div>
    );
  }

  if (!data || !real) {
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
          <>
            <p>
              <strong>{capacity?.documentedSlots || totals.capacitySlots}</strong> documented capacity
              slots · <strong>{real?.compiled?.canonicalRolesCompiled ?? "—"}</strong> canonical roles
              compiled · Catalogue <strong>{totals.catalogue}</strong> · Executable definitions{" "}
              <strong data-testid="wr-executable-count">{totals.executable}</strong> (not the same as
              Real Agent Ready).
            </p>
            <p className="cc-muted" data-testid="wr-445-explanation">
              445 roles does not mean 445 agents are always running. MianX allocates only the required
              project-scoped agents when work exists.
            </p>
          </>
        }
        attention={
          <ul>
            <li>
              Live-tested agents: <strong data-testid="wr-live-tested">{readiness?.live_tested ?? 0}</strong>{" "}
              (remains 0 until Founder-authorized OpenRouter smoke).
            </li>
            <li>
              Provider:{" "}
              {real?.openrouter?.configured ? "OpenRouter key present" : "OpenRouter unconfigured"} ·
              Paid fallback: disabled
            </li>
            <li>
              Queue / scheduler:{" "}
              {real?.queue?.automaticProcessing
                ? "automatic processing configured"
                : "manual tick / external scheduler required"}{" "}
              · Running instances: {real?.instanceSummary?.running ?? 0} · Waiting:{" "}
              {real?.instanceSummary?.waiting ?? 0} · Blocked/failed:{" "}
              {real?.instanceSummary?.blocked ?? 0}
            </li>
            <li>
              Workflow families mapped: {real?.workflows?.founderFamiliesMapped ?? "—"} /{" "}
              {real?.workflows?.founderFamiliesRequired ?? 13}
            </li>
          </ul>
        }
        willHappen={
          <p>
            Readiness Check refreshes local contracts, tools, queue truth, and instance summary
            without calling OpenRouter. Live smoke stays gated behind env confirmation.
          </p>
        }
        willNotHappen={
          <p>
            This page does not call paid models, auto-promote memory, deploy production, or invent
            filler roles to force 445 named personas.
          </p>
        }
        primaryAction={
          <div className="founder-cta-row">
            <button
              type="button"
              className="header-btn"
              data-testid="wr-run-readiness-check"
              onClick={runReadinessCheck}
            >
              Run Real Agent Readiness Check
            </button>
            <Link href="/admin/integration" className="header-btn-ghost">
              Founder Proof
            </Link>
            <details className="wr-live-smoke-gate" data-testid="wr-live-smoke-gate">
              <summary>Run Live OpenRouter Smoke Test (gated)</summary>
              <p className="cc-muted">
                Requires OPENROUTER_API_KEY, ALLOW_LIVE_PROVIDER_TEST=true, selected safe project,
                max 3 requests, paid fallback off. Run via{" "}
                <code>npm run agents:live-smoke</code> — not from CI/Preview.
              </p>
            </details>
          </div>
        }
        progress={
          <>
            {checkNote ? <p data-testid="wr-check-note">{checkNote}</p> : null}
            <dl className="wr-totals" data-testid="wr-real-totals">
              <div>
                <dt>Documented capacity</dt>
                <dd>{capacity?.documentedSlots || 445}</dd>
              </div>
              <div>
                <dt>Roles compiled</dt>
                <dd>{real?.compiled?.canonicalRolesCompiled ?? "—"}</dd>
              </div>
              <div>
                <dt>Contract-valid</dt>
                <dd>{readiness?.contract_valid ?? "—"}</dd>
              </div>
              <div>
                <dt>Deterministic-ready</dt>
                <dd>{readiness?.deterministic_ready ?? "—"}</dd>
              </div>
              <div>
                <dt>Provider-ready</dt>
                <dd>{readiness?.provider_ready ?? "—"}</dd>
              </div>
              <div>
                <dt>Tools-ready</dt>
                <dd>{readiness?.tools_ready ?? "—"}</dd>
              </div>
              <div>
                <dt>Runtime-ready</dt>
                <dd>{readiness?.runtime_ready ?? "—"}</dd>
              </div>
              <div>
                <dt>Live-tested</dt>
                <dd>{readiness?.live_tested ?? 0}</dd>
              </div>
              <div>
                <dt>Allocated instances</dt>
                <dd>{(real?.instances || []).length}</dd>
              </div>
              <div>
                <dt>Capacity gaps</dt>
                <dd>{real?.compiled?.unresolvedCapacityGaps ?? "—"}</dd>
              </div>
              <div>
                <dt>Running instances</dt>
                <dd>{real?.instanceSummary?.running ?? 0}</dd>
              </div>
              <div>
                <dt>Waiting / blocked</dt>
                <dd>
                  {(real?.instanceSummary?.waiting ?? 0) +
                    (real?.instanceSummary?.blocked ?? 0)}
                </dd>
              </div>
            </dl>
            <section className="wr-detail-links" data-testid="wr-detail-panels">
              <h3>Inspect</h3>
              <ul>
                <li>
                  Missing requirements: provider_unconfigured until OPENROUTER_API_KEY is set;
                  live_tested remains 0 until Founder smoke.
                </li>
                <li>
                  Active instances: {real?.instanceSummary?.total ?? 0} in-process (not durable DB
                  yet)
                </li>
                <li>
                  Queue mode: {real?.queue?.features?.schedulerHealth?.mode || "unknown"}
                </li>
                <li>
                  Tools registered: {real?.toolsCount ?? real?.tools ?? "—"} · Workflows mapped:{" "}
                  {real?.workflows?.founderFamiliesMapped ?? "—"}
                </li>
              </ul>
            </section>
          </>
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
          </>
        }
        advanced={
          <pre className="wr-json" data-testid="wr-technical-json">
            {JSON.stringify(
              {
                completionTruth: real?.report?.completionTruth,
                openrouter: real?.openrouter,
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
        }
      />
    </div>
  );
}
