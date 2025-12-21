<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DatePicker from './DatePicker.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/DatePicker',
		component: DatePicker,
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
				description: 'Color variant of the date picker'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the date picker'
			},
			value: {
				control: 'date',
				description: 'Current date value (ISO date string: YYYY-MM-DD)'
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
				description: 'Label text for the date picker'
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
				description: 'Whether the date picker is required'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the date picker is disabled'
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text (not used for date inputs)'
			},
			id: {
				control: 'text',
				description: 'HTML id attribute'
			},
			name: {
				control: 'text',
				description: 'HTML name attribute for form submission'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			onchange: fn(),
			oninput: fn()
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Select Date' }} />

<!-- With Value -->
<Story name="With Value" args={{ label: 'Birth Date', value: '1990-01-15' }} />

<!-- Variant Stories -->
<Story
	name="Primary"
	args={{ variant: 'primary', label: 'Primary Date Picker', value: '2025-01-15' }}
/>

<Story
	name="Secondary"
	args={{ variant: 'secondary', label: 'Secondary Date Picker', value: '2025-01-15' }}
/>

<Story
	name="Accent"
	args={{ variant: 'accent', label: 'Accent Date Picker', value: '2025-01-15' }}
/>

<Story
	name="Neutral"
	args={{ variant: 'neutral', label: 'Neutral Date Picker', value: '2025-01-15' }}
/>

<Story name="Info" args={{ variant: 'info', label: 'Info Date Picker', value: '2025-01-15' }} />

<Story
	name="Success"
	args={{ variant: 'success', label: 'Success Date Picker', value: '2025-01-15' }}
/>

<Story
	name="Warning"
	args={{ variant: 'warning', label: 'Warning Date Picker', value: '2025-01-15' }}
/>

<Story name="Error" args={{ variant: 'error', label: 'Error Date Picker', value: '2025-01-15' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', label: 'Extra Small', value: '2025-01-15' }} />

<Story name="Small" args={{ size: 'sm', label: 'Small', value: '2025-01-15' }} />

<Story name="Medium" args={{ size: 'md', label: 'Medium (Default)', value: '2025-01-15' }} />

<Story name="Large" args={{ size: 'lg', label: 'Large', value: '2025-01-15' }} />

<!-- State Stories -->
<Story name="Required" args={{ label: 'Required Date *', required: true }} />

<Story
	name="Disabled"
	args={{ label: 'Disabled Date Picker', disabled: true, value: '2025-01-15' }}
/>

<Story
	name="Disabled with Value"
	args={{ label: 'Disabled with Value', disabled: true, value: '2025-01-15' }}
/>

<Story name="With Error" args={{ label: 'Date', error: 'Please select a valid date' }} />

<Story
	name="With Help Text"
	args={{ label: 'Event Date', helpText: 'Select a date for your event' }}
/>

<Story
	name="Error with Variant"
	args={{ variant: 'secondary', label: 'Date', error: 'This field is required' }}
/>

<!-- Date Range Stories -->
<Story
	name="With Min Date"
	args={{ label: 'Future Date', min: '2025-01-01', helpText: 'Select a date from 2025 onwards' }}
/>

<Story
	name="With Max Date"
	args={{ label: 'Past Date', max: '2024-12-31', helpText: 'Select a date before 2025' }}
/>

<Story
	name="With Date Range"
	args={{
		label: 'Date Range',
		min: '2025-01-01',
		max: '2025-12-31',
		helpText: 'Select a date within 2025'
	}}
/>

<!-- Combined States -->
<Story
	name="Required with Error"
	args={{ label: 'Required Date *', required: true, error: 'This field is required' }}
/>

<Story
	name="Required with Help Text"
	args={{ label: 'Event Date *', required: true, helpText: 'Select the date for your event' }}
/>

<Story
	name="Medium Error Required"
	args={{
		variant: 'secondary',
		size: 'lg',
		label: 'Date *',
		required: true,
		error: 'This field is required'
	}}
/>

<!-- Without Label -->
<Story
	name="No Label"
	args={{ ariaLabel: 'Date picker without visible label', value: '2025-01-15' }}
/>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-xs space-y-4">
		<DatePicker variant="primary" label="Primary" value="2025-01-15" />
		<DatePicker variant="secondary" label="Secondary" value="2025-01-15" />
		<DatePicker variant="accent" label="Accent" value="2025-01-15" />
		<DatePicker variant="neutral" label="Neutral" value="2025-01-15" />
		<DatePicker variant="info" label="Info" value="2025-01-15" />
		<DatePicker variant="success" label="Success" value="2025-01-15" />
		<DatePicker variant="warning" label="Warning" value="2025-01-15" />
		<DatePicker variant="error" label="Error" value="2025-01-15" />
	</div>
</Story>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="w-full max-w-xs space-y-4">
		<DatePicker size="xs" label="Extra Small" value="2025-01-15" />
		<DatePicker size="sm" label="Small" value="2025-01-15" />
		<DatePicker size="md" label="Medium" value="2025-01-15" />
		<DatePicker size="lg" label="Large" value="2025-01-15" />
	</div>
</Story>

<!-- Form Example -->
<Story name="Form Example">
	<form class="space-y-4" on:submit|preventDefault={() => {}}>
		<DatePicker
			label="Start Date *"
			name="startDate"
			required={true}
			min="2025-12-11"
			value="2025-12-25"
		/>
		<DatePicker
			label="End Date *"
			name="endDate"
			required={true}
			min="2025-12-25"
			helpText="Must be after start date"
		/>
		<DatePicker
			label="Birth Date"
			name="birthDate"
			max="2010-12-31"
			helpText="Must be before 2011"
		/>
		<DatePicker label="Event Date" name="eventDate" error="Please select a valid date" />
		<button type="submit" class="btn btn-primary"> Submit </button>
	</form>
</Story>

<!-- Interactive States -->
<Story name="Interactive States">
	<div class="w-full max-w-xs space-y-4">
		<DatePicker label="Default" />
		<DatePicker label="With Value" value="2025-06-15" />
		<DatePicker label="Required" required={true} />
		<DatePicker label="Disabled" disabled={true} value="2025-01-15" />
		<DatePicker label="With Error" error="Invalid date selected" />
		<DatePicker label="With Help Text" helpText="Select your preferred date" />
	</div>
</Story>
