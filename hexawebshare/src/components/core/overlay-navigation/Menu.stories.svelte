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

	const itemsWithStates = [
		{ id: '1', label: 'Active Item', active: true },
		{ id: '2', label: 'Normal Item' },
		{ id: '3', label: 'Disabled Item', disabled: true },
		{ id: '4', label: 'Another Item' }
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

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ items: basicItems }} />

<Story name="With Icons" args={{ items: itemsWithIcons }} />

<Story name="With Active State" args={{ items: itemsWithStates }} />

<Story name="Complex Example" args={{ items: complexItems }} />

<Story name="Bordered Variant" args={{ items: basicItems, variant: 'bordered' }} />

<Story name="Compact Variant" args={{ items: basicItems, variant: 'compact' }} />

<Story name="Small Size" args={{ items: basicItems, size: 'sm' }} />

<Story name="Large Size" args={{ items: basicItems, size: 'lg' }} />

<Story name="Horizontal" args={{ items: basicItems, orientation: 'horizontal' }} />

<Story name="Disabled State" args={{ items: basicItems, disabled: true }} />

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story name="Playground" args={{}} />
