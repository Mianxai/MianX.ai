---
title: Live-run authorization migration release manifest
document_status: draft
implementation_status: readiness_only
production_status: not_applied
as_of: 2026-08-03
classification: Internal
---

# Migration release manifest — pilot_live_run_authorizations

| Field | Value |
|-------|-------|
| migrationPath | `supabase/migrations/20260803120000_pilot_live_run_authorizations.sql` |
| migrationChecksumSha256 | `5258d5d432c3cf4928d152be674416857a89f9b389d575d993632f29a7f3ddf0` |
| previousMigration | `20260801120000_phase_ii1_live_agent_pilot.sql` |
| expectedRemoteHistory | All migrations through `20260801120000_phase_ii1_live_agent_pilot.sql` applied; this file pending until Founder apply |
| objectsCreated | table `public.pilot_live_run_authorizations`; function `public.consume_pilot_live_run_authorization(...)` |
| indexesCreated | `pilot_lra_one_outstanding_authorized` (partial unique); `pilot_lra_project_idx`; `pilot_lra_status_idx`; `pilot_lra_expires_idx`; unique `pilot_lra_issuance_idempotency_unique` |
| functionsCreated | `consume_pilot_live_run_authorization` (SECURITY DEFINER, `search_path=public`) |
| policiesCreated | `pilot_lra_service_all` (service_role only) |
| grants | GRANT ALL table + EXECUTE function → `service_role`; REVOKE from `public`/`anon`/`authenticated` |
| estimatedLockLevel | ACCESS EXCLUSIVE on new table create (brief); function create; no rewrite of existing tables |
| expectedDuration | seconds on empty pilot schema; no data backfill |
| rollbackPath | `supabase/rollbacks/20260803120000_pilot_live_run_authorizations.rollback.sql` |
| compatibilityBeforeApply | App fail-closed: `authorization_store_unavailable`; providerCallAllowed false |
| compatibilityAfterApply | Authorization store may report `available`; still no provider calls until Founder auth + switches |
| owner | Founder / Mianx platform |
| founderApprovalRequired | **yes** — do not apply without Phase 0 approval in the runbook |
| migrationApplied | **no** |
| ProductionDatabaseChanged | **no** |
