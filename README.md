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
- **💅 CSS/Tailwind support** - Full CSS formatting with Tailwind directives
- **🤖 Auto-organize** - Imports, attributes, and class names sorted automatically
- **📝 Multi-language** - JavaScript, TypeScript, CSS, HTML, JSON/JSONC support

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

## VSCode Integration

For the best developer experience, install the [Biome VSCode extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) and configure your `.vscode/settings.json`:

```jsonc
{
  // Enable Biome as the default formatter
  "editor.defaultFormatter": "biomejs.biome",

  // Format on save
  "editor.formatOnSave": true,

  // Auto-fix on save
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"  // Auto-organize imports on save
  },

  // Disable other formatters to avoid conflicts
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[css]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

## Recommended Customizations for Your Project

Depending on your project type and team preferences, you may want to customize these settings:

### 1. **VCS Branch Name**
If your repository uses `master` instead of `main` (or another branch):

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "vcs": {
    "defaultBranch": "master"  // or "develop", "trunk", etc.
  }
}
```

### 2. **Console Usage**
The default allows `console.log`. For production apps, you may want stricter rules:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error"  // Block all console usage
        // Or allow specific methods:
        // "noConsole": { "level": "error", "options": { "allow": ["warn", "error"] } }
      }
    }
  }
}
```

### 3. **Default Exports**
If your team prefers named exports everywhere:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "style": {
        "noDefaultExport": "error"  // Enforce named exports
      }
    }
  },
  // Keep overrides for config files that require default exports
  "overrides": [
    {
      "includes": ["**/*.config.*", "**/vite.config.ts", "**/*.stories.*"],
      "linter": {
        "rules": {
          "style": { "noDefaultExport": "off" }
        }
      }
    }
  ]
}
```

### 4. **TypeScript Strictness**
For stricter TypeScript projects:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "error"  // Block 'any' type
      },
      "style": {
        "noNonNullAssertion": "error"  // Block '!' assertions
      }
    }
  }
}
```

### 5. **Line Width**
For larger displays or narrower code style:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "formatter": {
    "lineWidth": 120  // Or 80 for more conservative
  },
  "css": {
    "formatter": {
      "lineWidth": 120  // Keep CSS in sync
    }
  }
}
```

### 6. **Import Restrictions**
Prevent barrel file imports or enforce modular lodash:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "style": {
        "noRestrictedImports": {
          "level": "error",
          "options": {
            "paths": {
              "lodash": "Use lodash/<name> instead.",
              "lodash-es": "Use lodash-es/<name> instead.",
              "@/utils": "Import specific utilities, not the barrel file.",
              "moment": "Use date-fns or dayjs instead."
            }
          }
        }
      }
    }
  }
}
```

### 7. **Environment-Specific Overrides**
Different rules for different file types:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "overrides": [
    {
      "includes": ["**/scripts/**", "**/tools/**"],
      "linter": {
        "rules": {
          "suspicious": {
            "noConsole": "off"  // Allow console in scripts
          }
        }
      }
    },
    {
      "includes": ["**/*.stories.*", "**/*.story.*"],
      "linter": {
        "rules": {
          "suspicious": {
            "noExplicitAny": "off"  // Relax for Storybook files
          }
        }
      }
    }
  ]
}
```

### 8. **Framework-Specific Globals**
Add globals for your testing framework or environment:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "javascript": {
    "globals": [
      // Vitest
      "describe", "it", "expect", "vi", "beforeEach", "afterEach",
      // Jest
      "jest",
      // Node.js
      "__dirname", "__filename"
    ]
  }
}
```

### 9. **Ignore Additional Directories**
Project-specific build outputs or vendor code:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "files": {
    "ignore": [
      "**/generated/**",      // Code generation output
      "**/vendor/**",         // Third-party code
      "**/.docusaurus/**",    // Docusaurus cache
      "**/storybook-static/**" // Storybook build
    ]
  }
}
```

### 10. **Disable Auto-Organize for Specific Files**
Keep manual control over import/key order in certain files:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "overrides": [
    {
      "includes": ["**/theme.ts", "**/constants.ts"],
      "assist": {
        "actions": {
          "source": {
            "organizeImports": "off",
            "useSortedKeys": "off"
          }
        }
      }
    }
  ]
}
```

## What's Included

### Formatter Configuration

#### JavaScript/TypeScript
- **Indentation**: 2 spaces
- **Line width**: 100 characters
- **Quotes**: Single quotes
- **Trailing commas**: ES5 (arrays, objects)
- **Quote properties**: Preserved

#### CSS
- **Line width**: 100 characters (matches JS/TS)
- **Indentation**: 2 spaces
- **Tailwind directives**: Supported (`@apply`, `@theme`, etc.)
- **CSS Modules**: Enabled
- **Line comments**: Allowed (for tooling)

#### HTML
- **Self-closing void elements**: Always (`<br />`, `<img />`)

#### JSON/JSONC
- **Indentation**: 2 spaces
- **Comments**: Allowed in JSONC files
- **Trailing commas**: Allowed
- **TSConfig**: Special handling with comments and trailing commas

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

#### **Nursery Rules** (Experimental)
Beta features for improved DX:
- **Sorted Tailwind classes**: Auto-sort class names in `className`, `classList`, `clsx()`, `cn()`, `cva()`, `tw()`, `twMerge()` for cleaner diffs

See [CONFIGURATION.md](./CONFIGURATION.md) for detailed explanations of all rules.

### Auto-Organize Features

The config includes intelligent code organization:
- **Auto-organize imports**: Deduplicates and sorts import statements
- **Sorted JSX/HTML attributes**: Normalizes attribute order for stable diffs
- **Sorted object keys**: Alphabetizes object keys (where safe, see overrides)
- **Sorted type properties**: Consistent ordering in TypeScript types

### Special File Configurations

The config includes intelligent overrides for specific file types:

#### Test Files (`*.test.*`, `*.spec.*`)
- Relaxed `noExplicitAny` rule for flexibility in tests

#### Config Files (`*.config.*`, `vite.config.ts`)
- Allows default exports (commonly required by bundlers)

#### TSConfig (`tsconfig.json`, `tsconfig.*.json`)
- Comments and trailing commas allowed
- Object key sorting disabled (preserves manual order like `compilerOptions` first)

#### Package.json
- Object key sorting disabled (preserves conventional order)

#### JSON5 Files (`*.json5`)
- Double quotes enforced
- No trailing commas (spec compliance)

#### Community Files (`.all-contributorsrc`)
- Double quotes to match community conventions

### Global Variables

Pre-configured global variables for testing:
- **Cypress**: `cy`, `Cypress`, `before`, `context`, `assert`

### VCS Integration

- Git integration enabled
- Respects `.gitignore` patterns
- Default branch: `main`
- Comprehensive ignore patterns for:
  - Dependencies: `node_modules`, `.pnpm`, `.yarn`, `.npm`
  - Build outputs: `dist`, `build`, `.next`, `.nuxt`, `.svelte-kit`, etc.
  - Framework-specific: `.turbo`, `.parcel-cache`, `.vercel`, `.netlify`
  - Testing artifacts: `coverage`, `playwright-report`, `test-results`

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
