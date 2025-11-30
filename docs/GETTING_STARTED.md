<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# 🚀 Getting Started with hexaWebShare

Welcome to the hexaWebShare component library! This guide will help you set up your development environment, understand the project structure, and start building or using components.

---

## 📋 What is hexaWebShare?

hexaWebShare is a comprehensive **Svelte 5 component library** featuring:

- 🎨 **100+ UI components** across multiple categories
- 🌈 **DaisyUI + Tailwind CSS** styling
- 📖 **Storybook** for development and documentation
- ✨ **TypeScript** for type safety
- ♿ **Accessibility-first** design
- 🎯 **Production-ready** components

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js** 18+ (LTS recommended)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version`

- **pnpm** 9+
  ```bash
  npm install -g pnpm
  # Verify
  pnpm --version
  ```

- **Git** for version control
  ```bash
  git --version
  ```

### Recommended

- **VS Code** with extensions:
  - Svelte for VS Code
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

---

## 📦 Installation

### For Contributors (Development)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hTuneSys/hexaWebShare.git
   cd hexaWebShare/hexawebshare
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start Storybook** (recommended for component development):
   ```bash
   pnpm storybook
   ```
   
   Opens at [http://localhost:6006](http://localhost:6006)

4. **Or start SvelteKit dev server**:
   ```bash
   pnpm dev
   ```
   
   Opens at [http://localhost:5173](http://localhost:5173)

### For Consumers (Using the Library)

```bash
# Install from npm (when published)
pnpm add hexawebshare

# Or install from GitHub (development)
pnpm add github:hTuneSys/hexaWebShare#main
```

---

## 🚦 Quick Start

### Option 1: Explore with Storybook (Recommended)

Storybook provides an isolated environment to view and test components:

```bash
cd hexaWebShare/hexawebshare
pnpm install
pnpm storybook
```

Browse components by category:
- **Core** → Buttons, Forms, Layout, etc.
- **Admin** → Dashboard, CRUD, Permissions
- **B2B** → Workspace, Projects, Workflows
- **E-commerce** → Products, Cart, Checkout
- **Marketing** → Hero, Features, Blog

### Option 2: Build Your First Component

1. **Create a new component**:
   ```bash
   touch src/components/core/buttons/MyButton.svelte
   ```

2. **Write the component**:
   ```svelte
   <!-- src/components/core/buttons/MyButton.svelte -->
   <script lang="ts">
     interface Props {
       label: string;
       variant?: 'primary' | 'secondary';
     }
     
     const { label, variant = 'primary' }: Props = $props();
   </script>
   
   <button class="btn btn-{variant}">
     {label}
   </button>
   ```

3. **Create a story**:
   ```svelte
   <!-- src/components/core/buttons/MyButton.stories.svelte -->
   <script lang="ts">
     import { defineMeta } from '@storybook/addon-svelte-csf';
     import MyButton from './MyButton.svelte';
     
     const { Story } = defineMeta({
       component: MyButton,
       title: 'Core/Buttons/MyButton',
     });
   </script>
   
   <Story name="Primary" args={{ label: 'Click me', variant: 'primary' }} />
   ```

4. **View in Storybook**:
   ```bash
   pnpm storybook
   ```
   
   Navigate to: `Core > Buttons > MyButton`

### Option 3: Use Components in Your App

```svelte
<!-- YourApp.svelte -->
<script lang="ts">
  import { Button, Card, Modal } from 'hexawebshare';
  
  let showModal = $state(false);
</script>

<Card>
  <h2>Welcome</h2>
  <Button 
    label="Open Modal" 
    variant="primary"
    onclick={() => showModal = true}
  />
</Card>

{#if showModal}
  <Modal onclose={() => showModal = false}>
    <h3>Modal Content</h3>
  </Modal>
{/if}
```

---

## 📂 Project Structure

```
hexawebshare/
├── .storybook/           # Storybook configuration
│   ├── main.ts
│   ├── preview.ts
│   └── ThemeWrapper.svelte
├── src/
│   ├── components/       # Component library
│   │   ├── core/         # Core UI components
│   │   ├── admin/        # Admin components
│   │   ├── b2b/          # B2B components
│   │   ├── ecommerce/    # E-commerce components
│   │   ├── marketing/    # Marketing components
│   │   └── utility/      # Utility components
│   ├── lib/
│   │   └── index.ts      # Library exports
│   └── routes/           # SvelteKit showcase app
├── package.json
├── svelte.config.js
├── tailwind.config.js
└── vite.config.ts
```

---

## 🎨 Component Categories

### 1. Core Components (`src/components/core/`)
**Basic building blocks for any application:**

- **Buttons**: Button, IconButton, ButtonGroup
- **Forms**: Input, Select, Checkbox, DatePicker, FileUpload
- **Layout**: Container, Grid, Card, Divider
- **Typography**: Heading, Paragraph, Text, Link
- **Media**: Avatar, Badge, Icon, Tooltip
- **Feedback**: Alert, Toast, Spinner, ProgressBar
- **Navigation**: Modal, Drawer, Dropdown, Tabs

### 2. Admin Components (`src/components/admin/`)
**For building admin panels and dashboards:**

- Dashboard widgets (KPI cards, charts)
- CRUD data tables with filters
- Entity forms and validation
- Role and permission management
- Activity logs and audit trails

### 3. B2B Components (`src/components/b2b/`)
**Enterprise workspace features:**

- Workspace and team management
- Project and client tracking
- Kanban boards and workflows
- Invoice and payment tracking
- Approval workflows

### 4. E-commerce Components (`src/components/ecommerce/`)
**Online store building blocks:**

- Product listings and grids
- Shopping cart and checkout
- Payment method selection
- Order management
- Customer accounts

### 5. Marketing Components (`src/components/marketing/`)
**Marketing and content sections:**

- Hero sections
- Feature showcases
- Testimonials
- Blog layouts
- CTA sections

---

## ⚙️ Development Commands

### Essential Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start SvelteKit dev server |
| `pnpm storybook` | Start Storybook dev server |
| `pnpm build` | Build library package |
| `pnpm build-storybook` | Build static Storybook |
| `pnpm check` | TypeScript type checking |
| `pnpm check:watch` | Type checking in watch mode |
| `pnpm format` | Format code with Prettier |
| `pnpm lint` | Check code formatting |

### Typical Development Flow

```bash
# 1. Start Storybook
pnpm storybook

# 2. Make changes to components
# (Storybook will hot-reload)

# 3. Check types
pnpm check

# 4. Format code
pnpm format

# 5. Build package
pnpm build
```

---

## 🧪 Testing Your Setup

### 1. Verify Storybook Works

```bash
pnpm storybook
```

Expected: Storybook opens at `http://localhost:6006` showing component library.

### 2. Check TypeScript

```bash
pnpm check
```

Expected: No type errors.

### 3. Verify Build

```bash
pnpm build
```

Expected: `dist/` directory created with compiled library.

### 4. Test Theme Switching

1. Open Storybook
2. Look for theme switcher in toolbar (sun/moon icon)
3. Toggle between light and dark themes
4. Components should adapt automatically

---

## 🎨 Styling & Theming

### DaisyUI Themes

The library uses DaisyUI with two default themes:

```javascript
// tailwind.config.js
daisyui: {
  themes: ["light", "dark"],
}
```

### Apply Theme in Your App

```html
<!-- Set theme on html element -->
<html data-theme="light">
  <!-- Your app -->
</html>

<!-- Or dark theme -->
<html data-theme="dark">
  <!-- Your app -->
</html>
```

### Theme Switching in Storybook

Storybook includes a theme switcher in the toolbar. Use it to preview components in both themes.

---

## 📚 Next Steps

### For Contributors

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) – Contribution guidelines
2. Review [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) – Detailed development workflow
3. Check [ARCHITECTURE.md](ARCHITECTURE.md) – Understand the architecture
4. Explore [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) – Directory organization

### For Component Users

1. Browse Storybook to explore components
2. Check component props in Storybook's "Controls" tab
3. Copy code examples from stories
4. Read [CONFIGURATION.md](CONFIGURATION.md) for integration setup

### Learn More

- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [DaisyUI Components](https://daisyui.com/components/)
- [Storybook Docs](https://storybook.js.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🐛 Troubleshooting

### pnpm install fails

```bash
# Clear cache and reinstall
pnpm store prune
rm -rf node_modules
pnpm install
```

### Storybook doesn't start

```bash
# Check Node version (must be 18+)
node --version

# Clear Storybook cache
rm -rf node_modules/.cache
pnpm storybook
```

### TypeScript errors

```bash
# Sync SvelteKit types
pnpm prepare

# Re-run type check
pnpm check
```

### Styles not loading

Ensure Tailwind CSS is processing correctly:

```bash
# Check tailwind.config.js content paths
content: ['./src/**/*.{html,js,svelte,ts}']

# Restart dev server
pnpm dev
```

---

## 🙋 Getting Help

### Documentation

- [FAQ.md](FAQ.md) – Frequently asked questions
- [SUPPORT.md](SUPPORT.md) – Support channels
- [CONTACT.md](CONTACT.md) – Contact information

### Community

- **GitHub Discussions**: [Ask questions](https://github.com/hTuneSys/hexaWebShare/discussions)
- **Issues**: [Report bugs](https://github.com/hTuneSys/hexaWebShare/issues)
- **Email**: [info@hexatune.com](mailto:info@hexatune.com)

---

## ✅ Checklist

Before you start developing:

- [ ] Node.js 18+ installed
- [ ] pnpm 9+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`pnpm install`)
- [ ] Storybook running (`pnpm storybook`)
- [ ] Type check passing (`pnpm check`)
- [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md)
- [ ] Read [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)

---

You're now ready to explore and build with hexaWebShare! 🎉

Happy coding! 🚀
