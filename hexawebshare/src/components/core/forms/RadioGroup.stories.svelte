<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioGroup from './RadioGroup.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/RadioGroup',
		component: RadioGroup,
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
			error: { control: 'text' },
			helpText: { control: 'text' },
			value: { control: 'text' }
		},
		args: {
			name: 'radio-group',
			options: ['Option 1', 'Option 2', 'Option 3'],
			onchange: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story
	name="Default"
	args={{
		name: 'default-group',
		label: 'Select an option',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="With Selected Value"
	args={{
		name: 'value-group',
		label: 'Select your country',
		value: 'canada',
		options: [
			{ value: 'usa', label: 'United States' },
			{ value: 'canada', label: 'Canada' },
			{ value: 'mexico', label: 'Mexico' }
		]
	}}
/>

<Story
	name="Primary Variant"
	args={{
		name: 'primary-group',
		label: 'Primary Variant',
		variant: 'primary',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Small Size"
	args={{
		name: 'sm-group',
		label: 'Small Size',
		size: 'sm',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Large Size"
	args={{
		name: 'lg-group',
		label: 'Large Size',
		size: 'lg',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Required Field"
	args={{
		name: 'required-group',
		label: 'Gender',
		required: true,
		options: ['Male', 'Female', 'Other']
	}}
/>

<Story
	name="Disabled State"
	args={{
		name: 'disabled-group',
		label: 'Disabled Group',
		disabled: true,
		value: 'option1',
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' }
		]
	}}
/>

<Story
	name="With Error"
	args={{
		name: 'error-group',
		label: 'Subscription Plan',
		options: ['Free', 'Pro', 'Enterprise'],
		error: 'Please select a subscription plan'
	}}
/>

<Story
	name="Loading State"
	args={{
		name: 'loading-group',
		label: 'Loading Radio Group',
		loading: true,
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="With Disabled Options"
	args={{
		name: 'disabled-options-group',
		label: 'Some Options Disabled',
		options: [
			{ value: 'opt1', label: 'Available Option 1' },
			{ value: 'opt2', label: 'Disabled Option', disabled: true },
			{ value: 'opt3', label: 'Available Option 2' },
			{ value: 'opt4', label: 'Disabled Option 2', disabled: true }
		]
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		name: 'radio-group',
		label: 'Playground',
		variant: 'primary',
		size: 'md',
		disabled: false,
		required: false,
		loading: false,
		options: ['Option 1', 'Option 2', 'Option 3'],
		onchange: fn()
	}}
/>
