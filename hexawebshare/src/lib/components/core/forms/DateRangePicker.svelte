<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Label from '../data-display/Label.svelte';
	import Text from '../typography/Text.svelte';
	import DatePicker from './DatePicker.svelte';

	/**
	 * Props interface for the DateRangePicker component
	 */
	interface Props {
		/**
		 * Start date value (ISO date string: YYYY-MM-DD)
		 */
		startDate?: string;
		/**
		 * End date value (ISO date string: YYYY-MM-DD)
		 */
		endDate?: string;
		/**
		 * Minimum selectable date (ISO date string: YYYY-MM-DD)
		 */
		min?: string;
		/**
		 * Maximum selectable date (ISO date string: YYYY-MM-DD)
		 */
		max?: string;
		/**
		 * Color variant of the date range picker
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
		 * Size of the date range picker
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the date range picker is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the date range picker is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Label text for the date range picker
		 */
		label?: string;
		/**
		 * Start date label text
		 * @default 'Start Date'
		 */
		startLabel?: string;
		/**
		 * End date label text
		 * @default 'End Date'
		 */
		endLabel?: string;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * HTML id prefix for the date inputs
		 */
		id?: string;
		/**
		 * HTML name prefix for form submission
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
		 * Change event handler for start date
		 */
		onStartDateChange?: (event: Event) => void;
		/**
		 * Change event handler for end date
		 */
		onEndDateChange?: (event: Event) => void;
		/**
		 * Input event handler for start date
		 */
		onStartDateInput?: (event: Event) => void;
		/**
		 * Input event handler for end date
		 */
		onEndDateInput?: (event: Event) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		startDate,
		endDate,
		min,
		max,
		variant = 'primary',
		size = 'md',
		disabled = false,
		required = false,
		label,
		startLabel = 'Start Date',
		endLabel = 'End Date',
		error,
		helpText,
		id,
		name,
		ariaLabel,
		ariaDescribedby,
		requiredLabel = 'required',
		onStartDateChange,
		onEndDateChange,
		onStartDateInput,
		onEndDateInput,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique IDs if not provided
	let baseId = $derived(id || `daterangepicker-${Math.random().toString(36).substring(2, 11)}`);
	let startDateId = $derived(`${baseId}-start`);
	let endDateId = $derived(`${baseId}-end`);

	// Label classes for error/help text containers
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

	// Handle change event for start date
	function handleStartDateChange(event: Event) {
		if (onStartDateChange) {
			onStartDateChange(event);
		}
	}

	// Handle change event for end date
	function handleEndDateChange(event: Event) {
		if (onEndDateChange) {
			onEndDateChange(event);
		}
	}

	// Handle input event for start date
	function handleStartDateInput(event: Event) {
		if (onStartDateInput) {
			onStartDateInput(event);
		}
	}

	// Handle input event for end date
	function handleEndDateInput(event: Event) {
		if (onEndDateInput) {
			onEndDateInput(event);
		}
	}

	// Calculate min date for end date (should be >= start date)
	let endDateMin = $derived(startDate || min || undefined);
</script>

<div class="form-control w-full">
	{#if label}
		<Label text={label} {required} {size} requiredAriaLabel={requiredLabel} />
	{/if}

	<div class="flex flex-col gap-4 sm:flex-row">
		<!-- Start Date Input -->
		<div class="flex-1">
			<DatePicker
				id={startDateId}
				name={name ? `${name}-start` : undefined}
				label={startLabel}
				value={startDate}
				{min}
				{max}
				{variant}
				{size}
				{disabled}
				required={required && !label}
				ariaLabel={ariaLabel || `${startLabel} date picker`}
				{ariaDescribedby}
				{requiredLabel}
				onchange={handleStartDateChange}
				oninput={handleStartDateInput}
				{...props}
			/>
		</div>

		<!-- End Date Input -->
		<div class="flex-1">
			<DatePicker
				id={endDateId}
				name={name ? `${name}-end` : undefined}
				label={endLabel}
				value={endDate}
				min={endDateMin}
				{max}
				{variant}
				{size}
				{disabled}
				required={required && !label}
				ariaLabel={ariaLabel || `${endLabel} date picker`}
				{ariaDescribedby}
				{requiredLabel}
				onchange={handleEndDateChange}
				oninput={handleEndDateInput}
				{...props}
			/>
		</div>
	</div>

	{#if error && error !== ''}
		<!-- 
			NOTE: Raw HTML div element used for structural layout wrapper.
			Contains error message displayed with Text component.
		-->
		<div class={labelClasses} role="alert" aria-live="polite">
			<Text text={error} size="xs" variant="error" class="label-text-alt" />
		</div>
	{/if}

	{#if helpText && (!error || error === '')}
		<!-- 
			NOTE: Raw HTML div element used for structural layout wrapper.
			Contains help text displayed with Text component.
		-->
		<div class={labelClasses}>
			<Text text={helpText} size="xs" variant="muted" class="label-text-alt" />
		</div>
	{/if}
</div>
