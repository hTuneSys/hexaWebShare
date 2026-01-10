<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import SavedFiltersDropdown, { type SavedFilter } from './SavedFiltersDropdown.svelte';

	// Sample filters for stories
	const basicFilters: SavedFilter[] = [
		{ id: 1, name: 'All Items' },
		{ id: 2, name: 'Active' },
		{ id: 3, name: 'Completed' },
		{ id: 4, name: 'Archived' }
	];

	const filtersWithIcons: SavedFilter[] = [
		{ id: 1, name: 'All Items', icon: '📋' },
		{ id: 2, name: 'Active', icon: '✅' },
		{ id: 3, name: 'In Progress', icon: '🔄' },
		{ id: 4, name: 'Completed', icon: '🎉' },
		{ id: 5, name: 'Archived', icon: '📦' }
	];

	const filtersWithDescriptions: SavedFilter[] = [
		{ id: 1, name: 'High Priority', icon: '🔴', description: 'Urgent tasks that need attention' },
		{
			id: 2,
			name: 'Medium Priority',
			icon: '🟡',
			description: 'Important but not urgent'
		},
		{ id: 3, name: 'Low Priority', icon: '🟢', description: 'Can be done later' },
		{
			id: 4,
			name: 'Team Tasks',
			icon: '👥',
			description: 'Assigned to multiple team members'
		}
	];

	const filtersWithDefault: SavedFilter[] = [
		{ id: 1, name: 'All Items', icon: '📋' },
		{ id: 2, name: 'My Tasks', icon: '👤', isDefault: true },
		{ id: 3, name: 'Team Tasks', icon: '👥' }
	];

	const filtersWithDisabled: SavedFilter[] = [
		{ id: 1, name: 'All Items', icon: '📋' },
		{ id: 2, name: 'Active', icon: '✅' },
		{ id: 3, name: 'Premium Only', icon: '⭐', disabled: true },
		{ id: 4, name: 'Enterprise', icon: '🏢', disabled: true }
	];

	const emptyFilters: SavedFilter[] = [];

	const { Story } = defineMeta({
		component: SavedFiltersDropdown,
		title: 'Utility/Utility/SavedFiltersDropdown',
		tags: ['autodocs'],
		argTypes: {
			filters: {
				control: 'object',
				description: 'Array of saved filters to display'
			},
			value: {
				control: 'text',
				description: 'Currently selected filter ID (controlled mode)'
			},
			defaultValue: {
				control: 'text',
				description: 'Default selected filter ID (uncontrolled mode)'
			},
			label: {
				control: 'text',
				description: 'Label for the trigger button'
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text when no filters available'
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
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'ghost'],
				description: 'Visual variant of the dropdown trigger'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for dropdown'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the dropdown'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			showIcon: {
				control: 'boolean',
				description: 'Show filter icons'
			},
			showDescription: {
				control: 'boolean',
				description: 'Show filter descriptions'
			},
			showAddAction: {
				control: 'boolean',
				description: 'Show add filter action'
			},
			addActionLabel: {
				control: 'text',
				description: 'Label for the add action button'
			},
			customLabel: {
				control: 'text',
				description: 'Custom trigger label'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the dropdown'
			},
			onChange: { action: 'onChange' },
			onAdd: { action: 'onAdd' },
			onDelete: { action: 'onDelete' },
			horizontalAlign: {
				control: { type: 'select' },
				options: ['start', 'center', 'end'],
				description: 'Horizontal alignment of the component'
			},
			fullWidth: {
				control: 'boolean',
				description: 'Expand to full width of container'
			}
		},
		args: {
			filters: basicFilters,
			label: 'Saved Filters',
			placeholder: 'No saved filters',
			position: 'bottom',
			align: 'start',
			variant: 'default',
			size: 'md',
			disabled: false,
			loading: false,
			showIcon: true,
			showDescription: false,
			showAddAction: false,
			addActionLabel: 'Add Filter',
			horizontalAlign: 'start',
			fullWidth: false,
			onChange: fn(),
			onAdd: fn(),
			onDelete: fn()
		}
	});
</script>

<!-- Default -->
<Story name="Default" />

<!-- With Icons -->
<Story name="With Icons" args={{ filters: filtersWithIcons }} />

<!-- With Descriptions -->
<Story
	name="With Descriptions"
	args={{ filters: filtersWithDescriptions, showDescription: true }}
/>

<!-- Small Size -->
<Story name="Small Size" args={{ filters: filtersWithIcons, size: 'sm' }} />

<!-- Large Size -->
<Story name="Large Size" args={{ filters: filtersWithIcons, size: 'lg' }} />

<!-- Bordered Variant -->
<Story name="Bordered Variant" args={{ filters: filtersWithIcons, variant: 'bordered' }} />

<!-- Ghost Variant -->
<Story name="Ghost Variant" args={{ filters: filtersWithIcons, variant: 'ghost' }} />

<!-- Position Top -->
<Story name="Position Top" args={{ filters: filtersWithIcons, position: 'top' }} />

<!-- Disabled State -->
<Story name="Disabled State" args={{ filters: filtersWithIcons, disabled: true }} />

<!-- Loading State -->
<Story name="Loading State" args={{ filters: filtersWithIcons, loading: true }} />

<!-- With Actions -->
<Story
	name="With Actions"
	args={{
		filters: filtersWithIcons,
		showAddAction: true,
		showDeleteAction: true,
		addActionLabel: 'Create New Filter'
	}}
/>

<!-- Empty State -->
<Story
	name="Empty State"
	args={{ filters: emptyFilters, placeholder: 'No filters saved yet', showAddAction: true }}
/>

<!-- Center Aligned -->
<Story
	name="Center Aligned"
	args={{ filters: filtersWithIcons, horizontalAlign: 'center', fullWidth: true }}
/>

<!-- Full Width -->
<Story
	name="Full Width"
	args={{ filters: filtersWithIcons, fullWidth: true, horizontalAlign: 'end' }}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		filters: filtersWithDescriptions,
		label: 'Saved Filters',
		placeholder: 'No saved filters',
		position: 'bottom',
		align: 'start',
		variant: 'default',
		size: 'md',
		disabled: false,
		loading: false,
		showIcon: true,
		showDescription: true,
		showAddAction: true,
		addActionLabel: 'Add Filter',
		horizontalAlign: 'start',
		fullWidth: false,
		onChange: fn(),
		onAdd: fn(),
		onDelete: fn()
	}}
/>
