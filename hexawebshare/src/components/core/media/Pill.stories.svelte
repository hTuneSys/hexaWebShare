<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pill from './Pill.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Pill',
		component: Pill,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Pill label text'
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
				description: 'Color variant of the pill'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the pill'
			},
			outline: {
				control: 'boolean',
				description: 'Outline style pill'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide pill from screen readers (decorative pills)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the pill'
			}
		},
		args: {
			label: 'Pill',
			size: 'md',
			variant: 'neutral'
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Pill', size: 'md', variant: 'neutral' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ label: 'Pill', size: 'xs', variant: 'neutral' }} />
<Story name="Small" args={{ label: 'Pill', size: 'sm', variant: 'neutral' }} />
<Story name="Medium" args={{ label: 'Pill', size: 'md', variant: 'neutral' }} />
<Story name="Large" args={{ label: 'Pill', size: 'lg', variant: 'neutral' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ label: 'Pill', size: 'md', variant: 'primary' }} />
<Story name="Secondary" args={{ label: 'Pill', size: 'md', variant: 'secondary' }} />
<Story name="Accent" args={{ label: 'Pill', size: 'md', variant: 'accent' }} />
<Story name="Neutral" args={{ label: 'Pill', size: 'md', variant: 'neutral' }} />
<Story name="Info" args={{ label: 'Pill', size: 'md', variant: 'info' }} />
<Story name="Success" args={{ label: 'Pill', size: 'md', variant: 'success' }} />
<Story name="Warning" args={{ label: 'Pill', size: 'md', variant: 'warning' }} />
<Story name="Error" args={{ label: 'Pill', size: 'md', variant: 'error' }} />
<Story name="Ghost" args={{ label: 'Pill', size: 'md', variant: 'ghost' }} />

<!-- Outline Story -->
<Story name="Outline" args={{ label: 'Pill', size: 'md', variant: 'primary', outline: true }} />

<!-- State Stories -->
<Story name="Disabled" args={{ label: 'Pill', size: 'md', variant: 'primary', disabled: true }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ label: 'Pill', size: 'md', variant: 'primary', ariaLabel: 'Status pill' }}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ label: 'Pill', size: 'md', variant: 'neutral', ariaHidden: true }}
/>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{ label: 'Pill', size: 'md', variant: 'primary', ariaLabel: 'Interactive pill' }}
/>
