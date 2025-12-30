<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			loading: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' }
		},
		args: {
			options: ['Option 1', 'Option 2', 'Option 3'],
			onchange: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{ label: 'Favorite Fruit', options: ['Apple', 'Banana', 'Cherry', 'Date'] }}
/>

<Story
	name="With Placeholder"
	args={{
		label: 'Select an option',
		placeholder: 'Choose...',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="With Selected Value"
	args={{
		label: 'Selected Option',
		value: 'banana',
		options: [
			{ value: 'apple', label: 'Apple' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'cherry', label: 'Cherry' }
		]
	}}
/>

<Story
	name="Primary Variant"
	args={{
		variant: 'primary',
		label: 'Primary Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Small Size"
	args={{
		size: 'sm',
		label: 'Small Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Large Size"
	args={{
		size: 'lg',
		label: 'Large Select',
		value: 'Option 1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Required Field"
	args={{
		label: 'Required Field',
		required: true,
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Disabled State"
	args={{
		label: 'Disabled Select',
		disabled: true,
		value: 'option2',
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' }
		]
	}}
/>

<Story
	name="Loading State"
	args={{
		label: 'Loading Select',
		placeholder: 'Loading options...',
		loading: true,
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Country',
		options: ['United States', 'Canada', 'Mexico', 'United Kingdom'],
		error: 'Please select a valid country'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		placeholder: 'Choose an option',
		variant: 'primary',
		size: 'md',
		disabled: false,
		required: false,
		loading: false,
		options: ['Option 1', 'Option 2', 'Option 3'],
		onchange: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
