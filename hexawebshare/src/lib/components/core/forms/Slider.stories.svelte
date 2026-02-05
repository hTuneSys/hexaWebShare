<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Slider from './Slider.svelte';

	const marksExample = [
		{ value: 0, label: '0' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' },
		{ value: 75, label: '75' },
		{ value: 100, label: '100' }
	];

	const { Story } = defineMeta({
		title: 'Core/Forms/Slider',
		component: Slider,
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
				description: 'Current value of the slider'
			},
			min: {
				control: { type: 'number' },
				description: 'Minimum selectable value'
			},
			max: {
				control: { type: 'number' },
				description: 'Maximum selectable value'
			},
			step: {
				control: { type: 'number' },
				description: 'Step between values'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Visual size of the slider'
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
				description: 'Color variant for the slider'
			},
			label: { control: 'text', description: 'Label text shown above the slider' },
			helpText: { control: 'text', description: 'Helper text displayed below the slider' },
			error: { control: 'text', description: 'Error message displayed below the slider' },
			required: { control: 'boolean', description: 'Mark the field as required' },
			showValue: { control: 'boolean', description: 'Show the current value next to the slider' },
			loading: { control: 'boolean', description: 'Display a loading spinner' },
			disabled: { control: 'boolean', description: 'Disable user interaction' },
			marks: { control: 'object', description: 'Marks rendered under the slider track' },
			ariaLabel: { control: 'text', description: 'Accessible label for screen readers' }
		},
		args: {
			value: 50,
			min: 0,
			max: 100,
			step: 1,
			size: 'md',
			variant: 'primary',
			label: 'Slider label',
			helpText: 'Use the slider to adjust the value.',
			error: '',
			required: false,
			showValue: false,
			loading: false,
			disabled: false,
			marks: [],
			ariaLabel: 'Slider'
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ value: 50, label: 'Volume', showValue: true }} />

<Story name="Primary Variant" args={{ variant: 'primary', label: 'Primary', showValue: true }} />

<Story name="Small Size" args={{ size: 'sm', label: 'Small', showValue: true }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large', showValue: true }} />

<Story
	name="Disabled State"
	args={{ disabled: true, label: 'Disabled', value: 30, showValue: true }}
/>

<Story
	name="Loading State"
	args={{ loading: true, label: 'Loading state', value: 65, showValue: true }}
/>

<Story name="Error State" args={{ error: 'Value not allowed', value: 90, showValue: true }} />

<Story
	name="Custom Range"
	args={{ min: 10, max: 200, step: 10, value: 60, showValue: true, label: 'Custom range' }}
/>

<Story
	name="With Marks"
	args={{ marks: marksExample, value: 50, label: 'With markers', showValue: true }}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		value: 50,
		min: 0,
		max: 100,
		step: 1,
		size: 'md',
		variant: 'primary',
		label: 'Slider label',
		helpText: 'Use the slider to adjust the value.',
		error: '',
		required: false,
		showValue: true,
		loading: false,
		disabled: false,
		marks: [],
		ariaLabel: 'Slider'
	}}
/>
