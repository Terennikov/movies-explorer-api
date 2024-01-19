module.exports = {
  env: {
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
    'import/extensions': [0, { js: 'always' }],
    'no-unused-vars': ['error', { args: 'none' }],
    'no-console': 'off',
  },
};
