import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["iife"],
  globalName: "feedback",
  platform: "browser",
  minify: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
