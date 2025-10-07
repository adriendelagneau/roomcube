import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "src/generated",
      "src/components/ui",
      "src/app/api/webhook/route.ts",
    ],
  },
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript"],
    plugins: ["import"],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],

      // Import sorting rules
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",       // fs, path
            "external",      // react, next
            "internal",      // @/lib, @/components
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
