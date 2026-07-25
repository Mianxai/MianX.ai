---
title: SQL Standards
description: Defines the enterprise SQL development standards, database design principles, schema organization, query optimization, security requirements, and governance for all relational databases used within the MIANX-AI platform.
category: Engineering
parent: 06-engineering/coding-standards
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Data Engineering Department
reviewers:
  - Architecture Review Board (ARB)
  - Database Administration Team
  - Engineering Managers
version: 1.0.0
last_updated: 2026-07-08
tags:
  - sql
  - database
  - standards
  - engineering
---

# SQL Standards

---

# Purpose

This document defines the official SQL development standards for the MIANX-AI platform.

SQL is a critical component of enterprise applications. Consistent SQL standards ensure databases remain secure, maintainable, scalable, performant, and easy to manage throughout their lifecycle.

These standards apply to all relational database systems regardless of vendor.

---

# Objectives

The SQL Standards aim to:

- Standardize SQL development
- Improve database quality
- Increase maintainability
- Improve query performance
- Enhance security
- Reduce technical debt
- Standardize schema design
- Support enterprise scalability
- Improve developer productivity
- Ensure long-term consistency

---

# Scope

These standards apply to:

- PostgreSQL
- MySQL
- MariaDB
- Microsoft SQL Server
- Oracle Database
- SQLite (Development Only)
- Data Warehouses
- Reporting Databases

---

# SQL Principles

Database development shall be:

- Consistent
- Secure
- Performant
- Maintainable
- Normalized
- Scalable
- Observable
- Documented
- Version Controlled
- Production Ready

---

# Database Naming Standards

Use:

```text
snake_case
```

Examples:

```text
user_accounts

project_tasks

invoice_items

workflow_logs
```

Avoid:

```text
UserTable

tblUsers

ProjectTaskData

mytable
```

---

# Schema Naming

Schemas should represent business domains.

Examples:

```text
authentication

organization

projects

finance

crm

analytics
```

---

# Table Naming

Requirements:

- Use plural nouns
- Use snake_case
- Describe business entities

Examples:

```text
users

organizations

projects

tasks

invoices

payments
```

---

# Column Naming

Use:

```text
snake_case
```

Examples:

```text
first_name

last_name

created_at

updated_at

project_id

organization_id
```

---

# Primary Keys

Primary key column:

```text
id
```

Example:

```sql
id UUID PRIMARY KEY
```

Use UUIDs for distributed systems unless another strategy is approved.

---

# Foreign Keys

Foreign keys use:

```text
<entity>_id
```

Examples:

```text
user_id

organization_id

project_id
```

---

# Audit Columns

Every business table should include:

```text
created_at

updated_at

created_by

updated_by
```

Where soft deletion is supported:

```text
deleted_at

deleted_by
```

---

# Index Naming

Use:

```text
idx_<table>_<column>
```

Examples:

```text
idx_users_email

idx_projects_status

idx_tasks_due_date
```

---

# Foreign Key Naming

Use:

```text
fk_<table>_<reference>
```

Examples:

```text
fk_projects_owner

fk_tasks_project

fk_users_organization
```

---

# Unique Constraints

Use:

```text
uq_<table>_<column>
```

Examples:

```text
uq_users_email

uq_projects_slug
```

---

# Check Constraints

Use:

```text
chk_<table>_<column>
```

Examples:

```text
chk_invoice_total

chk_age
```

---

# SQL Formatting

Keywords:

```sql
SELECT
FROM
WHERE
GROUP BY
ORDER BY
HAVING
JOIN
LEFT JOIN
```

shall be uppercase.

Identifiers remain lowercase.

---

# Query Formatting

Example:

```sql
SELECT
    id,
    first_name,
    last_name
FROM users
WHERE status = 'ACTIVE'
ORDER BY created_at DESC;
```

Queries shall remain readable.

---

# Aliases

Use meaningful aliases.

Preferred:

```sql
users AS u

projects AS p
```

Avoid:

```sql
a

b

x

y
```

---

# Normalization

Production databases should generally follow Third Normal Form (3NF).

Denormalization is permitted only after performance analysis and approval.

---

# Data Types

Use appropriate data types.

Examples:

| Data | Type |
|--------|------|
| Identifier | UUID |
| Name | VARCHAR |
| Description | TEXT |
| Boolean | BOOLEAN |
| Amount | DECIMAL |
| Timestamp | TIMESTAMP |
| Date | DATE |

Avoid oversized data types.

---

# NULL Handling

Columns should be:

- NOT NULL by default
- Nullable only when justified

Avoid unnecessary nullable columns.

---

# Transactions

All business-critical operations shall use transactions.

Example:

```sql
BEGIN;

UPDATE ...

INSERT ...

COMMIT;
```

Rollback on failure.

---

# Joins

Use explicit joins.

Preferred:

```sql
INNER JOIN

LEFT JOIN
```

Avoid implicit joins.

---

# SELECT Statements

Never use:

```sql
SELECT *
```

Specify required columns explicitly.

Benefits:

- Better performance
- Improved readability
- Safer schema evolution

---

# WHERE Clauses

Always filter efficiently.

Avoid:

```sql
WHERE LOWER(email)
```

when indexes become unusable.

---

# Indexing

Create indexes for:

- Foreign Keys
- Search Columns
- Frequently Filtered Columns
- Frequently Joined Columns

Review unused indexes regularly.

---

# Query Optimization

Optimize:

- Execution Plans
- Index Usage
- Join Order
- Filtering
- Sorting

Benchmark expensive queries.

---

# Pagination

Large result sets shall use pagination.

Preferred:

```sql
LIMIT

OFFSET
```

or cursor-based pagination for large datasets.

---

# Views

Views shall:

- Represent business reporting
- Simplify complex queries
- Avoid excessive nesting

Document every production view.

---

# Stored Procedures

Stored procedures are permitted only when justified.

Appropriate use cases:

- Complex data processing
- Batch operations
- Performance optimization

Business logic should primarily reside within application services.

---

# Database Functions

Functions should:

- Be deterministic when possible
- Be documented
- Avoid side effects unless intentional

---

# Migrations

All schema changes shall use version-controlled migrations.

Requirements:

- Forward migration
- Rollback support
- Reviewed before deployment

Direct production schema changes are prohibited.

---

# Security

Database security requirements:

- Least privilege
- Parameterized queries
- Encryption
- Secure credentials
- Access auditing
- Row-level security where appropriate

Never concatenate user input into SQL.

---

# SQL Injection Prevention

Always use parameterized queries.

Never build SQL using string concatenation.

Example:

```sql
SELECT *
FROM users
WHERE email = ?
```

---

# Performance

Performance considerations:

- Avoid unnecessary joins
- Use indexes
- Limit result sets
- Avoid expensive subqueries
- Optimize aggregations
- Analyze execution plans

---

# Backup Considerations

Database design shall support:

- Backup
- Recovery
- Replication
- High Availability
- Disaster Recovery

---

# Documentation

Document:

- Tables
- Relationships
- Constraints
- Indexes
- Views
- Stored Procedures
- Functions

Complex schemas require ER diagrams.

---

# Testing

Database changes shall be tested for:

- Migration success
- Rollback success
- Performance
- Data integrity
- Security
- Constraint validation

---

# AI-Generated SQL

AI-generated SQL shall:

- Pass review
- Follow formatting standards
- Use parameterized queries
- Avoid SELECT *
- Respect naming conventions
- Be performance tested

Human approval is required before production deployment.

---

# Best Practices

Engineering teams should:

- Use explicit column lists.
- Normalize data appropriately.
- Use transactions.
- Write readable SQL.
- Create useful indexes.
- Benchmark critical queries.
- Document schema changes.
- Review execution plans.

---

# Anti-Patterns

Avoid:

- SELECT *
- String concatenated SQL
- Missing indexes
- Large transactions
- Duplicate data
- Excessive nullable columns
- Circular relationships
- Business logic in triggers
- Unreviewed migrations
- Hardcoded credentials

---

# Compliance Checklist

Before merging SQL changes verify:

- Naming standards followed
- Migrations created
- Rollback verified
- Query performance reviewed
- Indexes validated
- Security reviewed
- Documentation updated
- Tests passed
- Peer review completed
- Production deployment approved

---

# Governance

SQL Standards are governed by:

- Chief Technology Officer (CTO)
- Database Administration Team
- Architecture Review Board (ARB)

Compliance shall be enforced through migration reviews, automated testing, database monitoring, and engineering governance.

---

# Related Documents

- README.md
- project-structure.md
- naming-conventions.md
- coding-principles.md
- database-architecture.md
- secure-coding.md
- testing-standards.md
- code-review-standards.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial SQL Standards documentation. |