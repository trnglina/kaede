module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'space-before-function-paren': ['error', {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    'max-len': 'off',
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'always']
  },
};
