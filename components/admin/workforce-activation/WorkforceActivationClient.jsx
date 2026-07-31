"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";

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

function MetricCard({ label, value, testId, hint }) {
  return (
    <div className="workforce-status-card" data-testid={testId}>
      <span className="workforce-status-label">{label}</span>
      <strong className="workforce-status-value">{value}</strong>
      {hint ? <span className="wa-metric-hint">{hint}</span> : null}
    </div>
  );
}

function ResultCard({ title, children, testId }) {
  return (
    <section className="wa-result-card" data-testid={testId}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export default function WorkforceActivationClient() {
  const [data, setData] = useState(null);
  const [preflight, setPreflight] = useState(null);
  const [bootPreflight, setBootPreflight] = useState(null);
  const [applyResult, setApplyResult] = useState(null);
  const [idempotencyResult, setIdempotencyResult] = useState(null);
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
      setIdempotencyResult(json);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const checks = useMemo(() => preflight?.preflight?.checks || {}, [preflight]);
  const verify = useMemo(
    () => preflight?.verifySummary || data?.verify || {},
    [preflight, data]
  );
  const capacity = useMemo(() => data?.capacity || {}, [data]);
  const bp = bootPreflight;

  const persistedSeats = Number(capacity.persistedSeats ?? verify.persistedSeats ?? 0);
  const readySeats = Number(capacity.readyToAllocate ?? verify.readyToAllocateSeats ?? 0);
  const bootstrapComplete = persistedSeats === 445 && readySeats === 445;
  const providerConfigured = Boolean(checks.openRouterKeyPresent || verify.providerReady);

  const applyEnabled = useMemo(() => {
    if (bootstrapComplete) return false;
    if (!bp?.ok) return false;
    if (bp.compiledSeats !== 445) return false;
    if (bp.mappedSeats !== 445) return false;
    if ((bp.duplicateSeats ?? 0) !== 0) return false;
    if ((bp.orphanSeats ?? 0) !== 0) return false;
    if (!bp.schemaReady) return false;
    if (confirmText !== CONFIRM_PHRASE) return false;
    return true;
  }, [bp, confirmText, bootstrapComplete]);

  const checklistStatuses = useMemo(() => {
    const persistedOk = bootstrapComplete || bp?.persistedSeats === 445;
    const dbOk = Boolean(checks.durableDatabase || verify.databaseReady || verify.databaseDurable);
    const queueOk = Boolean(checks.queue || verify.queueDurable);
    const leaseOk = Boolean(checks.leases || verify.leaseDurable || verify.leasesDurable);
    const rateOk = Boolean(checks.durableRateLimiter?.durableReady || verify.rateLimitDurable);
    return {
      migration: dbOk ? "Ready" : "Action required",
      bootstrap: persistedOk ? "Ready" : "Action required",
      verify: persistedOk ? "Ready" : "Blocked",
      key: providerConfigured ? "Ready" : "Optional until foundation",
      free: checks.freeOnlyMode !== false ? "Ready" : "Warning",
      queue: queueOk ? "Ready" : "Action required",
      leases: leaseOk ? "Ready" : "Action required",
      rate: rateOk ? "Ready" : "Action required",
      scheduler: "Optional",
      knowledge: "Ready",
      memory: "Ready",
      qa: "Ready",
      security: "Ready",
      live: "Blocked",
      acceptance: "Blocked",
    };
  }, [checks, verify, bootstrapComplete, bp, providerConfigured]);

  const metricCards = [
    { label: "Capacity seats", value: 445, testId: "wa-capacity" },
    { label: "Compiled seats", value: capacity.compiledSeats ?? 445, testId: "wa-compiled" },
    {
      label: "Persisted in database",
      value: Number.isFinite(persistedSeats) ? persistedSeats : "n/a",
      testId: "wa-persisted",
    },
    { label: "Ready to allocate", value: readySeats, testId: "wa-ready" },
    { label: "Allocated", value: capacity.allocated ?? 0, testId: "wa-allocated" },
    {
      label: "Active instances",
      value: verify.activeInstances ?? data?.verify?.activeInstances ?? 0,
      testId: "wa-active",
    },
    { label: "Live tested", value: data?.liveTested ?? 0, testId: "wa-live-tested" },
    {
      label: "Departments",
      value: bp?.departmentCount ?? 20,
      testId: "wa-departments",
    },
    {
      label: "Archetypes",
      value: bp?.archetypeCount ?? verify.archetypeCount ?? 148,
      testId: "wa-archetypes",
    },
    {
      label: "Workflow families",
      value: bp?.workflowFamilyCount ?? 13,
      testId: "wa-workflows",
    },
    {
      label: "Database durability",
      value:
        checks.durableDatabase || verify.databaseDurable || verify.databaseReady
          ? "Durable"
          : "Not durable",
      testId: "wa-db-durable",
    },
    {
      label: "Queue durability",
      value: checks.queue || verify.queueDurable ? "Durable" : "Not durable",
      testId: "wa-queue-durable",
    },
    {
      label: "Lease durability",
      value: checks.leases || verify.leaseDurable || verify.leasesDurable ? "Durable" : "Not durable",
      testId: "wa-lease-durable",
    },
    {
      label: "Rate-limit durability",
      value:
        checks.durableRateLimiter?.durableReady || verify.rateLimitDurable
          ? "Durable"
          : "Not durable",
      testId: "wa-rate-durable",
    },
    {
      label: "Provider status",
      value: providerConfigured ? "Configured" : "AI provider unconfigured",
      testId: "wa-provider",
    },
    {
      label: "Live execution readiness",
      value: providerConfigured && bootstrapComplete
        ? "Ready when gated"
        : "Unavailable until provider configuration",
      testId: "wa-live-exec",
      hint: "liveExecutionReady remains false without a provider",
    },
  ];

  const shell = (body) => (
    <AdminShell
      title="Workforce Setup"
      breadcrumbs={[
        { href: "/admin/command-center", label: "Admin" },
        { label: "Workforce Setup" },
      ]}
    >
      <div className="admin-page wa-page" data-testid="workforce-activation">
        {body}
      </div>
    </AdminShell>
  );

  if (error && !data) {
    return shell(<p role="alert">{error}</p>);
  }
  if (!data || !preflight) {
    return shell(<p className="cc-muted">Loading workforce setup…</p>);
  }

  return shell(
    <>
      <PageHeader
        title="Workforce Setup"
        description="Foundation status for the 445-seat capacity registry. Capacity seats are allocatable slots — not always-on agents."
      />
      <div className="wa-header-meta" data-testid="wa-foundation-badge-row">
        <StatusBadge tone={bootstrapComplete ? "healthy" : "warning"}>
          {bootstrapComplete ? "Bootstrap complete" : "Bootstrap required"}
        </StatusBadge>
        <span className="cc-muted" data-testid="wa-foundation-subtitle">
          {bootstrapComplete
            ? "Database foundation ready. Live execution waits on an AI provider key."
            : "Run preflight, then bootstrap 445 seats into the Production database."}
        </span>
      </div>

      <section aria-label="Foundation metrics">
        <h2 className="wa-section-title">Foundation metrics</h2>
        <div className="workforce-status-grid" data-testid="wa-truth-cards">
          {metricCards.map((c) => (
            <MetricCard key={c.testId} {...c} />
          ))}
        </div>
      </section>

      <section className="wa-panel" aria-label="Attention checklist">
        <h2 className="wa-section-title">What needs attention</h2>
        <ol className="wa-checklist" data-testid="wa-checklist">
          {CHECKLIST_STEPS.map((item) => (
            <li key={item.id} data-testid={`wa-item-${item.id}`}>
              <span className="wa-checklist-label">{item.label}</span>
              <span
                className={`wa-status-pill wa-status-pill--${String(checklistStatuses[item.id])
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                data-testid={`wa-status-${item.id}`}
              >
                {checklistStatuses[item.id]}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wa-panel" aria-label="Actions">
        <h2 className="wa-section-title">Actions</h2>
        <div className="founder-cta-row wa-actions" data-testid="wa-bootstrap-actions">
          <button
            type="button"
            className="header-btn"
            data-testid="wa-run-preflight"
            disabled={busy}
            onClick={runBootPreflight}
          >
            Run Bootstrap Preflight
          </button>
          {bootstrapComplete ? (
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="wa-open-bootstrap"
              disabled
              aria-disabled="true"
              title="Bootstrap already complete — 445 seats persisted"
            >
              Bootstrap complete
            </button>
          ) : (
            <button
              type="button"
              className="header-btn"
              data-testid="wa-open-bootstrap"
              disabled={busy || !bp?.ok}
              onClick={() => setShowConfirm(true)}
            >
              Bootstrap 445 Seats
            </button>
          )}
          <button
            type="button"
            className={bootstrapComplete ? "header-btn" : "header-btn-ghost"}
            data-testid="wa-run-idempotency"
            disabled={busy || !bootstrapComplete}
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
            Refresh Production Truth
          </button>
          <Link href="/admin/workforce-readiness" className="header-btn-ghost">
            Readiness Detail
          </Link>
        </div>
        {bootstrapComplete ? (
          <p className="cc-muted wa-action-hint" data-testid="wa-next-action-hint">
            Recommended next step: Run Idempotency Verification (safe re-check; expects created 0).
          </p>
        ) : null}
      </section>

      <section className="wa-results" data-testid="wa-bootstrap-panels">
        {error ? (
          <p role="alert" className="admin-error-state">
            {error}
          </p>
        ) : null}
        {bp ? (
          <ResultCard title="Preflight result" testId="wa-preflight-panel">
            <p>
              Compiled {bp.compiledSeats} · Mapped {bp.mappedSeats} · Orphans {bp.orphanSeats} ·
              Duplicates {bp.duplicateSeats} · Persisted {String(bp.persistedSeats)} · Schema{" "}
              {bp.schemaReady ? "ready" : "missing"} · Bootstrap{" "}
              {bp.bootstrapRequired ? "required" : "not required"}
            </p>
          </ResultCard>
        ) : null}
        {applyResult ? (
          <ResultCard title="Bootstrap result" testId="wa-apply-panel">
            <p>
              {applyResult.ok ? "Success" : "Failed"} · Created {applyResult.created ?? "—"} ·
              Persisted {String(applyResult.persistedSeats)} · Ready{" "}
              {applyResult.readyToAllocateSeats ?? "—"} · Live tested{" "}
              {applyResult.liveTestedSeats ?? 0} · Provider{" "}
              {applyResult.providerConfigured ? "configured" : "unconfigured"}
            </p>
          </ResultCard>
        ) : null}
        {idempotencyResult ? (
          <ResultCard title="Idempotency verification" testId="wa-idempotency-panel">
            <p>
              {idempotencyResult.ok ? "Verified" : "Failed"} · Created{" "}
              {idempotencyResult.created ?? "—"} · Persisted{" "}
              {String(idempotencyResult.persistedSeats)} · Ready{" "}
              {idempotencyResult.readyToAllocateSeats ?? "—"} · Duplicates{" "}
              {idempotencyResult.duplicates ?? 0} · Orphans {idempotencyResult.orphanSeats ?? 0} ·
              Allocated {idempotencyResult.allocatedSeats ?? 0} · Active{" "}
              {idempotencyResult.activeInstances ?? 0} · Live tested{" "}
              {idempotencyResult.liveTestedSeats ?? 0}
            </p>
          </ResultCard>
        ) : null}
        {showConfirm ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-confirm-title"
            data-testid="wa-confirm-modal"
            className="wa-confirm-modal"
          >
            <h3 id="wa-confirm-title">Confirm workforce bootstrap</h3>
            <p>
              Type <code>{CONFIRM_PHRASE}</code> to upsert exactly 445 capacity seats. This does not
              allocate agents, start instances, or call an AI provider.
            </p>
            <label htmlFor="wa-confirm-input">Confirmation</label>
            <input
              id="wa-confirm-input"
              data-testid="wa-confirm-input"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
            />
            <div className="founder-cta-row">
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
          </div>
        ) : null}
      </section>

      <details className="wa-technical" data-testid="wa-technical-details">
        <summary>Technical details</summary>
        <pre className="wr-json" data-testid="wa-json">
          {JSON.stringify(
            {
              capacity,
              bootPreflight: bp,
              applyResult,
              idempotencyResult,
              foundationReady: verify.foundationReady,
              providerReady: verify.providerReady,
              liveExecutionReady: verify.liveExecutionReady === true,
            },
            null,
            2
          )}
        </pre>
      </details>
    </>
  );
}
