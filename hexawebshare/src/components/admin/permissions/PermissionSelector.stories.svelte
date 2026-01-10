<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PermissionSelector from './PermissionSelector.svelte';
	import { fn } from 'storybook/test';

	const samplePermissions = [
		{
			value: 'read_users',
			label: 'Read Users',
			description: 'View user information and profiles',
			group: 'Users'
		},
		{
			value: 'write_users',
			label: 'Write Users',
			description: 'Create, edit, and delete users',
			group: 'Users'
		},
		{
			value: 'read_products',
			label: 'Read Products',
			description: 'View product listings and details',
			group: 'Products'
		},
		{
			value: 'write_products',
			label: 'Write Products',
			description: 'Create, edit, and delete products',
			group: 'Products'
		},
		{
			value: 'manage_orders',
			label: 'Manage Orders',
			description: 'View and process customer orders',
			group: 'Orders'
		},
		{
			value: 'view_analytics',
			label: 'View Analytics',
			description: 'Access dashboard and reports',
			group: 'Analytics'
		},
		{
			value: 'manage_settings',
			label: 'Manage Settings',
			description: 'Configure system settings',
			group: 'Settings'
		}
	];

	const { Story } = defineMeta({
		component: PermissionSelector,
		title: 'Admin/Permissions/PermissionSelector',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'object' },
				description:
					'Selected permission values (controlled mode). Example: ["read_users", "read_products"]',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: 'undefined' }
				}
			},
			defaultValue: {
				control: { type: 'object' },
				description:
					'Default selected values (uncontrolled mode). Example: ["read_users", "read_products"]',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: 'undefined' }
				}
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
				description: 'Color variant of the checkboxes'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the checkboxes'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the component is disabled'
			},
			required: {
				control: 'boolean',
				description: 'Whether the component is required'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the component is in loading state'
			},
			showGroups: {
				control: 'boolean',
				description: 'Whether to show group headers'
			},
			showSelectAll: {
				control: 'boolean',
				description: 'Whether to show select all/deselect all buttons'
			},
			label: {
				control: 'text',
				description: 'Label text for the permission selector'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			},
			helpText: {
				control: 'text',
				description: 'Helper text or description'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			id: {
				control: 'text',
				description: 'HTML id attribute'
			}
		},
		args: {
			permissions: samplePermissions,
			onchange: fn()
		}
	});
</script>

<!-- Essential Stories (5 required, excluding Playground) -->
<Story
	name="Default"
	args={{
		label: 'User Permissions',
		permissions: samplePermissions
	}}
/>

<Story
	name="With Selected Values"
	args={{
		label: 'Selected Permissions',
		value: ['read_users', 'read_products', 'view_analytics'],
		permissions: samplePermissions
	}}
/>

<Story
	name="Disabled State"
	args={{
		label: 'Disabled Permissions',
		disabled: true,
		value: ['read_users', 'read_products'],
		permissions: samplePermissions
	}}
/>

<Story
	name="Loading State"
	args={{
		label: 'Loading Permissions',
		loading: true,
		permissions: samplePermissions
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Permission Selection',
		error: 'Please select at least one permission',
		permissions: samplePermissions
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Permission Selector',
		variant: 'primary',
		size: 'md',
		disabled: false,
		required: false,
		loading: false,
		showGroups: true,
		showSelectAll: true,
		permissions: samplePermissions,
		onchange: fn()
	}}
/>
