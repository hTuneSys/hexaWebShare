<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToggleButtonGroupWrapper from './ToggleButtonGroupWrapper.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Buttons/ToggleButton',
		component: ToggleButtonGroupWrapper,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
				description: 'Orientation of button group (only for Button Group story)'
			},
			gap: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Gap between buttons in group (only for Button Group story)'
			},
			pressed: {
				control: 'boolean',
				description: 'Whether the button is pressed/active'
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
					'ghost',
					'link'
				],
				description: 'Variant style of the button'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the button'
			},
			label: {
				control: 'text',
				description: 'Button label text'
			},
			outline: {
				control: 'boolean',
				description: 'Whether to use outline style'
			},
			wide: {
				control: 'boolean',
				description: 'Whether button spans full width'
			},
			block: {
				control: 'boolean',
				description: 'Whether button spans full width of container'
			},
			glass: {
				control: 'boolean',
				description: 'Whether to use glass effect'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the button is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the button is in loading state'
			},
			ariaLabel: {
				control: 'text',
				description: 'ARIA label for accessibility'
			},
			defaultIconPoints: {
				control: 'text',
				description: 'Default icon polygon points (used when no children and no label provided)'
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
		parameters: {
			docs: {
				description: {
					component:
						'A toggle button component that can be pressed/unpressed. Supports multiple variants, sizes, and states. Built with DaisyUI and Svelte 5.'
				}
			}
		}
	});
</script>

<script lang="ts">
	// Empty script block for snippet support in stories
</script>

<!-- Default -->
<Story name="Default" args={{ label: 'Toggle Button', pressed: false, onclick: fn() }} />

<!-- Pressed State -->
<Story name="Pressed" args={{ label: 'Toggle Button', pressed: true, onclick: fn() }} />

<!-- Interactive -->
<Story
	name="Interactive"
	args={{
		label: 'Click to Toggle',
		variant: 'primary',
		size: 'md',
		pressed: false,
		onclick: fn()
	}}
/>

<!-- Button Group -->
<Story
	name="Button Group"
	args={{
		orientation: 'horizontal',
		gap: 'sm',
		buttons: [
			{ label: 'Option 1', variant: 'primary', pressed: false },
			{ label: 'Option 2', variant: 'primary', pressed: false },
			{ label: 'Option 3', variant: 'primary', pressed: false }
		]
	}}
/>

<!-- With Icon -->
<Story
	name="With Icon"
	args={{
		defaultIconPoints:
			'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
		defaultIconWidth: '20',
		defaultIconHeight: '20',
		variant: 'primary',
		size: 'md',
		pressed: false,
		ariaLabel: 'Favorite',
		onclick: fn()
	}}
/>


<!-- Interactive Playground -->
<Story
	name="Playground"
	args={{
		label: 'Toggle Button',
		pressed: false,
		variant: 'primary',
		size: 'md',
		outline: false,
		wide: false,
		block: false,
		glass: false,
		disabled: false,
		loading: false,
		onclick: fn()
	}}
/>
