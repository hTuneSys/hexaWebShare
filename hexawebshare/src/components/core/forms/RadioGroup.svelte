<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Option type for radio options
	 */
	export type RadioOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	/**
	 * Props interface for the RadioGroup component
	 */
	interface Props {
		/**
		 * Selected value (controlled)
		 */
		value?: string;
		/**
		 * Options array - can be array of strings or array of RadioOption objects
		 */
		options: string[] | RadioOption[];
		/**
		 * Color variant of the radio buttons
		 * @default undefined (default DaisyUI radio style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the radio buttons
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * HTML name attribute for form submission (required for radio groups)
		 */
		name: string;
		/**
		 * Label text for the radio group
		 */
		label?: string;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Whether the radio group is disabled
		 * @default false
		 */
		disabled?: boolean;
	/**
	 * Whether the radio group is required
	 * @default false
	 */
	required?: boolean;
	/**
	 * Whether the radio group is in loading state
	 * @default false
	 */
	loading?: boolean;
	/**
	 * HTML id attribute
	 */
	id?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		options,
		variant,
		size = 'md',
		name,
		label,
		error,
		helpText,
		disabled = false,
		required = false,
		loading = false,
		id,
		ariaLabel,
		ariaDescribedby,
		onchange,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let groupId = $derived(id || `radio-group-${Math.random().toString(36).substr(2, 9)}`);
	let labelId = $derived(`${groupId}-label`);
	let errorId = $derived(`${groupId}-error`);
	let helpTextId = $derived(`${groupId}-help`);

	// Normalize options to RadioOption format
	let normalizedOptions = $derived(
		options.map((option) => {
			if (typeof option === 'string') {
				return { value: option, label: option, disabled: false };
			}
			return option;
		})
	);

	// Check if there's an error
	let hasError = $derived(error !== undefined && error !== '');

	// Radio classes using static DaisyUI classes for JIT compilation
	// Apply error variant automatically when there's an error
	let radioClasses = $derived(
		[
			'radio',
			// Error state overrides variant
			hasError && 'radio-error',
			!hasError && variant === 'primary' && 'radio-primary',
			!hasError && variant === 'secondary' && 'radio-secondary',
			!hasError && variant === 'accent' && 'radio-accent',
			!hasError && variant === 'info' && 'radio-info',
			!hasError && variant === 'success' && 'radio-success',
			!hasError && variant === 'warning' && 'radio-warning',
			!hasError && variant === 'error' && 'radio-error',
			size === 'xs' && 'radio-xs',
			size === 'sm' && 'radio-sm',
			size === 'md' && 'radio-md',
			size === 'lg' && 'radio-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Determine describedby for accessibility
	let describedBy = $derived(
		[ariaDescribedby, error && errorId, helpText && !error && helpTextId]
			.filter(Boolean)
			.join(' ') || undefined
	);

	// Loading spinner size classes
	let loadingSizeClass = $derived(
		size === 'xs'
			? 'loading-xs'
			: size === 'sm'
				? 'loading-sm'
				: size === 'lg'
					? 'loading-lg'
					: 'loading-md'
	);

	// Check if radio group should be disabled (either disabled prop or loading)
	let isDisabled = $derived(disabled || loading);
</script>

<div class="form-control w-full {className}">
	{#if label}
		<label id={labelId} class="label">
			<span class="label-text">
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<div
		role="radiogroup"
		aria-labelledby={label ? labelId : undefined}
		aria-label={!label ? ariaLabel : undefined}
		aria-describedby={describedBy}
		aria-required={required}
		aria-invalid={hasError ? 'true' : undefined}
		aria-busy={loading}
		class="relative flex flex-col gap-2"
	>
		{#if loading}
			<div class="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-base-100/80 rounded-lg" role="status" aria-label="Loading">
				<span class="loading loading-spinner {loadingSizeClass} text-primary" aria-hidden="true"></span>
			</div>
		{/if}
		{#each normalizedOptions as option, index (option.value)}
			{@const optionId = `${groupId}-option-${index}`}
			<label for={optionId} class="label cursor-pointer justify-start gap-4 pr-6">
				<input
					id={optionId}
					type="radio"
					{name}
					value={option.value}
					checked={value === option.value}
					disabled={isDisabled || option.disabled}
					class={radioClasses}
					{onchange}
					{...props}
				/>
				<span class="label-text">{option.label}</span>
			</label>
		{/each}
	</div>

	{#if hasError}
		<div id={errorId} class="label">
			<span class="label-text-alt text-error" role="alert" aria-live="polite">
				{error}
			</span>
		</div>
	{/if}

	{#if helpText && !hasError}
		<div id={helpTextId} class="label">
			<span class="label-text-alt text-base-content/70">
				{helpText}
			</span>
		</div>
	{/if}
</div>
