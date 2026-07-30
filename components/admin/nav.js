/** Shared admin navigation — Founder Mode primary IA, one canonical page per intent. */

export const RUNTIME_TAB_PATHS = {
  overview: "/admin/runtime",
  agents: "/admin/runtime/agents",
  tasks: "/admin/runtime/tasks",
  queue: "/admin/runtime/queue",
  runs: "/admin/runtime/runs",
  approvals: "/admin/runtime/approvals",
  audit: "/admin/runtime/audit",
};

export const PATH_TO_RUNTIME_TAB = Object.fromEntries(
  Object.entries(RUNTIME_TAB_PATHS).map(([tab, path]) => [path, tab])
);

export const ADMIN_NAV_GROUPS = [
  {
    id: "founder",
    label: "Founder Mode",
    items: [
      { href: "/admin/command-center", label: "Home", match: "prefix", icon: "command" },
      { href: "/admin/projects", label: "Projects", match: "prefix", icon: "projects" },
      { href: "/admin/objectives", label: "Objectives", match: "prefix", icon: "objectives" },
      { href: "/admin/integration", label: "Founder Proof", match: "prefix", icon: "runtime" },
      {
        href: "/admin/inbox",
        label: "Founder Inbox",
        match: "prefix",
        icon: "inbox",
        badgeKey: "inboxCount",
      },
    ],
  },
  {
    id: "workforce",
    label: "Workforce",
    items: [
      {
        href: "/admin/workforce-readiness",
        label: "Workforce",
        match: "prefix",
        icon: "network",
      },
      { href: "/admin/agents", label: "Agents", match: "prefix", icon: "network" },
      { href: "/admin/workforce", label: "Live Workforce", match: "prefix", icon: "runtime" },
      { href: "/admin/departments", label: "Departments", match: "prefix", icon: "departments" },
      { href: "/admin/workflows", label: "Workflows", match: "prefix", icon: "workflows" },
      { href: "/admin/schedule", label: "Schedule", match: "prefix", icon: "schedule" },
    ],
  },
  {
    id: "results",
    label: "Results",
    items: [
      { href: "/admin/outputs", label: "Outputs", match: "prefix", icon: "outputs" },
      { href: "/admin/analytics", label: "Analytics", match: "prefix", icon: "analytics" },
      { href: "/admin/knowledge", label: "Knowledge", match: "prefix", icon: "knowledge" },
      { href: "/admin/memory", label: "Memory", match: "prefix", icon: "knowledge" },
      { href: "/admin/learning", label: "Learning", match: "prefix", icon: "objectives" },
      { href: "/admin/templates", label: "Templates", match: "prefix", icon: "workflows" },
      { href: "/admin/planning", label: "Planning", match: "prefix", icon: "objectives" },
    ],
  },
  {
    id: "operations",
    label: "Advanced Operations",
    collapsedByDefault: true,
    items: [
      {
        href: "/admin/runtime",
        label: "Runtime Overview",
        match: "prefix",
        icon: "runtime",
        badge: "Advanced",
        children: [
          { href: "/admin/runtime/agents", label: "Agent Instances", match: "prefix" },
          { href: "/admin/runtime/tasks", label: "Tasks", match: "prefix" },
          { href: "/admin/runtime/queue", label: "Queue", match: "prefix" },
          { href: "/admin/runtime/runs", label: "Runs", match: "prefix" },
        ],
      },
      {
        href: "/admin/runtime/approvals",
        label: "Runtime Approvals",
        match: "prefix",
        icon: "approvals",
        badge: "Advanced",
      },
      {
        href: "/admin/runtime/audit",
        label: "Full Audit",
        match: "prefix",
        icon: "audit",
        badge: "Advanced",
      },
      {
        href: "/admin/settings",
        label: "Technical Settings",
        match: "prefix",
        icon: "settings",
        badge: "Advanced",
      },
      {
        href: "/admin/company-builder",
        label: "Company Builder",
        match: "prefix",
        icon: "workflows",
        badge: "Advanced",
      },
      { href: "/admin/ceo-brief", label: "CEO Brief", match: "prefix", icon: "brief", badge: "Advanced" },
      {
        href: "/admin/leads",
        label: "Leads",
        match: "prefix",
        icon: "submissions",
        badgeKey: "newCount",
        scope: "organisation",
        badge: "Advanced",
      },
    ],
  },
];

/** Flat list for tests / uniqueness checks. */
export const ADMIN_NAV = ADMIN_NAV_GROUPS.flatMap((g) => g.items);

/** Primary sidebar hrefs that must be unique (no duplicate top-level intents). */
export function primaryNavHrefs() {
  return ADMIN_NAV.map((i) => i.href);
}

export function isNavActive(pathname, item) {
  if (!pathname || !item?.href) return false;
  if (item.match === "exact") return pathname === item.href;
  if (pathname === item.href) return true;
  return pathname.startsWith(`${item.href}/`);
}

export function isNavItemCurrent(pathname, item) {
  if (item.match === "exact") return pathname === item.href;
  if (item.href === "/admin/runtime") {
    if (pathname === "/admin/runtime") return true;
    if (pathname.startsWith("/admin/runtime/approvals")) return false;
    if (pathname.startsWith("/admin/runtime/audit")) return false;
    return pathname.startsWith("/admin/runtime/");
  }
  if (item.href === "/admin/runtime/approvals") {
    return (
      pathname === "/admin/runtime/approvals" ||
      pathname.startsWith("/admin/runtime/approvals/") ||
      pathname === "/admin/approvals" ||
      pathname.startsWith("/admin/approvals/")
    );
  }
  if (item.href === "/admin/runtime/audit") {
    return (
      pathname === "/admin/runtime/audit" ||
      pathname.startsWith("/admin/runtime/audit/") ||
      pathname === "/admin/audit" ||
      pathname.startsWith("/admin/audit/")
    );
  }
  if (item.href === "/admin/leads") {
    return (
      pathname === "/admin/leads" ||
      pathname.startsWith("/admin/leads/") ||
      pathname === "/admin/submissions" ||
      pathname.startsWith("/admin/submissions/") ||
      pathname === "/admin/lead-pipeline" ||
      pathname.startsWith("/admin/lead-pipeline/")
    );
  }
  if (item.href === "/admin/agents") {
    return (
      pathname === "/admin/agents" ||
      pathname.startsWith("/admin/agents/") ||
      pathname === "/admin/agent-network" ||
      pathname.startsWith("/admin/agent-network/")
    );
  }
  return isNavActive(pathname, item);
}

/**
 * Preserve project_id (and optional keys) when navigating between admin pages.
 */
export function withProjectQuery(href, projectId, extra = {}) {
  if (!href) return href;
  try {
    const url = new URL(href, "http://admin.local");
    if (projectId) url.searchParams.set("project_id", projectId);
    else url.searchParams.delete("project_id");
    for (const [k, v] of Object.entries(extra)) {
      if (v == null || v === "") url.searchParams.delete(k);
      else url.searchParams.set(k, v);
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return href;
  }
}
