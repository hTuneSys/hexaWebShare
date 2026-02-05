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
			loading: { control: 'boolean' }
		},
		args: {
			onclick: fn(),
			ariaLabel: 'Icon button'
		}
	});
</script>

<script>
	import Icon from '../media/Icon.svelte';
	import Check from 'lucide-svelte/icons/check';
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
<Story name="With Icon" args={{ variant: 'success', ariaLabel: 'Confirm button' }}>
	<IconButton variant="success" circle ariaLabel="Confirm button">
		<Icon name="check" size="sm" ariaHidden>
			<Check />
		</Icon>
	</IconButton>
</Story>

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
