/** Shared admin navigation — grouped IA, one canonical page per intent. */

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
    id: "control",
    label: "Control",
    items: [
      { href: "/admin/command-center", label: "Command Center", match: "prefix", icon: "command" },
      { href: "/admin/ceo-brief", label: "CEO Brief", match: "prefix", icon: "brief" },
      { href: "/admin/objectives", label: "Objectives", match: "prefix", icon: "objectives" },
      { href: "/admin/company-builder", label: "Company Builder", match: "prefix", icon: "workflows" },
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
      { href: "/admin/agents", label: "Agents", match: "prefix", icon: "network" },
      { href: "/admin/departments", label: "Departments", match: "prefix", icon: "departments" },
      { href: "/admin/workflows", label: "Workflows", match: "prefix", icon: "workflows" },
      { href: "/admin/schedule", label: "Schedule", match: "prefix", icon: "schedule" },
    ],
  },
  {
    id: "business",
    label: "Business",
    items: [
      {
        href: "/admin/leads",
        label: "Leads",
        match: "prefix",
        icon: "submissions",
        badgeKey: "newCount",
      },
      { href: "/admin/projects", label: "Projects", match: "prefix", icon: "projects" },
      { href: "/admin/runtime/approvals", label: "Approvals", match: "prefix", icon: "approvals" },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    items: [
      { href: "/admin/knowledge", label: "Knowledge", match: "prefix", icon: "knowledge" },
      { href: "/admin/templates", label: "Templates", match: "prefix", icon: "workflows" },
      { href: "/admin/planning", label: "Planning", match: "prefix", icon: "objectives" },
      { href: "/admin/memory", label: "Memory", match: "prefix", icon: "knowledge" },
      { href: "/admin/learning", label: "Learning", match: "prefix", icon: "objectives" },
      { href: "/admin/outputs", label: "Outputs", match: "prefix", icon: "outputs" },
      { href: "/admin/analytics", label: "Analytics", match: "prefix", icon: "analytics" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    items: [
      {
        href: "/admin/runtime",
        label: "Runtime",
        match: "prefix",
        icon: "runtime",
        children: [
          { href: "/admin/runtime/agents", label: "Instances", match: "prefix" },
          { href: "/admin/runtime/tasks", label: "Tasks", match: "prefix" },
          { href: "/admin/runtime/queue", label: "Queue", match: "prefix" },
          { href: "/admin/runtime/runs", label: "Runs", match: "prefix" },
        ],
      },
      { href: "/admin/runtime/audit", label: "Audit", match: "prefix", icon: "audit" },
      { href: "/admin/settings", label: "Settings", match: "prefix", icon: "settings" },
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
    // Runtime parent active for overview + child tabs, but not for Approvals/Audit
    // which are first-class Operations items.
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
