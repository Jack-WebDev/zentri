import base from "@zentri/testkit/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

// Base is a plain object, so we can read its test.setupFiles
type TestConfigShape = { test?: { setupFiles?: readonly string[] } };

const baseConfig = base as TestConfigShape;
const baseSetup = baseConfig.test?.setupFiles ?? [];

export default mergeConfig(
  base,
  defineConfig({
    test: {
      setupFiles: [
        ...baseSetup,
        "./tests/setup.auth.mock.ts", // your app-specific mock
      ],
    },
  }),
);
