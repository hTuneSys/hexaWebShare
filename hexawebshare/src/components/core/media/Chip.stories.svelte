<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Chip from './Chip.svelte';
	import { fn } from 'storybook/test';

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
			variant: 'neutral',
			onClose: fn()
		}
	});
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Chip', size: 'md', variant: 'neutral' }} />

<!-- Size Stories -->
<Story name="Small Size" args={{ label: 'Chip', size: 'sm', variant: 'neutral' }} />
<Story name="Large Size" args={{ label: 'Chip', size: 'lg', variant: 'neutral' }} />

<!-- Variant Stories -->
<Story name="Primary Variant" args={{ label: 'Primary', size: 'md', variant: 'primary' }} />
<Story name="Success Variant" args={{ label: 'Success', size: 'md', variant: 'success' }} />
<Story name="Warning Variant" args={{ label: 'Warning', size: 'md', variant: 'warning' }} />
<Story name="Error Variant" args={{ label: 'Error', size: 'md', variant: 'error' }} />

<!-- Style Stories -->
<Story
	name="Outline Style"
	args={{ label: 'Outline', size: 'md', variant: 'primary', outline: true }}
/>

<!-- Interactive Stories -->
<Story
	name="Closable"
	args={{
		label: 'Closable Chip',
		size: 'md',
		variant: 'info',
		closable: true
	}}
/>

<!-- State Stories -->
<Story
	name="Disabled State"
	args={{ label: 'Disabled', size: 'md', variant: 'primary', disabled: true }}
/>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{
		label: 'Chip',
		size: 'md',
		variant: 'primary',
		outline: false,
		closable: false,
		disabled: false,
		ariaLabel: 'Interactive chip'
	}}
/>
