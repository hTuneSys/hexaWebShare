<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the EmptyState component
	 */
	interface Props {
		/**
		 * Main heading text displayed prominently
		 */
		title?: string;
		/**
		 * Supporting description text below the title
		 */
		description?: string;
		/**
		 * Custom icon snippet rendered above the title
		 */
		icon?: Snippet;
		/**
		 * Custom content snippet rendered below the description
		 */
		children?: Snippet;
		/**
		 * Action buttons or links snippet
		 */
		actions?: Snippet;
		/**
		 * Visual variant affecting icon and accent colors
		 * @default 'neutral'
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
		 * Size preset affecting spacing and typography
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the component is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the component is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Add a bordered card-like appearance
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Add a subtle background color
		 * @default false
		 */
		filled?: boolean;
		/**
		 * Make the container full width
		 * @default true
		 */
		fullWidth?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		title,
		description,
		icon,
		children,
		actions,
		variant = 'neutral',
		size = 'md',
		loading = false,
		disabled = false,
		bordered = false,
		filled = false,
		fullWidth = true,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique IDs for accessibility
	const baseId = crypto.randomUUID?.() ?? `empty-state-${Math.random().toString(36).slice(2, 9)}`;
	const titleId = `${baseId}-title`;
	const descriptionId = `${baseId}-description`;

	// Determine if we have labelling elements
	const hasTitle = $derived(!!title);
	const hasDescription = $derived(!!description);

	// Container classes using static DaisyUI classes
	let containerClasses = $derived(
		[
			'flex',
			'flex-col',
			'items-center',
			'justify-center',
			'text-center',
			fullWidth ? 'w-full' : 'w-fit',
			// Size-based padding
			size === 'sm' && 'px-4 py-6',
			size === 'md' && 'px-6 py-10',
			size === 'lg' && 'px-8 py-14',
			// Bordered style
			bordered && 'border border-base-300 rounded-xl',
			// Filled background
			filled && 'bg-base-200',
			filled && bordered && 'bg-base-200',
			// Disabled state
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Icon container classes
	let iconContainerClasses = $derived(
		[
			'flex',
			'items-center',
			'justify-center',
			'rounded-full',
			// Size-based icon container sizing
			size === 'sm' && 'h-12 w-12',
			size === 'md' && 'h-16 w-16',
			size === 'lg' && 'h-20 w-20',
			// Variant-based background colors
			variant === 'primary' && 'bg-primary/10',
			variant === 'secondary' && 'bg-secondary/10',
			variant === 'accent' && 'bg-accent/10',
			variant === 'neutral' && 'bg-base-300',
			variant === 'info' && 'bg-info/10',
			variant === 'success' && 'bg-success/10',
			variant === 'warning' && 'bg-warning/10',
			variant === 'error' && 'bg-error/10',
			// Size-based margin
			size === 'sm' && 'mb-3',
			size === 'md' && 'mb-4',
			size === 'lg' && 'mb-6'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Default icon classes (when no custom icon provided)
	let defaultIconClasses = $derived(
		[
			// Size-based icon sizing
			size === 'sm' && 'h-6 w-6',
			size === 'md' && 'h-8 w-8',
			size === 'lg' && 'h-10 w-10',
			// Variant-based icon colors
			variant === 'primary' && 'text-primary',
			variant === 'secondary' && 'text-secondary',
			variant === 'accent' && 'text-accent',
			variant === 'neutral' && 'text-base-content/60',
			variant === 'info' && 'text-info',
			variant === 'success' && 'text-success',
			variant === 'warning' && 'text-warning',
			variant === 'error' && 'text-error'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Title classes
	let titleClasses = $derived(
		[
			'font-semibold',
			'text-base-content',
			// Size-based typography
			size === 'sm' && 'text-base',
			size === 'md' && 'text-lg',
			size === 'lg' && 'text-xl',
			// Size-based margin
			hasDescription && size === 'sm' && 'mb-1',
			hasDescription && size === 'md' && 'mb-2',
			hasDescription && size === 'lg' && 'mb-3'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Description classes
	let descriptionClasses = $derived(
		[
			'text-base-content/70',
			'max-w-md',
			// Size-based typography
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Actions container classes
	let actionsClasses = $derived(
		[
			'flex',
			'flex-wrap',
			'items-center',
			'justify-center',
			'gap-3',
			// Size-based margin
			size === 'sm' && 'mt-4',
			size === 'md' && 'mt-6',
			size === 'lg' && 'mt-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Loading spinner size class
	let spinnerSizeClass = $derived(
		size === 'sm' ? 'loading-md' : size === 'md' ? 'loading-lg' : 'loading-lg'
	);
</script>

<div
	class={containerClasses}
	role="status"
	aria-label={ariaLabel}
	aria-labelledby={hasTitle ? titleId : undefined}
	aria-describedby={hasDescription ? descriptionId : undefined}
	aria-busy={loading}
	{...props}
>
	{#if loading}
		<!-- Loading State -->
		<div class="flex flex-col items-center justify-center gap-4">
			<span class="loading loading-spinner {spinnerSizeClass} text-primary" aria-hidden="true"
			></span>
			<p class="text-base-content/70 text-sm">Loading...</p>
		</div>
	{:else}
		<!-- Icon -->
		{#if icon}
			<div class={iconContainerClasses} aria-hidden="true">
				{@render icon()}
			</div>
		{:else}
			<!-- Default empty state icon -->
			<div class={iconContainerClasses} aria-hidden="true">
				<svg
					class={defaultIconClasses}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
					></path>
				</svg>
			</div>
		{/if}

		<!-- Title -->
		{#if title}
			<h3 id={titleId} class={titleClasses}>
				{title}
			</h3>
		{/if}

		<!-- Description -->
		{#if description}
			<p id={descriptionId} class={descriptionClasses}>
				{description}
			</p>
		{/if}

		<!-- Custom content slot -->
		{#if children}
			<div class="mt-4">
				{@render children()}
			</div>
		{/if}

		<!-- Actions -->
		{#if actions}
			<div class={actionsClasses}>
				{@render actions()}
			</div>
		{/if}
	{/if}
</div>
