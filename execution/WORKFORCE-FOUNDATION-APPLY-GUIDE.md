# Workforce Foundation Apply Guide

Provider-independent. **No OpenRouter key required.**

1. Ensure you are on merged `main` with a clean working tree.  
2. Link Supabase CLI to the target project.  
3. Run:
   ```bash
   bash scripts/apply-workforce-foundation.sh
   ```
4. Review dry-run output.  
5. Type `APPLY` only when ready.  
6. Script applies pending migrations, runs bootstrap twice, and verifies
   `persistedSeats=445` with second-run `created=0`.  
7. Confirm `/api/core/health` shows `foundationReady: true` and
   `provider.configured: false` until you add a key later.

Do not paste documentation placeholders into the shell.
