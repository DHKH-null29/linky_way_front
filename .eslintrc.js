module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    es2020: true,
    jest: true,
  },
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'prettier',
  ],

  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['js', 'jsx'] }],
    // "no-console": ["off"],
    // "import/prefer-default-export": ["off"],
    // "react/jsx-props-no-spreading": [1, { custom: "ignore" }],
  },
};
