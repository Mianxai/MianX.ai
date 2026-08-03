import { describe, it, expect } from "vitest";
import {
  normalizeWorkforceSummary,
  CURRENT_WORKFORCE_SUMMARY_FIXTURE,
} from "./summary-normalize.js";

describe("normalizeWorkforceSummary", () => {
  it("preserves Production truth 445/445/445 and trusted zeros", () => {
    const s = normalizeWorkforceSummary(CURRENT_WORKFORCE_SUMMARY_FIXTURE);
    expect(s.state).toBe("ready");
    expect(s.displays.registered).toBe("445");
    expect(s.displays.persisted).toBe("445");
    expect(s.displays.ready).toBe("445");
    expect(s.displays.allocated).toBe("0");
    expect(s.displays.active).toBe("0");
    expect(s.displays.liveTested).toBe("0");
    expect(s.displays.providerName).toBe("none");
    expect(s.displays.liveExecutionReady).toBe("false");
  });

  it("maps missing counters to Unavailable, not 0", () => {
    const s = normalizeWorkforceSummary({});
    expect(s.displays.registered).toBe("Unavailable");
    expect(s.displays.persisted).toBe("Unavailable");
    expect(s.displays.ready).toBe("Unavailable");
    expect(s.displays.allocated).toBe("Unavailable");
    expect(s.displays.active).toBe("Unavailable");
    expect(s.displays.liveTested).toBe("Unavailable");
    expect(s.displays.providerName).toBe("Unavailable");
    expect(s.displays.liveExecutionReady).toBe("Unavailable");
  });

  it("accepts string numerics and rejects invalid / negative values", () => {
    expect(normalizeWorkforceSummary({ registered: "445" }).registered).toBe(445);
    expect(normalizeWorkforceSummary({ allocated: "0" }).displays.allocated).toBe("0");
    expect(normalizeWorkforceSummary({ active: "abc" }).displays.active).toBe(
      "Unavailable"
    );
    expect(normalizeWorkforceSummary({ liveTested: -1 }).displays.liveTested).toBe(
      "Unavailable"
    );
  });

  it("keeps incomplete fields independent", () => {
    const s = normalizeWorkforceSummary({
      registered: 445,
      persisted: null,
      ready: undefined,
      allocated: 0,
    });
    expect(s.displays.registered).toBe("445");
    expect(s.displays.persisted).toBe("Unavailable");
    expect(s.displays.ready).toBe("Unavailable");
    expect(s.displays.allocated).toBe("0");
    expect(s.displays.active).toBe("Unavailable");
  });

  it("loading and error settle without inventing counts", () => {
    const loading = normalizeWorkforceSummary({}, { loading: true });
    expect(loading.state).toBe("loading");
    expect(loading.displays.allocated).toBe("Loading…");
    const err = normalizeWorkforceSummary({}, { error: "boom" });
    expect(err.state).toBe("error");
    expect(err.displays.active).toBe("Unavailable");
    expect(err.error).toBe("boom");
  });

  it("keeps inventory distinct from a future live fixture", () => {
    const s = normalizeWorkforceSummary({
      registered: 445,
      persisted: 445,
      ready: 445,
      allocated: 2,
      active: 1,
      liveTested: 1,
      providerName: "none",
      liveExecutionReady: false,
    });
    expect(s.displays.registered).toBe("445");
    expect(s.displays.allocated).toBe("2");
    expect(s.displays.active).toBe("1");
    expect(s.displays.liveTested).toBe("1");
    expect(s.registered).not.toBe(s.active);
  });
});
