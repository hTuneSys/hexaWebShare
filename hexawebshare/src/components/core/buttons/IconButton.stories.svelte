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

<!-- Essential Variants (5-10 stories required) -->
<Story name="Primary" args={{ variant: 'primary', ariaLabel: 'Primary button' }} />
<Story name="Success" args={{ variant: 'success', ariaLabel: 'Success button' }} />
<Story name="Error" args={{ variant: 'error', ariaLabel: 'Error button' }} />
<Story name="Small Size" args={{ size: 'sm', ariaLabel: 'Small button' }} />
<Story name="Large Size" args={{ size: 'lg', ariaLabel: 'Large button' }} />
<Story name="Circle Shape" args={{ circle: true, ariaLabel: 'Circle button' }} />
<Story name="Outline Style" args={{ outline: true, ariaLabel: 'Outline button' }} />
<Story name="Disabled" args={{ disabled: true, ariaLabel: 'Disabled button' }} />
<Story name="Loading" args={{ loading: true, ariaLabel: 'Loading button' }} />
<Story
	name="With Icon"
	args={{
		defaultIconPoints: '20 6 9 17 4 12',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'success',
		ariaLabel: 'Confirm button'
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
