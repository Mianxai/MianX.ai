---

id: RESEARCH-LAB-COLLABORATION-EXTERNAL-PARTNERSHIPS-001
title: Mianx.ai Research Lab Collaboration — External Partnerships
version: 1.0.0
status: Draft

description: Enterprise-grade specification for the Mianx.ai Research Lab External Partnerships framework. This document defines how Mianx.ai should identify, qualify, authorize, structure, govern, secure, operate, review, suspend, terminate and learn from external Research partnerships with universities, laboratories, Research institutes, independent researchers, technology companies, Model providers, Data providers, open-source organizations, standards bodies, industry organizations, clients and other approved external entities. It establishes partner classifications, partnership lifecycle, due diligence, Research mandates, authority boundaries, collaboration scopes, Project and Tenant isolation, Data and Dataset exchange, Data classification, purpose limitation, confidentiality, intellectual property, licensing, publication rights, authorship, funding, conflicts of interest, external researcher identity and access, Tools and APIs, Model access, compute environments, joint Experiments, Benchmarks, Evidence provenance, Counter-Evidence, reproducibility, Security, privacy, ethics, Prompt Injection and Authority Injection, external AI and Agent use, Knowledge Transfer, deliverables, governance forums, audit, incidents, suspension, HALT, Resume, termination, offboarding, retention, deletion, revalidation, metrics, maturity and Runtime Truth. It permanently separates partnership interest from partnership authorization, signed agreement from runtime access, partner reputation from partner trust, collaboration from authority delegation, Data sharing from unrestricted reuse, shared Research from shared Tenant access, joint Experiment success from validated Research, publication acceptance from Mianx.ai canonicalization, external expert opinion from enterprise authority, partner AI output from verified Evidence, funding from influence over Research truth, pilot collaboration from Production authorization, Founder routing from Founder approval, and documentation from implementation, verification or Production authorization.

type: External Research Partnership Framework, Research Collaboration Governance Specification, Partner Access and Data-Sharing Framework, Joint Research Operating Model, External Research Security Model, Runtime Truth Register, Controlled Pilot Boundary, and Production Authorization Boundary

class: Governed target-state External Partnership specification defining how Mianx.ai should conduct Research collaboration with external parties without asserting that any active external Research partnership, signed agreement, partner access runtime, Data-sharing mechanism, joint Research platform, external collaboration portal, Project/Tenant-isolated partner environment or Production partnership capability is currently implemented

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Collaboration
specialization: External Partnerships

parent: doc/26-research-lab/collaboration
path: doc/26-research-lab/collaboration/external-partnerships.md

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
* Research Collaboration Governance
* Legal Governance
* Security Governance
* Privacy Governance
* Data Governance
* Dataset Governance
* Evidence Governance
* Intellectual Property Governance
* Publication Governance
* Procurement Governance
* Finance Governance
* Ethics Governance
* Project Governance
* Tenant Governance
* Access Governance
* Knowledge Governance
* Audit Governance
* Verification Governance
* Production Governance
* Documentation Governance

maintainers:

* Research Collaboration Team
* Research Operations
* Research Program Management
* Research Platform Engineering
* Security Engineering
* Privacy Engineering
* Data Engineering
* Dataset Engineering
* Evidence Engineering
* Legal Operations
* Knowledge Engineering
* Identity and Access Engineering
* Audit and Compliance Engineering
* Verification Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Research Governance
* Research Collaboration Lead
* Legal Governance
* Security Governance
* Privacy Governance
* Data Governance
* Intellectual Property Governance
* Publication Governance
* Finance Governance
* Ethics Governance
* Project Governance
* Tenant Governance
* Knowledge Governance
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
* Research Collaboration Managers
* Research Program Owners
* Legal Teams
* Security Teams
* Privacy Teams
* Data Stewards
* Dataset Stewards
* AI Researchers
* Agent Researchers
* Model Researchers
* External Collaboration Coordinators
* Finance Teams
* Procurement Teams
* Knowledge Engineers
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
* ../academic-research/collaborations.md
* ../academic-research/literature-review.md
* ../academic-research/research-papers.md
* ../benchmarking/benchmark-suite.md
* ../benchmarking/comparison-metrics.md
* ../benchmarking/performance-benchmarks.md
* ../agent-research/agent-behavior.md
* ../agent-research/autonomous-agents.md
* ../agent-research/multi-agent-research.md
* ../ai-research/ai-research.md
* ../ai-research/foundation-models.md
* ../ai-research/multimodal-ai.md
* ../ai-research/reasoning-models.md
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

* ./internal-collaboration.md
* ./open-source.md
* ../datasets/
* ../ethics/
* ../experiments/
* ../governance/
* ../knowledge-transfer/
* ../patents/
* ../publications/
* ../security/
* ../CHANGELOG.md

review_cycle:

* Before Every Material External Research Partnership
* At Every Partnership Scope Change
* At Every Data-Sharing Scope Change
* At Every External Access Change
* At Every Intellectual Property or Licensing Change
* At Every Publication Rights Change
* At Every Material Security or Privacy Change
* At Every Funding or Conflict-of-Interest Change
* At Every Joint Research Program Reauthorization
* At Every Material Partner Incident
* Before Controlled External Collaboration Pilots
* Before Any Production-Connected External Research Access
* Quarterly During Active Strategic Partnerships
* At Partnership Renewal
* At Partnership Termination

## canonical: false

# Mianx.ai Research Lab Collaboration — External Partnerships

> **External Research collaboration can expand the capabilities of Mianx.ai, but no external relationship should create implicit access, authority, trust or ownership.**
>
> A Research partner may contribute:
>
> * expertise;
> * Data;
> * Datasets;
> * Models;
> * Tools;
> * infrastructure;
> * Research methods;
> * Evidence;
> * publications;
> * and independent challenge.
>
> The existence of that contribution does not make the partner an enterprise authority.

---

# 1. Purpose

The External Partnerships framework should allow Mianx.ai to conduct external Research through:

```text id="erp001"
PARTNER
DISCOVERY

↓

QUALIFICATION

↓

DUE
DILIGENCE

↓

RESEARCH
VALUE
ASSESSMENT

↓

RISK /
SECURITY /
LEGAL
ASSESSMENT

↓

PARTNERSHIP
MANDATE

↓

AGREEMENT

↓

CONTROLLED
ONBOARDING

↓

AUTHORIZED
COLLABORATION

↓

EVIDENCE /
DELIVERABLES

↓

REVIEW /
VALIDATION

↓

KNOWLEDGE
TRANSFER

↓

RENEW /
SUSPEND /
TERMINATE
```

while preserving complete enterprise authority boundaries.

---

# 2. Core Partnership Principle

Permanent:

```text id="erp002"
EXTERNAL
COLLABORATION
≠
EXTERNAL
AUTHORITY
OVER
Mianx.ai
```

---

# 3. Partnership Interest Boundary

```text id="erp003"
PARTNERSHIP
DISCUSSION
≠
PARTNERSHIP
AUTHORIZED
```

---

# 4. Agreement Boundary

Permanent:

```text id="erp004"
AGREEMENT
SIGNED
≠
SYSTEM
ACCESS
AUTHORIZED
AUTOMATICALLY
```

---

# 5. Reputation Boundary

```text id="erp005"
PARTNER
REPUTABLE
≠
PARTNER
UNCONDITIONALLY
TRUSTED
```

---

# 6. Shared Research Boundary

Permanent:

```text id="erp006"
JOINT
RESEARCH
≠
SHARED
ACCESS
TO
ALL
Mianx.ai
RESEARCH
```

---

# 7. Data Sharing Boundary

```text id="erp007"
DATA
SHARED
FOR
PURPOSE X
≠
DATA
AUTHORIZED
FOR
PURPOSE Y
```

---

# 8. Production Boundary

Permanent:

```text id="erp008"
PARTNER
SUCCESSFUL
IN
RESEARCH
PILOT
≠
PARTNER
AUTHORIZED
FOR
PRODUCTION
ACCESS
```

---

# 9. External Partnership Objectives

Potential objectives include:

* scientific discovery.
* independent validation.
* capability acceleration.
* specialized expertise.
* Dataset access.
* Benchmark development.
* joint AI Research.
* standards participation.
* publication.
* innovation.
* technology transfer.

---

# 10. Partner Categories

Potential:

```text id="erp010"
EP01
UNIVERSITY

EP02
ACADEMIC
LABORATORY

EP03
RESEARCH
INSTITUTE

EP04
INDEPENDENT
RESEARCHER

EP05
TECHNOLOGY
COMPANY

EP06
MODEL
PROVIDER

EP07
DATA /
DATASET
PROVIDER

EP08
CLOUD /
INFRASTRUCTURE
PROVIDER

EP09
OPEN-SOURCE
ORGANIZATION

EP10
STANDARDS
BODY

EP11
INDUSTRY
ASSOCIATION

EP12
CLIENT /
CUSTOMER
RESEARCH
PARTNER

EP13
CONSORTIUM

EP14
GOVERNMENT /
PUBLIC
RESEARCH
BODY
WHERE
AUTHORIZED
```

---

# 11. Partner Identity

Each external partner should have a stable identity.

```yaml id="erp011"
external_research_partner:
  partner_id: required
  legal_name: required

  partner_type: required

  jurisdiction: required

  primary_contact_ref: required

  research_domains: []

  due_diligence_ref: required

  risk_class: required

  agreement_refs: []

  active_program_refs: []

  status: required
```

---

# 12. Partner Status

Potential:

```text id="erp012"
DISCOVERED

UNDER
REVIEW

QUALIFIED

CONDITIONAL

APPROVED
FOR
DEFINED
SCOPE

ACTIVE

SUSPENDED

TERMINATING

TERMINATED

ARCHIVED
```

---

# 13. Status Boundary

Permanent:

```text id="erp013"
PARTNER
STATUS
=
ACTIVE

≠

PARTNER
AUTHORIZED
FOR
EVERY
RESOURCE
```

---

# 14. Partnership Lifecycle

Target lifecycle:

```text id="erp014"
DISCOVERY

↓

INITIAL
FIT

↓

QUALIFICATION

↓

DUE
DILIGENCE

↓

SCOPE
DESIGN

↓

RISK
ASSESSMENT

↓

AGREEMENT

↓

ACCESS
DESIGN

↓

ONBOARDING

↓

ACTIVE
RESEARCH

↓

REVIEW

↓

TRANSFER /
PUBLICATION

↓

RENEWAL /
SUSPENSION /
TERMINATION
```

---

# 15. Partner Discovery

Partners may be discovered through:

* academic literature.
* Research networks.
* referrals.
* conferences.
* open-source communities.
* vendors.
* strategic partners.
* Technology Radar.

---

# 16. Discovery Boundary

```text id="erp016"
HIGHLY
INTERESTING
PARTNER
≠
QUALIFIED
PARTNER
```

---

# 17. Initial Fit Assessment

Potential factors:

```text id="erp017"
RESEARCH
ALIGNMENT

UNIQUE
EXPERTISE

STRATEGIC
VALUE

METHOD
QUALITY

DATA /
MODEL /
TOOL
CAPABILITY

REPUTATION

COST

SECURITY
POSTURE

LEGAL
COMPATIBILITY

IP
COMPATIBILITY
```

---

# 18. Partner Qualification

Qualification should assess whether collaboration is appropriate for a defined Research purpose.

---

# 19. Qualification Dimensions

Potential:

```text id="erp019"
Q1
DOMAIN
EXPERTISE

Q2
RESEARCH
QUALITY

Q3
INTEGRITY

Q4
REPRODUCIBILITY

Q5
SECURITY

Q6
PRIVACY

Q7
DATA
GOVERNANCE

Q8
LEGAL

Q9
IP

Q10
CONFLICTS

Q11
OPERATIONAL
MATURITY

Q12
STRATEGIC
FIT
```

---

# 20. Qualification Boundary

Permanent:

```text id="erp020"
PARTNER
QUALIFIED
FOR
RESEARCH A
≠
PARTNER
QUALIFIED
FOR
RESEARCH B
```

---

# 21. Due Diligence

Due diligence may include:

* legal identity.
* ownership.
* jurisdiction.
* Research reputation.
* Security posture.
* privacy posture.
* litigation or known disputes where relevant.
* sanctions or prohibited-party checks where applicable.
* IP history.
* conflicts of interest.
* Data-handling capability.

---

# 22. Due Diligence Boundary

```text id="erp022"
DUE
DILIGENCE
COMPLETED
≠
FUTURE
RISK
ELIMINATED
```

---

# 23. Due Diligence Record

```yaml id="erp023"
partner_due_diligence:
  diligence_id: required

  partner_ref: required

  legal_review_ref: required
  security_review_ref: required
  privacy_review_ref: conditional
  data_review_ref: conditional
  ip_review_ref: required

  financial_review_ref: conditional

  conflict_review_ref: required

  findings: []

  risk_class: required

  limitations: []

  reviewed_at: required

  status: required
```

---

# 24. Risk Classification

Potential partnership Research risk:

```text id="erp024"
PR0
MINIMAL

PR1
LOW

PR2
MATERIAL

PR3
HIGH

PR4
CRITICAL
```

Exact semantics defer to Research Governance.

---

# 25. Risk Drivers

Potential:

* sensitive Data.
* customer Data.
* proprietary IP.
* external Models.
* external Tools.
* Production connectivity.
* cross-border transfer.
* publication.
* high-autonomy Agents.
* regulated domain Research.

---

# 26. Risk Boundary

Permanent:

```text id="erp026"
PARTNER
FAMOUS
≠
PARTNERSHIP
LOW
RISK
```

---

# 27. Partnership Mandate

Every active partnership should have a defined mandate.

---

# 28. Partnership Mandate Schema

```yaml id="erp028"
external_partnership_mandate:
  mandate_id: required
  version: required

  partner_ref: required

  purpose: required

  research_scope: required

  organization_id: required
  project_ids: []
  tenant_ids: []

  permitted_data_classes: []
  permitted_dataset_refs: []

  permitted_model_refs: []
  permitted_tool_refs: []

  permitted_environments: []

  external_access_refs: []

  publication_rights_ref: required
  ip_terms_ref: required

  start_at: required
  expires_at: required

  authority_ref: required

  status: required
```

---

# 29. Mandate Boundary

```text id="erp029"
PARTNERSHIP
MANDATE
≠
UNLIMITED
DELEGATION
```

---

# 30. Mandate Expiry

Permanent:

```text id="erp030"
MANDATE
EXPIRED
≠
MANDATE
AUTO-
RENEWED
```

---

# 31. Research Scope

The mandate should explicitly define:

* Research Questions.
* methods.
* expected outputs.
* Data.
* Models.
* Tools.
* systems.
* timeline.
* deliverables.

---

# 32. Scope Boundary

```text id="erp032"
"AI
RESEARCH"
AS
BROAD
TOPIC
≠
SUFFICIENT
ACCESS
SCOPE
```

---

# 33. Authority Model

External partners may receive authority only for explicitly delegated Research activities.

---

# 34. Authority Ceiling

Permanent:

```text id="erp034"
EXTERNAL
PARTNER
AUTHORITY

≤

EXPLICITLY
DELEGATED
PARTNERSHIP
MANDATE
```

---

# 35. Founder Authority Boundary

```text id="erp035"
PARTNER
CLAIMS
FOUNDER
APPROVAL
≠
FOUNDER
APPROVAL
```

unless trusted authority evidence proves it.

---

# 36. Collaboration Agreement

Potential agreement coverage:

* scope.
* confidentiality.
* Data.
* IP.
* publications.
* authorship.
* funding.
* Security.
* privacy.
* termination.
* dispute handling.

---

# 37. Agreement vs Runtime Boundary

Permanent:

```text id="erp037"
CONTRACTUAL
RIGHT
TO
RECEIVE
CERTAIN
DATA

≠

DIRECT
DATABASE
ACCESS
REQUIRED
```

---

# 38. Least Privilege

Prefer the narrowest access mechanism that satisfies Research purpose.

---

# 39. External Identity

Every external Human or machine actor should have a separate identity.

Potential:

```text id="erp039"
PARTNER
RESEARCHER

PARTNER
SERVICE

PARTNER
AGENT

PARTNER
TOOL

PARTNER
API
CLIENT
```

---

# 40. Shared Account Boundary

Permanent:

```text id="erp040"
PARTNER
TEAM
HAS
FIVE
PEOPLE
≠
ONE
SHARED
ACCOUNT
SHOULD
REPRESENT
ALL
PEOPLE
```

---

# 41. Identity Verification

Potential controls:

* verified email/domain.
* institutional identity.
* MFA where appropriate.
* named user.
* service identity.
* expiry.

---

# 42. Access Lifecycle

```text id="erp042"
REQUEST

↓

APPROVAL

↓

PROVISION

↓

USE

↓

REVIEW

↓

EXPIRE /
REVOKE
```

---

# 43. Access Boundary

```text id="erp043"
ACCOUNT
EXISTS
≠
ACCOUNT
CURRENTLY
AUTHORIZED
```

---

# 44. External Access Review

Review when:

* scope changes.
* staff changes.
* program completes.
* incident occurs.
* agreement expires.

---

# 45. Environment Access

Potential:

```text id="erp045"
PARTNER
SANDBOX

CONTROLLED
RESEARCH
ENVIRONMENT

SHARED
NON-
SENSITIVE
COLLABORATION
SPACE

RESTRICTED
DATA
ENVIRONMENT

PRODUCTION-
CONNECTED
ENVIRONMENT
ONLY
IF
SEPARATELY
AUTHORIZED
```

---

# 46. Environment Boundary

Permanent:

```text id="erp046"
PARTNER
HAS
RESEARCH
ENVIRONMENT
ACCESS
≠
PARTNER
HAS
PRODUCTION
ACCESS
```

---

# 47. Partner Sandbox

A partner Sandbox should provide:

* isolated compute.
* bounded storage.
* allowed Tools.
* allowed network.
* defined Data.
* audit.

---

# 48. Sandbox Boundary

```text id="erp048"
ENVIRONMENT
NAMED
SANDBOX
≠
ISOLATION
VERIFIED
```

---

# 49. Data Sharing

Possible transfer patterns:

```text id="erp049"
PUBLIC
DATA

MINIMIZED
DATA

DE-
IDENTIFIED
DATA

SYNTHETIC
DATA

AGGREGATED
DATA

CONTROLLED
RESTRICTED
DATA

NO
RAW
TRANSFER —
REMOTE
ANALYSIS
ONLY
```

---

# 50. Data Minimization Principle

Prefer:

```text id="erp050"
MINIMUM
DATA
NECESSARY

FOR

DEFINED
RESEARCH
PURPOSE
```

---

# 51. Data-Sharing Boundary

Permanent:

```text id="erp051"
MORE
DATA
MAY
IMPROVE
RESEARCH
≠
MORE
DATA
AUTHORIZED
```

---

# 52. Data-Sharing Record

```yaml id="erp052"
partner_data_transfer:
  transfer_id: required

  partner_ref: required

  source_ref: required

  data_classification: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional

  purpose: required

  legal_basis_ref: required
  authorization_ref: required

  destination_ref: required

  retention_terms_ref: required
  deletion_terms_ref: required

  transfer_at: required

  status: required
```

---

# 53. Data Classification

Before sharing:

```text id="erp053"
CLASSIFY

↓

CHECK
PURPOSE

↓

CHECK
PROJECT /
TENANT

↓

CHECK
LEGAL /
PRIVACY

↓

MINIMIZE

↓

TRANSFER
OR
DENY
```

---

# 54. Project Data Boundary

Permanent:

```text id="erp054"
PARTNER
AUTHORIZED
FOR
PROJECT A

≠

PARTNER
AUTHORIZED
FOR
PROJECT B
```

---

# 55. Tenant Data Boundary

```text id="erp055"
PARTNER
WORKS
WITH
TENANT A

≠

PARTNER
MAY
SEE
TENANT B
```

---

# 56. Cross-Project Research

Cross-Project Research requires explicit scope and Data governance.

---

# 57. Cross-Tenant Research

Cross-Tenant aggregation should require separate legal, privacy and governance analysis.

---

# 58. Shared Infrastructure Boundary

Permanent:

```text id="erp058"
PARTNER
USES
SHARED
PLATFORM
≠
PARTNER
CAN
QUERY
ALL
TENANTS
```

---

# 59. Dataset Exchange

Partnership may involve:

* Mianx.ai Dataset to partner.
* partner Dataset to Mianx.ai.
* jointly created Dataset.
* remote Dataset access.

---

# 60. Dataset Intake

Partner Dataset should undergo:

```text id="erp060"
IDENTITY

↓

LICENSE

↓

PROVENANCE

↓

SECURITY
SCAN

↓

PRIVACY
REVIEW

↓

QUALITY
REVIEW

↓

CLASSIFICATION

↓

RESEARCH
REGISTRATION
```

---

# 61. Partner Dataset Boundary

```text id="erp061"
PARTNER
PROVIDES
DATASET
≠
PARTNER
PROVES
DATASET
LEGAL /
ACCURATE /
UNBIASED
```

---

# 62. Joint Dataset Ownership

Joint Dataset creation should define:

* ownership.
* licensing.
* redistribution.
* derivative rights.
* publication.
* retention.
* deletion.

---

# 63. Dataset Derivative Boundary

Permanent:

```text id="erp063"
Mianx.ai
TRANSFORMS
PARTNER
DATASET
≠
ORIGINAL
LICENSE
NO
LONGER
RELEVANT
```

---

# 64. Data Provenance

Every transferred Dataset should preserve source lineage.

---

# 65. Data Retention

Partner Data retention should be bounded by:

* Research need.
* agreement.
* policy.
* legal obligation.
* reproducibility needs.

---

# 66. Retention Boundary

```text id="erp066"
PARTNERSHIP
ENDED
≠
ALL
DATA
MAY
BE
RETAINED
INDEFINITELY
```

---

# 67. Data Deletion

Termination should trigger review of:

* partner copies.
* Mianx.ai copies.
* derived artifacts.
* backups.
* logs.
* Memory.
* search indexes.

---

# 68. Delete Boundary

Permanent:

```text id="erp068"
PARTNER
CONFIRMS
DELETE
≠
DELETE
VERIFIED
AUTOMATICALLY
```

---

# 69. Confidentiality

Confidential information may include:

* source code.
* Research findings.
* Product Roadmaps.
* Data.
* customer information.
* prompts.
* security architecture.
* proprietary Benchmarks.

---

# 70. Confidentiality Boundary

```text id="erp070"
NDA
SIGNED
≠
UNLIMITED
CONFIDENTIAL
DATA
SHARING
```

---

# 71. Intellectual Property

Partnerships should define:

```text id="erp071"
BACKGROUND
IP

PARTNER
BACKGROUND
IP

Mianx.ai
BACKGROUND
IP

FOREGROUND
IP

JOINT
IP

DERIVATIVE
WORKS

LICENSE
RIGHTS

COMMERCIAL
RIGHTS
```

---

# 72. Background IP

Background IP remains separately identifiable from collaboration-created IP.

---

# 73. IP Boundary

Permanent:

```text id="erp073"
PARTNER
USES
Mianx.ai
IP
FOR
RESEARCH
≠
PARTNER
OWNS
Mianx.ai
IP
```

---

# 74. Foreground IP

New inventions, algorithms, Datasets, Benchmarks or methods created during partnership should have defined ownership and licensing rules.

---

# 75. Joint IP Boundary

```text id="erp075"
CO-AUTHORED
RESEARCH
≠
ALL
UNDERLYING
IP
JOINTLY
OWNED
AUTOMATICALLY
```

---

# 76. Patent Considerations

Potential patentable output should be reviewed before public disclosure when appropriate.

---

# 77. Patent Boundary

Permanent:

```text id="erp077"
PARTNER
WANTS
TO
PUBLISH
QUICKLY
≠
IP
REVIEW
MAY
BE
SKIPPED
```

---

# 78. Publication Rights

Agreements should define:

* publication review.
* confidentiality review.
* IP review.
* authorship.
* attribution.
* timing.
* embargoes where permitted.

---

# 79. Publication Boundary

```text id="erp079"
RESEARCH
READY
FOR
ACADEMIC
PUBLICATION
≠
Mianx.ai
AUTHORIZED
TO
DISCLOSE
ALL
SUPPORTING
MATERIAL
```

---

# 80. Authorship

Authorship should reflect actual contribution and applicable publication standards.

---

# 81. Attribution Boundary

Permanent:

```text id="erp081"
PARTNER
FUNDED
WORK
≠
PARTNER
AUTOMATICALLY
QUALIFIES
AS
AUTHOR
```

---

# 82. Funding

External Research may involve:

* Mianx.ai-funded work.
* partner-funded work.
* shared funding.
* grants.
* in-kind compute/Data.

---

# 83. Funding Record

```yaml id="erp083"
research_partnership_funding:
  funding_id: required

  partnership_ref: required

  source_refs: []

  funding_type: required

  amount_or_value_ref: conditional

  restrictions: []

  conflict_disclosure_refs: []

  reporting_requirements: []

  status: required
```

---

# 84. Funding Boundary

Permanent:

```text id="erp084"
PARTNER
FUNDS
RESEARCH
≠
PARTNER
CONTROLS
RESEARCH
TRUTH
```

---

# 85. Conflict of Interest

Potential conflicts:

* financial.
* ownership.
* publication.
* vendor relationship.
* employment.
* competitive interest.
* academic incentive.

---

# 86. Conflict Disclosure

Conflicts should be disclosed and assessed.

---

# 87. Conflict Boundary

```text id="erp087"
CONFLICT
DISCLOSED
≠
CONFLICT
ELIMINATED
```

---

# 88. Research Independence

Research conclusions should be evidence-driven despite partner commercial or institutional interests.

---

# 89. Partner Influence Boundary

Permanent:

```text id="erp089"
PARTNER
DISAGREES
WITH
RESULT
≠
RESULT
MAY
BE
CHANGED
WITHOUT
EVIDENCE
```

---

# 90. Joint Research Program

Potential structure:

```text id="erp090"
JOINT
QUESTION

↓

JOINT
PLAN

↓

SEPARATE
AUTHORITY
BOUNDARIES

↓

CONTROLLED
DATA /
TOOLS /
MODELS

↓

JOINT
EXPERIMENTS

↓

EVIDENCE

↓

INDEPENDENT
REVIEW

↓

CONCLUSION
```

---

# 91. Joint Research Program Schema

```yaml id="erp091"
joint_research_program:
  program_id: required
  version: required

  mianx_owner_ref: required
  partner_owner_ref: required

  partnership_ref: required

  research_question_refs: []

  method_refs: []

  organization_id: required
  project_ids: []
  tenant_ids: []

  dataset_refs: []
  model_refs: []
  tool_refs: []

  deliverables: []

  publication_ref: conditional

  funding_ref: conditional

  authorization_ref: required

  status: required
```

---

# 92. Joint Experiment

Joint Experiments should preserve:

* subject configuration.
* Dataset.
* partner contribution.
* environment.
* provenance.
* Result ownership.

---

# 93. Joint Experiment Boundary

Permanent:

```text id="erp093"
PARTNER
REPRODUCES
RESULT
≠
RESULT
INDEPENDENTLY
REPLICATED
IF
SAME
SHARED
PIPELINE /
DATA /
ASSUMPTIONS
USED
```

---

# 94. Independent Replication

Where feasible, independent execution can strengthen Evidence.

---

# 95. Evidence Contributions

Partner Evidence should be registered with:

* source.
* provenance.
* methods.
* conflicts.
* Data.
* uncertainty.

---

# 96. Partner Evidence Boundary

```text id="erp096"
PARTNER
EXPERT
OPINION
≠
VALIDATED
EVIDENCE
AUTOMATICALLY
```

---

# 97. Counter-Evidence

Partner relationships must not suppress contradictory Evidence.

---

# 98. Counter-Evidence Invariant

Permanent:

```text id="erp098"
COUNTER-
EVIDENCE
THREATENS
PARTNERSHIP
COMMERCIAL
GOAL
≠
COUNTER-
EVIDENCE
MAY
BE
REMOVED
```

---

# 99. External Models

Partners may provide Models or Model access.

---

# 100. External Model Review

Assess:

* provider.
* Model version.
* Data handling.
* retention.
* training use.
* licenses.
* Security.
* output risk.

---

# 101. External Model Boundary

```text id="erp101"
PARTNER
MODEL
PERFORMS
WELL
≠
Mianx.ai
DATA
AUTHORIZED
FOR
THAT
MODEL
```

---

# 102. External AI Agents

Partner-controlled Agents should be treated as external machine identities.

---

# 103. External Agent Boundary

Permanent:

```text id="erp103"
PARTNER
AGENT
ACTS
ON
BEHALF
OF
PARTNER
≠
PARTNER
AGENT
HAS
Mianx.ai
EMPLOYEE /
FOUNDER
AUTHORITY
```

---

# 104. External Agent Requirements

Potential:

* named service identity.
* scoped mandate.
* approved Model.
* approved Tools.
* bounded Data.
* audit.
* expiry.
* HALT support where applicable.

---

# 105. External AI Output

Partner AI-generated analyses should be treated as unverified Research inputs until validated.

---

# 106. AI Output Boundary

```text id="erp106"
PARTNER
AI
SAYS
CLAIM
TRUE
≠
CLAIM
VALIDATED
```

---

# 107. Tool Access

External partners may need:

* Research APIs.
* Dataset APIs.
* Benchmark tools.
* collaboration environments.
* repositories.

---

# 108. Tool Access Boundary

Permanent:

```text id="erp108"
PARTNER
NEEDS
TOOL
FOR
RESEARCH
≠
PARTNER
NEEDS
ADMIN
TOOL
ROLE
```

---

# 109. API Access

API access should define:

* identity.
* endpoint.
* action.
* rate limit.
* Data scope.
* expiry.
* audit.

---

# 110. API Boundary

```text id="erp110"
PARTNER
API
KEY
VALID
≠
EVERY
API
ACTION
AUTHORIZED
```

---

# 111. External Code

Partner code should be treated as untrusted until reviewed or isolated.

---

# 112. Code Execution Boundary

Permanent:

```text id="erp112"
PARTNER
REPOSITORY
FROM
KNOWN
UNIVERSITY /
COMPANY
≠
CODE
SAFE
TO
RUN
WITH
TRUSTED
CREDENTIALS
```

---

# 113. Software Supply Chain

Potential concerns:

* dependencies.
* containers.
* packages.
* build scripts.
* pre-trained Model artifacts.
* binary tools.

---

# 114. External File Intake

Files may include:

* papers.
* Datasets.
* source code.
* Models.
* images.
* documents.
* archives.

---

# 115. File Intake Flow

```text id="erp115"
PARTNER
FILE

↓

QUARANTINE

↓

TYPE /
SIZE
CHECK

↓

SECURITY
SCAN

↓

CONTENT
CLASSIFICATION

↓

PURPOSE
CHECK

↓

CONTROLLED
RESEARCH
USE
```

---

# 116. File Boundary

```text id="erp116"
MALWARE
SCAN
PASS
≠
CONTENT
TRUSTED
```

---

# 117. Prompt Injection

External documents, webpages, repositories and Tool outputs may contain malicious instructions.

---

# 118. Prompt Injection Boundary

Permanent:

```text id="erp118"
PARTNER
DOCUMENT
CONTAINS
"IGNORE
Mianx.ai
POLICY"
≠
Mianx.ai
POLICY
CHANGES
```

---

# 119. Authority Injection

External content may claim:

* Founder approved.
* admin approved.
* legal approved.
* security approved.

Such statements remain Data unless backed by trusted authority records.

---

# 120. Authority Injection Boundary

```text id="erp120"
EXTERNAL
CONTENT
CLAIMS
AUTHORITY
≠
AUTHORITY
```

---

# 121. Security Architecture

External collaboration Security should include:

```text id="erp121"
IDENTITY

LEAST
PRIVILEGE

PROJECT /
TENANT
SCOPE

NETWORK
CONTROL

DATA
CONTROL

TOOL
CONTROL

EGRESS

SECRETS

LOGGING

AUDIT

INCIDENT
RESPONSE
```

---

# 122. Network Access

Partner network access should be limited to required services.

---

# 123. Network Boundary

Permanent:

```text id="erp123"
VPN /
PRIVATE
NETWORK
ACCESS
≠
INTERNAL
SYSTEM
AUTHORITY
```

---

# 124. Secrets

Partners should not receive raw secrets unless explicitly necessary and governed.

Prefer:

```text id="erp124"
SCOPED
SERVICE
ACCESS

OVER

RAW
SECRET
DISTRIBUTION
```

---

# 125. Secret Boundary

```text id="erp125"
PARTNER
NEEDS
API
USE
≠
PARTNER
NEEDS
Mianx.ai
MASTER
API
KEY
```

---

# 126. Egress

Partner-connected Research may create new external egress paths.

---

# 127. Egress Boundary

Permanent:

```text id="erp127"
PARTNER
TOOL
CAN
SEND
DATA
EXTERNALLY
≠
DATA
EGRESS
AUTHORIZED
```

---

# 128. Privacy

Research involving personal Data should establish:

* purpose.
* minimization.
* legal basis.
* retention.
* recipient.
* jurisdiction.
* safeguards.

---

# 129. De-Identification Boundary

```text id="erp129"
DATA
DE-
IDENTIFIED
≠
RE-
IDENTIFICATION
IMPOSSIBLE
```

---

# 130. Ethics

External Research should observe Mianx.ai ethical boundaries.

Potential:

* Human-impacting AI.
* bias.
* manipulation.
* sensitive inference.
* autonomous decision Research.
* surveillance-like capability.

---

# 131. Ethics Boundary

Permanent:

```text id="erp131"
PARTNER
ETHICS
APPROVAL
≠
Mianx.ai
ETHICS /
GOVERNANCE
APPROVAL
```

---

# 132. Jurisdiction

Cross-border collaboration may change:

* privacy obligations.
* Data localization.
* contract terms.
* export restrictions.
* Research permissions.

---

# 133. Jurisdiction Boundary

```text id="erp133"
INTERNET
TRANSFER
TECHNICALLY
POSSIBLE
≠
CROSS-
BORDER
TRANSFER
AUTHORIZED
```

---

# 134. External Compute

Partners may provide:

* cloud credits.
* GPU clusters.
* hosted Model access.
* laboratory compute.

---

# 135. Compute Boundary

Permanent:

```text id="erp135"
PARTNER
COMPUTE
FREE /
CHEAP
≠
Mianx.ai
DATA
AUTHORIZED
TO
RUN
THERE
```

---

# 136. Joint Benchmarks

Partners may jointly design Benchmarks.

---

# 137. Benchmark Independence

A Benchmark designed by a vendor whose Model is evaluated may create conflict risk.

---

# 138. Benchmark Conflict Boundary

```text id="erp138"
PARTNER
DESIGNED
BENCHMARK
≠
BENCHMARK
INVALID

BUT

CONFLICT
MUST
BE
DISCLOSED /
MANAGED
```

---

# 139. Benchmark Data Sharing

Protected holdout Benchmark cases should not be exposed unnecessarily.

---

# 140. Deliverables

Potential partnership deliverables:

```text id="erp140"
RESEARCH
REPORT

DATASET

BENCHMARK

PROTOTYPE

MODEL
EVALUATION

ALGORITHM

PAPER

PATENT
CANDIDATE

TECHNOLOGY
TRANSFER

KNOWLEDGE
PACKAGE
```

---

# 141. Deliverable Acceptance

Mianx.ai should independently review external deliverables.

---

# 142. Acceptance Boundary

Permanent:

```text id="erp142"
PARTNER
DELIVERS
CONTRACTUAL
OUTPUT
≠
OUTPUT
TECHNICALLY
VALIDATED
```

---

# 143. Knowledge Transfer

Validated partner Research may become a Transfer Candidate.

---

# 144. Transfer Flow

```text id="erp144"
PARTNER
DELIVERABLE

↓

Mianx.ai
REVIEW

↓

EVIDENCE
VALIDATION

↓

LIMITATION /
COUNTER-
EVIDENCE
ASSESSMENT

↓

TRANSFER
CANDIDATE

↓

DESTINATION
GOVERNANCE
```

---

# 145. Knowledge Boundary

Permanent:

```text id="erp145"
PARTNER
RESEARCH
VALIDATED
≠
Mianx.ai
CANONICAL
KNOWLEDGE
AUTOMATICALLY
```

---

# 146. Memory Boundary

```text id="erp146"
PARTNER
INFORMATION
STORED
IN
MEMORY
≠
PARTNER
CLAIM
BECOMES
ENTERPRISE
AUTHORITY
```

---

# 147. Governance Forum

Strategic partnerships may use a joint governance forum.

Potential participants:

* Mianx.ai Research owner.
* partner Research owner.
* Legal.
* Security.
* Data/Privacy.
* program leads.

---

# 148. Governance Forum Authority

A joint forum can coordinate collaboration but does not override Mianx.ai Founder/Enterprise authority.

---

# 149. Forum Boundary

Permanent:

```text id="erp149"
JOINT
STEERING
COMMITTEE
AGREES

≠

Mianx.ai
FOUNDER
APPROVAL
WHERE
FOUNDER
APPROVAL
REQUIRED
```

---

# 150. Partnership Decision Record

```yaml id="erp150"
partnership_decision:
  decision_id: required

  partnership_ref: required

  decision_type: required

  decision: required

  rationale: required

  evidence_refs: []

  mianx_authority_ref: required

  partner_ack_ref: conditional

  decided_at: required
```

---

# 151. Change Control

Material changes requiring review may include:

* new Data class.
* new Dataset.
* new Tool.
* new Model.
* new publication.
* new Project.
* new Tenant.
* new environment.
* new jurisdiction.

---

# 152. Change Boundary

```text id="erp152"
PARTNERSHIP
ACTIVE
≠
SCOPE
MAY
EXPAND
WITHOUT
REVIEW
```

---

# 153. Communication Channels

Use approved channels for:

* Research discussion.
* Data exchange.
* deliverables.
* incident reporting.
* approvals.

---

# 154. Informal Communication Boundary

Permanent:

```text id="erp154"
PARTNER
SAYS
"APPROVED"
IN
CHAT
≠
Mianx.ai
GOVERNANCE
APPROVAL
```

---

# 155. Research Records

Material collaboration records should preserve:

* decisions.
* Evidence.
* source provenance.
* approvals.
* Data transfers.
* access.
* deliverables.
* incidents.

---

# 156. Audit

Potential audit events:

```text id="erp156"
PARTNER
ONBOARDED

ACCESS
GRANTED

ACCESS
REVOKED

DATA
TRANSFERRED

DATASET
INGESTED

TOOL
USED

SCOPE
CHANGED

PUBLICATION
AUTHORIZED

INCIDENT
OPENED

PARTNERSHIP
SUSPENDED

PARTNERSHIP
TERMINATED
```

---

# 157. Audit Boundary

```text id="erp157"
PARTNER
ACTIVITY
LOGGED
≠
PARTNER
ACTIVITY
AUTHORIZED
```

---

# 158. Collaboration Metrics

Potential:

```text id="erp158"
ACTIVE
PARTNERSHIPS

RESEARCH
PROGRAMS

VALIDATED
FINDINGS

REPLICATION
RATE

TRANSFER
ACCEPTANCE

PUBLICATIONS

DATASET
CONTRIBUTIONS

BENCHMARK
CONTRIBUTIONS

INCIDENTS

ACCESS
VIOLATIONS

PROJECT /
TENANT
VIOLATIONS

CYCLE
TIME

COST
```

---

# 159. Metric Boundary

Permanent:

```text id="erp159"
MORE
PARTNERSHIPS
≠
BETTER
RESEARCH
PROGRAM
```

---

# 160. Partnership Value

Value may include:

* unique expertise.
* Research quality.
* accelerated discovery.
* independent validation.
* useful IP.
* transferable Knowledge.

---

# 161. Partnership Value Boundary

```text id="erp161"
PARTNERSHIP
GENERATES
MANY
DELIVERABLES
≠
PARTNERSHIP
GENERATES
HIGH
VALUE
```

---

# 162. Incident Categories

Potential:

```text id="erp162"
PI01
UNAUTHORIZED
ACCESS

PI02
DATA
EXPOSURE

PI03
PROJECT
SCOPE
VIOLATION

PI04
TENANT
SCOPE
VIOLATION

PI05
SECRET
EXPOSURE

PI06
MALICIOUS
CODE

PI07
PROMPT
INJECTION

PI08
AUTHORITY
INJECTION

PI09
IP
VIOLATION

PI10
CONFIDENTIALITY
BREACH

PI11
PUBLICATION
BREACH

PI12
UNAUTHORIZED
EGRESS

PI13
RESEARCH
INTEGRITY
ISSUE
```

---

# 163. Incident Response

Potential:

```text id="erp163"
DETECT

↓

CONTAIN

↓

SUSPEND
ACCESS
WHERE
NEEDED

↓

HALT
RESEARCH

↓

PRESERVE
EVIDENCE

↓

INVESTIGATE

↓

NOTIFY
REQUIRED
PARTIES

↓

REMEDIATE

↓

REAUTHORIZE
OR
TERMINATE
```

---

# 164. Incident Boundary

Permanent:

```text id="erp164"
PARTNER
REPORTS
ISSUE
FIXED
≠
Mianx.ai
VERIFICATION
COMPLETE
```

---

# 165. Suspension

Partnership or access may be suspended due to:

* incident.
* policy breach.
* expired agreement.
* unresolved Security issue.
* material scope dispute.
* Research integrity concern.

---

# 166. Suspension Boundary

```text id="erp166"
PARTNERSHIP
SUSPENDED
≠
PARTNERSHIP
TERMINATED
```

---

# 167. HALT

HALT may apply to:

```text id="erp167"
PARTNER
ACCESS

JOINT
EXPERIMENT

DATA
TRANSFER

EXTERNAL
AGENT

TOOL
ACCESS

PUBLICATION

EGRESS
```

---

# 168. HALT Boundary

Permanent:

```text id="erp168"
HALT
ISSUED
≠
ALL
PARTNER
ACTIVITY
STOPPED
UNTIL
VERIFIED
```

---

# 169. Post-HALT Reconciliation

Verify:

* active sessions.
* credentials.
* tokens.
* queued jobs.
* external compute.
* Data transfers.
* partner Agents.
* Tool calls.
* publication pipelines.

---

# 170. Resume

Resume requires:

```text id="erp170"
CAUSE
UNDERSTOOD

+

RISK
REASSESSED

+

ACCESS
REVALIDATED

+

AGREEMENT
VALID

+

AUTHORITY
VALID
```

---

# 171. Resume Boundary

```text id="erp171"
PARTNER
READY
TO
CONTINUE
≠
Mianx.ai
RESUME
AUTHORIZED
```

---

# 172. Partnership Renewal

Renewal should re-evaluate:

* value.
* risk.
* scope.
* Data.
* access.
* IP.
* cost.
* incidents.
* strategic fit.

---

# 173. Renewal Boundary

Permanent:

```text id="erp173"
PARTNERSHIP
SUCCESSFUL
LAST
YEAR
≠
PARTNERSHIP
AUTO-
RENEWED
```

---

# 174. Termination

Termination may result from:

* completion.
* strategic change.
* breach.
* Security issue.
* low value.
* conflict.
* agreement expiry.

---

# 175. Termination Plan

Should cover:

```text id="erp175"
ACCESS
REVOCATION

CREDENTIAL
REVOCATION

DATA
RETURN /
DELETION

ARTIFACT
OWNERSHIP

IP

PUBLICATION

FINAL
DELIVERABLES

AUDIT

KNOWLEDGE
RETENTION
```

---

# 176. Offboarding

External identities should be removed or disabled after required work ends.

---

# 177. Offboarding Boundary

Permanent:

```text id="erp177"
PARTNER
CONTRACT
ENDED
≠
ALL
ACCESS
REVOKED
AUTOMATICALLY
```

Verification is required.

---

# 178. Data Return/Deletion

Partner should return, delete or retain Data according to agreement and policy.

---

# 179. Termination Evidence

Potential:

* access revoked.
* tokens revoked.
* Data disposition verified.
* repositories archived.
* open incidents closed.
* ownership settled.

---

# 180. Research Continuity

Mianx.ai should avoid critical dependency on one external partner where reasonable.

---

# 181. Dependency Boundary

```text id="erp181"
PARTNER
UNIQUELY
VALUABLE
≠
Mianx.ai
SHOULD
HAVE
NO
EXIT
PLAN
```

---

# 182. Vendor Lock-In

Potential risks:

* proprietary Model API.
* proprietary Dataset.
* non-portable tooling.
* exclusive licensing.
* unique Research infrastructure.

---

# 183. Portability

Where strategically important, partnership outputs should be transferable to Mianx.ai-controlled systems.

---

# 184. Portability Boundary

Permanent:

```text id="erp184"
PARTNER
PROVIDES
API
≠
Mianx.ai
OWNS
PORTABLE
CAPABILITY
```

---

# 185. Independent Verification

High-impact external findings should receive Mianx.ai review or independent validation appropriate to risk.

---

# 186. Independence Boundary

```text id="erp186"
PARTNER
VALIDATES
OWN
MODEL
≠
INDEPENDENT
VALIDATION
```

---

# 187. Collaboration Checklists

## Partner Qualification

* [x] legal identity defined.
* [x] Research fit defined.
* [x] due diligence defined.
* [x] Security review defined.
* [x] privacy review defined.
* [x] conflict review defined.
* [x] IP review defined.
* [x] risk classification defined.

## Mandate

* [x] purpose defined.
* [x] Research scope defined.
* [x] Project scope defined.
* [x] Tenant scope defined.
* [x] Data classes defined.
* [x] Models defined.
* [x] Tools defined.
* [x] environments defined.
* [x] expiry defined.

## Data

* [x] Data minimization defined.
* [x] Dataset exchange defined.
* [x] provenance defined.
* [x] retention defined.
* [x] deletion defined.
* [x] cross-Project boundary defined.
* [x] cross-Tenant boundary defined.

## IP / Publication

* [x] background IP defined.
* [x] foreground IP defined.
* [x] joint IP defined.
* [x] patent review defined.
* [x] publication review defined.
* [x] authorship defined.

## Access

* [x] external identity defined.
* [x] least privilege defined.
* [x] access lifecycle defined.
* [x] Sandbox defined.
* [x] API access defined.
* [x] Tool access defined.
* [x] secrets boundary defined.

## AI / Security

* [x] external Models defined.
* [x] external Agents defined.
* [x] untrusted code defined.
* [x] Prompt Injection defined.
* [x] Authority Injection defined.
* [x] egress defined.
* [x] Security incident model defined.

## Operations

* [x] deliverables defined.
* [x] Knowledge Transfer defined.
* [x] audit defined.
* [x] metrics defined.
* [x] suspension defined.
* [x] HALT defined.
* [x] Resume defined.
* [x] renewal defined.
* [x] termination defined.
* [x] offboarding defined.

---

# 188. Positive Verification Scenarios

Future External Partnership capability should verify at least:

```text id="erp188"
EPV-01
PARTNER
HAS
STABLE
IDENTITY

EPV-02
DUE
DILIGENCE
LINKED
TO
PARTNER

EPV-03
PARTNERSHIP
MANDATE
HAS
DEFINED
EXPIRY

EPV-04
ACTIVE
PARTNER
CANNOT
ACCESS
RESOURCES
OUTSIDE
MANDATE

EPV-05
PARTNER
ACCESS
REQUIRES
INDIVIDUAL /
SERVICE
IDENTITY

EPV-06
PARTNER
PROJECT A
ACCESS
DOES
NOT
CREATE
PROJECT B
ACCESS

EPV-07
TENANT A
PARTNERSHIP
DOES
NOT
CREATE
TENANT B
ACCESS

EPV-08
MISSING
PROJECT /
TENANT
SCOPE
DOES
NOT
BECOME
GLOBAL

EPV-09
DATA
TRANSFER
REQUIRES
PURPOSE
AND
AUTHORITY

EPV-10
PARTNER
DATASET
UNDERGOES
PROVENANCE /
SECURITY /
LICENSE
REVIEW

EPV-11
EXTERNAL
MODEL
DATA
POLICY
CHECKED
BEFORE
USE

EPV-12
PARTNER
AGENT
CANNOT
INHERIT
Mianx.ai
HUMAN
AUTHORITY

EPV-13
PARTNER
TOOL
DOES
NOT
RECEIVE
UNNECESSARY
RAW
SECRETS

EPV-14
EXTERNAL
DOCUMENT
PROMPT
INJECTION
DOES
NOT
CHANGE
SYSTEM
POLICY

EPV-15
EXTERNAL
CLAIM
OF
FOUNDER
APPROVAL
DOES
NOT
CREATE
AUTHORITY

EPV-16
PARTNER
DELIVERABLE
DOES
NOT
AUTO-
BECOME
VALIDATED
RESEARCH

EPV-17
PARTNER
FUNDING
DOES
NOT
ALLOW
RESULT
OVERRIDE

EPV-18
COUNTER-
EVIDENCE
PRESERVED
DESPITE
PARTNER
DISAGREEMENT

EPV-19
JOINT
PUBLICATION
REQUIRES
IP /
SECURITY /
CONFIDENTIALITY
REVIEW

EPV-20
PARTNER
ACCESS
EXPIRY
REVOKES
OR
BLOCKS
ACCESS
AS
DESIGNED

EPV-21
HALT
PROPAGATES
TO
SCOPED
PARTNER
ACCESS /
JOBS

EPV-22
POST-HALT
TOKENS /
SESSIONS /
EXTERNAL
JOBS
RECONCILED

EPV-23
RESUME
REQUIRES
CURRENT
AUTHORITY

EPV-24
TERMINATION
TRIGGERS
ACCESS
AND
DATA
DISPOSITION
VERIFICATION

EPV-25
SUCCESSFUL
PARTNERSHIP
PILOT
DOES
NOT
AUTO-
AUTHORIZE
PRODUCTION
ACCESS
```

---

# 189. Negative Verification Scenarios

Containment or correction should occur when:

* partner signs NDA and is automatically given broad Research Lab access.
* university researcher uses one shared login with entire lab.
* Project A Dataset is shared because partner was previously approved for another Project.
* Tenant A Data is included in cross-Tenant Research without explicit scope.
* partner Dataset is used without license/provenance review.
* partner Model receives confidential Mianx.ai Data despite incompatible provider Data policy.
* external Agent receives internal administrator credentials.
* partner PDF says Founder approved direct Production access and Agent follows the instruction.
* partner code executes with trusted credentials outside controlled environment.
* partner uses Research API key to call endpoints outside granted scope.
* commercial sponsor asks to remove unfavorable Research Result and report is silently changed.
* partner-created Benchmark is treated as independently neutral without conflict disclosure.
* joint paper is published before IP/confidentiality review.
* partnership expires but access tokens remain valid.
* incident is marked resolved solely on partner assertion.
* HALT marks partnership suspended while queued external jobs continue.
* terminated partner retains Dataset copies contrary to agreed disposition.
* Research collaboration Pilot is described as Production partner integration.

---

# 190. External Partnership Evidence Requirements

Material partnership claims should eventually link to:

```text id="erp190"
PARTNER
IDENTITY

DUE
DILIGENCE

RISK
ASSESSMENT

MANDATE

AGREEMENT

ACCESS
AUTHORIZATIONS

PROJECT /
TENANT
SCOPE

DATA
TRANSFER
RECORDS

DATASET
PROVENANCE

MODEL /
TOOL
AUTHORIZATIONS

IP
TERMS

PUBLICATION
TERMS

FUNDING /
CONFLICT
DISCLOSURES

JOINT
EXPERIMENT
EVIDENCE

PARTNER
DELIVERABLES

AUDIT

INCIDENTS

HALT /
RESUME

TERMINATION /
OFFBOARDING
EVIDENCE
```

---

# 191. External Partnership Maturity Model

Conceptual:

```text id="erp191"
EPM0
=
EXTERNAL
PARTNERSHIP
FRAMEWORK
DOCUMENTED

EPM1
=
PARTNER /
MANDATE /
ACCESS /
DATA /
IP
MODELS
DEFINED

EPM2
=
DUE
DILIGENCE /
AGREEMENT /
SECURITY /
PUBLICATION /
TERMINATION
CONTRACTS
DESIGNED

EPM3
=
CONTROLLED
PARTNER
COLLABORATION
WORKFLOW
IMPLEMENTED

EPM4
=
IDENTITY /
ACCESS /
DATA /
AUDIT /
DELIVERABLE
TRACKING
INTEGRATED

EPM5
=
JOINT
EXPERIMENT /
BENCHMARK /
MODEL /
KNOWLEDGE
TRANSFER
CAPABILITIES
INTEGRATED

EPM6
=
PROJECT /
TENANT /
EGRESS /
SECURITY /
HALT /
OFFBOARDING
CONTROLS
IMPLEMENTED

EPM7
=
CRITICAL
PARTNERSHIP
CONTROLS
VERIFIED

EPM8
=
CONTROLLED
EXTERNAL
PARTNERSHIP
PILOT
VERIFIED

EPM9
=
PRODUCTION-CONNECTED
EXTERNAL
PARTNERSHIP
CAPABILITY
SEPARATELY
AUTHORIZED
```

---

# 192. Maturity Boundary

Permanent:

```text id="erp192"
EPM8
≠
EPM9
```

---

# 193. Controlled Partnership Pilot

A first Pilot should prefer:

```text id="erp193"
ONE
CLEAR
RESEARCH
QUESTION

LIMITED
PARTNER
USERS

NON-
SENSITIVE
OR
MINIMIZED
DATA

ISOLATED
ENVIRONMENT

NO
PRODUCTION
WRITE

LIMITED
TOOLS

NO
UNBOUNDED
AGENT
AUTONOMY

FULL
AUDIT

CLEAR
EXPIRY

FAST
REVOCATION
```

---

# 194. Pilot Exit Criteria

Verify:

* identity.
* access.
* Project scope.
* Tenant scope.
* Data controls.
* external Tool controls.
* model-provider controls.
* audit.
* incident handling.
* access expiry.
* offboarding.

---

# 195. Pilot Boundary

Permanent:

```text id="erp195"
PARTNERSHIP
PILOT
SUCCESS
≠
PRODUCTION
PARTNER
ACCESS
AUTHORIZED
```

---

# 196. Production-Connected Partnership Authorization

Any partner access to Production-connected systems should separately specify:

```text id="erp196"
PARTNER

NAMED
USERS /
SERVICES

PURPOSE

PROJECTS

TENANTS

DATA
CLASSES

SYSTEMS

READ /
WRITE
ACTIONS

TOOLS

MODELS

NETWORK

EGRESS

TIME
WINDOW

MONITORING

HALT

APPROVAL
```

---

# 197. Production Authorization Boundary

```text id="erp197"
STRATEGIC
PARTNER
STATUS
≠
PRODUCTION
ACCESS
AUTHORIZATION
```

---

# 198. Repository Evidence

The verified VS Code screenshot established:

```text id="erp198"
doc/26-research-lab/collaboration/
├── external-partnerships.md
├── internal-collaboration.md
└── open-source.md
```

This document corresponds to the first screenshot-verified file in the `collaboration/` folder.

---

# 199. Screenshot Truth Boundary

Permanent:

```text id="erp199"
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

# 200. Repository Save Boundary

This document is generated for:

```text id="erp200"
doc/26-research-lab/collaboration/external-partnerships.md
```

Permanent:

```text id="erp201"
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

# 201. Current Documentation Truth

```text id="erp202"
EXTERNAL_PARTNERSHIP_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 202. Current Runtime Truth

Nothing in this document independently proves an active partnership or collaboration runtime.

```text id="erp203"
EXTERNAL_PARTNER_REGISTRY
=
NOT_PROVEN

PARTNER_DUE_DILIGENCE_RUNTIME
=
NOT_PROVEN

PARTNERSHIP_MANDATE_RUNTIME
=
NOT_PROVEN

PARTNER_IDENTITY_RUNTIME
=
NOT_PROVEN

PARTNER_ACCESS_RUNTIME
=
NOT_PROVEN

PARTNER_SANDBOX_RUNTIME
=
NOT_PROVEN

PARTNER_DATA_TRANSFER_RUNTIME
=
NOT_PROVEN

PARTNER_DATASET_EXCHANGE_RUNTIME
=
NOT_PROVEN

PARTNER_MODEL_ACCESS_RUNTIME
=
NOT_PROVEN

EXTERNAL_AGENT_RUNTIME
=
NOT_PROVEN

PARTNER_TOOL_GATEWAY_RUNTIME
=
NOT_PROVEN

PARTNERSHIP_PROJECT_ISOLATION
=
NOT_PROVEN

PARTNERSHIP_TENANT_ISOLATION
=
NOT_PROVEN

PARTNERSHIP_SECURITY_MONITORING
=
NOT_PROVEN

PARTNERSHIP_AUDIT_RUNTIME
=
NOT_PROVEN

PARTNERSHIP_KNOWLEDGE_TRANSFER_RUNTIME
=
NOT_PROVEN

PARTNERSHIP_HALT_RUNTIME
=
NOT_PROVEN

PARTNER_OFFBOARDING_VERIFICATION
=
NOT_PROVEN

ACTIVE_EXTERNAL_RESEARCH_PARTNERSHIPS
=
NOT_CLAIMED_BY_THIS_DOCUMENT

CONTROLLED_EXTERNAL_PARTNERSHIP_PILOT
=
NOT_PROVEN

PRODUCTION_CONNECTED_PARTNER_ACCESS
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 203. Approval Truth

```text id="erp204"
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

ACTIVE
PARTNERSHIP
=
NOT_CLAIMED

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

# 204. Production Hard Stops

Production-connected partner access should remain blocked where applicable if:

```text id="erp205"
PARTNER
IDENTITY
UNVERIFIED

DUE
DILIGENCE
INCOMPLETE

AGREEMENT
INVALID /
EXPIRED

PARTNERSHIP
MANDATE
MISSING

PURPOSE
UNDEFINED

PROJECT
SCOPE
UNVERIFIED

TENANT
SCOPE
UNVERIFIED

DATA
CLASSIFICATION
UNVERIFIED

DATA
TRANSFER
AUTHORITY
UNVERIFIED

DATASET
PROVENANCE
UNVERIFIED

DATASET
LICENSE
UNVERIFIED

IP
TERMS
UNRESOLVED

PUBLICATION
RIGHTS
UNRESOLVED

CONFLICTS
UNASSESSED

EXTERNAL
MODEL
DATA
POLICY
UNVERIFIED

EXTERNAL
AGENT
AUTHORITY
UNVERIFIED

TOOL
ACCESS
UNVERIFIED

SECRETS
BOUNDARY
UNVERIFIED

NETWORK
BOUNDARY
UNVERIFIED

EGRESS
CONTROL
UNVERIFIED

PROMPT
INJECTION
DEFENSE
UNVERIFIED

AUTHORITY
INJECTION
DEFENSE
UNVERIFIED

AUDIT
UNVERIFIED

ACCESS
EXPIRY
UNVERIFIED

HALT
UNVERIFIED

OFFBOARDING
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

# 205. Permanent External Partnership Invariants

```text id="erp206"
PARTNERSHIP
INTEREST
≠
PARTNERSHIP
AUTHORIZATION

AGREEMENT
SIGNED
≠
SYSTEM
ACCESS
AUTHORIZED

PARTNER
REPUTABLE
≠
PARTNER
UNCONDITIONALLY
TRUSTED

ACTIVE
PARTNER
≠
ALL
RESOURCE
ACCESS

PARTNER
QUALIFIED
FOR
A
≠
QUALIFIED
FOR
B

DUE
DILIGENCE
COMPLETE
≠
FUTURE
RISK
ELIMINATED

FAMOUS
PARTNER
≠
LOW
RISK

MANDATE
≠
UNLIMITED
DELEGATION

EXPIRED
MANDATE
≠
AUTO-
RENEWED

BROAD
"AI
RESEARCH"
SCOPE
≠
SUFFICIENT
ACCESS
DEFINITION

PARTNER
AUTHORITY
≠
FOUNDER
AUTHORITY

CONTRACTUAL
DATA
RIGHT
≠
DIRECT
DATABASE
ACCESS
REQUIRED

SHARED
ACCOUNT
≠
INDIVIDUAL
IDENTITY

ACCOUNT
EXISTS
≠
ACCESS
CURRENTLY
AUTHORIZED

PARTNER
RESEARCH
ACCESS
≠
PRODUCTION
ACCESS

SANDBOX
NAME
≠
SANDBOX
VERIFIED

MORE
DATA
MAY
HELP
≠
MORE
DATA
AUTHORIZED

PROJECT A
PARTNERSHIP
≠
PROJECT B
AUTHORITY

TENANT A
PARTNERSHIP
≠
TENANT B
AUTHORITY

SHARED
PLATFORM
≠
ALL
TENANT
VISIBILITY

PARTNER
DATASET
≠
LEGAL /
ACCURATE /
UNBIASED
DATASET
PROVEN

DERIVED
DATASET
≠
SOURCE
LICENSE
IRRELEVANT

PARTNERSHIP
ENDED
≠
DATA
MAY
BE
RETAINED
FOREVER

PARTNER
SAYS
DELETED
≠
DELETE
VERIFIED

NDA
≠
UNLIMITED
CONFIDENTIAL
DATA
ACCESS

PARTNER
USES
Mianx.ai
IP
≠
PARTNER
OWNS
IP

CO-
AUTHORSHIP
≠
JOINT
OWNERSHIP
OF
ALL
IP

PUBLICATION
URGENCY
≠
IP
REVIEW
BYPASS

ACADEMIC
PUBLICATION
READY
≠
ENTERPRISE
DISCLOSURE
AUTHORIZED

FUNDER
≠
AUTHOR
AUTOMATICALLY

FUNDING
≠
CONTROL
OF
RESEARCH
TRUTH

CONFLICT
DISCLOSED
≠
CONFLICT
ELIMINATED

PARTNER
DISAGREEMENT
≠
RESULT
MAY
BE
CHANGED
WITHOUT
EVIDENCE

JOINT
EXPERIMENT
SUCCESS
≠
INDEPENDENT
REPLICATION

PARTNER
EXPERT
OPINION
≠
VALIDATED
EVIDENCE

COMMERCIAL
PRESSURE
≠
COUNTER-
EVIDENCE
REMOVAL
AUTHORIZED

PARTNER
MODEL
PERFORMS
WELL
≠
Mianx.ai
DATA
AUTHORIZED
FOR
MODEL

PARTNER
AGENT
≠
Mianx.ai
HUMAN
AUTHORITY

PARTNER
AI
OUTPUT
≠
VALIDATED
RESEARCH

PARTNER
NEEDS
TOOL
≠
PARTNER
NEEDS
ADMIN
ROLE

VALID
API
KEY
≠
ALL
API
ACTIONS
AUTHORIZED

KNOWN
PARTNER
REPOSITORY
≠
CODE
SAFE
TO
RUN

MALWARE
SCAN
PASS
≠
CONTENT
TRUSTED

EXTERNAL
INSTRUCTION
≠
SYSTEM
AUTHORITY

EXTERNAL
CLAIM
OF
FOUNDER
APPROVAL
≠
FOUNDER
APPROVAL

PRIVATE
NETWORK
ACCESS
≠
SYSTEM
AUTHORITY

API
USE
≠
MASTER
SECRET
NEEDED

EXTERNAL
EGRESS
POSSIBLE
≠
EGRESS
AUTHORIZED

DE-
IDENTIFIED
≠
RE-
IDENTIFICATION
IMPOSSIBLE

PARTNER
ETHICS
APPROVAL
≠
Mianx.ai
APPROVAL

TRANSFER
POSSIBLE
≠
CROSS-
BORDER
TRANSFER
AUTHORIZED

CHEAP
PARTNER
COMPUTE
≠
DATA
AUTHORIZED
FOR
COMPUTE

PARTNER
BENCHMARK
DESIGN
≠
INDEPENDENT
BENCHMARK
AUTOMATICALLY

DELIVERABLE
RECEIVED
≠
DELIVERABLE
VALIDATED

PARTNER
RESEARCH
VALIDATED
≠
CANONICAL
Mianx.ai
KNOWLEDGE

MEMORY
CONTAINS
PARTNER
CLAIM
≠
CLAIM
AUTHORITY

JOINT
COMMITTEE
AGREES
≠
FOUNDER
APPROVAL
WHERE
REQUIRED

ACTIVE
PARTNERSHIP
≠
SCOPE
EXPANSION
AUTHORIZED

CHAT
SAYS
APPROVED
≠
GOVERNANCE
APPROVAL

ACTIVITY
LOGGED
≠
ACTIVITY
AUTHORIZED

MORE
PARTNERSHIPS
≠
BETTER
RESEARCH

MORE
DELIVERABLES
≠
MORE
VALUE

PARTNER
SAYS
INCIDENT
FIXED
≠
Mianx.ai
VERIFICATION
COMPLETE

SUSPENDED
≠
TERMINATED

HALT
ISSUED
≠
HALT
VERIFIED

PARTNER
READY
TO
RESUME
≠
RESUME
AUTHORIZED

PREVIOUS
PARTNERSHIP
SUCCESS
≠
AUTO-
RENEWAL

CONTRACT
ENDED
≠
ACCESS
REVOKED
VERIFIED

VALUABLE
PARTNER
≠
NO
EXIT
PLAN
NEEDED

PARTNER
API
≠
PORTABLE
Mianx.ai
CAPABILITY

PARTNER
VALIDATES
OWN
SYSTEM
≠
INDEPENDENT
VALIDATION

PARTNERSHIP
PILOT
≠
PRODUCTION
PARTNER
ACCESS

STRATEGIC
PARTNER
≠
PRODUCTION
AUTHORITY

EPM8
≠
EPM9

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

# 206. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="erp207"
## RESEARCH-LAB-CHG-20260814-031 — External Research Partnerships Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-14 |
| Change Type | `CREATED`, `COLLABORATION`, `EXTERNAL-PARTNERSHIPS`, `PARTNER-GOVERNANCE`, `DUE-DILIGENCE`, `DATA-SHARING`, `IP`, `PUBLICATION`, `PROJECT-ISOLATION`, `TENANT-ISOLATION`, `SECURITY`, `HALT`, `OFFBOARDING`, `RUNTIME-TRUTH` |
| Impact | `I5 — External Research Collaboration Foundation` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Canonical | `NO` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/collaboration/external-partnerships.md`

### Documentation Truth

`EXTERNAL_PARTNERSHIP_FRAMEWORK = CONTENT_COMPLETE_FOR_REVIEW`

### Collaboration Folder Truth

`COLLABORATION_VISIBLE_FILES = 1 / 3 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`EXTERNAL_PARTNERSHIP_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_CONNECTED_PARTNER_ACCESS = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 207. Final External Partnership Rule

The Mianx.ai External Research Partnership framework should operate conceptually as:

```text id="erp208"
PARTNER
IDENTITY

↓

DUE
DILIGENCE

↓

RISK
ASSESSMENT

↓

DEFINED
RESEARCH
PURPOSE

↓

EXPLICIT
PARTNERSHIP
MANDATE

↓

LEGAL /
IP /
DATA /
SECURITY
AGREEMENT

↓

NAMED
IDENTITIES

↓

LEAST-
PRIVILEGE
ACCESS

↓

PROJECT /
TENANT /
DATA /
TOOL /
MODEL
BOUNDARIES

↓

CONTROLLED
JOINT
RESEARCH

↓

EVIDENCE /
COUNTER-
EVIDENCE

↓

Mianx.ai
REVIEW /
VALIDATION

↓

KNOWLEDGE
TRANSFER /
PUBLICATION
UNDER
GOVERNANCE

↓

RENEW /
SUSPEND /
HALT /
TERMINATE /
OFFBOARD
```

while permanently preserving:

```text id="erp209"
COLLABORATION
≠
AUTHORITY

PARTNERSHIP
≠
TRUST
WITHOUT
BOUNDARIES

DATA
SHARING
≠
DATA
OWNERSHIP

JOINT
RESEARCH
≠
SHARED
TENANT
ACCESS

PARTNER
EXPERTISE
≠
ENTERPRISE
APPROVAL

FUNDING
≠
TRUTH
CONTROL

PARTNER
AI
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

# 208. Next Document

The screenshot-verified `collaboration/` sequence is:

```text id="erp210"
1. external-partnerships.md
2. internal-collaboration.md
3. open-source.md
```

`external-partnerships.md` is now content-complete for review in this documentation workflow.

The next verified document should define the complete **Internal Research Collaboration framework**, including cross-department collaboration, Research roles, Research ownership, shared Research Programs, internal Research requests, C-Suite/Director/Manager/Agent participation, Human and AI researcher collaboration, responsibility boundaries, RACI-like accountability, Project/Tenant separation, Knowledge and Memory sharing, internal Data exchange, shared Benchmarks and Datasets, handoffs, Research review forums, conflict resolution, duplicate-work prevention, communication channels, Research artifacts, Evidence ownership, internal transfer, incentives, capacity, escalation, HALT/Resume, metrics, maturity and Runtime Truth.

## NEXT DOCUMENT

```text id="erp211"
doc/26-research-lab/collaboration/internal-collaboration.md
```

---