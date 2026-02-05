<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# hexaWebShare

A comprehensive Svelte 5 component library built with DaisyUI and Tailwind CSS, offering a rich collection of UI components for modern web applications.

## ✨ Features

- 🎨 **100+ Components** - Buttons, forms, layouts, overlays, and more
- ⚡ **Svelte 5** - Built with the latest Svelte features and runes
- 🎭 **DaisyUI Integration** - Beautiful, themeable components
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 📱 **Responsive** - Mobile-first, fully responsive designs
- ♿ **Accessible** - WCAG compliant components
- 🎨 **Themeable** - Multiple DaisyUI themes supported

---

## 📦 Installation

### Install from NPM (Recommended)

```bash
# Install the latest version
pnpm add @htunesys/hexawebshare

# Or install a specific version
pnpm add @htunesys/hexawebshare@0.1.0
```

### Install Peer Dependencies

You **must** install these dependencies in your project:

```bash
pnpm add -D tailwindcss@^4 daisyui@^5 lucide-svelte@^0.563
```

---

## 🚀 Quick Setup

### 1. Configure Tailwind CSS

Create or update your CSS file (e.g., `src/app.css`):

```css
@import 'tailwindcss';

@plugin 'daisyui' {
	themes:
		light --default,
		dark --prefersdark;
	logs: false;
}

@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';
```

### 2. Import and Use Components

```svelte
<script lang="ts">
	import { Button, Card, Input } from '@htunesys/hexawebshare';
</script>

<Card>
	<h2>Login Form</h2>
	<Input label="Email" type="email" placeholder="Enter your email" />
	<Input label="Password" type="password" placeholder="Enter your password" />
	<Button variant="primary">Sign In</Button>
</Card>
```

---

## 📚 Available Components

### Core Components

#### Buttons

- `Button` - Versatile button with variants
- `IconButton` - Icon-only button
- `ButtonGroup` - Group multiple buttons
- `ToggleButton` - Toggle state button
- `SegmentedControl` - Segmented control buttons

#### Forms

- `Input` - Text input with validation
- `Select` - Dropdown select
- `Checkbox` - Checkbox input
- `RadioGroup` - Radio button group
- `Switch` - Toggle switch
- `Textarea` - Multi-line text input
- `DatePicker` - Date selection
- `TimePicker` - Time selection
- `FileUpload` - File upload component
- `NumberInput` - Numeric input with stepper
- `SearchInput` - Search input with icon
- `Slider` - Range slider
- `MultiSelect` - Multi-selection dropdown

#### Layout

- `Card` - Content container
- `Container` - Page container
- `Grid` - Grid layout
- `Row` / `Col` - Flex layout
- `Divider` - Visual separator
- `Section` - Content section
- `PageWrapper` - Full page wrapper

#### Feedback

- `Alert` - Alert messages
- `Toast` - Toast notifications
- `Spinner` - Loading spinner
- `ProgressBar` - Progress indicator
- `Loader` - Full-page loader
- `SkeletonLoader` - Skeleton loading state
- `Callout` - Important callouts

#### Typography

- `Heading` - Headings (h1-h6)
- `Text` - Text with variants
- `Paragraph` - Paragraph text
- `Link` - Styled link
- `Lead` - Lead paragraph
- `MutedText` - Muted text

#### Media

- `Avatar` - User avatar
- `Badge` - Status badge
- `Chip` - Chip/tag component
- `Icon` - Icon wrapper (Lucide)
- `Pill` - Pill badge
- `Tag` - Tag component
- `Tooltip` - Tooltip overlay

#### Data Display

- `Table` - Data table
- `List` / `ListItem` - List components
- `StatusBadge` - Status indicator
- `StatusDot` - Status dot
- `Label` - Form label
- `EmptyState` - Empty state placeholder

#### Navigation & Overlays

- `Menu` - Dropdown menu
- `Modal` - Modal dialog
- `Drawer` - Side drawer
- `Dropdown` - Dropdown component
- `Tabs` - Tab navigation
- `Accordion` - Expandable sections
- `Breadcrumbs` - Breadcrumb navigation
- `Pagination` - Page navigation
- `Sidebar` - Side navigation
- `Stepper` - Step indicator
- `Steps` - Multi-step process
- `Popover` - Popover overlay
- `ContextMenu` - Right-click menu

### Admin Components

- `AdminLayout` - Admin panel layout
- `AdminSidebar` - Admin navigation sidebar
- `DataTableToolbar` - Data table toolbar

### E-commerce Components

- `ProductCard` - Product display card
- `ProductGrid` - Product grid layout
- `ProductList` - Product list view
- `PriceDisplay` - Price formatter
- `ProductRating` - Star rating
- `AddressCard` - Address display
- `AddressList` - Address list
- `AccountSidebar` - Account sidebar

### Marketing Components

- `HeroSection` - Hero section
- `CTASection` - Call-to-action section
- `FeaturesSection` - Features showcase
- `PricingSection` - Pricing tables
- `TestimonialsSection` - Customer testimonials
- `FAQAccordionSection` - FAQ section
- `StatsSection` - Statistics display
- `BlogListSection` - Blog list
- `ContactSection` - Contact form
- `Navbar` - Navigation bar
- `SiteFooter` - Site footer
- `LogoCloud` - Logo showcase
- `Timeline` - Timeline component
- `Roadmap` - Product roadmap

### Utility Components

- `FooterBar` - Footer component
- `GlobalSearchBar` - Global search
- `ThemeToggle` - Dark/light theme toggle
- `LanguageSwitcher` - Language selector
- `ConfirmDialog` - Confirmation dialog
- `FilterPanel` - Filter sidebar
- `KeyboardShortcutHint` - Keyboard hints

---

## 🎨 Theming

hexaWebShare uses DaisyUI themes. Available themes:

```css
@plugin 'daisyui' {
	themes:
		light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine,
		halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk,
		autumn, business, acid, lemonade, night, coffee, winter;
}
```

---

## 📖 TypeScript Support

All components are fully typed with TypeScript:

```typescript
import { Button, type ButtonProps } from '@htunesys/hexawebshare';

const props: ButtonProps = {
	variant: 'primary',
	size: 'md',
	disabled: false
};
```

---

## 🔄 Version Management

```bash
# Install latest version
pnpm add @htunesys/hexawebshare

# Install specific version
pnpm add @htunesys/hexawebshare@0.1.0

# Update to latest
pnpm update @htunesys/hexawebshare
```

See all versions on [NPM](https://www.npmjs.com/package/@htunesys/hexawebshare?activeTab=versions)

---

## 🛠️ Development Commands

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `pnpm dev`             | Start SvelteKit dev server     |
| `pnpm storybook`       | Start Storybook dev server     |
| `pnpm build`           | Build library package          |
| `pnpm prepack`         | Build package for distribution |
| `pnpm build-storybook` | Build static Storybook         |
| `pnpm check`           | TypeScript type checking       |
| `pnpm format`          | Format code with Prettier      |
| `pnpm lint`            | Check code formatting          |

---

## 📂 Component Structure

```
src/components/
├── core/         # Core UI components (buttons, forms, layout)
├── admin/        # Admin panel components
├── b2b/          # B2B workspace components
├── ecommerce/    # E-commerce components
├── marketing/    # Marketing components
└── utility/      # Utility components
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../docs/CONTRIBUTING.md) for details.

- [Development Guide](../docs/DEVELOPMENT_GUIDE.md)
- [Architecture](../docs/ARCHITECTURE.md)
- [Branch Strategy](../docs/BRANCH_STRATEGY.md)
- [Commit Strategy](../docs/COMMIT_STRATEGY.md)

---

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

---

## 🏢 About

Built by [hexaTune LLC](https://hexatune.com)

- **GitHub:** [hTuneSys/hexaWebShare](https://github.com/hTuneSys/hexaWebShare)
- **Storybook:** [View Components](https://htuneSys.github.io/hexaWebShare/)

---

## ⚠️ Requirements

- Node.js >= 18.0.0
- pnpm (recommended) or npm
- Svelte >= 5.0.0
- Tailwind CSS >= 4.0.0
- DaisyUI >= 5.0.0
- lucide-svelte >= 0.563.0

---

## 🙏 Acknowledgments

- Built with [Svelte 5](https://svelte.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Components from [DaisyUI](https://daisyui.com)
- Icons by [Lucide](https://lucide.dev)
- Documented with [Storybook](https://storybook.js.org)
