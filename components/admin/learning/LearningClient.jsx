"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

async function fetchJson(path, router, opts) {
  const res = await fetch(path, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/learning"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function LearningClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [learnRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/learning${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!learnRes.ok) {
      setError(learnRes.data?.error?.message || "Failed to load learning");
      return;
    }
    setData(learnRes.data);
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
    router.replace(qs ? `/admin/learning?${qs}` : "/admin/learning");
  }

  async function decide(id, decision) {
    setBusy(id + decision);
    setSuccess("");
    setError("");
    const res = await fetchJson("/api/admin/learning", router, {
      method: "POST",
      body: JSON.stringify({ id, decision }),
    });
    setBusy("");
    if (!res.ok) {
      setError(res.data?.error?.message || "Decision failed");
      return;
    }
    setSuccess(`Learning ${decision}`);
    await load();
  }

  return (
    <AdminShell
      title="Learning"
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
          Verified learning candidates. Unsafe capability or prompt self-modification
          proposals are rejected. Promotion never rewrites agent system prompts.
        </p>
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading learning…" />
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
        {data?.items?.length ? (
          <ul className="inbox-list">
            {data.items.map((item) => (
              <li key={item.id} className="inbox-item">
                <div>
                  <span className="inbox-kind">
                    {item.status} · {item.risk_class}
                  </span>
                  <h2 className="inbox-title">{item.proposed_lesson?.slice(0, 160)}</h2>
                  <p className="cc-muted">{item.problem}</p>
                  {item.agent_slug ? (
                    <p className="cc-muted">Agent: {item.agent_slug}</p>
                  ) : null}
                </div>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  {["review", "validate", "reject", "promote"].map((d) => (
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
            title="No learning candidates"
            reason="No verified learning candidates for this scope. Unsafe capability or prompt self-modification proposals are rejected."
            configuration="Promotion never rewrites agent system prompts."
            nextAction="Candidates appear after reviewed runtime outcomes produce lessons."
            projectLabel={projectId || "All projects"}
            cta={
              <Link className="header-btn-ghost" href="/admin/memory">
                Open Memory
              </Link>
            }
          />
        ) : null}
      </div>
    </AdminShell>
  );
}
