<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ButtonGroupWrapper from './ButtonGroupWrapper.svelte';

	const { Story } = defineMeta({
		title: 'Core/ButtonGroup',
		component: ButtonGroupWrapper,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical']
			}
		}
	});
</script>

<!-- Default Horizontal Group -->
<Story
	name="Horizontal"
	args={{
		orientation: 'horizontal',
		buttons: [
			{ label: 'First', variant: 'primary' },
			{ label: 'Second', variant: 'primary' },
			{ label: 'Third', variant: 'primary' }
		]
	}}
/>

<!-- Vertical Group -->
<Story
	name="Vertical"
	args={{
		orientation: 'vertical',
		buttons: [
			{ label: 'First', variant: 'primary' },
			{ label: 'Second', variant: 'primary' },
			{ label: 'Third', variant: 'primary' }
		]
	}}
/>

<!-- Small Size -->
<Story
	name="Small Size"
	args={{
		buttons: [
			{ label: 'Small', variant: 'primary', size: 'sm' },
			{ label: 'Small', variant: 'primary', size: 'sm' },
			{ label: 'Small', variant: 'primary', size: 'sm' }
		]
	}}
/>

<!-- Medium Size -->
<Story
	name="Medium Size"
	args={{
		buttons: [
			{ label: 'Medium', variant: 'primary', size: 'md' },
			{ label: 'Medium', variant: 'primary', size: 'md' },
			{ label: 'Medium', variant: 'primary', size: 'md' }
		]
	}}
/>

<!-- Large Size -->
<Story
	name="Large Size"
	args={{
		buttons: [
			{ label: 'Large', variant: 'primary', size: 'lg' },
			{ label: 'Large', variant: 'primary', size: 'lg' },
			{ label: 'Large', variant: 'primary', size: 'lg' }
		]
	}}
/>

<!-- With Icons -->
<Story
	name="With Icons"
	args={{
		buttons: [
			{ label: '✓ Save', variant: 'primary' },
			{ label: '✏ Edit', variant: 'secondary' },
			{ label: '🗑 Delete', variant: 'error' }
		]
	}}
/>

<!-- Disabled States -->
<Story
	name="Disabled States"
	args={{
		buttons: [
			{ label: 'Enabled', variant: 'primary' },
			{ label: 'Disabled', variant: 'primary', disabled: true },
			{ label: 'Enabled', variant: 'primary' }
		]
	}}
/>

<!-- Mixed Button Variants -->
<Story
	name="Mixed Variants"
	args={{
		buttons: [
			{ label: 'Primary', variant: 'primary' },
			{ label: 'Secondary', variant: 'secondary' },
			{ label: 'Accent', variant: 'accent' },
			{ label: 'Info', variant: 'info' },
			{ label: 'Success', variant: 'success' }
		]
	}}
/>
