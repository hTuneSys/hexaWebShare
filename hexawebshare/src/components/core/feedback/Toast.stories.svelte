<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toast from './Toast.svelte';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Toast',
		component: Toast,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['info', 'success', 'warning', 'error', 'neutral'],
				description: 'Visual style of the toast'
			},
			position: {
				control: { type: 'select' },
				options: [
					'top-left',
					'top-right',
					'bottom-left',
					'bottom-right',
					'top-center',
					'bottom-center'
				],
				description: 'Screen position for the toast container'
			},
			closable: { control: 'boolean', description: 'Show the close button' },
			duration: {
				control: 'number',
				description: 'Auto-dismiss duration in milliseconds. Use null to keep it visible.'
			},
			pauseOnHover: {
				control: 'boolean',
				description: 'Pause the auto-dismiss timer on hover'
			},
			showIcon: { control: 'boolean', description: 'Show the variant indicator' },
			loading: { control: 'boolean', description: 'Show a loading spinner' },
			disabled: { control: 'boolean', description: 'Disable interactive controls' },
			actionLabel: { control: 'text', description: 'Optional action button label' },
			message: { control: 'text', description: 'Toast message' },
			title: { control: 'text', description: 'Toast title' },
			ariaLive: {
				control: { type: 'select' },
				options: ['polite', 'assertive'],
				description: 'ARIA live region priority'
			}
		},
		args: {
			title: 'Notification',
			message: 'File uploaded successfully',
			variant: 'info',
			position: 'top-right',
			closable: true,
			duration: null,
			pauseOnHover: true,
			showIcon: false,
			loading: false,
			disabled: false,
			ariaLive: 'polite'
		}
	});
</script>

<Story name="Info" args={{ title: 'Heads up', message: 'New update available', variant: 'info' }} />

<Story
	name="Success"
	args={{
		title: 'Saved',
		message: 'Profile updated successfully',
		variant: 'success',
		showIcon: true
	}}
/>

<Story
	name="Warning"
	args={{
		title: 'Warning',
		message: 'Storage is almost full',
		variant: 'warning',
		showIcon: true,
		closable: true
	}}
/>

<Story
	name="Error"
	args={{
		title: 'Error',
		message: 'Failed to save changes',
		variant: 'error',
		showIcon: true,
		ariaLive: 'assertive'
	}}
/>

<Story
	name="AutoDismiss"
	args={{
		title: 'Synced',
		message: 'This toast will dismiss after 4 seconds',
		variant: 'info',
		duration: 4000,
		closable: true
	}}
/>

<Story
	name="Loading"
	args={{
		title: 'Uploading',
		message: 'Please wait while we process your file',
		variant: 'neutral',
		loading: true,
		showIcon: false,
		duration: null
	}}
/>

<Story
	name="Disabled"
	args={{
		title: 'Disabled controls',
		message: 'Action buttons are disabled in this state',
		variant: 'neutral',
		disabled: true,
		actionLabel: 'Retry',
		closable: true
	}}
/>

<Story
	name="WithAction"
	args={{
		title: 'Undo',
		message: 'Item archived',
		variant: 'success',
		actionLabel: 'Undo',
		showIcon: true
	}}
/>

<Story
	name="BottomLeft"
	args={{
		title: 'New message',
		message: 'Positioned at the bottom left',
		variant: 'info',
		position: 'bottom-left',
		showIcon: true
	}}
/>

<Story
	name="TopCenter"
	args={{
		title: 'Centered',
		message: 'Appears at the top center of the viewport',
		variant: 'neutral',
		position: 'top-center'
	}}
/>
