<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props interface for the Tag component
	 */
	interface Props {
		/**
		 * Tag label text
		 */
		label: string;
		/**
		 * Color variant of the tag
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
			| 'error'
			| 'ghost';
		/**
		 * Size of the tag
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Outline style tag
		 * @default false
		 */
		outline?: boolean;
		/**
		 * Soft/muted background style
		 * @default false
		 */
		soft?: boolean;
		/**
		 * Dash/dashed border style
		 * @default false
		 */
		dash?: boolean;
		/**
		 * Whether the tag is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the tag is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Show remove button (×) on the tag
		 * @default false
		 */
		removable?: boolean;
		/**
		 * Callback when remove button is clicked
		 */
		onRemove?: () => void;
		/**
		 * Make the tag clickable
		 * @default false
		 */
		clickable?: boolean;
		/**
		 * Callback when tag is clicked (only works if clickable is true)
		 */
		onclick?: () => void;
		/**
		 * Icon snippet to display before the label
		 */
		icon?: Snippet;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Hide tag from screen readers (decorative tags)
		 * @default false
		 */
		ariaHidden?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		label,
		variant = 'neutral',
		size = 'md',
		outline = false,
		soft = false,
		dash = false,
		disabled = false,
		loading = false,
		removable = false,
		onRemove,
		clickable = false,
		onclick,
		icon,
		ariaLabel,
		ariaHidden = false,
		class: className = '',
		...props
	}: Props = $props();

	// Internal visibility state for self-removing
	let isVisible = $state(true);

	// Tag classes using static DaisyUI classes
	let tagClasses = $derived(
		[
			'badge',
			'inline-flex',
			'items-center',
			'gap-1',
			variant === 'primary' && 'badge-primary',
			variant === 'secondary' && 'badge-secondary',
			variant === 'accent' && 'badge-accent',
			variant === 'neutral' && 'badge-neutral',
			variant === 'info' && 'badge-info',
			variant === 'success' && 'badge-success',
			variant === 'warning' && 'badge-warning',
			variant === 'error' && 'badge-error',
			variant === 'ghost' && 'badge-ghost',
			size === 'xs' && 'badge-xs',
			size === 'sm' && 'badge-sm',
			size === 'md' && 'badge-md',
			size === 'lg' && 'badge-lg',
			size === 'xl' && 'badge-xl',
			outline && 'badge-outline',
			soft && 'badge-soft',
			dash && 'badge-dash',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			clickable && !disabled && 'cursor-pointer hover:opacity-80 transition-opacity',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if tag is decorative or semantic
	let isDecorative = $derived(ariaHidden || (!ariaLabel && true));

	// Loading spinner size based on tag size
	let spinnerSizeClass = $derived(
		size === 'xs'
			? 'loading-xs'
			: size === 'sm'
				? 'loading-sm'
				: size === 'md'
					? 'loading-sm'
					: size === 'lg'
						? 'loading-md'
						: 'loading-md'
	);

	// Close button size based on tag size
	let closeBtnSizeClass = $derived(
		size === 'xs'
			? 'text-xs'
			: size === 'sm'
				? 'text-xs'
				: size === 'md'
					? 'text-sm'
					: size === 'lg'
						? 'text-base'
						: 'text-lg'
	);

	// Handle tag click
	function handleClick() {
		if (clickable && !disabled) {
			if (onclick) onclick();
		}
	}

	// Handle remove button click - hides the tag
	function handleRemove(event: MouseEvent) {
		event.stopPropagation();
		if (!disabled) {
			isVisible = false;
			if (onRemove) onRemove();
		}
	}

	// Handle keyboard navigation
	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;

		if (clickable && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			if (onclick) onclick();
		}
	}
</script>

{#if isVisible}
	<span
		class={tagClasses}
		aria-label={ariaLabel}
		aria-hidden={isDecorative}
		aria-disabled={disabled}
		aria-busy={loading}
		role={clickable ? 'button' : isDecorative ? undefined : 'status'}
		tabindex={clickable && !disabled ? 0 : undefined}
		onclick={handleClick}
		onkeydown={handleKeyDown}
		{...props}
	>
		{#if loading}
			<span class="loading loading-spinner {spinnerSizeClass}" aria-hidden="true"></span>
		{/if}
		{#if icon}
			<span class="inline-flex items-center" aria-hidden="true">
				{@render icon()}
			</span>
		{/if}
		{label}
		{#if removable}
			<button
				type="button"
				class="-mr-1 ml-1 inline-flex items-center justify-center rounded-full p-0.5 opacity-70 transition-all hover:bg-current/20 hover:opacity-100 focus:outline-none {closeBtnSizeClass}"
				onclick={handleRemove}
				aria-label="Remove tag"
				{disabled}
			>
				✕
			</button>
		{/if}
	</span>
{/if}
