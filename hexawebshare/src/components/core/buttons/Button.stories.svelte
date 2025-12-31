<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { fn } from 'storybook/test';
	const { Story } = defineMeta({
		title: 'Core/Buttons/Button',
		component: Button,
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
			outline: { control: 'boolean' },
			wide: { control: 'boolean' },
			block: { control: 'boolean' },
			glass: { control: 'boolean' },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' }
		},
		args: {
			onclick: fn()
		}
	});
</script>

<!-- Primary Variant Stories (5-10 variants required) -->
<Story name="Primary" args={{ variant: 'primary', label: 'Primary Button' }} />
<Story name="Secondary" args={{ variant: 'secondary', label: 'Secondary' }} />
<Story name="Success" args={{ variant: 'success', label: 'Success' }} />
<Story name="Error" args={{ variant: 'error', label: 'Error' }} />
<Story name="Small Size" args={{ size: 'sm', label: 'Small' }} />
<Story name="Large Size" args={{ size: 'lg', label: 'Large' }} />
<Story name="Outline" args={{ variant: 'primary', outline: true, label: 'Outline' }} />
<Story name="Disabled" args={{ variant: 'primary', disabled: true, label: 'Disabled' }} />
<Story name="Loading" args={{ variant: 'primary', loading: true, label: 'Loading...' }} />
<Story name="Block" args={{ variant: 'primary', block: true, label: 'Block Button' }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		label: 'Button',
		variant: 'primary',
		size: 'md',
		outline: false,
		wide: false,
		block: false,
		glass: false,
		disabled: false,
		loading: false
	}}
/>
