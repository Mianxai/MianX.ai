---
title: Repository Structure
description: Defines the enterprise repository structure, directory organization, naming conventions, module organization, scalability principles, and governance standards for all repositories within the MIANX-AI platform.
category: Engineering
parent: 06-engineering/version-control
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Platform Engineering
reviewers:
  - Architecture Review Board (ARB)
  - Engineering Managers
version: 1.0.0
last_updated: 2026-07-08
tags:
  - repository
  - structure
  - engineering
  - standards
---

# Repository Structure

---

# Purpose

This document defines the official Repository Structure Standards for the MIANX-AI platform.

A consistent repository structure improves maintainability, discoverability, onboarding, scalability, automation, and long-term sustainability. Every repository shall follow a predictable layout regardless of the technology stack or engineering team.

---

# Objectives

The Repository Structure standards aim to:

- Standardize repository organization
- Improve maintainability
- Improve discoverability
- Simplify onboarding
- Reduce development friction
- Support automation
- Improve scalability
- Enable reusable tooling
- Improve documentation
- Maintain engineering consistency

---

# Scope

These standards apply to:

- Backend Services
- Frontend Applications
- Mobile Applications
- APIs
- Microservices
- Shared Libraries
- AI Projects
- Infrastructure
- Documentation Repositories
- Internal Tools

---

# Structure Principles

Every repository shall be:

- Modular
- Predictable
- Consistent
- Scalable
- Maintainable
- Documented
- Version Controlled
- Secure
- Easy to Navigate
- Automation Friendly

---

# Repository Layout

Typical repository structure:

```text
repository/

├── src/
├── docs/
├── tests/
├── config/
├── scripts/
├── infrastructure/
├── assets/
├── examples/
├── .github/
├── .vscode/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── CONTRIBUTING.md
├── CODEOWNERS
├── SECURITY.md
├── package.json
├── tsconfig.json
├── .gitignore
└── .editorconfig
```

Project-specific directories may be added when necessary.

---

# Root Directory

The root directory should contain only:

- Configuration
- Documentation
- Build files
- Project metadata

Business logic shall not be placed directly in the root.

---

# Source Code

Application code shall reside inside:

```text
src/
```

Source code shall never be mixed with configuration or documentation.

---

# Source Organization

Large applications should organize source code by feature.

Example:

```text
src/

├── modules/
├── shared/
├── core/
├── infrastructure/
├── application/
├── domain/
└── presentation/
```

---

# Feature Organization

Each feature should remain self-contained.

Example:

```text
modules/

user/

authentication/

billing/

notifications/

projects/
```

Each feature may contain:

```text
controllers/

services/

repositories/

entities/

dto/

validators/

tests/
```

---

# Shared Components

Reusable components belong in:

```text
src/shared/
```

Shared code should be framework-independent whenever practical.

---

# Core Components

Core platform functionality belongs in:

```text
src/core/
```

Examples:

- Configuration
- Logging
- Authentication
- Dependency Injection
- Middleware
- Common Utilities

---

# Configuration

Configuration files belong in:

```text
config/
```

Configuration should never be hardcoded.

---

# Environment Files

Environment variables:

```text
.env.example
```

Production secrets shall never exist inside the repository.

---

# Documentation

All documentation belongs in:

```text
docs/
```

Documentation should follow enterprise documentation standards.

---

# Testing

Tests belong in:

```text
tests/
```

or feature-specific test directories.

Example:

```text
tests/

unit/

integration/

e2e/

performance/
```

---

# Infrastructure

Infrastructure resources belong in:

```text
infrastructure/
```

Examples:

- Terraform
- Kubernetes
- Docker
- Helm
- Networking

---

# Scripts

Automation belongs in:

```text
scripts/
```

Examples:

- Build
- Deployment
- Backup
- Migration
- Code Generation

---

# Assets

Static assets belong in:

```text
assets/
```

Examples:

- Images
- Logos
- Icons
- Fonts
- Templates

---

# Examples

Usage examples belong in:

```text
examples/
```

Examples improve onboarding and documentation.

---

# GitHub Configuration

GitHub configuration belongs in:

```text
.github/

workflows/

ISSUE_TEMPLATE/

PULL_REQUEST_TEMPLATE/

CODEOWNERS
```

---

# Build Output

Generated files belong in:

```text
dist/

build/

coverage/
```

Generated artifacts shall never be committed unless explicitly required.

---

# Temporary Files

Temporary files belong outside the repository or shall be ignored using:

```text
.gitignore
```

---

# Naming Standards

Directory names shall:

- Use lowercase
- Use hyphens where appropriate
- Be descriptive
- Avoid abbreviations

Example:

```text
customer-management

payment-service

notification-engine
```

Avoid:

```text
NewFolder

ABC

Stuff

Temp
```

---

# File Organization

Files shall be grouped logically.

Avoid directories containing unrelated files.

---

# Module Independence

Each module should:

- Minimize dependencies
- Expose clear interfaces
- Avoid circular dependencies
- Be independently testable

---

# Monorepo Structure

Monorepos should separate projects clearly.

Example:

```text
apps/

packages/

services/

libs/

tools/

docs/

infrastructure/
```

---

# Polyrepo Structure

Each repository should remain focused on a single business capability.

Avoid unrelated systems within the same repository.

---

# Documentation Hierarchy

Documentation hierarchy:

```text
README

↓

Architecture

↓

Development

↓

Deployment

↓

Operations

↓

Troubleshooting
```

---

# Dependency Organization

External dependencies shall be managed centrally.

Dependency versions shall be pinned.

---

# Security Files

Security documentation includes:

```text
SECURITY.md

security/

policies/
```

---

# Templates

Shared templates belong in:

```text
templates/
```

Examples:

- Project Templates
- Document Templates
- Code Templates

---

# Generated Code

Generated code shall be isolated.

Example:

```text
generated/
```

Generated files should not be manually edited.

---

# AI Assets

AI-related repositories may include:

```text
models/

prompts/

datasets/

evaluations/
```

---

# Migration Files

Database migrations belong in:

```text
migrations/
```

Migration history shall remain immutable.

---

# Scalability

Repository structures shall support:

- Modular growth
- Multiple teams
- Automation
- Continuous Integration
- Continuous Delivery
- Large codebases

---

# Repository Evolution

Structural changes shall:

- Be documented
- Be reviewed
- Preserve backward compatibility where practical
- Minimize disruption

---

# Best Practices

Engineering teams should:

- Keep repositories clean.
- Group related files.
- Follow naming conventions.
- Avoid deep directory nesting.
- Separate generated code.
- Keep documentation current.
- Maintain modular boundaries.
- Review repository organization regularly.

---

# Anti-Patterns

Avoid:

- Flat repositories
- Random folder names
- Mixed responsibilities
- Deep nesting
- Duplicate modules
- Large miscellaneous folders
- Hardcoded configuration
- Generated files mixed with source
- Business logic in the root directory
- Unorganized documentation

---

# Compliance Checklist

Before approving a repository verify:

- Standard directory layout used
- Naming conventions followed
- Documentation complete
- Configuration separated
- Tests organized
- Infrastructure isolated
- Assets organized
- Generated files separated
- Build artifacts ignored
- Repository reviewed

---

# Governance

Repository Structure Standards are governed by:

- Chief Technology Officer (CTO)
- Platform Engineering
- Architecture Review Board (ARB)
- Engineering Managers

Compliance shall be enforced through repository templates, architecture reviews, pull request reviews, engineering audits, automated validation tools, and periodic repository health assessments.

---

# Related Documents

- README.md
- git-standards.md
- repository-standards.md
- branching-strategy.md
- documentation-standards.md
- project-structure.md
- engineering-principles.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Repository Structure documentation. |