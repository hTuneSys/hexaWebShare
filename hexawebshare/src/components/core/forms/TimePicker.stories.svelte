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

<!-- Default Story -->
<Story name="Default" args={{ label: 'Select Time' }} />

<!-- With Value -->
<Story name="With Value" args={{ label: 'Appointment Time', value: '14:30' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary', label: 'Primary Time Picker', value: '09:00' }} />

<Story
	name="Secondary"
	args={{ variant: 'secondary', label: 'Secondary Time Picker', value: '09:00' }}
/>

<Story name="Accent" args={{ variant: 'accent', label: 'Accent Time Picker', value: '09:00' }} />

<Story name="Neutral" args={{ variant: 'neutral', label: 'Neutral Time Picker', value: '09:00' }} />

<Story name="Info" args={{ variant: 'info', label: 'Info Time Picker', value: '09:00' }} />

<Story name="Success" args={{ variant: 'success', label: 'Success Time Picker', value: '09:00' }} />

<Story name="Warning" args={{ variant: 'warning', label: 'Warning Time Picker', value: '09:00' }} />

<Story name="Error" args={{ variant: 'error', label: 'Error Time Picker', value: '09:00' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', label: 'Extra Small', value: '09:00' }} />

<Story name="Small" args={{ size: 'sm', label: 'Small', value: '09:00' }} />

<Story name="Medium" args={{ size: 'md', label: 'Medium (Default)', value: '09:00' }} />

<Story name="Large" args={{ size: 'lg', label: 'Large', value: '09:00' }} />

<!-- State Stories -->
<Story name="Required" args={{ label: 'Required Time *', required: true }} />

<Story name="Disabled" args={{ label: 'Disabled Time Picker', disabled: true, value: '14:30' }} />

<Story
	name="Disabled with Value"
	args={{ label: 'Disabled with Value', disabled: true, value: '14:30' }}
/>

<Story name="With Error" args={{ label: 'Time', error: 'Please select a valid time' }} />

<Story
	name="With Help Text"
	args={{ label: 'Meeting Time', helpText: 'Select a time for your meeting' }}
/>

<Story
	name="Error with Variant"
	args={{ variant: 'secondary', label: 'Time', error: 'This field is required' }}
/>

<!-- Time Range Stories -->
<Story
	name="With Min Time"
	args={{ label: 'Business Hours', min: '09:00', helpText: 'Select a time from 9 AM onwards' }}
/>

<Story
	name="With Max Time"
	args={{ label: 'Before Closing', max: '17:00', helpText: 'Select a time before 5 PM' }}
/>

<Story
	name="With Time Range"
	args={{
		label: 'Business Hours',
		min: '09:00',
		max: '17:00',
		helpText: 'Select a time between 9 AM and 5 PM'
	}}
/>

<!-- Step Stories -->
<Story
	name="FifteenMinuteSteps"
	args={{
		label: 'Appointment Time',
		step: 900,
		helpText: 'Time slots available in 15-minute intervals',
		value: '10:00'
	}}
/>

<Story
	name="ThirtyMinuteSteps"
	args={{
		label: 'Meeting Time',
		step: 1800,
		helpText: 'Time slots available in 30-minute intervals',
		value: '10:00'
	}}
/>

<Story
	name="OneHourSteps"
	args={{
		label: 'Hourly Schedule',
		step: 3600,
		helpText: 'Time slots available in 1-hour intervals',
		value: '10:00'
	}}
/>

<!-- Combined States -->
<Story
	name="Required with Error"
	args={{ label: 'Required Time *', required: true, error: 'This field is required' }}
/>

<Story
	name="Required with Help Text"
	args={{ label: 'Meeting Time *', required: true, helpText: 'Select the time for your meeting' }}
/>

<Story
	name="Medium Error Required"
	args={{
		variant: 'secondary',
		size: 'lg',
		label: 'Time *',
		required: true,
		error: 'This field is required'
	}}
/>

<!-- Without Label -->
<Story name="No Label" args={{ ariaLabel: 'Time picker without visible label', value: '14:30' }} />

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-xs space-y-4">
		<TimePicker variant="primary" label="Primary" value="09:00" />
		<TimePicker variant="secondary" label="Secondary" value="09:00" />
		<TimePicker variant="accent" label="Accent" value="09:00" />
		<TimePicker variant="neutral" label="Neutral" value="09:00" />
		<TimePicker variant="info" label="Info" value="09:00" />
		<TimePicker variant="success" label="Success" value="09:00" />
		<TimePicker variant="warning" label="Warning" value="09:00" />
		<TimePicker variant="error" label="Error" value="09:00" />
	</div>
</Story>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="w-full max-w-xs space-y-4">
		<TimePicker size="xs" label="Extra Small" value="09:00" />
		<TimePicker size="sm" label="Small" value="09:00" />
		<TimePicker size="md" label="Medium" value="09:00" />
		<TimePicker size="lg" label="Large" value="09:00" />
	</div>
</Story>

<!-- Form Example -->
<Story name="Form Example">
	<form class="space-y-4" on:submit|preventDefault={() => {}}>
		<TimePicker label="Start Time *" name="startTime" required={true} min="09:00" value="10:00" />
		<TimePicker
			label="End Time *"
			name="endTime"
			required={true}
			min="10:00"
			helpText="Must be after start time"
		/>
		<TimePicker
			label="Break Time"
			name="breakTime"
			min="12:00"
			max="13:00"
			helpText="Select a time between 12 PM and 1 PM"
		/>
		<TimePicker
			label="Appointment Time"
			name="appointmentTime"
			error="Please select a valid time"
		/>
		<button type="submit" class="btn btn-primary"> Submit </button>
	</form>
</Story>

<!-- Interactive States -->
<Story name="Interactive States">
	<div class="w-full max-w-xs space-y-4">
		<TimePicker label="Default" />
		<TimePicker label="With Value" value="14:30" />
		<TimePicker label="Required" required={true} />
		<TimePicker label="Disabled" disabled={true} value="14:30" />
		<TimePicker label="With Error" error="Invalid time selected" />
		<TimePicker label="With Help Text" helpText="Select your preferred time" />
	</div>
</Story>

<!-- Real-world Examples -->
<Story name="Appointment Booking">
	<div class="w-full max-w-md space-y-4">
		<TimePicker
			label="Preferred Appointment Time *"
			required={true}
			min="09:00"
			max="17:00"
			step={1800}
			helpText="Available slots: 9 AM - 5 PM (30-minute intervals)"
		/>
	</div>
</Story>

<Story name="Event Schedule">
	<div class="w-full max-w-md space-y-4">
		<TimePicker label="Event Start Time *" required={true} value="18:00" />
		<TimePicker
			label="Event End Time *"
			required={true}
			min="18:00"
			helpText="Must be after start time"
		/>
	</div>
</Story>

<!-- Interactive Playground -->
<Story name="Playground" args={{ label: 'Playground', placeholder: 'Try different props' }} />
