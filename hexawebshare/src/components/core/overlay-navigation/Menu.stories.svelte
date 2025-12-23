<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Menu from './Menu.svelte';
	import { fn } from 'storybook/test';

	// Sample menu items
	const basicItems = [
		{ id: '1', label: 'Home' },
		{ id: '2', label: 'About' },
		{ id: '3', label: 'Services' },
		{ id: '4', label: 'Contact' }
	];

	const itemsWithIcons = [
		{ id: '1', label: 'Dashboard', icon: '📊' },
		{ id: '2', label: 'Settings', icon: '⚙️' },
		{ id: '3', label: 'Profile', icon: '👤' },
		{ id: '4', label: 'Logout', icon: '🚪' }
	];

	const itemsWithDescriptions = [
		{ id: '1', label: 'Overview', description: 'View your dashboard' },
		{ id: '2', label: 'Analytics', description: 'Track your metrics' },
		{ id: '3', label: 'Reports', description: 'Generate reports' }
	];

	const itemsWithStates = [
		{ id: '1', label: 'Active Item', active: true },
		{ id: '2', label: 'Normal Item' },
		{ id: '3', label: 'Disabled Item', disabled: true },
		{ id: '4', label: 'Another Item' }
	];

	const itemsWithDividers = [
		{ id: '1', label: 'File', divider: true },
		{ id: '2', label: 'Edit', divider: true },
		{ id: '3', label: 'View' },
		{ id: '4', label: 'Help', divider: true },
		{ id: '5', label: 'About' }
	];

	const itemsWithLinks = [
		{ id: '1', label: 'Home', href: '/' },
		{ id: '2', label: 'About', href: '/' },
		{ id: '3', label: 'Services', href: '/' },
		{ id: '4', label: 'Contact', href: '/' }
	];

	const complexItems = [
		{ id: '1', label: 'Dashboard', icon: '📊', description: 'Main dashboard', active: true },
		{ id: '2', label: 'Projects', icon: '📁', description: 'Manage projects' },
		{ id: '3', label: 'Team', icon: '👥', description: 'Team members', divider: true },
		{ id: '4', label: 'Settings', icon: '⚙️', description: 'Application settings' },
		{ id: '5', label: 'Help', icon: '❓', description: 'Get help', disabled: true }
	];

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Menu',
		component: Menu,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'compact'],
				description: 'Visual variant of the menu'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for menu items'
			},
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
				description: 'Menu orientation'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable all menu items'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the menu'
			}
		},
		args: {
			items: basicItems,
			variant: 'default',
			size: 'md',
			orientation: 'vertical',
			disabled: false,
			onItemClick: fn()
		}
	});
</script>

<script lang="ts">
	import type { MenuItem } from './Menu.svelte';

	let selectedItem = $state<string | number>('1');

	const interactiveItems: MenuItem[] = [
		{ id: '1', label: 'Option 1', onClick: () => (selectedItem = '1') },
		{ id: '2', label: 'Option 2', onClick: () => (selectedItem = '2') },
		{ id: '3', label: 'Option 3', onClick: () => (selectedItem = '3') }
	];

	// Update active state based on selection
	let itemsWithActive = $derived(
		interactiveItems.map((item) => ({
			...item,
			active: item.id === selectedItem
		}))
	);
</script>

<!-- Default Stories -->
<Story name="Default" args={{ items: basicItems }} />

<Story name="With Icons" args={{ items: itemsWithIcons }} />

<Story name="With Descriptions" args={{ items: itemsWithDescriptions }} />

<Story name="With Active State" args={{ items: itemsWithStates }} />

<Story name="With Dividers" args={{ items: itemsWithDividers }} />

<Story name="With Links" args={{ items: itemsWithLinks }} />

<Story name="Complex Example" args={{ items: complexItems }} />

<!-- Variant Stories -->
<Story name="Bordered" args={{ items: basicItems, variant: 'bordered' }} />

<Story name="Compact" args={{ items: basicItems, variant: 'compact' }} />

<!-- Size Stories -->
<Story name="Small" args={{ items: basicItems, size: 'sm' }} />

<Story name="Medium" args={{ items: basicItems, size: 'md' }} />

<Story name="Large" args={{ items: basicItems, size: 'lg' }} />

<!-- Orientation Stories -->
<Story name="Horizontal" args={{ items: basicItems, orientation: 'horizontal' }} />

<Story name="Vertical" args={{ items: basicItems, orientation: 'vertical' }} />

<!-- State Stories -->
<Story name="Disabled" args={{ items: basicItems, disabled: true }} />

<Story name="Disabled Items" args={{ items: itemsWithStates }} />

<!-- Slot-based Content -->
<Story name="Slot Content">
	<Menu ariaLabel="Custom menu with slot content">
		{#snippet children()}
			<li><a href="/">Custom Item 1</a></li>
			<li><a href="/">Custom Item 2</a></li>
			<li><a href="/">Custom Item 3</a></li>
		{/snippet}
	</Menu>
</Story>

<!-- Interactive Example -->
<Story name="Interactive">
	<div class="space-y-4">
		<Menu items={itemsWithActive} ariaLabel="Interactive menu" />
		<p class="text-base-content/70 text-sm">
			Selected: <strong>{selectedItem}</strong>
		</p>
	</div>
</Story>

<!-- Horizontal Bordered -->
<Story name="Horizontal Bordered" args={{ items: basicItems, orientation: 'horizontal', variant: 'bordered' }} />

<!-- Compact Horizontal -->
<Story name="Compact Horizontal" args={{ items: basicItems, orientation: 'horizontal', variant: 'compact' }} />

<!-- Large Vertical -->
<Story name="Large Vertical" args={{ items: itemsWithIcons, size: 'lg', orientation: 'vertical' }} />

<!-- Small Horizontal -->
<Story name="Small Horizontal" args={{ items: basicItems, size: 'sm', orientation: 'horizontal' }} />

