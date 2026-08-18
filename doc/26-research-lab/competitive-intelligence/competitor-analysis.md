---

id: RESEARCH-LAB-COMPETITIVE-INTELLIGENCE-COMPETITOR-ANALYSIS-001
title: Mianx.ai Research Lab Competitive Intelligence — Competitor Analysis
version: 1.0.0
status: Draft

description: Enterprise-grade specification for the Mianx.ai Research Lab Competitor Analysis framework. This document defines how Mianx.ai should identify, classify, research, compare, monitor, challenge, validate and translate competitor intelligence into governed strategic Research without treating competitor claims, marketing materials, rankings, pricing pages, analyst commentary, AI-generated summaries or incomplete public signals as enterprise truth. It establishes competitor identity, competitor taxonomy, direct and indirect competitors, substitute solutions, emerging challengers, platform competitors, AI-native competitors, industry-specific competitors, capability comparison, Product comparison, AI Workforce comparison, Business Operating System comparison, architecture signals, technical capabilities, Model strategy, Agent strategy, automation, Memory, Knowledge, governance, Security, Data, deployment, pricing, packaging, business models, target customers, customer positioning, partnerships, ecosystem, hiring signals, patents, publications, public roadmap signals, funding and corporate signals, evidence provenance, source quality, confidence, recency, contradictions, Counter-Evidence, feature matrices, strategic strengths and weaknesses, gaps, advantages, moat analysis, threat classification, opportunity classification, temporal snapshots, change detection, revalidation, ethical and legal boundaries, prohibited intelligence practices, AI-assisted Research, hallucination controls, Project and Industry segmentation, Research transfer, Technology Radar integration, decision boundaries, metrics, maturity and Runtime Truth. It permanently separates competitor claim from verified capability, public demo from Production capability, feature presence from feature quality, pricing page from total customer cost, funding from technical superiority, customer count from customer satisfaction, patent from practical capability, hiring signal from implemented strategy, website language from architecture truth, benchmark score from enterprise fit, AI-generated competitive summary from Evidence, strategic recommendation from Founder approval, Research finding from canonical enterprise truth, Pilot from Production authorization, and documentation from implementation, testing, verification or Production authorization.

type: Competitor Analysis Framework, Competitive Intelligence Research Specification, Competitor Capability Comparison Model, Strategic Threat and Opportunity Assessment Framework, Evidence and Provenance Model, Runtime Truth Register, Controlled Pilot Boundary, and Production Authorization Boundary

class: Governed target-state Competitive Intelligence specification defining how Mianx.ai should research and compare competitors without asserting that a Competitor Registry, automated competitor monitoring system, market intelligence runtime, pricing monitor, hiring-signal pipeline, competitive alerting engine, AI competitor analysis Agent, verified competitor Dataset or Production strategic intelligence capability is currently implemented

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Competitive Intelligence
specialization: Competitor Analysis

parent: doc/26-research-lab/competitive-intelligence
path: doc/26-research-lab/competitive-intelligence/competitor-analysis.md

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
* Competitive Intelligence Governance
* Strategy Governance
* Product Governance
* Market Research Governance
* Evidence Governance
* Data Governance
* AI Research Governance
* Agent Research Governance
* Technology Radar Governance
* Security Governance
* Legal Governance
* Ethics Governance
* Knowledge Governance
* Intelligence Governance
* Audit Governance
* Verification Governance
* Production Governance
* Documentation Governance

maintainers:

* Competitive Intelligence Research Team
* Market Research Team
* Research Operations
* Strategy Research
* Product Research
* AI Research Team
* Agent Research Team
* Data Research Team
* Technology Radar Team
* Knowledge Engineering
* Intelligence Engineering
* Security Research
* Verification Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* Enterprise Governance
* Research Governance
* Competitive Intelligence Lead
* Strategy Leadership
* Product Leadership
* Market Research Lead
* AI Research Lead
* Agent Research Lead
* Evidence Governance
* Legal Governance
* Security Governance
* Ethics Governance
* Knowledge Governance
* Intelligence Governance
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
* Strategy Leaders
* Research Leaders
* Competitive Intelligence Researchers
* Market Researchers
* Product Leaders
* Product Researchers
* AI Researchers
* Agent Researchers
* Enterprise Architects
* Business Analysts
* Data Analysts
* Technology Radar Teams
* Knowledge Teams
* Intelligence Teams
* Security Researchers
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
* ../benchmarking/benchmark-suite.md
* ../benchmarking/comparison-metrics.md
* ../benchmarking/performance-benchmarks.md
* ../collaboration/external-partnerships.md
* ../collaboration/internal-collaboration.md
* ../collaboration/open-source.md
* ../ai-research/ai-research.md
* ../ai-research/foundation-models.md
* ../ai-research/multimodal-ai.md
* ../ai-research/reasoning-models.md
* ../agent-research/agent-behavior.md
* ../agent-research/autonomous-agents.md
* ../agent-research/multi-agent-research.md
* ../../01-governance/
* ../../02-company/
* ../../03-product/
* ../../08-data/
* ../../09-security/
* ../../12-business/
* ../../16-knowledge/
* ../../19-ai-workforce/
* ../../20-ai-operating-system/
* ../../21-memory-engine/
* ../../22-agent-framework/
* ../../23-multi-agent-system/
* ../../24-automation-engine/
* ../../25-intelligence-engine/

related_documents:

* ./industry-trends.md
* ./market-positioning.md
* ../future-technologies/
* ../market-research/
* ../patents/
* ../publications/
* ../research-strategy/
* ../technology-radar/
* ../knowledge-transfer/
* ../CHANGELOG.md

review_cycle:

* At Every Material Competitor Analysis Framework Change
* At Every Strategic Competitor Classification Change
* At Every Major Competitor Product or Platform Change
* At Every Material Pricing or Packaging Change
* At Every Major Competitor AI or Agent Capability Change
* At Every Material Strategic Threat Change
* At Every Material Market Entry or Exit
* At Every Major Acquisition, Partnership or Funding Event Where Relevant
* At Every Material Competitor Security or Governance Signal
* Before Strategic Decisions Rely on Competitor Intelligence
* Quarterly for Active Strategic Competitors
* Annually for Broad Competitive Landscape Review

## canonical: false

# Mianx.ai Research Lab Competitive Intelligence — Competitor Analysis

> **Competitor Analysis exists to improve Mianx.ai strategic awareness — not to imitate competitors blindly.**
>
> A competitor may reveal:
>
> * market expectations;
> * emerging capabilities;
> * changing business models;
> * customer demand;
> * technology direction;
> * operational weaknesses;
> * and strategic opportunities.
>
> But competitor information is often:
>
> * incomplete;
> * promotional;
> * outdated;
> * selectively disclosed;
> * or difficult to verify.
>
> Therefore Mianx.ai should treat competitive intelligence as governed Research.

---

# 1. Purpose

The Competitor Analysis framework should answer:

```text id="ca001"
WHO
COMPETES
WITH
Mianx.ai?

↓

IN
WHICH
MARKET /
CAPABILITY /
INDUSTRY?

↓

WHAT
DO
THEY
CLAIM?

↓

WHAT
CAN
WE
VERIFY?

↓

HOW
DO
THEIR
CAPABILITIES
COMPARE?

↓

WHAT
ARE
THEIR
STRENGTHS /
WEAKNESSES?

↓

WHAT
CHANGED
RECENTLY?

↓

WHAT
THREATS /
OPPORTUNITIES
EXIST?

↓

WHAT
SHOULD
Mianx.ai
RESEARCH
NEXT?

↓

WHAT
SHOULD
Mianx.ai
NOT
INFER
FROM
INCOMPLETE
EVIDENCE?
```

---

# 2. Core Competitive Intelligence Principle

Permanent:

```text id="ca002"
COMPETITOR
CLAIM
≠
VERIFIED
COMPETITOR
CAPABILITY
```

---

# 3. Marketing Boundary

```text id="ca003"
MARKETING
MESSAGE
≠
ARCHITECTURE
TRUTH
```

---

# 4. Demo Boundary

Permanent:

```text id="ca004"
PUBLIC
DEMO
≠
PRODUCTION
CAPABILITY
```

---

# 5. Feature Boundary

```text id="ca005"
FEATURE
EXISTS
≠
FEATURE
HIGH
QUALITY
```

---

# 6. Funding Boundary

Permanent:

```text id="ca006"
MORE
FUNDING
≠
TECHNICALLY
SUPERIOR
```

---

# 7. Popularity Boundary

```text id="ca007"
MORE
CUSTOMERS
≠
BETTER
FIT
FOR
Mianx.ai
STRATEGY
```

---

# 8. Benchmark Boundary

Permanent:

```text id="ca008"
COMPETITOR
BENCHMARK
SCORE
≠
Mianx.ai
ENTERPRISE
FIT
```

---

# 9. Competitive Intelligence Mission

```text id="ca009"
DISCOVER

↓

IDENTIFY

↓

CLASSIFY

↓

SOURCE

↓

VERIFY

↓

COMPARE

↓

CHALLENGE

↓

TRACK
CHANGE

↓

ASSESS
THREAT /
OPPORTUNITY

↓

TRANSFER
STRATEGIC
INSIGHT

↓

REVALIDATE
```

---

# 10. Competitor Taxonomy

Potential:

```text id="ca010"
CT01
DIRECT
COMPETITOR

CT02
INDIRECT
COMPETITOR

CT03
SUBSTITUTE
SOLUTION

CT04
PLATFORM
COMPETITOR

CT05
AI-NATIVE
COMPETITOR

CT06
AUTOMATION
COMPETITOR

CT07
SOFTWARE
HOUSE /
AGENCY
COMPETITOR

CT08
ENTERPRISE
PLATFORM
COMPETITOR

CT09
INDUSTRY
OS
COMPETITOR

CT10
AI
WORKFORCE
COMPETITOR

CT11
OPEN-SOURCE
ALTERNATIVE

CT12
EMERGING
CHALLENGER

CT13
ADJACENT
PLAYER

CT14
POTENTIAL
FUTURE
COMPETITOR
```

---

# 11. Direct Competitor

A direct competitor serves substantially similar customer needs with materially overlapping value proposition.

---

# 12. Indirect Competitor

An indirect competitor solves the same business problem through a different model.

---

# 13. Substitute Solution

Potential substitutes include:

* traditional software.
* human agencies.
* internal teams.
* conventional ERP/CRM.
* point automation tools.
* generic AI assistants.

---

# 14. Competitor Identity

```yaml id="ca014"
competitor_record:
  competitor_id: required

  legal_or_public_name: required

  primary_domain: required

  headquarters_or_jurisdiction: conditional

  competitor_types: []

  target_markets: []
  target_customer_segments: []

  product_refs: []
  capability_refs: []

  source_refs: []

  confidence_state: required

  first_observed_at: required
  last_reviewed_at: required

  status: required
```

---

# 15. Competitor Status

Potential:

```text id="ca015"
WATCH

EMERGING

ACTIVE

STRATEGIC

HIGH
THREAT

DECLINING

ACQUIRED

INACTIVE

UNKNOWN

ARCHIVED
```

---

# 16. Status Boundary

Permanent:

```text id="ca016"
COMPETITOR
MARKED
STRATEGIC
≠
COMPETITOR
OBJECTIVELY
MOST
DANGEROUS
```

Status is a governed Research assessment.

---

# 17. Competitor Discovery

Potential sources:

* search engines.
* industry reports.
* Product directories.
* customer discussions.
* funding news.
* academic Research.
* open-source ecosystems.
* technology communities.
* partner intelligence.
* job postings.

---

# 18. Discovery Boundary

```text id="ca018"
COMPANY
MENTIONED
IN
MARKET
REPORT
≠
COMPETITOR
CONFIRMED
```

---

# 19. Source Categories

Potential:

```text id="ca019"
S1
OFFICIAL
COMPANY
SOURCE

S2
PRODUCT
DOCUMENTATION

S3
TECHNICAL
DOCUMENTATION

S4
PUBLIC
REPOSITORY

S5
PATENT /
PUBLICATION

S6
CUSTOMER
CASE
STUDY

S7
INDEPENDENT
REVIEW

S8
INDUSTRY
ANALYSIS

S9
JOB
POSTING

S10
PUBLIC
INTERVIEW /
PRESENTATION

S11
COMMUNITY
DISCUSSION

S12
AI-
GENERATED
SUMMARY
AS
UNVERIFIED
ASSISTANCE
```

---

# 20. Source Quality

Potential dimensions:

```text id="ca020"
AUTHORITY

DIRECTNESS

RECENCY

CORROBORATION

SPECIFICITY

BIAS
RISK

REPRODUCIBILITY
```

---

# 21. Official Source Boundary

Permanent:

```text id="ca021"
OFFICIAL
SOURCE
≠
OBJECTIVE
SOURCE
```

Official sources may accurately report what a company claims while still being promotional.

---

# 22. Independent Source Boundary

```text id="ca022"
INDEPENDENT
BLOG /
REVIEW
≠
UNBIASED
OR
CORRECT
AUTOMATICALLY
```

---

# 23. Evidence Record

```yaml id="ca023"
competitor_evidence:
  evidence_id: required

  competitor_ref: required

  claim_or_observation: required

  source_ref: required
  source_type: required

  observed_at: required

  publication_or_event_date: conditional

  confidence: required

  corroborating_source_refs: []

  counter_evidence_refs: []

  limitations: []

  status: required
```

---

# 24. Confidence States

Potential:

```text id="ca024"
UNVERIFIED

LOW

MODERATE

HIGH

VERIFIED
WITHIN
DEFINED
SCOPE

DISPUTED

STALE

SUPERSEDED
```

---

# 25. Confidence Boundary

Permanent:

```text id="ca025"
HIGH
CONFIDENCE
≠
ABSOLUTE
CERTAINTY
```

---

# 26. Corroboration

Important claims should preferably use multiple independent evidence paths where possible.

---

# 27. Corroboration Boundary

```text id="ca027"
THREE
WEBSITES
REPEAT
SAME
PRESS
RELEASE

≠

THREE
INDEPENDENT
SOURCES
```

---

# 28. Temporal Snapshot

Competitor analysis must be time-aware.

```yaml id="ca028"
competitor_snapshot:
  snapshot_id: required

  competitor_ref: required

  effective_date: required

  product_state_ref: required
  capability_state_ref: required
  pricing_state_ref: conditional
  business_model_state_ref: conditional

  evidence_refs: []

  status: required
```

---

# 29. Snapshot Boundary

Permanent:

```text id="ca029"
COMPETITOR
CAPABILITY
TRUE
IN
JANUARY
≠
CAPABILITY
UNCHANGED
IN
AUGUST
```

---

# 30. Change Detection

Track material changes in:

```text id="ca030"
PRODUCTS

PRICING

MODELS

AGENTS

AUTOMATION

ENTERPRISE
FEATURES

INTEGRATIONS

PARTNERSHIPS

HIRING

PATENTS

PUBLICATIONS

POSITIONING

CUSTOMER
SEGMENTS
```

---

# 31. Change Event Record

```yaml id="ca031"
competitor_change_event:
  event_id: required

  competitor_ref: required

  change_type: required

  previous_state_ref: conditional
  new_state_ref: required

  evidence_refs: []

  observed_at: required

  confidence: required

  strategic_impact: conditional

  status: required
```

---

# 32. Change Boundary

```text id="ca032"
WEBSITE
TEXT
CHANGED
≠
PRODUCT
CAPABILITY
CHANGED
PROVEN
```

---

# 33. Product Comparison

Potential dimensions:

```text id="ca033"
CORE
VALUE
PROPOSITION

TARGET
CUSTOMER

FEATURES

WORKFLOWS

INTEGRATIONS

CONFIGURABILITY

USABILITY

ENTERPRISE
READINESS

AI
CAPABILITIES

SECURITY

DEPLOYMENT

PRICING
```

---

# 34. Feature Matrix

Illustrative:

| Capability   | Mianx.ai Target   | Competitor A     | Competitor B     | Evidence Quality |
| ------------ | ----------------- | ---------------- | ---------------- | ---------------- |
| AI Workforce | Target capability | Observed/Unknown | Observed/Unknown | Source-linked    |
| Multi-Agent  | Target capability | Observed/Unknown | Observed/Unknown | Source-linked    |
| Memory       | Target capability | Observed/Unknown | Observed/Unknown | Source-linked    |
| Automation   | Target capability | Observed/Unknown | Observed/Unknown | Source-linked    |
| Industry OS  | Target capability | Observed/Unknown | Observed/Unknown | Source-linked    |

No actual competitor values are asserted by this framework.

---

# 35. Feature Matrix Boundary

Permanent:

```text id="ca035"
CHECKMARK
IN
FEATURE
MATRIX
≠
CAPABILITY
EQUIVALENCE
```

---

# 36. Feature Depth

Compare:

```text id="ca036"
ABSENT

BASIC

MATERIAL

ADVANCED

STRATEGIC

UNKNOWN
```

only where Evidence supports such classification.

---

# 37. Capability Comparison

Potential Mianx.ai strategic capability domains:

```text id="ca037"
AI
WORKFORCE

AI
OPERATING
SYSTEM

AGENT
FRAMEWORK

MULTI-
AGENT
SYSTEM

MEMORY
ENGINE

AUTOMATION
ENGINE

INTELLIGENCE
ENGINE

RESEARCH
LAB

KNOWLEDGE
SYSTEM

INDUSTRY
OPERATING
SYSTEMS
```

---

# 38. Capability Boundary

```text id="ca038"
COMPETITOR
USES
TERM
"AI
AGENTS"

≠

COMPETITOR
HAS
Mianx.ai-
EQUIVALENT
AGENT
ARCHITECTURE
```

---

# 39. Architecture Signals

Public architecture evidence may come from:

* engineering blogs.
* documentation.
* repositories.
* conference talks.
* hiring.
* patents.

---

# 40. Architecture Boundary

Permanent:

```text id="ca040"
PUBLIC
ARCHITECTURE
DIAGRAM
≠
COMPLETE
RUNTIME
ARCHITECTURE
```

---

# 41. AI Strategy Analysis

Potential:

```text id="ca041"
MODEL
PROVIDER
STRATEGY

FOUNDATION
MODEL
STRATEGY

REASONING
STRATEGY

MULTIMODAL
STRATEGY

AGENT
STRATEGY

MEMORY

RAG

TOOLS

AUTOMATION

EVALUATION
```

---

# 42. Model Strategy Boundary

```text id="ca042"
COMPETITOR
ANNOUNCES
MODEL
PARTNERSHIP
≠
MODEL
DEEPLY
INTEGRATED
OR
DIFFERENTIATED
```

---

# 43. Agent Strategy

Compare where Evidence permits:

* single-agent.
* multi-agent.
* autonomous execution.
* Human approval.
* Tool orchestration.
* specialization.
* observability.

---

# 44. Agent Boundary

Permanent:

```text id="ca044"
COMPETITOR
CALLS
WORKFLOW
"AGENTIC"
≠
AUTONOMOUS
AGENT
BEHAVIOR
VERIFIED
```

---

# 45. AI Workforce Analysis

Potential questions:

```text id="ca045"
ARE
AI
ROLES
SPECIALIZED?

ARE
DEPARTMENTS
MODELED?

IS
WORK
ROUTED?

IS
AGENT
PERFORMANCE
MEASURED?

ARE
AUTHORITY
BOUNDARIES
VISIBLE?

CAN
MULTIPLE
PROJECTS
RUN
CONCURRENTLY?
```

---

# 46. AI Workforce Boundary

```text id="ca046"
MANY
AI
PERSONAS
≠
ENTERPRISE
AI
WORKFORCE
OPERATING
SYSTEM
```

---

# 47. Automation Analysis

Potential:

* workflow automation.
* trigger types.
* integrations.
* Human gates.
* retries.
* observability.
* long-running workflows.

---

# 48. Memory Analysis

Potential:

* session memory.
* long-term memory.
* organization memory.
* Project memory.
* user memory.
* Knowledge retrieval.

---

# 49. Memory Boundary

Permanent:

```text id="ca049"
COMPETITOR
SAYS
"PERSISTENT
MEMORY"
≠
MEMORY
PROVEN
SCOPED /
FRESH /
AUDITABLE
```

---

# 50. Governance Analysis

Potential:

```text id="ca050"
RBAC

APPROVALS

AUDIT

POLICIES

AUTONOMY
CONTROL

PROJECT
BOUNDARIES

TENANT
BOUNDARIES

MODEL
GOVERNANCE

DATA
GOVERNANCE
```

---

# 51. Security Analysis

Potential:

* identity.
* authentication.
* authorization.
* encryption.
* audit.
* Tenant isolation.
* secret handling.
* compliance claims.

---

# 52. Security Claim Boundary

```text id="ca052"
COMPETITOR
WEBSITE
SAYS
"ENTERPRISE
SECURITY"

≠

SECURITY
CONTROL
VERIFIED
```

---

# 53. Compliance Claims

Certifications or attestations should be distinguished from broader Security quality.

---

# 54. Certification Boundary

Permanent:

```text id="ca054"
CERTIFICATION
EXISTS
≠
EVERY
PRODUCT
WORKFLOW
SECURE
```

---

# 55. Data Strategy

Potential:

```text id="ca055"
CUSTOMER
DATA
USE

TRAINING
POLICY

DATA
RETENTION

REGIONS

DATA
EXPORT

DATA
OWNERSHIP

TENANT
SEGREGATION
```

---

# 56. Pricing Analysis

Potential:

```text id="ca056"
FREE

PER
USER

PER
SEAT

PER
TOKEN

PER
AGENT

PER
WORKFLOW

USAGE
BASED

SUBSCRIPTION

ENTERPRISE
CONTRACT

OUTCOME
BASED
```

---

# 57. Pricing Record

```yaml id="ca057"
competitor_pricing_snapshot:
  pricing_id: required

  competitor_ref: required

  effective_date: required

  plan_refs: []

  pricing_model: required

  visible_prices: []

  usage_constraints: []

  enterprise_pricing_state: conditional

  source_refs: []

  confidence: required
```

---

# 58. Pricing Boundary

Permanent:

```text id="ca058"
LIST
PRICE
≠
TOTAL
CUSTOMER
COST
```

---

# 59. Total Cost Factors

Potential:

* implementation.
* integrations.
* training.
* support.
* compute.
* usage limits.
* consulting.
* customization.
* migration.

---

# 60. Pricing Comparison Boundary

```text id="ca060"
COMPETITOR
CHEAPER
PER
SEAT
≠
COMPETITOR
CHEAPER
PER
BUSINESS
OUTCOME
```

---

# 61. Business Model Analysis

Potential:

```text id="ca061"
SAAS

PLATFORM

MARKETPLACE

CONSULTING

AGENCY

USAGE-
BASED

API

OPEN-CORE

ENTERPRISE
LICENSE

MANAGED
SERVICE
```

---

# 62. Revenue Model Boundary

Permanent:

```text id="ca062"
BUSINESS
MODEL
VISIBLE
≠
UNIT
ECONOMICS
KNOWN
```

---

# 63. Customer Segment Analysis

Potential:

```text id="ca063"
SMB

MID-
MARKET

ENTERPRISE

DEVELOPERS

AGENCIES

INDUSTRY-
SPECIFIC
CUSTOMERS

GOVERNMENT

EDUCATION
```

---

# 64. Customer Count Boundary

```text id="ca064"
CLAIMED
CUSTOMER
COUNT
≠
ACTIVE /
PAYING /
SATISFIED
CUSTOMER
COUNT
PROVEN
```

---

# 65. Customer Evidence

Potential:

* case studies.
* testimonials.
* reviews.
* public deployments.
* customer references.

---

# 66. Customer Case Study Boundary

Permanent:

```text id="ca066"
ONE
SUCCESSFUL
CASE
STUDY
≠
TYPICAL
CUSTOMER
OUTCOME
```

---

# 67. Customer Pain Signals

Potential:

* public reviews.
* forums.
* issue trackers.
* Product feedback.
* implementation complaints.

---

# 68. Review Boundary

```text id="ca068"
LOUD
NEGATIVE
REVIEW
≠
REPRESENTATIVE
CUSTOMER
EXPERIENCE
```

---

# 69. Market Positioning Signals

Track language such as:

* AI platform.
* Agent platform.
* automation.
* business OS.
* copilot.
* enterprise AI.
* autonomous workflows.
* vertical AI.

Detailed positioning methodology belongs in `market-positioning.md`.

---

# 70. Positioning Boundary

Permanent:

```text id="ca070"
COMPETITOR
POSITIONING
CLAIM
≠
CUSTOMER
PERCEPTION
PROVEN
```

---

# 71. Partnership Signals

Potential:

* cloud providers.
* Model providers.
* channel partners.
* enterprise platforms.
* industry partners.
* systems integrators.

---

# 72. Partnership Boundary

```text id="ca072"
PARTNERSHIP
ANNOUNCEMENT
≠
DEEP
TECHNICAL
INTEGRATION
PROVEN
```

---

# 73. Ecosystem Analysis

Potential:

```text id="ca073"
API

MARKETPLACE

DEVELOPER
COMMUNITY

INTEGRATIONS

PARTNERS

OPEN-SOURCE

TEMPLATES

EXTENSIONS
```

---

# 74. Ecosystem Boundary

Permanent:

```text id="ca074"
MANY
INTEGRATIONS
≠
HIGH
INTEGRATION
QUALITY
```

---

# 75. Hiring Signals

Job postings may indicate strategic interest in:

* Agents.
* LLMs.
* infrastructure.
* Security.
* industry expansion.
* sales regions.

---

# 76. Hiring Boundary

```text id="ca076"
HIRING
FOR
CAPABILITY X
≠
CAPABILITY X
IMPLEMENTED
```

---

# 77. Team Size Boundary

Permanent:

```text id="ca077"
MORE
EMPLOYEES
≠
MORE
EFFECTIVE
ORGANIZATION
```

---

# 78. Funding Signals

Potential:

* funding round.
* investor.
* valuation.
* debt.
* acquisition financing.

---

# 79. Funding Interpretation

Funding may indicate:

* available capital.
* investor confidence.
* expansion intent.

But not technical quality.

---

# 80. Corporate Events

Potential:

```text id="ca080"
FUNDING

ACQUISITION

MERGER

SPIN-OFF

RESTRUCTURING

LEADERSHIP
CHANGE

MAJOR
PARTNERSHIP
```

---

# 81. Acquisition Boundary

```text id="ca081"
COMPANY
ACQUIRED
≠
PRODUCT
IMMEDIATELY
INTEGRATED
WITH
ACQUIRER
```

---

# 82. Patents

Patents can signal areas of Research or strategic protection.

---

# 83. Patent Boundary

Permanent:

```text id="ca083"
PATENT
FILED /
GRANTED
≠
COMMERCIAL
CAPABILITY
IMPLEMENTED
```

---

# 84. Publications

Academic and technical publications can reveal:

* Research direction.
* methods.
* Model strategy.
* technical expertise.

---

# 85. Publication Boundary

```text id="ca085"
PAPER
PUBLISHED
≠
PRODUCT
USES
PAPER'S
METHOD
```

---

# 86. Open Source Signals

Competitor repositories can reveal:

* developer activity.
* frameworks.
* integrations.
* examples.
* developer strategy.

---

# 87. Repository Boundary

Permanent:

```text id="ca087"
OPEN
REPOSITORY
≠
COMPLETE
PROPRIETARY
SYSTEM
ARCHITECTURE
```

---

# 88. Public Roadmap Signals

Potential sources:

* announcements.
* Product updates.
* conference talks.
* issue trackers.

---

# 89. Roadmap Boundary

```text id="ca089"
COMPETITOR
ANNOUNCES
ROADMAP
FEATURE
≠
FEATURE
WILL
SHIP
AS
PLANNED
```

---

# 90. Strategic Strength Analysis

Potential categories:

```text id="ca090"
BRAND

CAPITAL

DISTRIBUTION

CUSTOMER
BASE

TECHNOLOGY

DATA

ECOSYSTEM

TALENT

INDUSTRY
EXPERTISE

OPERATIONS

PARTNERSHIPS

PLATFORM
LOCK-IN
```

---

# 91. Strength Boundary

Permanent:

```text id="ca091"
APPARENT
STRENGTH
≠
SUSTAINABLE
ADVANTAGE
```

---

# 92. Weakness Analysis

Potential:

* fragmented Product.
* high cost.
* limited customization.
* weak AI.
* limited industry depth.
* poor developer experience.
* weak governance.
* limited integration.
* reliance on third parties.

Only claim when supported by Evidence.

---

# 93. Weakness Boundary

```text id="ca093"
ABSENCE
OF
PUBLIC
EVIDENCE
≠
WEAKNESS
PROVEN
```

---

# 94. Capability Gap Analysis

Potential:

```text id="ca094"
Mianx.ai
HAS /
TARGETS
CAPABILITY X

COMPETITOR
HAS
CAPABILITY Y

↓

IDENTIFY

Mianx.ai
GAP

COMPETITOR
GAP

DIFFERENTIATION
OPPORTUNITY
```

---

# 95. Gap Boundary

Permanent:

```text id="ca095"
COMPETITOR
HAS
FEATURE
Mianx.ai
DOES
NOT
HAVE
≠
Mianx.ai
SHOULD
BUILD
FEATURE
```

---

# 96. Strategic Fit

A gap should be evaluated against Mianx.ai vision, not competitor imitation.

---

# 97. Copying Boundary

```text id="ca097"
COMPETITOR
DOES
X
≠
Mianx.ai
SHOULD
DO
X
```

---

# 98. Differentiation Analysis

Potential Mianx.ai differentiation dimensions may include:

```text id="ca098"
AUTONOMOUS
ENTERPRISE
CREATION

AI
WORKFORCE

MULTI-
PROJECT
AI
OS

BUSINESS
OPERATING
SYSTEM

REUSABLE
INDUSTRY
SYSTEMS

GOVERNED
AI
AUTONOMY

KNOWLEDGE /
MEMORY
INTEGRATION

RESEARCH-
DRIVEN
IMPROVEMENT
```

These are target strategic dimensions, not claims that runtime differentiation is already implemented.

---

# 99. Differentiation Truth Boundary

Permanent:

```text id="ca099"
Mianx.ai
DOCUMENTS
DIFFERENTIATOR
≠
MARKET
HAS
VALIDATED
DIFFERENTIATOR
```

---

# 100. Moat Analysis

Potential moat categories:

```text id="ca100"
DATA
MOAT

WORKFLOW
MOAT

KNOWLEDGE
MOAT

NETWORK
EFFECT

ECOSYSTEM
MOAT

SWITCHING
COST

BRAND

DISTRIBUTION

TECHNOLOGY

OPERATING
SYSTEM
INTEGRATION

INDUSTRY
EXPERTISE
```

---

# 101. Moat Boundary

```text id="ca101"
DIFFICULT
FEATURE
TO
BUILD
≠
DURABLE
MOAT
```

---

# 102. Competitor Moat Assessment

Assess:

* durability.
* replicability.
* dependency.
* customer value.
* capital intensity.
* switching cost.

---

# 103. Threat Classification

Potential:

```text id="ca103"
T0
INFORMATIONAL

T1
LOW

T2
MATERIAL

T3
HIGH

T4
STRATEGIC /
CRITICAL
```

Exact semantics should defer to strategy governance.

---

# 104. Threat Drivers

Potential:

```text id="ca104"
PRODUCT
OVERLAP

CUSTOMER
OVERLAP

TECHNOLOGY
ADVANTAGE

PRICING
PRESSURE

DISTRIBUTION

CAPITAL

ECOSYSTEM

INDUSTRY
ENTRY

TALENT

SPEED
OF
EXECUTION
```

---

# 105. Threat Boundary

Permanent:

```text id="ca105"
COMPETITOR
LARGE
≠
COMPETITOR
HIGH
THREAT
TO
Mianx.ai
```

---

# 106. Opportunity Classification

Potential:

```text id="ca106"
O0
INFORMATIONAL

O1
SMALL

O2
MATERIAL

O3
HIGH

O4
STRATEGIC
```

---

# 107. Opportunity Types

Potential:

```text id="ca107"
UNSERVED
SEGMENT

MISSING
CAPABILITY

PRICING
GAP

INTEGRATION
GAP

INDUSTRY
GAP

GOVERNANCE
GAP

CUSTOMER
EXPERIENCE
GAP

PARTNERSHIP
OPPORTUNITY

OPEN-SOURCE
OPPORTUNITY
```

---

# 108. Opportunity Boundary

```text id="ca108"
COMPETITOR
WEAK
IN
AREA X
≠
CUSTOMERS
CARE
ABOUT
AREA X
```

Market Research is required.

---

# 109. Strategic Response Classes

Potential:

```text id="ca109"
WATCH

RESEARCH

VALIDATE
CUSTOMER
NEED

BUILD

PARTNER

DIFFERENTIATE

AVOID

DEFER

REPOSITION
```

---

# 110. Response Boundary

Permanent:

```text id="ca110"
COMPETITIVE
THREAT
IDENTIFIED
≠
RESPONSE
AUTOMATICALLY
AUTHORIZED
```

---

# 111. Competitor Comparison Matrix

Potential:

```yaml id="ca111"
competitor_comparison:
  comparison_id: required

  competitor_refs: []

  effective_date: required

  capability_dimensions: []

  business_dimensions: []

  metric_refs: []

  evidence_refs: []

  confidence: required

  limitations: []

  conclusion_ref: conditional

  status: required
```

---

# 112. Comparison Dimensions

Potential:

```text id="ca112"
PRODUCT

PLATFORM

AI

AGENTS

AUTOMATION

MEMORY

KNOWLEDGE

SECURITY

GOVERNANCE

DATA

INTEGRATIONS

INDUSTRY
DEPTH

PRICING

BUSINESS
MODEL

ECOSYSTEM

CUSTOMER
FIT
```

---

# 113. Comparison Scoring

Possible qualitative scale:

```text id="ca113"
UNKNOWN

LIMITED
EVIDENCE

BELOW
REFERENCE

COMPARABLE

ABOVE
REFERENCE

MATERIAL
ADVANTAGE
```

Only where supporting Evidence exists.

---

# 114. Scoring Boundary

Permanent:

```text id="ca114"
SCORE
4
VS
3
≠
OBJECTIVE
ONE-POINT
ADVANTAGE
WITHOUT
DEFINED
RUBRIC
```

---

# 115. Weighted Comparison

Weights may reflect strategic priorities.

---

# 116. Weight Boundary

```text id="ca116"
WEIGHTED
COMPETITOR
RANKING
≠
OBJECTIVE
MARKET
TRUTH
```

Weights encode Mianx.ai priorities.

---

# 117. No Universal Winner

Different competitors may lead different dimensions.

---

# 118. Ranking Boundary

Permanent:

```text id="ca118"
COMPETITOR
RANKED
#1
IN
FRAMEWORK
≠
BEST
COMPANY
IN
ALL
CONTEXTS
```

---

# 119. Counter-Evidence

Competitive intelligence should actively preserve:

* contradictory Product reports.
* failed customer cases.
* capability uncertainty.
* discrepancies between marketing and technical evidence.

---

# 120. Counter-Evidence Boundary

```text id="ca120"
COUNTER-
EVIDENCE
WEAKENS
PREFERRED
STRATEGY
≠
COUNTER-
EVIDENCE
MAY
BE
SUPPRESSED
```

---

# 121. Unknown State

If Evidence is insufficient:

```text id="ca121"
UNKNOWN

NOT

ASSUME
ABSENT
```

---

# 122. Absence of Evidence Boundary

Permanent:

```text id="ca122"
NO
PUBLIC
EVIDENCE
OF
CAPABILITY X
≠
COMPETITOR
DOES
NOT
HAVE
CAPABILITY X
```

---

# 123. Negative Evidence

Negative claim should be supported carefully.

Prefer:

```text id="ca123"
"NO
EVIDENCE
FOUND
IN
REVIEWED
SOURCES"

OVER

"COMPETITOR
DOES
NOT
HAVE
IT"
```

when absence cannot be verified.

---

# 124. AI-Assisted Competitor Research

AI may assist with:

* discovery.
* source summarization.
* extraction.
* classification.
* comparison.
* change detection.
* contradiction detection.

---

# 125. AI Boundary

Permanent:

```text id="ca125"
AI
GENERATES
COMPETITOR
SUMMARY
≠
SUMMARY
VERIFIED
```

---

# 126. AI Hallucination Risk

High-risk invented claims include:

* fake pricing.
* fake customer count.
* fake acquisition.
* fake partnerships.
* fake Product features.
* fake funding.
* fake security certifications.

---

# 127. AI Citation Rule

Material facts should link back to actual source evidence where Research conclusions depend on them.

---

# 128. AI Citation Boundary

```text id="ca128"
AI
PROVIDES
URL /
CITATION
TEXT
≠
CITATION
VALID
UNTIL
CHECKED
```

---

# 129. Research Agent Access

Competitive Intelligence Agents should receive:

* public sources.
* authorized subscription sources.
* scoped internal analysis.

They should not receive unauthorized private competitor Data.

---

# 130. Legal Research Boundary

Permanent:

```text id="ca130"
COMPETITIVE
INTELLIGENCE
GOAL
≠
AUTHORITY
TO
USE
UNLAWFUL /
DECEPTIVE
METHODS
```

---

# 131. Prohibited Practices

Mianx.ai competitive Research should not rely on prohibited or unauthorized conduct such as:

```text id="ca131"
UNAUTHORIZED
SYSTEM
ACCESS

CREDENTIAL
THEFT

MISREPRESENTATION
FOR
CONFIDENTIAL
ACCESS

TRADE
SECRET
THEFT

MALWARE

SOCIAL
ENGINEERING
FOR
RESTRICTED
DATA

BREACH
OF
ACCESS
CONTROLS
```

---

# 132. Ethical Intelligence Principle

Prefer:

```text id="ca132"
PUBLIC /
LICENSED /
AUTHORIZED
INFORMATION

+

TRANSPARENT
RESEARCH
METHODS
```

---

# 133. Terms-of-Service Boundary

Use of public websites or APIs should still consider applicable access terms and legal constraints.

---

# 134. Personal Data

Competitive Research involving employees or customers should avoid unnecessary personal profiling.

---

# 135. Hiring Intelligence Ethics

Analyze organizational signals rather than targeting sensitive personal information unnecessarily.

---

# 136. Confidential Competitor Information

If confidential third-party information is received unexpectedly:

```text id="ca136"
DO
NOT
ASSUME
AUTHORIZED

↓

QUARANTINE /
ESCALATE

↓

LEGAL /
GOVERNANCE
REVIEW
```

---

# 137. Confidentiality Boundary

Permanent:

```text id="ca137"
INFORMATION
USEFUL
TO
Mianx.ai
≠
Mianx.ai
AUTHORIZED
TO
POSSESS /
USE
IT
```

---

# 138. Project Segmentation

Competitive analysis may differ by Project.

Potential:

```text id="ca138"
Mianx.ai
CORE
OS

RESTAURANTOS

POULTRYOS

FUTURE
INDUSTRY
SYSTEMS
```

---

# 139. Project Boundary

```text id="ca139"
COMPETITOR
HIGH
THREAT
TO
RESTAURANTOS
≠
HIGH
THREAT
TO
Mianx.ai
CORE
PLATFORM
AUTOMATICALLY
```

---

# 140. Industry Segmentation

Competitors may be:

* horizontal.
* vertical.
* regional.
* industry-specific.

---

# 141. Industry Boundary

Permanent:

```text id="ca141"
STRONG
GENERAL
AI
COMPETITOR
≠
STRONG
POULTRY /
RESTAURANT
OPERATING
SYSTEM
COMPETITOR
```

---

# 142. Geographic Segmentation

Competitive conditions may vary by:

* Pakistan.
* regional markets.
* global markets.
* regulatory environment.
* language.

---

# 143. Geographic Boundary

```text id="ca143"
GLOBAL
MARKET
POSITION
≠
LOCAL
MARKET
POSITION
```

---

# 144. Strategic Time Horizons

Potential:

```text id="ca144"
CURRENT

6–12
MONTHS

1–3
YEARS

3–5
YEARS
```

as Research planning horizons, not forecasts of certainty.

---

# 145. Future Competitor Analysis

Potential future competitors may emerge from:

* foundation Model providers.
* ERP vendors.
* cloud platforms.
* vertical AI startups.
* automation companies.
* open-source ecosystems.

---

# 146. Future Boundary

Permanent:

```text id="ca146"
COMPANY
COULD
ENTER
MARKET
≠
COMPANY
WILL
ENTER
MARKET
```

---

# 147. Scenario Analysis

Potential scenarios:

```text id="ca147"
COMPETITOR
LAUNCHES
AI
WORKFORCE

COMPETITOR
CUTS
PRICE

MAJOR
PLATFORM
ENTERS
VERTICAL
OS

OPEN-SOURCE
ALTERNATIVE
MATURES

MODEL
COST
FALLS
SIGNIFICANTLY
```

---

# 148. Scenario Boundary

```text id="ca148"
SCENARIO
PLAUSIBLE
≠
SCENARIO
PREDICTION
```

---

# 149. Strategic Trigger

A trigger may indicate need for deeper Research.

Potential:

```text id="ca149"
MAJOR
PRODUCT
LAUNCH

PRICING
CHANGE

ACQUISITION

NEW
MODEL /
AGENT
CAPABILITY

MAJOR
PARTNERSHIP

ENTRY
INTO
Mianx.ai
TARGET
INDUSTRY
```

---

# 150. Trigger Boundary

Permanent:

```text id="ca150"
TRIGGER
DETECTED
≠
STRATEGY
SHOULD
CHANGE
IMMEDIATELY
```

---

# 151. Competitor Watchlist

Potential:

```yaml id="ca151"
competitor_watchlist_entry:
  watch_id: required

  competitor_ref: required

  watch_reason: required

  priority: required

  monitored_signal_types: []

  review_frequency: required

  owner_ref: required

  status: required
```

---

# 152. Watchlist Boundary

```text id="ca152"
WATCH
FREQUENTLY
≠
COMPETITOR
MOST
IMPORTANT
```

---

# 153. Competitive Alert

Potential:

```yaml id="ca153"
competitive_alert:
  alert_id: required

  competitor_ref: required

  event_ref: required

  observed_change: required

  evidence_refs: []

  confidence: required

  potential_impact: required

  requires_research: required

  status: required
```

---

# 154. Alert Boundary

Permanent:

```text id="ca154"
COMPETITIVE
ALERT
≠
EXECUTIVE
DECISION
```

---

# 155. Competitor Brief

A standard brief may contain:

```text id="ca155"
IDENTITY

POSITIONING

CUSTOMER

PRODUCTS

AI
CAPABILITIES

BUSINESS
MODEL

PRICING

STRENGTHS

WEAKNESSES

DIFFERENTIATORS

THREATS

OPPORTUNITIES

RECENT
CHANGES

EVIDENCE

CONFIDENCE

LIMITATIONS
```

---

# 156. Executive Summary Boundary

```text id="ca156"
SHORT
EXECUTIVE
BRIEF
≠
FULL
EVIDENCE
PACKAGE
```

---

# 157. Research Depth Levels

Potential:

```text id="ca157"
L1
QUICK
SCAN

L2
STANDARD
PROFILE

L3
DEEP
ANALYSIS

L4
STRATEGIC
WATCH

L5
CONTINUOUS
INTELLIGENCE
```

---

# 158. Depth Boundary

Permanent:

```text id="ca158"
L1
QUICK
SCAN
≠
SUFFICIENT
FOR
HIGH-
IMPACT
STRATEGY
```

---

# 159. Competitor Comparison to Mianx.ai Target State

Comparisons must distinguish:

```text id="ca159"
Mianx.ai
CURRENT
VERIFIED
RUNTIME

VS

Mianx.ai
DOCUMENTED
TARGET
STATE
```

---

# 160. Target-State Boundary

Permanent:

```text id="ca160"
Mianx.ai
DOCUMENTATION
SAYS
CAPABILITY X
SHOULD
EXIST
≠
Mianx.ai
CURRENTLY
HAS
CAPABILITY X
```

This prevents fake competitive advantage.

---

# 161. Competitor Advantage Claim

A statement such as:

```text id="ca161"
"Mianx.ai
IS
AHEAD
OF
COMPETITOR X"
```

requires compatible, verified current-state Evidence.

Target-state documentation alone is insufficient.

---

# 162. Current-State Comparison Rule

```text id="ca162"
VERIFIED
Mianx.ai
RUNTIME

VS

VERIFIED
OR
CONFIDENCE-
LABELED
COMPETITOR
STATE
```

should be used for operational comparison.

---

# 163. Strategic Target Comparison

Target state may instead answer:

```text id="ca163"
IF
Mianx.ai
IMPLEMENTS
DOCUMENTED
ARCHITECTURE

WHAT
POTENTIAL
DIFFERENTIATION
COULD
EXIST?
```

This must remain explicitly hypothetical.

---

# 164. Competitive Intelligence to Research Strategy

Transfer:

```text id="ca164"
COMPETITIVE
SIGNAL

↓

RESEARCH
QUESTION

↓

VALIDATION

↓

STRATEGIC
OPTION
```

---

# 165. Strategy Boundary

Permanent:

```text id="ca165"
COMPETITOR
DOES
X
≠
STRATEGIC
PRIORITY
X
AUTHORIZED
```

---

# 166. Product Transfer

Competitor intelligence may generate:

* Product Questions.
* feature hypotheses.
* customer Research.
* pricing Research.

---

# 167. Product Boundary

```text id="ca167"
COMPETITOR
FEATURE
POPULAR
≠
Mianx.ai
CUSTOMERS
NEED
FEATURE
```

---

# 168. Technology Radar Transfer

Competitor technical signals may create Technology Radar candidates.

---

# 169. Technology Radar Boundary

Permanent:

```text id="ca169"
COMPETITOR
USES
TECHNOLOGY X
≠
Mianx.ai
SHOULD
ADOPT
TECHNOLOGY X
```

---

# 170. Research Lab Transfer

Potential new Research Questions:

```text id="ca170"
CAN
Mianx.ai
MATCH
OR
EXCEED
CAPABILITY X?

IS
COMPETITOR
CLAIM
TECHNICALLY
PLAUSIBLE?

DO
CUSTOMERS
VALUE
CAPABILITY X?

CAN
CAPABILITY X
BE
BUILT
MORE
EFFICIENTLY?
```

---

# 171. Knowledge Transfer

Validated competitive findings may enter governed Knowledge systems.

---

# 172. Knowledge Boundary

```text id="ca172"
COMPETITOR
ANALYSIS
VALIDATED
TODAY
≠
PERMANENT
CANONICAL
TRUTH
WITHOUT
FRESHNESS
CONTROL
```

---

# 173. Memory Use

Working Memory may preserve:

* watchlist context.
* prior signals.
* open Questions.

---

# 174. Memory Boundary

Permanent:

```text id="ca174"
MEMORY
SAYS
COMPETITOR
PRICE
=
X
≠
CURRENT
PRICE
WITHOUT
REVALIDATION
```

---

# 175. Competitive Intelligence Metrics

Potential:

```text id="ca175"
COMPETITORS
TRACKED

STRATEGIC
COMPETITORS

SOURCE
FRESHNESS

CLAIM
VERIFICATION
RATE

DISPUTED
CLAIMS

CHANGE
EVENTS

RESEARCH
QUESTIONS
GENERATED

VALIDATED
THREATS

VALIDATED
OPPORTUNITIES

STALE
PROFILES

FALSE
ALERTS
```

---

# 176. Metric Boundary

Permanent:

```text id="ca176"
MORE
COMPETITORS
TRACKED
≠
BETTER
COMPETITIVE
INTELLIGENCE
```

---

# 177. Intelligence Quality Metrics

Potential:

* Evidence coverage.
* confidence calibration.
* source diversity.
* freshness.
* contradiction handling.
* useful decision transfer.

---

# 178. Alert Quality

Potential:

```text id="ca178"
MATERIAL
ALERTS
CONFIRMED

/

TOTAL
HIGH-
PRIORITY
ALERTS
```

---

# 179. Alert Metric Boundary

```text id="ca179"
MORE
ALERTS
≠
BETTER
MONITORING
```

---

# 180. Revalidation Triggers

Revalidate after:

```text id="ca180"
MAJOR
PRODUCT
RELEASE

PRICING
CHANGE

MODEL /
AGENT
LAUNCH

ACQUISITION

FUNDING

PARTNERSHIP

CUSTOMER
SEGMENT
CHANGE

SECURITY
EVENT

HIRING
SHIFT

LONG
TIME
SINCE
REVIEW
```

---

# 181. Freshness States

Potential:

```text id="ca181"
CURRENT

WATCH

REVIEW
DUE

STALE

SUPERSEDED

ARCHIVED
```

---

# 182. Freshness Boundary

Permanent:

```text id="ca182"
COMPETITOR
PROFILE
WAS
ACCURATE
LAST
YEAR
≠
PROFILE
CURRENT
NOW
```

---

# 183. Competitor Analysis Checklist

## Identity

* [x] competitor identity defined.
* [x] taxonomy defined.
* [x] direct competitors defined.
* [x] indirect competitors defined.
* [x] substitutes defined.
* [x] emerging challengers defined.

## Evidence

* [x] source taxonomy defined.
* [x] source quality defined.
* [x] confidence defined.
* [x] corroboration defined.
* [x] Counter-Evidence defined.
* [x] temporal snapshots defined.
* [x] change events defined.

## Capability

* [x] Product comparison defined.
* [x] AI capability comparison defined.
* [x] Agent comparison defined.
* [x] AI Workforce comparison defined.
* [x] automation defined.
* [x] Memory defined.
* [x] governance defined.
* [x] Security defined.
* [x] Data strategy defined.

## Business

* [x] pricing defined.
* [x] business model defined.
* [x] customer segments defined.
* [x] customer evidence defined.
* [x] partnerships defined.
* [x] ecosystem defined.
* [x] hiring signals defined.
* [x] funding signals defined.

## Strategy

* [x] strengths defined.
* [x] weaknesses defined.
* [x] gaps defined.
* [x] differentiation defined.
* [x] moat analysis defined.
* [x] threats defined.
* [x] opportunities defined.
* [x] responses defined.

## Governance

* [x] legal boundaries defined.
* [x] prohibited practices defined.
* [x] confidential information handling defined.
* [x] AI-assisted Research boundary defined.
* [x] Project segmentation defined.
* [x] Industry segmentation defined.
* [x] current vs target Mianx.ai comparison defined.
* [x] Runtime Truth defined.

---

# 184. Positive Verification Scenarios

Future Competitive Intelligence capability should verify at least:

```text id="ca184"
CAV-01
EVERY
COMPETITOR
HAS
STABLE
IDENTITY

CAV-02
MATERIAL
CLAIMS
LINK
TO
SOURCE
EVIDENCE

CAV-03
OFFICIAL
MARKETING
CLAIM
IS
NOT
TREATED
AS
INDEPENDENT
VERIFICATION

CAV-04
REPEATED
PRESS
RELEASE
COPIES
ARE
NOT
COUNTED
AS
INDEPENDENT
CORROBORATION

CAV-05
UNKNOWN
CAPABILITY
DOES
NOT
BECOME
"ABSENT"

CAV-06
WEBSITE
COPY
CHANGE
DOES
NOT
AUTO-
BECOME
PRODUCT
CHANGE

CAV-07
DEMO
DOES
NOT
AUTO-
BECOME
PRODUCTION
CAPABILITY

CAV-08
FEATURE
CHECKMARK
DOES
NOT
AUTO-
IMPLY
FEATURE
EQUIVALENCE

CAV-09
COMPETITOR
USES
TERM
"AGENT"
WITHOUT
AUTO-
ASSUMING
AUTONOMOUS
AGENT
ARCHITECTURE

CAV-10
COMPETITOR
USES
TERM
"MEMORY"
WITHOUT
AUTO-
ASSUMING
PERSISTENT
GOVERNED
MEMORY

CAV-11
SECURITY
MARKETING
CLAIM
DOES
NOT
BECOME
VERIFIED
SECURITY
CONTROL

CAV-12
LIST
PRICE
DOES
NOT
BECOME
TOTAL
CUSTOMER
COST

CAV-13
CUSTOMER
COUNT
CLAIM
DOES
NOT
BECOME
SATISFACTION
METRIC

CAV-14
HIRING
FOR
AGENTS
DOES
NOT
BECOME
AGENT
CAPABILITY
PROOF

CAV-15
PATENT
DOES
NOT
BECOME
IMPLEMENTED
PRODUCT
CAPABILITY

CAV-16
PUBLISHED
PAPER
DOES
NOT
BECOME
PRODUCT
IMPLEMENTATION
PROOF

CAV-17
COUNTER-
EVIDENCE
IS
PRESERVED

CAV-18
AI-
GENERATED
COMPETITOR
CLAIM
REMAINS
UNVERIFIED
UNTIL
SOURCE
CHECKED

CAV-19
UNLAWFUL /
DECEPTIVE
INTELLIGENCE
METHOD
IS
NOT
AUTHORIZED

CAV-20
CONFIDENTIAL
THIRD-
PARTY
INFORMATION
IS
QUARANTINED
WHEN
AUTHORITY
UNCLEAR

CAV-21
PROJECT-
SPECIFIC
THREAT
DOES
NOT
AUTO-
GENERALIZE
TO
ALL
Mianx.ai

CAV-22
Mianx.ai
TARGET
ARCHITECTURE
IS
NOT
PRESENTED
AS
CURRENT
COMPETITIVE
ADVANTAGE

CAV-23
COMPETITOR
THREAT
DOES
NOT
AUTO-
AUTHORIZE
PRODUCT
ROADMAP
CHANGE

CAV-24
TECHNOLOGY
USED
BY
COMPETITOR
DOES
NOT
AUTO-
ENTER
Mianx.ai
STACK

CAV-25
COMPETITIVE
RESEARCH
PILOT
DOES
NOT
AUTO-
AUTHORIZE
PRODUCTION
DECISIONS
```

---

# 185. Negative Verification Scenarios

Containment or correction should occur when:

* competitor marketing homepage is used as proof of Production architecture.
* public demo is marked as verified enterprise capability.
* AI summary invents competitor pricing and report publishes it without source validation.
* multiple articles repeating the same company press release are counted as independent Evidence.
* no public evidence of a feature is converted into "competitor does not have this feature."
* funding round is scored as proof of technical superiority.
* customer count is treated as customer satisfaction.
* job posting for AI Agent engineer is treated as proof that multi-Agent architecture is already deployed.
* patent filing is treated as implemented Product capability.
* one customer review is generalized to entire customer base.
* competitor has feature and Mianx.ai automatically adds same feature to Roadmap.
* competitor open-source repository is treated as complete internal architecture.
* ranking weights are changed after seeing outcomes to make preferred competitor look weaker.
* Mianx.ai target-state documentation is compared with competitor current runtime and reported as current Mianx.ai superiority.
* confidential competitor Data obtained through unauthorized means is accepted because it is strategically useful.
* Agent is instructed to bypass access controls for competitor intelligence.
* old pricing is reused from Memory without freshness check.
* high-priority competitive alert directly triggers Product or Production change.
* one Industry OS competitor is labeled existential threat to entire Mianx.ai platform without scope analysis.
* Research Pilot is represented as Founder-approved competitive strategy.

---

# 186. Competitor Evidence Requirements

Material competitive conclusions should ideally link to:

```text id="ca186"
COMPETITOR
IDENTITY

EFFECTIVE
DATE

SOURCE
PROVENANCE

SOURCE
TYPE

SOURCE
RECENCY

CLAIM

CORROBORATION

COUNTER-
EVIDENCE

CONFIDENCE

PRODUCT
STATE

CAPABILITY
STATE

PRICING
STATE

BUSINESS
MODEL

CUSTOMER
SEGMENT

THREAT /
OPPORTUNITY
ANALYSIS

LIMITATIONS

REVIEWER
```

---

# 187. Current-State Comparison Evidence

Any claim that Mianx.ai currently leads or trails a competitor should require:

```text id="ca187"
VERIFIED
Mianx.ai
CURRENT
STATE

+

TIME-
ALIGNED
COMPETITOR
STATE

+

COMMON
COMPARISON
RUBRIC

+

EVIDENCE

+

LIMITATIONS
```

---

# 188. Controlled Competitive Intelligence Pilot

A first Pilot should prefer:

```text id="ca188"
SMALL
COMPETITOR
WATCHLIST

PUBLIC /
AUTHORIZED
SOURCES

MANUAL
SOURCE
VERIFICATION

NO
UNLAWFUL
DATA
COLLECTION

VERSIONED
SNAPSHOTS

VISIBLE
CONFIDENCE

VISIBLE
COUNTER-
EVIDENCE

NO
AUTO-
ROADMAP
CHANGES

NO
AUTO-
EXECUTIVE
DECISIONS
```

---

# 189. Pilot Exit Criteria

Verify:

* competitor identity.
* source provenance.
* confidence.
* freshness.
* change detection.
* contradictions.
* current-vs-target Mianx.ai distinction.
* legal/ethical boundaries.
* strategic transfer.
* audit.

---

# 190. Pilot Boundary

Permanent:

```text id="ca190"
COMPETITIVE
INTELLIGENCE
PILOT
SUCCESS
≠
PRODUCTION
STRATEGIC
DECISION
AUTHORIZATION
```

---

# 191. Competitive Intelligence Maturity Model

Conceptual:

```text id="ca191"
CIM0
=
COMPETITOR
ANALYSIS
FRAMEWORK
DOCUMENTED

CIM1
=
COMPETITOR /
SOURCE /
EVIDENCE /
SNAPSHOT /
CHANGE
MODELS
DEFINED

CIM2
=
CAPABILITY /
PRICING /
BUSINESS /
THREAT /
OPPORTUNITY
COMPARISON
CONTRACTS
DESIGNED

CIM3
=
CONTROLLED
COMPETITOR
RESEARCH
WORKFLOW
IMPLEMENTED

CIM4
=
COMPETITOR
REGISTRY /
SOURCE /
SNAPSHOT /
CHANGE
TRACKING
INTEGRATED

CIM5
=
PRODUCT /
AI /
AGENT /
BUSINESS /
MARKET
COMPARISON
INTEGRATED

CIM6
=
FRESHNESS /
AI
HALLUCINATION /
LEGAL /
PROJECT /
INDUSTRY
CONTROLS
IMPLEMENTED

CIM7
=
CRITICAL
COMPETITIVE
INTELLIGENCE
BOUNDARIES
VERIFIED

CIM8
=
CONTROLLED
COMPETITIVE
INTELLIGENCE
PILOT
VERIFIED

CIM9
=
PRODUCTION-SCOPE
STRATEGIC
INTELLIGENCE
USE
SEPARATELY
AUTHORIZED
```

---

# 192. Maturity Boundary

Permanent:

```text id="ca192"
CIM8
≠
CIM9
```

---

# 193. Repository Evidence

The current verified VS Code screenshot establishes:

```text id="ca193"
doc/26-research-lab/competitive-intelligence/
├── competitor-analysis.md
├── industry-trends.md
└── market-positioning.md
```

The same screenshot also establishes:

```text id="ca194"
doc/26-research-lab/datasets/
├── data-quality.md
├── dataset-catalog.md
└── dataset-governance.md
```

This document corresponds to the first verified file in the `competitive-intelligence/` folder.

---

# 194. Screenshot Truth Boundary

Permanent:

```text id="ca195"
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

# 195. Repository Save Boundary

This document is generated for:

```text id="ca196"
doc/26-research-lab/competitive-intelligence/competitor-analysis.md
```

Permanent:

```text id="ca197"
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

# 196. Current Documentation Truth

```text id="ca198"
COMPETITOR_ANALYSIS_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW
BY
THIS
DOCUMENT
```

---

# 197. Current Runtime Truth

Nothing in this document independently proves implementation of Competitive Intelligence infrastructure.

```text id="ca199"
COMPETITOR_REGISTRY_RUNTIME
=
NOT_PROVEN

COMPETITOR_SOURCE_REGISTRY
=
NOT_PROVEN

COMPETITOR_EVIDENCE_RUNTIME
=
NOT_PROVEN

COMPETITOR_SNAPSHOT_RUNTIME
=
NOT_PROVEN

COMPETITOR_CHANGE_DETECTION
=
NOT_PROVEN

COMPETITOR_PRICING_MONITOR
=
NOT_PROVEN

COMPETITOR_CAPABILITY_MATRIX_RUNTIME
=
NOT_PROVEN

COMPETITOR_AI_ANALYSIS_RUNTIME
=
NOT_PROVEN

COMPETITOR_AGENT_ANALYSIS_RUNTIME
=
NOT_PROVEN

COMPETITOR_BUSINESS_MODEL_RUNTIME
=
NOT_PROVEN

COMPETITOR_THREAT_SCORING_RUNTIME
=
NOT_PROVEN

COMPETITOR_OPPORTUNITY_SCORING_RUNTIME
=
NOT_PROVEN

COMPETITIVE_ALERT_RUNTIME
=
NOT_PROVEN

COMPETITIVE_INTELLIGENCE_AGENT
=
NOT_PROVEN

COMPETITIVE_INTELLIGENCE_KNOWLEDGE_TRANSFER
=
NOT_PROVEN

COMPETITOR_PROJECT_SEGMENTATION
=
NOT_PROVEN

COMPETITOR_INDUSTRY_SEGMENTATION
=
NOT_PROVEN

CONTROLLED_COMPETITIVE_INTELLIGENCE_PILOT
=
NOT_PROVEN

PRODUCTION_STRATEGIC_INTELLIGENCE_CAPABILITY
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 198. Approval Truth

```text id="ca200"
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

# 199. Production Hard Stops

Production-scope strategic reliance on competitor intelligence should remain blocked where applicable if:

```text id="ca201"
COMPETITOR
IDENTITY
UNVERIFIED

SOURCE
PROVENANCE
UNVERIFIED

SOURCE
FRESHNESS
UNKNOWN

MATERIAL
CLAIMS
UNCORROBORATED
WHERE
CORROBORATION
REQUIRED

CONFIDENCE
UNDEFINED

COUNTER-
EVIDENCE
UNREVIEWED

TEMPORAL
SNAPSHOT
MISSING

CURRENT
VS
TARGET
Mianx.ai
STATE
CONFUSED

COMPETITOR
CAPABILITY
CLAIMS
UNVERIFIED

PRICING
STALE /
UNVERIFIED

BUSINESS
MODEL
INFERENCE
UNVERIFIED

THREAT
SCORING
UNVERIFIED

OPPORTUNITY
SCORING
UNVERIFIED

AI
HALLUCINATION
CONTROLS
UNVERIFIED

LEGAL /
ETHICAL
BOUNDARIES
UNVERIFIED

CONFIDENTIAL
INFORMATION
HANDLING
UNVERIFIED

PROJECT /
INDUSTRY
SEGMENTATION
UNVERIFIED

STRATEGIC
DECISION
AUTHORITY
UNDEFINED

CONTROLLED
PILOT
EVIDENCE
MISSING

PRODUCTION
AUTHORIZATION
MISSING
```

---

# 200. Permanent Competitor Analysis Invariants

```text id="ca202"
COMPETITOR
CLAIM
≠
VERIFIED
CAPABILITY

MARKETING
≠
ARCHITECTURE
TRUTH

DEMO
≠
PRODUCTION
CAPABILITY

FEATURE
EXISTS
≠
FEATURE
QUALITY
PROVEN

FUNDING
≠
TECHNICAL
SUPERIORITY

CUSTOMER
COUNT
≠
CUSTOMER
SATISFACTION

BENCHMARK
SCORE
≠
Mianx.ai
FIT

OFFICIAL
SOURCE
≠
OBJECTIVE
SOURCE

INDEPENDENT
SOURCE
≠
CORRECT
AUTOMATICALLY

HIGH
CONFIDENCE
≠
ABSOLUTE
CERTAINTY

MULTIPLE
COPIES
OF
ONE
PRESS
RELEASE
≠
INDEPENDENT
CORROBORATION

PAST
CAPABILITY
≠
CURRENT
CAPABILITY

WEBSITE
COPY
CHANGE
≠
PRODUCT
CHANGE

FEATURE
CHECKMARK
≠
CAPABILITY
EQUIVALENCE

"AI
AGENT"
TERM
≠
Mianx.ai-
EQUIVALENT
AGENT
ARCHITECTURE

PUBLIC
ARCHITECTURE
DIAGRAM
≠
COMPLETE
RUNTIME
ARCHITECTURE

MODEL
PARTNERSHIP
≠
MODEL
DIFFERENTIATION

"AGENTIC"
LABEL
≠
AUTONOMOUS
AGENT
BEHAVIOR

MANY
AI
PERSONAS
≠
AI
WORKFORCE
OS

"PERSISTENT
MEMORY"
CLAIM
≠
GOVERNED
MEMORY
VERIFIED

"ENTERPRISE
SECURITY"
CLAIM
≠
SECURITY
CONTROL
VERIFIED

CERTIFICATION
≠
EVERY
WORKFLOW
SECURE

LIST
PRICE
≠
TOTAL
CUSTOMER
COST

CHEAPER
PER
SEAT
≠
CHEAPER
PER
OUTCOME

VISIBLE
BUSINESS
MODEL
≠
UNIT
ECONOMICS
KNOWN

CUSTOMER
COUNT
≠
ACTIVE /
PAYING /
SATISFIED
COUNT
PROVEN

ONE
CASE
STUDY
≠
TYPICAL
OUTCOME

ONE
NEGATIVE
REVIEW
≠
TYPICAL
CUSTOMER
EXPERIENCE

POSITIONING
CLAIM
≠
CUSTOMER
PERCEPTION

PARTNERSHIP
ANNOUNCEMENT
≠
DEEP
INTEGRATION

MANY
INTEGRATIONS
≠
HIGH
INTEGRATION
QUALITY

HIRING
FOR
X
≠
X
IMPLEMENTED

MORE
EMPLOYEES
≠
MORE
EFFECTIVE
ORGANIZATION

ACQUISITION
≠
IMMEDIATE
INTEGRATION

PATENT
≠
IMPLEMENTED
CAPABILITY

PAPER
≠
PRODUCT
IMPLEMENTATION

OPEN
REPOSITORY
≠
COMPLETE
PROPRIETARY
ARCHITECTURE

ROADMAP
ANNOUNCEMENT
≠
DELIVERY
GUARANTEE

APPARENT
STRENGTH
≠
DURABLE
ADVANTAGE

NO
PUBLIC
EVIDENCE
≠
WEAKNESS
PROVEN

COMPETITOR
FEATURE
GAP
≠
Mianx.ai
BUILD
REQUIREMENT

COMPETITOR
DOES
X
≠
Mianx.ai
SHOULD
DO
X

DOCUMENTED
DIFFERENTIATOR
≠
MARKET-
VALIDATED
DIFFERENTIATOR

HARD
FEATURE
TO
COPY
≠
DURABLE
MOAT

LARGE
COMPETITOR
≠
HIGH
THREAT
AUTOMATICALLY

COMPETITOR
WEAK
IN
AREA X
≠
CUSTOMER
VALUES
AREA X

THREAT
IDENTIFIED
≠
RESPONSE
AUTHORIZED

QUALITATIVE
SCORE
DIFFERENCE
≠
OBJECTIVE
NUMERIC
ADVANTAGE

WEIGHTED
RANKING
≠
OBJECTIVE
MARKET
TRUTH

RANK
#1
≠
UNIVERSALLY
BEST

COUNTER-
EVIDENCE
INCONVENIENT
≠
COUNTER-
EVIDENCE
REMOVABLE

UNKNOWN
≠
ABSENT

NO
PUBLIC
EVIDENCE
≠
NO
CAPABILITY

AI
SUMMARY
≠
VERIFIED
COMPETITOR
INTELLIGENCE

AI
CITATION
≠
VALID
CITATION
UNTIL
CHECKED

COMPETITIVE
INTELLIGENCE
≠
AUTHORITY
FOR
UNLAWFUL
ACCESS

STRATEGIC
VALUE
OF
INFORMATION
≠
RIGHT
TO
POSSESS
IT

PROJECT-
SPECIFIC
THREAT
≠
ENTERPRISE-
WIDE
THREAT

GENERAL
AI
STRENGTH
≠
INDUSTRY
OS
STRENGTH

GLOBAL
POSITION
≠
LOCAL
POSITION

POTENTIAL
MARKET
ENTRY
≠
FUTURE
ENTRY
CERTAINTY

PLAUSIBLE
SCENARIO
≠
PREDICTION

TRIGGER
DETECTED
≠
STRATEGY
CHANGE
REQUIRED

ALERT
≠
EXECUTIVE
DECISION

EXECUTIVE
SUMMARY
≠
FULL
EVIDENCE
PACKAGE

QUICK
SCAN
≠
DEEP
STRATEGIC
VALIDATION

Mianx.ai
TARGET
STATE
≠
Mianx.ai
CURRENT
RUNTIME

TARGET
DIFFERENTIATION
≠
CURRENT
COMPETITIVE
ADVANTAGE

COMPETITOR
DOES
X
≠
STRATEGIC
PRIORITY
X
AUTHORIZED

COMPETITOR
FEATURE
POPULAR
≠
Mianx.ai
CUSTOMER
NEED

COMPETITOR
USES
TECHNOLOGY X
≠
Mianx.ai
SHOULD
ADOPT X

VALIDATED
COMPETITIVE
FINDING
≠
PERMANENT
TRUTH

MEMORY
OF
OLD
PRICE
≠
CURRENT
PRICE

MORE
COMPETITORS
TRACKED
≠
BETTER
INTELLIGENCE

MORE
ALERTS
≠
BETTER
MONITORING

OLD
PROFILE
≠
CURRENT
PROFILE

COMPETITIVE
INTELLIGENCE
PILOT
≠
PRODUCTION
STRATEGY
AUTHORIZATION

CIM8
≠
CIM9

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

# 201. Changelog Entry

Append during future Research Lab `CHANGELOG.md` synchronization:

```markdown id="ca203"
## RESEARCH-LAB-CHG-20260814-034 — Competitor Analysis Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-14 |
| Change Type | `CREATED`, `COMPETITIVE-INTELLIGENCE`, `COMPETITOR-ANALYSIS`, `CAPABILITY-COMPARISON`, `PRICING`, `BUSINESS-MODEL`, `THREAT-ASSESSMENT`, `OPPORTUNITY-ASSESSMENT`, `EVIDENCE`, `CHANGE-DETECTION`, `AI-ASSISTED-RESEARCH`, `RUNTIME-TRUTH` |
| Impact | `I5 — Competitive Intelligence Research Foundation` |
| Risk | `R1 — Documentation` |
| Status | `CONTENT_COMPLETE_FOR_REVIEW` |
| Owner | Mianx.ai Founder |
| Approved | `NO` |
| Canonical | `NO` |
| Production Authorization | `NO` |

### Affected Document

`doc/26-research-lab/competitive-intelligence/competitor-analysis.md`

### Documentation Truth

`COMPETITOR_ANALYSIS_FRAMEWORK = CONTENT_COMPLETE_FOR_REVIEW`

### Competitive Intelligence Folder Truth

`COMPETITIVE_INTELLIGENCE_VISIBLE_FILES = 1 / 3 CONTENT_COMPLETE_FOR_REVIEW IN CURRENT DOCUMENTATION WORKFLOW`

### Runtime Truth

`COMPETITIVE_INTELLIGENCE_RUNTIME = NOT_PROVEN`

### Production Truth

`PRODUCTION_STRATEGIC_INTELLIGENCE_CAPABILITY = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 202. Final Competitor Analysis Rule

The Mianx.ai Competitor Analysis framework should operate conceptually as:

```text id="ca204"
COMPETITOR
DISCOVERY

↓

STABLE
IDENTITY

↓

SOURCE
COLLECTION

↓

PROVENANCE /
RECENCY /
CONFIDENCE

↓

CLAIM
VERIFICATION

↓

COUNTER-
EVIDENCE

↓

TEMPORAL
SNAPSHOT

↓

PRODUCT /
AI /
AGENT /
BUSINESS /
PRICING
COMPARISON

↓

STRENGTH /
WEAKNESS /
MOAT
ASSESSMENT

↓

THREAT /
OPPORTUNITY
CLASSIFICATION

↓

Mianx.ai
CURRENT
STATE
VS
TARGET
STATE
SEPARATION

↓

RESEARCH
QUESTIONS /
STRATEGIC
OPTIONS

↓

SEPARATE
STRATEGIC
AUTHORITY

↓

CONTINUOUS
REVALIDATION
```

while permanently preserving:

```text id="ca205"
CLAIM
≠
CAPABILITY

MARKETING
≠
TRUTH

DEMO
≠
PRODUCTION

FUNDING
≠
SUPERIORITY

FEATURE
≠
VALUE

UNKNOWN
≠
ABSENT

AI
SUMMARY
≠
EVIDENCE

COMPETITOR
ACTION
≠
Mianx.ai
ROADMAP
MANDATE

TARGET
STATE
≠
CURRENT
RUNTIME

RESEARCH
≠
STRATEGIC
AUTHORITY

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

# 203. Next Document

The screenshot-verified `competitive-intelligence/` sequence is:

```text id="ca206"
1. competitor-analysis.md
2. industry-trends.md
3. market-positioning.md
```

`competitor-analysis.md` is now content-complete for review in this documentation workflow.

The next verified document should define the complete **Industry Trends Research framework**, including trend identity, macro trends, AI trends, technology trends, enterprise software trends, Agent trends, automation trends, industry-specific trends, adoption curves, maturity, drivers, inhibitors, regulatory and economic signals, evidence provenance, temporal analysis, leading and lagging indicators, signal vs noise, hype-cycle risk, scenario analysis, trend strength, trend velocity, trend persistence, geographic and industry segmentation, impact on Mianx.ai Core OS and future Industry Operating Systems, strategic opportunity and risk, Research triggers, Technology Radar transfer, market Research transfer, revalidation, metrics and Runtime Truth.

## NEXT DOCUMENT

```text id="ca207"
doc/26-research-lab/competitive-intelligence/industry-trends.md
```

---
