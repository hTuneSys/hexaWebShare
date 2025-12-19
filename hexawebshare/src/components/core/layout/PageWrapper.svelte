<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the PageWrapper component
	 * A page wrapper provides consistent layout structure for full-page content
	 */
	interface Props {
		/**
		 * Header content snippet (title, breadcrumbs, actions, etc.)
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
		 * Visual variant of the page wrapper
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'filled' | 'ghost';
		/**
		 * Maximum width of the page content
		 * @default 'full'
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
		 * Padding size for the page content
		 * @default 'md'
		 */
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		/**
		 * Whether the content is centered
		 * @default false
		 */
		centered?: boolean;
		/**
		 * Whether the page is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the page is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether to show a background
		 * @default true
		 */
		background?: boolean;
		/**
		 * Minimum height of the page
		 * @default 'screen'
		 */
		minHeight?: 'none' | 'screen' | 'auto';
		/**
		 * Accessible label for the page wrapper
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		header,
		children,
		footer,
		variant = 'default',
		maxWidth = 'full',
		padding = 'md',
		centered = false,
		loading = false,
		disabled = false,
		background = true,
		minHeight = 'screen',
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Page wrapper container classes
	let pageClasses = $derived(
		[
			'page-wrapper',
			'w-full',
			minHeight === 'screen' && 'min-h-screen',
			minHeight === 'auto' && 'min-h-0',
			// Background classes
			background && variant === 'default' && 'bg-base-100',
			background && variant === 'bordered' && 'bg-base-100 border border-base-300',
			background && variant === 'filled' && 'bg-base-200',
			background && variant === 'ghost' && 'bg-base-200/50',
			!background && 'bg-transparent',
			disabled && 'opacity-50 pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Content container classes
	let contentClasses = $derived(
		[
			'page-content',
			// Max width classes
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
			// Padding classes
			padding === 'none' && '',
			padding === 'xs' && 'px-2 py-1',
			padding === 'sm' && 'px-4 py-2',
			padding === 'md' && 'px-6 py-4',
			padding === 'lg' && 'px-8 py-6',
			padding === 'xl' && 'px-10 py-8',
			padding === '2xl' && 'px-12 py-10',
			// Centering
			centered && 'mx-auto',
			// Responsive padding
			padding !== 'none' && 'sm:px-6 lg:px-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Header wrapper classes
	let headerClasses = $derived(
		[
			'page-header',
			'w-full',
			padding !== 'none' && 'px-6 py-4',
			padding !== 'none' && 'sm:px-6 lg:px-8',
			header && 'border-b border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Footer wrapper classes
	let footerClasses = $derived(
		[
			'page-footer',
			'w-full',
			padding !== 'none' && 'px-6 py-4',
			padding !== 'none' && 'sm:px-6 lg:px-8',
			footer && 'border-t border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	class={pageClasses}
	role="main"
	aria-label={ariaLabel || 'Page wrapper'}
	aria-busy={loading}
	{...props}
>
	{#if header}
		<header class={headerClasses}>
			{@render header()}
		</header>
	{/if}

	{#if loading}
		<div class="flex min-h-[50vh] items-center justify-center">
			<span class="loading loading-spinner loading-lg text-primary"></span>
		</div>
	{:else if children}
		<main class={contentClasses}>
			{@render children()}
		</main>
	{/if}

	{#if footer}
		<footer class={footerClasses}>
			{@render footer()}
		</footer>
	{/if}
</div>
