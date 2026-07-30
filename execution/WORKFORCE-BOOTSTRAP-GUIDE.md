# Workforce Bootstrap Guide

```bash
npm run workforce:bootstrap   # compile + upsert 445 seats (idempotent)
npm run workforce:verify      # invariants
npm run workforce:test-double # software-house E2E without network
```

Bootstrap never deletes active records, never invents filler personas, never calls live providers, never applies production migrations.

Migration file: `supabase/migrations/20260730180000_phase_i2_workforce_registry.sql`  
Rollback: drop Phase I.2 tables only after Founder backup review (additive migration — prefer forward fixes).
