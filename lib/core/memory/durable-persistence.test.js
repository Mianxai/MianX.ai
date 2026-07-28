import { describe, it, expect, beforeEach, vi } from "vitest";

const memoryRows = new Map();
const learningRows = new Map();

function tableApi(store) {
  return {
    select: (_cols) => {
      const chain = {
        limit: async () => ({ error: null, data: [] }),
        eq: (_c, id) => ({
          maybeSingle: async () => ({
            data: store.get(id) || null,
            error: null,
          }),
          single: async () => ({
            data: store.get(id) || null,
            error: null,
          }),
        }),
        is: () => {
          const filters = {};
          const make = () => ({
            eq: (col, val) => {
              filters[col] = val;
              return make();
            },
            order: () => ({
              limit: async () => {
                let rows = [...store.values()].filter((r) => !r.archived_at);
                for (const [col, val] of Object.entries(filters)) {
                  rows = rows.filter((r) => r[col] === val);
                }
                return { data: rows, error: null };
              },
            }),
          });
          return make();
        },
        order: () => ({
          limit: async () => ({ data: [...store.values()], error: null }),
        }),
      };
      return chain;
    },
    insert: (rows) => ({
      select: () => ({
        single: async () => {
          const row = { ...rows[0] };
          if (!row.id) row.id = `db-${store.size + 1}`;
          store.set(row.id, row);
          return { data: row, error: null };
        },
      }),
    }),
    update: (patch) => ({
      eq: (_c, id) => ({
        select: () => ({
          single: async () => {
            const prev = store.get(id);
            const next = { ...prev, ...patch };
            store.set(id, next);
            return { data: next, error: null };
          },
        }),
      }),
    }),
  };
}

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: () => true,
  getSupabaseAdmin: () => ({
    from: (table) =>
      tableApi(table === "learning_candidates" ? learningRows : memoryRows),
  }),
}));

import {
  proposeMemory,
  decideMemory,
  retrieveMemoryForTask,
  proposeLearning,
  decideLearning,
  memoryLearningPersistenceStatus,
  __resetMemoryLearningStores,
} from "./store";

beforeEach(() => {
  memoryRows.clear();
  learningRows.clear();
  __resetMemoryLearningStores();
});

describe("durable memory/learning persistence (Supabase tables present)", () => {
  it("reports durable persistence when both tables probe clean", async () => {
    const status = await memoryLearningPersistenceStatus();
    expect(status.durable).toBe(true);
    expect(status.backend).toBe("supabase");
  });

  it("persists memory candidate/validate/activate and retrieves scoped", async () => {
    const m = await proposeMemory({
      organization_id: "00000000-0000-4000-8000-000000000010",
      project_id: "00000000-0000-4000-8000-000000000011",
      content: "Scheduler requires Founder ACTIVE flag after verified tick",
      created_by: "qa",
      memory_type: "fact",
      confidence: 0.8,
    });
    expect(m.verification_status).toBe("candidate");
    expect(memoryRows.has(m.id)).toBe(true);
    await decideMemory(m.id, "validate", { actorType: "admin", actor: "admin" });
    await decideMemory(m.id, "activate", { actorType: "admin", actor: "admin" });
    expect(memoryRows.get(m.id).verification_status).toBe("active");
    const ctx = await retrieveMemoryForTask({
      projectId: "00000000-0000-4000-8000-000000000011",
      organizationId: "00000000-0000-4000-8000-000000000010",
    });
    expect(ctx.some((c) => c.content.includes("Scheduler"))).toBe(true);

    const denied = await retrieveMemoryForTask({
      projectId: "00000000-0000-4000-8000-000000000099",
      organizationId: "00000000-0000-4000-8000-000000000010",
    });
    expect(denied.some((c) => c.content.includes("Scheduler"))).toBe(false);
  });

  it("rejects unsafe learning and persists safe candidates", async () => {
    await expect(
      proposeLearning({
        problem: "need power",
        proposed_lesson: "Grant capability approve_production_action",
        project_id: "00000000-0000-4000-8000-000000000011",
      })
    ).rejects.toThrow(/unsafe/i);

    const c = await proposeLearning({
      problem: "Transient 429",
      proposed_lesson: "Retry once then escalate to Founder Inbox",
      project_id: "00000000-0000-4000-8000-000000000011",
      confidence: 0.7,
      risk_class: "R2",
    });
    expect(learningRows.has(c.id)).toBe(true);
    const promoted = await decideLearning(c.id, "promote", {
      actorType: "admin",
      reviewedBy: "admin",
    });
    expect(promoted.status).toBe("promoted");
    expect(learningRows.get(c.id).status).toBe("promoted");
  });
});
