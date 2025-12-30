<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Stepper from './Stepper.svelte';
	import { fn } from 'storybook/test';
	import type { StepData } from './Stepper.svelte';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Stepper',
		component: Stepper,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical']
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
				]
			},
			currentStep: {
				control: { type: 'number', min: 0, max: 4 }
			},
			clickable: { control: 'boolean' },
			disabled: { control: 'boolean' }
		},
		args: {
			onStepClick: fn()
		}
	});

	// Sample steps data
	const sampleSteps: StepData[] = [
		{ id: 1, label: 'Register', description: 'Create your account' },
		{ id: 2, label: 'Choose Plan', description: 'Select a subscription' },
		{ id: 3, label: 'Payment', description: 'Complete payment' },
		{ id: 4, label: 'Confirmation', description: 'Review and confirm' }
	];

	const stepsWithIcons: StepData[] = [
		{ id: 1, label: 'Cart', description: 'Review items', icon: '🛒' },
		{ id: 2, label: 'Shipping', description: 'Enter address', icon: '📦' },
		{ id: 3, label: 'Payment', description: 'Payment method', icon: '💳' },
		{ id: 4, label: 'Confirm', description: 'Place order', icon: '✅' }
	];

	const longSteps: StepData[] = [
		{ id: 1, label: 'Step One', description: 'This is the first step in the process' },
		{ id: 2, label: 'Step Two', description: 'This is the second step in the process' },
		{ id: 3, label: 'Step Three', description: 'This is the third step in the process' },
		{ id: 4, label: 'Step Four', description: 'This is the fourth step in the process' },
		{ id: 5, label: 'Step Five', description: 'This is the fifth step in the process' }
	];
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{
		steps: sampleSteps,
		currentStep: 1,
		orientation: 'horizontal',
		variant: 'primary'
	}}
/>

<Story
	name="Horizontal"
	args={{
		steps: sampleSteps,
		currentStep: 2,
		orientation: 'horizontal',
		variant: 'primary'
	}}
/>

<Story
	name="Vertical"
	args={{
		steps: sampleSteps,
		currentStep: 1,
		orientation: 'vertical',
		variant: 'primary'
	}}
/>

<Story
	name="Primary Variant"
	args={{
		steps: sampleSteps,
		currentStep: 2,
		variant: 'primary'
	}}
/>

<Story
	name="Success Variant"
	args={{
		steps: sampleSteps,
		currentStep: 2,
		variant: 'success'
	}}
/>

<Story
	name="With Icons"
	args={{
		steps: stepsWithIcons,
		currentStep: 2,
		variant: 'primary'
	}}
/>

<Story
	name="Many Steps"
	args={{
		steps: longSteps,
		currentStep: 2,
		variant: 'primary'
	}}
/>

<Story
	name="Clickable"
	args={{
		steps: sampleSteps,
		currentStep: 1,
		clickable: true,
		variant: 'primary'
	}}
/>

<Story
	name="Disabled State"
	args={{
		steps: sampleSteps,
		currentStep: 1,
		disabled: true,
		variant: 'primary'
	}}
/>

<Story
	name="All Completed"
	args={{
		steps: sampleSteps,
		currentStep: 4,
		variant: 'success'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story name="Playground" args={{}} />
