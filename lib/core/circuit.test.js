import { describe, it, expect, beforeEach } from "vitest";
import {
  assertCircuitClosed,
  recordCircuitFailure,
  recordCircuitSuccess,
  resetCircuitBreaker,
  configureCircuitBreaker,
  getCircuitBreakerStatus,
  CIRCUIT_STATES,
} from "./circuit";

beforeEach(() => {
  resetCircuitBreaker();
  configureCircuitBreaker({ failureThreshold: 3, cooldownMs: 60_000 });
});

describe("provider circuit breaker", () => {
  it("stays closed under the failure threshold", () => {
    recordCircuitFailure({ transient: true });
    recordCircuitFailure({ transient: true });
    expect(getCircuitBreakerStatus().state).toBe(CIRCUIT_STATES.CLOSED);
    expect(() => assertCircuitClosed()).not.toThrow();
  });

  it("opens after repeated transient failures and blocks calls", () => {
    recordCircuitFailure({ transient: true });
    recordCircuitFailure({ transient: true });
    recordCircuitFailure({ transient: true });
    expect(getCircuitBreakerStatus().state).toBe(CIRCUIT_STATES.OPEN);
    expect(() => assertCircuitClosed()).toThrow(/circuit is open/i);
  });

  it("does not trip on permanent failures from closed state", () => {
    recordCircuitFailure({ transient: false });
    recordCircuitFailure({ transient: false });
    recordCircuitFailure({ transient: false });
    expect(getCircuitBreakerStatus().state).toBe(CIRCUIT_STATES.CLOSED);
  });

  it("resets failure count on success", () => {
    recordCircuitFailure({ transient: true });
    recordCircuitFailure({ transient: true });
    recordCircuitSuccess();
    expect(getCircuitBreakerStatus().failures).toBe(0);
  });
});
