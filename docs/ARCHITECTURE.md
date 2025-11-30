<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# 🏗️ hexaWebShare Architecture

This document explains the architecture and design principles of the hexaWebShare Svelte component library.

---

## Overview

hexaWebShare is a comprehensive Svelte 5 component library built with modern web technologies. It provides a rich set of reusable UI components for building web applications across multiple domains including admin panels, B2B workspaces, e-commerce, and marketing sites.

---

## 🎯 Project Goals

- **Reusability**: Create highly reusable, composable Svelte components
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Accessibility**: WCAG-compliant components tested with a11y addon
- **Developer Experience**: Storybook integration for component development and documentation
- **Styling Flexibility**: DaisyUI-based theming with Tailwind CSS customization
- **Production Ready**: Optimized for production use with proper packaging

---

## 🏛️ Technology Stack

### Core Technologies

- **Svelte 5**: Latest version with runes and enhanced reactivity
- **SvelteKit**: Framework for building the library and showcase
- **TypeScript**: Type-safe component development
- **Vite**: Fast build tool and development server

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind CSS
- **PostCSS**: CSS processing with autoprefixer

### Development Tools

- **Storybook**: Component development and documentation
  - addon-a11y: Accessibility testing
  - addon-docs: Component documentation
  - addon-svelte-csf: Svelte Component Story Format
  - addon-vitest: Testing integration
- **pnpm**: Fast, disk space efficient package manager
- **Prettier**: Code formatting with Svelte and Tailwind plugins
- **Vitest**: Unit testing framework
- **Playwright**: Browser automation for testing

---

## 📦 Component Architecture

### Component Categories

The library is organized into logical categories:

#### 1. **Core Components** (`src/components/core/`)
Fundamental UI building blocks used across all applications:

- **Buttons**: Button, IconButton, ButtonGroup, ToggleButton, SegmentedControl
- **Forms**: Input, Select, Checkbox, RadioGroup, Switch, DatePicker, FileUpload, etc.
- **Layout**: Container, Grid, Card, Divider, Section, PageWrapper
- **Typography**: Heading, Paragraph, Text, Link, Lead
- **Media**: Avatar, Badge, Icon, Chip, Tag, Tooltip
- **Data Display**: Table, List, EmptyState, StatusBadge, StatusDot
- **Feedback**: Alert, Toast, Notification, Spinner, ProgressBar, Callout
- **Overlay & Navigation**: Modal, Drawer, Dropdown, Menu, Tabs, Accordion, Breadcrumbs

#### 2. **Admin Components** (`src/components/admin/`)
Components for building admin panels and dashboards:

- **Dashboard**: KPI cards, charts (bar, line, pie), date range filters
- **CRUD Data**: DataTable, DetailDrawer, FilterChips, KeyValueList
- **Forms**: EntityForm, FormCard, FormSection, InlineEditField
- **Layout**: AdminLayout, AdminSidebar, AdminTopbar, AdminBreadcrumbs
- **Permissions**: RoleSelector, PermissionSelector, UserTable, InviteUserForm
- **System**: ActivityLogList, AuditTrailList, NotificationCenter

#### 3. **B2B Components** (`src/components/b2b/`)
Enterprise and business workspace components:

- **Workspace**: AppShell, WorkspaceSwitcher, CompanySwitcher, TeamList
- **Models**: Client management, invoice views, project cards
- **Workflow**: Kanban boards, activity timelines, comment systems
- **Approvals**: Status badges, approval workflows

#### 4. **E-commerce Components** (`src/components/ecommerce/`)
Components for online stores:

- **Product Listing**: ProductCard, ProductGrid, PriceDisplay, ProductRating
- **Product Detail**: ImageGallery, AddToCartButton, product reviews
- **Cart & Checkout**: CartDropdown, CheckoutSteps, PaymentMethodSelector
- **Navigation**: CategoryMenu, FacetedFilter, ShopNavbar
- **Account**: AddressCard, RegisterForm, ForgotPasswordForm

#### 5. **Marketing Components** (`src/components/marketing/`)
Marketing and content components:

- **Sections**: Hero, Features, CTASection, BlogList, Testimonials
- **UI Elements**: CookieBanner, BadgeTitle, NewsletterSignup

#### 6. **Utility Components** (`src/components/utility/`)
Cross-cutting utility components:

- AuthLayout, ConfirmDialog, ErrorBoundary, SearchBar, etc.

### Component Design Principles

1. **Composition over Configuration**: Components are designed to be composable
2. **Props-based API**: Clean, TypeScript-typed props interfaces
3. **Slot Support**: Flexible content projection with Svelte slots
4. **Reactive by Default**: Leverage Svelte 5's reactivity system
5. **Accessible**: ARIA attributes and keyboard navigation built-in
6. **Theme Aware**: Support for light/dark themes via DaisyUI

---

## 🎨 Styling Architecture

### DaisyUI + Tailwind CSS

The library uses DaisyUI component classes built on Tailwind CSS:

```javascript
// tailwind.config.js
daisyui: {
  themes: ["light", "dark"],
  darkTheme: "dark",
  base: true,
  styled: true,
  utils: true,
}
```

### Component Styling Pattern

Components use static Tailwind classes for JIT compilation:

```svelte
<script lang="ts">
  let buttonClasses = $derived([
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    size === 'lg' && 'btn-lg',
    outline && 'btn-outline',
  ].filter(Boolean).join(' '));
</script>

<button class={buttonClasses}>
  {label}
</button>
```

---

## 📚 Storybook Integration

### Purpose

Storybook serves as:
- **Development Environment**: Isolated component development
- **Documentation**: Live component documentation
- **Testing**: Visual regression and interaction testing
- **Showcase**: Demo application for the library

### Configuration

```typescript
// .storybook/main.ts
{
  stories: ["../src/**/*.stories.@(js|ts|svelte)"],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: "@storybook/sveltekit"
}
```

### Theme Support

ThemeWrapper decorator enables light/dark theme switching in Storybook.

---

## 📤 Package Distribution

### Build Output

The library is packaged using `@sveltejs/package`:

```json
{
  "svelte": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js"
    }
  }
}
```

### Usage in Consumer Projects

```javascript
import { Button, Card, Modal } from 'hexawebshare';
```

---

## 🔄 Development Workflow

1. **Component Development**: Build components in isolation with Storybook
2. **Type Safety**: TypeScript ensures type-safe props and APIs
3. **Accessibility Testing**: Use Storybook a11y addon
4. **Documentation**: Write stories that serve as documentation
5. **Testing**: Vitest for unit tests, Playwright for E2E
6. **Packaging**: Build and package with `svelte-package`
7. **Publishing**: Distribute via npm registry

---

## 🧩 Module System

- **ES Modules**: Modern JavaScript module system
- **Tree Shaking**: Only import what you need
- **Side Effects**: CSS marked as side effects for proper bundling

---

## 🔐 Type System

Full TypeScript support with:
- Strict mode enabled
- Component prop interfaces
- Event type definitions
- Generic component support

---

## 📬 Questions?

Contact the team at **[info@hexatune.com](mailto:info@hexatune.com)** or open an issue.

---

Built by [hexaTune LLC](https://hexatune.com) · GitHub: [hTuneSys/hexaWebShare](https://github.com/hTuneSys/hexaWebShare) · License: [MIT](https://opensource.org/license/mit/)
