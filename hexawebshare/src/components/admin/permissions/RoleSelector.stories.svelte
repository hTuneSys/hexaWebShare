<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RoleSelector from './RoleSelector.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/Permissions/RoleSelector',
		component: RoleSelector,
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
			loading: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' }
		},
		args: {
			roles: ['Admin', 'Editor', 'Viewer'],
			onchange: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{ label: 'User Role', roles: ['Admin', 'Editor', 'Viewer', 'Guest'] }}
/>

<Story
	name="With Placeholder"
	args={{
		label: 'Select Role',
		placeholder: 'Choose a role...',
		roles: ['Admin', 'Editor', 'Viewer']
	}}
/>

<Story
	name="With Selected Value"
	args={{
		label: 'Current Role',
		value: 'editor',
		roles: [
			{ value: 'admin', label: 'Admin' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' }
		]
	}}
/>

<Story
	name="Primary Variant"
	args={{
		variant: 'primary',
		label: 'Primary Role Selector',
		value: 'admin',
		roles: ['Admin', 'Editor', 'Viewer']
	}}
/>

<Story
	name="Small Size"
	args={{
		size: 'sm',
		label: 'Small Role Selector',
		value: 'editor',
		roles: ['Admin', 'Editor', 'Viewer']
	}}
/>

<Story
	name="Large Size"
	args={{
		size: 'lg',
		label: 'Large Role Selector',
		value: 'admin',
		roles: ['Admin', 'Editor', 'Viewer']
	}}
/>

<Story
	name="Required Field"
	args={{
		label: 'Required Role',
		required: true,
		roles: ['Admin', 'Editor', 'Viewer']
	}}
/>

<Story
	name="Disabled State"
	args={{
		label: 'Disabled Role Selector',
		disabled: true,
		value: 'viewer',
		roles: [
			{ value: 'admin', label: 'Admin' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' }
		]
	}}
/>

<Story
	name="Loading State"
	args={{
		label: 'Loading Role Selector',
		placeholder: 'Loading roles...',
		loading: true,
		roles: ['Admin', 'Editor', 'Viewer']
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'User Role',
		roles: ['Admin', 'Editor', 'Viewer', 'Guest'],
		error: 'Please select a valid role'
	}}
/>

<Story
	name="With Help Text"
	args={{
		label: 'Assign Role',
		placeholder: 'Select a role...',
		roles: ['Admin', 'Editor', 'Viewer'],
		helpText: 'Select the appropriate role for this user'
	}}
/>

<Story
	name="Multiple Roles Example"
	args={{
		label: 'User Role',
		placeholder: 'Choose a role...',
		roles: [
			{ value: 'super-admin', label: 'Super Admin', description: 'Full system access' },
			{ value: 'admin', label: 'Admin', description: 'Administrative access' },
			{ value: 'editor', label: 'Editor', description: 'Content editing access' },
			{ value: 'viewer', label: 'Viewer', description: 'Read-only access' },
			{ value: 'guest', label: 'Guest', description: 'Limited access', disabled: true }
		]
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Role Selector',
		placeholder: 'Choose a role...',
		variant: 'primary',
		size: 'md',
		disabled: false,
		required: false,
		loading: false,
		roles: ['Admin', 'Editor', 'Viewer'],
		onchange: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
