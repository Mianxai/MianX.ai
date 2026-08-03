# Phase 1 — Post-migration verification

As-of: 2026-08-03 (UTC)  
Phase 1 status: **ready_for_final_verification**  
Phase 2 started: **no**  
This document does **not** self-approve Founder Phase 1 completion sign-off.

## Migration applied

| Field | Value |
|-------|--------|
| Path | `supabase/migrations/20260803180000_admin_memberships_optional_tenant_scope.sql` |
| SHA-256 | `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7` |
| Apply command | `npx supabase db push --linked` (after exit-0 dry-run with exactly one pending) |
| Apply start UTC | `2026-08-03T16:16:45Z` |
| Apply finish UTC | `2026-08-03T16:17:07Z` |
| Duration | 22s |
| Exit status | 0 |
| Second migration | **no** |
| Resets / repairs / seeds | **none** |
| Main / Production commit | `2d9b4862e7764aae5c26f0e247bb85310bc752f8` (PR #94 merge) |
| backupOrRecoveryReady | **true** (PITR enabled; backups API reachable; no IDs printed) |

## Post-apply database contract

| Check | Result |
|-------|--------|
| Migration history records `20260803180000` once | yes |
| Linked dry-run pending count | **0** (remote up to date) |
| `organization_id` / `project_id` | uuid, nullable |
| Constraint `admin_memberships_project_requires_org` | present |
| Indexes (org, project, active_org) | present |
| Membership row count | **2** (unchanged) |
| Role histogram | owner×2 (unchanged) |
| Status histogram | active×1, revoked×1 (unchanged) |
| Non-null `organization_id` / `project_id` | **0 / 0** (no fabricated tenant ownership) |
| New RLS policies from this migration | **none** |
| Customer tenants / workspaces created | **none** |

## Application / Production contract

| Check | Result |
|-------|--------|
| `/api/core/health` ok | true |
| Scheduler | `supabase_cron` / `supabase_primary_active` / healthy |
| `providerName` | none |
| `liveExecutionReady` | false |
| Models API / generation calls | 0 / 0 |
| Switches | off (unchanged) |
| Workforce capacity / allocated / active / live-tested | 445 / 0 / 0 / 0 |
| Founder Proof | awaiting_final_review / founder_final_review |
| Founder Final Review | not approved |
| `scopeColumnsAvailable` | **true** (columns present; app SELECT path exits pre-migration mode) |
| Authenticated Production UI | not directly browser-verified because no safe credentials were available |

## Remaining backlog classification

| Item | Class |
|------|-------|
| JWT organization/project RLS absent | **B** — Phase 2 / follow-on; service_role Admin path remains app-authz gated; not an active cross-project leak by itself |
| Remaining optional export/search paths | **B** or **C** — inventory residual; high-risk list endpoints hardened in Step 5 |
| Job mutate-by-ID confirmations | **B** — cancel/retry already require `requireProjectAccess` + `manage_jobs` |
| Knowledge/memory residual integration paths | **B** — routes require project scope; deeper decideMemory ownership confirmations remain |
| Partial denial audit writes | **B** — ACCESS_DENIED code present; writes still best-effort |
| High-risk active cross-project exposure | **none identified as Phase 1 A blocker** after Step 5 + applied scope columns |

Class key: **A** = Phase 1 completion blocker · **B** = Phase 2 / follow-on without current Production cross-project mutate surface · **C** = not implemented / no current attack surface.

## Quality gates (this verification branch)

| Gate | Result |
|------|--------|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm run test` | 198 files / **1542 passed** / 3 skipped |
| `npm run build` | exit 0 |
| Focused tenant/auth/scope Vitest | 7 files / **80 passed** |
| Chrome browser harness | 1 file / **31 passed** |
| Playwright admin routes | **47 passed** |
| Ephemeral membership-scope SQL | skipped locally (`DATABASE_URL` unset); fixture/Vitest cross-tenant suite passed; CI ephemeral path remains available |

Authenticated Production UI not directly browser-verified because no safe credentials were available.