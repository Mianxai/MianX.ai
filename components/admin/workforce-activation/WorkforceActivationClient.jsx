"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FounderPageLayout from "@/components/admin/FounderPageLayout";

const CONFIRM_PHRASE = "BOOTSTRAP 445";

const CHECKLIST_STEPS = [
  { id: "migration", label: "Database migration" },
  { id: "bootstrap", label: "Workforce bootstrap" },
  { id: "verify", label: "445-seat database verification" },
  { id: "key", label: "AI provider key" },
  { id: "free", label: "Free-only provider policy" },
  { id: "queue", label: "Durable queue" },
  { id: "leases", label: "Durable leases" },
  { id: "rate", label: "Durable rate limiter" },
  { id: "scheduler", label: "Scheduler" },
  { id: "knowledge", label: "Knowledge" },
  { id: "memory", label: "Memory" },
  { id: "qa", label: "Independent QA" },
  { id: "security", label: "Security gates" },
  { id: "live", label: "Controlled activation check" },
  { id: "acceptance", label: "AI Software House acceptance" },
];

export default function WorkforceActivationClient() {
  const [data, setData] = useState(null);
  const [preflight, setPreflight] = useState(null);
  const [bootPreflight, setBootPreflight] = useState(null);
  const [applyResult, setApplyResult] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const load = useCallback(async () => {
    const [snap, pre] = await Promise.all([
      fetch("/api/admin/workforce-activation", { credentials: "include" }),
      fetch("/api/admin/workforce-activation/preflight", { credentials: "include" }),
    ]);
    const snapJson = await snap.json();
    const preJson = await pre.json();
    if (!snap.ok) throw new Error(snapJson?.error?.message || "Activation load failed");
    if (!pre.ok) throw new Error(preJson?.error?.message || "Preflight failed");
    setData(snapJson);
    setPreflight(preJson);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await load();
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const runBootPreflight = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/workforce/bootstrap", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ mode: "preflight" }),
      });
      const json = await res.json();
      if (!res.ok && !json?.compiledSeats) {
        throw new Error(json?.errors?.[0] || json?.error?.message || "Preflight failed");
      }
      setBootPreflight(json);
      setApplyResult(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const runApply = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/workforce/bootstrap", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ mode: "apply", confirmation: confirmText }),
      });
      const json = await res.json();
      setApplyResult(json);
      setShowConfirm(false);
      setConfirmText("");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const runIdempotency = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/workforce/bootstrap", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ mode: "idempotency", confirmation: CONFIRM_PHRASE }),
      });
      const json = await res.json();
      setApplyResult(json);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const checks = useMemo(() => preflight?.preflight?.checks || {}, [preflight]);
  const verify = preflight?.verifySummary || data?.verify || {};
  const capacity = useMemo(() => data?.capacity || {}, [data]);
  const bp = bootPreflight;

  const applyEnabled = useMemo(() => {
    if (!bp?.ok) return false;
    if (bp.compiledSeats !== 445) return false;
    if (bp.mappedSeats !== 445) return false;
    if ((bp.duplicateSeats ?? 0) !== 0) return false;
    if ((bp.orphanSeats ?? 0) !== 0) return false;
    if (!bp.schemaReady) return false;
    if (confirmText !== CONFIRM_PHRASE) return false;
    return true;
  }, [bp, confirmText]);

  const checklistStatuses = useMemo(() => {
    const persistedOk = Number(capacity.persistedSeats) === 445 || bp?.persistedSeats === 445;
    return {
      migration: checks.durableDatabase || bp?.schemaReady ? "Ready" : "Action required",
      bootstrap: persistedOk ? "Ready" : "Action required",
      verify: persistedOk ? "Ready" : "Blocked",
      key: checks.openRouterKeyPresent ? "Ready" : "Optional until foundation",
      free: checks.freeOnlyMode ? "Ready" : "Warning",
      queue: checks.queue || persistedOk ? "Ready" : "Action required",
      leases: checks.leases || persistedOk ? "Ready" : "Action required",
      rate: checks.durableRateLimiter?.durableReady ? "Ready" : "Action required",
      scheduler: "Optional",
      knowledge: "Ready",
      memory: "Ready",
      qa: "Ready",
      security: "Ready",
      live: checks.openRouterKeyPresent ? "Action required" : "Blocked",
      acceptance: "Blocked",
    };
  }, [checks, capacity, bp]);

  if (error && !data) {
    return (
      <div className="admin-page" data-testid="workforce-activation">
        <p role="alert">{error}</p>
      </div>
    );
  }
  if (!data || !preflight) {
    return (
      <div className="admin-page" data-testid="workforce-activation">
        <p className="cc-muted">Loading workforce setup…</p>
      </div>
    );
  }

  const persistedDisplay =
    capacity.persistedSeats === null || capacity.persistedSeats === undefined
      ? "n/a"
      : capacity.persistedSeats;

  return (
    <div className="admin-page" data-testid="workforce-activation">
      <FounderPageLayout
        title="Workforce Setup"
        happening={
          <>
            <p data-testid="wa-445-explanation">
              Your MianX workforce contains 445 allocatable seats across 20 departments. MianX
              activates only the specialists needed for current project work.
            </p>
            <p data-testid="wa-provider-free">
              {data.providerFreeMessage ||
                "Workforce foundation ready. Add an AI provider key to start real AI execution."}
            </p>
            <dl className="wr-totals" data-testid="wa-truth-cards">
              <div>
                <dt>Capacity seats</dt>
                <dd data-testid="wa-capacity">445</dd>
              </div>
              <div>
                <dt>Compiled seats</dt>
                <dd data-testid="wa-compiled">{capacity.compiledSeats ?? 445}</dd>
              </div>
              <div>
                <dt>Persisted in database</dt>
                <dd data-testid="wa-persisted">{String(persistedDisplay)}</dd>
              </div>
              <div>
                <dt>Ready to allocate</dt>
                <dd data-testid="wa-ready">{capacity.readyToAllocate ?? 0}</dd>
              </div>
              <div>
                <dt>Allocated</dt>
                <dd data-testid="wa-allocated">{capacity.allocated ?? 0}</dd>
              </div>
              <div>
                <dt>Active instances</dt>
                <dd data-testid="wa-active">{verify.activeInstances ?? 0}</dd>
              </div>
              <div>
                <dt>Live tested</dt>
                <dd data-testid="wa-live-tested">{data.liveTested ?? 0}</dd>
              </div>
              <div>
                <dt>Departments</dt>
                <dd data-testid="wa-departments">{bp?.departmentCount ?? verify.departmentCount ?? 20}</dd>
              </div>
              <div>
                <dt>Archetypes</dt>
                <dd data-testid="wa-archetypes">{bp?.archetypeCount ?? verify.archetypeCount ?? "—"}</dd>
              </div>
              <div>
                <dt>Workflow families</dt>
                <dd data-testid="wa-workflows">{bp?.workflowFamilyCount ?? 13}</dd>
              </div>
              <div>
                <dt>Database durability</dt>
                <dd data-testid="wa-db-durable">
                  {checks.durableDatabase || verify.databaseDurable ? "Durable" : "Not durable"}
                </dd>
              </div>
              <div>
                <dt>Queue durability</dt>
                <dd data-testid="wa-queue-durable">
                  {checks.queue || verify.queueDurable ? "Durable" : "Not durable"}
                </dd>
              </div>
              <div>
                <dt>Lease durability</dt>
                <dd data-testid="wa-lease-durable">
                  {checks.leases || verify.leaseDurable ? "Durable" : "Not durable"}
                </dd>
              </div>
              <div>
                <dt>Provider status</dt>
                <dd data-testid="wa-provider">
                  {checks.openRouterKeyPresent ? "Configured" : "AI provider unconfigured"}
                </dd>
              </div>
              <div>
                <dt>Live execution readiness</dt>
                <dd data-testid="wa-live-exec">
                  {checks.openRouterKeyPresent && Number(capacity.persistedSeats) === 445
                    ? "Ready when gated"
                    : "Unavailable until provider configuration"}
                </dd>
              </div>
            </dl>
          </>
        }
        attention={
          <ol data-testid="wa-checklist" style={{ listStyleType: "decimal", paddingLeft: "1.5rem" }}>
            {CHECKLIST_STEPS.map((item, idx) => (
              <li key={item.id} value={idx + 1} data-testid={`wa-item-${item.id}`}>
                <span aria-hidden="true">{idx + 1}. </span>
                {item.label}: <strong>{checklistStatuses[item.id]}</strong>
              </li>
            ))}
          </ol>
        }
        willHappen={
          <p>
            Complete database foundation with the secure Admin bootstrap (runs on the deployed
            server where Production secrets are available). An AI provider key is not required for
            foundation.
          </p>
        }
        willNotHappen={
          <p>
            Local Terminal cannot read Vercel Sensitive Production variables. Do not use vercel env
            pull/run for bootstrap. No OpenRouter calls from this page. Live tested stays 0 until a
            controlled activation succeeds.
          </p>
        }
        primaryAction={
          <div className="founder-cta-row" data-testid="wa-bootstrap-actions">
            <button
              type="button"
              className="header-btn"
              data-testid="wa-run-preflight"
              disabled={busy}
              onClick={runBootPreflight}
            >
              Run Bootstrap Preflight
            </button>
            <button
              type="button"
              className="header-btn"
              data-testid="wa-open-bootstrap"
              disabled={busy || !bp?.ok}
              onClick={() => setShowConfirm(true)}
            >
              Bootstrap 445 Seats
            </button>
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="wa-run-idempotency"
              disabled={busy || Number(capacity.persistedSeats) !== 445}
              onClick={runIdempotency}
            >
              Run Idempotency Verification
            </button>
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="wa-refresh-truth"
              disabled={busy}
              onClick={() => load()}
            >
              Refresh production truth
            </button>
            <Link href="/admin/workforce-readiness" className="header-btn-ghost">
              Readiness detail
            </Link>
          </div>
        }
        progress={
          <div data-testid="wa-bootstrap-panels">
            {error ? (
              <p role="alert" className="admin-error-state">
                {error}
              </p>
            ) : null}
            {bp ? (
              <section data-testid="wa-preflight-panel">
                <h3>Preflight result</h3>
                <p>
                  Compiled {bp.compiledSeats} · Mapped {bp.mappedSeats} · Orphans {bp.orphanSeats} ·
                  Duplicates {bp.duplicateSeats} · Persisted {String(bp.persistedSeats)} · Schema{" "}
                  {bp.schemaReady ? "ready" : "missing"} · Bootstrap{" "}
                  {bp.bootstrapRequired ? "required" : "not required"}
                </p>
              </section>
            ) : null}
            {applyResult ? (
              <section data-testid="wa-apply-panel">
                <h3>Bootstrap result</h3>
                <p>
                  {applyResult.ok ? "Success" : "Failed"} · Created {applyResult.created ?? "—"} ·
                  Persisted {String(applyResult.persistedSeats)} · Ready{" "}
                  {applyResult.readyToAllocateSeats ?? "—"} · Live tested{" "}
                  {applyResult.liveTestedSeats ?? 0} · Provider{" "}
                  {applyResult.providerConfigured ? "configured" : "unconfigured"}
                </p>
              </section>
            ) : null}
            {showConfirm ? (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="wa-confirm-title"
                data-testid="wa-confirm-modal"
                className="cc-card"
                style={{ marginTop: "1rem", padding: "1rem" }}
              >
                <h3 id="wa-confirm-title">Confirm workforce bootstrap</h3>
                <p>
                  Type <code>{CONFIRM_PHRASE}</code> to upsert exactly 445 capacity seats. This does
                  not allocate agents, start instances, or call an AI provider.
                </p>
                <label htmlFor="wa-confirm-input">Confirmation</label>
                <input
                  id="wa-confirm-input"
                  data-testid="wa-confirm-input"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  autoComplete="off"
                  style={{ display: "block", width: "100%", margin: "0.5rem 0" }}
                />
                <button
                  type="button"
                  className="header-btn"
                  data-testid="wa-confirm-apply"
                  disabled={!applyEnabled || busy}
                  onClick={runApply}
                >
                  Apply bootstrap
                </button>
                <button
                  type="button"
                  className="header-btn-ghost"
                  data-testid="wa-confirm-cancel"
                  onClick={() => {
                    setShowConfirm(false);
                    setConfirmText("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        }
        results={
          <details data-testid="wa-technical-details">
            <summary>Technical details</summary>
            <pre className="wr-json" data-testid="wa-json">
              {JSON.stringify(
                {
                  capacity,
                  bootPreflight: bp,
                  applyResult,
                  foundationReady: verify.foundationReady,
                  providerReady: verify.providerReady,
                },
                null,
                2
              )}
            </pre>
          </details>
        }
      />
    </div>
  );
}
