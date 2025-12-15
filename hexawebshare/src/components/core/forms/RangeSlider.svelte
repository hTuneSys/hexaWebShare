<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

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
		 * Unique identifier for the input container.
		 */
		id?: string;
		/**
		 * Name attribute for form submissions (applied to both inputs).
		 */
		name?: string;
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
	}

	const dispatch = createEventDispatcher<{
		change: { minValue: number; maxValue: number };
		input: { minValue: number; maxValue: number };
	}>();

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
		id,
		name,
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
			dispatch('input', { minValue, maxValue });
		}
	}

	function handleMaxInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newMaxValue = Number(target.value);
		if (newMaxValue >= minValue) {
			maxValue = newMaxValue;
			dispatch('input', { minValue, maxValue });
		}
	}

	function handleMinChange() {
		dispatch('change', { minValue, maxValue });
	}

	function handleMaxChange() {
		dispatch('change', { minValue, maxValue });
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

	// Calculate the percentage positions for visual styling
	let minPercent = $derived(((minValue - min) / (max - min)) * 100);
	let maxPercent = $derived(((maxValue - min) / (max - min)) * 100);
</script>

<div class="form-control w-full gap-2">
	{#if label}
		<label for={sliderId} class="label">
			<span class="label-text flex items-center gap-1">
				{label}
				{#if required}
					<span class="text-error" aria-label="required">*</span>
				{/if}
			</span>
			{#if showValues}
				<span class="label-text-alt text-sm font-semibold">
					{minValueLabel} - {maxValueLabel}
				</span>
			{/if}
		</label>
	{/if}

	<div class="relative flex items-center gap-3">
		<div class="range-slider-container relative flex-1">
			<!-- Min value input -->
			<input
				id={minInputId}
				type="range"
				class={sliderClasses}
				{min}
				{max}
				{step}
				name={name ? `${name}-min` : undefined}
				aria-label={`${ariaLabel} minimum value`}
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
				class={sliderClasses}
				{min}
				{max}
				{step}
				name={name ? `${name}-max` : undefined}
				aria-label={`${ariaLabel} maximum value`}
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
				<span>{minValueLabel}</span>
				<span>-</span>
				<span>{maxValueLabel}</span>
			</div>
		{/if}
		{#if loading}
			<span
				class="loading loading-spinner loading-sm absolute right-0 top-1/2 -translate-y-1/2 text-primary"
			></span>
		{/if}
	</div>

	{#if derivedMarks.length > 0}
		<div class="relative mt-1 h-8 text-xs text-base-content/70" aria-hidden="true">
			{#each derivedMarks as mark (mark.value)}
				<div
					class="absolute flex -translate-x-1/2 flex-col items-center gap-1"
					style="left: {((mark.value - min) / (max - min)) * 100}%"
				>
					<span class="h-2 w-px bg-base-content/40"></span>
					<span>{mark.label ?? mark.value}</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if error && error !== ''}
		<span
			id={`${sliderId}-error`}
			class="label-text-alt text-error"
			role="alert"
			aria-live="polite"
		>
			{error}
		</span>
	{:else if helpText && helpText !== ''}
		<span id={`${sliderId}-help`} class="label-text-alt text-base-content/70">{helpText}</span>
	{/if}
</div>

<style>
	/* Style the range inputs to work together as a dual-range slider */
	:global(.range-slider-container) {
		position: relative;
		height: 1.5rem;
	}

	/* Ensure both range inputs are positioned absolutely and overlap */
	:global(.range-slider-container input[type='range']) {
		position: absolute;
		width: 100%;
		pointer-events: auto;
		background: transparent;
		-webkit-appearance: none;
		appearance: none;
	}

	/* Make the first input (min) appear above the second (max) */
	:global(.range-slider-container input[type='range']:first-of-type) {
		z-index: 2;
	}

	:global(.range-slider-container input[type='range']:last-of-type) {
		z-index: 1;
	}

	/* Style the thumb for both inputs */
	:global(.range-slider-container input[type='range']::-webkit-slider-thumb) {
		-webkit-appearance: none;
		appearance: none;
		pointer-events: all;
		cursor: pointer;
	}

	:global(.range-slider-container input[type='range']::-moz-range-thumb) {
		pointer-events: all;
		cursor: pointer;
		border: none;
	}
</style>
