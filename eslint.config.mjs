import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Server components and server actions render on the server, where stdout
    // is a shared log. Route real diagnostics through a dedicated logger rather
    // than leaving stray console calls in rendered code.
    rules: {
      "no-console": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
