## <small>1.1.3 (2025-11-19)</small>

* fix: allow Static Element Interactions, Array Index Key ([57a7fc6](https://github.com/DungGramer/biomejs-config/commit/57a7fc6))



## [1.1.3](https://github.com/DungGramer/biomejs-config/compare/v1.1.2...v1.1.3) (2025-11-19)


### Bug Fixes

* allow Static Element Interactions, Array Index Key ([57a7fc6](https://github.com/DungGramer/biomejs-config/commit/57a7fc644281d9ca8a53f2411939ed666dd0beb3))

## <small>1.1.2 (2025-11-17)</small>

* fix: improve config stability and add TanStack Router support ([77322f6](https://github.com/DungGramer/biomejs-config/commit/77322f6))



## [1.1.2](https://github.com/DungGramer/biomejs-config/compare/v1.1.1...v1.1.2) (2025-11-17)


### Bug Fixes

* improve config stability and add TanStack Router support ([77322f6](https://github.com/DungGramer/biomejs-config/commit/77322f65cd70722712c7d4702a5271aa19d2bf47))

## <small>1.1.1 (2025-11-14)</small>

* fix: trigger v1.1.1 release to npm ([e5dd3ea](https://github.com/DungGramer/biomejs-config/commit/e5dd3ea))



## [1.1.1](https://github.com/DungGramer/biomejs-config/compare/v1.1.0...v1.1.1) (2025-11-14)


### Bug Fixes

* trigger v1.1.1 release to npm ([e5dd3ea](https://github.com/DungGramer/biomejs-config/commit/e5dd3ea4410e90e7e1d6247941834173ba66d083))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation (README, CONFIGURATION guide)
- Migration guide from ESLint/Prettier
- Example configurations for different project types
- FAQ documentation
- Contributing guidelines
- Security policy
- Code of conduct
- Automated CI/CD with GitHub Actions
- Semantic release automation
- Commitlint for conventional commits

### Changed
- Updated package.json with proper metadata and dependencies
- Improved LICENSE with correct copyright information

## [1.0.0] - 2025-11-10

### Added
- Initial release of @dunggramer/biomejs-config
- Comprehensive Biome configuration for JavaScript, TypeScript, and React projects
- Formatter settings: 2-space indent, single quotes, 100 char line width
- Linter rules across all categories:
  - Accessibility (a11y) rules with warnings for better web accessibility
  - Complexity rules to reduce code complexity
  - Correctness rules for catching programming errors
  - Performance rules to prevent common performance pitfalls
  - Security rules to protect against vulnerabilities (XSS, eval, tabnabbing)
  - Style rules for consistent code patterns
  - Suspicious code detection
- Special configurations for test files (relaxed `noExplicitAny`)
- Special configurations for config files (allows default exports)
- Cypress global variables support
- Git VCS integration with .gitignore support
- Auto-organize imports on save

### Configuration Highlights
- **Formatter**: 2 spaces, LF line endings, single quotes, trailing commas
- **Linter**: Recommended rules + custom overrides
- **Security**: Strict rules for common vulnerabilities
- **React**: Ready to use with React projects
- **TypeScript**: Full TypeScript support with sensible type checking

[Unreleased]: https://github.com/DungGramer/biomejs-config/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/DungGramer/biomejs-config/releases/tag/v1.0.0
