import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.{js,jsx}"],
    exclude: [
      "node_modules",
      ".next",
      // WIP Chrome harness experiments — not part of Phase H closeout canonical suite.
      "scripts/browser-harness.test.js",
    ],
    setupFiles: ["./vitest.setup.js"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
