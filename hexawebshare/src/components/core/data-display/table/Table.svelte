<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component Table

A comprehensive table component with sorting, selection, and customization options.

**Features:**
- Sortable columns with keyboard support
- Row selection
- Responsive design
- Loading and empty states
- Custom rendering via snippets
- Built with modular helper components

**Component Architecture:**
- Table.svelte: Main orchestrator component
- TableCaption.svelte: Caption rendering (uses Text component)
- TableHeader.svelte: Column headers (uses Text + Icon components)
- TableRow.svelte: Row rendering (uses TableCell components)
- TableCell.svelte: Cell content (uses Text component)
- TableFooter.svelte: Footer wrapper

All helper components use library primitives (Text, Icon, EmptyState, Spinner) for consistency.

**Example:**
```svelte
<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ]}
  data={users}
  zebra
  hover
/>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from '../../feedback/Spinner.svelte';
	import Text from '../../typography/Text.svelte';
	import EmptyState from '../EmptyState.svelte';
	import TableCaption from './TableCaption.svelte';
	import TableHeader from './TableHeader.svelte';
	import TableRow from './TableRow.svelte';
	import TableFooter from './TableFooter.svelte';

	/**
	 * Column definition for the Table component
	 */
	export interface TableColumn<T = Record<string, unknown>> {
		/**
		 * Unique identifier for the column
		 */
		key: string;
		/**
		 * Display label for the column header
		 */
		label: string;
		/**
		 * Whether the column is sortable
		 * @default false
		 */
		sortable?: boolean;
		/**
		 * Custom render function for cell content
		 */
		render?: (row: T, rowIndex: number) => string;
		/**
		 * Column alignment
		 * @default 'left'
		 */
		align?: 'left' | 'center' | 'right';
		/**
		 * Column width (CSS value)
		 */
		width?: string;
		/**
		 * Whether to hide this column on mobile
		 * @default false
		 */
		hideOnMobile?: boolean;
	}

	/**
	 * Sort direction type
	 */
	export type SortDirection = 'asc' | 'desc' | null;

	/**
	 * Sort state for the table
	 */
	export interface SortState {
		column: string | null;
		direction: SortDirection;
	}

	/**
	 * Props interface for the Table component
	 */
	interface Props<T = Record<string, unknown>> {
		/**
		 * Column definitions
		 */
		columns: TableColumn<T>[];
		/**
		 * Data rows to display
		 */
		data: T[];
		/**
		 * Size variant of the table
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Enable zebra striped rows
		 * @default false
		 */
		zebra?: boolean;
		/**
		 * Pin the first row (header)
		 * @default false
		 */
		pinRows?: boolean;
		/**
		 * Pin the first column
		 * @default false
		 */
		pinCols?: boolean;
		/**
		 * Enable hover effect on rows
		 * @default true
		 */
		hover?: boolean;
		/**
		 * Make the table compact
		 * @default false
		 */
		compact?: boolean;
		/**
		 * Whether the table is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether the table is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Show borders between cells
		 * @default false
		 */
		bordered?: boolean;
		/**
		 * Make the table responsive with horizontal scroll
		 * @default true
		 */
		responsive?: boolean;
		/**
		 * Current sort state
		 */
		sortState?: SortState;
		/**
		 * Callback when sort changes
		 */
		onsort?: (state: SortState) => void;
		/**
		 * Callback when a row is clicked
		 */
		onrowclick?: (row: T, index: number) => void;
		/**
		 * Whether rows are selectable
		 * @default false
		 */
		selectable?: boolean;
		/**
		 * Currently selected row indices
		 */
		selectedRows?: number[];
		/**
		 * Callback when selection changes
		 */
		onselect?: (selectedIndices: number[]) => void;
		/**
		 * Accessible caption for the table
		 */
		caption?: string;
		/**
		 * Hide caption visually but keep for screen readers
		 * @default false
		 */
		captionHidden?: boolean;
		/**
		 * Accessible description for the table
		 */
		ariaLabel?: string;
		/**
		 * Use EmptyState component for empty state instead of plain text
		 * @default false
		 */
		useEmptyStateComponent?: boolean;
		/**
		 * Custom empty state title (for EmptyState component)
		 * @default 'No Data'
		 */
		emptyStateTitle?: string;
		/**
		 * Custom empty state message
		 * @default 'No data available'
		 */
		emptyMessage?: string;
		/**
		 * Loading state aria label for screen readers
		 * @default 'Loading table data'
		 */
		loadingAriaLabel?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Custom header snippet
		 */
		header?: Snippet<[{ columns: TableColumn<T>[] }]>;
		/**
		 * Custom row snippet
		 */
		row?: Snippet<[{ row: T; index: number; columns: TableColumn<T>[] }]>;
		/**
		 * Custom empty state snippet
		 */
		empty?: Snippet;
		/**
		 * Custom loading state snippet
		 */
		loadingState?: Snippet;
		/**
		 * Footer snippet
		 */
		footer?: Snippet;
	}

	const {
		columns,
		data,
		size = 'md',
		zebra = false,
		pinRows = false,
		pinCols = false,
		hover = true,
		compact = false,
		loading = false,
		disabled = false,
		bordered = false,
		responsive = true,
		sortState = { column: null, direction: null },
		onsort,
		onrowclick,
		selectable = false,
		selectedRows = [],
		onselect,
		caption,
		captionHidden = false,
		ariaLabel,
		useEmptyStateComponent = false,
		emptyStateTitle = 'No Data',
		emptyMessage = 'No data available',
		loadingAriaLabel = 'Loading table data',
		class: className = '',
		header,
		row,
		empty,
		loadingState,
		footer,
		...props
	}: Props = $props();

	// Internal sort state for controlled/uncontrolled behavior
	let internalSortState = $state<SortState>({ column: null, direction: null });

	// Use external sort state if provided, otherwise use internal
	let currentSortState = $derived(sortState.column !== null ? sortState : internalSortState);

	// Table wrapper classes
	let wrapperClasses = $derived(
		[responsive && 'overflow-x-auto', disabled && 'opacity-50 pointer-events-none', className]
			.filter(Boolean)
			.join(' ')
	);

	// Table classes using static DaisyUI classes
	let tableClasses = $derived(
		[
			'table',
			size === 'xs' && 'table-xs',
			size === 'sm' && 'table-sm',
			size === 'md' && 'table-md',
			size === 'lg' && 'table-lg',
			zebra && 'table-zebra',
			pinRows && 'table-pin-rows',
			pinCols && 'table-pin-cols',
			hover && '[&_tbody_tr]:hover:bg-base-200',
			compact && 'table-xs',
			selectable && 'cursor-pointer',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Handle sort click
	function handleSortClick(column: TableColumn): void {
		if (!column.sortable || disabled) return;

		let newDirection: SortDirection = 'asc';
		if (currentSortState.column === column.key) {
			if (currentSortState.direction === 'asc') {
				newDirection = 'desc';
			} else if (currentSortState.direction === 'desc') {
				newDirection = null;
			}
		}

		const newState: SortState = {
			column: newDirection ? column.key : null,
			direction: newDirection
		};

		// Update internal state if not controlled
		if (sortState.column === null) {
			internalSortState = newState;
		}

		onsort?.(newState);
	}

	// Handle row click
	function handleRowClick(rowData: Record<string, unknown>, index: number): void {
		if (disabled) return;
		onrowclick?.(rowData, index);

		if (selectable) {
			const newSelection = selectedRows.includes(index)
				? selectedRows.filter((i) => i !== index)
				: [...selectedRows, index];
			onselect?.(newSelection);
		}
	}

	// Handle keyboard navigation for rows
	function handleRowKeyDown(
		event: KeyboardEvent,
		rowData: Record<string, unknown>,
		index: number
	): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleRowClick(rowData, index);
		}
	}

	// Handle keyboard navigation for sort headers
	function handleSortKeyDown(event: KeyboardEvent, column: TableColumn): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleSortClick(column);
		}
	}

	// Check if table is empty
	let isEmpty = $derived(data.length === 0);

	// Map table size to spinner size
	let spinnerSize = $derived<'xs' | 'sm' | 'md' | 'lg'>(
		size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'
	);
</script>

<!-- 
  NOTE: Raw HTML div and table elements are structural.
  REASON: Required for DaisyUI table patterns and responsive scrolling.
  All content (text, icons, etc.) uses library components via helpers.
-->

<div class={wrapperClasses} {...props}>
	<table
		class={tableClasses}
		aria-label={ariaLabel}
		aria-busy={loading}
		aria-disabled={disabled}
		role="grid"
	>
		{#if caption}
			<TableCaption text={caption} hidden={captionHidden} />
		{/if}

		<thead>
			{#if header}
				{@render header({ columns })}
			{:else}
				<tr>
					{#each columns as column (column.key)}
						<TableHeader
							{column}
							sortColumn={currentSortState.column}
							sortDirection={currentSortState.direction}
							{bordered}
							onsortclick={() => handleSortClick(column)}
							onsortkeydown={(e) => handleSortKeyDown(e, column)}
						/>
					{/each}
				</tr>
			{/if}
		</thead>

		<tbody>
			{#if loading}
				{#if loadingState}
					{@render loadingState()}
				{:else}
					<tr>
						<td colspan={columns.length} class="py-8 text-center">
							<Spinner size={spinnerSize} ariaLabel={loadingAriaLabel} />
						</td>
					</tr>
				{/if}
			{:else if isEmpty}
				{#if empty}
					{@render empty()}
				{:else if useEmptyStateComponent}
					<tr>
						<td colspan={columns.length} class="py-8">
							<EmptyState title={emptyStateTitle} description={emptyMessage} />
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan={columns.length} class="py-8 text-center">
							<Text text={emptyMessage} class="text-base-content/70" />
						</td>
					</tr>
				{/if}
			{:else}
				{#each data as rowData, index (index)}
					{#if row}
						{@render row({ row: rowData, index, columns })}
					{:else}
						<TableRow
							row={rowData}
							{index}
							{columns}
							{hover}
							{selectable}
							selected={selectedRows.includes(index)}
							{bordered}
							onclick={() => handleRowClick(rowData, index)}
							onkeydown={(e) => handleRowKeyDown(e, rowData, index)}
						/>
					{/if}
				{/each}
			{/if}
		</tbody>

		<TableFooter>{footer}</TableFooter>
	</table>
</div>
