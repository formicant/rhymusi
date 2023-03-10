module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      extends: [
        'airbnb-typescript',
      ],
      files: [
        '*.ts',
        '*.tsx',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-multi-spaces': 'off',
    'key-spacing': ['error', { mode: 'minimum' }],
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      // 'ForOfStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  plugins: ['only-warn'],
};
