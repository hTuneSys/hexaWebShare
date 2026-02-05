<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MultiSelect from './MultiSelect.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/MultiSelect',
		component: MultiSelect,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: [
					undefined,
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				]
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			width: {
				control: { type: 'select' },
				options: ['full', 'auto', 'xs', 'sm', 'md', 'lg', 'xl']
			},
			align: {
				control: { type: 'select' },
				options: [undefined, 'left', 'center', 'right']
			},
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			loading: { control: 'boolean' },
			searchable: { control: 'boolean' },
			clearable: { control: 'boolean' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' },
			maxSelected: { control: 'number' }
		},
		args: {
			options: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
			onchange: fn(),
			onblur: fn(),
			onfocus: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Select Fruits' }} />

<Story
	name="With Selected Values"
	args={{
		label: 'Selected Fruits',
		defaultValue: ['Apple', 'Cherry']
	}}
/>

<Story
	name="Searchable"
	args={{
		label: 'Searchable MultiSelect',
		searchable: true,
		placeholder: 'Type to search...',
		options: [
			'Apple',
			'Banana',
			'Cherry',
			'Date',
			'Elderberry',
			'Fig',
			'Grape',
			'Honeydew',
			'Kiwi',
			'Lemon'
		]
	}}
/>

<Story
	name="Max Selection"
	args={{
		label: 'Select up to 3',
		maxSelected: 3,
		helpText: 'You can select a maximum of 3 options'
	}}
/>

<Story
	name="Primary Variant"
	args={{
		variant: 'primary',
		label: 'Primary MultiSelect',
		defaultValue: ['Apple']
	}}
/>

<Story
	name="Small Size"
	args={{
		size: 'sm',
		label: 'Small MultiSelect',
		defaultValue: ['Apple']
	}}
/>

<Story
	name="Large Size"
	args={{
		size: 'lg',
		label: 'Large MultiSelect',
		defaultValue: ['Apple']
	}}
/>

<Story
	name="Disabled State"
	args={{
		label: 'Disabled MultiSelect',
		disabled: true,
		defaultValue: ['Apple', 'Banana']
	}}
/>

<Story
	name="Loading State"
	args={{
		label: 'Loading MultiSelect',
		loading: true
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'Required Selection',
		error: 'Please select at least one option'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		searchable: true,
		placeholder: 'Select options...',
		variant: 'primary',
		size: 'md',
		disabled: false,
		loading: false,
		required: false,
		clearable: true,
		options: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4',
			'Option 5',
			'Option 6',
			'Option 7',
			'Option 8'
		],
		onchange: fn(),
		onblur: fn(),
		onfocus: fn()
	}}
/>
