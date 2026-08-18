---

id: MODEL-MANAGEMENT-MODEL-REGISTRY-MODEL-DISCOVERY-001
title: Mianx.ai Model Management — Model Discovery
version: 1.0.0
status: Draft

description: Enterprise-grade Model Discovery specification for the Mianx.ai Model Management domain. This document defines the target governed capability for discovering, identifying, deduplicating, observing, triaging and preparing candidate Models for formal Model Onboarding and Registry intake across external Providers, cloud AI platforms, open-weight ecosystems, licensed Model sources, internal Model development, Fine-Tuning pipelines, Research Lab outputs, existing Model families, Project capability gaps, Agent performance gaps, Provider announcements, cost optimization signals, security requirements and strategic Model replacement needs. It defines discovery source classes, candidate identities, immutable internal Model identity boundaries, Provider Model aliases, Model families, exact Model Versions, artifacts, snapshots, provenance confidence, source Evidence, capability claims, Model cards, Provider metadata, benchmark claims, Safety claims, license claims, commercial claims, Data-processing claims, region claims, pricing claims, context-window claims, Tool support claims, Fine-Tuning support claims, modality claims, release/deprecation signals, discovery watchlists, periodic discovery, event-driven discovery, Research-driven discovery, automated discovery, human discovery, duplicate resolution, alias resolution, candidate clustering, confidence levels, stale metadata, conflicting sources, unknown information, Project/Tenant/workload relevance, capability-gap matching, risk triage, security screening, supply-chain screening, license screening, Data/privacy screening, Provider screening, cost screening, research eligibility preparation, onboarding handoff, Registry handoff boundaries, Catalog boundaries, Model Selection boundaries, Model Routing boundaries, auditability, metrics, verification, maturity and Runtime Truth. It permanently separates Model signal from Model discovery, discovery from Onboarding, discovered from registered, registered from approved, Catalog visibility from eligibility, Model name from Model identity, Provider alias from immutable Model Version, Provider metadata from Mianx.ai verification, Provider benchmark from Mianx.ai Benchmark, Provider Safety claim from Mianx.ai Safety Evaluation, public Model card from independent Evidence, open weights from unrestricted license, public availability from enterprise-use rights, Provider region from Data residency authorization, low price from low workflow cost, advertised context window from safe usable context, Tool support from Tool authority, Fine-Tuning support from Dataset or Fine-Tuning authority, capability claim from capability verification, popularity from suitability, Research recommendation from authority, automated discovery from automatic Onboarding, discovery rank from Model Selection authority, duplicate similarity from identical Model proof, same Model name across Providers from behavior equivalence, same alias over time from unchanged Model behavior, candidate metadata freshness from current Provider truth, source URL from immutable provenance, Model artifact availability from artifact integrity, artifact integrity from Model quality, internal Model origin from automatic trust, Fine-Tuned Model discovery from Base Model authorization inheritance, discovery of a replacement from migration authorization, discovery of a fallback from fallback eligibility, Founder routing from Founder approval, Founder notification from Founder approval, silence from approval, generated documentation from filesystem save, filesystem save from Git commit, Git commit from remote push, remote push from deployment, documented from implemented, implemented from tested or verified, and verified from Production authorization.

type: Model Management Model Discovery Architecture, Model Candidate Discovery Framework, Provider and Model Signal Intelligence Framework, Model Identity Resolution Framework, Model Discovery Evidence Framework, Model Discovery-to-Onboarding Handoff Framework, Runtime Truth Boundary, and Production Authorization Boundary

class: Target-state Model Discovery specification for Mianx.ai Model Management. This document defines intended discovery signals, candidate identities, source Evidence, duplicate resolution, Provider/model metadata handling, confidence scoring, Project/workload relevance analysis, automated discovery boundaries, onboarding handoff, auditability and verification expectations but does not prove that Mianx.ai currently operates a Model Discovery Crawler, Provider Watcher, Model Release Feed, Model Candidate Registry, duplicate-resolution engine, provenance-confidence engine, automated capability-gap matcher, discovery scoring service, Research-to-Discovery integration, onboarding handoff automation, or Production Model Discovery control plane.

category: AI Infrastructure, Model Registry, Model Discovery, Model Intelligence, Provider Intelligence and Governance
domain: Model Management
module: 27-model-management
submodule: model-registry

parent: doc/27-model-management/model-registry
path: doc/27-model-management/model-registry/model-discovery.md

owner: Mianx.ai Founder
authority: Founder and Enterprise Governance

highest_authority:
role: Founder
level: L0
final_enterprise_authority: true

stewards:

* Founder Office
* Enterprise Governance
* Model Governance
* Model Registry Governance
* Model Discovery Governance
* Model Catalog Governance
* Provider Governance
* Research Governance
* Model Lifecycle Governance
* Model Onboarding Governance
* Model Evaluation Governance
* Benchmark Governance
* Model Security Governance
* Safety Governance
* Data Governance
* Privacy Governance
* Compliance Governance
* License Governance
* Intellectual Property Governance
* Project Governance
* Tenant Governance
* Cost Governance
* Agent Governance
* Verification Governance
* Audit Governance
* Documentation Governance

maintainers:

* Model Management Team
* Model Registry Team
* Model Discovery Team
* Model Catalog Team
* Provider Integration Team
* Research Lab Team
* Model Lifecycle Team
* Model Onboarding Team
* Model Evaluation Team
* Benchmarking Team
* Security Engineering
* Safety Engineering
* Data Governance Team
* Privacy Operations
* Compliance Operations
* License Review Team
* FinOps Team
* Verification Engineering
* Audit Operations
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Model Governance
* Model Registry Governance
* Model Discovery Governance
* Model Catalog Governance
* Provider Governance
* Research Governance
* Model Lifecycle Governance
* Model Onboarding Governance
* Security Governance
* Safety Governance
* Data Governance
* Privacy Governance
* Compliance Governance
* License Governance
* Intellectual Property Governance
* Project Governance
* Tenant Governance
* Cost Governance
* Verification Governance
* Audit Governance
* Documentation Governance

created: 2026-08-15
updated: 2026-08-15

classification: Internal

audience:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance Teams
* Model Governance Teams
* Model Registry Teams
* Model Discovery Teams
* Model Catalog Teams
* Provider Integration Teams
* Research Lab Teams
* Model Lifecycle Teams
* Model Onboarding Teams
* Model Evaluation Teams
* Benchmarking Teams
* Security Teams
* Safety Teams
* Data Governance Teams
* Privacy Teams
* Compliance Teams
* License Review Teams
* Project Leaders
* Tenant Operations
* AI Workforce Teams
* Agent Platform Teams
* FinOps Teams
* Verification Engineers
* Auditors
* Documentation Maintainers

depends_on:

* ../README.md
* ../INDEX.md
* ../model-management-vision.md
* ../model-management-strategy.md
* ../model-management-architecture.md
* ../model-management-capabilities.md
* ../model-management-lifecycle.md
* ../model-management-governance.md
* ../model-management-security.md
* ../model-management-metrics.md
* ../model-management-checklists.md
* ../ROADMAP.md
* ../model-lifecycle/model-lifecycle.md
* ../model-lifecycle/model-onboarding.md
* ../model-lifecycle/model-retirement.md
* ../model-catalog/external-models.md
* ../model-catalog/fine-tuned-models.md
* ../model-catalog/foundation-models.md
* ../model-catalog/internal-models.md
* ../integrations/provider-integrations.md
* ../integrations/api-integrations.md
* ../integrations/sdk-management.md
* ../evaluation/evaluation-framework.md
* ../evaluation/quality-evaluation.md
* ../evaluation/safety-evaluation.md
* ../benchmarking/benchmark-suite.md
* ../benchmarking/comparison-reports.md
* ../benchmarking/performance-benchmarks.md
* ../fine-tuning/fine-tuning-framework.md
* ../fine-tuning/training-pipelines.md
* ../fine-tuning/dataset-management.md
* ../governance/model-governance.md
* ../governance/approval-process.md
* ../governance/policies.md
* ../compliance/ai-compliance.md
* ../compliance/data-compliance.md
* ../compliance/regulatory-compliance.md
* ../cost-management/usage-costs.md
* ../cost-management/cost-optimization.md
* ../architecture/model-platform.md
* ../architecture/system-architecture.md
* ../../01-governance/
* ../../19-ai-workforce/
* ../../20-ai-operating-system/
* ../../21-memory-engine/
* ../../22-agent-framework/
* ../../23-multi-agent-system/
* ../../24-automation-engine/
* ../../25-intelligence-engine/
* ../../26-research-lab/

related_documents:

* ./model-metadata.md
* ./model-registry.md
* ../model-routing/fallback-strategies.md
* ../model-routing/routing-engine.md
* ../model-routing/routing-policies.md
* ../model-selection/capability-mapping.md
* ../model-selection/selection-framework.md
* ../model-selection/selection-rules.md
* ../model-serving/inference-endpoints.md
* ../model-versioning/release-management.md
* ../model-versioning/versioning-strategy.md
* ../performance-monitoring/
* ../prompt-versioning/
* ../providers/
* ../security/
* ../testing/
* ../usage-analytics/
* ../CHANGELOG.md

## canonical: false

# Mianx.ai Model Management — Model Discovery

> **Model Discovery objective:** Detect potentially useful, necessary, risky, superior, cheaper, safer, more compliant or strategically relevant Models and Model Versions early enough for Mianx.ai to evaluate them—without confusing availability, popularity, Provider claims, Research recommendations or automated discovery with governed Model eligibility or Production authority.
>
> Target discovery flow:
>
> ```text id="mmd001"
> BUSINESS /
> AGENT /
> PROVIDER /
> RESEARCH /
> SECURITY /
> COST /
> TECHNOLOGY
> SIGNAL
>
> ↓
>
> DISCOVERY
> SOURCE
>
> ├── Provider
> ├── Model ecosystem
> ├── Research Lab
> ├── internal Model development
> ├── Fine-Tuning pipeline
> ├── Project requirement
> ├── Agent capability gap
> └── replacement/deprecation need
>
> ↓
>
> CANDIDATE
> OBSERVATION
>
> ↓
>
> SOURCE
> EVIDENCE
> CAPTURE
>
> ↓
>
> MODEL
> FAMILY /
> NAME /
> PROVIDER /
> VERSION /
> ARTIFACT
> RESOLUTION
>
> ↓
>
> DUPLICATE /
> ALIAS /
> EXISTING
> MODEL
> CHECK
>
> ↓
>
> PROVENANCE
> CONFIDENCE
>
> ↓
>
> CAPABILITY /
> COST /
> RISK /
> PROJECT
> RELEVANCE
> TRIAGE
>
> ↓
>
> DISCOVERY
> RECORD
>
> ↓
>
> ML01
> DISCOVERED
>
> ↓
>
> REQUEST
> FORMAL
> ONBOARDING
> WHERE
> JUSTIFIED
>
> ↓
>
> ML02
> INTAKE
> OPEN
> ```
>
> Permanent:
>
> ```text id="mmd002"
> DISCOVERED
> ≠
> REGISTERED
>
> DISCOVERED
> ≠
> ELIGIBLE
>
> DISCOVERED
> ≠
> PRODUCTION
> AUTHORIZED
> ```

---

# 1. Purpose

This document defines the target Model Discovery framework for Mianx.ai Model Management.

It establishes:

1. discovery signals.
2. discovery sources.
3. candidate identity.
4. source Evidence.
5. provenance.
6. Provider metadata handling.
7. alias/version resolution.
8. duplicate resolution.
9. Model family resolution.
10. artifact discovery.
11. capability claims.
12. Project/workload relevance.
13. Agent capability-gap discovery.
14. Research discovery.
15. Provider discovery.
16. internal Model discovery.
17. Fine-Tuned Model discovery.
18. security/risk discovery.
19. cost discovery.
20. deprecation/replacement discovery.
21. automated discovery.
22. discovery scoring.
23. unknown/conflicting metadata.
24. freshness.
25. watchlists.
26. onboarding handoff.
27. audit.
28. verification.
29. maturity.
30. Runtime Truth.

---

# 2. Non-Goals

This document does not:

* approve Models.
* register every discovered Model.
* authorize Production.
* define Model Selection policy.
* rank Models for live requests.
* declare Provider claims true.
* declare public Model cards verified.
* define universal discovery scores.
* define universal capability thresholds.
* perform legal advice.
* treat popularity as quality.
* treat open weights as unrestricted.
* automatically onboard discovered Models.
* prove a discovery runtime exists.

---

# 3. Model Discovery Definition

For Mianx.ai:

```text id="mmd003"
MODEL
DISCOVERY

=

GOVERNED
IDENTIFICATION

OF

A
POTENTIAL
MODEL /
MODEL
VERSION /
MODEL
ARTIFACT

WORTHY
OF

FORMAL
INTAKE /
ONBOARDING /
EVALUATION /
RISK
REVIEW
```

---

# 4. Discovery Boundary

Permanent:

```text id="mmd004"
MODEL
DISCOVERY
=
INTELLIGENCE
INPUT

NOT

MODEL
USE
AUTHORITY
```

---

# 5. Lifecycle Alignment

Discovery maps primarily to:

```text id="mmd005"
ML00
SIGNAL

↓

ML01
DISCOVERED

↓

ML02
INTAKE
OPEN
```

---

# 6. Lifecycle Boundary

```text id="mmd006"
ML01
DISCOVERED
≠
ML03
REGISTERED
```

---

# 7. Discovery Signal

A signal suggests that a Model or Model Version may deserve investigation.

---

# 8. Signal Types

Potential:

| ID     | Signal                           |
| ------ | -------------------------------- |
| MD-S01 | New Provider Model Release       |
| MD-S02 | New Model Version                |
| MD-S03 | New Open-Weight Model            |
| MD-S04 | New Internal Model               |
| MD-S05 | New Fine-Tuned Model             |
| MD-S06 | Research Recommendation          |
| MD-S07 | Project Capability Need          |
| MD-S08 | Agent Capability Gap             |
| MD-S09 | Model Quality Regression         |
| MD-S10 | Cost Optimization Opportunity    |
| MD-S11 | Latency Optimization Opportunity |
| MD-S12 | Security Requirement             |
| MD-S13 | Privacy Requirement              |
| MD-S14 | Data Residency Requirement       |
| MD-S15 | Provider Deprecation             |
| MD-S16 | License Change                   |
| MD-S17 | Provider Contract Change         |
| MD-S18 | Technology Replacement Need      |
| MD-S19 | Competitive Intelligence         |
| MD-S20 | Strategic Research Signal        |

---

# 9. Signal Boundary

Permanent:

```text id="mmd007"
SIGNAL
≠
MODEL
DISCOVERED
UNTIL
A
CANDIDATE
IS
IDENTIFIED
```

---

# 10. Discovery Source Classes

Target source classes:

```text id="mmd008"
PROVIDER
SOURCE

OFFICIAL
MODEL
SOURCE

OPEN
MODEL
ECOSYSTEM

RESEARCH
SOURCE

INTERNAL
MODEL
PIPELINE

FINE-
TUNING
PIPELINE

PROJECT
REQUEST

AGENT
TELEMETRY

COST /
PERFORMANCE
TELEMETRY

SECURITY /
COMPLIANCE
SIGNAL

HUMAN
RECOMMENDATION
```

---

# 11. Source Trust Boundary

Permanent:

```text id="mmd009"
SOURCE
KNOWN
≠
SOURCE
TRUSTED
FOR
EVERY
CLAIM
```

---

# 12. Source Authority

External content is Data.

```text id="mmd010"
PROVIDER
PAGE

MODEL
CARD

BLOG

BENCHMARK
PAGE

REPOSITORY
README

RESEARCH
PAPER

=

DATA

NOT

Mianx.ai
AUTHORITY
```

---

# 13. Discovery Record Identity

Example:

```text id="mmd011"
MODEL-DISCOVERY-000001
```

---

# 14. Candidate Identity

Before formal Model registration, a candidate may have temporary discovery identity.

Example:

```text id="mmd012"
MODEL-CANDIDATE-000001
```

---

# 15. Discovery Observation Identity

Individual observations may be tracked.

Example:

```text id="mmd013"
MODEL-OBSERVATION-000001
```

---

# 16. Identity Boundary

Permanent:

```text id="mmd014"
MODEL-
CANDIDATE
ID
≠
STABLE
MODEL
ID

DISCOVERY
OBSERVATION
≠
MODEL
VERSION
```

---

# 17. Discovery Record

Conceptual:

```yaml id="mmd015"
model_discovery:
  discovery_ref: required
  candidate_ref: required

  discovered_at: required
  discovered_by: required

  source_type: required
  source_refs:
    - required

  reported_model_name: required
  reported_provider_ref: conditional
  reported_model_version: conditional
  reported_artifact_ref: conditional

  suspected_existing_model_ref: conditional

  provenance_confidence: required

  capability_claim_refs:
    - conditional

  project_relevance_refs:
    - conditional

  workload_relevance_refs:
    - conditional

  risk_flags:
    - conditional

  cost_signal_ref: conditional

  discovery_status: required

  onboarding_recommendation: conditional

  evidence_refs:
    - required
```

---

# 18. Candidate States

Target discovery states:

```text id="mmd016"
MD00
SIGNAL
CAPTURED

MD01
CANDIDATE
IDENTIFIED

MD02
SOURCE
EVIDENCE
CAPTURED

MD03
IDENTITY
RESOLUTION

MD04
DUPLICATE
CHECK

MD05
PROVENANCE
ASSESSMENT

MD06
CAPABILITY
TRIAGE

MD07
RISK
TRIAGE

MD08
PROJECT /
WORKLOAD
RELEVANCE

MD09
DISCOVERY
REVIEW

MD10
ONBOARDING
RECOMMENDED

MD11
WATCHLIST

MD12
DEFERRED

MD13
NOT
PURSUED
```

---

# 19. Discovery State Boundary

```text id="mmd017"
MD10
ONBOARDING
RECOMMENDED
≠
ONBOARDING
AUTHORIZED /
COMPLETED
```

---

# 20. External Provider Discovery

Provider discovery may identify:

* newly released Models.
* new snapshots.
* new regions.
* new capabilities.
* new pricing.
* deprecations.
* new Fine-Tuning options.

---

# 21. Provider Discovery Boundary

Permanent:

```text id="mmd018"
PROVIDER
ANNOUNCES
MODEL
≠
Mianx.ai
SHOULD
ADOPT
MODEL
```

---

# 22. Provider Metadata

Potential fields:

```text id="mmd019"
PROVIDER
NAME

MODEL
DISPLAY
NAME

PROVIDER
MODEL
ID

MODEL
FAMILY

SNAPSHOT /
VERSION

MODALITY

CONTEXT
WINDOW

TOOL
SUPPORT

STRUCTURED
OUTPUT

FINE-
TUNING

REGIONS

PRICING

DEPRECATION

DATA
TERMS
```

---

# 23. Provider Metadata Boundary

Permanent:

```text id="mmd020"
PROVIDER
METADATA
=
SOURCE
CLAIM

NOT

Mianx.ai
VERIFIED
MODEL
TRUTH
```

---

# 24. Provider Alias

Providers may expose aliases such as:

```text id="mmd021"
latest

stable

preview

turbo

pro

default
```

---

# 25. Alias Boundary

```text id="mmd022"
PROVIDER
ALIAS
≠
IMMUTABLE
MODEL
VERSION
```

---

# 26. Alias Stability

Permanent:

```text id="mmd023"
ALIAS
UNCHANGED
≠
UNDERLYING
MODEL
UNCHANGED
```

---

# 27. Exact Version Resolution

Where exact Provider snapshot is disclosed, discovery should capture it.

Where it is not disclosed:

```text id="mmd024"
MODEL
VERSION
=
UNKNOWN /
PROVIDER-
OPAQUE
```

rather than inventing precision.

---

# 28. Version Boundary

```text id="mmd025"
PROVIDER
DOES
NOT
DISCLOSE
VERSION
≠
Mianx.ai
KNOWS
EXACT
VERSION
```

---

# 29. Model Family Resolution

Candidate should be related to a Model family when supported by Evidence.

Example:

```text id="mmd026"
MODEL
FAMILY

├── VERSION 1
├── VERSION 2
└── VERSION 3
```

---

# 30. Family Boundary

Permanent:

```text id="mmd027"
SAME
MODEL
FAMILY
≠
SAME
MODEL
BEHAVIOR
```

---

# 31. Cross-Provider Same-Name Resolution

The same marketed Model name may appear across multiple Providers.

---

# 32. Cross-Provider Boundary

```text id="mmd028"
PROVIDER A
MODEL
NAME
=
PROVIDER B
MODEL
NAME

≠

BEHAVIORAL /
OPERATIONAL /
DATA
EQUIVALENCE
```

---

# 33. Open-Weight Model Discovery

Open-weight discovery may capture:

* repository.
* artifact.
* license.
* hashes.
* Model card.
* release tags.
* dependencies.

---

# 34. Open-Weight Boundary

Permanent:

```text id="mmd029"
OPEN
WEIGHTS
≠
UNRESTRICTED
LICENSE
```

---

# 35. Public Availability Boundary

```text id="mmd030"
PUBLICLY
DOWNLOADABLE
≠
ENTERPRISE
USE
AUTHORIZED
```

---

# 36. Artifact Discovery

Candidate artifacts may include:

```text id="mmd031"
MODEL
WEIGHTS

TOKENIZER

CONFIG

ADAPTER

QUANTIZED
ARTIFACT

COMPILED
ARTIFACT

CHECKPOINT
```

---

# 37. Artifact Boundary

Permanent:

```text id="mmd032"
ARTIFACT
DISCOVERED
≠
ARTIFACT
INTEGRITY
VERIFIED
```

---

# 38. Artifact Integrity Boundary

```text id="mmd033"
ARTIFACT
INTEGRITY
VERIFIED
≠
MODEL
QUALITY /
SAFETY
VERIFIED
```

---

# 39. Internal Model Discovery

Internal discovery may originate from:

* Research Lab.
* AI Platform.
* Fine-Tuning.
* domain teams.
* experimental Models.

---

# 40. Internal Model Boundary

Permanent:

```text id="mmd034"
MODEL
BUILT
BY
Mianx.ai
≠
MODEL
TRUSTED
AUTOMATICALLY
```

---

# 41. Fine-Tuned Model Discovery

Fine-Tuning pipelines may emit candidate artifacts.

---

# 42. Fine-Tuning Discovery Boundary

```text id="mmd035"
TRAINING
RUN
SUCCESS
≠
DISCOVERED
FINE-
TUNED
MODEL
APPROVED
```

---

# 43. Base/Derivative Relationship

Discovery should preserve known relationship:

```text id="mmd036"
BASE
MODEL

↓

FINE-
TUNING

↓

DERIVATIVE
MODEL
```

---

# 44. Base Authority Boundary

Permanent:

```text id="mmd037"
BASE
MODEL
AUTHORIZED
≠
DERIVATIVE
MODEL
AUTHORIZED
```

---

# 45. Research Lab Discovery

Research Lab may discover or recommend Models.

---

# 46. Research Boundary

```text id="mmd038"
RESEARCH
RECOMMENDATION
≠
MODEL
AUTHORITY
```

---

# 47. Research Evidence

Potential:

* experiment.
* paper review.
* benchmark.
* capability study.
* failure analysis.
* Provider comparison.

---

# 48. Research Result Boundary

Permanent:

```text id="mmd039"
PROMISING
RESEARCH
RESULT
≠
MODEL
ONBOARDING
APPROVAL
```

---

# 49. Project-Driven Discovery

Projects may signal need for:

* language support.
* vision.
* code.
* low latency.
* privacy.
* regional hosting.
* domain specialization.

---

# 50. Project Boundary

```text id="mmd040"
PROJECT
NEEDS
CAPABILITY
≠
ANY
MODEL
CLAIMING
CAPABILITY
IS
ELIGIBLE
```

---

# 51. Tenant-Driven Discovery

Tenant needs may trigger discovery but should not create cross-Tenant authority.

Permanent:

```text id="mmd041"
TENANT-A
NEED
≠
TENANT-B
MODEL
AUTHORITY
```

---

# 52. Agent Capability-Gap Discovery

Agent telemetry may reveal:

* poor Tool-call success.
* weak reasoning.
* high latency.
* high cost.
* structured-output errors.
* domain-quality gaps.

---

# 53. Agent Gap Boundary

```text id="mmd042"
AGENT
PERFORMANCE
PROBLEM
≠
MODEL
IS
ROOT
CAUSE
AUTOMATICALLY
```

Prompt, Tool, Data, workflow and orchestration may also contribute.

---

# 54. Replacement Discovery

Model discovery may be triggered by retirement/deprecation.

---

# 55. Replacement Boundary

Permanent:

```text id="mmd043"
REPLACEMENT
DISCOVERED
≠
REPLACEMENT
ELIGIBLE
```

---

# 56. Fallback Discovery

Candidate Model may be considered for fallback.

---

# 57. Fallback Boundary

```text id="mmd044"
FALLBACK
MODEL
DISCOVERED
≠
FALLBACK
SAFE /
AUTHORIZED
```

---

# 58. Capability Claims

Discovery may record claimed capabilities without verifying them.

---

# 59. Capability Claim Classes

Potential:

| ID     | Capability Claim           |
| ------ | -------------------------- |
| MD-C01 | Text Generation            |
| MD-C02 | Reasoning                  |
| MD-C03 | Structured Output          |
| MD-C04 | Tool Calling               |
| MD-C05 | Coding                     |
| MD-C06 | Vision                     |
| MD-C07 | Audio                      |
| MD-C08 | Multimodal                 |
| MD-C09 | Embeddings                 |
| MD-C10 | Reranking                  |
| MD-C11 | Long Context               |
| MD-C12 | Fine-Tuning                |
| MD-C13 | Streaming                  |
| MD-C14 | Batch                      |
| MD-C15 | Domain Specialization      |
| MD-C16 | Low-Latency Serving        |
| MD-C17 | Local/Self-Hosted Serving  |
| MD-C18 | Agent-Oriented Use         |
| MD-C19 | Multilingual Capability    |
| MD-C20 | Other Candidate Capability |

---

# 60. Capability Claim Boundary

Permanent:

```text id="mmd045"
CAPABILITY
ADVERTISED
≠
CAPABILITY
VERIFIED
```

---

# 61. Tool Support Boundary

```text id="mmd046"
MODEL
SUPPORTS
TOOL
CALLING
≠
MODEL
HAS
TOOL
AUTHORITY
```

---

# 62. Fine-Tuning Support Boundary

```text id="mmd047"
PROVIDER
SUPPORTS
FINE-
TUNING
≠
Mianx.ai
AUTHORIZED
TO
FINE-
TUNE
WITH
ANY
DATA
```

---

# 63. Context Window Claims

Providers may advertise maximum context.

---

# 64. Context Boundary

Permanent:

```text id="mmd048"
ADVERTISED
CONTEXT
WINDOW
≠
SAFE /
USEFUL /
HIGH-
QUALITY
CONTEXT
WINDOW
FOR
EVERY
WORKLOAD
```

---

# 65. Structured Output Claims

Structured-output support should later be tested.

---

# 66. Benchmark Claims

Discovery may capture Provider or third-party benchmark claims.

---

# 67. Benchmark Claim Boundary

```text id="mmd049"
PROVIDER
BENCHMARK
≠
Mianx.ai
BENCHMARK
```

---

# 68. Benchmark Winner Boundary

Permanent:

```text id="mmd050"
BENCHMARK
WINNER
≠
BEST
MODEL
FOR
EVERY
Mianx.ai
WORKLOAD
```

---

# 69. Safety Claims

Provider may advertise Safety systems or ratings.

---

# 70. Safety Claim Boundary

```text id="mmd051"
PROVIDER
SAFETY
CLAIM
≠
Mianx.ai
SAFETY
EVALUATION
PASS
```

---

# 71. Compliance Claims

Provider may publish certifications or compliance statements.

---

# 72. Compliance Boundary

Permanent:

```text id="mmd052"
PROVIDER
COMPLIANCE
CLAIM
≠
Mianx.ai
COMPLIANCE
VERIFICATION
FOR
DEFINED
WORKLOAD
```

---

# 73. Data Processing Claims

Capture source statements about:

* retention.
* training.
* logging.
* regions.
* subprocessors.

---

# 74. Data Claim Boundary

```text id="mmd053"
PROVIDER
SAYS
"NO
TRAINING"
≠
ZERO
RETENTION /
ZERO
LOGGING /
ALL
DATA
POLICY
QUESTIONS
RESOLVED
```

---

# 75. Region Claims

Model availability may differ by region.

---

# 76. Region Boundary

Permanent:

```text id="mmd054"
MODEL
AVAILABLE
IN
REGION
≠
PROJECT /
TENANT
DATA
AUTHORIZED
IN
REGION
```

---

# 77. Pricing Claims

Discovery may capture:

* token price.
* request price.
* batch discount.
* cache pricing.
* hosting cost.

---

# 78. Price Boundary

```text id="mmd055"
LOW
MODEL
PRICE
≠
LOW
WORKFLOW
COST
```

---

# 79. Cost Opportunity

Potential discovery trigger:

```text id="mmd056"
CURRENT
MODEL
COST

↓

DISCOVER
LOWER-
COST
CANDIDATE

↓

EVALUATE

QUALITY /
SAFETY /
LATENCY /
TOOLS /
PROJECT
FIT

↓

DO
NOT
AUTO-
SWITCH
```

---

# 80. Cost Boundary II

Permanent:

```text id="mmd057"
CHEAPER
CANDIDATE
≠
BETTER
ENTERPRISE
MODEL
```

---

# 81. Model Popularity

Popularity signals may include:

* downloads.
* usage.
* citations.
* community attention.

---

# 82. Popularity Boundary

```text id="mmd058"
POPULAR
MODEL
≠
SECURE /
SAFE /
LICENSE-
COMPATIBLE /
SUITABLE
MODEL
```

---

# 83. Model Card Discovery

Discovery may preserve Model card as source Evidence.

---

# 84. Model Card Boundary

Permanent:

```text id="mmd059"
MODEL
CARD
≠
INDEPENDENT
VERIFICATION
```

---

# 85. Untrusted Instructions

Model cards, READMEs and Provider content may contain instructions.

```text id="mmd060"
MODEL
CARD
INSTRUCTIONS
=
DATA

NOT

Mianx.ai
GOVERNANCE
AUTHORITY
```

---

# 86. Authority Injection Protection

Discovery pipelines should not allow source text to alter system authority.

Permanent:

```text id="mmd061"
SOURCE
TEXT
SAYS

"APPROVED"

"PRODUCTION
READY"

"FOUNDER
AUTHORIZED"

≠

REAL
Mianx.ai
AUTHORITY
```

---

# 87. Duplicate Resolution

Discovery should identify candidate duplication.

Potential dimensions:

```text id="mmd062"
SAME
PROVIDER
MODEL
ID

SAME
PROVIDER
SNAPSHOT

SAME
ARTIFACT
HASH

SAME
MODEL
FAMILY /
VERSION

SAME
MODEL
UNDER
ALIAS

SAME
MODEL
THROUGH
DIFFERENT
ENDPOINT
```

---

# 88. Duplicate Boundary

Permanent:

```text id="mmd063"
HIGH
SIMILARITY
≠
IDENTICAL
MODEL
PROVEN
```

---

# 89. Duplicate Outcome

Potential:

```text id="mmd064"
EXISTING
MODEL
MATCH

NEW
VERSION
OF
EXISTING
MODEL

NEW
PROVIDER
MAPPING

NEW
MODEL
IDENTITY

UNRESOLVED
```

---

# 90. Unresolved Identity

If identity cannot be confidently resolved:

```text id="mmd065"
IDENTITY
STATUS
=
UNRESOLVED
```

---

# 91. Unknown Boundary

Permanent:

```text id="mmd066"
UNRESOLVED
IDENTITY
≠
ASSUME
NEW /
ASSUME
SAME
```

---

# 92. Provenance Confidence

Target levels:

```text id="mmd067"
PC0
UNKNOWN

PC1
UNVERIFIED
THIRD-
PARTY
CLAIM

PC2
OFFICIAL
SOURCE
CLAIM

PC3
MULTIPLE
CONSISTENT
SOURCES

PC4
SOURCE /
ARTIFACT
IDENTITY
STRONGLY
VERIFIED
```

These are discovery confidence classes, not Production authority.

---

# 93. Provenance Confidence Boundary

```text id="mmd068"
HIGH
PROVENANCE
CONFIDENCE
≠
HIGH
MODEL
QUALITY
```

---

# 94. Source Evidence

Potential:

```text id="mmd069"
SOURCE
IDENTIFIER

PUBLISHER

OBSERVED
TIMESTAMP

RELEASE
DATE
IF
KNOWN

MODEL
NAME

VERSION /
SNAPSHOT

ARTIFACT
HASH
IF
AVAILABLE

SOURCE
TEXT
SUMMARY

EVIDENCE
LOCATION
```

---

# 95. Source Timestamp Boundary

Permanent:

```text id="mmd070"
SOURCE
PAGE
RECENTLY
UPDATED
≠
MODEL
INFORMATION
IT
CONTAINS
IS
CURRENT
```

---

# 96. Metadata Freshness

Potential states:

```text id="mmd071"
CURRENT

AGING

STALE

SUPERSEDED

UNKNOWN
```

Exact age thresholds require approved policy.

---

# 97. Freshness Boundary

```text id="mmd072"
CACHED
DISCOVERY
METADATA
≠
CURRENT
PROVIDER
TRUTH
```

---

# 98. Change Detection

Discovery may track:

* new Version.
* alias change.
* pricing change.
* license change.
* Data term change.
* region change.
* deprecation.

---

# 99. Change Boundary

Permanent:

```text id="mmd073"
MODEL
NAME
UNCHANGED
≠
DISCOVERY
RECORD
UNCHANGED
```

---

# 100. Conflicting Sources

When sources disagree:

```text id="mmd074"
SOURCE A
CLAIM

≠

SOURCE B
CLAIM

↓

MARK
CONFLICT

↓

DO
NOT
SILENTLY
CHOOSE
MORE
CONVENIENT
CLAIM
```

---

# 101. Conflict Boundary

```text id="mmd075"
CONFLICTING
METADATA
≠
AUTOMATIC
ALLOW
```

---

# 102. Missing Data

Discovery should explicitly represent:

```text id="mmd076"
UNKNOWN

NOT
DISCLOSED

NOT
VERIFIED

NOT
APPLICABLE

PENDING
```

---

# 103. Critical Unknown Boundary

Permanent:

```text id="mmd077"
CRITICAL
UNKNOWN
≠
ASSUME
SAFE
```

---

# 104. Initial Risk Triage

Discovery risk triage may flag:

```text id="mmd078"
UNKNOWN
LICENSE

OPAQUE
VERSION

UNVERIFIED
ARTIFACT

HIGH
DATA
EXPOSURE

UNKNOWN
RETENTION

UNTRUSTED
SOURCE

MALICIOUS
PACKAGE
RISK

HIGH
AUTONOMY
TARGET

TOOL
USE

REGULATED
DATA

PROVIDER
LOCK-
IN
```

---

# 105. Risk Triage Boundary

```text id="mmd079"
DISCOVERY
RISK
TRIAGE
≠
FORMAL
SECURITY /
SAFETY /
COMPLIANCE
ASSESSMENT
```

---

# 106. License Triage

Discovery may identify license class or missing license.

---

# 107. License Boundary

Permanent:

```text id="mmd080"
LICENSE
FILE
PRESENT
≠
LICENSE
TERMS
COMPATIBLE
WITH
Mianx.ai
USE
```

---

# 108. Supply-Chain Triage

Potential:

* suspicious package.
* unknown uploader.
* unsigned artifact.
* unexpected build script.
* dependency risk.

---

# 109. Supply-Chain Boundary

```text id="mmd081"
DOWNLOAD
SUCCESS
≠
ARTIFACT
TRUST
```

---

# 110. Project Relevance

Discovery may classify candidate relevance.

Potential:

```text id="mmd082"
HIGH
RELEVANCE

MEDIUM
RELEVANCE

LOW
RELEVANCE

NO
CURRENT
PROJECT
RELEVANCE
```

---

# 111. Relevance Boundary

Permanent:

```text id="mmd083"
HIGH
PROJECT
RELEVANCE
≠
PROJECT
MODEL
ELIGIBILITY
```

---

# 112. Workload Relevance

Candidate may be relevant to one workload only.

---

# 113. Workload Boundary

```text id="mmd084"
MODEL
RELEVANT
TO
CODING
≠
MODEL
RELEVANT
TO
AUTONOMOUS
FINANCIAL
TOOLS
```

---

# 114. Project/Tenant Discovery Boundary

Discovery metadata may mention expected Project/Tenant scope.

Permanent:

```text id="mmd085"
DISCOVERY
TAG
PROJECT-A
≠
PROJECT-A
AUTHORITY
```

---

# 115. Capability-Gap Matching

Future discovery automation may map:

```text id="mmd086"
AGENT /
PROJECT
CAPABILITY
GAP

↓

REQUIRED
CAPABILITIES

↓

MODEL
CANDIDATE
CLAIMS

↓

DISCOVERY
MATCH
```

---

# 116. Match Boundary

```text id="mmd087"
CAPABILITY
MATCH
≠
MODEL
SELECTION
DECISION
```

---

# 117. Model Selection Boundary

Permanent:

```text id="mmd088"
DISCOVERY
RANKING
≠
MODEL
SELECTION
AUTHORITY
```

---

# 118. Router Boundary

```text id="mmd089"
DISCOVERED
MODEL
ADDRESSABLE
BY
PROVIDER
API
≠
ROUTER
MAY
ROUTE
TO
IT
```

---

# 119. Catalog Boundary

A discovered Model may later become visible in Catalog after governed intake.

Permanent:

```text id="mmd090"
DISCOVERY
RECORD
≠
CATALOG
APPROVAL

CATALOG
ENTRY
≠
MODEL
AUTHORITY
```

---

# 120. Registry Boundary

Formal Model Registry should own stable internal Model identity.

```text id="mmd091"
DISCOVERY
CANDIDATE
NAME
≠
REGISTRY
STABLE
MODEL
IDENTITY
```

---

# 121. Model Metadata Handoff

Discovery should prepare candidate metadata for the next governed layer.

Potential:

```text id="mmd092"
IDENTITY
CLAIMS

SOURCE

PROVIDER

VERSION

ARTIFACT

CAPABILITIES

LIMITATIONS

PRICING

REGIONS

LICENSE
SIGNALS

DATA
SIGNALS

RISK
FLAGS
```

---

# 122. Metadata Handoff Boundary

Permanent:

```text id="mmd093"
DISCOVERY
METADATA
≠
CANONICAL
MODEL
METADATA
UNTIL
GOVERNED
VALIDATION /
REGISTRY
CONTROL
```

---

# 123. Onboarding Recommendation

Discovery may recommend:

```text id="mmd094"
ONBOARD
NOW

WATCHLIST

DEFER

DO
NOT
PURSUE

URGENT
RISK /
REPLACEMENT
REVIEW
```

---

# 124. Recommendation Boundary

```text id="mmd095"
ONBOARDING
RECOMMENDED
≠
ONBOARDING
APPROVED
```

---

# 125. Watchlist

A candidate may remain on discovery watchlist.

Potential reasons:

* immature release.
* missing region.
* missing license clarity.
* Provider preview.
* no current need.
* cost too high.

---

# 126. Watchlist Boundary

Permanent:

```text id="mmd096"
WATCHLIST
≠
MODEL
ELIGIBILITY
```

---

# 127. Deferred Candidate

Deferred candidates remain historically recorded.

---

# 128. Not Pursued

A candidate may be marked not pursued without claiming permanent prohibition.

```text id="mmd097"
NOT
PURSUED
NOW
≠
PERMANENTLY
BANNED
```

---

# 129. Discovery Automation

Future automation may:

* watch Provider releases.
* monitor Model repositories.
* ingest Research signals.
* detect internal artifacts.
* compare existing Model gaps.
* detect Provider deprecations.

---

# 130. Automation Boundary

Permanent:

```text id="mmd098"
AUTOMATED
DISCOVERY
≠
AUTOMATED
MODEL
ADOPTION
```

---

# 131. Crawler Boundary

```text id="mmd099"
CRAWLER
FOUND
MODEL
≠
MODEL
SOURCE /
LICENSE /
IDENTITY
VERIFIED
```

---

# 132. Automated Classification

AI may propose:

* Model family.
* capability tags.
* relevance.
* risk flags.

---

# 133. Classification Boundary II

Permanent:

```text id="mmd100"
AI
CLASSIFICATION
=
RECOMMENDATION /
EVIDENCE

NOT

FINAL
MODEL
AUTHORITY
```

---

# 134. Automated Summary

Discovery automation may summarize external source content.

---

# 135. Summary Boundary

```text id="mmd101"
AI
SUMMARY
OF
MODEL
CARD
≠
MODEL
CARD
SOURCE
EVIDENCE
ITSELF
```

---

# 136. Discovery Scoring

Future discovery score may combine:

```text id="mmd102"
PROJECT
RELEVANCE

CAPABILITY
CLAIMS

MODEL
NOVELTY

COST
OPPORTUNITY

PROVIDER
FIT

RISK

EVIDENCE
QUALITY
```

---

# 137. Score Boundary

Permanent:

```text id="mmd103"
HIGH
DISCOVERY
SCORE
≠
HIGH
MODEL
QUALITY /
ELIGIBILITY /
AUTHORITY
```

---

# 138. No Universal Score Threshold

This document does not define a universal score that automatically triggers Onboarding.

---

# 139. Human Discovery

Human operators may add candidates manually.

---

# 140. Human Boundary

```text id="mmd104"
HUMAN
EXPERT
RECOMMENDS
MODEL
≠
MODEL
APPROVED
```

---

# 141. Founder Discovery Signal

Founder may direct Model investigation.

---

# 142. Founder Boundary

Permanent:

```text id="mmd105"
FOUNDER
REQUESTS
MODEL
DISCOVERY
≠
FOUNDER
APPROVES
MODEL
FOR
PRODUCTION
```

---

# 143. Security Discovery Signal

Security issue in current Model may trigger replacement discovery.

---

# 144. Security Boundary

```text id="mmd106"
CURRENT
MODEL
UNSAFE
≠
FIRST
ALTERNATIVE
DISCOVERED
IS
SAFE
```

---

# 145. Provider Deprecation Discovery

Target:

```text id="mmd107"
PROVIDER
DEPRECATION
NOTICE

↓

IDENTIFY
AFFECTED
MODEL

↓

DISCOVER
REPLACEMENTS

↓

DO
NOT
AUTO-
MIGRATE

↓

ONBOARD /
EVALUATE /
AUTHORIZE
REPLACEMENT
```

---

# 146. Deprecation Boundary

Permanent:

```text id="mmd108"
PROVIDER
SUNSET
URGENT
≠
Mianx.ai
GOVERNANCE
MAY
BE
IGNORED
```

---

# 147. Model Discovery Audit Events

Audit material:

```text id="mmd109"
SIGNAL
CAPTURED

CANDIDATE
CREATED

SOURCE
EVIDENCE
ADDED

IDENTITY
RESOLUTION

DUPLICATE
DECISION

PROVENANCE
CONFIDENCE
CHANGE

CAPABILITY
CLAIM
ADDED

RISK
FLAG
ADDED

PROJECT
RELEVANCE
DECISION

WATCHLIST
DECISION

ONBOARDING
RECOMMENDATION

NOT-
PURSUED
DECISION
```

---

# 148. Audit Boundary

Permanent:

```text id="mmd110"
DISCOVERY
AUDIT
RECORD
EXISTS
≠
DISCOVERY
CLAIM
TRUE /
MODEL
AUTHORIZED
```

---

# 149. Model Discovery Metrics

Potential:

| ID     | Metric                                          |
| ------ | ----------------------------------------------- |
| MD-M01 | Discovery Signal Count                          |
| MD-M02 | Candidate Model Count                           |
| MD-M03 | New Model Version Discovery Count               |
| MD-M04 | Provider Release Discovery Count                |
| MD-M05 | Internal Model Discovery Count                  |
| MD-M06 | Fine-Tuned Model Discovery Count                |
| MD-M07 | Research-Origin Candidate Count                 |
| MD-M08 | Duplicate Candidate Rate                        |
| MD-M09 | Alias Resolution Coverage                       |
| MD-M10 | Exact Version Resolution Coverage               |
| MD-M11 | Provenance Evidence Coverage                    |
| MD-M12 | High-Provenance-Confidence Candidate Rate       |
| MD-M13 | Capability Claim Coverage                       |
| MD-M14 | Project Relevance Coverage                      |
| MD-M15 | Workload Relevance Coverage                     |
| MD-M16 | Risk Triage Coverage                            |
| MD-M17 | License Signal Coverage                         |
| MD-M18 | Data/Privacy Signal Coverage                    |
| MD-M19 | Security Signal Coverage                        |
| MD-M20 | Pricing Signal Coverage                         |
| MD-M21 | Region Signal Coverage                          |
| MD-M22 | Watchlist Candidate Count                       |
| MD-M23 | Onboarding Recommendation Count                 |
| MD-M24 | Discovery-to-Onboarding Conversion Rate         |
| MD-M25 | Stale Discovery Metadata Count                  |
| MD-M26 | Conflicting Source Count                        |
| MD-M27 | Critical Unknown Metadata Count                 |
| MD-M28 | Discovery Evidence Completeness                 |
| MD-M29 | Discovery Audit Completeness                    |
| MD-M30 | Discovery-to-Onboarding Reconciliation Coverage |

---

# 150. Metrics Boundary

```text id="mmd111"
MORE
MODELS
DISCOVERED
≠
BETTER
MODEL
MANAGEMENT
```

---

# 151. Failure Classes

Potential:

```text id="mmd112"
MDF01
DISCOVERY
SOURCE
UNKNOWN

MDF02
CANDIDATE
IDENTITY
MISSING

MDF03
PROVIDER
IDENTITY
UNKNOWN

MDF04
MODEL
VERSION
UNKNOWN

MDF05
DUPLICATE
RESOLUTION
FAILED

MDF06
ALIAS
RESOLUTION
FAILED

MDF07
PROVENANCE
EVIDENCE
MISSING

MDF08
PROVENANCE
CONFLICT

MDF09
CAPABILITY
CLAIM
SOURCE
MISSING

MDF10
LICENSE
SIGNAL
UNKNOWN

MDF11
DATA /
PRIVACY
SIGNAL
UNKNOWN

MDF12
SECURITY
RISK
UNKNOWN

MDF13
PROJECT
RELEVANCE
UNKNOWN

MDF14
WORKLOAD
RELEVANCE
UNKNOWN

MDF15
DISCOVERY
METADATA
STALE

MDF16
DISCOVERY
SOURCE
TAMPERING
SUSPECTED

MDF17
DISCOVERY
STATE
DRIFT

MDF18
DISCOVERY /
ONBOARDING /
REGISTRY
TRUTH
CONFLICT
```

---

# 152. Incident Classes

Potential:

```text id="mmd113"
MDI01
DISCOVERED
MODEL
AUTO-
ROUTED
WITHOUT
ONBOARDING

MDI02
PROVIDER
ALIAS
TREATED
AS
IMMUTABLE
MODEL
VERSION

MDI03
SAME
MODEL
REGISTERED
AS
MULTIPLE
CONFLICTING
IDENTITIES

MDI04
THIRD-
PARTY
CAPABILITY
CLAIM
MISREPRESENTED
AS
Mianx.ai
VERIFIED

MDI05
PROVIDER
BENCHMARK
MISREPRESENTED
AS
Mianx.ai
BENCHMARK

MDI06
PROVIDER
SAFETY
CLAIM
MISREPRESENTED
AS
SAFETY
PASS

MDI07
OPEN-
WEIGHT
MODEL
MISREPRESENTED
AS
UNRESTRICTED
LICENSE

MDI08
MODEL
REGION
AVAILABILITY
MISREPRESENTED
AS
DATA
RESIDENCY
AUTHORITY

MDI09
CHEAP
MODEL
AUTO-
RECOMMENDED
FOR
PRODUCTION
WITHOUT
QUALITY /
SAFETY
REVIEW

MDI10
INTERNAL
MODEL
DISCOVERED
AND
AUTO-
TRUSTED

MDI11
FINE-
TUNED
MODEL
DISCOVERED
AND
INHERITS
BASE
MODEL
AUTHORITY

MDI12
UNTRUSTED
SOURCE
TEXT
MODIFIES
DISCOVERY
AUTHORITY

MDI13
STALE
DISCOVERY
METADATA
DRIVES
ONBOARDING
WITHOUT
RECHECK

MDI14
DISCOVERY
CONTROL
STATE
TAMPERING

MDI15
DISCOVERY
EVIDENCE /
AUDIT
TAMPERING
```

---

# 153. Discovery Anti-Patterns

Avoid:

```text id="mmd114"
SIGNAL
=
DISCOVERY

DISCOVERED
=
REGISTERED

DISCOVERED
=
ELIGIBLE

DISCOVERED
=
PRODUCTION
AUTHORIZED

PROVIDER
RELEASED
=
Mianx.ai
SHOULD
ADOPT

PROVIDER
METADATA
=
VERIFIED
TRUTH

PROVIDER
ALIAS
=
IMMUTABLE
VERSION

SAME
MODEL
NAME
=
SAME
BEHAVIOR

OPEN
WEIGHTS
=
UNRESTRICTED
LICENSE

PUBLIC
DOWNLOAD
=
ENTERPRISE
USE
AUTHORIZED

ARTIFACT
DISCOVERED
=
ARTIFACT
TRUSTED

INTERNAL
MODEL
=
TRUSTED

TRAINING
SUCCESS
=
FINE-
TUNED
MODEL
APPROVED

RESEARCH
RECOMMENDATION
=
AUTHORITY

CAPABILITY
CLAIM
=
VERIFIED
CAPABILITY

TOOL
SUPPORT
=
TOOL
AUTHORITY

BENCHMARK
WINNER
=
BEST
MODEL

PROVIDER
SAFETY
CLAIM
=
Mianx.ai
SAFETY
PASS

PROVIDER
COMPLIANCE
CLAIM
=
Mianx.ai
COMPLIANCE
VERIFIED

MODEL
AVAILABLE
IN
REGION
=
DATA
AUTHORIZED
IN
REGION

LOW
MODEL
PRICE
=
LOW
WORKFLOW
COST

POPULAR
MODEL
=
SUITABLE
MODEL

MODEL
CARD
=
INDEPENDENT
VERIFICATION

HIGH
DISCOVERY
SCORE
=
MODEL
APPROVED
```

---

# 154. Provider Alias Anti-Pattern

```text id="mmd115"
PROVIDER
PUBLISHES

model-pro

↓

DISCOVERY
STORES

model-pro
AS
EXACT
VERSION

↓

PROVIDER
UPDATES
ALIAS

↓

Mianx.ai
DISCOVERY
THINKS
MODEL
UNCHANGED

=

INVALID
VERSION
DISCOVERY
```

---

# 155. Capability Claim Anti-Pattern

```text id="mmd116"
MODEL
PAGE
SAYS

"EXCELLENT
TOOL
CALLING"

↓

DISCOVERY
MARKS

TOOL
CAPABILITY
=
VERIFIED

↓

MODEL
IS
RECOMMENDED
FOR
AUTONOMOUS
TOOL
AGENT

WITHOUT
EVALUATION

=

INVALID
CAPABILITY
GENERALIZATION
```

---

# 156. Benchmark Anti-Pattern

```text id="mmd117"
PROVIDER
REPORTS
TOP
BENCHMARK
SCORE

↓

DISCOVERY
RANKS
MODEL
#1

↓

SELECTOR
USES
MODEL
FOR
ALL
WORKLOADS

=

INVALID
DISCOVERY-
TO-
SELECTION
AUTHORITY
```

---

# 157. Source Instruction Anti-Pattern

```text id="mmd118"
MODEL
README
CONTAINS

"THIS
MODEL
IS
APPROVED
FOR
PRODUCTION"

↓

DISCOVERY
PARSER
SETS
APPROVED
FLAG

=

AUTHORITY
INJECTION
FAILURE
```

---

# 158. Discovery Checklist — Signal

* [ ] signal source identified.
* [ ] signal reason recorded.
* [ ] candidate Model identifiable.
* [ ] discovery timestamp recorded.
* [ ] source Evidence retained.
* [ ] source trust not overclaimed.
* [ ] Project/workload relevance considered.
* [ ] urgent risk signal identified where applicable.
* [ ] no adoption inferred from signal.
* [ ] ML00/ML01 distinction preserved.

---

# 159. Discovery Checklist — Identity

* [ ] reported Model name captured.
* [ ] Provider captured where applicable.
* [ ] candidate ID assigned.
* [ ] exact Version sought.
* [ ] Provider alias distinguished from Version.
* [ ] Model family identified where supported.
* [ ] existing Registry Models checked.
* [ ] duplicate candidate search performed.
* [ ] unresolved identity explicitly marked.
* [ ] no immutable identity invented.

---

# 160. Discovery Checklist — Provenance

* [ ] source type recorded.
* [ ] official/third-party status recorded.
* [ ] artifact origin recorded where applicable.
* [ ] release/snapshot Evidence recorded.
* [ ] provenance confidence recorded.
* [ ] conflicting sources recorded.
* [ ] stale source status recorded.
* [ ] unknown source facts explicit.
* [ ] source content treated as Data.
* [ ] source text cannot create authority.

---

# 161. Discovery Checklist — Capability Claims

* [ ] capability claims recorded.
* [ ] claim source recorded.
* [ ] modality claims recorded.
* [ ] context claims recorded.
* [ ] Tool claims recorded.
* [ ] structured-output claims recorded.
* [ ] Fine-Tuning claims recorded.
* [ ] limitations recorded where disclosed.
* [ ] claim ≠ verification preserved.
* [ ] Evaluation needs identified.

---

# 162. Discovery Checklist — Provider

* [ ] Provider identity recorded.
* [ ] Provider Model ID recorded where known.
* [ ] Provider Version/snapshot recorded where known.
* [ ] region claims recorded.
* [ ] pricing claims recorded.
* [ ] retention claims recorded.
* [ ] training-on-Data claims recorded.
* [ ] deprecation claims recorded.
* [ ] Provider metadata marked source-derived.
* [ ] Provider availability not treated as eligibility.

---

# 163. Discovery Checklist — License/Data/Security

* [ ] license signal recorded.
* [ ] open-weight status separated from license rights.
* [ ] Data-processing claims recorded.
* [ ] privacy claims recorded.
* [ ] security risks flagged.
* [ ] supply-chain concerns flagged.
* [ ] unknown critical terms explicit.
* [ ] public availability not treated as enterprise rights.
* [ ] Provider claim not treated as Compliance verification.
* [ ] discovery triage not treated as formal assessment.

---

# 164. Discovery Checklist — Project/Tenant

* [ ] intended Project relevance recorded.
* [ ] Tenant relevance recorded where known.
* [ ] workload relevance recorded.
* [ ] autonomy level considered where known.
* [ ] Tool-use relevance considered.
* [ ] region/Data constraints considered.
* [ ] Project ≠ Tenant preserved.
* [ ] discovery relevance not treated as authority.
* [ ] one Project need not generalized globally.
* [ ] one Tenant need not generalized globally.

---

# 165. Discovery Checklist — Duplicate/Alias

* [ ] exact Provider ID compared.
* [ ] exact Version compared.
* [ ] artifact hash compared where available.
* [ ] Model family compared.
* [ ] aliases compared.
* [ ] alternate Provider mappings checked.
* [ ] duplicate confidence recorded.
* [ ] unresolved duplicate state supported.
* [ ] similarity not treated as identity proof.
* [ ] same name not treated as same behavior.

---

# 166. Discovery Checklist — Freshness

* [ ] source observation time recorded.
* [ ] Model release time recorded where known.
* [ ] metadata freshness state recorded.
* [ ] stale Provider pricing detected where possible.
* [ ] stale license metadata detected where possible.
* [ ] stale deprecation metadata detected where possible.
* [ ] conflicting current/old sources distinguished.
* [ ] cached metadata not treated as current authority.
* [ ] change-detection triggers defined.
* [ ] re-check before formal Onboarding where needed.

---

# 167. Discovery Checklist — Automation

* [ ] crawler output treated as candidate Evidence.
* [ ] AI summaries marked generated.
* [ ] automated classification marked recommendation.
* [ ] source authority injection prevented.
* [ ] automated discovery cannot create Registry approval.
* [ ] automated discovery cannot create Routing authority.
* [ ] automated discovery cannot create Production authorization.
* [ ] duplicate automation can return unresolved.
* [ ] critical unknowns do not default allow.
* [ ] automation actions audited.

---

# 168. Discovery Checklist — Handoff

* [ ] discovery record complete enough for review.
* [ ] candidate identity stable enough for intake.
* [ ] source Evidence linked.
* [ ] provenance confidence recorded.
* [ ] capability claims linked.
* [ ] risk flags linked.
* [ ] relevance recorded.
* [ ] onboarding recommendation recorded.
* [ ] ML01 state explicit.
* [ ] Onboarding approval remains separate.

---

# 169. Verification Strategy

Future implementation should verify:

```text id="mmd119"
SIGNALS

SOURCES

CANDIDATES

IDENTITY

VERSION

ALIASES

MODEL
FAMILIES

DUPLICATES

ARTIFACTS

PROVENANCE

CAPABILITY
CLAIMS

PROVIDER
CLAIMS

LICENSE
SIGNALS

DATA
SIGNALS

SECURITY
SIGNALS

PROJECT /
TENANT
RELEVANCE

FRESHNESS

CONFLICTS

AUTOMATION

WATCHLIST

ONBOARDING
HANDOFF

AUDIT
```

---

# 170. Positive Verification Scenarios

Future implementation should verify at least:

```text id="mmd120"
MDIV-01
EVERY
DISCOVERY
RECORD
HAS
STABLE
DISCOVERY
IDENTITY

MDIV-02
CANDIDATE
IDENTITY
IS
DISTINCT
FROM
REGISTRY
MODEL
IDENTITY

MDIV-03
PROVIDER
ALIAS
IS
DISTINGUISHED
FROM
EXACT
MODEL
VERSION

MDIV-04
UNKNOWN
PROVIDER
SNAPSHOT
REMAINS
UNKNOWN
RATHER
THAN
INVENTED

MDIV-05
DUPLICATE
CHECK
CAN
MATCH
EXISTING
MODEL
WITHOUT
CREATING
NEW
IDENTITY

MDIV-06
HIGH
SIMILARITY
DOES
NOT
AUTO-
CREATE
DUPLICATE
CERTAINTY

MDIV-07
PROVIDER
CAPABILITY
CLAIMS
REMAIN
DISTINCT
FROM
VERIFIED
CAPABILITIES

MDIV-08
PROVIDER
BENCHMARKS
REMAIN
DISTINCT
FROM
Mianx.ai
BENCHMARKS

MDIV-09
PROVIDER
SAFETY
CLAIMS
REMAIN
DISTINCT
FROM
Mianx.ai
SAFETY
EVALUATION

MDIV-10
OPEN-
WEIGHT
DISCOVERY
DOES
NOT
AUTO-
CREATE
LICENSE
ELIGIBILITY

MDIV-11
REGION
AVAILABILITY
DOES
NOT
AUTO-
CREATE
DATA
RESIDENCY
AUTHORITY

MDIV-12
LOW
PRICE
DOES
NOT
AUTO-
CREATE
MODEL
SELECTION
AUTHORITY

MDIV-13
INTERNAL
MODEL
DISCOVERY
DOES
NOT
AUTO-
CREATE
TRUST

MDIV-14
FINE-
TUNED
MODEL
DISCOVERY
DOES
NOT
INHERIT
BASE
MODEL
AUTHORITY

MDIV-15
RESEARCH
RECOMMENDATION
DOES
NOT
AUTO-
CREATE
ONBOARDING
AUTHORITY

MDIV-16
DISCOVERY
RANKING
DOES
NOT
AUTO-
CREATE
ROUTING
AUTHORITY

MDIV-17
STALE
METADATA
IS
DISTINGUISHED
FROM
CURRENT
METADATA

MDIV-18
CONFLICTING
SOURCE
CLAIMS
ARE
PRESERVED
AS
CONFLICT
UNTIL
RESOLVED

MDIV-19
CRITICAL
UNKNOWN
FIELDS
DO
NOT
DEFAULT
TO
ALLOW

MDIV-20
UNTRUSTED
SOURCE
TEXT
CANNOT
CREATE
APPROVAL
STATE

MDIV-21
DISCOVERY
RECORD
CAN
BE
HANDED
TO
ONBOARDING
WITHOUT
CREATING
MODEL
ELIGIBILITY

MDIV-22
DISCOVERY
STATE
CAN
BE
RECONCILED
WITH
ONBOARDING /
REGISTRY
STATE

MDIV-23
FOUNDER
DISCOVERY
REQUEST
DOES
NOT
AUTO-
CREATE
FOUNDER
PRODUCTION
APPROVAL

MDIV-24
CONTROLLED
DISCOVERY
PILOT
DOES
NOT
AUTO-
CREATE
PRODUCTION
AUTHORIZATION

MDIV-25
DISCOVERY
DOCUMENTATION
DOES
NOT
AUTO-
PROVE
DISCOVERY
RUNTIME
EXISTS
```

---

# 171. Extended Negative Verification Scenarios

Future implementation should test at least:

```text id="mmd121"
MDIVS-01
PROVIDER
ANNOUNCES
MODEL
AND
SYSTEM
AUTO-
ROUTES
TO
MODEL

MDIVS-02
PROVIDER
"latest"
ALIAS
IS
STORED
AS
IMMUTABLE
VERSION

MDIVS-03
SAME
MARKETING
MODEL
NAME
ACROSS
PROVIDERS
IS
TREATED
AS
IDENTICAL
MODEL
BEHAVIOR

MDIVS-04
OPEN-
WEIGHT
MODEL
IS
DISCOVERED
AND
SYSTEM
MARKS
COMMERCIAL
USE
AUTHORIZED

MDIVS-05
MODEL
CARD
CLAIMS
HIGH
QUALITY
AND
SYSTEM
MARKS
QUALITY
VERIFIED

MDIVS-06
PROVIDER
BENCHMARK
IS
DISPLAYED
AS
Mianx.ai
BENCHMARK
RESULT

MDIVS-07
PROVIDER
SAFETY
CLAIM
IS
DISPLAYED
AS
Mianx.ai
SAFETY
PASS

MDIVS-08
PROVIDER
COMPLIANCE
CLAIM
IS
DISPLAYED
AS
PROJECT
COMPLIANCE
VERIFIED

MDIVS-09
PROVIDER
REGION
AVAILABILITY
IS
TREATED
AS
TENANT
DATA
RESIDENCY
AUTHORITY

MDIVS-10
CHEAP
MODEL
IS
AUTO-
SELECTED
FOR
ALL
PROJECTS

MDIVS-11
POPULAR
MODEL
IS
AUTO-
RANKED
AS
SAFE /
TRUSTED

MDIVS-12
INTERNAL
MODEL
ARTIFACT
IS
DISCOVERED
AND
BYPASSES
ONBOARDING

MDIVS-13
FINE-
TUNED
MODEL
DISCOVERY
COPIES
BASE
MODEL
ELIGIBILITY

MDIVS-14
MODEL
README
SAYS
"PRODUCTION
READY"
AND
DISCOVERY
SETS
PRODUCTION
FLAG

MDIVS-15
STALE
PRICE /
LICENSE /
DATA
METADATA
IS
USED
WITHOUT
FRESHNESS
RECHECK

MDIVS-16
CONFLICTING
SOURCES
EXIST
AND
SYSTEM
SILENTLY
SELECTS
MORE
FAVORABLE
CLAIM

MDIVS-17
MODEL
VERSION
IS
UNKNOWN
AND
SYSTEM
INVENTS
A
VERSION
FOR
REGISTRY

MDIVS-18
DISCOVERY
SCORE
HIGH
AND
SYSTEM
AUTO-
OPENS
PRODUCTION
DEPLOYMENT

MDIVS-19
PROJECT A
CAPABILITY
NEED
IS
USED
TO
GENERALIZE
MODEL
RELEVANCE
TO
EVERY
PROJECT

MDIVS-20
TENANT-A
NEED
IS
USED
TO
CREATE
TENANT-B
MODEL
RECOMMENDATION
WITHOUT
SEPARATE
CONTEXT

MDIVS-21
DISCOVERED
REPLACEMENT
IS
AUTO-
MIGRATED
INTO
ACTIVE
ROUTING

MDIVS-22
DISCOVERY
DASHBOARD
GREEN
IS
MISREPRESENTED
AS
MODEL
GOVERNANCE
VERIFICATION

MDIVS-23
FOUNDER
RECEIVES
MODEL
DISCOVERY
REPORT
AND
SYSTEM
MARKS
FOUNDER
APPROVED

MDIVS-24
CONTROLLED
DISCOVERY
PILOT
IS
MISREPRESENTED
AS
PRODUCTION
MODEL
DISCOVERY
AUTHORIZATION

MDIVS-25
TARGET
MODEL
DISCOVERY
FRAMEWORK
IS
MISREPRESENTED
AS
CURRENT
RUNTIME
CAPABILITY
```

---

# 172. Model Discovery Maturity Model

Supplemental conceptual maturity:

```text id="mmd122"
MDM0
=
MODEL
DISCOVERY
FRAMEWORK
DOCUMENTED

MDM1
=
DISCOVERY /
CANDIDATE /
OBSERVATION
IDENTITIES
DEFINED

MDM2
=
SOURCE /
VERSION /
ALIAS /
PROVENANCE /
DUPLICATE /
CLAIM
CONTRACTS
DEFINED

MDM3
=
BASIC
MODEL
DISCOVERY
RECORD
SYSTEM
IMPLEMENTED

MDM4
=
PROVIDER /
RESEARCH /
INTERNAL /
FINE-
TUNING
DISCOVERY
INTEGRATED

MDM5
=
PROJECT /
TENANT /
CAPABILITY /
RISK /
COST /
LICENSE /
DATA
TRIAGE
INTEGRATED

MDM6
=
AUTOMATED
CHANGE
DETECTION /
FRESHNESS /
CONFLICT /
DUPLICATE /
ONBOARDING
HANDOFF
INTEGRATED

MDM7
=
POSITIVE /
NEGATIVE /
SOURCE /
IDENTITY /
ALIAS /
PROJECT /
AUTOMATION
VERIFICATION
COMPLETE
FOR
DEFINED
SCOPE

MDM8
=
CONTROLLED
ENTERPRISE
MODEL
DISCOVERY
PILOT
VERIFIED

MDM9
=
PRODUCTION-SCOPE
MODEL
DISCOVERY
CONTROL
PLANE
SEPARATELY
AUTHORIZED /
VERIFIED
```

---

# 173. Maturity Alignment

```text id="mmd123"
MDM
=
MODEL
DISCOVERY
VIEW

MRM
=
MODEL
RETIREMENT
VIEW

MOM
=
MODEL
ONBOARDING
VIEW

MLCM
=
MODEL
LIFECYCLE
VIEW

MGM
=
MODEL
GOVERNANCE
VIEW

MMM
=
OVERALL
MODEL
MANAGEMENT
MATURITY
```

---

# 174. Maturity Boundary

Permanent:

```text id="mmd124"
MDM8
≠
MDM9

MRM8
≠
MRM9

MOM8
≠
MOM9

MLCM8
≠
MLCM9

MGM8
≠
MGM9

MMM8
≠
MMM9
```

---

# 175. Controlled Model Discovery Pilot

A future controlled Pilot may validate:

```text id="mmd125"
LIMITED
PROVIDERS

LIMITED
MODEL
SOURCES

ONE
INTERNAL
MODEL
SOURCE

ONE
RESEARCH
SOURCE

ONE
PROJECT
CAPABILITY
GAP

CANDIDATE
IDENTITY

DUPLICATE
RESOLUTION

VERSION
RESOLUTION

PROVENANCE

CAPABILITY
CLAIMS

WATCHLIST

ONBOARDING
HANDOFF

AUDIT
```

---

# 176. Pilot Entry Criteria

* [ ] discovery record schema defined.
* [ ] candidate identity defined.
* [ ] source Evidence model defined.
* [ ] Provider alias handling defined.
* [ ] Version handling defined.
* [ ] duplicate resolution defined.
* [ ] provenance confidence defined.
* [ ] capability-claim handling defined.
* [ ] freshness handling defined.
* [ ] source authority-injection controls defined.
* [ ] onboarding handoff defined.
* [ ] Pilot authority exists.

---

# 177. Pilot Exit Criteria

* [ ] Provider Model discovery tested.
* [ ] open-weight Model discovery tested.
* [ ] internal Model discovery tested.
* [ ] Research-origin discovery tested.
* [ ] alias/version distinction tested.
* [ ] duplicate candidate resolution tested.
* [ ] unresolved identity handling tested.
* [ ] capability claim boundary tested.
* [ ] Provider benchmark boundary tested.
* [ ] Safety claim boundary tested.
* [ ] license signal handling tested.
* [ ] stale metadata handling tested.
* [ ] conflicting-source handling tested.
* [ ] Project relevance handling tested.
* [ ] source authority-injection defense tested.
* [ ] Onboarding handoff tested.
* [ ] Pilot not represented as Production authorization.

---

# 178. Pilot Boundary

Permanent:

```text id="mmd126"
CONTROLLED
MODEL
DISCOVERY
PILOT
VERIFIED
≠
PRODUCTION
MODEL
DISCOVERY
CONTROL
PLANE
AUTHORIZED /
VERIFIED
```

---

# 179. Production-Scope Discovery Readiness

Before Production-scope discovery control readiness can be claimed, applicable Evidence should cover:

```text id="mmd127"
SIGNAL
INGESTION

DISCOVERY
IDENTITY

CANDIDATE
IDENTITY

SOURCE
EVIDENCE

PROVIDER
IDENTITY

MODEL
FAMILY

MODEL
VERSION

ALIASES

ARTIFACTS

DUPLICATE
RESOLUTION

PROVENANCE

CAPABILITY
CLAIMS

BENCHMARK
CLAIMS

SAFETY
CLAIMS

COMPLIANCE
CLAIMS

LICENSE
SIGNALS

DATA
SIGNALS

PRIVACY
SIGNALS

SECURITY
SIGNALS

REGION
SIGNALS

COST
SIGNALS

PROJECT
RELEVANCE

TENANT
RELEVANCE

WORKLOAD
RELEVANCE

FRESHNESS

CONFLICT
HANDLING

UNKNOWN
HANDLING

AUTOMATED
DISCOVERY

AUTHORITY
INJECTION
DEFENSE

WATCHLIST

ONBOARDING
HANDOFF

AUDIT
```

---

# 180. Production Boundary

Permanent:

```text id="mmd128"
MODEL
DISCOVERY
CONTROL
PLANE
VERIFIED
≠
ANY
DISCOVERED
MODEL
PRODUCTION
AUTHORIZED

AND

DISCOVERY
OF
A
MODEL
FOR
ONE
PROJECT /
TENANT /
WORKLOAD
≠
ELIGIBILITY
FOR
ALL
SCOPES
```

---

# 181. Model Discovery Runtime Truth

This document does not prove Model Discovery runtime exists.

```text id="mmd129"
MODEL
DISCOVERY
SERVICE
=
NOT_PROVEN

MODEL
DISCOVERY
RECORD
REGISTRY
=
NOT_PROVEN

MODEL
CANDIDATE
REGISTRY
=
NOT_PROVEN

MODEL
OBSERVATION
REGISTRY
=
NOT_PROVEN

PROVIDER
MODEL
WATCHER
=
NOT_PROVEN

PROVIDER
RELEASE
WATCHER
=
NOT_PROVEN

OPEN-
WEIGHT
MODEL
DISCOVERY
=
NOT_PROVEN

INTERNAL
MODEL
DISCOVERY
=
NOT_PROVEN

FINE-
TUNED
MODEL
DISCOVERY
=
NOT_PROVEN

RESEARCH
LAB
MODEL
DISCOVERY
INTEGRATION
=
NOT_PROVEN

PROJECT
CAPABILITY-
GAP
DISCOVERY
=
NOT_PROVEN

AGENT
CAPABILITY-
GAP
DISCOVERY
=
NOT_PROVEN

MODEL
REPLACEMENT
DISCOVERY
=
NOT_PROVEN

MODEL
FALLBACK
DISCOVERY
=
NOT_PROVEN

PROVIDER
ALIAS
RESOLUTION
=
NOT_PROVEN

MODEL
VERSION
RESOLUTION
=
NOT_PROVEN

MODEL
FAMILY
RESOLUTION
=
NOT_PROVEN

MODEL
DUPLICATE
RESOLUTION
=
NOT_PROVEN

MODEL
ARTIFACT
DISCOVERY
=
NOT_PROVEN

MODEL
PROVENANCE
CONFIDENCE
ENGINE
=
NOT_PROVEN

MODEL
SOURCE
EVIDENCE
SYSTEM
=
NOT_PROVEN

MODEL
CAPABILITY
CLAIM
EXTRACTION
=
NOT_PROVEN

MODEL
BENCHMARK
CLAIM
EXTRACTION
=
NOT_PROVEN

MODEL
SAFETY
CLAIM
EXTRACTION
=
NOT_PROVEN

MODEL
COMPLIANCE
CLAIM
EXTRACTION
=
NOT_PROVEN

MODEL
LICENSE
SIGNAL
EXTRACTION
=
NOT_PROVEN

MODEL
DATA /
PRIVACY
SIGNAL
EXTRACTION
=
NOT_PROVEN

MODEL
SECURITY
SIGNAL
EXTRACTION
=
NOT_PROVEN

MODEL
REGION
SIGNAL
EXTRACTION
=
NOT_PROVEN

MODEL
PRICING
SIGNAL
EXTRACTION
=
NOT_PROVEN

MODEL
PROJECT
RELEVANCE
ENGINE
=
NOT_PROVEN

MODEL
TENANT
RELEVANCE
ENGINE
=
NOT_PROVEN

MODEL
WORKLOAD
RELEVANCE
ENGINE
=
NOT_PROVEN

MODEL
DISCOVERY
SCORING
=
NOT_PROVEN

MODEL
DISCOVERY
WATCHLIST
=
NOT_PROVEN

MODEL
DISCOVERY
METADATA
FRESHNESS
CONTROL
=
NOT_PROVEN

MODEL
DISCOVERY
CHANGE
DETECTION
=
NOT_PROVEN

MODEL
DISCOVERY
CONFLICT
DETECTION
=
NOT_PROVEN

MODEL
DISCOVERY
UNKNOWN-
STATE
CONTROL
=
NOT_PROVEN

DISCOVERY
SOURCE
AUTHORITY-
INJECTION
DEFENSE
=
NOT_PROVEN

DISCOVERY
TO
ONBOARDING
HANDOFF
=
NOT_PROVEN

DISCOVERY /
ONBOARDING /
REGISTRY
RECONCILIATION
=
NOT_PROVEN

MODEL
DISCOVERY
AUDIT
=
NOT_PROVEN

CONTROLLED
MODEL
DISCOVERY
PILOT
=
NOT_PROVEN

PRODUCTION
MODEL
DISCOVERY
CONTROL
PLANE
READINESS
=
NOT_AUTHORIZED_OR_VERIFIED_BY_THIS_DOCUMENT
```

---

# 182. Documentation Truth

This document is generated for:

```text id="mmd130"
doc/27-model-management/model-registry/model-discovery.md
```

Permanent:

```text id="mmd131"
DOCUMENT
GENERATED
IN
CHAT
≠
FILESYSTEM
SAVE
VERIFIED
```

---

# 183. Model Registry Folder Truth

The screenshot-established repository structure is:

```text id="mmd132"
doc/27-model-management/model-registry/
├── model-discovery.md
├── model-metadata.md
└── model-registry.md
```

---

# 184. Model Registry Workflow State

After this document:

```text id="mmd133"
model-discovery.md
=
CONTENT_COMPLETE_FOR_REVIEW

model-metadata.md
=
NEXT

model-registry.md
=
PENDING
```

Therefore:

```text id="mmd134"
1 / 3
MODEL
REGISTRY
SPECIALIZED
DOCUMENTS

=
CONTENT_COMPLETE_FOR_REVIEW
IN
CURRENT
CHAT
WORKFLOW
```

---

# 185. Folder Completion Boundary

Permanent:

```text id="mmd135"
1 / 3
MODEL
REGISTRY
DOCUMENTS
CONTENT_COMPLETE_FOR_REVIEW
≠
1 / 3
FILESYSTEM
SAVE
VERIFIED

AND

MODEL
DISCOVERY
DOCUMENTED
≠
MODEL
DISCOVERY
IMPLEMENTED
```

---

# 186. Specialized Progress Truth

Current chat workflow:

```text id="mmd136"
architecture/
=
4 / 4
CONTENT_COMPLETE_FOR_REVIEW

backup-recovery/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

benchmarking/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

compliance/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

cost-management/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

evaluation/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

fine-tuning/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

governance/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

inference/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

integrations/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

model-catalog/
=
4 / 4
CONTENT_COMPLETE_FOR_REVIEW

model-deployment/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

model-lifecycle/
=
3 / 3
CONTENT_COMPLETE_FOR_REVIEW

model-registry/
=
1 / 3
CONTENT_COMPLETE_FOR_REVIEW
```

---

# 187. Approval Truth

```text id="mmd137"
DOCUMENT
STATUS
=
DRAFT

CONTENT
STATUS
=
CONTENT_COMPLETE_FOR_REVIEW

APPROVED
=
NO

FOUNDER
APPROVED
=
NO
EVIDENCE

CANONICAL
=
NO

FILESYSTEM
SAVE
=
NOT_VERIFIED

MODEL
DISCOVERY
SERVICE
IMPLEMENTED
=
NOT_PROVEN

PROVIDER
MODEL
WATCHER
IMPLEMENTED
=
NOT_PROVEN

MODEL
VERSION /
ALIAS
RESOLUTION
VERIFIED
=
NOT_PROVEN

MODEL
DUPLICATE
RESOLUTION
VERIFIED
=
NOT_PROVEN

MODEL
PROVENANCE
VERIFICATION
=
NOT_PROVEN

CAPABILITY
CLAIM
HANDLING
VERIFIED
=
NOT_PROVEN

PROJECT /
TENANT /
WORKLOAD
RELEVANCE
VERIFIED
=
NOT_PROVEN

DISCOVERY
METADATA
FRESHNESS
VERIFIED
=
NOT_PROVEN

SOURCE
AUTHORITY-
INJECTION
DEFENSE
VERIFIED
=
NOT_PROVEN

DISCOVERY
TO
ONBOARDING
HANDOFF
VERIFIED
=
NOT_PROVEN

CONTROLLED
MODEL
DISCOVERY
PILOT
=
NOT_PROVEN

PRODUCTION
MODEL
DISCOVERY
CONTROL
PLANE
READINESS
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 188. Permanent Model Discovery Invariants

```text id="mmd138"
SIGNAL
≠
DISCOVERED
MODEL
AUTOMATICALLY

DISCOVERED
≠
REGISTERED

DISCOVERED
≠
ELIGIBLE

DISCOVERED
≠
PRODUCTION
AUTHORIZED

DISCOVERY
=
INTELLIGENCE
INPUT
NOT
AUTHORITY

SOURCE
KNOWN
≠
SOURCE
TRUSTED
FOR
EVERY
CLAIM

EXTERNAL
CONTENT
=
DATA
NOT
AUTHORITY

CANDIDATE
ID
≠
MODEL
ID

DISCOVERY
OBSERVATION
≠
MODEL
VERSION

ONBOARDING
RECOMMENDED
≠
ONBOARDING
APPROVED

PROVIDER
ANNOUNCES
MODEL
≠
Mianx.ai
SHOULD
ADOPT

PROVIDER
METADATA
≠
Mianx.ai
VERIFIED
TRUTH

PROVIDER
ALIAS
≠
IMMUTABLE
MODEL
VERSION

ALIAS
UNCHANGED
≠
UNDERLYING
MODEL
UNCHANGED

PROVIDER
VERSION
OPAQUE
≠
Mianx.ai
KNOWS
EXACT
VERSION

SAME
MODEL
FAMILY
≠
SAME
MODEL
BEHAVIOR

SAME
MODEL
NAME
ACROSS
PROVIDERS
≠
MODEL
EQUIVALENCE

OPEN
WEIGHTS
≠
UNRESTRICTED
LICENSE

PUBLIC
DOWNLOAD
≠
ENTERPRISE
USE
AUTHORIZED

ARTIFACT
DISCOVERED
≠
ARTIFACT
INTEGRITY
VERIFIED

ARTIFACT
INTEGRITY
VERIFIED
≠
MODEL
QUALITY /
SAFETY
VERIFIED

Mianx.ai
INTERNAL
MODEL
≠
TRUSTED
MODEL

TRAINING
RUN
SUCCESS
≠
FINE-
TUNED
MODEL
APPROVED

BASE
MODEL
AUTHORITY
≠
DERIVATIVE
MODEL
AUTHORITY

RESEARCH
RECOMMENDATION
≠
MODEL
AUTHORITY

PROMISING
RESEARCH
RESULT
≠
ONBOARDING
APPROVAL

PROJECT
NEEDS
CAPABILITY
≠
ANY
MODEL
CLAIMING
CAPABILITY
IS
ELIGIBLE

TENANT-A
NEED
≠
TENANT-B
AUTHORITY

AGENT
PERFORMANCE
PROBLEM
≠
MODEL
ROOT
CAUSE
AUTOMATICALLY

REPLACEMENT
DISCOVERED
≠
REPLACEMENT
ELIGIBLE

FALLBACK
DISCOVERED
≠
FALLBACK
AUTHORIZED

CAPABILITY
ADVERTISED
≠
CAPABILITY
VERIFIED

TOOL
SUPPORT
≠
TOOL
AUTHORITY

FINE-
TUNING
SUPPORT
≠
DATASET /
FINE-
TUNING
AUTHORITY

ADVERTISED
CONTEXT
≠
SAFE
USABLE
CONTEXT

PROVIDER
BENCHMARK
≠
Mianx.ai
BENCHMARK

BENCHMARK
WINNER
≠
BEST
MODEL
FOR
EVERY
WORKLOAD

PROVIDER
SAFETY
CLAIM
≠
Mianx.ai
SAFETY
PASS

PROVIDER
COMPLIANCE
CLAIM
≠
Mianx.ai
COMPLIANCE
VERIFICATION

PROVIDER
"NO
TRAINING"
CLAIM
≠
ALL
PRIVACY
QUESTIONS
RESOLVED

MODEL
AVAILABLE
IN
REGION
≠
DATA
AUTHORIZED
IN
REGION

LOW
MODEL
PRICE
≠
LOW
WORKFLOW
COST

CHEAPER
CANDIDATE
≠
BETTER
ENTERPRISE
MODEL

POPULAR
MODEL
≠
SUITABLE
MODEL

MODEL
CARD
≠
INDEPENDENT
VERIFICATION

MODEL
CARD
INSTRUCTIONS
≠
Mianx.ai
AUTHORITY

SOURCE
SAYS
"APPROVED"
≠
REAL
APPROVAL

HIGH
SIMILARITY
≠
IDENTICAL
MODEL
PROVEN

UNRESOLVED
IDENTITY
≠
ASSUME
SAME /
ASSUME
NEW

HIGH
PROVENANCE
CONFIDENCE
≠
HIGH
MODEL
QUALITY

SOURCE
PAGE
RECENT
UPDATE
≠
MODEL
METADATA
CURRENT

CACHED
DISCOVERY
METADATA
≠
CURRENT
PROVIDER
TRUTH

MODEL
NAME
UNCHANGED
≠
DISCOVERY
FACTS
UNCHANGED

CONFLICTING
METADATA
≠
DEFAULT
ALLOW

CRITICAL
UNKNOWN
≠
ASSUME
SAFE

DISCOVERY
RISK
TRIAGE
≠
FORMAL
SECURITY /
COMPLIANCE
ASSESSMENT

LICENSE
FILE
PRESENT
≠
LICENSE
COMPATIBLE

DOWNLOAD
SUCCESS
≠
ARTIFACT
TRUST

HIGH
PROJECT
RELEVANCE
≠
PROJECT
MODEL
ELIGIBILITY

MODEL
RELEVANT
TO
ONE
WORKLOAD
≠
RELEVANT
TO
ALL

DISCOVERY
PROJECT
TAG
≠
PROJECT
AUTHORITY

CAPABILITY
MATCH
≠
MODEL
SELECTION
DECISION

DISCOVERY
RANKING
≠
MODEL
SELECTION
AUTHORITY

PROVIDER
API
ADDRESSABLE
≠
ROUTER
AUTHORIZED

DISCOVERY
RECORD
≠
CATALOG
APPROVAL

CATALOG
ENTRY
≠
MODEL
AUTHORITY

DISCOVERY
CANDIDATE
NAME
≠
REGISTRY
MODEL
IDENTITY

DISCOVERY
METADATA
≠
CANONICAL
MODEL
METADATA

ONBOARDING
RECOMMENDED
≠
ONBOARDING
APPROVED

WATCHLIST
≠
MODEL
ELIGIBILITY

NOT
PURSUED
NOW
≠
PERMANENT
BAN

AUTOMATED
DISCOVERY
≠
AUTOMATED
ADOPTION

CRAWLER
FOUND
MODEL
≠
SOURCE /
LICENSE /
IDENTITY
VERIFIED

AI
CLASSIFICATION
≠
FINAL
AUTHORITY

AI
SUMMARY
≠
SOURCE
EVIDENCE

HIGH
DISCOVERY
SCORE
≠
MODEL
QUALITY /
ELIGIBILITY /
AUTHORITY

HUMAN
RECOMMENDATION
≠
MODEL
APPROVAL

FOUNDER
DISCOVERY
REQUEST
≠
FOUNDER
PRODUCTION
APPROVAL

CURRENT
MODEL
UNSAFE
≠
FIRST
ALTERNATIVE
SAFE

PROVIDER
DEPRECATION
URGENT
≠
GOVERNANCE
MAY
BE
IGNORED

DISCOVERY
AUDIT
RECORD
≠
DISCOVERY
CLAIM
TRUE

MORE
MODELS
DISCOVERED
≠
BETTER
MODEL
MANAGEMENT

MDM8
≠
MDM9

MLCM8
≠
MLCM9

MGM8
≠
MGM9

MMM8
≠
MMM9

CONTROLLED
DISCOVERY
PILOT
≠
PRODUCTION
AUTHORIZATION

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

FOUNDER
NOTIFICATION
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

DOCUMENT
GENERATED
IN
CHAT
≠
FILESYSTEM
SAVE
VERIFIED

FILESYSTEM
SAVE
≠
GIT
COMMIT

GIT
COMMIT
≠
REMOTE
PUSH

REMOTE
PUSH
≠
DEPLOYMENT

DOCUMENTED
≠
IMPLEMENTED

IMPLEMENTED
≠
TESTED /
VERIFIED

VERIFIED
≠
PRODUCTION
AUTHORIZED
```

---

# 189. Final Model Discovery Architecture

The target Mianx.ai Model Discovery architecture is:

```text id="mmd139"
ENTERPRISE
SIGNALS

├── Provider releases
├── Research
├── internal Models
├── Fine-Tuning
├── Project needs
├── Agent gaps
├── cost opportunities
├── security needs
└── deprecations

↓

DISCOVERY
INGESTION

↓

SOURCE
EVIDENCE
CAPTURE

↓

CANDIDATE
IDENTITY

↓

MODEL
NAME /
FAMILY /
VERSION /
PROVIDER /
ARTIFACT
RESOLUTION

↓

DUPLICATE /
ALIAS
RESOLUTION

↓

PROVENANCE
CONFIDENCE

↓

CLAIM
EXTRACTION

├── capabilities
├── benchmarks
├── Safety
├── pricing
├── regions
├── license
└── Data terms

↓

RISK /
PROJECT /
TENANT /
WORKLOAD
TRIAGE

↓

FRESHNESS /
CONFLICT /
UNKNOWN
CONTROL

↓

DISCOVERY
REVIEW

↓

ONBOARD
NOW

OR

WATCHLIST

OR

DEFER

OR

NOT
PURSUE

↓

ML01
DISCOVERED

↓

SEPARATE
MODEL
ONBOARDING

↓

REGISTRY /
METADATA /
CATALOG /
EVALUATION

↓

FUTURE
SEPARATE
ELIGIBILITY /
DEPLOYMENT /
PRODUCTION
AUTHORITY
```

---

# 190. Final Model Discovery Rule

Mianx.ai should discover Models aggressively but trust and authorize them conservatively.

```text id="mmd140"
MONITOR
THE
MODEL
ECOSYSTEM

MONITOR
PROVIDERS

MONITOR
INTERNAL
MODEL
OUTPUTS

MONITOR
FINE-
TUNING
OUTPUTS

MONITOR
RESEARCH

MONITOR
PROJECT
NEEDS

MONITOR
AGENT
CAPABILITY
GAPS

MONITOR
COST /
LATENCY /
SECURITY
PRESSURE

CAPTURE
THE
SOURCE

TREAT
SOURCE
CONTENT
AS
DATA

CREATE
A
CANDIDATE

RESOLVE
THE
MODEL
NAME

RESOLVE
THE
PROVIDER

RESOLVE
THE
MODEL
FAMILY

RESOLVE
THE
EXACT
VERSION
WHERE
POSSIBLE

DO
NOT
INVENT
UNKNOWN
VERSIONS

RESOLVE
ARTIFACTS
WHERE
APPLICABLE

CHECK
FOR
DUPLICATES

CHECK
FOR
ALIASES

RECORD
PROVENANCE

RECORD
PROVENANCE
CONFIDENCE

CAPTURE
CAPABILITY
CLAIMS

DO
NOT
CALL
CLAIMS
VERIFIED

CAPTURE
BENCHMARK
CLAIMS

DO
NOT
CALL
PROVIDER
BENCHMARKS
Mianx.ai
BENCHMARKS

CAPTURE
SAFETY
CLAIMS

DO
NOT
CALL
PROVIDER
SAFETY
CLAIMS
SAFETY
APPROVAL

CAPTURE
LICENSE
SIGNALS

DO
NOT
EQUATE
OPEN
WEIGHTS
WITH
UNRESTRICTED
RIGHTS

CAPTURE
DATA /
PRIVACY
SIGNALS

CAPTURE
REGION
SIGNALS

DO
NOT
EQUATE
REGION
AVAILABILITY
WITH
DATA
AUTHORITY

CAPTURE
PRICING

DO
NOT
EQUATE
LOW
PRICE
WITH
LOW
TOTAL
COST

IDENTIFY
PROJECT
RELEVANCE

IDENTIFY
TENANT
RELEVANCE

IDENTIFY
WORKLOAD
RELEVANCE

FLAG
RISK

MARK
UNKNOWN
AS
UNKNOWN

MARK
CONFLICT
AS
CONFLICT

TRACK
FRESHNESS

DO
NOT
ALLOW
UNTRUSTED
SOURCE
TEXT
TO
CREATE
AUTHORITY

RECOMMEND
ONBOARDING
WHEN
JUSTIFIED

DO
NOT
AUTO-
ONBOARD
BECAUSE
DISCOVERY
SCORE
IS
HIGH

HAND
OFF
TO
MODEL
ONBOARDING

AND
ALWAYS

SIGNAL
≠
DISCOVERY

DISCOVERY
≠
REGISTRATION

REGISTRATION
≠
ELIGIBILITY

ELIGIBILITY
≠
SELECTION

SELECTION
≠
ROUTING

ROUTING
≠
EVERY
REQUEST
AUTHORIZED

PROVIDER
CLAIM
≠
Mianx.ai
VERIFICATION

MODEL
NAME
≠
MODEL
IDENTITY

MODEL
ALIAS
≠
MODEL
VERSION

SAME
NAME
≠
SAME
BEHAVIOR

MODEL
CARD
≠
INDEPENDENT
EVIDENCE

OPEN
WEIGHTS
≠
UNRESTRICTED
LICENSE

PUBLIC
AVAILABILITY
≠
ENTERPRISE
RIGHTS

TOOL
SUPPORT
≠
TOOL
AUTHORITY

FINE-
TUNING
SUPPORT
≠
FINE-
TUNING
AUTHORITY

RESEARCH
RECOMMENDATION
≠
AUTHORITY

POPULAR
≠
SUITABLE

CHEAP
≠
SAFE

FAST
≠
BEST

DISCOVERY
RANK
≠
MODEL
SELECTION
AUTHORITY

DISCOVERY
RECOMMENDATION
≠
ONBOARDING
APPROVAL

CONTROLLED
PILOT
≠
PRODUCTION
AUTHORIZATION

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

FOUNDER
NOTIFICATION
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

DOCUMENTED
≠
IMPLEMENTED

IMPLEMENTED
≠
VERIFIED

VERIFIED
≠
PRODUCTION
AUTHORIZED

DOCUMENT
GENERATED
IN
CHAT
≠
FILESYSTEM
SAVE
VERIFIED
```

---

# 191. Changelog Entry

Append during a future `doc/27-model-management/CHANGELOG.md` synchronization after this specialized documentation change is reviewed:

```markdown id="mmd141"
## MODEL-MANAGEMENT-CHG-20260815-153 — Model Management Model Discovery Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-15 |
| Change Type | `CREATED`, `MODEL-MANAGEMENT`, `MODEL-REGISTRY`, `MODEL-DISCOVERY`, `MODEL-INTELLIGENCE`, `PROVIDER-DISCOVERY`, `MODEL-IDENTITY`, `PROVENANCE`, `DUPLICATE-RESOLUTION`, `ONBOARDING-HANDOFF`, `RUNTIME-TRUTH` |
| Impact | `I5 — Enterprise Model Signal Discovery, Candidate Identity, Provider/Version/Alias Resolution, Source Evidence, Provenance Confidence, Capability-Claim Handling, Duplicate Resolution, Project/Workload Relevance, Discovery Automation Boundaries and Onboarding Handoff Framework Established` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Founder Approved | `NO EVIDENCE` |
| Canonical | `NO` |
| Root Documents Content-Complete-for-Review | `13 / 13` |
| Architecture Specialized Documents Content-Complete-for-Review | `4 / 4` |
| Backup-Recovery Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Benchmarking Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Compliance Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Cost Management Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Evaluation Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Fine-Tuning Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Governance Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Inference Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Integrations Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Model Catalog Specialized Documents Content-Complete-for-Review | `4 / 4` |
| Model Deployment Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Model Lifecycle Specialized Documents Content-Complete-for-Review | `3 / 3` |
| Model Registry Specialized Documents Content-Complete-for-Review | `1 / 3` |
| Model Discovery Service Implemented | `NOT PROVEN` |
| Provider Model Watcher Implemented | `NOT PROVEN` |
| Model Version/Alias Resolution Verified | `NOT PROVEN` |
| Model Duplicate Resolution Verified | `NOT PROVEN` |
| Model Provenance Verification | `NOT PROVEN` |
| Capability Claim Handling Verified | `NOT PROVEN` |
| Project/Tenant/Workload Relevance Verified | `NOT PROVEN` |
| Discovery Metadata Freshness Verified | `NOT PROVEN` |
| Source Authority-Injection Defense Verified | `NOT PROVEN` |
| Discovery-to-Onboarding Handoff Verified | `NOT PROVEN` |
| Controlled Model Discovery Pilot | `NOT PROVEN` |
| Production Model Discovery Control Plane Readiness | `NOT PROVEN` |
| Production Authorization | `NO` |

### Affected Document

`doc/27-model-management/model-registry/model-discovery.md`

### Documentation Truth

`MODEL_MANAGEMENT_MODEL_REGISTRY_MODEL_DISCOVERY = CONTENT_COMPLETE_FOR_REVIEW`

### Model Registry Folder Truth

`MODEL_MANAGEMENT_MODEL_REGISTRY_SPECIALIZED_DOCUMENTS = 1_OF_3_CONTENT_COMPLETE_FOR_REVIEW_IN_CURRENT_CHAT_WORKFLOW`

### Framework Truth

`MODEL_MANAGEMENT_TARGET_MODEL_DISCOVERY_FRAMEWORK = DOCUMENTED`

### Runtime Truth

`MODEL_MANAGEMENT_MODEL_DISCOVERY_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_MODEL_MANAGEMENT_MODEL_DISCOVERY_CONTROL_PLANE = NOT_AUTHORIZED_OR_VERIFIED_BY_THIS_DOCUMENT`
```

---

# 192. Next Document

The screenshot-established next exact file is:

```text id="mmd142"
doc/27-model-management/model-registry/model-metadata.md
```

Current Model Registry workflow:

```text id="mmd143"
model-discovery.md
=
CONTENT_COMPLETE_FOR_REVIEW

model-metadata.md
=
NEXT

model-registry.md
=
PENDING
```

---
