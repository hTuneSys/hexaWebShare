<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# AGENTS.md - AI Agent Guidelines for hexaWebShare

This document provides critical guidelines for AI coding assistants, LLMs, and automated agents working on the hexaWebShare project. Following these rules ensures consistency, quality, and adherence to project standards.

---

## 🎯 Project Overview

**hexaWebShare** is a comprehensive **Svelte 5 component library** built with:
- Svelte 5 (with runes)
- TypeScript
- Storybook
- DaisyUI + Tailwind CSS
- pnpm package manager
- Vite build tool

---

## 🚨 CRITICAL RULES - MUST FOLLOW

### 1. **ENGLISH ONLY - NO EXCEPTIONS**

**⚠️ ABSOLUTE REQUIREMENT:** All code, comments, documentation, commit messages, PR titles, branch names, and any text within project files **MUST BE IN ENGLISH ONLY**.

```typescript
// ✅ CORRECT - English only
interface Props {
  label: string;      // Button label
  variant: 'primary'; // Button variant
}

// ❌ WRONG - Contains non-English text
interface Props {
  label: string;      // Buton etiketi (NEVER DO THIS)
  variant: 'primary'; // Buton türü (NEVER DO THIS)
}
```

**This applies to:**
- All source code files (`.svelte`, `.ts`, `.js`)
- All comments (inline, JSDoc, block comments)
- All documentation files (`.md` files)
- All configuration files
- Commit messages
- PR titles and descriptions
- Branch names
- Issue titles and descriptions
- Code identifiers (variable names, function names, etc.)

**Before committing, verify:**
```bash
# Check for non-English characters in code files
grep -r -P '[^\x00-\x7F]' src/ --include="*.svelte" --include="*.ts" --include="*.js"
```

---

## 📋 Git Workflow - MANDATORY

### Branch Naming Strategy

**Reference:** [BRANCH_STRATEGY.md](docs/BRANCH_STRATEGY.md)

**Allowed branch prefixes:**

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New features or components | `feat/add-tooltip-component` |
| `fix/` | Bug fixes | `fix/modal-close-button` |
| `docs/` | Documentation changes | `docs/update-contributing` |
| `style/` | Code formatting (no logic change) | `style/format-button-component` |
| `refactor/` | Code refactoring | `refactor/simplify-props` |
| `perf/` | Performance improvements | `perf/optimize-render` |
| `test/` | Test additions/modifications | `test/add-button-tests` |
| `chore/` | Maintenance tasks | `chore/update-dependencies` |
| `ci/` | CI/CD changes | `ci/add-storybook-build` |
| `build/` | Build system changes | `build/update-vite-config` |
| `hotfix/` | Emergency fixes | `hotfix/critical-security-patch` |

**Rules:**
- ✅ Always branch from `develop`
- ❌ NEVER branch from `main`
- ✅ Use descriptive names: `feat/add-tooltip-component`
- ❌ NEVER use generic names: `feat/update` or `fix/bug`
- ✅ Use kebab-case: `feat/my-new-feature`
- ❌ NEVER use camelCase or snake_case in branch names

### Commit Message Strategy

**Reference:** [COMMIT_STRATEGY.md](docs/COMMIT_STRATEGY.md)

**Format:**
```
<type>(<optional-scope>): <short summary>
```

**Allowed commit types (exactly 12):**

1. `feat` - New feature
2. `fix` - Bug fix
3. `docs` - Documentation only
4. `style` - Code formatting (no logic)
5. `refactor` - Code restructuring
6. `perf` - Performance improvement
7. `test` - Test changes
8. `chore` - Maintenance tasks
9. `ci` - CI/CD changes
10. `build` - Build system changes
11. `release` - Release preparation
12. `hotfix` - Critical emergency fix

**Examples:**
```bash
# ✅ CORRECT
feat(Button): add loading state prop
fix(Modal): resolve focus trap issue
docs(README): update installation instructions
test(Button): add accessibility tests
refactor(Card): simplify prop structure

# ❌ WRONG
Update button component          # Missing type
feat: buton eklendi              # Non-English
fix stuff                        # Not descriptive
added new feature                # Wrong tense (use imperative)
```

**Rules:**
- ✅ Use imperative mood: "add" not "added" or "adds"
- ✅ Keep summary under 72 characters
- ✅ Reference issues when applicable: `fix: resolve #42`
- ❌ NEVER use generic messages: "update", "fix bug", "changes"
- ✅ ALWAYS use English only

### Pull Request Strategy

**Reference:** [PR_STRATEGY.md](docs/PR_STRATEGY.md)

**PR Title Format:** Same as commit messages
```
<type>(<optional-scope>): <short description>
```

**PR Checklist:**
- [ ] Title follows conventional format
- [ ] Title is in English only
- [ ] Description explains the change
- [ ] All checks pass (type check, lint, build)
- [ ] Code is formatted with Prettier
- [ ] No non-English text anywhere
- [ ] Branch name follows strategy
- [ ] Commits follow strategy

---

## 🏷️ Labeling Strategy

**Reference:** [LABELLING_STRATEGY.md](docs/LABELLING_STRATEGY.md)

**Key label categories:**

### Type Labels (use exactly one)
- `type:feature` - New feature
- `type:bug` - Bug fix
- `type:doc` - Documentation
- `type:enhancement` - Enhancement
- `type:refactor` - Code refactoring
- `type:test` - Tests
- `type:ci` - CI/CD
- `type:security` - Security issue

### Module Labels
- `module:core` - Core components
- `module:admin` - Admin components
- `module:b2b` - B2B components
- `module:ecommerce` - E-commerce components
- `module:marketing` - Marketing components
- `module:docs` - Documentation

### Priority Labels
- `priority:high` - Urgent
- `priority:medium` - Normal
- `priority:low` - Can wait

---

## 🎨 Code Style Guidelines

### Svelte 5 Component Pattern

```svelte
<!-- ✅ CORRECT PATTERN -->
<script lang="ts">
  // 1. Interface definition
  interface Props {
    label: string;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onclick?: () => void;
  }
  
  // 2. Props destructuring with defaults
  const { 
    label, 
    variant = 'primary',
    size = 'md',
    disabled = false,
    ...props 
  }: Props = $props();
  
  // 3. Derived state (if needed)
  let buttonClasses = $derived([
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    size === 'sm' && 'btn-sm',
    size === 'md' && 'btn-md',
    size === 'lg' && 'btn-lg',
  ].filter(Boolean).join(' '));
</script>

<button class={buttonClasses} {disabled} {...props}>
  {label}
</button>
```

### DaisyUI Styling - STATIC CLASSES ONLY

```typescript
// ✅ CORRECT - Static classes for JIT compilation
let classes = $derived([
  'btn',
  variant === 'primary' && 'btn-primary',
  variant === 'secondary' && 'btn-secondary',
  size === 'lg' && 'btn-lg',
].filter(Boolean).join(' '));

// ❌ WRONG - Dynamic string interpolation doesn't work with JIT
let classes = `btn-${variant} btn-${size}`; // DON'T DO THIS
```

### TypeScript Requirements

```typescript
// ✅ ALWAYS define Props interface
interface Props {
  label: string;          // Required prop
  variant?: 'primary';    // Optional with type
  onclick?: () => void;   // Event handler
}

// ✅ ALWAYS use strict TypeScript
// ❌ NEVER use 'any' type
// ✅ Use proper type annotations
```

### File Organization

```
component-name/
├── ComponentName.svelte        # Component implementation
├── ComponentName.stories.svelte # Storybook story
└── ComponentName.test.ts       # Tests (if applicable)
```

---

## 📖 Storybook Story Pattern

```svelte
<!-- ComponentName.stories.svelte -->
<script lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ComponentName from './ComponentName.svelte';
  
  const { Story } = defineMeta({
    component: ComponentName,
    title: 'Category/Subcategory/ComponentName',
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['primary', 'secondary'],
      },
    },
  });
</script>

<Story 
  name="Primary" 
  args={{ label: 'Primary Button', variant: 'primary' }} 
/>

<Story 
  name="Secondary" 
  args={{ label: 'Secondary Button', variant: 'secondary' }} 
/>
```

---

## 🧪 Quality Checks - RUN BEFORE COMMITTING

```bash
# 1. Type check
pnpm check

# 2. Format code
pnpm format

# 3. Lint check
pnpm lint

# 4. Build verification
pnpm build

# 5. Test Storybook build
pnpm build-storybook
```

---

## 📁 Component Categories

When creating components, use the correct category:

1. **core/** - Basic UI building blocks (buttons, inputs, cards)
2. **admin/** - Admin panel components (dashboards, tables)
3. **b2b/** - Business workspace components (projects, workflows)
4. **ecommerce/** - Online store components (products, cart)
5. **marketing/** - Marketing sections (hero, features)
6. **utility/** - Cross-cutting utilities (auth, errors)

---

## 🚫 Common Mistakes to AVOID

### ❌ Language Violations

```typescript
// ❌ NEVER DO THIS
const mesaj = "Merhaba"; // Non-English variable name
// Buton komponenti (Turkish comment)
interface Ozellikler { // Turkish interface name
  etiket: string; // Turkish property name
}
```

```typescript
// ✅ ALWAYS DO THIS
const message = "Hello"; // English variable name
// Button component (English comment)
interface Props { // English interface name
  label: string; // English property name
}
```

### ❌ Branch/Commit Violations

```bash
# ❌ WRONG
git checkout -b yeni-ozellik        # Non-English branch name
git commit -m "buton eklendi"       # Non-English commit
git commit -m "update"              # Too generic
git checkout -b feature/MyFeature   # Wrong case

# ✅ CORRECT
git checkout -b feat/add-new-button # English, proper prefix, kebab-case
git commit -m "feat(Button): add new button component" # Conventional
```

### ❌ Code Style Violations

```typescript
// ❌ WRONG - Dynamic classes
let classes = `btn-${variant}`; // Won't work with Tailwind JIT

// ❌ WRONG - Using 'any' type
const data: any = fetchData();

// ❌ WRONG - Missing interface
const { label, variant } = $props(); // No type safety
```

---

## ✅ Pre-Commit Checklist for AI Agents

Before creating a commit or PR, verify:

- [ ] All text is in English (code, comments, docs)
- [ ] No non-ASCII characters in code files
- [ ] Branch name follows strategy (correct prefix, kebab-case)
- [ ] Commit message follows conventional format
- [ ] TypeScript interfaces defined for all components
- [ ] DaisyUI classes used correctly (static, not dynamic)
- [ ] Storybook story created for new components
- [ ] Component exported in `src/lib/index.ts`
- [ ] `pnpm check` passes
- [ ] `pnpm format` applied
- [ ] All comments are in English
- [ ] Variable/function names are in English

---

## 📚 Required Reading

AI agents should be familiar with these documents:

1. **[BRANCH_STRATEGY.md](docs/BRANCH_STRATEGY.md)** - Branch naming rules
2. **[COMMIT_STRATEGY.md](docs/COMMIT_STRATEGY.md)** - Commit message format
3. **[PR_STRATEGY.md](docs/PR_STRATEGY.md)** - Pull request guidelines
4. **[LABELLING_STRATEGY.md](docs/LABELLING_STRATEGY.md)** - Label taxonomy
5. **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Contribution workflow
6. **[DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)** - Development practices
7. **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture

---

## 🤖 AI Agent Behavior Guidelines

### When Writing Code

1. **Always use English** for all identifiers, comments, and strings
2. **Follow Svelte 5 patterns** with runes ($props, $derived, $state)
3. **Use TypeScript strictly** - no 'any' types
4. **Apply DaisyUI classes statically** - no string interpolation
5. **Create Storybook stories** for all components
6. **Export components** in src/lib/index.ts

### When Creating Commits

1. **Use conventional format** - `type(scope): description`
2. **Use imperative mood** - "add" not "added"
3. **Keep messages concise** - under 72 characters
4. **Write in English only** - no exceptions
5. **Reference issues** when applicable - `fix: resolve #42`

### When Opening PRs

1. **Follow title format** - same as commit messages
2. **Fill PR template** completely
3. **Ensure all checks pass** before marking ready
4. **Apply correct labels** from labelling strategy
5. **Write description in English** - explain what and why

### When Reviewing Code

1. **Check for non-English text** - this is critical
2. **Verify conventional format** for commits and PRs
3. **Ensure type safety** - no 'any' types
4. **Check DaisyUI usage** - static classes only
5. **Verify Storybook stories** exist for new components

---

## 🔍 Validation Commands

Run these to validate your work:

```bash
# Check for non-English characters
grep -r -P '[^\x00-\x7F]' src/ docs/ --include="*.svelte" --include="*.ts" --include="*.md"

# Type check
pnpm check

# Format check
pnpm lint

# Build check
pnpm build

# Storybook build check
pnpm build-storybook
```

---

## 📞 Questions?

If you're unsure about any guideline:

1. Check the referenced documentation files
2. Look at existing code for patterns
3. When in doubt, ask for human review
4. **Never compromise on English-only rule**

---

## ⚖️ License & Compliance

- All contributions must include SPDX headers
- All code is MIT licensed
- Follow REUSE compliance standards

```svelte
<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->
```

---

## 🎯 Summary for AI Agents

**Top 5 Non-Negotiable Rules:**

1. **ENGLISH ONLY** - No non-English text anywhere
2. **Follow branch strategy** - Correct prefixes, kebab-case
3. **Follow commit strategy** - Conventional format, imperative mood
4. **Use TypeScript strictly** - Interfaces for all props, no 'any'
5. **Static DaisyUI classes** - No dynamic string interpolation

**Remember:** Quality > Speed. Take time to follow all guidelines correctly.

---

Built by [hexaTune LLC](https://hexatune.com) · License: [MIT](LICENSE)
