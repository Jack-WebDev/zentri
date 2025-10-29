import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/**/*.ts",
  sourcemap: true,
  dts: true,
  ignoreWatch: ["**/.turbo/**", "**/dist/**", "**/node_modules/**"],
});
