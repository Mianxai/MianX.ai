---

id: RESEARCH-LAB-CHECKLISTS-001
title: Mianx.ai Research Lab Checklists
version: 1.0.0
status: Draft

description: Enterprise-grade operational, governance, quality, Security, validation and production-readiness checklist system for the Mianx.ai Research Lab. This document provides reusable gates and checklists for Research intake, Question formation, scope binding, Project and Tenant isolation, purpose limitation, R0-R4 risk classification, A0-A5 autonomy classification, Research authorization, prior-knowledge review, hypothesis and objective quality, method selection, Research planning, Sources, Evidence, citations, provenance, Counter-Evidence, Datasets, Models, LLMs, Prompts, Agents, Multi-Agent systems, Tools, Automation, Experiments, Benchmarks, simulations, prototypes, architecture Research, academic Research, Market Research, Competitive Intelligence, Technology Radar, Innovation, Security, privacy, ethics, legal and Intellectual Property review, external collaboration, Research review, replication, validation, Knowledge Transfer, Research Memory, Knowledge integration, publication, audit, monitoring, metrics, HALT, Resume, recovery, controlled Pilot readiness, Production hard stops and recurring governance review. It permanently separates checklist completion from approval, approval from implementation, implementation from verification, Pilot readiness from Production authorization, Research validation from target-system authority, Founder routing from Founder approval, silence from approval, checked boxes from runtime evidence, and documentation from implementation, testing, verification or Production authorization.

type: Research Lab Master Checklist System, Research Quality Gate Framework, Research Governance and Security Checklist, Controlled Pilot Readiness Checklist, Runtime Truth Checklist, and Production Hard-Stop Checklist

class: Governed target-state checklist specification defining the minimum review questions and evidence expectations that should be applied proportionately across Mianx.ai Research activities without asserting that the checklist controls are currently automated, enforced, completed, approved, verified, canonical or Production authorized

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Research Checklists
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
* Research Operations
* Research Quality
* Research Security
* Data Governance
* Evidence Governance
* Dataset Governance
* Experiment Governance
* Benchmark Governance
* Model Governance
* Prompt Governance
* Agent Governance
* Tool Governance
* Automation Governance
* Privacy Governance
* Ethics Governance
* Compliance Governance
* Legal Governance
* Intellectual Property Governance
* Innovation Governance
* Knowledge Governance
* Memory Governance
* Audit Governance
* Verification Governance
* Production Governance
* Documentation Governance

maintainers:

* Research Operations
* Research Quality Engineering
* Research Lab Engineering
* Research Security Engineering
* Research Program Management
* Data Engineering
* Experiment Platform Engineering
* Benchmark Engineering
* Model Evaluation Engineering
* Prompt Research Engineering
* Agent Research Engineering
* Simulation Engineering
* Prototype Engineering
* Knowledge Engineering
* Innovation Engineering
* Observability Engineering
* Verification Engineering
* Audit Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* AI CEO
* C-Suite
* Enterprise Governance
* Research Governance
* Research Strategy
* Research Architecture
* Enterprise Architecture
* Research Security
* AI Governance
* Data Governance
* Security Governance
* Privacy Governance
* Ethics Governance
* Compliance Governance
* Legal Governance
* Intellectual Property Governance
* Product Governance
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
* Security Engineers
* Product Leaders
* Innovation Leaders
* Knowledge Engineers
* Research Operations
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
* ./research-lifecycle.md
* ./research-governance.md
* ./research-security.md
* ./research-metrics.md
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

* At Every Material Research Checklist Change
* At Every Research Lifecycle Change
* At Every Research Governance or Security Change
* At Every R0-R4 Risk Model Change
* At Every A0-A5 Autonomy Model Change
* At Every Controlled Pilot Readiness Review
* Before Production Research Authorization
* Quarterly During Active Build
* Annually During Stable Operation

## canonical: false

# Mianx.ai Research Lab Checklists

> **This document provides the master checklist system for the Mianx.ai Research Lab.**
>
> These checklists are intended to convert the Research Lab's Vision, Strategy, Architecture, Capabilities, Lifecycle, Governance, Security and Metrics into practical review gates.
>
> A checklist is not evidence by itself.
>
> A checked box means only that the responsible reviewer claims the item has been addressed.
>
> Where runtime truth matters, that claim must be supported by separate implementation, test, verification, audit or authorization evidence.
>
> **Checklist completion must never be used to manufacture Founder approval, implementation truth, Security verification, Tenant isolation truth, Research validity or Production authorization.**

---

# 1. Checklist Truth Model

Permanent:

```text
CHECKED
≠
PROVEN
```

and:

```text
CHECKLIST
COMPLETE
≠
APPROVED
```

and:

```text
APPROVED
≠
IMPLEMENTED
```

and:

```text
IMPLEMENTED
≠
VERIFIED
```

and:

```text
VERIFIED
≠
PRODUCTION
AUTHORIZED
```

---

# 2. Checklist Evidence States

Use one of the following states where useful:

```text
N/A
=
NOT
APPLICABLE

TODO
=
NOT
ASSESSED

CLAIMED
=
RESPONSIBLE
ACTOR
SAYS
COMPLETE

EVIDENCED
=
SUPPORTING
ARTIFACT
AVAILABLE

VERIFIED
=
INDEPENDENT
OR
DEFINED
VERIFICATION
COMPLETED

BLOCKED
=
CANNOT
PROCEED

FAILED
=
REQUIREMENT
NOT
SATISFIED
```

---

# 3. Evidence Requirement Rule

For high-impact items:

```text
CHECKMARK

WITHOUT

EVIDENCE
REFERENCE

≠

VERIFIED
CONTROL
```

---

# 4. Checklist Applicability

Not every Research item requires every checklist.

Applicability should depend on:

```text
RESEARCH
TYPE

RISK
CLASS

AUTONOMY
LEVEL

DATA
CLASSIFICATION

PROJECT

TENANT

ENVIRONMENT

MODEL

AGENT

TOOL

PUBLIC
IMPACT

LEGAL /
ETHICS /
PRIVACY
IMPACT
```

---

# 5. Checklist Severity Classes

Conceptually:

| Class | Meaning                                    |
| ----- | ------------------------------------------ |
| `C0`  | Informational / best-practice check        |
| `C1`  | Standard Research requirement              |
| `C2`  | Material quality or governance requirement |
| `C3`  | High-risk control requirement              |
| `C4`  | Critical hard-stop requirement             |

---

# 6. Hard-Stop Rule

If a required `C4` check fails:

```text
RESEARCH
MUST
NOT
PROCEED

UNTIL

VALID
REMEDIATION /
EXCEPTION /
AUTHORIZATION
```

as applicable.

---

# 7. Master Lifecycle Gate Map

```text
GATE 01
RESEARCH
INTAKE

↓

GATE 02
QUESTION
QUALITY

↓

GATE 03
SCOPE /
PROJECT /
TENANT /
PURPOSE

↓

GATE 04
RISK /
AUTONOMY

↓

GATE 05
AUTHORIZATION

↓

GATE 06
PRIOR
KNOWLEDGE

↓

GATE 07
HYPOTHESIS /
OBJECTIVE

↓

GATE 08
METHOD /
PLAN

↓

GATE 09
SOURCES /
EVIDENCE /
DATASETS

↓

GATE 10
MODEL /
PROMPT /
AGENT /
TOOL

↓

GATE 11
SECURITY /
PRIVACY /
ETHICS /
LEGAL /
IP

↓

GATE 12
EXECUTION
READINESS

↓

GATE 13
RESULT /
EVIDENCE
INTEGRITY

↓

GATE 14
REPLICATION /
CHALLENGE

↓

GATE 15
REVIEW /
VALIDATION

↓

GATE 16
KNOWLEDGE
TRANSFER

↓

GATE 17
ARCHIVE /
MEMORY /
REVALIDATION

↓

GATE 18
CONTROLLED
PILOT

↓

GATE 19
PRODUCTION
HARD
STOP
```

---

# 8. Research Intake Checklist

## Identity and Request

* [ ] Request has a stable Research or Intake ID.
* [ ] Requester identity is known.
* [ ] Requester authority context is known.
* [ ] Organization is identified.
* [ ] Project is identified where applicable.
* [ ] Tenant is identified where applicable.
* [ ] Purpose is explicitly stated.
* [ ] Research need is described.
* [ ] Desired decision or learning outcome is described.
* [ ] Urgency is recorded.
* [ ] Known constraints are recorded.
* [ ] Known dependencies are recorded.
* [ ] Existing supporting Evidence is referenced.
* [ ] Initial Data needs are identified.
* [ ] Initial Security concerns are identified.
* [ ] Initial privacy concerns are identified.
* [ ] Initial legal or IP concerns are identified.

## Intake Truth

* [ ] Intake is not represented as Research authorization.
* [ ] Intake is not represented as Founder approval.
* [ ] Intake acceptance is not represented as funding approval.

---

# 9. Research Triage Checklist

* [ ] Primary uncertainty is identified.
* [ ] Research is the appropriate primary workflow.
* [ ] Existing Knowledge has been searched.
* [ ] Duplicate Research has been checked.
* [ ] Existing Research freshness has been considered.
* [ ] Existing Research scope matches the new need.
* [ ] Request is not actually a Product decision.
* [ ] Request is not actually an Engineering task.
* [ ] Request is not actually an operational incident.
* [ ] Request is not primarily a Security incident requiring immediate response.
* [ ] Request is not primarily a legal or compliance decision.
* [ ] Invalid or unsupported Research mandates are rejected or escalated.
* [ ] Mixed workflows have explicit ownership.

---

# 10. Research Question Checklist

* [ ] Question is clear.
* [ ] Question is scoped.
* [ ] Question is decision-relevant or strategically relevant.
* [ ] Question identifies the subject.
* [ ] Question identifies the outcome of interest.
* [ ] Question identifies the relevant context.
* [ ] Time horizon is identified where relevant.
* [ ] Question is testable where appropriate.
* [ ] Exploratory Questions are explicitly labeled exploratory.
* [ ] Overly broad Questions are decomposed.
* [ ] Subquestions remain within authorized scope.
* [ ] Question does not assume the desired conclusion.
* [ ] Question does not create fake certainty.
* [ ] Question version is recorded.

---

# 11. Organization Scope Checklist

* [ ] Organization ID comes from trusted context.
* [ ] Research artifact is bound to the correct Organization.
* [ ] Data access matches Organization authority.
* [ ] Tool access matches Organization authority.
* [ ] Research output cannot cross Organizations without explicit authority.

---

# 12. Project Scope Checklist

* [ ] Project ID comes from trusted identity or authorization context.
* [ ] Project ID is not accepted solely from user-supplied content.
* [ ] Project-scoped Data is identified.
* [ ] Project-scoped Datasets are identified.
* [ ] Project-scoped Results are identified.
* [ ] Project-scoped Memory is identified.
* [ ] Project-scoped Tools or credentials are identified.
* [ ] Project A Data cannot be accessed from Project B context without authority.
* [ ] Cross-Project Research has explicit authorization.
* [ ] Cross-Project reuse uses authorized abstraction where possible.
* [ ] Raw cross-Project Data is not copied merely for convenience.
* [ ] Project context is included in audit events where applicable.

---

# 13. Tenant Scope Checklist

* [ ] Tenant ID comes from trusted context.
* [ ] Tenant-specific Data is identified.
* [ ] Tenant-specific Datasets are identified.
* [ ] Tenant-specific Results are identified.
* [ ] Tenant-specific Memory is identified.
* [ ] Tenant-specific exports are identified.
* [ ] Tenant A cannot read Tenant B artifacts.
* [ ] Tenant A cannot search Tenant B artifacts.
* [ ] Tenant A cannot write Tenant B artifacts.
* [ ] Tenant scope propagates through Research execution.
* [ ] Tenant scope propagates into audit events.
* [ ] Cross-Tenant access requires explicit authorized mechanism.
* [ ] Shared infrastructure does not imply shared Tenant visibility.

---

# 14. Purpose Limitation Checklist

* [ ] Research purpose is explicit.
* [ ] Data purpose matches authorized Research purpose.
* [ ] Model use matches authorized purpose.
* [ ] Tool use matches authorized purpose.
* [ ] Agent use matches authorized purpose.
* [ ] External export matches authorized purpose.
* [ ] New use case triggers purpose re-evaluation.
* [ ] Purpose expansion is not silent.

---

# 15. R0-R4 Risk Classification Checklist

Assess:

* [ ] Data sensitivity.
* [ ] customer impact.
* [ ] Project impact.
* [ ] Tenant impact.
* [ ] Security impact.
* [ ] privacy impact.
* [ ] legal impact.
* [ ] ethics impact.
* [ ] financial impact.
* [ ] reputational impact.
* [ ] public disclosure risk.
* [ ] dual-use risk.
* [ ] Production access.
* [ ] reversibility.
* [ ] autonomy level.
* [ ] Tool side effects.
* [ ] scale and blast radius.

Then:

* [ ] Risk class recorded.
* [ ] Risk rationale recorded.
* [ ] Required reviewers derived.
* [ ] Required controls derived.
* [ ] Required authority derived.

---

# 16. Risk Reclassification Checklist

Reclassify if any material change occurs in:

* [ ] Dataset.
* [ ] Data classification.
* [ ] Project.
* [ ] Tenant.
* [ ] environment.
* [ ] Model.
* [ ] Agent.
* [ ] Tool.
* [ ] autonomy.
* [ ] network access.
* [ ] Production access.
* [ ] publication scope.
* [ ] financial exposure.
* [ ] external side effects.

---

# 17. A0-A5 Autonomy Checklist

* [ ] Autonomy level explicitly assigned.
* [ ] AI/Agent action scope documented.
* [ ] allowed actions documented.
* [ ] prohibited actions documented.
* [ ] Tool ceiling documented.
* [ ] Data ceiling documented.
* [ ] Project ceiling documented.
* [ ] Tenant ceiling documented.
* [ ] network ceiling documented.
* [ ] cost ceiling documented.
* [ ] escalation behavior documented.
* [ ] HALT behavior documented.
* [ ] Agent cannot self-increase autonomy.
* [ ] Agent cannot self-grant Tools.
* [ ] Agent cannot self-create Production authority.
* [ ] better Benchmark performance does not automatically change autonomy.

---

# 18. Research Authorization Checklist

* [ ] Valid authority source identified.
* [ ] Approving actor identified.
* [ ] Approval identity verified through trusted mechanism.
* [ ] Authorization scope documented.
* [ ] allowed actions documented.
* [ ] prohibited actions documented.
* [ ] Project scope included.
* [ ] Tenant scope included where relevant.
* [ ] purpose included.
* [ ] risk class included.
* [ ] autonomy level included.
* [ ] validity period included where required.
* [ ] conditions included.
* [ ] authority is not expired.
* [ ] delegation is valid if used.
* [ ] subdelegation is valid if used.
* [ ] Founder-reserved routing completed where required.
* [ ] Founder routing is not mislabeled Founder approval.
* [ ] silence is not treated as approval.

---

# 19. Delegation Checklist

* [ ] Delegator has authority to delegate.
* [ ] Delegate identity known.
* [ ] Delegated scope explicit.
* [ ] Delegated actions explicit.
* [ ] Prohibited actions explicit.
* [ ] Validity period explicit.
* [ ] Revocation mechanism exists.
* [ ] Subdelegation policy explicit.
* [ ] Delegation does not exceed delegator authority.
* [ ] Expired delegation is rejected.
* [ ] Revoked delegation is rejected.
* [ ] Delegation event is auditable.

---

# 20. Prior Knowledge Review Checklist

* [ ] Existing Research searched.
* [ ] Research Memory searched where authorized.
* [ ] Knowledge base searched where authorized.
* [ ] Past Experiments reviewed.
* [ ] Past Benchmarks reviewed.
* [ ] Past failures reviewed.
* [ ] Relevant external literature reviewed.
* [ ] Existing conclusions checked for freshness.
* [ ] Existing conclusions checked for scope fit.
* [ ] Existing Model versions considered.
* [ ] Existing Dataset versions considered.
* [ ] Existing limitations reviewed.
* [ ] Existing Counter-Evidence reviewed.
* [ ] Remaining Research gap explicitly recorded.

---

# 21. Research Gap Checklist

* [ ] Known facts distinguished from unknowns.
* [ ] Unknowns explicitly listed.
* [ ] Existing Evidence insufficiency explained.
* [ ] Expected value of reducing uncertainty considered.
* [ ] Gap is not manufactured solely to justify more Research.
* [ ] Gap owner identified where appropriate.

---

# 22. Hypothesis Checklist

Where hypothesis-based Research applies:

* [ ] Hypothesis has stable ID/version.
* [ ] Hypothesis is testable.
* [ ] Hypothesis is scoped.
* [ ] Hypothesis does not restate desired outcome as fact.
* [ ] Supporting rationale recorded.
* [ ] Existing supporting Evidence linked.
* [ ] Existing Counter-Evidence linked.
* [ ] Falsification criteria defined where applicable.
* [ ] Alternative hypotheses considered where material.
* [ ] Hypothesis is not labeled fact.
* [ ] AI-generated hypothesis is reviewed proportionately.

---

# 23. Research Objective Checklist

Where hypothesis is not appropriate:

* [ ] Objective is explicit.
* [ ] Discovery boundary defined.
* [ ] Comparison boundary defined.
* [ ] Feasibility boundary defined.
* [ ] Success means useful learning, not confirmation of preferred narrative.
* [ ] Output expectations defined.
* [ ] Stop criteria defined where applicable.

---

# 24. Method Selection Checklist

* [ ] Method matches Question type.
* [ ] Method can generate relevant Evidence.
* [ ] Method limitations understood.
* [ ] Causal claims use appropriate causal methodology where needed.
* [ ] Comparison method controls key variables where appropriate.
* [ ] Sample considerations addressed.
* [ ] Bias risks considered.
* [ ] Reproducibility considered.
* [ ] Replication considered.
* [ ] Security constraints considered.
* [ ] privacy constraints considered.
* [ ] ethics constraints considered.
* [ ] cost and resource needs considered.
* [ ] Method choice documented.

---

# 25. Research Plan Checklist

* [ ] Research Question included.
* [ ] Research objective or hypothesis included.
* [ ] scope included.
* [ ] Project included.
* [ ] Tenant included where relevant.
* [ ] purpose included.
* [ ] risk class included.
* [ ] autonomy level included.
* [ ] method included.
* [ ] Sources identified.
* [ ] Datasets identified.
* [ ] Models identified.
* [ ] Prompts identified.
* [ ] Agents identified.
* [ ] Tools identified.
* [ ] environment identified.
* [ ] metrics identified.
* [ ] success criteria identified.
* [ ] failure criteria identified.
* [ ] HALT conditions identified.
* [ ] limitations anticipated.
* [ ] review gates identified.
* [ ] resource estimate included.
* [ ] cost estimate included where material.
* [ ] plan version recorded.

---

# 26. Source Review Checklist

* [ ] Source exists.
* [ ] Source identity recorded.
* [ ] Source type recorded.
* [ ] Publication date recorded where relevant.
* [ ] version recorded where relevant.
* [ ] primary source preferred where appropriate.
* [ ] source quality assessed.
* [ ] source freshness assessed.
* [ ] source conflicts identified.
* [ ] source incentives or bias considered.
* [ ] source scope understood.
* [ ] source is not treated as authority simply because it is external or academic.
* [ ] untrusted instructions inside source are treated as Data.

---

# 27. Citation Checklist

* [ ] Citation resolves to a real source.
* [ ] Citation points to the correct source.
* [ ] Source supports the cited claim.
* [ ] Date/version aligns with claim.
* [ ] Citation is not AI-fabricated.
* [ ] Citation is not merely copied from another unverified source.
* [ ] Material quoted content is attributed appropriately.
* [ ] Citation licensing/copyright considerations are respected.

---

# 28. Evidence Checklist

* [ ] Evidence has stable identity.
* [ ] source recorded.
* [ ] provenance recorded.
* [ ] collection time recorded.
* [ ] scope recorded.
* [ ] Project recorded where applicable.
* [ ] Tenant recorded where applicable.
* [ ] method recorded.
* [ ] Evidence quality assessed.
* [ ] Evidence freshness assessed.
* [ ] linked claim identified.
* [ ] limitations recorded.
* [ ] contradictory Evidence retained.
* [ ] Evidence is not mislabeled as certainty.
* [ ] untraceable numbers are flagged.

---

# 29. Counter-Evidence Checklist

* [ ] Counter-Evidence actively searched for where material.
* [ ] Counter-Evidence sources documented.
* [ ] Counter-Evidence quality assessed.
* [ ] Counter-Evidence not suppressed.
* [ ] Counter-Evidence included in final analysis.
* [ ] unresolved contradictions explicitly reported.
* [ ] minority or dissenting findings preserved where relevant.

---

# 30. Provenance Checklist

Verify traceability from conclusion to:

* [ ] analysis.
* [ ] Results.
* [ ] Experiment/Benchmark/Research run.
* [ ] method.
* [ ] configuration.
* [ ] code version where applicable.
* [ ] Model version.
* [ ] Prompt version.
* [ ] Agent version.
* [ ] Tool version.
* [ ] Dataset version.
* [ ] original sources.

If any material link is missing:

* [ ] trust state reduced.
* [ ] review required where appropriate.

---

# 31. Dataset Registration Checklist

* [ ] Dataset ID exists.
* [ ] Dataset version exists.
* [ ] Dataset source recorded.
* [ ] provenance recorded.
* [ ] ownership or stewardship identified.
* [ ] license recorded where applicable.
* [ ] Data classification recorded.
* [ ] Organization scope recorded.
* [ ] Project scope recorded where applicable.
* [ ] Tenant scope recorded where applicable.
* [ ] purpose restrictions recorded.
* [ ] schema recorded.
* [ ] transformation history recorded.
* [ ] retention requirements recorded.
* [ ] deletion requirements recorded.
* [ ] export rules recorded.

---

# 32. Dataset Quality Checklist

* [ ] completeness assessed.
* [ ] accuracy assessed where possible.
* [ ] consistency assessed.
* [ ] duplication assessed.
* [ ] missing values assessed.
* [ ] label quality assessed where applicable.
* [ ] representativeness assessed.
* [ ] bias indicators assessed.
* [ ] freshness assessed.
* [ ] contamination assessed.
* [ ] train/validation/test separation checked where applicable.
* [ ] Benchmark leakage considered.
* [ ] known limitations recorded.

---

# 33. Dataset Security Checklist

* [ ] Dataset access is authorized.
* [ ] purpose matches authorization.
* [ ] Project scope enforced.
* [ ] Tenant scope enforced.
* [ ] encryption requirements satisfied.
* [ ] region restrictions satisfied where applicable.
* [ ] external Model provider use permitted.
* [ ] Tool access permitted.
* [ ] export path permitted.
* [ ] sensitive fields minimized.
* [ ] secret material absent or handled appropriately.
* [ ] Dataset poisoning controls applied proportionately.

---

# 34. Synthetic Data Checklist

* [ ] synthetic nature clearly labeled.
* [ ] generation method recorded.
* [ ] source inspiration or source Data recorded where relevant.
* [ ] generator Model/version recorded where applicable.
* [ ] parameters or seed recorded where appropriate.
* [ ] privacy claims validated rather than assumed.
* [ ] synthetic Data not represented as real-world Evidence without justification.
* [ ] limitations documented.

---

# 35. Model Research Checklist

* [ ] Model identity recorded.
* [ ] provider recorded.
* [ ] version/snapshot recorded where possible.
* [ ] purpose recorded.
* [ ] task class recorded.
* [ ] Data handling policy reviewed.
* [ ] retention policy reviewed.
* [ ] region requirements reviewed.
* [ ] Security review completed as required.
* [ ] cost profile recorded.
* [ ] latency profile measured where relevant.
* [ ] tool capability recorded.
* [ ] known limitations recorded.
* [ ] known failure modes recorded.
* [ ] Model is authorized for Research.
* [ ] Research authorization is not mislabeled Production authorization.

---

# 36. LLM Research Checklist

* [ ] reasoning behavior tested where relevant.
* [ ] hallucination evaluated.
* [ ] long-context behavior tested where relevant.
* [ ] retrieval behavior evaluated.
* [ ] Tool use evaluated.
* [ ] structured-output reliability evaluated.
* [ ] sensitive Data leakage evaluated.
* [ ] Prompt Injection resistance evaluated.
* [ ] Authority Injection resistance evaluated.
* [ ] context leakage evaluated.
* [ ] cross-Project leakage tested where applicable.
* [ ] cross-Tenant leakage tested where applicable.

---

# 37. Prompt Research Checklist

* [ ] Prompt has stable ID.
* [ ] Prompt version recorded.
* [ ] purpose recorded.
* [ ] Model compatibility recorded.
* [ ] task scope recorded.
* [ ] Research-only status recorded where applicable.
* [ ] baseline Prompt defined.
* [ ] variants controlled.
* [ ] Benchmark or evaluation method defined.
* [ ] token use measured where relevant.
* [ ] cost measured where relevant.
* [ ] robustness tested.
* [ ] Prompt Injection considered.
* [ ] regression tested.
* [ ] Prompt Research winner is not automatically written to Prompt OS.

---

# 38. Agent Research Checklist

* [ ] Agent identity recorded.
* [ ] Agent version recorded.
* [ ] role recorded.
* [ ] task class recorded.
* [ ] Model recorded.
* [ ] Prompt recorded.
* [ ] Tools recorded.
* [ ] Memory policy recorded.
* [ ] Knowledge policy recorded.
* [ ] Project scope recorded.
* [ ] Tenant scope recorded.
* [ ] autonomy level recorded.
* [ ] autonomy ceiling enforced.
* [ ] resource limits defined.
* [ ] network limits defined.
* [ ] escalation path defined.
* [ ] HALT mechanism defined.
* [ ] failure modes tested.
* [ ] Security behavior tested.
* [ ] Agent cannot grant itself new authority.
* [ ] Agent performance does not automatically increase autonomy.
* [ ] Research Agent is not mislabeled Production Agent.

---

# 39. Multi-Agent Research Checklist

* [ ] coordinator identified.
* [ ] participant identities known.
* [ ] roles defined.
* [ ] authority boundaries defined.
* [ ] Project scope shared correctly.
* [ ] Tenant scope shared correctly.
* [ ] Tool permissions bounded.
* [ ] message provenance available where needed.
* [ ] dissent preserved.
* [ ] consensus not treated as truth.
* [ ] consensus not treated as authority.
* [ ] generator/evaluator separation considered.
* [ ] cost amplification assessed.
* [ ] tool fan-out assessed.
* [ ] failure amplification assessed.
* [ ] HALT propagation tested where applicable.

---

# 40. Tool Research Checklist

* [ ] Tool identity recorded.
* [ ] Tool capability recorded.
* [ ] read/write/execute behavior classified.
* [ ] network capability classified.
* [ ] external side effects classified.
* [ ] Data access classified.
* [ ] secret access classified.
* [ ] Project scope recorded.
* [ ] Tenant scope recorded.
* [ ] purpose recorded.
* [ ] authentication mechanism reviewed.
* [ ] authorization mechanism reviewed.
* [ ] revocation supported where necessary.
* [ ] auditability reviewed.
* [ ] Tool output treated as potentially untrusted.
* [ ] Tool connectivity is not treated as permission.

---

# 41. Automation Research Checklist

* [ ] trigger defined.
* [ ] identity defined.
* [ ] authorization context defined.
* [ ] scope defined.
* [ ] inputs defined.
* [ ] Tools defined.
* [ ] retries defined.
* [ ] idempotency considered.
* [ ] concurrency limited where appropriate.
* [ ] resource/cost limits defined.
* [ ] side effects identified.
* [ ] HALT mechanism defined.
* [ ] audit events defined.
* [ ] Automation cannot authorize itself.
* [ ] Automation cannot silently expand scope.

---

# 42. Experiment Design Checklist

* [ ] Experiment ID/version exists.
* [ ] Research Question linked.
* [ ] hypothesis/objective linked.
* [ ] method documented.
* [ ] control group defined where appropriate.
* [ ] comparison variables identified.
* [ ] configuration frozen.
* [ ] Dataset version frozen.
* [ ] Model version frozen.
* [ ] Prompt version frozen.
* [ ] Agent version frozen.
* [ ] Tool versions recorded.
* [ ] environment recorded.
* [ ] metrics defined.
* [ ] success criteria defined.
* [ ] failure criteria defined.
* [ ] statistical method defined where applicable.
* [ ] stop criteria defined.
* [ ] HALT criteria defined.
* [ ] authorization valid.

---

# 43. Experiment Execution Checklist

Before run:

* [ ] required controls passed.
* [ ] environment ready.
* [ ] Data access valid.
* [ ] secrets scoped.
* [ ] Tool access valid.
* [ ] network access valid.
* [ ] resource limits valid.
* [ ] audit enabled.
* [ ] monitoring enabled where required.

During run:

* [ ] configuration unchanged or changes recorded.
* [ ] unauthorized scope expansion blocked.
* [ ] unexpected side effects monitored.
* [ ] failures captured.
* [ ] Unknown Outcome state available.
* [ ] HALT remains available.

After run:

* [ ] Results captured.
* [ ] provenance captured.
* [ ] logs preserved according to policy.
* [ ] costs captured where required.
* [ ] side effects reconciled.
* [ ] technical completion not mislabeled hypothesis proof.

---

# 44. Benchmark Design Checklist

* [ ] Benchmark ID/version exists.
* [ ] task definition clear.
* [ ] Dataset version fixed.
* [ ] scorer version fixed.
* [ ] rubric version fixed.
* [ ] evaluation subject defined.
* [ ] success metrics defined.
* [ ] failure metrics defined.
* [ ] contamination risk assessed.
* [ ] holdout policy defined where needed.
* [ ] representative slices considered.
* [ ] hard cases included where appropriate.
* [ ] Security cases included where appropriate.
* [ ] Benchmark limitations documented.

---

# 45. Benchmark Execution Checklist

* [ ] exact subject version recorded.
* [ ] exact Dataset version recorded.
* [ ] exact scorer version recorded.
* [ ] exact configuration recorded.
* [ ] contamination status recorded.
* [ ] Result reproducible where required.
* [ ] regression compared against baseline.
* [ ] selective reporting avoided.
* [ ] failed cases retained.
* [ ] Benchmark winner not automatically promoted to Production.

---

# 46. Reproducibility Checklist

* [ ] Dataset version recoverable.
* [ ] source version recoverable.
* [ ] code version recoverable.
* [ ] Model version recoverable.
* [ ] Prompt version recoverable.
* [ ] Agent version recoverable.
* [ ] Tool version recoverable.
* [ ] environment recoverable.
* [ ] configuration recoverable.
* [ ] random seed recorded where relevant.
* [ ] metrics recoverable.
* [ ] method recoverable.
* [ ] acceptable reproduction tolerance defined.

---

# 47. Replication Checklist

* [ ] Replication need assessed.
* [ ] Replication method documented.
* [ ] same-team vs independent Replication identified.
* [ ] original conditions documented.
* [ ] changed conditions documented.
* [ ] Result compared transparently.
* [ ] failed Replication retained.
* [ ] partial Replication retained.
* [ ] mixed Results reported.
* [ ] failed Replication not hidden.
* [ ] Replication success not treated as universal generalization.

---

# 48. Simulation Checklist

* [ ] simulation question defined.
* [ ] scenario defined.
* [ ] assumptions documented.
* [ ] parameters documented.
* [ ] simulation Model identified.
* [ ] input Data identified.
* [ ] calibration method documented where applicable.
* [ ] sensitivity analysis considered.
* [ ] boundary conditions documented.
* [ ] reproducibility considered.
* [ ] Security controls applied.
* [ ] resource limits applied.
* [ ] Result explicitly labeled simulation.
* [ ] simulation outcome not mislabeled real-world proof.

---

# 49. Prototype Checklist

Before build:

* [ ] Prototype purpose defined.
* [ ] Research Question linked.
* [ ] environment non-Production by default.
* [ ] expiry/disposition date defined.
* [ ] permitted users identified.
* [ ] permitted Data identified.
* [ ] permitted Tools identified.
* [ ] network boundary identified.
* [ ] no unnecessary Production secrets.
* [ ] no unnecessary Production Data.
* [ ] monitoring/logging considered.

Before demo/test:

* [ ] known limitations documented.
* [ ] security weaknesses disclosed internally where relevant.
* [ ] Prototype is labeled Prototype.
* [ ] Product readiness is not claimed.
* [ ] Production readiness is not claimed.

After completion:

* [ ] learning captured.
* [ ] Prototype archived/destroyed/transferred.
* [ ] lingering credentials revoked.
* [ ] lingering resources removed or formally retained.
* [ ] promotion requires separate Engineering/Product process.

---

# 50. Architecture Research Checklist

* [ ] architecture Question defined.
* [ ] alternatives identified.
* [ ] baseline identified.
* [ ] tradeoffs documented.
* [ ] cost compared.
* [ ] performance compared.
* [ ] Security compared.
* [ ] reliability compared.
* [ ] scalability compared.
* [ ] portability compared.
* [ ] vendor lock-in considered.
* [ ] prototype evidence included where applicable.
* [ ] Research recommendation not represented as architecture approval.

---

# 51. Academic Research Checklist

* [ ] search strategy documented.
* [ ] source-selection criteria documented.
* [ ] primary papers identified.
* [ ] peer-review status noted.
* [ ] methodology reviewed.
* [ ] sample limitations reviewed.
* [ ] replication status considered.
* [ ] contradictory literature considered.
* [ ] freshness considered.
* [ ] relevant citations verified.
* [ ] findings mapped to Mianx.ai context.
* [ ] external paper not automatically treated as enterprise truth.

---

# 52. Market Research Checklist

* [ ] Research Question defined.
* [ ] market scope defined.
* [ ] customer segment defined.
* [ ] sample method documented.
* [ ] sample limitations documented.
* [ ] source quality reviewed.
* [ ] pricing sources dated.
* [ ] market-size assumptions documented.
* [ ] contradictory signals preserved.
* [ ] customer statements separated from buying behavior.
* [ ] Research conclusion separated from go-to-market decision.

---

# 53. Competitive Intelligence Checklist

* [ ] competitor identity verified.
* [ ] sources lawful and authorized.
* [ ] claims sourced.
* [ ] competitor marketing claims labeled appropriately.
* [ ] Product availability verified where material.
* [ ] pricing dated.
* [ ] source freshness recorded.
* [ ] conflicting evidence retained.
* [ ] confidentiality and legal limits respected.
* [ ] no unauthorized system access.
* [ ] Research result separated from Strategy decision.

---

# 54. Future Technology Checklist

* [ ] Technology identity clear.
* [ ] maturity assessed.
* [ ] strategic relevance assessed.
* [ ] technical relevance assessed.
* [ ] Security posture considered.
* [ ] supply-chain health considered.
* [ ] provider/maintainer health considered.
* [ ] cost considered.
* [ ] lock-in considered.
* [ ] trial value considered.
* [ ] unknowns recorded.
* [ ] Radar classification not treated as deployment authorization.

---

# 55. Technology Radar Checklist

For each Radar entry:

* [ ] stable identity.
* [ ] category.
* [ ] source.
* [ ] date.
* [ ] maturity.
* [ ] relevance.
* [ ] risk.
* [ ] Security considerations.
* [ ] recommended state.
* [ ] rationale.
* [ ] next review date.
* [ ] Research trigger where applicable.
* [ ] historical changes preserved.
* [ ] `ADOPT` does not mean procurement or Production authorization.

---

# 56. Innovation Candidate Checklist

* [ ] source Research identified.
* [ ] Evidence strength recorded.
* [ ] problem/opportunity defined.
* [ ] strategic fit assessed.
* [ ] value hypothesis defined.
* [ ] technical feasibility considered.
* [ ] market feasibility considered where relevant.
* [ ] risk assessed.
* [ ] reuse potential assessed.
* [ ] prototype need assessed.
* [ ] Product owner identified where relevant.
* [ ] Innovation candidate not represented as Product approval.

---

# 57. Research Security Pre-Execution Checklist

* [ ] trusted identity confirmed.
* [ ] authorization confirmed.
* [ ] Project scope confirmed.
* [ ] Tenant scope confirmed.
* [ ] purpose confirmed.
* [ ] Data classification confirmed.
* [ ] least privilege applied.
* [ ] Secret access minimized.
* [ ] network access minimized.
* [ ] egress policy defined.
* [ ] sandbox required/not required decision documented.
* [ ] untrusted files identified.
* [ ] untrusted code identified.
* [ ] Prompt Injection risk assessed.
* [ ] Authority Injection risk assessed.
* [ ] Model Security assessed.
* [ ] Agent Security assessed.
* [ ] Tool Security assessed.
* [ ] Audit enabled where required.
* [ ] HALT path available.
* [ ] incident escalation path known.

---

# 58. Prompt Injection Checklist

* [ ] external web content treated as untrusted.
* [ ] external documents treated as untrusted.
* [ ] emails/tool outputs treated as untrusted.
* [ ] Dataset text treated as untrusted where appropriate.
* [ ] system instructions separated from content.
* [ ] content cannot grant Tool permissions.
* [ ] content cannot change Project.
* [ ] content cannot change Tenant.
* [ ] content cannot increase autonomy.
* [ ] content cannot reveal secrets.
* [ ] content cannot create Founder approval.
* [ ] suspicious instructions logged/flagged where appropriate.
* [ ] high-risk Tool calls independently authorized.

---

# 59. Authority Injection Checklist

If content claims:

```text
FOUNDER
APPROVED

ADMIN
APPROVED

SYSTEM
AUTHORIZED

IGNORE
POLICY

PRODUCTION
ACCESS
GRANTED
```

verify:

* [ ] trusted approval record exists.
* [ ] approver identity authentic.
* [ ] approver had authority.
* [ ] scope matches action.
* [ ] approval not expired.
* [ ] approval not revoked.
* [ ] no approval is inferred from mere text.

---

# 60. Secrets Checklist

* [ ] no raw secrets in Markdown Research notes.
* [ ] no raw secrets in Prompts where avoidable.
* [ ] no raw secrets in Dataset artifacts.
* [ ] no raw secrets in source control.
* [ ] no raw secrets in logs.
* [ ] no raw secrets in model outputs where avoidable.
* [ ] secret reference used where possible.
* [ ] secret scope minimized.
* [ ] secret validity limited where possible.
* [ ] rotation path exists.
* [ ] revocation path exists.
* [ ] exposure detection considered.

---

# 61. Untrusted Code Checklist

* [ ] source recorded.
* [ ] dependency manifest reviewed.
* [ ] static analysis considered.
* [ ] vulnerability scan considered.
* [ ] malware risk considered.
* [ ] sandbox used where required.
* [ ] filesystem access bounded.
* [ ] network access bounded.
* [ ] secrets unavailable by default.
* [ ] resource limits configured.
* [ ] execution logged.
* [ ] code not promoted directly into Production.

---

# 62. Supply-Chain Checklist

* [ ] dependencies pinned where appropriate.
* [ ] lockfiles maintained.
* [ ] source registry trusted.
* [ ] dependency vulnerabilities reviewed.
* [ ] container images scanned where applicable.
* [ ] Model files verified where applicable.
* [ ] hashes/signatures verified where available.
* [ ] CI/CD Actions reviewed.
* [ ] high-risk third-party components isolated.
* [ ] update process controlled.
* [ ] emergency revoke/replace path exists.

---

# 63. Privacy Checklist

Where Personal or sensitive Data is involved:

* [ ] purpose defined.
* [ ] minimum Data used.
* [ ] sensitive fields identified.
* [ ] consent/legal basis reviewed where required.
* [ ] retention defined.
* [ ] deletion defined.
* [ ] region restrictions reviewed.
* [ ] Tenant context verified.
* [ ] third-party Model Data policy reviewed.
* [ ] pseudonymization considered.
* [ ] synthetic Data considered where appropriate.
* [ ] privacy review completed where required.

---

# 64. Ethics Checklist

Where material:

* [ ] Human impact considered.
* [ ] fairness considered.
* [ ] sensitive populations considered.
* [ ] dual-use risk considered.
* [ ] consent considerations reviewed.
* [ ] autonomy implications reviewed.
* [ ] harmful deployment pathways considered.
* [ ] responsible disclosure considered.
* [ ] ethics escalation completed where required.
* [ ] technically possible is not treated as ethically permitted.

---

# 65. Legal and Compliance Checklist

Where applicable:

* [ ] Data rights reviewed.
* [ ] license reviewed.
* [ ] contracts reviewed.
* [ ] regulatory restrictions reviewed.
* [ ] confidentiality obligations reviewed.
* [ ] export-control concerns reviewed where applicable.
* [ ] publication restrictions reviewed.
* [ ] third-party terms reviewed.
* [ ] legal interpretation routed to appropriate authority.
* [ ] AI/researcher interpretation not treated as legal approval.

---

# 66. Intellectual Property Checklist

* [ ] possible invention identified.
* [ ] proprietary method identified.
* [ ] trade-secret value considered.
* [ ] third-party IP dependencies identified.
* [ ] prior-art search considered.
* [ ] publication timing reviewed.
* [ ] disclosure risks reviewed.
* [ ] confidentiality maintained.
* [ ] Patent candidate not represented as Patent grant.
* [ ] Patent filing not initiated without proper authority.

---

# 67. External Collaboration Checklist

* [ ] collaborator identity verified.
* [ ] organization verified.
* [ ] purpose documented.
* [ ] scope documented.
* [ ] Project access documented.
* [ ] Tenant access documented.
* [ ] Data access documented.
* [ ] Tool access documented.
* [ ] confidentiality terms addressed.
* [ ] IP terms addressed.
* [ ] publication rights addressed.
* [ ] retention/disposition addressed.
* [ ] account expiry defined.
* [ ] revocation/offboarding path defined.
* [ ] audit requirements defined.

---

# 68. Research Observation Checklist

* [ ] observations separated from interpretations.
* [ ] raw measurements preserved where appropriate.
* [ ] timestamps preserved.
* [ ] scope preserved.
* [ ] abnormal events recorded.
* [ ] failed measurements recorded.
* [ ] missing measurements not silently converted to zero.
* [ ] Unknown Outcome state available.

---

# 69. Analysis Checklist

* [ ] analysis method documented.
* [ ] Dataset version correct.
* [ ] analysis code/version recorded where applicable.
* [ ] assumptions recorded.
* [ ] exclusions recorded.
* [ ] transformations recorded.
* [ ] statistical method appropriate where used.
* [ ] correlation not mislabeled causation.
* [ ] practical significance considered.
* [ ] sensitivity analysis considered.
* [ ] Counter-Evidence included.
* [ ] uncertainty included.
* [ ] limitations included.

---

# 70. Research Conclusion Checklist

* [ ] conclusion directly answers Research Question where possible.
* [ ] scope is explicit.
* [ ] Evidence linked.
* [ ] Counter-Evidence linked.
* [ ] limitations linked.
* [ ] uncertainty stated.
* [ ] replication state stated.
* [ ] conclusion distinguishes observation from inference.
* [ ] conclusion avoids universal claims beyond Evidence.
* [ ] unsupported claim marked unsupported.
* [ ] inconclusive result remains inconclusive.
* [ ] high confidence is not labeled certainty.
* [ ] recommendation separated from decision.

---

# 71. Independent Review Checklist

Where required:

* [ ] reviewer independent enough for purpose.
* [ ] reviewer identity recorded.
* [ ] method reviewed.
* [ ] source quality reviewed.
* [ ] Evidence reviewed.
* [ ] Counter-Evidence reviewed.
* [ ] Dataset reviewed.
* [ ] analysis reviewed.
* [ ] limitations reviewed.
* [ ] generalization reviewed.
* [ ] Security reviewed where relevant.
* [ ] reviewer dissent preserved.
* [ ] reviewer does not automatically become implementation approver.

---

# 72. Research Validation Checklist

Before marking Research `VALIDATED_FOR_DEFINED_SCOPE`:

* [ ] Question stable.
* [ ] scope stable.
* [ ] authority valid.
* [ ] method adequate.
* [ ] Evidence adequate.
* [ ] provenance adequate.
* [ ] Counter-Evidence considered.
* [ ] known limitations recorded.
* [ ] uncertainty recorded.
* [ ] replication requirement met where applicable.
* [ ] independent review completed where applicable.
* [ ] unresolved critical Security issue absent.
* [ ] unresolved critical integrity issue absent.
* [ ] validation scope explicitly documented.
* [ ] validation not represented as Production authorization.

---

# 73. Negative and Inconclusive Result Checklist

* [ ] negative Result preserved.
* [ ] inconclusive Result preserved.
* [ ] method failure distinguished from hypothesis failure.
* [ ] infrastructure failure distinguished from Research Result.
* [ ] failed Replication preserved.
* [ ] unknown outcome preserved.
* [ ] negative Results available to future Research where authorized.
* [ ] Research failure is not manufactured solely because preferred answer was not obtained.

---

# 74. Knowledge Transfer Candidate Checklist

* [ ] source Research validated to appropriate level.
* [ ] target system identified.
* [ ] target owner identified.
* [ ] Evidence package included.
* [ ] Counter-Evidence included.
* [ ] limitations included.
* [ ] confidence included.
* [ ] assumptions included.
* [ ] recommended action clear.
* [ ] implementation implications included.
* [ ] Security implications included.
* [ ] verification requirements included.
* [ ] transfer does not directly mutate target system.

---

# 75. Knowledge Transfer Approval Checklist

* [ ] transfer owner identified.
* [ ] target owner accepts review.
* [ ] source scope matches target use.
* [ ] Project restrictions respected.
* [ ] Tenant restrictions respected.
* [ ] confidentiality restrictions respected.
* [ ] IP restrictions respected.
* [ ] target governance requirements identified.
* [ ] separate implementation authorization remains required.
* [ ] separate Production authorization remains required.

---

# 76. Research Memory Checklist

Before writing Research to Memory:

* [ ] Memory write is authorized.
* [ ] scope preserved.
* [ ] Project preserved.
* [ ] Tenant preserved.
* [ ] classification preserved.
* [ ] provenance preserved.
* [ ] result status preserved.
* [ ] limitations preserved.
* [ ] expiry/freshness requirements recorded.
* [ ] secrets excluded.
* [ ] stale authority claims excluded.
* [ ] Memory is not represented as current truth.

---

# 77. Knowledge Canonicalization Checklist

Before proposing canonical Knowledge:

* [ ] Research validated.
* [ ] source provenance complete.
* [ ] scope understood.
* [ ] limitations understood.
* [ ] conflicting Knowledge reviewed.
* [ ] freshness reviewed.
* [ ] Knowledge owner identified.
* [ ] canonicalization authority identified.
* [ ] Research team does not self-canonicalize without authority.
* [ ] canonical Knowledge write separately authorized.

---

# 78. Intelligence Engine Handoff Checklist

* [ ] Evidence package structured.
* [ ] source quality preserved.
* [ ] Project context preserved.
* [ ] Tenant context preserved.
* [ ] Data classification preserved.
* [ ] limitations preserved.
* [ ] uncertainty preserved.
* [ ] Research conclusion status preserved.
* [ ] Intelligence Engine does not receive hidden Production authority.
* [ ] Research finding not represented as Strategy approval.

---

# 79. Publication Readiness Checklist

* [ ] publication purpose defined.
* [ ] Research quality adequate.
* [ ] Evidence traceable.
* [ ] citations verified.
* [ ] Project confidential Data removed or approved.
* [ ] Tenant Data removed or approved.
* [ ] Personal Data reviewed.
* [ ] Security vulnerabilities reviewed.
* [ ] secrets removed.
* [ ] proprietary architecture reviewed.
* [ ] trade secrets reviewed.
* [ ] Patent timing reviewed.
* [ ] Legal review completed where required.
* [ ] IP review completed where required.
* [ ] brand review completed where required.
* [ ] disclosure authority explicit.
* [ ] technically valid Research is not automatically public.

---

# 80. Research Metric Checklist

For each important metric:

* [ ] stable metric ID.
* [ ] metric version.
* [ ] purpose.
* [ ] owner.
* [ ] formula.
* [ ] numerator definition.
* [ ] denominator definition.
* [ ] unit.
* [ ] source.
* [ ] collection method.
* [ ] scope.
* [ ] Project scope.
* [ ] Tenant scope.
* [ ] freshness.
* [ ] target if approved.
* [ ] warning threshold if approved.
* [ ] critical threshold if approved.
* [ ] limitations.
* [ ] gaming risks.
* [ ] counter-metric.
* [ ] audit of definition changes.

---

# 81. Metric Truth Checklist

* [ ] Missing Data is not represented as zero without defined semantics.
* [ ] stale Data marked stale.
* [ ] duplicates handled.
* [ ] late events handled.
* [ ] scope aggregation correct.
* [ ] Project Data not mixed improperly.
* [ ] Tenant Data not mixed improperly.
* [ ] baseline exists before claiming improvement.
* [ ] correlation not claimed as causation.
* [ ] estimate not represented as realized value.
* [ ] dashboard state not represented as approval.
* [ ] metric target not represented as achieved fact.

---

# 82. Monitoring Checklist

* [ ] critical Research workflows observable.
* [ ] failed runs observable.
* [ ] Unknown Outcomes observable.
* [ ] review queues observable.
* [ ] stale Research observable.
* [ ] revalidation backlog observable.
* [ ] high-risk Research observable.
* [ ] high-autonomy Research observable.
* [ ] Security events observable.
* [ ] governance exceptions observable.
* [ ] Project boundary events observable.
* [ ] Tenant boundary events observable.
* [ ] cost anomalies observable.
* [ ] alerts actionable.
* [ ] Data freshness visible.

---

# 83. Audit Checklist

Material events should record:

* [ ] actor.
* [ ] action.
* [ ] resource.
* [ ] Organization.
* [ ] Project where relevant.
* [ ] Tenant where relevant.
* [ ] purpose.
* [ ] authority reference where required.
* [ ] timestamp.
* [ ] source state.
* [ ] target state where applicable.
* [ ] reason.
* [ ] outcome.
* [ ] error where applicable.

Audit integrity:

* [ ] ordinary Research actors cannot rewrite audit history.
* [ ] deletion restricted.
* [ ] retention defined.
* [ ] tampering detection considered.
* [ ] audit availability tested where required.

---

# 84. HALT Readiness Checklist

* [ ] HALT authority defined.
* [ ] HALT triggers defined.
* [ ] Research workers stoppable.
* [ ] Agent chains stoppable.
* [ ] Automation stoppable.
* [ ] Tool calls stoppable where possible.
* [ ] network egress stoppable where required.
* [ ] Data export stoppable where required.
* [ ] Model calls stoppable where possible.
* [ ] active Prototype stoppable.
* [ ] HALT event auditable.
* [ ] post-HALT reconciliation process defined.

---

# 85. HALT Execution Checklist

After HALT:

* [ ] active jobs inspected.
* [ ] active Agents inspected.
* [ ] active Automations inspected.
* [ ] network egress inspected.
* [ ] external side effects reconciled.
* [ ] credentials revoked where required.
* [ ] affected Data quarantined where required.
* [ ] affected Models/Tools quarantined where required.
* [ ] evidence preserved.
* [ ] root cause investigation opened.
* [ ] Research state marked accurately.
* [ ] automatic Resume blocked.

---

# 86. Resume Checklist

Before Resume:

* [ ] HALT cause understood.
* [ ] containment complete.
* [ ] affected state reconciled.
* [ ] Data integrity reassessed.
* [ ] Dataset integrity reassessed.
* [ ] Model integrity reassessed.
* [ ] Prompt integrity reassessed.
* [ ] Agent integrity reassessed.
* [ ] Tool integrity reassessed.
* [ ] authorization revalidated.
* [ ] Project scope revalidated.
* [ ] Tenant scope revalidated.
* [ ] risk reclassified.
* [ ] autonomy revalidated.
* [ ] required reviewers complete.
* [ ] valid Resume authority recorded.
* [ ] issue fixed is not treated as automatic Resume.

---

# 87. Failure Review Checklist

* [ ] failure class identified.
* [ ] infrastructure failure separated from Research Result.
* [ ] method failure separated from hypothesis Result.
* [ ] Data failure identified.
* [ ] Model failure identified.
* [ ] Prompt failure identified.
* [ ] Agent failure identified.
* [ ] Tool failure identified.
* [ ] Security failure identified.
* [ ] authorization failure identified.
* [ ] Unknown Outcome identified where applicable.
* [ ] Evidence preserved.
* [ ] retry appropriateness assessed.
* [ ] redesign appropriateness assessed.
* [ ] cancellation appropriateness assessed.
* [ ] lessons captured.

---

# 88. Retry Checklist

Before retry:

* [ ] reason documented.
* [ ] authorization still valid.
* [ ] configuration comparison performed.
* [ ] Dataset version checked.
* [ ] Model version checked.
* [ ] Prompt version checked.
* [ ] Agent version checked.
* [ ] Tool version checked.
* [ ] external side effect reconciled.
* [ ] idempotency considered.
* [ ] scientific meaning of retry understood.
* [ ] retry is not mislabeled independent Replication.

---

# 89. Research Archival Checklist

* [ ] final state correct.
* [ ] reason for archive recorded.
* [ ] Research ID/version preserved.
* [ ] conclusion preserved.
* [ ] Evidence preserved according to policy.
* [ ] Counter-Evidence preserved.
* [ ] limitations preserved.
* [ ] review history preserved.
* [ ] audit preserved.
* [ ] Transfer history preserved.
* [ ] retention policy applied.
* [ ] sensitive Data handled correctly.
* [ ] archive is not treated as deletion.

---

# 90. Research Revalidation Checklist

Trigger review if:

* [ ] Model changed.
* [ ] Prompt changed.
* [ ] Agent changed.
* [ ] Tool changed.
* [ ] Dataset changed.
* [ ] architecture changed.
* [ ] market changed.
* [ ] regulation changed.
* [ ] Security posture changed.
* [ ] significant time elapsed.
* [ ] contradictory new Evidence emerged.

Then:

* [ ] old conclusion reviewed.
* [ ] new Evidence reviewed.
* [ ] old scope reviewed.
* [ ] updated conclusion versioned.
* [ ] supersession status recorded.
* [ ] downstream Knowledge/Memory/Transfer impacts assessed.

---

# 91. Research Supersession Checklist

* [ ] old Research retained.
* [ ] new Research linked.
* [ ] reason for supersession documented.
* [ ] affected claims identified.
* [ ] affected Knowledge identified.
* [ ] affected Memory identified.
* [ ] affected Model/Prompt/Agent recommendations identified.
* [ ] affected Product/Engineering Transfers identified.
* [ ] new Research is not assumed better solely because it is newer.

---

# 92. Controlled Pilot Entry Checklist

Before a controlled Research platform Pilot:

## Governance

* [ ] Pilot mandate explicit.
* [ ] Pilot owner explicit.
* [ ] scope explicit.
* [ ] participating Projects explicit.
* [ ] participating Tenants explicit.
* [ ] R0-R4 risk classification complete.
* [ ] A0-A5 autonomy level complete.
* [ ] approval valid.
* [ ] Pilot end date defined.

## Security

* [ ] Project isolation tested.
* [ ] Tenant isolation tested where applicable.
* [ ] authorization tested.
* [ ] Prompt Injection defenses tested.
* [ ] Authority Injection defenses tested.
* [ ] Secret handling tested.
* [ ] network boundaries tested.
* [ ] egress boundaries tested.
* [ ] Agent Tool boundaries tested.
* [ ] audit tested.
* [ ] HALT tested.
* [ ] incident process tested.

## Operations

* [ ] monitoring active.
* [ ] alerts configured.
* [ ] cost limits configured.
* [ ] resource limits configured.
* [ ] support/escalation path defined.
* [ ] rollback/containment path defined.

## Research Integrity

* [ ] provenance available.
* [ ] configuration versioning available.
* [ ] Evidence traceability available.
* [ ] negative Results retained.
* [ ] failed Replications retained.

---

# 93. Controlled Pilot Exit Checklist

* [ ] Pilot success criteria reviewed.
* [ ] Pilot failure criteria reviewed.
* [ ] Security findings reviewed.
* [ ] Project isolation findings reviewed.
* [ ] Tenant isolation findings reviewed.
* [ ] performance reviewed.
* [ ] reliability reviewed.
* [ ] Research quality reviewed.
* [ ] cost reviewed.
* [ ] incidents reviewed.
* [ ] governance exceptions reviewed.
* [ ] open risks recorded.
* [ ] unresolved defects recorded.
* [ ] lessons documented.
* [ ] Production decision remains separate.
* [ ] Pilot pass is not represented as Production authorization.

---

# 94. Production Authorization Hard-Stop Checklist

Production Research authorization must **not** be claimed unless separate authoritative evidence exists for applicable items.

## Identity and Authority

* [ ] trusted identity implementation verified.
* [ ] authentication verified.
* [ ] authorization verified.
* [ ] delegation enforcement verified.
* [ ] authorization expiry verified.
* [ ] Founder-reserved routing verified where required.

## Scope

* [ ] Organization isolation verified.
* [ ] Project isolation verified.
* [ ] Tenant isolation verified where applicable.
* [ ] purpose limitation verified.

## Data

* [ ] Data classification controls verified.
* [ ] Dataset authorization verified.
* [ ] Dataset provenance verified.
* [ ] Dataset integrity verified.
* [ ] retention controls verified.
* [ ] deletion controls verified.
* [ ] Production Data boundary verified.

## AI

* [ ] Model governance verified.
* [ ] Prompt governance verified.
* [ ] Agent governance verified.
* [ ] autonomy ceilings verified.
* [ ] Tool authorization verified.
* [ ] Automation authorization verified.

## Security

* [ ] Secret handling verified.
* [ ] Sandbox controls verified.
* [ ] network isolation verified.
* [ ] egress control verified.
* [ ] Prompt Injection defenses verified.
* [ ] Authority Injection defenses verified.
* [ ] supply-chain controls verified.
* [ ] Prototype isolation verified.
* [ ] Security monitoring verified.
* [ ] incident response verified.

## Research Integrity

* [ ] Research Registry verified.
* [ ] Evidence provenance verified.
* [ ] Experiment integrity verified.
* [ ] Benchmark integrity verified.
* [ ] Result versioning verified.
* [ ] Counter-Evidence preservation verified.
* [ ] Replication workflow verified.

## Operations

* [ ] monitoring verified.
* [ ] audit integrity verified.
* [ ] HALT verified.
* [ ] post-HALT reconciliation verified.
* [ ] recovery verified.
* [ ] backup/restore verified where required.
* [ ] cost controls verified.
* [ ] resource controls verified.

## Authority

* [ ] Security approval exists where required.
* [ ] privacy approval exists where required.
* [ ] ethics approval exists where required.
* [ ] legal/compliance approval exists where required.
* [ ] Production owner approval exists.
* [ ] final Production authorization exists.

---

# 95. Production Hard-Stop Truth

Permanent:

```text
ALL
CHECKBOXES
CHECKED

WITHOUT
VERIFICATION
EVIDENCE

≠

PRODUCTION
READY
```

---

# 96. Documentation Review Checklist

For each Research Lab document:

* [ ] exact repository path correct.
* [ ] document ID unique.
* [ ] version present.
* [ ] status present.
* [ ] owner present.
* [ ] authority present.
* [ ] dependencies present.
* [ ] related documents present.
* [ ] terminology consistent.
* [ ] Project/Tenant truth discipline preserved.
* [ ] Founder authority truth discipline preserved.
* [ ] implementation claims supported or avoided.
* [ ] verification claims supported or avoided.
* [ ] Production claims supported or avoided.
* [ ] changelog entry proposed.
* [ ] next document path identified when appropriate.

---

# 97. Documentation Truth Checklist

Before saying a document is implemented:

* [ ] implementation evidence exists.

Before saying tested:

* [ ] test evidence exists.

Before saying verified:

* [ ] verification evidence exists.

Before saying Production authorized:

* [ ] explicit Production authorization evidence exists.

Permanent:

```text
DOCUMENT
CONTENT
COMPLETE
≠
SYSTEM
COMPLETE
```

---

# 98. Filesystem Truth Checklist

Before claiming a generated document is actually present in the repository:

* [ ] filesystem or repository evidence inspected.
* [ ] exact path verified.
* [ ] file exists.
* [ ] content matches intended document.
* [ ] Git state understood if relevant.

Until then:

```text
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

# 99. Founder Approval Truth Checklist

Before saying Founder approved:

* [ ] explicit Founder approval exists.
* [ ] approval relates to this exact matter.
* [ ] approval scope matches action.
* [ ] approval is current.
* [ ] approval not revoked.
* [ ] approval is not inferred from routing.
* [ ] approval is not inferred from visibility.
* [ ] approval is not inferred from silence.
* [ ] approval is not inferred from AI-generated text.

---

# 100. Research Recommendation Checklist

Before issuing a recommendation:

* [ ] Question answered sufficiently.
* [ ] Evidence linked.
* [ ] Counter-Evidence linked.
* [ ] assumptions identified.
* [ ] uncertainty stated.
* [ ] limitations stated.
* [ ] alternatives considered.
* [ ] risk stated.
* [ ] recommendation scope stated.
* [ ] decision authority identified.
* [ ] recommendation not mislabeled decision.

---

# 101. Research Decision Handoff Checklist

* [ ] recommendation ID/reference available.
* [ ] target decision owner identified.
* [ ] Evidence package attached.
* [ ] risks attached.
* [ ] uncertainty attached.
* [ ] alternatives attached.
* [ ] implementation implications attached.
* [ ] target authority receives the package.
* [ ] Research team does not claim the decision unless separately authorized.

---

# 102. Research Value Review Checklist

* [ ] intended value identified.
* [ ] baseline identified.
* [ ] real-world outcome measured where possible.
* [ ] attribution assumptions documented.
* [ ] counterfactual considered where feasible.
* [ ] cost included.
* [ ] indirect value considered.
* [ ] negative side effects considered.
* [ ] value estimate separated from realized value.
* [ ] optionality value labeled appropriately.

---

# 103. Research Cost Review Checklist

* [ ] Model API cost recorded.
* [ ] compute cost recorded.
* [ ] storage cost recorded.
* [ ] Tool/vendor cost recorded.
* [ ] Human time considered.
* [ ] Agent time/cost considered.
* [ ] Prototype infrastructure considered.
* [ ] expected vs actual compared.
* [ ] material overrun escalated.
* [ ] cost efficiency not optimized at expense of Research quality.

---

# 104. Research Quality Review Checklist

Assess:

* [ ] Question quality.
* [ ] source quality.
* [ ] Evidence quality.
* [ ] provenance completeness.
* [ ] method quality.
* [ ] Dataset quality.
* [ ] execution integrity.
* [ ] Counter-Evidence coverage.
* [ ] reproducibility.
* [ ] replication.
* [ ] limitations.
* [ ] uncertainty.
* [ ] independent review.
* [ ] Security integrity.
* [ ] governance integrity.

---

# 105. Research Anti-Goodhart Checklist

For every high-impact metric:

* [ ] What behavior could this incentivize?
* [ ] Can Research teams improve the metric without improving real Research?
* [ ] Can failures be hidden from the denominator?
* [ ] Can hard cases be excluded?
* [ ] Can Results be split to inflate throughput?
* [ ] Can risk be downclassified?
* [ ] Can Research be closed prematurely?
* [ ] Is a counter-metric defined?
* [ ] Is a critical hard-stop kept outside aggregate score?
* [ ] Is Human interpretation required?

---

# 106. Model Promotion Checklist

Before recommending a Model for broader use:

* [ ] task-specific Benchmark complete.
* [ ] quality adequate.
* [ ] latency understood.
* [ ] cost understood.
* [ ] safety evaluated.
* [ ] Security evaluated.
* [ ] Tool use evaluated.
* [ ] known failure modes documented.
* [ ] provider Data policy acceptable.
* [ ] required regions available.
* [ ] regression risk assessed.
* [ ] Production Model governance remains separate.

---

# 107. Prompt Promotion Checklist

Before proposing Prompt OS change:

* [ ] Research Prompt version stable.
* [ ] baseline comparison valid.
* [ ] Model compatibility established.
* [ ] robustness tested.
* [ ] Security tested.
* [ ] regressions tested.
* [ ] token/cost impact understood.
* [ ] limitations documented.
* [ ] Prompt OS owner receives change proposal.
* [ ] Research system does not directly mutate canonical Prompt OS.
* [ ] separate approval required.

---

# 108. Agent Promotion Checklist

Before proposing broader Agent deployment:

* [ ] Agent version stable.
* [ ] role clear.
* [ ] task quality verified.
* [ ] reliability verified.
* [ ] capacity evaluated.
* [ ] cost evaluated.
* [ ] Tool use evaluated.
* [ ] escalation behavior evaluated.
* [ ] Security evaluated.
* [ ] Project isolation evaluated.
* [ ] Tenant isolation evaluated where applicable.
* [ ] autonomy compliance evaluated.
* [ ] failure modes documented.
* [ ] Agent Framework governance receives proposal.
* [ ] Research success does not auto-expand Agent authority.

---

# 109. Technology Adoption Handoff Checklist

Before technology Research moves to adoption review:

* [ ] Technology Radar status current.
* [ ] Research Evidence adequate.
* [ ] technical fit assessed.
* [ ] architecture fit assessed.
* [ ] Security fit assessed.
* [ ] privacy fit assessed where relevant.
* [ ] cost assessed.
* [ ] vendor risk assessed.
* [ ] lock-in assessed.
* [ ] operational complexity assessed.
* [ ] Prototype/trial Results included where available.
* [ ] procurement remains separate.
* [ ] Production deployment remains separate.

---

# 110. Research Incident Review Checklist

* [ ] incident ID created.
* [ ] severity recorded.
* [ ] Research affected identified.
* [ ] Projects affected identified.
* [ ] Tenants affected identified.
* [ ] Data affected identified.
* [ ] Models affected identified.
* [ ] Agents affected identified.
* [ ] Tools affected identified.
* [ ] containment completed.
* [ ] evidence preserved.
* [ ] root cause analyzed.
* [ ] authorization reviewed.
* [ ] security controls reviewed.
* [ ] corrective actions identified.
* [ ] Research conclusions potentially affected reviewed.
* [ ] Knowledge/Memory affected reviewed.
* [ ] revalidation needs identified.
* [ ] Resume separately authorized.

---

# 111. Periodic Research Governance Review Checklist

Quarterly or according to policy:

* [ ] active mandates reviewed.
* [ ] delegations reviewed.
* [ ] expired authorizations reviewed.
* [ ] R3/R4 Research reviewed.
* [ ] A3-A5 Research reviewed.
* [ ] open Security exceptions reviewed.
* [ ] open governance exceptions reviewed.
* [ ] Project isolation incidents reviewed.
* [ ] Tenant isolation incidents reviewed.
* [ ] Research HALTs reviewed.
* [ ] Research resumes reviewed.
* [ ] publication approvals reviewed.
* [ ] Knowledge Transfers reviewed.
* [ ] controlled Pilots reviewed.
* [ ] unresolved Production blockers reviewed.
* [ ] policy gaps reviewed.

---

# 112. Periodic Research Quality Review Checklist

* [ ] failed Replications reviewed.
* [ ] negative Results reviewed.
* [ ] inconclusive Research reviewed.
* [ ] stale high-impact Research reviewed.
* [ ] source quality trends reviewed.
* [ ] citation validity reviewed.
* [ ] Evidence-quality trends reviewed.
* [ ] Dataset-quality trends reviewed.
* [ ] Benchmark contamination reviewed.
* [ ] Model regressions reviewed.
* [ ] Prompt regressions reviewed.
* [ ] Agent regressions reviewed.
* [ ] Research metric gaming risks reviewed.

---

# 113. Periodic Research Security Review Checklist

* [ ] access reviews complete.
* [ ] stale credentials revoked.
* [ ] external collaborator access reviewed.
* [ ] secrets rotated where required.
* [ ] dependency vulnerabilities reviewed.
* [ ] Model provider Security changes reviewed.
* [ ] Prompt Injection tests reviewed.
* [ ] Authority Injection tests reviewed.
* [ ] Agent privilege attempts reviewed.
* [ ] Tool permissions reviewed.
* [ ] network/egress policy reviewed.
* [ ] prototype expiry reviewed.
* [ ] audit integrity reviewed.
* [ ] incident-response readiness reviewed.
* [ ] HALT readiness reviewed.

---

# 114. Annual Research Lab Review Checklist

* [ ] Vision remains aligned.
* [ ] Strategy remains aligned.
* [ ] Architecture remains aligned.
* [ ] Capability gaps reviewed.
* [ ] Lifecycle effectiveness reviewed.
* [ ] Governance effectiveness reviewed.
* [ ] Security posture reviewed.
* [ ] metric framework reviewed.
* [ ] Research domains reviewed.
* [ ] obsolete Research retired appropriately.
* [ ] future technologies reviewed.
* [ ] Research portfolio balance reviewed.
* [ ] AI capability assumptions reviewed.
* [ ] autonomy assumptions reviewed.
* [ ] Project/Tenant scale assumptions reviewed.
* [ ] Production authorization scope reviewed.
* [ ] documentation synchronization reviewed.

---

# 115. Checklist Sign-Off Model

A checklist sign-off should ideally include:

```yaml
research_checklist_signoff:
  checklist_id: required
  checklist_version: required

  research_ref: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional

  reviewer_ref: required
  reviewer_role: required

  completed_items: []
  failed_items: []
  blocked_items: []
  not_applicable_items: []

  evidence_refs: []

  decision: required

  authority_ref: conditional

  signed_at: required
```

---

# 116. Sign-Off Decision States

Potential:

```text
PASS

PASS
WITH
CONDITIONS

REVIEW
REQUIRED

BLOCKED

FAIL

NOT
APPLICABLE
```

---

# 117. Sign-Off Boundary

Permanent:

```text
CHECKLIST
SIGN-OFF
≠
ENTERPRISE
APPROVAL
UNLESS
THE
SIGNER
HAS
THE
REQUIRED
AUTHORITY
```

---

# 118. Checklist Versioning

Every checklist should be versioned.

Material changes include:

```text
NEW
HARD-STOP

NEW
APPROVAL
GATE

NEW
SECURITY
CONTROL

NEW
PROJECT /
TENANT
CONTROL

NEW
AUTONOMY
CONTROL

CHANGED
EVIDENCE
REQUIREMENT
```

---

# 119. Historical Checklist Preservation

Past Research should remain associated with the checklist version actually used.

---

# 120. Checklist Supersession Boundary

```text
NEW
CHECKLIST
VERSION
≠
PAST
RESEARCH
WAS
INVALID
AUTOMATICALLY
```

---

# 121. Checklist Automation

Future systems may automate:

```text
FIELD
PRESENCE
CHECKS

POLICY
LOOKUPS

AUTHORIZATION
VALIDATION

VERSION
VALIDATION

DATASET
LINEAGE
CHECKS

PROJECT
SCOPE
CHECKS

TENANT
SCOPE
CHECKS

SECURITY
SCANS

METRIC
CHECKS

AUDIT
CHECKS
```

---

# 122. Automation Boundary

Permanent:

```text
AUTOMATED
CHECK
PASS
≠
HUMAN
JUDGMENT
UNNECESSARY
WHERE
HUMAN
JUDGMENT
IS
REQUIRED
```

---

# 123. AI Checklist Assistance

AI may assist by:

```text
DETECTING
MISSING
FIELDS

FINDING
CONTRADICTIONS

LOCATING
EVIDENCE

IDENTIFYING
STALE
AUTHORITY

PROPOSING
RISKS

FLAGGING
MISSING
COUNTER-
EVIDENCE
```

---

# 124. AI Checklist Boundary

```text
AI
SAYS
CHECKLIST
PASSED
≠
CHECKLIST
APPROVED
```

---

# 125. Checklist Failure Escalation

When a critical checklist item fails:

```text
FAIL

↓

BLOCK

↓

OWNER

↓

REMEDIATION

↓

REVIEW

↓

RECHECK

↓

PROCEED
ONLY
IF
VALID
```

---

# 126. Exception Handling Checklist

If exception requested:

* [ ] specific requirement identified.
* [ ] reason documented.
* [ ] scope documented.
* [ ] duration defined.
* [ ] risk assessed.
* [ ] compensating controls defined.
* [ ] valid authority identified.
* [ ] approval recorded.
* [ ] expiry recorded.
* [ ] audit event recorded.
* [ ] exception does not silently become general policy.

---

# 127. Emergency Research Checklist

For expedited Research:

* [ ] emergency condition documented.
* [ ] scope minimized.
* [ ] risk classified.
* [ ] authority identified.
* [ ] Security controls retained.
* [ ] privacy controls retained where applicable.
* [ ] Tenant/Project boundaries retained.
* [ ] audit retained.
* [ ] HALT retained.
* [ ] expiry/end condition defined.
* [ ] retrospective review required.
* [ ] emergency does not mean no governance.

---

# 128. Research Integrity Hard Stops

Research validation must remain blocked for material work if:

* [ ] fabricated source unresolved.
* [ ] fabricated citation unresolved.
* [ ] fabricated Result unresolved.
* [ ] material provenance missing.
* [ ] Counter-Evidence intentionally suppressed.
* [ ] Dataset integrity unresolved.
* [ ] Benchmark integrity unresolved.
* [ ] Research scope materially unknown.
* [ ] critical configuration version unknown.
* [ ] unauthorized Research action materially affects Result.

---

# 129. Security Hard Stops

Research execution must remain blocked where applicable if:

* [ ] trusted identity unavailable.
* [ ] valid authorization unavailable.
* [ ] Project scope unresolved.
* [ ] Tenant scope unresolved.
* [ ] sensitive Data authorization unresolved.
* [ ] Production Data access unauthorized.
* [ ] required Sandbox unavailable.
* [ ] required network control unavailable.
* [ ] required Secret control unavailable.
* [ ] Prompt Injection risk uncontrolled.
* [ ] Authority Injection risk uncontrolled.
* [ ] Agent privilege controls unavailable.
* [ ] critical Tool permissions unbounded.
* [ ] critical audit unavailable.
* [ ] HALT unavailable for required risk class.

---

# 130. Governance Hard Stops

Research must not proceed where required authority is absent.

Examples:

* [ ] mandate absent.
* [ ] delegation invalid.
* [ ] authorization expired.
* [ ] R4 approval absent.
* [ ] required Founder decision absent.
* [ ] required Security review absent.
* [ ] required privacy review absent.
* [ ] required ethics review absent.
* [ ] required legal/IP review absent.
* [ ] required Production authority absent.

---

# 131. Knowledge Transfer Hard Stops

Transfer should remain blocked when:

* [ ] Research status inadequate.
* [ ] Evidence package incomplete.
* [ ] material Counter-Evidence omitted.
* [ ] target owner unknown.
* [ ] Project/Tenant restriction unresolved.
* [ ] IP restriction unresolved.
* [ ] Security concern unresolved.
* [ ] recommendation scope unclear.

---

# 132. Publication Hard Stops

External publication should remain blocked when applicable if:

* [ ] confidential Project Data present.
* [ ] Tenant Data present without authority.
* [ ] Personal Data improperly exposed.
* [ ] secrets present.
* [ ] unreviewed vulnerability details present.
* [ ] Patent/publication timing unresolved.
* [ ] IP authority absent.
* [ ] legal authority absent.
* [ ] publication authority absent.

---

# 133. Production Hard Stops

Permanent:

```text
RESEARCH
DOCUMENTED

BUT
NOT
IMPLEMENTED

=

NO
PRODUCTION
AUTHORIZATION
```

```text
RESEARCH
IMPLEMENTED

BUT
NOT
VERIFIED

=

NO
PRODUCTION
AUTHORIZATION
```

```text
RESEARCH
PILOT
VERIFIED

BUT
NO
SEPARATE
PRODUCTION
APPROVAL

=

NO
PRODUCTION
AUTHORIZATION
```

---

# 134. Checklist Minimum Evidence Map

| Area          | Minimum Example Evidence                             |
| ------------- | ---------------------------------------------------- |
| Authorization | Approval/authorization record                        |
| Project Scope | Trusted scope binding + isolation test               |
| Tenant Scope  | Trusted scope binding + isolation test               |
| Dataset       | Registry + provenance + authorization                |
| Model         | Model identity/version + evaluation                  |
| Prompt        | Prompt identity/version + evaluation                 |
| Agent         | Agent identity/version + Tool/autonomy configuration |
| Experiment    | Frozen configuration + run trace                     |
| Benchmark     | Benchmark version + Dataset/scorer version           |
| Security      | Test/configuration/audit evidence                    |
| HALT          | Executed HALT test + reconciliation                  |
| Production    | Separate explicit Production authorization           |

---

# 135. Checklist Ownership Matrix

| Checklist Family   | Primary Steward                        |
| ------------------ | -------------------------------------- |
| Intake / Question  | Research Operations                    |
| Scope / Authority  | Research Governance                    |
| Risk / Autonomy    | Research Governance + AI Governance    |
| Sources / Evidence | Research Quality / Evidence Governance |
| Datasets           | Data / Dataset Governance              |
| Experiments        | Experiment Governance                  |
| Benchmarks         | Benchmark Governance                   |
| Models             | Model Governance                       |
| Prompts            | Prompt Governance                      |
| Agents             | Agent Governance                       |
| Tools / Automation | Tool / Automation Governance           |
| Security           | Research Security                      |
| Privacy            | Privacy Governance                     |
| Ethics             | Ethics Governance                      |
| Legal / IP         | Legal / IP Governance                  |
| Transfer           | Research + Target-System Governance    |
| Metrics            | Research Operations / Analytics        |
| Production         | Production Governance                  |

---

# 136. Review Responsibility Boundary

Permanent:

```text
PRIMARY
STEWARD
≠
SOLE
AUTHORITY
FOR
EVERY
DECISION
```

---

# 137. Positive Checklist Verification Scenarios

Future verification should test at least:

```text
RCL-01
REQUIRED
CHECKLIST
DERIVED
FROM
RESEARCH
TYPE

RCL-02
RISK
CLASS
CHANGES
CHECKLIST
REQUIREMENTS

RCL-03
AUTONOMY
LEVEL
CHANGES
CHECKLIST
REQUIREMENTS

RCL-04
MISSING
PROJECT
SCOPE
BLOCKS
PROJECT
RESEARCH

RCL-05
MISSING
TENANT
SCOPE
BLOCKS
TENANT
RESEARCH

RCL-06
EXPIRED
AUTHORIZATION
FAILS
CHECK

RCL-07
FOUNDER
ROUTING
DOES
NOT
PASS
FOUNDER
APPROVAL
CHECK

RCL-08
SILENCE
DOES
NOT
PASS
APPROVAL
CHECK

RCL-09
DATASET
WITHOUT
PROVENANCE
FAILS
REQUIRED
CHECK

RCL-10
UNVERIFIED
CITATION
FAILS
EVIDENCE
CHECK
WHERE
REQUIRED

RCL-11
PROMPT
WINNER
DOES
NOT
PASS
PROMPT OS
DEPLOYMENT
CHECK

RCL-12
AGENT
WINNER
DOES
NOT
PASS
AUTONOMY
INCREASE
CHECK

RCL-13
BENCHMARK
WINNER
DOES
NOT
PASS
PRODUCTION
MODEL
CHECK

RCL-14
PROTOTYPE
DOES
NOT
PASS
PRODUCTION
READINESS
AUTOMATICALLY

RCL-15
FAILED
REPLICATION
REMAINS
VISIBLE

RCL-16
COUNTER-
EVIDENCE
OMISSION
BLOCKS
HIGH-IMPACT
VALIDATION

RCL-17
PROJECT A
CANNOT
USE
PROJECT B
CHECKLIST
AUTHORITY

RCL-18
TENANT A
CANNOT
USE
TENANT B
DATA

RCL-19
PROMPT
INJECTION
CANNOT
CHECK
ITS
OWN
AUTHORITY
BOX

RCL-20
HALT
CHECKLIST
CAN
BLOCK
EXECUTION

RCL-21
RESUME
CHECKLIST
REQUIRES
REAUTHORIZATION

RCL-22
PILOT
CHECKLIST
PASS
DOES
NOT
PASS
PRODUCTION
AUTHORIZATION
CHECK

RCL-23
CHECKBOX
WITHOUT
EVIDENCE
DOES
NOT
BECOME
VERIFIED

RCL-24
DOCUMENT
GENERATED
IN
CHAT
DOES
NOT
PASS
FILESYSTEM
SAVE
CHECK
AUTOMATICALLY
```

---

# 138. Negative Checklist Verification Scenarios

Containment should be verified when:

* Agent marks its own autonomy increase as approved.
* Researcher checks Founder approval without valid Founder approval evidence.
* Project scope field is manually edited to another Project.
* Tenant scope is inherited from untrusted Prompt content.
* Dataset provenance checkbox is marked without source evidence.
* citation checkbox passes for fabricated source.
* Experiment configuration changes after readiness checklist.
* Benchmark Dataset changes without re-running checklist.
* Tool permission expands after Security review.
* Prototype obtains Production Secret after Prototype checklist.
* Research conclusion omits known failed Replication.
* Counter-Evidence is removed after reviewer sign-off.
* security exception expires after checklist completion.
* external collaborator remains active after offboarding date.
* Publication checklist ignores newly discovered IP conflict.
* HALT event occurs after Pilot readiness review.
* post-HALT system auto-resumes because old checklist was previously passed.
* metric formula changes but prior scorecard remains labeled comparable.
* Pilot passes all Pilot checks and system is automatically labeled Production.
* generated Markdown file is assumed saved without repository evidence.

---

# 139. Checklist Maturity Model

Conceptual:

```text
RCM-C0
=
CHECKLIST
SYSTEM
DOCUMENTED

RCM-C1
=
CORE
CHECKLIST
FAMILIES
DEFINED

RCM-C2
=
RISK /
AUTONOMY /
AUTHORITY /
SECURITY
CHECKLIST
LOGIC
DESIGNED

RCM-C3
=
CHECKLIST
WORKFLOWS
IMPLEMENTED

RCM-C4
=
EVIDENCE
LINKING
IMPLEMENTED

RCM-C5
=
AUTOMATED
POLICY /
SCOPE /
SECURITY
CHECKS
IMPLEMENTED

RCM-C6
=
AUDIT /
HALT /
RESUME /
PILOT
CHECKLISTS
INTEGRATED

RCM-C7
=
PROJECT /
TENANT /
SECURITY /
AUTHORITY
CHECKS
VERIFIED

RCM-C8
=
CONTROLLED
CHECKLIST
PILOT
VERIFIED

RCM-C9
=
PRODUCTION
CHECKLIST
GOVERNANCE
SEPARATELY
AUTHORIZED
```

---

# 140. Checklist Maturity Boundary

Permanent:

```text
RCM-C8
≠
RCM-C9
```

---

# 141. Repository Evidence Boundary

The established Research Lab root structure includes:

```text
doc/26-research-lab/research-checklists.md
```

This document defines module-wide Research Lab checklists.

It does not prove automated checklist tooling exists.

---

# 142. Repository Save Boundary

This document is generated for:

```text
doc/26-research-lab/research-checklists.md
```

Permanent:

```text
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

# 143. Current Documentation Truth

```text
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

RESEARCH_LAB_GOVERNANCE
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_SECURITY
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_METRICS
=
CONTENT_COMPLETE_FOR_REVIEW

RESEARCH_LAB_CHECKLISTS
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 144. Current Runtime Truth

Nothing in this document independently proves runtime checklist enforcement.

```text
RESEARCH_CHECKLIST_ENGINE
=
NOT_PROVEN

CHECKLIST_AUTOMATION
=
NOT_PROVEN

CHECKLIST_EVIDENCE_LINKING
=
NOT_PROVEN

RISK_BASED_CHECKLIST_ROUTING
=
NOT_PROVEN

AUTONOMY_BASED_CHECKLIST_ROUTING
=
NOT_PROVEN

PROJECT_SCOPE_CHECK_AUTOMATION
=
NOT_PROVEN

TENANT_SCOPE_CHECK_AUTOMATION
=
NOT_PROVEN

AUTHORIZATION_CHECK_AUTOMATION
=
NOT_PROVEN

DATASET_CHECK_AUTOMATION
=
NOT_PROVEN

MODEL_CHECK_AUTOMATION
=
NOT_PROVEN

PROMPT_CHECK_AUTOMATION
=
NOT_PROVEN

AGENT_CHECK_AUTOMATION
=
NOT_PROVEN

SECURITY_CHECK_AUTOMATION
=
NOT_PROVEN

HALT_CHECKLIST_RUNTIME
=
NOT_PROVEN

RESUME_CHECKLIST_RUNTIME
=
NOT_PROVEN

PILOT_READINESS_AUTOMATION
=
NOT_PROVEN

PRODUCTION_GATE_AUTOMATION
=
NOT_PROVEN

PRODUCTION_RESEARCH_CHECKLIST_SYSTEM
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 145. Approval Truth

```text
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

CHECKLISTS
IMPLEMENTED
=
NOT_PROVEN

CHECKLISTS
AUTOMATED
=
NOT_PROVEN

CHECKLISTS
TESTED
=
NOT_PROVEN

CHECKLISTS
VERIFIED
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 146. Permanent Checklist Invariants

```text
CHECKED
≠
PROVEN

CHECKLIST
PASS
≠
APPROVAL

APPROVAL
≠
IMPLEMENTATION

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

INTAKE
CHECK
PASS
≠
RESEARCH
AUTHORIZED

QUESTION
CHECK
PASS
≠
QUESTION
ANSWERED

RISK
CHECK
PASS
≠
RISK
ACCEPTED

AUTONOMY
CHECK
PASS
≠
AUTONOMY
EXPANSION
AUTHORIZED

PROJECT
FIELD
PRESENT
≠
PROJECT
ISOLATION
VERIFIED

TENANT
FIELD
PRESENT
≠
TENANT
ISOLATION
VERIFIED

DATASET
CHECK
PASS
≠
DATASET
AUTHORIZED
FOR
EVERY
USE

CITATION
CHECK
PASS
≠
CONCLUSION
TRUE

EXPERIMENT
CHECK
PASS
≠
HYPOTHESIS
PROVEN

BENCHMARK
CHECK
PASS
≠
PRODUCTION
FIT

MODEL
CHECK
PASS
≠
MODEL
DEPLOYMENT
AUTHORIZED

PROMPT
CHECK
PASS
≠
PROMPT OS
UPDATE
AUTHORIZED

AGENT
CHECK
PASS
≠
AUTONOMY
INCREASE

MULTI-AGENT
CHECK
PASS
≠
CONSENSUS
TRUTH

SIMULATION
CHECK
PASS
≠
REAL-WORLD
PROOF

PROTOTYPE
CHECK
PASS
≠
PRODUCT
READY

RADAR
CHECK
PASS
≠
PROCUREMENT
AUTHORIZED

TRANSFER
CHECK
PASS
≠
IMPLEMENTATION
AUTHORIZED

PUBLICATION
CHECK
PASS
≠
DISCLOSURE
AUTHORIZED

METRIC
CHECK
PASS
≠
METRIC
TRUTH

HALT
CHECK
PASS
≠
HALT
VERIFIED
UNTIL
TESTED

ISSUE
FIXED
≠
RESUME
AUTHORIZED

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

FOUNDER
VISIBILITY
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

PILOT
CHECKLIST
PASS
≠
PRODUCTION
AUTHORIZATION

RCM-C8
≠
RCM-C9

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
VERIFIED

VERIFIED
≠
PRODUCTION
AUTHORIZED
```

---

# 147. Changelog Entry

Append during future root `CHANGELOG.md` synchronization:

```markdown
## RESEARCH-LAB-CHG-20260813-011 — Research Lab Master Checklist System Established

| Field | Value |
|---|---|
| Date | 2026-08-13 |
| Change Type | `CREATED`, `RESEARCH-CHECKLISTS`, `QUALITY-GATES`, `AUTHORITY`, `RISK`, `AUTONOMY`, `PROJECT-ISOLATION`, `TENANT-ISOLATION`, `SECURITY`, `VALIDATION`, `PILOT-READINESS`, `PRODUCTION-HARD-STOPS`, `RUNTIME-TRUTH` |
| Impact | `I5 — Research Lab Enterprise Operational Checklist Foundation` |
| Risk | `R1 — Documentation` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Canonical | `false` |
| Production Authorization | `NOT_AUTHORIZED_BY_THIS_DOCUMENT` |

### Affected Document

`doc/26-research-lab/research-checklists.md`

### Checklist Truth

`RESEARCH_LAB_CHECKLISTS = CONTENT_COMPLETE_FOR_REVIEW`

### Runtime Truth

`RESEARCH_CHECKLIST_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_RESEARCH_CHECKLIST_SYSTEM = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 148. Final Research Checklist Rule

The Mianx.ai Research Lab checklist system should enforce the thinking pattern:

```text
BEFORE
RESEARCH

↓

DO
WE
UNDERSTAND
THE
QUESTION?

↓

DO
WE
HAVE
TRUSTED
SCOPE?

↓

DO
WE
HAVE
VALID
AUTHORITY?

↓

DO
WE
UNDERSTAND
RISK
AND
AUTONOMY?

↓

ARE
DATA /
MODELS /
PROMPTS /
AGENTS /
TOOLS
AUTHORIZED?

↓

ARE
SECURITY /
PRIVACY /
ETHICS /
LEGAL /
IP
CONTROLS
SATISFIED?

↓

IS
RESEARCH
METHOD
SOUND?

↓

IS
EXECUTION
TRACEABLE?

↓

IS
EVIDENCE
VALID?

↓

WAS
COUNTER-
EVIDENCE
CONSIDERED?

↓

CAN
THE
RESULT
BE
REPRODUCED /
CHALLENGED?

↓

ARE
LIMITATIONS
EXPLICIT?

↓

IS
VALIDATION
SCOPED?

↓

IS
KNOWLEDGE
TRANSFER
SEPARATE
FROM
IMPLEMENTATION?

↓

IS
IMPLEMENTATION
SEPARATE
FROM
VERIFICATION?

↓

IS
VERIFICATION
SEPARATE
FROM
PRODUCTION
AUTHORIZATION?
```

while permanently preserving:

```text
CHECKLIST
≠
AUTHORITY

CHECKMARK
≠
EVIDENCE

RESEARCH
VALIDATION
≠
DEPLOYMENT

AI
≠
FOUNDER

PILOT
≠
PRODUCTION

DOCUMENTATION
≠
IMPLEMENTATION
```

---

# 149. Next Document

The Research Lab root foundation now includes:

* `README.md`
* `INDEX.md`
* `research-vision.md`
* `research-strategy.md`
* `research-architecture.md`
* `research-capabilities.md`
* `research-lifecycle.md`
* `research-governance.md`
* `research-security.md`
* `research-metrics.md`
* `research-checklists.md`

The next root document should convert these foundations into a **phased execution roadmap**.

That roadmap should define Research Lab documentation completion, Core Research Control Plane, Research Registry, Evidence and Dataset foundations, Experiment and Benchmark platforms, Model/Prompt/Agent Research, simulations, prototypes, Knowledge Transfer, Security, monitoring, controlled Pilot readiness, multi-Project and multi-Tenant verification, Production authorization gates, dependencies, phase exits, hard stops, evidence requirements and long-term maturity—without falsely claiming implementation or Production readiness.

## NEXT DOCUMENT

```text
doc/26-research-lab/ROADMAP.md
```

---
