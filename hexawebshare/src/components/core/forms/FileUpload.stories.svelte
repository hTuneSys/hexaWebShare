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

<!-- Default Stories -->
<Story name="Default" args={{ helpText: 'Select a file to upload' }} />

<Story
	name="With Label"
	args={{ label: 'Upload File', helpText: 'Choose a file from your device' }}
/>

<Story
	name="Multiple Files"
	args={{
		label: 'Upload Files',
		multiple: true,
		helpText: 'You can select multiple files'
	}}
/>

<Story
	name="With Help Text"
	args={{
		label: 'Document Upload',
		helpText: 'Supported formats: PDF, DOC, DOCX. Maximum file size: 10MB'
	}}
/>

<Story
	name="With Error"
	args={{
		label: 'File Upload',
		error: 'Please select a valid file'
	}}
/>

<Story
	name="Required"
	args={{ label: 'Required File Upload', required: true, helpText: 'This field is required' }}
/>

<Story name="Disabled" args={{ label: 'Disabled Upload', disabled: true }} />

<Story name="Loading" args={{ label: 'Uploading File', loading: true }} />

<!-- Accept Stories -->
<Story
	name="Image Files Only"
	args={{
		label: 'Upload Image',
		accept: 'image/*',
		helpText: 'Only image files are accepted'
	}}
/>

<Story
	name="PDF Files Only"
	args={{
		label: 'Upload PDF',
		accept: '.pdf',
		helpText: 'Only PDF files are accepted'
	}}
/>

<Story
	name="Multiple File Types"
	args={{
		label: 'Upload Document',
		accept: '.pdf,.doc,.docx,.txt',
		helpText: 'Accepted: PDF, DOC, DOCX, TXT'
	}}
/>

<!-- Size Limit Stories -->
<Story
	name="With Max Size"
	args={{
		label: 'Upload File',
		maxSize: 5242880,
		helpText: 'Maximum file size: 5MB'
	}}
/>

<Story
	name="With Max Files"
	args={{
		label: 'Upload Multiple Files',
		multiple: true,
		maxFiles: 3,
		helpText: 'Maximum 3 files allowed'
	}}
/>

<!-- Variant Stories -->
<Story
	name="Primary Variant"
	args={{ variant: 'primary', label: 'Primary Upload', helpText: 'Primary variant' }}
/>

<Story
	name="Secondary Variant"
	args={{ variant: 'secondary', label: 'Secondary Upload', helpText: 'Secondary variant' }}
/>

<Story
	name="Accent Variant"
	args={{ variant: 'accent', label: 'Accent Upload', helpText: 'Accent variant' }}
/>

<Story
	name="Info Variant"
	args={{ variant: 'info', label: 'Info Upload', helpText: 'Info variant' }}
/>

<Story
	name="Success Variant"
	args={{ variant: 'success', label: 'Success Upload', helpText: 'Success variant' }}
/>

<Story
	name="Warning Variant"
	args={{ variant: 'warning', label: 'Warning Upload', helpText: 'Warning variant' }}
/>

<Story
	name="Error Variant"
	args={{ variant: 'error', label: 'Error Upload', helpText: 'Error variant' }}
/>

<!-- Size Stories -->
<Story name="Extra Small" args={{ size: 'xs', label: 'XS Upload', helpText: 'Extra small size' }} />

<Story name="Small" args={{ size: 'sm', label: 'Small Upload', helpText: 'Small size' }} />

<Story
	name="Medium"
	args={{ size: 'md', label: 'Medium Upload', helpText: 'Medium size (Default)' }}
/>

<Story name="Large" args={{ size: 'lg', label: 'Large Upload', helpText: 'Large size' }} />

<!-- Feature Stories -->
<Story
	name="Without Preview"
	args={{
		label: 'Upload Without Preview',
		showPreview: false,
		helpText: 'File preview is disabled'
	}}
/>

<Story
	name="Without Drag Drop"
	args={{
		label: 'Upload Without Drag Drop',
		dragDrop: false,
		helpText: 'Drag and drop is disabled'
	}}
/>

<!-- State Combinations -->
<Story
	name="Disabled with Error"
	args={{
		label: 'Disabled Error',
		disabled: true,
		error: 'This field is disabled and cannot be used'
	}}
/>

<Story
	name="Loading with Variant"
	args={{
		label: 'Loading Primary',
		variant: 'primary',
		loading: true
	}}
/>

<Story
	name="Required with Help Text"
	args={{
		label: 'Required Field',
		required: true,
		helpText: 'This field is required'
	}}
/>

<Story
	name="Multiple with Max Files"
	args={{
		label: 'Upload Multiple Files',
		multiple: true,
		maxFiles: 5,
		helpText: 'You can upload up to 5 files'
	}}
/>

<Story
	name="Image with Size Limit"
	args={{
		label: 'Upload Image',
		accept: 'image/*',
		maxSize: 2097152,
		helpText: 'Only images, maximum 2MB'
	}}
/>

<!-- Accessibility Stories -->
<Story
	name="ARIA Label Only"
	args={{ ariaLabel: 'File upload without visible label', helpText: 'Accessible upload' }}
/>

<Story
	name="ARIA Describedby"
	args={{
		label: 'Upload with Description',
		ariaDescribedby: 'upload-help',
		helpText: 'This is helpful information'
	}}
/>

<!-- Real-world Examples -->
<Story
	name="Profile Picture Upload"
	args={{
		label: 'Profile Picture',
		accept: 'image/*',
		maxSize: 2097152,
		helpText: 'Upload your profile picture (max 2MB). Supported formats: JPG, PNG, GIF',
		required: true
	}}
/>

<Story name="Document Upload Form">
	<div class="w-full max-w-md space-y-4">
		<FileUpload
			label="Resume"
			accept=".pdf,.doc,.docx"
			maxSize={5242880}
			helpText="Upload your resume (PDF, DOC, or DOCX, max 5MB)"
			required={true}
			variant="primary"
			size="md"
		/>
		<FileUpload
			label="Cover Letter"
			accept=".pdf,.doc,.docx"
			maxSize={5242880}
			helpText="Upload your cover letter (PDF, DOC, or DOCX, max 5MB)"
			variant="secondary"
			size="md"
		/>
	</div>
</Story>

<Story
	name="Multiple Images Upload"
	args={{
		label: 'Product Images',
		accept: 'image/*',
		multiple: true,
		maxFiles: 5,
		maxSize: 5242880,
		helpText: 'Upload up to 5 product images (max 5MB each). Drag and drop or click to browse',
		required: true
	}}
/>

<Story
	name="Gallery Upload"
	args={{
		label: 'Photo Gallery',
		accept: 'image/*',
		multiple: true,
		maxFiles: 10,
		maxSize: 10485760,
		helpText:
			'Upload up to 10 photos for your gallery (max 10MB each). You can select multiple files at once'
	}}
/>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="w-full max-w-2xl space-y-6">
		<div>
			<h3 class="mb-3 text-lg font-bold">Color Variants</h3>
			<div class="space-y-3">
				<FileUpload
					variant="primary"
					label="Primary Upload"
					helpText="Primary variant with custom styling"
				/>
				<FileUpload
					variant="secondary"
					label="Secondary Upload"
					helpText="Secondary variant with custom styling"
				/>
				<FileUpload
					variant="accent"
					label="Accent Upload"
					helpText="Accent variant with custom styling"
				/>
				<FileUpload
					variant="info"
					label="Info Upload"
					helpText="Info variant with custom styling"
				/>
				<FileUpload
					variant="success"
					label="Success Upload"
					helpText="Success variant with custom styling"
				/>
				<FileUpload
					variant="warning"
					label="Warning Upload"
					helpText="Warning variant with custom styling"
				/>
				<FileUpload
					variant="error"
					label="Error Upload"
					helpText="Error variant with custom styling"
				/>
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">Sizes</h3>
			<div class="space-y-3">
				<FileUpload
					size="xs"
					label="Extra Small Upload"
					helpText="XS size - compact form field"
					variant="primary"
				/>
				<FileUpload
					size="sm"
					label="Small Upload"
					helpText="SM size - smaller form field"
					variant="primary"
				/>
				<FileUpload
					size="md"
					label="Medium Upload"
					helpText="MD size (Default) - standard form field"
					variant="primary"
				/>
				<FileUpload
					size="lg"
					label="Large Upload"
					helpText="LG size - larger form field"
					variant="primary"
				/>
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">States</h3>
			<div class="space-y-3">
				<FileUpload
					label="Default State"
					helpText="Default state - ready for file selection"
					variant="primary"
				/>
				<FileUpload
					label="Disabled State"
					disabled={true}
					helpText="Disabled - cannot interact"
					variant="primary"
				/>
				<FileUpload
					label="Loading State"
					loading={true}
					helpText="Loading - file is being processed"
					variant="primary"
				/>
				<FileUpload
					label="Error State"
					error="This field has an error message"
					helpText="Error state with validation message"
					variant="error"
				/>
				<FileUpload
					label="Required Field"
					required={true}
					helpText="Required field - must be filled"
					variant="primary"
				/>
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">Features</h3>
			<div class="space-y-3">
				<FileUpload
					label="Single File Upload"
					helpText="Single file selection mode"
					variant="primary"
				/>
				<FileUpload
					label="Multiple Files Upload"
					multiple={true}
					helpText="Multiple files selection enabled"
					variant="primary"
				/>
				<FileUpload
					label="With Preview Enabled"
					showPreview={true}
					helpText="File preview is shown after selection"
					variant="primary"
				/>
				<FileUpload
					label="Without Preview"
					showPreview={false}
					helpText="File preview is disabled"
					variant="primary"
				/>
				<FileUpload
					label="With Drag & Drop"
					dragDrop={true}
					helpText="Drag and drop functionality enabled"
					variant="primary"
				/>
				<FileUpload
					label="Without Drag & Drop"
					dragDrop={false}
					helpText="Drag and drop functionality disabled"
					variant="primary"
				/>
			</div>
		</div>
		<div>
			<h3 class="mb-3 text-lg font-bold">File Restrictions</h3>
			<div class="space-y-3">
				<FileUpload
					label="Images Only"
					accept="image/*"
					helpText="Only image files are accepted"
					variant="primary"
				/>
				<FileUpload
					label="PDF Files Only"
					accept=".pdf"
					helpText="Only PDF files are accepted"
					variant="primary"
				/>
				<FileUpload
					label="With Max Size Limit"
					maxSize={5242880}
					helpText="Maximum file size: 5MB"
					variant="primary"
				/>
				<FileUpload
					label="With Max Files Limit"
					multiple={true}
					maxFiles={3}
					helpText="Maximum 3 files allowed"
					variant="primary"
				/>
			</div>
		</div>
	</div>
</Story>

<!-- Interactive Playground -->
<Story name="Playground" args={{ label: 'Playground', helpText: 'Try different props' }} />
