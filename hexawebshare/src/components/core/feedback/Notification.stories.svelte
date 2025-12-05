<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Notification from './Notification.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Notification',
		component: Notification,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['info', 'success', 'warning', 'error']
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg']
			},
			dismissible: { control: 'boolean' },
			title: { control: 'text' },
			message: { control: 'text' }
		},
		args: {
			onclose: fn()
		}
	});
</script>

<!-- Default Story -->
<Story
	name="Default"
	args={{
		message: 'This is a default notification message.'
	}}
/>

<!-- Variant Stories -->
<Story
	name="Info"
	args={{
		variant: 'info',
		message: 'This is an informational notification.'
	}}
/>

<Story
	name="Success"
	args={{
		variant: 'success',
		message: 'Operation completed successfully!'
	}}
/>

<Story
	name="Warning"
	args={{
		variant: 'warning',
		message: 'Please review this warning before proceeding.'
	}}
/>

<Story
	name="Error"
	args={{
		variant: 'error',
		message: 'An error occurred. Please try again.'
	}}
/>

<!-- With Title -->
<Story
	name="With Title"
	args={{
		title: 'Notification Title',
		message: 'This notification includes a title and message content.',
		variant: 'info'
	}}
/>

<Story
	name="Success With Title"
	args={{
		title: 'Success!',
		message: 'Your changes have been saved successfully.',
		variant: 'success'
	}}
/>

<Story
	name="Error With Title"
	args={{
		title: 'Error',
		message: 'Failed to save changes. Please check your connection and try again.',
		variant: 'error'
	}}
/>

<!-- Size Stories -->
<Story
	name="Small"
	args={{
		size: 'sm',
		message: 'This is a small notification.',
		variant: 'info'
	}}
/>

<Story
	name="Medium"
	args={{
		size: 'md',
		message: 'This is a medium-sized notification.',
		variant: 'info'
	}}
/>

<Story
	name="Large"
	args={{
		size: 'lg',
		message: 'This is a large notification with more prominent styling.',
		variant: 'info'
	}}
/>

<!-- Dismissible Stories -->
<Story
	name="Dismissible"
	args={{
		message: 'This notification can be dismissed by clicking the close button.',
		dismissible: true,
		variant: 'info'
	}}
/>

<Story
	name="Dismissible Success"
	args={{
		title: 'Success',
		message: 'Your action was completed. You can dismiss this notification.',
		variant: 'success',
		dismissible: true
	}}
/>

<Story
	name="Dismissible Error"
	args={{
		title: 'Error',
		message: 'Something went wrong. You can dismiss this notification.',
		variant: 'error',
		dismissible: true
	}}
/>

<!-- Combined Examples -->
<Story
	name="Full Featured"
	args={{
		title: 'Important Notice',
		message:
			'This is a fully featured notification with title, message, variant, and dismissible option.',
		variant: 'warning',
		size: 'lg',
		dismissible: true
	}}
/>

<Story
	name="Long Message"
	args={{
		title: 'Detailed Information',
		message:
			'This is a notification with a longer message to demonstrate how the component handles extended content. The notification should wrap text appropriately and maintain proper spacing.',
		variant: 'info',
		dismissible: true
	}}
/>
