<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		value: number; // Current progress value (0-100 or 0-max)
		max?: number; // Maximum value (default: 100)
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		showLabel?: boolean; // Show percentage label
		label?: string; // Custom label text
		indeterminate?: boolean; // Indeterminate progress animation
	}

	const {
		value,
		max = 100,
		variant = 'primary',
		size = 'md',
		showLabel = false,
		label,
		indeterminate = false,
		...props
	}: Props = $props();

	// Calculate percentage for display
	let percentage = $derived(indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100));

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
			size === 'xs' && 'h-1',
			size === 'sm' && 'h-2',
			size === 'md' && 'h-4',
			size === 'lg' && 'h-6'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Display label text
	let displayLabel = $derived(
		label || (showLabel && !indeterminate ? `${Math.round(percentage)}%` : '')
	);
</script>

<div class="w-full" {...props}>
	<progress
		class={progressClasses}
		value={indeterminate ? undefined : value}
		max={indeterminate ? undefined : max}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuenow={indeterminate ? undefined : value}
	>
		{#if indeterminate}
			<!-- Indeterminate progress animation -->
		{/if}
	</progress>
	{#if displayLabel}
		<div class="mt-1 text-center text-xs text-base-content/70">{displayLabel}</div>
	{/if}
</div>
