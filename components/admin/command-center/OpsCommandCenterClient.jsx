"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import OverviewMetrics from "@/components/admin/command-center/OverviewMetrics";
import SchedulePanel from "@/components/admin/command-center/SchedulePanel";
import SchedulerStatus from "@/components/admin/SchedulerStatus";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { withProjectQuery } from "@/components/admin/nav";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { adminFetch } from "@/lib/admin-fetch";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";
import { resolveProjectDisplayName } from "@/lib/admin/resolve-project-label";

async function fetchJson(path, router) {
  const res = await adminFetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/command-center"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

/**
 * Operational Command Center — distinct from Founder Home (/admin).
 * Truthful zeros / unconfigured states only; no fabricated metrics.
 */
export default function OpsCommandCenterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/command-center",
  });
  const [data, setData] = useState(null);
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [ccRes, healthRes] = await Promise.all([
      fetchJson(`/api/admin/command-center${q}`, router),
      fetchJson("/api/core/health", router),
    ]);
    setLoading(false);
    if (!ccRes.ok) {
      setError(ccRes.data?.error?.message || "Failed to load Command Center");
      setData(null);
      return;
    }
    setData(ccRes.data);
    if (healthRes.ok) setHealth(healthRes.data);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  function onProject(id) {
    const next = new URLSearchParams();
    if (id) next.set("project_id", id);
    const qs = next.toString();
    router.replace(qs ? `/admin/command-center?${qs}` : "/admin/command-center");
  }

  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const projectName =
    resolveProjectDisplayName({ projects, projectId }) || projectId || "All projects";
  const foundation = health?.foundation || health?.workforce || null;
  const provider = health?.provider || data?.provider || {};
  const schedule = data?.schedule || {};
  const proofUi = opsSummary?.founder_proof_ui || null;
  const liveExecutionReady =
    foundation?.liveExecutionReady === true ||
    health?.workforce?.liveExecutionReady === true ||
    provider?.liveExecutionReady === true;

  const foundationCards = useMemo(() => {
    const f = foundation || {};
    return [
      { label: "Capacity seats", value: f.capacitySeats ?? "—" },
      { label: "Compiled seats", value: f.compiledSeats ?? "—" },
      { label: "Persisted seats", value: f.persistedSeats ?? "—" },
      { label: "Ready to allocate", value: f.readyToAllocateSeats ?? "—" },
      { label: "Allocated", value: f.allocatedSeats ?? 0 },
      { label: "Active instances", value: f.activeInstances ?? 0 },
      { label: "Live-tested seats", value: f.liveTestedSeats ?? 0 },
    ];
  }, [foundation]);

  return (
    <AdminShell
      title="Command Center"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project</span>
          <select
            value={projectId}
            onChange={(e) => onProject(e.target.value)}
            aria-label="Select project"
            data-testid="cc-ops-project-select"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name || p.id}
              </option>
            ))}
          </select>
        </label>
      }
    >
      <div className="cc-page" data-testid="ops-command-center">
        <p className="cc-muted">
          Operational overview for {projectName}. Founder Home stays at{" "}
          <Link href={withProjectQuery("/admin", projectId)}>Home</Link>. No fabricated
          live-agent metrics.
        </p>

        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading Command Center…" />
          </DelayedLoader>
        ) : null}

        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
            <button type="button" className="header-btn-ghost" onClick={load}>
              Retry
            </button>
          </div>
        ) : null}

        {projectId ? (
          <FounderActionBanner summary={opsSummary} projectId={projectId} />
        ) : null}

        <section className="cc-card" data-testid="cc-ops-proof" aria-labelledby="cc-ops-proof-h">
          <h2 id="cc-ops-proof-h">Founder Proof</h2>
          <p data-testid="cc-ops-proof-status">
            {proofUi?.title ||
              opsSummary?.next_founder_action?.label ||
              (projectId ? "No active Founder Proof summary" : "Select a project")}
          </p>
          {proofUi?.explanation ? <p className="cc-muted">{proofUi.explanation}</p> : null}
          <p className="cc-muted" data-testid="cc-ops-proof-stage">
            Stage: {opsSummary?.canonical_integration_run?.current_stage || "—"} · Status:{" "}
            {proofUi?.state || opsSummary?.canonical_integration_run?.status || "—"}
          </p>
          <Link
            className="header-btn-ghost"
            href={withProjectQuery("/admin/integration", projectId)}
          >
            Open Founder Proof
          </Link>
        </section>

        <section
          className="cc-card"
          data-testid="cc-ops-foundation"
          aria-labelledby="cc-ops-foundation-h"
        >
          <h2 id="cc-ops-foundation-h">Workforce foundation</h2>
          <dl className="cc-kv-grid">
            {foundationCards.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>
          <p className="cc-muted" data-testid="cc-ops-provider">
            Provider: {provider?.providerName || provider?.configured || "none"} · Live
            execution ready: {liveExecutionReady ? "true" : "false"}
          </p>
          <p className="cc-muted" data-testid="cc-ops-durability">
            Durable DB / queue / lease / rate-limit:{" "}
            {String(health?.runtime?.databaseDurable ?? foundation?.databaseDurable ?? "—")} /{" "}
            {String(health?.runtime?.queueDurable ?? foundation?.queueDurable ?? "—")} /{" "}
            {String(health?.runtime?.leaseDurable ?? foundation?.leaseDurable ?? "—")} /{" "}
            {String(health?.runtime?.rateLimitDurable ?? foundation?.rateLimitDurable ?? "—")}
          </p>
        </section>

        {data?.metrics ? <OverviewMetrics metrics={data.metrics} /> : null}

        {data ? (
          <SchedulePanel
            schedule={schedule}
            readiness={data.productionReadiness}
            provider={provider || data.provider}
            rateLimit={data.rateLimit}
          />
        ) : schedule && Object.keys(schedule).length > 0 ? (
          <SchedulerStatus
            scheduler={schedule}
            lastTickAt={schedule.lastTick || schedule.lastTickAt || health?.runtime?.lastTickAt}
            useDurableHealth
          />
        ) : null}

        <section className="cc-card" aria-labelledby="cc-ops-links-h">
          <h2 id="cc-ops-links-h">Open modules</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              ["/admin", "Founder Home"],
              ["/admin/workforce-readiness", "Workforce Readiness"],
              ["/admin/schedule", "Schedule"],
              ["/admin/execution", "Execution"],
              ["/admin/runtime", "Runtime"],
              ["/admin/outputs", "Outputs"],
              ["/admin/inbox", "Founder Inbox"],
            ].map(([href, label]) => (
              <Link
                key={href}
                className="header-btn-ghost"
                href={withProjectQuery(href, projectId)}
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
