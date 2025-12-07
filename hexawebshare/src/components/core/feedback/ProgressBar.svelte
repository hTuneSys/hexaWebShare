<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
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
		max = 100,
		variant = 'primary',
		size = 'md',
		showLabel = false,
		ariaLabel = 'Progress',
		disabled = false,
		class: className = '',
		...props
	}: Props = $props();

	// Calculate percentage
	let percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));

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
			size === 'sm' && 'h-1',
			size === 'md' && 'h-2',
			size === 'lg' && 'h-4',
			disabled && 'opacity-50',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class="w-full" role="progressbar" aria-label={ariaLabel} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} {...props}>
	<div class="flex items-center gap-2">
		<progress class={progressClasses} value={value} max={max}></progress>
		{#if showLabel}
			<span class="text-sm font-medium min-w-[3rem] text-right">{Math.round(percentage)}%</span>
		{/if}
	</div>
</div>
