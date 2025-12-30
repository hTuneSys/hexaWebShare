<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RangeSlider from './RangeSlider.svelte';

	const marksExample = [
		{ value: 0, label: '0' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' },
		{ value: 75, label: '75' },
		{ value: 100, label: '100' }
	];

	const { Story } = defineMeta({
		title: 'Core/Forms/RangeSlider',
		component: RangeSlider,
		tags: ['autodocs'],
		argTypes: {
			minValue: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
				description: 'Minimum value of the range (left thumb)'
			},
			maxValue: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
				description: 'Maximum value of the range (right thumb)'
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
			showValues: {
				control: 'boolean',
				description: 'Show the current values next to the slider'
			},
			loading: { control: 'boolean', description: 'Display a loading spinner' },
			disabled: { control: 'boolean', description: 'Disable user interaction' },
			marks: { control: 'object', description: 'Marks rendered under the slider track' },
			markCount: {
				control: { type: 'number' },
				description: 'Number of auto-generated marks'
			},
			ariaLabel: { control: 'text', description: 'Accessible label for screen readers' }
		},
		args: {
			minValue: 20,
			maxValue: 80,
			min: 0,
			max: 100,
			step: 1,
			size: 'md',
			variant: 'primary',
			label: 'Price range',
			helpText: 'Select your preferred price range.',
			error: '',
			required: false,
			showValues: false,
			loading: false,
			disabled: false,
			marks: [],
			markCount: 5,
			ariaLabel: 'Range slider'
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{ minValue: 20, maxValue: 80, label: 'Price range', showValues: true }}
/>

<Story
	name="Primary Variant"
	args={{ variant: 'primary', minValue: 25, maxValue: 75, label: 'Primary', showValues: true }}
/>

<Story
	name="Small Size"
	args={{ size: 'sm', minValue: 25, maxValue: 75, label: 'Small', showValues: true }}
/>

<Story
	name="Large Size"
	args={{ size: 'lg', minValue: 20, maxValue: 80, label: 'Large', showValues: true }}
/>

<Story
	name="Disabled State"
	args={{ disabled: true, minValue: 30, maxValue: 70, label: 'Disabled', showValues: true }}
/>

<Story
	name="Loading State"
	args={{ loading: true, minValue: 25, maxValue: 75, label: 'Loading state', showValues: true }}
/>

<Story
	name="Error State"
	args={{ error: 'Invalid range selected', minValue: 20, maxValue: 80, showValues: true }}
/>

<Story
	name="Custom Range"
	args={{
		min: 10,
		max: 200,
		step: 10,
		minValue: 50,
		maxValue: 150,
		showValues: true,
		label: 'Custom range'
	}}
/>

<Story
	name="With Marks"
	args={{
		marks: marksExample,
		minValue: 25,
		maxValue: 75,
		label: 'With markers',
		showValues: true
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		minValue: 20,
		maxValue: 80,
		min: 0,
		max: 100,
		step: 1,
		size: 'md',
		variant: 'primary',
		label: 'Price range',
		helpText: 'Select your preferred price range.',
		error: '',
		required: false,
		showValues: true,
		loading: false,
		disabled: false,
		marks: [],
		markCount: 5,
		ariaLabel: 'Range slider'
	}}
/>
