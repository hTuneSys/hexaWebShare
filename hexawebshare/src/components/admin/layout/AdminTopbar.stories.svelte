<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AdminTopbar from './AdminTopbar.svelte';

	const { Story } = defineMeta({
		component: AdminTopbar,
		title: 'Admin/Layout/AdminTopbar',
		tags: ['autodocs'],
		argTypes: {
			onToggleSidebar: { action: 'toggleSidebar' },
			onSearch: { action: 'search' },
			onNotificationClick: { action: 'notificationClicked' },
			onEmptyNotificationClick: { action: 'emptyNotificationClicked' },
			onLoginClick: { action: 'loginClicked' },
			user: { control: 'object' },
			notifications: { control: 'object' },
			loginLabel: { control: 'text' },
			searchLabel: { control: 'text' },
			navAriaLabel: { control: 'text' },
			notificationsLabel: { control: 'text' },
			profileLabel: { control: 'text' },
			logoutLabel: { control: 'text' },
			settingsLabel: { control: 'text' },
			menuLabel: { control: 'text' },
			closeLabel: { control: 'text' },
			onProfileClick: { action: 'profileClicked' },
			onSettingsClick: { action: 'settingsClicked' },
			onLogoutClick: { action: 'logoutClicked' },
			profileIcon: { control: 'text' },
			settingsIcon: { control: 'text' },
			logoutIcon: { control: 'text' },
			badgeVariant: {
				control: 'select',
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			}
		},
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<script lang="ts">
	const defaultUser = {
		name: 'John Doe',
		avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
		email: 'john@example.com'
	};

	const notifications = [
		{ id: '1', title: 'New order received', read: false },
		{ id: '2', title: 'Server update completed', read: false },
		{ id: '3', title: 'New user registered', read: true }
	];
</script>

<!-- 1. Default: Standard User with no notifications -->
<Story name="Default" args={{ user: defaultUser }} />

<!-- 2. Guest: No user provided, shows fallback initials -->
<Story
	name="Guest"
	args={{
		user: undefined
	}}
/>

<!-- 3. Notifications: Show active badge and dropdown items -->
<Story
	name="With Notifications"
	args={{
		user: defaultUser,
		notifications: notifications
	}}
/>

<!-- 4. Without Search: Search bar hidden (useful for small headers) -->
<Story
	name="No Search"
	args={{
		user: defaultUser,
		onSearch: undefined
	}}
/>

<!-- 5. Custom Branding: Demonstrate custom icons and text -->
<Story
	name="Custom Branding"
	args={{
		user: defaultUser,
		notifications: notifications,
		notificationsLabel: 'Alerts',
		profileLabel: 'My Account',
		profileIcon: '👤',
		settingsIcon: '🛠️',
		logoutIcon: '🏃'
	}}
/>

<!-- 5. Playground: All options enabled -->
<Story
	name="Playground"
	args={{
		user: defaultUser,
		notifications: notifications,
		placeholder: 'Type to find anything...',
		notificationsLabel: 'New Alerts'
	}}
/>
