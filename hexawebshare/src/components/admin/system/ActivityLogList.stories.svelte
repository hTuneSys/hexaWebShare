<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import ActivityLogList from './ActivityLogList.svelte';

	// Activity log entry data structure (matching component interface)
	interface ActivityLogEntry {
		id: string | number;
		action: string;
		user: {
			name: string;
			email?: string;
			avatar?: string;
		};
		timestamp: Date | string;
		type?: 'info' | 'success' | 'warning' | 'error';
		description?: string;
		metadata?: Record<string, unknown>;
	}

	const { Story } = defineMeta({
		title: 'Admin/System/ActivityLogList',
		component: ActivityLogList,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for list items'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'card'],
				description: 'Visual variant of the list container'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the component is in loading state'
			},
			showAvatars: {
				control: 'boolean',
				description: 'Whether to show user avatars'
			},
			showTimestamps: {
				control: 'boolean',
				description: 'Whether to show timestamps'
			},
			showBadges: {
				control: 'boolean',
				description: 'Whether to show action type badges'
			},
			maxItems: {
				control: { type: 'number', min: 0, max: 50, step: 1 },
				description: 'Maximum number of items to display (0 = unlimited)'
			},
			emptyTitle: {
				control: 'text',
				description: 'Empty state title when no items are available'
			},
			emptyDescription: {
				control: 'text',
				description: 'Empty state description when no items are available'
			},
			onItemClick: {
				action: 'item-clicked',
				description: 'Callback when an activity log item is clicked'
			}
		},
		args: {
			size: 'md',
			variant: 'default',
			loading: false,
			showAvatars: true,
			showTimestamps: true,
			showBadges: true,
			maxItems: 0,
			onItemClick: fn()
		}
	});

	// Sample activity log entries
	const sampleEntries: ActivityLogEntry[] = [
		{
			id: 1,
			action: 'User Created',
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
				avatar: 'https://i.pravatar.cc/150?img=1'
			},
			timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
			type: 'success',
			description: 'New user account created successfully'
		},
		{
			id: 2,
			action: 'Settings Updated',
			user: {
				name: 'Jane Smith',
				email: 'jane.smith@example.com',
				avatar: 'https://i.pravatar.cc/150?img=2'
			},
			timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
			type: 'info',
			description: 'Application settings were modified'
		},
		{
			id: 3,
			action: 'Payment Failed',
			user: {
				name: 'Bob Johnson',
				email: 'bob.johnson@example.com',
				avatar: 'https://i.pravatar.cc/150?img=3'
			},
			timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
			type: 'error',
			description: 'Payment processing failed for order #1234'
		},
		{
			id: 4,
			action: 'Security Alert',
			user: {
				name: 'Alice Williams',
				email: 'alice.williams@example.com',
				avatar: 'https://i.pravatar.cc/150?img=4'
			},
			timestamp: new Date(Date.now() - 24 * 3600000), // 1 day ago
			type: 'warning',
			description: 'Unusual login activity detected'
		},
		{
			id: 5,
			action: 'Data Exported',
			user: {
				name: 'Charlie Brown',
				email: 'charlie.brown@example.com',
				avatar: 'https://i.pravatar.cc/150?img=5'
			},
			timestamp: new Date(Date.now() - 3 * 24 * 3600000), // 3 days ago
			type: 'info',
			description: 'User data export completed'
		}
	];

	const recentEntries: ActivityLogEntry[] = [
		{
			id: 1,
			action: 'User Logged In',
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
				avatar: 'https://i.pravatar.cc/150?img=1'
			},
			timestamp: new Date(Date.now() - 1 * 60000), // 1 minute ago
			type: 'info'
		},
		{
			id: 2,
			action: 'Profile Updated',
			user: {
				name: 'Jane Smith',
				email: 'jane.smith@example.com',
				avatar: 'https://i.pravatar.cc/150?img=2'
			},
			timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
			type: 'success'
		},
		{
			id: 3,
			action: 'Password Changed',
			user: {
				name: 'Bob Johnson',
				email: 'bob.johnson@example.com',
				avatar: 'https://i.pravatar.cc/150?img=3'
			},
			timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
			type: 'warning'
		}
	];

	const errorEntries: ActivityLogEntry[] = [
		{
			id: 1,
			action: 'API Error',
			user: {
				name: 'System',
				email: 'system@example.com'
			},
			timestamp: new Date(Date.now() - 15 * 60000),
			type: 'error',
			description: 'Failed to process request: Connection timeout'
		},
		{
			id: 2,
			action: 'Database Error',
			user: {
				name: 'System',
				email: 'system@example.com'
			},
			timestamp: new Date(Date.now() - 1 * 3600000),
			type: 'error',
			description: 'Query execution failed: Deadlock detected'
		}
	];

	const successEntries: ActivityLogEntry[] = [
		{
			id: 1,
			action: 'Backup Completed',
			user: {
				name: 'System',
				email: 'system@example.com'
			},
			timestamp: new Date(Date.now() - 2 * 3600000),
			type: 'success',
			description: 'Daily backup completed successfully'
		},
		{
			id: 2,
			action: 'Deployment Successful',
			user: {
				name: 'CI/CD System',
				email: 'ci@example.com'
			},
			timestamp: new Date(Date.now() - 4 * 3600000),
			type: 'success',
			description: 'Application deployed to production'
		}
	];

	const longDescriptionEntries: ActivityLogEntry[] = [
		{
			id: 1,
			action: 'Complex Operation Completed',
			user: {
				name: 'Admin User',
				email: 'admin@example.com',
				avatar: 'https://i.pravatar.cc/150?img=6'
			},
			timestamp: new Date(Date.now() - 1 * 3600000),
			type: 'info',
			description:
				'This is a very long description that demonstrates how the component handles text overflow and truncation. It should be properly truncated with ellipsis to maintain a clean layout.'
		}
	];
</script>

<Story name="Default" args={{ items: sampleEntries }} />

<Story name="Bordered Variant" args={{ items: sampleEntries, variant: 'bordered' }} />

<Story name="Card Variant" args={{ items: sampleEntries, variant: 'card' }} />

<Story name="Small Size" args={{ items: recentEntries, size: 'sm' }} />

<Story name="Large Size" args={{ items: sampleEntries, size: 'lg' }} />

<Story name="Loading State" args={{ loading: true }} />

<Story name="Empty State" args={{ items: [] }} />

<Story name="Empty State with Actions">
	<ActivityLogList items={[]}>
		{#snippet emptyActions()}
			<button class="btn btn-primary btn-sm">Add Activity</button>
			<button class="btn btn-ghost btn-sm">Refresh</button>
		{/snippet}
	</ActivityLogList>
</Story>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		items: sampleEntries,
		size: 'md',
		variant: 'default',
		loading: false,
		showAvatars: true,
		showTimestamps: true,
		showBadges: true,
		maxItems: 0,
		emptyTitle: 'No activity logs',
		emptyDescription: 'There are no activity logs to display.',
		onItemClick: fn()
	}}
/>
