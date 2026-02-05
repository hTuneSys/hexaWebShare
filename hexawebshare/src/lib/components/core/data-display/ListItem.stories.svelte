<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ListItem from './ListItem.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Data Display/ListItem',
		component: ListItem,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Primary text content of the list item'
			},
			description: {
				control: 'text',
				description: 'Secondary/description text displayed below the label'
			},
			variant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Color variant of the list item when active'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size of the list item'
			},
			active: {
				control: 'boolean',
				description: 'Whether the list item is currently active/selected'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the list item is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the list item is in loading state'
			},
			hoverable: {
				control: 'boolean',
				description: 'Whether the list item shows hover effect'
			},
			bordered: {
				control: 'boolean',
				description: 'Whether the list item has a border at the bottom'
			},
			href: {
				control: 'text',
				description: 'URL to navigate to (makes the item a link)'
			},
			target: {
				control: { type: 'select' },
				options: ['_blank', '_self', '_parent', '_top'],
				description: 'Target for the link'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			selected: {
				control: 'boolean',
				description: 'Whether the item is currently selected (for aria-selected)'
			}
		},
		args: {
			label: 'List Item',
			size: 'md',
			variant: 'neutral',
			hoverable: true,
			onclick: fn(),
			onkeydown: fn()
		}
	});
</script>

<script lang="ts">
	let selectedIndex = $state(0);

	function handleClick(index: number) {
		selectedIndex = index;
	}
</script>

<!-- Default Story -->
<Story name="Default" args={{ label: 'Default List Item', size: 'md', variant: 'neutral' }} />

<!-- With Description -->
<Story
	name="With Description"
	args={{
		label: 'List Item with Description',
		description: 'This is a secondary description text that provides more context',
		size: 'md',
		variant: 'neutral'
	}}
/>

<!-- Size Stories -->
<Story
	name="Small Size"
	args={{
		label: 'Small Item',
		description: 'Compact size for dense lists',
		size: 'sm'
	}}
/>

<Story
	name="Large Size"
	args={{
		label: 'Large Item',
		description: 'Larger size for prominent items',
		size: 'lg'
	}}
/>

<!-- Active Variant Stories -->
<Story name="Active Primary" args={{ label: 'Active Primary', variant: 'primary', active: true }} />

<Story name="Active Success" args={{ label: 'Active Success', variant: 'success', active: true }} />

<Story name="Active Error" args={{ label: 'Active Error', variant: 'error', active: true }} />

<!-- State Stories -->
<Story
	name="Disabled State"
	args={{
		label: 'Disabled Item',
		description: 'This item is disabled',
		disabled: true
	}}
/>

<Story
	name="Loading State"
	args={{
		label: 'Loading Item',
		description: 'Loading state with spinner',
		loading: true
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		label: 'Configurable List Item',
		description: 'Use the controls to customize',
		size: 'md',
		variant: 'neutral',
		hoverable: true,
		bordered: false,
		active: false,
		disabled: false,
		loading: false
	}}
/>
