# Phase 1 — RLS / membership scope migration rollout packet

As-of: 2026-08-03  
migrationApplied: **no**  
ProductionDatabaseChanged: **no**  
Phase 1 status: **ready_for_migration_rollout**

## Exact migration

| Field | Value |
|-------|--------|
| Path | `supabase/migrations/20260803180000_admin_memberships_optional_tenant_scope.sql` |
| SHA-256 | `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7` |
| Previous | `20260803120000_pilot_live_run_authorizations.sql` |
| Dependency order | after all prior repo migrations; single pending on linked Production |
| Table altered | `public.admin_memberships` |
| Columns added | `organization_id uuid null FK→organizations ON DELETE SET NULL`; `project_id uuid null FK→projects ON DELETE SET NULL` |
| Constraints | `admin_memberships_project_requires_org` (project_id requires organization_id) |
| Indexes | `admin_memberships_organization_id_idx`, `admin_memberships_project_id_idx`, `admin_memberships_active_org_idx` |
| RLS policies added | **none** (table already RLS-enabled; deny-anon retained) |
| Grants | unchanged (service_role Admin path) |
| Rollback | `supabase/rollbacks/20260803180000_admin_memberships_optional_tenant_scope.rollback.sql` |
| Expected duration | seconds |
| Lock expectations | brief ACCESS EXCLUSIVE on `admin_memberships` during ALTER |

## Semantics (must hold)

- No customer tenant is automatically created.
- `organization_id` NULL = legacy default-org resolution only (**not** multi-org global).
- `project_id` NULL = all projects within effective org scope.
- Platform-wide listing requires explicit `platform.admin` in application code.
- Clients cannot self-assign scope columns.
- Applying this migration does **not** complete JWT org-scoped RLS or full multi-tenant isolation.

## Pre-apply application behavior

- App starts; health healthy; scheduler healthy.
- `scopeColumnsAvailable: false` → default-org project scoping (Step 3/4 wiring).
- Project-sensitive lists fail closed without `project_id` where required.

## Post-apply application behavior

- Membership SELECT includes org/project columns; `scopeColumnsAvailable: true`.
- Durable allowlist/org filters apply when columns set.
- NULL legacy rows still default-org only.

## Pre-apply guards

1. PITR / backup available.
2. Checksum exact match.
3. `npx supabase db push --linked --dry-run` → exit 0, **exactly** this file pending.
4. Production on exact approved main merge.
5. Switches off; provider blocked; no OpenAI calls.

## Linked dry-run

```bash
npx supabase db push --linked --dry-run
```

## Apply (Founder only — not agents)

```bash
npx supabase db push --linked --dry-run
npx supabase db push --linked
```

Exactly one migration. No repair / reset / seed.

## Post-apply verifier

```sql
-- columns + constraint present
select column_name from information_schema.columns
 where table_schema='public' and table_name='admin_memberships'
   and column_name in ('organization_id','project_id');
select conname from pg_constraint where conname='admin_memberships_project_requires_org';
```

Then: app health; Tenant A/B isolation with durable scope; NULL org not multi-org.

## Rollback before use

Safe only before durable scoped membership rows depend on columns — run rollback SQL.

## Forward-fix after scoped rows exist

Do not rollback; ship additive corrective migration.

## Stop conditions

- Dry-run sibling migrations / checksum mismatch / health degrade → stop.

## Founder approval requirement

Migration apply requires explicit Founder sentence authorization (see Step 5 closeout packet). Agents must not apply.
