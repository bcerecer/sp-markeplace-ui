module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['**/lib', '**/node_modules', 'protocol'],
  plugins: ['prettier', 'import', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unexpected-multiline': 'off',
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    'import/prefer-default-export': 0,
    'unused-imports/no-unused-imports': 2,
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    semi: 2,
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            // Restrict importing BN from bn.js
            group: ['bn.js'],
            message: 'Import BN from @drift-labs/sdk instead',
          },
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
