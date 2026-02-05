<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToggleButton from './ToggleButton.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Buttons/ToggleButton',
		component: ToggleButton,
		tags: ['autodocs'],
		argTypes: {
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
			}
		},
		parameters: {
			docs: {
				description: {
					component:
						'A toggle button component that can be pressed/unpressed. Supports multiple variants, sizes, and states. Built with DaisyUI and Svelte 5.'
				}
			}
		},
		args: {
			onclick: fn()
		}
	});
</script>

<script lang="ts">
	import ButtonGroup from './ButtonGroup.svelte';
	import Icon from '../media/Icon.svelte';
	import Star from 'lucide-svelte/icons/star';
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
<Story name="Button Group">
	{#snippet children()}
		<ButtonGroup orientation="horizontal" gap="sm">
			<ToggleButton label="Option 1" variant="primary" pressed={false} onclick={fn()} />
			<ToggleButton label="Option 2" variant="primary" pressed={false} onclick={fn()} />
			<ToggleButton label="Option 3" variant="primary" pressed={false} onclick={fn()} />
		</ButtonGroup>
	{/snippet}
</Story>

<!-- With Icon -->
<Story name="With Icon">
	{#snippet children()}
		<ToggleButton variant="primary" size="md" pressed={false} ariaLabel="Favorite" onclick={fn()}>
			<Icon name="star" size="md" ariaHidden>
				<Star />
			</Icon>
		</ToggleButton>
	{/snippet}
</Story>

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
