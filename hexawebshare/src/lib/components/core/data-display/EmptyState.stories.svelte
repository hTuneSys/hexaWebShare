<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EmptyState from './EmptyState.svelte';

	const { Story } = defineMeta({
		title: 'Core/Data Display/EmptyState',
		component: EmptyState,
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Main heading text displayed prominently'
			},
			description: {
				control: 'text',
				description: 'Supporting description text below the title'
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
				description: 'Visual variant affecting icon and accent colors'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset affecting spacing and typography'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the component is in loading state'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the component is disabled'
			},
			bordered: {
				control: 'boolean',
				description: 'Add a bordered card-like appearance'
			},
			filled: {
				control: 'boolean',
				description: 'Add a subtle background color'
			},
			fullWidth: {
				control: 'boolean',
				description: 'Make the container full width'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			}
		},
		args: {
			title: 'No items found',
			description: 'There are no items to display at the moment.',
			variant: 'neutral',
			size: 'md',
			loading: false,
			disabled: false,
			bordered: false,
			filled: false,
			fullWidth: true
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		title: 'No items found',
		description: 'There are no items to display at the moment.'
	}}
/>

<!-- Size Stories -->
<Story
	name="Small Size"
	args={{
		title: 'No results',
		description: 'Try adjusting your search criteria.',
		size: 'sm'
	}}
/>

<Story
	name="Large Size"
	args={{
		title: 'Welcome to your dashboard',
		description:
			"It looks like you haven't added any items yet. Get started by creating your first item.",
		size: 'lg'
	}}
/>

<!-- Variant Stories -->
<Story
	name="Success Variant"
	args={{
		title: 'All tasks completed',
		description: 'Great job! You have completed all your tasks.',
		variant: 'success'
	}}
/>

<Story
	name="Error Variant"
	args={{
		title: 'Something went wrong',
		description: 'We encountered an error while loading your data.',
		variant: 'error'
	}}
/>

<!-- State Stories -->
<Story
	name="Loading State"
	args={{
		title: 'Loading items',
		description: 'Please wait while we fetch your data.',
		loading: true
	}}
/>

<!-- Style Variants -->
<Story
	name="Bordered and Filled"
	args={{
		title: 'Empty collection',
		description: 'Add items to your collection to see them here.',
		bordered: true,
		filled: true
	}}
/>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		title: 'Empty State',
		description: 'Use the controls to customize this component.',
		variant: 'neutral',
		size: 'md',
		bordered: false,
		filled: false,
		loading: false,
		disabled: false
	}}
/>
