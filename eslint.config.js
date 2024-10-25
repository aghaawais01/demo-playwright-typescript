const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // Indentation
      'indent': ['error', 2],
      
      // Semicolons
      'semi': ['error', 'always'],
      
      // Quotes
      'quotes': ['error', 'single'],
      
      // No unused variables
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      
      // Consistent type assertions
      '@typescript-eslint/consistent-type-assertions': 'error',
      
      // No explicit any
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Consistent interface and type naming
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'interface',
          'format': ['PascalCase'],
          'custom': {
            'regex': '^I[A-Z]',
            'match': true
          }
        }
      ],
      
      // Max line length
      'max-len': ['warn', { 'code': 100 }],
      
      // Trailing commas
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
];
