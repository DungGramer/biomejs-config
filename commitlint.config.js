/**
 * Commitlint configuration
 * Enforces Conventional Commits format
 *
 * Format: <type>(<scope>): <subject>
 *
 * Examples:
 * - feat: add new security rule
 * - fix(formatter): correct line width
 * - docs: update migration guide
 * - chore(deps): update dependencies
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type must be one of these
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, no functional changes)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system changes
        'ci',       // CI/CD changes
        'chore',    // Maintenance tasks
        'revert'    // Revert previous commit
      ]
    ],
    // Subject must not be empty
    'subject-empty': [2, 'never'],
    // Subject must not end with period
    'subject-full-stop': [2, 'never', '.'],
    // Subject must be lowercase
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    // Body must have blank line before it
    'body-leading-blank': [1, 'always'],
    // Footer must have blank line before it
    'footer-leading-blank': [1, 'always'],
    // Max length for header
    'header-max-length': [2, 'always', 72],
    // Scope can be empty
    'scope-empty': [0],
    // Allowed scopes
    'scope-enum': [
      1,
      'always',
      [
        'rules',     // Rule changes
        'formatter', // Formatter settings
        'deps',      // Dependencies
        'ci',        // CI/CD
        'docs',      // Documentation
        'examples',  // Example configurations
        'tests',     // Tests
        'release'    // Release-related
      ]
    ]
  }
}
