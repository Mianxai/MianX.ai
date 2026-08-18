/**
 * In-process workforce runtime store (durable via Phase G migration — not applied).
 */

import { nowIso } from "./schemas.js";

const agentStates = new Map(); // key: `${projectId||'_'}::${slug}`
const messages = [];
const delegations = [];
const collaborations = new Map();
const pipelineEvents = [];
const memoryWrites = [];
const learningProposals = [];
const checkpoints = [];
const controlEvents = [];
const healthEvents = [];
const simulations = new Map();
const auditLog = [];
const claimedTasks = new Set(); // prevent duplicate execution
let workforcePaused = false;

export function __resetWorkforceRuntime() {
  agentStates.clear();
  messages.length = 0;
  delegations.length = 0;
  collaborations.clear();
  pipelineEvents.length = 0;
  memoryWrites.length = 0;
  learningProposals.length = 0;
  checkpoints.length = 0;
  controlEvents.length = 0;
  healthEvents.length = 0;
  simulations.clear();
  auditLog.length = 0;
  claimedTasks.clear();
  workforcePaused = false;
}

export function stateKey(slug, projectId = null) {
  return `${projectId || "_"}::${slug}`;
}

export function getAgentState(slug, projectId = null) {
  return agentStates.get(stateKey(slug, projectId)) || null;
}

export function setAgentState(state) {
  const key = stateKey(state.agent_slug, state.project_id);
  const next = { ...state, updated_at: nowIso() };
  agentStates.set(key, next);
  return next;
}

export function listAgentStates({ project_id = null } = {}) {
  let rows = [...agentStates.values()];
  if (project_id) rows = rows.filter((r) => r.project_id === project_id);
  return rows;
}

export function pushMessage(msg) {
  messages.push(msg);
  return msg;
}

export function listMessages({ thread_id = null, project_id = null, limit = 200 } = {}) {
  let rows = [...messages];
  if (thread_id) rows = rows.filter((m) => m.thread_id === thread_id);
  if (project_id) rows = rows.filter((m) => m.project_id === project_id);
  return rows.slice(-limit);
}

export function pushDelegation(d) {
  delegations.push(d);
  return d;
}

export function listDelegations({ project_id = null } = {}) {
  let rows = [...delegations];
  if (project_id) rows = rows.filter((d) => d.project_id === project_id);
  return rows;
}

export function saveCollaboration(c) {
  collaborations.set(c.id, c);
  return c;
}

export function getCollaboration(id) {
  return collaborations.get(id) || null;
}

export function listCollaborations({ project_id = null } = {}) {
  let rows = [...collaborations.values()];
  if (project_id) rows = rows.filter((c) => c.project_id === project_id);
  return rows;
}

export function pushPipelineEvent(e) {
  pipelineEvents.push(e);
  return e;
}

export function listPipelineEvents({ task_id = null, project_id = null } = {}) {
  let rows = [...pipelineEvents];
  if (task_id) rows = rows.filter((e) => e.task_id === task_id);
  if (project_id) rows = rows.filter((e) => e.project_id === project_id);
  return rows;
}

export function pushMemoryWrite(w) {
  memoryWrites.push(w);
  return w;
}

export function listMemoryWrites({ project_id = null, agent_slug = null } = {}) {
  let rows = [...memoryWrites];
  if (project_id) rows = rows.filter((w) => w.project_id === project_id);
  if (agent_slug) rows = rows.filter((w) => w.agent_slug === agent_slug);
  return rows;
}

export function pushLearningProposal(p) {
  learningProposals.push(p);
  return p;
}

export function listLearningProposals({ project_id = null } = {}) {
  let rows = [...learningProposals];
  if (project_id) rows = rows.filter((p) => p.project_id === project_id);
  return rows;
}

export function pushCheckpoint(c) {
  checkpoints.push(c);
  return c;
}

export function listCheckpoints({ project_id = null } = {}) {
  let rows = [...checkpoints];
  if (project_id) rows = rows.filter((c) => c.project_id === project_id);
  return rows;
}

export function pushControlEvent(e) {
  controlEvents.push(e);
  return e;
}

export function listControlEvents({ limit = 100 } = {}) {
  return controlEvents.slice(-limit);
}

export function pushHealthEvent(e) {
  healthEvents.push(e);
  return e;
}

export function listHealthEvents({ project_id = null } = {}) {
  let rows = [...healthEvents];
  if (project_id) rows = rows.filter((e) => e.project_id === project_id);
  return rows;
}

export function saveSimulation(s) {
  simulations.set(s.id, s);
  return s;
}

export function getSimulation(id) {
  return simulations.get(id) || null;
}

export function listSimulations() {
  return [...simulations.values()];
}

export function recordAudit(entry) {
  const row = { id: `waudit_${auditLog.length + 1}`, at: nowIso(), ...entry };
  auditLog.push(row);
  return row;
}

export function listAudit({ limit = 200 } = {}) {
  return auditLog.slice(-limit);
}

export function tryClaimTask(taskId) {
  if (claimedTasks.has(taskId)) return false;
  claimedTasks.add(taskId);
  return true;
}

export function releaseTaskClaim(taskId) {
  claimedTasks.delete(taskId);
}

export function isTaskClaimed(taskId) {
  return claimedTasks.has(taskId);
}

export function setWorkforcePaused(v) {
  workforcePaused = Boolean(v);
}

export function isWorkforcePaused() {
  return workforcePaused;
}
