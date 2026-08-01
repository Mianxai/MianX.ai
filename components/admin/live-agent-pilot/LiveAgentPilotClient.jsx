"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";

function Row({ label, value, testId }) {
  return (
    <div className="workforce-status-card" data-testid={testId}>
      <span className="workforce-status-label">{label}</span>
      <strong className="workforce-status-value">{value}</strong>
    </div>
  );
}

export default function LiveAgentPilotClient() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/live-agent-pilot", { credentials: "include" });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error?.message || "Failed to load pilot status");
    }
    setData(json);
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

  async function toggleKill(active) {
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/admin/live-agent-pilot", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "kill_switch",
          killSwitchActive: active,
          reason: active ? "Founder emergency stop (UI)" : "Founder clear kill switch (UI)",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || "Kill switch failed");
      setNote(active ? "Kill switch armed (no provider call)." : "Kill switch cleared.");
      await load();
    } catch (e) {
      setNote(e.message || "Kill switch error");
    } finally {
      setBusy(false);
    }
  }

  const providerName = data?.provider?.providerName || "none";
  const globalOn = data?.switches?.globalLiveExecutionEnabled === true;
  const pilotOn = data?.switches?.pilotLiveExecutionEnabled === true;
  const killOn = data?.killSwitch?.active === true;
  const disabledReasons = data?.eligibility?.disabledReasons || [];
  const runEnabled = false;

  return (
    <AdminShell
      title="Live Agent Pilot"
      breadcrumbs={[
        { href: "/admin", label: "Admin" },
        { href: "/admin/live-agent-pilot", label: "Live Agent Pilot" },
      ]}
    >
      <PageHeader
        title="Controlled live-agent pilot"
        description="Phase II.1 foundation only. No provider call. Switches default off. Exact one future agent: Architecture Reviewer."
      />

      {error ? (
        <p className="admin-inline-error" role="alert">
          {error}
        </p>
      ) : null}
      {note ? <p className="wa-metric-hint">{note}</p> : null}

      {!data && !error ? <p>Loading pilot status…</p> : null}

      {data ? (
        <>
          <div className="workforce-status-grid" data-testid="live-pilot-status-grid">
            <Row
              label="Pilot agent"
              value={data.agent?.name || "—"}
              testId="live-pilot-agent"
            />
            <Row
              label="Slug"
              value={data.agent?.slug || "—"}
              testId="live-pilot-slug"
            />
            <Row
              label="Project"
              value={data.project?.name || "—"}
              testId="live-pilot-project"
            />
            <Row
              label="Provider"
              value={
                providerName === "none"
                  ? "none — Provider setup required"
                  : providerName
              }
              testId="live-pilot-provider"
            />
            <Row
              label="Model"
              value={data.model?.status || "none_selected"}
              testId="live-pilot-model"
            />
            <Row
              label="Global live execution"
              value={globalOn ? "enabled" : "disabled"}
              testId="live-pilot-global-switch"
            />
            <Row
              label="Pilot execution"
              value={pilotOn ? "enabled" : "disabled"}
              testId="live-pilot-pilot-switch"
            />
            <Row
              label="Kill switch"
              value={killOn ? "active" : "inactive"}
              testId="live-pilot-kill-switch"
            />
            <Row
              label="Agent allocated"
              value={data.agent?.allocated ? "yes" : "no"}
              testId="live-pilot-allocated"
            />
            <Row
              label="Agent active"
              value={data.agent?.active ? "yes" : "no"}
              testId="live-pilot-active"
            />
            <Row
              label="Live tested"
              value={
                (data.workforce?.liveTestedSeats || 0) > 0 ? "yes" : "no"
              }
              testId="live-pilot-live-tested"
            />
            <Row
              label="Execution eligible"
              value="no"
              testId="live-pilot-eligible"
            />
            <Row
              label="Queue / lease"
              value={`queued ${data.queue?.queued ?? 0}/${data.queue?.maxQueued ?? 1} · leases ${data.queue?.activeLeases ?? 0}/${data.queue?.maxConcurrent ?? 1}`}
              testId="live-pilot-queue"
            />
            <Row
              label="Token limits"
              value={`${data.budget?.maxInputTokens}/${data.budget?.maxOutputTokens}/${data.budget?.maxTotalTokens}`}
              testId="live-pilot-tokens"
            />
            <Row
              label="Cost limit"
              value={`USD ${data.budget?.maxEstimatedCostUsd}`}
              testId="live-pilot-cost"
            />
            <Row
              label="Latest run"
              value={data.latestRun?.id ? `${data.latestRun.status} (${data.latestRun.id.slice(0, 8)}…)` : "none"}
              testId="live-pilot-latest-run"
            />
            <Row
              label="Latest evidence"
              value={data.latestEvidence?.id ? data.latestEvidence.id.slice(0, 8) + "…" : "none"}
              testId="live-pilot-latest-evidence"
            />
            <Row
              label="Failure reason"
              value={data.failureReason || "none"}
              testId="live-pilot-failure"
            />
          </div>

          <section style={{ marginTop: "1.5rem" }}>
            <h2 className="admin-section-title">Controls</h2>
            <p className="wa-metric-hint">
              Run is disabled. Phase II.1 never calls a provider from this UI.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!runEnabled}
                data-testid="live-pilot-run"
                title={disabledReasons.join("; ") || "Run disabled"}
              >
                Run (disabled)
              </button>
              <button
                type="button"
                className="btn"
                disabled={busy || killOn}
                onClick={() => toggleKill(true)}
                data-testid="live-pilot-arm-kill"
              >
                Arm kill switch
              </button>
              <button
                type="button"
                className="btn"
                disabled={busy || !killOn}
                onClick={() => toggleKill(false)}
                data-testid="live-pilot-clear-kill"
              >
                Clear kill switch
              </button>
            </div>
            <ul data-testid="live-pilot-disabled-reasons" style={{ marginTop: "1rem" }}>
              {disabledReasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p style={{ marginTop: "1rem" }}>
              <StatusBadge tone="warning">liveExecutionReady: false</StatusBadge>{" "}
              <StatusBadge tone="unconfigured">providerName: {providerName}</StatusBadge>{" "}
              <StatusBadge tone="unconfigured">
                activeInstances: {data.workforce?.activeInstances ?? 0}
              </StatusBadge>
            </p>
          </section>
        </>
      ) : null}
    </AdminShell>
  );
}
