<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InviteUserForm from './InviteUserForm.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/Permissions/InviteUserForm',
		component: InviteUserForm,
		tags: ['autodocs'],
		argTypes: {
			roles: { control: 'object' },
			permissions: { control: 'object' },
			initialPermissions: {
				control: 'object',
				description: 'Array of permission values to be selected initially (e.g., ["read", "write"])'
			},
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' },
			title: { control: 'text' },
			submitLabel: { control: 'text' },
			cancelLabel: { control: 'text' },
			emailLabel: { control: 'text' },
			emailPlaceholder: { control: 'text' },
			roleLabel: { control: 'text' },
			rolePlaceholder: { control: 'text' },
			permissionsLabel: { control: 'text' },
			permissionsPlaceholder: { control: 'text' },
			emailError: { control: 'text' },
			roleError: { control: 'text' },
			permissionsError: { control: 'text' },
			formError: { control: 'text' },
			showCancel: { control: 'boolean' },
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			submitVariant: {
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
			cancelVariant: {
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
			badgeVariant: {
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
					'ghost'
				]
			}
		},
		args: {
			roles: [
				{ value: 'admin', label: 'Administrator' },
				{ value: 'editor', label: 'Editor' },
				{ value: 'viewer', label: 'Viewer' },
				{ value: 'guest', label: 'Guest' }
			],
			permissions: [
				{ value: 'read', label: 'Read' },
				{ value: 'write', label: 'Write' },
				{ value: 'delete', label: 'Delete' },
				{ value: 'manage', label: 'Manage' }
			],
			initialPermissions: [],
			onFormSubmit: fn(),
			onCancel: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{
		title: 'Invite User',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' },
			{ value: 'delete', label: 'Delete' }
		]
	}}
/>

<Story
	name="Small Size"
	args={{
		size: 'sm',
		title: 'Invite User',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' }
		]
	}}
/>

<Story
	name="Loading State"
	args={{
		title: 'Invite User',
		loading: true,
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' }
		]
	}}
/>

<Story
	name="Disabled State"
	args={{
		title: 'Invite User',
		disabled: true,
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' }
		]
	}}
/>

<Story
	name="With Errors"
	args={{
		title: 'Invite User',
		emailError: 'Please enter a valid email address',
		roleError: 'Please select a role',
		permissionsError: 'At least one permission is required',
		formError: 'Please fix the errors above',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' }
		]
	}}
/>

<Story
	name="Primary Variant"
	args={{
		title: 'Invite User',
		variant: 'primary',
		submitVariant: 'primary',
		badgeVariant: 'primary',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' },
			{ value: 'delete', label: 'Delete' }
		]
	}}
/>

<Story
	name="Info Variant"
	args={{
		title: 'Invite User',
		variant: 'info',
		submitVariant: 'info',
		badgeVariant: 'info',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' },
			{ value: 'delete', label: 'Delete' }
		]
	}}
/>

<Story
	name="Success Variant"
	args={{
		title: 'Invite User',
		variant: 'success',
		submitVariant: 'success',
		badgeVariant: 'success',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' },
			{ value: 'delete', label: 'Delete' }
		]
	}}
/>

<Story
	name="Warning Variant"
	args={{
		title: 'Invite User',
		variant: 'warning',
		submitVariant: 'warning',
		badgeVariant: 'warning',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' },
			{ value: 'delete', label: 'Delete' }
		]
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		title: 'Invite User',
		email: '',
		role: '',
		initialPermissions: ['read', 'write'],
		disabled: false,
		loading: false,
		submitLabel: 'Send Invitation',
		cancelLabel: 'Cancel',
		emailLabel: 'Email Address',
		emailPlaceholder: 'user@example.com',
		roleLabel: 'Role',
		rolePlaceholder: 'Select a role',
		permissionsLabel: 'Permissions',
		permissionsPlaceholder: 'Select permissions',
		showCancel: true,
		size: 'md',
		submitVariant: 'primary',
		cancelVariant: 'ghost',
		badgeVariant: 'primary',
		roles: [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'editor', label: 'Editor' },
			{ value: 'viewer', label: 'Viewer' },
			{ value: 'guest', label: 'Guest' }
		],
		permissions: [
			{ value: 'read', label: 'Read' },
			{ value: 'write', label: 'Write' },
			{ value: 'delete', label: 'Delete' },
			{ value: 'manage', label: 'Manage' }
		],
		onFormSubmit: fn(),
		onCancel: fn()
	}}
/>
