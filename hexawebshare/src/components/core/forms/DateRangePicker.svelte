<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
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
		onStartDateChange,
		onEndDateChange,
		onStartDateInput,
		onEndDateInput,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique IDs if not provided
	let baseId = $derived(id || `daterangepicker-${Math.random().toString(36).substr(2, 9)}`);
	let startDateId = $derived(`${baseId}-start`);
	let endDateId = $derived(`${baseId}-end`);
	let labelForStartId = $derived(startDateId);
	let labelForEndId = $derived(endDateId);

	// Input classes for both date inputs
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
		<label class={labelClasses}>
			<span class="label-text">
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<div class="flex flex-col gap-4 sm:flex-row">
		<!-- Start Date Input -->
		<div class="form-control flex-1">
			<label for={labelForStartId} class={labelClasses}>
				<span class="label-text">
					{startLabel}
					{#if required && !label}
						<span class="text-error ml-1" aria-label="required">*</span>
					{/if}
				</span>
			</label>

			<input
				type="date"
				id={startDateId}
				name={name ? `${name}-start` : undefined}
				class={inputClasses}
				value={startDate}
				{min}
				{max}
				{disabled}
				{required}
				aria-label={ariaLabel || `${startLabel} date picker`}
				aria-describedby={ariaDescribedby}
				aria-invalid={error ? 'true' : 'false'}
				aria-required={required ? 'true' : 'false'}
				onchange={handleStartDateChange}
				oninput={handleStartDateInput}
				{...props}
			/>
		</div>

		<!-- End Date Input -->
		<div class="form-control flex-1">
			<label for={labelForEndId} class={labelClasses}>
				<span class="label-text">
					{endLabel}
					{#if required && !label}
						<span class="text-error ml-1" aria-label="required">*</span>
					{/if}
				</span>
			</label>

			<input
				type="date"
				id={endDateId}
				name={name ? `${name}-end` : undefined}
				class={inputClasses}
				value={endDate}
				min={endDateMin}
				{max}
				{disabled}
				{required}
				aria-label={ariaLabel || `${endLabel} date picker`}
				aria-describedby={ariaDescribedby}
				aria-invalid={error ? 'true' : 'false'}
				aria-required={required ? 'true' : 'false'}
				onchange={handleEndDateChange}
				oninput={handleEndDateInput}
				{...props}
			/>
		</div>
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
