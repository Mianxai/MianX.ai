---
id: SYS-RT-003
title: Execution Context Specification
version: 1.0.0
status: Active

owner:
  architecture: Solution Architecture Team
  engineering: Core Engineering Team

reviewers:
  - Platform Team
  - Backend Team
  - DevOps Team
  - Security Team
  - QA Team

created: 2026-07-06
updated: 2026-07-06

category: Runtime

tags:
  - execution-context
  - runtime
  - request-context
  - multi-tenant
  - enterprise
---

# Execution Context Specification

> This document defines the Execution Context used by the MIANX CoreOS Runtime. The Execution Context represents the complete runtime environment for a single request, background job, scheduled task, or event execution.

---

# Purpose

The Execution Context provides a secure, isolated, and consistent environment throughout the lifetime of an execution.

It enables:

- Request isolation
- User identity propagation
- Tenant isolation
- Permission enforcement
- Transaction management
- Distributed tracing
- Runtime consistency

Each execution receives its own independent context.

---

# Objectives

The Execution Context is designed to provide:

- Isolation
- Security
- Consistency
- Traceability
- Dependency Scope
- Resource Tracking
- Context Propagation
- Observability

---

# Context Architecture

```text
Incoming Request
        │
        ▼
Authentication
        │
        ▼
Authorization
        │
        ▼
Tenant Resolution
        │
        ▼
Execution Context
        │
 ┌──────┼───────────────┐
 ▼      ▼               ▼
Services Events      Database
        │
        ▼
Response
```

The context exists only during execution.

---

# Context Lifecycle

```text
Create
   │
   ▼
Initialize
   │
   ▼
Populate
   │
   ▼
Use
   │
   ▼
Dispose
```

The Runtime automatically creates and destroys the context.

---

# Context Types

The platform supports multiple execution contexts.

## HTTP Request Context

Created for:

- REST APIs
- GraphQL APIs
- Internal APIs

Lifetime:

One HTTP request

---

## Background Job Context

Created for:

- Queue Workers
- Email Processing
- File Processing
- Report Generation

Lifetime:

One background job

---

## Scheduler Context

Created for:

- Cron Jobs
- Scheduled Tasks
- Maintenance Jobs

Lifetime:

One scheduled execution

---

## Event Context

Created for:

- Domain Events
- Integration Events
- System Events

Lifetime:

One event execution

---

# Core Context Properties

Every Execution Context contains:

| Property | Description |
|-----------|-------------|
| Request ID | Unique request identifier |
| Correlation ID | Distributed tracing identifier |
| Trace ID | Cross-service execution trace |
| Session ID | Active session identifier |
| User ID | Authenticated user |
| Tenant ID | Organization identifier |
| Workspace ID | Active workspace |
| Locale | User language |
| Time Zone | User time zone |
| Client IP | Origin IP address |
| User Agent | Client information |
| API Version | Requested API version |
| Request Timestamp | Execution start time |

---

# Security Context

Security information includes:

- Authentication Status
- JWT Claims
- User Roles
- Effective Permissions
- Organization Membership
- Workspace Membership
- Active Policies

Business services should obtain security information only from the Execution Context.

---

# Tenant Context

Multi-tenancy requires:

- Tenant ID
- Organization
- Subscription
- Region
- Data Partition
- Tenant Configuration

Every database operation must execute within the active tenant context.

Cross-tenant access is prohibited unless explicitly authorized.

---

# Request Metadata

Runtime stores request metadata:

```text
HTTP Method

Request Path

Headers

Query Parameters

Route Parameters

Content Type

Accept Header

Client Version
```

Sensitive headers must never be exposed to business logic unless explicitly required.

---

# Runtime Metadata

Execution metadata includes:

- Start Time
- End Time
- Duration
- Service Name
- Module Name
- Runtime Version
- Environment
- Host Instance

---

# Dependency Scope

Scoped services belong exclusively to one Execution Context.

Example:

```text
Execution Context

│

├── Database Context

├── Repository

├── Business Service

├── Validator

└── Cache Session
```

Scoped dependencies are automatically disposed after execution.

---

# Transaction Context

Database transactions are tracked within the Execution Context.

```text
Begin

↓

Execute

↓

Commit

↓

Dispose
```

If an exception occurs:

```text
Rollback
```

Only one active transaction is permitted per execution unless nested transactions are explicitly supported.

---

# Event Context Propagation

Published events inherit:

- Correlation ID
- Trace ID
- Tenant ID
- User ID (where applicable)

This enables end-to-end tracing across services.

---

# Logging Context

Every log entry automatically includes:

- Timestamp
- Request ID
- Correlation ID
- Trace ID
- User ID
- Tenant ID
- Module
- Service
- Severity

This ensures centralized log correlation.

---

# Resource Management

The Execution Context owns:

- Database Connections
- Cache Sessions
- Queue Connections
- File Handles
- Scoped Services

Resources are released immediately after execution completes.

---

# Error Context

If an error occurs, the Runtime records:

- Exception Type
- Error Code
- Stack Trace (Internal Only)
- Correlation ID
- Service
- Recovery Action

Errors remain associated with the originating Execution Context.

---

# Context Disposal

Upon completion:

```text
Commit / Rollback
        │
        ▼
Publish Events
        │
        ▼
Dispose Scoped Services
        │
        ▼
Release Resources
        │
        ▼
Write Metrics
        │
        ▼
Destroy Context
```

No execution state persists after disposal.

---

# Performance Considerations

The Execution Context should:

- Be lightweight
- Avoid unnecessary allocations
- Reuse immutable objects
- Minimize memory usage
- Dispose resources promptly

Target creation time:

| Operation | Target |
|------------|---------|
| Context Creation | <5 ms |
| Context Disposal | <5 ms |

---

# Security Requirements

Execution Context must:

- Be immutable where possible
- Prevent cross-request data leakage
- Prevent cross-tenant access
- Encrypt sensitive values in memory when appropriate
- Never expose secrets to business modules

---

# Best Practices

Recommended:

- One context per execution
- Keep context immutable after initialization
- Store only execution-specific data
- Use correlation IDs for tracing
- Dispose resources automatically
- Never share contexts across threads or requests

---

# Anti-Patterns

Avoid:

- Static execution contexts
- Global mutable state
- Sharing context between users
- Storing business data in the context
- Long-lived scoped objects
- Manual context creation

---

# Future Enhancements

Planned improvements:

- Distributed Context Propagation
- OpenTelemetry Integration
- AI-Assisted Trace Analysis
- Cross-Region Context Synchronization
- Runtime Context Snapshots
- Context Replay for Debugging

---

# Related Documents

## Runtime

- README.md
- request-lifecycle.md
- runtime-engine.md
- scheduler.md
- background-workers.md
- event-processing.md
- resource-management.md
- state-management.md
- monitoring.md

## Services

- ../services/

## System

- ../README.md
- ../architecture.md
- ../coreos.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|-------------------------------------------|
| 1.0.0 | 2026-07-06 | Founder | Initial Execution Context Specification |