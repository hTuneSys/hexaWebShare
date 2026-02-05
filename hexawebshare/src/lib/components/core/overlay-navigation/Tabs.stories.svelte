<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from './Tabs.svelte';
	import { fn } from 'storybook/test';

	// Sample tab data
	const basicTabs = [
		{ value: 'tab1', label: 'Tab 1' },
		{ value: 'tab2', label: 'Tab 2' },
		{ value: 'tab3', label: 'Tab 3' }
	];

	const manyTabs = [
		{ value: 'tab1', label: 'Overview' },
		{ value: 'tab2', label: 'Details' },
		{ value: 'tab3', label: 'Settings' },
		{ value: 'tab4', label: 'History' },
		{ value: 'tab5', label: 'Analytics' }
	];

	const tabsWithDisabled = [
		{ value: 'tab1', label: 'Enabled Tab' },
		{ value: 'tab2', label: 'Disabled Tab', disabled: true },
		{ value: 'tab3', label: 'Another Enabled' }
	];

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['boxed', 'bordered', 'lifted'],
				description: 'Visual style variant of the tabs (DaisyUI v4 naming)'
			},
			color: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'],
				description: 'Color variant (applies to tabs)'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size of the tabs'
			},
			disabled: {
				control: 'boolean',
				description: 'Disable all tabs'
			},
			useRadio: {
				control: 'boolean',
				description: 'Use radio inputs instead of buttons'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the tablist'
			}
		},
		args: {
			tabs: basicTabs,
			variant: 'bordered',
			size: 'md',
			disabled: false,
			onChange: fn()
		}
	});
</script>

<script lang="ts">
	let controlledValue = $state<string | number>('tab1');
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ tabs: basicTabs }} />

<Story name="Bordered Variant" args={{ tabs: basicTabs, variant: 'bordered' }} />

<Story name="Lifted Variant" args={{ tabs: basicTabs, variant: 'lifted' }} />

<Story name="Boxed Variant" args={{ tabs: basicTabs, variant: 'boxed' }} />

<Story name="Primary Color" args={{ tabs: basicTabs, color: 'primary' }} />

<Story name="Small Size" args={{ tabs: basicTabs, size: 'sm' }} />

<Story name="Large Size" args={{ tabs: basicTabs, size: 'lg' }} />

<Story name="With Disabled Tab" args={{ tabs: tabsWithDisabled }} />

<Story name="Many Tabs" args={{ tabs: manyTabs }} />

<Story
	name="Radio Bordered"
	args={{ tabs: basicTabs, useRadio: true, variant: 'bordered', name: 'radio-tabs-bordered' }}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story name="Playground" args={{ tabs: basicTabs, variant: 'bordered', size: 'md' }} />
