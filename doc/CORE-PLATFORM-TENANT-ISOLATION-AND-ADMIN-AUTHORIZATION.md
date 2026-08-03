# Core platform — multi-project isolation and Admin authorization

Status: Preview / Draft (`cursor/core-platform-tenant-isolation-admin-authz`)  
As-of: 2026-08-03  
Production database changed: **no**  
Migration applied: **no**

## Current tenancy model (truthful)

**Single-tenant Founder platform.**

| Layer | Truth |
|------|------|
| Organizations | One default org (`slug: mianx`) via `getOrCreateDefaultOrg` |
| Workspaces | Not implemented |
| Projects | Many projects under the default org |
| Admin memberships | Global `admin_memberships` (UUID + role) — **not** org/project scoped in Production yet |
| Platform Admin | `owner` role (Founder) + explicit bootstrap mode |
| Tenant Admin | `admin` role — currently can see all projects (single-tenant) |
| Operator / Viewer | Capability-limited; still global project visibility |

## Role hierarchy

```text
owner (platform.admin) → admin → operator → viewer
```

- **Platform Admin** (`platform.admin`): Founder `owner` only. Distinct from tenant admin.
- **Tenant Admin** (`admin`): project/workforce mutations; **not** `live_pilot.authorize`.
- **live_pilot.read**: owner, admin, operator, viewer (via `read` alias).
- **live_pilot.authorize**: owner only (prepare/kill-switch authorize path).

## Trusted tenant-context resolution

Canonical helper: `lib/tenant-context.js`

- Resolves `userId`, `membershipId`, `role`, `permissions`, `platformAdmin`,
  `tenantAdmin`, optional `projectId` + `organizationId` from the **verified
  session** and durable membership / project rows.
- Rejects client-supplied `role`, `organizationId`, `platformAdmin`, etc.
- Outcomes: authenticated_and_authorized | unauthenticated | forbidden |
  membership_missing | project_required | project_not_found |
  tenant_context_unavailable.

## Route authorization matrix

See `lib/tenant/route-inventory.js` (`ROUTE_AUTH_INVENTORY`).

Notable risks (single-tenant):

- `GET /api/core/projects` lists all projects for any admin.
- Some list endpoints allow optional `project_id` (enumeration risk for future multi-tenant).
- Most Admin routes use `requireAdmin` without fine-grained capability.

Hardening in this Draft:

- Live-agent pilot GET → `live_pilot.read`
- Live-agent pilot authorize/kill-switch POST → `live_pilot.authorize` (owner)
- `requireCapabilityAndProject` helper for project-scoped routes

## Service-role inventory

See `lib/tenant/service-role-inventory.js`.

- Factory: `getSupabaseAdmin` (server-only)
- ~78 call sites / ~51 files
- RLS: deny-anon; service_role bypass — application authz is mandatory

## RLS inventory (summary)

| Area | RLS | Policies | Tenant checks |
|------|-----|----------|---------------|
| Core projects/tasks/… | enabled | none for anon | none (service_role) |
| admin_memberships | enabled | none for anon | none |
| pilot_* | enabled + service policies | service_role | app-level pilot project bind |
| pilot_live_run_authorizations | FORCE RLS | service_role only | app-level |

No JWT-org membership RLS policies exist today.

## Cross-tenant test matrix

Fixtures: Tenant A / Tenant B in `lib/tenant/cross-tenant-fixtures.js`  
Tests: `lib/tenant/cross-tenant.test.js`

Covered: project filter, known foreign IDs, pagination/search/counts, member vs admin
capabilities, suspended/removed membership, unknown role, missing scope, audit
payload sanitization, platform vs tenant admin.

## Migration decision

| Item | Value |
|------|-------|
| Migration required for multi-org membership scope | yes (future) |
| Migration included in this Draft | yes — `20260803180000_admin_memberships_optional_tenant_scope.sql` |
| Migration applied | **no** |
| Rollback | `supabase/rollbacks/20260803180000_admin_memberships_optional_tenant_scope.rollback.sql` |
| Compatibility | Additive nullable columns; NULL preserves current global membership |

## Remaining risks

1. Global memberships still allow any active admin to list all projects until
   org/project columns are applied and enforced.
2. Optional `project_id` on some list endpoints.
3. Service-role remains the Admin data path — must stay behind authz helpers.
4. Docs elsewhere may still describe multi-tenant ideals; this file is runtime truth.

## Recommended next Core Platform phase

1. Founder dry-run + apply optional membership scope migration.
2. Enforce org/project filters in `listProjects` / Admin list routes.
3. Require `project_id` on remaining optional list endpoints.
4. Expand `requireCapabilityAndProject` across `/api/core/*` mutations.
5. Consider authenticated-role RLS only after membership scoping is live.

## Related

- `lib/admin-auth.js`, `lib/admin-capabilities.js`
- `lib/tenant-context.js`
- `doc/CURRENT-STATE.md` (Preview)
