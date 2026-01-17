<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Checkbox from '../../core/forms/Checkbox.svelte';
	import ListItem from '../../core/data-display/ListItem.svelte';
	import StatusDot from '../../core/data-display/StatusDot.svelte';
	import type { Snippet } from 'svelte';

	interface LegendItem {
		id: string | number;
		label: string;
		color?: string;
		visible?: boolean;
	}

	interface Props {
		items: LegendItem[];
		customTrigger?: Snippet;
		triggerLabel?: string;
		position?: 'bottom' | 'top' | 'left' | 'right';
		align?: 'start' | 'end';
		onItemClick?: (item: LegendItem, index: number) => void;
		onVisibilityToggle?: (item: LegendItem, index: number) => void;
		class?: string;
	}

	const {
		items,
		customTrigger,
		triggerLabel,
		position,
		align,
		onItemClick,
		onVisibilityToggle,
		class: className = '',
		...props
	}: Props = $props();

	function handleItemClick(item: LegendItem, index: number) {
		onItemClick?.(item, index);
	}

	function handleVisibilityToggle(item: LegendItem, index: number, event: Event) {
		event.stopPropagation();
		onVisibilityToggle?.(item, index);
	}
</script>

<Dropdown {position} {align} class={className} {...props}>
	{#snippet trigger()}
		{#if customTrigger}
			{@render customTrigger()}
		{:else if triggerLabel}
			<Button variant="ghost" size="sm" label={triggerLabel} />
		{/if}
	{/snippet}

	{#snippet children()}
		{#each items as item, index (item.id)}
			<ListItem
				label={item.label}
				size="sm"
				hoverable={true}
				onclick={() => handleItemClick(item, index)}
			>
				{#snippet leading()}
					{#if item.color}
						<span
							class="h-3 w-3 flex-shrink-0 rounded-full"
							style="background-color: {item.color};"
							aria-label="Color indicator for {item.label}"
							role="presentation"
						></span>
					{/if}
				{/snippet}
				{#snippet trailing()}
					{#if item.visible !== undefined}
						<Checkbox
							checked={item.visible}
							size="xs"
							ariaLabel="Toggle visibility for {item.label}"
							onchange={(e: Event) => handleVisibilityToggle(item, index, e)}
						/>
					{/if}
				{/snippet}
			</ListItem>
		{/each}
	{/snippet}
</Dropdown>
