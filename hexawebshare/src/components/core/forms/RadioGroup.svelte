<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Label from '../data-display/Label.svelte';
	import Text from '../typography/Text.svelte';
	import Spinner from '../feedback/Spinner.svelte';

	/**
	 * Option type for radio options
	 */
	export type RadioOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	/**
	 * Props interface for the RadioGroup component
	 * 
	 * NOTE: RadioGroup is designed for single-selection scenarios only.
	 * By HTML specification, radio buttons with the same 'name' attribute
	 * allow only ONE option to be selected at a time. This is NOT a bug.
	 * 
	 * For multiple selections, use the Checkbox component instead.
	 */
	interface Props {
		/**
		 * Selected value (controlled)
		 */
		value?: string;
		/**
		 * Options array - can be array of strings or array of RadioOption objects
		 */
		options: string[] | RadioOption[];
		/**
		 * Color variant of the radio buttons
		 * @default undefined (default DaisyUI radio style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Size of the radio buttons
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * HTML name attribute for form submission (required for radio groups)
		 */
		name: string;
		/**
		 * Label text for the radio group
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
		 * Whether the radio group is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the radio group is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Whether the radio group is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * HTML id attribute
		 */
		id?: string;
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
		 * Accessible label for loading state
		 * @default 'Loading'
		 */
		loadingLabel?: string;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		value,
		options,
		variant,
		size = 'md',
		name,
		label,
		error,
		helpText,
		disabled = false,
		required = false,
		loading = false,
		id,
		ariaLabel,
		ariaDescribedby,
		requiredLabel = 'required',
		loadingLabel = 'Loading',
		onchange,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let groupId = $derived(id || `radio-group-${Math.random().toString(36).substring(2, 11)}`);
	let labelId = $derived(`${groupId}-label`);
	let errorId = $derived(`${groupId}-error`);
	let helpTextId = $derived(`${groupId}-help`);

	// Normalize options to RadioOption format
	let normalizedOptions = $derived(
		options.map((option) => {
			if (typeof option === 'string') {
				return { value: option, label: option, disabled: false };
			}
			return option;
		})
	);

	// Check if there's an error
	let hasError = $derived(error !== undefined && error !== '');

	// Radio classes using static DaisyUI classes for JIT compilation
	// Apply error variant automatically when there's an error
	let radioClasses = $derived(
		[
			'radio',
			// Error state overrides variant
			hasError && 'radio-error',
			!hasError && variant === 'primary' && 'radio-primary',
			!hasError && variant === 'secondary' && 'radio-secondary',
			!hasError && variant === 'accent' && 'radio-accent',
			!hasError && variant === 'info' && 'radio-info',
			!hasError && variant === 'success' && 'radio-success',
			!hasError && variant === 'warning' && 'radio-warning',
			!hasError && variant === 'error' && 'radio-error',
			size === 'xs' && 'radio-xs',
			size === 'sm' && 'radio-sm',
			size === 'md' && 'radio-md',
			size === 'lg' && 'radio-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Determine describedby for accessibility
	let describedBy = $derived(
		[ariaDescribedby, error && errorId, helpText && !error && helpTextId]
			.filter(Boolean)
			.join(' ') || undefined
	);

	// Loading spinner size
	let spinnerSize = $derived(size);

	// Check if radio group should be disabled (either disabled prop or loading)
	let isDisabled = $derived(disabled || loading);
</script>

<div class="form-control w-full {className}">
	{#if label}
		<Label text={label} id={labelId} {required} {size} requiredAriaLabel={requiredLabel} />
	{/if}

	<div
		role="radiogroup"
		aria-labelledby={label ? labelId : undefined}
		aria-label={!label ? ariaLabel : undefined}
		aria-describedby={describedBy}
		aria-required={required}
		aria-invalid={hasError ? 'true' : undefined}
		aria-busy={loading}
		class="relative flex flex-col gap-2"
	>
		{#if loading}
			<div
				class="bg-base-100/80 absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center rounded-lg"
				role="status"
				aria-label={loadingLabel}
			>
				<Spinner size={spinnerSize} variant="primary" ariaLabel={loadingLabel} />
			</div>
		{/if}
		{#each normalizedOptions as option, index (option.value)}
			{@const optionId = `${groupId}-option-${index}`}
			<!-- 
				NOTE: Raw HTML label element used here.
				REASON: Native HTML <label> required for form semantics and click-to-focus behavior.
				The label wraps the radio input and clicking the label selects the radio.
				Text component properly used for the label text content.
			-->
			<label for={optionId} class="label cursor-pointer justify-start gap-4 pr-6">
				<input
					id={optionId}
					type="radio"
					{name}
					value={option.value}
					checked={value === option.value}
					disabled={isDisabled || option.disabled}
					class={radioClasses}
					{onchange}
					{...props}
				/>
				<Text text={option.label} size="sm" class="label-text" />
			</label>
		{/each}
	</div>

	{#if hasError}
		<!-- 
			NOTE: Raw HTML div element used for structural layout wrapper.
			Contains error message displayed with Text component.
		-->
		<div id={errorId} class="label" role="alert" aria-live="polite">
			<Text text={error} size="xs" variant="error" class="label-text-alt" />
		</div>
	{/if}

	{#if helpText && !hasError}
		<!-- 
			NOTE: Raw HTML div element used for structural layout wrapper.
			Contains help text displayed with Text component.
		-->
		<div id={helpTextId} class="label">
			<Text text={helpText} size="xs" variant="muted" class="label-text-alt" />
		</div>
	{/if}
</div>
