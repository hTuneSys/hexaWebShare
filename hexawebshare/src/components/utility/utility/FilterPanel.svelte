<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import Checkbox from '../../core/forms/Checkbox.svelte';
	import Chip from '../../core/media/Chip.svelte';
	import Grid from '../../core/layout/Grid.svelte';
	import Row from '../../core/layout/Row.svelte';
	import Divider from '../../core/layout/Divider.svelte';

	/**
	 * Component configuration constants
	 * Centralized to avoid embedded strings in template
	 * Following AGENTS.md "No Hardcoded Strings" rule
	 */
	const COMPONENT_CONFIG = {
		LAYOUT: {
			ALIGN: 'center',
			JUSTIFY: 'start',
			WRAP: true,
			COLUMNS: 1
		},
		VARIANTS: {
			BUTTON_CLEAR: 'ghost',
			BUTTON_APPLY: 'primary',
			DROPDOWN_CLOSE_ON_SELECT: false,
			CHIP_CLOSABLE: true
		},
		SPACING: {
			CONTAINER_GAP: 'sm',
			CONTENT_GAP: 'xs',
			ACTIONS_GAP: '2',
			CHIPS_GAP: '1',
			CONTENT_PADDING: 'p-2'
		}
	} as const;

	/**
	 * FilterItem interface for individual filter options
	 */
	export interface FilterItem {
		/**
		 * Unique identifier for the filter item
		 */
		id: string | number;
		/**
		 * Display label for the filter item
		 */
		label: string;
		/**
		 * Whether the filter item is checked/selected
		 */
		checked: boolean;
		/**
		 * Whether the filter item is disabled
		 */
		disabled: boolean;
	}

	/**
	 * Props interface for FilterPanel component
	 * All props are required (no default values)
	 */
	interface Props {
		/**
		 * Array of filter items to display
		 */
		items: FilterItem[];
		/**
		 * Label for the dropdown trigger button
		 */
		triggerLabel: string;
		/**
		 * Label for the apply button
		 */
		applyLabel: string;
		/**
		 * Label for the clear button
		 */
		clearLabel: string;
		/**
		 * Accessible label for the filter panel
		 */
		ariaLabel: string;
		/**
		 * Accessible label for chip close buttons
		 */
		chipCloseLabel: string;
		/**
		 * Accessible label for the checkbox list
		 */
		checkboxListAriaLabel: string;
		/**
		 * Accessible label for the action buttons row
		 */
		actionsAriaLabel: string;
		/**
		 * Accessible label for the selected filters row
		 */
		selectedFiltersAriaLabel: string;
		/**
		 * Visual variant of the dropdown
		 */
		variant: 'default' | 'bordered' | 'ghost';
		/**
		 * Size preset for the component
		 */
		size: 'sm' | 'md' | 'lg';
		/**
		 * Position of dropdown content relative to trigger
		 */
		position: 'bottom' | 'top' | 'left' | 'right';
		/**
		 * Alignment of dropdown content
		 */
		align: 'start' | 'end';
		/**
		 * Whether the filter panel is disabled
		 */
		disabled: boolean;
		/**
		 * Whether the filter panel is in loading state
		 */
		loading: boolean;
		/**
		 * Callback when apply button is clicked
		 */
		onApply: (selectedItems: FilterItem[]) => void;
		/**
		 * Callback when clear button is clicked
		 */
		onClear: () => void;
		/**
		 * Callback when a filter item selection changes
		 */
		onChange: (item: FilterItem, checked: boolean) => void;
		/**
		 * Callback when a chip is removed
		 */
		onChipRemove: (item: FilterItem) => void;
		/**
		 * Additional CSS classes for the container
		 */
		class: string;
	}

	const {
		items,
		triggerLabel,
		applyLabel,
		clearLabel,
		ariaLabel,
		chipCloseLabel,
		checkboxListAriaLabel,
		actionsAriaLabel,
		selectedFiltersAriaLabel,
		variant,
		size,
		position,
		align,
		disabled,
		loading,
		onApply,
		onClear,
		onChange,
		onChipRemove,
		class: className,
		...props
	}: Props = $props();

	// Internal state - track checked items locally
	let internalItems = $state<FilterItem[]>([]);

	// Sync internal items with props
	$effect(() => {
		internalItems = items.map((item) => ({ ...item }));
	});

	// Derived: Get selected/checked items
	let selectedItems = $derived(internalItems.filter((item) => item.checked));

	// Derived: Check if any filters are selected
	let hasSelectedItems = $derived(selectedItems.length > 0);

	// Handle checkbox change
	function handleCheckboxChange(item: FilterItem, index: number) {
		if (disabled || item.disabled) return;

		const newChecked = !internalItems[index].checked;
		internalItems[index].checked = newChecked;
		onChange(item, newChecked);
	}

	// Handle apply button click
	function handleApply() {
		if (disabled || loading) return;
		onApply(selectedItems);
	}

	// Handle clear button click
	function handleClear() {
		if (disabled || loading) return;
		internalItems = internalItems.map((item) => ({ ...item, checked: false }));
		onClear();
	}

	// Handle chip remove
	function handleChipRemove(item: FilterItem) {
		if (disabled || loading) return;
		const index = internalItems.findIndex((i) => i.id === item.id);
		if (index !== -1) {
			internalItems[index].checked = false;
			onChipRemove(item);
		}
	}
</script>

<Grid
	columns={COMPONENT_CONFIG.LAYOUT.COLUMNS}
	gap={COMPONENT_CONFIG.SPACING.CONTAINER_GAP}
	class={className}
	{ariaLabel}
	{...props}
>
	{#snippet children()}
		<Dropdown
			label={triggerLabel}
			{variant}
			{size}
			{position}
			{align}
			{disabled}
			{loading}
			{ariaLabel}
			closeOnSelect={COMPONENT_CONFIG.VARIANTS.DROPDOWN_CLOSE_ON_SELECT}
		>
			{#snippet children()}
				<Grid
					columns={COMPONENT_CONFIG.LAYOUT.COLUMNS}
					gap={COMPONENT_CONFIG.SPACING.CONTENT_GAP}
					class={COMPONENT_CONFIG.SPACING.CONTENT_PADDING}
					ariaLabel={checkboxListAriaLabel}
				>
					{#snippet children()}
						{#each internalItems as item, index (item.id)}
							<Checkbox
								label={item.label}
								checked={item.checked}
								disabled={disabled || item.disabled}
								{size}
								onchange={() => handleCheckboxChange(item, index)}
							/>
						{/each}

						<Divider />

						<Row
							gap={COMPONENT_CONFIG.SPACING.ACTIONS_GAP}
							align={COMPONENT_CONFIG.LAYOUT.ALIGN}
							justify={COMPONENT_CONFIG.LAYOUT.JUSTIFY}
							ariaLabel={actionsAriaLabel}
						>
							{#snippet children()}
								<Button
									label={clearLabel}
									variant={COMPONENT_CONFIG.VARIANTS.BUTTON_CLEAR}
									{size}
									disabled={disabled || !hasSelectedItems}
									onclick={handleClear}
								/>
								<Button
									label={applyLabel}
									variant={COMPONENT_CONFIG.VARIANTS.BUTTON_APPLY}
									{size}
									{disabled}
									{loading}
									onclick={handleApply}
								/>
							{/snippet}
						</Row>
					{/snippet}
				</Grid>
			{/snippet}
		</Dropdown>

		{#if hasSelectedItems}
			<Row
				gap={COMPONENT_CONFIG.SPACING.CHIPS_GAP}
				align={COMPONENT_CONFIG.LAYOUT.ALIGN}
				justify={COMPONENT_CONFIG.LAYOUT.JUSTIFY}
				wrap={COMPONENT_CONFIG.LAYOUT.WRAP}
				ariaLabel={selectedFiltersAriaLabel}
			>
				{#snippet children()}
					{#each selectedItems as item (item.id)}
						<Chip
							label={item.label}
							closable={COMPONENT_CONFIG.VARIANTS.CHIP_CLOSABLE}
							onClose={() => handleChipRemove(item)}
							closeLabel={chipCloseLabel}
							{size}
							{disabled}
						/>
					{/each}
				{/snippet}
			</Row>
		{/if}
	{/snippet}
</Grid>
