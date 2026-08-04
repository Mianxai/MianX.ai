# Phase 1 — Post-migration verification

As-of: 2026-08-03 (UTC)  
Phase 1 status: **ready_for_final_verification**  
Phase 2 started: **no**  
This document does **not** self-approve Founder Phase 1 completion sign-off.

## Migration already applied (not re-applied)

| Field | Value |
|-------|--------|
| Path | `supabase/migrations/20260803180000_admin_memberships_optional_tenant_scope.sql` |
| SHA-256 | `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7` |
| Application window | `2026-08-03T16:16:45Z`–`2026-08-03T16:17:07Z` |
| Linked dry-run now | exit 0 · **0 pending** · remote up to date |
| Migration history | exactly one row for `20260803180000` |
| Re-apply attempted in this mission | **no** |

## Post-apply Production schema

| Check | Result |
|-------|--------|
| `organization_id` / `project_id` | uuid, nullable |
| Constraint `admin_memberships_project_requires_org` | present |
| Indexes (org, project, active_org) | present |
| Membership data verification | **passed** (exact Production row count intentionally omitted) |
| Non-null org/project on legacy rows | **0 / 0** |
| New RLS / broad authenticated policies from this migration | **none** |
| Unexpected SECURITY DEFINER touching memberships | **0** |

## Post-apply manual logical backup (outside Git)

| Field | Value |
|-------|--------|
| Storage location | Founder-controlled storage outside Git; exact local path intentionally omitted |
| Permissions | dir `700`, files `600` |
| Method | `npx supabase db dump --linked` via Colima Docker |
| roles.sql | 370 B · SHA-256 `168a95a9c745af5ed4679751f90419ac9dc434240a213b03e32a06d5664c2308` |
| schema.sql | 217787 B · SHA-256 `b91a2e1132a99ed265f5cc585e87292f54e35619cced5520f7203b5e38564a06` |
| data.sql | 1122986 B · SHA-256 `832543e1b854280b493bf424d79352bb8cbce216b06f0bc03cc945f8cd82206a` |
| Dump exits | roles/schema/data all **0** |
| Committed / uploaded | **no** |
| Label | post-apply manual logical backup — **not** PITR — **not** pre-migration snapshot |

## Disposable restore test

| Field | Value |
|-------|--------|
| Target | local PostgreSQL **16.14** (ephemeral data dir) |
| Result | **passed** (public application schema/data) |
| Public tables | 93 = source |
| admin_memberships | 2 = source; null org/project 2/2 |
| Scope columns / constraint / indexes | present |
| Sample counts | leads 7, orgs 1, projects 2, runtime_jobs 0, agent_runs 0 — match source |
| Managed differences | auth/storage relations, pg_cron/pg_net/vault, migration history table absent from supabase dump — classified expected |
| Public-schema restore errors | **0** |

## Recovery classification

| Field | Value |
|-------|--------|
| managedBackupReady | **false** (Free plan / none) |
| pitrReady | **false** |
| manualLogicalBackupCreated | **true** |
| manualLogicalBackupIntegrityVerified | **true** |
| manualLogicalRestoreTestPassed | **true** |
| manualRecoveryReady | **true** |

## Application / Production contract

| Check | Result |
|-------|--------|
| Health | healthy |
| Scheduler | `supabase_cron` / `supabase_primary_active` |
| providerName | none |
| liveExecutionReady | false |
| Models / generation | 0 / 0 |
| Switches | off |
| Workforce | 445 / 0 / 0 / 0 |
| Founder Proof | awaiting_final_review / founder_final_review |
| Founder Final Review | not approved |
| Authenticated Production UI | not directly browser-verified because no safe credentials were available |

## Remaining backlog classification

| Item | Class |
|------|-------|
| JWT organization/project RLS absent | **B** |
| Remaining optional export/search paths | **B** / **C** |
| Job mutate-by-ID UX confirmations | **B** (server already scoped) |
| Knowledge/memory residual paths | **B** |
| Partial denial audit writes | **B** |
| Active high-risk cross-project Production leak | **none as a Phase 1 blocker** |

## Quality gates (this verification)

| Gate | Result |
|------|--------|
| lint / typecheck / build | exit 0 |
| Vitest | 198 files / **1542 passed** / 3 skipped |
| Focused tenant/auth/scope | 6 files / **63 passed** |
| Chrome harness | **31 passed** |
| Playwright admin routes | **47 passed** |

## Phase 1 completion gates (honest)

Migration applied and catalog-verified: **yes**  
Post-apply backup + restore-tested: **yes**  
Final cross-tenant suite (fixtures): **yes**  
Founder explicit Phase 1 completion sign-off: **not signed**  
Status: **ready_for_final_verification** (not `complete`)
