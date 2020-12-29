module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@souche-f2e/eslint-config-frontend'],
    rules: {
        'no-console': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'template-curly-spacing': 'off',
        indent: [
            'error',
            4,
            {
                ignoredNodes: ['TemplateLiteral'],
                SwitchCase: 1
            }
        ],
        'arrow-parens': 0,
        'no-mixed-operators': 0,
        'no-multi-assign': 0,
        'object-curly-newline': 0,
        'no-self-assign': 0,
        'no-unused-vars': 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: ['markdown']
};
