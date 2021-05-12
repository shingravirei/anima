module.exports = {
    env: {
        commonjs: true,
        node: true,
        es2020: true,
        jest: true
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        project: ['./tsconfig.json', './prettier.config.js']
    },
    rules: {}
};
