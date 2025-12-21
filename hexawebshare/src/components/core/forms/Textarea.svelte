<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the Textarea component
	 */
	interface Props {
		/**
		 * Textarea value (controlled)
		 */
		value?: string;
		/**
		 * Color variant of the textarea
		 * @default undefined (default DaisyUI textarea style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the textarea
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the textarea is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the textarea is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Whether the textarea is readonly
		 * @default false
		 */
		readonly?: boolean;
		/**
		 * Placeholder text
		 */
		placeholder?: string;
		/**
		 * Label text for the textarea
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
		 * Number of visible text lines
		 * @default 4
		 */
		rows?: number;
		/**
		 * Number of visible text columns (width in characters)
		 */
		cols?: number;
		/**
		 * Maximum length of textarea value
		 */
		maxlength?: number;
		/**
		 * Minimum length of textarea value
		 */
		minlength?: number;
		/**
		 * Whether the textarea can be resized
		 * @default true
		 */
		resize?: boolean;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Whether the textarea is in loading state
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
		rows = 4,
		cols,
		maxlength,
		minlength,
		resize = true,
		ariaLabel,
		ariaDescribedby,
		loading = false,
		onchange,
		oninput,
		onblur,
		onfocus,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `textarea-${Math.random().toString(36).substr(2, 9)}`);
	let labelForId = $derived(label ? fieldId : undefined);

	// Textarea classes
	let textareaClasses = $derived(
		[
			'textarea',
			'textarea-bordered',
			variant === 'primary' && 'textarea-primary',
			variant === 'secondary' && 'textarea-secondary',
			variant === 'accent' && 'textarea-accent',
			variant === 'info' && 'textarea-info',
			variant === 'success' && 'textarea-success',
			variant === 'warning' && 'textarea-warning',
			variant === 'error' && 'textarea-error',
			size === 'xs' && 'textarea-xs',
			size === 'sm' && 'textarea-sm',
			size === 'md' && 'textarea-md',
			size === 'lg' && 'textarea-lg',
			error !== undefined && error !== '' && 'textarea-error',
			!resize && 'resize-none',
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
		<textarea
			id={fieldId}
			{name}
			{value}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{rows}
			{cols}
			{maxlength}
			{minlength}
			class={textareaClasses}
			aria-label={ariaLabel || (label ? undefined : placeholder)}
			aria-describedby={ariaDescribedby}
			aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
			aria-required={required}
			aria-disabled={disabled}
			aria-busy={loading}
			{onchange}
			{oninput}
			{onblur}
			{onfocus}
			{...props}
		></textarea>
		{#if loading}
			<div class="absolute right-3 top-3" role="status" aria-label="Loading">
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
