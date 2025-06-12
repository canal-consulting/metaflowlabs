import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: {
      commaDangle: 'never',
      braceStyle: '1tbs'
    }
  }
}).overrideRules({
  'import/first': 'off',
  'import/order': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/max-attributes-per-line': ['error', { // Changed
    singleline: { max: 1 },
    multiline: { max: 1 }
  }],
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  'no-restricted-syntax': [
    'error',
    {
      selector: 'Literal[value=/^(text|bg|border|ring)-gray-/]',
      message: 'Use --ui-* tokens instead of raw gray utilities.'
    }
  ]
})
