<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InlineEditField from './InlineEditField.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/Forms/InlineEditField',
		component: InlineEditField,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['text', 'email', 'tel', 'url', 'number', 'date', 'time']
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
			loading: { control: 'boolean' },
			showButtons: { control: 'boolean' },
			autoSave: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' },
			emptyText: { control: 'text' }
		},
		args: {
			onsave: fn(),
			oncancel: fn(),
			onchange: fn(),
			oninput: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ value: 'Click to edit this text', label: 'Name' }} />

<Story
	name="With Value"
	args={{ value: 'John Doe', label: 'Full Name', placeholder: 'Enter name' }}
/>

<Story name="Empty State" args={{ label: 'Description', emptyText: 'Click to add description' }} />

<Story
	name="Primary Variant"
	args={{ variant: 'primary', value: 'Primary field', label: 'Primary Field' }}
/>

<Story name="Small Size" args={{ size: 'sm', value: 'Small field', label: 'Small Field' }} />

<Story name="Large Size" args={{ size: 'lg', value: 'Large field', label: 'Large Field' }} />

<Story
	name="With Buttons"
	args={{
		showButtons: true,
		value: 'Editable with buttons',
		label: 'Field with Save/Cancel',
		placeholder: 'Edit value'
	}}
/>

<Story
	name="Disabled State"
	args={{ disabled: true, value: 'Cannot edit this', label: 'Disabled Field' }}
/>

<Story name="Loading State" args={{ loading: true, value: 'Saving...', label: 'Loading Field' }} />

<Story
	name="With Error"
	args={{
		value: 'invalid@email',
		label: 'Email Address',
		error: 'Please enter a valid email address',
		type: 'email'
	}}
/>

<Story
	name="Email Type"
	args={{ type: 'email', value: 'user@example.com', label: 'Email', placeholder: 'Enter email' }}
/>

<Story
	name="Number Type"
	args={{
		type: 'number',
		value: '42',
		label: 'Age',
		placeholder: 'Enter age',
		helpText: 'Enter your age in years'
	}}
/>

<Story
	name="With Help Text"
	args={{
		value: 'username',
		label: 'Username',
		helpText: 'Username must be 3-20 characters long'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		value: 'Playground value',
		type: 'text',
		variant: 'primary',
		size: 'md',
		disabled: false,
		required: false,
		loading: false,
		showButtons: false,
		autoSave: true,
		label: 'Playground',
		placeholder: 'Try different props',
		emptyText: 'Click to edit',
		onsave: fn(),
		oncancel: fn(),
		onchange: fn(),
		oninput: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
