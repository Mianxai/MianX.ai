---
title: Naming Conventions
description: Defines the enterprise naming conventions for projects, repositories, source code, APIs, databases, infrastructure, cloud resources, AI assets, and engineering artifacts across the MIANX-AI platform.
category: Engineering
parent: 06-engineering/coding-standards
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Engineering Department
reviewers:
  - Architecture Review Board (ARB)
  - Engineering Managers
  - Technical Leads
version: 1.0.0
last_updated: 2026-07-08
tags:
  - naming
  - conventions
  - standards
  - engineering
---

# Naming Conventions

---

# Purpose

This document defines the official naming conventions used throughout the MIANX-AI platform.

Consistent naming improves readability, discoverability, maintainability, automation, and collaboration between engineers and AI systems.

Every engineering artifact shall follow these conventions.

---

# Objectives

This standard aims to:

- Standardize naming
- Improve readability
- Simplify maintenance
- Reduce ambiguity
- Improve searchability
- Enable automation
- Improve documentation
- Support AI-generated code
- Maintain enterprise consistency
- Improve onboarding

---

# Scope

These standards apply to:

- Organizations
- Projects
- Repositories
- Applications
- Services
- APIs
- Source Code
- Databases
- Infrastructure
- Cloud Resources
- Kubernetes
- Docker
- AI Systems
- Documentation
- CI/CD Pipelines

---

# General Principles

Names shall be:

- Descriptive
- Consistent
- Predictable
- Human-readable
- Concise
- Business-oriented
- Stable
- Unambiguous

Avoid abbreviations unless universally understood.

---

# Language

All identifiers shall use English.

Avoid:

- Mixed languages
- Local abbreviations
- Slang
- Personal naming styles

---

# Case Standards

| Type | Standard |
|--------|----------|
| Variables | camelCase |
| Functions | camelCase |
| Methods | camelCase |
| Constants | UPPER_SNAKE_CASE |
| Classes | PascalCase |
| Interfaces | PascalCase |
| Enums | PascalCase |
| Enum Values | UPPER_SNAKE_CASE |
| Files | kebab-case |
| Folders | kebab-case |
| URLs | kebab-case |
| Database Tables | snake_case |
| Database Columns | snake_case |
| Environment Variables | UPPER_SNAKE_CASE |
| Docker Images | kebab-case |
| Kubernetes Resources | kebab-case |
| Git Branches | kebab-case |

---

# Repository Names

Repository names use:

```text
kebab-case
```

Examples:

```text
mianx-platform

authentication-service

project-management

knowledge-engine

erp-finance

crm-platform
```

Avoid:

```text
MyRepo

ProjectRepo

Test123

newrepo

backendFinal
```

---

# Project Names

Projects should describe business capability.

Examples:

```text
authentication

project-management

organization-management

workflow-engine

knowledge-platform

automation-engine
```

---

# Folder Names

Use:

```text
kebab-case
```

Examples:

```text
user-management

shared-components

application-services

domain-models

database-migrations
```

---

# File Names

All files use:

```text
kebab-case
```

Examples:

```text
project-service.ts

user-controller.ts

invoice-validator.ts

payment-provider.ts

organization.repository.ts
```

Avoid:

```text
ProjectService.ts

projectService.ts

MyFile.ts

Test.ts
```

---

# Variables

Use:

```text
camelCase
```

Examples:

```typescript
userName

projectId

organizationSettings

invoiceTotal

currentWorkspace
```

Variables should describe their purpose.

---

# Boolean Variables

Start with:

- is
- has
- can
- should
- contains

Examples:

```typescript
isActive

hasPermission

canDelete

shouldRetry

isVerified
```

---

# Constants

Use:

```text
UPPER_SNAKE_CASE
```

Examples:

```text
MAX_FILE_SIZE

DEFAULT_TIMEOUT

MAX_RETRY_COUNT

API_VERSION

JWT_EXPIRATION_TIME
```

---

# Functions

Use:

```text
camelCase
```

Functions should begin with verbs.

Examples:

```typescript
createProject()

updateInvoice()

calculateSalary()

generateReport()

sendNotification()
```

Avoid:

```typescript
project()

salary()

data()

abc()
```

---

# Async Functions

Use verbs describing the action.

Examples:

```typescript
fetchProjects()

loadUser()

saveInvoice()

processPayment()
```

Do not append unnecessary suffixes like:

```text
fetchProjectsAsync()
```

---

# Classes

Use:

```text
PascalCase
```

Examples:

```text
UserService

ProjectRepository

InvoiceGenerator

AuthenticationController

WorkflowEngine
```

Classes represent nouns.

---

# Interfaces

Use:

```text
PascalCase
```

Examples:

```text
User

Project

Invoice

AuthenticationProvider
```

Avoid unnecessary prefixes like:

```text
IUser
```

unless required by project standards.

---

# Enums

Use:

```text
PascalCase
```

Examples:

```text
UserStatus

ProjectStatus

InvoiceType
```

Enum values:

```text
ACTIVE

INACTIVE

PENDING

COMPLETED
```

---

# Type Aliases

Use:

```text
PascalCase
```

Examples:

```text
ProjectId

UserRole

ApiResponse
```

---

# Generic Types

Use meaningful names.

Examples:

```text
TEntity

TRequest

TResponse

TResult
```

Avoid:

```text
T1

T2

ABC
```

---

# API Endpoints

Use:

```text
kebab-case
```

Examples:

```text
/api/projects

/api/user-roles

/api/workspaces

/api/invoices
```

Resources should be plural.

---

# API Parameters

Use:

```text
camelCase
```

Examples:

```text
projectId

workspaceId

organizationId

invoiceNumber
```

---

# Database Tables

Use:

```text
snake_case
```

Examples:

```text
users

organizations

project_tasks

invoice_items

workflow_steps
```

Plural nouns are preferred.

---

# Database Columns

Use:

```text
snake_case
```

Examples:

```text
created_at

updated_at

organization_id

first_name

last_login_at
```

---

# Database Indexes

Format:

```text
idx_<table>_<column>
```

Examples:

```text
idx_users_email

idx_projects_status

idx_tasks_due_date
```

---

# Foreign Keys

Format:

```text
fk_<table>_<reference>
```

Examples:

```text
fk_projects_owner

fk_tasks_project

fk_users_organization
```

---

# Primary Keys

Use:

```text
id
```

Foreign keys:

```text
user_id

project_id

organization_id
```

---

# Event Names

Use:

```text
Past Tense
```

Examples:

```text
UserCreated

ProjectArchived

InvoicePaid

TaskCompleted

OrganizationDeleted
```

---

# Queue Names

Use:

```text
kebab-case
```

Examples:

```text
email-queue

notification-queue

invoice-processing

ai-worker

project-events
```

---

# Kafka Topics

Use:

```text
dot.notation
```

Examples:

```text
user.created

project.updated

invoice.paid

organization.deleted
```

---

# Environment Variables

Use:

```text
UPPER_SNAKE_CASE
```

Examples:

```text
DATABASE_URL

JWT_SECRET

REDIS_HOST

SMTP_PORT

OPENAI_API_KEY
```

---

# Docker Images

Use:

```text
kebab-case
```

Examples:

```text
authentication-service

project-service

erp-finance

knowledge-engine
```

---

# Kubernetes Resources

Examples:

```text
authentication-api

project-worker

knowledge-service

erp-finance

ai-runtime
```

---

# Git Branches

Use:

```text
feature/user-management

feature/project-dashboard

bugfix/login-timeout

hotfix/payment-failure

release/v1.0.0
```

---

# Git Tags

Format:

```text
v1.0.0

v2.5.1

v3.0.0-beta
```

---

# Documentation Files

Documentation uses:

```text
kebab-case
```

Examples:

```text
coding-principles.md

architecture-roadmap.md

security-policy.md

testing-standards.md
```

---

# AI Assets

Examples:

```text
customer-support-agent

software-architect-agent

finance-analyst-agent

knowledge-index

prompt-library
```

---

# Common Naming Mistakes

Avoid:

- Single-letter variables
- Ambiguous abbreviations
- Mixed casing
- Inconsistent pluralization
- Personal naming styles
- Version numbers in file names
- Temporary names
- Generic names

Examples:

```text
x

tmp

abc

newCode

testFinal

service2
```

---

# Naming Checklist

Before creating any engineering artifact verify:

- Uses English
- Describes purpose
- Follows casing standards
- Matches project conventions
- Avoids abbreviations
- Avoids unnecessary prefixes
- Avoids temporary names
- Supports long-term maintainability

---

# Governance

Naming conventions are governed by:

- Chief Technology Officer (CTO)
- Architecture Review Board (ARB)
- Engineering Leadership

Automated linting and code review processes should enforce compliance.

---

# Related Documents

- README.md
- coding-principles.md
- clean-code.md
- project-structure.md
- code-review-standards.md
- documentation-standards.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Naming Conventions documentation. |