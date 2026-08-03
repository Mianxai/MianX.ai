# Phase 1 — RLS / membership scope migration rollout packet

As-of: 2026-08-03  
migrationApplied: **no**  
ProductionDatabaseChanged: **no**

## Unapplied Phase 1 migration (authorized candidate)

| Field | Value |
|-------|--------|
| Path | `supabase/migrations/20260803180000_admin_memberships_optional_tenant_scope.sql` |
| SHA-256 | `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7` |
| Previous | `20260803120000_pilot_live_run_authorizations.sql` |
| Objects | `admin_memberships` columns + indexes + check |
| RLS policies added | none (deny-by-default retained) |
| Rollback | `supabase/rollbacks/20260803180000_admin_memberships_optional_tenant_scope.rollback.sql` |
| Expected duration | seconds (additive nullable columns) |
| Lock expectations | brief ACCESS EXCLUSIVE on `admin_memberships` for ALTER |

## Pre-apply

1. PITR / backup available.
2. Confirm checksum.
3. `npx supabase db push --linked --dry-run` → exit 0, **exactly** this file pending.
4. Application healthy on current main with migration absent.
5. No OpenAI/live switch changes.

## Apply (Founder only)

```bash
npx supabase db push --linked --dry-run   # confirm again
npx supabase db push --linked             # apply exactly one
```

No repair / reset / seed.

## Post-apply verifier

- Columns `organization_id`, `project_id` present.
- Constraint `admin_memberships_project_requires_org` present.
- App `scopeColumnsAvailable: true` for memberships.
- Tenant Admin with durable project_id cannot see foreign projects.
- NULL org still resolves default-org only (not multi-org global).
- Health healthy; scheduler unchanged.

## Rollback

Safe only before durable scoped rows depend on columns — see rollback SQL.
After real scoped memberships exist: forward-fix, do not rollback.

## Stop conditions

- Dry-run shows sibling migrations → stop.
- Checksum mismatch → stop.
- Health degrades after apply → stop and escalate Founder.
