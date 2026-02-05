<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Text from '../typography/Text.svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		checked?: boolean;
		disabled?: boolean;
		indeterminate?: boolean;
		label?: string;
		name?: string;
		value?: string;
		required?: boolean;
		ariaLabel?: string;
		ariaLabelFallback?: string;
		ariaDescribedby?: string;
		tabindex?: number;
		class?: string;
		onchange?: (event: Event) => void;
		onclick?: (event: MouseEvent) => void;
	}

	const {
		variant,
		size = 'md',
		checked: checkedProp = false,
		disabled = false,
		indeterminate = false,
		label,
		name,
		value,
		required = false,
		ariaLabel,
		ariaLabelFallback = 'Checkbox',
		ariaDescribedby,
		tabindex,
		class: className = '',
		onchange,
		...props
	}: Props = $props();

	let checkboxElement = $state<HTMLInputElement | null>(null);
	let checked = $state(checkedProp);

	// Sync checked state with prop changes
	$effect(() => {
		checked = checkedProp;
	});

	// Handle change event
	const handleChange = (event: Event) => {
		checked = (event.target as HTMLInputElement).checked;
		onchange?.(event);
	};

	let checkboxClasses = $derived(
		[
			'checkbox',
			variant === 'primary' && 'checkbox-primary',
			variant === 'secondary' && 'checkbox-secondary',
			variant === 'accent' && 'checkbox-accent',
			variant === 'success' && 'checkbox-success',
			variant === 'warning' && 'checkbox-warning',
			variant === 'info' && 'checkbox-info',
			variant === 'error' && 'checkbox-error',
			size === 'xs' && 'checkbox-xs',
			size === 'sm' && 'checkbox-sm',
			size === 'md' && 'checkbox-md',
			size === 'lg' && 'checkbox-lg',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Map checkbox size to text size
	type TextSize = 'xs' | 'sm' | 'base' | 'lg';
	const sizeToTextSizeMap: Record<'xs' | 'sm' | 'md' | 'lg', TextSize> = {
		xs: 'xs',
		sm: 'sm',
		md: 'base',
		lg: 'lg'
	};

	let labelTextSize = $derived(sizeToTextSizeMap[size]);

	// Set indeterminate state when prop changes
	$effect(() => {
		if (checkboxElement) {
			checkboxElement.indeterminate = indeterminate;
		}
	});
</script>

{#if label}
	<!-- 
		NOTE: Raw HTML label element used here.
		REASON: Native HTML <label> required for form semantics and click-to-focus behavior.
		The label wraps the checkbox input and clicking the label toggles the checkbox.
		Text component properly used for the label text content.
	-->
	<label class="label cursor-pointer justify-start gap-2">
		<input
			bind:this={checkboxElement}
			type="checkbox"
			class={checkboxClasses}
			bind:checked
			{disabled}
			{name}
			{value}
			{required}
			{tabindex}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			onchange={handleChange}
			{...props}
		/>
		<Text text={label} size={labelTextSize} class="label-text" />
	</label>
{:else}
	<input
		bind:this={checkboxElement}
		type="checkbox"
		class={checkboxClasses}
		bind:checked
		{disabled}
		{name}
		{value}
		{required}
		{tabindex}
		aria-label={ariaLabel || ariaLabelFallback}
		aria-describedby={ariaDescribedby}
		onchange={handleChange}
		{...props}
	/>
{/if}
