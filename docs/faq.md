# Frequently Asked Questions (FAQ)

## General Questions

### What is @dunggramer/biomejs-config?

It's a shareable Biome configuration that provides opinionated formatting and linting rules for JavaScript, TypeScript, and React projects. Instead of configuring Biome from scratch, you can extend this config and get a well-tested setup instantly.

### Why should I use this instead of creating my own config?

- **Save time**: No need to research and configure hundreds of rules
- **Best practices**: Rules chosen based on industry standards and experience
- **Maintained**: Updates when Biome adds new rules or changes recommendations
- **Tested**: Used in production projects

### Is this config only for React projects?

No! While it includes React-specific rules, it works great for:
- Plain JavaScript projects
- TypeScript projects without React
- Node.js backend applications
- Full-stack applications
- Any JavaScript/TypeScript codebase

React-specific rules only apply to `.jsx` and `.tsx` files.

---

## Installation & Setup

### Do I need to install Biome separately?

Yes, Biome is a peer dependency. Install both:

```bash
pnpm add -D @biomejs/biome @dunggramer/biomejs-config
```

### What Node version do I need?

Node.js 18 or higher is required (specified in `package.json` engines).

### Can I use this with npm/yarn instead of pnpm?

Yes! The config works with any package manager:

```bash
# npm
npm install -D @biomejs/biome @dunggramer/biomejs-config

# yarn
yarn add -D @biomejs/biome @dunggramer/biomejs-config

# pnpm
pnpm add -D @biomejs/biome @dunggramer/biomejs-config
```

### How do I update to the latest version?

```bash
pnpm update @biomejs/biome @dunggramer/biomejs-config
```

Check the [CHANGELOG](../CHANGELOG.md) for breaking changes.

---

## Configuration

### How do I override a rule?

In your `biome.jsonc`:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error"  // Override to make console an error
      }
    }
  }
}
```

### How do I disable a rule?

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "style": {
        "useTemplate": "off"  // Disable template literal enforcement
      }
    }
  }
}
```

### Can I change the line width?

Yes:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "formatter": {
    "lineWidth": 120  // Default is 100
  }
}
```

### Can I use tabs instead of spaces?

Yes:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "formatter": {
    "indentStyle": "tab"
  }
}
```

### How do I ignore certain files?

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "files": {
    "ignore": [
      "build/**",
      "dist/**",
      "**/*.generated.ts"
    ]
  }
}
```

### Can I extend multiple configs?

Yes, Biome supports multiple extends:

```jsonc
{
  "extends": [
    "@dunggramer/biomejs-config",
    "./custom-overrides.jsonc"
  ]
}
```

Later configs override earlier ones.

---

## Usage

### What's the difference between `check`, `lint`, and `format`?

- **`biome format`**: Only formats code (spacing, quotes, etc.)
- **`biome lint`**: Only runs linter (catches bugs, enforces rules)
- **`biome check`**: Runs both formatter and linter

```bash
# Format only
biome format --write .

# Lint only
biome lint .

# Format + Lint
biome check --write .
```

### Should I use `check` or run `format` and `lint` separately?

Use `check` for most cases - it's faster and more convenient. Use separate commands if you need to:
- Only format without linting
- See linting errors without formatting changes

### How do I run Biome in CI?

```bash
# CI mode - fails on any issues, doesn't modify files
biome ci .
```

In your CI config:

```yaml
- name: Check code quality
  run: pnpm run ci
```

### How do I format only changed files?

```bash
# Using git
biome check --write $(git diff --name-only --diff-filter=ACMR "*.ts" "*.tsx" "*.js" "*.jsx")

# Or use a tool like lint-staged
```

With **lint-staged** (`package.json`):

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["biome check --write --no-errors-on-unmatched"]
  }
}
```

---

## Specific Rules

### Why is `console.log` allowed?

The `noConsole` rule is disabled by default. While console statements should be removed before production, this config allows them for developer convenience.

To make them errors:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error"
      }
    }
  }
}
```

### Why is `any` type allowed in TypeScript?

`noExplicitAny` is disabled to allow flexibility. While `any` should be avoided, sometimes it's necessary.

Enable strict typing:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  }
}
```

### Why can't I use default exports?

Actually, you **can**! `noDefaultExport` is disabled by default in regular files. It's only enabled for:
- Test files (`*.test.*`, `*.spec.*`)
- Config files (`*.config.*`)

This encourages named exports in tests for better IDE support.

### Why do I get warnings about `dangerouslySetInnerHTML`?

This is a security feature. `dangerouslySetInnerHTML` can introduce XSS vulnerabilities. The warning reminds you to be careful.

If you're sure it's safe (e.g., sanitized HTML):

```jsx
// Add a comment explaining why it's safe
{/* Safe: HTML is sanitized by DOMPurify */}
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

---

## Editor Integration

### How do I set up VSCode?

1. **Install extension**: [Biome for VSCode](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

2. **Configure settings** (`.vscode/settings.json`):

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

3. **Restart VSCode**

### VSCode is not formatting my files

**Solutions**:

1. Check Biome extension is installed and enabled
2. Verify `biome.jsonc` exists and is valid
3. Check file type is supported (`.js`, `.jsx`, `.ts`, `.tsx`)
4. Look for errors in VSCode Output panel (View → Output → Biome)
5. Try restarting VSCode

### How do I use this with WebStorm/IntelliJ?

WebStorm has built-in Biome support:

1. Go to **Settings → Languages & Frameworks → Biome**
2. Enable Biome
3. Set path to `node_modules/@biomejs/biome`
4. Configure to run on save

### How do I use this with Vim/Neovim?

Use a Language Server Protocol (LSP) client like `nvim-lspconfig`:

```lua
require('lspconfig').biome.setup{}
```

Or use a formatter plugin like `null-ls`.

---

## Troubleshooting

### Biome is not reading my config

**Check**:
1. File is named `biome.jsonc` (or `biome.json`)
2. File is in project root (or use `--config-path`)
3. JSON is valid (no trailing commas in `.json` files)
4. `extends` path is correct

### Getting "Cannot find module" error

The config package isn't installed or not in `node_modules`.

```bash
# Reinstall
pnpm install

# Or explicitly install
pnpm add -D @dunggramer/biomejs-config
```

### Rules are not being applied

1. **Check extends**:
```jsonc
{
  "extends": ["@dunggramer/biomejs-config"]  // Correct
  // NOT: "extends": "@dunggramer/biomejs-config"
}
```

2. **Verify Biome version**:
```bash
biome --version
```

Should be 2.0.0 or higher.

### Format on save is not working

1. Check VSCode settings (see [Editor Integration](#editor-integration))
2. Verify Biome is set as default formatter
3. Check Output panel for errors
4. Try manual format: `Ctrl+Shift+P` → "Format Document"

### Biome is slower than expected

1. **Check file patterns**: Make sure you're not processing `node_modules`
2. **Use `.gitignore`**: VCS integration respects `.gitignore`
3. **Limit scope**: Only run on specific directories if needed

```bash
# Instead of
biome check .

# Run on specific directories
biome check src/ tests/
```

---

## Comparison with Other Tools

### Biome vs ESLint + Prettier

| Feature | Biome | ESLint + Prettier |
|---------|-------|-------------------|
| **Speed** | ⚡️ Very fast (Rust) | Slower (Node.js) |
| **Setup** | Simple | Complex (multiple packages) |
| **Config** | Single file | Multiple files |
| **Rules** | Growing | More extensive |
| **Plugins** | Limited | Extensive ecosystem |
| **Format + Lint** | Unified | Separate tools |

**When to use Biome**:
- Want fast performance
- Prefer simple setup
- Don't need specialized ESLint plugins

**When to stick with ESLint**:
- Need specific plugins (e.g., `eslint-plugin-testing-library`)
- Have heavily customized ESLint config
- Project already uses ESLint extensively

### Can I use both Biome and ESLint?

Yes, but not recommended. They may conflict. If you must:

1. Use Biome for formatting only
2. Use ESLint for linting
3. Disable formatting rules in ESLint

---

## Contributing

### How do I suggest a rule change?

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on proposing rule changes.

### I found a bug, what should I do?

1. Check existing [GitHub Issues](https://github.com/DungGramer/biomejs-config/issues)
2. If not reported, create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

### How can I contribute?

We welcome contributions! See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- How to submit pull requests
- Coding standards
- Development workflow

---

## Additional Resources

- **Configuration Guide**: [CONFIGURATION.md](../CONFIGURATION.md)
- **Migration Guide**: [migration.md](./migration.md)
- **Biome Documentation**: [biomejs.dev](https://biomejs.dev)
- **GitHub Issues**: [Report problems](https://github.com/DungGramer/biomejs-config/issues)

---

## Still Have Questions?

If your question isn't answered here:

1. Check [Biome documentation](https://biomejs.dev)
2. Search [GitHub Issues](https://github.com/DungGramer/biomejs-config/issues)
3. Open a new issue with the "question" label

We're here to help! 🎉
