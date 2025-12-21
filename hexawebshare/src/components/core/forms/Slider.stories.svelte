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

<!-- Default -->
<Story name="Default" args={{ value: 50, label: 'Volume', showValue: true }} />

<!-- Variants -->
<Story name="Primary" args={{ variant: 'primary', label: 'Primary', showValue: true }} />
<Story name="Secondary" args={{ variant: 'secondary', label: 'Secondary', showValue: true }} />
<Story name="Accent" args={{ variant: 'accent', label: 'Accent', showValue: true }} />
<Story name="Neutral" args={{ variant: 'neutral', label: 'Neutral', showValue: true }} />
<Story name="Info" args={{ variant: 'info', label: 'Info', showValue: true }} />
<Story name="Success" args={{ variant: 'success', label: 'Success', showValue: true }} />
<Story name="Warning" args={{ variant: 'warning', label: 'Warning', showValue: true }} />
<Story name="Error" args={{ variant: 'error', label: 'Error', showValue: true }} />

<!-- Sizes -->
<Story name="Extra Small" args={{ size: 'xs', label: 'XS', showValue: true }} />
<Story name="Small" args={{ size: 'sm', label: 'SM', showValue: true }} />
<Story name="Medium" args={{ size: 'md', label: 'MD', showValue: true }} />
<Story name="Large" args={{ size: 'lg', label: 'LG', showValue: true }} />

<!-- States -->
<Story name="Disabled" args={{ disabled: true, label: 'Disabled', value: 30, showValue: true }} />
<Story
	name="Loading"
	args={{ loading: true, label: 'Loading state', value: 65, showValue: true }}
/>
<Story name="Error State" args={{ error: 'Value not allowed', value: 90, showValue: true }} />
<Story name="Required" args={{ required: true, label: 'Required value', showValue: true }} />

<!-- Range variations -->
<Story
	name="Custom Range"
	args={{ min: 10, max: 200, step: 10, value: 60, showValue: true, label: 'Custom range' }}
/>
<Story
	name="Fine Steps"
	args={{ min: 0, max: 10, step: 0.5, value: 4.5, showValue: true, label: 'Fine tuning' }}
/>

<!-- Marks -->
<Story
	name="With Marks"
	args={{ marks: marksExample, value: 50, label: 'With markers', showValue: true }}
/>

<!-- Interaction -->
<Story
	name="Interactive"
	args={{ value: 40, label: 'Interactive slider', showValue: true, marks: marksExample }}
/>
