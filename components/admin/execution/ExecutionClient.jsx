"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

async function fetchJson(path, router, opts) {
  const res = await fetch(path, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/execution"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data, status: res.status };
}

export default function ExecutionClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const programId = searchParams?.get("program_id") || "";
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = new URLSearchParams();
    if (projectId) q.set("project_id", projectId);
    const [listRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/execution?${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!listRes.ok) {
      setError(listRes.data?.error?.message || "Failed to load execution");
      setData(null);
      return;
    }
    setData(listRes.data);
    if (ccRes.ok && Array.isArray(ccRes.data?.projects)) {
      setProjects(ccRes.data.projects);
    }
    if (programId) {
      const dq = new URLSearchParams(q);
      dq.set("program_id", programId);
      const dRes = await fetchJson(`/api/admin/execution?${dq}`, router);
      if (dRes.ok) setDetail(dRes.data);
      else setDetail(null);
    } else {
      setDetail(null);
    }
  }, [projectId, programId, router]);

  useEffect(() => {
    load();
  }, [load]);

  function replaceParams(patch) {
    const next = new URLSearchParams(searchParams?.toString() || "");
    for (const [k, v] of Object.entries(patch)) {
      if (v == null || v === "") next.delete(k);
      else next.set(k, v);
    }
    const qs = next.toString();
    router.replace(qs ? `/admin/execution?${qs}` : "/admin/execution");
  }

  async function act(action, extra = {}) {
    setBusy(action);
    setSuccess("");
    setError("");
    const res = await fetchJson("/api/admin/execution", router, {
      method: "POST",
      body: JSON.stringify({
        action,
        program_id: programId || extra.program_id || null,
        project_id: projectId || null,
        ...extra,
      }),
    });
    setBusy("");
    if (!res.ok) {
      setError(res.data?.error?.message || `${action} failed`);
      return;
    }
    setSuccess(
      action === "tick"
        ? `Tick complete — ran ${res.data?.summary?.ran ?? 0}, succeeded ${res.data?.summary?.succeeded ?? 0}, failed ${res.data?.summary?.failed ?? 0}`
        : `${action} ok`
    );
    await load();
  }

  const snap = data?.snapshot;
  const providerConfigured =
    snap?.provider?.configured === true ||
    (typeof snap?.provider?.configured === "string" &&
      !["unconfigured", "unavailable", "none", "false", ""].includes(
        String(snap.provider.configured).toLowerCase()
      ));
  const hasPrograms = Number(snap?.activePrograms || 0) > 0;
  const tickBlocked = !providerConfigured || !hasPrograms;
  const tickBlockedReason = !providerConfigured
    ? "Run Orchestrator Tick is disabled — provider is unconfigured."
    : "Run Orchestrator Tick is disabled — no programs exist yet.";

  return (
    <AdminShell
      title="Execution"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project filter</span>
          <select
            value={projectId}
            onChange={(e) => replaceParams({ project_id: e.target.value, program_id: "" })}
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
          Autonomous execution programs from approved Company Builder blueprints.
          No fabricated AI progress. Provider unconfigured → runs fail truthfully.
        </p>
        <p className="cc-muted" data-testid="execution-persistence-note" role="note">
          Persistence: execution programs are best-effort in-process memory with optional task
          snapshot hydrate — not a durable Production job store. Redeploy may clear programs.
          Tick actions are real API calls against that ephemeral engine.
        </p>
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading execution…" />
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

        {snap ? (
          <dl className="cc-kv-grid" style={{ marginBottom: "1rem" }}>
            <div>
              <dt>Programs</dt>
              <dd>{snap.activePrograms ?? 0}</dd>
            </div>
            <div>
              <dt>Queued / blocked</dt>
              <dd>
                {snap.queuedTasks ?? 0} / {snap.blockedTasks ?? 0}
              </dd>
            </div>
            <div>
              <dt>Succeeded / failed / DLQ</dt>
              <dd>
                {snap.succeeded ?? 0} / {snap.failed ?? 0} / {snap.deadLetter ?? 0}
              </dd>
            </div>
            <div>
              <dt>Provider</dt>
              <dd>
                <code>
                  {snap.provider?.configured || "unconfigured"} ·{" "}
                  {snap.provider?.detail || "unavailable"}
                </code>
              </dd>
            </div>
          </dl>
        ) : null}

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <button
            type="button"
            className="header-btn-ghost"
            disabled={Boolean(busy) || tickBlocked}
            title={tickBlocked ? tickBlockedReason : undefined}
            data-testid="execution-run-tick"
            onClick={() => act("tick")}
          >
            {busy === "tick" ? "Ticking…" : "Run orchestrator tick"}
          </button>
          {tickBlocked ? (
            <p className="cc-muted" data-testid="execution-tick-blocked-reason" role="note">
              {tickBlockedReason}
            </p>
          ) : null}
          <Link
            href={
              projectId
                ? `/admin/company-builder?project_id=${encodeURIComponent(projectId)}`
                : "/admin/company-builder"
            }
            className="header-btn-ghost"
          >
            Company Builder
          </Link>
        </div>

        {data?.programs?.length ? (
          <ul className="inbox-list">
            {data.programs.map((p) => (
              <li key={p.id} className="inbox-item">
                <div>
                  <span className="inbox-kind">{p.status}</span>
                  <h2 className="inbox-title">
                    {p.product?.name || p.id} · {p.priority}
                  </h2>
                  <p className="cc-muted">
                    Program {p.id}
                    {p.paused_at ? " · paused" : ""}
                  </p>
                </div>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  <button
                    type="button"
                    className="header-btn-ghost"
                    onClick={() => replaceParams({ program_id: p.id })}
                  >
                    Open
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : data ? (
          <p className="cc-muted">No execution programs yet. Approve a Company Builder blueprint first.</p>
        ) : null}

        {detail?.program ? (
          <section className="cc-card" style={{ marginTop: "1rem" }}>
            <h2>
              {detail.program.product?.name || detail.program.id}{" "}
              <code>{detail.program.status}</code>
            </h2>
            <p className="cc-muted">
              Items: {detail.items?.length || 0} · Dependencies:{" "}
              {detail.dependencies?.length || 0} · Events: {detail.events?.length || 0}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className="header-btn-ghost"
                disabled={Boolean(busy)}
                onClick={() => act("pause", { program_id: detail.program.id })}
              >
                Pause
              </button>
              <button
                type="button"
                className="header-btn-ghost"
                disabled={Boolean(busy)}
                onClick={() => act("resume", { program_id: detail.program.id })}
              >
                Resume
              </button>
              <button
                type="button"
                className="header-btn-ghost"
                disabled={Boolean(busy)}
                onClick={() => act("cancel", { program_id: detail.program.id })}
              >
                Cancel
              </button>
              <button
                type="button"
                className="header-btn-ghost"
                disabled={Boolean(busy)}
                onClick={() =>
                  act("tick", { program_id: detail.program.id, max_items: 4 })
                }
              >
                Tick this program
              </button>
            </div>
            <details style={{ marginTop: "0.75rem" }}>
              <summary>Task lineage ({detail.items?.length || 0})</summary>
              <ul>
                {(detail.items || [])
                  .filter((i) => ["task", "agent_run"].includes(i.level))
                  .slice(0, 40)
                  .map((i) => (
                    <li key={i.id}>
                      <code>{i.status}</code> {i.level}: {i.title}
                      {i.assigned_agent ? ` · ${i.assigned_agent}` : ""}
                    </li>
                  ))}
              </ul>
            </details>
          </section>
        ) : null}
      </div>
    </AdminShell>
  );
}
