// https://blog.csdn.net/Sheng_zhenzhen/article/details/108685176
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    defineEmits: true,
    document: true,
    localStorage: true,
    window: true,
    defineProps: true,
    defineExpose: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    //close lf error
    'linebreak-style': ['off'],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'no-async-promise-executor': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/html-self-closing': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-useless-escape': 'off',
    'no-bitwise': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    'vue/script-setup-uses-vars': ['off'],
    //can config  to 2 if need more then required
    '@typescript-eslint/no-unused-vars': [0],
    'no-param-reassign': ['off']
  }
}
