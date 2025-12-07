<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
<<<<<<< Updated upstream
	interface Props {
		value?: number; // Current progress value (0-100 or 0-max), required unless indeterminate
		max?: number; // Maximum value (default: 100)
=======
	/**
	 * Props interface for the ProgressBar component
	 */
	interface Props {
		/**
		 * Current progress value (0 to max)
		 * @default 0
		 */
		value?: number;
		/**
		 * Maximum value for the progress bar
		 * @default 100
		 */
		max?: number;
		/**
		 * Color variant of the progress bar
		 * @default 'primary'
		 */
>>>>>>> Stashed changes
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
<<<<<<< Updated upstream
		size?: 'xs' | 'sm' | 'md' | 'lg';
		showLabel?: boolean; // Show percentage label
		label?: string; // Custom label text
		indeterminate?: boolean; // Indeterminate progress animation
	}

	const {
		value,
=======
		/**
		 * Size of the progress bar
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Show percentage label
		 * @default false
		 */
		showLabel?: boolean;
		/**
		 * Accessible label for screen readers
		 * @default 'Progress'
		 */
		ariaLabel?: string;
		/**
		 * Disable the progress bar
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value = 0,
>>>>>>> Stashed changes
		max = 100,
		variant = 'primary',
		size = 'md',
		showLabel = false,
<<<<<<< Updated upstream
		label,
		indeterminate = false,
		...props
	}: Props = $props();

	// Use 0 as default value when not indeterminate and value is undefined
	let progressValue = $derived(indeterminate ? undefined : (value ?? 0));

	// Calculate percentage for display
	let percentage = $derived(
		indeterminate || progressValue === undefined
			? 0
			: Math.min(Math.max((progressValue / max) * 100, 0), 100)
	);
=======
		ariaLabel = 'Progress',
		disabled = false,
		class: className = '',
		...props
	}: Props = $props();

	// Calculate percentage
	let percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));
>>>>>>> Stashed changes

	// Progress bar classes
	let progressClasses = $derived(
		[
			'progress',
			variant === 'primary' && 'progress-primary',
			variant === 'secondary' && 'progress-secondary',
			variant === 'accent' && 'progress-accent',
			variant === 'neutral' && 'progress-neutral',
			variant === 'info' && 'progress-info',
			variant === 'success' && 'progress-success',
			variant === 'warning' && 'progress-warning',
			variant === 'error' && 'progress-error',
<<<<<<< Updated upstream
			size === 'xs' && 'h-1',
			size === 'sm' && 'h-2',
			size === 'md' && 'h-4',
			size === 'lg' && 'h-6'
=======
			size === 'sm' && 'h-1',
			size === 'md' && 'h-2',
			size === 'lg' && 'h-4',
			disabled && 'opacity-50',
			className
>>>>>>> Stashed changes
		]
			.filter(Boolean)
			.join(' ')
	);
<<<<<<< Updated upstream

	// Display label text
	let displayLabel = $derived(
		label || (showLabel && !indeterminate ? `${Math.round(percentage)}%` : '')
	);
</script>

<div class="w-full" {...props}>
	<progress
		class={progressClasses}
		value={progressValue}
		max={indeterminate ? undefined : max}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuenow={indeterminate ? undefined : progressValue}
	>
		{#if indeterminate}
			<!-- Indeterminate progress animation -->
		{/if}
	</progress>
	{#if displayLabel}
		<div class="mt-1 text-center text-xs text-base-content/70">{displayLabel}</div>
	{/if}
=======
</script>

<div class="w-full" role="progressbar" aria-label={ariaLabel} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} {...props}>
	<div class="flex items-center gap-2">
		<progress class={progressClasses} value={value} max={max}></progress>
		{#if showLabel}
			<span class="text-sm font-medium min-w-[3rem] text-right">{Math.round(percentage)}%</span>
		{/if}
	</div>
>>>>>>> Stashed changes
</div>
