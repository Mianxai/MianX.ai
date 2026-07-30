"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import FounderPageLayout from "@/components/admin/FounderPageLayout";

export default function WorkforceActivationClient() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/workforce-activation", { credentials: "include" });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || "Failed to load activation");
    setData(json);
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
  if (!data) {
    return (
      <div className="admin-page" data-testid="workforce-activation">
        <p className="cc-muted">Loading workforce setup…</p>
      </div>
    );
  }

  const items = data.checklist?.items || [];
  const oneKey = data.oneKey;
  const capacity = data.capacity;

  return (
    <div className="admin-page" data-testid="workforce-activation">
      <FounderPageLayout
        title="Workforce Setup"
        happening={
          <>
            <p data-testid="wa-445-explanation">{data.explanation}</p>
            <p>
              Capacity: <strong data-testid="wa-capacity">{capacity?.capacitySeats}</strong> · Mapped:{" "}
              <strong>{capacity?.mappedSeats}</strong> · Available: {capacity?.available} ·
              Allocated: {capacity?.allocated} · Live-tested: {data.liveTested ?? 0}
            </p>
          </>
        }
        attention={
          <ul>
            {items.map((item) => (
              <li key={item.id} data-testid={`wa-item-${item.id}`}>
                {item.label}: <strong>{item.status}</strong>
              </li>
            ))}
          </ul>
        }
        willHappen={
          <p>
            After you add <code>OPENROUTER_API_KEY</code> and apply Phase I.2 migrations, run the
            controlled activation check (max 3 provider calls) on a disposable project.
          </p>
        }
        willNotHappen={
          <p>
            This page does not call OpenRouter, invent agents, deploy production, or mutate the
            production Founder Proof.
          </p>
        }
        primaryAction={
          <div className="founder-cta-row">
            <span className="header-btn" data-testid="wa-primary-action">
              {oneKey?.founderPrimaryAction || "Add OpenRouter API Key"}
            </span>
            <Link href="/admin/workforce-readiness" className="header-btn-ghost">
              Workforce Readiness
            </Link>
            <details data-testid="wa-live-gate">
              <summary>Run Controlled Workforce Activation Check (gated)</summary>
              <p className="cc-muted">
                Requires OPENROUTER_API_KEY, ALLOW_LIVE_PROVIDER_TEST=true, free-only, safe project,
                max 3 requests. Use{" "}
                <code>npm run workforce:live-activation-check -- --project &lt;uuid&gt; --confirm</code>
                . Not available from CI/Preview.
              </p>
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
              <dt>Provider</dt>
              <dd>{oneKey?.keyPresent ? "Key present" : "Key required"}</dd>
            </div>
            <div>
              <dt>Paid fallback</dt>
              <dd>Disabled</dd>
            </div>
            <div>
              <dt>Rate limiter</dt>
              <dd>{data.checklist?.rateLimit?.label || "—"}</dd>
            </div>
          </dl>
        }
        results={
          <pre className="wr-json" data-testid="wa-json">
            {JSON.stringify(
              {
                completionTruth: data.checklist?.completionTruth,
                oneKey: {
                  requiredKey: oneKey?.requiredKey,
                  keyPresent: oneKey?.keyPresent,
                  paidFallbackEnabled: oneKey?.paidFallbackEnabled,
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
