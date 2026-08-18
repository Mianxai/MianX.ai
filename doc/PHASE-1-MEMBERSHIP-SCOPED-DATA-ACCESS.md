# Phase 1 Step 3 — Membership-scoped project reads and list endpoints

Status: Preview / Draft (`cursor/phase1-membership-scoped-data-access`)  
As-of: 2026-08-03  
Master plan: `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md`  
Production database changed: **no**  
Migration applied: **no**  
New migration included: **no** (uses application authorization on existing schema)

## Current tenancy truth (unchanged)

- Single-tenant Founder platform; canonical org slug `mianx`
- Workspaces not implemented
- `admin_memberships` still global (optional org/project columns from PR #91 **unapplied**)
- Service-role bypasses RLS — application filters are mandatory

## What this Draft remediates

| Area | Change |
|------|--------|
| `listProjects` | Accepts `{ organizationId, projectIds }`; empty allowlist → `[]` |
| `GET /api/core/projects` | Trusted org scope via `requireTenantListScope` |
| `GET/PATCH /api/core/projects/[id]` | `requireProjectAccess` — foreign org → 404 |
| `GET /api/core/tasks` | **`project_id` required**; validated against scope |
| Task/agent mutations | Project access before write |
| `GET /api/core/agents?project_id=` | Scoped instances |
| Agent PATCH | **`project_id` required** |
| Command Center / Overview | Project lists + counts use scoped opts |
| Helpers | `lib/tenant/project-access.js` |

## Optional `project_id` endpoint classification

| Endpoint | Classification |
|----------|----------------|
| `GET /api/core/tasks` | **project_id required** |
| `GET /api/core/agents` without project_id | Legitimate catalog (definitions), not tenant rows |
| `GET /api/core/agents?project_id=` | project_id required for instances |
| `GET /api/admin/command-center` | Org-scoped project selector; optional project_id for detail panes |
| `GET /api/admin/overview` | Org-scoped aggregates |
| Platform-admin org list | Explicit `platform_organization` mode + audit on project list |

## Central helpers

- `resolveProjectAccessScope`
- `requireProjectAccess`
- `requireTenantListScope`
- `scopeToListProjectsOpts`
- `filterRowsByScope`
- `assertProjectRowInScope`

## Service-role remediation (this step)

Remediated (scoped queries):

- project list / detail / counts (`listProjects` / `getProject` require scope)
- task list / detail (with required project_id)
- agent instance list / patch (with required project_id)
- overview + command-center project aggregates
- recent audit when projectIds known

Still open — **Step 4**:

- Durable membership `organization_id` / `project_id` columns (migration unapplied)
- JWT/org RLS policies

Still open — **Step 5**:

- `GET /api/core/runs|jobs|approvals|audit` optional project_id paths
- Admin analytics unscoped aggregates
- Remaining Admin export/search surfaces

## Cross-tenant tests

`lib/tenant/project-access.test.js` + fixtures in `lib/tenant/cross-tenant-fixtures.js`

## Related

- `doc/PHASE-1-TENANT-ISOLATION-AND-ADMIN-AUTHORIZATION.md` (Step 2)
- `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md`
- `doc/CURRENT-STATE.md`
