---
title: Project Structure
description: Defines the enterprise project structure, repository organization, directory layout, module boundaries, and architectural layering standards for all MIANX-AI software projects.
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
  - project-structure
  - engineering
  - architecture
  - standards
---

# Project Structure

---

# Purpose

This document defines the official project structure standard for every software project developed within the MIANX-AI platform.

A standardized project structure improves consistency, maintainability, onboarding, automation, documentation, scalability, and long-term engineering productivity.

Every repository shall follow this standard unless an approved exception exists.

---

# Objectives

The Project Structure standard aims to:

- Standardize repository organization
- Improve maintainability
- Simplify onboarding
- Support enterprise scalability
- Reduce technical debt
- Improve discoverability
- Enable automation
- Support AI-assisted development
- Encourage modular architecture
- Maintain engineering consistency

---

# Scope

This standard applies to:

- Backend Services
- Frontend Applications
- Mobile Applications
- APIs
- Microservices
- AI Services
- Libraries
- SDKs
- Infrastructure Projects
- Internal Tools

---

# Project Structure Principles

Every project shall be:

- Modular
- Predictable
- Organized
- Documented
- Testable
- Scalable
- Maintainable
- Secure
- Observable
- Production Ready

---

# Standard Repository Layout

```text
project-name/

├── docs/
├── src/
├── tests/
├── scripts/
├── infrastructure/
├── config/
├── assets/
├── public/
├── examples/
├── tools/
├── .github/
├── .vscode/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

---

# Root Directory

The root directory contains only project-level files.

Allowed items include:

- Documentation
- Configuration
- Build Files
- CI/CD Files
- Infrastructure
- Source Code
- Assets

Avoid placing business logic directly in the root.

---

# Documentation Directory

```text
docs/
```

Contains:

- Architecture
- API Documentation
- ADRs
- Design Documents
- Guides
- Standards
- Diagrams
- Runbooks

Documentation shall be version controlled.

---

# Source Directory

```text
src/
```

Contains all application source code.

Example:

```text
src/

├── application/
├── domain/
├── infrastructure/
├── presentation/
├── shared/
├── config/
├── modules/
└── main.ts
```

---

# Application Layer

```text
src/application/
```

Contains:

- Use Cases
- Services
- Commands
- Queries
- DTOs
- Validators

Business workflows belong here.

---

# Domain Layer

```text
src/domain/
```

Contains:

- Entities
- Aggregates
- Value Objects
- Domain Events
- Domain Services
- Repository Interfaces

Business rules belong here.

---

# Infrastructure Layer

```text
src/infrastructure/
```

Contains:

- Database
- External APIs
- Repositories
- Messaging
- Storage
- Authentication
- Email
- Cache

Infrastructure concerns shall remain isolated.

---

# Presentation Layer

```text
src/presentation/
```

Contains:

- Controllers
- Routes
- Middleware
- API Responses
- GraphQL
- REST Endpoints

Presentation handles external communication.

---

# Shared Layer

```text
src/shared/
```

Contains reusable assets.

Examples:

- Utilities
- Constants
- Exceptions
- Base Classes
- Helpers
- Common Types

---

# Modules Directory

```text
src/modules/
```

Feature-based organization.

Example:

```text
modules/

authentication/

organization/

projects/

tasks/

users/

notifications/
```

Each module should be self-contained.

---

# Configuration

```text
src/config/
```

Contains:

- Environment Configuration
- Application Settings
- Feature Flags
- Dependency Injection
- Logging Configuration

Secrets shall never be stored here.

---

# Testing Directory

```text
tests/
```

Example:

```text
tests/

unit/

integration/

e2e/

performance/

fixtures/

mocks/
```

Testing shall mirror application structure.

---

# Infrastructure Directory

```text
infrastructure/
```

Contains:

- Kubernetes
- Docker
- Terraform
- Helm
- Networking
- Monitoring

Infrastructure shall use Infrastructure as Code.

---

# Configuration Directory

```text
config/
```

Contains:

- Static Configuration
- Templates
- Environment Examples

Examples:

```text
default.yaml

production.yaml

development.yaml

staging.yaml
```

---

# Assets Directory

```text
assets/
```

Contains:

- Images
- Icons
- Fonts
- Static Files
- Templates

---

# Public Directory

```text
public/
```

Contains publicly accessible assets.

Examples:

- Static Images
- JavaScript Bundles
- CSS
- Downloads

---

# Scripts Directory

```text
scripts/
```

Contains automation scripts.

Examples:

- Build Scripts
- Deployment Scripts
- Migration Scripts
- Maintenance Scripts

Scripts shall be idempotent whenever possible.

---

# Examples Directory

```text
examples/
```

Contains:

- SDK Examples
- Sample Requests
- Tutorials
- Demonstrations

---

# Tools Directory

```text
tools/
```

Contains engineering utilities.

Examples:

- Code Generators
- CLI Utilities
- Internal Development Tools

---

# GitHub Directory

```text
.github/
```

Contains:

- GitHub Actions
- Issue Templates
- Pull Request Templates
- Workflows
- CODEOWNERS

---

# VS Code Directory

```text
.vscode/
```

Contains:

- Recommended Extensions
- Workspace Settings
- Launch Configurations
- Tasks

---

# Module Structure

Each module follows:

```text
module/

README.md

controllers/

services/

entities/

repositories/

dto/

validators/

events/

jobs/

tests/
```

All modules should follow the same internal layout.

---

# Documentation Placement

Documentation belongs in:

```text
docs/
```

Module-specific documentation may reside inside the module.

---

# Configuration Files

Common root files include:

```text
README.md

CHANGELOG.md

LICENSE

Dockerfile

docker-compose.yml

package.json

tsconfig.json

eslint.config.js

.prettierrc

.editorconfig

.gitignore
```

---

# Layer Dependencies

Allowed dependency flow:

```text
Presentation

↓

Application

↓

Domain

↓

Infrastructure
```

Reverse dependencies are prohibited.

---

# Directory Naming

Use:

```text
kebab-case
```

Examples:

```text
project-management

shared-components

authentication-service
```

---

# File Organization

Group files by feature rather than technical type where practical.

Prefer:

```text
modules/

projects/

tasks/

users/
```

Instead of:

```text
controllers/

services/

repositories/
```

at the project root.

---

# Scalability

Projects shall support:

- Modular Growth
- Feature Expansion
- Independent Testing
- Multiple Teams
- AI Code Generation

Structure should remain stable as projects evolve.

---

# Security

Never store:

- Secrets
- Passwords
- Tokens
- Certificates
- Credentials

inside the repository.

Use secure secret management solutions.

---

# Code Ownership

Every module shall have:

- Maintainer
- Documentation
- Tests
- Review Process

Ownership improves accountability.

---

# Best Practices

Engineering teams should:

- Follow the standard directory layout.
- Keep modules independent.
- Document every module.
- Minimize coupling.
- Organize by business capability.
- Separate concerns clearly.
- Maintain clean folder hierarchies.
- Archive obsolete modules responsibly.

---

# Anti-Patterns

Avoid:

- Deep directory nesting
- Circular dependencies
- Mixed responsibilities
- Duplicate modules
- Business logic in controllers
- Large shared folders
- Random utility dumping
- Root directory clutter
- Undocumented modules
- Inconsistent project layouts

---

# Compliance Checklist

Before creating a new repository verify:

- Standard directory layout followed
- Documentation included
- Source organized
- Tests organized
- Infrastructure isolated
- Configuration separated
- Naming standards followed
- Security requirements met
- Ownership defined
- README completed

---

# Governance

The Project Structure standard is governed by:

- Chief Technology Officer (CTO)
- Architecture Review Board (ARB)
- Engineering Leadership

Changes require formal review and approval.

---

# Related Documents

- README.md
- coding-principles.md
- clean-code.md
- naming-conventions.md
- documentation-standards.md
- backend-development.md
- frontend-development.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Project Structure documentation. |