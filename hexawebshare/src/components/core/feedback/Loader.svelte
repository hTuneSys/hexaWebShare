<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	type LoaderType = 'spinner' | 'dots' | 'ring' | 'bars' | 'ball';
	type LoaderSize = 'xs' | 'sm' | 'md' | 'lg';
	type LoaderStatus = 'loading' | 'success' | 'warning' | 'error';
	type LoaderVariant =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';

	interface Props {
		/** Current status of the loader */
		status?: LoaderStatus;
		/** Main label shown next to the indicator */
		label?: string;
		/** Optional descriptive text below the label */
		description?: string;
		/** Visual style of the indicator */
		variant?: LoaderVariant;
		/** Loader animation style */
		type?: LoaderType;
		/** Size of the loader indicator */
		size?: LoaderSize;
		/** Make the loader stretch and center within its container */
		fullWidth?: boolean;
		/** Add a subtle backdrop container */
		showBackdrop?: boolean;
		/** Disable interactions and dim the loader */
		disabled?: boolean;
		/** ARIA live setting */
		ariaLive?: 'polite' | 'assertive';
		/** Custom ARIA label */
		ariaLabel?: string;
		/** Additional classes for the wrapper */
		class?: string;
	}

	const {
		status = 'loading',
		label: providedLabel,
		description,
		variant: providedVariant,
		type = 'spinner',
		size = 'md',
		fullWidth = false,
		showBackdrop = false,
		disabled = false,
		ariaLive,
		ariaLabel,
		class: className = '',
		...props
	}: Props = $props();

	const statusVariantMap: Record<LoaderStatus, LoaderVariant> = {
		loading: 'info',
		success: 'success',
		warning: 'warning',
		error: 'error'
	};

	const statusLabelMap: Record<LoaderStatus, string> = {
		loading: 'Loading',
		success: 'Completed',
		warning: 'Please wait',
		error: 'Error'
	};

	let labelText = $derived(providedLabel ?? statusLabelMap[status]);
	let liveSetting = $derived(ariaLive ?? (status === 'error' ? 'assertive' : 'polite'));
	let role = $derived(status === 'error' ? 'alert' : 'status');
	let resolvedVariant = $derived(providedVariant ?? statusVariantMap[status]);

	let indicatorClasses = $derived(
		[
			'loading',
			type === 'spinner' && 'loading-spinner',
			type === 'dots' && 'loading-dots',
			type === 'ring' && 'loading-ring',
			type === 'bars' && 'loading-bars',
			type === 'ball' && 'loading-ball',
			size === 'xs' && 'loading-xs',
			size === 'sm' && 'loading-sm',
			size === 'md' && 'loading-md',
			size === 'lg' && 'loading-lg',
			resolvedVariant === 'primary' && 'text-primary',
			resolvedVariant === 'secondary' && 'text-secondary',
			resolvedVariant === 'accent' && 'text-accent',
			resolvedVariant === 'neutral' && 'text-neutral',
			resolvedVariant === 'info' && 'text-info',
			resolvedVariant === 'success' && 'text-success',
			resolvedVariant === 'warning' && 'text-warning',
			resolvedVariant === 'error' && 'text-error'
		]
			.filter(Boolean)
			.join(' ')
	);

	let containerClasses = $derived(
		[
			'flex',
			'items-center',
			'gap-3',
			showBackdrop && 'rounded-box bg-base-200/70 p-4',
			fullWidth && 'w-full justify-center',
			disabled && 'opacity-60 cursor-not-allowed',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	class={containerClasses}
	{role}
	aria-live={liveSetting}
	aria-busy={status === 'loading'}
	aria-disabled={disabled}
	aria-label={ariaLabel ?? labelText}
	{...props}
>
	<span class={indicatorClasses} aria-hidden="true"></span>

	<div class="space-y-1">
		<p class="font-semibold leading-tight">{labelText}</p>
		{#if description}
			<p class="text-base-content/80 text-sm">{description}</p>
		{/if}
	</div>
</div>
