module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'

    // legit changes
    'vue/html-closing-bracket-newline': ['warn', {
      'singleline': 'never',
      'multiline': 'never',
    }],
    'vue/no-multi-spaces': ['warn', {
      'ignoreProperties': true,
    }],
    'vue/multiline-html-element-content-newline': ['warn', {
      'allowEmptyLines': true,
    }],
    'no-multiple-empty-lines': ['warn', {
      'max': 2,
    }],


    'vue/singleline-html-element-content-newline': 'off',

    // temporarily disabled
    'vue/html-indent': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': 'off',
    'vue/order-in-components': 'off',
    'no-undef': 'off',
    'vue/attributes-order': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
  }
}
