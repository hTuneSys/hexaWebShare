<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UserTable from './UserTable.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Admin/Permissions/UserTable',
		component: UserTable,
		tags: ['autodocs'],
		parameters: {
			viewport: {
				defaultViewport: 'desktop',
				viewports: {
					desktop: {
						name: 'Desktop',
						styles: {
							width: '1280px',
							height: '800px'
						}
					}
				}
			},
			layout: 'fullscreen'
		},
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size variant of the table'
			},
			zebra: {
				control: 'boolean',
				description: 'Enable zebra striped rows'
			},
			hover: {
				control: 'boolean',
				description: 'Enable hover effect on rows'
			},
			compact: {
				control: 'boolean',
				description: 'Make the table compact'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the table'
			},
			bordered: {
				control: 'boolean',
				description: 'Show borders between cells'
			},
			responsive: {
				control: 'boolean',
				description: 'Enable horizontal scroll on small screens'
			},
			showActions: {
				control: 'boolean',
				description: 'Show action buttons (edit, delete) for each row'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the table'
			},
			emptyMessage: {
				control: 'text',
				description: 'Custom empty state message'
			}
		},
		args: {
			onuserclick: fn(),
			onedit: fn(),
			ondelete: fn(),
			onretry: fn()
		}
	});

	// Sample user data for stories
	const sampleUsers = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john.doe@example.com',
			role: 'Admin',
			status: 'active',
			// avatar: undefined - will show placeholder with initials "JD"
			lastLogin: '2025-01-15'
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane.smith@example.com',
			role: 'Editor',
			status: 'active',
			// avatar: undefined - will show placeholder with initials "JS"
			lastLogin: '2025-01-14'
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob.johnson@example.com',
			role: 'Viewer',
			status: 'inactive',
			// avatar: undefined - will show placeholder with initials "BJ"
			lastLogin: '2025-01-10'
		},
		{
			id: 4,
			name: 'Alice Brown',
			email: 'alice.brown@example.com',
			role: 'Editor',
			status: 'pending',
			// avatar: undefined - will show placeholder with initials "AB"
			lastLogin: '2025-01-12'
		},
		{
			id: 5,
			name: 'Charlie Wilson',
			email: 'charlie.wilson@example.com',
			role: 'Viewer',
			status: 'suspended',
			// avatar: undefined - will show placeholder with initials "CW"
		},
		{
			id: 6,
			name: 'Diana Prince',
			email: 'diana.prince@example.com',
			role: 'Admin',
			status: 'active',
			// avatar: undefined - will show placeholder with initials "DP"
			lastLogin: '2025-01-15'
		},
		{
			id: 7,
			name: 'Edward Norton',
			email: 'edward.norton@example.com',
			role: 'Editor',
			status: 'active',
			// avatar: undefined - will show placeholder with initials "EN"
			lastLogin: '2025-01-13'
		},
		{
			id: 8,
			name: 'Fiona Apple',
			email: 'fiona.apple@example.com',
			role: 'Viewer',
			status: 'inactive',
			// avatar: undefined - will show placeholder with initials "FA"
			lastLogin: '2025-01-08'
		}
	];
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		users: sampleUsers,
		size: 'md',
		hover: true,
		showActions: true,
		responsive: false,
		ariaLabel: 'Users table'
	}}
/>

<!-- Loading State -->
<Story
	name="Loading State"
	args={{
		users: [],
		loading: true,
		responsive: false,
		ariaLabel: 'Loading users table'
	}}
/>

<!-- Empty State -->
<Story
	name="Empty State"
	args={{
		users: [],
		emptyMessage: 'No users found',
		responsive: false,
		ariaLabel: 'Empty users table'
	}}
/>

<!-- Error State -->
<Story
	name="Error State"
	args={{
		users: [],
		error: 'Failed to load users. Please try again.',
		responsive: false,
		ariaLabel: 'Users table with error',
		onretry: fn()
	}}
/>

<!-- Size Variants -->
<Story
	name="Small Size"
	args={{
		users: sampleUsers.slice(0, 5),
		size: 'sm',
		hover: true,
		showActions: true,
		responsive: false,
		ariaLabel: 'Small users table'
	}}
/>

<Story
	name="Large Size"
	args={{
		users: sampleUsers,
		size: 'lg',
		hover: true,
		showActions: true,
		responsive: false,
		ariaLabel: 'Large users table'
	}}
/>

<!-- Style Variants -->
<Story
	name="Zebra Striped"
	args={{
		users: sampleUsers,
		zebra: true,
		hover: true,
		showActions: true,
		responsive: false,
		ariaLabel: 'Zebra striped users table'
	}}
/>

<Story
	name="Compact"
	args={{
		users: sampleUsers,
		compact: true,
		hover: true,
		showActions: true,
		responsive: false,
		ariaLabel: 'Compact users table'
	}}
/>

<!-- Without Actions -->
<Story
	name="Without Actions"
	args={{
		users: sampleUsers,
		showActions: false,
		hover: true,
		responsive: false,
		ariaLabel: 'Users table without action buttons'
	}}
/>

<!-- Disabled State -->
<Story
	name="Disabled State"
	args={{
		users: sampleUsers,
		disabled: true,
		hover: true,
		showActions: true,
		responsive: false,
		ariaLabel: 'Disabled users table'
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		users: sampleUsers,
		size: 'md',
		zebra: false,
		hover: true,
		compact: false,
		loading: false,
		disabled: false,
		bordered: false,
		responsive: false,
		showActions: true,
		ariaLabel: 'Interactive users table playground',
		emptyMessage: 'No users found'
	}}
/>
