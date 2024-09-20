// eslint.config.mjs

import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";


const jsConfig = jsPlugin.configs.recommended;

const tsConfig = tsPlugin.configs.recommended;

const combinedRules = {
  ...jsConfig.rules,
  ...tsConfig.rules,

  "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
};


export default [
  {
    // Apply to JavaScript and TypeScript files
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for TypeScript files
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js: jsPlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: combinedRules, // Apply combined rules
  },
];
