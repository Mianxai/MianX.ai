"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";

function yesNo(value) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return null;
}

function collectConfigRows(data) {
  if (!data) return [];
  const cfg = data.config || data;
  const rows = [];

  const push = (label, value, hint) => {
    const yn = yesNo(value);
    if (yn === null) return;
    rows.push({ label, value: yn, ok: value === true, hint });
  };

  const pushText = (label, value, hint, ok = null) => {
    if (value == null || value === "") return;
    rows.push({
      label,
      value: String(value),
      ok,
      hint,
      text: true,
    });
  };

  push("Supabase", cfg.supabase ?? data.supabase);
  push(
    "AI provider (Anthropic)",
    cfg.anthropic ?? cfg.providers?.anthropic ?? data.anthropic,
    "Never displays secret values"
  );
  push("Admin auth configured", cfg.adminAuth ?? cfg.admin_auth);
  push("Lead capture API", cfg.leads ?? cfg.leadCapture);
  push(
    "Rate limit durable",
    cfg.rateLimitDurable,
    "In-memory is not cluster-safe"
  );
  pushText(
    "Rate limit backend",
    cfg.rateLimitBackend,
    "Honest backend label — never secrets",
    cfg.rateLimitDurable === true
  );
  pushText(
    "Scheduler mode",
    cfg.schedulerMode,
    "No in-repo platform cron; tick is pull-based",
    cfg.schedulerAutomaticProcessing === true
  );
  push(
    "Automatic queue processing",
    cfg.schedulerAutomaticProcessing,
    "Requires external/Pro scheduler calling the tick endpoint"
  );

  // Pass through any additional boolean flags without exposing secrets.
  const skip = new Set([
    "supabase",
    "anthropic",
    "providers",
    "adminAuth",
    "admin_auth",
    "leads",
    "leadCapture",
    "founderActions",
    "founder_actions",
    "actions",
    "rateLimitDurable",
    "rateLimitBackend",
    "schedulerMode",
    "schedulerAutomaticProcessing",
    "siteHostname",
    "adminAccessModel",
    "providerCircuitState",
    "runtimeVersion",
  ]);
  for (const [key, val] of Object.entries(cfg)) {
    if (skip.has(key)) continue;
    if (typeof val === "boolean") {
      push(key.replace(/_/g, " "), val);
    } else if (val && typeof val === "object" && !Array.isArray(val)) {
      for (const [k2, v2] of Object.entries(val)) {
        if (typeof v2 === "boolean") push(`${key}: ${k2}`, v2);
      }
    }
  }

  return rows;
}

export default function SettingsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotConfigured(false);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.status === 503) {
        setNotConfigured(true);
        setData(null);
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error?.message || json?.error || "Failed to load settings");
      }
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const rows = collectConfigRows(data);
  const actions =
    data?.founderActions || data?.founder_actions || data?.actionsRequired || [];

  return (
    <AdminShell
      title="Settings"
      actions={
        <button type="button" className="header-btn-ghost" onClick={load} disabled={loading}>
          {loading ? <MianxLoader variant="inline" label="Refreshing settings…" /> : "Refresh"}
        </button>
      }
    >
      {notConfigured && (
        <div className="admin-notice" role="alert">
          Settings status is unavailable until the admin settings API can reach Supabase.
        </div>
      )}
      {error && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}
      <DelayedLoader
        active={loading && !data}
        variant="section"
        label="Loading settings…"
      />

      {rows.length > 0 && (
        <section className="settings-section" aria-labelledby="settings-config-h">
          <h2 id="settings-config-h">Configuration status</h2>
          <p className="runtime-muted">
            Yes/No visibility only — secret values are never shown.
          </p>
          <ul className="settings-rows">
            {rows.map((row) => (
              <li key={row.label} className="settings-row">
                <div>
                  <span className="settings-row-label">{row.label}</span>
                  {row.hint && <span className="settings-row-hint">{row.hint}</span>}
                </div>
                <span
                  className={`status-pill ${
                    row.text
                      ? row.ok === true
                        ? "status-yes"
                        : row.ok === false
                          ? "status-no"
                          : "status-muted"
                      : row.ok
                        ? "status-yes"
                        : "status-no"
                  }`}
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!error && !notConfigured && rows.length === 0 && data && !loading && (
        <div className="empty-state">
          <h3>No configuration flags returned</h3>
          <p>The settings API did not include any yes/no status fields.</p>
        </div>
      )}

      {Array.isArray(actions) && actions.length > 0 && (
        <section className="settings-section" aria-labelledby="settings-actions-h">
          <h2 id="settings-actions-h">Founder actions required</h2>
          <ul className="settings-actions">
            {actions.map((action, i) => {
              const label =
                typeof action === "string"
                  ? action
                  : action.label || action.title || `Action ${i + 1}`;
              const detail =
                typeof action === "object" ? action.description || action.detail : null;
              return (
                <li key={`${label}-${i}`} className="settings-action">
                  <strong>{label}</strong>
                  {detail && <p className="runtime-muted">{detail}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </AdminShell>
  );
}
