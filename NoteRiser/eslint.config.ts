import type { FlatESLintConfigItem } from 'eslint-define-config';

const config: FlatESLintConfigItem[] = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    rules: {},
  },
];

export default config;
