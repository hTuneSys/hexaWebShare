<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/**
	 * Marker type used to render tick marks below the slider.
	 */
	interface SliderMark {
		value: number;
		label?: string;
	}

	/**
	 * Props for the Slider component.
	 */
	interface Props {
		/**
		 * Current value of the slider.
		 * @default 50
		 */
		value?: number;
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
		 * Show the current value next to the slider.
		 * @default false
		 */
		showValue?: boolean;
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
		marks?: SliderMark[];
		/**
		 * Number of auto-generated marks (only used when marks prop is empty).
		 * @default 5
		 */
		markCount?: number;
		/**
		 * Accessible label for screen readers.
		 * @default 'Slider'
		 */
		ariaLabel?: string;
		/**
		 * Unique identifier for the input.
		 */
		id?: string;
		/**
		 * Name attribute for form submissions.
		 */
		name?: string;
		/**
		 * Additional CSS classes for the input.
		 */
		class?: string;
	}

	const dispatch = createEventDispatcher<{
		change: number;
		input: number;
	}>();

	let {
		value = $bindable(50),
		min = 0,
		max = 100,
		step = 1,
		size = 'md',
		variant = 'primary',
		label,
		helpText,
		error,
		required = false,
		showValue = false,
		loading = false,
		disabled = false,
		marks = [],
		markCount = 5,
		ariaLabel = 'Slider',
		id,
		name,
		class: className = '',
		...props
	}: Props = $props();

	// Clamp the value when it changes
	$effect(() => {
		const clamped = Math.min(Math.max(value, min), max);
		if (clamped !== value) {
			value = clamped;
		}
	});

	const sliderId =
		id || `slider-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 9)}`;

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

	let valueLabel = $derived(`${value}`);

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = Number(target.value);
		dispatch('input', value);
	}

	function handleChange(event: Event) {
		dispatch('change', value);
	}

	function generateDefaultMarks(minValue: number, maxValue: number, count: number): SliderMark[] {
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
				{label}
				{#if required}
					<span class="text-error" aria-label="required">*</span>
				{/if}
			</span>
			{#if showValue}
				<span class="label-text-alt text-sm font-semibold">{valueLabel}</span>
			{/if}
		</label>
	{/if}

	<div class="relative flex items-center gap-3">
		<input
			id={sliderId}
			type="range"
			class={sliderClasses}
			{min}
			{max}
			{step}
			{name}
			aria-label={ariaLabel}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			aria-invalid={Boolean(error && error !== '')}
			aria-describedby={describedById}
			aria-busy={loading}
			{value}
			{disabled}
			oninput={handleInput}
			onchange={handleChange}
			{...props}
		/>
		{#if showValue && !label}
			<span class="min-w-[3rem] text-right text-sm font-semibold">{valueLabel}</span>
		{/if}
		{#if loading}
			<span
				class="loading loading-spinner loading-sm text-primary absolute top-1/2 right-0 -translate-y-1/2"
			></span>
		{/if}
	</div>

	{#if derivedMarks.length > 0}
		<div class="text-base-content/70 relative mt-1 h-8 text-xs" aria-hidden="true">
			{#each derivedMarks as mark (mark.value)}
				<div
					class="absolute flex -translate-x-1/2 flex-col items-center gap-1"
					style="left: {((mark.value - min) / (max - min)) * 100}%"
				>
					<span class="bg-base-content/40 h-2 w-px"></span>
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
