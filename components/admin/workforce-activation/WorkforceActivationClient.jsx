"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import FounderPageLayout from "@/components/admin/FounderPageLayout";

export default function WorkforceActivationClient() {
  const [data, setData] = useState(null);
  const [preflight, setPreflight] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
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

  const checks = preflight.preflight?.checks || {};
  const verify = preflight.verifySummary || data.verify || {};
  const foundationReady = Boolean(verify.foundationReady || data.foundationReady);
  const dbReady = Boolean(checks.durableDatabase && checks.seatRegistryPersisted445);
  const keyPresent = Boolean(checks.openRouterKeyPresent);

  const checklist = [
    {
      id: "migration",
      label: "Database migration",
      status: checks.durableDatabase ? "Ready" : "Action required",
    },
    {
      id: "bootstrap",
      label: "Workforce bootstrap",
      status: checks.seatRegistryPersisted445 ? "Ready" : "Action required",
    },
    {
      id: "verify",
      label: "445-seat database verification",
      status: checks.seatRegistryPersisted445 ? "Ready" : "Blocked",
    },
    {
      id: "key",
      label: "OpenRouter key",
      status: keyPresent ? "Ready" : foundationReady ? "Action required" : "Optional until foundation",
    },
    {
      id: "free",
      label: "Free-only provider policy",
      status: checks.freeOnlyMode ? "Ready" : "Warning",
    },
    {
      id: "queue",
      label: "Durable queue",
      status: checks.queue ? "Ready" : "Action required",
    },
    {
      id: "leases",
      label: "Durable leases",
      status: checks.leases ? "Ready" : "Action required",
    },
    {
      id: "rate",
      label: "Durable rate limiter",
      status: checks.durableRateLimiter?.durableReady ? "Ready" : "Action required",
    },
    { id: "scheduler", label: "Scheduler", status: "Optional" },
    { id: "knowledge", label: "Knowledge", status: "Ready" },
    { id: "memory", label: "Memory", status: "Ready" },
    { id: "qa", label: "Independent QA", status: "Ready" },
    { id: "security", label: "Security gates", status: "Ready" },
    {
      id: "live",
      label: "Controlled activation check",
      status: keyPresent ? "Action required" : "Blocked",
    },
    {
      id: "acceptance",
      label: "AI Software House acceptance",
      status: "Blocked",
    },
  ];

  let cta = "Apply workforce database foundation";
  if (!dbReady) cta = "Apply workforce database foundation";
  else if (!keyPresent) cta = "Add OpenRouter API key";
  else cta = "Run Controlled Activation Check";

  const capacity = data.capacity;
  const persistedDisplay =
    capacity?.persistedSeats === null || capacity?.persistedSeats === undefined
      ? "null (no database)"
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
                <dt>Compiled</dt>
                <dd data-testid="wa-compiled">{capacity?.compiledSeats ?? 445}</dd>
              </div>
              <div>
                <dt>Persisted in database</dt>
                <dd data-testid="wa-persisted">{String(persistedDisplay)}</dd>
              </div>
              <div>
                <dt>Ready to allocate</dt>
                <dd data-testid="wa-ready">{capacity?.readyToAllocate ?? 0}</dd>
              </div>
              <div>
                <dt>Live tested</dt>
                <dd data-testid="wa-live-tested">{data.liveTested ?? 0}</dd>
              </div>
            </dl>
          </>
        }
        attention={
          <ol data-testid="wa-checklist">
            {checklist.map((item) => (
              <li key={item.id} data-testid={`wa-item-${item.id}`}>
                {item.label}: <strong>{item.status}</strong>
              </li>
            ))}
          </ol>
        }
        willHappen={
          <p>
            Complete database foundation first (migration + bootstrap) without any AI API key. Add
            OpenRouter later for real AI execution. This page cannot set Vercel secrets.
          </p>
        }
        willNotHappen={
          <p>
            Compiled seats are never reported as persisted. No OpenRouter calls from this page. Live
            tested stays 0 until a controlled activation succeeds.
          </p>
        }
        primaryAction={
          <div className="founder-cta-row">
            <span className="header-btn" data-testid="wa-primary-action">
              {cta}
            </span>
            <Link href="/admin/workforce-readiness" className="header-btn-ghost">
              Readiness detail
            </Link>
            <details data-testid="wa-live-gate">
              <summary>Terminal commands (Founder-only)</summary>
              <pre className="wr-json">
                {`bash scripts/apply-workforce-foundation.sh
bash scripts/verify-workforce-foundation.sh
# After key is set on the host (example UUID — replace with yours):
bash scripts/run-controlled-workforce-activation.sh \\
  123e4567-e89b-12d3-a456-426614174000
# or:
bash scripts/run-controlled-workforce-activation.sh \\
  "$DISPOSABLE_PROJECT_ID"`}
              </pre>
            </details>
          </div>
        }
        progress={
          <dl className="wr-totals" data-testid="wa-totals">
            <div>
              <dt>Foundation</dt>
              <dd>{foundationReady ? "Ready" : "Required"}</dd>
            </div>
            <div>
              <dt>Provider key</dt>
              <dd>{keyPresent ? "Present" : "Not required for foundation"}</dd>
            </div>
            <div>
              <dt>Paid fallback</dt>
              <dd>Disabled</dd>
            </div>
            <div>
              <dt>Preflight</dt>
              <dd>{preflight.ok ? "OK" : "Issues"}</dd>
            </div>
          </dl>
        }
        results={
          <pre className="wr-json" data-testid="wa-json">
            {JSON.stringify(
              {
                compiledSeats: capacity?.compiledSeats,
                persistedSeats: capacity?.persistedSeats,
                readyToAllocate: capacity?.readyToAllocate,
                liveTested: data.liveTested ?? 0,
                foundationReady,
                providerReady: data.providerReady,
              },
              null,
              2
            )}
          </pre>
        }
      />
    </div>
  );
}
