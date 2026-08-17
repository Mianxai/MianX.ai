---

id: RESEARCH-LAB-PROTOTYPES-MVP-GUIDELINES-001
title: Mianx.ai Research Lab Prototypes — MVP Guidelines
version: 1.0.0
status: Draft

description: Enterprise-grade specification for the Mianx.ai Research Lab Minimum Viable Product Guidelines framework. This document defines how Mianx.ai should frame, scope, design, build, evaluate, expose, iterate, pivot, stop, transfer and govern Minimum Viable Products without treating an idea, prototype, Proof of Concept, demo, Pilot, customer request, founder preference, technical implementation, successful test, positive user feedback, revenue signal or controlled MVP result as proof of Product-Market Fit, scalability, security completeness, regulatory clearance, operational readiness or Production authorization. It establishes MVP identity, Opportunity and Research linkage, problem Evidence, target user and buyer distinctions, hypothesis structure, minimum outcome definition, scope control, must-have and optional capabilities, explicit non-goals, architecture boundaries, build-versus-reuse decisions, technical-debt governance, Data and Dataset requirements, Model, Prompt, Agent, Multi-Agent, Memory, Retrieval and Tool selection, Human fallback, authority controls, Project and Tenant scope, security, privacy, Responsible AI, accessibility, usability, reliability, latency, cost, observability, telemetry, experiment design, success and failure criteria, controlled exposure, user feedback, behavior Evidence, business Evidence, technical Evidence, Counter-Evidence, iteration, rollback, kill, pivot, continue, Product and Engineering handoff, commercialization boundaries, operational-readiness boundaries, Pilot versus Production truth, monitoring, incidents, HALT/Resume, maturity and Runtime Truth. It permanently separates MVP from Prototype, Proof of Concept, Pilot, Beta and Production; minimum from incomplete; viable from desirable; user interest from willingness to pay; feature request from validated requirement; prototype success from product validation; MVP usage from Product-Market Fit; Pilot success from Production authorization; technical feasibility from commercial viability; architecture shortcut from permanent architecture; temporary technical debt from uncontrolled debt; Model capability from system reliability; Prompt success from Agent safety; Tool availability from Tool authority; tenant configuration from cross-Tenant reuse authority; telemetry from consent; metrics from truth; average success from critical-tail safety; founder routing from Founder approval; silence from approval; documentation from implementation; implementation from verification; and verification from Production authorization.

type: Minimum Viable Product Guidelines, MVP Research and Experimentation Framework, Scope and Viability Governance Model, Product Hypothesis Validation Standard, Controlled User Exposure Framework, Research-to-Product Transfer Model, Runtime Truth Register, Controlled Pilot Boundary, and Production Authorization Boundary

class: Governed target-state MVP specification defining how Mianx.ai should create Minimum Viable Products as bounded learning instruments without asserting that any MVP registry, Product experiment platform, telemetry system, Project/Tenant isolation runtime, automated viability scoring engine, Product-Market Fit detector, deployment control plane, commercialization system or Production MVP control plane is currently implemented

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Prototypes
specialization: MVP Guidelines

parent: doc/26-research-lab/prototypes
path: doc/26-research-lab/prototypes/mvp-guidelines.md

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
* Innovation Governance
* Product Governance
* MVP Governance
* Prototype Governance
* Engineering Governance
* Architecture Governance
* AI Operating System Governance
* Model Governance
* Prompt Governance
* Agent Governance
* Multi-Agent Governance
* Tool Governance
* Memory Governance
* Data Governance
* Dataset Governance
* Security Governance
* Privacy Governance
* Responsible AI Governance
* Project Governance
* Tenant Governance
* Quality Governance
* Monitoring Governance
* Commercialization Governance
* Audit Governance
* Verification Governance
* Production Governance
* Documentation Governance

maintainers:

* Research Lab
* Innovation Lab
* Product Research Team
* Product Engineering
* Prototype Engineering
* AI Engineering
* Model Evaluation Team
* Prompt Engineering Team
* Agent Framework Team
* Multi-Agent System Team
* Data Platform Team
* Security Engineering
* Verification Engineering
* Research Operations
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Research Governance
* Innovation Governance
* Product Governance
* MVP Governance
* Engineering Governance
* Architecture Governance
* Security Governance
* Privacy Governance
* Responsible AI Governance
* Project Governance
* Tenant Governance
* Quality Governance
* Commercialization Governance
* Verification Governance
* Production Governance
* Documentation Governance

created: 2026-08-14
updated: 2026-08-14

classification: Internal

audience:

* Founder
* Founder Office
* Human Executive Leadership
* Research Leaders
* Innovation Leaders
* Product Leaders
* Product Managers
* Product Researchers
* Research Scientists
* Research Engineers
* Software Engineers
* AI Engineers
* Model Researchers
* Prompt Engineers
* Agent Designers
* Multi-Agent Designers
* Data Engineers
* Security Engineers
* Project Leaders
* Tenant Operations
* Commercialization Teams
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
* ../experiments/experiment-design.md
* ../experiments/experiment-results.md
* ../experiments/experiment-tracking.md
* ../innovation-lab/idea-pipeline.md
* ../innovation-lab/innovation-framework.md
* ../innovation-lab/innovation-metrics.md
* ../knowledge-transfer/best-practices.md
* ../knowledge-transfer/research-documentation.md
* ../market-research/market-analysis.md
* ../market-research/opportunity-analysis.md
* ../market-research/user-research.md
* ../model-evaluation/evaluation-framework.md
* ../model-evaluation/quality-evaluation.md
* ../model-evaluation/safety-evaluation.md
* ../monitoring/audit-logs.md
* ../monitoring/kpi-dashboard.md
* ../monitoring/research-monitoring.md
* ../prompt-research/prompt-benchmarks.md
* ../prompt-research/prompt-engineering.md
* ../prompt-research/prompt-patterns.md
* ../../01-governance/
* ../../02-company/
* ../../03-product/
* ../../04-system/
* ../../06-engineering/
* ../../08-data/
* ../../09-security/
* ../../14-quality/
* ../../16-knowledge/
* ../../19-ai-workforce/
* ../../20-ai-operating-system/
* ../../21-memory-engine/
* ../../22-agent-framework/
* ../../23-multi-agent-system/
* ../../24-automation-engine/
* ../../25-intelligence-engine/

related_documents:

* ./prototype-framework.md
* ./prototype-validation.md
* ../simulations/
* ../technology-radar/
* ../templates/
* ../CHANGELOG.md

review_cycle:

* At Every Material MVP Framework Change
* At Every Material MVP Scope Change
* At Every Material User or Buyer Hypothesis Change
* At Every Material MVP Architecture Change
* At Every Material Model, Prompt, Agent, Tool or Data Change
* At Every Material Project or Tenant Scope Change
* At Every Material Security, Privacy or Responsible AI Finding
* At Every Material MVP Success, Failure, Pivot or Kill Decision
* Before Controlled External MVP Exposure
* Before MVP-to-Pilot Transition
* Before Product or Engineering Handoff
* Before Commercialization Decisions
* Before Any Production-Scope Authorization
* Annually for the Overall MVP Guidelines Framework

## canonical: false

# Mianx.ai Research Lab Prototypes — MVP Guidelines

> **An MVP is a controlled learning instrument intended to validate the smallest meaningful product hypothesis.**
>
> It is not a cheap Production system and it is not permission to bypass enterprise controls.
>
> Target lifecycle:
>
> ```text id="mvp001"
> OPPORTUNITY /
> USER
> PROBLEM
>
> ↓
>
> EVIDENCE
>
> ↓
>
> PRODUCT
> HYPOTHESIS
>
> ↓
>
> MINIMUM
> OUTCOME
>
> ↓
>
> MVP
> SCOPE
>
> ↓
>
> CONTROLLED
> BUILD
>
> ↓
>
> CONTROLLED
> EXPOSURE
>
> ↓
>
> OBSERVED
> EVIDENCE
>
> ↓
>
> LEARN
>
> ↓
>
> KILL /
> PIVOT /
> CONTINUE
>
> ↓
>
> PRODUCT /
> ENGINEERING
> HANDOFF
>
> ↓
>
> SEPARATE
> PILOT /
> PRODUCTION
> AUTHORIZATION
> ```
>
> Permanent:
>
> ```text id="mvp002"
> MVP
> ≠
> PRODUCTION
> ```

---

# 1. Purpose

The Mianx.ai MVP Guidelines should answer:

```text id="mvp003"
WHAT
PROBLEM
ARE
WE
VALIDATING?

↓

FOR
WHICH
USER?

↓

WHO
IS
THE
BUYER?

↓

WHAT
EVIDENCE
SUPPORTS
THE
PROBLEM?

↓

WHAT
IS
THE
HYPOTHESIS?

↓

WHAT
IS
THE
SMALLEST
MEANINGFUL
OUTCOME?

↓

WHAT
MUST
THE
MVP
DO?

↓

WHAT
MUST
IT
NOT
DO?

↓

WHAT
CAN
BE
SIMULATED /
MANUAL /
TEMPORARY?

↓

WHAT
SECURITY /
PRIVACY /
TENANT
CONTROLS
ARE
NON-
NEGOTIABLE?

↓

WHAT
DOES
SUCCESS
MEAN?

↓

WHAT
DOES
FAILURE
MEAN?

↓

WHAT
EVIDENCE
WILL
CHANGE
OUR
DECISION?

↓

WHEN
DO
WE
KILL /
PIVOT /
CONTINUE?

↓

WHAT
MUST
HAPPEN
BEFORE
PRODUCT /
ENGINEERING /
PILOT /
PRODUCTION?
```

---

# 2. Core MVP Principle

Permanent:

```text id="mvp004"
MINIMUM
≠
CARELESS

VIABLE
≠
PRODUCTION-
READY
```

---

# 3. MVP Definition

For Mianx.ai, an MVP is:

> The smallest governed implementation capable of producing meaningful Evidence about a defined product hypothesis with a defined user population under a controlled scope.

---

# 4. MVP Boundary

```text id="mvp005"
MVP
≠
HALF-
FINISHED
PRODUCT
```

---

# 5. MVP/Prototype Boundary

A Prototype primarily explores:

```text id="mvp006"
CAN
THIS
CONCEPT /
INTERACTION /
SYSTEM
BE
REPRESENTED /
TESTED?
```

An MVP primarily explores:

```text id="mvp007"
DOES
THIS
MINIMUM
PRODUCT
OUTCOME
CREATE
ENOUGH
VALUE
TO
JUSTIFY
FURTHER
INVESTMENT?
```

---

# 6. Prototype/MVP Boundary

Permanent:

```text id="mvp008"
PROTOTYPE
SUCCESS
≠
MVP
VALIDATION
```

---

# 7. Proof of Concept Boundary

A Proof of Concept primarily asks:

```text id="mvp009"
IS
THE
TECHNICAL
IDEA
FEASIBLE?
```

An MVP asks a broader product question.

Permanent:

```text id="mvp010"
TECHNICAL
FEASIBILITY
≠
PRODUCT
VIABILITY
```

---

# 8. Demo Boundary

```text id="mvp011"
DEMO
LOOKS
IMPRESSIVE
≠
USER
VALUE
VALIDATED
```

---

# 9. Pilot Boundary

A Pilot usually tests a more operationally representative system with bounded real-world use.

Permanent:

```text id="mvp012"
MVP
≠
PILOT

PILOT
≠
PRODUCTION
```

---

# 10. Beta Boundary

```text id="mvp013"
BETA
LABEL
≠
SECURITY /
PRIVACY /
LEGAL
OBLIGATIONS
DISAPPEAR
```

---

# 11. Production Boundary

Permanent:

```text id="mvp014"
MVP
USABLE
BY
REAL
USERS
≠
PRODUCTION
AUTHORIZED
```

---

# 12. MVP Mission

```text id="mvp015"
LEARN
FAST

WITHOUT

DESTROYING
TRUST /
SECURITY /
EVIDENCE /
FUTURE
ARCHITECTURE
```

---

# 13. MVP Lifecycle

Target lifecycle:

```text id="mvp016"
MV0
OPPORTUNITY
SIGNAL

MV1
PROBLEM
EVIDENCE

MV2
USER /
BUYER
DEFINITION

MV3
HYPOTHESIS

MV4
MINIMUM
OUTCOME

MV5
SCOPE

MV6
RISK /
AUTHORITY
CLASSIFICATION

MV7
MVP
PLAN

MV8
BUILD
READINESS

MV9
BUILD

MV10
INTERNAL
VALIDATION

MV11
CONTROLLED
USER
EXPOSURE

MV12
OBSERVATION

MV13
EVIDENCE
ANALYSIS

MV14
KILL /
PIVOT /
CONTINUE

MV15
ITERATION

MV16
HANDOFF
CANDIDATE

MV17
PILOT
CANDIDATE

MV18
ARCHIVE /
TRANSFER
```

---

# 14. Lifecycle Boundary

```text id="mvp017"
MVP
REACHES
MV16 /
MV17
≠
PRODUCT /
PILOT
AUTHORIZED
```

---

# 15. MVP Identity

Each governed MVP should have a stable identity.

Potential:

```text id="mvp018"
MVP-000001
```

---

# 16. MVP Record

```yaml id="mvp019"
mvp_record:
  mvp_id: required

  title: required

  opportunity_ref: required
  problem_evidence_refs: []

  user_population_refs: []
  buyer_refs: []

  hypothesis_refs: []

  minimum_outcome_ref: required

  scope_ref: required
  non_goal_refs: []

  architecture_ref: required

  project_scope_refs: []
  tenant_scope_refs: []

  risk_class_ref: required
  autonomy_class_ref: conditional

  experiment_plan_ref: required
  validation_plan_ref: required

  telemetry_plan_ref: conditional

  security_review_ref: required
  privacy_review_ref: conditional
  responsible_ai_review_ref: conditional

  decision_state: required

  owner_ref: required
  created_at: required
  updated_at: required

  status: required
```

---

# 17. MVP Identity Boundary

Permanent:

```text id="mvp020"
MVP
ID
ASSIGNED
≠
MVP
APPROVED
```

---

# 18. Opportunity Linkage

Every MVP should trace to a defined Opportunity or Research question.

Potential:

```text id="mvp021"
MARKET
OPPORTUNITY

USER
PROBLEM

INTERNAL
ENTERPRISE
PROBLEM

PLATFORM
CAPABILITY
OPPORTUNITY

INDUSTRY
OS
OPPORTUNITY
```

---

# 19. Opportunity Boundary

```text id="mvp022"
OPPORTUNITY
IDENTIFIED
≠
OPPORTUNITY
VALIDATED
```

---

# 20. Problem Evidence

Potential Evidence:

```text id="mvp023"
USER
INTERVIEWS

OBSERVATION

WORKFLOW
ANALYSIS

SUPPORT
DATA

SALES
EVIDENCE

MARKET
RESEARCH

TELEMETRY

PROCESS
COST

FAILURE
EVENTS
```

---

# 21. Problem Boundary

Permanent:

```text id="mvp024"
ONE
USER
COMPLAINT
≠
MARKET
PROBLEM
PROVEN
```

---

# 22. Founder Idea Boundary

```text id="mvp025"
FOUNDER
IDEA
≠
USER
PROBLEM
VALIDATED
```

Founder direction may authorize exploration, but Evidence remains separately required.

---

# 23. User Definition

Potential distinctions:

```text id="mvp026"
END
USER

OPERATOR

ADMIN

MANAGER

BUYER

ECONOMIC
BUYER

APPROVER

INFLUENCER

IMPLEMENTER

STAKEHOLDER
```

---

# 24. User/Buyer Boundary

Permanent:

```text id="mvp027"
USER
≠
BUYER

BUYER
≠
APPROVER

APPROVER
≠
OPERATOR
```

---

# 25. User Population Record

```yaml id="mvp028"
mvp_user_population:
  population_id: required

  mvp_ref: required

  role_type: required

  problem_ref: required

  environment_ref: required

  recruitment_ref: conditional

  inclusion_criteria: []
  exclusion_criteria: []

  project_scope_ref: conditional
  tenant_scope_ref: conditional

  status: required
```

---

# 26. User Sample Boundary

```text id="mvp029"
MVP
USERS
≠
REPRESENTATIVE
MARKET
AUTOMATICALLY
```

---

# 27. Hypothesis

MVPs should validate explicit hypotheses.

Potential:

```text id="mvp030"
H1
PROBLEM
HYPOTHESIS

H2
VALUE
HYPOTHESIS

H3
USABILITY
HYPOTHESIS

H4
TECHNICAL
HYPOTHESIS

H5
ADOPTION
HYPOTHESIS

H6
WILLINGNESS-
TO-
PAY
HYPOTHESIS

H7
OPERATING
MODEL
HYPOTHESIS
```

---

# 28. Hypothesis Record

```yaml id="mvp031"
mvp_hypothesis:
  hypothesis_id: required

  mvp_ref: required

  type: required

  statement: required

  evidence_for_refs: []
  evidence_against_refs: []

  validation_method_ref: required

  decision_rule_ref: required

  status: required
```

---

# 29. Hypothesis Boundary

Permanent:

```text id="mvp032"
HYPOTHESIS
DOCUMENTED
≠
HYPOTHESIS
TRUE
```

---

# 30. Minimum Outcome

A Minimum Outcome should describe what valuable result must occur, not merely which screens/features exist.

Example conceptual structure:

```text id="mvp033"
TARGET
USER

CAN

COMPLETE
CORE
JOB

WITH

MEASURABLE
VALUE

UNDER

DEFINED
CONSTRAINTS
```

---

# 31. Outcome/Feature Boundary

```text id="mvp034"
FEATURE
EXISTS
≠
USER
OUTCOME
ACHIEVED
```

---

# 32. Minimum Outcome Record

```yaml id="mvp035"
minimum_outcome:
  minimum_outcome_id: required

  mvp_ref: required

  target_user_ref: required
  target_job_ref: required

  expected_result: required

  success_evidence_refs: []

  constraints: []

  failure_conditions: []

  status: required
```

---

# 33. MVP Scope

Scope should include:

```text id="mvp036"
IN

OUT

TEMPORARY

MANUAL

SIMULATED

DEFERRED

FORBIDDEN
```

---

# 34. Scope Record

```yaml id="mvp037"
mvp_scope:
  scope_id: required

  mvp_ref: required

  must_have_capability_refs: []
  optional_capability_refs: []

  manual_process_refs: []
  simulated_component_refs: []

  deferred_refs: []
  non_goal_refs: []
  prohibited_scope_refs: []

  project_scope_refs: []
  tenant_scope_refs: []

  status: required
```

---

# 35. Scope Boundary

Permanent:

```text id="mvp038"
MVP
SCOPE
SMALL
≠
MVP
SCOPE
UNCONTROLLED
```

---

# 36. Must-Have Capability

A must-have capability should be directly required to test the core hypothesis.

---

# 37. Optional Capability

Optional capabilities should not delay learning unless they materially affect validity.

---

# 38. Feature Request Boundary

Permanent:

```text id="mvp039"
USER
REQUESTS
FEATURE
≠
FEATURE
IS
MVP
MUST-
HAVE
```

---

# 39. Non-Goals

Every MVP should explicitly define non-goals.

Potential:

```text id="mvp040"
FULL
SCALABILITY

FULL
AUTOMATION

ALL
PERSONAS

ALL
INDUSTRIES

ALL
INTEGRATIONS

ALL
EDGE
CASES

FULL
DESIGN
SYSTEM
```

unless specifically required for the hypothesis.

---

# 40. Non-Goal Boundary

```text id="mvp041"
NON-
GOAL
≠
PERMISSION
TO
IGNORE
CRITICAL
SECURITY /
PRIVACY /
TENANT
BOUNDARIES
```

---

# 41. Scope Creep

Potential:

```text id="mvp042"
MVP
STARTS
WITH
ONE
CORE
OUTCOME

↓

ADDS
EVERY
REQUEST

↓

BECOMES
UNCONTROLLED
PRODUCT
BUILD
```

---

# 42. Scope Creep Control

Potential:

```text id="mvp043"
NEW
REQUEST

↓

DOES
IT
CHANGE
CORE
HYPOTHESIS
VALIDITY?

YES
→
REVIEW

NO
→
DEFER
```

---

# 43. Architecture Principle

MVP architecture may be deliberately bounded, but should avoid making future migration unnecessarily destructive.

Permanent:

```text id="mvp044"
MVP
ARCHITECTURE
≠
THROWAWAY
CHAOS
```

---

# 44. Architecture Profile

Potential:

```text id="mvp045"
TEMPORARY

EVOLUTIONARY

REUSABLE

SIMULATED

MANUAL
BACKEND

PRODUCTION-
ADJACENT
```

---

# 45. Architecture Record

```yaml id="mvp046"
mvp_architecture:
  architecture_id: required

  mvp_ref: required

  profile: required

  component_refs: []

  temporary_component_refs: []
  reusable_component_refs: []

  manual_component_refs: []
  simulated_component_refs: []

  technical_debt_refs: []

  security_boundary_refs: []
  project_scope_refs: []
  tenant_scope_refs: []

  migration_notes_ref: required

  status: required
```

---

# 46. Architecture Boundary

```text id="mvp047"
MVP
ARCHITECTURE
WORKS
FOR
CURRENT
TEST
≠
ARCHITECTURE
SUITABLE
FOR
SCALE
```

---

# 47. Build vs Reuse

Potential choices:

```text id="mvp048"
REUSE
Mianx.ai
CORE

REUSE
SHARED
SERVICE

REUSE
OPEN
SOURCE

LICENSE

MANUAL
PROCESS

BUILD
TEMPORARY

BUILD
REUSABLE
```

---

# 48. Build/Reuse Boundary

Permanent:

```text id="mvp049"
FASTEST
TO
BUILD
≠
FASTEST
TO
VALID
LEARNING
```

---

# 49. Manual-First Pattern

Manual work may substitute for automation where:

```text id="mvp050"
AUTOMATION
IS
NOT
THE
HYPOTHESIS
```

---

# 50. Manual Boundary

```text id="mvp051"
MANUAL
PROCESS
VALIDATES
USER
VALUE

≠

AUTOMATION
FEASIBILITY /
SCALABILITY
VALIDATED
```

---

# 51. Wizard-of-Oz Pattern

A user-facing automated-looking flow may use controlled Human operation behind the scenes where ethically appropriate and transparently governed.

---

# 52. Wizard-of-Oz Boundary

Permanent:

```text id="mvp052"
SIMULATED
AUTOMATION
≠
REAL
AUTOMATION
VALIDATED
```

---

# 53. Technical Debt

Technical debt may be acceptable when consciously bounded.

Potential classes:

```text id="mvp053"
TD01
TEMPORARY
CODE

TD02
TEMPORARY
DATA
MODEL

TD03
TEMPORARY
INTEGRATION

TD04
MANUAL
PROCESS

TD05
LIMITED
TEST
COVERAGE

TD06
TEMPORARY
UI

TD07
NON-
SCALABLE
COMPONENT

TD08
TEMPORARY
OBSERVABILITY
```

Critical security/privacy isolation should not be classified away as ordinary debt.

---

# 54. Technical Debt Record

```yaml id="mvp054"
mvp_technical_debt:
  debt_id: required

  mvp_ref: required

  category: required

  description: required

  reason: required

  risk_ref: required

  allowed_scope_ref: required

  remediation_trigger_ref: required

  owner_ref: required

  status: required
```

---

# 55. Debt Boundary

Permanent:

```text id="mvp055"
TECHNICAL
DEBT
DOCUMENTED
≠
TECHNICAL
DEBT
SAFE
```

---

# 56. Debt Sunset

Every material temporary shortcut should define a trigger for:

```text id="mvp056"
REMOVE

REPLACE

REFACTOR

OR

FORMALLY
ACCEPT
UNDER
NEW
GOVERNANCE
```

---

# 57. Data Requirements

Potential:

```text id="mvp057"
TEST
DATA

SYNTHETIC
DATA

REAL
USER
DATA

TENANT
DATA

BENCHMARK
DATA

OPERATIONAL
DATA
```

---

# 58. Data Boundary

Permanent:

```text id="mvp058"
MVP
STATUS
≠
DATA
GOVERNANCE
EXEMPTION
```

---

# 59. Minimum Necessary Data

Prefer:

```text id="mvp059"
SMALLEST
AUTHORIZED
DATASET

THAT

CAN
VALIDLY
TEST
THE
HYPOTHESIS
```

---

# 60. Synthetic Data

Synthetic Data may be preferred early when real Data is unnecessary.

---

# 61. Synthetic Data Boundary

```text id="mvp060"
MVP
WORKS
ON
SYNTHETIC
DATA
≠
MVP
WORKS
ON
REAL
DATA
```

---

# 62. Real Data

Use of real Data may require:

* rights.
* consent.
* privacy review.
* Tenant scope.
* retention rules.
* security controls.

---

# 63. Dataset Versioning

MVP Results should preserve which Dataset/version influenced the result.

---

# 64. Data Quality

Potential:

```text id="mvp061"
COMPLETENESS

ACCURACY

FRESHNESS

REPRESENTATIVENESS

BIAS

PROVENANCE
```

---

# 65. Data Quality Boundary

Permanent:

```text id="mvp062"
MODEL /
MVP
FAILURE
≠
PRODUCT
IDEA
FAILURE
IF
INPUT
DATA
WAS
INVALID
```

---

# 66. Model Selection

Potential:

```text id="mvp063"
HOSTED
MODEL

OPEN-
WEIGHT
MODEL

FINE-
TUNED
MODEL

MODEL
ROUTER

SMALL
MODEL

LARGE
MODEL
```

---

# 67. Model Boundary

```text id="mvp064"
MODEL
CAPABILITY
≠
MVP
SYSTEM
CAPABILITY
```

---

# 68. Model Selection Criteria

Potential:

```text id="mvp065"
QUALITY

SAFETY

LATENCY

COST

PRIVACY

TOOL
USE

CONTEXT

MULTILINGUAL

MULTIMODAL

AVAILABILITY
```

---

# 69. Prompt Selection

MVP Prompt versions should be traceable to Prompt Engineering and Prompt Benchmarks where material.

---

# 70. Prompt Boundary

Permanent:

```text id="mvp066"
PROMPT
BENCHMARK
PASS
≠
MVP
PRODUCT
VALIDATION
```

---

# 71. Agent Selection

Potential:

```text id="mvp067"
SINGLE
MODEL

SINGLE
AGENT

MULTI-
AGENT

HUMAN-
IN-
THE-
LOOP

RULE-
BASED
+
AI
```

---

# 72. Agent Boundary

```text id="mvp068"
AGENT
COMPLETES
TASK
≠
AGENT
AUTHORIZED
FOR
ALL
SIMILAR
TASKS
```

---

# 73. Multi-Agent Boundary

Permanent:

```text id="mvp069"
MORE
AGENTS
≠
BETTER
MVP
```

---

# 74. Tool Selection

Tools should be the minimum set needed for valid learning.

---

# 75. Tool Boundary

```text id="mvp070"
TOOL
AVAILABLE
≠
TOOL
AUTHORIZED
FOR
MVP
```

---

# 76. Side-Effect Tools

Potential:

```text id="mvp071"
EMAIL

PAYMENT

DATABASE
WRITE

CALENDAR

DEPLOYMENT

CUSTOMER
ACCOUNT

EXTERNAL
SYSTEM
UPDATE
```

require stronger controls.

---

# 77. Side-Effect Boundary

Permanent:

```text id="mvp072"
MVP
LEARNING
GOAL
≠
PERMISSION
FOR
UNBOUNDED
REAL-
WORLD
SIDE
EFFECTS
```

---

# 78. Memory

Potential:

```text id="mvp073"
SESSION
MEMORY

USER
MEMORY

PROJECT
MEMORY

TENANT
MEMORY

EXPERIMENT
STATE
```

---

# 79. Memory Boundary

```text id="mvp074"
MEMORY
AVAILABLE
≠
MEMORY
AUTHORIZED /
CURRENT /
CORRECT
```

---

# 80. Retrieval

MVP Retrieval should preserve:

```text id="mvp075"
SOURCE

PROJECT

TENANT

FRESHNESS

AUTHORITY

CITATION
```

---

# 81. Retrieval Boundary

Permanent:

```text id="mvp076"
RELEVANT
DOCUMENT
≠
AUTHORIZED
DOCUMENT
```

---

# 82. Human Fallback

MVPs may use Human fallback to preserve safety and learning quality.

Potential:

```text id="mvp077"
REVIEW

APPROVAL

MANUAL
EXECUTION

ERROR
RECOVERY

ESCALATION

CUSTOMER
SUPPORT
```

---

# 83. Human Fallback Boundary

```text id="mvp078"
HUMAN
FALLBACK
AVAILABLE
≠
MVP
OPERATIONALLY
SCALABLE
```

---

# 84. Human-in-the-Loop

Potential:

```text id="mvp079"
AI
PROPOSES

↓

HUMAN
REVIEWS

↓

AUTHORIZED
ACTION

↓

VERIFY
```

---

# 85. Human Review Boundary

Permanent:

```text id="mvp080"
HUMAN
REVIEWED
≠
ERROR-
FREE
```

---

# 86. Authority

MVP use should preserve:

```text id="mvp081"
WHO
MAY
ACCESS

WHO
MAY
TEST

WHO
MAY
APPROVE

WHO
MAY
EXECUTE

WHO
MAY
CHANGE
SCOPE
```

---

# 87. Authority Boundary

```text id="mvp082"
MVP
OWNER
≠
UNLIMITED
ENTERPRISE
AUTHORITY
```

---

# 88. Founder Routing

Permanent:

```text id="mvp083"
ROUTED
TO
FOUNDER
≠
FOUNDER
APPROVED
```

---

# 89. Silence Boundary

```text id="mvp084"
NO
OBJECTION
≠
APPROVAL
```

---

# 90. Project Scope

MVP may belong to:

```text id="mvp085"
CORE
Mianx.ai

INDUSTRY
OS

CLIENT
PROJECT

INTERNAL
PROJECT

RESEARCH
PROGRAM
```

---

# 91. Project Boundary

Permanent:

```text id="mvp086"
MVP
VALIDATED
IN
PROJECT A
≠
MVP
VALIDATED
IN
PROJECT B
```

---

# 92. Tenant Scope

Potential:

```text id="mvp087"
SINGLE
TENANT

MULTIPLE
ISOLATED
TENANTS

INTERNAL
DEMO
TENANT

SYNTHETIC
TENANT
```

---

# 93. Tenant Boundary

```text id="mvp088"
MVP
SUPPORTS
MULTIPLE
TENANTS
IN
UI
≠
TENANT
ISOLATION
VERIFIED
```

---

# 94. Cross-Tenant Hard Gate

Permanent:

```text id="mvp089"
CROSS-
TENANT
DATA /
MEMORY /
TOOL
LEAK
=
CRITICAL
FAILURE
```

A high average MVP score cannot compensate for it.

---

# 95. Security Minimums

Even MVPs should consider:

```text id="mvp090"
AUTHENTICATION

AUTHORIZATION

TENANT
ISOLATION

SECRET
MANAGEMENT

INPUT
VALIDATION

OUTPUT
VALIDATION

TOOL
PERMISSIONS

LOGGING

INCIDENT
RESPONSE
```

based on scope and risk.

---

# 96. Security Boundary

Permanent:

```text id="mvp091"
MVP
TEMPORARY
≠
SECURITY
OPTIONAL
```

---

# 97. Threat Modeling

MVP threat model may be simplified but should identify material risks.

Potential:

```text id="mvp092"
UNAUTHORIZED
ACCESS

PROMPT
INJECTION

DATA
LEAK

TOOL
ABUSE

CROSS-
TENANT
LEAK

SECRET
EXPOSURE

MODEL
MISUSE
```

---

# 98. Prompt Injection

AI-enabled MVPs should consider:

```text id="mvp093"
DIRECT
INJECTION

INDIRECT
INJECTION

TOOL
OUTPUT
INJECTION

RETRIEVED
CONTENT
INJECTION
```

---

# 99. Prompt Injection Boundary

```text id="mvp094"
PROMPT
SAYS
"IGNORE
MALICIOUS
INSTRUCTIONS"
≠
PROMPT
INJECTION
SOLVED
```

---

# 100. Privacy Minimums

Potential:

```text id="mvp095"
MINIMUM
DATA

CONSENT

PURPOSE

ACCESS

RETENTION

DELETION

EXPORT

AUDIT
```

where applicable.

---

# 101. Privacy Boundary

Permanent:

```text id="mvp096"
MVP
EXPERIMENT
≠
UNLIMITED
DATA
COLLECTION
```

---

# 102. Responsible AI

Potential:

```text id="mvp097"
HARM

BIAS

MANIPULATION

AUTONOMY

HUMAN
OVERSIGHT

ACCESSIBILITY

VULNERABLE
USERS

HIGH-
IMPACT
DECISIONS
```

---

# 103. Responsible AI Boundary

```text id="mvp098"
MVP
INNOVATIVE
≠
MVP
RESPONSIBLE
AUTOMATICALLY
```

---

# 104. High-Risk MVP

Potential triggers:

```text id="mvp099"
FINANCE

HEALTH

EMPLOYMENT

EDUCATION

LEGAL

SECURITY

CHILDREN

SENSITIVE
PERSONAL
DATA

AUTONOMOUS
SIDE
EFFECTS
```

Higher-risk MVPs require stronger review.

---

# 105. High-Risk Boundary

Permanent:

```text id="mvp100"
MVP
LABEL
≠
RISK
REDUCTION
```

---

# 106. Accessibility

MVP scope should identify accessibility requirements relevant to the target population.

Potential:

```text id="mvp101"
KEYBOARD

SCREEN
READER

CONTRAST

TEXT
SCALING

LANGUAGE

CAPTIONING

ERROR
MESSAGES
```

---

# 107. Accessibility Boundary

```text id="mvp102"
EARLY
PRODUCT
≠
ACCESSIBILITY
IRRELEVANT
```

---

# 108. Usability

Potential measures:

```text id="mvp103"
TASK
COMPLETION

TIME
ON
TASK

ERRORS

CONFUSION

ASSISTANCE
NEEDED

USER
CONFIDENCE
```

---

# 109. Usability/Value Boundary

Permanent:

```text id="mvp104"
EASY
TO
USE
≠
VALUABLE
TO
USE
```

---

# 110. Desirability

Potential:

```text id="mvp105"
REPEAT
USE

VOLUNTARY
USE

RECOMMENDATION

RETENTION
SIGNAL

WORKFLOW
PREFERENCE
```

---

# 111. Desirability Boundary

```text id="mvp106"
USER
LIKES
DEMO
≠
USER
WILL
ADOPT
PRODUCT
```

---

# 112. Willingness to Pay

Potential Evidence:

```text id="mvp107"
SIGNED
COMMITMENT

PAID
TRIAL

CONTRACT
DISCUSSION

BUDGET
ALLOCATION

PRICE
TEST

PURCHASE
INTENT
```

with appropriate caveats.

---

# 113. Willingness-to-Pay Boundary

Permanent:

```text id="mvp108"
USER
SAYS
"I
WOULD
PAY"
≠
PAYMENT
BEHAVIOR
PROVEN
```

---

# 114. Product-Market Fit Boundary

```text id="mvp109"
MVP
SUCCESS
≠
PRODUCT-
MARKET
FIT
```

---

# 115. Market Boundary

```text id="mvp110"
ONE
CUSTOMER
SUCCESS
≠
MARKET
VALIDATION
```

---

# 116. Technical Feasibility

Potential:

```text id="mvp111"
CORE
FLOW
WORKS

MODEL
QUALITY

TOOL
INTEGRATION

DATA
ACCESS

LATENCY

COST

RELIABILITY
```

---

# 117. Feasibility Boundary

Permanent:

```text id="mvp112"
TECHNICALLY
FEASIBLE
≠
ECONOMICALLY
VIABLE
```

---

# 118. Reliability

Potential MVP reliability Evidence:

```text id="mvp113"
SUCCESS
RATE

FAILURE
RATE

RETRY
RATE

TIMEOUT

ERROR
CLASS

RECOVERY
```

---

# 119. Reliability Boundary

```text id="mvp114"
WORKED
IN
DEMO
≠
RELIABLE
```

---

# 120. Availability

MVP may have explicitly limited availability.

Potential:

```text id="mvp115"
BUSINESS
HOURS

RESEARCH
WINDOW

TEST
WINDOW

MANUAL
SUPPORT
WINDOW
```

---

# 121. Availability Boundary

Permanent:

```text id="mvp116"
LIMITED
AVAILABILITY
ACCEPTABLE
FOR
MVP
≠
PRODUCTION
AVAILABILITY
VALIDATED
```

---

# 122. Performance

Potential:

```text id="mvp117"
LATENCY

THROUGHPUT

CONCURRENCY

TIME
TO
RESULT

USER-
PERCEIVED
WAIT
```

---

# 123. Performance Boundary

```text id="mvp118"
GOOD
LATENCY
WITH
5
USERS
≠
GOOD
LATENCY
AT
SCALE
```

---

# 124. Scalability

MVP may deliberately not prove scalability.

Permanent:

```text id="mvp119"
MVP
SUCCESS
≠
SCALABILITY
PROVEN
```

---

# 125. Cost

Potential:

```text id="mvp120"
MODEL
COST

TOOL
COST

INFRA
COST

HUMAN
REVIEW
COST

SUPPORT
COST

RETRY
COST
```

---

# 126. Cost Boundary

```text id="mvp121"
LOW
MVP
COST
≠
SUSTAINABLE
UNIT
ECONOMICS
```

---

# 127. Unit Economics Hypothesis

Potential:

```text id="mvp122"
VALUE
PER
TASK /
CUSTOMER

VS

COST
TO
DELIVER
```

as an early hypothesis.

---

# 128. Unit Economics Boundary

Permanent:

```text id="mvp123"
ESTIMATED
UNIT
ECONOMICS
≠
PROVEN
UNIT
ECONOMICS
```

---

# 129. Telemetry

Potential:

```text id="mvp124"
SESSION

TASK

FEATURE
USE

ERROR

LATENCY

MODEL
CALL

TOOL
CALL

USER
ACTION

FEEDBACK
```

---

# 130. Telemetry Boundary

```text id="mvp125"
CAN
LOG
EVENT
≠
AUTHORIZED
TO
LOG
EVERYTHING
```

---

# 131. Telemetry Consent

Where consent or notice is required, telemetry should preserve applicable user rights.

---

# 132. Event Schema

```yaml id="mvp126"
mvp_telemetry_event:
  event_id: required

  mvp_ref: required
  event_type: required

  project_scope_ref: conditional
  tenant_scope_ref: conditional

  user_or_session_ref: conditional

  occurred_at: required

  payload_ref: required

  privacy_class_ref: required

  source_ref: required

  status: required
```

---

# 133. Telemetry Quality

Potential:

```text id="mvp127"
EVENT
COMPLETENESS

DUPLICATION

ORDER

CLOCK

SESSION
LINKAGE

MISSING
EVENTS
```

---

# 134. Telemetry Boundary

Permanent:

```text id="mvp128"
NO
ERROR
EVENT
≠
NO
ERROR
OCCURRED
```

---

# 135. Experiment Design

Each MVP should have a validation experiment.

Potential:

```text id="mvp129"
WHO

WHAT

WHEN

WHERE

HOW

SUCCESS

FAILURE

COUNTER-
EVIDENCE
```

---

# 136. Experiment Record

```yaml id="mvp130"
mvp_experiment:
  experiment_id: required

  mvp_ref: required

  hypothesis_refs: []

  user_population_refs: []

  exposure_scope_ref: required

  success_metric_refs: []
  failure_metric_refs: []
  hard_gate_refs: []

  observation_plan_ref: required

  analysis_plan_ref: required

  stop_rule_ref: required

  status: required
```

---

# 137. Experiment Boundary

Permanent:

```text id="mvp131"
MVP
IS
BUILT
≠
MVP
EXPERIMENT
IS
WELL
DESIGNED
```

---

# 138. Success Criteria

Potential:

```text id="mvp132"
CORE
JOB
COMPLETED

TARGET
VALUE
OBSERVED

ACCEPTABLE
QUALITY

ACCEPTABLE
USER
EFFORT

NO
CRITICAL
HARD
GATE
FAILURE
```

---

# 139. No Universal Threshold

This document does not define universal numerical success thresholds for every MVP.

---

# 140. Success Boundary

```text id="mvp133"
SUCCESS
METRIC
PASSED
≠
ALL
MVP
HYPOTHESES
VALIDATED
```

---

# 141. Failure Criteria

Potential:

```text id="mvp134"
NO
MEANINGFUL
USER
VALUE

CORE
FLOW
FAILS

QUALITY
UNACCEPTABLE

COST
UNACCEPTABLE

SECURITY
FAILURE

TENANT
LEAK

USER
REJECTS
WORKFLOW

MODEL
UNRELIABLE
```

---

# 142. Hard Gates

Potential:

```text id="mvp135"
TENANT
LEAK

CRITICAL
PRIVACY
FAILURE

UNAUTHORIZED
SIDE
EFFECT

SECRET
EXPOSURE

CRITICAL
SAFETY
FAILURE

FALSE
APPROVAL /
AUTHORITY
CLAIM

HALT
FAILURE
```

---

# 143. Hard Gate Boundary

Permanent:

```text id="mvp136"
HIGH
USER
SATISFACTION
≠
HARD
GATE
OVERRIDE
```

---

# 144. Counter-Evidence

Every MVP analysis should actively seek:

```text id="mvp137"
WHO
DID
NOT
BENEFIT?

WHEN
DID
IT
FAIL?

WHAT
ALTERNATIVE
EXPLANATION
EXISTS?

WHAT
USER
BEHAVIOR
CONTRADICTS
THE
HYPOTHESIS?
```

---

# 145. Counter-Evidence Boundary

```text id="mvp138"
POSITIVE
CASES
≠
NEGATIVE
CASES
IRRELEVANT
```

---

# 146. User Feedback

Potential:

```text id="mvp139"
INTERVIEW

SURVEY

IN-
PRODUCT
FEEDBACK

OBSERVATION

SUPPORT

TASK
BEHAVIOR
```

---

# 147. Feedback Boundary

Permanent:

```text id="mvp140"
USER
FEEDBACK
≠
GROUND
TRUTH
```

---

# 148. Stated vs Observed Behavior

```text id="mvp141"
USER
SAYS
"THIS
IS
USEFUL"

≠

USER
ACTUALLY
USES
IT
IN
WORKFLOW
```

---

# 149. User Satisfaction Boundary

```text id="mvp142"
SATISFACTION
≠
RETENTION

RETENTION
≠
WILLINGNESS
TO
PAY

WILLINGNESS
TO
PAY
≠
PRODUCT-
MARKET
FIT
```

---

# 150. Controlled Exposure

Potential:

```text id="mvp143"
INTERNAL
TEAM

DESIGN
PARTNERS

SELECTED
USERS

ONE
PROJECT

ONE
TENANT

LIMITED
GEOGRAPHY

LIMITED
TIME
WINDOW
```

---

# 151. Exposure Boundary

Permanent:

```text id="mvp144"
REAL
USER
ACCESS
≠
PUBLIC
PRODUCTION
LAUNCH
```

---

# 152. Exposure Record

```yaml id="mvp145"
mvp_exposure:
  exposure_id: required

  mvp_ref: required

  user_population_refs: []

  project_scope_refs: []
  tenant_scope_refs: []

  environment_ref: required

  start_at: required
  end_at: conditional

  access_control_ref: required

  monitoring_ref: required

  rollback_or_disable_ref: required

  approval_refs: []

  status: required
```

---

# 153. Exposure Authority

Controlled external exposure should require explicit authorization appropriate to its risk.

---

# 154. Environment

Potential:

```text id="mvp146"
LOCAL

RESEARCH

SANDBOX

TEST

STAGING

MVP
CONTROLLED

PILOT
CONTROLLED

PRODUCTION
```

---

# 155. Environment Boundary

Permanent:

```text id="mvp147"
MVP
CONTROLLED
ENVIRONMENT
≠
PRODUCTION
ENVIRONMENT
```

---

# 156. Data Separation

MVP environment should not silently share unrestricted Data with Production.

---

# 157. Release

MVP release may include:

```text id="mvp148"
FEATURE
FLAG

ALLOWLIST

INVITE

TENANT
FLAG

PROJECT
FLAG

TIME-
BOUNDED
ACCESS
```

---

# 158. Kill Switch

Where material, MVP should support a disable mechanism.

---

# 159. Kill Switch Boundary

```text id="mvp149"
KILL
SWITCH
EXISTS
≠
KILL
SWITCH
WORKS
UNTIL
VERIFIED
```

---

# 160. Rollback

Potential:

```text id="mvp150"
CURRENT
MVP
VERSION

↓

ISSUE

↓

DISABLE /
ROLLBACK

↓

VERIFY
USER
EXPOSURE
ENDED /
VERSION
CHANGED

↓

PRESERVE
EVIDENCE
```

---

# 161. Rollback Boundary

Permanent:

```text id="mvp151"
ROLLBACK
REQUEST
≠
ROLLBACK
VERIFIED
```

---

# 162. Iteration

Potential:

```text id="mvp152"
OBSERVE

↓

LEARN

↓

CHANGE
HYPOTHESIS /
SCOPE /
IMPLEMENTATION

↓

NEW
VERSION

↓

RETEST
```

---

# 163. Iteration Boundary

```text id="mvp153"
MORE
ITERATIONS
≠
MORE
VALIDATION
AUTOMATICALLY
```

---

# 164. MVP Versioning

Material change may require new version when changing:

```text id="mvp154"
CORE
OUTCOME

USER
POPULATION

MODEL

PROMPT

TOOLS

ARCHITECTURE

DATA

PROJECT /
TENANT

SECURITY
BEHAVIOR
```

---

# 165. Version Boundary

Permanent:

```text id="mvp155"
MVP
VERSION 1
EVIDENCE
≠
MVP
VERSION 2
EVIDENCE
AUTOMATICALLY
```

---

# 166. Decision States

Potential:

```text id="mvp156"
CONTINUE

CONTINUE
WITH
CHANGES

PIVOT

PAUSE

KILL

HANDOFF
CANDIDATE

PILOT
CANDIDATE

MORE
RESEARCH
REQUIRED
```

---

# 167. Continue Decision

Requires:

```text id="mvp157"
ENOUGH
EVIDENCE
TO
JUSTIFY
NEXT
INVESTMENT
```

not perfection.

---

# 168. Pivot

Potential pivot dimensions:

```text id="mvp158"
USER

PROBLEM

VALUE
PROPOSITION

WORKFLOW

MODEL

CHANNEL

PRICING

BUSINESS
MODEL

TECHNICAL
APPROACH
```

---

# 169. Pivot Boundary

```text id="mvp159"
PIVOT
≠
FAILURE
AUTOMATICALLY

PIVOT
=
LEARNING-
DRIVEN
CHANGE
WHEN
JUSTIFIED
```

---

# 170. Kill Decision

Potential when:

```text id="mvp160"
PROBLEM
WEAK

VALUE
WEAK

TECHNICAL
COST
TOO
HIGH

SECURITY /
LEGAL /
ETHICAL
RISK
UNACCEPTABLE

BETTER
OPPORTUNITY
EXISTS
```

---

# 171. Kill Boundary

Permanent:

```text id="mvp161"
KILL
MVP
≠
DELETE
RESEARCH
EVIDENCE
```

---

# 172. Pause

Potential:

```text id="mvp162"
DEPENDENCY
MISSING

MARKET
TIMING

MODEL
LIMITATION

DATA
LIMITATION

SECURITY
BLOCKER

RESOURCE
CONSTRAINT
```

---

# 173. Decision Record

```yaml id="mvp163"
mvp_decision:
  decision_id: required

  mvp_ref: required
  mvp_version_ref: required

  hypothesis_result_refs: []
  evidence_refs: []
  counter_evidence_refs: []

  hard_gate_result_refs: []

  decision: required

  rationale: required
  limitations: []

  project_scope_refs: []
  tenant_scope_refs: []

  authority_ref: required

  decided_at: required
  status: required
```

---

# 174. Decision Boundary

Permanent:

```text id="mvp164"
MVP
DECISION
=
CONTINUE
≠
PRODUCTION
AUTHORIZATION
```

---

# 175. Product Handoff

Potential handoff package:

```text id="mvp165"
PROBLEM
EVIDENCE

USER
EVIDENCE

HYPOTHESES

RESULTS

FAILURES

COUNTER-
EVIDENCE

MVP
ARCHITECTURE

TECHNICAL
DEBT

SECURITY
FINDINGS

DATA
FINDINGS

MODEL /
PROMPT /
AGENT
FINDINGS

PRODUCT
REQUIREMENTS
CANDIDATES

OPEN
QUESTIONS
```

---

# 176. Handoff Boundary

```text id="mvp166"
MVP
HANDOFF
TO
PRODUCT
≠
PRODUCT
REQUIREMENT
AUTOMATICALLY
APPROVED
```

---

# 177. Engineering Handoff

Potential:

```text id="mvp167"
ARCHITECTURE
LESSONS

REUSABLE
COMPONENTS

THROWAWAY
COMPONENTS

TECHNICAL
DEBT

TEST
RESULTS

OPERABILITY
GAPS

SCALABILITY
GAPS

SECURITY
GAPS
```

---

# 178. Engineering Handoff Boundary

Permanent:

```text id="mvp168"
MVP
CODE
EXISTS
≠
MVP
CODE
SHOULD
BECOME
PRODUCTION
CODE
```

---

# 179. Reuse Decision

Potential:

```text id="mvp169"
REUSE
AS-IS

REFACTOR
AND
REUSE

REWRITE

ARCHIVE

DISCARD
```

requires Engineering/Architecture review.

---

# 180. Commercialization Boundary

```text id="mvp170"
MVP
VALUE
SIGNAL
≠
COMMERCIAL
LAUNCH
AUTHORIZATION
```

---

# 181. Pricing Experiment

Potential:

```text id="mvp171"
PRICE
RANGE

PACKAGING

TRIAL

PAID
PILOT

VALUE-
BASED
QUESTION
```

subject to business and legal controls.

---

# 182. Revenue Boundary

Permanent:

```text id="mvp172"
ONE
PAID
MVP
≠
REPEATABLE
BUSINESS
MODEL
```

---

# 183. Sales Boundary

```text id="mvp173"
SALES
TEAM
CAN
DEMO
MVP
≠
SALES
TEAM
MAY
PROMISE
PRODUCTION
CAPABILITY
```

---

# 184. Marketing Boundary

Permanent:

```text id="mvp174"
MVP
CAPABILITY
≠
PUBLIC
CLAIM
OF
FULL
Mianx.ai
PLATFORM
CAPABILITY
```

---

# 185. Operational Readiness

Potential Production-related areas not necessarily validated by MVP:

```text id="mvp175"
HA

BACKUP

DISASTER
RECOVERY

SLO

ON-
CALL

CAPACITY

SECURITY
OPERATIONS

COMPLIANCE

SUPPORT

BILLING

DATA
RETENTION

INCIDENT
MANAGEMENT
```

---

# 186. Operational Boundary

```text id="mvp176"
MVP
OPERATES
FOR
TEST
USERS
≠
OPERATIONALLY
READY
FOR
PRODUCTION
```

---

# 187. Production Readiness Boundary

Permanent:

```text id="mvp177"
MVP
VALIDATION
≠
PRODUCTION
READINESS
REVIEW
```

---

# 188. Product-Market Fit Evaluation Boundary

MVP Evidence may contribute to later Product-Market Fit analysis.

But:

```text id="mvp178"
MVP
EVIDENCE
=
INPUT
TO
PMF
ASSESSMENT

NOT

PMF
PROOF
BY
ITSELF
```

---

# 189. Metrics

Potential:

```text id="mvp179"
USER
OUTCOME

TASK
SUCCESS

TIME
SAVED

ERROR
REDUCTION

ADOPTION

RETENTION
SIGNAL

WILLINGNESS
TO
PAY

QUALITY

COST

LATENCY

FAILURE
RATE

HUMAN
INTERVENTION
RATE
```

---

# 190. Metric Boundary

Permanent:

```text id="mvp180"
METRIC
IMPROVES
≠
MVP
VALIDATED
AUTOMATICALLY
```

---

# 191. Vanity Metrics

Potential:

```text id="mvp181"
SIGNUPS

PAGE
VIEWS

DEMO
CLICKS

SOCIAL
LIKES

RAW
AI
MESSAGE
COUNT
```

may be weak Evidence unless linked to hypothesis.

---

# 192. Vanity Metric Boundary

```text id="mvp182"
HIGH
ACTIVITY
≠
HIGH
VALUE
```

---

# 193. Anti-Goodhart Principle

```text id="mvp183"
WHEN
A
METRIC
BECOMES
A
TARGET

CHECK
WHETHER
BEHAVIOR
IS
OPTIMIZING
THE
METRIC

INSTEAD
OF
THE
REAL
OUTCOME
```

---

# 194. Cohort Analysis

Potential:

```text id="mvp184"
USER
TYPE

PROJECT

TENANT

INDUSTRY

LANGUAGE

WORKFLOW

RISK
CLASS
```

---

# 195. Aggregate Boundary

Permanent:

```text id="mvp185"
AVERAGE
MVP
RESULT
GOOD
≠
EVERY
COHORT
GOOD
```

---

# 196. Tail Failures

Potential:

```text id="mvp186"
RARE
TENANT
LEAK

RARE
FALSE
SIDE
EFFECT

RARE
CRITICAL
HALLUCINATION

RARE
SECURITY
FAILURE
```

should not be averaged away.

---

# 197. Reliability of Evidence

Potential Evidence classes:

```text id="mvp187"
ME0
ANECDOTE

ME1
SELF-
REPORTED
SIGNAL

ME2
OBSERVED
SINGLE
CASE

ME3
REPEATED
OBSERVATION

ME4
CONTROLLED
EXPERIMENT

ME5
MULTIPLE
CONVERGING
EVIDENCE
SOURCES
```

This is a conceptual research aid, not a universal statistical hierarchy.

---

# 198. Evidence Boundary

```text id="mvp188"
MORE
EVIDENCE
ITEMS
≠
STRONGER
EVIDENCE
IF
ALL
DEPEND
ON
SAME
BIASED
SOURCE
```

---

# 199. Confidence State

Potential:

```text id="mvp189"
MC0
UNKNOWN

MC1
WEAK

MC2
EARLY

MC3
MODERATE

MC4
STRONG
FOR
DEFINED
SCOPE

MC5
REPEATEDLY
SUPPORTED
FOR
DEFINED
SCOPE
```

No state equals universal truth.

---

# 200. Confidence Boundary

Permanent:

```text id="mvp190"
HIGH
CONFIDENCE
FOR
DEFINED
SCOPE
≠
UNIVERSAL
VALIDITY
```

---

# 201. MVP Failure Classes

Potential:

```text id="mvp191"
MVF01
PROBLEM
NOT
VALIDATED

MVF02
WRONG
USER
POPULATION

MVF03
WRONG
BUYER

MVF04
HYPOTHESIS
UNCLEAR

MVF05
MVP
SCOPE
TOO
LARGE

MVF06
MVP
SCOPE
TOO
SMALL
TO
TEST
VALUE

MVF07
TECHNICAL
FEASIBILITY
FAILURE

MVF08
MODEL /
PROMPT /
AGENT
QUALITY
FAILURE

MVF09
DATA
QUALITY
FAILURE

MVF10
PROJECT
SCOPE
FAILURE

MVF11
TENANT
SCOPE
FAILURE

MVF12
SECURITY /
PRIVACY
FAILURE

MVF13
TELEMETRY /
EVIDENCE
FAILURE

MVF14
USER
VALUE
FAILURE

MVF15
COST /
LATENCY
FAILURE

MVF16
TECHNICAL
DEBT
ESCAPES
CONTROL

MVF17
MVP
RESULT
OVER-
GENERALIZED

MVF18
MVP
MISREPRESENTED
AS
PRODUCTION
```

---

# 202. MVP Incident Classes

Potential:

```text id="mvp192"
MVI01
UNAUTHORIZED
USER
EXPOSURE

MVI02
CROSS-
TENANT
LEAK

MVI03
SECRET
EXPOSURE

MVI04
PROMPT
INJECTION
SIDE
EFFECT

MVI05
UNAUTHORIZED
TOOL
ACTION

MVI06
FALSE
FOUNDER
APPROVAL

MVI07
PRIVACY
VIOLATION

MVI08
TELEMETRY
OVER-
COLLECTION

MVI09
MVP
VERSION
MISMATCH

MVI10
MODEL
REGRESSION

MVI11
WRONG
PROJECT
SCOPE

MVI12
KILL
SWITCH
FAILURE

MVI13
ROLLBACK
FAILURE

MVI14
RESULT
MISREPORTING

MVI15
MVP
SUCCESS
MISREPRESENTED
AS
PRODUCTION
READINESS
```

---

# 203. Incident Response

Conceptually:

```text id="mvp193"
DETECT

↓

STOP /
LIMIT
NEW
EXPOSURE
WHERE
AUTHORIZED

↓

PRESERVE
EVIDENCE

↓

IDENTIFY
AFFECTED
USERS /
PROJECTS /
TENANTS

↓

IDENTIFY
DATA /
TOOLS /
MODEL
IMPACT

↓

CONTAIN

↓

FIX /
ROLLBACK

↓

VERIFY

↓

REVIEW
MVP
EVIDENCE
VALIDITY

↓

UPDATE
DECISION
```

---

# 204. Evidence Contamination

An incident may invalidate MVP Evidence if it materially changes user behavior or measurement.

Potential:

```text id="mvp194"
BUG

WRONG
VERSION

TELEMETRY
LOSS

TEST
USER
COACHING

UNCONTROLLED
FEATURE
CHANGE

DATA
LEAK

MODEL
CHANGE
```

---

# 205. Result Invalidation

Potential:

```text id="mvp195"
VALID

VALID
WITH
LIMITATIONS

SUSPECT

INVALID
```

---

# 206. Invalidation Boundary

Permanent:

```text id="mvp196"
MVP
RESULT
INVALID
≠
MVP
IDEA
FALSE

IT
MEANS

RESULT
CANNOT
SUPPORT
THE
CLAIM
AS
RECORDED
```

---

# 207. MVP HALT

Potential triggers:

```text id="mvp197"
CRITICAL
TENANT
LEAK

CRITICAL
PRIVACY
INCIDENT

SECRET
EXPOSURE

UNAUTHORIZED
SIDE
EFFECT

FALSE
ENTERPRISE
AUTHORITY

UNCONTROLLED
EXTERNAL
EXPOSURE

HIGH-
IMPACT
SAFETY
FAILURE

KILL
SWITCH
FAILURE
```

---

# 208. HALT Scope

Potential:

```text id="mvp198"
STOP
NEW
USERS

DISABLE
MVP

DISABLE
SIDE-
EFFECT
TOOLS

REVOKE
ACCESS

FREEZE
DATA
WRITES

ROUTE
INCIDENT
REVIEW
```

where authorized.

---

# 209. HALT Boundary

Permanent:

```text id="mvp199"
MVP
HALT
REQUEST
≠
MVP
ACTUALLY
HALTED
UNTIL
RUNTIME
VERIFICATION
```

---

# 210. Resume

Potential:

```text id="mvp200"
ROOT
CAUSE
ASSESSED

SECURITY /
PRIVACY
ISSUE
RESOLVED

MODEL /
PROMPT /
TOOL
CONFIG
VERIFIED

PROJECT /
TENANT
SCOPE
VERIFIED

ROLLBACK /
PATCH
VERIFIED

EVIDENCE
VALIDITY
REASSESSED

CURRENT
AUTHORITY

RESUME
DECISION
```

---

# 211. MVP Documentation Package

Potential:

```text id="mvp201"
MVP
CHARTER

PROBLEM
EVIDENCE

USER /
BUYER
DEFINITION

HYPOTHESES

SCOPE

NON-
GOALS

ARCHITECTURE

TECHNICAL
DEBT

DATA
PLAN

MODEL /
PROMPT /
AGENT
PLAN

SECURITY /
PRIVACY
REVIEW

EXPERIMENT
PLAN

TELEMETRY
PLAN

RESULTS

COUNTER-
EVIDENCE

DECISION

HANDOFF
```

---

# 212. MVP Charter

```yaml id="mvp202"
mvp_charter:
  mvp_ref: required

  problem_statement: required
  target_user_refs: []
  target_buyer_refs: []

  hypothesis_refs: []

  minimum_outcome_ref: required

  in_scope_refs: []
  out_of_scope_refs: []
  non_goal_refs: []

  project_scope_refs: []
  tenant_scope_refs: []

  timebox_ref: conditional
  budget_ref: conditional

  security_requirements: []
  privacy_requirements: []

  success_criteria_refs: []
  hard_gate_refs: []

  decision_owner_ref: required

  status: required
```

---

# 213. Timebox

MVPs should often use a bounded evaluation window where appropriate.

This document does not establish a universal number of days or weeks.

---

# 214. Timebox Boundary

```text id="mvp203"
TIMEBOX
ENDED
≠
AUTOMATIC
KILL

TIMEBOX
ENDED
=
MANDATORY
DECISION /
REVIEW
POINT
```

---

# 215. Budget

Potential:

```text id="mvp204"
ENGINEERING

MODEL

DATA

TOOL

INFRA

DESIGN

RESEARCH

USER
INCENTIVES

SUPPORT
```

---

# 216. Budget Boundary

Permanent:

```text id="mvp205"
MVP
UNDER
BUDGET
≠
MVP
SUCCESS
```

---

# 217. Opportunity Cost

MVP prioritization should consider:

```text id="mvp206"
WHAT
OTHER
RESEARCH /
PRODUCT
OPPORTUNITY
IS
NOT
BEING
PURSUED?
```

---

# 218. MVP Portfolio

Potential:

```text id="mvp207"
CORE
PLATFORM
MVPs

AI
WORKFORCE
MVPs

INDUSTRY
OS
MVPs

CLIENT
MVPs

RESEARCH
MVPs
```

---

# 219. Portfolio Boundary

```text id="mvp208"
MORE
MVPs
≠
MORE
INNOVATION
```

---

# 220. Concurrent MVPs

Multiple MVPs can increase:

```text id="mvp209"
RESOURCE
CONFLICT

USER
CONFUSION

SHARED
DATA
RISK

PLATFORM
DEPENDENCY

LEARNING
INTERFERENCE
```

---

# 221. Dependency Tracking

Potential:

```text id="mvp210"
MODEL

TOOL

DATASET

PLATFORM
SERVICE

PROMPT

AGENT

EXTERNAL
VENDOR
```

---

# 222. Dependency Boundary

Permanent:

```text id="mvp211"
DEPENDENCY
AVAILABLE
TODAY
≠
DEPENDENCY
STABLE
FOR
FUTURE
PRODUCT
```

---

# 223. Vendor Dependency

Potential:

```text id="mvp212"
HOSTED
MODEL

API

PAYMENT
SERVICE

DATA
PROVIDER

CLOUD
SERVICE
```

---

# 224. Vendor Boundary

```text id="mvp213"
MVP
WORKS
WITH
VENDOR
≠
VENDOR
SUITABLE
FOR
LONG-
TERM
PRODUCTION
```

---

# 225. Lock-In

MVP may intentionally accept temporary lock-in if documented.

Permanent:

```text id="mvp214"
TEMPORARY
LOCK-
IN
ACCEPTED
≠
LONG-
TERM
LOCK-
IN
APPROVED
```

---

# 226. Observability

Potential:

```text id="mvp215"
LOGS

METRICS

TRACES

MODEL
REQUESTS

TOOL
CALLS

USER
EVENTS

ERRORS

AUDIT
EVENTS
```

---

# 227. Observability Boundary

```text id="mvp216"
LOGS
EXIST
≠
SYSTEM
OBSERVABLE
ENOUGH
TO
VALIDATE
HYPOTHESIS
```

---

# 228. Audit

Material actions should be auditable:

```text id="mvp217"
MVP
CREATED

SCOPE
CHANGED

USER
EXPOSURE
CHANGED

MODEL /
PROMPT /
TOOL
CHANGED

TENANT
SCOPE
CHANGED

RESULT
RECORDED

DECISION
MADE

MVP
HALTED

MVP
HANDED
OFF

MVP
ARCHIVED
```

---

# 229. Audit Boundary

Permanent:

```text id="mvp218"
AUDIT
EVENT
≠
ACTION
AUTHORIZED
AUTOMATICALLY
```

---

# 230. Monitoring

Potential:

```text id="mvp219"
CORE
OUTCOME

FAILURES

MODEL
QUALITY

TOOL
ERRORS

TENANT
BOUNDARIES

SECURITY

PRIVACY

LATENCY

COST

HUMAN
FALLBACK

USER
FEEDBACK

VERSION

EXPOSURE
```

---

# 231. Monitoring Boundary

```text id="mvp220"
NO
MVP
ALERT
≠
NO
MVP
RISK
```

---

# 232. Continuous Learning Boundary

```text id="mvp221"
MVP
SHOULD
LEARN

BUT

MVP
SHOULD
NOT
SILENTLY
CHANGE
CORE
BEHAVIOR
WITHOUT
VERSION /
REVIEW
```

---

# 233. Adaptive Model Boundary

If model behavior is adaptive:

```text id="mvp222"
ADAPTIVE
SYSTEM
≠
UNCONTROLLED
EXPERIMENT
```

---

# 234. A/B Testing

Potential:

```text id="mvp223"
VERSION A

VS

VERSION B
```

with appropriate assignment, metrics and ethics.

---

# 235. A/B Boundary

Permanent:

```text id="mvp224"
A/B
WINNER
≠
UNIVERSALLY
BETTER
PRODUCT
```

---

# 236. User Segmentation

Potential:

```text id="mvp225"
NEW
USERS

POWER
USERS

MANAGERS

INDUSTRY

PROJECT

TENANT

LANGUAGE
```

---

# 237. Segment Boundary

```text id="mvp226"
SEGMENT A
SUCCESS
≠
SEGMENT B
SUCCESS
```

---

# 238. Geographic Boundary

Where geographically relevant:

```text id="mvp227"
SUCCESS
IN
REGION A
≠
SUCCESS
IN
REGION B
```

---

# 239. Multilingual MVP

Potential:

```text id="mvp228"
ENGLISH

URDU

ROMAN
URDU

OTHER
SUPPORTED
LANGUAGES
```

---

# 240. Multilingual Boundary

Permanent:

```text id="mvp229"
ENGLISH
MVP
VALIDATED
≠
ROMAN
URDU /
MULTILINGUAL
MVP
VALIDATED
```

---

# 241. Multimodal MVP

Potential:

```text id="mvp230"
TEXT

IMAGE

DOCUMENT

AUDIO

VIDEO

SCREENSHOT
```

---

# 242. Multimodal Boundary

```text id="mvp231"
TEXT
FLOW
WORKS
≠
MULTIMODAL
FLOW
WORKS
```

---

# 243. Mobile/Web Boundary

```text id="mvp232"
WEB
MVP
VALIDATED
≠
MOBILE
EXPERIENCE
VALIDATED
```

---

# 244. Integration Boundary

```text id="mvp233"
MOCKED
INTEGRATION
≠
REAL
INTEGRATION
VALIDATED
```

---

# 245. API Boundary

```text id="mvp234"
API
WORKS
WITH
TEST
DATA
≠
API
OPERATES
RELIABLY
UNDER
REAL
LOAD
```

---

# 246. Compliance Boundary

Permanent:

```text id="mvp235"
MVP
≠
COMPLIANCE
EXEMPTION
```

---

# 247. Legal Boundary

This document does not determine legal compliance for any specific MVP.

Legal/regulatory requirements require appropriate review.

---

# 248. Intellectual Property

MVPs may involve:

```text id="mvp236"
NEW
ALGORITHM

WORKFLOW

PROMPT

AGENT
DESIGN

CODE

DATASET

UI

BUSINESS
PROCESS
```

Potentially protectable innovation should route through Innovation Protection governance before public disclosure where relevant.

---

# 249. IP Boundary

```text id="mvp237"
MVP
PUBLIC
DEMO
READY
≠
IP
DISCLOSURE
AUTHORIZED
```

---

# 250. Open Source

Potential reuse/release requires applicable license and IP review.

---

# 251. Open-Source Boundary

Permanent:

```text id="mvp238"
MVP
CODE
TEMPORARY
≠
SAFE
TO
OPEN
SOURCE
WITHOUT
REVIEW
```

---

# 252. MVP Checklist

## Problem and Opportunity

* [x] Opportunity linkage defined.
* [x] problem Evidence defined.
* [x] Founder idea boundary defined.
* [x] user/buyer distinctions defined.
* [x] user population defined.
* [x] sample limits defined.

## Hypothesis

* [x] hypothesis types defined.
* [x] hypothesis record defined.
* [x] minimum outcome defined.
* [x] outcome/feature boundary defined.

## Scope

* [x] must-have defined.
* [x] optional defined.
* [x] non-goals defined.
* [x] scope creep control defined.
* [x] manual/simulated components defined.

## Architecture

* [x] MVP architecture defined.
* [x] build/reuse decisions defined.
* [x] manual-first defined.
* [x] Wizard-of-Oz bounded.
* [x] technical debt defined.
* [x] debt sunset defined.

## AI and Data

* [x] Data requirements defined.
* [x] synthetic Data defined.
* [x] Data quality defined.
* [x] Model selection defined.
* [x] Prompt selection defined.
* [x] Agent/Multi-Agent selection defined.
* [x] Tool selection defined.
* [x] Memory/Retrieval defined.
* [x] Human fallback defined.

## Governance

* [x] authority defined.
* [x] Founder routing boundary defined.
* [x] Project scope defined.
* [x] Tenant scope defined.
* [x] cross-Tenant hard gate defined.
* [x] security defined.
* [x] privacy defined.
* [x] Responsible AI defined.
* [x] accessibility defined.
* [x] IP/public disclosure boundary defined.

## Product Validation

* [x] usability defined.
* [x] desirability defined.
* [x] willingness-to-pay defined.
* [x] Product-Market Fit boundary defined.
* [x] technical feasibility defined.
* [x] reliability defined.
* [x] performance defined.
* [x] scalability boundary defined.
* [x] cost/unit economics defined.

## Experimentation

* [x] telemetry defined.
* [x] experiment design defined.
* [x] success criteria defined.
* [x] failure criteria defined.
* [x] hard gates defined.
* [x] Counter-Evidence defined.
* [x] user feedback defined.
* [x] controlled exposure defined.
* [x] environment defined.
* [x] kill switch defined.
* [x] rollback defined.

## Decisions

* [x] iteration defined.
* [x] MVP versioning defined.
* [x] continue defined.
* [x] pivot defined.
* [x] kill defined.
* [x] pause defined.
* [x] decision records defined.
* [x] Product handoff defined.
* [x] Engineering handoff defined.
* [x] commercialization boundary defined.
* [x] Production readiness boundary defined.

## Operations

* [x] metrics defined.
* [x] anti-Goodhart defined.
* [x] cohorts defined.
* [x] tail failures defined.
* [x] Evidence/confidence model defined.
* [x] failure classes defined.
* [x] incidents defined.
* [x] result invalidation defined.
* [x] HALT/Resume defined.
* [x] budget/timebox defined.
* [x] dependencies defined.
* [x] observability defined.
* [x] Audit defined.
* [x] monitoring defined.
* [x] controlled Pilot defined.
* [x] maturity defined.
* [x] Runtime Truth defined.

---

# 253. Positive Verification Scenarios

Future MVP capability should verify at least:

```text id="mvp239"
MVV-01
PROTOTYPE
SUCCESS
DOES
NOT
AUTO-
BECOME
MVP
VALIDATION

MVV-02
TECHNICAL
POC
SUCCESS
DOES
NOT
AUTO-
BECOME
PRODUCT
VIABILITY

MVV-03
DEMO
QUALITY
DOES
NOT
AUTO-
BECOME
USER
VALUE

MVV-04
MVP
REAL-
USER
ACCESS
DOES
NOT
AUTO-
BECOME
PRODUCTION
AUTHORIZATION

MVV-05
FOUNDER
IDEA
DOES
NOT
AUTO-
BECOME
VALIDATED
USER
PROBLEM

MVV-06
USER
DOES
NOT
AUTO-
BECOME
BUYER /
APPROVER

MVV-07
FEATURE
REQUEST
DOES
NOT
AUTO-
BECOME
MVP
MUST-
HAVE

MVV-08
NON-
GOAL
DOES
NOT
AUTO-
REMOVE
SECURITY /
TENANT
REQUIREMENTS

MVV-09
MVP
ARCHITECTURE
WORKING
DOES
NOT
AUTO-
BECOME
SCALABLE
ARCHITECTURE

MVV-10
MANUAL
WORKFLOW
SUCCESS
DOES
NOT
AUTO-
BECOME
AUTOMATION
VALIDATION

MVV-11
TECHNICAL
DEBT
RECORDED
DOES
NOT
AUTO-
BECOME
SAFE
DEBT

MVV-12
SYNTHETIC
DATA
SUCCESS
DOES
NOT
AUTO-
BECOME
REAL
DATA
SUCCESS

MVV-13
MODEL
CAPABILITY
DOES
NOT
AUTO-
BECOME
SYSTEM
CAPABILITY

MVV-14
TOOL
AVAILABLE
DOES
NOT
AUTO-
BECOME
TOOL
AUTHORIZED

MVV-15
HUMAN
FALLBACK
DOES
NOT
AUTO-
BECOME
SCALABILITY
PROOF

MVV-16
MULTI-
TENANT
UI
DOES
NOT
AUTO-
BECOME
TENANT
ISOLATION
VERIFIED

MVV-17
MVP
TEMPORARY
STATUS
DOES
NOT
AUTO-
REMOVE
SECURITY
MINIMUMS

MVV-18
USER
LIKES
MVP
DOES
NOT
AUTO-
BECOME
WILLINGNESS
TO
PAY

MVV-19
ONE
PAID
MVP
DOES
NOT
AUTO-
BECOME
REPEATABLE
BUSINESS
MODEL

MVV-20
MVP
SUCCESS
DOES
NOT
AUTO-
BECOME
PRODUCT-
MARKET
FIT

MVV-21
GOOD
LATENCY
UNDER
SMALL
LOAD
DOES
NOT
AUTO-
BECOME
SCALABILITY
PROVEN

MVV-22
HIGH
USER
SATISFACTION
DOES
NOT
AUTO-
OVERRIDE
CRITICAL
TENANT /
SECURITY
FAILURE

MVV-23
MVP
HANDOFF
DOES
NOT
AUTO-
BECOME
PRODUCT
REQUIREMENT
APPROVAL

MVV-24
MVP
CODE
DOES
NOT
AUTO-
BECOME
PRODUCTION
CODE

MVV-25
CONTROLLED
MVP
PILOT
DOES
NOT
AUTO-
AUTHORIZE
PRODUCTION
MVP
CONTROL
PLANE
```

---

# 254. Negative Verification Scenarios

Containment, correction, invalidation, rollback, pivot or kill review should occur when:

* team begins coding before defining the problem hypothesis and expected learning.
* Founder requests a feature and team records the user problem as validated without user Evidence.
* one customer asks for a feature and MVP scope expands substantially without hypothesis impact review.
* MVP scope includes every planned Production feature because team wants to "avoid rebuilding later."
* team removes authentication because the product is "only an MVP" despite external user access.
* multi-Tenant UI is implemented over a shared unrestricted dataset and team labels Tenant isolation complete.
* real client Data is copied into MVP environment without scope/rights/privacy review.
* synthetic Data produces strong results and team claims real-world accuracy.
* Prompt Benchmark pass is presented as product validation.
* Agent successfully completes demo task and receives broader production-like Tool authority.
* side-effect Tool sends real customer email and no post-action verification exists.
* Human fallback performs most work but the MVP is described as fully autonomous.
* one successful demo is presented as reliability Evidence.
* positive interviews are counted while participants who abandoned the workflow are excluded.
* satisfaction score improves but core business outcome does not.
* a user says they would pay and sales forecast treats that as booked revenue.
* one paid design partner is presented as Product-Market Fit.
* cost calculation excludes Human review and Tool retries.
* latency measurement excludes retrieval and Tool execution.
* telemetry collects raw personal information unnecessary to the hypothesis.
* no telemetry error is logged and team assumes no error occurred.
* one Tenant leak is averaged into high overall task success and MVP remains green.
* Model version changes during experiment and results are combined as one stable MVP version.
* feature change is introduced halfway through experiment without versioning.
* test users are coached heavily but result is reported as natural workflow adoption.
* rollback command returns success but users still access the broken version.
* MVP code with known temporary architecture is copied directly into Production without Engineering review.
* MVP is shown to prospects and sales promises Production availability dates unsupported by readiness Evidence.
* MVP success is described as Product-Market Fit, scalability and Production readiness simultaneously.
* controlled MVP Pilot succeeds and system is labeled Production-authorized without separate approval.

---

# 255. MVP Verification Scenarios

Future implementation should test at least:

```text id="mvp240"
MVVS-01
PROBLEM
WITH
WEAK
EVIDENCE

MVVS-02
FOUNDER
IDEA
WITHOUT
USER
VALIDATION

MVVS-03
USER /
BUYER
MISMATCH

MVVS-04
FEATURE
REQUEST
SCOPE
CREEP

MVVS-05
MANUAL
BACKEND
SUCCESS

MVVS-06
SYNTHETIC
DATA
SUCCESS
VS
REAL
DATA

MVVS-07
MODEL
VERSION
CHANGE

MVVS-08
PROMPT
VERSION
CHANGE

MVVS-09
UNAUTHORIZED
TOOL
CALL

MVVS-10
TOOL
SUCCESS
WITHOUT
SIDE-
EFFECT
VERIFICATION

MVVS-11
HUMAN
FALLBACK
DEPENDENCY

MVVS-12
CROSS-
PROJECT
DATA
ACCESS

MVVS-13
CROSS-
TENANT
DATA
LEAK

MVVS-14
PROMPT
INJECTION
SIDE
EFFECT

MVVS-15
SECRET
EXPOSURE

MVVS-16
TELEMETRY
OVER-
COLLECTION

MVVS-17
GOOD
USABILITY
BUT
LOW
VALUE

MVVS-18
POSITIVE
STATED
PREFERENCE
BUT
LOW
ACTUAL
USE

MVVS-19
HIGH
SATISFACTION
BUT
NO
PAYMENT
SIGNAL

MVVS-20
LOW
TASK
COST
WITH
HIDDEN
HUMAN
COST

MVVS-21
MVP
VERSION
CHANGE
MID-
EXPERIMENT

MVVS-22
KILL
SWITCH
FAILURE

MVVS-23
ROLLBACK
NOT
ACTUALLY
APPLIED

MVVS-24
MVP
HANDOFF
WITH
UNRESOLVED
TECHNICAL
DEBT

MVVS-25
MVP
SUCCESS
MISREPRESENTED
AS
PRODUCTION
READINESS
```

---

# 256. Controlled MVP Pilot

A controlled MVP Pilot should prefer:

```text id="mvp241"
ONE
CLEAR
PROBLEM

ONE
PRIMARY
USER
POPULATION

ONE
PRIMARY
VALUE
HYPOTHESIS

ONE
MINIMUM
OUTCOME

LIMITED
SCOPE

EXPLICIT
NON-
GOALS

PINNED
MVP
VERSION

PINNED
MODEL /
PROMPT
VERSIONS
WHERE
PRACTICAL

LIMITED
TOOLS

MINIMUM
DATA

ONE
PROJECT

ONE
TENANT
OR
STRICTLY
ISOLATED
TENANTS

CONTROLLED
USER
EXPOSURE

TELEMETRY

HARD
GATES

KILL
SWITCH

ROLLBACK

HUMAN
FALLBACK
WHERE
NEEDED

MANUAL
DECISION

NO
AUTOMATIC
PRODUCTION
PROMOTION
```

---

# 257. Pilot Exit Criteria

Verify:

* MVP identity.
* Opportunity linkage.
* problem Evidence.
* user/buyer definition.
* hypotheses.
* minimum outcome.
* scope.
* non-goals.
* architecture.
* manual/simulated components.
* technical debt.
* Data rights and quality.
* Model version.
* Prompt version.
* Agent configuration.
* Tool permissions.
* Memory/Retrieval scope.
* Human fallback.
* authority.
* Project scope.
* Tenant scope.
* security.
* privacy.
* Responsible AI.
* accessibility.
* usability.
* technical feasibility.
* reliability.
* performance.
* cost.
* telemetry.
* experiment design.
* success/failure criteria.
* hard gates.
* Counter-Evidence.
* controlled exposure.
* kill switch.
* rollback.
* result integrity.
* continue/pivot/kill decision.
* handoff package.
* Runtime Truth.

---

# 258. Pilot Boundary

Permanent:

```text id="mvp242"
CONTROLLED
MVP
PILOT
SUCCESS
≠
PRODUCT-
MARKET
FIT

≠
SCALABILITY
PROVEN

≠
OPERATIONAL
READINESS

≠
PRODUCTION
AUTHORIZATION
```

---

# 259. Production-Scope Requirements

Before an MVP evolves toward Production, verify separately where applicable:

```text id="mvp243"
VALIDATED
PROBLEM

VALIDATED
TARGET
USER /
BUYER

PRODUCT
REQUIREMENTS

ARCHITECTURE
REVIEW

TECHNICAL
DEBT
DISPOSITION

DATA
GOVERNANCE

DATA
QUALITY

MODEL
EVALUATION

PROMPT
EVALUATION

AGENT
EVALUATION

TOOL
AUTHORITY

SIDE-
EFFECT
VERIFICATION

MEMORY /
RETRIEVAL
GOVERNANCE

AUTHENTICATION

AUTHORIZATION

PROJECT
ISOLATION

TENANT
ISOLATION

SECURITY
REVIEW

PRIVACY
REVIEW

RESPONSIBLE
AI
REVIEW

ACCESSIBILITY

RELIABILITY

SCALABILITY

PERFORMANCE

CAPACITY

COST /
UNIT
ECONOMICS

OBSERVABILITY

AUDIT

BACKUP /
RECOVERY

INCIDENT
RESPONSE

SUPPORT

OPERATING
MODEL

COMPLIANCE

COMMERCIALIZATION

PILOT
EVIDENCE
WHERE
REQUIRED

SEPARATE
PRODUCTION
READINESS
REVIEW

SEPARATE
PRODUCTION
AUTHORIZATION
```

---

# 260. Production Boundary

```text id="mvp244"
MVP
FRAMEWORK
VERIFIED

≠

MVP
PRODUCT
VALIDATED

≠

PRODUCT-
MARKET
FIT
VERIFIED

≠

PRODUCTION
READINESS
VERIFIED

≠

PRODUCTION
AUTHORIZED
```

---

# 261. MVP Maturity Model

Conceptual:

```text id="mvp245"
MVPM0
=
MVP
GUIDELINES
DOCUMENTED

MVPM1
=
MVP /
HYPOTHESIS /
SCOPE /
OUTCOME /
DECISION
MODELS
DEFINED

MVPM2
=
ARCHITECTURE /
DATA /
AI /
SECURITY /
PROJECT /
TENANT /
EXPERIMENT
CONTRACTS
DESIGNED

MVPM3
=
CONTROLLED
MVP
REGISTRY /
EXPERIMENT
WORKFLOW
IMPLEMENTED

MVPM4
=
MODEL /
PROMPT /
AGENT /
TOOL /
TELEMETRY /
USER
FEEDBACK
WORKFLOWS
INTEGRATED

MVPM5
=
PROJECT /
TENANT /
SECURITY /
PRIVACY /
HARD-
GATE /
ROLLBACK
CONTROLS
INTEGRATED

MVPM6
=
MONITORING /
AUDIT /
INCIDENT /
VERSION /
DECISION /
HANDOFF
CONTROLS
IMPLEMENTED

MVPM7
=
CRITICAL
TENANT /
SECURITY /
PRIVACY /
AUTHORITY /
SIDE-
EFFECT /
HALT
BOUNDARIES
VERIFIED

MVPM8
=
CONTROLLED
MVP
PILOT
VERIFIED

MVPM9
=
PRODUCTION-SCOPE
PRODUCT
SYSTEM
SEPARATELY
AUTHORIZED
AFTER
REQUIRED
READINESS
WORK
```

---

# 262. Maturity Boundary

Permanent:

```text id="mvp246"
MVPM8
≠
MVPM9
```

---

# 263. Repository Evidence

The established `prototypes/` sequence is:

```text id="mvp247"
doc/26-research-lab/prototypes/
├── mvp-guidelines.md
├── prototype-framework.md
└── prototype-validation.md
```

This document corresponds to the first established file in `prototypes/`.

---

# 264. Repository Save Boundary

This document is generated for:

```text id="mvp248"
doc/26-research-lab/prototypes/mvp-guidelines.md
```

Permanent:

```text id="mvp249"
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

# 265. Current Documentation Truth

```text id="mvp250"
RESEARCH_MVP_GUIDELINES_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 266. Current Runtime Truth

Nothing in this document independently proves implementation of MVP infrastructure, Product validation, Product-Market Fit, Pilot readiness or Production readiness.

```text id="mvp251"
MVP_REGISTRY
=
NOT_PROVEN

MVP_OPPORTUNITY_LINKAGE_RUNTIME
=
NOT_PROVEN

MVP_PROBLEM_EVIDENCE_RUNTIME
=
NOT_PROVEN

MVP_USER_POPULATION_RUNTIME
=
NOT_PROVEN

MVP_BUYER_RUNTIME
=
NOT_PROVEN

MVP_HYPOTHESIS_RUNTIME
=
NOT_PROVEN

MVP_MINIMUM_OUTCOME_RUNTIME
=
NOT_PROVEN

MVP_SCOPE_RUNTIME
=
NOT_PROVEN

MVP_NON_GOAL_RUNTIME
=
NOT_PROVEN

MVP_SCOPE_CREEP_CONTROL_RUNTIME
=
NOT_PROVEN

MVP_ARCHITECTURE_RUNTIME
=
NOT_PROVEN

MVP_BUILD_REUSE_RUNTIME
=
NOT_PROVEN

MVP_MANUAL_PROCESS_RUNTIME
=
NOT_PROVEN

MVP_SIMULATION_RUNTIME
=
NOT_PROVEN

MVP_TECHNICAL_DEBT_RUNTIME
=
NOT_PROVEN

MVP_DATA_GOVERNANCE_RUNTIME
=
NOT_PROVEN

MVP_DATA_QUALITY_RUNTIME
=
NOT_PROVEN

MVP_SYNTHETIC_DATA_RUNTIME
=
NOT_PROVEN

MVP_MODEL_SELECTION_RUNTIME
=
NOT_PROVEN

MVP_PROMPT_SELECTION_RUNTIME
=
NOT_PROVEN

MVP_AGENT_SELECTION_RUNTIME
=
NOT_PROVEN

MVP_MULTI_AGENT_RUNTIME
=
NOT_PROVEN

MVP_TOOL_SELECTION_RUNTIME
=
NOT_PROVEN

MVP_TOOL_AUTHORITY_RUNTIME
=
NOT_PROVEN

MVP_SIDE_EFFECT_VERIFICATION_RUNTIME
=
NOT_PROVEN

MVP_MEMORY_RUNTIME
=
NOT_PROVEN

MVP_RETRIEVAL_RUNTIME
=
NOT_PROVEN

MVP_HUMAN_FALLBACK_RUNTIME
=
NOT_PROVEN

MVP_AUTHORITY_RUNTIME
=
NOT_PROVEN

MVP_FOUNDER_APPROVAL_TRUTH_RUNTIME
=
NOT_PROVEN

MVP_PROJECT_SCOPE_RUNTIME
=
NOT_PROVEN

MVP_TENANT_SCOPE_RUNTIME
=
NOT_PROVEN

MVP_TENANT_ISOLATION_RUNTIME
=
NOT_PROVEN

MVP_SECURITY_RUNTIME
=
NOT_PROVEN

MVP_THREAT_MODEL_RUNTIME
=
NOT_PROVEN

MVP_PROMPT_INJECTION_RUNTIME
=
NOT_PROVEN

MVP_PRIVACY_RUNTIME
=
NOT_PROVEN

MVP_RESPONSIBLE_AI_RUNTIME
=
NOT_PROVEN

MVP_ACCESSIBILITY_RUNTIME
=
NOT_PROVEN

MVP_USABILITY_RUNTIME
=
NOT_PROVEN

MVP_DESIRABILITY_RUNTIME
=
NOT_PROVEN

MVP_WILLINGNESS_TO_PAY_RUNTIME
=
NOT_PROVEN

MVP_PRODUCT_MARKET_FIT_RUNTIME
=
NOT_PROVEN

MVP_TECHNICAL_FEASIBILITY_RUNTIME
=
NOT_PROVEN

MVP_RELIABILITY_RUNTIME
=
NOT_PROVEN

MVP_AVAILABILITY_RUNTIME
=
NOT_PROVEN

MVP_PERFORMANCE_RUNTIME
=
NOT_PROVEN

MVP_SCALABILITY_RUNTIME
=
NOT_PROVEN

MVP_COST_RUNTIME
=
NOT_PROVEN

MVP_UNIT_ECONOMICS_RUNTIME
=
NOT_PROVEN

MVP_TELEMETRY_RUNTIME
=
NOT_PROVEN

MVP_TELEMETRY_CONSENT_RUNTIME
=
NOT_PROVEN

MVP_EXPERIMENT_RUNTIME
=
NOT_PROVEN

MVP_SUCCESS_CRITERIA_RUNTIME
=
NOT_PROVEN

MVP_FAILURE_CRITERIA_RUNTIME
=
NOT_PROVEN

MVP_HARD_GATE_RUNTIME
=
NOT_PROVEN

MVP_COUNTER_EVIDENCE_RUNTIME
=
NOT_PROVEN

MVP_USER_FEEDBACK_RUNTIME
=
NOT_PROVEN

MVP_CONTROLLED_EXPOSURE_RUNTIME
=
NOT_PROVEN

MVP_ENVIRONMENT_RUNTIME
=
NOT_PROVEN

MVP_KILL_SWITCH_RUNTIME
=
NOT_PROVEN

MVP_ROLLBACK_RUNTIME
=
NOT_PROVEN

MVP_ITERATION_RUNTIME
=
NOT_PROVEN

MVP_VERSION_RUNTIME
=
NOT_PROVEN

MVP_DECISION_RUNTIME
=
NOT_PROVEN

MVP_PIVOT_RUNTIME
=
NOT_PROVEN

MVP_KILL_RUNTIME
=
NOT_PROVEN

MVP_PRODUCT_HANDOFF_RUNTIME
=
NOT_PROVEN

MVP_ENGINEERING_HANDOFF_RUNTIME
=
NOT_PROVEN

MVP_COMMERCIALIZATION_RUNTIME
=
NOT_PROVEN

MVP_OPERATIONAL_READINESS_RUNTIME
=
NOT_PROVEN

MVP_METRIC_RUNTIME
=
NOT_PROVEN

MVP_COHORT_RUNTIME
=
NOT_PROVEN

MVP_TAIL_FAILURE_RUNTIME
=
NOT_PROVEN

MVP_EVIDENCE_CONFIDENCE_RUNTIME
=
NOT_PROVEN

MVP_RESULT_INVALIDATION_RUNTIME
=
NOT_PROVEN

MVP_INCIDENT_RUNTIME
=
NOT_PROVEN

MVP_HALT_RUNTIME
=
NOT_PROVEN

MVP_RESUME_RUNTIME
=
NOT_PROVEN

MVP_TIMEBOX_RUNTIME
=
NOT_PROVEN

MVP_BUDGET_RUNTIME
=
NOT_PROVEN

MVP_PORTFOLIO_RUNTIME
=
NOT_PROVEN

MVP_DEPENDENCY_RUNTIME
=
NOT_PROVEN

MVP_OBSERVABILITY_RUNTIME
=
NOT_PROVEN

MVP_AUDIT_RUNTIME
=
NOT_PROVEN

MVP_MONITORING_RUNTIME
=
NOT_PROVEN

CONTROLLED_MVP_PILOT
=
NOT_PROVEN

PRODUCT_MARKET_FIT
=
NOT_DETERMINED_BY_THIS_DOCUMENT

SCALABILITY
=
NOT_PROVEN

OPERATIONAL_READINESS
=
NOT_PROVEN

PRODUCTION_READINESS
=
NOT_PROVEN

PRODUCTION_MVP_CONTROL_PLANE
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 267. Approval Truth

```text id="mvp252"
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

IMPLEMENTED
=
NOT_PROVEN

TESTED
=
NOT_PROVEN

VERIFIED
=
NOT_PROVEN

MVP
VALIDATED
=
NOT_PROVEN

PRODUCT-
MARKET
FIT
=
NOT_PROVEN

CONTROLLED
PILOT
=
NOT_PROVEN

PRODUCTION
READY
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 268. Production Hard Stops

Production transition should remain blocked where applicable if:

```text id="mvp253"
PROBLEM
VALIDATION
INSUFFICIENT

TARGET
USER
UNCLEAR

BUYER
UNCLEAR

CORE
HYPOTHESIS
UNCLEAR

MINIMUM
OUTCOME
UNCLEAR

MVP
SCOPE
UNCONTROLLED

NON-
GOALS
UNDEFINED

TECHNICAL
DEBT
UNASSESSED

DATA
RIGHTS
UNVERIFIED

DATA
QUALITY
UNVERIFIED

MODEL
QUALITY
UNVERIFIED

PROMPT
QUALITY
UNVERIFIED

AGENT
AUTHORITY
UNVERIFIED

TOOL
AUTHORITY
UNVERIFIED

SIDE-
EFFECT
VERIFICATION
UNVERIFIED

PROJECT
SCOPE
UNVERIFIED

TENANT
ISOLATION
UNVERIFIED

SECURITY
REVIEW
MISSING

PRIVACY
REVIEW
MISSING
WHERE
REQUIRED

RESPONSIBLE
AI
REVIEW
MISSING
WHERE
REQUIRED

CRITICAL
HARD
GATE
FAILED

RELIABILITY
UNVERIFIED

PERFORMANCE
UNVERIFIED

SCALABILITY
UNVERIFIED
WHERE
PRODUCTION
REQUIRES
IT

OBSERVABILITY
UNVERIFIED

INCIDENT
RESPONSE
UNVERIFIED

MVP
EVIDENCE
INVALID /
SUSPECT

PRODUCT
HANDOFF
INCOMPLETE

ENGINEERING
HANDOFF
INCOMPLETE

OPERATIONAL
READINESS
UNVERIFIED

CONTROLLED
PILOT
EVIDENCE
MISSING
WHERE
REQUIRED

SEPARATE
PRODUCTION
READINESS
REVIEW
MISSING

SEPARATE
PRODUCTION
AUTHORIZATION
MISSING
```

---

# 269. Permanent MVP Invariants

```text id="mvp254"
MVP
≠
PRODUCTION

MINIMUM
≠
CARELESS

VIABLE
≠
PRODUCTION-
READY

MVP
≠
HALF-
FINISHED
PRODUCT

PROTOTYPE
≠
MVP

PROTOTYPE
SUCCESS
≠
MVP
VALIDATION

POC
SUCCESS
≠
PRODUCT
VIABILITY

TECHNICAL
FEASIBILITY
≠
PRODUCT
VIABILITY

DEMO
QUALITY
≠
USER
VALUE

MVP
≠
PILOT

PILOT
≠
PRODUCTION

BETA
≠
COMPLIANCE
EXEMPTION

MVP
REAL-
USER
ACCESS
≠
PRODUCTION
AUTHORIZATION

MVP
ID
≠
APPROVAL

OPPORTUNITY
IDENTIFIED
≠
OPPORTUNITY
VALIDATED

ONE
USER
COMPLAINT
≠
MARKET
PROBLEM

FOUNDER
IDEA
≠
USER
PROBLEM
VALIDATED

USER
≠
BUYER

BUYER
≠
APPROVER

MVP
USERS
≠
REPRESENTATIVE
MARKET

HYPOTHESIS
DOCUMENTED
≠
HYPOTHESIS
TRUE

FEATURE
EXISTS
≠
USER
OUTCOME

FEATURE
REQUEST
≠
MVP
MUST-
HAVE

NON-
GOAL
≠
SECURITY
EXEMPTION

SMALL
SCOPE
≠
UNCONTROLLED
SCOPE

MVP
ARCHITECTURE
≠
THROWAWAY
CHAOS

MVP
ARCHITECTURE
WORKS
≠
SCALABLE
ARCHITECTURE

FASTEST
TO
BUILD
≠
FASTEST
TO
VALID
LEARNING

MANUAL
VALUE
VALIDATION
≠
AUTOMATION
VALIDATION

SIMULATED
AUTOMATION
≠
REAL
AUTOMATION
VALIDATION

TECHNICAL
DEBT
DOCUMENTED
≠
TECHNICAL
DEBT
SAFE

MVP
≠
DATA
GOVERNANCE
EXEMPTION

SYNTHETIC
DATA
SUCCESS
≠
REAL
DATA
SUCCESS

MODEL
CAPABILITY
≠
MVP
SYSTEM
CAPABILITY

PROMPT
BENCHMARK
PASS
≠
PRODUCT
VALIDATION

AGENT
TASK
SUCCESS
≠
UNBOUNDED
AGENT
AUTHORITY

MORE
AGENTS
≠
BETTER
MVP

TOOL
AVAILABLE
≠
TOOL
AUTHORIZED

MVP
LEARNING
GOAL
≠
UNBOUNDED
SIDE-
EFFECT
AUTHORITY

MEMORY
AVAILABLE
≠
MEMORY
AUTHORIZED /
CURRENT

RELEVANT
DOCUMENT
≠
AUTHORIZED
DOCUMENT

HUMAN
FALLBACK
≠
SCALABILITY
PROOF

HUMAN
REVIEW
≠
ERROR-
FREE

MVP
OWNER
≠
UNLIMITED
ENTERPRISE
AUTHORITY

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

PROJECT A
MVP
VALIDATION
≠
PROJECT B
MVP
VALIDATION

MULTI-
TENANT
UI
≠
TENANT
ISOLATION

MVP
TEMPORARY
≠
SECURITY
OPTIONAL

PROMPT-
ONLY
INJECTION
DEFENSE
≠
INJECTION
SOLVED

MVP
EXPERIMENT
≠
UNLIMITED
DATA
COLLECTION

INNOVATIVE
≠
RESPONSIBLE

MVP
LABEL
≠
RISK
REDUCTION

EARLY
PRODUCT
≠
ACCESSIBILITY
IRRELEVANT

EASY
TO
USE
≠
VALUABLE

USER
LIKES
DEMO
≠
USER
ADOPTS

"I
WOULD
PAY"
≠
PAYMENT
BEHAVIOR

MVP
SUCCESS
≠
PRODUCT-
MARKET
FIT

ONE
CUSTOMER
SUCCESS
≠
MARKET
VALIDATION

TECHNICALLY
FEASIBLE
≠
ECONOMICALLY
VIABLE

DEMO
SUCCESS
≠
RELIABILITY

LIMITED
MVP
AVAILABILITY
≠
PRODUCTION
AVAILABILITY

LOW
LOAD
PERFORMANCE
≠
SCALABILITY

MVP
SUCCESS
≠
SCALABILITY
PROVEN

LOW
MVP
COST
≠
SUSTAINABLE
UNIT
ECONOMICS

ESTIMATED
UNIT
ECONOMICS
≠
PROVEN
UNIT
ECONOMICS

CAN
LOG
≠
AUTHORIZED
TO
LOG
EVERYTHING

NO
ERROR
EVENT
≠
NO
ERROR

MVP
BUILT
≠
EXPERIMENT
VALID

SUCCESS
METRIC
PASS
≠
ALL
HYPOTHESES
VALIDATED

HIGH
USER
SATISFACTION
≠
HARD
GATE
OVERRIDE

POSITIVE
CASES
≠
NEGATIVE
CASES
IRRELEVANT

USER
FEEDBACK
≠
GROUND
TRUTH

STATED
USEFULNESS
≠
OBSERVED
USE

SATISFACTION
≠
RETENTION

RETENTION
≠
WILLINGNESS
TO
PAY

WILLINGNESS
TO
PAY
≠
PRODUCT-
MARKET
FIT

REAL
USER
ACCESS
≠
PUBLIC
PRODUCTION
LAUNCH

MVP
ENVIRONMENT
≠
PRODUCTION
ENVIRONMENT

KILL
SWITCH
EXISTS
≠
KILL
SWITCH
VERIFIED

ROLLBACK
REQUEST
≠
ROLLBACK
VERIFIED

MORE
ITERATIONS
≠
MORE
VALIDATION

VERSION 1
EVIDENCE
≠
VERSION 2
EVIDENCE

CONTINUE
DECISION
≠
PRODUCTION
AUTHORIZATION

PIVOT
≠
FAILURE
AUTOMATICALLY

KILL
MVP
≠
DELETE
RESEARCH
EVIDENCE

MVP
HANDOFF
≠
PRODUCT
REQUIREMENT
APPROVED

MVP
CODE
≠
PRODUCTION
CODE

MVP
VALUE
SIGNAL
≠
COMMERCIAL
LAUNCH

ONE
PAID
MVP
≠
REPEATABLE
BUSINESS
MODEL

SALES
DEMO
AUTHORITY
≠
AUTHORITY
TO
PROMISE
PRODUCTION
CAPABILITY

MVP
OPERATES
FOR
TEST
USERS
≠
OPERATIONAL
READINESS

MVP
VALIDATION
≠
PRODUCTION
READINESS

MVP
EVIDENCE
≠
PRODUCT-
MARKET
FIT
PROOF

METRIC
IMPROVEMENT
≠
MVP
VALIDATED

HIGH
ACTIVITY
≠
HIGH
VALUE

AVERAGE
GOOD
≠
EVERY
COHORT
GOOD

MORE
EVIDENCE
≠
STRONGER
EVIDENCE
AUTOMATICALLY

HIGH
CONFIDENCE
IN
DEFINED
SCOPE
≠
UNIVERSAL
VALIDITY

RESULT
INVALID
≠
IDEA
FALSE

HALT
REQUEST
≠
HALT
VERIFIED

MVP
UNDER
BUDGET
≠
MVP
SUCCESS

MORE
MVPs
≠
MORE
INNOVATION

DEPENDENCY
AVAILABLE
TODAY
≠
DEPENDENCY
STABLE
FOREVER

VENDOR
WORKS
FOR
MVP
≠
VENDOR
SUITABLE
FOR
PRODUCTION

TEMPORARY
LOCK-
IN
≠
LONG-
TERM
LOCK-
IN
APPROVAL

LOGS
EXIST
≠
OBSERVABILITY
SUFFICIENT

AUDIT
EVENT
≠
ACTION
AUTHORIZED

NO
MVP
ALERT
≠
NO
MVP
RISK

A/B
WINNER
≠
UNIVERSALLY
BETTER

SEGMENT A
SUCCESS
≠
SEGMENT B
SUCCESS

REGION A
SUCCESS
≠
REGION B
SUCCESS

ENGLISH
MVP
≠
MULTILINGUAL
MVP
VALIDATED

TEXT
FLOW
≠
MULTIMODAL
FLOW

WEB
MVP
≠
MOBILE
VALIDATION

MOCKED
INTEGRATION
≠
REAL
INTEGRATION

TEST
LOAD
≠
PRODUCTION
LOAD

MVP
≠
COMPLIANCE
EXEMPTION

PUBLIC
DEMO
READY
≠
IP
DISCLOSURE
AUTHORIZED

TEMPORARY
CODE
≠
OPEN-
SOURCE
AUTHORIZED

CONTROLLED
MVP
PILOT
≠
PRODUCT-
MARKET
FIT

CONTROLLED
MVP
PILOT
≠
PRODUCTION
READINESS

MVPM8
≠
MVPM9

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

# 270. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="mvp255"
## RESEARCH-LAB-CHG-20260814-077 — MVP Guidelines Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-14 |
| Change Type | `CREATED`, `PROTOTYPES`, `MVP`, `PRODUCT-VALIDATION`, `EXPERIMENTATION`, `AI-SYSTEMS`, `PROJECT-SCOPE`, `TENANT-SCOPE`, `SECURITY`, `PRIVACY`, `PRODUCT-HANDOFF`, `RUNTIME-TRUTH` |
| Impact | `I5 — Minimum Viable Product Learning, Scope, Validation and Product Transfer Foundation` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Founder Approved | `NO EVIDENCE` |
| Canonical | `NO` |
| Product-Market Fit | `NOT PROVEN` |
| Production Readiness | `NOT PROVEN` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/prototypes/mvp-guidelines.md`

### Documentation Truth

`RESEARCH_MVP_GUIDELINES_FRAMEWORK = CONTENT_COMPLETE_FOR_REVIEW`

### Prototypes Folder Truth

`PROTOTYPES_VISIBLE_FILES = 1 / 3 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`MVP_RUNTIME = NOT_PROVEN`

### Product Truth

`PRODUCT_MARKET_FIT = NOT_DETERMINED_BY_THIS_DOCUMENT`

### Production Truth

`PRODUCTION_MVP_CONTROL_PLANE = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 271. Final MVP Rule

The Mianx.ai MVP framework should operate conceptually as:

```text id="mvp256"
OPPORTUNITY /
PROBLEM

↓

USER /
BUYER
EVIDENCE

↓

EXPLICIT
HYPOTHESIS

↓

MINIMUM
OUTCOME

↓

BOUNDED
MVP
SCOPE

↓

ARCHITECTURE /
DATA /
MODEL /
PROMPT /
AGENT /
TOOL
DESIGN

↓

SECURITY /
PRIVACY /
RESPONSIBLE
AI /
PROJECT /
TENANT
GATES

↓

CONTROLLED
BUILD

↓

INTERNAL
VALIDATION

↓

CONTROLLED
USER
EXPOSURE

↓

TELEMETRY /
OBSERVATION /
FEEDBACK

↓

EVIDENCE /
COUNTER-
EVIDENCE

↓

KILL /
PIVOT /
CONTINUE

↓

PRODUCT /
ENGINEERING
HANDOFF

↓

CONTROLLED
PILOT
WHERE
REQUIRED

↓

SEPARATE
PRODUCTION
READINESS

↓

SEPARATE
PRODUCTION
AUTHORIZATION
```

while permanently preserving:

```text id="mvp257"
MVP
≠
PROTOTYPE

MVP
≠
POC

MVP
≠
PILOT

MVP
≠
PRODUCTION

MINIMUM
≠
INCOMPLETE
WITHOUT
DISCIPLINE

VIABLE
≠
DESIRABLE

USER
INTEREST
≠
WILLINGNESS
TO
PAY

FEATURE
REQUEST
≠
VALIDATED
REQUIREMENT

PROTOTYPE
SUCCESS
≠
PRODUCT
VALIDATION

MVP
USAGE
≠
PRODUCT-
MARKET
FIT

PILOT
SUCCESS
≠
PRODUCTION
AUTHORIZATION

TECHNICAL
FEASIBILITY
≠
COMMERCIAL
VIABILITY

ARCHITECTURE
SHORTCUT
≠
PERMANENT
ARCHITECTURE

TEMPORARY
TECHNICAL
DEBT
≠
UNCONTROLLED
DEBT

MODEL
CAPABILITY
≠
SYSTEM
RELIABILITY

PROMPT
SUCCESS
≠
AGENT
SAFETY

TOOL
AVAILABILITY
≠
TOOL
AUTHORITY

TENANT
CONFIGURATION
≠
CROSS-
TENANT
REUSE
AUTHORITY

TELEMETRY
CAPABILITY
≠
CONSENT

METRICS
≠
TRUTH

AVERAGE
SUCCESS
≠
CRITICAL-
TAIL
SAFETY

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

DOCUMENTATION
≠
IMPLEMENTATION

IMPLEMENTATION
≠
VERIFICATION

VERIFICATION
≠
PRODUCTION
AUTHORIZATION
```

---

# 272. Next Document

The established `prototypes/` sequence is:

```text id="mvp258"
1. mvp-guidelines.md
2. prototype-framework.md
3. prototype-validation.md
```

`mvp-guidelines.md` is now content-complete for review in this documentation workflow.

The next verified document should define the complete **Prototype Framework**, including Prototype purpose and classification, exploratory versus evolutionary versus disposable prototypes, concept/model/workflow/interface/technical/AI/Agent/Multi-Agent/Data/Integration/architecture prototypes, fidelity levels, Prototype identity/versioning, Research Question and hypothesis linkage, simulation versus real behavior, fake/manual/mock boundaries, design artifacts, implementation boundaries, sandboxing, Data and Dataset controls, Model/Prompt/Agent/Tool configuration, Project/Tenant isolation, security/privacy/Responsible AI, user Research integration, technical experiments, evaluation criteria, reproducibility, Prototype environment, dependencies, technical debt, source-code handling, prototype-to-MVP transfer, prototype-to-Product transfer, discard/archive rules, IP/publication review, controlled demonstrations, monitoring, incidents, HALT/Resume, maturity and Runtime Truth.

## NEXT DOCUMENT

```text id="mvp259"
doc/26-research-lab/prototypes/prototype-framework.md
```

---
