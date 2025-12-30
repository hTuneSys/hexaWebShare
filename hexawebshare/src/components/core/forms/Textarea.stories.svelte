<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './Textarea.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		argTypes: {
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
			resize: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' },
			rows: { control: { type: 'number', min: 1, max: 20 } },
			cols: { control: { type: 'number', min: 1, max: 100 } },
			maxlength: { control: { type: 'number', min: 1 } },
			minlength: { control: { type: 'number', min: 1 } }
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
<Story name="Default" args={{ label: 'Message', placeholder: 'Enter your message here...' }} />

<Story
	name="With Value"
	args={{
		label: 'Description',
		value: 'This is a pre-filled textarea value.',
		placeholder: 'Enter description'
	}}
/>

<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Textarea', placeholder: 'Primary variant' }}
/>

<Story name="Small Size" args={{ size: 'sm', label: 'Small Textarea', placeholder: 'Small' }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large Textarea', placeholder: 'Large' }} />

<Story
	name="Required Field"
	args={{ label: 'Required Field', required: true, placeholder: 'Required textarea' }}
/>

<Story
	name="Disabled State"
	args={{
		label: 'Disabled Field',
		disabled: true,
		value: 'This textarea is disabled and cannot be edited.'
	}}
/>

<Story
	name="Readonly State"
	args={{
		label: 'Readonly Field',
		readonly: true,
		value: 'This is a read-only textarea. The content cannot be modified.'
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Message',
		placeholder: 'Enter your message',
		error: 'Message is required and must be at least 10 characters'
	}}
/>

<Story
	name="Custom Rows"
	args={{ label: 'Custom Rows', rows: 8, placeholder: 'Textarea with 8 rows' }}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		placeholder: 'Try different props',
		variant: 'primary',
		size: 'md',
		rows: 4,
		disabled: false,
		required: false,
		readonly: false,
		loading: false,
		resize: true,
		onchange: fn(),
		oninput: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
