<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!-- Trigger CI lint -->
<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SegmentedControl from './SegmentedControl.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Buttons/SegmentedControl',
		component: SegmentedControl,
		tags: ['autodocs'],
		argTypes: {
			options: { control: 'object' },
			value: { control: 'text' },
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
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
					'ghost',
					'link'
				]
			},
			disabled: { control: 'boolean' },
			name: { control: 'text' }
		},
		args: {
			onchange: fn()
		}
	});
</script>

<Story
	name="Default"
	args={{
		options: [
			{ label: 'Daily', value: 'daily' },
			{ label: 'Weekly', value: 'weekly' },
			{ label: 'Monthly', value: 'monthly' }
		],
		value: 'weekly'
	}}
/>

<Story
	name="Small Size"
	args={{
		options: [
			{ label: 'Map', value: 'map' },
			{ label: 'Transit', value: 'transit' },
			{ label: 'Satellite', value: 'satellite' }
		],
		value: 'map',
		size: 'sm'
	}}
/>

<Story
	name="Large Size"
	args={{
		options: [
			{ label: 'Map', value: 'map' },
			{ label: 'Transit', value: 'transit' },
			{ label: 'Satellite', value: 'satellite' }
		],
		value: 'map',
		size: 'lg'
	}}
/>

<Story
	name="Disabled State"
	args={{
		options: [
			{ label: 'Option 1', value: 1 },
			{ label: 'Option 2', value: 2 },
			{ label: 'Option 3', value: 3 }
		],
		value: 2,
		disabled: true
	}}
/>

<Story
	name="Disabled Option"
	args={{
		options: [
			{ label: 'Enabled', value: 'enabled' },
			{ label: 'Disabled', value: 'disabled', disabled: true },
			{ label: 'Enabled', value: 'enabled2' }
		],
		value: 'enabled'
	}}
/>

<Story
	name="Two Options"
	args={{
		options: [
			{ label: 'List View', value: 'list' },
			{ label: 'Grid View', value: 'grid' }
		],
		value: 'list'
	}}
/>

<Story
	name="Four Options"
	args={{
		options: [
			{ label: 'Today', value: 'today' },
			{ label: 'Week', value: 'week' },
			{ label: 'Month', value: 'month' },
			{ label: 'Year', value: 'year' }
		],
		value: 'week'
	}}
/>

<Story
	name="Secondary Variant"
	args={{
		options: [
			{ label: 'Option 1', value: 1 },
			{ label: 'Option 2', value: 2 },
			{ label: 'Option 3', value: 3 }
		],
		value: 2,
		variant: 'secondary'
	}}
/>

<Story
	name="Success Variant"
	args={{
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Pending', value: 'pending' },
			{ label: 'Inactive', value: 'inactive' }
		],
		value: 'active',
		variant: 'success'
	}}
/>

<Story
	name="Info Variant"
	args={{
		options: [
			{ label: 'Details', value: 'details' },
			{ label: 'Settings', value: 'settings' },
			{ label: 'About', value: 'about' }
		],
		value: 'details',
		variant: 'info'
	}}
/>

<Story
	name="Playground"
	args={{
		options: [
			{ label: 'First', value: 'first' },
			{ label: 'Second', value: 'second' },
			{ label: 'Third', value: 'third' }
		],
		value: 'second',
		size: 'md',
		variant: 'primary',
		disabled: false
	}}
/>
