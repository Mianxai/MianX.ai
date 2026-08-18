---
title: Tagging Standards
description: Defines the enterprise Git Tagging Standards, tag naming conventions, release tagging, signed tags, lifecycle management, automation, and governance for all MIANX-AI repositories.
category: Engineering
parent: 06-engineering/version-control
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Platform Engineering
reviewers:
  - Architecture Review Board (ARB)
  - Engineering Managers
  - DevOps Team
version: 1.0.0
last_updated: 2026-07-08
tags:
  - git
  - tagging
  - release
  - version-control
---

# Tagging Standards

---

# Purpose

This document defines the official Git Tagging Standards for the MIANX-AI platform.

Git tags represent immutable milestones in the software lifecycle. They identify releases, deployment points, important milestones, and historical snapshots that can be reliably referenced, deployed, audited, and restored.

A consistent tagging strategy improves release traceability, deployment automation, rollback capabilities, dependency management, and software governance.

---

# Objectives

Git Tagging aims to:

- Standardize release identification
- Improve deployment traceability
- Support release automation
- Enable reliable rollbacks
- Improve auditing
- Simplify version management
- Support CI/CD
- Improve dependency tracking
- Maintain immutable release history
- Improve repository governance

---

# Scope

These standards apply to:

- Backend Services
- Frontend Applications
- Mobile Applications
- APIs
- AI Models
- Infrastructure
- Shared Libraries
- Internal Tools
- Documentation Releases
- DevOps Projects

---

# Tagging Principles

Every Git tag shall be:

- Immutable
- Unique
- Descriptive
- Traceable
- Versioned
- Auditable
- Reproducible
- Signed (for production)
- Automated where possible
- Linked to a release

---

# What is a Git Tag?

A Git tag marks a specific commit as an important milestone.

Typical examples include:

- Production Releases
- Release Candidates
- Alpha Releases
- Beta Releases
- Hotfix Releases
- Major Milestones

---

# Tag Types

Git supports:

- Lightweight Tags
- Annotated Tags

MIANX-AI production repositories shall primarily use **Annotated Tags**.

---

# Lightweight Tags

Purpose:

- Temporary references
- Internal testing
- Personal development
- Local experiments

Characteristics:

- Minimal metadata
- No message
- No signature

Example:

```bash
git tag v1.0.0
```

---

# Annotated Tags

Purpose:

- Production releases
- Official milestones
- Long-term history
- CI/CD deployments

Characteristics:

- Author
- Date
- Message
- Metadata
- Optional signature

Example:

```bash
git tag -a v1.0.0 -m "Initial Production Release"
```

---

# Signed Tags

Production releases should use signed tags.

Benefits:

- Authenticity
- Integrity
- Trust
- Security
- Verification

Example:

```bash
git tag -s v2.0.0
```

---

# Tag Naming Convention

Official format:

```text
vMAJOR.MINOR.PATCH
```

Examples:

```text
v1.0.0

v1.2.4

v5.8.1
```

---

# Pre-release Tags

Pre-release tags follow Semantic Versioning.

Formats:

```text
v2.0.0-alpha.1

v2.0.0-beta.2

v2.0.0-rc.1
```

---

# Alpha Tags

Purpose:

- Internal testing
- Experimental functionality
- Incomplete features

Example:

```text
v3.0.0-alpha.2
```

---

# Beta Tags

Purpose:

- Feature complete
- Wider testing
- Early adopters

Example:

```text
v3.0.0-beta.1
```

---

# Release Candidate Tags

Purpose:

- Final validation
- Production readiness
- Final QA

Example:

```text
v3.0.0-rc.3
```

---

# Stable Release Tags

Stable releases contain no suffix.

Example:

```text
v3.0.0
```

---

# Hotfix Tags

Hotfix releases increment the PATCH version.

Example:

```text
v2.4.6
```

---

# Build Metadata

Optional build metadata:

```text
v2.4.0+20260708

v2.4.0+build245
```

Build metadata shall not affect version precedence.

---

# Tag Lifecycle

Standard lifecycle:

```text
Development

↓

Release Candidate

↓

Approval

↓

Production Release

↓

Tag Creation

↓

Deployment

↓

Monitoring

↓

Archive
```

---

# Tag Creation Rules

Tags shall only be created after:

- CI successful
- Tests passed
- Security validation completed
- Documentation updated
- Release approved

---

# Tag Ownership

Production tags may only be created by:

- Release Engineers
- DevOps Team
- Platform Engineering
- Authorized CI/CD Pipelines

---

# Protected Tags

Production repositories should protect:

```text
v*
```

Protected tags shall not be:

- Deleted
- Modified
- Reused
- Overwritten

---

# Tag Immutability

Released tags are immutable.

Never:

- Move tags
- Reassign tags
- Reuse version numbers

If a release fails, create a new version.

---

# Release Notes

Every production tag shall include:

- Version
- Summary
- Features
- Fixes
- Breaking Changes
- Known Issues
- Upgrade Instructions

---

# CI/CD Integration

Git tags trigger automated workflows including:

- Build
- Test
- Package
- Publish
- Deploy
- Notify
- Archive

---

# Deployment Strategy

Production deployments shall originate from official release tags.

Never deploy directly from development branches.

---

# Rollback Strategy

Rollback shall reference the previous stable tag.

Example:

```text
Current

↓

v2.5.0

↓

Rollback

↓

v2.4.8
```

---

# Tag Validation

Before publishing verify:

- Valid Semantic Version
- Unique tag
- Annotated tag
- Correct commit
- Release approved
- Documentation complete

---

# Repository Auditing

Repositories shall periodically verify:

- Tag consistency
- Missing releases
- Duplicate versions
- Unsigned tags
- Invalid naming
- Missing release notes

---

# AI Workforce Rules

AI-generated releases:

- Shall not create production tags independently
- Must use approved version numbers
- Must pass CI/CD validation
- Require human approval before tagging

---

# Metrics

Engineering leadership should monitor:

- Release Frequency
- Tag Creation Rate
- Deployment Success
- Rollback Frequency
- Failed Releases
- Version Adoption
- Tag Validation Failures
- CI/CD Success Rate

---

# Best Practices

Engineering teams should:

- Use annotated tags for releases.
- Protect production tags.
- Follow Semantic Versioning.
- Sign production tags.
- Never reuse version numbers.
- Automate tag creation.
- Keep release notes complete.
- Verify tags before deployment.

---

# Anti-Patterns

Avoid:

- Lightweight tags for production
- Duplicate version numbers
- Moving existing tags
- Unsigned production tags
- Manual deployment without tags
- Missing release notes
- Invalid naming conventions
- Deleting release tags
- Deploying from branches
- Skipping approvals

---

# Compliance Checklist

Before publishing a tag verify:

- Semantic Version validated
- Annotated tag created
- Tag signed (production)
- CI/CD successful
- Tests passed
- Release approved
- Documentation completed
- Release notes published
- Deployment ready
- Repository updated

---

# Governance

Git Tagging Standards are governed by:

- Chief Technology Officer (CTO)
- Platform Engineering
- Architecture Review Board (ARB)
- Engineering Managers
- DevOps Team

Compliance shall be enforced through Git policies, protected tags, CI/CD automation, release approval workflows, repository audits, and engineering governance reviews.

---

# Related Documents

- README.md
- semantic-versioning.md
- release-management.md
- merge-strategy.md
- branching-strategy.md
- branch-protection.md
- commit-message-standards.md
- pull-request-standards.md
- repository-standards.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Git Tagging Standards documentation. |