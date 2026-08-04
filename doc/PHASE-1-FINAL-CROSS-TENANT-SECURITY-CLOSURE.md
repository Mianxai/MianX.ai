# Phase 1 Step 5 — Final cross-tenant security closure

Status: **merged** (PR #94 → `2d9b486…`)  
As-of: 2026-08-03  
Phase 1 status: **ready_for_final_verification** (not complete)  
migrationApplied: **yes**  
ProductionDatabaseChanged: **yes** (exactly one authorized migration; no further mutation in recovery mission)  
manualRecoveryReady: **true** (post-apply logical backup restore-tested locally)

See `doc/PHASE-1-POST-MIGRATION-VERIFICATION.md` for backup path (outside Git), checksums, and restore evidence.

## Prerequisites verified

| Step | Evidence |
|------|----------|
| Step 2 (#91) | merged `c7ee986…` |
| Step 3 (#92) | merged `92897d6…` |
| Step 4 (#93) | merged `c6a273a…` |
| Step 5 (#94) | merged `2d9b486…`; Production Ready |
| Scope migration | applied `20260803180000_admin_memberships_optional_tenant_scope.sql` (checksum `6ae5e956…`) |
| Post-apply | dry-run pending **0**; membership rows preserved; null scope only on legacy rows |

## Step 5 hardened

- `GET /api/core/runs|approvals|audit` — `project_id` + `requireProjectAccess`
- `GET/POST /api/core/jobs` and cancel/retry — `requireProjectAccess` + `manage_jobs`
- `GET /api/admin/analytics` — tenant requires `project_id`; org-wide `listRuns({})` → `platform.admin`
- `GET/POST /api/admin/memory`, `GET /api/admin/knowledge`, unified audit — project scope required
- Control matrix, exact service-role backlog, route inventory integrity checks
- Rollout packet: `doc/PHASE-1-RLS-MIGRATION-ROLLOUT.md`
- Post-migration evidence: `doc/PHASE-1-POST-MIGRATION-VERIFICATION.md`

## Remaining backlog classification

| Item | Class |
|------|-------|
| JWT organization/project RLS absent | **B** |
| Residual optional export/search paths | **B** / **C** |
| Job mutate-by-ID UX confirmations | **B** (server already scoped) |
| Knowledge/memory residual paths | **B** |
| Partial denial audit writes | **B** |
| Active high-risk cross-project Production leak | **none as a Phase 1 blocker** |

See `lib/tenant/service-role-backlog.js`.

## Honest non-claims

- Phase 1 is **not** `complete` until Founder final verification sign-off.
- JWT org-scoped RLS is **not** shipped.
- OpenAI / Models / generation remain paused.
- Workspaces remain unimplemented (Phase 2).
- Phase 2 has **not** started.
