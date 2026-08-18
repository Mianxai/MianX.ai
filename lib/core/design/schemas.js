import { clip } from "../validate";
import { validationError } from "../errors";

const STATUSES = ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"];
function arr(v, max = 40) {
  if (!Array.isArray(v)) return [];
  return v.map((x) => clip(String(x), 500)).filter(Boolean).slice(0, max);
}

export function validateDesignOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const design_status = clip(o.design_status, 40);
  if (!STATUSES.includes(design_status)) {
    errors.design_status = `Must be one of: ${STATUSES.join(", ")}`;
  }
  const out = {
    interface_findings: arr(o.interface_findings),
    design_system_notes: arr(o.design_system_notes),
    usability_findings: arr(o.usability_findings),
    accessibility_findings: arr(o.accessibility_findings),
    handoff: arr(o.handoff),
    design_status,
    public_site_locked: o.public_site_locked !== false,
  };
  if (!out.handoff.length) errors.handoff = "handoff required";
  if (o.public_site_locked === false) {
    errors.public_site_locked = "Design agent must acknowledge public site lock.";
  }
  if (Object.keys(errors).length) throw validationError("Invalid design output.", errors);
  return out;
}
