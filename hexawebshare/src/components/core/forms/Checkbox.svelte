<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		label?: string;
		checked?: boolean;
		indeterminate?: boolean;
		variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		disabled?: boolean;
		required?: boolean;
		error?: boolean;
		errorMessage?: string;
		id?: string;
		name?: string;
		value?: string;
		onchange?: (event: Event) => void;
		onchecked?: (checked: boolean) => void;
		class?: string;
	}

	const {
		label,
		checked = false,
		indeterminate = false,
		variant = 'primary',
		size = 'md',
		disabled = false,
		required = false,
		error = false,
		errorMessage,
		id,
		name,
		value,
		onchange,
		onchecked,
		class: className = '',
		...restProps
	}: Props = $props();

	let isChecked = $state(checked);
	let isIndeterminate = $state(indeterminate);

	// Sync with external checked prop changes
	$effect(() => {
		isChecked = checked;
	});

	$effect(() => {
		isIndeterminate = indeterminate;
	});

	let checkboxClasses = $derived(
		[
			'checkbox',
			variant === 'primary' && 'checkbox-primary',
			variant === 'secondary' && 'checkbox-secondary',
			variant === 'accent' && 'checkbox-accent',
			variant === 'success' && 'checkbox-success',
			variant === 'warning' && 'checkbox-warning',
			variant === 'error' && 'checkbox-error',
			variant === 'info' && 'checkbox-info',
			size === 'xs' && 'checkbox-xs',
			size === 'sm' && 'checkbox-sm',
			size === 'md' && 'checkbox-md',
			size === 'lg' && 'checkbox-lg',
			error && 'checkbox-error',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	let labelClasses = $derived(
		['label', 'cursor-pointer', disabled && 'cursor-not-allowed', 'gap-2'].filter(Boolean).join(' ')
	);

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		isChecked = target.checked;
		isIndeterminate = false;

		if (onchange) {
			onchange(event);
		}

		if (onchecked) {
			onchecked(isChecked);
		}
	}

	// Generate unique ID if not provided
	const generatedId = `checkbox-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
	let checkboxId = $derived(id || generatedId);

	let checkboxElement: HTMLInputElement;

	// Handle indeterminate state
	$effect(() => {
		if (checkboxElement) {
			checkboxElement.indeterminate = isIndeterminate;
		}
	});
</script>

<label class={labelClasses} for={checkboxId}>
	<input
		bind:this={checkboxElement}
		type="checkbox"
		id={checkboxId}
		class={checkboxClasses}
		{name}
		{value}
		checked={isChecked}
		{disabled}
		{required}
		onchange={handleChange}
		{...restProps}
	/>
	{#if label}
		<span class="label-text">{label}</span>
	{/if}
	{#if required && !label}
		<span class="label-text text-error">*</span>
	{/if}
</label>

{#if error && errorMessage}
	<div class="label">
		<span class="label-text-alt text-error">{errorMessage}</span>
	</div>
{/if}

<style>
	:global(input[type='checkbox']) {
		cursor: pointer;
	}

	:global(input[type='checkbox']:disabled) {
		cursor: not-allowed;
	}
</style>
