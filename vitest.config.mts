import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Test the seams this codebase owns — schemas, formatters, content data shape,
// server-action result mapping, form behaviour. Do not re-test Next.js, Base UI
// or shadcn primitives.
//
// .mts, not .ts: package.json has no `"type": "module"`, so Vite's native
// config loader would treat a .ts config as CommonJS and reject the ESM syntax.
export default defineConfig({
  plugins: [react()],
  // Mirrors tsconfig's `"@/*": ["./*"]`. Native since Vite 7 — no
  // vite-tsconfig-paths plugin needed.
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
