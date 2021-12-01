module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['react', 'prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    "ecmaVersion": 2021,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off'
  },
  'settings': {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
};
