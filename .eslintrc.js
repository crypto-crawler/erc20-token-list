const eslintrc = {
  extends: ['airbnb-base', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ['markdown', 'jest', 'prettier'],
  rules: {
    'no-console': 'off',
  },
};

module.exports = eslintrc;
