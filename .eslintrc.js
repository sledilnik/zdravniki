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
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    // @TODO: These should be turned "ON" one by one
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
