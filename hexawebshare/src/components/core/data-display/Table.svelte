<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

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
		 * Custom empty state message
		 * @default 'No data available'
		 */
		emptyMessage?: string;
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
		emptyMessage = 'No data available',
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
			compact && 'table-compact',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Row classes with hover effect
	let getRowClasses = (index: number): string => {
		return [
			hover && 'hover',
			selectable && 'cursor-pointer',
			selectedRows.includes(index) && 'bg-base-200'
		]
			.filter(Boolean)
			.join(' ');
	};

	// Get cell alignment class
	let getAlignmentClass = (align: 'left' | 'center' | 'right' | undefined): string => {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right';
		return 'text-left';
	};

	// Get cell value from row using column key
	let getCellValue = (row: Record<string, unknown>, column: TableColumn): string => {
		if (column.render) {
			return column.render(row, data.indexOf(row));
		}
		const value = row[column.key];
		if (value === null || value === undefined) return '';
		return String(value);
	};

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

	// Get sort icon for column
	let getSortIcon = (column: TableColumn): string => {
		if (!column.sortable) return '';
		if (currentSortState.column !== column.key) return '↕';
		if (currentSortState.direction === 'asc') return '↑';
		if (currentSortState.direction === 'desc') return '↓';
		return '↕';
	};

	// Get aria-sort value for column
	let getAriaSort = (column: TableColumn): 'ascending' | 'descending' | 'none' | undefined => {
		if (!column.sortable) return undefined;
		if (currentSortState.column !== column.key) return 'none';
		if (currentSortState.direction === 'asc') return 'ascending';
		if (currentSortState.direction === 'desc') return 'descending';
		return 'none';
	};

	// Check if table is empty
	let isEmpty = $derived(data.length === 0);

	// Loading spinner size based on table size
	let spinnerSizeClass = $derived(
		size === 'xs'
			? 'loading-xs'
			: size === 'sm'
				? 'loading-sm'
				: size === 'md'
					? 'loading-md'
					: 'loading-lg'
	);
</script>

<div class={wrapperClasses} {...props}>
	<table
		class={tableClasses}
		aria-label={ariaLabel}
		aria-busy={loading}
		aria-disabled={disabled}
		role="grid"
	>
		{#if caption}
			<caption class={captionHidden ? 'sr-only' : 'caption-top py-2 text-base-content/70'}>
				{caption}
			</caption>
		{/if}

		<thead>
			{#if header}
				{@render header({ columns })}
			{:else}
				<tr>
					{#each columns as column (column.key)}
						<th
							class={[
								getAlignmentClass(column.align),
								column.hideOnMobile && 'hidden sm:table-cell',
								column.sortable && 'cursor-pointer select-none',
								bordered && 'border border-base-300'
							]
								.filter(Boolean)
								.join(' ')}
							style={column.width ? `width: ${column.width}` : undefined}
							scope="col"
							aria-sort={getAriaSort(column)}
							tabindex={column.sortable ? 0 : undefined}
							role={column.sortable ? 'columnheader button' : 'columnheader'}
							onclick={() => handleSortClick(column)}
							onkeydown={(e) => handleSortKeyDown(e, column)}
						>
							<span class="inline-flex items-center gap-1">
								{column.label}
								{#if column.sortable}
									<span class="text-base-content/50" aria-hidden="true">
										{getSortIcon(column)}
									</span>
								{/if}
							</span>
						</th>
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
							<span class="loading loading-spinner {spinnerSizeClass}" aria-hidden="true"></span>
							<span class="sr-only">Loading table data...</span>
						</td>
					</tr>
				{/if}
			{:else if isEmpty}
				{#if empty}
					{@render empty()}
				{:else}
					<tr>
						<td colspan={columns.length} class="py-8 text-center text-base-content/70">
							{emptyMessage}
						</td>
					</tr>
				{/if}
			{:else}
				{#each data as rowData, index (index)}
					{#if row}
						{@render row({ row: rowData, index, columns })}
					{:else}
						<tr
							class={getRowClasses(index)}
							tabindex={selectable || onrowclick ? 0 : undefined}
							role={selectable ? 'row' : undefined}
							aria-selected={selectable ? selectedRows.includes(index) : undefined}
							onclick={() => handleRowClick(rowData, index)}
							onkeydown={(e) => handleRowKeyDown(e, rowData, index)}
						>
							{#each columns as column (column.key)}
								<td
									class={[
										getAlignmentClass(column.align),
										column.hideOnMobile && 'hidden sm:table-cell',
										bordered && 'border border-base-300'
									]
										.filter(Boolean)
										.join(' ')}
								>
									{getCellValue(rowData, column)}
								</td>
							{/each}
						</tr>
					{/if}
				{/each}
			{/if}
		</tbody>

		{#if footer}
			<tfoot>
				{@render footer()}
			</tfoot>
		{/if}
	</table>
</div>
