// Admin role capability matrix.
//
// Roles are server-side only (from admin_memberships). Never trust a
// client-supplied role. Capabilities are the unit of authorization for
// mutations; requireCapability() enforces them after requireAdminUser().

export const ADMIN_ROLES = ["owner", "admin", "operator", "viewer"];

export const CAPABILITIES = {
  READ: "read",
  MANAGE_LEADS: "manage_leads",
  MANAGE_PROJECTS: "manage_projects",
  MANAGE_AGENTS: "manage_agents",
  MANAGE_TASKS: "manage_tasks",
  MANAGE_JOBS: "manage_jobs",
  DECIDE_APPROVALS: "decide_approvals",
  START_WORKFLOWS: "start_workflows",
  VIEW_SETTINGS: "view_settings",
  VIEW_AUDIT: "view_audit",
  /** Explicit read of a single project scope (alias of read for matrix clarity). */
  PROJECT_READ: "project.read",
  /** Explicit project mutations (maps with manage_projects for owners/admins). */
  PROJECT_MANAGE: "project.manage",
  WORKFORCE_READ: "workforce.read",
  WORKFORCE_MANAGE: "workforce.manage",
  LIVE_PILOT_READ: "live_pilot.read",
  LIVE_PILOT_AUTHORIZE: "live_pilot.authorize",
  AUDIT_READ: "audit.read",
  /** Founder / platform-wide operations — owner only (not tenant admin). */
  PLATFORM_ADMIN: "platform.admin",
};

const ALL_MUTATIONS = [
  CAPABILITIES.MANAGE_LEADS,
  CAPABILITIES.MANAGE_PROJECTS,
  CAPABILITIES.MANAGE_AGENTS,
  CAPABILITIES.MANAGE_TASKS,
  CAPABILITIES.MANAGE_JOBS,
  CAPABILITIES.DECIDE_APPROVALS,
  CAPABILITIES.START_WORKFLOWS,
];

const ROLE_CAPABILITIES = {
  owner: [...Object.values(CAPABILITIES)],
  admin: [
    CAPABILITIES.READ,
    CAPABILITIES.VIEW_SETTINGS,
    CAPABILITIES.VIEW_AUDIT,
    CAPABILITIES.AUDIT_READ,
    CAPABILITIES.PROJECT_READ,
    CAPABILITIES.PROJECT_MANAGE,
    CAPABILITIES.WORKFORCE_READ,
    CAPABILITIES.WORKFORCE_MANAGE,
    CAPABILITIES.LIVE_PILOT_READ,
    // Tenant admin may read live-pilot status but not authorize live runs.
    ...ALL_MUTATIONS,
  ],
  operator: [
    CAPABILITIES.READ,
    CAPABILITIES.VIEW_SETTINGS,
    CAPABILITIES.VIEW_AUDIT,
    CAPABILITIES.AUDIT_READ,
    CAPABILITIES.PROJECT_READ,
    CAPABILITIES.WORKFORCE_READ,
    CAPABILITIES.LIVE_PILOT_READ,
    CAPABILITIES.MANAGE_LEADS,
    CAPABILITIES.MANAGE_TASKS,
    CAPABILITIES.MANAGE_JOBS,
    CAPABILITIES.START_WORKFLOWS,
    // Operators may not decide approvals, register/retire agents, or authorize live runs.
  ],
  viewer: [
    CAPABILITIES.READ,
    CAPABILITIES.VIEW_SETTINGS,
    CAPABILITIES.VIEW_AUDIT,
    CAPABILITIES.AUDIT_READ,
    CAPABILITIES.PROJECT_READ,
    CAPABILITIES.WORKFORCE_READ,
    CAPABILITIES.LIVE_PILOT_READ,
  ],
};

// Compatibility / bootstrap sessions (no membership row) get full admin
// capabilities only while an explicit bootstrap flag is enabled.
const BOOTSTRAP_CAPABILITIES = [...Object.values(CAPABILITIES)];

export function capabilitiesForRole(role) {
  if (!role || !ROLE_CAPABILITIES[role]) return [CAPABILITIES.READ];
  return ROLE_CAPABILITIES[role];
}

export function capabilitiesForAuthContext({ membership, mode } = {}) {
  if (membership?.role) return capabilitiesForRole(membership.role);
  if (mode === "bootstrap" || mode === "session-compat") {
    return BOOTSTRAP_CAPABILITIES;
  }
  return [CAPABILITIES.READ];
}

export function hasCapability(caps, capability) {
  if (!Array.isArray(caps) || !capability) return false;
  if (caps.includes(capability)) return true;
  // Aliases: explicit dotted permissions map to legacy snake capabilities.
  const aliases = {
    [CAPABILITIES.PROJECT_READ]: [CAPABILITIES.READ],
    [CAPABILITIES.PROJECT_MANAGE]: [CAPABILITIES.MANAGE_PROJECTS],
    [CAPABILITIES.WORKFORCE_READ]: [CAPABILITIES.READ],
    [CAPABILITIES.WORKFORCE_MANAGE]: [CAPABILITIES.MANAGE_AGENTS],
    [CAPABILITIES.LIVE_PILOT_READ]: [CAPABILITIES.READ],
    [CAPABILITIES.AUDIT_READ]: [CAPABILITIES.VIEW_AUDIT, CAPABILITIES.READ],
  };
  const mapped = aliases[capability] || [];
  return mapped.some((c) => caps.includes(c));
}

/** True only for Founder owner (or explicit bootstrap). Never inferred from client. */
export function isPlatformAdminRole(role, mode) {
  if (mode === "bootstrap" || mode === "session-compat") return true;
  return role === "owner";
}
