---

id: RESEARCH-LAB-LIFECYCLE-001
title: Mianx.ai Research Lab Lifecycle
version: 1.0.0
status: Draft

description: Enterprise-grade end-to-end Research Lifecycle specification for the Mianx.ai Research Lab. This document defines how Research Signals, Requests, Questions, Programs, Hypotheses, Methods, Sources, Evidence, Datasets, Experiments, Benchmarks, Model Evaluations, LLM Research, Prompt Research, Agent Research, Multi-Agent Research, Simulations, Prototypes, Architecture Research, Market Research, Competitive Intelligence, Technology Radar findings, Innovation candidates, Results, Counter-Evidence, Replications, Reviews, Conclusions, Knowledge Transfer packages, Publications, Intellectual Property candidates, archival records, feedback and follow-up Research should move through governed lifecycle states. It defines intake, triage, scope binding, Project and Tenant propagation, authorization, R0-R4 risk classification, A0-A5 autonomy boundaries, prior-knowledge review, hypothesis formation, methodology, planning, Data authorization, Security, privacy, ethics and legal gates, execution, observation, provenance, analysis, uncertainty, limitations, independent review, validation, decision handoff, Knowledge Transfer, implementation separation, real-world outcome feedback, Research Memory, lifecycle monitoring, expiry, revalidation, supersession, cancellation, HALT, Resume, failure, recovery, audit, state transitions, conceptual schemas, positive and negative verification scenarios, maturity levels, Runtime Truth and Production authorization boundaries. It permanently separates intake from authorization, question from conclusion, hypothesis from fact, planning from execution authority, Dataset availability from Dataset permission, experiment completion from proof, benchmark success from Production fitness, simulation from real-world evidence, prototype from Product readiness, review from approval, validation from implementation authorization, Research recommendation from enterprise decision, Knowledge Transfer from target-system mutation, implementation from verification, verified Pilot from Production authorization, Founder routing from Founder approval, silence from approval, and documentation from implementation, testing, verification or Production authorization.

type: Research Lab End-to-End Lifecycle, Research State Machine, Research Workflow Governance Model, Evidence and Validation Lifecycle, Knowledge Transfer Lifecycle, Research Failure and Recovery Lifecycle, Runtime Truth Register, and Production Authorization Boundary

class: Governed target-state Research lifecycle specification defining how Mianx.ai Research activities should progress from initial signal through validated learning and controlled enterprise handoff without asserting that the lifecycle is currently implemented, enforced, tested, verified, canonical or Production authorized

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Research Lifecycle
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
* Market Research
* Competitive Intelligence
* Technology Radar
* Innovation Engineering
* Knowledge Engineering
* Memory Engineering
* Security Engineering
* Quality Engineering
* Verification Engineering
* Audit Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* AI CEO
* C-Suite
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
* ./research-capabilities.md
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

* At Every Material Research Lifecycle Change
* At Every Research Governance Change
* At Every Research State Transition Change
* At Every Research Risk or Autonomy Model Change
* At Every Research Approval Gate Change
* At Every Experiment or Validation Workflow Change
* At Every Knowledge Transfer Workflow Change
* At Every Project or Tenant Isolation Lifecycle Change
* Before Controlled Research Workflow Pilots
* Before Production Research Lifecycle Authorization
* Quarterly During Active Build
* Annually During Stable Operation

## canonical: false

# Mianx.ai Research Lab Lifecycle

> **This document defines the target end-to-end lifecycle for Research conducted through the Mianx.ai Research Lab.**
>
> It defines how an unknown, opportunity, problem or signal should become a governed Research Question; how that Question should be scoped, authorized, investigated, tested and challenged; how Evidence and Counter-Evidence should be preserved; how Results should be reviewed and validated; and how useful findings may become Knowledge Transfer candidates without bypassing Product, Engineering, Architecture, Security, Governance, Founder or Production authority.
>
> **The lifecycle is designed to accelerate learning while preventing Research activity from manufacturing authority.**
>
> This document defines target-state lifecycle behavior. It does not prove that workflow automation or runtime enforcement currently exists.

---

# 1. Lifecycle Objective

The Research Lifecycle should transform:

```text id="rll-001"
SIGNAL /
UNKNOWN /
PROBLEM /
OPPORTUNITY

↓

RESEARCH
QUESTION

↓

AUTHORIZED
RESEARCH

↓

EVIDENCE

↓

LEARNING

↓

VALIDATED
RESEARCH
OUTPUT

↓

CONTROLLED
KNOWLEDGE
TRANSFER

↓

REAL-WORLD
OUTCOME

↓

NEW
LEARNING
```

---

# 2. Full Research Lifecycle

```text id="rll-002"
SIGNAL

↓

INTAKE

↓

TRIAGE

↓

QUESTION
FORMATION

↓

SCOPE
BINDING

↓

PRIORITY /
RISK /
AUTONOMY
CLASSIFICATION

↓

AUTHORIZATION

↓

PRIOR
KNOWLEDGE
REVIEW

↓

RESEARCH
GAP
CONFIRMATION

↓

HYPOTHESIS /
OBJECTIVE

↓

METHOD
SELECTION

↓

RESEARCH
PLAN

↓

DATA /
SOURCE /
TOOL /
MODEL /
PROMPT /
AGENT
SELECTION

↓

SECURITY /
PRIVACY /
ETHICS /
LEGAL /
IP
GATES
AS
REQUIRED

↓

EXECUTION

├── LITERATURE
│   RESEARCH
│
├── EXPERIMENT
│
├── BENCHMARK
│
├── MODEL
│   EVALUATION
│
├── PROMPT
│   RESEARCH
│
├── AGENT
│   RESEARCH
│
├── SIMULATION
│
├── PROTOTYPE
│
├── MARKET
│   RESEARCH
│
└── OTHER
    AUTHORIZED
    METHOD

↓

OBSERVATION

↓

EVIDENCE

↓

COUNTER-
EVIDENCE

↓

ANALYSIS

↓

REPLICATION /
CHALLENGE

↓

LIMITATIONS /
UNCERTAINTY

↓

CONCLUSION

↓

REVIEW

↓

VALIDATION
STATUS

↓

KNOWLEDGE
TRANSFER
CANDIDATE

↓

SEPARATE
TARGET
AUTHORITY

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

FEEDBACK /
REVALIDATION /
NEW
RESEARCH
```

---

# 3. Lifecycle Truth Boundary

Permanent:

```text id="rll-003"
LIFECYCLE
DEFINED
≠
LIFECYCLE
IMPLEMENTED
```

---

# 4. Intake Boundary

```text id="rll-004"
INTAKE
ACCEPTED
≠
RESEARCH
AUTHORIZED
```

---

# 5. Question Boundary

```text id="rll-005"
QUESTION
CREATED
≠
QUESTION
ANSWERED
```

---

# 6. Hypothesis Boundary

```text id="rll-006"
HYPOTHESIS
APPROVED
FOR
TESTING
≠
HYPOTHESIS
TRUE
```

---

# 7. Execution Boundary

```text id="rll-007"
RESEARCH
EXECUTED
≠
RESEARCH
VALIDATED
```

---

# 8. Transfer Boundary

```text id="rll-008"
RESEARCH
VALIDATED
≠
IMPLEMENTATION
AUTHORIZED
```

---

# 9. Production Boundary

Permanent:

```text id="rll-009"
IMPLEMENTATION
VERIFIED
≠
PRODUCTION
AUTHORIZED
```

---

# 10. Lifecycle Stage Model

The lifecycle uses the following target stages:

```text id="rll-010"
L00
SIGNAL

L01
INTAKE

L02
TRIAGE

L03
QUESTION

L04
SCOPE

L05
CLASSIFICATION

L06
AUTHORIZATION

L07
PRIOR
KNOWLEDGE

L08
HYPOTHESIS /
RESEARCH
OBJECTIVE

L09
METHOD

L10
PLAN

L11
INPUT
PREPARATION

L12
CONTROL
GATES

L13
READY
FOR
EXECUTION

L14
EXECUTION

L15
OBSERVATION

L16
EVIDENCE

L17
ANALYSIS

L18
CHALLENGE /
REPLICATION

L19
CONCLUSION

L20
REVIEW

L21
VALIDATION

L22
TRANSFER
CANDIDATE

L23
TARGET
HANDOFF

L24
ARCHIVAL /
MONITORING

L25
REVALIDATION /
NEW
RESEARCH
```

---

# 11. Lifecycle State Separation

Stages indicate Research progress.

They do not automatically indicate authority.

---

# 12. L00 — Research Signal

A Research Lifecycle may begin from:

```text id="rll-011"
UNKNOWN

PROBLEM

INCIDENT

FAILURE

CUSTOMER
SIGNAL

MARKET
SIGNAL

COMPETITOR
SIGNAL

TECHNOLOGY
SIGNAL

MODEL
REGRESSION

AGENT
FAILURE

PROMPT
FAILURE

SECURITY
FINDING

PRODUCT
QUESTION

ENGINEERING
QUESTION

STRATEGIC
QUESTION

FOUNDER
DIRECTION

PREVIOUS
RESEARCH
RESULT
```

---

# 13. Signal Record

Conceptually:

```yaml id="rll-012"
research_signal:
  signal_id: required
  signal_type: required

  source_ref: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional

  detected_at: required

  description: required

  evidence_refs: []
```

---

# 14. Signal Boundary

```text id="rll-013"
SIGNAL
DETECTED
≠
RESEARCH
NEEDED
AUTOMATICALLY
```

---

# 15. L01 — Research Intake

The Signal may become a Research Request.

Required intent:

```text id="rll-014"
WHAT
NEEDS
TO
BE
UNDERSTOOD?

WHY
DOES
IT
MATTER?

WHO
NEEDS
THE
ANSWER?

WHAT
DECISION /
CAPABILITY /
RISK
DOES
IT
AFFECT?
```

---

# 16. Intake Requirements

A material Research Request should identify:

* requester.
* organization.
* Project where applicable.
* Tenant where applicable.
* purpose.
* initial problem or opportunity.
* desired outcome.
* urgency.
* known constraints.
* available evidence.
* known Data requirements.
* initial risk.

---

# 17. Intake States

Potential:

```text id="rll-015"
SUBMITTED

UNDER
TRIAGE

MORE
INFORMATION
REQUIRED

DUPLICATE

ROUTED
ELSEWHERE

ACCEPTED
FOR
QUESTION
FORMATION

REJECTED

CANCELLED
```

---

# 18. Duplicate Intake Handling

If existing Research already answers the request:

```text id="rll-016"
NEW
RESEARCH
REQUEST

↓

PRIOR
RESEARCH
MATCH

↓

FRESHNESS /
SCOPE /
QUALITY
CHECK

↓

REUSE
IF
SUFFICIENT

OR

NEW
RESEARCH
IF
GAP
REMAINS
```

---

# 19. Duplicate Boundary

```text id="rll-017"
SIMILAR
QUESTION
≠
DUPLICATE
QUESTION
AUTOMATICALLY
```

---

# 20. L02 — Research Triage

Triage determines whether the request belongs in the Research Lab.

Potential classifications:

```text id="rll-018"
RESEARCH

PRODUCT

ENGINEERING

INCIDENT
RESPONSE

SECURITY

LEGAL

GOVERNANCE

OPERATIONS

KNOWN
ANSWER

DUPLICATE

INVALID
MANDATE

MIXED
```

---

# 21. Triage Question

Triage should ask:

```text id="rll-019"
IS
UNCERTAINTY
THE
PRIMARY
PROBLEM?
```

If no, Research may not be the correct primary workflow.

---

# 22. Triage Boundary

```text id="rll-020"
RESEARCH
TEAM
CAN
HELP
≠
RESEARCH
LAB
OWNS
THE
DECISION
```

---

# 23. L03 — Research Question Formation

The request should be converted into a clear Question.

A strong Question should identify:

```text id="rll-021"
SUBJECT

SCOPE

CONTEXT

OUTCOME
OF
INTEREST

TIME
HORIZON

KNOWN
CONSTRAINTS
```

---

# 24. Question Types

Potential:

```text id="rll-022"
DESCRIPTIVE

COMPARATIVE

CAUSAL

PREDICTIVE

EXPLORATORY

EVALUATIVE

FEASIBILITY

ARCHITECTURAL

MARKET

SECURITY

AI
CAPABILITY

OPERATIONAL
```

---

# 25. Question Decomposition

Complex Questions should be decomposed where necessary.

```text id="rll-023"
PRIMARY
QUESTION

↓

SUBQUESTIONS

↓

ANSWERABLE
RESEARCH
UNITS
```

---

# 26. Question Quality Gate

Before progressing, confirm that the Question is:

```text id="rll-024"
CLEAR

RELEVANT

BOUNDED

ANSWERABLE
OR
EXPLICITLY
EXPLORATORY

DECISION-
RELEVANT

NOT
FAKE
CERTAINTY
```

---

# 27. L04 — Scope Binding

Every material Research item should bind trusted scope.

Potential scope dimensions:

```text id="rll-025"
ORGANIZATION

PROJECT

TENANT

PURPOSE

DOMAIN

ENVIRONMENT

DATA

REGION

TIME

SYSTEM

CUSTOMER /
COHORT
```

---

# 28. Scope Source of Truth

Project and Tenant scope should come from trusted identity and authorization context—not merely Research content.

---

# 29. Project Boundary

Permanent:

```text id="rll-026"
USER
CLAIMS
PROJECT A
≠
TRUSTED
PROJECT
SCOPE
```

---

# 30. Tenant Boundary

```text id="rll-027"
REQUEST
MENTIONS
TENANT A
≠
TENANT A
ACCESS
AUTHORIZED
```

---

# 31. Purpose Binding

Research should remain tied to its authorized purpose.

---

# 32. Purpose Expansion Boundary

```text id="rll-028"
DATA
AUTHORIZED
FOR
PURPOSE A
≠
AUTHORIZED
FOR
PURPOSE B
AUTOMATICALLY
```

---

# 33. Scope Change Lifecycle

Material scope changes should trigger:

```text id="rll-029"
CHANGE
REQUEST

↓

RECLASSIFICATION

↓

AUTHORITY
CHECK

↓

CONTROL
REVIEW

↓

NEW
VERSION /
AMENDMENT
```

---

# 34. Silent Scope Change Rule

```text id="rll-030"
SILENT
SCOPE
EXPANSION
=
NOT
ALLOWED
```

---

# 35. L05 — Risk Classification

Research should use a proportionate risk model.

Conceptual:

```text id="rll-031"
R0
=
LOW

R1
=
LIMITED

R2
=
MATERIAL

R3
=
HIGH

R4
=
CRITICAL
```

---

# 36. Risk Dimensions

Classification may consider:

```text id="rll-032"
DATA
SENSITIVITY

CUSTOMER
IMPACT

TENANT
IMPACT

SECURITY

PRIVACY

LEGAL

ETHICS

FINANCIAL

REPUTATIONAL

PUBLICATION

DUAL-USE

IRREVERSIBILITY

PRODUCTION
ACCESS
```

---

# 37. Risk Reclassification

Risk should be re-evaluated when:

```text id="rll-033"
SCOPE
CHANGES

DATA
CHANGES

TOOLS
CHANGE

MODEL
CHANGES

AUTONOMY
CHANGES

ENVIRONMENT
CHANGES

PUBLIC
IMPACT
CHANGES
```

---

# 38. Risk Boundary

```text id="rll-034"
LOW
INITIAL
RISK
≠
LOW
RISK
FOREVER
```

---

# 39. Autonomy Classification

Research AI systems should remain governed by A0-A5.

Conceptually:

```text id="rll-035"
A0
=
NO
AUTONOMOUS
ACTION

A1
=
ASSISTIVE

A2
=
BOUNDED
EXECUTION

A3
=
MULTI-STEP
BOUNDED
AUTONOMY

A4
=
HIGH
AUTONOMY
WITH
STRICT
GOVERNANCE

A5
=
RESERVED /
EXCEPTIONAL
AUTONOMY
UNDER
EXPLICIT
AUTHORITY
```

Exact enterprise definitions remain governed by higher-order documentation.

---

# 40. Autonomy Boundary

Permanent:

```text id="rll-036"
AI
CAPABILITY
IMPROVES
≠
AUTONOMY
LEVEL
INCREASES
AUTOMATICALLY
```

---

# 41. L06 — Research Authorization

A Research item should not execute material actions before appropriate authorization.

Potential decisions:

```text id="rll-037"
AUTHORIZED

AUTHORIZED
WITH
CONDITIONS

REVIEW
REQUIRED

FOUNDER
REVIEW
REQUIRED

SECURITY
REVIEW
REQUIRED

PRIVACY
REVIEW
REQUIRED

ETHICS
REVIEW
REQUIRED

LEGAL /
IP
REVIEW
REQUIRED

DENIED

DEFERRED
```

---

# 42. Authorization Record

Conceptually:

```yaml id="rll-038"
research_authorization:
  authorization_id: required

  research_ref: required

  actor_ref: required

  scope_ref: required

  risk_class: required
  autonomy_level: required

  allowed_actions: []

  prohibited_actions: []

  valid_from: required
  valid_until: conditional

  approving_authority_ref: required

  conditions: []

  status: required
```

---

# 43. Authorization Expiry

Expired authorization should not be treated as current authority.

---

# 44. Founder Reserved Matters

Founder review may be required where broader governance marks a matter as Founder-reserved.

---

# 45. Founder Boundary

Permanent:

```text id="rll-039"
ROUTED
TO
FOUNDER
≠
APPROVED
BY
FOUNDER
```

---

# 46. Silence Boundary

Permanent:

```text id="rll-040"
NO
RESPONSE
≠
APPROVAL
```

---

# 47. L07 — Prior Knowledge Review

Before new Research begins, the Research Lab should ask:

```text id="rll-041"
WHAT
DO
WE
ALREADY
KNOW?

WHAT
HAS
ALREADY
BEEN
TESTED?

WHAT
FAILED
BEFORE?

WHAT
IS
STALE?

WHAT
IS
UNREPLICATED?

WHAT
IS
OUT
OF
SCOPE?
```

---

# 48. Prior Knowledge Sources

May include authorized:

```text id="rll-042"
RESEARCH
MEMORY

KNOWLEDGE
BASE

PAST
EXPERIMENTS

PAST
BENCHMARKS

PUBLICATIONS

ACADEMIC
RESEARCH

PRODUCT
DATA

ENGINEERING
EVIDENCE

MARKET
RESEARCH

INCIDENT
HISTORY
```

---

# 49. Prior Knowledge Boundary

```text id="rll-043"
PREVIOUS
ANSWER
≠
CURRENT
ANSWER
AUTOMATICALLY
```

---

# 50. Freshness Review

Existing Research should be checked for:

```text id="rll-044"
AGE

MODEL
CHANGES

DATA
CHANGES

MARKET
CHANGES

SYSTEM
CHANGES

REGULATORY
CHANGES

SCOPE
DIFFERENCES
```

---

# 51. Research Gap Confirmation

The lifecycle should explicitly identify what remains unknown.

---

# 52. Research Gap Record

Conceptually:

```yaml id="rll-045"
research_gap:
  gap_id: required
  research_ref: required

  known_state: required
  unknown_state: required

  evidence_refs: []
  limitation_refs: []

  priority: required
```

---

# 53. L08 — Hypothesis or Research Objective

Not every Research item requires a hypothesis.

Research may use:

```text id="rll-046"
HYPOTHESIS

RESEARCH
OBJECTIVE

DISCOVERY
OBJECTIVE

COMPARISON
OBJECTIVE

VALIDATION
OBJECTIVE

EXPLORATORY
OBJECTIVE
```

---

# 54. Hypothesis Lifecycle

```text id="rll-047"
PROPOSED

↓

REVIEWED

↓

AUTHORIZED
FOR
TESTING

↓

TESTED

↓

SUPPORTED /
PARTIAL /
NOT
SUPPORTED /
INCONCLUSIVE
```

---

# 55. Hypothesis Falsification

Where applicable, specify what result would count against the hypothesis.

---

# 56. Hypothesis Boundary

Permanent:

```text id="rll-048"
HYPOTHESIS
SURVIVES
TEST
≠
HYPOTHESIS
PROVEN
FOREVER
```

---

# 57. L09 — Research Method Selection

Method should match the Question.

Potential methods:

```text id="rll-049"
LITERATURE
REVIEW

EXPERIMENT

BENCHMARK

MODEL
EVALUATION

PROMPT
EVALUATION

AGENT
EVALUATION

SIMULATION

PROTOTYPE

OBSERVATIONAL
STUDY

MARKET
RESEARCH

COMPETITIVE
ANALYSIS

ARCHITECTURE
COMPARISON

CASE
STUDY

MIXED
METHOD
```

---

# 58. Method Selection Criteria

Consider:

```text id="rll-050"
QUESTION

EVIDENCE
NEEDED

CAUSALITY
NEED

RISK

TIME

COST

DATA
AVAILABILITY

REPRODUCIBILITY

GENERALIZATION

ETHICS

SECURITY
```

---

# 59. Method Boundary

```text id="rll-051"
METHOD
IS
COMMON
≠
METHOD
IS
CORRECT
FOR
THIS
QUESTION
```

---

# 60. L10 — Research Plan

A material Research Plan should define:

```text id="rll-052"
QUESTION

OBJECTIVE /
HYPOTHESIS

SCOPE

METHOD

DATA

SOURCES

MODELS

PROMPTS

AGENTS

TOOLS

ENVIRONMENT

METRICS

SUCCESS
CRITERIA

FAILURE
CRITERIA

LIMITATIONS

RISKS

REVIEW
GATES

TIMELINE

COST
ESTIMATE
```

---

# 61. Plan Versioning

Material plan changes should create controlled amendments or versions.

---

# 62. Plan Boundary

```text id="rll-053"
PLAN
APPROVED
≠
EVERY
PLANNED
ACTION
AUTHORIZED
REGARDLESS
OF
CONTEXT
```

---

# 63. Research Success Criteria

Success criteria should describe Research outcome—not desired business narrative.

Examples:

```text id="rll-054"
QUESTION
ANSWERED
WITH
ADEQUATE
EVIDENCE

HYPOTHESIS
SUPPORTED /
REJECTED

MODEL
TRADEOFF
UNDERSTOOD

PROTOTYPE
FEASIBILITY
UNDERSTOOD

RISK
QUANTIFIED

UNKNOWN
REDUCED
```

---

# 64. Desired Result Bias

The Research Plan should not define success only as confirmation of a preferred hypothesis.

---

# 65. L11 — Input Preparation

Inputs may include:

```text id="rll-055"
SOURCES

DATASETS

MODELS

PROMPTS

AGENTS

TOOLS

CODE

CONFIGURATION

SIMULATION
PARAMETERS

PROTOTYPE
ASSETS
```

---

# 66. Source Preparation

Sources should be:

```text id="rll-056"
IDENTIFIED

VERSIONED
WHERE
POSSIBLE

ATTRIBUTED

CLASSIFIED

TRUST
ASSESSED

LINKED
TO
CLAIMS
```

---

# 67. Dataset Preparation

Dataset lifecycle:

```text id="rll-057"
DISCOVER

↓

AUTHORIZE

↓

REGISTER

↓

VALIDATE
PROVENANCE

↓

CLASSIFY

↓

TRANSFORM

↓

QUALITY
CHECK

↓

VERSION

↓

BIND
TO
RESEARCH
RUN
```

---

# 68. Dataset Authorization Boundary

```text id="rll-058"
DATASET
TECHNICALLY
ACCESSIBLE
≠
DATASET
AUTHORIZED
FOR
RESEARCH
```

---

# 69. Model Preparation

Models should be bound by:

```text id="rll-059"
PROVIDER

MODEL
ID

VERSION /
SNAPSHOT
WHERE
AVAILABLE

TASK
ROLE

DATA
POLICY

REGION
WHERE
RELEVANT

COST
PROFILE
```

---

# 70. Prompt Preparation

Prompts should be versioned and bound to the Research run.

---

# 71. Agent Preparation

Agent configuration should bind:

```text id="rll-060"
AGENT
VERSION

MODEL

PROMPT

TOOLS

MEMORY

KNOWLEDGE

AUTONOMY

SCOPE
```

---

# 72. Tool Preparation

Tool access should be least-privilege and purpose-bound.

---

# 73. Input Mutation Rule

Material input changes during comparison should be recorded.

---

# 74. L12 — Control Gates

Before execution, applicable control gates should complete.

Potential gates:

```text id="rll-061"
AUTHORIZATION

SECURITY

PRIVACY

ETHICS

LEGAL

IP

DATA
GOVERNANCE

MODEL
GOVERNANCE

AGENT
GOVERNANCE

PROMPT
GOVERNANCE

COST /
RESOURCE
APPROVAL

ENVIRONMENT
READINESS
```

---

# 75. Gate Applicability

Not every Research item requires every gate.

Controls should be proportionate.

---

# 76. Gate Boundary

```text id="rll-062"
ONE
GATE
PASSED
≠
ALL
GATES
PASSED
```

---

# 77. Security Gate

Security review may consider:

```text id="rll-063"
UNTRUSTED
CODE

UNTRUSTED
DATA

PRODUCTION
ACCESS

SECRETS

NETWORK
ACCESS

EXTERNAL
TOOLS

MODEL
RISK

PROMPT
INJECTION

DATA
EXFILTRATION

PROTOTYPE
RISK
```

---

# 78. Privacy Gate

Privacy review may consider:

```text id="rll-064"
PERSONAL
DATA

SENSITIVE
DATA

PURPOSE

MINIMIZATION

RETENTION

REGION

TENANT

CONSENT /
LEGAL
BASIS
WHERE
APPLICABLE
```

---

# 79. Ethics Gate

Ethics review may be required for:

```text id="rll-065"
HUMAN
IMPACT

DUAL-USE

FAIRNESS

AUTONOMY

SENSITIVE
POPULATIONS

HIGH-RISK
AI

PUBLIC
IMPACT
```

---

# 80. Legal/IP Gate

May be required for:

```text id="rll-066"
THIRD-PARTY
DATA

LICENSES

PATENTS

PUBLICATION

CONFIDENTIALITY

CONTRACTS

REGULATED
DATA
```

---

# 81. L13 — Ready for Execution

Research becomes Ready only when required:

```text id="rll-067"
SCOPE

AUTHORIZATION

PLAN

INPUTS

CONTROLS

ENVIRONMENT

METRICS

OWNERSHIP
```

are satisfied.

---

# 82. Ready Boundary

Permanent:

```text id="rll-068"
READY
FOR
EXECUTION
≠
EXECUTED
```

---

# 83. L14 — Research Execution

Execution may consist of one or more methods.

---

# 84. Literature Research Execution

```text id="rll-069"
SEARCH

↓

COLLECT

↓

FILTER

↓

ASSESS

↓

EXTRACT

↓

COMPARE

↓

SYNTHESIZE
```

---

# 85. Experiment Execution

```text id="rll-070"
CONFIGURATION
FREEZE

↓

RUN

↓

MEASURE

↓

OBSERVE

↓

CAPTURE
RESULT

↓

CAPTURE
PROVENANCE
```

---

# 86. Benchmark Execution

```text id="rll-071"
BENCHMARK
VERSION

+

SUBJECT
VERSION

+

DATASET
VERSION

+

SCORER
VERSION

↓

RUN

↓

RESULT
```

---

# 87. Model Evaluation Execution

Model evaluation should remain Task-specific.

---

# 88. Prompt Research Execution

Prompt comparison should control relevant variables.

---

# 89. Agent Research Execution

Agent evaluation should preserve exact:

```text id="rll-072"
MODEL

PROMPT

TOOLS

MEMORY

KNOWLEDGE

AUTONOMY

ENVIRONMENT

TASK
SET
```

---

# 90. Multi-Agent Execution

Multi-Agent research should record:

```text id="rll-073"
ROLES

ROUTING

INTERACTIONS

DISSENT

CONSENSUS

FAILURES

TOOL
CALLS

FINAL
OUTPUT
```

where relevant.

---

# 91. Simulation Execution

Simulation must preserve assumptions and parameters.

---

# 92. Prototype Execution

Prototype testing should remain within authorized Research boundaries.

---

# 93. Market Research Execution

Market Research may include authorized:

```text id="rll-074"
INTERVIEWS

SURVEYS

ANALYTICS

MARKET
DATA

COMPETITOR
DATA

PRICING
DATA

SEARCH
SIGNALS
```

---

# 94. Research Execution Boundary

Permanent:

```text id="rll-075"
RUN
FINISHED
≠
RESULT
VALID
```

---

# 95. Execution Trace

Each material execution should connect:

```text id="rll-076"
RESEARCH
ID

↓

PLAN

↓

AUTHORIZATION

↓

CONFIGURATION

↓

RUN

↓

RESULT
```

---

# 96. Runtime Configuration Freeze

For controlled comparisons, material configuration should not change silently.

---

# 97. Unknown Outcome State

Infrastructure failure may produce:

```text id="rll-077"
UNKNOWN
OUTCOME
```

rather than Success or Failure.

---

# 98. Unknown Outcome Boundary

```text id="rll-078"
NO
CONFIRMED
RESULT
≠
NOTHING
HAPPENED
```

---

# 99. L15 — Observation

Observations should remain distinguishable from interpretations.

```text id="rll-079"
OBSERVATION
=
WHAT
WAS
MEASURED /
SEEN

INTERPRETATION
=
WHAT
WE
THINK
IT
MEANS
```

---

# 100. Observation Boundary

```text id="rll-080"
OBSERVED
CORRELATION
≠
CAUSATION
```

---

# 101. L16 — Evidence Capture

Evidence should be linked to Research claims.

---

# 102. Evidence Capture Requirements

Capture:

```text id="rll-081"
SOURCE

TIME

VERSION

METHOD

SCOPE

RESULT

PROVENANCE

QUALITY

LIMITATIONS
```

---

# 103. Evidence Classification

Potential:

```text id="rll-082"
SUPPORTING

CONTRADICTING

NEUTRAL

INCONCLUSIVE

INVALID

STALE
```

---

# 104. Evidence Boundary

```text id="rll-083"
EVIDENCE
SUPPORTS
CLAIM
≠
CLAIM
PROVEN
ABSOLUTELY
```

---

# 105. Counter-Evidence Collection

Researchers should actively seek information that weakens preferred conclusions.

---

# 106. Counter-Evidence Preservation

Permanent:

```text id="rll-084"
COUNTER-
EVIDENCE
FOUND
≠
COUNTER-
EVIDENCE
OPTIONAL
TO
REPORT
```

---

# 107. Evidence Fabrication Boundary

```text id="rll-085"
UNTRACEABLE
CLAIM
MUST
NOT
BE
UPGRADED
TO
VERIFIED
EVIDENCE
```

---

# 108. L17 — Analysis

Analysis should transform Evidence into bounded interpretation.

Potential activities:

```text id="rll-086"
STATISTICAL
ANALYSIS

COMPARATIVE
ANALYSIS

CAUSAL
ANALYSIS

QUALITATIVE
SYNTHESIS

ERROR
ANALYSIS

TRADEOFF
ANALYSIS

FAILURE
ANALYSIS

SENSITIVITY
ANALYSIS

SCENARIO
ANALYSIS
```

---

# 109. Analysis Reproducibility

Where applicable, analysis logic should be versioned or reproducible.

---

# 110. Analysis Boundary

```text id="rll-087"
ANALYSIS
IS
COMPLEX
≠
ANALYSIS
IS
CORRECT
```

---

# 111. Statistical Significance Boundary

Where statistics are used:

```text id="rll-088"
STATISTICAL
SIGNIFICANCE
≠
BUSINESS
SIGNIFICANCE
```

---

# 112. Correlation Boundary

Permanent:

```text id="rll-089"
CORRELATION
≠
CAUSATION
```

---

# 113. L18 — Challenge and Replication

Important results should be challenged proportionately.

Potential mechanisms:

```text id="rll-090"
REPLICATION

RED-TEAM

INDEPENDENT
REVIEW

ALTERNATIVE
MODEL

ALTERNATIVE
DATASET

ALTERNATIVE
METHOD

SENSITIVITY
TEST

EDGE
CASES

COUNTER-
HYPOTHESIS
```

---

# 114. Replication Lifecycle

```text id="rll-091"
RESULT

↓

REPLICATION
PLAN

↓

INDEPENDENT /
REPEAT
RUN

↓

COMPARE

↓

REPLICATION
STATUS
```

---

# 115. Replication Outcomes

Potential:

```text id="rll-092"
REPLICATED

PARTIALLY
REPLICATED

FAILED
TO
REPLICATE

MIXED

INCONCLUSIVE
```

---

# 116. Replication Boundary

```text id="rll-093"
REPLICATED
IN
ONE
CONTEXT
≠
GENERALIZED
TO
ALL
CONTEXTS
```

---

# 117. Red-Team Lifecycle

```text id="rll-094"
RESULT

↓

ASSUMPTION
CHALLENGE

↓

METHOD
CHALLENGE

↓

DATA
CHALLENGE

↓

SECURITY
CHALLENGE

↓

GENERALIZATION
CHALLENGE

↓

COUNTER-
EVIDENCE
```

---

# 118. Generator/Evaluator Separation

High-impact AI-generated Research should avoid relying solely on the same Agent or Model for final evaluation.

---

# 119. Multi-Agent Consensus Boundary

```text id="rll-095"
AGENTS
AGREE
≠
SCIENTIFIC
TRUTH
```

---

# 120. L19 — Limitations and Uncertainty

Before conclusion, Research should document:

```text id="rll-096"
KNOWN
LIMITATIONS

UNKNOWN
LIMITATIONS

ASSUMPTIONS

DATASET
LIMITATIONS

METHOD
LIMITATIONS

MODEL
LIMITATIONS

SCOPE
LIMITATIONS

GENERALIZATION
LIMITATIONS

TIME
LIMITATIONS
```

---

# 121. Uncertainty States

Potential:

```text id="rll-097"
LOW

MODERATE

HIGH

UNKNOWN

CONTESTED
```

subject to future detailed definitions.

---

# 122. Confidence Boundary

Permanent:

```text id="rll-098"
HIGH
CONFIDENCE
≠
CERTAINTY
```

---

# 123. L19 — Research Conclusion

Conclusion should clearly distinguish:

```text id="rll-099"
OBSERVED

SUPPORTED

PARTIALLY
SUPPORTED

NOT
SUPPORTED

INCONCLUSIVE

UNKNOWN

INFERRED
```

---

# 124. Conclusion Record

Conceptually:

```yaml id="rll-100"
research_conclusion:
  conclusion_id: required

  research_ref: required

  statement: required

  evidence_refs: []
  counter_evidence_refs: []

  limitation_refs: []

  confidence_state: required

  replication_state: conditional

  scope_ref: required

  status: required
```

---

# 125. Conclusion Boundary

```text id="rll-101"
CONCLUSION
VALID
FOR
DEFINED
SCOPE
≠
UNIVERSAL
TRUTH
```

---

# 126. L20 — Research Review

Material Research should enter appropriate review.

Potential reviewers:

```text id="rll-102"
PEER

DOMAIN
EXPERT

INDEPENDENT
RESEARCHER

SECURITY

PRIVACY

ETHICS

LEGAL

ARCHITECTURE

PRODUCT

FOUNDER
WHERE
REQUIRED
```

---

# 127. Review Types

Potential:

```text id="rll-103"
METHODOLOGY
REVIEW

EVIDENCE
REVIEW

SECURITY
REVIEW

GENERALIZATION
REVIEW

BUSINESS
RELEVANCE
REVIEW

REPLICATION
REVIEW

TRANSFER
READINESS
REVIEW
```

---

# 128. Review Outcome

Potential:

```text id="rll-104"
ACCEPT

ACCEPT
WITH
LIMITATIONS

REVISE

REPLICATE

MORE
EVIDENCE
REQUIRED

REJECT

ARCHIVE

ESCALATE
```

---

# 129. Review Boundary

Permanent:

```text id="rll-105"
RESEARCH
REVIEW
ACCEPTED
≠
ENTERPRISE
CHANGE
APPROVED
```

---

# 130. L21 — Research Validation State

Research may eventually move through validation states such as:

```text id="rll-106"
PRELIMINARY

UNDER
REVIEW

SUPPORTED

PARTIALLY
SUPPORTED

INCONCLUSIVE

NOT
SUPPORTED

REPLICATED

VALIDATED
FOR
DEFINED
SCOPE

INVALIDATED

SUPERSEDED
```

---

# 131. Validation Boundary

```text id="rll-107"
VALIDATED
FOR
DEFINED
SCOPE
≠
PRODUCTION
AUTHORIZED
```

---

# 132. Validation Scope

Validation should always remain attached to:

```text id="rll-108"
QUESTION

CONTEXT

DATA

METHOD

TIME

SYSTEM

MODEL /
AGENT /
PROMPT
VERSION
WHERE
APPLICABLE
```

---

# 133. L22 — Knowledge Transfer Candidate

Useful Research may become a transfer candidate.

---

# 134. Transfer Candidate Criteria

Potential criteria:

```text id="rll-109"
RELEVANT

ADEQUATE
EVIDENCE

LIMITATIONS
UNDERSTOOD

TARGET
IDENTIFIED

VALUE
POSSIBLE

RISK
UNDERSTOOD

TRANSFER
PACKAGE
PREPARED
```

---

# 135. Transfer Candidate Boundary

```text id="rll-110"
TRANSFER
CANDIDATE
≠
TRANSFER
APPROVED
```

---

# 136. Knowledge Transfer Package

Should include:

```text id="rll-111"
RESEARCH
QUESTION

CONCLUSION

EVIDENCE

COUNTER-
EVIDENCE

METHOD

LIMITATIONS

ASSUMPTIONS

CONFIDENCE

TARGET
SYSTEM

RECOMMENDATION

IMPLEMENTATION
CONSIDERATIONS

VERIFICATION
REQUIREMENTS
```

---

# 137. L23 — Target-System Handoff

Potential target systems:

```text id="rll-112"
PRODUCT

ENGINEERING

ENTERPRISE
ARCHITECTURE

SECURITY

DATA

KNOWLEDGE

MEMORY

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
SYSTEM
```

---

# 138. Target Authority Boundary

Permanent:

```text id="rll-113"
RESEARCH
TEAM
RECOMMENDS
CHANGE
≠
TARGET
OWNER
APPROVES
CHANGE
```

---

# 139. Engineering Handoff

Research may provide Engineering with:

```text id="rll-114"
PROBLEM

EVIDENCE

PROTOTYPE

ARCHITECTURAL
IMPLICATIONS

LIMITATIONS

TEST
CASES

SUCCESS
CRITERIA
```

---

# 140. Product Handoff

Research may provide Product with:

```text id="rll-115"
CUSTOMER
EVIDENCE

MARKET
EVIDENCE

FEASIBILITY

RISK

ALTERNATIVES

VALUE
HYPOTHESIS
```

---

# 141. Model Management Handoff

Model Research may provide:

```text id="rll-116"
TASK
FIT

QUALITY

COST

LATENCY

SAFETY

FAILURE
MODES
```

but not deployment authority.

---

# 142. Prompt OS Handoff

Prompt Research may provide a governed change proposal.

---

# 143. Agent Framework Handoff

Agent Research may provide capability and configuration recommendations.

---

# 144. Automation Handoff

Automation Research may provide workflow improvement proposals.

---

# 145. Intelligence Engine Handoff

Research outputs may become structured evidence inputs.

---

# 146. L24 — Implementation Separation

Once Research is handed off:

```text id="rll-117"
RESEARCH
LIFECYCLE

↓

TARGET
SYSTEM
LIFECYCLE
```

The Research Lab should not silently continue as implementation authority.

---

# 147. Implementation Boundary

Permanent:

```text id="rll-118"
RESEARCH
HANDOFF
COMPLETE
≠
IMPLEMENTATION
COMPLETE
```

---

# 148. Testing Boundary

```text id="rll-119"
IMPLEMENTATION
COMPLETE
≠
TESTING
COMPLETE
```

---

# 149. Verification Boundary

```text id="rll-120"
TESTS
PASS
≠
PRODUCTION
AUTHORIZED
```

---

# 150. Production Authorization

Production promotion remains a separate governance event.

---

# 151. Pilot Boundary

Permanent:

```text id="rll-121"
CONTROLLED
PILOT
PASS
≠
PRODUCTION
AUTHORIZATION
```

---

# 152. L24 — Research Archival

Research may be archived when:

```text id="rll-122"
COMPLETED

SUPERSEDED

CANCELLED

NO
LONGER
RELEVANT

INVALIDATED

TRANSFERRED

DUPLICATE

RETAINED
FOR
HISTORY
```

---

# 153. Archival Requirements

Archive should preserve appropriate:

```text id="rll-123"
IDENTITY

VERSION

RESULT

PROVENANCE

LIMITATIONS

REVIEW
HISTORY

TRANSFER
HISTORY

AUDIT
```

---

# 154. Archive Boundary

```text id="rll-124"
ARCHIVED
≠
DELETED
```

---

# 155. Retention Lifecycle

Retention should consider:

```text id="rll-125"
LEGAL

PRIVACY

AUDIT

REPRODUCIBILITY

IP

SECURITY

BUSINESS
VALUE

COST
```

---

# 156. L25 — Outcome Feedback

Research transferred into real-world systems should eventually receive outcome feedback.

Potential feedback:

```text id="rll-126"
IMPLEMENTATION
WORKED

IMPLEMENTATION
FAILED

EXPECTED
VALUE
ACHIEVED

VALUE
NOT
ACHIEVED

UNEXPECTED
SIDE
EFFECT

NEW
FAILURE

NEW
QUESTION

MODEL
DRIFT

MARKET
CHANGE
```

---

# 157. Feedback Boundary

```text id="rll-127"
REAL-WORLD
OUTCOME
DIFFERS
FROM
RESEARCH
≠
RESEARCH
WAS
USELESS
AUTOMATICALLY
```

---

# 158. Research Learning Loop

```text id="rll-128"
RESEARCH

↓

TRANSFER

↓

IMPLEMENTATION

↓

OUTCOME

↓

FEEDBACK

↓

NEW
EVIDENCE

↓

UPDATED
RESEARCH
```

---

# 159. Revalidation Lifecycle

Research may require revalidation because of:

```text id="rll-129"
TIME

MODEL
CHANGE

PROMPT
CHANGE

AGENT
CHANGE

DATA
CHANGE

MARKET
CHANGE

ARCHITECTURE
CHANGE

REGULATORY
CHANGE

SECURITY
CHANGE
```

---

# 160. Revalidation Boundary

```text id="rll-130"
RESEARCH
ONCE
VALIDATED
≠
VALID
FOREVER
```

---

# 161. Supersession Lifecycle

```text id="rll-131"
OLD
RESEARCH

↓

NEW
EVIDENCE

↓

COMPARISON

↓

SUPERSEDED /
PARTIALLY
SUPERSEDED /
STILL
VALID
```

---

# 162. Supersession Boundary

```text id="rll-132"
NEWER
RESEARCH
≠
BETTER
RESEARCH
AUTOMATICALLY
```

---

# 163. Research Cancellation

Research may be cancelled before completion when:

```text id="rll-133"
MANDATE
WITHDRAWN

VALUE
DISAPPEARS

DUPLICATE
FOUND

RISK
TOO
HIGH

DATA
UNAVAILABLE

COST
UNJUSTIFIED

METHOD
INVALID

TECHNOLOGY
OBSOLETE
```

---

# 164. Cancellation Boundary

```text id="rll-134"
RESEARCH
CANCELLED
≠
RESEARCH
FAILED
```

---

# 165. Research Pause

Pause may occur due to:

```text id="rll-135"
DEPENDENCY

REVIEW

RESOURCE
LIMIT

SECURITY
QUESTION

DATA
QUESTION

MODEL
UNAVAILABILITY

COST
LIMIT

NEW
EVIDENCE
```

---

# 166. Pause Boundary

```text id="rll-136"
PAUSED
≠
CANCELLED
```

---

# 167. HALT Lifecycle

HALT should be available for serious issues.

Potential triggers:

```text id="rll-137"
AUTHORITY
INVALID

SECURITY
INCIDENT

PROJECT
LEAKAGE

TENANT
LEAKAGE

DATA
INTEGRITY
FAILURE

EVIDENCE
FABRICATION

UNSAFE
AGENT
BEHAVIOR

UNSAFE
PROTOTYPE

CRITICAL
ETHICS
ISSUE

COST
RUNAWAY

UNEXPECTED
PRODUCTION
IMPACT
```

---

# 168. HALT State

```text id="rll-138"
RUNNING

↓

HALT
TRIGGER

↓

HALTED

↓

CONTAINMENT

↓

INVESTIGATION

↓

RECONCILIATION

↓

REAUTHORIZATION

↓

RESUME /
CANCEL
```

---

# 169. HALT Boundary

Permanent:

```text id="rll-139"
HALT
CAUSE
FIXED
≠
AUTOMATIC
RESUME
```

---

# 170. Research Failure Lifecycle

Failure types:

```text id="rll-140"
RESEARCH
DESIGN
FAILURE

SOURCE
FAILURE

DATASET
FAILURE

MODEL
FAILURE

PROMPT
FAILURE

AGENT
FAILURE

TOOL
FAILURE

PLATFORM
FAILURE

SECURITY
FAILURE

AUTHORIZATION
FAILURE

UNKNOWN
OUTCOME
```

---

# 171. Failure Processing

```text id="rll-141"
FAILURE

↓

CLASSIFY

↓

CONTAIN

↓

PRESERVE
EVIDENCE

↓

ROOT
CAUSE

↓

DECIDE
RETRY /
REDESIGN /
CANCEL

↓

LEARNING
```

---

# 172. Failure Boundary

Permanent:

```text id="rll-142"
EXPERIMENT
FAILED
≠
RESEARCH
FAILED
```

---

# 173. Retry Lifecycle

Retry should preserve:

```text id="rll-143"
AUTHORIZATION

RESEARCH
QUESTION

CONFIGURATION
IDENTITY

INPUT
VERSIONS

AUDIT

RETRY
REASON
```

---

# 174. Scientific Retry Boundary

```text id="rll-144"
TECHNICAL
RETRY
≠
SCIENTIFICALLY
IDENTICAL
REPLICATION
AUTOMATICALLY
```

---

# 175. Research State Machine

Conceptual primary state machine:

```text id="rll-145"
DRAFT

↓

TRIAGE

↓

SCOPED

↓

REVIEW_REQUIRED

↓

AUTHORIZED

↓

PLANNING

↓

READY

↓

RUNNING

↓

ANALYZING

↓

REVIEWING

↓

VALIDATED /
INCONCLUSIVE /
NOT_SUPPORTED

↓

TRANSFER_CANDIDATE /
ARCHIVED
```

Exception states:

```text id="rll-146"
PAUSED

HALTED

FAILED

CANCELLED

SUPERSEDED

INVALIDATED

UNKNOWN_OUTCOME
```

---

# 176. State Transition Rule

Every privileged state transition should eventually be attributable to:

```text id="rll-147"
ACTOR

TIME

SOURCE
STATE

TARGET
STATE

REASON

AUTHORITY
REFERENCE
WHERE
REQUIRED
```

---

# 177. State Transition Boundary

```text id="rll-148"
TECHNICALLY
ABLE
TO
CHANGE
STATE
≠
AUTHORIZED
TO
CHANGE
STATE
```

---

# 178. Lifecycle Audit

Material lifecycle events should be auditable.

Potential events:

```text id="rll-149"
SIGNAL_CREATED

INTAKE_SUBMITTED

TRIAGE_COMPLETED

QUESTION_CREATED

SCOPE_BOUND

RISK_CLASSIFIED

AUTONOMY_CLASSIFIED

AUTHORIZATION_GRANTED

AUTHORIZATION_DENIED

RESEARCH_PLAN_CREATED

CONTROL_GATE_PASSED

EXECUTION_STARTED

EXECUTION_HALTED

RESULT_CREATED

EVIDENCE_ATTACHED

COUNTER_EVIDENCE_ATTACHED

REPLICATION_COMPLETED

REVIEW_COMPLETED

VALIDATION_CHANGED

TRANSFER_PROPOSED

TRANSFER_APPROVED

RESEARCH_ARCHIVED

RESEARCH_REVALIDATION_REQUIRED
```

---

# 179. Audit Boundary

```text id="rll-150"
AUDIT
EVENT
RECORDED
≠
AUDIT
INTEGRITY
VERIFIED
```

---

# 180. Project Context Propagation

Project context should remain preserved through:

```text id="rll-151"
INTAKE

QUESTION

PLAN

AUTHORIZATION

DATASET

EXPERIMENT

BENCHMARK

MODEL
RUN

PROMPT
RUN

AGENT
RUN

RESULT

EVIDENCE

MEMORY

TRANSFER

AUDIT
```

---

# 181. Project Isolation Boundary

Permanent:

```text id="rll-152"
PROJECT A
RESEARCH
CONTEXT
≠
PROJECT B
DATA
AUTHORITY
```

---

# 182. Cross-Project Learning Lifecycle

```text id="rll-153"
PROJECT
FINDING

↓

VALIDATE
PROJECT
SCOPE

↓

CONFIDENTIALITY /
PRIVACY
REVIEW

↓

ABSTRACT
GENERAL
PATTERN

↓

CORE
RESEARCH
CANDIDATE

↓

SEPARATE
VALIDATION
FOR
REUSE
```

---

# 183. Cross-Project Boundary

```text id="rll-154"
ABSTRACT
LEARNING
≠
COPY
RAW
PROJECT
DATA
```

---

# 184. Tenant Context Propagation

Tenant context should remain bound wherever Tenant-specific Data or Research is involved.

---

# 185. Tenant Isolation Boundary

Permanent:

```text id="rll-155"
TENANT A
RESEARCH
RESULT
≠
TENANT B
VISIBILITY
```

---

# 186. Research Memory Lifecycle

```text id="rll-156"
RESEARCH
RESULT

↓

MEMORY
CANDIDATE

↓

MEMORY
GOVERNANCE

↓

AUTHORIZED
WRITE

↓

FUTURE
RETRIEVAL

↓

FRESHNESS /
SCOPE
CHECK
```

---

# 187. Memory Boundary

```text id="rll-157"
MEMORY
RETRIEVAL
≠
EVIDENCE
REVALIDATION
```

---

# 188. Knowledge Lifecycle

```text id="rll-158"
VALIDATED
RESEARCH

↓

KNOWLEDGE
CANDIDATE

↓

KNOWLEDGE
REVIEW

↓

CANONICALIZATION
AS
AUTHORIZED

↓

ENTERPRISE
KNOWLEDGE
```

---

# 189. Knowledge Boundary

```text id="rll-159"
RESEARCH
VALIDATED
≠
KNOWLEDGE
CANONICAL
AUTOMATICALLY
```

---

# 190. Technology Radar Lifecycle

```text id="rll-160"
TECHNOLOGY
SIGNAL

↓

RADAR
ENTRY

↓

ASSESSMENT

↓

WATCH /
ASSESS /
TRIAL /
ADOPT /
HOLD
CLASSIFICATION

↓

RESEARCH
TRIGGER
WHERE
NEEDED
```

---

# 191. Radar Boundary

```text id="rll-161"
ADOPT
CLASSIFICATION
≠
DEPLOYMENT
AUTHORIZATION
```

---

# 192. Innovation Lifecycle

```text id="rll-162"
RESEARCH
FINDING

↓

INNOVATION
CANDIDATE

↓

VALUE
HYPOTHESIS

↓

PROTOTYPE

↓

EXPERIMENT

↓

VALIDATION

↓

PRODUCT /
PLATFORM /
PROCESS
HANDOFF
```

---

# 193. Innovation Boundary

```text id="rll-163"
INNOVATION
VALIDATED
≠
PRODUCT
APPROVED
```

---

# 194. Publication Lifecycle

```text id="rll-164"
RESEARCH
OUTPUT

↓

PUBLICATION
CANDIDATE

↓

TECHNICAL
REVIEW

↓

EVIDENCE
REVIEW

↓

SECURITY /
PRIVACY /
LEGAL /
IP
REVIEW
WHERE
REQUIRED

↓

PUBLICATION
AUTHORITY

↓

RELEASE
```

---

# 195. Publication Boundary

```text id="rll-165"
RESEARCH
VALIDATED
≠
PUBLICATION
AUTHORIZED
```

---

# 196. Patent/IP Lifecycle

```text id="rll-166"
DISCOVERY

↓

INVENTION
CANDIDATE

↓

CONFIDENTIALITY
CONTROL

↓

PRIOR
ART
RESEARCH

↓

LEGAL /
IP
REVIEW

↓

SEPARATE
FILING
DECISION
```

---

# 197. IP Boundary

```text id="rll-167"
PATENT
CANDIDATE
≠
PATENT
GRANTED
```

---

# 198. Human-AI Lifecycle Responsibilities

Target division:

```text id="rll-168"
AI
MAY
ASSIST
WITH

SEARCH

SYNTHESIS

HYPOTHESIS
GENERATION

ANALYSIS

BENCHMARKS

CODE

SIMULATION

REPORTING

↓

HUMAN /
GOVERNANCE
REMAINS
RESPONSIBLE
FOR

AUTHORITY

HIGH-RISK
JUDGMENT

RISK
ACCEPTANCE

ETHICS

SECURITY
EXCEPTIONS

STRATEGIC
DIRECTION

FOUNDER-
RESERVED
MATTERS
```

---

# 199. AI Question Generation

AI may propose Research Questions.

```text id="rll-169"
AI
PROPOSES
QUESTION
≠
RESEARCH
AUTHORIZED
```

---

# 200. AI Hypothesis Generation

```text id="rll-170"
AI
PROPOSES
HYPOTHESIS
≠
HYPOTHESIS
ACCEPTED
AS
FACT
```

---

# 201. AI Method Generation

```text id="rll-171"
AI
PROPOSES
METHOD
≠
METHOD
AUTHORIZED
```

---

# 202. AI Execution

Authorized AI systems may perform bounded Research actions.

---

# 203. AI Self-Expansion Boundary

Permanent:

```text id="rll-172"
AI
DISCOVERS
NEW
SUBQUESTION
≠
AI
MAY
EXPAND
DATA /
PROJECT /
TENANT /
TOOL
SCOPE
```

---

# 204. Bounded Autonomous Research Lifecycle

```text id="rll-173"
AUTHORIZED
RESEARCH
ENVELOPE

↓

AI
RECEIVES
OBJECTIVE

↓

AI
DECOMPOSES
WITHIN
SCOPE

↓

AI
USES
AUTHORIZED
DATA /
TOOLS /
MODELS

↓

AI
RUNS
BOUNDED
RESEARCH

↓

AI
CAPTURES
EVIDENCE

↓

AI
FLAGS
UNCERTAINTY

↓

AI /
HUMAN
REVIEW

↓

ESCALATE
IF
BOUNDARY
REACHED
```

---

# 205. Autonomous Research Boundary

Permanent:

```text id="rll-174"
AUTONOMOUS
RESEARCH
≠
AUTONOMOUS
AUTHORITY
```

---

# 206. Lifecycle Monitoring

Research Operations should eventually monitor:

```text id="rll-175"
INTAKE
BACKLOG

REVIEW
BACKLOG

ACTIVE
RESEARCH

PAUSED
RESEARCH

HALTED
RESEARCH

FAILED
RUNS

UNKNOWN
OUTCOMES

STALE
RESEARCH

REVALIDATION
QUEUE

TRANSFER
QUEUE

COST

SECURITY
EVENTS
```

---

# 207. Lifecycle Aging

The system should identify:

```text id="rll-176"
STALE
INTAKES

STALE
APPROVALS

LONG-RUNNING
EXPERIMENTS

STALE
EVIDENCE

STALE
CONCLUSIONS

OVERDUE
REVALIDATIONS
```

---

# 208. Aging Boundary

```text id="rll-177"
OLD
≠
INVALID
AUTOMATICALLY
```

---

# 209. Lifecycle Metrics

Potential future lifecycle metrics include:

```text id="rll-178"
INTAKE
TO
TRIAGE
TIME

TRIAGE
TO
AUTHORIZATION
TIME

AUTHORIZATION
TO
EXECUTION
TIME

RESEARCH
CYCLE
TIME

REPLICATION
TIME

REVIEW
TIME

TRANSFER
TIME

REVALIDATION
RATE

CANCELLATION
RATE

HALT
RATE

UNKNOWN
OUTCOME
RATE
```

Exact targets belong in `research-metrics.md`.

---

# 210. Lifecycle Metric Boundary

```text id="rll-179"
FASTER
LIFECYCLE
≠
BETTER
RESEARCH
AUTOMATICALLY
```

---

# 211. Lifecycle Quality Gates

Potential gates:

```text id="rll-180"
QG-01
QUESTION
QUALITY

QG-02
SCOPE
QUALITY

QG-03
AUTHORIZATION

QG-04
SOURCE /
EVIDENCE
QUALITY

QG-05
METHOD
QUALITY

QG-06
DATASET
QUALITY

QG-07
EXECUTION
INTEGRITY

QG-08
ANALYSIS
QUALITY

QG-09
COUNTER-
EVIDENCE

QG-10
REPLICATION /
CHALLENGE

QG-11
LIMITATIONS

QG-12
REVIEW

QG-13
TRANSFER
READINESS
```

---

# 212. Gate Bypass Boundary

```text id="rll-181"
URGENT
≠
GOVERNANCE
OPTIONAL
```

---

# 213. Emergency Research

Urgent Research may use expedited paths only where separately governed.

---

# 214. Emergency Boundary

```text id="rll-182"
EMERGENCY
PATH
≠
NO
AUDIT /
NO
AUTHORITY
```

---

# 215. Research Lifecycle SLA Boundary

If lifecycle SLAs are later established:

```text id="rll-183"
SLA
MISSED
≠
RESEARCH
INVALID
AUTOMATICALLY
```

---

# 216. Research Lifecycle Conceptual Schema

```yaml id="rll-184"
research_lifecycle:
  research_id: required
  version: required

  signal_ref: conditional
  intake_ref: required
  question_ref: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional
  purpose_id: required

  risk_class: required
  autonomy_level: required

  authorization_ref: required

  prior_knowledge_refs: []

  hypothesis_refs: []
  objective_refs: []

  method_ref: required
  plan_ref: required

  source_refs: []
  dataset_refs: []
  model_refs: []
  prompt_refs: []
  agent_refs: []
  tool_refs: []

  experiment_refs: []
  benchmark_refs: []
  simulation_refs: []
  prototype_refs: []

  evidence_refs: []
  counter_evidence_refs: []

  result_refs: []
  replication_refs: []
  review_refs: []

  conclusion_ref: conditional

  transfer_ref: conditional

  state: required

  halted: false
  production_authorized: false
```

---

# 217. State Transition Record

```yaml id="rll-185"
research_state_transition:
  transition_id: required

  research_ref: required

  from_state: required
  to_state: required

  actor_ref: required

  reason: required

  authority_ref: conditional

  occurred_at: required

  audit_ref: required
```

---

# 218. HALT Record

```yaml id="rll-186"
research_halt:
  halt_id: required
  research_ref: required

  trigger: required
  severity: required

  detected_by_ref: required

  containment_actions: []

  resumed: false
  resume_authority_ref: conditional
```

---

# 219. Revalidation Record

```yaml id="rll-187"
research_revalidation:
  revalidation_id: required

  research_ref: required

  trigger: required

  prior_conclusion_ref: required

  evidence_changes: []

  outcome: required

  supersedes_ref: conditional
```

---

# 220. Positive Lifecycle Verification Scenarios

Future verification should eventually test at least:

```text id="rll-188"
RL-01
SIGNAL
BECOMES
TRACEABLE
INTAKE

RL-02
INTAKE
DOES
NOT
AUTO-AUTHORIZE

RL-03
DUPLICATE
RESEARCH
CAN
BE
DETECTED

RL-04
QUESTION
IS
VERSIONED

RL-05
TRUSTED
PROJECT
SCOPE
BOUND

RL-06
TRUSTED
TENANT
SCOPE
BOUND

RL-07
RISK
CLASSIFICATION
RECORDED

RL-08
AUTONOMY
CLASSIFICATION
RECORDED

RL-09
AUTHORIZATION
REQUIRED

RL-10
PRIOR
KNOWLEDGE
REVIEWED

RL-11
RESEARCH
GAP
RECORDED

RL-12
HYPOTHESIS
SEPARATE
FROM
FACT

RL-13
METHOD
BOUND
TO
QUESTION

RL-14
DATASET
AUTHORIZED

RL-15
DATASET
VERSION
FROZEN

RL-16
MODEL
VERSION
BOUND

RL-17
PROMPT
VERSION
BOUND

RL-18
AGENT
VERSION
BOUND

RL-19
REQUIRED
CONTROL
GATES
COMPLETE

RL-20
EXECUTION
TRACEABLE

RL-21
OBSERVATION
SEPARATE
FROM
INTERPRETATION

RL-22
EVIDENCE
PROVENANCE
PRESERVED

RL-23
COUNTER-
EVIDENCE
PRESERVED

RL-24
REPLICATION
STATUS
TRACKED

RL-25
LIMITATIONS
RECORDED

RL-26
REVIEW
SEPARATE
FROM
TARGET
APPROVAL

RL-27
VALIDATION
SCOPED

RL-28
TRANSFER
DOES
NOT
AUTO-IMPLEMENT

RL-29
RESEARCH
MEMORY
DOES
NOT
BECOME
CURRENT
TRUTH
AUTOMATICALLY

RL-30
PROJECT A
ISOLATED
FROM
PROJECT B

RL-31
TENANT A
ISOLATED
FROM
TENANT B

RL-32
HALT
AVAILABLE

RL-33
RESUME
REQUIRES
REAUTHORIZATION

RL-34
UNKNOWN
OUTCOME
NOT
MARKED
SUCCESS

RL-35
REVALIDATION
TRIGGER
WORKS

RL-36
SUPERSEDED
RESEARCH
HISTORY
PRESERVED

RL-37
FOUNDER
ROUTING
DOES
NOT
BECOME
APPROVAL

RL-38
CONTROLLED
PILOT
DOES
NOT
AUTO-PROMOTE
TO
PRODUCTION
```

---

# 221. Negative Lifecycle Verification Scenarios

Containment should eventually be verified when:

* Intake attempts to self-authorize Research.
* AI-generated subquestion expands Project scope.
* user-supplied Tenant ID conflicts with trusted Tenant context.
* expired authorization is reused.
* R1 Research becomes R4 after Data changes without reclassification.
* AI changes autonomy level without authority.
* stale Research is used without freshness review.
* Research Plan changes materially without versioning.
* Dataset provenance disappears before execution.
* Dataset license prohibits intended use.
* Production Data is requested without authorization.
* Model changes during controlled comparison.
* Prompt changes mid-run without traceability.
* Agent Tool scope expands silently.
* external source attempts Prompt Injection.
* source claims Founder approval without trusted evidence.
* Experiment infrastructure fails and outcome is incorrectly marked successful.
* supporting Evidence is retained while Counter-Evidence is deleted.
* statistical correlation is reported as causation without support.
* failed replication is hidden.
* known limitation is removed before review.
* Research Review is represented as Product approval.
* validation is represented as Production authorization.
* Knowledge Transfer directly modifies Production.
* Project A result leaks into Project B.
* Tenant A evidence becomes visible to Tenant B.
* HALT state automatically resumes.
* archived Research is physically deleted without retention authority.
* new Research silently overwrites superseded Research history.
* Technology Radar status is represented as procurement authorization.
* Controlled Pilot success is represented as Production authorization.

---

# 222. Lifecycle Anti-Gaming Principles

The lifecycle must resist incentives to:

```text id="rll-189"
RUSH
TO
VALIDATION

HIDE
NEGATIVE
RESULTS

SUPPRESS
COUNTER-
EVIDENCE

SKIP
REPLICATION

OVERSTATE
CONFIDENCE

MARK
INCONCLUSIVE
AS
SUCCESS

TREAT
PROTOTYPE
AS
PRODUCT

TREAT
BENCHMARK
AS
DEPLOYMENT
AUTHORITY
```

---

# 223. Lifecycle Anti-Goodhart Rule

Permanent:

```text id="rll-190"
OPTIMIZE
RESEARCH
QUALITY

NOT

ONLY
LIFECYCLE
THROUGHPUT
```

---

# 224. Research Lifecycle Maturity Model

Conceptual:

```text id="rll-191"
RLM0
=
RESEARCH
LIFECYCLE
DOCUMENTED

RLM1
=
LIFECYCLE
STATES /
TRANSITIONS
DEFINED

RLM2
=
INTAKE /
SCOPE /
AUTHORIZATION /
GATES
DESIGNED

RLM3
=
RESEARCH
EXECUTION /
EVIDENCE /
RESULT
WORKFLOWS
IMPLEMENTED

RLM4
=
REPLICATION /
REVIEW /
VALIDATION
WORKFLOWS
IMPLEMENTED

RLM5
=
KNOWLEDGE
TRANSFER /
MEMORY /
REVALIDATION
INTEGRATED

RLM6
=
HALT /
RECOVERY /
AUDIT /
MONITORING
IMPLEMENTED

RLM7
=
PROJECT /
TENANT /
SECURITY /
PRIVACY /
ETHICS
CONTROLS
VERIFIED

RLM8
=
CONTROLLED
RESEARCH
LIFECYCLE
PILOT
VERIFIED

RLM9
=
PRODUCTION
RESEARCH
LIFECYCLE
SEPARATELY
AUTHORIZED
```

---

# 225. Maturity Boundary

Permanent:

```text id="rll-192"
RLM8
≠
RLM9
```

---

# 226. Research Lifecycle Documentation Checklist

## Intake and Scope

* [x] Signal stage defined.
* [x] Intake stage defined.
* [x] Triage stage defined.
* [x] Question stage defined.
* [x] Question decomposition defined.
* [x] Scope binding defined.
* [x] Project binding defined.
* [x] Tenant binding defined.
* [x] Purpose binding defined.

## Classification and Authority

* [x] R0-R4 risk model referenced.
* [x] A0-A5 autonomy model referenced.
* [x] risk reclassification defined.
* [x] authorization stage defined.
* [x] Founder routing boundary defined.
* [x] silence boundary defined.

## Research Design

* [x] Prior Knowledge Review defined.
* [x] Research Gap defined.
* [x] hypothesis/objective stage defined.
* [x] Method selection defined.
* [x] Research Plan defined.
* [x] success criteria defined.
* [x] input preparation defined.

## Controls

* [x] Security gate defined.
* [x] Privacy gate defined.
* [x] Ethics gate defined.
* [x] Legal/IP gate defined.
* [x] Data gate defined.
* [x] ready-for-execution stage defined.

## Execution

* [x] Literature Research execution defined.
* [x] Experiment execution defined.
* [x] Benchmark execution defined.
* [x] Model Evaluation defined.
* [x] Prompt Research defined.
* [x] Agent Research defined.
* [x] Multi-Agent Research defined.
* [x] Simulation execution defined.
* [x] Prototype execution defined.
* [x] Market Research defined.

## Evidence and Validation

* [x] Observation defined.
* [x] Evidence capture defined.
* [x] Counter-Evidence defined.
* [x] Analysis defined.
* [x] replication defined.
* [x] Red-Team challenge defined.
* [x] limitations defined.
* [x] uncertainty defined.
* [x] conclusion defined.
* [x] review defined.
* [x] validation state defined.

## Transfer and Feedback

* [x] Transfer Candidate stage defined.
* [x] target-system handoff defined.
* [x] implementation boundary defined.
* [x] testing boundary defined.
* [x] Production boundary defined.
* [x] archival defined.
* [x] feedback defined.
* [x] revalidation defined.
* [x] supersession defined.

## Failure and Recovery

* [x] cancellation defined.
* [x] pause defined.
* [x] HALT defined.
* [x] failure lifecycle defined.
* [x] retry defined.
* [x] unknown outcome defined.
* [x] Resume authority defined.

## Enterprise Controls

* [x] audit defined.
* [x] Project propagation defined.
* [x] cross-Project learning defined.
* [x] Tenant propagation defined.
* [x] Memory integration defined.
* [x] Knowledge integration defined.
* [x] Technology Radar lifecycle defined.
* [x] Innovation lifecycle defined.
* [x] publication lifecycle defined.
* [x] patent/IP lifecycle defined.

## AI-Native Research

* [x] Human-AI responsibilities defined.
* [x] AI question generation boundary defined.
* [x] AI hypothesis generation boundary defined.
* [x] bounded autonomous Research defined.
* [x] self-expansion boundary defined.

## Verification

* [x] conceptual lifecycle schema defined.
* [x] state transition schema defined.
* [x] HALT schema defined.
* [x] revalidation schema defined.
* [x] positive verification scenarios defined.
* [x] negative verification scenarios defined.
* [x] maturity model defined.
* [x] Runtime Truth defined.
* [x] Production hard stops defined.

---

# 227. Repository Evidence Boundary

The established Research Lab root structure includes:

```text id="rll-193"
doc/26-research-lab/research-lifecycle.md
```

This document does not independently establish implementation of any workflow described here.

---

# 228. Repository Save Boundary

This document is generated for:

```text id="rll-194"
doc/26-research-lab/research-lifecycle.md
```

Permanent:

```text id="rll-195"
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

# 229. Current Documentation Truth

```text id="rll-196"
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

RESEARCH_LAB_LIFECYCLE
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 230. Current Runtime Truth

Nothing in this document independently proves lifecycle runtime implementation.

```text id="rll-197"
RESEARCH_INTAKE_RUNTIME
=
NOT_PROVEN

RESEARCH_TRIAGE_RUNTIME
=
NOT_PROVEN

QUESTION_MANAGEMENT_RUNTIME
=
NOT_PROVEN

SCOPE_BINDING_RUNTIME
=
NOT_PROVEN

RISK_CLASSIFICATION_RUNTIME
=
NOT_PROVEN

AUTONOMY_CLASSIFICATION_RUNTIME
=
NOT_PROVEN

RESEARCH_AUTHORIZATION_RUNTIME
=
NOT_PROVEN

PRIOR_KNOWLEDGE_RUNTIME
=
NOT_PROVEN

RESEARCH_PLANNING_RUNTIME
=
NOT_PROVEN

CONTROL_GATE_RUNTIME
=
NOT_PROVEN

EXPERIMENT_LIFECYCLE_RUNTIME
=
NOT_PROVEN

BENCHMARK_LIFECYCLE_RUNTIME
=
NOT_PROVEN

MODEL_RESEARCH_LIFECYCLE_RUNTIME
=
NOT_PROVEN

PROMPT_RESEARCH_LIFECYCLE_RUNTIME
=
NOT_PROVEN

AGENT_RESEARCH_LIFECYCLE_RUNTIME
=
NOT_PROVEN

SIMULATION_LIFECYCLE_RUNTIME
=
NOT_PROVEN

PROTOTYPE_LIFECYCLE_RUNTIME
=
NOT_PROVEN

EVIDENCE_LIFECYCLE_RUNTIME
=
NOT_PROVEN

REPLICATION_RUNTIME
=
NOT_PROVEN

REVIEW_RUNTIME
=
NOT_PROVEN

VALIDATION_RUNTIME
=
NOT_PROVEN

KNOWLEDGE_TRANSFER_RUNTIME
=
NOT_PROVEN

REVALIDATION_RUNTIME
=
NOT_PROVEN

HALT_RESUME_RUNTIME
=
NOT_PROVEN

PROJECT_ISOLATION_RUNTIME
=
NOT_PROVEN

TENANT_ISOLATION_RUNTIME
=
NOT_PROVEN

RESEARCH_AUDIT_RUNTIME
=
NOT_PROVEN

PRODUCTION_RESEARCH_LIFECYCLE
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 231. Approval Truth

```text id="rll-198"
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

LIFECYCLE
IMPLEMENTED
=
NOT_PROVEN

LIFECYCLE
TESTED
=
NOT_PROVEN

LIFECYCLE
VERIFIED
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 232. Production Hard Stops

Production Research lifecycle operations must remain blocked where applicable if:

```text id="rll-199"
AUTHORIZATION
MISSING

AUTHORIZATION
EXPIRED

TRUSTED
PROJECT
SCOPE
MISSING

TRUSTED
TENANT
SCOPE
MISSING

PURPOSE
BINDING
MISSING

RISK
CLASSIFICATION
UNKNOWN

AUTONOMY
CLASSIFICATION
UNKNOWN

REQUIRED
SECURITY
REVIEW
MISSING

REQUIRED
PRIVACY
REVIEW
MISSING

REQUIRED
ETHICS
REVIEW
MISSING

REQUIRED
LEGAL /
IP
REVIEW
MISSING

DATASET
AUTHORITY
UNKNOWN

DATASET
PROVENANCE
UNKNOWN

MODEL
IDENTITY
UNVERIFIED

PROMPT
IDENTITY
UNVERIFIED

AGENT
IDENTITY
UNVERIFIED

TOOL
AUTHORITY
UNKNOWN

PROJECT
ISOLATION
UNVERIFIED

TENANT
ISOLATION
UNVERIFIED

EVIDENCE
FABRICATION
UNRESOLVED

COUNTER-
EVIDENCE
SUPPRESSION
UNRESOLVED

PROMPT
INJECTION
UNRESOLVED

AUTHORITY
INJECTION
UNRESOLVED

UNKNOWN
OUTCOME
UNRESOLVED

HALT
CONTROL
UNVERIFIED

RESUME
AUTHORITY
UNVERIFIED

AUDIT
INTEGRITY
UNVERIFIED

PRODUCTION
AUTHORIZATION
MISSING
```

---

# 233. Permanent Research Lifecycle Invariants

```text id="rll-200"
SIGNAL
≠
RESEARCH
MANDATE

INTAKE
≠
AUTHORIZATION

QUESTION
≠
ANSWER

SCOPE
REQUESTED
≠
SCOPE
AUTHORIZED

RISK
CLASSIFIED
≠
RISK
ACCEPTED

AI
CAPABLE
≠
AI
AUTHORIZED

PRIOR
KNOWLEDGE
≠
CURRENT
TRUTH

HYPOTHESIS
≠
FACT

PLAN
≠
EXECUTION

DATASET
AVAILABLE
≠
DATASET
AUTHORIZED

MODEL
AVAILABLE
≠
MODEL
AUTHORIZED

PROMPT
AVAILABLE
≠
PROMPT
AUTHORIZED

AGENT
AVAILABLE
≠
AGENT
AUTHORIZED

TOOL
AVAILABLE
≠
TOOL
AUTHORIZED

CONTROL
GATE
PASSED
≠
ALL
CONTROL
GATES
PASSED

READY
≠
EXECUTED

EXECUTED
≠
VALIDATED

OBSERVATION
≠
INTERPRETATION

CORRELATION
≠
CAUSATION

EVIDENCE
≠
CERTAINTY

COUNTER-
EVIDENCE
≠
OPTIONAL

EXPERIMENT
COMPLETE
≠
HYPOTHESIS
PROVEN

BENCHMARK
WINNER
≠
PRODUCTION
WINNER

MODEL
RESEARCH
WINNER
≠
MODEL
DEPLOYMENT
AUTHORIZED

PROMPT
RESEARCH
WINNER
≠
PROMPT OS
CHANGE
AUTHORIZED

AGENT
RESEARCH
WINNER
≠
AGENT
DEPLOYMENT
AUTHORIZED

MULTI-AGENT
CONSENSUS
≠
SCIENTIFIC
TRUTH

SIMULATION
≠
REAL-WORLD
PROOF

PROTOTYPE
≠
PRODUCT

REVIEWED
≠
IMPLEMENTATION
APPROVED

VALIDATED
≠
PRODUCTION
AUTHORIZED

TRANSFER
CANDIDATE
≠
TRANSFER
APPROVED

TRANSFER
APPROVED
≠
TARGET
CHANGE
AUTHORIZED

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

ARCHIVED
≠
DELETED

OLD
≠
INVALID

NEWER
≠
BETTER

FAILED
EXPERIMENT
≠
FAILED
RESEARCH

ISSUE
FIXED
≠
RESUME
AUTHORIZED

MEMORY
≠
CURRENT
EVIDENCE

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

AUTONOMOUS
RESEARCH
≠
AUTONOMOUS
AUTHORITY

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

RLM8
≠
RLM9

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

# 234. Changelog Entry

Append during future root `CHANGELOG.md` synchronization:

```markdown id="rll-201"
## RESEARCH-LAB-CHG-20260813-007 — Research Lab Lifecycle Established

| Field | Value |
|---|---|
| Date | 2026-08-13 |
| Change Type | `CREATED`, `LIFECYCLE`, `RESEARCH-INTAKE`, `QUESTION`, `AUTHORIZATION`, `EXPERIMENT`, `EVIDENCE`, `REPLICATION`, `VALIDATION`, `KNOWLEDGE-TRANSFER`, `HALT-RESUME`, `RUNTIME-TRUTH` |
| Impact | `I5 — Research Lab End-to-End Operating Lifecycle Foundation` |
| Risk | `R1 — Documentation` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Canonical | `false` |
| Production Authorization | `NOT_AUTHORIZED_BY_THIS_DOCUMENT` |

### Affected Document

`doc/26-research-lab/research-lifecycle.md`

### Lifecycle Truth

`RESEARCH_LAB_LIFECYCLE = CONTENT_COMPLETE_FOR_REVIEW`

### Runtime Truth

`RESEARCH_LAB_LIFECYCLE_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_RESEARCH_LIFECYCLE = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 235. Final Research Lifecycle Rule

The governed target Research Lifecycle is:

```text id="rll-202"
IMPORTANT
UNKNOWN

↓

TRACEABLE
INTAKE

↓

CLEAR
QUESTION

↓

TRUSTED
SCOPE

↓

RISK /
AUTONOMY
CLASSIFICATION

↓

VALID
AUTHORITY

↓

PRIOR
KNOWLEDGE

↓

RESEARCH
GAP

↓

HYPOTHESIS /
OBJECTIVE

↓

METHOD

↓

PLAN

↓

AUTHORIZED
SOURCES /
DATA /
MODELS /
PROMPTS /
AGENTS /
TOOLS

↓

SECURITY /
PRIVACY /
ETHICS /
LEGAL /
IP
GATES
AS
REQUIRED

↓

CONTROLLED
EXECUTION

↓

OBSERVATION

↓

TRACEABLE
EVIDENCE

↓

COUNTER-
EVIDENCE

↓

ANALYSIS

↓

REPLICATION /
ADVERSARIAL
CHALLENGE

↓

LIMITATIONS /
UNCERTAINTY

↓

BOUNDED
CONCLUSION

↓

INDEPENDENT
REVIEW
AS
REQUIRED

↓

VALIDATED
RESEARCH
FOR
DEFINED
SCOPE

↓

KNOWLEDGE
TRANSFER
CANDIDATE

↓

SEPARATE
TARGET-SYSTEM
AUTHORITY

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

FEEDBACK

↓

REVALIDATION /
NEW
RESEARCH
```

while permanently preserving:

```text id="rll-203"
RESEARCH
≠
AUTHORITY

HYPOTHESIS
≠
FACT

EVIDENCE
≠
CERTAINTY

VALIDATION
≠
IMPLEMENTATION
AUTHORITY

AI
≠
FOUNDER

TRANSFER
≠
DEPLOYMENT

PILOT
≠
PRODUCTION

DOCUMENTATION
≠
IMPLEMENTATION
```

---

# 236. Next Document

The Research Vision has defined **where the Research Lab should go**.

The Research Strategy has defined **how it should progress**.

The Research Architecture has defined **how it should be structurally organized**.

The Research Capabilities document has defined **what it should eventually be able to do**.

This Research Lifecycle has now defined **how a Research item should move from an initial signal through evidence, validation, handoff, feedback and revalidation**.

The next root document should establish the **module-wide Research Governance model**, including Research authority, L0-Founder boundaries, Human and AI responsibilities, R0-R4 risk controls, A0-A5 autonomy controls, approval classes, delegation, Project and Tenant authority, policy hierarchy, conflict resolution, research ethics authority, Security/privacy/legal gates, high-risk Research governance, Model/Prompt/Agent/Tool authority, Dataset governance, experiment authorization, publication and IP authority, Knowledge Transfer approval, emergency HALT, audit, exceptions, governance violations, governance maturity, Runtime Truth and Production authorization boundaries.

## NEXT DOCUMENT

```text id="rll-204"
doc/26-research-lab/research-governance.md
```

---
