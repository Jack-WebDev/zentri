import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    environment: "node",
    globals: true,

    setupFiles: [resolve(__dirname, "./src/vitest.setup.ts")],
    coverage: { provider: "v8", reporter: ["text", "lcov"] },
    pool: "threads",
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
