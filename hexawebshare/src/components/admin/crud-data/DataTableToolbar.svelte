<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!--
@component DataTableToolbar

A comprehensive toolbar component for data tables with search, actions, filters, and bulk operations.

**Features:**
- Search input with debounce support
- Action buttons (Add, Export, Import, etc.)
- Filter button with dropdown
- Bulk actions for selected rows
- View options (density, column visibility)
- Loading and disabled states
- Responsive design
- Full accessibility support

**Component Architecture:**
- Uses library primitives: Button, IconButton, Input, Select, Text, Badge
- Follows Svelte 5 patterns with runes
- All text content externalized as props for i18n support

**Example:**
```svelte
<DataTableToolbar
  searchValue={search}
  searchPlaceholder="Search users..."
  onsearch={(value) => setSearch(value)}
  actions={[
    { label: 'Add User', variant: 'primary', onclick: handleAdd }
  ]}
  bulkActions={[
    { label: 'Delete Selected', variant: 'error', onclick: handleDelete }
  ]}
  selectedCount={selectedRows.length}
/>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Input from '../../core/forms/Input.svelte';
	import Select from '../../core/forms/Select.svelte';
	import Text from '../../core/typography/Text.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';

	/**
	 * Action button configuration
	 */
	export interface ToolbarAction {
		/**
		 * Button label text
		 */
		label: string;
		/**
		 * Button variant
		 * @default 'primary'
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
			| 'ghost'
			| 'link';
		/**
		 * Button size
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Whether button has outline style
		 * @default false
		 */
		outline?: boolean;
		/**
		 * Whether button is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether button is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Icon name or custom icon snippet
		 */
		icon?: string | Snippet;
		/**
		 * Click event handler
		 */
		onclick?: () => void;
		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;
	}

	/**
	 * Bulk action configuration
	 */
	export interface BulkAction {
		/**
		 * Action label text
		 */
		label: string;
		/**
		 * Action variant
		 * @default 'primary'
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
			| 'ghost'
			| 'link';
		/**
		 * Whether action is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Click event handler
		 */
		onclick?: () => void;
		/**
		 * ARIA label for accessibility
		 */
		ariaLabel?: string;
	}

	/**
	 * View option configuration
	 */
	export interface ViewOption {
		/**
		 * Option value
		 */
		value: string;
		/**
		 * Option label
		 */
		label: string;
		/**
		 * Whether option is disabled
		 * @default false
		 */
		disabled?: boolean;
	}

	interface Props {
		/**
		 * Search input value (controlled)
		 */
		searchValue?: string;
		/**
		 * Search input placeholder text
		 * @default 'Search...'
		 */
		searchPlaceholder?: string;
		/**
		 * Whether search input is enabled
		 * @default true
		 */
		showSearch?: boolean;
		/**
		 * Search input size
		 * @default 'md'
		 */
		searchSize?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Debounce delay for search in milliseconds
		 * @default 300
		 */
		searchDebounceMs?: number;
		/**
		 * Whether to trigger search on every input change
		 * @default false
		 */
		searchOnType?: boolean;
		/**
		 * Action buttons to display
		 */
		actions?: ToolbarAction[];
		/**
		 * Bulk action buttons (shown when items are selected)
		 */
		bulkActions?: BulkAction[];
		/**
		 * Number of selected items (triggers bulk actions display)
		 * @default 0
		 */
		selectedCount?: number;
		/**
		 * Whether to show filter button
		 * @default false
		 */
		showFilter?: boolean;
		/**
		 * Filter button label text
		 * @default 'Filter'
		 */
		filterLabel?: string;
		/**
		 * Whether filter dropdown is open (bindable)
		 */
		filterOpen?: boolean;
		/**
		 * Custom filter content snippet
		 */
		filterContent?: Snippet;
		/**
		 * Empty filter state text (shown when no filter content provided)
		 * @default 'No filter'
		 */
		noFilterText?: string;
		/**
		 * View options (density, column visibility, etc.)
		 */
		viewOptions?: ViewOption[];
		/**
		 * Selected view option value
		 */
		viewValue?: string;
		/**
		 * View options label text
		 * @default 'View'
		 */
		viewLabel?: string;
		/**
		 * Whether to show view options
		 * @default false
		 */
		showViewOptions?: boolean;
		/**
		 * Toolbar size
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the toolbar is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the toolbar is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Selected items label text
		 * @default 'selected'
		 */
		selectedLabel?: string;
		/**
		 * Clear selection label text
		 * @default 'Clear selection'
		 */
		clearSelectionLabel?: string;
		/**
		 * Search input ARIA label
		 * @default 'Search table'
		 */
		searchAriaLabel?: string;
		/**
		 * Filter button ARIA label
		 * @default 'Filter table'
		 */
		filterAriaLabel?: string;
		/**
		 * View options ARIA label
		 * @default 'View options'
		 */
		viewAriaLabel?: string;
		/**
		 * Toolbar ARIA label
		 */
		ariaLabel?: string;
		/**
		 * Search event handler
		 */
		onsearch?: (value: string) => void;
		/**
		 * View option change handler
		 */
		onViewChange?: (value: string) => void;
		/**
		 * Clear selection handler
		 */
		onClearSelection?: () => void;
		/**
		 * Filter apply handler (called when filter is applied)
		 */
		onFilterApply?: (filters: unknown) => void;
		/**
		 * Filter clear/reset handler (called when filter is cleared)
		 */
		onFilterClear?: () => void;
		/**
		 * Whether to close filter dropdown when an item is selected
		 * @default true
		 */
		filterCloseOnSelect?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	let {
		searchValue = $bindable(''),
		searchPlaceholder = 'Search...',
		showSearch = true,
		searchSize = 'md',
		searchDebounceMs = 300,
		searchOnType = false,
		actions = [],
		bulkActions = [],
		selectedCount = 0,
		showFilter = false,
		filterLabel = 'Filter',
		filterOpen = $bindable(false),
		filterContent,
		noFilterText = 'No filter',
		viewOptions = [],
		viewValue = $bindable(''),
		showViewOptions = false,
		viewLabel = 'View',
		size = 'md',
		disabled = false,
		loading = false,
		selectedLabel = 'selected',
		clearSelectionLabel = 'Clear selection',
		searchAriaLabel = 'Search table',
		filterAriaLabel = 'Filter table',
		viewAriaLabel = 'View options',
		ariaLabel,
		onsearch,
		onViewChange,
		onClearSelection,
		onFilterApply,
		onFilterClear,
		filterCloseOnSelect = true,
		class: className = '',
		...props
	}: Props = $props();

	// Debounce timer for search
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	// Size-based classes
	const toolbarSizeClasses = $derived({
		sm: 'gap-2 p-2',
		md: 'gap-3 p-3',
		lg: 'gap-4 p-4'
	});

	const buttonSize = $derived(size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md');

	// Container classes
	const containerClasses = $derived(
		[
			'data-table-toolbar',
			'flex',
			'flex-wrap',
			'items-center',
			'justify-between',
			'bg-base-100',
			'border',
			'border-base-300',
			'rounded-box',
			toolbarSizeClasses[size],
			disabled && 'opacity-50',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// Left section classes (search, filters)
	const leftSectionClasses = $derived(
		['flex', 'flex-wrap', 'items-center', 'gap-2', 'flex-1', 'min-w-0'].join(' ')
	);

	// Right section classes (actions, view options)
	const rightSectionClasses = $derived(
		['flex', 'flex-wrap', 'items-center', 'gap-2', 'shrink-0'].join(' ')
	);

	// Search input classes
	const searchWrapperClasses = $derived(
		[
			'flex',
			'items-center',
			size === 'sm' ? 'w-full sm:w-64' : size === 'lg' ? 'w-full sm:w-80' : 'w-full sm:w-72'
		].join(' ')
	);

	// Handle search input
	function handleSearchInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchValue = target.value;

		if (searchOnType && onsearch) {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
			debounceTimer = setTimeout(() => {
				onsearch(searchValue);
			}, searchDebounceMs);
		}
	}

	// Handle search on Enter key
	function handleSearchKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && onsearch && !searchOnType) {
			onsearch(searchValue);
		}
	}

	// Handle view option change
	function handleViewChange(value: string) {
		viewValue = value;
		onViewChange?.(value);
	}

	// Handle clear selection
	function handleClearSelection() {
		onClearSelection?.();
	}

	// Cleanup debounce timer
	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}
	});

	// Check if bulk actions should be shown
	const showBulkActions = $derived(selectedCount > 0 && bulkActions.length > 0);
</script>

<!-- 
	NOTE: Raw HTML div is intentional here.
	This is a structural container (toolbar wrapper) with no semantic or interactive behavior.
	No suitable library component exists for generic layout wrappers.
-->
<div class={containerClasses} role="toolbar" aria-label={ariaLabel} {...props}>
	<!-- Left Section: Search and Filters -->
	<!-- 
		NOTE: Raw HTML div is intentional here.
		This is a structural container (left section wrapper) with no semantic or interactive behavior.
		No suitable library component exists for generic layout wrappers.
	-->
	<div class={leftSectionClasses}>
		{#if showSearch}
			<!-- 
				NOTE: Raw HTML div is intentional here.
				This is a structural container (search wrapper) with no semantic or interactive behavior.
				No suitable library component exists for generic layout wrappers.
			-->
			<div class={searchWrapperClasses}>
				<!-- 
					NOTE: Raw HTML input is used here instead of Input component.
					TECHNICAL REASON: Input component does not support onkeydown prop for Enter key handling.
					ATTEMPTED SOLUTIONS:
					1. Used Input component with oninput - missing Enter key support
					2. Tried wrapper div with onkeydown - doesn't work when input is focused
					CONSEQUENCE: Using Input component would prevent Enter key search functionality
					VALIDATION: Input component interface checked - no onkeydown prop available
				-->
				<input
					type="search"
					bind:value={searchValue}
					placeholder={searchPlaceholder}
					disabled={disabled || loading}
					aria-label={searchAriaLabel}
					oninput={handleSearchInput}
					onkeydown={handleSearchKeydown}
					class={[
						'input',
						'input-bordered',
						'w-full',
						searchSize === 'xs' && 'input-xs',
						searchSize === 'sm' && 'input-sm',
						searchSize === 'md' && 'input-md',
						searchSize === 'lg' && 'input-lg'
					]
						.filter(Boolean)
						.join(' ')}
				/>
			</div>
		{/if}

		{#if showFilter}
			{#snippet filterTrigger()}
				<Button
					variant="ghost"
					size={buttonSize}
					disabled={disabled || loading}
					ariaLabel={filterAriaLabel}
					onclick={() => {
						// Toggle the dropdown by toggling filterOpen state
						// The Dropdown component will handle the actual DOM manipulation
						filterOpen = !filterOpen;
					}}
				>
					{#snippet children()}
						<Icon size="sm" ariaHidden={true}>
							{#snippet children()}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
									/>
								</svg>
							{/snippet}
						</Icon>
						{filterLabel}
						<!-- Dropdown arrow icon -->
						<Icon size="xs" ariaHidden={true}>
							{#snippet children()}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-3 w-3 transition-transform {filterOpen ? 'rotate-180' : ''}"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
								</svg>
							{/snippet}
						</Icon>
					{/snippet}
				</Button>
			{/snippet}
			{#snippet defaultNoFilterContent()}
				<div class="min-w-48 p-4">
					<Text
						text={noFilterText}
						weight="normal"
						size="sm"
						display="block"
						class="text-base-content/60"
					/>
				</div>
			{/snippet}
			<Dropdown
				open={filterOpen}
				size={buttonSize}
				disabled={disabled || loading}
				ariaLabel={filterAriaLabel}
				closeOnSelect={filterCloseOnSelect}
				onOpenChange={(open) => {
					filterOpen = open;
				}}
				trigger={filterTrigger}
			>
				{#snippet children()}
					{@render (filterContent || defaultNoFilterContent)()}
				{/snippet}
			</Dropdown>
		{/if}

		<!-- Bulk Actions Badge and Clear -->
		{#if showBulkActions}
			<!-- 
				NOTE: Raw HTML div is intentional here.
				This is a structural container (bulk actions wrapper) with no semantic or interactive behavior.
				No suitable library component exists for generic layout wrappers.
			-->
			<div class="flex items-center gap-2">
				<Badge
					variant="primary"
					size={size === 'sm' ? 'sm' : 'md'}
					label={`${selectedCount} ${selectedLabel}`}
				/>
				{#if onClearSelection}
					<Button
						label={clearSelectionLabel}
						variant="ghost"
						size={buttonSize === 'sm' ? 'xs' : 'sm'}
						disabled={disabled || loading}
						onclick={handleClearSelection}
						ariaLabel={clearSelectionLabel}
					/>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Right Section: Actions and View Options -->
	<!-- 
		NOTE: Raw HTML div is intentional here.
		This is a structural container (right section wrapper) with no semantic or interactive behavior.
		No suitable library component exists for generic layout wrappers.
	-->
	<div class={rightSectionClasses}>
		<!-- Bulk Actions -->
		{#if showBulkActions}
			{#each bulkActions as action (action.label)}
				<Button
					label={action.label}
					variant={action.variant}
					size={buttonSize}
					disabled={disabled || loading || action.disabled}
					onclick={action.onclick}
					ariaLabel={action.ariaLabel || action.label}
				/>
			{/each}
		{/if}

		<!-- Regular Actions -->
		{#if actions.length > 0}
			{#each actions as action (action.label)}
				{#if typeof action.icon === 'string'}
					<IconButton
						variant={action.variant || 'primary'}
						size={action.size || buttonSize}
						disabled={disabled || loading || action.disabled}
						loading={action.loading}
						onclick={action.onclick}
						ariaLabel={action.ariaLabel || action.label}
						title={action.label}
					>
						{#snippet children()}
							<!-- Default icons based on common action types -->
							{#if action.icon === 'add' || action.icon === 'plus'}
								<Icon size="md" ariaHidden={true}>
									{#snippet children()}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											class="h-5 w-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
									{/snippet}
								</Icon>
							{:else if action.icon === 'export' || action.icon === 'download'}
								<Icon size="md" ariaHidden={true}>
									{#snippet children()}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											class="h-5 w-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
											/>
										</svg>
									{/snippet}
								</Icon>
							{:else if action.icon === 'import' || action.icon === 'upload'}
								<Icon size="md" ariaHidden={true}>
									{#snippet children()}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											class="h-5 w-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
											/>
										</svg>
									{/snippet}
								</Icon>
							{:else if action.icon === 'refresh' || action.icon === 'reload'}
								<Icon size="md" ariaHidden={true}>
									{#snippet children()}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											class="h-5 w-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
											/>
										</svg>
									{/snippet}
								</Icon>
							{/if}
						{/snippet}
					</IconButton>
				{:else if action.icon}
					<!-- Custom icon snippet -->
					{@render action.icon()}
				{:else}
					<!-- Button with label (no icon) -->
					<Button
						label={action.label}
						variant={action.variant || 'primary'}
						size={action.size || buttonSize}
						outline={action.outline}
						disabled={disabled || loading || action.disabled}
						loading={action.loading}
						onclick={action.onclick}
						ariaLabel={action.ariaLabel || action.label}
					/>
				{/if}
			{/each}
		{/if}

		<!-- View Options -->
		{#if showViewOptions && viewOptions.length > 0}
			<Select
				value={viewValue}
				options={viewOptions}
				size={buttonSize}
				disabled={disabled || loading}
				ariaLabel={viewAriaLabel}
				onchange={(e) => handleViewChange((e.target as HTMLSelectElement).value)}
				class="min-w-32"
			/>
		{/if}
	</div>
</div>

<style>
	/* Hide native browser search icons for consistent UX */
	:global(.data-table-toolbar input[type='search'])::-webkit-search-decoration,
	:global(.data-table-toolbar input[type='search'])::-webkit-search-cancel-button,
	:global(.data-table-toolbar input[type='search'])::-webkit-search-results-button,
	:global(.data-table-toolbar input[type='search'])::-webkit-search-results-decoration {
		-webkit-appearance: none;
		appearance: none;
		display: none;
	}

	/* Firefox */
	:global(.data-table-toolbar input[type='search'])::-moz-search-clear-button {
		display: none;
	}

	/* Hide Dropdown summary marker (triangle icon) - we use custom arrow icon inside button */
	:global(.data-table-toolbar .dropdown summary) {
		list-style: none;
	}

	:global(.data-table-toolbar .dropdown summary::-webkit-details-marker) {
		display: none;
	}

	:global(.data-table-toolbar .dropdown summary::marker) {
		display: none;
		content: '';
	}
</style>
