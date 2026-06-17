import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
  // 1. 全局忽略
  { ignores: ['dist/**', 'node_modules/**', '*.min.js'] },

  // 2. JS/TS 基础规则
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'off' // TS 项目关闭此规则，由 @typescript-eslint 接管
    }
  },

  // 3. Vue 文件专用配置 (关键优化点)
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // <script lang="ts"> 使用 TS 解析器
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      },
      globals: { ...globals.browser }
    },
    plugins: { vue: pluginVue },
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off' // 按需关闭组件命名限制
    }
  }
]
