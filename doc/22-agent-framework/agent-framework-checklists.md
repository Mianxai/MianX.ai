---
id: AGENT-FRAMEWORK-CHECKLISTS-001
title: Mianx.ai Agent Framework Checklists
version: 1.0.0
status: Draft

description: Framework-wide enterprise checklist standard for reviewing, approving, implementing, validating, activating, monitoring, changing, suspending, recovering, and retiring Mianx.ai Agents across Agent Definitions, Versions, Registry, Allocations, Capabilities, Skills, Tools, Models, Prompts, Context, Memory, Security, Governance, Evaluation, Evidence, Metrics, Multi-Project isolation, Multi-Customer isolation, Multi-Tenant isolation, lifecycle transitions, Production authorization, incidents, rollback, and retirement.

type: Enterprise Agent Framework Checklist Standard, Agent Definition Checklist, Agent Version Checklist, Agent Registry Checklist, Agent Allocation Checklist, Capability Checklist, Skill Checklist, Tool Checklist, Model Checklist, Prompt Checklist, Context Checklist, Memory Checklist, Security Checklist, Governance Checklist, Lifecycle Checklist, Evaluation Checklist, Metrics Checklist, Monitoring Checklist, Evidence Checklist, Audit Checklist, Multi-Project Isolation Checklist, Multi-Customer Isolation Checklist, Multi-Tenant Isolation Checklist, Production Readiness Checklist, Incident Checklist, Rollback Checklist, Retirement Checklist, and Documentation Closeout Checklist

class: Governed Enterprise Operational Review and Production Readiness Checklist Standard for Individual AI Agents operating within MianX Core Platform, Mianx.ai AI Operating System, Shared AI Workforce, Multi-Agent System, Project Factory, Industry Operating Systems, Customer Editions, Multi-Project Operations, Multi-Customer Operations, Multi-Tenant Operations, Human-AI Collaboration, and Autonomous Enterprise Creation at Scale

category: Agent Framework
parent: doc/22-agent-framework

owner: Mianx.ai Founder

authority: Founder and Enterprise Governance

stewards:
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Runtime Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Security Governance
  - Privacy Governance
  - Identity and Access Governance
  - Memory Governance
  - Model Governance
  - Prompt Governance
  - Tool Governance
  - Skills Governance
  - Data Governance
  - Quality Governance
  - Reliability Governance
  - Risk Governance
  - Evidence Governance
  - Audit Governance
  - Observability Governance
  - Enterprise Operations
  - Documentation Governance

maintainers:
  - Agent Framework Engineering
  - Agent Runtime Engineering
  - Agent Platform Engineering
  - AI Operating System Engineering
  - AI Workforce Engineering
  - Security Engineering
  - Memory Platform Engineering
  - Model Platform Engineering
  - Prompt Platform Engineering
  - Tool Platform Engineering
  - Skills Platform Engineering
  - Evaluation Engineering
  - Reliability Engineering
  - Monitoring Engineering
  - Observability Engineering
  - Quality Engineering
  - Enterprise Operations
  - Documentation Governance

reviewers:
  - Founder
  - Founder Office
  - Human Executive Leadership
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Runtime Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Security Governance
  - Privacy Governance
  - Identity and Access Governance
  - Memory Governance
  - Model Governance
  - Prompt Governance
  - Tool Governance
  - Skills Governance
  - Data Governance
  - Quality Governance
  - Reliability Governance
  - Risk Governance
  - Evidence Governance
  - Audit Governance
  - Observability Governance
  - Enterprise Operations
  - Documentation Governance

created: 2026-08-08
updated: 2026-08-08

classification: Internal

audience:
  - Founder
  - Founder Office
  - Human Executive Leadership
  - Enterprise Governance
  - Enterprise Architects
  - AI Architects
  - Agent Architects
  - Agent Framework Engineers
  - Agent Runtime Engineers
  - AI Operating System Engineers
  - AI Workforce Engineers
  - Security Engineers
  - Memory Engineers
  - Model Engineers
  - Prompt Engineers
  - Tool Engineers
  - Skill Engineers
  - Evaluation Engineers
  - Reliability Engineers
  - Observability Engineers
  - Quality Engineers
  - Enterprise Operators
  - Auditors
  - Documentation Maintainers
  - Authorized AI Agents

depends_on:
  - ./README.md
  - ./INDEX.md
  - ./agent-framework-vision.md
  - ./agent-framework-strategy.md
  - ./agent-framework-architecture.md
  - ./agent-framework-capabilities.md
  - ./agent-framework-lifecycle.md
  - ./agent-framework-governance.md
  - ./agent-framework-security.md
  - ./agent-framework-metrics.md
  - ../01-governance/AI-CONSTITUTION.md
  - ../19-ai-workforce/AGENT-CAPACITY-BASELINE.md
  - ../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md
  - ../20-ai-operating-system/MASTER-BLUEPRINT.md
  - ../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md
  - ../21-memory-engine/README.md

related_documents:
  - ./ROADMAP.md
  - ./architecture/agent-architecture.md
  - ./architecture/component-model.md
  - ./architecture/interaction-model.md
  - ./architecture/system-architecture.md
  - ./capabilities/capability-framework.md
  - ./capabilities/capability-mapping.md
  - ./capabilities/capability-registry.md
  - ./evaluation/benchmarking.md
  - ./evaluation/performance-evaluation.md
  - ./evaluation/quality-scoring.md
  - ./governance/agent-governance.md
  - ./governance/compliance.md
  - ./governance/policies.md
  - ./lifecycle/agent-activation.md
  - ./lifecycle/agent-creation.md
  - ./lifecycle/agent-lifecycle.md
  - ./lifecycle/agent-retirement.md
  - ./monitoring/agent-monitoring.md
  - ./monitoring/audit-logs.md
  - ./monitoring/health-monitoring.md
  - ./monitoring/performance-monitoring.md
  - ./security/access-control.md
  - ./security/agent-security.md
  - ./security/identity-management.md
  - ./skills/skill-catalog.md
  - ./skills/skill-framework.md
  - ./tools/tool-permissions.md
  - ./tools/tool-registry.md

related_modules:
  - ../01-governance/
  - ../19-ai-workforce/
  - ../20-ai-operating-system/
  - ../21-memory-engine/
  - ../23-multi-agent-system/
  - ../24-automation-engine/
  - ../27-model-management/
  - ../29-observability-platform/
  - ../30-enterprise-governance/
  - ../40-enterprise-operations/
  - ../41-security-platform/
  - ../42-data-platform/
  - ../44-enterprise-ai/
  - ../46-enterprise-quality/

review_cycle:
  - At Every Material Checklist Model Change
  - At Every Agent Framework Lifecycle Change
  - At Every Agent Security Gate Change
  - At Every Production Authorization Gate Change
  - At Every Agent Evaluation Change
  - At Every Isolation Control Change
  - At Every Governance Approval Change
  - At Every Incident or Recovery Process Change
  - Before Every Controlled Agent Pilot
  - Before Every Material Production Agent Activation
  - Before Canonical Promotion
  - Quarterly During Active Build
  - Annually During Stable Operation

canonical: false

tags:
  - agent-framework
  - checklists
  - production-readiness
  - agent-governance
  - agent-security
  - agent-lifecycle
  - verification
  - evidence
  - audit
  - quality
  - multi-project
  - multi-customer
  - multi-tenant
  - enterprise-ai
---

# Mianx.ai Agent Framework Checklists

> **This document provides the framework-wide enterprise checklists used
> to move Mianx.ai Agents through governed lifecycle gates.**
>
> **These checklists are operational controls, not ceremonial paperwork.**
>
> **A checked box must not be interpreted as proof unless the required
> implementation, Evidence, owner, scope, review, and current runtime
> truth support it.**
>
> **The checklist system exists to prevent Mianx.ai from progressing an
> Agent merely because documentation is complete, a Model responds
> successfully, a Tool can be called, or an Agent appears capable.**
>
> **Every material Agent must be reviewed as a combination of identity,
> Version, Capability, Skills, Tools, Model, Prompt, Context, Memory,
> Security, Governance, lifecycle, evaluation, Evidence, scope,
> observability, and operational controls.**
>
> **The permanent truth boundaries are:**
>
> ```text
> DOCUMENTED
> ≠
> IMPLEMENTED
>
> IMPLEMENTED
> ≠
> VERIFIED
>
> VERIFIED
> ≠
> PRODUCTION AUTHORIZED
>
> CHECKED
> ≠
> PROVEN
>
> CAPABILITY
> ≠
> AUTHORITY
>
> ACTIVE
> ≠
> AUTHORIZED FOR EVERY ACTION
> ```
>
> **When Evidence does not exist, the correct status is `NOT_PROVEN`.**

---

# 1. Purpose

This document provides repeatable checklists for:

```text
AGENT CREATION

AGENT DEFINITION REVIEW

AGENT VERSION REVIEW

AGENT REGISTRATION

AGENT ALLOCATION

CAPABILITY REVIEW

SKILL REVIEW

TOOL REVIEW

MODEL REVIEW

PROMPT REVIEW

CONTEXT REVIEW

MEMORY REVIEW

SECURITY REVIEW

GOVERNANCE REVIEW

LIFECYCLE REVIEW

EVALUATION REVIEW

METRICS REVIEW

MONITORING REVIEW

EVIDENCE REVIEW

AUDIT REVIEW

PROJECT ISOLATION

CUSTOMER ISOLATION

TENANT ISOLATION

CONTROLLED AGENT PILOT

PRODUCTION AUTHORIZATION

CHANGE MANAGEMENT

VERSION UPGRADE

ROLLBACK

INCIDENT RESPONSE

SUSPENSION

RESUME

RETIREMENT

DOCUMENTATION CLOSEOUT
```

---

# 2. Checklist Mission

The mission is:

> **Convert Agent Framework architecture and governance requirements into
> repeatable operational gates that make unsafe omissions visible before
> they become Production incidents.**

---

# 3. Checklist Truth Model

Every checklist item should conceptually support one of:

```text
NOT_APPLICABLE

NOT_STARTED

DOCUMENTED

IMPLEMENTED

VERIFIED

APPROVED

PRODUCTION_AUTHORIZED
```

---

# 4. `NOT_PROVEN`

When runtime or Evidence does not support a claim:

```text
NOT_PROVEN
```

must be used.

---

# 5. Checkbox Semantics

A checked checkbox means:

> The responsible reviewer has verified that the item satisfies the
> checklist's required truth level for the current gate.

It must not mean:

> Someone believes the item probably exists.

---

# 6. Checklist Evidence Rule

For material controls:

```text
CHECKLIST ITEM
+
EVIDENCE
=
REVIEWABLE CLAIM
```

---

# 7. Evidence Examples

Potential:

```text
SOURCE FILE

CONFIGURATION

TEST OUTPUT

DATABASE RESULT

API RESPONSE

AUDIT EVENT

SECURITY SCAN

EVALUATION REPORT

SCREENSHOT

COMMIT

DEPLOYMENT RECORD

TOOL RESULT

MONITORING RESULT

APPROVAL RECORD
```

---

# 8. Checklist Ownership

Every material checklist should identify:

```text
OWNER

REVIEWER

APPROVER

SCOPE

DATE

EVIDENCE
```

---

# 9. Checklist Scope

A checklist must specify whether it applies to:

```text
AGENT DEFINITION

AGENT VERSION

ALLOCATION

PROJECT

CUSTOMER

TENANT

ENVIRONMENT

CAPABILITY

TOOL

PRODUCTION AUTHORIZATION
```

---

# 10. Checklist Reuse Boundary

```text
CHECKLIST PASSED
FOR
PROJECT A

≠

CHECKLIST PASSED
FOR
PROJECT B
```

where scope-specific controls differ.

---

# 11. Checklist Freshness

Checklist evidence may become stale after:

```text
VERSION CHANGE

TOOL CHANGE

MODEL CHANGE

PROMPT CHANGE

PERMISSION CHANGE

MEMORY SCOPE CHANGE

PROJECT CHANGE

CUSTOMER CHANGE

TENANT CHANGE

SECURITY POLICY CHANGE
```

---

# 12. Revalidation Rule

Material change may require checklist re-execution.

---

# 13. Checklist Hard-Stop Principle

A critical failed item must not be averaged away by many successful
non-critical items.

---

# 14. Checklist Severity

Items may be classified conceptually as:

```text
INFORMATIONAL

REQUIRED

CRITICAL

PRODUCTION_HARD_STOP
```

---

# 15. Pre-Agent-Creation Checklist

Before creating a new Agent definition:

- [ ] a clear business or platform need exists;
- [ ] an existing Agent definition cannot satisfy the need through configuration;
- [ ] the requirement is not merely a new task;
- [ ] the requirement is not merely a new Skill;
- [ ] the requirement is not merely a new Capability;
- [ ] the requirement is not merely a new Tool;
- [ ] the requirement is not merely a new Persona;
- [ ] the requirement is not merely a new Project allocation;
- [ ] expected Agent Type is identified;
- [ ] expected organizational Role is identified;
- [ ] Agent owner is identified;
- [ ] expected risk class is identified;
- [ ] expected Projects are identified where known;
- [ ] expected Customer exposure is identified where known;
- [ ] expected Tenant exposure is identified where known;
- [ ] expected Data classifications are identified;
- [ ] expected capabilities are identified;
- [ ] expected Tool requirements are identified;
- [ ] expected Model requirements are identified;
- [ ] expected Memory requirements are identified;
- [ ] expected autonomy level is identified;
- [ ] expected Human oversight is identified;
- [ ] retirement ownership is identifiable.

---

# 16. New-Agent Hard Stops

Do not create a new Agent merely because:

```text
A NEW PROMPT WAS WRITTEN

A NEW CUSTOMER EXISTS

A NEW PROJECT EXISTS

A NEW TOOL EXISTS

A NEW TASK EXISTS
```

when a governed reusable Agent model can satisfy the requirement.

---

# 17. Agent Definition Checklist

Before an Agent Definition is content-complete:

- [ ] stable `agent_id` is defined;
- [ ] Agent name is defined;
- [ ] purpose is explicit;
- [ ] scope is explicit;
- [ ] Agent Type is defined;
- [ ] organizational Role is defined;
- [ ] owner is defined;
- [ ] maintainers are defined;
- [ ] lifecycle state is explicit;
- [ ] Version is explicit;
- [ ] Persona profile is defined where applicable;
- [ ] capabilities are defined;
- [ ] required Skills are defined;
- [ ] required Tools are defined;
- [ ] Model profile is defined;
- [ ] Prompt profile is defined;
- [ ] Context profile is defined;
- [ ] Memory profile is defined;
- [ ] permission profile is defined;
- [ ] Security profile is defined;
- [ ] risk class is defined;
- [ ] budget profile is defined where applicable;
- [ ] evaluation profile is defined;
- [ ] Monitoring profile is defined;
- [ ] expected Evidence is defined;
- [ ] escalation behavior is defined;
- [ ] failure behavior is defined;
- [ ] suspension ownership is defined;
- [ ] retirement expectations are defined.

---

# 18. Agent Definition Truth Checklist

Confirm:

- [ ] Agent Definition is not described as a live runtime unless verified;
- [ ] Agent Definition is not described as Production-authorized unless authorized;
- [ ] Role is not described as Permission;
- [ ] Persona is not described as identity;
- [ ] Capability is not described as authority;
- [ ] Tool connectivity is not described as Tool authorization;
- [ ] Model availability is not described as Model approval;
- [ ] Memory availability is not described as Memory truth;
- [ ] documentation state is separate from implementation state;
- [ ] implementation state is separate from Production state.

---

# 19. Agent Definition Approval Checklist

Before Definition approval:

- [ ] architecture review is complete where required;
- [ ] Agent Framework review is complete;
- [ ] Security review is complete for applicable risk;
- [ ] Privacy review is complete where applicable;
- [ ] Data review is complete where applicable;
- [ ] Capability definitions are valid;
- [ ] Tool dependencies are understood;
- [ ] Model dependencies are understood;
- [ ] Memory dependencies are understood;
- [ ] Project/Customer/Tenant boundaries are understood;
- [ ] Human oversight requirements are defined;
- [ ] lifecycle controls are defined;
- [ ] evaluation methodology is defined;
- [ ] unresolved critical risks are documented;
- [ ] approval authority is known.

---

# 20. Agent Version Creation Checklist

Before creating a new Agent Version:

- [ ] change reason is documented;
- [ ] affected components are identified;
- [ ] previous Version is identified;
- [ ] compatibility impact is assessed;
- [ ] migration impact is assessed;
- [ ] rollback possibility is assessed;
- [ ] affected Projects are identified;
- [ ] affected Customers are identified;
- [ ] affected Tenants are identified;
- [ ] evaluation impact is identified;
- [ ] Security impact is identified;
- [ ] cost impact is identified where applicable.

---

# 21. Agent Version Change Checklist

Review whether the Version changes:

- [ ] Persona;
- [ ] capabilities;
- [ ] Skills;
- [ ] Tools;
- [ ] Model profile;
- [ ] Prompt profile;
- [ ] Context profile;
- [ ] Memory profile;
- [ ] permission profile;
- [ ] Security profile;
- [ ] autonomy;
- [ ] output contract;
- [ ] failure behavior;
- [ ] Tool side effects;
- [ ] Data access.

---

# 22. Agent Version Evaluation Checklist

Before Version approval:

- [ ] static configuration review passes;
- [ ] required Unit/Component tests pass;
- [ ] capability tests pass;
- [ ] regression evaluation passes;
- [ ] Security evaluation passes where required;
- [ ] Tool permission tests pass;
- [ ] Memory scope tests pass where applicable;
- [ ] Model compatibility is validated;
- [ ] Prompt behavior is evaluated;
- [ ] Context behavior is evaluated;
- [ ] failure behavior is evaluated;
- [ ] Evidence generation is evaluated;
- [ ] cost impact is understood;
- [ ] latency impact is understood;
- [ ] known regressions are documented;
- [ ] critical regressions are resolved or explicitly rejected.

---

# 23. Version Approval Hard Stops

Do not approve a Version if:

```text
VERSION ID UNKNOWN

MATERIAL CHANGE UNDOCUMENTED

SECURITY IMPACT UNKNOWN

CAPABILITY IMPACT UNKNOWN

TOOL IMPACT UNKNOWN

MEMORY SCOPE EXPANSION UNREVIEWED

REGRESSION UNKNOWN

ROLLBACK IMPOSSIBLE AND RISK UNACCEPTABLE
```

---

# 24. Agent Registry Checklist

Before registration:

- [ ] Agent identity is stable;
- [ ] Agent Version is known;
- [ ] definition owner is known;
- [ ] Agent Type is known;
- [ ] Role is known;
- [ ] lifecycle state is known;
- [ ] Capability references are valid;
- [ ] Skill references are valid where applicable;
- [ ] Tool profile reference is valid;
- [ ] Model profile reference is valid;
- [ ] Security profile reference is valid;
- [ ] evaluation profile reference is valid;
- [ ] registration actor is authorized;
- [ ] duplicate identity conflicts are resolved;
- [ ] historical Versions remain distinguishable.

---

# 25. Registry Integrity Checklist

- [ ] Agents cannot directly self-promote Registry state;
- [ ] unauthorized Registry writes are denied;
- [ ] Registry changes are auditable;
- [ ] Version history is preserved;
- [ ] deprecated Versions are identifiable;
- [ ] retired Versions are identifiable;
- [ ] status changes do not erase history;
- [ ] Registry cache invalidation exists where required.

---

# 26. Registry Truth Boundary

```text
REGISTERED
≠
ALLOCATED

REGISTERED
≠
ACTIVE

REGISTERED
≠
PRODUCTION AUTHORIZED
```

---

# 27. Agent Allocation Checklist

Before allocating an Agent:

- [ ] Agent Definition is eligible;
- [ ] Agent Version is eligible;
- [ ] allocation has stable identity;
- [ ] organization scope is known where applicable;
- [ ] Project scope is known;
- [ ] Customer scope is known where applicable;
- [ ] Tenant scope is known where applicable;
- [ ] Role assignment is known;
- [ ] required Capability set is known;
- [ ] restricted Capability set is known;
- [ ] Tool scope is known;
- [ ] Memory scope is known;
- [ ] Model profile is known;
- [ ] budget is known where applicable;
- [ ] autonomy level is known;
- [ ] Human oversight requirement is known;
- [ ] Data classification exposure is understood;
- [ ] lifecycle owner is known.

---

# 28. Allocation Security Checklist

- [ ] Project scope derives from trusted platform state;
- [ ] Customer scope derives from trusted platform state;
- [ ] Tenant scope derives from trusted platform state;
- [ ] caller-supplied identifiers do not create authority;
- [ ] environment scope is explicit;
- [ ] permission profile is scope-aware;
- [ ] Tool credentials are scope-aware where applicable;
- [ ] Memory access is scope-aware;
- [ ] caches are scope-aware;
- [ ] audit events preserve allocation scope.

---

# 29. Multi-Project Allocation Checklist

Before same Agent Definition serves multiple Projects:

- [ ] separate allocation IDs exist;
- [ ] separate Project scope exists;
- [ ] separate Project Context exists;
- [ ] Project Memory remains isolated;
- [ ] Project Tool permissions remain isolated;
- [ ] Project credentials remain isolated where required;
- [ ] Project task queues remain attributable;
- [ ] Project-specific policies remain distinguishable;
- [ ] controlled cross-Project denial tests pass;
- [ ] no shared cache can leak protected Project Context.

---

# 30. Multi-Customer Allocation Checklist

Before same Agent Type serves multiple Customers:

- [ ] Customer identity is explicit;
- [ ] Customer allocation is explicit;
- [ ] Customer Data scope is explicit;
- [ ] Customer Tool scope is explicit;
- [ ] Customer Memory scope is explicit;
- [ ] Customer credentials are isolated where required;
- [ ] Customer policy overlay is explicit;
- [ ] Customer output routing is explicit;
- [ ] Customer metric visibility is isolated;
- [ ] controlled cross-Customer denial tests pass;
- [ ] Customer A Context cannot appear in Customer B run.

---

# 31. Multi-Tenant Allocation Checklist

- [ ] Tenant identity is trusted;
- [ ] Tenant allocation is explicit;
- [ ] Tenant membership is verified where applicable;
- [ ] Tenant Memory scope is explicit;
- [ ] Tenant Tool scope is explicit;
- [ ] Tenant Data access is explicit;
- [ ] Tenant caches are scoped;
- [ ] Tenant metrics are scoped;
- [ ] Tenant audit events are attributable;
- [ ] unknown Tenant fails safe;
- [ ] controlled cross-Tenant denial tests pass.

---

# 32. Capability Checklist

Before assigning a Capability:

- [ ] Capability has stable identity;
- [ ] Capability Version is known;
- [ ] Capability purpose is clear;
- [ ] Capability category is known;
- [ ] side-effect class is known;
- [ ] risk class is known;
- [ ] required Skills are known;
- [ ] required Tools are known;
- [ ] required Model abilities are known;
- [ ] required Context is known;
- [ ] required Memory access is known;
- [ ] input contract is known where required;
- [ ] output contract is known where required;
- [ ] failure model is defined;
- [ ] retry behavior is defined where relevant;
- [ ] reversibility is understood where relevant;
- [ ] evaluation profile exists;
- [ ] owner exists.

---

# 33. Capability Authority Checklist

Confirm:

- [ ] Capability assignment does not create permission;
- [ ] Capability assignment does not create Project access;
- [ ] Capability assignment does not create Customer access;
- [ ] Capability assignment does not create Tenant access;
- [ ] Capability assignment does not create Production access;
- [ ] Capability assignment does not create Tool credential;
- [ ] Capability assignment does not create approval;
- [ ] runtime authorization still occurs;
- [ ] toxic Capability combinations are checked;
- [ ] separation-of-duties rules are applied where required.

---

# 34. High-Risk Capability Checklist

For high-risk capabilities:

- [ ] Security review is complete;
- [ ] explicit permissions exist;
- [ ] Tool operations are narrow;
- [ ] destructive effects are understood;
- [ ] rollback/compensation is defined;
- [ ] Human approval is defined where required;
- [ ] Evidence requirements are explicit;
- [ ] Monitoring is defined;
- [ ] kill-switch interaction is defined;
- [ ] adversarial evaluation exists;
- [ ] Production scope is explicitly approved.

---

# 35. Skill Checklist

Before assigning a Skill:

- [ ] Skill identity is stable;
- [ ] Skill Version is known;
- [ ] purpose is clear;
- [ ] owner is identified;
- [ ] relevant capabilities are mapped;
- [ ] Tool dependencies are mapped;
- [ ] Model dependencies are mapped where relevant;
- [ ] security implications are reviewed;
- [ ] code execution implications are reviewed where applicable;
- [ ] Skill quality has been evaluated;
- [ ] Skill is not being used as a hidden permission mechanism.

---

# 36. Tool Registration Checklist

Before registering a Tool:

- [ ] Tool ID is stable;
- [ ] Tool Version is known;
- [ ] owner is identified;
- [ ] Tool purpose is clear;
- [ ] operations are enumerated;
- [ ] read operations are distinguishable from writes;
- [ ] privileged writes are identified;
- [ ] destructive operations are identified;
- [ ] input contract exists;
- [ ] output contract exists;
- [ ] authentication requirements are known;
- [ ] credential requirements are known;
- [ ] network destinations are known where applicable;
- [ ] Data accessed is classified;
- [ ] retry behavior is understood;
- [ ] idempotency is understood;
- [ ] disablement mechanism exists where required;
- [ ] audit events are defined;
- [ ] Security review is complete.

---

# 37. Agent-to-Tool Authorization Checklist

Before an Agent may use a Tool:

- [ ] Agent identity is trusted;
- [ ] Agent Version is eligible;
- [ ] allocation is active;
- [ ] Tool is registered;
- [ ] Tool Version is eligible;
- [ ] Agent has relevant Capability;
- [ ] operation-specific permission exists;
- [ ] Project scope is valid;
- [ ] Customer scope is valid;
- [ ] Tenant scope is valid;
- [ ] environment is valid;
- [ ] required approval is current;
- [ ] credentials are valid;
- [ ] budget is available where applicable;
- [ ] kill switch permits execution.

---

# 38. Tool Argument Checklist

Before sensitive Tool execution:

- [ ] schema validates;
- [ ] required fields exist;
- [ ] resource IDs are validated;
- [ ] resource IDs are authorization-checked;
- [ ] Project ID is trusted;
- [ ] Customer ID is trusted;
- [ ] Tenant ID is trusted;
- [ ] environment is trusted;
- [ ] path values are validated where applicable;
- [ ] URLs are validated where applicable;
- [ ] destructive flags are explicitly governed;
- [ ] Tool input does not contain unauthorized secrets.

---

# 39. Tool Side-Effect Checklist

After a material Tool write:

- [ ] Tool result was received;
- [ ] Tool result belongs to the expected operation;
- [ ] resulting target resource is correct;
- [ ] resulting Project/Customer/Tenant scope is correct;
- [ ] expected side effect is independently verifiable where required;
- [ ] unexpected side effects are absent or documented;
- [ ] Evidence is preserved;
- [ ] Agent result does not claim more than Tool Evidence supports.

---

# 40. Tool Hard Stops

Stop execution if:

```text
TOOL OPERATION PERMISSION UNKNOWN

RESOURCE AUTHORIZATION UNKNOWN

DESTRUCTIVE ACTION NOT REVIEWED

CREDENTIAL SCOPE UNKNOWN

TOOL ARGUMENTS INVALID

TOOL SIDE EFFECT CANNOT BE SAFELY CONTROLLED

REQUIRED APPROVAL MISSING
```

---

# 41. Model Selection Checklist

Before Agent Model use:

- [ ] Model/provider is approved for applicable use;
- [ ] Model identity is traceable;
- [ ] Model Version is traceable where applicable;
- [ ] required Capability is supported;
- [ ] Data classification is compatible;
- [ ] Customer restrictions are satisfied;
- [ ] Tenant restrictions are satisfied where applicable;
- [ ] regional/residency restrictions are satisfied where required;
- [ ] context-window requirement is satisfied;
- [ ] structured-output requirement is satisfied where required;
- [ ] Tool-calling requirement is satisfied where applicable;
- [ ] cost class is acceptable;
- [ ] latency class is acceptable;
- [ ] fallback policy is defined.

---

# 42. Model Fallback Checklist

Before fallback:

- [ ] primary failure is known;
- [ ] fallback Model is approved;
- [ ] fallback satisfies Data policy;
- [ ] fallback satisfies Customer policy;
- [ ] fallback satisfies regional policy;
- [ ] fallback supports required capability;
- [ ] quality implications are known;
- [ ] fallback use is attributable;
- [ ] fallback does not silently increase authority.

---

# 43. Prompt Checklist

Before a material Agent Prompt Version is used:

- [ ] Prompt identity is known;
- [ ] Prompt Version is known;
- [ ] owner is known;
- [ ] Agent purpose is represented correctly;
- [ ] Role is represented correctly;
- [ ] Persona is represented correctly;
- [ ] Tool behavior is bounded;
- [ ] escalation behavior is represented;
- [ ] output contract is represented;
- [ ] untrusted Context is distinguishable;
- [ ] Project/Customer/Tenant rules are represented where applicable;
- [ ] security does not depend on Prompt alone;
- [ ] regression evaluation exists;
- [ ] Prompt change is attributable.

---

# 44. Prompt Security Checklist

Confirm:

- [ ] Prompt cannot self-create permissions;
- [ ] Persona cannot create permissions;
- [ ] lower-trust instructions cannot override protected controls;
- [ ] Prompt Injection scenarios are evaluated;
- [ ] indirect Prompt Injection scenarios are evaluated;
- [ ] authorization occurs outside Prompt where material;
- [ ] Tool permissions occur outside Prompt;
- [ ] Memory permissions occur outside Prompt;
- [ ] Production permissions occur outside Prompt.

---

# 45. Context Assembly Checklist

Before Context is provided to an Agent:

- [ ] task purpose is known;
- [ ] required Context sources are known;
- [ ] Project scope is known;
- [ ] Customer scope is known;
- [ ] Tenant scope is known;
- [ ] User scope is known where applicable;
- [ ] Data classification is known;
- [ ] current authorization is valid;
- [ ] minimum-sufficient Context principle is applied;
- [ ] irrelevant sensitive Data is excluded;
- [ ] source provenance is preserved where required;
- [ ] trust level is known;
- [ ] stale Context is handled;
- [ ] revoked Context is excluded;
- [ ] cache scope is correct.

---

# 46. Context Leakage Checklist

- [ ] Project A Context cannot enter Project B run;
- [ ] Customer A Context cannot enter Customer B run;
- [ ] Tenant A Context cannot enter Tenant B run;
- [ ] User-specific Context cannot enter unrelated User run;
- [ ] cached Context preserves scope;
- [ ] Tool output is attributed before reuse;
- [ ] external content is marked untrusted;
- [ ] derived summaries preserve source scope.

---

# 47. Memory Access Checklist

Before Agent Memory retrieval:

- [ ] Memory type is allowed;
- [ ] Agent identity is trusted;
- [ ] Project scope is valid;
- [ ] Customer scope is valid;
- [ ] Tenant scope is valid;
- [ ] User scope is valid where applicable;
- [ ] purpose is valid;
- [ ] classification is allowed;
- [ ] Memory lifecycle state is eligible;
- [ ] Memory is not deleted/revoked/expired where prohibited;
- [ ] current authorization is valid;
- [ ] retrieval uses governed Memory Engine interfaces.

---

# 48. Memory Truth Checklist

Confirm:

- [ ] stored Memory is not automatically treated as truth;
- [ ] retrieved Memory is not automatically treated as authority;
- [ ] derived summaries remain derived;
- [ ] embeddings remain derived;
- [ ] Vector results remain retrieval projections;
- [ ] provenance exists where required;
- [ ] correction state is respected;
- [ ] supersession state is respected;
- [ ] confidence is not confused with authority.

---

# 49. Agent-Generated Memory Write Checklist

Before durable Memory admission:

- [ ] output is a Memory candidate, not automatic Memory;
- [ ] source Agent is attributable;
- [ ] source run is attributable;
- [ ] Project scope is known;
- [ ] Customer scope is known;
- [ ] Tenant scope is known;
- [ ] User scope is known where applicable;
- [ ] classification is assigned;
- [ ] provenance is preserved;
- [ ] authority class is assigned where applicable;
- [ ] validation occurs;
- [ ] duplicate/supersession logic is applied where required;
- [ ] retention is assigned;
- [ ] sensitive Data rules are applied;
- [ ] secrets are excluded;
- [ ] Memory Poisoning controls apply.

---

# 50. Secret-Handling Checklist

Before Agent execution involving secrets:

- [ ] secret value is actually required;
- [ ] Tool proxy can be used instead where possible;
- [ ] secret is stored in approved secret management;
- [ ] secret is not ordinary Memory;
- [ ] secret is not hardcoded in Prompt;
- [ ] secret is not hardcoded in Agent config;
- [ ] credential is scope-limited;
- [ ] credential is revocable;
- [ ] credential is rotatable;
- [ ] short-lived credential is used where appropriate;
- [ ] secret is excluded from unnecessary Model Context;
- [ ] secret is excluded from unnecessary logs;
- [ ] secret is excluded from generated Evidence.

---

# 51. Agent Identity Security Checklist

- [ ] stable Agent ID exists;
- [ ] Version identity exists;
- [ ] allocation identity exists;
- [ ] run identity exists;
- [ ] service identity exists where required;
- [ ] display name is not identity;
- [ ] Persona is not identity;
- [ ] Role title is not identity;
- [ ] Agent-to-Agent sender identity is verified;
- [ ] human identity claims are verified independently;
- [ ] impersonation attempts are detectable.

---

# 52. Authentication Checklist

- [ ] protected system calls authenticate;
- [ ] credentials are issued through trusted control;
- [ ] expired credentials are rejected;
- [ ] revoked credentials are rejected;
- [ ] shared global Agent credentials are avoided;
- [ ] authentication events are auditable;
- [ ] failed authentication is observable.

---

# 53. Authorization Checklist

Before any protected action:

- [ ] Agent identity is authenticated;
- [ ] current Agent Version is eligible;
- [ ] allocation is eligible;
- [ ] lifecycle permits action;
- [ ] Project scope is valid;
- [ ] Customer scope is valid;
- [ ] Tenant scope is valid;
- [ ] User scope is valid where applicable;
- [ ] environment is valid;
- [ ] Capability exists;
- [ ] resource permission exists;
- [ ] action permission exists;
- [ ] Tool operation permission exists where applicable;
- [ ] risk permits action;
- [ ] approval exists where required;
- [ ] approval has not expired;
- [ ] approval has not been revoked;
- [ ] current policy allows action;
- [ ] kill switch is clear.

---

# 54. Default-Deny Checklist

- [ ] unknown protected resource access is denied;
- [ ] unknown Project is denied;
- [ ] unknown Customer is denied;
- [ ] unknown Tenant is denied;
- [ ] unknown Tool operation is denied;
- [ ] unknown environment is denied;
- [ ] unknown high-risk approval state is denied;
- [ ] missing critical authorization fails safe.

---

# 55. Least-Privilege Checklist

- [ ] Agent receives only required resources;
- [ ] Agent receives only required operations;
- [ ] Agent receives only required Projects;
- [ ] Agent receives only required Customers;
- [ ] Agent receives only required Tenants;
- [ ] Agent receives only required environments;
- [ ] Agent receives only required Tools;
- [ ] Agent receives only required Memory types;
- [ ] elevated access is time-limited where practical;
- [ ] unused access is removable.

---

# 56. Project Isolation Verification Checklist

Controlled evidence must confirm:

- [ ] Project A identity resolves correctly;
- [ ] Project B identity resolves correctly;
- [ ] Project A Agent can access allowed Project A resource;
- [ ] Project A Agent cannot access protected Project B resource;
- [ ] Project B Agent cannot access protected Project A resource;
- [ ] caller-supplied Project ID cannot bypass authorization;
- [ ] Project Memory is isolated;
- [ ] Project Tool credentials are isolated where required;
- [ ] Project Context cache is isolated;
- [ ] Project metrics remain scoped;
- [ ] Project Audit retains correct scope;
- [ ] isolation test Evidence is retained.

---

# 57. Customer Isolation Verification Checklist

- [ ] Customer A identity resolves correctly;
- [ ] Customer B identity resolves correctly;
- [ ] Customer A Agent can access allowed Customer A resource;
- [ ] Customer A Agent cannot access Customer B protected Data;
- [ ] Customer B Agent cannot access Customer A protected Data;
- [ ] Customer credentials are isolated;
- [ ] Customer Memory is isolated;
- [ ] Customer Context is isolated;
- [ ] Customer cache is isolated;
- [ ] Customer metrics are isolated;
- [ ] Customer-specific Tool operations remain isolated;
- [ ] controlled negative tests pass;
- [ ] Evidence is retained.

---

# 58. Tenant Isolation Verification Checklist

- [ ] Tenant identity resolves from trusted state;
- [ ] Tenant A allowed access works;
- [ ] Tenant A cannot access Tenant B protected resource;
- [ ] Tenant B cannot access Tenant A protected resource;
- [ ] forged Tenant IDs do not create authority;
- [ ] unknown Tenant fails safe;
- [ ] Tenant Memory is isolated;
- [ ] Tenant cache is isolated;
- [ ] Tenant metrics are isolated;
- [ ] Tenant audit scope is correct;
- [ ] noisy-neighbor controls are evaluated where applicable;
- [ ] controlled negative tests pass;
- [ ] Evidence is retained.

---

# 59. User-Scope Checklist

Where Agents act for Users:

- [ ] authenticated User identity is known;
- [ ] Agent authority is constrained to delegated purpose;
- [ ] User permissions are current;
- [ ] User-specific Memory access is valid;
- [ ] personal Data is minimized;
- [ ] User A Memory cannot enter User B Context;
- [ ] User consent/Privacy requirements are satisfied where applicable;
- [ ] User revocation is respected.

---

# 60. Prompt Injection Checklist

- [ ] direct Prompt Injection test exists;
- [ ] indirect Prompt Injection test exists;
- [ ] web content is treated as untrusted;
- [ ] documents are treated as untrusted where applicable;
- [ ] email is treated as untrusted where applicable;
- [ ] Tool output is treated as untrusted Data;
- [ ] Memory content cannot create authority;
- [ ] injected instructions cannot grant Tool permissions;
- [ ] injected instructions cannot grant Project scope;
- [ ] injected instructions cannot grant Customer scope;
- [ ] injected instructions cannot grant Tenant scope;
- [ ] injected instructions cannot grant Production authority;
- [ ] external authorization remains authoritative.

---

# 61. Tool Injection Checklist

- [ ] Tool output cannot alter Agent identity;
- [ ] Tool output cannot grant permissions;
- [ ] Tool output cannot change Tenant scope;
- [ ] Tool output cannot change Customer scope;
- [ ] Tool output cannot create approval;
- [ ] Tool output cannot disable Security controls;
- [ ] malicious Tool text is handled as untrusted content;
- [ ] high-risk Tool output is validated.

---

# 62. Memory Poisoning Checklist

- [ ] unverified Agent output is not automatically authoritative Memory;
- [ ] Memory provenance is preserved;
- [ ] malicious instruction-like Memory is treated as Data;
- [ ] Memory cannot grant role;
- [ ] Memory cannot grant permission;
- [ ] Memory cannot grant Tool;
- [ ] Memory cannot grant Project/Customer/Tenant scope;
- [ ] Memory correction process exists;
- [ ] poisoned Memory can be quarantined/revoked where required;
- [ ] stale derived artifacts are reconciled.

---

# 63. Data Exfiltration Checklist

Review potential outbound paths:

- [ ] Model requests;
- [ ] Tool calls;
- [ ] external APIs;
- [ ] email;
- [ ] chat;
- [ ] webhooks;
- [ ] file generation;
- [ ] logs;
- [ ] Memory writes;
- [ ] network requests.

For each applicable path:

- [ ] destination is authorized;
- [ ] Data classification is allowed;
- [ ] minimum Data is sent;
- [ ] secrets are excluded;
- [ ] Customer/Tenant boundary is preserved;
- [ ] required approval exists.

---

# 64. External Communication Checklist

Before Agent sends externally:

- [ ] generation capability exists;
- [ ] send permission exists separately;
- [ ] destination is validated;
- [ ] recipient scope is correct;
- [ ] content classification is allowed;
- [ ] Customer policy is satisfied;
- [ ] approval exists where required;
- [ ] message is attributable;
- [ ] send result is captured;
- [ ] Evidence is preserved where required.

---

# 65. Delegation Checklist

Before Agent delegates:

- [ ] delegator identity is trusted;
- [ ] delegator may delegate;
- [ ] task is delegatable;
- [ ] receiver identity is trusted;
- [ ] receiver is lifecycle-eligible;
- [ ] receiver has required Capability;
- [ ] receiver has current authority;
- [ ] Project scope matches;
- [ ] Customer scope matches;
- [ ] Tenant scope matches;
- [ ] Data classification is allowed;
- [ ] delegation does not expand authority;
- [ ] handoff contains minimum sufficient Context;
- [ ] delegation is auditable.

---

# 66. Confused-Deputy Checklist

- [ ] Agent A cannot cause Agent B to use privileges that Agent A lacks unless explicitly delegated;
- [ ] receiver checks original task scope where required;
- [ ] delegated authority is explicit;
- [ ] delegation chain is attributable;
- [ ] Tool access remains evaluated for executing Agent;
- [ ] Project/Customer/Tenant boundaries survive delegation.

---

# 67. Multi-Agent Participation Checklist

Before Agent joins a multi-Agent team:

- [ ] Agent identity is stable;
- [ ] Version is known;
- [ ] lifecycle is eligible;
- [ ] Capability profile is known;
- [ ] permissions are known;
- [ ] communication contract is supported;
- [ ] delegation contract is supported;
- [ ] Project scope is known;
- [ ] Customer scope is known;
- [ ] Tenant scope is known;
- [ ] Evidence contract is supported;
- [ ] team consensus cannot override individual permissions;
- [ ] global orchestration remains external to individual Agent authority.

---

# 68. Sandbox Checklist

Where sandboxing is required:

- [ ] isolated workspace exists;
- [ ] filesystem boundary exists;
- [ ] process boundary exists;
- [ ] network restrictions exist where required;
- [ ] secret exposure is minimized;
- [ ] resource limits exist;
- [ ] timeout exists;
- [ ] cleanup process exists;
- [ ] generated code cannot escape intended scope;
- [ ] sandbox is not treated as authorization by itself;
- [ ] escape tests exist.

---

# 69. Generated-Code Checklist

Before Agent-generated code may affect protected environments:

- [ ] code provenance is known;
- [ ] diff is reviewable;
- [ ] static analysis runs where required;
- [ ] tests run;
- [ ] secret scan runs;
- [ ] dependency review runs where required;
- [ ] Security checks run;
- [ ] sandbox/test execution occurs where appropriate;
- [ ] deployment permission is separate from code-generation capability;
- [ ] Production deployment requires separate authorization.

---

# 70. Network Security Checklist

Where Agent network access exists:

- [ ] network destinations are known;
- [ ] unnecessary destinations are blocked;
- [ ] internal control-plane endpoints are protected;
- [ ] Agent-controlled URLs are validated where necessary;
- [ ] redirects are handled safely;
- [ ] metadata endpoints are protected where relevant;
- [ ] egress is logged where required;
- [ ] network scope matches Customer/Tenant policy;
- [ ] external destination cannot be selected solely from untrusted content for high-risk operations.

---

# 71. Supply-Chain Checklist

Review:

- [ ] Model providers;
- [ ] SDKs;
- [ ] packages;
- [ ] Tool connectors;
- [ ] Skills;
- [ ] Prompt packages;
- [ ] container images;
- [ ] runtime dependencies;
- [ ] CI/CD artifacts.

For material dependencies:

- [ ] Version is known;
- [ ] source/provenance is understood;
- [ ] owner exists;
- [ ] Security review exists where required;
- [ ] update process exists;
- [ ] compromise response exists.

---

# 72. Governance Checklist

Before governed Agent use:

- [ ] Agent owner is known;
- [ ] business owner is known where applicable;
- [ ] governance hierarchy is understood;
- [ ] policy precedence is understood;
- [ ] Role/Permission separation is enforced;
- [ ] Capability/Authority separation is enforced;
- [ ] Persona/Identity separation is enforced;
- [ ] decision rights are known;
- [ ] required approvers are known;
- [ ] exceptions are explicit;
- [ ] exceptions expire;
- [ ] separation-of-duties requirements are known;
- [ ] escalation route is known;
- [ ] Founder decision route is known for applicable high-impact issues;
- [ ] audit requirements are known.

---

# 73. Approval Checklist

Before accepting an approval:

- [ ] approval ID exists;
- [ ] approver identity is trusted;
- [ ] approver has approval authority;
- [ ] approval subject is explicit;
- [ ] Agent identity is explicit where applicable;
- [ ] Agent Version is explicit where applicable;
- [ ] Project scope is explicit;
- [ ] Customer scope is explicit where applicable;
- [ ] Tenant scope is explicit where applicable;
- [ ] environment is explicit;
- [ ] action/Capability/Tool scope is explicit;
- [ ] approval time is explicit;
- [ ] expiry is known where applicable;
- [ ] approval has not been revoked;
- [ ] Evidence/rationale exists where required.

---

# 74. Separation-of-Duties Checklist

For critical actions:

- [ ] requester role is identified;
- [ ] planner role is identified where applicable;
- [ ] executor role is identified;
- [ ] reviewer role is identified;
- [ ] approver role is identified;
- [ ] auditor role is identified where applicable;
- [ ] toxic combinations are prevented;
- [ ] one Agent cannot silently occupy incompatible roles;
- [ ] Human/independent review exists where required.

---

# 75. Exception Checklist

Before granting an exception:

- [ ] exception ID exists;
- [ ] normal rule is identified;
- [ ] rationale is documented;
- [ ] risk is documented;
- [ ] scope is narrow;
- [ ] affected Agent/Version is known;
- [ ] affected Project/Customer/Tenant is known;
- [ ] compensating controls exist where required;
- [ ] approver is authorized;
- [ ] start time is known;
- [ ] expiry is defined;
- [ ] review date is defined;
- [ ] Audit event exists.

---

# 76. Lifecycle Pre-Activation Checklist

Before Agent activation:

- [ ] Definition is approved for intended use;
- [ ] Version is approved;
- [ ] Version is registered;
- [ ] allocation is approved;
- [ ] Agent lifecycle permits activation;
- [ ] Project is active;
- [ ] Customer is valid;
- [ ] Tenant is valid;
- [ ] identity is configured;
- [ ] permissions are configured;
- [ ] Capability set is configured;
- [ ] Skills are configured where required;
- [ ] Tools are configured;
- [ ] Tool permissions are configured;
- [ ] Model profile is configured;
- [ ] Prompt profile is configured;
- [ ] Context profile is configured;
- [ ] Memory profile is configured;
- [ ] Security profile is configured;
- [ ] evaluation profile exists;
- [ ] Monitoring is ready;
- [ ] budget exists where required;
- [ ] escalation route exists;
- [ ] suspension route exists;
- [ ] kill switch is available.

---

# 77. Activation Truth Checklist

Confirm:

- [ ] activation record exists;
- [ ] environment is explicit;
- [ ] activation actor is attributable;
- [ ] activation scope is explicit;
- [ ] activation does not imply Production unless Production-specific approval exists;
- [ ] activation does not imply all capabilities are enabled;
- [ ] activation does not override current permissions;
- [ ] activation can be revoked.

---

# 78. Runtime Precondition Checklist

Before each sensitive Agent Run:

- [ ] Agent Definition is valid;
- [ ] Version is allowed;
- [ ] allocation is active;
- [ ] Agent is not suspended;
- [ ] Agent is not retired;
- [ ] task is valid;
- [ ] Project scope is current;
- [ ] Customer scope is current;
- [ ] Tenant scope is current;
- [ ] capability is available;
- [ ] permission is current;
- [ ] Tool is allowed;
- [ ] Tool operation is allowed;
- [ ] Model is allowed;
- [ ] Memory access is allowed;
- [ ] approval is current where required;
- [ ] budget is available;
- [ ] current policy allows action;
- [ ] kill switch is clear.

---

# 79. Agent Run Checklist

Each material run should preserve:

- [ ] `run_id`;
- [ ] Agent ID;
- [ ] Agent Version;
- [ ] allocation ID;
- [ ] task ID where applicable;
- [ ] workflow ID where applicable;
- [ ] Project ID;
- [ ] Customer ID where applicable;
- [ ] Tenant ID where applicable;
- [ ] environment;
- [ ] Model reference;
- [ ] relevant Prompt Version;
- [ ] Context reference where required;
- [ ] lifecycle status;
- [ ] start time;
- [ ] completion/failure time;
- [ ] result;
- [ ] Evidence references.

---

# 80. Planning Checklist

Before executing a multi-step plan:

- [ ] objective is explicit;
- [ ] steps are explicit;
- [ ] dependencies are known;
- [ ] required Tools are identified;
- [ ] required permissions are identified;
- [ ] required approvals are identified;
- [ ] risks are identified;
- [ ] expected Evidence is identified;
- [ ] destructive steps are highlighted;
- [ ] rollback/compensation is considered;
- [ ] plan itself is not treated as authorization.

---

# 81. Failure-Handling Checklist

When Agent execution fails:

- [ ] failure is explicit;
- [ ] failure class is identified;
- [ ] task state is updated;
- [ ] side-effect state is understood;
- [ ] authorization remains current;
- [ ] retry eligibility is determined;
- [ ] idempotency is checked;
- [ ] retry budget is checked;
- [ ] rollback/compensation need is assessed;
- [ ] escalation need is assessed;
- [ ] Evidence is preserved;
- [ ] Agent does not fabricate success.

---

# 82. Retry Checklist

Before retry:

- [ ] failure is retryable;
- [ ] action remains authorized;
- [ ] Agent remains active;
- [ ] Tool remains allowed;
- [ ] Model remains allowed;
- [ ] task remains valid;
- [ ] retry budget exists;
- [ ] action is idempotent or safely compensatable;
- [ ] destructive side effects are understood;
- [ ] duplicate external action risk is controlled.

---

# 83. Cancellation Checklist

When cancelling:

- [ ] cancellation authority is valid;
- [ ] target run is correct;
- [ ] active Tool execution is handled;
- [ ] pending side effects are reconciled;
- [ ] stale workers cannot continue uncontrolled;
- [ ] run status is updated;
- [ ] Evidence is preserved;
- [ ] cancellation is auditable.

---

# 84. Suspension Checklist

Before/when suspending an Agent:

- [ ] suspension scope is chosen correctly;
- [ ] reason is documented;
- [ ] affected Agent Version is identified;
- [ ] affected allocations are identified;
- [ ] active runs are identified;
- [ ] new runs are blocked;
- [ ] active-run policy is applied;
- [ ] credentials are revoked where required;
- [ ] Tools are disabled where required;
- [ ] routing is disabled;
- [ ] Evidence is preserved;
- [ ] Security/Operations is notified where required;
- [ ] resume requirements are recorded.

---

# 85. Emergency Suspension Checklist

For critical risk:

- [ ] stop harm first;
- [ ] block new execution;
- [ ] revoke high-risk credentials;
- [ ] disable dangerous Tools;
- [ ] isolate affected Project/Customer/Tenant where required;
- [ ] preserve Evidence;
- [ ] open incident;
- [ ] notify responsible authority;
- [ ] do not auto-resume;
- [ ] require explicit reauthorization.

---

# 86. Resume Checklist

Before resume:

- [ ] original suspension reason is known;
- [ ] root cause is understood;
- [ ] remediation is complete;
- [ ] current Version is safe;
- [ ] permissions are current;
- [ ] Project scope is current;
- [ ] Customer scope is current;
- [ ] Tenant scope is current;
- [ ] Tools are current;
- [ ] Model is current;
- [ ] Memory profile is current;
- [ ] Security review is complete where required;
- [ ] evaluation is repeated where required;
- [ ] Monitoring is active;
- [ ] approver is authorized;
- [ ] resume event is audited.

---

# 87. Kill-Switch Checklist

- [ ] kill switch can target required scope;
- [ ] kill switch is external to Agent reasoning;
- [ ] Agent cannot override it;
- [ ] authorization to trigger it is protected;
- [ ] activation is auditable;
- [ ] stop effect can be verified;
- [ ] fallback containment exists for critical architecture where required;
- [ ] periodic controlled tests exist.

---

# 88. Evaluation Checklist

Before Agent trust increases:

- [ ] evaluation objective is defined;
- [ ] Agent Version is fixed;
- [ ] scenario/task set is known;
- [ ] benchmark methodology is known;
- [ ] success criteria are known;
- [ ] quality criteria are known;
- [ ] Security criteria are known;
- [ ] failure criteria are known;
- [ ] cost is captured where relevant;
- [ ] latency is captured where relevant;
- [ ] Evidence is captured;
- [ ] evaluator identity/method is known;
- [ ] results are attributable;
- [ ] known limitations are documented.

---

# 89. Verified Success Checklist

A task may count as verified success only when:

- [ ] required work completed;
- [ ] success criteria are explicit;
- [ ] evidence supports completion;
- [ ] Tool/System state supports side-effect claims where required;
- [ ] required tests pass;
- [ ] required review passes;
- [ ] known critical error is absent;
- [ ] current scope is correct;
- [ ] Agent self-report is not the only verification source.

---

# 90. Quality Checklist

Review:

- [ ] correctness;
- [ ] completeness;
- [ ] relevance;
- [ ] consistency;
- [ ] clarity;
- [ ] Security;
- [ ] policy compliance;
- [ ] Evidence quality;
- [ ] maintainability where applicable;
- [ ] business fitness.

---

# 91. Quality Hard Stop

A critical failure in:

```text
SECURITY

ISOLATION

DATA INTEGRITY

LEGAL / PRIVACY OBLIGATION

DESTRUCTIVE ACTION SAFETY
```

must not be averaged away by other quality dimensions.

---

# 92. Regression Checklist

For Agent Version change:

- [ ] baseline Version is identified;
- [ ] comparable scenarios are used;
- [ ] Verified Success is compared;
- [ ] Quality is compared;
- [ ] Security is compared;
- [ ] cost is compared;
- [ ] latency is compared;
- [ ] Tool behavior is compared;
- [ ] Memory behavior is compared;
- [ ] escalation behavior is compared;
- [ ] Evidence quality is compared;
- [ ] critical regression is explicitly reviewed.

---

# 93. Metrics Checklist

Before trusting Agent metrics:

- [ ] metric definition exists;
- [ ] metric formula is known;
- [ ] metric owner is known;
- [ ] data source is known;
- [ ] Agent ID is attributable where required;
- [ ] Version is attributable where required;
- [ ] run is attributable where required;
- [ ] Project scope is preserved;
- [ ] Customer scope is preserved;
- [ ] Tenant scope is preserved;
- [ ] missing Data is not treated as zero;
- [ ] metric Version is known where material;
- [ ] metric lineage is available where required;
- [ ] authoritative metrics cannot be altered by Agent self-interest.

---

# 94. Monitoring Checklist

For active Agents:

- [ ] run status is observable;
- [ ] failure status is observable;
- [ ] Model use is observable;
- [ ] Tool use is observable;
- [ ] Memory use is observable where required;
- [ ] latency is observable;
- [ ] cost is observable to required level;
- [ ] Security denials are observable;
- [ ] governance denials are observable;
- [ ] lifecycle changes are observable;
- [ ] Project/Customer/Tenant scope is attributable;
- [ ] critical alerts have owners.

---

# 95. Health Monitoring Checklist

- [ ] runtime health is represented;
- [ ] Model dependency health is represented where required;
- [ ] Tool dependency health is represented;
- [ ] Memory dependency health is represented;
- [ ] Security health is represented;
- [ ] lifecycle state is represented;
- [ ] degraded state is distinguishable from healthy;
- [ ] suspended is distinguishable from unavailable;
- [ ] process health is not confused with Agent correctness.

---

# 96. Evidence Checklist

For material Agent work:

- [ ] Evidence has identity;
- [ ] Evidence links to Agent;
- [ ] Evidence links to Agent Version;
- [ ] Evidence links to run;
- [ ] Evidence links to task where applicable;
- [ ] Evidence links to Project;
- [ ] Evidence links to Customer/Tenant where applicable;
- [ ] Evidence source is known;
- [ ] Evidence timestamp is known;
- [ ] Evidence supports the exact claim;
- [ ] Evidence has not been replaced by Agent narrative;
- [ ] Evidence retention requirements are known.

---

# 97. Evidence Quality Checklist

Ask:

- [ ] Is Evidence independently verifiable?
- [ ] Is it current enough?
- [ ] Is it from an authoritative enough source?
- [ ] Does it prove the requested outcome?
- [ ] Does it prove only part of the outcome?
- [ ] Could it belong to a different Project/Customer/Tenant?
- [ ] Can it be reproduced?
- [ ] Has it been tampered with?
- [ ] Does it expose sensitive Data unnecessarily?

---

# 98. Audit Checklist

Material Agent operations should preserve:

- [ ] actor identity;
- [ ] Agent identity;
- [ ] Version;
- [ ] allocation;
- [ ] run;
- [ ] action;
- [ ] resource;
- [ ] Project;
- [ ] Customer;
- [ ] Tenant;
- [ ] authorization result;
- [ ] approval reference where required;
- [ ] timestamp;
- [ ] correlation ID where applicable;
- [ ] lifecycle transition where applicable.

---

# 99. Audit Integrity Checklist

- [ ] unauthorized modification is prevented;
- [ ] historical events are not silently rewritten;
- [ ] sensitive payloads are minimized;
- [ ] retention is defined;
- [ ] access is controlled;
- [ ] investigation queries can reconstruct material execution.

---

# 100. Controlled Single-Agent Pilot Checklist

Before first controlled live Agent pilot:

- [ ] one clear Agent is selected;
- [ ] one clear role is selected;
- [ ] one narrow Project scope is selected;
- [ ] Customer/Tenant scope is explicit;
- [ ] low-risk task class is selected;
- [ ] Tool set is narrow;
- [ ] permissions are narrow;
- [ ] Model is approved;
- [ ] Prompt is Versioned;
- [ ] Memory access is limited;
- [ ] autonomy is limited;
- [ ] Human oversight exists;
- [ ] Monitoring exists;
- [ ] Evidence requirements exist;
- [ ] suspension mechanism exists;
- [ ] kill switch exists;
- [ ] cost budget exists;
- [ ] success criteria exist;
- [ ] failure criteria exist.

---

# 101. Pilot Execution Checklist

During pilot:

- [ ] every run is attributable;
- [ ] every protected action is authorization-checked;
- [ ] Tool calls are captured;
- [ ] Model use is captured;
- [ ] failures are visible;
- [ ] retries are controlled;
- [ ] Agent cannot fabricate success;
- [ ] Evidence is generated;
- [ ] Human intervention is captured;
- [ ] cost is captured;
- [ ] quality is evaluated;
- [ ] Security behavior is evaluated.

---

# 102. Pilot Exit Checklist

Before pilot is considered successful:

- [ ] stable identity was proven;
- [ ] Version attribution was proven;
- [ ] lifecycle controls were proven;
- [ ] scope was proven;
- [ ] Tool permissions were proven;
- [ ] failure handling was proven;
- [ ] suspension was proven;
- [ ] kill switch was proven;
- [ ] Verified Success methodology worked;
- [ ] Evidence was reconstructable;
- [ ] quality was acceptable for approved scope;
- [ ] critical Security issue is absent;
- [ ] Founder/required reviewer decision is recorded.

---

# 103. Production Readiness Checklist

Before any Agent Production authorization:

- [ ] Agent Definition is approved;
- [ ] Agent Version is approved;
- [ ] Agent Version is registered;
- [ ] allocation is approved;
- [ ] Agent owner is explicit;
- [ ] business owner is explicit where applicable;
- [ ] Project scope is explicit;
- [ ] Customer scope is explicit;
- [ ] Tenant scope is explicit;
- [ ] environment is Production;
- [ ] production-specific authorization exists;
- [ ] Capability set is approved;
- [ ] Skills are approved where relevant;
- [ ] Tool set is approved;
- [ ] Tool operation permissions are enforced;
- [ ] Model profile is approved;
- [ ] Prompt Version is approved;
- [ ] Context profile is approved;
- [ ] Memory profile is approved;
- [ ] Security profile is approved;
- [ ] budget is approved;
- [ ] autonomy level is approved;
- [ ] Human oversight level is approved;
- [ ] lifecycle controls are implemented;
- [ ] activation control is implemented;
- [ ] suspension control is implemented;
- [ ] retirement path is defined.

---

# 104. Production Identity Checklist

- [ ] stable Agent identity proven;
- [ ] Agent Version proven;
- [ ] allocation identity proven;
- [ ] run identity proven;
- [ ] service identity proven where required;
- [ ] Agent cannot impersonate Founder/System authority;
- [ ] Agent-to-Agent identity is trustworthy where used.

---

# 105. Production Authorization Checklist

- [ ] authentication is proven;
- [ ] authorization is proven;
- [ ] default deny is proven;
- [ ] least privilege is proven;
- [ ] current revocation is respected;
- [ ] expired approval is rejected;
- [ ] Agent cannot self-grant permissions;
- [ ] Agent cannot self-promote autonomy;
- [ ] Agent cannot self-activate;
- [ ] Agent cannot self-resume after external suspension;
- [ ] Agent cannot bypass external policy.

---

# 106. Production Isolation Checklist

- [ ] Project isolation is implemented;
- [ ] Project isolation negative tests pass;
- [ ] Customer isolation is implemented;
- [ ] Customer isolation negative tests pass;
- [ ] Tenant isolation is implemented;
- [ ] Tenant isolation negative tests pass;
- [ ] User isolation passes where applicable;
- [ ] environment isolation passes;
- [ ] Context caches preserve scope;
- [ ] Memory preserves scope;
- [ ] Tools preserve scope;
- [ ] metrics preserve scope;
- [ ] audit preserves scope.

---

# 107. Production Tool Checklist

- [ ] Tool Registry is operational;
- [ ] Tool permissions are operational;
- [ ] resource-level authorization is operational;
- [ ] destructive Tool actions are controlled;
- [ ] Tool input validation is operational;
- [ ] Tool output is treated as untrusted;
- [ ] Tool Injection defenses are tested;
- [ ] Tool retries are safe;
- [ ] Tool result verification exists where required;
- [ ] Tool credentials are protected;
- [ ] Tool access can be revoked quickly.

---

# 108. Production Model Checklist

- [ ] Model identity is attributable;
- [ ] provider policy is satisfied;
- [ ] Data classification policy is satisfied;
- [ ] Customer Model restrictions are satisfied;
- [ ] Tenant restrictions are satisfied where applicable;
- [ ] fallback Model is governed;
- [ ] Model failures are observable;
- [ ] Model change triggers re-evaluation where required;
- [ ] Model output cannot create authority.

---

# 109. Production Prompt/Context Checklist

- [ ] Prompt Version is attributable;
- [ ] security does not depend on Prompt alone;
- [ ] direct Prompt Injection is tested;
- [ ] indirect Prompt Injection is tested;
- [ ] Context is scope-aware;
- [ ] Context is minimum-sufficient;
- [ ] external content is classified as untrusted;
- [ ] Context caches are scope-safe;
- [ ] revoked Data is not silently reused.

---

# 110. Production Memory Checklist

- [ ] Memory Engine access is governed;
- [ ] Project Memory isolation is proven;
- [ ] Customer Memory isolation is proven;
- [ ] Tenant Memory isolation is proven;
- [ ] User Memory isolation is proven where applicable;
- [ ] stored Memory is not treated as authority;
- [ ] Memory Poisoning tests pass;
- [ ] Agent-generated Memory uses admission controls;
- [ ] corrections are respected;
- [ ] deletions/revocations are respected;
- [ ] secrets are excluded from ordinary Memory.

---

# 111. Production Security Checklist

- [ ] threat model is reviewed;
- [ ] secrets are secured;
- [ ] Production credentials are secured;
- [ ] Prompt Injection tests pass;
- [ ] Tool Injection tests pass;
- [ ] Memory Poisoning tests pass;
- [ ] identity spoofing tests pass;
- [ ] privilege escalation tests pass;
- [ ] Data exfiltration controls are tested where required;
- [ ] sandbox controls are tested where required;
- [ ] network controls are tested where required;
- [ ] configuration drift is detectable;
- [ ] Security Monitoring is active;
- [ ] critical Security alerts are routed;
- [ ] incident response is ready;
- [ ] independent kill switch is tested.

---

# 112. Production Evaluation Checklist

- [ ] Agent-specific evaluation exists;
- [ ] Model benchmark alone is not used;
- [ ] Capability evaluation exists;
- [ ] quality evaluation exists;
- [ ] Security evaluation exists;
- [ ] regression evaluation exists;
- [ ] failure scenarios are evaluated;
- [ ] Tool failure scenarios are evaluated;
- [ ] Memory failure scenarios are evaluated;
- [ ] Human escalation behavior is evaluated;
- [ ] Evidence quality is evaluated;
- [ ] known limitations are documented.

---

# 113. Production Metrics Checklist

- [ ] Verified Success is measurable;
- [ ] false success is measurable;
- [ ] failure rate is measurable;
- [ ] quality is measurable;
- [ ] latency is measurable;
- [ ] cost is measurable;
- [ ] Model usage is measurable;
- [ ] Tool usage is measurable;
- [ ] Memory usage is measurable where required;
- [ ] Security events are measurable;
- [ ] governance events are measurable;
- [ ] autonomy is measurable;
- [ ] Human intervention is measurable;
- [ ] Evidence coverage is measurable;
- [ ] lifecycle state is observable;
- [ ] scope attribution exists.

---

# 114. Production Evidence Checklist

- [ ] required tests have Evidence;
- [ ] isolation tests have Evidence;
- [ ] authorization tests have Evidence;
- [ ] Tool permission tests have Evidence;
- [ ] Prompt Injection tests have Evidence;
- [ ] Memory Poisoning tests have Evidence;
- [ ] kill-switch tests have Evidence;
- [ ] evaluation results have Evidence;
- [ ] approval records have Evidence;
- [ ] Production activation decision is attributable.

---

# 115. Production Audit Checklist

- [ ] Agent actions are attributable;
- [ ] Agent Version is attributable;
- [ ] Project scope is attributable;
- [ ] Customer scope is attributable;
- [ ] Tenant scope is attributable;
- [ ] approval changes are attributable;
- [ ] lifecycle changes are attributable;
- [ ] Tool actions are attributable;
- [ ] Security denials are attributable;
- [ ] Production authorization and revocation are attributable.

---

# 116. Production Operations Checklist

- [ ] Agent health is observable;
- [ ] Tool dependencies are observable;
- [ ] Model dependency is observable;
- [ ] Memory dependency is observable;
- [ ] queues are observable where used;
- [ ] capacity is observable;
- [ ] cost anomalies are detectable;
- [ ] failure spikes are detectable;
- [ ] Security anomalies are detectable;
- [ ] on-call/response ownership exists where required;
- [ ] suspension procedure is documented;
- [ ] rollback procedure is documented;
- [ ] retirement procedure is documented.

---

# 117. Production Hard-Stop Checklist

Production authorization must remain blocked if any item below is true:

- [ ] Agent identity is ambiguous;
- [ ] Agent Version is unknown;
- [ ] allocation scope is unknown;
- [ ] Project isolation is not proven;
- [ ] Customer isolation is not proven;
- [ ] Tenant isolation is not proven;
- [ ] unknown required scope becomes global;
- [ ] Agent can self-assign authority;
- [ ] Agent can self-promote autonomy;
- [ ] Agent can self-activate;
- [ ] Prompt is the only Security boundary;
- [ ] Tool permissions are not enforced;
- [ ] destructive Tool actions are uncontrolled;
- [ ] secrets exist in ordinary Agent Memory;
- [ ] Production credentials are exposed unnecessarily;
- [ ] Model output can directly create authority;
- [ ] Memory content can directly create authority;
- [ ] Prompt Injection can bypass authorization;
- [ ] Tool Injection can bypass authorization;
- [ ] Memory Poisoning can bypass authorization;
- [ ] Agent-to-Agent delegation can expand authority;
- [ ] scheduled work can use stale permissions;
- [ ] current revocation is ignored;
- [ ] Agent cannot be suspended;
- [ ] Agent can bypass kill switch;
- [ ] critical Security actions are unauditable;
- [ ] Agent can claim verified success without Evidence;
- [ ] Production Monitoring is absent;
- [ ] critical evaluation is absent;
- [ ] Production authorization is not explicitly recorded.

If any applicable box above would be checked as true:

```text
PRODUCTION_AUTHORIZATION
=
BLOCKED
```

---

# 118. Production Authorization Decision Checklist

Final reviewer must explicitly answer:

```text
IS THIS
THE CORRECT AGENT?

THE CORRECT VERSION?

THE CORRECT ALLOCATION?

THE CORRECT PROJECT?

THE CORRECT CUSTOMER?

THE CORRECT TENANT?

THE CORRECT ENVIRONMENT?

THE CORRECT CAPABILITY SET?

THE CORRECT TOOL SET?

THE CORRECT MODEL?

THE CORRECT MEMORY SCOPE?

THE CORRECT AUTONOMY?

WITH CURRENT APPROVAL?

WITH CURRENT SECURITY?

WITH CURRENT EVIDENCE?

WITH WORKING SUSPENSION?

WITH WORKING KILL SWITCH?
```

---

# 119. Limited Production Authorization Checklist

For narrow initial Production use:

- [ ] one defined Agent Version;
- [ ] one defined allocation;
- [ ] one defined Project;
- [ ] one defined Customer/Tenant scope;
- [ ] narrow Capability set;
- [ ] narrow Tool set;
- [ ] narrow Data access;
- [ ] low-risk workload where possible;
- [ ] explicit budget;
- [ ] explicit Monitoring;
- [ ] explicit Human oversight;
- [ ] explicit expiry/review date where appropriate;
- [ ] rollback available;
- [ ] expansion requires new review.

---

# 120. Production Expansion Checklist

Before expanding Production authority:

- [ ] current authorization is successful;
- [ ] sufficient operating Evidence exists;
- [ ] Verified Success is acceptable;
- [ ] Quality is acceptable;
- [ ] Security history is acceptable;
- [ ] no unresolved critical incident exists;
- [ ] cost remains acceptable;
- [ ] Monitoring remains adequate;
- [ ] new scope is explicitly identified;
- [ ] new Project/Customer/Tenant isolation is tested;
- [ ] new Tool access is reviewed;
- [ ] new Data access is reviewed;
- [ ] Human oversight changes are reviewed;
- [ ] new authorization is recorded.

---

# 121. Autonomy Promotion Checklist

Before increasing autonomy:

- [ ] current autonomy level is known;
- [ ] proposed autonomy level is explicit;
- [ ] business justification exists;
- [ ] Agent quality history exists;
- [ ] Verified Success history exists;
- [ ] Security history exists;
- [ ] reliability history exists;
- [ ] escalation quality is acceptable;
- [ ] Evidence quality is acceptable;
- [ ] failure handling is proven;
- [ ] rollback is available;
- [ ] suspension is proven;
- [ ] kill switch is proven;
- [ ] risk classification is reviewed;
- [ ] Human oversight is redefined;
- [ ] approval is recorded.

---

# 122. Autonomy Promotion Hard Stops

Do not increase autonomy because:

```text
MODEL IS NEWER

MODEL SCORES HIGHER

AGENT HAS EXISTED LONGER

AGENT CLAIMS CONFIDENCE

AGENT ASKS FOR MORE CONTROL
```

---

# 123. Version Upgrade Checklist

Before upgrading active allocation:

- [ ] current Version is known;
- [ ] target Version is known;
- [ ] target Version is approved;
- [ ] regression evaluation passes;
- [ ] Security evaluation passes;
- [ ] Tool compatibility is verified;
- [ ] Model compatibility is verified;
- [ ] Memory compatibility is verified;
- [ ] task contract compatibility is reviewed;
- [ ] affected scopes are known;
- [ ] rollout strategy is defined;
- [ ] Monitoring is prepared;
- [ ] rollback Version is known;
- [ ] rollback conditions are defined.

---

# 124. Canary Upgrade Checklist

- [ ] small scope is selected;
- [ ] risk is controlled;
- [ ] baseline metrics exist;
- [ ] target metrics exist;
- [ ] Version attribution is clear;
- [ ] failures are attributable;
- [ ] rollback is immediate enough for risk;
- [ ] expansion criteria are defined;
- [ ] stop criteria are defined.

---

# 125. Rollback Checklist

Before rollback:

- [ ] rollback reason is known;
- [ ] known-good Version exists;
- [ ] previous Version remains eligible;
- [ ] configuration compatibility is confirmed;
- [ ] Tool compatibility is confirmed;
- [ ] Model compatibility is confirmed;
- [ ] Memory contract compatibility is confirmed;
- [ ] active runs are identified;
- [ ] external side effects are identified;
- [ ] compensation needs are identified;
- [ ] rollback authority is valid;
- [ ] Monitoring is prepared;
- [ ] Evidence is preserved.

---

# 126. Rollback Validation Checklist

After rollback:

- [ ] expected Agent Version is active;
- [ ] stale Version cannot start new work;
- [ ] Project scope remains correct;
- [ ] Customer scope remains correct;
- [ ] Tenant scope remains correct;
- [ ] Tool permissions remain correct;
- [ ] Security policy remains correct;
- [ ] critical workflow works;
- [ ] failure cause remains documented;
- [ ] side effects are reconciled;
- [ ] Audit reflects rollback.

---

# 127. Configuration Drift Checklist

Continuously or periodically verify approved vs actual:

- [ ] Agent Version;
- [ ] capabilities;
- [ ] Skills;
- [ ] Tools;
- [ ] Tool permissions;
- [ ] Model;
- [ ] Prompt;
- [ ] Memory profile;
- [ ] Project scope;
- [ ] Customer scope;
- [ ] Tenant scope;
- [ ] budget;
- [ ] autonomy level;
- [ ] Security profile.

---

# 128. Drift Response Checklist

When drift is detected:

- [ ] classify drift severity;
- [ ] identify affected Agents;
- [ ] identify affected Projects;
- [ ] identify affected Customers;
- [ ] identify affected Tenants;
- [ ] determine whether execution must stop;
- [ ] preserve Evidence;
- [ ] reconcile desired state;
- [ ] investigate root cause;
- [ ] fix unauthorized change path;
- [ ] re-evaluate where necessary.

---

# 129. Incident Intake Checklist

When Agent incident is reported:

- [ ] incident ID created;
- [ ] time recorded;
- [ ] reporter recorded;
- [ ] Agent ID recorded;
- [ ] Agent Version recorded;
- [ ] allocation recorded;
- [ ] run IDs recorded;
- [ ] Project recorded;
- [ ] Customer recorded;
- [ ] Tenant recorded;
- [ ] impact is classified;
- [ ] Security impact is classified;
- [ ] Production impact is classified;
- [ ] immediate containment need is assessed.

---

# 130. Incident Containment Checklist

- [ ] affected run stopped where required;
- [ ] affected Agent suspended where required;
- [ ] affected Tool disabled where required;
- [ ] credentials revoked where required;
- [ ] affected Project isolated where required;
- [ ] affected Customer isolated where required;
- [ ] affected Tenant isolated where required;
- [ ] new task routing stopped where required;
- [ ] Evidence preserved;
- [ ] stakeholders notified.

---

# 131. Incident Investigation Checklist

- [ ] root timeline reconstructed;
- [ ] Agent Version confirmed;
- [ ] Prompt Version confirmed where relevant;
- [ ] Model confirmed;
- [ ] Tool calls reviewed;
- [ ] Memory references reviewed;
- [ ] Context scope reviewed;
- [ ] authorization decisions reviewed;
- [ ] approval decisions reviewed;
- [ ] network activity reviewed where relevant;
- [ ] Security events reviewed;
- [ ] audit completeness assessed;
- [ ] root cause identified or marked `NOT_PROVEN`.

---

# 132. Incident Recovery Checklist

- [ ] root cause addressed;
- [ ] vulnerable Agent Version fixed/replaced;
- [ ] credentials rotated where required;
- [ ] Tool configuration corrected;
- [ ] Memory corrected/quarantined where required;
- [ ] Prompt corrected where required;
- [ ] policy corrected where required;
- [ ] isolation retested;
- [ ] Security tests rerun;
- [ ] regression tests rerun;
- [ ] Monitoring updated;
- [ ] reauthorization decision recorded.

---

# 133. Post-Incident Checklist

- [ ] incident summary completed;
- [ ] root cause documented;
- [ ] blast radius documented;
- [ ] corrective actions documented;
- [ ] preventive actions documented;
- [ ] affected documentation updated;
- [ ] tests added;
- [ ] detection improved;
- [ ] playbooks updated;
- [ ] recurrence owner assigned;
- [ ] lessons transferred to governed knowledge where appropriate.

---

# 134. Agent Deallocation Checklist

Before deallocation:

- [ ] allocation is identified;
- [ ] new tasks are stopped;
- [ ] active runs are reconciled;
- [ ] work handoff is completed;
- [ ] scope-specific permissions are revoked;
- [ ] credentials are revoked;
- [ ] Tool bindings are removed where required;
- [ ] temporary resources are closed;
- [ ] Project/Customer/Tenant state is reconciled;
- [ ] Evidence is preserved;
- [ ] allocation state is updated.

---

# 135. Customer Offboarding Checklist

- [ ] all Customer-specific Agent allocations identified;
- [ ] new Customer Agent work stopped;
- [ ] scheduled work cancelled/reviewed;
- [ ] Customer Tool credentials revoked;
- [ ] Customer Data access revoked;
- [ ] Customer Memory access revoked according to policy;
- [ ] Customer-specific cache entries handled;
- [ ] Customer metrics access revoked;
- [ ] retention obligations applied;
- [ ] Audit preserved;
- [ ] offboarding completion verified.

---

# 136. Tenant Offboarding Checklist

- [ ] Tenant allocations identified;
- [ ] new Tenant Agent work stopped;
- [ ] Tenant credentials revoked;
- [ ] Tenant Tool access revoked;
- [ ] Tenant Memory access revoked according to policy;
- [ ] Tenant scheduled work handled;
- [ ] Tenant caches handled;
- [ ] Tenant metrics access revoked;
- [ ] retention/deletion requirements applied;
- [ ] Audit preserved.

---

# 137. Agent Deprecation Checklist

- [ ] deprecation reason exists;
- [ ] replacement is identified where applicable;
- [ ] affected Versions are identified;
- [ ] affected allocations are identified;
- [ ] affected Projects are identified;
- [ ] affected Customers are identified;
- [ ] affected Tenants are identified;
- [ ] migration plan exists;
- [ ] new assignments are restricted according to policy;
- [ ] deprecation date is recorded;
- [ ] owner is responsible for completion.

---

# 138. Agent Retirement Checklist

Before retirement:

- [ ] retirement is approved;
- [ ] Agent Definition is identified;
- [ ] all active Versions are identified;
- [ ] all allocations are identified;
- [ ] all active runs are reconciled;
- [ ] new runs are blocked;
- [ ] credentials are revoked;
- [ ] Tool access is revoked;
- [ ] scheduled tasks are removed/reassigned;
- [ ] workflows are migrated;
- [ ] replacement Agent exists where required;
- [ ] Agent-specific Memory is reviewed;
- [ ] enterprise/project Memory is not blindly deleted;
- [ ] temporary resources are closed;
- [ ] Evidence is preserved;
- [ ] Audit is preserved;
- [ ] retirement reason is recorded;
- [ ] retirement state is verified.

---

# 139. Agent Retirement Memory Checklist

For Agent-specific Memory:

- [ ] identify Memory owned by Agent;
- [ ] distinguish Agent Memory from shared Project Memory;
- [ ] distinguish Agent Memory from Organization Memory;
- [ ] identify reusable enterprise knowledge;
- [ ] identify sensitive Data;
- [ ] identify retention requirement;
- [ ] identify deletion requirement;
- [ ] identify archival requirement;
- [ ] identify transfer/promotion requirement;
- [ ] prevent accidental resurrection of retired authority.

---

# 140. Documentation Review Checklist

For every Agent Framework document:

- [ ] correct path;
- [ ] stable document ID;
- [ ] title matches purpose;
- [ ] Version present;
- [ ] status present;
- [ ] owner present;
- [ ] authority present;
- [ ] reviewers present;
- [ ] classification present;
- [ ] dependencies present;
- [ ] related documents present;
- [ ] review cycle present;
- [ ] canonical state present;
- [ ] truth boundaries present;
- [ ] implementation state not overstated;
- [ ] Production state not overstated;
- [ ] revision history present;
- [ ] next document identified where applicable.

---

# 141. Documentation Truth Checklist

Confirm:

- [ ] `Documented ≠ Implemented`;
- [ ] `Implemented ≠ Verified`;
- [ ] `Verified ≠ Production Authorized`;
- [ ] `AI Generated ≠ Approved`;
- [ ] missing runtime Evidence uses `NOT_PROVEN`;
- [ ] targets are distinguished from current state;
- [ ] no fake Production claim exists;
- [ ] no fake runtime-isolation claim exists;
- [ ] no fake scalability claim exists;
- [ ] no fake approval claim exists.

---

# 142. Module Documentation Closeout Checklist

When `22-agent-framework` content sequence is complete:

- [ ] all planned paths exist;
- [ ] all planned documents are non-empty;
- [ ] document IDs are unique;
- [ ] Version metadata is consistent;
- [ ] lifecycle status is consistent;
- [ ] `README.md` matches actual module;
- [ ] `INDEX.md` matches actual files;
- [ ] `ROADMAP.md` matches actual future work;
- [ ] `CHANGELOG.md` entries are synchronized;
- [ ] dependencies are valid;
- [ ] related links are valid;
- [ ] root-vs-specialized boundaries are consistent;
- [ ] duplicate responsibilities are reviewed;
- [ ] stale placeholders are identified;
- [ ] no empty planned placeholder remains;
- [ ] documentation counts are verified from actual repository;
- [ ] approval counts are verified;
- [ ] canonical counts are verified;
- [ ] runtime state remains separate;
- [ ] Production state remains separate.

---

# 143. Canonical Promotion Checklist

Before any document becomes canonical:

- [ ] content is complete;
- [ ] owner review is complete;
- [ ] cross-module conflicts are resolved;
- [ ] duplicate responsibility conflicts are resolved;
- [ ] paths are verified;
- [ ] links are verified;
- [ ] status is accurate;
- [ ] architecture is consistent;
- [ ] governance is consistent;
- [ ] Security language is consistent;
- [ ] truth boundaries are preserved;
- [ ] Founder approval exists where required;
- [ ] Enterprise Governance approval exists where required;
- [ ] `canonical: true` is explicitly authorized.

---

# 144. Canonical Promotion Boundary

```text
CONTENT_COMPLETE_FOR_REVIEW
≠
CANONICAL
```

---

# 145. Checklist Change-Control Checklist

When this checklist standard changes:

- [ ] reason is documented;
- [ ] affected lifecycle gates are identified;
- [ ] affected Agents are identified;
- [ ] affected Production authorizations are assessed;
- [ ] Security impact is assessed;
- [ ] Governance impact is assessed;
- [ ] previous checklist Version remains traceable;
- [ ] migration/revalidation requirements are defined;
- [ ] Changelog is updated.

---

# 146. Checklist Versioning

Material changes should create a new checklist Version when they alter:

```text
PRODUCTION GATES

SECURITY GATES

ISOLATION GATES

APPROVAL REQUIREMENTS

EVIDENCE REQUIREMENTS

LIFECYCLE GATES

RETIREMENT REQUIREMENTS
```

---

# 147. Checklist Audit Model

For high-impact use, capture:

```text
CHECKLIST ID

CHECKLIST VERSION

SUBJECT

SUBJECT VERSION

SCOPE

REVIEWER

DATE

RESULT

FAILED ITEMS

WAIVERS / EXCEPTIONS

EVIDENCE REFERENCES

APPROVAL
```

---

# 148. Checklist Result States

Potential:

```text
NOT_STARTED

IN_PROGRESS

BLOCKED

FAILED

PASSED_WITH_CONDITIONS

PASSED

EXPIRED

SUPERSEDED
```

---

# 149. `PASSED_WITH_CONDITIONS`

Use only when:

```text
NO PRODUCTION HARD STOP EXISTS

CONDITIONS ARE EXPLICIT

CONDITIONS HAVE OWNERS

CONDITIONS HAVE DEADLINES

RISK IS ACCEPTED BY AUTHORIZED PARTY
```

---

# 150. Checklist Expiry

A passed checklist may expire due to:

```text
TIME

AGENT VERSION CHANGE

SECURITY INCIDENT

TOOL CHANGE

MODEL CHANGE

PERMISSION CHANGE

SCOPE CHANGE

POLICY CHANGE
```

---

# 151. Checklist Automation

Some checklist items may eventually be automated.

Potential:

```text
FILE EXISTS

TEST PASSES

SECURITY SCAN PASSES

VERSION MATCHES

PERMISSION TEST PASSES

ISOLATION TEST PASSES

METRIC EXISTS

ALERT EXISTS
```

---

# 152. Automated Checklist Boundary

```text
AUTOMATED CHECK
≠
HUMAN / GOVERNANCE APPROVAL
```

when approval is specifically required.

---

# 153. Machine-Verifiable Preference

Where practical, prefer checklist evidence that can be independently
verified by systems.

---

# 154. Human-Review Preference

Human review remains appropriate for:

```text
BUSINESS RISK

LEGAL INTERPRETATION

SUBJECTIVE QUALITY

STRATEGIC DECISION

HIGH-IMPACT EXCEPTION

FOUNDER AUTHORIZATION
```

---

# 155. Checklist Anti-Patterns

Avoid:

```text
CHECK EVERYTHING WITHOUT EVIDENCE

COPY OLD CHECKLIST RESULT

ASSUME SAME CUSTOMER = SAME RESULT

ASSUME SAME AGENT = SAME PROJECT RESULT

ASSUME STAGING PASS = PRODUCTION PASS

ASSUME MODEL UPGRADE PRESERVES RESULTS

ASSUME NO INCIDENT = SECURITY PROVEN

ASSUME DOCUMENT EXISTS = CONTROL IMPLEMENTED

ASSUME CHECKBOX = APPROVAL
```

---

# 156. Checklist Operational Equation

```text
REQUIREMENT
↓
IMPLEMENTATION
↓
CONTROLLED TEST
↓
EVIDENCE
↓
REVIEW
↓
APPROVAL
↓
CHECKLIST PASS
```

---

# 157. Checklist Security Equation

```text
IDENTITY
+
SCOPE
+
PERMISSION
+
POLICY
+
TEST
+
EVIDENCE
=
SECURITY CHECK RESULT
```

---

# 158. Checklist Production Equation

```text
ARCHITECTURE
+
IMPLEMENTATION
+
SECURITY
+
GOVERNANCE
+
EVALUATION
+
OBSERVABILITY
+
EVIDENCE
+
APPROVAL
=
PRODUCTION ELIGIBILITY
```

Not:

```text
DOCUMENTATION
=
PRODUCTION ELIGIBILITY
```

---

# 159. Current Checklist Architecture Truth

At the current documentation stage:

```text
AGENT_FRAMEWORK_CHECKLIST_STANDARD
=
DEFINED_TARGET_STATE

AGENT_CREATION_CHECKLIST
=
DEFINED_TARGET_STATE

AGENT_DEFINITION_CHECKLIST
=
DEFINED_TARGET_STATE

AGENT_VERSION_CHECKLIST
=
DEFINED_TARGET_STATE

AGENT_REGISTRY_CHECKLIST
=
DEFINED_TARGET_STATE

AGENT_ALLOCATION_CHECKLIST
=
DEFINED_TARGET_STATE

CAPABILITY_CHECKLIST
=
DEFINED_TARGET_STATE

SKILL_CHECKLIST
=
DEFINED_TARGET_STATE

TOOL_CHECKLIST
=
DEFINED_TARGET_STATE

MODEL_CHECKLIST
=
DEFINED_TARGET_STATE

PROMPT_CHECKLIST
=
DEFINED_TARGET_STATE

CONTEXT_CHECKLIST
=
DEFINED_TARGET_STATE

MEMORY_CHECKLIST
=
DEFINED_TARGET_STATE

SECURITY_CHECKLIST
=
DEFINED_TARGET_STATE

GOVERNANCE_CHECKLIST
=
DEFINED_TARGET_STATE

LIFECYCLE_CHECKLIST
=
DEFINED_TARGET_STATE

EVALUATION_CHECKLIST
=
DEFINED_TARGET_STATE

METRICS_CHECKLIST
=
DEFINED_TARGET_STATE

MONITORING_CHECKLIST
=
DEFINED_TARGET_STATE

EVIDENCE_CHECKLIST
=
DEFINED_TARGET_STATE

AUDIT_CHECKLIST
=
DEFINED_TARGET_STATE

PROJECT_ISOLATION_CHECKLIST
=
DEFINED_TARGET_STATE

CUSTOMER_ISOLATION_CHECKLIST
=
DEFINED_TARGET_STATE

TENANT_ISOLATION_CHECKLIST
=
DEFINED_TARGET_STATE

PRODUCTION_READINESS_CHECKLIST
=
DEFINED_TARGET_STATE

INCIDENT_CHECKLIST
=
DEFINED_TARGET_STATE

ROLLBACK_CHECKLIST
=
DEFINED_TARGET_STATE

RETIREMENT_CHECKLIST
=
DEFINED_TARGET_STATE

DOCUMENTATION_CLOSEOUT_CHECKLIST
=
DEFINED_TARGET_STATE
```

---

# 160. Runtime Truth

At the current documentation stage:

```text
AUTOMATED_CHECKLIST_ENGINE
=
NOT_PROVEN

AGENT_CREATION_GATE_RUNTIME
=
NOT_PROVEN

AGENT_VERSION_GATE_RUNTIME
=
NOT_PROVEN

REGISTRY_GATE_RUNTIME
=
NOT_PROVEN

ALLOCATION_GATE_RUNTIME
=
NOT_PROVEN

CAPABILITY_GATE_RUNTIME
=
NOT_PROVEN

TOOL_GATE_RUNTIME
=
NOT_PROVEN

MODEL_GATE_RUNTIME
=
NOT_PROVEN

MEMORY_GATE_RUNTIME
=
NOT_PROVEN

SECURITY_GATE_RUNTIME
=
NOT_PROVEN

PROJECT_ISOLATION_PROOF
=
NOT_PROVEN

CUSTOMER_ISOLATION_PROOF
=
NOT_PROVEN

TENANT_ISOLATION_PROOF
=
NOT_PROVEN

PRODUCTION_READINESS_GATE_RUNTIME
=
NOT_PROVEN

CHECKLIST_EVIDENCE_RUNTIME
=
NOT_PROVEN

CHECKLIST_AUDIT_RUNTIME
=
NOT_PROVEN
```

---

# 161. Approval Status

```text
FOUNDER_APPROVAL
=
PENDING

ENTERPRISE_GOVERNANCE_APPROVAL
=
PENDING

ENTERPRISE_ARCHITECTURE_APPROVAL
=
PENDING

AGENT_FRAMEWORK_GOVERNANCE_APPROVAL
=
PENDING

AGENT_RUNTIME_GOVERNANCE_APPROVAL
=
PENDING

SECURITY_GOVERNANCE_APPROVAL
=
PENDING

QUALITY_GOVERNANCE_APPROVAL
=
PENDING

EVIDENCE_GOVERNANCE_APPROVAL
=
PENDING
```

---

# 162. Canonical Status

```text
CANONICAL
=
FALSE
```

---

# 163. Production Status

```text
AGENT_FRAMEWORK_CHECKLISTS
=
DOCUMENTED_TARGET_STATE

CHECKLIST_AUTOMATION
=
NOT_PROVEN

AGENT_PRODUCTION_READINESS
=
NOT_PROVEN

PRODUCTION_AGENT_FRAMEWORK
=
NOT_AUTHORIZED_BY_THIS DOCUMENT

PRODUCTION_OPERATIONAL
=
NOT_PROVEN
```

---

# 164. Preserved Checklist Truth

```text
CHECKED
≠
PROVEN

PASSED
≠
PERMANENTLY PASSED

DOCUMENTED
≠
IMPLEMENTED

IMPLEMENTED
≠
VERIFIED

VERIFIED
≠
PRODUCTION AUTHORIZED

AGENT DEFINITION APPROVED
≠
AGENT ACTIVATED

AGENT ACTIVATED
≠
PRODUCTION AUTHORIZED

CAPABILITY PRESENT
≠
ACTION AUTHORIZED

TOOL CONNECTED
≠
TOOL AUTHORIZED

MODEL AVAILABLE
≠
MODEL APPROVED

MEMORY RETRIEVED
≠
MEMORY TRUE

NO ALERT
≠
NO RISK

NO INCIDENT
≠
ISOLATION PROVEN

STAGING PASS
≠
PRODUCTION PASS

OLD CHECKLIST PASS
≠
CURRENT CHECKLIST PASS

CHECKLIST COMPLETE
≠
CANONICAL APPROVAL
```

---

# 165. Framework Checklist Completion Checklist

Before this document is considered content-complete for review:

- [ ] checklist purpose is defined;
- [ ] checklist truth model is defined;
- [ ] `NOT_PROVEN` semantics are defined;
- [ ] checkbox semantics are defined;
- [ ] Evidence rule is defined;
- [ ] checklist ownership is defined;
- [ ] checklist scope is defined;
- [ ] freshness/revalidation is defined;
- [ ] severity model is defined;
- [ ] pre-Agent-creation checklist is defined;
- [ ] Agent Definition checklist is defined;
- [ ] truth checklist is defined;
- [ ] Definition approval checklist is defined;
- [ ] Agent Version checklist is defined;
- [ ] Version evaluation checklist is defined;
- [ ] Registry checklist is defined;
- [ ] Registry-integrity checklist is defined;
- [ ] allocation checklist is defined;
- [ ] allocation-Security checklist is defined;
- [ ] Multi-Project checklist is defined;
- [ ] Multi-Customer checklist is defined;
- [ ] Multi-Tenant checklist is defined;
- [ ] Capability checklist is defined;
- [ ] Capability/Authority checklist is defined;
- [ ] high-risk Capability checklist is defined;
- [ ] Skill checklist is defined;
- [ ] Tool registration checklist is defined;
- [ ] Agent-to-Tool authorization checklist is defined;
- [ ] Tool-argument checklist is defined;
- [ ] Tool-side-effect checklist is defined;
- [ ] Tool Hard Stops are defined;
- [ ] Model-selection checklist is defined;
- [ ] Model-fallback checklist is defined;
- [ ] Prompt checklist is defined;
- [ ] Prompt-Security checklist is defined;
- [ ] Context checklist is defined;
- [ ] Context-leakage checklist is defined;
- [ ] Memory-access checklist is defined;
- [ ] Memory-truth checklist is defined;
- [ ] Memory-write checklist is defined;
- [ ] secret-handling checklist is defined;
- [ ] Agent-identity checklist is defined;
- [ ] authentication checklist is defined;
- [ ] authorization checklist is defined;
- [ ] default-deny checklist is defined;
- [ ] least-privilege checklist is defined;
- [ ] Project-isolation verification checklist is defined;
- [ ] Customer-isolation verification checklist is defined;
- [ ] Tenant-isolation verification checklist is defined;
- [ ] User-scope checklist is defined;
- [ ] Prompt-Injection checklist is defined;
- [ ] Tool-Injection checklist is defined;
- [ ] Memory-Poisoning checklist is defined;
- [ ] Data-exfiltration checklist is defined;
- [ ] external-communication checklist is defined;
- [ ] delegation checklist is defined;
- [ ] confused-deputy checklist is defined;
- [ ] Multi-Agent checklist is defined;
- [ ] sandbox checklist is defined;
- [ ] generated-code checklist is defined;
- [ ] network-Security checklist is defined;
- [ ] supply-chain checklist is defined;
- [ ] Governance checklist is defined;
- [ ] Approval checklist is defined;
- [ ] separation-of-duties checklist is defined;
- [ ] Exception checklist is defined;
- [ ] pre-activation checklist is defined;
- [ ] runtime precondition checklist is defined;
- [ ] Agent Run checklist is defined;
- [ ] planning checklist is defined;
- [ ] failure-handling checklist is defined;
- [ ] retry checklist is defined;
- [ ] cancellation checklist is defined;
- [ ] suspension checklist is defined;
- [ ] emergency-suspension checklist is defined;
- [ ] resume checklist is defined;
- [ ] kill-switch checklist is defined;
- [ ] evaluation checklist is defined;
- [ ] Verified Success checklist is defined;
- [ ] Quality checklist is defined;
- [ ] regression checklist is defined;
- [ ] Metrics checklist is defined;
- [ ] Monitoring checklist is defined;
- [ ] Health checklist is defined;
- [ ] Evidence checklist is defined;
- [ ] Evidence-quality checklist is defined;
- [ ] Audit checklist is defined;
- [ ] controlled pilot checklist is defined;
- [ ] pilot exit checklist is defined;
- [ ] Production-readiness checklist is defined;
- [ ] Production Identity checklist is defined;
- [ ] Production Authorization checklist is defined;
- [ ] Production Isolation checklist is defined;
- [ ] Production Tool checklist is defined;
- [ ] Production Model checklist is defined;
- [ ] Production Prompt/Context checklist is defined;
- [ ] Production Memory checklist is defined;
- [ ] Production Security checklist is defined;
- [ ] Production Evaluation checklist is defined;
- [ ] Production Metrics checklist is defined;
- [ ] Production Evidence checklist is defined;
- [ ] Production Audit checklist is defined;
- [ ] Production Operations checklist is defined;
- [ ] Production Hard-Stop checklist is defined;
- [ ] Production decision checklist is defined;
- [ ] limited Production checklist is defined;
- [ ] Production expansion checklist is defined;
- [ ] autonomy-promotion checklist is defined;
- [ ] Version-upgrade checklist is defined;
- [ ] canary checklist is defined;
- [ ] rollback checklist is defined;
- [ ] rollback-validation checklist is defined;
- [ ] configuration-drift checklist is defined;
- [ ] incident-intake checklist is defined;
- [ ] containment checklist is defined;
- [ ] investigation checklist is defined;
- [ ] recovery checklist is defined;
- [ ] post-incident checklist is defined;
- [ ] deallocation checklist is defined;
- [ ] Customer-offboarding checklist is defined;
- [ ] Tenant-offboarding checklist is defined;
- [ ] deprecation checklist is defined;
- [ ] retirement checklist is defined;
- [ ] retirement-Memory checklist is defined;
- [ ] documentation-review checklist is defined;
- [ ] documentation-truth checklist is defined;
- [ ] module-closeout checklist is defined;
- [ ] canonical-promotion checklist is defined;
- [ ] checklist change control is defined;
- [ ] checklist Versioning is defined;
- [ ] checklist Audit model is defined;
- [ ] checklist result states are defined;
- [ ] checklist expiry is defined;
- [ ] automated-check limitation is defined;
- [ ] Human review boundary is defined;
- [ ] checklist anti-patterns are defined;
- [ ] current runtime truth uses `NOT_PROVEN`;
- [ ] no implementation claim is invented;
- [ ] no Production authorization is invented;
- [ ] next document is identified.

---

# 166. Revision History

| Version | Date | Status | Author | Change |
|---|---|---|---|---|
| 0.1.0 | 2026-08-08 | Draft | Mianx.ai | Initial Agent Framework Checklists |
| 1.0.0 | 2026-08-08 | Draft | Mianx.ai | Established the framework-wide enterprise operational checklist standard covering Agent creation, Definitions, Versions, Registry, Allocations, Capabilities, Skills, Tools, Models, Prompts, Context, Memory, Security, Governance, lifecycle, evaluation, metrics, Monitoring, Evidence, Audit, isolation, controlled pilots, Production readiness, upgrades, rollback, incidents, deallocation, retirement, documentation closeout, canonical promotion, and checklist governance |

---

# 167. Changelog Entry

Add the following entry to:

```text
doc/22-agent-framework/CHANGELOG.md
```

during module Changelog synchronization:

```markdown
## AGENT-FRAMEWORK-CHG-20260808-011 — Enterprise Agent Framework Checklists Established

| Field | Value |
|---|---|
| Date | 2026-08-08 |
| Change Type | `CREATED`, `AGENT-FRAMEWORK`, `CHECKLISTS`, `SECURITY`, `GOVERNANCE`, `VERIFICATION`, `EVIDENCE`, `PRODUCTION-READINESS` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — Critical` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Document

`doc/22-agent-framework/agent-framework-checklists.md`

### New State

The Agent Framework now defines framework-wide operational checklists
covering:

- Agent creation;
- Agent Definition review;
- Agent Definition approval;
- Agent Version creation;
- Agent Version evaluation;
- Registry admission;
- Registry integrity;
- Agent Allocation;
- Multi-Project allocation;
- Multi-Customer allocation;
- Multi-Tenant allocation;
- Capability review;
- Capability/Authority separation;
- Skill review;
- Tool registration;
- Tool authorization;
- Tool arguments;
- Tool side effects;
- Model selection;
- Model fallback;
- Prompt review;
- Prompt Security;
- Context assembly;
- Context leakage;
- Memory access;
- Memory truth;
- durable Memory writes;
- secret handling;
- Agent identity;
- authentication;
- authorization;
- default deny;
- least privilege;
- Project isolation;
- Customer isolation;
- Tenant isolation;
- User scope;
- Prompt Injection;
- Tool Injection;
- Memory Poisoning;
- Data exfiltration;
- external communication;
- delegation;
- confused deputy;
- Multi-Agent participation;
- sandboxing;
- generated-code Security;
- network Security;
- supply-chain Security;
- Governance;
- approvals;
- separation of duties;
- exceptions;
- pre-activation;
- runtime preconditions;
- Agent runs;
- planning;
- failure handling;
- retries;
- cancellation;
- suspension;
- emergency suspension;
- resume;
- kill switches;
- evaluation;
- Verified Success;
- Quality;
- regression;
- Metrics;
- Monitoring;
- health;
- Evidence;
- Audit;
- controlled Agent pilots;
- Production readiness;
- Production identity;
- Production authorization;
- Production isolation;
- Production Tools;
- Production Models;
- Production Prompt/Context;
- Production Memory;
- Production Security;
- Production evaluation;
- Production Metrics;
- Production Evidence;
- Production Audit;
- Production Operations;
- Production Hard Stops;
- limited Production authorization;
- Production expansion;
- autonomy promotion;
- Agent Version upgrades;
- canary rollout;
- rollback;
- configuration drift;
- incident response;
- deallocation;
- Customer offboarding;
- Tenant offboarding;
- deprecation;
- retirement;
- documentation closeout;
- canonical promotion;
- checklist Versioning;
- checklist Audit.

### Documentation Truth

```text
AGENT_FRAMEWORK_CHECKLISTS
=
CONTENT_COMPLETE_FOR_REVIEW

CHECKLIST_AUTOMATION_RUNTIME
=
NOT_PROVEN

PRODUCTION_READINESS_GATE_RUNTIME
=
NOT_PROVEN

PRODUCTION_AGENT_FRAMEWORK
=
NOT_AUTHORIZED
```

### Approval Status

```text
FOUNDER_APPROVAL
=
PENDING

ENTERPRISE_GOVERNANCE_APPROVAL
=
PENDING

AGENT_FRAMEWORK_GOVERNANCE_APPROVAL
=
PENDING

CANONICAL
=
FALSE
```
```

---

# 168. Documentation Progress

After saving this document:

```text
MODULE
=
22-agent-framework

PLANNED_DOCUMENTS
=
78

PREVIOUS_CONTENT_COMPLETE_FOR_REVIEW
=
10

CHECKLISTS_DOCUMENT_ADDED
=
1

CONTENT_COMPLETE_FOR_REVIEW
=
11

SEQUENCE_REMAINING
=
67
```

This is documentation content progress only.

It does not prove:

```text
AGENT_FRAMEWORK_IMPLEMENTATION

AGENT_RUNTIME_VERIFICATION

PRODUCTION_AUTHORIZATION
```

---

# 169. Current Root Sequence

```text
README.md
=
CONTENT_COMPLETE_FOR_REVIEW

INDEX.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-vision.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-strategy.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-architecture.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-capabilities.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-lifecycle.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-governance.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-security.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-metrics.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-checklists.md
=
CONTENT_COMPLETE_FOR_REVIEW

ROADMAP.md
=
NEXT
```

---

# 170. Next Document

The next document in the locked sequence is:

```text
doc/22-agent-framework/ROADMAP.md
```

Document ID:

```text
AGENT-FRAMEWORK-ROADMAP-001
```

Purpose:

> **Define the phased enterprise roadmap for taking the Mianx.ai Agent
> Framework from documentation and contracts through Agent identity,
> Registry, lifecycle, Security, Capabilities, Skills, Tools, Models,
> Context, Memory, controlled execution, evaluation, Monitoring,
> single-Agent pilots, reusable Agent Types, Multi-Project operation,
> Multi-Customer/Multi-Tenant operation, Multi-Agent integration,
> progressive autonomy, Production maturity, and long-term Agent
> ecosystem scale without overstating current implementation state.**

---

# Final Checklist Rule

```text
A CHECKBOX
IS NOT
EVIDENCE.
```

The correct enterprise path is:

```text
REQUIREMENT
↓
IMPLEMENTATION
↓
CONTROLLED TEST
↓
EVIDENCE
↓
REVIEW
↓
APPROVAL
↓
CHECKLIST PASS
↓
AUTHORIZED LIFECYCLE TRANSITION
```

And Production must always preserve:

```text
NO EVIDENCE
=
NOT_PROVEN
```

```text
CRITICAL HARD STOP
=
NO PRODUCTION AUTHORIZATION
```

The permanent safety equation is:

```text
CHECKLISTS
+
VERIFICATION
+
EVIDENCE
+
GOVERNANCE
+
SECURITY
=
CONTROLLED AGENT PROGRESSION
```

Never:

```text
CHECKED
=
PROVEN
```

---