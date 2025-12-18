<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the Toggle component
	 */
	interface Props {
		/**
		 * Color variant of the toggle
		 * @default undefined
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error';
		/**
		 * Size variant of the toggle
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether the toggle is checked
		 * @default false
		 */
		checked?: boolean;
		/**
		 * Whether the toggle is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Label text displayed next to the toggle
		 */
		label?: string;
		/**
		 * HTML name attribute for form submission
		 */
		name?: string;
		/**
		 * HTML value attribute for form submission
		 */
		value?: string;
		/**
		 * Whether the field is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * ARIA label for accessibility (used when label is not provided)
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute for additional accessibility information
		 */
		ariaDescribedby?: string;
		/**
		 * Change event handler
		 */
		onchange?: (event: Event) => void;
	}

	const {
		variant,
		size = 'md',
		checked: checkedProp = false,
		disabled = false,
		label,
		name,
		value,
		required = false,
		ariaLabel,
		ariaDescribedby,
		onchange,
		...props
	}: Props = $props();

	let toggleElement = $state<HTMLInputElement | null>(null);

	// Internal state for checked value
	let checked = $state(checkedProp);

	// Sync with prop changes
	$effect(() => {
		checked = checkedProp;
	});

	// Handle change event
	function handleChange(event: Event) {
		if (toggleElement) {
			checked = toggleElement.checked;
		}
		onchange?.(event);
	}

	// Toggle classes using static DaisyUI classes for JIT compilation
	let toggleClasses = $derived(
		[
			'toggle',
			variant === 'primary' && 'toggle-primary',
			variant === 'secondary' && 'toggle-secondary',
			variant === 'accent' && 'toggle-accent',
			variant === 'success' && 'toggle-success',
			variant === 'warning' && 'toggle-warning',
			variant === 'info' && 'toggle-info',
			variant === 'error' && 'toggle-error',
			size === 'xs' && 'toggle-xs',
			size === 'sm' && 'toggle-sm',
			size === 'md' && 'toggle-md',
			size === 'lg' && 'toggle-lg'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Force update classes when variant or size changes (for Storybook reactivity)
	$effect(() => {
		if (toggleElement) {
			// Access variant and size to track changes
			const currentVariant = variant;
			const currentSize = size;
			// Force class update by reassigning
			toggleElement.className = toggleClasses;
		}
	});
</script>

{#if label}
	<label class="label cursor-pointer justify-start gap-2">
		<input
			bind:this={toggleElement}
			type="checkbox"
			class={toggleClasses}
			{checked}
			{disabled}
			{name}
			{value}
			{required}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			onchange={handleChange}
			{...props}
		/>
		<span class="label-text">{label}</span>
	</label>
{:else}
	<input
		bind:this={toggleElement}
		type="checkbox"
		class={toggleClasses}
		{checked}
		{disabled}
		{name}
		{value}
		{required}
		aria-label={ariaLabel || 'Toggle'}
		aria-describedby={ariaDescribedby}
		onchange={handleChange}
		{...props}
	/>
{/if}
