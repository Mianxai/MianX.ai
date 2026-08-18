/** Best-effort in-process audit for template intelligence (tests + local). */

const entries = [];

export function __resetTemplateAudit() {
  entries.length = 0;
}

export function recordTemplateAudit(entry) {
  const row = {
    id: `ta_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    ...entry,
  };
  entries.push(row);
  return row;
}

export function listTemplateAudits({ limit = 100 } = {}) {
  return entries.slice(-limit);
}
