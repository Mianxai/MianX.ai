"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import FounderPageLayout from "@/components/admin/FounderPageLayout";

const CTA_RULES = [
  { when: "migration", label: "Apply workforce migration" },
  { when: "bootstrap", label: "Bootstrap 445-seat workforce" },
  { when: "key", label: "Add OpenRouter API Key" },
  { when: "live_check", label: "Run Controlled Activation Check" },
  { when: "acceptance", label: "Run AI Software House Acceptance" },
  { when: "activate", label: "Activate AI Software House" },
];

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
  const checklist = [
    { id: "migration", label: "Database migration", status: checks.durableDatabase ? "Ready" : "Action required" },
    { id: "bootstrap", label: "Workforce bootstrap", status: checks.seatRegistry445 ? "Ready" : "Action required" },
    { id: "verify", label: "445-seat verification", status: checks.seatRegistry445 ? "Ready" : "Blocked" },
    { id: "key", label: "OpenRouter key", status: checks.openRouterKeyPresent ? "Ready" : "Action required" },
    { id: "free", label: "Free-only provider policy", status: checks.freeOnlyMode ? "Ready" : "Warning" },
    { id: "queue", label: "Durable queue", status: checks.durableDatabase ? "Ready" : "Action required" },
    { id: "leases", label: "Durable leases", status: checks.durableDatabase ? "Ready" : "Action required" },
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
    { id: "live", label: "Controlled activation check", status: "Blocked" },
    { id: "acceptance", label: "AI Software House acceptance", status: "Blocked" },
  ];

  let cta = CTA_RULES[2].label;
  if (!checks.durableDatabase) cta = CTA_RULES[0].label;
  else if (!checks.seatRegistry445) cta = CTA_RULES[1].label;
  else if (!checks.openRouterKeyPresent) cta = CTA_RULES[2].label;
  else cta = CTA_RULES[3].label;

  const capacity = data.capacity;

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
            <p>
              Capacity: <strong data-testid="wa-capacity">{capacity?.capacitySeats}</strong> · Mapped:{" "}
              <strong>{capacity?.mappedSeats}</strong> · Available / Ready to allocate:{" "}
              {capacity?.available} · Allocated: {capacity?.allocated} · Live tested:{" "}
              <span data-testid="wa-live-tested">{data.liveTested ?? 0}</span>
            </p>
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
            After migration, bootstrap, and OpenRouter key setup, run the controlled activation
            check from a secure terminal (max 3 provider calls) on a disposable project. This page
            cannot set Vercel secrets automatically.
          </p>
        }
        willNotHappen={
          <p>
            No OpenRouter calls from this page. No production deploy. No Founder Proof mutation. Live
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
                {`npm run workforce:bootstrap
npm run workforce:verify
# After key is set in the host:
npm run workforce:live-activation-check -- --project <disposable-uuid> --confirm
npm run workforce:software-house-acceptance -- --project <disposable-uuid> --confirm`}
              </pre>
            </details>
          </div>
        }
        progress={
          <dl className="wr-totals" data-testid="wa-totals">
            <div>
              <dt>Ready to allocate</dt>
              <dd>{capacity?.mappedSeats}</dd>
            </div>
            <div>
              <dt>Provider key</dt>
              <dd>{checks.openRouterKeyPresent ? "Present" : "Required"}</dd>
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
                liveTested: data.liveTested ?? 0,
                preflightChecks: {
                  openRouterKeyPresent: checks.openRouterKeyPresent,
                  freeOnlyMode: checks.freeOnlyMode,
                  paidFallbackDisabled: checks.paidFallbackDisabled,
                  seatRegistry445: checks.seatRegistry445,
                  openRouterReachable: checks.openRouterReachable,
                },
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
