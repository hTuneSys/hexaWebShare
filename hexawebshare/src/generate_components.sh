#!/bin/bash

base="components"

create() {
  mkdir -p "$base/$1"
  touch "$base/$1/$2.svelte"
}

# Core / Layout
create "core/layout" "Container"
create "core/layout" "PageWrapper"
create "core/layout" "Grid"
create "core/layout" "Row"
create "core/layout" "Col"
create "core/layout" "Section"
create "core/layout" "CardSection"
create "core/layout" "Card"
create "core/layout" "Divider"
create "core/layout" "Separator"
create "core/layout" "Spacer"

# Core / Typography
create "core/typography" "Heading"
create "core/typography" "Text"
create "core/typography" "Paragraph"
create "core/typography" "Lead"
create "core/typography" "MutedText"
create "core/typography" "Link"

# Core / Buttons
create "core/buttons" "Button"
create "core/buttons" "IconButton"
create "core/buttons" "ButtonGroup"
create "core/buttons" "ToggleButton"
create "core/buttons" "SegmentedControl"

# Core / Media
create "core/media" "Icon"
create "core/media" "Avatar"
create "core/media" "Badge"
create "core/media" "Pill"
create "core/media" "Tooltip"
create "core/media" "Tag"
create "core/media" "Chip"

# Core / Forms
form_files=(
  FormWrapper Input Textarea Select MultiSelect Checkbox RadioGroup Switch
  Toggle Slider RangeSlider DatePicker DateRangePicker TimePicker NumberInput
  FileUpload SearchInput
)
for f in "${form_files[@]}"; do create "core/forms" "$f"; done

# Core / Feedback
feedback_files=(
  Alert Callout Toast Notification ProgressBar Spinner Loader SkeletonLoader
)
for f in "${feedback_files[@]}"; do create "core/feedback" "$f"; done

# Core / Overlay & Navigation
overlay_files=(
  Modal Dialog Drawer Sidebar Dropdown Menu ContextMenu Tabs Accordion
  Steps Stepper Breadcrumbs Pagination Popover
)
for f in "${overlay_files[@]}"; do create "core/overlay-navigation" "$f"; done

# Core / Data Display
data_files=(
  List ListItem Table EmptyState StatusDot StatusBadge
)
for f in "${data_files[@]}"; do create "core/data-display" "$f"; done

# Marketing / Sections
marketing_sections=(
  Navbar MobileNav HamburgerMenu SiteFooter HeroSection FeaturesSection
  TestimonialsSection StatsSection PricingSection FAQAccordionSection
  BlogListSection BlogPostLayout CTASection ContactSection
)
for f in "${marketing_sections[@]}"; do create "marketing/sections" "$f"; done

# Marketing / UI Elements
marketing_ui=(
  SocialIconList LogoCloud Timeline Roadmap HighlightedText BadgeTitle CookieBanner
)
for f in "${marketing_ui[@]}"; do create "marketing/ui-elements" "$f"; done

# Ecommerce / Navigation
ecom_nav=(
  ShopNavbar CategoryMenu ProductFilterBar FacetedFilter ProductSortDropdown
)
for f in "${ecom_nav[@]}"; do create "ecommerce/navigation" "$f"; done

# Ecommerce / Product Listing
ecom_list=(
  ProductCard ProductList ProductGrid ProductBadge ProductRating PriceDisplay
)
for f in "${ecom_list[@]}"; do create "ecommerce/product-listing" "$f"; done

# Ecommerce / Product Detail
ecom_detail=(
  ProductImageGallery ProductInfoPanel VariantSelector QuantitySelector
  AddToCartButton StockStatus ProductTabs ReviewList ReviewItem ReviewForm
)
for f in "${ecom_detail[@]}"; do create "ecommerce/product-detail" "$f"; done

# Ecommerce / Cart & Checkout
ecom_cart=(
  CartIcon CartDropdown MiniCart CartPageLayout CartItemRow CartTotals
  CouponCodeField CheckoutSteps AddressForm ShippingMethodSelector
  PaymentMethodSelector OrderSummaryCard OrderConfirmationPage
)
for f in "${ecom_cart[@]}"; do create "ecommerce/cart-checkout" "$f"; done

# Ecommerce / Account
ecom_account=(
  LoginForm RegisterForm ForgotPasswordForm ResetPasswordForm AccountSidebar
  ProfileForm AddressList AddressCard OrderList OrderRow OrderDetailView
  WishlistList WishlistItem SavedPaymentMethodList
)
for f in "${ecom_account[@]}"; do create "ecommerce/account" "$f"; done

# Admin / Layout
admin_layout=(
  AdminLayout AdminSidebar AdminTopbar AdminBreadcrumbs
)
for f in "${admin_layout[@]}"; do create "admin/layout" "$f"; done

# Admin / CRUD Data
admin_crud=(
  DataTable DataTableToolbar FilterChips DetailDrawer DetailModal KeyValueList
)
for f in "${admin_crud[@]}"; do create "admin/crud-data" "$f"; done

# Admin / Forms
admin_forms=(
  EntityForm FormSection FormCard InlineEditField TagInput
)
for f in "${admin_forms[@]}"; do create "admin/forms" "$f"; done

# Admin / Dashboard
admin_dashboard=(
  KPIStatCard ChartLine ChartBar ChartPie ChartLegend DashboardDateRangeFilter
)
for f in "${admin_dashboard[@]}"; do create "admin/dashboard" "$f"; done

# Admin / System
admin_system=(
  ActivityLogList NotificationCenter AuditTrailList
)
for f in "${admin_system[@]}"; do create "admin/system" "$f"; done

# Admin / Permissions
admin_permissions=(
  UserTable RoleBadge RoleSelector PermissionSelector InviteUserForm
)
for f in "${admin_permissions[@]}"; do create "admin/permissions" "$f"; done

# B2B / Workspace
b2b_workspace=(
  AppShell WorkspaceSwitcher CompanySwitcher TeamList TeamCard MemberList
  MemberRow InviteMemberModal PlanUsageBar
)
for f in "${b2b_workspace[@]}"; do create "b2b/workspace" "$f"; done

# B2B / Workflow
b2b_workflow=(
  KanbanBoard KanbanColumn KanbanCard ActivityTimeline ActivityFeed CommentList
  CommentItem CommentEditor AttachmentList AttachmentItem LabelSelector TagSelector
)
for f in "${b2b_workflow[@]}"; do create "b2b/workflow" "$f"; done

# B2B / Models
b2b_models=(
  ClientList ClientDetail ProjectList ProjectCard ProjectDetailTabs InvoiceList
  InvoiceRow InvoiceDetailView PaymentStatusBadge
)
for f in "${b2b_models[@]}"; do create "b2b/models" "$f"; done

# B2B / Approvals
b2b_approvals=(
  ApprovalStatusBadge ApprovalTimeline ApproveRejectButtons
)
for f in "${b2b_approvals[@]}"; do create "b2b/approvals" "$f"; done

# Utility
utility_files=(
  GlobalSearchBar FilterPanel SavedFiltersDropdown LanguageSwitcher ThemeToggle
  KeyboardShortcutHint ConfirmDialog TwoFactorInput PublicPageLayout AuthLayout
  DashboardLayout
)
for f in "${utility_files[@]}"; do create "utility/utility" "$f"; done

echo "✔️  Tüm komponent klasör yapısı ve boş .svelte dosyaları oluşturuldu!"
