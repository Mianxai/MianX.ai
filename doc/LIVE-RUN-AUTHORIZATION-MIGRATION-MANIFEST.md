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
| migrationChecksumSha256 | `82b8223a1736467d6ee66b0ddf6c36192b6ac6b5d7108d9e8165adfd19e820b8` |
| previousMigration | `20260801120000_phase_ii1_live_agent_pilot.sql` |
| expectedRemoteHistory | All migrations through `20260801120000_phase_ii1_live_agent_pilot.sql` applied; this file pending until Founder apply |
| objectsCreated | table `public.pilot_live_run_authorizations`; function `public.consume_pilot_live_run_authorization(...)` |
| constraints | status CHECK; non-negative tokens/cost; text bounds; version 1–1000; expires≥authorized; consumed/revoked timestamps; checksum length 64 |
| indexesCreated | `pilot_lra_one_outstanding_authorized` (partial unique); project/status/expires indexes; issuance idempotency unique |
| RLS | ENABLE + **FORCE** ROW LEVEL SECURITY; policy `pilot_lra_service_all` for `service_role` only |
| functionSecurity | SECURITY DEFINER; **`SET search_path = ''`**; all refs `public.*` / `pg_catalog.*`; argument length bounds; no dynamic SQL |
| executePrivileges | REVOKE from PUBLIC/anon/authenticated; GRANT EXECUTE to `service_role` only |
| grants | GRANT ALL table → `service_role`; REVOKE table from public/anon/authenticated |
| disposableDbCI | GitHub Actions job `Live-run Auth Migration DB` (postgres:16) — **passed** on head `ebbf9ac…`: apply, schema, RLS/grants/`search_path=""`, concurrent consume (5×8 → exactly one success), rollback, reapply; no Production credentials |
| concurrencyResult | Exactly one concurrent consumer succeeds (5 reps × 8 workers); others zero-row conflict (atomic one-time consumption / at-most-one authorized provider-attempt boundary — not distributed exactly-once generation) |
| rollbackPath | `supabase/rollbacks/20260803120000_pilot_live_run_authorizations.rollback.sql` (refuses if non-empty) |
| linkedDryRun | `npx supabase db push --linked --dry-run` exit 0; exactly one pending: `20260803120000_pilot_live_run_authorizations.sql`; no mutation |
| estimatedLockLevel | ACCESS EXCLUSIVE on new table create (brief); function replace; no rewrite of existing tables |
| expectedDuration | seconds on empty pilot schema; no data backfill |
| compatibilityBeforeApply | App fail-closed: `authorization_store_unavailable`; providerCallAllowed false; Production deploy safe without migration |
| compatibilityAfterApply | Store may report `available`; still no provider calls until Founder auth + switches |
| postUseRollbackLimitation | Do **not** drop table after real authorization/evidence rows — prefer forward-fix + archival |
| founderApprovalRequired | **yes** — explicit Founder sentence required before linked apply |
| migrationApplied | **no** |
| ProductionDatabaseChanged | **no** |
