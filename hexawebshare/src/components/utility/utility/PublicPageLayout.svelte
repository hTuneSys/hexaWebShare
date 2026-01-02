<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the PublicPageLayout component
	 * A layout component designed for public-facing pages (landing pages, marketing pages, etc.)
	 */
	interface Props {
		/**
		 * Navigation bar content snippet (logo, menu items, etc.)
		 */
		navbar?: Snippet;
		/**
		 * Header/hero section content snippet
		 */
		header?: Snippet;
		/**
		 * Main content snippet
		 */
		children?: Snippet;
		/**
		 * Footer content snippet
		 */
		footer?: Snippet;
		/**
		 * Visual variant of the layout
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'filled' | 'ghost' | 'gradient';
		/**
		 * Maximum width of the main content area
		 * @default '7xl'
		 */
		maxWidth?:
			| 'xs'
			| 'sm'
			| 'md'
			| 'lg'
			| 'xl'
			| '2xl'
			| '3xl'
			| '4xl'
			| '5xl'
			| '6xl'
			| '7xl'
			| 'full'
			| 'none';
		/**
		 * Padding size for the main content area
		 * @default 'lg'
		 */
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		/**
		 * Whether the content is centered
		 * @default true
		 */
		centered?: boolean;
		/**
		 * Whether the layout is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the layout is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether to show a background
		 * @default true
		 */
		background?: boolean;
		/**
		 * Whether the navbar is sticky
		 * @default true
		 */
		stickyNavbar?: boolean;
		/**
		 * Whether the footer is visible
		 * @default true
		 */
		showFooter?: boolean;
		/**
		 * Accessible label for the layout
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		navbar,
		header,
		children,
		footer,
		variant = 'default',
		maxWidth = '7xl',
		padding = 'lg',
		centered = true,
		loading = false,
		disabled = false,
		background = true,
		stickyNavbar = true,
		showFooter = true,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Main layout container classes
	let layoutClasses = $derived(
		[
			'public-page-layout',
			'w-full',
			'min-h-screen',
			'flex',
			'flex-col',
			// Variant-specific styling
			variant === 'default' && background && 'bg-base-100',
			variant === 'bordered' && background && 'bg-base-100',
			variant === 'bordered' && 'border-4 border-primary/30 m-2 rounded-xl',
			variant === 'filled' && background && 'bg-base-200',
			variant === 'ghost' && background && 'bg-base-200/30 backdrop-blur-sm',
			variant === 'gradient' && background && 'bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10',
			!background && variant !== 'bordered' && 'bg-transparent',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Navbar container classes
	let navbarClasses = $derived(
		[
			'public-page-navbar',
			'w-full',
			stickyNavbar && 'sticky top-0 z-50',
			// Variant-specific navbar styling
			variant === 'filled' && 'bg-base-300',
			variant === 'ghost' && 'bg-base-200/50 backdrop-blur-sm',
			variant === 'gradient' && 'bg-gradient-to-r from-primary/5 to-secondary/5',
			(variant === 'default' || variant === 'bordered' || !variant) && 'bg-base-100',
			'border-b border-base-300',
			'shadow-sm'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Header container classes
	let headerClasses = $derived(
		[
			'public-page-header',
			'w-full'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Main content container classes
	let contentClasses = $derived(
		[
			'public-page-content',
			'flex-1',
			'w-full',
			// Max width classes with responsive breakpoints
			maxWidth === 'xs' && 'max-w-xs',
			maxWidth === 'sm' && 'max-w-sm',
			maxWidth === 'md' && 'max-w-md',
			maxWidth === 'lg' && 'max-w-lg',
			maxWidth === 'xl' && 'max-w-xl',
			maxWidth === '2xl' && 'max-w-2xl',
			maxWidth === '3xl' && 'max-w-3xl',
			maxWidth === '4xl' && 'max-w-4xl',
			maxWidth === '5xl' && 'max-w-5xl',
			maxWidth === '6xl' && 'max-w-6xl',
			maxWidth === '7xl' && 'max-w-7xl',
			maxWidth === 'full' && 'max-w-full',
			maxWidth === 'none' && 'max-w-none',
			// Responsive max-width adjustments
			maxWidth !== 'full' && maxWidth !== 'none' && 'w-full',
			// Padding classes with responsive breakpoints
			padding === 'none' && '',
			padding === 'xs' && 'px-2 py-1 sm:px-4 sm:py-2',
			padding === 'sm' && 'px-4 py-2 sm:px-6 sm:py-4',
			padding === 'md' && 'px-6 py-4 sm:px-8 sm:py-6',
			padding === 'lg' && 'px-8 py-6 sm:px-10 sm:py-8',
			padding === 'xl' && 'px-10 py-8 sm:px-12 sm:py-10',
			padding === '2xl' && 'px-12 py-10 sm:px-16 sm:py-12',
			// Centering
			centered && 'mx-auto',
			// Responsive padding adjustments
			padding !== 'none' && 'sm:px-6 lg:px-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Footer container classes
	let footerClasses = $derived(
		[
			'public-page-footer',
			'w-full',
			// Variant-specific footer styling
			variant === 'filled' && 'bg-base-300',
			variant === 'ghost' && 'bg-base-200/50 backdrop-blur-sm',
			variant === 'gradient' && 'bg-gradient-to-r from-primary/5 to-secondary/5',
			(variant === 'default' || variant === 'bordered' || !variant) && 'bg-base-200',
			'border-t border-base-300',
			'mt-auto'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	class={layoutClasses}
	role="document"
	aria-label={ariaLabel || 'Public page layout'}
	aria-busy={loading}
	{...props}
>
	{#if navbar}
		<nav class={navbarClasses} role="navigation" aria-label="Main navigation">
			{@render navbar()}
		</nav>
	{/if}

	{#if header}
		<header class={headerClasses} role="banner">
			{@render header()}
		</header>
	{/if}

	{#if loading}
		<div class="flex min-h-[50vh] items-center justify-center">
			<span class="loading loading-spinner loading-lg text-primary"></span>
		</div>
	{:else if children}
		<main class={contentClasses} role="main">
			{@render children()}
		</main>
	{/if}

	{#if footer && showFooter}
		<footer class={footerClasses} role="contentinfo">
			{@render footer()}
		</footer>
	{/if}
</div>
