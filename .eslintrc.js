module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'

    // legit changes
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never',
    }],
    'vue/no-multi-spaces': ['error', {
      'ignoreProperties': true,
    }],



    // temporarily disabled
    'vue/html-indent': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': 'off',
    'vue/order-in-components': 'off',
    'no-undef': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/multiline-html-element-content-newline': 'off',
  }
}
