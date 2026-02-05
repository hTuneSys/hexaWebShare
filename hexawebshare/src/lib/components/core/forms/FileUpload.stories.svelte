<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileUpload from './FileUpload.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Forms/FileUpload',
		component: FileUpload,
		tags: ['autodocs'],
		argTypes: {
			multiple: { control: 'boolean' },
			accept: { control: 'text' },
			maxSize: { control: 'number' },
			maxFiles: { control: 'number' },
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
			},
			showPreview: { control: 'boolean' },
			dragDrop: { control: 'boolean' },
			loading: { control: 'boolean' },
			label: { control: 'text' },
			error: { control: 'text' },
			helpText: { control: 'text' }
		},
		args: {
			onchange: fn(),
			onfiles: fn()
		}
	});
</script>

<!-- Main Variant Stories (5-10 required) -->
<Story name="Default" args={{ label: 'Upload File', helpText: 'Select a file to upload' }} />

<Story
	name="Multiple Files"
	args={{
		label: 'Upload Files',
		multiple: true,
		helpText: 'You can select multiple files'
	}}
/>

<Story
	name="Image Upload"
	args={{
		label: 'Upload Image',
		accept: 'image/*',
		maxSize: 2097152,
		helpText: 'Only images, maximum 2MB'
	}}
/>

<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Upload', helpText: 'Primary variant' }}
/>

<Story name="Small Size" args={{ size: 'sm', label: 'Small Upload', helpText: 'Small size' }} />

<Story name="Large Size" args={{ size: 'lg', label: 'Large Upload', helpText: 'Large size' }} />

<Story
	name="Disabled State"
	args={{ label: 'Disabled Upload', disabled: true, helpText: 'Cannot upload files' }}
/>

<Story
	name="Loading State"
	args={{ label: 'Uploading File', loading: true, helpText: 'File is being uploaded' }}
/>

<Story
	name="With Error"
	args={{
		label: 'File Upload',
		error: 'Please select a valid file',
		helpText: 'Error state'
	}}
/>

<Story
	name="Max Files Limit"
	args={{
		label: 'Upload Multiple Files',
		multiple: true,
		maxFiles: 3,
		helpText: 'Maximum 3 files allowed'
	}}
/>

<!-- Interactive Playground (REQUIRED - must be last) -->
<Story
	name="Playground"
	args={{
		label: 'Playground',
		helpText: 'Try different props',
		variant: 'primary',
		size: 'md',
		multiple: false,
		disabled: false,
		loading: false,
		required: false,
		showPreview: true,
		dragDrop: true,
		maxSize: 5242880,
		onchange: fn(),
		onfiles: fn()
	}}
/>
