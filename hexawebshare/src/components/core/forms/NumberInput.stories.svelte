<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NumberInput from './NumberInput.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/NumberInput',
		component: NumberInput,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the input'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the input'
			},
			value: {
				control: 'number',
				description: 'Current numeric value'
			},
			min: {
				control: 'number',
				description: 'Minimum allowed value'
			},
			max: {
				control: 'number',
				description: 'Maximum allowed value'
			},
			step: {
				control: 'number',
				description: 'Step increment for stepper buttons'
			},
			label: {
				control: 'text',
				description: 'Label text for the input'
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text'
			},
			helpText: {
				control: 'text',
				description: 'Helper text or description'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the input is disabled'
			},
			required: {
				control: 'boolean',
				description: 'Whether the input is required'
			},
			readonly: {
				control: 'boolean',
				description: 'Whether the input is readonly'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the input is in loading state'
			},
			showStepper: {
				control: 'boolean',
				description: 'Show increment/decrement stepper buttons'
			},
			allowDecimals: {
				control: 'boolean',
				description: 'Allow decimal numbers'
			},
			decimalPlaces: {
				control: 'number',
				description: 'Number of decimal places'
			}
		},
		args: {
			onchange: fn(),
			oninput: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Default -->
<Story name="Default" args={{ placeholder: 'Enter number' }} />

<!-- With Label -->
<Story name="With Label" args={{ label: 'Quantity', value: 5 }} />

<!-- With Min/Max Bounds -->
<Story
	name="With Min Max"
	args={{
		label: 'Quantity (1-10)',
		value: 5,
		min: 1,
		max: 10,
		helpText: 'Value must be between 1 and 10'
	}}
/>

<!-- Without Stepper Buttons -->
<Story
	name="Without Stepper"
	args={{
		label: 'Plain Number Input',
		value: 100,
		showStepper: false,
		helpText: 'No increment/decrement buttons'
	}}
/>

<!-- Decimal Numbers -->
<Story
	name="Decimals Allowed"
	args={{
		label: 'Price',
		value: 19.99,
		step: 0.01,
		allowDecimals: true,
		decimalPlaces: 2,
		helpText: 'Allows decimal values'
	}}
/>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-2xl space-y-6">
		<div>
			<h3 class="mb-3 text-lg font-bold">Color Variants</h3>
			<div class="space-y-2">
				<NumberInput variant="primary" label="Primary" value={10} />
				<NumberInput variant="secondary" label="Secondary" value={20} />
				<NumberInput variant="accent" label="Accent" value={30} />
				<NumberInput variant="info" label="Info" value={40} />
				<NumberInput variant="success" label="Success" value={50} />
				<NumberInput variant="warning" label="Warning" value={60} />
				<NumberInput variant="error" label="Error" value={70} />
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">Sizes</h3>
			<div class="space-y-2">
				<NumberInput size="xs" label="Extra Small (xs)" value={5} />
				<NumberInput size="sm" label="Small (sm)" value={10} />
				<NumberInput size="md" label="Medium (md) - Default" value={15} />
				<NumberInput size="lg" label="Large (lg)" value={20} />
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">States</h3>
			<div class="space-y-2">
				<NumberInput label="Default" value={100} />
				<NumberInput label="Disabled" disabled={true} value={50} />
				<NumberInput label="Readonly" readonly={true} value={75} />
				<NumberInput label="Loading" loading={true} value={25} />
				<NumberInput label="With Error" error="Invalid value" value={-1} />
				<NumberInput label="Required" required={true} placeholder="0" />
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">Features</h3>
			<div class="space-y-2">
				<NumberInput label="With Min/Max (0-100)" value={50} min={0} max={100} />
				<NumberInput label="Custom Step (5)" value={25} step={5} />
				<NumberInput
					label="Decimals (2 places)"
					value={3.14}
					step={0.01}
					allowDecimals={true}
					decimalPlaces={2}
				/>
				<NumberInput label="Without Stepper" value={42} showStepper={false} />
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		value: 50,
		min: 0,
		max: 100,
		step: 1,
		helpText: 'Use the Controls panel to test all props'
	}}
/>
