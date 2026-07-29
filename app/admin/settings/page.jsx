"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

/**
 * @typedef {{
 *   group: string,
 *   groupOrder: number,
 *   label: string,
 *   value: string,
 *   tone: "yes"|"no"|"warning"|"info"|"muted",
 *   explain?: string|null,
 * }} SettingsRow
 */

const GROUPS = [
  { id: "A", title: "A. Core platform", order: 1 },
  { id: "B", title: "B. Authentication and membership", order: 2 },
  { id: "C", title: "C. AI provider", order: 3 },
  { id: "D", title: "D. Scheduler and worker", order: 4 },
  { id: "E", title: "E. Rate limiting", order: 5 },
  { id: "F", title: "F. Analytics and integrations", order: 6 },
  { id: "G", title: "G. Compatibility/bootstrap diagnostics", order: 7 },
];

function explainBlock({ expected, blocksProof, blocksLive, next }) {
  return [
    `Expected: ${expected}`,
    `Blocks deterministic Founder Proof: ${blocksProof}`,
    `Blocks live execution: ${blocksLive}`,
    `Next action: ${next}`,
  ].join(" · ");
}

/**
 * Build Founder-readable settings rows. Never includes secret values.
 * @param {object|null} data
 * @returns {SettingsRow[]}
 */
export function collectConfigRows(data) {
  if (!data) return [];
  const cfg = data.config || data;
  const rows = [];

  const push = ({
    group,
    label,
    ok,
    valueOverride = null,
    toneOverride = null,
    explain = null,
  }) => {
    if (ok == null && valueOverride == null) return;
    let value;
    let tone;
    if (valueOverride != null) {
      value = valueOverride;
      tone = toneOverride || "info";
    } else if (ok === true) {
      value = "Yes";
      tone = "yes";
    } else {
      value = "No";
      tone = toneOverride || "no";
    }
    const groupMeta = GROUPS.find((g) => g.id === group) || GROUPS[0];
    rows.push({
      group: groupMeta.title,
      groupOrder: groupMeta.order,
      label,
      value,
      tone,
      explain: tone === "yes" && !explain ? null : explain,
    });
  };

  // A. Core platform
  push({
    group: "A",
    label: "Supabase",
    ok: cfg.supabase ?? data.supabase,
    explain:
      !(cfg.supabase ?? data.supabase)
        ? explainBlock({
            expected: "No — required for admin data",
            blocksProof: "Yes",
            blocksLive: "Yes",
            next: "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY (never paste secrets into the UI).",
          })
        : null,
  });
  push({
    group: "A",
    label: "Canonical Site URL",
    ok: cfg.siteUrl,
    explain: !cfg.siteUrl
      ? explainBlock({
          expected: "Optional for local proof; recommended for production links",
          blocksProof: "No",
          blocksLive: "Partial — absolute links/OG may fall back",
          next: "Set NEXT_PUBLIC_SITE_URL when publishing a canonical hostname.",
        })
      : cfg.siteHostname
        ? `Hostname shown for confirmation only: ${cfg.siteHostname}`
        : null,
  });
  push({
    group: "A",
    label: "Lead Capture API",
    ok: cfg.leads ?? cfg.leadCapture,
    explain: !(cfg.leads ?? cfg.leadCapture)
      ? explainBlock({
          expected: "No until Supabase is configured",
          blocksProof: "No",
          blocksLive: "Yes for public lead capture",
          next: "Configure Supabase, then verify /api/leads.",
        })
      : null,
  });

  // B. Auth / membership
  push({
    group: "B",
    label: "Admin Auth Configured",
    ok: cfg.adminAuth ?? cfg.admin_auth,
    explain: !(cfg.adminAuth ?? cfg.admin_auth)
      ? explainBlock({
          expected: "No until membership enforcement is active",
          blocksProof: "Yes for gated admin",
          blocksLive: "Yes",
          next: "Ensure admin_memberships exists and an active Founder membership is present.",
        })
      : null,
  });
  if (typeof cfg.membershipTable === "boolean") {
    push({
      group: "B",
      label: "Membership Schema",
      ok: cfg.membershipTable,
      explain: !cfg.membershipTable
        ? explainBlock({
            expected: "No until migration applied",
            blocksProof: "Yes for fail-closed admin",
            blocksLive: "Yes",
            next: "Apply admin_memberships migrations after dry-run review (Founder only).",
          })
        : null,
    });
  }
  if (cfg.adminAccessModel) {
    push({
      group: "B",
      label: "Admin Access Model",
      ok: null,
      valueOverride: String(cfg.adminAccessModel),
      toneOverride: "info",
    });
  }

  // C. AI provider
  const anthropic = cfg.anthropic ?? cfg.providers?.anthropic ?? data.anthropic;
  push({
    group: "C",
    label: "AI Provider (Anthropic)",
    ok: anthropic,
    toneOverride: anthropic ? "yes" : "info",
    valueOverride: anthropic ? "Yes" : "Not configured",
    explain: anthropic
      ? "Configured — secret value is never shown."
      : "Not configured — not required for deterministic Founder Proof. Required later for explicitly enabled live AI execution.",
  });
  if (cfg.providerCircuitState) {
    const circuit = String(cfg.providerCircuitState);
    const warn = circuit === "open" || circuit === "half_open";
    push({
      group: "C",
      label: "Provider Circuit",
      ok: null,
      valueOverride: circuit,
      toneOverride: warn ? "warning" : "info",
      explain: warn
        ? explainBlock({
            expected: "Closed in healthy operation",
            blocksProof: "No for deterministic proof",
            blocksLive: "Yes while open",
            next: "Wait for cooldown or inspect recent provider failures — do not paste API keys here.",
          })
        : null,
    });
  }

  // D. Scheduler / worker
  push({
    group: "D",
    label: "Runtime Worker Secret",
    ok: cfg.internalWorkerConfigured,
    explain: !cfg.internalWorkerConfigured
      ? explainBlock({
          expected: "No until Founder sets a ≥16-char secret",
          blocksProof: "No for plan review",
          blocksLive: "Yes for automatic queue ticks",
          next: "Set INTERNAL_RUNTIME_SECRET (preferred) or CRON_SECRET in the host — never in the UI.",
        })
      : null,
  });
  push({
    group: "D",
    label: "Scheduler Secret",
    ok: cfg.cronSecretConfigured,
    explain: !cfg.cronSecretConfigured
      ? explainBlock({
          expected: "May share the worker secret; No is OK if INTERNAL_RUNTIME_SECRET is set",
          blocksProof: "No",
          blocksLive: "Yes for cron-authenticated ticks unless worker secret covers it",
          next: "Configure CRON_SECRET or rely on INTERNAL_RUNTIME_SECRET for tick auth.",
        })
      : null,
  });
  push({
    group: "D",
    label: "Scheduler Workflow",
    ok: cfg.platformCronConfigured,
    explain: !cfg.platformCronConfigured
      ? explainBlock({
          expected: "No until GitHub Actions / Pro cron is wired",
          blocksProof: "No",
          blocksLive: "Yes for automatic processing",
          next: "Point an external/Pro scheduler at /api/internal/runtime/tick with Bearer auth.",
        })
      : null,
  });
  if (cfg.schedulerMode) {
    const mode = String(cfg.schedulerMode);
    const warn = /warning|delayed|stale|degraded/i.test(mode);
    push({
      group: "D",
      label: "Scheduler Mode",
      ok: null,
      valueOverride: mode,
      toneOverride: warn ? "warning" : cfg.schedulerAutomaticProcessing ? "yes" : "info",
      explain: warn
        ? explainBlock({
            expected: "Healthy/automatic when ticks succeed within cadence",
            blocksProof: "No",
            blocksLive: "Partial — queue may lag",
            next:
              cfg.schedulerGuidance ||
              "Check GitHub Actions / cron logs; manual Run tick is advanced diagnostics only.",
          })
        : cfg.schedulerGuidance || null,
    });
  }
  push({
    group: "D",
    label: "Automatic Queue Processing",
    ok: cfg.schedulerAutomaticProcessing,
    toneOverride: cfg.schedulerAutomaticProcessing ? "yes" : "info",
    explain: !cfg.schedulerAutomaticProcessing
      ? explainBlock({
          expected: "No until external/Pro scheduler is configured",
          blocksProof: "No",
          blocksLive: "Yes for hands-off queue drain",
          next: "Configure scheduler secret + workflow; do not treat manual Run tick as the primary Founder path.",
        })
      : null,
  });

  // E. Rate limiting
  if (cfg.rateLimitBackend) {
    const backend = String(cfg.rateLimitBackend);
    const inMemory = /in-?memory/i.test(backend) || cfg.rateLimitDurable === false;
    push({
      group: "E",
      label: "Rate Limit Backend",
      ok: null,
      valueOverride: backend,
      toneOverride: cfg.rateLimitDurable ? "yes" : "info",
      explain: inMemory
        ? "Suitable for current controlled proof; not durable or multi-instance safe for later live execution."
        : null,
    });
  }
  push({
    group: "E",
    label: "Durable Rate Limiting",
    ok: cfg.rateLimitDurable,
    toneOverride: cfg.rateLimitDurable ? "yes" : "info",
    explain: !cfg.rateLimitDurable
      ? explainBlock({
          expected: "No is OK for single-instance controlled proof",
          blocksProof: "No",
          blocksLive: "Yes for multi-instance production",
          next: "Set RATE_LIMIT_DURABLE_URL and RATE_LIMIT_DURABLE_TOKEN together when ready (never shown here).",
        })
      : null,
  });
  push({
    group: "E",
    label: "Durable Rate-Limit URL",
    ok: cfg.rateLimitUrlConfigured,
    toneOverride: cfg.rateLimitUrlConfigured ? "yes" : "info",
    explain: !cfg.rateLimitUrlConfigured
      ? explainBlock({
          expected: "No until durable adapter is planned",
          blocksProof: "No",
          blocksLive: "Yes for cluster-safe limits",
          next: "URL alone is not durable — both URL and token must be set. Secrets are never displayed.",
        })
      : cfg.rateLimitDurable
        ? null
        : "URL configured but adapter inactive until token is also set — still treated as in-memory.",
  });

  // F. Analytics
  push({
    group: "F",
    label: "Analytics Integration",
    ok: cfg.analyticsIntegration,
    toneOverride: cfg.analyticsIntegration ? "yes" : "info",
    explain: !cfg.analyticsIntegration
      ? explainBlock({
          expected: "Optional",
          blocksProof: "No",
          blocksLive: "No",
          next: "Enable host analytics only if Founder wants product telemetry.",
        })
      : null,
  });

  // G. Compatibility / bootstrap
  if (typeof cfg.compatibilityMode === "boolean") {
    push({
      group: "G",
      label: "Legacy Compatibility Mode",
      ok: cfg.compatibilityMode,
      toneOverride: cfg.compatibilityMode ? "warning" : "yes",
      valueOverride: cfg.compatibilityMode ? "Yes" : "No",
      explain: cfg.compatibilityMode
        ? explainBlock({
            expected: "No in fail-closed production",
            blocksProof: "No",
            blocksLive: "Softens membership enforcement",
            next: "Complete Founder membership bootstrap, then disable compatibility.",
          })
        : null,
    });
  }
  if (typeof cfg.bootstrapEnabled === "boolean") {
    push({
      group: "G",
      label: "Admin Bootstrap",
      ok: cfg.bootstrapEnabled,
      toneOverride: cfg.bootstrapEnabled ? "warning" : "yes",
      valueOverride: cfg.bootstrapEnabled ? "Yes" : "No",
      explain: cfg.bootstrapEnabled
        ? explainBlock({
            expected: "Temporary only",
            blocksProof: "No",
            blocksLive: "Widens admin unlock — disable after bootstrap",
            next: "Remove MIANX_ADMIN_BOOTSTRAP after an active owner membership exists.",
          })
        : null,
    });
  }
  if (cfg.runtimeVersion) {
    push({
      group: "G",
      label: "Runtime Version",
      ok: null,
      valueOverride: String(cfg.runtimeVersion),
      toneOverride: "muted",
    });
  }

  return rows.sort((a, b) => a.groupOrder - b.groupOrder || a.label.localeCompare(b.label));
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
        router.push(currentAdminLoginHref("/admin/settings"));
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

  const grouped = GROUPS.map((g) => ({
    ...g,
    rows: rows.filter((r) => r.group === g.title),
  })).filter((g) => g.rows.length > 0);

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

      {grouped.length > 0 && (
        <section className="settings-section" aria-labelledby="settings-config-h">
          <h2 id="settings-config-h">Configuration status</h2>
          <p className="runtime-muted">
            Founder-readable Yes/No/Warning only — secret values are never shown.
          </p>
          {grouped.map((g) => (
            <div key={g.id} className="settings-group" data-testid={`settings-group-${g.id}`}>
              <h3 className="settings-group-title">{g.title}</h3>
              <ul className="settings-rows">
                {g.rows.map((row) => (
                  <li key={`${g.id}-${row.label}`} className="settings-row">
                    <div>
                      <span className="settings-row-label">{row.label}</span>
                      {row.explain ? (
                        <span className="settings-row-explain">{row.explain}</span>
                      ) : null}
                    </div>
                    <span
                      className={`status-pill ${
                        row.tone === "yes"
                          ? "status-yes"
                          : row.tone === "no"
                            ? "status-no"
                            : row.tone === "warning"
                              ? "status-warning"
                              : row.tone === "muted"
                                ? "status-muted"
                                : "status-info"
                      }`}
                    >
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
