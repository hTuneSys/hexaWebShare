<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import AuditTrailList from './AuditTrailList.svelte';

	const { Story } = defineMeta({
		title: 'Admin/System/AuditTrailList',
		component: AuditTrailList,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'compact'],
				description: 'Visual variant of the list'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for list items'
			},
			loading: {
				control: 'boolean',
				description: 'Loading state'
			},
			error: {
				control: 'text',
				description: 'Error message to display'
			},
			emptyMessage: {
				control: 'text',
				description: 'Message to display when list is empty'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the list'
			}
		},
		args: {
			variant: 'default',
			size: 'md',
			loading: false,
			error: null,
			emptyMessage: 'No audit trail entries found',
			onItemClick: fn(),
			ariaLabel: 'Audit trail list'
		}
	});

	// Sample audit trail data
	const defaultItems = [
		{
			id: 1,
			user: {
				id: 1,
				name: 'John Doe',
				email: 'john.doe@example.com'
			},
			action: 'created',
			entity: 'User',
			entityId: 123,
			timestamp: '2025-01-15T10:30:00Z',
			details: 'Created new user account',
			ipAddress: '192.168.1.100'
		},
		{
			id: 2,
			user: {
				id: 2,
				name: 'Jane Smith',
				email: 'jane.smith@example.com'
			},
			action: 'updated',
			entity: 'Product',
			entityId: 456,
			timestamp: '2025-01-15T09:15:00Z',
			details: 'Updated product price',
			ipAddress: '192.168.1.101'
		},
		{
			id: 3,
			user: {
				id: 3,
				name: 'Bob Johnson',
				email: 'bob.johnson@example.com'
			},
			action: 'deleted',
			entity: 'Order',
			entityId: 789,
			timestamp: '2025-01-15T08:00:00Z',
			details: 'Deleted cancelled order',
			ipAddress: '192.168.1.102'
		}
	];

	const itemsWithAvatars = [
		{
			id: 1,
			user: {
				id: 1,
				name: 'Alice Williams',
				email: 'alice@example.com',
				avatar: 'https://i.pravatar.cc/150?img=1'
			},
			action: 'viewed',
			entity: 'Report',
			entityId: 101,
			timestamp: '2025-01-15T11:00:00Z',
			ipAddress: '192.168.1.103'
		},
		{
			id: 2,
			user: {
				id: 2,
				name: 'Charlie Brown',
				email: 'charlie@example.com',
				avatar: 'https://i.pravatar.cc/150?img=2'
			},
			action: 'exported',
			entity: 'Data',
			entityId: 202,
			timestamp: '2025-01-15T10:45:00Z',
			ipAddress: '192.168.1.104'
		},
		{
			id: 3,
			user: {
				id: 3,
				name: 'Diana Prince',
				email: 'diana@example.com',
				avatar: 'https://i.pravatar.cc/150?img=3'
			},
			action: 'imported',
			entity: 'Inventory',
			entityId: 303,
			timestamp: '2025-01-15T10:30:00Z',
			ipAddress: '192.168.1.105'
		}
	];

	const differentActions = [
		{
			id: 1,
			user: {
				id: 1,
				name: 'Henry Ford',
				email: 'henry@example.com'
			},
			action: 'created',
			entity: 'Project',
			entityId: 1001,
			timestamp: '2025-01-15T13:00:00Z',
			ipAddress: '192.168.1.109'
		},
		{
			id: 2,
			user: {
				id: 2,
				name: 'Iris Johnson',
				email: 'iris@example.com'
			},
			action: 'updated',
			entity: 'Task',
			entityId: 2002,
			timestamp: '2025-01-15T12:45:00Z',
			ipAddress: '192.168.1.110'
		},
		{
			id: 3,
			user: {
				id: 3,
				name: 'Jack Wilson',
				email: 'jack@example.com'
			},
			action: 'deleted',
			entity: 'Comment',
			entityId: 3003,
			timestamp: '2025-01-15T12:30:00Z',
			ipAddress: '192.168.1.111'
		},
		{
			id: 4,
			user: {
				id: 4,
				name: 'Karen Davis',
				email: 'karen@example.com'
			},
			action: 'viewed',
			entity: 'Document',
			entityId: 4004,
			timestamp: '2025-01-15T12:15:00Z',
			ipAddress: '192.168.1.112'
		},
		{
			id: 5,
			user: {
				id: 5,
				name: 'Liam Brown',
				email: 'liam@example.com'
			},
			action: 'exported',
			entity: 'Report',
			entityId: 5005,
			timestamp: '2025-01-15T12:00:00Z',
			ipAddress: '192.168.1.113'
		},
		{
			id: 6,
			user: {
				id: 6,
				name: 'Mia Garcia',
				email: 'mia@example.com'
			},
			action: 'imported',
			entity: 'Data',
			entityId: 6006,
			timestamp: '2025-01-15T11:45:00Z',
			ipAddress: '192.168.1.114'
		},
		{
			id: 7,
			user: {
				id: 7,
				name: 'Noah Martinez',
				email: 'noah@example.com'
			},
			action: 'logged_in',
			entity: 'System',
			timestamp: '2025-01-15T11:30:00Z',
			ipAddress: '192.168.1.115'
		},
		{
			id: 8,
			user: {
				id: 8,
				name: 'Olivia Anderson',
				email: 'olivia@example.com'
			},
			action: 'logged_out',
			entity: 'System',
			timestamp: '2025-01-15T11:15:00Z',
			ipAddress: '192.168.1.116'
		},
		{
			id: 9,
			user: {
				id: 9,
				name: 'Paul Taylor',
				email: 'paul@example.com'
			},
			action: 'permission_changed',
			entity: 'Role',
			entityId: 9009,
			timestamp: '2025-01-15T11:00:00Z',
			ipAddress: '192.168.1.117'
		},
		{
			id: 10,
			user: {
				id: 10,
				name: 'Quinn White',
				email: 'quinn@example.com'
			},
			action: 'other',
			entity: 'Custom',
			entityId: 1010,
			timestamp: '2025-01-15T10:45:00Z',
			details: 'Custom action performed',
			ipAddress: '192.168.1.118'
		}
	];
</script>

<Story name="Default" args={{ items: defaultItems }} />

<Story
	name="With User Avatars"
	args={{ items: itemsWithAvatars, ariaLabel: 'Audit trail with user avatars' }}
/>

<Story
	name="All Action Types"
	args={{ items: differentActions, ariaLabel: 'Audit trail showing various action types' }}
/>

<Story name="Bordered Variant" args={{ items: defaultItems, variant: 'bordered' }} />

<Story name="Compact Variant" args={{ items: defaultItems, variant: 'compact' }} />

<Story name="Small Size" args={{ items: defaultItems, size: 'sm' }} />

<Story name="Large Size" args={{ items: defaultItems, size: 'lg' }} />

<Story name="Loading State" args={{ loading: true }} />

<Story name="Empty State" args={{ items: [] }} />

<Story
	name="Error State"
	args={{ error: 'Failed to load audit trail entries. Please try again later.' }}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		items: defaultItems,
		variant: 'default',
		size: 'md',
		loading: false,
		error: null,
		emptyMessage: 'No audit trail entries found',
		onItemClick: fn(),
		ariaLabel: 'Audit trail list'
	}}
/>
