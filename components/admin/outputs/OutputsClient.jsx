"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/outputs"));
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

function nextActionHref(next, projectId) {
  if (!next?.href) return null;
  if (projectId && !String(next.href).includes("project_id=")) {
    return `${next.href}${next.href.includes("?") ? "&" : "?"}project_id=${encodeURIComponent(projectId)}`;
  }
  return next.href;
}

export default function OutputsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/outputs",
  });
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [outRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/outputs${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!outRes.ok) {
      setError(outRes.data?.error?.message || "Failed to load outputs");
      return;
    }
    setData(outRes.data);
    if (ccRes.ok) setProjects(ccRes.data?.projects || []);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AdminShell
      title="Outputs"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project filter</span>
          <select
            value={projectId}
            onChange={(e) => {
              const v = e.target.value;
              router.replace(
                v
                  ? `/admin/outputs?project_id=${encodeURIComponent(v)}`
                  : "/admin/outputs"
              );
            }}
            aria-label="Filter by project"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      }
    >
      <div className="cc-page">
        <p className="cc-muted">
          Aggregated from existing agent runs — not a separate output store. Categories:
          Integration evidence · Proof Pack · Agent Runtime · Workflow · Approved final.
        </p>
        <FounderActionBanner summary={opsSummary} projectId={projectId} />
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading outputs…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {data && !data.available ? (
          <EmptyState
            title="Outputs unavailable"
            reason={data.label || data.note || "Output aggregation needs a configured runtime scope."}
            nextAction={
              opsSummary?.next_founder_action?.reason ||
              "Select a project or follow the next Founder action."
            }
            projectLabel={projectId || "All projects"}
            cta={
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {opsSummary?.next_founder_action?.href &&
                opsSummary.next_founder_action.severity === "action_required" ? (
                  <Link
                    className="header-btn"
                    href={nextActionHref(opsSummary.next_founder_action, projectId)}
                  >
                    {opsSummary.next_founder_action.label}
                  </Link>
                ) : null}
                <Link className="header-btn-ghost" href="/admin/runtime/runs">
                  Runtime Runs
                </Link>
              </div>
            }
          />
        ) : null}
        {data?.available ? (
          data.items.length === 0 ? (
            <EmptyState
              title="No outputs yet"
              reason="Aggregated from existing agent runs — not a separate output store. Integration evidence and Proof Pack live under Founder Proof."
              nextAction={
                opsSummary?.next_founder_action?.reason ||
                "Follow the next Founder action, or enqueue agent runs."
              }
              projectLabel={projectId || "All projects"}
              cta={
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {opsSummary?.next_founder_action?.href &&
                  opsSummary.next_founder_action.severity === "action_required" ? (
                    <Link
                      className="header-btn"
                      href={nextActionHref(opsSummary.next_founder_action, projectId)}
                    >
                      {opsSummary.next_founder_action.label}
                    </Link>
                  ) : (
                    <Link className="header-btn" href="/admin/integration">
                      Open Integration
                    </Link>
                  )}
                  <Link className="header-btn-ghost" href="/admin/runtime/runs">
                    Runtime Runs
                  </Link>
                </div>
              }
            />
          ) : (
            <ul className="inbox-list">
              {data.items.map((item) => (
                <li key={item.id} className="inbox-item">
                  <div>
                    <span className="inbox-kind">
                      {item.category || item.kind?.replace(/_/g, " ") || "Agent Runtime"}
                    </span>
                    <h2 className="inbox-title">
                      {item.agentSlug || "run"} · {item.status || "—"}
                    </h2>
                    <p className="cc-muted">
                      {item.summary || "—"}
                      {item.workflow ? ` · ${item.workflow}` : ""}
                      {item.kind ? ` · kind ${item.kind.replace(/_/g, " ")}` : ""}
                    </p>
                  </div>
                  <Link href={item.href} className="header-btn-ghost">
                    Runtime Runs
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : null}
      </div>
    </AdminShell>
  );
}
