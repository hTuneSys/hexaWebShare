<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				options: [
					'text',
					'email',
					'password',
					'tel',
					'url',
					'search',
					'number',
					'date',
					'time',
					'datetime-local',
					'month',
					'week'
				]
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			readonly: { control: 'boolean' },
			loading: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' }
		},
		args: {
			onchange: fn(),
			oninput: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Email Address', placeholder: 'example@email.com' }} />

<Story name="Text Type" args={{ type: 'text', label: 'Name', placeholder: 'Enter your name' }} />

<Story
	name="Email Type"
	args={{ type: 'email', label: 'Email', placeholder: 'example@email.com' }}
/>

<Story
	name="Password Type"
	args={{ type: 'password', label: 'Password', placeholder: 'Enter password' }}
/>

<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Input', placeholder: 'Primary variant' }}
/>

<Story name="Small Size" args={{ size: 'sm', label: 'Small Input', placeholder: 'Small' }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large Input', placeholder: 'Large' }} />

<Story
	name="Disabled State"
	args={{ label: 'Disabled Field', disabled: true, value: 'Cannot edit' }}
/>

<Story
	name="With Error"
	args={{
		label: 'Email Address',
		placeholder: 'example@email.com',
		error: 'Please enter a valid email address'
	}}
/>

<Story
	name="Loading State"
	args={{ label: 'Loading Input', placeholder: 'Loading...', loading: true }}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		placeholder: 'Try different props',
		type: 'text',
		variant: 'primary',
		size: 'md',
		disabled: false,
		required: false,
		readonly: false,
		loading: false,
		onchange: fn(),
		oninput: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
