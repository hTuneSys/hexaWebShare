<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# STYLE_GUIDE.md

This style guide ensures consistency across the codebase by outlining formatting rules, naming conventions, and component-specific practices used in the hexaWebShare project.

---

## 📋 Table of Contents

1. [General Principles](#general-principles)
2. [Code Formatting](#code-formatting)
3. [Component Structure](#component-structure)
4. [TypeScript Conventions](#typescript-conventions)
5. [Icon Usage](#icon-usage)
6. [Styling Guidelines](#styling-guidelines)
7. [Accessibility](#accessibility)

---

## General Principles

- **English Only**: All code, comments, documentation, and commit messages must be in English
- **Type Safety**: Always use TypeScript with strict mode
- **Component Composition**: Reuse library components instead of raw HTML
- **No Hardcoded Strings**: Externalize all user-facing text as props
- **Static Classes**: Use static Tailwind/DaisyUI classes for JIT compilation

---

## Code Formatting

### Prettier Configuration

The project uses Prettier with the following plugins:
- `prettier-plugin-svelte`
- `prettier-plugin-tailwindcss`

**Run formatting:**
```bash
pnpm format
```

### File Organization

```
component-name/
├── ComponentName.svelte        # Component implementation
├── ComponentName.stories.svelte # Storybook stories
└── ComponentName.test.ts       # Tests (if applicable)
```

---

## Component Structure

### Svelte 5 Pattern

```svelte
<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component ComponentName

Brief description of the component.

**Example:**
```svelte
<ComponentName prop1="value" prop2={true} />
```
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  
  // 1. Interface definition
  interface Props {
    label: string;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onclick?: () => void;
    children?: Snippet;
  }
  
  // 2. Props destructuring with defaults
  const { 
    label, 
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    onclick,
    ...props 
  }: Props = $props();
  
  // 3. Derived state (if needed)
  let classes = $derived([
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    size === 'sm' && 'btn-sm',
    size === 'md' && 'btn-md',
    size === 'lg' && 'btn-lg',
  ].filter(Boolean).join(' '));
</script>

<button class={classes} {disabled} {onclick} {...props}>
  {label}
  {#if children}
    {@render children()}
  {/if}
</button>
```

---

## TypeScript Conventions

### Interface Naming

- Component props: `Props` or `ComponentNameProps`
- Exported types: Descriptive names (e.g., `DataTableColumn`, `SortDirection`)

### Type Annotations

```typescript
// ✅ CORRECT
interface Props {
  label: string;          // Required prop
  variant?: 'primary';    // Optional with type
  onclick?: () => void;   // Event handler
  items: Item[];          // Array of specific type
}

// ❌ WRONG
interface Props {
  label: any;             // Never use 'any'
  variant: string;        // Too generic
  onclick: Function;      // Use specific signature
}
```

---

## Icon Usage

### Lucide Icons Integration

**hexaWebShare uses Lucide icons as a peer dependency for consistent, high-quality iconography.**

#### Installation

Consumers must install `lucide-svelte` separately:

```bash
pnpm add lucide-svelte
# or
npm install lucide-svelte
```

#### Usage with Icon Component (Recommended)

Always wrap Lucide icons with the `Icon` component for consistent sizing and theming:

```svelte
<script>
  import { Icon } from 'hexawebshare';
  import { X, Check, Search, Menu, ChevronDown } from 'lucide-svelte';
</script>

<!-- Basic usage -->
<Icon size="md" variant="primary">
  <X />
</Icon>

<!-- With different sizes -->
<Icon size="xs"><Check /></Icon>
<Icon size="sm"><Search /></Icon>
<Icon size="lg"><Menu /></Icon>
<Icon size="xl"><ChevronDown /></Icon>

<!-- With color variants -->
<Icon variant="success"><Check /></Icon>
<Icon variant="error"><X /></Icon>
<Icon variant="warning"><AlertTriangle /></Icon>
```

#### Usage with IconButton

```svelte
<script>
  import { IconButton, Icon } from 'hexawebshare';
  import { X, Menu, Settings } from 'lucide-svelte';
</script>

<!-- With Icon wrapper (recommended) -->
<IconButton variant="ghost" circle ariaLabel="Close">
  <Icon size="sm">
    <X />
  </Icon>
</IconButton>

<!-- Direct usage (also works) -->
<IconButton variant="primary" square ariaLabel="Menu">
  <Menu />
</IconButton>
```

#### Common Icons Used in hexaWebShare

| Use Case | Lucide Icon | Import |
|----------|-------------|--------|
| Close/Cancel | `X` | `import { X } from 'lucide-svelte'` |
| Confirm/Success | `Check` | `import { Check } from 'lucide-svelte'` |
| Search | `Search` | `import { Search } from 'lucide-svelte'` |
| Menu/Hamburger | `Menu` | `import { Menu } from 'lucide-svelte'` |
| Settings | `Settings` | `import { Settings } from 'lucide-svelte'` |
| Dropdown | `ChevronDown` | `import { ChevronDown } from 'lucide-svelte'` |
| Navigation | `ChevronLeft`, `ChevronRight` | `import { ChevronLeft, ChevronRight } from 'lucide-svelte'` |
| Edit | `Edit` | `import { Edit } from 'lucide-svelte'` |
| Delete | `Trash2` | `import { Trash2 } from 'lucide-svelte'` |
| Add/Plus | `Plus` | `import { Plus } from 'lucide-svelte'` |
| Remove/Minus | `Minus` | `import { Minus } from 'lucide-svelte'` |
| Filter | `Filter` | `import { Filter } from 'lucide-svelte'` |
| More Options | `MoreVertical` | `import { MoreVertical } from 'lucide-svelte'` |
| Notifications | `Bell` | `import { Bell } from 'lucide-svelte'` |
| Theme Toggle | `Sun`, `Moon`, `Monitor` | `import { Sun, Moon, Monitor } from 'lucide-svelte'` |
| External Link | `ExternalLink` | `import { ExternalLink } from 'lucide-svelte'` |

#### Custom SVG Icons

For custom icons not available in Lucide, use the Icon component with custom SVG:

```svelte
<Icon size="md" variant="neutral">
  {#snippet children()}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
    </svg>
  {/snippet}
</Icon>
```

#### Benefits of This Approach

- ✅ **Zero Bundle Size Impact**: Peer dependency with perfect tree-shaking
- ✅ **Consistent Sizing**: Icon component ensures uniform icon sizes
- ✅ **Theme Integration**: Automatic color inheritance from DaisyUI themes
- ✅ **Accessibility**: Built-in ARIA support via Icon component
- ✅ **1000+ Icons**: Access to entire Lucide library
- ✅ **Type Safety**: Full TypeScript support

---

## Styling Guidelines

### DaisyUI Classes - Static Only

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

### Component Composition

**Always use library components instead of raw HTML:**

```svelte
<!-- ✅ CORRECT -->
<script>
  import Button from '$lib/components/core/buttons/Button.svelte';
  import Icon from '$lib/components/core/media/Icon.svelte';
  import { X } from 'lucide-svelte';
</script>

<Button variant="primary" onclick={handleClick}>
  <Icon size="sm"><X /></Icon>
  Close
</Button>

<!-- ❌ WRONG -->
<button class="btn btn-primary" onclick={handleClick}>
  <svg>...</svg>
  Close
</button>
```

---

## Accessibility

### ARIA Labels

Always provide accessible labels for interactive elements:

```svelte
<IconButton ariaLabel="Close dialog" onclick={handleClose}>
  <Icon size="sm"><X /></Icon>
</IconButton>

<Icon ariaLabel="Success status" variant="success">
  <Check />
</Icon>
```

### Keyboard Navigation

Ensure all interactive components support keyboard navigation:
- Enter/Space for buttons
- Arrow keys for navigation
- Escape for closing modals/dropdowns
- Tab for focus management

---

## Resources

- [Lucide Icon Library](https://lucide.dev)
- [DaisyUI Documentation](https://daisyui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Svelte 5 Documentation](https://svelte.dev)

---

Built by [hexaTune LLC](https://hexatune.com) · License: [MIT](LICENSE)
