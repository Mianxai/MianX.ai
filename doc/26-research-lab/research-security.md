---

id: RESEARCH-LAB-SECURITY-001
title: Mianx.ai Research Lab Security
version: 1.0.0
status: Draft

description: Enterprise-grade module-wide Research Security specification for the Mianx.ai Research Lab. This document defines the target Security model protecting Research identities, Research Control Plane decisions, Projects, Tenants, Data, Datasets, Evidence, Sources, Experiments, Benchmarks, Models, LLMs, Prompts, Agents, Multi-Agent systems, Tools, Automation, simulations, prototypes, academic and external Research sources, Market and Competitive Intelligence, Technology Radar, Innovation, Publications, Intellectual Property, Knowledge Transfer, Memory, Knowledge, audit trails and Research infrastructure. It establishes Security principles, threat model, trust boundaries, authentication and authorization expectations, least privilege, Purpose binding, Project and Tenant isolation, Data classification, secrets management, sandboxing, network isolation, egress controls, untrusted-code execution, malicious-file handling, Prompt Injection and Authority Injection defenses, indirect Prompt Injection controls, Model and Agent Security, Tool and connector Security, Automation Security, Dataset poisoning defenses, Benchmark contamination and tampering defenses, Evidence and citation integrity, Prototype isolation, supply-chain Security, external collaboration controls, Publication and IP Security, exfiltration controls, logging and audit integrity, Security monitoring, anomaly detection, incident response, HALT and containment, recovery, credential revocation, vulnerability management, Security testing, positive and negative verification scenarios, Security maturity, Runtime Truth and Production hard stops. It permanently separates Research access from Research authority, authentication from authorization, technical connectivity from permission, source content from authority, Prompt text from system policy, Dataset availability from authorized use, Model availability from approved use, Agent capability from Agent privilege, Tool connectivity from Tool authorization, sandboxing from complete safety, Benchmark integrity from Production fitness, Prototype function from Production readiness, publication readiness from disclosure authorization, incident containment from recovery authorization, controlled-pilot success from Production authorization, Founder references from Founder approval, silence from approval, Security documentation from Security enforcement, and documentation from implementation, testing, verification or Production authorization.

type: Research Lab Security Architecture, Research Threat Model, Data and AI Research Security Framework, Multi-Project and Multi-Tenant Research Security Specification, Runtime Truth Register, and Production Authorization Boundary

class: Governed target-state Security specification defining how Mianx.ai Research Lab assets, identities, Research workflows and AI-native Research systems should be protected without asserting that documented Security controls are currently implemented, technically enforced, tested, verified, canonical or Production authorized

category: Research and Innovation
domain: Research Lab
module: 26-research-lab
subdomain: Research Security
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
* Research Security
* Enterprise Security
* Enterprise Architecture
* Research Architecture
* AI Governance
* AI Security Governance
* Agent Governance
* Model Governance
* Prompt Governance
* Tool Governance
* Automation Governance
* Data Governance
* Dataset Governance
* Evidence Governance
* Knowledge Governance
* Memory Governance
* Experiment Governance
* Benchmark Governance
* Simulation Governance
* Prototype Governance
* Privacy Governance
* Ethics Governance
* Compliance Governance
* Legal Governance
* Intellectual Property Governance
* Supply Chain Security
* Infrastructure Security
* Application Security
* Cloud Security
* Identity and Access Governance
* Audit Governance
* Incident Response Governance
* Production Governance
* Documentation Governance

maintainers:

* Research Security Engineering
* Enterprise Security Engineering
* Research Lab Engineering
* Research Architecture
* Platform Security Engineering
* Application Security Engineering
* Cloud Security Engineering
* Identity Engineering
* Data Security Engineering
* AI Security Engineering
* Agent Security Engineering
* Model Security Engineering
* Prompt Security Engineering
* Tool Security Engineering
* Automation Security Engineering
* Dataset Engineering
* Experiment Platform Engineering
* Benchmark Engineering
* Prototype Engineering
* Research Operations
* Observability Engineering
* Incident Response
* Quality Engineering
* Verification Engineering
* Documentation Governance

reviewers:

* Founder
* Founder Office
* Human Executive Leadership
* AI CEO
* Enterprise Governance
* Research Governance
* Research Security
* Enterprise Security
* Enterprise Architecture
* Research Architecture
* AI Governance
* Data Governance
* Privacy Governance
* Ethics Governance
* Compliance Governance
* Legal Governance
* Intellectual Property Governance
* Audit Governance
* Production Governance
* Quality Governance
* Verification Governance
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
* Enterprise Architects
* Security Architects
* Research Leaders
* Research Engineers
* Security Engineers
* AI Engineers
* Agent Engineers
* Model Engineers
* Prompt Engineers
* Data Scientists
* Data Engineers
* Platform Engineers
* Automation Engineers
* SRE Teams
* Incident Response Teams
* Privacy Teams
* Legal and Compliance Teams
* Intellectual Property Teams
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

* ./research-metrics.md
* ./research-checklists.md
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

* At Every Material Research Security Change
* At Every Research Threat Model Change
* At Every Identity or Authorization Architecture Change
* At Every Project or Tenant Isolation Change
* At Every Research Data or Dataset Security Change
* At Every Model, Prompt, Agent, Tool or Automation Security Change
* At Every Experiment or Prototype Isolation Change
* At Every Research Publication or Collaboration Security Change
* At Every Security Incident Affecting Research
* Before Controlled Research Security Pilots
* Before Production Research Security Authorization
* Quarterly During Active Build
* Annually During Stable Operation

## canonical: false

# Mianx.ai Research Lab Security

> **This document defines the target module-wide Security model for the Mianx.ai Research Lab.**
>
> The Research Lab may eventually process untrusted papers, websites, files, code, Datasets, Models, Prompts, Agent outputs, customer or Project information, experimental software, external Tools and rapidly changing technologies.
>
> That makes Research Security fundamentally different from ordinary documentation Security.
>
> The Research Lab should be designed under the assumption that:
>
> * external Research content may be malicious;
> * Research Data may be poisoned;
> * Models may hallucinate or leak;
> * Agents may attempt actions outside intended scope;
> * experimental code may be unsafe;
> * prototypes may have weak controls;
> * Datasets may contain sensitive or improperly licensed Data;
> * Prompt Injection may attempt to convert content into authority;
> * compromised Tools may attempt exfiltration;
> * research convenience may pressure teams to bypass controls.
>
> **Research speed must never depend on pretending those risks do not exist.**
>
> This document defines target-state Security. It does not prove runtime Security enforcement.

---

# 1. Security Mission

Research Security exists to enable:

```text id="rls-001"
FAST
LEARNING

WITH

CONTROLLED
ACCESS

TRUSTED
AUTHORITY

SAFE
EXPERIMENTATION

PROJECT
ISOLATION

TENANT
ISOLATION

DATA
PROTECTION

AI
SECURITY

TRACEABILITY

CONTAINMENT
```

---

# 2. Security North Star

```text id="rls-002"
UNTRUSTED
RESEARCH
INPUT

↓

CLASSIFY

↓

ISOLATE

↓

AUTHORIZE

↓

MINIMIZE
ACCESS

↓

EXECUTE
IN
CONTROLLED
ENVIRONMENT

↓

MONITOR

↓

CAPTURE
EVIDENCE

↓

PREVENT
UNAUTHORIZED
SIDE
EFFECTS

↓

HALT
IF
BOUNDARY
BREACHED
```

---

# 3. Security Truth Boundary

Permanent:

```text id="rls-003"
SECURITY
DOCUMENTED
≠
SECURITY
IMPLEMENTED
```

---

# 4. Enforcement Boundary

```text id="rls-004"
SECURITY
CONTROL
IMPLEMENTED
≠
SECURITY
CONTROL
ENFORCED
CORRECTLY
```

---

# 5. Verification Boundary

```text id="rls-005"
CONTROL
ENFORCED
≠
CONTROL
VERIFIED
AGAINST
REALISTIC
THREATS
```

---

# 6. Production Boundary

Permanent:

```text id="rls-006"
RESEARCH
SECURITY
PILOT
PASS
≠
PRODUCTION
SECURITY
AUTHORIZATION
```

---

# 7. Core Research Security Principles

The Research Lab should follow:

```text id="rls-007"
ZERO
IMPLICIT
AUTHORITY

LEAST
PRIVILEGE

DENY
BY
DEFAULT

PURPOSE
LIMITATION

TRUST
BOUNDARIES

PROJECT
ISOLATION

TENANT
ISOLATION

ENVIRONMENT
ISOLATION

DATA
MINIMIZATION

SECRET
MINIMIZATION

NETWORK
MINIMIZATION

EGRESS
CONTROL

UNTRUSTED
CONTENT
IS
DATA

NO
SELF-
PRIVILEGE
EXPANSION

AUDITABILITY

REVOCABILITY

HALTABILITY

DEFENSE
IN
DEPTH
```

---

# 8. Research Security Formula

```text id="rls-008"
SECURE
RESEARCH

=

TRUSTED
IDENTITY

+

VALID
AUTHORITY

+

MINIMUM
ACCESS

+

ISOLATED
EXECUTION

+

CONTROLLED
DATA

+

CONTROLLED
TOOLS

+

MONITORING

+

AUDIT

+

HALT /
CONTAINMENT
```

---

# 9. Threat Model Overview

The Research Lab should assume threats may originate from:

```text id="rls-009"
EXTERNAL
ATTACKERS

MALICIOUS
WEB
CONTENT

MALICIOUS
FILES

MALICIOUS
CODE

POISONED
DATASETS

COMPROMISED
DEPENDENCIES

COMPROMISED
TOOLS

COMPROMISED
MODEL
PROVIDERS

MALICIOUS
OR
MISCONFIGURED
AGENTS

INSIDER
MISUSE

ACCIDENTAL
HUMAN
ERROR

MISCONFIGURATION

CREDENTIAL
LEAKAGE

CROSS-PROJECT
LEAKAGE

CROSS-TENANT
LEAKAGE

AI
HALLUCINATION

AUTHORITY
SPOOFING
```

---

# 10. Primary Security Assets

Protect:

```text id="rls-010"
RESEARCH
MANDATES

AUTHORIZATION
RECORDS

PROJECT
DATA

TENANT
DATA

DATASETS

SECRETS

MODELS

MODEL
CREDENTIALS

PROMPTS

AGENT
CONFIGURATIONS

TOOLS

SOURCE
CODE

EXPERIMENTS

BENCHMARKS

RESULTS

EVIDENCE

AUDIT
LOGS

PROTOTYPES

INTELLECTUAL
PROPERTY

UNPUBLISHED
RESEARCH

KNOWLEDGE

MEMORY
```

---

# 11. Security Trust Domains

Conceptually separate:

```text id="rls-011"
TRUSTED
CONTROL
PLANE

TRUSTED
IDENTITY
SYSTEM

TRUSTED
AUTHORIZATION
SYSTEM

RESEARCH
EXECUTION
ENVIRONMENT

UNTRUSTED
EXTERNAL
CONTENT

UNTRUSTED
CODE

UNTRUSTED
FILES

UNTRUSTED
TOOLS

EXTERNAL
MODEL
PROVIDERS

PROJECT
DATA
BOUNDARIES

TENANT
DATA
BOUNDARIES

PRODUCTION
SYSTEMS
```

---

# 12. Trust Boundary Rule

Permanent:

```text id="rls-012"
CROSSING
A
TRUST
BOUNDARY
REQUIRES
EXPLICIT
CONTROL
```

---

# 13. Identity Security

Every material Research action should be attributable to a trusted identity.

Identity classes may include:

```text id="rls-013"
HUMAN
IDENTITY

AGENT
IDENTITY

SERVICE
IDENTITY

WORKLOAD
IDENTITY

TOOL
IDENTITY

MODEL
PROVIDER
IDENTITY
```

---

# 14. Authentication Boundary

```text id="rls-014"
AUTHENTICATED
≠
AUTHORIZED
```

---

# 15. Identity Impersonation

Research Security must prevent or detect impersonation of:

```text id="rls-015"
FOUNDER

EXECUTIVES

ADMINISTRATORS

RESEARCH
APPROVERS

SECURITY
APPROVERS

SYSTEM
SERVICES

AGENTS
```

---

# 16. Founder Impersonation Boundary

Permanent:

```text id="rls-016"
TEXT
SAYS
FOUNDER
APPROVED
≠
FOUNDER
AUTHENTICATED
APPROVAL
```

---

# 17. Authorization Security

Authorization must evaluate trusted:

```text id="rls-017"
ACTOR

ACTION

RESOURCE

ORGANIZATION

PROJECT

TENANT

PURPOSE

ENVIRONMENT

RISK

AUTONOMY

TIME

POLICY
```

---

# 18. Authorization Rule

```text id="rls-018"
ALLOW

ONLY
IF

ALL
REQUIRED
AUTHORIZATION
CONDITIONS
ARE
SATISFIED
```

---

# 19. Fail-Closed Rule

For critical authority checks:

```text id="rls-019"
UNKNOWN

ERROR

MISSING
CONTEXT

EXPIRED
AUTHORITY

↓

DENY /
REVIEW
```

rather than implicit Allow.

---

# 20. Authorization Caching Boundary

```text id="rls-020"
AUTHORIZATION
WAS
VALID
AT
TIME T1
≠
AUTHORIZATION
VALID
AT
TIME T2
AUTOMATICALLY
```

---

# 21. Session Security

Research sessions should eventually support:

```text id="rls-021"
EXPIRY

REVOCATION

DEVICE /
SESSION
TRACKING

RISK
SIGNALS

REAUTHENTICATION
FOR
SENSITIVE
ACTIONS
```

where appropriate.

---

# 22. Service Identity Security

Background Research jobs should run under scoped service or workload identities rather than shared Human credentials.

---

# 23. Credential Sharing Boundary

Permanent:

```text id="rls-022"
SHARED
CREDENTIAL
≠
GOOD
RESEARCH
AUTOMATION
DESIGN
```

---

# 24. Least Privilege

Every Research actor should receive only:

```text id="rls-023"
MINIMUM
DATA

MINIMUM
TOOLS

MINIMUM
NETWORK

MINIMUM
SECRETS

MINIMUM
TIME

MINIMUM
SCOPE

MINIMUM
WRITE
AUTHORITY
```

required for the authorized purpose.

---

# 25. Privilege Escalation Boundary

```text id="rls-024"
TASK
BECOMES
HARDER
≠
MORE
PRIVILEGE
AUTOMATICALLY
AUTHORIZED
```

---

# 26. Project Isolation

Research Security must prevent cross-Project visibility unless explicitly authorized.

Protect:

```text id="rls-025"
DATASETS

FILES

PROMPTS

AGENTS

MODELS
WHERE
PROJECT-SPECIFIC

RESULTS

MEMORY

KNOWLEDGE

PROTOTYPES

AUDIT

SECRETS
```

---

# 27. Project Boundary

Permanent:

```text id="rls-026"
PROJECT A
ACCESS
≠
PROJECT B
ACCESS
```

---

# 28. Trusted Project Context

Project identity must come from trusted context.

Not from arbitrary:

```text id="rls-027"
PROMPT
TEXT

QUERY
PARAMETER

FILE
CONTENT

AGENT
OUTPUT

MODEL
OUTPUT
```

alone.

---

# 29. Cross-Project Research

Cross-Project Research should require explicit authority and Data-scope review.

---

# 30. Cross-Project Learning Boundary

```text id="rls-028"
SHARE
GENERALIZED
LEARNING
≠
SHARE
RAW
PROJECT
DATA
```

---

# 31. Tenant Isolation

Tenant-specific Research must protect against:

```text id="rls-029"
CROSS-TENANT
READ

CROSS-TENANT
WRITE

CROSS-TENANT
SEARCH

CROSS-TENANT
MEMORY
RETRIEVAL

CROSS-TENANT
MODEL
CONTEXT

CROSS-TENANT
TOOL
ACCESS

CROSS-TENANT
EXPORT
```

---

# 32. Tenant Boundary

Permanent:

```text id="rls-030"
TENANT A
CONTEXT
≠
TENANT B
VISIBILITY
```

---

# 33. Tenant Filter Boundary

```text id="rls-031"
APPLICATION
FILTER
PRESENT
≠
TENANT
ISOLATION
VERIFIED
```

Isolation requires testing across all relevant layers.

---

# 34. Organization Isolation

Where multiple Organizations are supported:

```text id="rls-032"
ORGANIZATION A
≠
ORGANIZATION B
AUTHORITY
```

---

# 35. Purpose Isolation

Research Data authorized for one purpose should not silently flow to another purpose.

---

# 36. Data Security

Research Data Security should classify Data according to sensitivity.

Potential conceptual classes:

```text id="rls-033"
PUBLIC

INTERNAL

CONFIDENTIAL

RESTRICTED

HIGHLY
SENSITIVE
```

Exact enterprise classification belongs to authoritative Data Governance.

---

# 37. Data Classification Propagation

Classification should remain associated through:

```text id="rls-034"
INGESTION

TRANSFORMATION

DATASET
VERSIONING

EXPERIMENT

RESULT

EXPORT

MEMORY

KNOWLEDGE
TRANSFER
```

---

# 38. Data Minimization

Use only the Data needed for the authorized Research purpose.

---

# 39. Data Minimization Boundary

```text id="rls-035"
MORE
DATA
AVAILABLE
≠
MORE
DATA
SHOULD
BE
USED
```

---

# 40. Sensitive Data Security

Sensitive Data may require:

```text id="rls-036"
STRONGER
AUTHORIZATION

ENCRYPTION

LIMITED
ACCESS

REDACTION

PSEUDONYMIZATION

REGION
CONTROLS

RETENTION
LIMITS

AUDIT

ENHANCED
MONITORING
```

---

# 41. Production Data Boundary

Permanent:

```text id="rls-037"
RESEARCH
CAN
TECHNICALLY
READ
PRODUCTION
DATA
≠
RESEARCH
IS
AUTHORIZED
TO
READ
PRODUCTION
DATA
```

---

# 42. Data Export Security

Exports should consider:

```text id="rls-038"
REQUESTER

DESTINATION

PROJECT

TENANT

CLASSIFICATION

PURPOSE

FORMAT

REDACTION

RETENTION

AUDIT
```

---

# 43. Data Exfiltration Threat

Potential paths:

```text id="rls-039"
MODEL
PROMPT

TOOL
CALL

EXTERNAL
API

WEB
REQUEST

LOG

ERROR
MESSAGE

EXPORT

SCREENSHOT

PUBLICATION

AGENT
MESSAGE

MEMORY
WRITE
```

---

# 44. Exfiltration Defense

Target controls may include:

```text id="rls-040"
EGRESS
ALLOWLISTS

CONTENT
FILTERING

DATA
CLASSIFICATION

SECRET
DETECTION

RATE
LIMITS

TOOL
SCOPES

MODEL
POLICY

AUDIT

DLP
WHERE
APPROPRIATE
```

---

# 45. Dataset Security

Research Datasets must protect:

```text id="rls-041"
SOURCE

PROVENANCE

INTEGRITY

VERSION

LICENSE

CLASSIFICATION

ACCESS

LINEAGE

TRANSFORMATION

EXPORT

RETENTION
```

---

# 46. Dataset Integrity

Target integrity controls may include:

```text id="rls-042"
HASHES

IMMUTABLE
VERSIONS

SIGNED
MANIFESTS
WHERE
APPROPRIATE

SOURCE
REFERENCES

CHANGE
HISTORY

VALIDATION
CHECKS
```

---

# 47. Dataset Poisoning Threat

Attackers or unreliable sources may introduce:

```text id="rls-043"
MALICIOUS
EXAMPLES

BACKDOORS

MISLABELING

BIASED
SAMPLES

DUPLICATES

CONTAMINATED
BENCHMARK
ITEMS

FAKE
DATA

CORRUPTED
FILES
```

---

# 48. Dataset Poisoning Controls

Potential:

```text id="rls-044"
SOURCE
TRUST
ASSESSMENT

PROVENANCE

HASH
VERIFICATION

ANOMALY
DETECTION

STATISTICAL
CHECKS

LABEL
AUDITS

HOLDOUT
COMPARISON

MANUAL
REVIEW
WHERE
REQUIRED
```

---

# 49. Dataset Boundary

```text id="rls-045"
DATASET
PASSES
AUTOMATED
CHECK
≠
DATASET
TRUSTED
FOR
ALL
USES
```

---

# 50. Secrets Security

Secrets should not be embedded in:

```text id="rls-046"
PROMPTS

RESEARCH
NOTES

DATASETS

SOURCE
CODE

LOGS

MODEL
OUTPUTS

BENCHMARK
RESULTS

PUBLICATIONS

AGENT
MEMORY
```

where avoidable.

---

# 51. Secret Reference Principle

Use:

```text id="rls-047"
SCOPED
SECRET
REFERENCE

↓

RUNTIME
RESOLUTION
```

rather than copying raw credentials.

---

# 52. Secret Scope

Credentials should be scoped by:

```text id="rls-048"
SERVICE

ACTION

PROJECT

TENANT

ENVIRONMENT

TIME

RESOURCE
```

where supported.

---

# 53. Secret Rotation

Research Security should support rotation after:

```text id="rls-049"
EXPOSURE

INCIDENT

TEAM
CHANGE

PROVIDER
CHANGE

POLICY
INTERVAL

HIGH-RISK
RESEARCH
```

as applicable.

---

# 54. Secret Exposure Response

```text id="rls-050"
DETECT

↓

REVOKE /
ROTATE

↓

CONTAIN

↓

INVESTIGATE

↓

IDENTIFY
ACCESS

↓

REMEDIATE

↓

AUDIT
```

---

# 55. Environment Security

Research environments should remain distinct from Production.

Potential:

```text id="rls-051"
LOCAL
RESEARCH

SANDBOX

SHARED
RESEARCH

DEVELOPMENT

TEST

STAGING

CONTROLLED
PILOT

PRODUCTION
```

---

# 56. Environment Boundary

Permanent:

```text id="rls-052"
RESEARCH
ENVIRONMENT
≠
PRODUCTION
ENVIRONMENT
```

---

# 57. Environment Promotion Boundary

```text id="rls-053"
ARTIFACT
WORKS
IN
RESEARCH
≠
ARTIFACT
MAY
ENTER
PRODUCTION
```

---

# 58. Sandbox Security

Untrusted Research workloads should execute in appropriately isolated environments.

Potential sandbox subjects:

```text id="rls-054"
CODE

FILES

DOCUMENTS

DATASETS

MODELS

AGENT
TOOLS

WEB
CONTENT

PROTOTYPES

THIRD-PARTY
PACKAGES
```

---

# 59. Sandbox Objectives

Contain:

```text id="rls-055"
FILESYSTEM
ACCESS

NETWORK

PROCESS

CPU

MEMORY

TIME

SECRETS

HOST
ACCESS

PROJECT
DATA

TENANT
DATA
```

as appropriate.

---

# 60. Sandbox Boundary

Permanent:

```text id="rls-056"
SANDBOXED
≠
SAFE
AUTOMATICALLY
```

---

# 61. Untrusted Code Security

Research may involve code from:

```text id="rls-057"
AI
GENERATION

OPEN
SOURCE

ACADEMIC
REPOSITORIES

VENDORS

EXTERNAL
COLLABORATORS

UNKNOWN
SOURCES
```

---

# 62. Untrusted Code Controls

Potential:

```text id="rls-058"
STATIC
ANALYSIS

DEPENDENCY
SCAN

MALWARE
SCAN

SANDBOX

NO
SECRETS

LIMITED
NETWORK

READ-ONLY
INPUTS

RESOURCE
LIMITS

AUDIT
```

---

# 63. Untrusted File Security

Files may contain:

```text id="rls-059"
MALWARE

MALICIOUS
MACROS

EMBEDDED
SCRIPTS

PROMPT
INJECTION

EXPLOIT
PAYLOADS

DECEPTIVE
CONTENT

SENSITIVE
DATA
```

---

# 64. File Processing Boundary

```text id="rls-060"
FILE
PARSED
SUCCESSFULLY
≠
FILE
TRUSTED
```

---

# 65. Web Research Security

External websites are untrusted Research inputs.

---

# 66. Web Content Boundary

Permanent:

```text id="rls-061"
WEBPAGE
INSTRUCTION
≠
RESEARCH
SYSTEM
INSTRUCTION
```

---

# 67. Prompt Injection Threat

Research systems are particularly vulnerable to Prompt Injection because they consume arbitrary external content.

Attack types include:

```text id="rls-062"
DIRECT
PROMPT
INJECTION

INDIRECT
PROMPT
INJECTION

HIDDEN
TEXT

DOCUMENT
INJECTION

WEBPAGE
INJECTION

DATASET
INJECTION

EMAIL
INJECTION

TOOL
OUTPUT
INJECTION

MEMORY
POISONING

AUTHORITY
SPOOFING
```

---

# 68. Prompt Injection Security Rule

Permanent:

```text id="rls-063"
UNTRUSTED
CONTENT

MUST
BE
TREATED
AS

DATA

NOT

AUTHORITY
```

---

# 69. Prompt Injection Defense Layers

Target controls:

```text id="rls-064"
TRUST
LABELING

INSTRUCTION /
DATA
SEPARATION

TOOL
POLICY

AUTHORIZATION
REVALIDATION

SECRET
ISOLATION

OUTPUT
VALIDATION

CONTENT
SANITIZATION
WHERE
APPROPRIATE

EGRESS
CONTROL

AUDIT

HUMAN
REVIEW
FOR
HIGH
RISK
```

---

# 70. Authority Injection Threat

Malicious content may claim:

```text id="rls-065"
FOUNDER
APPROVED

SYSTEM
ADMIN
APPROVED

IGNORE
POLICY

NEW
PROJECT
AUTHORIZED

NEW
TENANT
AUTHORIZED

USE
PRODUCTION
SECRET

UPLOAD
DATA
HERE
```

---

# 71. Authority Injection Rule

Permanent:

```text id="rls-066"
AUTHORITY
MUST
COME
FROM
TRUSTED
AUTHORIZATION
SYSTEM

NOT

RESEARCH
CONTENT
```

---

# 72. Model Security

Research Models may introduce risks including:

```text id="rls-067"
PROMPT
LEAKAGE

DATA
RETENTION

DATA
TRAINING
USE

UNEXPECTED
TOOL
CALLS

HALLUCINATED
AUTHORITY

UNSAFE
OUTPUT

PROVIDER
COMPROMISE

MODEL
VERSION
CHANGE

MODEL
DEPRECATION

REGION
MISMATCH
```

---

# 73. Model Provider Security Review

Evaluate:

```text id="rls-068"
DATA
HANDLING

RETENTION

TRAINING
POLICY

REGION

ENCRYPTION

ACCESS
CONTROL

INCIDENT
HISTORY

API
SECURITY

MODEL
VERSIONING

CONTRACTUAL
CONTROLS
```

where required.

---

# 74. Model Boundary

```text id="rls-069"
MODEL
AVAILABLE
BY
API
≠
MODEL
SECURITY
APPROVED
```

---

# 75. Model Output Boundary

Permanent:

```text id="rls-070"
MODEL
OUTPUT
≠
TRUSTED
COMMAND
```

---

# 76. Model Hallucinated Authority

If a Model states:

```text id="rls-071"
APPROVED

AUTHORIZED

SAFE

VERIFIED

PRODUCTION
READY
```

that must not alter Security state without trusted evidence.

---

# 77. Model Change Security

Material provider or Model-version changes should trigger appropriate re-evaluation.

---

# 78. LLM Research Security

LLM Research should protect against:

```text id="rls-072"
PROMPT
LEAKAGE

CONTEXT
LEAKAGE

CROSS-TENANT
CONTEXT

JAILBREAKS

TOOL
MISUSE

SYSTEM
PROMPT
DISCLOSURE

SENSITIVE
DATA
DISCLOSURE

INDIRECT
INJECTION
```

---

# 79. Prompt Security

Research Prompts may contain proprietary Research methods and operational instructions.

Protect:

```text id="rls-073"
SYSTEM
PROMPTS

GOVERNING
PROMPTS

PROMPT
OS
LAYERS

RESEARCH
PROMPT
EXPERIMENTS

PROMPT
VERSIONS

PROMPT
BENCHMARK
DATA
```

---

# 80. Prompt Research Boundary

```text id="rls-074"
RESEARCH
PROMPT
ACCESS
≠
PROMPT OS
WRITE
AUTHORITY
```

---

# 81. System Prompt Protection

Governing Prompt content should not be exposed unnecessarily to untrusted Research workloads.

---

# 82. Prompt Mutation Security

Material Prompt changes should be versioned.

---

# 83. Prompt Mutation Boundary

```text id="rls-075"
AGENT
CAN
EDIT
WORKING
PROMPT
≠
AGENT
CAN
EDIT
GOVERNING
PROMPT
```

---

# 84. Agent Security

Research Agents should operate under explicit:

```text id="rls-076"
IDENTITY

ROLE

PROJECT

TENANT

PURPOSE

MODEL

PROMPT

TOOLS

DATA

AUTONOMY

RESOURCE
LIMITS

NETWORK

HALT
CONTROL
```

---

# 85. Agent Privilege Boundary

Permanent:

```text id="rls-077"
AGENT
NEEDS
MORE
CAPABILITY
≠
AGENT
MAY
GRANT
ITSELF
MORE
PRIVILEGE
```

---

# 86. Agent Scope Escape Threat

An Agent may attempt to:

```text id="rls-078"
CHANGE
PROJECT

CHANGE
TENANT

ACCESS
NEW
DATA

ACCESS
NEW
TOOL

ACCESS
PRODUCTION

INCREASE
AUTONOMY

CREATE
NEW
CREDENTIAL

DELEGATE
AUTHORITY
```

---

# 87. Agent Scope Escape Defense

Target:

```text id="rls-079"
EXTERNAL
POLICY
ENFORCEMENT

NOT

AGENT
SELF-
DISCIPLINE
ALONE
```

---

# 88. Multi-Agent Security

Multi-Agent systems introduce:

```text id="rls-080"
AUTHORITY
CONFUSION

MESSAGE
POISONING

PROMPT
PROPAGATION

DATA
LEAKAGE

ROLE
IMPERSONATION

COLLUSIVE
ERROR

AMPLIFIED
HALLUCINATION

TOOL
FAN-OUT
RISK
```

---

# 89. Multi-Agent Message Security

Messages should preserve:

```text id="rls-081"
SENDER
IDENTITY

ROLE

PROJECT

TENANT

TRUST
LEVEL

TRACE
CONTEXT
```

where applicable.

---

# 90. Multi-Agent Consensus Boundary

Permanent:

```text id="rls-082"
MULTIPLE
AGENTS
AGREE
≠
SECURITY
APPROVAL
```

---

# 91. Tool Security

Research Tools may provide powerful capabilities.

Classify Tools by:

```text id="rls-083"
READ

WRITE

EXECUTE

NETWORK

DATA
ACCESS

SECRET
ACCESS

PRODUCTION
ACCESS

EXTERNAL
SIDE
EFFECT
```

---

# 92. Tool Authorization

Each Tool call should be evaluated against:

```text id="rls-084"
ACTOR

ACTION

RESOURCE

PROJECT

TENANT

PURPOSE

RISK

ENVIRONMENT
```

where applicable.

---

# 93. Tool Connectivity Boundary

Permanent:

```text id="rls-085"
TOOL
CONNECTED
≠
TOOL
AUTHORIZED
```

---

# 94. Tool Output Security

Tool output may itself be untrusted.

```text id="rls-086"
TOOL
OUTPUT
≠
AUTHORITY
```

---

# 95. External Connector Security

Third-party connectors should be assessed for:

```text id="rls-087"
PERMISSIONS

DATA
ACCESS

WRITE
ACTIONS

AUTHENTICATION

SECRET
STORAGE

AUDIT

TENANT
SCOPE

PROJECT
SCOPE

REVOCATION
```

---

# 96. Automation Security

Automation may increase blast radius.

Protect:

```text id="rls-088"
TRIGGER

IDENTITY

AUTHORIZATION

INPUT

TOOL
ACCESS

RETRY

PARALLELISM

SIDE
EFFECTS

HALT

AUDIT
```

---

# 97. Automation Boundary

Permanent:

```text id="rls-089"
AUTOMATED
ACTION
≠
AUTOMATICALLY
AUTHORIZED
ACTION
```

---

# 98. Retry Security

Retries must not bypass:

```text id="rls-090"
AUTHORIZATION

RATE
LIMITS

COST
LIMITS

IDEMPOTENCY

SECURITY
CHECKS
```

---

# 99. Retry Storm Threat

Uncontrolled retries may cause:

```text id="rls-091"
COST
EXPLOSION

API
ABUSE

DUPLICATE
SIDE
EFFECTS

RESOURCE
EXHAUSTION

LOCKOUTS

DENIAL
OF
SERVICE
```

---

# 100. Experiment Security

Experiments should receive only required:

```text id="rls-092"
DATA

MODELS

TOOLS

NETWORK

SECRETS

COMPUTE

TIME

STORAGE
```

---

# 101. Experiment Boundary

```text id="rls-093"
EXPERIMENT
AUTHORITY
≠
PRODUCTION
AUTHORITY
```

---

# 102. Experiment Configuration Integrity

Protect against unauthorized changes to:

```text id="rls-094"
DATASET

MODEL

PROMPT

AGENT

TOOL

SCORER

METRIC

CODE

ENVIRONMENT
```

during controlled runs.

---

# 103. Experiment Result Integrity

Research results should be attributable to the exact execution state.

---

# 104. Benchmark Security

Benchmarks may be attacked through:

```text id="rls-095"
DATA
CONTAMINATION

ANSWER
LEAKAGE

SCORER
TAMPERING

CONFIGURATION
TAMPERING

SELECTIVE
REPORTING

RESULT
EDITING

MODEL
OVERFITTING

HIDDEN
BENCHMARK
ACCESS
```

---

# 105. Benchmark Integrity Controls

Potential:

```text id="rls-096"
VERSIONING

HOLDOUT
PROTECTION

ACCESS
CONTROL

SCORER
INTEGRITY

IMMUTABLE
RESULTS

AUDIT

CONTAMINATION
STATUS

INDEPENDENT
REVIEW
```

---

# 106. Benchmark Boundary

Permanent:

```text id="rls-097"
BENCHMARK
INTEGRITY
VERIFIED
≠
PRODUCTION
FIT
VERIFIED
```

---

# 107. Evidence Security

Evidence may be attacked by:

```text id="rls-098"
FABRICATION

DELETION

ALTERATION

SOURCE
SPOOFING

CITATION
SPOOFING

COUNTER-
EVIDENCE
SUPPRESSION

TIMESTAMP
MANIPULATION
```

---

# 108. Evidence Integrity

Potential controls:

```text id="rls-099"
SOURCE
REFERENCE

HASH

VERSION

WRITE
AUTHORITY

CHANGE
HISTORY

AUDIT

IMMUTABILITY
WHERE
REQUIRED
```

---

# 109. Citation Integrity

Permanent:

```text id="rls-100"
CITATION
TEXT
LOOKS
VALID
≠
SOURCE
EXISTS
```

---

# 110. Evidence Fabrication Response

If fabricated Evidence is detected:

```text id="rls-101"
FLAG

↓

CONTAIN
AFFECTED
RESEARCH

↓

TRACE
DEPENDENT
CLAIMS

↓

REVIEW

↓

CORRECT /
INVALIDATE

↓

AUDIT
```

---

# 111. Counter-Evidence Security

Counter-Evidence should receive equivalent integrity protections.

---

# 112. Research Result Tampering

Prevent unauthorized mutation of finalized Results.

---

# 113. Result Amendment Rule

Corrections should create:

```text id="rls-102"
VERSION /
AMENDMENT /
SUPERSESSION
```

rather than silent rewriting.

---

# 114. Simulation Security

Simulations may execute complex code or Models.

Controls should address:

```text id="rls-103"
RESOURCE
LIMITS

DATA
ACCESS

NETWORK

MODEL
ACCESS

CODE
EXECUTION

OUTPUT
CLASSIFICATION

SANDBOX
```

---

# 115. Simulation Boundary

```text id="rls-104"
SIMULATION
ENVIRONMENT
≠
PRODUCTION
ENVIRONMENT
```

---

# 116. Prototype Security

Prototypes are especially high-risk because they may be rapidly built and under-hardened.

Default:

```text id="rls-105"
NO
PRODUCTION
SECRETS

NO
UNNECESSARY
PRODUCTION
DATA

NO
UNRESTRICTED
NETWORK

LIMITED
USERS

LIMITED
LIFETIME

LIMITED
TOOLS

STRONG
LOGGING
```

---

# 117. Prototype Boundary

Permanent:

```text id="rls-106"
PROTOTYPE
DEMO
WORKS
≠
PROTOTYPE
SECURE
```

---

# 118. Prototype-to-Production Boundary

```text id="rls-107"
PROTOTYPE
CODE
≠
PRODUCTION
CODE
AUTOMATICALLY
```

---

# 119. Prototype Expiry

Research Prototypes should have explicit disposition:

```text id="rls-108"
DESTROY

ARCHIVE

REBUILD
PROPERLY

TRANSFER
FOR
ENGINEERING
```

---

# 120. Architecture Research Security

Alternative architectures should be tested without exposing Production infrastructure unnecessarily.

---

# 121. Security Research

Research investigating Security controls may require elevated governance because it may involve offensive techniques or sensitive system information.

---

# 122. Security Research Boundary

```text id="rls-109"
SECURITY
RESEARCH
PURPOSE
≠
UNLIMITED
ATTACK
AUTHORITY
```

---

# 123. Technology Radar Security

Technology Radar entries may include Security posture as a first-class dimension.

Evaluate:

```text id="rls-110"
VULNERABILITY
HISTORY

SUPPLY
CHAIN

DATA
HANDLING

ACCESS
MODEL

UPDATE
MODEL

MAINTAINER
HEALTH

SECURITY
ARCHITECTURE
```

---

# 124. Radar Boundary

```text id="rls-111"
TECHNOLOGY
RADAR
ADOPT
≠
SECURITY
APPROVAL
```

---

# 125. Academic Research Security

Academic code, papers and Datasets should be treated according to source trust—not reputation alone.

---

# 126. Academic Boundary

```text id="rls-112"
ACADEMIC
SOURCE
≠
SAFE
SOFTWARE
```

---

# 127. Market Research Security

Market Research may involve customer, prospect or commercially sensitive information.

Protect:

```text id="rls-113"
CUSTOMER
IDENTITY

CONTACT
DATA

COMMERCIAL
TERMS

PRICING
INTELLIGENCE

SALES
DATA

RESEARCH
NOTES

SURVEY
RESPONSES
```

---

# 128. Competitive Intelligence Security

Competitive Intelligence must use lawful and authorized methods.

---

# 129. Competitive Intelligence Boundary

```text id="rls-114"
COMPETITIVE
INTELLIGENCE
≠
UNAUTHORIZED
ACCESS
```

---

# 130. External Collaboration Security

External collaborators should receive scoped:

```text id="rls-115"
IDENTITY

ROLE

DATA
ACCESS

PROJECT
ACCESS

TENANT
ACCESS

TOOL
ACCESS

ENVIRONMENT

DURATION

EXPORT
RIGHTS
```

---

# 131. Collaboration Boundary

Permanent:

```text id="rls-116"
TRUSTED
COLLABORATOR
≠
UNRESTRICTED
ACCESS
```

---

# 132. Collaboration Offboarding

On termination:

```text id="rls-117"
REVOKE
ACCESS

REVOKE
TOKENS

ROTATE
SHARED
SECRETS
WHERE
REQUIRED

CONFIRM
DATA
DISPOSITION

PRESERVE
AUDIT
```

---

# 133. Publication Security

Before external Research publication, assess:

```text id="rls-118"
SECRETS

CUSTOMER
DATA

TENANT
DATA

PROJECT
CONFIDENTIALITY

PROPRIETARY
METHODS

SECURITY
VULNERABILITIES

EXPLOIT
DETAILS

INTELLECTUAL
PROPERTY

CONTRACTUAL
RESTRICTIONS
```

---

# 134. Publication Boundary

Permanent:

```text id="rls-119"
RESEARCH
IS
TRUE
≠
RESEARCH
IS
SAFE
TO
PUBLISH
```

---

# 135. Intellectual Property Security

Protect:

```text id="rls-120"
INVENTIONS

PATENT
CANDIDATES

TRADE
SECRETS

PROPRIETARY
DATASETS

PROPRIETARY
BENCHMARKS

PROMPT
METHODS

AGENT
ARCHITECTURES

RESEARCH
METHODS
```

---

# 136. IP Disclosure Boundary

```text id="rls-121"
INTERNAL
RESEARCH
ACCESS
≠
PUBLIC
DISCLOSURE
AUTHORITY
```

---

# 137. Knowledge Transfer Security

Knowledge Transfer packages may contain sensitive Research context.

Protect:

```text id="rls-122"
SOURCE
DATA

EVIDENCE

LIMITATIONS

PROTOTYPE
DETAILS

SECURITY
FINDINGS

IP

CUSTOMER
CONTEXT
```

---

# 138. Transfer Boundary

```text id="rls-123"
TRANSFER
PACKAGE
AUTHORIZED
FOR
TARGET
TEAM
≠
GENERAL
ENTERPRISE
VISIBILITY
```

---

# 139. Memory Security

Research Memory introduces persistence risk.

Threats include:

```text id="rls-124"
SENSITIVE
MEMORY
LEAKAGE

CROSS-PROJECT
RETRIEVAL

CROSS-TENANT
RETRIEVAL

MEMORY
POISONING

STALE
AUTHORITY
MEMORY

SECRET
PERSISTENCE
```

---

# 140. Memory Write Security

Writes should validate:

```text id="rls-125"
ACTOR

PROJECT

TENANT

PURPOSE

CLASSIFICATION

RETENTION

CONTENT
TYPE
```

---

# 141. Memory Boundary

Permanent:

```text id="rls-126"
MEMORY
CAN
STORE
INFORMATION
≠
MEMORY
MAY
STORE
EVERYTHING
```

---

# 142. Authority Memory Boundary

```text id="rls-127"
MEMORY
SAYS
USER
WAS
ADMIN
≠
USER
IS
CURRENTLY
ADMIN
```

---

# 143. Knowledge Security

Canonical Knowledge should not be writable directly from untrusted Research output.

---

# 144. Knowledge Boundary

```text id="rls-128"
RESEARCH
OUTPUT
≠
CANONICAL
KNOWLEDGE
WRITE
AUTHORITY
```

---

# 145. Intelligence Engine Security

Research Evidence delivered to Intelligence Engine should preserve:

```text id="rls-129"
SOURCE

SCOPE

PROJECT

TENANT

CLASSIFICATION

PROVENANCE

LIMITATIONS

TRUST
STATE
```

---

# 146. Intelligence Boundary

```text id="rls-130"
INTELLIGENCE
ENGINE
CAN
READ
EVIDENCE
≠
INTELLIGENCE
ENGINE
CAN
BYPASS
RESEARCH
SECURITY
```

---

# 147. Supply-Chain Security

Research infrastructure may depend on:

```text id="rls-131"
PACKAGES

CONTAINERS

MODELS

MODEL
WEIGHTS

DATASETS

BROWSER
TOOLS

AGENT
FRAMEWORKS

BENCHMARK
LIBRARIES

CI/CD
ACTIONS

CLOUD
SERVICES
```

---

# 148. Supply-Chain Threats

Potential:

```text id="rls-132"
MALICIOUS
PACKAGE

DEPENDENCY
CONFUSION

COMPROMISED
MAINTAINER

MALICIOUS
MODEL
ARTIFACT

TAMPERED
CONTAINER

VULNERABLE
LIBRARY

COMPROMISED
CI
ACTION
```

---

# 149. Supply-Chain Controls

Target:

```text id="rls-133"
PINNING

LOCKFILES

HASH
VERIFICATION

SIGNATURES
WHERE
AVAILABLE

DEPENDENCY
SCANNING

SBOM
WHERE
APPROPRIATE

VULNERABILITY
MONITORING

TRUSTED
REGISTRIES

CONTROLLED
UPDATES
```

---

# 150. Dependency Boundary

```text id="rls-134"
POPULAR
PACKAGE
≠
TRUSTED
PACKAGE
AUTOMATICALLY
```

---

# 151. Model Supply-Chain Security

Downloaded Models or weights may require:

```text id="rls-135"
SOURCE
VALIDATION

HASH

FORMAT
SAFETY

LICENSE
CHECK

MALWARE /
PICKLE
RISK
ASSESSMENT

SANDBOXED
LOAD
```

---

# 152. Container Security

Research containers should eventually support:

```text id="rls-136"
MINIMAL
IMAGES

NON-ROOT
EXECUTION

READ-ONLY
FILESYSTEM
WHERE
POSSIBLE

RESOURCE
LIMITS

IMAGE
SCANNING

SIGNED
ARTIFACTS
WHERE
APPROPRIATE
```

---

# 153. Network Security

Research workloads should receive only necessary network access.

Potential controls:

```text id="rls-137"
NETWORK
SEGMENTATION

EGRESS
ALLOWLIST

INGRESS
RESTRICTION

PRIVATE
ENDPOINTS

DNS
CONTROL

PROXY

TLS

RATE
LIMITING
```

---

# 154. Network Boundary

Permanent:

```text id="rls-138"
INTERNET
ACCESS
USEFUL
FOR
RESEARCH
≠
UNRESTRICTED
INTERNET
ACCESS
REQUIRED
```

---

# 155. Egress Security

High-risk environments should control destinations capable of receiving sensitive Data.

---

# 156. DNS Exfiltration

Security should consider non-obvious exfiltration paths such as DNS where relevant.

---

# 157. Browser Security

Research browser sessions may require:

```text id="rls-139"
SESSION
ISOLATION

DOWNLOAD
CONTROL

COOKIE
ISOLATION

CREDENTIAL
ISOLATION

DOMAIN
POLICY

FILE
SCANNING
```

---

# 158. Cloud Security

Research workloads using cloud infrastructure should follow:

```text id="rls-140"
SEPARATE
ACCOUNTS /
PROJECTS
WHERE
APPROPRIATE

IAM

NETWORK
BOUNDARIES

ENCRYPTION

LOGGING

BUDGET
LIMITS

REGION
CONTROLS

RESOURCE
TAGS
```

---

# 159. Cloud Boundary

```text id="rls-141"
CLOUD
RESOURCE
CREATED
≠
CLOUD
RESOURCE
SECURE
```

---

# 160. Storage Security

Research storage should secure:

```text id="rls-142"
DATA
AT
REST

ACCESS

BACKUPS

VERSIONING

RETENTION

DELETION

TENANT
SCOPE

PROJECT
SCOPE

AUDIT
```

---

# 161. Encryption

Sensitive Research Data should use appropriate encryption in transit and at rest.

---

# 162. Encryption Boundary

```text id="rls-143"
ENCRYPTED
≠
AUTHORIZED
```

Encryption does not replace access control.

---

# 163. Backup Security

Backups may contain sensitive Research assets.

Protect:

```text id="rls-144"
ACCESS

ENCRYPTION

RETENTION

RESTORE
AUTHORITY

PROJECT /
TENANT
SCOPE

DELETION
POLICY
```

---

# 164. Backup Boundary

```text id="rls-145"
PRIMARY
RECORD
DELETED
≠
BACKUP
COPY
DELETED
AUTOMATICALLY
```

---

# 165. Logging Security

Logs may unintentionally contain:

```text id="rls-146"
SECRETS

PROMPTS

CUSTOMER
DATA

TENANT
DATA

MODEL
INPUTS

MODEL
OUTPUTS

TOOL
RESULTS

STACK
TRACES

TOKENS
```

---

# 166. Logging Minimization

Log enough for Security and audit without dumping sensitive content unnecessarily.

---

# 167. Audit Security

Audit logs should resist:

```text id="rls-147"
DELETION

ALTERATION

REORDERING

FORGED
IDENTITY

FORGED
TIMESTAMPS

MISSING
EVENTS
```

---

# 168. Audit Integrity

Potential controls:

```text id="rls-148"
APPEND-ORIENTED
STORAGE

RESTRICTED
WRITE

SEPARATE
AUDIT
ROLE

HASHING /
SIGNING
WHERE
APPROPRIATE

OFF-SYSTEM
COPIES
WHERE
REQUIRED
```

---

# 169. Audit Boundary

Permanent:

```text id="rls-149"
LOG
EXISTS
≠
LOG
TRUSTWORTHY
```

---

# 170. Security Monitoring

Monitor for:

```text id="rls-150"
AUTHORIZATION
DENIAL
SPIKES

PROJECT
BOUNDARY
ATTEMPTS

TENANT
BOUNDARY
ATTEMPTS

UNUSUAL
DATA
EXPORT

SECRET
ACCESS

UNUSUAL
TOOL
USE

UNUSUAL
MODEL
USE

HIGH
EGRESS

AGENT
PRIVILEGE
ATTEMPTS

PROMPT
INJECTION
SIGNALS

MALWARE

PROTOTYPE
ESCAPE

AUDIT
TAMPERING
```

---

# 171. Security Monitoring Boundary

```text id="rls-151"
NO
ALERT
≠
NO
ATTACK
```

---

# 172. Detection Engineering

Research Security should eventually maintain detections for known Research-specific threat patterns.

---

# 173. Anomaly Detection Boundary

```text id="rls-152"
ANOMALY
≠
MALICIOUS
ACTIVITY
AUTOMATICALLY
```

---

# 174. Research Security Incident Lifecycle

```text id="rls-153"
DETECT

↓

TRIAGE

↓

CLASSIFY

↓

CONTAIN

↓

HALT
WHERE
REQUIRED

↓

PRESERVE
EVIDENCE

↓

ERADICATE

↓

RECOVER

↓

REAUTHORIZE

↓

POST-
INCIDENT
REVIEW
```

---

# 175. Incident Classification

Potential:

```text id="rls-154"
CREDENTIAL
EXPOSURE

DATA
EXFILTRATION

PROJECT
LEAKAGE

TENANT
LEAKAGE

MALWARE

PROMPT
INJECTION

AUTHORITY
INJECTION

DATASET
POISONING

BENCHMARK
TAMPERING

MODEL
COMPROMISE

AGENT
SCOPE
ESCAPE

TOOL
ABUSE

PROTOTYPE
ESCAPE

AUDIT
TAMPERING

IP
LEAKAGE
```

---

# 176. Incident Containment

Containment may include:

```text id="rls-155"
HALT
RESEARCH

DISABLE
AGENT

DISABLE
TOOL

REVOKE
TOKEN

ROTATE
SECRET

BLOCK
EGRESS

QUARANTINE
DATASET

QUARANTINE
MODEL

ISOLATE
ENVIRONMENT

FREEZE
RESULTS
```

---

# 177. Containment Boundary

Permanent:

```text id="rls-156"
INCIDENT
CONTAINED
≠
INCIDENT
RESOLVED
```

---

# 178. Recovery Boundary

```text id="rls-157"
SYSTEM
RESTORED
≠
RESEARCH
RESUME
AUTHORIZED
```

---

# 179. Reauthorization After Incident

Material Research should revalidate:

```text id="rls-158"
IDENTITY

AUTHORITY

SCOPE

DATA
INTEGRITY

MODEL
INTEGRITY

TOOL
INTEGRITY

ENVIRONMENT

RISK
```

before Resume where required.

---

# 180. HALT Security

HALT must be capable of stopping:

```text id="rls-159"
EXPERIMENTS

BENCHMARKS

AGENTS

AUTOMATIONS

MODEL
CALLS

TOOLS

NETWORK
EGRESS

PROTOTYPES

DATA
EXPORT
```

where architecture supports it.

---

# 181. HALT Boundary

```text id="rls-160"
HALT
COMMAND
ISSUED
≠
ALL
ACTIVITY
CONFIRMED
STOPPED
```

---

# 182. HALT Verification

Research Security should verify post-HALT:

```text id="rls-161"
NO
ACTIVE
WORKER

NO
ACTIVE
JOB

NO
ONGOING
EGRESS

NO
ACTIVE
AGENT
CHAIN

NO
UNRESOLVED
SIDE
EFFECT
```

as appropriate.

---

# 183. Unknown Outcome Security

When external systems time out:

```text id="rls-162"
NO
RESPONSE
≠
ACTION
DID
NOT
OCCUR
```

---

# 184. Unknown Outcome Handling

Use:

```text id="rls-163"
RECONCILIATION

BEFORE

RETRY
OR
FINAL
STATE
```

for material external side effects.

---

# 185. Resource Abuse Security

Research workloads may consume excessive:

```text id="rls-164"
CPU

GPU

MEMORY

STORAGE

MODEL
TOKENS

NETWORK

API
QUOTA

MONEY
```

---

# 186. Resource Controls

Potential:

```text id="rls-165"
QUOTAS

TIMEOUTS

BUDGET
LIMITS

CONCURRENCY
LIMITS

RATE
LIMITS

JOB
LIMITS

AUTO-HALT
THRESHOLDS
```

---

# 187. Cost Boundary

```text id="rls-166"
WITHIN
TECHNICAL
RESOURCE
LIMIT
≠
FINANCIAL
SPEND
AUTHORIZED
```

---

# 188. Denial-of-Service Resilience

Research Security should protect critical Research services from:

```text id="rls-167"
RUNAWAY
AGENTS

MALICIOUS
INPUTS

RETRY
STORMS

LARGE
DATASETS

MODEL
CALL
FLOODS

EXPENSIVE
BENCHMARKS

EXTERNAL
ATTACKS
```

---

# 189. Vulnerability Management

Research infrastructure should eventually support:

```text id="rls-168"
DISCOVERY

TRIAGE

SEVERITY

OWNERSHIP

PATCHING

MITIGATION

VERIFICATION

EXCEPTION

RETEST
```

---

# 190. Patch Boundary

```text id="rls-169"
PATCH
APPLIED
≠
VULNERABILITY
REMEDIATED
UNTIL
VERIFIED
```

---

# 191. Security Testing

Required future Security testing may include:

```text id="rls-170"
AUTHENTICATION
TESTS

AUTHORIZATION
TESTS

PROJECT
ISOLATION
TESTS

TENANT
ISOLATION
TESTS

PROMPT
INJECTION
TESTS

AUTHORITY
INJECTION
TESTS

SECRET
LEAK
TESTS

EGRESS
TESTS

SANDBOX
ESCAPE
TESTS

AGENT
SCOPE
TESTS

TOOL
ABUSE
TESTS

DATASET
POISONING
TESTS

BENCHMARK
INTEGRITY
TESTS

PROTOTYPE
ISOLATION
TESTS

AUDIT
TAMPERING
TESTS

HALT
TESTS

RECOVERY
TESTS
```

---

# 192. Security Test Boundary

Permanent:

```text id="rls-171"
SECURITY
TEST
PASS
≠
SYSTEM
UNHACKABLE
```

---

# 193. Penetration Testing

Controlled Research platform penetration testing may be required before Production depending on risk.

---

# 194. Penetration Test Boundary

```text id="rls-172"
PENTEST
PASS
≠
PRODUCTION
AUTHORIZATION
AUTOMATICALLY
```

---

# 195. AI Red-Team Security

Research AI systems should eventually be tested against:

```text id="rls-173"
JAILBREAKS

INDIRECT
INJECTION

AUTHORITY
SPOOFING

SECRET
EXTRACTION

TOOL
MISUSE

DATA
EXFILTRATION

CROSS-TENANT
LEAKAGE

CROSS-PROJECT
LEAKAGE

SYSTEM
PROMPT
EXTRACTION

UNSAFE
AUTONOMOUS
BEHAVIOR
```

---

# 196. Research Security Review Classes

Potential conceptual review tiers:

```text id="rls-174"
S0
=
STANDARD
CONTROL

S1
=
ENHANCED
REVIEW

S2
=
SECURITY
ENGINEERING
REVIEW

S3
=
HIGH-RISK
SECURITY
APPROVAL

S4
=
CRITICAL /
FOUNDER /
ENTERPRISE
ESCALATION
WHERE
REQUIRED
```

Exact mapping requires separate governance approval.

---

# 197. Security Review Boundary

```text id="rls-175"
SECURITY
REVIEW
COMPLETE
≠
BUSINESS
RISK
ACCEPTED
```

---

# 198. Research Security Exceptions

Security exceptions must be:

```text id="rls-176"
EXPLICIT

SCOPED

TIME-BOUND

JUSTIFIED

APPROVED

AUDITED

REVOCABLE

COMPENSATED
BY
OTHER
CONTROLS
WHERE
REQUIRED
```

---

# 199. Security Exception Boundary

Permanent:

```text id="rls-177"
ONE
EXCEPTION
≠
GENERAL
RESEARCH
POLICY
```

---

# 200. Expired Security Exception

```text id="rls-178"
EXPIRED
EXCEPTION

↓

NO
LONGER
VALID
```

---

# 201. Security Baseline for Research Agents

Before material Agent Research runtime, verify:

```text id="rls-179"
AGENT
IDENTITY

TRUSTED
SCOPE

TOOL
POLICY

MODEL
POLICY

PROMPT
POLICY

DATA
POLICY

NETWORK
POLICY

SECRET
POLICY

AUTONOMY
CEILING

HALT

AUDIT
```

---

# 202. Security Baseline for Experiments

Verify:

```text id="rls-180"
AUTHORIZED
INPUTS

ISOLATED
ENVIRONMENT

NO
UNNECESSARY
PRODUCTION
ACCESS

SCOPED
SECRETS

CONTROLLED
NETWORK

TRACEABLE
CONFIGURATION

RESOURCE
LIMITS

AUDIT
```

---

# 203. Security Baseline for Prototypes

Verify:

```text id="rls-181"
NON-PRODUCTION
DEFAULT

LIMITED
LIFETIME

LIMITED
USERS

LIMITED
NETWORK

NO
PRODUCTION
SECRETS
BY
DEFAULT

TEST /
SYNTHETIC
DATA
WHERE
POSSIBLE

AUDIT /
LOGGING
```

---

# 204. Security Baseline for External Research

Verify:

```text id="rls-182"
SOURCE
UNTRUSTED
BY
DEFAULT

NO
AUTHORITY
FROM
CONTENT

DOWNLOAD
CONTROLS

FILE
SCANNING

SANDBOX
WHERE
REQUIRED

CITATION
VERIFICATION

DATA
CLASSIFICATION
```

---

# 205. Research Security Metrics Domains

Potential Security metrics include:

```text id="rls-183"
AUTHORIZATION
DENIALS

PROJECT
ISOLATION
VIOLATIONS

TENANT
ISOLATION
VIOLATIONS

SECRET
EXPOSURES

PROMPT
INJECTION
ATTEMPTS

AUTHORITY
INJECTION
ATTEMPTS

UNTRUSTED
FILE
DETECTIONS

MALWARE
DETECTIONS

DATA
EXFILTRATION
ALERTS

AGENT
PRIVILEGE
ATTEMPTS

HALT
EVENTS

SECURITY
INCIDENTS

PATCH
LATENCY

VULNERABILITY
BACKLOG
```

Exact definitions and targets belong in `research-metrics.md`.

---

# 206. Security Metrics Boundary

```text id="rls-184"
ZERO
DETECTED
ATTACKS
≠
ZERO
ATTACKS
```

---

# 207. Security Monitoring Maturity

Target progression:

```text id="rls-185"
LOGGING

↓

METRICS

↓

ALERTING

↓

CORRELATION

↓

ANOMALY
DETECTION

↓

AUTOMATED
CONTAINMENT
WITHIN
POLICY

↓

HUMAN
INCIDENT
RESPONSE
```

---

# 208. Automated Containment Boundary

Permanent:

```text id="rls-186"
AUTOMATED
CONTAINMENT
≠
AUTOMATED
RISK
ACCEPTANCE
```

---

# 209. Research Security Conceptual Context Schema

```yaml id="rls-187"
research_security_context:
  actor_ref: required
  actor_type: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional
  purpose_id: required

  environment: required

  risk_class: required
  autonomy_level: required

  data_classifications: []

  model_refs: []
  agent_refs: []
  tool_refs: []

  authorization_ref: required

  security_policy_refs: []

  audit_ref: required
```

---

# 210. Tool Authorization Schema

```yaml id="rls-188"
research_tool_authorization:
  tool_ref: required
  actor_ref: required

  allowed_actions: []

  project_id: conditional
  tenant_id: conditional
  purpose_id: required

  network_scope: []
  data_scope: []
  secret_scope: []

  valid_until: conditional

  authorization_ref: required
```

---

# 211. Dataset Security Schema

```yaml id="rls-189"
research_dataset_security:
  dataset_ref: required
  dataset_version: required

  classification: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional

  allowed_purposes: []

  allowed_actor_refs: []

  region_restrictions: []

  export_allowed: required

  provenance_verified: required

  integrity_status: required
```

---

# 212. Research Security Incident Schema

```yaml id="rls-190"
research_security_incident:
  incident_id: required

  incident_type: required
  severity: required

  detected_at: required
  detected_by_ref: required

  organization_id: required
  project_id: conditional
  tenant_id: conditional

  affected_assets: []

  containment_actions: []

  evidence_refs: []

  halt_required: required

  recovery_status: required

  resume_authority_ref: conditional
```

---

# 213. HALT Security Schema

```yaml id="rls-191"
research_security_halt:
  halt_id: required

  trigger_ref: required
  research_ref: conditional

  actor_ref: required
  authority_ref: required

  affected_workloads: []

  containment_state: required

  reconciliation_state: required

  resume_authorized: false
```

---

# 214. Positive Security Verification Scenarios

Future verification should test at least:

```text id="rls-192"
RS-01
AUTHENTICATED
USER
WITHOUT
AUTHORITY
IS
DENIED

RS-02
EXPIRED
AUTHORIZATION
IS
DENIED

RS-03
PROJECT A
CANNOT
READ
PROJECT B

RS-04
TENANT A
CANNOT
READ
TENANT B

RS-05
UNTRUSTED
PROJECT ID
CANNOT
OVERRIDE
TRUSTED
SCOPE

RS-06
UNTRUSTED
TENANT ID
CANNOT
OVERRIDE
TRUSTED
SCOPE

RS-07
DATASET
REQUIRES
AUTHORIZED
PURPOSE

RS-08
PRODUCTION
DATA
NOT
AVAILABLE
WITHOUT
EXPLICIT
AUTHORITY

RS-09
SECRET
NOT
EMBEDDED
IN
RESEARCH
LOG

RS-10
UNTRUSTED
FILE
RUNS
IN
CONTROLLED
ENVIRONMENT

RS-11
WEBPAGE
PROMPT
INJECTION
DOES
NOT
GAIN
AUTHORITY

RS-12
DOCUMENT
CLAIMING
FOUNDER
APPROVAL
DOES
NOT
CREATE
APPROVAL

RS-13
MODEL
OUTPUT
CANNOT
CREATE
AUTHORITY

RS-14
AGENT
CANNOT
SELF-INCREASE
AUTONOMY

RS-15
AGENT
CANNOT
SELF-GRANT
TOOL

RS-16
TOOL
CONNECTED
BUT
OUTSIDE
SCOPE
IS
DENIED

RS-17
MULTI-AGENT
MESSAGE
PRESERVES
SCOPE

RS-18
EXPERIMENT
CANNOT
USE
UNAUTHORIZED
SECRET

RS-19
DATASET
INTEGRITY
VERSION
BOUND

RS-20
BENCHMARK
SCORER
VERSION
BOUND

RS-21
RESULT
TAMPERING
IS
DETECTED /
PREVENTED

RS-22
PROTOTYPE
CANNOT
ACCESS
PRODUCTION
BY
DEFAULT

RS-23
EXTERNAL
COLLABORATOR
ACCESS
EXPIRES

RS-24
PUBLICATION
PATH
PROTECTS
SECRETS /
IP

RS-25
MEMORY
DOES
NOT
CROSS
TENANT
BOUNDARY

RS-26
KNOWLEDGE
WRITE
REQUIRES
SEPARATE
AUTHORITY

RS-27
EGRESS
CONTROL
BLOCKS
UNAUTHORIZED
DESTINATION

RS-28
SECRET
ROTATION
INVALIDATES
OLD
CREDENTIAL

RS-29
AUDIT
EVENT
RECORDED
FOR
PRIVILEGED
ACTION

RS-30
HALT
STOPS
AUTHORIZED
WORKLOADS

RS-31
POST-HALT
ACTIVITY
IS
RECONCILED

RS-32
RESUME
REQUIRES
REAUTHORIZATION

RS-33
UNKNOWN
OUTCOME
DOES
NOT
TRIGGER
BLIND
RETRY

RS-34
VULNERABILITY
PATCH
IS
RETESTED

RS-35
PILOT
PASS
DOES
NOT
AUTO-AUTHORIZE
PRODUCTION
```

---

# 215. Negative Security Verification Scenarios

Security verification should test containment when:

* unauthenticated actor requests Research Data.
* authenticated Researcher requests unauthorized Project.
* Tenant A identifier is replaced with Tenant B in request payload.
* Research Agent attempts to read unrestricted Production secrets.
* Research Agent discovers a new Tool and tries to install or authorize it itself.
* malicious webpage instructs Agent to upload Research Data externally.
* PDF contains hidden instruction claiming higher authority.
* Dataset contains Prompt Injection instructions.
* Dataset hash changes without version change.
* Benchmark test set leaks into optimization context.
* scorer is modified after baseline without Benchmark version change.
* Model response claims Security exception.
* Agent response claims Founder approval.
* Tool output asks the Agent to ignore system policy.
* external connector attempts broader permissions than approved.
* automated retry repeats external side effect.
* untrusted code attempts filesystem escape.
* untrusted code attempts unrestricted network egress.
* prototype requests Production database credentials.
* prototype remains running beyond approved expiry.
* external collaborator attempts access after offboarding.
* Research publication contains Project confidential Data.
* Research publication leaks proprietary Prompt or Agent architecture.
* Memory lookup returns Tenant B Research in Tenant A context.
* Knowledge Transfer includes unauthorized source Data.
* audit log write is attempted by ordinary Research Agent.
* security incident occurs and automatic Resume is attempted.
* expired Security exception is reused.
* Pilot environment is labeled Production-ready without separate authorization.

---

# 216. Research-Specific Threat Matrix

| Threat                     | Primary Target     | Expected Control Family               | Default Security Position                |
| -------------------------- | ------------------ | ------------------------------------- | ---------------------------------------- |
| Prompt Injection           | Agents / Models    | Trust Separation + Tool Authorization | Treat as untrusted Data                  |
| Authority Injection        | Governance         | Trusted Authorization Source          | Reject content-derived authority         |
| Dataset Poisoning          | Evidence / Models  | Provenance + Integrity + Validation   | Quarantine / Review                      |
| Benchmark Contamination    | Evaluations        | Holdouts + Access + Versioning        | Mark contaminated / invalidate as needed |
| Secret Leakage             | Credentials        | Secret Manager + Redaction + Scope    | Revoke / rotate                          |
| Cross-Project Leakage      | Project Data       | Project Isolation                     | Deny                                     |
| Cross-Tenant Leakage       | Tenant Data        | Tenant Isolation                      | Deny / HALT                              |
| Agent Privilege Escalation | Tools / Data       | External Policy Enforcement           | Deny                                     |
| Prototype Escape           | Production         | Sandbox + Network Isolation           | Contain / HALT                           |
| Tool Abuse                 | External Systems   | Tool Authorization + Audit            | Deny / escalate                          |
| Evidence Tampering         | Research Integrity | Immutable History + Audit             | Reject / investigate                     |
| Citation Fabrication       | Research Integrity | Source Verification                   | Flag / reject                            |
| Audit Tampering            | Accountability     | Restricted Audit Store                | Incident                                 |
| Supply-Chain Compromise    | Runtime            | Scanning + Pinning + Verification     | Quarantine                               |
| Data Exfiltration          | Sensitive Data     | Egress + DLP + Access Control         | Block / incident                         |

---

# 217. Research Security Verification Domains

Production-oriented verification should separately cover:

```text id="rls-193"
IDENTITY

AUTHENTICATION

AUTHORIZATION

DELEGATION

PROJECT
ISOLATION

TENANT
ISOLATION

PURPOSE
LIMITATION

DATA
SECURITY

DATASET
SECURITY

SECRET
SECURITY

SANDBOX

NETWORK

EGRESS

MODEL
SECURITY

PROMPT
SECURITY

AGENT
SECURITY

MULTI-AGENT
SECURITY

TOOL
SECURITY

AUTOMATION
SECURITY

EXPERIMENT
SECURITY

BENCHMARK
SECURITY

PROTOTYPE
SECURITY

SUPPLY
CHAIN

AUDIT

MONITORING

INCIDENT
RESPONSE

HALT /
RECOVERY
```

---

# 218. Security Assurance Evidence

Valid future evidence may include:

```text id="rls-194"
CODE

CONFIGURATION

IAM
POLICY

NETWORK
POLICY

SECRET
POLICY

SANDBOX
CONFIGURATION

AUDIT
TRACE

PENETRATION
TEST

SECURITY
TEST
RESULT

PROJECT
ISOLATION
TEST

TENANT
ISOLATION
TEST

PROMPT
INJECTION
TEST

INCIDENT
DRILL

HALT
TEST

RECOVERY
TEST
```

---

# 219. Security Evidence Boundary

Permanent:

```text id="rls-195"
SECURITY
DOCUMENT
≠
SECURITY
ASSURANCE
EVIDENCE
```

---

# 220. Research Security Maturity Model

Conceptual:

```text id="rls-196"
RSM0
=
RESEARCH
SECURITY
DOCUMENTED

RSM1
=
THREAT
MODEL /
TRUST
BOUNDARIES /
SECURITY
PRINCIPLES
DEFINED

RSM2
=
IDENTITY /
AUTHORIZATION /
PROJECT /
TENANT /
DATA
SECURITY
DESIGNED

RSM3
=
SECRETS /
SANDBOX /
NETWORK /
EGRESS
CONTROLS
IMPLEMENTED

RSM4
=
MODEL /
PROMPT /
AGENT /
TOOL /
AUTOMATION
SECURITY
IMPLEMENTED

RSM5
=
EXPERIMENT /
BENCHMARK /
PROTOTYPE /
SUPPLY-CHAIN
SECURITY
IMPLEMENTED

RSM6
=
MONITORING /
AUDIT /
INCIDENT /
HALT /
RECOVERY
INTEGRATED

RSM7
=
SECURITY /
PROJECT /
TENANT /
PROMPT-INJECTION /
AUTHORITY-INJECTION
CONTROLS
VERIFIED

RSM8
=
CONTROLLED
RESEARCH
SECURITY
PILOT
VERIFIED

RSM9
=
PRODUCTION
RESEARCH
SECURITY
SEPARATELY
AUTHORIZED
```

---

# 221. Security Maturity Boundary

Permanent:

```text id="rls-197"
RSM8
≠
RSM9
```

---

# 222. Research Security Documentation Checklist

## Security Foundation

* [x] Security mission defined.
* [x] Security principles defined.
* [x] threat model defined.
* [x] protected assets defined.
* [x] trust domains defined.
* [x] trust-boundary rule defined.

## Identity and Authority

* [x] identity Security defined.
* [x] authentication vs authorization separated.
* [x] Founder impersonation boundary defined.
* [x] authorization context defined.
* [x] fail-closed principle defined.
* [x] Service identity Security defined.
* [x] least privilege defined.

## Isolation

* [x] Project isolation defined.
* [x] trusted Project context defined.
* [x] cross-Project learning boundary defined.
* [x] Tenant isolation defined.
* [x] Organization isolation defined.
* [x] Purpose isolation defined.

## Data Security

* [x] Data classification defined.
* [x] Data minimization defined.
* [x] Production Data boundary defined.
* [x] export Security defined.
* [x] Data exfiltration paths defined.
* [x] Dataset Security defined.
* [x] Dataset integrity defined.
* [x] Dataset poisoning defined.
* [x] poisoning controls defined.

## Secrets and Environment

* [x] secrets Security defined.
* [x] Secret references defined.
* [x] rotation defined.
* [x] Research/Production environment separation defined.
* [x] Sandbox Security defined.
* [x] untrusted Code Security defined.
* [x] untrusted File Security defined.

## Prompt / Model / AI Security

* [x] Web Research Security defined.
* [x] Prompt Injection threat defined.
* [x] indirect Prompt Injection defined.
* [x] Authority Injection defined.
* [x] Model Security defined.
* [x] LLM Research Security defined.
* [x] Prompt Security defined.
* [x] Agent Security defined.
* [x] Agent privilege escalation boundary defined.
* [x] Multi-Agent Security defined.

## Tool and Automation Security

* [x] Tool Security defined.
* [x] connector Security defined.
* [x] Tool-output trust boundary defined.
* [x] Automation Security defined.
* [x] retry Security defined.
* [x] retry-storm risk defined.

## Research Execution Security

* [x] Experiment Security defined.
* [x] Experiment configuration integrity defined.
* [x] Benchmark Security defined.
* [x] benchmark integrity defined.
* [x] Evidence Security defined.
* [x] citation integrity defined.
* [x] Counter-Evidence integrity defined.
* [x] Simulation Security defined.
* [x] Prototype Security defined.
* [x] Security Research boundary defined.

## External / Publication / IP

* [x] Academic Research Security defined.
* [x] Market Research Security defined.
* [x] Competitive Intelligence Security defined.
* [x] Collaboration Security defined.
* [x] offboarding defined.
* [x] Publication Security defined.
* [x] Intellectual Property Security defined.

## Enterprise Integration

* [x] Knowledge Transfer Security defined.
* [x] Memory Security defined.
* [x] Knowledge Security defined.
* [x] Intelligence Engine Security defined.

## Infrastructure Security

* [x] supply-chain Security defined.
* [x] Model supply-chain Security defined.
* [x] container Security defined.
* [x] network Security defined.
* [x] egress Security defined.
* [x] browser Security defined.
* [x] cloud Security defined.
* [x] storage Security defined.
* [x] encryption boundary defined.
* [x] backup Security defined.

## Monitoring and Response

* [x] logging Security defined.
* [x] audit integrity defined.
* [x] monitoring defined.
* [x] anomaly detection boundary defined.
* [x] incident lifecycle defined.
* [x] containment defined.
* [x] HALT defined.
* [x] unknown outcome defined.
* [x] reauthorization after incident defined.

## Resilience and Verification

* [x] resource abuse Security defined.
* [x] DoS resilience defined.
* [x] vulnerability management defined.
* [x] Security testing defined.
* [x] AI red-team testing defined.
* [x] Security exceptions defined.
* [x] positive verification scenarios defined.
* [x] negative verification scenarios defined.
* [x] threat matrix defined.
* [x] maturity model defined.
* [x] Runtime Truth defined.
* [x] Production hard stops defined.

---

# 223. Repository Evidence Boundary

The established Research Lab root structure includes:

```text id="rls-198"
doc/26-research-lab/research-security.md
```

and a specialized Security folder:

```text id="rls-199"
doc/26-research-lab/security/
```

This root document owns **module-wide Research Security**.

The specialized folder may contain detailed Security specifications.

---

# 224. Root-vs-Specialized Security Boundary

Permanent:

```text id="rls-200"
research-security.md
≠
security/
DUPLICATE
AUTOMATICALLY
```

---

# 225. Specialized Security Inventory Boundary

```text id="rls-201"
SECURITY
FOLDER
VISIBLE
≠
INTERNAL
SECURITY
FILES
VERIFIED
```

---

# 226. Repository Save Boundary

This document is generated for:

```text id="rls-202"
doc/26-research-lab/research-security.md
```

Permanent:

```text id="rls-203"
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

# 227. Current Documentation Truth

```text id="rls-204"
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
BY
THIS
DOCUMENT
```

---

# 228. Current Runtime Truth

Nothing in this document independently proves Security runtime implementation.

```text id="rls-205"
RESEARCH_IDENTITY_SECURITY
=
NOT_PROVEN

RESEARCH_AUTHORIZATION_SECURITY
=
NOT_PROVEN

PROJECT_ISOLATION_SECURITY
=
NOT_PROVEN

TENANT_ISOLATION_SECURITY
=
NOT_PROVEN

PURPOSE_LIMITATION_SECURITY
=
NOT_PROVEN

RESEARCH_DATA_SECURITY
=
NOT_PROVEN

DATASET_SECURITY
=
NOT_PROVEN

DATASET_POISONING_DEFENSE
=
NOT_PROVEN

SECRET_MANAGEMENT
=
NOT_PROVEN

RESEARCH_SANDBOX
=
NOT_PROVEN

NETWORK_ISOLATION
=
NOT_PROVEN

EGRESS_CONTROL
=
NOT_PROVEN

PROMPT_INJECTION_DEFENSE
=
NOT_PROVEN

AUTHORITY_INJECTION_DEFENSE
=
NOT_PROVEN

MODEL_SECURITY
=
NOT_PROVEN

PROMPT_SECURITY
=
NOT_PROVEN

AGENT_SECURITY
=
NOT_PROVEN

MULTI_AGENT_SECURITY
=
NOT_PROVEN

TOOL_SECURITY
=
NOT_PROVEN

AUTOMATION_SECURITY
=
NOT_PROVEN

EXPERIMENT_SECURITY
=
NOT_PROVEN

BENCHMARK_SECURITY
=
NOT_PROVEN

EVIDENCE_INTEGRITY_SECURITY
=
NOT_PROVEN

PROTOTYPE_SECURITY
=
NOT_PROVEN

SUPPLY_CHAIN_SECURITY
=
NOT_PROVEN

PUBLICATION_SECURITY
=
NOT_PROVEN

IP_SECURITY
=
NOT_PROVEN

MEMORY_SECURITY
=
NOT_PROVEN

RESEARCH_AUDIT_INTEGRITY
=
NOT_PROVEN

SECURITY_MONITORING
=
NOT_PROVEN

RESEARCH_INCIDENT_RESPONSE
=
NOT_PROVEN

HALT_SECURITY
=
NOT_PROVEN

SECURITY_RECOVERY
=
NOT_PROVEN

PRODUCTION_RESEARCH_SECURITY
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT
```

---

# 229. Approval Truth

```text id="rls-206"
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

SECURITY
IMPLEMENTED
=
NOT_PROVEN

SECURITY
ENFORCED
=
NOT_PROVEN

SECURITY
TESTED
=
NOT_PROVEN

SECURITY
VERIFIED
=
NOT_PROVEN

PRODUCTION
AUTHORIZED
=
NO
```

---

# 230. Production Hard Stops

Production Research Security should remain blocked where applicable if:

```text id="rls-207"
TRUSTED
IDENTITY
UNVERIFIED

AUTHORIZATION
ENFORCEMENT
UNVERIFIED

AUTHORIZATION
EXPIRY
UNVERIFIED

PROJECT
ISOLATION
UNVERIFIED

TENANT
ISOLATION
UNVERIFIED

PURPOSE
LIMITATION
UNVERIFIED

DATA
CLASSIFICATION
UNVERIFIED

PRODUCTION
DATA
BOUNDARY
UNVERIFIED

DATASET
INTEGRITY
UNVERIFIED

DATASET
POISONING
CONTROLS
UNVERIFIED

SECRET
HANDLING
UNVERIFIED

SECRET
ROTATION
UNVERIFIED

SANDBOX
ISOLATION
UNVERIFIED

UNTRUSTED
CODE
CONTROLS
UNVERIFIED

UNTRUSTED
FILE
CONTROLS
UNVERIFIED

NETWORK
ISOLATION
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

MODEL
SECURITY
UNVERIFIED

PROMPT
SECURITY
UNVERIFIED

AGENT
PRIVILEGE
BOUNDARIES
UNVERIFIED

MULTI-AGENT
ISOLATION
UNVERIFIED

TOOL
AUTHORIZATION
UNVERIFIED

AUTOMATION
BOUNDARIES
UNVERIFIED

EXPERIMENT
ISOLATION
UNVERIFIED

BENCHMARK
INTEGRITY
UNVERIFIED

EVIDENCE
INTEGRITY
UNVERIFIED

PROTOTYPE
ISOLATION
UNVERIFIED

SUPPLY-CHAIN
SECURITY
UNVERIFIED

PUBLICATION
SECURITY
UNVERIFIED

IP
SECURITY
UNVERIFIED

MEMORY
ISOLATION
UNVERIFIED

AUDIT
INTEGRITY
UNVERIFIED

SECURITY
MONITORING
UNVERIFIED

INCIDENT
RESPONSE
UNVERIFIED

HALT
UNVERIFIED

POST-HALT
RECONCILIATION
UNVERIFIED

RECOVERY
UNVERIFIED

SECURITY
REVIEW
MISSING

PRODUCTION
AUTHORIZATION
MISSING
```

---

# 231. Permanent Research Security Invariants

```text id="rls-208"
AUTHENTICATED
≠
AUTHORIZED

CONNECTED
≠
AUTHORIZED

TECHNICALLY
ACCESSIBLE
≠
PERMITTED

CONTENT
≠
AUTHORITY

PROMPT
≠
POLICY

MODEL
OUTPUT
≠
COMMAND
AUTHORITY

FOUNDER
NAME
≠
FOUNDER
APPROVAL

FOUNDER
ROUTING
≠
FOUNDER
APPROVAL

SILENCE
≠
APPROVAL

PROJECT A
ACCESS
≠
PROJECT B
ACCESS

TENANT A
ACCESS
≠
TENANT B
ACCESS

PURPOSE A
AUTHORITY
≠
PURPOSE B
AUTHORITY

MORE
DATA
≠
MORE
PERMISSION

DATASET
VISIBLE
≠
DATASET
AUTHORIZED

PRODUCTION
DATA
ACCESSIBLE
≠
RESEARCH
USE
AUTHORIZED

ENCRYPTED
≠
AUTHORIZED

SANDBOXED
≠
SAFE

FILE
PARSED
≠
FILE
TRUSTED

ACADEMIC
SOURCE
≠
SAFE
SOFTWARE

POPULAR
PACKAGE
≠
TRUSTED
PACKAGE

MODEL
AVAILABLE
≠
MODEL
SECURITY
APPROVED

RESEARCH
PROMPT
ACCESS
≠
PROMPT OS
WRITE
AUTHORITY

AGENT
CAPABILITY
≠
AGENT
PRIVILEGE

MULTI-AGENT
CONSENSUS
≠
SECURITY
APPROVAL

TOOL
CONNECTED
≠
TOOL
AUTHORIZED

AUTOMATED
≠
AUTHORIZED

EXPERIMENT
AUTHORITY
≠
PRODUCTION
AUTHORITY

BENCHMARK
INTEGRITY
≠
PRODUCTION
FIT

EVIDENCE
RECORDED
≠
EVIDENCE
TRUSTED

CITATION
LOOKS
VALID
≠
SOURCE
EXISTS

SIMULATION
ENVIRONMENT
≠
PRODUCTION
ENVIRONMENT

PROTOTYPE
WORKS
≠
PROTOTYPE
SECURE

PROTOTYPE
CODE
≠
PRODUCTION
CODE

SECURITY
RESEARCH
≠
UNLIMITED
ATTACK
AUTHORITY

RADAR
ADOPT
≠
SECURITY
APPROVAL

COMPETITIVE
INTELLIGENCE
≠
UNAUTHORIZED
ACCESS

COLLABORATOR
TRUSTED
≠
COLLABORATOR
UNRESTRICTED

RESEARCH
TRUE
≠
SAFE
TO
PUBLISH

INTERNAL
ACCESS
≠
PUBLIC
DISCLOSURE
AUTHORITY

MEMORY
≠
AUTHORITY

RESEARCH
OUTPUT
≠
CANONICAL
KNOWLEDGE
WRITE
AUTHORITY

LOG
EXISTS
≠
LOG
TRUSTWORTHY

NO
ALERT
≠
NO
ATTACK

INCIDENT
CONTAINED
≠
INCIDENT
RESOLVED

SYSTEM
RESTORED
≠
RESEARCH
RESUME
AUTHORIZED

HALT
ISSUED
≠
HALT
VERIFIED

NO
RESPONSE
≠
NO
SIDE
EFFECT

PATCH
APPLIED
≠
VULNERABILITY
VERIFIED
FIXED

SECURITY
TEST
PASS
≠
SYSTEM
UNHACKABLE

PENTEST
PASS
≠
PRODUCTION
AUTHORIZED

EXCEPTION
≠
GENERAL
POLICY

PILOT
SUCCESS
≠
PRODUCTION
AUTHORIZATION

RSM8
≠
RSM9

DOCUMENTED
≠
IMPLEMENTED

IMPLEMENTED
≠
ENFORCED

ENFORCED
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

# 232. Changelog Entry

Append during future root `CHANGELOG.md` synchronization:

```markdown id="rls-209"
## RESEARCH-LAB-CHG-20260813-009 — Research Lab Security Established

| Field | Value |
|---|---|
| Date | 2026-08-13 |
| Change Type | `CREATED`, `RESEARCH-SECURITY`, `THREAT-MODEL`, `IDENTITY`, `AUTHORIZATION`, `PROJECT-ISOLATION`, `TENANT-ISOLATION`, `DATA-SECURITY`, `AI-SECURITY`, `PROMPT-INJECTION`, `AGENT-SECURITY`, `SANDBOX`, `INCIDENT-RESPONSE`, `RUNTIME-TRUTH` |
| Impact | `I5 — Research Lab Enterprise Security Foundation` |
| Risk | `R1 — Documentation` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Canonical | `false` |
| Production Authorization | `NOT_AUTHORIZED_BY_THIS_DOCUMENT` |

### Affected Document

`doc/26-research-lab/research-security.md`

### Security Truth

`RESEARCH_LAB_SECURITY = CONTENT_COMPLETE_FOR_REVIEW`

### Enforcement Truth

`RESEARCH_SECURITY_ENFORCEMENT = NOT_PROVEN`

### Verification Truth

`RESEARCH_SECURITY_VERIFICATION = NOT_PROVEN`

### Production Truth

`PRODUCTION_RESEARCH_SECURITY = NOT_AUTHORIZED_BY_THIS_DOCUMENT`
```

---

# 233. Final Research Security Rule

The target Research Security model should operate as:

```text id="rls-210"
UNTRUSTED
OR
SENSITIVE
RESEARCH
INPUT

↓

TRUST
CLASSIFICATION

↓

TRUSTED
IDENTITY

↓

TRUSTED
ORGANIZATION /
PROJECT /
TENANT /
PURPOSE

↓

VALID
AUTHORIZATION

↓

LEAST
PRIVILEGE

↓

AUTHORIZED
DATA /
DATASETS /
MODELS /
PROMPTS /
AGENTS /
TOOLS

↓

ISOLATED
RESEARCH
ENVIRONMENT

↓

CONTROLLED
NETWORK /
SECRETS /
EGRESS

↓

PROMPT
INJECTION /
AUTHORITY
INJECTION
DEFENSE

↓

MONITORED
EXECUTION

↓

TRACEABLE
RESULT /
EVIDENCE /
AUDIT

↓

SECURITY
DETECTION

↓

HALT /
CONTAINMENT
WHEN
REQUIRED

↓

INVESTIGATION

↓

RECOVERY

↓

REAUTHORIZATION

↓

SEPARATE
PRODUCTION
SECURITY
GATE
```

while permanently preserving:

```text id="rls-211"
CONTENT
≠
AUTHORITY

ACCESS
≠
PERMISSION

AI
≠
FOUNDER

MODEL
OUTPUT
≠
SYSTEM
AUTHORITY

AGENT
CAPABILITY
≠
AGENT
PRIVILEGE

SANDBOX
≠
GUARANTEE

PILOT
≠
PRODUCTION

SECURITY
DOCUMENTATION
≠
SECURITY
VERIFICATION
```

---

# 234. Next Document

The Research Vision has defined **where the Research Lab should go**.

The Research Strategy has defined **how it should progress**.

The Research Architecture has defined **how it should be structured**.

The Research Capabilities document has defined **what it should be able to do**.

The Research Lifecycle has defined **how Research should progress end-to-end**.

The Research Governance document has defined **who has authority and how Research risk and autonomy are controlled**.

This Research Security document has now defined **how Research assets, Data, Models, Agents, Prompts, Tools, environments and enterprise boundaries should be protected**.

The next root document should define the complete **Research Lab measurement and metrics system**, including Research quality, Evidence quality, reproducibility, replication, cycle time, Research throughput, Experiment health, Benchmark quality, Dataset quality, Model/Prompt/Agent evaluation metrics, Knowledge Transfer performance, Research reuse, Research value realization, Innovation metrics, Technology Radar metrics, Market Research quality, Security and governance metrics, cost efficiency, resource utilization, Project/Tenant isolation indicators, AI Research performance, metric provenance, SLI/SLO concepts, anti-Goodhart controls, dashboards, alerting, trend analysis, metric maturity, Runtime Truth and Production boundaries.

## NEXT DOCUMENT

```text id="rls-212"
doc/26-research-lab/research-metrics.md
```

---
