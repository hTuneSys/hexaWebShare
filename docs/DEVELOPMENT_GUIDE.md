<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# DEVELOPMENT_GUIDE.md

This guide helps developers understand how to work with the hexaWebShare Svelte component library. It explains the development workflow, tools, best practices, and internal structure.

---

## 🎯 Overview

hexaWebShare is a modern Svelte 5 component library built with:
- **Svelte 5** with runes
- **TypeScript** for type safety
- **Storybook** for component development
- **DaisyUI** + Tailwind CSS for styling
- **pnpm** for package management
- **Vite** for fast builds

---

## 🚀 Quick Start

### Prerequisites

Ensure you have installed:
- **Node.js** 18+ (LTS recommended)
- **pnpm** 9+ (install via `npm install -g pnpm`)
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/hTuneSys/hexaWebShare.git
cd hexaWebShare/hexawebshare

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Or start SvelteKit dev server
pnpm dev
```

---

## 📁 Project Structure

```
hexawebshare/
├── .storybook/          # Storybook configuration
│   ├── main.ts          # Storybook main config
│   ├── preview.ts       # Global decorators and parameters
│   └── ThemeWrapper.svelte  # Theme switching wrapper
├── src/
│   ├── components/      # Component library
│   │   ├── core/        # Core UI components
│   │   ├── admin/       # Admin panel components
│   │   ├── b2b/         # B2B workspace components
│   │   ├── ecommerce/   # E-commerce components
│   │   ├── marketing/   # Marketing components
│   │   └── utility/     # Utility components
│   ├── lib/
│   │   └── index.ts     # Library entry point (exports)
│   └── routes/          # SvelteKit routes (for showcase)
├── static/              # Static assets
├── package.json         # Package configuration
├── svelte.config.js     # SvelteKit configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.js   # Tailwind + DaisyUI configuration
```

---

## 🧱 Development Workflow

### 1. Component Development

#### Create Component Structure

```bash
# Create component and story files
touch src/components/core/buttons/MyButton.svelte
touch src/components/core/buttons/MyButton.stories.svelte
```

#### Write Component

```svelte
<!-- src/components/core/buttons/MyButton.svelte -->
<script lang="ts">
  interface Props {
    label: string;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onclick?: () => void;
  }
  
  const { 
    label, 
    variant = 'primary',
    size = 'md',
    disabled = false,
    ...props 
  }: Props = $props();
  
  // Use derived to compute classes reactively
  let buttonClasses = $derived([
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'accent' && 'btn-accent',
    size === 'sm' && 'btn-sm',
    size === 'md' && 'btn-md',
    size === 'lg' && 'btn-lg',
  ].filter(Boolean).join(' '));
</script>

<button 
  class={buttonClasses} 
  {disabled}
  {...props}
>
  {label}
</button>
```

#### Write Storybook Story

```svelte
<!-- src/components/core/buttons/MyButton.stories.svelte -->
<script lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MyButton from './MyButton.svelte';
  
  const { Story } = defineMeta({
    component: MyButton,
    title: 'Core/Buttons/MyButton',
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['primary', 'secondary', 'accent'],
      },
      size: {
        control: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  });
</script>

<Story name="Primary" args={{ label: 'Primary Button', variant: 'primary' }} />
<Story name="Secondary" args={{ label: 'Secondary Button', variant: 'secondary' }} />
<Story name="Accent" args={{ label: 'Accent Button', variant: 'accent' }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
```

#### Export Component

```typescript
// src/lib/index.ts
export { default as MyButton } from '../components/core/buttons/MyButton.svelte';
```

### 2. View in Storybook

```bash
# Start Storybook dev server
pnpm storybook

# Open http://localhost:6006
```

Navigate to `Core > Buttons > MyButton` to see your component.

### 3. Test Component

```bash
# Type check
pnpm check

# Format code
pnpm format

# Run tests (if configured)
pnpm test
```

---

## 🎨 Styling Guidelines

### DaisyUI Component Classes

Use DaisyUI's semantic class names:

```svelte
<button class="btn btn-primary">Primary</button>
<div class="card">Card content</div>
<input class="input input-bordered" />
```

### Static Classes for JIT

Always use **static** class strings for Tailwind JIT:

```typescript
// ✅ Good - Static classes
let classes = $derived([
  'btn',
  variant === 'primary' && 'btn-primary',
  size === 'lg' && 'btn-lg',
].filter(Boolean).join(' '));

// ❌ Bad - Dynamic string interpolation
let classes = `btn-${variant} btn-${size}`; // Won't work with JIT
```

### Theme Support

Components automatically support light/dark themes:

```svelte
<!-- Themes are applied via data-theme attribute -->
<html data-theme="light">  <!-- or "dark" -->
```

---

## 🧪 Svelte 5 Runes

### State Management

```svelte
<script lang="ts">
  // State
  let count = $state(0);
  
  // Derived state
  let doubled = $derived(count * 2);
  
  // Effects
  $effect(() => {
    console.log('Count changed:', count);
  });
  
  // Props
  const { name, age }: Props = $props();
</script>
```

### Component Props

```typescript
interface Props {
  // Required
  name: string;
  
  // Optional with default
  variant?: 'primary' | 'secondary';
  
  // Optional without default
  className?: string;
  
  // Events
  onclick?: () => void;
  
  // Children (slots)
  children?: import('svelte').Snippet;
}

const { 
  name, 
  variant = 'primary',
  className,
  onclick,
  children,
}: Props = $props();
```

---

## 🧪 Testing

### Unit Tests with Vitest

```typescript
// MyButton.test.ts
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import MyButton from './MyButton.svelte';

describe('MyButton', () => {
  it('renders with label', () => {
    const { getByText } = render(MyButton, { label: 'Click me' });
    expect(getByText('Click me')).toBeTruthy();
  });
  
  it('calls onclick when clicked', async () => {
    let clicked = false;
    const { getByText } = render(MyButton, {
      label: 'Click',
      onclick: () => { clicked = true; }
    });
    
    await fireEvent.click(getByText('Click'));
    expect(clicked).toBe(true);
  });
});
```

Run tests:

```bash
pnpm test
```

### Accessibility Testing

Use Storybook's a11y addon:

1. Open Storybook
2. Navigate to your component story
3. Open the "Accessibility" tab
4. Fix any violations reported

---

## 🔀 Branching & PRs

Follow the naming rules defined in [BRANCH_STRATEGY](BRANCH_STRATEGY.md) and [PR_STRATEGY](PR_STRATEGY.md).

### Allowed Branch Prefixes

- `feat/` – New features or components
- `fix/` – Bug fixes
- `refactor/` – Code refactoring
- `test/` – Tests
- `docs/` – Documentation
- `ci/` – CI/CD changes
- `style/` – Code formatting
- `perf/` – Performance improvements
- `chore/` – Maintenance

### Create a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feat/new-component
```

### Open a PR

Follow the [PR template](../.github/PULL_REQUEST_TEMPLATE.md):

1. Write descriptive title: `feat(MyButton): add new button component`
2. Fill out PR description
3. Check all items in the checklist
4. Request review

---

## 🧱 Commit Conventions

Use the supported types from [COMMIT_STRATEGY](COMMIT_STRATEGY.md):

```bash
feat(MyButton): add new button component
fix(Modal): resolve focus trap issue
docs(README): update installation guide
test(Button): add accessibility tests
refactor(Card): simplify props structure
style: format code with prettier
chore(deps): update dependencies
```

Use semantic and meaningful commits. PRs with vague commits will be rejected.

---

## 🧪 CI/CD Pipeline

CI runs automatically via GitHub Actions:

- **Linting**: Prettier check
- **Type checking**: svelte-check
- **Build**: Verify build succeeds
- **Tests**: Run Vitest (if configured)
- **Branch validation**: Check branch naming
- **Commit validation**: Check commit messages

---

## 🛡️ Branch Protection

Branches like `main`, `release/*`, and `develop` are protected:

- Require PR review
- Require status checks to pass
- Require conventional commit titles
- No direct pushes allowed

---

## 📚 Documentation & Contributions

### Component Documentation

- Write Storybook stories with `tags: ['autodocs']`
- Add JSDoc comments to TypeScript interfaces
- Include usage examples in stories
- Document all props and events

### Update Documentation Files

When modifying features, update relevant `.md` files in `docs/`:

- [ARCHITECTURE](ARCHITECTURE.md) – System design
- [CONFIGURATION](CONFIGURATION.md) – Config changes
- [PROJECT_STRUCTURE](PROJECT_STRUCTURE.md) – Directory changes

Follow the guide in [CONTRIBUTING](CONTRIBUTING.md).

---

## 🧠 Helpful Resources

### Internal Docs

- [GETTING_STARTED](GETTING_STARTED.md) – Initial setup and quick commands
- [ARCHITECTURE](ARCHITECTURE.md) – System design and modules
- [CONFIGURATION](CONFIGURATION.md) – Configuration details
- [CONTRIBUTING](CONTRIBUTING.md) – Contribution guidelines
- [PROJECT_STRUCTURE](PROJECT_STRUCTURE.md) – Directory structure
- [CONTACT](CONTACT.md), [SUPPORT](SUPPORT.md) – Communication channels
- [LABELLING_STRATEGY](LABELLING_STRATEGY.md) – Tag issues/PRs correctly
- [BRANCH_STRATEGY](BRANCH_STRATEGY.md) – Branch naming conventions
- [COMMIT_STRATEGY](COMMIT_STRATEGY.md) – Commit message conventions

### External Resources

- [Svelte 5 Docs](https://svelte.dev/docs/svelte/overview)
- [SvelteKit Docs](https://svelte.dev/docs/kit)
- [DaisyUI Docs](https://daisyui.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Storybook Docs](https://storybook.js.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

## 🎯 Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
2. **Composability**: Build complex UIs from simple components
3. **Type Safety**: Always define TypeScript interfaces
4. **Accessibility**: ARIA attributes, keyboard navigation, focus management
5. **Documentation**: Write clear stories and prop descriptions

### Code Quality

1. **Format on Save**: Enable Prettier formatting
2. **Type Check**: Run `pnpm check` before committing
3. **Test Accessibility**: Use Storybook a11y addon
4. **Keep it Simple**: Avoid over-engineering
5. **Follow Conventions**: Use established patterns in the codebase

### Performance

1. **Use Derived State**: Prefer `$derived` over manual state updates
2. **Minimize Re-renders**: Use `$effect` carefully
3. **Lazy Load**: Code split large components
4. **Optimize Bundles**: Check bundle size with `pnpm build`

---

## 🐛 Debugging

### Svelte DevTools

Install [Svelte DevTools](https://github.com/sveltejs/svelte-devtools) browser extension.

### Storybook Debugging

- Use `console.log()` in stories
- Check browser console for errors
- Use Storybook's Actions addon for event logging

### Type Errors

```bash
# Check types
pnpm check

# Watch mode
pnpm check:watch
```

---

## 📦 Building & Publishing

### Build Library

```bash
# Build package
pnpm build

# Output in dist/ directory
```

### Build Storybook

```bash
# Build static Storybook site
pnpm build-storybook

# Output in storybook-static/
```

### Publish to NPM

```bash
# Bump version
npm version patch|minor|major

# Publish
npm publish
```

---

## 🎨 Code Style

### TypeScript

- Use strict mode
- Define interfaces for all props
- Avoid `any` type
- Use type inference when obvious

### Svelte

- Use `<script lang="ts">` for TypeScript
- Prefer runes over legacy reactivity
- Keep components under 200 lines
- Extract complex logic to separate functions

### Formatting

- Use Prettier (configured)
- Use tabs for indentation
- Single quotes
- 100 character line width

---

## 🚦 Quality Gates

Before merging PR:

- ✅ All tests pass
- ✅ Type check passes
- ✅ Prettier check passes
- ✅ Build succeeds
- ✅ Storybook builds
- ✅ No accessibility violations
- ✅ PR approved by maintainer

---

Welcome to the hexaWebShare dev team! Let's build amazing components together! 🚀
