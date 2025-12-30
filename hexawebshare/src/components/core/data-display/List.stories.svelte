<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import List from './List.svelte';

	const { Story } = defineMeta({
		title: 'Core/Data Display/List',
		component: List,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'hoverable', 'striped'],
				description: 'Visual variant of the list'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for list items'
			},
			ordered: {
				control: 'boolean',
				description: 'Display as ordered (numbered) list'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable all list items'
			},
			horizontal: {
				control: 'boolean',
				description: 'Horizontal list layout'
			},
			compact: {
				control: 'boolean',
				description: 'Compact spacing between items'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the list'
			}
		},
		args: {
			variant: 'default',
			size: 'md',
			ordered: false,
			disabled: false,
			horizontal: false,
			compact: false,
			onItemClick: fn(),
			onItemSelect: fn(),
			items: [
				{ id: 1, label: 'Dashboard', icon: '📊' },
				{ id: 2, label: 'Profile', icon: '👤' },
				{ id: 3, label: 'Settings', icon: '⚙️' },
				{ id: 4, label: 'Help', icon: '❓' }
			]
		}
	});

	// Sample data for different stories
	const basicItems = [
		{ id: 1, label: 'Item One' },
		{ id: 2, label: 'Item Two' },
		{ id: 3, label: 'Item Three' }
	];

	const iconItems = [
		{ id: 1, label: 'Dashboard', icon: '📊' },
		{ id: 2, label: 'Profile', icon: '👤' },
		{ id: 3, label: 'Settings', icon: '⚙️' },
		{ id: 4, label: 'Notifications', icon: '🔔' }
	];

	const descriptionItems = [
		{ id: 1, label: 'Dashboard', description: 'Overview of your account', icon: '📊' },
		{ id: 2, label: 'Profile', description: 'Manage your personal info', icon: '👤' },
		{ id: 3, label: 'Settings', description: 'Configure preferences', icon: '⚙️' }
	];

	const badgeItems = [
		{ id: 1, label: 'Inbox', badge: '12', badgeVariant: 'primary', icon: '📥' },
		{ id: 2, label: 'Sent', badge: '5', badgeVariant: 'secondary', icon: '📤' },
		{ id: 3, label: 'Drafts', badge: '3', badgeVariant: 'info', icon: '📝' },
		{ id: 4, label: 'Spam', badge: '99+', badgeVariant: 'error', icon: '🚫' }
	];

	const mixedStateItems = [
		{ id: 1, label: 'Active Item', active: true, icon: '✓' },
		{ id: 2, label: 'Normal Item', icon: '○' },
		{ id: 3, label: 'Disabled Item', disabled: true, icon: '✕' },
		{ id: 4, label: 'Another Normal', icon: '○' }
	];

	const linkItems = [
		{ id: 1, label: 'Home', href: '#home', icon: '🏠' },
		{ id: 2, label: 'Products', href: '#products', icon: '📦' },
		{ id: 3, label: 'About Us', href: '#about', icon: 'ℹ️' },
		{ id: 4, label: 'Contact', href: '#contact', icon: '✉️' }
	];

	const statusItems = [
		{ id: 1, label: 'Build Succeeded', badge: 'Success', badgeVariant: 'success', icon: '✓' },
		{ id: 2, label: 'Tests Running', badge: 'In Progress', badgeVariant: 'warning', icon: '⏳' },
		{ id: 3, label: 'Deploy Failed', badge: 'Error', badgeVariant: 'error', icon: '✕' },
		{ id: 4, label: 'Review Pending', badge: 'Pending', badgeVariant: 'info', icon: '👁️' }
	];
</script>

<Story name="Default" />

<Story
	name="With Icons and Badges"
	args={{ items: badgeItems, ariaLabel: 'List with badge counts' }}
/>

<Story
	name="With Descriptions"
	args={{ items: descriptionItems, ariaLabel: 'List with descriptions' }}
/>

<Story name="Bordered Variant" args={{ variant: 'bordered', ariaLabel: 'Bordered list' }} />

<Story name="Striped Variant" args={{ variant: 'striped', ariaLabel: 'Striped list' }} />

<Story name="Horizontal Layout" args={{ horizontal: true, ariaLabel: 'Horizontal list' }} />

<Story name="Small Size" args={{ size: 'sm', items: basicItems, ariaLabel: 'Small list' }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		variant: 'default',
		size: 'md',
		ordered: false,
		disabled: false,
		horizontal: false,
		compact: false,
		onItemClick: fn(),
		onItemSelect: fn(),
		items: [
			{ id: 1, label: 'Dashboard', icon: '📊' },
			{ id: 2, label: 'Profile', icon: '👤' },
			{ id: 3, label: 'Settings', icon: '⚙️' },
			{ id: 4, label: 'Help', icon: '❓' }
		]
	}}
/>
