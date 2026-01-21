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
- Table: Main table structure
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
	import TableCell from '../../core/data-display/table/TableCell.svelte';
	import Checkbox from '../../core/forms/Checkbox.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import type { DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';
	import Pagination from '../../core/overlay-navigation/Pagination.svelte';
	import EmptyState from '../../core/data-display/EmptyState.svelte';
	import Spinner from '../../core/feedback/Spinner.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Icon from '../../core/media/Icon.svelte';

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
	 * Column definition for DataTable
	 */
	export interface DataTableColumn<T = Record<string, unknown>> {
		key: string;
		label: string;
		sortable?: boolean;
		align?: 'left' | 'center' | 'right';
		width?: string;
		hideOnMobile?: boolean;
		render?: (row: T, rowIndex: number) => string;
	}

	/**
	 * Action definition for row actions dropdown
	 */
	export interface DataTableAction<T = Record<string, unknown>> {
		id: string;
		label: string;
		icon?: string;
		variant?: 'default' | 'danger';
		disabled?: boolean;
		onClick: (row: T, rowIndex: number) => void;
	}

	/**
	 * Props interface for DataTable component
	 */
	interface Props<T = Record<string, unknown>> {
		columns: DataTableColumn<T>[];
		data: T[];
		actions?: DataTableAction<T>[];
		selectable?: boolean;
		selectedRows?: number[];
		onSelectionChange?: (selectedIndices: number[]) => void;
		sortState?: SortState;
		onSortChange?: (sortState: SortState) => void;
		paginated?: boolean;
		currentPage?: number;
		pageSize?: number;
		totalItems?: number;
		onPageChange?: (page: number) => void;
		onPageSizeChange?: (pageSize: number) => void;
		pageSizeOptions?: number[];
		size?: 'xs' | 'sm' | 'md' | 'lg';
		zebra?: boolean;
		hover?: boolean;
		compact?: boolean;
		bordered?: boolean;
		loading?: boolean;
		disabled?: boolean;
		ariaLabel?: string;
		caption?: string;
		emptyStateTitle?: string;
		emptyStateDescription?: string;
		loadingAriaLabel?: string;
		actionsColumnLabel?: string;
		selectAllAriaLabel?: string;
		selectRowAriaLabelFormat?: string;
		actionsAriaLabelFormat?: string;
		paginationAriaLabel?: string;
		onRowClick?: (row: T, index: number) => void;
		class?: string;
		emptyState?: Snippet;
		loadingState?: Snippet;
	}

	const {
		columns,
		data,
		actions,
		selectable,
		selectedRows = [],
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

	// Check if data is empty
	let isEmpty = $derived(data.length === 0);

	// Check if all rows are selected
	let isAllSelected = $derived(!isEmpty && selectedRows.length === data.length);

	// Check if some (but not all) rows are selected
	let isIndeterminate = $derived(selectedRows.length > 0 && selectedRows.length < data.length);

	// Check if actions column should be shown
	let hasActions = $derived(actions && actions.length > 0);

	// Total column count (for colspan calculations)
	let totalColumnCount = $derived(columns.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0));

	// Table wrapper classes
	let wrapperClasses = $derived(
		['overflow-x-auto', disabled && 'opacity-50 pointer-events-none', className]
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
			compact && 'table-compact',
			bordered && 'border border-base-300'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Spinner size based on table size
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

	// Get aria label for row checkbox
	function getSelectRowAriaLabel(rowIndex: number): string {
		if (selectRowAriaLabelFormat) {
			return selectRowAriaLabelFormat.replace('{index}', String(rowIndex + 1));
		}
		return '';
	}

	// Get aria label for actions dropdown
	function getActionsAriaLabel(rowIndex: number): string {
		if (actionsAriaLabelFormat) {
			return actionsAriaLabelFormat.replace('{index}', String(rowIndex + 1));
		}
		return '';
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

	// Handle select all checkbox change
	function handleSelectAll(): void {
		if (disabled || !selectable) return;

		if (isAllSelected) {
			onSelectionChange?.([]);
		} else {
			const allIndices = data.map((_, index) => index);
			onSelectionChange?.(allIndices);
		}
	}

	// Handle individual row checkbox change
	function handleSelectRow(rowIndex: number, event: Event): void {
		event.stopPropagation();
		if (disabled || !selectable) return;

		const isCurrentlySelected = selectedRows.includes(rowIndex);

		if (isCurrentlySelected) {
			const newSelection = selectedRows.filter((i) => i !== rowIndex);
			onSelectionChange?.(newSelection);
		} else {
			const newSelection = [...selectedRows, rowIndex];
			onSelectionChange?.(newSelection);
		}
	}

	// Handle sort click on column header
	function handleSort(column: DataTableColumn): void {
		if (disabled || !column.sortable) return;

		let newDirection: SortDirection = 'asc';

		if (sortState?.column === column.key) {
			if (sortState.direction === 'asc') {
				newDirection = 'desc';
			} else if (sortState.direction === 'desc') {
				newDirection = null;
			}
		}

		const newState: SortState = {
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

	// Handle row click
	function handleRowClick(rowData: Record<string, unknown>, rowIndex: number): void {
		if (disabled) return;
		onRowClick?.(rowData, rowIndex);
	}

	// Handle keyboard navigation for rows
	function handleRowKeyDown(
		event: KeyboardEvent,
		rowData: Record<string, unknown>,
		rowIndex: number
	): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleRowClick(rowData, rowIndex);
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

	// Get sort direction for column
	function getSortDirection(column: DataTableColumn): 'asc' | 'desc' | null {
		if (sortState?.column === column.key) {
			return sortState.direction;
		}
		return null;
	}

	// Get row classes
	function getRowClasses(rowIndex: number): string {
		const isSelected = selectedRows.includes(rowIndex);
		return [
			hover && 'hover',
			(selectable || onRowClick) && 'cursor-pointer',
			isSelected && 'bg-base-200'
		]
			.filter(Boolean)
			.join(' ');
	}
</script>

<!--
  NOTE: Raw HTML table elements are structural wrappers for DaisyUI table patterns.
  REASON: Required for DataTable's custom columns (checkbox, actions) and responsive scrolling.
  All content (text, icons, checkboxes, etc.) uses library components.
-->
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
						class={[
							column.align === 'center' && 'text-center',
							column.align === 'right' && 'text-right',
							column.hideOnMobile && 'hidden sm:table-cell',
							column.sortable && 'cursor-pointer select-none',
							bordered && 'border-base-300 border'
						]
							.filter(Boolean)
							.join(' ')}
						style={column.width ? `width: ${column.width}` : undefined}
						scope="col"
						aria-sort={getAriaSort(column)}
						tabindex={column.sortable ? 0 : undefined}
						role="columnheader"
						onclick={column.sortable ? () => handleSort(column) : undefined}
						onkeydown={column.sortable ? (e) => handleSortKeyDown(e, column) : undefined}
					>
						<span class="inline-flex items-center gap-1">
							<Text text={column.label} weight="medium" />
							{#if column.sortable}
								<Icon size="sm" class="text-base-content/50" ariaHidden={true}>
									{#if getSortDirection(column) === 'asc'}
										{#snippet children()}
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
										{/snippet}
									{:else if getSortDirection(column) === 'desc'}
										{#snippet children()}
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
										{/snippet}
									{:else}
										{#snippet children()}
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
										{/snippet}
									{/if}
								</Icon>
							{/if}
						</span>
					</th>
				{/each}

				{#if hasActions}
					<th class={bordered ? 'border-base-300 w-20 border' : 'w-20'}>
						{#if actionsColumnLabel}
							<Text text={actionsColumnLabel} weight="medium" />
						{/if}
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
				{#each data as rowData, index (index)}
					<tr
						class={getRowClasses(index)}
						tabindex={onRowClick ? 0 : undefined}
						onclick={() => handleRowClick(rowData, index)}
						onkeydown={(e) => handleRowKeyDown(e, rowData, index)}
					>
						{#if selectable}
							<td class={bordered ? 'border-base-300 border' : ''}>
								<Checkbox
									checked={selectedRows.includes(index)}
									{disabled}
									ariaLabel={getSelectRowAriaLabel(index)}
									size={size === 'lg' ? 'md' : size}
									onclick={(e) => handleSelectRow(index, e)}
								/>
							</td>
						{/if}

						{#each columns as column (column.key)}
							<TableCell
								content={getCellValue(rowData, column, index)}
								align={column.align}
								hideOnMobile={column.hideOnMobile}
								{bordered}
							/>
						{/each}

						{#if hasActions}
							<td
								class={bordered ? 'border-base-300 border' : ''}
								onclick={(e) => e.stopPropagation()}
							>
								<Dropdown
									items={getActionsDropdownItems(rowData, index)}
									position="bottom"
									align="end"
									size={size === 'xs' ? 'sm' : size === 'lg' ? 'md' : size}
									variant="ghost"
									{disabled}
									ariaLabel={getActionsAriaLabel(index)}
								>
									{#snippet trigger()}
										<Icon size={size === 'xs' ? 'xs' : 'sm'} ariaHidden={true}>
											{#snippet children()}
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
											{/snippet}
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
</div>

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
			onpagechange={onPageChange}
			onpagesizechange={onPageSizeChange}
		/>
	</div>
{/if}
