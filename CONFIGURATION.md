# Configuration Details

This document provides detailed explanations of all configuration options in `@dunggramer/biomejs-config`.

## Table of Contents

- [VCS Integration](#vcs-integration)
- [File Patterns](#file-patterns)
- [Formatter Settings](#formatter-settings)
- [Assist Features](#assist-features)
- [Linter Rules](#linter-rules)
  - [Accessibility (a11y)](#accessibility-a11y)
  - [Complexity](#complexity)
  - [Correctness](#correctness)
  - [Performance](#performance)
  - [Security](#security)
  - [Style](#style)
  - [Suspicious](#suspicious)
  - [Nursery](#nursery)
- [JavaScript Settings](#javascript-settings)
- [File Overrides](#file-overrides)

---

## VCS Integration

```jsonc
"vcs": {
  "enabled": true,
  "clientKind": "git",
  "useIgnoreFile": true,
  "defaultBranch": "main"
}
```

**Explanation**: Enables Git integration to automatically respect `.gitignore` patterns. Biome will skip files that Git ignores, ensuring consistent behavior between version control and linting/formatting.

---

## File Patterns

```jsonc
"files": {
  "ignoreUnknown": false,
  "includes": [
    "**",
    "!**/node_modules",
    "!**/dist",
    "!**/build",
    "!**/.vite",
    "!**/.cache",
    "!**/coverage",
    "!**/*.min.css",
    "!**/*.min.js",
    "!**/*.config.js",
    "!**/pnpm-lock.yaml",
    "!**/package-lock.json"
  ]
}
```

**Explanation**: Defines which files Biome should process:
- Includes all files by default (`**`)
- Excludes common directories: `node_modules`, build outputs, caches
- Skips minified files (they're already processed)
- Ignores lock files (generated, shouldn't be formatted)

---

## Formatter Settings

### General Formatting

```jsonc
"formatter": {
  "enabled": true,
  "formatWithErrors": false,
  "indentStyle": "space",
  "indentWidth": 2,
  "lineEnding": "lf",
  "lineWidth": 100,
  "attributePosition": "auto",
  "bracketSpacing": true
}
```

| Setting | Value | Explanation |
|---------|-------|-------------|
| `indentStyle` | `space` | Use spaces (not tabs) for consistent rendering across editors |
| `indentWidth` | `2` | 2-space indentation (common in JS/TS community) |
| `lineEnding` | `lf` | Unix-style line endings (prevents cross-platform issues) |
| `lineWidth` | `100` | Max 100 characters per line (readable on modern screens) |
| `bracketSpacing` | `true` | `{ foo }` not `{foo}` (more readable) |
| `formatWithErrors` | `false` | Don't format files with syntax errors (prevent corruption) |

### JavaScript-Specific Formatting

```jsonc
"javascript": {
  "formatter": {
    "jsxQuoteStyle": "double",
    "quoteProperties": "asNeeded",
    "trailingCommas": "all",
    "semicolons": "asNeeded",
    "arrowParentheses": "always",
    "bracketSpacing": true,
    "bracketSameLine": false,
    "quoteStyle": "single",
    "attributePosition": "auto"
  }
}
```

| Setting | Value | Explanation |
|---------|-------|-------------|
| `quoteStyle` | `single` | Use `'string'` not `"string"` (JS convention) |
| `jsxQuoteStyle` | `double` | JSX attributes use `"` (React convention) |
| `semicolons` | `asNeeded` | Add semicolons only when necessary (cleaner) |
| `trailingCommas` | `all` | Add trailing commas everywhere (easier diffs) |
| `arrowParentheses` | `always` | `(x) => x` not `x => x` (consistency) |
| `bracketSameLine` | `false` | Opening `>` on new line (readability) |

---

## Assist Features

```jsonc
"assist": {
  "actions": {
    "source": {
      "organizeImports": "on"
    }
  }
}
```

**Explanation**: Automatically organize imports (sort, remove unused) on save.

---

## Linter Rules

All rules follow this structure:
- `"error"` - Fails CI, must be fixed
- `"warn"` - Shows warning, doesn't fail CI
- `"off"` - Rule disabled

### Accessibility (a11y)

```jsonc
"a11y": {
  "useButtonType": "warn",
  "useKeyWithClickEvents": "warn",
  "useValidAnchor": "warn"
}
```

| Rule | Level | Explanation |
|------|-------|-------------|
| `useButtonType` | warn | `<button>` should have explicit `type` attribute |
| `useKeyWithClickEvents` | warn | Elements with `onClick` should have keyboard handlers |
| `useValidAnchor` | warn | `<a>` tags should have valid `href` or proper role |

**Why warnings?** These improve accessibility but may require significant refactoring in existing projects.

---

### Complexity

Rules that reduce code complexity and improve maintainability.

```jsonc
"complexity": {
  "noBannedTypes": "error",
  "noExtraBooleanCast": "error",
  "noUselessCatch": "error",
  "noUselessConstructor": "error",
  "noUselessFragments": "warn",
  "noUselessLabel": "error",
  "noUselessLoneBlockStatements": "error",
  "noUselessRename": "error",
  "noUselessTernary": "warn",
  "useLiteralKeys": "error",
  "useOptionalChain": "warn",
  // ... more rules
}
```

#### Key Rules Explained:

**`noBannedTypes`** (error)
```typescript
// ❌ Bad - Don't use banned types
let foo: Object;
let bar: String;

// ✅ Good - Use proper types
let foo: object;
let bar: string;
```

**`noUselessConstructor`** (error)
```javascript
// ❌ Bad - Constructor does nothing
class Foo {
  constructor() {}
}

// ✅ Good - Remove or add logic
class Foo {}
```

**`useOptionalChain`** (warn)
```javascript
// ❌ Bad - Verbose null checking
const value = foo && foo.bar && foo.bar.baz;

// ✅ Good - Use optional chaining
const value = foo?.bar?.baz;
```

**`noUselessTernary`** (warn)
```javascript
// ❌ Bad - Unnecessary ternary
const isTrue = condition ? true : false;

// ✅ Good - Direct boolean
const isTrue = condition;
```

---

### Correctness

Rules that catch common programming errors and enforce correct code patterns.

```jsonc
"correctness": {
  "noConstAssign": "error",
  "noUnusedVariables": "error",
  "noUndeclaredVariables": "error",
  "noUnreachable": "error",
  "useExhaustiveDependencies": "warn",
  "useHookAtTopLevel": "error",
  // ... more rules
}
```

#### Critical Rules:

**`noUnusedVariables`** (error)
```javascript
// ❌ Bad - Unused variable
const unused = 'value';
const used = 'other';
console.log(used);

// ✅ Good - All variables used
const used = 'other';
console.log(used);
```

**`useExhaustiveDependencies`** (warn - React)
```javascript
// ❌ Bad - Missing dependency
useEffect(() => {
  console.log(value);
}, []);

// ✅ Good - Include all dependencies
useEffect(() => {
  console.log(value);
}, [value]);
```

**`noNodejsModules`** (off)
```javascript
// ✅ Allowed - Can use Node.js modules
import fs from 'fs';
import path from 'path';
```
This is turned OFF to allow Node.js projects and build scripts.

---

### Performance

Rules that prevent common performance pitfalls.

```jsonc
"performance": {
  "noAccumulatingSpread": "warn",
  "noDelete": "warn"
}
```

**`noAccumulatingSpread`** (warn)
```javascript
// ❌ Bad - O(n²) complexity
let obj = {};
for (const item of items) {
  obj = { ...obj, [item.key]: item.value };
}

// ✅ Good - O(n) complexity
const obj = {};
for (const item of items) {
  obj[item.key] = item.value;
}
```

**`noDelete`** (warn)
```javascript
// ❌ Bad - delete is slow
delete object.property;

// ✅ Good - Set to undefined
object.property = undefined;
```

---

### Security

Rules that protect against common security vulnerabilities.

```jsonc
"security": {
  "noDangerouslySetInnerHtml": "warn",
  "noDangerouslySetInnerHtmlWithChildren": "error",
  "noGlobalEval": "error",
  "noBlankTarget": "error"
}
```

**`noDangerouslySetInnerHtml`** (warn)
```jsx
// ⚠️ Warning - XSS risk
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Better - Use children
<div>{userInput}</div>
```

**`noDangerouslySetInnerHtmlWithChildren`** (error)
```jsx
// ❌ Bad - Invalid React usage
<div dangerouslySetInnerHTML={{ __html: html }}>
  <span>Child</span>
</div>

// ✅ Good - One or the other
<div dangerouslySetInnerHTML={{ __html: html }} />
```

**`noGlobalEval`** (error)
```javascript
// ❌ Bad - Security risk
eval(userInput);

// ✅ Good - Use safer alternatives
JSON.parse(userInput);
```

**`noBlankTarget`** (error)
```jsx
// ❌ Bad - Security vulnerability (tabnabbing)
<a href={url} target="_blank">Link</a>

// ✅ Good - Add rel attributes
<a href={url} target="_blank" rel="noopener noreferrer">Link</a>
```

---

### Style

Rules that enforce consistent code style.

```jsonc
"style": {
  "noDefaultExport": "off",
  "noImplicitBoolean": "off",
  "noInferrableTypes": "warn",
  "noNonNullAssertion": "warn",
  "useConst": "error",
  "useTemplate": "warn",
  // ... more rules
}
```

#### Important Rules:

**`noDefaultExport`** (off by default, enabled for test/config files)
```javascript
// ✅ Allowed in regular files
export default MyComponent;

// ❌ In test files - use named exports
export { MyComponent };
```

**`useConst`** (error)
```javascript
// ❌ Bad - Variable never reassigned
let value = 'hello';
console.log(value);

// ✅ Good - Use const
const value = 'hello';
console.log(value);
```

**`useTemplate`** (warn)
```javascript
// ❌ Bad - String concatenation
const message = 'Hello ' + name + '!';

// ✅ Good - Template literal
const message = `Hello ${name}!`;
```

**`useConsistentArrayType`** (warn - TypeScript)
```typescript
// ❌ Bad - Array<T> syntax
const items: Array<string> = [];

// ✅ Good - Shorthand syntax
const items: string[] = [];
```

**`noInferrableTypes`** (warn - TypeScript)
```typescript
// ❌ Bad - Type can be inferred
const count: number = 5;

// ✅ Good - Let TypeScript infer
const count = 5;
```

---

### Suspicious

Rules that detect potentially incorrect code patterns.

```jsonc
"suspicious": {
  "noArrayIndexKey": "warn",
  "noDebugger": "warn",
  "noDoubleEquals": "warn",
  "noExplicitAny": "off",
  "noConsole": { "level": "off", "options": { "allow": ["log"] } },
  "noVar": "error",
  // ... more rules
}
```

#### Notable Rules:

**`noArrayIndexKey`** (warn - React)
```jsx
// ⚠️ Warning - Can cause issues with reordering
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// ✅ Better - Use stable identifier
{items.map((item) => (
  <div key={item.id}>{item}</div>
))}
```

**`noDoubleEquals`** (warn)
```javascript
// ⚠️ Warning - Type coercion
if (value == null) {}

// ✅ Better - Explicit comparison
if (value === null || value === undefined) {}
```

**`noExplicitAny`** (off)
```typescript
// ✅ Allowed - Sometimes necessary
function handle(data: any) {}
```
Turned OFF to allow flexibility. Turn on in your project if you want strict typing.

**`noConsole`** (off, but configurable)
```javascript
// ✅ Allowed - console.log is permitted
console.log('Debug info');

// You can make it an error in your config
"noConsole": "error"
```

**`noVar`** (error)
```javascript
// ❌ Bad - Don't use var
var value = 5;

// ✅ Good - Use let or const
const value = 5;
```

---

### Nursery

```jsonc
"nursery": {
  "useSortedClasses": "off"
}
```

**Explanation**: Nursery rules are experimental. `useSortedClasses` (for Tailwind) is disabled by default as it may not fit all projects.

---

## JavaScript Settings

### Global Variables

```jsonc
"javascript": {
  "globals": ["cy", "Cypress", "before", "context", "assert"]
}
```

**Explanation**: Pre-defines global variables for Cypress testing to prevent "undefined variable" errors in test files.

---

## File Overrides

### Test Files

```jsonc
{
  "includes": ["**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx"],
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "off"
      }
    }
  }
}
```

**Explanation**: In test files, `any` type is allowed for more flexibility when writing tests.

### Config Files

```jsonc
{
  "includes": ["**/*.config.ts", "**/*.config.js", "**/vite.config.ts"],
  "linter": {
    "rules": {
      "style": {
        "noDefaultExport": "off"
      }
    }
  }
}
```

**Explanation**: Config files typically require default exports (e.g., `vite.config.ts`, `next.config.js`), so the rule is disabled for these files.

---

## Philosophy

This configuration follows these principles:

1. **Correctness over style** - Errors for bugs, warnings for style preferences
2. **Security by default** - Strict rules for security issues
3. **Performance awareness** - Catch common performance pitfalls
4. **Developer experience** - Allow flexibility where it doesn't compromise quality
5. **Framework compatibility** - Works with React, TypeScript, and modern JavaScript

---

## Customizing Rules

You can override any rule in your project's `biome.jsonc`:

```jsonc
{
  "extends": ["@dunggramer/biomejs-config"],
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error"  // Make console an error
      },
      "style": {
        "noDefaultExport": "error"  // Enforce named exports everywhere
      }
    }
  }
}
```

For more information, see the [Biome documentation](https://biomejs.dev/linter/rules/).
