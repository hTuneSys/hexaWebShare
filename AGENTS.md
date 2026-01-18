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

### 1. **ENGLISH ONLY FOR PROJECT FILES**

**⚠️ ABSOLUTE REQUIREMENT:** All code, comments, documentation, commit messages, PR titles, branch names, and any text within project files **MUST BE IN ENGLISH ONLY**.

**Note:** Communication between developers and AI agents can be in any language, but all content written to project files must be in English.

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

### Component Composition & Reusability Principle

**⚠️ CRITICAL RULE:** Always reuse existing library components instead of rewriting raw HTML/CSS.

**Purpose:** This ensures that features added to base components automatically propagate throughout the entire system, eliminating duplicate code and maintaining consistency.

#### Component Hierarchy

hexaWebShare follows a **compositional architecture** with two component tiers:

1. **Primitive Components** (Level 1) - Independent base components
   - Located in: `core/buttons/`, `core/forms/`, `core/typography/`, `core/media/`
   - Examples: Button, Input, Text, Icon, Badge
   - These components have **no dependencies** on other library components
   - They only use raw HTML and DaisyUI classes

2. **Composite Components** (Level 2+) - Built from primitives
   - Located in: `core/layout/`, `core/overlay-navigation/`, `core/data-display/`
   - Examples: Menu, Modal, Sidebar, Table, Pagination
   - These **MUST** use library components internally
   - **NEVER** reimplement buttons, inputs, text, etc. with raw HTML

#### Composition Rules

```svelte
<!-- ✅ CORRECT - Reusing library components -->
<script lang="ts">
  import Button from '$lib/components/core/buttons/Button.svelte';
  import IconButton from '$lib/components/core/buttons/IconButton.svelte';
  import Text from '$lib/components/core/typography/Text.svelte';
  
  interface Props {
    title: string;
    onClose?: () => void;
  }
  
  const { title, onClose }: Props = $props();
</script>

<div class="modal">
  <div class="modal-header">
    <Text variant="h3">{title}</Text>
    <IconButton icon="close" onclick={onClose} />
  </div>
  <div class="modal-body">
    {@render children?.()}
  </div>
  <div class="modal-footer">
    <Button variant="secondary" onclick={onClose}>Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </div>
</div>

<!-- ❌ WRONG - Reimplementing with raw HTML -->
<script lang="ts">
  interface Props {
    title: string;
    onClose?: () => void;
  }
  
  const { title, onClose }: Props = $props();
</script>

<div class="modal">
  <div class="modal-header">
    <h3>{title}</h3>
    <button class="btn btn-circle" onclick={onClose}>✕</button>
  </div>
  <div class="modal-body">
    {@render children?.()}
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" onclick={onClose}>Cancel</button>
    <button class="btn btn-primary">Confirm</button>
  </div>
</div>
```

#### Why This Matters

**Example Scenario:**
If you add a `loading` state to the `Button` component, and all composite components use `<Button>` internally, every button across the library (Menu, Modal, Pagination, etc.) automatically gets the loading feature.

**If you use raw HTML:**
- You have to manually update every component
- Features become inconsistent
- Maintenance becomes a nightmare
- Bugs multiply across the codebase

#### Component Usage Guidelines

| When Building | Must Use These Components |
|---------------|---------------------------|
| Menu, Dropdown, Navbar | Button, IconButton, Link, Text, Badge |
| Modal, Dialog, Drawer | Button, IconButton, Text, Heading |
| Table, DataGrid | Button, IconButton, Badge, StatusDot, Text |
| Pagination | Button, IconButton, Text |
| Form layouts | Input, Select, Checkbox, Button, Text |
| Card layouts | Button, Badge, Heading, Text, Divider |

#### Exceptions

**Only use raw HTML when:**
1. Building primitive (Level 1) components
2. Creating wrapper/structural elements (containers, grids)
3. The exact component doesn't exist yet (then create it as a primitive first)
4. Using form utilities (hidden inputs, fieldsets) for non-visual functionality

#### Raw HTML Documentation Requirement

**⚠️ MANDATORY RULE:** When raw HTML elements are used instead of library components, you **MUST** add an inline comment explaining why.

**Format:**
```svelte
<!-- 
  NOTE: Raw HTML [element] is intentional here.
  Reason: [Specific justification]
  [Additional context if needed]
-->
<element>...</element>
```

**Examples of valid justifications:**

```svelte
<!-- ✅ GOOD: Form utility -->
<!-- 
  NOTE: Raw HTML input is intentional here.
  This hidden input is used solely for form submission and has no visual/interactive behavior.
  Using the Input component would add unnecessary overhead (labels, validation, styling, etc.).
  Component composition applies to user-facing elements, not form utilities.
-->
<input type="hidden" name="selected" value={value} />

<!-- ✅ GOOD: Structural wrapper -->
<!-- 
  NOTE: Raw HTML div is intentional here.
  This is a structural container with no semantic or interactive behavior.
  No suitable library component exists for generic layout wrappers.
-->
<div class="flex gap-4">
  <Button>Action</Button>
</div>

<!-- ✅ GOOD: Primitive component -->
<!-- 
  NOTE: Raw HTML button is intentional here.
  Button is a Level 1 primitive component - the base for all button variants.
  This component itself provides the abstraction that other components use.
-->
<button type="button" class={buttonClasses}>
  {label}
</button>

<!-- ❌ BAD: No justification -->
<button onclick={handleClick}>Click me</button>  <!-- Missing note! -->

<!-- ❌ BAD: Invalid justification -->
<!-- NOTE: Using raw button for simplicity -->
<button>Click</button>  <!-- "Simplicity" is not valid - use Button component! -->
```

**Valid reasons for raw HTML:**
- ✅ Form utilities (hidden inputs, fieldset, legend)
- ✅ Structural/layout containers with no semantic meaning
- ✅ Primitive (Level 1) components themselves
- ✅ No suitable library component exists (then consider creating one)
- ✅ Performance-critical rendering (with benchmarks)
- ✅ Third-party library integration requirements

**Invalid reasons:**
- ❌ "Simpler" or "easier"
- ❌ "Fewer lines of code"
- ❌ "Don't need all the features"
- ❌ Developer preference
- ❌ Unaware of existing component

#### Component Composition - STRICT ENFORCEMENT

**⚠️ CRITICAL PRIORITY RULE:** Library components MUST be used unless TECHNICALLY IMPOSSIBLE.

##### Decision Tree for Raw HTML vs Library Components

Follow this decision process for EVERY HTML element:

1. **Does a library component exist for this HTML element?**
   - **NO** → Raw HTML is allowed. Document why no component exists.
   - **YES** → You MUST use it. Proceed to step 2.

2. **Does the library component support all required attributes/behavior?**
   - **YES** → Use it immediately. No exceptions. STOP HERE.
   - **NO** → Proceed to step 3.

3. **Can the library component be extended/modified to support your needs?**
   - **YES** → Modify the component first. Do NOT bypass it. STOP HERE.
   - **NO** → Proceed to step 4.

4. **Is there a TECHNICAL impossibility preventing library component use?**

   **Valid Technical Impossibilities:**
   - ✅ Component would break DaisyUI's CSS selectors (e.g., `.menu > li > :not(ul)` requiring specific structure)
   - ✅ Component would break required DOM structure (e.g., form patterns for framework behavior)
   - ✅ Component would break framework state management patterns (e.g., hidden checkbox for DaisyUI toggle)
   - ✅ No library component exists and creating one is out of current scope
   - ✅ Performance-critical path with benchmarks proving necessity

   **Invalid "Impossibilities" (NEVER ACCEPTABLE):**
   - ❌ "It's simpler/easier/shorter with raw HTML"
   - ❌ "The component adds unwanted classes" → FIX THE COMPONENT (add unstyled/raw variant)
   - ❌ "Layout becomes complex" → Use proper composition patterns
   - ❌ "Raw HTML performs better" → Premature optimization without proof
   - ❌ "I don't want to import another component" → Developer laziness
   - ❌ "It works fine this way" → Not following architecture standards
   - ❌ "Just for this one case" → No exceptions without technical proof

   **Decision:**
   - **YES** (Genuine technical impossibility) → Use raw HTML with detailed documentation
   - **NO** → You MUST use the library component or extend it first

##### Documentation Note Template for Technical Impossibilities

When raw HTML is genuinely required, use this format:

```svelte
<!-- 
  NOTE: Raw HTML [element] is used here instead of [Component].
  TECHNICAL REASON: [Specific technical impossibility - be very detailed]
  ATTEMPTED SOLUTIONS:
  1. [What was tried with the library component]
  2. [Why it failed technically - include error/behavior]
  CONSEQUENCE: Using [Component] would cause [specific technical failure]
  VALIDATION: [How this was verified/tested]
-->
<element>...</element>
```

##### Examples of Strict Enforcement

```svelte
<!-- ❌ WRONG: Invalid justification -->
<!-- 
  NOTE: Raw HTML button used here.
  Reason: Button component adds .btn classes that conflict with menu styling.
-->
<button>Menu Item</button>

<!-- ✅ CORRECT: Fix the component instead -->
<Button variant="unstyled">Menu Item</Button>
<!-- The Button component was extended to support variant="unstyled" -->

<!-- ❌ WRONG: Bypassing for convenience -->
<p>This is some text</p>

<!-- ✅ CORRECT: Use library component -->
<Text text="This is some text" />

<!-- ❌ WRONG: Claiming impossibility without proof -->
<!-- NOTE: Using raw button because Button component doesn't work here -->
<button onclick={handler}>Click</button>

<!-- ✅ CORRECT: Provide technical details -->
<!-- 
  NOTE: Raw HTML button is used here instead of Button component.
  TECHNICAL REASON: DaisyUI's .menu requires direct child buttons without .btn class
  ATTEMPTED SOLUTIONS:
  1. Used <Button variant="primary"> - added .btn class breaking menu CSS cascade
  2. Tried wrapper div - broke .menu > li > button selector specificity
  CONSEQUENCE: Button component's .btn class triggers conflicting DaisyUI styles
  VALIDATION: Tested with DaisyUI v4.x docs and CSS inspector
  TODO: Add unstyled variant to Button component to resolve this properly
-->
<button>Menu Item</button>
```

#### Before Implementation Checklist

- [ ] Is this a composite component? (uses other UI elements)
- [ ] Have I checked if primitives exist for buttons, inputs, text, icons?
- [ ] Am I importing and using library components instead of raw HTML?
- [ ] If using raw HTML, have I followed the 4-step decision tree?
- [ ] If using raw HTML, have I documented with the proper template?
- [ ] Can I extend/modify the library component instead of bypassing it?
- [ ] Will changes to primitive components propagate correctly?

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

### No Hardcoded Strings - Externalize All Text Content

**⚠️ CRITICAL RULE:** Component implementations **MUST NOT** contain hardcoded/embedded strings. All user-facing text must be passed as props for localization and flexibility.

**Purpose:** This ensures components are fully localizable (i18n-ready) and customizable without modifying the component source code.

#### String Externalization Rules

**❌ NEVER hardcode strings in component implementations:**
- Button labels
- Placeholder text
- Error messages
- Toast/notification messages
- Dialog titles and descriptions
- Empty state messages
- Validation messages
- Any user-facing text

**✅ ALWAYS expose strings as props with reasonable defaults:**

```svelte
<!-- ✅ CORRECT - Text as props -->
<script lang="ts">
  interface Props {
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
  }
  
  const { 
    title = 'Confirm Action',           // Default value
    description = 'Are you sure?',      // Default value
    confirmLabel = 'Confirm',           // Default value
    cancelLabel = 'Cancel'              // Default value
  }: Props = $props();
</script>

<div class="modal">
  <h3>{title}</h3>
  <p>{description}</p>
  <Button>{confirmLabel}</Button>
  <Button>{cancelLabel}</Button>
</div>

<!-- ❌ WRONG - Hardcoded strings -->
<script lang="ts">
  interface Props {
    // No text props defined
  }
</script>

<div class="modal">
  <h3>Confirm Action</h3>              <!-- Hardcoded -->
  <p>Are you sure?</p>                 <!-- Hardcoded -->
  <Button>Confirm</Button>              <!-- Hardcoded -->
  <Button>Cancel</Button>               <!-- Hardcoded -->
</div>
```

#### Component Implementation vs Storybook Stories

| Context | Hardcoded Strings | Reasoning |
|---------|------------------|-----------|
| **Component Implementation** | ❌ NEVER | Must support localization and customization |
| **Storybook Stories** | ✅ ALLOWED | Stories are examples/demos, not production code |
| **Component Tests** | ✅ ALLOWED | Tests are not production code |
| **Documentation** | ✅ ALLOWED | Docs show examples, not reusable code |

#### Examples by Component Type

**Modal/Dialog Components:**
```svelte
// ✅ CORRECT
interface Props {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  closeAriaLabel?: string;
}
```

**Empty State Components:**
```svelte
// ✅ CORRECT
interface Props {
  title?: string;
  description?: string;
  actionLabel?: string;
}
```

**Form Components:**
```svelte
// ✅ CORRECT
interface Props {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
}
```

**Pagination Components:**
```svelte
// ✅ CORRECT
interface Props {
  previousLabel?: string;
  nextLabel?: string;
  pageLabel?: string;
  ofLabel?: string;
}
```

#### Default Values Strategy

- ✅ Provide sensible English defaults for developer experience
- ✅ Make all text props optional with default values
- ✅ Document all text props for i18n in component comments
- ✅ Group related text props together in interface

#### Accessibility (a11y) Text

**Also externalize accessibility labels:**

```svelte
// ✅ CORRECT
interface Props {
  ariaLabel?: string;
  ariaDescription?: string;
  closeAriaLabel?: string;
}

const {
  ariaLabel = 'Dialog',
  closeAriaLabel = 'Close dialog'
}: Props = $props();
```

#### Before Implementation Checklist

- [ ] Have I identified all user-facing text in this component?
- [ ] Are all text strings exposed as props?
- [ ] Do all text props have reasonable English defaults?
- [ ] Are accessibility labels also externalized?
- [ ] Can this component be used in a non-English application?

### File Organization

```
component-name/
├── ComponentName.svelte        # Component implementation
├── ComponentName.stories.svelte # Storybook story
└── ComponentName.test.ts       # Tests (if applicable)
```

---

## 📖 Storybook Story Pattern

**⚠️ MANDATORY REQUIREMENTS:** Every component story file **MUST** follow these rules:

### Story Count Requirements

- ✅ **Minimum 5 stories** per component (excluding Playground)
- ✅ **Maximum 10 stories** per component (excluding Playground)
- ✅ **1 Interactive Playground story** as the last story (REQUIRED)
- ✅ Each story must demonstrate **ONE specific variant or use case**
- ✅ Stories should cover all major component variations (sizes, variants, states)

**Total stories per file: 6-11 stories (5-10 variants + 1 Playground)**

### Story Pattern Example

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
        options: ['primary', 'secondary', 'accent'],
      },
      size: {
        control: 'select',
        options: ['sm', 'md', 'lg'],
      },
      disabled: {
        control: 'boolean',
      },
    },
  });
</script>

<!-- Variant Stories (5-10 required) -->
<Story 
  name="Primary" 
  args={{ label: 'Primary Button', variant: 'primary' }} 
/>

<Story 
  name="Secondary" 
  args={{ label: 'Secondary Button', variant: 'secondary' }} 
/>

<Story 
  name="Small Size" 
  args={{ label: 'Small Button', size: 'sm' }} 
/>

<Story 
  name="Large Size" 
  args={{ label: 'Large Button', size: 'lg' }} 
/>

<Story 
  name="Disabled State" 
  args={{ label: 'Disabled Button', disabled: true }} 
/>

<!-- ✅ REQUIRED: Interactive Playground Story (must be last) -->
<Story 
  name="Playground" 
  args={{ 
    label: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    disabled: false
  }} 
/>
```

### Playground Story Requirements

- ✅ Must be named "Playground"
- ✅ Must be the last story in the file
- ✅ Must include all configurable props in `args`
- ✅ Must include all event handlers defined in `argTypes`
- ✅ Must use default/reasonable values for all props
- ✅ Allows testing all component features via Storybook controls

### Story Naming Guidelines

Each story should clearly indicate what it demonstrates:

**Good Examples:**
- "Primary Variant"
- "Small Size"
- "Disabled State"
- "With Icon"
- "Loading State"
- "Error State"
- "Full Width"

**Bad Examples:**
- "Example 1"
- "Test"
- "Demo"
- "Another One"

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
- [ ] Composite components reuse library primitives (no raw HTML for buttons/inputs/text)
- [ ] No hardcoded strings in component implementations (all text as props)
- [ ] Storybook story created for new components
- [ ] Story file has 5-10 variant stories (excluding Playground)
- [ ] Playground story included as last story in Storybook file
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
5. **Reuse library components** - composite components must use primitives (Button, Input, Text, etc.)
6. **Externalize all text content** - no hardcoded strings in components (expose as props)
7. **Create Storybook stories** for all components
8. **Export components** in src/lib/index.ts

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
