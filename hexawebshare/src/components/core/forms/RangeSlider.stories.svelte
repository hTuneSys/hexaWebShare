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

<!-- Default -->
<Story
	name="Default"
	args={{ minValue: 20, maxValue: 80, label: 'Price range', showValues: true }}
/>

<!-- Variants -->
<Story
	name="Primary"
	args={{ variant: 'primary', minValue: 25, maxValue: 75, label: 'Primary', showValues: true }}
/>
<Story
	name="Secondary"
	args={{ variant: 'secondary', minValue: 30, maxValue: 70, label: 'Secondary', showValues: true }}
/>
<Story
	name="Accent"
	args={{ variant: 'accent', minValue: 20, maxValue: 80, label: 'Accent', showValues: true }}
/>
<Story
	name="Neutral"
	args={{ variant: 'neutral', minValue: 15, maxValue: 85, label: 'Neutral', showValues: true }}
/>
<Story
	name="Info"
	args={{ variant: 'info', minValue: 25, maxValue: 75, label: 'Info', showValues: true }}
/>
<Story
	name="Success"
	args={{ variant: 'success', minValue: 30, maxValue: 70, label: 'Success', showValues: true }}
/>
<Story
	name="Warning"
	args={{ variant: 'warning', minValue: 20, maxValue: 80, label: 'Warning', showValues: true }}
/>
<Story
	name="Error"
	args={{ variant: 'error', minValue: 25, maxValue: 75, label: 'Error', showValues: true }}
/>

<!-- Sizes -->
<Story
	name="Extra Small"
	args={{ size: 'xs', minValue: 20, maxValue: 80, label: 'XS', showValues: true }}
/>
<Story
	name="Small"
	args={{ size: 'sm', minValue: 25, maxValue: 75, label: 'SM', showValues: true }}
/>
<Story
	name="Medium"
	args={{ size: 'md', minValue: 30, maxValue: 70, label: 'MD', showValues: true }}
/>
<Story
	name="Large"
	args={{ size: 'lg', minValue: 20, maxValue: 80, label: 'LG', showValues: true }}
/>

<!-- States -->
<Story
	name="Disabled"
	args={{ disabled: true, minValue: 30, maxValue: 70, label: 'Disabled', showValues: true }}
/>
<Story
	name="Loading"
	args={{ loading: true, minValue: 25, maxValue: 75, label: 'Loading state', showValues: true }}
/>
<Story
	name="Error State"
	args={{ error: 'Invalid range selected', minValue: 20, maxValue: 80, showValues: true }}
/>
<Story
	name="Required"
	args={{ required: true, minValue: 30, maxValue: 70, label: 'Required range', showValues: true }}
/>

<!-- Range variations -->
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
	name="Fine Steps"
	args={{
		min: 0,
		max: 10,
		step: 0.5,
		minValue: 2.5,
		maxValue: 7.5,
		showValues: true,
		label: 'Fine tuning'
	}}
/>

<!-- Marks -->
<Story
	name="With Marks"
	args={{ marks: marksExample, minValue: 25, maxValue: 75, label: 'With markers', showValues: true }}
/>

<!-- Interaction -->
<Story
	name="Interactive"
	args={{
		minValue: 20,
		maxValue: 80,
		label: 'Interactive range slider',
		showValues: true,
		marks: marksExample
	}}
/>

<!-- Real-world examples -->
<Story
	name="Price Range"
	args={{
		min: 0,
		max: 1000,
		step: 10,
		minValue: 100,
		maxValue: 500,
		label: 'Price range ($)',
		showValues: true,
		helpText: 'Select your budget range'
	}}
/>

<Story
	name="Date Range"
	args={{
		min: 0,
		max: 365,
		step: 1,
		minValue: 30,
		maxValue: 180,
		label: 'Days range',
		showValues: true,
		helpText: 'Select number of days'
	}}
/>

<Story
	name="With Help Text"
	args={{
		minValue: 25,
		maxValue: 75,
		label: 'Volume range',
		helpText: 'Adjust the minimum and maximum volume levels',
		showValues: true
	}}
/>

<Story
	name="With Error"
	args={{
		minValue: 10,
		maxValue: 90,
		label: 'Range selection',
		error: 'Selected range is too wide',
		showValues: true
	}}
/>

