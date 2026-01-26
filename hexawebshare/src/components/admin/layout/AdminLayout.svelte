<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SidebarItem } from '../../core/overlay-navigation/Sidebar.svelte';
	import Sidebar from '../../core/overlay-navigation/Sidebar.svelte';
	import Drawer from '../../core/overlay-navigation/Drawer.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';

	/**
	 * Props interface for AdminLayout - Pioneer Strict Mode
	 * No default values are allowed. All behavioral and text props are required.
	 * This component serves as a blueprint for future library standards.
	 */
	interface Props {
		// --- Snippets ---
		/**
		 * Header/topbar content snippet (logo, navigation, user menu, etc.)
		 * Required: Must be provided by consumer
		 */
		header: Snippet;
		/**
		 * Main content area snippet
		 * Required: Must be provided by consumer
		 */
		children: Snippet;
		/**
		 * Sidebar content snippet (custom sidebar implementation)
		 * Optional: Alternative to sidebarItems prop
		 */
		sidebar?: Snippet;
		/**
		 * Footer content snippet
		 * Optional: Render footer section when provided
		 */
		footer?: Snippet;

		// --- Sidebar Configuration ---
		/**
		 * Array of sidebar items for programmatic sidebar rendering
		 * Optional: Alternative to sidebar snippet
		 */
		sidebarItems?: SidebarItem[];
		/**
		 * Sidebar title text
		 * Required: No embedded strings allowed
		 */
		sidebarTitle: string;
		/**
		 * Sidebar subtitle text
		 * Required: No embedded strings allowed
		 */
		sidebarSubtitle: string;
		/**
		 * Whether the sidebar is collapsed
		 * Required: Consumer must control state explicitly
		 */
		sidebarCollapsed: boolean;
		/**
		 * Whether the sidebar can be collapsed
		 * Required: Consumer must specify behavior
		 */
		sidebarCollapsible: boolean;
		/**
		 * Sidebar width variant
		 * Required: Consumer must specify width
		 */
		sidebarWidth: 'narrow' | 'default' | 'wide';

		// --- Layout States & Variants ---
		/**
		 * Visual variant of the layout
		 * Required: Consumer must specify variant
		 */
		variant: 'default' | 'bordered' | 'filled';
		/**
		 * Whether the layout is in loading state
		 * Required: Consumer must control loading state
		 */
		loading: boolean;
		/**
		 * Whether the layout is disabled
		 * Required: Consumer must specify disabled state
		 */
		disabled: boolean;

		// --- Mobile / Drawer Configuration ---
		/**
		 * Whether the mobile sidebar drawer is open
		 * Required: Consumer must control mobile drawer state
		 */
		mobileSidebarOpen: boolean;
		/**
		 * Whether to show mobile sidebar as drawer
		 * Required: Consumer must specify mobile behavior
		 */
		mobileDrawer: boolean;

		// --- Accessibility (Strict: No embedded strings) ---
		/**
		 * Accessible label for the admin layout container
		 * Required: No embedded strings - must be provided for i18n support
		 */
		ariaLabel: string;
		/**
		 * Accessible label for the loading spinner
		 * Required: No embedded strings - must be provided for i18n support
		 */
		loadingLabel: string;
		/**
		 * Accessible label for the sidebar navigation
		 * Required: No embedded strings - must be provided for i18n support
		 */
		sidebarAriaLabel: string;

		// --- Callbacks ---
		/**
		 * Callback when sidebar collapse state changes
		 * Required: Consumer must handle sidebar collapse events
		 */
		onSidebarCollapse: (collapsed: boolean) => void;

		// --- Styling ---
		/**
		 * Additional CSS classes
		 * Required: Pass empty string if no custom classes needed
		 */
		class: string;
	}

	const {
		header,
		children,
		sidebar,
		footer,
		sidebarItems,
		sidebarTitle,
		sidebarSubtitle,
		sidebarCollapsed = $bindable(),
		sidebarCollapsible,
		sidebarWidth,
		variant,
		loading,
		disabled,
		mobileSidebarOpen = $bindable(),
		mobileDrawer,
		ariaLabel,
		loadingLabel,
		sidebarAriaLabel,
		onSidebarCollapse,
		class: className,
		...props
	}: Props = $props();

	// Derived classes using static strings for JIT optimization
	let layoutClasses = $derived(
		[
			'admin-layout',
			'flex',
			'flex-col',
			'w-full',
			'min-h-screen',
			'bg-base-100',
			variant === 'bordered' && 'border border-base-300',
			variant === 'filled' && 'bg-base-200',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Determine if sidebar should be rendered
	let hasSidebar = $derived(sidebar || (sidebarItems && sidebarItems.length > 0));

	// Abstracted configuration for Sidebar component to avoid repetition
	let sidebarConfig = $derived.by(() => {
		if (!hasSidebar || sidebar) return null;
		if (sidebarItems && sidebarItems.length > 0) {
			return {
				items: sidebarItems,
				title: sidebarTitle,
				subtitle: sidebarSubtitle,
				width: sidebarWidth,
				collapsed: sidebarCollapsed,
				collapsible: sidebarCollapsible,
				onCollapse: onSidebarCollapse,
				ariaLabel: sidebarAriaLabel
			};
		}
		return null;
	});
</script>

<!--
	NOTE: Structural HTML elements (div, header, main, footer, aside) are used
	as semantic containers following AGENTS.md guidelines for "structural containers
	with no semantic meaning". These are layout primitives that don't have
	equivalent library components and are necessary for proper HTML semantics.
-->
<div class={layoutClasses} role="main" aria-label={ariaLabel} aria-busy={loading} {...props}>
	<!-- Header Section - Defensive check for robustness -->
	{#if header}
		<header
			class="admin-header border-base-300 bg-base-100 sticky top-0 z-40 shrink-0 border-b"
			role="banner"
			aria-label={ariaLabel}
		>
			{@render header()}
		</header>
	{/if}

	<!-- Content Wrapper (Sidebar + Main Content) -->
	<div class="admin-content-wrapper flex w-full flex-1 overflow-hidden">
		{#if hasSidebar && mobileDrawer}
			<!-- Mobile Drawer Implementation -->
			<Drawer
				open={mobileSidebarOpen}
				side="left"
				overlay={true}
				closeOnBackdrop={true}
				closeOnEscape={true}
				ariaLabel={sidebarAriaLabel}
				showCloseButton={true}
			>
				{#snippet children()}
					{#if sidebar}
						{@render sidebar()}
					{:else if sidebarConfig}
						<Sidebar {...sidebarConfig} />
					{/if}
				{/snippet}

				{#snippet content()}
					<div class="flex w-full flex-1 overflow-hidden">
						<!-- Desktop Sidebar (hidden on mobile) -->
						{#if sidebar}
							<aside class="admin-sidebar hidden shrink-0 lg:block" aria-label={sidebarAriaLabel}>
								{@render sidebar()}
							</aside>
						{:else if sidebarConfig}
							<div class="hidden shrink-0 lg:block">
								<Sidebar {...sidebarConfig} />
							</div>
						{/if}

						<!-- Main Content Area -->
						<main
							class="admin-main-content bg-base-100 flex w-full min-w-0 flex-1 flex-col overflow-auto"
						>
							{#if loading}
								<div class="flex flex-1 items-center justify-center">
									<Spinner size="lg" variant="primary" ariaLabel={loadingLabel} />
								</div>
							{:else if children}
								{@render children()}
							{/if}
						</main>
					</div>
				{/snippet}
			</Drawer>
		{:else}
			<!-- Desktop Only Layout (no mobile drawer) -->
			<div class="flex w-full flex-1 overflow-hidden">
				<!-- Sidebar Section -->
				{#if sidebar}
					<aside class="admin-sidebar hidden shrink-0 lg:block" aria-label={sidebarAriaLabel}>
						{@render sidebar()}
					</aside>
				{:else if sidebarConfig}
					<div class="hidden shrink-0 lg:block">
						<Sidebar {...sidebarConfig} />
					</div>
				{/if}

				<!-- Main Content Area -->
				<main
					class="admin-main-content bg-base-100 flex w-full min-w-0 flex-1 flex-col overflow-auto"
				>
					{#if loading}
						<div class="flex flex-1 items-center justify-center">
							<Spinner size="lg" variant="primary" ariaLabel={loadingLabel} />
						</div>
					{:else if children}
						{@render children()}
					{/if}
				</main>
			</div>
		{/if}
	</div>

	<!-- Footer Section - Optional -->
	{#if footer}
		<footer
			class="admin-footer border-base-300 bg-base-100 shrink-0 border-t"
			role="contentinfo"
			aria-label={ariaLabel}
		>
			{@render footer()}
		</footer>
	{/if}
</div>
