<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Spinner from '../feedback/Spinner.svelte';
	import Text from '../typography/Text.svelte';

	/**
	 * Marker type used to render tick marks below the slider.
	 */
	interface RangeSliderMark {
		value: number;
		label?: string;
	}

	/**
	 * Props for the RangeSlider component.
	 */
	interface Props {
		/**
		 * Minimum value of the range (left thumb).
		 * @default 0
		 */
		minValue?: number;
		/**
		 * Maximum value of the range (right thumb).
		 * @default 100
		 */
		maxValue?: number;
		/**
		 * Minimum selectable value.
		 * @default 0
		 */
		min?: number;
		/**
		 * Maximum selectable value.
		 * @default 100
		 */
		max?: number;
		/**
		 * Step between values.
		 * @default 1
		 */
		step?: number;
		/**
		 * Visual size of the slider.
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant for the slider thumb and track.
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
		 * Label text shown above the slider.
		 */
		label?: string;
		/**
		 * Helper text displayed below the slider.
		 */
		helpText?: string;
		/**
		 * Error message displayed below the slider.
		 */
		error?: string;
		/**
		 * Whether the field is required.
		 * @default false
		 */
		required?: boolean;
		/**
		 * Show the current values next to the slider.
		 * @default false
		 */
		showValues?: boolean;
		/**
		 * Display a loading spinner next to the slider.
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Disable user interaction.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Marks rendered under the slider track.
		 */
		marks?: RangeSliderMark[];
		/**
		 * Number of auto-generated marks (only used when marks prop is empty).
		 * @default 5
		 */
		markCount?: number;
		/**
		 * Accessible label for screen readers.
		 * @default 'Range slider'
		 */
		ariaLabel?: string;
		/**
		 * Accessible label for minimum value input
		 * @default 'minimum value'
		 */
		minAriaLabel?: string;
		/**
		 * Accessible label for maximum value input
		 * @default 'maximum value'
		 */
		maxAriaLabel?: string;
		/**
		 * Accessible label for required field indicator
		 * @default 'required'
		 */
		requiredLabel?: string;
		/**
		 * Unique identifier for the input container.
		 */
		id?: string;
		/**
		 * Name attribute for form submissions (applied to both inputs).
		 */
		name?: string;
		/**
		 * Callback when range values change (on release)
		 */
		onchange?: (values: { minValue: number; maxValue: number }) => void;
		/**
		 * Callback when range values are being changed (during drag)
		 */
		oninput?: (values: { minValue: number; maxValue: number }) => void;
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
	}

	let {
		minValue = $bindable(0),
		maxValue = $bindable(100),
		min = 0,
		max = 100,
		step = 1,
		size = 'md',
		variant = 'primary',
		label,
		helpText,
		error,
		required = false,
		showValues = false,
		loading = false,
		disabled = false,
		marks = [],
		markCount = 5,
		ariaLabel = 'Range slider',
		minAriaLabel = 'minimum value',
		maxAriaLabel = 'maximum value',
		requiredLabel = 'required',
		id,
		name,
		onchange,
		oninput,
		class: className = '',
		...props
	}: Props = $props();

	// Clamp values when they change
	$effect(() => {
		const clampedMin = Math.min(Math.max(minValue, min), max);
		const clampedMax = Math.min(Math.max(maxValue, min), max);
		if (clampedMin !== minValue) {
			minValue = clampedMin;
		}
		if (clampedMax !== maxValue) {
			maxValue = clampedMax;
		}
		// Ensure minValue <= maxValue
		if (minValue > maxValue) {
			minValue = maxValue;
		}
		if (maxValue < minValue) {
			maxValue = minValue;
		}
	});

	const sliderId =
		id || `range-slider-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 9)}`;

	const minInputId = `${sliderId}-min`;
	const maxInputId = `${sliderId}-max`;

	let describedById = $derived(
		error && error !== ''
			? `${sliderId}-error`
			: helpText && helpText !== ''
				? `${sliderId}-help`
				: undefined
	);

	let sliderClasses = $derived(
		[
			'range',
			'w-full',
			variant === 'primary' && 'range-primary',
			variant === 'secondary' && 'range-secondary',
			variant === 'accent' && 'range-accent',
			variant === 'neutral' && 'range-neutral',
			variant === 'info' && 'range-info',
			variant === 'success' && 'range-success',
			variant === 'warning' && 'range-warning',
			variant === 'error' && 'range-error',
			size === 'xs' && 'range-xs',
			size === 'sm' && 'range-sm',
			size === 'md' && 'range-md',
			size === 'lg' && 'range-lg',
			disabled && 'cursor-not-allowed opacity-60',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	let minValueLabel = $derived(`${minValue}`);
	let maxValueLabel = $derived(`${maxValue}`);

	function handleMinInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newMinValue = Number(target.value);
		if (newMinValue <= maxValue) {
			minValue = newMinValue;
			oninput?.({ minValue, maxValue });
		}
	}

	function handleMaxInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newMaxValue = Number(target.value);
		if (newMaxValue >= minValue) {
			maxValue = newMaxValue;
			oninput?.({ minValue, maxValue });
		}
	}

	function handleMinChange() {
		onchange?.({ minValue, maxValue });
	}

	function handleMaxChange() {
		onchange?.({ minValue, maxValue });
	}

	function generateDefaultMarks(
		minValue: number,
		maxValue: number,
		count: number
	): RangeSliderMark[] {
		if (!Number.isFinite(minValue) || !Number.isFinite(maxValue) || minValue === maxValue) {
			return [];
		}

		const steps = count - 1;
		const interval = (maxValue - minValue) / steps;

		return Array.from({ length: count }, (_, index) => {
			const rawValue = minValue + interval * index;
			const normalized = Number(parseFloat(rawValue.toFixed(2)));

			return {
				value: normalized,
				label: `${normalized}`
			};
		});
	}

	let derivedMarks = $derived(
		marks && marks.length > 0 ? marks : generateDefaultMarks(min, max, markCount)
	);
</script>

<div class="form-control w-full gap-2">
	{#if label}
		<label for={sliderId} class="label">
			<span class="label-text flex items-center gap-1">
				<Text text={label} />
				{#if required}
					<Text text="*" variant="error" ariaLabel={requiredLabel} />
				{/if}
			</span>
			{#if showValues}
				<Text
					text={`${minValueLabel} - ${maxValueLabel}`}
					size="sm"
					class="label-text-alt font-semibold"
				/>
			{/if}
		</label>
	{/if}

	<div class="relative flex items-center gap-3">
		<div class="range-slider-container relative flex-1">
			<!-- Min value input -->
			<input
				id={minInputId}
				type="range"
				class="{sliderClasses} range-slider-min"
				{min}
				{max}
				{step}
				name={name ? `${name}-min` : undefined}
				aria-label={`${ariaLabel} ${minAriaLabel}`}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={minValue}
				aria-invalid={Boolean(error && error !== '')}
				aria-describedby={describedById}
				aria-busy={loading}
				value={minValue}
				{disabled}
				oninput={handleMinInput}
				onchange={handleMinChange}
				{...props}
			/>
			<!-- Max value input -->
			<input
				id={maxInputId}
				type="range"
				class="{sliderClasses} range-slider-max"
				{min}
				{max}
				{step}
				name={name ? `${name}-max` : undefined}
				aria-label={`${ariaLabel} ${maxAriaLabel}`}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={maxValue}
				aria-invalid={Boolean(error && error !== '')}
				aria-describedby={describedById}
				aria-busy={loading}
				value={maxValue}
				{disabled}
				oninput={handleMaxInput}
				onchange={handleMaxChange}
				{...props}
			/>
		</div>
		{#if showValues && !label}
			<div class="flex min-w-[6rem] items-center justify-end gap-2 text-sm font-semibold">
				<Text text={minValueLabel} size="sm" />
				<Text text="-" size="sm" />
				<Text text={maxValueLabel} size="sm" />
			</div>
		{/if}
		{#if loading}
			<Spinner size="sm" variant="primary" class="absolute top-1/2 right-0 -translate-y-1/2" />
		{/if}
	</div>

	{#if derivedMarks.length > 0}
		<div class="text-base-content/70 relative mt-1 h-8 text-xs" aria-hidden="true">
			{#each derivedMarks as mark (mark.value)}
				<div
					class="absolute flex -translate-x-1/2 flex-col items-center gap-1"
					style="left: {((mark.value - min) / (max - min)) * 100}%"
				>
					<!-- 
						NOTE: Raw HTML span is intentional here.
						This is a purely decorative visual element (a vertical tick mark line).
						It has no text content and serves only as a structural/visual separator.
					-->
					<span class="bg-base-content/40 h-2 w-px"></span>
					<Text text={String(mark.label ?? mark.value)} size="xs" />
				</div>
			{/each}
		</div>
	{/if}

	{#if error && error !== ''}
		<div id={`${sliderId}-error`} role="alert" aria-live="polite">
			<Text text={error} size="xs" variant="error" class="label-text-alt" />
		</div>
	{:else if helpText && helpText !== ''}
		<div id={`${sliderId}-help`}>
			<Text text={helpText} size="xs" variant="muted" class="label-text-alt" />
		</div>
	{/if}
</div>

<style>
	/* 
		NOTE: Custom CSS is intentional here for dual-thumb range slider.
		
		TECHNICAL REASON: HTML5 does not provide a native dual-thumb range input.
		This component uses two overlapping <input type="range"> elements to simulate
		a dual-thumb slider. The overlapping behavior cannot be achieved with Tailwind
		or DaisyUI utility classes alone.
		
		ATTEMPTED SOLUTIONS:
		1. Single input with ::before/::after - Cannot create interactive thumbs
		2. Tailwind positioning classes - Cannot properly layer thumbs with pointer-events
		3. DaisyUI range component - Only supports single-thumb sliders
		
		CONSEQUENCE: Without this CSS, the two range thumbs will not properly overlap
		and interact. The min thumb must appear below the max thumb in the stacking order,
		and pointer-events must be managed so both thumbs remain draggable.
		
		VALIDATION: Tested across Chrome, Firefox, Safari, and Edge.
	*/
	.range-slider-container {
		position: relative;
		height: 1.5rem;
		display: flex;
		align-items: center;
	}

	.range-slider-container input[type='range'] {
		position: absolute;
		width: 100%;
		pointer-events: none;
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
	}

	/* Enable pointer events only on the thumb */
	.range-slider-container input[type='range']::-webkit-slider-thumb {
		pointer-events: all;
		cursor: pointer;
		-webkit-appearance: none;
		appearance: none;
	}

	.range-slider-container input[type='range']::-moz-range-thumb {
		pointer-events: all;
		cursor: pointer;
	}

	.range-slider-container input[type='range']::-ms-thumb {
		pointer-events: all;
		cursor: pointer;
	}

	/* Z-index layering: min thumb below, max thumb above */
	.range-slider-min {
		z-index: 1;
	}

	.range-slider-max {
		z-index: 2;
	}

	/* When min value is greater than a certain threshold, bring it to front */
	.range-slider-container input[type='range'].range-slider-min:focus {
		z-index: 3;
	}
</style>
