---

id: RESEARCH-LAB-TEMPLATES-RESEARCH-TEMPLATE-001
title: Mianx.ai Research Lab Templates — Research Template
version: 1.0.0
status: Draft

description: Enterprise-grade reusable master Research documentation template for the Mianx.ai Research Lab. This template standardizes how Mianx.ai should register, classify, scope, authorize, plan, execute, observe, analyze, challenge, validate, review, transfer, archive, monitor and revalidate Research across Academic Research, AI Research, Agent Research, Multi-Agent Research, Model and LLM Research, Prompt Research, Architecture Research, Data Research, Market Research, Competitive Intelligence, Technology Radar, Future Technologies, Security Research, Simulation, Experimentation, Benchmarking, Prototyping, Innovation, Product discovery and future Industry Operating System Research. It establishes stable Research identities and versions; Research Signals; intake; triage; Research Questions; hypotheses; scope and non-goals; Project and Tenant boundaries; risk and autonomy classifications; Research mandates and authorizations; prior Knowledge; source provenance; literature and market evidence; assumptions; uncertainties; Research objectives; methods; Research Plans; Data and Dataset controls; Model, Prompt, Agent, Multi-Agent, Tool, Memory and Retrieval configurations; environment identity; Experiments; Benchmarks; Simulations; Prototypes; Human Research; observations; Evidence and Counter-Evidence; negative and null findings; statistics; causal boundaries; reproducibility; replication; validity; security; privacy; Responsible AI; legal; compliance; intellectual property; resource and cost controls; Research incidents; HALT and Resume; conclusions; validation; Research Transfer Candidates; Knowledge Transfer; Architecture, Engineering, Product, Security, Technology Radar, Publications and IP handoffs; archival; monitoring; revalidation; maturity; Runtime Truth and Production authorization boundaries. It permanently separates Research from implementation, Research completion from validation, Research Question from predetermined answer, hypothesis support from proof, observation from interpretation, Evidence from authority, correlation from causation, Benchmark result from universal truth, Simulation from Runtime verification, Prototype from Product, MVP from Product-Market Fit, Pilot from Production authorization, Research recommendation from Product or Architecture approval, Research transfer from downstream adoption, Agent capability from Agent authority, Tool success from verified external side effect, Project tagging from Project isolation, Tenant tagging from Tenant isolation, Founder routing from Founder approval, silence from approval, documentation from filesystem save, documented from implemented, implemented from tested/verified, and verified from Production authorization.

type: Master Research Documentation Template, Research Intake Template, Research Question and Hypothesis Template, Research Plan Template, Research Evidence and Provenance Template, AI and Agent Research Template, Research Governance Template, Research Validation Template, Knowledge Transfer Template, Runtime Truth Boundary, and Controlled Research Pilot Boundary

class: Reusable Research documentation template defining the minimum and extended structure of a governed Mianx.ai Research record without asserting that a Research registry, autonomous Research engine, Research orchestration service, Evidence graph, automated Research approval system, Research monitoring platform or Production Research control plane is currently implemented

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Templates
specialization: Master Research Template

parent: doc/26-research-lab/templates
path: doc/26-research-lab/templates/research-template.md

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
* Research Strategy Governance
* Research Architecture Governance
* Research Methodology Governance
* Research Security Governance
* Evidence Governance
* Knowledge Governance
* Data Governance
* Dataset Governance
* Model Governance
* Prompt Governance
* Agent Governance
* Multi-Agent Governance
* Tool Governance
* Memory Governance
* Automation Governance
* Intelligence Governance
* Security Governance
* Privacy Governance
* Responsible AI Governance
* Legal Governance
* Compliance Governance
* Intellectual Property Governance
* Project Governance
* Tenant Governance
* Verification Governance
* Monitoring Governance
* Audit Governance
* Documentation Governance

maintainers:

* Research Lab
* Research Strategy Team
* Research Scientists
* Research Engineers
* AI Research Team
* Model Research Team
* Prompt Research Team
* Agent Research Team
* Multi-Agent Research Team
* Architecture Research
* Data Research
* Market Research
* Security Research
* Innovation Lab
* Verification Engineering
* Research Operations
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Research Governance
* Research Strategy Governance
* Research Methodology Governance
* Architecture Governance
* Security Governance
* Data Governance
* Privacy Governance
* Responsible AI Governance
* Legal Governance
* Compliance Governance
* Intellectual Property Governance
* Project Governance
* Tenant Governance
* Verification Governance
* Documentation Governance

created: 2026-08-15
updated: 2026-08-15

classification: Internal

audience:

* Founder
* Founder Office
* Human Executive Leadership
* Research Leaders
* Research Scientists
* Research Engineers
* AI Researchers
* Model Researchers
* Prompt Researchers
* Agent Researchers
* Multi-Agent Researchers
* Architecture Researchers
* Data Researchers
* Security Researchers
* Market Researchers
* Product Researchers
* Innovation Teams
* Engineering Leaders
* Product Leaders
* Project Leaders
* Verification Engineers
* Auditors
* Documentation Maintainers

depends_on:

* ../README.md
* ../INDEX.md
* ../research-vision.md
* ../research-strategy.md
* ../research-architecture.md
* ../research-capabilities.md
* ../research-lifecycle.md
* ../research-governance.md
* ../research-security.md
* ../research-metrics.md
* ../research-checklists.md
* ../ROADMAP.md
* ../research-strategy/research-priorities.md
* ../research-strategy/research-process.md
* ../research-strategy/research-roadmap.md
* ../experiments/experiment-design.md
* ../experiments/experiment-results.md
* ../experiments/experiment-tracking.md
* ../benchmarking/benchmark-suite.md
* ../datasets/dataset-governance.md
* ../ethics/responsible-ai.md
* ../governance/research-governance.md
* ../knowledge-transfer/research-documentation.md
* ../monitoring/audit-logs.md
* ../monitoring/research-monitoring.md
* ../prototypes/prototype-framework.md
* ../prototypes/prototype-validation.md
* ../publications/technical-reports.md
* ../security/research-security.md
* ../simulations/simulation-framework.md
* ../simulations/test-environments.md
* ../technology-radar/emerging-technologies.md
* ../technology-radar/technology-assessment.md
* ../technology-radar/technology-roadmap.md
* ./benchmark-template.md
* ./experiment-template.md
* ./publication-template.md

related_documents:

* ../CHANGELOG.md

## canonical: false

# Mianx.ai Research Lab Templates — Research Template

> **Purpose:** Use this document as the standard master template for a governed Mianx.ai Research record.
>
> Specialized Research records may extend this structure but should preserve its truth, Evidence, Governance, security, Project/Tenant and authority boundaries.
>
> Recommended placeholder convention:
>
> ```text id="rt001"
> [REQUIRED: value]
>
> [OPTIONAL: value]
>
> [NOT APPLICABLE: reason]
>
> [UNKNOWN: Evidence gap]
>
> [REDACTED: authorized reason]
> ```
>
> Permanent:
>
> ```text id="rt002"
> RESEARCH
> ≠
> IMPLEMENTATION
>
> RESEARCH
> COMPLETED
> ≠
> RESEARCH
> VALIDATED
>
> RESEARCH
> VALIDATED
> ≠
> PRODUCTION
> AUTHORIZED
> ```

---

# 1. Template Usage Rules

Before using this template:

1. Copy it to the appropriate Research record location.
2. assign a stable Research ID.
3. assign a controlled version.
4. register the Research Signal or trigger.
5. define one or more Research Questions.
6. establish scope and non-goals.
7. classify Project and Tenant scope.
8. classify Research risk.
9. classify AI autonomy where applicable.
10. obtain required Research authorization.
11. review prior Knowledge before unnecessary duplication.
12. define hypotheses where appropriate.
13. select an appropriate Research method.
14. define Evidence requirements before conclusion.
15. register Data, Dataset, Model, Prompt, Agent, Tool, Memory and environment identities.
16. preserve raw Evidence and Counter-Evidence.
17. record negative and null findings.
18. record protocol and scope deviations.
19. distinguish facts, observations, interpretations, assumptions and recommendations.
20. define security, privacy, Responsible AI, legal and IP controls.
21. preserve Project/Tenant isolation.
22. do not infer approval from silence.
23. do not manufacture Founder approval.
24. do not convert Research findings into implementation authority.
25. define Knowledge Transfer and revalidation requirements before closure.

Permanent:

```text id="rt003"
UNKNOWN
MUST
REMAIN
UNKNOWN

UNTIL
SUPPORTED
BY
EVIDENCE
```

---

# 2. Research Front Matter Template

```yaml id="rt004"
---
id: [REQUIRED: RESEARCH-ID]
title: [REQUIRED: Research title]
version: [REQUIRED]
status: Draft

research_type: [REQUIRED]
research_class: [REQUIRED]
research_domain: [REQUIRED]

priority_ref: [OPTIONAL]

signal_refs:
  - [REQUIRED]

research_question_refs:
  - [REQUIRED]

hypothesis_refs:
  - [OPTIONAL]

project_scope_refs:
  - [REQUIRED]

tenant_scope_refs:
  - [REQUIRED or NOT APPLICABLE]

environment_scope_refs:
  - [REQUIRED where applicable]

risk_class: [REQUIRED]
autonomy_class: [REQUIRED where applicable]

authorization_refs:
  - [REQUIRED]

dataset_refs:
  - [OPTIONAL]

model_refs:
  - [OPTIONAL]

prompt_refs:
  - [OPTIONAL]

agent_refs:
  - [OPTIONAL]

tool_refs:
  - [OPTIONAL]

memory_refs:
  - [OPTIONAL]

experiment_refs:
  - [OPTIONAL]

benchmark_refs:
  - [OPTIONAL]

simulation_refs:
  - [OPTIONAL]

prototype_refs:
  - [OPTIONAL]

owner: [REQUIRED]

reviewers:
  - [REQUIRED]

created: [REQUIRED: YYYY-MM-DD]
updated: [REQUIRED: YYYY-MM-DD]

classification: [REQUIRED]

approved: false
founder_approved: false
canonical: false
production_authorized: false
---
```

---

# 3. Research Identity

## 3.1 Research ID

```text id="rt005"
[REQUIRED: RSCH-XXXXXX]
```

## 3.2 Version

```text id="rt006"
[REQUIRED]
```

## 3.3 Title

```text id="rt007"
[REQUIRED]
```

## 3.4 Owner

```text id="rt008"
[REQUIRED]
```

## 3.5 Research Status

Select one:

```text id="rt009"
SIGNAL

INTAKE

TRIAGE

QUESTION
FORMULATION

SCOPING

AWAITING
AUTHORIZATION

AUTHORIZED

PLANNING

READY

ACTIVE

PAUSED

HALTED

ANALYSIS

UNDER
REVIEW

VALIDATED
FOR
DEFINED
SCOPE

INCONCLUSIVE

TRANSFER
CANDIDATE

ARCHIVED

REVALIDATION
REQUIRED

SUPERSEDED
```

Permanent:

```text id="rt010"
STATUS
"ACTIVE"
≠
UNBOUNDED
RESEARCH
AUTHORITY
```

---

# 4. Research Type

Select or extend:

```text id="rt011"
RT01
ACADEMIC

RT02
AI

RT03
MODEL

RT04
LLM

RT05
PROMPT

RT06
AGENT

RT07
MULTI-
AGENT

RT08
ARCHITECTURE

RT09
DATA

RT10
SECURITY

RT11
MARKET

RT12
COMPETITIVE

RT13
TECHNOLOGY

RT14
PRODUCT

RT15
USER

RT16
SIMULATION

RT17
EXPERIMENTAL

RT18
BENCHMARK

RT19
PROTOTYPE

RT20
INNOVATION
```

Selected:

```text id="rt012"
[REQUIRED]
```

---

# 5. Research Class

Potential:

```text id="rt013"
EXPLORATORY

DESCRIPTIVE

COMPARATIVE

EXPERIMENTAL

EVALUATIVE

CAUSAL

FORECASTING

DESIGN
RESEARCH

VALIDATION

REPLICATION

SECURITY
RESEARCH

STRATEGIC
RESEARCH
```

Selected:

```text id="rt014"
[REQUIRED]
```

---

# 6. Executive Summary

## 6.1 Research Context

[REQUIRED]

## 6.2 Core Uncertainty

[REQUIRED]

## 6.3 Research Question

[REQUIRED]

## 6.4 Method

[REQUIRED]

## 6.5 Current Result State

```text id="rt015"
[REQUIRED]
```

## 6.6 Material Limitations

* [REQUIRED]

## 6.7 Decision Relevance

[REQUIRED]

---

# 7. Research Non-Authority Statement

Recommended:

```text id="rt016"
THIS
RESEARCH
MAY
INFORM:

STRATEGY

ARCHITECTURE

PRODUCT

ENGINEERING

SECURITY

TECHNOLOGY
SELECTION

MODEL /
PROMPT /
AGENT
DECISIONS

BUT
DOES
NOT
BY
ITSELF
AUTHORIZE:

IMPLEMENTATION

DEPLOYMENT

PRODUCTION
ACCESS

CUSTOMER
ROLLOUT

MODEL
PROMOTION

AGENT
AUTONOMY
INCREASE

TOOL
WRITE
AUTHORITY
```

---

# 8. Research Signal

A Research engagement should normally originate from a Signal, Knowledge gap, strategic requirement, risk, opportunity or unresolved question.

Potential:

```text id="rt017"
CUSTOMER
SIGNAL

MARKET
SIGNAL

TECHNOLOGY
SIGNAL

SECURITY
SIGNAL

OPERATIONS
SIGNAL

PRODUCT
SIGNAL

ARCHITECTURE
GAP

KNOWLEDGE
GAP

MODEL
CHANGE

AGENT
FAILURE

REGULATORY
CHANGE
```

---

# 9. Signal Record

```yaml id="rt018"
research_signal:
  signal_id: [REQUIRED]

  signal_type: [REQUIRED]

  observed_at: [REQUIRED]

  source_ref: [REQUIRED]

  description: [REQUIRED]

  evidence_refs:
    - [OPTIONAL]

  urgency_ref: [REQUIRED]

  project_scope_refs:
    - [OPTIONAL]

  owner_ref: [REQUIRED]

  status: [REQUIRED]
```

---

# 10. Signal Boundary

Permanent:

```text id="rt019"
SIGNAL
EXISTS
≠
RESEARCH
CONCLUSION
KNOWN
```

---

# 11. Research Intake

Record:

```yaml id="rt020"
research_intake:
  intake_id: [REQUIRED]

  signal_refs:
    - [REQUIRED]

  requester_ref: [REQUIRED]

  requested_question: [REQUIRED]

  expected_decision: [REQUIRED]

  urgency: [REQUIRED]

  known_constraints:
    - [OPTIONAL]

  known_risks:
    - [OPTIONAL]

  status: [REQUIRED]
```

---

# 12. Requester Boundary

```text id="rt021"
REQUESTER
≠
APPROVER
AUTOMATICALLY
```

---

# 13. Triage

Triage should evaluate:

```text id="rt022"
DUPLICATE?

ALREADY
ANSWERED?

QUESTION
VALID?

RESEARCH
NEEDED?

DECISION
VALUE?

RISK?

URGENCY?

SCOPE?

CAPACITY?

DEPENDENCIES?
```

---

# 14. Duplicate Research

Check existing:

* Research records.
* Experiments.
* Benchmarks.
* Prototypes.
* Publications.
* Memory.
* Knowledge.
* Technology Assessments.
* external Research.

Permanent:

```text id="rt023"
SIMILAR
TITLE
≠
DUPLICATE
RESEARCH

DIFFERENT
TITLE
≠
DIFFERENT
QUESTION
```

---

# 15. Research Question Identity

Potential:

```text id="rt024"
RQ-000001
```

---

# 16. Research Question Record

```yaml id="rt025"
research_question:
  question_id: [REQUIRED]

  research_ref: [REQUIRED]

  question: [REQUIRED]

  question_type: [REQUIRED]

  decision_ref: [REQUIRED]

  evidence_requirement_refs:
    - [REQUIRED]

  scope_ref: [REQUIRED]

  status: [REQUIRED]
```

---

# 17. Research Question Quality

The question should be:

```text id="rt026"
SPECIFIC

BOUNDED

ANSWERABLE

DECISION-
RELEVANT

NOT
LEADING

EVIDENCE-
SEEKING

CLEAR
ABOUT
POPULATION /
SYSTEM /
CONTEXT
```

---

# 18. Leading Question Boundary

Permanent:

```text id="rt027"
"PROVE
TECHNOLOGY X
IS
BEST"

≠

NEUTRAL
RESEARCH
QUESTION
```

---

# 19. Research Question vs Decision

```text id="rt028"
RESEARCH
QUESTION
ASKS
WHAT
EVIDENCE
SUPPORTS

DECISION
AUTHORITY
DECIDES
WHAT
ACTION
TO
TAKE
```

---

# 20. Research Objectives

## 20.1 Primary Objective

```text id="rt029"
[REQUIRED]
```

## 20.2 Secondary Objectives

```text id="rt030"
[OPTIONAL]
```

## 20.3 Non-Goals

* [REQUIRED]
* [REQUIRED]

---

# 21. Scope

## 21.1 In Scope

* [REQUIRED]

## 21.2 Out of Scope

* [REQUIRED]

## 21.3 Time Scope

```text id="rt031"
[REQUIRED where applicable]
```

## 21.4 Geographic Scope

```text id="rt032"
[OPTIONAL / NOT APPLICABLE]
```

## 21.5 Domain Scope

```text id="rt033"
[REQUIRED]
```

---

# 22. Scope Boundary

Permanent:

```text id="rt034"
RESEARCH
CONCLUSION
MUST
NOT
EXCEED
RESEARCH
SCOPE
```

---

# 23. Project Scope

```text id="rt035"
[REQUIRED]
```

Potential:

```text id="rt036"
Mianx.ai
CORE

SINGLE
PROJECT

MULTI-
PROJECT

SHARED
SERVICE

INDUSTRY
OS
```

---

# 24. Project Boundary

Permanent:

```text id="rt037"
PROJECT A
RESEARCH
RESULT
≠
PROJECT B
RESULT
AUTOMATICALLY
```

---

# 25. Tenant Scope

```text id="rt038"
[REQUIRED or NOT APPLICABLE]
```

---

# 26. Tenant Boundary

```text id="rt039"
TENANT
TAGGED
RESEARCH
≠
TENANT
ISOLATION
VERIFIED
```

---

# 27. Environment Scope

Potential:

```text id="rt040"
DESK
RESEARCH

OFFLINE
ANALYSIS

SANDBOX

TEST

SIMULATION

INTEGRATION

STAGING

CONTROLLED
PILOT
```

Selected:

```text id="rt041"
[REQUIRED]
```

---

# 28. Risk Classification

Use applicable conceptual Research risk:

```text id="rt042"
R0
MINIMAL

R1
LOW

R2
MODERATE

R3
HIGH

R4
CRITICAL
```

Selected:

```text id="rt043"
[REQUIRED]
```

---

# 29. Risk Boundary

Permanent:

```text id="rt044"
LOW
RESEARCH
RISK
≠
NO
RISK
```

---

# 30. Autonomy Classification

Where AI Agents participate:

```text id="rt045"
A0
NO
AUTONOMOUS
EXECUTION

A1
ASSISTIVE

A2
BOUNDED
TASK
EXECUTION

A3
BOUNDED
WORKFLOW
EXECUTION

A4
HIGHER
AUTONOMY
WITH
STRONG
GATES

A5
RESERVED /
SEPARATELY
AUTHORIZED
```

Selected:

```text id="rt046"
[REQUIRED where applicable]
```

---

# 31. Capability/Authority Boundary

Permanent:

```text id="rt047"
AGENT
CAN
PERFORM
ACTION
≠
AGENT
AUTHORIZED
TO
PERFORM
ACTION
```

---

# 32. Research Mandate

Record:

```yaml id="rt048"
research_mandate:
  mandate_id: [REQUIRED]

  research_ref: [REQUIRED]

  purpose: [REQUIRED]

  permitted_actions:
    - [REQUIRED]

  prohibited_actions:
    - [REQUIRED]

  project_scope_refs:
    - [REQUIRED]

  tenant_scope_refs:
    - [REQUIRED or NOT APPLICABLE]

  data_scope_refs:
    - [REQUIRED]

  tool_scope_refs:
    - [OPTIONAL]

  environment_scope_refs:
    - [REQUIRED]

  expiry_or_review_ref: [REQUIRED]

  authority_ref: [REQUIRED]

  status: [REQUIRED]
```

---

# 33. Mandate Boundary

```text id="rt049"
RESEARCH
MANDATE
≠
PRODUCTION
MANDATE
```

---

# 34. Research Authorization

Record:

```yaml id="rt050"
research_authorization:
  authorization_id: [REQUIRED]

  research_ref: [REQUIRED]

  mandate_ref: [REQUIRED]

  authority_ref: [REQUIRED]

  approved_scope: [REQUIRED]

  conditions:
    - [OPTIONAL]

  authorized_at: [REQUIRED]

  status: [REQUIRED]
```

---

# 35. Authorization Boundary

Permanent:

```text id="rt051"
RESEARCH
DOCUMENT
CREATED
≠
RESEARCH
EXECUTION
AUTHORIZED
```

---

# 36. Founder Routing

Research requiring Founder authority should be explicitly routed.

Permanent:

```text id="rt052"
ROUTED
TO
FOUNDER
≠
FOUNDER
APPROVED
```

---

# 37. Founder Approval Evidence

```text id="rt053"
AGENT /
MODEL /
DOCUMENT /
MEMORY
SAYS
"FOUNDER
APPROVED"
≠
FOUNDER
APPROVAL
EVIDENCE
```

---

# 38. Silence Boundary

```text id="rt054"
SILENCE
≠
APPROVAL
```

---

# 39. Prior Knowledge Review

Review:

```text id="rt055"
INTERNAL
KNOWLEDGE

MEMORY

PRIOR
RESEARCH

BENCHMARKS

EXPERIMENTS

PROTOTYPES

PUBLICATIONS

ACADEMIC
LITERATURE

VENDOR
MATERIAL

MARKET
RESEARCH
```

---

# 40. Prior Knowledge Record

| Source Ref | Type | Version/Date | Relevance | Reliability | Gap |
| ---------- | ---- | ------------ | --------- | ----------- | --- |
| [REQUIRED] | [ ]  | [ ]          | [ ]       | [ ]         | [ ] |

---

# 41. Knowledge Freshness

Classify:

```text id="rt056"
CURRENT

POTENTIALLY
STALE

STALE

UNKNOWN
```

---

# 42. Freshness Boundary

Permanent:

```text id="rt057"
KNOWLEDGE
EXISTS
≠
KNOWLEDGE
CURRENT
```

---

# 43. External Source Provenance

Record:

```yaml id="rt058"
research_source:
  source_id: [REQUIRED]

  type: [REQUIRED]

  title: [REQUIRED]
  author_or_org: [REQUIRED]

  date: [REQUIRED where known]

  source_ref: [REQUIRED]

  accessed_at: [REQUIRED]

  relevance: [REQUIRED]

  reliability_notes:
    - [REQUIRED]

  conflict_of_interest_notes:
    - [OPTIONAL]
```

---

# 44. Vendor Source Boundary

```text id="rt059"
VENDOR
CLAIM
≠
INDEPENDENT
EVIDENCE
```

---

# 45. Source Multiplicity Boundary

Permanent:

```text id="rt060"
TEN
ARTICLES
REPEATING
ONE
ORIGINAL
CLAIM
≠
TEN
INDEPENDENT
SOURCES
```

---

# 46. Hypothesis Identity

Potential:

```text id="rt061"
HYP-000001
```

---

# 47. Hypothesis Record

```yaml id="rt062"
research_hypothesis:
  hypothesis_id: [REQUIRED]

  research_ref: [REQUIRED]
  question_ref: [REQUIRED]

  statement: [REQUIRED]

  falsification_conditions:
    - [REQUIRED]

  supporting_evidence_refs:
    - [OPTIONAL]

  counter_evidence_refs:
    - [OPTIONAL]

  result_state: [REQUIRED]

  status: [REQUIRED]
```

---

# 48. Hypothesis Boundary

Permanent:

```text id="rt063"
HYPOTHESIS
SUPPORTED
≠
HYPOTHESIS
PROVEN
```

---

# 49. Confirmation Bias Control

Research should actively seek:

```text id="rt064"
DISCONFIRMING
EVIDENCE

ALTERNATIVE
EXPLANATIONS

NEGATIVE
CASES

INDEPENDENT
REVIEW

REPLICATION
```

---

# 50. Assumptions

Record:

```yaml id="rt065"
research_assumption:
  assumption_id: [REQUIRED]

  statement: [REQUIRED]

  evidence_refs:
    - [OPTIONAL]

  confidence_state: [REQUIRED]

  impact_if_wrong: [REQUIRED]

  validation_ref: [OPTIONAL]

  status: [REQUIRED]
```

---

# 51. Assumption Boundary

```text id="rt066"
ASSUMPTION
≠
FACT
```

---

# 52. Unknowns

Record unresolved Unknowns.

```yaml id="rt067"
research_unknown:
  unknown_id: [REQUIRED]
  description: [REQUIRED]
  decision_impact: [REQUIRED]
  evidence_needed: [REQUIRED]
  status: [REQUIRED]
```

---

# 53. Unknown Boundary

Permanent:

```text id="rt068"
UNKNOWN
≠
ZERO

UNKNOWN
≠
FALSE

UNKNOWN
≠
TRUE
```

---

# 54. Research Method

Potential:

```text id="rt069"
LITERATURE
REVIEW

SYSTEMATIC
REVIEW

EXPERIMENT

BENCHMARK

SIMULATION

PROTOTYPE

SURVEY

INTERVIEW

OBSERVATIONAL
STUDY

DATA
ANALYSIS

MARKET
ANALYSIS

COMPETITIVE
ANALYSIS

TECHNOLOGY
ASSESSMENT

SECURITY
TESTING

MIXED
METHODS
```

Selected:

```text id="rt070"
[REQUIRED]
```

---

# 55. Method Rationale

```text id="rt071"
[REQUIRED]
```

---

# 56. Method Boundary

Permanent:

```text id="rt072"
METHOD
SELECTED
≠
METHOD
VALID
FOR
QUESTION
AUTOMATICALLY
```

---

# 57. Mixed Methods

Where appropriate:

```text id="rt073"
QUANTITATIVE
EVIDENCE

+

QUALITATIVE
EVIDENCE

+

TECHNICAL
EVIDENCE
```

may be combined while preserving different inference limits.

---

# 58. Research Plan

```yaml id="rt074"
research_plan:
  plan_id: [REQUIRED]

  research_ref: [REQUIRED]
  version: [REQUIRED]

  question_refs:
    - [REQUIRED]

  hypothesis_refs:
    - [OPTIONAL]

  method_refs:
    - [REQUIRED]

  dataset_refs:
    - [OPTIONAL]

  environment_refs:
    - [OPTIONAL]

  experiment_refs:
    - [OPTIONAL]

  benchmark_refs:
    - [OPTIONAL]

  simulation_refs:
    - [OPTIONAL]

  prototype_refs:
    - [OPTIONAL]

  milestone_refs:
    - [REQUIRED]

  risk_refs:
    - [REQUIRED]

  authorization_refs:
    - [REQUIRED]

  status: [REQUIRED]
```

---

# 59. Plan Versioning

Material changes should create controlled revision history.

Permanent:

```text id="rt075"
RESEARCH
PLAN
CHANGED
AFTER
RESULTS
≠
ORIGINAL
PLAN
```

---

# 60. Research Milestones

Potential:

```text id="rt076"
QUESTION
VALIDATED

METHOD
SELECTED

DATA
READY

ENVIRONMENT
READY

EXPERIMENT
COMPLETE

BENCHMARK
COMPLETE

SIMULATION
COMPLETE

PROTOTYPE
COMPLETE

EVIDENCE
REVIEW

VALIDATION
REVIEW

TRANSFER
CANDIDATE
```

---

# 61. Milestone Boundary

```text id="rt077"
MILESTONE
COMPLETE
≠
EXPECTED
OUTCOME
ACHIEVED
```

---

# 62. Input Readiness

Assess:

```text id="rt078"
DATA

DATASET

MODEL

PROMPT

AGENT

TOOLS

MEMORY

RETRIEVAL

INFRASTRUCTURE

ENVIRONMENT

HUMAN
PARTICIPANTS
```

---

# 63. Data Identity

```text id="rt079"
[REQUIRED where applicable]
```

---

# 64. Dataset Identity

```text id="rt080"
[REQUIRED where applicable]
```

---

# 65. Dataset Version

```text id="rt081"
[REQUIRED]
```

---

# 66. Dataset Provenance

Record:

* origin.
* owner.
* collection method.
* transformation.
* version.
* labels.
* rights.
* quality.
* known biases.
* Project scope.
* Tenant scope.

---

# 67. Data Authorization

Permanent:

```text id="rt082"
DATA
AVAILABLE
≠
DATA
AUTHORIZED
FOR
RESEARCH
```

---

# 68. Production Data Boundary

```text id="rt083"
REALISTIC
RESEARCH
WOULD
BENEFIT
FROM
PRODUCTION
DATA
≠
PRODUCTION
DATA
AUTHORIZED
```

---

# 69. Synthetic Data Boundary

```text id="rt084"
SYNTHETIC
DATA
≠
PRODUCTION
DATA
DISTRIBUTION
PROVEN
```

---

# 70. Dataset Quality

Assess:

```text id="rt085"
COMPLETENESS

CORRECTNESS

PROVENANCE

REPRESENTATIVENESS

DUPLICATION

BIAS

FRESHNESS

LABEL
QUALITY
```

---

# 71. Model Configuration

Where applicable:

```text id="rt086"
MODEL
ID

PROVIDER

VERSION

SAMPLING

REASONING
MODE

CONTEXT

ROUTER

FALLBACK
```

---

# 72. Model Boundary

Permanent:

```text id="rt087"
SAME
MODEL
ALIAS
≠
SAME
MODEL
BEHAVIOR
GUARANTEED
```

---

# 73. Prompt Configuration

Record:

```text id="rt088"
PROMPT
ID

VERSION

SYSTEM
INSTRUCTIONS

CONTEXT
TEMPLATE

EXAMPLES

OUTPUT
CONTRACT

TOOL
INSTRUCTIONS
```

---

# 74. Agent Configuration

Record:

```text id="rt089"
AGENT
ID

VERSION

ROLE

MANDATE

AUTONOMY

MODEL

PROMPT

TOOLS

MEMORY

RETRIEVAL

DELEGATION

HALT
POLICY
```

---

# 75. Multi-Agent Configuration

Record:

```text id="rt090"
COORDINATOR

SPECIALISTS

COMMUNICATION

DELEGATION

DISSENT

ARBITRATION

VERIFIER

SHARED
STATE

TOOLS

MEMORY
```

---

# 76. Multi-Agent Boundary

Permanent:

```text id="rt091"
MULTI-
AGENT
CONSENSUS
≠
CORRECTNESS
```

---

# 77. Tool Configuration

| Tool       | Version | Authorization | Read/Write | Side Effect | Verification |
| ---------- | ------- | ------------- | ---------- | ----------- | ------------ |
| [REQUIRED] | [ ]     | [ ]           | [ ]        | [ ]         | [ ]          |

---

# 78. Tool Boundary

```text id="rt092"
TOOL
RESPONSE
SUCCESS
≠
EXTERNAL
SIDE
EFFECT
VERIFIED
```

---

# 79. Memory Configuration

Record:

* store.
* version.
* write policy.
* read policy.
* provenance.
* freshness.
* Project scope.
* Tenant scope.
* retention.
* reset method.

---

# 80. Memory Boundary

```text id="rt093"
MEMORY
CONTAINS
CLAIM
≠
CLAIM
TRUE
```

---

# 81. Retrieval Configuration

Record:

```text id="rt094"
INDEX

VERSION

EMBEDDING
MODEL

CHUNKING

TOP-K

RERANKER

AUTHORIZATION

PROJECT
FILTER

TENANT
FILTER
```

---

# 82. Environment Identity

```text id="rt095"
[REQUIRED where applicable]
```

---

# 83. Environment Version

```text id="rt096"
[REQUIRED]
```

---

# 84. Environment Truth

Label components:

```text id="rt097"
REAL

SIMULATED

SYNTHETIC

MOCKED

MANUAL

WIZARD-
OF-
OZ
```

where applicable.

---

# 85. Environment Boundary

Permanent:

```text id="rt098"
TEST
ENVIRONMENT
≈
PRODUCTION
≠
PRODUCTION
```

---

# 86. Research Gates

Potential:

```text id="rt099"
RG01
SCOPE
GATE

RG02
AUTHORIZATION
GATE

RG03
DATA
GATE

RG04
SECURITY
GATE

RG05
PRIVACY
GATE

RG06
RESPONSIBLE
AI
GATE

RG07
LEGAL /
IP
GATE

RG08
ENVIRONMENT
GATE

RG09
EXECUTION
GATE

RG10
TRANSFER
GATE
```

---

# 87. Gate Boundary

```text id="rt100"
PASSING
ONE
RESEARCH
GATE
≠
PASSING
ALL
LATER
GATES
```

---

# 88. Hard Gates

Potential:

```text id="rt101"
UNAUTHORIZED
DATA

CROSS-
TENANT
ACCESS

SECRET
EXPOSURE

CRITICAL
SECURITY
RISK

UNAUTHORIZED
TOOL
WRITE

LEGAL
PROHIBITION

INVALID
AUTHORITY
```

---

# 89. Hard-Gate Boundary

Permanent:

```text id="rt102"
HIGH
RESEARCH
VALUE
≠
HARD
GATE
WAIVER
```

---

# 90. Pre-Execution Readiness

Checklist:

* [ ] Research ID valid.
* [ ] version valid.
* [ ] scope current.
* [ ] Research Question current.
* [ ] mandate current.
* [ ] authorization current.
* [ ] Project scope current.
* [ ] Tenant scope current.
* [ ] Data authorized.
* [ ] environment correct.
* [ ] configuration pinned.
* [ ] security controls current.
* [ ] privacy controls current.
* [ ] legal/IP controls current where applicable.
* [ ] monitoring enabled.
* [ ] HALT path available.

---

# 91. Execution Record

```yaml id="rt103"
research_execution:
  execution_id: [REQUIRED]

  research_ref: [REQUIRED]
  research_version: [REQUIRED]

  plan_ref: [REQUIRED]

  environment_ref: [REQUIRED]

  executed_by_ref: [REQUIRED]

  started_at: [REQUIRED]
  completed_at: [REQUIRED]

  experiment_refs:
    - [OPTIONAL]

  benchmark_refs:
    - [OPTIONAL]

  simulation_refs:
    - [OPTIONAL]

  prototype_refs:
    - [OPTIONAL]

  evidence_refs:
    - [REQUIRED]

  deviation_refs:
    - [OPTIONAL]

  incident_refs:
    - [OPTIONAL]

  status: [REQUIRED]
```

---

# 92. Experiment Integration

Use the Experiment Template where causal or controlled comparison questions require formal Experiment design.

Permanent:

```text id="rt104"
EXPERIMENT
RESULT
≠
UNIVERSAL
TRUTH
```

---

# 93. Benchmark Integration

Use Benchmark Template when measurable comparison is required.

Permanent:

```text id="rt105"
BENCHMARK
WIN
≠
UNIVERSAL
SYSTEM
SUPERIORITY
```

---

# 94. Simulation Integration

Simulation may test:

```text id="rt106"
SCALE

CAPACITY

COST

FAILURE

AGENT
BEHAVIOR

MULTI-
PROJECT
BEHAVIOR

TENANT
SCENARIOS
```

Permanent:

```text id="rt107"
SIMULATION
RESULT
≠
RUNTIME
VERIFICATION
```

---

# 95. Prototype Integration

Prototype should reduce uncertainty about feasibility, architecture or experience.

Permanent:

```text id="rt108"
PROTOTYPE
SUCCESS
≠
PRODUCT
READY

≠

PRODUCTION
READY
```

---

# 96. MVP Boundary

```text id="rt109"
MVP
VALIDATION
≠
PRODUCT-
MARKET
FIT
AUTOMATICALLY
```

---

# 97. Pilot Boundary

```text id="rt110"
PILOT
SUCCESS
≠
PRODUCTION
AUTHORIZATION
```

---

# 98. Human Research

Where Human participants are involved, document applicable:

```text id="rt111"
PARTICIPANT
CLASS

RECRUITMENT

CONSENT

RISK

PRIVACY

DATA
COLLECTION

WITHDRAWAL

COMPENSATION

DEBRIEF
```

---

# 99. Human Research Boundary

Permanent:

```text id="rt112"
CONSENT
FOR
ONE
RESEARCH
PURPOSE
≠
CONSENT
FOR
ALL
FUTURE
USES
```

---

# 100. Observation Identity

Potential:

```text id="rt113"
OBS-000001
```

---

# 101. Observation Record

```yaml id="rt114"
research_observation:
  observation_id: [REQUIRED]

  research_ref: [REQUIRED]

  execution_ref: [REQUIRED]

  observed_at: [REQUIRED]

  observation: [REQUIRED]

  raw_evidence_refs:
    - [REQUIRED]

  interpretation:
    [OPTIONAL]

  confidence_state: [REQUIRED]
```

---

# 102. Observation Boundary

Permanent:

```text id="rt115"
OBSERVATION
≠
INTERPRETATION
```

---

# 103. Evidence Identity

Potential:

```text id="rt116"
EVID-000001
```

---

# 104. Evidence Record

```yaml id="rt117"
research_evidence:
  evidence_id: [REQUIRED]

  research_ref: [REQUIRED]

  evidence_type: [REQUIRED]

  source_ref: [REQUIRED]

  artifact_ref: [REQUIRED]

  provenance_ref: [REQUIRED]

  observed_at: [REQUIRED]

  project_scope_ref: [REQUIRED where applicable]
  tenant_scope_ref: [REQUIRED where applicable]

  integrity_state: [REQUIRED]

  limitations:
    - [OPTIONAL]
```

---

# 105. Evidence Types

Potential:

```text id="rt118"
RAW
OUTPUT

LOG

TRACE

METRIC

DATABASE
READ-
BACK

TOOL
READ-
BACK

SCREENSHOT

DATASET

INTERVIEW

SURVEY

EXPERIMENT

BENCHMARK

SIMULATION

PROTOTYPE

EXTERNAL
SOURCE
```

---

# 106. Evidence Boundary

Permanent:

```text id="rt119"
EVIDENCE
EXISTS
≠
CLAIM
SUPPORTED
AUTOMATICALLY
```

---

# 107. Screenshot Boundary

```text id="rt120"
SCREENSHOT
SHOWS
UI
STATE
≠
COMPLETE
BACKEND
TRUTH
```

---

# 108. Tool Side-Effect Evidence

Conceptually:

```text id="rt121"
TOOL
REQUEST

↓

TOOL
RESPONSE

↓

EXTERNAL
READ-
BACK

↓

SIDE
EFFECT
VERIFICATION
```

---

# 109. Filesystem Truth

Permanent:

```text id="rt122"
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

# 110. Git Truth

```text id="rt123"
FILE
CREATED
LOCALLY
≠
COMMITTED

COMMITTED
≠
PUSHED

PUSHED
≠
DEPLOYED
```

---

# 111. Runtime Truth Ladder

Use where implementation claims are made:

```text id="rt124"
DESIGNED

↓

CODED

↓

COMMITTED

↓

PUSHED

↓

DEPLOYED

↓

RUNNING

↓

TESTED

↓

VERIFIED

↓

PRODUCTION
AUTHORIZED
```

Each transition requires its own Evidence.

---

# 112. Counter-Evidence

Record:

```yaml id="rt125"
counter_evidence:
  counter_evidence_id: [REQUIRED]

  research_ref: [REQUIRED]

  affected_hypothesis_refs:
    - [REQUIRED]

  description: [REQUIRED]

  evidence_refs:
    - [REQUIRED]

  interpretation: [REQUIRED]

  status: [REQUIRED]
```

---

# 113. Counter-Evidence Boundary

Permanent:

```text id="rt126"
PREFERRED
CONCLUSION
≠
COUNTER-
EVIDENCE
OPTIONAL
```

---

# 114. Negative Findings

Record meaningful failures.

Permanent:

```text id="rt127"
NEGATIVE
FINDING
≠
FAILED
RESEARCH
```

---

# 115. Null Findings

Permanent:

```text id="rt128"
NO
DETECTED
EFFECT
≠
PROOF
OF
NO
EFFECT
```

---

# 116. Metrics

Potential:

```text id="rt129"
QUALITY

PERFORMANCE

COST

SAFETY

SECURITY

RELIABILITY

SCALABILITY

USER
VALUE

MARKET
SIGNAL

EVIDENCE
QUALITY
```

---

# 117. Metric Definition

```yaml id="rt130"
research_metric:
  metric_id: [REQUIRED]

  name: [REQUIRED]
  definition: [REQUIRED]
  unit: [REQUIRED]

  source_ref: [REQUIRED]

  aggregation: [REQUIRED]

  threshold:
    [OPTIONAL]

  threshold_rationale:
    [REQUIRED if threshold exists]

  hard_gate: [YES / NO]
```

---

# 118. Threshold Boundary

Permanent:

```text id="rt131"
THRESHOLD
NOT
SUPPORTED
BY
METHOD /
GOVERNANCE
≠
THRESHOLD
MAY
BE
INVENTED
```

---

# 119. Quantitative Analysis

Where applicable:

* descriptive statistics.
* distribution.
* uncertainty.
* confidence intervals.
* effect size.
* statistical tests.
* subgroup analysis.
* sensitivity analysis.
* multiple comparisons.

---

# 120. Statistical Boundary

```text id="rt132"
STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE
```

---

# 121. Missing Data

Permanent:

```text id="rt133"
MISSING
DATA
≠
ZERO
```

---

# 122. Qualitative Analysis

Potential:

* thematic analysis.
* coding.
* pattern extraction.
* interview synthesis.
* contradiction analysis.
* source comparison.

---

# 123. Qualitative Boundary

```text id="rt134"
REPEATED
THEME
≠
POPULATION
PREVALENCE
WITHOUT
APPROPRIATE
METHOD
```

---

# 124. Causal Interpretation

Permanent:

```text id="rt135"
CORRELATION
≠
CAUSATION
```

---

# 125. Causal Claim Boundary

```text id="rt136"
CONTROLLED
RESEARCH
DESIGN
≠
PERFECT
CAUSAL
IDENTIFICATION
AUTOMATICALLY
```

---

# 126. Alternative Explanations

Required for material conclusions:

* [REQUIRED]
* [REQUIRED]

---

# 127. Subgroup Analysis

Potential:

```text id="rt137"
PROJECT

TENANT

DOMAIN

LANGUAGE

USER
CLASS

RISK
CLASS

TASK
COMPLEXITY
```

Permanent:

```text id="rt138"
GOOD
AGGREGATE
RESULT
≠
GOOD
SUBGROUP
RESULT
```

---

# 128. Tail Analysis

Assess rare but high-impact failures where appropriate.

Permanent:

```text id="rt139"
GOOD
AVERAGE
≠
SAFE
TAIL
```

---

# 129. Research Deviations

Potential:

```text id="rt140"
SCOPE
CHANGE

METHOD
CHANGE

DATA
CHANGE

MODEL
CHANGE

PROMPT
CHANGE

AGENT
CHANGE

TOOL
CHANGE

ENVIRONMENT
CHANGE

METRIC
CHANGE

ANALYSIS
CHANGE
```

---

# 130. Deviation Record

```yaml id="rt141"
research_deviation:
  deviation_id: [REQUIRED]

  research_ref: [REQUIRED]

  planned_state: [REQUIRED]
  actual_state: [REQUIRED]

  reason: [REQUIRED]

  impact: [REQUIRED]

  invalidation_required:
    [YES / NO / UNKNOWN]

  authorization_ref:
    [REQUIRED where material]

  status: [REQUIRED]
```

---

# 131. Deviation Boundary

Permanent:

```text id="rt142"
DEVIATION
RECORDED
≠
RESULT
VALID
AUTOMATICALLY
```

---

# 132. Change Control

Material Research changes should use:

```text id="rt143"
PAUSE

↓

DOCUMENT
CHANGE

↓

ASSESS
IMPACT

↓

VERSION

↓

REAUTHORIZE
WHERE
REQUIRED

↓

RESUME /
START
NEW
RESEARCH
```

---

# 133. Reproducibility

Preserve where applicable:

```text id="rt144"
QUESTION

METHOD

DATA

DATASET

CONFIG

MODEL

PROMPT

AGENT

TOOLS

ENVIRONMENT

PROTOCOL

METRICS

ANALYSIS
```

---

# 134. Reproducibility Boundary

```text id="rt145"
METHOD
DOCUMENTED
≠
RESULT
REPRODUCIBLE
UNTIL
REPRODUCED
```

---

# 135. Replication

Potential:

```text id="rt146"
DIRECT

INDEPENDENT

CONCEPTUAL

CROSS-
ENVIRONMENT

CROSS-
PROJECT

CROSS-
TENANT

CROSS-
DOMAIN
```

---

# 136. Replication Boundary

Permanent:

```text id="rt147"
ORIGINAL
RESULT
≠
REPLICATION
RESULT
```

---

# 137. Independent Challenge

Where stakes warrant:

```text id="rt148"
INDEPENDENT
REVIEWER

ALTERNATIVE
MODEL

ALTERNATIVE
METHOD

ALTERNATIVE
DATA

ADVERSARIAL
REVIEW

RED
TEAM
```

---

# 138. Self-Review Boundary

```text id="rt149"
SELF-
CRITIQUE
≠
INDEPENDENT
VERIFICATION
```

---

# 139. Validity Dimensions

Assess:

```text id="rt150"
INTERNAL
VALIDITY

EXTERNAL
VALIDITY

CONSTRUCT
VALIDITY

STATISTICAL
VALIDITY

ECOLOGICAL
VALIDITY
```

where relevant.

---

# 140. Internal Validity Threats

Potential:

* confounding.
* measurement error.
* state leakage.
* selection bias.
* protocol deviations.
* evaluator bias.
* stale Data.
* configuration drift.

---

# 141. External Validity Threats

Potential:

* narrow population.
* narrow Project scope.
* narrow Tenant scope.
* synthetic Data.
* mocked dependencies.
* limited languages.
* limited geography.
* limited operational duration.

---

# 142. Generalization Boundary

Permanent:

```text id="rt151"
VALID
FOR
DEFINED
RESEARCH
SCOPE
≠
VALID
FOR
ALL
Mianx.ai
USE
CASES
```

---

# 143. Security Review

Assess:

```text id="rt152"
SECRETS

CREDENTIALS

NETWORK

DATA

TOOLS

PROMPT
INJECTION

AUTHORITY
INJECTION

MEMORY
POISONING

RAG
POISONING

SUPPLY
CHAIN

TENANT
ISOLATION
```

---

# 144. Untrusted Content Rule

Permanent:

```text id="rt153"
UNTRUSTED
CONTENT
=
DATA

NOT
AUTHORITY
```

---

# 145. Prompt Injection

Where applicable, test direct and indirect Prompt Injection paths.

---

# 146. Authority Injection

Permanent:

```text id="rt154"
UNTRUSTED
CONTENT
SAYS
"AUTHORIZED"
≠
AUTHORIZATION
```

---

# 147. Secret Boundary

```text id="rt155"
RESEARCH
NEEDS
SYSTEM
ACCESS
≠
RESEARCH
NEEDS
PRODUCTION
ADMIN
SECRETS
```

---

# 148. Project Isolation

Permanent:

```text id="rt156"
PROJECT A
RESEARCH
AUTHORITY
≠
PROJECT B
ACCESS
AUTHORITY
```

---

# 149. Tenant Isolation

Test where applicable across:

```text id="rt157"
DATABASE

STORAGE

CACHE

QUEUE

VECTOR

MEMORY

TOOLS

EXPORT

AUDIT
```

---

# 150. Tenant Hard Gate

Permanent:

```text id="rt158"
UNAUTHORIZED
CROSS-
TENANT
ACCESS
=
CRITICAL
RESEARCH
FAILURE
```

---

# 151. Privacy Review

Assess:

* minimization.
* purpose limitation.
* retention.
* Human access.
* external transmission.
* deletion.
* logs.
* re-identification risk.

---

# 152. Responsible AI Review

Assess where relevant:

```text id="rt159"
BIAS

FAIRNESS

HARM

TRANSPARENCY

HUMAN
OVERSIGHT

AUTONOMY

MISUSE

ACCESSIBILITY
```

---

# 153. Legal and Compliance Review

Potential:

```text id="rt160"
DATA
RIGHTS

LICENSE

CONTRACT

REGULATION

EXPORT
CONTROL

INDUSTRY
REQUIREMENT

JURISDICTION
```

---

# 154. Legal Boundary

Permanent:

```text id="rt161"
TECHNICALLY
POSSIBLE
≠
LEGALLY
AUTHORIZED
```

---

# 155. Intellectual Property Review

Assess:

```text id="rt162"
PATENT

TRADE
SECRET

COPYRIGHT

SOURCE
LICENSE

MODEL
LICENSE

DATA
LICENSE

THIRD-
PARTY
IP
```

---

# 156. Publication/IP Boundary

```text id="rt163"
RESEARCH
READY
TO
SHARE
≠
RESEARCH
SAFE
TO
PUBLISH
```

---

# 157. Resource Plan

Potential:

```text id="rt164"
RESEARCHER
TIME

ENGINEERING
TIME

AGENT
CAPACITY

MODEL
TOKENS

COMPUTE

STORAGE

TOOLS

HUMAN
PARTICIPANTS

EXTERNAL
SERVICES
```

---

# 158. Resource Estimate Boundary

```text id="rt165"
RESOURCE
ESTIMATE
≠
BUDGET
APPROVAL
```

---

# 159. Research Cost

Record:

```text id="rt166"
ESTIMATED
COST:
[REQUIRED where material]

ACTUAL
COST:
[REQUIRED after execution where material]
```

---

# 160. Research Cost Boundary

```text id="rt167"
RESEARCH
COST
≠
PRODUCTION
TCO
```

---

# 161. Observability

Capture where applicable:

```text id="rt168"
LOGS

METRICS

TRACES

AUDIT

MODEL
CALLS

AGENT
ACTIONS

TOOL
ACTIONS

COST

ERRORS
```

---

# 162. Audit Events

Potential:

```text id="rt169"
RESEARCH
CREATED

QUESTION
CREATED

SCOPE
CHANGED

AUTHORIZATION
CHANGED

PLAN
CHANGED

EXECUTION
STARTED

EXECUTION
PAUSED

EVIDENCE
ADDED

DEVIATION
RECORDED

INCIDENT
RECORDED

RESEARCH
HALTED

VALIDATION
COMPLETED

TRANSFER
CREATED

RESEARCH
ARCHIVED
```

---

# 163. Research Incident Classes

Potential:

```text id="rt170"
RI01
UNAUTHORIZED
DATA
USE

RI02
PRODUCTION
CREDENTIAL
EXPOSURE

RI03
CROSS-
PROJECT
ACCESS

RI04
CROSS-
TENANT
ACCESS

RI05
SECRET
EXPOSURE

RI06
UNAUTHORIZED
TOOL
SIDE
EFFECT

RI07
PROMPT
INJECTION
SUCCESS

RI08
AUTHORITY
INJECTION
SUCCESS

RI09
MALICIOUS
RESEARCH
ARTIFACT

RI10
EVIDENCE
LOSS

RI11
EVIDENCE
FABRICATION

RI12
FALSE
FOUNDER
APPROVAL

RI13
DEVIATION
CONCEALED

RI14
RESEARCH
RESULT
MISREPRESENTED
AS
IMPLEMENTATION
VERIFICATION

RI15
RESEARCH
MISREPRESENTED
AS
PRODUCTION
AUTHORIZATION
```

---

# 164. HALT Triggers

Potential:

```text id="rt171"
CROSS-
TENANT
ACCESS

SECRET
EXPOSURE

UNAUTHORIZED
PRODUCTION
DATA

UNAUTHORIZED
PRODUCTION
WRITE

SANDBOX
ESCAPE

CRITICAL
SECURITY
FAILURE

INVALID
AUTHORITY

MATERIAL
EVIDENCE
INVALIDATION

LEGAL
PROHIBITION
```

---

# 165. HALT Boundary

Permanent:

```text id="rt172"
RESEARCH
HALT
RECORDED
≠
AGENT /
TOOL /
RUNNER /
WORKFLOW
ACTUALLY
HALTED
UNTIL
VERIFIED
```

---

# 166. Incident Response

Conceptually:

```text id="rt173"
DETECT

↓

HALT
WHERE
REQUIRED

↓

ISOLATE

↓

PRESERVE
EVIDENCE

↓

IDENTIFY
AFFECTED
PROJECT /
TENANT /
DATA /
RUNS

↓

INVALIDATE
AFFECTED
RESULTS

↓

CORRECT
CONTROL

↓

REAUTHORIZE
WHERE
REQUIRED

↓

REVALIDATE

↓

RESUME
```

---

# 167. Resume Requirements

Before Resume:

* root cause assessed.
* Evidence preserved.
* invalid Evidence quarantined.
* environment safe.
* credentials safe.
* Data authorization current.
* Project/Tenant boundaries safe.
* protocol current.
* mandate current.
* authorization current.
* Resume decision recorded.

---

# 168. Research Results

## 168.1 Primary Findings

* [REQUIRED]

## 168.2 Secondary Findings

* [OPTIONAL]

## 168.3 Negative Findings

* [REQUIRED]

## 168.4 Null Findings

* [REQUIRED where applicable]

## 168.5 Unexpected Findings

* [OPTIONAL]

---

# 169. Finding Record

```yaml id="rt174"
research_finding:
  finding_id: [REQUIRED]

  research_ref: [REQUIRED]

  statement: [REQUIRED]

  finding_type: [REQUIRED]

  evidence_refs:
    - [REQUIRED]

  counter_evidence_refs:
    - [OPTIONAL]

  scope: [REQUIRED]

  confidence_state: [REQUIRED]

  limitations:
    - [OPTIONAL]

  status: [REQUIRED]
```

---

# 170. Finding Types

Potential:

```text id="rt175"
OBSERVATIONAL

QUANTITATIVE

QUALITATIVE

COMPARATIVE

CAUSAL
CANDIDATE

TECHNICAL

SECURITY

MARKET

BEHAVIORAL

NEGATIVE

NULL
```

---

# 171. Finding Boundary

Permanent:

```text id="rt176"
FINDING
≠
DECISION
```

---

# 172. Analysis

## 172.1 Primary Analysis

[REQUIRED]

## 172.2 Alternative Explanations

* [REQUIRED]

## 172.3 Counter-Evidence Review

[REQUIRED]

## 172.4 Sensitivity Analysis

[OPTIONAL]

## 172.5 Subgroup Analysis

[OPTIONAL / REQUIRED where material]

## 172.6 Tail Analysis

[OPTIONAL / REQUIRED where material]

---

# 173. Research Limitations

Required:

* [REQUIRED]
* [REQUIRED]
* [REQUIRED]

---

# 174. Limitation Boundary

```text id="rt177"
LIMITATION
DOCUMENTED
≠
LIMITATION
RESOLVED
```

---

# 175. Evidence Gaps

```text id="rt178"
[REQUIRED]
```

---

# 176. Confidence State

Potential:

```text id="rt179"
UNKNOWN

LOW

MODERATE

STRONG
FOR
DEFINED
SCOPE
```

Selected:

```text id="rt180"
[REQUIRED]
```

---

# 177. Confidence Boundary

Permanent:

```text id="rt181"
STRONG
CONFIDENCE
≠
CERTAINTY
```

---

# 178. Conclusion

## 178.1 Supported Claims

* [REQUIRED]

## 178.2 Unsupported Claims

* [REQUIRED]

## 178.3 Unresolved Claims

* [REQUIRED]

## 178.4 Further Research Needed

* [REQUIRED where applicable]

---

# 179. Conclusion Boundary

```text id="rt182"
RESEARCH
CONCLUSION
≠
ENTERPRISE
ACTION
AUTHORIZED
```

---

# 180. Validation

Potential validation types:

```text id="rt183"
METHODOLOGY
VALIDATION

DATA
VALIDATION

EXPERIMENT
VALIDATION

BENCHMARK
VALIDATION

TECHNICAL
VALIDATION

SECURITY
VALIDATION

INDEPENDENT
REVIEW

REPLICATION
```

---

# 181. Validation Result States

Potential:

```text id="rt184"
VALIDATED
FOR
DEFINED
SCOPE

PARTIALLY
VALIDATED

INCONCLUSIVE

NOT
VALIDATED

INVALIDATED
```

Selected:

```text id="rt185"
[REQUIRED]
```

---

# 182. Validation Boundary

Permanent:

```text id="rt186"
RESEARCH
VALIDATED
FOR
DEFINED
SCOPE
≠
PRODUCT
VALIDATED

≠

PRODUCTION
AUTHORIZED
```

---

# 183. Research Review Matrix

| Review                 | Required? | Reviewer | Status | Evidence Ref |
| ---------------------- | --------- | -------- | ------ | ------------ |
| Research Method        | [ ]       | [ ]      | [ ]    | [ ]          |
| Evidence               | [ ]       | [ ]      | [ ]    | [ ]          |
| Technical              | [ ]       | [ ]      | [ ]    | [ ]          |
| Security               | [ ]       | [ ]      | [ ]    | [ ]          |
| Privacy                | [ ]       | [ ]      | [ ]    | [ ]          |
| Responsible AI         | [ ]       | [ ]      | [ ]    | [ ]          |
| Legal                  | [ ]       | [ ]      | [ ]    | [ ]          |
| IP                     | [ ]       | [ ]      | [ ]    | [ ]          |
| Independent Validation | [ ]       | [ ]      | [ ]    | [ ]          |
| Governance             | [ ]       | [ ]      | [ ]    | [ ]          |

---

# 184. Review Boundary

```text id="rt187"
REVIEWED
≠
APPROVED
```

---

# 185. Research Result State

Select:

```text id="rt188"
QUESTION
ANSWERED
FOR
DEFINED
SCOPE

PARTIALLY
ANSWERED

INCONCLUSIVE

QUESTION
REFRAMED

HYPOTHESIS
NOT
SUPPORTED

FURTHER
RESEARCH
REQUIRED
```

Selected:

```text id="rt189"
[REQUIRED]
```

---

# 186. Research Transfer Candidate

Potential ID:

```text id="rt190"
RTC-000001
```

---

# 187. Transfer Candidate Record

```yaml id="rt191"
research_transfer_candidate:
  transfer_id: [REQUIRED]

  research_ref: [REQUIRED]

  finding_refs:
    - [REQUIRED]

  destination_type: [REQUIRED]

  destination_ref:
    [OPTIONAL]

  evidence_package_ref: [REQUIRED]

  limitations:
    - [REQUIRED]

  authority_required_ref: [REQUIRED]

  status: [REQUIRED]
```

---

# 188. Transfer Destinations

Potential:

```text id="rt192"
KNOWLEDGE

MEMORY

ARCHITECTURE

ENGINEERING

PRODUCT

SECURITY

DATA

MODEL
MANAGEMENT

PROMPT
OS

AGENT
FRAMEWORK

TECHNOLOGY
RADAR

INNOVATION
LAB

PUBLICATION

IP /
PATENT
```

---

# 189. Transfer Boundary

Permanent:

```text id="rt193"
RESEARCH
TRANSFER
≠
DOWNSTREAM
ADOPTION
```

---

# 190. Architecture Handoff

Research may inform Architecture.

Permanent:

```text id="rt194"
RESEARCH
RECOMMENDS
ARCHITECTURE
≠
ARCHITECTURE
DECISION
APPROVED
```

---

# 191. Engineering Handoff

```text id="rt195"
RESEARCH
SAYS
"FEASIBLE"
≠
ENGINEERING
IMPLEMENTATION
AUTHORIZED
```

---

# 192. Product Handoff

```text id="rt196"
RESEARCH
SHOWS
USER
INTEREST
≠
PRODUCT-
MARKET
FIT
```

---

# 193. Security Handoff

```text id="rt197"
RESEARCH
IDENTIFIES
SECURITY
CONTROL
≠
CONTROL
IMPLEMENTED /
VERIFIED
```

---

# 194. Technology Radar Handoff

```text id="rt198"
RESEARCH
IDENTIFIES
PROMISING
TECHNOLOGY
≠
TECHNOLOGY
ADOPTION
AUTHORIZED
```

---

# 195. Publication Handoff

Use `publication-template.md` for formal Research communication.

Permanent:

```text id="rt199"
RESEARCH
COMPLETE
≠
PUBLIC
DISCLOSURE
AUTHORIZED
```

---

# 196. IP Handoff

Potentially patentable or confidential Research should route through IP Governance before disclosure.

---

# 197. Knowledge Transfer Package

Potential:

```text id="rt200"
RESEARCH
SUMMARY

QUESTION

METHOD

DATA /
CONFIG

EVIDENCE

FINDINGS

COUNTER-
EVIDENCE

LIMITATIONS

VALIDATION
STATE

DECISION
BOUNDARIES

ARTIFACTS

REVALIDATION
TRIGGERS
```

---

# 198. Memory Integration

Only validated, appropriately scoped Knowledge should become durable organizational Memory.

Permanent:

```text id="rt201"
RESEARCH
NOTE
≠
CANONICAL
ORGANIZATIONAL
MEMORY
```

---

# 199. Knowledge Supersession

New Evidence may supersede prior findings without deleting historical provenance.

---

# 200. Research Archive

Archive should preserve:

* Research identity.
* version history.
* Signal.
* intake.
* Research Questions.
* hypotheses.
* authorization.
* Research Plan.
* Data/Dataset references.
* configuration.
* execution.
* raw Evidence.
* Counter-Evidence.
* findings.
* deviations.
* incidents.
* analysis.
* validation.
* transfer records.
* decision history.

---

# 201. Archive Boundary

```text id="rt202"
RESEARCH
ARCHIVED
≠
RESEARCH
EVIDENCE
DELETED
```

---

# 202. Revalidation Triggers

Potential:

```text id="rt203"
NEW
EVIDENCE

MODEL
CHANGE

PROMPT
CHANGE

AGENT
CHANGE

TOOL
CHANGE

DATASET
CHANGE

MARKET
CHANGE

TECHNOLOGY
CHANGE

ARCHITECTURE
CHANGE

SECURITY
CHANGE

REGULATION

PROJECT
CHANGE

TENANT
CHANGE
```

---

# 203. Revalidation Boundary

Permanent:

```text id="rt204"
RESEARCH
VALID
WHEN
COMPLETED
≠
RESEARCH
VALID
FOREVER
```

---

# 204. Research Monitoring

Potential:

```text id="rt205"
ACTIVE
RESEARCH

BLOCKERS

AUTHORIZATION

COST

EVIDENCE

INCIDENTS

STALE
RESEARCH

TRANSFER
STATUS

REVALIDATION
STATUS
```

---

# 205. Research Metrics

Potential:

```text id="rt206"
QUESTIONS
OPEN

QUESTIONS
ANSWERED

TIME
TO
EVIDENCE

EVIDENCE
QUALITY

REPLICATION
RATE

NEGATIVE
RESULT
PRESERVATION

TRANSFER
RATE

STALE
RESEARCH

RESEARCH
DEBT
```

---

# 206. Metric Boundary

```text id="rt207"
MORE
RESEARCH
COMPLETED
≠
MORE
USEFUL
KNOWLEDGE
```

---

# 207. Anti-Goodhart Rule

Permanent:

```text id="rt208"
OPTIMIZING
RESEARCH
OUTPUT
COUNT
≠
OPTIMIZING
UNCERTAINTY
REDUCTION
```

---

# 208. Research Debt

Potential:

```text id="rt209"
UNANSWERED
CRITICAL
QUESTION

STALE
EVIDENCE

UNREPLICATED
RESULT

MISSING
BASELINE

MISSING
DATA

KNOWN
VALIDITY
GAP

UNRESOLVED
SECURITY
QUESTION
```

---

# 209. Research Debt Boundary

```text id="rt210"
RESEARCH
DOCUMENT
EXISTS
≠
KNOWLEDGE
GAP
RESOLVED
```

---

# 210. Research Completion Checklist

## Identity

* [ ] Research ID assigned.
* [ ] version assigned.
* [ ] title defined.
* [ ] owner assigned.
* [ ] status current.
* [ ] Research type selected.
* [ ] Research class selected.

## Signal and Intake

* [ ] Signal registered.
* [ ] requester identified.
* [ ] triage completed.
* [ ] duplicate Research reviewed.
* [ ] decision relevance documented.

## Question and Scope

* [ ] Research Question defined.
* [ ] question is neutral.
* [ ] objectives defined.
* [ ] non-goals defined.
* [ ] Project scope defined.
* [ ] Tenant scope defined.
* [ ] environment scope defined.
* [ ] risk class defined.
* [ ] autonomy class defined where applicable.

## Governance

* [ ] mandate defined.
* [ ] permitted actions defined.
* [ ] prohibited actions defined.
* [ ] authorization recorded.
* [ ] Founder approval truth preserved where applicable.

## Prior Knowledge

* [ ] internal Knowledge reviewed.
* [ ] previous Research reviewed.
* [ ] external sources reviewed.
* [ ] provenance recorded.
* [ ] freshness assessed.
* [ ] vendor claims separated from independent Evidence.

## Hypotheses and Method

* [ ] hypothesis defined where appropriate.
* [ ] falsification conditions defined.
* [ ] assumptions registered.
* [ ] unknowns registered.
* [ ] method selected.
* [ ] method rationale documented.
* [ ] alternative methods considered.

## Plan and Inputs

* [ ] Research Plan versioned.
* [ ] milestones defined.
* [ ] Data identified.
* [ ] Dataset identified.
* [ ] Data rights recorded.
* [ ] Model pinned.
* [ ] Prompt pinned.
* [ ] Agent pinned.
* [ ] Tool configuration pinned.
* [ ] Memory/Retrieval pinned.
* [ ] environment pinned.

## Gates and Security

* [ ] Research Gates defined.
* [ ] hard gates defined.
* [ ] security reviewed.
* [ ] Prompt Injection considered.
* [ ] Authority Injection considered.
* [ ] Project isolation considered.
* [ ] Tenant isolation considered.
* [ ] privacy reviewed.
* [ ] Responsible AI reviewed.
* [ ] legal/IP reviewed where applicable.
* [ ] HALT path defined.

## Execution

* [ ] execution record created.
* [ ] Experiments linked.
* [ ] Benchmarks linked.
* [ ] Simulations linked.
* [ ] Prototypes linked.
* [ ] observations captured.
* [ ] raw Evidence preserved.
* [ ] Tool side effects read back where required.
* [ ] deviations recorded.
* [ ] incidents recorded.

## Analysis

* [ ] quantitative analysis completed where applicable.
* [ ] qualitative analysis completed where applicable.
* [ ] causal limits documented.
* [ ] missing Data handled.
* [ ] subgroup analysis considered.
* [ ] tail analysis considered.
* [ ] Counter-Evidence reviewed.
* [ ] negative results preserved.
* [ ] null findings preserved.
* [ ] alternative explanations documented.

## Validity

* [ ] internal validity assessed.
* [ ] external validity assessed.
* [ ] construct validity assessed.
* [ ] statistical validity assessed where applicable.
* [ ] reproducibility assessed.
* [ ] replication considered.
* [ ] independent review considered.

## Conclusion and Transfer

* [ ] findings registered.
* [ ] supported claims listed.
* [ ] unsupported claims listed.
* [ ] Evidence gaps listed.
* [ ] confidence state assigned.
* [ ] validation state assigned.
* [ ] Research result state assigned.
* [ ] transfer candidates registered.
* [ ] downstream authority boundaries preserved.
* [ ] Publication boundary preserved.
* [ ] archive package prepared.
* [ ] revalidation triggers defined.

---

# 211. Minimum Research Record

At minimum:

```text id="rt211"
RESEARCH
ID

VERSION

SIGNAL

RESEARCH
QUESTION

OBJECTIVE

SCOPE

PROJECT /
TENANT
SCOPE

RISK

AUTHORIZATION

PRIOR
KNOWLEDGE

METHOD

RESEARCH
PLAN

DATA /
CONFIG

SECURITY
CONTROLS

EXECUTION
RECORD

RAW
EVIDENCE

COUNTER-
EVIDENCE

FINDINGS

LIMITATIONS

VALIDATION
STATE

CONCLUSION

TRANSFER
BOUNDARY

REVALIDATION
TRIGGERS
```

---

# 212. Research Failure Classes

Potential:

```text id="rt212"
RTF01
SIGNAL
FAILURE

RTF02
TRIAGE
FAILURE

RTF03
QUESTION
DESIGN
FAILURE

RTF04
SCOPE
FAILURE

RTF05
AUTHORIZATION
FAILURE

RTF06
PRIOR
KNOWLEDGE
FAILURE

RTF07
METHOD
FAILURE

RTF08
DATA /
DATASET
FAILURE

RTF09
CONFIGURATION
FAILURE

RTF10
EVIDENCE
FAILURE

RTF11
COUNTER-
EVIDENCE
SUPPRESSION

RTF12
STATISTICAL /
CAUSAL
FAILURE

RTF13
SECURITY /
TENANT
FAILURE

RTF14
REPRODUCIBILITY /
REPLICATION
FAILURE

RTF15
VALIDATION
FAILURE

RTF16
OVERGENERALIZATION

RTF17
RESEARCH /
AUTHORITY
CONFUSION

RTF18
RESEARCH /
PRODUCTION
AUTHORIZATION
CONFUSION
```

---

# 213. Positive Verification Scenarios

Future Research tooling should verify at least:

```text id="rt213"
RTV-01
RESEARCH
CREATED
DOES
NOT
AUTO-
BECOME
RESEARCH
AUTHORIZED

RTV-02
RESEARCH
COMPLETED
DOES
NOT
AUTO-
BECOME
RESEARCH
VALIDATED

RTV-03
RESEARCH
VALIDATED
DOES
NOT
AUTO-
BECOME
PRODUCTION
AUTHORIZED

RTV-04
SIGNAL
DOES
NOT
AUTO-
BECOME
CONCLUSION

RTV-05
REQUESTER
DOES
NOT
AUTO-
BECOME
APPROVER

RTV-06
LEADING
QUESTION
DOES
NOT
AUTO-
BECOME
NEUTRAL
RESEARCH
QUESTION

RTV-07
PROJECT A
RESULT
DOES
NOT
AUTO-
BECOME
PROJECT B
RESULT

RTV-08
AGENT
CAPABILITY
DOES
NOT
AUTO-
BECOME
AGENT
AUTHORITY

RTV-09
PRIOR
KNOWLEDGE
EXISTS
DOES
NOT
AUTO-
BECOME
CURRENT
KNOWLEDGE

RTV-10
VENDOR
CLAIM
DOES
NOT
AUTO-
BECOME
INDEPENDENT
EVIDENCE

RTV-11
HYPOTHESIS
SUPPORTED
DOES
NOT
AUTO-
BECOME
PROOF

RTV-12
DATA
AVAILABLE
DOES
NOT
AUTO-
BECOME
DATA
AUTHORIZED

RTV-13
MODEL
ALIAS
DOES
NOT
AUTO-
BECOME
STABLE
MODEL
BEHAVIOR

RTV-14
MULTI-
AGENT
CONSENSUS
DOES
NOT
AUTO-
BECOME
CORRECTNESS

RTV-15
TOOL
SUCCESS
DOES
NOT
AUTO-
BECOME
SIDE
EFFECT
VERIFIED

RTV-16
OBSERVATION
DOES
NOT
AUTO-
BECOME
INTERPRETATION

RTV-17
SCREENSHOT
DOES
NOT
AUTO-
BECOME
FULL
RUNTIME
TRUTH

RTV-18
NEGATIVE
FINDING
DOES
NOT
AUTO-
BECOME
FAILED
RESEARCH

RTV-19
CORRELATION
DOES
NOT
AUTO-
BECOME
CAUSATION

RTV-20
GOOD
AGGREGATE
RESULT
DOES
NOT
AUTO-
BECOME
GOOD
SUBGROUP
RESULT

RTV-21
VALIDATED
FOR
DEFINED
SCOPE
DOES
NOT
AUTO-
BECOME
UNIVERSALLY
VALIDATED

RTV-22
RESEARCH
TRANSFER
DOES
NOT
AUTO-
BECOME
DOWNSTREAM
ADOPTION

RTV-23
FOUNDER
ROUTING
DOES
NOT
AUTO-
BECOME
FOUNDER
APPROVAL

RTV-24
CONTROLLED
RESEARCH
PILOT
DOES
NOT
AUTO-
BECOME
PRODUCTION
AUTHORIZATION

RTV-25
RESEARCH
DOCUMENT
DOES
NOT
AUTO-
PROVE
RESEARCH
RUNTIME
IMPLEMENTED
```

---

# 214. Extended Verification Scenarios

Future implementation should test at least:

```text id="rt214"
RTVS-01
SIGNAL
AUTO-
CONVERTED
TO
CONCLUSION

RTVS-02
REQUESTER
MISREPRESENTED
AS
APPROVER

RTVS-03
LEADING
QUESTION

RTVS-04
RESEARCH
RUN
WITHOUT
AUTHORIZATION

RTVS-05
PROJECT A
AUTHORITY
USED
FOR
PROJECT B

RTVS-06
TENANT
LABEL
WITHOUT
ISOLATION

RTVS-07
STALE
KNOWLEDGE
USED
AS
CURRENT

RTVS-08
VENDOR
CLAIM
MISREPRESENTED
AS
INDEPENDENT
EVIDENCE

RTVS-09
ASSUMPTION
MISREPRESENTED
AS
FACT

RTVS-10
UNAUTHORIZED
PRODUCTION
DATA

RTVS-11
MODEL /
PROMPT /
AGENT
CONFIG
DRIFT

RTVS-12
TOOL
SUCCESS
WITHOUT
READ-
BACK

RTVS-13
SCREENSHOT
MISREPRESENTED
AS
RUNTIME
VERIFICATION

RTVS-14
COUNTER-
EVIDENCE
SUPPRESSED

RTVS-15
NEGATIVE
RESULT
SUPPRESSED

RTVS-16
NULL
RESULT
OVERGENERALIZED

RTVS-17
CORRELATION
OVERCLAIMED
AS
CAUSATION

RTVS-18
AGGREGATE
RESULT
HIDES
SUBGROUP
FAILURE

RTVS-19
PROTOCOL
DEVIATION
HIDDEN

RTVS-20
SELF-
REVIEW
MISREPRESENTED
AS
INDEPENDENT
VALIDATION

RTVS-21
RESEARCH
RESULT
OVERGENERALIZED
ACROSS
PROJECTS /
TENANTS

RTVS-22
TRANSFER
MISREPRESENTED
AS
IMPLEMENTATION
APPROVAL

RTVS-23
FALSE
FOUNDER
APPROVAL

RTVS-24
HALT
WITHOUT
AGENT /
TOOL /
WORKFLOW
PROPAGATION

RTVS-25
RESEARCH
MISREPRESENTED
AS
PRODUCTION
AUTHORIZATION
```

---

# 215. Controlled Research Pilot

An initial Research framework Pilot should prefer:

```text id="rt215"
LIMITED
RESEARCH
PORTFOLIO

STABLE
RESEARCH
IDS

VERSIONED
RESEARCH
PLANS

EXPLICIT
SIGNALS

NEUTRAL
RESEARCH
QUESTIONS

DEFINED
SCOPES

PROJECT /
TENANT
BOUNDARIES

MANUAL
AUTHORIZATION

PRIOR
KNOWLEDGE
REVIEW

VERSIONED
DATASETS

CONTROLLED
TEST
ENVIRONMENTS

PINNED
MODEL /
PROMPT /
AGENT /
TOOL
CONFIG

RAW
EVIDENCE

COUNTER-
EVIDENCE

NEGATIVE /
NULL
FINDINGS

SECURITY /
PRIVACY /
RESPONSIBLE
AI
GATES

MANUAL
VALIDATION

MANUAL
KNOWLEDGE
TRANSFER

AUDIT

HALT /
RESUME

NO
AUTO-
IMPLEMENTATION

NO
AUTO-
PRODUCTION
PROMOTION
```

---

# 216. Pilot Exit Criteria

Verify:

* Research registry model.
* Research IDs.
* Research versions.
* Signal IDs.
* intake.
* triage.
* Research Questions.
* Project scope.
* Tenant scope.
* risk classification.
* autonomy classification.
* mandate.
* authorization.
* prior Knowledge.
* source provenance.
* freshness.
* hypotheses.
* assumptions.
* Unknowns.
* Research method.
* Research Plan.
* milestones.
* Data authorization.
* Dataset provenance.
* Model configuration.
* Prompt configuration.
* Agent configuration.
* Multi-Agent configuration.
* Tool configuration.
* Memory configuration.
* Retrieval configuration.
* environment identity.
* Research Gates.
* hard gates.
* execution records.
* Experiment integration.
* Benchmark integration.
* Simulation integration.
* Prototype integration.
* Human Research controls.
* observations.
* Evidence.
* Counter-Evidence.
* negative findings.
* null findings.
* metrics.
* statistics.
* subgroup analysis.
* tail analysis.
* causal boundaries.
* deviations.
* change control.
* reproducibility.
* replication.
* independent review.
* validity assessment.
* security.
* Prompt Injection.
* Authority Injection.
* Project isolation.
* Tenant isolation.
* privacy.
* Responsible AI.
* legal/IP.
* resources.
* costs.
* observability.
* Audit.
* incidents.
* HALT/Resume.
* findings.
* confidence.
* conclusions.
* validation.
* transfer candidates.
* downstream authority boundaries.
* Knowledge Transfer.
* archival.
* revalidation.
* Runtime Truth.

---

# 217. Pilot Boundary

Permanent:

```text id="rt216"
CONTROLLED
RESEARCH
PILOT
SUCCESS

≠

AUTONOMOUS
RESEARCH
PLATFORM
PRODUCTION
READINESS

≠

ALL
RESEARCH
VALIDATED

≠

DOWNSTREAM
IMPLEMENTATION
APPROVAL

≠

PRODUCTION
AUTHORIZATION
```

---

# 218. Research Template Maturity Model

Conceptual:

```text id="rt217"
RTM0
=
MASTER
RESEARCH
TEMPLATE
DOCUMENTED

RTM1
=
RESEARCH /
SIGNAL /
QUESTION /
HYPOTHESIS /
PLAN
MODELS
DEFINED

RTM2
=
AUTHORIZATION /
DATA /
CONFIG /
EVIDENCE /
TRANSFER
CONTRACTS
DEFINED

RTM3
=
CONTROLLED
RESEARCH
REGISTRY /
EXECUTION
WORKFLOW
IMPLEMENTED

RTM4
=
EXPERIMENT /
BENCHMARK /
SIMULATION /
PROTOTYPE
INTEGRATION
IMPLEMENTED

RTM5
=
SECURITY /
PROJECT /
TENANT /
PRIVACY /
RESPONSIBLE
AI
CONTROLS
INTEGRATED

RTM6
=
REPRODUCIBILITY /
VALIDATION /
TRANSFER /
MONITORING /
AUDIT
INTEGRATED

RTM7
=
CRITICAL
EVIDENCE /
AUTHORITY /
ISOLATION /
OVERGENERALIZATION
BOUNDARIES
VERIFIED

RTM8
=
CONTROLLED
RESEARCH
PILOT
VERIFIED

RTM9
=
PRODUCTION-SCOPE
RESEARCH
CONTROL
PLANE
SEPARATELY
AUTHORIZED
```

---

# 219. Maturity Boundary

Permanent:

```text id="rt218"
RTM8
≠
RTM9
```

---

# 220. Template Runtime Truth

This document defines a Research documentation and Governance contract only.

```text id="rt219"
MASTER
RESEARCH
TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH
REGISTRY
IMPLEMENTED
=
NOT_PROVEN

RESEARCH
SIGNAL
RUNTIME
=
NOT_PROVEN

RESEARCH
INTAKE
RUNTIME
=
NOT_PROVEN

RESEARCH
QUESTION
REGISTRY
=
NOT_PROVEN

RESEARCH
MANDATE
RUNTIME
=
NOT_PROVEN

RESEARCH
AUTHORIZATION
ENGINE
=
NOT_PROVEN

RESEARCH
PLAN
RUNTIME
=
NOT_PROVEN

RESEARCH
DATA
CONTROL
RUNTIME
=
NOT_PROVEN

RESEARCH
CONFIG
PINNING
RUNTIME
=
NOT_PROVEN

RESEARCH
EXECUTION
ENGINE
=
NOT_PROVEN

RESEARCH
EVIDENCE
STORE
=
NOT_PROVEN

RESEARCH
COUNTER_EVIDENCE
RUNTIME
=
NOT_PROVEN

RESEARCH
VALIDATION
RUNTIME
=
NOT_PROVEN

RESEARCH
TRANSFER
RUNTIME
=
NOT_PROVEN

RESEARCH
PROJECT
ISOLATION
RUNTIME
=
NOT_PROVEN

RESEARCH
TENANT
ISOLATION
RUNTIME
=
NOT_PROVEN

RESEARCH
AUDIT
RUNTIME
=
NOT_PROVEN

RESEARCH
HALT
RUNTIME
=
NOT_PROVEN

CONTROLLED
RESEARCH
PILOT
=
NOT_PROVEN

PRODUCTION
RESEARCH
CONTROL
PLANE
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 221. Repository Truth

This document is generated for:

```text id="rt220"
doc/26-research-lab/templates/research-template.md
```

Permanent:

```text id="rt221"
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

# 222. Templates Folder Documentation Truth

The screenshot-verified Templates sequence is:

```text id="rt222"
doc/26-research-lab/templates/
├── benchmark-template.md
├── experiment-template.md
├── publication-template.md
└── research-template.md
```

Current workflow state:

```text id="rt223"
BENCHMARK_TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW

EXPERIMENT_TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW

PUBLICATION_TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

Therefore:

```text id="rt224"
4 / 4
SCREENSHOT-
VERIFIED
TEMPLATES

=
CONTENT_COMPLETE_FOR_REVIEW
IN
CURRENT
DOCUMENTATION
WORKFLOW

FILESYSTEM
SAVE
=
NOT_VERIFIED
```

---

# 223. Research Lab Specialized Documentation Boundary

The completion state above refers only to the screenshot-verified `templates/` folder.

Permanent:

```text id="rt225"
TEMPLATES
4 / 4
CONTENT_COMPLETE_FOR_REVIEW

≠

ENTIRE
RESEARCH
LAB
FILESYSTEM
VERIFIED
COMPLETE

≠

RESEARCH
LAB
CANONICAL

≠

RESEARCH
LAB
IMPLEMENTED
```

---

# 224. Approval Truth

```text id="rt226"
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

IMPLEMENTED
=
NOT_PROVEN

TESTED
=
NOT_PROVEN

VERIFIED
=
NOT_PROVEN

CONTROLLED
RESEARCH
PILOT
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 225. Permanent Research Template Invariants

```text id="rt227"
RESEARCH
≠
IMPLEMENTATION

RESEARCH
COMPLETED
≠
RESEARCH
VALIDATED

RESEARCH
VALIDATED
≠
PRODUCTION
AUTHORIZED

SIGNAL
≠
CONCLUSION

REQUESTER
≠
APPROVER

QUESTION
≠
PREDETERMINED
ANSWER

LEADING
QUESTION
≠
NEUTRAL
RESEARCH
QUESTION

RESEARCH
CONCLUSION
MUST
NOT
EXCEED
SCOPE

PROJECT A
RESULT
≠
PROJECT B
RESULT

TENANT
TAG
≠
TENANT
ISOLATION

LOW
RISK
≠
NO
RISK

AGENT
CAPABILITY
≠
AGENT
AUTHORITY

MANDATE
≠
PRODUCTION
MANDATE

DOCUMENT
CREATED
≠
RESEARCH
AUTHORIZED

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

KNOWLEDGE
EXISTS
≠
KNOWLEDGE
CURRENT

VENDOR
CLAIM
≠
INDEPENDENT
EVIDENCE

MULTIPLE
REPEATED
SOURCES
≠
MULTIPLE
INDEPENDENT
SOURCES

HYPOTHESIS
SUPPORTED
≠
PROVEN

ASSUMPTION
≠
FACT

UNKNOWN
≠
ZERO

UNKNOWN
≠
TRUE

UNKNOWN
≠
FALSE

METHOD
SELECTED
≠
METHOD
VALID
AUTOMATICALLY

PLAN
CHANGED
AFTER
RESULT
≠
ORIGINAL
PLAN

MILESTONE
COMPLETE
≠
OUTCOME
ACHIEVED

DATA
AVAILABLE
≠
DATA
AUTHORIZED

PRODUCTION
DATA
DESIRABLE
≠
PRODUCTION
DATA
AUTHORIZED

SYNTHETIC
DATA
≠
REAL
DATA
DISTRIBUTION

MODEL
ALIAS
≠
STABLE
MODEL
BEHAVIOR

MULTI-
AGENT
CONSENSUS
≠
CORRECTNESS

TOOL
SUCCESS
≠
SIDE
EFFECT
VERIFIED

MEMORY
CLAIM
≠
TRUE
CLAIM

TEST
ENVIRONMENT
≠
PRODUCTION

PASSING
ONE
GATE
≠
PASSING
ALL
GATES

HIGH
RESEARCH
VALUE
≠
HARD
GATE
WAIVER

EXPERIMENT
RESULT
≠
UNIVERSAL
TRUTH

BENCHMARK
WIN
≠
UNIVERSAL
SUPERIORITY

SIMULATION
≠
RUNTIME
VERIFICATION

PROTOTYPE
SUCCESS
≠
PRODUCT
READY

PROTOTYPE
SUCCESS
≠
PRODUCTION
READY

MVP
≠
PRODUCT-
MARKET
FIT

PILOT
SUCCESS
≠
PRODUCTION
AUTHORIZATION

CONSENT
FOR
ONE
PURPOSE
≠
CONSENT
FOR
ALL
PURPOSES

OBSERVATION
≠
INTERPRETATION

EVIDENCE
EXISTS
≠
CLAIM
SUPPORTED

SCREENSHOT
≠
FULL
RUNTIME
TRUTH

CHAT
GENERATED
DOCUMENT
≠
FILESYSTEM
SAVE

LOCAL
FILE
≠
COMMITTED

COMMITTED
≠
PUSHED

PUSHED
≠
DEPLOYED

DESIGNED
≠
CODED

CODED
≠
RUNNING

RUNNING
≠
VERIFIED

COUNTER-
EVIDENCE
≠
OPTIONAL

NEGATIVE
FINDING
≠
FAILED
RESEARCH

NO
DETECTED
EFFECT
≠
NO
EFFECT

THRESHOLD
UNSUPPORTED
≠
VALID
THRESHOLD

STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE

MISSING
DATA
≠
ZERO

QUALITATIVE
THEME
≠
POPULATION
PREVALENCE

CORRELATION
≠
CAUSATION

GOOD
AGGREGATE
≠
GOOD
SUBGROUP

GOOD
AVERAGE
≠
SAFE
TAIL

DEVIATION
DOCUMENTED
≠
RESULT
VALID

METHOD
DOCUMENTED
≠
RESULT
REPRODUCED

ORIGINAL
RESULT
≠
REPLICATION
RESULT

SELF-
CRITIQUE
≠
INDEPENDENT
VERIFICATION

VALID
FOR
DEFINED
SCOPE
≠
VALID
FOR
EVERY
USE
CASE

UNTRUSTED
CONTENT
=
DATA
NOT
AUTHORITY

PROJECT A
AUTHORITY
≠
PROJECT B
AUTHORITY

UNAUTHORIZED
CROSS-
TENANT
ACCESS
=
CRITICAL
FAILURE

TECHNICALLY
POSSIBLE
≠
LEGALLY
AUTHORIZED

READY
TO
SHARE
≠
SAFE
TO
PUBLISH

RESOURCE
ESTIMATE
≠
BUDGET
APPROVAL

RESEARCH
COST
≠
PRODUCTION
TCO

FINDING
≠
DECISION

STRONG
CONFIDENCE
≠
CERTAINTY

CONCLUSION
≠
ACTION
AUTHORIZED

REVIEWED
≠
APPROVED

RESEARCH
VALIDATED
≠
PRODUCT
VALIDATED

TRANSFER
≠
DOWNSTREAM
ADOPTION

RESEARCH
RECOMMENDS
ARCHITECTURE
≠
ARCHITECTURE
APPROVED

RESEARCH
FEASIBLE
≠
ENGINEERING
AUTHORIZED

USER
INTEREST
≠
PRODUCT-
MARKET
FIT

SECURITY
RECOMMENDATION
≠
CONTROL
IMPLEMENTED

PROMISING
TECHNOLOGY
≠
TECHNOLOGY
ADOPTED

RESEARCH
COMPLETE
≠
PUBLIC
DISCLOSURE
AUTHORIZED

RESEARCH
NOTE
≠
CANONICAL
MEMORY

ARCHIVED
≠
EVIDENCE
DELETED

VALID
WHEN
COMPLETED
≠
VALID
FOREVER

MORE
RESEARCH
OUTPUT
≠
MORE
KNOWLEDGE

RESEARCH
DOCUMENT
EXISTS
≠
KNOWLEDGE
GAP
RESOLVED

HALT
RECORDED
≠
EXECUTION
HALTED
UNTIL
VERIFIED

CONTROLLED
RESEARCH
PILOT
≠
PRODUCTION
AUTHORIZATION

RTM8
≠
RTM9

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

# 226. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="rt228"
## RESEARCH-LAB-CHG-20260815-098 — Master Research Template Established

| Field | Value |
|---|---|
| Date | 2026-08-15 |
| Change Type | `CREATED`, `TEMPLATES`, `RESEARCH-TEMPLATE`, `RESEARCH-INTAKE`, `RESEARCH-QUESTIONS`, `RESEARCH-PLAN`, `EVIDENCE`, `VALIDATION`, `KNOWLEDGE-TRANSFER`, `PROJECT-TENANT-GOVERNANCE`, `RUNTIME-TRUTH` |
| Impact | `I5 — Standardized End-to-End Governed Research Record, Evidence, Validation and Transfer Contract` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Founder Approved | `NO EVIDENCE` |
| Canonical | `NO` |
| Research Runtime Implemented | `NOT PROVEN` |
| Templates Folder | `4 / 4 CONTENT_COMPLETE_FOR_REVIEW` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/templates/research-template.md`

### Documentation Truth

`MASTER_RESEARCH_TEMPLATE = CONTENT_COMPLETE_FOR_REVIEW`

### Templates Folder Truth

`RESEARCH_LAB_TEMPLATES_VISIBLE_FILES = 4 / 4 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`RESEARCH_CONTROL_PLANE_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_RESEARCH_CONTROL_PLANE = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 227. Final Research Template Rule

Every governed Mianx.ai Research engagement should conceptually preserve:

```text id="rt229"
SIGNAL /
KNOWLEDGE
GAP

↓

INTAKE /
TRIAGE

↓

NEUTRAL
RESEARCH
QUESTION

↓

SCOPE /
PROJECT /
TENANT

↓

RISK /
AUTONOMY

↓

MANDATE /
AUTHORIZATION

↓

PRIOR
KNOWLEDGE

↓

HYPOTHESIS /
OBJECTIVES

↓

METHOD /
RESEARCH
PLAN

↓

AUTHORIZED
DATA /
CONFIG /
ENVIRONMENT

↓

SECURITY /
PRIVACY /
LEGAL /
RESPONSIBLE
AI
GATES

↓

EXECUTION

↓

OBSERVATION

↓

RAW
EVIDENCE

↓

COUNTER-
EVIDENCE /
NEGATIVE /
NULL
FINDINGS

↓

ANALYSIS /
UNCERTAINTY /
CAUSAL
LIMITS

↓

REPRODUCIBILITY /
REPLICATION /
CHALLENGE

↓

VALIDATION

↓

BOUNDED
CONCLUSION

↓

RESEARCH
TRANSFER
CANDIDATE

↓

KNOWLEDGE /
ARCHITECTURE /
ENGINEERING /
PRODUCT /
SECURITY /
TECHNOLOGY
RADAR /
PUBLICATION
HANDOFF

↓

ARCHIVE /
MONITOR /
REVALIDATE
```

while permanently preserving:

```text id="rt230"
RESEARCH
≠
IMPLEMENTATION

RESEARCH
COMPLETION
≠
VALIDATION

RESEARCH
QUESTION
≠
PREDETERMINED
ANSWER

HYPOTHESIS
SUPPORTED
≠
PROOF

OBSERVATION
≠
INTERPRETATION

EVIDENCE
≠
AUTHORITY

CORRELATION
≠
CAUSATION

BENCHMARK
RESULT
≠
UNIVERSAL
TRUTH

SIMULATION
≠
RUNTIME
VERIFICATION

PROTOTYPE
≠
PRODUCT

MVP
≠
PRODUCT-
MARKET
FIT

PILOT
≠
PRODUCTION
AUTHORIZATION

RESEARCH
RECOMMENDATION
≠
PRODUCT
APPROVAL

RESEARCH
RECOMMENDATION
≠
ARCHITECTURE
APPROVAL

RESEARCH
TRANSFER
≠
DOWNSTREAM
ADOPTION

AGENT
CAPABILITY
≠
AGENT
AUTHORITY

TOOL
SUCCESS
≠
SIDE
EFFECT
VERIFIED

PROJECT
TAG
≠
PROJECT
ISOLATION

TENANT
TAG
≠
TENANT
ISOLATION

FOUNDER
ROUTING
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

# 228. Templates Folder Completion

The screenshot-verified `doc/26-research-lab/templates/` folder now has all four documents content-complete for review in the current workflow:

```text id="rt231"
doc/26-research-lab/templates/
├── benchmark-template.md      ✅ CONTENT_COMPLETE_FOR_REVIEW
├── experiment-template.md     ✅ CONTENT_COMPLETE_FOR_REVIEW
├── publication-template.md    ✅ CONTENT_COMPLETE_FOR_REVIEW
└── research-template.md       ✅ CONTENT_COMPLETE_FOR_REVIEW
```

Permanent:

```text id="rt232"
4 / 4
CONTENT_COMPLETE_FOR_REVIEW

≠

FILESYSTEM
SAVE
VERIFIED

≠

APPROVED

≠

CANONICAL

≠

IMPLEMENTED
```

---

# 229. Next Module Boundary

The supplied repository screenshot verifies that the module following `26-research-lab` is:

```text id="rt233"
doc/27-model-management/
```

It also visibly contains module-level files including:

```text id="rt234"
CHANGELOG.md
INDEX.md
model-management-architecture.md
model-management-capabilities.md
model-management-checklists.md
model-management-governance.md
model-management-lifecycle.md
model-management-metrics.md
model-management-security.md
model-management-strategy.md
model-management-vision.md
README.md
ROADMAP.md
```

and multiple specialized subfolders.

This document does **not** claim that any `27-model-management` documentation has yet been generated, reviewed or verified in the current workflow.

---