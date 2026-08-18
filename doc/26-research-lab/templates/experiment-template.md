---

id: RESEARCH-LAB-TEMPLATES-EXPERIMENT-TEMPLATE-001
title: Mianx.ai Research Lab Templates — Experiment Template
version: 1.0.0
status: Draft

description: Enterprise-grade reusable Experiment documentation template for the Mianx.ai Research Lab. This template standardizes how Mianx.ai should define, authorize, configure, execute, observe, analyze, challenge, reproduce, replicate, review, archive and revalidate Research Experiments involving Models, Prompts, Agents, Multi-Agent systems, Tools, Memory, Retrieval, Automation, Data, Datasets, Architecture, infrastructure, security, user behavior, market hypotheses, Product concepts, prototypes and Industry Operating System capabilities. It establishes Experiment identities and versions; Research Questions; falsifiable hypotheses; null hypotheses; objectives; scope and non-goals; Project and Tenant boundaries; risk and autonomy classifications; Research authorization; independent and dependent variables; controls; treatment groups; baselines; comparators; confounders; randomization; blocking; stratification; blinding; sample and coverage planning; Dataset provenance; Data rights; environment identity; configuration pinning; Model, Prompt, Agent, Tool, Memory and Retrieval versions; Experiment protocol; pre-registration; change control; repeated trials; stochastic controls; intervention records; observations; raw Evidence; metrics; scoring; statistical methods; uncertainty; effect size; subgroup and tail analysis; Counter-Evidence; negative and null results; causal inference limitations; reproducibility; replication; validity threats; deviations; incidents; security; privacy; Responsible AI; Prompt Injection; Authority Injection; Tool side effects; Project and Tenant isolation; Human participant considerations; cost and resource controls; HALT and Resume; conclusions; decision boundaries; Knowledge Transfer; downstream Benchmark, Prototype, Product, Architecture and Engineering handoff; monitoring; revalidation; controlled Pilot; maturity; Runtime Truth and Production authorization boundaries. It permanently separates Experiment from proof, hypothesis support from universal truth, correlation from causation, statistical significance from practical significance, one successful run from reliability, Experiment completion from validation, Experiment result from Production behavior, Experiment success from Product-Market Fit, Prototype readiness, Pilot authorization or Production authorization, Tool success from side-effect verification, Tenant labeling from Tenant isolation, Human or Agent consensus from correctness, Founder routing from Founder approval, silence from approval, generated documentation from filesystem save, documented from implemented, implemented from tested/verified, and verified from Production authorization.

type: Research Experiment Documentation Template, Experimental Protocol Template, Hypothesis and Variable Template, AI and Agent Experiment Template, Experiment Evidence Record Template, Reproducibility and Replication Template, Research Governance Template, Runtime Truth Boundary, and Controlled Experiment Pilot Boundary

class: Reusable Research documentation template defining what a governed Mianx.ai Experiment record should contain without asserting that an Experiment engine, Research orchestration service, automatic randomization service, statistical analysis platform, Experiment registry, autonomous Experiment execution system or Production Research Experiment control plane is currently implemented

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Templates
specialization: Experiment Template

parent: doc/26-research-lab/templates
path: doc/26-research-lab/templates/experiment-template.md

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
* Experiment Governance
* Research Methodology Governance
* Research Architecture Governance
* Data Governance
* Dataset Governance
* Model Governance
* Prompt Governance
* Agent Governance
* Multi-Agent Governance
* Tool Governance
* Memory Governance
* Automation Governance
* Security Governance
* Privacy Governance
* Responsible AI Governance
* Legal Governance
* Project Governance
* Tenant Governance
* Verification Governance
* Monitoring Governance
* Audit Governance
* Documentation Governance

maintainers:

* Research Lab
* Experimentation Team
* Research Scientists
* Research Engineers
* AI Research Team
* Model Research Team
* Prompt Research Team
* Agent Research Team
* Multi-Agent Research Team
* Data Research Team
* Security Research
* Verification Engineering
* Research Operations
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Research Governance
* Experiment Governance
* Research Methodology Governance
* Architecture Governance
* Security Governance
* Data Governance
* Privacy Governance
* Responsible AI Governance
* Legal Governance
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
* Research Leaders
* Research Scientists
* Research Engineers
* AI Researchers
* Model Researchers
* Prompt Researchers
* Agent Researchers
* Multi-Agent Researchers
* Data Researchers
* Security Researchers
* Product Researchers
* Architecture Researchers
* Verification Engineers
* Project Leaders
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
* ../experiments/experiment-design.md
* ../experiments/experiment-results.md
* ../experiments/experiment-tracking.md
* ../datasets/data-quality.md
* ../datasets/dataset-catalog.md
* ../datasets/dataset-governance.md
* ../ethics/ai-ethics.md
* ../ethics/bias-evaluation.md
* ../ethics/responsible-ai.md
* ../benchmarking/benchmark-suite.md
* ../model-evaluation/evaluation-framework.md
* ../monitoring/audit-logs.md
* ../monitoring/research-monitoring.md
* ../prompt-research/prompt-benchmarks.md
* ../prototypes/prototype-framework.md
* ../security/access-control.md
* ../security/data-protection.md
* ../security/research-security.md
* ../simulations/simulation-framework.md
* ../simulations/test-environments.md
* ./benchmark-template.md

related_documents:

* ./publication-template.md
* ./research-template.md
* ../CHANGELOG.md

## canonical: false

# Mianx.ai Research Lab Templates — Experiment Template

> **Purpose:** Use this file as the standard starting structure for a governed Mianx.ai Research Experiment.
>
> Replace every required placeholder before formal review.
>
> Recommended placeholder convention:
>
> ```text id="et001"
> [REQUIRED: value]
>
> [OPTIONAL: value]
>
> [NOT APPLICABLE: reason]
>
> [UNKNOWN: Evidence gap]
> ```
>
> Permanent:
>
> ```text id="et002"
> EXPERIMENT
> ≠
> PROOF
>
> EXPERIMENT
> SUCCESS
> ≠
> PRODUCTION
> AUTHORIZATION
> ```

---

# 1. Template Usage Rules

Before using this template:

1. Copy it to the appropriate Experiment record location.
2. Assign a stable Experiment ID.
3. assign an Experiment version.
4. define the Research Question before interpreting results.
5. define hypotheses before observing outcome where practical.
6. define scope and non-goals.
7. define Project and Tenant boundaries.
8. establish required Research authorization.
9. identify Data, Dataset, Model, Prompt, Agent, Tool and environment versions.
10. define variables and controls.
11. predefine primary metrics where practical.
12. preserve negative and null results.
13. record every material protocol deviation.
14. preserve raw Evidence.
15. avoid retroactively rewriting hypotheses to match results.
16. avoid inventing missing measurements.
17. preserve all applicable security, privacy, Responsible AI and authority boundaries.
18. separate Experiment conclusions from downstream adoption or Production decisions.

Permanent:

```text id="et003"
MISSING
EVIDENCE

MUST
REMAIN

MISSING
EVIDENCE
```

---

# 2. Experiment Front Matter Template

```yaml id="et004"
---
id: [REQUIRED: EXPERIMENT-ID]
title: [REQUIRED: Experiment title]
version: [REQUIRED]
status: Draft

experiment_type: [REQUIRED]
experiment_class: [REQUIRED]

research_question_refs:
  - [REQUIRED]

hypothesis_refs:
  - [REQUIRED where applicable]

project_scope_refs:
  - [REQUIRED]

tenant_scope_refs:
  - [REQUIRED or NOT APPLICABLE]

environment_ref: [REQUIRED]

dataset_refs:
  - [REQUIRED where applicable]

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

baseline_refs:
  - [REQUIRED where comparative]

authorization_refs:
  - [REQUIRED]

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

# 3. Experiment Identity

## 3.1 Experiment ID

```text id="et005"
[REQUIRED: EXP-XXXXXX]
```

## 3.2 Experiment Version

```text id="et006"
[REQUIRED]
```

## 3.3 Experiment Title

```text id="et007"
[REQUIRED]
```

## 3.4 Owner

```text id="et008"
[REQUIRED]
```

## 3.5 Experiment Status

Select one:

```text id="et009"
DRAFT

TRIAGE

PLANNING

AWAITING
AUTHORIZATION

AUTHORIZED

READY

RUNNING

PAUSED

HALTED

COMPLETED

UNDER
ANALYSIS

UNDER
REVIEW

VALIDATED
FOR
DEFINED
SCOPE

INCONCLUSIVE

INVALIDATED

SUPERSEDED

ARCHIVED
```

Permanent:

```text id="et010"
EXPERIMENT
COMPLETED
≠
EXPERIMENT
VALIDATED
```

---

# 4. Executive Summary

## 4.1 Experiment Purpose

[REQUIRED: concise description.]

## 4.2 Decision Supported

[REQUIRED]

Examples:

* whether to continue Research.
* whether to run a Benchmark.
* whether to create a Prototype.
* whether a technology hypothesis warrants deeper assessment.
* whether a Prompt or Model configuration warrants further evaluation.
* whether an Agent design should proceed to validation.
* whether an Architecture hypothesis merits Prototype work.

## 4.3 What This Experiment Does Not Authorize

[REQUIRED]

Recommended:

```text id="et011"
THIS
EXPERIMENT
DOES
NOT
BY
ITSELF
AUTHORIZE:

PRODUCTION
DEPLOYMENT

ARCHITECTURE
MIGRATION

MODEL
PROMOTION

AGENT
AUTONOMY
INCREASE

TOOL
WRITE
ACCESS

CUSTOMER
ROLLOUT

PILOT
ROLLOUT
```

---

# 5. Experiment Objective

## 5.1 Primary Objective

[REQUIRED]

## 5.2 Secondary Objectives

[OPTIONAL]

## 5.3 Non-Objectives

[REQUIRED]

---

# 6. Research Question

## 6.1 Primary Research Question

```text id="et012"
RQ:
[REQUIRED: precise Research Question]
```

## 6.2 Secondary Questions

```text id="et013"
RQ2:
[OPTIONAL]

RQ3:
[OPTIONAL]
```

## 6.3 Question Quality Checks

The Research Question should be:

* specific.
* bounded.
* answerable by the chosen method.
* neutral where possible.
* not structured only to justify a preferred outcome.
* tied to a real uncertainty.

Permanent:

```text id="et014"
LEADING
QUESTION
≠
NEUTRAL
RESEARCH
QUESTION
```

---

# 7. Hypothesis

## 7.1 Primary Hypothesis

```text id="et015"
H1:
[REQUIRED where applicable]
```

## 7.2 Null Hypothesis

```text id="et016"
H0:
[OPTIONAL or REQUIRED where method needs one]
```

## 7.3 Alternative Hypotheses

```text id="et017"
H2:
[OPTIONAL]

H3:
[OPTIONAL]
```

## 7.4 Hypothesis Falsifiability

Describe what result would count against the hypothesis.

```text id="et018"
[REQUIRED]
```

Permanent:

```text id="et019"
HYPOTHESIS
SUPPORTED
≠
HYPOTHESIS
PROVEN
```

---

# 8. Pre-Registration

Where practical, record before Experiment execution:

* Research Question.
* hypotheses.
* primary metrics.
* treatment.
* control.
* sample/coverage approach.
* exclusions.
* analysis method.
* stopping conditions.
* hard gates.

Pre-registration reference:

```text id="et020"
[OPTIONAL / REQUIRED where governed]
```

Permanent:

```text id="et021"
POST-
HOC
HYPOTHESIS
≠
PRE-
REGISTERED
HYPOTHESIS
```

---

# 9. Experiment Scope

## 9.1 In Scope

* [REQUIRED]
* [REQUIRED]

## 9.2 Out of Scope

* [REQUIRED]
* [REQUIRED]

## 9.3 Project Scope

```text id="et022"
[REQUIRED]
```

## 9.4 Tenant Scope

```text id="et023"
[REQUIRED or NOT APPLICABLE]
```

## 9.5 Environment Scope

```text id="et024"
[REQUIRED]
```

Permanent:

```text id="et025"
EXPERIMENT
CONCLUSION
MUST
NOT
EXCEED
EXPERIMENT
SCOPE
```

---

# 10. Experiment Type

Select or extend:

```text id="et026"
ET01
CONTROLLED
COMPARISON

ET02
A/B
EXPERIMENT

ET03
FACTORIAL

ET04
ABLATION

ET05
MODEL
EXPERIMENT

ET06
PROMPT
EXPERIMENT

ET07
AGENT
EXPERIMENT

ET08
MULTI-
AGENT
EXPERIMENT

ET09
TOOL
EXPERIMENT

ET10
MEMORY /
RAG
EXPERIMENT

ET11
ARCHITECTURE
EXPERIMENT

ET12
PERFORMANCE
EXPERIMENT

ET13
SECURITY
EXPERIMENT

ET14
BEHAVIORAL
EXPERIMENT

ET15
PRODUCT
RESEARCH
EXPERIMENT

ET16
EXPLORATORY
EXPERIMENT
```

Selected:

```text id="et027"
[REQUIRED]
```

---

# 11. Experiment Class

Potential:

```text id="et028"
EXPLORATORY

CONFIRMATORY

COMPARATIVE

CAUSAL

MECHANISTIC

REPLICATION

VALIDATION

FAILURE
INJECTION
```

Selected:

```text id="et029"
[REQUIRED]
```

---

# 12. Experiment Lifecycle

Recommended:

```text id="et030"
QUESTION

↓

HYPOTHESIS

↓

SCOPE

↓

AUTHORIZATION

↓

METHOD

↓

VARIABLES

↓

CONTROLS

↓

INPUTS

↓

ENVIRONMENT

↓

PRE-
RUN
CHECK

↓

EXECUTION

↓

OBSERVATION

↓

EVIDENCE

↓

ANALYSIS

↓

CHALLENGE

↓

CONCLUSION

↓

REVIEW

↓

TRANSFER /
ARCHIVE /
REVALIDATE
```

---

# 13. Research Authorization

Record:

```yaml id="et031"
experiment_authorization:
  authorization_id: [REQUIRED]

  experiment_ref: [REQUIRED]

  authorized_scope: [REQUIRED]

  project_scope_refs:
    - [REQUIRED]

  tenant_scope_refs:
    - [REQUIRED or NOT APPLICABLE]

  data_scope_refs:
    - [REQUIRED]

  environment_scope_refs:
    - [REQUIRED]

  autonomy_class: [REQUIRED]
  risk_class: [REQUIRED]

  authority_ref: [REQUIRED]

  status: [REQUIRED]
```

Permanent:

```text id="et032"
EXPERIMENT
PLANNED
≠
EXPERIMENT
AUTHORIZED
```

---

# 14. Risk Classification

Use the applicable Research Governance model.

Potential conceptual classes:

```text id="et033"
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

```text id="et034"
[REQUIRED]
```

---

# 15. Autonomy Classification

Where AI Agents are executing Experiment tasks, record the applicable autonomy class.

```text id="et035"
[REQUIRED where applicable]
```

Permanent:

```text id="et036"
AGENT
CAPABILITY
≠
AGENT
AUTHORITY
```

---

# 16. Experiment Design

Describe the design.

[REQUIRED]

Include where applicable:

* treatment.
* control.
* baseline.
* comparator.
* randomization.
* blocking.
* stratification.
* repeated trials.
* time effects.
* carryover effects.
* washout/reset.
* blinding.
* evaluator independence.

---

# 17. Independent Variable

```yaml id="et037"
independent_variable:
  variable_id: [REQUIRED]
  name: [REQUIRED]
  definition: [REQUIRED]
  levels:
    - [REQUIRED]
  manipulation_method: [REQUIRED]
```

---

# 18. Dependent Variable

```yaml id="et038"
dependent_variable:
  variable_id: [REQUIRED]
  name: [REQUIRED]
  definition: [REQUIRED]
  measurement_method: [REQUIRED]
  unit: [REQUIRED]
```

---

# 19. Controlled Variables

Document variables intended to remain stable:

| Variable   | Controlled Value | Why Controlled | Verification |
| ---------- | ---------------- | -------------- | ------------ |
| [REQUIRED] | [REQUIRED]       | [REQUIRED]     | [REQUIRED]   |

---

# 20. Confounders

Potential confounders:

```text id="et039"
MODEL
VERSION

PROMPT
VERSION

DATASET
SHIFT

ENVIRONMENT

HARDWARE

NETWORK

TOOL
AVAILABILITY

CONCURRENCY

USER
MIX

TIME

RETRY
BEHAVIOR
```

Known confounders:

```text id="et040"
[REQUIRED]
```

---

# 21. Confounding Boundary

Permanent:

```text id="et041"
OBSERVED
DIFFERENCE
≠
TREATMENT
EFFECT
IF
MATERIAL
CONFOUNDERS
REMAIN
UNCONTROLLED
```

---

# 22. Treatment Group

```yaml id="et042"
treatment_group:
  group_id: [REQUIRED]
  treatment: [REQUIRED]
  configuration_ref: [REQUIRED]
  sample_ref: [REQUIRED]
```

---

# 23. Control Group

```yaml id="et043"
control_group:
  group_id: [REQUIRED]
  control_condition: [REQUIRED]
  configuration_ref: [REQUIRED]
  sample_ref: [REQUIRED]
```

If no control is appropriate, explain why.

---

# 24. Baseline

Baseline ID:

```text id="et044"
[REQUIRED where comparative]
```

Baseline description:

[REQUIRED where comparative]

Permanent:

```text id="et045"
NO
BASELINE
≠
IMPROVEMENT
QUANTIFIED
```

---

# 25. Comparators

| Comparator                  | Version | Rationale | Configuration Ref |
| --------------------------- | ------- | --------- | ----------------- |
| [REQUIRED where applicable] | [ ]     | [ ]       | [ ]               |

---

# 26. Randomization

If randomization is used:

```text id="et046"
METHOD:
[REQUIRED]

UNIT
OF
RANDOMIZATION:
[REQUIRED]

SEED:
[OPTIONAL]

BALANCE
CHECK:
[REQUIRED]
```

---

# 27. Randomization Boundary

```text id="et047"
RANDOM
ASSIGNMENT
REQUESTED
≠
RANDOMIZATION
CORRECTLY
EXECUTED
UNTIL
VERIFIED
```

---

# 28. Stratification

Where relevant, stratify by:

* Project.
* Tenant.
* user class.
* workload class.
* language.
* region.
* Dataset category.
* complexity.
* safety risk.

---

# 29. Blocking

Document blocking factors where used.

```text id="et048"
[OPTIONAL]
```

---

# 30. Blinding

Potential:

```text id="et049"
NO
BLINDING

SINGLE
BLIND

DOUBLE
BLIND

EVALUATOR
BLIND

ANALYST
BLIND
```

Selected:

```text id="et050"
[REQUIRED where applicable]
```

---

# 31. Sample or Coverage Plan

## 31.1 Unit of Analysis

```text id="et051"
[REQUIRED]
```

## 31.2 Sample Size

```text id="et052"
[REQUIRED: size or justified method]
```

## 31.3 Sample Rationale

[REQUIRED]

Do not invent a universal minimum.

---

# 32. Coverage

Potential dimensions:

```text id="et053"
COMMON
CASES

RARE
CASES

EDGE
CASES

BOUNDARY
CASES

FAILURE
CASES

ADVERSARIAL
CASES

SUBGROUPS

TAIL
CASES
```

Coverage plan:

[REQUIRED]

---

# 33. Sample Boundary

```text id="et054"
LARGE
SAMPLE
≠
REPRESENTATIVE
SAMPLE
```

---

# 34. Dataset Identity

```text id="et055"
[REQUIRED where Data is used]
```

---

# 35. Dataset Version

```text id="et056"
[REQUIRED]
```

---

# 36. Dataset Provenance

Record:

* source.
* owner.
* collection method.
* version.
* authorization.
* transformation.
* labels.
* known limitations.
* Project scope.
* Tenant scope.

---

# 37. Dataset Rights

```text id="et057"
[REQUIRED: license / authorization / permitted Research use]
```

Permanent:

```text id="et058"
DATA
AVAILABLE
≠
DATA
AUTHORIZED
FOR
EXPERIMENT
```

---

# 38. Synthetic Data

If synthetic Data is used, document generation method and limitations.

Permanent:

```text id="et059"
SYNTHETIC
DATA
≠
REAL
DATA
DISTRIBUTION
PROVEN
```

---

# 39. Production Data Boundary

```text id="et060"
EXPERIMENT
WOULD
BENEFIT
FROM
REAL
PRODUCTION
DATA
≠
PRODUCTION
DATA
AUTHORIZED
```

---

# 40. Environment Identity

```text id="et061"
[REQUIRED]
```

---

# 41. Environment Type

Potential:

```text id="et062"
RESEARCH

SANDBOX

TEST

INTEGRATION

PERFORMANCE

SECURITY

STAGING

PILOT
```

Selected:

```text id="et063"
[REQUIRED]
```

---

# 42. Environment Version

```text id="et064"
[REQUIRED]
```

---

# 43. Environment Differences

Record differences from target Runtime:

| Difference | Expected Effect | Material?  | Mitigation |
| ---------- | --------------- | ---------- | ---------- |
| [REQUIRED] | [REQUIRED]      | [REQUIRED] | [OPTIONAL] |

Permanent:

```text id="et065"
TEST
ENVIRONMENT
SUCCESS
≠
PRODUCTION
BEHAVIOR
VERIFIED
```

---

# 44. Configuration Snapshot

```yaml id="et066"
experiment_configuration:
  configuration_id: [REQUIRED]

  experiment_ref: [REQUIRED]

  environment_ref: [REQUIRED]

  dataset_ref: [OPTIONAL]

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

  retrieval_refs:
    - [OPTIONAL]

  infrastructure_refs:
    - [REQUIRED where material]

  runtime_parameters:
    [REQUIRED]

  created_at: [REQUIRED]
```

---

# 45. Configuration Boundary

Permanent:

```text id="et067"
EXPERIMENT
NAME
SAME
≠
EXPERIMENT
CONFIGURATION
SAME
```

---

# 46. Model Configuration

Where relevant, record:

```text id="et068"
PROVIDER

MODEL
ID

MODEL
VERSION /
SNAPSHOT

SAMPLING

REASONING
MODE

CONTEXT

MAX
OUTPUT

ROUTING

FALLBACK
```

---

# 47. Model Drift Boundary

```text id="et069"
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

# 48. Prompt Configuration

Record:

* Prompt ID.
* Prompt version.
* system instructions.
* examples.
* context structure.
* output schema.
* localization.
* Tool instructions.

Permanent:

```text id="et070"
PROMPT
CHANGED
MATERIALLY
≠
SAME
EXPERIMENT
CONFIGURATION
```

---

# 49. Agent Configuration

Record:

```text id="et071"
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

# 50. Multi-Agent Configuration

Record:

```text id="et072"
COORDINATOR

SPECIALISTS

COMMUNICATION

DELEGATION

SHARED
STATE

DISSENT

ARBITRATION

VERIFIER

TOOLS

MEMORY
```

Permanent:

```text id="et073"
MULTI-
AGENT
CONSENSUS
≠
CORRECTNESS
```

---

# 51. Tool Configuration

| Tool       | Version | Permission | Read / Write | External Side Effect | Verification |
| ---------- | ------- | ---------- | ------------ | -------------------- | ------------ |
| [REQUIRED] | [ ]     | [ ]        | [ ]          | [ ]                  | [ ]          |

Permanent:

```text id="et074"
TOOL
CALL
RETURNS
SUCCESS
≠
SIDE
EFFECT
VERIFIED
```

---

# 52. Memory Configuration

Record:

* Memory ID.
* version.
* Project scope.
* Tenant scope.
* write policy.
* read policy.
* freshness.
* provenance.
* reset policy.
* retention.

---

# 53. Retrieval Configuration

Record:

```text id="et075"
INDEX

INDEX
VERSION

EMBEDDING
MODEL

CHUNKING

TOP-K

RERANKING

PROJECT
FILTER

TENANT
FILTER

AUTHORIZATION
```

---

# 54. Experiment Intervention

Describe exactly what changes between control and treatment.

```text id="et076"
[REQUIRED]
```

Permanent:

```text id="et077"
MULTIPLE
UNCONTROLLED
CHANGES
≠
SINGLE
INTERVENTION
EFFECT
IDENTIFIED
```

---

# 55. Intervention Identity

Potential:

```text id="et078"
INT-000001
```

---

# 56. Intervention Record

```yaml id="et079"
experiment_intervention:
  intervention_id: [REQUIRED]

  experiment_ref: [REQUIRED]

  treatment_group_ref: [REQUIRED]

  change_description: [REQUIRED]

  pre_state_ref: [REQUIRED]
  post_state_ref: [REQUIRED]

  execution_ref: [REQUIRED]

  observed_deviation_refs:
    - [OPTIONAL]
```

---

# 57. Experiment Protocol

Write exact execution steps:

```text id="et080"
1.
VERIFY
AUTHORIZATION

2.
VERIFY
ENVIRONMENT

3.
VERIFY
PROJECT /
TENANT
SCOPE

4.
VERIFY
DATA

5.
PIN
CONFIG

6.
RESET
STATE

7.
APPLY
CONTROL /
TREATMENT

8.
EXECUTE

9.
OBSERVE

10.
CAPTURE
RAW
EVIDENCE

11.
VERIFY
SIDE
EFFECTS

12.
RESET /
TEARDOWN

13.
ANALYZE

14.
ARCHIVE
```

Detailed protocol:

[REQUIRED]

---

# 58. Pre-Run Readiness

Checklist:

* [ ] authorization current.
* [ ] Research Question current.
* [ ] hypothesis current.
* [ ] protocol current.
* [ ] environment healthy.
* [ ] Project scope correct.
* [ ] Tenant scope correct.
* [ ] Dataset version correct.
* [ ] Data rights current.
* [ ] Model version pinned.
* [ ] Prompt version pinned.
* [ ] Agent version pinned.
* [ ] Tool permissions verified.
* [ ] Memory/Retrieval scope verified.
* [ ] secrets verified.
* [ ] network boundaries verified.
* [ ] observability enabled.
* [ ] HALT path available.

---

# 59. Readiness Boundary

```text id="et081"
CHECKLIST
COMPLETE
≠
CONTROL
ENFORCEMENT
VERIFIED
AUTOMATICALLY
```

---

# 60. Experiment Run Identity

Potential:

```text id="et082"
EXP-RUN-000001
```

---

# 61. Experiment Run Record

```yaml id="et083"
experiment_run:
  run_id: [REQUIRED]

  experiment_ref: [REQUIRED]
  experiment_version: [REQUIRED]

  configuration_ref: [REQUIRED]
  environment_ref: [REQUIRED]

  treatment_ref: [REQUIRED]
  group_ref: [REQUIRED]

  dataset_ref: [OPTIONAL]

  started_at: [REQUIRED]
  completed_at: [REQUIRED]

  operator_or_agent_ref: [REQUIRED]

  evidence_refs:
    - [REQUIRED]

  deviation_refs:
    - [OPTIONAL]

  incident_refs:
    - [OPTIONAL]

  status: [REQUIRED]
```

---

# 62. Repeated Trials

Document:

```text id="et084"
TRIAL
COUNT:
[REQUIRED]

RATIONALE:
[REQUIRED]
```

Permanent:

```text id="et085"
ONE
SUCCESSFUL
RUN
≠
RELIABILITY
```

---

# 63. Stochastic Systems

Record:

* temperature.
* seed where supported.
* ordering.
* retry behavior.
* Model/provider variability.
* Tool variability.
* external dependency variability.

---

# 64. Determinism Boundary

```text id="et086"
SAME
SEED
≠
EXACT
AI
OUTPUT
GUARANTEED
```

---

# 65. Timing

Record where material:

```text id="et087"
START
TIME

END
TIME

TIME
ZONE

CLOCK
MODE

TIMEOUT

SCHEDULE

DURATION
```

---

# 66. Time Effects

Consider:

* time-of-day.
* provider load.
* changing external Data.
* market state.
* model/provider deployment changes.
* cache warmth.

---

# 67. Observations

An observation should record what actually occurred.

```yaml id="et088"
experiment_observation:
  observation_id: [REQUIRED]

  experiment_ref: [REQUIRED]
  run_ref: [REQUIRED]

  observed_at: [REQUIRED]

  observation_type: [REQUIRED]

  description: [REQUIRED]

  raw_evidence_refs:
    - [REQUIRED]

  interpretation:
    [OPTIONAL]
```

Permanent:

```text id="et089"
OBSERVATION
≠
INTERPRETATION
```

---

# 68. Evidence

Potential:

```text id="et090"
RAW
OUTPUT

LOG

TRACE

METRIC

SCREENSHOT

DATABASE
READ-
BACK

TOOL
READ-
BACK

HUMAN
RATING

MODEL
RATING

ARTIFACT

ERROR
```

---

# 69. Evidence Identity

Potential:

```text id="et091"
EVID-000001
```

---

# 70. Evidence Record

```yaml id="et092"
experiment_evidence:
  evidence_id: [REQUIRED]

  experiment_ref: [REQUIRED]
  run_ref: [REQUIRED]

  evidence_type: [REQUIRED]

  artifact_ref: [REQUIRED]

  source_ref: [REQUIRED]

  observed_at: [REQUIRED]

  provenance_ref: [REQUIRED]

  integrity_state: [REQUIRED]

  limitations:
    - [OPTIONAL]
```

---

# 71. Evidence Boundary

Permanent:

```text id="et093"
SCREENSHOT
≠
FULL
SYSTEM
TRUTH

TOOL
SUCCESS
≠
SIDE
EFFECT
VERIFIED

LOG
ABSENCE
≠
ACTION
DID
NOT
OCCUR
```

---

# 72. Primary Metrics

Each metric should define:

```yaml id="et094"
experiment_metric:
  metric_id: [REQUIRED]

  name: [REQUIRED]
  definition: [REQUIRED]

  unit: [REQUIRED]

  direction:
    [HIGHER_IS_BETTER / LOWER_IS_BETTER / TARGET_RANGE]

  measurement_source: [REQUIRED]

  primary: [YES / NO]

  aggregation: [REQUIRED]

  subgroup_analysis: [OPTIONAL]

  threshold:
    [OPTIONAL only if justified]

  hard_gate: [YES / NO]
```

---

# 73. Metric Boundary

```text id="et095"
METRIC
NAME
≠
CONSTRUCT
FULLY
MEASURED
```

---

# 74. Threshold Boundary

Permanent:

```text id="et096"
UNSUPPORTED
THRESHOLD
≠
VALID
SUCCESS
CRITERION
```

---

# 75. Success Criteria

Define before analysis where practical:

```text id="et097"
[REQUIRED]
```

---

# 76. Failure Criteria

```text id="et098"
[REQUIRED]
```

---

# 77. Hard Gates

Potential:

```text id="et099"
CROSS-
TENANT
LEAK

CRITICAL
SECURITY
FAILURE

SECRET
EXPOSURE

UNAUTHORIZED
TOOL
WRITE

UNAUTHORIZED
PRODUCTION
DATA
USE

UNSUPPORTED
AUTHORITY

CRITICAL
SAFETY
FAILURE
```

Permanent:

```text id="et100"
EXPERIMENT
BENEFIT
≠
HARD
GATE
FAILURE
WAIVER
```

---

# 78. Statistical Analysis Plan

Document before execution where appropriate:

```text id="et101"
PRIMARY
TEST

SECONDARY
TESTS

EFFECT
SIZE

CONFIDENCE
INTERVAL

MISSING
DATA

OUTLIERS

MULTIPLE
COMPARISONS

SUBGROUPS

STOPPING
RULES
```

---

# 79. Statistical Boundary

Permanent:

```text id="et102"
STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE
```

---

# 80. Effect Size

Report practical magnitude where meaningful.

```text id="et103"
[REQUIRED where applicable]
```

---

# 81. Confidence Intervals

```text id="et104"
METHOD:
[OPTIONAL]

LEVEL:
[OPTIONAL]

RATIONALE:
[OPTIONAL]
```

---

# 82. Missing Data

Define:

```text id="et105"
MISSING
DATA
HANDLING:
[REQUIRED]
```

Permanent:

```text id="et106"
MISSING
DATA
≠
ZERO
```

---

# 83. Outliers

Record:

* detection method.
* inclusion/exclusion rule.
* rationale.
* sensitivity analysis where material.

---

# 84. Exclusion Criteria

Predefine where possible.

```text id="et107"
[REQUIRED where applicable]
```

Permanent:

```text id="et108"
BAD
LOOKING
RESULT
≠
VALID
REASON
TO
EXCLUDE
OBSERVATION
```

---

# 85. Multiple Comparisons

If many hypotheses or metrics are tested, document false-positive controls where relevant.

---

# 86. Subgroup Analysis

Potential:

```text id="et109"
PROJECT

TENANT

LANGUAGE

USER
TYPE

DOMAIN

TASK
COMPLEXITY

RISK
LEVEL
```

Permanent:

```text id="et110"
GOOD
AGGREGATE
RESULT
≠
GOOD
SUBGROUP
RESULT
```

---

# 87. Tail Analysis

Consider:

```text id="et111"
WORST
CASES

P95 /
P99

RARE
FAILURES

HIGH-
RISK
FAILURES

LONG
TASKS

LARGE
TENANTS
```

---

# 88. Average/Tail Boundary

```text id="et112"
GOOD
AVERAGE
≠
SAFE /
RELIABLE
TAIL
```

---

# 89. Causal Interpretation

Causal claims require appropriate design.

Permanent:

```text id="et113"
CORRELATION
≠
CAUSATION
```

And:

```text id="et114"
CONTROLLED
EXPERIMENT
≠
PERFECT
CAUSAL
IDENTIFICATION
AUTOMATICALLY
```

---

# 90. Mechanism Analysis

Where useful, investigate why the effect occurred.

Potential:

```text id="et115"
MODEL
CHANGE

PROMPT
CHANGE

RETRIEVAL

MEMORY

TOOL

AGENT
PLANNING

VERIFIER

LATENCY

DATA
QUALITY
```

---

# 91. Ablation

Potential:

```text id="et116"
REMOVE
COMPONENT

CHANGE
ONE
PARAMETER

DISABLE
MEMORY

DISABLE
RAG

DISABLE
VERIFIER

CHANGE
MODEL

CHANGE
PROMPT
```

Permanent:

```text id="et117"
ABLATION
EFFECT
≠
REAL-
WORLD
CAUSALITY
PROVEN
```

---

# 92. Negative Results

Record all meaningful failures.

```text id="et118"
[REQUIRED]
```

Permanent:

```text id="et119"
NEGATIVE
RESULT
≠
FAILED
RESEARCH
```

---

# 93. Null Results

Record:

```text id="et120"
[REQUIRED where applicable]
```

Permanent:

```text id="et121"
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

# 94. Counter-Evidence

Document Evidence weakening the preferred interpretation.

```text id="et122"
[REQUIRED]
```

Permanent:

```text id="et123"
PREFERRED
HYPOTHESIS
≠
COUNTER-
EVIDENCE
OPTIONAL
```

---

# 95. Unexpected Results

```text id="et124"
[OPTIONAL]
```

Unexpected findings may generate new Research Questions but should not retroactively become the original primary hypothesis.

---

# 96. Protocol Deviations

Potential:

```text id="et125"
CONFIG
CHANGE

DATA
CHANGE

MODEL
CHANGE

PROMPT
CHANGE

TOOL
CHANGE

ENVIRONMENT
CHANGE

SAMPLE
CHANGE

METRIC
CHANGE

STOPPING
CHANGE
```

---

# 97. Deviation Record

```yaml id="et126"
experiment_deviation:
  deviation_id: [REQUIRED]

  experiment_ref: [REQUIRED]
  run_ref: [REQUIRED where applicable]

  planned_state: [REQUIRED]
  actual_state: [REQUIRED]

  reason: [REQUIRED]

  discovered_at: [REQUIRED]

  expected_impact: [REQUIRED]

  invalidation_required: [YES / NO / UNKNOWN]

  reviewer_ref: [REQUIRED]
```

---

# 98. Deviation Boundary

Permanent:

```text id="et127"
PROTOCOL
DEVIATION
DOCUMENTED
≠
RESULT
STILL
VALID
AUTOMATICALLY
```

---

# 99. Mid-Experiment Change Control

If a material change is required:

```text id="et128"
PAUSE

↓

DOCUMENT
CHANGE

↓

ASSESS
IMPACT

↓

REAUTHORIZE
WHERE
REQUIRED

↓

VERSION
PROTOCOL

↓

RESUME
OR
START
NEW
EXPERIMENT
```

---

# 100. Post-Hoc Change Boundary

```text id="et129"
ANALYSIS
METHOD
CHANGED
AFTER
SEEING
RESULTS
≠
PRE-
SPECIFIED
ANALYSIS
```

---

# 101. Reproducibility

Preserve:

```text id="et130"
PROTOCOL

CONFIG

DATASET

ENVIRONMENT

MODEL

PROMPT

AGENT

TOOLS

MEMORY

DEPENDENCIES

METRICS

ANALYSIS
CODE /
METHOD
```

---

# 102. Reproducibility Boundary

Permanent:

```text id="et131"
SAME
CODE
≠
SAME
EXPERIMENT
STATE

SAME
CONFIG
≠
SAME
STOCHASTIC
OUTPUT
GUARANTEED
```

---

# 103. Replication

Replication may be:

```text id="et132"
DIRECT

INDEPENDENT

CONCEPTUAL

CROSS-
ENVIRONMENT

CROSS-
PROJECT

CROSS-
TENANT
```

where appropriate.

---

# 104. Replication Boundary

```text id="et133"
ORIGINAL
EXPERIMENT
PASS
≠
REPLICATION
PASS
```

---

# 105. Independent Verification

Where stakes warrant:

* different evaluator.
* different researcher.
* different implementation.
* different Dataset.
* different environment.
* blinded analysis.

Permanent:

```text id="et134"
SELF-
REVIEW
≠
INDEPENDENT
VERIFICATION
```

---

# 106. Validity Dimensions

Assess where applicable:

```text id="et135"
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

---

# 107. Internal Validity Threats

Potential:

* confounding.
* incorrect randomization.
* measurement error.
* state leakage.
* evaluator bias.
* protocol deviation.
* inconsistent environment.
* premature stopping.

---

# 108. External Validity Threats

Potential:

* narrow Dataset.
* synthetic Data.
* narrow Project scope.
* narrow Tenant scope.
* limited language coverage.
* mocked dependency.
* unrealistic workload.
* short observation window.

Permanent:

```text id="et136"
EXPERIMENT
VALID
IN
CONTROLLED
ENVIRONMENT
≠
GENERALIZES
TO
PRODUCTION
```

---

# 109. Construct Validity

Ask whether measurements represent the intended concept.

Example:

```text id="et137"
TASK
COMPLETION
RATE

≠

BUSINESS
VALUE
AUTOMATICALLY
```

---

# 110. Security Review

Assess Experiment-specific risks:

```text id="et138"
SECRETS

NETWORK

TOOLS

DATA

PROMPT
INJECTION

AUTHORITY
INJECTION

MALICIOUS
FILES

RAG
POISONING

MEMORY
POISONING

TENANT
ESCAPE
```

---

# 111. Prompt Injection

If applicable, document:

* attack vector.
* untrusted source.
* expected defense.
* actual behavior.
* Tool consequence.
* Data consequence.
* authority consequence.

---

# 112. Authority Injection

Permanent:

```text id="et139"
UNTRUSTED
CONTENT
SAYS
"FOUNDER
APPROVED"
≠
FOUNDER
APPROVAL
```

---

# 113. Tool Side Effects

For write-capable Tools:

```text id="et140"
REQUEST

↓

TOOL
RESPONSE

↓

READ-
BACK /
EXTERNAL
STATE
VERIFICATION
```

Permanent:

```text id="et141"
TOOL
SUCCESS
≠
SIDE
EFFECT
VERIFIED
```

---

# 114. Project Isolation

Experiment must not silently cross Project boundaries.

Permanent:

```text id="et142"
PROJECT A
EXPERIMENT
AUTHORITY
≠
PROJECT B
AUTHORITY
```

---

# 115. Tenant Isolation

Test where applicable:

```text id="et143"
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

Permanent:

```text id="et144"
TENANT
LABEL
≠
TENANT
ISOLATION
```

---

# 116. Cross-Tenant Hard Gate

```text id="et145"
UNAUTHORIZED
CROSS-
TENANT
ACCESS
=
CRITICAL
EXPERIMENT
FAILURE
```

---

# 117. Privacy Review

Record:

* Data minimization.
* sensitive Data.
* external transmission.
* retention.
* logs.
* Human access.
* deletion.
* Project/Tenant scope.

---

# 118. Responsible AI Review

Where applicable:

* bias.
* subgroup effects.
* harmful behavior.
* Human oversight.
* autonomy.
* transparency.
* manipulation.
* accessibility.
* refusal behavior.

---

# 119. Human Participants

If Human participants are involved, document:

```text id="et146"
PARTICIPANT
TYPE

RECRUITMENT

CONSENT

DATA
COLLECTION

COMPENSATION

PRIVACY

WITHDRAWAL

RISK

DEBRIEF
```

as required by applicable Governance.

---

# 120. Human Participant Boundary

```text id="et147"
PARTICIPANT
AGREED
TO
ONE
STUDY
PURPOSE
≠
DATA
AUTHORIZED
FOR
ALL
FUTURE
PURPOSES
```

---

# 121. Resource and Cost Controls

Record where material:

```text id="et148"
COMPUTE

MODEL
TOKENS

TOOL
CALLS

STORAGE

NETWORK

HUMAN
REVIEW

TIME

BUDGET
```

---

# 122. Cost Boundary

```text id="et149"
EXPERIMENT
COST
≠
PRODUCTION
TOTAL
COST
OF
OWNERSHIP
```

---

# 123. Experiment Monitoring

Potential:

```text id="et150"
RUN
STATE

FAILURES

COST

RESOURCE
USE

MODEL
CALLS

TOOL
CALLS

SECURITY
EVENTS

TENANT
EVENTS

DEVIATIONS
```

---

# 124. Audit Events

Potential:

```text id="et151"
EXPERIMENT
CREATED

AUTHORIZATION
CHANGED

PROTOCOL
CHANGED

CONFIG
CHANGED

RUN
STARTED

RUN
STOPPED

RUN
COMPLETED

DEVIATION
RECORDED

HARD
GATE
FAILED

EXPERIMENT
HALTED

RESULT
INVALIDATED

EXPERIMENT
ARCHIVED
```

---

# 125. Experiment Incident Classes

Potential:

```text id="et152"
EI01
UNAUTHORIZED
DATA
USE

EI02
PRODUCTION
CREDENTIAL
EXPOSURE

EI03
CROSS-
PROJECT
ACCESS

EI04
CROSS-
TENANT
ACCESS

EI05
SECRET
EXPOSURE

EI06
UNAUTHORIZED
TOOL
SIDE
EFFECT

EI07
SANDBOX
ESCAPE

EI08
UNCONTROLLED
EGRESS

EI09
DATASET
CONTAMINATION

EI10
CONFIGURATION
MISMATCH

EI11
EVIDENCE
LOSS

EI12
FALSE
FOUNDER
APPROVAL

EI13
PROTOCOL
DEVIATION
CONCEALED

EI14
EXPERIMENT
RESULT
MISREPRESENTED
AS
PRODUCTION
VERIFICATION

EI15
EXPERIMENT
MISREPRESENTED
AS
PRODUCTION
AUTHORIZATION
```

---

# 126. HALT Triggers

Potential:

```text id="et153"
CROSS-
TENANT
ACCESS

PRODUCTION
DATA
EXPOSURE

PRODUCTION
CREDENTIAL
USE

SECRET
EXPOSURE

SANDBOX
ESCAPE

UNAUTHORIZED
REAL
WRITE

CRITICAL
SAFETY
FAILURE

INVALID
AUTHORITY

MATERIAL
PROTOCOL
INVALIDATION
```

---

# 127. HALT Boundary

Permanent:

```text id="et154"
EXPERIMENT
HALT
RECORDED
≠
RUNNER /
AGENT /
TOOL /
QUEUE
ACTUALLY
HALTED
UNTIL
VERIFIED
```

---

# 128. Incident Response

Conceptually:

```text id="et155"
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
RUNS

↓

ASSESS
PROJECT /
TENANT /
DATA /
SECURITY
IMPACT

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

RE-RUN /
RESUME
```

---

# 129. Resume Requirements

Before Resume:

* root cause assessed.
* affected Evidence identified.
* environment restored.
* Data authorization current.
* Project/Tenant boundaries safe.
* credentials safe.
* Tool permissions safe.
* configuration pinned.
* protocol version current.
* authority current.
* Resume separately authorized where required.

---

# 130. Results

## 130.1 Primary Results

| Metric     | Control | Treatment | Difference | Uncertainty | Hard Gate | Result |
| ---------- | ------: | --------: | ---------: | ----------: | --------- | ------ |
| [REQUIRED] |     [ ] |       [ ] |        [ ] |         [ ] | [ ]       | [ ]    |

## 130.2 Secondary Results

[OPTIONAL]

## 130.3 Negative Results

[REQUIRED]

## 130.4 Null Results

[REQUIRED where applicable]

## 130.5 Unexpected Findings

[OPTIONAL]

---

# 131. Evidence Package

Required where appropriate:

```text id="et156"
PROTOCOL

AUTHORIZATION

CONFIG
SNAPSHOT

DATASET
VERSION

RUN
LOGS

RAW
OUTPUTS

METRICS

ERRORS

DEVIATIONS

INCIDENTS

ANALYSIS

RESULT
TABLES

COUNTER-
EVIDENCE
```

---

# 132. Analysis

## 132.1 Primary Analysis

[REQUIRED]

## 132.2 Secondary Analysis

[OPTIONAL]

## 132.3 Sensitivity Analysis

[OPTIONAL]

## 132.4 Subgroup Analysis

[OPTIONAL / REQUIRED where material]

## 132.5 Tail Analysis

[OPTIONAL / REQUIRED where material]

---

# 133. Interpretation

State what the results mean within defined scope.

[REQUIRED]

Permanent:

```text id="et157"
RESULT
OBSERVED
≠
INTERPRETATION
CERTAIN
```

---

# 134. Alternative Explanations

List plausible explanations other than the preferred hypothesis.

* [REQUIRED]
* [REQUIRED]

---

# 135. Counter-Evidence Review

[REQUIRED]

Permanent:

```text id="et158"
CONCLUSION
WITHOUT
COUNTER-
EVIDENCE
REVIEW
≠
ROBUST
CONCLUSION
```

---

# 136. Limitations

Required:

* [REQUIRED]
* [REQUIRED]
* [REQUIRED]

---

# 137. Evidence Gaps

```text id="et159"
[REQUIRED]
```

Use `UNKNOWN` rather than inventing missing information.

---

# 138. Result Validity State

Select:

```text id="et160"
VALIDATED
FOR
DEFINED
EXPERIMENT
SCOPE

PARTIALLY
VALIDATED

INCONCLUSIVE

NOT
VALIDATED

INVALIDATED
```

Selected:

```text id="et161"
[REQUIRED]
```

---

# 139. Hypothesis Result State

Potential:

```text id="et162"
SUPPORTED
FOR
DEFINED
SCOPE

PARTIALLY
SUPPORTED

NOT
SUPPORTED

CONTRADICTED

INCONCLUSIVE
```

Selected:

```text id="et163"
[REQUIRED]
```

Permanent:

```text id="et164"
SUPPORTED
FOR
DEFINED
SCOPE
≠
UNIVERSALLY
PROVEN
```

---

# 140. Conclusion

## 140.1 Supported Claims

* [REQUIRED]

## 140.2 Unsupported Claims

* [REQUIRED]

## 140.3 Claims Requiring Further Research

* [REQUIRED]

---

# 141. Recommendation

Select where appropriate:

```text id="et165"
REPEAT
EXPERIMENT

REPLICATE

EXPAND
SAMPLE

RUN
BENCHMARK

RUN
MODEL
EVALUATION

RUN
SECURITY
EVALUATION

BUILD
PROTOTYPE

TECHNOLOGY
ASSESSMENT
INPUT

RESEARCH
ROADMAP
INPUT

CONTROLLED
PILOT
CANDIDATE

NO
FURTHER
ACTION

PAUSE

REJECT
HYPOTHESIS
FOR
DEFINED
SCOPE
```

Selected:

```text id="et166"
[REQUIRED]
```

---

# 142. Recommendation Boundary

Permanent:

```text id="et167"
EXPERIMENT
RECOMMENDATION
≠
IMPLEMENTATION
AUTHORIZATION
```

---

# 143. Product Boundary

```text id="et168"
EXPERIMENT
SHOWS
USER
PREFERENCE
≠
PRODUCT-
MARKET
FIT
```

---

# 144. Architecture Boundary

```text id="et169"
ARCHITECTURE
EXPERIMENT
SUCCEEDS
≠
ARCHITECTURE
DECISION
APPROVED
```

---

# 145. Engineering Boundary

```text id="et170"
TECHNICAL
EXPERIMENT
SUCCEEDS
≠
ENGINEERING
IMPLEMENTATION
AUTHORIZED
```

---

# 146. Prototype Boundary

```text id="et171"
EXPERIMENT
SUPPORTS
PROTOTYPE
≠
PROTOTYPE
VALIDATED
```

---

# 147. Pilot Boundary

Permanent:

```text id="et172"
EXPERIMENT
SUCCESS
≠
PILOT
AUTHORIZED
```

---

# 148. Production Boundary

```text id="et173"
EXPERIMENT
SUCCESS

≠

PRODUCTION
READINESS

≠

PRODUCTION
AUTHORIZATION
```

---

# 149. Founder Authority Boundary

```text id="et174"
EXPERIMENT
ROUTED
TO
FOUNDER
≠
FOUNDER
APPROVED
```

And:

```text id="et175"
SILENCE
≠
APPROVAL
```

---

# 150. Knowledge Transfer

Experiment findings may transfer to:

```text id="et176"
RESEARCH
KNOWLEDGE

MEMORY

BENCHMARKING

MODEL
EVALUATION

PROMPT
RESEARCH

AGENT
RESEARCH

ARCHITECTURE

ENGINEERING

PRODUCT

SECURITY

TECHNOLOGY
RADAR
```

---

# 151. Knowledge Transfer Boundary

```text id="et177"
EXPERIMENT
FINDING
TRANSFERRED
≠
DOWNSTREAM
DECISION
APPROVED
```

---

# 152. Experiment Revalidation Triggers

Potential:

```text id="et178"
MODEL
CHANGE

PROMPT
CHANGE

AGENT
CHANGE

TOOL
CHANGE

MEMORY
CHANGE

DATASET
CHANGE

ENVIRONMENT
CHANGE

METRIC
CHANGE

ANALYSIS
CHANGE

PROJECT
CHANGE

TENANT
CHANGE

SECURITY
CHANGE
```

---

# 153. Revalidation Boundary

Permanent:

```text id="et179"
OLD
EXPERIMENT
RESULT
≠
NEW
CONFIGURATION
RESULT
```

---

# 154. Experiment Supersession

Potential:

```text id="et180"
EXP-001@1.0

↓

SUPERSEDED
BY

EXP-001@2.0
```

Prior Evidence should remain preserved.

---

# 155. Experiment Archive

Archive should retain, where appropriate:

* Experiment definition.
* protocol.
* authorization.
* raw Evidence.
* configuration.
* Dataset references.
* results.
* deviations.
* incidents.
* analysis.
* limitations.
* decision history.

---

# 156. Completion Checklist

## Identity and Governance

* [ ] Experiment ID assigned.
* [ ] version assigned.
* [ ] owner assigned.
* [ ] status current.
* [ ] Project scope defined.
* [ ] Tenant scope defined.
* [ ] risk class defined.
* [ ] autonomy class defined where applicable.
* [ ] authorization recorded.

## Research Design

* [ ] Research Question defined.
* [ ] hypothesis defined.
* [ ] falsification condition defined.
* [ ] non-goals defined.
* [ ] Experiment type defined.
* [ ] Experiment class defined.
* [ ] design documented.
* [ ] control defined where applicable.
* [ ] treatment defined.
* [ ] independent variable defined.
* [ ] dependent variable defined.
* [ ] confounders considered.
* [ ] randomization documented.
* [ ] stratification documented where applicable.
* [ ] blinding documented where applicable.

## Data and Environment

* [ ] sample/coverage plan documented.
* [ ] Dataset identity recorded.
* [ ] Dataset version recorded.
* [ ] Dataset provenance recorded.
* [ ] Data authorization recorded.
* [ ] synthetic/real Data truth labeled.
* [ ] environment pinned.
* [ ] Project/Tenant environment boundaries verified.

## AI Configuration

* [ ] Model pinned.
* [ ] Prompt pinned.
* [ ] Agent pinned.
* [ ] Multi-Agent configuration pinned.
* [ ] Tools pinned.
* [ ] Tool permissions documented.
* [ ] Memory pinned.
* [ ] Retrieval pinned.

## Protocol

* [ ] pre-run checks documented.
* [ ] intervention documented.
* [ ] protocol documented.
* [ ] trial count justified.
* [ ] stochastic controls documented.
* [ ] stopping rules documented.
* [ ] change control defined.

## Metrics and Analysis

* [ ] primary metrics defined.
* [ ] success criteria defined.
* [ ] failure criteria defined.
* [ ] hard gates defined.
* [ ] statistical method defined.
* [ ] effect size considered.
* [ ] missing Data handling defined.
* [ ] outlier treatment defined.
* [ ] exclusions defined.
* [ ] subgroup analysis considered.
* [ ] tail analysis considered.
* [ ] causal limits documented.

## Security and Responsible Research

* [ ] security review completed where applicable.
* [ ] Prompt Injection considered.
* [ ] Authority Injection considered.
* [ ] Tool side-effect verification defined.
* [ ] Project isolation considered.
* [ ] Tenant isolation considered.
* [ ] privacy reviewed.
* [ ] Responsible AI reviewed.
* [ ] Human participant controls reviewed where applicable.
* [ ] HALT path defined.

## Evidence and Results

* [ ] raw Evidence preserved.
* [ ] observation records preserved.
* [ ] negative results preserved.
* [ ] null results preserved.
* [ ] Counter-Evidence preserved.
* [ ] deviations preserved.
* [ ] incidents preserved.
* [ ] validity threats assessed.
* [ ] limitations documented.
* [ ] Evidence gaps documented.

## Conclusion

* [ ] hypothesis result state assigned.
* [ ] Experiment validity state assigned.
* [ ] supported claims listed.
* [ ] unsupported claims listed.
* [ ] alternative explanations documented.
* [ ] recommendation separated from authority.
* [ ] Production boundary preserved.
* [ ] revalidation triggers documented.

---

# 157. Minimum Experiment Record

At minimum:

```text id="et181"
EXPERIMENT
ID

VERSION

RESEARCH
QUESTION

HYPOTHESIS

SCOPE

AUTHORIZATION

DESIGN

VARIABLES

CONTROL /
TREATMENT

DATASET

ENVIRONMENT

CONFIGURATION

PROTOCOL

METRICS

HARD
GATES

RUN
IDENTITY

RAW
EVIDENCE

ANALYSIS

COUNTER-
EVIDENCE

LIMITATIONS

CONCLUSION

REVALIDATION
TRIGGERS
```

---

# 158. Experiment Failure Classes

Potential:

```text id="et182"
ETF01
QUESTION
DESIGN
FAILURE

ETF02
HYPOTHESIS
FAILURE

ETF03
SCOPE
FAILURE

ETF04
AUTHORIZATION
FAILURE

ETF05
CONTROL
DESIGN
FAILURE

ETF06
CONFOUNDER
FAILURE

ETF07
SAMPLE /
COVERAGE
FAILURE

ETF08
DATASET
FAILURE

ETF09
CONFIGURATION
FAILURE

ETF10
METRIC
FAILURE

ETF11
PROTOCOL
FAILURE

ETF12
STATISTICAL
FAILURE

ETF13
CAUSAL
OVERCLAIM

ETF14
REPRODUCIBILITY
FAILURE

ETF15
EVIDENCE
FAILURE

ETF16
NEGATIVE /
NULL
RESULT
SUPPRESSION

ETF17
RECOMMENDATION /
AUTHORITY
CONFUSION

ETF18
EXPERIMENT /
PRODUCTION
AUTHORIZATION
CONFUSION
```

---

# 159. Positive Verification Scenarios

Future Experiment tooling should verify at least:

```text id="et183"
EXV-01
EXPERIMENT
COMPLETION
DOES
NOT
AUTO-
BECOME
VALIDATION

EXV-02
HYPOTHESIS
SUPPORTED
DOES
NOT
AUTO-
BECOME
UNIVERSAL
PROOF

EXV-03
POST-
HOC
HYPOTHESIS
DOES
NOT
AUTO-
BECOME
PRE-
REGISTERED
HYPOTHESIS

EXV-04
EXPERIMENT
PLANNED
DOES
NOT
AUTO-
BECOME
AUTHORIZED

EXV-05
AGENT
CAPABILITY
DOES
NOT
AUTO-
BECOME
AGENT
AUTHORITY

EXV-06
OBSERVED
DIFFERENCE
DOES
NOT
AUTO-
BECOME
TREATMENT
EFFECT
WITH
UNCONTROLLED
CONFOUNDERS

EXV-07
NO
BASELINE
DOES
NOT
AUTO-
BECOME
IMPROVEMENT
MEASURED

EXV-08
RANDOMIZATION
REQUESTED
DOES
NOT
AUTO-
BECOME
RANDOMIZATION
VERIFIED

EXV-09
LARGE
SAMPLE
DOES
NOT
AUTO-
BECOME
REPRESENTATIVE
SAMPLE

EXV-10
DATA
AVAILABLE
DOES
NOT
AUTO-
BECOME
DATA
AUTHORIZED

EXV-11
TEST
ENVIRONMENT
SUCCESS
DOES
NOT
AUTO-
BECOME
PRODUCTION
BEHAVIOR
VERIFIED

EXV-12
TOOL
SUCCESS
DOES
NOT
AUTO-
BECOME
SIDE
EFFECT
VERIFIED

EXV-13
MULTI-
AGENT
CONSENSUS
DOES
NOT
AUTO-
BECOME
CORRECTNESS

EXV-14
ONE
SUCCESSFUL
RUN
DOES
NOT
AUTO-
BECOME
RELIABILITY

EXV-15
MISSING
DATA
DOES
NOT
AUTO-
BECOME
ZERO

EXV-16
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

EXV-17
STATISTICAL
SIGNIFICANCE
DOES
NOT
AUTO-
BECOME
PRACTICAL
SIGNIFICANCE

EXV-18
CORRELATION
DOES
NOT
AUTO-
BECOME
CAUSATION

EXV-19
NEGATIVE
RESULT
DOES
NOT
AUTO-
BECOME
FAILED
RESEARCH

EXV-20
NO
DETECTED
EFFECT
DOES
NOT
AUTO-
BECOME
PROOF
OF
NO
EFFECT

EXV-21
SUPPORTED
FOR
DEFINED
SCOPE
DOES
NOT
AUTO-
BECOME
UNIVERSAL
VALIDITY

EXV-22
EXPERIMENT
RECOMMENDATION
DOES
NOT
AUTO-
BECOME
IMPLEMENTATION
AUTHORITY

EXV-23
FOUNDER
ROUTING
DOES
NOT
AUTO-
BECOME
FOUNDER
APPROVAL

EXV-24
EXPERIMENT
SUCCESS
DOES
NOT
AUTO-
BECOME
PRODUCTION
AUTHORIZATION

EXV-25
EXPERIMENT
DOCUMENT
DOES
NOT
AUTO-
PROVE
EXPERIMENT
RUNTIME
IMPLEMENTED
```

---

# 160. Extended Verification Scenarios

Future implementation should test at least:

```text id="et184"
EXVS-01
LEADING
QUESTION

EXVS-02
POST-
HOC
HYPOTHESIS
REWRITTEN
AS
ORIGINAL

EXVS-03
UNAUTHORIZED
EXPERIMENT
RUN

EXVS-04
MULTIPLE
VARIABLES
CHANGED
WITHOUT
CONTROL

EXVS-05
CONFOUNDER
IGNORED

EXVS-06
NON-
REPRESENTATIVE
SAMPLE

EXVS-07
UNAUTHORIZED
PRODUCTION
DATA

EXVS-08
MODEL
VERSION
DRIFT

EXVS-09
PROMPT
VERSION
DRIFT

EXVS-10
TOOL
SUCCESS
WITHOUT
READ-
BACK

EXVS-11
TENANT
LABEL
WITHOUT
ISOLATION

EXVS-12
ONE
RUN
MISREPRESENTED
AS
RELIABILITY

EXVS-13
MISSING
DATA
TREATED
AS
ZERO

EXVS-14
BAD
RESULTS
REMOVED
POST-
HOC

EXVS-15
AGGREGATE
SUCCESS
HIDES
SUBGROUP
FAILURE

EXVS-16
AVERAGE
SUCCESS
HIDES
TAIL
FAILURE

EXVS-17
STATISTICAL
SIGNIFICANCE
OVERCLAIM

EXVS-18
CORRELATION
OVERCLAIMED
AS
CAUSATION

EXVS-19
NEGATIVE
RESULT
SUPPRESSED

EXVS-20
NULL
RESULT
OVERCLAIMED
AS
NO
EFFECT

EXVS-21
PROTOCOL
DEVIATION
CONCEALED

EXVS-22
SELF-
REVIEW
MISREPRESENTED
AS
INDEPENDENT
VERIFICATION

EXVS-23
FALSE
FOUNDER
APPROVAL

EXVS-24
HALT
WITHOUT
RUNNER /
AGENT /
TOOL
PROPAGATION

EXVS-25
EXPERIMENT
SUCCESS
MISREPRESENTED
AS
PRODUCTION
AUTHORIZATION
```

---

# 161. Controlled Experiment Pilot

An initial Experiment framework Pilot should prefer:

```text id="et185"
LIMITED
EXPERIMENT
PORTFOLIO

STABLE
EXPERIMENT
IDS

VERSIONED
PROTOCOLS

EXPLICIT
RESEARCH
QUESTIONS

PRE-
DEFINED
HYPOTHESES

EXPLICIT
SCOPE

MANUAL
AUTHORIZATION

SYNTHETIC /
AUTHORIZED
DATA

VERSIONED
TEST
ENVIRONMENTS

PINNED
MODEL /
PROMPT /
AGENT /
TOOL
CONFIGS

EXPLICIT
CONTROL /
TREATMENT

DEFINED
PRIMARY
METRICS

NON-
COMPENSABLE
HARD
GATES

RAW
EVIDENCE

DEVIATION
LOGGING

NEGATIVE /
NULL
RESULT
PRESERVATION

COUNTER-
EVIDENCE

SECURITY /
TENANT
CONTROLS

HALT /
RESUME

MANUAL
CONCLUSION
REVIEW

NO
AUTO-
PRODUCTION
PROMOTION
```

---

# 162. Pilot Exit Criteria

Verify:

* Experiment registry.
* Experiment IDs.
* versioning.
* Research Questions.
* hypothesis records.
* pre-registration.
* Project scope.
* Tenant scope.
* risk classification.
* autonomy classification.
* authorization.
* variables.
* control.
* treatment.
* confounders.
* randomization.
* stratification.
* blinding.
* sample planning.
* Dataset provenance.
* Data authorization.
* environment pinning.
* Model pinning.
* Prompt pinning.
* Agent pinning.
* Tool pinning.
* Memory/Retrieval pinning.
* protocol.
* readiness checks.
* run IDs.
* repeated trials.
* stochastic settings.
* observations.
* raw Evidence.
* metrics.
* success/failure criteria.
* hard gates.
* statistical plan.
* missing Data handling.
* subgroup analysis.
* tail analysis.
* causal boundaries.
* negative results.
* null results.
* Counter-Evidence.
* deviations.
* change control.
* reproducibility.
* replication.
* independent verification.
* validity threats.
* security.
* Prompt Injection.
* Authority Injection.
* Tool side effects.
* Project isolation.
* Tenant isolation.
* privacy.
* Responsible AI.
* Human participant controls.
* cost controls.
* monitoring.
* Audit.
* incidents.
* HALT/Resume.
* result states.
* conclusions.
* downstream transfer boundaries.
* revalidation.
* Runtime Truth.

---

# 163. Pilot Boundary

Permanent:

```text id="et186"
CONTROLLED
EXPERIMENT
PILOT
SUCCESS

≠

ENTERPRISE
EXPERIMENT
PLATFORM
PRODUCTION
READINESS

≠

RESEARCH
CONCLUSION
UNIVERSALLY
VALID

≠

PRODUCTION
SYSTEM
VERIFICATION

≠

PRODUCTION
AUTHORIZATION
```

---

# 164. Experiment Maturity Model

Conceptual:

```text id="et187"
ETM0
=
EXPERIMENT
TEMPLATE
DOCUMENTED

ETM1
=
QUESTION /
HYPOTHESIS /
VARIABLE /
PROTOCOL
MODELS
DEFINED

ETM2
=
DATA /
ENVIRONMENT /
CONFIG /
EVIDENCE /
METRIC
CONTRACTS
DEFINED

ETM3
=
CONTROLLED
EXPERIMENT
EXECUTION
IMPLEMENTED

ETM4
=
MODEL /
PROMPT /
AGENT /
TOOL /
MEMORY /
DATA
EXPERIMENTS
INTEGRATED

ETM5
=
SECURITY /
TENANT /
PRIVACY /
SAFETY /
HARD-
GATE
CONTROLS
INTEGRATED

ETM6
=
STATISTICS /
REPRODUCIBILITY /
REPLICATION /
MONITORING /
AUDIT
INTEGRATED

ETM7
=
CRITICAL
AUTHORIZATION /
CAUSAL /
CONFIG /
EVIDENCE /
AUTHORITY
BOUNDARIES
VERIFIED

ETM8
=
CONTROLLED
EXPERIMENT
PILOT
VERIFIED

ETM9
=
PRODUCTION-SCOPE
RESEARCH
EXPERIMENT
CONTROL
PLANE
SEPARATELY
AUTHORIZED
```

---

# 165. Maturity Boundary

Permanent:

```text id="et188"
ETM8
≠
ETM9
```

---

# 166. Template Runtime Truth

This template defines a documentation and Governance contract only.

```text id="et189"
EXPERIMENT
TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW

EXPERIMENT
REGISTRY
IMPLEMENTED
=
NOT_PROVEN

EXPERIMENT
AUTHORIZATION
ENGINE
IMPLEMENTED
=
NOT_PROVEN

EXPERIMENT
ORCHESTRATION
ENGINE
IMPLEMENTED
=
NOT_PROVEN

EXPERIMENT
RANDOMIZATION
ENGINE
IMPLEMENTED
=
NOT_PROVEN

EXPERIMENT
CONFIG
PINNING
RUNTIME
=
NOT_PROVEN

EXPERIMENT
EVIDENCE
STORE
IMPLEMENTED
=
NOT_PROVEN

EXPERIMENT
STATISTICAL
ENGINE
IMPLEMENTED
=
NOT_PROVEN

EXPERIMENT
REPRODUCIBILITY
RUNTIME
=
NOT_PROVEN

EXPERIMENT
REPLICATION
RUNTIME
=
NOT_PROVEN

EXPERIMENT
TENANT
ISOLATION
RUNTIME
=
NOT_PROVEN

EXPERIMENT
HALT
RUNTIME
=
NOT_PROVEN

CONTROLLED
EXPERIMENT
PILOT
=
NOT_PROVEN

PRODUCTION
RESEARCH
EXPERIMENT
CONTROL
PLANE
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 167. Repository Truth

This document is generated for:

```text id="et190"
doc/26-research-lab/templates/experiment-template.md
```

Permanent:

```text id="et191"
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

# 168. Templates Folder Documentation Truth

The screenshot-verified Templates sequence is:

```text id="et192"
doc/26-research-lab/templates/
├── benchmark-template.md
├── experiment-template.md
├── publication-template.md
└── research-template.md
```

Current workflow state:

```text id="et193"
BENCHMARK_TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW

EXPERIMENT_TEMPLATE
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT

PUBLICATION_TEMPLATE
=
NOT
GENERATED
YET
IN
CURRENT
WORKFLOW

RESEARCH_TEMPLATE
=
NOT
GENERATED
YET
IN
CURRENT
WORKFLOW
```

Thus:

```text id="et194"
2 / 4
TEMPLATES
CONTENT_COMPLETE_FOR_REVIEW

FILESYSTEM
SAVE
=
NOT_VERIFIED
```

---

# 169. Approval Truth

```text id="et195"
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

PRODUCTION
AUTHORIZED
=
NO
```

---

# 170. Permanent Experiment Template Invariants

```text id="et196"
EXPERIMENT
≠
PROOF

EXPERIMENT
COMPLETE
≠
VALIDATED

LEADING
QUESTION
≠
NEUTRAL
RESEARCH
QUESTION

HYPOTHESIS
SUPPORTED
≠
HYPOTHESIS
PROVEN

POST-
HOC
HYPOTHESIS
≠
PRE-
REGISTERED
HYPOTHESIS

EXPERIMENT
PLANNED
≠
EXPERIMENT
AUTHORIZED

AGENT
CAPABILITY
≠
AGENT
AUTHORITY

OBSERVED
DIFFERENCE
≠
CAUSAL
EFFECT
AUTOMATICALLY

NO
BASELINE
≠
IMPROVEMENT
MEASURED

RANDOMIZATION
REQUESTED
≠
RANDOMIZATION
VERIFIED

LARGE
SAMPLE
≠
REPRESENTATIVE
SAMPLE

DATA
AVAILABLE
≠
DATA
AUTHORIZED

SYNTHETIC
DATA
≠
REAL
DATA
DISTRIBUTION
PROVEN

REALISTIC
DATA
NEED
≠
PRODUCTION
DATA
AUTHORIZED

TEST
ENVIRONMENT
SUCCESS
≠
PRODUCTION
BEHAVIOR
VERIFIED

EXPERIMENT
NAME
SAME
≠
CONFIGURATION
SAME

MODEL
ALIAS
SAME
≠
MODEL
BEHAVIOR
GUARANTEED
SAME

PROMPT
CHANGED
≠
SAME
CONFIGURATION

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

MULTIPLE
UNCONTROLLED
CHANGES
≠
SINGLE
INTERVENTION
EFFECT
KNOWN

ONE
SUCCESSFUL
RUN
≠
RELIABILITY

SAME
SEED
≠
EXACT
AI
OUTPUT

OBSERVATION
≠
INTERPRETATION

SCREENSHOT
≠
FULL
SYSTEM
TRUTH

LOG
ABSENCE
≠
ACTION
ABSENCE

METRIC
NAME
≠
CONSTRUCT
FULLY
MEASURED

UNSUPPORTED
THRESHOLD
≠
VALID
SUCCESS
CRITERION

BENEFIT
≠
HARD
GATE
WAIVER

STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE

MISSING
DATA
≠
ZERO

BAD
RESULT
≠
VALID
EXCLUSION
REASON

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

CORRELATION
≠
CAUSATION

CONTROLLED
EXPERIMENT
≠
PERFECT
CAUSAL
IDENTIFICATION

ABLATION
EFFECT
≠
REAL-
WORLD
CAUSALITY
PROVEN

NEGATIVE
RESULT
≠
FAILED
RESEARCH

NO
DETECTED
EFFECT
≠
PROOF
OF
NO
EFFECT

PREFERRED
HYPOTHESIS
≠
COUNTER-
EVIDENCE
OPTIONAL

PROTOCOL
DEVIATION
DOCUMENTED
≠
RESULT
VALID
AUTOMATICALLY

POST-
HOC
ANALYSIS
CHANGE
≠
PRE-
SPECIFIED
ANALYSIS

SAME
CODE
≠
SAME
EXPERIMENT
STATE

ORIGINAL
PASS
≠
REPLICATION
PASS

SELF-
REVIEW
≠
INDEPENDENT
VERIFICATION

CONTROLLED
ENVIRONMENT
VALIDITY
≠
PRODUCTION
GENERALIZATION

TOOL
CALL
SUCCESS
≠
SIDE
EFFECT
VERIFIED

PROJECT A
AUTHORITY
≠
PROJECT B
AUTHORITY

TENANT
LABEL
≠
TENANT
ISOLATION

EXPERIMENT
COST
≠
PRODUCTION
TCO

RESULT
OBSERVED
≠
INTERPRETATION
CERTAIN

SUPPORTED
FOR
DEFINED
SCOPE
≠
UNIVERSALLY
PROVEN

EXPERIMENT
RECOMMENDATION
≠
IMPLEMENTATION
AUTHORIZATION

USER
PREFERENCE
EXPERIMENT
≠
PRODUCT-
MARKET
FIT

ARCHITECTURE
EXPERIMENT
SUCCESS
≠
ARCHITECTURE
APPROVAL

TECHNICAL
EXPERIMENT
SUCCESS
≠
ENGINEERING
AUTHORIZATION

EXPERIMENT
SUPPORTS
PROTOTYPE
≠
PROTOTYPE
VALIDATED

EXPERIMENT
SUCCESS
≠
PILOT
AUTHORIZED

EXPERIMENT
SUCCESS
≠
PRODUCTION
READINESS

EXPERIMENT
SUCCESS
≠
PRODUCTION
AUTHORIZATION

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

EXPERIMENT
FINDING
TRANSFERRED
≠
DOWNSTREAM
DECISION
APPROVED

OLD
EXPERIMENT
RESULT
≠
NEW
CONFIGURATION
RESULT

HALT
RECORDED
≠
EXECUTION
HALTED
UNTIL
VERIFIED

ETM8
≠
ETM9

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

# 171. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="et197"
## RESEARCH-LAB-CHG-20260815-096 — Experiment Template Established

| Field | Value |
|---|---|
| Date | 2026-08-15 |
| Change Type | `CREATED`, `TEMPLATES`, `EXPERIMENT-TEMPLATE`, `RESEARCH-METHOD`, `HYPOTHESES`, `VARIABLES`, `EXPERIMENT-GOVERNANCE`, `REPRODUCIBILITY`, `CAUSAL-BOUNDARIES`, `TENANT-ISOLATION`, `RUNTIME-TRUTH` |
| Impact | `I4 — Standardized Governed Research Experiment Protocol, Evidence and Analysis Contract` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Founder Approved | `NO EVIDENCE` |
| Canonical | `NO` |
| Experiment Runtime Implemented | `NOT PROVEN` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/templates/experiment-template.md`

### Documentation Truth

`RESEARCH_EXPERIMENT_TEMPLATE = CONTENT_COMPLETE_FOR_REVIEW`

### Templates Folder Truth

`RESEARCH_LAB_TEMPLATES_VISIBLE_FILES = 2 / 4 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`RESEARCH_EXPERIMENT_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_RESEARCH_EXPERIMENT_CONTROL_PLANE = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 172. Final Experiment Template Rule

Every Mianx.ai Research Experiment should conceptually preserve:

```text id="et198"
RESEARCH
QUESTION

↓

FALSIFIABLE
HYPOTHESIS

↓

DEFINED
SCOPE

↓

AUTHORIZATION

↓

CONTROLLED
DESIGN

↓

VARIABLES /
CONTROL /
TREATMENT

↓

AUTHORIZED
DATA

↓

PINNED
ENVIRONMENT /
CONFIGURATION

↓

DEFINED
PROTOCOL

↓

PRE-
DEFINED
METRICS /
HARD
GATES

↓

CONTROLLED
EXECUTION

↓

RAW
OBSERVATIONS /
EVIDENCE

↓

NEGATIVE /
NULL /
COUNTER-
EVIDENCE

↓

STATISTICAL /
QUALITATIVE
ANALYSIS

↓

CAUSAL
LIMITS

↓

VALIDITY /
LIMITATIONS

↓

REPLICATION /
CHALLENGE

↓

BOUNDED
CONCLUSION

↓

RECOMMENDATION
WITHOUT
FALSE
AUTHORITY

↓

KNOWLEDGE
TRANSFER /
REVALIDATION
```

while permanently preserving:

```text id="et199"
EXPERIMENT
≠
PROOF

HYPOTHESIS
SUPPORTED
≠
UNIVERSAL
TRUTH

CORRELATION
≠
CAUSATION

STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE

ONE
RUN
≠
RELIABILITY

EXPERIMENT
COMPLETION
≠
VALIDATION

EXPERIMENT
RESULT
≠
PRODUCTION
BEHAVIOR

EXPERIMENT
SUCCESS
≠
PRODUCT-
MARKET
FIT

EXPERIMENT
SUCCESS
≠
PROTOTYPE
VALIDATION

EXPERIMENT
SUCCESS
≠
PILOT
AUTHORIZATION

EXPERIMENT
SUCCESS
≠
PRODUCTION
AUTHORIZATION

TOOL
SUCCESS
≠
SIDE
EFFECT
VERIFIED

TENANT
LABEL
≠
TENANT
ISOLATION

CONSENSUS
≠
CORRECTNESS

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
FILESYSTEM
SAVE

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

# 173. Next Document

The screenshot-verified `templates/` sequence remains:

```text id="et200"
doc/26-research-lab/templates/
├── benchmark-template.md
├── experiment-template.md
├── publication-template.md
└── research-template.md
```

Current content-complete-for-review state:

```text id="et201"
benchmark-template.md
=
COMPLETE
FOR
REVIEW

experiment-template.md
=
COMPLETE
FOR
REVIEW

publication-template.md
=
NEXT

research-template.md
=
PENDING
```

The next exact document is:

```text id="et202"
doc/26-research-lab/templates/publication-template.md
```

---
