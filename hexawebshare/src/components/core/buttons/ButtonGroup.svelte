<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical';
		gap?: 'xs' | 'sm' | 'md' | 'lg';
	}

	const { orientation = 'horizontal', gap = 'sm', ...props }: Props = $props();

	let groupClasses = $derived(
		[
			'flex',
			orientation === 'vertical' ? 'flex-col' : 'flex-row',
			gap === 'xs' && 'gap-1',
			gap === 'sm' && 'gap-2',
			gap === 'md' && 'gap-3',
			gap === 'lg' && 'gap-4'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={groupClasses} {...props}>
	<slot />
</div>
