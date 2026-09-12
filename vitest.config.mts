import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Pinned before Vite resolves anything. Vitest only defaults NODE_ENV to "test"
// when it is unset, and Vercel sets it to "production" for the whole build —
// which `prebuild` runs this suite inside. Inherited, Vite then resolves React's
// production bundle, where `act` throws, and all 19 render tests fail while
// passing locally. `test/environment.test.ts` guards this.
// Next's ambient types declare NODE_ENV read-only. Overriding the ambient value
// is exactly the intent here, so the cast is the point rather than a workaround.
(process.env as Record<string, string>).NODE_ENV = "test";

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
