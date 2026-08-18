---
title: Git Standards
description: Defines the enterprise Git standards, workflows, repository operations, commit management, history management, collaboration practices, and governance for all MIANX-AI software projects.
category: Engineering
parent: 06-engineering/version-control
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Platform Engineering
reviewers:
  - Engineering Managers
  - Architecture Review Board (ARB)
version: 1.0.0
last_updated: 2026-07-08
tags:
  - git
  - version-control
  - engineering
  - github
---

# Git Standards

---

# Purpose

This document defines the official Git Standards for the MIANX-AI platform.

Git is the official distributed version control system used to manage all software, documentation, infrastructure, AI models, automation, and configuration assets.

These standards establish a consistent Git workflow to improve collaboration, traceability, security, and maintainability across all engineering teams and AI workforce agents.

---

# Objectives

The Git Standards aim to:

- Standardize Git usage
- Protect source code
- Improve collaboration
- Maintain complete history
- Enable reliable releases
- Reduce merge conflicts
- Improve code quality
- Support CI/CD automation
- Improve auditability
- Preserve repository integrity

---

# Scope

These standards apply to:

- Source Code
- Documentation
- Infrastructure as Code
- Database Migrations
- DevOps Pipelines
- Configuration Files
- Automation Scripts
- AI Prompts
- Machine Learning Assets
- Internal Libraries

---

# Git Principles

Every Git workflow shall be:

- Traceable
- Reproducible
- Secure
- Collaborative
- Automated
- Reviewable
- Consistent
- Auditable
- Recoverable
- Versioned

---

# Git Workflow

The standard workflow is:

```text
Clone Repository
        ↓
Create Feature Branch
        ↓
Develop
        ↓
Commit
        ↓
Push
        ↓
Pull Request
        ↓
Code Review
        ↓
Merge
        ↓
Deployment
```

---

# Repository Cloning

Repositories shall be cloned using official repository URLs.

Example:

```bash
git clone https://github.com/mianx-ai/platform.git
```

Developers shall not clone from personal forks unless explicitly required.

---

# Git Configuration

Each developer shall configure Git before contributing.

Required configuration:

```bash
git config --global user.name "Full Name"

git config --global user.email "name@company.com"
```

Recommended configuration:

```bash
git config --global pull.rebase true

git config --global fetch.prune true

git config --global init.defaultBranch main
```

---

# Default Branch

The official default branch is:

```text
main
```

Direct commits to **main** are prohibited.

---

# Branch Creation

New branches shall always be created from the latest **main**.

Example:

```bash
git checkout main

git pull

git checkout -b feature/user-authentication
```

---

# Branch Naming

Approved prefixes:

```text
feature/

bugfix/

hotfix/

release/

refactor/

test/

docs/

security/

infra/

experiment/
```

Examples:

```text
feature/payment-system

bugfix/login-error

docs/api-reference

security/oauth-update
```

---

# Commit Frequency

Developers should commit:

- Frequently
- Logically
- Atomically

Each commit should represent a single logical change.

---

# Commit Messages

Commits shall follow Conventional Commits.

Examples:

```text
feat(auth): add MFA support

fix(api): resolve timeout issue

docs(readme): update setup guide

refactor(user): simplify validation

test(auth): add login tests
```

---

# Atomic Commits

Each commit shall:

- Address one purpose
- Be independently reviewable
- Be reversible
- Build successfully

Avoid combining unrelated changes.

---

# Staging

Review staged files before committing.

Example:

```bash
git status

git diff --staged
```

---

# Pulling Changes

Preferred method:

```bash
git pull --rebase
```

Rebasing keeps commit history clean.

---

# Rebasing

Use rebase when synchronizing feature branches.

Example:

```bash
git fetch origin

git rebase origin/main
```

Avoid rebasing shared branches.

---

# Merge Strategy

Preferred merge methods:

- Squash Merge
- Rebase Merge

Merge commits shall only be used when appropriate.

---

# Cherry Picking

Cherry-pick only when necessary.

Example:

```bash
git cherry-pick <commit-hash>
```

Cherry-picking production fixes shall be documented.

---

# Stashing

Temporary work may be stored using:

```bash
git stash

git stash pop
```

Long-term work shall not remain in stash.

---

# Conflict Resolution

Developers shall:

- Understand conflicting code
- Resolve manually
- Retest affected components
- Avoid automatic conflict resolution

Every conflict resolution requires verification.

---

# Large Files

Git shall not store:

- Videos
- Database Backups
- Build Outputs
- Temporary Files
- Binary Artifacts

Use Git LFS where appropriate.

---

# .gitignore

Every repository shall maintain an appropriate `.gitignore`.

Ignored items include:

- Dependencies
- Build Outputs
- Cache Files
- Temporary Files
- Secrets
- Environment Files
- IDE Files
- OS Files

---

# Git Hooks

Git hooks may enforce:

- Formatting
- Linting
- Testing
- Secret Detection
- Commit Validation

Hooks should improve quality without reducing productivity.

---

# Signing Commits

Production repositories should require signed commits.

Approved signing methods:

- GPG
- SSH Signing

---

# History Protection

Avoid rewriting published history.

Prohibited on shared branches:

- Force Push
- History Rewrite
- Commit Deletion

Exceptions require engineering approval.

---

# Force Push

Force push is prohibited on protected branches.

Force pushing personal feature branches should only occur when necessary.

---

# Tagging

Git tags shall represent released versions.

Example:

```text
v1.0.0

v2.3.1
```

Tags shall be immutable.

---

# Release Branches

Release branches shall:

- Stabilize releases
- Receive only approved fixes
- Be versioned
- Be documented

---

# Hotfix Workflow

Critical production issues shall follow:

```text
main

↓

hotfix branch

↓

Review

↓

Merge

↓

Deploy

↓

Tag Release
```

---

# Repository Hygiene

Repositories shall:

- Remove stale branches
- Remove obsolete tags
- Archive inactive repositories
- Maintain documentation
- Review branch health

---

# Security

Developers shall never commit:

- Passwords
- API Keys
- Tokens
- Certificates
- Private Keys
- Secrets

Secret scanning shall be enabled.

---

# AI Usage

AI-generated commits shall:

- Be reviewed
- Follow commit standards
- Pass automated validation
- Pass code review

AI shall never push directly to protected branches.

---

# Best Practices

Engineering teams should:

- Commit early and often.
- Keep commits small.
- Rebase before opening a Pull Request.
- Review changes before committing.
- Delete merged branches.
- Follow branch naming conventions.
- Keep repositories clean.
- Protect the main branch.

---

# Anti-Patterns

Avoid:

- Large commits
- Force pushing protected branches
- Committing secrets
- Unreviewed merges
- Long-lived feature branches
- Mixing unrelated changes
- Empty commits
- Poor commit messages
- Ignoring merge conflicts
- Committing generated artifacts

---

# Compliance Checklist

Before pushing verify:

- Branch created correctly
- Latest main synchronized
- Code builds successfully
- Tests pass
- Commit message valid
- Secrets removed
- Linting passed
- Documentation updated
- Files reviewed
- Changes ready for review

---

# Governance

Git Standards are governed by:

- Chief Technology Officer (CTO)
- Platform Engineering
- Engineering Managers
- Architecture Review Board (ARB)

Compliance shall be enforced through branch protection rules, Git hooks, CI/CD pipelines, repository audits, pull request reviews, and automated policy enforcement.

---

# Related Documents

- README.md
- repository-standards.md
- repository-structure.md
- branching-strategy.md
- branch-protection.md
- commit-message-standards.md
- pull-request-standards.md
- merge-strategy.md
- semantic-versioning.md
- repository-security.md
- github-standards.md
- ci-cd-standards.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Git Standards documentation. |