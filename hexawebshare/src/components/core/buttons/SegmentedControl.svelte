<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Button from './Button.svelte';

	interface SegmentOption {
		value: string | number;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		options: SegmentOption[];
		value?: string | number;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		disabled?: boolean;
		name?: string;
		onchange?: (value: string | number) => void;
		class?: string;
	}

	let {
		options = [],
		value = $bindable(),
		size = 'md',
		disabled = false,
		name,
		onchange,
		class: className = '',
		...props
	}: Props = $props();

	function handleClick(optionValue: string | number) {
		if (disabled) return;
		if (value !== optionValue) {
			value = optionValue;
			onchange?.(value);
		}
	}

	// Determine which option should be focusable (only one at a time)
	let focusableIndex = $derived.by(() => {
		// If a value is selected, that's the focusable one
		const selectedIndex = options.findIndex((opt) => opt.value === value);
		if (selectedIndex !== -1) return selectedIndex;

		// Otherwise, first non-disabled option
		const firstEnabledIndex = options.findIndex((opt) => !opt.disabled);
		return firstEnabledIndex !== -1 ? firstEnabledIndex : 0;
	});
</script>

<div class="join {className}" role="radiogroup" {...props}>
	{#if name}
		<!-- 
			NOTE: Raw HTML input is intentional here.
			This hidden input is used solely for form submission and has no visual/interactive behavior.
			Using the Input component would add unnecessary overhead (labels, validation, styling, etc.).
			Component composition applies to user-facing elements, not form utilities.
		-->
		<input type="hidden" {name} {value} />
	{/if}
	{#each options as option, index}
		<Button
			label={option.label}
			{size}
			variant={value === option.value ? 'primary' : undefined}
			disabled={disabled || option.disabled}
			onclick={() => handleClick(option.value)}
			class="join-item {value === option.value ? 'btn-active' : ''}"
			role="radio"
			aria-checked={value === option.value}
			aria-disabled={disabled || option.disabled}
			tabindex={disabled || option.disabled ? -1 : index === focusableIndex ? 0 : -1}
		/>
	{/each}
</div>
