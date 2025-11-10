# Contributing to @dunggramer/biomejs-config

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, config files)
- **Describe the behavior you observed** and what you expected
- **Include environment details** (Node version, Biome version, OS)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **Include examples** of how the enhancement would be used

### Proposing Rule Changes

When proposing changes to linting or formatting rules:

1. **Explain the rationale** - Why should the rule be added, changed, or removed?
2. **Provide examples** - Show code that would be affected
3. **Consider impact** - How will this affect existing users?
4. **Check Biome docs** - Ensure the rule exists in Biome and understand its behavior

Example:
```markdown
### Proposal: Change `noConsole` to "warn"

**Rationale**: Console statements should be caught in code review but shouldn't block builds.

**Current behavior**:
- `console.log()` is allowed

**Proposed behavior**:
- `console.log()` triggers a warning

**Impact**: Low - users can override in their config if needed
```

### Pull Requests

1. **Fork the repository** and create your branch from `master`
2. **Make your changes** following our coding standards
3. **Validate your changes** - Ensure the configuration works as expected
4. **Update documentation** if needed (README, CONFIGURATION.md)
5. **Write a clear commit message** following [Conventional Commits](https://www.conventionalcommits.org/)
6. **Submit your pull request**

#### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature or rule change
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no functional changes)
- `refactor`: Code refactoring
- `chore`: Maintenance tasks

**Examples**:
```
feat(rules): add stricter security rules

- Set noDangerouslySetInnerHtml to "error"
- Add noGlobalEval rule
- Update CONFIGURATION.md with explanations

BREAKING CHANGE: noDangerouslySetInnerHtml is now an error
```

```
docs: update migration guide for ESLint users

Add section about migrating from eslint-config-airbnb
```

```
fix(formatter): correct line width setting

Line width was set to 80 but should be 100 according to docs
```

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DungGramer/biomejs-config.git
   cd biomejs-config
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Validate the configuration**
   ```bash
   pnpm run validate
   ```

## Validating Your Changes

### Local Validation

To validate your changes in a real project:

1. **In this repository**, create a package tarball:
   ```bash
   pnpm pack
   ```

2. **In your project**, install the local package:
   ```bash
   npm install /path/to/dunggramer-biomejs-config-1.0.0.tgz
   ```

3. **Create a `biome.jsonc`** in your project:
   ```jsonc
   {
     "extends": ["@dunggramer/biomejs-config"]
   }
   ```

4. **Validate formatting and linting**:
   ```bash
   npx biome check .
   ```

## Documentation

When changing configuration:

1. **Update CONFIGURATION.md** with detailed explanations
2. **Update README.md** if it affects quick start or overview
3. **Add to CHANGELOG.md** under "Unreleased" section
4. **Update examples/** if relevant

## Code Review Process

1. A maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release

## Release Process

Releases are automated using semantic-release:

1. Commit messages determine version bump (major, minor, patch)
2. CHANGELOG is automatically generated
3. Package is published to npm
4. GitHub release is created

## Questions?

Feel free to open an issue with the "question" label if you need help or clarification.

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes (for significant contributions)

Thank you for contributing to make this configuration better! 🎉
