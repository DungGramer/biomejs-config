# @dunggramer/biomejs-config

> Shareable [Biome](https://biomejs.dev) configuration for JavaScript, TypeScript, and React projects

[![npm version](https://badge.fury.io/js/@dunggramer%2Fbiomejs-config.svg)](https://www.npmjs.com/package/@dunggramer/biomejs-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/DungGramer/biomejs-config/actions/workflows/ci.yml/badge.svg)](https://github.com/DungGramer/biomejs-config/actions)

A comprehensive, opinionated Biome configuration that provides consistent code formatting and linting rules for modern JavaScript and TypeScript projects. This configuration emphasizes code quality, security, and maintainability while remaining flexible enough to customize for your specific needs.

## Features

- **🎯 Opinionated but flexible** - Sensible defaults with easy customization
- **⚡️ Fast** - Powered by Biome's Rust-based tooling
- **🔒 Security-focused** - Strict rules for common security pitfalls
- **📦 React-ready** - Includes React-specific linting rules
- **🧪 Test-friendly** - Special configurations for test files
- **🎨 Consistent formatting** - 2 spaces, single quotes, trailing commas

## Installation

Install the package along with Biome:

```bash
# Using npm
npm install -D @dunggramer/biomejs-config @biomejs/biome

# Using pnpm
pnpm add -D @dunggramer/biomejs-config @biomejs/biome

# Using yarn
yarn add -D @dunggramer/biomejs-config @biomejs/biome
```

## Quick Start

Create a `biome.jsonc` file in your project root:

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "extends": ["@dunggramer/biomejs-config"]
}
```

Add scripts to your `package.json`:

```json
{
  "scripts": {
    "format": "biome format --write .",
    "lint": "biome lint .",
    "check": "biome check --write ."
  }
}
```

That's it! Your project is now configured with comprehensive formatting and linting rules.

## What's Included

### Formatter Configuration

- **Indentation**: 2 spaces
- **Line width**: 100 characters
- **Line endings**: LF (Unix-style)
- **Quotes**: Single quotes for JavaScript, double quotes for JSX
- **Semicolons**: As needed (automatic insertion)
- **Trailing commas**: All (ES5+)
- **Arrow parentheses**: Always
- **Bracket spacing**: Enabled

### Linter Rules

This configuration enables comprehensive linting across multiple categories:

#### **Correctness Rules** (Strict)
Prevents common programming errors and enforces correct code patterns:
- No unused variables or imports
- Proper React Hook dependencies
- No unreachable code
- Valid typeof checks
- And more...

#### **Security Rules** (Strict)
Protects against common security vulnerabilities:
- No dangerouslySetInnerHTML misuse
- No global eval
- Enforces secure link targets
- XSS prevention

#### **Style Rules** (Flexible)
Enforces consistent code style:
- Use const when possible
- Prefer template literals
- Shorthand array type syntax
- Import type for TypeScript
- And more...

#### **Complexity Rules** (Moderate)
Reduces code complexity:
- No useless constructors or fragments
- Optional chaining preferred
- Literal keys over computed keys
- And more...

#### **Accessibility Rules** (Warnings)
Ensures web accessibility:
- Button type attributes
- Keyboard event handlers
- Valid anchor usage

See [CONFIGURATION.md](./CONFIGURATION.md) for detailed explanations of all rules.

### Special File Configurations

#### Test Files (`*.test.*`, `*.spec.*`)
- Relaxed `noExplicitAny` rule for flexibility in tests

#### Config Files (`*.config.*`, `vite.config.ts`)
- Allows default exports (commonly required)

### Global Variables

Pre-configured global variables for:
- **Cypress**: `cy`, `Cypress`, `before`, `context`, `assert`

### VCS Integration

- Git integration enabled
- Respects `.gitignore` patterns
- Default branch: `main`

## Usage Examples

### Format your code

```bash
# Format all files
pnpm format

# Check formatting without writing
biome format .
```

### Lint your code

```bash
# Lint with auto-fix
pnpm check

# Lint without auto-fix
pnpm lint
```

### CI/CD Integration

```yaml
# .github/workflows/ci.yml
- name: Check code quality
  run: biome ci .
```

## Customization

You can override any configuration in your `biome.jsonc`:

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "extends": ["@dunggramer/biomejs-config"],
  "formatter": {
    "lineWidth": 120  // Override line width
  },
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error"  // Make console.log an error
      }
    }
  }
}
```

### Add custom ignored files

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "files": {
    "ignore": ["build/**", "public/**"]
  }
}
```

### Configure for specific frameworks

The configuration works out of the box with:
- React and React Native
- Next.js
- Vue
- Svelte
- And any JavaScript/TypeScript project

## Migration

Migrating from ESLint and Prettier? See our [Migration Guide](./docs/migration.md).


## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

If you discover a security vulnerability, please see our [Security Policy](./SECURITY.md).

## FAQ

See [FAQ.md](./docs/faq.md) for frequently asked questions.

## License

MIT © [DungGramer](https://dunggramer.com)

## Links

- [npm package](https://www.npmjs.com/package/@dunggramer/biomejs-config)
- [GitHub repository](https://github.com/DungGramer/biomejs-config)
- [Issue tracker](https://github.com/DungGramer/biomejs-config/issues)
- [Biome documentation](https://biomejs.dev)

---

Made with ❤️ by [DungGramer](https://dunggramer.com)
