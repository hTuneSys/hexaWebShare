<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import Text from '../typography/Text.svelte';
	import Select from '../forms/Select.svelte';

	/**
	 * Option type for page size options
	 */
	export type PageSizeOption = {
		value: number;
		label?: string;
	};

	/**
	 * Props interface for the Pagination component
	 */
	interface Props {
		/**
		 * Unique ID for the pagination (auto-generated if not provided)
		 */
		id?: string;
		/**
		 * Current page number (1-indexed)
		 * @default 1
		 */
		currentPage?: number;
		/**
		 * Total number of pages
		 * @default 1
		 */
		totalPages?: number;
		/**
		 * Total number of items (alternative to totalPages)
		 */
		totalItems?: number;
		/**
		 * Number of items per page
		 * @default 10
		 */
		pageSize?: number;
		/**
		 * Size variant of the pagination buttons
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant of the pagination buttons
		 * @default 'neutral'
		 */
		variant?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost';
		/**
		 * Show first and last page buttons
		 * @default true
		 */
		showFirstLast?: boolean;
		/**
		 * Show previous and next page buttons
		 * @default true
		 */
		showPrevNext?: boolean;
		/**
		 * Maximum number of page buttons to show (excluding first, prev, next, last)
		 * @default 7
		 */
		maxVisiblePages?: number;
		/**
		 * Show page size selector
		 * @default false
		 */
		showPageSize?: boolean;
		/**
		 * Available page size options - can be array of numbers or array of PageSizeOption objects
		 * @default [10, 20, 50, 100]
		 */
		pageSizeOptions?: number[] | PageSizeOption[];
		/**
		 * Show total items count
		 * @default false
		 */
		showTotal?: boolean;
		/**
		 * Whether the pagination is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the pagination is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Callback when page changes
		 */
		onpagechange?: (page: number) => void;
		/**
		 * Callback when page size changes
		 */
		onpagesizechange?: (pageSize: number) => void;
		/**
		 * Accessible label for the pagination component
		 */
		ariaLabel?: string;
		/**
		 * Custom label for first page button (sr-only text)
		 * @default 'First page'
		 */
		firstPageLabel?: string;
		/**
		 * Custom label for previous page button (sr-only text)
		 * @default 'Previous page'
		 */
		prevPageLabel?: string;
		/**
		 * Custom label for next page button (sr-only text)
		 * @default 'Next page'
		 */
		nextPageLabel?: string;
		/**
		 * Custom label for last page button (sr-only text)
		 * @default 'Last page'
		 */
		lastPageLabel?: string;
		/**
		 * Custom format string for total items display
		 * Use {start}, {end}, and {total} as placeholders
		 * @default 'Showing {start} to {end} of {total} results'
		 */
		totalItemsFormat?: string;
		/**
		 * Custom label for items per page selector
		 * @default 'Items per page:'
		 */
		itemsPerPageLabel?: string;
		/**
		 * Custom aria-label for first page button
		 * @default 'Go to first page'
		 */
		firstPageAriaLabel?: string;
		/**
		 * Custom aria-label for previous page button
		 * @default 'Go to previous page'
		 */
		prevPageAriaLabel?: string;
		/**
		 * Custom aria-label for next page button
		 * @default 'Go to next page'
		 */
		nextPageAriaLabel?: string;
		/**
		 * Custom aria-label for last page button
		 * @default 'Go to last page'
		 */
		lastPageAriaLabel?: string;
		/**
		 * Custom format string for page number button aria-label
		 * Use {page} as placeholder
		 * @default 'Go to page {page}'
		 */
		pageAriaLabelFormat?: string;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		id,
		currentPage = 1,
		totalPages: propTotalPages,
		totalItems,
		pageSize = 10,
		size = 'md',
		variant = 'neutral',
		showFirstLast = true,
		showPrevNext = true,
		maxVisiblePages = 7,
		showPageSize = false,
		pageSizeOptions = [10, 20, 50, 100],
		showTotal = false,
		disabled = false,
		loading = false,
		onpagechange,
		onpagesizechange,
		ariaLabel = 'Pagination navigation',
		firstPageLabel = 'First page',
		prevPageLabel = 'Previous page',
		nextPageLabel = 'Next page',
		lastPageLabel = 'Last page',
		totalItemsFormat = 'Showing {start} to {end} of {total} results',
		itemsPerPageLabel = 'Items per page:',
		firstPageAriaLabel = 'Go to first page',
		prevPageAriaLabel = 'Go to previous page',
		nextPageAriaLabel = 'Go to next page',
		lastPageAriaLabel = 'Go to last page',
		pageAriaLabelFormat = 'Go to page {page}',
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique IDs to avoid collisions when multiple paginations are on the same page
	const paginationId = $derived(id ?? `pagination-${crypto.randomUUID()}`);

	// Calculate total pages from totalItems if provided
	let totalPages = $derived(
		propTotalPages !== undefined
			? propTotalPages
			: totalItems !== undefined
				? Math.max(1, Math.ceil(totalItems / pageSize))
				: 1
	);

	// Ensure currentPage is within valid range
	let safeCurrentPage = $derived(Math.max(1, Math.min(currentPage, totalPages)));

	// Calculate visible page numbers
	let visiblePages = $derived(() => {
		if (totalPages <= 0) {
			return [];
		}
		if (totalPages <= maxVisiblePages) {
			// Show all pages if total is less than max
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: (number | 'ellipsis')[] = [];
		const half = Math.floor(maxVisiblePages / 2);

		if (safeCurrentPage <= half + 1) {
			// Near the beginning
			for (let i = 1; i <= maxVisiblePages - 1; i++) {
				pages.push(i);
			}
			pages.push('ellipsis');
			pages.push(totalPages);
		} else if (safeCurrentPage >= totalPages - half) {
			// Near the end
			pages.push(1);
			pages.push('ellipsis');
			for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// In the middle
			pages.push(1);
			pages.push('ellipsis');
			const start = safeCurrentPage - Math.floor((maxVisiblePages - 4) / 2);
			const end = safeCurrentPage + Math.floor((maxVisiblePages - 4) / 2);
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
			pages.push('ellipsis');
			pages.push(totalPages);
		}

		return pages;
	});

	// Wrapper classes
	let wrapperClasses = $derived(
		['join', disabled && 'opacity-50 pointer-events-none', className].filter(Boolean).join(' ')
	);

	// Handle page change
	function handlePageChange(page: number): void {
		if (disabled || loading || page < 1 || page > totalPages || page === safeCurrentPage) {
			return;
		}
		onpagechange?.(page);
	}

	// Handle page size change
	function handlePageSizeChange(newPageSize: number): void {
		if (disabled || loading || newPageSize === pageSize) {
			return;
		}
		onpagesizechange?.(newPageSize);
	}

	// Handle keyboard navigation
	function handleKeyDown(
		event: KeyboardEvent,
		action: 'first' | 'prev' | 'next' | 'last' | number
	): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (typeof action === 'number') {
				handlePageChange(action);
			} else {
				switch (action) {
					case 'first':
						handlePageChange(1);
						break;
					case 'prev':
						handlePageChange(safeCurrentPage - 1);
						break;
					case 'next':
						handlePageChange(safeCurrentPage + 1);
						break;
					case 'last':
						handlePageChange(totalPages);
						break;
				}
			}
		}
	}

	// Calculate start and end item numbers for display
	let startItem = $derived(totalItems ? (safeCurrentPage - 1) * pageSize + 1 : undefined);
	let endItem = $derived(totalItems ? Math.min(safeCurrentPage * pageSize, totalItems) : undefined);

	// Format total items text
	let totalItemsText = $derived(
		startItem !== undefined && endItem !== undefined && totalItems !== undefined
			? totalItemsFormat
					.replace('{start}', String(startItem))
					.replace('{end}', String(endItem))
					.replace('{total}', String(totalItems))
			: ''
	);

	// Map Pagination size to Text component size
	let textSize = $derived<'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'>(
		size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'sm' : 'sm'
	);

	// Normalize pageSizeOptions to PageSizeOption format
	let normalizedPageSizeOptions = $derived(
		pageSizeOptions.map((option) => {
			if (typeof option === 'number') {
				return { value: option, label: String(option) };
			}
			return { value: option.value, label: option.label ?? String(option.value) };
		})
	);

	// Convert pageSizeOptions to Select component format (string values)
	let selectOptions = $derived(
		normalizedPageSizeOptions.map((option) => ({
			value: String(option.value),
			label: option.label
		}))
	);
</script>

<nav aria-label={ariaLabel} class="flex flex-col gap-4" {...props}>
	<div class="flex flex-wrap items-center justify-center gap-4">
		{#if showTotal && totalItems !== undefined}
			<Text size={textSize} variant="muted">
				{totalItemsText}
			</Text>
		{/if}

		<div class={wrapperClasses}>
			{#if showFirstLast}
				<IconButton
					{variant}
					{size}
					disabled={disabled || loading || safeCurrentPage === 1}
					loading={loading && safeCurrentPage === 1}
					ariaLabel={firstPageAriaLabel}
					class="join-item"
					onclick={() => handlePageChange(1)}
					onkeydown={(e: KeyboardEvent) => handleKeyDown(e, 'first')}
				>
					«
					<Text class="sr-only">{firstPageLabel}</Text>
				</IconButton>
			{/if}

			{#if showPrevNext}
				<IconButton
					{variant}
					{size}
					disabled={disabled || loading || safeCurrentPage === 1}
					loading={loading && safeCurrentPage === 1}
					ariaLabel={prevPageAriaLabel}
					class="join-item"
					onclick={() => handlePageChange(safeCurrentPage - 1)}
					onkeydown={(e: KeyboardEvent) => handleKeyDown(e, 'prev')}
				>
					‹
					<Text class="sr-only">{prevPageLabel}</Text>
				</IconButton>
			{/if}

			{#each visiblePages() as page}
				{#if page === 'ellipsis'}
					<Button
						{variant}
						{size}
						label="…"
						disabled={true}
						ariaLabel="Ellipsis"
						class="join-item"
					/>
				{:else}
					<Button
						{variant}
						{size}
						label={String(page)}
						disabled={disabled || loading || page > totalPages}
						loading={loading && page === safeCurrentPage}
						ariaLabel={pageAriaLabelFormat.replace('{page}', String(page))}
						aria-current={page === safeCurrentPage ? 'page' : undefined}
						class="join-item {page === safeCurrentPage ? 'btn-active' : ''}"
						onclick={() => handlePageChange(page)}
						onkeydown={(e: KeyboardEvent) => handleKeyDown(e, page)}
					/>
				{/if}
			{/each}

			{#if showPrevNext}
				<IconButton
					{variant}
					{size}
					disabled={disabled || loading || safeCurrentPage === totalPages}
					loading={loading && safeCurrentPage === totalPages}
					ariaLabel={nextPageAriaLabel}
					class="join-item"
					onclick={() => handlePageChange(safeCurrentPage + 1)}
					onkeydown={(e: KeyboardEvent) => handleKeyDown(e, 'next')}
				>
					›
					<Text class="sr-only">{nextPageLabel}</Text>
				</IconButton>
			{/if}

			{#if showFirstLast}
				<IconButton
					{variant}
					{size}
					disabled={disabled || loading || safeCurrentPage === totalPages}
					loading={loading && safeCurrentPage === totalPages}
					ariaLabel={lastPageAriaLabel}
					class="join-item"
					onclick={() => handlePageChange(totalPages)}
					onkeydown={(e: KeyboardEvent) => handleKeyDown(e, 'last')}
				>
					»
					<Text class="sr-only">{lastPageLabel}</Text>
				</IconButton>
			{/if}
		</div>

		{#if showPageSize}
			<div class="flex items-center gap-2">
				<Text size={textSize} variant="muted">{itemsPerPageLabel}</Text>
				<div class="w-auto">
					<!-- Wrapper genişliğini sınırla -->
					<Select
						value={String(pageSize)}
						options={selectOptions}
						{size}
						disabled={disabled || loading}
						ariaLabel="Items per page"
						class="w-auto min-w-[80px]"
						onchange={(e) => {
							const newSize = Number.parseInt((e.target as HTMLSelectElement).value, 10);
							handlePageSizeChange(newSize);
						}}
					/>
				</div>
			</div>
		{/if}
	</div>
</nav>
