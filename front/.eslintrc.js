module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    requireConfigFile: false,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'react/prop-types': ['off'],
    indent: ['warn', 2],
    'newline-before-return': 'warn',
    'eol-last': 'warn',
    'no-multiple-empty-lines': 'warn',
    'standard/no-callback-literal': ['off'],
    'import/order': [
      'warn',
      {
        groups: [
          'external',
          'sibling',
          'builtin',
          'index',
          'parent',
          'internal',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
