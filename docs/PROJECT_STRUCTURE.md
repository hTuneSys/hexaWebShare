<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# 📁 Project Structure: hexaWebShare

This document outlines the organization of the hexaWebShare Svelte component library repository.

---

## 🏗️ Repository Overview

hexaWebShare is a **monorepo** containing:
- Svelte component library (`hexawebshare/`)
- Documentation (`docs/`)
- GitHub configurations (`.github/`)
- License and legal files

---

## 📂 Root Directory

```
hexaWebShare/
├── .github/              # GitHub configuration
│   ├── ISSUE_TEMPLATE/   # Issue templates
│   ├── workflows/        # GitHub Actions CI/CD
│   ├── CODEOWNERS        # Code ownership
│   ├── CODE_OF_CONDUCT.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── SECURITY.md
├── docs/                 # Documentation files
├── hexawebshare/         # Main component library package
├── LICENSES/             # License files
├── .gitignore
├── .releaserc.yml        # Semantic release config
├── CHANGELOG.md
├── LICENSE
├── README.md
└── REUSE.toml            # License compliance
```

---

## 🎨 Component Library Directory (`hexawebshare/`)

The main package containing the Svelte component library.

```
hexawebshare/
├── .storybook/           # Storybook configuration
│   ├── main.ts           # Main Storybook config
│   ├── preview.ts        # Global decorators & parameters
│   └── ThemeWrapper.svelte  # Theme switching wrapper
├── .vscode/              # VS Code settings
│   └── settings.json
├── src/
│   ├── components/       # Component library (main source)
│   │   ├── core/         # Core UI components
│   │   ├── admin/        # Admin panel components
│   │   ├── b2b/          # B2B workspace components
│   │   ├── ecommerce/    # E-commerce components
│   │   ├── marketing/    # Marketing components
│   │   ├── utility/      # Utility components
│   │   └── assets/       # Static assets (images, icons)
│   ├── lib/
│   │   └── index.ts      # Library entry point (exports)
│   ├── routes/           # SvelteKit routes (showcase app)
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   └── layout.css    # Global styles
│   ├── app.d.ts          # TypeScript app definitions
│   └── app.html          # HTML template
├── static/               # Static assets
│   └── favicon.svg
├── .gitignore
├── .npmrc                # npm configuration
├── .prettierignore
├── .prettierrc           # Prettier config
├── debug-output.css      # Debug CSS output
├── package.json          # Package manifest
├── pnpm-lock.yaml        # pnpm lockfile
├── pnpm-workspace.yaml   # pnpm workspace config
├── postcss.config.js     # PostCSS config
├── README.md             # Package README
├── svelte.config.js      # SvelteKit config
├── tailwind.config.js    # Tailwind CSS + DaisyUI config
├── tsconfig.json         # TypeScript config
└── vite.config.ts        # Vite config
```

---

## 🧩 Component Categories (`src/components/`)

### 1. Core Components (`core/`)

**Fundamental UI building blocks:**

```
core/
├── buttons/
│   ├── Button.svelte
│   ├── Button.stories.svelte
│   ├── IconButton.svelte
│   ├── ButtonGroup.svelte
│   ├── ToggleButton.svelte
│   └── SegmentedControl.svelte
├── forms/
│   ├── Input.svelte
│   ├── Select.svelte
│   ├── Checkbox.svelte
│   ├── RadioGroup.svelte
│   ├── Switch.svelte
│   ├── Toggle.svelte
│   ├── Slider.svelte
│   ├── RangeSlider.svelte
│   ├── DatePicker.svelte
│   ├── DateRangePicker.svelte
│   ├── TimePicker.svelte
│   ├── Textarea.svelte
│   ├── FileUpload.svelte
│   ├── NumberInput.svelte
│   ├── SearchInput.svelte
│   ├── MultiSelect.svelte
│   └── FormWrapper.svelte
├── layout/
│   ├── Container.svelte
│   ├── Grid.svelte
│   ├── Row.svelte
│   ├── Col.svelte
│   ├── Card.svelte
│   ├── CardSection.svelte
│   ├── Section.svelte
│   ├── Divider.svelte
│   ├── Separator.svelte
│   ├── Spacer.svelte
│   └── PageWrapper.svelte
├── typography/
│   ├── Heading.svelte
│   ├── Text.svelte
│   ├── Paragraph.svelte
│   ├── Lead.svelte
│   ├── Link.svelte
│   └── MutedText.svelte
├── media/
│   ├── Avatar.svelte
│   ├── Badge.svelte
│   ├── Icon.svelte
│   ├── Pill.svelte
│   ├── Tooltip.svelte
│   ├── Tag.svelte
│   └── Chip.svelte
├── data-display/
│   ├── Table.svelte
│   ├── List.svelte
│   ├── ListItem.svelte
│   ├── EmptyState.svelte
│   ├── StatusBadge.svelte
│   └── StatusDot.svelte
├── feedback/
│   ├── Alert.svelte
│   ├── Toast.svelte
│   ├── Notification.svelte
│   ├── Callout.svelte
│   ├── Spinner.svelte
│   ├── Loader.svelte
│   ├── ProgressBar.svelte
│   └── SkeletonLoader.svelte
└── overlay-navigation/
    ├── Modal.svelte
    ├── Dialog.svelte
    ├── Drawer.svelte
    ├── Sidebar.svelte
    ├── Dropdown.svelte
    ├── Menu.svelte
    ├── ContextMenu.svelte
    ├── Popover.svelte
    ├── Tabs.svelte
    ├── Accordion.svelte
    ├── Steps.svelte
    ├── Stepper.svelte
    ├── Breadcrumbs.svelte
    └── Pagination.svelte
```

### 2. Admin Components (`admin/`)

**Components for admin panels and dashboards:**

```
admin/
├── dashboard/
│   ├── KPIStatCard.svelte
│   ├── ChartBar.svelte
│   ├── ChartLine.svelte
│   ├── ChartPie.svelte
│   ├── ChartLegend.svelte
│   └── DashboardDateRangeFilter.svelte
├── crud-data/
│   ├── DataTable.svelte
│   ├── DataTableToolbar.svelte
│   ├── DetailDrawer.svelte
│   ├── DetailModal.svelte
│   ├── FilterChips.svelte
│   └── KeyValueList.svelte
├── forms/
│   ├── EntityForm.svelte
│   ├── FormCard.svelte
│   ├── FormSection.svelte
│   ├── InlineEditField.svelte
│   └── TagInput.svelte
├── layout/
│   ├── AdminLayout.svelte
│   ├── AdminSidebar.svelte
│   ├── AdminTopbar.svelte
│   └── AdminBreadcrumbs.svelte
├── permissions/
│   ├── RoleSelector.svelte
│   ├── RoleBadge.svelte
│   ├── PermissionSelector.svelte
│   ├── UserTable.svelte
│   └── InviteUserForm.svelte
└── system/
    ├── ActivityLogList.svelte
    ├── AuditTrailList.svelte
    └── NotificationCenter.svelte
```

### 3. B2B Components (`b2b/`)

**Enterprise and business workspace components:**

```
b2b/
├── workspace/
│   ├── AppShell.svelte
│   ├── WorkspaceSwitcher.svelte
│   ├── CompanySwitcher.svelte
│   ├── TeamList.svelte
│   ├── TeamCard.svelte
│   ├── MemberList.svelte
│   ├── MemberRow.svelte
│   ├── InviteMemberModal.svelte
│   └── PlanUsageBar.svelte
├── models/
│   ├── ClientList.svelte
│   ├── ClientDetail.svelte
│   ├── ProjectList.svelte
│   ├── ProjectCard.svelte
│   ├── ProjectDetailTabs.svelte
│   ├── InvoiceList.svelte
│   ├── InvoiceRow.svelte
│   ├── InvoiceDetailView.svelte
│   └── PaymentStatusBadge.svelte
├── workflow/
│   ├── KanbanBoard.svelte
│   ├── KanbanColumn.svelte
│   ├── KanbanCard.svelte
│   ├── ActivityFeed.svelte
│   ├── ActivityTimeline.svelte
│   ├── CommentList.svelte
│   ├── CommentItem.svelte
│   ├── AttachmentItem.svelte
│   ├── TagSelector.svelte
│   └── LabelSelector.svelte
└── approvals/
    ├── ApprovalWorkflow.svelte
    ├── ApprovalStatusBadge.svelte
    └── ApprovalTimeline.svelte
```

### 4. E-commerce Components (`ecommerce/`)

**Components for online stores:**

```
ecommerce/
├── product-listing/
│   ├── ProductCard.svelte
│   ├── ProductGrid.svelte
│   ├── ProductList.svelte
│   ├── PriceDisplay.svelte
│   ├── ProductBadge.svelte
│   └── ProductRating.svelte
├── product-detail/
│   ├── ProductImageGallery.svelte
│   ├── ProductInfo.svelte
│   ├── ProductOptions.svelte
│   ├── AddToCartButton.svelte
│   ├── ProductReviews.svelte
│   ├── ReviewForm.svelte
│   ├── RelatedProducts.svelte
│   └── ProductTabs.svelte
├── cart-checkout/
│   ├── CartDropdown.svelte
│   ├── CartIcon.svelte
│   ├── MiniCart.svelte
│   ├── CartPageLayout.svelte
│   ├── CartItemRow.svelte
│   ├── CartTotals.svelte
│   ├── CheckoutSteps.svelte
│   ├── AddressForm.svelte
│   ├── PaymentMethodSelector.svelte
│   ├── OrderSummaryCard.svelte
│   ├── OrderConfirmationPage.svelte
│   └── CouponCodeField.svelte
├── navigation/
│   ├── ShopNavbar.svelte
│   ├── CategoryMenu.svelte
│   ├── ProductFilterBar.svelte
│   ├── FacetedFilter.svelte
│   └── ProductSortDropdown.svelte
└── account/
    ├── AccountSidebar.svelte
    ├── OrderHistory.svelte
    ├── OrderDetailCard.svelte
    ├── AddressCard.svelte
    ├── AddressBook.svelte
    ├── ProfileForm.svelte
    ├── ChangePasswordForm.svelte
    ├── WishlistCard.svelte
    ├── SavedPaymentMethods.svelte
    ├── AccountSettings.svelte
    ├── RegisterForm.svelte
    └── ForgotPasswordForm.svelte
```

### 5. Marketing Components (`marketing/`)

**Marketing and content components:**

```
marketing/
├── sections/
│   ├── HeroSection.svelte
│   ├── FeaturesSection.svelte
│   ├── CTASection.svelte
│   ├── TestimonialsSection.svelte
│   ├── PricingSection.svelte
│   ├── FAQSection.svelte
│   ├── StatsSection.svelte
│   ├── TeamSection.svelte
│   ├── ContactSection.svelte
│   ├── FooterSection.svelte
│   ├── BlogListSection.svelte
│   ├── BlogPostLayout.svelte
│   └── NewsletterSection.svelte
└── ui-elements/
    ├── CookieBanner.svelte
    ├── BadgeTitle.svelte
    ├── FeatureCard.svelte
    ├── TestimonialCard.svelte
    ├── PricingCard.svelte
    └── NewsletterSignup.svelte
```

### 6. Utility Components (`utility/`)

**Cross-cutting utility components:**

```
utility/
└── utility/
    ├── AuthLayout.svelte
    ├── ConfirmDialog.svelte
    ├── ErrorBoundary.svelte
    ├── LoadingScreen.svelte
    ├── SearchBar.svelte
    ├── Pagination.svelte
    ├── FilterPanel.svelte
    ├── SortDropdown.svelte
    └── ShareButton.svelte
```

---

## 📄 Documentation Directory (`docs/`)

```
docs/
├── ARCHITECTURE.md         # System architecture and design
├── BRANCH_STRATEGY.md      # Git branching guidelines
├── BRANDING.md             # Brand guidelines
├── CNAME                   # GitHub Pages custom domain
├── CODE_OF_CONDUCT.md      # Community behavior rules
├── COMMIT_STRATEGY.md      # Commit message conventions
├── COMMUNITY.md            # Community guidelines
├── CONFIGURATION.md        # Configuration guide
├── CONTACT.md              # Contact information
├── CONTRIBUTING.md         # Contribution guidelines
├── DEVELOPMENT_GUIDE.md    # Development workflow
├── FAQ.md                  # Frequently asked questions
├── GETTING_STARTED.md      # Setup and quick start
├── LABELLING_STRATEGY.md   # Issue/PR labeling
├── PR_STRATEGY.md          # Pull request guidelines
├── PROJECT_BOARD.md        # Project management
├── PROJECT_STRUCTURE.md    # This file
├── SECURITY.md             # Security policy
├── STYLE_GUIDE.md          # Code style guidelines
├── SUMMARY.md              # Documentation overview
└── SUPPORT.md              # Support information
```

---

## ⚙️ Configuration Files

### Root Level

- `.gitignore` – Git ignore patterns
- `.releaserc.yml` – Semantic release configuration
- `CHANGELOG.md` – Project changelog
- `LICENSE` – MIT license
- `README.md` – Project overview
- `REUSE.toml` – License compliance metadata

### Package Level (`hexawebshare/`)

**Build & Package:**
- `package.json` – Package manifest and scripts
- `svelte.config.js` – SvelteKit configuration
- `vite.config.ts` – Vite build configuration
- `tsconfig.json` – TypeScript compiler options

**Styling:**
- `tailwind.config.js` – Tailwind CSS + DaisyUI config
- `postcss.config.js` – PostCSS plugins

**Code Quality:**
- `.prettierrc` – Prettier formatter config
- `.prettierignore` – Prettier ignore patterns
- `.npmrc` – npm configuration

**Development:**
- `.storybook/main.ts` – Storybook configuration
- `.storybook/preview.ts` – Storybook global settings
- `.vscode/settings.json` – VS Code editor settings

---

## 🔧 Build Artifacts

### Generated Directories (Not in Git)

```
hexawebshare/
├── node_modules/         # Dependencies
├── .svelte-kit/          # SvelteKit build cache
├── dist/                 # Built package output
├── package/              # svelte-package output
├── storybook-static/     # Built Storybook
└── .storybook-static/    # Storybook cache
```

---

## 📦 Package Exports

The library exports components from `src/lib/index.ts`:

```typescript
// Core components
export { default as Button } from '../components/core/buttons/Button.svelte';
export { default as Card } from '../components/core/layout/Card.svelte';
export { default as Modal } from '../components/core/overlay-navigation/Modal.svelte';

// Admin components
export { default as DataTable } from '../components/admin/crud-data/DataTable.svelte';

// B2B components
export { default as KanbanBoard } from '../components/b2b/workflow/KanbanBoard.svelte';

// E-commerce components
export { default as ProductCard } from '../components/ecommerce/product-listing/ProductCard.svelte';

// Marketing components
export { default as HeroSection } from '../components/marketing/sections/HeroSection.svelte';
```

---

## 🎯 Key Directories Explained

### `.storybook/`
Storybook configuration for component development and documentation. Contains main config, preview settings, and theme wrapper.

### `src/components/`
The heart of the library. Organized by domain (core, admin, b2b, ecommerce, marketing, utility).

### `src/lib/`
Library entry point. Exports all public components.

### `src/routes/`
SvelteKit showcase app demonstrating library usage.

### `docs/`
Comprehensive project documentation.

### `.github/`
GitHub-specific configurations including CI/CD workflows, issue templates, and community files.

---

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `Button.svelte`, `DataTable.svelte`)
- **Stories**: Component name + `.stories.svelte` (e.g., `Button.stories.svelte`)
- **Tests**: Component name + `.test.ts` (e.g., `Button.test.ts`)
- **Config files**: kebab-case or standard names (e.g., `svelte.config.js`, `tailwind.config.js`)
- **Documentation**: SCREAMING_SNAKE_CASE for markdown (e.g., `GETTING_STARTED.md`)

---

## 🚀 Build & Deployment

### Development
```bash
pnpm storybook  # Component development
pnpm dev        # SvelteKit dev server
```

### Production
```bash
pnpm build             # Build library package
pnpm build-storybook   # Build static Storybook
```

### Distribution
- **npm**: Package published from `dist/` directory
- **Storybook**: Deployed from `storybook-static/` directory

---

For more details on development workflow, see [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md).
