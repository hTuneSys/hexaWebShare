<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		orientation?: 'horizontal' | 'vertical';
		gap?: 'xs' | 'sm' | 'md' | 'lg';
		ariaLabel?: string;
		ariaLabelledby?: string;
		responsive?: boolean;
	}

	const {
		children,
		orientation = 'horizontal',
		gap = 'sm',
		ariaLabel,
		ariaLabelledby,
		responsive = false,
		...props
	}: Props = $props();

	let groupClasses = $derived(
		[
			'flex',
			orientation === 'vertical' ? 'flex-col' : 'flex-row',
			gap === 'xs' && 'gap-1',
			gap === 'sm' && 'gap-2',
			gap === 'md' && 'gap-3',
			gap === 'lg' && 'gap-4',
			responsive && orientation === 'horizontal' && 'flex-col sm:flex-row',
			responsive && orientation === 'vertical' && 'flex-row sm:flex-col'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	class={groupClasses}
	role="group"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	{...props}
>
	{@render children()}
</div>
