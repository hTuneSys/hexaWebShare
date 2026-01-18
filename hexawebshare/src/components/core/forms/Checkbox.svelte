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
		checked = false,
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
		...props
	}: Props = $props();

	let checkboxElement = $state<HTMLInputElement | null>(null);

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
			{checked}
			{disabled}
			{name}
			{value}
			{required}
			{tabindex}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			{...props}
		/>
		<Text text={label} size="sm" class="label-text" />
	</label>
{:else}
	<input
		bind:this={checkboxElement}
		type="checkbox"
		class={checkboxClasses}
		{checked}
		{disabled}
		{name}
		{value}
		{required}
		{tabindex}
		aria-label={ariaLabel || ariaLabelFallback}
		aria-describedby={ariaDescribedby}
		{...props}
	/>
{/if}
