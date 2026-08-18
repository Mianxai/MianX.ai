"use client";

import Link from "next/link";
import { mapSchedulerStatus } from "@/lib/core/scheduler-status";

const STATUS = Object.freeze({
  ready: "Ready",
  optional: "Optional for current stage",
  action: "Action required",
  warning: "Warning",
  error: "Error",
});

/**
 * Compact Production Readiness Centre for Founder Home and Settings.
 */
export default function ProductionReadinessCentre({
  readiness = null,
  provider = null,
  rateLimit = null,
  schedule = null,
  opsSummary = null,
  compact = false,
  className = "",
}) {
  const categories = buildReadinessCategories({
    readiness,
    provider,
    rateLimit,
    schedule,
    opsSummary,
  });

  return (
    <section
      className={`production-readiness-centre cc-card ${compact ? "is-compact" : ""} ${className}`.trim()}
      data-testid="production-readiness-centre"
      aria-labelledby="production-readiness-h"
    >
      <header className="production-readiness-header">
        <h2 id="production-readiness-h">
          {compact ? "System readiness" : "Production Readiness Centre"}
        </h2>
        {compact ? (
          <Link href="/admin/settings" className="header-btn-ghost">
            Full readiness
          </Link>
        ) : null}
      </header>
      <div className="production-readiness-grid">
        {categories.map((cat) => (
          <article
            key={cat.id}
            className={`production-readiness-item is-${cat.tone}`}
            data-testid={`readiness-cat-${cat.id}`}
          >
            <h3>{cat.label}</h3>
            <p className="production-readiness-status">{STATUS[cat.tone] || cat.statusLabel}</p>
            <p className="cc-muted">{cat.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function buildReadinessCategories({
  readiness = null,
  provider = null,
  rateLimit = null,
  schedule = null,
  opsSummary = null,
  phaseI = null,
} = {}) {
  const providerStatus =
    provider?.status || readiness?.provider || readiness?.providerStatus?.status || "unknown";
  const providerConfigured = !["unconfigured", "not_configured", "missing"].includes(
    String(providerStatus)
  );

  const durable = Boolean(rateLimit?.durable);
  const sched = mapSchedulerStatus({
    scheduler: schedule || readiness?.schedulerStatus || opsSummary?.scheduler || {},
    lastTickAt:
      schedule?.lastTickAt ||
      schedule?.last_tick_at ||
      readiness?.lastSchedulerTick ||
      null,
  });

  const persistenceOk =
    opsSummary?.proof_persistence?.ok !== false &&
    (readiness?.integrationPersistenceReady !== false ||
      opsSummary?.integration_readiness?.integrationPersistenceReady !== false);

  const simReady =
    readiness?.simulationReady === true ||
    opsSummary?.integration_readiness?.simulationReady === true;

  const proofUi = opsSummary?.founder_proof_ui;
  const proofError =
    proofUi?.state === "resolver_error" ||
    proofUi?.state === "persistence_error" ||
    opsSummary?.proof_persistence?.ok === false;

  const execCount =
    phaseI?.matrixTotals?.executable ??
    phaseI?.categories?.WORKFORCE?.executableCoverage ??
    null;

  return [
    {
      id: "core",
      label: "CORE",
      tone: persistenceOk ? "ready" : "warning",
      statusLabel: persistenceOk ? STATUS.ready : STATUS.warning,
      detail: [
        persistenceOk
          ? "Database, authentication, project isolation, audit, and health paths are available."
          : "Persistence or schema readiness needs attention before durable proof work.",
        durable
          ? "Durable rate limit adapter is active."
          : "In-memory rate limiting is suitable for single-instance testing, not durable multi-instance production.",
      ].join(" "),
    },
    {
      id: "workforce",
      label: "WORKFORCE",
      tone: phaseI?.routingCovered === false ? "action" : "ready",
      statusLabel:
        execCount != null ? `${execCount} executable definitions` : STATUS.ready,
      detail:
        "Agent definitions, executable coverage, routing, lifecycle, and delegation. 445 capacity slots are planning inventory — not live agents.",
    },
    {
      id: "automation",
      label: "AUTOMATION",
      tone: mapSchedulerTone(sched.health),
      statusLabel: STATUS[mapSchedulerTone(sched.health)] || sched.label,
      detail: [
        `Target cadence: every five minutes.`,
        sched.githubActionsApproximate
          ? "GitHub Actions delivery may be delayed."
          : null,
        sched.detail || `Scheduler: ${sched.label}.`,
        durable
          ? "Durable rate limiter active."
          : "Durable rate limiter unconfigured — in-memory development limiter in use.",
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      id: "intelligence",
      label: "INTELLIGENCE",
      tone: "optional",
      statusLabel: providerConfigured ? "Provider optional" : STATUS.optional,
      detail: providerConfigured
        ? "Provider configured but optional for Level-1. Memory and learning never auto-promote."
        : "Provider unconfigured by design for Level-1. Deterministic paths remain usable. Memory/learning never auto-promote.",
    },
    {
      id: "governance",
      label: "GOVERNANCE",
      tone: "ready",
      statusLabel: "Founder-gated",
      detail:
        "Approvals, protected actions (including production_deployment), evidence, security, and project isolation remain Founder-controlled.",
    },
    {
      id: "deterministic_proof",
      label: "DETERMINISTIC FOUNDER PROOF",
      tone: proofError ? "error" : simReady ? "ready" : persistenceOk ? "optional" : "action",
      statusLabel: proofError
        ? STATUS.error
        : simReady
          ? STATUS.ready
          : persistenceOk
            ? STATUS.optional
            : STATUS.action,
      detail: proofError
        ? "Proof status could not be verified. Retry or open diagnostics — do not start a new proof while uncertain."
        : simReady
          ? "Deterministic simulation path is ready. Anthropic is not required."
          : "Complete project selection and persistence checks to run the Founder Proof.",
    },
  ];
}

function mapSchedulerTone(health) {
  if (health === "healthy") return "ready";
  if (health === "delayed" || health === "warning") return "warning";
  if (health === "stale" || health === "query_error" || health === "error") return "error";
  if (health === "unavailable" || health === "configuration_required") return "action";
  return "optional";
}
