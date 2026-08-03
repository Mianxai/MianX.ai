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
  const killOn = data?.killSwitch?.active === true;
  const disabledReasons = data?.eligibility?.disabledReasons || [];
  // Client never decides eligibility independently — server status only.
  const runEnabled = data?.eligibility?.runButtonEnabled === true;

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
        description="Phase II.2 OpenAI path implemented and disabled by default. Server gates decide Run eligibility. No browser-to-provider calls."
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
          <div className="workforce-status-grid" data-testid="live-pilot-activation-preflight">
            <Row
              label="Provider configured"
              value={data.activationPreflight?.display?.providerConfigured || "No"}
              testId="live-pilot-provider-configured"
            />
            <Row
              label="Provider"
              value={data.activationPreflight?.display?.provider || "Not configured"}
              testId="live-pilot-provider"
            />
            <Row
              label="API key configured"
              value={data.activationPreflight?.display?.apiKeyConfigured || "No"}
              testId="live-pilot-api-key"
            />
            <Row
              label="Configured model"
              value={data.activationPreflight?.display?.configuredModel || "none"}
              testId="live-pilot-model"
            />
            <Row
              label="Official catalog verification"
              value={data.activationPreflight?.display?.officialCatalog || "Not checked"}
              testId="live-pilot-official-catalog"
            />
            <Row
              label="Account model-access verification"
              value={data.activationPreflight?.display?.accountModelAccess || "Not checked"}
              testId="live-pilot-account-access"
            />
            <Row
              label="Official pricing verification"
              value={data.activationPreflight?.display?.officialPricing || "Not checked"}
              testId="live-pilot-official-pricing"
            />
            <Row
              label="Billing-path verification"
              value={data.activationPreflight?.display?.billingPath || "Not checked"}
              testId="live-pilot-billing-path"
            />
            <Row
              label="Response storage"
              value={data.activationPreflight?.display?.responseStorage || "Disabled"}
              testId="live-pilot-response-storage"
            />
            <Row
              label="Zero Data Retention verification"
              value={data.activationPreflight?.display?.zeroDataRetention || "Not verified"}
              testId="live-pilot-zdr"
            />
            <Row
              label="Execution switch"
              value={data.activationPreflight?.display?.executionSwitch || "Off"}
              testId="live-pilot-global-switch"
            />
            <Row
              label="Pilot switch"
              value={data.activationPreflight?.display?.pilotSwitch || "Off"}
              testId="live-pilot-pilot-switch"
            />
            <Row
              label="Pilot agent"
              value={data.activationPreflight?.display?.pilotAgent || data.agent?.slug || "—"}
              testId="live-pilot-agent"
            />
            <Row
              label="Queue count"
              value={data.activationPreflight?.display?.queueCount || "0"}
              testId="live-pilot-queue"
            />
            <Row
              label="Concurrent runs"
              value={data.activationPreflight?.display?.concurrentRuns || "0"}
              testId="live-pilot-concurrent"
            />
            <Row
              label="Scheduler health"
              value={data.activationPreflight?.display?.schedulerHealth || "Unknown"}
              testId="live-pilot-scheduler"
            />
            <Row
              label="Evidence store"
              value={data.activationPreflight?.display?.evidenceStore || "Unavailable"}
              testId="live-pilot-evidence-store"
            />
            <Row
              label="Provider-call allowed"
              value={data.activationPreflight?.display?.providerCallAllowed || "No"}
              testId="live-pilot-provider-call-allowed"
            />
            <Row
              label="Live execution ready"
              value={data.activationPreflight?.display?.liveExecutionReady || "No"}
              testId="live-pilot-live-ready"
            />
            <Row
              label="Provider calls"
              value={data.activationPreflight?.display?.providerCalls || "0"}
              testId="live-pilot-provider-calls"
            />
            <Row
              label="Allocated"
              value={data.activationPreflight?.display?.allocated || "0"}
              testId="live-pilot-allocated"
            />
            <Row
              label="Active"
              value={data.activationPreflight?.display?.active || "0"}
              testId="live-pilot-active"
            />
            <Row
              label="Live-tested"
              value={data.activationPreflight?.display?.liveTested || "0"}
              testId="live-pilot-live-tested"
            />
            <Row
              label="Kill switch"
              value={killOn ? "active" : "inactive"}
              testId="live-pilot-kill-switch"
            />
            <Row
              label="Execution eligible"
              value={runEnabled ? "yes" : "no"}
              testId="live-pilot-eligible"
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
          </div>

          <p className="wa-metric-hint" data-testid="live-pilot-store-note" style={{ marginTop: "1rem" }}>
            {data.activationPreflight?.storeFalseNote ||
              "store:false disables persistent Responses resource storage. It does not by itself establish Zero Data Retention."}
          </p>

          <section style={{ marginTop: "1.5rem" }} data-testid="live-pilot-dry-run-report">
            <h2 className="admin-section-title">
              {data.dryRunRehearsal?.heading || "Dry-run rehearsal"}
            </h2>
            <p className="wa-metric-hint" role="status" data-testid="live-pilot-test-only-warning">
              Test only — fake provider — not Production. Fake provider runs only inside Vitest.
              This Admin page cannot run a fake provider and cannot call OpenAI.
            </p>
            <div className="workforce-status-grid">
              <Row
                label="Rehearsal status"
                value={data.dryRunRehearsal?.rehearsalStatus || "documented_test_only"}
                testId="live-pilot-rehearsal-status"
              />
              <Row label="Test only" value="Yes" testId="live-pilot-test-only" />
              <Row
                label="Fake provider"
                value={data.dryRunRehearsal?.fakeProviderLabel || "fake_openai_test_only"}
                testId="live-pilot-fake-label"
              />
              <Row label="Not Production" value="Yes" testId="live-pilot-not-production" />
              <Row
                label="Genuine provider calls"
                value={String(data.dryRunRehearsal?.genuineProviderCalls ?? 0)}
                testId="live-pilot-genuine-call"
              />
              <Row
                label="Agent live-tested"
                value={data.dryRunRehearsal?.agentLiveTested ? "Yes" : "No"}
                testId="live-pilot-rehearsal-live-tested"
              />
              <Row
                label="Production switches unchanged"
                value="Yes"
                testId="live-pilot-switches-unchanged"
              />
              <Row
                label="Evidence schema readiness"
                value={data.dryRunRehearsal?.evidenceSchemaReadiness || "ready_for_test_evidence"}
                testId="live-pilot-evidence-schema"
              />
              <Row
                label="Checksum result"
                value={data.dryRunRehearsal?.checksumResult || "content_integrity_checksum_supported"}
                testId="live-pilot-checksum-result"
              />
              <Row
                label="Idempotency result"
                value={
                  data.dryRunRehearsal?.idempotencyResult ||
                  "at_most_one_provider_attempt_per_authorized_run"
                }
                testId="live-pilot-idempotency-result"
              />
              <Row
                label="Rollback readiness"
                value={data.dryRunRehearsal?.rollbackReadiness || "switches_off_available"}
                testId="live-pilot-rollback"
              />
            </div>
            <h3 className="admin-section-title" style={{ marginTop: "1rem" }}>
              Blockers remaining
            </h3>
            <ul data-testid="live-pilot-rehearsal-blockers">
              {(data.dryRunRehearsal?.blockersRemaining || []).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginTop: "1.5rem" }} data-testid="live-pilot-control-plane">
            <h2 className="admin-section-title">
              {data.liveRunControlPlane?.heading || "One-agent live-run control plane"}
            </h2>
            <p className="wa-metric-hint" role="status" data-testid="live-pilot-control-plane-warning">
              Preparation only — no genuine OpenAI generation — no Production authorization created
              by this page. No Run-now action. No API key field.
            </p>
            <div className="workforce-status-grid">
              <Row
                label="Provider configured"
                value={data.liveRunControlPlane?.providerConfigured ? "Yes" : "No"}
                testId="cp-provider-configured"
              />
              <Row
                label="API key configured"
                value={data.liveRunControlPlane?.apiKeyConfigured ? "Yes" : "No"}
                testId="cp-api-key"
              />
              <Row
                label="Official catalog status"
                value={String(data.liveRunControlPlane?.officialCatalogStatus || "not_checked")}
                testId="cp-catalog"
              />
              <Row
                label="Account access status"
                value={String(data.liveRunControlPlane?.accountAccessStatus || "not_checked")}
                testId="cp-account-access"
              />
              <Row
                label="Approved model"
                value={String(data.liveRunControlPlane?.approvedModel || "—")}
                testId="cp-approved-model"
              />
              <Row
                label="Approved snapshot"
                value={String(data.liveRunControlPlane?.approvedSnapshot || "—")}
                testId="cp-approved-snapshot"
              />
              <Row
                label="Official pricing status"
                value={String(data.liveRunControlPlane?.officialPricingStatus || "not_checked")}
                testId="cp-pricing"
              />
              <Row
                label="Billing-path status"
                value={String(data.liveRunControlPlane?.billingPathStatus || "unknown")}
                testId="cp-billing"
              />
              <Row
                label="Authorization status"
                value={String(data.liveRunControlPlane?.authorizationStatus || "none")}
                testId="cp-auth-status"
              />
              <Row
                label="Authorization expiry"
                value={String(data.liveRunControlPlane?.authorizationExpiry || "—")}
                testId="cp-auth-expiry"
              />
              <Row
                label="Authorization consumed"
                value={data.liveRunControlPlane?.authorizationConsumed ? "Yes" : "No"}
                testId="cp-auth-consumed"
              />
              <Row
                label="Execution switch"
                value={data.liveRunControlPlane?.executionSwitch ? "On" : "Off"}
                testId="cp-exec-switch"
              />
              <Row
                label="Pilot switch"
                value={data.liveRunControlPlane?.pilotSwitch ? "On" : "Off"}
                testId="cp-pilot-switch"
              />
              <Row
                label="Queue count"
                value={String(data.liveRunControlPlane?.queueCount ?? 0)}
                testId="cp-queue"
              />
              <Row
                label="Concurrent runs"
                value={String(data.liveRunControlPlane?.concurrentRuns ?? 0)}
                testId="cp-concurrent"
              />
              <Row
                label="Scheduler health"
                value={String(data.liveRunControlPlane?.schedulerHealth || "unknown")}
                testId="cp-scheduler"
              />
              <Row
                label="Evidence store"
                value={String(data.liveRunControlPlane?.evidenceStore || "unavailable")}
                testId="cp-evidence"
              />
              <Row
                label="Provider-call allowed"
                value={data.liveRunControlPlane?.providerCallAllowed ? "Yes" : "No"}
                testId="cp-provider-allowed"
              />
              <Row
                label="Live execution ready"
                value={data.liveRunControlPlane?.liveExecutionReady ? "Yes" : "No"}
                testId="cp-live-ready"
              />
            </div>
            <h3 className="admin-section-title" style={{ marginTop: "1rem" }}>
              Remaining blockers
            </h3>
            <ul data-testid="live-pilot-control-plane-blockers">
              {(data.liveRunControlPlane?.remainingBlockers || []).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginTop: "1.5rem" }} data-testid="live-pilot-blockers">
            <h2 className="admin-section-title">Blocking reasons</h2>
            <ul data-testid="live-pilot-disabled-reasons">
              {(data.activationPreflight?.blockingReasons || []).map((r) => (
                <li key={r}>{r}</li>
              ))}
              {disabledReasons.map((r) => (
                <li key={`elig-${r}`}>{r}</li>
              ))}
            </ul>
            <p className="wa-metric-hint" style={{ marginTop: "0.75rem" }}>
              {data.vercelSecretGuidance ||
                "Configure OPENAI_API_KEY only through the Vercel Production sensitive environment UI. Never enter secrets on this page."}{" "}
              See <code>doc/ONE-AGENT-PROVIDER-ACTIVATION-RUNBOOK.md</code>.
            </p>
          </section>

          <section style={{ marginTop: "1.5rem" }}>
            <h2 className="admin-section-title">Controls</h2>
            <p className="wa-metric-hint">
              Run stays disabled until the server status endpoint reports every gate.
              This UI never calls OpenAI directly and has no API-secret input field.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginTop: "0.75rem",
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                disabled={!runEnabled || busy}
                data-testid="live-pilot-run"
                title={disabledReasons.join("; ") || "Run disabled"}
                onClick={() => {
                  setNote(
                    "Execute via POST /api/admin/live-agent-pilot/execute with Founder approval fields. UI does not auto-fire provider calls."
                  );
                }}
              >
                {runEnabled ? "Run (server-eligible)" : "Run (disabled)"}
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
            <p style={{ marginTop: "1rem" }}>
              <StatusBadge tone="warning">
                liveExecutionReady:{" "}
                {String(Boolean(data.workforce?.liveExecutionReady))}
              </StatusBadge>{" "}
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
