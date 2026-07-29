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

async function fetchJson(path, router, opts) {
  const res = await fetch(path, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/memory"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function MemoryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/memory",
  });
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [memRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/memory${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!memRes.ok) {
      setError(memRes.data?.error?.message || "Failed to load memory");
      return;
    }
    setData(memRes.data);
    if (ccRes.ok && Array.isArray(ccRes.data?.projects)) {
      setProjects(ccRes.data.projects);
    }
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  function onProject(id) {
    const next = new URLSearchParams();
    if (id) next.set("project_id", id);
    const qs = next.toString();
    router.replace(qs ? `/admin/memory?${qs}` : "/admin/memory");
  }

  async function decide(id, decision) {
    setBusy(id + decision);
    setSuccess("");
    setError("");
    const res = await fetchJson("/api/admin/memory", router, {
      method: "POST",
      body: JSON.stringify({ id, decision }),
    });
    setBusy("");
    if (!res.ok) {
      setError(res.data?.error?.message || "Decision failed");
      return;
    }
    setSuccess(`Memory ${decision}`);
    await load();
  }

  return (
    <AdminShell
      title="Memory"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project filter</span>
          <select
            value={projectId}
            onChange={(e) => onProject(e.target.value)}
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
          Scoped enterprise memory. Candidates are not trusted until validated.
          Cross-project access is denied by default.
        </p>
        <FounderActionBanner summary={opsSummary} projectId={projectId} />
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading memory…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="cc-banner" role="status">
            {success}
          </div>
        ) : null}
        {data?.note ? <p className="cc-muted" data-testid="memory-note">{data.note}</p> : null}
        {data?.persistence ? (
          <p className="cc-muted" data-testid="memory-persistence">
            Persistence:{" "}
            {data.persistence.durable
              ? `durable (${data.persistence.backend || "configured"})`
              : `fallback (${data.persistence.reason || "unavailable"})`}
            {data.empty_state ? ` · state: ${data.empty_state}` : ""}
          </p>
        ) : null}
        {data?.items?.length ? (
          <ul className="inbox-list">
            {data.items.map((item) => (
              <li key={item.id} className="inbox-item">
                <div>
                  <span className="inbox-kind">
                    {item.memory_type} · {item.verification_status}
                  </span>
                  <h2 className="inbox-title">{item.content?.slice(0, 160)}</h2>
                  <p className="cc-muted">
                    {item.scope_type}
                    {item.project_id ? ` · project ${item.project_id.slice(0, 8)}…` : ""}
                    {` · confidence ${item.confidence}`}
                  </p>
                </div>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  {["validate", "activate", "reject"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="header-btn-ghost"
                      disabled={Boolean(busy)}
                      onClick={() => decide(item.id, d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : data ? (
          <EmptyState
            title={
              data.empty_state === "storage_unconfigured" ||
              data.empty_state === "schema_unavailable"
                ? "Memory storage unavailable"
                : data.empty_state === "awaiting_verification"
                  ? "Candidates awaiting verification"
                  : "No memory entries"
            }
            reason={
              data.note ||
              "Scoped enterprise memory is empty for this filter. Candidates are not trusted until validated."
            }
            configuration={
              data.persistence?.durable
                ? "Durable persistence is configured — empty means no verified entries yet, not a missing migration."
                : data.persistence?.reason
                  ? `Persistence reason: ${data.persistence.reason}`
                  : null
            }
            nextAction={
              opsSummary?.next_founder_action?.reason ||
              "Complete simulation and review on the Production Proof so verified memory can appear."
            }
            projectLabel={projectId || "All projects"}
            cta={
              opsSummary?.next_founder_action?.href &&
              opsSummary.next_founder_action.severity === "action_required" ? (
                <Link
                  className="header-btn"
                  href={
                    projectId &&
                    !String(opsSummary.next_founder_action.href).includes("project_id=")
                      ? `${opsSummary.next_founder_action.href}${
                          opsSummary.next_founder_action.href.includes("?") ? "&" : "?"
                        }project_id=${encodeURIComponent(projectId)}`
                      : opsSummary.next_founder_action.href
                  }
                >
                  {opsSummary.next_founder_action.label}
                </Link>
              ) : (
                <Link className="header-btn-ghost" href="/admin/learning">
                  Learning candidates
                </Link>
              )
            }
          />
        ) : null}
        <p className="cc-muted" style={{ marginTop: "1rem" }}>
          <Link href="/admin/learning">Learning candidates →</Link>
        </p>
      </div>
    </AdminShell>
  );
}
