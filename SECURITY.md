# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of @dunggramer/biomejs-config seriously. If you discover a security vulnerability, please follow these steps:

### Where to Report

**Do NOT** open a public issue. Instead, please report security vulnerabilities by:

1. **Email**: Send details to [dung.dev.gramer@gmail.com](mailto:dung.dev.gramer@gmail.com)
2. **Subject line**: `[SECURITY] Brief description of vulnerability`

### What to Include

Please include the following information in your report:

- **Type of vulnerability** (e.g., configuration bypass, malicious rule injection)
- **Step-by-step instructions** to reproduce the issue
- **Potential impact** of the vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up

### What to Expect

- **Acknowledgment**: You'll receive a response within 48 hours
- **Investigation**: We'll investigate and validate the issue
- **Fix development**: We'll work on a fix and coordinate release timing
- **Disclosure**: We'll publicly disclose the vulnerability after a fix is available
- **Credit**: You'll be credited for the discovery (unless you prefer to remain anonymous)

## Security Considerations

### Configuration Security

This package provides linting and formatting rules. Security considerations include:

1. **Rule Effectiveness**: Security-focused rules (like `noGlobalEval`, `noDangerouslySetInnerHtml`) are meant to catch common vulnerabilities but should not be relied upon as the sole security measure.

2. **Configuration Override**: Users can override any rule. Ensure your project's `biome.jsonc` doesn't disable security-critical rules without good reason.

3. **Supply Chain**: Always verify the integrity of the package:
   ```bash
   # Check package integrity
   npm view @dunggramer/biomejs-config

   # Verify with lock file
   pnpm install --frozen-lockfile
   ```

### Recommended Security Practices

When using this configuration:

1. **Keep dependencies updated**:
   ```bash
   pnpm update @biomejs/biome @dunggramer/biomejs-config
   ```

2. **Review security rules**: See [CONFIGURATION.md](./CONFIGURATION.md#security) for details on security rules

3. **Don't disable security rules** without understanding the implications:
   ```jsonc
   // ⚠️ Careful - understand why before doing this
   {
     "extends": ["@dunggramer/biomejs-config"],
     "linter": {
       "rules": {
         "security": {
           "noGlobalEval": "off"  // Are you sure?
         }
       }
     }
   }
   ```

4. **Use with other security tools**: Biome configuration is one layer. Also use:
   - Dependency scanning (e.g., `npm audit`, Snyk)
   - SAST tools
   - Security-focused code reviews

## Security Rules Included

This configuration includes the following security-focused rules:

- `noDangerouslySetInnerHtml` (warn) - Detects potential XSS via innerHTML
- `noDangerouslySetInnerHtmlWithChildren` (error) - Invalid React usage
- `noGlobalEval` (error) - Prevents eval() usage
- `noBlankTarget` (error) - Requires rel="noopener noreferrer" for target="_blank"

See [CONFIGURATION.md](./CONFIGURATION.md#security) for detailed explanations.

## Known Limitations

1. **Static Analysis Only**: Biome performs static analysis. It cannot detect runtime vulnerabilities or logic errors.

2. **Configuration-Dependent**: Security effectiveness depends on users not disabling security rules.

3. **False Negatives**: Some vulnerable patterns may not be detected. Don't rely solely on linting for security.

## Security Updates

Security updates will be released as soon as possible after validation. Check:

- [GitHub Security Advisories](https://github.com/DungGramer/biomejs-config/security/advisories)
- [CHANGELOG.md](./CHANGELOG.md) for security-related fixes
- npm advisory database

## Contact

For security concerns, contact:
- **Email**: dung.dev.gramer@gmail.com
- **GitHub**: [@DungGramer](https://github.com/DungGramer)

---

Thank you for helping keep @dunggramer/biomejs-config and its users safe!
