---

id: RESEARCH-LAB-COMPARISON-METRICS-001
title: Mianx.ai Research Lab Benchmarking — Comparison Metrics
version: 1.0.0
status: Draft

description: Enterprise-grade specification for the Mianx.ai Research Lab Comparison Metrics framework. This document defines how Mianx.ai should design, register, version, normalize, calculate, compare, interpret, govern and revalidate metrics used to compare Models, Foundation Models, Reasoning Models, Multimodal Models, Prompts, Agents, Multi-Agent Systems, Tools, retrieval systems, Memory systems, Automation workflows, Benchmark runs and end-to-end AI systems. It establishes metric identity, taxonomy, units, directionality, scales, denominators, aggregation, normalization, baselines, absolute and relative deltas, confidence intervals, statistical uncertainty, operational significance, quality metrics, correctness metrics, reliability metrics, hallucination metrics, Agent metrics, Tool metrics, Security metrics, safety metrics, latency metrics, throughput metrics, cost metrics, efficiency metrics, resource metrics, Project and Tenant isolation metrics, composite scores, hard gates, weighted scoring, Pareto analysis, ranking rules, evaluator uncertainty, missing Data, censored Data, outliers, metric segmentation, metric drift, version comparability, regression deltas, anti-Goodhart controls, dashboard semantics, decision boundaries and Runtime Truth. It permanently separates metric value from truth, measurement precision from measurement validity, metric improvement from system improvement, statistical significance from operational importance, percentage improvement from absolute value, average performance from tail behavior, composite score from absence of critical failures, ranking from universal superiority, correlation from causation, proxy metric from objective, zero observed violations from proof of perfect safety, Dashboard green status from Production authorization, Benchmark metric pass from deployment approval, controlled Pilot results from Production authorization, Founder routing from Founder approval, and documentation from implementation, testing, verification or Production authorization.

type: Comparison Metrics Framework, Benchmark Metric Registry Specification, Cross-System Evaluation Model, Statistical Comparison Framework, Composite Score and Hard-Gate Governance Specification, Runtime Truth Register, Controlled Pilot Boundary, and Production Authorization Boundary

class: Governed target-state Comparison Metrics specification defining how Mianx.ai should measure and compare AI Research subjects without asserting that a Metric Registry, comparison engine, statistical analysis service, metric normalization runtime, automated ranking system, regression comparison pipeline, Project/Tenant metric isolation system or Production evaluation platform is currently implemented

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Benchmarking
specialization: Comparison Metrics

parent: doc/26-research-lab/benchmarking
path: doc/26-research-lab/benchmarking/comparison-metrics.md

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
* Benchmark Governance
* Research Metrics Governance
* Research Quality
* Evidence Governance
* Experiment Governance
* Dataset Governance
* AI Research Governance
* Model Governance
* Agent Governance
* Tool Governance
* Security Governance
* Safety Governance
* Cost Governance
* Reliability Governance
* Performance Governance
* Project Governance
* Tenant Governance
* Audit Governance
* Verification Governance
* Production Governance
* Documentation Governance

maintainers:

* Benchmark Engineering
* Research Metrics Engineering
* Model Evaluation Engineering
* AI Research Team
* Agent Research Team
* Experiment Platform Engineering
* Dataset Engineering
* Performance Engineering
* Reliability Engineering
* Security Research Engineering
* Data Science
* Observability Engineering
* Quality Engineering
* Verification Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Research Governance
* Benchmark Governance
* Research Metrics Lead
* Research Quality
* AI Research Lead
* Agent Research Lead
* Model Governance
* Experiment Governance
* Dataset Governance
* Performance Governance
* Reliability Governance
* Security Governance
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
* AI Researchers
* Model Researchers
* Agent Researchers
* Benchmark Engineers
* Data Scientists
* Experiment Engineers
* Dataset Engineers
* Performance Engineers
* Reliability Engineers
* Security Researchers
* Product Leaders
* Enterprise Architects
* Quality Engineers
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
* ../architecture/data-flow.md
* ../architecture/lab-architecture.md
* ../architecture/research-framework.md
* ../architecture/system-architecture.md
* ./benchmark-suite.md
* ../ai-research/foundation-models.md
* ../ai-research/multimodal-ai.md
* ../ai-research/reasoning-models.md
* ../agent-research/agent-behavior.md
* ../agent-research/autonomous-agents.md
* ../agent-research/multi-agent-research.md
* ../../01-governance/
* ../../08-data/
* ../../09-security/
* ../../16-knowledge/
* ../../19-ai-workforce/
* ../../20-ai-operating-system/
* ../../21-memory-engine/
* ../../22-agent-framework/
* ../../23-multi-agent-system/
* ../../24-automation-engine/
* ../../25-intelligence-engine/

related_documents:

* ./performance-benchmarks.md
* ../datasets/
* ../experiments/
* ../model-evaluation/
* ../monitoring/
* ../security/
* ../simulations/
* ../technology-radar/
* ../CHANGELOG.md

review_cycle:

* At Every Material Metric Definition Change
* At Every Metric Unit or Directionality Change
* At Every Benchmark Scoring Change
* At Every Composite Score Weight Change
* At Every Hard-Gate Threshold Change
* At Every Ranking Methodology Change
* At Every Metric Normalization Change
* At Every Material Statistical Comparison Change
* At Every Project or Tenant Segmentation Change
* Before Metrics Are Used as Production Gates
* Quarterly During Active Metrics Development
* Annually During Stable Operation

## canonical: false

# Mianx.ai Research Lab Benchmarking — Comparison Metrics

> **This document defines how Mianx.ai should compare Research subjects using metrics without allowing numbers to become false authority.**
>
> Metrics are useful only when their meaning is explicit.
>
> A metric without:
>
> * a definition;
> * a unit;
> * a denominator;
> * a scope;
> * a Dataset;
> * a version;
> * and an interpretation boundary
>
> can easily produce false confidence.
>
> Mianx.ai should therefore treat metric design as part of Research methodology, not merely Dashboard formatting.

---

# 1. Purpose

The Comparison Metrics framework should allow Mianx.ai to answer:

```text id="cmt001"
WHAT
IS
BEING
MEASURED?

↓

HOW
IS
IT
CALCULATED?

↓

IN
WHAT
UNIT?

↓

OVER
WHICH
CASES?

↓

UNDER
WHICH
CONFIGURATION?

↓

AGAINST
WHAT
BASELINE?

↓

WITH
WHAT
UNCERTAINTY?

↓

DOES
THE
DIFFERENCE
MATTER?

↓

DO
CRITICAL
FAILURES
OVERRIDE
AVERAGES?

↓

IS
THE
COMPARISON
VALID
FOR
THE
DECISION?
```

---

# 2. Core Metric Principle

Permanent:

```text id="cmt002"
METRIC
VALUE
≠
TRUTH
```

---

# 3. Measurement Validity Boundary

```text id="cmt003"
MEASUREMENT
PRECISE
≠
MEASUREMENT
VALID
```

---

# 4. Improvement Boundary

Permanent:

```text id="cmt004"
METRIC
IMPROVED
≠
SYSTEM
IMPROVED
```

---

# 5. Statistical Boundary

```text id="cmt005"
STATISTICALLY
SIGNIFICANT
≠
OPERATIONALLY
IMPORTANT
```

---

# 6. Composite Score Boundary

Permanent:

```text id="cmt006"
HIGH
COMPOSITE
SCORE
≠
NO
CRITICAL
FAILURES
```

---

# 7. Ranking Boundary

```text id="cmt007"
RANK
#1
≠
UNIVERSALLY
BEST
```

---

# 8. Correlation Boundary

Permanent:

```text id="cmt008"
METRIC A
CORRELATES
WITH
OUTCOME B
≠
METRIC A
CAUSES
OUTCOME B
```

---

# 9. Metric Framework Mission

```text id="cmt009"
DEFINE

↓

VERSION

↓

MEASURE

↓

NORMALIZE

↓

SEGMENT

↓

COMPARE

↓

QUANTIFY
UNCERTAINTY

↓

INTERPRET

↓

APPLY
HARD
GATES

↓

DECIDE
WITHIN
DEFINED
SCOPE

↓

REVALIDATE
```

---

# 10. Metric Taxonomy

Potential:

```text id="cmt010"
MT01
QUALITY

MT02
CORRECTNESS

MT03
RELIABILITY

MT04
CONSISTENCY

MT05
HALLUCINATION

MT06
REASONING

MT07
AGENT

MT08
TOOL
USE

MT09
SAFETY

MT10
SECURITY

MT11
LATENCY

MT12
THROUGHPUT

MT13
COST

MT14
EFFICIENCY

MT15
RESOURCE
UTILIZATION

MT16
ROBUSTNESS

MT17
PROJECT
ISOLATION

MT18
TENANT
ISOLATION

MT19
HUMAN
INTERVENTION

MT20
REGRESSION
```

---

# 11. Metric Identity

Every material metric should have stable identity.

```yaml id="cmt011"
comparison_metric:
  metric_id: required
  version: required

  name: required
  description: required

  metric_family: required

  unit: required
  scale_type: required

  direction: required

  numerator_definition: conditional
  denominator_definition: conditional

  aggregation_method: required

  missing_data_policy: required

  outlier_policy: conditional

  applicability_scope: required

  owner_ref: required

  status: required
```

---

# 12. Metric Version Boundary

Permanent:

```text id="cmt012"
SAME
METRIC
NAME
≠
SAME
METRIC
DEFINITION
```

---

# 13. Metric Unit

Examples:

```text id="cmt013"
PERCENT

COUNT

SECONDS

MILLISECONDS

TOKENS

REQUESTS /
SECOND

CURRENCY /
TASK

ERRORS /
1000
TASKS

BOOLEAN
PASS /
FAIL
```

---

# 14. Unit Boundary

```text id="cmt014"
VALUE
50
WITHOUT
UNIT
≠
INTERPRETABLE
METRIC
```

---

# 15. Metric Directionality

Potential:

```text id="cmt015"
HIGHER
IS
BETTER

LOWER
IS
BETTER

TARGET
RANGE

HARD
PASS /
FAIL

INFORMATIONAL
ONLY
```

---

# 16. Directionality Boundary

Permanent:

```text id="cmt016"
HIGHER
NUMBER
≠
BETTER
UNLESS
METRIC
DEFINITION
SAYS
SO
```

---

# 17. Metric Scale Types

Potential:

```text id="cmt017"
NOMINAL

ORDINAL

INTERVAL

RATIO

BOOLEAN

PROBABILITY

COMPOSITE
```

---

# 18. Scale Boundary

```text id="cmt018"
NUMERIC
LABEL
≠
RATIO
SCALE
```

A 4/5 quality rating is not necessarily twice a 2/5 rating.

---

# 19. Numerator and Denominator

Rate metrics should define both explicitly.

Example:

```text id="cmt019"
TASK
SUCCESS
RATE

=

SUCCESSFUL
TASKS

/

ELIGIBLE
TASKS
```

---

# 20. Denominator Boundary

Permanent:

```text id="cmt020"
NUMERATOR
UNCHANGED
+
DENOMINATOR
CHANGED

=
METRIC
MAY
CHANGE
WITHOUT
SYSTEM
CHANGE
```

---

# 21. Eligibility Rules

A metric should define which cases are:

* included.
* excluded.
* invalid.
* cancelled.
* unknown.

---

# 22. Exclusion Boundary

```text id="cmt022"
CASE
EXCLUDED
FROM
METRIC
≠
CASE
DISAPPEARS
FROM
AUDIT
```

---

# 23. Quality Metrics

Potential:

```text id="cmt023"
CORRECTNESS

COMPLETENESS

RELEVANCE

CLARITY

INSTRUCTION
ADHERENCE

FORMAT
CORRECTNESS

DOMAIN
QUALITY
```

---

# 24. Quality Boundary

Permanent:

```text id="cmt024"
OUTPUT
WELL
WRITTEN
≠
OUTPUT
CORRECT
```

---

# 25. Correctness Metric

Potential:

```text id="cmt025"
VERIFIED
CORRECT
CASES

/

CASES
WITH
VERIFIABLE
GROUND
REFERENCE
```

---

# 26. Correctness Boundary

```text id="cmt026"
EVALUATOR
MARKED
CORRECT
≠
GROUND
TRUTH
CORRECT
UNLESS
EVALUATOR
VALIDITY
ESTABLISHED
```

---

# 27. Partial Correctness

Some tasks may require graded Results.

Potential states:

```text id="cmt027"
CORRECT

PARTIALLY
CORRECT

INCORRECT

UNVERIFIABLE

AMBIGUOUS
```

---

# 28. Partial Credit Boundary

Permanent:

```text id="cmt028"
PARTIAL
CREDIT
SCHEME
≠
OBJECTIVE
SCHEME
AUTOMATICALLY
```

---

# 29. Factuality

Potential measurement:

* supported claims.
* unsupported claims.
* contradicted claims.
* unverifiable claims.

---

# 30. Hallucination Rate

Conceptually:

```text id="cmt030"
UNSUPPORTED /
FABRICATED
MATERIAL
CLAIMS

/

MATERIAL
CLAIMS
ASSESSED
```

Exact operational definition must be versioned.

---

# 31. Hallucination Boundary

```text id="cmt031"
LOW
HALLUCINATION
RATE
≠
ALL
OUTPUT
SAFE
```

---

# 32. Critical Hallucination

Certain hallucinations should be classified separately:

* fake Founder approval.
* fake payment status.
* fake deployment status.
* fake legal authority.
* fake Security state.
* fake customer Data.

---

# 33. Critical Failure Boundary

Permanent:

```text id="cmt033"
ONE
CRITICAL
HALLUCINATION
CANNOT
BE
HIDDEN
BY
99%
GENERAL
QUALITY
```

---

# 34. Reliability Metrics

Potential:

```text id="cmt034"
FIRST-PASS
SUCCESS

EVENTUAL
SUCCESS

FAILURE
RATE

TIMEOUT
RATE

RETRY
RATE

RECOVERY
RATE

UNKNOWN
OUTCOME
RATE

CONSISTENCY
```

---

# 35. First-Pass Success

```text id="cmt035"
SUCCESS
WITHOUT
RETRY /
HUMAN
CORRECTION

/

ELIGIBLE
TASKS
```

---

# 36. Eventual Success

May include:

* retries.
* fallback.
* Human intervention.

---

# 37. Reliability Boundary

Permanent:

```text id="cmt037"
EVENTUAL
SUCCESS
≈
100%

≠

SYSTEM
RELIABLE
IF
EVERY
TASK
REQUIRES
5
RETRIES
```

---

# 38. Retry Rate

Potential:

```text id="cmt038"
TASKS
WITH
ONE
OR
MORE
RETRIES

/

ELIGIBLE
TASKS
```

---

# 39. Unknown Outcome Rate

Important for side-effecting workflows.

---

# 40. Unknown Outcome Boundary

```text id="cmt040"
UNKNOWN
OUTCOME
RATE
LOW
≠
UNKNOWN
OUTCOMES
LOW
RISK
```

Severity matters.

---

# 41. Consistency

Measure variance across repeated equivalent tasks.

---

# 42. Consistency Boundary

Permanent:

```text id="cmt042"
CONSISTENT
OUTPUT
≠
CORRECT
OUTPUT
```

---

# 43. Agent Metrics

Potential:

```text id="cmt043"
TASK
SUCCESS

POLICY
COMPLIANCE

AUTHORITY
COMPLIANCE

TOOL
SELECTION
QUALITY

ESCALATION
QUALITY

DELEGATION
QUALITY

RECOVERY

LONG-
HORIZON
COMPLETION

GOAL
DRIFT

SCOPE
DRIFT

HUMAN
INTERVENTION
```

---

# 44. Agent Task Success

Agent success should consider:

```text id="cmt044"
CORRECT
OUTCOME

+

CONSTRAINT
COMPLIANCE

+

AUTHORIZED
PROCESS

+

ACCEPTABLE
QUALITY
```

---

# 45. Agent Success Boundary

Permanent:

```text id="cmt045"
TASK
COMPLETED
≠
TASK
SUCCESSFUL
IF
METHOD
WAS
UNAUTHORIZED
```

---

# 46. Authority Compliance Metric

Potential:

```text id="cmt046"
AUTHORIZED
ACTIONS
AND
CORRECT
DENIALS

/

AUTHORITY-
SENSITIVE
DECISIONS
```

---

# 47. Authority Metric Boundary

```text id="cmt047"
99.9%
AUTHORITY
COMPLIANCE
≠
ACCEPTABLE
IF
0.1%
IS
UNAUTHORIZED
PRODUCTION
DELETE
```

---

# 48. Escalation Metrics

Potential:

* required escalations made.
* unnecessary escalations.
* missed escalations.
* escalation latency.

---

# 49. Escalation Precision

Conceptually:

```text id="cmt049"
CORRECT
ESCALATIONS

/

ALL
ESCALATIONS
```

---

# 50. Escalation Recall

Conceptually:

```text id="cmt050"
CORRECT
ESCALATIONS

/

ALL
CASES
REQUIRING
ESCALATION
```

---

# 51. Escalation Boundary

Permanent:

```text id="cmt051"
HIGH
ESCALATION
RATE
≠
SAFER
AGENT
AUTOMATICALLY
```

---

# 52. Tool-Use Metrics

Potential:

```text id="cmt052"
TOOL
SELECTION
ACCURACY

TOOL
CALL
SUCCESS

ARGUMENT
CORRECTNESS

TOOL
MISUSE
RATE

RETRY
SAFETY

SIDE-
EFFECT
ERROR
RATE
```

---

# 53. Tool Success Boundary

```text id="cmt053"
TOOL
CALL
HTTP
200
≠
BUSINESS
OUTCOME
CORRECT
```

---

# 54. Tool Misuse

Potential misuse:

* unauthorized Tool.
* wrong Tool.
* wrong parameters.
* unsafe retry.
* unnecessary external egress.
* excessive Tool calls.

---

# 55. Tool Efficiency

Potential:

```text id="cmt055"
USEFUL
TOOL
CALLS

/

TOTAL
TOOL
CALLS
```

with careful definition.

---

# 56. Model Metrics

Potential:

```text id="cmt056"
TASK
QUALITY

HALLUCINATION

CONTEXT
RELIABILITY

STRUCTURED
OUTPUT

TOOL
CALLING

REASONING

COST

LATENCY

AVAILABILITY
```

---

# 57. Model Metric Boundary

Permanent:

```text id="cmt057"
MODEL
HIGHER
ON
ONE
METRIC
≠
MODEL
BETTER
OVERALL
```

---

# 58. Prompt Metrics

Potential:

* task success.
* format adherence.
* verbosity.
* hallucination.
* Tool invocation.
* token cost.
* Security resilience.

---

# 59. Prompt Metric Boundary

```text id="cmt059"
SHORTER
PROMPT
≠
BETTER
PROMPT
IF
QUALITY
FALLS
```

---

# 60. Multi-Agent Metrics

Potential:

```text id="cmt060"
TEAM
TASK
SUCCESS

DELEGATION
EFFICIENCY

COMMUNICATION
OVERHEAD

CONSENSUS
ACCURACY

DEADLOCK
RATE

DUPLICATE
WORK

RESOURCE
AMPLIFICATION

CROSS-
AGENT
LEAKAGE
```

---

# 61. Multi-Agent Efficiency

Potential:

```text id="cmt061"
SINGLE-
AGENT
BASELINE
COST

VS

MULTI-
AGENT
TOTAL
COST
```

with corresponding quality delta.

---

# 62. Consensus Boundary

Permanent:

```text id="cmt062"
HIGH
AGENT
AGREEMENT
≠
HIGH
CORRECTNESS
```

---

# 63. Safety Metrics

Potential:

* unsafe compliance rate.
* unnecessary refusal rate.
* sensitive output rate.
* high-risk action recommendation rate.

---

# 64. Safety Metric Boundary

```text id="cmt064"
LOW
UNSAFE
COMPLIANCE
≠
GOOD
SAFETY
IF
MODEL
REFUSES
EVERYTHING
```

---

# 65. Refusal Quality

Safety evaluation should balance:

```text id="cmt065"
UNSAFE
COMPLIANCE

AND

EXCESSIVE
REFUSAL
```

---

# 66. Security Metrics

Potential:

```text id="cmt066"
PROMPT
INJECTION
SUCCESS
RATE

AUTHORITY
INJECTION
SUCCESS
RATE

SECRET
LEAKAGE
RATE

UNAUTHORIZED
TOOL
ACTION
RATE

PROJECT
LEAKAGE
RATE

TENANT
LEAKAGE
RATE

SECURITY
ESCALATION
RATE
```

---

# 67. Security Metric Direction

Most Security violation metrics:

```text id="cmt067"
LOWER
IS
BETTER
```

with some zero-tolerance hard-gate cases.

---

# 68. Zero Observed Violations Boundary

Permanent:

```text id="cmt068"
ZERO
VIOLATIONS
OBSERVED
≠
ZERO
VIOLATIONS
POSSIBLE
```

---

# 69. Project Isolation Metrics

Potential:

```text id="cmt069"
CROSS-
PROJECT
ACCESS
ATTEMPTS

BLOCKED
CROSS-
PROJECT
ATTEMPTS

CONFIRMED
CROSS-
PROJECT
LEAKS
```

---

# 70. Tenant Isolation Metrics

Potential:

```text id="cmt070"
CROSS-
TENANT
ACCESS
ATTEMPTS

BLOCKED
CROSS-
TENANT
ATTEMPTS

CONFIRMED
CROSS-
TENANT
LEAKS
```

---

# 71. Isolation Hard Gate

Permanent:

```text id="cmt071"
CONFIRMED
CROSS-
TENANT
LEAKAGE

MUST
NOT
BE
AVERAGED
WITH

QUALITY /
LATENCY /
COST
```

---

# 72. Latency Metrics

Potential:

```text id="cmt072"
TIME
TO
FIRST
TOKEN

MODEL
LATENCY

TOOL
LATENCY

END-TO-END
LATENCY

QUEUE
WAIT

P50

P95

P99

MAX
```

---

# 73. Average Latency Boundary

```text id="cmt073"
LOW
AVERAGE
LATENCY
≠
GOOD
TAIL
LATENCY
```

---

# 74. End-to-End Latency

Conceptually:

```text id="cmt074"
QUEUE

+

MODEL

+

TOOLS

+

RETRIEVAL

+

VERIFICATION

+

POST-
PROCESSING
```

---

# 75. Throughput Metrics

Potential:

```text id="cmt075"
REQUESTS /
SECOND

TASKS /
MINUTE

TOKENS /
SECOND

AGENT
TASKS /
HOUR

WORKFLOWS /
HOUR
```

---

# 76. Throughput Boundary

Permanent:

```text id="cmt076"
HIGH
THROUGHPUT
≠
HIGH
QUALITY
```

---

# 77. Cost Metrics

Potential:

```text id="cmt077"
MODEL
COST /
REQUEST

MODEL
COST /
TASK

TOTAL
TASK
COST

COST /
CORRECT
TASK

COST /
VERIFIED
CORRECT
TASK

TOOL
COST

HUMAN
REVIEW
COST

RETRY
COST
```

---

# 78. Total Task Cost

Potential:

```text id="cmt078"
MODEL

+

TOOLS

+

RETRIEVAL

+

COMPUTE

+

RETRIES

+

HUMAN
INTERVENTION

+

INFRASTRUCTURE
```

---

# 79. Token Cost Boundary

Permanent:

```text id="cmt079"
LOWER
TOKEN
PRICE
≠
LOWER
TOTAL
TASK
COST
```

---

# 80. Cost per Correct Task

Potential:

```text id="cmt080"
TOTAL
COST

/

CORRECT
TASKS
```

---

# 81. Cost per Verified Correct Task

Potentially stronger:

```text id="cmt081"
TOTAL
COST

/

VERIFIED
CORRECT
TASKS
```

---

# 82. Cost Boundary

```text id="cmt082"
CHEAPEST
SYSTEM
≠
BEST
VALUE
SYSTEM
```

---

# 83. Efficiency Metrics

Efficiency may combine output value with resource consumption.

Potential:

* quality per dollar.
* successful tasks per token.
* verified correct tasks per second.
* quality per GPU-hour.

---

# 84. Efficiency Boundary

Permanent:

```text id="cmt084"
EFFICIENCY
RATIO
HIGH
≠
ABSOLUTE
QUALITY
SUFFICIENT
```

---

# 85. Resource Utilization

Potential:

```text id="cmt085"
CPU
UTILIZATION

GPU
UTILIZATION

MEMORY

NETWORK

STORAGE

QUEUE
DEPTH

CONCURRENCY
```

---

# 86. Utilization Boundary

```text id="cmt086"
100%
RESOURCE
UTILIZATION
≠
GOOD
SYSTEM
STATE
```

---

# 87. Availability Metrics

Potential:

* provider availability.
* Tool availability.
* Model availability.
* workflow availability.

---

# 88. Availability Boundary

Permanent:

```text id="cmt088"
SERVICE
AVAILABLE
≠
SERVICE
CORRECT
```

---

# 89. Robustness Metrics

Test performance under:

* noisy Data.
* malformed input.
* Tool failure.
* provider failure.
* ambiguous instructions.
* long context.
* adversarial inputs.

---

# 90. Robustness Delta

Potential:

```text id="cmt090"
CLEAN
PERFORMANCE

-

STRESSED
PERFORMANCE
```

---

# 91. Robustness Boundary

```text id="cmt091"
SMALL
AVERAGE
ROBUSTNESS
DROP
≠
NO
CATASTROPHIC
EDGE
CASE
```

---

# 92. Human Intervention Metrics

Potential:

```text id="cmt092"
HUMAN
INTERVENTION
RATE

HUMAN
CORRECTION
RATE

ESCALATION
RESPONSE
TIME

HUMAN
REVIEW
TIME
```

---

# 93. Human Intervention Boundary

Permanent:

```text id="cmt093"
LOWER
HUMAN
INTERVENTION
≠
BETTER
IF
FAILURES
ARE
MISSED
```

---

# 94. Autonomy Efficiency

Potential:

```text id="cmt094"
CORRECTLY
COMPLETED
AUTHORIZED
TASKS
WITHOUT
HUMAN
INTERVENTION

/

ELIGIBLE
TASKS
```

---

# 95. Autonomy Metric Boundary

```text id="cmt095"
HIGH
AUTONOMOUS
TASK
RATE
≠
HIGHER
AUTONOMY
SHOULD
BE
AUTHORIZED
```

---

# 96. Baseline

Every comparison should identify a meaningful baseline.

Potential:

```text id="cmt096"
CURRENT
MODEL

PREVIOUS
VERSION

CURRENT
AGENT

NO-TOOL
BASELINE

SIMPLE
HEURISTIC

HUMAN
BASELINE

CURRENT
PRODUCTION
WORKFLOW
```

---

# 97. Baseline Boundary

Permanent:

```text id="cmt097"
CANDIDATE
BEATS
BASELINE
≠
CANDIDATE
MEETS
ABSOLUTE
REQUIREMENTS
```

---

# 98. Absolute Metric

Example:

```text id="cmt098"
TASK
SUCCESS
=
92%
```

---

# 99. Absolute Delta

```text id="cmt099"
CANDIDATE
92%

-

BASELINE
88%

=

+4
PERCENTAGE
POINTS
```

---

# 100. Relative Improvement

Conceptually:

```text id="cmt100"
(CANDIDATE
-
BASELINE)

/

BASELINE
```

when mathematically appropriate.

---

# 101. Percentage vs Percentage-Point Boundary

Permanent:

```text id="cmt101"
80%
→
84%

=

+4
PERCENTAGE
POINTS

NOT
SIMPLY
"4%
RELATIVE
IMPROVEMENT"
```

---

# 102. Relative Improvement Risk

Relative improvements can appear large when baseline value is small.

---

# 103. Improvement Boundary

```text id="cmt103"
+100%
RELATIVE
IMPROVEMENT
FROM
1
TO
2

≠

LARGE
ABSOLUTE
CAPABILITY
AUTOMATICALLY
```

---

# 104. Normalization

Normalization may support comparisons across metrics with different units.

Potential:

```text id="cmt104"
MIN-MAX

Z-SCORE

BASELINE-
RELATIVE

TARGET-
RELATIVE

RANK
NORMALIZATION
```

---

# 105. Normalization Boundary

Permanent:

```text id="cmt105"
NORMALIZED
VALUES
COMPARABLE
NUMERICALLY
≠
UNDERLYING
METRICS
EQUALLY
IMPORTANT
```

---

# 106. Normalization Reference

Every normalized metric should record the reference population or range.

---

# 107. Reference Drift

If normalization population changes, scores can change without system changes.

---

# 108. Reference Drift Boundary

```text id="cmt108"
NORMALIZED
SCORE
CHANGED
≠
SUBJECT
CHANGED
```

---

# 109. Metric Aggregation

Potential:

```text id="cmt109"
MEAN

MEDIAN

MIN

MAX

PERCENTILE

WEIGHTED
MEAN

GEOMETRIC
MEAN

HARMONIC
MEAN
```

as mathematically appropriate.

---

# 110. Mean Boundary

Permanent:

```text id="cmt110"
MEAN
≠
TYPICAL
CASE
AUTOMATICALLY
```

---

# 111. Median Boundary

```text id="cmt111"
MEDIAN
GOOD
≠
TAIL
GOOD
```

---

# 112. Percentiles

Useful for:

* latency.
* cost.
* error magnitude.
* resource use.

---

# 113. Tail Metrics

High-risk systems should inspect:

```text id="cmt113"
P95

P99

MAXIMUM

WORST
KNOWN
CASE

CRITICAL
FAILURES
```

---

# 114. Outliers

Outliers may indicate:

* measurement error.
* unusual workload.
* critical failure.
* legitimate rare condition.

---

# 115. Outlier Boundary

Permanent:

```text id="cmt115"
OUTLIER
≠
DATA
TO
REMOVE
AUTOMATICALLY
```

---

# 116. Outlier Policy

Metric definitions should specify:

* preserve.
* investigate.
* exclude under defined reason.
* winsorize where statistically justified.

---

# 117. Missing Data

Potential states:

```text id="cmt117"
NOT
COLLECTED

NOT
APPLICABLE

FAILED
TO
COLLECT

UNKNOWN

REDACTED

CENSORED
```

---

# 118. Missing Data Boundary

```text id="cmt118"
MISSING
VALUE
≠
ZERO
```

---

# 119. Missing Data Policy

Do not silently impute missing values without an explicit method.

---

# 120. Unknown Metric Value

Permanent:

```text id="cmt120"
UNKNOWN
≠
PASS

UNKNOWN
≠
FAIL
```

unless governance explicitly defines treatment for a specific gate.

---

# 121. Censored Data

Examples:

* timeout threshold.
* cost cap.
* truncated video.
* maximum context reached.

Censored Results should be labeled.

---

# 122. Statistical Uncertainty

Comparison should account for variance where relevant.

Potential:

* confidence interval.
* standard error.
* bootstrap interval.
* posterior interval.

---

# 123. Confidence Interval Boundary

```text id="cmt123"
95%
CONFIDENCE
INTERVAL
≠
95%
PROBABILITY
TRUE
VALUE
IS
INSIDE
UNDER
ALL
STATISTICAL
FRAMEWORKS
```

Interpret according to method.

---

# 124. Sample Size

Sample size should reflect:

* variance.
* expected effect.
* risk.
* cost.
* confidence needs.

---

# 125. Sample Size Boundary

Permanent:

```text id="cmt125"
LARGE
SAMPLE
≠
UNBIASED
SAMPLE
```

---

# 126. Statistical Significance

A difference may be statistically detectable but practically irrelevant.

---

# 127. Effect Size

Effect size should accompany significance where appropriate.

---

# 128. Operational Significance

Operational significance asks:

```text id="cmt128"
DOES
THIS
DIFFERENCE
CHANGE
A
REAL
Mianx.ai
DECISION?
```

---

# 129. Significance Boundary

Permanent:

```text id="cmt129"
P-VALUE
SMALL
≠
BUSINESS
VALUE
LARGE
```

---

# 130. Confidence in Ranking

Rankings should report uncertainty when systems are close.

---

# 131. Ranking Tie

Potential states:

```text id="cmt131"
CLEAR
WINNER

PRACTICAL
TIE

INCONCLUSIVE

METRIC-
DEPENDENT
WINNER
```

---

# 132. Tie Boundary

```text id="cmt132"
SCORE
10.01
VS
10.00
≠
MEANINGFUL
WINNER
AUTOMATICALLY
```

---

# 133. Weighted Composite Scores

Potential:

```text id="cmt133"
TOTAL
=
w1 × QUALITY

+
w2 × RELIABILITY

+
w3 × COST

+
w4 × LATENCY
```

after normalization where mathematically appropriate.

---

# 134. Weight Governance

Weights encode priorities.

Therefore:

```text id="cmt134"
WEIGHTS
=
GOVERNANCE /
DECISION
ASSUMPTIONS
```

not neutral mathematical facts.

---

# 135. Weight Boundary

Permanent:

```text id="cmt135"
WEIGHTED
SCORE
OBJECTIVE
NUMBER
≠
WEIGHTING
OBJECTIVE
```

---

# 136. Hard Gates

Certain conditions should not be traded off against quality or cost.

Potential:

```text id="cmt136"
CROSS-
TENANT
LEAKAGE
=
FAIL

UNAUTHORIZED
PRODUCTION
WRITE
=
FAIL

SECRET
EXFILTRATION
=
FAIL

FOUNDER
AUTHORITY
FABRICATION
=
FAIL

CRITICAL
SECURITY
BYPASS
=
FAIL
```

subject to governance.

---

# 137. Hard Gate Evaluation Order

Conceptually:

```text id="cmt137"
HARD
GATES

↓

IF
PASS

COMPARE
QUALITY /
COST /
LATENCY /
OTHER
METRICS
```

---

# 138. Hard Gate Boundary

Permanent:

```text id="cmt138"
BEST
COMPOSITE
SCORE
+
FAILED
HARD
GATE

=
NOT
A
WINNER
FOR
THAT
GATED
SCOPE
```

---

# 139. Pareto Analysis

Pareto analysis can identify candidates where no other candidate is simultaneously better on all selected dimensions.

Potential dimensions:

```text id="cmt139"
QUALITY

COST

LATENCY

RELIABILITY
```

---

# 140. Pareto Boundary

```text id="cmt140"
PARETO
OPTIMAL
≠
PRODUCTION
AUTHORIZED
```

---

# 141. Tradeoff Analysis

Examples:

```text id="cmt141"
HIGHER
QUALITY
+
HIGHER
COST

LOWER
LATENCY
+
LOWER
QUALITY

BETTER
REASONING
+
SLOWER
RESPONSE
```

---

# 142. Universal Winner Boundary

Permanent:

```text id="cmt142"
DIFFERENT
TRADEOFFS
MAY
MEAN

NO
UNIVERSAL
WINNER
```

---

# 143. Metric Correlation

Metrics may correlate.

Examples:

* longer reasoning and higher cost.
* retries and latency.
* larger context and cost.
* Tool calls and success.

---

# 144. Correlated Metrics

Double-counting correlated metrics in composite scores can distort rankings.

---

# 145. Correlation Boundary

```text id="cmt145"
QUALITY
AND
TASK
SUCCESS
HIGHLY
CORRELATED
≠
COUNT
BOTH
AS
INDEPENDENT
VALUE
WITHOUT
REVIEW
```

---

# 146. Metric Conflict

Examples:

```text id="cmt146"
SAFETY
↑
BUT
EXCESSIVE
REFUSAL
↑

QUALITY
↑
BUT
LATENCY
↑

AUTONOMY
↑
BUT
TOOL
MISUSE
↑
```

---

# 147. Conflict Boundary

Permanent:

```text id="cmt147"
ONE
METRIC
IMPROVES
≠
TRADEOFF
ACCEPTABLE
```

---

# 148. Goodhart's Law Risk

When a metric becomes a target, systems may optimize the metric rather than intended outcome.

---

# 149. Anti-Goodhart Controls

Potential:

* rotating Benchmarks.
* hidden cases.
* multiple metrics.
* qualitative review.
* failure analysis.
* outcome verification.
* adversarial evaluation.

---

# 150. Goodhart Boundary

```text id="cmt150"
METRIC
TARGET
MET
≠
UNDERLYING
OBJECTIVE
MET
```

---

# 151. Proxy Metrics

Examples:

* response length as quality proxy.
* Tool-call count as effort proxy.
* token count as reasoning proxy.
* likes as satisfaction proxy.

---

# 152. Proxy Boundary

Permanent:

```text id="cmt152"
PROXY
CORRELATES
WITH
OBJECTIVE
≠
PROXY
IS
OBJECTIVE
```

---

# 153. Metric Gaming

Potential signs:

* optimized format without better substance.
* unnecessary verbosity to satisfy Judge Model.
* avoiding difficult cases.
* excessive refusal to improve safety score.
* suppressing errors from denominator.

---

# 154. Denominator Gaming

Example:

```text id="cmt154"
FAILURES
RECLASSIFIED
AS
"NOT
ELIGIBLE"

↓

PASS
RATE
ARTIFICIALLY
INCREASES
```

---

# 155. Denominator Governance

Eligibility changes should be versioned and auditable.

---

# 156. Cherry-Picking

Permanent:

```text id="cmt156"
BEST
METRIC
SELECTED
AFTER
SEEING
RESULTS
≠
PRE-DEFINED
EVALUATION
```

---

# 157. Metric Selection

Key metrics should ideally be chosen before examining final Candidate outcomes.

---

# 158. Evaluator Uncertainty

Metrics derived from Human or Judge Model evaluation should preserve evaluator uncertainty.

---

# 159. Judge Model Agreement

Potential:

```text id="cmt159"
AGREEMENT
RATE
AMONG
JUDGES
```

---

# 160. Judge Agreement Boundary

```text id="cmt160"
HIGH
JUDGE
AGREEMENT
≠
JUDGES
CORRECT
```

---

# 161. Human-Judge Agreement

Compare automated and Human evaluation on calibrated samples.

---

# 162. Evaluator Drift

Judge Models or Human rubrics may drift.

---

# 163. Evaluator Drift Boundary

Permanent:

```text id="cmt163"
SUBJECT
SCORE
CHANGED
≠
SUBJECT
CHANGED
IF
EVALUATOR
CHANGED
```

---

# 164. Metric Segmentation

Metrics should often be segmented by:

```text id="cmt164"
TASK
TYPE

DIFFICULTY

MODEL

AGENT
ROLE

PROJECT

TENANT

LANGUAGE

INDUSTRY

RISK
CLASS

INPUT
SIZE

TOOL
TYPE
```

---

# 165. Aggregate Masking

Permanent:

```text id="cmt165"
OVERALL
METRIC
GOOD
≠
EVERY
SEGMENT
GOOD
```

---

# 166. Project Segmentation

Project-level metrics should not be silently aggregated into universal enterprise claims.

---

# 167. Project Boundary

```text id="cmt167"
PROJECT A
SUCCESS
RATE
≠
PROJECT B
SUCCESS
RATE
```

---

# 168. Tenant Segmentation

Tenant-specific metrics may be confidential.

---

# 169. Tenant Metric Boundary

Permanent:

```text id="cmt169"
TENANT A
METRIC
DATA
≠
TENANT B
VISIBILITY
```

---

# 170. Industry Segmentation

Potential:

```text id="cmt170"
RESTAURANT
WORKLOADS

POULTRY
WORKLOADS

SOFTWARE
ENGINEERING

GENERAL
ENTERPRISE
```

---

# 171. Industry Boundary

```text id="cmt171"
GENERAL
BENCHMARK
METRIC
≠
INDUSTRY
PERFORMANCE
METRIC
```

---

# 172. Temporal Segmentation

Compare:

* current.
* previous release.
* rolling period.
* historical baseline.

---

# 173. Time Window Boundary

Permanent:

```text id="cmt173"
7-DAY
METRIC
≠
30-DAY
METRIC
DIRECTLY
COMPARABLE
WITHOUT
CONTEXT
```

---

# 174. Metric Freshness

Potential states:

```text id="cmt174"
CURRENT

STALE

REVALIDATION
REQUIRED

SUPERSEDED

RETIRED
```

---

# 175. Metric Drift

Metric meaning may drift because:

* Dataset changes.
* task mix changes.
* scorer changes.
* aggregation changes.
* threshold changes.

---

# 176. Metric Drift Boundary

```text id="cmt176"
SCORE
TREND
≠
SUBJECT
TREND
IF
MEASUREMENT
SYSTEM
CHANGED
```

---

# 177. Cross-Version Comparability

Results should only be directly compared when:

* metric version compatible.
* Benchmark version compatible.
* Dataset compatible.
* scorer compatible.
* configuration comparable.

---

# 178. Comparability State

Potential:

```text id="cmt178"
DIRECTLY
COMPARABLE

COMPARABLE
WITH
ADJUSTMENT

PARTIALLY
COMPARABLE

NOT
COMPARABLE
```

---

# 179. Version Comparison Boundary

Permanent:

```text id="cmt179"
VALUE
IMPROVED
ACROSS
NON-
COMPARABLE
VERSIONS
≠
PERFORMANCE
IMPROVED
```

---

# 180. Regression Delta

Potential:

```text id="cmt180"
CURRENT
METRIC

-

BASELINE
METRIC
```

---

# 181. Relative Regression

Potential:

```text id="cmt181"
(CURRENT
-
BASELINE)

/

BASELINE
```

when appropriate.

---

# 182. Regression Tolerance

Some metrics may allow bounded degradation in exchange for meaningful gains elsewhere.

Critical Security gates should not rely on this tradeoff unless explicitly governed.

---

# 183. Regression Boundary

Permanent:

```text id="cmt183"
QUALITY
IMPROVES
ENOUGH
≠
CROSS-
TENANT
REGRESSION
ACCEPTABLE
```

---

# 184. Decision Matrix

Potential:

| Dimension       | Candidate A | Candidate B | Candidate C |
| --------------- | ----------: | ----------: | ----------: |
| Quality         |      Metric |      Metric |      Metric |
| Reliability     |      Metric |      Metric |      Metric |
| Security        | Gate/Metric | Gate/Metric | Gate/Metric |
| Cost            |      Metric |      Metric |      Metric |
| Latency         |      Metric |      Metric |      Metric |
| Operational Fit |  Assessment |  Assessment |  Assessment |

---

# 185. Decision Matrix Boundary

```text id="cmt185"
TABLE
HAS
MORE
NUMBERS
≠
DECISION
MORE
OBJECTIVE
```

---

# 186. Ranking Methodology

Potential approaches:

```text id="cmt186"
SINGLE
PRIMARY
METRIC

LEXICOGRAPHIC
GATES

WEIGHTED
COMPOSITE

PARETO
FRONTIER

MULTI-
CRITERIA
DECISION
ANALYSIS
```

---

# 187. Lexicographic Evaluation

Example:

```text id="cmt187"
1.
PASS
SECURITY
GATES

2.
PASS
QUALITY
MINIMUM

3.
SELECT
LOWEST
COST
AMONG
QUALIFIED
CANDIDATES
```

---

# 188. Ranking Governance

Ranking method should be chosen based on decision needs before Candidate outcome where practical.

---

# 189. Ranking Boundary

Permanent:

```text id="cmt189"
RANKING
ALGORITHM
OUTPUT
≠
ENTERPRISE
DECISION
AUTHORITY
```

---

# 190. Dashboard Metrics

Dashboards may show:

* trend.
* comparison.
* alerts.
* hard-gate status.
* confidence.
* segmentation.

---

# 191. Dashboard State

Potential:

```text id="cmt191"
HEALTHY

WATCH

DEGRADED

CRITICAL

UNKNOWN
```

---

# 192. Dashboard Green Boundary

Permanent:

```text id="cmt192"
DASHBOARD
GREEN
≠
PRODUCTION
AUTHORIZED
```

---

# 193. Alert Thresholds

Thresholds should be:

* versioned.
* justified.
* scoped.
* auditable.

---

# 194. Threshold Boundary

```text id="cmt194"
THRESHOLD
MISSED
≠
THRESHOLD
SHOULD
CHANGE
```

---

# 195. Metric Override

Manual override may be necessary when metric pipeline is wrong.

Any override should preserve:

* original value.
* corrected value.
* reason.
* authority.
* audit.

---

# 196. Override Boundary

Permanent:

```text id="cmt196"
METRIC
OVERRIDDEN
≠
ORIGINAL
MEASUREMENT
SHOULD
DISAPPEAR
```

---

# 197. Metric Registry

Target registry may store:

```text id="cmt197"
METRIC
IDENTITY

VERSION

FORMULA

UNIT

DIRECTION

AGGREGATION

NORMALIZATION

THRESHOLDS

HARD-GATE
STATUS

OWNER

STATUS
```

---

# 198. Metric Registry Boundary

```text id="cmt198"
METRIC
REGISTERED
≠
METRIC
VALIDATED
```

---

# 199. Metric Calculation Record

```yaml id="cmt199"
metric_calculation:
  calculation_id: required

  metric_ref: required
  metric_version: required

  benchmark_run_ref: required

  subject_ref: required
  subject_version: required

  scope_ref: required

  raw_inputs: []

  value: required
  unit: required

  sample_size: required

  uncertainty_ref: conditional

  segmentation: {}

  calculated_at: required

  status: required
```

---

# 200. Comparison Record

```yaml id="cmt200"
metric_comparison:
  comparison_id: required

  candidate_refs: []

  baseline_ref: conditional

  metric_refs: []

  normalization_ref: conditional

  statistical_method_ref: conditional

  hard_gate_results: []

  pareto_analysis_ref: conditional

  ranking_method_ref: conditional

  limitations: []

  conclusion_ref: conditional

  status: required
```

---

# 201. Decision Boundary Record

A comparison used for a material decision should identify:

* decision scope.
* eligible candidates.
* hard gates.
* primary metrics.
* secondary metrics.
* tie rules.
* authority.

---

# 202. Research Conclusion Boundary

Permanent:

```text id="cmt202"
METRIC
COMPARISON
SUPPORTS
DECISION

≠

METRIC
COMPARISON
MAKES
DECISION
```

---

# 203. Metric Quality Checklist

## Definition

* [x] identity defined.
* [x] version defined.
* [x] description defined.
* [x] unit defined.
* [x] direction defined.
* [x] numerator defined where applicable.
* [x] denominator defined where applicable.
* [x] aggregation defined.
* [x] missing Data policy defined.

## Statistical

* [x] sample size defined.
* [x] uncertainty defined.
* [x] effect size concept defined.
* [x] statistical significance boundary defined.
* [x] operational significance defined.
* [x] outlier handling defined.

## Comparison

* [x] baseline defined.
* [x] absolute delta defined.
* [x] relative delta defined.
* [x] normalization defined.
* [x] comparability defined.
* [x] ranking defined.
* [x] Pareto analysis defined.

## Safety

* [x] hard gates defined.
* [x] Project isolation metrics defined.
* [x] Tenant isolation metrics defined.
* [x] Security metrics defined.
* [x] critical failure separation defined.

## Anti-Gaming

* [x] Goodhart risk defined.
* [x] proxy metric risk defined.
* [x] denominator gaming defined.
* [x] cherry-picking defined.
* [x] evaluator drift defined.
* [x] segmentation defined.

## Operations

* [x] Dashboard semantics defined.
* [x] threshold governance defined.
* [x] overrides defined.
* [x] registry defined.
* [x] Runtime Truth defined.

---

# 204. Positive Verification Scenarios

Future Comparison Metrics runtime should verify at least:

```text id="cmt204"
CMV-01
EVERY
METRIC
HAS
VERSIONED
DEFINITION

CMV-02
EVERY
RATE
HAS
EXPLICIT
DENOMINATOR

CMV-03
METRIC
UNIT
PRESERVED

CMV-04
METRIC
DIRECTION
PRESERVED

CMV-05
MISSING
DATA
NOT
TREATED
AS
ZERO
AUTOMATICALLY

CMV-06
OUTLIERS
NOT
REMOVED
WITHOUT
POLICY

CMV-07
ABSOLUTE
AND
RELATIVE
IMPROVEMENT
DISTINGUISHED

CMV-08
PERCENTAGE
POINTS
DISTINGUISHED
FROM
PERCENT
CHANGE

CMV-09
NORMALIZATION
REFERENCE
VERSIONED

CMV-10
STATISTICAL
SIGNIFICANCE
NOT
TREATED
AS
BUSINESS
SIGNIFICANCE

CMV-11
CRITICAL
SECURITY
FAILURE
NOT
AVERAGED
AWAY

CMV-12
CROSS-
TENANT
LEAKAGE
FAILS
HARD
GATE

CMV-13
CROSS-
PROJECT
LEAKAGE
VISIBLE
SEPARATELY

CMV-14
JUDGE
MODEL
CHANGE
TRIGGERS
COMPARABILITY
REVIEW

CMV-15
METRIC
VERSION
CHANGE
TRIGGERS
COMPARABILITY
REVIEW

CMV-16
PROJECT
METRICS
DO
NOT
AUTO-
GENERALIZE
ENTERPRISE-WIDE

CMV-17
TENANT
METRICS
DO
NOT
LEAK
ACROSS
TENANTS

CMV-18
COMPOSITE
WEIGHTS
VERSIONED
AND
AUDITED

CMV-19
HARD
GATES
EVALUATED
SEPARATELY
FROM
COMPOSITE
SCORE

CMV-20
BEST
RANKED
CANDIDATE
DOES
NOT
AUTO-
DEPLOY

CMV-21
METRIC
OVERRIDE
PRESERVES
ORIGINAL
VALUE

CMV-22
DASHBOARD
GREEN
DOES
NOT
AUTO-
AUTHORIZE
PRODUCTION

CMV-23
BENCHMARK
METRIC
PASS
DOES
NOT
AUTO-
INCREASE
AGENT
AUTONOMY

CMV-24
PILOT
METRICS
DO
NOT
AUTO-
AUTHORIZE
PRODUCTION
```

---

# 205. Negative Verification Scenarios

Containment or correction should occur when:

* pass rate increases because failed tasks are silently removed from denominator.
* 80% to 84% is incorrectly reported as merely 4% relative improvement.
* Judge Model version changes and Candidate is ranked against historical scores as if evaluator remained unchanged.
* average latency improves while p99 becomes unacceptable and only average is reported.
* cross-Tenant leakage is included as one small negative component in a high composite score.
* safety score improves because Model refuses almost every request.
* lower Human intervention is celebrated while undetected errors increase.
* cost per request improves while total cost per correct task worsens.
* Project A metric is generalized to Project B without evidence.
* Tenant A performance metrics are exposed to Tenant B.
* normalization reference changes and score improvement is attributed to Model.
* a statistically significant 0.1% improvement is treated as strategically important without operational analysis.
* weights are changed after Candidate results are seen to create preferred winner.
* threshold is lowered because favored Candidate narrowly fails.
* only metrics where Candidate wins are shown.
* Dashboard is green and system is declared Production authorized.
* Benchmark metrics automatically select and deploy Model.

---

# 206. Metric Evidence Requirements

Material metric comparisons should ideally link to:

```text id="cmt206"
METRIC
VERSION

FORMULA

UNIT

DIRECTION

DENOMINATOR

DATASET

BENCHMARK

SUBJECT
VERSION

CONFIGURATION

SAMPLE
SIZE

RAW
RESULTS

AGGREGATION

NORMALIZATION

UNCERTAINTY

SEGMENTATION

BASELINE

HARD
GATES

EVALUATOR

LIMITATIONS
```

---

# 207. Controlled Comparison Pilot

A controlled Pilot should initially use:

* limited Benchmarks.
* stable metrics.
* explicit baselines.
* no automatic deployment.
* no silent composite weighting.
* visible hard gates.
* audit.
* manual Research review.

---

# 208. Pilot Exit Criteria

Verify:

* Metric Registry identity.
* formulas.
* units.
* denominators.
* versioning.
* normalization.
* statistical calculations.
* Project/Tenant segmentation.
* hard-gate behavior.
* ranking behavior.
* override audit.
* Dashboard semantics.

---

# 209. Pilot Boundary

Permanent:

```text id="cmt209"
COMPARISON
METRICS
PILOT
SUCCESS
≠
PRODUCTION
METRIC
GATE
AUTHORIZED
```

---

# 210. Production Metric Gate Authorization

Before a metric is relied upon as a Production gate, governance should define:

```text id="cmt210"
METRIC
VERSION

THRESHOLD

SCOPE

HARD /
SOFT
GATE

DATASET /
BENCHMARK

COMPARABILITY
REQUIREMENTS

OVERRIDE
AUTHORITY

EXPIRY /
REVALIDATION

FAILURE
BEHAVIOR
```

---

# 211. Production Gate Boundary

```text id="cmt211"
METRIC
USED
IN
DASHBOARD
≠
METRIC
AUTHORIZED
TO
BLOCK /
APPROVE
PRODUCTION
```

---

# 212. Comparison Metrics Maturity Model

Conceptual:

```text id="cmt212"
CMM0
=
COMPARISON
METRICS
FRAMEWORK
DOCUMENTED

CMM1
=
METRIC /
UNIT /
DIRECTION /
AGGREGATION
MODELS
DEFINED

CMM2
=
BASELINE /
NORMALIZATION /
STATISTICAL /
RANKING /
HARD-GATE
CONTRACTS
DESIGNED

CMM3
=
CONTROLLED
METRIC
CALCULATION
RUNTIME
IMPLEMENTED

CMM4
=
VERSIONED
METRICS /
COMPARISONS /
SEGMENTATION /
UNCERTAINTY
INTEGRATED

CMM5
=
MODEL /
AGENT /
TOOL /
SECURITY /
COST /
PERFORMANCE
METRICS
INTEGRATED

CMM6
=
PROJECT /
TENANT /
ANTI-GOODHART /
HARD-GATE /
AUDIT
CONTROLS
IMPLEMENTED

CMM7
=
CRITICAL
COMPARISON
METRIC
CONTROLS
VERIFIED

CMM8
=
CONTROLLED
COMPARISON
METRICS
PILOT
VERIFIED

CMM9
=
PRODUCTION-SCOPE
METRIC
GATES
SEPARATELY
AUTHORIZED
```

---

# 213. Maturity Boundary

Permanent:

```text id="cmt213"
CMM8
≠
CMM9
```

---

# 214. Repository Evidence

The verified VS Code screenshot establishes:

```text id="cmt214"
doc/26-research-lab/benchmarking/
├── benchmark-suite.md
├── comparison-metrics.md
└── performance-benchmarks.md
```

This document corresponds to the second verified file in that sequence.

---

# 215. Benchmarking Folder Documentation Truth

```text id="cmt215"
BENCHMARK_SUITE_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW

COMPARISON_METRICS_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 216. Repository Save Boundary

This document is generated for:

```text id="cmt216"
doc/26-research-lab/benchmarking/comparison-metrics.md
```

Permanent:

```text id="cmt217"
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

# 217. Current Runtime Truth

Nothing in this document independently proves implementation of Comparison Metrics infrastructure.

```text id="cmt218"
METRIC_REGISTRY_RUNTIME
=
NOT_PROVEN

METRIC_CALCULATION_RUNTIME
=
NOT_PROVEN

COMPARISON_ENGINE_RUNTIME
=
NOT_PROVEN

NORMALIZATION_RUNTIME
=
NOT_PROVEN

STATISTICAL_ANALYSIS_RUNTIME
=
NOT_PROVEN

CONFIDENCE_INTERVAL_RUNTIME
=
NOT_PROVEN

COMPOSITE_SCORE_RUNTIME
=
NOT_PROVEN

HARD_GATE_RUNTIME
=
NOT_PROVEN

PARETO_ANALYSIS_RUNTIME
=
NOT_PROVEN

RANKING_RUNTIME
=
NOT_PROVEN

METRIC_SEGMENTATION_RUNTIME
=
NOT_PROVEN

PROJECT_METRIC_ISOLATION
=
NOT_PROVEN

TENANT_METRIC_ISOLATION
=
NOT_PROVEN

METRIC_OVERRIDE_AUDIT
=
NOT_PROVEN

METRIC_DRIFT_MONITORING
=
NOT_PROVEN

REGRESSION_DELTA_RUNTIME
=
NOT_PROVEN

CONTROLLED_COMPARISON_METRICS_PILOT
=
NOT_PROVEN

PRODUCTION_METRIC_GATES
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 218. Approval Truth

```text id="cmt219"
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
PILOT
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 219. Production Hard Stops

Production-scope reliance on Comparison Metrics should remain blocked where applicable if:

```text id="cmt220"
METRIC
IDENTITY
UNVERIFIED

METRIC
VERSION
UNVERIFIED

UNIT
UNVERIFIED

DIRECTION
UNVERIFIED

DENOMINATOR
UNVERIFIED

AGGREGATION
UNVERIFIED

MISSING
DATA
POLICY
UNVERIFIED

OUTLIER
POLICY
UNVERIFIED

NORMALIZATION
UNVERIFIED

BASELINE
UNVERIFIED

STATISTICAL
METHOD
UNVERIFIED

OPERATIONAL
SIGNIFICANCE
UNDEFINED

COMPOSITE
WEIGHTS
UNVERIFIED

HARD
GATES
UNVERIFIED

PROJECT
SEGMENTATION
UNVERIFIED

TENANT
SEGMENTATION
UNVERIFIED

CRITICAL
FAILURE
SEPARATION
UNVERIFIED

RANKING
METHOD
UNVERIFIED

EVALUATOR
DRIFT
UNASSESSED

COMPARABILITY
UNVERIFIED

OVERRIDE
AUDIT
UNVERIFIED

CONTROLLED
PILOT
EVIDENCE
MISSING

PRODUCTION
GATE
AUTHORIZATION
MISSING
```

---

# 220. Permanent Comparison Metrics Invariants

```text id="cmt221"
METRIC
VALUE
≠
TRUTH

PRECISE
MEASUREMENT
≠
VALID
MEASUREMENT

METRIC
IMPROVEMENT
≠
SYSTEM
IMPROVEMENT

METRIC
NAME
SAME
≠
METRIC
DEFINITION
SAME

NUMBER
WITHOUT
UNIT
≠
MEANINGFUL
METRIC

HIGHER
NUMBER
≠
BETTER
AUTOMATICALLY

RATE
WITHOUT
DENOMINATOR
≠
COMPLETE
METRIC

EXCLUDED
CASE
≠
ERASED
CASE

GOOD
WRITING
≠
CORRECTNESS

EVALUATOR
SAYS
CORRECT
≠
GROUND
TRUTH
PROVEN

PARTIAL
CREDIT
SCHEME
≠
OBJECTIVE
TRUTH

LOW
HALLUCINATION
RATE
≠
ALL
OUTPUT
SAFE

HIGH
AVERAGE
QUALITY
≠
HIGH
RELIABILITY

EVENTUAL
SUCCESS
≠
FIRST-PASS
SUCCESS

CONSISTENCY
≠
CORRECTNESS

TASK
COMPLETED
≠
AUTHORIZED
SUCCESS

HIGH
AUTHORITY
COMPLIANCE
AVERAGE
≠
CRITICAL
AUTHORITY
FAILURE
ACCEPTABLE

HIGH
ESCALATION
RATE
≠
SAFE
AGENT

TOOL
HTTP
SUCCESS
≠
BUSINESS
SUCCESS

MODEL
BETTER
ON
ONE
METRIC
≠
MODEL
BETTER
OVERALL

MULTI-
AGENT
CONSENSUS
≠
CORRECTNESS

LOW
UNSAFE
COMPLIANCE
≠
GOOD
SAFETY
IF
REFUSALS
EXCESSIVE

ZERO
OBSERVED
VIOLATIONS
≠
ZERO
POSSIBLE
VIOLATIONS

CROSS-
TENANT
LEAKAGE
≠
AVERAGE-
ABLE
FAILURE

LOW
AVERAGE
LATENCY
≠
LOW
TAIL
LATENCY

HIGH
THROUGHPUT
≠
HIGH
QUALITY

LOW
TOKEN
PRICE
≠
LOW
TOTAL
COST

CHEAPEST
≠
BEST
VALUE

HIGH
EFFICIENCY
RATIO
≠
SUFFICIENT
ABSOLUTE
QUALITY

HIGH
UTILIZATION
≠
HEALTHY
SYSTEM

SERVICE
AVAILABLE
≠
SERVICE
CORRECT

SMALL
AVERAGE
ROBUSTNESS
DROP
≠
NO
CATASTROPHIC
EDGE
CASE

LOW
HUMAN
INTERVENTION
≠
HIGH
QUALITY

HIGH
AUTONOMOUS
TASK
RATE
≠
AUTONOMY
INCREASE
AUTHORIZED

BEATS
BASELINE
≠
MEETS
ABSOLUTE
REQUIREMENTS

PERCENTAGE
POINT
CHANGE
≠
RELATIVE
PERCENT
CHANGE

LARGE
RELATIVE
CHANGE
≠
LARGE
ABSOLUTE
CHANGE

NORMALIZED
VALUE
≠
EQUAL
IMPORTANCE

NORMALIZATION
REFERENCE
CHANGED
≠
SUBJECT
CHANGED

MEAN
≠
TYPICAL
CASE
AUTOMATICALLY

MEDIAN
GOOD
≠
TAIL
GOOD

OUTLIER
≠
ERROR
AUTOMATICALLY

MISSING
≠
ZERO

UNKNOWN
≠
PASS

UNKNOWN
≠
FAIL

LARGE
SAMPLE
≠
UNBIASED
SAMPLE

STATISTICAL
SIGNIFICANCE
≠
OPERATIONAL
SIGNIFICANCE

SMALL
P-VALUE
≠
LARGE
BUSINESS
VALUE

SMALL
SCORE
DIFFERENCE
≠
MEANINGFUL
WINNER

WEIGHTED
SCORE
NUMBER
≠
WEIGHTS
OBJECTIVE

BEST
COMPOSITE
SCORE
≠
HARD
GATE
FAILURE
IGNORED

PARETO
OPTIMAL
≠
PRODUCTION
AUTHORIZED

ONE
METRIC
IMPROVED
≠
TRADEOFF
ACCEPTED

METRIC
TARGET
MET
≠
OBJECTIVE
MET

PROXY
≠
OBJECTIVE

DENOMINATOR
MANIPULATION
≠
SYSTEM
IMPROVEMENT

HIGH
JUDGE
AGREEMENT
≠
JUDGES
CORRECT

AGGREGATE
GOOD
≠
EVERY
SEGMENT
GOOD

PROJECT A
METRIC
≠
PROJECT B
METRIC

TENANT A
METRIC
≠
TENANT B
VISIBILITY

GENERAL
METRIC
≠
INDUSTRY
METRIC

7-DAY
METRIC
≠
30-DAY
METRIC

SCORE
TREND
≠
SUBJECT
TREND
IF
MEASUREMENT
CHANGED

NON-
COMPARABLE
VERSIONS
≠
VALID
TREND

QUALITY
IMPROVEMENT
≠
SECURITY
REGRESSION
ACCEPTABLE

MORE
NUMBERS
≠
MORE
OBJECTIVE
DECISION

RANKING
OUTPUT
≠
ENTERPRISE
AUTHORITY

DASHBOARD
GREEN
≠
PRODUCTION
AUTHORIZED

THRESHOLD
MISSED
≠
THRESHOLD
SHOULD
CHANGE

MANUAL
OVERRIDE
≠
ORIGINAL
VALUE
ERASED

METRIC
REGISTERED
≠
METRIC
VALIDATED

METRIC
COMPARISON
≠
ENTERPRISE
DECISION

METRIC
PILOT
≠
PRODUCTION
GATE

METRIC
IN
DASHBOARD
≠
PRODUCTION
GATE
AUTHORIZED

CMM8
≠
CMM9

FOUNDER
ROUTING
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

# 221. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="cmt222"
## RESEARCH-LAB-CHG-20260814-029 — Comparison Metrics Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-14 |
| Change Type | `CREATED`, `BENCHMARKING`, `COMPARISON-METRICS`, `STATISTICS`, `NORMALIZATION`, `HARD-GATES`, `COMPOSITE-SCORES`, `PARETO`, `RANKING`, `ANTI-GOODHART`, `PROJECT-SEGMENTATION`, `TENANT-SEGMENTATION`, `RUNTIME-TRUTH` |
| Impact | `I5 — Enterprise Comparison Metrics Foundation` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Canonical | `NO` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/benchmarking/comparison-metrics.md`

### Documentation Truth

`COMPARISON_METRICS_FRAMEWORK = CONTENT_COMPLETE_FOR_REVIEW`

### Benchmarking Folder Truth

`BENCHMARKING_VISIBLE_FILES = 2 / 3 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`COMPARISON_METRICS_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_METRIC_GATES = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 222. Final Comparison Metrics Rule

The Mianx.ai Comparison Metrics framework should operate conceptually as:

```text id="cmt223"
DEFINED
METRIC

↓

VERSIONED
FORMULA /
UNIT /
DIRECTION /
DENOMINATOR

↓

CONTROLLED
BENCHMARK
DATA

↓

RAW
MEASUREMENTS

↓

VALID
AGGREGATION

↓

SEGMENTATION

↓

UNCERTAINTY

↓

BASELINE
COMPARISON

↓

ABSOLUTE /
RELATIVE
DELTA

↓

STATISTICAL
+
OPERATIONAL
INTERPRETATION

↓

HARD
GATES

↓

PARETO /
MULTI-METRIC
TRADEOFF

↓

GOVERNED
RANKING /
RECOMMENDATION

↓

SEPARATE
ENTERPRISE
DECISION
```

while permanently preserving:

```text id="cmt224"
METRIC
≠
TRUTH

SCORE
≠
AUTHORITY

AVERAGE
≠
TAIL
SAFETY

STATISTICS
≠
BUSINESS
JUDGMENT

COMPOSITE
SCORE
≠
CRITICAL
FAILURE
ERASURE

RANKING
≠
DEPLOYMENT

AI
EVALUATOR
≠
FOUNDER

PILOT
≠
PRODUCTION

DOCUMENTATION
≠
RUNTIME
```

---

# 223. Next Document

The screenshot-verified `benchmarking/` sequence is:

```text id="cmt225"
1. benchmark-suite.md
2. comparison-metrics.md
3. performance-benchmarks.md
```

The first two files are now content-complete for review in this documentation workflow.

The next verified document should define the complete **Performance Benchmarks framework**, including end-to-end latency, Model latency, Agent latency, Tool latency, queueing, throughput, concurrency, scalability, saturation, resource utilization, CPU/GPU/memory/network/storage, cold start, warm state, cache effects, rate limits, load profiles, steady-state tests, spike tests, stress tests, endurance tests, soak tests, failover tests, recovery performance, Project/Tenant noisy-neighbor isolation, cost-performance tradeoffs, tail latency, performance regression gates, Benchmark environment normalization, instrumentation overhead, capacity planning, performance budgets, SLO/SLI relationships, controlled Pilots and Runtime Truth.

## NEXT DOCUMENT

```text id="cmt226"
doc/26-research-lab/benchmarking/performance-benchmarks.md
```

---