<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component TableHeader

Internal helper component for rendering table column headers.
Uses Text and Icon components for consistent rendering.

**Purpose:**
- Renders sortable/non-sortable column headers
- Uses Text component for header labels
- Uses Icon component for sort indicators
- Handles keyboard accessibility for sortable columns

**Usage:**
This component is internal to the Table module and should not be used directly.
-->

<script lang="ts">
	import type { TableColumn, SortDirection } from './Table.svelte';
	import Text from '../../typography/Text.svelte';
	import Icon from '../../media/Icon.svelte';

	interface Props {
		/**
		 * Column definition
		 */
		column: TableColumn;
		/**
		 * Current sort column key
		 */
		sortColumn: string | null;
		/**
		 * Current sort direction
		 */
		sortDirection: SortDirection;
		/**
		 * Show borders
		 */
		bordered?: boolean;
		/**
		 * Sort click handler
		 */
		onsortclick?: () => void;
		/**
		 * Sort keydown handler
		 */
		onsortkeydown?: (event: KeyboardEvent) => void;
	}

	const {
		column,
		sortColumn,
		sortDirection,
		bordered = false,
		onsortclick,
		onsortkeydown
	}: Props = $props();

	// Cell alignment class
	let alignmentClass = $derived(
		column.align === 'center'
			? 'text-center'
			: column.align === 'right'
				? 'text-right'
				: 'text-left'
	);

	// Header cell classes
	let headerClasses = $derived(
		[
			alignmentClass,
			column.hideOnMobile && 'hidden sm:table-cell',
			column.sortable && 'cursor-pointer select-none',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Get sort icon name
	let sortIconName = $derived((): string => {
		if (!column.sortable) return '';
		if (sortColumn !== column.key) return 'arrows-up-down';
		if (sortDirection === 'asc') return 'arrow-up';
		if (sortDirection === 'desc') return 'arrow-down';
		return 'arrows-up-down';
	});

	// Get aria-sort value
	let ariaSort = $derived(
		(): 'ascending' | 'descending' | 'none' | undefined => {
			if (!column.sortable) return undefined;
			if (sortColumn !== column.key) return 'none';
			if (sortDirection === 'asc') return 'ascending';
			if (sortDirection === 'desc') return 'descending';
			return 'none';
		}
	);
</script>

<!-- 
  NOTE: Raw HTML span element used for structural layout.
  REASON: Flexbox container for header content alignment (no semantic meaning).
  Text and Icon components properly used for content rendering.
-->

<th
	class={headerClasses}
	style={column.width ? `width: ${column.width}` : undefined}
	scope="col"
	aria-sort={ariaSort()}
	tabindex={column.sortable ? 0 : undefined}
	role="columnheader"
	onclick={onsortclick}
	onkeydown={onsortkeydown}
>
	<span class="inline-flex items-center gap-1">
		<Text text={column.label} weight="medium" />
		{#if column.sortable}
			<Icon name={sortIconName()} size="sm" class="text-base-content/50" ariaHidden={true} />
		{/if}
	</span>
</th>
