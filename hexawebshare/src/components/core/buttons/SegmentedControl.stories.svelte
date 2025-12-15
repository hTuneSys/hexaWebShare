<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<!-- Trigger CI lint -->
<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SegmentedControl from './SegmentedControl.svelte';

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
			disabled: { control: 'boolean' },
			name: { control: 'text' }
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

<Story name="Size Variants">
	<div class="flex flex-col items-start gap-4">
		<SegmentedControl
			options={[
				{ label: 'Map', value: 'map' },
				{ label: 'Transit', value: 'transit' },
				{ label: 'Satellite', value: 'satellite' }
			]}
			value="map"
			size="xs"
		/>
		<SegmentedControl
			options={[
				{ label: 'Map', value: 'map' },
				{ label: 'Transit', value: 'transit' },
				{ label: 'Satellite', value: 'satellite' }
			]}
			value="map"
			size="sm"
		/>
		<SegmentedControl
			options={[
				{ label: 'Map', value: 'map' },
				{ label: 'Transit', value: 'transit' },
				{ label: 'Satellite', value: 'satellite' }
			]}
			value="map"
			size="md"
		/>
		<SegmentedControl
			options={[
				{ label: 'Map', value: 'map' },
				{ label: 'Transit', value: 'transit' },
				{ label: 'Satellite', value: 'satellite' }
			]}
			value="map"
			size="lg"
		/>
	</div>
</Story>

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
	name="Interactive Playground"
	args={{
		options: [
			{ label: 'First', value: 'first' },
			{ label: 'Second', value: 'second' },
			{ label: 'Third', value: 'third' }
		],
		value: 'second',
		size: 'md',
		disabled: false
	}}
/>
