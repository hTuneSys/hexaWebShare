<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component DataTable

An advanced data table component for admin CRUD operations with sorting, selection, 
pagination, and row actions.

**Features:**
- Column-based data display with sorting
- Row selection with checkboxes
- Row actions via dropdown menu
- Pagination support
- Loading and empty states
- Responsive design
- Full accessibility support

**Uses Core Components:**
- Checkbox: Row selection
- Dropdown: Row actions menu
- Pagination: Page navigation
- EmptyState: No data display
- Spinner: Loading indicator
- Text: Text content

**Example:**
```svelte
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' }
  ]}
  data={users}
  selectable={true}
  paginated={true}
  pageSize={10}
  currentPage={1}
  totalItems={100}
/>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Checkbox from '../../core/forms/Checkbox.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import type { DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';
	import Pagination from '../../core/overlay-navigation/Pagination.svelte';
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Icon from '../../core/media/Icon.svelte';

	/**
	 * Column definition for DataTable
	 */
	export interface DataTableColumn<T = Record<string, unknown>> {
		/**
		 * Unique key identifier for the column
		 */
		key: string;
		/**
		 * Display label for the column header
		 */
		label: string;
		/**
		 * Whether the column is sortable
		 */
		sortable?: boolean;
		/**
		 * Column alignment
		 */
		align?: 'left' | 'center' | 'right';
		/**
		 * Column width (CSS value)
		 */
		width?: string;
		/**
		 * Whether to hide this column on mobile
		 */
		hideOnMobile?: boolean;
		/**
		 * Custom render function for cell content
		 */
		render?: (row: T, rowIndex: number) => string;
	}

	/**
	 * Action definition for row actions dropdown
	 */
	export interface DataTableAction<T = Record<string, unknown>> {
		/**
		 * Unique identifier for the action
		 */
		id: string;
		/**
		 * Display label for the action
		 */
		label: string;
		/**
		 * Optional icon for the action
		 */
		icon?: string;
		/**
		 * Action variant for styling
		 */
		variant?: 'default' | 'danger';
		/**
		 * Whether the action is disabled
		 */
		disabled?: boolean;
		/**
		 * Click handler for the action
		 */
		onClick: (row: T, rowIndex: number) => void;
	}

	/**
	 * Sort state for the table
	 */
	export interface DataTableSortState {
		/**
		 * Column key being sorted
		 */
		column: string | null;
		/**
		 * Sort direction
		 */
		direction: 'asc' | 'desc' | null;
	}

	/**
	 * Props interface for DataTable component
	 */
	interface Props<T = Record<string, unknown>> {
		/**
		 * Column definitions
		 */
		columns: DataTableColumn<T>[];
		/**
		 * Data rows to display
		 */
		data: T[];
		/**
		 * Row actions for dropdown menu
		 */
		actions?: DataTableAction<T>[];
		/**
		 * Enable row selection with checkboxes
		 */
		selectable?: boolean;
		/**
		 * Currently selected row indices
		 */
		selectedRows?: number[];
		/**
		 * Callback when selection changes
		 */
		onSelectionChange?: (selectedIndices: number[]) => void;
		/**
		 * Current sort state
		 */
		sortState?: DataTableSortState;
		/**
		 * Callback when sort changes
		 */
		onSortChange?: (sortState: DataTableSortState) => void;
		/**
		 * Enable pagination
		 */
		paginated?: boolean;
		/**
		 * Current page number (1-indexed)
		 */
		currentPage?: number;
		/**
		 * Number of items per page
		 */
		pageSize?: number;
		/**
		 * Total number of items (for server-side pagination)
		 */
		totalItems?: number;
		/**
		 * Callback when page changes
		 */
		onPageChange?: (page: number) => void;
		/**
		 * Callback when page size changes
		 */
		onPageSizeChange?: (pageSize: number) => void;
		/**
		 * Available page size options
		 */
		pageSizeOptions?: number[];
		/**
		 * Size variant of the table
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Enable zebra striped rows
		 */
		zebra?: boolean;
		/**
		 * Enable hover effect on rows
		 */
		hover?: boolean;
		/**
		 * Make the table compact
		 */
		compact?: boolean;
		/**
		 * Show borders between cells
		 */
		bordered?: boolean;
		/**
		 * Whether the table is in loading state
		 */
		loading?: boolean;
		/**
		 * Whether the table is disabled
		 */
		disabled?: boolean;
		/**
		 * Accessible label for the table
		 */
		ariaLabel?: string;
		/**
		 * Caption for the table
		 */
		caption?: string;
		/**
		 * Empty state title
		 */
		emptyStateTitle?: string;
		/**
		 * Empty state description
		 */
		emptyStateDescription?: string;
		/**
		 * Loading state aria label
		 */
		loadingAriaLabel?: string;
		/**
		 * Actions column header label
		 */
		actionsColumnLabel?: string;
		/**
		 * Select all checkbox aria label
		 */
		selectAllAriaLabel?: string;
		/**
		 * Select row checkbox aria label format (use {index} placeholder)
		 */
		selectRowAriaLabelFormat?: string;
		/**
		 * Actions dropdown aria label format (use {index} placeholder)
		 */
		actionsAriaLabelFormat?: string;
		/**
		 * Pagination aria label
		 */
		paginationAriaLabel?: string;
		/**
		 * Callback when a row is clicked
		 */
		onRowClick?: (row: T, index: number) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Custom empty state snippet
		 */
		emptyState?: Snippet;
		/**
		 * Custom loading state snippet
		 */
		loadingState?: Snippet;
	}

	const {
		columns,
		data,
		actions,
		selectable,
		selectedRows,
		onSelectionChange,
		sortState,
		onSortChange,
		paginated,
		currentPage,
		pageSize,
		totalItems,
		onPageChange,
		onPageSizeChange,
		pageSizeOptions,
		size,
		zebra,
		hover,
		compact,
		bordered,
		loading,
		disabled,
		ariaLabel,
		caption,
		emptyStateTitle,
		emptyStateDescription,
		loadingAriaLabel,
		actionsColumnLabel,
		selectAllAriaLabel,
		selectRowAriaLabelFormat,
		actionsAriaLabelFormat,
		paginationAriaLabel,
		onRowClick,
		class: className,
		emptyState,
		loadingState
	}: Props = $props();

	// Computed: Check if data is empty
	let isEmpty = $derived(!data || data.length === 0);

	// Computed: Check if all rows are selected
	let isAllSelected = $derived(!isEmpty && selectedRows && selectedRows.length === data.length);

	// Computed: Check if some (but not all) rows are selected
	let isIndeterminate = $derived(
		selectedRows && selectedRows.length > 0 && selectedRows.length < data.length
	);

	// Computed: Check if actions column should be shown
	let hasActions = $derived(actions && actions.length > 0);

	// Computed: Total column count (for colspan calculations)
	let totalColumnCount = $derived(columns.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0));

	// Computed: Table wrapper classes
	let wrapperClasses = $derived(
		['overflow-x-auto', disabled && 'opacity-50 pointer-events-none', className]
			.filter(Boolean)
			.join(' ')
	);

	// Computed: Table classes
	let tableClasses = $derived(
		[
			'table',
			'w-full',
			size === 'xs' && 'table-xs',
			size === 'sm' && 'table-sm',
			size === 'md' && 'table-md',
			size === 'lg' && 'table-lg',
			zebra && 'table-zebra',
			compact && 'table-compact',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Computed: Spinner size based on table size
	let spinnerSize = $derived<'xs' | 'sm' | 'md' | 'lg'>(
		size === 'xs' ? 'sm' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'
	);

	// Get cell value from row
	function getCellValue(
		row: Record<string, unknown>,
		column: DataTableColumn,
		rowIndex: number
	): string {
		if (column.render) {
			return column.render(row, rowIndex);
		}
		const value = row[column.key];
		if (value === null || value === undefined) {
			return '';
		}
		return String(value);
	}

	// Get alignment class for cell
	function getAlignmentClass(align?: 'left' | 'center' | 'right'): string {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right';
		return 'text-left';
	}

	// Get header cell classes
	function getHeaderCellClasses(column: DataTableColumn): string {
		return [
			getAlignmentClass(column.align),
			column.hideOnMobile && 'hidden sm:table-cell',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ');
	}

	// Get body cell classes
	function getBodyCellClasses(column: DataTableColumn): string {
		return [
			getAlignmentClass(column.align),
			column.hideOnMobile && 'hidden sm:table-cell',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ');
	}

	// Get row classes
	function getRowClasses(rowIndex: number): string {
		const isSelected = selectedRows?.includes(rowIndex);
		return [
			hover && 'hover:bg-base-200',
			(selectable || onRowClick) && 'cursor-pointer',
			isSelected && 'bg-base-300'
		]
			.filter(Boolean)
			.join(' ');
	}

	// Handle row click
	function handleRowClick(row: Record<string, unknown>, rowIndex: number): void {
		if (disabled) return;
		onRowClick?.(row, rowIndex);
	}

	// Handle row keydown for accessibility
	function handleRowKeyDown(
		event: KeyboardEvent,
		row: Record<string, unknown>,
		rowIndex: number
	): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleRowClick(row, rowIndex);
		}
	}

	// Handle select all checkbox change
	function handleSelectAll(): void {
		if (disabled || !selectable) return;

		if (isAllSelected) {
			// Deselect all
			onSelectionChange?.([]);
		} else {
			// Select all
			const allIndices = data.map((_, index) => index);
			onSelectionChange?.(allIndices);
		}
	}

	// Handle individual row checkbox change
	function handleSelectRow(rowIndex: number, event: Event): void {
		event.stopPropagation();
		if (disabled || !selectable) return;

		const currentSelection = selectedRows ?? [];
		const isCurrentlySelected = currentSelection.includes(rowIndex);

		if (isCurrentlySelected) {
			// Remove from selection
			const newSelection = currentSelection.filter((i) => i !== rowIndex);
			onSelectionChange?.(newSelection);
		} else {
			// Add to selection
			const newSelection = [...currentSelection, rowIndex];
			onSelectionChange?.(newSelection);
		}
	}

	// Get aria label for row checkbox
	function getSelectRowAriaLabel(rowIndex: number): string {
		if (selectRowAriaLabelFormat) {
			return selectRowAriaLabelFormat.replace('{index}', String(rowIndex + 1));
		}
		return '';
	}

	// Handle sort click on column header
	function handleSort(column: DataTableColumn): void {
		if (disabled || !column.sortable) return;

		let newDirection: 'asc' | 'desc' | null = 'asc';

		if (sortState?.column === column.key) {
			if (sortState.direction === 'asc') {
				newDirection = 'desc';
			} else if (sortState.direction === 'desc') {
				newDirection = null;
			}
		}

		const newState: DataTableSortState = {
			column: newDirection ? column.key : null,
			direction: newDirection
		};

		onSortChange?.(newState);
	}

	// Handle keyboard navigation for sortable headers
	function handleSortKeyDown(event: KeyboardEvent, column: DataTableColumn): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleSort(column);
		}
	}

	// Get aria-sort value for column header
	function getAriaSort(column: DataTableColumn): 'ascending' | 'descending' | 'none' | undefined {
		if (!column.sortable) return undefined;
		if (sortState?.column !== column.key) return 'none';
		if (sortState.direction === 'asc') return 'ascending';
		if (sortState.direction === 'desc') return 'descending';
		return 'none';
	}

	// Check if column is currently sorted
	function isColumnSorted(column: DataTableColumn): boolean {
		return sortState?.column === column.key && sortState.direction !== null;
	}

	// Get sort direction for column
	function getSortDirection(column: DataTableColumn): 'asc' | 'desc' | null {
		if (sortState?.column === column.key) {
			return sortState.direction;
		}
		return null;
	}

	// Convert DataTableAction to DropdownItem format
	function getActionsDropdownItems(row: Record<string, unknown>, rowIndex: number): DropdownItem[] {
		if (!actions) return [];

		return actions.map((action) => ({
			id: action.id,
			label: action.label,
			icon: action.icon,
			disabled: action.disabled,
			onClick: () => action.onClick(row, rowIndex)
		}));
	}

	// Get aria label for actions dropdown
	function getActionsAriaLabel(rowIndex: number): string {
		if (actionsAriaLabelFormat) {
			return actionsAriaLabelFormat.replace('{index}', String(rowIndex + 1));
		}
		return '';
	}

	// Handle page change from Pagination component
	function handlePageChange(page: number): void {
		if (disabled) return;
		onPageChange?.(page);
	}

	// Handle page size change from Pagination component
	function handlePageSizeChange(newPageSize: number): void {
		if (disabled) return;
		onPageSizeChange?.(newPageSize);
	}
</script>

<div class={wrapperClasses}>
	<table
		class={tableClasses}
		aria-label={ariaLabel}
		aria-busy={loading}
		aria-disabled={disabled}
		role="grid"
	>
		{#if caption}
			<caption class="mb-2 caption-top">
				<Text text={caption} size="sm" variant="muted" />
			</caption>
		{/if}

		<thead>
			<tr>
				{#if selectable}
					<th class={bordered ? 'border-base-300 w-12 border' : 'w-12'}>
						<Checkbox
							checked={isAllSelected}
							indeterminate={isIndeterminate}
							disabled={disabled || isEmpty}
							ariaLabel={selectAllAriaLabel}
							size={size === 'lg' ? 'md' : size}
							onclick={handleSelectAll}
						/>
					</th>
				{/if}

				{#each columns as column (column.key)}
					<th
						class={getHeaderCellClasses(column)}
						style={column.width ? `width: ${column.width}` : undefined}
						scope="col"
						aria-sort={getAriaSort(column)}
						tabindex={column.sortable ? 0 : undefined}
						role="columnheader"
						onclick={column.sortable ? () => handleSort(column) : undefined}
						onkeydown={column.sortable ? (e) => handleSortKeyDown(e, column) : undefined}
					>
						<span
							class="inline-flex items-center gap-1 {column.sortable
								? 'cursor-pointer select-none'
								: ''}"
						>
							<Text text={column.label} weight="medium" />
							{#if column.sortable}
								<Icon size="sm" class="text-base-content/50" ariaHidden={true}>
									{#if getSortDirection(column) === 'asc'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="h-full w-full"
										>
											<path d="M12 19V5M5 12l7-7 7 7" />
										</svg>
									{:else if getSortDirection(column) === 'desc'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="h-full w-full"
										>
											<path d="M12 5v14M5 12l7 7 7-7" />
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="h-full w-full"
										>
											<path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
										</svg>
									{/if}
								</Icon>
							{/if}
						</span>
					</th>
				{/each}

				{#if hasActions}
					<th class={bordered ? 'border-base-300 w-20 border' : 'w-20'}>
						<Text text={actionsColumnLabel ?? ''} weight="medium" />
					</th>
				{/if}
			</tr>
		</thead>

		<tbody>
			{#if loading}
				{#if loadingState}
					{@render loadingState()}
				{:else}
					<tr>
						<td colspan={totalColumnCount} class="py-12 text-center">
							<Spinner size={spinnerSize} ariaLabel={loadingAriaLabel} />
						</td>
					</tr>
				{/if}
			{:else if isEmpty}
				{#if emptyState}
					{@render emptyState()}
				{:else}
					<tr>
						<td colspan={totalColumnCount} class="py-8">
							<EmptyState title={emptyStateTitle} description={emptyStateDescription} />
						</td>
					</tr>
				{/if}
			{:else}
				{#each data as row, rowIndex (rowIndex)}
					<tr
						class={getRowClasses(rowIndex)}
						tabindex={onRowClick ? 0 : undefined}
						onclick={() => handleRowClick(row, rowIndex)}
						onkeydown={(e) => handleRowKeyDown(e, row, rowIndex)}
					>
						{#if selectable}
							<td class={bordered ? 'border-base-300 border' : ''}>
								<Checkbox
									checked={selectedRows?.includes(rowIndex)}
									{disabled}
									ariaLabel={getSelectRowAriaLabel(rowIndex)}
									size={size === 'lg' ? 'md' : size}
									onclick={(e) => handleSelectRow(rowIndex, e)}
								/>
							</td>
						{/if}

						{#each columns as column (column.key)}
							<td class={getBodyCellClasses(column)}>
								<Text text={getCellValue(row, column, rowIndex)} />
							</td>
						{/each}

						{#if hasActions}
							<td
								class={bordered ? 'border-base-300 border' : ''}
								onclick={(e) => e.stopPropagation()}
							>
								<Dropdown
									items={getActionsDropdownItems(row, rowIndex)}
									position="bottom"
									align="end"
									size={size === 'xs' ? 'sm' : size === 'lg' ? 'md' : size}
									variant="ghost"
									{disabled}
									ariaLabel={getActionsAriaLabel(rowIndex)}
								>
									{#snippet trigger()}
										<Icon size={size === 'xs' ? 'xs' : 'sm'} ariaHidden={true}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="h-full w-full"
											>
												<circle cx="12" cy="5" r="2" />
												<circle cx="12" cy="12" r="2" />
												<circle cx="12" cy="19" r="2" />
											</svg>
										</Icon>
									{/snippet}
								</Dropdown>
							</td>
						{/if}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>

	{#if paginated && !loading && !isEmpty}
		<div class="mt-4">
			<Pagination
				{currentPage}
				{pageSize}
				{totalItems}
				{pageSizeOptions}
				{size}
				{disabled}
				showPageSize={pageSizeOptions !== undefined && pageSizeOptions.length > 0}
				showTotal={totalItems !== undefined}
				ariaLabel={paginationAriaLabel}
				onpagechange={handlePageChange}
				onpagesizechange={handlePageSizeChange}
			/>
		</div>
	{/if}
</div>
