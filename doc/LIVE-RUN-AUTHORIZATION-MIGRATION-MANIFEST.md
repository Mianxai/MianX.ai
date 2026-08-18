---
title: Live-run authorization migration release manifest
document_status: active
implementation_status: applied
production_status: applied
as_of: 2026-08-03
classification: Internal
---

# Migration release manifest — pilot_live_run_authorizations

| Field | Value |
|-------|-------|
| migrationPath | `supabase/migrations/20260803120000_pilot_live_run_authorizations.sql` |
| migrationChecksumSha256 | `82b8223a1736467d6ee66b0ddf6c36192b6ac6b5d7108d9e8165adfd19e820b8` |
| previousMigration | `20260801120000_phase_ii1_live_agent_pilot.sql` |
| appliedAtUtc | `2026-08-03T10:06:09Z` → `2026-08-03T10:06:34Z` (duration ~25s) |
| appliedVia | `npx supabase db push --linked` (Founder-authorized; exactly one migration) |
| objectsCreated | table `public.pilot_live_run_authorizations`; function `public.consume_pilot_live_run_authorization(...)` |
| constraints | status CHECK; non-negative tokens/cost; text bounds; version 1–1000; expires≥authorized; consumed/revoked timestamps; checksum length 64 |
| indexesCreated | `pilot_lra_one_outstanding_authorized` (partial unique); project/status/expires indexes; issuance idempotency unique |
| RLS | ENABLE + **FORCE** ROW LEVEL SECURITY; policy `pilot_lra_service_all` for `service_role` only |
| functionSecurity | SECURITY DEFINER; **`SET search_path = ''`** (catalog: `search_path=""`); all refs `public.*` / `pg_catalog.*` |
| executePrivileges | REVOKE from PUBLIC/anon/authenticated; GRANT EXECUTE to `service_role` only |
| postApplyCatalog | table exists; RLS+FORCE; FK SET NULL; 0 auth rows; prosecdef true; service_role execute only |
| linkedDryRunAfterApply | `upToDate: true`; pending migrations: none |
| compatibilityAfterApply | Store available; `providerCallAllowed` false; provider none; Models/generation 0; switches false; agents 0/0/0 |
| postUseRollbackLimitation | Do **not** drop table after real authorization/evidence rows — prefer forward-fix + archival |
| founderApprovalRequired | **yes** — received and executed for this single migration only |
| migrationApplied | **yes** |
| ProductionDatabaseChanged | **yes** (schema only; no authorization rows) |
