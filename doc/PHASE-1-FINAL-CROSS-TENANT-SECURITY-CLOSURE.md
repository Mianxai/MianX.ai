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
| Step 4 (#93) | merged `c6a273a…` (head `bb090ca…`); Production Ready; migration **unapplied** |
| Linked dry-run | exit 0 — pending exactly `20260803180000_admin_memberships_optional_tenant_scope.sql` |

## This Draft hardens

- `GET /api/core/runs|approvals|audit` — `project_id` required + `requireProjectAccess`
- `GET/POST /api/core/jobs` — `requireProjectAccess` (POST also `manage_jobs`)
- `GET /api/admin/analytics` — tenant Admin must pass `project_id`; org-wide `listRuns({})` only for explicit `platform.admin`
- Route inventory entries updated; `AUDIT_ACTIONS.ACCESS_DENIED` added
- Control matrix + completion checklist + migration rollout packet (docs)

## Remaining backlog (exact)

See `lib/tenant/service-role-inventory.js` → `still_open_for_step_5` and
`doc/PHASE-1-COMPLETION-CHECKLIST.md`.

## Honest non-claims

- Phase 1 is **not** complete until Founder applies scope migration + post-apply verification.
- JWT org-scoped RLS for projects/tasks is **not** shipped.
- OpenAI / Models / generation remain paused (0 calls from this work).
- Workspaces remain unimplemented (Phase 2).
