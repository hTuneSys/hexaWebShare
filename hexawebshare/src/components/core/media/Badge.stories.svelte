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
<Story name="Small Size" args={{ label: 'Badge', size: 'sm', variant: 'neutral' }} />
<Story name="Large Size" args={{ label: 'Badge', size: 'lg', variant: 'neutral' }} />

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

<!-- State Stories -->
<Story
	name="Disabled State"
	args={{ label: 'Disabled', size: 'md', variant: 'primary', disabled: true }}
/>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{
		label: 'Badge',
		size: 'md',
		variant: 'primary',
		outline: false,
		disabled: false,
		ariaLabel: 'Interactive badge'
	}}
/>
