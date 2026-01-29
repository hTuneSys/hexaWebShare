<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AdminSidebar from './AdminSidebar.svelte';
	import type { AdminSidebarItem } from './AdminSidebar.svelte';

	const defaultItems: AdminSidebarItem[] = [
		{ id: 'dashboard', label: 'Dashboard', icon: 'D', active: true },
		{ id: 'users', label: 'Users', icon: 'U', badge: 24 },
		{ id: 'products', label: 'Products', icon: 'P' },
		{ id: 'orders', label: 'Orders', icon: 'O', badge: 8, badgeVariant: 'success' },
		{ id: 'analytics', label: 'Analytics', icon: 'A' },
		{ id: 'settings', label: 'Settings', icon: 'S' }
	];

	const itemsWithDropdown: AdminSidebarItem[] = [
		{ id: 'dashboard', label: 'Dashboard', icon: 'D', active: true },
		{
			id: 'users',
			label: 'Users',
			icon: 'U',
			badge: 24,
			children: [
				{ id: 'users-list', label: 'All Users' },
				{ id: 'users-active', label: 'Active Users' },
				{ id: 'users-inactive', label: 'Inactive Users' },
				{ id: 'users-add', label: 'Add User' }
			]
		},
		{
			id: 'products',
			label: 'Products',
			icon: 'P',
			children: [
				{ id: 'products-list', label: 'All Products' },
				{ id: 'products-categories', label: 'Categories' },
				{ id: 'products-inventory', label: 'Inventory' }
			]
		},
		{ id: 'orders', label: 'Orders', icon: 'O', badge: 8, badgeVariant: 'success' },
		{ id: 'analytics', label: 'Analytics', icon: 'A' },
		{ id: 'settings', label: 'Settings', icon: 'S' }
	];

	const itemsWithBadges: AdminSidebarItem[] = [
		{ id: 'inbox', label: 'Inbox', icon: 'I', badge: 12, badgeVariant: 'primary' },
		{ id: 'alerts', label: 'Alerts', icon: 'A', badge: 3, badgeVariant: 'error' },
		{ id: 'pending', label: 'Pending', icon: 'P', badge: 5, badgeVariant: 'warning' },
		{ id: 'completed', label: 'Completed', icon: 'C', badge: 28, badgeVariant: 'success' },
		{ id: 'info', label: 'Information', icon: 'i', badge: 2, badgeVariant: 'info' }
	];

	const itemsWithDisabled: AdminSidebarItem[] = [
		{ id: 'dashboard', label: 'Dashboard', icon: 'D', active: true },
		{ id: 'users', label: 'Users', icon: 'U' },
		{ id: 'products', label: 'Products', icon: 'P', disabled: true },
		{ id: 'orders', label: 'Orders', icon: 'O', disabled: true },
		{ id: 'analytics', label: 'Analytics', icon: 'A' },
		{ id: 'settings', label: 'Settings', icon: 'S' }
	];

	const { Story } = defineMeta({
		title: 'Admin/Layout/AdminSidebar',
		component: AdminSidebar,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'compact', 'bordered']
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg']
			},
			width: {
				control: { type: 'select' },
				options: ['narrow', 'default', 'wide']
			},
			defaultBadgeVariant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			sidebarId: {
				control: { type: 'text' }
			},
			headerMinHeightClass: {
				control: { type: 'text' }
			},
			collapsed: { control: 'boolean' },
			collapsible: { control: 'boolean' },
			sticky: { control: 'boolean' },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	let playgroundCollapsed = $state(false);
</script>

<Story name="Default">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={defaultItems}
				title="Admin Panel"
				subtitle="Navigation"
				variant="default"
				size="md"
				width="default"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Admin sidebar navigation"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="With Dropdown Items">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={itemsWithDropdown}
				title="Admin Panel"
				subtitle="With Nested Menus"
				variant="default"
				size="md"
				width="default"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Admin sidebar with dropdown menus"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Collapsed State">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={defaultItems}
				title="Admin Panel"
				subtitle="Navigation"
				variant="default"
				size="md"
				width="default"
				collapsed={true}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Collapsed admin sidebar"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="With Badge Variants">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={itemsWithBadges}
				title="Notifications"
				subtitle="Badge Examples"
				variant="default"
				size="md"
				width="default"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Sidebar with badge variants"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Compact Variant">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={defaultItems}
				title="Admin Panel"
				subtitle="Compact Mode"
				variant="compact"
				size="sm"
				width="narrow"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Compact admin sidebar"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Bordered Variant">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={defaultItems}
				title="Admin Panel"
				subtitle="Bordered Style"
				variant="bordered"
				size="md"
				width="default"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Bordered admin sidebar"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Wide Width">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={defaultItems}
				title="Admin Panel"
				subtitle="Wide Sidebar"
				variant="default"
				size="lg"
				width="wide"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Wide admin sidebar"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Loading State">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={defaultItems}
				title="Admin Panel"
				subtitle="Loading..."
				variant="default"
				size="md"
				width="default"
				collapsed={false}
				collapsible={false}
				sticky={false}
				disabled={false}
				loading={true}
				ariaLabel="Loading admin sidebar"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Disabled State">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={defaultItems}
				title="Admin Panel"
				subtitle="Disabled"
				variant="default"
				size="md"
				width="default"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={true}
				loading={false}
				ariaLabel="Disabled admin sidebar"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Disabled Items">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={itemsWithDisabled}
				title="Admin Panel"
				subtitle="Some Items Disabled"
				variant="default"
				size="md"
				width="default"
				collapsed={false}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Sidebar with disabled items"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>

<Story name="Playground">
	{#snippet children()}
		<div class="h-[500px]">
			<AdminSidebar
				items={itemsWithDropdown}
				title="Admin Panel"
				subtitle="Interactive Playground"
				variant="default"
				size="md"
				width="default"
				bind:collapsed={playgroundCollapsed}
				collapsible={true}
				sticky={false}
				disabled={false}
				loading={false}
				ariaLabel="Interactive admin sidebar playground"
				expandAriaLabel="Expand sidebar"
				collapseAriaLabel="Collapse sidebar"
				sidebarId="admin-sidebar-default"
				defaultBadgeVariant="primary"
				headerMinHeightClass="min-h-16"
				onItemClick={(item) => console.log('Clicked:', item.label)}
				onCollapse={(c) => console.log('Collapsed:', c)}
				class=""
			/>
		</div>
	{/snippet}
</Story>
