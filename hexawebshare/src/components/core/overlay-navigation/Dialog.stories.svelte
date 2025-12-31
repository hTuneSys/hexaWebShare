<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dialog from './Dialog.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Overlay Navigation/Dialog',
		component: Dialog,
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the dialog is open'
			},
			title: {
				control: 'text',
				description: 'Dialog title'
			},
			description: {
				control: 'text',
				description: 'Dialog description text'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the dialog'
			},
			closable: {
				control: 'boolean',
				description: 'Show close button'
			},
			closeOnBackdropClick: {
				control: 'boolean',
				description: 'Close dialog when clicking backdrop'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessible label for screen readers'
			},
			ariaLabelledBy: {
				control: 'text',
				description: 'ID of element that labels the dialog'
			}
		},
		args: {
			open: true,
			title: 'Dialog Title',
			size: 'md',
			onClose: fn()
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		open: true,
		title: 'Dialog Title',
		description: 'This is a default dialog with a title and description.',
		size: 'md'
	}}
/>

<!-- Size Stories -->
<Story
	name="Small Size"
	args={{ open: true, title: 'Small Dialog', description: 'This is a small dialog.', size: 'sm' }}
/>

<Story
	name="Large Size"
	args={{ open: true, title: 'Large Dialog', description: 'This is a large dialog.', size: 'lg' }}
/>

<Story
	name="Extra Large Size"
	args={{
		open: true,
		title: 'Extra Large Dialog',
		description: 'This is an extra large dialog.',
		size: 'xl'
	}}
/>

<!-- Content Stories -->
<Story
	name="With Description"
	args={{
		open: true,
		title: 'Dialog with Description',
		description: 'This dialog includes a detailed description to provide more context to the user.',
		size: 'md'
	}}
/>

<Story name="Title Only" args={{ open: true, title: 'Dialog Title Only', size: 'md' }} />

<!-- Accessibility Stories -->
<Story
	name="With Aria Label"
	args={{
		open: true,
		title: 'Accessible Dialog',
		description: 'This dialog has a custom aria-label.',
		ariaLabel: 'Custom dialog label',
		size: 'md'
	}}
/>

<!-- With Children/Content -->
<Story name="With Custom Content">
	<Dialog open={true} title="Delete Confirmation" size="md">
		<p>Are you sure you want to delete this item? This action cannot be undone.</p>
		<div class="modal-action">
			<button class="btn">Cancel</button>
			<button class="btn btn-error">Delete</button>
		</div>
	</Dialog>
</Story>

<!-- Interactive Examples -->
<Story
	name="Playground"
	args={{
		open: true,
		title: 'Dialog Playground',
		description: 'Use the controls to customize this dialog.',
		size: 'md'
	}}
/>
