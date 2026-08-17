---

id: RESEARCH-LAB-EXPERIMENTS-EXPERIMENT-DESIGN-001
title: Mianx.ai Research Lab Experiments — Experiment Design
version: 1.0.0
status: Draft

description: Enterprise-grade specification for the Mianx.ai Research Lab Experiment Design framework. This document defines how Mianx.ai should formulate, scope, authorize, preregister, execute, challenge, reproduce and revalidate controlled Research experiments across AI Research, Foundation Model Research, Reasoning Model Research, Multimodal AI, Agent Research, Multi-Agent Research, Prompt Research, Dataset Research, Model Evaluation, Benchmarks, simulations, prototypes, Competitive Intelligence, Market Research and future Industry Operating Systems. It establishes Research Questions, objectives, hypotheses, null and alternative hypotheses, estimands, variables, independent variables, dependent variables, control variables, treatment groups, control groups, experimental units, sampling frames, eligibility criteria, randomization, stratification, blocking, matching, counterfactual reasoning, baselines, confounders, causal assumptions, interventions, treatment contamination, spillover effects, sample-size planning, statistical power, effect size, variance assumptions, metrics, primary and secondary outcomes, guardrail metrics, success criteria, stopping rules, sequential testing, multiple comparisons, preregistration, protocol versioning, Dataset and Model pinning, Prompt configuration, Agent topology, Tool configuration, Memory state, environmental controls, random seeds, stochasticity, Human evaluation, evaluator blinding, Judge Model configuration, ethics, bias, privacy, Security, Project and Tenant boundaries, resource budgets, side-effect control, failure handling, protocol deviations, experiment amendments, HALT, Resume, replication, reproducibility, audit, maturity and Runtime Truth. It permanently separates Research Question from hypothesis, hypothesis from conclusion, correlation from causation, treatment assignment from treatment receipt, control group from absence of all influence, randomization from elimination of every bias, statistical significance from practical significance, effect size from business value, larger sample from valid design, high power from valid assumptions, baseline from ground truth, metric from objective, proxy metric from real-world outcome, preregistration from correctness, experiment registration from authorization, protocol adherence from scientific validity, repeated trials from independent replication, Model temperature zero from determinism, fixed random seed from full reproducibility, Judge Model score from objective truth, Human evaluation from unbiased evaluation, Pilot experiment from Production authorization, experiment success from Product success, Founder routing from Founder approval, and documentation from implementation, testing, verification or Production authorization.

type: Research Experiment Design Framework, Controlled Experiment Specification, Hypothesis and Causal Design Model, Statistical Planning Framework, AI Experiment Configuration Specification, Experiment Governance and Preregistration Model, Runtime Truth Register, Controlled Pilot Boundary, and Production Authorization Boundary

class: Governed target-state Experiment Design specification defining how Mianx.ai should design scientifically defensible, reproducible and governed Research experiments without asserting that an Experiment Registry, preregistration service, randomization engine, statistical power service, experiment orchestration runtime, causal inference platform, protocol-deviation monitor, automated replication system or Production experimentation control plane is currently implemented

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Experiments
specialization: Experiment Design

parent: doc/26-research-lab/experiments
path: doc/26-research-lab/experiments/experiment-design.md

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
* Scientific Method Governance
* Dataset Governance
* Data Quality Governance
* Model Governance
* Prompt Governance
* Agent Governance
* Multi-Agent Governance
* Tool Governance
* Benchmark Governance
* AI Ethics Governance
* Responsible AI Governance
* Bias and Fairness Governance
* Privacy Governance
* Security Governance
* Project Governance
* Tenant Governance
* Audit Governance
* Verification Governance
* Production Governance
* Documentation Governance

maintainers:

* Experiment Research Team
* Research Methodology Team
* AI Research Team
* Dataset Research Team
* Model Evaluation Team
* Prompt Research Team
* Agent Research Team
* Multi-Agent Research Team
* Benchmark Engineering
* Statistics and Evaluation Team
* Research Platform Engineering
* Research Operations
* Security Research Team
* Responsible AI Research Team
* Verification Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Research Governance
* Experiment Governance
* Research Methodology Lead
* AI Research Lead
* Dataset Governance
* Model Governance
* Prompt Governance
* Agent Governance
* Benchmark Governance
* AI Ethics Governance
* Responsible AI Governance
* Privacy Governance
* Security Governance
* Project Governance
* Tenant Governance
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
* Research Scientists
* AI Researchers
* Dataset Researchers
* Model Researchers
* Prompt Researchers
* Agent Researchers
* Multi-Agent Researchers
* Benchmark Engineers
* Data Scientists
* Statisticians
* Product Researchers
* Security Researchers
* Responsible AI Researchers
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
* ../datasets/data-quality.md
* ../datasets/dataset-catalog.md
* ../datasets/dataset-governance.md
* ../benchmarking/benchmark-suite.md
* ../benchmarking/comparison-metrics.md
* ../benchmarking/performance-benchmarks.md
* ../ethics/ai-ethics.md
* ../ethics/bias-evaluation.md
* ../ethics/responsible-ai.md
* ../ai-research/ai-research.md
* ../ai-research/foundation-models.md
* ../ai-research/multimodal-ai.md
* ../ai-research/reasoning-models.md
* ../agent-research/agent-behavior.md
* ../agent-research/autonomous-agents.md
* ../agent-research/multi-agent-research.md
* ../../01-governance/
* ../../03-product/
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

* ./experiment-results.md
* ./experiment-tracking.md
* ../model-evaluation/
* ../monitoring/
* ../simulations/
* ../prototypes/
* ../knowledge-transfer/
* ../publications/
* ../security/
* ../CHANGELOG.md

review_cycle:

* At Every Material Experiment Design Framework Change
* At Every New Experiment Class
* At Every Material Hypothesis or Primary Outcome Change
* At Every Material Dataset, Model, Prompt, Agent or Tool Change
* At Every Material Statistical Design Change
* At Every Sample-Size or Stopping-Rule Change
* At Every Material Human Evaluation Protocol Change
* At Every Material Risk Classification Change
* At Every Protocol Amendment Affecting Interpretability
* Before High-Risk Experiments
* Before Controlled Experimentation Pilots
* Before Production-Connected Experiments
* Quarterly During Active Research Programs
* Annually for Stable Experimentation Governance

## canonical: false

# Mianx.ai Research Lab Experiments — Experiment Design

> **A strong experiment is designed before its result is known.**
>
> The purpose of Experiment Design is not to create a process that makes a preferred idea appear successful.
>
> It is to create a process capable of distinguishing:
>
> * signal from noise;
> * treatment effect from confounding;
> * evidence from assumption;
> * and meaningful improvement from metric manipulation.
>
> The design should make failure scientifically useful rather than organizationally inconvenient.

---

# 1. Purpose

The Experiment Design framework should answer:

```text id="ed001"
WHAT
RESEARCH
QUESTION?

↓

WHAT
HYPOTHESIS?

↓

WHAT
WOULD
DISCONFIRM
IT?

↓

WHAT
IS
THE
EXPERIMENTAL
UNIT?

↓

WHAT
IS
THE
TREATMENT?

↓

WHAT
IS
THE
COMPARISON?

↓

WHAT
OUTCOME
WILL
BE
MEASURED?

↓

WHAT
CONFOUNDERS
MAY
EXIST?

↓

HOW
WILL
CASES
BE
ASSIGNED?

↓

HOW
MUCH
DATA /
HOW
MANY
RUNS
ARE
NEEDED?

↓

WHAT
COUNTS
AS
SUCCESS /
FAILURE?

↓

WHAT
MUST
BE
FIXED
BEFORE
EXECUTION?

↓

WHAT
CAN
CHANGE
DURING
THE
EXPERIMENT?

↓

HOW
WILL
DEVIATIONS
BE
RECORDED?

↓

CAN
THE
RESULT
BE
REPRODUCED?
```

---

# 2. Core Experiment Principle

Permanent:

```text id="ed002"
EXPERIMENT
DESIGN
SHOULD
PRECEDE
RESULT
INTERPRETATION
```

---

# 3. Question/Hypothesis Boundary

```text id="ed003"
RESEARCH
QUESTION
≠
HYPOTHESIS
```

A Research Question asks what is unknown.

A hypothesis states a testable proposition.

---

# 4. Hypothesis/Conclusion Boundary

Permanent:

```text id="ed004"
HYPOTHESIS
≠
CONCLUSION
```

---

# 5. Correlation/Causation Boundary

```text id="ed005"
ASSOCIATION
≠
CAUSATION
```

---

# 6. Statistical/Practical Boundary

Permanent:

```text id="ed006"
STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE
```

---

# 7. Experiment Mission

```text id="ed007"
QUESTION

↓

HYPOTHESIS

↓

DESIGN

↓

VARIABLES

↓

POPULATION /
SAMPLE

↓

ASSIGNMENT

↓

CONTROL /
BASELINE

↓

METRICS

↓

POWER /
SAMPLE
PLAN

↓

PROTOCOL

↓

RISK /
AUTHORITY
GATES

↓

PREREGISTER

↓

EXECUTE

↓

ANALYZE

↓

CHALLENGE

↓

REPLICATE

↓

TRANSFER
```

---

# 8. Experiment Definition

For Mianx.ai Research:

> An Experiment is a planned empirical procedure in which one or more conditions are controlled, varied, assigned or observed in order to evaluate a defined hypothesis or Research Question under an explicit protocol.

---

# 9. Experiment Types

Potential:

```text id="ed009"
ET01
CONTROLLED
LAB
EXPERIMENT

ET02
A/B
EXPERIMENT

ET03
FACTORIAL
EXPERIMENT

ET04
MODEL
COMPARISON

ET05
PROMPT
EXPERIMENT

ET06
AGENT
BEHAVIOR
EXPERIMENT

ET07
MULTI-
AGENT
EXPERIMENT

ET08
TOOL
USE
EXPERIMENT

ET09
RETRIEVAL /
RAG
EXPERIMENT

ET10
MEMORY
EXPERIMENT

ET11
SIMULATION-
BASED
EXPERIMENT

ET12
HUMAN
EVALUATION
EXPERIMENT

ET13
QUASI-
EXPERIMENT

ET14
OBSERVATIONAL
STUDY

ET15
CONTROLLED
PILOT
EXPERIMENT
```

Not every Research activity supports causal conclusions.

---

# 10. Experimental vs Observational Boundary

Permanent:

```text id="ed010"
OBSERVATIONAL
STUDY
≠
RANDOMIZED
EXPERIMENT
```

---

# 11. Experiment Identity

```yaml id="ed011"
experiment_design:
  experiment_id: required
  version: required

  title: required

  research_question_ref: required

  objective_refs: []

  hypothesis_refs: []

  experiment_type: required

  experimental_unit: required

  population_ref: required

  sample_plan_ref: required

  assignment_plan_ref: conditional

  treatment_refs: []
  control_refs: []

  variable_refs: []

  metric_refs: []

  statistical_plan_ref: required

  protocol_ref: required

  risk_class: required

  project_id: required
  tenant_id: conditional

  preregistration_ref: conditional

  authority_ref: required

  status: required
```

---

# 12. Experiment Status

Potential:

```text id="ed012"
CONCEPT

DESIGNING

UNDER
REVIEW

APPROVED
FOR
DEFINED
RESEARCH

PREREGISTERED

READY

RUNNING

PAUSED

HALTED

COMPLETED

INVALIDATED

REPLICATION
REQUIRED

ARCHIVED
```

---

# 13. Status Boundary

```text id="ed013"
EXPERIMENT
DESIGN
APPROVED
≠
EXPERIMENT
RESULT
APPROVED
```

---

# 14. Research Question

A good Research Question should be:

* clear.
* scoped.
* answerable.
* linked to a decision or knowledge gap.

---

# 15. Research Question Example

```text id="ed015"
DOES
MODEL B

UNDER
CONTROLLED
CONFIGURATION

IMPROVE
TASK
QUALITY

WITHOUT
MATERIAL
INCREASE
IN
COST /
LATENCY /
SAFETY
RISK

COMPARED
WITH
MODEL A?
```

---

# 16. Question Boundary

Permanent:

```text id="ed016"
BROAD
STRATEGIC
QUESTION
≠
EXPERIMENTALLY
TESTABLE
QUESTION
UNTIL
OPERATIONALIZED
```

---

# 17. Objective

Experiment objectives may include:

```text id="ed017"
ESTIMATE
EFFECT

COMPARE
SYSTEMS

TEST
MECHANISM

VALIDATE
CAPABILITY

IDENTIFY
FAILURE
MODE

MEASURE
TRADE-
OFF

REPLICATE
PRIOR
RESULT
```

---

# 18. Objective Boundary

```text id="ed018"
OBJECTIVE
TO
"PROVE X"
≠
SCIENTIFICALLY
NEUTRAL
EXPERIMENT
OBJECTIVE
```

Prefer testing rather than proving a desired answer.

---

# 19. Hypothesis

A hypothesis should be falsifiable where feasible.

Example:

```text id="ed019"
H1:
MODEL B
HAS
HIGHER
TASK
SUCCESS
RATE
THAN
MODEL A
UNDER
DEFINED
CONDITIONS
```

---

# 20. Null Hypothesis

Conceptual:

```text id="ed020"
H0:
NO
DEFINED
DIFFERENCE
EXISTS
BETWEEN
CONDITIONS
```

depending on statistical design.

---

# 21. Alternative Hypothesis

Potential:

```text id="ed021"
H1:
DEFINED
DIFFERENCE
EXISTS
```

or directional as preregistered.

---

# 22. Hypothesis Direction

Potential:

```text id="ed022"
DIRECTIONAL

NON-
DIRECTIONAL

EQUIVALENCE

NON-
INFERIORITY

EXPLORATORY
```

---

# 23. Hypothesis Boundary

Permanent:

```text id="ed023"
FAILED
TO
REJECT
H0
≠
H0
PROVEN
TRUE
```

---

# 24. Estimand

Where causal or comparative inference is intended, define exactly what effect is being estimated.

Potential:

```text id="ed024"
AVERAGE
TREATMENT
EFFECT

CONDITIONAL
EFFECT

RELATIVE
PERFORMANCE
DELTA

ABSOLUTE
OUTCOME
DELTA
```

---

# 25. Estimand Boundary

```text id="ed025"
METRIC
OBSERVED
≠
CAUSAL
ESTIMAND
DEFINED
AUTOMATICALLY
```

---

# 26. Experimental Unit

Potential units:

```text id="ed026"
USER

TASK

PROMPT

DOCUMENT

SESSION

PROJECT

TENANT

MODEL
RUN

AGENT
RUN

WORKFLOW
RUN
```

---

# 27. Unit Boundary

Permanent:

```text id="ed027"
ONE
ROW
IN
DATASET
≠
ONE
INDEPENDENT
EXPERIMENTAL
UNIT
AUTOMATICALLY
```

Repeated observations may be correlated.

---

# 28. Unit of Analysis

The unit analyzed may differ from the unit randomized.

This distinction should be explicit.

---

# 29. Pseudoreplication

Treating correlated repeated observations as independent can inflate confidence.

Permanent:

```text id="ed029"
MORE
ROWS
FROM
SAME
UNDERLYING
UNIT
≠
MORE
INDEPENDENT
EVIDENCE
```

---

# 30. Population

Define the target population to which conclusions are intended to generalize.

---

# 31. Population Boundary

```text id="ed031"
EXPERIMENT
SAMPLE
≠
TARGET
POPULATION
AUTOMATICALLY
```

---

# 32. Sampling Frame

A sampling frame should describe the population from which experimental units can be selected.

---

# 33. Inclusion Criteria

Potential:

```text id="ed033"
VALID
TASK

SUPPORTED
LANGUAGE

DEFINED
INDUSTRY

REQUIRED
DATA
AVAILABLE

AUTHORIZED
PROJECT /
TENANT
```

---

# 34. Exclusion Criteria

Exclusions should be defined before results where feasible.

---

# 35. Exclusion Boundary

Permanent:

```text id="ed035"
REMOVE
CASE
BECAUSE
RESULT
IS
INCONVENIENT
≠
VALID
EXCLUSION
```

---

# 36. Sampling

Potential:

```text id="ed036"
RANDOM

STRATIFIED

SYSTEMATIC

CLUSTERED

PURPOSIVE

CONVENIENCE

COMPLETE
ENUMERATION
```

The choice affects generalizability.

---

# 37. Sampling Boundary

```text id="ed037"
RANDOM
ASSIGNMENT
≠
RANDOM
SAMPLING
```

Random assignment supports causal balance.

Random sampling supports population generalization.

---

# 38. Treatment

Treatment should identify the manipulated condition.

Examples:

```text id="ed038"
MODEL
VERSION

PROMPT
VERSION

RETRIEVAL
STRATEGY

AGENT
TOPOLOGY

TOOL
ACCESS
POLICY

MEMORY
CONFIGURATION

REASONING
BUDGET
```

---

# 39. Treatment Record

```yaml id="ed039"
experiment_treatment:
  treatment_id: required

  experiment_ref: required

  name: required

  intervention_ref: required

  configuration_ref: required

  assignment_probability: conditional

  expected_mechanism: conditional

  status: required
```

---

# 40. Treatment Assignment

Assignment may be:

```text id="ed040"
RANDOM

BLOCKED

STRATIFIED

CLUSTERED

MATCHED

FIXED

QUASI-
EXPERIMENTAL
```

---

# 41. Assignment Boundary

Permanent:

```text id="ed041"
ASSIGNED
TO
TREATMENT
≠
TREATMENT
ACTUALLY
RECEIVED
```

---

# 42. Treatment Compliance

Where relevant, record:

* assigned condition.
* actual condition.
* deviations.

---

# 43. Control Group

A control or comparison group provides a reference condition.

Potential:

```text id="ed043"
CURRENT
PRODUCTION
BASELINE

NO
INTERVENTION

MODEL A

PROMPT A

STANDARD
WORKFLOW

HUMAN
BASELINE
```

---

# 44. Control Boundary

```text id="ed044"
CONTROL
GROUP
≠
ABSENCE
OF
ALL
OTHER
INFLUENCES
```

---

# 45. Baseline

A baseline should be versioned and reproducible.

---

# 46. Baseline Boundary

Permanent:

```text id="ed046"
BASELINE
≠
GROUND
TRUTH
```

It is a comparator.

---

# 47. Variables

Potential:

```text id="ed047"
INDEPENDENT
VARIABLE

DEPENDENT
VARIABLE

CONTROL
VARIABLE

COVARIATE

CONFOUNDER

MEDIATOR

MODERATOR
```

---

# 48. Independent Variable

The manipulated or comparison factor.

---

# 49. Dependent Variable

The measured outcome.

---

# 50. Control Variables

Variables held fixed or adjusted for.

---

# 51. Confounder

A variable associated with both treatment/exposure and outcome that may distort inference.

---

# 52. Confounder Boundary

Permanent:

```text id="ed052"
VARIABLE
CORRELATED
WITH
OUTCOME
≠
CONFOUNDER
AUTOMATICALLY
```

Causal structure matters.

---

# 53. Mediator

A mediator may lie on the causal pathway between treatment and outcome.

---

# 54. Moderator

A moderator changes treatment effect across contexts or groups.

---

# 55. Variable Record

```yaml id="ed055"
experiment_variable:
  variable_id: required

  experiment_ref: required

  name: required

  variable_type: required

  definition: required

  measurement_method_ref: required

  unit: conditional

  allowed_values: conditional

  source_ref: required

  status: required
```

---

# 56. Measurement Boundary

```text id="ed056"
VARIABLE
HAS
NUMERIC
VALUE
≠
VARIABLE
MEASURED
VALIDLY
```

---

# 57. Operationalization

Abstract concepts must be translated into observable measures.

Example:

```text id="ed057"
"QUALITY"

↓

TASK
SUCCESS

FACTUAL
CORRECTNESS

COMPLETENESS

HUMAN
RATING
```

---

# 58. Operationalization Boundary

Permanent:

```text id="ed058"
PROXY
MEASURE
≠
UNDERLYING
CONSTRUCT
PERFECTLY
```

---

# 59. Primary Outcome

The primary outcome should be identified before analysis where confirmatory inference is intended.

---

# 60. Secondary Outcomes

Secondary outcomes provide additional context but should not silently replace failed primary outcomes.

---

# 61. Outcome Switching Boundary

```text id="ed061"
PRIMARY
OUTCOME
FAILS

↓

SECONDARY
OUTCOME
SUCCEEDS

≠

PRIMARY
HYPOTHESIS
SUCCEEDED
```

---

# 62. Guardrail Metrics

Potential:

```text id="ed062"
SAFETY

FAIRNESS

LATENCY

COST

TOOL
ERRORS

PRIVACY

HUMAN
INTERVENTION
```

A treatment may improve primary quality but violate a guardrail.

---

# 63. Guardrail Boundary

Permanent:

```text id="ed063"
PRIMARY
METRIC
IMPROVED
≠
EXPERIMENT
SUCCESS
IF
CRITICAL
GUARDRAIL
FAILS
```

---

# 64. Metric Definition

Every metric should define:

```text id="ed064"
METRIC
NAME

UNIT

DIRECTION

NUMERATOR

DENOMINATOR

AGGREGATION

SCOPE

WINDOW

SOURCE

EXCLUSIONS
```

---

# 65. Metric Boundary

```text id="ed065"
METRIC
NAME
SAME
≠
METRIC
DEFINITION
SAME
```

---

# 66. Success Criteria

Success may require:

```text id="ed066"
PRIMARY
OUTCOME
IMPROVEMENT

+

GUARDRAILS
PASS

+

UNCERTAINTY
ACCEPTABLE

+

PRACTICAL
SIGNIFICANCE

+

NO
CRITICAL
SAFETY /
GOVERNANCE
FAILURE
```

---

# 67. Success Boundary

Permanent:

```text id="ed067"
EXPERIMENT
MEETS
STATISTICAL
CRITERION
≠
BUSINESS /
PRODUCT
DECISION
AUTOMATICALLY
```

---

# 68. Failure Criteria

Scientific failure can still be informative.

Potential:

* no meaningful effect.
* worse performance.
* unsafe trade-off.
* invalid design.
* insufficient power.

---

# 69. Negative Result Boundary

```text id="ed069"
NEGATIVE
RESULT
≠
FAILED
RESEARCH
```

---

# 70. Randomization

Randomization can reduce systematic assignment bias.

---

# 71. Randomization Boundary

Permanent:

```text id="ed071"
RANDOMIZATION
≠
EVERY
CONFOUNDER
PERFECTLY
BALANCED
IN
FINITE
SAMPLE
```

---

# 72. Randomization Seed

Where applicable, record randomization seed or deterministic assignment implementation.

---

# 73. Stratification

Stratification may ensure representation across key variables.

Potential:

```text id="ed073"
LANGUAGE

TASK
DIFFICULTY

INDUSTRY

PROJECT

USER
SEGMENT
```

---

# 74. Blocking

Blocking can control known nuisance variation.

---

# 75. Cluster Randomization

Useful when treatment must be assigned at group level.

Examples:

* Tenant.
* team.
* session cluster.

---

# 76. Cluster Boundary

```text id="ed076"
1000
OBSERVATIONS
FROM
10
CLUSTERS
≠
1000
INDEPENDENT
RANDOMIZED
UNITS
```

---

# 77. Matching

Matching may improve comparability in non-randomized designs.

---

# 78. Matching Boundary

Permanent:

```text id="ed078"
MATCHED
ON
OBSERVED
COVARIATES
≠
UNOBSERVED
CONFOUNDING
ELIMINATED
```

---

# 79. Quasi-Experiments

Potential:

* interrupted time series.
* difference-in-differences.
* regression discontinuity.
* matched comparisons.

These require design-specific assumptions.

---

# 80. Causal Assumptions

A causal experiment or quasi-experiment should make critical assumptions explicit.

---

# 81. Causal Graphs

Where useful, DAGs or equivalent causal models may document assumptions.

---

# 82. Causal Boundary

```text id="ed082"
CAUSAL
DIAGRAM
DRAWN
≠
CAUSAL
ASSUMPTIONS
TRUE
```

---

# 83. Treatment Contamination

Control units may unintentionally receive aspects of treatment.

---

# 84. Contamination Boundary

Permanent:

```text id="ed084"
ASSIGNED
CONTROL
≠
UNEXPOSED
CONTROL
AUTOMATICALLY
```

---

# 85. Spillover

Treatment of one unit may affect another.

Examples:

* shared Agent Memory.
* shared cache.
* shared Human reviewer learning.
* network effects.

---

# 86. Spillover Boundary

```text id="ed086"
RANDOM
ASSIGNMENT
BY
UNIT
≠
NO
INTERFERENCE
BETWEEN
UNITS
```

---

# 87. Carryover Effects

In crossover designs, earlier conditions may influence later conditions.

---

# 88. Order Effects

Prompt, Model or Human evaluation order can bias results.

---

# 89. Blinding

Potential:

```text id="ed089"
SINGLE
BLIND

DOUBLE
BLIND
WHERE
PRACTICAL

ANONYMIZED
MODEL
IDENTITY

RANDOMIZED
OUTPUT
ORDER
```

---

# 90. Blinding Boundary

Permanent:

```text id="ed090"
MODEL
NAME
HIDDEN
≠
EVALUATOR
FULLY
BLINDED
IF
OUTPUT
STYLE
REVEALS
MODEL
```

---

# 91. Human Evaluation

Human evaluation protocol should define:

* evaluator qualifications.
* rubric.
* examples.
* blinding.
* adjudication.
* disagreement.

---

# 92. Human Evaluation Boundary

```text id="ed092"
HUMAN
SCORE
≠
OBJECTIVE
TRUTH
AUTOMATICALLY
```

---

# 93. Judge Model Evaluation

Judge Model experiments should record:

```text id="ed093"
JUDGE
MODEL

VERSION

PROMPT

ORDER

TEMPERATURE

RUBRIC

POSITION
RANDOMIZATION
```

---

# 94. Judge Model Boundary

Permanent:

```text id="ed094"
JUDGE
MODEL
CONSISTENT
≠
JUDGE
MODEL
UNBIASED
```

---

# 95. Multiple Evaluators

Combining Human and Model evaluators may improve triangulation.

---

# 96. Evaluator Agreement Boundary

```text id="ed096"
HUMAN
+
JUDGE
MODEL
AGREE
≠
GROUND
TRUTH
PROVEN
```

---

# 97. Sample-Size Planning

Sample size should depend on:

* expected effect.
* variance.
* desired power.
* significance framework.
* risk.
* design structure.

---

# 98. Sample-Size Boundary

Permanent:

```text id="ed098"
LARGER
SAMPLE
≠
BETTER
EXPERIMENT
IF
DESIGN
IS
INVALID
```

---

# 99. Statistical Power

Power conceptually represents probability of detecting a defined effect under assumptions.

---

# 100. Power Boundary

```text id="ed100"
HIGH
STATISTICAL
POWER
≠
VALID
CAUSAL
DESIGN
```

---

# 101. Effect Size

Potential:

```text id="ed101"
ABSOLUTE
DELTA

RELATIVE
DELTA

STANDARDIZED
EFFECT

ODDS
RATIO

RISK
RATIO
```

depending on design.

---

# 102. Effect Size Boundary

Permanent:

```text id="ed102"
LARGE
STATISTICAL
EFFECT
≠
LARGE
BUSINESS
VALUE
AUTOMATICALLY
```

---

# 103. Minimum Detectable Effect

If used, MDE should reflect meaningful Research or operational sensitivity rather than arbitrary convenience.

---

# 104. Variance Assumptions

Planning should document assumptions from:

* prior runs.
* Pilot Data.
* historical Data.
* literature.

---

# 105. Assumption Boundary

```text id="ed105"
ASSUMPTION
USED
FOR
POWER
CALCULATION
≠
ASSUMPTION
VERIFIED
```

---

# 106. Sequential Testing

Some experiments inspect results during execution.

This requires planned controls to avoid uncontrolled repeated testing.

---

# 107. Peeking Boundary

Permanent:

```text id="ed107"
CHECKING
RESULTS
EVERY
HOUR
AND
STOPPING
WHEN
SIGNIFICANT

≠

VALID
FIXED-
HORIZON
TEST
```

unless a valid sequential design is used.

---

# 108. Stopping Rules

Potential:

```text id="ed108"
FIXED
SAMPLE

FIXED
DURATION

SEQUENTIAL
BOUNDARY

SAFETY
HALT

FUTILITY

RESOURCE
LIMIT
```

---

# 109. Stopping Boundary

```text id="ed109"
DESIRED
RESULT
REACHED
≠
VALID
STOPPING
RULE
```

---

# 110. Early Stopping for Harm

Safety or ethics harm can override statistical plans.

Permanent:

```text id="ed110"
STATISTICAL
PLAN
SAYS
CONTINUE
≠
EXPERIMENT
MUST
CONTINUE
AFTER
CRITICAL
SAFETY
FAILURE
```

---

# 111. Multiple Hypotheses

Multiple primary or secondary tests may require correction or explicit multiplicity strategy.

---

# 112. Multiple Comparison Boundary

```text id="ed112"
TEST
100
METRICS

FIND
5
SIGNIFICANT

≠

5
TRUE
EFFECTS
PROVEN
```

---

# 113. Exploratory Analysis

Exploratory findings should be labeled exploratory when not preregistered as confirmatory.

---

# 114. HARKing Boundary

Permanent:

```text id="ed114"
HYPOTHESIS
CREATED
AFTER
SEEING
RESULT

≠

PREREGISTERED
HYPOTHESIS
```

Hypothesizing after results can be valuable, but should be labeled honestly.

---

# 115. Preregistration

A preregistration may define before execution:

```text id="ed115"
QUESTION

HYPOTHESIS

POPULATION

SAMPLE

TREATMENT

CONTROL

PRIMARY
METRIC

STATISTICAL
PLAN

EXCLUSIONS

STOPPING
RULES
```

---

# 116. Preregistration Boundary

Permanent:

```text id="ed116"
PREREGISTERED
≠
SCIENTIFICALLY
CORRECT
```

It improves transparency, not truth automatically.

---

# 117. Preregistration Record

```yaml id="ed117"
experiment_preregistration:
  preregistration_id: required

  experiment_ref: required
  experiment_version: required

  protocol_hash_ref: required

  hypotheses: []
  primary_outcomes: []
  secondary_outcomes: []

  sample_plan_ref: required
  exclusion_rules_ref: required

  analysis_plan_ref: required
  stopping_rule_ref: required

  registered_at: required

  amendments_allowed_under_policy: required

  status: required
```

---

# 118. Protocol

The protocol defines exact experiment execution.

---

# 119. Protocol Components

Potential:

```text id="ed119"
INPUT
SELECTION

ASSIGNMENT

SYSTEM
CONFIG

RUN
ORDER

TIMEOUT

RETRY

EVALUATION

LOGGING

FAILURE
HANDLING

HALT
```

---

# 120. Protocol Boundary

```text id="ed120"
PROTOCOL
DOCUMENTED
≠
PROTOCOL
FOLLOWED
```

---

# 121. Protocol Versioning

Any material protocol change should create a new version or amendment.

---

# 122. Protocol Deviation

A deviation occurs when actual execution differs from approved protocol.

---

# 123. Deviation Record

```yaml id="ed123"
experiment_protocol_deviation:
  deviation_id: required

  experiment_ref: required
  run_refs: []

  expected_protocol_ref: required

  observed_deviation: required

  reason: required

  discovered_at: required

  impact_assessment_ref: required

  disposition: required

  status: required
```

---

# 124. Deviation Boundary

Permanent:

```text id="ed124"
PROTOCOL
DEVIATION
≠
EXPERIMENT
INVALID
AUTOMATICALLY
```

Impact must be evaluated.

---

# 125. Silent Deviation Boundary

```text id="ed125"
MINOR
DEVIATION
≠
UNRECORDED
DEVIATION
ACCEPTABLE
```

---

# 126. Experiment Amendment

A planned amendment may be allowed before or during execution under controlled conditions.

---

# 127. Amendment Boundary

Permanent:

```text id="ed127"
AMENDMENT
AFTER
SEEING
FAVORABLE
RESULTS
≠
ORIGINAL
CONFIRMATORY
DESIGN
```

---

# 128. AI Experiment Configuration

AI experiments require exact configuration capture.

Potential:

```text id="ed128"
MODEL

MODEL
VERSION

PROVIDER

SYSTEM
PROMPT

PROMPT
VERSION

TEMPERATURE

TOP_P

REASONING
BUDGET

CONTEXT
WINDOW

TOOLS

MEMORY

RETRIEVAL

AGENT
TOPOLOGY

TIMEOUT

RETRY
```

---

# 129. Model Version Boundary

```text id="ed129"
SAME
MODEL
MARKETING
NAME
≠
SAME
EXPERIMENTAL
CONDITION
IF
PROVIDER
UPDATED
MODEL
```

---

# 130. Prompt Version Boundary

Permanent:

```text id="ed130"
SAME
MODEL
+
DIFFERENT
PROMPT
≠
SAME
EXPERIMENTAL
SYSTEM
```

---

# 131. Agent Version Boundary

```text id="ed131"
SAME
BASE
MODEL
≠
SAME
AGENT
BEHAVIOR
IF
TOOLS /
MEMORY /
POLICY
CHANGE
```

---

# 132. Tool Configuration

Tool configuration should record:

* versions.
* permissions.
* sandbox.
* side effects.
* retry behavior.

---

# 133. Tool Boundary

Permanent:

```text id="ed133"
SAME
TOOL
NAME
≠
SAME
TOOL
BEHAVIOR /
AUTHORITY
```

---

# 134. Memory State

Memory can contaminate repeated trials.

Potential controls:

```text id="ed134"
RESET
MEMORY
PER
RUN

FIXED
MEMORY
SNAPSHOT

SEPARATE
MEMORY
BY
CONDITION

EXPLICIT
PERSISTENCE
EXPERIMENT
```

---

# 135. Memory Boundary

```text id="ed135"
NEW
MODEL
RUN
≠
INDEPENDENT
RUN
IF
MEMORY
PERSISTS
```

---

# 136. Cache State

Caches can influence:

* latency.
* cost.
* retrieval.
* provider behavior.

---

# 137. Warm/Cold Boundary

Permanent:

```text id="ed137"
WARM
CACHE
PERFORMANCE
≠
COLD
START
PERFORMANCE
```

---

# 138. Randomness and Stochasticity

Sources:

```text id="ed138"
MODEL
SAMPLING

RANDOM
ASSIGNMENT

RETRIEVAL
RANKING

TOOL
TIMING

DISTRIBUTED
SYSTEM
ORDER

HUMAN
EVALUATION
```

---

# 139. Random Seed

Where controllable, record seeds.

---

# 140. Seed Boundary

```text id="ed140"
FIXED
SEED
≠
FULL
REPRODUCIBILITY
```

External Models and distributed systems may remain nondeterministic.

---

# 141. Temperature Zero Boundary

Permanent:

```text id="ed141"
TEMPERATURE
=
0
≠
PERFECT
DETERMINISM
PROVEN
```

---

# 142. Repeated Trials

Stochastic systems may require multiple trials per case.

---

# 143. Repeated Trial Boundary

```text id="ed143"
100
REPEATED
RUNS
OF
SAME
CONFIGURATION
≠
100
INDEPENDENT
REPLICATION
STUDIES
```

---

# 144. Environment Control

Record:

```text id="ed144"
HARDWARE

REGION

SOFTWARE
VERSION

DEPENDENCIES

NETWORK

RATE
LIMITS

LOAD

TIME

PROVIDER
STATE
WHERE
KNOWN
```

---

# 145. Environment Boundary

Permanent:

```text id="ed145"
SAME
CODE
≠
SAME
EXPERIMENTAL
ENVIRONMENT
```

---

# 146. Concurrency

Parallel execution may affect:

* rate limits.
* latency.
* Tool contention.
* queue times.

---

# 147. Concurrency Boundary

```text id="ed147"
SEQUENTIAL
RESULTS
≠
PARALLEL
LOAD
RESULTS
```

---

# 148. Retry Policy

Retries should be explicit.

Potential metrics:

```text id="ed148"
FIRST-
PASS
SUCCESS

EVENTUAL
SUCCESS

RETRY
COUNT

FAILURE
RATE
```

---

# 149. Retry Boundary

Permanent:

```text id="ed149"
EVENTUAL
SUCCESS
AFTER
RETRIES
≠
FIRST-
PASS
RELIABILITY
```

---

# 150. Side-Effect Experiments

Experiments involving real actions require stronger controls.

Examples:

* emails.
* prices.
* account changes.
* financial actions.

---

# 151. Side-Effect Boundary

```text id="ed151"
EXPERIMENT
NEEDS
REALISTIC
BEHAVIOR
≠
EXPERIMENT
AUTHORIZED
TO
CAUSE
UNBOUNDED
REAL
SIDE
EFFECTS
```

---

# 152. Sandbox Preference

Where possible, high-risk behavior should first be tested in sandbox or simulation.

---

# 153. Sandbox Boundary

Permanent:

```text id="ed153"
SANDBOX
PASS
≠
PRODUCTION
BEHAVIOR
PASS
```

---

# 154. Dataset Versioning

Every Experiment should pin exact Dataset versions.

---

# 155. Dataset Boundary

```text id="ed155"
DATASET
NAME
SAME
≠
DATASET
CONTENT
SAME
```

---

# 156. Train/Test Separation

Experiments involving Models should preserve clean evaluation separation where needed.

---

# 157. Leakage Boundary

Permanent:

```text id="ed157"
HIGH
EVALUATION
SCORE
≠
GENERALIZATION
IF
TRAIN /
TEST
LEAKAGE
EXISTS
```

---

# 158. Dataset Authority

Experiment authorization does not create Dataset authority.

```text id="ed158"
EXPERIMENT
APPROVED
≠
ANY
DATASET
AUTHORIZED
```

---

# 159. Project Scope

Every Experiment should bind to Project context.

---

# 160. Project Boundary

Permanent:

```text id="ed160"
EXPERIMENT
AUTHORIZED
FOR
PROJECT A
≠
AUTHORIZED
FOR
PROJECT B
```

---

# 161. Tenant Scope

Tenant Data or Tenant-facing experiments require Tenant-scoped authority.

---

# 162. Tenant Boundary

```text id="ed162"
TENANT A
EXPERIMENT
RESULT
≠
TENANT B
VALIDATION
```

---

# 163. Cross-Tenant Experiment

Cross-Tenant design should explicitly govern:

* Data.
* assignment.
* aggregation.
* confidentiality.
* service interference.

---

# 164. Cross-Tenant Boundary

Permanent:

```text id="ed164"
CROSS-
TENANT
COMPARISON
SCIENTIFICALLY
USEFUL
≠
RAW
CROSS-
TENANT
DATA
AUTHORIZED
```

---

# 165. Ethical Review

Experiments involving people, sensitive Data, manipulation, surveillance, biometrics or high-impact decisions may require ethics review.

---

# 166. Ethics Boundary

```text id="ed166"
SCIENTIFICALLY
VALID
DESIGN
≠
ETHICALLY
APPROVED
DESIGN
```

---

# 167. Bias Evaluation

Experiment Design should anticipate subgroup evaluation where material.

---

# 168. Bias Boundary

Permanent:

```text id="ed168"
AVERAGE
TREATMENT
EFFECT
POSITIVE
≠
EFFECT
POSITIVE
FOR
ALL
GROUPS
```

---

# 169. Privacy

Data collection should be proportionate to Research needs.

---

# 170. Privacy Boundary

```text id="ed170"
MORE
COVARIATES
MAY
IMPROVE
ANALYSIS
≠
MORE
PERSONAL
DATA
AUTHORIZED
```

---

# 171. Security

Experiment inputs may include:

* malicious prompts.
* unsafe files.
* hostile Tools.
* attack payloads.

These may require isolation.

---

# 172. Security Boundary

Permanent:

```text id="ed172"
RESEARCHER
NEEDS
TO
TEST
MALICIOUS
CONTENT
≠
MALICIOUS
CONTENT
SAFE
TO
RUN
UNSANDBOXED
```

---

# 173. Responsible AI Gate

Responsible AI requirements should align with:

```text id="ed173"
doc/26-research-lab/ethics/responsible-ai.md
```

---

# 174. Resource Budget

Experiments may define:

```text id="ed174"
TOKEN
BUDGET

MODEL
CALL
BUDGET

GPU
BUDGET

WALL
TIME

COST
BUDGET

AGENT
FANOUT
LIMIT

TOOL
CALL
LIMIT
```

---

# 175. Resource Boundary

```text id="ed175"
SCIENTIFIC
VALUE
POSSIBLE
≠
UNLIMITED
RESOURCE
CONSUMPTION
AUTHORIZED
```

---

# 176. Cost as Experimental Variable

Cost may itself be an outcome.

---

# 177. Cost Boundary

Permanent:

```text id="ed177"
LOWER
API
COST
≠
LOWER
TOTAL
SYSTEM
COST
AUTOMATICALLY
```

Human review and retries may dominate.

---

# 178. Experiment Failure Types

Potential:

```text id="ed178"
EF01
PROTOCOL
FAILURE

EF02
DATA
FAILURE

EF03
MODEL
FAILURE

EF04
TOOL
FAILURE

EF05
INFRASTRUCTURE
FAILURE

EF06
MEASUREMENT
FAILURE

EF07
EVALUATOR
FAILURE

EF08
AUTHORITY
FAILURE

EF09
PROJECT /
TENANT
ISOLATION
FAILURE

EF10
STATISTICAL
DESIGN
FAILURE

EF11
SAFETY /
ETHICS
FAILURE

EF12
RESOURCE
EXHAUSTION
```

---

# 179. Failure Boundary

```text id="ed179"
EXPERIMENT
RUN
FAILED
TECHNICALLY
≠
HYPOTHESIS
FAILED
```

---

# 180. Missingness

Failed runs should not silently disappear.

---

# 181. Missing Run Boundary

Permanent:

```text id="ed181"
FAILED
RUN
EXCLUDED
FROM
ANALYSIS
WITHOUT
PREDEFINED
RULE
≠
UNBIASED
ANALYSIS
```

---

# 182. Intention-to-Treat

Where applicable, analysis may preserve assigned treatment regardless of actual receipt.

This depends on experiment type.

---

# 183. Per-Protocol Analysis

Per-protocol analysis may be useful but can introduce selection bias.

---

# 184. Analysis Population Boundary

```text id="ed184"
PER-
PROTOCOL
RESULT
≠
INTENTION-
TO-
TREAT
RESULT
```

---

# 185. Experiment Review Gate

Before execution, verify:

```text id="ed185"
QUESTION

HYPOTHESIS

POPULATION

UNIT

TREATMENT

CONTROL

VARIABLES

METRICS

SAMPLE
PLAN

STATISTICAL
PLAN

PROTOCOL

DATASET

MODEL /
PROMPT /
AGENT /
TOOLS

ETHICS /
SECURITY /
PRIVACY

PROJECT /
TENANT

HALT
PLAN
```

---

# 186. Ready-State Boundary

Permanent:

```text id="ed186"
EXPERIMENT
MARKED
READY
≠
ALL
READINESS
CONTROLS
VERIFIED
UNTIL
EVIDENCE
CONFIRMS
```

---

# 187. Experiment Design Review Record

```yaml id="ed187"
experiment_design_review:
  review_id: required

  experiment_ref: required
  design_version: required

  methodology_review_ref: required

  statistical_review_ref: conditional

  dataset_review_ref: required

  ethics_review_ref: conditional
  security_review_ref: conditional
  privacy_review_ref: conditional

  project_scope_review_ref: required
  tenant_scope_review_ref: conditional

  unresolved_issues: []

  decision: required

  authority_ref: required

  status: required
```

---

# 188. Approval Boundary

```text id="ed188"
METHODOLOGY
REVIEW
PASS
≠
FOUNDER
APPROVAL

AND

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL
```

---

# 189. HALT

Potential HALT triggers:

```text id="ed189"
CRITICAL
SAFETY
FAILURE

TENANT
ISOLATION
FAILURE

SECRET
EXPOSURE

UNAUTHORIZED
SIDE
EFFECT

DATASET
AUTHORITY
REVOKED

UNEXPECTED
HUMAN
HARM

RUNAWAY
COST

PROTOCOL
CORRUPTION
```

---

# 190. HALT Boundary

Permanent:

```text id="ed190"
EXPERIMENT
HALT
REQUESTED
≠
EXPERIMENT
HALTED
UNTIL
EXECUTION
CONFIRMED
```

---

# 191. HALT Propagation

Verify:

* queued runs.
* active Models.
* child Agents.
* Tool calls.
* external provider requests.
* scheduled jobs.

---

# 192. Post-HALT Reconciliation

Ask:

```text id="ed192"
WHICH
RUNS
COMPLETED?

WHICH
RUNS
PARTIALLY
EXECUTED?

WHAT
SIDE
EFFECTS
OCCURRED?

WHAT
DATA
WAS
EXPOSED?

WHICH
PROJECTS /
TENANTS
AFFECTED?

CAN
RESULTS
STILL
BE
USED?

IS
REPLICATION
REQUIRED?
```

---

# 193. Resume

Resume requires:

```text id="ed193"
ROOT
CAUSE
UNDERSTOOD

+

REMEDIATION

+

PROTOCOL
REVALIDATION

+

AUTHORITY
CURRENT

+

RISK
ACCEPTED

+

HALT
CONDITION
CLEARED
```

---

# 194. Resume Boundary

```text id="ed194"
EXPERIMENT
TECHNICALLY
RUNNABLE
≠
EXPERIMENT
AUTHORIZED
TO
RESUME
```

---

# 195. Reproducibility

Reproducibility asks whether the same analysis/procedure can produce consistent findings from the same underlying setup.

---

# 196. Reproducibility Package

Potential:

```text id="ed196"
EXPERIMENT
VERSION

PROTOCOL

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

ENVIRONMENT

SEEDS

DEPENDENCIES

EVALUATOR

ANALYSIS
CODE /
METHOD

RAW
RUN
REFERENCES
```

---

# 197. Reproducibility Boundary

Permanent:

```text id="ed197"
SAME
CODE
AVAILABLE
≠
EXPERIMENT
REPRODUCIBLE
```

---

# 198. Replication

Replication is a new attempt to test a finding.

Potential:

```text id="ed198"
DIRECT
REPLICATION

CONCEPTUAL
REPLICATION

INDEPENDENT
REPLICATION
```

---

# 199. Replication Boundary

```text id="ed199"
RE-
RUN
SAME
SCRIPT
≠
INDEPENDENT
REPLICATION
```

---

# 200. Independent Replication

May differ in:

* operator.
* environment.
* Dataset sample.
* implementation.

while preserving hypothesis.

---

# 201. Replication Failure

A failed replication should trigger deeper review rather than selective dismissal.

---

# 202. Replication Boundary

Permanent:

```text id="ed202"
ORIGINAL
RESULT
SIGNIFICANT
+
REPLICATION
FAILS
≠
ORIGINAL
RESULT
STILL
UNQUESTIONABLY
TRUE
```

---

# 203. Experiment Design Metrics

Potential:

```text id="ed203"
REGISTERED
EXPERIMENTS

PREREGISTERED
EXPERIMENTS

EXPERIMENTS
WITH
PRIMARY
OUTCOME
DEFINED

EXPERIMENTS
WITH
POWER /
SAMPLE
PLAN

PROTOCOL
DEVIATIONS

HALTED
EXPERIMENTS

REPLICATIONS

FAILED
REPLICATIONS

EXPERIMENTS
WITH
REPRODUCIBILITY
PACKAGE

UNRESOLVED
DESIGN
ISSUES
```

---

# 204. Metric Boundary

```text id="ed204"
MORE
EXPERIMENTS
RUN
≠
MORE
KNOWLEDGE
GENERATED
```

Poor experiments can create noise.

---

# 205. Preregistration Coverage

Potential:

```text id="ed205"
CONFIRMATORY
EXPERIMENTS
PREREGISTERED

/

CONFIRMATORY
EXPERIMENTS
REQUIRING
PREREGISTRATION
```

---

# 206. Deviation Rate

Potential:

```text id="ed206"
RUNS
WITH
MATERIAL
PROTOCOL
DEVIATION

/

TOTAL
RUNS
```

Interpret carefully.

---

# 207. Deviation Metric Boundary

Permanent:

```text id="ed207"
LOW
DEVIATION
RATE
≠
HIGH
SCIENTIFIC
QUALITY
AUTOMATICALLY
```

---

# 208. Experiment Design Checklist

## Research Question

* [x] Research Question defined.
* [x] objective defined.
* [x] hypothesis defined.
* [x] null/alternative structure defined where applicable.
* [x] falsifiability considered.
* [x] estimand defined where appropriate.

## Experimental Structure

* [x] experimental unit defined.
* [x] unit of analysis defined.
* [x] population defined.
* [x] sampling frame defined.
* [x] inclusion/exclusion criteria defined.
* [x] treatment defined.
* [x] control/baseline defined.

## Variables

* [x] independent variables defined.
* [x] dependent variables defined.
* [x] control variables defined.
* [x] confounders defined.
* [x] mediators/moderators defined.
* [x] operationalization defined.

## Assignment

* [x] randomization defined.
* [x] stratification defined.
* [x] blocking defined.
* [x] clustering defined.
* [x] matching defined.
* [x] spillovers defined.
* [x] contamination defined.

## Measurement

* [x] primary outcome defined.
* [x] secondary outcomes defined.
* [x] guardrails defined.
* [x] metric definitions defined.
* [x] success criteria defined.
* [x] practical significance defined.

## Statistics

* [x] sample-size planning defined.
* [x] statistical power defined.
* [x] effect size defined.
* [x] variance assumptions defined.
* [x] sequential testing defined.
* [x] stopping rules defined.
* [x] multiple comparisons defined.

## AI Configuration

* [x] Dataset version defined.
* [x] Model version defined.
* [x] Prompt version defined.
* [x] Agent version defined.
* [x] Tool configuration defined.
* [x] Memory state defined.
* [x] random seeds defined.
* [x] environment defined.
* [x] retries defined.

## Evaluators

* [x] Human evaluation defined.
* [x] blinding defined.
* [x] Judge Model defined.
* [x] evaluator bias defined.
* [x] disagreement defined.

## Governance

* [x] Project scope defined.
* [x] Tenant scope defined.
* [x] Dataset authority defined.
* [x] ethics defined.
* [x] bias evaluation defined.
* [x] privacy defined.
* [x] Security defined.
* [x] Responsible AI defined.
* [x] resource budget defined.

## Protocol

* [x] preregistration defined.
* [x] protocol versioning defined.
* [x] deviations defined.
* [x] amendments defined.
* [x] HALT defined.
* [x] Resume defined.
* [x] reproducibility defined.
* [x] replication defined.
* [x] Runtime Truth defined.

---

# 209. Positive Verification Scenarios

Future Experiment Design capability should verify at least:

```text id="ed209"
EDV-01
RESEARCH
QUESTION
DOES
NOT
AUTO-
BECOME
HYPOTHESIS

EDV-02
HYPOTHESIS
DOES
NOT
AUTO-
BECOME
CONCLUSION

EDV-03
CORRELATION
DOES
NOT
AUTO-
BECOME
CAUSATION

EDV-04
RANDOM
ASSIGNMENT
DOES
NOT
AUTO-
BECOME
RANDOM
SAMPLING

EDV-05
REPEATED
ROWS
FROM
SAME
UNIT
DO
NOT
AUTO-
BECOME
INDEPENDENT
SAMPLES

EDV-06
ASSIGNED
TREATMENT
DOES
NOT
AUTO-
BECOME
RECEIVED
TREATMENT

EDV-07
CONTROL
GROUP
DOES
NOT
AUTO-
BECOME
FREE
FROM
ALL
INFLUENCE

EDV-08
BASELINE
DOES
NOT
AUTO-
BECOME
GROUND
TRUTH

EDV-09
PRIMARY
OUTCOME
FAILURE
CANNOT
BE
SILENTLY
REPLACED
WITH
SUCCESSFUL
SECONDARY
OUTCOME

EDV-10
CRITICAL
GUARDRAIL
FAILURE
CAN
OVERRIDE
PRIMARY
METRIC
SUCCESS

EDV-11
RANDOMIZATION
DOES
NOT
AUTO-
GUARANTEE
FINITE-
SAMPLE
BALANCE

EDV-12
HIGH
POWER
DOES
NOT
AUTO-
BECOME
VALID
DESIGN

EDV-13
STATISTICAL
SIGNIFICANCE
DOES
NOT
AUTO-
BECOME
PRACTICAL
SIGNIFICANCE

EDV-14
REPEATED
INTERIM
PEEKING
CANNOT
BE
TREATED
AS
FIXED-
HORIZON
ANALYSIS

EDV-15
PREREGISTRATION
DOES
NOT
AUTO-
BECOME
CORRECT
METHOD

EDV-16
POST-
RESULT
HYPOTHESIS
IS
LABELED
EXPLORATORY

EDV-17
PROTOCOL
DEVIATION
IS
RECORDED
AND
IMPACT-
ASSESSED

EDV-18
TEMPERATURE
ZERO
DOES
NOT
AUTO-
BECOME
DETERMINISM
CLAIM

EDV-19
FIXED
SEED
DOES
NOT
AUTO-
BECOME
FULL
REPRODUCIBILITY

EDV-20
RETRIES
DO
NOT
HIDE
FIRST-
PASS
RELIABILITY

EDV-21
EXPERIMENT
APPROVAL
DOES
NOT
AUTO-
GRANT
DATASET
AUTHORITY

EDV-22
PROJECT A
EXPERIMENT
DOES
NOT
AUTO-
AUTHORIZE
PROJECT B
EXPERIMENT

EDV-23
TENANT A
RESULT
DOES
NOT
AUTO-
GENERALIZE
TO
TENANT B

EDV-24
HALT
PROPAGATES
TO
QUEUED /
ACTIVE
AGENT /
TOOL
RUNS

EDV-25
CONTROLLED
EXPERIMENT
SUCCESS
DOES
NOT
AUTO-
AUTHORIZE
PRODUCTION
```

---

# 210. Negative Verification Scenarios

Containment, correction or invalidation should occur when:

* Research Question is written after results and described as original hypothesis.
* preferred conclusion is embedded in objective as "prove Model B is better."
* one statistically significant correlation is reported as causal proof without design supporting causality.
* thousands of observations from a few users are treated as thousands of independent users.
* Dataset rows are randomized but users appear in both treatment and control conditions without accounting for dependence.
* treatment assignment is randomized but a large fraction never receives assigned treatment and analysis ignores this.
* baseline is old Production system with materially different Dataset and environment but comparison is presented as controlled.
* primary outcome fails, secondary metric succeeds and report claims primary hypothesis confirmed.
* quality improves while critical safety guardrail fails and Experiment is still called successful.
* results are checked repeatedly until significance appears and no sequential-testing correction exists.
* Experiment stops when desired answer appears despite preregistered fixed sample.
* 100 metrics are tested and only favorable significant Results are published.
* post-hoc hypothesis is rewritten into preregistration after seeing Results.
* Experiment protocol changes Model midway without creating amendment/version.
* Dataset version silently changes during run.
* provider Model alias updates midway and Results are combined as one Model condition.
* Model remains same but Prompt changes and runs are treated as identical.
* Agent Memory persists across supposedly independent conditions.
* cached results make one condition faster and warm/cold state is ignored.
* fixed random seed is used and report claims complete reproducibility across external providers.
* failed Model calls are removed while successful retries remain, inflating reliability.
* Human evaluator knows which output came from preferred Model and no bias limitation is documented.
* Judge Model favors verbose outputs and is the only evaluator.
* Experiment approved for Research and system assumes any Tenant Dataset may be used.
* Tenant A Experiment Result is generalized to all customers without population evidence.
* high-risk side-effect Experiment is executed against real users before sandbox testing without authority.
* safety incident occurs but statistical stopping rule says continue and experiment continues.
* HALT is requested but queued Agents and Tool calls continue.
* technical Experiment run fails and researchers describe hypothesis as disproven.
* one successful rerun is called independent replication.
* Pilot Experiment succeeds and is represented as Product or Production authorization.

---

# 211. Experiment Design Evidence Requirements

Material Experiment designs should eventually link to:

```text id="ed211"
EXPERIMENT
ID

VERSION

RESEARCH
QUESTION

OBJECTIVE

HYPOTHESIS

ESTIMAND
WHERE
RELEVANT

EXPERIMENT
TYPE

POPULATION

EXPERIMENTAL
UNIT

UNIT
OF
ANALYSIS

SAMPLE
PLAN

INCLUSION /
EXCLUSION

TREATMENT

CONTROL

VARIABLES

CONFOUNDERS

ASSIGNMENT

PRIMARY
OUTCOME

SECONDARY
OUTCOMES

GUARDRAILS

METRICS

SAMPLE-
SIZE
PLAN

STATISTICAL
PLAN

STOPPING
RULES

MULTIPLE
COMPARISON
PLAN

DATASET
VERSION

MODEL
VERSION

PROMPT
VERSION

AGENT /
TOOL /
MEMORY
CONFIG

ENVIRONMENT

EVALUATOR

PROJECT

TENANT

ETHICS /
PRIVACY /
SECURITY

RESOURCE
BUDGET

PROTOCOL

PREREGISTRATION

HALT /
RESUME

APPROVAL
STATE
```

---

# 212. Controlled Experiment Design Pilot

An initial Pilot should prefer:

```text id="ed212"
ONE
CLEAR
QUESTION

ONE
PRIMARY
HYPOTHESIS

KNOWN
DATASET

PINNED
MODEL

VERSIONED
PROMPT

NO
UNCONTROLLED
REAL
SIDE
EFFECTS

SINGLE
PROJECT

NO
CROSS-
TENANT
RAW
DATA

CLEAR
PRIMARY
METRIC

FEW
GUARDRAILS

FIXED
PROTOCOL

FIXED
STOPPING
RULE

FULL
CONFIGURATION
CAPTURE

FULL
AUDIT

FAST
HALT
```

---

# 213. Pilot Exit Criteria

Verify:

* Research Question.
* hypothesis.
* experimental unit.
* sample.
* treatment/control.
* variables.
* randomization or assignment.
* metrics.
* guardrails.
* statistical plan.
* Dataset/version.
* Model/Prompt/Agent/Tool configuration.
* Project/Tenant boundaries.
* preregistration.
* deviations.
* HALT/Resume.
* reproducibility package.

---

# 214. Pilot Boundary

Permanent:

```text id="ed214"
EXPERIMENT
DESIGN
PILOT
SUCCESS
≠
PRODUCTION
EXPERIMENTATION
CONTROL
PLANE
AUTHORIZED
```

---

# 215. Production-Connected Experiment Requirements

Before experiments interact with Production scope, governance should define and verify:

```text id="ed215"
EXPERIMENT
IDENTITY

DESIGN
VERSION

QUESTION /
HYPOTHESIS

POPULATION

USER /
TENANT
ELIGIBILITY

ASSIGNMENT

SIDE-
EFFECT
LIMITS

DATASET
AUTHORITY

PROJECT /
TENANT
ISOLATION

METRICS /
GUARDRAILS

STOPPING
RULES

ETHICS

PRIVACY

SECURITY

RESPONSIBLE
AI

RESOURCE
LIMITS

INCIDENT
HANDLING

HALT

ROLLBACK

AUDIT

PRODUCTION
AUTHORIZATION
```

---

# 216. Production Boundary

```text id="ed216"
EXPERIMENT
SCIENTIFICALLY
VALID
≠
EXPERIMENT
AUTHORIZED
TO
RUN
IN
PRODUCTION
```

---

# 217. Experiment Design Maturity Model

Conceptual:

```text id="ed217"
EDM0
=
EXPERIMENT
DESIGN
FRAMEWORK
DOCUMENTED

EDM1
=
QUESTION /
HYPOTHESIS /
VARIABLE /
TREATMENT /
CONTROL /
METRIC
MODELS
DEFINED

EDM2
=
SAMPLING /
ASSIGNMENT /
STATISTICS /
PROTOCOL /
PREREGISTRATION
CONTRACTS
DESIGNED

EDM3
=
CONTROLLED
EXPERIMENT
DESIGN
WORKFLOW
IMPLEMENTED

EDM4
=
EXPERIMENT
REGISTRY /
DATASET /
MODEL /
PROMPT /
METRIC /
PROTOCOL
INTEGRATED

EDM5
=
AGENT /
MULTI-
AGENT /
TOOL /
HUMAN
EVALUATION /
REPLICATION
INTEGRATED

EDM6
=
PROJECT /
TENANT /
ETHICS /
SECURITY /
HALT /
RESOURCE
CONTROLS
IMPLEMENTED

EDM7
=
CRITICAL
EXPERIMENT
DESIGN
BOUNDARIES
VERIFIED

EDM8
=
CONTROLLED
EXPERIMENT
DESIGN
PILOT
VERIFIED

EDM9
=
PRODUCTION-SCOPE
EXPERIMENTATION
CONTROL
PLANE
SEPARATELY
AUTHORIZED
```

---

# 218. Maturity Boundary

Permanent:

```text id="ed218"
EDM8
≠
EDM9
```

---

# 219. Repository Evidence

The verified VS Code screenshot establishes:

```text id="ed219"
doc/26-research-lab/experiments/
├── experiment-design.md
├── experiment-results.md
└── experiment-tracking.md
```

This document corresponds to the first screenshot-verified file in `experiments/`.

---

# 220. Screenshot Truth Boundary

Permanent:

```text id="ed220"
FILE
VISIBLE
IN
VS CODE
TREE
≠
FILE
CONTENT
COMPLETE
```

---

# 221. Repository Save Boundary

This document is generated for:

```text id="ed221"
doc/26-research-lab/experiments/experiment-design.md
```

Permanent:

```text id="ed222"
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

# 222. Current Documentation Truth

```text id="ed223"
EXPERIMENT_DESIGN_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 223. Current Runtime Truth

Nothing in this document independently proves implementation of Experiment Design infrastructure.

```text id="ed224"
EXPERIMENT_REGISTRY_RUNTIME
=
NOT_PROVEN

RESEARCH_QUESTION_REGISTRY
=
NOT_PROVEN

HYPOTHESIS_REGISTRY
=
NOT_PROVEN

EXPERIMENT_PROTOCOL_REGISTRY
=
NOT_PROVEN

EXPERIMENT_PREREGISTRATION_RUNTIME
=
NOT_PROVEN

RANDOMIZATION_RUNTIME
=
NOT_PROVEN

STRATIFICATION_RUNTIME
=
NOT_PROVEN

SAMPLE_SIZE_PLANNING_RUNTIME
=
NOT_PROVEN

STATISTICAL_POWER_RUNTIME
=
NOT_PROVEN

SEQUENTIAL_TESTING_RUNTIME
=
NOT_PROVEN

MULTIPLE_COMPARISON_RUNTIME
=
NOT_PROVEN

EXPERIMENT_CONFIGURATION_SNAPSHOT_RUNTIME
=
NOT_PROVEN

DATASET_VERSION_PINNING_RUNTIME
=
NOT_PROVEN

MODEL_VERSION_PINNING_RUNTIME
=
NOT_PROVEN

PROMPT_VERSION_PINNING_RUNTIME
=
NOT_PROVEN

AGENT_EXPERIMENT_RUNTIME
=
NOT_PROVEN

MULTI_AGENT_EXPERIMENT_RUNTIME
=
NOT_PROVEN

TOOL_EXPERIMENT_RUNTIME
=
NOT_PROVEN

MEMORY_ISOLATION_RUNTIME
=
NOT_PROVEN

EXPERIMENT_ENVIRONMENT_SNAPSHOT_RUNTIME
=
NOT_PROVEN

HUMAN_EVALUATION_EXPERIMENT_RUNTIME
=
NOT_PROVEN

JUDGE_MODEL_EXPERIMENT_RUNTIME
=
NOT_PROVEN

EXPERIMENT_PROJECT_SCOPE_ENFORCEMENT
=
NOT_PROVEN

EXPERIMENT_TENANT_SCOPE_ENFORCEMENT
=
NOT_PROVEN

PROTOCOL_DEVIATION_RUNTIME
=
NOT_PROVEN

EXPERIMENT_HALT_RUNTIME
=
NOT_PROVEN

EXPERIMENT_REPRODUCIBILITY_RUNTIME
=
NOT_PROVEN

EXPERIMENT_REPLICATION_RUNTIME
=
NOT_PROVEN

CONTROLLED_EXPERIMENT_DESIGN_PILOT
=
NOT_PROVEN

PRODUCTION_EXPERIMENTATION_CONTROL_PLANE
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 224. Approval Truth

```text id="ed225"
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

# 225. Production Hard Stops

Production-connected Experiment execution should remain blocked where applicable if:

```text id="ed226"
RESEARCH
QUESTION
UNDEFINED

HYPOTHESIS
UNDEFINED
WHERE
REQUIRED

POPULATION
UNDEFINED

EXPERIMENTAL
UNIT
UNDEFINED

TREATMENT
UNDEFINED

CONTROL /
COMPARATOR
UNDEFINED

VARIABLES
UNDEFINED

PRIMARY
OUTCOME
UNDEFINED

GUARDRAILS
UNDEFINED
WHERE
REQUIRED

METRIC
DEFINITION
UNVERIFIED

SAMPLE
PLAN
UNDEFINED

STATISTICAL
PLAN
UNDEFINED

STOPPING
RULE
UNDEFINED

DATASET
VERSION
UNPINNED

DATASET
AUTHORITY
UNVERIFIED

MODEL
VERSION
UNPINNED

PROMPT
VERSION
UNPINNED

AGENT /
TOOL /
MEMORY
CONFIGURATION
UNRECORDED

ENVIRONMENT
UNRECORDED

PROJECT
SCOPE
UNVERIFIED

TENANT
SCOPE
UNVERIFIED

ETHICS
REVIEW
MISSING
WHERE
REQUIRED

PRIVACY
REVIEW
MISSING
WHERE
REQUIRED

SECURITY
REVIEW
MISSING
WHERE
REQUIRED

RESPONSIBLE
AI
GATE
MISSING
WHERE
REQUIRED

SIDE-
EFFECT
AUTHORITY
UNVERIFIED

RESOURCE
LIMITS
UNDEFINED

PROTOCOL
UNAPPROVED

HALT /
RESUME
UNVERIFIED

AUDIT
UNVERIFIED

CONTROLLED
PILOT
EVIDENCE
MISSING

PRODUCTION
AUTHORIZATION
MISSING
```

---

# 226. Permanent Experiment Design Invariants

```text id="ed227"
QUESTION
≠
HYPOTHESIS

HYPOTHESIS
≠
CONCLUSION

ASSOCIATION
≠
CAUSATION

STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE

OBSERVATIONAL
STUDY
≠
RANDOMIZED
EXPERIMENT

DESIGN
APPROVAL
≠
RESULT
APPROVAL

BROAD
QUESTION
≠
TESTABLE
QUESTION
WITHOUT
OPERATIONALIZATION

"PROVE X"
≠
NEUTRAL
RESEARCH
OBJECTIVE

FAIL
TO
REJECT
H0
≠
H0
TRUE

METRIC
≠
CAUSAL
ESTIMAND

ROW
≠
INDEPENDENT
UNIT

MORE
ROWS
FROM
SAME
UNIT
≠
MORE
INDEPENDENT
EVIDENCE

SAMPLE
≠
TARGET
POPULATION

REMOVE
UNFAVORABLE
CASE
≠
VALID
EXCLUSION

RANDOM
ASSIGNMENT
≠
RANDOM
SAMPLING

ASSIGNED
TREATMENT
≠
RECEIVED
TREATMENT

CONTROL
≠
NO
OTHER
INFLUENCE

BASELINE
≠
GROUND
TRUTH

CORRELATED
VARIABLE
≠
CONFOUNDER
AUTOMATICALLY

NUMERIC
MEASURE
≠
VALID
MEASURE

PROXY
≠
UNDERLYING
CONSTRUCT

SECONDARY
SUCCESS
≠
PRIMARY
SUCCESS

PRIMARY
METRIC
IMPROVES
≠
SUCCESS
IF
CRITICAL
GUARDRAIL
FAILS

METRIC
NAME
SAME
≠
METRIC
DEFINITION
SAME

STATISTICAL
CRITERION
PASS
≠
BUSINESS
DECISION
MANDATE

NEGATIVE
RESULT
≠
FAILED
RESEARCH

RANDOMIZATION
≠
PERFECT
FINITE-
SAMPLE
BALANCE

MANY
OBSERVATIONS
IN
FEW
CLUSTERS
≠
MANY
INDEPENDENT
UNITS

MATCHING
ON
OBSERVED
COVARIATES
≠
NO
UNOBSERVED
CONFOUNDING

CAUSAL
GRAPH
≠
CAUSAL
ASSUMPTIONS
TRUE

ASSIGNED
CONTROL
≠
UNEXPOSED
CONTROL

RANDOMIZATION
≠
NO
SPILLOVER

MODEL
IDENTITY
HIDDEN
≠
FULL
BLINDING

HUMAN
SCORE
≠
OBJECTIVE
TRUTH

JUDGE
CONSISTENT
≠
JUDGE
UNBIASED

HUMAN
+
MODEL
AGREEMENT
≠
GROUND
TRUTH

LARGER
SAMPLE
≠
BETTER
INVALID
DESIGN

HIGH
POWER
≠
VALID
CAUSAL
DESIGN

EFFECT
SIZE
≠
BUSINESS
VALUE

POWER
ASSUMPTION
≠
VERIFIED
ASSUMPTION

PEEK
UNTIL
SIGNIFICANT
≠
VALID
FIXED-
HORIZON
TEST

DESIRED
RESULT
≠
VALID
STOPPING
RULE

STATISTICAL
PLAN
≠
MANDATE
TO
CONTINUE
AFTER
CRITICAL
SAFETY
FAILURE

MANY
TESTS
+
FEW
SIGNIFICANT
RESULTS
≠
TRUE
EFFECTS
PROVEN

POST-
RESULT
HYPOTHESIS
≠
PREREGISTERED
HYPOTHESIS

PREREGISTERED
≠
CORRECT

PROTOCOL
DOCUMENTED
≠
PROTOCOL
FOLLOWED

DEVIATION
≠
INVALIDATION
AUTOMATICALLY

MINOR
DEVIATION
≠
UNRECORDED
DEVIATION
ACCEPTABLE

AMENDMENT
AFTER
RESULTS
≠
ORIGINAL
CONFIRMATORY
DESIGN

MODEL
MARKETING
NAME
SAME
≠
SAME
CONDITION

SAME
MODEL
+
DIFFERENT
PROMPT
≠
SAME
SYSTEM

SAME
BASE
MODEL
≠
SAME
AGENT

TOOL
NAME
SAME
≠
TOOL
BEHAVIOR
SAME

NEW
RUN
≠
INDEPENDENT
IF
MEMORY
PERSISTS

WARM
CACHE
≠
COLD
START

FIXED
SEED
≠
FULL
REPRODUCIBILITY

TEMPERATURE
ZERO
≠
PERFECT
DETERMINISM

REPEATED
RUNS
≠
INDEPENDENT
REPLICATION

SAME
CODE
≠
SAME
ENVIRONMENT

SEQUENTIAL
RESULT
≠
PARALLEL
LOAD
RESULT

EVENTUAL
SUCCESS
≠
FIRST-
PASS
RELIABILITY

REALISTIC
EXPERIMENT
≠
UNBOUNDED
REAL
SIDE-
EFFECT
AUTHORITY

SANDBOX
PASS
≠
PRODUCTION
PASS

DATASET
NAME
SAME
≠
DATASET
CONTENT
SAME

HIGH
EVALUATION
SCORE
≠
GENERALIZATION
WITH
LEAKAGE

EXPERIMENT
APPROVAL
≠
DATASET
AUTHORITY

PROJECT A
≠
PROJECT B
AUTHORITY

TENANT A
RESULT
≠
TENANT B
VALIDATION

CROSS-
TENANT
SCIENTIFIC
VALUE
≠
CROSS-
TENANT
DATA
AUTHORITY

SCIENTIFICALLY
VALID
≠
ETHICALLY
APPROVED

AVERAGE
POSITIVE
EFFECT
≠
POSITIVE
EFFECT
FOR
ALL
GROUPS

MORE
COVARIATES
≠
MORE
PERSONAL
DATA
AUTHORITY

SECURITY
RESEARCH
NEED
≠
UNSANDBOXED
MALICIOUS
CONTENT
AUTHORITY

SCIENTIFIC
VALUE
≠
UNLIMITED
RESOURCE
BUDGET

LOWER
API
COST
≠
LOWER
TOTAL
COST

TECHNICAL
RUN
FAILURE
≠
HYPOTHESIS
FAILURE

FAILED
RUN
EXCLUSION
≠
UNBIASED
ANALYSIS
WITHOUT
RULE

PER-
PROTOCOL
≠
INTENTION-
TO-
TREAT

READY
LABEL
≠
READINESS
VERIFIED

METHODOLOGY
PASS
≠
FOUNDER
APPROVAL

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

HALT
REQUEST
≠
HALT
VERIFIED

RUNNABLE
≠
AUTHORIZED
TO
RESUME

SAME
CODE
AVAILABLE
≠
REPRODUCIBLE

RERUN
≠
INDEPENDENT
REPLICATION

ORIGINAL
SIGNIFICANCE
+
FAILED
REPLICATION
≠
ORIGINAL
RESULT
UNQUESTIONABLY
TRUE

MORE
EXPERIMENTS
≠
MORE
KNOWLEDGE

LOW
DEVIATION
RATE
≠
HIGH
SCIENTIFIC
QUALITY

EXPERIMENT
DESIGN
PILOT
≠
PRODUCTION
EXPERIMENTATION
AUTHORIZATION

SCIENTIFIC
VALIDITY
≠
PRODUCTION
EXECUTION
AUTHORITY

EDM8
≠
EDM9

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

# 227. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="ed228"
## RESEARCH-LAB-CHG-20260814-043 — Experiment Design Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-14 |
| Change Type | `CREATED`, `EXPERIMENTS`, `EXPERIMENT-DESIGN`, `HYPOTHESES`, `CAUSAL-DESIGN`, `RANDOMIZATION`, `STATISTICAL-PLANNING`, `PREREGISTRATION`, `AI-CONFIGURATION`, `PROTOCOL`, `REPRODUCIBILITY`, `HALT`, `RUNTIME-TRUTH` |
| Impact | `I5 — Research Experiment Design Foundation` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Canonical | `NO` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/experiments/experiment-design.md`

### Documentation Truth

`EXPERIMENT_DESIGN_FRAMEWORK = CONTENT_COMPLETE_FOR_REVIEW`

### Experiments Folder Truth

`EXPERIMENTS_VISIBLE_FILES = 1 / 3 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`EXPERIMENT_DESIGN_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_EXPERIMENTATION_CONTROL_PLANE = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 228. Final Experiment Design Rule

The Mianx.ai Experiment Design framework should operate conceptually as:

```text id="ed229"
RESEARCH
QUESTION

↓

HYPOTHESIS /
ESTIMAND

↓

POPULATION /
UNIT

↓

TREATMENT /
CONTROL

↓

VARIABLES /
CONFOUNDERS

↓

SAMPLING /
ASSIGNMENT

↓

PRIMARY /
SECONDARY /
GUARDRAIL
METRICS

↓

SAMPLE-
SIZE /
STATISTICAL
PLAN

↓

DATASET /
MODEL /
PROMPT /
AGENT /
TOOL /
MEMORY
CONFIG

↓

PROJECT /
TENANT /
ETHICS /
PRIVACY /
SECURITY

↓

PROTOCOL /
PREREGISTRATION

↓

READINESS
REVIEW

↓

EXECUTION

↓

DEVIATION /
HALT
CONTROL

↓

ANALYSIS /
CHALLENGE

↓

REPRODUCIBILITY /
REPLICATION

↓

SEPARATE
PRODUCTION
AUTHORIZATION
```

while permanently preserving:

```text id="ed230"
QUESTION
≠
HYPOTHESIS

HYPOTHESIS
≠
CONCLUSION

CORRELATION
≠
CAUSATION

RANDOMIZATION
≠
ALL
BIAS
ELIMINATED

BASELINE
≠
GROUND
TRUTH

METRIC
≠
OBJECTIVE

PROXY
≠
REAL
OUTCOME

STATISTICAL
SIGNIFICANCE
≠
PRACTICAL
SIGNIFICANCE

POWER
≠
VALID
DESIGN

PREREGISTRATION
≠
CORRECTNESS

PROTOCOL
≠
EXECUTION
PROOF

REPEATED
RUNS
≠
REPLICATION

FIXED
SEED
≠
REPRODUCIBILITY
GUARANTEE

JUDGE
SCORE
≠
OBJECTIVE
TRUTH

HUMAN
EVALUATION
≠
UNBIASED
EVALUATION

EXPERIMENT
SUCCESS
≠
PRODUCT
SUCCESS

PILOT
≠
PRODUCTION

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

DOCUMENTATION
≠
RUNTIME
```

---

# 229. Next Document

The screenshot-verified `experiments/` sequence is:

```text id="ed231"
1. experiment-design.md
2. experiment-results.md
3. experiment-tracking.md
```

`experiment-design.md` is now content-complete for review in this documentation workflow.

The next verified document should define the complete **Experiment Results framework**, including raw Results, run-level outputs, metric observations, aggregation, uncertainty, effect sizes, statistical testing, primary versus secondary outcomes, guardrails, negative Results, null findings, failed runs, missing Data, outliers, protocol deviations, intention-to-treat versus per-protocol Results, subgroup Results, fairness Results, cost/latency Results, confidence intervals, multiple comparisons, exploratory Results, causal interpretation boundaries, practical significance, sensitivity analysis, robustness checks, replication Results, contradiction handling, Evidence and Counter-Evidence, claim grading, result validity, reproducibility, reporting, publication boundaries, Decision support, Knowledge Transfer, Runtime Truth and Production authorization boundaries.

## NEXT DOCUMENT

```text id="ed232"
doc/26-research-lab/experiments/experiment-results.md
```

---