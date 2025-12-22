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

<!-- Default Story -->
<Story name="Default" args={{ label: 'Date Range' }} />

<!-- With Label -->
<Story
	name="With Label"
	args={{ label: 'Select Date Range', startLabel: 'From', endLabel: 'To' }}
/>

<!-- With Value -->
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

<!-- Variant Stories -->
<Story
	name="Primary"
	args={{
		variant: 'primary',
		label: 'Primary Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Secondary"
	args={{
		variant: 'secondary',
		label: 'Secondary Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Accent"
	args={{
		variant: 'accent',
		label: 'Accent Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Neutral"
	args={{
		variant: 'neutral',
		label: 'Neutral Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Info"
	args={{
		variant: 'info',
		label: 'Info Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Success"
	args={{
		variant: 'success',
		label: 'Success Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Warning"
	args={{
		variant: 'warning',
		label: 'Warning Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Error"
	args={{
		variant: 'error',
		label: 'Error Date Range',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<!-- Size Stories -->
<Story
	name="Extra Small"
	args={{ size: 'xs', label: 'Extra Small', startDate: '2025-01-15', endDate: '2025-01-20' }}
/>

<Story
	name="Small"
	args={{ size: 'sm', label: 'Small', startDate: '2025-01-15', endDate: '2025-01-20' }}
/>

<Story
	name="Medium"
	args={{ size: 'md', label: 'Medium (Default)', startDate: '2025-01-15', endDate: '2025-01-20' }}
/>

<Story
	name="Large"
	args={{ size: 'lg', label: 'Large', startDate: '2025-01-15', endDate: '2025-01-20' }}
/>

<!-- State Stories -->
<Story
	name="Required"
	args={{ label: 'Date Range', required: true, startLabel: 'Start Date', endLabel: 'End Date' }}
/>

<Story
	name="Disabled"
	args={{
		label: 'Disabled Date Range',
		disabled: true,
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<Story
	name="Disabled with Value"
	args={{
		label: 'Disabled with Value',
		disabled: true,
		startDate: '2025-01-15',
		endDate: '2025-01-20',
		startLabel: 'Start Date',
		endLabel: 'End Date'
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
	name="With Help Text"
	args={{
		label: 'Event Date Range',
		helpText: 'Select the start and end dates for your event',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="With Min Date"
	args={{
		label: 'Future Date Range',
		min: '2025-01-01',
		helpText: 'Select dates from 2025 onwards',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="With Max Date"
	args={{
		label: 'Past Date Range',
		max: '2024-12-31',
		helpText: 'Select dates before 2025',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="With Date Range"
	args={{
		label: 'Date Range',
		min: '2025-01-01',
		max: '2025-12-31',
		helpText: 'Select dates within 2025',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="Required with Error"
	args={{
		label: 'Date Range',
		required: true,
		error: 'This field is required',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="Required with Help Text"
	args={{
		label: 'Event Date Range',
		required: true,
		helpText: 'Select the start and end dates for your event',
		startLabel: 'Start Date',
		endLabel: 'End Date'
	}}
/>

<Story
	name="No Label"
	args={{
		ariaLabel: 'Date range picker without visible label',
		startDate: '2025-01-15',
		endDate: '2025-01-20'
	}}
/>

<!-- Form Example -->
<Story name="Form Example">
	<form class="w-full max-w-md space-y-4" on:submit|preventDefault={() => {}}>
		<DateRangePicker
			label="Event Date Range"
			name="eventDateRange"
			required={true}
			min="2025-01-01"
			startDate="2025-06-15"
			endDate="2025-06-20"
			startLabel="Start Date"
			endLabel="End Date"
			helpText="Select the date range for your event"
		/>
		<button type="submit" class="btn btn-primary"> Submit </button>
	</form>
</Story>
