<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
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

<Story name="Basic List" args={{ items: basicItems, ariaLabel: 'Basic list example' }} />

<Story name="With Icons" args={{ items: iconItems, ariaLabel: 'List with icons' }} />

<Story
	name="With Descriptions"
	args={{ items: descriptionItems, ariaLabel: 'List with descriptions' }}
/>

<Story name="With Badges" args={{ items: badgeItems, ariaLabel: 'List with badge counts' }} />

<Story
	name="Mixed States"
	args={{ items: mixedStateItems, ariaLabel: 'List with active and disabled items' }}
/>

<Story
	name="Navigation Links"
	args={{ items: linkItems, variant: 'hoverable', ariaLabel: 'Navigation menu' }}
/>

<Story
	name="Status List"
	args={{ items: statusItems, variant: 'bordered', ariaLabel: 'Status list' }}
/>

<Story name="Bordered" args={{ variant: 'bordered', ariaLabel: 'Bordered list' }} />

<Story name="Hoverable" args={{ variant: 'hoverable', ariaLabel: 'Hoverable list' }} />

<Story name="Striped" args={{ variant: 'striped', ariaLabel: 'Striped list' }} />

<Story name="Horizontal" args={{ horizontal: true, ariaLabel: 'Horizontal list' }} />

<Story
	name="Ordered List"
	args={{ ordered: true, items: basicItems, ariaLabel: 'Numbered list' }}
/>

<Story name="Compact" args={{ compact: true, ariaLabel: 'Compact list' }} />

<Story name="Small Size" args={{ size: 'sm', ariaLabel: 'Small list' }} />

<Story name="Large Size" args={{ size: 'lg', ariaLabel: 'Large list' }} />

<Story name="Disabled" args={{ disabled: true, ariaLabel: 'Disabled list' }} />

<Story
	name="Custom Items"
	args={{
		variant: 'bordered',
		ariaLabel: 'Custom list with various items',
		items: [
			{ id: 1, label: 'Custom Item 1', icon: '🎨', description: 'This is a custom list item' },
			{ id: 2, label: 'Custom Item 2', icon: '🔧', badge: 'New', badgeVariant: 'accent' },
			{ id: 3, label: 'Custom Item 3', icon: '📚', active: true },
			{ id: 4, label: 'Custom Item 4', icon: '🎯', disabled: true }
		]
	}}
/>

<Story name="Interactive">
	<List
		items={iconItems}
		variant="hoverable"
		ariaLabel="Interactive list"
		onItemClick={(item, index) => alert(`Clicked: ${item.label} at index ${index}`)}
	/>
</Story>

<Story name="Horizontal Navigation">
	<List
		items={linkItems}
		horizontal
		variant="hoverable"
		size="sm"
		ariaLabel="Horizontal navigation"
	/>
</Story>

<Story name="Settings Menu">
	<div class="w-64">
		<List
			variant="bordered"
			ariaLabel="Settings menu"
			items={[
				{ id: 1, label: 'Account', description: 'Manage your account', icon: '👤' },
				{ id: 2, label: 'Privacy', description: 'Privacy settings', icon: '🔒' },
				{
					id: 3,
					label: 'Notifications',
					description: 'Notification preferences',
					icon: '🔔',
					badge: '3',
					badgeVariant: 'info'
				},
				{ id: 4, label: 'Appearance', description: 'Theme and display', icon: '🎨' },
				{ id: 5, label: 'Security', description: 'Security options', icon: '🛡️' }
			]}
		/>
	</div>
</Story>

<Story name="File List">
	<div class="w-80">
		<List
			variant="striped"
			ariaLabel="File list"
			items={[
				{ id: 1, label: 'document.pdf', description: '2.4 MB', icon: '📄' },
				{ id: 2, label: 'image.png', description: '1.2 MB', icon: '🖼️' },
				{ id: 3, label: 'video.mp4', description: '45.6 MB', icon: '🎬' },
				{ id: 4, label: 'archive.zip', description: '12.8 MB', icon: '📦' },
				{ id: 5, label: 'spreadsheet.xlsx', description: '0.8 MB', icon: '📊' }
			]}
		/>
	</div>
</Story>
