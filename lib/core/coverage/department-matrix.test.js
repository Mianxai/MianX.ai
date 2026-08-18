import { describe, it, expect } from "vitest";
import {
  buildDepartmentCoverageMatrix,
  DEPARTMENT_COVERAGE_EXPECTATIONS,
} from "./department-matrix";
import { DEPARTMENTS } from "@/lib/workforce/departments";

describe("20-department functional coverage", () => {
  it("covers every department with expectations and no capacity_only leftovers", () => {
    expect(Object.keys(DEPARTMENT_COVERAGE_EXPECTATIONS).sort()).toEqual(
      DEPARTMENTS.map((d) => d.slug).sort()
    );
    const matrix = buildDepartmentCoverageMatrix();
    expect(matrix.unexplainedCapacityOnly).toEqual([]);
    expect(matrix.allCovered).toBe(true);
    expect(matrix.figures.maximumCapacity).toBe(445);
    expect(matrix.figures.slotContribution).toBe(445);
    expect(matrix.figures.namedDefinitions).toBeGreaterThanOrEqual(54);
    expect(matrix.figures.executableDefinitions).toBeGreaterThanOrEqual(38);
    for (const row of matrix.departments) {
      expect(row.ok, `${row.department}: ${row.reason}`).toBe(true);
      expect(row.runtimeAgents.length).toBeGreaterThan(0);
    }
  });

  it("marks finance/hr/legal as advisory-only and leadership as human-gated", () => {
    expect(DEPARTMENT_COVERAGE_EXPECTATIONS.finance).toBe("ADVISORY_ONLY");
    expect(DEPARTMENT_COVERAGE_EXPECTATIONS.hr).toBe("ADVISORY_ONLY");
    expect(DEPARTMENT_COVERAGE_EXPECTATIONS.legal).toBe("ADVISORY_ONLY");
    expect(DEPARTMENT_COVERAGE_EXPECTATIONS.leadership).toBe("HUMAN_GATED");
    expect(DEPARTMENT_COVERAGE_EXPECTATIONS.design).toBe("FUNCTIONAL");
    expect(DEPARTMENT_COVERAGE_EXPECTATIONS.research).toBe("FUNCTIONAL");
  });
});
