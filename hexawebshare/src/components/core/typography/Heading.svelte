<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Heading component
	 */
	interface Props {
		/**
		 * Heading content (text or snippet)
		 */
		children?: Snippet;
		/**
		 * Heading text (alternative to children snippet)
		 */
		text?: string;
		/**
		 * Element ID
		 */
		id?: string;
		/**
		 * HTML heading level (h1, h2, h3, h4, h5, h6)
		 * @default 'h2'
		 */
		level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		/**
		 * Visual size of the heading (independent of semantic level)
		 * @default undefined (uses level's default size)
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
		/**
		 * Color variant of the heading
		 * @default undefined (uses default text color)
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
		 * Font weight
		 * @default undefined (uses default heading weight)
		 */
		weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
		/**
		 * Text alignment
		 * @default 'left'
		 */
		align?: 'left' | 'center' | 'right' | 'justify';
		/**
		 * Text transform
		 * @default undefined
		 */
		transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
		/**
		 * Whether the heading is truncated with ellipsis
		 * @default false
		 */
		truncate?: boolean;
		/**
		 * Number of lines to show before truncating (requires line-clamp support)
		 * @default undefined
		 */
		lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
		/**
		 * Whether the heading is in loading state (shows skeleton)
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the heading is disabled (reduced opacity)
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether to add gradient text effect
		 * @default false
		 */
		gradient?: boolean;
		/**
		 * Gradient color combination (requires gradient=true)
		 * @default 'primary'
		 */
		gradientFrom?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Gradient color combination (requires gradient=true)
		 * @default 'secondary'
		 */
		gradientTo?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Letter spacing
		 * @default undefined
		 */
		tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
		/**
		 * Whether to add leading/margin below heading
		 * @default false
		 */
		withMargin?: boolean;
		/**
		 * Accessible label for screen readers (if different from visible text)
		 */
		ariaLabel?: string;
		/**
		 * ARIA level attribute (for custom heading levels)
		 */
		ariaLevel?: number;
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
		text,
		level = 'h2',
		size,
		variant,
		weight,
		align = 'left',
		transform,
		truncate = false,
		lineClamp,
		loading = false,
		disabled = false,
		gradient = false,
		gradientFrom = 'primary',
		gradientTo = 'secondary',
		tracking,
		withMargin = false,
		ariaLabel,
		ariaLevel,
		class: className = '',
		onclick,
		...props
	}: Props = $props();

	// Size classes - using static Tailwind classes
	let sizeClasses = $derived(
		size === 'xs'
			? 'text-xs'
			: size === 'sm'
				? 'text-sm'
				: size === 'md'
					? 'text-base'
					: size === 'lg'
						? 'text-lg'
						: size === 'xl'
							? 'text-xl'
							: size === '2xl'
								? 'text-2xl'
								: size === '3xl'
									? 'text-3xl'
									: size === '4xl'
										? 'text-4xl'
										: // Default sizes based on heading level if no size specified
											level === 'h1'
											? 'text-4xl'
											: level === 'h2'
												? 'text-3xl'
												: level === 'h3'
													? 'text-2xl'
													: level === 'h4'
														? 'text-xl'
														: level === 'h5'
															? 'text-lg'
															: 'text-base'
	);

	// Weight classes
	let weightClasses = $derived(
		weight === 'light'
			? 'font-light'
			: weight === 'normal'
				? 'font-normal'
				: weight === 'medium'
					? 'font-medium'
					: weight === 'semibold'
						? 'font-semibold'
						: weight === 'bold'
							? 'font-bold'
							: weight === 'extrabold'
								? 'font-extrabold'
								: weight === 'black'
									? 'font-black'
									: 'font-bold' // default to bold for headings
	);

	// Alignment classes
	let alignClasses = $derived(
		align === 'center'
			? 'text-center'
			: align === 'right'
				? 'text-right'
				: align === 'justify'
					? 'text-justify'
					: 'text-left'
	);

	// Transform classes
	let transformClasses = $derived(
		transform === 'uppercase'
			? 'uppercase'
			: transform === 'lowercase'
				? 'lowercase'
				: transform === 'capitalize'
					? 'capitalize'
					: transform === 'normal-case'
						? 'normal-case'
						: ''
	);

	// Tracking/letter-spacing classes
	let trackingClasses = $derived(
		tracking === 'tighter'
			? 'tracking-tighter'
			: tracking === 'tight'
				? 'tracking-tight'
				: tracking === 'normal'
					? 'tracking-normal'
					: tracking === 'wide'
						? 'tracking-wide'
						: tracking === 'wider'
							? 'tracking-wider'
							: tracking === 'widest'
								? 'tracking-widest'
								: ''
	);

	// Variant/color classes
	let variantClasses = $derived(
		!gradient &&
			(variant === 'primary'
				? 'text-primary'
				: variant === 'secondary'
					? 'text-secondary'
					: variant === 'accent'
						? 'text-accent'
						: variant === 'neutral'
							? 'text-neutral'
							: variant === 'info'
								? 'text-info'
								: variant === 'success'
									? 'text-success'
									: variant === 'warning'
										? 'text-warning'
										: variant === 'error'
											? 'text-error'
											: '')
	);

	// Gradient classes
	let gradientClasses = $derived(
		gradient
			? [
					'bg-gradient-to-r bg-clip-text text-transparent',
					gradientFrom === 'primary' && 'from-primary',
					gradientFrom === 'secondary' && 'from-secondary',
					gradientFrom === 'accent' && 'from-accent',
					gradientFrom === 'info' && 'from-info',
					gradientFrom === 'success' && 'from-success',
					gradientFrom === 'warning' && 'from-warning',
					gradientFrom === 'error' && 'from-error',
					gradientTo === 'primary' && 'to-primary',
					gradientTo === 'secondary' && 'to-secondary',
					gradientTo === 'accent' && 'to-accent',
					gradientTo === 'info' && 'to-info',
					gradientTo === 'success' && 'to-success',
					gradientTo === 'warning' && 'to-warning',
					gradientTo === 'error' && 'to-error'
				]
					.filter(Boolean)
					.join(' ')
			: ''
	);

	// Truncate and line-clamp classes
	let truncateClasses = $derived(
		truncate
			? 'truncate'
			: lineClamp === 1
				? 'line-clamp-1'
				: lineClamp === 2
					? 'line-clamp-2'
					: lineClamp === 3
						? 'line-clamp-3'
						: lineClamp === 4
							? 'line-clamp-4'
							: lineClamp === 5
								? 'line-clamp-5'
								: lineClamp === 6
									? 'line-clamp-6'
									: ''
	);

	// Margin classes
	let marginClasses = $derived(
		withMargin
			? level === 'h1'
				? 'mb-6'
				: level === 'h2'
					? 'mb-5'
					: level === 'h3'
						? 'mb-4'
						: level === 'h4'
							? 'mb-3'
							: 'mb-2'
			: ''
	);

	// Combined heading classes
	let headingClasses = $derived(
		[
			sizeClasses,
			weightClasses,
			alignClasses,
			transformClasses,
			trackingClasses,
			variantClasses,
			gradientClasses,
			truncateClasses,
			marginClasses,
			loading && 'animate-pulse bg-base-300 text-transparent rounded',
			disabled && 'opacity-50 cursor-not-allowed',
			onclick && !disabled && !loading && 'cursor-pointer',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle click event
	function handleClick(event: MouseEvent) {
		if (!disabled && !loading && onclick) {
			onclick(event);
		}
	}
</script>

{#if level === 'h1'}
	<h1
		class={headingClasses}
		aria-label={ariaLabel}
		aria-level={ariaLevel}
		onclick={handleClick}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</h1>
{:else if level === 'h2'}
	<h2
		class={headingClasses}
		aria-label={ariaLabel}
		aria-level={ariaLevel}
		onclick={handleClick}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</h2>
{:else if level === 'h3'}
	<h3
		class={headingClasses}
		aria-label={ariaLabel}
		aria-level={ariaLevel}
		onclick={handleClick}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</h3>
{:else if level === 'h4'}
	<h4
		class={headingClasses}
		aria-label={ariaLabel}
		aria-level={ariaLevel}
		onclick={handleClick}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</h4>
{:else if level === 'h5'}
	<h5
		class={headingClasses}
		aria-label={ariaLabel}
		aria-level={ariaLevel}
		onclick={handleClick}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</h5>
{:else if level === 'h6'}
	<h6
		class={headingClasses}
		aria-label={ariaLabel}
		aria-level={ariaLevel}
		onclick={handleClick}
		{...props}
	>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</h6>
{/if}
