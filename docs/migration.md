# Migration Guide

This guide helps you migrate from ESLint + Prettier to Biome with @dunggramer/biomejs-config.

## Table of Contents

- [Why Migrate to Biome?](#why-migrate-to-biome)
- [From ESLint + Prettier](#from-eslint--prettier)
- [From Other Configs](#from-other-configs)
- [Step-by-Step Migration](#step-by-step-migration)
- [Common Issues](#common-issues)
- [Configuration Mapping](#configuration-mapping)

---

## Why Migrate to Biome?

**Biome** offers several advantages over ESLint + Prettier:

- **⚡️ Faster**: Written in Rust, significantly faster than Node.js-based tools
- **🔧 All-in-one**: Combines linting and formatting in a single tool
- **📦 Zero config**: Works out of the box with sensible defaults
- **🎯 Better errors**: More helpful error messages with suggested fixes
- **💾 Less disk space**: Single tool vs multiple npm packages

### Performance Comparison

```bash
# ESLint + Prettier (typical)
Time: ~15-30 seconds for medium project
Packages: ~500+ dependencies

# Biome
Time: ~1-3 seconds for medium project
Packages: 1 dependency
```

---

## From ESLint + Prettier

### Before (ESLint + Prettier)

```json
// package.json
{
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-airbnb": "^19.0.0",
    "eslint-plugin-react": "^7.0.0",
    "eslint-plugin-react-hooks": "^4.0.0",
    "eslint-plugin-import": "^2.0.0",
    "eslint-plugin-jsx-a11y": "^6.0.0",
    "prettier": "^3.0.0",
    "eslint-config-prettier": "^9.0.0"
  },
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

```js
// .eslintrc.js
module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    // ... many more rules
  }
}
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

### After (Biome)

```json
// package.json
{
  "devDependencies": {
    "@biomejs/biome": "^2.3.4",
    "@dunggramer/biomejs-config": "^1.0.0"
  },
  "scripts": {
    "check": "biome check --write .",
    "lint": "biome lint .",
    "format": "biome format --write ."
  }
}
```

```jsonc
// biome.jsonc
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "extends": ["@dunggramer/biomejs-config"]
}
```

That's it! Much simpler. 🎉

---

## Step-by-Step Migration

### 1. Install Biome and Config

```bash
# Remove old packages
pnpm remove eslint prettier eslint-config-* eslint-plugin-* prettier-plugin-*

# Install Biome
pnpm add -D @biomejs/biome @dunggramer/biomejs-config
```

### 2. Create Biome Configuration

Create `biome.jsonc` in your project root:

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "extends": ["@dunggramer/biomejs-config"]
}
```

### 3. Remove Old Config Files

```bash
# Remove ESLint and Prettier configs
rm .eslintrc.js .eslintrc.json .eslintignore
rm .prettierrc .prettierrc.json .prettierignore
```

### 4. Update package.json Scripts

```json
{
  "scripts": {
    "lint": "biome lint .",
    "format": "biome format --write .",
    "check": "biome check --write .",
    "ci": "biome ci ."
  }
}
```

### 5. Update VSCode Settings (Optional)

If using VSCode, install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome):

```json
// .vscode/settings.json
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

### 6. Format Your Codebase

```bash
# Format all files
pnpm format

# Lint and auto-fix
pnpm check
```

### 7. Fix Any Remaining Issues

Review and fix any linting errors that can't be auto-fixed:

```bash
pnpm lint
```

### 8. Update CI/CD

Update your CI configuration:

```yaml
# Before
- run: npm run lint
- run: npm run format -- --check

# After
- run: npm run ci
```

---

## Configuration Mapping

### ESLint Rules → Biome Rules

| ESLint Rule | Biome Rule | Status |
|-------------|------------|--------|
| `no-unused-vars` | `noUnusedVariables` | ✅ Equivalent |
| `no-console` | `noConsole` | ✅ Equivalent |
| `no-debugger` | `noDebugger` | ✅ Equivalent |
| `no-var` | `noVar` | ✅ Equivalent |
| `prefer-const` | `useConst` | ✅ Equivalent |
| `eqeqeq` | `noDoubleEquals` | ✅ Equivalent |
| `no-eval` | `noGlobalEval` | ✅ Equivalent |
| `react/jsx-uses-react` | N/A | ⚠️ Not needed (React 17+) |
| `react-hooks/rules-of-hooks` | `useHookAtTopLevel` | ✅ Equivalent |
| `react-hooks/exhaustive-deps` | `useExhaustiveDependencies` | ✅ Equivalent |

### Prettier Settings → Biome Formatter

| Prettier | Biome | @dunggramer/biomejs-config |
|----------|-------|----------------------------|
| `printWidth: 80` | `lineWidth: 100` | ✅ 100 |
| `tabWidth: 2` | `indentWidth: 2` | ✅ 2 |
| `useTabs: false` | `indentStyle: "space"` | ✅ space |
| `semi: true` | `semicolons: "asNeeded"` | ✅ asNeeded |
| `singleQuote: true` | `quoteStyle: "single"` | ✅ single |
| `trailingComma: "all"` | `trailingCommas: "all"` | ✅ all |
| `jsxSingleQuote: false` | `jsxQuoteStyle: "double"` | ✅ double |
| `arrowParens: "always"` | `arrowParentheses: "always"` | ✅ always |

---

## From Other Configs

### From eslint-config-airbnb

Biome with @dunggramer/biomejs-config provides similar strictness:

```jsonc
// No additional config needed - already similar to Airbnb
{
  "extends": ["@dunggramer/biomejs-config"]
}
```

### From eslint-config-standard

Standard uses semicolons differently:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "javascript": {
    "formatter": {
      "semicolons": "asNeeded"  // Already configured!
    }
  }
}
```

### From eslint-config-next (Next.js)

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "files": {
    "ignore": [".next/**", "out/**"]
  }
}
```

---

## Common Issues

### Issue: "Files not being formatted"

**Solution**: Check file patterns in `biome.jsonc`:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "files": {
    "include": ["src/**/*.ts", "src/**/*.tsx"]
  }
}
```

### Issue: "Too many errors"

**Solution**: Format first, then fix linting:

```bash
# Step 1: Format everything
pnpm format

# Step 2: Auto-fix what's possible
pnpm check

# Step 3: Manually fix remaining
pnpm lint
```

### Issue: "Missing rule from ESLint"

**Solution**: Check if Biome has an equivalent:

1. Search [Biome rules documentation](https://biomejs.dev/linter/rules/)
2. If not available, consider if you really need it
3. Open an issue if it's critical

### Issue: "Different formatting than Prettier"

**Solution**: This is expected. Biome and Prettier have different opinions. Run `biome format` to reformat with Biome's style.

### Issue: "VSCode not formatting"

**Solution**:
1. Install [Biome VSCode extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
2. Set as default formatter
3. Restart VSCode

---

## Gradual Migration

If you have a large codebase, migrate gradually:

### Step 1: Add Biome alongside ESLint

```json
{
  "devDependencies": {
    "eslint": "^8.0.0",
    "@biomejs/biome": "^2.3.4",
    "@dunggramer/biomejs-config": "^1.0.0"
  },
  "scripts": {
    "lint:old": "eslint .",
    "lint:new": "biome lint .",
    "format:new": "biome format --write ."
  }
}
```

### Step 2: Format specific directories

```bash
# Format one directory at a time
biome format --write src/components/
biome check --write src/components/

# Commit after each directory
git add src/components/
git commit -m "chore: format components with Biome"
```

### Step 3: Update CI gradually

```yaml
# Run both for a while
- run: npm run lint:old
- run: npm run lint:new || true  # Allow failures initially
```

### Step 4: Remove ESLint when ready

```bash
pnpm remove eslint eslint-*
```

---

## Getting Help

- **Documentation**: [CONFIGURATION.md](../CONFIGURATION.md)
- **FAQ**: [FAQ.md](./faq.md)
- **Issues**: [GitHub Issues](https://github.com/DungGramer/biomejs-config/issues)
- **Biome Docs**: [biomejs.dev](https://biomejs.dev)

---

## Checklist

Use this checklist for migration:

- [ ] Install `@biomejs/biome` and `@dunggramer/biomejs-config`
- [ ] Create `biome.jsonc` with extends
- [ ] Remove ESLint packages
- [ ] Remove Prettier packages
- [ ] Delete old config files (`.eslintrc.*`, `.prettierrc.*`)
- [ ] Update `package.json` scripts
- [ ] Install Biome VSCode extension
- [ ] Update VSCode settings
- [ ] Format entire codebase
- [ ] Fix linting errors
- [ ] Update CI/CD configuration
- [ ] Update documentation/README if needed
- [ ] Commit changes

---

Congratulations on migrating to Biome! 🎉 Your codebase is now faster and simpler.
