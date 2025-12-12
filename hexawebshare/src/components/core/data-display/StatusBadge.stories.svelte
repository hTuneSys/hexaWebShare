<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatusBadge from './StatusBadge.svelte';

	const { Story } = defineMeta({
		title: 'Core/Data Display/StatusBadge',
		component: StatusBadge,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Status label text'
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
					'error',
					'ghost'
				],
				description: 'Color variant of the status badge'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the status badge'
			},
			outline: {
				control: 'boolean',
				description: 'Outline style badge'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the status badge'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide badge from screen readers (decorative badges)'
			}
		},
		args: {
			label: 'Status',
			size: 'md',
			variant: 'neutral'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Status', size: 'md', variant: 'neutral' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ label: 'Active', size: 'xs', variant: 'success' }} />
<Story name="Small" args={{ label: 'Pending', size: 'sm', variant: 'warning' }} />
<Story name="Medium" args={{ label: 'Completed', size: 'md', variant: 'success' }} />
<Story name="Large" args={{ label: 'Error', size: 'lg', variant: 'error' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ label: 'Primary Status', size: 'md', variant: 'primary' }} />
<Story name="Secondary" args={{ label: 'Secondary Status', size: 'md', variant: 'secondary' }} />
<Story name="Accent" args={{ label: 'Accent Status', size: 'md', variant: 'accent' }} />
<Story name="Neutral" args={{ label: 'Neutral Status', size: 'md', variant: 'neutral' }} />
<Story name="Info" args={{ label: 'Info Status', size: 'md', variant: 'info' }} />
<Story name="Success" args={{ label: 'Success Status', size: 'md', variant: 'success' }} />
<Story name="Warning" args={{ label: 'Warning Status', size: 'md', variant: 'warning' }} />
<Story name="Error" args={{ label: 'Error Status', size: 'md', variant: 'error' }} />
<Story name="Ghost" args={{ label: 'Ghost Status', size: 'md', variant: 'ghost' }} />

<!-- Outline Story -->
<Story
	name="Outline"
	args={{ label: 'Outline Status', size: 'md', variant: 'primary', outline: true }}
/>

<!-- State Stories -->
<Story
	name="Disabled"
	args={{ label: 'Disabled Status', size: 'md', variant: 'primary', disabled: true }}
/>

<!-- Status Examples -->
<Story name="Active Status" args={{ label: 'Active', size: 'md', variant: 'success' }} />
<Story name="Pending Status" args={{ label: 'Pending', size: 'md', variant: 'warning' }} />
<Story name="Inactive Status" args={{ label: 'Inactive', size: 'md', variant: 'neutral' }} />
<Story name="Error Status" args={{ label: 'Error', size: 'md', variant: 'error' }} />
<Story name="Processing Status" args={{ label: 'Processing', size: 'md', variant: 'info' }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ label: 'Status', size: 'md', variant: 'success', ariaLabel: 'Status: Active' }}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ label: 'Status', size: 'md', variant: 'neutral', ariaHidden: true }}
/>

<!-- All Sizes Showcase -->
<Story name="All Sizes">
	<div class="flex flex-wrap items-center gap-4">
		<StatusBadge label="XS" size="xs" variant="success" />
		<StatusBadge label="Small" size="sm" variant="info" />
		<StatusBadge label="Medium" size="md" variant="warning" />
		<StatusBadge label="Large" size="lg" variant="error" />
	</div>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="flex flex-wrap items-center gap-4">
		<StatusBadge label="Primary" variant="primary" />
		<StatusBadge label="Secondary" variant="secondary" />
		<StatusBadge label="Accent" variant="accent" />
		<StatusBadge label="Neutral" variant="neutral" />
		<StatusBadge label="Info" variant="info" />
		<StatusBadge label="Success" variant="success" />
		<StatusBadge label="Warning" variant="warning" />
		<StatusBadge label="Error" variant="error" />
		<StatusBadge label="Ghost" variant="ghost" />
	</div>
</Story>

<!-- Outline Variants -->
<Story name="Outline Variants">
	<div class="flex flex-wrap items-center gap-4">
		<StatusBadge label="Primary" variant="primary" outline={true} />
		<StatusBadge label="Success" variant="success" outline={true} />
		<StatusBadge label="Warning" variant="warning" outline={true} />
		<StatusBadge label="Error" variant="error" outline={true} />
	</div>
</Story>

<!-- Real-world Examples -->
<Story name="Real-world Examples">
	<div class="space-y-4">
		<div class="flex items-center gap-2">
			<span>Order Status:</span>
			<StatusBadge label="Shipped" variant="success" />
		</div>
		<div class="flex items-center gap-2">
			<span>Payment Status:</span>
			<StatusBadge label="Pending" variant="warning" />
		</div>
		<div class="flex items-center gap-2">
			<span>Account Status:</span>
			<StatusBadge label="Active" variant="info" />
		</div>
		<div class="flex items-center gap-2">
			<span>System Status:</span>
			<StatusBadge label="Error" variant="error" />
		</div>
	</div>
</Story>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{ label: 'Status', size: 'md', variant: 'success', ariaLabel: 'Interactive status badge' }}
/>
