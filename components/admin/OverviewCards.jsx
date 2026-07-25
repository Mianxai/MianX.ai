"use client";

import Link from "next/link";

/**
 * Operational overview cards. Only renders values that are present (not fake).
 * Each card with an href links to its filtered destination view.
 */
export default function OverviewCards({ data }) {
  if (!data) return null;

  const cards = buildCards(data);
  if (cards.length === 0) {
    return (
      <div className="empty-state overview-empty">
        <h3>No overview data yet</h3>
        <p>Metrics will appear here once leads, projects, or runtime activity exist.</p>
      </div>
    );
  }

  return (
    <div className="overview-grid">
      {cards.map((card) => {
        const body = (
          <>
            <div className="overview-card-label">{card.label}</div>
            <div className="overview-card-value">{formatValue(card.value)}</div>
            {card.hint && <div className="overview-card-hint">{card.hint}</div>}
          </>
        );
        if (card.href) {
          return (
            <Link
              key={card.key}
              href={card.href}
              className={`overview-card overview-card-link${card.tone ? ` tone-${card.tone}` : ""}`}
            >
              {body}
            </Link>
          );
        }
        return (
          <div
            key={card.key}
            className={`overview-card${card.tone ? ` tone-${card.tone}` : ""}`}
          >
            {body}
          </div>
        );
      })}
    </div>
  );
}

function formatValue(value) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined) return "—";
  return String(value);
}

function num(obj, ...keys) {
  for (const k of keys) {
    if (obj && typeof obj[k] === "number" && Number.isFinite(obj[k])) return obj[k];
  }
  return null;
}

function bool(obj, ...keys) {
  for (const k of keys) {
    if (obj && typeof obj[k] === "boolean") return obj[k];
  }
  return null;
}

function str(obj, ...keys) {
  for (const k of keys) {
    if (obj && typeof obj[k] === "string" && obj[k]) return obj[k];
  }
  return null;
}

function buildCards(data) {
  const cards = [];
  const subs = data.submissions || data.leads || {};
  const projects = data.projects || {};
  const tasks = data.tasks || {};
  const approvals = data.approvals || {};
  const runs = data.runs || {};
  const runtime = data.runtime || data.health || {};
  const config = data.config || runtime.config || {};

  push(cards, {
    key: "subs-total",
    label: "Total submissions",
    value: num(subs, "total", "count"),
    href: "/admin/submissions",
  });
  push(cards, {
    key: "subs-new",
    label: "New leads",
    value: num(subs, "new"),
    href: "/admin/submissions?status=new",
    tone: "info",
  });
  push(cards, {
    key: "subs-contacted",
    label: "Contacted leads",
    value: num(subs, "contacted"),
    href: "/admin/submissions?status=contacted",
  });
  push(cards, {
    key: "subs-converted",
    label: "Converted leads",
    value: num(subs, "converted"),
    href: "/admin/submissions?status=converted",
    tone: "success",
  });

  push(cards, {
    key: "projects-active",
    label: "Active projects",
    value: num(projects, "active", "count", "total"),
    href: "/admin/projects",
  });

  push(cards, {
    key: "tasks-queued",
    label: "Queued tasks",
    value: num(tasks, "queued", "pending"),
    href: "/admin/runtime/tasks",
  });
  push(cards, {
    key: "tasks-progress",
    label: "In-progress tasks",
    value: num(tasks, "in_progress", "inProgress", "running"),
    href: "/admin/runtime/tasks",
  });
  push(cards, {
    key: "tasks-blocked",
    label: "Blocked tasks",
    value: num(tasks, "blocked", "awaiting_approval"),
    href: "/admin/runtime/tasks",
    tone: "warning",
  });

  push(cards, {
    key: "approvals-pending",
    label: "Pending approvals",
    value: num(approvals, "pending", "count"),
    href: "/admin/runtime/approvals",
    tone: "warning",
  });

  push(cards, {
    key: "runs-failed",
    label: "Failed runs",
    value: num(runs, "failed", "failedCount"),
    href: "/admin/runtime/runs",
    tone: "danger",
  });

  const healthLabel =
    str(runtime, "status", "health") ||
    (runtime.ok === true ? "Healthy" : runtime.ok === false ? "Degraded" : null);
  push(cards, {
    key: "runtime-health",
    label: "Runtime health",
    value: healthLabel,
    href: "/admin/runtime",
    hint: str(runtime, "service"),
  });

  const supabase = bool(config, "supabase") ?? bool(runtime, "supabase");
  if (supabase !== null) {
    push(cards, {
      key: "cfg-supabase",
      label: "Supabase",
      value: supabase,
      href: "/admin/settings",
      hint: "Configuration status",
      tone: supabase ? "success" : "warning",
    });
  }

  const ai =
    bool(config, "anthropic", "ai") ??
    bool(config.providers || {}, "anthropic") ??
    bool(runtime, "anthropic", "ai");
  if (ai !== null) {
    push(cards, {
      key: "cfg-ai",
      label: "AI provider",
      value: ai,
      href: "/admin/settings",
      hint: "Anthropic",
      tone: ai ? "success" : "warning",
    });
  }

  const auditRecent = data.audit?.recent || data.recentAudit;
  if (Array.isArray(auditRecent) && auditRecent.length > 0) {
    push(cards, {
      key: "audit-recent",
      label: "Recent audit",
      value: auditRecent.length,
      href: "/admin/runtime/audit",
      hint: auditRecent[0]?.action || "Latest activity",
    });
  } else if (typeof data.audit?.count === "number") {
    push(cards, {
      key: "audit-count",
      label: "Audit entries",
      value: data.audit.count,
      href: "/admin/runtime/audit",
    });
  }

  return cards;
}

function push(list, card) {
  if (card.value === null || card.value === undefined) return;
  list.push(card);
}
