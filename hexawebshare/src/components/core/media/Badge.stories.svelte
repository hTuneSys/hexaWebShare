<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Badge label text'
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
				description: 'Color variant of the badge'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the badge'
			},
			outline: {
				control: 'boolean',
				description: 'Outline style badge'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide badge from screen readers (decorative badges)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the badge'
			}
		},
		args: {
			label: 'Badge',
			size: 'md',
			variant: 'neutral'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Badge', size: 'md', variant: 'neutral' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ label: 'Badge', size: 'xs', variant: 'neutral' }} />
<Story name="Small" args={{ label: 'Badge', size: 'sm', variant: 'neutral' }} />
<Story name="Medium" args={{ label: 'Badge', size: 'md', variant: 'neutral' }} />
<Story name="Large" args={{ label: 'Badge', size: 'lg', variant: 'neutral' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ label: 'Badge', size: 'md', variant: 'primary' }} />
<Story name="Secondary" args={{ label: 'Badge', size: 'md', variant: 'secondary' }} />
<Story name="Accent" args={{ label: 'Badge', size: 'md', variant: 'accent' }} />
<Story name="Neutral" args={{ label: 'Badge', size: 'md', variant: 'neutral' }} />
<Story name="Info" args={{ label: 'Badge', size: 'md', variant: 'info' }} />
<Story name="Success" args={{ label: 'Badge', size: 'md', variant: 'success' }} />
<Story name="Warning" args={{ label: 'Badge', size: 'md', variant: 'warning' }} />
<Story name="Error" args={{ label: 'Badge', size: 'md', variant: 'error' }} />
<Story name="Ghost" args={{ label: 'Badge', size: 'md', variant: 'ghost' }} />

<!-- Outline Story -->
<Story name="Outline" args={{ label: 'Badge', size: 'md', variant: 'primary', outline: true }} />

<!-- State Stories -->
<Story name="Disabled" args={{ label: 'Badge', size: 'md', variant: 'primary', disabled: true }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ label: 'Badge', size: 'md', variant: 'primary', ariaLabel: 'Status badge' }}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ label: 'Badge', size: 'md', variant: 'neutral', ariaHidden: true }}
/>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{ label: 'Badge', size: 'md', variant: 'primary', ariaLabel: 'Interactive badge' }}
/>
