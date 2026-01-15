<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Sidebar from './Sidebar.svelte';
	import type { SidebarItem } from './Sidebar.svelte';
	import { fn } from 'storybook/test';

	// Sample data for stories
	const defaultItems: SidebarItem[] = [
		{ id: '1', label: 'Dashboard', icon: '📊', active: true },
		{ id: '2', label: 'Analytics', icon: '📈' },
		{ id: '3', label: 'Users', icon: '👥', badge: 24 },
		{ id: '4', label: 'Products', icon: '📦' },
		{ id: '5', label: 'Orders', icon: '🛒', badge: 8, badgeVariant: 'success' },
		{ id: '6', label: 'Settings', icon: '⚙️' }
	];

	const navigationItems: SidebarItem[] = [
		{ id: 'home', label: 'Home', icon: '🏠', href: '#home' },
		{ id: 'explore', label: 'Explore', icon: '🔍', href: '#explore' },
		{ id: 'notifications', label: 'Notifications', icon: '🔔', badge: 5, href: '#notifications' },
		{
			id: 'messages',
			label: 'Messages',
			icon: '💬',
			badge: 12,
			badgeVariant: 'info',
			href: '#messages'
		},
		{ id: 'profile', label: 'Profile', icon: '👤', href: '#profile' }
	];

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Sidebar',
		component: Sidebar,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'compact', 'bordered'],
				description: 'Visual variant of the sidebar',
				table: {
					type: { summary: "'default' | 'compact' | 'bordered'" },
					defaultValue: { summary: "'default'" }
				}
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for the sidebar items',
				table: {
					type: { summary: "'sm' | 'md' | 'lg'" },
					defaultValue: { summary: "'md'" }
				}
			},
			width: {
				control: { type: 'select' },
				options: ['narrow', 'default', 'wide'],
				description: 'Width of the sidebar',
				table: {
					type: { summary: "'narrow' | 'default' | 'wide'" },
					defaultValue: { summary: "'default'" }
				}
			},
			collapsed: { 
				control: 'boolean',
				description: 'Whether the sidebar is collapsed'
			},
			collapsible: { 
				control: 'boolean',
				description: 'Whether the sidebar can be collapsed'
			},
			sticky: { 
				control: 'boolean',
				description: 'Whether the sidebar is sticky'
			},
			disabled: { 
				control: 'boolean',
				description: 'Disable all sidebar items'
			},
			loading: { 
				control: 'boolean',
				description: 'Whether the sidebar is in loading state'
			},
			title: { 
				control: 'text',
				description: 'Title displayed at the top of the sidebar'
			},
			subtitle: { 
				control: 'text',
				description: 'Subtitle displayed below the title'
			}
		},
		args: {
			items: defaultItems,
			title: 'Sidebar',
			variant: 'default',
			size: 'md',
			width: 'default',
			collapsed: false,
			collapsible: false,
			onItemClick: fn(),
			onCollapse: fn()
		}
	});
</script>

<!-- Main Stories -->
<Story name="Default" args={{ title: 'Sidebar' }} />

<Story
	name="With Active Item"
	args={{
		title: 'Navigation',
		items: [
			{ id: 'home', label: 'Home', icon: '🏠' },
			{ id: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
			{ id: 'search', label: 'Search', icon: '🔍' },
			{ id: 'settings', label: 'Settings', icon: '⚙️' }
		]
	}}
/>

<Story
	name="With Badges"
	args={{
		title: 'Inbox',
		items: [
			{ id: 'inbox', label: 'Inbox', icon: '📥', badge: 5, badgeVariant: 'primary' },
			{ id: 'sent', label: 'Sent', icon: '📤' },
			{ id: 'drafts', label: 'Drafts', icon: '📝', badge: 2, badgeVariant: 'warning' },
			{ id: 'spam', label: 'Spam', icon: '🚫', badge: 99, badgeVariant: 'error' },
			{ id: 'trash', label: 'Trash', icon: '🗑️' }
		]
	}}
/>

<Story name="Collapsible" args={{ title: 'Menu', collapsible: true }} />

<Story name="Collapsed" args={{ title: 'Menu', collapsed: true, collapsible: true }} />

<Story name="Loading" args={{ title: 'Loading...', loading: true }} />

<Story name="Disabled" args={{ title: 'Disabled Menu', disabled: true }} />

<Story
	name="Bordered Variant"
	args={{
		title: 'Admin Panel',
		variant: 'bordered',
		collapsible: true,
		items: defaultItems
	}}
/>

<Story
	name="Compact Variant"
	args={{
		title: 'Settings',
		variant: 'compact',
		size: 'sm',
		width: 'narrow',
		items: [
			{ id: 'account', label: 'Account', icon: '👤', active: true },
			{ id: 'security', label: 'Security', icon: '🔒' },
			{ id: 'api', label: 'API Keys', icon: '🔑' }
		]
	}}
/>

<Story name="Playground" />
