<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FormWrapper from './FormWrapper.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/FormWrapper',
		component: FormWrapper,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Label text for the form field'
			},
			error: {
				control: 'text',
				description: 'Error message to display below the field'
			},
			helpText: {
				control: 'text',
				description: 'Helper text or description displayed below the field'
			},
			required: {
				control: 'boolean',
				description: 'Whether the field is required'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the field is disabled'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Size variant of the form field'
			},
			hasError: {
				control: 'boolean',
				description: 'Automatically applies input-error class to form elements when true'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the field is in loading state'
			}
		},
		args: {
			label: 'Field Label',
			required: false,
			disabled: false,
			size: 'md',
			hasError: false,
			loading: false
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default">
	<div class="w-full max-w-xs">
		<FormWrapper label="Email Address">
			<input type="email" placeholder="example@email.com" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="With Help Text">
	<div class="w-full max-w-xs">
		<FormWrapper label="Password" helpText="Must be at least 8 characters long">
			<input type="password" placeholder="Enter password" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="With Error">
	<div class="w-full max-w-xs">
		<FormWrapper label="Email Address" error="Please enter a valid email address" hasError={true}>
			<input type="email" placeholder="example@email.com" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="Required Field">
	<div class="w-full max-w-xs">
		<FormWrapper label="Username" required={true}>
			<input type="text" placeholder="Enter username" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="Disabled State">
	<div class="w-full max-w-xs">
		<FormWrapper label="Disabled Field" disabled={true}>
			<input type="text" placeholder="Cannot edit" class="input input-bordered w-full" disabled />
		</FormWrapper>
	</div>
</Story>

<Story name="Small Size">
	<div class="w-full max-w-xs">
		<FormWrapper label="Small Field" size="sm">
			<input type="text" placeholder="Small" class="input input-sm input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="Large Size">
	<div class="w-full max-w-xs">
		<FormWrapper label="Large Field" size="lg">
			<input type="text" placeholder="Large" class="input input-lg input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="Loading State">
	<div class="w-full max-w-xs">
		<FormWrapper label="Loading Field" loading={true} helpText="Validating input...">
			<input type="text" placeholder="Type to validate" class="input input-bordered w-full pr-10" />
		</FormWrapper>
	</div>
</Story>

<Story name="With Select">
	<div class="w-full max-w-xs">
		<FormWrapper label="Country" required={true}>
			<select class="select select-bordered w-full">
				<option disabled selected>Choose country</option>
				<option>United States</option>
				<option>United Kingdom</option>
				<option>Canada</option>
			</select>
		</FormWrapper>
	</div>
</Story>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Field Label',
		helpText: 'Helper text',
		required: false,
		disabled: false,
		size: 'md',
		hasError: false,
		loading: false
	}}
/>
