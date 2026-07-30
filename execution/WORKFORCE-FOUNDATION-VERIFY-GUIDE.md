# Workforce Foundation Verify Guide

```bash
bash scripts/verify-workforce-foundation.sh
# or
npm run workforce:verify -- --env-local
# or
vercel env run -- npm run workforce:verify
```

Expect after foundation:

| Field | Value |
|-------|-------|
| compiledSeats | 445 |
| persistedSeats | 445 |
| readyToAllocateSeats | 445 (or lifecycle-accurate) |
| foundationReady | true |
| providerReady | false (until key) |
| liveReady | false |
| productionReady | false |
| liveTestedSeats | 0 |

Without database credentials: `persistedSeats: null`, `ok: false`.
Without migration: `bootstrapStatus: migration_required`.
Without bootstrap: `bootstrapStatus: bootstrap_required`.
