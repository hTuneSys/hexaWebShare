<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the StatusDot component
	 * A small circular indicator used to display status visually
	 */
	interface Props {
		/**
		 * Color variant of the status dot
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
		 * Size of the status dot
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Whether the dot should have a pulsing animation
		 * Useful for indicating active/live status
		 * @default false
		 */
		pulse?: boolean;
		/**
		 * Whether the dot should have a ring/outline effect
		 * @default false
		 */
		ring?: boolean;
		/**
		 * Whether the status dot is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Accessible label for screen readers
		 * Required for non-decorative status dots
		 */
		ariaLabel?: string;
		/**
		 * Hide dot from screen readers (decorative dots)
		 * @default false
		 */
		ariaHidden?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		variant = 'neutral',
		size = 'md',
		pulse = false,
		ring = false,
		disabled = false,
		ariaLabel,
		ariaHidden = false,
		class: className = '',
		...props
	}: Props = $props();

	// Size classes for the dot (using static Tailwind classes)
	let sizeClasses = $derived(
		size === 'xs'
			? 'w-1.5 h-1.5'
			: size === 'sm'
				? 'w-2 h-2'
				: size === 'md'
					? 'w-3 h-3'
					: size === 'lg'
						? 'w-4 h-4'
						: 'w-5 h-5'
	);

	// Ring size classes (proportional to dot size)
	let ringSizeClasses = $derived(
		size === 'xs'
			? 'ring-1'
			: size === 'sm'
				? 'ring-1'
				: size === 'md'
					? 'ring-2'
					: size === 'lg'
						? 'ring-2'
						: 'ring-2'
	);

	// Background color classes using static DaisyUI classes
	let colorClasses = $derived(
		[
			variant === 'primary' && 'bg-primary',
			variant === 'secondary' && 'bg-secondary',
			variant === 'accent' && 'bg-accent',
			variant === 'neutral' && 'bg-neutral',
			variant === 'info' && 'bg-info',
			variant === 'success' && 'bg-success',
			variant === 'warning' && 'bg-warning',
			variant === 'error' && 'bg-error'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Ring color classes using static DaisyUI classes
	let ringColorClasses = $derived(
		[
			variant === 'primary' && 'ring-primary/30',
			variant === 'secondary' && 'ring-secondary/30',
			variant === 'accent' && 'ring-accent/30',
			variant === 'neutral' && 'ring-neutral/30',
			variant === 'info' && 'ring-info/30',
			variant === 'success' && 'ring-success/30',
			variant === 'warning' && 'ring-warning/30',
			variant === 'error' && 'ring-error/30'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Combined dot classes
	let dotClasses = $derived(
		[
			'inline-block',
			'rounded-full',
			'shrink-0',
			sizeClasses,
			colorClasses,
			ring && ringSizeClasses,
			ring && ringColorClasses,
			ring && 'ring-offset-1 ring-offset-base-100',
			disabled && 'opacity-50',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Accessibility: Determine if dot is decorative or semantic
	let isDecorative = $derived(ariaHidden || !ariaLabel);
</script>

{#if pulse}
	<span
		class="relative inline-flex shrink-0"
		role={isDecorative ? 'presentation' : 'status'}
		aria-label={isDecorative ? undefined : ariaLabel}
		aria-hidden={isDecorative}
		{...props}
	>
		<!-- Pulsing ring animation -->
		<span
			class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 {colorClasses}"
			aria-hidden="true"
		></span>
		<!-- Solid dot -->
		<span class={dotClasses} aria-hidden="true"></span>
	</span>
{:else}
	<span
		class={dotClasses}
		role={isDecorative ? 'presentation' : 'status'}
		aria-label={isDecorative ? undefined : ariaLabel}
		aria-hidden={isDecorative}
		{...props}
	></span>
{/if}
