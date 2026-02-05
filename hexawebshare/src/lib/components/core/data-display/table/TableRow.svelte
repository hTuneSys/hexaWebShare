<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component TableRow

Internal helper component for rendering table rows with cells.
Uses TableCell component for consistent cell rendering.

**Purpose:**
- Renders table rows with proper accessibility
- Uses TableCell component for consistent content
- Handles click, keyboard navigation, and selection states
- Maintains DaisyUI table structure

**Usage:**
This component is internal to the Table module and should not be used directly.
-->

<script lang="ts">
	import type { TableColumn } from './Table.svelte';
	import TableCell from './TableCell.svelte';

	interface Props {
		/**
		 * Row data
		 */
		row: Record<string, unknown>;
		/**
		 * Row index
		 */
		index: number;
		/**
		 * Table columns
		 */
		columns: TableColumn[];
		/**
		 * Enable hover effect
		 */
		hover?: boolean;
		/**
		 * Row is selectable
		 */
		selectable?: boolean;
		/**
		 * Row is selected
		 */
		selected?: boolean;
		/**
		 * Show borders
		 */
		bordered?: boolean;
		/**
		 * Click handler
		 */
		onclick?: () => void;
		/**
		 * Keyboard handler
		 */
		onkeydown?: (event: KeyboardEvent) => void;
	}

	const {
		row,
		index,
		columns,
		hover = false,
		selectable = false,
		selected = false,
		bordered = false,
		onclick,
		onkeydown
	}: Props = $props();

	// Row classes
	let rowClasses = $derived(
		[hover && 'hover', selectable && 'cursor-pointer', selected && 'bg-base-200']
			.filter(Boolean)
			.join(' ')
	);

	// Get cell value from row using column key
	function getCellValue(rowData: Record<string, unknown>, column: TableColumn): string {
		if (column.render) {
			return column.render(rowData, index);
		}
		const value = rowData[column.key];
		if (value === null || value === undefined) return '';
		return String(value);
	}
</script>

<tr
	class={rowClasses}
	tabindex={selectable || onclick ? 0 : undefined}
	role={selectable ? 'row' : undefined}
	aria-selected={selectable ? selected : undefined}
	{onclick}
	{onkeydown}
>
	{#each columns as column (column.key)}
		<TableCell
			content={getCellValue(row, column)}
			align={column.align}
			hideOnMobile={column.hideOnMobile}
			{bordered}
		/>
	{/each}
</tr>
