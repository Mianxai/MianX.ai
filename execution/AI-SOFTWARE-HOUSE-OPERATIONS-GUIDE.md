# AI Software House Operations Guide

How MianX.ai runs as a **project-scoped AI software house** after Phase I.1.

## Mental model

```text
Founder
  → Executive Orchestrator / AI CEO
    → C-Suite
      → Directors / Managers
        → Execution agents
          → Independent QA / security reviewers
```

445 documented capacity slots ≠ 445 always-on processes.  
Work arrives → allocate instances → queue → lease → `invokeRealAgent` → tools → evidence → QA → complete/retry/dead-letter.

## Operator surfaces

| Surface | Purpose |
|---------|---------|
| `/admin/workforce-readiness` | Truthful readiness totals, readiness check, gated live-smoke docs |
| `/admin` Runtime / Queue | Manual tick when scheduler unset |
| `npm run runtime:tick` | Internal tick with `INTERNAL_RUNTIME_SECRET` |
| `npm run agents:live-smoke` | Founder-gated OpenRouter smoke (max 3 calls) |

## Safe vs protected

- Safe tools: knowledge, memory propose, task/workflow read, evidence, audit, analytics  
- Controlled: workspace patch candidates only inside sandbox — **never** production deploy  
- Protected: `production_deployment`, email send, secret rotation, permission escalation → Founder approval only  

## Failure honesty

- Provider missing → job fails (`PROVIDER_UNAVAILABLE`), never succeeds  
- QA reject/revision → instance waits; producer cannot self-approve  
- Memory/learning stay candidates until human/governance promote  
- Live-tested remains 0 until Founder smoke passes  

## Activation

See `OPENROUTER-ACTIVATION-GUIDE.md` and `LIVE-AGENT-ACCEPTANCE-CHECKLIST.md`.
