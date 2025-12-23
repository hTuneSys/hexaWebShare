<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Steps from './Steps.svelte';
	import type { StepItem } from './Steps.svelte';

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

	const simpleItems: StepItem[] = [
		{ id: 1, label: 'Step 1', completed: true },
		{ id: 2, label: 'Step 2', current: true },
		{ id: 3, label: 'Step 3' }
	];

	const itemsWithIcons: StepItem[] = [
		{ id: 1, label: 'Cart', description: 'Review items', icon: '🛒', completed: true },
		{ id: 2, label: 'Shipping', description: 'Enter address', icon: '📦', current: true },
		{ id: 3, label: 'Payment', description: 'Payment method', icon: '💳' },
		{ id: 4, label: 'Confirm', description: 'Place order', icon: '✅' }
	];

	const registrationItemsWithIcons: StepItem[] = [
		{ id: 1, label: 'Account', description: 'Create account', icon: '👤', completed: true },
		{ id: 2, label: 'Plan', description: 'Choose plan', icon: '📋', current: true },
		{ id: 3, label: 'Payment', description: 'Enter payment', icon: '💳' },
		{ id: 4, label: 'Complete', description: 'All done', icon: '✨' }
	];

	const workflowItemsWithIcons: StepItem[] = [
		{ id: 1, label: 'Start', description: 'Begin process', icon: '🚀', completed: true },
		{ id: 2, label: 'Review', description: 'Check details', icon: '👀', completed: true },
		{ id: 3, label: 'Approve', description: 'Get approval', icon: '✅', current: true },
		{ id: 4, label: 'Complete', description: 'Finish task', icon: '🎉' }
	];

	const projectItemsWithIcons: StepItem[] = [
		{ id: 1, label: 'Planning', description: 'Project planning', icon: '📝', completed: true },
		{ id: 2, label: 'Design', description: 'Create design', icon: '🎨', completed: true },
		{ id: 3, label: 'Development', description: 'Build features', icon: '⚙️', current: true },
		{ id: 4, label: 'Testing', description: 'Test application', icon: '🧪' },
		{ id: 5, label: 'Launch', description: 'Go live', icon: '🚀' }
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

	const itemsWithDisabled: StepItem[] = [
		{ id: 1, label: 'Step 1', completed: true },
		{ id: 2, label: 'Step 2', current: true },
		{ id: 3, label: 'Step 3', disabled: true },
		{ id: 4, label: 'Step 4' }
	];

	const itemsWithDisabledIcons: StepItem[] = [
		{ id: 1, label: 'Start', icon: '🚀', completed: true },
		{ id: 2, label: 'Process', icon: '⚙️', current: true },
		{ id: 3, label: 'Blocked', icon: '🚫', disabled: true },
		{ id: 4, label: 'Finish', icon: '🏁' }
	];

	const allCompletedItems: StepItem[] = [
		{ id: 1, label: 'Step 1', completed: true },
		{ id: 2, label: 'Step 2', completed: true },
		{ id: 3, label: 'Step 3', completed: true },
		{ id: 4, label: 'Step 4', completed: true, current: true }
	];

	const allCompletedItemsWithIcons: StepItem[] = [
		{ id: 1, label: 'Start', icon: '🚀', completed: true },
		{ id: 2, label: 'Progress', icon: '⚙️', completed: true },
		{ id: 3, label: 'Review', icon: '👀', completed: true },
		{ id: 4, label: 'Complete', icon: '✅', completed: true, current: true }
	];

	const itemsWithClickHandlers: StepItem[] = [
		{
			id: 1,
			label: 'Step 1',
			completed: true,
			onclick: () => {
				console.log('Step 1 clicked');
			}
		},
		{
			id: 2,
			label: 'Step 2',
			current: true,
			onclick: () => {
				console.log('Step 2 clicked');
			}
		},
		{
			id: 3,
			label: 'Step 3',
			onclick: () => {
				console.log('Step 3 clicked');
			}
		}
	];
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<!-- Basic Examples -->
<Story
	name="Simple"
	args={{
		items: simpleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Long Path"
	args={{
		items: longItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<!-- Orientation Variants -->
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

<!-- Size Variants -->
<Story
	name="Extra Small"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'xs'
	}}
/>

<Story
	name="Extra Small with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'xs'
	}}
/>

<Story
	name="Small"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'sm'
	}}
/>

<Story
	name="Small with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'sm'
	}}
/>

<Story
	name="Medium"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Medium with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Large"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'lg'
	}}
/>

<Story
	name="Large with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'lg'
	}}
/>

<!-- Variant Colors -->
<Story
	name="Primary"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Primary with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Secondary"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'secondary',
		size: 'md'
	}}
/>

<Story
	name="Secondary with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'secondary',
		size: 'md'
	}}
/>

<Story
	name="Accent"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'accent',
		size: 'md'
	}}
/>

<Story
	name="Accent with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'accent',
		size: 'md'
	}}
/>

<Story
	name="Neutral"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'neutral',
		size: 'md'
	}}
/>

<Story
	name="Neutral with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'neutral',
		size: 'md'
	}}
/>

<Story
	name="Info"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'info',
		size: 'md'
	}}
/>

<Story
	name="Info with Icons"
	args={{
		items: projectItemsWithIcons,
		orientation: 'horizontal',
		variant: 'info',
		size: 'md'
	}}
/>

<Story
	name="Success"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'success',
		size: 'md'
	}}
/>

<Story
	name="Success with Icons"
	args={{
		items: workflowItemsWithIcons,
		orientation: 'horizontal',
		variant: 'success',
		size: 'md'
	}}
/>

<Story
	name="Warning"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'warning',
		size: 'md'
	}}
/>

<Story
	name="Warning with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'warning',
		size: 'md'
	}}
/>

<Story
	name="Error"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'error',
		size: 'md'
	}}
/>

<Story
	name="Error with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'error',
		size: 'md'
	}}
/>

<!-- With Icons -->
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
	name="With Icons - Registration"
	args={{
		items: registrationItemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="With Icons - Workflow"
	args={{
		items: workflowItemsWithIcons,
		orientation: 'horizontal',
		variant: 'success',
		size: 'md'
	}}
/>

<Story
	name="With Icons - Project"
	args={{
		items: projectItemsWithIcons,
		orientation: 'horizontal',
		variant: 'info',
		size: 'md'
	}}
/>

<Story
	name="With Icons - Vertical"
	args={{
		items: itemsWithIcons,
		orientation: 'vertical',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="With Icons - Clickable"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		clickable: true
	}}
/>

<!-- States -->
<Story
	name="Disabled"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		disabled: true
	}}
/>

<Story
	name="Disabled with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		disabled: true
	}}
/>

<Story
	name="Loading"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		loading: true
	}}
/>

<Story
	name="Loading with Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		loading: true
	}}
/>

<Story
	name="With Disabled Item"
	args={{
		items: itemsWithDisabled,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="With Disabled Item and Icons"
	args={{
		items: itemsWithDisabledIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="All Completed"
	args={{
		items: allCompletedItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="All Completed with Icons"
	args={{
		items: allCompletedItemsWithIcons,
		orientation: 'horizontal',
		variant: 'success',
		size: 'md'
	}}
/>

<!-- Interactive Examples -->
<Story
	name="Clickable"
	args={{
		items: itemsWithClickHandlers,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		clickable: true
	}}
/>

<Story
	name="Clickable Vertical"
	args={{
		items: itemsWithClickHandlers,
		orientation: 'vertical',
		variant: 'primary',
		size: 'md',
		clickable: true
	}}
/>

<!-- Edge Cases -->
<Story
	name="Single Item"
	args={{
		items: [{ id: 1, label: 'Step 1', current: true }],
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Two Items"
	args={{
		items: [
			{ id: 1, label: 'Step 1', completed: true },
			{ id: 2, label: 'Step 2', current: true }
		],
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Three Items"
	args={{
		items: [
			{ id: 1, label: 'Step 1', completed: true },
			{ id: 2, label: 'Step 2', current: true },
			{ id: 3, label: 'Step 3' }
		],
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<!-- Accessibility Testing -->
<Story
	name="Accessibility - Full Example"
	args={{
		items: sampleItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		ariaLabel: 'Registration process steps'
	}}
/>

<Story
	name="Accessibility - With Icons"
	args={{
		items: itemsWithIcons,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		ariaLabel: 'Checkout process steps'
	}}
/>

<Story
	name="Accessibility - Clickable"
	args={{
		items: itemsWithClickHandlers,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md',
		clickable: true,
		ariaLabel: 'Interactive navigation steps'
	}}
/>

<!-- Responsive Examples -->
<Story
	name="Responsive - Long Path"
	args={{
		items: longItems,
		orientation: 'horizontal',
		variant: 'primary',
		size: 'md'
	}}
/>

<Story
	name="Responsive - Vertical Mobile"
	args={{
		items: sampleItems,
		orientation: 'vertical',
		variant: 'primary',
		size: 'md'
	}}
/>
