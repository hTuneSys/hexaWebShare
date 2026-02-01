<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Text from '../typography/Text.svelte';

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
		/** Text label for loading status @default 'Loading' */
		loadingLabel?: string;
		/** Text label for success status @default 'Completed' */
		successLabel?: string;
		/** Text label for warning status @default 'Please wait' */
		warningLabel?: string;
		/** Text label for error status @default 'Error' */
		errorLabel?: string;
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
		loadingLabel = 'Loading',
		successLabel = 'Completed',
		warningLabel = 'Please wait',
		errorLabel = 'Error',
		class: className = '',
		...props
	}: Props = $props();

	const statusVariantMap: Record<LoaderStatus, LoaderVariant> = {
		loading: 'info',
		success: 'success',
		warning: 'warning',
		error: 'error'
	};

	let statusLabelMap = $derived({
		loading: loadingLabel,
		success: successLabel,
		warning: warningLabel,
		error: errorLabel
	});

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

	// Map loader size to text size
	type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
	const sizeToTextSizeMap: Record<LoaderSize, TextSize> = {
		xs: 'xs',
		sm: 'sm',
		md: 'base',
		lg: 'lg'
	};

	const descriptionSizeMap: Record<LoaderSize, TextSize> = {
		xs: 'xs',
		sm: 'xs',
		md: 'sm',
		lg: 'base'
	};

	let labelTextSize = $derived(sizeToTextSizeMap[size]);
	let descriptionTextSize = $derived(descriptionSizeMap[size]);

	let textColorClasses = $derived(
		[
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
	<!-- 
		NOTE: Raw HTML span element used for structural decoration.
		This is a DaisyUI loading indicator (aria-hidden), purely visual with no text content.
	-->
	<span class={indicatorClasses} aria-hidden="true"></span>

	<!-- 
		NOTE: Raw HTML div element used for structural layout.
		This container groups label and description text (no semantic meaning).
	-->
	<div class="space-y-1">
		<Text text={labelText} size={labelTextSize} weight="semibold" class={`leading-tight ${textColorClasses}`} />
		{#if description}
			<Text text={description} size={descriptionTextSize} class={`${textColorClasses} opacity-80`} />
		{/if}
	</div>
</div>
