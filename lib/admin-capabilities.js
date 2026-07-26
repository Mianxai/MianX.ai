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
    ...ALL_MUTATIONS,
  ],
  operator: [
    CAPABILITIES.READ,
    CAPABILITIES.VIEW_SETTINGS,
    CAPABILITIES.VIEW_AUDIT,
    CAPABILITIES.MANAGE_LEADS,
    CAPABILITIES.MANAGE_TASKS,
    CAPABILITIES.MANAGE_JOBS,
    CAPABILITIES.START_WORKFLOWS,
    // Operators may not decide approvals or register/retire agents.
  ],
  viewer: [
    CAPABILITIES.READ,
    CAPABILITIES.VIEW_SETTINGS,
    CAPABILITIES.VIEW_AUDIT,
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
  return Array.isArray(caps) && caps.includes(capability);
}
