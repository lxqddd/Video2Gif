import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'curly': 'off',
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'new-cap': 'off',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['error', 'never'],
    'no-debugger': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
    'antfu/top-level-function': 'off',
  },
  vue: {
    overrides: {

    }
  }
})
