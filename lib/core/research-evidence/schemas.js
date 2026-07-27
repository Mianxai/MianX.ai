import { clip } from "../validate";
import { validationError } from "../errors";

const STATUSES = ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"];
function arr(v, max = 40) {
  if (!Array.isArray(v)) return [];
  return v.map((x) => clip(String(x), 500)).filter(Boolean).slice(0, max);
}

export function validateResearchEvidenceOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const research_status = clip(o.research_status, 40);
  if (!STATUSES.includes(research_status)) {
    errors.research_status = `Must be one of: ${STATUSES.join(", ")}`;
  }
  if (o.invented_citations === true) {
    errors.invented_citations = "Must not invent citations.";
  }
  const out = {
    research_plan: arr(o.research_plan),
    findings: arr(o.findings),
    sources: arr(o.sources),
    source_quality: arr(o.source_quality),
    uncertainties: arr(o.uncertainties),
    handoff: arr(o.handoff),
    research_status,
    invented_citations: false,
  };
  if (!out.research_plan.length) errors.research_plan = "required";
  if (!out.findings.length && !out.uncertainties.length) {
    errors.findings = "findings or uncertainties required";
  }
  if (!out.handoff.length) errors.handoff = "required";
  if (Object.keys(errors).length) throw validationError("Invalid research evidence output.", errors);
  return out;
}
