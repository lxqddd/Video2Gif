import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'curly': 'off',
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'new-cap': 'off',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
  },
})
