<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TimePicker from './TimePicker.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/TimePicker',
		component: TimePicker,
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
				description: 'Color variant of the time picker'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the time picker'
			},
			value: {
				control: 'text',
				description: 'Current time value (ISO time string: HH:MM or HH:MM:SS)'
			},
			min: {
				control: 'text',
				description: 'Minimum selectable time (ISO time string: HH:MM or HH:MM:SS)'
			},
			max: {
				control: 'text',
				description: 'Maximum selectable time (ISO time string: HH:MM or HH:MM:SS)'
			},
			step: {
				control: 'number',
				description: 'Step value in seconds (e.g., 900 for 15-minute intervals)'
			},
			label: {
				control: 'text',
				description: 'Label text for the time picker'
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
				description: 'Whether the time picker is required'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the time picker is disabled'
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text (not used for time inputs)'
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
<Story name="Default" args={{ label: 'Select Time' }} />

<Story name="With Value" args={{ label: 'Appointment Time', value: '14:30' }} />

<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Time Picker', value: '09:00' }}
/>

<Story name="Small Size" args={{ size: 'sm', label: 'Small', value: '09:00' }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large', value: '09:00' }} />

<Story name="Required Field" args={{ label: 'Required Time *', required: true }} />

<Story
	name="Disabled State"
	args={{ label: 'Disabled Time Picker', disabled: true, value: '14:30' }}
/>

<Story name="With Error" args={{ label: 'Time', error: 'Please select a valid time' }} />

<Story
	name="With Time Range"
	args={{
		label: 'Business Hours',
		min: '09:00',
		max: '17:00',
		helpText: 'Select a time between 9 AM and 5 PM'
	}}
/>

<Story
	name="Fifteen Minute Steps"
	args={{
		label: 'Appointment Time',
		step: 900,
		helpText: 'Time slots available in 15-minute intervals',
		value: '10:00'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		value: '14:30',
		variant: 'primary',
		size: 'md',
		required: false,
		disabled: false,
		helpText: 'Select your preferred time',
		onchange: fn(),
		oninput: fn()
	}}
/>
