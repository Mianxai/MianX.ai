---
id: SYS-SEC-004
title: Role-Based Access Control (RBAC)
version: 1.0.0
status: Active

owner:
  architecture: Solution Architecture Team
  engineering: Security Engineering Team

reviewers:
  - Platform Team
  - Backend Team
  - DevOps Team
  - Infrastructure Team
  - Compliance Team

created: 2026-07-06
updated: 2026-07-06

category: Security

tags:
  - security
  - rbac
  - roles
  - permissions
  - authorization
  - enterprise
---

# Role-Based Access Control (RBAC)

> This document defines the Role-Based Access Control (RBAC) model used throughout the MIANX CoreOS Platform. RBAC provides a centralized, scalable, and maintainable mechanism for assigning permissions to users through roles instead of individual permission assignments.

---

# Purpose

RBAC simplifies authorization by grouping permissions into reusable roles.

Instead of assigning hundreds of permissions directly to users, users receive one or more roles, and each role grants a predefined set of permissions.

---

# Objectives

The RBAC subsystem provides:

- Centralized Permission Management
- Role-Based Authorization
- Least Privilege Access
- Enterprise Scalability
- Tenant Isolation
- Easy Permission Administration
- Auditability
- Policy Integration

---

# RBAC Principles

MIANX CoreOS follows these RBAC principles:

- Assign permissions to roles
- Assign roles to identities
- Never assign unrestricted access
- Apply least privilege
- Keep roles business-oriented
- Separate administrative roles
- Audit every role assignment

---

# RBAC Architecture

```text
              User
                │
                ▼
         Assigned Roles
                │
                ▼
          RBAC Engine
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
     Roles   Permissions Policies
        │
        ▼
 Authorization Decision
```

---

# Core Components

The RBAC system consists of:

- Roles
- Permissions
- Role Assignments
- Permission Registry
- Role Hierarchy
- Authorization Engine
- Audit Logging

---

# RBAC Entities

| Entity | Description |
|----------|-------------|
| User | Human identity |
| Service | Internal system identity |
| Role | Collection of permissions |
| Permission | Individual capability |
| Assignment | Role linked to identity |
| Scope | Tenant/Organization/Workspace |

---

# Role Hierarchy

```text
Platform Owner
      │
      ▼
Platform Administrator
      │
      ▼
Organization Owner
      │
      ▼
Organization Administrator
      │
      ▼
Workspace Manager
      │
      ▼
Project Manager
      │
      ▼
Standard User
      │
      ▼
Guest
```

Higher roles inherit permissions from lower roles unless explicitly restricted.

---

# Role Categories

## Platform Roles

Manage the entire platform.

Examples:

- Platform Owner
- Platform Administrator
- Platform Auditor
- Platform Support

---

## Organization Roles

Manage a single organization.

Examples:

- Organization Owner
- Organization Administrator
- Finance Manager
- HR Manager

---

## Workspace Roles

Manage workspace resources.

Examples:

- Workspace Manager
- Team Lead
- Member
- Viewer

---

## Project Roles

Manage project-level permissions.

Examples:

- Project Owner
- Project Manager
- Developer
- QA Engineer
- Designer
- Client

---

## Service Roles

Assigned to internal services.

Examples:

- Notification Service
- Analytics Service
- Search Service
- AI Service

---

# Permission Model

Permissions follow a consistent naming convention:

```text
resource.action
```

Examples:

```text
project.create
project.read
project.update
project.delete

user.create
user.read
user.update

invoice.approve
invoice.export

report.generate
report.download
```

---

# Permission Groups

Permissions are grouped by module.

Example:

```text
Projects

project.create
project.read
project.update
project.delete

Invoices

invoice.create
invoice.read
invoice.pay
invoice.export
```

---

# Role Assignment

Users may receive:

- One Role
- Multiple Roles

Effective permissions are calculated as the union of all assigned roles.

```text
User

↓

Developer

+

Project Manager

↓

Combined Permissions
```

---

# Scoped Roles

Roles may be assigned at different scopes:

| Scope | Example |
|---------|----------|
| Platform | Entire system |
| Organization | Company |
| Workspace | Team |
| Project | Individual project |

Example:

```text
Organization Admin

↓

Organization A
```

does not automatically grant administrative access to:

```text
Organization B
```

---

# Permission Evaluation

Authorization evaluates:

1. Identity
2. Assigned Roles
3. Effective Permissions
4. Resource Scope
5. Tenant Context
6. Additional Policies (ABAC)

Only after all checks pass is access granted.

---

# Role Inheritance

Example:

```text
Project Owner

inherits

↓

Project Manager

inherits

↓

Project Member
```

Inheritance reduces duplication while keeping permission definitions manageable.

---

# Role Lifecycle

```text
Role Created
      │
      ▼
Permissions Assigned
      │
      ▼
Users Assigned
      │
      ▼
Role Updated
      │
      ▼
Role Audited
      │
      ▼
Role Retired
```

---

# Dynamic Role Changes

Role updates become effective immediately.

Events triggering updates include:

- Promotion
- Demotion
- Department Change
- Organization Transfer
- User Suspension
- Role Removal

Permission caches must be refreshed accordingly.

---

# Separation of Duties (SoD)

Sensitive operations should require separate roles.

Examples:

```text
Invoice Creator

≠

Invoice Approver
```

```text
Developer

≠

Production Administrator
```

This reduces fraud and operational risk.

---

# Service Roles

Internal services use dedicated identities with narrowly scoped permissions.

Example:

```text
Notification Service

↓

notification.send
notification.read
```

Services must never use administrator roles.

---

# Audit Logging

Every RBAC event is recorded.

Events include:

- Role Created
- Role Updated
- Role Deleted
- Permission Assigned
- Permission Removed
- User Assigned
- User Unassigned

Audit record fields:

- Timestamp
- User
- Administrator
- Role
- Permission
- Tenant
- Correlation ID

---

# Performance Targets

| Metric | Target |
|----------|---------|
| Role Lookup | <5 ms |
| Permission Resolution | <10 ms |
| Role Assignment | <50 ms |
| Permission Cache Lookup | <2 ms |
| Authorization Integration | <20 ms |

---

# Security Considerations

RBAC enforces:

- Least Privilege
- Tenant Isolation
- Immutable Audit Logs
- Secure Role Administration
- Permission Validation
- Restricted Administrative Access

Role definitions must be version-controlled and reviewed before deployment.

---

# Best Practices

Recommended:

- Design small, reusable roles
- Group permissions logically
- Avoid assigning permissions directly to users
- Review roles periodically
- Remove unused roles
- Separate operational and administrative roles
- Apply Separation of Duties

---

# Anti-Patterns

Avoid:

- "Super Admin" roles with unrestricted access
- Hundreds of overlapping roles
- Direct user permission assignments
- Hardcoded role checks
- Shared administrator accounts
- Cross-tenant role reuse without validation

---

# Future Enhancements

Planned improvements:

- Dynamic Role Templates
- Time-Limited Role Assignments
- AI-Assisted Role Recommendations
- Automatic Permission Analysis
- Role Simulation Engine
- Cross-Tenant Federation
- Visual Role Designer

---

# Related Documents

## Security

- README.md
- authentication.md
- authorization.md
- abac.md
- permissions.md
- session-management.md
- audit-logging.md

## Runtime

- ../runtime/

## Services

- ../services/

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|---------------------------------------------|
| 1.0.0 | 2026-07-06 | Founder | Initial RBAC Architecture Specification |