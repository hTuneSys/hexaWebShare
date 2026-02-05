<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# Release Workflow Guide

This document describes the complete release workflow for hexaWebShare.

---

## 🎯 Overview

hexaWebShare uses a **tag-based release workflow**:

1. Developer creates a release branch from `develop`
2. Developer creates and pushes a version tag
3. GitHub Actions automatically publishes to NPM
4. Developer merges release to `main` and syncs to `develop`

**Package Name:** `@htunesys/hexawebshare`  
**Registry:** NPM (https://www.npmjs.com)

---

## 📋 Release Workflow Steps

### 1️⃣ Prepare Release Branch

```bash
# Start from develop branch
git checkout develop
git pull origin develop

# Create release branch with version
git checkout -b release/v0.1.0

# Optionally: Update CHANGELOG manually if needed
# Edit CHANGELOG.md

# Commit any manual changes
git add .
git commit -m "chore: prepare release v0.1.0"

# Push release branch
git push origin release/v0.1.0
```

**Branch Naming:** `release/v{MAJOR}.{MINOR}.{PATCH}`
- ✅ `release/v0.1.0`
- ✅ `release/v1.2.3`
- ❌ `release/0.1.0` (missing 'v')
- ❌ `rel/v0.1.0` (wrong prefix)

---

### 2️⃣ Create and Push Version Tag

```bash
# Create annotated tag (REQUIRED: must start with 'v')
git tag -a v0.1.0 -m "Release v0.1.0"

# Push tag to trigger GitHub Actions workflow
git push origin v0.1.0
```

**Tag Format:** `v{MAJOR}.{MINOR}.{PATCH}`
- ✅ `v0.1.0` - First beta
- ✅ `v1.0.0` - Stable release
- ✅ `v1.2.3` - Bug fix
- ❌ `0.1.0` - Missing 'v' prefix
- ❌ `v1.0` - Missing patch version

**Semantic Versioning:**
- **MAJOR:** Breaking changes (v2.0.0)
- **MINOR:** New features, backward compatible (v1.3.0)
- **PATCH:** Bug fixes, backward compatible (v1.2.4)

---

### 3️⃣ Monitor GitHub Actions Workflow

1. **Go to Actions tab:**
   - https://github.com/hTuneSys/hexaWebShare/actions

2. **Find the workflow run:**
   - Name: "📦 Release & Publish to NPM"
   - Triggered by: Tag push `v0.1.0`

3. **Monitor steps:**
   - ✅ Extract version from tag
   - ✅ Install dependencies
   - ✅ TypeScript type check
   - ✅ Prettier format check
   - ✅ Build library
   - ✅ Package validation
   - ✅ Update package.json version
   - ✅ Generate CHANGELOG.md
   - ✅ Commit version changes
   - ✅ Publish to NPM
   - ✅ Create GitHub Release

4. **Check for errors:**
   - If any step fails, workflow stops
   - Fix the issue and create a new tag (e.g., v0.1.1)

---

### 4️⃣ Verify NPM Publication

```bash
# Check package on NPM
npm view @htunesys/hexawebshare

# Check specific version
npm view @htunesys/hexawebshare@0.1.0

# View all versions
npm view @htunesys/hexawebshare versions

# Test installation in a new project
mkdir test-project
cd test-project
pnpm init
pnpm add @htunesys/hexawebshare@0.1.0
```

**NPM Package URL:**
https://www.npmjs.com/package/@htunesys/hexawebshare

---

### 5️⃣ Verify GitHub Release

1. **Check Releases page:**
   - https://github.com/hTuneSys/hexaWebShare/releases

2. **Verify release contents:**
   - ✅ Release title: "Release v0.1.0"
   - ✅ Release notes with installation instructions
   - ✅ Links to NPM package
   - ✅ Links to documentation

---

### 6️⃣ Merge Release to Main

```bash
# Switch to main branch
git checkout main
git pull origin main

# Merge release branch
git merge release/v0.1.0

# Push to main
git push origin main
```

**Alternative: Create Pull Request**
```bash
# On GitHub: Create PR from release/v0.1.0 to main
# Title: "Release v0.1.0"
# Merge when approved
```

---

### 7️⃣ Sync to Develop

```bash
# Switch to develop
git checkout develop
git pull origin develop

# Merge main (includes version bump and changelog)
git merge main

# Push to develop
git push origin develop
```

---

### 8️⃣ Clean Up (Optional)

```bash
# Delete local release branch
git branch -d release/v0.1.0

# Delete remote release branch
git push origin --delete release/v0.1.0
```

---

## 🔄 Complete Workflow Diagram

```
develop
   │
   ├─── Create release/v0.1.0
   │         │
   │         ├─── Push tag v0.1.0
   │         │         │
   │         │         └─── GitHub Actions
   │         │                 ├─── Quality checks
   │         │                 ├─── Update version
   │         │                 ├─── Generate CHANGELOG
   │         │                 ├─── Publish to NPM ✅
   │         │                 └─── Create GitHub Release ✅
   │         │
   │         └─── Merge to main
   │                   │
   │                   └─── Merge back to develop
   │
   └─── Continue development
```

---

## 📝 Quality Checks (Automated)

The workflow automatically runs these checks before publishing:

1. **TypeScript Type Check**
   ```bash
   pnpm check
   ```

2. **Prettier Format Check**
   ```bash
   pnpm lint
   ```

3. **Build Library**
   ```bash
   pnpm build
   ```

4. **Package Validation**
   ```bash
   pnpm prepack  # Runs svelte-package and publint
   ```

**If any check fails:**
- ❌ Workflow stops
- ❌ Package is NOT published
- ✅ Fix the issue in release branch
- ✅ Create new tag (increment patch version)

---

## 🚨 Troubleshooting

### Tag already exists

**Error:**
```
fatal: tag 'v0.1.0' already exists
```

**Solution:**
```bash
# Delete local tag
git tag -d v0.1.0

# Delete remote tag
git push origin :v0.1.0

# Create new tag
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

### Version already published on NPM

**Error:**
```
npm ERR! 403 You cannot publish over the previously published versions
```

**Solution:**
```bash
# Increment version
git tag -a v0.1.1 -m "Release v0.1.1"
git push origin v0.1.1
```

### Workflow doesn't trigger

**Possible causes:**
1. Tag doesn't start with `v`
2. Tag format is incorrect (must be `v*.*.*`)
3. Workflow file has errors

**Solution:**
```bash
# Check tag format
git tag -l

# Verify workflow file
cat .github/workflows/release.yml

# Re-push tag
git push origin v0.1.0 --force
```

### NPM_TOKEN not found

**Error:**
```
npm ERR! code E401
npm ERR! 401 Unauthorized
```

**Solution:**
1. Check `NPM_TOKEN` secret in GitHub repository settings
2. Verify token hasn't expired
3. Regenerate token if needed (see NPM_SETUP.md)

---

## 🎯 Quick Reference

### Create Release

```bash
# One-liner for experienced users
git checkout develop && \
git pull && \
git checkout -b release/v0.1.0 && \
git push origin release/v0.1.0 && \
git tag -a v0.1.0 -m "Release v0.1.0" && \
git push origin v0.1.0
```

### Verify Release

```bash
# Check GitHub Actions
open https://github.com/hTuneSys/hexaWebShare/actions

# Check NPM
npm view @htunesys/hexawebshare@0.1.0

# Test installation
pnpm add @htunesys/hexawebshare@0.1.0
```

### Complete Merge

```bash
# Merge to main and sync to develop
git checkout main && \
git merge release/v0.1.0 && \
git push && \
git checkout develop && \
git merge main && \
git push && \
git branch -d release/v0.1.0 && \
git push origin --delete release/v0.1.0
```

---

## 📚 Related Documentation

- **NPM Setup:** [NPM_SETUP.md](NPM_SETUP.md)
- **Branch Strategy:** [docs/BRANCH_STRATEGY.md](docs/BRANCH_STRATEGY.md)
- **Commit Strategy:** [docs/COMMIT_STRATEGY.md](docs/COMMIT_STRATEGY.md)
- **Contributing:** [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## ✅ Pre-Release Checklist

Before creating a release tag:

- [ ] All features merged to `develop`
- [ ] CI checks passing on `develop`
- [ ] Version number decided (semantic versioning)
- [ ] CHANGELOG reviewed (optional, will be auto-generated)
- [ ] Breaking changes documented (if major version)
- [ ] Migration guide written (if major version)
- [ ] NPM_TOKEN configured in GitHub Secrets
- [ ] Ready to publish publicly

---

Built by hexaTune LLC | MIT License
