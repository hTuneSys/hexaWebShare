<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import ButtonGroup from './ButtonGroup.svelte';
	import Button from './Button.svelte';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		gap?: 'xs' | 'sm' | 'md' | 'lg';
		buttons: Array<{
			label: string;
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
			disabled?: boolean;
		}>;
	}

	const { orientation = 'horizontal', gap = 'sm', buttons }: Props = $props();
</script>

<ButtonGroup {orientation} {gap}>
	{#snippet children()}
		{#each buttons as button}
			<Button
				label={button.label}
				variant={button.variant || 'primary'}
				size={button.size || 'md'}
				disabled={button.disabled || false}
			/>
		{/each}
	{/snippet}
</ButtonGroup>
