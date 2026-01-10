<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Button from '../../core/buttons/Button.svelte';
	import IconButton from '../../core/buttons/IconButton.svelte';
	import Dropdown, { type DropdownItem } from '../../core/overlay-navigation/Dropdown.svelte';
	import Text from '../../core/typography/Text.svelte';

	/**
	 * SavedFilter interface for filter presets
	 */
	export interface SavedFilter {
		/**
		 * Unique identifier for the filter
		 */
		id: string | number;
		/**
		 * Display name for the filter
		 */
		name: string;
		/**
		 * Optional description or subtitle
		 */
		description?: string;
		/**
		 * Optional icon (emoji or icon identifier)
		 */
		icon?: string;
		/**
		 * Whether this is the default filter
		 * @default false
		 */
		isDefault?: boolean;
		/**
		 * Whether this filter is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * When the filter was created
		 */
		createdAt?: Date;
	}

	/**
	 * Props interface for SavedFiltersDropdown component
	 */
	interface Props {
		/**
		 * Array of saved filters to display
		 */
		filters: SavedFilter[];
		/**
		 * Currently selected filter ID (controlled mode)
		 */
		value?: string | number;
		/**
		 * Default selected filter ID (uncontrolled mode)
		 */
		defaultValue?: string | number;
		/**
		 * Label for the trigger button
		 * @default 'Saved Filters'
		 */
		label?: string;
		/**
		 * Placeholder text when no filters available
		 * @default 'No saved filters'
		 */
		placeholder?: string;
		/**
		 * Position of dropdown content relative to trigger
		 * @default 'bottom'
		 */
		position?: 'bottom' | 'top' | 'left' | 'right';
		/**
		 * Alignment of dropdown content
		 * @default 'start'
		 */
		align?: 'start' | 'end';
		/**
		 * Visual variant of the dropdown trigger
		 * @default 'default'
		 */
		variant?: 'default' | 'bordered' | 'ghost';
		/**
		 * Size preset for the dropdown
		 * @default 'md'
		 */
		size?: 'sm' | 'md' | 'lg';
		/**
		 * Whether the dropdown is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the dropdown is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Whether to show filter icons
		 * @default true
		 */
		showIcon?: boolean;
		/**
		 * Whether to show filter descriptions
		 * @default false
		 */
		showDescription?: boolean;
		/**
		 * Whether to show the add filter action
		 * @default false
		 */
		showAddAction?: boolean;
		/**
		 * Whether to show delete actions on filters
		 * @default false
		 */
		showDeleteAction?: boolean;
		/**
		 * Label for the add action button
		 * @default 'Add Filter'
		 */
		addActionLabel?: string;
		/**
		 * Custom trigger label (overrides selected filter display)
		 */
		customLabel?: string;
		/**
		 * Accessible label for the dropdown
		 */
		ariaLabel?: string;
		/**
		 * Callback when selected filter changes
		 */
		onChange?: (filterId: string | number, filter: SavedFilter) => void;
		/**
		 * Callback when add action is clicked
		 */
		onAdd?: () => void;
		/**
		 * Callback when delete action is clicked on a filter
		 */
		onDelete?: (filterId: string | number, filter: SavedFilter) => void;
		/**
		 * Horizontal alignment of the component
		 * @default 'start'
		 */
		horizontalAlign?: 'start' | 'center' | 'end';
		/**
		 * Whether to expand to full width of container
		 * @default false
		 */
		fullWidth?: boolean;
		/**
		 * Additional CSS classes for the container
		 */
		class?: string;
	}

	const {
		filters,
		value,
		defaultValue,
		label = 'Saved Filters',
		placeholder = 'No saved filters',
		position = 'bottom',
		align = 'start',
		variant = 'default',
		size = 'md',
		disabled = false,
		loading = false,
		showIcon = true,
		showDescription = false,
		showAddAction = false,
		showDeleteAction = false,
		addActionLabel = 'Add Filter',
		customLabel,
		ariaLabel,
		onChange,
		onAdd,
		onDelete,
		horizontalAlign = 'start',
		fullWidth = false,
		class: className = '',
		...props
	}: Props = $props();

	// Wrapper classes for alignment
	let wrapperClasses = $derived(
		[
			'flex',
			fullWidth && 'w-full',
			horizontalAlign === 'start' && 'justify-start',
			horizontalAlign === 'center' && 'justify-center',
			horizontalAlign === 'end' && 'justify-end'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Controlled vs uncontrolled mode
	const isControlled = value !== undefined;
	let internalValue = $state<string | number | undefined>(
		defaultValue || filters.find((f) => f.isDefault)?.id || filters[0]?.id
	);

	// Dropdown open state for custom mode
	let dropdownOpen = $state(false);

	// Update internalValue when defaultValue changes (for Storybook controls)
	$effect(() => {
		if (!isControlled && defaultValue !== undefined) {
			const filterExists = filters.find((f) => f.id === defaultValue);
			if (filterExists && !filterExists.disabled) {
				internalValue = defaultValue;
			}
		}
	});

	// Compute actual selected value
	let selectedValue = $derived(isControlled ? value : internalValue);

	// Find selected filter object
	let selectedFilter = $derived(filters.find((f) => f.id === selectedValue) || filters[0]);

	// Convert filters to dropdown items (for non-delete mode)
	let dropdownItems = $derived.by(() => {
		const items: DropdownItem[] = filters.map((filter) => {
			const item: DropdownItem = {
				id: filter.id,
				label: filter.name,
				icon: showIcon && filter.icon ? filter.icon : undefined,
				description: showDescription && filter.description ? filter.description : undefined,
				disabled: filter.disabled || false
			};
			return item;
		});

		// Add divider before add action if we have filters
		if (showAddAction && items.length > 0) {
			items[items.length - 1] = {
				...items[items.length - 1],
				divider: true
			};
		}

		// Add the "Add Filter" action item
		if (showAddAction) {
			items.push({
				id: '__add_filter__',
				label: addActionLabel,
				icon: '➕'
			});
		}

		return items;
	});

	// Generate trigger label
	let triggerLabel = $derived.by(() => {
		if (customLabel) return customLabel;
		if (!selectedFilter) return placeholder;

		let displayLabel = '';
		if (showIcon && selectedFilter.icon) {
			displayLabel = `${selectedFilter.icon} `;
		}
		displayLabel += selectedFilter.name;
		return displayLabel;
	});

	// Handle filter selection
	function handleItemClick(item: DropdownItem, index: number) {
		// Handle add action
		if (item.id === '__add_filter__') {
			onAdd?.();
			return;
		}

		const filterId = item.id;
		const filter = filters.find((f) => f.id === filterId);
		if (!filter || filter.disabled || disabled) return;

		if (!isControlled) {
			internalValue = filterId;
		}
		onChange?.(filterId, filter);
	}

	// Handle filter click in custom mode
	function handleFilterClick(filter: SavedFilter) {
		if (filter.disabled || disabled) return;

		if (!isControlled) {
			internalValue = filter.id;
		}
		onChange?.(filter.id, filter);
		// Close dropdown after selection
		dropdownOpen = false;
	}

	// Handle delete action
	function handleDeleteClick(filter: SavedFilter) {
		if (filter.disabled || disabled) return;
		onDelete?.(filter.id, filter);
		// Don't close dropdown - user might want to delete more
	}

	// Handle open change (for accessibility)
	function handleOpenChange(open: boolean) {
		dropdownOpen = open;
	}
</script>

<div class={wrapperClasses}>
	{#if showDeleteAction && filters.length > 0}
		<!-- Custom rendering with delete buttons using Dropdown's children snippet -->
		<Dropdown
			label={triggerLabel}
			{position}
			{align}
			{variant}
			{size}
			{disabled}
			{loading}
			open={dropdownOpen}
			ariaLabel={ariaLabel || 'Saved filters dropdown'}
			closeOnSelect={false}
			onOpenChange={handleOpenChange}
			class={className}
			{...props}
		>
			<ul role="menu">
				{#each filters as filter (filter.id)}
					<li
						class={[filter.disabled && 'pointer-events-none opacity-50'].filter(Boolean).join(' ')}
						role="menuitem"
					>
						<div class="flex w-full items-center justify-between gap-2">
							<Button
								label={showIcon && filter.icon ? `${filter.icon} ${filter.name}` : filter.name}
								variant="ghost"
								size="sm"
								disabled={filter.disabled || disabled}
								onclick={() => handleFilterClick(filter)}
								ariaLabel="Select filter {filter.name}"
							/>
							<IconButton
								variant="ghost"
								size="xs"
								ariaLabel="Delete filter {filter.name}"
								onclick={() => handleDeleteClick(filter)}
							>
								{#snippet children()}
									<Text>🗑️</Text>
								{/snippet}
							</IconButton>
						</div>
					</li>
				{/each}
				{#if showAddAction}
					<div class="divider my-1" role="separator" aria-orientation="horizontal"></div>
					<li role="menuitem">
						<Button
							label="➕ {addActionLabel}"
							variant="ghost"
							size="sm"
							onclick={() => onAdd?.()}
							ariaLabel={addActionLabel}
						/>
					</li>
				{/if}
			</ul>
		</Dropdown>
	{:else if filters.length === 0}
		<!-- Empty state -->
		<Dropdown
			items={showAddAction ? [{ id: '__add_filter__', label: addActionLabel, icon: '➕' }] : []}
			label={placeholder}
			{position}
			{align}
			{variant}
			{size}
			{disabled}
			{loading}
			ariaLabel={ariaLabel || 'Saved filters dropdown'}
			closeOnSelect={true}
			onItemClick={handleItemClick}
			onOpenChange={handleOpenChange}
			class={className}
			{...props}
		/>
	{:else}
		<!-- Standard rendering using Dropdown items -->
		<Dropdown
			items={dropdownItems}
			label={triggerLabel}
			{position}
			{align}
			{variant}
			{size}
			{disabled}
			{loading}
			ariaLabel={ariaLabel || 'Saved filters dropdown'}
			closeOnSelect={true}
			onItemClick={handleItemClick}
			onOpenChange={handleOpenChange}
			class={className}
			{...props}
		/>
	{/if}
</div>
