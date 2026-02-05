<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	/**
	 * Props interface for the ToggleButton component
	 */
	interface Props {
		/**
		 * Whether the button is pressed/active
		 * @default false
		 */
		pressed?: boolean;
		/**
		 * Variant style of the button
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
			| 'error'
			| 'ghost'
			| 'link';
		/**
		 * Size of the button
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Button label text
		 */
		label?: string;
		/**
		 * Whether to use outline style
		 * @default false
		 */
		outline?: boolean;
		/**
		 * Whether button spans full width
		 * @default false
		 */
		wide?: boolean;
		/**
		 * Whether button spans full width of container
		 * @default false
		 */
		block?: boolean;
		/**
		 * Whether to use glass effect
		 * @default false
		 */
		glass?: boolean;
		/**
		 * Whether the button is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the button is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Custom content (icon, etc.) - if provided, label will be ignored
		 */
		children?: Snippet;
		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;
		/**
		 * Callback when button is clicked/toggled
		 */
		onclick?: (pressed: boolean) => void;
		/**
		 * Custom class for button
		 */
		class?: string;
	}

	let {
		pressed = $bindable(false),
		variant = 'primary',
		size = 'md',
		label,
		outline = false,
		wide = false,
		block = false,
		glass = false,
		disabled = false,
		loading = false,
		children,
		ariaLabel,
		onclick,
		class: className = '',
		...props
	}: Props = $props();

	// Handle button click/toggle
	function handleClick() {
		if (disabled || loading) return;
		pressed = !pressed;
		if (onclick) {
			onclick(pressed);
		}
	}
</script>

<Button
	{variant}
	{size}
	{label}
	{outline}
	{wide}
	{block}
	{glass}
	{disabled}
	{loading}
	ariaLabel={ariaLabel || label}
	aria-pressed={pressed}
	class="{pressed ? 'btn-active' : ''} {className}"
	onclick={handleClick}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</Button>
