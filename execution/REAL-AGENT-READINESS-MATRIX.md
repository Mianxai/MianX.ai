# Real Agent Readiness Matrix

**Phase:** I.1  
**live-tested:** 0 (until Founder-authorized OpenRouter smoke)

## Semantics

| State | Meaning |
|-------|---------|
| documented | Present in catalogue / workforce docs |
| contract_valid | Purpose + I/O schemas + capabilities present |
| deterministic_ready | Executable catalogue agent (fake/deterministic path) |
| provider_ready | Deterministic-ready **and** OpenRouter or Anthropic key present |
| tools_ready | Tool registry available for the agent |
| runtime_ready | Code path can run (test-double or provider) |
| live_tested | Passed Founder-gated live smoke for that slug |
| blocked / suspended / deprecated | Not available for real work |

**Real Agent Ready** = `runtime_ready` ∧ `provider_ready` ∧ `live_tested` ∧ `contract_valid`.

`executable=true` alone is **never** “real working agent.”

## Catalogue snapshot (CI / no provider keys)

| Metric | Count |
|--------|------:|
| Catalogue total | 43 |
| Executable definitions | 38 |
| Intentionally non-executable | 5 |
| Documented | 43 |
| Contract-valid | 43 |
| Deterministic-ready | 38 |
| Provider-ready | 0 (no keys in CI) |
| Tools-ready | 38 |
| Runtime-ready | 38 |
| Live-tested | 0 |
| Real Agent Ready | 0 |
| Suspended (superseded drafts) | 5 |

## Capacity vs compiled roles

| Metric | Count |
|--------|------:|
| Documented capacity slots | 445 |
| Canonical role records compiled | 92 |
| Named workforce slots covered | 157 |
| Capacity-reserve gaps (unresolved named inventory) | 291 |
| Fabrications | 0 |

> 445 roles does **not** mean 445 agents are always running. MianX allocates only the required project-scoped agents when work exists.
