<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# Contributing to hexaWebShare

Thank you for your interest in contributing to **hexaWebShare**!  
This document outlines how to get involved, contribute code or ideas, and follow our development process.

---

## 📚 Before You Start

Please review the following core documents:

- [Getting Started](https://github.com/hTuneSys/hexaWebShare/blob/main/docs/GETTING_STARTED.md)
- [Architecture](https://github.com/hTuneSys/hexaWebShare/blob/main/docs/ARCHITECTURE.md)
- [Branch Strategy](https://github.com/hTuneSys/hexaWebShare/blob/main/docs/BRANCH_STRATEGY.md)
- [Project Board](https://github.com/hTuneSys/hexaWebShare/blob/main/docs/PROJECT_BOARD.md)
- [FAQ](https://github.com/hTuneSys/hexaWebShare/blob/main/docs/FAQ.md)
- [README](https://github.com/hTuneSys/hexaWebShare#readme)

---

## 🧩 Contribution Types

- **Code:** New features, bugfixes, enhancements to modules or core
- **Plugins:** External integrations, reusable logic extensions
- **Docs:** Fixing typos, improving structure, or writing new guides
- **Issues & Feedback:** Filing issues, proposing ideas or improvements

---

## 🔀 Branch Strategy

Please follow our [Branching Guide](https://github.com/hTuneSys/hexaWebShare/blob/main/docs/BRANCH_STRATEGY.md)

- Always branch from `develop`
- Use one of the allowed types as prefix:  
  `feat/`, `fix/`, `chore/`, `refactor/`, `test/`, `docs/`, `ci/`, `perf/`, `build/`, `release/`, `hotfix/`, `style/`
- Example: `feat/auth-handler`, `fix/login-bug`, `docs/contributing`
- Never branch from `main`
- Only maintainers may merge to `main` or `release/*`

---

## ✏️ Commit & PR Formatting

All commits and pull requests must follow [Conventional Commits](https://www.conventionalcommits.org/):

### ✅ Allowed Types

`feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `ci`, `perf`, `build`, `release`, `hotfix`, `style`

### 📝 Examples

```bash
feat: add user authentication module
fix: resolve panic on empty payload
chore: remove unused dependencies
refactor: simplify scheduler logic
test: add unit tests for HexaStore
docs: improve contributing guide
ci: update GitHub Actions for linting
perf: optimize event matching engine
build: update cargo manifest and version
release: prepare v0.2.0 release
hotfix: patch critical runtime bug
style: reformat codebase with rustfmt
```

PR titles must follow the same format. Title linting is enforced.

---

## 🧪 PR Flow & Project Board

1. Choose or create an issue
2. Fork the repo and branch from `develop`
3. Submit a PR with a descriptive title
4. PR flows through:
   - 🟡 In Progress
   - 🔍 In Review
   - ✅ Done

---

## 🏷 Label System

Labels are automatically assigned based on the module or type.  
Refer to [Labelling Strategy](https://github.com/hTuneSys/hexaWebShare/blob/main/docs/LABELLING_STRATEGY.md)

---

## 🔁 CI/CD & Releases

- All PRs must pass checks (build, test, format, lint)
- PRs are merged into `develop`, then promoted to `release/*`
- Only merges into `main` trigger semantic-release automation

---

## 🙋 Support & Communication

- Questions? Use [GitHub Discussions](https://github.com/hTuneSys/hexaWebShare/discussions)
- For sensitive topics, contact **[info@hexatune.com](mailto:info@hexatune.com)**
- Please follow our [Code of Conduct](https://github.com/hTuneSys/hexaWebShare/blob/main/.github/CODE_OF_CONDUCT.md)

We’re excited to build hexaWebShare with your help 🚀
