<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# NPM Publishing Setup Guide

This document explains how to set up NPM publishing for the hexaWebShare library.

---

## 🎯 Overview

The hexaWebShare library is automatically published to NPM when a version tag is pushed. The workflow is:

1. Create a release branch: `release/v0.1.0`
2. Create and push a git tag: `git tag v0.1.0 && git push origin v0.1.0`
3. GitHub Actions automatically:
   - Runs quality checks (type, lint, build)
   - Updates package.json version
   - Generates CHANGELOG.md
   - Publishes to NPM as `@htunesys/hexawebshare`
   - Creates a GitHub Release

---

## 📋 Prerequisites

### 1. NPM Account Setup

1. **Create NPM Account** (if you don't have one)
   - Visit: https://www.npmjs.com/signup
   - Sign up with email and password
   - Verify your email

2. **Enable 2FA (Recommended)**
   - Go to: https://www.npmjs.com/settings/[your-username]/profile
   - Enable two-factor authentication
   - Use **Auth-only** mode (not Auth-and-publish) for automation

### 2. Create NPM Organization

The package is published under the `@htunesys` scope, which requires an organization:

1. **Create Organization:**
   ```bash
   npm login
   npm org create htunesys
   ```

2. **Or use existing organization:**
   - If `@htunesys` already exists, make sure you're a member with publish rights

3. **Verify membership:**
   ```bash
   npm org ls htunesys
   ```

### 3. Generate NPM Access Token

1. **Go to NPM Access Tokens page:**
   - https://www.npmjs.com/settings/[your-username]/tokens

2. **Generate New Token:**
   - Click **"Generate New Token"**
   - Select **"Automation"** type (for CI/CD)
   - Give it a name: `hexaWebShare GitHub Actions`
   - Click **"Generate Token"**

3. **Copy the token** (starts with `npm_...`)
   - ⚠️ **Important:** Save it immediately, you won't see it again!

---

## 🔐 Add NPM Token to GitHub Secrets

1. **Go to Repository Settings:**
   - https://github.com/hTuneSys/hexaWebShare/settings/secrets/actions

2. **Add New Secret:**
   - Click **"New repository secret"**
   - Name: `NPM_TOKEN`
   - Value: Paste your NPM token (`npm_...`)
   - Click **"Add secret"**

3. **Verify:**
   - The secret should now appear in the list (value hidden)

---

## 🚀 Publishing a New Version

### Step 1: Prepare Release Branch

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create release branch with version
git checkout -b release/v0.1.0

# Push release branch
git push origin release/v0.1.0
```

### Step 2: Create and Push Tag

```bash
# Create annotated tag
git tag -a v0.1.0 -m "Release v0.1.0"

# Push tag to trigger workflow
git push origin v0.1.0
```

### Step 3: Monitor GitHub Actions

1. Go to: https://github.com/hTuneSys/hexaWebShare/actions
2. Watch the **"📦 Release & Publish to NPM"** workflow
3. Check each step:
   - ✅ Quality checks pass
   - ✅ Package builds successfully
   - ✅ Published to NPM
   - ✅ GitHub Release created

### Step 4: Verify NPM Publication

```bash
# Check NPM package
npm view @htunesys/hexawebshare

# Check specific version
npm view @htunesys/hexawebshare@0.1.0

# Test installation
pnpm add @htunesys/hexawebshare@0.1.0
```

### Step 5: Merge to Main and Sync

```bash
# Merge release to main
git checkout main
git merge release/v0.1.0
git push origin main

# Sync back to develop
git checkout develop
git merge main
git push origin develop

# Optionally delete release branch
git branch -d release/v0.1.0
git push origin --delete release/v0.1.0
```

---

## 📝 Version Naming Convention

Follow Semantic Versioning (SemVer):

- **Major.Minor.Patch** (e.g., `v1.2.3`)
- **Major:** Breaking changes (e.g., `v2.0.0`)
- **Minor:** New features, backward compatible (e.g., `v1.3.0`)
- **Patch:** Bug fixes, backward compatible (e.g., `v1.2.4`)

**Examples:**

```bash
# First beta release
git tag v0.1.0

# Bug fix
git tag v0.1.1

# New feature
git tag v0.2.0

# Breaking change (stable)
git tag v1.0.0
```

---

## 🧪 Testing the Workflow

### Dry Run (Local)

Test package build without publishing:

```bash
cd hexawebshare

# Run all quality checks
pnpm check
pnpm lint
pnpm build
pnpm prepack

# Verify dist/ output
ls -la dist/
```

### Test NPM Package Locally

```bash
# Pack the package
cd hexawebshare
pnpm pack

# This creates: htunesys-hexawebshare-0.1.0.tgz

# Test in another project
cd /path/to/test-project
pnpm add /path/to/hexaWebShare/hexawebshare/htunesys-hexawebshare-0.1.0.tgz
```

### Test Workflow (First Release)

For your first release, consider using a beta version:

```bash
# Create beta version
git tag v0.1.0-beta.1
git push origin v0.1.0-beta.1

# Monitor workflow
# Check NPM: https://www.npmjs.com/package/@htunesys/hexawebshare

# If successful, create stable release
git tag v0.1.0
git push origin v0.1.0
```

---

## 🔧 Troubleshooting

### Error: `npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/@htunesys%2fhexawebshare`

**Cause:** NPM_TOKEN is missing or invalid

**Solution:**
1. Verify NPM_TOKEN is added to GitHub Secrets
2. Check token hasn't expired
3. Regenerate token if needed

### Error: `npm ERR! 404 Not Found - PUT https://registry.npmjs.org/@htunesys%2fhexawebshare`

**Cause:** Organization `@htunesys` doesn't exist or you're not a member

**Solution:**
1. Create organization: `npm org create htunesys`
2. Or get invited to existing org

### Error: `npm ERR! You do not have permission to publish "@htunesys/hexawebshare"`

**Cause:** You're not a member of `@htunesys` organization

**Solution:**
1. Ask organization owner to invite you
2. Or publish under different scope (update package.json)

### Error: `npm ERR! 403 You cannot publish over the previously published versions`

**Cause:** Version already exists on NPM

**Solution:**
1. Use a new version number
2. Delete the existing git tag: `git tag -d v0.1.0 && git push origin :v0.1.0`
3. Create new tag with incremented version

### Workflow doesn't trigger

**Cause:** Tag push didn't match pattern `v*.*.*`

**Solution:**
1. Verify tag format: `git tag -l`
2. Tag must start with `v` (e.g., `v0.1.0`, not `0.1.0`)
3. Check workflow file: `.github/workflows/release.yml`

---

## 📊 Monitoring Releases

### NPM Package Stats

- **Package page:** https://www.npmjs.com/package/@htunesys/hexawebshare
- **Version history:** https://www.npmjs.com/package/@htunesys/hexawebshare?activeTab=versions
- **Download stats:** https://npm-stat.com/charts.html?package=@htunesys/hexawebshare

### GitHub Releases

- **Releases page:** https://github.com/hTuneSys/hexaWebShare/releases
- **Tags page:** https://github.com/hTuneSys/hexaWebShare/tags

### Workflow Runs

- **Actions page:** https://github.com/hTuneSys/hexaWebShare/actions
- Filter by workflow: "📦 Release & Publish to NPM"

---

## 🔄 Updating the Workflow

If you need to modify the release workflow:

1. Edit `.github/workflows/release.yml`
2. Test changes on a feature branch first
3. Use a test tag (e.g., `v0.0.1-test`)
4. Verify workflow runs correctly
5. Merge to main

---

## 📚 Related Documentation

- [NPM Publishing Documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ✅ Checklist for First Release

- [ ] NPM account created and verified
- [ ] 2FA enabled on NPM account
- [ ] `@htunesys` organization created (or member added)
- [ ] NPM automation token generated
- [ ] `NPM_TOKEN` added to GitHub Secrets
- [ ] Package name is `@htunesys/hexawebshare` in package.json
- [ ] `publishConfig.access` is `public` in package.json
- [ ] Release workflow tested with beta tag
- [ ] First stable tag created and pushed
- [ ] Package appears on NPM
- [ ] GitHub Release created
- [ ] Installation tested: `pnpm add @htunesys/hexawebshare`

---

Built by hexaTune LLC | MIT License
