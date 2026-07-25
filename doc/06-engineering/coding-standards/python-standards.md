---
title: Python Standards
description: Defines the enterprise Python development standards, coding conventions, project organization, security practices, testing requirements, and governance for all Python software developed within the MIANX-AI platform.
category: Engineering
parent: 06-engineering/coding-standards
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Engineering Department
reviewers:
  - Architecture Review Board (ARB)
  - Engineering Managers
  - Technical Leads
version: 1.0.0
last_updated: 2026-07-08
tags:
  - python
  - standards
  - engineering
  - coding
---

# Python Standards

---

# Purpose

This document defines the official Python development standards for the MIANX-AI platform.

Python is used extensively throughout MIANX-AI for AI systems, machine learning, automation, backend services, data engineering, DevOps tooling, infrastructure automation, scientific computing, and internal utilities.

These standards ensure every Python project is maintainable, secure, scalable, readable, performant, and production-ready.

---

# Objectives

The Python Standards aim to:

- Standardize Python development
- Improve software quality
- Increase maintainability
- Improve readability
- Support AI-assisted development
- Encourage modern Python practices
- Improve testing quality
- Reduce technical debt
- Improve security
- Maintain engineering consistency

---

# Scope

These standards apply to:

- AI Services
- Machine Learning
- Automation
- Backend Services
- APIs
- Data Engineering
- Data Science
- DevOps Tools
- Infrastructure Automation
- Internal Utilities

---

# Python Principles

Python software shall be:

- Readable
- Explicit
- Modular
- Typed
- Testable
- Secure
- Performant
- Maintainable
- Documented
- Production Ready

---

# Supported Python Version

Projects shall use an approved Long-Term Support Python version.

Requirements:

- Standardize across repositories
- Upgrade through engineering approval
- Avoid unsupported versions

---

# Virtual Environments

Every Python project shall use isolated virtual environments.

Supported approaches include:

- venv
- uv
- Poetry

Global package installation is prohibited for project dependencies.

---

# Dependency Management

Dependencies shall be managed using approved package managers.

Preferred options:

- Poetry
- uv
- pip

Requirements:

- Lock dependency versions
- Remove unused packages
- Review dependencies regularly
- Scan for vulnerabilities

---

# Project Structure

Example:

```text
project-name/

├── docs/
├── src/
│   └── app/
├── tests/
├── scripts/
├── config/
├── data/
├── notebooks/
├── pyproject.toml
├── README.md
└── .gitignore
```

Every project shall follow the enterprise project structure standard.

---

# Package Structure

Packages should be organized by business capability.

Example:

```text
src/

authentication/

projects/

users/

notifications/

shared/
```

Avoid organizing only by technical layers.

---

# File Naming

Use:

```text
snake_case.py
```

Examples:

```text
user_service.py

authentication.py

invoice_generator.py

payment_provider.py
```

---

# Module Naming

Use:

```text
snake_case
```

Module names shall clearly describe their purpose.

---

# Variable Naming

Use:

```text
snake_case
```

Examples:

```python
user_name

project_id

invoice_total

current_workspace
```

---

# Constant Naming

Use:

```text
UPPER_SNAKE_CASE
```

Examples:

```python
DEFAULT_TIMEOUT

MAX_RETRIES

API_VERSION

MAX_UPLOAD_SIZE
```

---

# Function Naming

Functions shall use:

```text
snake_case
```

Examples:

```python
create_project()

calculate_salary()

validate_token()

send_email()
```

Function names should begin with verbs.

---

# Class Naming

Use:

```text
PascalCase
```

Examples:

```python
UserService

InvoiceGenerator

AuthenticationProvider
```

---

# Exception Naming

Custom exceptions shall end with:

```text
Error
```

Examples:

```python
AuthenticationError

ValidationError

PaymentError

DatabaseError
```

---

# Type Hints

Type hints are mandatory.

Example:

```python
def calculate_total(
    amount: float,
    tax: float
) -> float:
    ...
```

Untyped public APIs are not permitted.

---

# Dataclasses

Use dataclasses for structured immutable data where appropriate.

Example:

```python
@dataclass
class User:
    id: str
    name: str
```

---

# Enums

Use Enum for fixed values.

Example:

```python
class UserStatus(Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
```

---

# Imports

Import order:

1. Standard Library
2. Third-party Packages
3. Internal Packages
4. Relative Imports

Separate groups with blank lines.

Avoid wildcard imports.

---

# Functions

Functions should:

- Have one responsibility
- Be concise
- Return predictable values
- Be easily testable
- Avoid hidden side effects

---

# Classes

Classes should:

- Represent one concept
- Follow Single Responsibility
- Minimize public methods
- Prefer composition over inheritance

Avoid large "God Classes."

---

# Error Handling

Handle expected errors.

Example:

```python
try:
    ...
except ValidationError:
    ...
```

Never suppress exceptions silently.

---

# Logging

Use the standard logging framework or approved centralized logging solution.

Avoid:

```python
print()
```

in production code.

Logs shall include sufficient context without exposing sensitive information.

---

# Configuration

Configuration shall come from:

- Environment Variables
- Configuration Files
- Secret Management Systems

Never hardcode:

- Passwords
- Tokens
- API Keys
- Database Credentials

---

# Asynchronous Programming

Use:

```python
async

await
```

for I/O-bound workloads.

Examples:

- APIs
- AI Requests
- Message Processing
- File Operations

Avoid unnecessary asynchronous code.

---

# Testing

Every Python project shall include:

- Unit Tests
- Integration Tests
- End-to-End Tests (when applicable)

Critical business logic requires automated testing.

---

# Test Organization

Example:

```text
tests/

unit/

integration/

e2e/

fixtures/

mocks/
```

Tests should mirror application structure.

---

# Documentation

Every public module shall document:

- Purpose
- Parameters
- Return Values
- Exceptions
- Examples

Complex modules require README documentation.

---

# Code Formatting

Formatting shall be automated.

Approved tools:

- Ruff
- Black

Manual formatting is discouraged.

---

# Linting

Projects shall use:

- Ruff

Linting must run in Continuous Integration.

---

# Static Type Checking

Projects shall use static type checking.

Approved tools include:

- mypy
- pyright

Public interfaces shall pass type validation.

---

# Security

Developers shall:

- Validate inputs
- Escape outputs
- Protect secrets
- Avoid unsafe deserialization
- Avoid arbitrary code execution
- Prevent injection attacks
- Use secure cryptographic libraries

Never use:

```python
eval()

exec()
```

with untrusted input.

---

# Performance

Optimize:

- Algorithms
- Database Access
- Memory Usage
- File Processing
- Network Calls

Measure before optimizing.

---

# AI & Machine Learning Standards

AI projects should:

- Separate training from inference
- Version models
- Track experiments
- Validate datasets
- Document prompts
- Monitor inference performance

Models shall be reproducible.

---

# Data Engineering Standards

Pipelines shall:

- Be idempotent
- Support retries
- Validate inputs
- Log execution
- Handle failures gracefully

---

# Notebook Usage

Jupyter notebooks are permitted only for:

- Research
- Prototyping
- Data Exploration

Production logic shall reside in Python modules rather than notebooks.

---

# AI-Generated Python Code

AI-generated code shall:

- Follow enterprise standards
- Pass linting
- Pass type checking
- Pass testing
- Use type hints
- Include documentation
- Avoid deprecated libraries

Human review is mandatory before production deployment.

---

# Best Practices

Engineering teams should:

- Use type hints everywhere.
- Keep functions small.
- Prefer composition.
- Write comprehensive tests.
- Use dependency injection.
- Document public APIs.
- Keep dependencies updated.
- Follow PEP 8 unless overridden by enterprise standards.

---

# Anti-Patterns

Avoid:

- Global Variables
- Circular Imports
- Wildcard Imports
- Large Modules
- Large Functions
- print() in Production
- Hardcoded Secrets
- Silent Exception Handling
- eval()
- exec()

---

# Compliance Checklist

Before merging Python code verify:

- Type hints added
- Linting passes
- Formatting passes
- Static type checking passes
- Tests pass
- Documentation updated
- Security reviewed
- Logging implemented
- Error handling completed
- Code reviewed

---

# Governance

Python Standards are governed by:

- Chief Technology Officer (CTO)
- Architecture Review Board (ARB)
- Engineering Leadership

Compliance shall be enforced through automated tooling, peer review, and continuous integration pipelines.

---

# Related Documents

- README.md
- coding-principles.md
- clean-code.md
- naming-conventions.md
- project-structure.md
- typescript-standards.md
- javascript-standards.md
- secure-coding.md
- testing-standards.md
- code-review-standards.md

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|---------|---------|
| 1.0.0 | 2026-07-08 | MIANX-AI Engineering | Initial Python Standards documentation. |