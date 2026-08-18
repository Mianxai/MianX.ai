// Provider circuit breaker (per warm instance).
//
// After repeated transient failures the circuit opens and short-circuits
// further Anthropic calls for a cooldown, then admits a single half-open
// probe. State is process-local — Settings reports that honestly. Durable
// shared state is a Founder follow-up once a backend is configured.

export const CIRCUIT_STATES = {
  CLOSED: "closed",
  OPEN: "open",
  HALF_OPEN: "half_open",
};

const DEFAULTS = {
  failureThreshold: 5,
  cooldownMs: 60_000,
  halfOpenSuccesses: 1,
};

let state = CIRCUIT_STATES.CLOSED;
let failures = 0;
let openedAt = 0;
let halfOpenSuccesses = 0;
let options = { ...DEFAULTS };

export function configureCircuitBreaker(overrides = {}) {
  options = { ...DEFAULTS, ...overrides };
}

export function resetCircuitBreaker() {
  state = CIRCUIT_STATES.CLOSED;
  failures = 0;
  openedAt = 0;
  halfOpenSuccesses = 0;
}

export function getCircuitBreakerStatus() {
  maybeTransition();
  return {
    state,
    failures,
    failureThreshold: options.failureThreshold,
    cooldownMs: options.cooldownMs,
    durable: false,
    backend: "in-memory",
  };
}

function maybeTransition(now = Date.now()) {
  if (state === CIRCUIT_STATES.OPEN && now - openedAt >= options.cooldownMs) {
    state = CIRCUIT_STATES.HALF_OPEN;
    halfOpenSuccesses = 0;
  }
}

/**
 * Throws a transient ApiError-compatible object when the circuit is open.
 * Call before issuing a provider request.
 */
export function assertCircuitClosed() {
  maybeTransition();
  if (state === CIRCUIT_STATES.OPEN) {
    const err = new Error(
      "AI provider circuit is open after repeated transient failures. Retry shortly."
    );
    err.code = "PROVIDER_CIRCUIT_OPEN";
    err.status = 503;
    err.transient = true;
    throw err;
  }
}

export function recordCircuitSuccess() {
  maybeTransition();
  if (state === CIRCUIT_STATES.HALF_OPEN) {
    halfOpenSuccesses += 1;
    if (halfOpenSuccesses >= options.halfOpenSuccesses) {
      state = CIRCUIT_STATES.CLOSED;
      failures = 0;
    }
    return;
  }
  failures = 0;
  state = CIRCUIT_STATES.CLOSED;
}

export function recordCircuitFailure({ transient = true } = {}) {
  maybeTransition();
  if (!transient) {
    // Permanent failures do not trip the circuit.
    if (state === CIRCUIT_STATES.HALF_OPEN) {
      state = CIRCUIT_STATES.OPEN;
      openedAt = Date.now();
    }
    return;
  }
  failures += 1;
  if (state === CIRCUIT_STATES.HALF_OPEN || failures >= options.failureThreshold) {
    state = CIRCUIT_STATES.OPEN;
    openedAt = Date.now();
  }
}
