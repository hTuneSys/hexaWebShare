<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the StatusBadge component
	 */
	interface Props {
		/**
		 * Status label text
		 */
		label: string;
		/**
		 * Color variant of the status badge
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
		 * Size of the status badge
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Outline style badge
		 * @default false
		 */
		outline?: boolean;
		/**
		 * Whether the badge is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the badge is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Hide badge from screen readers (decorative badges)
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
		disabled = false,
		loading = false,
		ariaLabel,
		ariaHidden = false,
		class: className = '',
		...props
	}: Props = $props();

	// Badge classes using static DaisyUI classes
	let badgeClasses = $derived(
		[
			'badge',
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
			outline && 'badge-outline',
			disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if badge is decorative or semantic
	// Status badges are typically semantic, so default to false unless explicitly hidden
	let isDecorative = $derived(ariaHidden || (!ariaLabel && false));

	// Loading spinner size based on badge size
	let spinnerSizeClass = $derived(
		size === 'xs'
			? 'loading-xs'
			: size === 'sm'
				? 'loading-sm'
				: size === 'md'
					? 'loading-md'
					: 'loading-sm'
	);
</script>

<span
	class={badgeClasses}
	aria-label={ariaLabel || (isDecorative ? undefined : label)}
	aria-hidden={isDecorative}
	aria-disabled={disabled}
	aria-busy={loading}
	role={isDecorative ? undefined : 'status'}
	{...props}
>
	{#if loading}
		<span class="loading loading-spinner {spinnerSizeClass} mr-1" aria-hidden="true"></span>
	{/if}
	{label}
</span>
