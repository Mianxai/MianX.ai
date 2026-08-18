# Phase 1 Step 5 — Final cross-tenant security closure

Status: **Draft / Preview** (`cursor/phase1-final-cross-tenant-security-closure`)  
As-of: 2026-08-03  
Phase 1 status: **ready_for_migration_rollout** (not complete)  
migrationApplied: **no**  
ProductionDatabaseChanged: **no**

## Prerequisites verified

| Step | Evidence |
|------|----------|
| Step 2 (#91) | merged `c7ee986…` |
| Step 3 (#92) | merged `92897d6…` |
| Step 4 (#93) | merged `c6a273a…`; Production Ready; migration **unapplied** |
| Linked dry-run | exit 0 — pending exactly `20260803180000_admin_memberships_optional_tenant_scope.sql` |

## This Draft hardens

- `GET /api/core/runs|approvals|audit` — `project_id` + `requireProjectAccess`
- `GET/POST /api/core/jobs` and cancel/retry — `requireProjectAccess` + `manage_jobs`
- `GET /api/admin/analytics` — tenant requires `project_id`; org-wide `listRuns({})` → `platform.admin`
- `GET/POST /api/admin/memory`, `GET /api/admin/knowledge`, unified audit — project scope required
- Control matrix, exact service-role backlog, route inventory integrity checks
- Rollout packet: `doc/PHASE-1-RLS-MIGRATION-ROLLOUT.md`

## Remaining backlog (exact)

See `lib/tenant/service-role-backlog.js`. No row sets `blocksPhase1Completion: true` for
unresolved high-risk Production tenant cross-project writes after this Draft.
JWT RLS and residual integration optional paths remain documented.

## Honest non-claims

- Phase 1 is **not** complete until Founder applies scope migration + post-apply verification + Founder sign-off.
- JWT org-scoped RLS is **not** shipped.
- OpenAI / Models / generation remain paused.
- Workspaces remain unimplemented (Phase 2).
