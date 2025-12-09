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

<!-- Default Story -->
<Story name="Default">
	<div class="w-full max-w-xs">
		<FormWrapper>
			<input type="text" placeholder="Enter text" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- With Label -->
<Story name="With Label">
	<div class="w-full max-w-xs">
		<FormWrapper label="Email Address">
			<input type="email" placeholder="example@email.com" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- With Help Text -->
<Story name="With Help Text">
	<div class="w-full max-w-xs">
		<FormWrapper label="Password" helpText="Must be at least 8 characters long">
			<input type="password" placeholder="Enter password" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- With Error -->
<Story
	name="With Error"
	args={{ label: 'Email Address', error: 'Please enter a valid email address', hasError: true }}
>
	<div class="w-full max-w-xs">
		<FormWrapper label="Email Address" error="Please enter a valid email address" hasError={true}>
			<input type="email" placeholder="example@email.com" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- Required Field -->
<Story name="Required Field">
	<div class="w-full max-w-xs">
		<FormWrapper label="Username" required={true}>
			<input type="text" placeholder="Enter username" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- Disabled State -->
<Story name="Disabled">
	<div class="w-full max-w-xs">
		<FormWrapper label="Disabled Field" disabled={true}>
			<input type="text" placeholder="Cannot edit" class="input input-bordered w-full" disabled />
		</FormWrapper>
	</div>
</Story>

<!-- Sizes -->
<Story name="Extra Small">
	<div class="w-full max-w-xs">
		<FormWrapper label="XS Field" size="xs">
			<input type="text" placeholder="Extra small" class="input input-xs input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="Small">
	<div class="w-full max-w-xs">
		<FormWrapper label="Small Field" size="sm">
			<input type="text" placeholder="Small" class="input input-sm input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="Medium">
	<div class="w-full max-w-xs">
		<FormWrapper label="Medium Field" size="md">
			<input type="text" placeholder="Medium" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<Story name="Large">
	<div class="w-full max-w-xs">
		<FormWrapper label="Large Field" size="lg">
			<input type="text" placeholder="Large" class="input input-lg input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- Complete Example -->
<Story name="Complete Example">
	<div class="w-full max-w-xs space-y-4">
		<FormWrapper label="Full Name" required={true} helpText="Enter your first and last name">
			<input type="text" placeholder="John Doe" class="input input-bordered w-full" />
		</FormWrapper>

		<FormWrapper
			label="Email"
			required={true}
			error="This email is already registered"
			hasError={true}
		>
			<input type="email" placeholder="example@email.com" class="input input-bordered w-full" />
		</FormWrapper>

		<FormWrapper label="Phone Number" helpText="Optional">
			<input type="tel" placeholder="+1 (555) 123-4567" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- With Select -->
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

<!-- With Textarea -->
<Story name="With Textarea">
	<div class="w-full max-w-xs">
		<FormWrapper label="Message" helpText="Maximum 500 characters">
			<textarea class="textarea textarea-bordered w-full" placeholder="Enter your message" rows="4"
			></textarea>
		</FormWrapper>
	</div>
</Story>

<!-- Error State Only -->
<Story name="Error State Only">
	<div class="w-full max-w-xs">
		<FormWrapper error="This field is required" hasError={true}>
			<input type="text" placeholder="Required field" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- Without Label -->
<Story name="Without Label">
	<div class="w-full max-w-xs">
		<FormWrapper helpText="Enter your search query">
			<input type="search" placeholder="Search..." class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- Loading State -->
<Story name="Loading">
	<div class="w-full max-w-xs">
		<FormWrapper label="Loading Field" loading={true} helpText="Validating input...">
			<input type="text" placeholder="Type to validate" class="input input-bordered w-full pr-10" />
		</FormWrapper>
	</div>
</Story>

<!-- Loading with Error -->
<Story name="Loading with Error">
	<div class="w-full max-w-xs">
		<FormWrapper label="Email" loading={true} error="Email already exists" hasError={true}>
			<input
				type="email"
				placeholder="example@email.com"
				class="input input-bordered w-full pr-10"
			/>
		</FormWrapper>
	</div>
</Story>

<!-- All Combinations: Label + Required + HelpText -->
<Story name="Label + Required + HelpText">
	<div class="w-full max-w-xs">
		<FormWrapper label="Full Name" required={true} helpText="Enter your complete name">
			<input type="text" placeholder="John Doe" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- All Combinations: Label + Required + Error -->
<Story name="Label + Required + Error">
	<div class="w-full max-w-xs">
		<FormWrapper
			label="Password"
			required={true}
			error="Password must be at least 8 characters"
			hasError={true}
		>
			<input type="password" placeholder="Enter password" class="input input-bordered w-full" />
		</FormWrapper>
	</div>
</Story>

<!-- All Combinations: Disabled + Required -->
<Story name="Disabled + Required">
	<div class="w-full max-w-xs">
		<FormWrapper label="Read Only Field" required={true} disabled={true}>
			<input
				type="text"
				value="Cannot edit"
				class="input input-bordered w-full"
				disabled
				readonly
			/>
		</FormWrapper>
	</div>
</Story>

<!-- Different Form Field Types -->
<Story name="With Checkbox">
	<div class="w-full max-w-xs">
		<FormWrapper label="Accept Terms" required={true} helpText="You must accept to continue">
			<input type="checkbox" class="checkbox-primary checkbox" />
		</FormWrapper>
	</div>
</Story>

<!-- Success State (with success message as helpText) -->
<Story name="Success State">
	<div class="w-full max-w-xs">
		<FormWrapper label="Email" helpText="Email is available">
			<input
				type="email"
				value="user@example.com"
				class="input input-bordered input-success w-full"
			/>
		</FormWrapper>
	</div>
</Story>
