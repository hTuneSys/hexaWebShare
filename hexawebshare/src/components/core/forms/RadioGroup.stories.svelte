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

<!-- Default Story -->
<Story
	name="Default"
	args={{
		name: 'default-group',
		label: 'Select an option',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- With Label -->
<Story
	name="With Label"
	args={{
		name: 'label-group',
		label: 'Choose your favorite fruit',
		options: ['Apple', 'Banana', 'Cherry', 'Date']
	}}
/>

<!-- With Value (Pre-selected) -->
<Story
	name="With Value"
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

<!-- With Help Text -->
<Story
	name="With Help Text"
	args={{
		name: 'help-group',
		label: 'Payment Method',
		options: ['Credit Card', 'Bank Transfer', 'Cash'],
		helpText: 'Select your preferred payment method'
	}}
/>

<!-- Required -->
<Story
	name="Required"
	args={{
		name: 'required-group',
		label: 'Gender',
		required: true,
		options: ['Male', 'Female', 'Other']
	}}
/>

<!-- With Error -->
<Story
	name="With Error"
	args={{
		name: 'error-group',
		label: 'Subscription Plan',
		options: ['Free', 'Pro', 'Enterprise'],
		error: 'Please select a subscription plan'
	}}
/>

<!-- Disabled -->
<Story
	name="Disabled"
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

<!-- Variant Stories -->
<Story
	name="Primary"
	args={{
		name: 'primary-group',
		label: 'Primary Variant',
		variant: 'primary',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Secondary"
	args={{
		name: 'secondary-group',
		label: 'Secondary Variant',
		variant: 'secondary',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Accent"
	args={{
		name: 'accent-group',
		label: 'Accent Variant',
		variant: 'accent',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Success"
	args={{
		name: 'success-group',
		label: 'Success Variant',
		variant: 'success',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Warning"
	args={{
		name: 'warning-group',
		label: 'Warning Variant',
		variant: 'warning',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Info"
	args={{
		name: 'info-group',
		label: 'Info Variant',
		variant: 'info',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Error Variant"
	args={{
		name: 'error-variant-group',
		label: 'Error Variant',
		variant: 'error',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- Size Stories -->
<Story
	name="Extra Small"
	args={{
		name: 'xs-group',
		label: 'Extra Small Size',
		size: 'xs',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Small"
	args={{
		name: 'sm-group',
		label: 'Small Size',
		size: 'sm',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Medium"
	args={{
		name: 'md-group',
		label: 'Medium Size (Default)',
		size: 'md',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="Large"
	args={{
		name: 'lg-group',
		label: 'Large Size',
		size: 'lg',
		value: 'option1',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- With Disabled Options -->
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

<!-- Loading -->
<Story
	name="Loading"
	args={{
		name: 'loading-group',
		label: 'Loading Radio Group',
		loading: true,
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<!-- Loading with Selection -->
<Story
	name="Loading with Selection"
	args={{
		name: 'loading-selected-group',
		label: 'Loading with Pre-selected',
		loading: true,
		value: 'option2',
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' }
		]
	}}
/>

<!-- Accessibility Stories -->
<Story
	name="ARIA Label Only"
	args={{
		name: 'aria-label-group',
		ariaLabel: 'Radio group without visible label',
		options: ['Option 1', 'Option 2', 'Option 3']
	}}
/>

<Story
	name="ARIA Describedby"
	args={{
		name: 'aria-describedby-group',
		label: 'Radio Group with Description',
		ariaDescribedby: 'radio-help',
		helpText: 'This is helpful information for screen readers'
	}}
/>

<Story
	name="Accessibility Testing"
	args={{
		name: 'accessibility-test-group',
		label: 'Accessibility Test Group',
		required: true,
		helpText: 'Use keyboard navigation (Arrow keys) to move between options'
	}}
/>

<!-- Form Integration Example -->
<Story name="Form Example">
	<div class="bg-base-200 max-w-md rounded-lg p-6">
		<h2 class="mb-4 text-xl font-bold">Registration Form</h2>
		<div class="space-y-4">
			<RadioGroup
				name="form-gender"
				label="Gender"
				required={true}
				variant="primary"
				options={['Male', 'Female', 'Other', 'Prefer not to say']}
			/>
			<RadioGroup
				name="form-notification"
				label="Notification Preferences"
				variant="primary"
				value="email"
				helpText="How would you like to receive updates?"
				options={[
					{ value: 'email', label: 'Email' },
					{ value: 'sms', label: 'SMS' },
					{ value: 'push', label: 'Push Notifications' },
					{ value: 'none', label: 'No notifications' }
				]}
			/>
			<RadioGroup
				name="form-plan"
				label="Subscription Plan"
				required={true}
				variant="primary"
				options={[
					{ value: 'free', label: 'Free - Basic features' },
					{ value: 'pro', label: 'Pro - $9.99/month' },
					{ value: 'enterprise', label: 'Enterprise - Contact us' }
				]}
			/>
			<button class="btn btn-primary mt-4 w-full">Submit</button>
		</div>
	</div>
</Story>
