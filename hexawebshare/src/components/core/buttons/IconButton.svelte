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
		circle?: boolean;
		square?: boolean;
		outline?: boolean;
		glass?: boolean;
		disabled?: boolean;
		loading?: boolean;
		ariaLabel?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	const {
		variant = 'primary',
		size = 'md',
		circle = false,
		square = false,
		outline = false,
		glass = false,
		disabled = false,
		loading = false,
		ariaLabel,
		children,
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
			circle && 'btn-circle',
			square && 'btn-square',
			outline && 'btn-outline',
			glass && 'glass'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<button type="button" class={buttonClasses} {disabled} aria-label={ariaLabel} {...props}>
	{#if loading}
		<span class="loading loading-spinner"></span>
	{:else if children}
		{@render children()}
	{:else}
		<!-- Default icon when no children provided -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polygon
				points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
			/>
		</svg>
	{/if}
</button>
