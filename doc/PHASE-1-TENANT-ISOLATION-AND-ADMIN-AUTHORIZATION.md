# Phase 1 — Tenant isolation and Admin authorization foundation

Status: Preview / Draft (`cursor/phase1-tenant-authz-foundation`)  
As-of: 2026-08-03  
Master plan: `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md` (Phase 1 only)  
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

## Permission inventory

Canonical: `lib/admin-capabilities.js` (`CAPABILITIES`)

Legacy: `read`, `manage_*`, `decide_approvals`, `start_workflows`, `view_settings`, `view_audit`  
Phase 1 explicit: `project.read`, `project.manage`, `workforce.read`, `workforce.manage`,
`live_pilot.read`, `live_pilot.authorize`, `audit.read`, `platform.admin`

## Trusted tenant-context resolution

Canonical helper: `lib/tenant-context.js`

- Resolves `userId`, `membershipId`, `role`, `permissions`, `platformAdmin`,
  `tenantAdmin`, optional `projectId` + `organizationId` from the **verified
  session** and durable membership / project rows.
- Rejects client-supplied `role`, `organizationId`, `platformAdmin`, etc.
- Outcomes: `authenticated_authorized` | `unauthenticated` | `forbidden` |
  `membership_missing` | `scope_mismatch` | `tenant_context_unavailable` |
  `project_required` | `project_not_found`.

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
- Exact (excl. tests): **79** call sites / **52** files
- RLS: deny-anon; service_role bypass — application authz is mandatory
- Remediation buckets: fixed / protected / partially_protected / still_open_for_step_3

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

## Remaining risks (honest remediation buckets)

**Fixed in this PR**
- Live-pilot GET → `live_pilot.read`; authorize/kill POST → `live_pilot.authorize`
- Unknown admin role → zero capabilities + membership reject
- Trusted tenant-context helpers + outcome codes

**Protected (existing controls)**
- `getSupabaseAdmin` server-only; Admin routes behind session + membership
- Pilot project hard-bind; no-credit provider block (PR #89)

**Partially protected**
- Lists that already require `project_id` when callers pass it
- Pilot evidence isolation helpers

**Still open for Phase 1 Step 3**
1. Global memberships still allow any active admin to list all projects until
   org/project columns are applied **and** enforced in app code.
2. Optional `project_id` on some list endpoints.
3. Unscoped `listProjects` / Admin aggregates / id-only detail reads.
4. Service-role remains the Admin data path — must stay behind authz helpers.
5. Docs elsewhere may still describe multi-tenant ideals; this file is runtime truth.

## Phase 1 implementation backlog

1. ~~Founder review + merge this Draft PR~~ (Mission B)
2. Founder dry-run + apply optional membership scope migration (separate auth).
3. **Step 3:** Enforce org/project filters in `listProjects` / Admin list routes.
4. Require `project_id` on remaining optional list endpoints.
5. Expand `requireCapabilityAndProject` across `/api/core/*` mutations.
6. Consider authenticated-role RLS only after membership scoping is live.
7. Only then consider Phase 2 (Operating System / Enterprise Operations).

## Related

- `lib/admin-auth.js`, `lib/admin-capabilities.js`
- `lib/tenant-context.js`
- `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md`
- `doc/CURRENT-STATE.md` (Preview)
