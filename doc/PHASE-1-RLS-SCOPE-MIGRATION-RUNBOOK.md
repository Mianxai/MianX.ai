# Phase 1 — RLS / membership scope migration runbook

Status: Founder-operated only  
As-of: 2026-08-03  
migrationApplied: **no**  
ProductionDatabaseChanged: **no**

## Exact migration

| Field | Value |
|-------|--------|
| Path | `supabase/migrations/20260803180000_admin_memberships_optional_tenant_scope.sql` |
| Previous migration | `20260803120000_pilot_live_run_authorizations.sql` |
| Rollback | `supabase/rollbacks/20260803180000_admin_memberships_optional_tenant_scope.rollback.sql` |
| Checksum (SHA-256) | `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7` |
| Ephemeral suite | `supabase/tests/membership-scope/run-ephemeral-validation.sh` |

## Semantics (must hold after apply)

- `organization_id` NULL → legacy default-org resolution only (not multi-org global)
- `project_id` NULL → all projects within effective org scope
- `project_id` set requires `organization_id` (check constraint)
- Platform-wide listing requires `platform.admin` (owner) in application code
- Clients cannot self-assign scope columns

## Pre-apply guards

1. Confirm Production PITR / backup available.
2. Confirm checksum matches this runbook.
3. Confirm linked dry-run lists **exactly** this pending migration (no siblings).
4. Confirm application on current main is healthy with migration **unapplied**.
5. Confirm no OpenAI live switches will be touched.

## Exact dry-run (Founder)

```bash
npx supabase db push --linked --dry-run
```

Expect exit 0 and the single pending file named above.

## Apply (Founder only — not agents)

```bash
# After dry-run review:
npx supabase db push --linked
# OR apply the single SQL file via approved Supabase SQL editor / pipeline
```

Apply **exactly one** migration. No repair, reset, or seed.

## Post-apply catalog checks

```sql
select column_name from information_schema.columns
 where table_name='admin_memberships'
   and column_name in ('organization_id','project_id');

select conname from pg_constraint
 where conname='admin_memberships_project_requires_org';
```

## Application health checks

- `GET /api/core/health` → healthy; scheduler unchanged
- Admin login works
- `GET /api/core/projects` returns scoped list (default org)
- Foreign project detail → privacy 404
- providerName remains `none` until separate live auth

## Tenant isolation checks

- Membership with `project_id=A` cannot list/load project B
- Membership with `organization_id=A` cannot list org B projects
- Insert with `project_id` and NULL `organization_id` rejected

## Rollback

- **Before** real scoped membership rows: empty-table rollback via rollback SQL is acceptable.
- **After** real scoped rows: prefer forward-fix — do not drop columns with live scope data.

## Founder approval sentence

I, the Founder, authorize applying migration
`20260803180000_admin_memberships_optional_tenant_scope.sql`
(checksum `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7`)
to the linked Production Supabase project after dry-run review.
I understand agents must not apply this migration.
