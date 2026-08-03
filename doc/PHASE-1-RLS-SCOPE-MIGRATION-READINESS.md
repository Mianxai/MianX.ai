# Phase 1 Step 4 — Organization/project scope migration and RLS rollout readiness

Status: Preview / Draft (`cursor/phase1-rls-scope-rollout`)  
As-of: 2026-08-03  
migrationApplied: **no**  
ProductionDatabaseChanged: **no**

## Exact PR #91 migration (single candidate)

| Field | Value |
|-------|--------|
| Path | `supabase/migrations/20260803180000_admin_memberships_optional_tenant_scope.sql` |
| Timestamp | `20260803180000` |
| Checksum SHA-256 | `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7` |
| Previous | `20260803120000_pilot_live_run_authorizations.sql` |
| Tables | `admin_memberships` |
| Columns | `organization_id uuid null FK→organizations ON DELETE SET NULL`; `project_id uuid null FK→projects ON DELETE SET NULL` |
| Constraints | `admin_memberships_project_requires_org` |
| Indexes | org, project, active_org partial |
| RLS changes | none new (table already RLS-enabled; deny-anon posture retained) |
| Grants | unchanged (service_role path) |
| Rollback | `supabase/rollbacks/20260803180000_admin_memberships_optional_tenant_scope.rollback.sql` |

No sibling competing migration for this feature.

## Application wiring (this Draft)

- `findActiveMembership` selects scope columns when present; falls back pre-migration
- `resolveProjectAccessScope` uses durable `organization_id` / `project_id` when available
- NULL durable columns → default-org only (never multi-org global)
- `platform.admin` → explicit `platform_organization` mode
- Pre-migration: `scopeColumnsAvailable: false` — Step 3 default-org behavior

## Ephemeral Postgres validation

Suite: `supabase/tests/membership-scope/`  
CI job: `Membership Scope Migration DB`  
Validates apply → schema → RLS/grants → Tenant A/B isolation → rollback → reapply.

## Linked dry-run

Founder runs `npx supabase db push --linked --dry-run` (see runbook).  
Agents must not apply.

Agent observation (2026-08-03): local worktree CLI reported
`LegacyProjectNotLinkedError` (project not linked in this environment).
Founder must run the linked dry-run from an authorized linked machine.
Ephemeral disposable validation is covered by CI job
`Membership Scope Migration DB` and
`npm run verify:membership-scope-migration:ephemeral`.

## Phase 1 Step 5 remaining-risk matrix

| Risk | Class | Next step |
|------|-------|-----------|
| `GET /api/core/runs\|jobs\|approvals\|audit` optional project_id | still unscoped/high | Step 5 |
| Admin analytics `listRuns({})` aggregates | still unscoped/high | Step 5 |
| Remaining Admin exports/search | partially protected | Step 5 |
| JWT org-scoped RLS policies | RLS gap | Step 5 / later |
| Workspaces | deferred | Phase 2 |
| ~70 other service-role sites | mixed infrastructure / catalog | inventory-driven Step 5 |

Acceptance to close Phase 1 (preview): all high-risk Admin list/export routes scoped; Founder-applied scope migration; ephemeral + Production post-apply checks green; no false multi-tenant claims.

## Related

- `doc/PHASE-1-RLS-SCOPE-MIGRATION-RUNBOOK.md`
- `doc/PHASE-1-MEMBERSHIP-SCOPED-DATA-ACCESS.md`
- `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md`
