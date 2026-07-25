// Data-access layer for Mianx Core. Every function obtains the service-role
// Supabase client lazily and throws a controlled 503 when Supabase is not
// configured, so no route instantiates a client at module/build time and a
// missing configuration degrades gracefully instead of crashing.
//
// All queries are project-scoped where the entity has a project_id, and the
// browser never touches these tables directly (RLS + service-role only).

import { getSupabaseAdmin } from "@/lib/supabase";
import { notConfigured, notFound, conflict } from "./errors";

const NOT_CONFIGURED_MESSAGE =
  "Configuration error: Supabase environment variables are not set.";

function client() {
  const admin = getSupabaseAdmin();
  if (!admin) throw notConfigured(NOT_CONFIGURED_MESSAGE);
  return admin;
}

function unwrap({ data, error }) {
  if (error) throw error;
  return data;
}

// ---- organizations --------------------------------------------------------

// Returns a stable default organization, creating it once if needed. The
// runtime is single-tenant in this phase; multi-org isolation is enforced at
// the schema level and ready for later phases.
export async function getOrCreateDefaultOrg() {
  const existing = unwrap(
    await client()
      .from("organizations")
      .select("*")
      .eq("slug", "mianx")
      .maybeSingle()
  );
  if (existing) return existing;
  const created = await client()
    .from("organizations")
    .insert([{ name: "Mianx.ai", slug: "mianx", status: "active" }])
    .select()
    .single();
  // Tolerate a concurrent create (unique slug) by re-reading.
  if (created.error) {
    if (created.error.code === "23505") {
      return unwrap(
        await client().from("organizations").select("*").eq("slug", "mianx").single()
      );
    }
    throw created.error;
  }
  return created.data;
}

// ---- projects -------------------------------------------------------------

export async function listProjects() {
  return unwrap(
    await client()
      .from("projects")
      .select("*")
      .is("archived_at", null)
      .order("created_at", { ascending: false })
  );
}

export async function createProject(row) {
  const { data, error } = await client()
    .from("projects")
    .insert([row])
    .select()
    .single();
  if (error) {
    if (error.code === "23505") {
      throw conflict("A project with this slug already exists in the organization.");
    }
    throw error;
  }
  return data;
}

export async function getProject(id) {
  const row = unwrap(
    await client().from("projects").select("*").eq("id", id).maybeSingle()
  );
  if (!row || row.archived_at) throw notFound("Project not found.");
  return row;
}

export async function updateProject(id, patch) {
  return unwrap(
    await client().from("projects").update(patch).eq("id", id).select().single()
  );
}

export async function archiveProject(id) {
  return updateProject(id, {
    status: "archived",
    archived_at: new Date().toISOString(),
  });
}

export async function updateAgentInstance(id, patch, projectId) {
  let q = client().from("agent_instances").update(patch).eq("id", id);
  if (projectId) q = q.eq("project_id", projectId);
  return unwrap(await q.select("*, agent_definitions(*)").single());
}

const TABLES_WITH_ARCHIVED_AT = new Set([
  "leads",
  "projects",
  "tasks",
  "agent_instances",
]);

/** Count rows by a text status column. Returns { [status]: number }. */
export async function countByStatus(table, { projectId, archivedOnly = false } = {}) {
  let q = client().from(table).select("status");
  if (projectId) q = q.eq("project_id", projectId);
  if (TABLES_WITH_ARCHIVED_AT.has(table)) {
    if (archivedOnly) q = q.not("archived_at", "is", null);
    else q = q.is("archived_at", null);
  }
  const rows = unwrap(await q);
  const out = {};
  for (const row of rows || []) {
    const s = row.status || "unknown";
    out[s] = (out[s] || 0) + 1;
  }
  return out;
}

export async function countActiveProjects() {
  const { count, error } = await client()
    .from("projects")
    .select("id", { count: "exact", head: true })
    .is("archived_at", null)
    .neq("status", "archived");
  if (error) throw error;
  return count || 0;
}

export async function listRecentAudit(limit = 5) {
  return unwrap(
    await client()
      .from("audit_logs")
      .select("id, action, actor, resource_type, resource_id, created_at")
      .order("created_at", { ascending: false })
      .limit(limit)
  );
}

// ---- agent definitions / instances ---------------------------------------

export async function upsertAgentDefinition(row) {
  return unwrap(
    await client()
      .from("agent_definitions")
      .upsert(row, { onConflict: "slug,version" })
      .select()
      .single()
  );
}

export async function listAgentInstances(projectId) {
  return unwrap(
    await client()
      .from("agent_instances")
      .select("*, agent_definitions(*)")
      .eq("project_id", projectId)
      .is("archived_at", null)
      .order("created_at", { ascending: false })
  );
}

export async function getAgentInstance(id, projectId) {
  const row = unwrap(
    await client()
      .from("agent_instances")
      .select("*, agent_definitions(*)")
      .eq("id", id)
      .maybeSingle()
  );
  if (!row || (projectId && row.project_id !== projectId)) {
    throw notFound("Agent instance not found.");
  }
  return row;
}

export async function createAgentInstance(row) {
  return unwrap(
    await client().from("agent_instances").insert([row]).select("*, agent_definitions(*)").single()
  );
}

// ---- tasks ----------------------------------------------------------------

export async function createTask(row) {
  const { data, error } = await client()
    .from("tasks")
    .insert([row])
    .select()
    .single();
  if (error) {
    // Unique violation on (project_id, idempotency_key) → idempotent replay.
    if (error.code === "23505" && row.idempotency_key) {
      const existing = await findTaskByIdempotency(row.project_id, row.idempotency_key);
      if (existing) return { row: existing, created: false };
    }
    throw error;
  }
  return { row: data, created: true };
}

export async function findTaskByIdempotency(projectId, key) {
  return unwrap(
    await client()
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .eq("idempotency_key", key)
      .maybeSingle()
  );
}

export async function getTask(id, projectId) {
  const row = unwrap(
    await client().from("tasks").select("*").eq("id", id).maybeSingle()
  );
  if (!row || (projectId && row.project_id !== projectId)) {
    throw notFound("Task not found.");
  }
  return row;
}

export async function listTasks({ projectId, status } = {}) {
  let q = client().from("tasks").select("*").is("archived_at", null);
  if (projectId) q = q.eq("project_id", projectId);
  if (status) q = q.eq("status", status);
  q = q.order("created_at", { ascending: false });
  return unwrap(await q);
}

export async function updateTask(id, patch) {
  return unwrap(
    await client().from("tasks").update(patch).eq("id", id).select().single()
  );
}

// ---- runs -----------------------------------------------------------------

export async function createRun(row) {
  return unwrap(
    await client().from("agent_runs").insert([row]).select().single()
  );
}

export async function getRun(id, projectId) {
  const row = unwrap(
    await client().from("agent_runs").select("*").eq("id", id).maybeSingle()
  );
  if (!row || (projectId && row.project_id !== projectId)) {
    throw notFound("Run not found.");
  }
  return row;
}

export async function listRuns({ projectId, taskId, status } = {}) {
  let q = client().from("agent_runs").select("*");
  if (projectId) q = q.eq("project_id", projectId);
  if (taskId) q = q.eq("task_id", taskId);
  if (status) q = q.eq("status", status);
  q = q.order("created_at", { ascending: false });
  return unwrap(await q);
}

export async function updateRun(id, patch) {
  return unwrap(
    await client().from("agent_runs").update(patch).eq("id", id).select().single()
  );
}

export async function findRunByIdempotency(taskId, key) {
  if (!key) return null;
  return unwrap(
    await client()
      .from("agent_runs")
      .select("*")
      .eq("task_id", taskId)
      .eq("idempotency_key", key)
      .maybeSingle()
  );
}

// ---- assignments ----------------------------------------------------------

export async function findAssignment(taskId) {
  return unwrap(
    await client()
      .from("task_assignments")
      .select("*")
      .eq("task_id", taskId)
      .neq("status", "released")
      .maybeSingle()
  );
}

export async function createAssignment(row) {
  return unwrap(
    await client().from("task_assignments").insert([row]).select().single()
  );
}

// ---- approvals ------------------------------------------------------------

export async function createApproval(row) {
  return unwrap(
    await client().from("approval_requests").insert([row]).select().single()
  );
}

export async function getApproval(id, projectId) {
  const row = unwrap(
    await client().from("approval_requests").select("*").eq("id", id).maybeSingle()
  );
  if (!row || (projectId && row.project_id !== projectId)) {
    throw notFound("Approval request not found.");
  }
  return row;
}

export async function listApprovals({ projectId, status } = {}) {
  let q = client().from("approval_requests").select("*");
  if (projectId) q = q.eq("project_id", projectId);
  if (status) q = q.eq("status", status);
  q = q.order("created_at", { ascending: false });
  return unwrap(await q);
}

export async function findApprovedApprovalForTask(taskId) {
  return unwrap(
    await client()
      .from("approval_requests")
      .select("*")
      .eq("task_id", taskId)
      .eq("status", "approved")
      .maybeSingle()
  );
}

export async function findPendingApprovalForTask(taskId) {
  return unwrap(
    await client()
      .from("approval_requests")
      .select("*")
      .eq("task_id", taskId)
      .eq("status", "pending")
      .maybeSingle()
  );
}

export async function updateApproval(id, patch) {
  return unwrap(
    await client()
      .from("approval_requests")
      .update(patch)
      .eq("id", id)
      .select()
      .single()
  );
}

// ---- audit ----------------------------------------------------------------

export async function listAuditLogs({ projectId } = {}) {
  let q = client().from("audit_logs").select("*");
  if (projectId) q = q.eq("project_id", projectId);
  q = q.order("created_at", { ascending: false }).limit(200);
  return unwrap(await q);
}

export { conflict };
