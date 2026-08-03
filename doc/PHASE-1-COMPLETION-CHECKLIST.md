# Phase 1 completion checklist

As-of: 2026-08-03  
Phase 1 status: **ready_for_migration_rollout**

Do **not** mark Phase 1 complete while Production migration remains unapplied.

| Gate | State |
|------|-------|
| Step 2 merged + deployed | yes (`c7ee986…`) |
| Step 3 merged + deployed | yes (`92897d6…`) |
| Step 4 merged + deployed | yes (`c6a273a…`) |
| Linked dry-run exit 0 (exact pending migration) | yes (Founder/agent recovered link; dry-run only) |
| Scope migration applied on Production | **no** |
| Post-apply RLS / durable scope verification | pending apply |
| High-risk list endpoints require project scope | yes in Step 5 Draft (runs/approvals/audit/jobs/analytics) |
| Remaining exports/search/job mutate-by-id | open |
| JWT membership RLS policies | open |
| Route matrix covers Admin tree (Vitest) | yes |
| Cross-tenant regression suite | yes (fixtures + handler + ephemeral SQL) |
| Audit ACCESS_DENIED action code present | yes (writes still optional/best-effort) |
| Production healthy pre-migration | yes |
| OpenAI dependency / live switches | unchanged / off |
| Founder signs Phase 1 completion | **not signed** |

## Allowed status values

- `incomplete`
- `ready_for_migration_rollout` ← **current**
- `ready_for_final_verification`
- `complete` (Founder only after apply + verification)

## Next Founder actions

1. Review/merge Step 5 Draft when CI green.
2. Separately authorize apply of
   `20260803180000_admin_memberships_optional_tenant_scope.sql`
   (checksum in `doc/PHASE-1-RLS-MIGRATION-ROLLOUT.md`).
3. Post-apply verifier + Tenant A/B checks.
4. Sign Phase 1 completion only after `ready_for_final_verification` gates pass.
