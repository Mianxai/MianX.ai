/** Analytics metric scope labels for Founder surfaces. */
export const ANALYTICS_SCOPE_LEGEND = {
  organisation: "Organisation-wide (not filtered by project_id)",
  selected_project: "Selected project only",
  integration: "Integration / Founder Proof",
  runtime: "Agent Runtime",
};

export function analyticsMetricOk(value, scope) {
  return { available: true, value, scope, errorCode: null };
}

export function analyticsMetricFail(code, scope) {
  return { available: false, value: null, scope, errorCode: code };
}
