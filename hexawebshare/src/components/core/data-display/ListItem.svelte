<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the ListItem component
	 */
	interface Props {
		/**
		 * Primary text content of the list item
		 */
		label: string;
		/**
		 * Secondary/description text displayed below the label
		 */
		description?: string;
		/**
		 * Color variant of the list item when active or focused
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
		 * Size of the list item
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the list item is currently active/selected
		 * @default false
		 */
		active?: boolean;
		/**
		 * Whether the list item is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the list item is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the list item shows hover effect
		 * @default true
		 */
		hoverable?: boolean;
		/**
		 * Whether the list item has a border at the bottom
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Click handler for the list item
		 */
		onclick?: (event: MouseEvent) => void;
		/**
		 * Keyboard handler for the list item
		 */
		onkeydown?: (event: KeyboardEvent) => void;
		/**
		 * URL to navigate to (makes the item a link)
		 */
		href?: string;
		/**
		 * Target for the link
		 */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Whether the item is currently selected (for aria-selected)
		 */
		selected?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Slot for leading content (icon, avatar, checkbox, etc.)
		 */
		leading?: Snippet;
		/**
		 * Slot for trailing content (badge, action buttons, etc.)
		 */
		trailing?: Snippet;
		/**
		 * Slot for custom content (replaces label and description)
		 */
		children?: Snippet;
	}

	const {
		label,
		description,
		variant = 'neutral',
		size = 'md',
		active = false,
		disabled = false,
		loading = false,
		hoverable = true,
		bordered = false,
		onclick,
		onkeydown,
		href,
		target,
		ariaLabel,
		selected,
		class: className = '',
		leading,
		trailing,
		children,
		...props
	}: Props = $props();

	// Base classes for the list item container
	let containerClasses = $derived(
		[
			'flex items-center gap-3 w-full transition-colors duration-200',
			// Size classes
			size === 'sm' && 'px-3 py-2 text-sm',
			size === 'md' && 'px-4 py-3 text-base',
			size === 'lg' && 'px-5 py-4 text-lg',
			// Hover effect
			hoverable && !disabled && 'hover:bg-base-200 cursor-pointer',
			// Active/selected state using static classes
			active && variant === 'primary' && 'bg-primary text-primary-content',
			active && variant === 'secondary' && 'bg-secondary text-secondary-content',
			active && variant === 'accent' && 'bg-accent text-accent-content',
			active && variant === 'neutral' && 'bg-neutral text-neutral-content',
			active && variant === 'info' && 'bg-info text-info-content',
			active && variant === 'success' && 'bg-success text-success-content',
			active && variant === 'warning' && 'bg-warning text-warning-content',
			active && variant === 'error' && 'bg-error text-error-content',
			// Disabled state
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			// Border
			bordered && 'border-b border-base-300',
			// Focus visible
			!disabled && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
			// Custom classes
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Text content classes
	let labelClasses = $derived(
		['font-medium truncate', loading && 'skeleton w-32 h-4', disabled && 'text-base-content/50']
			.filter(Boolean)
			.join(' ')
	);

	let descriptionClasses = $derived(
		[
			'text-sm truncate',
			active ? 'opacity-80' : 'text-base-content/70',
			loading && 'skeleton w-48 h-3 mt-1',
			disabled && 'text-base-content/40'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Loading spinner size based on item size
	let spinnerSizeClass = $derived(
		size === 'sm' ? 'loading-xs' : size === 'md' ? 'loading-sm' : 'loading-md'
	);

	// Determine if the item is interactive
	let isInteractive = $derived(!!onclick || !!href || !!onkeydown);

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (onclick) {
				onclick(event as unknown as MouseEvent);
			}
		}

		if (onkeydown) {
			onkeydown(event);
		}
	}

	// Handle click
	function handleClick(event: MouseEvent) {
		if (disabled) return;
		if (onclick) {
			onclick(event);
		}
	}
</script>

{#if href && !disabled}
	<!-- Link variant -->
	<a
		{href}
		{target}
		class={containerClasses}
		aria-label={ariaLabel || label}
		aria-disabled={disabled}
		aria-current={active ? 'true' : undefined}
		rel={target === '_blank' ? 'noopener noreferrer' : undefined}
		{...props}
	>
		{#if loading}
			<span class="loading loading-spinner {spinnerSizeClass}" aria-hidden="true"></span>
		{:else if leading}
			<span class="flex-shrink-0" aria-hidden="true">
				{@render leading()}
			</span>
		{/if}

		<span class="min-w-0 flex-1">
			{#if children}
				{@render children()}
			{:else}
				<span class={labelClasses}>{label}</span>
				{#if description}
					<span class={descriptionClasses}>{description}</span>
				{/if}
			{/if}
		</span>

		{#if trailing}
			<span class="flex-shrink-0" aria-hidden="true">
				{@render trailing()}
			</span>
		{/if}
	</a>
{:else}
	<!-- Button/div variant -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class={containerClasses}
		role={isInteractive ? 'button' : selected !== undefined ? 'option' : 'listitem'}
		tabindex={isInteractive && !disabled ? 0 : undefined}
		aria-label={ariaLabel || label}
		aria-disabled={disabled}
		aria-selected={selected}
		aria-current={active ? 'true' : undefined}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...props}
	>
		{#if loading}
			<span class="loading loading-spinner {spinnerSizeClass}" aria-hidden="true"></span>
		{:else if leading}
			<span class="flex-shrink-0" aria-hidden="true">
				{@render leading()}
			</span>
		{/if}

		<span class="flex min-w-0 flex-1 flex-col">
			{#if children}
				{@render children()}
			{:else}
				<span class={labelClasses}>{label}</span>
				{#if description}
					<span class={descriptionClasses}>{description}</span>
				{/if}
			{/if}
		</span>

		{#if trailing}
			<span class="flex-shrink-0">
				{@render trailing()}
			</span>
		{/if}
	</div>
{/if}
