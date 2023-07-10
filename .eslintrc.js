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
      extends: [
        "plugin:prettier/recommended",
        "airbnb-base",
        'airbnb-typescript/base',
        "prettier",
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: './tsconfig.json',
      },
      env: {
        es6: true,
        browser: true,
        node: true,
      },
    },
  ],
  rules: {
    "@html-eslint/indent": ["error", 2],
  },
  root: true,
};
