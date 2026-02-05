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
			loading: {
				control: 'boolean',
				description: 'Show loading spinner in the status badge'
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

<Story name="Large" args={{ label: 'Error', size: 'lg', variant: 'error' }} />

<!-- Variant Stories -->
<Story name="Success Variant" args={{ label: 'Success Status', size: 'md', variant: 'success' }} />

<Story name="Warning Variant" args={{ label: 'Warning Status', size: 'md', variant: 'warning' }} />

<Story name="Error Variant" args={{ label: 'Error Status', size: 'md', variant: 'error' }} />

<!-- Outline Style -->
<Story
	name="Outline Style"
	args={{ label: 'Outline Status', size: 'md', variant: 'primary', outline: true }}
/>

<!-- State Stories -->
<Story
	name="Loading State"
	args={{ label: 'Loading Status', size: 'md', variant: 'info', loading: true }}
/>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{ label: 'Status', size: 'md', variant: 'success', ariaLabel: 'Interactive status badge' }}
/>
