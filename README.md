<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<div align="center">

# 🎨 hexaWebShare

**A comprehensive Svelte 5 component library with 100+ production-ready UI components**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00.svg)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12-5A0EF8.svg)](https://daisyui.com/)
[![Storybook](https://img.shields.io/badge/Storybook-10.1-FF4785.svg)](https://storybook.js.org/)

[Documentation](docs/SUMMARY.md) • [Getting Started](docs/GETTING_STARTED.md) • [Contributing](docs/CONTRIBUTING.md) • [Storybook](#-quick-start)

</div>

---

## 🌟 Features

- ✨ **100+ Components** - Comprehensive UI components across 6 categories
- 🎨 **DaisyUI + Tailwind** - Beautiful, themeable components
- 🔥 **Svelte 5** - Built with the latest Svelte features and runes
- 📘 **TypeScript** - Fully typed with excellent IDE support
- 📖 **Storybook** - Interactive component documentation
- ♿ **Accessible** - WCAG-compliant components
- 🎯 **Production-Ready** - Optimized and tested
- 🌓 **Dark Mode** - Full theme support out of the box

---

## 📦 Component Categories

### Core Components
Essential UI building blocks for any application:
- Buttons, Forms, Layout, Typography
- Media, Data Display, Feedback
- Modals, Dropdowns, Navigation

### Admin Components
Admin panel and dashboard components:
- Dashboards, KPI Cards, Charts
- CRUD Tables, Data Management
- User Roles & Permissions

### B2B Components
Enterprise workspace features:
- Workspace & Team Management
- Projects, Clients, Invoices
- Kanban Boards, Workflows

### E-commerce Components
Online store building blocks:
- Product Listings & Details
- Shopping Cart & Checkout
- Order Management

### Marketing Components
Marketing and content sections:
- Hero Sections, Features
- Testimonials, Pricing
- Blog Layouts, CTAs

### Utility Components
Cross-cutting utilities:
- Auth Layouts, Error Boundaries
- Search Bars, Filters

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** 9+ (Install: `npm install -g pnpm`)
- **Git** for version control

### Requirements

- **Svelte >= 5.0.0** (uses runes: `$props`, `$derived`, `$effect`, `{@render}`)
- **Client-side only** - This library is designed for client-side rendering. SSR/hydration is not currently supported.

#### Why Svelte 5?

This library uses Svelte 5's new runes syntax throughout all components. Projects using Svelte 4 will encounter build errors.

#### SSR/Hydration Notice

Components generate unique IDs at runtime using `crypto.randomUUID()`. This approach works perfectly for client-side rendering but is not compatible with SSR hydration. If you need SSR support, please open an issue to discuss implementation strategies.

### Installation for Development

1. **Clone the repository**

```bash
git clone https://github.com/hTuneSys/hexaWebShare.git
cd hexaWebShare
```

2. **Install root dependencies and setup Husky**

```bash
pnpm install
```

This will:
- Install Husky for Git hooks
- Setup pre-commit hooks for REUSE compliance
- Prepare the development environment

3. **Navigate to the component library**

```bash
cd hexawebshare
```

4. **Install component library dependencies**

```bash
pnpm install
```

5. **Start Storybook**

```bash
pnpm storybook
```

Storybook will open at [http://localhost:6006](http://localhost:6006)

### Alternative: SvelteKit Dev Server

```bash
cd hexawebshare
pnpm dev
```

Opens at [http://localhost:5173](http://localhost:5173)

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

### Essential Guides
- **[Getting Started](docs/GETTING_STARTED.md)** - Setup and installation
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute
- **[Development Guide](docs/DEVELOPMENT_GUIDE.md)** - Development workflow
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture

### Git Workflow
- **[Branch Strategy](docs/BRANCH_STRATEGY.md)** - Branch naming and usage
- **[Commit Strategy](docs/COMMIT_STRATEGY.md)** - Commit message format
- **[PR Strategy](docs/PR_STRATEGY.md)** - Pull request guidelines
- **[Labelling Strategy](docs/LABELLING_STRATEGY.md)** - Issue labels

### Project Info
- **[Project Structure](docs/PROJECT_STRUCTURE.md)** - Directory organization
- **[Configuration](docs/CONFIGURATION.md)** - Config files explained
- **[Style Guide](docs/STYLE_GUIDE.md)** - Code style conventions
- **[FAQ](docs/FAQ.md)** - Frequently asked questions

📖 **[Full Documentation Index](docs/SUMMARY.md)**

---

## 🛠️ Development Workflow

### Available Commands

In the `hexawebshare/` directory:

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start SvelteKit dev server |
| `pnpm storybook` | Start Storybook dev server |
| `pnpm build` | Build library package |
| `pnpm build-storybook` | Build static Storybook |
| `pnpm check` | TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm lint` | Check code formatting |

### Development Flow

```bash
# 1. Install root dependencies (Husky)
pnpm install

# 2. Navigate to component library
cd hexawebshare

# 3. Install component dependencies
pnpm install

# 4. Start Storybook
pnpm storybook

# 5. Make your changes
# (Storybook will hot-reload automatically)

# 6. Check types
pnpm check

# 7. Format code
pnpm format

# 8. Commit changes
git add .
git commit -m "feat(Component): add new feature"
# Git hooks will automatically run:
# 1. REUSE compliance check (pre-commit)
# 2. Commit message validation (commit-msg)
```

---

## 🔐 Git Hooks & Quality Checks

This project uses Git hooks to ensure code quality and compliance. Two hooks are automatically configured:

### 1. Pre-commit Hook - REUSE Compliance

Checks that all files have proper SPDX license headers.

**Required tool**: REUSE

```bash
# Option 1: Install with pipx (recommended)
pipx install reuse

# Option 2: Install with pip
pip install --user reuse
```

**When it runs**: Before each commit

```bash
git commit -m "feat: add new component"
# 🔍 Running REUSE compliance check...
# ✅ REUSE compliance check PASSED!
```

### 2. Commit-msg Hook - Commit Message Validation

Validates commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format.

**Required tools**: Commitlint (installed in `hexawebshare/node_modules`)

**When it runs**: Before each commit (after pre-commit)

**Required format**:
```
<type>(<optional-scope>): <description>
```

**Allowed types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code formatting (no logic change)
- `refactor` - Code restructuring
- `perf` - Performance improvement
- `test` - Test changes
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes
- `release` - Release preparation
- `hotfix` - Critical emergency fix

**Examples**:
```bash
# ✅ Valid commits
git commit -m "feat(Button): add loading state prop"
git commit -m "fix(Modal): resolve focus trap issue"
git commit -m "docs(README): update installation steps"

# ❌ Invalid commits
git commit -m "update button"              # Missing type
git commit -m "added new feature"          # Wrong tense
git commit -m "feat: buton eklendi"        # Non-English
```

**What happens during commit**:
```bash
git commit -m "feat(Button): add loading state"
# 🔍 Running REUSE compliance check...
# ✅ REUSE compliance check PASSED!
# 🔍 Running Commitlint check...
# ✅ Commit message validation PASSED!
```

See [docs/COMMIT_STRATEGY.md](docs/COMMIT_STRATEGY.md) for detailed commit message guidelines.

---

## 🧪 Quality Checks

Before committing, ensure your code passes all checks:

```bash
cd hexawebshare

# Type checking
pnpm check

# Code formatting
pnpm format

# Linting
pnpm lint

# Build verification
pnpm build

# Storybook build
pnpm build-storybook
```

---

## 🎨 Using Components

### In Your Svelte App

```svelte
<script lang="ts">
  import { Button, Card, Modal } from 'hexawebshare';
  
  let showModal = $state(false);
</script>

<Card>
  <h2>Welcome to hexaWebShare</h2>
  <Button 
    label="Open Modal" 
    variant="primary"
    onclick={() => showModal = true}
  />
</Card>

{#if showModal}
  <Modal onclose={() => showModal = false}>
    <h3>Modal Content</h3>
    <p>This is a modal from hexaWebShare!</p>
  </Modal>
{/if}
```

### Creating a New Component

```svelte
<!-- src/components/core/buttons/MyButton.svelte -->
<script lang="ts">
  interface Props {
    label: string;
    variant?: 'primary' | 'secondary';
    onclick?: () => void;
  }
  
  const { 
    label, 
    variant = 'primary',
    onclick,
  }: Props = $props();
</script>

<button 
  class="btn {variant === 'primary' ? 'btn-primary' : 'btn-secondary'}"
  onclick={onclick}
>
  {label}
</button>
```

---

## 🏗️ Project Structure

```
hexaWebShare/
├── .github/              # GitHub configurations
│   ├── workflows/        # CI/CD workflows
│   └── ISSUE_TEMPLATE/   # Issue templates
├── .husky/               # Git hooks (pre-commit)
├── docs/                 # Comprehensive documentation
├── hexawebshare/         # Main component library
│   ├── .storybook/       # Storybook configuration
│   ├── src/
│   │   ├── components/   # Component library
│   │   │   ├── core/     # Core components
│   │   │   ├── admin/    # Admin components
│   │   │   ├── b2b/      # B2B components
│   │   │   ├── ecommerce/# E-commerce components
│   │   │   ├── marketing/# Marketing components
│   │   │   └── utility/  # Utility components
│   │   ├── lib/          # Library exports
│   │   └── routes/       # SvelteKit showcase
│   └── package.json      # Component library dependencies
├── LICENSES/             # License files
├── package.json          # Root package (Husky setup)
└── README.md             # This file
```

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](docs/CONTRIBUTING.md) to get started.

### Quick Contribution Checklist

- [ ] Read [CONTRIBUTING.md](docs/CONTRIBUTING.md)
- [ ] Follow [BRANCH_STRATEGY.md](docs/BRANCH_STRATEGY.md) for branch naming
- [ ] Follow [COMMIT_STRATEGY.md](docs/COMMIT_STRATEGY.md) for commit messages
- [ ] Ensure all quality checks pass
- [ ] Add SPDX headers to new files
- [ ] Create Storybook stories for new components
- [ ] Update documentation if needed

### Branch Naming

```bash
# Feature
git checkout -b feat/add-tooltip-component

# Bug fix
git checkout -b fix/modal-close-button

# Documentation
git checkout -b docs/update-readme
```

### Commit Messages

```bash
# Format: <type>(<scope>): <description>
git commit -m "feat(Button): add loading state prop"
git commit -m "fix(Modal): resolve focus trap issue"
git commit -m "docs(README): update installation steps"
```

---

## 📋 Continuous Integration

Pull requests automatically run quality checks via GitHub Actions:

- ✅ TypeScript type checking
- ✅ Code formatting validation
- ✅ Build verification
- ✅ Storybook build test

See [.github/workflows/ci.yml](.github/workflows/ci.yml) for details.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
```

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- [Svelte](https://svelte.dev/) - The web framework
- [DaisyUI](https://daisyui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS framework
- [Storybook](https://storybook.js.org/) - Component development
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool

---

## 📞 Contact & Support

- **Website**: [hexatune.com](https://hexatune.com)
- **GitHub**: [hTuneSys/hexaWebShare](https://github.com/hTuneSys/hexaWebShare)
- **Issues**: [Report a bug](https://github.com/hTuneSys/hexaWebShare/issues)
- **Discussions**: [Ask questions](https://github.com/hTuneSys/hexaWebShare/discussions)
- **Email**: [info@hexatune.com](mailto:info@hexatune.com)

---

<div align="center">

**Built with ❤️ by [hexaTune LLC](https://hexatune.com)**

⭐ Star us on GitHub if you find this project useful!

</div>
