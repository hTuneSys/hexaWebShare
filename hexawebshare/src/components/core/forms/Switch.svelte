<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the Switch component
	 */
	interface Props {
		/**
		 * Whether the switch is checked/on
		 * @default false
		 */
		checked?: boolean;
		/**
		 * Color variant of the switch
		 * @default undefined (default DaisyUI style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the switch
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the switch is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the switch is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Label text displayed next to the switch
		 */
		label?: string;
		/**
		 * Position of the label relative to the switch
		 * @default 'right'
		 */
		labelPosition?: 'left' | 'right';
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * HTML name attribute for form submission
		 */
		name?: string;
		/**
		 * HTML value attribute for form submission
		 */
		value?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Whether the switch is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	let {
		checked = $bindable(false),
		variant,
		size = 'md',
		disabled = false,
		required = false,
		label,
		labelPosition = 'right',
		helpText,
		error,
		id,
		name,
		value,
		ariaLabel,
		ariaDescribedby,
		loading = false,
		onchange,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `switch-${Math.random().toString(36).substr(2, 9)}`);

	// Switch classes using static DaisyUI classes
	let switchClasses = $derived(
		[
			'toggle',
			variant === 'primary' && 'toggle-primary',
			variant === 'secondary' && 'toggle-secondary',
			variant === 'accent' && 'toggle-accent',
			variant === 'info' && 'toggle-info',
			variant === 'success' && 'toggle-success',
			variant === 'warning' && 'toggle-warning',
			variant === 'error' && 'toggle-error',
			size === 'xs' && 'toggle-xs',
			size === 'sm' && 'toggle-sm',
			size === 'md' && 'toggle-md',
			size === 'lg' && 'toggle-lg',
			error !== undefined && error !== '' && 'toggle-error',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Label text classes based on size
	let labelTextClasses = $derived(
		[
			'label-text',
			size === 'xs' && 'text-xs',
			size === 'sm' && 'text-sm',
			size === 'lg' && 'text-lg'
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

	/**
	 * Handle change event
	 */
	function handleChange(event: Event) {
		if (loading || disabled) return;
		const target = event.target as HTMLInputElement;
		checked = target.checked;
		onchange?.(event);
	}
</script>

<div class="form-control">
	<label
		for={fieldId}
		class="label cursor-pointer justify-start gap-3"
		class:cursor-not-allowed={disabled || loading}
		class:opacity-60={disabled}
	>
		{#if labelPosition === 'left' && label}
			<span class={labelTextClasses}>
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		{/if}

		<div class="relative inline-flex items-center">
			<input
				type="checkbox"
				id={fieldId}
				{name}
				{value}
				{required}
				disabled={disabled || loading}
				{checked}
				class={switchClasses}
				aria-label={ariaLabel || label || 'Switch'}
				aria-describedby={ariaDescribedby}
				aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
				aria-required={required}
				aria-disabled={disabled}
				aria-busy={loading}
				aria-checked={checked}
				role="switch"
				onchange={handleChange}
				{...props}
			/>
			{#if loading}
				<span
					class="loading loading-spinner {loadingSizeClass} text-base-content absolute left-1/2 -translate-x-1/2"
					aria-hidden="true"
				></span>
			{/if}
		</div>

		{#if labelPosition === 'right' && label}
			<span class={labelTextClasses}>
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		{/if}
	</label>

	{#if error && error !== ''}
		<div class="label py-1">
			<span class="label-text-alt text-error" role="alert" aria-live="polite">{error}</span>
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<div class="label py-1">
			<span class="label-text-alt text-base-content/70">{helpText}</span>
		</div>
	{/if}
</div>
