<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the DatePicker component
	 */
	interface Props {
		/**
		 * Current date value (ISO date string: YYYY-MM-DD)
		 */
		value?: string;
		/**
		 * Minimum selectable date (ISO date string: YYYY-MM-DD)
		 */
		min?: string;
		/**
		 * Maximum selectable date (ISO date string: YYYY-MM-DD)
		 */
		max?: string;
		/**
		 * Color variant of the date picker
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
		 * Size of the date picker
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the date picker is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the date picker is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Placeholder text (not used for date inputs, but kept for API consistency)
		 */
		placeholder?: string;
		/**
		 * Label text for the date picker
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
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Input event handler
		 */
		oninput?: (event: Event) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		min,
		max,
		variant = 'primary',
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
		onchange,
		oninput,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `datepicker-${Math.random().toString(36).substr(2, 9)}`);
	let labelForId = $derived(fieldId);

	// Input classes
	let inputClasses = $derived(
		[
			'input',
			'input-bordered',
			variant === 'primary' && 'input-primary',
			variant === 'secondary' && 'input-secondary',
			variant === 'accent' && 'input-accent',
			variant === 'neutral' && 'input-neutral',
			variant === 'info' && 'input-info',
			variant === 'success' && 'input-success',
			variant === 'warning' && 'input-warning',
			variant === 'error' && 'input-error',
			size === 'xs' && 'input-xs',
			size === 'sm' && 'input-sm',
			size === 'md' && 'input-md',
			size === 'lg' && 'input-lg',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Label classes
	let labelClasses = $derived(
		[
			'label',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'md' && 'text-base',
			size === 'lg' && 'text-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle change event
	function handleChange(event: Event) {
		if (onchange) {
			onchange(event);
		}
	}

	// Handle input event
	function handleInput(event: Event) {
		if (oninput) {
			oninput(event);
		}
	}
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

	<input
		type="date"
		id={fieldId}
		{name}
		class={inputClasses}
		{value}
		{min}
		{max}
		{disabled}
		{required}
		aria-label={ariaLabel || label || 'Date picker'}
		aria-describedby={ariaDescribedby}
		aria-invalid={error ? 'true' : 'false'}
		aria-required={required ? 'true' : 'false'}
		onchange={handleChange}
		oninput={handleInput}
		{...props}
	/>

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
