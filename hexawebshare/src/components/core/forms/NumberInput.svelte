<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import IconButton from '../buttons/IconButton.svelte';
	import Label from '../data-display/Label.svelte';
	import Spinner from '../feedback/Spinner.svelte';
	import Text from '../typography/Text.svelte';

	/**
	 * Props interface for the NumberInput component
	 */
	interface Props {
		/**
		 * Current numeric value (bindable)
		 */
		value?: number;
		/**
		 * Minimum allowed value
		 */
		min?: number;
		/**
		 * Maximum allowed value
		 */
		max?: number;
		/**
		 * Step increment for stepper buttons and arrow keys
		 * @default 1
		 */
		step?: number;
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
		 * Show increment/decrement stepper buttons
		 * @default true
		 */
		showStepper?: boolean;
		/**
		 * Allow decimal numbers
		 * @default false
		 */
		allowDecimals?: boolean;
		/**
		 * Number of decimal places (when allowDecimals is true)
		 * @default 2
		 */
		decimalPlaces?: number;
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
		/**
		 * Accessible label for decrease button
		 * @default 'Decrease value'
		 */
		decreaseLabel?: string;
		/**
		 * Accessible label for increase button
		 * @default 'Increase value'
		 */
		increaseLabel?: string;
		/**
		 * Accessible label for loading state
		 * @default 'Loading'
		 */
		loadingLabel?: string;
		/**
		 * Accessible label for required indicator
		 * @default 'required'
		 */
		requiredLabel?: string;
	}

	let {
		value = $bindable(),
		min,
		max,
		step = 1,
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
		ariaLabel,
		ariaDescribedby,
		loading = false,
		showStepper = true,
		allowDecimals = false,
		decimalPlaces = 2,
		decreaseLabel = 'Decrease value',
		increaseLabel = 'Increase value',
		loadingLabel = 'Loading',
		requiredLabel = 'required',
		onchange,
		oninput,
		onblur,
		onfocus,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `number-input-${Math.random().toString(36).substring(2, 11)}`);
	let labelForId = $derived(label ? fieldId : undefined);

	// Check if value is at min/max bounds
	let isAtMin = $derived(min !== undefined && value !== undefined && value <= min);
	let isAtMax = $derived(max !== undefined && value !== undefined && value >= max);

	// Input classes
	let inputClasses = $derived(
		[
			'input',
			'input-bordered',
			'w-full',
			showStepper && 'text-center',
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

	// Loading spinner size
	let spinnerSize = $derived(size);

	/**
	 * Clamp value within min/max bounds
	 */
	function clampValue(val: number): number {
		let result = val;
		if (min !== undefined && result < min) result = min;
		if (max !== undefined && result > max) result = max;
		if (allowDecimals) {
			result = parseFloat(result.toFixed(decimalPlaces));
		} else {
			result = Math.round(result);
		}
		return result;
	}

	/**
	 * Increment the value by step
	 */
	function increment() {
		if (disabled || readonly || loading) return;
		const currentValue = value ?? 0;
		const newValue = clampValue(currentValue + step);
		if (max === undefined || newValue <= max) {
			value = newValue;
		}
	}

	/**
	 * Decrement the value by step
	 */
	function decrement() {
		if (disabled || readonly || loading) return;
		const currentValue = value ?? 0;
		const newValue = clampValue(currentValue - step);
		if (min === undefined || newValue >= min) {
			value = newValue;
		}
	}

	/**
	 * Handle keyboard navigation
	 */
	function handleKeydown(event: KeyboardEvent) {
		if (disabled || readonly || loading) return;

		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault();
				increment();
				break;
			case 'ArrowDown':
				event.preventDefault();
				decrement();
				break;
		}
	}

	/**
	 * Handle input change and validate
	 */
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const rawValue = target.value;

		if (rawValue === '' || rawValue === '-') {
			value = undefined;
		} else {
			const numValue = parseFloat(rawValue);
			if (!isNaN(numValue)) {
				value = clampValue(numValue);
			}
		}

		oninput?.(event);
	}

	/**
	 * Handle blur to ensure value is properly formatted
	 */
	function handleBlur(event: Event) {
		if (value !== undefined) {
			value = clampValue(value);
		}
		onblur?.(event);
	}
</script>

<div class="form-control w-full">
	{#if label}
		<Label text={label} for={labelForId} {required} {size} requiredAriaLabel={requiredLabel} />
	{/if}

	<div class="relative flex items-center gap-1">
		{#if showStepper}
			<IconButton
				variant="ghost"
				{size}
				square
				onclick={decrement}
				disabled={disabled || readonly || loading || isAtMin}
				ariaLabel={decreaseLabel}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
				</svg>
			</IconButton>
		{/if}

		<div class="relative flex-1">
			<input
				type="number"
				id={fieldId}
				{name}
				value={value ?? ''}
				{placeholder}
				{disabled}
				readonly={readonly || loading}
				{required}
				{min}
				{max}
				{step}
				class={inputClasses}
				aria-label={ariaLabel || (label ? undefined : placeholder)}
				aria-describedby={ariaDescribedby}
				aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
				aria-required={required}
				aria-disabled={disabled}
				aria-busy={loading}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				oninput={handleInput}
				onkeydown={handleKeydown}
				onblur={handleBlur}
				{onfocus}
				{onchange}
				{...props}
			/>
			{#if loading}
				<div
					class="absolute top-1/2 right-3 -translate-y-1/2"
					role="status"
					aria-label={loadingLabel}
				>
					<Spinner size={spinnerSize} variant="primary" ariaLabel={loadingLabel} />
				</div>
			{/if}
		</div>

		{#if showStepper}
			<IconButton
				variant="ghost"
				{size}
				square
				onclick={increment}
				disabled={disabled || readonly || loading || isAtMax}
				ariaLabel={increaseLabel}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
			</IconButton>
		{/if}
	</div>

	{#if error && error !== ''}
		<div class={labelClasses}>
			<div role="alert" aria-live="polite">
				<Text text={error} size="xs" variant="error" class="label-text-alt" />
			</div>
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<div class={labelClasses}>
			<Text text={helpText} size="xs" variant="muted" class="label-text-alt" />
		</div>
	{/if}
</div>
