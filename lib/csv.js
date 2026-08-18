// Pure CSV-building helper so the admin dashboard's export button can be
// unit tested without touching the DOM/Blob APIs.

export function toCsv(rows, columns) {
  const escape = (cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`;
  const header = columns.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((row) => columns.map((c) => escape(c.value(row))).join(","))
    .join("\n");
  return `${header}\n${body}`;
}

export const LEAD_CSV_COLUMNS = [
  { label: "ID", value: (l) => l.id },
  { label: "Name", value: (l) => l.name },
  { label: "Email", value: (l) => l.email },
  { label: "Company", value: (l) => l.company },
  { label: "Phone", value: (l) => l.phone },
  { label: "Industry", value: (l) => l.industry },
  { label: "Message", value: (l) => l.need },
  { label: "Status", value: (l) => l.status },
  { label: "Created At", value: (l) => l.created_at },
];

export function leadsToCsv(leads) {
  return toCsv(leads, LEAD_CSV_COLUMNS);
}
