---
title: Commit Message Standards
description: Defines the enterprise commit message standards, conventions, validation rules, automation integration, and governance for all Git repositories within the MIANX-AI platform.
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
  - git
  - commits
  - engineering
  - version-control
---

# Commit Message Standards

---

# Purpose

This document defines the official Commit Message Standards for the MIANX-AI platform.

Commit messages serve as the permanent historical record of engineering work. Every commit should clearly explain **what changed**, **why it changed**, and **how it impacts the system**.

Standardized commit messages improve collaboration, code reviews, debugging, release automation, auditing, and long-term maintainability.

---

# Objectives

The Commit Message Standards aim to:

- Standardize commit history
- Improve readability
- Support automated releases
- Enable changelog generation
- Improve traceability
- Simplify debugging
- Improve code reviews
- Support Semantic Versioning
- Enable CI/CD automation
- Improve engineering consistency

---

# Scope

These standards apply to:

- Source Code
- Documentation
- Infrastructure
- Configuration
- DevOps
- AI Models
- Database Migrations
- APIs
- Shared Libraries
- Internal Tools

---

# Guiding Principles

Every commit shall be:

- Clear
- Concise
- Descriptive
- Atomic
- Reviewable
- Traceable
- Reproducible
- Professional
- Action-oriented
- Consistent

---

# Commit Philosophy

A commit represents:

- One logical change
- One purpose
- One unit of work

Never combine unrelated changes into a single commit.

---

# Commit Format

MIANX-AI follows the **Conventional Commits** specification.

Standard format:

```text
<type>(<scope>): <short summary>
```

Example:

```text
feat(auth): add multi-factor authentication
```

---

# Commit Structure

Each commit consists of:

```text
Type

↓

Scope

↓

Summary

↓

(Optional Body)

↓

(Optional Footer)
```

---

# Commit Types

Approved commit types:

| Type | Purpose |
|-------|----------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| style | Formatting only |
| refactor | Code restructuring |
| perf | Performance improvement |
| test | Tests |
| build | Build system |
| ci | CI/CD |
| chore | Maintenance |
| revert | Revert previous commit |
| security | Security improvements |

---

# Feature Commit

Example:

```text
feat(auth): implement OAuth login
```

---

# Bug Fix Commit

Example:

```text
fix(api): resolve timeout during user login
```

---

# Documentation Commit

Example:

```text
docs(readme): update installation guide
```

---

# Refactor Commit

Example:

```text
refactor(cache): simplify cache manager
```

---

# Performance Commit

Example:

```text
perf(database): optimize user search queries
```

---

# Test Commit

Example:

```text
test(auth): add integration tests
```

---

# Build Commit

Example:

```text
build(docker): update production image
```

---

# CI/CD Commit

Example:

```text
ci(github-actions): add deployment workflow
```

---

# Chore Commit

Example:

```text
chore(deps): update dependencies
```

---

# Security Commit

Example:

```text
security(auth): strengthen password validation
```

---

# Revert Commit

Example:

```text
revert(auth): revert OAuth implementation
```

---

# Scope

The scope identifies the affected component.

Examples:

```text
auth

api

database

billing

organization

notifications

users

projects

security

docs
```

Use lowercase.

---

# Summary Rules

The summary shall:

- Start with a verb
- Describe the change
- Be concise
- Use present tense
- Avoid ending punctuation

Good:

```text
add password reset support

improve cache performance

remove unused dependency
```

Avoid:

```text
Fixed bug

Stuff

Update

Misc changes

Changes
```

---

# Commit Body

The body is optional but recommended for complex changes.

Explain:

- Why the change was made
- Important implementation details
- Design decisions
- Migration requirements

Example:

```text
Improve token validation to support
rotating signing keys and reduce
authentication latency.
```

---

# Footer

Optional footer may include:

```text
Closes #245

Refs #301

BREAKING CHANGE:
```

---

# Breaking Changes

Breaking changes shall include:

```text
BREAKING CHANGE:
```

Example:

```text
feat(api): redesign authentication API

BREAKING CHANGE:
JWT authentication has been replaced
with OAuth 2.1.
```

---

# Atomic Commits

Each commit should contain:

- One feature
- One bug fix
- One refactor
- One documentation update

Avoid large mixed commits.

---

# Commit Frequency

Developers should:

- Commit frequently
- Keep commits small
- Push completed work
- Avoid massive commits

---

# Language

Commit messages shall:

- Be written in English
- Use professional language
- Avoid abbreviations
- Avoid slang

---

# Formatting Rules

Use:

```text
Lowercase type

Lowercase scope

Colon

Single space

Summary
```

Correct:

```text
feat(api): add webhook support
```

Incorrect:

```text
Feature(API)-Webhook Added
```

---

# Length Guidelines

Summary:

- Maximum 72 characters recommended

Body:

- Wrap around 100 characters

---

# Commit Validation

Repositories should validate commits using:

- Commitlint
- Git Hooks
- CI/CD Validation

Invalid commit messages shall fail validation.

---

# Changelog Generation

Commit messages should support automated changelog generation.

Examples:

```text
feat

fix

docs

perf
```

These categories appear in release notes.

---

# Semantic Versioning Integration

Commit types influence versioning.

| Commit | Version Impact |
|----------|---------------|
| feat | Minor |
| fix | Patch |
| BREAKING CHANGE | Major |
| docs | None |
| style | None |
| chore | None |

---

# Automation

Commit messages shall support:

- Release automation
- Changelog generation
- Deployment pipelines
- Version calculation
- Notifications
- Audit reporting

---

# AI Workforce Rules

AI-generated commits:

- Must follow Conventional Commits
- Must pass validation
- Must be reviewed
- Must remain human-readable

AI shall never generate vague commit messages.

---

# Examples

## Feature

```text
feat(users): add profile picture upload
```

## Bug Fix

```text
fix(api): handle null organization IDs
```

## Documentation

```text
docs(version-control): update branching guide
```

## Refactor

```text
refactor(cache): simplify Redis abstraction
```

## Performance

```text
perf(search): improve indexing speed
```

## Security

```text
security(auth): enforce password complexity
```

## CI

```text
ci(actions): enable dependency scanning
```

---

# Best Practices

Engineering teams should:

- Keep commits small.
- Write meaningful summaries.
- Use approved commit types.
- Reference related issues.
- Explain complex changes.
- Commit frequently.
- Keep history clean.
- Review commit messages before pushing.

---

# Anti-Patterns

Avoid:

- update
- fixed
- changes
- misc
- work
- final
- temp
- test commit
- multiple unrelated changes
- meaningless summaries

---

# Compliance Checklist

Before committing verify:

- Correct commit type used
- Scope specified
- Summary meaningful
- English language used
- No spelling mistakes
- Atomic change
- Validation passed
- Related issue referenced
- Breaking changes documented
- Ready for review

---

# Governance

Commit Message Standards are governed by:

- Chief Technology Officer (CTO)
- Platform Engineering
- Architecture Review Board (ARB)
- Engineering Managers

Compliance shall be enforced through Git Hooks, Commitlint, CI/CD pipelines, pull request reviews, automated validation, and engineering audits.

---

# Related Documents

- README.md
- git-standards.md
- branching-strategy.md
- branch-protection.md
- pull-request-standards.md
- merge-strategy.md
- semantic-versioning.md
- release-management.md
- repository-standards.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Commit Message Standards documentation. |