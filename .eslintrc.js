module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['jest.config.ts'],
  rules: {

    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
