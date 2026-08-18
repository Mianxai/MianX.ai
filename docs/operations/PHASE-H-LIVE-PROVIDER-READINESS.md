# Phase H — Live Provider Readiness

Live execution requires **all** of:

1. Supported provider configured (`ANTHROPIC_API_KEY` present — never logged)
2. Founder explicitly enables live mode
3. Founder approves the objective / live gate
4. Execution budget present
5. Protected-action policies pass
6. Circuit breaker not open

`/api/core/health` → `integration.liveExecutionReady` must stay `false` unless those controls pass.

Deterministic simulation remains available without a provider.

**Never** present simulation output as live model completion.
