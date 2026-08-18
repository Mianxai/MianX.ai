// Temporary bootstrap for unit/integration tests that mock sessions without
// a memberships table. Production must unset MIANX_ADMIN_BOOTSTRAP after the
// Founder membership exists.
if (process.env.MIANX_ADMIN_BOOTSTRAP === undefined) {
  process.env.MIANX_ADMIN_BOOTSTRAP = "1";
}

// Global test setup. Only pulls in jest-dom matchers + RTL auto-cleanup when
// a DOM (jsdom) environment is active for a given test file, so plain
// Node-environment API route tests are unaffected.
if (typeof document !== "undefined") {
  await import("@testing-library/jest-dom/vitest");
  const { afterEach } = await import("vitest");
  const { cleanup } = await import("@testing-library/react");
  afterEach(() => {
    cleanup();
  });

  // jsdom has no IntersectionObserver/matchMedia; provide harmless defaults
  // so components using them (scroll-reveal, reduced-motion checks) don't
  // crash in tests that don't explicitly mock them.
  if (typeof window.IntersectionObserver === "undefined") {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  if (typeof window.matchMedia === "undefined") {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    });
  }
}
