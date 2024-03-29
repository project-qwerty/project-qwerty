module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    // customized
    'no-multiple-empty-lines': ['warn', {
      max: 2,
    }],
    'comma-dangle': ['warn', 'always-multiline'],
    'semi': ['warn', 'always'],

    'vue/html-closing-bracket-newline': ['warn', {
      singleline: 'never',
      multiline: 'never',
    }],
    'vue/no-multi-spaces': ['warn', {
      ignoreProperties: true,
    }],
    'vue/multiline-html-element-content-newline': ['warn', {
      allowEmptyLines: true,
    }],
    'vue/html-self-closing': ['warn', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always',
      },
      svg: 'always',
    }],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 999,
      multiline: 1,
    }],
    'vue/html-indent': ['warn', 2, {
      attribute: 2,
    }],

    // disabled
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-default-prop': 'off',
  }
}
