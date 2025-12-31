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

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Select Date' }} />

<Story name="With Value" args={{ label: 'Birth Date', value: '1990-01-15' }} />

<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Date Picker', value: '2025-01-15' }}
/>

<Story name="Small Size" args={{ size: 'sm', label: 'Small', value: '2025-01-15' }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large', value: '2025-01-15' }} />

<Story name="Required Field" args={{ label: 'Required Date *', required: true }} />

<Story
	name="Disabled State"
	args={{ label: 'Disabled Date Picker', disabled: true, value: '2025-01-15' }}
/>

<Story name="With Error" args={{ label: 'Date', error: 'Please select a valid date' }} />

<Story
	name="With Date Range"
	args={{
		label: 'Date Range',
		min: '2025-01-01',
		max: '2025-12-31',
		helpText: 'Select a date within 2025'
	}}
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

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		value: '2025-01-15',
		variant: 'primary',
		size: 'md',
		required: false,
		disabled: false,
		helpText: 'Select your preferred date',
		onchange: fn(),
		oninput: fn()
	}}
/>
