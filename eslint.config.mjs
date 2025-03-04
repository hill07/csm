import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Enhanced ESLint config
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "warn",
      "react/react-in-jsx-scope": "off", // Next.js handles React import
      "@next/next/no-img-element": "off", // Disable if you use <img> instead of <Image>
    },
  },
];

export default eslintConfig;
