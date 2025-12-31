<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Steps from './Steps.svelte';
	import type { StepItem } from './Steps.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Steps',
		component: Steps,
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
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			clickable: { control: 'boolean' },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' }
		}
	});

	// Sample step items
	const sampleItems: StepItem[] = [
		{ id: 1, label: 'Register', description: 'Create your account', completed: true },
		{ id: 2, label: 'Choose Plan', description: 'Select a subscription', current: true },
		{ id: 3, label: 'Payment', description: 'Complete payment' },
		{ id: 4, label: 'Confirmation', description: 'Review and confirm' }
	];

	const itemsWithIcons: StepItem[] = [
		{ id: 1, label: 'Cart', description: 'Review items', icon: '🛒', completed: true },
		{ id: 2, label: 'Shipping', description: 'Enter address', icon: '📦', current: true },
		{ id: 3, label: 'Payment', description: 'Payment method', icon: '💳' },
		{ id: 4, label: 'Confirm', description: 'Place order', icon: '✅' }
	];

	const longItems: StepItem[] = [
		{
			id: 1,
			label: 'Step One',
			description: 'This is the first step in the process',
			completed: true
		},
		{
			id: 2,
			label: 'Step Two',
			description: 'This is the second step in the process',
			completed: true
		},
		{
			id: 3,
			label: 'Step Three',
			description: 'This is the third step in the process',
			current: true
		},
		{ id: 4, label: 'Step Four', description: 'This is the fourth step in the process' },
		{ id: 5, label: 'Step Five', description: 'This is the fifth step in the process' }
	];
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Horizontal"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Vertical"
	args={{
		items: sampleItems,
		orientation: 'vertical',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Small Size"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'sm'
	}}
/>

<Story
	name="Large Size"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'lg'
	}}
/>

<Story
	name="Primary Variant"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Success Variant"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'success',
		size: 'md'
	}}
/>

<Story
	name="With Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Many Steps"
	args={{
		items: longItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Clickable"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		clickable: true
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story name="Playground" args={{}} />
