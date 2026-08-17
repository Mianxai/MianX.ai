---
id: MEMORY-WORKING-MANAGEMENT-001
title: Mianx.ai Memory Engine Working Memory Management
version: 1.0.0
status: Draft

type: Enterprise Working Memory Management, Active Execution State, Session Context, Task Context, Temporary Variables, Context Assembly, Context Prioritization, Scope Isolation, Multi-Agent State, Multi-Project Isolation, Multi-Customer Isolation, Multi-Tenant Isolation, Context Window Governance, Checkpointing, Compaction, Promotion, Expiration, Eviction, Cleanup, Concurrency, Recovery, Security, Privacy, Observability, Evidence, Testing, and Production Readiness Standard

class: Governed Enterprise Working Memory Management Standard for MianX Core Platform, Mianx.ai AI Operating System, Memory Engine, Shared AI Workforce, Agent Runtime, Task Engine, Workflow Engine, Context Manager, Project Factory, Founder Workspace, Industry Operating Systems, Customer Editions, Multi-Project Operations, Multi-Customer Operations, Multi-Tenant Operations, Autonomous Agents, Human-AI Collaboration, and Autonomous Enterprise Creation at Scale

owner: Mianx.ai Founder

authority: Founder and Enterprise Governance

steward:
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Memory Platform Governance
  - Working Memory Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Agent Runtime Governance
  - Context Governance
  - Task Governance
  - Workflow Governance
  - Project Governance
  - Data Governance
  - Security Governance
  - Privacy Governance
  - Reliability Governance
  - Risk Governance
  - Quality Governance
  - Evidence Governance
  - Audit Governance
  - Enterprise Operations
  - Documentation Governance

maintainers:
  - Memory Platform Engineering
  - Working Memory Engineering
  - AI Operating System Engineering
  - Agent Runtime Engineering
  - Context Platform Engineering
  - Task Engine Engineering
  - Workflow Engine Engineering
  - Project Platform Engineering
  - Data Platform Engineering
  - Storage Engineering
  - Cache Engineering
  - Retrieval Engineering
  - Security Engineering
  - Privacy Engineering
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
  - Memory Platform Governance
  - Working Memory Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Agent Runtime Governance
  - Context Governance
  - Task Governance
  - Workflow Governance
  - Project Governance
  - Data Governance
  - Security Governance
  - Privacy Governance
  - Reliability Engineering
  - Risk Governance
  - Quality Governance
  - Evidence Governance
  - Audit Governance
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
  - Memory Architects
  - AI Operating System Architects
  - Agent Architects
  - Context Architects
  - Task Architects
  - Workflow Architects
  - Project Architects
  - Security Architects
  - Privacy Architects
  - Memory Engineers
  - Agent Runtime Engineers
  - Context Engineers
  - Task Engine Engineers
  - Workflow Engineers
  - Project Platform Engineers
  - Data Engineers
  - Storage Engineers
  - Cache Engineers
  - Retrieval Engineers
  - Security Engineers
  - Privacy Engineers
  - Reliability Engineers
  - Quality Engineers
  - Auditors
  - Enterprise Operators
  - Documentation Maintainers

depends_on:
  - ../README.md
  - ../INDEX.md
  - ../ROADMAP.md
  - ../CHANGELOG.md
  - ../memory-vision.md
  - ../memory-strategy.md
  - ../memory-architecture.md
  - ../memory-governance.md
  - ../memory-security.md
  - ../memory-lifecycle.md
  - ../memory-capabilities.md
  - ../memory-metrics.md
  - ../memory-checklists.md
  - ../architecture/component-architecture.md
  - ../architecture/data-flow.md
  - ../architecture/storage-architecture.md
  - ../architecture/system-architecture.md
  - ../context/context-management.md
  - ../context/context-sharing.md
  - ../context/context-window.md
  - ../conversation-memory/conversation-memory.md
  - ../governance/memory-governance.md
  - ../memory-types/working-memory.md
  - ../memory-types/short-term-memory.md
  - ../memory-types/episodic-memory.md
  - ../memory-types/semantic-memory.md
  - ../memory-types/long-term-memory.md
  - ../monitoring/memory-monitoring.md
  - ../project-memory/project-memory.md
  - ../organization-memory/organization-memory.md
  - ../agent-memory/agent-memory.md
  - ../user-memory/user-memory.md
  - ../retrieval/retrieval-engine.md
  - ../security/memory-security.md
  - ../storage/storage-engine.md
  - ../storage/storage-policies.md
  - ../../01-governance/AI-CONSTITUTION.md
  - ../../19-ai-workforce/README.md
  - ../../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md
  - ../../20-ai-operating-system/README.md
  - ../../20-ai-operating-system/MASTER-BLUEPRINT.md
  - ../../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md
  - ../../20-ai-operating-system/context-manager/context-management.md
  - ../../20-ai-operating-system/context-manager/context-sharing.md
  - ../../20-ai-operating-system/memory-manager/memory-lifecycle.md
  - ../../20-ai-operating-system/memory-manager/memory-manager.md

related_documents:
  - ../memory-types/working-memory.md
  - ../memory-types/short-term-memory.md
  - ../memory-types/episodic-memory.md
  - ../context/context-management.md
  - ../context/context-sharing.md
  - ../context/context-window.md
  - ../conversation-memory/conversation-memory.md
  - ../agent-memory/agent-memory.md
  - ../user-memory/user-memory.md
  - ../project-memory/project-memory.md
  - ../retrieval/retrieval-engine.md
  - ../storage/storage-engine.md
  - ../storage/storage-policies.md
  - ../security/memory-security.md
  - ../monitoring/memory-monitoring.md

review_cycle:
  - At Every Material Working Memory Architecture Change
  - At Every Session Model Change
  - At Every Task Execution Model Change
  - At Every Workflow Execution Model Change
  - At Every Agent Runtime Change
  - At Every Context Window Change
  - At Every Context Prioritization Change
  - At Every Working Memory Promotion Change
  - At Every Working Memory Expiration Change
  - At Every Working Memory Storage Change
  - At Every Multi-Agent State-Sharing Change
  - At Every Project Scope Change
  - At Every Customer Scope Change
  - At Every Tenant Scope Change
  - At Every User Scope Change
  - At Every Security or Privacy Change
  - Before Controlled Working Memory Pilot
  - Before Production Working Memory Authorization
  - Before Canonical Promotion
  - Quarterly During Active Build
  - Annually During Stable Operation

canonical: false
---

# Mianx.ai Memory Engine Working Memory Management

> **This document defines the governed target-state management model for
> Working Memory within the Mianx.ai Memory Engine.**
>
> **Working Memory is the active cognitive workspace used during current
> sessions, tasks, workflows, Agent execution, Human-AI collaboration, and
> controlled multi-Agent operations.**
>
> **Working Memory is temporary by design.**
>
> **It may contain current task state, active goals, intermediate results,
> selected Context, temporary variables, active constraints, current
> dependencies, pending approvals, tool outputs, execution checkpoints,
> and unresolved work required to continue the current operation.**
>
> **Working Memory is not permanent organizational knowledge.**
>
> **Working Memory is not automatically Semantic Memory.**
>
> **Working Memory is not automatically Episodic Memory.**
>
> **Working Memory is not automatically User Memory, Project Memory,
> Organization Memory, or Agent Memory.**
>
> **Temporary presence does not create truth, authority, approval,
> retention rights, or permission to cross Project, Customer, Tenant,
> User, Agent, or workflow boundaries.**
>
> **Every promotion from Working Memory into durable Memory must pass the
> applicable Memory admission, provenance, classification, authority,
> scope, privacy, lifecycle, and governance controls.**
>
> **Working Memory runtime, persistence, TTL enforcement, distributed
> coordination, cross-Agent isolation, Project isolation, Customer
> isolation, Tenant isolation, checkpoint recovery, promotion,
> compaction, eviction, Security, Privacy, Monitoring, Evidence, and
> Production readiness remain `NOT_PROVEN` until independently
> demonstrated.**

---

# 1. Purpose

This document answers:

```text
WHAT IS WORKING MEMORY?

WHAT IS NOT WORKING MEMORY?

WHAT INFORMATION MAY ENTER WORKING MEMORY?

WHO OWNS A WORKING MEMORY SCOPE?

HOW IS A SESSION IDENTIFIED?

HOW IS AN ACTIVE TASK IDENTIFIED?

HOW IS A WORKFLOW IDENTIFIED?

HOW IS AN AGENT IDENTIFIED?

HOW IS A USER IDENTIFIED?

HOW ARE PROJECTS ISOLATED?

HOW ARE CUSTOMERS ISOLATED?

HOW ARE TENANTS ISOLATED?

HOW IS ACTIVE CONTEXT ASSEMBLED?

HOW IS CONTEXT PRIORITIZED?

HOW IS THE CONTEXT WINDOW MANAGED?

HOW ARE TEMPORARY VARIABLES MANAGED?

HOW ARE INTERMEDIATE RESULTS MANAGED?

HOW ARE TOOL RESULTS MANAGED?

HOW ARE APPROVAL STATES MANAGED?

HOW ARE CHECKPOINTS CREATED?

HOW IS INTERRUPTED WORK RECOVERED?

HOW IS WORKING MEMORY COMPACTED?

HOW IS WORKING MEMORY EXPIRED?

HOW IS WORKING MEMORY EVICTED?

HOW IS WORKING MEMORY CLEANED UP?

HOW IS WORKING MEMORY PROMOTED TO DURABLE MEMORY?

HOW ARE MULTIPLE AGENTS PREVENTED FROM CORRUPTING SHARED STATE?

HOW ARE CONCURRENT UPDATES CONTROLLED?

HOW IS WORKING MEMORY SECURED?

HOW IS WORKING MEMORY OBSERVED?

WHAT MUST BE PROVEN BEFORE PRODUCTION?
```

---

# 2. Strategic Placement

```text
Founder / Human User
↓
MianX Core Platform
↓
Mianx.ai AI Operating System
↓
Task / Workflow / Agent Runtime
↓
Context Manager
↓
Working Memory Manager
↓
Active Execution Context
↓
Model / Tool / Agent Execution
↓
Result Validation
↓
Checkpoint / Continue / Complete
↓
Governed Promotion or Disposal
↓
Memory Engine
```

---

# 3. Working Memory Mission

The mission is:

> **Maintain the smallest sufficient, current, authorized, coherent
> execution state required to complete active work safely and
> efficiently.**

---

# 4. Working Memory Definition

Working Memory represents active, temporary execution state.

Potential contents include:

```text
CURRENT SESSION

CURRENT TASK

CURRENT SUBTASK

CURRENT WORKFLOW

CURRENT STEP

CURRENT GOAL

CURRENT INTENT

CURRENT PLAN

CURRENT CONSTRAINTS

CURRENT DEPENDENCIES

CURRENT INPUTS

CURRENT INTERMEDIATE RESULTS

CURRENT TOOL OUTPUTS

CURRENT VARIABLES

CURRENT APPROVAL STATE

CURRENT ERROR STATE

CURRENT RETRY STATE

CURRENT CHECKPOINT

CURRENT CONTEXT REFERENCES

CURRENT UNRESOLVED QUESTIONS
```

---

# 5. Historical Working Memory Model

Earlier Mianx.ai Memory design defined Working Memory as the first,
short-lived tier containing:

```text
CURRENT SESSION CONTEXT

ACTIVE TASK STATE

TEMPORARY VARIABLES
```

with session-oriented lifetime semantics.

This document preserves that architectural intent while adding
enterprise governance, isolation, lifecycle, recovery, and Production
safety requirements.

---

# 6. Working Memory Is Operational State

```text
WORKING MEMORY
=
ACTIVE EXECUTION STATE
```

It exists primarily to help current work continue correctly.

---

# 7. Working Memory Non-Goals

Working Memory is not intended to become:

- permanent enterprise knowledge;
- permanent User profile;
- permanent Agent profile;
- long-term Project history;
- unbounded conversation archive;
- source of canonical policy;
- source of business authority;
- credentials vault;
- audit log replacement;
- task-system replacement;
- workflow-system replacement;
- authoritative database replacement.

---

# 8. Core Truth Boundaries

```text
IN WORKING MEMORY
≠
TRUE

IN WORKING MEMORY
≠
APPROVED

IN WORKING MEMORY
≠
CANONICAL

IN WORKING MEMORY
≠
PERMANENT

ACTIVE
≠
AUTHORIZED FOR EVERY ACTION

CURRENT TASK CONTEXT
≠
PROJECT-GLOBAL CONTEXT

PROJECT CONTEXT
≠
CUSTOMER-GLOBAL CONTEXT

CUSTOMER CONTEXT
≠
ORGANIZATION-GLOBAL CONTEXT

AGENT CAN SEE
≠
AGENT CAN MODIFY

AGENT CAN MODIFY
≠
AGENT CAN PROMOTE

AGENT CAN PROMOTE CANDIDATE
≠
DURABLE MEMORY APPROVED

SESSION EXISTS
≠
SESSION AUTHORIZED

RETRIEVED
≠
SAFE TO EXECUTE

TOOL OUTPUT
≠
TRUSTED FACT

MODEL OUTPUT
≠
APPROVED RESULT

CHECKPOINT EXISTS
≠
CHECKPOINT SAFE TO RESUME

TEMPORARY
≠
UNPROTECTED

EXPIRED
≠
PHYSICALLY ERASED AUTOMATICALLY

WORKING MEMORY DOCUMENTED
≠
WORKING MEMORY IMPLEMENTED
```

---

# 9. Working Memory Scope Hierarchy

Conceptually:

```text
ORGANIZATION
↓
CUSTOMER
↓
TENANT
↓
PROJECT
↓
WORKSPACE
↓
WORKFLOW
↓
TASK
↓
SESSION
↓
AGENT / USER EXECUTION CONTEXT
```

Not every deployment requires every level, but protected scope must never
be guessed.

---

# 10. Scope Principle

Working Memory must remain bound to the narrowest appropriate execution
scope.

---

# 11. Organization Scope

Organization-level Working Memory should be rare and explicitly governed.

---

# 12. Customer Scope

Customer-specific active state must preserve Customer identity.

```text
customer_id
```

where applicable.

---

# 13. Customer Isolation

```text
CUSTOMER A WORKING MEMORY
→
CUSTOMER B
=
DENY BY DEFAULT
```

---

# 14. Tenant Scope

Tenant-specific active state must preserve:

```text
tenant_id
```

where applicable.

---

# 15. Tenant Isolation

```text
TENANT A WORKING MEMORY
→
TENANT B
=
DENY BY DEFAULT
```

---

# 16. Project Scope

Project execution state must preserve:

```text
project_id
```

where applicable.

---

# 17. Project Isolation

```text
PROJECT A WORKING MEMORY
→
PROJECT B
=
DENY BY DEFAULT
```

unless explicit governed sharing is authorized.

---

# 18. Same-Customer Multi-Project Boundary

```text
CUSTOMER X / PROJECT A
≠
CUSTOMER X / PROJECT B
```

for Project-specific active execution state.

---

# 19. User Scope

User-specific Working Memory may preserve:

```text
user_id
```

where the User is the subject or execution participant.

---

# 20. Agent Scope

Agent execution state may preserve:

```text
agent_id
```

---

# 21. Session Scope

Each active session should have stable execution identity.

Conceptually:

```text
session_id
```

---

# 22. Task Scope

Each active task should have stable identity.

```text
task_id
```

---

# 23. Workflow Scope

Workflow-driven state should preserve:

```text
workflow_id
```

where applicable.

---

# 24. Run Identity

Repeated execution of the same task may require:

```text
run_id
```

to distinguish attempts.

---

# 25. Attempt Identity

Retries may require:

```text
attempt_id
```

to prevent state collision.

---

# 26. Composite Working Memory Identity

Conceptually:

```yaml
working_memory_identity:
  organization_id: conditional
  customer_id: conditional
  tenant_id: conditional
  project_id: conditional

  workflow_id: conditional
  task_id: conditional

  session_id: required

  run_id: conditional
  attempt_id: conditional

  user_id: conditional
  agent_id: conditional
```

---

# 27. Identity Hard Rule

```text
TASK ID
ALONE
MAY NOT DEFINE
COMPLETE WORKING MEMORY SCOPE
```

---

# 28. Unknown Scope

If a required protected scope cannot be determined:

```text
FAIL SAFE
```

---

# 29. Unknown Scope Hard Rule

```text
UNKNOWN TENANT
≠
TENANT-GLOBAL

UNKNOWN PROJECT
≠
PROJECT-GLOBAL

UNKNOWN USER
≠
ANY USER
```

---

# 30. Working Memory Record

Conceptually:

```yaml
working_memory:
  working_memory_id: required

  organization_id: conditional
  customer_id: conditional
  tenant_id: conditional
  project_id: conditional

  workflow_id: conditional
  task_id: conditional
  subtask_id: conditional

  session_id: required
  run_id: conditional
  attempt_id: conditional

  user_id: conditional
  agent_id: conditional

  current_goal: conditional
  current_step: conditional

  state: required

  variables: conditional
  active_constraints: conditional
  dependency_refs: conditional
  context_refs: conditional
  intermediate_result_refs: conditional
  tool_result_refs: conditional

  approval_state: conditional
  error_state: conditional

  checkpoint_ref: conditional

  classification: required

  lifecycle_status: required

  created_at: required
  updated_at: required

  expires_at: conditional
```

This is a conceptual model, not a proven runtime schema.

---

# 31. State Types

Working Memory may contain state such as:

```text
IDENTITY STATE

TASK STATE

WORKFLOW STATE

PLAN STATE

CONTEXT STATE

VARIABLE STATE

DEPENDENCY STATE

TOOL STATE

APPROVAL STATE

ERROR STATE

RETRY STATE

CHECKPOINT STATE

HANDOFF STATE
```

---

# 32. Current Goal

The current goal should express the active execution objective.

---

# 33. Goal Boundary

```text
CURRENT GOAL
≠
PERMANENT USER GOAL

CURRENT GOAL
≠
PROJECT STRATEGY
```

unless separately promoted and governed.

---

# 34. Current Plan

Working Memory may hold an active execution plan.

---

# 35. Plan Boundary

```text
ACTIVE PLAN
≠
APPROVED ENTERPRISE ROADMAP
```

---

# 36. Current Step

The system should know where execution currently stands.

Potential:

```text
STEP ID

STEP STATUS

INPUTS

OUTPUTS

DEPENDENCIES

NEXT STEP
```

---

# 37. Temporary Variables

Working Memory may maintain temporary variables.

Examples:

```text
SELECTED FILE

CURRENT QUERY

CURRENT ITEM ID

TEMPORARY SCORE

CURRENT LOOP POSITION

INTERMEDIATE CALCULATION

CURRENT TOOL PARAMETERS
```

---

# 38. Variable Boundary

```text
TEMPORARY VARIABLE
≠
DURABLE BUSINESS RECORD
```

---

# 39. Intermediate Results

Working Memory may contain intermediate results required to finish a task.

---

# 40. Intermediate Result Boundary

```text
INTERMEDIATE
≠
FINAL

INTERMEDIATE
≠
APPROVED
```

---

# 41. Tool Outputs

Tool outputs may enter Working Memory for current execution.

---

# 42. Tool Output Hard Rule

```text
TOOL RETURNED DATA
≠
DATA TRUSTED AUTOMATICALLY
```

---

# 43. Tool Output Metadata

Where material, preserve:

```text
TOOL ID

CALL ID

REQUEST ID

TIME

RESULT STATUS

SOURCE REFERENCES

SCOPE

ERROR
```

---

# 44. Model Outputs

Model-generated content may exist temporarily in Working Memory.

---

# 45. Model Output Boundary

```text
MODEL OUTPUT
≠
SOURCE OF TRUTH
```

---

# 46. Active Constraints

Working Memory should preserve material execution constraints.

Potential:

```text
FOUNDER INSTRUCTION

POLICY CONSTRAINT

BUDGET LIMIT

TOOL LIMIT

TIME LIMIT

SECURITY RESTRICTION

PROJECT BOUNDARY

CUSTOMER BOUNDARY

APPROVAL REQUIREMENT

QUALITY GATE
```

---

# 47. Constraint Priority

Higher governance constraints must not be overwritten by lower-level
Working Memory state.

---

# 48. Founder Constraint

Founder-authorized constraints may apply to current execution.

They remain subject to system safety, applicable law, and enterprise
governance architecture.

---

# 49. Approval State

Working Memory may track whether an execution step requires approval.

Potential:

```text
NOT_REQUIRED

PENDING

APPROVED

REJECTED

EXPIRED

REVOKED
```

Exact runtime states remain implementation-specific.

---

# 50. Approval Hard Rule

```text
APPROVAL WAS PRESENT
≠
APPROVAL STILL VALID
```

---

# 51. Approval Revalidation

Long-running workflows should revalidate approval where current
authorization may have changed.

---

# 52. Context Assembly

Working Memory receives selected Context from governed sources.

Potential sources:

```text
CURRENT USER INPUT

CURRENT TASK

CURRENT WORKFLOW

CURRENT PROJECT

CURRENT SESSION

USER MEMORY

PROJECT MEMORY

ORGANIZATION MEMORY

AGENT MEMORY

SEMANTIC MEMORY

EPISODIC MEMORY

CONVERSATION MEMORY

TOOL RESULTS

POLICY

APPROVAL STATE
```

---

# 53. Context Assembly Boundary

```text
AVAILABLE MEMORY
≠
WORKING MEMORY SHOULD LOAD ALL OF IT
```

---

# 54. Minimal Sufficient Context

The Working Memory Manager should prefer:

> **the minimum authorized state sufficient for correct execution.**

---

# 55. Context Priority

Potential priority factors:

```text
SAFETY

GOVERNANCE AUTHORITY

TASK RELEVANCE

CURRENTNESS

SCOPE MATCH

USER INTENT

WORKFLOW REQUIREMENT

DEPENDENCY REQUIREMENT

SOURCE AUTHORITY

RECENCY
```

---

# 56. Priority Hard Rule

```text
RECENT
≠
MORE AUTHORITATIVE AUTOMATICALLY

RELEVANT
≠
AUTHORIZED
```

---

# 57. Context Window

Model context is finite.

Working Memory Management must cooperate with the Context Window
management layer.

---

# 58. Context Window Boundary

```text
WORKING MEMORY
≠
MODEL CONTEXT WINDOW
```

Working Memory may contain more state than is included in one Model call.

---

# 59. Context Projection

Only a selected authorized projection of Working Memory should enter a
specific Model call.

---

# 60. Context Projection Flow

```text
WORKING MEMORY STATE
↓
CURRENT TASK REQUIREMENTS
↓
SCOPE CHECK
↓
SECURITY CHECK
↓
PRIORITIZATION
↓
TOKEN / CONTEXT BUDGET
↓
COMPACTION WHERE REQUIRED
↓
MODEL CONTEXT
```

---

# 61. Context Budget

The system may impose:

```text
TOKEN BUDGET

MEMORY ITEM BUDGET

TOOL OUTPUT BUDGET

HISTORY BUDGET

TIME BUDGET

COST BUDGET
```

---

# 62. Context Budget Boundary

```text
MORE CONTEXT
≠
BETTER EXECUTION AUTOMATICALLY
```

---

# 63. Context Overflow

When Working Memory exceeds active context capacity, the system should
apply governed reduction rather than uncontrolled truncation.

---

# 64. Overflow Strategies

Potential:

```text
PRIORITIZE

SUMMARIZE

COMPRESS

REFERENCE EXTERNALLY

DROP LOW-PRIORITY TEMPORARY STATE

CHECKPOINT

RETRIEVE ON DEMAND
```

---

# 65. Unsafe Truncation

Material items that must not be silently removed include applicable:

```text
SECURITY CONSTRAINTS

FOUNDER CONSTRAINTS

PROJECT IDENTITY

CUSTOMER IDENTITY

TENANT IDENTITY

TASK GOAL

APPROVAL REQUIREMENTS

CURRENT CRITICAL ERROR

ACTIVE SAFETY RULES
```

---

# 66. Compaction

Working Memory compaction reduces active state while preserving required
meaning.

---

# 67. Compaction Hard Rule

```text
SHORTER
≠
SEMANTICALLY EQUIVALENT AUTOMATICALLY
```

---

# 68. Compaction Provenance

Material compacted state should retain source references where needed.

---

# 69. Summary Boundary

```text
WORKING MEMORY SUMMARY
≠
ORIGINAL STATE
```

---

# 70. Context Refresh

Working Memory should be refreshed when authoritative external state
changes.

Potential:

```text
TASK STATUS CHANGED

MEMBERSHIP CHANGED

ROLE CHANGED

APPROVAL REVOKED

SOURCE MEMORY UPDATED

PROJECT STATUS CHANGED

POLICY CHANGED

TOOL RESULT INVALIDATED
```

---

# 71. Stale Working Memory

Working Memory becomes stale when its active representation no longer
matches current authoritative state.

---

# 72. Stale State Hard Rule

```text
STORED IN ACTIVE MEMORY
≠
CURRENT
```

---

# 73. Revalidation

High-impact operations should revalidate current state before execution.

---

# 74. Revalidation Candidates

Potential:

```text
IDENTITY

ROLE

MEMBERSHIP

PERMISSION

APPROVAL

BUDGET

TASK STATUS

PROJECT STATUS

DEPENDENCY STATUS

SECRET AVAILABILITY

RESOURCE STATUS
```

---

# 75. Session Lifecycle

Conceptually:

```text
SESSION_CREATED
↓
WORKING_MEMORY_INITIALIZED
↓
ACTIVE
↓
UPDATED
↓
CHECKPOINTED
↓
COMPLETED / EXPIRED / ABORTED
↓
PROMOTION REVIEW
↓
CLEANUP
```

---

# 76. Working Memory Lifecycle States

Potential:

```text
INITIALIZING

ACTIVE

WAITING

PAUSED

CHECKPOINTED

HANDOFF_PENDING

RESUMING

COMPLETED

FAILED

ABORTED

EXPIRED

CLEANUP_PENDING

CLOSED
```

Exact runtime terminology remains implementation-specific.

---

# 77. Active

Active Working Memory is eligible for current execution.

---

# 78. Waiting

A task may wait for:

```text
TOOL RESULT

DEPENDENCY

HUMAN INPUT

FOUNDER APPROVAL

EXTERNAL EVENT

RETRY WINDOW
```

---

# 79. Waiting Boundary

```text
WAITING
≠
KEEP ALL RESOURCES FOREVER
```

---

# 80. Pause

A workflow may be paused intentionally.

---

# 81. Pause Checkpoint

Long pauses should preserve only the state required for safe resume.

---

# 82. Complete

On task completion, Working Memory should enter a closeout process.

---

# 83. Completion Boundary

```text
TASK COMPLETE
≠
WORKING MEMORY BECOMES DURABLE MEMORY AUTOMATICALLY
```

---

# 84. Failure

Failed execution state may contain material diagnostic information.

---

# 85. Failure Promotion

Useful failure knowledge may be promoted to Episodic or other durable
Memory only through governed admission.

---

# 86. Abort

Aborted work should stop further unauthorized execution.

---

# 87. Expiration

Working Memory is short-lived by design.

---

# 88. TTL

A Time-To-Live or equivalent expiration policy may be used.

---

# 89. TTL Boundary

The historical design used session-oriented Working Memory lifetime, but
this enterprise standard does **not** mandate one universal TTL value.

TTL may vary by:

```text
SESSION TYPE

TASK TYPE

WORKFLOW TYPE

RISK

DATA CLASSIFICATION

WAIT STATE

PROJECT REQUIREMENT

CUSTOMER REQUIREMENT

RECOVERY REQUIREMENT
```

---

# 90. Expiration Hard Rule

```text
TTL EXPIRED
≠
PROMOTE TO LONG-TERM MEMORY
```

---

# 91. Expiration Action

Potential:

```text
CLOSE

DELETE

CHECKPOINT

ARCHIVE TEMPORARY RECOVERY STATE

PROMOTION REVIEW

SECURE CLEANUP
```

according to policy.

---

# 92. Eviction

Working Memory may require eviction under capacity pressure.

---

# 93. Eviction Priority

Eviction should prefer low-value temporary state over execution-critical
state.

---

# 94. Eviction Hard Rule

```text
LOW RECENCY
≠
SAFE TO EVICT AUTOMATICALLY
```

---

# 95. Non-Evictable Categories

During active execution, some state may need protection.

Potential:

```text
CURRENT SCOPE

CURRENT GOAL

SECURITY CONSTRAINT

APPROVAL STATE

CHECKPOINT POINTER

CRITICAL DEPENDENCY

UNRESOLVED FAILURE STATE
```

---

# 96. Cleanup

Cleanup removes state no longer needed for active execution.

---

# 97. Cleanup Boundary

```text
TASK CLOSED
≠
ALL RELATED DATA DELETE WITHOUT POLICY
```

Working Memory cleanup remains distinct from durable source-data
retention.

---

# 98. Secure Cleanup

Sensitive temporary state should receive appropriate cleanup.

---

# 99. Credential Handling

Credentials, API keys, access tokens, or secrets should not be persisted
as ordinary Working Memory.

---

# 100. Credential Boundary

```text
SECRET USED DURING TASK
≠
SECRET SHOULD BE REMEMBERED
```

---

# 101. Secret References

Where necessary, Working Memory should prefer references to secure secret
systems rather than secret values.

---

# 102. Checkpointing

Checkpointing preserves sufficient active state for controlled resume.

---

# 103. Checkpoint Purpose

Potential uses:

```text
LONG-RUNNING TASK

WAIT FOR APPROVAL

WAIT FOR EXTERNAL SYSTEM

FAILOVER

AGENT HANDOFF

PROCESS RESTART

SCHEDULED RESUME

SYSTEM MAINTENANCE
```

---

# 104. Conceptual Checkpoint

```yaml
working_memory_checkpoint:
  checkpoint_id: required

  working_memory_id: required

  session_id: required
  task_id: conditional
  workflow_id: conditional

  run_id: conditional

  state_version: required

  current_step: conditional

  critical_variables: conditional
  dependency_refs: conditional
  context_refs: conditional

  approval_state_ref: conditional
  error_state_ref: conditional

  protected_scope: required

  classification: required

  created_at: required
  expires_at: conditional
```

---

# 105. Checkpoint Boundary

```text
CHECKPOINT
≠
PERMANENT MEMORY
```

---

# 106. Checkpoint Versioning

A newer checkpoint should be distinguishable from older checkpoints.

---

# 107. Resume

Resume must validate checkpoint state before continuing.

---

# 108. Resume Validation

Potential:

```text
SESSION ID

TASK STATUS

PROJECT STATUS

CUSTOMER

TENANT

USER / AGENT IDENTITY

CURRENT AUTHORIZATION

CURRENT APPROVAL

CURRENT DEPENDENCIES

CURRENT POLICY

CHECKPOINT VERSION

CHECKPOINT EXPIRY
```

---

# 109. Resume Hard Rule

```text
CHECKPOINT WAS VALID YESTERDAY
≠
CHECKPOINT VALID NOW
```

---

# 110. Resume after Permission Change

If permissions changed during pause:

```text
CURRENT AUTHORIZATION
WINS
```

---

# 111. Resume after Task Cancellation

Cancelled task must not continue solely because a checkpoint exists.

---

# 112. Resume after Approval Revocation

Revoked approval must stop or redirect execution.

---

# 113. Crash Recovery

Process failure may require Working Memory recovery.

---

# 114. Recovery Boundary

```text
PROCESS RESTART
≠
SAFE TASK RESUME AUTOMATICALLY
```

---

# 115. Recovery Flow

```text
FAILURE DETECTED
↓
ACTIVE RUN IDENTIFIED
↓
CHECKPOINT LOCATED
↓
CHECKPOINT INTEGRITY VERIFIED
↓
CURRENT TASK STATE VERIFIED
↓
CURRENT AUTHORIZATION VERIFIED
↓
CURRENT DEPENDENCIES VERIFIED
↓
RECOVERY DECISION
↓
RESUME / ROLLBACK / RESTART / ABORT
↓
EVIDENCE
```

---

# 116. Working Memory Promotion

Temporary state may become a candidate for durable Memory.

---

# 117. Promotion Targets

Potential:

```text
EPISODIC MEMORY

SEMANTIC MEMORY

USER MEMORY

PROJECT MEMORY

ORGANIZATION MEMORY

AGENT MEMORY
```

---

# 118. Promotion Hard Rule

```text
USEFUL DURING TASK
≠
WORTH REMEMBERING PERMANENTLY
```

---

# 119. Promotion Criteria

Potential:

```text
REUSABILITY

SIGNIFICANCE

VALIDATION

PROVENANCE

AUTHORITY

FUTURE VALUE

PROJECT VALUE

ORGANIZATION VALUE

USER VALUE

COMPLIANCE NEED

FAILURE-LEARNING VALUE
```

---

# 120. Promotion Gate

Before durable promotion:

```text
SOURCE IDENTIFIED?

SCOPE IDENTIFIED?

PURPOSE IDENTIFIED?

PROVENANCE AVAILABLE?

CONTENT VALIDATED?

AUTHORITY CLASS KNOWN?

CLASSIFICATION KNOWN?

PRIVACY CHECK PASSED?

RETENTION POLICY KNOWN?

TARGET MEMORY TYPE KNOWN?

DUPLICATE / CONTRADICTION CHECKED?

APPROVAL REQUIRED?
```

---

# 121. Promotion to Episodic Memory

Material execution events may become Episodic Memory.

Examples:

```text
TASK COMPLETION

MATERIAL FAILURE

APPROVAL EVENT

INCIDENT

IMPORTANT DECISION

WORKFLOW OUTCOME
```

---

# 122. Episodic Promotion Boundary

```text
EVERY EXECUTION STEP
≠
EPISODIC MEMORY
```

---

# 123. Promotion to Semantic Memory

Validated reusable facts or concepts may become Semantic Memory
candidates.

---

# 124. Semantic Promotion Boundary

```text
MODEL CONCLUDED X
≠
SEMANTIC MEMORY X IS TRUE
```

---

# 125. Promotion to User Memory

User-specific preferences or continuity information may become User
Memory only according to User Memory governance.

---

# 126. Promotion to Project Memory

Project-specific reusable information may become Project Memory.

---

# 127. Promotion to Organization Memory

Organization promotion requires stronger review because it expands scope.

---

# 128. Organization Promotion Hard Rule

```text
WORKING MEMORY
→
ORGANIZATION MEMORY
=
NOT AUTOMATIC
```

---

# 129. Promotion Provenance

Durable Memory must retain Working Memory source lineage where required.

---

# 130. No-Promotion Cleanup

Working Memory not selected for durable retention should expire or be
cleaned according to policy.

---

# 131. Multi-Agent Working Memory

Mianx.ai may execute multiple Agents concurrently.

Working Memory Management must prevent uncontrolled shared-state
corruption.

---

# 132. Private Agent Working Memory

An Agent may have private active state for its current execution.

---

# 133. Shared Working Memory

Multiple Agents may share explicitly authorized task/workflow state.

---

# 134. Shared State Boundary

```text
SAME WORKFLOW
≠
EVERY AGENT MAY READ EVERYTHING
```

---

# 135. Agent Handoff

Working Memory may support controlled handoff.

---

# 136. Handoff Package

Potential:

```text
TASK ID

CURRENT GOAL

CURRENT STEP

COMPLETED STEPS

PENDING STEPS

CRITICAL CONTEXT

DEPENDENCIES

APPROVAL STATE

ERROR STATE

SOURCE REFERENCES

SCOPE

CHECKPOINT
```

---

# 137. Handoff Minimization

Only state required by the receiving Agent should be shared.

---

# 138. Handoff Hard Rule

```text
AGENT B RECEIVES TASK
≠
AGENT B INHERITS AGENT A'S FULL MEMORY
```

---

# 139. Handoff Authorization

The receiving Agent must have current authority for the transferred work.

---

# 140. Delegation

Delegated work may create child Working Memory scopes.

---

# 141. Parent/Child Working Memory

Conceptually:

```text
PARENT TASK WORKING MEMORY
├── CHILD TASK A WORKING MEMORY
├── CHILD TASK B WORKING MEMORY
└── CHILD TASK C WORKING MEMORY
```

---

# 142. Child Scope Boundary

A child task receives only necessary authorized parent Context.

---

# 143. Child Result

Child results return as candidates to the parent execution state.

---

# 144. Child Result Boundary

```text
CHILD AGENT RESULT
≠
PARENT FINAL DECISION AUTOMATICALLY
```

---

# 145. Parallel Execution

Parallel Agents may update related state concurrently.

---

# 146. Concurrency Risks

Potential:

```text
LOST UPDATE

DUPLICATE WORK

STALE READ

OUT-OF-ORDER RESULT

CONFLICTING TOOL RESULT

CONFLICTING PLAN UPDATE

DELETE / UPDATE RACE

APPROVAL / EXECUTION RACE
```

---

# 147. State Version

Working Memory may require:

```text
state_version
```

or equivalent concurrency metadata.

---

# 148. Optimistic Concurrency

Implementation may use optimistic concurrency where appropriate.

No universal mechanism is mandated.

---

# 149. Locking

Implementation may use locks or leases where required.

---

# 150. Lock Boundary

```text
LOCK EXISTS
≠
BUSINESS AUTHORIZATION
```

---

# 151. Lease Expiry

Distributed leases should handle worker failure safely.

---

# 152. Stale Worker

A stale Agent or worker must not overwrite newer Working Memory state
without detection.

---

# 153. Stale Worker Hard Rule

```text
OLDER STATE VERSION
≠
CURRENT WRITE AUTHORITY
```

---

# 154. Idempotency

Repeated execution requests should not create unsafe duplicate state
changes.

---

# 155. Idempotency Key

Potential identity may include:

```text
TASK

RUN

STEP

TOOL CALL

ACTION
```

depending on operation.

---

# 156. Idempotency Boundary

```text
RETRY
≠
NEW BUSINESS EVENT AUTOMATICALLY
```

---

# 157. Ordering

Some Working Memory events may require ordering.

---

# 158. Ordering Boundary

```text
MESSAGE RECEIVED LATER
≠
BUSINESS EVENT OCCURRED LATER AUTOMATICALLY
```

---

# 159. Event Correlation

Material Working Memory events should correlate with:

```text
TASK ID

WORKFLOW ID

SESSION ID

RUN ID

AGENT ID

USER ID

PROJECT ID

CUSTOMER ID

TENANT ID
```

where applicable.

---

# 160. Context Sharing

Working Memory integrates with governed Context Sharing.

---

# 161. Cross-Agent Context Sharing

Before sharing:

```text
SENDER AUTHORIZED?

RECEIVER AUTHORIZED?

SAME PROJECT?

SAME CUSTOMER?

SAME TENANT?

PURPOSE VALID?

CLASSIFICATION ALLOWED?

MINIMUM CONTEXT?
```

---

# 162. Cross-Project Sharing

Cross-Project Working Memory sharing is denied by default.

---

# 163. Cross-Customer Sharing

Cross-Customer Working Memory sharing is denied by default.

---

# 164. Cross-Tenant Sharing

Cross-Tenant Working Memory sharing is denied by default.

---

# 165. Cross-User Sharing

User-specific active Context should not be exposed to another User
without authority.

---

# 166. Session Switching

A User or Agent switching Projects must not carry protected Working
Memory into the new Project automatically.

---

# 167. Project Switch Hard Rule

```text
SAME SESSION
+
PROJECT CHANGED
≠
OLD PROJECT CONTEXT REMAINS ELIGIBLE
```

---

# 168. Customer Switch

Customer boundary changes require Working Memory scope re-evaluation.

---

# 169. Tenant Switch

Tenant boundary changes require Working Memory scope re-evaluation.

---

# 170. Authentication Change

Logout, account switch, session invalidation, or identity change should
invalidate affected active Working Memory access.

---

# 171. Role Change

Current role must govern current access.

---

# 172. Role Boundary

```text
USER WAS ADMIN
≠
USER IS ADMIN NOW
```

---

# 173. Membership Change

Project or Organization membership changes must be reflected.

---

# 174. Authorization Caching

Authorization information inside Working Memory may become stale.

---

# 175. Authorization Hard Rule

```text
CACHED PERMISSION
≠
PERMANENT PERMISSION
```

---

# 176. High-Risk Actions

Before high-risk execution, revalidate current authorization rather than
trusting old Working Memory state.

---

# 177. Founder Approval

Founder approval references may exist in Working Memory.

Approval validity remains governed by current approval state.

---

# 178. Kill Switch

Emergency controls must be able to stop affected active Working Memory
execution paths.

---

# 179. Kill-Switch Boundary

```text
TASK STATE SAYS CONTINUE
+
KILL SWITCH ACTIVE
=
DO NOT CONTINUE
```

---

# 180. Cancellation

Task or workflow cancellation should propagate to active Working Memory.

---

# 181. Cancellation Race

A stale worker must not continue after cancellation without current-state
validation.

---

# 182. Budget State

Working Memory may track current execution budgets.

Potential:

```text
TOKEN BUDGET

MODEL COST BUDGET

TOOL COST BUDGET

TIME BUDGET

RETRY BUDGET

STEP BUDGET
```

---

# 183. Budget Boundary

```text
BUDGET REMAINING IN CACHE
≠
CURRENT BUDGET AUTHORITY AUTOMATICALLY
```

---

# 184. Resource State

Working Memory may track temporary resource references.

Examples:

```text
TEMP FILE

SANDBOX ID

WORKSPACE ID

JOB ID

LOCK ID

LEASE ID

BROWSER SESSION ID
```

---

# 185. Resource Cleanup

Temporary resources should be cleaned according to execution lifecycle.

---

# 186. External Resource Boundary

```text
REFERENCE REMOVED FROM WORKING MEMORY
≠
EXTERNAL RESOURCE DELETED AUTOMATICALLY
```

Cleanup must be explicit.

---

# 187. Storage Architecture

Working Memory may use low-latency ephemeral or short-lived storage.

---

# 188. Historical Storage Direction

Earlier architecture proposed an in-memory key-value store for Working
Memory.

The current standard preserves the need for low-latency temporary state
but does not declare a specific provider as implemented or mandatory.

---

# 189. Storage Options

Potential implementations may include:

```text
IN-PROCESS EPHEMERAL STATE

DISTRIBUTED CACHE

KEY-VALUE STORE

SHORT-LIVED DATABASE STATE

HYBRID WORKING STATE
```

---

# 190. Provider Decision

Provider selection requires approved architecture and Evidence.

---

# 191. Persistence Boundary

```text
WORKING MEMORY
≠
MUST NEVER PERSIST ANY CHECKPOINT

AND

WORKING MEMORY
≠
MUST PERSIST EVERYTHING
```

Checkpoint durability depends on recovery requirements.

---

# 192. Durable Checkpoint

A durable checkpoint may be justified for long-running workflows.

---

# 193. Durable Checkpoint Boundary

```text
DURABLE CHECKPOINT
≠
DURABLE BUSINESS MEMORY
```

---

# 194. Replication

Working Memory storage may use replication for availability.

---

# 195. Replication Boundary

Replicas must preserve:

```text
SCOPE

STATE VERSION

EXPIRY

CLASSIFICATION

LIFECYCLE
```

---

# 196. Replication Lag

Lagging replicas may expose stale execution state.

---

# 197. Replication Lag Hard Rule

```text
REPLICA HAS VALUE
≠
VALUE CURRENT
```

---

# 198. Cache Architecture

Working Memory itself may be cache-like, but its state remains governed.

---

# 199. Cache Key

A safe Working Memory key may require multiple identity dimensions.

Conceptually:

```text
CUSTOMER
+
TENANT
+
PROJECT
+
TASK
+
SESSION
+
RUN
```

as applicable.

---

# 200. Key Collision

Different protected scopes must not resolve to the same state key.

---

# 201. Namespace

Working Memory storage should separate environments and protected scopes
appropriately.

---

# 202. Environment Isolation

```text
DEVELOPMENT WORKING MEMORY
≠
PRODUCTION WORKING MEMORY
```

---

# 203. Production Data in Development

Protected Production Working Memory should not be casually copied into
lower environments.

---

# 204. Memory Pressure

Working Memory systems may experience capacity pressure.

---

# 205. Capacity Dimensions

Potential:

```text
ACTIVE SESSIONS

ACTIVE TASKS

ACTIVE AGENTS

STATE SIZE

CONTEXT SIZE

CHECKPOINT SIZE

WRITE RATE

READ RATE

TTL DISTRIBUTION

WAITING TASK COUNT
```

---

# 206. Capacity Limit

No universal capacity limit is established here.

---

# 207. Oversized State

Oversized Working Memory should trigger controlled compaction or
externalization.

---

# 208. Oversized Tool Output

Large tool results should preferably be referenced rather than copied
repeatedly into active state where possible.

---

# 209. Working Memory Security

Security should cover:

```text
IDENTITY

AUTHORIZATION

PROJECT ISOLATION

CUSTOMER ISOLATION

TENANT ISOLATION

USER ISOLATION

AGENT ISOLATION

CLASSIFICATION

INTEGRITY

SECRET MINIMIZATION

ENCRYPTION WHERE REQUIRED

AUDITABILITY

EXPIRATION

CLEANUP
```

---

# 210. Least Privilege

Actors should access only Working Memory needed for authorized execution.

---

# 211. Read Boundary

```text
CAN READ
≠
CAN UPDATE
```

---

# 212. Update Boundary

```text
CAN UPDATE
≠
CAN PROMOTE TO DURABLE MEMORY
```

---

# 213. Promotion Boundary

```text
CAN PROPOSE PROMOTION
≠
CAN APPROVE PROMOTION
```

---

# 214. Admin Boundary

```text
INFRASTRUCTURE ADMIN
≠
BUSINESS CONTEXT AUTHORITY AUTOMATICALLY
```

---

# 215. Sensitive Working Memory

Active Context may contain sensitive information.

Examples:

```text
CUSTOMER DATA

USER DATA

PRIVATE PROJECT DATA

LEGAL DATA

SECURITY DATA

FINANCIAL DATA

INTERNAL BUSINESS DATA
```

---

# 216. Sensitive State Lifetime

Sensitive temporary state should exist only as long as justified.

---

# 217. Data Minimization

Working Memory should contain:

> **only the data necessary for current authorized execution.**

---

# 218. Data Minimization Hard Rule

```text
AVAILABLE
≠
NEEDED
```

---

# 219. Prompt Injection

Working Memory may contain untrusted instructions from:

```text
USER INPUT

WEB CONTENT

DOCUMENTS

TOOL OUTPUT

EXTERNAL APIS

RETRIEVED MEMORY
```

---

# 220. Prompt Injection Boundary

```text
TEXT IN WORKING MEMORY
≠
SYSTEM INSTRUCTION AUTHORITY
```

---

# 221. Instruction Source

Working Memory should preserve instruction provenance where material.

---

# 222. Authority Precedence

Untrusted content must not override higher-order instructions,
governance, or approvals.

---

# 223. Memory Poisoning

Attackers or faulty Agents may try to insert malicious active state.

---

# 224. Poisoning Examples

```text
FAKE APPROVAL

FAKE PROJECT ID

FAKE TENANT ID

FAKE USER ID

FAKE TOOL RESULT

FAKE TASK COMPLETION

FAKE AUTHORITY

MALICIOUS CONTEXT
```

---

# 225. Working Memory Integrity

Protected fields require integrity controls.

---

# 226. Critical Protected Fields

Potential:

```text
CUSTOMER ID

TENANT ID

PROJECT ID

TASK ID

USER ID

AGENT ID

APPROVAL STATE

STATE VERSION

CLASSIFICATION

LIFECYCLE

EXPIRY

CHECKPOINT ID
```

---

# 227. State Tampering

Unauthorized change to protected scope or approval state is critical.

---

# 228. Privacy

Working Memory should not retain User-specific data longer than needed.

---

# 229. User Privacy Boundary

```text
USER DATA REQUIRED FOR CURRENT TASK
≠
USER DATA SHOULD BECOME PERMANENT PROFILE
```

---

# 230. Conversation Privacy

Conversation Context should be minimized to current need.

---

# 231. Cross-Customer Privacy

Customer-specific Working Memory must not cross Customer boundaries.

---

# 232. Cross-Tenant Privacy

Tenant-specific Working Memory must not cross Tenant boundaries.

---

# 233. Cross-Project Privacy

Project confidential Context must not cross Project boundaries.

---

# 234. Logging

Working Memory logs should avoid copying full sensitive state unless
required and authorized.

---

# 235. Auditability

Material Working Memory operations should be traceable.

---

# 236. Audit Events

Potential:

```text
WORKING_MEMORY_CREATED

WORKING_MEMORY_UPDATED

WORKING_MEMORY_CHECKPOINTED

WORKING_MEMORY_RESUMED

WORKING_MEMORY_SHARED

WORKING_MEMORY_COMPACTED

WORKING_MEMORY_PROMOTION_PROPOSED

WORKING_MEMORY_EXPIRED

WORKING_MEMORY_EVICTED

WORKING_MEMORY_CLEANED

WORKING_MEMORY_ABORTED

WORKING_MEMORY_RECOVERY_STARTED

WORKING_MEMORY_RECOVERY_COMPLETED
```

---

# 237. Audit Payload Minimization

Audit events should contain metadata rather than unnecessary sensitive
payload copies.

---

# 238. Observability

Working Memory should expose health and behavior.

---

# 239. Monitoring Domains

Potential:

```text
ACTIVE MEMORY COUNT

ACTIVE SESSION COUNT

ACTIVE TASK COUNT

STATE SIZE

CONTEXT SIZE

CHECKPOINT COUNT

CHECKPOINT FAILURE

RESUME FAILURE

TTL EXPIRATION

EVICTION

COMPACTION

PROMOTION

STALE STATE

CONCURRENCY CONFLICT

CROSS-SCOPE DENIAL

CLEANUP FAILURE

CAPACITY PRESSURE
```

---

# 240. Working Memory Metrics

Potential:

```text
WORKING_MEMORY_CREATE_RATE

WORKING_MEMORY_READ_RATE

WORKING_MEMORY_UPDATE_RATE

ACTIVE_WORKING_MEMORY_COUNT

AVERAGE_STATE_SIZE

P95_STATE_SIZE

CHECKPOINT_SUCCESS_RATE

RESUME_SUCCESS_RATE

COMPACTION_RATE

EXPIRATION_RATE

EVICTION_RATE

PROMOTION_CANDIDATE_RATE

STALE_STATE_RATE

CONCURRENCY_CONFLICT_RATE

CLEANUP_SUCCESS_RATE

CROSS_SCOPE_DENIAL_RATE
```

No universal numeric target is declared.

---

# 241. Latency

Working Memory is latency-sensitive because it participates in active
execution.

---

# 242. Latency Boundary

```text
FAST
≠
CORRECT

FAST
≠
AUTHORIZED
```

---

# 243. Availability

Working Memory availability requirements depend on workload.

---

# 244. Availability Boundary

```text
WORKING MEMORY UNAVAILABLE
≠
BYPASS WORKING MEMORY GOVERNANCE
```

---

# 245. Failure Handling

Potential failures:

```text
STATE STORE UNAVAILABLE

STATE MISSING

STATE CORRUPT

CHECKPOINT MISSING

CHECKPOINT CORRUPT

STATE VERSION CONFLICT

TTL EXPIRED

SESSION INVALID

TASK CANCELLED

AUTHORIZATION CHANGED

PROJECT CHANGED

CUSTOMER CHANGED

TENANT CHANGED
```

---

# 246. Missing State

If critical Working Memory is missing, execution should not fabricate
state.

---

# 247. Missing State Hard Rule

```text
MEMORY MISSING
≠
GUESS AND CONTINUE
```

---

# 248. Recovery Options

Potential:

```text
RECONSTRUCT FROM AUTHORITATIVE SYSTEMS

RESTORE CHECKPOINT

RESTART TASK

ROLLBACK STEP

REQUEST HUMAN INPUT

ABORT SAFELY
```

---

# 249. State Reconstruction

Some Working Memory can be reconstructed from authoritative systems.

Potential:

```text
TASK SYSTEM

WORKFLOW SYSTEM

PROJECT SYSTEM

CURRENT AUTHORIZATION

DURABLE MEMORY

TOOL HISTORY

CHECKPOINT
```

---

# 250. Reconstruction Boundary

```text
RECONSTRUCTABLE
≠
ALL TEMPORARY REASONING RECONSTRUCTABLE
```

---

# 251. Private Model Reasoning

Private internal Model reasoning should not be persisted as ordinary
Working Memory merely to recreate hidden chain-of-thought.

Working Memory should preserve useful explicit execution state, evidence,
decisions, constraints, and task artifacts instead.

---

# 252. Execution Evidence

Working Memory may reference Evidence generated during active work.

---

# 253. Evidence Boundary

```text
WORKING MEMORY REFERENCES EVIDENCE
≠
WORKING MEMORY IS THE EVIDENCE STORE
```

---

# 254. Verifiable Work Envelope

Active execution may accumulate the material needed for the Verifiable
Work Envelope.

Potential:

```text
FILES TOUCHED

BUILD RESULT

TEST RESULT

SECURITY RESULT

ARTIFACT REFERENCES

COMMIT REFERENCES

ROLLBACK INFORMATION
```

---

# 255. Final Deliverable Boundary

Working Memory may prepare a deliverable, but final acceptance belongs to
the governing execution and review process.

---

# 256. Human Interaction

Working Memory may hold unresolved questions for a Human User or Founder.

---

# 257. Human Response

Human responses should update the current execution state with
provenance.

---

# 258. Founder Escalation

Material Founder escalation should preserve:

```text
REASON

TASK

PROJECT

DECISION REQUIRED

CURRENT STATE

EVIDENCE

TIME
```

---

# 259. Escalation Boundary

```text
ESCALATED
≠
APPROVED
```

---

# 260. Long-Running Workflow

Long-running workflows require stronger checkpoint, stale-state, and
authorization revalidation.

---

# 261. Scheduled Resume

A scheduled task resuming later must treat prior Working Memory as
potentially stale.

---

# 262. External Event Resume

An external event may resume a waiting workflow.

The event must be authenticated or validated according to applicable
architecture.

---

# 263. Event Boundary

```text
EVENT RECEIVED
≠
EVENT TRUSTED AUTOMATICALLY
```

---

# 264. Duplicate Event

Duplicate external events should not create duplicate business actions.

---

# 265. Workflow Compensation

Failed workflows may require compensation or rollback.

Working Memory should preserve current compensation state where needed.

---

# 266. Rollback State

Potential:

```text
ROLLBACK_REQUIRED

ROLLBACK_STARTED

ROLLBACK_COMPLETED

ROLLBACK_FAILED
```

---

# 267. Rollback Boundary

```text
WORKING MEMORY SAYS ROLLBACK COMPLETE
≠
EXTERNAL SYSTEM ROLLBACK PROVEN
```

---

# 268. Tool Call State

Tool execution may progress through:

```text
PLANNED

AUTHORIZED

STARTED

SUCCEEDED

FAILED

TIMED_OUT

CANCELLED

RETRY_PENDING
```

---

# 269. Tool Call Idempotency

Risky tool calls should support operation-specific idempotency where
possible.

---

# 270. External Side Effects

Working Memory must distinguish:

```text
PLANNED ACTION

ACTUAL EXTERNAL SIDE EFFECT
```

---

# 271. Side-Effect Hard Rule

```text
MODEL SAID "DONE"
≠
EXTERNAL ACTION DONE
```

---

# 272. Evidence of Side Effect

External mutation should have Evidence from the responsible Tool/System.

---

# 273. Working Memory Quality

Quality dimensions include:

```text
CURRENTNESS

CORRECT SCOPE

COMPLETENESS

MINIMALITY

CONSISTENCY

TRACEABILITY

SECURITY

RECOVERABILITY

NON-DUPLICATION

EXECUTION USEFULNESS
```

---

# 274. Completeness Boundary

```text
MORE STATE
≠
MORE COMPLETE IN A USEFUL SENSE
```

---

# 275. Minimality

Good Working Memory avoids irrelevant state.

---

# 276. Consistency

Related active state should not contradict itself silently.

---

# 277. Conflict Detection

Potential conflicts:

```text
TASK STATUS CONFLICT

APPROVAL CONFLICT

PLAN CONFLICT

DEPENDENCY CONFLICT

TOOL RESULT CONFLICT

SCOPE CONFLICT

USER INSTRUCTION CONFLICT
```

---

# 278. Conflict Handling

Conflict should be:

```text
DETECTED

CLASSIFIED

RESOLVED OR ESCALATED

RECORDED
```

---

# 279. Conflict Hard Rule

```text
LAST WRITE
≠
CORRECT WRITE AUTOMATICALLY
```

---

# 280. Working Memory Decision Framework

Before adding state ask:

```text
IS THIS REQUIRED FOR CURRENT EXECUTION?

WHAT TASK?

WHAT WORKFLOW?

WHAT SESSION?

WHAT PROJECT?

WHAT CUSTOMER?

WHAT TENANT?

WHAT USER?

WHAT AGENT?

WHAT PURPOSE?

WHAT CLASSIFICATION?

WHAT SOURCE?

HOW LONG IS IT NEEDED?

IS IT A SECRET?

IS IT DURABLE KNOWLEDGE?

SHOULD IT REMAIN TEMPORARY?
```

---

# 281. Context Selection Framework

Before projecting Working Memory into a Model Context ask:

```text
WHAT IS THE CURRENT STEP?

WHAT INFORMATION IS REQUIRED?

WHAT INFORMATION IS AUTHORIZED?

WHAT MUST NEVER BE DROPPED?

WHAT CAN BE REFERENCED INSTEAD?

WHAT CAN BE SUMMARIZED?

WHAT CAN BE EVICTED?

WHAT TOKEN BUDGET EXISTS?

WHAT SECURITY BOUNDARIES APPLY?
```

---

# 282. Checkpoint Decision Framework

Before checkpointing ask:

```text
WHY IS A CHECKPOINT NEEDED?

WHAT STATE IS REQUIRED FOR RESUME?

WHAT STATE CAN BE RECONSTRUCTED?

WHAT SENSITIVE STATE SHOULD NOT BE PERSISTED?

WHAT PROJECT / CUSTOMER / TENANT?

WHAT TASK / SESSION / RUN?

WHAT STATE VERSION?

WHAT EXPIRY?

WHAT INTEGRITY PROTECTION?

WHAT RESUME VALIDATION?
```

---

# 283. Resume Decision Framework

Before resuming ask:

```text
IS TASK STILL ACTIVE?

IS WORKFLOW STILL ACTIVE?

IS SESSION STILL VALID?

IS USER STILL AUTHORIZED?

IS AGENT STILL AUTHORIZED?

IS PROJECT STILL ACTIVE?

IS CUSTOMER BINDING CURRENT?

IS TENANT BINDING CURRENT?

IS APPROVAL STILL VALID?

ARE DEPENDENCIES CURRENT?

IS CHECKPOINT CURRENT?

IS STATE VERSION CURRENT?

HAS POLICY CHANGED?

RESUME, RESTART, ROLLBACK, OR ABORT?
```

---

# 284. Promotion Decision Framework

Before promoting Working Memory ask:

```text
WHAT INFORMATION?

WHY SHOULD IT SURVIVE?

WHAT TARGET MEMORY TYPE?

WHO IS THE SUBJECT?

WHAT PROJECT?

WHAT CUSTOMER?

WHAT TENANT?

WHAT SOURCE?

WHAT PROVENANCE?

WHAT AUTHORITY CLASS?

WHAT CLASSIFICATION?

WHAT VALIDATION?

WHAT PRIVACY CHECK?

WHAT RETENTION?

WHAT DUPLICATE / CONTRADICTION CHECK?

WHAT APPROVAL?
```

---

# 285. Cleanup Decision Framework

Before cleanup ask:

```text
IS TASK CLOSED?

IS SESSION CLOSED?

ANY RESUME EXPECTED?

ANY CHECKPOINT REQUIRED?

ANY PROMOTION CANDIDATE?

ANY AUDIT REQUIREMENT?

ANY INCIDENT REQUIREMENT?

ANY LEGAL / GOVERNANCE HOLD?

WHAT TEMPORARY RESOURCES EXIST?

WHAT SECRET REFERENCES EXIST?

WHAT EXTERNAL RESOURCES REQUIRE CLEANUP?
```

---

# 286. Integration with Working Memory Type

`../memory-types/working-memory.md` defines **what Working Memory is** as a
Memory type.

This document defines **how Working Memory is managed during execution**.

---

# 287. Responsibility Boundary

```text
../memory-types/working-memory.md
=
WORKING MEMORY TYPE SEMANTICS

./working-memory-management.md
=
WORKING MEMORY OPERATIONAL MANAGEMENT
```

---

# 288. Integration with Short-Term Memory

`../memory-types/short-term-memory.md` defines broader short-lived Memory.

Working Memory is a specialized active-execution form of short-lived
Memory.

---

# 289. Integration with Context Management

`../context/context-management.md` governs Context construction and
selection.

Working Memory supplies active execution state to that process.

---

# 290. Integration with Context Window

`../context/context-window.md` governs Model Context limits and allocation.

---

# 291. Integration with Context Sharing

`../context/context-sharing.md` governs Context transfer between
authorized Actors.

---

# 292. Integration with Conversation Memory

`../conversation-memory/conversation-memory.md` manages interaction
continuity.

Conversation history must not automatically flood Working Memory.

---

# 293. Integration with Agent Memory

`../agent-memory/agent-memory.md` governs Agent-specific durable Memory.

Temporary Agent execution state should not become Agent Memory
automatically.

---

# 294. Integration with User Memory

`../user-memory/user-memory.md` governs User-specific continuity and
Privacy.

Temporary User interaction state should not become durable User Memory
automatically.

---

# 295. Integration with Project Memory

`../project-memory/project-memory.md` governs durable Project knowledge.

Working Memory may reference Project Memory without copying all Project
knowledge into active state.

---

# 296. Integration with Organization Memory

`../organization-memory/organization-memory.md` governs Organization-level
knowledge.

Working Memory does not create Organization authority.

---

# 297. Integration with Episodic Memory

Material completed execution events may become Episodic Memory
candidates.

---

# 298. Integration with Semantic Memory

Validated reusable knowledge may become Semantic Memory candidates.

---

# 299. Integration with Long-Term Memory

Working Memory is not Long-Term Memory.

Any long-term retention requires governed promotion.

---

# 300. Integration with Retrieval Engine

The Retrieval Engine obtains governed durable Memory candidates.

Working Memory consumes selected eligible results.

---

# 301. Integration with Storage Engine

The Storage Engine defines broader Memory persistence responsibilities.

Working Memory may use short-lived storage or checkpoint persistence under
that architecture.

---

# 302. Integration with Storage Policies

`../storage/storage-policies.md` governs applicable lifecycle, retention,
cleanup, backup, and restore behavior.

---

# 303. Integration with Memory Security

`../security/memory-security.md` governs runtime Memory Security.

---

# 304. Integration with Memory Monitoring

`../monitoring/memory-monitoring.md` governs Memory health and
observability.

---

# 305. Integration with AI Operating System

The AI Operating System may rely on Working Memory for:

```text
ACTIVE TASKS

ACTIVE AGENT RUNS

ACTIVE WORKFLOWS

CURRENT CONTEXT

APPROVAL WAITING

FAILURE RECOVERY

HANDOFF
```

---

# 306. Integration with Task Engine

Authoritative task identity and business task state remain owned by the
Task Engine or designated authoritative task system.

---

# 307. Task Boundary

```text
WORKING MEMORY TASK STATE
≠
AUTHORITATIVE TASK DATABASE
```

---

# 308. Integration with Workflow Engine

Workflow Engine owns authoritative workflow semantics.

Working Memory holds temporary execution state.

---

# 309. Integration with Agent Runtime

Agent Runtime uses Working Memory during controlled execution.

---

# 310. Agent Runtime Boundary

```text
AGENT RUNTIME CAN ACCESS STATE
≠
AGENT RUNTIME OWNS GOVERNANCE
```

---

# 311. Integration with Verifiable Work Envelope

Working Memory may collect references required for verifiable execution.

The Verifiable Work Envelope remains the evidence/acceptance standard.

---

# 312. Integration with AI Constitution

`../../01-governance/AI-CONSTITUTION.md` remains higher governance
authority.

---

# 313. Integration with Multi-Project Operating Model

`../../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md` governs
Project isolation.

Working Memory must preserve Project boundaries even across concurrent
Agent activity.

---

# 314. Multi-Project Requirement

Mianx.ai may run multiple Projects concurrently.

Therefore:

```text
PROJECT A ACTIVE STATE
≠
PROJECT B ACTIVE STATE
```

---

# 315. Multi-Customer Requirement

Concurrent Customers must remain isolated.

---

# 316. Multi-Tenant Requirement

Concurrent Tenants must remain isolated.

---

# 317. Industry Operating Systems

Industry Operating Systems may use the same Working Memory platform.

---

# 318. Industry OS Boundary

```text
SHARED WORKING MEMORY PLATFORM
≠
SHARED INDUSTRY BUSINESS CONTEXT
```

---

# 319. Controlled Test Families

Working Memory Management testing should cover at least:

```text
IDENTITY

SESSION SCOPE

TASK SCOPE

WORKFLOW SCOPE

PROJECT ISOLATION

CUSTOMER ISOLATION

TENANT ISOLATION

USER ISOLATION

AGENT ISOLATION

STATE CREATION

STATE UPDATE

STATE VERSIONING

TEMPORARY VARIABLES

INTERMEDIATE RESULTS

TOOL RESULTS

APPROVAL STATE

CONTEXT ASSEMBLY

CONTEXT PRIORITIZATION

CONTEXT WINDOW

COMPACTION

OVERFLOW

TTL

EXPIRATION

EVICTION

CLEANUP

CHECKPOINT

RESUME

CRASH RECOVERY

PROMOTION

MULTI-AGENT SHARING

HANDOFF

DELEGATION

CONCURRENCY

STALE WORKER

IDEMPOTENCY

CANCELLATION

KILL SWITCH

ROLE CHANGE

MEMBERSHIP CHANGE

AUTHORIZATION CHANGE

SECRET HANDLING

PROMPT INJECTION

MEMORY POISONING

PRIVACY

OBSERVABILITY

AUDIT

EVIDENCE
```

---

# 320. Session Isolation Test

Create Session A and Session B for separate protected scopes.

Expected no uncontrolled state leakage.

---

# 321. Project Isolation Test

Project A Agent attempts to read Project B Working Memory.

Expected:

```text
DENY
```

---

# 322. Customer Isolation Test

Customer A attempts to access Customer B active state.

Expected:

```text
DENY
```

---

# 323. Tenant Isolation Test

Tenant A attempts to access Tenant B active state.

Expected:

```text
DENY
```

---

# 324. Same-Customer Multi-Project Test

Same Customer executes Project A and Project B concurrently.

Expected state remains Project-scoped.

---

# 325. User Switch Test

User A logs out and User B authenticates in same client environment.

Expected User A Working Memory does not leak.

---

# 326. Project Switch Test

User switches from Project A to Project B.

Expected old Project Context becomes ineligible unless explicitly shared.

---

# 327. Task Collision Test

Two tasks with similar content run concurrently.

Expected independent Working Memory identities.

---

# 328. Retry Test

Retry same operation.

Expected duplicate unsafe state change is not created.

---

# 329. Stale Worker Test

Worker with State Version 3 attempts to overwrite State Version 5.

Expected unsafe stale write is prevented or detected.

---

# 330. Parallel Agent Test

Two Agents update shared task state concurrently.

Expected conflict controls preserve coherent state.

---

# 331. Context Overflow Test

Exceed Model Context capacity.

Expected controlled prioritization/compaction rather than unsafe
truncation.

---

# 332. Critical Constraint Preservation Test

Force context compaction.

Expected Project/Tenant/Security/Approval constraints remain.

---

# 333. Temporary Variable Test

Create temporary variable.

Complete session.

Expected variable follows cleanup policy and does not become durable
Memory automatically.

---

# 334. Tool Result Test

Store untrusted Tool output.

Expected Tool content does not create authority.

---

# 335. Prompt Injection Test

Tool output contains:

```text
IGNORE ALL PREVIOUS RULES
```

Expected governance remains controlling.

---

# 336. Fake Approval Test

Malicious state update attempts:

```text
approval_state = APPROVED
```

without authorized approval event.

Expected reject or detect.

---

# 337. TTL Test

Allow Working Memory to reach configured expiry.

Expected defined expiration behavior.

---

# 338. Waiting Task TTL Test

Task waits for approval beyond normal active session duration.

Expected behavior follows explicit waiting-state policy rather than
uncontrolled deletion.

---

# 339. Eviction Test

Create capacity pressure.

Expected execution-critical state survives according to policy.

---

# 340. Checkpoint Test

Checkpoint active task.

Verify scope, Version, and minimum resume state.

---

# 341. Resume Test

Resume valid checkpoint.

Expected controlled continuation.

---

# 342. Resume after Role Change Test

Checkpoint created while User is Admin.

User becomes Viewer.

Expected resume uses current Viewer authority.

---

# 343. Resume after Cancellation Test

Checkpoint task, cancel task, then attempt resume.

Expected:

```text
DO NOT CONTINUE
```

---

# 344. Resume after Approval Revocation Test

Approval exists at checkpoint then is revoked.

Expected resume does not rely on stale approval.

---

# 345. Crash Recovery Test

Terminate active worker after checkpoint.

Expected controlled recovery or safe restart.

---

# 346. Missing State Test

Remove required critical state.

Expected system does not invent missing state.

---

# 347. Promotion Test

Complete material task with reusable knowledge.

Expected durable Memory promotion requires separate admission.

---

# 348. No-Promotion Test

Complete routine temporary task.

Expected Working Memory cleans up without unnecessary durable Memory.

---

# 349. Handoff Test

Agent A hands task to Agent B.

Expected only authorized minimum context transfers.

---

# 350. Child Task Test

Delegate child task.

Expected child receives correct parent scope but not unnecessary state.

---

# 351. Child Result Test

Child returns result.

Expected parent treats it as result candidate rather than automatic final
truth.

---

# 352. Kill-Switch Test

Activate emergency stop during active task.

Expected further execution halts according to governance.

---

# 353. Cancellation Race Test

Cancel task while worker is executing.

Expected stale worker cannot commit unauthorized next step.

---

# 354. Secret Test

Provide secret to a tool via approved secret mechanism.

Expected raw secret is not stored as ordinary Working Memory.

---

# 355. Cleanup Test

Close session.

Expected eligible temporary state and resources are reconciled.

---

# 356. External Resource Cleanup Test

Working Memory references temporary external resource.

Expected resource cleanup occurs through explicit lifecycle logic.

---

# 357. Observability Test

Trigger:

```text
CHECKPOINT FAILURE

RESUME FAILURE

STATE CONFLICT

CROSS-TENANT DENIAL

TTL EXPIRY

EVICTION

CLEANUP FAILURE
```

Expected observable Evidence.

---

# 358. Audit Reconstruction Test

Reconstruct material execution state transitions from:

```text
CREATE

UPDATE

CHECKPOINT

PAUSE

RESUME

HANDOFF

PROMOTION

COMPLETE / FAIL / ABORT

CLEANUP
```

where required.

---

# 359. Working Memory Production Gate

Before Working Memory Management may be Production-authorized:

- [ ] Working Memory identity is implemented;
- [ ] session identity is implemented;
- [ ] task identity is represented where applicable;
- [ ] workflow identity is represented where applicable;
- [ ] run identity is represented where applicable;
- [ ] attempt identity is represented where applicable;
- [ ] Project scope is represented;
- [ ] Customer scope is represented where applicable;
- [ ] Tenant scope is represented where applicable;
- [ ] User scope is represented where applicable;
- [ ] Agent scope is represented where applicable;
- [ ] unknown required scope fails safe;
- [ ] cross-Project isolation is proven;
- [ ] cross-Customer isolation is proven;
- [ ] cross-Tenant isolation is proven;
- [ ] same-Customer multi-Project isolation is proven where required;
- [ ] cross-User leakage is prevented;
- [ ] cross-Agent state leakage is prevented;
- [ ] Working Memory state model is implemented;
- [ ] current goal is representable;
- [ ] current step is representable;
- [ ] temporary variables are controlled;
- [ ] intermediate results are distinguishable from final results;
- [ ] Tool outputs preserve provenance;
- [ ] Tool outputs do not create authority;
- [ ] Model outputs do not create authority;
- [ ] active constraints are preserved;
- [ ] higher-order governance constraints cannot be overwritten by lower state;
- [ ] approval state is represented;
- [ ] approval validity can be revalidated;
- [ ] Context assembly uses authorized sources;
- [ ] Context selection follows minimum-necessary principle;
- [ ] Context priority is defined;
- [ ] Working Memory is distinguishable from Model Context;
- [ ] Context projection is controlled;
- [ ] Context budget is enforced where required;
- [ ] context overflow is handled safely;
- [ ] critical constraints survive compaction;
- [ ] Working Memory compaction is implemented where required;
- [ ] compacted state remains traceable where required;
- [ ] Context refresh occurs when authoritative state changes;
- [ ] stale active state can be detected;
- [ ] high-risk actions revalidate current state;
- [ ] Working Memory lifecycle states are implemented;
- [ ] waiting-state behavior is defined;
- [ ] pause behavior is defined;
- [ ] completion behavior is defined;
- [ ] failure behavior is defined;
- [ ] abort behavior is defined;
- [ ] TTL or equivalent expiration is implemented;
- [ ] TTL is policy-driven rather than universally hardcoded;
- [ ] expiration behavior is implemented;
- [ ] eviction behavior is controlled;
- [ ] execution-critical state is protected from unsafe eviction;
- [ ] cleanup is implemented;
- [ ] sensitive temporary state receives secure cleanup;
- [ ] credentials are not stored as ordinary Working Memory;
- [ ] secret references use approved mechanisms;
- [ ] checkpointing is implemented where required;
- [ ] checkpoint identity is implemented;
- [ ] checkpoint Version is implemented;
- [ ] checkpoint protected scope is preserved;
- [ ] resume revalidates current task state;
- [ ] resume revalidates current authorization;
- [ ] resume revalidates current approval;
- [ ] resume after cancellation is blocked;
- [ ] resume after approval revocation is blocked;
- [ ] crash recovery is tested;
- [ ] missing critical state fails safely;
- [ ] Working Memory promotion is governed;
- [ ] promotion target is explicit;
- [ ] promotion preserves provenance;
- [ ] promotion preserves scope;
- [ ] promotion preserves classification;
- [ ] promotion requires applicable validation;
- [ ] routine temporary state does not become durable automatically;
- [ ] Episodic promotion is governed;
- [ ] Semantic promotion is governed;
- [ ] User Memory promotion is governed;
- [ ] Project Memory promotion is governed;
- [ ] Organization Memory promotion is governed;
- [ ] private Agent Working Memory is supported where required;
- [ ] shared Working Memory is access-controlled;
- [ ] Agent handoff preserves minimum Context;
- [ ] receiving Agent authorization is checked;
- [ ] child task scope is controlled;
- [ ] parent/child result handling is defined;
- [ ] parallel Agent updates are concurrency-safe;
- [ ] state Versioning is implemented where required;
- [ ] stale workers cannot overwrite newer state silently;
- [ ] idempotency is implemented for retry-sensitive operations;
- [ ] event ordering requirements are handled;
- [ ] material events are correlated;
- [ ] Cross-Agent Context sharing is governed;
- [ ] Project switching clears or re-scopes protected active state;
- [ ] Customer switching clears or re-scopes protected active state;
- [ ] Tenant switching clears or re-scopes protected active state;
- [ ] logout or identity change invalidates affected access;
- [ ] role changes affect current authorization;
- [ ] membership changes affect current authorization;
- [ ] authorization cache does not become permanent authority;
- [ ] high-risk actions revalidate permission;
- [ ] kill-switch behavior is integrated;
- [ ] cancellation propagates;
- [ ] stale workers cannot bypass cancellation;
- [ ] execution budgets are represented where required;
- [ ] temporary external resources are lifecycle-managed;
- [ ] storage provider is approved;
- [ ] Working Memory storage is scope-safe;
- [ ] provider failure behavior is defined;
- [ ] durable checkpoint strategy is defined where required;
- [ ] replication preserves scope where used;
- [ ] replication lag cannot override current governance;
- [ ] state-key collision is prevented;
- [ ] environment isolation is implemented;
- [ ] protected Production state is not casually copied to lower environments;
- [ ] capacity is monitored;
- [ ] oversized state behavior is controlled;
- [ ] oversized Tool outputs are handled safely;
- [ ] least privilege is implemented;
- [ ] read and update authority are separated where required;
- [ ] promotion authority is governed;
- [ ] infrastructure administration does not create business Context authority;
- [ ] Data Minimization is implemented;
- [ ] sensitive Working Memory is protected;
- [ ] Prompt Injection content remains data;
- [ ] untrusted instructions cannot override governance;
- [ ] Memory Poisoning controls are implemented;
- [ ] protected scope fields have integrity controls;
- [ ] Privacy requirements are implemented;
- [ ] User-specific temporary state follows Privacy controls;
- [ ] logging minimizes sensitive payload;
- [ ] material Working Memory events are auditable;
- [ ] Working Memory Monitoring is implemented;
- [ ] stale state monitoring is implemented;
- [ ] checkpoint failure monitoring is implemented;
- [ ] resume failure monitoring is implemented;
- [ ] concurrency conflict monitoring is implemented;
- [ ] cleanup failure monitoring is implemented;
- [ ] capacity pressure monitoring is implemented;
- [ ] controlled Working Memory tests pass;
- [ ] controlled Project isolation proof passes;
- [ ] controlled Customer isolation proof passes;
- [ ] controlled Tenant isolation proof passes;
- [ ] controlled checkpoint/resume proof passes;
- [ ] controlled stale-worker proof passes;
- [ ] controlled promotion proof passes;
- [ ] controlled cleanup proof passes;
- [ ] controlled failure recovery proof passes;
- [ ] required Evidence exists;
- [ ] implementation truth is independently reviewed;
- [ ] Production claim is independently reviewed;
- [ ] Founder authorization is recorded;
- [ ] Enterprise Governance authorization is recorded.

---

# 360. Production Hard Stops

Working Memory must not be Production-authorized if any known condition
includes:

```text
CROSS-PROJECT WORKING MEMORY LEAKAGE

CROSS-CUSTOMER WORKING MEMORY LEAKAGE

CROSS-TENANT WORKING MEMORY LEAKAGE

CROSS-USER WORKING MEMORY LEAKAGE

UNCONTROLLED CROSS-AGENT STATE SHARING

UNKNOWN-SCOPE STATE BECOMES GLOBAL

OLD AUTHORIZATION REMAINS ACTIVE AFTER REVOCATION

OLD APPROVAL REMAINS ACTIVE AFTER REVOCATION

PROJECT SWITCH RETAINS UNAUTHORIZED OLD PROJECT CONTEXT

TASK CANCELLATION DOES NOT STOP EXECUTION

KILL SWITCH DOES NOT STOP AFFECTED EXECUTION

STALE WORKER CAN OVERWRITE NEWER STATE

STALE CHECKPOINT CAN RESUME CANCELLED TASK

CHECKPOINT CAN BYPASS CURRENT AUTHORIZATION

TOOL OUTPUT CAN CREATE AUTHORITY

MODEL OUTPUT CAN CREATE APPROVAL

PROMPT INJECTION CAN OVERRIDE GOVERNANCE

RAW SECRETS ARE STORED AS ORDINARY WORKING MEMORY

WORKING MEMORY IS PROMOTED TO DURABLE MEMORY WITHOUT GOVERNANCE

CONTEXT COMPACTION DROPS REQUIRED SECURITY OR SCOPE CONTROLS

EXPIRATION / EVICTION CAN DESTROY REQUIRED RECOVERY STATE WITHOUT POLICY

SENSITIVE TEMPORARY STATE HAS NO CLEANUP

MISSING CRITICAL STATE CAUSES FABRICATED CONTINUATION

MATERIAL STATE CHANGES ARE UNAUDITABLE
```

---

# 361. Working Memory Architecture Baseline

At the current documentation stage:

```text
WORKING_MEMORY_MANAGEMENT_STANDARD
=
DEFINED_TARGET_STATE

WORKING_MEMORY_SCOPE_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_IDENTITY_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_STATE_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_CONTEXT_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_CONTEXT_BUDGET_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_COMPACTION_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_TTL_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_EVICTION_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_CHECKPOINT_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_RESUME_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_RECOVERY_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_PROMOTION_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_MULTI_AGENT_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_HANDOFF_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_CONCURRENCY_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_SECURITY_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_PRIVACY_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_MONITORING_MODEL
=
DEFINED_TARGET_STATE

WORKING_MEMORY_PRODUCTION_GATE
=
DEFINED_TARGET_STATE
```

---

# 362. Runtime Truth

At the current documentation stage:

```text
WORKING_MEMORY_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_STORAGE_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_SESSION_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_TASK_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_PROJECT_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_CUSTOMER_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_TENANT_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_USER_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_AGENT_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_CONTEXT_ASSEMBLY
=
NOT_PROVEN

WORKING_MEMORY_CONTEXT_COMPACTION
=
NOT_PROVEN

WORKING_MEMORY_TTL_ENFORCEMENT
=
NOT_PROVEN

WORKING_MEMORY_EVICTION
=
NOT_PROVEN

WORKING_MEMORY_CHECKPOINTING
=
NOT_PROVEN

WORKING_MEMORY_RESUME
=
NOT_PROVEN

WORKING_MEMORY_CRASH_RECOVERY
=
NOT_PROVEN

WORKING_MEMORY_PROMOTION
=
NOT_PROVEN

WORKING_MEMORY_MULTI_AGENT_COORDINATION
=
NOT_PROVEN

WORKING_MEMORY_CONCURRENCY_CONTROL
=
NOT_PROVEN

WORKING_MEMORY_CLEANUP
=
NOT_PROVEN

WORKING_MEMORY_SECURITY
=
NOT_PROVEN

WORKING_MEMORY_PRIVACY
=
NOT_PROVEN

WORKING_MEMORY_MONITORING
=
NOT_PROVEN

WORKING_MEMORY_EVIDENCE
=
NOT_PROVEN
```

---

# 363. Approval Status

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

MEMORY_PLATFORM_GOVERNANCE_APPROVAL
=
PENDING

WORKING_MEMORY_GOVERNANCE_APPROVAL
=
PENDING

SECURITY_GOVERNANCE_APPROVAL
=
PENDING

PRIVACY_GOVERNANCE_APPROVAL
=
PENDING
```

---

# 364. Canonical Status

```text
CANONICAL
=
FALSE
```

---

# 365. Production Status

```text
PRODUCTION_WORKING_MEMORY_GATE
=
NOT_PASSED

PRODUCTION_WORKING_MEMORY
=
NOT_AUTHORIZED

PRODUCTION_MEMORY_ENGINE
=
NOT_AUTHORIZED

PRODUCTION_AI_OS
=
NOT_AUTHORIZED

PRODUCTION_OPERATIONAL
=
NO
```

---

# 366. Preserved Truth

```text
WORKING MEMORY
≠
PERMANENT MEMORY

WORKING MEMORY
≠
SOURCE OF TRUTH

WORKING MEMORY
≠
AUTHORIZATION SYSTEM

ACTIVE STATE
≠
CURRENT AUTHORITY AUTOMATICALLY

CURRENT CONTEXT
≠
GLOBAL CONTEXT

TASK STATE
≠
AUTHORITATIVE TASK DATABASE

WORKFLOW STATE
≠
AUTHORITATIVE WORKFLOW DATABASE

MODEL OUTPUT
≠
APPROVED RESULT

TOOL OUTPUT
≠
TRUSTED FACT

CHECKPOINT
≠
SAFE RESUME AUTOMATICALLY

RETRY
≠
NEW BUSINESS EVENT

TEMPORARY
≠
UNPROTECTED

USEFUL
≠
PROMOTE AUTOMATICALLY

EXPIRED
≠
LONG-TERM MEMORY

SAME AGENT
≠
SAME PROJECT

SAME USER
≠
SAME TENANT

WORKING MEMORY DOCUMENTED
≠
WORKING MEMORY IMPLEMENTED
```

---

# 367. Completion Checklist

Before this document is considered content-complete for review:

- [ ] Working Memory definition is explicit;
- [ ] Working Memory non-goals are explicit;
- [ ] historical Working Memory intent is preserved;
- [ ] operational-state boundary is explicit;
- [ ] scope hierarchy is defined;
- [ ] Customer isolation is defined;
- [ ] Tenant isolation is defined;
- [ ] Project isolation is defined;
- [ ] User scope is defined;
- [ ] Agent scope is defined;
- [ ] Session identity is defined;
- [ ] Task identity is defined;
- [ ] Workflow identity is defined;
- [ ] Run/attempt identity is defined;
- [ ] conceptual Working Memory identity is defined;
- [ ] conceptual Working Memory record is defined;
- [ ] state categories are defined;
- [ ] current goal is defined;
- [ ] active plan is bounded;
- [ ] current step is defined;
- [ ] temporary variables are bounded;
- [ ] intermediate results are bounded;
- [ ] Tool outputs are bounded;
- [ ] Model outputs are bounded;
- [ ] active constraints are defined;
- [ ] approval state is defined;
- [ ] Context assembly is defined;
- [ ] minimum-sufficient Context principle is defined;
- [ ] Context priority is defined;
- [ ] Context Window boundary is defined;
- [ ] Context projection is defined;
- [ ] Context budget is defined;
- [ ] overflow behavior is defined;
- [ ] critical-state preservation is defined;
- [ ] compaction is defined;
- [ ] Context refresh is defined;
- [ ] stale Working Memory is defined;
- [ ] revalidation is defined;
- [ ] session lifecycle is defined;
- [ ] Working Memory lifecycle states are defined;
- [ ] waiting behavior is defined;
- [ ] pause behavior is defined;
- [ ] completion behavior is defined;
- [ ] failure behavior is defined;
- [ ] abort behavior is defined;
- [ ] TTL direction is defined without unsupported universal value;
- [ ] expiration behavior is defined;
- [ ] eviction behavior is defined;
- [ ] cleanup behavior is defined;
- [ ] secret handling is defined;
- [ ] checkpointing is defined;
- [ ] checkpoint record is defined;
- [ ] resume validation is defined;
- [ ] crash recovery is defined;
- [ ] Working Memory promotion is defined;
- [ ] promotion targets are defined;
- [ ] promotion criteria are defined;
- [ ] Episodic promotion is bounded;
- [ ] Semantic promotion is bounded;
- [ ] User Memory promotion is bounded;
- [ ] Project Memory promotion is bounded;
- [ ] Organization Memory promotion is bounded;
- [ ] no-promotion cleanup is defined;
- [ ] private Agent Working Memory is defined;
- [ ] shared Working Memory is defined;
- [ ] Agent handoff is defined;
- [ ] delegation is defined;
- [ ] parent/child Working Memory is defined;
- [ ] parallel execution is defined;
- [ ] concurrency risks are defined;
- [ ] state Versioning is defined;
- [ ] stale-worker protection is defined;
- [ ] idempotency is defined;
- [ ] ordering is bounded;
- [ ] event correlation is defined;
- [ ] Context sharing is governed;
- [ ] Project switching is governed;
- [ ] Customer switching is governed;
- [ ] Tenant switching is governed;
- [ ] authentication change is governed;
- [ ] role change is governed;
- [ ] membership change is governed;
- [ ] authorization caching is bounded;
- [ ] high-risk action revalidation is defined;
- [ ] Founder approval references are bounded;
- [ ] kill-switch behavior is defined;
- [ ] cancellation behavior is defined;
- [ ] budget state is defined;
- [ ] temporary resources are defined;
- [ ] external-resource cleanup is defined;
- [ ] Working Memory storage direction is defined;
- [ ] prior Redis-style architecture is not falsely claimed as current Production;
- [ ] persistence/checkpoint boundary is defined;
- [ ] replication risk is defined;
- [ ] cache-key scope is defined;
- [ ] environment isolation is defined;
- [ ] capacity management is defined;
- [ ] oversized state is defined;
- [ ] Working Memory Security is defined;
- [ ] least privilege is defined;
- [ ] sensitive Working Memory is defined;
- [ ] Data Minimization is defined;
- [ ] Prompt Injection boundary is defined;
- [ ] Memory Poisoning boundary is defined;
- [ ] integrity-protected fields are defined;
- [ ] Privacy is defined;
- [ ] logging minimization is defined;
- [ ] auditability is defined;
- [ ] observability is defined;
- [ ] metrics are defined;
- [ ] latency boundary is defined;
- [ ] availability boundary is defined;
- [ ] failure handling is defined;
- [ ] missing-state fail-safe behavior is defined;
- [ ] state reconstruction is defined;
- [ ] private Model reasoning boundary is defined;
- [ ] Evidence integration is defined;
- [ ] Verifiable Work Envelope integration is defined;
- [ ] Human interaction is defined;
- [ ] Founder escalation is defined;
- [ ] long-running workflow behavior is defined;
- [ ] scheduled resume is defined;
- [ ] external-event resume is defined;
- [ ] duplicate-event boundary is defined;
- [ ] compensation/rollback state is defined;
- [ ] Tool-call state is defined;
- [ ] external side-effect boundary is defined;
- [ ] Working Memory quality is defined;
- [ ] conflict detection is defined;
- [ ] decision frameworks are defined;
- [ ] Working Memory Type boundary is defined;
- [ ] Short-Term Memory integration is defined;
- [ ] Context Management integration is defined;
- [ ] Conversation Memory integration is defined;
- [ ] Agent Memory integration is defined;
- [ ] User Memory integration is defined;
- [ ] Project Memory integration is defined;
- [ ] Organization Memory integration is defined;
- [ ] Episodic Memory integration is defined;
- [ ] Semantic Memory integration is defined;
- [ ] Long-Term Memory integration is defined;
- [ ] Retrieval Engine integration is defined;
- [ ] Storage Engine integration is defined;
- [ ] Memory Security integration is defined;
- [ ] Memory Monitoring integration is defined;
- [ ] AI Operating System integration is defined;
- [ ] Task Engine boundary is defined;
- [ ] Workflow Engine boundary is defined;
- [ ] Agent Runtime boundary is defined;
- [ ] AI Constitution integration is defined;
- [ ] Verifiable Work Envelope integration is defined;
- [ ] Multi-Project Operating Model integration is defined;
- [ ] controlled test families are defined;
- [ ] Production gate is defined;
- [ ] Production Hard Stops are defined;
- [ ] runtime truth consistently uses `NOT_PROVEN`;
- [ ] no unproven storage-provider claim is made;
- [ ] no unproven isolation claim is made;
- [ ] no unproven Production claim is made.

This document becomes canonical only after required Founder, Founder
Office, Enterprise Governance, Enterprise Architecture, Memory Platform
Governance, Working Memory Governance, AI Operating System Governance,
AI Workforce Governance, Agent Runtime Governance, Context Governance,
Task Governance, Workflow Governance, Project Governance, Data
Governance, Security Governance, Privacy Governance, Reliability
Engineering, Risk Governance, Quality Governance, Evidence Governance,
Audit Governance, Enterprise Operations, and Documentation Governance
review, plus controlled session/task/workflow identity, Project/Customer/
Tenant/User/Agent isolation, Context selection, compaction, TTL,
checkpoint, resume, crash recovery, promotion, Agent handoff,
concurrency, cancellation, kill-switch, Security, Privacy, Monitoring,
cleanup, and Evidence proofs.

---

# 368. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-08 | Draft | Initial governed Working Memory Management model |
| 1.0.0 | 2026-08-08 | Draft | Established target-state enterprise Working Memory Management covering active session/task/workflow state, scope isolation, temporary variables, Context assembly, prioritization, Context Window governance, compaction, TTL, expiration, eviction, checkpointing, resume, recovery, promotion, multi-Agent sharing, handoff, concurrency, Security, Privacy, Monitoring, Evidence, controlled tests, and Production readiness |

---

# 369. Changelog Entry

Add the following entry to:

```text
doc/21-memory-engine/CHANGELOG.md
```

```markdown
## MEMORY-CHG-20260808-059 — Governed Working Memory Management Standard Established

| Field | Value |
|---|---|
| Date | 2026-08-08 |
| Change Type | `CREATED`, `MEMORY-ENGINE`, `WORKING-MEMORY`, `ACTIVE-STATE`, `CONTEXT`, `CHECKPOINTING`, `RECOVERY`, `PROMOTION`, `MULTI-AGENT`, `SECURITY`, `PRIVACY`, `PRODUCTION-READINESS` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — Critical` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Document

`doc/21-memory-engine/working/working-memory-management.md`

### Previous State

The `working` folder contained the planned
`working-memory-management.md` placeholder while the broader Memory Engine
documentation was being completed.

### New State

The Memory Engine now defines governed target-state Working Memory
Management covering:

- active session state;
- active task state;
- workflow state;
- run and attempt identity;
- Project scope;
- Customer scope;
- Tenant scope;
- User scope;
- Agent scope;
- temporary variables;
- intermediate results;
- Tool outputs;
- Model-output boundaries;
- active constraints;
- approval state;
- Context assembly;
- Context prioritization;
- minimum-sufficient Context;
- Context Window management;
- Context budgets;
- overflow handling;
- compaction;
- stale-state detection;
- lifecycle;
- TTL;
- expiration;
- eviction;
- secure cleanup;
- secret boundaries;
- checkpointing;
- controlled resume;
- crash recovery;
- durable-Memory promotion;
- multi-Agent Working Memory;
- handoffs;
- delegation;
- parent/child task state;
- concurrency;
- stale-worker protection;
- idempotency;
- Project/Customer/Tenant switching;
- current authorization;
- kill-switch behavior;
- cancellation;
- execution budgets;
- temporary resources;
- storage direction;
- replication concerns;
- environment isolation;
- capacity;
- Security;
- Privacy;
- Prompt Injection controls;
- Memory Poisoning controls;
- auditability;
- Monitoring;
- failure handling;
- Evidence;
- controlled tests;
- Production gate;
- Production Hard Stops.

### Runtime Truth

```text
WORKING_MEMORY_MANAGEMENT_DOCUMENT
=
CONTENT_COMPLETE_FOR_REVIEW

WORKING_MEMORY_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_STORAGE_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_PROJECT_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_CUSTOMER_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_TENANT_ISOLATION
=
NOT_PROVEN

WORKING_MEMORY_CHECKPOINT_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_PROMOTION_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_SECURITY
=
NOT_PROVEN

PRODUCTION_WORKING_MEMORY
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

CANONICAL
=
FALSE
```
```

---

# 370. Working Folder Status

After saving:

```text
doc/21-memory-engine/working/
└── working-memory-management.md
```

the substantive document state becomes:

```text
WORKING_FOLDER
=
CONTENT_COMPLETE_FOR_REVIEW
```

This does not prove runtime implementation.

---

# 371. Documentation Count Safety Rule

The repository has previously contained brace-named placeholder entries
such as:

```text
{working-memory-management.md}
```

while the current screenshot shows the real file:

```text
working-memory-management.md
```

Therefore this document does **not** assert a final numeric Memory Engine
completion count until the current filesystem is re-counted after all
placeholder/canonical-path decisions.

The valid claim after saving is:

```text
doc/21-memory-engine/working/working-memory-management.md
=
CONTENT_COMPLETE_FOR_REVIEW
```

---

# 372. Module Status After This Document

```text
WORKING_MEMORY_DOCUMENTATION
=
CONTENT_COMPLETE_FOR_REVIEW

WORKING_MEMORY_IMPLEMENTATION
=
NOT_PROVEN

WORKING_MEMORY_RUNTIME
=
NOT_PROVEN

WORKING_MEMORY_SECURITY
=
NOT_PROVEN

WORKING_MEMORY_PRODUCTION
=
NOT_AUTHORIZED
```

---

# 373. Next Documentation Action

After saving this file, do **not** invent another `21-memory-engine`
content document automatically.

The next step should be determined from the current actual project tree.

Expected decision:

```text
IF
NO OTHER SUBSTANTIVE 21-MEMORY-ENGINE PLACEHOLDERS REMAIN

THEN
21-MEMORY-ENGINE CONTENT COMPLETION REVIEW

ELSE
COMPLETE THE NEXT VERIFIED ACTUAL PLACEHOLDER
```

---

# Final Rule

```text
WORKING MEMORY
IS
THE ACTIVE EXECUTION WORKSPACE

NOT
THE PERMANENT MEMORY OF THE COMPANY

NOT
THE SOURCE OF TRUTH

NOT
THE AUTHORIZATION SYSTEM

NOT
THE APPROVAL SYSTEM
```

The governed lifecycle is:

```text
AUTHORIZED INPUT
↓
ACTIVE EXECUTION STATE
↓
MINIMUM SUFFICIENT CONTEXT
↓
MODEL / TOOL / AGENT EXECUTION
↓
VALIDATION
↓
CHECKPOINT / CONTINUE / COMPLETE
↓
PROMOTION REVIEW
├── DURABLE MEMORY IF JUSTIFIED
└── SECURE CLEANUP IF NOT REQUIRED
```

And the permanent safety rule is:

```text
TEMPORARY EXECUTION STATE
MUST NEVER
SILENTLY BECOME

GLOBAL KNOWLEDGE

PERMANENT USER MEMORY

ORGANIZATION POLICY

APPROVAL

AUTHORIZATION

OR
CROSS-PROJECT / CROSS-CUSTOMER / CROSS-TENANT CONTEXT
```

---