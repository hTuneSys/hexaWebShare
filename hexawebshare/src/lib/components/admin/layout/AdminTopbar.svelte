<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import IconButton from '../../core/buttons/IconButton.svelte';
	import SearchInput from '../../core/forms/SearchInput.svelte';
	import Avatar from '../../core/media/Avatar.svelte';
	import Dropdown from '../../core/overlay-navigation/Dropdown.svelte';
	import Icon from '../../core/media/Icon.svelte';
	import Badge from '../../core/media/Badge.svelte';
	import Menu from '../../core/overlay-navigation/Menu.svelte';
	import type { MenuItem } from '../../core/overlay-navigation/Menu.svelte';
	import Row from '../../core/layout/Row.svelte';
	import Col from '../../core/layout/Col.svelte';
	import Button from '../../core/buttons/Button.svelte';
	import MenuIcon from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import Bell from 'lucide-svelte/icons/bell';

	interface User {
		name: string;
		avatar?: string;
		email?: string;
		role?: string;
	}

	interface Notification {
		id: string;
		title: string;
		read: boolean;
	}

	interface Props {
		onToggleSidebar?: () => void;
		user?: User;
		notifications?: Notification[];
		onSearch?: (query: string) => void;
		placeholder?: string;
		notificationsLabel?: string;
		profileLabel?: string;
		logoutLabel?: string;
		settingsLabel?: string;
		menuLabel?: string;
		loginLabel?: string;
		searchLabel?: string;
		closeLabel?: string;
		navAriaLabel?: string;
		// Callbacks
		onProfileClick?: () => void;
		onSettingsClick?: () => void;
		onLogoutClick?: () => void;
		onNotificationClick?: (notificationId: string) => void;
		onEmptyNotificationClick?: () => void;
		onLoginClick?: () => void;
		// Icons
		profileIcon?: string;
		settingsIcon?: string;
		logoutIcon?: string;
		badgeVariant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
	}

	const {
		onToggleSidebar,
		user = { name: 'Guest' },
		notifications = [],
		onSearch,
		placeholder = 'Search...',
		notificationsLabel = 'Notifications',
		profileLabel = 'Profile',
		logoutLabel = 'Logout',
		settingsLabel = 'Settings',
		menuLabel = 'Menu',
		loginLabel = 'Login',
		searchLabel = 'Search',
		closeLabel = 'Close',
		navAriaLabel = 'Admin topbar navigation',
		onProfileClick,
		onSettingsClick,
		onLogoutClick,
		onNotificationClick,
		onEmptyNotificationClick,
		onLoginClick,
		profileIcon = '👤',
		settingsIcon = '⚙️',
		logoutIcon = '🚪',
		badgeVariant = 'primary'
	}: Props = $props();

	let unreadCount = $derived(notifications.filter((n) => !n.read).length);

	// Mobile Search State
	let isMobileSearchOpen = $state(false);

	// UX: Check if user is actually logged in (Guest name is considered not logged in)
	let isLoggedIn = $derived(user && user.name !== 'Guest' && (user.email || user.avatar));

	// Notification Menu Items
	let notificationItems: MenuItem[] = $derived([
		{ id: 'title', label: notificationsLabel, type: 'title', divider: true },
		...notifications.map((n) => ({
			id: n.id,
			label: n.title,
			active: !n.read
		}))
	]);

	// Profile Menu Items (Only for logged in users)
	const profileItems: MenuItem[] = [
		{ id: 'profile', label: profileLabel, icon: profileIcon, onClick: onProfileClick },
		{ id: 'settings', label: settingsLabel, icon: settingsIcon, onClick: onSettingsClick },
		{ id: 'sep', type: 'divider', label: '' },
		{ id: 'logout', label: logoutLabel, icon: logoutIcon, variant: 'error', onClick: onLogoutClick }
	];

	// Handle notification item click
	function handleNotificationClick(item: MenuItem) {
		if (onNotificationClick && typeof item.id === 'string') {
			onNotificationClick(item.id);
		}
	}
</script>

<Row sticky border gap="4" align="center" class="bg-base-100 h-16 px-4" ariaLabel={navAriaLabel}>
	{#if isMobileSearchOpen}
		<!-- Mobile Search Overlay -->
		<Col flex="grow" class="flex w-full flex-row items-center gap-2">
			<SearchInput
				class="flex-grow"
				{placeholder}
				onsearch={(q: string) => {
					onSearch?.(q);
					if (q) isMobileSearchOpen = false;
				}}
			/>
			<Button
				variant="ghost"
				class="flex-shrink-0 text-sm font-medium"
				onclick={() => {
					isMobileSearchOpen = false;
				}}
			>
				{closeLabel}
			</Button>
		</Col>
	{:else}
		<!-- Left: Sidebar Toggle -->
		<Col flex="none" hideAbove="lg">
			<IconButton variant="ghost" circle ariaLabel={menuLabel} onclick={onToggleSidebar}>
				<Icon name="menu" size="md" ariaHidden={true}>
					<MenuIcon />
				</Icon>
			</IconButton>
		</Col>

		<!-- Center: Search -->
		<Col flex="grow" hideBelow="md" class="mx-auto max-w-xl">
			{#if onSearch}
				<SearchInput {placeholder} onsearch={onSearch} />
			{/if}
		</Col>

		<!-- Right: Actions -->
		<Col flex="none" class="ml-auto">
			<Row gap="2" align="center">
				<!-- Mobile Search Toggle -->
				{#if onSearch}
					<Col hideAbove="md">
						<IconButton
							variant="ghost"
							circle
							ariaLabel={searchLabel}
							onclick={() => (isMobileSearchOpen = true)}
						>
							<Icon name="search" size="md" ariaHidden={true}>
								<Search />
							</Icon>
						</IconButton>
					</Col>
				{/if}

				<!-- Notifications -->
				{#if notifications.length > 0}
					<Dropdown position="bottom" align="end" triggerClass="btn btn-ghost btn-circle">
						{#snippet trigger()}
							<div class="indicator">
								<Icon name="bell" size="md" ariaHidden={true}>
									<Bell />
								</Icon>
								{#if unreadCount > 0}
									<Badge
										variant={badgeVariant}
										size="xs"
										class="indicator-item"
										label={String(unreadCount)}
									/>
								{/if}
							</div>
						{/snippet}

						{#snippet children()}
							<Menu
								items={notificationItems}
								size="sm"
								class="w-64"
								onItemClick={handleNotificationClick}
							/>
						{/snippet}
					</Dropdown>
				{:else}
					<IconButton
						variant="ghost"
						circle
						ariaLabel={notificationsLabel}
						onclick={onEmptyNotificationClick}
					>
						<Icon name="bell" size="md" ariaHidden={true}>
							<Bell />
						</Icon>
					</IconButton>
				{/if}

				<!-- User Profile / Login -->
				{#if isLoggedIn}
					<Dropdown
						position="bottom"
						align="end"
						triggerClass="btn btn-ghost btn-circle p-0.5 overflow-hidden"
					>
						{#snippet trigger()}
							<Avatar
								src={user.avatar}
								alt={user.name}
								size="sm"
								status="online"
								fallbackChar={user.name.charAt(0)}
								class="h-full w-full"
							/>
						{/snippet}

						<Menu items={profileItems} size="sm" class="w-52" />
					</Dropdown>
				{:else}
					<Button
						variant="primary"
						size="sm"
						class="px-4"
						label={loginLabel}
						onclick={onLoginClick}
					/>
				{/if}
			</Row>
		</Col>
	{/if}
</Row>
