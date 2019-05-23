module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': ['plugin:react/recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
	  'indent': [2, 'tab'],
      'no-tabs': 0,
      'max-len': ['error', { 'code': 120 }],
      'semi': ['error', 'never']
  },
};
