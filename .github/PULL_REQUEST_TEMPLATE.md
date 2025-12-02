# Pull Request

## 📄 Summary

> Clearly describe what this PR changes and why it is necessary.  
> Link to any relevant issue(s) below.

---

## 🧩 Affected Module(s)

Mark the modules impacted by this PR:

- [ ] Source Code
- [ ] Documentation
- [ ] CI / Infra

---

## ✏️ PR Title Format

> ⚠️ PR title must follow [Conventional Commits](https://www.conventionalcommits.org/) format.  
> **Only these types are allowed:**

```text
feat, fix, chore, refactor, test, docs, ci, perf, build, release, hotfix, style
```

✅ Examples:

```text
feat: add onboarding screen
fix: resolve overflow error on profile page
chore: clean up unused widgets
refactor: simplify authentication bloc
test: add widget tests for login form
docs: update setup guide for Flutter environment
ci: add Flutter analyze to pipeline
perf: optimize list rendering with const widgets
build: bump Flutter SDK and dependencies
release: prepare 1.2.0 mobile release
hotfix: patch crash on app startup
style: apply dart format to lib/
```

---

## ✅ Checklist

Before submitting, make sure you've completed the following:

- [ ] My branch name follows format: <type>/<short-description> (e.g., feat/login-screen)
- [ ] My PR title starts with one of the approved types listed above
- [ ] My Dart code is formatted (dart format . or flutter format .)
- [ ] I ran static analysis (flutter analyze) and resolved warnings
- [ ] I ran tests successfully (flutter test)
- [ ] I updated / checked pubspec.yaml and pubspec.lock for dependency changes
- [ ] For UI changes, I added screenshots and/or updated golden tests (if applicable)
- [ ] I linked related issues using keywords like Closes #42
- [ ] I ensured this PR has no unrelated changes
- [ ] This PR is ready for review and does not include unfinished work

---

## 🔗 Related Issues

> If this PR addresses one or more issues, link them here:

```text
Closes #
```

---

## 💬 Additional Notes (Optional)

> Include any test instructions, screenshots, diagrams, or context useful for reviewers.
