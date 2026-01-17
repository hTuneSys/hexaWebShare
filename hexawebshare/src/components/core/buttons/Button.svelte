<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
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
		size?: 'xs' | 'sm' | 'md' | 'lg';
		label?: string;
		children?: Snippet;
		outline?: boolean;
		wide?: boolean;
		block?: boolean;
		glass?: boolean;
		disabled?: boolean;
		loading?: boolean;
		ariaLabel?: string;
		'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
		onclick?: () => void;
		onkeydown?: (event: KeyboardEvent) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		variant = 'primary',
		size = 'md',
		label,
		children,
		outline = false,
		wide = false,
		block = false,
		glass = false,
		disabled = false,
		loading = false,
		ariaLabel,
		'aria-current': ariaCurrent,
		class: className = '',
		...props
	}: Props = $props();

	let buttonClasses = $derived(
		[
			'btn',
			variant === 'primary' && 'btn-primary',
			variant === 'secondary' && 'btn-secondary',
			variant === 'accent' && 'btn-accent',
			variant === 'neutral' && 'btn-neutral',
			variant === 'info' && 'btn-info',
			variant === 'success' && 'btn-success',
			variant === 'warning' && 'btn-warning',
			variant === 'error' && 'btn-error',
			variant === 'ghost' && 'btn-ghost',
			variant === 'link' && 'btn-link',
			size === 'xs' && 'btn-xs',
			size === 'sm' && 'btn-sm',
			size === 'md' && 'btn-md',
			size === 'lg' && 'btn-lg',
			outline && 'btn-outline',
			wide && 'btn-wide',
			block && 'btn-block',
			glass && 'glass',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<button
	type="button"
	class={buttonClasses}
	{disabled}
	aria-label={ariaLabel}
	aria-current={ariaCurrent}
	{...props}
>
	{#if loading}
		<span class="loading loading-spinner"></span>
	{:else if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
</button>
