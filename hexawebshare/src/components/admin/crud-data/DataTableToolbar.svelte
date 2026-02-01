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
	import Spinner from '../../core/feedback/Spinner.svelte';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Plus from 'lucide-svelte/icons/plus';
	import Download from 'lucide-svelte/icons/download';
	import Upload from 'lucide-svelte/icons/upload';
	import RefreshCw from 'lucide-svelte/icons/refresh-cw';

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
		 * Loading spinner ARIA label
		 * @default 'Loading'
		 */
		loadingAriaLabel?: string;
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
		loadingAriaLabel = 'Loading',
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
			(disabled || loading) && 'opacity-50',
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
<div class={containerClasses} role="toolbar" aria-label={ariaLabel} aria-busy={loading} {...props}>
	<!-- Left Section: Search and Filters -->
	<!-- 
		NOTE: Raw HTML div is intentional here.
		This is a structural container (left section wrapper) with no semantic or interactive behavior.
		No suitable library component exists for generic layout wrappers.
	-->
	<div class={leftSectionClasses}>
		{#if loading}
			<Spinner size="sm" ariaLabel={loadingAriaLabel} />
		{/if}
		{#if showSearch}
			<!-- 
				NOTE: Raw HTML div is intentional here.
				This is a structural container (search wrapper) with no semantic or interactive behavior.
				No suitable library component exists for generic layout wrappers.
			-->
			<div class={searchWrapperClasses}>
				<Input
					type="search"
					value={searchValue}
					placeholder={searchPlaceholder}
					disabled={disabled || loading}
					ariaLabel={searchAriaLabel}
					oninput={handleSearchInput}
					onkeydown={handleSearchKeydown}
					size={searchSize}
					class="w-full"
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
							<ListFilter />
						</Icon>
						{filterLabel}
						<!-- Dropdown arrow icon -->
						<Icon size="xs" ariaHidden={true}>
							<ChevronDown class="h-3 w-3 transition-transform {filterOpen ? 'rotate-180' : ''}" />
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
									<Plus />
								</Icon>
							{:else if action.icon === 'export' || action.icon === 'download'}
								<Icon size="md" ariaHidden={true}>
									<Download />
								</Icon>
							{:else if action.icon === 'import' || action.icon === 'upload'}
								<Icon size="md" ariaHidden={true}>
									<Upload />
								</Icon>
							{:else if action.icon === 'refresh' || action.icon === 'reload'}
								<Icon size="md" ariaHidden={true}>
									<RefreshCw />
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
