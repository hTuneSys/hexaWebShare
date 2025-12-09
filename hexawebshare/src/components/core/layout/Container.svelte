<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		maxWidth?:
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
			| 'screen';
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		centered?: boolean;
		fluid?: boolean;
		class?: string;
	}

	const {
		maxWidth = 'xl',
		padding = 'md',
		centered = true,
		fluid = false,
		class: className = '',
		...restProps
	}: Props = $props();

	let containerClasses = $derived(
		[
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
			!fluid && maxWidth === 'screen' && 'max-w-screen-xl',
			centered && !fluid && 'mx-auto',
			padding === 'none' && 'p-0',
			padding === 'xs' && 'p-2',
			padding === 'sm' && 'p-4',
			padding === 'md' && 'p-6',
			padding === 'lg' && 'p-8',
			padding === 'xl' && 'p-12',
			'w-full',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={containerClasses} {...restProps}>
	<slot />
</div>
