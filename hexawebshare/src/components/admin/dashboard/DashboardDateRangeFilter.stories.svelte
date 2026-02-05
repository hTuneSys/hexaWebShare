<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardDateRangeFilter from './DashboardDateRangeFilter.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/Dashboard/DashboardDateRangeFilter',
		component: DashboardDateRangeFilter,
		tags: ['autodocs'],
		argTypes: {
			startDate: {
				control: 'text',
				description: 'Start date value (ISO date string: YYYY-MM-DD)'
			},
			endDate: {
				control: 'text',
				description: 'End date value (ISO date string: YYYY-MM-DD)'
			},
			min: {
				control: 'text',
				description: 'Minimum selectable date (ISO date string: YYYY-MM-DD)'
			},
			max: {
				control: 'text',
				description: 'Maximum selectable date (ISO date string: YYYY-MM-DD)'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the date range picker'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the date range picker'
			},
			label: {
				control: 'text',
				description: 'Label text for the date range picker'
			},
			startLabel: {
				control: 'text',
				description: 'Start date label text'
			},
			endLabel: {
				control: 'text',
				description: 'End date label text'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			},
			helpText: {
				control: 'text',
				description: 'Helper text or description'
			},
			required: {
				control: 'boolean',
				description: 'Whether the date range picker is required'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the date range picker is disabled'
			},
			showPresets: {
				control: 'boolean',
				description: 'Whether to show preset date range buttons'
			},
			showCard: {
				control: 'boolean',
				description: 'Whether to show the filter in a card container'
			},
			id: {
				control: 'text',
				description: 'HTML id prefix for the date inputs'
			},
			name: {
				control: 'text',
				description: 'HTML name prefix for form submission'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			presetAriaLabelTemplate: {
				control: 'text',
				description: 'Template for preset button aria-labels. Use {label} as placeholder.',
				table: {
					defaultValue: { summary: 'Select {label} date range' }
				}
			},
			presets: {
				control: 'object',
				description: 'Array of custom preset date ranges. Set to undefined to use default presets.',
				table: {
					type: { summary: 'DateRangePreset[] | undefined' },
					defaultValue: { summary: 'undefined (uses default presets)' }
				}
			}
		},
		args: {
			showPresets: true,
			showCard: true,
			onStartDateChange: fn(),
			onEndDateChange: fn(),
			onStartDateInput: fn(),
			onEndDateInput: fn(),
			onPresetSelect: fn()
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		label: 'Date Range Filter',
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>

<!-- With Selected Dates -->
<Story
	name="With Selected Dates"
	args={{
		label: 'Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20',
		showPresets: true,
		showCard: true,
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>

<!-- Without Card -->
<Story
	name="Without Card"
	args={{
		label: 'Date Range Filter',
		showPresets: true,
		showCard: false,
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>

<!-- Without Presets -->
<Story
	name="Without Presets"
	args={{
		label: 'Date Range',
		showPresets: false,
		showCard: true,
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>

<!-- Disabled State -->
<Story
	name="Disabled State"
	args={{
		label: 'Date Range Filter',
		disabled: true,
		startDate: '2025-01-15',
		endDate: '2025-01-20',
		showPresets: true,
		showCard: true,
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>

<!-- With Error -->
<Story
	name="With Error"
	args={{
		label: 'Date Range',
		error: 'Please select a valid date range',
		showPresets: true,
		showCard: true,
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>

<!-- With Date Limits -->
<Story
	name="With Date Limits"
	args={{
		label: 'Date Range',
		min: '2025-01-01',
		max: '2025-12-31',
		helpText: 'Select dates within 2025',
		showPresets: true,
		showCard: true,
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Dashboard Date Range Filter',
		startDate: '2025-01-15',
		endDate: '2025-01-20',
		startLabel: 'Start Date',
		endLabel: 'End Date',
		min: undefined,
		max: undefined,
		variant: 'primary',
		size: 'md',
		required: false,
		disabled: false,
		showPresets: true,
		showCard: true,
		error: '',
		helpText: 'Select a date range to filter your dashboard data',
		presets: undefined,
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn(),
		onPresetSelect: fn()
	}}
/>
