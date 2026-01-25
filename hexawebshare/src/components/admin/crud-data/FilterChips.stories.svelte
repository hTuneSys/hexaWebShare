<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FilterChips from './FilterChips.svelte';
	import type { Filter } from './FilterChips.svelte';

	const sampleFilters: Filter[] = [
		{ id: '1', label: 'Status', value: 'Active', variant: 'success' },
		{ id: '2', label: 'Role', value: 'Admin', variant: 'primary' },
		{ id: '3', label: 'Date', value: 'Last 30 days', variant: 'info' }
	];

	const variantFilters: Filter[] = [
		{ id: 'v1', label: 'Primary', value: 'Selected', variant: 'primary' },
		{ id: 'v2', label: 'Secondary', value: 'Selected', variant: 'secondary' },
		{ id: 'v3', label: 'Accent', value: 'Selected', variant: 'accent' },
		{ id: 'v4', label: 'Neutral', value: 'Selected', variant: 'neutral' },
		{ id: 'v5', label: 'Info', value: 'Selected', variant: 'info' },
		{ id: 'v6', label: 'Success', value: 'Selected', variant: 'success' },
		{ id: 'v7', label: 'Warning', value: 'Selected', variant: 'warning' },
		{ id: 'v8', label: 'Error', value: 'Selected', variant: 'error' },
		{ id: 'v9', label: 'Ghost', value: 'Selected', variant: 'ghost' }
	];

	const manyFilters: Filter[] = Array.from({ length: 15 }, (_, i) => ({
		id: `many-${i}`,
		label: `Filter ${i + 1}`,
		value: `Value ${i + 1}`,
		variant: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'][
			i % 8
		] as any
	}));

	const { Story } = defineMeta({
		component: FilterChips,
		title: 'Admin/CRUD Data/FilterChips',
		tags: ['autodocs'],
		argTypes: {
			filters: {
				control: 'object',
				description: 'Array of active filters'
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Chip size variant'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable all chips'
			},
			clearAllLabel: {
				control: 'text',
				description: 'Label for clear all button'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the filters container'
			},
			removeFilterAriaLabelFormat: {
				control: 'text',
				description: "Format for remove button's aria-label"
			},
			onRemove: { action: 'onRemove' },
			onClearAll: { action: 'onClearAll' }
		}
	});
</script>

<!-- Story 1: Default -->
<Story
	name="Default"
	args={{
		filters: sampleFilters
	}}
/>

<!-- Story 2: Empty State -->
<Story
	name="Empty"
	args={{
		filters: []
	}}
/>

<!-- Story 3: Loading State -->
<Story
	name="Loading"
	args={{
		filters: [],
		loading: true
	}}
/>

<!-- Story 4: Disabled State -->
<Story
	name="Disabled"
	args={{
		filters: sampleFilters,
		disabled: true
	}}
/>

<!-- Story 5: Sizes -->
<Story name="Size XS" args={{ filters: sampleFilters, size: 'xs' }} />

<Story name="Size SM" args={{ filters: sampleFilters, size: 'sm' }} />

<Story name="Size MD" args={{ filters: sampleFilters, size: 'md' }} />

<Story name="Size LG" args={{ filters: sampleFilters, size: 'lg' }} />

<!-- Story 6: All Variants -->
<Story
	name="All Variants"
	args={{
		filters: variantFilters
	}}
/>

<!-- Story 7: With Clear All -->
<Story
	name="With Clear All"
	args={{
		filters: sampleFilters,
		clearAllLabel: 'Filtreleri Temizle'
	}}
/>

<!-- Story 8: Wrap & Overflow -->
<Story
	name="Wrap & Overflow"
	args={{
		filters: manyFilters
	}}
/>

<!-- Story 9: Long Content -->
<Story
	name="Long Content"
	args={{
		filters: [
			{
				id: 'long-1',
				label: 'Very Long Category Name That Might Wrap',
				value: 'Extremely Long Value That Definitely Takes Up Space',
				variant: 'primary'
			}
		]
	}}
/>

<!-- Story 10: Interactive -->
<Story
	name="Interactive"
	args={{
		filters: sampleFilters,
		onRemove: (id: string) => console.log('Remove', id),
		onClearAll: () => console.log('Clear all')
	}}
/>

<!-- Story 11: Accessibility -->
<Story
	name="Accessibility"
	args={{
		filters: sampleFilters,
		id: 'acc-filter-chips'
	}}
/>

<!-- Story 12: Loading with Filters -->
<Story
	name="Loading with Filters"
	args={{
		filters: sampleFilters,
		loading: true
	}}
/>

<!-- Story 13: Playground -->
<Story
	name="Playground"
	args={{
		filters: sampleFilters,
		size: 'md',
		loading: false,
		disabled: false,
		clearAllLabel: 'Clear all',
		ariaLabel: 'Active filters',
		removeFilterAriaLabelFormat: 'Remove {label} filter'
	}}
/>
