<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Color variant for the divider
	 */
	type DividerVariant =
		| 'default'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';

	/**
	 * Orientation of the divider
	 */
	type DividerOrientation = 'horizontal' | 'vertical';

	/**
	 * Position of the text label within the divider
	 */
	type DividerPosition = 'start' | 'center' | 'end';

	interface Props {
		/**
		 * Orientation of the divider
		 * @default 'horizontal'
		 */
		orientation?: DividerOrientation;
		/**
		 * Color variant of the divider
		 * @default 'default'
		 */
		variant?: DividerVariant;
		/**
		 * Optional text label displayed on the divider
		 */
		label?: string;
		/**
		 * Position of the label text
		 * @default 'center'
		 */
		labelPosition?: DividerPosition;
		/**
		 * Custom slot content rendered on the divider
		 */
		children?: Snippet;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * Whether the divider is purely decorative (hidden from screen readers)
		 * @default true
		 */
		ariaHidden?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		orientation = 'horizontal',
		variant = 'default',
		label,
		labelPosition = 'center',
		children,
		ariaLabel,
		ariaHidden = true,
		class: className = '',
		...props
	}: Props = $props();

	const hasContent = $derived(!!label || !!children);

	let dividerClasses = $derived(
		[
			'divider',
			'my-0',
			orientation === 'vertical' && 'divider-vertical',
			labelPosition === 'start' && 'divider-start',
			labelPosition === 'end' && 'divider-end',
			variant === 'primary' && 'divider-primary',
			variant === 'secondary' && 'divider-secondary',
			variant === 'accent' && 'divider-accent',
			variant === 'neutral' && 'divider-neutral',
			variant === 'info' && 'divider-info',
			variant === 'success' && 'divider-success',
			variant === 'warning' && 'divider-warning',
			variant === 'error' && 'divider-error',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	const computedAriaHidden = $derived(ariaLabel ? false : ariaHidden);
	const role = $derived(computedAriaHidden ? undefined : 'separator');
	const ariaOrientation = $derived(computedAriaHidden ? undefined : orientation);
</script>

<div
	class={dividerClasses}
	{role}
	aria-orientation={ariaOrientation}
	aria-hidden={computedAriaHidden}
	aria-label={ariaLabel}
	{...props}
>
	{#if hasContent}
		{#if label}
			<span class="text-sm font-medium">{label}</span>
		{:else if children}
			{@render children()}
		{/if}
	{/if}
</div>
