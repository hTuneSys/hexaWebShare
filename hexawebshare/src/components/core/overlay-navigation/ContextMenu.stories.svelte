<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ContextMenu from './ContextMenu.svelte';
	import type { MenuItem } from './ContextMenu.svelte';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/ContextMenu',
		component: ContextMenu,
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the context menu is open'
			},
			x: {
				control: { type: 'number', min: 0, max: 2000, step: 10 },
				description: 'X position of the menu (in pixels)'
			},
			y: {
				control: { type: 'number', min: 0, max: 2000, step: 10 },
				description: 'Y position of the menu (in pixels)'
			},
			items: {
				control: 'object',
				description: 'Array of menu items to display'
			},
			ariaLabel: {
				control: 'text',
				description: 'ARIA label for accessibility'
			}
		}
	});

	const defaultItems: MenuItem[] = [
		{ label: 'Copy', onClick: () => console.log('Copy clicked') },
		{ label: 'Paste', onClick: () => console.log('Paste clicked') },
		{ label: 'Cut', onClick: () => console.log('Cut clicked') }
	];

	const itemsWithDisabled: MenuItem[] = [
		{ label: 'Copy', onClick: () => console.log('Copy clicked') },
		{ label: 'Paste', disabled: true, onClick: () => console.log('Paste clicked') },
		{ label: 'Cut', onClick: () => console.log('Cut clicked') },
		{ label: 'Delete', disabled: true, onClick: () => console.log('Delete clicked') }
	];

	const itemsWithDividers: MenuItem[] = [
		{ label: 'Copy', onClick: () => console.log('Copy clicked') },
		{ label: 'Paste', onClick: () => console.log('Paste clicked'), divider: true },
		{ label: 'Cut', onClick: () => console.log('Cut clicked') },
		{ label: 'Delete', onClick: () => console.log('Delete clicked'), divider: true },
		{ label: 'Select All', onClick: () => console.log('Select All clicked') }
	];

	const interactiveItems: MenuItem[] = [
		{
			label: 'New File',
			onClick: () => {
				alert('New File created!');
			}
		},
		{
			label: 'Open File',
			onClick: () => {
				alert('Opening file...');
			},
			divider: true
		},
		{
			label: 'Save',
			onClick: () => {
				alert('File saved!');
			}
		},
		{
			label: 'Save As',
			onClick: () => {
				alert('Save As dialog opened!');
			},
			divider: true
		},
		{
			label: 'Exit',
			onClick: () => {
				alert('Exiting application...');
			}
		}
	];
</script>

<Story
	name="Default"
	args={{
		open: true,
		x: 100,
		y: 100,
		items: defaultItems,
		onClose: () => console.log('Menu closed'),
		ariaLabel: 'Context menu'
	}}
/>

<Story
	name="Top Left"
	args={{
		open: true,
		x: 20,
		y: 20,
		items: defaultItems,
		ariaLabel: 'Context menu at top left'
	}}
/>

<Story
	name="Top Right"
	args={{
		open: true,
		x: 600,
		y: 20,
		items: defaultItems,
		ariaLabel: 'Context menu at top right'
	}}
/>

<Story
	name="Bottom Left"
	args={{
		open: true,
		x: 20,
		y: 400,
		items: defaultItems,
		ariaLabel: 'Context menu at bottom left'
	}}
/>

<Story
	name="Bottom Right"
	args={{
		open: true,
		x: 600,
		y: 400,
		items: defaultItems,
		ariaLabel: 'Context menu at bottom right'
	}}
/>

<Story
	name="With Disabled Items"
	args={{
		open: true,
		x: 100,
		y: 100,
		items: itemsWithDisabled,
		ariaLabel: 'Context menu with disabled items'
	}}
/>

<Story
	name="With Dividers"
	args={{
		open: true,
		x: 100,
		y: 100,
		items: itemsWithDividers,
		ariaLabel: 'Context menu with dividers'
	}}
/>

<Story
	name="Interactive"
	args={{
		open: true,
		x: 100,
		y: 100,
		items: interactiveItems,
		ariaLabel: 'Interactive context menu'
	}}
/>

<Story
	name="Accessibility Demo"
	args={{
		open: true,
		x: 100,
		y: 100,
		items: [
			{ label: 'Copy', onClick: () => console.log('Copy') },
			{ label: 'Paste', onClick: () => console.log('Paste') },
			{ label: 'Cut', onClick: () => console.log('Cut') }
		],
		onClose: () => console.log('Menu closed - Use Controls to toggle open state'),
		ariaLabel: 'File operations context menu - Use arrow keys to navigate, Enter to select, Escape to close'
	}}
/>
