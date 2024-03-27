// @ts-check
import antfu from '@antfu/eslint-config'

import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    rules: {
      'complexity': ['error', 5],
      'nuxt/prefer-import-meta': 'error',
      'perfectionist/sort-objects': 'error',
      'ts/explicit-function-return-type': 'error',
    },
  },
)
  .override(
    'antfu:imports',
    {
      rules: {
        'import/order': ['error', {
          'alphabetize': { caseInsensitive: true, order: 'asc' },
          'groups': ['external', 'builtin', ['sibling', 'parent'], 'index', 'object'],
          'newlines-between': 'always',
          'pathGroups': [
            { group: 'external', pattern: '~/**', position: 'after' },
          ],
        }],
      },
    },
  )
  .append(nuxt())
