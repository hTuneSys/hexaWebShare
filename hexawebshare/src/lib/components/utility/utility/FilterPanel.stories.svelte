<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FilterPanel from './FilterPanel.svelte';
	import type { FilterItem } from './FilterPanel.svelte';

	const defaultItems: FilterItem[] = [
		{ id: 1, label: 'Option A', checked: false, disabled: false },
		{ id: 2, label: 'Option B', checked: false, disabled: false },
		{ id: 3, label: 'Option C', checked: false, disabled: false },
		{ id: 4, label: 'Option D', checked: false, disabled: false }
	];

	const preselectedItems: FilterItem[] = [
		{ id: 1, label: 'Option A', checked: true, disabled: false },
		{ id: 2, label: 'Option B', checked: false, disabled: false },
		{ id: 3, label: 'Option C', checked: true, disabled: false },
		{ id: 4, label: 'Option D', checked: false, disabled: false }
	];

	const itemsWithDisabled: FilterItem[] = [
		{ id: 1, label: 'Option A', checked: false, disabled: false },
		{ id: 2, label: 'Option B', checked: false, disabled: true },
		{ id: 3, label: 'Option C', checked: false, disabled: false },
		{ id: 4, label: 'Option D', checked: false, disabled: true }
	];

	const { Story } = defineMeta({
		component: FilterPanel,
		title: 'Utility/Utility/FilterPanel',
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'ghost'],
				description: 'Visual variant of the dropdown'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for the component'
			},
			position: {
				control: { type: 'select' },
				options: ['bottom', 'top', 'left', 'right'],
				description: 'Position of dropdown content relative to trigger'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'end'],
				description: 'Alignment of dropdown content'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the filter panel is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the filter panel is in loading state'
			},
			onApply: { action: 'apply' },
			onClear: { action: 'clear' },
			onChange: { action: 'change' },
			onChipRemove: { action: 'chipRemove' }
		},
		args: {
			items: defaultItems,
			triggerLabel: 'Filters',
			applyLabel: 'Apply',
			clearLabel: 'Clear',
			ariaLabel: 'Filter options',
			chipCloseLabel: 'Remove filter',
			checkboxListAriaLabel: 'Filter checkbox list',
			actionsAriaLabel: 'Filter actions',
			selectedFiltersAriaLabel: 'Selected filters',
			variant: 'default',
			size: 'md',
			position: 'bottom',
			align: 'start',
			disabled: false,
			loading: false,
			class: '',
			onApply: fn(),
			onClear: fn(),
			onChange: fn(),
			onChipRemove: fn()
		}
	});
</script>

<!-- Story 1: Default -->
<Story name="Default" />

<!-- Story 2: With Preselected Items -->
<Story name="WithPreselected" args={{ items: preselectedItems }} />

<!-- Story 3: Small Size -->
<Story name="SmallSize" args={{ size: 'sm' }} />

<!-- Story 4: Large Size -->
<Story name="LargeSize" args={{ size: 'lg' }} />

<!-- Story 5: Bordered Variant -->
<Story name="BorderedVariant" args={{ variant: 'bordered' }} />

<!-- Story 6: Ghost Variant -->
<Story name="GhostVariant" args={{ variant: 'ghost' }} />

<!-- Story 7: With Disabled Items -->
<Story name="WithDisabledItems" args={{ items: itemsWithDisabled }} />

<!-- Story 8: Disabled State -->
<Story name="DisabledState" args={{ disabled: true }} />

<!-- Story 9: Loading State -->
<Story name="LoadingState" args={{ loading: true }} />

<!-- Story 10: Playground (Interactive) -->
<Story name="Playground" />
