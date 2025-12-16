<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Card component
	 */
	interface Props {
		/**
		 * Card content (using Svelte 5 snippets)
		 */
		children?: Snippet;
		/**
		 * Card title text
		 */
		title?: string;
		/**
		 * Optional card actions snippet (buttons, links, etc.)
		 */
		actions?: Snippet;
		/**
		 * Optional card figure/image snippet (placed at top or side)
		 */
		figure?: Snippet;
		/**
		 * Color variant of the card
		 * @default undefined (default card style)
		 */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/**
		 * Add border to the card
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Compact card with reduced padding
		 * @default false
		 */
		compact?: boolean;
		/**
		 * Add shadow to the card
		 * @default true
		 */
		shadow?: boolean;
		/**
		 * Shadow size
		 * @default 'md'
		 */
		shadowSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		/**
		 * Side layout (figure on side instead of top)
		 * @default false
		 */
		side?: boolean;
		/**
		 * Make card glass/transparent effect
		 * @default false
		 */
		glass?: boolean;
		/**
		 * Hoverable card with hover effects
		 * @default false
		 */
		hoverable?: boolean;
		/**
		 * Center card body content
		 * @default false
		 */
		centered?: boolean;
		/**
		 * Full image background
		 * @default false
		 */
		imageOverlay?: boolean;
		/**
		 * Whether the card is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the card is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA role for the card
		 * @default 'article'
		 */
		role?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Click event handler
		 */
		onclick?: (event: MouseEvent) => void;
	}

	const {
		children,
		title,
		actions,
		figure,
		variant,
		bordered = false,
		compact = false,
		shadow = true,
		shadowSize = 'md',
		side = false,
		glass = false,
		hoverable = false,
		centered = false,
		imageOverlay = false,
		loading = false,
		disabled = false,
		ariaLabel,
		role = 'article',
		class: className = '',
		onclick,
		...props
	}: Props = $props();

	// Card classes using static DaisyUI classes
	let cardClasses = $derived(
		[
			'card',
			variant === 'primary' && 'bg-primary text-primary-content',
			variant === 'secondary' && 'bg-secondary text-secondary-content',
			variant === 'accent' && 'bg-accent text-accent-content',
			variant === 'neutral' && 'bg-neutral text-neutral-content',
			variant === 'info' && 'bg-info text-info-content',
			variant === 'success' && 'bg-success text-success-content',
			variant === 'warning' && 'bg-warning text-warning-content',
			variant === 'error' && 'bg-error text-error-content',
			!variant && 'bg-base-100',
			bordered && 'card-bordered',
			compact && 'card-compact',
			side && 'card-side',
			glass && 'glass',
			shadow && shadowSize === 'sm' && 'shadow-sm',
			shadow && shadowSize === 'md' && 'shadow-md',
			shadow && shadowSize === 'lg' && 'shadow-lg',
			shadow && shadowSize === 'xl' && 'shadow-xl',
			shadow && shadowSize === '2xl' && 'shadow-2xl',
			hoverable && 'hover:shadow-xl transition-shadow duration-300',
			imageOverlay && 'image-full',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			onclick && 'cursor-pointer',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Card body classes
	let bodyClasses = $derived(
		['card-body', centered && 'items-center text-center'].filter(Boolean).join(' ')
	);

	// Handle card click
	function handleClick(event: MouseEvent) {
		if (!disabled && !loading && onclick) {
			onclick(event);
		}
	}
</script>

<div
	class={cardClasses}
	{role}
	aria-label={ariaLabel}
	aria-disabled={disabled}
	aria-busy={loading}
	onclick={handleClick}
	{...props}
>
	{#if loading}
		<div class="card-body items-center justify-center">
			<span class="loading loading-spinner loading-lg"></span>
			<p class="text-sm opacity-70">Loading...</p>
		</div>
	{:else}
		{#if figure}
			<figure>
				{@render figure()}
			</figure>
		{/if}

		<div class={bodyClasses}>
			{#if title}
				<h2 class="card-title">{title}</h2>
			{/if}

			{#if children}
				{@render children()}
			{/if}

			{#if actions}
				<div class="card-actions justify-end">
					{@render actions()}
				</div>
			{/if}
		</div>
	{/if}
</div>
