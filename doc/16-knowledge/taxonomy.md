---
title: Enterprise Taxonomy
description: Defines the Enterprise Taxonomy for MIANX-AI, including hierarchical classification, knowledge categorization, enterprise information architecture, tagging strategy, navigation standards, AI semantic organization, and governance.
category: Knowledge
parent: docs/16-knowledge
status: Approved
owners:
  - Chief Knowledge Officer (CKO)
  - Chief Technology Officer (CTO)
reviewers:
  - Architecture Board
  - AI Team
  - Documentation Team
version: 1.0.0
last_updated: 2026-07-10
tags:
  - taxonomy
  - classification
  - knowledge
  - information-architecture
  - ai
---

# Enterprise Taxonomy

---

# Purpose

The Enterprise Taxonomy defines how all information, documents, data, business objects, software components, AI resources, and knowledge assets are classified across the MIANX-AI ecosystem.

It provides a consistent hierarchical structure that allows humans and AI systems to organize, discover, retrieve, and manage information efficiently.

Taxonomy answers one question:

> **"Where does this belong?"**

---

# Objectives

The Enterprise Taxonomy aims to:

- Standardize enterprise classification.
- Eliminate inconsistent categorization.
- Improve search accuracy.
- Improve navigation.
- Enable semantic organization.
- Support Knowledge Graphs.
- Support AI reasoning.
- Improve documentation consistency.
- Simplify governance.
- Support enterprise scalability.

---

# Taxonomy Principles

The taxonomy should always be:

- Hierarchical
- Consistent
- Predictable
- Scalable
- Searchable
- Modular
- AI-Friendly
- Reusable
- Extensible
- Governed

---

# Enterprise Classification Hierarchy

```text
Enterprise

│

├── Domain

│     ├── Category

│     │      ├── Topic

│     │      │      ├── Component

│     │      │      │      ├── Feature

│     │      │      │      │      └── Asset
```

Every knowledge asset belongs to one location within this hierarchy.

---

# Enterprise Domains

The highest classification level consists of:

```text
01 Governance

02 Company

03 Product

04 System

05 Workforce

06 Engineering

07 Platform

08 Data

09 Security

10 DevOps

11 Operations

12 Business

13 API

14 Quality

15 UI-UX

16 Knowledge

17 Templates

18 Assets
```

Each domain represents a major business capability.

---

# Category Layer

Within each domain, information is divided into categories.

Example:

```text
Engineering

├── Standards

├── Architecture

├── Backend

├── Frontend

├── Infrastructure

├── Testing

├── AI

├── Automation
```

---

# Topic Layer

Each category contains multiple topics.

Example:

```text
Backend

├── Authentication

├── Authorization

├── API

├── Database

├── Cache

├── Queue

├── Events
```

---

# Component Layer

Topics may contain implementation components.

Example:

```text
Authentication

├── JWT

├── OAuth

├── Sessions

├── MFA

├── Passwords

├── Tokens
```

---

# Feature Layer

Every component may expose multiple features.

Example:

```text
Authentication

├── Login

├── Logout

├── Forgot Password

├── Reset Password

├── Email Verification

├── Social Login
```

---

# Asset Layer

Every feature may contain assets.

Examples:

- Documentation
- API
- Database Schema
- UI Design
- Source Code
- Tests
- Diagrams
- SOPs

---

# Business Taxonomy

```text
Business

├── Sales

├── Marketing

├── Finance

├── Procurement

├── Partnerships

├── Customer Success

├── Analytics
```

---

# Engineering Taxonomy

```text
Engineering

├── Backend

├── Frontend

├── Mobile

├── AI

├── DevOps

├── Infrastructure

├── Security

├── Quality
```

---

# Product Taxonomy

```text
Product

├── Requirements

├── Features

├── User Stories

├── Roadmaps

├── Releases

├── Modules
```

---

# AI Taxonomy

```text
AI

├── Models

├── Agents

├── Prompts

├── Memory

├── MCP

├── RAG

├── Reasoning

├── Workflows
```

---

# Knowledge Taxonomy

```text
Knowledge

├── Strategy

├── Governance

├── Architecture

├── Management

├── Standards

├── Ontology

├── Taxonomy

├── Metadata

├── Semantic Search

├── Vector Search

├── Knowledge Graph
```

---

# Documentation Taxonomy

Documentation should be classified as:

```text
Policy

↓

Standard

↓

Architecture

↓

Process

↓

Workflow

↓

Guide

↓

Reference

↓

Checklist

↓

Template
```

Each document belongs to exactly one primary classification.

---

# Tagging Strategy

Every knowledge asset should include tags.

Examples:

```text
security

backend

api

authentication

knowledge

vector-db

rag

engineering

workflow

enterprise
```

Tags supplement taxonomy but never replace it.

---

# Naming Standards

Classification names should:

- Use singular nouns where appropriate.
- Use business terminology.
- Avoid abbreviations.
- Be globally understandable.
- Follow enterprise naming conventions.

---

# Navigation Standards

Users should navigate information by:

- Domain
- Category
- Topic
- Component
- Feature
- Document Type
- Tags
- Search

Navigation should remain consistent across the platform.

---

# AI Integration

Taxonomy enables AI systems to:

- Understand document categories.
- Improve semantic retrieval.
- Build context.
- Perform intelligent recommendations.
- Organize enterprise memory.
- Improve reasoning accuracy.

---

# Search Integration

Taxonomy supports:

- Keyword Search
- Metadata Search
- Semantic Search
- Filtered Search
- AI Search
- Hybrid Search

Search results should leverage taxonomy for improved relevance.

---

# Metadata Integration

Every classified item should include:

- Domain
- Category
- Topic
- Component
- Owner
- Tags
- Status
- Version
- Security Level

---

# Governance

Changes to the taxonomy require approval from:

- Chief Knowledge Officer
- Chief Technology Officer
- Enterprise Architecture Board
- Documentation Team

Taxonomy changes should preserve backward compatibility whenever possible.

---

# Quality Metrics

Taxonomy effectiveness is measured through:

- Classification Accuracy
- Search Success Rate
- Navigation Efficiency
- Duplicate Category Rate
- AI Retrieval Accuracy
- Knowledge Discoverability
- User Adoption

---

# Best Practices

- Classify everything.
- Use consistent terminology.
- Keep taxonomy hierarchical.
- Avoid duplicate categories.
- Review classifications regularly.
- Maintain stable naming.
- Keep taxonomy business-driven.
- Optimize for AI understanding.
- Document taxonomy changes.
- Ensure scalability.

---

# Anti-Patterns

Avoid:

- Flat classifications.
- Duplicate categories.
- Multiple primary locations for the same asset.
- Undefined categories.
- Inconsistent naming.
- Deep unnecessary hierarchies.
- Category overlap.
- Unapproved taxonomy modifications.

---

# Related Documents

- README.md
- knowledge-strategy.md
- knowledge-governance.md
- knowledge-architecture.md
- knowledge-management.md
- knowledge-base.md
- documentation-standards.md
- ontology.md
- metadata-management.md
- semantic-search.md
- embeddings.md
- vector-database.md
- rag-architecture.md
- memory-management.md
- knowledge-ingestion.md
- knowledge-validation.md
- knowledge-versioning.md
- knowledge-sharing.md
- knowledge-security.md
- knowledge-metrics.md
- knowledge-checklists.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------------|--------------------|--------------------------------------------|
| 1.0.0 | 2026-07-10 | MIANX-AI Engineering | Initial Enterprise Taxonomy Framework defining hierarchical classification for the MIANX-AI ecosystem. |