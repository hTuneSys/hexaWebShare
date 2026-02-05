<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EntityForm, { type EntityField, type FormMode } from './EntityForm.svelte';
	import { fn } from 'storybook/test';

	// Example entity fields for a User entity
	const userFields: EntityField[] = [
		{
			key: 'id',
			type: 'text',
			label: 'ID',
			placeholder: 'Auto-generated',
			readonly: true,
			hideInCreate: true,
			section: 'Basic Information'
		},
		{
			key: 'name',
			type: 'text',
			label: 'Full Name',
			placeholder: 'Enter full name',
			validation: {
				required: true,
				min: 2,
				max: 100
			},
			section: 'Basic Information'
		},
		{
			key: 'phone',
			type: 'tel',
			label: 'Phone Number',
			placeholder: '+1 (555) 000-0000',
			validation: {
				pattern: '^\\+?[1-9]\\d{1,14}$'
			},
			helpText: 'Optional - International format',
			section: 'Basic Information'
		},
		{
			key: 'email',
			type: 'email',
			label: 'Email Address',
			placeholder: 'user@example.com',
			validation: {
				required: true,
				type: 'email'
			},
			helpText: 'A valid email address is required',
			section: 'Basic Information'
		},
		{
			key: 'password',
			type: 'password',
			label: 'Password',
			placeholder: 'Enter password',
			validation: {
				required: true,
				min: 8,
				max: 50
			},
			helpText: 'Minimum 8 characters required',
			hideInEdit: true,
			section: 'Basic Information'
		},
		{
			key: 'status',
			type: 'select',
			label: 'Status',
			options: [
				{ value: 'active', label: 'Active' },
				{ value: 'inactive', label: 'Inactive' },
				{ value: 'pending', label: 'Pending' }
			],
			validation: {
				required: true
			},
			defaultValue: 'active',
			section: 'Basic Information'
		},
		{
			key: 'role',
			type: 'select',
			label: 'Role',
			options: ['admin', 'user', 'guest'],
			validation: {
				required: true
			},
			section: 'Permissions'
		},
		{
			key: 'department',
			type: 'text',
			label: 'Department',
			placeholder: 'e.g. Engineering, Sales, Marketing',
			helpText: 'Optional - User department or team',
			section: 'Permissions'
		},
		{
			key: 'createdAt',
			type: 'date',
			label: 'Created At',
			readonly: true,
			hideInCreate: true,
			section: 'Metadata'
		},
		{
			key: 'createdBy',
			type: 'text',
			label: 'Created By',
			readonly: true,
			hideInCreate: true,
			section: 'Metadata'
		},
		{
			key: 'updatedAt',
			type: 'date',
			label: 'Last Updated',
			readonly: true,
			hideInCreate: true,
			section: 'Metadata'
		},
		{
			key: 'updatedBy',
			type: 'text',
			label: 'Updated By',
			readonly: true,
			hideInCreate: true,
			section: 'Metadata'
		}
	];

	const { Story } = defineMeta({
		title: 'Admin/Forms/EntityForm',
		component: EntityForm,
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Form title/heading'
			},
			description: {
				control: 'text',
				description: 'Form description text'
			},
			mode: {
				control: { type: 'select' },
				options: ['create', 'edit'],
				description: 'Form mode: create or edit'
			},
			fields: {
				control: { type: 'object' },
				description: 'Field definitions array (JSON format)'
			},
			initialValues: {
				control: { type: 'object' },
				description: 'Initial form values (JSON format)'
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the form is disabled'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the form is in loading state'
			},
			error: {
				control: 'text',
				description: 'Global error message to display at the top of the form'
			},
			success: {
				control: 'text',
				description: 'Global success message to display at the top of the form'
			},
			showAutoSuccess: {
				control: 'boolean',
				description: 'Whether to show automatic success message after submit'
			},
			createSuccessMessage: {
				control: 'text',
				description: 'Custom success message for create mode'
			},
			updateSuccessMessage: {
				control: 'text',
				description: 'Custom success message for edit mode'
			},
			autoMessageDuration: {
				control: 'number',
				description: 'Duration in milliseconds to show auto messages'
			},
			submitLabel: {
				control: 'text',
				description: 'Submit button label'
			},
			cancelLabel: {
				control: 'text',
				description: 'Cancel button label'
			},
			resetLabel: {
				control: 'text',
				description: 'Reset button label'
			},
			showSubmit: {
				control: 'boolean',
				description: 'Whether to show the submit button'
			},
			showCancel: {
				control: 'boolean',
				description: 'Whether to show the cancel button'
			},
			showReset: {
				control: 'boolean',
				description: 'Whether to show the reset button'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'bordered', 'card'],
				description: 'Layout variant for the form'
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Padding size for the form container'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for the form'
			},
			loadingLabel: {
				control: 'text',
				description: 'Accessible label for loading state'
			},
			submitAriaLabel: {
				control: 'text',
				description: 'Accessible label for submit button'
			},
			cancelAriaLabel: {
				control: 'text',
				description: 'Accessible label for cancel button'
			},
			resetAriaLabel: {
				control: 'text',
				description: 'Accessible label for reset button'
			}
		},
		args: {
			title: 'Create User',
			description: 'Fill in the form to create a new user account',
			mode: 'create',
			fields: userFields,
			initialValues: {},
			disabled: false,
			loading: false,
			error: undefined,
			success: undefined,
			showAutoSuccess: true,
			createSuccessMessage: 'Created successfully!',
			updateSuccessMessage: 'Updated successfully!',
			autoMessageDuration: 5000,
			submitLabel: 'Submit',
			cancelLabel: 'Cancel',
			resetLabel: 'Reset',
			showSubmit: true,
			showCancel: false,
			showReset: false,
			variant: 'default',
			padding: 'md',
			ariaLabel: undefined,
			loadingLabel: 'Form is loading',
			submitAriaLabel: 'Submit form',
			cancelAriaLabel: 'Cancel form',
			resetAriaLabel: 'Reset form',
			onsubmit: fn(),
			onreset: fn(),
			oncancel: fn()
		}
	});
</script>

<!-- Create Mode -->
<Story
	name="Create Mode"
	args={{
		title: 'Create User',
		description: 'Fill in the form to create a new user account',
		mode: 'create',
		fields: userFields,
		showCancel: true
	}}
/>

<!-- Edit Mode -->
<Story
	name="Edit Mode"
	args={{
		title: 'Edit User',
		description: 'Update user information',
		mode: 'edit',
		fields: userFields,
		initialValues: {
			id: '123',
			name: 'John Doe',
			email: 'john.doe@example.com',
			status: 'active',
			role: 'admin',
			createdAt: '2025-01-15',
			createdBy: 'admin@company.com',
			updatedAt: '2025-01-20',
			updatedBy: 'manager@company.com'
		},
		showCancel: true
	}}
/>

<!-- Loading State -->
<Story
	name="Loading State"
	args={{
		title: 'Creating User',
		description: 'Please wait while we create the user',
		mode: 'create',
		fields: userFields,
		loading: true
	}}
/>

<!-- Error State -->
<Story
	name="Error State"
	args={{
		title: 'Create User',
		description: 'There was an error creating the user',
		mode: 'create',
		fields: userFields,
		error: 'Failed to create user. Please check the form and try again.'
	}}
/>

<!-- External Success Message -->
<Story
	name="External Success Message"
	args={{
		title: 'Edit User',
		description: 'Example of external success message (from parent component)',
		mode: 'edit',
		fields: userFields,
		initialValues: {
			id: '123',
			name: 'John Doe',
			email: 'john.doe@example.com',
			status: 'active',
			role: 'admin',
			createdAt: '2025-01-15',
			createdBy: 'admin@company.com',
			updatedAt: '2025-01-20',
			updatedBy: 'manager@company.com'
		},
		success: 'User updated successfully!',
		showAutoSuccess: false,
		showCancel: true
	}}
/>

<!-- Disabled State -->
<Story
	name="Disabled State"
	args={{
		title: 'View User',
		description: 'This form is read-only',
		mode: 'edit',
		fields: userFields,
		initialValues: {
			id: '123',
			name: 'John Doe',
			email: 'john.doe@example.com',
			status: 'active',
			role: 'admin',
			createdAt: '2025-01-15',
			createdBy: 'admin@company.com',
			updatedAt: '2025-01-20',
			updatedBy: 'manager@company.com'
		},
		disabled: true
	}}
/>

<!-- Bordered Variant -->
<Story
	name="Bordered Variant"
	args={{
		title: 'Create User',
		description: 'Form with bordered variant',
		mode: 'create',
		fields: userFields,
		variant: 'bordered',
		showCancel: true
	}}
/>

<!-- Card Variant -->
<Story
	name="Card Variant"
	args={{
		title: 'Create User',
		description: 'Form with card variant',
		mode: 'create',
		fields: userFields,
		variant: 'card',
		showCancel: true
	}}
/>

<!-- With Reset Button -->
<Story
	name="With Reset Button"
	args={{
		title: 'Create User',
		description: 'Form with reset functionality',
		mode: 'create',
		fields: userFields,
		showReset: true,
		resetLabel: 'Reset Form'
	}}
/>

<!-- Complex Entity Example -->
<Story
	name="Complex Entity Example"
	args={{
		title: 'Create Product',
		description: 'Complete product information form',
		mode: 'create',
		fields: [
			{
				key: 'name',
				type: 'text',
				label: 'Product Name',
				placeholder: 'Enter product name',
				validation: { required: true, min: 3, max: 100 },
				section: 'Product Information'
			},
			{
				key: 'description',
				type: 'textarea',
				label: 'Description',
				placeholder: 'Enter product description',
				validation: { required: true, min: 10, max: 1000 },
				section: 'Product Information'
			},
			{
				key: 'price',
				type: 'number',
				label: 'Price',
				placeholder: '0.00',
				validation: { required: true, min: 0 },
				section: 'Pricing'
			},
			{
				key: 'category',
				type: 'select',
				label: 'Category',
				options: [
					{ value: 'electronics', label: 'Electronics' },
					{ value: 'clothing', label: 'Clothing' },
					{ value: 'books', label: 'Books' }
				],
				validation: { required: true },
				section: 'Pricing'
			},
			{
				key: 'inStock',
				type: 'checkbox',
				label: 'In Stock',
				defaultValue: true,
				section: 'Inventory'
			},
			{
				key: 'isPublished',
				type: 'switch',
				label: 'Published',
				defaultValue: false,
				section: 'Inventory'
			}
		],
		showCancel: true
	}}
/>

<!-- Playground - Full Controls -->
<Story
	name="Playground"
	args={{
		title: 'Entity Form',
		description: 'Interactive form playground - adjust all properties via controls',
		mode: 'create',
		fields: userFields,
		initialValues: {},
		disabled: false,
		loading: false,
		error: undefined,
		success: undefined,
		showAutoSuccess: true,
		createSuccessMessage: 'Created successfully!',
		updateSuccessMessage: 'Updated successfully!',
		autoMessageDuration: 5000,
		submitLabel: 'Submit',
		cancelLabel: 'Cancel',
		resetLabel: 'Reset',
		showSubmit: true,
		showCancel: false,
		showReset: false,
		variant: 'default',
		padding: 'md',
		ariaLabel: undefined,
		loadingLabel: 'Form is loading',
		submitAriaLabel: 'Submit form',
		cancelAriaLabel: 'Cancel form',
		resetAriaLabel: 'Reset form'
	}}
/>
