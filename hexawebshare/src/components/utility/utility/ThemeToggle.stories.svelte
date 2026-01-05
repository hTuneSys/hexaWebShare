<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ThemeToggle from './ThemeToggle.svelte';
	import { fn } from 'storybook/test';

	const demoItems = [
		{ name: 'light', label: 'Light Mode' },
		{ name: 'dark', label: 'Dark Mode' },
		{ name: 'system', label: 'System' }
	];

	const defaultItems = [
		{ name: 'light', label: 'Light' },
		{ name: 'dark', label: 'Dark' },
		{ name: 'system', label: 'System' }
	];

	const { Story } = defineMeta({
		title: 'Utility/Utility/ThemeToggle',
		component: ThemeToggle,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen'
		},
		argTypes: {
			layout: {
				control: { type: 'select' },
				options: ['toggle', 'fab', 'dropdown']
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			shape: {
				control: { type: 'select' },
				options: ['circle', 'square']
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
					'error',
					'ghost'
				]
			},
			customColor: {
				control: 'color'
			},
			position: {
				control: { type: 'select' },
				options: ['static', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
			},
			direction: {
				control: { type: 'select' },
				options: ['auto', 'up', 'down', 'left', 'right', 'circle']
			},
			animation: {
				control: { type: 'select' },
				options: ['rotate', 'flip']
			},
			theme: {
				control: 'text'
			},
			checked: {
				control: 'boolean'
			},
			disabled: {
				control: 'boolean'
			},
			loading: {
				control: 'boolean'
			},
			ariaLabel: {
				control: 'text'
			}
		},
		args: {
			onchange: fn()
		}
	});
</script>

<Story name="Default Toggle" args={{}} />

<Story
	name="Dropdown (Top-Right)"
	args={{
		layout: 'dropdown',
		position: 'top-right',
		items: demoItems
	}}
/>

<Story
	name="Dropdown (Top-Left)"
	args={{
		layout: 'dropdown',
		position: 'top-left',
		items: defaultItems
	}}
/>

<Story
	name="FAB Circular (Bottom-Right)"
	args={{
		layout: 'fab',
		position: 'bottom-right',
		direction: 'circle',
		items: defaultItems
	}}
/>

<Story
	name="FAB Circular (Top-Left)"
	args={{
		layout: 'fab',
		position: 'top-left',
		direction: 'circle',
		items: defaultItems
	}}
/>

<!-- ✅ REQUIRED: Interactive Playground Story (must be last) -->
<Story
	name="Playground"
	args={{
		layout: 'toggle',
		size: 'md',
		shape: 'circle',
		variant: 'ghost',
		customColor: '',
		position: 'static',
		animation: 'rotate',
		checked: false,
		disabled: false,
		loading: false,
		direction: 'auto',
		items: demoItems,
		theme: 'dark',
		ariaLabel: 'Toggle theme'
	}}
/>
