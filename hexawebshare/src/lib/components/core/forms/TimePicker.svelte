<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Label from '../data-display/Label.svelte';
	import Text from '../typography/Text.svelte';

	/**
	 * Props interface for the TimePicker component
	 */
	interface Props {
		/**
		 * Current time value (ISO time string: HH:MM or HH:MM:SS)
		 */
		value?: string;
		/**
		 * Minimum selectable time (ISO time string: HH:MM or HH:MM:SS)
		 */
		min?: string;
		/**
		 * Maximum selectable time (ISO time string: HH:MM or HH:MM:SS)
		 */
		max?: string;
		/**
		 * Step value in seconds (e.g., 900 for 15-minute intervals)
		 */
		step?: number;
		/**
		 * Color variant of the time picker
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
		 * Size of the time picker
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the time picker is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the time picker is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Placeholder text (not used for time inputs, but kept for API consistency)
		 */
		placeholder?: string;
		/**
		 * Label text for the time picker
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
		 * Accessible label for required field indicator
		 * @default 'required'
		 */
		requiredLabel?: string;
		/**
		 * Accessible label for time picker when no label is provided
		 * @default 'Time picker'
		 */
		timePickerAriaLabel?: string;
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
		step,
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
		requiredLabel = 'required',
		timePickerAriaLabel = 'Time picker',
		onchange,
		oninput,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `timepicker-${Math.random().toString(36).substring(2, 11)}`);
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
		<Label text={label} for={labelForId} {required} {size} requiredAriaLabel={requiredLabel} />
	{/if}

	<input
		type="time"
		id={fieldId}
		{name}
		class={inputClasses}
		{value}
		{min}
		{max}
		{step}
		{disabled}
		{required}
		aria-label={ariaLabel || label || timePickerAriaLabel}
		aria-describedby={ariaDescribedby}
		aria-invalid={error ? 'true' : 'false'}
		aria-required={required ? 'true' : 'false'}
		onchange={handleChange}
		oninput={handleInput}
		{...props}
	/>

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
