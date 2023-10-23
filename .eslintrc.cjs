module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', '@types'],
      },
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/pages*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/services*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/constants*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/types*',
            group: 'internal',
            position: 'after',
          },
        ],

        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};
