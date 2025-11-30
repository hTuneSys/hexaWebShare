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

- [Getting Started](GETTING_STARTED.md) – Setup guide for new developers
- [Architecture](ARCHITECTURE.md) – Component library architecture and design
- [Development Guide](DEVELOPMENT_GUIDE.md) – Detailed development workflow
- [Project Structure](PROJECT_STRUCTURE.md) – Repository organization
- [Branch Strategy](BRANCH_STRATEGY.md) – Git branching guidelines
- [FAQ](FAQ.md) – Frequently asked questions

---

## 🧩 Contribution Types

### 1. Code Contributions
- **New Components**: Add new UI components to the library
- **Component Enhancements**: Improve existing components
- **Bug Fixes**: Fix issues in existing components
- **Type Definitions**: Improve TypeScript types
- **Accessibility**: Enhance ARIA support and keyboard navigation
- **Performance**: Optimize component rendering and bundle size

### 2. Storybook Stories
- Add stories for existing components
- Improve component documentation
- Add interactive examples
- Create accessibility test cases

### 3. Documentation
- Fix typos and improve clarity
- Add code examples
- Write guides and tutorials
- Update API documentation

### 4. Testing
- Write unit tests with Vitest
- Add E2E tests with Playwright
- Improve test coverage
- Add visual regression tests

### 5. Issues & Feedback
- Report bugs with reproductions
- Propose new features
- Suggest improvements
- Answer questions in discussions

---

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/hexaWebShare.git
cd hexaWebShare/hexawebshare
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development

```bash
# Start Storybook for component development
pnpm storybook

# Or start the SvelteKit dev server
pnpm dev
```

---

## 🔀 Branch Strategy

Follow our [Branching Guide](BRANCH_STRATEGY.md):

### Branch Naming

Always branch from `develop` and use one of these prefixes:

- `feat/` – New features or components
- `fix/` – Bug fixes
- `refactor/` – Code refactoring
- `test/` – Adding or updating tests
- `docs/` – Documentation changes
- `style/` – Code style/formatting changes
- `perf/` – Performance improvements
- `chore/` – Maintenance tasks
- `ci/` – CI/CD changes
- `build/` – Build system changes

### Examples

```bash
git checkout develop
git pull origin develop
git checkout -b feat/new-button-component
git checkout -b fix/modal-close-bug
git checkout -b docs/update-getting-started
```

### Important Rules

- **Never** branch from `main`
- **Never** push directly to `main` or `develop`
- Always create a PR for your changes
- Keep branches focused on a single feature/fix

---

## ✏️ Commit & PR Formatting

All commits and pull requests must follow [Conventional Commits](https://www.conventionalcommits.org/):

### Allowed Commit Types

- `feat`: New feature or component
- `fix`: Bug fix
- `refactor`: Code refactoring
- `test`: Add or update tests
- `docs`: Documentation changes
- `style`: Code formatting (no functional changes)
- `perf`: Performance improvements
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `release`: Release preparation
- `hotfix`: Critical bug fix

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Examples

```bash
# Component changes
feat(Button): add loading state prop
fix(Modal): resolve focus trap issue
refactor(Card): simplify prop structure

# Documentation
docs(README): update installation instructions
docs(Button): add usage examples to story

# Tests
test(Button): add accessibility tests
test(Modal): add keyboard navigation tests

# Chores
chore(deps): update dependencies
chore(storybook): upgrade to v8
```

### PR Titles

PR titles must follow the same format:

```
feat(Button): add loading state support
fix(Modal): resolve keyboard navigation bug
docs: update contribution guidelines
```

---

## 🧪 Development Workflow

### 1. Create a Component

```bash
# Create component file
touch src/components/core/buttons/NewButton.svelte

# Create story file
touch src/components/core/buttons/NewButton.stories.svelte
```

### 2. Write the Component

```svelte
<!-- src/components/core/buttons/NewButton.svelte -->
<script lang="ts">
  interface Props {
    label: string;
    variant?: 'primary' | 'secondary';
    onclick?: () => void;
  }
  
  const { 
    label, 
    variant = 'primary',
    ...props 
  }: Props = $props();
  
  let buttonClasses = $derived([
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
  ].filter(Boolean).join(' '));
</script>

<button class={buttonClasses} {...props}>
  {label}
</button>
```

### 3. Write the Story

```svelte
<!-- src/components/core/buttons/NewButton.stories.svelte -->
<script lang="ts">
  import { defineMeta, Story } from '@storybook/addon-svelte-csf';
  import NewButton from './NewButton.svelte';
  
  const { Story } = defineMeta({
    component: NewButton,
    title: 'Core/Buttons/NewButton',
    tags: ['autodocs'],
  });
</script>

<Story name="Primary">
  <NewButton label="Click me" variant="primary" />
</Story>

<Story name="Secondary">
  <NewButton label="Click me" variant="secondary" />
</Story>
```

### 4. Test in Storybook

```bash
pnpm storybook
# Open http://localhost:6006
```

### 5. Export the Component

```typescript
// src/lib/index.ts
export { default as NewButton } from '../components/core/buttons/NewButton.svelte';
```

### 6. Type Check

```bash
pnpm check
```

### 7. Format Code

```bash
pnpm format
```

### 8. Commit Changes

```bash
git add .
git commit -m "feat(NewButton): add new button component"
git push origin feat/new-button-component
```

---

## 🧪 Testing Guidelines

### Unit Tests

Write tests using Vitest:

```typescript
// src/components/core/buttons/Button.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders with label', () => {
    const { getByText } = render(Button, { label: 'Click me' });
    expect(getByText('Click me')).toBeTruthy();
  });
});
```

Run tests:

```bash
pnpm test
```

### Accessibility

Use Storybook's a11y addon:
- Check the "Accessibility" tab in Storybook
- Fix any violations
- Ensure keyboard navigation works
- Test with screen readers

---

## 📋 PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows the [Style Guide](STYLE_GUIDE.md)
- [ ] Component has TypeScript types
- [ ] Storybook story is created
- [ ] Component is exported in `src/lib/index.ts`
- [ ] Tests are written (if applicable)
- [ ] Accessibility is tested
- [ ] Code is formatted (`pnpm format`)
- [ ] Type check passes (`pnpm check`)
- [ ] Commit messages follow conventional format
- [ ] PR title follows conventional format
- [ ] Documentation is updated (if needed)

---

## 🏷 Label System

Labels are automatically assigned based on:
- PR title type (`feat`, `fix`, `docs`, etc.)
- Changed files (component category)

Refer to [Labelling Strategy](LABELLING_STRATEGY.md) for details.

---

## 🔁 CI/CD & Releases

### Automated Checks

All PRs must pass:
- Type checking (`svelte-check`)
- Linting (`prettier`)
- Tests (if implemented)
- Build verification

### Release Process

1. PRs are merged into `develop`
2. `develop` is tested and validated
3. `develop` is merged to `main`
4. Semantic versioning is automated
5. Package is published to npm

---

## 🎨 Component Design Guidelines

### Props Interface

Always define TypeScript interfaces:

```typescript
interface Props {
  // Required props (no default)
  label: string;
  
  // Optional props (with default)
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  
  // Event handlers
  onclick?: () => void;
}
```

### DaisyUI Classes

Use DaisyUI component classes:

```svelte
<button class="btn btn-primary btn-lg">
  {label}
</button>
```

### Reactivity

Use Svelte 5 runes:

```typescript
// Derived values
let classes = $derived(`btn ${variant}`);

// State
let count = $state(0);

// Effects
$effect(() => {
  console.log('Count changed:', count);
});
```

### Accessibility

- Add ARIA attributes
- Ensure keyboard navigation
- Provide focus indicators
- Support screen readers

```svelte
<button
  aria-label={ariaLabel}
  aria-pressed={pressed}
  aria-disabled={disabled}
>
  {label}
</button>
```

---

## 🙋 Support & Communication

### Questions

- Use [GitHub Discussions](https://github.com/hTuneSys/hexaWebShare/discussions)
- Check the [FAQ](FAQ.md)
- Review existing issues

### Issues

- Bug reports: Use the [Bug Report Template](../.github/ISSUE_TEMPLATE/bug-report.md)
- Feature requests: Use the [Feature Request Template](../.github/ISSUE_TEMPLATE/feature-request.md)

### Contact

- Email: [info@hexatune.com](mailto:info@hexatune.com)
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

---

## 🎯 Priority Areas

We especially welcome contributions in:

1. **Accessibility improvements** – WCAG compliance, ARIA support
2. **Component tests** – Unit and E2E tests
3. **Documentation** – Examples, guides, API docs
4. **New components** – Filling gaps in component coverage
5. **TypeScript types** – Improving type safety
6. **Performance** – Bundle size, render optimization

---

## 📚 Resources

- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [DaisyUI Documentation](https://daisyui.com/)
- [Storybook Documentation](https://storybook.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

We're excited to build hexaWebShare with your help! 🚀

Thank you for contributing!
