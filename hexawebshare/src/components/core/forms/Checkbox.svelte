<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
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
		ariaDescribedby?: string;
		onchange?: (event: Event) => void;
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
		ariaDescribedby,
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
			size === 'lg' && 'checkbox-lg'
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
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			{...props}
		/>
		<span class="label-text">{label}</span>
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
		aria-label={ariaLabel || 'Checkbox'}
		aria-describedby={ariaDescribedby}
		{...props}
	/>
{/if}
