---

id: RESEARCH-LAB-GOVERNANCE-COMPLIANCE-001
title: Mianx.ai Research Lab Governance — Compliance
version: 1.0.0
status: Draft

description: Enterprise-grade specification for the Mianx.ai Research Lab Compliance framework. This document defines how Research activities should identify, classify, map, evaluate, document, monitor, evidence, challenge, remediate and revalidate applicable legal, regulatory, contractual, licensing, intellectual-property, privacy, Security, Data, AI governance, Responsible AI, ethics, publication, collaboration, open-source, Dataset, Model, Human-participant, export, records-management and Project/Tenant obligations. It establishes compliance scope, obligation sources, obligation registry, applicability analysis, jurisdiction, legal-entity context, Project and Tenant context, Research purpose, requirement interpretation, control mapping, Evidence, attestation, control ownership, segregation of duties, compliance gates, Data classification, privacy and Data-protection requirements, sensitive Data, Human-subject Research boundaries, consent where required, cross-border Data handling, third-party processors/providers, Foundation Model providers, Dataset licenses, Model licenses, software and open-source licenses, academic and publication obligations, copyright, patents, trade secrets, confidentiality, Research collaboration agreements, export and sanctions screening where applicable, AI-specific obligations, safety and Responsible AI, records retention, deletion, auditability, regulatory change monitoring, compliance assessments, findings, exceptions, waivers, compensating controls, remediation, incidents, breach escalation, whistleblowing/non-retaliation principles, Project/Tenant isolation, compliance inheritance boundaries, controlled Pilots, Production authorization, maturity and Runtime Truth. It permanently separates legal requirement from internal policy, regulation from interpretation, interpretation from legal advice, applicability from compliance, documented control from implemented control, implemented control from control effectiveness, Evidence existence from Evidence sufficiency, assessment pass from legal guarantee, certification from universal compliance, provider compliance from Mianx.ai compliance, Dataset availability from lawful/authorized use, Model availability from license compatibility, consent from unlimited use authorization, anonymization claim from verified de-identification, public Data from unrestricted Data, open source from no obligations, academic use from commercial-use permission, Research purpose from Production purpose, Project membership from cross-Project authority, Tenant identifier from Tenant isolation, approval routing from approval, exception from permanent policy change, legal counsel review from Founder approval, Pilot from Production authorization, and documentation from implementation, testing, verification or Production authorization.

type: Research Compliance Framework, Regulatory and Contractual Obligation Model, Research Control Mapping Specification, AI and Data Compliance Governance Framework, Compliance Evidence and Assessment Model, Exception and Remediation Framework, Runtime Truth Register, Controlled Pilot Boundary, and Production Authorization Boundary

class: Governed target-state Research Lab Compliance specification defining how Mianx.ai should manage compliance obligations across Research without asserting any specific legal conclusion, jurisdictional legal determination, certification, regulatory approval, implemented compliance control, legal-counsel opinion, compliance monitoring runtime or Production compliance control plane

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Governance
specialization: Compliance

parent: doc/26-research-lab/governance
path: doc/26-research-lab/governance/compliance.md

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
* Research Compliance Governance
* Legal Governance
* Regulatory Governance
* Contract Governance
* Privacy Governance
* Data Protection Governance
* Security Governance
* AI Governance
* Responsible AI Governance
* AI Ethics Governance
* Dataset Governance
* Model Governance
* Prompt Governance
* Agent Governance
* Multi-Agent Governance
* Tool Governance
* Intellectual Property Governance
* Open Source Governance
* Publication Governance
* Collaboration Governance
* Records Governance
* Project Governance
* Tenant Governance
* Risk Governance
* Audit Governance
* Verification Governance
* Production Governance
* Documentation Governance

maintainers:

* Research Governance Team
* Research Compliance Team
* Legal and Regulatory Operations
* Privacy and Data Protection Team
* Security Team
* Responsible AI Team
* AI Ethics Team
* Dataset Governance Team
* Model Governance Team
* Research Operations
* Collaboration Management
* Intellectual Property Team
* Open Source Governance
* Records Management
* Verification Engineering
* Audit Team
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Research Governance
* Research Compliance Governance
* Qualified Legal Counsel Where Required
* Privacy Governance
* Data Protection Governance
* Security Governance
* AI Governance
* Responsible AI Governance
* AI Ethics Governance
* Intellectual Property Governance
* Project Governance
* Tenant Governance
* Risk Governance
* Audit Governance
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
* Research Engineers
* AI Researchers
* Dataset Researchers
* Model Researchers
* Agent Researchers
* Research Operations
* Legal and Compliance Personnel
* Privacy and Data Protection Personnel
* Security Personnel
* Responsible AI Personnel
* Intellectual Property Personnel
* Collaboration Managers
* Product Leaders
* Enterprise Architects
* Project Leaders
* Verification Engineers
* Auditors
* Documentation Maintainers

legal_notice: This document defines an internal Research compliance governance framework. It does not itself determine which laws apply, provide jurisdiction-specific legal advice, create regulatory approval, establish certification, or replace review by qualified legal, privacy, compliance, Security, tax, export-control, intellectual-property or other competent professionals where required.

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
* ../ethics/ai-ethics.md
* ../ethics/bias-evaluation.md
* ../ethics/responsible-ai.md
* ../experiments/experiment-design.md
* ../experiments/experiment-results.md
* ../experiments/experiment-tracking.md
* ../collaboration/external-partnerships.md
* ../collaboration/internal-collaboration.md
* ../collaboration/open-source.md
* ../academic-research/collaborations.md
* ../academic-research/literature-review.md
* ../academic-research/research-papers.md
* ../future-technologies/future-roadmap.md
* ../future-technologies/next-generation-ai.md
* ../future-technologies/technology-forecast.md
* ../../01-governance/
* ../../03-product/
* ../../04-system/
* ../../06-engineering/
* ../../07-platform/
* ../../08-data/
* ../../09-security/
* ../../10-devops/
* ../../11-operations/
* ../../12-business/
* ../../13-api/
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

* ./policies.md
* ./research-governance.md
* ../security/
* ../patents/
* ../publications/
* ../knowledge-transfer/
* ../monitoring/
* ../templates/
* ../CHANGELOG.md

review_cycle:

* At Every Material Research Compliance Framework Change
* At Every New Research Activity Class
* At Every Material Jurisdiction or Legal-Entity Change
* At Every Material Regulatory Change Affecting Research
* At Every Material Dataset, Model, Provider or License Change
* At Every Material Third-Party Collaboration Change
* At Every Material Privacy or Security Change
* At Every Material Publication or Intellectual Property Change
* At Every Material Compliance Finding or Incident
* At Every Exception or Waiver Expiration
* Before High-Risk Research
* Before Controlled Research Pilots
* Before Production-Connected Research
* Quarterly for Active High-Risk Compliance Domains
* Annually for the Overall Research Compliance Framework

## canonical: false

# Mianx.ai Research Lab Governance — Compliance

> **Research freedom does not create freedom from law, contract, privacy, Security, licensing, ethics or enterprise governance.**
>
> Compliance exists to ensure that Research can move quickly without silently creating legal, contractual, intellectual-property, Data, Security or Human-impact exposure.
>
> The Research Lab should therefore be able to answer:
>
> ```text
> WHAT
> OBLIGATION?
>
> ↓
>
> FROM
> WHICH
> SOURCE?
>
> ↓
>
> DOES
> IT
> APPLY?
>
> ↓
>
> TO
> WHICH
> ENTITY /
> PROJECT /
> TENANT /
> DATA /
> MODEL /
> ACTIVITY?
>
> ↓
>
> WHAT
> CONTROL
> ADDRESSES
> IT?
>
> ↓
>
> IS
> THE
> CONTROL
> IMPLEMENTED?
>
> ↓
>
> IS
> IT
> EFFECTIVE?
>
> ↓
>
> WHAT
> EVIDENCE
> PROVES
> THAT?
>
> ↓
>
> WHAT
> REMAINS
> OPEN?
> ```

---

# 1. Purpose

The Compliance framework should establish a governed process for:

```text id="rc001"
IDENTIFY
OBLIGATIONS

↓

DETERMINE
APPLICABILITY

↓

INTERPRET
WITH
APPROPRIATE
EXPERTISE

↓

MAP
CONTROLS

↓

ASSIGN
OWNERS

↓

IMPLEMENT

↓

COLLECT
EVIDENCE

↓

ASSESS

↓

REMEDIATE

↓

REVALIDATE

↓

MONITOR
CHANGE
```

---

# 2. Compliance Truth Principle

Permanent:

```text id="rc002"
COMPLIANCE
DOCUMENTED
≠
COMPLIANCE
ACHIEVED
```

---

# 3. Legal Advice Boundary

```text id="rc003"
THIS
DOCUMENT
≠
JURISDICTION-
SPECIFIC
LEGAL
ADVICE
```

---

# 4. Applicability Boundary

Permanent:

```text id="rc004"
REQUIREMENT
EXISTS
≠
REQUIREMENT
APPLIES
TO
EVERY
Mianx.ai
RESEARCH
ACTIVITY
```

Applicability must be determined in context.

---

# 5. Compliance/Certification Boundary

```text id="rc005"
INTERNAL
COMPLIANCE
ASSESSMENT
PASS
≠
EXTERNAL
CERTIFICATION
```

---

# 6. Certification Boundary

Permanent:

```text id="rc006"
CERTIFIED
AGAINST
STANDARD X
≠
COMPLIANT
WITH
EVERY
LAW /
CONTRACT /
OBLIGATION
```

---

# 7. Research Compliance Mission

```text id="rc007"
OBLIGATION
SOURCE

↓

REQUIREMENT

↓

APPLICABILITY

↓

CONTROL

↓

IMPLEMENTATION

↓

EVIDENCE

↓

TEST /
ASSESSMENT

↓

FINDING

↓

REMEDIATION

↓

CLOSURE /
REVALIDATION
```

---

# 8. Compliance Scope

This framework may apply to:

* Research Programs.
* Experiments.
* Benchmarks.
* Datasets.
* Foundation Models.
* Reasoning Models.
* multimodal systems.
* Prompts.
* Agents.
* Multi-Agent systems.
* Tools.
* simulations.
* prototypes.
* publications.
* external collaborations.
* future technologies.

---

# 9. Scope Boundary

```text id="rc009"
RESEARCH
ACTIVITY
INTERNAL
≠
RESEARCH
ACTIVITY
EXEMPT
FROM
COMPLIANCE
```

---

# 10. Obligation Sources

Potential sources include:

```text id="rc010"
LAW

REGULATION

REGULATOR
ORDER

CONTRACT

DATA
LICENSE

MODEL
LICENSE

SOFTWARE
LICENSE

OPEN-
SOURCE
LICENSE

PARTNERSHIP
AGREEMENT

NDA

IP
RIGHT

INTERNAL
POLICY

INDUSTRY
STANDARD

ETHICS
COMMITMENT

PUBLICATION
REQUIREMENT

FOUNDER /
ENTERPRISE
GOVERNANCE
DECISION
```

---

# 11. Obligation Source Boundary

Permanent:

```text id="rc011"
INTERNAL
POLICY
≠
LAW

AND

LAW
≠
INTERNAL
POLICY
```

They may overlap but remain different authority sources.

---

# 12. Compliance Obligation Registry

Future capability should maintain a versioned registry of material Research compliance obligations.

---

# 13. Obligation Record

```yaml id="rc013"
research_compliance_obligation:
  obligation_id: required

  source_type: required
  source_ref: required

  title: required
  requirement_text_ref: required

  jurisdiction_refs: []

  legal_entity_refs: []

  activity_scope_refs: []
  project_scope_refs: []
  tenant_scope_refs: []

  data_scope_refs: []
  model_scope_refs: []

  applicability_state: required
  interpretation_ref: conditional

  control_refs: []

  owner_ref: required

  effective_from: conditional
  effective_until: conditional

  review_at: required

  status: required
```

---

# 14. Obligation Identity

Every material obligation should use a stable ID.

Potential:

```text id="rc014"
RCO-000001
```

---

# 15. Obligation Versioning

When legal or contractual text changes, historical obligation versions should remain traceable.

---

# 16. Version Boundary

```text id="rc016"
CURRENT
OBLIGATION
VERSION
≠
ONLY
VERSION
RELEVANT
TO
HISTORICAL
RESEARCH
```

---

# 17. Jurisdiction

Applicability may depend on:

* Research location.
* legal entity.
* Data subject location.
* customer location.
* provider location.
* service delivery location.

---

# 18. Jurisdiction Boundary

Permanent:

```text id="rc018"
Mianx.ai
HEADQUARTERS
LOCATION
≠
ONLY
POSSIBLE
RELEVANT
JURISDICTION
```

---

# 19. Legal Entity Context

Research activity should identify the responsible legal entity where material.

---

# 20. Legal Entity Boundary

```text id="rc020"
Mianx.ai
BRAND
≠
LEGAL
ENTITY
DETERMINATION
```

---

# 21. Applicability Analysis

Potential outcome:

```text id="rc021"
APPLIES

DOES
NOT
APPLY

PARTIALLY
APPLIES

CONDITIONAL

LEGAL
REVIEW
REQUIRED

UNKNOWN
```

---

# 22. Applicability Boundary

Permanent:

```text id="rc022"
NOT
YET
DETERMINED
≠
DOES
NOT
APPLY
```

---

# 23. Interpretation

Interpretation should identify:

* exact requirement.
* activity affected.
* conditions.
* exceptions.
* uncertainty.

---

# 24. Interpretation Boundary

```text id="rc024"
RESEARCHER
INTERPRETATION
≠
QUALIFIED
LEGAL
DETERMINATION
WHERE
LEGAL
REVIEW
IS
REQUIRED
```

---

# 25. Interpretation Record

```yaml id="rc025"
compliance_interpretation:
  interpretation_id: required

  obligation_ref: required

  applicability_context_ref: required

  interpretation_summary: required

  assumptions: []

  uncertainty_refs: []

  reviewer_ref: required

  legal_review_ref: conditional

  effective_at: required

  supersedes_ref: conditional

  status: required
```

---

# 26. Compliance Domains

Potential:

```text id="rc026"
CD01
PRIVACY /
DATA
PROTECTION

CD02
SECURITY

CD03
AI
GOVERNANCE

CD04
RESPONSIBLE
AI /
ETHICS

CD05
INTELLECTUAL
PROPERTY

CD06
COPYRIGHT

CD07
PATENTS

CD08
TRADE
SECRETS

CD09
MODEL
LICENSING

CD10
DATASET
LICENSING

CD11
OPEN
SOURCE

CD12
CONTRACTS

CD13
PUBLICATIONS

CD14
RESEARCH
COLLABORATION

CD15
HUMAN
PARTICIPANTS

CD16
RECORDS /
RETENTION

CD17
CROSS-
BORDER
DATA

CD18
EXPORT /
SANCTIONS
WHERE
APPLICABLE

CD19
INDUSTRY-
SPECIFIC
OBLIGATIONS

CD20
OTHER
REGULATORY
OBLIGATIONS
```

---

# 27. Control Mapping

Each applicable requirement should map to one or more controls.

---

# 28. Control Record

```yaml id="rc028"
research_compliance_control:
  control_id: required

  obligation_refs: []

  title: required

  objective: required

  control_type: required

  owner_ref: required

  implementation_ref: conditional

  evidence_requirements: []

  test_method_ref: required

  frequency: required

  project_scope_refs: []
  tenant_scope_refs: []

  status: required
```

---

# 29. Control Types

Potential:

```text id="rc029"
PREVENTIVE

DETECTIVE

CORRECTIVE

MANUAL

AUTOMATED

HYBRID

TECHNICAL

ADMINISTRATIVE

CONTRACTUAL
```

---

# 30. Control Documentation Boundary

Permanent:

```text id="rc030"
CONTROL
DOCUMENTED
≠
CONTROL
IMPLEMENTED
```

---

# 31. Implementation Boundary

```text id="rc031"
CONTROL
IMPLEMENTED
≠
CONTROL
EFFECTIVE
```

---

# 32. Evidence Boundary

Permanent:

```text id="rc032"
EVIDENCE
EXISTS
≠
EVIDENCE
SUFFICIENT
```

---

# 33. Control Effectiveness

Potential states:

```text id="rc033"
NOT
ASSESSED

DESIGN
ADEQUATE

DESIGN
INADEQUATE

OPERATING
EFFECTIVELY

OPERATING
WITH
DEFICIENCY

INEFFECTIVE

UNKNOWN
```

---

# 34. Design vs Operating Effectiveness

```text id="rc034"
CONTROL
DESIGN
GOOD
≠
CONTROL
OPERATING
EFFECTIVELY
```

---

# 35. Evidence

Potential Evidence:

```text id="rc035"
POLICY

CONFIGURATION
SNAPSHOT

SYSTEM
LOG

ACCESS
REVIEW

LICENSE
COPY

CONTRACT

CONSENT
RECORD

DATA
FLOW

TEST
RESULT

AUDIT
LOG

APPROVAL
RECORD

DELETION
EVIDENCE

PROVIDER
ATTESTATION
```

---

# 36. Evidence Provenance

Every Evidence object should identify:

* source.
* period.
* scope.
* integrity.
* owner.

---

# 37. Evidence Record

```yaml id="rc037"
compliance_evidence:
  evidence_id: required

  control_ref: required

  evidence_type: required

  source_ref: required

  period_start: conditional
  period_end: conditional

  project_id: conditional
  tenant_id: conditional

  integrity_ref: required

  collected_at: required

  reviewer_ref: conditional

  status: required
```

---

# 38. Evidence Freshness

Evidence should represent the period being assessed.

---

# 39. Evidence Freshness Boundary

Permanent:

```text id="rc039"
CONTROL
PASSED
LAST
YEAR
≠
CONTROL
EFFECTIVE
TODAY
```

---

# 40. Attestation

Attestations may support but should not replace appropriate Evidence.

---

# 41. Attestation Boundary

```text id="rc041"
OWNER
ATTESTS
CONTROL
WORKS
≠
INDEPENDENT
VERIFICATION
```

---

# 42. Compliance Assessment

Potential:

```text id="rc042"
SCOPE

OBLIGATIONS

CONTROLS

EVIDENCE

TESTS

FINDINGS

REMEDIATION
```

---

# 43. Assessment Record

```yaml id="rc043"
research_compliance_assessment:
  assessment_id: required

  scope_ref: required

  obligation_refs: []
  control_refs: []

  assessment_period: required

  assessor_refs: []

  evidence_refs: []

  finding_refs: []

  conclusion: required

  limitations: []

  status: required
```

---

# 44. Assessment Boundary

Permanent:

```text id="rc044"
ASSESSMENT
PASS
≠
LEGAL
GUARANTEE
```

---

# 45. Independent Assessment

Higher-risk activity may require independent review.

---

# 46. Independence Boundary

```text id="rc046"
CONTROL
OWNER
TESTS
OWN
CONTROL
≠
INDEPENDENT
ASSURANCE
```

---

# 47. Segregation of Duties

Potential separation:

```text id="rc047"
RESEARCHER

≠

COMPLIANCE
APPROVER

≠

CONTROL
TESTER

≠

FINAL
AUTHORITY
```

where risk warrants.

---

# 48. Segregation Boundary

Permanent:

```text id="rc048"
ONE
PERSON
CAN
TECHNICALLY
PERFORM
ALL
ACTIONS
≠
ONE
PERSON
SHOULD
HAVE
ALL
AUTHORITIES
```

---

# 49. Privacy and Data Protection

Research may involve:

* personal Data.
* customer Data.
* employee Data.
* partner Data.
* public Data.
* synthetic Data.

Each requires appropriate classification and authority.

---

# 50. Public Data Boundary

Permanent:

```text id="rc050"
PUBLICLY
ACCESSIBLE
DATA
≠
UNRESTRICTED
DATA
FOR
ANY
RESEARCH
PURPOSE
```

---

# 51. Personal Data

Research should identify whether Data can relate to an identifiable person under applicable context.

---

# 52. Data Minimization

Collect only what is justified for the Research purpose where required by governance or applicable obligation.

---

# 53. Minimization Boundary

```text id="rc053"
DATA
MAY
BE
USEFUL
≠
DATA
MUST
BE
COLLECTED
```

---

# 54. Purpose Limitation

Research Data use should remain compatible with authorized purpose.

---

# 55. Purpose Boundary

Permanent:

```text id="rc055"
DATA
AUTHORIZED
FOR
RESEARCH
PURPOSE A
≠
DATA
AUTHORIZED
FOR
PURPOSE B
```

---

# 56. Research/Production Purpose Boundary

```text id="rc056"
DATA
AUTHORIZED
FOR
CONTROLLED
RESEARCH
≠
DATA
AUTHORIZED
FOR
PRODUCTION
MODEL
USE
```

---

# 57. Sensitive Data

Potential categories should be governed according to applicable policy and law.

Examples may include:

* health.
* biometric.
* financial.
* precise location.
* sensitive identity attributes.
* credentials.

---

# 58. Sensitive Data Boundary

Permanent:

```text id="rc058"
MODEL
CAN
PROCESS
SENSITIVE
DATA
≠
MODEL
AUTHORIZED
TO
PROCESS
SENSITIVE
DATA
```

---

# 59. De-Identification

Potential techniques:

* masking.
* aggregation.
* pseudonymization.
* anonymization.

---

# 60. Anonymization Boundary

```text id="rc060"
DATASET
LABELLED
"ANONYMOUS"
≠
RE-
IDENTIFICATION
RISK
VERIFIED
ABSENT
```

---

# 61. Pseudonymization Boundary

Permanent:

```text id="rc061"
PSEUDONYMIZED
≠
ANONYMOUS
AUTOMATICALLY
```

---

# 62. Consent

Where valid consent is required or chosen as the lawful/ethical basis, it should be:

* specific enough.
* recorded.
* revocable where applicable.

---

# 63. Consent Boundary

```text id="rc063"
CONSENT
OBTAINED
FOR
ONE
PURPOSE
≠
UNLIMITED
FUTURE
AI
USE
AUTHORIZED
```

---

# 64. Consent Record

```yaml id="rc064"
research_consent_record:
  consent_id: required

  subject_or_cohort_ref: required

  research_scope_ref: required

  data_scope_ref: required

  consent_basis_ref: required

  granted_at: required

  expires_at: conditional

  withdrawn_at: conditional

  evidence_ref: required

  status: required
```

---

# 65. Human Participants

Some Research may involve Human participants, users, evaluators or behavioral studies.

---

# 66. Human Participant Boundary

Permanent:

```text id="rc066"
PARTICIPANT
IS
EMPLOYEE /
CUSTOMER /
VOLUNTEER
≠
RESEARCH
ETHICS /
LEGAL
REVIEW
NEVER
REQUIRED
```

Applicability must be determined.

---

# 67. Human Participant Review

Potential questions:

```text id="rc067"
WHAT
INTERVENTION?

WHAT
DATA?

WHAT
RISK?

WHAT
CONSENT /
NOTICE?

WHAT
WITHDRAWAL
RIGHT?

WHAT
COMPENSATION?

WHAT
VULNERABLE
GROUPS?

WHAT
REVIEW
IS
REQUIRED?
```

---

# 68. Human Evaluation Boundary

```text id="rc068"
HUMAN
EVALUATOR
RATES
AI
OUTPUT
≠
NO
HUMAN-
RELATED
COMPLIANCE
ISSUES
POSSIBLE
```

---

# 69. Children and Vulnerable Groups

Research involving vulnerable populations should receive elevated review where applicable.

---

# 70. Cross-Border Data

Data movement may require specific legal, contractual or technical controls.

---

# 71. Cross-Border Boundary

Permanent:

```text id="rc071"
CLOUD
PROVIDER
AVAILABLE
IN
REGION X
≠
DATA
TRANSFER
TO
REGION X
AUTHORIZED
```

---

# 72. Data Residency

Where required, Data location constraints should be enforceable and testable.

---

# 73. Residency Boundary

```text id="rc073"
SERVICE
REGION
CONFIGURED
≠
ALL
BACKUPS /
LOGS /
SUBPROCESSORS
IN
SAME
REGION
VERIFIED
```

---

# 74. Third-Party Providers

Research may use:

* cloud providers.
* Model providers.
* Data providers.
* SaaS Tools.
* Research partners.

---

# 75. Provider Boundary

Permanent:

```text id="rc075"
PROVIDER
COMPLIANT
WITH
STANDARD X
≠
Mianx.ai
USE
OF
PROVIDER
COMPLIANT
AUTOMATICALLY
```

---

# 76. Provider Due Diligence

Potential:

```text id="rc076"
SECURITY

PRIVACY

DATA
USE

RETENTION

SUBPROCESSORS

REGION

MODEL
TRAINING
USE

LICENSE

EXIT

INCIDENT
NOTIFICATION
```

---

# 77. Provider Data Use

Research should understand whether provider may:

* retain prompts.
* train on Data.
* log content.
* use subprocessors.

---

# 78. Provider Data Boundary

```text id="rc078"
API
ENTERPRISE
PLAN
≠
NO
PROVIDER
DATA
RETENTION /
USE
UNLESS
VERIFIED
```

---

# 79. Dataset Compliance

Each Dataset should establish:

```text id="rc079"
SOURCE

OWNERSHIP /
LICENSE

PURPOSE

PERMITTED
USES

PROHIBITED
USES

ATTRIBUTION

SHARING

RETENTION

PRIVACY

PROJECT /
TENANT
SCOPE
```

---

# 80. Dataset Availability Boundary

Permanent:

```text id="rc080"
DATASET
CAN
BE
DOWNLOADED
≠
DATASET
MAY
BE
USED
FOR
Mianx.ai
RESEARCH
```

---

# 81. Dataset License

Potential restrictions may include:

* non-commercial.
* attribution.
* share-alike.
* Research-only.
* geographic restrictions.
* redistribution restrictions.

---

# 82. Research-Only Boundary

```text id="rc082"
DATASET
AUTHORIZED
FOR
RESEARCH
≠
DATASET
AUTHORIZED
FOR
COMMERCIAL
PRODUCTION
```

---

# 83. Dataset Derivatives

Transformations may not automatically remove source-license obligations.

---

# 84. Derivative Boundary

Permanent:

```text id="rc084"
DATASET
TRANSFORMED
≠
SOURCE
RIGHTS /
OBLIGATIONS
AUTOMATICALLY
DISAPPEAR
```

---

# 85. Synthetic Dataset Compliance

Synthetic Data may still inherit:

* source Data concerns.
* memorization risk.
* bias.
* contract restrictions.

---

# 86. Synthetic Data Boundary

```text id="rc086"
SYNTHETIC
≠
LEGAL /
PRIVACY /
LICENSE
RISK
FREE
```

---

# 87. Model Compliance

Each Model should identify:

```text id="rc087"
PROVIDER

LICENSE

ALLOWED
USE

PROHIBITED
USE

REDISTRIBUTION

DERIVATIVE
MODEL
RULES

DATA
HANDLING

GEOGRAPHY

ATTRIBUTION
```

---

# 88. Model Availability Boundary

Permanent:

```text id="rc088"
MODEL
AVAILABLE
BY
API /
DOWNLOAD
≠
MODEL
LICENSE
COMPATIBLE
WITH
Mianx.ai
USE
```

---

# 89. Model Version Compliance

License terms may change with Model/version/provider.

---

# 90. Model Version Boundary

```text id="rc090"
MODEL
NAME
UNCHANGED
≠
LICENSE /
TERMS
UNCHANGED
```

---

# 91. Model Derivatives

Fine-tuning, adapters, distillation and derivative Models may create additional obligations.

---

# 92. Fine-Tuning Boundary

Permanent:

```text id="rc092"
BASE
MODEL
USE
AUTHORIZED
≠
ALL
FINE-
TUNING /
DERIVATIVE
USE
AUTHORIZED
```

---

# 93. Prompt Compliance

Prompts may contain:

* copyrighted content.
* confidential instructions.
* customer information.
* personal Data.

---

# 94. Prompt Boundary

```text id="rc094"
PROMPT
IS
"JUST
TEXT"
≠
PROMPT
HAS
NO
COMPLIANCE
IMPACT
```

---

# 95. Agent Compliance

Agent systems combine:

```text id="rc095"
MODEL

+

PROMPT

+

TOOLS

+

MEMORY

+

DATA

+

SIDE
EFFECTS
```

Compliance must consider the whole system.

---

# 96. Agent Boundary

Permanent:

```text id="rc096"
MODEL
USE
COMPLIANT
≠
AGENT
SYSTEM
COMPLIANT
AUTOMATICALLY
```

---

# 97. Tool Compliance

Tools may introduce:

* external Data transfer.
* financial actions.
* communications.
* account changes.
* copyrighted content use.

---

# 98. Tool Access Boundary

```text id="rc098"
TOOL
INTEGRATION
TECHNICALLY
AVAILABLE
≠
TOOL
USE
COMPLIANCE
AUTHORIZED
```

---

# 99. Multi-Agent Compliance

Delegation must not launder compliance authority.

---

# 100. Delegation Boundary

Permanent:

```text id="rc100"
PARENT
AGENT
COMPLIANCE
SCOPE
≠
CHILD
AGENT
MAY
EXCEED
THAT
SCOPE
```

---

# 101. Memory Compliance

Persistent Memory can retain:

* personal Data.
* confidential Data.
* licensed content.
* stale approvals.

---

# 102. Memory Retention Boundary

```text id="rc102"
MEMORY
USEFUL
TO
AGENT
≠
MEMORY
MAY
BE
RETAINED
INDEFINITELY
```

---

# 103. AI Governance Compliance

Future requirements may impose obligations relating to:

* AI system classification.
* transparency.
* testing.
* Human oversight.
* risk management.
* documentation.

Applicability requires current jurisdiction-specific analysis at the relevant time.

---

# 104. AI Regulation Boundary

Permanent:

```text id="rc104"
AI
REGULATION
EXISTS
SOMEWHERE
≠
SAME
AI
OBLIGATION
APPLIES
EVERYWHERE
```

---

# 105. AI System Classification

Where required, classify AI systems according to the applicable obligation framework rather than inventing a universal classification.

---

# 106. Classification Boundary

```text id="rc106"
INTERNAL
RISK
CLASS
R3
≠
LEGAL
REGULATORY
RISK
CATEGORY
UNLESS
EXPLICITLY
MAPPED
```

---

# 107. Responsible AI Compliance

Internal Responsible AI commitments may exceed minimum legal requirements.

---

# 108. Responsible AI Boundary

Permanent:

```text id="rc108"
LEGAL
MINIMUM
MET
≠
Mianx.ai
RESPONSIBLE
AI
STANDARD
MET
```

---

# 109. AI Ethics

Ethical review may be required even when law does not prohibit an activity.

---

# 110. Ethics/Compliance Boundary

```text id="rc110"
LEGAL
≠
ETHICAL
AUTOMATICALLY

AND

ETHICALLY
DESIRABLE
≠
LEGAL
AUTOMATICALLY
```

---

# 111. Bias and Fairness

Research should assess applicable fairness obligations and internal Responsible AI requirements.

---

# 112. Fairness Boundary

Permanent:

```text id="rc112"
FAIRNESS
METRIC
PASS
≠
LEGAL
NON-
DISCRIMINATION
COMPLIANCE
PROVEN
```

---

# 113. Security Compliance

Security requirements may derive from:

* law.
* contracts.
* internal policy.
* industry standards.
* customer commitments.

---

# 114. Security Boundary

```text id="rc114"
SECURITY
CONTROL
BEST
PRACTICE
≠
SPECIFIC
LEGAL /
CONTRACTUAL
REQUIREMENT
UNLESS
MAPPED
```

---

# 115. Security Incident

A Security incident may also trigger:

* privacy.
* contractual.
* regulatory.
* customer notification obligations.

---

# 116. Incident Boundary

Permanent:

```text id="rc116"
SECURITY
INCIDENT
CONTAINED
≠
COMPLIANCE
NOTIFICATION
OBLIGATIONS
RESOLVED
```

---

# 117. Intellectual Property

Research should protect:

* Mianx.ai IP.
* third-party IP.
* customer IP.
* partner IP.

---

# 118. IP Boundary

```text id="rc118"
RESEARCHER
CAN
ACCESS
CONTENT
≠
Mianx.ai
OWNS
CONTENT
```

---

# 119. Copyright

Potential issues:

* Dataset source material.
* generated outputs.
* Research papers.
* images.
* software.
* documentation.

---

# 120. Copyright Boundary

Permanent:

```text id="rc120"
CONTENT
ONLINE
≠
CONTENT
COPYRIGHT-
FREE
```

---

# 121. AI-Generated Output IP

Ownership, rights and restrictions may depend on:

* provider terms.
* jurisdiction.
* source material.
* Human contribution.

No universal ownership rule should be invented.

---

# 122. AI Output Boundary

```text id="rc122"
AI
GENERATED
OUTPUT
≠
Mianx.ai
HAS
UNCONDITIONAL
EXCLUSIVE
IP
RIGHTS
```

---

# 123. Patent Compliance

Research should detect inventions with potential patent relevance before uncontrolled public disclosure.

---

# 124. Patent/Public Disclosure Boundary

Permanent:

```text id="rc124"
RESEARCH
RESULT
READY
TO
PUBLISH
≠
IP
PUBLICATION
CLEARANCE
COMPLETE
```

---

# 125. Trade Secrets

Confidential know-how should be protected from unnecessary disclosure.

---

# 126. Trade Secret Boundary

```text id="rc126"
INTERNAL
RESEARCH
NOTE
≠
SAFE
TO
SHARE
WITH
EXTERNAL
MODEL /
PARTNER
```

---

# 127. Confidentiality

Sources may include:

* NDAs.
* customer agreements.
* employment obligations.
* partnership agreements.

---

# 128. Confidentiality Boundary

Permanent:

```text id="rc128"
INFORMATION
RELEVANT
TO
RESEARCH
≠
INFORMATION
AUTHORIZED
FOR
RESEARCH
DISCLOSURE
```

---

# 129. Open Source

Open source remains subject to license terms.

---

# 130. Open-Source Boundary

```text id="rc130"
OPEN
SOURCE
≠
NO
OBLIGATIONS
```

---

# 131. Open-Source Review

Potential:

```text id="rc131"
LICENSE

NOTICE

ATTRIBUTION

SOURCE
DISCLOSURE

COPYLEFT

PATENT
CLAUSES

REDISTRIBUTION

COMPATIBILITY
```

---

# 132. License Compatibility

Components should be checked against intended use and distribution model.

---

# 133. Compatibility Boundary

Permanent:

```text id="rc133"
LICENSE A
ALLOWED

+

LICENSE B
ALLOWED

≠

A + B
COMBINATION
COMPATIBLE
AUTOMATICALLY
```

---

# 134. Dependency Licenses

Transitive dependencies may create obligations.

---

# 135. Dependency Boundary

```text id="rc135"
DIRECT
DEPENDENCY
LICENSE
CLEAN
≠
FULL
DEPENDENCY
TREE
LICENSE
CLEAN
```

---

# 136. Research Collaboration

External collaboration should establish:

* scope.
* confidentiality.
* Data rights.
* IP.
* publication.
* ownership.
* exit.

---

# 137. Collaboration Boundary

Permanent:

```text id="rc137"
PARTNER
IS
TRUSTED
≠
FORMAL
RIGHTS /
DUTIES
UNNECESSARY
```

---

# 138. Collaboration Agreement

Potential:

```yaml id="rc138"
research_collaboration_compliance:
  collaboration_id: required

  partner_ref: required

  agreement_ref: required

  research_scope_ref: required

  data_rights_ref: required

  ip_rights_ref: required

  confidentiality_ref: required

  publication_rights_ref: required

  security_requirements_ref: required

  exit_requirements_ref: required

  compliance_owner_ref: required

  status: required
```

---

# 139. Academic Research

Academic collaboration may involve:

* institutional policies.
* publication rights.
* author attribution.
* conflict-of-interest obligations.

---

# 140. Academic Boundary

```text id="rc140"
ACADEMIC
RESEARCH
PURPOSE
≠
AUTOMATIC
EXEMPTION
FROM
COMMERCIAL /
IP /
PRIVACY
OBLIGATIONS
```

---

# 141. Publications

Before release, material Research may require:

```text id="rc141"
SECURITY
REVIEW

PRIVACY
REVIEW

IP
REVIEW

CONFIDENTIALITY
REVIEW

ATTRIBUTION

DATASET /
MODEL
LICENSE
REVIEW
```

---

# 142. Publication Boundary

Permanent:

```text id="rc142"
RESEARCH
SCIENTIFICALLY
READY
≠
RESEARCH
CLEARED
FOR
PUBLICATION
```

---

# 143. Attribution

Required attribution should be preserved for:

* Data.
* code.
* Models.
* academic works.
* third-party content.

---

# 144. Citation Boundary

```text id="rc144"
SOURCE
CITED
≠
LICENSE
OBLIGATION
SATISFIED
AUTOMATICALLY
```

---

# 145. Records Management

Compliance records may include:

* approvals.
* assessments.
* contracts.
* licenses.
* Data-flow records.
* Evidence.
* findings.

---

# 146. Record Boundary

Permanent:

```text id="rc146"
RESEARCH
ARTIFACT
NO
LONGER
OPERATIONALLY
NEEDED
≠
COMPLIANCE
RECORD
MAY
BE
DELETED
```

---

# 147. Retention

Retention should be defined by:

* applicable obligations.
* contractual requirements.
* Research need.
* litigation/hold requirements.
* internal policy.

---

# 148. Retention Boundary

```text id="rc148"
LONGER
RETENTION
≠
BETTER
COMPLIANCE
AUTOMATICALLY
```

Over-retention may create risk.

---

# 149. Deletion

Deletion should be:

* authorized.
* scoped.
* evidenced.
* subject to holds.

---

# 150. Deletion Boundary

Permanent:

```text id="rc150"
RETENTION
PERIOD
EXPIRED
≠
IMMEDIATE
DELETION
AUTHORIZED
IF
LEGAL /
INVESTIGATION
HOLD
EXISTS
```

---

# 151. Backup Deletion

Deletion from active systems may not immediately delete all backups.

---

# 152. Backup Boundary

```text id="rc152"
ACTIVE
DATABASE
ROW
DELETED
≠
ALL
BACKUP
COPIES
IMMEDIATELY
DELETED
```

---

# 153. Records Integrity

Compliance Evidence should preserve:

* version.
* timestamps.
* provenance.
* tamper evidence where appropriate.

---

# 154. Contract Compliance

Research contracts may include:

```text id="rc154"
CONFIDENTIALITY

SECURITY

PRIVACY

DATA
USE

SERVICE
LOCATION

SUBPROCESSORS

IP

PUBLICATION

AUDIT

NOTIFICATION

RETENTION
```

---

# 155. Contract Boundary

Permanent:

```text id="rc155"
LEGAL
LAW
ALLOWS
ACTIVITY
≠
CONTRACT
ALLOWS
ACTIVITY
```

---

# 156. Stronger Obligation

Where multiple obligations apply, conflicts or stricter requirements should be resolved through proper governance rather than simplistic automatic selection.

---

# 157. Conflict Boundary

```text id="rc157"
TWO
OBLIGATIONS
CONFLICT
≠
SYSTEM
MAY
CHOOSE
THE
EASIER
ONE
```

---

# 158. Requirement Conflict Record

```yaml id="rc158"
compliance_requirement_conflict:
  conflict_id: required

  obligation_refs: []

  affected_scope_ref: required

  conflict_description: required

  legal_review_ref: conditional

  resolution_ref: required

  authority_ref: required

  status: required
```

---

# 159. Industry-Specific Compliance

Future Industry Operating Systems may have additional obligations.

Examples could arise in:

* healthcare.
* finance.
* education.
* employment.
* agriculture.
* food.
* communications.

Specific obligations must be evaluated when those Products/activities are defined.

---

# 160. Industry Boundary

Permanent:

```text id="rc160"
Mianx.ai
CORE
RESEARCH
COMPLIANCE
PASS
≠
INDUSTRY-
SPECIFIC
COMPLIANCE
PASS
```

---

# 161. Project Scope

Each compliance determination should record relevant Project.

---

# 162. Project Boundary

```text id="rc162"
PROJECT A
COMPLIANCE
ASSESSMENT
≠
PROJECT B
COMPLIANCE
ASSESSMENT
```

---

# 163. Tenant Scope

Tenant contracts and Data may create distinct requirements.

---

# 164. Tenant Boundary

Permanent:

```text id="rc164"
TENANT A
APPROVAL /
CONTRACT
≠
TENANT B
AUTHORITY
```

---

# 165. Shared Platform Controls

A shared control may support many Projects/Tenants.

---

# 166. Shared Control Boundary

```text id="rc166"
SHARED
CONTROL
TESTED
ONCE
≠
EVERY
PROJECT /
TENANT
DEPENDENCY
AND
CONFIGURATION
VERIFIED
```

---

# 167. Compliance Inheritance

Inheritance may be allowed only when:

```text id="rc167"
SAME
CONTROL

+

SAME
IMPLEMENTATION

+

SAME
SCOPE

+

SAME
RELEVANT
CONFIGURATION

+

CURRENT
EVIDENCE
```

---

# 168. Inheritance Boundary

Permanent:

```text id="rc168"
PARENT
SYSTEM
COMPLIANT
≠
ALL
CHILD
SYSTEMS
COMPLIANT
AUTOMATICALLY
```

---

# 169. Research Environment

Potential environments:

```text id="rc169"
LOCAL

SANDBOX

DEVELOPMENT

TEST

RESEARCH

PILOT

PRODUCTION
```

---

# 170. Environment Boundary

```text id="rc170"
COMPLIANT
IN
SANDBOX
≠
COMPLIANT
IN
PRODUCTION
```

---

# 171. Research Sandbox

Sandboxing reduces but does not eliminate:

* Data.
* licensing.
* IP.
* Human-subject.
* Security concerns.

---

# 172. Sandbox Boundary

Permanent:

```text id="rc172"
SANDBOX
≠
COMPLIANCE-
FREE
ZONE
```

---

# 173. External Egress

Research Data leaving Mianx.ai-controlled boundaries should have appropriate authority.

---

# 174. Egress Boundary

```text id="rc174"
OUTBOUND
API
CALL
TECHNICALLY
ALLOWED
≠
DATA
EGRESS
COMPLIANCE
AUTHORIZED
```

---

# 175. Web Research and External Sources

External web content may carry:

* copyright.
* privacy.
* terms-of-use.
* reliability concerns.

---

# 176. External Content Boundary

Permanent:

```text id="rc176"
WEB
CONTENT
PUBLIC
≠
WEB
CONTENT
FREE
OF
USE
RESTRICTIONS
```

---

# 177. Scraping and Automated Collection

Research involving automated collection should receive appropriate terms, legal, privacy and Security review where required.

---

# 178. Scraping Boundary

```text id="rc178"
TECHNICALLY
SCRAPABLE
≠
AUTHORIZED
TO
SCRAPE /
STORE /
REUSE
```

---

# 179. Export / Sanctions / Restricted Technology

Where activities, technologies, locations, persons or transfers create potential export-control or sanctions obligations, qualified review should determine applicability.

---

# 180. Export Boundary

Permanent:

```text id="rc180"
OPEN-
SOURCE /
PUBLIC
TECHNOLOGY
≠
NO
EXPORT /
SANCTIONS
CONSIDERATIONS
EVER
```

Applicability is context-specific.

---

# 181. Researcher Access

Access to regulated/restricted materials should be purpose- and role-bound.

---

# 182. Access Boundary

```text id="rc182"
RESEARCH
TEAM
MEMBER
≠
AUTHORIZED
FOR
EVERY
RESEARCH
ASSET
```

---

# 183. Least Privilege

Compliance systems should align with Security least-privilege principles.

---

# 184. Data Sharing

Before sharing Research Data:

```text id="rc184"
RECIPIENT

PURPOSE

DATA
CLASS

AUTHORITY

CONTRACT

SECURITY

RETENTION

REDISTRIBUTION
```

should be evaluated where applicable.

---

# 185. Sharing Boundary

Permanent:

```text id="rc185"
RECIPIENT
AUTHORIZED
TO
VIEW
≠
RECIPIENT
AUTHORIZED
TO
REDISTRIBUTE
```

---

# 186. Internal Knowledge Transfer

Research findings transferred internally should retain compliance restrictions.

---

# 187. Knowledge Boundary

```text id="rc187"
KNOWLEDGE
TRANSFERRED
TO
Mianx.ai
KNOWLEDGE
BASE
≠
UNDERLYING
RESTRICTED
DATA
MAY
BE
COPIED
UNRESTRICTED
```

---

# 188. Model Training Transfer

Research Data approved for evaluation should not automatically enter training.

---

# 189. Training Boundary

Permanent:

```text id="rc189"
DATA
AUTHORIZED
FOR
EVALUATION
≠
DATA
AUTHORIZED
FOR
TRAINING /
FINE-
TUNING
```

---

# 190. Benchmark Compliance

Benchmarks may contain:

* restricted Data.
* copyrighted content.
* sensitive cases.

---

# 191. Benchmark Boundary

```text id="rc191"
BENCHMARK
PUBLICLY
KNOWN
≠
BENCHMARK
CONTENT
UNRESTRICTED
FOR
ALL
USES
```

---

# 192. Compliance Gate in Research Lifecycle

Conceptually:

```text id="rc192"
RESEARCH
INTAKE

↓

APPLICABILITY
SCREEN

↓

DATA /
MODEL /
LICENSE /
PRIVACY /
SECURITY
REVIEW

↓

RISK
CLASSIFICATION

↓

REQUIRED
APPROVALS

↓

EXPERIMENT

↓

MONITOR

↓

RESULT /
PUBLICATION /
TRANSFER
REVIEW

↓

ARCHIVAL
```

---

# 193. Gate Boundary

Permanent:

```text id="rc193"
COMPLIANCE
GATE
PASS
AT
INTAKE
≠
NO
FUTURE
REVIEW
REQUIRED
```

---

# 194. Compliance Readiness State

Potential:

```text id="rc194"
NOT
ASSESSED

ASSESSMENT
REQUIRED

UNDER
ASSESSMENT

BLOCKED

CONDITIONALLY
READY

READY
FOR
DEFINED
RESEARCH
SCOPE

EXPIRED /
REVIEW
REQUIRED
```

---

# 195. Readiness Boundary

```text id="rc195"
READY
FOR
DEFINED
RESEARCH
≠
READY
FOR
ANY
RESEARCH
```

---

# 196. High-Risk Research

Potential triggers:

```text id="rc196"
SENSITIVE
DATA

HUMAN
PARTICIPANTS

HIGH-
IMPACT
AI

BIOMETRICS

PHYSICAL
AI

EXTERNAL
SIDE
EFFECTS

CROSS-
TENANT
DATA

UNLICENSED /
UNCLEAR
DATA

HIGH-
RISK
SECURITY
RESEARCH

SELF-
MODIFYING
AI

PUBLICATION
OF
SENSITIVE
CAPABILITY
```

---

# 197. High-Risk Boundary

Permanent:

```text id="rc197"
RESEARCH
SCIENTIFICALLY
IMPORTANT
≠
HIGH-
RISK
COMPLIANCE
CONTROLS
MAY
BE
SKIPPED
```

---

# 198. Compliance Exception

An exception permits a specifically bounded deviation from an internal compliance control or policy where the underlying obligation permits it.

It must not be used to override law or an obligation that cannot lawfully be waived.

---

# 199. Exception Boundary

```text id="rc199"
INTERNAL
EXCEPTION
APPROVED
≠
LAW /
CONTRACT
WAIVED
```

---

# 200. Exception Record

```yaml id="rc200"
research_compliance_exception:
  exception_id: required

  control_or_policy_ref: required

  obligation_refs: []

  scope_ref: required

  justification: required

  risk_ref: required

  compensating_control_refs: []

  approver_refs: []

  effective_from: required
  expires_at: required

  review_at: required

  status: required
```

---

# 201. Exception Duration

Exceptions should be time-bounded by default.

---

# 202. Exception Boundary

Permanent:

```text id="rc202"
TEMPORARY
EXCEPTION
≠
PERMANENT
POLICY
CHANGE
```

---

# 203. Exception Expiration

Expired exception should not silently continue.

---

# 204. Expiration Boundary

```text id="rc204"
EXCEPTION
EXPIRED
+
WORKFLOW
STILL
RUNNING
≠
EXCEPTION
STILL
VALID
```

---

# 205. Compensating Controls

Where permitted, alternative controls may mitigate risk.

---

# 206. Compensating Control Boundary

Permanent:

```text id="rc206"
COMPENSATING
CONTROL
EXISTS
≠
ORIGINAL
OBLIGATION
SATISFIED
UNLESS
MAPPING
SUPPORTS
IT
```

---

# 207. Waivers

A legal/contractual waiver should only be treated as valid where issued by an authorized party and legally/contractually effective.

---

# 208. Waiver Boundary

```text id="rc208"
INTERNAL
MANAGER
SAYS
"OK"
≠
EXTERNAL
LEGAL /
CONTRACTUAL
WAIVER
```

---

# 209. Compliance Finding

Potential:

```text id="rc209"
OBSERVATION

MINOR
DEFICIENCY

MATERIAL
DEFICIENCY

CRITICAL
DEFICIENCY

LEGAL
REVIEW
REQUIRED

UNKNOWN
EXPOSURE
```

---

# 210. Finding Record

```yaml id="rc210"
research_compliance_finding:
  finding_id: required

  assessment_ref: required

  obligation_refs: []
  control_refs: []

  severity: required

  description: required

  evidence_refs: []

  affected_project_refs: []
  affected_tenant_refs: []

  remediation_ref: required

  owner_ref: required

  due_at: conditional

  status: required
```

---

# 211. Finding Boundary

Permanent:

```text id="rc211"
FINDING
OPEN
≠
SYSTEM
AUTOMATICALLY
NON-
COMPLIANT
IN
EVERY
SENSE

AND

FINDING
CLOSED
≠
COMPLIANCE
GUARANTEED
FOREVER
```

---

# 212. Remediation

Conceptually:

```text id="rc212"
FINDING

↓

ROOT
CAUSE

↓

REMEDIATION
PLAN

↓

IMPLEMENT

↓

EVIDENCE

↓

RETEST

↓

CLOSE /
REOPEN
```

---

# 213. Remediation Boundary

```text id="rc213"
FIX
DEPLOYED
≠
FINDING
CLOSED
UNTIL
EFFECTIVENESS
VERIFIED
```

---

# 214. Root Cause

Potential:

* missing policy.
* technical failure.
* training gap.
* contract misunderstanding.
* scope drift.
* stale control.
* provider change.

---

# 215. Closure

Closure should record Evidence and reviewer.

---

# 216. Closure Boundary

Permanent:

```text id="rc216"
OWNER
SAYS
"FIXED"
≠
REMEDIATION
VERIFIED
```

---

# 217. Compliance Incident

Potential incident classes:

```text id="rc217"
RCI01
UNAUTHORIZED
DATA
USE

RCI02
PRIVACY
INCIDENT

RCI03
SECURITY
INCIDENT

RCI04
LICENSE
VIOLATION

RCI05
IP
DISCLOSURE

RCI06
CONTRACT
BREACH

RCI07
CROSS-
PROJECT
DATA
USE

RCI08
CROSS-
TENANT
DATA
USE

RCI09
UNAUTHORIZED
PUBLICATION

RCI10
CONSENT
SCOPE
VIOLATION

RCI11
RETENTION /
DELETION
FAILURE

RCI12
PROVIDER
TERMS
CHANGE

RCI13
UNAUTHORIZED
MODEL
USE

RCI14
UNAUTHORIZED
EXTERNAL
EGRESS

RCI15
REGULATORY
OBLIGATION
MISSED
```

---

# 218. Incident Response

Conceptually:

```text id="rc218"
DETECT

↓

CONTAIN

↓

PRESERVE
EVIDENCE

↓

CLASSIFY

↓

IDENTIFY
OBLIGATIONS

↓

ESCALATE

↓

NOTIFY
WHERE
REQUIRED

↓

REMEDIATE

↓

REVALIDATE

↓

LESSONS
LEARNED
```

---

# 219. Notification Boundary

Permanent:

```text id="rc219"
INCIDENT
DETECTED
≠
EXTERNAL
NOTIFICATION
AUTOMATICALLY
REQUIRED

AND

INCIDENT
CONTAINED
≠
EXTERNAL
NOTIFICATION
AUTOMATICALLY
UNNECESSARY
```

Applicable obligations determine notification.

---

# 220. Breach Assessment

A Security event and a legally defined breach may not be identical concepts.

---

# 221. Breach Boundary

```text id="rc221"
SECURITY
EVENT
≠
LEGAL
BREACH
AUTOMATICALLY
```

Qualified assessment may be required.

---

# 222. Incident Evidence

Potential:

* timestamps.
* affected Data.
* affected persons.
* systems.
* Projects.
* Tenants.
* external providers.
* containment.

---

# 223. Non-Retaliation and Escalation

Research personnel should be able to escalate suspected compliance concerns through appropriate channels without improper retaliation, consistent with applicable organizational policies and law.

---

# 224. Escalation Boundary

Permanent:

```text id="rc224"
RESEARCHER
RAISES
COMPLIANCE
CONCERN
≠
RESEARCHER
HAS
PROVEN
VIOLATION
```

Concerns require fair assessment.

---

# 225. Regulatory Change Monitoring

Research Compliance should track material changes that may affect:

* Data.
* AI.
* Security.
* IP.
* contracts.
* cross-border activity.

---

# 226. Change Signal

Potential:

```text id="rc226"
NEW
LAW

NEW
REGULATION

REGULATOR
GUIDANCE

COURT
DECISION

CONTRACT
CHANGE

LICENSE
CHANGE

PROVIDER
TERMS
CHANGE

STANDARD
CHANGE
```

---

# 227. Regulatory Change Boundary

```text id="rc227"
PUBLIC
NEWS
ABOUT
PROPOSED
LAW
≠
CURRENT
LEGAL
OBLIGATION
```

---

# 228. Change Assessment

Conceptually:

```text id="rc228"
CHANGE
SIGNAL

↓

VALIDATE
SOURCE /
STATUS

↓

APPLICABILITY

↓

IMPACT

↓

CONTROL
CHANGE

↓

IMPLEMENTATION

↓

RETEST

↓

EFFECTIVE
DATE
TRACKING
```

---

# 229. Future Law Boundary

Permanent:

```text id="rc229"
PROPOSED
REQUIREMENT
≠
CURRENT
REQUIREMENT
```

However, strategic preparation may still be justified.

---

# 230. Compliance Calendar

Potential:

* control tests.
* license renewals.
* contract reviews.
* privacy reviews.
* exception expirations.
* assessments.

---

# 231. Calendar Boundary

```text id="rc231"
REVIEW
SCHEDULED
≠
REVIEW
COMPLETED
```

---

# 232. Compliance Dashboard

Potential:

```text id="rc232"
OBLIGATIONS

APPLICABILITY
UNKNOWN

CONTROLS

CONTROL
HEALTH

OPEN
FINDINGS

CRITICAL
FINDINGS

EXCEPTIONS

EXCEPTIONS
EXPIRING

LICENSES
EXPIRING

REVIEWS
DUE

INCIDENTS

PROJECT /
TENANT
SCOPE
```

---

# 233. Dashboard Boundary

Permanent:

```text id="rc233"
COMPLIANCE
DASHBOARD
GREEN
≠
LEGAL /
REGULATORY
COMPLIANCE
GUARANTEED
```

---

# 234. Compliance Metrics

Potential:

```text id="rc234"
OBLIGATIONS
WITH
DOCUMENTED
APPLICABILITY

CONTROLS
WITH
CURRENT
EVIDENCE

CONTROLS
TESTED

CONTROL
FAILURES

OPEN
FINDINGS

CRITICAL
FINDINGS

TIME
TO
REMEDIATE

EXCEPTIONS
ACTIVE

EXCEPTIONS
EXPIRED

STALE
LEGAL
REVIEWS

LICENSE
REVIEWS
DUE

PROVIDER
REVIEWS
DUE

COMPLIANCE
INCIDENTS
```

---

# 235. Metric Boundary

```text id="rc235"
ZERO
OPEN
FINDINGS
≠
ZERO
COMPLIANCE
RISK
```

---

# 236. Goodhart Boundary

Permanent:

```text id="rc236"
COMPLIANCE
KPI
GREEN
≠
COMPLIANCE
OBJECTIVE
ACHIEVED
AUTOMATICALLY
```

---

# 237. Audit

Audit should assess selected aspects independently according to defined scope.

---

# 238. Audit Boundary

```text id="rc238"
AUDIT
PASS
≠
EVERY
CONTROL
OR
OBLIGATION
VERIFIED
```

---

# 239. Audit Scope

Audit report should state:

* period.
* scope.
* exclusions.
* methodology.
* findings.
* limitations.

---

# 240. Audit Evidence Boundary

Permanent:

```text id="rc240"
EVIDENCE
PROVIDED
TO
AUDIT
≠
EVIDENCE
COMPLETE
UNLESS
AUDIT
SCOPE /
SAMPLING
SUPPORTS
IT
```

---

# 241. Compliance Documentation

Required documentation may include:

```text id="rc241"
OBLIGATION
REGISTER

APPLICABILITY
MATRIX

CONTROL
MATRIX

DATA
FLOW

LICENSE
REGISTER

PROVIDER
REGISTER

ASSESSMENTS

FINDINGS

EXCEPTIONS

INCIDENTS

EVIDENCE
INDEX

CHANGE
HISTORY
```

---

# 242. Documentation Boundary

```text id="rc242"
DOCUMENT
EXISTS
≠
DOCUMENT
CURRENT /
CORRECT /
IMPLEMENTED
```

---

# 243. Compliance Mapping Matrix

Conceptual:

| Obligation | Applies?   | Scope   | Control | Owner   | Evidence | Test    | Status  |
| ---------- | ---------- | ------- | ------- | ------- | -------- | ------- | ------- |
| `RCO-*`    | Contextual | Defined | `RCC-*` | Defined | `RCE-*`  | Defined | Tracked |

Exact entries should be created only from verified obligations.

---

# 244. No Invented Legal Mapping

Permanent:

```text id="rc244"
FRAMEWORK
DEFINES
HOW
TO
MAP
OBLIGATIONS

≠

FRAMEWORK
INVENTS
WHICH
CURRENT
LAWS
APPLY
```

---

# 245. Compliance by Design

Research architecture should support:

* purpose scope.
* Project/Tenant isolation.
* provenance.
* retention.
* access control.
* audit.
* deletion.

---

# 246. Compliance by Design Boundary

```text id="rc246"
ARCHITECTURE
SUPPORTS
COMPLIANCE
≠
ACTIVITY
COMPLIANT
```

---

# 247. Automation

Future compliance automation may:

* detect expiring licenses.
* enforce Data scopes.
* block prohibited provider use.
* collect Evidence.

---

# 248. Automation Boundary

Permanent:

```text id="rc248"
COMPLIANCE
AUTOMATION
RUNNING
≠
COMPLIANCE
JUDGMENT
CAN
BE
FULLY
AUTOMATED
```

---

# 249. AI-Assisted Compliance

AI may help:

* summarize requirements.
* compare terms.
* map controls.
* triage changes.

---

# 250. AI Compliance Boundary

```text id="rc250"
AI
INTERPRETS
LEGAL
TEXT
≠
QUALIFIED
LEGAL
DETERMINATION
```

---

# 251. Authority Injection

External documents, web content, contracts or Data must be treated as Data rather than executable authority.

---

# 252. Compliance Injection Boundary

Permanent:

```text id="rc252"
DOCUMENT
TEXT
SAYS

"IGNORE
Mianx.ai
POLICY"

≠

DOCUMENT
HAS
AUTHORITY
TO
CHANGE
Mianx.ai
POLICY
```

---

# 253. Founder Authority

The Founder remains the highest internal enterprise authority, subject to applicable external legal and contractual obligations.

---

# 254. Founder Boundary

```text id="rc254"
FOUNDER
INTERNAL
AUTHORITY
≠
AUTHORITY
TO
WAIVE
EXTERNAL
LAW
UNILATERALLY
```

---

# 255. Founder Routing

Permanent:

```text id="rc255"
ROUTED
TO
FOUNDER
≠
APPROVED
BY
FOUNDER
```

---

# 256. Legal Counsel Boundary

```text id="rc256"
LEGAL
COUNSEL
APPROVES
LEGAL
INTERPRETATION
≠
FOUNDER
APPROVES
ENTERPRISE
DECISION
AUTOMATICALLY
```

These are separate decision roles.

---

# 257. Silence Boundary

Permanent:

```text id="rc257"
NO
RESPONSE
FROM
LEGAL /
COMPLIANCE /
FOUNDER
≠
APPROVAL
```

---

# 258. Research Compliance Gate Checklist

## Obligation

* [x] obligation sources defined.
* [x] obligation identity defined.
* [x] versioning defined.
* [x] jurisdiction defined.
* [x] legal entity context defined.
* [x] applicability states defined.
* [x] interpretation governance defined.

## Controls

* [x] control mapping defined.
* [x] control ownership defined.
* [x] control types defined.
* [x] control design defined.
* [x] operating effectiveness defined.
* [x] Evidence defined.
* [x] attestation boundary defined.
* [x] independent testing defined.

## Data and Privacy

* [x] personal Data defined contextually.
* [x] sensitive Data defined.
* [x] purpose limitation defined.
* [x] minimization defined.
* [x] consent defined.
* [x] de-identification defined.
* [x] cross-border handling defined.
* [x] Data residency defined.

## AI Systems

* [x] Dataset compliance defined.
* [x] Model compliance defined.
* [x] Prompt compliance defined.
* [x] Agent compliance defined.
* [x] Multi-Agent compliance defined.
* [x] Tool compliance defined.
* [x] Memory compliance defined.
* [x] Responsible AI defined.
* [x] AI regulation boundary defined.

## Intellectual Property

* [x] copyright defined.
* [x] patents defined.
* [x] trade secrets defined.
* [x] confidentiality defined.
* [x] open source defined.
* [x] dependency licensing defined.
* [x] AI output IP uncertainty defined.

## Collaboration and Publication

* [x] partner agreements defined.
* [x] academic obligations defined.
* [x] publication review defined.
* [x] attribution defined.
* [x] Data-sharing review defined.

## Operations

* [x] retention defined.
* [x] deletion defined.
* [x] backups defined.
* [x] provider due diligence defined.
* [x] incidents defined.
* [x] notification assessment defined.
* [x] regulatory change monitoring defined.

## Governance

* [x] Project scope defined.
* [x] Tenant scope defined.
* [x] compliance inheritance defined.
* [x] segregation of duties defined.
* [x] exceptions defined.
* [x] waivers defined.
* [x] findings defined.
* [x] remediation defined.
* [x] audit defined.
* [x] Founder/legal authority separation defined.
* [x] Runtime Truth defined.

---

# 259. Positive Verification Scenarios

Future Research Compliance capability should verify at least:

```text id="rc259"
RCV-01
OBLIGATION
EXISTS
DOES
NOT
AUTO-
BECOME
APPLICABLE
TO
EVERY
RESEARCH
ACTIVITY

RCV-02
APPLICABILITY
UNKNOWN
DOES
NOT
AUTO-
BECOME
NOT
APPLICABLE

RCV-03
INTERNAL
POLICY
DOES
NOT
AUTO-
BECOME
LAW

RCV-04
CONTROL
DOCUMENTED
DOES
NOT
AUTO-
BECOME
IMPLEMENTED

RCV-05
CONTROL
IMPLEMENTED
DOES
NOT
AUTO-
BECOME
EFFECTIVE

RCV-06
EVIDENCE
EXISTS
DOES
NOT
AUTO-
BECOME
SUFFICIENT
EVIDENCE

RCV-07
CONTROL
OWNER
ATTESTATION
DOES
NOT
AUTO-
BECOME
INDEPENDENT
VERIFICATION

RCV-08
PUBLIC
DATA
DOES
NOT
AUTO-
BECOME
UNRESTRICTED
RESEARCH
DATA

RCV-09
RESEARCH
DATA
AUTHORITY
DOES
NOT
AUTO-
BECOME
PRODUCTION
DATA
AUTHORITY

RCV-10
CONSENT
FOR
PURPOSE A
DOES
NOT
AUTO-
BECOME
CONSENT
FOR
PURPOSE B

RCV-11
"PSEUDONYMIZED"
DOES
NOT
AUTO-
BECOME
"ANONYMOUS"

RCV-12
PROVIDER
CERTIFICATION
DOES
NOT
AUTO-
BECOME
Mianx.ai
COMPLIANCE

RCV-13
DATASET
DOWNLOAD
DOES
NOT
AUTO-
BECOME
USE
AUTHORITY

RCV-14
RESEARCH-
ONLY
DATASET
DOES
NOT
AUTO-
BECOME
PRODUCTION
DATASET

RCV-15
MODEL
AVAILABLE
DOES
NOT
AUTO-
BECOME
LICENSE-
COMPATIBLE

RCV-16
BASE
MODEL
USE
DOES
NOT
AUTO-
BECOME
DERIVATIVE
MODEL
USE
AUTHORITY

RCV-17
OPEN
SOURCE
DOES
NOT
AUTO-
BECOME
NO-
OBLIGATION
SOFTWARE

RCV-18
PARTNER
TRUST
DOES
NOT
AUTO-
REMOVE
CONTRACTUAL
REVIEW

RCV-19
SCIENTIFIC
PUBLICATION
READINESS
DOES
NOT
AUTO-
BECOME
PUBLICATION
CLEARANCE

RCV-20
PROJECT A
COMPLIANCE
ASSESSMENT
DOES
NOT
AUTO-
BECOME
PROJECT B
ASSESSMENT

RCV-21
TENANT A
AUTHORITY
DOES
NOT
AUTO-
BECOME
TENANT B
AUTHORITY

RCV-22
TEMPORARY
EXCEPTION
EXPIRES
WITHOUT
SILENT
PERMANENT
CONTINUATION

RCV-23
FINDING
REMEDIATION
REQUIRES
VERIFICATION
BEFORE
CLOSURE

RCV-24
REGULATORY
CHANGE
SIGNAL
IS
VALIDATED
BEFORE
BECOMING
CURRENT
OBLIGATION

RCV-25
CONTROLLED
RESEARCH
COMPLIANCE
PILOT
DOES
NOT
AUTO-
AUTHORIZE
PRODUCTION
```

---

# 260. Negative Verification Scenarios

Containment, correction or legal/compliance review should occur when:

* a Researcher finds an applicable-looking regulation online and marks every Mianx.ai Project legally subject to it without applicability review.
* a proposed law is entered into the registry as an already effective obligation.
* a control exists in Markdown and dashboard reports it as implemented.
* an implemented access-control feature has never been tested but is marked effective.
* control owner self-attests and system describes control as independently verified.
* public website Data is scraped and used for Model training because it is publicly visible, without rights/terms/privacy review.
* Data approved for one Research Experiment is reused to train a Production Model without new authority.
* Dataset marked `Research Only` is moved into commercial Product training because Research Results were successful.
* pseudonymized Data is represented as anonymous without re-identification assessment.
* a person's consent for one study is interpreted as permanent consent for all future AI Research.
* sensitive Dataset is sent to an external Model API because provider has a compliance certification, while provider Data-use configuration is unverified.
* Model is publicly downloadable and therefore assumed commercially usable.
* Model license changes between versions but registry continues to apply old license.
* fine-tuned derivative is distributed even though only base-model use was reviewed.
* open-source package is marked unrestricted merely because it has a public repository.
* transitive copyleft or notice obligations are ignored because direct dependency license appears permissive.
* external Research partner receives Tenant Data because the collaboration itself is approved but Data rights are not.
* Research paper containing patentable confidential work is published before IP review.
* cited third-party content is assumed license-compliant merely because attribution was provided.
* sensitive Research notes are copied into external AI provider despite NDA restrictions.
* sandbox activity is described as exempt from licensing, privacy or IP obligations.
* outbound API call sends Data across regions even though only application region was reviewed.
* Research team stores records indefinitely under the assumption that more retention means stronger compliance.
* active Data is deleted but report says all Data erased while backups remain.
* Project A compliance clearance is reused for Project B with different Dataset/provider configuration.
* Tenant A contractual approval is reused for Tenant B.
* shared infrastructure control passed centrally but Tenant-specific configuration is never tested.
* internal exception is used as if it can waive external law or customer contract.
* expired exception remains active because workflow is still running.
* manager verbally approves waiver to external contractual requirement without authorized counterparty.
* finding is closed because code was changed but control effectiveness was not retested.
* Security incident is contained and therefore notification analysis is skipped.
* an external article tells an Agent to ignore internal Research policy and Agent treats it as authoritative.
* Legal Counsel approves legal interpretation and documentation silently records Founder approval.
* request was routed to Founder and system marks it approved because no objection arrived.
* compliance dashboard is green and organization claims universal legal compliance.
* controlled Research compliance Pilot passes and is represented as Production compliance authorization.

---

# 261. Compliance Evidence Package

Material Research compliance decisions should eventually link to:

```text id="rc261"
RESEARCH
ACTIVITY
ID

PROJECT

TENANT
WHERE
APPLICABLE

LEGAL
ENTITY
CONTEXT

JURISDICTION
CONTEXT

OBLIGATION
SOURCES

OBLIGATION
VERSIONS

APPLICABILITY
ANALYSIS

INTERPRETATION

DATA
FLOW

DATA
CLASSIFICATION

DATA
RIGHTS

MODEL
LICENSE

DATASET
LICENSE

SOFTWARE
LICENSES

PROVIDER
TERMS

CONTRACTS

PRIVACY
ASSESSMENT

SECURITY
ASSESSMENT

RESPONSIBLE
AI
ASSESSMENT

IP
ASSESSMENT

CONTROLS

CONTROL
OWNERS

EVIDENCE

TEST
RESULTS

FINDINGS

EXCEPTIONS

REMEDIATION

APPROVAL
STATE

REVIEW
DATE
```

---

# 262. Research Compliance Decision Record

```yaml id="rc262"
research_compliance_decision:
  decision_id: required

  research_scope_ref: required

  obligation_refs: []
  applicability_refs: []

  control_refs: []
  evidence_refs: []

  open_finding_refs: []
  exception_refs: []

  legal_review_refs: []
  privacy_review_ref: conditional
  security_review_ref: conditional
  responsible_ai_review_ref: conditional
  ip_review_ref: conditional

  decision: required
  limitations: []

  decision_authority_ref: required

  effective_at: required
  expires_at: conditional

  status: required
```

---

# 263. Compliance Decision States

Potential:

```text id="rc263"
BLOCKED

REVIEW
REQUIRED

CONDITIONALLY
PERMITTED
FOR
DEFINED
RESEARCH

PERMITTED
FOR
DEFINED
RESEARCH

REMEDIATION
REQUIRED

EXPIRED

REVOKED
```

---

# 264. Compliance Decision Boundary

Permanent:

```text id="rc264"
PERMITTED
FOR
DEFINED
RESEARCH
≠
PRODUCTION
AUTHORIZED
```

---

# 265. Compliance HALT

A Research activity may require HALT when:

```text id="rc265"
UNAUTHORIZED
DATA
USE

CRITICAL
LICENSE
ISSUE

TENANT
BOUNDARY
FAILURE

CRITICAL
PRIVACY
RISK

CRITICAL
SECURITY
INCIDENT

INVALID
CONSENT

MISSING
REQUIRED
APPROVAL

EXPIRED
EXCEPTION

UNRESOLVED
LEGAL
PROHIBITION
```

---

# 266. HALT Boundary

```text id="rc266"
COMPLIANCE
HALT
REQUESTED
≠
RESEARCH
HALTED
UNTIL
EXECUTION
VERIFIED
```

---

# 267. HALT Propagation

Verify:

* Experiment Runs.
* Agents.
* child Agents.
* Data pipelines.
* Model requests.
* Tool calls.
* publication processes.
* external transfers.

---

# 268. Post-HALT Reconciliation

Ask:

```text id="rc268"
WHAT
ACTIVITY
OCCURRED?

WHICH
DATA
WAS
USED?

WHICH
DATA
LEFT
BOUNDARIES?

WHICH
MODEL /
PROVIDER
RECEIVED
DATA?

WHAT
OUTPUT
WAS
CREATED?

WHAT
WAS
PUBLISHED /
SHARED?

WHICH
PROJECTS /
TENANTS
WERE
AFFECTED?

WHAT
OBLIGATIONS
MAY
HAVE
BEEN
TRIGGERED?
```

---

# 269. Resume

Resume should require:

```text id="rc269"
ROOT
CAUSE

+

OBLIGATION
REASSESSMENT

+

REMEDIATION

+

EVIDENCE

+

RETEST

+

CURRENT
APPROVALS

+

VALID
RESUME
AUTHORITY
```

---

# 270. Resume Boundary

Permanent:

```text id="rc270"
TECHNICAL
BLOCKER
REMOVED
≠
COMPLIANCE
AUTHORITY
RESTORED
```

---

# 271. Controlled Compliance Pilot

An initial Research Compliance Pilot should prefer:

```text id="rc271"
LIMITED
RESEARCH
PROGRAM

SINGLE
PROJECT

NO
UNCONTROLLED
CROSS-
TENANT
DATA

KNOWN
DATASETS

KNOWN
MODELS

KNOWN
PROVIDERS

OBLIGATION
REGISTER

MANUAL
APPLICABILITY
REVIEW

CONTROL
MATRIX

EVIDENCE
INDEX

FINDING
WORKFLOW

TIME-
BOUNDED
EXCEPTIONS

REGULATORY /
LICENSE
CHANGE
TRACKING

FULL
AUDIT

NO
AUTO-
LEGAL
DETERMINATIONS
```

---

# 272. Pilot Exit Criteria

Verify:

* obligation registry.
* applicability.
* jurisdiction/legal entity context.
* control mappings.
* Evidence.
* control testing.
* Dataset/Model licenses.
* provider review.
* privacy.
* Security.
* Responsible AI.
* Project/Tenant boundaries.
* exceptions.
* findings/remediation.
* incident handling.
* regulatory/license change monitoring.
* auditability.

---

# 273. Pilot Boundary

Permanent:

```text id="rc273"
RESEARCH
COMPLIANCE
PILOT
SUCCESS
≠
PRODUCTION
COMPLIANCE
CONTROL
PLANE
AUTHORIZED
```

---

# 274. Production-Scope Requirements

Before Research outputs, Models, Datasets, Agents or systems move into Production scope, relevant compliance governance should verify:

```text id="rc274"
LEGAL
ENTITY /
JURISDICTION
CONTEXT

APPLICABLE
OBLIGATIONS

DATA
AUTHORITY

DATASET
LICENSE

MODEL
LICENSE

SOFTWARE
LICENSES

PROVIDER
TERMS

CONTRACTS

PRIVACY

SECURITY

RESPONSIBLE
AI

IP

PUBLICATION /
DISCLOSURE
WHERE
RELEVANT

PROJECT
SCOPE

TENANT
SCOPE

CONTROLS

CONTROL
EFFECTIVENESS

OPEN
FINDINGS

EXCEPTIONS

RETENTION /
DELETION

MONITORING

INCIDENT
PROCESS

AUDIT

PRODUCTION
AUTHORIZATION
```

---

# 275. Production Boundary

```text id="rc275"
RESEARCH
COMPLIANCE
CLEARANCE
≠
PRODUCTION
COMPLIANCE
CLEARANCE
```

---

# 276. Research Compliance Maturity Model

Conceptual:

```text id="rc276"
RCM0
=
RESEARCH
COMPLIANCE
FRAMEWORK
DOCUMENTED

RCM1
=
OBLIGATION /
APPLICABILITY /
CONTROL /
EVIDENCE
MODELS
DEFINED

RCM2
=
ASSESSMENT /
FINDING /
EXCEPTION /
INCIDENT /
CHANGE
CONTRACTS
DESIGNED

RCM3
=
CONTROLLED
COMPLIANCE
REGISTRY /
ASSESSMENT
WORKFLOW
IMPLEMENTED

RCM4
=
DATASET /
MODEL /
PROVIDER /
LICENSE /
CONTROL
EVIDENCE
INTEGRATED

RCM5
=
PRIVACY /
SECURITY /
RESPONSIBLE
AI /
IP /
COLLABORATION
INTEGRATED

RCM6
=
PROJECT /
TENANT /
EXCEPTION /
REGULATORY
CHANGE /
HALT
CONTROLS
IMPLEMENTED

RCM7
=
CRITICAL
COMPLIANCE /
AUTHORITY /
ISOLATION /
CONTROL
BOUNDARIES
VERIFIED

RCM8
=
CONTROLLED
RESEARCH
COMPLIANCE
PILOT
VERIFIED

RCM9
=
PRODUCTION-SCOPE
COMPLIANCE
CONTROL
PLANE
SEPARATELY
AUTHORIZED
```

---

# 277. Maturity Boundary

Permanent:

```text id="rc277"
RCM8
≠
RCM9
```

---

# 278. Repository Evidence

The latest supplied VS Code screenshot establishes:

```text id="rc278"
doc/26-research-lab/governance/
├── compliance.md
├── policies.md
└── research-governance.md
```

This document corresponds to the first screenshot-verified file in `governance/`.

The same screenshot additionally establishes the following downstream visible sequences:

```text id="rc279"
doc/26-research-lab/innovation-lab/
├── idea-pipeline.md
├── innovation-framework.md
└── innovation-metrics.md

doc/26-research-lab/knowledge-transfer/
├── best-practices.md
├── internal-training.md
└── research-documentation.md

doc/26-research-lab/llm-research/
├── alignment.md
├── fine-tuning.md
├── llm-benchmarks.md
└── llm-comparisons.md

doc/26-research-lab/market-research/
├── market-analysis.md
├── opportunity-analysis.md
└── user-research.md

doc/26-research-lab/model-evaluation/
├── evaluation-framework.md
├── quality-evaluation.md
└── safety-evaluation.md

doc/26-research-lab/monitoring/
├── audit-logs.md
├── kpi-dashboard.md
└── research-monitoring.md

doc/26-research-lab/patents/
├── innovation-protection.md
├── ip-strategy.md
└── patent-tracking.md

doc/26-research-lab/prompt-research/
├── prompt-benchmarks.md
├── prompt-engineering.md
└── prompt-patterns.md

doc/26-research-lab/prototypes/
├── mvp-guidelines.md
├── prototype-framework.md
└── prototype-validation.md
```

These visible filenames are repository evidence for later sequencing only; their content is not asserted complete by this document.

---

# 279. Screenshot Truth Boundary

Permanent:

```text id="rc280"
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

# 280. Repository Save Boundary

This document is generated for:

```text id="rc281"
doc/26-research-lab/governance/compliance.md
```

Permanent:

```text id="rc282"
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

# 281. Current Documentation Truth

```text id="rc283"
RESEARCH_COMPLIANCE_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 282. Current Runtime Truth

Nothing in this document independently proves implementation of Research Compliance infrastructure.

```text id="rc284"
RESEARCH_COMPLIANCE_OBLIGATION_REGISTRY
=
NOT_PROVEN

COMPLIANCE_APPLICABILITY_RUNTIME
=
NOT_PROVEN

JURISDICTION_MAPPING_RUNTIME
=
NOT_PROVEN

LEGAL_ENTITY_MAPPING_RUNTIME
=
NOT_PROVEN

COMPLIANCE_INTERPRETATION_REGISTRY
=
NOT_PROVEN

RESEARCH_COMPLIANCE_CONTROL_REGISTRY
=
NOT_PROVEN

CONTROL_IMPLEMENTATION_RUNTIME
=
NOT_PROVEN

CONTROL_EFFECTIVENESS_RUNTIME
=
NOT_PROVEN

COMPLIANCE_EVIDENCE_REGISTRY
=
NOT_PROVEN

COMPLIANCE_ASSESSMENT_RUNTIME
=
NOT_PROVEN

COMPLIANCE_FINDING_RUNTIME
=
NOT_PROVEN

COMPLIANCE_REMEDIATION_RUNTIME
=
NOT_PROVEN

COMPLIANCE_EXCEPTION_RUNTIME
=
NOT_PROVEN

COMPLIANCE_WAIVER_RUNTIME
=
NOT_PROVEN

DATA_PRIVACY_COMPLIANCE_RUNTIME
=
NOT_PROVEN

DATASET_LICENSE_RUNTIME
=
NOT_PROVEN

MODEL_LICENSE_RUNTIME
=
NOT_PROVEN

SOFTWARE_LICENSE_RUNTIME
=
NOT_PROVEN

OPEN_SOURCE_COMPLIANCE_RUNTIME
=
NOT_PROVEN

PROVIDER_COMPLIANCE_RUNTIME
=
NOT_PROVEN

CONTRACT_COMPLIANCE_RUNTIME
=
NOT_PROVEN

IP_COMPLIANCE_RUNTIME
=
NOT_PROVEN

PUBLICATION_COMPLIANCE_RUNTIME
=
NOT_PROVEN

HUMAN_PARTICIPANT_COMPLIANCE_RUNTIME
=
NOT_PROVEN

CROSS_BORDER_DATA_COMPLIANCE_RUNTIME
=
NOT_PROVEN

RECORDS_RETENTION_RUNTIME
=
NOT_PROVEN

COMPLIANCE_INCIDENT_RUNTIME
=
NOT_PROVEN

REGULATORY_CHANGE_MONITORING_RUNTIME
=
NOT_PROVEN

COMPLIANCE_PROJECT_SCOPE_ENFORCEMENT
=
NOT_PROVEN

COMPLIANCE_TENANT_SCOPE_ENFORCEMENT
=
NOT_PROVEN

COMPLIANCE_HALT_RUNTIME
=
NOT_PROVEN

COMPLIANCE_AUDIT_RUNTIME
=
NOT_PROVEN

CONTROLLED_RESEARCH_COMPLIANCE_PILOT
=
NOT_PROVEN

PRODUCTION_COMPLIANCE_CONTROL_PLANE
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 283. Approval Truth

```text id="rc285"
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

LEGAL
OPINION
=
NOT
CREATED
BY
THIS
DOCUMENT

REGULATORY
APPROVAL
=
NO
EVIDENCE

CERTIFICATION
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

# 284. Production Hard Stops

Production-scope Research transfer should remain blocked where applicable if:

```text id="rc286"
APPLICABLE
OBLIGATIONS
UNKNOWN

LEGAL
ENTITY
CONTEXT
UNKNOWN
WHERE
REQUIRED

JURISDICTION
UNKNOWN
WHERE
REQUIRED

DATA
AUTHORITY
UNVERIFIED

DATASET
LICENSE
UNVERIFIED

MODEL
LICENSE
UNVERIFIED

SOFTWARE /
OPEN-
SOURCE
LICENSE
UNVERIFIED

PROVIDER
TERMS
UNVERIFIED

CONTRACTUAL
OBLIGATIONS
UNVERIFIED

PRIVACY
UNVERIFIED

SECURITY
UNVERIFIED

RESPONSIBLE
AI
UNVERIFIED

IP
RIGHTS
UNVERIFIED

CONSENT
UNVERIFIED
WHERE
REQUIRED

CROSS-
BORDER
AUTHORITY
UNVERIFIED
WHERE
REQUIRED

PROJECT
SCOPE
UNVERIFIED

TENANT
SCOPE
UNVERIFIED

CONTROL
IMPLEMENTATION
UNVERIFIED

CONTROL
EFFECTIVENESS
UNVERIFIED

CRITICAL
FINDING
OPEN

EXCEPTION
EXPIRED /
INVALID

RECORDS
REQUIREMENTS
UNVERIFIED

INCIDENT
UNRESOLVED

AUDIT
UNVERIFIED
WHERE
REQUIRED

CONTROLLED
PILOT
EVIDENCE
MISSING

PRODUCTION
COMPLIANCE
CLEARANCE
MISSING

PRODUCTION
AUTHORIZATION
MISSING
```

---

# 285. Permanent Research Compliance Invariants

```text id="rc287"
DOCUMENTED
COMPLIANCE
≠
ACHIEVED
COMPLIANCE

THIS
FRAMEWORK
≠
LEGAL
ADVICE

REQUIREMENT
EXISTS
≠
REQUIREMENT
APPLIES
EVERYWHERE

INTERNAL
ASSESSMENT
PASS
≠
CERTIFICATION

CERTIFICATION
≠
UNIVERSAL
COMPLIANCE

INTERNAL
POLICY
≠
LAW

LAW
≠
INTERNAL
POLICY

CURRENT
OBLIGATION
≠
ONLY
HISTORICAL
OBLIGATION

BRAND
≠
LEGAL
ENTITY

UNKNOWN
APPLICABILITY
≠
NOT
APPLICABLE

RESEARCHER
INTERPRETATION
≠
LEGAL
DETERMINATION
WHERE
LEGAL
REVIEW
REQUIRED

CONTROL
DOCUMENTED
≠
CONTROL
IMPLEMENTED

CONTROL
IMPLEMENTED
≠
CONTROL
EFFECTIVE

EVIDENCE
EXISTS
≠
EVIDENCE
SUFFICIENT

LAST
YEAR
CONTROL
PASS
≠
CURRENT
CONTROL
PASS

ATTESTATION
≠
INDEPENDENT
VERIFICATION

ASSESSMENT
PASS
≠
LEGAL
GUARANTEE

OWNER
SELF-
TEST
≠
INDEPENDENT
ASSURANCE

TECHNICAL
ABILITY
TO
HOLD
ALL
ROLES
≠
APPROPRIATE
SEGREGATION
OF
DUTIES

PUBLIC
DATA
≠
UNRESTRICTED
DATA

USEFUL
DATA
≠
REQUIRED
DATA
COLLECTION

PURPOSE A
AUTHORITY
≠
PURPOSE B
AUTHORITY

RESEARCH
DATA
AUTHORITY
≠
PRODUCTION
DATA
AUTHORITY

MODEL
CAN
PROCESS
SENSITIVE
DATA
≠
AUTHORIZED
TO
PROCESS
IT

"ANONYMOUS"
LABEL
≠
ANONYMIZATION
VERIFIED

PSEUDONYMIZED
≠
ANONYMOUS

CONSENT
ONE
PURPOSE
≠
UNLIMITED
AI
CONSENT

CLOUD
REGION
AVAILABLE
≠
CROSS-
BORDER
TRANSFER
AUTHORIZED

SERVICE
REGION
≠
BACKUP /
LOG /
SUBPROCESSOR
RESIDENCY
PROOF

PROVIDER
CERTIFIED
≠
Mianx.ai
USE
COMPLIANT

ENTERPRISE
PLAN
≠
ZERO
PROVIDER
DATA
RETENTION
UNLESS
VERIFIED

DATASET
DOWNLOADABLE
≠
DATASET
USE
AUTHORIZED

RESEARCH-
ONLY
DATASET
≠
PRODUCTION
DATASET

DATASET
TRANSFORMED
≠
SOURCE
OBLIGATIONS
GONE

SYNTHETIC
≠
COMPLIANCE
RISK
FREE

MODEL
AVAILABLE
≠
MODEL
LICENSE
COMPATIBLE

MODEL
NAME
UNCHANGED
≠
TERMS
UNCHANGED

BASE
MODEL
AUTHORIZED
≠
ALL
DERIVATIVE
USES
AUTHORIZED

PROMPT
IS
TEXT
≠
PROMPT
NO
COMPLIANCE
IMPACT

MODEL
COMPLIANT
≠
AGENT
SYSTEM
COMPLIANT

TOOL
AVAILABLE
≠
TOOL
COMPLIANCE
AUTHORIZED

PARENT
AGENT
SCOPE
≠
CHILD
MAY
EXPAND
SCOPE

MEMORY
USEFUL
≠
MEMORY
MAY
BE
RETAINED
FOREVER

AI
REGULATION
EXISTS
SOMEWHERE
≠
SAME
RULE
APPLIES
EVERYWHERE

INTERNAL
RISK
CLASS
≠
LEGAL
RISK
CLASS
UNLESS
MAPPED

LEGAL
MINIMUM
≠
RESPONSIBLE
AI
STANDARD

LEGAL
≠
ETHICAL
AUTOMATICALLY

ETHICAL
≠
LEGAL
AUTOMATICALLY

FAIRNESS
METRIC
PASS
≠
NON-
DISCRIMINATION
COMPLIANCE
PROVEN

BEST
PRACTICE
≠
SPECIFIC
LEGAL
REQUIREMENT
UNLESS
MAPPED

SECURITY
INCIDENT
CONTAINED
≠
NOTIFICATION
OBLIGATIONS
RESOLVED

ACCESS
≠
OWNERSHIP

ONLINE
CONTENT
≠
COPYRIGHT-
FREE

AI
OUTPUT
≠
UNCONDITIONAL
EXCLUSIVE
IP
RIGHTS

SCIENTIFIC
PUBLICATION
READY
≠
IP
CLEARANCE
COMPLETE

INTERNAL
NOTE
≠
SAFE
EXTERNAL
DISCLOSURE

RESEARCH
RELEVANCE
≠
CONFIDENTIAL
DISCLOSURE
AUTHORITY

OPEN
SOURCE
≠
NO
OBLIGATIONS

LICENSE A
ALLOWED
+
LICENSE B
ALLOWED
≠
COMBINATION
COMPATIBLE

DIRECT
DEPENDENCY
LICENSE
CLEAN
≠
TRANSITIVE
TREE
CLEAN

TRUSTED
PARTNER
≠
NO
CONTRACT
REQUIRED

ACADEMIC
PURPOSE
≠
AUTOMATIC
LEGAL /
IP
EXEMPTION

SCIENTIFIC
READY
≠
PUBLICATION
CLEARED

CITATION
≠
LICENSE
COMPLIANCE

ARTIFACT
NO
LONGER
NEEDED
≠
COMPLIANCE
RECORD
DELETABLE

MORE
RETENTION
≠
BETTER
COMPLIANCE

RETENTION
EXPIRED
≠
DELETE
DESPITE
HOLD

ACTIVE
DATA
DELETED
≠
ALL
BACKUPS
DELETED

LAW
ALLOWS
≠
CONTRACT
ALLOWS

CONFLICTING
OBLIGATIONS
≠
CHOOSE
EASIER
ONE

CORE
COMPLIANCE
PASS
≠
INDUSTRY
COMPLIANCE
PASS

PROJECT A
ASSESSMENT
≠
PROJECT B
ASSESSMENT

TENANT A
AUTHORITY
≠
TENANT B
AUTHORITY

SHARED
CONTROL
PASS
≠
ALL
CONFIGURATIONS
VERIFIED

PARENT
COMPLIANT
≠
CHILD
COMPLIANT

SANDBOX
COMPLIANCE
≠
PRODUCTION
COMPLIANCE

SANDBOX
≠
COMPLIANCE-
FREE

API
EGRESS
TECHNICALLY
ALLOWED
≠
DATA
EGRESS
AUTHORIZED

PUBLIC
WEB
CONTENT
≠
UNRESTRICTED
USE

TECHNICALLY
SCRAPABLE
≠
AUTHORIZED
TO
SCRAPE /
REUSE

RESEARCHER
≠
ACCESS
TO
EVERY
ASSET

VIEW
AUTHORITY
≠
REDISTRIBUTION
AUTHORITY

KNOWLEDGE
TRANSFER
≠
RAW
RESTRICTED
DATA
TRANSFER

EVALUATION
DATA
AUTHORITY
≠
TRAINING
DATA
AUTHORITY

PUBLIC
BENCHMARK
≠
UNRESTRICTED
BENCHMARK
CONTENT

COMPLIANCE
INTAKE
PASS
≠
NO
FUTURE
REVIEW

READY
FOR
DEFINED
RESEARCH
≠
READY
FOR
ANY
RESEARCH

HIGH
SCIENTIFIC
VALUE
≠
COMPLIANCE
CONTROLS
SKIPPABLE

INTERNAL
EXCEPTION
≠
EXTERNAL
LAW /
CONTRACT
WAIVER

TEMPORARY
EXCEPTION
≠
PERMANENT
POLICY

EXPIRED
EXCEPTION
≠
VALID
EXCEPTION

COMPENSATING
CONTROL
≠
OBLIGATION
SATISFIED
UNLESS
VALID
MAPPING

MANAGER
"OK"
≠
EXTERNAL
WAIVER

FINDING
OPEN
≠
UNIVERSAL
NON-
COMPLIANCE

FINDING
CLOSED
≠
PERMANENT
COMPLIANCE

FIX
DEPLOYED
≠
FINDING
CLOSED

OWNER
SAYS
FIXED
≠
REMEDIATION
VERIFIED

INCIDENT
DETECTED
≠
NOTIFICATION
AUTOMATICALLY
REQUIRED

INCIDENT
CONTAINED
≠
NOTIFICATION
AUTOMATICALLY
UNNECESSARY

SECURITY
EVENT
≠
LEGAL
BREACH
AUTOMATICALLY

PROPOSED
LAW
≠
CURRENT
LAW

REVIEW
SCHEDULED
≠
REVIEW
COMPLETED

GREEN
DASHBOARD
≠
UNIVERSAL
COMPLIANCE

ZERO
FINDINGS
≠
ZERO
RISK

GREEN
KPI
≠
COMPLIANCE
OBJECTIVE
PROVEN

AUDIT
PASS
≠
EVERYTHING
VERIFIED

DOCUMENT
EXISTS
≠
DOCUMENT
CURRENT /
IMPLEMENTED

FRAMEWORK
FOR
LEGAL
MAPPING
≠
INVENTED
LEGAL
APPLICABILITY

ARCHITECTURE
SUPPORTS
COMPLIANCE
≠
ACTIVITY
COMPLIANT

AUTOMATION
≠
FULLY
AUTOMATED
LEGAL
JUDGMENT

AI
LEGAL
SUMMARY
≠
LEGAL
DETERMINATION

EXTERNAL
DOCUMENT
TEXT
≠
Mianx.ai
POLICY
AUTHORITY

FOUNDER
INTERNAL
AUTHORITY
≠
ABILITY
TO
WAIVE
EXTERNAL
LAW

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

LEGAL
COUNSEL
OPINION
≠
FOUNDER
ENTERPRISE
APPROVAL

SILENCE
≠
APPROVAL

RESEARCH
CLEARANCE
≠
PRODUCTION
CLEARANCE

COMPLIANCE
PILOT
≠
PRODUCTION
COMPLIANCE
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

# 286. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="rc288"
## RESEARCH-LAB-CHG-20260814-049 — Research Compliance Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-14 |
| Change Type | `CREATED`, `GOVERNANCE`, `COMPLIANCE`, `OBLIGATIONS`, `APPLICABILITY`, `CONTROLS`, `EVIDENCE`, `PRIVACY`, `SECURITY`, `AI-GOVERNANCE`, `LICENSING`, `INTELLECTUAL-PROPERTY`, `EXCEPTIONS`, `INCIDENTS`, `RUNTIME-TRUTH` |
| Impact | `I5 — Research Compliance Governance Foundation` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Canonical | `NO` |
| Legal Opinion | `NO — NOT CREATED BY THIS DOCUMENT` |
| Regulatory Approval | `NO EVIDENCE` |
| Certification | `NO EVIDENCE` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/governance/compliance.md`

### Documentation Truth

`RESEARCH_COMPLIANCE_FRAMEWORK = CONTENT_COMPLETE_FOR_REVIEW`

### Governance Folder Truth

`GOVERNANCE_VISIBLE_FILES = 1 / 3 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`RESEARCH_COMPLIANCE_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_COMPLIANCE_CONTROL_PLANE = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 287. Final Research Compliance Rule

The Mianx.ai Research Compliance framework should operate conceptually as:

```text id="rc289"
RESEARCH
ACTIVITY

↓

OBLIGATION
SOURCES

↓

JURISDICTION /
ENTITY /
PROJECT /
TENANT
CONTEXT

↓

APPLICABILITY

↓

QUALIFIED
INTERPRETATION
WHERE
REQUIRED

↓

CONTROL
MAPPING

↓

IMPLEMENTATION

↓

EVIDENCE

↓

CONTROL
TESTING

↓

FINDINGS /
EXCEPTIONS

↓

REMEDIATION

↓

REVALIDATION

↓

REGULATORY /
CONTRACT /
LICENSE
CHANGE
MONITORING

↓

SEPARATE
PRODUCTION
CLEARANCE /
AUTHORIZATION
```

while permanently preserving:

```text id="rc290"
LAW
≠
POLICY

REQUIREMENT
≠
APPLICABILITY

APPLICABILITY
≠
COMPLIANCE

INTERPRETATION
≠
LEGAL
ADVICE
AUTOMATICALLY

CONTROL
DOCUMENTED
≠
CONTROL
IMPLEMENTED

CONTROL
IMPLEMENTED
≠
CONTROL
EFFECTIVE

EVIDENCE
≠
SUFFICIENT
ASSURANCE

ASSESSMENT
PASS
≠
LEGAL
GUARANTEE

CERTIFICATION
≠
UNIVERSAL
COMPLIANCE

PROVIDER
COMPLIANCE
≠
Mianx.ai
COMPLIANCE

DATASET
AVAILABLE
≠
DATASET
AUTHORIZED

MODEL
AVAILABLE
≠
LICENSE
COMPATIBLE

CONSENT
≠
UNLIMITED
USE

PUBLIC
DATA
≠
UNRESTRICTED
DATA

OPEN
SOURCE
≠
NO
OBLIGATIONS

ACADEMIC
USE
≠
COMMERCIAL
USE
AUTHORITY

RESEARCH
PURPOSE
≠
PRODUCTION
PURPOSE

PROJECT
MEMBERSHIP
≠
CROSS-
PROJECT
AUTHORITY

TENANT
IDENTIFIER
≠
TENANT
ISOLATION
VERIFIED

EXCEPTION
≠
POLICY
CHANGE

EXCEPTION
≠
LEGAL
WAIVER

LEGAL
REVIEW
≠
FOUNDER
APPROVAL

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

PILOT
≠
PRODUCTION

DOCUMENTATION
≠
RUNTIME
```

---

# 288. Next Document

The screenshot-verified `governance/` sequence is:

```text id="rc291"
1. compliance.md
2. policies.md
3. research-governance.md
```

`compliance.md` is now content-complete for review in this documentation workflow.

The next verified document should define the complete **Research Lab Policies framework**, including policy hierarchy, policy identity, policy lifecycle, policy authority, Founder and Governance relationships, mandatory versus advisory rules, standards versus procedures versus guidelines, scope, Project/Tenant applicability, role obligations, policy-as-code boundaries, exceptions, waivers, controls, enforcement, policy conflicts, precedence, interpretation, attestations, acknowledgment, training, policy distribution, change management, versioning, effective dates, deprecation, supersession, emergency policy changes, stale policy detection, policy monitoring, AI/Agent policy enforcement, Tool and Data policies, Research Data handling, Security, privacy, Responsible AI, experimentation, publications, collaboration, intellectual property, violations, incidents, disciplinary/escalation boundaries, audit, verification, controlled Pilots, Production policy enforcement, maturity and Runtime Truth.

## NEXT DOCUMENT

```text id="rc292"
doc/26-research-lab/governance/policies.md
```

---