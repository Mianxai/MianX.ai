---
title: Git Standards
description: Defines the enterprise Git standards, repository management policies, branching strategies, commit conventions, collaboration workflows, security requirements, and governance for all source code repositories within the MIANX-AI platform.
category: Engineering
parent: 06-engineering/coding-standards
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Engineering Department
reviewers:
  - Architecture Review Board (ARB)
  - Engineering Managers
  - DevOps Team
version: 1.0.0
last_updated: 2026-07-08
tags:
  - git
  - github
  - version-control
  - engineering
---

# Git Standards

---

# Purpose

This document defines the official Git standards for the MIANX-AI platform.

Git is the foundation of software development, collaboration, change management, release management, and traceability. Every repository within MIANX-AI shall follow these standards to ensure consistency, maintainability, security, and efficient collaboration across engineering teams and AI workforce agents.

---

# Objectives

The Git Standards aim to:

- Standardize version control
- Improve collaboration
- Maintain code quality
- Preserve project history
- Simplify releases
- Support AI-assisted development
- Reduce merge conflicts
- Improve traceability
- Enhance repository security
- Ensure long-term maintainability

---

# Scope

These standards apply to:

- Source Code Repositories
- Documentation Repositories
- Infrastructure Repositories
- DevOps Repositories
- AI Models
- Configuration Repositories
- Internal Libraries
- Shared Packages
- SDKs
- Automation Projects

---

# Git Principles

Every repository shall be:

- Secure
- Version Controlled
- Well Organized
- Traceable
- Reviewable
- Automated
- Recoverable
- Documented
- Protected
- Production Ready

---

# Repository Naming

Repository names shall use:

```text
kebab-case
```

Examples:

```text
mianx-platform

authentication-service

project-management

notification-engine

customer-portal

shared-components
```

Avoid:

```text
AuthenticationService

ProjectManagement

Repo1

TestRepo
```

---

# Default Branch

Every repository shall use:

```text
main
```

as the default branch.

Legacy branches such as:

```text
master
```

shall not be used for new repositories.

---

# Branch Strategy

Approved branches include:

```text
main

develop

feature/*

bugfix/*

hotfix/*

release/*
```

---

# Branch Naming

Feature branches:

```text
feature/user-authentication
```

Bug fixes:

```text
bugfix/login-timeout
```

Hotfixes:

```text
hotfix/security-patch
```

Releases:

```text
release/v2.5.0
```

---

# Feature Workflow

Feature development process:

1. Create feature branch
2. Implement feature
3. Write tests
4. Update documentation
5. Open Pull Request
6. Code Review
7. Merge into develop

---

# Bug Fix Workflow

Bug fixes shall:

1. Create bugfix branch
2. Fix issue
3. Add regression tests
4. Review
5. Merge

---

# Hotfix Workflow

Critical production issues shall:

1. Branch from main
2. Apply minimal fix
3. Test immediately
4. Review
5. Merge into main
6. Merge back into develop

---

# Release Workflow

Release branches shall:

- Freeze feature development
- Allow stabilization
- Support final testing
- Prepare release notes
- Receive approval before merging

---

# Commit Philosophy

Every commit should:

- Represent one logical change
- Be understandable
- Be reversible
- Build successfully
- Pass tests

Avoid mixing unrelated changes.

---

# Commit Message Standard

Use Conventional Commits.

Structure:

```text
type(scope): description
```

Example:

```text
feat(auth): add OAuth authentication

fix(api): resolve timeout issue

docs(engineering): update Git standards

refactor(database): simplify query builder
```

---

# Approved Commit Types

- feat
- fix
- docs
- refactor
- style
- perf
- test
- build
- ci
- chore
- revert

---

# Commit Rules

Commit messages shall:

- Use present tense
- Be concise
- Describe intent
- Remain under 72 characters for the summary
- Include additional context in the body when necessary

---

# Atomic Commits

Every commit should contain one logical change.

Avoid:

- Large mixed commits
- Multiple unrelated fixes
- Formatting mixed with feature work

---

# Pull Requests

Every Pull Request shall include:

- Purpose
- Summary
- Related Issue
- Testing Results
- Screenshots (if applicable)
- Documentation Updates
- Checklist Completion

---

# Pull Request Reviews

Every Pull Request requires:

- Automated CI success
- At least one reviewer
- Approval before merge
- No unresolved comments

Critical repositories may require multiple approvals.

---

# Merge Strategy

Preferred merge method:

```text
Squash and Merge
```

Alternative methods may be approved for specific repositories.

Avoid unnecessary merge commits.

---

# Protected Branches

The following branches shall be protected:

- main
- develop
- release/*

Protection rules:

- No force pushes
- Required reviews
- Passing CI
- Signed commits (recommended)

---

# Git Tags

Release tags shall follow Semantic Versioning.

Examples:

```text
v1.0.0

v2.3.1

v3.0.0-beta
```

Tags shall be immutable.

---

# Semantic Versioning

Use:

```text
MAJOR.MINOR.PATCH
```

Examples:

```text
1.0.0

1.4.0

2.1.5
```

---

# Repository Structure

Every repository should include:

```text
README.md

LICENSE

CHANGELOG.md

CONTRIBUTING.md

CODE_OF_CONDUCT.md

.gitignore

docs/

src/

tests/
```

---

# Git Ignore

Every repository shall maintain a properly configured:

```text
.gitignore
```

Generated files, secrets, logs, and build artifacts shall not be committed.

---

# Git LFS

Git Large File Storage (Git LFS) should be used for:

- Models
- Large datasets
- Binary assets
- Media files

Avoid committing large binaries directly into Git history.

---

# Code Ownership

Critical repositories should include:

```text
CODEOWNERS
```

This defines required reviewers for protected areas.

---

# Secrets

Never commit:

- API Keys
- Passwords
- Tokens
- Certificates
- Private Keys
- Database Credentials

Use approved secret management solutions.

---

# Signed Commits

Signed commits are recommended for:

- Production repositories
- Security-sensitive repositories
- Release branches

---

# CI/CD Integration

Every Pull Request shall trigger:

- Build
- Linting
- Unit Tests
- Security Scans
- Code Quality Checks

Failed pipelines block merging.

---

# Conflict Resolution

Merge conflicts shall:

- Be resolved locally
- Preserve intended functionality
- Undergo testing
- Receive review if substantial

---

# Reverting Changes

Use:

```text
git revert
```

instead of rewriting shared history whenever possible.

Avoid force pushing to shared branches.

---

# Force Push Policy

Force pushes are prohibited on:

- main
- develop
- release/*

Allowed only on personal feature branches when necessary.

---

# Backup & Recovery

Repositories shall:

- Be hosted on approved platforms
- Maintain remote backups
- Support disaster recovery
- Preserve commit history

---

# Documentation

Every repository shall maintain:

- README
- CHANGELOG
- CONTRIBUTING Guide
- Architecture Documentation
- API Documentation (if applicable)

Documentation shall be updated with relevant code changes.

---

# AI-Generated Commits

AI-generated changes shall:

- Follow commit conventions
- Pass CI
- Include documentation updates
- Undergo human review
- Meet security requirements

AI shall never bypass review policies.

---

# Best Practices

Engineering teams should:

- Commit frequently.
- Keep commits atomic.
- Write meaningful commit messages.
- Rebase feature branches regularly.
- Review Pull Requests carefully.
- Protect production branches.
- Update documentation with code changes.
- Tag production releases.

---

# Anti-Patterns

Avoid:

- Force pushing shared branches
- Large commits
- Vague commit messages
- Direct commits to main
- Skipping code reviews
- Ignoring CI failures
- Committing secrets
- Mixing formatting with features
- Unreviewed hotfixes
- Deleting release tags

---

# Compliance Checklist

Before merging verify:

- Branch naming correct
- Commit messages follow standards
- CI passes
- Tests pass
- Documentation updated
- Security review completed
- Pull Request approved
- No merge conflicts
- Release notes updated (if required)
- Repository remains buildable

---

# Governance

Git Standards are governed by:

- Chief Technology Officer (CTO)
- Engineering Leadership
- DevOps Team
- Architecture Review Board (ARB)

Compliance shall be enforced through repository protection rules, automated CI/CD pipelines, code reviews, security scanning, and periodic engineering audits.

---

# Related Documents

- README.md
- coding-principles.md
- project-structure.md
- markdown-standards.md
- code-review-standards.md
- ci-cd-standards.md
- secure-coding.md
- software-development-lifecycle.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Git Standards documentation. |