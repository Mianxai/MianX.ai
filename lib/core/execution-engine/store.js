// In-memory execution store (tests + graceful fallback). Optional Supabase later.

const programs = new Map();
const items = new Map();
const deps = new Map();
const allocations = new Map();
const events = [];
const checkpoints = [];
const handoffs = new Map();
const reviews = new Map();

export function __resetExecutionEngineStore() {
  programs.clear();
  items.clear();
  deps.clear();
  allocations.clear();
  events.length = 0;
  checkpoints.length = 0;
  handoffs.clear();
  reviews.clear();
}

export function saveProgram(p) {
  programs.set(p.id, p);
  return p;
}
export function getProgram(id) {
  return programs.get(id) || null;
}
export function listPrograms({ projectId = null, companyId = null } = {}) {
  return [...programs.values()].filter((p) => {
    if (projectId && p.project_id !== projectId) return false;
    if (companyId && p.company_id !== companyId) return false;
    return true;
  });
}

export function saveItem(item) {
  items.set(item.id, item);
  return item;
}
export function getItem(id) {
  return items.get(id) || null;
}
export function listItems({ programId = null, projectId = null, status = null, level = null } = {}) {
  return [...items.values()].filter((i) => {
    if (programId && i.program_id !== programId) return false;
    if (projectId && i.project_id !== projectId) return false;
    if (status && i.status !== status) return false;
    if (level && i.level !== level) return false;
    return true;
  });
}

export function saveDependency(d) {
  deps.set(d.id, d);
  return d;
}
export function listDependencies({ programId = null } = {}) {
  return [...deps.values()].filter((d) =>
    programId ? d.program_id === programId : true
  );
}

export function saveAllocation(a) {
  allocations.set(a.id, a);
  return a;
}
export function listAllocations({ projectId = null, programId = null } = {}) {
  return [...allocations.values()].filter((a) => {
    if (projectId && a.project_id !== projectId) return false;
    if (programId && a.program_id !== programId) return false;
    return true;
  });
}

export function appendEvent(e) {
  const row = { id: `evt_${events.length + 1}_${Date.now().toString(36)}`, created_at: new Date().toISOString(), ...e };
  events.push(row);
  return row;
}
export function listEvents({ programId = null, projectId = null } = {}) {
  return events.filter((e) => {
    if (programId && e.program_id !== programId) return false;
    if (projectId && e.project_id !== projectId) return false;
    return true;
  });
}

export function saveCheckpoint(c) {
  const row = { id: `cp_${checkpoints.length + 1}`, created_at: new Date().toISOString(), ...c };
  checkpoints.push(row);
  return row;
}
export function listCheckpoints({ programId = null } = {}) {
  return checkpoints.filter((c) => (programId ? c.program_id === programId : true));
}

export function saveHandoff(h) {
  handoffs.set(h.id, h);
  return h;
}
export function listHandoffs({ taskId = null } = {}) {
  return [...handoffs.values()].filter((h) => (taskId ? h.task_id === taskId : true));
}

export function saveReview(r) {
  reviews.set(r.id, r);
  return r;
}
export function listReviews({ itemId = null } = {}) {
  return [...reviews.values()].filter((r) => (itemId ? r.item_id === itemId : true));
}
