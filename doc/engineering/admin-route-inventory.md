# Admin route inventory (canonical)

Generated for Admin UX / navigation / performance work.
Auth: all `/admin/*` pages except `/admin/login` require `sb-access-token` (middleware).
API: `/api/admin/*` require admin session; `/api/internal/runtime/*` require worker secret.

## Pages

| Route | Sidebar label | Purpose | Canonical | Duplicate / redirect | Project context | Auth | Data source |
|---|---|---|---|---|---|---|---|
| `/admin` | Overview | High-level counts | self | — | optional | yes | `/api/admin/overview` |
| `/admin/login` | — | Sign-in | self | — | n/a | public | Supabase Auth + `/api/admin/session` |
| `/admin/command-center` | Command Center | Ops snapshot + workforce | self | — | optional `project_id` | yes | `/api/admin/command-center` |
| `/admin/ceo-brief` | CEO Brief | CEO brief artifacts | self | — | recommended | yes | `/api/admin/ceo-brief` |
| `/admin/objectives` | Objectives | Objective list/CRUD | self | — | recommended | yes | `/api/admin/objectives` |
| `/admin/company-builder` | Company Builder | Blueprint generation | self | — | recommended | yes | `/api/admin/company-builder` |
| `/admin/execution` | Execution | Execution board | self | — | recommended | yes | `/api/admin/execution` + CC |
| `/admin/inbox` | Founder Inbox | Founder messages | self | — | recommended | yes | `/api/admin/inbox` |
| `/admin/agents` | Agents | Agent directory / network | self | — | optional | yes | `/api/admin/command-center` + catalog |
| `/admin/agent-network` | (Agents) | Legacy network URL | **→ `/admin/agents`** | redirect | preserves query | yes | — |
| `/admin/departments` | Departments | Department roster + capacity | self | was CC redirect (fixed) | optional | yes | catalog `DEPARTMENTS` + CC |
| `/admin/workflows` | Workflows | Definitions + instances | self | was CC redirect (fixed) | optional | yes | `WORKFLOW_CHAINS` + CC |
| `/admin/schedule` | Schedule | Scheduler / cadence | self | — | optional | yes | health + settings |
| `/admin/leads` | Leads | Lead pipeline | **canonical** | — | n/a (global) | yes | `/api/leads` |
| `/admin/submissions` | (Leads) | Legacy leads URL | **→ `/admin/leads`** | redirect | preserves `status` | yes | — |
| `/admin/lead-pipeline` | (Leads) | Legacy leads URL | **→ `/admin/leads`** | redirect | preserves `status` | yes | — |
| `/admin/projects` | Projects | Project list | self | — | list (all) | yes | Supabase projects |
| `/admin/projects/[id]` | Projects | Project detail | self | — | path id | yes | Supabase project |
| `/admin/runtime/approvals` | Approvals | Approval queue | self | not under Runtime children | recommended | yes | runtime APIs via RuntimeWorkspace |
| `/admin/knowledge` | Knowledge | Knowledge assets | self | — | recommended | yes | `/api/admin/knowledge` |
| `/admin/memory` | Memory | Project memory | self | — | recommended | yes | `/api/admin/memory` |
| `/admin/learning` | Learning | Learning signals | self | — | recommended | yes | `/api/admin/learning` |
| `/admin/outputs` | Outputs | Generated outputs | self | — | recommended | yes | `/api/admin/outputs` |
| `/admin/analytics` | Analytics | Analytics summary | self | — | optional | yes | `/api/admin/analytics` |
| `/admin/runtime` | Runtime | Runtime control room | self | children: Instances/Tasks/Queue/Runs | optional | yes | runtime + health |
| `/admin/runtime/agents` | Instances | Registered agent instances | Runtime child | distinct from Agents catalog | optional | yes | runtime |
| `/admin/runtime/tasks` | Tasks | Task list | Runtime child | — | recommended | yes | runtime |
| `/admin/runtime/queue` | Queue | Job queue | Runtime child | — | optional | yes | runtime |
| `/admin/runtime/runs` | Runs | Run history | Runtime child | — | optional | yes | runtime |
| `/admin/runtime/audit` | Audit | Audit log | Operations top-level | not Runtime child | optional | yes | runtime |
| `/admin/settings` | Settings | Admin settings / setup | self | — | n/a | yes | `/api/admin/settings` |

## Admin APIs

| Route | Purpose | Auth | Notes |
|---|---|---|---|
| `/api/admin/session` | Set/clear HttpOnly session cookie | public POST with token | |
| `/api/admin/overview` | Overview metrics | admin | |
| `/api/admin/command-center` | CC snapshot | admin | |
| `/api/admin/ceo-brief` | CEO brief | admin | |
| `/api/admin/objectives` | Objectives CRUD | admin | |
| `/api/admin/objectives/[id]` | Objective by id | admin | |
| `/api/admin/company-builder` | Blueprints | admin | |
| `/api/admin/execution` | Execution board | admin | |
| `/api/admin/inbox` | Inbox | admin | |
| `/api/admin/knowledge` | Knowledge | admin | |
| `/api/admin/memory` | Memory | admin | |
| `/api/admin/learning` | Learning | admin | |
| `/api/admin/outputs` | Outputs | admin | |
| `/api/admin/analytics` | Analytics | admin | |
| `/api/admin/settings` | Settings | admin | |
| `/api/admin/notifications` | Badge counts | admin | |
| `/api/admin/runtime/tick` | Admin-triggered tick | admin | not paid provider |
| `/api/leads` | Leads CRUD | admin | used by Leads page |
| `/api/core/health` | Non-secret health | may be public/controlled | scheduler + provider status |
| `/api/internal/runtime/tick` | Scheduler tick | worker secret | GitHub Actions |

## Navigation IA (canonical sidebar)

**CONTROL:** Command Center, CEO Brief, Objectives, Company Builder, Execution, Founder Inbox, Overview  
**WORKFORCE:** Agents, Departments, Workflows, Schedule  
**BUSINESS:** Leads, Projects, Approvals  
**INTELLIGENCE:** Knowledge, Memory, Learning, Outputs, Analytics  
**OPERATIONS:** Runtime (+ Instances/Tasks/Queue/Runs), Audit, Settings  

Removed as duplicate primary items: Runtime/Agents, Runtime/Approvals, Runtime/Audit (Approvals + Audit are first-class; Agents catalog ≠ Instances).
