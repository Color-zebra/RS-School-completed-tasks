module.exports = {
  plugins: ["prettier", "@typescript-eslint", "@html-eslint"],
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      env: {
        es6: true,
        browser: true,
        node: true,
      },
      extends: [
        "plugin:prettier/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
    },
  ],
  rules: {
    "@html-eslint/indent": ["error", 2],
  },
  root: true,
};
