<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	/**
	 * Props interface for the Pagination component
	 */
	interface Props {
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
		 * Available page size options
		 * @default [10, 20, 50, 100]
		 */
		pageSizeOptions?: number[];
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
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
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
		class: className = '',
		...props
	}: Props = $props();

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

	// Button classes using static DaisyUI classes
	let buttonClasses = $derived(
		[
			'btn',
			'join-item',
			size === 'xs' && 'btn-xs',
			size === 'sm' && 'btn-sm',
			size === 'md' && 'btn-md',
			size === 'lg' && 'btn-lg',
			variant === 'primary' && 'btn-primary',
			variant === 'secondary' && 'btn-secondary',
			variant === 'accent' && 'btn-accent',
			variant === 'neutral' && 'btn-neutral',
			variant === 'info' && 'btn-info',
			variant === 'success' && 'btn-success',
			variant === 'warning' && 'btn-warning',
			variant === 'error' && 'btn-error',
			variant === 'ghost' && 'btn-ghost'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Active button classes
	let activeButtonClasses = $derived([buttonClasses, 'btn-active'].filter(Boolean).join(' '));

	// Disabled button classes
	let disabledButtonClasses = $derived([buttonClasses, 'btn-disabled'].filter(Boolean).join(' '));

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
</script>

<nav aria-label={ariaLabel} class="flex flex-col gap-4" {...props}>
	<div class="flex flex-wrap items-center justify-center gap-4">
		{#if showTotal && totalItems !== undefined}
			<div class="text-base-content/70 text-sm">
				Showing {startItem} to {endItem} of {totalItems} results
			</div>
		{/if}

		<div class={wrapperClasses}>
			{#if showFirstLast}
				<button
					type="button"
					class={safeCurrentPage === 1 ? disabledButtonClasses : buttonClasses}
					disabled={disabled || loading || safeCurrentPage === 1}
					aria-label="Go to first page"
					aria-disabled={safeCurrentPage === 1}
					tabindex={safeCurrentPage === 1 ? -1 : 0}
					onclick={() => handlePageChange(1)}
					onkeydown={(e) => handleKeyDown(e, 'first')}
				>
					{#if loading && safeCurrentPage === 1}
						<span class="loading loading-spinner loading-xs" aria-hidden="true"></span>
					{:else}
						«
					{/if}
					<span class="sr-only">First page</span>
				</button>
			{/if}

			{#if showPrevNext}
				<button
					type="button"
					class={safeCurrentPage === 1 ? disabledButtonClasses : buttonClasses}
					disabled={disabled || loading || safeCurrentPage === 1}
					aria-label="Go to previous page"
					aria-disabled={safeCurrentPage === 1}
					tabindex={safeCurrentPage === 1 ? -1 : 0}
					onclick={() => handlePageChange(safeCurrentPage - 1)}
					onkeydown={(e) => handleKeyDown(e, 'prev')}
				>
					{#if loading && safeCurrentPage === 1}
						<span class="loading loading-spinner loading-xs" aria-hidden="true"></span>
					{:else}
						‹
					{/if}
					<span class="sr-only">Previous page</span>
				</button>
			{/if}

			{#each visiblePages() as page}
				{#if page === 'ellipsis'}
					<button
						type="button"
						class={disabledButtonClasses}
						disabled
						aria-hidden="true"
						tabindex={-1}
					>
						…
					</button>
				{:else}
					<button
						type="button"
						class={page === safeCurrentPage ? activeButtonClasses : buttonClasses}
						disabled={disabled || loading}
						aria-label="Go to page {page}"
						aria-current={page === safeCurrentPage ? 'page' : undefined}
						tabindex={disabled || loading ? -1 : 0}
						onclick={() => handlePageChange(page)}
						onkeydown={(e) => handleKeyDown(e, page)}
					>
						{#if loading && page === safeCurrentPage}
							<span class="loading loading-spinner loading-xs" aria-hidden="true"></span>
						{:else}
							{page}
						{/if}
					</button>
				{/if}
			{/each}

			{#if showPrevNext}
				<button
					type="button"
					class={safeCurrentPage === totalPages ? disabledButtonClasses : buttonClasses}
					disabled={disabled || loading || safeCurrentPage === totalPages}
					aria-label="Go to next page"
					aria-disabled={safeCurrentPage === totalPages}
					tabindex={safeCurrentPage === totalPages ? -1 : 0}
					onclick={() => handlePageChange(safeCurrentPage + 1)}
					onkeydown={(e) => handleKeyDown(e, 'next')}
				>
					{#if loading && safeCurrentPage === totalPages}
						<span class="loading loading-spinner loading-xs" aria-hidden="true"></span>
					{:else}
						›
					{/if}
					<span class="sr-only">Next page</span>
				</button>
			{/if}

			{#if showFirstLast}
				<button
					type="button"
					class={safeCurrentPage === totalPages ? disabledButtonClasses : buttonClasses}
					disabled={disabled || loading || safeCurrentPage === totalPages}
					aria-label="Go to last page"
					aria-disabled={safeCurrentPage === totalPages}
					tabindex={safeCurrentPage === totalPages ? -1 : 0}
					onclick={() => handlePageChange(totalPages)}
					onkeydown={(e) => handleKeyDown(e, 'last')}
				>
					{#if loading && safeCurrentPage === totalPages}
						<span class="loading loading-spinner loading-xs" aria-hidden="true"></span>
					{:else}
						»
					{/if}
					<span class="sr-only">Last page</span>
				</button>
			{/if}
		</div>

		{#if showPageSize}
			<div class="flex items-center gap-2">
				<label for="page-size-select" class="text-base-content/70 text-sm"> Items per page: </label>
				<select
					id="page-size-select"
					class="select select-bordered select-sm"
					disabled={disabled || loading}
					value={pageSize}
					onchange={(e) => {
						const newSize = Number.parseInt((e.target as HTMLSelectElement).value, 10);
						handlePageSizeChange(newSize);
					}}
					aria-label="Items per page"
				>
					{#each pageSizeOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>
		{/if}
	</div>
</nav>
