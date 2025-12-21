<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
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

	// Explicit static DaisyUI classes mapping
	let sizeClass = $derived(
		size === 'xs' ? 'btn-xs' : size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '' // md is default
	);
</script>

<div class="join {className}" role="radiogroup" {...props}>
	{#if name}
		<input type="hidden" {name} {value} />
	{/if}
	{#each options as option}
		<button
			type="button"
			role="radio"
			aria-checked={value === option.value}
			aria-disabled={disabled || option.disabled}
			tabindex={disabled || option.disabled
				? -1
				: value === option.value || (!value && option === options[0])
					? 0
					: -1}
			class="btn join-item {sizeClass} {value === option.value ? 'btn-primary btn-active' : ''}"
			disabled={disabled || option.disabled}
			onclick={() => handleClick(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>
