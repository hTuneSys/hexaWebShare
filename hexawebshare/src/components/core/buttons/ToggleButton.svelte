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
		 * Default icon polygon points (used when no children and no label provided)
		 * @default '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
		 */
		defaultIconPoints?: string;
		/**
		 * Default icon width
		 * @default '20'
		 */
		defaultIconWidth?: string | number;
		/**
		 * Default icon height
		 * @default '20'
		 */
		defaultIconHeight?: string | number;
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
		defaultIconPoints = '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
		defaultIconWidth = '20',
		defaultIconHeight = '20',
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
	{:else if !label && defaultIconPoints}
		<!-- Default icon when no children and no label provided -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={defaultIconWidth}
			height={defaultIconHeight}
			viewBox="0 0 24 24"
			fill={pressed ? 'currentColor' : 'none'}
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polygon points={defaultIconPoints} />
		</svg>
	{/if}
</Button>
