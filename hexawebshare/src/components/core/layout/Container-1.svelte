<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		maxWidth?:
			| 'xs'
			| 'sm'
			| 'md'
			| 'lg'
			| 'xl'
			| '2xl'
			| '3xl'
			| '4xl'
			| '5xl'
			| '6xl'
			| '7xl'
			| 'full'
			| 'none';
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		centered?: boolean;
		fluid?: boolean;
		responsive?: boolean;
		className?: string;
	}

	const {
		children,
		maxWidth = 'lg',
		padding = 'md',
		centered = true,
		fluid = false,
		responsive = true,
		className = '',
		...props
	}: Props = $props();

	let containerClasses = $derived(
		[
			// Base container class
			fluid ? 'w-full' : 'container',
			// Max width classes
			!fluid && maxWidth === 'xs' && 'max-w-xs',
			!fluid && maxWidth === 'sm' && 'max-w-sm',
			!fluid && maxWidth === 'md' && 'max-w-md',
			!fluid && maxWidth === 'lg' && 'max-w-lg',
			!fluid && maxWidth === 'xl' && 'max-w-xl',
			!fluid && maxWidth === '2xl' && 'max-w-2xl',
			!fluid && maxWidth === '3xl' && 'max-w-3xl',
			!fluid && maxWidth === '4xl' && 'max-w-4xl',
			!fluid && maxWidth === '5xl' && 'max-w-5xl',
			!fluid && maxWidth === '6xl' && 'max-w-6xl',
			!fluid && maxWidth === '7xl' && 'max-w-7xl',
			!fluid && maxWidth === 'full' && 'max-w-full',
			!fluid && maxWidth === 'none' && 'max-w-none',
			// Padding classes
			padding === 'xs' && 'px-2 py-1',
			padding === 'sm' && 'px-4 py-2',
			padding === 'md' && 'px-6 py-4',
			padding === 'lg' && 'px-8 py-6',
			padding === 'xl' && 'px-10 py-8',
			padding === '2xl' && 'px-12 py-10',
			// Centering
			centered && 'mx-auto',
			// Responsive padding
			responsive && padding !== 'none' && 'sm:px-6 lg:px-8',
			// Custom className
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={containerClasses} role="region" aria-label="Content container" {...props}>
	{@render children()}
</div>
