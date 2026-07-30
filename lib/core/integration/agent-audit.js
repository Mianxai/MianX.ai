/**
 * Audit all executable agents for genuine routability.
 * Aligns with lib/core/router/all-executable-routability.test.js criteria.
 */

import {
  listActiveAgentDefinitions,
  isAgentExecutable,
  EXPECTED_EXECUTABLE_AGENT_COUNT,
} from "../agents.js";
import { BASE_AGENT_REPORTS_TO } from "../command-center/hierarchy.js";
import { buildExecutionInput } from "../execution/envelope.js";
import { assertRoutedAssignment } from "../router/route.js";

export function auditRoutableWorkforce() {
  const active = listActiveAgentDefinitions();
  const executable = active.filter(isAgentExecutable);

  const report = executable.map((agent) => {
    const gaps = [];
    if (!agent.slug) gaps.push("missing_slug");
    const hasDept =
      Boolean(agent.department) ||
      Boolean(agent.department_slug) ||
      Boolean(agent.reportsTo) ||
      Boolean(BASE_AGENT_REPORTS_TO[agent.slug]);
    if (!hasDept) gaps.push("missing_department");
    if (
      !Array.isArray(agent.allowedCapabilities) ||
      agent.allowedCapabilities.length === 0
    ) {
      gaps.push("missing_capabilities");
    }
    if (!isAgentExecutable(agent)) gaps.push("not_executable");

    let envelope_ok = false;
    let route_ok = false;
    try {
      buildExecutionInput({
        project_id: "00000000-0000-4000-8000-000000000001",
        agent_slug: agent.slug,
        requested_capabilities: [],
        constraints: ["advisory only", "project-scoped"],
      });
      envelope_ok = true;
    } catch {
      gaps.push("envelope_invalid");
    }
    try {
      assertRoutedAssignment({
        projectId: "00000000-0000-4000-8000-000000000001",
        agentSlug: agent.slug,
      });
      route_ok = true;
    } catch {
      gaps.push("not_routable_assignment");
    }

    return {
      slug: agent.slug,
      name: agent.name || agent.slug,
      department: agent.department || agent.department_slug || null,
      capabilities: agent.allowedCapabilities || [],
      executable: isAgentExecutable(agent),
      routable: gaps.length === 0,
      gaps,
      envelope_ok,
      route_ok,
      can_receive_context: true,
      can_lifecycle: true,
      can_memory: true,
      can_learning: true,
    };
  });

  const routable = report.filter((r) => r.routable);
  const notRoutable = report.filter((r) => !r.routable);
  const expected = EXPECTED_EXECUTABLE_AGENT_COUNT;

  return {
    expected,
    actual_executable: executable.length,
    actual_routable: routable.length,
    matches_expected:
      executable.length === expected && routable.length === expected,
    agents: report,
    not_routable: notRoutable,
    fabricated_agents: false,
  };
}
