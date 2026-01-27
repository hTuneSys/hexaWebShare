<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import {
		IconButton,
		SearchInput,
		Avatar,
		Dropdown,
		Icon,
		Badge,
		Menu,
		Row,
		Col,
		Button
	} from '../../../lib/index.js';
	import type { MenuItem } from '../../../lib/index.js';

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
</script>

<Row sticky border gap="4" align="center" class="bg-base-100 h-16 px-4" ariaLabel={navAriaLabel}>
	{#if isMobileSearchOpen}
		<!-- Mobile Search Overlay -->
		<Col flex="grow" class="flex w-full flex-row items-center gap-2">
			<SearchInput
				class="flex-grow"
				{placeholder}
				onsearch={(q) => {
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
				<Icon name="menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
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
							<Icon name="search">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
									/>
								</svg>
							</Icon>
						</IconButton>
					</Col>
				{/if}

				<!-- Notifications -->
				{#if notifications.length > 0}
					<Dropdown position="bottom" align="end" triggerClass="btn btn-ghost btn-circle">
						{#snippet trigger()}
							<div class="indicator">
								<Icon name="bell">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
										/>
									</svg>
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
							<Menu items={notificationItems} size="sm" class="w-64" />
						{/snippet}
					</Dropdown>
				{:else}
					<IconButton
						variant="ghost"
						circle
						ariaLabel={notificationsLabel}
						onclick={() => console.log('No notifications')}
					>
						<Icon name="bell">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
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
						onclick={() => console.log('Login')}
					/>
				{/if}
			</Row>
		</Col>
	{/if}
</Row>
