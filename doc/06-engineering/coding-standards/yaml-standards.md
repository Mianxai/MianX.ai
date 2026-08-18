---
title: YAML Standards
description: Defines the enterprise YAML development standards, formatting conventions, configuration management, validation, security requirements, and governance for all YAML files used throughout the MIANX-AI platform.
category: Engineering
parent: 06-engineering/coding-standards
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Engineering Department
reviewers:
  - Architecture Review Board (ARB)
  - DevOps Team
  - Platform Engineering Team
version: 1.0.0
last_updated: 2026-07-08
tags:
  - yaml
  - configuration
  - standards
  - engineering
---

# YAML Standards

---

# Purpose

This document defines the official YAML standards for the MIANX-AI platform.

YAML is the primary configuration language used for infrastructure, Kubernetes, CI/CD pipelines, Docker Compose, GitHub Actions, cloud services, application configuration, automation, and deployment.

Consistent YAML standards improve readability, reliability, automation, security, and maintainability.

---

# Objectives

The YAML Standards aim to:

- Standardize YAML formatting
- Improve readability
- Reduce configuration errors
- Support Infrastructure as Code
- Improve automation
- Enhance security
- Simplify maintenance
- Enable configuration validation
- Improve collaboration
- Maintain enterprise consistency

---

# Scope

These standards apply to:

- Kubernetes
- Docker Compose
- Helm Charts
- GitHub Actions
- GitLab CI
- Azure Pipelines
- Terraform Variables
- Application Configuration
- Cloud Infrastructure
- DevOps Automation

---

# YAML Principles

All YAML files shall be:

- Readable
- Consistent
- Minimal
- Explicit
- Valid
- Secure
- Version Controlled
- Well Documented
- Easily Reviewable
- Production Ready

---

# File Naming

Use:

```text
kebab-case.yaml
```

or

```text
kebab-case.yml
```

Examples:

```text
docker-compose.yml

production-config.yaml

deployment.yaml

github-actions.yaml

helm-values.yaml
```

---

# Indentation

Use:

```text
2 Spaces
```

Never use tabs.

Correct:

```yaml
services:
  api:
    image: app
```

Incorrect:

```yaml
services:
	api:
```

---

# Character Encoding

All YAML files shall use:

- UTF-8
- Unix Line Endings (LF)

---

# Line Length

Recommended maximum:

```text
120 Characters
```

Long values should be wrapped when practical.

---

# Key Naming

Use:

```text
kebab-case
```

or project-defined conventions.

Examples:

```yaml
database-host:

api-version:

service-account:

max-connections:
```

Avoid inconsistent casing.

---

# Value Formatting

Use the appropriate data type.

Examples:

```yaml
enabled: true

port: 8080

timeout: 30

environment: production
```

Avoid quoting numbers or booleans unless required.

---

# Strings

Use plain strings when possible.

Example:

```yaml
environment: production
```

Use quotes only when necessary.

Example:

```yaml
password: "abc:123"
```

---

# Boolean Values

Always use:

```yaml
true

false
```

Avoid:

```yaml
yes

no

on

off
```

---

# Null Values

Preferred:

```yaml
value: null
```

Avoid empty values unless intentionally supported.

---

# Lists

Example:

```yaml
ports:
  - 80
  - 443
```

Maintain consistent indentation.

---

# Dictionaries

Example:

```yaml
database:
  host: localhost
  port: 5432
```

Nested mappings should remain shallow whenever possible.

---

# Comments

Use comments to explain:

- Business purpose
- Complex configuration
- Environment-specific behavior
- Operational considerations

Example:

```yaml
# Database connection timeout
timeout: 30
```

Avoid obvious comments.

---

# Document Separator

Multiple documents shall use:

```yaml
---
```

Terminate documents with:

```yaml
...
```

only when required.

---

# Anchors

Use anchors only when they improve readability.

Example:

```yaml
defaults: &defaults
  retries: 3

service:
  <<: *defaults
```

Avoid excessive nesting.

---

# Environment Variables

Example:

```yaml
database:
  host: ${DATABASE_HOST}
```

Never hardcode secrets.

---

# Configuration Organization

Group related configuration.

Example:

```yaml
database:

server:

security:

logging:

cache:

storage:
```

---

# Kubernetes Standards

Every manifest shall include:

```yaml
apiVersion

kind

metadata

spec
```

Metadata shall include:

```yaml
name

namespace

labels

annotations
```

---

# Labels

Use consistent labels.

Example:

```yaml
labels:
  app: authentication
  team: engineering
  environment: production
```

---

# Docker Compose Standards

Compose files should define:

- Services
- Networks
- Volumes
- Health Checks
- Restart Policies

Avoid unnecessary duplication.

---

# GitHub Actions Standards

Workflow files shall include:

- Name
- Triggers
- Jobs
- Permissions
- Secrets
- Caching

Jobs should remain modular.

---

# Helm Standards

Separate:

- values.yaml
- templates
- charts

Values should remain environment independent whenever possible.

---

# Application Configuration

Separate configuration by environment.

Example:

```text
development.yaml

testing.yaml

staging.yaml

production.yaml
```

---

# Secret Management

Never commit:

- Passwords
- Tokens
- Certificates
- Private Keys
- API Keys
- Cloud Credentials

Use:

- Secret Managers
- Vault
- Kubernetes Secrets
- GitHub Secrets

---

# Validation

Every YAML file shall be validated before deployment.

Approved tools include:

- yamllint
- kubeval
- kubeconform
- Helm validation
- CI validation pipelines

---

# Linting

YAML linting shall run automatically during CI.

Linting failures block deployment.

---

# Formatting

Formatting shall remain consistent.

Do not mix:

- Tabs
- Spaces
- Different indentation styles

---

# Version Control

Configuration files shall:

- Be version controlled
- Support peer review
- Be traceable
- Support rollback

---

# Documentation

Every complex configuration should document:

- Purpose
- Required fields
- Optional fields
- Defaults
- Examples

---

# Performance

Configuration should:

- Avoid duplication
- Remain modular
- Support reuse
- Minimize unnecessary complexity

---

# Security

YAML configurations shall:

- Follow least privilege
- Separate secrets
- Use encrypted storage
- Validate inputs
- Restrict permissions
- Support auditing

---

# AI-Generated YAML

AI-generated YAML shall:

- Pass validation
- Pass linting
- Follow formatting standards
- Avoid hardcoded secrets
- Follow enterprise naming conventions
- Be reviewed before production deployment

---

# Best Practices

Engineering teams should:

- Use two-space indentation.
- Validate every YAML file.
- Separate environments.
- Document complex settings.
- Keep files modular.
- Remove duplicate configuration.
- Use secret management.
- Review configuration changes carefully.

---

# Anti-Patterns

Avoid:

- Tabs
- Hardcoded secrets
- Mixed indentation
- Deep nesting
- Duplicate configuration
- Excessive anchors
- Large monolithic YAML files
- Inconsistent naming
- Missing validation
- Unreviewed configuration changes

---

# Compliance Checklist

Before merging YAML changes verify:

- YAML validates successfully
- Linting passes
- Secrets removed
- Formatting consistent
- Naming standards followed
- Documentation updated
- Security reviewed
- Environment separation maintained
- Peer review completed
- Deployment tested

---

# Governance

YAML Standards are governed by:

- Chief Technology Officer (CTO)
- Platform Engineering
- DevOps Team
- Architecture Review Board (ARB)

Compliance shall be enforced through automated validation, linting, code review, and CI/CD pipelines.

---

# Related Documents

- README.md
- project-structure.md
- naming-conventions.md
- docker-standards.md
- kubernetes-standards.md
- ci-cd-standards.md
- infrastructure-standards.md
- secure-coding.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial YAML Standards documentation. |