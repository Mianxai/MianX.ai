export { listIndustryTemplates, getIndustryTemplate, INDUSTRY_TEMPLATES } from "./industries";
export {
  listBusinessModelTemplates,
  getBusinessModelTemplate,
  BUSINESS_MODEL_TEMPLATES,
} from "./business-models";
export {
  listCapabilityTemplates,
  getCapabilityTemplate,
  CAPABILITY_TEMPLATES,
} from "./capabilities";
export {
  listDepartmentTemplates,
  getDepartmentTemplate,
  DEPARTMENT_TEMPLATES,
} from "./departments";
export { listModuleTemplates, getModuleTemplate, MODULE_TEMPLATES } from "./modules";
export {
  listWorkflowTemplates,
  getWorkflowTemplate,
  WORKFLOW_TEMPLATES,
} from "./workflows";
export {
  listComplianceTemplates,
  getComplianceTemplate,
  COMPLIANCE_TEMPLATES,
} from "./compliance";
export {
  listArchitectureTemplates,
  getArchitectureTemplate,
  ARCHITECTURE_TEMPLATES,
} from "./architecture";
export { listRiskTemplates, getRiskTemplate, RISK_TEMPLATES } from "./risks";
export { listKpiTemplates, getKpiTemplate, KPI_TEMPLATES } from "./kpis";
export { listCatalogRelations, CATALOG_RELATIONS } from "./relations";

import { listIndustryTemplates } from "./industries";
import { listBusinessModelTemplates } from "./business-models";
import { listCapabilityTemplates } from "./capabilities";
import { listDepartmentTemplates } from "./departments";
import { listModuleTemplates } from "./modules";
import { listWorkflowTemplates } from "./workflows";
import { listComplianceTemplates } from "./compliance";
import { listArchitectureTemplates } from "./architecture";
import { listRiskTemplates } from "./risks";
import { listKpiTemplates } from "./kpis";
import { registerTemplateVersion } from "../versioning";

/** Register all seed catalog templates into the version store (idempotent-ish). */
export function seedCatalogVersions({ actor = "catalog-seed" } = {}) {
  const all = [
    ...listIndustryTemplates({ includeDeprecated: true }),
    ...listBusinessModelTemplates({ includeDeprecated: true }),
    ...listCapabilityTemplates({ includeDeprecated: true }),
    ...listDepartmentTemplates({ includeDeprecated: true }),
    ...listModuleTemplates({ includeDeprecated: true }),
    ...listWorkflowTemplates({ includeDeprecated: true }),
    ...listComplianceTemplates({ includeDeprecated: true }),
    ...listArchitectureTemplates({ includeDeprecated: true }),
    ...listRiskTemplates({ includeDeprecated: true }),
    ...listKpiTemplates({ includeDeprecated: true }),
  ];
  for (const t of all) registerTemplateVersion(t, { actor });
  return all.length;
}

export function overviewCounts() {
  return {
    industries: listIndustryTemplates().length,
    business_models: listBusinessModelTemplates().length,
    capabilities: listCapabilityTemplates().length,
    departments: listDepartmentTemplates().length,
    modules: listModuleTemplates().length,
    workflows: listWorkflowTemplates().length,
    compliance: listComplianceTemplates().length,
    architecture: listArchitectureTemplates().length,
    risks: listRiskTemplates().length,
    kpis: listKpiTemplates().length,
  };
}
