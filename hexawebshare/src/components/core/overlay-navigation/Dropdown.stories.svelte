<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Dropdown from './Dropdown.svelte';

	// Sample items for stories
	const basicItems = [
		{ id: 1, label: 'Profile' },
		{ id: 2, label: 'Settings' },
		{ id: 3, label: 'Logout' }
	];

	const itemsWithIcons = [
		{ id: 1, label: 'Dashboard', icon: '📊' },
		{ id: 2, label: 'Profile', icon: '👤' },
		{ id: 3, label: 'Settings', icon: '⚙️' },
		{ id: 4, label: 'Help', icon: '❓' },
		{ id: 5, label: 'Logout', icon: '🚪' }
	];

	const itemsWithDescriptions = [
		{ id: 1, label: 'New File', icon: '📄', description: 'Create a new document' },
		{ id: 2, label: 'Open', icon: '📂', description: 'Open existing file' },
		{ id: 3, label: 'Save', icon: '💾', description: 'Save current changes' },
		{ id: 4, label: 'Export', icon: '📤', description: 'Export to different format' }
	];

	const itemsWithDividers = [
		{ id: 1, label: 'Cut', icon: '✂️' },
		{ id: 2, label: 'Copy', icon: '📋' },
		{ id: 3, label: 'Paste', icon: '📎', divider: true },
		{ id: 4, label: 'Delete', icon: '🗑️' }
	];

	const itemsWithDisabled = [
		{ id: 1, label: 'Edit', icon: '✏️' },
		{ id: 2, label: 'Duplicate', icon: '📑' },
		{ id: 3, label: 'Archive', icon: '📦', disabled: true },
		{ id: 4, label: 'Delete', icon: '🗑️', disabled: true }
	];

	const { Story } = defineMeta({
		component: Dropdown,
		title: 'Core/Overlay Navigation/Dropdown',
		tags: ['autodocs'],
		argTypes: {
			items: {
				control: 'object',
				description: 'Array of dropdown items'
			},
			label: {
				control: 'text',
				description: 'Label for default trigger button'
			},
			position: {
				control: { type: 'select' },
				options: ['bottom', 'top', 'left', 'right'],
				description: 'Position of dropdown content relative to trigger'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'end'],
				description: 'Alignment of dropdown content'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'ghost'],
				description: 'Visual variant of the dropdown trigger'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size preset for dropdown'
			},
			hover: {
				control: 'boolean',
				description: 'Open dropdown on hover instead of click'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the dropdown'
			},
			loading: {
				control: 'boolean',
				description: 'Show loading state'
			},
			closeOnSelect: {
				control: 'boolean',
				description: 'Close dropdown when an item is selected'
			},
			onOpenChange: { action: 'onOpenChange' },
			onItemClick: { action: 'onItemClick' }
		},
		args: {
			items: basicItems,
			label: 'Menu',
			position: 'bottom',
			align: 'start',
			variant: 'default',
			size: 'md',
			hover: false,
			disabled: false,
			loading: false,
			closeOnSelect: true,
			onOpenChange: fn(),
			onItemClick: fn()
		}
	});
</script>

<!-- Default -->
<Story name="Default" />

<!-- Size Variants -->
<Story name="Small Size" args={{ size: 'sm' }} />
<Story name="Large Size" args={{ size: 'lg' }} />

<!-- Variant Styles -->
<Story name="Bordered Variant" args={{ variant: 'bordered' }} />
<Story name="Ghost Variant" args={{ variant: 'ghost' }} />

<!-- Position Variants -->
<Story name="Position Top" args={{ position: 'top' }} />
<Story name="Position Right" args={{ position: 'right' }} />

<!-- Content Variants -->
<Story name="With Icons" args={{ items: itemsWithIcons }} />
<Story name="With Descriptions" args={{ items: itemsWithDescriptions, label: 'File' }} />
<Story name="With Dividers" args={{ items: itemsWithDividers, label: 'Edit' }} />

<!-- State Variants -->
<Story name="Disabled State" args={{ disabled: true }} />

<!-- Playground -->
<Story
	name="Playground"
	args={{
		items: itemsWithIcons,
		label: 'Click Me',
		position: 'bottom',
		align: 'start',
		variant: 'default',
		size: 'md',
		hover: false,
		disabled: false,
		loading: false,
		closeOnSelect: true
	}}
/>
