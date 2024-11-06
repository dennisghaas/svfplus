import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintParser from '@typescript-eslint/parser';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parser: eslintParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error',
    },
  },
];
