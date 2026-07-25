---
title: Development Environment
description: Defines the enterprise Development Environment standards, local setup, tooling, IDE configuration, containerized development, environment management, debugging, onboarding, and governance for all MIANX-AI engineering projects.
category: Engineering
parent: 06-engineering/development
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Platform Engineering
reviewers:
  - Engineering Managers
  - DevOps Team
version: 1.0.0
last_updated: 2026-07-08
tags:
  - development
  - environment
  - engineering
  - devops
---

# Development Environment

---

# Purpose

This document defines the official Development Environment standards for the MIANX-AI platform.

A standardized development environment ensures every engineer and AI workforce agent develops software using the same tools, configurations, dependencies, workflows, and runtime environments. This minimizes environment-related issues, improves onboarding, increases productivity, and ensures consistent software quality across all projects.

---

# Objectives

The Development Environment standards aim to:

- Standardize local development
- Reduce environment inconsistencies
- Improve developer productivity
- Simplify onboarding
- Enable reproducible builds
- Support AI-assisted development
- Improve debugging
- Reduce deployment issues
- Improve security
- Maintain engineering consistency

---

# Scope

These standards apply to:

- Backend Development
- Frontend Development
- Mobile Development
- AI Engineering
- DevOps
- Infrastructure
- Shared Libraries
- Internal Tools
- Documentation
- Platform Services

---

# Development Environment Principles

Every development environment shall be:

- Reproducible
- Consistent
- Secure
- Automated
- Isolated
- Documented
- Version Controlled
- Easy to Provision
- Easy to Maintain
- Production Aligned

---

# Environment Types

MIANX-AI defines the following environments:

```text
Local Development

↓

Shared Development

↓

Testing

↓

Staging

↓

Production
```

Each environment has a specific purpose and configuration.

---

# Local Development Environment

The Local Development Environment is used for:

- Feature Development
- Bug Fixes
- Debugging
- Unit Testing
- Integration Testing
- Documentation

Developers should perform all implementation work locally before submitting changes.

---

# Supported Operating Systems

Officially supported operating systems:

- Windows 11
- Ubuntu LTS
- macOS

Other operating systems require approval from Platform Engineering.

---

# Hardware Recommendations

Minimum:

- Quad-Core CPU
- 16 GB RAM
- 512 GB SSD
- Stable Internet Connection

Recommended:

- 8-Core CPU or higher
- 32 GB RAM
- 1 TB NVMe SSD
- Dual Monitors
- Hardware Virtualization Enabled

---

# Required Development Tools

All engineers should install:

- Git
- Docker
- Docker Compose
- Node.js (LTS)
- PNPM
- Python
- PostgreSQL Client
- Redis Client
- OpenSSL
- Make (or equivalent)
- Curl
- jq

Versions shall be documented and centrally managed.

---

# Integrated Development Environment (IDE)

Approved IDEs:

- Visual Studio Code
- JetBrains IDEs (IntelliJ IDEA, WebStorm, PyCharm)

Visual Studio Code is the recommended IDE for all MIANX-AI projects.

---

# Required IDE Extensions

Recommended Visual Studio Code extensions:

- ESLint
- Prettier
- Docker
- GitLens
- EditorConfig
- Markdown All in One
- Error Lens
- YAML
- REST Client
- Thunder Client
- Prisma
- GitHub Pull Requests

Extension versions should remain current.

---

# Workspace Configuration

Each repository should provide:

```text
.vscode/

settings.json

extensions.json

launch.json

tasks.json
```

Workspace settings should be committed when beneficial to all contributors.

---

# Runtime Management

Use version managers to ensure consistent runtimes.

Recommended tools:

- Node Version Manager (NVM)
- pyenv
- Volta (optional)

Runtime versions shall match project configuration files.

---

# Dependency Management

Approved package managers:

| Ecosystem | Tool |
|------------|------|
| JavaScript / TypeScript | PNPM |
| Python | pip / Poetry |
| Infrastructure | Terraform |
| Containers | Docker |

Dependencies shall be locked using lock files.

---

# Environment Variables

Configuration shall use environment variables.

Environment files:

```text
.env.example

.env.local

.env.development

.env.test

.env.production
```

Only `.env.example` shall be committed.

Secrets must never be committed to source control.

---

# Secret Management

Sensitive values shall be stored in:

- Secret Managers
- Vault Solutions
- CI/CD Secrets
- Cloud Secret Services

Never hardcode:

- API Keys
- Passwords
- Tokens
- Certificates
- Private Keys

---

# Docker Development

Projects should support Docker-based development.

Typical services include:

- Application
- PostgreSQL
- Redis
- MinIO
- Mail Server
- Message Queue

Docker Compose should simplify local setup.

---

# Development Containers

Repositories should support Dev Containers when practical.

Benefits include:

- Consistent tooling
- Reproducible environments
- Faster onboarding
- Reduced configuration issues

Configuration should reside in:

```text
.devcontainer/
```

---

# Local Services

Common local services:

- PostgreSQL
- Redis
- Object Storage
- Mail Testing Server
- Queue System
- Search Engine

Local services should mirror production behavior where practical.

---

# Database Setup

Local databases shall support:

- Automated initialization
- Seed data
- Test data
- Schema migrations
- Rollback testing

Database versions shall match production-supported versions.

---

# Development Data

Development environments should use:

- Synthetic data
- Sample datasets
- Seed scripts
- Mock services

Production data shall never be used without proper approval and sanitization.

---

# Build Process

Developers shall verify:

- Successful installation
- Successful compilation
- Successful linting
- Successful tests
- Successful local execution

before creating a Pull Request.

---

# Debugging

Approved debugging tools include:

- IDE Debuggers
- Browser Developer Tools
- Node Inspector
- Python Debugger
- Database Query Analyzers
- API Inspection Tools

Debug logs shall not expose sensitive information.

---

# Logging

Development logging should:

- Be verbose
- Support structured logs
- Include request identifiers
- Include timestamps
- Exclude secrets

---

# Local Testing

Before committing changes developers shall execute:

- Unit Tests
- Integration Tests
- Linting
- Formatting
- Static Analysis
- Security Checks (when applicable)

---

# AI Workforce Environment

AI engineering agents shall:

- Use isolated environments
- Follow the same dependency versions
- Respect repository configurations
- Generate reproducible outputs
- Never modify local secrets

---

# Environment Provisioning

Provisioning should be automated using:

- Setup Scripts
- Docker Compose
- Dev Containers
- Infrastructure as Code
- Package Managers

Manual configuration should be minimized.

---

# Environment Maintenance

Developers should regularly:

- Update dependencies
- Remove unused tools
- Refresh containers
- Rotate credentials
- Clean caches
- Update IDE extensions

---

# Onboarding

A new engineer should be able to:

1. Clone the repository.
2. Install required tools.
3. Configure environment variables.
4. Start local services.
5. Run the application.
6. Execute tests.
7. Begin development.

The complete onboarding process should take less than one hour.

---

# Security Requirements

Development environments shall:

- Encrypt disks where possible
- Use multi-factor authentication
- Store secrets securely
- Lock inactive sessions
- Use approved software only
- Keep systems updated

---

# Best Practices

Engineering teams should:

- Keep environments up to date.
- Use version managers.
- Automate setup.
- Commit only safe configuration files.
- Use containers where practical.
- Validate changes locally.
- Keep tooling consistent.
- Document environment changes.

---

# Anti-Patterns

Avoid:

- Hardcoded credentials
- Manual dependency installation guides
- Different runtime versions
- Untracked environment changes
- Committing `.env` files
- Using production credentials locally
- Skipping local validation
- Unmanaged IDE configurations
- Inconsistent tooling
- Outdated dependencies

---

# Compliance Checklist

Before beginning development verify:

- Required tools installed
- Correct runtime versions
- Dependencies installed
- Environment variables configured
- Local services running
- Database initialized
- Tests passing
- Build successful
- IDE configured
- Security requirements satisfied

---

# Governance

Development Environment standards are governed by:

- Chief Technology Officer (CTO)
- Platform Engineering
- Engineering Managers
- DevOps Team

Compliance shall be enforced through onboarding procedures, automated setup scripts, CI/CD validation, engineering audits, environment health checks, and periodic tooling reviews.

---

# Related Documents

- README.md
- development-process.md
- ../coding-standards/README.md
- ../version-control/README.md
- ../ci-cd-standards.md
- ../testing-standards.md
- ../security-architecture.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Development Environment documentation. |