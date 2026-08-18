---
title: Key Management
description: Defines the Enterprise Key Management Framework (KMS) for the MIANX-AI Platform, including cryptographic key hierarchy, Hardware Security Modules (HSM), cloud KMS integration, key generation, storage, rotation, escrow, archival, destruction, certificate lifecycle, signing keys, AI model keys, backup keys, disaster recovery, and enterprise key governance.
category: Security
parent: docs/09-security
status: Approved
owners:
  - Chief Information Security Officer (CISO)
  - Security Engineering Team
reviewers:
  - Enterprise Architecture Team
  - Platform Engineering Team
  - Compliance Team
version: 1.0.0
last_updated: 2026-07-09
tags:
  - key-management
  - kms
  - hsm
  - cryptography
  - security
---

# Key Management

---

# Purpose

The Enterprise Key Management Framework defines how cryptographic keys are generated, protected, distributed, rotated, archived, revoked, and destroyed throughout the MIANX-AI Platform.

Strong encryption is only as secure as its key management. This framework ensures every cryptographic key is managed throughout its lifecycle using secure, auditable, and automated processes.

The framework supports enterprise-scale encryption across cloud infrastructure, applications, databases, AI systems, APIs, storage, backups, and communications.

---

# Objectives

The Key Management Framework aims to:

- Protect cryptographic keys
- Centralize key management
- Automate key lifecycle
- Reduce key exposure
- Support Zero Trust
- Protect AI assets
- Enable regulatory compliance
- Improve auditability
- Support disaster recovery
- Enable cryptographic agility

---

# Scope

This framework applies to:

- Master Keys
- Data Encryption Keys (DEK)
- Key Encryption Keys (KEK)
- TLS Certificates
- JWT Signing Keys
- API Keys
- Database Keys
- Backup Keys
- AI Model Keys
- Object Storage Keys
- Service Keys
- Kubernetes Secrets

---

# Key Management Principles

The platform follows these principles:

- Centralized Key Management
- Least Privilege
- Hardware Root of Trust
- Automated Rotation
- Secure Distribution
- Complete Auditability
- Separation of Duties
- Defense in Depth
- Zero Trust
- Cryptographic Agility

---

# Enterprise KMS Architecture

```text
Applications

        │

Enterprise KMS

        │

Hardware Security Module

        │

Master Keys

        │

Key Encryption Keys

        │

Data Encryption Keys

        │

Encrypted Resources
```

---

# Key Hierarchy

The enterprise key hierarchy follows:

```text
Root Key

↓

Master Key

↓

Key Encryption Key (KEK)

↓

Data Encryption Key (DEK)

↓

Encrypted Data
```

Each layer isolates cryptographic risk.

---

# Key Categories

## Root Keys

Used to establish enterprise cryptographic trust.

Characteristics:

- Highest sensitivity
- Stored inside HSM
- Never exported
- Limited usage
- Offline protection where possible

---

## Master Keys

Used to protect enterprise encryption keys.

Examples:

- Database Master Keys
- Storage Master Keys
- AI Master Keys
- Backup Master Keys

---

## Key Encryption Keys (KEK)

KEKs encrypt other keys.

Examples:

- DEK Protection
- Backup Key Protection
- Service Key Protection

---

## Data Encryption Keys (DEK)

DEKs encrypt:

- Database Records
- Files
- AI Models
- Storage Objects
- Backups
- Documents

DEKs rotate more frequently than KEKs.

---

# Key Lifecycle

Every key follows:

```text
Generate

↓

Register

↓

Store

↓

Distribute

↓

Use

↓

Rotate

↓

Archive

↓

Revoke

↓

Destroy
```

---

# Key Generation

Keys shall:

- Use cryptographically secure random number generators
- Meet enterprise key length requirements
- Be generated only by approved KMS services
- Never be manually generated
- Be uniquely identifiable

---

# Key Storage

Keys shall be stored in:

- Hardware Security Modules (HSM)
- Enterprise KMS
- Cloud KMS
- Secure Key Vaults

Plaintext key storage is prohibited.

---

# Hardware Security Modules (HSM)

Root trust is established using HSMs.

HSM responsibilities:

- Root Key Protection
- Key Generation
- Digital Signatures
- Certificate Operations
- Cryptographic Processing
- Secure Key Storage

Private root keys shall never leave the HSM.

---

# Cloud Key Management Services

Supported integrations include:

- AWS KMS
- Azure Key Vault
- Google Cloud KMS
- HashiCorp Vault
- Enterprise HSM

Cloud keys shall follow the same governance standards.

---

# Key Distribution

Key distribution requirements:

- Mutual Authentication
- TLS 1.3
- Least Privilege
- Encryption in Transit
- Policy Validation
- Audit Logging

Keys shall never be distributed through email, chat, or source code.

---

# Key Rotation

Automatic rotation applies to:

- Master Keys
- KEKs
- DEKs
- TLS Certificates
- JWT Signing Keys
- API Keys
- Secrets
- Database Credentials

Emergency rotation shall be supported.

---

# Key Revocation

Keys shall be revoked when:

- Compromised
- Expired
- Employee Departure
- Infrastructure Replacement
- Security Incident
- Certificate Revocation
- Compliance Requirement

---

# Key Destruction

Destroyed keys shall:

- Become permanently unusable
- Be removed from active systems
- Be securely erased
- Be logged
- Be verified

Destroyed keys cannot be recovered.

---

# Certificate Lifecycle

Certificates follow:

```text
Issue

↓

Deploy

↓

Monitor

↓

Renew

↓

Rotate

↓

Expire

↓

Revoke

↓

Archive
```

Certificate renewal should be automated.

---

# JWT Signing Keys

Signing keys protect:

- Access Tokens
- Identity Tokens
- Refresh Tokens
- API Authentication
- AI Authentication

Signing keys rotate regularly.

---

# API Keys

API keys shall:

- Be unique
- Be scoped
- Have expiration
- Support rotation
- Be auditable
- Never be shared

---

# AI Cryptographic Keys

AI systems use dedicated keys for:

- AI Models
- Embeddings
- Prompt Storage
- Memory Stores
- Agent Authentication
- Knowledge Bases
- Vector Databases

AI keys are isolated from application keys.

---

# Backup Keys

Backup encryption keys shall:

- Be independent
- Be stored separately
- Be recoverable
- Follow escrow policy
- Rotate regularly

---

# Key Escrow

Escrow may be used for:

- Disaster Recovery
- Regulatory Requirements
- Business Continuity

Escrow access requires executive approval.

---

# Disaster Recovery

Key recovery procedures include:

- HSM Backup
- Secure Replication
- Geographic Redundancy
- Recovery Validation
- Key Integrity Verification

Recovery shall be tested periodically.

---

# Monitoring

Continuous monitoring includes:

- Key Usage
- Key Rotation
- Failed Operations
- Unauthorized Access
- Certificate Expiration
- HSM Health
- KMS Availability
- Policy Violations

---

# Audit Logging

Every key operation records:

- Key Identifier
- Operation
- Identity
- Timestamp
- Resource
- Result
- Device
- Location

Actual key material is never logged.

---

# Security Controls

Key management security includes:

- HSM Protection
- MFA
- Least Privilege
- Segregation of Duties
- Automatic Rotation
- Audit Logging
- Encryption
- Secure Backups
- Continuous Monitoring
- Policy Enforcement

---

# Compliance

The Key Management Framework supports:

- ISO/IEC 27001
- ISO/IEC 27701
- SOC 2
- NIST SP 800-57
- NIST SP 800-130
- FIPS 140-3
- CIS Controls
- PCI DSS

---

# Metrics

Enterprise KMS KPIs include:

- Key Rotation Compliance
- Certificate Renewal Success
- HSM Availability
- KMS Availability
- Key Usage Events
- Revocation Time
- Recovery Success Rate
- Unauthorized Key Access Attempts
- Cryptographic Compliance Score
- Audit Findings

---

# Automation

KMS automation includes:

- Automatic Key Generation
- Automatic Rotation
- Certificate Renewal
- Secret Synchronization
- Policy Enforcement
- Compliance Validation
- Disaster Recovery Testing
- Audit Reporting

---

# Best Practices

Platform teams should:

- Store keys only in approved KMS/HSM solutions.
- Rotate keys automatically.
- Separate key responsibilities.
- Protect root keys with hardware.
- Monitor key usage continuously.
- Audit every key operation.
- Encrypt keys during transport.
- Test disaster recovery regularly.

---

# Anti-Patterns

Avoid:

- Hardcoded keys
- Plaintext key storage
- Shared master keys
- Manual rotation
- Long-lived keys
- Untracked certificates
- Exportable root keys
- Missing audit logs
- Weak random number generators
- Using production keys in development

---

# Governance

The Enterprise Key Management Framework is governed by:

- Chief Information Security Officer (CISO)
- Security Engineering Team
- Enterprise Architecture Team
- Platform Engineering Team
- Security Governance Committee

The framework shall be reviewed annually or whenever cryptographic standards, infrastructure, or compliance requirements change.

---

# Related Documents

- README.md
- encryption.md
- authentication.md
- authorization.md
- secrets-management.md
- certificate-management.md
- cloud-security.md
- infrastructure-security.md
- compliance.md
- audit-and-logging.md

---

# Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-07-09 | MIANX-AI Engineering | Initial Enterprise Key Management Framework. |