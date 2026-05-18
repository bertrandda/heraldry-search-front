import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['build/**/*', 'node_modules/**/*', 'functions/edge/**/*', '.netlify/**/*']),
  {
    extends: [
      js.configs.recommended,
      stylistic.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat['recommended-latest'],
    ],

    plugins: {
      js,
      react,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        requireConfigFile: false,
      },
    },

    settings: {
      react: {
        version: '19',
      },
    },

    rules: {
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
])
