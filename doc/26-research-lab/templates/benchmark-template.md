---

id: RESEARCH-LAB-TEMPLATES-BENCHMARK-TEMPLATE-001
title: Mianx.ai Research Lab Templates — Benchmark Template
version: 1.0.0
status: Draft

description: Enterprise-grade reusable Benchmark documentation template for the Mianx.ai Research Lab. This template standardizes how Benchmark studies should define their purpose, Research Questions, scope, benchmark subject, baselines, comparators, Dataset and workload identity, configuration pinning, Models, Prompts, Agents, Multi-Agent systems, Tools, Memory, Retrieval, environments, metrics, scoring, hard gates, repeated trials, statistical methods, Evidence, Counter-Evidence, quality, safety, security, privacy, Responsible AI, Project and Tenant boundaries, cost, performance, reliability, scalability, reproducibility, contamination controls, evaluator design, Human review, results, limitations, incidents, HALT and Resume, conclusions, recommendations, transfer boundaries, monitoring and revalidation. It is designed to prevent benchmark gaming, unsupported comparisons, configuration ambiguity, hidden test leakage, unsafe aggregation, fabricated thresholds, false precision and inappropriate conversion of Benchmark results into Product, Architecture, Engineering or Production authorization.

type: Research Benchmark Documentation Template, Benchmark Protocol Template, Benchmark Evidence Record Template, AI and Agent Benchmark Template, Reproducibility Template, Benchmark Governance Template, and Benchmark Runtime Truth Boundary

class: Reusable Research documentation template. This file defines what a compliant Benchmark record should contain but does not itself execute, validate or authorize any Benchmark.

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Templates
specialization: Benchmark Template

parent: doc/26-research-lab/templates
path: doc/26-research-lab/templates/benchmark-template.md

owner: Mianx.ai Founder
authority: Founder and Enterprise Governance

highest_authority:
role: Founder
level: L0
final_enterprise_authority: true

stewards:

* Research Governance
* Benchmark Governance
* Research Methodology Governance
* Research Architecture Governance
* Model Evaluation Governance
* Prompt Research Governance
* Agent Research Governance
* Multi-Agent Governance
* Tool Governance
* Dataset Governance
* Security Governance
* Privacy Governance
* Responsible AI Governance
* Project Governance
* Tenant Governance
* Verification Governance
* Monitoring Governance
* Audit Governance
* Documentation Governance

maintainers:

* Research Lab
* Benchmarking Team
* Research Scientists
* Research Engineers
* Model Evaluation Team
* Prompt Research Team
* Agent Research Team
* Security Research
* Verification Engineering
* Documentation Governance

reviewers:

* Founder
* Research Governance
* Benchmark Governance
* Architecture Governance
* Security Governance
* Data Governance
* Privacy Governance
* Responsible AI Governance
* Verification Governance
* Documentation Governance

created: 2026-08-15
updated: 2026-08-15

classification: Internal

depends_on:

* ../README.md
* ../INDEX.md
* ../research-governance.md
* ../research-lifecycle.md
* ../research-security.md
* ../research-metrics.md
* ../research-checklists.md
* ../benchmarking/benchmark-suite.md
* ../benchmarking/comparison-metrics.md
* ../benchmarking/performance-benchmarks.md
* ../datasets/data-quality.md
* ../datasets/dataset-catalog.md
* ../datasets/dataset-governance.md
* ../experiments/experiment-design.md
* ../model-evaluation/evaluation-framework.md
* ../model-evaluation/quality-evaluation.md
* ../model-evaluation/safety-evaluation.md
* ../monitoring/audit-logs.md
* ../monitoring/research-monitoring.md
* ../prompt-research/prompt-benchmarks.md
* ../prompt-research/prompt-engineering.md
* ../security/research-security.md
* ../simulations/test-environments.md

related_documents:

* ./experiment-template.md
* ./publication-template.md
* ./research-template.md
* ../CHANGELOG.md

## canonical: false

# Mianx.ai Research Lab Templates — Benchmark Template

> **Purpose:** Use this file as the standard starting structure for a Mianx.ai Benchmark record.
>
> Replace all template markers before a Benchmark is submitted for review.
>
> Recommended placeholder convention:
>
> ```text id="bt001"
> [REQUIRED: value]
> [OPTIONAL: value]
> [NOT APPLICABLE: reason]
> [UNKNOWN: Evidence gap]
> ```
>
> Permanent:
>
> ```text id="bt002"
> BENCHMARK
> RESULT
> ≠
> UNIVERSAL
> TRUTH
>
> BENCHMARK
> PASS
> ≠
> PRODUCTION
> AUTHORIZATION
> ```

---

# 1. Template Usage Rules

Before using this template:

* Copy it into the appropriate Benchmark record location.
* Assign a unique Benchmark ID.
* Pin the Benchmark version.
* Replace every `[REQUIRED: ...]` marker.
* Remove instructional guidance that does not belong in the final record.
* Preserve all applicable Governance and truth boundaries.
* Do not fabricate missing measurements.
* Do not invent universal thresholds.
* Do not infer approval from silence.
* Do not label a Benchmark Production-ready unless separate Production evidence supports that claim.

Permanent:

```text id="bt003"
MISSING
EVIDENCE
MUST
REMAIN
MISSING
EVIDENCE

NOT
BE
REPLACED
BY
ASSUMPTION
```

---

# 2. Benchmark Document Front Matter Template

```yaml id="bt004"
---
id: [REQUIRED: BENCHMARK-ID]
title: [REQUIRED: Benchmark title]
version: [REQUIRED: semantic or controlled version]
status: Draft

benchmark_type: [REQUIRED: type]
benchmark_class: [REQUIRED: class]

research_question_refs:
  - [REQUIRED: RQ reference]

hypothesis_refs:
  - [OPTIONAL: hypothesis reference]

project_scope_refs:
  - [REQUIRED: Project scope]

tenant_scope_refs:
  - [REQUIRED or NOT APPLICABLE]

environment_ref: [REQUIRED]

dataset_refs:
  - [REQUIRED]

model_refs:
  - [OPTIONAL]

prompt_refs:
  - [OPTIONAL]

agent_refs:
  - [OPTIONAL]

tool_refs:
  - [OPTIONAL]

baseline_refs:
  - [REQUIRED]

comparator_refs:
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

# 3. Benchmark Identity

## 3.1 Benchmark ID

```text id="bt005"
[REQUIRED: BENCHMARK-XXXXXX]
```

## 3.2 Benchmark Version

```text id="bt006"
[REQUIRED: version]
```

## 3.3 Benchmark Title

```text id="bt007"
[REQUIRED: descriptive title]
```

## 3.4 Benchmark Owner

```text id="bt008"
[REQUIRED: accountable owner]
```

## 3.5 Benchmark Status

Select one:

```text id="bt009"
DRAFT

UNDER
REVIEW

READY
TO
RUN

RUNNING

COMPLETED

INVALIDATED

SUPERSEDED

ARCHIVED
```

Permanent:

```text id="bt010"
BENCHMARK
COMPLETED
≠
BENCHMARK
VALIDATED
```

---

# 4. Executive Summary

## 4.1 Purpose

[REQUIRED: Explain in concise terms what this Benchmark is intended to measure.]

## 4.2 Decision Supported

[REQUIRED: State what decision this Benchmark may inform.]

Examples:

* Model comparison.
* Prompt comparison.
* Agent architecture comparison.
* Tool integration comparison.
* Retrieval configuration comparison.
* system performance comparison.
* cost/quality trade-off.
* regression detection.
* safety assessment.
* architecture decision support.

## 4.3 What This Benchmark Does Not Decide

[REQUIRED: Define explicit non-authority.]

Example:

```text id="bt011"
THIS
BENCHMARK
DOES
NOT
BY
ITSELF
AUTHORIZE:

PRODUCTION
DEPLOYMENT

MODEL
PROMOTION

AGENT
AUTONOMY
INCREASE

TOOL
WRITE
AUTHORITY

ARCHITECTURE
MIGRATION

TENANT
ROLLOUT
```

---

# 5. Benchmark Objective

## 5.1 Primary Objective

[REQUIRED]

## 5.2 Secondary Objectives

[OPTIONAL]

## 5.3 Non-Objectives

[REQUIRED]

---

# 6. Research Question

## 6.1 Primary Research Question

```text id="bt012"
[REQUIRED: precise Benchmark Research Question]
```

## 6.2 Secondary Research Questions

```text id="bt013"
RQ-B1:
[OPTIONAL]

RQ-B2:
[OPTIONAL]
```

## 6.3 Research Question Boundary

Permanent:

```text id="bt014"
BENCHMARK
MUST
ANSWER
THE
DEFINED
QUESTION

NOT

EVERY
QUESTION
ABOUT
THE
SYSTEM
```

---

# 7. Hypotheses

## 7.1 Primary Hypothesis

```text id="bt015"
H1:
[OPTIONAL: falsifiable hypothesis]
```

## 7.2 Null or Comparator Hypothesis

```text id="bt016"
H0:
[OPTIONAL]
```

## 7.3 Hypothesis Boundary

```text id="bt017"
HYPOTHESIS
SUPPORTED
≠
HYPOTHESIS
PROVEN
UNIVERSALLY
```

---

# 8. Benchmark Scope

## 8.1 In Scope

* [REQUIRED]
* [REQUIRED]

## 8.2 Out of Scope

* [REQUIRED]
* [REQUIRED]

## 8.3 Project Scope

```text id="bt018"
[REQUIRED: Project IDs / Project class]
```

## 8.4 Tenant Scope

```text id="bt019"
[REQUIRED or NOT APPLICABLE]
```

## 8.5 Environment Scope

```text id="bt020"
[REQUIRED: Research / Sandbox / Test / Integration / Staging / other]
```

## 8.6 Scope Boundary

Permanent:

```text id="bt021"
BENCHMARK
CONCLUSION
MUST
NOT
EXCEED
BENCHMARK
SCOPE
```

---

# 9. Benchmark Type

Select or define:

```text id="bt022"
BT01
QUALITY

BT02
PERFORMANCE

BT03
COST

BT04
MODEL

BT05
PROMPT

BT06
AGENT

BT07
MULTI-
AGENT

BT08
TOOL

BT09
MEMORY /
RETRIEVAL

BT10
SAFETY

BT11
SECURITY

BT12
RELIABILITY

BT13
SCALABILITY

BT14
END-
TO-
END

BT15
REGRESSION

BT16
COMPOSITE
```

Selected type:

```text id="bt023"
[REQUIRED]
```

---

# 10. System Under Benchmark

## 10.1 Subject Identity

```text id="bt024"
[REQUIRED: stable system/component ID]
```

## 10.2 Subject Version

```text id="bt025"
[REQUIRED]
```

## 10.3 Subject Description

[REQUIRED]

## 10.4 Subject Components

| Component | ID  | Version | Real / Simulated / Mocked | Notes |
| --------- | --- | ------- | ------------------------- | ----- |
| Model     | [ ] | [ ]     | [ ]                       | [ ]   |
| Prompt    | [ ] | [ ]     | [ ]                       | [ ]   |
| Agent     | [ ] | [ ]     | [ ]                       | [ ]   |
| Tool      | [ ] | [ ]     | [ ]                       | [ ]   |
| Retrieval | [ ] | [ ]     | [ ]                       | [ ]   |
| Memory    | [ ] | [ ]     | [ ]                       | [ ]   |

---

# 11. Baseline

## 11.1 Baseline Identity

```text id="bt026"
[REQUIRED: baseline ID]
```

## 11.2 Baseline Version

```text id="bt027"
[REQUIRED]
```

## 11.3 Baseline Rationale

[REQUIRED]

## 11.4 Baseline Configuration

[REQUIRED]

Permanent:

```text id="bt028"
NO
BASELINE
≠
IMPROVEMENT
MEASURED
```

---

# 12. Comparators

Complete one row for each comparator.

| Comparator ID | Technology / Model / Prompt / Agent | Version    | Reason Included | Status     |
| ------------- | ----------------------------------- | ---------- | --------------- | ---------- |
| [REQUIRED]    | [REQUIRED]                          | [REQUIRED] | [REQUIRED]      | [REQUIRED] |

---

# 13. Fair Comparison Requirements

Comparators should be aligned where appropriate on:

* Dataset.
* task definition.
* output schema.
* environment.
* hardware.
* concurrency.
* time window.
* retry policy.
* Tool availability.
* context.
* Prompt objective.
* evaluation method.
* security restrictions.

Permanent:

```text id="bt029"
UNEQUAL
TEST
CONDITIONS
≠
FAIR
COMPARISON
```

---

# 14. Benchmark Workload

## 14.1 Workload ID

```text id="bt030"
[REQUIRED]
```

## 14.2 Workload Description

[REQUIRED]

## 14.3 Workload Distribution

[REQUIRED]

## 14.4 Representative Use Cases

* [REQUIRED]
* [REQUIRED]

## 14.5 Boundary Cases

* [REQUIRED]

## 14.6 Failure Cases

* [REQUIRED]

## 14.7 Adversarial Cases

* [REQUIRED where applicable]

Permanent:

```text id="bt031"
GENERIC
WORKLOAD
PERFORMANCE
≠
Mianx.ai
WORKLOAD
PERFORMANCE
```

---

# 15. Dataset

## 15.1 Dataset ID

```text id="bt032"
[REQUIRED]
```

## 15.2 Dataset Version

```text id="bt033"
[REQUIRED]
```

## 15.3 Dataset Purpose

[REQUIRED]

## 15.4 Dataset Source

[REQUIRED]

## 15.5 Dataset Provenance

[REQUIRED]

## 15.6 Dataset Rights

```text id="bt034"
[REQUIRED: authorization / license / permitted Research use]
```

## 15.7 Dataset Composition

| Split       | Purpose | Count | Notes |
| ----------- | ------: | ----: | ----- |
| Development |     [ ] |   [ ] | [ ]   |
| Validation  |     [ ] |   [ ] | [ ]   |
| Test        |     [ ] |   [ ] | [ ]   |
| Hidden      |     [ ] |   [ ] | [ ]   |
| Adversarial |     [ ] |   [ ] | [ ]   |

Do not invent counts if not established.

---

# 16. Dataset Quality

Assess:

* completeness.
* correctness.
* duplication.
* representativeness.
* class balance.
* subgroup coverage.
* tail cases.
* formatting consistency.
* stale records.
* label quality.
* provenance quality.

Dataset quality state:

```text id="bt035"
[REQUIRED]
```

---

# 17. Benchmark Contamination Control

Document whether Benchmark cases may have appeared in:

* training Data.
* fine-tuning Data.
* Prompt examples.
* public Benchmarks.
* Agent Memory.
* Retrieval index.
* evaluator calibration.
* prior optimization runs.

Contamination status:

```text id="bt036"
KNOWN
CLEAN

PARTIALLY
CONTROLLED

UNKNOWN

CONTAMINATED

NOT
APPLICABLE
```

Selected:

```text id="bt037"
[REQUIRED]
```

Permanent:

```text id="bt038"
BENCHMARK
CONTAMINATION
UNKNOWN
≠
BENCHMARK
CLEAN
```

---

# 18. Optimization Leakage

Document whether the system was tuned directly against the evaluation set.

```text id="bt039"
[REQUIRED]
```

Permanent:

```text id="bt040"
OPTIMIZED
ON
TEST
SET
≠
INDEPENDENT
EVALUATION
```

---

# 19. Hidden Test Sets

Where appropriate, hidden or rotating test cases should be used to reduce benchmark gaming.

Hidden-set design:

[OPTIONAL]

---

# 20. Configuration Identity

Create a stable configuration snapshot.

```yaml id="bt041"
benchmark_configuration:
  configuration_id: [REQUIRED]

  subject_version: [REQUIRED]
  baseline_version: [REQUIRED]

  environment_version: [REQUIRED]

  dataset_version: [REQUIRED]

  model_version: [OPTIONAL]
  prompt_version: [OPTIONAL]
  agent_version: [OPTIONAL]
  tool_version: [OPTIONAL]
  memory_version: [OPTIONAL]
  retrieval_version: [OPTIONAL]

  runtime_parameters:
    [REQUIRED where applicable]

  random_seed:
    [OPTIONAL]

  created_at: [REQUIRED]
```

---

# 21. Configuration Boundary

Permanent:

```text id="bt042"
SAME
SYSTEM
NAME
≠
SAME
BENCHMARK
CONFIGURATION
```

---

# 22. Model Configuration

Where Models are used, capture:

| Field                   | Value                       |
| ----------------------- | --------------------------- |
| Provider                | [REQUIRED]                  |
| Model ID                | [REQUIRED]                  |
| Version / Snapshot      | [REQUIRED where available]  |
| Temperature             | [REQUIRED where applicable] |
| Top-p                   | [OPTIONAL]                  |
| Max tokens              | [REQUIRED where applicable] |
| Reasoning configuration | [OPTIONAL]                  |
| Fallback                | [OPTIONAL]                  |
| Router                  | [OPTIONAL]                  |

Permanent:

```text id="bt043"
MODEL
ALIAS
SAME
≠
UNDERLYING
BEHAVIOR
GUARANTEED
SAME
```

---

# 23. Prompt Configuration

Capture:

| Field               | Value       |
| ------------------- | ----------- |
| Prompt ID           | [REQUIRED]  |
| Prompt version      | [REQUIRED]  |
| System instructions | [REFERENCE] |
| Examples            | [REFERENCE] |
| Context template    | [REFERENCE] |
| Output contract     | [REFERENCE] |

---

# 24. Agent Configuration

Capture where applicable:

```text id="bt044"
AGENT
ID

AGENT
VERSION

ROLE

MANDATE

AUTONOMY
CLASS

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

# 25. Multi-Agent Configuration

Capture:

```text id="bt045"
COORDINATOR

SPECIALISTS

DELEGATION

SHARED
CONTEXT

DISSENT

ARBITRATION

VERIFIER

SHARED
TOOLS

SHARED
MEMORY
```

Permanent:

```text id="bt046"
MULTI-
AGENT
CONSENSUS
≠
CORRECTNESS
```

---

# 26. Tool Configuration

For every Tool:

| Tool       | Version | Read / Write | Authorization | External Side Effect | Verification Method |
| ---------- | ------- | ------------ | ------------- | -------------------- | ------------------- |
| [REQUIRED] | [ ]     | [ ]          | [ ]           | [ ]                  | [ ]                 |

Permanent:

```text id="bt047"
TOOL
CALL
SUCCESS
≠
EXTERNAL
SIDE
EFFECT
VERIFIED
```

---

# 27. Memory Configuration

Document:

* Memory store.
* Memory version.
* write policy.
* read policy.
* freshness.
* Project scope.
* Tenant scope.
* provenance.
* deletion/reset behavior.

---

# 28. Retrieval Configuration

Document:

```text id="bt048"
INDEX

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

# 29. Environment

## 29.1 Environment ID

```text id="bt049"
[REQUIRED]
```

## 29.2 Environment Type

```text id="bt050"
[REQUIRED]
```

## 29.3 Environment Version

```text id="bt051"
[REQUIRED]
```

## 29.4 Infrastructure

[REQUIRED]

## 29.5 Environment Differences from Target Runtime

| Difference | Expected Impact | Material?  | Mitigation |
| ---------- | --------------- | ---------- | ---------- |
| [REQUIRED] | [REQUIRED]      | [REQUIRED] | [OPTIONAL] |

Permanent:

```text id="bt052"
TEST
ENVIRONMENT
≈
PRODUCTION
≠
PRODUCTION
```

---

# 30. Hardware and Resource Profile

Record where relevant:

```text id="bt053"
CPU

GPU

RAM

STORAGE

NETWORK

REGION

CONTAINER /
RUNTIME

CONCURRENCY
```

---

# 31. Benchmark Execution Protocol

Document exact steps:

```text id="bt054"
1.
PREPARE

2.
VERIFY
CONFIG

3.
RESET
STATE

4.
LOAD
DATA

5.
RUN
WARMUP
IF
REQUIRED

6.
EXECUTE
BENCHMARK

7.
CAPTURE
LOGS /
METRICS /
OUTPUTS

8.
VERIFY
SIDE
EFFECTS

9.
REPEAT
TRIALS

10.
ARCHIVE
EVIDENCE
```

Protocol details:

[REQUIRED]

---

# 32. Warmup

If used:

```text id="bt055"
WARMUP
COUNT:
[REQUIRED]

WARMUP
INCLUDED
IN
METRICS:
YES / NO
```

---

# 33. Trial Count

```text id="bt056"
[REQUIRED: number or justified method]
```

Do not invent a universal minimum.

---

# 34. Repeated Trials

Repeated trials are especially important for stochastic systems.

Permanent:

```text id="bt057"
ONE
SUCCESSFUL
RUN
≠
RELIABILITY
```

---

# 35. Randomness

Capture:

* random seed where supported.
* Model sampling settings.
* ordering randomness.
* Dataset shuffling.
* tool stochasticity.
* external service variability.

---

# 36. Determinism Boundary

```text id="bt058"
SAME
SEED
≠
BIT-
IDENTICAL
AI
OUTPUT
GUARANTEED
```

---

# 37. Metrics

Every metric should have:

```yaml id="bt059"
benchmark_metric:
  metric_id: [REQUIRED]
  name: [REQUIRED]

  definition: [REQUIRED]

  unit: [REQUIRED]

  direction:
    [HIGHER_IS_BETTER / LOWER_IS_BETTER / TARGET_RANGE]

  data_source: [REQUIRED]

  aggregation_method: [REQUIRED]

  subgroup_breakdown:
    [OPTIONAL]

  hard_gate: [YES / NO]

  threshold:
    [REQUIRED only if separately justified]

  rationale:
    [REQUIRED where threshold exists]
```

---

# 38. Metric Categories

Potential:

```text id="bt060"
CORRECTNESS

QUALITY

SAFETY

SECURITY

LATENCY

THROUGHPUT

COST

RELIABILITY

ROBUSTNESS

INSTRUCTION
FOLLOWING

GROUNDING

HALLUCINATION

TOOL
SUCCESS

SIDE-
EFFECT
VERIFICATION

TENANT
ISOLATION

USER
EXPERIENCE
```

---

# 39. Threshold Boundary

Permanent:

```text id="bt061"
THRESHOLD
NOT
DEFINED
BY
EVIDENCE /
GOVERNANCE
≠
THRESHOLD
MAY
BE
INVENTED
```

---

# 40. Hard Gates

Potential non-compensable gates:

```text id="bt062"
CROSS-
TENANT
LEAK

CRITICAL
SECURITY
FAILURE

UNAUTHORIZED
TOOL
WRITE

SECRET
EXPOSURE

UNSUPPORTED
APPROVAL
CLAIM

PROHIBITED
DATA
USE

CRITICAL
SAFETY
FAILURE
```

---

# 41. Hard-Gate Boundary

```text id="bt063"
HIGH
AVERAGE
SCORE
≠
HARD
GATE
FAILURE
OVERRIDDEN
```

---

# 42. Composite Scoring

If a composite score is used, define:

* individual metrics.
* normalization.
* weights.
* missing-data handling.
* hard gates.
* subgroup handling.
* uncertainty.
* rationale.

Permanent:

```text id="bt064"
COMPOSITE
SCORE
≠
TRUTH
```

---

# 43. Weighting

```text id="bt065"
[OPTIONAL: weighting scheme]
```

Permanent:

```text id="bt066"
WEIGHT
ASSIGNED
≠
OBJECTIVE
IMPORTANCE
PROVEN
```

---

# 44. Human Evaluation

If Human evaluation is used, document:

```text id="bt067"
RATER
QUALIFICATIONS

RATER
COUNT

BLINDING

RUBRIC

TRAINING

DISAGREEMENT
HANDLING

CONFLICT
OF
INTEREST

INTER-
RATER
AGREEMENT
METHOD
```

---

# 45. Human Evaluation Boundary

```text id="bt068"
HUMAN
RATER
PREFERENCE
≠
OBJECTIVE
SYSTEM
QUALITY
```

---

# 46. Model-as-Judge

If a Model evaluator is used, record:

| Field             | Value                                    |
| ----------------- | ---------------------------------------- |
| Judge Model       | [REQUIRED]                               |
| Version           | [REQUIRED]                               |
| Judge Prompt      | [REQUIRED]                               |
| Rubric            | [REQUIRED]                               |
| Calibration       | [REQUIRED]                               |
| Bias checks       | [REQUIRED]                               |
| Human cross-check | [OPTIONAL but recommended when material] |

Permanent:

```text id="bt069"
MODEL
JUDGE
SCORE
≠
GROUND
TRUTH
```

---

# 47. Evaluator Independence

Document whether evaluator and candidate share:

* provider.
* model family.
* training lineage.
* Prompt design.
* data exposure.

Potential risk:

```text id="bt070"
EVALUATOR
CORRELATION
CAN
DISTORT
COMPARISON
```

---

# 48. Correctness Evaluation

Define what counts as:

```text id="bt071"
CORRECT

PARTIALLY
CORRECT

INCORRECT

UNSCORABLE
```

for this Benchmark.

---

# 49. Semantic Correctness Boundary

```text id="bt072"
VALID
JSON /
SCHEMA
≠
SEMANTICALLY
CORRECT
```

---

# 50. Instruction-Following Evaluation

Assess:

* required actions.
* prohibited actions.
* format.
* scope.
* priorities.
* explicit constraints.
* authority.

---

# 51. Grounding Evaluation

Assess:

```text id="bt073"
SUPPORTED
CLAIM

UNSUPPORTED
CLAIM

MISATTRIBUTED
CLAIM

OUTDATED
CLAIM

INFERENCE
WITHOUT
LABEL
```

---

# 52. Citation Evaluation

Where citations are required:

* source exists.
* source is relevant.
* source supports claim.
* source is current enough.
* citation is correctly attached.

Permanent:

```text id="bt074"
CITATION
PRESENT
≠
CLAIM
SUPPORTED
```

---

# 53. Hallucination Evaluation

Potential types:

```text id="bt075"
FABRICATED
FACT

FABRICATED
SOURCE

FABRICATED
FILE
STATE

FABRICATED
TOOL
SUCCESS

FABRICATED
APPROVAL

FABRICATED
RUNTIME
STATE
```

---

# 54. Runtime Truth Evaluation

Benchmark should test distinctions where relevant:

```text id="bt076"
DOCUMENT
SAYS
IMPLEMENTED
≠
IMPLEMENTED

TOOL
SAYS
SUCCESS
≠
SIDE
EFFECT
VERIFIED

SCREENSHOT
SHOWS
UI
≠
BACKEND
STATE
VERIFIED

CHAT
GENERATED
FILE
≠
FILESYSTEM
SAVE
VERIFIED
```

---

# 55. Uncertainty Evaluation

Assess whether system appropriately:

```text id="bt077"
STATES
UNCERTAINTY

REQUESTS
CLARIFICATION

ABSTAINS

REFUSES

USES
FALLBACK

ESCALATES
```

---

# 56. Safety Evaluation

Define applicable safety dimensions:

* harmful output.
* unsafe Tool use.
* excessive autonomy.
* prohibited action.
* unsafe escalation.
* unsafe fallback.
* sensitive-domain behavior.

---

# 57. Safety Boundary

```text id="bt078"
AVERAGE
SAFE
BEHAVIOR
≠
TAIL
SAFETY
ACCEPTABLE
```

---

# 58. Security Evaluation

Potential:

```text id="bt079"
PROMPT
INJECTION

AUTHORITY
INJECTION

SECRET
EXFILTRATION

TOOL
ABUSE

RAG
POISONING

MEMORY
POISONING

TENANT
ESCAPE

SANDBOX
ESCAPE
```

---

# 59. Prompt Injection Benchmark

Capture:

* attack class.
* entry point.
* expected defense.
* observed behavior.
* Tool consequence.
* Data consequence.
* authority consequence.

---

# 60. Authority Injection Benchmark

Permanent:

```text id="bt080"
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

# 61. Tenant Isolation Benchmark

Test negative paths across:

```text id="bt081"
DATABASE

STORAGE

CACHE

QUEUE

MEMORY

VECTOR
INDEX

TOOLS

EXPORT

AUDIT
```

Permanent:

```text id="bt082"
TENANT
TAG
PRESENT
≠
TENANT
ISOLATION
VERIFIED
```

---

# 62. Project Isolation Benchmark

Test that Project A cannot obtain unauthorized Project B state.

---

# 63. Performance Metrics

Potential:

```text id="bt083"
P50

P90

P95

P99

MAX

THROUGHPUT

QUEUE
WAIT

TIME
TO
FIRST
TOKEN

TOTAL
COMPLETION
TIME
```

Use only metrics appropriate to the Benchmark.

---

# 64. Average/Tail Boundary

Permanent:

```text id="bt084"
GOOD
AVERAGE
LATENCY
≠
GOOD
TAIL
LATENCY
```

---

# 65. Throughput

Document:

* workload.
* concurrency.
* duration.
* rate control.
* failure treatment.

---

# 66. Scalability Benchmark

Potential dimensions:

```text id="bt085"
USERS

PROJECTS

TENANTS

AGENTS

TASKS

MODEL
CALLS

TOOLS

DATA
VOLUME
```

Permanent:

```text id="bt086"
TEST
SCALE
PASS
≠
PRODUCTION
SCALE
VERIFIED
```

---

# 67. Reliability Benchmark

Potential:

```text id="bt087"
SUCCESS
RATE

ERROR
RATE

RETRY
RATE

RECOVERY

DUPLICATE
ACTION

TIMEOUT

PARTIAL
FAILURE
```

---

# 68. Failure Injection

Where appropriate, test:

```text id="bt088"
MODEL
FAILURE

TOOL
FAILURE

DATABASE
FAILURE

QUEUE
FAILURE

NETWORK
FAILURE

RATE
LIMIT

TIMEOUT

STALE
MEMORY
```

---

# 69. Recovery Boundary

```text id="bt089"
RECOVERY
IN
BENCHMARK
≠
PRODUCTION
DISASTER
RECOVERY
VERIFIED
```

---

# 70. Cost Benchmark

Capture:

```text id="bt090"
MODEL
TOKENS

API
COST

COMPUTE

STORAGE

NETWORK

TOOL
COST

HUMAN
REVIEW

RETRY
COST
```

---

# 71. Cost Boundary

```text id="bt091"
BENCHMARK
UNIT
COST
≠
TOTAL
ENTERPRISE
COST
```

---

# 72. Cost/Quality Trade-Off

If relevant:

| Candidate | Quality | Cost | Latency | Safety | Notes |
| --------- | ------: | ---: | ------: | -----: | ----- |
| [ ]       |     [ ] |  [ ] |     [ ] |    [ ] | [ ]   |

---

# 73. Privacy Evaluation

Assess:

* unnecessary Data exposure.
* sensitive Data retention.
* external provider transmission.
* logging.
* deletion.
* Tenant scope.
* Human reviewer access.

---

# 74. Responsible AI Evaluation

Where applicable:

* subgroup performance.
* bias.
* accessibility.
* Human oversight.
* harmful autonomy.
* refusal behavior.
* manipulation risk.

---

# 75. Subgroup Analysis

Define relevant groups or cohorts:

```text id="bt092"
[REQUIRED where applicable]
```

Permanent:

```text id="bt093"
GOOD
AGGREGATE
RESULT
≠
GOOD
SUBGROUP
RESULT
```

---

# 76. Edge and Tail Cases

Examples:

* rare input format.
* extreme length.
* missing context.
* conflicting instructions.
* stale Knowledge.
* Tool outage.
* malformed Tool output.
* cross-Tenant request.
* authority spoofing.

---

# 77. Statistical Analysis

Use only methods appropriate to the Benchmark.

Potential:

```text id="bt094"
MEAN

MEDIAN

PERCENTILE

STANDARD
DEVIATION

CONFIDENCE
INTERVAL

EFFECT
SIZE

SIGNIFICANCE
TEST

BOOTSTRAP
```

---

# 78. Statistical Boundary

Permanent:

```text id="bt095"
STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE
```

---

# 79. Sample Size

Document:

```text id="bt096"
SAMPLE
SIZE:
[REQUIRED]

RATIONALE:
[REQUIRED]
```

Do not invent a universal sample size.

---

# 80. Confidence Intervals

If applicable:

```text id="bt097"
METHOD:
[REQUIRED]

CONFIDENCE
LEVEL:
[REQUIRED if used]

RATIONALE:
[REQUIRED]
```

---

# 81. Effect Size

Where comparative claims matter, report practical effect size where appropriate.

---

# 82. Multiple Comparisons

If many metrics or candidates are tested, document how false-positive risk is handled where relevant.

---

# 83. Ablation

Use ablation if causal understanding matters.

Potential:

```text id="bt098"
REMOVE
MEMORY

REMOVE
RETRIEVAL

REMOVE
TOOL

CHANGE
PROMPT

CHANGE
MODEL

REMOVE
VERIFIER

REMOVE
MULTI-
AGENT
STEP
```

Permanent:

```text id="bt099"
ABLATION
EFFECT
≠
REAL-
WORLD
CAUSALITY
PROVEN
```

---

# 84. Benchmark Gaming

Evaluate whether system can optimize visible score without delivering intended capability.

Potential:

```text id="bt100"
FORMAT
HACK

ANSWER
MEMORIZATION

TEST
SET
LEAKAGE

RATER
EXPLOIT

METRIC
EXPLOIT

SHORTCUT
BEHAVIOR
```

---

# 85. Anti-Goodhart Rule

Permanent:

```text id="bt101"
OPTIMIZING
BENCHMARK
SCORE
≠
OPTIMIZING
REAL
SYSTEM
VALUE
```

---

# 86. Regression Benchmark

For regression testing, record:

* prior version.
* new version.
* expected improvements.
* allowed regressions, if explicitly approved.
* protected dimensions.
* hard gates.

---

# 87. Regression Boundary

```text id="bt102"
NEW
VERSION
BETTER
OVERALL
≠
NO
CRITICAL
REGRESSION
```

---

# 88. Benchmark Execution Log

For each run:

```yaml id="bt103"
benchmark_run:
  run_id: [REQUIRED]

  benchmark_ref: [REQUIRED]
  benchmark_version: [REQUIRED]

  configuration_ref: [REQUIRED]

  started_at: [REQUIRED]
  completed_at: [REQUIRED]

  environment_ref: [REQUIRED]

  dataset_ref: [REQUIRED]

  model_ref: [OPTIONAL]
  prompt_ref: [OPTIONAL]
  agent_ref: [OPTIONAL]
  tool_ref: [OPTIONAL]

  result_artifact_refs:
    - [REQUIRED]

  log_refs:
    - [REQUIRED]

  incident_refs:
    - [OPTIONAL]

  status: [REQUIRED]
```

---

# 89. Raw Evidence

Preserve where appropriate:

* raw outputs.
* errors.
* logs.
* traces.
* metrics.
* scorer outputs.
* Human rating records.
* Tool side-effect read-back.
* screenshots where useful.
* configuration snapshots.

---

# 90. Evidence Chain

Conceptually:

```text id="bt104"
CLAIM

↓

METRIC /
OBSERVATION

↓

RUN

↓

CONFIG

↓

DATA

↓

ARTIFACT /
LOG

↓

SOURCE
EVIDENCE
```

---

# 91. Evidence Boundary

Permanent:

```text id="bt105"
SUMMARY
TABLE
≠
RAW
EVIDENCE
```

---

# 92. Expected Results

[OPTIONAL: Define expected pattern before execution.]

This should not be rewritten after seeing results without recording the change.

---

# 93. Observed Results

## 93.1 Primary Results

| Metric     | Baseline | Candidate | Difference | Uncertainty | Hard Gate | Result |
| ---------- | -------: | --------: | ---------: | ----------: | --------- | ------ |
| [REQUIRED] |      [ ] |       [ ] |        [ ] |         [ ] | [ ]       | [ ]    |

## 93.2 Secondary Results

[OPTIONAL]

---

# 94. Negative Results

Record failures explicitly.

```text id="bt106"
[REQUIRED: negative / failed / unexpected results]
```

Permanent:

```text id="bt107"
FAILED
BENCHMARK
CASE
≠
CASE
MAY
BE
REMOVED
WITHOUT
JUSTIFICATION
```

---

# 95. Counter-Evidence

Record Evidence that weakens the preferred conclusion.

```text id="bt108"
[REQUIRED]
```

---

# 96. Unexpected Findings

[OPTIONAL]

---

# 97. Result Validity

Assess:

```text id="bt109"
INTERNAL
VALIDITY

CONSTRUCT
VALIDITY

STATISTICAL
VALIDITY

EXTERNAL
VALIDITY

ECOLOGICAL
VALIDITY
WHERE
RELEVANT
```

Do not overclaim these labels.

---

# 98. Internal Validity

Potential threats:

* inconsistent config.
* scorer bug.
* data leakage.
* uncontrolled concurrency.
* state contamination.
* evaluator bias.
* missing logs.

---

# 99. External Validity

Potential threats:

* unrealistic Dataset.
* unrealistic traffic.
* mocked dependencies.
* synthetic Data.
* limited Project scope.
* limited Tenant scope.
* narrow language/domain coverage.

---

# 100. Construct Validity

Ask whether the metric actually measures the intended capability.

Permanent:

```text id="bt110"
METRIC
NAME
"QUALITY"
≠
QUALITY
FULLY
MEASURED
```

---

# 101. Benchmark Limitations

Required:

* [REQUIRED]
* [REQUIRED]
* [REQUIRED]

---

# 102. Known Evidence Gaps

```text id="bt111"
[REQUIRED]
```

Use `UNKNOWN` where Evidence is missing.

---

# 103. Invalidating Conditions

Benchmark result may be invalidated by:

```text id="bt112"
WRONG
CONFIG

WRONG
VERSION

SCORER
BUG

DATA
CONTAMINATION

TEST
LEAKAGE

UNAUTHORIZED
DATA

ENVIRONMENT
MISMATCH

MISSING
LOGS

FAILED
RESET

CROSS-
TENANT
STATE
LEAK

MATERIAL
MODEL
CHANGE
```

---

# 104. Invalidation Record

```yaml id="bt113"
benchmark_invalidation:
  invalidation_id: [REQUIRED]

  benchmark_ref: [REQUIRED]
  affected_run_refs:
    - [REQUIRED]

  reason: [REQUIRED]

  discovered_at: [REQUIRED]

  affected_claim_refs:
    - [REQUIRED]

  corrective_action_refs:
    - [REQUIRED]

  status: [REQUIRED]
```

---

# 105. Result State

Select:

```text id="bt114"
VALIDATED
FOR
DEFINED
BENCHMARK
SCOPE

PARTIALLY
VALIDATED

INCONCLUSIVE

NOT
VALIDATED

INVALIDATED
```

Selected:

```text id="bt115"
[REQUIRED]
```

---

# 106. Result Boundary

Permanent:

```text id="bt116"
VALIDATED
FOR
BENCHMARK
SCOPE
≠
VALIDATED
FOR
ALL
PRODUCTION
CONDITIONS
```

---

# 107. Benchmark Conclusion

## 107.1 Supported Claims

* [REQUIRED]

## 107.2 Unsupported Claims

* [REQUIRED]

## 107.3 Claims Requiring More Research

* [REQUIRED]

---

# 108. Recommendation

Select where applicable:

```text id="bt117"
NO
DECISION

REPEAT
BENCHMARK

EXPAND
BENCHMARK

RUN
EXPERIMENT

RUN
PROTOTYPE

RUN
SAFETY
EVALUATION

RUN
SECURITY
EVALUATION

CONTROLLED
PILOT
CANDIDATE

TECHNOLOGY
ASSESSMENT
INPUT

MODEL
EVALUATION
INPUT

PROMPT
OPTIMIZATION
INPUT
```

Recommendation:

```text id="bt118"
[REQUIRED]
```

---

# 109. Recommendation Boundary

Permanent:

```text id="bt119"
BENCHMARK
RECOMMENDATION
≠
IMPLEMENTATION
AUTHORIZATION
```

---

# 110. Production Boundary

```text id="bt120"
BENCHMARK
PASS

≠

PRODUCTION
READINESS

≠

PRODUCTION
AUTHORIZATION
```

---

# 111. Founder Authority Boundary

Permanent:

```text id="bt121"
BENCHMARK
ROUTED
TO
FOUNDER
≠
FOUNDER
APPROVED
```

And:

```text id="bt122"
SILENCE
≠
APPROVAL
```

---

# 112. Architecture Transfer

Benchmark Evidence may be transferred to Architecture as decision input.

Permanent:

```text id="bt123"
BENCHMARK
EVIDENCE
SUPPORTS
ARCHITECTURE
DECISION

≠

ARCHITECTURE
DECISION
APPROVED
```

---

# 113. Engineering Transfer

Benchmark Evidence may justify further Engineering work but does not authorize deployment.

---

# 114. Product Transfer

Benchmark superiority does not independently prove Product value.

Permanent:

```text id="bt124"
TECHNICALLY
BETTER
BENCHMARK
RESULT
≠
BETTER
PRODUCT
OUTCOME
PROVEN
```

---

# 115. Benchmark Revalidation

Potential triggers:

```text id="bt125"
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

ENVIRONMENT
CHANGE

SCORER
CHANGE

METRIC
CHANGE

SECURITY
CHANGE

PROJECT
CHANGE

TENANT
CHANGE
```

---

# 116. Revalidation Boundary

```text id="bt126"
OLD
BENCHMARK
PASS
≠
NEW
CONFIGURATION
PASS
```

---

# 117. Benchmark Drift

Track:

* Dataset drift.
* workload drift.
* Model drift.
* Prompt drift.
* Tool drift.
* production workload drift.
* metric drift.
* evaluator drift.

---

# 118. Evaluator Drift

Permanent:

```text id="bt127"
SAME
EVALUATOR
NAME
≠
SAME
EVALUATION
BEHAVIOR
OVER
TIME
```

---

# 119. Benchmark Monitoring

Potential:

```text id="bt128"
LATEST
RUN

PASS /
FAIL

REGRESSION

DRIFT

CONTAMINATION
STATUS

STALE
BENCHMARKS

INCIDENTS
```

---

# 120. Benchmark Audit Events

Potential:

```text id="bt129"
BENCHMARK
CREATED

CONFIG
CHANGED

DATASET
CHANGED

RUN
STARTED

RUN
COMPLETED

RESULT
CHANGED

HARD
GATE
FAILED

BENCHMARK
INVALIDATED

BENCHMARK
SUPERSEDED
```

---

# 121. Benchmark Incident Classes

Use or extend:

```text id="bt130"
BI01
DATA
CONTAMINATION

BI02
TEST
SET
LEAKAGE

BI03
UNAUTHORIZED
DATA
USE

BI04
PRODUCTION
CREDENTIAL
EXPOSURE

BI05
CROSS-
TENANT
ACCESS

BI06
SECRET
EXPOSURE

BI07
UNAUTHORIZED
TOOL
SIDE
EFFECT

BI08
SCORER
FAILURE

BI09
CONFIGURATION
MISMATCH

BI10
MISSING
EVIDENCE

BI11
BENCHMARK
GAMING

BI12
FALSE
APPROVAL
CLAIM

BI13
FALSE
PRODUCTION
READINESS
CLAIM

BI14
STALE
RESULT
USED
AS
CURRENT

BI15
BENCHMARK
MISREPRESENTED
AS
PRODUCTION
AUTHORIZATION
```

---

# 122. HALT Triggers

Potential:

```text id="bt131"
CROSS-
TENANT
LEAK

SECRET
EXPOSURE

UNAUTHORIZED
PRODUCTION
ACCESS

UNAUTHORIZED
REAL
WRITE

DATASET
CONTAMINATION

CRITICAL
SECURITY
FAILURE

SCORER
INVALIDATION

FALSE
AUTHORITY
```

---

# 123. HALT Boundary

Permanent:

```text id="bt132"
BENCHMARK
HALT
RECORDED
≠
RUNNERS /
AGENTS /
TOOLS
ACTUALLY
HALTED
UNTIL
VERIFIED
```

---

# 124. Resume Requirements

Before resuming:

* root cause identified.
* affected runs identified.
* invalid results quarantined.
* environment safe.
* Dataset safe.
* credentials safe.
* Project/Tenant boundaries safe.
* configuration corrected.
* authority current.
* resumption authorized where required.

---

# 125. Benchmark Completion Checklist

## Identity

* [ ] Benchmark ID assigned.
* [ ] version assigned.
* [ ] owner assigned.
* [ ] status current.
* [ ] Project scope defined.
* [ ] Tenant scope defined.

## Objective

* [ ] objective defined.
* [ ] Research Question defined.
* [ ] non-objectives defined.
* [ ] decision boundary defined.

## Comparison

* [ ] baseline defined.
* [ ] comparators defined.
* [ ] fair-comparison rules documented.
* [ ] target workload defined.

## Data

* [ ] Dataset ID recorded.
* [ ] Dataset version recorded.
* [ ] provenance recorded.
* [ ] rights/authorization recorded.
* [ ] contamination assessed.
* [ ] optimization leakage assessed.
* [ ] hidden-set strategy considered.

## Configuration

* [ ] environment pinned.
* [ ] hardware/resource profile pinned.
* [ ] Model pinned.
* [ ] Prompt pinned.
* [ ] Agent pinned.
* [ ] Tool configuration pinned.
* [ ] Memory/Retrieval pinned.
* [ ] randomness documented.

## Metrics

* [ ] metrics defined.
* [ ] units defined.
* [ ] aggregation defined.
* [ ] thresholds justified.
* [ ] hard gates separated.
* [ ] subgroup analysis defined.
* [ ] tail metrics considered.
* [ ] cost metrics defined where relevant.

## Evaluation

* [ ] scorer defined.
* [ ] Human evaluation documented where used.
* [ ] Model judge documented where used.
* [ ] evaluator independence considered.
* [ ] semantic correctness considered.
* [ ] grounding considered.
* [ ] hallucination considered.
* [ ] uncertainty considered.

## Security and Governance

* [ ] Prompt Injection evaluated where relevant.
* [ ] Authority Injection evaluated where relevant.
* [ ] Tool side effects verified where relevant.
* [ ] Tenant isolation tested where relevant.
* [ ] privacy assessed.
* [ ] Responsible AI assessed.
* [ ] hard gates defined.
* [ ] approval truth preserved.

## Execution

* [ ] execution protocol documented.
* [ ] trial count justified.
* [ ] raw Evidence preserved.
* [ ] logs preserved.
* [ ] configuration snapshot preserved.
* [ ] incidents recorded.

## Analysis

* [ ] statistical method justified.
* [ ] uncertainty reported.
* [ ] Counter-Evidence recorded.
* [ ] negative results recorded.
* [ ] validity threats assessed.
* [ ] limitations recorded.
* [ ] Evidence gaps recorded.

## Conclusion

* [ ] supported claims listed.
* [ ] unsupported claims listed.
* [ ] result state assigned.
* [ ] recommendation separated from approval.
* [ ] Production boundary preserved.
* [ ] revalidation triggers defined.

---

# 126. Minimum Benchmark Record

At minimum, a Benchmark intended for serious Research use should contain:

```text id="bt133"
BENCHMARK
ID

VERSION

PURPOSE

RESEARCH
QUESTION

SCOPE

SUBJECT

BASELINE

WORKLOAD

DATASET

CONFIGURATION

ENVIRONMENT

METRICS

HARD
GATES

EXECUTION
PROTOCOL

RAW
EVIDENCE

RESULTS

LIMITATIONS

CONCLUSION

REVALIDATION
TRIGGERS
```

---

# 127. Benchmark Quality Failure Classes

Potential:

```text id="bt134"
BTF01
UNDEFINED
QUESTION

BTF02
UNCONTROLLED
SCOPE

BTF03
MISSING
BASELINE

BTF04
UNFAIR
COMPARISON

BTF05
DATASET
QUALITY
FAILURE

BTF06
CONTAMINATION

BTF07
CONFIGURATION
MISMATCH

BTF08
METRIC
DESIGN
FAILURE

BTF09
SCORER
FAILURE

BTF10
STATISTICAL
FAILURE

BTF11
SUBGROUP
BLINDNESS

BTF12
TAIL
RISK
BLINDNESS

BTF13
BENCHMARK
GAMING

BTF14
REPRODUCIBILITY
FAILURE

BTF15
EVIDENCE
LOSS

BTF16
OVERGENERALIZATION

BTF17
RECOMMENDATION /
AUTHORITY
CONFUSION

BTF18
BENCHMARK /
PRODUCTION
AUTHORIZATION
CONFUSION
```

---

# 128. Positive Verification Scenarios

Future Benchmark tooling should verify at least:

```text id="bt135"
BTV-01
BENCHMARK
PASS
DOES
NOT
AUTO-
BECOME
PRODUCTION
AUTHORIZATION

BTV-02
BENCHMARK
COMPLETION
DOES
NOT
AUTO-
BECOME
VALIDATION

BTV-03
NO
BASELINE
DOES
NOT
AUTO-
BECOME
MEASURABLE
IMPROVEMENT

BTV-04
UNEQUAL
CONFIGURATION
DOES
NOT
AUTO-
BECOME
FAIR
COMPARISON

BTV-05
CONTAMINATION
UNKNOWN
DOES
NOT
AUTO-
BECOME
CLEAN

BTV-06
TEST
SET
OPTIMIZATION
DOES
NOT
AUTO-
BECOME
INDEPENDENT
EVALUATION

BTV-07
SAME
MODEL
ALIAS
DOES
NOT
AUTO-
BECOME
SAME
MODEL
BEHAVIOR

BTV-08
TOOL
SUCCESS
DOES
NOT
AUTO-
BECOME
SIDE
EFFECT
VERIFIED

BTV-09
ONE
SUCCESSFUL
RUN
DOES
NOT
AUTO-
BECOME
RELIABILITY

BTV-10
SAME
SEED
DOES
NOT
AUTO-
BECOME
EXACT
AI
REPRODUCIBILITY

BTV-11
COMPOSITE
SCORE
DOES
NOT
AUTO-
BECOME
TRUTH

BTV-12
MODEL
JUDGE
SCORE
DOES
NOT
AUTO-
BECOME
GROUND
TRUTH

BTV-13
SCHEMA
VALID
DOES
NOT
AUTO-
BECOME
SEMANTIC
CORRECTNESS

BTV-14
CITATION
PRESENT
DOES
NOT
AUTO-
BECOME
SUPPORTED
CLAIM

BTV-15
GOOD
AVERAGE
SAFETY
DOES
NOT
AUTO-
BECOME
TAIL
SAFETY

BTV-16
TENANT
LABEL
DOES
NOT
AUTO-
BECOME
TENANT
ISOLATION

BTV-17
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

BTV-18
STATISTICAL
SIGNIFICANCE
DOES
NOT
AUTO-
BECOME
PRACTICAL
SIGNIFICANCE

BTV-19
BENCHMARK
SCORE
OPTIMIZATION
DOES
NOT
AUTO-
BECOME
SYSTEM
VALUE

BTV-20
NEW
VERSION
BETTER
OVERALL
DOES
NOT
AUTO-
BECOME
NO
CRITICAL
REGRESSION

BTV-21
SUMMARY
TABLE
DOES
NOT
AUTO-
BECOME
RAW
EVIDENCE

BTV-22
VALIDATED
FOR
SCOPE
DOES
NOT
AUTO-
BECOME
UNIVERSALLY
VALIDATED

BTV-23
FOUNDER
ROUTING
DOES
NOT
AUTO-
BECOME
FOUNDER
APPROVAL

BTV-24
RECOMMENDATION
DOES
NOT
AUTO-
BECOME
IMPLEMENTATION
AUTHORIZATION

BTV-25
BENCHMARK
DOCUMENT
DOES
NOT
AUTO-
PROVE
BENCHMARK
RUNTIME
IMPLEMENTED
```

---

# 129. Benchmark Maturity Model

Conceptual:

```text id="bt136"
BTM0
=
TEMPLATE
DOCUMENTED

BTM1
=
BENCHMARK
IDENTITY /
SCOPE /
METRIC
MODELS
DEFINED

BTM2
=
DATASET /
CONFIG /
BASELINE /
EVIDENCE
CONTRACTS
DEFINED

BTM3
=
CONTROLLED
BENCHMARK
EXECUTION
IMPLEMENTED

BTM4
=
MODEL /
PROMPT /
AGENT /
TOOL /
DATA
BENCHMARKS
INTEGRATED

BTM5
=
SECURITY /
TENANT /
SAFETY /
HARD-
GATE
CONTROLS
INTEGRATED

BTM6
=
REPRODUCIBILITY /
STATISTICS /
MONITORING /
AUDIT
INTEGRATED

BTM7
=
CRITICAL
CONTAMINATION /
CONFIG /
AUTHORITY /
OVERGENERALIZATION
BOUNDARIES
VERIFIED

BTM8
=
CONTROLLED
BENCHMARK
PILOT
VERIFIED

BTM9
=
PRODUCTION-SCOPE
BENCHMARK
CONTROL
PLANE
SEPARATELY
AUTHORIZED
```

---

# 130. Maturity Boundary

Permanent:

```text id="bt137"
BTM8
≠
BTM9
```

---

# 131. Template Runtime Truth

This template defines a documentation contract only.

```text id="bt138"
BENCHMARK
TEMPLATE
AVAILABLE
=
DOCUMENTED
IN
CHAT

BENCHMARK
ENGINE
IMPLEMENTED
=
NOT_PROVEN

BENCHMARK
REGISTRY
IMPLEMENTED
=
NOT_PROVEN

BENCHMARK
AUTOMATION
IMPLEMENTED
=
NOT_PROVEN

BENCHMARK
DATASET
CONTROL
IMPLEMENTED
=
NOT_PROVEN

BENCHMARK
REPRODUCIBILITY
RUNTIME
=
NOT_PROVEN

BENCHMARK
SECURITY
HARD
GATES
IMPLEMENTED
=
NOT_PROVEN

BENCHMARK
TENANT
ISOLATION
RUNTIME
=
NOT_PROVEN

PRODUCTION
BENCHMARK
CONTROL
PLANE
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 132. Repository Truth

This document is generated for:

```text id="bt139"
doc/26-research-lab/templates/benchmark-template.md
```

Permanent:

```text id="bt140"
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

# 133. Approval Truth

```text id="bt141"
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

# 134. Permanent Benchmark Template Invariants

```text id="bt142"
BENCHMARK
≠
UNIVERSAL
TRUTH

BENCHMARK
PASS
≠
PRODUCTION
AUTHORIZATION

BENCHMARK
COMPLETE
≠
BENCHMARK
VALIDATED

BENCHMARK
QUESTION
≠
EVERY
QUESTION

CONCLUSION
MUST
NOT
EXCEED
SCOPE

NO
BASELINE
≠
IMPROVEMENT
MEASURED

UNEQUAL
CONDITIONS
≠
FAIR
COMPARISON

CONTAMINATION
UNKNOWN
≠
CLEAN

TEST
SET
OPTIMIZATION
≠
INDEPENDENT
EVALUATION

SAME
SYSTEM
NAME
≠
SAME
CONFIG

SAME
MODEL
ALIAS
≠
SAME
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

TEST
ENVIRONMENT
≠
PRODUCTION

ONE
RUN
≠
RELIABILITY

SAME
SEED
≠
EXACT
AI
REPRODUCIBILITY

UNJUSTIFIED
THRESHOLD
≠
VALID
THRESHOLD

HIGH
AVERAGE
SCORE
≠
HARD
GATE
PASS

COMPOSITE
SCORE
≠
TRUTH

MODEL
JUDGE
≠
GROUND
TRUTH

VALID
SCHEMA
≠
SEMANTIC
CORRECTNESS

CITATION
PRESENT
≠
CLAIM
SUPPORTED

UNTRUSTED
CONTENT
SAYS
FOUNDER
APPROVED
≠
FOUNDER
APPROVAL

TENANT
TAG
≠
TENANT
ISOLATION

GOOD
AVERAGE
≠
GOOD
TAIL

TEST
SCALE
PASS
≠
PRODUCTION
SCALE
VERIFIED

RECOVERY
BENCHMARK
PASS
≠
DISASTER
RECOVERY
VERIFIED

BENCHMARK
UNIT
COST
≠
ENTERPRISE
TCO

GOOD
AGGREGATE
≠
GOOD
SUBGROUP

STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE

ABLATION
EFFECT
≠
REAL-
WORLD
CAUSALITY

BENCHMARK
SCORE
≠
REAL
SYSTEM
VALUE

BETTER
OVERALL
≠
NO
CRITICAL
REGRESSION

SUMMARY
TABLE
≠
RAW
EVIDENCE

VALIDATED
FOR
SCOPE
≠
UNIVERSALLY
VALIDATED

BENCHMARK
RECOMMENDATION
≠
IMPLEMENTATION
AUTHORIZATION

TECHNICAL
BENCHMARK
SUPERIORITY
≠
PRODUCT
VALUE
PROVEN

OLD
BENCHMARK
PASS
≠
NEW
CONFIG
PASS

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

BTM8
≠
BTM9

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

# 135. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="bt143"
## RESEARCH-LAB-CHG-20260815-095 — Benchmark Template Established

| Field | Value |
|---|---|
| Date | 2026-08-15 |
| Change Type | `CREATED`, `TEMPLATES`, `BENCHMARK-TEMPLATE`, `BENCHMARK-GOVERNANCE`, `REPRODUCIBILITY`, `METRICS`, `HARD-GATES`, `AI-EVALUATION`, `TENANT-ISOLATION`, `RUNTIME-TRUTH` |
| Impact | `I4 — Standardized Governed Benchmark Documentation and Evidence Contract` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Founder Approved | `NO EVIDENCE` |
| Canonical | `NO` |
| Benchmark Runtime Implemented | `NOT PROVEN` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/templates/benchmark-template.md`

### Documentation Truth

`RESEARCH_BENCHMARK_TEMPLATE = CONTENT_COMPLETE_FOR_REVIEW`

### Templates Folder Truth

`RESEARCH_LAB_TEMPLATES_VISIBLE_FILES = 1 / 4 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`RESEARCH_BENCHMARK_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_BENCHMARK_CONTROL_PLANE = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 136. Final Benchmark Template Rule

Every Mianx.ai Benchmark should conceptually preserve:

```text id="bt144"
RESEARCH
QUESTION

↓

DEFINED
SCOPE

↓

PINNED
SUBJECT /
BASELINE /
COMPARATORS

↓

AUTHORIZED
DATASET /
WORKLOAD

↓

PINNED
CONFIG /
ENVIRONMENT

↓

DEFINED
METRICS /
HARD
GATES

↓

CONTROLLED
EXECUTION

↓

REPEATED
TRIALS /
OBSERVABILITY

↓

RAW
EVIDENCE

↓

STATISTICAL /
QUALITATIVE
ANALYSIS

↓

COUNTER-
EVIDENCE

↓

VALIDITY /
LIMITATIONS

↓

SUPPORTED
CLAIMS

↓

BOUNDED
RECOMMENDATION

↓

MONITOR /
REVALIDATE
```

while permanently preserving:

```text id="bt145"
BENCHMARK
RESULT
≠
UNIVERSAL
TRUTH

BENCHMARK
SUPERIORITY
≠
PRODUCT
SUPERIORITY

BENCHMARK
PASS
≠
ARCHITECTURE
APPROVAL

BENCHMARK
PASS
≠
MODEL
PROMOTION
AUTHORITY

BENCHMARK
PASS
≠
AGENT
AUTONOMY
AUTHORITY

BENCHMARK
PASS
≠
PRODUCTION
READINESS

BENCHMARK
PASS
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

# 137. Next Document

The screenshot-verified `templates/` sequence is:

```text id="bt146"
doc/26-research-lab/templates/
├── benchmark-template.md
├── experiment-template.md
├── publication-template.md
└── research-template.md
```

`benchmark-template.md` is now content-complete for review in the current documentation workflow.

The next exact document is:

```text id="bt147"
doc/26-research-lab/templates/experiment-template.md
```

---
