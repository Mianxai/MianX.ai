---

id: RESEARCH-LAB-CAPABILITIES-001
title: Mianx.ai Research Lab Capabilities
version: 1.0.0
status: Draft

description: Enterprise-grade capability catalog for the Mianx.ai Research Lab. This document defines the target capabilities required to operate a governed, AI-native, evidence-driven Research and Innovation system across Mianx.ai. It covers Research Intake, Question Management, Research Program Management, Hypothesis Management, Academic and Literature Research, Source and Evidence Management, Provenance, Counter-Evidence, Dataset Management, Research Data Preparation, Experimentation, Reproducibility, Replication, Benchmarking, Model Evaluation, LLM Research, Prompt Research, Agent Research, Multi-Agent Research, Tool Research, Simulation, Prototype Research, Architecture Research, Market Research, Competitive Intelligence, Future Technology Research, Technology Radar, Innovation, Knowledge Transfer, Publications, Patent and Intellectual Property support, Collaboration, Research Memory, Knowledge integration, Intelligence Engine integration, Automation, Monitoring, Metrics, Audit, Security, Privacy, Ethics, Project isolation, Tenant isolation, Research Operations, Research Portfolio Management, Cost and Resource Awareness, Research Quality, Human-AI collaboration, bounded autonomous research, failure handling, HALT and Recovery, capability maturity, verification expectations, Runtime Truth and Production authorization boundaries. It permanently separates capability definition from capability implementation, research ability from research authority, source discovery from source validity, hypothesis generation from fact, experiment execution from proof, benchmark performance from Production fitness, Model evaluation from Model deployment, Prompt research from Prompt OS authority, Agent research from Agent deployment authority, simulation from real-world proof, prototype capability from Product readiness, Knowledge Transfer from implementation approval, Innovation from Product authorization, monitoring from truth, controlled-pilot success from Production authorization, Founder routing from Founder approval, and documentation from implementation, testing, verification or Production authorization.

type: Research Lab Capability Catalog, Research Platform Capability Model, AI-Native Research Capability Specification, Research Governance Capability Model, Runtime Truth Register, and Production Authorization Boundary

class: Governed target-state capability specification defining what the Mianx.ai Research Lab should eventually be able to perform without asserting that the documented capabilities are currently implemented, funded, tested, verified, canonical or Production authorized

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Research Capabilities
parent: doc/26-research-lab

owner: Mianx.ai Founder
authority: Founder and Enterprise Governance

highest_authority:
role: Founder
level: L0
final_enterprise_authority: true

stewards:

* Founder Office
* Enterprise Governance
* Research Governance
* Research Strategy
* Research Architecture
* Enterprise Architecture
* AI Governance
* Agent Governance
* Model Governance
* Prompt Governance
* Tool Governance
* Data Governance
* Knowledge Governance
* Memory Governance
* Experiment Governance
* Benchmark Governance
* Simulation Governance
* Innovation Governance
* Security Governance
* Privacy Governance
* Ethics Governance
* Compliance Governance
* Legal Governance
* Intellectual Property Governance
* Quality Governance
* Evidence Governance
* Verification Governance
* Audit Governance
* Production Governance
* Documentation Governance

maintainers:

* Research Lab Engineering
* Research Operations
* Research Program Management
* Academic Research
* AI Research
* Agent Research
* LLM Research
* Prompt Research
* Model Evaluation
* Benchmarking
* Experimentation
* Dataset Engineering
* Simulation Engineering
* Prototype Engineering
* Architecture Research
* Future Technology Research
* Technology Radar
* Market Research
* Competitive Intelligence
* Innovation Engineering
* Knowledge Engineering
* Memory Engineering
* Automation Engineering
* Security Engineering
* Platform Engineering
* Quality Engineering
* Verification Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* AI CEO
* Enterprise Governance
* Research Governance
* Research Strategy
* Research Architecture
* Enterprise Architecture
* AI Governance
* Agent Governance
* Model Governance
* Prompt Governance
* Data Governance
* Security Governance
* Privacy Governance
* Ethics Governance
* Compliance Governance
* Legal Governance
* Intellectual Property Governance
* Quality Governance
* Verification Governance
* Audit Governance
* Production Governance
* Documentation Governance

created: 2026-08-13
updated: 2026-08-13

classification: Internal

audience:

* Founder
* Founder Office
* Human Executive Leadership
* AI CEO
* C-Suite
* Directors
* Enterprise Architects
* Research Leaders
* Research Program Owners
* Researchers
* Research Engineers
* AI Engineers
* Agent Engineers
* Model Engineers
* Prompt Engineers
* Data Scientists
* Data Engineers
* Innovation Leaders
* Product Leaders
* Strategy Leaders
* Security Leaders
* Knowledge Engineers
* Platform Engineers
* Automation Engineers
* Quality Engineers
* Verification Engineers
* Auditors
* Documentation Maintainers

depends_on:

* ./README.md
* ./INDEX.md
* ./research-vision.md
* ./research-strategy.md
* ./research-architecture.md
* ../01-governance/
* ../02-company/
* ../03-product/
* ../04-system/
* ../05-workforce/
* ../06-engineering/
* ../07-platform/
* ../08-data/
* ../09-security/
* ../14-quality/
* ../16-knowledge/
* ../19-ai-workforce/
* ../20-ai-operating-system/
* ../21-memory-engine/
* ../22-agent-framework/
* ../23-multi-agent-system/
* ../24-automation-engine/
* ../25-intelligence-engine/

related_documents:

* ./research-lifecycle.md
* ./research-governance.md
* ./research-security.md
* ./research-metrics.md
* ./research-checklists.md
* ./ROADMAP.md
* ./CHANGELOG.md

related_domains:

* ./academic-research/
* ./agent-research/
* ./ai-research/
* ./architecture/
* ./benchmarking/
* ./collaboration/
* ./competitive-intelligence/
* ./datasets/
* ./ethics/
* ./experiments/
* ./future-technologies/
* ./governance/
* ./innovation-lab/
* ./knowledge-transfer/
* ./llm-research/
* ./market-research/
* ./model-evaluation/
* ./monitoring/
* ./patents/
* ./prompt-research/
* ./prototypes/
* ./publications/
* ./research-strategy/
* ./security/
* ./simulations/
* ./technology-radar/
* ./templates/

review_cycle:

* At Every Material Research Capability Change
* At Every Research Architecture Change
* At Every Research Governance Change
* At Every Research Domain Addition or Removal
* At Every Material AI, Agent, Model or Prompt Capability Change
* At Every Research-to-Enterprise Integration Change
* Before Controlled Research Capability Pilots
* Before Production Research Capability Authorization
* Quarterly During Active Build
* Annually During Stable Operation

## canonical: false

# Mianx.ai Research Lab Capabilities

> **This document defines the target capability catalog of the Mianx.ai Research Lab.**
>
> It describes what the Research Lab should eventually be able to do across discovery, evidence, experimentation, benchmarking, AI research, simulations, innovation, Knowledge Transfer and governed research operations.
>
> A capability documented here is a **target capability** unless separate implementation and verification evidence proves otherwise.
>
> **Capability definition does not create capability implementation, research authority, budget authority or Production authorization.**

---

# 1. Capability Objective

The Research Lab should eventually provide a reusable enterprise capability system capable of:

```text id="rcl-cap-001"
DISCOVERING
IMPORTANT
UNKNOWNS

↓

FORMING
QUESTIONS

↓

STRUCTURING
RESEARCH

↓

COLLECTING
EVIDENCE

↓

RUNNING
CONTROLLED
RESEARCH

↓

CHALLENGING
RESULTS

↓

VALIDATING
KNOWLEDGE

↓

TRANSFERRING
LEARNING

↓

IMPROVING
MIANX.AI
```

---

# 2. Capability Philosophy

The Research Lab capability model should follow:

```text id="rcl-cap-002"
RESEARCH
CAPABILITY

=

METHOD

+

DATA

+

TOOLS

+

MODELS

+

AGENTS

+

AUTOMATION

+

GOVERNANCE

+

EVIDENCE

+

HUMAN
ACCOUNTABILITY
```

---

# 3. Capability Boundary

Permanent:

```text id="rcl-cap-003"
CAPABILITY
DOCUMENTED
≠
CAPABILITY
IMPLEMENTED
```

---

# 4. Availability Boundary

```text id="rcl-cap-004"
CAPABILITY
IMPLEMENTED
≠
CAPABILITY
AVAILABLE
FOR
EVERY
ACTOR
```

---

# 5. Authority Boundary

```text id="rcl-cap-005"
CAN
PERFORM
RESEARCH
ACTION
≠
AUTHORIZED
TO
PERFORM
RESEARCH
ACTION
```

---

# 6. Verification Boundary

```text id="rcl-cap-006"
CAPABILITY
TESTED
≠
CAPABILITY
VERIFIED
FOR
PRODUCTION
```

---

# 7. Production Boundary

Permanent:

```text id="rcl-cap-007"
CAPABILITY
VERIFIED
IN
CONTROLLED
PILOT
≠
PRODUCTION
AUTHORIZED
```

---

# 8. Capability Families

The Research Lab target capability portfolio contains the following major families:

```text id="rcl-cap-008"
C01
RESEARCH
INTAKE

C02
QUESTION
MANAGEMENT

C03
PROGRAM /
PORTFOLIO
MANAGEMENT

C04
SOURCE /
LITERATURE
RESEARCH

C05
EVIDENCE /
PROVENANCE

C06
HYPOTHESIS /
METHOD
MANAGEMENT

C07
DATASET
MANAGEMENT

C08
EXPERIMENTATION

C09
REPRODUCIBILITY /
REPLICATION

C10
BENCHMARKING

C11
MODEL /
LLM
RESEARCH

C12
PROMPT
RESEARCH

C13
AGENT /
MULTI-AGENT
RESEARCH

C14
TOOL /
AUTOMATION
RESEARCH

C15
SIMULATION

C16
PROTOTYPING

C17
ARCHITECTURE
RESEARCH

C18
MARKET /
COMPETITIVE
RESEARCH

C19
FUTURE
TECHNOLOGY /
RADAR

C20
INNOVATION

C21
KNOWLEDGE
TRANSFER

C22
PUBLICATION /
IP /
COLLABORATION

C23
MEMORY /
KNOWLEDGE /
INTELLIGENCE
INTEGRATION

C24
MONITORING /
METRICS /
AUDIT

C25
SECURITY /
PRIVACY /
ETHICS

C26
MULTI-PROJECT /
MULTI-TENANT
RESEARCH

C27
AI-NATIVE /
BOUNDED
AUTONOMOUS
RESEARCH

C28
RESILIENCE /
HALT /
RECOVERY
```

---

# 9. C01 — Research Intake Capability

The Research Lab should support governed intake of new research needs.

Target inputs may originate from:

```text id="rcl-cap-009"
FOUNDER

EXECUTIVES

PRODUCT

ENGINEERING

AI
WORKFORCE

SECURITY

OPERATIONS

CUSTOMER
SIGNALS

MARKET
SIGNALS

TECHNOLOGY
RADAR

RESEARCH
FINDINGS

INCIDENTS

UNKNOWN
GAPS
```

---

# 10. Research Intake Record

Conceptually:

```yaml id="rcl-cap-010"
research_intake:
  request_id: required
  requester_ref: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional

  purpose: required
  research_need: required

  urgency: required
  risk_class: required

  supporting_evidence_refs: []

  status: required
```

---

# 11. Intake Triage Capability

The Research Lab should be able to classify an intake as:

```text id="rcl-cap-011"
RESEARCH
REQUIRED

EXISTING
KNOWLEDGE
SUFFICIENT

DUPLICATE
RESEARCH

PRODUCT
QUESTION

ENGINEERING
QUESTION

SECURITY
QUESTION

STRATEGY
QUESTION

NO
VALID
RESEARCH
MANDATE

ESCALATION
REQUIRED
```

---

# 12. Intake Boundary

```text id="rcl-cap-012"
REQUEST
SUBMITTED
≠
RESEARCH
AUTHORIZED
```

---

# 13. C02 — Research Question Management

The Research Lab should support first-class management of research questions.

Capabilities should include:

```text id="rcl-cap-013"
QUESTION
REGISTRATION

QUESTION
VERSIONING

SCOPE

OWNER

PRIORITY

DEPENDENCIES

EVIDENCE
GAPS

RELATED
QUESTIONS

STATUS

OUTCOME
LINKING
```

---

# 14. Research Question Quality Capability

The system should help distinguish:

```text id="rcl-cap-014"
CLEAR
QUESTION

TESTABLE
QUESTION

DECISION-RELEVANT
QUESTION

UNANSWERABLE
QUESTION

OVERLY
BROAD
QUESTION

ALREADY
ANSWERED
QUESTION
```

---

# 15. Question Decomposition Capability

Complex questions may be decomposed:

```text id="rcl-cap-015"
PRIMARY
QUESTION

├── SUBQUESTION A
├── SUBQUESTION B
├── SUBQUESTION C
└── SUBQUESTION N
```

---

# 16. Question Boundary

```text id="rcl-cap-016"
AI
CAN
GENERATE
SUBQUESTIONS
≠
AI
CAN
EXPAND
RESEARCH
MANDATE
WITHOUT
AUTHORITY
```

---

# 17. C03 — Research Program Management

The Research Lab should eventually manage collections of related research under governed Programs.

Capabilities:

```text id="rcl-cap-017"
PROGRAM
IDENTITY

MISSION

OWNER

QUESTIONS

PROJECTS

DEPENDENCIES

RISK

PORTFOLIO
POSITION

RESOURCES

MILESTONES

RESULTS

TRANSFER
OUTCOMES
```

---

# 18. Research Project Capability

Within Programs, bounded research Projects should support:

```text id="rcl-cap-018"
SCOPE

QUESTION
SET

METHOD

TEAM /
AGENTS

DATA

TOOLS

TIMELINE

BUDGET
ESTIMATE

RESULTS

STATUS
```

---

# 19. Program Boundary

```text id="rcl-cap-019"
PROGRAM
PRIORITIZED
≠
PROGRAM
FUNDED
```

---

# 20. Research Portfolio Capability

Research leadership should eventually be able to view research across:

```text id="rcl-cap-020"
CORE
PLATFORM

AI

AGENTS

MODELS

PROMPTS

DATA

SECURITY

PRODUCTS

INDUSTRIES

MARKETS

FUTURE
TECHNOLOGY
```

---

# 21. Portfolio Prioritization Capability

Potential dimensions:

```text id="rcl-cap-021"
STRATEGIC
FIT

EXPECTED
VALUE

UNCERTAINTY
REDUCTION

LEARNING
VALUE

REUSE

URGENCY

COST

EFFORT

RISK

REVERSIBILITY
```

---

# 22. Priority Boundary

```text id="rcl-cap-022"
PRIORITY
SCORE
≠
EXECUTION
AUTHORITY
```

---

# 23. C04 — Academic and Literature Research

The Research Lab should support systematic literature research.

Capabilities:

```text id="rcl-cap-023"
SOURCE
DISCOVERY

PAPER
DISCOVERY

LITERATURE
SEARCH

SOURCE
FILTERING

QUALITY
ASSESSMENT

CLAIM
EXTRACTION

CITATION
TRACKING

SYNTHESIS

CONFLICT
ANALYSIS

RESEARCH
GAP
IDENTIFICATION
```

---

# 24. Source Classification Capability

Sources may be classified as:

```text id="rcl-cap-024"
PRIMARY

SECONDARY

TERTIARY

ACADEMIC

VENDOR

GOVERNMENT

STANDARDS
BODY

INTERNAL

CUSTOMER

MARKET

UNVERIFIED

AI-GENERATED
```

---

# 25. Literature Review Capability

Target flow:

```text id="rcl-cap-025"
QUESTION

↓

SEARCH
STRATEGY

↓

SOURCE
COLLECTION

↓

QUALITY
ASSESSMENT

↓

CLAIM
EXTRACTION

↓

CONTRADICTION
ANALYSIS

↓

SYNTHESIS

↓

LIMITATIONS

↓

RESEARCH
GAPS
```

---

# 26. Source Boundary

```text id="rcl-cap-026"
SOURCE
FOUND
≠
SOURCE
RELIABLE
```

---

# 27. Citation Verification Capability

The Research Lab should eventually verify that:

```text id="rcl-cap-027"
CITATION
EXISTS

SOURCE
EXISTS

SOURCE
SUPPORTS
CLAIM

VERSION /
DATE
MATCH

ATTRIBUTION
IS
CORRECT
```

---

# 28. Citation Boundary

Permanent:

```text id="rcl-cap-028"
AI
GENERATED
CITATION
≠
VERIFIED
CITATION
```

---

# 29. C05 — Evidence Management Capability

Evidence should become a first-class managed capability.

Target functions:

```text id="rcl-cap-029"
EVIDENCE
REGISTRATION

SOURCE
LINKING

CLAIM
LINKING

PROVENANCE

QUALITY

FRESHNESS

TRUST

LIMITATIONS

COUNTER-
EVIDENCE

SCOPE

REVIEW
STATUS
```

---

# 30. Claim-to-Evidence Mapping

The Research Lab should eventually support:

```text id="rcl-cap-030"
CLAIM A
├── SUPPORTING EVIDENCE 1
├── SUPPORTING EVIDENCE 2
└── COUNTER-EVIDENCE 1

CLAIM B
├── SUPPORTING EVIDENCE 3
└── LIMITATION 1
```

---

# 31. Evidence Quality Capability

Potential evidence states:

```text id="rcl-cap-031"
UNASSESSED

WEAK

LIMITED

MODERATE

STRONG

REPLICATED

DISPUTED

STALE

INVALIDATED
```

Exact scoring requires separate detailed governance.

---

# 32. Evidence Freshness Capability

The system should be able to identify when evidence may be stale.

---

# 33. Evidence Boundary

Permanent:

```text id="rcl-cap-032"
HIGH
EVIDENCE
QUALITY
≠
CERTAINTY
```

---

# 34. Counter-Evidence Capability

Research must be capable of storing, surfacing and evaluating evidence that contradicts preferred conclusions.

---

# 35. Counter-Evidence Hard Rule

```text id="rcl-cap-033"
COUNTER-
EVIDENCE
MUST
NOT
BE
SILENTLY
REMOVED
TO
IMPROVE
A
CONCLUSION
```

---

# 36. Provenance Capability

The Research Lab should trace important results to their origin.

```text id="rcl-cap-034"
CONCLUSION

↓

ANALYSIS

↓

RESULT

↓

EXPERIMENT /
BENCHMARK

↓

CONFIGURATION

↓

MODEL /
PROMPT /
AGENT /
TOOL

↓

DATASET

↓

SOURCE
```

---

# 37. Provenance Boundary

```text id="rcl-cap-035"
PROVENANCE
COMPLETE
≠
CLAIM
CORRECT
```

---

# 38. C06 — Hypothesis Management Capability

Target capabilities:

```text id="rcl-cap-036"
HYPOTHESIS
REGISTRATION

VERSIONING

RATIONALE

TESTABILITY

FALSIFICATION
CRITERIA

SUPPORTING
EVIDENCE

COUNTER-
EVIDENCE

STATUS

RESULT
LINKING
```

---

# 39. Hypothesis States

Potential:

```text id="rcl-cap-037"
PROPOSED

UNDER
REVIEW

AUTHORIZED
FOR
TEST

SUPPORTED

PARTIALLY
SUPPORTED

NOT
SUPPORTED

REJECTED

INCONCLUSIVE

SUPERSEDED
```

---

# 40. Hypothesis Boundary

Permanent:

```text id="rcl-cap-038"
SUPPORTED
HYPOTHESIS
≠
FACT
```

---

# 41. Research Method Capability

The Research Lab should support explicit methods such as:

```text id="rcl-cap-039"
EXPERIMENTAL

OBSERVATIONAL

COMPARATIVE

BENCHMARK

SIMULATION

QUALITATIVE

QUANTITATIVE

MIXED
METHOD

LITERATURE
REVIEW

CASE
STUDY

PROTOTYPE
EVALUATION
```

---

# 42. Method Selection Capability

The system should help choose a method based on:

```text id="rcl-cap-040"
QUESTION
TYPE

DATA
AVAILABILITY

RISK

COST

TIME

CAUSALITY
NEED

REPRODUCIBILITY

ETHICS

SECURITY
```

---

# 43. Method Boundary

```text id="rcl-cap-041"
METHOD
SELECTED
≠
METHOD
VALID
FOR
EVERY
CONTEXT
```

---

# 44. C07 — Dataset Management Capability

Research Lab should manage datasets as governed research assets.

Capabilities:

```text id="rcl-cap-042"
REGISTRATION

VERSIONING

PROVENANCE

CLASSIFICATION

SCHEMA

QUALITY

LICENSE

PURPOSE

ACCESS

TRANSFORMATION

LINEAGE

SPLITS

RETENTION

DELETION

ARCHIVAL
```

---

# 45. Dataset Discovery Capability

Researchers and Agents should eventually discover datasets using authorized metadata without gaining unauthorized Data access.

---

# 46. Dataset Access Capability

Access decisions should consider:

```text id="rcl-cap-043"
ACTOR

PROJECT

TENANT

PURPOSE

DATA
CLASSIFICATION

LICENSE

REGION

RETENTION

RESEARCH
RISK
```

---

# 47. Dataset Quality Capability

Potential dimensions:

```text id="rcl-cap-044"
COMPLETENESS

ACCURACY

CONSISTENCY

REPRESENTATIVENESS

BIAS

DUPLICATION

FRESHNESS

LABEL
QUALITY

CONTAMINATION
```

---

# 48. Dataset Lineage Capability

The Research Lab should trace:

```text id="rcl-cap-045"
SOURCE

↓

RAW

↓

CLEANED

↓

TRANSFORMED

↓

SAMPLED

↓

TRAIN /
VALIDATION /
TEST

↓

RESEARCH
RUN
```

---

# 49. Dataset Boundary

Permanent:

```text id="rcl-cap-046"
DATASET
EXISTS
≠
DATASET
AUTHORIZED
```

---

# 50. Synthetic Data Capability

The Research Lab may eventually generate controlled synthetic Data for:

```text id="rcl-cap-047"
PRIVACY

RARE
CASES

FAILURE
TESTING

SECURITY

SIMULATION

BENCHMARKS

AGENT
TESTING
```

---

# 51. Synthetic Data Boundary

```text id="rcl-cap-048"
SYNTHETIC
DATA
≠
REAL-WORLD
EVIDENCE
AUTOMATICALLY
```

---

# 52. C08 — Experimentation Capability

The Research Lab should support governed experiment execution.

Capabilities:

```text id="rcl-cap-049"
EXPERIMENT
DESIGN

REGISTRATION

AUTHORIZATION

CONFIGURATION
FREEZE

RUN

PAUSE

HALT

RETRY

MEASUREMENT

RESULT
CAPTURE

PROVENANCE

REPLICATION

ARCHIVAL
```

---

# 53. Experiment Configuration Capability

A run should bind exact:

```text id="rcl-cap-050"
METHOD

DATASET

MODEL

PROMPT

AGENT

TOOLS

ENVIRONMENT

METRICS

PARAMETERS

CODE /
ARTIFACT
VERSIONS
```

where applicable.

---

# 54. Experiment Status Capability

Potential states:

```text id="rcl-cap-051"
DRAFT

PROPOSED

REVIEW_REQUIRED

AUTHORIZED

QUEUED

RUNNING

PAUSED

HALTED

COMPLETED

FAILED

INCONCLUSIVE

CANCELLED

ARCHIVED
```

---

# 55. Experiment Boundary

Permanent:

```text id="rcl-cap-052"
EXPERIMENT
COMPLETED
≠
RESEARCH
QUESTION
ANSWERED
```

---

# 56. Experiment Isolation Capability

Research experiments should eventually run under bounded:

```text id="rcl-cap-053"
COMPUTE

NETWORK

DATA

SECRETS

TOOLS

PROJECT

TENANT

TIME

BUDGET
```

---

# 57. Controlled Parallel Experiment Capability

Where safe and useful, the Research Lab may execute multiple authorized variants in parallel.

---

# 58. Parallelism Boundary

```text id="rcl-cap-054"
MORE
RUNS
≠
BETTER
EVIDENCE
AUTOMATICALLY
```

---

# 59. C09 — Reproducibility Capability

The Research Lab should enable authorized parties to reproduce important results.

Required reconstruction may include:

```text id="rcl-cap-055"
DATASET
VERSION

MODEL
VERSION

PROMPT
VERSION

AGENT
VERSION

TOOL
VERSION

CODE
VERSION

ENVIRONMENT

CONFIGURATION

RANDOM
SEED
WHERE
RELEVANT

METRICS

METHOD
```

---

# 60. Reproducibility Boundary

```text id="rcl-cap-056"
REPRODUCED
ONCE
≠
GENERALIZED
EVERYWHERE
```

---

# 61. Replication Capability

The system should support:

```text id="rcl-cap-057"
SAME
TEAM
REPLICATION

INDEPENDENT
REPLICATION

ALTERNATIVE
MODEL
REPLICATION

ALTERNATIVE
DATASET
REPLICATION

ALTERNATIVE
ENVIRONMENT
REPLICATION
```

---

# 62. Replication Status

Potential:

```text id="rcl-cap-058"
NOT
ATTEMPTED

PENDING

PARTIAL

REPLICATED

FAILED
TO
REPLICATE

MIXED

INCONCLUSIVE
```

---

# 63. C10 — Benchmarking Capability

Benchmarking should support reusable evaluation.

Capabilities:

```text id="rcl-cap-059"
BENCHMARK
DESIGN

REGISTRATION

VERSIONING

DATASET
BINDING

TASK
DEFINITION

SCORER

RUBRIC

RUNNER

COMPARISON

SLICING

REGRESSION

CONTAMINATION
REVIEW

REPORTING
```

---

# 64. Benchmark Subject Capability

The system should potentially benchmark:

```text id="rcl-cap-060"
MODELS

PROMPTS

AGENTS

MULTI-AGENT
SYSTEMS

TOOLS

RETRIEVAL

MEMORY

AUTOMATION

ARCHITECTURES

PIPELINES
```

---

# 65. Benchmark Comparison Capability

Comparisons may include:

```text id="rcl-cap-061"
QUALITY

ACCURACY

TASK
SUCCESS

SAFETY

RELIABILITY

LATENCY

COST

TOKEN
USE

RESOURCE
USE

FAILURE
RATE
```

---

# 66. Benchmark Boundary

Permanent:

```text id="rcl-cap-062"
BENCHMARK
BEST
≠
PRODUCTION
BEST
AUTOMATICALLY
```

---

# 67. Benchmark Regression Capability

The Research Lab should identify when newer:

```text id="rcl-cap-063"
MODEL

PROMPT

AGENT

TOOL

PIPELINE
```

performs worse on relevant dimensions than a previous version.

---

# 68. Contamination Detection Capability

Research should attempt to identify benchmark contamination where material.

---

# 69. C11 — Model Evaluation Capability

Mianx.ai should eventually evaluate Models empirically.

Capabilities:

```text id="rcl-cap-064"
MODEL
DISCOVERY

IDENTITY

VERSION
TRACKING

TASK
EVALUATION

QUALITY

REASONING

SAFETY

RELIABILITY

LATENCY

COST

CONTEXT

TOOL
USE

FAILURE
PROFILE
```

---

# 70. Task-Specific Model Profiling

The Research Lab should be able to answer:

```text id="rcl-cap-065"
MODEL A
BEST
FOR
WHAT?

MODEL B
BEST
FOR
WHAT?

WHERE
DO
THEY
FAIL?

WHAT
DO
THEY
COST?

WHAT
RISK
DO
THEY
CREATE?
```

---

# 71. Model Boundary

```text id="rcl-cap-066"
MODEL
EVALUATED
≠
MODEL
APPROVED
FOR
USE
```

---

# 72. LLM Research Capability

LLM-specific research should include:

```text id="rcl-cap-067"
REASONING

PLANNING

LONG
CONTEXT

HALLUCINATION

RETRIEVAL

TOOL
USE

STRUCTURED
OUTPUT

MULTIMODALITY

CODE

MEMORY

SAFETY

SECURITY
```

---

# 73. Multi-Model Capability

Research should support comparisons across providers and Model families.

---

# 74. Model Portability Capability

Research results should avoid unnecessary dependence on one Model identifier when a broader pattern is intended.

---

# 75. Model Portability Boundary

```text id="rcl-cap-068"
PATTERN
WORKS
ON
MODEL A
≠
PATTERN
WORKS
ON
MODEL B
```

---

# 76. C12 — Prompt Research Capability

Capabilities:

```text id="rcl-cap-069"
PROMPT
REGISTRATION

VERSIONING

EXPERIMENTATION

A/B
TESTING

MODEL
COMPATIBILITY

CONTEXT
COMPOSITION

ROBUSTNESS

SECURITY

TOKEN
EFFICIENCY

BENCHMARKING

REGRESSION
TESTING
```

---

# 77. Prompt Variant Capability

A Research Prompt may have:

```text id="rcl-cap-070"
BASE
VARIANT

MODEL-SPECIFIC
VARIANT

TASK-SPECIFIC
VARIANT

SHORT
VARIANT

HIGH-REASONING
VARIANT

SECURE
VARIANT
```

where useful.

---

# 78. Prompt Boundary

Permanent:

```text id="rcl-cap-071"
PROMPT
RESEARCH
WINNER
≠
PROMPT OS
UPDATE
AUTHORIZED
```

---

# 79. Prompt Injection Research Capability

The Research Lab should test Prompts and Agents against:

```text id="rcl-cap-072"
DIRECT
INJECTION

INDIRECT
INJECTION

AUTHORITY
SPOOFING

DATA
EXFILTRATION
ATTEMPTS

TOOL
MISUSE

CONTEXT
POISONING
```

---

# 80. C13 — Agent Research Capability

Agent research should evaluate:

```text id="rcl-cap-073"
ROLE
FIT

TASK
FIT

PLANNING

DECOMPOSITION

TOOL
USE

MEMORY

KNOWLEDGE

ESCALATION

SELF-REVIEW

RELIABILITY

QUALITY

COST

LATENCY

SECURITY

AUTONOMY
```

---

# 81. Agent Capability Profile

Conceptually:

```yaml id="rcl-cap-074"
agent_research_profile:
  agent_ref: required
  version: required

  task_classes: []

  evaluated_capabilities: []

  benchmark_refs: []

  known_failure_modes: []

  autonomy_ceiling: required

  research_status: required

  production_authorized: false
```

---

# 82. Agent Boundary

```text id="rcl-cap-075"
AGENT
PROVES
CAPABILITY
≠
AGENT
GAINS
AUTHORITY
```

---

# 83. Agent Capacity Capability

Research should measure:

```text id="rcl-cap-076"
TASKS
PER
UNIT
TIME

PARALLEL
WORKLOAD

CONTEXT
LIMITS

FAILURE
RATE

QUALITY
UNDER
LOAD

MODEL
COST

TOOL
BOTTLENECKS
```

---

# 84. Agent Specialization Capability

Research should help determine when to:

```text id="rcl-cap-077"
REUSE
EXISTING
AGENT

SPECIALIZE
EXISTING
AGENT

CREATE
NEW
AGENT

USE
MULTI-AGENT
TEAM

KEEP
HUMAN-LED
PROCESS
```

---

# 85. Multi-Agent Research Capability

Capabilities:

```text id="rcl-cap-078"
ROLE
ASSIGNMENT

COORDINATION

DEBATE

DISSENT

INDEPENDENT
REVIEW

RED-TEAMING

CONSENSUS

TASK
ROUTING

CONFLICT
RESOLUTION

FAILURE
CONTAINMENT
```

---

# 86. Consensus Boundary

Permanent:

```text id="rcl-cap-079"
TEN
AGENTS
AGREE
≠
CLAIM
TRUE
```

---

# 87. Independent Reviewer Capability

High-impact research should support separation between:

```text id="rcl-cap-080"
RESEARCH
GENERATOR

AND

RESEARCH
EVALUATOR
```

where feasible.

---

# 88. C14 — Tool Research Capability

Research should evaluate Tools by:

```text id="rcl-cap-081"
CAPABILITY

QUALITY

RELIABILITY

SECURITY

LATENCY

COST

MODEL
COMPATIBILITY

AGENT
COMPATIBILITY

FAILURE
MODES

DATA
HANDLING
```

---

# 89. Tool Boundary

```text id="rcl-cap-082"
TOOL
WORKS
IN
RESEARCH
≠
TOOL
AUTHORIZED
IN
PRODUCTION
```

---

# 90. Automation Research Capability

The Research Lab should evaluate whether repetitive Research operations can be automated safely.

Potential targets:

```text id="rcl-cap-083"
LITERATURE
COLLECTION

DATA
PREPARATION

BENCHMARK
EXECUTION

MODEL
EVALUATION

PROMPT
TESTING

AGENT
TESTING

REPLICATION

REPORT
GENERATION

TECHNOLOGY
WATCHING
```

---

# 91. Automation Boundary

```text id="rcl-cap-084"
PROCESS
AUTOMATED
≠
AUTHORITY
AUTOMATED
```

---

# 92. C15 — Simulation Capability

Research Lab should eventually support simulation where real-world testing is risky, expensive or slow.

Potential capability areas:

```text id="rcl-cap-085"
SYSTEM
LOAD

BUSINESS
OPERATIONS

WORKFORCE

AGENT
BEHAVIOR

MULTI-AGENT
COORDINATION

MARKET
SCENARIOS

FAILURE

RECOVERY

SECURITY

CAPACITY

COST
```

---

# 93. Simulation Assumption Capability

Each simulation should preserve explicit:

```text id="rcl-cap-086"
ASSUMPTIONS

PARAMETERS

MODELS

BOUNDARIES

SCENARIO

LIMITATIONS
```

---

# 94. Simulation Boundary

Permanent:

```text id="rcl-cap-087"
SIMULATION
VALID
UNDER
ASSUMPTIONS
≠
REAL-WORLD
OUTCOME
PROVEN
```

---

# 95. Scenario Comparison Capability

The Research Lab may compare:

```text id="rcl-cap-088"
BASELINE

BEST
CASE

EXPECTED
CASE

WORST
CASE

STRESS
CASE

TAIL-RISK
CASE
```

where useful.

---

# 96. C16 — Prototype Research Capability

Capabilities:

```text id="rcl-cap-089"
PROTOTYPE
REGISTRATION

RAPID
BUILD

ISOLATED
ENVIRONMENT

TEST
DATA

LIMITED
TOOLS

OBSERVABILITY

USER
TESTING
WHERE
AUTHORIZED

RESULT
CAPTURE

ARCHIVAL

TRANSFER
CANDIDATE
```

---

# 97. Prototype Categories

```text id="rcl-cap-090"
TECHNICAL

ARCHITECTURAL

PRODUCT

UX

AI

AGENT

AUTOMATION

DATA

INDUSTRY
OS
```

---

# 98. Prototype Boundary

Permanent:

```text id="rcl-cap-091"
PROTOTYPE
LOOKS
COMPLETE
≠
PRODUCT
COMPLETE
```

---

# 99. Prototype Promotion Capability

A promising prototype may generate:

```text id="rcl-cap-092"
ENGINEERING
HANDOFF

PRODUCT
HANDOFF

ARCHITECTURE
PROPOSAL

NEW
EXPERIMENT

RESEARCH
FOLLOW-UP
```

not automatic Production promotion.

---

# 100. C17 — Architecture Research Capability

The Research Lab should compare technical architectures.

Capabilities:

```text id="rcl-cap-093"
ARCHITECTURE
ALTERNATIVES

TRADEOFF
ANALYSIS

PROTOTYPES

LOAD
TESTING

FAILURE
TESTING

COST
ANALYSIS

SECURITY
ANALYSIS

SCALABILITY
ANALYSIS

PORTABILITY
ANALYSIS
```

---

# 101. Architecture Research Boundary

```text id="rcl-cap-094"
RESEARCH
ARCHITECTURE
RECOMMENDATION
≠
ENTERPRISE
ARCHITECTURE
DECISION
```

---

# 102. Build-vs-Buy Research Capability

The Research Lab may compare:

```text id="rcl-cap-095"
BUILD

BUY

OPEN
SOURCE

MANAGED
SERVICE

HYBRID
```

using evidence.

---

# 103. Vendor Research Capability

Evaluate vendor technology on:

```text id="rcl-cap-096"
FIT

LOCK-IN

SECURITY

PRIVACY

COST

PERFORMANCE

RELIABILITY

PORTABILITY

SUPPORT

LONG-TERM
VIABILITY
```

---

# 104. Vendor Boundary

```text id="rcl-cap-097"
VENDOR
BEST
IN
RESEARCH
≠
PROCUREMENT
AUTHORIZED
```

---

# 105. C18 — Market Research Capability

The Research Lab should support structured market investigation.

Capabilities:

```text id="rcl-cap-098"
CUSTOMER
RESEARCH

MARKET
SIZING

SEGMENT
RESEARCH

DEMAND

PRICING

ADOPTION

PAIN
POINTS

TREND
ANALYSIS

REGULATORY
SIGNALS

OPPORTUNITY
ASSESSMENT
```

---

# 106. Customer Research Capability

Potential methods:

```text id="rcl-cap-099"
INTERVIEWS

SURVEYS

OBSERVATION

SUPPORT
ANALYSIS

USAGE
ANALYSIS

SEARCH
ANALYSIS

SALES
FEEDBACK
```

where authorized.

---

# 107. Market Boundary

```text id="rcl-cap-100"
CUSTOMER
SAYS
THEY
WANT
X
≠
CUSTOMER
WILL
BUY
X
```

---

# 108. Competitive Intelligence Capability

Capabilities:

```text id="rcl-cap-101"
COMPETITOR
DISCOVERY

PROFILE

PRODUCT
COMPARISON

PRICING
COMPARISON

CAPABILITY
COMPARISON

TECHNOLOGY
SIGNALS

STRATEGIC
SIGNALS

GAP
ANALYSIS

DIFFERENTIATION
ANALYSIS
```

---

# 109. Competitive Boundary

```text id="rcl-cap-102"
COMPETITOR
CLAIM
≠
VERIFIED
COMPETITOR
CAPABILITY
```

---

# 110. C19 — Future Technology Research Capability

Research should investigate emerging technologies before enterprise adoption.

Capabilities:

```text id="rcl-cap-103"
TECHNOLOGY
DISCOVERY

MATURITY
ASSESSMENT

RELEVANCE
ASSESSMENT

BENCHMARK

PROTOTYPE

SECURITY
ASSESSMENT

COST
ASSESSMENT

STRATEGIC
OPTION
CREATION
```

---

# 111. Technology Radar Capability

Target capabilities:

```text id="rcl-cap-104"
SIGNAL
INTAKE

TECHNOLOGY
REGISTRY

CATEGORY

MATURITY

BUSINESS
RELEVANCE

TECHNICAL
RELEVANCE

RISK

WATCH
STATUS

RESEARCH
TRIGGER

HISTORY
```

---

# 112. Radar State Capability

Potential conceptual states:

```text id="rcl-cap-105"
WATCH

ASSESS

TRIAL

ADOPT

HOLD
```

subject to separate detailed definition.

---

# 113. Radar Boundary

Permanent:

```text id="rcl-cap-106"
RADAR
ADOPT
≠
DEPLOYMENT
APPROVAL
```

---

# 114. C20 — Innovation Capability

The Research Lab should be able to identify and structure innovation opportunities.

Capabilities:

```text id="rcl-cap-107"
IDEA
CAPTURE

OPPORTUNITY
ASSESSMENT

VALUE
HYPOTHESIS

TECHNICAL
FEASIBILITY

PROTOTYPE

EXPERIMENT

RISK

TRANSFER
CANDIDATE
```

---

# 115. Innovation Funnel

```text id="rcl-cap-108"
IDEA

↓

RESEARCH

↓

EVIDENCE

↓

INNOVATION
CANDIDATE

↓

PROTOTYPE

↓

VALIDATION

↓

PRODUCT /
PLATFORM /
PROCESS
CANDIDATE
```

---

# 116. Innovation Boundary

```text id="rcl-cap-109"
NOVELTY
≠
STRATEGIC
VALUE
```

---

# 117. Innovation Reuse Capability

The Research Lab should identify innovation reusable across:

```text id="rcl-cap-110"
CORE
PLATFORM

MULTIPLE
PROJECTS

MULTIPLE
TENANTS

MULTIPLE
INDUSTRIES
```

while respecting Data and authority boundaries.

---

# 118. C21 — Knowledge Transfer Capability

Knowledge Transfer should convert validated research into target-system-ready packages.

Capabilities:

```text id="rcl-cap-111"
TRANSFER
CANDIDATE

TARGET
IDENTIFICATION

EVIDENCE
PACKAGE

LIMITATIONS

IMPLEMENTATION
IMPLICATIONS

RISK

OWNER
ROUTING

APPROVAL
ROUTING

TRANSFER
TRACKING

OUTCOME
FEEDBACK
```

---

# 119. Transfer Package

Conceptually:

```yaml id="rcl-cap-112"
knowledge_transfer:
  transfer_id: required

  source_research_ref: required

  result_ref: required

  evidence_refs: []
  counter_evidence_refs: []
  limitation_refs: []

  target_module_ref: required
  target_owner_ref: required

  recommendation_ref: required

  transfer_status: required

  implementation_authorized: false
  production_authorized: false
```

---

# 120. Transfer Boundary

Permanent:

```text id="rcl-cap-113"
RESEARCH
TRANSFER
COMPLETE
≠
IMPLEMENTATION
COMPLETE
```

---

# 121. Transfer Targets

Potential:

```text id="rcl-cap-114"
GOVERNANCE

PRODUCT

ENGINEERING

ENTERPRISE
ARCHITECTURE

DATA

SECURITY

KNOWLEDGE

MEMORY
ENGINE

AI
OPERATING
SYSTEM

AGENT
FRAMEWORK

MULTI-AGENT
SYSTEM

AUTOMATION
ENGINE

INTELLIGENCE
ENGINE

MODEL
MANAGEMENT

INDUSTRY
OPERATING
SYSTEMS
```

---

# 122. Research Outcome Feedback Capability

After transfer, Research Lab should eventually receive:

```text id="rcl-cap-115"
IMPLEMENTATION
STATUS

VERIFICATION
RESULT

REAL-WORLD
OUTCOME

REGRESSION

UNEXPECTED
EFFECTS

VALUE
REALIZATION
```

where appropriate.

---

# 123. C22 — Publication Capability

The Research Lab should support controlled publication processes.

Capabilities:

```text id="rcl-cap-116"
PUBLICATION
DRAFTING

TECHNICAL
REVIEW

EVIDENCE
REVIEW

SECURITY
REVIEW

PRIVACY
REVIEW

LEGAL /
IP
REVIEW

APPROVAL

VERSIONING

DISCLOSURE
TRACKING
```

---

# 124. Publication Types

Potential:

```text id="rcl-cap-117"
INTERNAL
REPORT

TECHNICAL
REPORT

WHITEPAPER

BENCHMARK
REPORT

ACADEMIC
PAPER

INDUSTRY
REPORT

PUBLIC
BLOG /
ARTICLE
```

---

# 125. Publication Boundary

```text id="rcl-cap-118"
PUBLICATION
DRAFT
APPROVED
TECHNICALLY
≠
PUBLIC
DISCLOSURE
AUTHORIZED
```

---

# 126. Patent and IP Capability

The Research Lab should support identification of:

```text id="rcl-cap-119"
INVENTIONS

PATENT
CANDIDATES

TRADE
SECRETS

PROPRIETARY
METHODS

PROPRIETARY
BENCHMARKS

PROPRIETARY
DATASETS

THIRD-PARTY
IP
DEPENDENCIES
```

---

# 127. IP Boundary

```text id="rcl-cap-120"
POTENTIALLY
PATENTABLE
≠
PATENT
GRANTED
```

---

# 128. Collaboration Capability

Research Lab may eventually support controlled internal and external collaboration.

Capabilities:

```text id="rcl-cap-121"
COLLABORATOR
IDENTITY

ROLE

ACCESS
SCOPE

DATA
SCOPE

PROJECT
SCOPE

IP
TERMS

CONFIDENTIALITY

ARTIFACT
SHARING

PUBLICATION
RIGHTS

AUDIT
```

---

# 129. Collaboration Boundary

```text id="rcl-cap-122"
COLLABORATION
APPROVED
≠
UNLIMITED
ACCESS
```

---

# 130. C23 — Research Memory Capability

Research Memory should eventually preserve:

```text id="rcl-cap-123"
PAST
QUESTIONS

PAST
HYPOTHESES

EXPERIMENTS

RESULTS

FAILURES

BENCHMARKS

MODEL
PROFILES

AGENT
PROFILES

PROMPT
PROFILES

ASSUMPTIONS

LIMITATIONS

DECISIONS

TRANSFER
OUTCOMES
```

---

# 131. Memory Retrieval Capability

Authorized Agents and Humans may retrieve relevant prior research to avoid repeated work.

---

# 132. Memory Boundary

Permanent:

```text id="rcl-cap-124"
MEMORY
SAYS
X
≠
X
CURRENTLY
TRUE
```

---

# 133. Knowledge Integration Capability

Validated findings may be proposed for Knowledge governance.

Capabilities:

```text id="rcl-cap-125"
KNOWLEDGE
CANDIDATE

VALIDATION
STATUS

SOURCE
LINKAGE

PROVENANCE

SCOPE

FRESHNESS

CANONICALIZATION
ROUTING
```

---

# 134. Knowledge Boundary

```text id="rcl-cap-126"
VALIDATED
RESEARCH
≠
CANONICAL
ENTERPRISE
KNOWLEDGE
AUTOMATICALLY
```

---

# 135. Intelligence Engine Integration Capability

The Research Lab should be able to deliver structured evidence packages for:

```text id="rcl-cap-127"
ANALYSIS

PREDICTION

RISK

PLANNING

STRATEGY

RECOMMENDATION

DECISION
SUPPORT
```

---

# 136. Intelligence Boundary

```text id="rcl-cap-128"
BETTER
RESEARCH
INPUT
≠
INTELLIGENCE
OUTPUT
CORRECT
AUTOMATICALLY
```

---

# 137. C24 — Monitoring Capability

Research Lab should monitor:

```text id="rcl-cap-129"
ACTIVE
PROGRAMS

ACTIVE
EXPERIMENTS

BENCHMARKS

SIMULATIONS

PROTOTYPES

MODEL
RUNS

AGENT
RUNS

COST

ERRORS

SECURITY
EVENTS

REVIEW
QUEUES

TRANSFER
QUEUES
```

---

# 138. Monitoring Boundary

```text id="rcl-cap-130"
OBSERVABLE
≠
CORRECT
```

---

# 139. Research Metrics Capability

Potential capability groups:

```text id="rcl-cap-131"
RESEARCH
QUALITY

REPRODUCIBILITY

REPLICATION

CYCLE
TIME

EVIDENCE
QUALITY

DATASET
QUALITY

BENCHMARK
QUALITY

MODEL
QUALITY

AGENT
QUALITY

TRANSFER

REUSE

COST

VALUE

RISK

SECURITY
```

---

# 140. Metric Boundary

```text id="rcl-cap-132"
METRIC
CAN
BE
MEASURED
≠
METRIC
SHOULD
DRIVE
BEHAVIOR
ALONE
```

---

# 141. Audit Capability

Material actions should eventually be auditable.

Potential audit events:

```text id="rcl-cap-133"
REQUEST

AUTHORIZATION

SCOPE
CHANGE

DATASET
ACCESS

MODEL
ACCESS

PROMPT
CHANGE

AGENT
CHANGE

EXPERIMENT
RUN

BENCHMARK
RUN

RESULT
CHANGE

REVIEW

TRANSFER

PUBLICATION

HALT

RESUME
```

---

# 142. Audit Boundary

```text id="rcl-cap-134"
AUDIT
EVENT
RECORDED
≠
AUDIT
INTEGRITY
PROVEN
```

---

# 143. Research Lineage Capability

The Research Lab should support end-to-end lineage:

```text id="rcl-cap-135"
QUESTION

↓

HYPOTHESIS

↓

METHOD

↓

EXPERIMENT

↓

RESULT

↓

EVIDENCE

↓

CONCLUSION

↓

TRANSFER

↓

IMPLEMENTATION
OUTCOME
```

where applicable.

---

# 144. C25 — Research Security Capability

Required target capabilities include:

```text id="rcl-cap-136"
IDENTITY

AUTHENTICATION

AUTHORIZATION

POLICY

PROJECT
ISOLATION

TENANT
ISOLATION

DATA
CLASSIFICATION

DATASET
ACCESS

SECRET
PROTECTION

MODEL
ACCESS

TOOL
ACCESS

SANDBOXING

NETWORK
CONTROL

EGRESS
CONTROL

PROMPT
INJECTION
DEFENSE

AUTHORITY
INJECTION
DEFENSE

AUDIT

INCIDENT
RESPONSE
```

---

# 145. Secret Protection Capability

Research systems should use Secret references and scoped credentials where practical.

---

# 146. Secret Boundary

```text id="rcl-cap-137"
RESEARCHER
NEEDS
A
CAPABILITY
≠
RESEARCHER
NEEDS
RAW
SECRET
```

---

# 147. Sandbox Capability

Research Lab should be able to isolate untrusted:

```text id="rcl-cap-138"
CODE

FILES

DATASETS

PROMPTS

MODELS

TOOLS

WEB
CONTENT

PROTOTYPES
```

---

# 148. Sandbox Boundary

```text id="rcl-cap-139"
SANDBOXED
≠
RISK-FREE
```

---

# 149. Prompt Injection Defense Capability

The Research Lab should distinguish:

```text id="rcl-cap-140"
CONTENT

FROM

AUTHORITY
```

when reading external or untrusted sources.

---

# 150. Authority Injection Defense Capability

Claims such as:

```text id="rcl-cap-141"
FOUNDER
APPROVED

ADMIN
APPROVED

SYSTEM
OVERRIDE

POLICY
EXCEPTION
```

should require trusted authorization evidence.

---

# 151. Dataset Poisoning Detection Capability

Potential controls:

```text id="rcl-cap-142"
SOURCE
TRUST

HASH

VERSION

ANOMALY
DETECTION

CONTAMINATION
CHECK

STATISTICAL
CHECKS

MANUAL
REVIEW
WHERE
REQUIRED
```

---

# 152. Evidence Fabrication Detection Capability

Research Quality systems should detect or flag:

```text id="rcl-cap-143"
INVENTED
SOURCE

INVENTED
CITATION

INVENTED
RESULT

UNTRACEABLE
NUMBER

MISSING
PROVENANCE

CLAIM /
SOURCE
MISMATCH
```

---

# 153. Privacy Capability

Research should support:

```text id="rcl-cap-144"
DATA
MINIMIZATION

PURPOSE
LIMITATION

REDACTION

PSEUDONYMIZATION

SYNTHETIC
DATA

RETENTION

DELETION

ACCESS
CONTROL
```

where appropriate.

---

# 154. Ethics Capability

Potential capabilities:

```text id="rcl-cap-145"
ETHICS
SCREENING

HUMAN
IMPACT
ASSESSMENT

DUAL-USE
ASSESSMENT

FAIRNESS
ASSESSMENT

CONSENT
REVIEW

RESPONSIBLE
DISCLOSURE

ESCALATION
```

---

# 155. Ethics Boundary

```text id="rcl-cap-146"
RESEARCH
CAN
BE
DONE
≠
RESEARCH
SHOULD
BE
DONE
```

---

# 156. Compliance and Legal Routing Capability

Research Lab should be able to route material questions involving:

```text id="rcl-cap-147"
PRIVACY

LICENSES

REGULATED
DATA

EXPORT
CONTROLS

INTELLECTUAL
PROPERTY

CONTRACTS

PUBLICATION

HUMAN
SUBJECTS

REGULATORY
IMPACT
```

to appropriate authority.

---

# 157. Legal Boundary

```text id="rcl-cap-148"
RESEARCHER
INTERPRETATION
≠
LEGAL
AUTHORITY
```

---

# 158. C26 — Project Isolation Capability

Each Research artifact and action should eventually preserve trusted Project context.

Capabilities:

```text id="rcl-cap-149"
PROJECT
BINDING

PROJECT
ACCESS
CONTROL

PROJECT
DATASET
SCOPE

PROJECT
EXPERIMENT
SCOPE

PROJECT
RESULT
SCOPE

PROJECT
MEMORY

PROJECT
KNOWLEDGE

PROJECT
AUDIT
```

---

# 159. Project Hard Boundary

Permanent:

```text id="rcl-cap-150"
PROJECT A
DATA
≠
PROJECT B
RESEARCH
INPUT
WITHOUT
AUTHORITY
```

---

# 160. Cross-Project Learning Capability

The Research Lab should support authorized abstraction of reusable patterns.

```text id="rcl-cap-151"
PROJECT
RESULT

↓

CONFIDENTIALITY /
PRIVACY /
SCOPE
REVIEW

↓

GENERALIZED
KNOWLEDGE

↓

CORE
RESEARCH
ASSET
```

---

# 161. Cross-Project Boundary

```text id="rcl-cap-152"
SHARE
LEARNING
≠
SHARE
RAW
DATA
```

---

# 162. Tenant Isolation Capability

For multi-tenant systems, capabilities should include:

```text id="rcl-cap-153"
TENANT
IDENTITY

TENANT
AUTHORIZATION

TENANT
DATASET
SCOPE

TENANT
EXPERIMENT
SCOPE

TENANT
RESULT
SCOPE

TENANT
MEMORY

TENANT
EXPORT

TENANT
AUDIT
```

---

# 163. Tenant Hard Boundary

Permanent:

```text id="rcl-cap-154"
TENANT A
RESULT
≠
TENANT B
VISIBILITY
```

---

# 164. Shared Infrastructure Capability

Mianx.ai should be able to reuse one Research Platform across many Projects and Tenants.

---

# 165. Shared Infrastructure Boundary

```text id="rcl-cap-155"
SHARED
COMPUTE
≠
SHARED
AUTHORITY
```

---

# 166. Industry Research Capability

Research Lab should support Industry-specific Research Programs while reusing Core standards.

Potential industry dimensions:

```text id="rcl-cap-156"
OPERATIONS

CUSTOMER
BEHAVIOR

FORECASTING

AUTOMATION

PRICING

CAPACITY

QUALITY

RISK

DOMAIN
AI
```

---

# 167. Industry Boundary

```text id="rcl-cap-157"
CORE
METHOD
REUSABLE
≠
CORE
RESULT
GENERALIZES
AUTOMATICALLY
```

---

# 168. C27 — Human-AI Collaboration Capability

The Research Lab should support deliberate Human-AI division of responsibility.

AI may assist with:

```text id="rcl-cap-158"
SEARCH

SYNTHESIS

GENERATION

ANALYSIS

CODE

BENCHMARKING

SIMULATION

REPORTING

MONITORING
```

Humans remain responsible for appropriate:

```text id="rcl-cap-159"
AUTHORITY

JUDGMENT

RISK
ACCEPTANCE

ETHICS

STRATEGIC
DIRECTION

CRITICAL
REVIEW

FOUNDER
RESERVED
DECISIONS
```

---

# 169. AI Research Assistant Capability

AI may eventually:

```text id="rcl-cap-160"
PROPOSE
QUESTIONS

PROPOSE
HYPOTHESES

PROPOSE
METHODS

COLLECT
AUTHORIZED
SOURCES

RUN
AUTHORIZED
ANALYSIS

GENERATE
RESEARCH
DRAFTS

IDENTIFY
CONTRADICTIONS

PROPOSE
NEXT
EXPERIMENTS
```

---

# 170. AI Authority Boundary

Permanent:

```text id="rcl-cap-161"
AI
CAN
PROPOSE
≠
AI
CAN
SELF-AUTHORIZE
```

---

# 171. Bounded Autonomous Research Capability

Future low-risk workflows may support bounded autonomy.

Conceptually:

```text id="rcl-cap-162"
AUTHORIZED
RESEARCH
ENVELOPE

↓

AI
OPERATES
WITHIN
ENVELOPE

↓

SUBQUESTIONS

↓

AUTHORIZED
TOOLS /
DATA /
MODELS

↓

BOUNDED
RUNS

↓

RESULTS

↓

REVIEW /
ESCALATION
```

---

# 172. Autonomous Research Boundary

Permanent:

```text id="rcl-cap-163"
AUTONOMOUS
RESEARCH
≠
AUTONOMOUS
ENTERPRISE
AUTHORITY
```

---

# 173. Research Self-Improvement Capability

Research systems may eventually propose improvements to:

```text id="rcl-cap-164"
PROMPTS

MODELS

AGENTS

TOOLS

WORKFLOWS

MEMORY

RETRIEVAL

BENCHMARKS

DATASETS

EXPERIMENT
METHODS
```

---

# 174. Self-Improvement Boundary

```text id="rcl-cap-165"
SYSTEM
FINDS
BETTER
CONFIGURATION
≠
SYSTEM
MAY
DEPLOY
CONFIGURATION
```

---

# 175. Independent AI Review Capability

High-impact AI-generated research may be challenged by:

```text id="rcl-cap-166"
SECOND
MODEL

SECOND
AGENT

RED-TEAM
AGENT

HUMAN
REVIEWER

DOMAIN
EXPERT
```

where appropriate.

---

# 176. Independent Review Boundary

```text id="rcl-cap-167"
MULTIPLE
REVIEWERS
AGREE
≠
CERTAINTY
```

---

# 177. C28 — Research Operations Capability

Research Operations should eventually manage:

```text id="rcl-cap-168"
BACKLOG

QUEUES

PROGRAM
STATUS

RUN
STATUS

RESOURCE
USE

BLOCKERS

REVIEWS

TRANSFERS

ARCHIVES

COST

SLA /
SLO
WHERE
DEFINED
```

---

# 178. Research Scheduling Capability

Research workload may be scheduled based on:

```text id="rcl-cap-169"
PRIORITY

RISK

RESOURCE
AVAILABILITY

DEADLINE

DEPENDENCIES

COST

MODEL
AVAILABILITY

DATASET
AVAILABILITY
```

---

# 179. Scheduling Boundary

```text id="rcl-cap-170"
JOB
QUEUED
≠
JOB
AUTHORIZED
```

---

# 180. Research Resource Awareness

The Research Lab should understand resource consumption across:

```text id="rcl-cap-171"
COMPUTE

MODEL
TOKENS

STORAGE

DATA
TRANSFER

HUMAN
TIME

AGENT
TIME

TOOL
COST

VENDOR
COST
```

---

# 181. Resource Boundary

```text id="rcl-cap-172"
RESOURCE
ESTIMATE
≠
RESOURCE
ALLOCATION
```

---

# 182. Budget Awareness Capability

Research systems may estimate:

```text id="rcl-cap-173"
COST
PER
RUN

COST
PER
PROGRAM

COST
PER
MODEL

COST
PER
AGENT

COST
PER
BENCHMARK

COST
PER
PROTOTYPE
```

---

# 183. Budget Boundary

Permanent:

```text id="rcl-cap-174"
BUDGET
ESTIMATE
≠
SPEND
AUTHORIZATION
```

---

# 184. Research Quality Capability

Target quality controls:

```text id="rcl-cap-175"
QUESTION
QUALITY

METHOD
QUALITY

SOURCE
QUALITY

EVIDENCE
QUALITY

PROVENANCE

REPRODUCIBILITY

COUNTER-
EVIDENCE

LIMITATIONS

REVIEW

SECURITY

ETHICS
```

---

# 185. Research Quality Gate Capability

High-impact outputs may require explicit gates before being considered validated.

Potential:

```text id="rcl-cap-176"
SOURCE
GATE

METHOD
GATE

EVIDENCE
GATE

REPLICATION
GATE

SECURITY
GATE

ETHICS
GATE

HUMAN
REVIEW
GATE
```

---

# 186. Quality Boundary

```text id="rcl-cap-177"
QUALITY
CHECKLIST
PASS
≠
TRUTH
PROVEN
```

---

# 187. Research Limitation Capability

Every material Research Result should support explicit limitations.

Examples:

```text id="rcl-cap-178"
SMALL
SAMPLE

NARROW
DOMAIN

SHORT
TIMEFRAME

MODEL-SPECIFIC

DATASET-SPECIFIC

SIMULATION-ONLY

UNREPLICATED

POSSIBLE
BIAS

UNKNOWN
GENERALIZATION
```

---

# 188. Uncertainty Capability

Research should support uncertainty states rather than forcing binary answers.

Potential:

```text id="rcl-cap-179"
LOW
UNCERTAINTY

MODERATE
UNCERTAINTY

HIGH
UNCERTAINTY

UNKNOWN

CONTESTED
```

with detailed definitions elsewhere.

---

# 189. Uncertainty Boundary

```text id="rcl-cap-180"
HIGH
CONFIDENCE
≠
CERTAINTY
```

---

# 190. Research Result Capability

A result should conceptually contain:

```yaml id="rcl-cap-181"
research_result:
  result_id: required

  research_ref: required
  experiment_ref: conditional
  benchmark_ref: conditional

  observation_refs: []
  evidence_refs: []
  counter_evidence_refs: []

  limitation_refs: []

  conclusion_ref: required
  confidence_state: required

  review_status: required

  transfer_status: conditional
```

---

# 191. Research Result State Capability

Potential:

```text id="rcl-cap-182"
PRELIMINARY

UNDER
REVIEW

SUPPORTED

PARTIALLY
SUPPORTED

INCONCLUSIVE

NOT
SUPPORTED

INVALIDATED

REPLICATED

TRANSFER
READY

ARCHIVED
```

---

# 192. Result Boundary

```text id="rcl-cap-183"
RESULT
SUPPORTED
≠
UNIVERSALLY
TRUE
```

---

# 193. Negative Result Capability

The Research Lab should retain useful negative and inconclusive findings.

---

# 194. Negative Result Boundary

```text id="rcl-cap-184"
HYPOTHESIS
REJECTED
≠
RESEARCH
FAILED
```

---

# 195. Research Failure Capability

The system should recognize:

```text id="rcl-cap-185"
METHOD
FAILURE

DATASET
FAILURE

MODEL
FAILURE

TOOL
FAILURE

PLATFORM
FAILURE

AUTHORIZATION
FAILURE

SECURITY
FAILURE

UNKNOWN
OUTCOME
```

---

# 196. Failure Learning Capability

```text id="rcl-cap-186"
FAILURE

↓

ROOT
CAUSE

↓

LEARNING

↓

KNOWLEDGE

↓

PREVENTION /
BETTER
METHOD
```

---

# 197. Retry Capability

Research operations may retry technically failed runs while preserving scientific integrity.

---

# 198. Retry Boundary

```text id="rcl-cap-187"
RETRY
ALLOWED
TECHNICALLY
≠
RETRY
VALID
SCIENTIFICALLY
```

---

# 199. HALT Capability

The Research Lab should support immediate HALT for:

```text id="rcl-cap-188"
SECURITY
EVENT

AUTHORITY
FAILURE

PROJECT
LEAKAGE

TENANT
LEAKAGE

DATA
INTEGRITY
FAILURE

CRITICAL
ETHICS
ISSUE

UNCONTROLLED
COST

UNSAFE
PROTOTYPE

EVIDENCE
FABRICATION

UNKNOWN
CRITICAL
SIDE
EFFECT
```

---

# 200. HALT Boundary

```text id="rcl-cap-189"
HALT
TRIGGERED
≠
SYSTEM
FAILED
PERMANENTLY
```

---

# 201. Resume Capability

Resume should require:

```text id="rcl-cap-190"
CAUSE
UNDERSTOOD

CONTAINMENT

STATE
RECONCILIATION

AUTHORITY
REVALIDATION

REVIEW
WHERE
REQUIRED
```

---

# 202. Resume Boundary

Permanent:

```text id="rcl-cap-191"
ISSUE
FIXED
≠
RESUME
AUTHORIZED
```

---

# 203. Recovery Capability

Research Lab should eventually recover:

```text id="rcl-cap-192"
REGISTRY
STATE

EXPERIMENT
STATE

BENCHMARK
STATE

RESULT
STATE

AUDIT

EVIDENCE

DATASET
METADATA
```

where governed.

---

# 204. Archival Capability

Research artifacts should be archivable while preserving appropriate traceability.

---

# 205. Retention Capability

Retention decisions should consider:

```text id="rcl-cap-193"
REPRODUCIBILITY

LEGAL

PRIVACY

SECURITY

AUDIT

VALUE

COST

IP
```

---

# 206. Deletion Boundary

```text id="rcl-cap-194"
RESEARCH
RECORD
DELETED
≠
ALL
COPIES
ERASED
AUTOMATICALLY
```

---

# 207. Research Search Capability

Authorized users and Agents should eventually search:

```text id="rcl-cap-195"
QUESTIONS

PROGRAMS

EXPERIMENTS

DATASETS

BENCHMARKS

RESULTS

PUBLICATIONS

MODEL
PROFILES

AGENT
PROFILES

PROMPT
PROFILES

TECHNOLOGY
RADAR

KNOWLEDGE
TRANSFERS
```

---

# 208. Search Boundary

```text id="rcl-cap-196"
SEARCH
RESULT
VISIBLE
≠
UNDERLYING
ARTIFACT
ACCESS
AUTHORIZED
```

---

# 209. Research Recommendation Capability

Research systems may propose:

```text id="rcl-cap-197"
CONTINUE

STOP

REPLICATE

EXPAND

NARROW

PROTOTYPE

TRANSFER

REJECT

MONITOR

RESEARCH
FURTHER
```

---

# 210. Recommendation Boundary

Permanent:

```text id="rcl-cap-198"
RECOMMENDATION
≠
DECISION
```

---

# 211. Founder Escalation Capability

Founder-reserved matters should be routed explicitly where required.

---

# 212. Founder Boundary

Permanent:

```text id="rcl-cap-199"
ROUTED
TO
FOUNDER
≠
APPROVED
BY
FOUNDER
```

---

# 213. Silence Boundary

```text id="rcl-cap-200"
NO
RESPONSE
≠
APPROVAL
```

---

# 214. Research Capability Dependency Model

A mature capability stack should generally depend on:

```text id="rcl-cap-201"
GOVERNANCE

↓

IDENTITY /
AUTHORIZATION

↓

REGISTRY

↓

EVIDENCE /
PROVENANCE

↓

DATASETS

↓

EXPERIMENTS /
BENCHMARKS

↓

AI /
AGENT /
MODEL /
PROMPT
RESEARCH

↓

SIMULATIONS /
PROTOTYPES /
INNOVATION

↓

VALIDATION

↓

KNOWLEDGE
TRANSFER

↓

MONITORING /
LEARNING
```

---

# 215. Capability Dependency Boundary

```text id="rcl-cap-202"
DEPENDENCY
DOCUMENTED
≠
DEPENDENCY
IMPLEMENTED
```

---

# 216. Reusable Core Capability Principle

Research Lab should avoid separate copies of common infrastructure inside every Research domain.

Shared capabilities should include:

```text id="rcl-cap-203"
AUTHORIZATION

REGISTRY

EVIDENCE

DATASETS

EXPERIMENTS

BENCHMARKS

AUDIT

OBSERVABILITY

KNOWLEDGE
TRANSFER
```

where suitable.

---

# 217. Domain-Specific Capability Principle

Specialized Research domains should extend Core capabilities with domain-specific methods.

---

# 218. Capability Reuse Boundary

```text id="rcl-cap-204"
SHARED
CAPABILITY
≠
SHARED
DOMAIN
TRUTH
```

---

# 219. Academic Research Domain Capability Mapping

`academic-research/` should primarily use:

```text id="rcl-cap-205"
SOURCE
DISCOVERY

LITERATURE
REVIEW

EVIDENCE

CITATIONS

SYNTHESIS

REPLICATION
```

---

# 220. Agent Research Domain Capability Mapping

`agent-research/` should primarily use:

```text id="rcl-cap-206"
AGENT
PROFILES

EXPERIMENTS

BENCHMARKS

TOOLS

MODELS

PROMPTS

MEMORY

AUTONOMY
RESEARCH

FAILURE
ANALYSIS
```

---

# 221. AI Research Domain Capability Mapping

`ai-research/` should provide broad AI Research capability and coordinate with specialized Model, LLM, Agent and Prompt domains.

---

# 222. Architecture Domain Capability Mapping

`architecture/` should primarily use:

```text id="rcl-cap-207"
ALTERNATIVE
DESIGN

PROTOTYPE

BENCHMARK

SIMULATION

TRADEOFF
ANALYSIS
```

---

# 223. Benchmarking Domain Capability Mapping

`benchmarking/` should define specialized Benchmark methods, suites, scoring and regression practices.

---

# 224. Collaboration Domain Capability Mapping

`collaboration/` should define controlled research-sharing and partner collaboration capability.

---

# 225. Competitive Intelligence Domain Capability Mapping

`competitive-intelligence/` should combine:

```text id="rcl-cap-208"
SOURCE
RESEARCH

EVIDENCE

COMPARISON

SIGNAL
TRACKING

INTELLIGENCE
HANDOFF
```

---

# 226. Datasets Domain Capability Mapping

`datasets/` should own detailed Research Dataset capability contracts.

---

# 227. Ethics Domain Capability Mapping

`ethics/` should own detailed Research Ethics assessment and escalation methods.

---

# 228. Experiments Domain Capability Mapping

`experiments/` should own detailed experiment design and execution capabilities.

---

# 229. Future Technologies Domain Capability Mapping

`future-technologies/` should support exploratory technology research and optionality.

---

# 230. Governance Domain Capability Mapping

`governance/` should provide detailed policies, authority and governance mechanisms beneath root Research Governance.

---

# 231. Innovation Lab Capability Mapping

`innovation-lab/` should primarily combine:

```text id="rcl-cap-209"
RESEARCH
RESULTS

IDEA
MANAGEMENT

PROTOTYPES

EXPERIMENTS

VALUE
HYPOTHESES

TRANSFER
```

---

# 232. Knowledge Transfer Domain Capability Mapping

`knowledge-transfer/` should own detailed transfer packages, gates and outcome feedback.

---

# 233. LLM Research Domain Capability Mapping

`llm-research/` should combine:

```text id="rcl-cap-210"
MODELS

PROMPTS

CONTEXT

TOOLS

RETRIEVAL

MEMORY

BENCHMARKS

SAFETY

COST
```

---

# 234. Market Research Domain Capability Mapping

`market-research/` should focus on customer, demand, segment, pricing and market evidence capabilities.

---

# 235. Model Evaluation Domain Capability Mapping

`model-evaluation/` should own detailed Model testing, comparison and profiling.

---

# 236. Monitoring Domain Capability Mapping

`monitoring/` should own Research Lab monitoring, observability and operational-health capabilities.

---

# 237. Patents Domain Capability Mapping

`patents/` should support invention identification, prior-art research and IP workflow handoff.

---

# 238. Prompt Research Domain Capability Mapping

`prompt-research/` should own detailed Prompt experimentation, evaluation, Security and optimization methods.

---

# 239. Prototypes Domain Capability Mapping

`prototypes/` should own prototype lifecycle, isolation, testing and transfer boundaries.

---

# 240. Publications Domain Capability Mapping

`publications/` should own internal and external publication workflow capabilities.

---

# 241. Research Strategy Domain Capability Mapping

`research-strategy/` should own detailed portfolio, program and strategic Research management.

---

# 242. Security Domain Capability Mapping

`security/` should define specialized Research Security controls.

---

# 243. Simulations Domain Capability Mapping

`simulations/` should own scenario, simulation environment, assumption, model and validation capabilities.

---

# 244. Technology Radar Domain Capability Mapping

`technology-radar/` should own technology sensing, registry, classification and review capabilities.

---

# 245. Templates Domain Capability Mapping

`templates/` should provide reusable artifact structures for the Research capabilities.

---

# 246. Research Capability Service Model

Conceptually, capabilities may eventually be provided through reusable services:

```text id="rcl-cap-211"
RESEARCH
INTAKE
SERVICE

RESEARCH
REGISTRY
SERVICE

EVIDENCE
SERVICE

DATASET
SERVICE

EXPERIMENT
SERVICE

BENCHMARK
SERVICE

MODEL
EVALUATION
SERVICE

AGENT
RESEARCH
SERVICE

SIMULATION
SERVICE

KNOWLEDGE
TRANSFER
SERVICE

AUDIT
SERVICE
```

This does not establish actual deployed services.

---

# 247. API Capability

Future Research APIs should support:

```text id="rcl-cap-212"
AUTHENTICATED

AUTHORIZED

SCOPED

VERSIONED

AUDITABLE

RATE-LIMITED
WHERE
REQUIRED

PROJECT-AWARE

TENANT-AWARE
```

operations.

---

# 248. API Boundary

```text id="rcl-cap-213"
API
CAPABILITY
DEFINED
≠
API
IMPLEMENTED
```

---

# 249. Event Capability

Research Lab may eventually publish governed events such as:

```text id="rcl-cap-214"
RESEARCH_REQUESTED

RESEARCH_AUTHORIZED

EXPERIMENT_STARTED

EXPERIMENT_COMPLETED

BENCHMARK_COMPLETED

RESULT_CREATED

RESULT_REVIEWED

RESULT_VALIDATED

TRANSFER_PROPOSED

RESEARCH_HALTED
```

---

# 250. Event Boundary

```text id="rcl-cap-215"
EVENT
RECEIVED
≠
DOWNSTREAM
ACTION
AUTHORIZED
```

---

# 251. Research Notification Capability

Authorized stakeholders may receive:

```text id="rcl-cap-216"
REVIEW
REQUESTS

HIGH-RISK
ALERTS

EXPERIMENT
FAILURES

BENCHMARK
REGRESSIONS

SECURITY
EVENTS

TRANSFER
REQUESTS

STALE
RESEARCH
ALERTS
```

---

# 252. Notification Boundary

```text id="rcl-cap-217"
NOTIFICATION
SENT
≠
REVIEW
COMPLETED
```

---

# 253. Research Reporting Capability

Potential reports:

```text id="rcl-cap-218"
PROGRAM
REPORT

EXPERIMENT
REPORT

BENCHMARK
REPORT

MODEL
EVALUATION
REPORT

AGENT
EVALUATION
REPORT

PORTFOLIO
REPORT

TECHNOLOGY
RADAR
REPORT

KNOWLEDGE
TRANSFER
REPORT
```

---

# 254. Reporting Boundary

```text id="rcl-cap-219"
REPORT
GENERATED
≠
REPORT
VALIDATED
```

---

# 255. Research Dashboard Capability

Different roles may eventually have scoped views.

Potential:

```text id="rcl-cap-220"
FOUNDER
VIEW

EXECUTIVE
VIEW

RESEARCH
LEADER
VIEW

PROGRAM
OWNER
VIEW

RESEARCHER
VIEW

SECURITY
VIEW

AUDITOR
VIEW
```

---

# 256. Dashboard Authority Boundary

```text id="rcl-cap-221"
VISIBLE
ON
DASHBOARD
≠
AUTHORIZED
TO
CHANGE
```

---

# 257. Research Search and Retrieval Capability

Search should eventually support:

```text id="rcl-cap-222"
KEYWORD

SEMANTIC

STRUCTURED
FILTER

DOMAIN

PROJECT

TENANT

DATE

STATUS

MODEL

AGENT

DATASET

EVIDENCE
QUALITY
```

subject to access control.

---

# 258. Knowledge Discovery Capability

The Research Lab may identify links across:

```text id="rcl-cap-223"
QUESTIONS

RESULTS

FAILURES

DATASETS

MODELS

AGENTS

MARKETS

TECHNOLOGIES

INDUSTRIES
```

without assuming correlation implies causation.

---

# 259. Pattern Boundary

```text id="rcl-cap-224"
PATTERN
DETECTED
≠
CAUSAL
RELATIONSHIP
PROVEN
```

---

# 260. Research Gap Detection Capability

The Research Lab should eventually identify:

```text id="rcl-cap-225"
MISSING
EVIDENCE

UNTESTED
ASSUMPTIONS

STALE
KNOWLEDGE

UNREPLICATED
RESULTS

UNBENCHMARKED
CAPABILITIES

UNKNOWN
FAILURE
MODES
```

---

# 261. Gap Boundary

```text id="rcl-cap-226"
GAP
DETECTED
≠
NEW
PROGRAM
AUTHORIZED
```

---

# 262. Research Deduplication Capability

The system should detect potentially duplicate:

```text id="rcl-cap-227"
QUESTIONS

EXPERIMENTS

BENCHMARKS

DATASETS

PROTOTYPES

RESEARCH
PROGRAMS
```

---

# 263. Deduplication Boundary

```text id="rcl-cap-228"
SIMILAR
QUESTION
≠
DUPLICATE
QUESTION
AUTOMATICALLY
```

---

# 264. Research Freshness Capability

The system should identify Research outputs that may need revalidation due to:

```text id="rcl-cap-229"
MODEL
CHANGE

MARKET
CHANGE

TECHNOLOGY
CHANGE

DATASET
CHANGE

REGULATION
CHANGE

SYSTEM
CHANGE

TIME
```

---

# 265. Freshness Boundary

```text id="rcl-cap-230"
OLD
RESEARCH
≠
INVALID
RESEARCH
AUTOMATICALLY
```

---

# 266. Research Supersession Capability

New research may supersede earlier findings while preserving history.

---

# 267. Supersession Boundary

```text id="rcl-cap-231"
NEWER
≠
BETTER
AUTOMATICALLY
```

---

# 268. Research Version Comparison Capability

Researchers should eventually compare changes between:

```text id="rcl-cap-232"
HYPOTHESES

METHODS

DATASETS

BENCHMARKS

MODELS

PROMPTS

AGENTS

RESULTS

CONCLUSIONS
```

---

# 269. Research Learning Capability

The Research Lab should learn from both:

```text id="rcl-cap-233"
SUCCESS

AND

FAILURE
```

---

# 270. Research Value Tracking Capability

Research value may eventually be connected to:

```text id="rcl-cap-234"
COST
AVOIDANCE

TIME
SAVED

QUALITY
IMPROVEMENT

RELIABILITY
IMPROVEMENT

PRODUCT
VALUE

CUSTOMER
VALUE

SECURITY
RISK
REDUCTION

PLATFORM
REUSE
```

---

# 271. Value Boundary

```text id="rcl-cap-235"
RESEARCH
FOLLOWED
BY
VALUE
≠
RESEARCH
CAUSED
ALL
VALUE
```

---

# 272. Research Capacity Capability

Future systems should understand available:

```text id="rcl-cap-236"
HUMAN
CAPACITY

AI
AGENT
CAPACITY

MODEL
CAPACITY

COMPUTE
CAPACITY

EXPERIMENT
CAPACITY

BENCHMARK
CAPACITY
```

---

# 273. Capacity Boundary

```text id="rcl-cap-237"
CAPACITY
AVAILABLE
≠
CAPACITY
ALLOCATED
```

---

# 274. Research Capability Verification Model

Each material capability should move through:

```text id="rcl-cap-238"
CAPABILITY
DOCUMENTED

↓

CAPABILITY
DESIGNED

↓

CAPABILITY
IMPLEMENTED

↓

CAPABILITY
TESTED

↓

CAPABILITY
VERIFIED

↓

CONTROLLED
PILOT

↓

SEPARATE
PRODUCTION
AUTHORIZATION
```

---

# 275. Capability Verification Evidence

Possible evidence types:

```text id="rcl-cap-239"
CODE

CONFIGURATION

DATABASE
SCHEMA

API
CONTRACT

TEST
RESULT

SECURITY
TEST

ISOLATION
TEST

AUDIT
TRACE

OBSERVABILITY
EVIDENCE

CONTROLLED
PILOT
RESULT
```

---

# 276. Verification Hard Rule

```text id="rcl-cap-240"
DOCUMENT
CHECKBOX
≠
VERIFICATION
EVIDENCE
```

---

# 277. Positive Capability Verification Scenarios

Future verification should include at least:

```text id="rcl-cap-241"
RC-01
RESEARCH
INTAKE
REGISTERED

RC-02
QUESTION
VERSIONED

RC-03
UNAUTHORIZED
RESEARCH
DENIED

RC-04
PROJECT
SCOPE
PRESERVED

RC-05
TENANT
SCOPE
PRESERVED

RC-06
SOURCE
PROVENANCE
RECORDED

RC-07
FABRICATED
CITATION
REJECTED /
FLAGGED

RC-08
COUNTER-
EVIDENCE
PRESERVED

RC-09
DATASET
VERSION
BOUND

RC-10
EXPERIMENT
CONFIGURATION
FROZEN

RC-11
EXPERIMENT
RESULT
TRACEABLE

RC-12
REPLICATION
LINKED

RC-13
BENCHMARK
VERSIONED

RC-14
MODEL
EVALUATION
TASK-SPECIFIC

RC-15
PROMPT
RESEARCH
DOES
NOT
AUTO-DEPLOY

RC-16
AGENT
RESEARCH
DOES
NOT
EXPAND
AUTHORITY

RC-17
SIMULATION
LABELED
AS
SIMULATION

RC-18
PROTOTYPE
ISOLATED

RC-19
KNOWLEDGE
TRANSFER
REQUIRES
SEPARATE
TARGET
AUTHORITY

RC-20
PUBLICATION
REVIEW
BOUNDARY
PRESERVED

RC-21
PROJECT A
CANNOT
ACCESS
PROJECT B

RC-22
TENANT A
CANNOT
ACCESS
TENANT B

RC-23
PROMPT
INJECTION
DOES
NOT
GAIN
AUTHORITY

RC-24
HALT
AVAILABLE

RC-25
RESUME
REQUIRES
REVALIDATION

RC-26
AUDIT
TRACE
AVAILABLE

RC-27
COST
ATTRIBUTION
AVAILABLE

RC-28
RESEARCH
FAILURE
DOES
NOT
BECOME
FALSE
SUCCESS

RC-29
PILOT
PASS
DOES
NOT
AUTO-PROMOTE

RC-30
FOUNDER
ROUTING
DOES
NOT
BECOME
FOUNDER
APPROVAL
```

---

# 278. Negative Capability Verification Scenarios

Containment should be verified when:

* unauthorized actor submits a high-risk Research action.
* user-controlled Project ID attempts to override trusted scope.
* Tenant A requests Tenant B evidence.
* Research Agent invents a source.
* Research Agent invents a citation.
* supporting evidence is present but Counter-Evidence is hidden.
* Dataset provenance is unavailable.
* Data license does not permit proposed use.
* Model version changes during a Benchmark.
* Prompt changes silently during a comparison.
* Agent configuration changes without versioning.
* tool requests broader permissions than authorized.
* experiment receives Production credentials.
* simulation output is represented as real-world evidence.
* prototype requests Production dependency access.
* Research recommendation is represented as Product approval.
* Knowledge Transfer directly edits Production.
* Technology Radar `ADOPT` is represented as procurement authority.
* external source attempts Prompt Injection.
* content claims Founder authorization without trusted evidence.
* failed Research run is marked successful.
* retry changes scientific configuration.
* HALT occurs and automatic resume is attempted.
* audit evidence is missing.
* controlled Pilot result is represented as Production authorization.

---

# 279. Capability Maturity Model

Conceptual:

```text id="rcl-cap-242"
RCM0
=
CAPABILITY
CATALOG
DOCUMENTED

RCM1
=
CORE
CAPABILITY
BOUNDARIES
DEFINED

RCM2
=
GOVERNANCE /
REGISTRY /
EVIDENCE /
DATASET
CAPABILITIES
DESIGNED

RCM3
=
EXPERIMENT /
REPRODUCIBILITY /
BENCHMARK
CAPABILITIES
IMPLEMENTED

RCM4
=
MODEL /
LLM /
PROMPT
RESEARCH
CAPABILITIES
IMPLEMENTED

RCM5
=
AGENT /
MULTI-AGENT /
SIMULATION /
PROTOTYPE
CAPABILITIES
IMPLEMENTED

RCM6
=
MARKET /
RADAR /
INNOVATION /
TRANSFER
CAPABILITIES
INTEGRATED

RCM7
=
SECURITY /
PRIVACY /
PROJECT /
TENANT /
AUDIT
CAPABILITIES
VERIFIED

RCM8
=
CONTROLLED
AI-NATIVE
RESEARCH
CAPABILITY
PILOT
VERIFIED

RCM9
=
PRODUCTION
RESEARCH
CAPABILITIES
SEPARATELY
AUTHORIZED
```

---

# 280. Maturity Boundary

Permanent:

```text id="rcl-cap-243"
RCM8
≠
RCM9
```

---

# 281. Capability Documentation Checklist

## Research Foundation

* [x] Research Intake capability defined.
* [x] Question Management capability defined.
* [x] Research Program capability defined.
* [x] Portfolio capability defined.
* [x] Prioritization capability defined.

## Sources and Evidence

* [x] Academic Research capability defined.
* [x] Literature Research capability defined.
* [x] Source Classification capability defined.
* [x] Citation Verification capability defined.
* [x] Evidence Management capability defined.
* [x] Counter-Evidence capability defined.
* [x] Provenance capability defined.

## Research Design

* [x] Hypothesis capability defined.
* [x] Method capability defined.
* [x] Dataset capability defined.
* [x] Synthetic Data capability defined.

## Execution

* [x] Experiment capability defined.
* [x] Reproducibility capability defined.
* [x] Replication capability defined.
* [x] Benchmark capability defined.
* [x] Simulation capability defined.
* [x] Prototype capability defined.

## AI Research

* [x] Model Evaluation capability defined.
* [x] LLM Research capability defined.
* [x] Prompt Research capability defined.
* [x] Agent Research capability defined.
* [x] Multi-Agent Research capability defined.
* [x] Tool Research capability defined.
* [x] Automation Research capability defined.

## Enterprise Research

* [x] Architecture Research capability defined.
* [x] Market Research capability defined.
* [x] Competitive Intelligence capability defined.
* [x] Future Technology capability defined.
* [x] Technology Radar capability defined.
* [x] Innovation capability defined.
* [x] Knowledge Transfer capability defined.

## Publication and IP

* [x] Publication capability defined.
* [x] Patent/IP capability defined.
* [x] Collaboration capability defined.

## Integration

* [x] Research Memory capability defined.
* [x] Knowledge integration capability defined.
* [x] Intelligence Engine integration defined.

## Operations

* [x] Monitoring capability defined.
* [x] Metrics capability defined.
* [x] Audit capability defined.
* [x] Lineage capability defined.
* [x] Search capability defined.
* [x] Reporting capability defined.
* [x] Research Operations capability defined.
* [x] Cost awareness capability defined.
* [x] Capacity awareness capability defined.

## Governance and Safety

* [x] Security capability defined.
* [x] Sandbox capability defined.
* [x] Prompt Injection defense defined.
* [x] Authority Injection defense defined.
* [x] Privacy capability defined.
* [x] Ethics capability defined.
* [x] Legal routing capability defined.
* [x] Project isolation defined.
* [x] Tenant isolation defined.

## AI-Native Research

* [x] Human-AI collaboration defined.
* [x] bounded autonomous Research capability defined.
* [x] Research self-improvement boundary defined.
* [x] independent AI review defined.

## Resilience

* [x] failure handling defined.
* [x] retry boundary defined.
* [x] HALT capability defined.
* [x] Resume controls defined.
* [x] Recovery capability defined.
* [x] retention and deletion boundaries defined.

## Verification

* [x] verification model defined.
* [x] positive scenarios defined.
* [x] negative scenarios defined.
* [x] maturity model defined.
* [x] Runtime Truth defined.
* [x] Production hard stops defined.

---

# 282. Capability Inventory Truth

This document defines the target capability inventory for the Research Lab.

It does not establish that all capability-specific files already exist inside the specialized Research folders.

Permanent:

```text id="rcl-cap-244"
CAPABILITY
DEFINED
HERE
≠
SPECIALIZED
FILE
EXISTS
```

---

# 283. Repository Evidence Boundary

The established Research Lab structure contains:

```text id="rcl-cap-245"
doc/26-research-lab/research-capabilities.md
```

and the specialized domain folders referenced by this document.

Their detailed internal inventories require separate repository evidence.

---

# 284. Repository Save Boundary

This document is generated for:

```text id="rcl-cap-246"
doc/26-research-lab/research-capabilities.md
```

Permanent:

```text id="rcl-cap-247"
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

# 285. Current Documentation Truth

```text id="rcl-cap-248"
RESEARCH_LAB_README
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_INDEX
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_VISION
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_STRATEGY
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_ARCHITECTURE
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_CAPABILITIES
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 286. Current Runtime Truth

Nothing in this document independently proves that the listed capabilities exist at runtime.

```text id="rcl-cap-249"
RESEARCH_INTAKE_RUNTIME
=
NOT_PROVEN

RESEARCH_REGISTRY_RUNTIME
=
NOT_PROVEN

QUESTION_MANAGEMENT_RUNTIME
=
NOT_PROVEN

PROGRAM_MANAGEMENT_RUNTIME
=
NOT_PROVEN

EVIDENCE_RUNTIME
=
NOT_PROVEN

PROVENANCE_RUNTIME
=
NOT_PROVEN

DATASET_RUNTIME
=
NOT_PROVEN

EXPERIMENT_RUNTIME
=
NOT_PROVEN

REPRODUCIBILITY_RUNTIME
=
NOT_PROVEN

BENCHMARK_RUNTIME
=
NOT_PROVEN

MODEL_EVALUATION_RUNTIME
=
NOT_PROVEN

LLM_RESEARCH_RUNTIME
=
NOT_PROVEN

PROMPT_RESEARCH_RUNTIME
=
NOT_PROVEN

AGENT_RESEARCH_RUNTIME
=
NOT_PROVEN

MULTI_AGENT_RESEARCH_RUNTIME
=
NOT_PROVEN

TOOL_RESEARCH_RUNTIME
=
NOT_PROVEN

SIMULATION_RUNTIME
=
NOT_PROVEN

PROTOTYPE_RUNTIME
=
NOT_PROVEN

MARKET_RESEARCH_RUNTIME
=
NOT_PROVEN

TECHNOLOGY_RADAR_RUNTIME
=
NOT_PROVEN

INNOVATION_RUNTIME
=
NOT_PROVEN

KNOWLEDGE_TRANSFER_RUNTIME
=
NOT_PROVEN

RESEARCH_MEMORY_RUNTIME
=
NOT_PROVEN

RESEARCH_MONITORING_RUNTIME
=
NOT_PROVEN

RESEARCH_AUDIT_RUNTIME
=
NOT_PROVEN

AI_NATIVE_RESEARCH_RUNTIME
=
NOT_PROVEN

PROJECT_ISOLATION_RUNTIME
=
NOT_PROVEN

TENANT_ISOLATION_RUNTIME
=
NOT_PROVEN

PRODUCTION_RESEARCH_CAPABILITIES
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 287. Approval Truth

```text id="rcl-cap-250"
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

CANONICAL
=
NO

CAPABILITIES
IMPLEMENTED
=
NOT_PROVEN

CAPABILITIES
TESTED
=
NOT_PROVEN

CAPABILITIES
VERIFIED
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 288. Production Hard Stops

Production Research capabilities must remain blocked where applicable if:

```text id="rcl-cap-251"
AUTHORIZATION
MISSING

RESEARCH
CONTROL
PLANE
UNVERIFIED

TRUSTED
PROJECT
SCOPE
MISSING

TRUSTED
TENANT
SCOPE
MISSING

DATASET
AUTHORITY
UNKNOWN

DATASET
PROVENANCE
UNKNOWN

EVIDENCE
TRACEABILITY
UNVERIFIED

EXPERIMENT
CONFIGURATION
INTEGRITY
UNVERIFIED

BENCHMARK
INTEGRITY
UNVERIFIED

MODEL
IDENTITY
UNVERIFIED

PROMPT
IDENTITY
UNVERIFIED

AGENT
IDENTITY
UNVERIFIED

PROJECT
ISOLATION
UNVERIFIED

TENANT
ISOLATION
UNVERIFIED

PROMPT
INJECTION
DEFENSE
UNVERIFIED

AUTHORITY
INJECTION
DEFENSE
UNVERIFIED

SECRET
HANDLING
UNVERIFIED

SANDBOX
CONTROLS
UNVERIFIED

PROTOTYPE
ISOLATION
UNVERIFIED

AUDIT
INTEGRITY
UNVERIFIED

HALT
UNVERIFIED

RECOVERY
UNVERIFIED

SECURITY
REVIEW
MISSING

PRIVACY
REVIEW
MISSING
WHERE
REQUIRED

ETHICS
REVIEW
MISSING
WHERE
REQUIRED

LEGAL /
IP
REVIEW
MISSING
WHERE
REQUIRED

PRODUCTION
AUTHORIZATION
MISSING
```

---

# 289. Permanent Capability Invariants

```text id="rcl-cap-252"
CAPABILITY
DEFINED
≠
CAPABILITY
IMPLEMENTED

CAPABILITY
IMPLEMENTED
≠
CAPABILITY
AUTHORIZED
FOR
EVERYONE

RESEARCH
INTAKE
≠
RESEARCH
APPROVAL

QUESTION
≠
ANSWER

HYPOTHESIS
≠
FACT

SOURCE
FOUND
≠
SOURCE
TRUSTED

CITATION
GENERATED
≠
CITATION
VERIFIED

EVIDENCE
STORED
≠
EVIDENCE
VALID

HIGH
CONFIDENCE
≠
CERTAINTY

DATASET
AVAILABLE
≠
DATASET
AUTHORIZED

EXPERIMENT
COMPLETED
≠
HYPOTHESIS
PROVEN

REPLICATION
SUCCESS
≠
UNIVERSAL
GENERALIZATION

BENCHMARK
WINNER
≠
PRODUCTION
WINNER

MODEL
EVALUATED
≠
MODEL
DEPLOYED

PROMPT
RESEARCH
WINNER
≠
PROMPT OS
CHANGE
AUTHORIZED

AGENT
CAPABILITY
PROVEN
≠
AGENT
AUTHORITY
EXPANDED

MULTI-AGENT
CONSENSUS
≠
TRUTH

TOOL
WORKS
≠
TOOL
PRODUCTION
AUTHORIZED

AUTOMATION
≠
AUTHORITY

SIMULATION
≠
REAL-WORLD
PROOF

PROTOTYPE
≠
PRODUCT

ARCHITECTURE
RESEARCH
≠
ARCHITECTURE
DECISION

MARKET
SIGNAL
≠
MARKET
CERTAINTY

COMPETITOR
CLAIM
≠
VERIFIED
FACT

RADAR
ADOPT
≠
DEPLOYMENT
AUTHORITY

INNOVATION
CANDIDATE
≠
PRODUCT
APPROVAL

RESEARCH
TRANSFER
≠
IMPLEMENTATION
AUTHORIZATION

PUBLICATION
READY
≠
PUBLICATION
AUTHORIZED

POTENTIAL
PATENT
≠
PATENT
GRANTED

RESEARCH
MEMORY
≠
CURRENT
TRUTH

MONITORING
≠
CORRECTNESS

METRIC
≠
TRUTH

AUDIT
LOG
≠
AUDIT
INTEGRITY

PROJECT A
RESEARCH
≠
PROJECT B
DATA
AUTHORITY

TENANT A
RESEARCH
≠
TENANT B
VISIBILITY

SHARED
INFRASTRUCTURE
≠
SHARED
AUTHORITY

AI
CAN
PROPOSE
≠
AI
CAN
SELF-AUTHORIZE

SELF-
IMPROVEMENT
≠
SELF-
DEPLOYMENT

FAILED
EXPERIMENT
≠
FAILED
RESEARCH

ISSUE
RESOLVED
≠
RESUME
AUTHORIZED

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

CONTROLLED
PILOT
SUCCESS
≠
PRODUCTION
AUTHORIZATION

RCM8
≠
RCM9

DOCUMENTED
≠
IMPLEMENTED

IMPLEMENTED
≠
TESTED

TESTED
≠
VERIFIED

VERIFIED
≠
PRODUCTION
AUTHORIZED
```

---

# 290. Changelog Entry

Append during future root `CHANGELOG.md` synchronization:

```markdown id="rcl-cap-253"
## RESEARCH-LAB-CHG-20260813-006 — Research Lab Capability Catalog Established

| Field | Value |
|---|---|
| Date | 2026-08-13 |
| Change Type | `CREATED`, `CAPABILITIES`, `RESEARCH-INTAKE`, `EVIDENCE`, `DATASETS`, `EXPERIMENTS`, `BENCHMARKING`, `MODEL-RESEARCH`, `PROMPT-RESEARCH`, `AGENT-RESEARCH`, `SIMULATION`, `INNOVATION`, `KNOWLEDGE-TRANSFER`, `SECURITY`, `RUNTIME-TRUTH` |
| Impact | `I5 — Research Lab Enterprise Capability Foundation` |
| Risk | `R1 — Documentation` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Canonical | `false` |
| Production Authorization | `NOT_AUTHORIZED_BY_THIS_DOCUMENT` |

### Affected Document

`doc/26-research-lab/research-capabilities.md`

### Capability Truth

`RESEARCH_LAB_CAPABILITIES = CONTENT_COMPLETE_FOR_REVIEW`

### Runtime Truth

`RESEARCH_LAB_RUNTIME_CAPABILITIES = NOT_PROVEN`

### Production Truth

`PRODUCTION_RESEARCH_CAPABILITIES = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 291. Final Research Capability Model

The target Research Lab should eventually be capable of:

```text id="rcl-cap-254"
RESEARCH
INTAKE

↓

QUESTION
MANAGEMENT

↓

PRIOR
KNOWLEDGE

↓

SOURCE /
LITERATURE
RESEARCH

↓

EVIDENCE /
PROVENANCE

↓

HYPOTHESIS /
METHOD

↓

DATASET
PREPARATION

↓

EXPERIMENT /
BENCHMARK /
MODEL /
PROMPT /
AGENT /
SIMULATION /
PROTOTYPE
RESEARCH

↓

RESULT

↓

COUNTER-
EVIDENCE

↓

REPLICATION

↓

LIMITATIONS /
UNCERTAINTY

↓

REVIEW /
VALIDATION

↓

KNOWLEDGE
TRANSFER

↓

SEPARATE
ENGINEERING /
PRODUCT /
ARCHITECTURE /
INTELLIGENCE
AUTHORIZATION

↓

IMPLEMENTATION

↓

TESTING

↓

VERIFICATION

↓

SEPARATE
PRODUCTION
AUTHORIZATION

↓

REAL-WORLD
OUTCOME

↓

RESEARCH
MEMORY /
KNOWLEDGE /
NEW
QUESTIONS
```

while permanently preserving:

```text id="rcl-cap-255"
RESEARCH
CAPABILITY
≠
RESEARCH
AUTHORITY

AI
CAPABILITY
≠
FOUNDER
AUTHORITY

EVIDENCE
≠
CERTAINTY

BENCHMARK
≠
DEPLOYMENT

PROTOTYPE
≠
PRODUCT

TRANSFER
≠
IMPLEMENTATION

PILOT
≠
PRODUCTION

DOCUMENTATION
≠
IMPLEMENTATION
```

---

# 292. Next Document

The Research Vision has defined **the desired future state**.

The Research Strategy has defined **how Mianx.ai should progress toward that future state**.

The Research Architecture has defined **how the Research Lab should be structurally organized**.

This Research Capabilities document has now defined **what the Research Lab should eventually be able to do**.

The next root document should define **how a Research item moves end-to-end through the Research Lab**, including intake, question formation, triage, authorization, risk classification, prior-knowledge review, hypothesis creation, method selection, dataset preparation, ethics/Security/privacy review, Experiment/Benchmark/Simulation/Prototype execution, observation, Evidence capture, Counter-Evidence, analysis, replication, limitations, conclusion, review, validation, Knowledge Transfer, archival, feedback, HALT/Resume, failure paths, state transitions, Human/AI responsibilities, Project/Tenant propagation and Runtime Truth.

## NEXT DOCUMENT

```text id="rcl-cap-256"
doc/26-research-lab/research-lifecycle.md
```

---
