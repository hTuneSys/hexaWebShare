<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DateRangePicker from './DateRangePicker.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/DateRangePicker',
		component: DateRangePicker,
		tags: ['autodocs'],
		argTypes: {
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
			startDate: {
				control: 'date',
				description: 'Start date value (ISO date string: YYYY-MM-DD)'
			},
			endDate: {
				control: 'date',
				description: 'End date value (ISO date string: YYYY-MM-DD)'
			},
			min: {
				control: 'date',
				description: 'Minimum selectable date (ISO date string: YYYY-MM-DD)'
			},
			max: {
				control: 'date',
				description: 'Maximum selectable date (ISO date string: YYYY-MM-DD)'
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
			}
		},
		args: {
			onStartDateChange: fn(),
			onEndDateChange: fn(),
			onStartDateInput: fn(),
			onEndDateInput: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Date Range' }} />

<Story
	name="With Value"
	args={{
		label: 'Event Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="Primary Variant"
	args={{
		variant: 'primary',
		label: 'Primary Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Small Size"
	args={{ size: 'sm', label: 'Small', startDate: '2025-01-15', endDate: '2025-01-20' }}
/>

<Story
	name="Large Size"
	args={{ size: 'lg', label: 'Large', startDate: '2025-01-15', endDate: '2025-01-20' }}
/>

<Story
	name="Required Field"
	args={{ label: 'Date Range', required: true, startLabel: 'Start Date', endLabel: 'End Date' }}
/>

<Story
	name="Disabled State"
	args={{
		label: 'Disabled Date Range',
		disabled: true,
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Date Range',
		error: 'Please select a valid date range',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="With Date Range Limit"
	args={{
		label: 'Date Range',
		min: '2025-01-01',
		max: '2025-12-31',
		helpText: 'Select dates within 2025',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		startDate: '2025-01-15',
		endDate: '2025-01-20',
		startLabel: 'Start Date',
		endLabel: 'End Date',
		variant: 'primary',
		size: 'md',
		required: false,
		disabled: false,
		helpText: 'Select your date range',
		onStartDateChange: fn(),
		onEndDateChange: fn(),
		onStartDateInput: fn(),
		onEndDateInput: fn()
	}}
/>
