// In-process + optional Supabase persistence for memory/learning.
// When tables are absent, operations stay in-memory for tests / degrade gracefully.

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { buildMemoryCandidate, nextMemoryStatus, canPromoteMemory } from "./write";
import { selectMemoryContext, assertNoCrossProjectLeak } from "./retrieve";
import {
  buildLearningCandidate,
  applyLearningDecision,
  assertLearningPromotion,
} from "../learning/candidates";

/** Test / fallback stores (never cross-request in serverless — tests only). */
const memoryStore = new Map();
const learningStore = new Map();

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

async function tablesAvailable() {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) return false;
  try {
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("memory_entries").select("id").limit(1);
    if (error) return false;
    return true;
  } catch {
    return false;
  }
}

export async function proposeMemory(raw) {
  const row = buildMemoryCandidate(raw);
  const id = uid("mem");
  const entry = {
    id,
    ...row,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (await tablesAvailable()) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.from("memory_entries").insert([entry]).select().single();
    if (error) throw error;
    return data;
  }

  memoryStore.set(id, entry);
  return entry;
}

export async function decideMemory(id, decision, { actorType = "admin", actor = null } = {}) {
  let entry = memoryStore.get(id) || null;
  if (!entry && (await tablesAvailable())) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.from("memory_entries").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    entry = data;
  }
  if (!entry) throw Object.assign(new Error("Memory not found"), { status: 404 });

  if (decision === "activate" || decision === "validate") {
    if (!canPromoteMemory(entry, { actorType })) {
      const err = new Error("Memory promotion not permitted for this actor/sensitivity.");
      err.status = 403;
      throw err;
    }
  }

  const verification_status = nextMemoryStatus(entry.verification_status, decision);
  const next = {
    ...entry,
    verification_status,
    verified_by: actor || entry.verified_by,
    updated_at: new Date().toISOString(),
  };

  if (memoryStore.has(id)) memoryStore.set(id, next);
  if (await tablesAvailable()) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("memory_entries")
      .update({
        verification_status: next.verification_status,
        verified_by: next.verified_by,
        updated_at: next.updated_at,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  return next;
}

export async function listMemory({ projectId = null, organizationId = null } = {}) {
  if (await tablesAvailable()) {
    const admin = getSupabaseAdmin();
    let q = admin.from("memory_entries").select("*").is("archived_at", null);
    if (organizationId) q = q.eq("organization_id", organizationId);
    if (projectId) q = q.eq("project_id", projectId);
    const { data, error } = await q.order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    return data || [];
  }
  return [...memoryStore.values()].filter((e) => {
    if (projectId && e.project_id !== projectId) return false;
    if (organizationId && e.organization_id !== organizationId) return false;
    return !e.archived_at;
  });
}

export async function retrieveMemoryForTask(args) {
  const entries = await listMemory({
    projectId: args.projectId,
    organizationId: args.organizationId,
  });
  const selected = selectMemoryContext({
    entries,
    requesterScope: args.requesterScope || "project",
    orgId: args.organizationId,
    projectId: args.projectId,
    agentSlug: args.agentSlug,
    maxItems: args.maxItems || 12,
    includeTypes: args.includeTypes || null,
  });
  assertNoCrossProjectLeak(
    selected.map((s) => ({
      project_id: entries.find((e) => e.id === s.memory_id)?.project_id,
      scope_type: s.scope_type,
    })),
    args.projectId
  );
  return selected;
}

export async function proposeLearning(raw) {
  const row = buildLearningCandidate(raw);
  const id = uid("learn");
  const entry = {
    id,
    ...row,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  if (await tablesAvailable()) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.from("learning_candidates").insert([entry]).select().single();
    if (error) throw error;
    return data;
  }
  learningStore.set(id, entry);
  return entry;
}

export async function decideLearning(id, decision, opts = {}) {
  let entry = learningStore.get(id) || null;
  if (!entry && (await tablesAvailable())) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("learning_candidates")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    entry = data;
  }
  if (!entry) throw Object.assign(new Error("Learning candidate not found"), { status: 404 });

  let working = entry;
  if (decision === "promote" && entry.status !== "validated") {
    working = applyLearningDecision(entry, "validate", opts);
  }
  if (decision === "promote") {
    assertLearningPromotion(
      { ...working, status: "validated" },
      { actorType: opts.actorType || "admin" }
    );
  }
  const next = applyLearningDecision(working, decision, opts);
  next.updated_at = new Date().toISOString();

  if (learningStore.has(id)) {
    learningStore.set(id, next);
  }
  if (await tablesAvailable()) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("learning_candidates")
      .update({
        status: next.status,
        reviewed_by: next.reviewed_by,
        review_note: next.review_note,
        updated_at: next.updated_at,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  return next;
}

export async function listLearning({ projectId = null } = {}) {
  if (await tablesAvailable()) {
    const admin = getSupabaseAdmin();
    let q = admin.from("learning_candidates").select("*").is("archived_at", null);
    if (projectId) q = q.eq("project_id", projectId);
    const { data, error } = await q.order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    return data || [];
  }
  return [...learningStore.values()].filter((e) =>
    projectId ? e.project_id === projectId : true
  );
}

/** Test helper */
export function __resetMemoryLearningStores() {
  memoryStore.clear();
  learningStore.clear();
}
