<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# DEVELOPMENT_GUIDE.md

This guide helps developers understand how to work with the hexaWebShare project. It explains the internal structure, tools, development workflow, and best practices.

---

## 🔀 Branching & PRs

Follow the naming rules defined in [BRANCH_STRATEGY](BRANCH_STRATEGY.md) and [PR_STRATEGY](PR_STRATEGY.md). Allowed branch prefixes:

- `feat/`, `fix/`, `refactor/`, `test/`, `docs/`, `ci/`, etc.

Create a feature branch:

```bash
git checkout -b feat/new-module
```

Open a PR with a valid title and follow checklist from [PULL_REQUEST_TEMPLATE](../.github/PULL_REQUEST_TEMPLATE.md).

---

## 🧱 Commit Conventions

Use the supported 12 types from [COMMIT_STRATEGY](COMMIT_STRATEGY.md). Example:

```bash
feat: add token parsing logic
```

Use semantic and meaningful commits. PRs with vague or mixed commits will be rejected.

---

## 🧪 CI/CD Pipeline

CI runs automatically via GitHub Actions:

- Linting (`clippy`)
- Formatting (`rustfmt`)
- Tests (`cargo test`)
- Branch and commit validation

---

## 🛡️ Branch Protection

Branches like `main`, `release`, and `develop` are protected:

- Require PR review
- Require status checks
- Require conventional commit title

---

## 📚 Documentation & Contributions

All contributors must follow the documentation style and structure:

- Use `///` for public Rust docs
- Update relevant `.md` files in `docs/` when modifying features
- Follow the guide in [CONTRIBUTING](CONTRIBUTING.md)

---

## 🧠 Helpful Resources

- [GETTING_STARTED](GETTING_STARTED.md) – Initial setup and quick commands
- [ARCHITECTURE](ARCHITECTURE.md) – System design and modules
- [CONTACT](CONTACT.md), [SUPPORT](SUPPORT.md) – Communication channels
- [LABELLING_STRATEGY](LABELLING_STRATEGY.md) – Tag issues/PRs correctly
- [PROJECT_STRUCTURE](PROJECT_STRUCTURE.md) – Directory structure
- [BRANCH_STRATEGY](BRANCH_STRATEGY.md) – Branch naming conventions
- [COMMIT_STRATEGY](COMMIT_STRATEGY.md) – Commit message conventions

---

Welcome to the hexaWebShare dev team! Let’s build it right from the start.
