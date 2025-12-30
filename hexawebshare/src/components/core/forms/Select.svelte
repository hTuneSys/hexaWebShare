<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Option type for select options
	 */
	export type SelectOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	/**
	 * Props interface for the Select component
	 */
	interface Props {
		/**
		 * Selected value (controlled)
		 */
		value?: string;
		/**
		 * Options array - can be array of strings or array of SelectOption objects
		 */
		options: string[] | SelectOption[];
		/**
		 * Color variant of the select
		 * @default undefined (default DaisyUI select style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the select
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the select is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the select is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Placeholder text (shown when no option is selected)
		 */
		placeholder?: string;
		/**
		 * Label text for the select
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
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * HTML name attribute for form submission
		 */
		name?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Whether the select is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Blur event handler
		 */
		onblur?: (event: Event) => void;
		/**
		 * Focus event handler
		 */
		onfocus?: (event: Event) => void;
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
		disabled = false,
		required = false,
		placeholder,
		label,
		error,
		helpText,
		id,
		name,
		ariaLabel,
		ariaDescribedby,
		loading = false,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `select-${Math.random().toString(36).substring(2, 11)}`);
	let labelForId = $derived(label ? fieldId : undefined);

	// Normalize options to SelectOption format
	let normalizedOptions = $derived(
		options.map((option) => {
			if (typeof option === 'string') {
				return { value: option, label: option, disabled: false };
			}
			return option;
		})
	);

	// Select classes
	let selectClasses = $derived(
		[
			'select',
			'select-bordered',
			'w-full',
			variant === 'primary' && 'select-primary',
			variant === 'secondary' && 'select-secondary',
			variant === 'accent' && 'select-accent',
			variant === 'info' && 'select-info',
			variant === 'success' && 'select-success',
			variant === 'warning' && 'select-warning',
			variant === 'error' && 'select-error',
			size === 'xs' && 'select-xs',
			size === 'sm' && 'select-sm',
			size === 'md' && 'select-md',
			size === 'lg' && 'select-lg',
			error !== undefined && error !== '' && 'select-error',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Label classes
	let labelClasses = $derived(
		[
			'label',
			size === 'xs' && 'py-0',
			size === 'sm' && 'py-1',
			size === 'md' && 'py-2',
			size === 'lg' && 'py-3'
		]
			.filter(Boolean)
			.join(' ')
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
</script>

<div class="form-control w-full">
	{#if label}
		<label for={labelForId} class={labelClasses}>
			<span class="label-text">
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<div class="relative">
		<select
			id={fieldId}
			{name}
			value={value ?? ''}
			{disabled}
			{required}
			class={selectClasses}
			aria-label={ariaLabel || (label ? undefined : placeholder)}
			aria-describedby={ariaDescribedby}
			aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
			aria-required={required}
			aria-disabled={disabled}
			aria-busy={loading}
			{...props}
		>
			{#if placeholder}
				<option value="" disabled>
					{placeholder}
				</option>
			{/if}
			{#each normalizedOptions as option}
				<option value={option.value} disabled={option.disabled || false}>
					{option.label}
				</option>
			{/each}
		</select>
		{#if loading}
			<div class="absolute top-1/2 right-3 -translate-y-1/2" role="status" aria-label="Loading">
				<span class="loading loading-spinner {loadingSizeClass} text-primary" aria-hidden="true"
				></span>
			</div>
		{/if}
	</div>

	{#if error && error !== ''}
		<div class={labelClasses}>
			<span class="label-text-alt text-error" role="alert" aria-live="polite">{error}</span>
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<div class={labelClasses}>
			<span class="label-text-alt text-base-content/70">{helpText}</span>
		</div>
	{/if}
</div>

<style>
	:global(select.select) {
		line-height: normal;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	:global(select.select.select-xs) {
		line-height: 1.25;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
	}

	:global(select.select.select-sm) {
		line-height: 1.375;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	:global(select.select.select-md) {
		line-height: 1.5;
		padding-top: 0.375rem;
		padding-bottom: 0.375rem;
	}

	:global(select.select.select-lg) {
		line-height: 1.625;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
</style>
