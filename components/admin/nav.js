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

export const ADMIN_NAV = [
  {
    href: "/admin",
    label: "Overview",
    match: "exact",
    icon: "overview",
  },
  {
    href: "/admin/submissions",
    label: "Submissions",
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
    href: "/admin/command-center",
    label: "Command Center",
    match: "prefix",
    icon: "command",
  },
  {
    href: "/admin/objectives",
    label: "Objectives",
    match: "prefix",
    icon: "objectives",
  },
  {
    href: "/admin/ceo-brief",
    label: "CEO Brief",
    match: "prefix",
    icon: "brief",
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
    href: "/admin/analytics",
    label: "Analytics",
    match: "prefix",
    icon: "analytics",
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
  return isNavActive(pathname, item);
}
