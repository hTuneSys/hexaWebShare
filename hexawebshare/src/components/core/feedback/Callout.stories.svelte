<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Callout from './Callout.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Core/Feedback/Callout',
		component: Callout,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				],
				description: 'Visual style of the callout'
			},
			title: { control: 'text', description: 'Title displayed in bold' },
			message: { control: 'text', description: 'Supporting message' },
			closable: { control: 'boolean', description: 'Show close button' },
			actionLabel: { control: 'text', description: 'Text for the action button' },
			withIcon: { control: 'boolean', description: 'Show leading indicator' },
			loading: { control: 'boolean', description: 'Show loading spinner' },
			disabled: { control: 'boolean', description: 'Disable interactions' },
			fullWidth: { control: 'boolean', description: 'Stretch callout to full width' },
			ariaLive: {
				control: { type: 'select' },
				options: ['polite', 'assertive'],
				description: 'ARIA live region setting'
			},
			role: {
				control: { type: 'select' },
				options: ['status', 'alert', 'note'],
				description: 'ARIA role override'
			}
		},
		args: {
			variant: 'info',
			title: 'Information',
			message:
				'This is an informational callout. Use it to highlight important information to users.',
			closable: false,
			actionLabel: '',
			withIcon: true,
			loading: false,
			disabled: false,
			fullWidth: true,
			onclose: fn(),
			onaction: fn()
		}
	});
</script>

<Story name="Default" />

<Story
	name="Success"
	args={{
		variant: 'success',
		title: 'Success',
		message: 'Your action completed successfully.'
	}}
/>

<Story
	name="Warning"
	args={{
		variant: 'warning',
		title: 'Warning',
		message: 'Please double-check your inputs before proceeding.'
	}}
/>

<Story
	name="Error"
	args={{
		variant: 'error',
		title: 'Error',
		message: 'Something went wrong. Please try again.'
	}}
/>

<Story name="Without Icon" args={{ withIcon: false }} />

<Story name="Closable" args={{ closable: true }} />

<Story name="With Action" args={{ actionLabel: 'Learn More' }} />

<Story name="Loading State" args={{ loading: true, actionLabel: 'Details' }} />

<Story
	name="Disabled"
	args={{
		disabled: true,
		actionLabel: 'Details',
		title: 'Disabled callout',
		message: 'Interactions are disabled.'
	}}
/>

<Story
	name="With Action and Close"
	args={{
		closable: true,
		actionLabel: 'View Details',
		title: 'System Update',
		message: 'A new version is available for download.'
	}}
/>

<!-- Playground -->
<Story
	name="Playground"
	args={{
		variant: 'info',
		title: 'Information',
		message:
			'This is an informational callout. Use it to highlight important information to users.',
		closable: false,
		actionLabel: '',
		withIcon: true,
		loading: false,
		disabled: false,
		fullWidth: true,
		onclose: fn(),
		onaction: fn()
	}}
/>
