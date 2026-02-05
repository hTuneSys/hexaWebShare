<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Utility/Utility/ConfirmDialog',
		component: ConfirmDialog,
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
				description: 'Dialog description/message'
			},
			confirmText: {
				control: 'text',
				description: 'Confirm button text'
			},
			cancelText: {
				control: 'text',
				description: 'Cancel button text'
			},
			confirmVariant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error',
					'ghost',
					'link'
				],
				description: 'Confirm button color variant (ignored if destructive is true)'
			},
			cancelVariant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error',
					'ghost',
					'link'
				],
				description: 'Cancel button color variant'
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the dialog'
			},
			loading: {
				control: 'boolean',
				description: 'Whether the confirm button is in loading state'
			},
			confirmDisabled: {
				control: 'boolean',
				description: 'Whether the confirm button is disabled'
			},
			cancelDisabled: {
				control: 'boolean',
				description: 'Whether the cancel button is disabled'
			},
			closable: {
				control: 'boolean',
				description: 'Whether to show the close button'
			},
			closeButtonVariant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error',
					'ghost',
					'link'
				],
				description: 'Close button color variant'
			},
			closeButtonSize: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg'],
				description: 'Close button size'
			},
			closeOnBackdropClick: {
				control: 'boolean',
				description: 'Whether clicking backdrop closes the dialog'
			},
			destructive: {
				control: 'boolean',
				description: 'Whether this is a destructive action (overrides confirmVariant to error)'
			}
		},
		args: {
			open: true,
			title: 'Confirm Action',
			description: 'Are you sure you want to proceed with this action?',
			confirmText: 'Confirm',
			cancelText: 'Cancel',
			confirmVariant: 'primary',
			cancelVariant: 'ghost',
			size: 'md',
			loading: false,
			confirmDisabled: false,
			cancelDisabled: false,
			closable: true,
			closeButtonVariant: 'ghost',
			closeButtonSize: 'sm',
			closeOnBackdropClick: true,
			destructive: false,
			onConfirm: fn(),
			onCancel: fn(),
			onClose: fn()
		}
	});
</script>

<Story
	name="Default"
	args={{
		open: true,
		title: 'Confirm Action',
		description: 'Are you sure you want to proceed with this action?',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Destructive Action"
	args={{
		open: true,
		title: 'Delete Item',
		description: 'This action cannot be undone. Are you sure you want to delete this item?',
		destructive: true,
		confirmText: 'Delete',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Loading State"
	args={{
		open: true,
		title: 'Processing',
		description: 'Please wait while we process your request...',
		loading: true,
		confirmText: 'Processing...',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Small Size"
	args={{
		open: true,
		title: 'Quick Confirm',
		description: 'Are you sure?',
		size: 'sm',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Large Size"
	args={{
		open: true,
		title: 'Confirm Important Action',
		description:
			'This is an important action that requires your confirmation. Please review the details carefully before proceeding.',
		size: 'lg',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Custom Button Labels"
	args={{
		open: true,
		title: 'Save Changes?',
		description: 'You have unsaved changes. Do you want to save them before leaving?',
		confirmText: 'Save',
		cancelText: 'Discard',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Disabled Buttons"
	args={{
		open: true,
		title: 'Action Restricted',
		description: 'This action is currently disabled.',
		confirmDisabled: true,
		cancelDisabled: true,
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Success Variant"
	args={{
		open: true,
		title: 'Confirm Success Action',
		description: 'This action will complete successfully.',
		confirmVariant: 'success',
		confirmText: 'Complete',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Without Close Button"
	args={{
		open: true,
		title: 'Required Action',
		description: 'You must make a choice to continue.',
		closable: false,
		closeOnBackdropClick: false,
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Custom Close Button Variant"
	args={{
		open: true,
		title: 'Custom Close Button',
		description: 'Close button with custom variant and size.',
		closeButtonVariant: 'error',
		closeButtonSize: 'md',
		onClose: fn(),
		onConfirm: fn(),
		onCancel: fn()
	}}
/>

<Story
	name="Playground"
	args={{
		open: true,
		title: 'Confirm Action',
		description: 'Are you sure you want to proceed with this action?',
		confirmText: 'Confirm',
		cancelText: 'Cancel',
		confirmVariant: 'primary',
		cancelVariant: 'ghost',
		size: 'md',
		loading: false,
		confirmDisabled: false,
		cancelDisabled: false,
		closable: true,
		closeButtonVariant: 'ghost',
		closeButtonSize: 'sm',
		closeOnBackdropClick: true,
		destructive: false,
		onConfirm: fn(),
		onCancel: fn(),
		onClose: fn()
	}}
/>
