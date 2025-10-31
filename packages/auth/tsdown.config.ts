import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/server.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    outDir: "dist",
  },
  {
    entry: ["src/client.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    outDir: "dist",
  },
]);
