"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import CeoBriefPanel from "@/components/admin/command-center/CeoBriefPanel";
import SchedulePanel from "@/components/admin/command-center/SchedulePanel";
import StatusChip from "@/components/admin/command-center/StatusChip";
import FounderGuidedPanel from "@/components/admin/FounderGuidedPanel";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/ceo-brief"));
    return { ok: false, data: null };
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, data };
}

export default function CeoBriefClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/ceo-brief",
  });
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const projRes = await fetchJson("/api/core/projects", router);
    if (projRes.ok) setProjects(projRes.data?.projects || []);
    const path = projectId
      ? `/api/admin/ceo-brief?project_id=${projectId}`
      : "/api/admin/ceo-brief";
    const res = await fetchJson(path, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load CEO Brief");
      setData(null);
      return;
    }
    setData(res.data);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  function setProject(id) {
    const qs = id ? `?project_id=${encodeURIComponent(id)}` : "";
    router.replace(`/admin/ceo-brief${qs}`);
  }

  const actions = (
    <div className="cc-header-actions">
      <label className="cc-project-select">
        <span className="sr-only">Project</span>
        <select
          value={projectId}
          onChange={(e) => setProject(e.target.value)}
          aria-label="Filter CEO Brief by project"
        >
          <option value="">Select project…</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <Link href="/admin/command-center" className="header-btn-ghost">
        Command Center
      </Link>
      <Link href="/admin/objectives" className="header-btn">
        Objectives
      </Link>
    </div>
  );

  return (
    <AdminShell title="CEO Brief" actions={actions}>
      <div className="obj-page">
        <p className="cc-muted">
          Deterministic operational brief from stored runtime state. No generative
          provider call is required.
        </p>
        <FounderGuidedPanel summary={opsSummary} projectId={projectId} />
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading CEO Brief…" />
          </DelayedLoader>
        ) : null}
        {data ? (
          <div className="obj-layout">
            <div>
              {!data.available ? (
                <p className="cc-unavailable">{data.note || "Data unavailable"}</p>
              ) : null}
              <CeoBriefPanel brief={data.brief} />
              <section className="cc-card" aria-labelledby="brief-obj-h">
                <h2 id="brief-obj-h">Objectives snapshot</h2>
                {(data.objectives || []).length === 0 ? (
                  <EmptyState
                    title={data.available ? "No objectives yet" : "Select a project"}
                    reason={
                      data.available
                        ? "No Founder objectives are recorded for this scope."
                        : "CEO Brief objectives require a selected project."
                    }
                    nextAction={
                      data.available
                        ? "Issue an objective to populate this snapshot."
                        : "Choose a project above, then open Objectives."
                    }
                    projectLabel={projectId || "none"}
                    cta={
                      <Link
                        className="header-btn"
                        href={
                          projectId
                            ? `/admin/objectives?project_id=${encodeURIComponent(projectId)}`
                            : "/admin/objectives"
                        }
                      >
                        Objectives
                      </Link>
                    }
                  />
                ) : (
                  <ul className="obj-list">
                    {data.objectives.map((o) => (
                      <li key={`${o.source_type || "obj"}:${o.id}`}>
                        <Link
                          className="obj-row"
                          href={
                            o.href ||
                            `/admin/objectives?project_id=${encodeURIComponent(
                              o.project_id || projectId
                            )}&id=${encodeURIComponent(o.id)}`
                          }
                        >
                          <span className="obj-row-top">
                            <strong>{o.title}</strong>
                            <StatusChip status={o.status} />
                          </span>
                          <span className="cc-muted">
                            {o.source_badge || o.workflow || "—"}
                            {o.stage ? ` · ${o.stage}` : ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
            <SchedulePanel schedule={data.schedule} readiness={data.productionReadiness} />
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
