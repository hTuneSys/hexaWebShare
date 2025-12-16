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
	name="Small"
	args={{
		title: 'No results',
		description: 'Try adjusting your search criteria.',
		size: 'sm'
	}}
/>

<Story
	name="Medium"
	args={{
		title: 'No items found',
		description: 'There are no items to display at the moment.',
		size: 'md'
	}}
/>

<Story
	name="Large"
	args={{
		title: 'Welcome to your dashboard',
		description:
			"It looks like you haven't added any items yet. Get started by creating your first item.",
		size: 'lg'
	}}
/>

<!-- Variant Stories -->
<Story
	name="Primary"
	args={{
		title: 'Get started',
		description: 'Create your first project to begin.',
		variant: 'primary'
	}}
/>

<Story
	name="Secondary"
	args={{
		title: 'No notifications',
		description: "You're all caught up!",
		variant: 'secondary'
	}}
/>

<Story
	name="Accent"
	args={{
		title: 'Discover something new',
		description: 'Browse our collection to find what you need.',
		variant: 'accent'
	}}
/>

<Story
	name="Neutral"
	args={{
		title: 'Nothing here yet',
		description: 'This section is empty.',
		variant: 'neutral'
	}}
/>

<Story
	name="Info"
	args={{
		title: 'No data available',
		description: 'Data will appear here once available.',
		variant: 'info'
	}}
/>

<Story
	name="Success"
	args={{
		title: 'All tasks completed',
		description: 'Great job! You have completed all your tasks.',
		variant: 'success'
	}}
/>

<Story
	name="Warning"
	args={{
		title: 'Action required',
		description: 'Please complete the required steps to continue.',
		variant: 'warning'
	}}
/>

<Story
	name="Error"
	args={{
		title: 'Something went wrong',
		description: 'We encountered an error while loading your data.',
		variant: 'error'
	}}
/>

<!-- State Stories -->
<Story
	name="Loading"
	args={{
		title: 'Loading items',
		description: 'Please wait while we fetch your data.',
		loading: true
	}}
/>

<Story
	name="Disabled"
	args={{
		title: 'Feature unavailable',
		description: 'This feature is currently disabled.',
		disabled: true
	}}
/>

<!-- Style Variants -->
<Story
	name="Bordered"
	args={{
		title: 'No messages',
		description: 'Your inbox is empty.',
		bordered: true
	}}
/>

<Story
	name="Filled"
	args={{
		title: 'No recent activity',
		description: 'Activity will appear here.',
		filled: true
	}}
/>

<Story
	name="Bordered and Filled"
	args={{
		title: 'Empty collection',
		description: 'Add items to your collection to see them here.',
		bordered: true,
		filled: true
	}}
/>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="space-y-8">
		<EmptyState title="Small Size" description="Compact empty state for tight spaces." size="sm" />
		<EmptyState title="Medium Size" description="Default size for most use cases." size="md" />
		<EmptyState
			title="Large Size"
			description="Prominent empty state for main content areas."
			size="lg"
		/>
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<EmptyState title="Primary" description="Primary variant" variant="primary" bordered={true} />
		<EmptyState
			title="Secondary"
			description="Secondary variant"
			variant="secondary"
			bordered={true}
		/>
		<EmptyState title="Accent" description="Accent variant" variant="accent" bordered={true} />
		<EmptyState title="Neutral" description="Neutral variant" variant="neutral" bordered={true} />
		<EmptyState title="Info" description="Info variant" variant="info" bordered={true} />
		<EmptyState title="Success" description="Success variant" variant="success" bordered={true} />
		<EmptyState title="Warning" description="Warning variant" variant="warning" bordered={true} />
		<EmptyState title="Error" description="Error variant" variant="error" bordered={true} />
	</div>
</Story>

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{
		title: 'No items',
		description: 'Empty state description',
		ariaLabel: 'Empty state: No items available in this section'
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
