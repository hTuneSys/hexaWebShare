<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the Input component
	 */
	interface Props {
		/**
		 * Input value (controlled)
		 */
		value?: string;
		/**
		 * Input type
		 * @default 'text'
		 */
		type?:
			| 'text'
			| 'email'
			| 'password'
			| 'tel'
			| 'url'
			| 'search'
			| 'number'
			| 'date'
			| 'time'
			| 'datetime-local'
			| 'month'
			| 'week';
		/**
		 * Color variant of the input
		 * @default undefined (default DaisyUI input style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the input
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the input is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the input is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Whether the input is readonly
		 * @default false
		 */
		readonly?: boolean;
		/**
		 * Placeholder text
		 */
		placeholder?: string;
		/**
		 * Label text for the input
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
		 * Maximum length of input value
		 */
		maxlength?: number;
		/**
		 * Minimum length of input value
		 */
		minlength?: number;
		/**
		 * Pattern for validation (regex)
		 */
		pattern?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Whether the input is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Input event handler
		 */
		oninput?: (event: Event) => void;
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
		type = 'text',
		variant,
		size = 'md',
		disabled = false,
		required = false,
		readonly = false,
		placeholder,
		label,
		error,
		helpText,
		id,
		name,
		maxlength,
		minlength,
		pattern,
		ariaLabel,
		ariaDescribedby,
		loading = false,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `input-${Math.random().toString(36).substr(2, 9)}`);
	let labelForId = $derived(label ? fieldId : undefined);

	// Input classes
	let inputClasses = $derived(
		[
			'input',
			'input-bordered',
			variant === 'primary' && 'input-primary',
			variant === 'secondary' && 'input-secondary',
			variant === 'accent' && 'input-accent',
			variant === 'info' && 'input-info',
			variant === 'success' && 'input-success',
			variant === 'warning' && 'input-warning',
			variant === 'error' && 'input-error',
			size === 'xs' && 'input-xs',
			size === 'sm' && 'input-sm',
			size === 'md' && 'input-md',
			size === 'lg' && 'input-lg',
			error !== undefined && error !== '' && 'input-error',
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
					<span class="ml-1 text-error" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<div class="relative">
		<input
			{type}
			id={fieldId}
			{name}
			{value}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{maxlength}
			{minlength}
			{pattern}
			class={inputClasses}
			aria-label={ariaLabel || (label ? undefined : placeholder)}
			aria-describedby={ariaDescribedby}
			aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
			aria-required={required}
			aria-disabled={disabled}
			aria-busy={loading}
			{...props}
		/>
		{#if loading}
			<div class="absolute right-3 top-1/2 -translate-y-1/2" role="status" aria-label="Loading">
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
