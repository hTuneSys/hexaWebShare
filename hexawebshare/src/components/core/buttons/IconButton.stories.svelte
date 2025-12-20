<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import IconButton from './IconButton.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Buttons/IconButton',
		component: IconButton,
		tags: ['autodocs'],
		argTypes: {
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
					'ghost',
					'link'
				]
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			circle: { control: 'boolean' },
			square: { control: 'boolean' },
			outline: { control: 'boolean' },
			glass: { control: 'boolean' },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' },
			defaultIconPoints: {
				control: 'text',
				description: 'Default icon polygon points (used when no children provided)'
			},
			defaultIconWidth: {
				control: { type: 'text' },
				description: 'Default icon width'
			},
			defaultIconHeight: {
				control: { type: 'text' },
				description: 'Default icon height'
			}
		},
		args: {
			onclick: fn(),
			ariaLabel: 'Icon button'
		}
	});
</script>

<!-- Variant Stories -->
<Story name="Primary" args={{ variant: 'primary', ariaLabel: 'Primary button' }} />
<Story name="Secondary" args={{ variant: 'secondary', ariaLabel: 'Secondary button' }} />
<Story name="Accent" args={{ variant: 'accent', ariaLabel: 'Accent button' }} />
<Story name="Info" args={{ variant: 'info', ariaLabel: 'Info button' }} />
<Story name="Success" args={{ variant: 'success', ariaLabel: 'Success button' }} />
<Story name="Warning" args={{ variant: 'warning', ariaLabel: 'Warning button' }} />
<Story name="Error" args={{ variant: 'error', ariaLabel: 'Error button' }} />
<Story name="Ghost" args={{ variant: 'ghost', ariaLabel: 'Ghost button' }} />

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', ariaLabel: 'Extra small button' }} />
<Story name="Small" args={{ size: 'sm', ariaLabel: 'Small button' }} />
<Story name="Medium" args={{ size: 'md', ariaLabel: 'Medium button' }} />
<Story name="Large" args={{ size: 'lg', ariaLabel: 'Large button' }} />

<!-- Shape Stories -->
<Story name="Circle" args={{ circle: true, ariaLabel: 'Circle button' }} />
<Story name="Square" args={{ square: true, ariaLabel: 'Square button' }} />

<!-- Style Variants -->
<Story name="Outline" args={{ outline: true, ariaLabel: 'Outline button' }} />
<Story name="Glass" args={{ glass: true, ariaLabel: 'Glass button' }} />
<Story name="Disabled" args={{ disabled: true, ariaLabel: 'Disabled button' }} />
<Story name="Loading" args={{ loading: true, ariaLabel: 'Loading button' }} />

<!-- Icon Examples - Using defaultIconPoints instead of SVG children -->
<Story
	name="Heart Icon"
	args={{
		defaultIconPoints:
			'12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'primary',
		ariaLabel: 'Heart button'
	}}
/>
<Story
	name="Trash Icon"
	args={{
		defaultIconPoints: '3 6 5 6 21 6 19 20 5 20 3 6',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'error',
		ariaLabel: 'Delete button'
	}}
/>
<Story
	name="Settings Icon"
	args={{
		defaultIconPoints: '12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'ghost',
		ariaLabel: 'Settings button'
	}}
/>
<Story
	name="Search Icon"
	args={{
		defaultIconPoints: '11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'ghost',
		ariaLabel: 'Search button'
	}}
/>
<Story
	name="Plus Icon"
	args={{
		defaultIconPoints: '12 5 12 19 5 12 19 12',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'primary',
		ariaLabel: 'Add button'
	}}
/>
<Story
	name="Check Icon"
	args={{
		defaultIconPoints: '20 6 9 17 4 12',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'success',
		ariaLabel: 'Confirm button'
	}}
/>
<Story
	name="Close Icon"
	args={{
		defaultIconPoints: '18 6 6 18 6 6 18 18',
		defaultIconWidth: '18',
		defaultIconHeight: '18',
		variant: 'ghost',
		size: 'sm',
		ariaLabel: 'Close button'
	}}
/>

<!-- Default Icon Customization -->
<Story
	name="Custom Default Icon"
	args={{
		defaultIconPoints: '5 12 2 12 8 4 16 4 22 12 19 12 19 20 5 20',
		defaultIconWidth: '24',
		defaultIconHeight: '24',
		ariaLabel: 'Custom default icon button'
	}}
/>
<Story
	name="Small Default Icon"
	args={{
		defaultIconPoints: '5 12 2 12 8 4 16 4 22 12 19 12 19 20 5 20',
		defaultIconWidth: '16',
		defaultIconHeight: '16',
		size: 'xs',
		ariaLabel: 'Small default icon button'
	}}
/>
<Story
	name="Large Default Icon"
	args={{
		defaultIconPoints:
			'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
		defaultIconWidth: '28',
		defaultIconHeight: '28',
		size: 'lg',
		ariaLabel: 'Large default icon button'
	}}
/>

<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		variant: 'primary',
		size: 'md',
		circle: false,
		square: false,
		outline: false,
		glass: false,
		disabled: false,
		loading: false,
		ariaLabel: 'Icon button'
	}}
/>
