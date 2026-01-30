<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SidebarItem } from '../../core/overlay-navigation/Sidebar.svelte';
	import Sidebar from '../../core/overlay-navigation/Sidebar.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Alert from '../../core/feedback/Alert.svelte';

	interface Props {
		/** Header content (e.g. title, toolbar) */
		header?: Snippet;
		/** Main content area */
		children?: Snippet;
		/** Optional sidebar content (e.g. filters, custom UI). Use either this or sidebarItems. */
		sidebar?: Snippet;
		/** Optional sidebar items for programmatic nav. Uses core Sidebar when provided. */
		sidebarItems?: SidebarItem[];
		/** Sidebar title when using sidebarItems */
		sidebarTitle?: string;
		/** Sidebar subtitle when using sidebarItems */
		sidebarSubtitle?: string;
		/** Sidebar width when using sidebarItems */
		sidebarWidth?: 'narrow' | 'default' | 'wide';
		/** Sidebar item size when using sidebarItems */
		sidebarSize?: 'sm' | 'md' | 'lg';
		/** Sidebar variant when using sidebarItems */
		sidebarVariant?: 'default' | 'compact' | 'bordered';
		/** Optional footer content */
		footer?: Snippet;
		/** Sidebar position */
		sidebarPosition?: 'left' | 'right';
		/** Visual variant */
		variant?: 'default' | 'bordered' | 'filled';
		/** Show loading overlay and disable interaction */
		loading?: boolean;
		/** Disable layout interaction */
		disabled?: boolean;
		/** Show error state with message */
		error?: boolean;
		/** Error message when error is true */
		errorMessage?: string;
		/** Accessible label for the layout container */
		ariaLabel?: string;
		/** Accessible label for the loading spinner */
		loadingLabel?: string;
		/** Accessible label for the main content region */
		mainAriaLabel?: string;
		/** Accessible label for the sidebar region */
		sidebarAriaLabel?: string;
		/** Additional CSS classes */
		class?: string;
	}

	const {
		header,
		children,
		sidebar,
		sidebarItems,
		sidebarTitle = '',
		sidebarSubtitle = '',
		sidebarWidth = 'default',
		sidebarSize = 'md',
		sidebarVariant = 'default',
		footer,
		sidebarPosition = 'left',
		variant = 'default',
		loading = false,
		disabled = false,
		error = false,
		errorMessage = 'An error occurred. Please try again.',
		ariaLabel = 'Dashboard layout',
		loadingLabel = 'Loading content',
		mainAriaLabel = 'Main content',
		sidebarAriaLabel = 'Sidebar',
		class: className = '',
		...props
	}: Props = $props();

	let layoutClasses = $derived(
		[
			'dashboard-layout',
			'flex',
			'flex-col',
			'w-full',
			'max-w-full',
			'min-h-screen',
			'min-w-0',
			'overflow-x-hidden',
			'bg-base-100',
			variant === 'bordered' && 'border border-base-300',
			variant === 'filled' && 'bg-base-200',
			disabled && 'opacity-50 pointer-events-none',
			'[&_.btn:active]:!opacity-100',
			'[&_.btn:focus]:!opacity-100',
			'[&_button:active]:!opacity-100',
			'[&_button:focus]:!opacity-100',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	let hasSidebar = $derived(sidebar || (sidebarItems != null && sidebarItems.length > 0));

	let contentWrapperClasses = $derived(
		[
			'dashboard-content-wrapper',
			'flex',
			'w-full',
			'flex-1',
			'overflow-hidden',
			'flex-col',
			hasSidebar && 'lg:flex-row'
		]
			.filter(Boolean)
			.join(' ')
	);

	let sidebarOrderClasses = $derived(
		sidebarPosition === 'left' ? 'lg:order-first' : 'lg:order-last'
	);

	let mainOrderClasses = $derived(sidebarPosition === 'left' ? 'lg:order-last' : 'lg:order-first');

	let sidebarConfig = $derived.by(() => {
		if (!hasSidebar || sidebar || !sidebarItems?.length) return null;
		return {
			items: sidebarItems,
			title: sidebarTitle,
			subtitle: sidebarSubtitle,
			width: sidebarWidth,
			size: sidebarSize,
			variant: sidebarVariant,
			ariaLabel: sidebarAriaLabel
		};
	});

	let sidebarVariantOverrides = $derived.by(() => {
		if (!sidebarConfig) return '';
		if (sidebarVariant === 'compact')
			return '[&_.menu]:!p-1.5 [&_.menu]:!gap-0.5 [&_[role=menuitem]]:!py-1.5 [&_[role=menuitem]]:!px-2 [&_[role=menuitem]]:!gap-2 [&_[role=menuitem]]:!text-sm';
		if (sidebarVariant === 'bordered') return 'ring-2 ring-base-300 ring-inset';
		return '';
	});

	let sidebarAsideClasses = $derived(
		[
			'dashboard-sidebar',
			'border-base-300',
			'bg-base-100',
			'w-full',
			'min-w-0',
			'shrink-0',
			'border-b',
			'lg:w-64',
			'lg:border-r',
			'lg:border-b-0',
			'xl:w-72',
			sidebarOrderClasses,
			sidebarVariantOverrides
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<!--
	NOTE: Structural HTML elements (div, header, main, aside, footer) are used
	as semantic layout containers. No library components exist for these layout
	primitives; they are required for correct HTML semantics and responsive layout.
-->
<div class={layoutClasses} role="main" aria-label={ariaLabel} aria-busy={loading} {...props}>
	{#if header}
		<header
			class="dashboard-header border-base-300 bg-base-100 sticky top-0 z-40 min-w-0 shrink-0 border-b"
		>
			{@render header()}
		</header>
	{/if}

	<div class={contentWrapperClasses}>
		{#if hasSidebar}
			<aside class={sidebarAsideClasses} aria-label={sidebarAriaLabel}>
				{#if sidebar}
					{@render sidebar()}
				{:else if sidebarConfig}
					<Sidebar {...sidebarConfig} />
				{/if}
			</aside>
		{/if}

		<main
			class="dashboard-main bg-base-100 flex min-w-0 flex-1 flex-col overflow-auto {mainOrderClasses}"
			aria-label={mainAriaLabel}
		>
			{#if loading}
				<div class="flex flex-1 items-center justify-center p-8">
					<Spinner size="lg" variant="primary" ariaLabel={loadingLabel} />
				</div>
			{:else if error}
				<div class="p-4 lg:p-6">
					<Alert variant="error" title={errorMessage} withIcon={true} />
					{#if children}
						<div class="mt-4">
							{@render children()}
						</div>
					{/if}
				</div>
			{:else if children}
				{@render children()}
			{/if}
		</main>
	</div>

	{#if footer}
		<footer class="dashboard-footer border-base-300 bg-base-100 min-w-0 shrink-0 border-t">
			{@render footer()}
		</footer>
	{/if}
</div>
