<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->
<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NotificationCenter from './NotificationCenter.svelte';
	import { fn } from 'storybook/test';

	// Helper to create relative timestamps
	const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60000);
	const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3600000);
	const daysAgo = (days: number) => new Date(Date.now() - days * 86400000);

	const { Story } = defineMeta({
		title: 'Admin/System/NotificationCenter',
		component: NotificationCenter,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text', description: 'Title of the notification center' },
			loading: { control: 'boolean', description: 'Loading state' },
			disabled: { control: 'boolean', description: 'Disabled state' },
			maxHeight: { control: 'text', description: 'Maximum height of the list' }
		},
		args: {
			title: 'Notifications',
			loading: false,
			disabled: false,
			maxHeight: '320px',
			onread: fn(),
			ondelete: fn(),
			onmarkallread: fn(),
			onclearall: fn(),
			notifications: [
				{
					id: '1',
					title: 'New user registered',
					message: 'John Doe has created an account.',
					variant: 'info',
					read: false,
					timestamp: minutesAgo(5)
				},
				{
					id: '2',
					title: 'Payment received',
					message: 'You received a payment of $150.00',
					variant: 'success',
					read: false,
					timestamp: hoursAgo(2)
				},
				{
					id: '3',
					title: 'Server maintenance',
					message: 'Scheduled maintenance on Sunday.',
					variant: 'warning',
					read: true,
					timestamp: daysAgo(1)
				}
			]
		}
	});
</script>

<Story name="Default" />

<Story
	name="Loading"
	args={{
		loading: true,
		notifications: []
	}}
/>

<Story
	name="Empty"
	args={{
		notifications: []
	}}
/>

<Story
	name="All Variants"
	args={{
		notifications: [
			{
				id: '1',
				title: 'Information notice',
				message: 'This is an informational notification.',
				variant: 'info',
				read: false,
				timestamp: minutesAgo(2)
			},
			{
				id: '2',
				title: 'Success message',
				message: 'Operation completed successfully.',
				variant: 'success',
				read: false,
				timestamp: minutesAgo(15)
			},
			{
				id: '3',
				title: 'Warning alert',
				message: 'Please review this item.',
				variant: 'warning',
				read: false,
				timestamp: hoursAgo(1)
			},
			{
				id: '4',
				title: 'Error occurred',
				message: 'Something went wrong.',
				variant: 'error',
				read: false,
				timestamp: hoursAgo(3)
			}
		]
	}}
/>

<Story
	name="All Read"
	args={{
		notifications: [
			{
				id: '1',
				title: 'Old notification',
				message: 'This has been read.',
				variant: 'info',
				read: true,
				timestamp: daysAgo(2)
			},
			{
				id: '2',
				title: 'Another read notification',
				message: 'This one too.',
				variant: 'success',
				read: true,
				timestamp: daysAgo(3)
			}
		]
	}}
/>

<Story
	name="Many Notifications"
	args={{
		notifications: [
			{
				id: '1',
				title: 'New comment on your post',
				message: 'Someone commented on your recent post.',
				variant: 'info',
				read: false,
				timestamp: minutesAgo(1)
			},
			{
				id: '2',
				title: 'Order shipped',
				message: 'Your order #12345 has been shipped.',
				variant: 'success',
				read: false,
				timestamp: minutesAgo(10)
			},
			{
				id: '3',
				title: 'Password change detected',
				message: 'Your password was changed recently.',
				variant: 'warning',
				read: false,
				timestamp: minutesAgo(30)
			},
			{
				id: '4',
				title: 'Failed login attempt',
				message: 'Someone tried to access your account.',
				variant: 'error',
				read: false,
				timestamp: hoursAgo(1)
			},
			{
				id: '5',
				title: 'New follower',
				message: 'Jane Smith started following you.',
				variant: 'info',
				read: true,
				timestamp: hoursAgo(2)
			},
			{
				id: '6',
				title: 'Weekly report ready',
				message: 'Your weekly analytics report is available.',
				variant: 'info',
				read: true,
				timestamp: hoursAgo(5)
			},
			{
				id: '7',
				title: 'Subscription renewed',
				message: 'Your premium subscription has been renewed.',
				variant: 'success',
				read: true,
				timestamp: daysAgo(1)
			},
			{
				id: '8',
				title: 'Storage almost full',
				message: 'You have used 90% of your storage.',
				variant: 'warning',
				read: true,
				timestamp: daysAgo(2)
			},
			{
				id: '9',
				title: 'API rate limit reached',
				message: 'You have exceeded your API rate limit.',
				variant: 'error',
				read: true,
				timestamp: daysAgo(3)
			},
			{
				id: '10',
				title: 'Team member added',
				message: 'Bob Wilson has joined your team.',
				variant: 'info',
				read: true,
				timestamp: daysAgo(4)
			}
		]
	}}
/>

<Story
	name="Disabled"
	args={{
		disabled: true,
		notifications: [
			{
				id: '1',
				title: 'Cannot interact',
				message: 'This notification center is disabled.',
				variant: 'warning',
				read: false,
				timestamp: minutesAgo(10)
			}
		]
	}}
/>

<!-- Playground - Interactive story for testing all props -->
<Story
	name="Playground"
	args={{
		title: 'Notifications',
		loading: false,
		disabled: false,
		maxHeight: '320px',
		onread: fn(),
		ondelete: fn(),
		onmarkallread: fn(),
		onclearall: fn(),
		notifications: [
			{
				id: '1',
				title: 'New user registered',
				message: 'John Doe has created an account.',
				variant: 'info',
				read: false,
				timestamp: minutesAgo(5)
			},
			{
				id: '2',
				title: 'Payment received',
				message: 'You received a payment of $150.00',
				variant: 'success',
				read: false,
				timestamp: hoursAgo(2)
			},
			{
				id: '3',
				title: 'Server maintenance',
				message: 'Scheduled maintenance on Sunday.',
				variant: 'warning',
				read: true,
				timestamp: daysAgo(1)
			},
			{
				id: '4',
				title: 'Critical error detected',
				message: 'Please check system logs immediately.',
				variant: 'error',
				read: false,
				timestamp: minutesAgo(15)
			}
		]
	}}
/>
