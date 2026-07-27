/** Shared admin navigation config — used by AdminShell and Sidebar. */

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

/**
 * Founder Operating System left navigation.
 * Labels map to existing routes/data — no duplicate backends.
 */
export const ADMIN_NAV = [
  {
    href: "/admin/command-center",
    label: "Command Center",
    match: "prefix",
    icon: "command",
  },
  {
    href: "/admin/ceo-brief",
    label: "CEO Brief",
    match: "prefix",
    icon: "brief",
  },
  {
    href: "/admin/objectives",
    label: "Objectives",
    match: "prefix",
    icon: "objectives",
  },
  {
    href: "/admin/inbox",
    label: "Founder Inbox",
    match: "prefix",
    icon: "inbox",
    badgeKey: "inboxCount",
  },
  {
    href: "/admin/agent-network",
    label: "Agent Network",
    match: "prefix",
    icon: "network",
  },
  {
    href: "/admin/departments",
    label: "Departments",
    match: "prefix",
    icon: "departments",
  },
  {
    href: "/admin/workflows",
    label: "Workflows",
    match: "prefix",
    icon: "workflows",
  },
  {
    href: "/admin/schedule",
    label: "Schedule",
    match: "prefix",
    icon: "schedule",
  },
  {
    href: "/admin/lead-pipeline",
    label: "Lead Pipeline",
    match: "prefix",
    icon: "submissions",
    badgeKey: "newCount",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    match: "prefix",
    icon: "projects",
  },
  {
    href: "/admin/runtime/approvals",
    label: "Approvals",
    match: "prefix",
    icon: "approvals",
  },
  {
    href: "/admin/knowledge",
    label: "Knowledge",
    match: "prefix",
    icon: "knowledge",
  },
  {
    href: "/admin/outputs",
    label: "Outputs",
    match: "prefix",
    icon: "outputs",
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    match: "prefix",
    icon: "analytics",
  },
  {
    href: "/admin/runtime/audit",
    label: "Audit",
    match: "prefix",
    icon: "audit",
  },
  {
    href: "/admin/runtime",
    label: "Runtime",
    match: "prefix",
    icon: "runtime",
    children: [
      { href: "/admin/runtime/agents", label: "Agents", match: "prefix" },
      { href: "/admin/runtime/tasks", label: "Tasks", match: "prefix" },
      { href: "/admin/runtime/queue", label: "Queue", match: "prefix" },
      { href: "/admin/runtime/runs", label: "Runs", match: "prefix" },
      { href: "/admin/runtime/approvals", label: "Approvals", match: "prefix" },
      { href: "/admin/runtime/audit", label: "Audit", match: "prefix" },
    ],
  },
  {
    href: "/admin",
    label: "Overview",
    match: "exact",
    icon: "overview",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    match: "prefix",
    icon: "settings",
  },
];

export function isNavActive(pathname, item) {
  if (!pathname || !item?.href) return false;
  if (item.match === "exact") return pathname === item.href;
  if (pathname === item.href) return true;
  return pathname.startsWith(`${item.href}/`);
}

/** Parent Runtime stays highlighted on child routes; Overview stays exact-only. */
export function isNavItemCurrent(pathname, item) {
  if (item.match === "exact") return pathname === item.href;
  if (item.href === "/admin/runtime") {
    return pathname === "/admin/runtime" || pathname.startsWith("/admin/runtime/");
  }
  // Approvals nav item shares prefix with /admin/runtime/approvals under Runtime —
  // treat dedicated Approvals entry as current only on that path.
  if (item.href === "/admin/runtime/approvals") {
    return pathname === "/admin/runtime/approvals" || pathname.startsWith("/admin/runtime/approvals/");
  }
  if (item.href === "/admin/runtime/audit") {
    return pathname === "/admin/runtime/audit" || pathname.startsWith("/admin/runtime/audit/");
  }
  return isNavActive(pathname, item);
}
