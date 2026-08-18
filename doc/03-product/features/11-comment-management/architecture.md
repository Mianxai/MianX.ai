---
id: FEAT-011-ARCH
title: Comment Management Architecture
version: 1.0.0
status: Draft

feature: FEAT-011

owner:
  technical: Platform Engineering Team
  architecture: Solution Architecture Team
  ai: Architecture AI

reviewers:
  - Platform Architecture Team
  - Backend Team
  - Security Team

created: 2026-07-05
updated: 2026-07-05

category: Architecture

tags:
  - architecture
  - comments
  - collaboration
  - threaded-comments
  - mentions
---

# Comment Management Architecture

> This document defines the technical architecture of the Comment Management feature.

---

# Purpose

Comment Management provides a centralized collaboration service that enables discussions across multiple platform resources.

Instead of building separate comment implementations for each feature, the platform exposes one reusable Comment Management module that can attach to any supported resource.

---

# Architecture Principles

The architecture must be:

- Domain Driven
- Resource Agnostic
- Modular
- Event Driven
- Secure
- Scalable
- Observable
- Extensible

---

# High-Level Architecture

```text
                     User
                       │
                       ▼
              Authentication
                       │
                       ▼
               Authorization
                       │
                       ▼
           Resource Access Validation
                       │
                       ▼
               Comment Service
        ┌─────────┼──────────┐
        ▼         ▼          ▼
  Thread Engine Mention Engine Reaction Engine
        │         │          │
        └─────────┼──────────┘
                  ▼
           Comment Repository
                  │
        ┌─────────┼────────────┐
        ▼         ▼            ▼
 Activity Log  Event Bus   Audit Service
                  │
      ┌───────────┼──────────────┐
      ▼           ▼              ▼
Notifications Automation Reporting
                  │
                  ▼
            Analytics / AI
```

---

# Core Components

## Comment Service

Responsible for:

- Comment creation
- Comment editing
- Comment deletion
- Comment restoration
- Thread management
- Resource association

The service does not own business resources. It references them through `resource_type` and `resource_id`.

---

## Resource Validation Layer

Responsible for:

- Resource existence validation
- Resource accessibility
- Organization validation
- Workspace validation
- Project membership validation
- Permission checks

Supported resources (v1):

- Task
- Subtask

Future resources:

- Project
- Issue
- Document
- Approval
- Milestone

---

## Thread Engine

Responsible for:

- Root comments
- Nested replies
- Parent-child relationships
- Thread hierarchy validation
- Maximum nesting depth enforcement

---

## Mention Engine

Responsible for:

- Parsing `@mentions`
- Validating mentioned users
- Creating mention records
- Triggering notifications
- Highlighting mentions

---

## Reaction Engine

Responsible for:

- Adding reactions
- Removing reactions
- Preventing duplicates
- Counting reactions
- Configurable emoji catalog

---

## Activity Service

Records:

- Comment created
- Comment edited
- Comment deleted
- Comment restored
- Reply created
- Mention added
- Reaction added
- Reaction removed

---

## Event Publisher

Publishes domain events:

- CommentCreated
- CommentUpdated
- CommentDeleted
- CommentRestored
- CommentReplied
- MentionCreated
- ReactionAdded
- ReactionRemoved

Consumers include:

- Notification Service
- Automation Engine
- Reporting
- Analytics
- AI Workforce
- Audit Service

---

# Resource Association Model

```text
Task
        │
        ├──────────────┐
        ▼              ▼
    Comment        Comment
        │
        ▼
      Replies

Subtask
        │
        ▼
    Comment
        │
        ▼
      Replies

Future Resources

Project
Issue
Document
Approval
Milestone
```

Each comment references:

- resource_type
- resource_id

This keeps the module reusable across the platform.

---

# Thread Hierarchy

```text
Root Comment
      │
      ├─────────────┐
      ▼             ▼
 Reply A        Reply B
      │
      ▼
Reply A1
      │
      ▼
Reply A2
```

Business rules determine the maximum allowed nesting depth.

---

# Module Responsibilities

Comment Management is responsible for:

- Comment lifecycle
- Thread management
- Mentions
- Emoji reactions
- Search
- Audit references
- Activity references

Comment Management is NOT responsible for:

- Authentication
- User management
- File attachments
- Notification delivery
- Resource ownership
- Permission definitions

---

# Integrations

Required integrations:

- Authentication
- Authorization
- User Management
- Organization Management
- Workspace Management
- Membership Management
- Role Management
- Permission Management
- Task Management
- Subtask Management
- Notification Service
- Audit Service
- Reporting
- Analytics
- Automation Engine
- AI Workforce

---

# Security Architecture

The feature enforces:

- JWT authentication
- RBAC authorization
- Organization isolation
- Workspace isolation
- Resource-level authorization
- Audit logging
- Secure event publishing

---

# Error Handling

Standardized error handling includes:

- Resource not found
- Permission denied
- Invalid thread hierarchy
- Invalid mention
- Duplicate reaction
- Validation failure
- Conflict detection

All errors must follow the platform response format.

---

# Scalability

The architecture supports:

- Millions of comments
- Deep discussion threads
- High concurrent usage
- Horizontal scaling
- Read replicas
- Event-driven processing

---

# Observability

The system should expose:

- Structured logs
- Metrics
- Distributed tracing
- Audit events
- Health checks

---

# Future Extensions

Planned enhancements:

- AI-generated summaries
- AI moderation
- Comment translation
- Thread resolution
- Comment pinning
- Rich embeds
- Voice comments
- Video comments

---

# Related Documents

Feature

- README.md
- requirements.md
- workflow.md
- database.md
- api.md
- ui.md
- testing.md
- changelog.md

Dependencies

- ../09-task-management/architecture.md
- ../10-subtask-management/architecture.md

Platform

- ../../../04-platform/architecture.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Comment Management Architecture |