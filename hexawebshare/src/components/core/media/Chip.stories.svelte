<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Chip from './Chip.svelte';

	const { Story } = defineMeta({
		title: 'Core/Media/Chip',
		component: Chip,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Chip label text'
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
				description: 'Color variant of the chip'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the chip'
			},
			outline: {
				control: 'boolean',
				description: 'Outline style chip'
			},
			closable: {
				control: 'boolean',
				description: 'Show close button on chip'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaHidden: {
				control: 'boolean',
				description: 'Hide chip from screen readers (decorative chips)'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the chip'
			}
		},
		args: {
			label: 'Chip',
			size: 'md',
			variant: 'neutral'
		}
	});

	// Handler for closable story
	function handleClose() {
		console.log('Chip closed');
	}
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Chip', size: 'md', variant: 'neutral' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ label: 'Chip', size: 'xs', variant: 'neutral' }} />
<Story name="Small" args={{ label: 'Chip', size: 'sm', variant: 'neutral' }} />
<Story name="Medium" args={{ label: 'Chip', size: 'md', variant: 'neutral' }} />
<Story name="Large" args={{ label: 'Chip', size: 'lg', variant: 'neutral' }} />

<!-- Variant Stories -->
<Story name="Primary" args={{ label: 'Chip', size: 'md', variant: 'primary' }} />
<Story name="Secondary" args={{ label: 'Chip', size: 'md', variant: 'secondary' }} />
<Story name="Accent" args={{ label: 'Chip', size: 'md', variant: 'accent' }} />
<Story name="Neutral" args={{ label: 'Chip', size: 'md', variant: 'neutral' }} />
<Story name="Info" args={{ label: 'Chip', size: 'md', variant: 'info' }} />
<Story name="Success" args={{ label: 'Chip', size: 'md', variant: 'success' }} />
<Story name="Warning" args={{ label: 'Chip', size: 'md', variant: 'warning' }} />
<Story name="Error" args={{ label: 'Chip', size: 'md', variant: 'error' }} />
<Story name="Ghost" args={{ label: 'Chip', size: 'md', variant: 'ghost' }} />

<!-- Outline Story -->
<Story name="Outline" args={{ label: 'Chip', size: 'md', variant: 'primary', outline: true }} />

<!-- Closable Story -->
<Story
	name="Closable"
	args={{
		label: 'Chip',
		size: 'md',
		variant: 'primary',
		closable: true,
		onClose: handleClose
	}}
/>

<!-- State Stories -->
<Story name="Disabled" args={{ label: 'Chip', size: 'md', variant: 'primary', disabled: true }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{ label: 'Chip', size: 'md', variant: 'primary', ariaLabel: 'Status chip' }}
/>
<Story
	name="Decorative (Aria Hidden)"
	args={{ label: 'Chip', size: 'md', variant: 'neutral', ariaHidden: true }}
/>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{ label: 'Chip', size: 'md', variant: 'primary', ariaLabel: 'Interactive chip' }}
/>

